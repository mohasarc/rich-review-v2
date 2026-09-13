Fresh agent-reader observation: R3, phase 2. I read my sealed phase 1 response and the assigned descent packet only. Phase 1 is unchanged. These are predictions from authored explanations, not source verification.

**D13 — authentication**

Prediction now possible: for correctly shaped requests with matching instance and compatible protocol where applicable, ping and stop pass the described credential checks with an absent or wrong token. execute fails its token check. identify, terminate and kill also fail their token checks on their earlier branch. Passing credentials still does not establish command success. The explanation characterizes these distinctions as existing at base and retained at head.

The phase 1 top already supported these six outcomes and the early special branch. Descent removes my need to infer that execute belongs to “other normal requests”: it names execute explicitly. It also identifies execution-status, result-fetch and result-ack as token-checked operations.

Exact new wording: “Normal requests check protocol and instance first”; “execute, execution-status, result-fetch and result-ack also check the token”; “ping/stop require protocol and instance only”; “identify/terminate/kill branch earlier and check instance plus token.”

Remaining unknowns: precise failure results and delivery channels, implementation details, and why these actions use different credential sets. The explanation explicitly says no reason for the differences was found; its preservation rationale does not answer that design question.

Actionable addition: credential checks for status and result retrieval/acknowledgment can now be included in a focused review or test plan. The destination says new tests pin ordering and exceptions, but I have not seen those tests and cannot treat that as verification.

**D04 — host policy**

Prediction now possible: the host can omit policy when constructing DaemonClient, because the option is explicitly optional. Who supplies policy, and what behavior results when it is omitted, remain unknown. Optionality alone does not identify a default value, resolver, or owner.

The phase 1 top did not establish optionality or the supplier; I left both unknown. Descent resolves only the first question.

Exact new wording: “Options carry state directory, version, enabled flag, executor factory, module URL, readiness probe and optional policy.”

Remaining unknowns: the policy default and its source, whether omission triggers a resolver or another mechanism, and any policy-validation behavior. These cannot be inferred from dynamic runtime loading.

Actionable addition: “Construction starts one runtime-loading promise; methods await it.” This gives a concrete initialization boundary for host integration. Also, “this does not make actual execution browser-portable” prevents treating Node-free declarations as a browser-execution guarantee. The phase 1 response already recorded runtime loading at construction, but the single promise and method dependency are more specific here.

**A1 — clock default**

Prediction now possible: a standalone queue without a supplied callback uses Date.now at base and monotonicNowMs at head. A process-composed queue uses injected monotonic time at both versions. With a backward Date.now jump and normally advancing monotonic time, the base standalone queue's elapsed measurement is exposed; the other three queue/version combinations are not directly exposed through their stated elapsed-time sources.

The phase 1 top already supported that comparison. Descent names the new default and directly explains which other timing uses remain on wall time, resolving part of my earlier uncertainty about other deadlines.

Exact new wording: “The queue’s standalone default changes from Date.now to monotonicNowMs”; “Wall time still drives absolute timestamps, grace periods and idle deadlines; elapsed queue and worker measurements use monotonic time.”

The passage therefore does not describe all daemon deadlines switching to monotonic time. Grace periods and idle deadlines explicitly remain on wall time. I cannot derive an exact timeout effect from a particular clock jump without the calculation and scheduling behavior.

Remaining unknowns: monotonicNowMs's implementation, elapsed-time arithmetic or clamping, exact deadline calculations, and complete coverage of all daemon timers. Named source locations are pointers, not evidence I have inspected.

Actionable addition: “Worker timing uses its own NodeDaemonClock.” A test setup that substitutes the coordinator's clock must account for this separate worker clock; the explanation does not establish that replacing the coordinator clock controls worker timing. The coordinator's required DaemonClock and its distribution to lifetime, ledger, queue and resource owners also make the composition contract more concrete.

All three destinations remain unverified explanations. Added specificity changes what I can predict from the text; it does not establish that the implementation follows it.
