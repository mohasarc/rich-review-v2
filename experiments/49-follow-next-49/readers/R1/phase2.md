# Reader R1 — phase 2

Fresh agent-reader observation, not a human study. I read only my sealed phase-1 response and the assigned descent packet in this phase. Phase 1 is unchanged. These are predictions from explanations, not source verification.

## D13 — authentication

**Prediction now possible:** With correctly shaped requests and the stipulated matching instance and compatible protocol, the head's credential outcomes are:

| Command | Required credentials | Token absent or wrong |
| --- | --- | --- |
| ping | Protocol and instance | Passes these credential checks; token is not required. |
| stop | Protocol and instance | Passes these credential checks; token is not required. |
| execute | Protocol, instance, and token | Fails the required token check. |
| identify | Instance and token, on an earlier branch | Fails the required token check. |
| terminate | Instance and token, on an earlier branch | Fails the required token check. |
| kill | Instance and token, on an earlier branch | Fails the required token check. |

Normal requests perform protocol/instance checks before the additional execution-token check. The earlier identify/terminate/kill branch uses instance and token rather than the normal protocol-bearing path. Passing these checks does not establish command success.

**Was this already supported at the top?** No. My phase-1 response could identify differentiated paths and exceptions, but could not assign credential sets to commands or distinguish their missing/wrong-token outcomes. This destination resolves that mapping. The base paragraph supports continuity of the distinction; the explicit command matrix is presented under the head.

**Exact new wording:** “Normal requests check protocol and instance first.” “execute, execution-status, result-fetch and result-ack also check the token; ping/stop require protocol and instance only.” “identify/terminate/kill branch earlier and check instance plus token.”

**Remaining unknowns:** Exact failure responses, error transport, token derivation, downstream command effects, and the detailed ordering of checks within each stated credential group remain unspecified. The destination reports preservation and tests, but I have not verified either in source. It explicitly supplies no recorded rationale for these different credential sets.

**Other actionable surprise:** stop belongs with token-free ping, while terminate and kill require a token. A caller or test must distinguish these control operations. The same destination also extends the execution-token requirement to execution-status, result-fetch, and result-ack; checking execute alone would leave the described result lifecycle uncovered.

## D04 — host policy

**Prediction now possible:** A host may omit the policy option when constructing DaemonClient. The explanation still does not identify who supplies policy when it is omitted. I cannot turn “optional” into a claim that DaemonClient itself constructs a default policy.

**Was this already supported at the top?** No for policy optionality or its supplier. My phase-1 response left both open. The top already supported the broader facts that public host types are Node-free and runtime loading happens at construction.

**Exact new wording:** “Options carry state directory, version, enabled flag, executor factory, module URL, readiness probe and optional policy.” The newly explicit initialization behavior is: “Construction starts one runtime-loading promise; methods await it.”

**Remaining unknowns:** The omitted-policy provider, default values, how those values reach consumers, and whether omission has operation-specific consequences are not described. The excerpt also does not specify how runtime-loading failures surface. Optionality is an explanation claim about the API, not a source-verified constructor contract.

**Other actionable surprise:** There is one construction-started runtime-loading promise shared by methods that await it. A host must therefore account for asynchronous runtime readiness even though it has already obtained the client object. Also, Node-free declarations are not evidence of a browser-capable implementation: the destination explicitly says, “this does not make actual execution browser-portable.”

## A1 — clock default

**Prediction now possible:**

| Queue | Base elapsed-time source | Head elapsed-time source |
| --- | --- | --- |
| Standalone, no supplied callback | Date.now | monotonicNowMs |
| Composed by the daemon process | Supplied monotonic time | Monotonic time supplied through the daemon's clock composition |

For the specified backward Date.now jump with normally advancing monotonic time, the **base standalone queue's elapsed-time input is exposed**. The base process-composed queue and both head queues use monotonic elapsed-time sources and are not exposed to that wall-clock jump through those measurements. The passage does not show enough arithmetic to predict an exact reported value or guarantee that a negative duration is emitted.

All daemon deadlines do **not** follow a universal monotonic conversion in this explanation: wall time explicitly remains responsible for grace periods and idle deadlines, as well as absolute timestamps.

**Was this already supported at the top?** The exact four-cell comparison was not. Phase 1 could infer daemon ownership of time inputs, but left queue defaults and wiring unknown. Its refusal to infer that all deadlines became monotonic was already supported; this destination supplies the positive wall-time assignments that make the boundary explicit.

**Exact new wording:** “The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR.” “Wall time still drives absolute timestamps, grace periods and idle deadlines; elapsed queue and worker measurements use monotonic time.” The wiring claim is: “The coordinator now requires a DaemonClock and passes it into lifetime, ledger, queue and resource owners.”

**Remaining unknowns:** The concrete implementation of monotonicNowMs, the exact base injected callback, elapsed-time arithmetic or clamping, and detailed deadline behavior under a clock jump remain unseen. The destination lists source references, but I did not follow them. Its claim that behavior is to be preserved does not independently establish implementation equivalence.

**Other actionable surprise:** The standalone default changes despite the broader preservation framing; the daemon-composed queue was already monotonic. Tests using only process composition could miss that standalone change. Worker timing also uses “its own NodeDaemonClock,” so replacing the coordinator's clock alone does not establish control over worker timing. Wall-clock deadline tests need separate expectations from monotonic queue-duration tests.
