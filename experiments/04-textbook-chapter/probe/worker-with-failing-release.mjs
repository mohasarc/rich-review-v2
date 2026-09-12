// Worker-thread entry: patch project-graph release to fail, then load the real symnav worker entry.
import { workerData } from "node:worker_threads";
import { pathToFileURL } from "node:url";

const { worktree, releaseShape } = workerData.probe;
const typescriptBackend = await import(
  pathToFileURL(`${worktree}/packages/backend-typescript/dist/index.js`).href
);
const prototype = typescriptBackend.TypeScriptProjectGraph.prototype;
const failure = () => new Error("injected: project release failed");
if (releaseShape !== "none") prototype.releaseTransientResources =
  releaseShape === "sync"
    ? function releaseFailsSynchronously() {
        throw failure();
      }
    : async function releaseRejects() {
        throw failure();
      };

await import(pathToFileURL(`${worktree}/apps/cli/dist/daemon/daemon-navigation-worker-entry.js`).href);
