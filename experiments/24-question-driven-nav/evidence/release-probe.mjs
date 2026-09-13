// Runs the same four scenarios against one worktree's built dist.
// Usage: node release-probe.mjs <worktree-path>
import { pathToFileURL } from "node:url";
import { join } from "node:path";

const worktree = process.argv[2];
const core = await import(pathToFileURL(join(worktree, "packages/core/dist/index.js")).href);
const ts = await import(
  pathToFileURL(join(worktree, "packages/backend-typescript/dist/index.js")).href
);
const { InMemoryFileSystem } = core;
const { TypeScriptBackend } = ts;

const unhandled = [];
process.on("unhandledRejection", (reason) => {
  unhandled.push(reason instanceof Error ? reason.message : String(reason));
});

const macrotask = () => new Promise((resolve) => setTimeout(resolve, 20));
const target = { file: "src/app.ts", segments: [{ name: "target" }] };
const emptySummary = { added: 0, changed: 0, removed: 0, unchanged: 0 };

function stubState(refreshOutcome = () => Promise.resolve(emptySummary)) {
  return {
    refresh: refreshOutcome,
    ensureFiles: () => Promise.resolve(),
    locate: () => [],
    locateSemanticCopies: () => [],
  };
}

function track(promise) {
  const status = { settled: "pending" };
  promise.then(
    () => (status.settled = "resolved"),
    (error) => (status.settled = `rejected: ${error.message}`),
  );
  return status;
}

async function pendingProjectRelease() {
  let finish;
  const projectRelease = new Promise((resolve) => (finish = resolve));
  let searches = 0;
  const graph = { releaseTransientResources: () => projectRelease };
  const backend = new TypeScriptBackend(new InMemoryFileSystem({}), stubState(), graph, {
    definitionSearch: () => (searches += 1),
  });
  await backend.refresh({ snapshot: { root: "/repo", files: [] }, coverage: "selection" });
  const before = backend.findDefinitions([], target);
  await before;
  const release = track(backend.releaseTransientResources());
  const during = backend.findDefinitions([], target);
  await during;
  await macrotask();
  const whileProjectReleasePending = release.settled;
  finish();
  await macrotask();
  return {
    scenario: "project release still pending",
    backendReleaseWhileProjectPending: whileProjectReleasePending,
    backendReleaseAfterProjectFinished: release.settled,
    queryDuringReleaseRecomputed: searches === 2,
    definitionSearches: searches,
  };
}

async function rejectingProjectRelease() {
  unhandled.length = 0;
  const graph = {
    releaseTransientResources: async () => {
      throw new Error("project release failed");
    },
  };
  const backend = new TypeScriptBackend(new InMemoryFileSystem({}), stubState(), graph);
  await backend.refresh({ snapshot: { root: "/repo", files: [] }, coverage: "selection" });
  const release = track(backend.releaseTransientResources());
  await macrotask();
  return {
    scenario: "project release rejects",
    backendRelease: release.settled,
    unhandledRejections: [...unhandled],
  };
}

async function failedRefreshKeepsTurn() {
  let refreshFails = false;
  let searches = 0;
  const state = stubState(() =>
    refreshFails ? Promise.reject(new Error("refresh failure")) : Promise.resolve(emptySummary),
  );
  const backend = new TypeScriptBackend(new InMemoryFileSystem({}), state, undefined, {
    definitionSearch: () => (searches += 1),
  });
  const snapshot = { root: "/repo", files: [] };
  await backend.refresh({ snapshot, coverage: "workspace" });
  const first = await backend.findDefinitions([], target);
  refreshFails = true;
  const refresh = track(backend.refresh({ snapshot, coverage: "workspace" }));
  await macrotask();
  const second = await backend.findDefinitions([], target);
  return {
    scenario: "refresh fails after a successful turn",
    refresh: refresh.settled,
    sameCachedResultAfterFailedRefresh: first === second,
    definitionSearches: searches,
  };
}

async function realProjectGraph() {
  const fileSystem = new InMemoryFileSystem({
    "/repo/tsconfig.json": JSON.stringify({ compilerOptions: { strict: true }, include: ["src"] }),
    "/repo/src/app.ts": "export function target(): void {}\nexport function caller(): void { target(); }\n",
  });
  const events = [];
  let searches = 0;
  const backend = new TypeScriptBackend(fileSystem, undefined, undefined, {
    definitionSearch: () => (searches += 1),
    semanticProjectLoaded: (count) => events.push(`project loaded (${count} files)`),
    semanticCacheReleased: () => events.push("language service cache released"),
  });
  const files = ["tsconfig.json", "src/app.ts"].map((relative) => ({
    relative,
    absolute: `/repo/${relative}`,
    metadata: fileSystem.metadataSync(`/repo/${relative}`),
  }));
  const resolved = files.filter((file) => file.relative.endsWith(".ts"));
  await backend.refresh({ snapshot: { root: "/repo", files }, coverage: "workspace" });
  const callers = await backend.findCallers(resolved, target);
  let microtaskTicks = 0;
  let settledAtTick;
  const release = backend.releaseTransientResources().then(() => (settledAtTick = microtaskTicks));
  while (settledAtTick === undefined && microtaskTicks < 50) {
    microtaskTicks += 1;
    await Promise.resolve();
  }
  await release;
  const callersAgain = await backend.findCallers(resolved, target);
  return {
    scenario: "real TypeScriptProjectGraph over in-memory repo",
    callersFound: callers.length,
    events,
    releaseSettledAfterMicrotaskTicks: settledAtTick,
    callersRecomputedAfterRelease: callers !== callersAgain,
  };
}

const results = [];
for (const scenario of [
  pendingProjectRelease,
  rejectingProjectRelease,
  failedRefreshKeepsTurn,
  realProjectGraph,
]) {
  try {
    results.push(await scenario());
  } catch (error) {
    results.push({ scenario: scenario.name, probeError: String(error?.stack ?? error) });
  }
}
console.log(JSON.stringify({ worktree, results }, null, 2));
