# Reader R2 · phase 3

This compares my sealed responses with the supplied pinned excerpts only. I read my phase-one and phase-two files and the source packet; I did not inspect other files or execute the implementation. Source citations below use the excerpt filenames and their original line numbers. Phases one and two remain unchanged.

## Case 127 · Cache and release

**Learning across layers:** The top already supplied the release ordering, reuse, non-cancellation, and failed-refresh predictions. There was no authored descent for this case in my phase-two packet. Source now shows the concrete calls and promise boundaries supporting those predictions.

**Confirmed:** Both versions clear the definition-cache entry before calling project release. Base uses `clearQueryCaches()` and clears the same six Maps; head calls the scope's synchronous clear loop before its first await. Thus pending project cleanup does not prolong the old cache entry's lifetime. See `127-base-service.ts:125–128`, `127-base-service.ts:219–226`, `127-head-service.ts:129–132`, and `127-head-scope.ts:39–44`.

The definition service stores and returns its query promise directly at base; head returns `getOrCreate`, which stores and returns the factory value without wrapping it. Clearing only empties a Map. This supports the earlier prediction that cache clearing itself does not cancel an already returned P. See `127-base-service.ts:54–65`, `127-head-service.ts:68–77`, and `127-head-scope.ts:14–22`.

The base backend's async method neither awaits nor returns the graph promise: its service returns void and discards that promise. Given cleanup that rejects later with E, backend release fulfills independently of that later rejection. At head, the service and backend both await their delegated releases without catching the rejection, so backend release stays pending with cleanup and then rejects with E. See `127-base-backend.ts:87–89`, `127-base-service.ts:125–128`, `127-head-service.ts:129–132`, and `127-head-backend.ts:87–89`.

The same base Maps remain usable after `.clear()`. Head retains each handle in the scope's list and has no sealed/disposed state preventing `getOrCreate` after either clearing boundary. This confirms reuse at the cache layer; it does not guarantee a new semantic query succeeds against a releasing project graph. See `127-base-service.ts:54–65`, `127-base-service.ts:219–226`, and `127-head-scope.ts:9–44`.

**Consequential qualification:** Failed refresh preserves the previous cache turn, not necessarily every underlying semantic input. In both backends, `beginTurn` follows successful `state.refresh`; source-cache work and, for workspace coverage, project-graph refresh occur earlier. The service's files assignment and clearing happen only inside `beginTurn`. This confirms and makes concrete my phase-one rollback qualification. See `127-base-backend.ts:79–84`, `127-head-backend.ts:79–84`, `127-base-service.ts:49–52`, and `127-head-service.ts:63–66`.

**Still unknown:** The excerpts do not show P's eventual settlement, graph cleanup's effects on in-flight work, handling of the detached base rejection elsewhere, or complete effects of a failed refresh. Reuse permits repopulation; clearing does not establish a permanent ban on later cached values.

## Case validation · Parent and worker parsing

**Learning across layers:** The top established parent parsing before Worker creation at head and worker-entry parsing at base. No authored descent covered this case. Source confirms that distinction and identifies an installed worker-error path.

**Confirmed:** Head parses `options.configuration.policy` at lines 80–82, before constructing the `exited` promise and before `new Worker` at line 86. A parser exception propagates synchronously out of this constructor, so it returns no wrapper and does not reach that worker-spawn operation. `fromSerialized` directly invokes the codec; some invalid cases explicitly throw `Error("Invalid daemon policy")`. See `131-head-worker.ts:78–86` and `131-head-policy.ts:162–164,185–194`.

Base has no corresponding parent parse in the shown constructor. It creates a Worker, attaches listeners, and reaches the end of construction without awaiting worker validation. The shown worker-entry constructor parses `data.policy`. Thus the earlier prediction of a returned wrapper, assuming worker creation and listener setup succeed, is supported more directly. A worker already exists when validation executes in that entry. See `131-base-worker.ts:77–97` and `131-base-entry.ts:40–45`.

**Newly determined:** The parent installs `once("error", ... failCommunication(error))` and a separate exit handler. If the policy exception escapes worker-entry execution as a worker error, this is the installed parent-side handling path. The excerpts do not show outer entry error handling or `failCommunication`, so they still do not establish the final caller-facing promise/event affected. See `131-base-worker.ts:94–96`.

**Consequential qualification:** My base prediction assumes the invalid policy actually reaches the shown worker entry. Both parent constructors spread `options.workerData` after their explicit `policy` property, and both permit an alternate `entryUrl`. A runtime `policy` property in that spread could replace the worker's payload; its allowed type is not supplied. Head nevertheless parses `options.configuration.policy` before building the payload. Parent-validated policy and worker-received policy therefore cannot be assumed identical for every possible override from these excerpts alone. See `131-base-worker.ts:82–90` and `131-head-worker.ts:80–94`.

**Still unknown:** The full parser's accepted inputs and all error messages, worker cleanup, downstream caller failure delivery at base, and head worker-entry validation are not fully shown. Head also assigns `generation` before parsing; “parse first” describes ordering relative to worker creation, not an assertion that no constructor work precedes parsing (`131-head-worker.ts:79–80`).

## Case owner · Primary and complete ownership

**Learning across layers:** The top supplied last-owner selection, FIFO discovery, and inferred fallback. There was no authored descent for this case. Source confirms selection for the supplied order and newly shows storage and lookup details.

**Confirmed and newly determined:** With aligned configuration/project entries A then B, both claiming a tracked shared.ts once, the primary is B and the stored owners array is `[A, B]`. Reversing the entries produces primary A and owners `[B, A]`. The loop appends each project and overwrites the primary-map value for every claim. This resolves my earlier uncertainty about whether all owners are retained and in what order. Both supplied versions of `buildOwnership` show this operation. See `stack-head-graph.ts:328–335` and `127-head-graph.ts:328–335`.

The protected `projectsFor` method returns the stored owners array. For a known workspace file with no configured ownership, it returns an array containing the state's inferred project, while `primaryProjectFor` returns that same inferred-project field. Thus the fallback shown uses one state-held inferred project across such lookups; its construction and lifetime remain unknown. See `stack-head-graph.ts:154–165`.

**Consequential correction of scope:** My phase-one “an unowned file goes to an inferred project” needs the condition that the path exists in `filesByRelativePath`. An absent path returns `undefined` from primary lookup and `[]` from all-project lookup, rather than receiving the inferred fallback. See `stack-head-graph.ts:155–156,163–165`.

**Still unknown:** These excerpts consume a configuration array; they do not show FIFO discovery itself. They also do not establish upstream array alignment or duplicate suppression. The loop skips a missing configured project and appends without a local deduplication check (`stack-head-graph.ts:328–335`). The source supports these routines at the supplied heads, not a complete historical preservation claim.

## Case 23 · Authentication and host policy

**Learning across layers:** The top left the credential matrix and policy optionality unknown. D13 supplied the command-specific matrix; D04 supplied optional policy but left its provider unknown. Source supports the head matrix and identifies the policy fallback.

**Authentication confirmed:** With valid configured credentials, matching instance, and compatible protocol where applicable, absent or wrong tokens do not block ping or stop, but fail execute, identify, terminate, and kill. The source shows why:

- Normal handling checks protocol and then instance before ping or execute dispatch. Ping returns before token checking; the stop path reaches graceful shutdown without a token comparison. See `148-head-coordinator.ts:361–398`.
- execute computes token equality in admission. An unauthenticated context reaches the first admission guard, produces an internal `disconnect` decision, and causes `acceptExecution` to throw. See `148-head-coordinator.ts:474–476,488–500` and `148-head-admission.ts:46–48,78–92`.
- identify and terminate/kill branch before normal protocol validation. Their checks compare instance first and token second using short-circuit OR. This resolves phase two's remaining ordering uncertainty within those branches. See `148-head-coordinator.ts:357–365,401–407,417–425`.

**Newly determined failure detail:** The identity, termination, and execution paths have distinct explicit error messages in those cited excerpts. The async handler exposes failure as a rejected promise at that internal boundary. An admission decision named `disconnect` does not, without the server/transport code, prove exactly how the external caller observes it or whether a socket is closed. Passing credentials still does not promise completion: the shown stop path awaits request drain and delivery acknowledgements before returning (`148-head-coordinator.ts:394–398`).

**Qualification:** Token checking is strict equality against `coordinates.processToken`, not a separate presence check. My absent-token prediction assumes that configured token is valid and present. The coordinate-validation body is not supplied. Also, these authentication excerpts are head package code; the exact base matrix and its preservation remain authored-description claims rather than a source comparison established here.

**Policy confirmed and newly determined:** `policy?: DaemonPolicy` confirms that the host can omit policy. The runtime supplies the fallback with `options.policy ?? DaemonPolicy.currentSystem()` in its constructor. This answers the provider question that remained unknown after D04. See `148-head-contracts.ts:10–18` and `148-head-runtime.ts:85–90`.

**Still unknown:** `currentSystem()` internals and resulting defaults are not supplied. The source establishes fallback timing inside runtime construction, not the complete public constructor/loading sequence. D04's shared loading promise and portability claims were learned from descent and are not independently checked by these particular excerpts. The reasons for different authentication sets also remain outside what this code establishes.

## Case 29 · Queue clocks

**Learning across layers:** The top did not assign clocks to the requested queues. A1 supplied the standalone default change and the already-monotonic process composition. Source now gives the actual constructor dependencies and one elapsed-output formula.

| Queue | Source-supported base behavior | Source-supported head behavior |
| --- | --- | --- |
| Standalone, no override | Constructor captures `Date.now`; active `startedAt` uses `this.now()` (`148-base-queue.ts:35,71`). | Defaults to `new NodeDaemonClock()` and records `clock.monotonicNowMs()` (`148-head-queue.ts:36–38,74–77`). That default method delegates to `performance.now()` (`148-head-clock.ts:1,13–26`). |
| Process-composed | Passes a callback invoking the coordinator clock's `monotonicNowMs()` (`148-base-coordinator.ts:91–95`). | Passes `options.clock` as the clock object (`148-head-coordinator.ts:91–94`). The queue calls its monotonic method. |

This supports A1's clock assignment. The base clock provider's implementation is not included, but its monotonic-method wiring is shown.

**Backward-jump qualification:** The base standalone queue's recorded timestamp uses wall time, so elapsed subtraction using subsequent wall readings is exposed to a backward jump. Head standalone timing and both composed monotonic paths are not exposed under the task's assumption that their monotonic source advances normally. However, the source packet does not supply the base elapsed-output calculation. I cannot turn my earlier conditional statement about negative or undercounted elapsed values into a claim about a particular base reported result.

**Newly determined:** The shown head activity projection reports `Math.max(0, input.nowMonotonicMs - input.queue.active.startedAt)` and only supplies this current activity when busy with an active request. This resolves phase two's clamping uncertainty for that output: it does not report a negative elapsed value. The excerpt does not independently show the origin of `input.nowMonotonicMs`. See `148-head-activity.ts:107–116`.

**Consequential interface qualification:** “No supplied callback” is suitable shorthand for the comparison, but the head constructor actually accepts an object with `monotonicNowMs`, not the base function callback. A standalone consumer overriding time must account for that shape change. See `148-base-queue.ts:35` and `148-head-queue.ts:36–38`.

**Deadlines and remaining unknowns:** Source confirms that the head clock still exposes both clock domains and defaults its wall source to `Date.now` (`148-head-clock.ts:3–26`). It does not include grace-period or idle-deadline calculations. Therefore A1's specific claim that those deadlines remain wall-based is still learned from authored descent, not independently source-confirmed here. No universal deadline conversion follows from this packet. Worker clock composition, deadline behavior after jumps, and complete base elapsed reporting also remain outside the supplied excerpts.
