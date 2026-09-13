## Context

Implements Phase 23 of the daemon architecture plan. This stack layer follows worker-generation PR #145 and isolates completion delivery before accepted-execution extraction. Exact local CI parity passed 2,409 tests with eight expected skips; focused delivery, process, real Unix-socket, and mutation checks preserve protocol and lifecycle behavior.

## Shape

Before — `WorkspaceDaemon` coordinates completion delivery directly:

```mermaid
flowchart LR
    Process["WorkspaceDaemon<br/>&lt;&lt;process and delivery owner&gt;&gt;"] -->|uses| Ledger["AcceptedRequestLedger<br/>&lt;&lt;request state&gt;&gt;"]
    Process -->|uses| Spool["DaemonCompletionSpoolStore<br/>&lt;&lt;completion bytes&gt;&gt;"]
    Process -->|uses| Observer["DaemonOperationObserver<br/>&lt;&lt;delivery traces&gt;&gt;"]

    classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
    class Process removed
```

After — one session coordinates delivery over the existing data owners:

```mermaid
flowchart LR
    Process["WorkspaceDaemon<br/>&lt;&lt;process shell&gt;&gt;"] -->|uses| Session["DaemonDeliverySession<br/>&lt;&lt;delivery coordinator&gt;&gt;"]
    Session -->|uses| Ledger["AcceptedRequestLedger<br/>&lt;&lt;request state&gt;&gt;"]
    Session -->|uses| Spool["DaemonCompletionSpoolStore<br/>&lt;&lt;completion bytes&gt;&gt;"]
    Session -->|uses| Observer["DaemonOperationObserver<br/>&lt;&lt;delivery traces&gt;&gt;"]

    classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Session added
    class Process changed
```

Legend: green = added; red = removed; yellow = changed; unfilled = pre-existing and unchanged.

## Where it lives

```text
.
└── apps/cli/src/daemon/
    ├── ++ daemon-delivery-session.ts       # owns delivery coordination over injected state owners
    ├── ++ daemon-delivery-session.test.ts  # locks transfer, retention, barrier, and cleanup behavior
    ├── ** workspace-daemon.ts               # composes the session and delegates delivery behavior
    └── ** workspace-daemon-requests.test.ts # preserves process-level delivery and shutdown ordering
```

Legend: `++` added, `**` changed, `~~` moved, `--` removed.

## Public surface

Added:

```ts
export interface DaemonDiagnosticRecorder {
  record(event: DaemonDiagnosticEvent): void;
}
export interface DaemonCompletionWriter {
  append(record: DaemonSequencedOutputRecord): Promise<void>;
  finish(exitCode: number): Promise<CompletionSpoolManifest>;
  dispose(): Promise<void>;
}
export interface DaemonDeliverySnapshot {
  readonly spoolBytes: number;
  readonly hasUnacknowledgedCompletions: boolean;
}
export interface DaemonDeliveryAttachment {
  readonly requestId: string;
  readonly acceptedAt: number;
  readonly queuePosition: number;
}
export interface AcceptedExecutionJournal {
  readonly hasUnacknowledgedCompletions: boolean;
  entryFor(requestId: string): AcceptedRequestEntry | undefined;
  subscribe(requestId: string, subscriber: AcceptedRequestSubscriber): () => void;
  invalidateCompletion(requestId: string, code: DaemonExecutionFailureCode, completedAt: number): void;
  acknowledge(requestId: string): void;
  terminateDelivery(requestId: string): boolean;
  isDeliveryTerminated(requestId: string): boolean;
}
export type AuthenticatedDaemonResultFetchRequest = DaemonResultFetchRequest;
export type AuthenticatedDaemonResultAcknowledgement = DaemonResultAcknowledgement;
export type DaemonResultAcknowledged = Extract<DaemonResponse, { readonly kind: "result-acknowledged" }>;
export interface DaemonDeliverySessionOptions {
  readonly coordinates: Pick<DaemonIdentityCoordinates, "instanceId" | "processToken">;
  readonly journal: AcceptedExecutionJournal;
  readonly spoolStore: DaemonCompletionSpoolStore;
  readonly observer: DaemonOperationObserver;
  readonly diagnostics: DaemonDiagnosticRecorder;
  readonly clock: DaemonClock;
  readonly policy: Pick<DaemonPolicyValues, "delivery" | "diagnostics" | "shutdown">;
}
export class DaemonDeliverySession {
  constructor(options: DaemonDeliverySessionOptions);
  get snapshot(): DaemonDeliverySnapshot;
  beginAcceptedTrace(requestId: string, command: DaemonCommandName, queuePosition: number, workerGeneration: number): DaemonOperationTrace;
  createCompletion(requestId: string): Promise<DaemonCompletionWriter>;
  attach(attachment: DaemonDeliveryAttachment, send: DaemonServerSend): Promise<void>;
  fetch(request: AuthenticatedDaemonResultFetchRequest, send: DaemonServerSend): Promise<void>;
  acknowledge(request: AuthenticatedDaemonResultAcknowledgement): Promise<DaemonResultAcknowledged>;
  trackedCompletion(requestId: string): Promise<void> | undefined;
  waitForCompletionAcknowledgements(): Promise<void>;
  completeRetainedTraces(): void;
  cleanupInstance(): Promise<void>;
}
```

## Decisions

- Chose one injected delivery session over process-shell delivery fields, because attachment, transfer, acknowledgement, and trace lifecycles form one coordination boundary.
- Chose narrow ledger and spool ports over moving their data into the session, because accepted-request state and completion bytes already have authoritative owners.
- Chose the latest per-request delivery promise over aggregating duplicate attachments, because queue completion must wait for the current stream without creating another request registry.
- Chose retention-fenced trace handles over raw observer handles, because evicted or expired traces must ignore late diagnostics.
- Chose physical cleanup before logical acknowledgement over conditional journal acknowledgement, because cleanup failure remains diagnostic and must not withhold protocol success.

## Look here

- `apps/cli/src/daemon/daemon-delivery-session.ts:189`
- `apps/cli/src/daemon/daemon-delivery-session.ts:256`
- `apps/cli/src/daemon/daemon-delivery-session.ts:281`

