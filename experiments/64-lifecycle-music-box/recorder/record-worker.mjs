import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { messageOf, ScoreRecorder } from "./score-recorder.mjs";

const experimentDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const worktrees = resolve(experimentDirectory, "../../worktrees");
const BUILDS = {
  main: { directory: "main", label: "main" },
  base: { directory: "pr-127-base", label: "#126 base" },
  head: { directory: "pr-127-head", label: "#127 head" },
};

const argumentsByName = Object.fromEntries(
  process.argv.slice(2).map((argument) => argument.replace(/^--/, "").split("=")),
);
const buildKey = argumentsByName.build;
const faultKey = argumentsByName.fault ?? "none";
const outputPath = argumentsByName.out;
const build = BUILDS[buildKey];
if (!build || !outputPath) throw new Error("usage: --build=main|base|head --fault=none|throw|hold --out=<file>");
const worktree = join(worktrees, build.directory);
setTimeout(() => {
  console.error(`${buildKey} worker probe timed out`);
  process.exit(2);
}, 90_000).unref();

const root = mkdtempSync(join(tmpdir(), "music-box-64-worker-"));
const stateDirectory = mkdtempSync(join(tmpdir(), "music-box-64-state-"));
const traceFile = join(stateDirectory, "worker-trace.jsonl");
const write = (relativePath, content) => {
  mkdirSync(dirname(join(root, relativePath)), { recursive: true });
  writeFileSync(join(root, relativePath), content);
};
write("tsconfig.json", JSON.stringify({ compilerOptions: { strict: true }, include: ["src/**/*.ts"] }));
write("src/lib.ts", "export function target(): void {}\n");
write("src/app.ts", 'import { target } from "./lib.js";\nexport function caller(): void { target(); }\n');
write("scripts/tool.ts", 'import { target } from "../src/lib.js";\nexport function tool(): void { target(); }\n');
execFileSync("git", ["init", "-q", root]);
writeFileSync(traceFile, "");

const counterBuffer = new SharedArrayBuffer(4);
const parentEvents = [];
const recorder = new ScoreRecorder({
  counter: new Int32Array(counterBuffer),
  thread: "parent",
  sink: (event) => parentEvents.push(event),
});

const { NodeDaemonNavigationWorker } = await import(
  pathToFileURL(join(worktree, "apps/cli/dist/daemon/daemon-navigation-worker.js")).href
);
const workerPrototype = NodeDaemonNavigationWorker.prototype;
recorder.wrapMethod(workerPrototype, "start", () => ({ track: "parent", label: "worker.start(root)" }));
recorder.wrapMethod(workerPrototype, "execute", function ([, request]) {
  return { track: "parent", label: `worker.execute(${request.argv[0]})`, detail: request.argv.join(" ") };
});
recorder.wrapMethod(workerPrototype, "releaseTransientResources", () => ({
  track: "parent",
  label: "worker.releaseTransientResources()",
}));

const navigationWorker = new NodeDaemonNavigationWorker({
  generation: 1,
  configuration: { stateDirectory },
  resourceLimits: { maxOldGenerationSizeMb: 1024 },
  entryUrl: new URL("./worker-entry-probe.mjs", import.meta.url),
  workerData: {
    probe: {
      counter: counterBuffer,
      traceFile,
      worktree,
      build: buildKey,
      fault: faultKey,
      realEntry: pathToFileURL(join(worktree, "apps/cli/dist/daemon/daemon-navigation-worker-entry.js")).href,
    },
  },
});
navigationWorker.worker.on("error", (error) =>
  recorder.emit({ track: "parent", kind: "worker-error", label: "Worker 'error' event", detail: messageOf(error) }),
);
navigationWorker.worker.on("exit", (code) =>
  recorder.emit({ track: "parent", kind: "worker-exit", label: "Worker 'exit' event", detail: `code ${code}` }),
);
let exitRecord;
void navigationWorker.exited.then((exit) => {
  exitRecord = exit;
  recorder.emit({
    track: "parent",
    kind: "exited",
    label: `exited promise: cause ${exit.cause}`,
    detail: exit.errorName ? `errorName ${exit.errorName}` : undefined,
  });
});

const outcomes = {};
const settle = async (name, promise) => {
  try {
    const value = await promise;
    outcomes[name] = { outcome: "fulfilled", kind: value?.kind };
  } catch (error) {
    outcomes[name] = { outcome: "rejected", error: messageOf(error) };
  }
};

const output = [];
await settle("start", navigationWorker.start(root));
await settle(
  "execute",
  navigationWorker.execute(
    "refs-1",
    { argv: ["refs", "src/lib.ts::target", "--all", "--json"], cwd: root, telemetryEnabled: false },
    { append: async (record) => output.push(Buffer.from(record.bytes).toString("utf8")) },
  ),
);
if (faultKey === "hold") {
  const release = settle("release", navigationWorker.releaseTransientResources());
  await new Promise((resolveTimer) => setTimeout(resolveTimer, 5));
  const nextCommand = settle(
    "execute-during-release",
    navigationWorker.execute(
      "refs-2",
      { argv: ["refs", "src/lib.ts::target", "--all", "--json"], cwd: root, telemetryEnabled: false },
      { append: async () => undefined },
    ),
  );
  await Promise.all([release, nextCommand]);
} else {
  await settle("release", navigationWorker.releaseTransientResources());
}
await Promise.race([navigationWorker.exited, new Promise((resolveTimer) => setTimeout(resolveTimer, 400))]);
if (!exitRecord) {
  recorder.emit({ track: "parent", kind: "mark", label: "still running after 400 ms; probe terminates it" });
  await settle("terminate", navigationWorker.terminate());
}
await new Promise((resolveTimer) => setTimeout(resolveTimer, 20));

const parentTrace = recorder.finalize();
const workerLines = readFileSync(traceFile, "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const workerEvents = workerLines.filter((line) => !line.patch);
for (const patch of workerLines.filter((line) => line.patch === "outcome")) {
  const event = workerEvents.find((candidate) => candidate.seq === patch.seq);
  if (event) event.outcome = patch.outcome;
}
const events = [...parentTrace.events, ...workerEvents].sort((left, right) => left.seq - right.seq);
const commit = execFileSync("git", ["-C", worktree, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `${JSON.stringify(
    {
      build: buildKey,
      buildLabel: build.label,
      commit,
      scenario: `worker-${faultKey}`,
      node: process.version,
      recordedAt: new Date().toISOString(),
      fault: faultKey,
      outcomes,
      exit: exitRecord,
      refsOutput: output.join("").slice(0, 600),
      injections: {
        throw: [{ track: "projects", label: "injected: cleanupSemanticCache throws", detail: "configured 1" }],
        hold: [{ track: "projects", label: "injected: project release held 150 ms", detail: "configured 1; real cleanup already ran" }],
        none: [],
      }[faultKey],
      notes: [],
      events,
      calls: parentTrace.calls,
      promises: parentTrace.promises,
    },
    null,
    1,
  )}\n`,
);
console.log(`${buildKey} worker fault=${faultKey}: ${events.length} events; outcomes ${JSON.stringify(outcomes)}; exit ${JSON.stringify(exitRecord)}`);
rmSync(root, { recursive: true, force: true });
rmSync(stateDirectory, { recursive: true, force: true });
process.exit(0);
