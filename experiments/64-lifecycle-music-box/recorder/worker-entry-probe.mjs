import { appendFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parentPort, workerData } from "node:worker_threads";

import { messageOf, ScoreRecorder, STORE_LANES } from "./score-recorder.mjs";

const { probe } = workerData;
const recorder = new ScoreRecorder({
  counter: new Int32Array(probe.counter),
  thread: "worker",
  sink: (event) => appendFileSync(probe.traceFile, `${JSON.stringify(event)}\n`),
});
const importDist = (relativePath) => import(pathToFileURL(join(probe.worktree, relativePath)).href);
const core = await importDist("packages/core/dist/index.js");
const backendModule = await importDist("packages/backend-typescript/dist/index.js");

process.on("uncaughtExceptionMonitor", (error, origin) => {
  recorder.emit({ track: "runtime", kind: "uncaught", label: origin, detail: messageOf(error) });
});

const listen = parentPort.on.bind(parentPort);
parentPort.on = (eventName, listener) => {
  if (eventName !== "message") return listen(eventName, listener);
  return listen(eventName, (value) => {
    if (value?.kind !== "output-ack") {
      recorder.emit({ track: "worker", kind: "receive", label: `receives ${value?.kind}` });
    }
    return listener(value);
  });
};
const postMessage = parentPort.postMessage.bind(parentPort);
parentPort.postMessage = (value, transfer) => {
  if (value?.kind !== "output-chunk") {
    const detail = value?.kind === "failed" ? `failureCode ${value.failureCode}` : undefined;
    recorder.emit({ track: "worker", kind: "send", label: `sends ${value?.kind}`, detail });
  }
  return postMessage(value, transfer);
};

const { TypeScriptBackend, TypeScriptProjectGraph, TypeScriptSemanticQueryService } = backendModule;
const isMain = probe.build === "main";

recorder.wrapMethod(TypeScriptBackend.prototype, "releaseTransientResources", () => ({
  track: "backend",
  label: "releaseTransientResources()",
}));
recorder.wrapMethod(TypeScriptSemanticQueryService.prototype, "beginTurn", function ([filesOrSnapshot]) {
  instrumentStores(this);
  return { track: "service", label: `beginTurn(${Array.isArray(filesOrSnapshot) ? "files" : "snapshot"})` };
});
if (core.TurnScopedCacheScope) {
  recorder.wrapMethod(core.TurnScopedCacheScope.prototype, "beginTurn", () => ({
    track: "scope",
    label: "scope.beginTurn()",
  }));
}
recorder.wrapMethod(TypeScriptSemanticQueryService.prototype, "releaseTransientResources", function () {
  instrumentStores(this);
  return { track: "service", label: "releaseTransientResources()" };
});
if (typeof TypeScriptSemanticQueryService.prototype.clearQueryCaches === "function") {
  recorder.wrapMethod(TypeScriptSemanticQueryService.prototype, "clearQueryCaches", () => ({
    track: "service",
    label: "clearQueryCaches()",
  }));
}
if (core.TurnScopedCacheScope) {
  recorder.wrapMethod(core.TurnScopedCacheScope.prototype, "releaseTransientResources", () => ({
    track: "scope",
    label: "scope.releaseTransientResources()",
  }));
}
const graphReleaseOwner = isMain ? TypeScriptProjectGraph.prototype : core.ProjectGraph.prototype;
recorder.wrapMethod(graphReleaseOwner, "releaseTransientResources", function () {
  instrumentProjects(this);
  return { track: "graph", label: "projectGraph.releaseTransientResources()" };
});

const instrumentedServices = new WeakSet();
function instrumentStores(service) {
  if (instrumentedServices.has(service)) return;
  instrumentedServices.add(service);
  const style = service.cacheScope ? "handles" : "maps";
  for (const lane of STORE_LANES) {
    const store = service[lane];
    recorder.instrumentStoreMap(style === "handles" ? store.values : store, lane, style);
  }
}

function graphProjects(graph) {
  if (isMain) return { configured: graph.configuredProjects, inferred: graph.inferredProject };
  return { configured: graph.state?.configuredProjects ?? [], inferred: graph.state?.inferredProject };
}

let faultPending = probe.fault === "throw";
let holdPending = probe.fault === "hold";
function instrumentProjects(graph) {
  const { inferred } = graphProjects(graph);
  if (!inferred) return;
  const prototype = Object.getPrototypeOf(inferred);
  if (prototype.releaseTransientResources.musicBoxWrapped) return;
  const laneOf = (project) => {
    const index = graphProjects(graph).configured.indexOf(project);
    return index >= 0 ? `configured ${index + 1}` : "inferred";
  };
  const release = prototype.releaseTransientResources;
  prototype.releaseTransientResources = function (...args) {
    const lane = laneOf(this);
    if (faultPending && lane === "configured 1") {
      faultPending = false;
      this.project.getLanguageService().compilerObject.cleanupSemanticCache = () => {
        throw new Error("injected cleanupSemanticCache failure (configured 1)");
      };
      recorder.emit({ track: "projects", kind: "inject", label: "injected: cleanupSemanticCache throws", detail: lane });
    }
    const result = release.apply(this, args);
    if (holdPending && lane === "configured 1") {
      holdPending = false;
      recorder.emit({ track: "projects", kind: "inject", label: "injected: project release held 150 ms", detail: `${lane}; real cleanup already ran` });
      return new Promise((resolveHold) =>
        setTimeout(() => {
          recorder.emit({ track: "projects", kind: "mark", label: "hold timer fires" });
          resolveHold();
        }, 150),
      );
    }
    return result;
  };
  recorder.wrapMethod(prototype, "releaseTransientResources", function () {
    return { track: "projects", lane: laneOf(this), label: "project.releaseTransientResources()" };
  });
}

recorder.emit({ track: "worker", kind: "mark", label: `probe loaded (${probe.build}, fault ${probe.fault})` });
await import(probe.realEntry);
