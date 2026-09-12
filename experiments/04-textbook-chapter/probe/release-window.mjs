// Release while the project graph's release is still pending (fake project graph, real backend + service).
// Mirrors the PR's own test setup so it can run on main, #126 and #127 alike.
// Usage: node release-window.mjs <worktree-path> <label>
import { pathToFileURL } from "node:url";

const [worktree, label] = process.argv.slice(2);
const core = await import(pathToFileURL(`${worktree}/packages/core/dist/index.js`).href);
const typescriptBackend = await import(
  pathToFileURL(`${worktree}/packages/backend-typescript/dist/index.js`).href
);

const unhandled = [];
process.on("unhandledRejection", (reason) => {
  unhandled.push(reason instanceof Error ? reason.message : String(reason));
});

const timeline = [];
const note = (event, detail = {}) => timeline.push({ event, ...detail });

let rejectProjectRelease;
const projectGraph = {
  refresh: async () => undefined,
  releaseTransientResources: () => {
    note("project release started");
    return new Promise((_resolve, reject) => {
      rejectProjectRelease = reject;
    });
  },
};
const state = {
  refresh: async () => ({ added: 0, changed: 0, removed: 0, unchanged: 0 }),
  ensureFiles: async () => undefined,
  locate: () => [],
};
let definitionSearches = 0;
const backend = new typescriptBackend.TypeScriptBackend(
  new core.InMemoryFileSystem({}),
  state,
  projectGraph,
  {
    definitionSearch: () => {
      definitionSearches += 1;
    },
  },
);
const target = { file: "src/app.ts", segments: [{ name: "target" }] };

await backend.refresh({ snapshot: { root: "/repo", files: [] }, coverage: "selection" });
await backend.findDefinitions([], target);
note("definition searched in open turn", { definitionSearches });

const release = backend.releaseTransientResources();
let releaseState = "pending";
release.then(
  () => {
    releaseState = "resolved";
    note("backend release resolved");
  },
  (error) => {
    releaseState = "rejected";
    note("backend release rejected", { error: error.message });
  },
);
note("backend release called");

await backend.findDefinitions([], target);
note("definition asked while project release pending", { definitionSearches });

await new Promise((resolve) => setImmediate(resolve));
note("checkpoint before project release settles", { backendRelease: releaseState });

rejectProjectRelease(new Error("project release failed"));
await new Promise((resolve) => setImmediate(resolve));
await new Promise((resolve) => setImmediate(resolve));
note("checkpoint after project release rejected", {
  backendRelease: releaseState,
  unhandledRejections: [...unhandled],
});

process.stdout.write(JSON.stringify({ label, node: process.version, timeline }, null, 2));
