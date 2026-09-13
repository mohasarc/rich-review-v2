// Worker-thread entry. Wraps the real graph release so that the first loaded configured project's
// own cleanup throws once (then its own method is restored), then runs the unmodified symnav navigation worker entry.
// Adapted from experiments/04-textbook-chapter/probe/worker-with-failing-release.mjs.
import { workerData } from "node:worker_threads";
import { pathToFileURL } from "node:url";

const { worktree } = workerData.probe;
const typescriptBackend = await import(pathToFileURL(`${worktree}/packages/backend-typescript/dist/index.js`).href);
const prototype = typescriptBackend.TypeScriptProjectGraph.prototype;
const originalRelease = prototype.releaseTransientResources;
let injected = false;
prototype.releaseTransientResources = function releaseWithOneFailingProject() {
  const failing = this.state?.configuredProjects.find((project) => project.loaded);
  if (failing && !injected) {
    injected = true;
    const ownRelease = failing.releaseTransientResources;
    failing.releaseTransientResources = () => {
      failing.releaseTransientResources = ownRelease;
      throw new Error("injected: configured project cleanup threw");
    };
  }
  return originalRelease.call(this);
};

await import(pathToFileURL(`${worktree}/apps/cli/dist/daemon/daemon-navigation-worker-entry.js`).href);
