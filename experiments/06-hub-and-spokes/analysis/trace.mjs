import { AsyncLocalStorage } from "node:async_hooks";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, relative } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const HEAD = join(homedir(), "projects/rich-review-v2/worktrees/pr-148-head/packages/daemon");
const DIST = pathToFileURL(`${HEAD}/dist/`).href;
const FIXTURE_URL = pathToFileURL(`${HEAD}/test/fixtures/executor-module.mjs`).href;
const REAL_CLI = process.env.EXECUTOR === "cli";
const WORKTREE = join(homedir(), "projects/rich-review-v2/worktrees/pr-148-head");
const CLI_EXECUTOR_URL = pathToFileURL(`${WORKTREE}/apps/cli/dist/daemon-executor.js`).href;
const OUT = new URL(REAL_CLI ? "./trace-cli.json" : "./trace.json", import.meta.url);
if (REAL_CLI) process.env.SYMNAV_TELEMETRY = "0";

const { DaemonClient } = await import(`${DIST}index.js`);
const { DaemonClientRuntime } = await import(`${DIST}client/daemon-client-runtime.js`);
const { DaemonRoutingPolicy } = await import(`${DIST}client/daemon-routing-policy.js`);
const { DaemonRegistry } = await import(`${DIST}registry/registry.js`);
const { DaemonRecordObserver } = await import(`${DIST}registry/record-observer.js`);
const { DaemonStartupCoordinator } = await import(`${DIST}registry/startup-coordinator.js`);
const { NodeDaemonProcessLauncher, NodeDaemonProcessTerminator } = await import(
  `${DIST}process/process-launcher.js`
);
const { DaemonController } = await import(`${DIST}process/controller.js`);
const { LocalDaemonTransport } = await import(`${DIST}transport/local-transport.js`);
const { DaemonClientResultCapture } = await import(`${DIST}transport/client-result-capture.js`);
const fixture = await import(REAL_CLI ? CLI_EXECUTOR_URL : FIXTURE_URL);
const { createWorkspace } = await import(pathToFileURL(`${WORKTREE}/packages/core/dist/index.js`).href);
const { NodeFileSystem } = await import(pathToFileURL(`${WORKTREE}/packages/core/dist/index.js`).href);

const scope = new AsyncLocalStorage();
const events = [];
const startedAt = performance.now();
const wallStartMs = Date.now();
let sequence = 0;
let currentStep = "setup";

const elapsed = () => Math.round((performance.now() - startedAt) * 10) / 10;

class Summary {
  static of(value, depth = 0) {
    if (value === undefined || value === null) return value;
    if (typeof value === "string") return value.length > 90 ? `${value.slice(0, 87)}...` : value;
    if (typeof value === "number" || typeof value === "boolean") return value;
    if (typeof value === "function") return "[fn]";
    if (value instanceof Uint8Array) return `[${value.byteLength} bytes]`;
    if (value instanceof Error) return `${value.name}: ${value.message}`;
    if (Array.isArray(value)) return depth > 1 ? `[${value.length} items]` : value.slice(0, 6).map((v) => Summary.of(v, depth + 1));
    if (typeof value.then === "function") return "[promise]";
    if (depth > 1) return `{${Object.keys(value).slice(0, 5).join(",")}}`;
    const picked = {};
    for (const key of Object.keys(value).slice(0, 12)) picked[key] = Summary.of(value[key], depth + 1);
    const name = value.constructor?.name;
    return name && name !== "Object" ? { class: name, ...picked } : picked;
  }
}

class Probe {
  static wrap(target, method, spoke, tag = () => undefined) {
    const original = target[method];
    if (typeof original !== "function") throw new Error(`${spoke}.${method} missing`);
    target[method] = function probed(...args) {
      const id = ++sequence;
      const instance = tag(this);
      const parent = scope.getStore();
      events.push({ id, parent, step: currentStep, t: elapsed(), spoke, instance, method, phase: "call", args: Summary.of(args) });
      const finish = (phase, value) =>
        events.push({ id, parent, step: currentStep, t: elapsed(), spoke, instance, method, phase, value: Summary.of(value) });
      let result;
      try {
        result = scope.run(id, () => original.apply(this, args));
      } catch (error) {
        finish("throw", error);
        throw error;
      }
      if (result && typeof result.then === "function" && !(Symbol.asyncIterator in result)) {
        return result.then(
          (value) => {
            finish("return", value);
            return value;
          },
          (error) => {
            finish("throw", error);
            throw error;
          },
        );
      }
      finish("return", result);
      return result;
    };
  }
}

Probe.wrap(DaemonClientRuntime.prototype, "execute", "DaemonClientRuntime");
Probe.wrap(DaemonClientRuntime.prototype, "control", "DaemonClientRuntime");
Probe.wrap(DaemonRoutingPolicy.prototype, "decide", "DaemonRoutingPolicy");
const decide = DaemonRoutingPolicy.prototype.decide;
DaemonRoutingPolicy.prototype.decide = function (...args) {
  for (const guard of this.guards) {
    if (!guard.__probed) {
      Probe.wrap(guard, "evaluate", `guard:${guard.constructor.name}`);
      guard.__probed = true;
    }
  }
  return decide.apply(this, args);
};
for (const method of [
  "read",
  "readInstance",
  "readStored",
  "list",
  "acquireStartup",
  "writeStartingIfStartupOwner",
  "writeIfStartupOwner",
  "removeIfProcess",
  "startupOwner",
  "daemonOwnsStartupProcess",
]) {
  Probe.wrap(DaemonRegistry.prototype, method, "DaemonRegistry");
}
Probe.wrap(DaemonRecordObserver.prototype, "observe", "DaemonRecordObserver");
Probe.wrap(DaemonRecordObserver.prototype, "observeIdentity", "DaemonRecordObserver");
Probe.wrap(DaemonStartupCoordinator.prototype, "trigger", "DaemonStartupCoordinator");
Probe.wrap(DaemonStartupCoordinator.prototype, "ensureRunning", "DaemonStartupCoordinator");
Probe.wrap(DaemonStartupCoordinator.prototype, "waitUntilReady", "DaemonStartupCoordinator");
Probe.wrap(NodeDaemonProcessLauncher.prototype, "launch", "NodeDaemonProcessLauncher");
Probe.wrap(NodeDaemonProcessTerminator.prototype, "terminate", "NodeDaemonProcessTerminator");
const controllerTag = (controller) => (controller.launcher === undefined ? "statusController" : "controlController");
const transportTag = (transport) => `${transport.lifecycle?.options?.responseTimeoutMs}ms`;
Probe.wrap(DaemonController.prototype, "start", "DaemonController", controllerTag);
Probe.wrap(DaemonController.prototype, "status", "DaemonController", controllerTag);
Probe.wrap(DaemonController.prototype, "stop", "DaemonController", controllerTag);
Probe.wrap(LocalDaemonTransport.prototype, "request", "LocalDaemonTransport", transportTag);
Probe.wrap(LocalDaemonTransport.prototype, "execute", "LocalDaemonTransport", transportTag);
Probe.wrap(LocalDaemonTransport.prototype, "executionStatus", "LocalDaemonTransport", transportTag);
Probe.wrap(DaemonClientResultCapture.prototype, "append", "DaemonClientResultCapture");
Probe.wrap(DaemonClientResultCapture.prototype, "finish", "DaemonClientResultCapture");

class Disk {
  static snapshot(root) {
    if (!existsSync(root)) return [];
    const entries = [];
    const walk = (directory) => {
      let names;
      try {
        names = readdirSync(directory).sort();
      } catch {
        return;
      }
      for (const name of names) {
        const path = join(directory, name);
        try {
          const stats = statSync(path);
          if (stats.isDirectory()) {
            entries.push({ path: `${relative(root, path)}/`, kind: "dir" });
            walk(path);
          } else {
            const entry = { path: relative(root, path), kind: "file", bytes: stats.size };
            if (name.endsWith(".json")) entry.json = JSON.parse(readFileSync(path, "utf8"));
            entries.push(entry);
          }
        } catch {
          entries.push({ path: relative(root, path), kind: "vanished" });
        }
      }
    };
    walk(root);
    return entries;
  }
}

class OutputText {
  static async read(result) {
    const chunks = [];
    const hash = createHash("sha256");
    let bytes = 0;
    for await (const record of result.output.records()) {
      hash.update(record.stream);
      hash.update(record.bytes);
      bytes += record.bytes.byteLength;
      chunks.push(`${record.stream}:${Buffer.from(record.bytes).toString().slice(0, 60)}`);
    }
    await result.output.dispose();
    return { bytes, sha256: hash.digest("hex").slice(0, 16), preview: chunks };
  }
}

const root = mkdtempSync(join(tmpdir(), "rr-hub-trace-"));
const stateDirectory = join(root, "state");
const workspaceDirectory = join(root, "workspace");
mkdirSync(stateDirectory, { recursive: true });
if (REAL_CLI) {
  cpSync(join(WORKTREE, "packages/testing/fixtures/overview-cases"), workspaceDirectory, { recursive: true });
  renameSync(join(workspaceDirectory, "dot-git"), join(workspaceDirectory, ".git"));
} else {
  mkdirSync(workspaceDirectory, { recursive: true });
}
const workspaceRoot = REAL_CLI
  ? (await createWorkspace({ startDir: workspaceDirectory, fs: new NodeFileSystem() })).root
  : workspaceDirectory;

const executorFactory = (options) => {
  events.push({ id: ++sequence, parent: scope.getStore(), step: currentStep, t: elapsed(), spoke: "host:executorFactory", method: "create", phase: "call", args: Summary.of([options]) });
  return fixture.createDaemonExecutor(options);
};

const options = {
  stateDirectory,
  productVersion: REAL_CLI
    ? JSON.parse(readFileSync(join(WORKTREE, "apps/cli/package.json"), "utf8")).version
    : "trace-1.0.0",
  daemonEnabled: true,
  executorFactory,
  executorModuleUrl: REAL_CLI ? CLI_EXECUTOR_URL : FIXTURE_URL,
  readinessProbe: { commandName: "version", argv: ["--version"] },
};
const client = new DaemonClient(options);
const steps = [];

async function step(name, label, action) {
  currentStep = name;
  const t0 = elapsed();
  const before = Disk.snapshot(stateDirectory);
  let outcome;
  try {
    outcome = await action();
  } catch (error) {
    outcome = { error: `${error.name}: ${error.message}` };
  }
  steps.push({ name, label, startedAt: t0, finishedAt: elapsed(), outcome: Summary.of(outcome), diskBefore: before, diskAfter: Disk.snapshot(stateDirectory) });
}

async function executeStep(target, fixtureArgv) {
  const argv = REAL_CLI ? ["overview", "barrel.ts"] : fixtureArgv;
  const response = await target.execute({ workspaceRoot, commandName: "overview", argv, cwd: workspaceDirectory, telemetryEnabled: false });
  return { mode: response.mode, exitCode: response.result.exitCode, output: await OutputText.read(response.result) };
}

async function waitForReady() {
  for (let attempt = 0; attempt < 600; attempt += 1) {
    const ready = Disk.snapshot(stateDirectory).find((entry) => entry.json?.state === "ready");
    if (ready) return { attempts: attempt + 1, record: ready.path };
    await delay(25);
  }
  throw new Error("daemon never became ready");
}

try {
  await step("A", "execute #1 — no daemon yet", () => executeStep(client, ["stdout:answer A\n"]));
  currentStep = "A-wait";
  const waitStarted = elapsed();
  const ready = await waitForReady();
  steps.push({ name: "A-wait", label: "background warm-up finishes (poll disk only)", startedAt: waitStarted, finishedAt: elapsed(), outcome: ready, diskBefore: [], diskAfter: Disk.snapshot(stateDirectory) });
  await delay(300);
  await step("B", "execute #2 — daemon ready", () => executeStep(client, ["stdout:answer B\n"]));
  await step("C", "control status", () => client.control({ action: "status" }));
  if (!REAL_CLI) {
    await step("D", "execute #3 — different product version", async () => {
      const other = new DaemonClient({ ...options, productVersion: "trace-2.0.0" });
      return executeStep(other, ["stdout:answer D\n"]);
    });
    currentStep = "D-wait";
    await delay(1500);
  }
  await step("E", "control stop", () => client.control({ action: "stop", workspaceRoot }));
  if (!REAL_CLI) {
    await step("F", "control stop as version 2.0.0", () =>
      new DaemonClient({ ...options, productVersion: "trace-2.0.0" }).control({ action: "stop", workspaceRoot }),
    );
  }
  await step("G", "execute #4 — daemon disabled", () =>
    executeStep(new DaemonClient({ ...options, daemonEnabled: false }), ["stdout:answer G\n"]),
  );
} finally {
  const logs = Disk.snapshot(stateDirectory)
    .filter((entry) => entry.path.endsWith("daemon.log"))
    .map((entry) => ({ path: entry.path, lines: readFileSync(join(stateDirectory, entry.path), "utf8").trim().split("\n").map((line) => JSON.parse(line)) }));
  const leftovers = Disk.snapshot(stateDirectory).filter((entry) => entry.json?.pid > 0);
  for (const record of leftovers) {
    try {
      process.kill(record.json.pid, "SIGKILL");
    } catch {}
  }
  writeFileSync(
    OUT,
    JSON.stringify(
      {
        recordedAt: new Date().toISOString(),
        wallStartMs,
        node: process.version,
        platform: `${process.platform}-${process.arch}`,
        worktree: "pr-148-head packages/daemon/dist (built by orchestrator)",
        executorModule: REAL_CLI ? "apps/cli/dist/daemon-executor.js (real symnav program)" : "packages/daemon/test/fixtures/executor-module.mjs",
        root,
        steps,
        events,
        daemonLogs: logs,
        leftoverProcessesKilled: leftovers.map((entry) => entry.json.pid),
      },
      null,
      2,
    ),
  );
  console.log(`events=${events.length} steps=${steps.map((s) => `${s.name}:${JSON.stringify(s.outcome).slice(0, 120)}`).join(" | ")}`);
  rmSync(root, { recursive: true, force: true });
  setTimeout(() => process.exit(0), 200).unref();
}
