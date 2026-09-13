// Dye test: change one DaemonPolicy field at a time, run the real composition code of one
// revision, and record which constructed consumer values move.
// usage: node probe/dye.mjs <worktree> <label> <out.json>
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

process.env.SYMNAV_TELEMETRY = "0";
const [root, label, outPath] = process.argv.slice(2);
const load = (relative) => import(pathToFileURL(join(root, relative)).href);

const { DaemonPolicy } = await load("packages/daemon/dist/index.js");
const { DaemonPolicyTestFactory } = await load("packages/daemon/dist/policy-testing.js");
const program = await load("apps/cli/dist/program.js");
const dispatcherModule = await load("apps/cli/dist/daemon/daemon-command-dispatcher.js");
const controllerModule = await load("apps/cli/dist/daemon/daemon-controller.js");
const transportModule = await load("apps/cli/dist/daemon/local-daemon-transport.js");
const registryModule = await load("apps/cli/dist/daemon/daemon-registry.js");
const identityModule = await load("apps/cli/dist/daemon/daemon-workspace-identity.js");
const workspaceDaemonModule = await load("apps/cli/dist/daemon/workspace-daemon.js");
const loggerModule = await load("apps/cli/dist/daemon/daemon-logger.js");
const clockModule = await load("apps/cli/dist/daemon/daemon-clock.js");
const resourceModule = await load("apps/cli/dist/daemon/daemon-resource-monitor.js");
const spoolModule = await load("apps/cli/dist/daemon/completion-spool.js");
const outputModule = await load("apps/cli/dist/command-execution-result.js");
const executorModule = await load("apps/cli/dist/cli-program-executor.js");

const isHead = !("DaemonResourcePolicy" in resourceModule);
const sha = execFileSync("git", ["-C", root, "rev-parse", "HEAD"]).toString().trim();
const realSetTimeout = globalThis.setTimeout;
const realSetInterval = globalThis.setInterval;
const realDateNow = Date.now;

const DEFAULT = DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 });

function markerFor(section, key, value) {
  if (section === "output" && key === "maximumChunkRawBytes") return value - 3;
  if (section === "resources" && key === "effectiveMemoryBytes") return value * 2;
  return value + 3;
}

const fields = [];
for (const [section, values] of Object.entries(DEFAULT.values)) {
  for (const [key, value] of Object.entries(values)) {
    fields.push({ path: `${section}.${key}`, section, key, value, marker: markerFor(section, key, value) });
  }
}

async function captureDelays(kind, run) {
  const delays = [];
  const original = kind === "setTimeout" ? realSetTimeout : realSetInterval;
  globalThis[kind] = (callback, ms, ...rest) => {
    delays.push(ms);
    return kind === "setTimeout" ? original(callback, 0, ...rest) : original(() => undefined, 2 ** 30);
  };
  try {
    await run();
  } finally {
    globalThis[kind] = original;
  }
  return delays;
}

function largestTrue(predicate, low, high) {
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (predicate(middle)) low = middle;
    else high = middle - 1;
  }
  return low;
}

function makeWorkspace() {
  const directory = mkdtempSync(join(tmpdir(), `dye-${label}-`));
  const workspaceRoot = join(directory, "ws");
  const stateDirectory = join(directory, "state");
  mkdirSync(join(workspaceRoot, ".git"), { recursive: true });
  mkdirSync(stateDirectory, { recursive: true });
  return { directory, workspaceRoot, stateDirectory };
}

async function observe(policy) {
  const observations = {};
  const place = makeWorkspace();
  const dependencies = program.createDefaultDependencies(place.stateDirectory, policy);
  const identity = identityModule.DaemonWorkspaceIdentity.from(place.workspaceRoot, place.stateDirectory);

  // CLI process: navigation routing runtime, real production factory.
  const runtime = dispatcherModule.DaemonCommandDispatcher.createRuntime(identity, dependencies, policy);
  observations.T1 = runtime.transport.requestTimeoutMs;
  observations.T3 = runtime.transport.executionRequestTimeoutMs;
  observations.T4 = runtime.transport.maximumFrameBytes;
  observations.T5 = runtime.transport.maximumControlFrameBytes ?? spoolModule.DAEMON_MAXIMUM_CONTROL_FRAME_BYTES;
  observations.O4 = runtime.transport.maximumChunkRawBytes ?? spoolModule.COMMAND_OUTPUT_CHUNK_BYTES;
  observations.D1 = runtime.transport.deliveryPolicy?.postAcceptanceExecutionReattachmentLimit ?? null;
  observations.D2 = runtime.transport.deliveryPolicy?.resultTransferResumeLimitPerExecutionAttempt ?? null;
  observations.S1 = largestTrue(
    (now) => runtime.registry.startupOwnerIsWithinGrace({ heartbeatAt: 0 }, undefined, now),
    0,
    10 * 60_000,
  );
  observations.S3 = runtime.coordinator.coordinationGraceMs ?? registryModule.DAEMON_STARTUP_TIMEOUT_MS;
  observations.S7 = runtime.coordinator.pollIntervalMs;
  observations.S8 = runtime.coordinator.terminationTimeoutMs;
  observations.S9 = runtime.coordinator.childFailureRetryLimit ?? null;
  observations.H5 = runtime.coordinator.processTerminator.gracefulTimeoutMs;
  observations.H6 = runtime.coordinator.processTerminator.pollIntervalMs;
  observations.carrierLauncher = runtime.coordinator.launcher.policy === policy ? 1 : 0;

  // CLI process: `daemon start|status|stop` actions, real registration code, controller methods stubbed.
  const captured = {};
  const prototype = controllerModule.DaemonController.prototype;
  const originals = { start: prototype.start, status: prototype.status, stop: prototype.stop };
  prototype.start = async function () {
    captured.start = this;
    throw new Error("probe: start captured");
  };
  prototype.status = async function () {
    captured.status = this;
    return [];
  };
  prototype.stop = async function () {
    captured.stop = this;
    throw new Error("probe: stop captured");
  };
  const context = { stdout: { write() {} }, stderr: { write() {} }, cwd: place.workspaceRoot, exit() {} };
  try {
    for (const action of ["start", "status", "stop"]) {
      await program.buildProgram(context, dependencies).parseAsync(["node", "symnav", "daemon", action]);
    }
  } finally {
    Object.assign(prototype, originals);
  }
  observations.T2 = captured.status.transport.requestTimeoutMs;
  observations.T1_start = captured.start.transport.requestTimeoutMs;
  observations.H2 = captured.stop.stopTimeoutMs;
  observations.H4 = captured.stop.pollIntervalMs;
  observations.H5_stop = captured.stop.processTerminator.gracefulTimeoutMs;
  observations.carrierStartLauncher = captured.start.launcher.policy === policy ? 1 : 0;

  // CLI process: local command capture, real CliProgramExecutor.
  const outputPrototype = outputModule.OrderedCommandOutput.prototype;
  const originalFinish = outputPrototype.finish;
  let capturedOutput;
  outputPrototype.finish = function (...args) {
    capturedOutput ??= this;
    return originalFinish.apply(this, args);
  };
  try {
    const executor = new executorModule.CliProgramExecutor(dependencies);
    const result = await executor.execute({ argv: ["--version"], cwd: place.workspaceRoot, telemetryEnabled: false });
    await result.output?.dispose?.();
  } finally {
    outputPrototype.finish = originalFinish;
  }
  observations.O5 = capturedOutput.inlineBytes;
  observations.O7 = capturedOutput.maximumBytes;
  observations.O1 = capturedOutput.maximumRecordBytes ?? (await recordCapacity(capturedOutput.constructor));

  // Daemon process: composition transcribed from daemon-entry.ts (the module runs itself on import).
  const clock = new clockModule.NodeDaemonClock();
  const instanceId = randomUUID();
  const registry = isHead
    ? new registryModule.DaemonRegistry(identity.registryDirectory, policy.values.startup)
    : new registryModule.DaemonRegistry(identity.registryDirectory);
  const logger = isHead
    ? new loggerModule.DaemonLogger(identity, instanceId, clock, { policy: policy.values.diagnostics })
    : new loggerModule.DaemonLogger(identity, instanceId, clock);
  const common = {
    identity,
    instanceId,
    processToken: "probe-token",
    symnavVersion: dependencies.symnavVersion,
    policy,
    dependencies,
    registry,
    clock,
    logger,
  };
  const daemon = isHead
    ? new workspaceDaemonModule.WorkspaceDaemon({ ...common, transport: new transportModule.LocalDaemonTransport(policy.values) })
    : new workspaceDaemonModule.WorkspaceDaemon({
        ...common,
        memoryCapBytes: policy.values.resources.hardProcessRssBytes,
        resourcePolicy: resourceModule.DaemonResourcePolicy.fromSystemMemory(policy.values.resources.effectiveMemoryBytes),
        transport: new transportModule.LocalDaemonTransport(),
      });
  try {
    const worker = daemon.initialNavigationWorker;
    observations.R7 = worker.worker.resourceLimits?.maxOldGenerationSizeMb ?? null;
    observations.O3h = worker.maximumChunkRawBytes ?? spoolModule.COMMAND_OUTPUT_CHUNK_BYTES;
    await worker.worker.terminate();

    observations.H1 = daemon.lifetime.idleTimeoutMs;
    daemon.lifetime.stop();

    const spools = daemon.completionSpools;
    observations.O2 = spools.maximumChunkBytes ?? spoolModule.COMMAND_OUTPUT_CHUNK_BYTES;
    observations.O6 = spools.inlineBytes;
    observations.O8 = spools.maximumResultBytes;
    observations.O9 = spools.maximumAggregateBytes;

    observations.G1 = logger.rotateBytes;
    observations.G3 = logger.maximumQueuedEvents;
    const removed = [];
    logger.storage = { remove: async (path) => removed.push(path), move: async () => undefined };
    await logger.rotate();
    observations.G2 = Number(removed[0].slice(removed[0].lastIndexOf(".") + 1));

    const supervisor = daemon.resourceSupervisor;
    const resources = supervisor.options.policy.record ?? supervisor.options.policy;
    observations.R4 = resources.hardProcessRssBytes;
    observations.R5 = resources.softProcessRssBytes;
    observations.R6 = resources.resumeProcessRssBytes;
    observations.R1 = (await captureDelays("setInterval", () => supervisor.start()))[0];
    supervisor.stop();
    const replacement = await replacementCircuit(supervisor);
    observations.R3 = replacement.limit;
    observations.R2 = replacement.window;

    observations.R8 = isHead ? daemon.resourcePolicy.hardProcessRssBytes : daemon.options.memoryCapBytes;
    observations.R9 = (daemon.resourcePolicy.record ?? daemon.resourcePolicy).hardProcessRssBytes;

    observations.S6 = (await captureDelays("setTimeout", () => daemon.pause()))[0];
    observations.S4 = await authorizationDeadline(daemon);
    Object.assign(observations, await acknowledgementWait(daemon));
    Object.assign(observations, traceRetention(daemon));
    observations.T1_daemon = daemon.options.transport.requestTimeoutMs;
  } finally {
    daemon.lifetime.stop();
    rmSync(place.directory, { recursive: true, force: true });
  }
  return observations;
}

async function recordCapacity(OrderedCommandOutput) {
  const accepts = async (size) => {
    const output = new OrderedCommandOutput({});
    try {
      await output.appendRecord({ sequence: 0, stream: "stdout", bytes: Buffer.alloc(size) });
      return true;
    } catch {
      return false;
    } finally {
      await output.dispose().catch(() => undefined);
    }
  };
  let low = 1;
  let high = 1024 * 1024;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (await accepts(middle)) low = middle;
    else high = middle - 1;
  }
  return low;
}

async function replacementCircuit(supervisor) {
  const nowValue = 50_000_000;
  const attempt = async (count, age) => {
    let drained = false;
    const probe = new supervisor.constructor({
      ...supervisor.options,
      now: () => nowValue,
      replaceWorker: async () => 2,
      drain: async () => {
        drained = true;
      },
    });
    probe.replacementTimes = Array.from({ length: count }, () => nowValue - age);
    await probe.replace("hard-pressure");
    return drained;
  };
  let limit = 0;
  while (!(await attempt(limit, 1)) && limit < 50) limit += 1;
  let low = 1;
  let high = 60 * 60_000;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (await attempt(limit, middle)) low = middle;
    else high = middle - 1;
  }
  return { limit, window: low + 1 };
}

async function authorizationDeadline(daemon) {
  let now = 0;
  let iterations = 0;
  const originalNow = daemon.now;
  const originalOptions = daemon.options;
  const originalPause = daemon.pause;
  daemon.now = () => now;
  daemon.options = { ...originalOptions, registry: { readInstance: () => undefined } };
  daemon.pause = async () => {
    now += 1;
    iterations += 1;
  };
  try {
    await daemon.waitForStartupAuthorization();
  } catch {
    // expected: no authorization before the deadline
  } finally {
    daemon.now = originalNow;
    daemon.options = originalOptions;
    daemon.pause = originalPause;
  }
  return iterations - 1;
}

async function acknowledgementWait(daemon) {
  let now = 1_000_000;
  const delays = [];
  const originalLedger = daemon.acceptedRequests;
  daemon.acceptedRequests = { hasUnacknowledgedCompletions: true };
  Date.now = () => now;
  globalThis.setTimeout = (callback, ms) => {
    delays.push(ms);
    now += ms;
    return realSetTimeout(callback, 0);
  };
  try {
    await daemon.waitForCompletionAcknowledgements();
  } finally {
    Date.now = realDateNow;
    globalThis.setTimeout = realSetTimeout;
    daemon.acceptedRequests = originalLedger;
  }
  return { H8: delays[0], H7: now - 1_000_000 };
}

function traceRetention(daemon) {
  const delays = [];
  daemon.operationTraces.set("probe-request", { clientDisconnected() {} });
  globalThis.setTimeout = (callback, ms) => {
    delays.push(ms);
    return realSetTimeout(() => undefined, 2 ** 30);
  };
  try {
    daemon.disconnectOperationTrace("probe-request");
  } finally {
    globalThis.setTimeout = realSetTimeout;
  }
  for (const timer of daemon.operationTraceExpirations.values()) clearTimeout(timer);
  daemon.operationTraceExpirations.clear();
  daemon.operationTraces.clear();
  for (let index = 0; index < 2_000; index += 1) {
    daemon.operationTraceExpirations.set(`probe-${index}`, realSetTimeout(() => undefined, 2 ** 30));
  }
  daemon.enforceOperationTraceCapacity();
  const capacity = daemon.operationTraceExpirations.size;
  for (const timer of daemon.operationTraceExpirations.values()) clearTimeout(timer);
  daemon.operationTraceExpirations.clear();
  return { G4: delays[0], G5: capacity };
}

const started = realDateNow();
const baseline = await observe(DEFAULT);
const voices = Object.fromEntries(Object.entries(baseline).map(([id, value]) => [id, { atDefault: value, movedBy: {} }]));
for (const field of fields) {
  const tuned = DaemonPolicyTestFactory.withOverrides(DEFAULT, { [field.section]: { [field.key]: field.marker } });
  const observed = await observe(tuned);
  field.moved = [];
  for (const [id, value] of Object.entries(observed)) {
    if (value !== baseline[id]) {
      voices[id].movedBy[field.path] = value;
      field.moved.push(id);
    }
  }
}

writeFileSync(
  outPath,
  JSON.stringify(
    {
      label,
      sha,
      node: process.version,
      defaultPolicy: "DaemonPolicy.fromSystemMemory({ totalBytes: 1 GiB })",
      markerRule: "each field alone: +3, except output.maximumChunkRawBytes -3 and resources.effectiveMemoryBytes x2",
      elapsedMs: realDateNow() - started,
      fields,
      voices,
    },
    null,
    2,
  ),
);
console.log(`${label} ${sha.slice(0, 9)} voices=${Object.keys(voices).length} fields=${fields.length} ms=${realDateNow() - started}`);
process.exit(0);
