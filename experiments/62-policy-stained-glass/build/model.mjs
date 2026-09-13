export const commits = [
  { sha: "b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e", label: "base", subject: "#130 tip · Resolve daemon contract source URLs portably", run: "executed + source" },
  { sha: "d7c3ceef736d99e7999854918bf838ea96dadb4c", label: "d7c3cee", subject: "Specify resource and output policy slices", run: "source" },
  { sha: "8dca047390daa99cfca5eea55fe109189503f085", label: "8dca047", subject: "Route resource and output policy", run: "source" },
  { sha: "5830598f2c751ad58f3ab0fe591f9542772c837a", label: "5830598", subject: "Specify lifecycle and diagnostic policy slices", run: "source" },
  { sha: "bb0205972fe1b7c85ab1fe039fc28a1dfc159211", label: "bb02059", subject: "Route lifecycle and diagnostic policy", run: "source" },
  { sha: "3f673305d9096cc847bdedda44d0de67e8c6727c", label: "3f67330", subject: "Specify distinct daemon deadlines and attempts", run: "source" },
  { sha: "b100221db48754656328391b878299c5a0bab443", label: "head", subject: "Preserve distinct daemon attempt limits", run: "executed + source" },
];

export const sections = [
  { id: "transport", tag: "TR", color: "#3987e5" },
  { id: "startup", tag: "ST", color: "#d95926" },
  { id: "shutdown", tag: "SH", color: "#199e70" },
  { id: "delivery", tag: "DE", color: "#c98500" },
  { id: "output", tag: "OU", color: "#d55181" },
  { id: "resources", tag: "RE", color: "#008300" },
  { id: "diagnostics", tag: "DI", color: "#9085e9" },
];

export const roseRingOrder = ["transport", "startup", "shutdown", "delivery", "output", "diagnostics", "resources"];

const CLI = "apps/cli/src";
const head = (path, pattern) => ({ side: "head", path, pattern });
const base = (path, pattern) => ({ side: "base", path, pattern });
const at = (path, pattern) => ({ path, pattern });

export const openingKinds = {
  snapshot: { label: "whole DaemonPolicy", lead: "heavy" },
  sections: { label: "Pick of sections", lead: "heavy" },
  section: { label: "one section", lead: "heavy" },
  leaf: { label: "Pick of one leaf", lead: "heavy" },
  number: { label: "bare number", lead: "light" },
  serialized: { label: "re-parsed serialized snapshot", lead: "light" },
};

export const families = [
  {
    id: "A",
    shape: "pointed lancet",
    title: "Resource & output",
    commit: "8dca047",
    specCommit: "d7c3cee",
    compartments: [
      {
        id: "A1",
        consumer: "OrderedCommandOutput",
        role: "client/local output capture",
        opening: {
          kind: "section",
          type: 'DaemonPolicyValues["output"]',
          required: at(`${CLI}/command-execution-result.ts`, /readonly policy: DaemonPolicyValues\["output"\];/),
          optional: at(`${CLI}/command-execution-result.ts`, /readonly inlineBytes\?: number;/),
        },
        pieces: [
          { leaf: "output.inlineRawBytes", policy: at(`${CLI}/command-execution-result.ts`, /this\.inlineBytes = policy\.inlineRawBytes/), local: at(`${CLI}/command-execution-result.ts`, /options\.inlineBytes \?\? DEFAULT_INLINE_BYTES/) },
          { leaf: "output.maximumResultRawBytes", policy: at(`${CLI}/command-execution-result.ts`, /this\.maximumBytes = policy\.maximumResultRawBytes/), local: at(`${CLI}/command-execution-result.ts`, /options\.maximumBytes \?\? DEFAULT_MAXIMUM_BYTES/) },
          { leaf: "output.maximumChunkRawBytes", policy: at(`${CLI}/command-execution-result.ts`, /this\.maximumRecordBytes = policy\.maximumChunkRawBytes/), local: at(`${CLI}/command-execution-result.ts`, /const MAXIMUM_RECORD_BYTES = 64 \* 1024/) },
        ],
      },
      {
        id: "A2",
        consumer: "DaemonCompletionSpoolStore",
        role: "daemon-side result spool",
        opening: {
          kind: "section",
          type: 'DaemonPolicyValues["output"]',
          required: at(`${CLI}/daemon/completion-spool.ts`, /readonly policy: DaemonPolicyValues\["output"\];/),
          optional: at(`${CLI}/daemon/completion-spool.ts`, /readonly inlineBytes\?: number;/),
        },
        pieces: [
          { leaf: "output.maximumChunkRawBytes", policy: at(`${CLI}/daemon/completion-spool.ts`, /this\.maximumChunkBytes = policy\.maximumChunkRawBytes/), local: at(`${CLI}/daemon/completion-spool.ts`, /export const COMMAND_OUTPUT_CHUNK_BYTES = 64 \* 1024/) },
          { leaf: "output.inlineRawBytes", policy: at(`${CLI}/daemon/completion-spool.ts`, /this\.inlineBytes = policy\.inlineRawBytes/), local: at(`${CLI}/daemon/completion-spool.ts`, /options\.inlineBytes \?\? COMPLETION_SPOOL_INLINE_BYTES/) },
          { leaf: "output.maximumResultRawBytes", policy: at(`${CLI}/daemon/completion-spool.ts`, /this\.maximumResultBytes = policy\.maximumResultRawBytes/), local: at(`${CLI}/daemon/completion-spool.ts`, /options\.maximumResultBytes \?\? COMMAND_OUTPUT_LIMIT_BYTES/) },
          { leaf: "output.maximumAggregateSpoolRawBytes", policy: at(`${CLI}/daemon/completion-spool.ts`, /this\.maximumAggregateBytes = policy\.maximumAggregateSpoolRawBytes/), local: at(`${CLI}/daemon/completion-spool.ts`, /options\.maximumAggregateBytes \?\? DAEMON_COMPLETION_SPOOL_LIMIT_BYTES/) },
        ],
      },
      {
        id: "A3",
        consumer: "LocalDaemonTransport",
        role: "socket caps and ordinary deadlines",
        opening: {
          kind: "sections",
          type: 'Pick<DaemonPolicyValues, "transport" | "delivery" | "output">',
          required: at(`${CLI}/daemon/local-daemon-transport.ts`, /constructor\(policy: LocalDaemonTransportPolicy/),
          optional: at(`${CLI}/daemon/local-daemon-transport.ts`, /constructor\(options: LocalDaemonTransportOptions = \{\}\)/),
        },
        pieces: [
          { leaf: "transport.singleResponseTimeoutMs", policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /policy\.transport\.singleResponseTimeoutMs/), local: at(`${CLI}/daemon/local-daemon-transport.ts`, /options\.requestTimeoutMs \?\? DEFAULT_REQUEST_TIMEOUT_MS/) },
          { leaf: "transport.executionAdmissionTimeoutMs", policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /policy\.transport\.executionAdmissionTimeoutMs/), local: at(`${CLI}/daemon/local-daemon-transport.ts`, /options\.executionRequestTimeoutMs \?\? DEFAULT_EXECUTION_REQUEST_TIMEOUT_MS/) },
          { leaf: "transport.maximumJsonPayloadBytes", policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /policy\.transport\.maximumJsonPayloadBytes/), local: at(`${CLI}/daemon/local-daemon-transport.ts`, /options\.maximumFrameBytes \?\? DEFAULT_MAXIMUM_FRAME_BYTES/) },
          { leaf: "transport.maximumExecutionControlPayloadBytes", policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /policy\.transport\.maximumExecutionControlPayloadBytes/), local: at(`${CLI}/daemon/local-daemon-transport.ts`, /new DaemonTransferFrameDecoder\(DAEMON_MAXIMUM_CONTROL_FRAME_BYTES\)/) },
          { leaf: "output.maximumChunkRawBytes", policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /this\.maximumChunkRawBytes = policy\.output\.maximumChunkRawBytes/), local: at(`${CLI}/daemon/local-daemon-transport.ts`, /DaemonResultChunkCodec\.encode\(message\)/) },
        ],
      },
      {
        id: "A4",
        consumer: "DaemonResultChunkCodec · DaemonTransferFrameDecoder",
        role: "binary result framing",
        opening: {
          kind: "number",
          type: "maximumChunkRawBytes: number · (maximumControlFrameBytes: number, maximumChunkRawBytes: number)",
          required: at(`${CLI}/daemon/daemon-result-chunk-codec.ts`, /static encode\(chunk: DaemonResultChunk, maximumChunkRawBytes: number\)/),
          optional: at(`${CLI}/daemon/daemon-result-chunk-codec.ts`, /import \{ COMMAND_OUTPUT_CHUNK_BYTES \} from "\.\/completion-spool\.js";/),
        },
        pieces: [
          { leaf: "output.maximumChunkRawBytes", policy: at(`${CLI}/daemon/daemon-result-chunk-codec.ts`, /chunk\.bytes\.byteLength > maximumChunkRawBytes/), local: at(`${CLI}/daemon/daemon-result-chunk-codec.ts`, /chunk\.bytes\.byteLength > COMMAND_OUTPUT_CHUNK_BYTES/) },
          { leaf: "transport.maximumExecutionControlPayloadBytes", policy: at(`${CLI}/daemon/daemon-result-chunk-codec.ts`, /private readonly maximumControlFrameBytes: number,$/), local: at(`${CLI}/daemon/daemon-result-chunk-codec.ts`, /constructor\(private readonly maximumControlFrameBytes: number\) \{\}/) },
        ],
      },
      {
        id: "A5",
        consumer: "DaemonNavigationWorkerProtocol · NodeDaemonNavigationWorker",
        role: "worker chunk validation",
        opening: {
          kind: "serialized",
          type: "response(value, maximumChunkRawBytes: number) · DaemonPolicy.fromSerialized(configuration.policy)",
          required: at(`${CLI}/daemon/daemon-navigation-worker-protocol.ts`, /static response\(value: unknown, maximumChunkRawBytes: number\)/),
          optional: at(`${CLI}/daemon/daemon-navigation-worker-protocol.ts`, /import \{ COMMAND_OUTPUT_CHUNK_BYTES \} from "\.\/completion-spool\.js";/),
        },
        pieces: [
          { leaf: "output.maximumChunkRawBytes", policy: at(`${CLI}/daemon/daemon-navigation-worker-protocol.ts`, /value\.bytes\.byteLength <= maximumChunkRawBytes/), local: at(`${CLI}/daemon/daemon-navigation-worker-protocol.ts`, /value\.bytes\.byteLength <= COMMAND_OUTPUT_CHUNK_BYTES/) },
        ],
      },
      {
        id: "A6",
        consumer: "WorkerHeapHighWater",
        role: "worker heap sampler",
        opening: {
          kind: "number",
          type: "constructor(sampleIntervalMs: number)",
          required: at(`${CLI}/daemon/daemon-navigation-worker-entry.ts`, /constructor\(sampleIntervalMs: number\)/),
          optional: at(`${CLI}/daemon/daemon-navigation-worker-entry.ts`, /setInterval\(\(\) => this\.sample\(\), 25\)/),
        },
        pieces: [
          { leaf: "resources.workerHeapSampleIntervalMs", policy: at(`${CLI}/daemon/daemon-navigation-worker-entry.ts`, /this\.policy\.values\.resources\.workerHeapSampleIntervalMs/), local: at(`${CLI}/daemon/daemon-navigation-worker-entry.ts`, /setInterval\(\(\) => this\.sample\(\), 25\)/) },
        ],
      },
      {
        id: "A7",
        consumer: "DaemonResourceSupervisor",
        role: "RSS pressure and replacement circuit",
        opening: {
          kind: "section",
          type: 'DaemonPolicyValues["resources"]',
          required: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /readonly policy: DaemonPolicyValues\["resources"\];/),
          optional: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /readonly intervalMs\?: number;/),
        },
        pieces: [
          { leaf: "resources.supervisionIntervalMs", policy: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /this\.options\.policy\.supervisionIntervalMs/), local: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /this\.options\.intervalMs \?\? DAEMON_RESOURCE_SAMPLE_INTERVAL_MS/) },
          { leaf: "resources.hardProcessRssBytes", policy: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /readonly policy: DaemonPolicyValues\["resources"\];/), local: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /hardProcessRssBytes: hardProcessRssMib \* MEBIBYTE/) },
          { leaf: "resources.softProcessRssBytes", policy: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /readonly policy: DaemonPolicyValues\["resources"\];/), local: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /softProcessRssBytes: Math\.floor\(hardProcessRssMib \* 0\.8\) \* MEBIBYTE/) },
          { leaf: "resources.resumeProcessRssBytes", policy: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /readonly policy: DaemonPolicyValues\["resources"\];/), local: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /resumeProcessRssBytes: Math\.floor\(hardProcessRssMib \* 0\.7\) \* MEBIBYTE/) },
          { leaf: "resources.replacementWindowMs", policy: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /this\.options\.policy\.replacementWindowMs/), local: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /DAEMON_RESOURCE_RESTART_WINDOW_MS;/) },
          { leaf: "resources.replacementLimit", policy: at(`${CLI}/daemon/daemon-resource-monitor.ts`, /this\.options\.policy\.replacementLimit/), local: at(`${CLI}/daemon/daemon-resource-monitor.ts`, />= DAEMON_RESOURCE_RESTART_LIMIT/) },
        ],
      },
      {
        id: "A8",
        consumer: "WorkspaceDaemon",
        role: "worker heap limit and memory cap report",
        opening: {
          kind: "snapshot",
          type: "WorkspaceDaemonOptions.policy: DaemonPolicy",
          required: at(`${CLI}/daemon/workspace-daemon.ts`, /readonly policy: DaemonPolicy;/),
          optional: at(`${CLI}/daemon/workspace-daemon.ts`, /readonly resourcePolicy\?: DaemonResourcePolicy;/),
        },
        pieces: [
          { leaf: "resources.workerMaxOldGenerationSizeMiB", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /maxOldGenerationSizeMb: resourcePolicy\.workerMaxOldGenerationSizeMiB/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /maxOldGenerationSizeMb: resourcePolicy\.record\.workerMaxOldGenerationSizeMb/) },
          { leaf: "resources.hardProcessRssBytes", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /memoryCapBytes: this\.resourcePolicy\.hardProcessRssBytes/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /memoryCapBytes: this\.options\.memoryCapBytes/) },
        ],
      },
      {
        id: "A9",
        consumer: "NodeDaemonProcessLauncher",
        role: "launch memory cap (unchanged since #130)",
        opening: {
          kind: "snapshot",
          type: "constructor(symnavVersion, policy: DaemonPolicy, terminator?)",
          required: at(`${CLI}/daemon/daemon-process-launcher.ts`, /readonly policy: DaemonPolicy,/),
          optional: at(`${CLI}/daemon/daemon-process-launcher.ts`, /readonly policy: DaemonPolicy,/),
        },
        pieces: [
          { leaf: "resources.hardProcessRssBytes", policy: at(`${CLI}/daemon/daemon-process-launcher.ts`, /return this\.policy\.values\.resources\.hardProcessRssBytes/), local: at(`${CLI}/daemon/daemon-process-launcher.ts`, /return this\.policy\.values\.resources\.hardProcessRssBytes/) },
        ],
      },
      {
        id: "A10",
        consumer: "DaemonEntry",
        role: "daemon process composition root",
        opening: {
          kind: "snapshot",
          type: "DaemonPolicy.fromSerialized(configuration.policy)",
          required: at(`${CLI}/daemon/daemon-entry.ts`, /new DaemonRegistry\(identity\.registryDirectory, policy\.values\.startup\)/),
          optional: at(`${CLI}/daemon/daemon-entry.ts`, /new DaemonRegistry\(identity\.registryDirectory\)/),
        },
        pieces: [
          { leaf: "resources.effectiveMemoryBytes", policy: at(`${CLI}/daemon/daemon-entry.ts`, /policy\.values\.resources\.effectiveMemoryBytes/), local: at(`${CLI}/daemon/daemon-entry.ts`, /policy\.values\.resources\.effectiveMemoryBytes/), emptiedWhenAbsent: true },
        ],
      },
    ],
  },
  {
    id: "B",
    shape: "round-headed lancet",
    title: "Lifecycle & diagnostic",
    commit: "bb02059",
    specCommit: "5830598",
    compartments: [
      {
        id: "B1",
        consumer: "DaemonRegistry",
        role: "startup ownership grace",
        opening: {
          kind: "section",
          type: 'startupPolicy: DaemonPolicyValues["startup"]',
          required: at(`${CLI}/daemon/daemon-registry.ts`, /startupPolicy: DaemonPolicyValues\["startup"\],/),
          optional: at(`${CLI}/daemon/daemon-registry.ts`, /private readonly platform = process\.platform,/),
        },
        pieces: [
          { leaf: "startup.coordinationGraceMs", policy: at(`${CLI}/daemon/daemon-registry.ts`, /graceMs = this\.startupPolicy\.coordinationGraceMs/), local: at(`${CLI}/daemon/daemon-registry.ts`, /export const DAEMON_STARTUP_TIMEOUT_MS = 15_000/) },
        ],
      },
      {
        id: "B2",
        consumer: "DaemonStartupCoordinator",
        role: "launch, observe, replace previous instance",
        opening: {
          kind: "sections",
          type: 'Pick<DaemonPolicyValues, "startup" | "shutdown">',
          required: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /readonly policy: Pick<DaemonPolicyValues, "startup" \| "shutdown">;/),
          optional: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /readonly startupTimeoutMs\?: number;/),
        },
        pieces: [
          { leaf: "startup.coordinationGraceMs", policy: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /this\.coordinationGraceMs = policy\.startup\.coordinationGraceMs/), local: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /missingOwner\.firstObservedAt <= DAEMON_STARTUP_TIMEOUT_MS/) },
          { leaf: "startup.observationPollIntervalMs", policy: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /policy\.startup\.observationPollIntervalMs/), local: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /options\.pollIntervalMs \?\? 20/) },
          { leaf: "startup.previousInstanceTerminationTimeoutMs", policy: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /policy\.startup\.previousInstanceTerminationTimeoutMs/), local: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /options\.terminationTimeoutMs \?\? DAEMON_TERMINATION_TIMEOUT_MS/) },
        ],
      },
      {
        id: "B3",
        consumer: "DaemonController",
        role: "user stop and status polling",
        opening: {
          kind: "sections",
          type: 'Pick<DaemonPolicyValues, "startup" | "shutdown">',
          required: at(`${CLI}/daemon/daemon-controller.ts`, /readonly policy: Pick<DaemonPolicyValues, "startup" \| "shutdown">;/),
          optional: at(`${CLI}/daemon/daemon-controller.ts`, /readonly stopTimeoutMs\?: number;/),
        },
        pieces: [
          { leaf: "shutdown.stopTimeoutMs", policy: at(`${CLI}/daemon/daemon-controller.ts`, /this\.stopTimeoutMs = this\.policy\.shutdown\.stopTimeoutMs/), local: at(`${CLI}/daemon/daemon-controller.ts`, /options\.stopTimeoutMs \?\? 5_000/) },
          { leaf: "shutdown.controllerPollIntervalMs", policy: at(`${CLI}/daemon/daemon-controller.ts`, /this\.policy\.shutdown\.controllerPollIntervalMs/), local: at(`${CLI}/daemon/daemon-controller.ts`, /options\.pollIntervalMs \?\? 20/) },
          { leaf: "shutdown.forcedTerminationReserveMaximumMs", policy: at(`${CLI}/daemon/daemon-controller.ts`, /this\.policy\.shutdown\.forcedTerminationReserveMaximumMs/), local: at(`${CLI}/daemon/daemon-controller.ts`, /Math\.min\(500, Math\.floor\(this\.stopTimeoutMs \/ 2\)\)/) },
        ],
      },
      {
        id: "B4",
        consumer: "NodeDaemonProcessTerminator",
        role: "SIGTERM/SIGKILL exit wait",
        opening: {
          kind: "section",
          type: 'constructor(policy: DaemonPolicyValues["shutdown"])',
          required: at(`${CLI}/daemon/daemon-process-launcher.ts`, /constructor\(policy: DaemonPolicyValues\["shutdown"\]\)/),
          optional: at(`${CLI}/daemon/daemon-process-launcher.ts`, /private readonly gracefulTimeoutMs = 500,/),
        },
        pieces: [
          { leaf: "shutdown.processSignalExitTimeoutMs", policy: at(`${CLI}/daemon/daemon-process-launcher.ts`, /this\.gracefulTimeoutMs = policy\.processSignalExitTimeoutMs/), local: at(`${CLI}/daemon/daemon-process-launcher.ts`, /private readonly gracefulTimeoutMs = 500,/) },
          { leaf: "shutdown.processExitPollIntervalMs", policy: at(`${CLI}/daemon/daemon-process-launcher.ts`, /this\.pollIntervalMs = policy\.processExitPollIntervalMs/), local: at(`${CLI}/daemon/daemon-process-launcher.ts`, /private readonly pollIntervalMs = 20,/) },
        ],
      },
      {
        id: "B5",
        consumer: "DaemonLifetime",
        role: "idle shutdown timer",
        opening: {
          kind: "leaf",
          type: 'Pick<DaemonPolicyValues["shutdown"], "idleTimeoutMs">',
          required: at(`${CLI}/daemon/daemon-lifetime.ts`, /policy: Pick<DaemonPolicyValues\["shutdown"\], "idleTimeoutMs">,/),
          optional: at(`${CLI}/daemon/daemon-lifetime.ts`, /private readonly idleTimeoutMs: number,/),
        },
        pieces: [
          { leaf: "shutdown.idleTimeoutMs", policy: at(`${CLI}/daemon/daemon-lifetime.ts`, /this\.idleTimeoutMs = policy\.idleTimeoutMs/), local: at(`${CLI}/daemon/daemon-lifetime.ts`, /export const DAEMON_IDLE_TIMEOUT_MS = 30 \* 60 \* 1_000/) },
        ],
      },
      {
        id: "B6",
        consumer: "WorkspaceDaemon",
        role: "heartbeat, drain acknowledgement, disconnected traces",
        opening: {
          kind: "snapshot",
          type: "WorkspaceDaemonOptions.policy: DaemonPolicy",
          required: at(`${CLI}/daemon/workspace-daemon.ts`, /readonly policy: DaemonPolicy;/),
          optional: at(`${CLI}/daemon/workspace-daemon.ts`, /readonly startupHeartbeatIntervalMs\?: number;/),
        },
        pieces: [
          { leaf: "startup.heartbeatIntervalMs", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /this\.policy\.values\.startup\.heartbeatIntervalMs/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /startupHeartbeatIntervalMs \?\? 100/) },
          { leaf: "startup.coordinationGraceMs", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /this\.policy\.values\.startup\.coordinationGraceMs/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /const deadline = this\.now\(\) \+ DAEMON_STARTUP_TIMEOUT_MS/) },
          { leaf: "startup.authorizationPollIntervalMs", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /startup\.authorizationPollIntervalMs/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /setTimeout\(resolve, 10\)/) },
          { leaf: "shutdown.resourceDrainAcknowledgementGraceMs", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /shutdown\.resourceDrainAcknowledgementGraceMs/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /Date\.now\(\) \+ 250;/) },
          { leaf: "shutdown.resourceDrainAcknowledgementPollIntervalMs", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /shutdown\.resourceDrainAcknowledgementPollIntervalMs/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /setTimeout\(resolve, 5\)\)/) },
          { leaf: "diagnostics.disconnectedTraceRetentionMs", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /diagnostics\.disconnectedTraceRetentionMs/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /operationTraceRetentionMs \?\? DEFAULT_OPERATION_TRACE_RETENTION_MS/) },
          { leaf: "diagnostics.maximumDisconnectedTraces", policy: at(`${CLI}/daemon/workspace-daemon.ts`, /Math\.max\(1, this\.policy\.values\.diagnostics\.maximumDisconnectedTraces\)/), local: at(`${CLI}/daemon/workspace-daemon.ts`, /maximumRetainedOperationTraces \?\? DEFAULT_MAXIMUM_RETAINED_OPERATION_TRACES/) },
        ],
      },
      {
        id: "B7",
        consumer: "DaemonLogger",
        role: "diagnostic log rotation and queue",
        opening: {
          kind: "section",
          type: 'DaemonPolicyValues["diagnostics"]',
          required: at(`${CLI}/daemon/daemon-logger.ts`, /readonly policy: DaemonPolicyValues\["diagnostics"\];/),
          optional: at(`${CLI}/daemon/daemon-logger.ts`, /readonly rotateBytes\?: number;/),
        },
        pieces: [
          { leaf: "diagnostics.logRotateBytes", policy: at(`${CLI}/daemon/daemon-logger.ts`, /this\.rotateBytes = policy\.logRotateBytes/), local: at(`${CLI}/daemon/daemon-logger.ts`, /options\.rotateBytes \?\? DAEMON_LOG_ROTATE_BYTES/) },
          { leaf: "diagnostics.maximumQueuedEvents", policy: at(`${CLI}/daemon/daemon-logger.ts`, /this\.maximumQueuedEvents = policy\.maximumQueuedEvents/), local: at(`${CLI}/daemon/daemon-logger.ts`, /options\.maximumQueuedEvents \?\? 1_024/) },
          { leaf: "diagnostics.logBackupCount", policy: at(`${CLI}/daemon/daemon-logger.ts`, /this\.backupCount = policy\.logBackupCount/), local: at(`${CLI}/daemon/daemon-logger.ts`, /export const DAEMON_LOG_BACKUP_COUNT = 4/) },
        ],
      },
    ],
  },
  {
    id: "C",
    shape: "quatrefoil",
    title: "Deadlines & attempts",
    commit: "b100221",
    specCommit: "3f67330",
    compartments: [
      {
        id: "C1",
        lobe: "top",
        consumer: "daemon status → LocalDaemonTransport",
        role: "status observer composition",
        opening: {
          kind: "sections",
          type: 'new LocalDaemonTransport(values, { responseTimeoutPurpose: "status-observer" })',
          required: at(`${CLI}/commands/daemon/register-daemon-command.ts`, /responseTimeoutPurpose: "status-observer",/),
          optional: at(`${CLI}/commands/daemon/register-daemon-command.ts`, /new LocalDaemonTransport\(\{ requestTimeoutMs: 100 \}\)/),
        },
        pieces: [
          {
            leaf: "transport.statusResponseTimeoutMs",
            policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /\? policy\.transport\.statusResponseTimeoutMs/),
            local: at(`${CLI}/commands/daemon/register-daemon-command.ts`, /new LocalDaemonTransport\(\{ requestTimeoutMs: 100 \}\)/),
            fusedInto: "transport.singleResponseTimeoutMs",
          },
        ],
      },
      {
        id: "C2",
        lobe: "left",
        consumer: "LocalDaemonTransport.completeWithReattachments",
        role: "per-request reattachment after accepted close",
        opening: {
          kind: "sections",
          type: 'DaemonPolicyValues["delivery"] (via LocalDaemonTransportPolicy)',
          required: at(`${CLI}/daemon/local-daemon-transport.ts`, /private readonly deliveryPolicy: DaemonPolicyValues\["delivery"\];/),
          optional: at(`${CLI}/daemon/local-daemon-transport.ts`, /private async completeWithOneReattachment\(/),
        },
        pieces: [
          { leaf: "delivery.postAcceptanceExecutionReattachmentLimit", policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /reattachmentCount >= this\.deliveryPolicy\.postAcceptanceExecutionReattachmentLimit/), local: at(`${CLI}/daemon/local-daemon-transport.ts`, /private async completeWithOneReattachment\(/) },
        ],
      },
      {
        id: "C3",
        lobe: "right",
        consumer: "LocalDaemonTransport.executeOnce",
        role: "per-attempt result fetch resume",
        opening: {
          kind: "sections",
          type: 'DaemonPolicyValues["delivery"] (via LocalDaemonTransportPolicy)',
          required: at(`${CLI}/daemon/local-daemon-transport.ts`, /private readonly deliveryPolicy: DaemonPolicyValues\["delivery"\];/),
          optional: at(`${CLI}/daemon/local-daemon-transport.ts`, /let resumeStarted = false;/),
        },
        pieces: [
          { leaf: "delivery.resultTransferResumeLimitPerExecutionAttempt", policy: at(`${CLI}/daemon/local-daemon-transport.ts`, /resumeCount >= this\.deliveryPolicy\.resultTransferResumeLimitPerExecutionAttempt/), local: at(`${CLI}/daemon/local-daemon-transport.ts`, /let resumeStarted = false;/) },
        ],
      },
      {
        id: "C4",
        lobe: "bottom",
        consumer: "DaemonStartupCoordinator.ensureRunning",
        role: "fresh launch after child failure",
        opening: {
          kind: "sections",
          type: 'Pick<DaemonPolicyValues, "startup" | "shutdown">',
          required: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /this\.childFailureRetryLimit = policy\.startup\.childFailureRetryLimit/),
          optional: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /return this\.triggerAndWait\(identity\);/),
        },
        pieces: [
          { leaf: "startup.childFailureRetryLimit", policy: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /failureCount >= this\.childFailureRetryLimit/), local: at(`${CLI}/daemon/daemon-startup-coordinator.ts`, /return this\.triggerAndWait\(identity\);/) },
        ],
      },
    ],
  },
];

export const cracks = [
  {
    id: "crack-U7-registry",
    item: "U7",
    kind: "bypass",
    piece: "B1:startup.coordinationGraceMs",
    present: at(`${CLI}/daemon/daemon-registry.ts`, /graceMs = this\.startupPolicy\.coordinationGraceMs,/),
  },
  {
    id: "crack-U7-stored-output",
    item: "U7",
    kind: "bypass",
    piece: "A1:output.maximumChunkRawBytes",
    present: at(`${CLI}/command-execution-result.ts`, /private readonly maximumRecordBytes\?: number,/),
  },
  {
    id: "crack-U9-worker",
    item: "U9",
    kind: "unexplained",
    piece: "A5:output.maximumChunkRawBytes",
    present: at(`${CLI}/daemon/daemon-navigation-worker.ts`, /this\.maximumChunkRawBytes = DaemonPolicy\.fromSerialized\(/),
  },
  {
    id: "crack-U2-error",
    item: "U2",
    kind: "unexplained",
    piece: "C2:delivery.postAcceptanceExecutionReattachmentLimit",
    present: at(`${CLI}/daemon/local-daemon-transport.ts`, /let reattachmentCount = 0;/),
  },
  {
    id: "crack-U3-status",
    item: "U3",
    kind: "status-history",
    piece: "C1:transport.statusResponseTimeoutMs",
    open: at(`${CLI}/commands/daemon/register-daemon-command.ts`, /^\s+new LocalDaemonTransport\(dependencies\.daemonPolicy\.values\),$/),
    repaired: at(`${CLI}/commands/daemon/register-daemon-command.ts`, /responseTimeoutPurpose: "status-observer",/),
  },
];

export const register = [
  {
    group: "material",
    groupTitle: "Material and lead: how policy reaches consumers",
    items: [
      {
        id: "S1",
        status: "stated",
        title: "Required slices replace local defaults",
        line: "Consumers take a required policy slice; 33 retired local names join the production-source denylist.",
        targets: ["A", "B", "C"],
        reason: [
          { source: "PR body", quote: "Chose required policy slices over optional per-consumer numbers, because omitted composition must not recreate local defaults." },
          { source: "plans/005/daemon-architecture-functional-spec.md:77", quote: "Numeric limits (…) live in one policy object inside the daemon package, each with a stated reason in a policy record under `plans/`. Tests override the policy object; users cannot." },
        ],
        receipts: [
          head("meta-tests/src/daemon-package.test.ts", /it\("retires scattered operational defaults and policy bypasses"/),
          base(`${CLI}/daemon/local-daemon-transport.ts`, /constructor\(options: LocalDaemonTransportOptions = \{\}\)/),
          head(`${CLI}/daemon/local-daemon-transport.ts`, /constructor\(policy: LocalDaemonTransportPolicy, options: LocalDaemonTransportOptions = \{\}\)/),
          base(`${CLI}/daemon/daemon-logger.ts`, /options: DaemonLoggerOptions = \{\},/),
          head(`${CLI}/daemon/daemon-logger.ts`, /options: DaemonLoggerOptions,$/),
        ],
        evidence: ["ledger", "census"],
      },
      {
        id: "S6",
        status: "stated",
        title: "Duplicate derivations fuse into one sheet",
        line: "Two CLI copies of three output limits and a second memory-threshold formula become single policy leaves.",
        targets: ["A1:output.maximumChunkRawBytes", "A2:output.maximumChunkRawBytes", "A7:resources.hardProcessRssBytes", "A8:resources.hardProcessRssBytes"],
        reason: [
          { source: "plans/005/daemon-architecture-functional-spec.md:77", quote: "Numeric limits (…) live in one policy object inside the daemon package" },
        ],
        receipts: [
          base(`${CLI}/command-execution-result.ts`, /const MAXIMUM_RECORD_BYTES = 64 \* 1024;/),
          base(`${CLI}/daemon/completion-spool.ts`, /export const COMMAND_OUTPUT_CHUNK_BYTES = 64 \* 1024;/),
          base(`${CLI}/command-execution-result.ts`, /const DEFAULT_INLINE_BYTES = 256 \* 1024;/),
          base(`${CLI}/daemon/completion-spool.ts`, /export const COMPLETION_SPOOL_INLINE_BYTES = 256 \* 1024;/),
          base(`${CLI}/daemon/daemon-resource-monitor.ts`, /export class DaemonResourcePolicy \{/),
          base(`${CLI}/daemon/workspace-daemon.ts`, /Math\.max\(options\.memoryCapBytes \* 2, 512 \* 1024 \* 1024\)/),
          head(`${CLI}/daemon/workspace-daemon.ts`, /const resourcePolicy = policy\.values\.resources;/),
        ],
        evidence: ["ledger"],
      },
      {
        id: "U1",
        status: "unexplained",
        title: "Opening sizes differ with no stated rule",
        line: "Consumers receive the whole snapshot, section pairs, one section, one leaf, or positional numbers.",
        targets: ["A4", "A5", "A6", "B5"],
        reason: [],
        receipts: [
          head(`${CLI}/daemon/daemon-lifetime.ts`, /policy: Pick<DaemonPolicyValues\["shutdown"\], "idleTimeoutMs">,/),
          head(`${CLI}/daemon/daemon-result-chunk-codec.ts`, /private readonly maximumControlFrameBytes: number,$/),
          head(`${CLI}/daemon/local-daemon-transport.ts`, /export type LocalDaemonTransportPolicy = Pick</),
          head(`${CLI}/daemon/daemon-controller.ts`, /readonly policy: Pick<DaemonPolicyValues, "startup" \| "shutdown">;/),
        ],
        evidence: ["openings"],
      },
      {
        id: "U6",
        status: "unexplained",
        title: "effectiveMemoryBytes lost its only reader",
        line: "Record says it feeds resource reports and derived thresholds; after #131 no app production code reads it.",
        targets: ["rose:resources.effectiveMemoryBytes", "A10"],
        reason: [],
        receipts: [
          base(`${CLI}/daemon/daemon-entry.ts`, /policy\.values\.resources\.effectiveMemoryBytes,/),
          head(`${CLI}/daemon/daemon-entry.ts`, /transport: new LocalDaemonTransport\(policy\.values\),/),
        ],
        evidence: ["census", "record:resources.effectiveMemoryBytes"],
      },
      {
        id: "U7",
        status: "unexplained",
        title: "Two optional seams survive",
        line: "Registry grace keeps a per-call override; StoredCommandOutput takes chunk size as optional and reads it with `!`.",
        targets: ["B1:startup.coordinationGraceMs", "A1:output.maximumChunkRawBytes"],
        reason: [],
        receipts: [
          head(`${CLI}/daemon/daemon-registry.ts`, /graceMs = this\.startupPolicy\.coordinationGraceMs,/),
          head(`${CLI}/daemon/daemon-registry.test.ts`, /startupOwnerIsWithinGrace\(owner, 100, owner\.heartbeatAt \+ 100\)/),
          head(`${CLI}/daemon/daemon-controller.ts`, /this\.registry\.startupOwnerIsWithinGrace\(owner\);/),
          head(`${CLI}/command-execution-result.ts`, /private readonly maximumRecordBytes\?: number,/),
          head(`${CLI}/command-execution-result.ts`, /this\.maximumRecordBytes!/),
        ],
        evidence: [],
      },
      {
        id: "U9",
        status: "unexplained",
        title: "Worker parent re-parses the snapshot",
        line: "NodeDaemonNavigationWorker reads chunk size via DaemonPolicy.fromSerialized(configuration.policy), not a slice.",
        targets: ["A5:output.maximumChunkRawBytes"],
        reason: [],
        receipts: [
          head(`${CLI}/daemon/daemon-navigation-worker.ts`, /this\.maximumChunkRawBytes = DaemonPolicy\.fromSerialized\(/),
          head("plans/005/daemon-policy.md", /`DaemonPolicy\.fromSerialized` and `DaemonPolicy\.toSerialized` are temporary public root methods/),
        ],
        evidence: [],
      },
      {
        id: "S7",
        status: "stated",
        title: "Two consumer recipes stay, as recorded",
        line: "Stop reserve min(max, ⌊stop/2⌋) and trace capacity floor of 1 are computed in consumers.",
        targets: ["B3:shutdown.forcedTerminationReserveMaximumMs", "B6:diagnostics.maximumDisconnectedTraces"],
        reason: [
          { source: "plans/005/daemon-policy.md", quote: "`recipe.forcedTerminationReserve` | `min(forcedTerminationReserveMaximumMs, floor(stopTimeoutMs / 2))` | … | Preserve small overridden stop windows" },
          { source: "plans/005/daemon-policy.md", quote: "`diagnostics.maximumDisconnectedTraces` | 1,024 with effective minimum 1" },
        ],
        receipts: [
          head(`${CLI}/daemon/daemon-controller.ts`, /this\.policy\.shutdown\.forcedTerminationReserveMaximumMs,/),
          head(`${CLI}/daemon/workspace-daemon.ts`, /Math\.max\(1, this\.policy\.values\.diagnostics\.maximumDisconnectedTraces\)/),
        ],
        evidence: [],
      },
      {
        id: "S8",
        status: "stated",
        title: "A dead startup deadline knob is retired",
        line: "Base coordinator stored startupTimeoutMs (default ∞) and never read it; the record lists no healthy-startup deadline.",
        targets: ["B2"],
        reason: [
          { source: "plans/005/daemon-policy.md (Intentional absences)", quote: "healthy startup | None | Progressing warm-up has no project-size deadline." },
        ],
        receipts: [
          base(`${CLI}/daemon/daemon-startup-coordinator.ts`, /readonly startupTimeoutMs\?: number;/),
          base(`${CLI}/daemon/daemon-startup-coordinator.ts`, /private readonly startupTimeoutMs: number;/),
          base(`${CLI}/daemon/daemon-startup-coordinator.ts`, /this\.startupTimeoutMs = options\.startupTimeoutMs \?\? Number\.POSITIVE_INFINITY;/),
          head("meta-tests/src/daemon-package.test.ts", /"startupTimeoutMs",/),
        ],
        evidence: ["occurrences:startupTimeoutMs"],
      },
    ],
  },
  {
    group: "purpose",
    groupTitle: "Distinct purposes: equal numbers, separate glass",
    items: [
      {
        id: "S2",
        status: "stated",
        title: "Status deadline chosen by composition",
        line: "`daemon status` builds its transport with purpose status-observer → 100 ms; every other composition waits 250 ms.",
        targets: ["C1:transport.statusResponseTimeoutMs", "A3:transport.singleResponseTimeoutMs"],
        reason: [
          { source: "PR body", quote: "Chose composition-purpose timeout selection over request-kind selection, because status observation and ordinary execution-status requests have distinct deadlines." },
          { source: "plans/005/daemon-policy.md", quote: "`transport.statusResponseTimeoutMs` | 100 ms | Status observer lifecycle exchange | Keep status aggregation responsive independently of routing" },
        ],
        receipts: [
          head(`${CLI}/commands/daemon/register-daemon-command.ts`, /responseTimeoutPurpose: "status-observer",/),
          head(`${CLI}/daemon/local-daemon-transport.ts`, /options\.responseTimeoutPurpose === "status-observer"/),
          base(`${CLI}/commands/daemon/register-daemon-command.ts`, /new LocalDaemonTransport\(\{ requestTimeoutMs: 100 \}\)/),
        ],
        evidence: ["probe:timeout"],
      },
      {
        id: "U3",
        status: "unexplained",
        title: "Status waited 250 ms for four commits",
        line: "8dca047–3f67330 built the status transport from policy.values with no purpose; b100221 restored 100 ms.",
        targets: ["C1:transport.statusResponseTimeoutMs"],
        reason: [],
        receipts: [],
        evidence: ["history:status"],
      },
      {
        id: "S3",
        status: "stated",
        title: "Reattachments and resumes are separate counts",
        line: "A per-request reattachment limit and a per-attempt fetch-resume limit replace one nested retry and one boolean.",
        targets: ["C2:delivery.postAcceptanceExecutionReattachmentLimit", "C3:delivery.resultTransferResumeLimitPerExecutionAttempt"],
        reason: [
          { source: "PR body", quote: "Chose independent numeric resume and reattachment counters over one shared boolean, because each reattached execute attempt has its own fetch-resume allowance." },
          { source: "plans/005/daemon-policy.md", quote: "`delivery.resultTransferResumeLimitPerExecutionAttempt` | 1 fetch resume per execute attempt | Interrupted manifest transfer | Resume one transfer independently for each execute attempt" },
        ],
        receipts: [
          base(`${CLI}/daemon/local-daemon-transport.ts`, /private async completeWithOneReattachment\(/),
          head(`${CLI}/daemon/local-daemon-transport.ts`, /private async completeWithReattachments\(/),
          head(`${CLI}/daemon/local-daemon-transport.ts`, /let resumeCount = 0;/),
        ],
        evidence: ["probe:delivery"],
      },
      {
        id: "U11",
        status: "unexplained",
        title: "Base already resumed once per attempt",
        line: "resumeStarted lived inside executeOnce; the PR's new two-scope scenario also completes on the base build.",
        targets: ["C3:delivery.resultTransferResumeLimitPerExecutionAttempt"],
        reason: [],
        receipts: [
          base(`${CLI}/daemon/local-daemon-transport.ts`, /let resumeStarted = false;/),
          head(`${CLI}/daemon/local-daemon-transport-execution.test.ts`, /it\("gives the reattached execute attempt its own fetch resume"/),
        ],
        evidence: ["probe:delivery:first"],
      },
      {
        id: "U2",
        status: "unexplained",
        title: "Failed reattachment reports a different error",
        line: "Base rethrows the first failure (closed); head's loop rethrows the latest (corrupt). No changed test tells them apart.",
        targets: ["C2:delivery.postAcceptanceExecutionReattachmentLimit"],
        reason: [],
        receipts: [
          base(`${CLI}/daemon/local-daemon-transport.ts`, /\} catch \{$/),
          head(`${CLI}/daemon/local-daemon-transport.ts`, /\} catch \(firstError\) \{/),
          head(`${CLI}/daemon/local-daemon-transport-execution.test.ts`, /it\("reports EOF after acceptance as a typed post-accept failure"/),
        ],
        evidence: ["probe:delivery:corrupt"],
      },
      {
        id: "S5",
        status: "stated",
        title: "Startup child retry becomes a policy count",
        line: "One hard-coded second launch becomes a loop bounded by startup.childFailureRetryLimit; new tests cover 0 and 2.",
        targets: ["C4:startup.childFailureRetryLimit"],
        reason: [
          { source: "plans/005/daemon-policy.md", quote: "`startup.childFailureRetryLimit` | 1 retry | Explicit startup child failure | Preserve one fresh launch after a failed child" },
        ],
        receipts: [
          base(`${CLI}/daemon/daemon-startup-coordinator.ts`, /return this\.triggerAndWait\(identity\);/),
          head(`${CLI}/daemon/daemon-startup-coordinator.ts`, /failureCount >= this\.childFailureRetryLimit/),
          head(`${CLI}/daemon/daemon-startup-coordinator.test.ts`, /it\("does not retry a child failure when policy permits zero retries"/),
          head(`${CLI}/daemon/daemon-startup-coordinator.test.ts`, /it\("allows each child-failure retry granted by policy"/),
        ],
        evidence: [],
      },
    ],
  },
  {
    group: "bench",
    groupTitle: "Cartoon bench: tests are drawn, not glazed",
    items: [
      {
        id: "S4",
        status: "stated",
        title: "Test-only adapters keep old knobs out of production",
        line: "Seven Test* helpers accept legacy numeric options and build a validated policy; 51 test imports use them.",
        targets: ["bench:adapters"],
        reason: [
          { source: "PR body", quote: "Chose test-only adapters over production compatibility overloads, because tests need small thresholds without restoring runtime tuning seams." },
          { source: "plans/005/daemon-policy.md", quote: "Tests may replace individual values through `DaemonPolicyTestFactory`; users have no flag, environment variable, or configuration file for these values." },
        ],
        receipts: [
          head("apps/cli/test/helpers/local-daemon-transport.ts", /export class TestLocalDaemonTransport extends RuntimeLocalDaemonTransport/),
          head("apps/cli/test/helpers/workspace-daemon.ts", /export class TestWorkspaceDaemon extends RuntimeWorkspaceDaemon/),
        ],
        evidence: ["adapters"],
      },
      {
        id: "U4",
        status: "unexplained",
        title: "15 tests stopped exercising spill files",
        line: "The transport adapter lifts outputInlineBytes 0 to 64 KiB; 14 transport tests and 1 spool test never spill, yet empty-directory checks pass.",
        targets: ["bench:spill"],
        reason: [],
        receipts: [
          head("apps/cli/test/helpers/local-daemon-transport.ts", /base\.values\.output\.maximumChunkRawBytes,$/),
          head("apps/cli/test/helpers/local-daemon-transport.ts", /mkdirSync\(options\.outputDirectory, \{ recursive: true \}\);/),
          head(`${CLI}/daemon/local-daemon-transport-execution.test.ts`, /readdir\(clientDirectory\)\),$/),
          base(`${CLI}/command-execution-result.ts`, /await mkdir\(this\.directory, \{ recursive: true, mode: 0o700 \}\);/),
        ],
        evidence: ["spill"],
      },
      {
        id: "U10",
        status: "unexplained",
        title: "Test inputs rewritten to fit policy ordering",
        line: "Validation needs chunk ≤ inline ≤ result ≤ aggregate and chunk > 0, so fixtures change sizes and record splits.",
        targets: ["bench:inputs"],
        reason: [],
        receipts: [
          head("packages/daemon/src/daemon-policy.ts", /maximumChunkRawBytes > inlineRawBytes \|\|/),
          head(`${CLI}/cli-program-executor.test.ts`, /const spilled = await capture\(32\);/),
          head(`${CLI}/daemon/completion-spool.test.ts`, /policy: outputPolicy\(\{ maximumChunkRawBytes: 1, inlineRawBytes: 1 \}\),/),
          head(`${CLI}/daemon/workspace-daemon-requests.test.ts`, /\{ stream: "stdout" as const, bytes: Buffer\.from\("x"\) \},/),
          head("apps/cli/test/helpers/workspace-daemon.ts", /\? Math\.max\(1, Math\.floor\(resultBytes \/ 2\)\)/),
        ],
        evidence: ["spill:kept"],
      },
      {
        id: "U5",
        status: "unexplained",
        title: "Three CLI resource-policy tests deleted",
        line: "Derivation table, constrained-memory and 250 ms cases leave the CLI; the #130 package test holds matching rows except 256 MiB.",
        targets: ["bench:deleted"],
        reason: [],
        receipts: [
          base(`${CLI}/daemon/daemon-resource-monitor.test.ts`, /\]\)\("derives bounded thresholds from \$memory bytes"/),
          base(`${CLI}/daemon/daemon-resource-monitor.test.ts`, /it\("prefers a smaller positive constrained-memory limit"/),
          base(`${CLI}/daemon/daemon-resource-monitor.test.ts`, /it\("uses a 250 millisecond supervision interval"/),
          head("packages/daemon/src/daemon-policy.test.ts", /"derives memory thresholds from %i raw bytes"/),
          head("packages/daemon/src/daemon-policy.test.ts", /\[1, 256, 204, 179, 128\],/),
        ],
        evidence: ["tests"],
      },
      {
        id: "U8",
        status: "unexplained",
        title: "The guard is a name denylist",
        line: "The meta-test fails only if one of 36 retired strings appears in concatenated app production source.",
        targets: ["bench:guard"],
        reason: [],
        receipts: [
          head("meta-tests/src/daemon-package.test.ts", /public static appProductionSources\(\): string \{/),
          head("meta-tests/src/daemon-package.test.ts", /expect\(sources\)\.not\.toContain\(retiredSeam\);/),
        ],
        evidence: ["denylist"],
      },
    ],
  },
];

export const adapters = [
  { name: "TestLocalDaemonTransport", file: "apps/cli/test/helpers/local-daemon-transport.ts", knobs: "maximumFrameBytes · requestTimeoutMs · executionRequestTimeoutMs · outputInlineBytes → max(64 KiB, n)" },
  { name: "TestWorkspaceDaemon", file: "apps/cli/test/helpers/workspace-daemon.ts", knobs: "idle · heartbeat · resourceCheckInterval · spool limits (inline 0 → max(1, ⌊result/2⌋)) · traces · resourcePolicy" },
  { name: "TestDaemonController", file: "apps/cli/test/helpers/daemon-controller.ts", knobs: "stopTimeoutMs · pollIntervalMs" },
  { name: "TestDaemonStartupCoordinator", file: "apps/cli/test/helpers/daemon-startup-coordinator.ts", knobs: "terminationTimeoutMs · pollIntervalMs" },
  { name: "TestDaemonRegistry", file: "apps/cli/test/helpers/daemon-registry.ts", knobs: "platform | startup policy overload" },
  { name: "TestNodeDaemonProcessTerminator", file: "apps/cli/test/helpers/daemon-process-terminator.ts", knobs: "signal exit timeout | shutdown policy overload" },
  { name: "TestDaemonResourcePolicy", file: "apps/cli/test/helpers/daemon-resource-policy.ts", knobs: "old record shape read from DaemonPolicy.fromSystemMemory" },
];

export const tour = [
  { view: "rose", title: "The snapshot", body: "39 leaves in 7 sections. At base only 2 were read by app production code." },
  { view: "A", title: "Resource & output (8dca047)", body: "Output capture, spool, framing, worker chunks and resource supervision get cut from the output, transport and resources sheets." },
  { view: "B", title: "Lifecycle & diagnostic (bb02059)", body: "Registry, coordinator, controller, terminator, lifetime, logger and daemon timers get cut from startup, shutdown and diagnostics." },
  { view: "C", title: "Deadlines & attempts (b100221)", body: "Four leaves whose numbers collide with others but serve separate purposes." },
  { view: "bench", title: "Cartoon bench", body: "Tests: adapters, rewritten inputs, deleted rows, the denylist guard." },
];
