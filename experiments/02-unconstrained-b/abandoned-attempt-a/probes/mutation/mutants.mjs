// Each mutant makes one policy leaf's consumers ignore the policy snapshot and hard-code the
// production value observed on this machine. Surviving mutant = no test notices the bypass.
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lit = (file, text, replacement) => ({ file, pattern: escape(text), replacement });

const T = "src/daemon/local-daemon-transport.ts";
const REG = "src/daemon/daemon-registry.ts";
const CO = "src/daemon/daemon-startup-coordinator.ts";
const WD = "src/daemon/workspace-daemon.ts";
const LT = "src/daemon/daemon-lifetime.ts";
const CT = "src/daemon/daemon-controller.ts";
const PL = "src/daemon/daemon-process-launcher.ts";
const CER = "src/command-execution-result.ts";
const SP = "src/daemon/completion-spool.ts";
const WE = "src/daemon/daemon-navigation-worker-entry.ts";
const NW = "src/daemon/daemon-navigation-worker.ts";
const RM = "src/daemon/daemon-resource-monitor.ts";
const LG = "src/daemon/daemon-logger.ts";
const CMD = "src/commands/daemon/register-daemon-command.ts";

export const mutants = [
  { id: "transport.singleResponseTimeoutMs", value: 250, edits: [lit(T, "policy.transport.singleResponseTimeoutMs", "250")] },
  { id: "transport.statusResponseTimeoutMs", value: 100, edits: [lit(T, "policy.transport.statusResponseTimeoutMs", "100")] },
  { id: "transport.executionAdmissionTimeoutMs", value: 5000, edits: [lit(T, "policy.transport.executionAdmissionTimeoutMs", "5000")] },
  { id: "transport.maximumJsonPayloadBytes", value: 8388608, edits: [lit(T, "policy.transport.maximumJsonPayloadBytes", "8388608")] },
  { id: "transport.maximumExecutionControlPayloadBytes", value: 262144, edits: [lit(T, "policy.transport.maximumExecutionControlPayloadBytes", "262144")] },

  {
    id: "startup.coordinationGraceMs",
    value: 15000,
    edits: [
      lit(REG, "this.startupPolicy.coordinationGraceMs", "15000"),
      lit(CO, "policy.startup.coordinationGraceMs", "15000"),
      lit(WD, "this.policy.values.startup.coordinationGraceMs", "15000"),
    ],
  },
  { id: "startup.heartbeatIntervalMs", value: 100, edits: [lit(WD, "this.policy.values.startup.heartbeatIntervalMs", "100")] },
  { id: "startup.authorizationPollIntervalMs", value: 10, edits: [lit(WD, "this.policy.values.startup.authorizationPollIntervalMs", "10")] },
  { id: "startup.observationPollIntervalMs", value: 20, edits: [lit(CO, "policy.startup.observationPollIntervalMs", "20")] },
  { id: "startup.previousInstanceTerminationTimeoutMs", value: 300000, edits: [lit(CO, "policy.startup.previousInstanceTerminationTimeoutMs", "300000")] },
  { id: "startup.childFailureRetryLimit", value: 1, edits: [lit(CO, "policy.startup.childFailureRetryLimit", "1")] },

  { id: "shutdown.idleTimeoutMs", value: 1800000, edits: [lit(LT, "policy.idleTimeoutMs", "1800000")] },
  { id: "shutdown.stopTimeoutMs", value: 5000, edits: [lit(CT, "this.policy.shutdown.stopTimeoutMs", "5000")] },
  { id: "shutdown.forcedTerminationReserveMaximumMs", value: 500, edits: [lit(CT, "this.policy.shutdown.forcedTerminationReserveMaximumMs", "500")] },
  { id: "shutdown.controllerPollIntervalMs", value: 20, edits: [lit(CT, "this.policy.shutdown.controllerPollIntervalMs", "20")] },
  { id: "shutdown.processSignalExitTimeoutMs", value: 500, edits: [lit(PL, "policy.processSignalExitTimeoutMs", "500")] },
  { id: "shutdown.processExitPollIntervalMs", value: 20, edits: [lit(PL, "policy.processExitPollIntervalMs", "20")] },
  { id: "shutdown.resourceDrainAcknowledgementGraceMs", value: 250, edits: [lit(WD, "this.policy.values.shutdown.resourceDrainAcknowledgementGraceMs", "250")] },
  { id: "shutdown.resourceDrainAcknowledgementPollIntervalMs", value: 5, edits: [lit(WD, "this.policy.values.shutdown.resourceDrainAcknowledgementPollIntervalMs", "5")] },

  { id: "delivery.postAcceptanceExecutionReattachmentLimit", value: 1, edits: [lit(T, "this.deliveryPolicy.postAcceptanceExecutionReattachmentLimit", "1")] },
  { id: "delivery.resultTransferResumeLimitPerExecutionAttempt", value: 1, edits: [lit(T, "this.deliveryPolicy.resultTransferResumeLimitPerExecutionAttempt", "1")] },

  {
    id: "output.maximumChunkRawBytes",
    value: 65536,
    edits: [
      lit(CER, "policy.maximumChunkRawBytes", "65536"),
      lit(SP, "policy.maximumChunkRawBytes", "65536"),
      lit(WE, "this.policy.values.output.maximumChunkRawBytes", "65536"),
      {
        file: NW,
        pattern: "DaemonPolicy\\.fromSerialized\\(\\s*options\\.configuration\\.policy,\\s*\\)\\.values\\.output\\.maximumChunkRawBytes",
        replacement: "65536",
      },
      lit(T, "policy.output.maximumChunkRawBytes", "65536"),
    ],
  },
  { id: "output.inlineRawBytes", value: 262144, edits: [lit(CER, "policy.inlineRawBytes", "262144"), lit(SP, "policy.inlineRawBytes", "262144")] },
  {
    id: "output.maximumResultRawBytes",
    value: 268435456,
    edits: [lit(CER, "policy.maximumResultRawBytes", "268435456"), lit(SP, "policy.maximumResultRawBytes", "268435456")],
  },
  { id: "output.maximumAggregateSpoolRawBytes", value: 536870912, edits: [lit(SP, "policy.maximumAggregateSpoolRawBytes", "536870912")] },

  {
    id: "resources.hardProcessRssBytes",
    value: 8589934592,
    edits: [
      lit(RM, "policy.hardProcessRssBytes", "8589934592"),
      lit(WD, "this.resourcePolicy.hardProcessRssBytes", "8589934592"),
      lit(PL, "this.policy.values.resources.hardProcessRssBytes", "8589934592"),
    ],
  },
  { id: "resources.softProcessRssBytes", value: 6871318528, edits: [lit(RM, "policy.softProcessRssBytes", "6871318528")] },
  { id: "resources.resumeProcessRssBytes", value: 6012534784, edits: [lit(RM, "policy.resumeProcessRssBytes", "6012534784")] },
  { id: "resources.workerMaxOldGenerationSizeMiB", value: 4096, edits: [lit(WD, "resourcePolicy.workerMaxOldGenerationSizeMiB", "4096")] },
  { id: "resources.supervisionIntervalMs", value: 250, edits: [lit(RM, "this.options.policy.supervisionIntervalMs", "250")] },
  { id: "resources.replacementWindowMs", value: 600000, edits: [lit(RM, "this.options.policy.replacementWindowMs", "600000")] },
  { id: "resources.replacementLimit", value: 2, edits: [lit(RM, "this.options.policy.replacementLimit", "2")] },
  { id: "resources.workerHeapSampleIntervalMs", value: 25, edits: [lit(WE, "this.policy.values.resources.workerHeapSampleIntervalMs", "25")] },

  { id: "diagnostics.logRotateBytes", value: 10485760, edits: [lit(LG, "policy.logRotateBytes", "10485760")] },
  { id: "diagnostics.logBackupCount", value: 4, edits: [lit(LG, "policy.logBackupCount", "4")] },
  { id: "diagnostics.maximumQueuedEvents", value: 1024, edits: [lit(LG, "policy.maximumQueuedEvents", "1024")] },
  { id: "diagnostics.disconnectedTraceRetentionMs", value: 300000, edits: [lit(WD, "this.policy.values.diagnostics.disconnectedTraceRetentionMs", "300000")] },
  { id: "diagnostics.maximumDisconnectedTraces", value: 1024, edits: [lit(WD, "this.policy.values.diagnostics.maximumDisconnectedTraces", "1024")] },

  {
    id: "composition.statusObserverPurpose",
    value: "ordinary",
    edits: [lit(CMD, 'responseTimeoutPurpose: "status-observer"', 'responseTimeoutPurpose: "ordinary"')],
  },
];
