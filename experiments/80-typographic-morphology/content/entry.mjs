// Hand-authored layer. Every quote is checked verbatim by scripts/verify.mjs.
// Sources: "pr:N" = PR body in inputs/stack/pr.json; "spec" = plans/005/daemon-architecture-functional-spec.md at main.

export const BOX = {
  forms: [
    { name: "WorkspaceDaemon", span: "main – #147", path: "apps/cli/src/daemon/workspace-daemon.ts" },
    { name: "DaemonProcessCoordinator", span: "#148", path: "apps/cli/src/daemon/daemon-process-coordinator.ts  +  packages/daemon/src/process/process-coordinator.ts" },
    { name: "DaemonProcessCoordinator", span: "#149", path: "packages/daemon/src/process/process-coordinator.ts" },
  ],
};

export const PLAN = {
  source: "spec",
  line: 98,
  text: "`WorkspaceDaemon` split into process coordinator, accepted-execution session, delivery session, worker-generation manager, activity projector.",
  owners: [
    { key: "coordinator", phrase: "process coordinator", className: "DaemonProcessCoordinator", pr: 148, morpheme: /process|coordinat/i },
    { key: "execution", phrase: "accepted-execution session", className: "AcceptedExecutionSession", pr: 147, morpheme: /accept|execut/i },
    { key: "delivery", phrase: "delivery session", className: "DaemonDeliverySession", pr: 146, morpheme: /deliver/i },
    { key: "worker", phrase: "worker-generation manager", className: "DaemonWorkerGenerationManager", pr: 145, morpheme: /worker|generation/i },
    { key: "activity", phrase: "activity projector", className: "DaemonActivityProjector", pr: 144, morpheme: /activity|project/i },
  ],
};

export const MOVEMENTS = [
  { id: "I", title: "Vocabulary arrives", span: "#130 – #137", frames: ["130", "131", "132", "133", "134", "135", "137"], gist: "The package's words enter the class; its body stays about 80 words." },
  { id: "II", title: "Words leave", span: "#144 – #147", frames: ["144", "145", "146", "147"], gist: "Four owners take 44 words; 7 arrive; 1,201 → 657 lines." },
  { id: "III", title: "Renamed, then doubled", span: "#148", frames: ["148-rename", "148-stage", "148"], gist: "New name, re-spelled options, a package copy, a frozen CLI copy." },
  { id: "IV", title: "One owner left", span: "#149", frames: ["149"], gist: "CLI copy deleted; the package copy is the only one." },
];

// state: stated | unexplained | observed (a measured fact, not a decision)
export const SENSES = [
  {
    n: 1, movement: "I", frame: "130", pr: 130, state: "stated",
    text: "`policy` enters the constructor options: one versioned `DaemonPolicy` snapshot.",
    words: ["opt:policy", "m:policy", "i:DaemonPolicy"],
    quotes: [{ source: "pr:130", text: "Chose a complete versioned snapshot over partial per-hop options, because process and worker boundaries must preserve exact derived values." }],
  },
  {
    n: 2, movement: "I", frame: "131", pr: 131, state: "stated",
    text: "8 tuning options struck (`memoryCapBytes` … `maximumRetainedOperationTraces`); thresholds come from required policy slices.",
    words: ["opt:memoryCapBytes", "opt:resourcePolicy", "opt:idleTimeoutMs", "opt:resourceCheckIntervalMs", "opt:startupHeartbeatIntervalMs", "opt:completionSpoolLimits", "opt:operationTraceRetentionMs", "opt:maximumRetainedOperationTraces", "i:DaemonPolicyValues"],
    quotes: [
      { source: "pr:131", text: "Chose required policy slices over optional per-consumer numbers, because omitted composition must not recreate local defaults." },
      { source: "pr:131", text: "Chose test-only adapters over production compatibility overloads, because tests need small thresholds without restoring runtime tuning seams." },
    ],
  },
  {
    n: 3, movement: "I", frame: "132", pr: 132, state: "stated",
    text: "`commandName()`, which scanned argv, is deleted; the command name arrives with each request under a new protocol generation.",
    words: ["m:commandName", "i:DaemonCommandName"],
    quotes: [
      { source: "pr:132", text: "Chose `commandName` beside opaque argv over nesting or reparsing it, because argv normalization and operational labeling have different owners." },
      { source: "pr:132", text: "Chose a new protocol generation over optional or legacy command metadata, because either mixed-generation direction must take established compatibility handling before execution." },
    ],
  },
  {
    n: 4, movement: "I", frame: "133", pr: 133, state: "stated",
    text: "Failure precedence leaves the class: `DaemonExecutionFailures.classify` replaces inline branches.",
    words: ["i:DaemonExecutionFailures"],
    quotes: [{ source: "pr:133", text: "Chose a pure context classifier over lifecycle-specific branching at the call site, because precedence is exhaustively testable without constructing a workspace daemon." }],
  },
  {
    n: 5, movement: "I", frame: "134", pr: 134, state: "stated",
    text: "`decideAdmission` and `admissionPolicy` enter; the package owns guard order.",
    words: ["m:decideAdmission", "m:admissionPolicy", "i:DaemonAdmissionPolicy", "i:DaemonAdmissionRejections", "i:DaemonAdmissionDecision", "i:DaemonExecuteRejectionCode"],
    quotes: [{ source: "pr:134", text: "Chose explicit guard classes over inline conditionals, because first-failure order is visible and exhaustively testable as one policy." }],
  },
  {
    n: 6, movement: "I", frame: "135", pr: 135, state: "stated",
    text: "CLI execution types leave the imports; `executorModuleUrl` and `pathExists` enter.",
    words: ["i:ProgramDependencies", "i:CommandExecutionResult", "i:CommandOutputRecord", "opt:executorModuleUrl", "m:pathExists", "i:DaemonExecutorModuleUrl", "i:access"],
    quotes: [{ source: "pr:135", text: "Chose an absolute injected file URL over importing CLI code from daemon mechanisms, because the daemon package must keep zero internal dependencies." }],
  },
  {
    n: 7, movement: "I", frame: "137", pr: 137, state: "stated",
    text: "The `LocalDaemonTransport` import becomes the type-only `DaemonRequestServer` port.",
    words: ["i:LocalDaemonTransport", "i:DaemonRequestServer"],
    quotes: [{ source: "pr:137", text: "Chose operation-shaped transport interfaces over `LocalDaemonTransport` and consumer-local transport shapes, because lifecycle observation, execution, and request serving require different capabilities." }],
  },
  {
    n: 8, movement: "II", frame: "144", pr: 144, state: "stated",
    text: "`activitySnapshot` (49 lines) leaves for `DaemonActivityProjector.project`.",
    words: ["m:activitySnapshot", "o:DaemonActivityProjector"],
    quotes: [{ source: "pr:144", text: "Chose a static projector over an injected service, because projection depends only on explicit snapshot values." }],
  },
  {
    n: 9, movement: "II", frame: "145", pr: 145, state: "stated",
    text: "13 worker words leave for `DaemonWorkerGenerationManager`; `recoverWorkerExit` arrives as its recovery port.",
    words: ["o:DaemonWorkerGenerationManager", "m:recoverWorkerExit", "m:workerManager"],
    quotes: [
      { source: "pr:145", text: "Chose one generation manager over process-shell worker fields, because startup, execution, replacement, fencing, release, and shutdown share one lifecycle state." },
      { source: "pr:145", text: "Chose a recovery port over importing the resource supervisor, because replacement-window and circuit decisions remain resource policy." },
    ],
  },
  {
    n: 10, movement: "II", frame: "146", pr: 146, state: "stated",
    text: "20 delivery words leave for `DaemonDeliverySession`, including 10 operation-trace words that carry no “deliver” morpheme.",
    words: ["o:DaemonDeliverySession", "m:deliverySession"],
    quotes: [{ source: "pr:146", text: "Chose one injected delivery session over process-shell delivery fields, because attachment, transfer, acknowledgement, and trace lifecycles form one coordination boundary." }],
  },
  {
    n: 11, movement: "II", frame: "147", pr: 147, state: "stated",
    text: "10 execution words leave for `AcceptedExecutionSession`; `workspaceExists` and `workspaceDeletedAfterDelivery` arrive as its port; `acceptExecution` stays.",
    words: ["o:AcceptedExecutionSession", "m:workspaceExists", "m:workspaceDeletedAfterDelivery", "m:acceptExecution", "m:acceptedExecutionSession"],
    quotes: [
      { source: "pr:147", text: "Chose an injected session over moving ledger, queue, delivery, worker, resource, lifetime, or shutdown state, because each dependency remains authoritative for its own mechanism." },
      { source: "pr:147", text: "Chose a narrow process-lifecycle port over exposing the process shell, because execution needs only shutdown classification, workspace presence, and post-delivery deletion transition." },
    ],
  },
  {
    n: 12, movement: "II", frame: "147", pr: null, state: "observed",
    text: "Fields that left became constructor wiring: `constructor` grows 66 → 132 lines while the body shrinks.",
    words: ["sig:constructor"],
    quotes: [],
  },
  {
    n: 13, movement: "III", frame: "148-rename", pr: 148, state: "unexplained",
    text: "`WorkspaceDaemon` → `DaemonProcessCoordinator`. The plan names a “process coordinator”; PR prose said “process shell” in #144–#147; no reason is given for the name.",
    words: ["name"],
    quotes: [
      { source: "spec", text: "`WorkspaceDaemon` split into process coordinator, accepted-execution session, delivery session, worker-generation manager, activity projector.", role: "request" },
      { source: "pr:147", text: "isolates accepted execution before Phase 25 replaces the residual process coordinator", role: "prose" },
    ],
  },
  {
    n: 14, movement: "III", frame: "148-rename", pr: 148, state: "unexplained",
    text: "Options re-spelled: `instanceId` + `processToken` → `coordinates`, `symnavVersion` → `productVersion`, `transport` → `server`, `dependencies` → `workspaceExists`; `now` removed; `clock` required.",
    words: ["opt:coordinates", "opt:productVersion", "opt:server", "opt:workspaceExists", "opt:clock", "opt:instanceId", "opt:processToken", "opt:symnavVersion", "opt:transport", "opt:dependencies", "opt:now", "m:now"],
    quotes: [{ source: "spec", text: "Daemon owns its wall and monotonic clock.", role: "request" }],
  },
  {
    n: 15, movement: "III", frame: "148-rename", pr: 148, state: "unexplained",
    text: "New constructor guard `validateCoordinates` throws when configuration coordinates disagree with the workspace identity.",
    words: ["m:validateCoordinates"],
    quotes: [],
  },
  {
    n: 16, movement: "III", frame: "148", pr: 148, state: "stated",
    text: "A package copy appears with an identical body and re-addressed imports; the CLI copy is frozen by one SHA-256 over 38 files and is still the one `daemon-entry.ts` runs; the unit tests follow the package copy.",
    words: ["copy:daemon", "copy:cli"],
    quotes: [{ source: "pr:148", text: "Chose package staging with a frozen CLI compatibility graph over switching production consumers during relocation, because mechanism ownership and host invocation coordination need separate review boundaries." }],
  },
  {
    n: 17, movement: "III", frame: "148", pr: 148, state: "unexplained",
    text: "Inside `process/`, the file name drops `daemon-`; the class name keeps `Daemon`. At #149, 28% of package file names carry “daemon”, 86% of its class names do.",
    words: ["addr"],
    quotes: [],
  },
  {
    n: 18, movement: "IV", frame: "149", pr: 149, state: "stated",
    text: "The CLI copy is deleted (670 lines); the only production caller is `packages/daemon/src/process-entry.ts`.",
    words: ["copy:cli"],
    quotes: [{ source: "pr:149", text: "Chose a CLI invocation coordinator over the app-local daemon dispatcher, because argv classification and workspace discovery remain host responsibilities while execution belongs behind `DaemonClient`." }],
  },
  {
    n: 19, movement: "IV", frame: "149", pr: 149, state: "unexplained",
    text: "`policy.toSerialized()` becomes `DaemonPolicyCodec.serialize(policy)`: serialization leaves `DaemonPolicy`'s public surface.",
    words: ["i:DaemonPolicyCodec"],
    quotes: [],
  },
  {
    n: 20, movement: "IV", frame: "149", pr: 149, state: "stated",
    text: "Admission names leave the package root; the class now imports them by relative path.",
    words: ["i:DaemonAdmissionPolicy", "i:DaemonAdmissionRejections", "i:DaemonAdmissionDecision", "i:DaemonExecuteRejectionCode"],
    quotes: [
      { source: "spec", text: "**Purpose.** Give daemon policy and mechanism one home with an enforced boundary." },
      { source: "spec", text: "**Produces.** `@symnav/daemon` with a public surface of: client (execute, control), process entry, worker entry, executor contract, policy object, lifecycle report shapes.", role: "request" },
    ],
  },
  {
    n: 21, movement: "all", frame: "149", pr: null, state: "observed",
    text: "Class-public words never changed: `constructor` and `start()` in all 27 snapshots. The four new owners hold 30 public members. None of the five names is exported by any package entry.",
    words: ["sig:start", "sig:constructor"],
    quotes: [],
  },
  {
    n: 22, movement: "all", frame: "148", pr: null, state: "observed",
    text: "Tests: no test in the class's suites removed across 27 snapshots; 65 → 82 tests; suites renamed with the class at #148; one #145 assertion rewritten to check two more `fileCount` facts.",
    words: [],
    quotes: [],
  },
  {
    n: 23, movement: "all", frame: "main", pr: null, state: "observed",
    text: "13 of 26 PRs changed the file, in 29 commits. The other 13 never touched it.",
    words: [],
    quotes: [],
  },
];

// Fate of each word that left the class body. kind: same | renamed | wiring | absorbed | split | deleted
export const LINEAGE = {
  "132": [
    { from: "commandName", kind: "deleted", note: "request carries `commandName`" },
  ],
  "144": [
    { from: "activitySnapshot", kind: "renamed", owner: "DaemonActivityProjector", to: "project" },
  ],
  "145": [
    { from: "initialNavigationWorker", kind: "wiring", owner: "DaemonWorkerGenerationManager", to: "initialWorker", note: "constructor local → manager option" },
    { from: "navigationWorkerFactory", kind: "wiring", owner: "DaemonWorkerGenerationManager", to: "createWorker", note: "read inside a constructor closure" },
    { from: "workerGeneration", kind: "renamed", owner: "DaemonWorkerGenerationManager", to: "currentGeneration" },
    { from: "fileCount", kind: "same", owner: "DaemonWorkerGenerationManager", to: "fileCount" },
    { from: "workerReady", kind: "same", owner: "DaemonWorkerGenerationManager", to: "workerReady" },
    { from: "workerRecoveryOperation", kind: "renamed", owner: "DaemonWorkerGenerationManager", to: "recoveryOperation" },
    { from: "createNavigationWorker", kind: "wiring", owner: "DaemonWorkerGenerationManager", to: "createWorker", note: "constructor closure → manager option" },
    { from: "startWorkerGeneration", kind: "renamed", owner: "DaemonWorkerGenerationManager", to: "createGeneration" },
    { from: "observeWorkerExit", kind: "renamed", owner: "DaemonWorkerGenerationManager", to: "observeExit" },
    { from: "waitForReadyGeneration", kind: "same", owner: "DaemonWorkerGenerationManager", to: "waitForReadyGeneration" },
    { from: "replaceNavigationWorker", kind: "renamed", owner: "DaemonWorkerGenerationManager", to: "replaceGeneration" },
    { from: "releaseTransientResources", kind: "same", owner: "DaemonWorkerGenerationManager", to: "releaseTransientResources" },
    { from: "currentNavigationWorker", kind: "absorbed", owner: "DaemonWorkerGenerationManager", to: "currentGeneration", note: "reads become `currentGeneration.worker`" },
  ],
  "146": [
    { from: "completionSpools", kind: "wiring", owner: "DaemonDeliverySession", to: "spoolStore", note: "constructor local → session option" },
    ...["completionDeliveries", "operationTraces", "operationTraceExpirations", "operationTraceConnections", "failedFrame", "deliver", "deliverStoredCompletion", "trackCompletionDelivery", "deliverCompletion", "recordDeliveryFailure", "completeOperationTrace", "terminateOperationDelivery", "disconnectOperationTrace", "attachOperationTraceConnection", "reattachOperationTrace", "expireOperationTrace", "enforceOperationTraceCapacity", "waitForCompletionAcknowledgements"]
      .map((from) => ({ from, kind: "same", owner: "DaemonDeliverySession", to: from })),
    { from: "completeRetainedOperationTraces", kind: "renamed", owner: "DaemonDeliverySession", to: "completeRetainedTraces" },
  ],
  "147": [
    { from: "requestQueue", kind: "wiring", owner: "AcceptedExecutionSession", to: "queue", note: "constructor local → session option" },
    { from: "acceptedRequests", kind: "wiring", owner: "AcceptedExecutionSession", to: "ledger", note: "constructor local → session option (also delivery `journal`)" },
    { from: "acceptances", kind: "absorbed", owner: "AcceptedExecutionSession", to: "ledger", note: "acceptance metadata moves onto ledger entries" },
    { from: "lastNavigationAt", kind: "same", owner: "AcceptedExecutionSession", to: "lastNavigationAt" },
    { from: "lastCompletedMonotonicAt", kind: "same", owner: "AcceptedExecutionSession", to: "lastCompletedMonotonicAt" },
    { from: "resourceInterruptedRequests", kind: "same", owner: "AcceptedExecutionSession", to: "resourceInterruptedRequests" },
    { from: "executeAccepted", kind: "same", owner: "AcceptedExecutionSession", to: "executeAccepted" },
    { from: "scheduleTurnCompleteResourceSample", kind: "same", owner: "AcceptedExecutionSession", to: "scheduleTurnCompleteResourceSample" },
    { from: "recordCompletion", kind: "split", owner: "AcceptedExecutionSession", to: "executeAccepted", note: "timestamp → `executeAccepted`; existence check → the class's `workspaceExists`" },
    { from: "markActiveResourceInterruption", kind: "renamed", owner: "AcceptedExecutionSession", to: "markActiveResourceInterrupted" },
  ],
  "148-rename": [
    { from: "now", kind: "deleted", note: "timing reads `clock.wallNowMs()`" },
  ],
};

export const OPTION_RENAMES = {
  "148-rename": [
    { from: ["instanceId", "processToken"], to: "coordinates" },
    { from: ["symnavVersion"], to: "productVersion" },
    { from: ["transport"], to: "server" },
    { from: ["dependencies"], to: "workspaceExists" },
  ],
};

export const OUTSIDE = [
  "#148 decisions about DaemonClient (Node-free façade, lazy routing guards, result capture) and about idle timing live in other owners.",
  "Transport splitting (#137–#143) is shown only where the class's imports change.",
];
