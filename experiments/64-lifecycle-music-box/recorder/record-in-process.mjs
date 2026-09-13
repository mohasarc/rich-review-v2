import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { messageOf, ScoreRecorder, STORE_LANES } from "./score-recorder.mjs";

const experimentDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const worktrees = resolve(experimentDirectory, "../../worktrees");

export const BUILDS = {
  main: { directory: "main", label: "main" },
  base: { directory: "pr-127-base", label: "#126 base" },
  head: { directory: "pr-127-head", label: "#127 head" },
};

const argumentsByName = Object.fromEntries(
  process.argv.slice(2).map((argument) => argument.replace(/^--/, "").split("=")),
);
const buildKey = argumentsByName.build;
const scenarioKey = argumentsByName.scenario;
const outputPath = argumentsByName.out;
const build = BUILDS[buildKey];
if (!build || !scenarioKey || !outputPath) {
  throw new Error("usage: --build=main|base|head --scenario=<key> --out=<file>");
}
const worktree = join(worktrees, build.directory);
const importDist = (relativePath) => import(pathToFileURL(join(worktree, relativePath)).href);

const core = await importDist("packages/core/dist/index.js");
const backendModule = await importDist("packages/backend-typescript/dist/index.js");
const sourceCacheModule =
  buildKey === "main"
    ? await importDist("packages/backend-typescript/dist/typescript-backend/workspace-source-cache.js")
    : core;

const recorder = new ScoreRecorder({ thread: "main" });
const injections = [];
const fault = {};
const notes = [];

process.on("unhandledRejection", (reason, promise) => {
  recorder.emit({
    track: "runtime",
    kind: "unhandled",
    label: "unhandledRejection",
    detail: messageOf(reason),
    promiseId: recorder.promiseRecords.get(promise)?.id,
  });
});

const { TypeScriptBackend, TypeScriptProjectGraph, TypeScriptSemanticQueryService, TypeScriptWorkspaceState } =
  backendModule;
const { NodeFileSystem } = core;

function inject(track, label, detail) {
  injections.push({ track, label, detail });
  recorder.emit({ track, kind: "inject", label, detail });
}

function instrumentPrototypes() {
  const backend = TypeScriptBackend.prototype;
  const describeBackend = (label) => () => ({ track: "backend", label });
  recorder.wrapMethod(backend, "refresh", function ([request]) {
    return { track: "backend", label: `refresh(${request.coverage})` };
  });
  recorder.wrapMethod(backend, "releaseTransientResources", describeBackend("releaseTransientResources()"));
  recorder.wrapMethod(backend, "findDefinitions", function ([, identity]) {
    return { track: "backend", label: "findDefinitions()", detail: `${identity.file}::${identity.segments[0].name}` };
  });
  recorder.wrapMethod(backend, "findReferences", function ([, identity]) {
    return { track: "backend", label: "findReferences()", detail: `${identity.file}::${identity.segments[0].name}` };
  });

  recorder.wrapMethod(sourceCacheModule.WorkspaceSourceCache.prototype, "refresh", () => ({
    track: "collaborators",
    lane: "sourceCache",
    label: "sourceCache.refresh()",
  }));

  const stateRefresh = TypeScriptWorkspaceState.prototype.refresh;
  TypeScriptWorkspaceState.prototype.refresh = function (...args) {
    if (fault.failNextStateRefresh) {
      fault.failNextStateRefresh = false;
      inject("collaborators", "injected: state.refresh rejects", "same failure point as the PR's refresh test");
      return Promise.reject(new Error("injected state refresh failure"));
    }
    return stateRefresh.apply(this, args);
  };
  recorder.wrapMethod(TypeScriptWorkspaceState.prototype, "refresh", function ([, coverage]) {
    return { track: "collaborators", lane: "workspaceState", label: `state.refresh(${coverage ?? ""})` };
  });

  const ensureFiles = TypeScriptWorkspaceState.prototype.ensureFiles;
  TypeScriptWorkspaceState.prototype.ensureFiles = function (...args) {
    const enclosing = recorder.context.getStore();
    const result = ensureFiles.apply(this, args);
    if (fault.holdAlgorithmEnsure && enclosing?.track === "service") {
      const hold = fault.holdAlgorithmEnsure;
      fault.holdAlgorithmEnsure = undefined;
      inject("service", "injected: definition search held open", "ensureFiles result delayed until released");
      return Promise.resolve(result).then((value) => hold.promise.then(() => value));
    }
    return result;
  };

  recorder.wrapMethod(TypeScriptProjectGraph.prototype, "refresh", () => ({
    track: "graph",
    label: "projectGraph.refresh()",
  }));
  const graphReleaseOwner = buildKey === "main" ? TypeScriptProjectGraph.prototype : core.ProjectGraph.prototype;
  recorder.wrapMethod(graphReleaseOwner, "releaseTransientResources", () => ({
    track: "graph",
    label: "projectGraph.releaseTransientResources()",
  }));

  const service = TypeScriptSemanticQueryService.prototype;
  recorder.wrapMethod(service, "beginTurn", function ([filesOrSnapshot]) {
    const argument = Array.isArray(filesOrSnapshot) ? "files" : "snapshot";
    return { track: "service", label: `beginTurn(${argument})` };
  });
  recorder.wrapMethod(service, "releaseTransientResources", () => ({
    track: "service",
    label: "releaseTransientResources()",
  }));
  recorder.wrapMethod(service, "findDefinitions", () => ({ track: "service", label: "findDefinitions()" }));
  recorder.wrapMethod(service, "findReferences", () => ({ track: "service", label: "findReferences()" }));
  if (typeof service.clearQueryCaches === "function") {
    recorder.wrapMethod(service, "clearQueryCaches", () => ({ track: "service", label: "clearQueryCaches()" }));
  }
  if (core.TurnScopedCacheScope) {
    const scope = core.TurnScopedCacheScope.prototype;
    recorder.wrapMethod(scope, "beginTurn", () => ({ track: "scope", label: "scope.beginTurn()" }));
    recorder.wrapMethod(scope, "releaseTransientResources", () => ({
      track: "scope",
      label: "scope.releaseTransientResources()",
    }));
  }
}

function graphProjects(graph) {
  if (buildKey === "main") return { configured: graph.configuredProjects, inferred: graph.inferredProject };
  return { configured: graph.state?.configuredProjects ?? [], inferred: graph.state?.inferredProject };
}

function instrumentProjects(graph) {
  const { configured, inferred } = graphProjects(graph);
  const prototype = Object.getPrototypeOf(inferred);
  if (prototype.releaseTransientResources.musicBoxWrapped) return;
  const laneOf = (project) => {
    const current = graphProjects(graph);
    const index = current.configured.indexOf(project);
    return index >= 0 ? `configured ${index + 1}` : "inferred";
  };
  const release = prototype.releaseTransientResources;
  prototype.releaseTransientResources = function (...args) {
    const lane = laneOf(this);
    if (fault.throwInCleanup === lane) {
      const languageService = this.project.getLanguageService().compilerObject;
      languageService.cleanupSemanticCache = () => {
        throw new Error(`injected cleanupSemanticCache failure (${lane})`);
      };
      inject("projects", "injected: cleanupSemanticCache throws", lane);
      fault.throwInCleanup = undefined;
    }
    const result = release.apply(this, args);
    if (fault.hold && fault.hold.lane === lane) {
      const { hold } = fault;
      fault.hold = undefined;
      inject("projects", "injected: project release held open", `${lane}; real cleanup already ran`);
      return hold.promise;
    }
    return result;
  };
  recorder.wrapMethod(prototype, "releaseTransientResources", function () {
    return { track: "projects", lane: laneOf(this), label: "project.releaseTransientResources()" };
  });
  notes.push(`project lanes: ${configured.length} configured + inferred`);
}

function instrumentStores(backend) {
  const service = backend.semanticQueries;
  const style = service.cacheScope ? "handles" : "maps";
  for (const lane of STORE_LANES) {
    const store = service[lane];
    const map = style === "handles" ? store.values : store;
    if (!(map instanceof Map)) throw new Error(`store ${lane} is not a Map`);
    recorder.instrumentStoreMap(map, lane, style);
  }
  return style;
}

function deferred() {
  let resolvePromise;
  let rejectPromise;
  const promise = new Promise((resolveValue, rejectValue) => {
    resolvePromise = resolveValue;
    rejectPromise = rejectValue;
  });
  return { promise, resolve: resolvePromise, reject: rejectPromise };
}

function createFixture() {
  const root = mkdtempSync(join(tmpdir(), "music-box-64-"));
  const write = (relativePath, content) => {
    mkdirSync(dirname(join(root, relativePath)), { recursive: true });
    writeFileSync(join(root, relativePath), content);
  };
  write("tsconfig.json", JSON.stringify({ compilerOptions: { strict: true }, include: ["src/**/*.ts"] }));
  write("src/lib.ts", "export function target(): void {}\n");
  write("src/app.ts", 'import { target } from "./lib.js";\nexport function caller(): void { target(); }\n');
  write("scripts/tool.ts", 'import { target } from "../src/lib.js";\nexport function tool(): void { target(); }\n');
  return { root, relativePaths: ["scripts/tool.ts", "src/app.ts", "src/lib.ts"] };
}

async function snapshotOf(fileSystem, fixture) {
  const root = fixture.root.replaceAll("\\", "/");
  return {
    root,
    files: await Promise.all(
      fixture.relativePaths.map(async (relative) => {
        const absolute = `${root}/${relative}`;
        return { relative, absolute, metadata: await fileSystem.metadata(absolute) };
      }),
    ),
  };
}

const observer = {
  definitionSearch: (identity) =>
    recorder.emit({ track: "service", kind: "observer", label: "definition search runs", detail: identity.segments[0].name }),
  referenceSearch: (identity) =>
    recorder.emit({ track: "service", kind: "observer", label: "reference search runs", detail: identity.segments[0].name }),
  semanticProjectLoaded: (fileCount) =>
    recorder.emit({ track: "projects", kind: "observer", label: "semantic project loaded", detail: `${fileCount} files` }),
  semanticCacheReleased: () =>
    recorder.emit({ track: "projects", kind: "observer", label: "cleanupSemanticCache done" }),
};

const caller = (label, body) => recorder.runCall({ track: "caller", label }, body);
const target = { file: "src/lib.ts", segments: [{ name: "target" }] };

async function quietly(promise) {
  try {
    return await promise;
  } catch (error) {
    return error;
  }
}

function releaseLikeWorker(backend) {
  return caller("release-transient (worker entry stand-in)", async () => {
    try {
      await Promise.all([backend].map((languageBackend) => languageBackend.releaseTransientResources()));
      recorder.emit({ track: "caller", kind: "reply", label: "replies heap", outcome: "fulfilled" });
    } catch (error) {
      recorder.emit({
        track: "caller",
        kind: "reply",
        label: "replies failed · resource",
        outcome: "rejected",
        detail: messageOf(error),
      });
    }
  });
}

const scenarios = {
  async turn({ backend, snapshot }) {
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    await caller("findDefinitions(target)", () => backend.findDefinitions(snapshot.files, target));
    await caller("findDefinitions(target) again", () => backend.findDefinitions(snapshot.files, target));
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    await caller("findDefinitions(target)", () => backend.findDefinitions(snapshot.files, target));
  },

  async "refresh-fails"({ backend, snapshot }) {
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    const first = caller("findDefinitions(target)", () => backend.findDefinitions(snapshot.files, target));
    const firstAnswer = await first;
    fault.failNextStateRefresh = true;
    await quietly(caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" })));
    const secondAnswer = await caller("findDefinitions(target) after failed refresh", () =>
      backend.findDefinitions(snapshot.files, target),
    );
    notes.push(`answer identity preserved across failed refresh: ${firstAnswer === secondAnswer}`);
  },

  async "release-sync"({ backend, snapshot }) {
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    await caller("findReferences(target)", () => backend.findReferences(snapshot.files, target));
    await caller("findDefinitions(target)", () => backend.findDefinitions(snapshot.files, target));
    instrumentProjects(backend.projectGraph);
    await releaseLikeWorker(backend);
    await caller("findDefinitions(target) after release", () => backend.findDefinitions(snapshot.files, target));
  },

  async "release-held"({ backend, snapshot }) {
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    await caller("findReferences(target)", () => backend.findReferences(snapshot.files, target));
    const before = await caller("findDefinitions(target)", () => backend.findDefinitions(snapshot.files, target));
    instrumentProjects(backend.projectGraph);
    const hold = deferred();
    fault.hold = { lane: "configured 1", ...hold };
    const release = releaseLikeWorker(backend);
    const during = await caller("findDefinitions(target) while release pending", () =>
      backend.findDefinitions(snapshot.files, target),
    );
    await new Promise((resolveTimer) => setTimeout(resolveTimer, 5));
    recorder.emit({ track: "caller", kind: "mark", label: "test settles held project release: fulfilled" });
    hold.resolve();
    await release;
    const after = await caller("findDefinitions(target) after release settles", () =>
      backend.findDefinitions(snapshot.files, target),
    );
    notes.push(`answer during pending release is new: ${during !== before}`);
    notes.push(`answer refilled during pending release survives completion: ${after === during}`);
  },

  async "release-held-rejects"({ backend, snapshot }) {
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    await caller("findReferences(target)", () => backend.findReferences(snapshot.files, target));
    await caller("findDefinitions(target)", () => backend.findDefinitions(snapshot.files, target));
    instrumentProjects(backend.projectGraph);
    const hold = deferred();
    fault.hold = { lane: "configured 1", ...hold };
    const release = releaseLikeWorker(backend);
    await new Promise((resolveTimer) => setTimeout(resolveTimer, 5));
    recorder.emit({ track: "caller", kind: "mark", label: "test settles held project release: rejected" });
    hold.reject(new Error("injected project release rejection (configured 1)"));
    await release;
  },

  async "release-throws"({ backend, snapshot }) {
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    await caller("findReferences(target)", () => backend.findReferences(snapshot.files, target));
    await caller("findDefinitions(target)", () => backend.findDefinitions(snapshot.files, target));
    instrumentProjects(backend.projectGraph);
    fault.throwInCleanup = "configured 1";
    await releaseLikeWorker(backend);
  },

  async "late-answer"({ backend, snapshot }) {
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    const hold = deferred();
    fault.holdAlgorithmEnsure = hold;
    const oldAnswer = caller("findDefinitions(target) — search held", () =>
      backend.findDefinitions(snapshot.files, target),
    );
    await new Promise((resolveTimer) => setTimeout(resolveTimer, 5));
    await caller("refresh(workspace)", () => backend.refresh({ snapshot, coverage: "workspace" }));
    const newAnswer = caller("findDefinitions(target) in new turn", () =>
      backend.findDefinitions(snapshot.files, target),
    );
    await newAnswer;
    recorder.emit({ track: "caller", kind: "mark", label: "test releases held old search" });
    hold.resolve();
    await oldAnswer;
    const later = await caller("findDefinitions(target) after old answer lands", () =>
      backend.findDefinitions(snapshot.files, target),
    );
    notes.push(`new-turn answer kept after old settles: ${later === (await newAnswer)}`);
  },
};

const scenario = scenarios[scenarioKey];
if (!scenario) throw new Error(`unknown scenario ${scenarioKey}`);

const fixture = createFixture();
try {
  instrumentPrototypes();
  const fileSystem = new NodeFileSystem();
  const backend = new TypeScriptBackend(fileSystem, undefined, undefined, observer);
  const storeStyle = instrumentStores(backend);
  const snapshot = await snapshotOf(fileSystem, fixture);
  await scenario({ backend, snapshot });
  await new Promise((resolveTimer) => setTimeout(resolveTimer, 40));
  const trace = recorder.finalize();
  const commit = execFileSync("git", ["-C", worktree, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  const output = {
    build: buildKey,
    buildLabel: build.label,
    commit,
    scenario: scenarioKey,
    storeStyle,
    node: process.version,
    recordedAt: new Date().toISOString(),
    fixture: { relativePaths: fixture.relativePaths, tsconfigInclude: ["src/**/*.ts"] },
    injections,
    notes,
    ...trace,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(output, null, 1)}\n`);
  console.log(`${buildKey} ${scenarioKey}: ${trace.events.length} events; ${notes.join("; ")}`);
} finally {
  rmSync(fixture.root, { recursive: true, force: true });
}
