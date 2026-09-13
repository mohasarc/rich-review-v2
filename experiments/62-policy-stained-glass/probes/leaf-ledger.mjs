import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const experiment = new URL("..", import.meta.url).pathname;
const worktrees = join(experiment, "../../worktrees");
const base = join(worktrees, "pr-131-base");
const head = join(worktrees, "pr-131-head");

class Build {
  constructor(root) {
    this.root = root;
  }

  async module(relativePath) {
    return import(pathToFileURL(join(this.root, relativePath)).href);
  }

  cli(relativePath) {
    return this.module(join("apps/cli/dist", relativePath));
  }

  source(relativePath) {
    return readFileSync(join(this.root, "apps/cli/src", relativePath), "utf8").split("\n");
  }

  receipt(relativePath, pattern) {
    const lines = this.source(relativePath);
    const index = lines.findIndex((line) => pattern.test(line));
    if (index < 0) throw new Error(`receipt not found: ${relativePath} ${pattern}`);
    return { path: `apps/cli/src/${relativePath}`, line: index + 1, text: lines[index].trim() };
  }

  commit() {
    return execFileSync("git", ["-C", this.root, "rev-parse", "HEAD"]).toString().trim();
  }
}

const baseBuild = new Build(base);
const headBuild = new Build(head);
const state = mkdtempSync(join(tmpdir(), "stained-glass-ledger-"));

const { DaemonPolicy: HeadPolicy } = await headBuild.module("packages/daemon/dist/index.js");
const { DaemonPolicy: BasePolicy } = await baseBuild.module("packages/daemon/dist/index.js");
const memory = { totalBytes: 16 * 1024 ** 3 };
const headPolicy = HeadPolicy.fromSystemMemory(memory);
const basePolicy = BasePolicy.fromSystemMemory(memory);
const values = headPolicy.values;

const baseModules = {
  transport: await baseBuild.cli("daemon/local-daemon-transport.js"),
  output: await baseBuild.cli("command-execution-result.js"),
  spool: await baseBuild.cli("daemon/completion-spool.js"),
  controller: await baseBuild.cli("daemon/daemon-controller.js"),
  registry: await baseBuild.cli("daemon/daemon-registry.js"),
  launcher: await baseBuild.cli("daemon/daemon-process-launcher.js"),
  coordinator: await baseBuild.cli("daemon/daemon-startup-coordinator.js"),
  logger: await baseBuild.cli("daemon/daemon-logger.js"),
  lifetime: await baseBuild.cli("daemon/daemon-lifetime.js"),
  resources: await baseBuild.cli("daemon/daemon-resource-monitor.js"),
  identity: await baseBuild.cli("daemon/daemon-workspace-identity.js"),
  clock: await baseBuild.cli("daemon/daemon-clock.js"),
};
const headModules = {
  transport: await headBuild.cli("daemon/local-daemon-transport.js"),
  output: await headBuild.cli("command-execution-result.js"),
  spool: await headBuild.cli("daemon/completion-spool.js"),
  controller: await headBuild.cli("daemon/daemon-controller.js"),
  registry: await headBuild.cli("daemon/daemon-registry.js"),
  launcher: await headBuild.cli("daemon/daemon-process-launcher.js"),
  coordinator: await headBuild.cli("daemon/daemon-startup-coordinator.js"),
  logger: await headBuild.cli("daemon/daemon-logger.js"),
  lifetime: await headBuild.cli("daemon/daemon-lifetime.js"),
  resources: await headBuild.cli("daemon/daemon-resource-monitor.js"),
  identity: await headBuild.cli("daemon/daemon-workspace-identity.js"),
  clock: await headBuild.cli("daemon/daemon-clock.js"),
};

class Observed {
  static base() {
    const m = baseModules;
    const registry = new m.registry.DaemonRegistry(join(state, "base-registry"));
    const transport = new m.transport.LocalDaemonTransport();
    const statusTransport = new m.transport.LocalDaemonTransport({ requestTimeoutMs: 100 });
    const launcher = new m.launcher.NodeDaemonProcessLauncher("probe", basePolicy);
    const identity = m.identity.DaemonWorkspaceIdentity.from("/repo", join(state, "base-state"));
    const lifetime = new m.lifetime.DaemonLifetime(
      { now: () => 0 },
      m.lifetime.DAEMON_IDLE_TIMEOUT_MS,
      async () => undefined,
    );
    lifetime.stop();
    const resourceRecord = m.resources.DaemonResourcePolicy.fromSystemMemory(
      basePolicy.values.resources.effectiveMemoryBytes,
    ).record;
    return {
      transport,
      statusTransport,
      output: new m.output.OrderedCommandOutput(),
      spool: new m.spool.DaemonCompletionSpoolStore({
        directory: join(state, "base-spool"),
        workspaceKey: "workspace",
        instanceId: "instance",
      }),
      controller: new m.controller.DaemonController(registry, transport, join(state, "base-state")),
      terminator: new m.launcher.NodeDaemonProcessTerminator(),
      coordinator: new m.coordinator.DaemonStartupCoordinator(registry, launcher, transport),
      logger: new m.logger.DaemonLogger(identity, "instance", new m.clock.NodeDaemonClock()),
      lifetime,
      resourceRecord,
      constants: {
        ...m.spool,
        ...m.logger,
        ...m.lifetime,
        ...m.registry,
        ...m.resources,
      },
    };
  }

  static head() {
    const m = headModules;
    const registry = new m.registry.DaemonRegistry(join(state, "head-registry"), values.startup);
    const transport = new m.transport.LocalDaemonTransport(values);
    const statusTransport = new m.transport.LocalDaemonTransport(values, {
      responseTimeoutPurpose: "status-observer",
    });
    const launcher = new m.launcher.NodeDaemonProcessLauncher("probe", headPolicy);
    const identity = m.identity.DaemonWorkspaceIdentity.from("/repo", join(state, "head-state"));
    const lifetime = new m.lifetime.DaemonLifetime(
      { now: () => 0 },
      values.shutdown,
      async () => undefined,
    );
    lifetime.stop();
    return {
      transport,
      statusTransport,
      output: new m.output.OrderedCommandOutput({ policy: values.output }),
      spool: new m.spool.DaemonCompletionSpoolStore({
        directory: join(state, "head-spool"),
        workspaceKey: "workspace",
        instanceId: "instance",
        policy: values.output,
      }),
      controller: new m.controller.DaemonController(registry, transport, join(state, "head-state"), {
        policy: values,
      }),
      terminator: new m.launcher.NodeDaemonProcessTerminator(values.shutdown),
      coordinator: new m.coordinator.DaemonStartupCoordinator(registry, launcher, transport, {
        policy: values,
      }),
      logger: new m.logger.DaemonLogger(identity, "instance", new m.clock.NodeDaemonClock(), {
        policy: values.diagnostics,
      }),
      lifetime,
      registry,
    };
  }
}

const b = Observed.base();
const h = Observed.head();
const r = (path, pattern) => baseBuild.receipt(path, pattern);
const hr = (path, pattern) => headBuild.receipt(path, pattern);

const ledger = [
  {
    section: "transport",
    leaf: "singleResponseTimeoutMs",
    base: { owner: "DEFAULT_REQUEST_TIMEOUT_MS + requestTimeoutMs? option", kind: "constant+option", observed: b.transport.requestTimeoutMs, observedAt: "new LocalDaemonTransport().requestTimeoutMs", receipts: [r("daemon/local-daemon-transport.ts", /DEFAULT_REQUEST_TIMEOUT_MS = /), r("daemon/local-daemon-transport.ts", /requestTimeoutMs\?: number/)] },
    head: { observed: h.transport.requestTimeoutMs, observedAt: "new LocalDaemonTransport(values).requestTimeoutMs", receipts: [hr("daemon/local-daemon-transport.ts", /: policy\.transport\.singleResponseTimeoutMs/)] },
  },
  {
    section: "transport",
    leaf: "statusResponseTimeoutMs",
    base: { owner: "literal 100 at status composition", kind: "composition literal", observed: b.statusTransport.requestTimeoutMs, observedAt: "new LocalDaemonTransport({ requestTimeoutMs: 100 }).requestTimeoutMs", receipts: [r("commands/daemon/register-daemon-command.ts", /requestTimeoutMs: 100/)] },
    head: { observed: h.statusTransport.requestTimeoutMs, observedAt: "new LocalDaemonTransport(values, { responseTimeoutPurpose: 'status-observer' }).requestTimeoutMs", receipts: [hr("daemon/local-daemon-transport.ts", /\? policy\.transport\.statusResponseTimeoutMs/), hr("commands/daemon/register-daemon-command.ts", /responseTimeoutPurpose: "status-observer"/)] },
  },
  {
    section: "transport",
    leaf: "executionAdmissionTimeoutMs",
    base: { owner: "DEFAULT_EXECUTION_REQUEST_TIMEOUT_MS + executionRequestTimeoutMs? option", kind: "constant+option", observed: b.transport.executionRequestTimeoutMs, observedAt: "new LocalDaemonTransport().executionRequestTimeoutMs", receipts: [r("daemon/local-daemon-transport.ts", /DEFAULT_EXECUTION_REQUEST_TIMEOUT_MS = /)] },
    head: { observed: h.transport.executionRequestTimeoutMs, observedAt: "new LocalDaemonTransport(values).executionRequestTimeoutMs", receipts: [hr("daemon/local-daemon-transport.ts", /policy\.transport\.executionAdmissionTimeoutMs/)] },
  },
  {
    section: "transport",
    leaf: "maximumJsonPayloadBytes",
    base: { owner: "DEFAULT_MAXIMUM_FRAME_BYTES + maximumFrameBytes? option", kind: "constant+option", observed: b.transport.maximumFrameBytes, observedAt: "new LocalDaemonTransport().maximumFrameBytes", receipts: [r("daemon/local-daemon-transport.ts", /DEFAULT_MAXIMUM_FRAME_BYTES = /)] },
    head: { observed: h.transport.maximumFrameBytes, observedAt: "new LocalDaemonTransport(values).maximumFrameBytes", receipts: [hr("daemon/local-daemon-transport.ts", /policy\.transport\.maximumJsonPayloadBytes/)] },
  },
  {
    section: "transport",
    leaf: "maximumExecutionControlPayloadBytes",
    base: { owner: "DAEMON_MAXIMUM_CONTROL_FRAME_BYTES (exported from completion-spool.ts)", kind: "shared constant", observed: b.constants.DAEMON_MAXIMUM_CONTROL_FRAME_BYTES, observedAt: "import { DAEMON_MAXIMUM_CONTROL_FRAME_BYTES }", receipts: [r("daemon/completion-spool.ts", /DAEMON_MAXIMUM_CONTROL_FRAME_BYTES = /)] },
    head: { observed: h.transport.maximumControlFrameBytes, observedAt: "new LocalDaemonTransport(values).maximumControlFrameBytes", receipts: [hr("daemon/local-daemon-transport.ts", /policy\.transport\.maximumExecutionControlPayloadBytes/)] },
  },
  {
    section: "startup",
    leaf: "coordinationGraceMs",
    base: { owner: "DAEMON_STARTUP_TIMEOUT_MS (registry, coordinator, workspace daemon)", kind: "shared constant", observed: b.constants.DAEMON_STARTUP_TIMEOUT_MS, observedAt: "import { DAEMON_STARTUP_TIMEOUT_MS }", receipts: [r("daemon/daemon-registry.ts", /DAEMON_STARTUP_TIMEOUT_MS = /)] },
    head: { observed: [h.registry.startupPolicy.coordinationGraceMs, h.coordinator.coordinationGraceMs], observedAt: "registry.startupPolicy.coordinationGraceMs, coordinator.coordinationGraceMs", receipts: [hr("daemon/daemon-registry.ts", /this\.startupPolicy\.coordinationGraceMs$/), hr("daemon/daemon-startup-coordinator.ts", /policy\.startup\.coordinationGraceMs/)] },
  },
  {
    section: "startup",
    leaf: "heartbeatIntervalMs",
    base: { owner: "startupHeartbeatIntervalMs ?? 100", kind: "option+literal", observed: 100, observedAt: "source literal (WorkspaceDaemon not constructed)", receipts: [r("daemon/workspace-daemon.ts", /startupHeartbeatIntervalMs \?\? 100/)] },
    head: { observed: values.startup.heartbeatIntervalMs, observedAt: "policy leaf read in WorkspaceDaemon.start", receipts: [hr("daemon/workspace-daemon.ts", /policy\.values\.startup\.heartbeatIntervalMs/)] },
  },
  {
    section: "startup",
    leaf: "authorizationPollIntervalMs",
    base: { owner: "literal 10 in WorkspaceDaemon.pause", kind: "literal", observed: 10, observedAt: "source literal", receipts: [r("daemon/workspace-daemon.ts", /setTimeout\(resolve, 10\)/)] },
    head: { observed: values.startup.authorizationPollIntervalMs, observedAt: "policy leaf read in WorkspaceDaemon.pause", receipts: [hr("daemon/workspace-daemon.ts", /startup\.authorizationPollIntervalMs/)] },
  },
  {
    section: "startup",
    leaf: "observationPollIntervalMs",
    base: { owner: "pollIntervalMs ?? 20 (coordinator)", kind: "option+literal", observed: b.coordinator.pollIntervalMs, observedAt: "new DaemonStartupCoordinator(...).pollIntervalMs", receipts: [r("daemon/daemon-startup-coordinator.ts", /options\.pollIntervalMs \?\? 20/)] },
    head: { observed: h.coordinator.pollIntervalMs, observedAt: "new DaemonStartupCoordinator(..., { policy }).pollIntervalMs", receipts: [hr("daemon/daemon-startup-coordinator.ts", /policy\.startup\.observationPollIntervalMs/)] },
  },
  {
    section: "startup",
    leaf: "previousInstanceTerminationTimeoutMs",
    base: { owner: "DAEMON_TERMINATION_TIMEOUT_MS + terminationTimeoutMs? option", kind: "constant+option", observed: b.coordinator.terminationTimeoutMs, observedAt: "new DaemonStartupCoordinator(...).terminationTimeoutMs", receipts: [r("daemon/daemon-startup-coordinator.ts", /const DAEMON_TERMINATION_TIMEOUT_MS = /)] },
    head: { observed: h.coordinator.terminationTimeoutMs, observedAt: "coordinator.terminationTimeoutMs", receipts: [hr("daemon/daemon-startup-coordinator.ts", /policy\.startup\.previousInstanceTerminationTimeoutMs/)] },
  },
  {
    section: "startup",
    leaf: "childFailureRetryLimit",
    base: { owner: "one retry written as catch → triggerAndWait again", kind: "control flow", observed: 1, observedAt: "source: second triggerAndWait call in ensureRunning", receipts: [r("daemon/daemon-startup-coordinator.ts", /return this\.triggerAndWait\(identity\);/)] },
    head: { observed: h.coordinator.childFailureRetryLimit, observedAt: "coordinator.childFailureRetryLimit", receipts: [hr("daemon/daemon-startup-coordinator.ts", /failureCount >= this\.childFailureRetryLimit/)] },
  },
  {
    section: "shutdown",
    leaf: "idleTimeoutMs",
    base: { owner: "DAEMON_IDLE_TIMEOUT_MS + idleTimeoutMs? option", kind: "constant+option", observed: b.lifetime.idleTimeoutMs, observedAt: "new DaemonLifetime(clock, DAEMON_IDLE_TIMEOUT_MS, …).idleTimeoutMs", receipts: [r("daemon/daemon-lifetime.ts", /DAEMON_IDLE_TIMEOUT_MS = /)] },
    head: { observed: h.lifetime.idleTimeoutMs, observedAt: "new DaemonLifetime(clock, values.shutdown, …).idleTimeoutMs", receipts: [hr("daemon/daemon-lifetime.ts", /policy\.idleTimeoutMs/)] },
  },
  {
    section: "shutdown",
    leaf: "stopTimeoutMs",
    base: { owner: "stopTimeoutMs ?? 5_000", kind: "option+literal", observed: b.controller.stopTimeoutMs, observedAt: "new DaemonController(...).stopTimeoutMs", receipts: [r("daemon/daemon-controller.ts", /options\.stopTimeoutMs \?\? 5_000/)] },
    head: { observed: h.controller.stopTimeoutMs, observedAt: "new DaemonController(..., { policy }).stopTimeoutMs", receipts: [hr("daemon/daemon-controller.ts", /policy\.shutdown\.stopTimeoutMs/)] },
  },
  {
    section: "shutdown",
    leaf: "forcedTerminationReserveMaximumMs",
    base: { owner: "literal 500 in Math.min(500, stopTimeout / 2)", kind: "literal", observed: 500, observedAt: "source literal", receipts: [r("daemon/daemon-controller.ts", /Math\.min\(500, Math\.floor/)] },
    head: { observed: values.shutdown.forcedTerminationReserveMaximumMs, observedAt: "policy leaf read in DaemonController.stop", receipts: [hr("daemon/daemon-controller.ts", /policy\.shutdown\.forcedTerminationReserveMaximumMs/)] },
  },
  {
    section: "shutdown",
    leaf: "controllerPollIntervalMs",
    base: { owner: "pollIntervalMs ?? 20 (controller)", kind: "option+literal", observed: b.controller.pollIntervalMs, observedAt: "new DaemonController(...).pollIntervalMs", receipts: [r("daemon/daemon-controller.ts", /options\.pollIntervalMs \?\? 20/)] },
    head: { observed: h.controller.pollIntervalMs, observedAt: "controller.pollIntervalMs", receipts: [hr("daemon/daemon-controller.ts", /policy\.shutdown\.controllerPollIntervalMs/)] },
  },
  {
    section: "shutdown",
    leaf: "processSignalExitTimeoutMs",
    base: { owner: "gracefulTimeoutMs = 500 parameter default", kind: "parameter default", observed: b.terminator.gracefulTimeoutMs, observedAt: "new NodeDaemonProcessTerminator().gracefulTimeoutMs", receipts: [r("daemon/daemon-process-launcher.ts", /gracefulTimeoutMs = 500/)] },
    head: { observed: h.terminator.gracefulTimeoutMs, observedAt: "new NodeDaemonProcessTerminator(values.shutdown).gracefulTimeoutMs", receipts: [hr("daemon/daemon-process-launcher.ts", /policy\.processSignalExitTimeoutMs/)] },
  },
  {
    section: "shutdown",
    leaf: "processExitPollIntervalMs",
    base: { owner: "pollIntervalMs = 20 parameter default (terminator)", kind: "parameter default", observed: b.terminator.pollIntervalMs, observedAt: "new NodeDaemonProcessTerminator().pollIntervalMs", receipts: [r("daemon/daemon-process-launcher.ts", /pollIntervalMs = 20/)] },
    head: { observed: h.terminator.pollIntervalMs, observedAt: "terminator.pollIntervalMs", receipts: [hr("daemon/daemon-process-launcher.ts", /policy\.processExitPollIntervalMs/)] },
  },
  {
    section: "shutdown",
    leaf: "resourceDrainAcknowledgementGraceMs",
    base: { owner: "literal 250 in waitForCompletionAcknowledgements", kind: "literal", observed: 250, observedAt: "source literal", receipts: [r("daemon/workspace-daemon.ts", /Date\.now\(\) \+ 250/)] },
    head: { observed: values.shutdown.resourceDrainAcknowledgementGraceMs, observedAt: "policy leaf", receipts: [hr("daemon/workspace-daemon.ts", /shutdown\.resourceDrainAcknowledgementGraceMs/)] },
  },
  {
    section: "shutdown",
    leaf: "resourceDrainAcknowledgementPollIntervalMs",
    base: { owner: "literal 5 in waitForCompletionAcknowledgements", kind: "literal", observed: 5, observedAt: "source literal", receipts: [r("daemon/workspace-daemon.ts", /setTimeout\(resolve, 5\)/)] },
    head: { observed: values.shutdown.resourceDrainAcknowledgementPollIntervalMs, observedAt: "policy leaf", receipts: [hr("daemon/workspace-daemon.ts", /shutdown\.resourceDrainAcknowledgementPollIntervalMs/)] },
  },
  {
    section: "delivery",
    leaf: "postAcceptanceExecutionReattachmentLimit",
    base: { owner: "completeWithOneReattachment (one nested try)", kind: "control flow", observed: 1, observedAt: "source: single nested executeOnce", receipts: [r("daemon/local-daemon-transport.ts", /private async completeWithOneReattachment/)] },
    head: { observed: h.transport.deliveryPolicy.postAcceptanceExecutionReattachmentLimit, observedAt: "transport.deliveryPolicy", receipts: [hr("daemon/local-daemon-transport.ts", /reattachmentCount >= this\.deliveryPolicy\.postAcceptanceExecutionReattachmentLimit/)] },
  },
  {
    section: "delivery",
    leaf: "resultTransferResumeLimitPerExecutionAttempt",
    base: { owner: "let resumeStarted = false (per executeOnce)", kind: "control flow", observed: 1, observedAt: "source: boolean declared inside executeOnce", receipts: [r("daemon/local-daemon-transport.ts", /let resumeStarted = false/)] },
    head: { observed: h.transport.deliveryPolicy.resultTransferResumeLimitPerExecutionAttempt, observedAt: "transport.deliveryPolicy", receipts: [hr("daemon/local-daemon-transport.ts", /let resumeCount = 0/), hr("daemon/local-daemon-transport.ts", /resumeCount >= this\.deliveryPolicy\.resultTransferResumeLimitPerExecutionAttempt/)] },
  },
  {
    section: "output",
    leaf: "maximumChunkRawBytes",
    base: { owner: "COMMAND_OUTPUT_CHUNK_BYTES (completion-spool.ts, imported by codec + worker protocol) and MAXIMUM_RECORD_BYTES (command-execution-result.ts)", kind: "two constants", observed: [b.constants.COMMAND_OUTPUT_CHUNK_BYTES, 64 * 1024], observedAt: "import { COMMAND_OUTPUT_CHUNK_BYTES }; MAXIMUM_RECORD_BYTES source literal", receipts: [r("daemon/completion-spool.ts", /COMMAND_OUTPUT_CHUNK_BYTES = /), r("command-execution-result.ts", /MAXIMUM_RECORD_BYTES = /)] },
    head: { observed: [h.output.maximumRecordBytes, h.spool.maximumChunkBytes, h.transport.maximumChunkRawBytes], observedAt: "output.maximumRecordBytes, spoolStore.maximumChunkBytes, transport.maximumChunkRawBytes", receipts: [hr("command-execution-result.ts", /policy\.maximumChunkRawBytes/), hr("daemon/completion-spool.ts", /policy\.maximumChunkRawBytes/)] },
  },
  {
    section: "output",
    leaf: "inlineRawBytes",
    base: { owner: "DEFAULT_INLINE_BYTES (command-execution-result.ts) and COMPLETION_SPOOL_INLINE_BYTES (completion-spool.ts)", kind: "two constants+options", observed: [b.output.inlineBytes, b.spool.inlineBytes], observedAt: "new OrderedCommandOutput().inlineBytes, new DaemonCompletionSpoolStore(...).inlineBytes", receipts: [r("command-execution-result.ts", /DEFAULT_INLINE_BYTES = /), r("daemon/completion-spool.ts", /COMPLETION_SPOOL_INLINE_BYTES = /)] },
    head: { observed: [h.output.inlineBytes, h.spool.inlineBytes], observedAt: "output.inlineBytes, spoolStore.inlineBytes", receipts: [hr("command-execution-result.ts", /policy\.inlineRawBytes/), hr("daemon/completion-spool.ts", /policy\.inlineRawBytes/)] },
  },
  {
    section: "output",
    leaf: "maximumResultRawBytes",
    base: { owner: "DEFAULT_MAXIMUM_BYTES (command-execution-result.ts) and COMMAND_OUTPUT_LIMIT_BYTES (completion-spool.ts)", kind: "two constants+options", observed: [b.output.maximumBytes, b.spool.maximumResultBytes], observedAt: "new OrderedCommandOutput().maximumBytes, spoolStore.maximumResultBytes", receipts: [r("command-execution-result.ts", /DEFAULT_MAXIMUM_BYTES = /), r("daemon/completion-spool.ts", /COMMAND_OUTPUT_LIMIT_BYTES = /)] },
    head: { observed: [h.output.maximumBytes, h.spool.maximumResultBytes], observedAt: "output.maximumBytes, spoolStore.maximumResultBytes", receipts: [hr("command-execution-result.ts", /policy\.maximumResultRawBytes/), hr("daemon/completion-spool.ts", /policy\.maximumResultRawBytes/)] },
  },
  {
    section: "output",
    leaf: "maximumAggregateSpoolRawBytes",
    base: { owner: "DAEMON_COMPLETION_SPOOL_LIMIT_BYTES + maximumAggregateBytes? option", kind: "constant+option", observed: b.spool.maximumAggregateBytes, observedAt: "spoolStore.maximumAggregateBytes", receipts: [r("daemon/completion-spool.ts", /DAEMON_COMPLETION_SPOOL_LIMIT_BYTES = /)] },
    head: { observed: h.spool.maximumAggregateBytes, observedAt: "spoolStore.maximumAggregateBytes", receipts: [hr("daemon/completion-spool.ts", /policy\.maximumAggregateSpoolRawBytes/)] },
  },
  {
    section: "resources",
    leaf: "effectiveMemoryBytes",
    base: { owner: "read by DaemonEntry to rebuild DaemonResourcePolicy", kind: "policy leaf (read)", observed: b.resourceRecord.effectiveMemoryBytes, observedAt: "DaemonResourcePolicy.fromSystemMemory(policy.effectiveMemoryBytes).record", receipts: [r("daemon/daemon-entry.ts", /policy\.values\.resources\.effectiveMemoryBytes/)] },
    head: { observed: values.resources.effectiveMemoryBytes, observedAt: "policy leaf; no production reader (census)", receipts: [] },
  },
  ...["hardProcessRssBytes", "softProcessRssBytes", "resumeProcessRssBytes"].map((leaf) => ({
    section: "resources",
    leaf,
    base: { owner: "DaemonResourcePolicy second derivation (CLI)", kind: "duplicate formula", observed: b.resourceRecord[leaf], observedAt: "DaemonResourcePolicy.fromSystemMemory(effectiveMemoryBytes).record", receipts: [r("daemon/daemon-resource-monitor.ts", new RegExp(`${leaf}: `))] },
    head: { observed: values.resources[leaf], observedAt: "policy leaf", receipts: [hr("daemon/daemon-resource-monitor.ts", new RegExp(`policy\\.${leaf}`))] },
  })),
  {
    section: "resources",
    leaf: "workerMaxOldGenerationSizeMiB",
    base: { owner: "DaemonResourcePolicy second derivation (workerMaxOldGenerationSizeMb)", kind: "duplicate formula", observed: b.resourceRecord.workerMaxOldGenerationSizeMb, observedAt: "DaemonResourcePolicy record", receipts: [r("daemon/daemon-resource-monitor.ts", /workerMaxOldGenerationSizeMb,$/)] },
    head: { observed: values.resources.workerMaxOldGenerationSizeMiB, observedAt: "policy leaf", receipts: [hr("daemon/workspace-daemon.ts", /resourcePolicy\.workerMaxOldGenerationSizeMiB/)] },
  },
  {
    section: "resources",
    leaf: "supervisionIntervalMs",
    base: { owner: "DAEMON_RESOURCE_SAMPLE_INTERVAL_MS + intervalMs? option", kind: "constant+option", observed: b.constants.DAEMON_RESOURCE_SAMPLE_INTERVAL_MS, observedAt: "import", receipts: [r("daemon/daemon-resource-monitor.ts", /DAEMON_RESOURCE_SAMPLE_INTERVAL_MS = /)] },
    head: { observed: values.resources.supervisionIntervalMs, observedAt: "policy leaf", receipts: [hr("daemon/daemon-resource-monitor.ts", /policy\.supervisionIntervalMs/)] },
  },
  {
    section: "resources",
    leaf: "replacementWindowMs",
    base: { owner: "DAEMON_RESOURCE_RESTART_WINDOW_MS", kind: "constant", observed: b.constants.DAEMON_RESOURCE_RESTART_WINDOW_MS, observedAt: "import", receipts: [r("daemon/daemon-resource-monitor.ts", /DAEMON_RESOURCE_RESTART_WINDOW_MS = /)] },
    head: { observed: values.resources.replacementWindowMs, observedAt: "policy leaf", receipts: [hr("daemon/daemon-resource-monitor.ts", /policy\.replacementWindowMs/)] },
  },
  {
    section: "resources",
    leaf: "replacementLimit",
    base: { owner: "DAEMON_RESOURCE_RESTART_LIMIT", kind: "constant", observed: b.constants.DAEMON_RESOURCE_RESTART_LIMIT, observedAt: "import", receipts: [r("daemon/daemon-resource-monitor.ts", /DAEMON_RESOURCE_RESTART_LIMIT = /)] },
    head: { observed: values.resources.replacementLimit, observedAt: "policy leaf", receipts: [hr("daemon/daemon-resource-monitor.ts", /policy\.replacementLimit/)] },
  },
  {
    section: "resources",
    leaf: "workerHeapSampleIntervalMs",
    base: { owner: "literal 25 in WorkerHeapHighWater", kind: "literal", observed: 25, observedAt: "source literal", receipts: [r("daemon/daemon-navigation-worker-entry.ts", /this\.sample\(\), 25\)/)] },
    head: { observed: values.resources.workerHeapSampleIntervalMs, observedAt: "policy leaf", receipts: [hr("daemon/daemon-navigation-worker-entry.ts", /resources\.workerHeapSampleIntervalMs/)] },
  },
  {
    section: "diagnostics",
    leaf: "logRotateBytes",
    base: { owner: "DAEMON_LOG_ROTATE_BYTES + rotateBytes? option", kind: "constant+option", observed: b.logger.rotateBytes, observedAt: "new DaemonLogger(...).rotateBytes", receipts: [r("daemon/daemon-logger.ts", /DAEMON_LOG_ROTATE_BYTES = /)] },
    head: { observed: h.logger.rotateBytes, observedAt: "new DaemonLogger(..., { policy }).rotateBytes", receipts: [hr("daemon/daemon-logger.ts", /policy\.logRotateBytes/)] },
  },
  {
    section: "diagnostics",
    leaf: "logBackupCount",
    base: { owner: "DAEMON_LOG_BACKUP_COUNT", kind: "constant", observed: b.constants.DAEMON_LOG_BACKUP_COUNT, observedAt: "import", receipts: [r("daemon/daemon-logger.ts", /DAEMON_LOG_BACKUP_COUNT = /)] },
    head: { observed: h.logger.backupCount, observedAt: "logger.backupCount", receipts: [hr("daemon/daemon-logger.ts", /policy\.logBackupCount/)] },
  },
  {
    section: "diagnostics",
    leaf: "maximumQueuedEvents",
    base: { owner: "maximumQueuedEvents ?? 1_024", kind: "option+literal", observed: b.logger.maximumQueuedEvents, observedAt: "new DaemonLogger(...).maximumQueuedEvents", receipts: [r("daemon/daemon-logger.ts", /maximumQueuedEvents \?\? 1_024/)] },
    head: { observed: h.logger.maximumQueuedEvents, observedAt: "logger.maximumQueuedEvents", receipts: [hr("daemon/daemon-logger.ts", /policy\.maximumQueuedEvents/)] },
  },
  {
    section: "diagnostics",
    leaf: "disconnectedTraceRetentionMs",
    base: { owner: "DEFAULT_OPERATION_TRACE_RETENTION_MS + operationTraceRetentionMs? option", kind: "constant+option", observed: 5 * 60 * 1000, observedAt: "source literal", receipts: [r("daemon/workspace-daemon.ts", /DEFAULT_OPERATION_TRACE_RETENTION_MS = /)] },
    head: { observed: values.diagnostics.disconnectedTraceRetentionMs, observedAt: "policy leaf", receipts: [hr("daemon/workspace-daemon.ts", /diagnostics\.disconnectedTraceRetentionMs/)] },
  },
  {
    section: "diagnostics",
    leaf: "maximumDisconnectedTraces",
    base: { owner: "DEFAULT_MAXIMUM_RETAINED_OPERATION_TRACES + maximumRetainedOperationTraces? option", kind: "constant+option", observed: 1024, observedAt: "source literal", receipts: [r("daemon/workspace-daemon.ts", /DEFAULT_MAXIMUM_RETAINED_OPERATION_TRACES = /)] },
    head: { observed: values.diagnostics.maximumDisconnectedTraces, observedAt: "policy leaf", receipts: [hr("daemon/workspace-daemon.ts", /Math\.max\(1, this\.policy\.values\.diagnostics\.maximumDisconnectedTraces\)/)] },
  },
];

class Parity {
  static flat(value) {
    return Array.isArray(value) ? value : [value];
  }

  static compare(entry) {
    const policyValue = values[entry.section][entry.leaf];
    const baseValues = Parity.flat(entry.base.observed);
    const headValues = Parity.flat(entry.head.observed);
    return {
      ...entry,
      policyValue,
      basePolicyValue: basePolicy.values[entry.section][entry.leaf],
      equal: [...baseValues, ...headValues].every((value) => value === policyValue),
    };
  }
}

const rows = ledger.map((entry) => Parity.compare(entry));
writeFileSync(
  join(experiment, "evidence/leaf-ledger.json"),
  JSON.stringify(
    {
      method:
        "Constructs base consumers with no options and head consumers with DaemonPolicy.fromSystemMemory({ totalBytes: 16 GiB }).values from each worktree's built dist; reads the resulting fields. 'source literal' rows are read from base source text where the value sits inside a method.",
      baseCommit: baseBuild.commit(),
      headCommit: headBuild.commit(),
      memory,
      rows,
    },
    null,
    1,
  ),
);
rmSync(state, { recursive: true, force: true });
for (const row of rows) {
  console.log(
    `${row.equal ? "=" : "≠"} ${row.section}.${row.leaf} policy=${row.policyValue} base=${JSON.stringify(row.base.observed)} head=${JSON.stringify(row.head.observed)}`,
  );
}
console.log(`leaves ${rows.length}, equal ${rows.filter((row) => row.equal).length}`);
