// Generated from declaration snapshots. No implementation bodies.
export interface DaemonPolicyValues {
    readonly transport: {
        readonly singleResponseTimeoutMs: number;
        readonly statusResponseTimeoutMs: number;
        readonly executionAdmissionTimeoutMs: number;
        readonly maximumJsonPayloadBytes: number;
        readonly maximumExecutionControlPayloadBytes: number;
    };
    readonly startup: {
        readonly coordinationGraceMs: number;
        readonly heartbeatIntervalMs: number;
        readonly authorizationPollIntervalMs: number;
        readonly observationPollIntervalMs: number;
        readonly previousInstanceTerminationTimeoutMs: number;
        readonly childFailureRetryLimit: number;
    };
    readonly shutdown: {
        readonly idleTimeoutMs: number;
        readonly stopTimeoutMs: number;
        readonly forcedTerminationReserveMaximumMs: number;
        readonly controllerPollIntervalMs: number;
        readonly processSignalExitTimeoutMs: number;
        readonly processExitPollIntervalMs: number;
        readonly resourceDrainAcknowledgementGraceMs: number;
        readonly resourceDrainAcknowledgementPollIntervalMs: number;
    };
    readonly delivery: {
        readonly postAcceptanceExecutionReattachmentLimit: number;
        readonly resultTransferResumeLimitPerExecutionAttempt: number;
    };
    readonly output: {
        readonly maximumChunkRawBytes: number;
        readonly inlineRawBytes: number;
        readonly maximumResultRawBytes: number;
        readonly maximumAggregateSpoolRawBytes: number;
    };
    readonly resources: {
        readonly effectiveMemoryBytes: number;
        readonly hardProcessRssBytes: number;
        readonly softProcessRssBytes: number;
        readonly resumeProcessRssBytes: number;
        readonly workerMaxOldGenerationSizeMiB: number;
        readonly supervisionIntervalMs: number;
        readonly replacementWindowMs: number;
        readonly replacementLimit: number;
        readonly workerHeapSampleIntervalMs: number;
    };
    readonly diagnostics: {
        readonly logRotateBytes: number;
        readonly logBackupCount: number;
        readonly maximumQueuedEvents: number;
        readonly disconnectedTraceRetentionMs: number;
        readonly maximumDisconnectedTraces: number;
    };
}

export interface BeforeOutputOptions {
    readonly inlineBytes?: number;
    readonly directory?: string;
    readonly maximumBytes?: number;
}

export interface AfterOutputOptions {
    readonly policy: DaemonPolicyValues["output"];
    readonly directory?: string;
}

interface LocalDaemonTransportOptions {
    readonly responseTimeoutPurpose?: "ordinary" | "status-observer";
    readonly writeChunkSize?: number;
    readonly outputDirectory?: string;
}

interface DaemonWorkspaceIdentity { readonly __opaque_DaemonWorkspaceIdentity?: never }

interface DaemonPolicy { readonly __opaque_DaemonPolicy?: never }

interface ProgramDependencies { readonly __opaque_ProgramDependencies?: never }

interface DaemonRegistry { readonly __opaque_DaemonRegistry?: never }

interface LocalDaemonTransport { readonly __opaque_LocalDaemonTransport?: never }

interface DaemonNavigationWorker { readonly __opaque_DaemonNavigationWorker?: never }

interface DaemonResourcePolicy { readonly __opaque_DaemonResourcePolicy?: never }

interface DaemonClock { readonly __opaque_DaemonClock?: never }

interface CompletionSpoolStorage { readonly __opaque_CompletionSpoolStorage?: never }

interface DaemonLogger { readonly __opaque_DaemonLogger?: never }

export interface BeforeWorkspaceOptions {
    readonly identity: DaemonWorkspaceIdentity;
    readonly instanceId: string;
    readonly processToken: string;
    readonly symnavVersion: string;
    readonly memoryCapBytes: number;
    readonly policy: DaemonPolicy;
    readonly dependencies: ProgramDependencies;
    readonly registry: DaemonRegistry;
    readonly transport: LocalDaemonTransport;
    readonly navigationWorker?: DaemonNavigationWorker;
    readonly navigationWorkerFactory?: (generation: number) => DaemonNavigationWorker;
    readonly resourcePolicy?: DaemonResourcePolicy;
    readonly now?: () => number;
    readonly clock?: DaemonClock;
    readonly exit?: (code: number) => void;
    readonly idleTimeoutMs?: number;
    readonly resourceCheckIntervalMs?: number;
    readonly residentMemoryBytes?: () => number;
    readonly startupHeartbeatIntervalMs?: number;
    readonly completionSpoolLimits?: {
        readonly inlineBytes?: number;
        readonly maximumResultBytes?: number;
        readonly maximumAggregateBytes?: number;
    };
    readonly completionSpoolStorage?: CompletionSpoolStorage;
    readonly operationTraceRetentionMs?: number;
    readonly maximumRetainedOperationTraces?: number;
    readonly logger?: DaemonLogger;
}

export interface AfterWorkspaceOptions {
    readonly identity: DaemonWorkspaceIdentity;
    readonly instanceId: string;
    readonly processToken: string;
    readonly symnavVersion: string;
    readonly policy: DaemonPolicy;
    readonly dependencies: ProgramDependencies;
    readonly registry: DaemonRegistry;
    readonly transport: LocalDaemonTransport;
    readonly navigationWorker?: DaemonNavigationWorker;
    readonly navigationWorkerFactory?: (generation: number) => DaemonNavigationWorker;
    readonly now?: () => number;
    readonly clock?: DaemonClock;
    readonly exit?: (code: number) => void;
    readonly residentMemoryBytes?: () => number;
    readonly completionSpoolStorage?: CompletionSpoolStorage;
    readonly logger?: DaemonLogger;
}

type Case_empty = {};
type Result_empty_before = Case_empty extends BeforeOutputOptions ? true : false;
type Result_empty_after = Case_empty extends AfterOutputOptions ? true : false;
type Case_legacy = { readonly inlineBytes: 64 };
type Result_legacy_before = Case_legacy extends BeforeOutputOptions ? true : false;
type Result_legacy_after = Case_legacy extends AfterOutputOptions ? true : false;
type Case_missing = { readonly directory: string; readonly policy: Omit<DaemonPolicyValues["output"], "maximumChunkRawBytes"> };
type Result_missing_before = Case_missing extends BeforeOutputOptions ? true : false;
type Result_missing_after = Case_missing extends AfterOutputOptions ? true : false;
type Case_complete = { readonly directory: string; readonly policy: DaemonPolicyValues["output"] };
type Result_complete_before = Case_complete extends BeforeOutputOptions ? true : false;
type Result_complete_after = Case_complete extends AfterOutputOptions ? true : false;
type Case_negative = { readonly directory: string; readonly policy: { readonly maximumChunkRawBytes: -1; readonly inlineRawBytes: -1; readonly maximumResultRawBytes: -1; readonly maximumAggregateSpoolRawBytes: -1 } };
type Result_negative_before = Case_negative extends BeforeOutputOptions ? true : false;
type Result_negative_after = Case_negative extends AfterOutputOptions ? true : false;
type Case_extra = { readonly directory: string; readonly inlineBytes: 64; readonly policy: DaemonPolicyValues["output"] };
type Result_extra_before = Case_extra extends BeforeOutputOptions ? true : false;
type Result_extra_after = Case_extra extends AfterOutputOptions ? true : false;
type Case_workspace = AfterWorkspaceOptions;
type Result_workspace_before = Case_workspace extends BeforeWorkspaceOptions ? true : false;
type Result_workspace_after = Case_workspace extends AfterWorkspaceOptions ? true : false;
type Case_workspace_old = BeforeWorkspaceOptions;
type Result_workspace_old_before = Case_workspace_old extends BeforeWorkspaceOptions ? true : false;
type Result_workspace_old_after = Case_workspace_old extends AfterWorkspaceOptions ? true : false;
type Observation_purpose_ordinary = { responseTimeoutPurpose: "ordinary" } extends LocalDaemonTransportOptions ? true : false;
type Observation_purpose_status = { responseTimeoutPurpose: "status-observer" } extends LocalDaemonTransportOptions ? true : false;
type Observation_purpose_request = { responseTimeoutPurpose: "execution-status" } extends LocalDaemonTransportOptions ? true : false;
type Observation_purpose_omitted = {} extends LocalDaemonTransportOptions ? true : false;
type Observation_independent_numeric_fields = { postAcceptanceExecutionReattachmentLimit: 0; resultTransferResumeLimitPerExecutionAttempt: 2 } extends DaemonPolicyValues["delivery"] ? true : false;
