# Reader R1 · phase 2

Your phase-1 response is sealed. Do not alter it. These are the same authored descent destinations for page 23 (D13, D04) and page 29 (A1). Source excerpts embedded at page 23’s leaf are deliberately withheld here. Compare these explanations with your phase-1 answers; record what you can now predict, what was already supported at the top, and any new actionable decision. No source reading yet.

## 23 · destination D13

D13 / DECISION
unexplained
Keep distinct authentication paths: normal protocol/instance checks, execution tokens, special control tokens.
Protocol/instance identity | process-token authority
BASE / PREVIOUS OWNER

The coordinator already distinguishes identify/terminate/kill from protocol-bearing execution and lifecycle requests.

HEAD / RESULTING SHAPE

Normal requests check protocol and instance first. execute, execution-status, result-fetch and result-ack also check the token; ping/stop require protocol and instance only. identify/terminate/kill branch earlier and check instance plus token. New tests pin the ordering and exceptions.
NO RECORDED REASON FOUNDThese boundaries are specified in tests and characterized in commits. No reason for using different credential sets for these actions was found in the PR body or plans. Preservation is the overall refactor goal, not a recorded justification for each exception.

## 23 · destination D04

D04 / DECISION
stated
Keep host types Node-free; load the runtime dynamically at construction.
Host-visible types | private Node runtime
BASE / PREVIOUS OWNER

Hosts compose Node-backed registry, transport and startup mechanisms themselves.

HEAD / RESULTING SHAPE

DaemonClient exposes execute plus typed start/status/stop overloads. Options carry state directory, version, enabled flag, executor factory, module URL, readiness probe and optional policy. Construction starts one runtime-loading promise; methods await it.
RECORDED REASONPR body: host declarations must not acquire Node ambient dependencies. Dynamic loading separates the public declarations from the Node-backed implementation; this does not make actual execution browser-portable.

## 29 · destination A1

A1
Daemon wall and monotonic clocks replace telemetry and scattered time callbacks.
STATED

Reason · stated. The architecture spec assigns both clock sources to the daemon; behavior is to be preserved.

The coordinator now requires a DaemonClock and passes it into lifetime, ledger, queue and resource owners. Worker timing uses its own NodeDaemonClock. Wall time still drives absolute timestamps, grace periods and idle deadlines; elapsed queue and worker measurements use monotonic time. The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR. The record observer’s unused time parameter disappears.

head · daemon-architecture-functional-spec.md:235
head · daemon-clock.ts:3
head · process-coordinator.ts:84
base · workspace-request-queue.ts:35
head · request-queue.ts:36
↑ Back to this cut’s overview
