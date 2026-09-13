# Reader R1 — phase 3

Fresh agent-reader observation, not a human study. I compared my sealed phase-1 and phase-2 responses with only the supplied source packet. Earlier responses remain unchanged. Citations use the packet's excerpt filenames and original line numbers. This is a comparison of selected excerpts, with no execution or full source audit.

## Case 127

**Learning from the top:** Phase 1 already predicted synchronous clearing before graph cleanup in both versions, reusable cache storage, a newly awaited head release, and preservation of the successful cache turn on refresh failure. No authored descent for this case was supplied in phase 2.

**Confirmed by source:**

- Base release clears the six Maps and then calls project release without returning or awaiting its promise. The async backend likewise does not await that project work. In the stipulated pending-then-rejecting cleanup scenario, cache lookup loses its stored P before cleanup starts, while backend release fulfills independently of the later E. This does not mean a synchronous exception in the service could never reject backend release; the scenario specifies a later rejection. (`127-base-service.ts:125–128, 219–226`; `127-base-backend.ts:87–89`.)
- Head release clears the scope before awaiting project release, and the backend awaits the service. Backend release therefore remains pending with cleanup and rejects with the same E when cleanup rejects: neither shown layer catches or transforms it. This resolves phase 1's uncertainty about forwarding the rejection value in the displayed path. (`127-head-service.ts:129–132`; `127-head-backend.ts:87–89`.)
- Existing definition-query promises are returned directly in both implementations. The head cache uses has/get and stores the factory value without promise wrapping. Clearing only removes Map entries; the scope retains its handle list, and getOrCreate has no released-state guard. Thus the clearing operation itself does not cancel P, and a retained head handle can create entries again. The base clears its existing Maps without replacing them. (`127-base-service.ts:54–65, 219–226`; `127-head-service.ts:68–77`; `127-head-scope.ts:12–23, 27–44`.)
- Both backends call beginTurn only after awaited refresh work succeeds. Base beginTurn takes snapshot.files; head receives files directly. A failure before that call skips the service's file replacement and cache clearing. (`127-base-backend.ts:79–84`; `127-head-backend.ts:79–84`; `127-base-service.ts:49–52`; `127-head-service.ts:63–66`.)

**Consequential qualifications and remaining unknowns:** “Preserves the current successful semantic turn” should be read here as preserving the query service's current files/cache boundary, not a transactional rollback of every underlying semantic dependency. Source-cache refresh and possibly project-graph refresh occur before state.refresh completes; the excerpts do not establish whether those operations or state.refresh can partially mutate state. Phase 1 already noted the absence of rollback, and source makes that limitation concrete. (`127-base-backend.ts:80–83`; `127-head-backend.ts:80–83`.)

The cache-clearing code has no cancellation operation, but the project-release implementation and definition-query internals are not supplied. I cannot independently rule out effects of that other work on P, determine P's eventual result, or locate the base's eventual graph-rejection handler. Removal of the entry also does not prohibit a later factory from returning P again. These are limits on the supplied evidence, not changes to the observed clearing mechanism.

## Case validation

**Learning from the top:** Phase 1 established parent-side reparsing but left construction return, worker creation order, and failure channel unknown. There was no phase-2 descent for this case.

**Newly determined at head:** The constructor calls DaemonPolicy.fromSerialized on configuration.policy at lines 80–82, before creating either its exited promise or the Worker. fromSerialized directly calls the codec; the codec includes synchronous throws, and the constructor has no surrounding catch. Under the stipulated parser-invalid input, construction throws synchronously, returns no wrapper, and creates no worker thread through this constructor. (`131-head-worker.ts:78–101`; `131-head-policy.ts:162–164, 185–194`.)

**Newly determined base/head difference:** The base parent constructor creates the Worker without this parent parse, then registers message/error/exit handlers. Parsing appears in the worker entry's constructor instead. Assuming Worker construction itself succeeds, the intended entry runs, and the invalid policy is actually passed through, the parent can return its wrapper and a worker can already exist before worker-side parsing fails. This is a different failure boundary from the head's synchronous parent-constructor throw. (`131-base-worker.ts:77–97`; `131-base-entry.ts:40–45`.)

The base has a worker error listener that calls failCommunication. An uncaught worker-side parser exception would therefore be expected to take the asynchronous worker-error path. The excerpt does not include the entry's outer invocation/catches or failCommunication, so it does not establish the final application-facing rejection or callback. Nor is the base codec implementation supplied. This channel prediction is conditional on the worker-side parse throwing uncaught. (`131-base-worker.ts:94–96`; `131-base-entry.ts:40–49`.)

**Consequential qualification and remaining unknowns:** The base object spreads options.workerData after its policy field; a supplied policy property there would replace the configuration value delivered to the worker. The option type is not shown. Thus the base comparison assumes no such override. At head, the parent parses configuration.policy before constructing that object, so an override would not bypass this initial failure. (`131-base-worker.ts:85–90`; `131-head-worker.ts:80–82, 89–94`.) Exact validation messages for every invalid shape, worker startup failures unrelated to policy, and downstream communication cleanup remain outside the excerpts. “Defaults hidden” at the top did not convey this construction-order change.

## Case owner

**Learning from the top:** Phase 1 predicted primary A for order A then B, primary B when reversed, ordered owner lists, and inferred fallback. There was no phase-2 descent for this case.

**Corrected by source:** The primary map is set on every encountered membership, with no first-owner guard. For the supplied A-then-B scenario, B overwrites A as primary. Reversing the order makes A primary. The owner array still appends in encounter order, so the arrays remain [A, B] and [B, A], respectively. This corrects my top-based primary-project predictions while confirming the ordered owner-list predictions. (`stack-head-graph.ts:328–335`.) The supplied `127-head-graph.ts:328–335` repeats the same builder behavior at its separate pinned revision.

| Supplied configuration order | Configured owners | Primary from the shown builder |
| --- | --- | --- |
| A, then B | [A, B] | B |
| B, then A | [B, A] | A |

**Confirmed with a qualification:** A file present in filesByRelativePath but lacking a configured-owner entry falls back to the inferred project; projectsFor returns an array containing that inferred project. A path absent from filesByRelativePath instead returns undefined for primary lookup and an empty owner list. My earlier blanket statement about an “unowned file” needs this tracked-file condition. (`stack-head-graph.ts:154–166`.)

**Still unknown:** The supplied source does not show FIFO reference discovery or how the configurations array is produced, so that traversal claim remains learned from the top rather than independently checked here. The last-owner result applies to the stated input order and aligned configured projects; entries without a corresponding project are skipped. Inferred-project creation and the design rationale are also unseen. (`stack-head-graph.ts:319–335`.)

## Case 23

**Learning across layers:** The top left both the command credential matrix and policy optionality unresolved in phase 1. D13 supplied the matrix in phase 2. D04 supplied optional policy but left its default supplier unresolved.

**Authentication confirmed by source:**

- ping passes the common protocol/instance gate and returns before any token check. A correctly shaped stop also passes that gate and reaches the shutdown path without a token check; that path awaits draining and completion acknowledgements. Missing or wrong token therefore does not fail these shown credential checks. (`148-head-coordinator.ts:361–398`.)
- execute passes the common gate, then compares processToken to the coordinator's token in decideAdmission. Authentication is the first admission guard; failure yields a disconnect decision, and acceptExecution throws the execution-instance error. This confirms that missing/wrong token fails before execution acceptance, while supplying details unavailable in D13. (`148-head-coordinator.ts:361–368, 470–501`; `148-head-admission.ts:46–49, 78–92`.)
- identify, terminate, and kill branch before the common protocol gate. The supplied helper guards explicitly reject an instance or token mismatch. This corroborates the phase-2 exceptions and the missing/wrong-token failures. (`148-head-coordinator.ts:357–365, 401–407, 417–425`.)
- execution-status, result-fetch, and result-ack explicitly check processToken after the common gate, confirming the additional phase-2 observation. (`148-head-coordinator.ts:369–392`.)

**Newly determined failure detail:** The execution mismatch produces `Daemon execution request does not match process instance`; identify produces `Daemon identity request does not match process instance`; terminate/kill produce `Daemon termination does not match process instance`. These failures reject the async handle path. A decision named disconnect does not, from these excerpts alone, prove a particular socket-close behavior; the outer server handling is absent. (`148-head-coordinator.ts:353–359, 374–375, 401–407, 417–425, 470–477`.)

**Policy confirmed and newly resolved:** The contract explicitly declares `policy?: DaemonPolicy`. The private runtime supplies the omitted-policy fallback by calling DaemonPolicy.currentSystem(): `this.policy = options.policy ?? DaemonPolicy.currentSystem();`. It then passes the selected policy's startup values to the registry. Thus the provider question left open in phase 2 is now answerable: the client runtime selects the policy, using the supplied object or that factory result. (`148-head-contracts.ts:10–18`; `148-head-runtime.ts:85–90`.)

**Remaining unknowns and qualifications:** Passing credentials still does not imply successful execution, shutdown, or delivery. Token generation, complete successful control helper bodies, outer error transport, and currentSystem's actual policy values/dependencies are not supplied. No base authentication implementation is included, so preservation across revisions remains a descent claim rather than a comparison performed here. The public constructor's one runtime-loading promise and browser-portability discussion also remain learned from D04; these selected source excerpts do not show that wrapper implementation.

## Case 29

**Learning across layers:** Phase 1 could not assign queue defaults or composition callbacks. A1 supplied the four-way comparison in phase 2 and identified remaining wall-time deadlines. Source now corroborates the queue wiring and adds the concrete default implementation and one elapsed-output calculation.

| Queue | Source-supported base input | Source-supported head input |
| --- | --- | --- |
| Standalone, no supplied time dependency | Constructor default Date.now; startedAt reads this.now(). | A new NodeDaemonClock; startedAt reads monotonicNowMs(), whose default source is performance.now(). |
| Process-composed | A callback invoking this.clock.monotonicNowMs(). | The process's clock object passed directly to the queue; startedAt reads its monotonicNowMs(). |

The relevant citations are `148-base-queue.ts:35, 71`; `148-head-queue.ts:36–38, 74–77`; `148-base-coordinator.ts:91–95`; `148-head-coordinator.ts:91–94`; and `148-head-clock.ts:1, 13–26`.

**Confirmed with greater precision:** The base standalone queue's timing input is Date.now-dependent, whereas the process already supplied monotonic time at base. Given the stipulated normally advancing monotonic source, a backward wall-clock jump does not directly affect the selected monotonic inputs of the other three cases. My phase-2 phrase “default changes to monotonicNowMs” was a behavioral shorthand: the actual head constructor takes a clock object, not a replacement bare callback, and defaults that object to NodeDaemonClock. (`148-base-queue.ts:35`; `148-head-queue.ts:36–38`.)

**Newly determined output qualification:** The supplied head activity projector emits `elapsedMs: Math.max(0, input.nowMonotonicMs - input.queue.active.startedAt)` only when lifecycle is busy and an active queue request exists. It clamps the displayed duration to zero, so a negative arithmetic difference does not produce a negative head elapsedMs. Phase 2 had correctly left clamping unresolved; source now resolves it for this particular output. (`148-head-activity.ts:107–116`.)

**Remaining unknowns:** The base elapsed projector is not supplied, so I cannot infer its displayed duration or clamping solely from its wall-clock startedAt. The base NodeDaemonClock implementation is also not shown; source identifies its injected monotonic method, while the concrete performance.now implementation is shown for head. Custom source behavior remains dependent on the supplied clock.

The clock interface and Node default retain both wall and monotonic sources. However, these excerpts do not show grace-period or idle-deadline calculations. My phase-2 statement that those deadlines remain wall-clock-driven is supported by A1's authored descent, not independently confirmed by this source selection. Likewise, A1's worker-owned clock claim is not checked by these excerpts. There is still no basis for generalizing the queue change into a claim that every daemon deadline switches to monotonic time. (`148-head-clock.ts:3–5, 13–26`.)
