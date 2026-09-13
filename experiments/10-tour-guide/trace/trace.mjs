// Records one real request's path through a built symnav worktree.
// Usage: node trace.mjs <worktree> <label> <scenario> [argv...]
// Scenarios: tour | refresh-fails | release-throws | release-pending
// Writes out/<label>.<scenario>.json. Never writes inside the worktree.

import { AsyncLocalStorage } from "node:async_hooks";
import { createHash } from "node:crypto";
import { chmodSync, cpSync, mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const [worktree, label, scenario, ...targetArgv] = process.argv.slice(2);
if (!worktree || !label || !scenario) throw new Error("usage: trace.mjs <worktree> <label> <scenario>");

const here = dirname(fileURLToPath(import.meta.url));
const load = (relative) => import(pathToFileURL(join(worktree, relative)).href);

const core = await load("packages/core/dist/index.js");
const backendPackage = await load("packages/backend-typescript/dist/index.js");
const { RetainedWorkspaceProgram } = await load("apps/cli/dist/daemon/retained-workspace-program.js");
const { CliProgramExecutor } = await load("apps/cli/dist/cli-program-executor.js");
const { WorkspaceRequestScopeFactory } = await load("apps/cli/dist/workspace-request-scope.js");
const { NavigationDiagnosticsCollector } = await load(
  "apps/cli/dist/commands/navigation-diagnostics-collector.js",
);
const { createDefaultDependencies } = await load("apps/cli/dist/program.js");

const STORES = [
  "definitionsByIdentity",
  "referencesByIdentity",
  "callTargetsByIdentity",
  "callersByIdentity",
  "calleesByIdentity",
  "definitionsByPosition",
];

const events = [];
const context = new AsyncLocalStorage();
let phase = "setup";
let nextCallId = 1;
const startedAt = performance.now();

function record(event) {
  const parent = context.getStore()?.callId;
  const entry = {
    i: events.length,
    t: Math.round((performance.now() - startedAt) * 100) / 100,
    phase,
    ...(parent === undefined ? {} : { parent }),
    ...event,
  };
  events.push(entry);
  return entry;
}

function describeError(error) {
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}

function wrap(target, name, actor, options = {}) {
  const original = target[name];
  if (typeof original !== "function") return false;
  target[name] = function wrapped(...args) {
    const callId = nextCallId++;
    record({ kind: "call", callId, actor, op: name, detail: options.args?.(args, this) });
    let returned;
    try {
      returned = context.run({ callId }, () => original.apply(this, args));
    } catch (error) {
      record({ kind: "throw", callId, actor, op: name, detail: describeError(error) });
      throw error;
    }
    if (returned && typeof returned.then === "function") {
      record({ kind: "returned-promise", callId, actor, op: name });
      if (options.observeSettlement !== false) {
        returned.then(
          (value) =>
            record({ kind: "resolve", callId, actor, op: name, detail: options.result?.(value) }),
          (error) => record({ kind: "reject", callId, actor, op: name, detail: describeError(error) }),
        );
      }
      return returned;
    }
    record({ kind: "return", callId, actor, op: name, detail: options.result?.(returned) });
    return returned;
  };
  return true;
}

const identityText = (identity) =>
  identity ? `${identity.file ?? identity.relativePath ?? ""}::${(identity.symbolPath ?? identity.path ?? []).join?.("::") ?? JSON.stringify(identity)}` : "";

function formatIdentity(identity) {
  try {
    return core.formatSymbolIdentity(identity);
  } catch {
    return identityText(identity);
  }
}

function argumentShape(value) {
  if (Array.isArray(value)) return `WorkspaceFile[${value.length}]`;
  if (value && typeof value === "object" && Array.isArray(value.files)) {
    return `WorkspaceSnapshot{root, files[${value.files.length}]}`;
  }
  return typeof value;
}

// Route hops above the backend.
wrap(RetainedWorkspaceProgram.prototype, "execute", "RetainedWorkspaceProgram", {
  args: ([request]) => request.argv.join(" "),
  result: (result) => `exitCode ${result.exitCode}`,
});
wrap(CliProgramExecutor.prototype, "execute", "CliProgramExecutor", {
  args: ([request]) => request.argv.join(" "),
});
wrap(WorkspaceRequestScopeFactory.prototype, "openWorkspace", "WorkspaceRequestScopeFactory");
wrap(WorkspaceRequestScopeFactory.prototype, "prepareWorkspace", "WorkspaceRequestScopeFactory");
wrap(core.BackendRouter.prototype, "refresh", "BackendRouter", {
  args: ([snapshot, coverage]) => `${snapshot.files.length} files, coverage ${coverage}`,
  result: (summary) => JSON.stringify(summary),
});
wrap(core.BackendRouter.prototype, "releaseTransientResources", "BackendRouter");
wrap(core.SymbolTargetResolver, "resolve", "SymbolTargetResolver", {
  args: ([request]) => request.rawTarget,
});
wrap(core.GraphTraverser.prototype, "traverseIncoming", "GraphTraverser", {
  result: (paths) => `${paths.length} paths`,
});
wrap(core.GraphTraverser.prototype, "traverseOutgoing", "GraphTraverser", {
  result: (paths) => `${paths.length} paths`,
});
wrap(NavigationDiagnosticsCollector, "attach", "NavigationDiagnosticsCollector");

// Backend.
const { TypeScriptBackend } = backendPackage;
wrap(TypeScriptBackend.prototype, "refresh", "TypeScriptBackend", {
  args: ([request]) => `${request.snapshot.files.length} files, coverage ${request.coverage}`,
  result: (summary) => JSON.stringify(summary),
});
wrap(TypeScriptBackend.prototype, "releaseTransientResources", "TypeScriptBackend");
for (const op of ["findDefinitions", "findReferences", "findCallTarget", "findCallers", "findCallees"]) {
  wrap(TypeScriptBackend.prototype, op, "TypeScriptBackend", {
    args: ([, identity]) => formatIdentity(identity),
  });
}

const observer = {
  semanticProjectLoaded: (fileCount) =>
    record({ kind: "hook", actor: "observer", op: "semanticProjectLoaded", detail: `${fileCount} files` }),
  semanticCacheReleased: () =>
    record({ kind: "hook", actor: "observer", op: "semanticCacheReleased" }),
  definitionSearch: (identity) =>
    record({ kind: "hook", actor: "observer", op: "definitionSearch", detail: formatIdentity(identity) }),
  referenceSearch: (identity) =>
    record({ kind: "hook", actor: "observer", op: "referenceSearch", detail: formatIdentity(identity) }),
  callTargetResolution: (relativePath, start) =>
    record({ kind: "hook", actor: "observer", op: "callTargetResolution", detail: `${relativePath}:${start}` }),
};

const workspaceRoot = mkdtempSync(join(tmpdir(), `rr-tour-127-${label}-${scenario}-`));
cpSync(join(worktree, "packages/testing/fixtures/graph-cases"), workspaceRoot, { recursive: true });
mkdirSync(join(workspaceRoot, ".git"));
const stateDirectory = mkdtempSync(join(tmpdir(), `rr-tour-127-state-${label}-`));

const dependencies = createDefaultDependencies(stateDirectory);
const backend = new TypeScriptBackend(dependencies.fs, undefined, undefined, observer);
const program = new RetainedWorkspaceProgram({ ...dependencies, backends: () => [backend] });

const service = backend.semanticQueries;
const projectGraph = backend.projectGraph;
const mechanism = service.cacheScope ? "TurnScopedCacheScope" : "service-owned Maps";

const ServiceClass = Object.getPrototypeOf(service);
wrap(ServiceClass, "beginTurn", "TypeScriptSemanticQueryService", {
  args: ([value]) => argumentShape(value),
});
wrap(ServiceClass, "releaseTransientResources", "TypeScriptSemanticQueryService", {
  result: (value) => (value === undefined ? "void" : String(value)),
});
wrap(ServiceClass, "clearQueryCaches", "TypeScriptSemanticQueryService");
if (service.cacheScope) {
  const ScopeClass = Object.getPrototypeOf(service.cacheScope);
  wrap(ScopeClass, "beginTurn", "TurnScopedCacheScope");
  wrap(ScopeClass, "releaseTransientResources", "TurnScopedCacheScope");
}

function storeSize(name) {
  const store = service[name];
  if (store instanceof Map) return store.size;
  return store.values.size;
}

function sizes() {
  return Object.fromEntries(STORES.map((name) => [name, storeSize(name)]));
}

for (const name of STORES) {
  const store = service[name];
  if (store instanceof Map) {
    const get = store.get.bind(store);
    const set = store.set.bind(store);
    const clear = store.clear.bind(store);
    store.get = (key) => {
      const value = get(key);
      record({
        kind: "lookup",
        actor: "cache",
        store: name,
        op: "Map.get",
        key,
        outcome: value ? "hit" : "miss",
        detail: value === undefined ? "absent" : Array.isArray(value) ? `array[${value.length}]` : "promise",
      });
      return value;
    };
    store.set = (key, value) => {
      record({ kind: "store", actor: "cache", store: name, op: "Map.set", key });
      return set(key, value);
    };
    store.clear = () => {
      record({ kind: "clear", actor: "cache", store: name, op: "Map.clear", detail: `${store.size} entries dropped` });
      return clear();
    };
    continue;
  }
  const getOrCreate = store.getOrCreate.bind(store);
  const clear = store.clear.bind(store);
  store.getOrCreate = (key, createValue) => {
    const hit = store.values.has(key);
    record({
      kind: "lookup",
      actor: "cache",
      store: name,
      op: "getOrCreate",
      key,
      outcome: hit ? "hit" : "miss",
    });
    const value = getOrCreate(key, createValue);
    if (!hit && store.values.has(key)) {
      record({ kind: "store", actor: "cache", store: name, op: "getOrCreate(store)", key });
    }
    return value;
  };
  store.clear = () => {
    record({ kind: "clear", actor: "cache", store: name, op: "handle.clear", detail: `${store.values.size} entries dropped` });
    return clear();
  };
}

if (projectGraph) {
  wrap(projectGraph, "releaseTransientResources", "TypeScriptProjectGraph", { observeSettlement: false });
}

const unhandled = [];
process.on("unhandledRejection", (reason) => {
  unhandled.push(describeError(reason));
  record({ kind: "unhandled-rejection", actor: "process", op: "unhandledRejection", detail: describeError(reason) });
});

const request = (argv) => ({ argv, cwd: workspaceRoot, telemetryEnabled: false, executionMode: "warm" });
const outputs = {};

async function run(name, argv) {
  phase = name;
  record({ kind: "phase", actor: "harness", op: "request", detail: argv.join(" "), sizes: sizes() });
  const result = await program.execute(request(argv));
  const chunks = [];
  for await (const record of result.output.records()) chunks.push({ stream: record.stream, text: Buffer.from(record.bytes).toString("utf8") });
  await result.output.dispose();
  const stdout = chunks.filter((c) => c.stream === "stdout").map((c) => c.text).join("");
  const stderr = chunks.filter((c) => c.stream === "stderr").map((c) => c.text).join("");
  outputs[name] = {
    exitCode: result.exitCode,
    stdout,
    stderr,
    sha256: createHash("sha256").update(stdout).update("\0").update(stderr).digest("hex"),
  };
  record({ kind: "phase-end", actor: "harness", op: "request", detail: `exit ${result.exitCode}`, sizes: sizes() });
  return result;
}

async function initialize() {
  phase = "initialize";
  record({ kind: "phase", actor: "harness", op: "initialize", detail: "scopeFactory.prepare(workspaceRoot)", sizes: sizes() });
  await program.scopeFactory.prepare(workspaceRoot);
  record({ kind: "phase-end", actor: "harness", op: "initialize", sizes: sizes() });
}

async function release(name) {
  phase = name;
  record({ kind: "phase", actor: "harness", op: "release", detail: "backend.releaseTransientResources()", sizes: sizes() });
  let outcome;
  try {
    await backend.releaseTransientResources();
    outcome = "resolved";
  } catch (error) {
    outcome = `rejected: ${describeError(error)}`;
  }
  await new Promise((resolve) => setTimeout(resolve, 20));
  record({ kind: "phase-end", actor: "harness", op: "release", detail: outcome, sizes: sizes() });
  return outcome;
}

function inferredProject() {
  return projectGraph?.state?.inferredProject ?? projectGraph?.inferredProject;
}

const TARGET = targetArgv.length > 0 ? targetArgv : ["context", "src/hub.ts::hub"];
const results = {};

if (scenario === "tour") {
  await initialize();
  await run("request-1", TARGET);
  await run("request-2", TARGET);
  results.release = await release("release");
  await run("request-3", TARGET);
}

if (scenario === "refresh-fails") {
  await initialize();
  await run("request-1", TARGET);
  const blocked = join(workspaceRoot, "src/hub-callers.ts");
  chmodSync(blocked, 0o000);
  const later = new Date(Date.now() + 5000);
  utimesSync(blocked, later, later);
  await run("request-2-refresh-fails", TARGET);
  phase = "direct-query-after-failed-refresh";
  record({ kind: "phase", actor: "harness", op: "direct", detail: "backend.findCallTarget(hub) without refresh (as the PR test does)", sizes: sizes() });
  const files = [{ relative: "src/hub.ts", absolute: join(workspaceRoot, "src/hub.ts") }];
  const identity = core.parseSymbolIdentity
    ? core.parseSymbolIdentity("src/hub.ts::hub")
    : undefined;
  if (identity) {
    try {
      await backend.findCallTarget(files, identity);
    } catch (error) {
      record({ kind: "note", actor: "harness", op: "direct", detail: describeError(error) });
    }
  } else {
    record({ kind: "note", actor: "harness", op: "direct", detail: "parseSymbolIdentity not exported; skipped" });
  }
  record({ kind: "phase-end", actor: "harness", op: "direct", sizes: sizes() });
  chmodSync(blocked, 0o644);
  await run("request-3-after-restore", TARGET);
}

if (scenario === "release-throws") {
  await initialize();
  await run("request-1", TARGET);
  const project = inferredProject();
  const originalRelease = project.releaseTransientResources;
  project.releaseTransientResources = function injectedRelease() {
    record({ kind: "note", actor: "harness", op: "inject", detail: "TypeScriptSemanticProject.releaseTransientResources throws (stands in for cleanupSemanticCache failing)" });
    throw new Error("injected project release failure");
  };
  results.release = await release("release-throws");
  project.releaseTransientResources = originalRelease;
  await run("request-2-after-failed-release", TARGET);
}

if (scenario === "release-pending") {
  await initialize();
  await run("request-1", TARGET);
  let openGate;
  const gate = new Promise((resolve, reject) => {
    openGate = { resolve, reject };
  });
  const graphRelease = projectGraph.releaseTransientResources;
  projectGraph.releaseTransientResources = async function gatedRelease() {
    record({ kind: "note", actor: "harness", op: "gate", detail: "project release waits on a gate (same setup as the PR's release test)" });
    await gate;
    return graphRelease.call(this);
  };
  phase = "release-pending";
  record({ kind: "phase", actor: "harness", op: "release", detail: "backend.releaseTransientResources() with gated project release", sizes: sizes() });
  let settled = "pending";
  const pending = backend.releaseTransientResources().then(
    () => (settled = "resolved"),
    (error) => (settled = `rejected: ${describeError(error)}`),
  );
  await new Promise((resolve) => setTimeout(resolve, 10));
  record({ kind: "note", actor: "harness", op: "observe", detail: `backend release after 10 ms with gate closed: ${settled}`, sizes: sizes() });
  results.settledWhileGateClosed = settled;
  phase = "request-during-pending-release";
  await run("request-during-pending-release", TARGET);
  phase = "gate-rejects";
  openGate.reject(new Error("gated project release failed"));
  await pending;
  await new Promise((resolve) => setTimeout(resolve, 20));
  record({ kind: "note", actor: "harness", op: "observe", detail: `backend release after gate rejected: ${settled}`, sizes: sizes() });
  results.settledAfterGateRejects = settled;
}

const out = join(here, "out");
mkdirSync(out, { recursive: true });
const file = join(out, `${label}.${scenario}.json`);
writeFileSync(
  file,
  JSON.stringify(
    {
      label,
      scenario,
      worktree,
      mechanism,
      node: process.version,
      target: TARGET.join(" "),
      results,
      unhandled,
      outputs,
      events,
    },
    null,
    1,
  ),
);
rmSync(workspaceRoot, { recursive: true, force: true });
rmSync(stateDirectory, { recursive: true, force: true });
console.log(`${file}: ${events.length} events, unhandled ${unhandled.length}, results ${JSON.stringify(results)}`);
for (const [name, output] of Object.entries(outputs)) {
  console.log(`  ${name}: exit ${output.exitCode} sha ${output.sha256.slice(0, 12)} stdout ${output.stdout.length}B stderr ${JSON.stringify(output.stderr.slice(0, 160))}`);
}
