import { AsyncLocalStorage } from "node:async_hooks";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const label = process.argv[2];
if (label !== "base" && label !== "head") throw new Error("usage: node trace-old.mjs base|head");
process.env.SYMNAV_TELEMETRY = "0";
const WORKTREE = join(homedir(), `projects/rich-review-v2/worktrees/pr-148-${label}`);
const CLI_DIST = pathToFileURL(`${WORKTREE}/apps/cli/dist/`).href;
const OUT = new URL(`./trace-old-${label}.json`, import.meta.url);

const { DaemonCommandDispatcher } = await import(`${CLI_DIST}daemon/daemon-command-dispatcher.js`);
const { InvocationWorkspaceSelector } = await import(`${CLI_DIST}daemon/invocation-workspace-selector.js`);
const { DaemonRegistry } = await import(`${CLI_DIST}daemon/daemon-registry.js`);
const { DaemonRecordObserver } = await import(`${CLI_DIST}daemon/daemon-record-observer.js`);
const { DaemonStartupCoordinator } = await import(`${CLI_DIST}daemon/daemon-startup-coordinator.js`);
const { NodeDaemonProcessLauncher } = await import(`${CLI_DIST}daemon/daemon-process-launcher.js`);
const { LocalDaemonTransport } = await import(`${CLI_DIST}daemon/local-daemon-transport.js`);
const { DaemonClientResultCapture } = await import(`${CLI_DIST}daemon/daemon-client-result-capture.js`);
const { DaemonController } = await import(`${CLI_DIST}daemon/daemon-controller.js`);
const { CliProgramExecutor } = await import(`${CLI_DIST}cli-program-executor.js`);
const { createDefaultDependencies } = await import(`${CLI_DIST}program.js`);
const { createWorkspace } = await import(pathToFileURL(`${WORKTREE}/packages/core/dist/index.js`).href);
const { DaemonPolicy } = await import(pathToFileURL(`${WORKTREE}/packages/daemon/dist/index.js`).href);

const scope = new AsyncLocalStorage();
const events = [];
const startedAt = performance.now();
let sequence = 0;
let currentStep = "setup";
const elapsed = () => Math.round((performance.now() - startedAt) * 10) / 10;

class Probe {
  static record(spoke, method, phase, detail) {
    events.push({ id: ++sequence, parent: scope.getStore(), step: currentStep, t: elapsed(), spoke, method, phase, detail });
  }

  static wrap(target, method, spoke, describe = () => undefined) {
    const original = target[method];
    if (typeof original !== "function") throw new Error(`${spoke}.${method} missing`);
    target[method] = function probed(...args) {
      const id = ++sequence;
      const parent = scope.getStore();
      events.push({ id, parent, step: currentStep, t: elapsed(), spoke, method, phase: "call" });
      const finish = (phase, value) =>
        events.push({ id, parent, step: currentStep, t: elapsed(), spoke, method, phase, detail: describe(value) });
      let result;
      try {
        result = scope.run(id, () => original.apply(this, args));
      } catch (error) {
        finish("throw", String(error));
        throw error;
      }
      if (result && typeof result.then === "function") {
        return result.then(
          (value) => {
            finish("return", value);
            return value;
          },
          (error) => {
            finish("throw", String(error));
            throw error;
          },
        );
      }
      finish("return", result);
      return result;
    };
  }
}

const routeOf = (value) => (value && typeof value === "object" && "kind" in value ? { kind: value.kind, reason: value.reason } : undefined);
Probe.wrap(DaemonCommandDispatcher.prototype, "execute", "DaemonCommandDispatcher", (v) => ({ mode: v?.mode }));
Probe.wrap(DaemonCommandDispatcher.prototype, "routeFor", "DaemonCommandDispatcher", routeOf);
Probe.wrap(InvocationWorkspaceSelector.prototype, "select", "InvocationWorkspaceSelector", (v) => ({ route: v?.route?.kind, commandName: v?.commandName }));
const createRuntime = DaemonCommandDispatcher.createRuntime;
DaemonCommandDispatcher.createRuntime = function (...args) {
  Probe.record("DaemonCommandDispatcher", "createRuntime", "call", "new registry, transport, terminator, launcher, observer, coordinator");
  return createRuntime.apply(this, args);
};
for (const method of ["read", "readStored", "acquireStartup", "writeStartingIfStartupOwner", "removeIfProcess"]) {
  Probe.wrap(DaemonRegistry.prototype, method, "DaemonRegistry");
}
Probe.wrap(DaemonRecordObserver.prototype, "observe", "DaemonRecordObserver", (v) => ({ kind: v?.kind }));
Probe.wrap(DaemonStartupCoordinator.prototype, "trigger", "DaemonStartupCoordinator", (v) => ({ status: v?.status }));
Probe.wrap(NodeDaemonProcessLauncher.prototype, "launch", "NodeDaemonProcessLauncher", (v) => ({ pid: v?.pid }));
Probe.wrap(LocalDaemonTransport.prototype, "request", "LocalDaemonTransport", (v) => ({ kind: v?.kind }));
Probe.wrap(LocalDaemonTransport.prototype, "execute", "LocalDaemonTransport");
Probe.wrap(DaemonClientResultCapture.prototype, "append", "DaemonClientResultCapture");
Probe.wrap(DaemonClientResultCapture.prototype, "finish", "DaemonClientResultCapture");
Probe.wrap(CliProgramExecutor.prototype, "execute", "CliProgramExecutor", (v) => ({ exitCode: v?.exitCode }));

const root = mkdtempSync(join(tmpdir(), `rr-old-hub-${label}-`));
const stateDirectory = join(root, "state");
const workspaceRoot = join(root, "ws");
mkdirSync(stateDirectory, { recursive: true });
cpSync(join(WORKTREE, "packages/testing/fixtures/overview-cases"), workspaceRoot, { recursive: true });
renameSync(join(workspaceRoot, "dot-git"), join(workspaceRoot, ".git"));

const policy = DaemonPolicy.currentSystem();
const makeDispatcher = (daemonEnabled) =>
  new DaemonCommandDispatcher({
    createDependencies: (directory) => createDefaultDependencies(directory, policy),
    stateDirectory,
    policy,
    daemonEnabled: () => daemonEnabled,
    resolveWorkspaceRoot: async (startDir, dependencies) => {
      Probe.record("@symnav/core", "createWorkspace", "call", startDir === workspaceRoot ? "<ws>" : startDir);
      return (await createWorkspace({ startDir, fs: dependencies.fs })).root;
    },
  });

const steps = [];
async function step(name, labelText, argv, daemonEnabled = true) {
  currentStep = name;
  const t0 = elapsed();
  const dispatched = await makeDispatcher(daemonEnabled).execute({ argv, cwd: workspaceRoot, telemetryEnabled: false, executionMode: "cold" });
  let bytes = 0;
  let firstLine = "";
  const hash = createHash("sha256");
  for await (const record of dispatched.result.output.records()) {
    hash.update(record.stream);
    hash.update(record.bytes);
    bytes += record.bytes.byteLength;
    if (!firstLine) firstLine = Buffer.from(record.bytes).toString().split("\n")[0];
  }
  await dispatched.result.output.dispose();
  steps.push({ name, label: labelText, argv, startedAt: t0, finishedAt: elapsed(), mode: dispatched.mode, exitCode: dispatched.result.exitCode, bytes, sha256: hash.digest("hex").slice(0, 16), firstLine });
}

function readyRecord() {
  const daemons = join(stateDirectory, "daemons");
  if (!existsSync(daemons)) return undefined;
  for (const identity of readdirSync(daemons)) {
    for (const name of readdirSync(join(daemons, identity))) {
      if (!name.endsWith(".json")) continue;
      const record = JSON.parse(readFileSync(join(daemons, identity, name), "utf8"));
      if (record.state === "ready") return record;
    }
  }
  return undefined;
}

try {
  await step("L", "symnav --version (local route)", ["--version"]);
  await step("A", "overview #1 — no daemon yet", ["overview", "barrel.ts"]);
  currentStep = "A-wait";
  for (let attempt = 0; attempt < 400 && readyRecord() === undefined; attempt += 1) await delay(25);
  await delay(300);
  await step("B", "overview #2 — daemon ready", ["overview", "barrel.ts"]);
  await step("G", "overview #3 — SYMNAV_DAEMON=0", ["overview", "barrel.ts"], false);
} finally {
  currentStep = "cleanup";
  const record = readyRecord();
  let stop;
  if (record) {
    const controller = new DaemonController(
      new DaemonRegistry(join(stateDirectory, "daemons"), policy.values.startup),
      new LocalDaemonTransport({ policy }),
      stateDirectory,
      { policy: policy.values },
    );
    stop = await controller.stop(workspaceRoot).catch((error) => String(error));
  }
  writeFileSync(
    OUT,
    JSON.stringify({ recordedAt: new Date().toISOString(), worktree: label, node: process.version, steps, events, stop: stop?.status ?? stop }, null, 2),
  );
  console.log(label, steps.map((s) => `${s.name}:${s.mode}:${s.exitCode}:${Math.round(s.finishedAt - s.startedAt)}ms`).join(" "), "stop:", stop?.status ?? stop);
  rmSync(root, { recursive: true, force: true });
  setTimeout(() => process.exit(0), 200).unref();
}
