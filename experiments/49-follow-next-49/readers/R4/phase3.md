# R4 · phase 3

Fresh agent-reader observation. I compared only my sealed phase-1/phase-2 responses with the supplied source packet. Both earlier files remain unchanged. Citations below use the packet's excerpt filenames and original line numbers. This is a comparison of selected excerpts, with no execution, full source audit, or correctness verdict on symnav.

## Case 127 · cache and release

**Learning from the top.** Phase 1 already predicted synchronous clearing before graph release at both revisions, reusable cache storage, an awaited release barrier only at head, and preservation of the cache turn when refresh fails. No authored descent for this case was supplied in phase 2.

**Confirmed by source.** Base service release clears the six Maps and then calls graph release without returning or awaiting its promise (`127-base-service.ts`, L125–128, L219–226). Base backend release calls that synchronous service method without awaiting anything (`127-base-backend.ts`, L87–89). For the scenario's later asynchronous graph rejection E, the backend promise fulfills after the synchronous service call returns; E is not adopted by it.

Head service release clears the scope before awaiting graph release, and the backend awaits the service (`127-head-service.ts`, L129–132; `127-head-backend.ts`, L87–89). With graph cleanup pending, backend release remains pending; when cleanup rejects with E, these awaits propagate the same rejection reason without a shown catch or replacement. Clearing has already happened.

Definition-query identity is visible at both revisions: base stores and returns the factory promise directly, and head returns its handle's getOrCreate result directly (`127-base-service.ts`, L54–65; `127-head-service.ts`, L68–77). The head handle returns the stored value or stores and returns the factory value without wrapping it (`127-head-scope.ts`, L14–18). Thus the association that supplied P disappears at the clearing step, not when cleanup settles. A subsequent lookup can create a value again.

The base clearing code calls Map.clear without replacing the Maps; head clear empties each handle's Map while retaining the scope's handle list (`127-base-service.ts`, L219–226; `127-head-scope.ts`, L21–23, L27–44). This strengthens my earlier base-reuse inference and confirms head handle reuse through the shown cache API. There is no released-state gate in getOrCreate.

Both refresh implementations call beginTurn only after awaited refresh work succeeds. beginTurn changes the service's file list and clears its caches (`127-base-backend.ts`, L79–84; `127-head-backend.ts`, L79–84; `127-base-service.ts`, L49–52; `127-head-service.ts`, L63–66). The head call now passes snapshot.files explicitly.

**Newly determined or consequential qualification.** The scope implementation also shows why an undefined value remains cached, a synchronous factory throw is retried, and a rejected promise remains cached until clearing: has/get precedes factory invocation, and set occurs only after the factory returns (`127-head-scope.ts`, L14–18). Those mechanics were described at the top and now have direct local support.

My noncancellation prediction must stay scoped to the clearing operation: the shown code removes associations and makes no cancellation call. The graph-release implementation and query internals are absent, so these excerpts cannot establish that release as a whole has no other effect on P. P's eventual outcome remains unknown. Likewise, reusable storage does not guarantee a later semantic query succeeds against a released graph.

Failed refresh preserves the service's existing file list/cache turn through the shown boundary, not necessarily all semantic state. Source now identifies earlier work: sourceCache.refresh runs first, followed by projectGraph.refresh for workspace coverage, before state.refresh and beginTurn (`127-base-backend.ts` and `127-head-backend.ts`, L79–83). Those implementations are absent, so rollback and other state effects remain unknown. The base graph-rejection reporting channel and any possible later reinsertion of P also remain undetermined.

## Case validation · malformed worker policy

**Learning from the top.** Phase 1 established the parent-before-worker ordering at head and predicted a synchronous construction exception there. My expectation that base returns a wrapper was qualified rather than guaranteed. No authored descent for this case was supplied.

**Confirmed by source.** Base parent construction creates Worker without parsing configuration.policy, passes the policy in workerData, and installs listeners (`131-base-worker.ts`, L77–97). The base worker-entry constructor parses data.policy (`131-base-entry.ts`, L40–45). For an otherwise constructible worker receiving the invalid policy, this supports a returned parent wrapper and a later worker-side validation failure rather than that parser exception being thrown synchronously by the parent constructor.

At head, DaemonPolicy.fromSerialized(configuration.policy) runs at L80–82, before even constructing the exited promise at L83 and before new Worker at L86 (`131-head-worker.ts`, L78–101). fromSerialized synchronously calls the codec; shown invalid-record and schema checks throw Error("Invalid daemon policy") (`131-head-policy.ts`, L162–164, L185–194). A configuration policy rejected there prevents this constructor from returning a wrapper or spawning its worker, and reaches the constructor caller as a synchronous exception.

**Newly determined.** The base wrapper registers a worker error listener that calls failCommunication(error), so part of the asynchronous error route is now visible (`131-base-worker.ts`, L95). Its eventual delivery to the wrapper's consumer is still unknown because failCommunication is not included. The source supplies an error type/message for specific parser failures; exactKeys and validateValues are not included, so I cannot assign that same message to every invalid snapshot.

**Consequential qualification.** Both constructors spread options.workerData after the policy field (`131-base-worker.ts`, L85–90; `131-head-worker.ts`, L89–94). An override can therefore change the actual policy sent to the worker. The base prediction assumes the worker actually receives the invalid snapshot; an invalid configuration policy could be overwritten before worker parsing. Head still rejects an invalid configuration policy before that spread or worker creation, even if an override would have supplied a valid policy. Conversely, validating configuration.policy does not by itself prove that an overridden workerData.policy is valid.

The entry URL is also configurable (`131-base-worker.ts`, L83; `131-head-worker.ts`, L87), and Worker construction itself may fail independently. Therefore parser-invalid input alone does not guarantee a successful base constructor or a particular worker execution. The supplied default-entry excerpt is base only: the top's claim that worker-startup validation also remains at head is not independently established by a head entry excerpt here. Cleanup behavior and the final caller-facing worker-error channel remain unknown.

## Case owner · primary and all owners

**Learning from the top.** Phase 1 predicted primary B for A-then-B and primary A for B-then-A, with both configured owners retained and an inferred fallback. The owner array's order and representation remained unknown. There was no authored descent for this case.

**Confirmed and newly determined by source.** buildOwnership iterates configuration entries in input order, obtains the correspondingly indexed project, pushes it into the file's owner array, and overwrites the primary entry (`stack-head-graph.ts`, L328–335). The same builder is supplied at `127-head-graph.ts`, L328–335.

For the stated two projects and one membership per project, A-then-B therefore produces owner array [A, B] and primary B; reversing the order produces [B, A] and primary A. The array representation and append order are new source learning. My earlier {A, B} set-level prediction was less specific. The code does not deduplicate pushes, and skips a configuration with no project at its corresponding index (`stack-head-graph.ts`, L329–334).

**Consequential qualification.** The inferred fallback applies to a file present in filesByRelativePath. For such an unowned file, primaryProjectFor returns the state's inferredProject and projectsFor returns [inferredProject]. For an absent path, they instead return undefined and [] (`stack-head-graph.ts`, L154–166). My earlier phrase “an unowned file goes to an inferred project” needs this workspace-membership condition.

**Still unknown.** These excerpts show ordered ownership construction, not the discovery queue. FIFO configuration discovery remains learned from the top, without independent source confirmation here. Initial configuration ordering, membership computation, inferred-project construction and its wider lifetime are not supplied. The two matching builder excerpts do not establish preservation across every revision or discovery path.

## Case 23 · authentication and host policy

**Learning across layers.** The top supported the token distinctions, with execute's classification an inference in my phase 1. D13 explicitly named execute and the three result/status requests and clarified the earlier special branch. D04 first made policy omission answerable, while leaving the supplier unknown. Source now gives concrete branch order, local failure behavior and the fallback supplier.

**Authentication confirmed and refined.** In handle, identify and terminate/kill return through their special methods before the ordinary protocol/instance guard (`148-head-coordinator.ts`, L353–366). This directly resolves the question of whether that ordinary guard runs for those requests: it does not. Their shown credential checks compare instance and token (`148-head-coordinator.ts`, L401–407, L417–425). The remaining bodies of those special methods are omitted; this finding is about bypassing the ordinary guard, not every possible later operation.

Ping returns after the ordinary protocol/instance guard and before any token test. The stop path reaches graceful shutdown without entering the token-protected execution/status/result branches (`148-head-coordinator.ts`, L361–398). Thus, for the task's otherwise matching requests, absent/wrong tokens do not block ping or stop on the shown credential checks. Stop subsequently waits for accepted work and completion acknowledgements; credential admission alone does not mean an immediate stopped response (L394–398).

Execute reaches acceptExecution only after the ordinary guard. decideAdmission compares the token by strict equality, the first admission guard identifies failed authentication, and decide returns a disconnect decision. acceptExecution then throws Error("Daemon execution request does not match process instance") (`148-head-coordinator.ts`, L368, L470–499; `148-head-admission.ts`, L46–49, L78–92). This confirms denial for an absent/wrong token and newly distinguishes its local failure from the controlled rejection response used for other admission decisions.

Identify and terminate/kill have their own shown Error messages for credential mismatch (`148-head-coordinator.ts`, L406, L424). Since handle is async, these failures surface as rejection of its returned promise. The transport's handling of that rejection is absent; the internal decision name “disconnect” alone does not demonstrate a network disconnection in these excerpts. The status/fetch/ack token checks named by D13 are also directly visible at L369–376.

**Policy newly resolved.** The optional contract is explicit at `148-head-contracts.ts`, L17. The runtime chooses `options.policy ?? DaemonPolicy.currentSystem()` in its constructor (`148-head-runtime.ts`, L85–90). Thus a host may omit policy; the client runtime supplies the fallback by calling DaemonPolicy.currentSystem. A supplied policy is selected instead. This supplier was not determined by either the top or D04.

**Remaining limits.** currentSystem's values and behavior are not included. The shown constructor is the runtime's constructor; D04's dynamic-loading promise and browser-portability explanation are not independently checked by a supplied facade implementation or dependency graph. No base authentication handler or the mentioned tests are supplied, so source here confirms the shown head paths rather than independently establishing historical preservation or test coverage. Passing credentials still leaves operational success and wire-level failure delivery undetermined.

## Case 29 · queue clocks

**Learning across layers.** The top already supplied the four-way clock comparison. A1 added named clock ownership and the claim that grace periods and idle deadlines remain wall-clock-driven. Source confirms the queue defaults and composition, identifies the concrete head clock implementation, and supplies one elapsed-time projection.

**Confirmed by source.** Base standalone construction captures a Date.now callback and uses it for active-request startedAt (`148-base-queue.ts`, L35, L64–78). Head standalone construction defaults to new NodeDaemonClock and calls its monotonicNowMs method for startedAt (`148-head-queue.ts`, L36–38, L74–77). NodeDaemonClock defaults wallNowMs to Date.now and monotonicNowMs to performance.now from node:perf_hooks (`148-head-clock.ts`, L1, L13–26).

The process already injected its monotonic callback at base and supplies its clock object at head (`148-base-coordinator.ts`, L91–95; `148-head-coordinator.ts`, L91–94). Thus the original comparison holds at the stated clock-source level: only the base standalone queue uses wall time for the shown start measurement. Under normally advancing monotonic sources, the others are not exposed to a Date.now jump through that measurement.

**Newly determined and corrected detail.** Head accepts a clock object with monotonicNowMs, not a bare replacement callback (`148-head-queue.ts`, L36–38). My phase-2 reference to a “named standalone callback” was imprecise; the interface change matters to a caller injecting time. Process composition likewise changes from a callback wrapper to passing the clock object.

The head activity projection computes elapsedMs as Math.max(0, input.nowMonotonicMs - input.queue.active.startedAt), and only produces current activity when busy with an active request (`148-head-activity.ts`, L107–116). This resolves the previously unknown formula and lower-bound clamping for that projection, and the default monotonic implementation is now concrete.

**Consequential qualification and remaining limits.** My earlier suggestion that a backward wall jump could postpone a queue elapsed-time threshold was conditional. These excerpts show start-time sampling and one head display/projection calculation, not a queue expiration calculation or a base elapsed-time consumer. They do not establish a particular base displayed value, negative elapsed output, or changed deadline. The head projection also requires a compatible monotonic input; its producer is not included.

The clock interface retains both sources, so nothing here establishes a universal switch of daemon deadlines to monotonic time. A1's specific claims about wall-driven grace/idle deadlines and a worker-owned NodeDaemonClock remain learning from authored descent: their consuming implementations are not supplied in this source packet. Custom clock behavior, base projection arithmetic, deadline scheduling and worker-clock wiring remain outside this comparison.
