Fresh agent-reader observation: R3, phase 3. I compared my sealed phase 1 and phase 2 responses with the supplied pinned source excerpts only. Earlier files remain unchanged. Citations below use the excerpt labels and original line numbers supplied in source.md. This is a focused comparison, not a full source audit or an execution result.

**Case 127 — cache and release**

Learning by layer: the top already supported the clearing order, awaited head release, reusable head handles, and preservation of caches across failed refresh. There was no authored descent for this case. Source now supplies the mechanism and strengthens my weaker base inferences.

Confirmed by the excerpts:

- Base definition lookup directly returns its cached promise, and clearing removes the definition entry along with the other five Maps. Clearing happens before project release is called. The service returns void; the async backend does not await graph cleanup. For the stated later rejection E, backend release can already have fulfilled and does not forward that rejection. (127-base-service.ts:54–65, 125–128, 219–226; 127-base-backend.ts:87–89.)
- Head release synchronously clears the scope before awaiting project release, and the backend awaits the service. Thus the old P association is removed while graph cleanup is pending, and E propagates through the awaited release chain. There is no restoration on rejection in these methods. (127-head-service.ts:129–132; 127-head-scope.ts:21–23, 39–45; 127-head-backend.ts:87–89.)
- Head handles retain their Maps and remain in the scope's list after clearing. getOrCreate can populate the same handle again. Base clearing likewise empties existing Maps rather than replacing them, and definition lookup can set another value. This confirms reuse of base storage without implying that base had the new generic handle API. (127-head-scope.ts:12–32, 35–45; 127-base-service.ts:54–65, 219–226.)
- Both backends invoke beginTurn only after awaited refresh work succeeds. Head passes snapshot.files; base passes the snapshot. A failure before that call leaves the service's prior files assignment and cache entries in place through this path. Earlier source-cache or project-graph work has already been attempted, so full semantic-state rollback is not established. (127-base-backend.ts:79–84; 127-head-backend.ts:79–84; 127-base-service.ts:49–52; 127-head-service.ts:63–66.)

Consequential qualifications: “P is not cancelled” should be read as “the shown cache clearing does not cancel P.” These operations call Map.clear and contain no cancellation mechanism, but the graph-release and underlying query implementations are not supplied. Also, clearing removes the old association; it does not guarantee that a later factory cannot return the same P again. Head getOrCreate returns whatever its factory supplies without wrapping it. (127-head-scope.ts:14–23.)

Still unknown: P's eventual outcome, graph cleanup's independent effects on outstanding work, how an unawaited base graph rejection is handled elsewhere, and mutations made inside the refresh operations. The excerpts support the boundary behavior without establishing complete immutability of the successful semantic turn.

**Case validation — worker-policy construction order**

Learning by layer: the top established parent reparsing for a chunk limit but did not determine construction order or failure channel. I left those unknown. There was no authored descent for this case. Source now determines the head ordering.

At head, the constructor calls DaemonPolicy.fromSerialized before creating the exited promise, before new Worker, and before registering worker listeners. fromSerialized calls the parser synchronously. On the stated invalid-under-parser input, the parse failure escapes construction synchronously: no wrapper is returned and no worker from this construction has been created. The caller receives the thrown exception from the constructor, rather than this failure first entering a worker error listener. (131-head-worker.ts:78–101; 131-head-policy.ts:162–164, 185–194.)

The base comparison is newly visible. The parent constructor does not perform the shown policy parse; it creates a Worker and attaches listeners. The worker-entry constructor performs the parse. Assuming Worker construction succeeds and the invalid policy reaches that entry, a worker can exist and parent construction can return a wrapper before invalid policy is reported. The installed worker error listener invokes failCommunication(error). Whether an entry-construction exception escapes into that event, and how failCommunication reaches a wrapper consumer, are not fully shown. (131-base-worker.ts:77–97; 131-base-entry.ts:40–45.)

Consequential qualifications: this establishes no newly created head worker on this failing construction path, not the absence of unrelated workers. For base, options.workerData is spread after the policy field and can override it in the shown object construction; the actual worker payload must retain the invalid policy for the entry-parse prediction to apply. (131-base-worker.ts:85–90.)

Still unknown: the outer caller's handling of the synchronous head exception, the body of failCommunication, the base entry-construction call site and any surrounding catch, and the exact error for every invalid shape. The supplied head parser explicitly throws “Invalid daemon policy” for its shown record/schema checks, but the exactKeys and validateValues implementations are absent. (131-head-policy.ts:185–194.)

**Case owner — primary owner and inferred fallback**

Learning by layer: my phase 1 predictions followed the top's explicit “first configured owner wins” claim. There was no authored descent for this case. The supplied ownership-building code requires a consequential correction to those predictions.

The loop preserves configured-owner order by pushing each project into the owner array. It also unconditionally sets the primary-project entry on every encounter, so the last processed owner replaces the preceding one. For the supplied A/B ordering at this ownership-building boundary:

| Configuration order | Configured owners of shared.ts | Primary project |
| --- | --- | --- |
| A, then B | [A, B] | B |
| B, then A | [B, A] | A |

This corrects my primary-owner predictions while retaining my owner-array predictions. The overwrite appears in both supplied versions of buildOwnership. (stack-head-graph.ts:328–338; 127-head-graph.ts:328–338.) Primary lookup subsequently reads that stored entry. (stack-head-graph.ts:154–159.)

The inferred fallback needs a qualification. A file present in filesByRelativePath but without a configured ownership entry falls back to inferredProject; projectsFor returns [inferredProject]. A path absent from filesByRelativePath instead returns undefined for primary lookup and [] for all-project lookup. My earlier “unowned file goes to an inferred project” must therefore be limited to a known workspace file. (stack-head-graph.ts:154–166.)

Still unknown: these excerpts do not show FIFO reference discovery, traversal seeding, or how traversal order becomes the configuration array passed to buildOwnership. FIFO remains a top-layer assertion here. Inferred-project construction and the rationale for choosing an owner are also absent. This is an observation about the provided loops and lookups, not a broader verdict on the project.

**Case 23 — authentication and host policy**

Authentication learning by layer: the top supported the six requested credential outcomes. Authored D13 explicitly named execute and the status/result operations and characterized the exceptions as preserved. Source confirms the head request paths and makes their local failure handling more concrete:

- With matching instance and compatible protocol, ping reaches pong without a token check. Correctly shaped stop reaches the graceful-shutdown path without a token check; later draining and acknowledgment waits still affect whether it finishes. (148-head-coordinator.ts:361–398.)
- execute proceeds through admission. An absent or wrong token sets authenticated to false; the first admission guard produces an authentication failure, which becomes a disconnect decision. acceptExecution turns that decision into a thrown Error. Thus it cannot pass the shown admission path with the wrong token. (148-head-coordinator.ts:470–501; 148-head-admission.ts:46–49, 78–93.)
- identify dispatches before the normal protocol check and rejects a mismatched instance or token. terminate and kill dispatch early to terminate, which performs the same two comparisons. This confirms the predicted token failures for all three. (148-head-coordinator.ts:353–365, 401–407, 417–425.)

Newly determined: these failures reject the async handle call through its called methods; the excerpts include distinct identity, termination and execution error messages. The downstream transport response is still unknown. In particular, the decision name disconnect alone does not show the socket-level handling. The status/result token checks listed by descent are directly visible at 148-head-coordinator.ts:369–376.

Consequential qualification: the source packet supplies head authentication excerpts only. My phase 2 statement that base already had these boundaries remains supported by authored D13, not independently checked against base source here. Passing credentials remains separate from successful execution or shutdown.

Policy learning by layer: the top left both omission and its supplier unknown. Authored D04 established that policy is optional but did not identify its supplier. Source confirms policy?: DaemonPolicy and newly answers the supplier question: the client runtime assigns options.policy ?? DaemonPolicy.currentSystem(). An omitted policy therefore comes from DaemonPolicy.currentSystem(), invoked by the runtime. A supplied non-null policy is retained. (148-head-contracts.ts:10–18; 148-head-runtime.ts:85–90.)

Still unknown: currentSystem's implementation, values, environmental inputs and possible failures. The single runtime-loading promise, methods awaiting it, and browser-portability limits were learned from D04; the supplied contract/runtime fragments do not independently establish all of those loading and declaration properties.

**Case 29 — queue clocks and elapsed measurements**

Learning by layer: the top already supported the base/head queue-source comparison. Authored A1 named the head monotonic default and stated that grace periods and idle deadlines remain on wall time. Source confirms the queue wiring and supplies implementation detail and one elapsed-time calculation.

| Queue | Base source shown | Head source shown |
| --- | --- | --- |
| Standalone with omitted time argument | Constructor callback defaults to Date.now | Constructor clock defaults to new NodeDaemonClock; startedAt uses monotonicNowMs |
| Composed by the daemon process | Callback calls this.clock.monotonicNowMs() | The coordinator passes this.clock; the queue calls its monotonicNowMs() |

Evidence: 148-base-queue.ts:35, 71; 148-head-queue.ts:36–38, 74–77; 148-base-coordinator.ts:91–95; 148-head-coordinator.ts:91–94. NodeDaemonClock defaults wallNowMs to Date.now and monotonicNowMs to performance.now() from node:perf_hooks. (148-head-clock.ts:1–26.)

The earlier backward-jump prediction remains: under normally advancing monotonic time, the base standalone queue's clock readings are exposed to a backward wall-clock jump; the head default and both process-composed queue paths use the stated monotonic source. Source does not support extrapolating this into an exact base elapsed value or timeout outcome.

Newly determined: the shown head activity projection computes elapsedMs as Math.max(0, input.nowMonotonicMs - input.queue.active.startedAt), so that projected elapsed value is clamped to zero rather than becoming negative. It is emitted only for a busy lifecycle with an active request. The corresponding base calculation is not supplied. (148-head-activity.ts:107–116.)

Consequential qualifications: the head constructor accepts a clock object, not the old bare time callback; my earlier “no supplied callback” phrasing describes the omitted-argument scenario, not the head API's parameter shape. Also, the source confirms that a wall source remains available, but does not include the grace-period or idle-deadline readers. Their continued use of wall time is learned from authored A1, not independently confirmed by these particular source excerpts. The same limitation applies to the descent's separate worker-clock claim.

Still unknown: calculations for other deadlines, the full effects of a wall-clock jump, the base elapsed-value projection, and the behavior of custom clock implementations. Nothing here establishes that all daemon deadlines migrated to monotonic time.
