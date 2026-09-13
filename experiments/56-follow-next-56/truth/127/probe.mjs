// Real execution against a built pr-127 worktree (base or head). No worktree file is modified.
// Usage: node probe.mjs <worktree> <label>
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const [worktree, label] = process.argv.slice(2);
const load = (path) => import(pathToFileURL(join(worktree, path)).href);
const core = await load("packages/core/dist/index.js");
const ts = await load("packages/backend-typescript/dist/index.js");
const { InMemoryFileSystem, NodeFileSystem } = core;
const { TypeScriptBackend, TypeScriptSemanticQueryService, TypeScriptWorkspaceState } = ts;

const unhandled = [];
process.on("unhandledRejection", (reason) => {
  unhandled.push(reason instanceof Error ? reason.message : String(reason));
});

const identity = (file, name) => ({ file, segments: [{ name }] });
const memoryFiles = (fs, ...paths) =>
  paths.map((path) => ({ relative: path, absolute: `/repo/${path}`, metadata: fs.metadataSync(`/repo/${path}`) }));
const settleState = async (promise) => {
  let state = "pending";
  promise.then(() => (state = "fulfilled"), () => (state = "rejected"));
  const micro = [];
  for (let tick = 0; tick < 20; tick += 1) {
    await Promise.resolve();
    micro.push(state);
  }
  const beforeMacrotask = state;
  await new Promise((resolve) => setImmediate(resolve));
  return { firstSettledMicrotask: micro.indexOf(state) + 1, beforeMacrotask, afterMacrotask: state };
};
const results = { label, node: process.version };

// T1 · callers then references in one turn: count reference searches.
{
  const fs = new InMemoryFileSystem({
    "/repo/src/lib.ts": "export function target(): void {}\n",
    "/repo/src/app.ts": 'import { target } from "./lib.js";\nexport function caller(): void { target(); }\n',
  });
  let referenceSearches = 0;
  const backend = new TypeScriptBackend(fs, undefined, undefined, { referenceSearch: () => (referenceSearches += 1) });
  const files = memoryFiles(fs, "src/app.ts", "src/lib.ts");
  await backend.refresh({ snapshot: { root: "/repo", files }, coverage: "workspace" });
  const target = identity("src/lib.ts", "target");
  const callers = await backend.findCallers(files, target);
  const afterCallers = referenceSearches;
  const references = await backend.findReferences(files, target);
  results.T1_callersThenReferences = {
    callers: callers.length,
    references: references.length,
    referenceSearchesAfterCallers: afterCallers,
    referenceSearchesAfterReferences: referenceSearches,
  };
}

// On-disk workspace: root solution config referencing two configured projects a and b, plus one inferred file.
function diskWorkspace() {
  const root = mkdtempSync(join(tmpdir(), "rr56-127-"));
  const write = (path, content) => {
    mkdirSync(join(root, path, ".."), { recursive: true });
    writeFileSync(join(root, path), content);
  };
  write("tsconfig.json", JSON.stringify({ files: [], references: [{ path: "./a" }, { path: "./b" }] }));
  write("a/tsconfig.json", JSON.stringify({ include: ["**/*.ts"] }));
  write("b/tsconfig.json", JSON.stringify({ include: ["**/*.ts"] }));
  write("a/lib.ts", "export function alpha(): void {}\nexport function useAlpha(): void { alpha(); }\n");
  write("b/lib.ts", "export function beta(): void {}\nexport function useBeta(): void { beta(); }\n");
  write("loose/free.ts", "export function loose(): void {}\nexport function useLoose(): void { loose(); }\n");
  return { root, paths: ["a/lib.ts", "b/lib.ts", "loose/free.ts"] };
}
async function diskSnapshot(fs, root, paths) {
  return {
    root: root.replaceAll("\\", "/"),
    files: await Promise.all(
      paths.map(async (path) => {
        const absolute = join(root, path).replaceAll("\\", "/");
        return { relative: relative(root, absolute).replaceAll("\\", "/"), absolute, metadata: await fs.metadata(absolute) };
      }),
    ),
  };
}
async function loadedDiskBackend(observer) {
  const workspace = diskWorkspace();
  const fs = new NodeFileSystem();
  const backend = new TypeScriptBackend(fs, undefined, undefined, observer);
  const snapshot = await diskSnapshot(fs, workspace.root, workspace.paths);
  const refresh = await backend.refresh({ snapshot, coverage: "workspace" });
  for (const [file, name] of [["a/lib.ts", "alpha"], ["b/lib.ts", "beta"], ["loose/free.ts", "loose"]]) {
    await backend.findReferences(snapshot.files, identity(file, name));
  }
  const graph = backend.projectGraph;
  const projects = [...graph.state.configuredProjects];
  const inferred = graph.state.inferredProject;
  return { workspace, fs, backend, snapshot, refresh, graph, projects, inferred };
}
const describeProject = (project) => ({ ownedFiles: project.ownedFiles.map((file) => file.relative), loaded: project.loaded });

// T2 · default graph, loaded projects: when does concrete cleanup run, when does the caller's promise settle.
{
  const events = [];
  const setup = await loadedDiskBackend({ semanticCacheReleased: () => events.push("semanticCacheReleased") });
  const before = setup.projects.map(describeProject).concat([{ inferred: true, ...describeProject(setup.inferred) }]);
  const target = identity("a/lib.ts", "alpha");
  const cachedBefore = setup.backend.semanticQueries.findDefinitions(target);
  events.push("call:releaseTransientResources");
  const release = setup.backend.releaseTransientResources();
  events.push("call-returned");
  const releasedDuringCall = events.indexOf("semanticCacheReleased") !== -1 && events.indexOf("semanticCacheReleased") < events.indexOf("call-returned");
  const cachedAfterCall = setup.backend.semanticQueries.findDefinitions(target);
  const timing = await settleState(release);
  results.T2_defaultGraphReleaseTiming = {
    refresh: setup.refresh,
    projectsBefore: before,
    events,
    concreteCleanupRanBeforeCallReturned: releasedDuringCall,
    cacheClearedByTheTimeCallReturned: cachedAfterCall !== cachedBefore,
    callerPromise: timing,
  };
  rmSync(setup.workspace.root, { recursive: true, force: true });
}

// T3 · first loaded configured project throws during cleanup; which later projects release; what the caller sees.
{
  const unhandledBefore = unhandled.length;
  const setup = await loadedDiskBackend({});
  const calls = [];
  const loadedConfigured = setup.projects.filter((project) => project.loaded);
  const failing = loadedConfigured[0];
  for (const [index, project] of setup.projects.entries()) {
    const original = project.releaseTransientResources.bind(project);
    const name = `configured[${index}]:${project.ownedFiles.map((file) => file.relative).join(",") || "(no files)"}`;
    project.releaseTransientResources = () => {
      calls.push(name);
      if (project === failing) throw new Error(`cleanup failed in ${name}`);
      return original();
    };
  }
  const inferredOriginal = setup.inferred.releaseTransientResources.bind(setup.inferred);
  setup.inferred.releaseTransientResources = () => {
    calls.push("inferred");
    return inferredOriginal();
  };
  const target = identity("a/lib.ts", "alpha");
  const cachedBefore = setup.backend.semanticQueries.findDefinitions(target);
  let outcome;
  const release = setup.backend.releaseTransientResources();
  const cachedAfterCall = setup.backend.semanticQueries.findDefinitions(target);
  try {
    await release;
    outcome = { state: "fulfilled" };
  } catch (error) {
    outcome = { state: "rejected", message: error.message };
  }
  await new Promise((resolve) => setTimeout(resolve, 50));
  const cachedAfterSettle = setup.backend.semanticQueries.findDefinitions(target);
  results.T3_firstConfiguredCleanupThrows = {
    projectOrder: setup.projects.map(describeProject),
    failingProject: describeProject(failing),
    releaseCallsInOrder: calls,
    callerOutcome: outcome,
    unhandledRejectionsDuringScenario: unhandled.slice(unhandledBefore),
    oldEntryVisibleAfterCall: cachedAfterCall === cachedBefore,
    oldEntryVisibleAfterSettle: cachedAfterSettle === cachedBefore,
  };
  rmSync(setup.workspace.root, { recursive: true, force: true });
}

// T4 · same-turn failure shapes on the service (rejected promise retained; synchronous throw retried).
{
  const failure = new Error("semantic failure");
  let ensureCalls = 0;
  const rejectingState = { ensureFiles: () => { ensureCalls += 1; return Promise.reject(failure); } };
  let definitionSearches = 0;
  const queries = new TypeScriptSemanticQueryService(undefined, rejectingState, { definitionSearch: () => (definitionSearches += 1) });
  queries.beginTurn(label === "base" ? { root: "/repo", files: [] } : []);
  const first = queries.findDefinitions(identity("src/app.ts", "target"));
  first.catch(() => undefined);
  const second = queries.findDefinitions(identity("src/app.ts", "target"));
  second.catch(() => undefined);
  let firstOutcome;
  try { await first; firstOutcome = "fulfilled"; } catch (error) { firstOutcome = `rejected:${error.message}`; }

  const throwingState = { locateSemanticCopies: () => { throw new Error("reference failure"); } };
  let referenceSearches = 0;
  const throwing = new TypeScriptSemanticQueryService(undefined, throwingState, { referenceSearch: () => (referenceSearches += 1) });
  throwing.beginTurn(label === "base" ? { root: "/repo", files: [] } : []);
  const outcomes = [];
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try { await throwing.findReferences(identity("src/app.ts", "target")); outcomes.push("fulfilled"); }
    catch (error) { outcomes.push(`rejected:${error.message}`); }
  }
  results.T4_failureShapes = {
    rejectedDefinition: { samePromiseOnRepeat: first === second, definitionSearches, firstOutcome },
    synchronousReferenceThrow: { outcomes, referenceSearches },
  };
}

// T5 · service without a project graph: release result.
{
  const queries = new TypeScriptSemanticQueryService(undefined, { ensureFiles: () => Promise.resolve() });
  const returned = queries.releaseTransientResources();
  results.T5_noProjectGraphRelease = {
    returned: returned === undefined ? "undefined" : typeof returned.then === "function" ? "promise" : typeof returned,
    settle: returned && typeof returned.then === "function" ? await settleState(returned) : null,
  };
}

results.unhandledRejectionsTotal = unhandled;
process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
