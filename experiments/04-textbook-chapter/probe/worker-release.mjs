// Real daemon navigation worker (worker thread) from a built worktree; one release with injected failure.
// Usage: node worker-release.mjs <worktree-path> <label> <sync|async>
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

const [worktree, label, releaseShape] = process.argv.slice(2);
const { NodeDaemonNavigationWorker } = await import(
  pathToFileURL(`${worktree}/apps/cli/dist/daemon/daemon-navigation-worker.js`).href
);

const workspace = mkdtempSync(join(tmpdir(), "rr04-workspace-"));
const stateDirectory = mkdtempSync(join(tmpdir(), "rr04-state-"));
mkdirSync(join(workspace, "src"));
mkdirSync(join(workspace, ".git"));
writeFileSync(join(workspace, "tsconfig.json"), JSON.stringify({ include: ["src/**/*.ts"] }));
writeFileSync(join(workspace, "src/lib.ts"), "export function target(): void {}\n");
writeFileSync(
  join(workspace, "src/app.ts"),
  'import { target } from "./lib.js";\nexport function caller(): void { target(); }\n',
);

const startedAt = performance.now();
const events = [];
const note = (kind, detail = {}) =>
  events.push({ atMs: Math.round(performance.now() - startedAt), kind, ...detail });

const worker = new NodeDaemonNavigationWorker({
  generation: 1,
  configuration: { stateDirectory },
  resourceLimits: { maxOldGenerationSizeMb: 512 },
  entryUrl: new URL("./worker-with-failing-release.mjs", import.meta.url),
  workerData: { probe: { worktree, releaseShape } },
});
worker.exited.then((exit) => note("worker-exited", { exit }));

try {
  const ready = await worker.start(workspace);
  note("start-resolved", { response: ready.kind, fileCount: ready.fileCount });
} catch (error) {
  note("start-rejected", { message: error.message });
}

try {
  const response = await worker.releaseTransientResources();
  note("release-resolved", { response: response.kind });
} catch (error) {
  note("release-rejected", { message: error.message });
}

const exitedWithinWindow = await Promise.race([
  worker.exited.then(() => true),
  new Promise((resolve) => setTimeout(() => resolve(false), 1500)),
]);
if (!exitedWithinWindow) {
  note("still-alive-after-1500ms");
  try {
    const response = await worker.releaseTransientResources();
    note("second-release-resolved", { response: response.kind });
  } catch (error) {
    note("second-release-rejected", { message: error.message });
  }
  await worker.terminate();
}
await worker.exited;
rmSync(workspace, { recursive: true, force: true });
rmSync(stateDirectory, { recursive: true, force: true });
process.stdout.write(JSON.stringify({ label, releaseShape, node: process.version, events }, null, 2));
