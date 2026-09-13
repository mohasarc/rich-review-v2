# R4 · phase 1

Fresh agent-reader observation, not a human study. I read only the prescribed packet. The predictions below are conditional on its explanations being accurate; I have not checked source or followed links. “Supported” identifies what the text licenses, not verified implementation behavior.

## Case 127

**Predictions**

- **Base, cache lookup:** The stored entry for P is removed during the service's clearing step, before it starts project release. A lookup then has no retained P to return; it does not wait for cleanup to finish. This is supported by “service clears Maps → starts project release” and “Six Maps and a manual clearing list.” A later query could populate the cleared cache again.
- **Head, cache lookup:** The stored entry for P is cleared synchronously during release, before graph cleanup settles. Supported by “Release clears first, then waits and propagates project failure” and “Scope clearing is synchronous.” The later rejection E does not undo the described clearing.
- **Cancellation:** At head, clearing does not cancel P or work already holding it: “Clearing does not cancel work already holding a promise.” At base, I also predict no cancellation from the described Map clearing, but this is an inference: the explicit noncancellation sentence is in the head description. The text gives no separate base cancellation contract.
- **Reuse:** At head, the same handle remains usable after release, including while cleanup is pending or after rejection. Supported by “without disposal, sealing, or cancellation” and “A caller can keep using a handle after either boundary.” At base, there is no described generic handle API; the equivalent cache storage appears reusable because “Six fixed Maps remain attached to the service.” That base reuse prediction is an inference from retained Maps.
- **Base, backend release:** It does not wait for graph cleanup. In the stated scenario, and absent another failure, its promise can resolve while graph cleanup is still pending; the later E is not propagated through an awaited graph-release dependency. Supported by “Service release returns void and starts project release without waiting; backend returns Promise<void> without awaiting the graph.”
- **Head, backend release:** Its promise remains pending with graph cleanup, then rejects with the graph's rejection E. Supported by “Service and backend await graph release; rejection reaches the backend caller.”
- **Failed refresh, both versions:** Failed refresh does not clear the current successful turn's cached semantics or start a new cache turn. Supported by “Clear only after state.refresh resolves” and “Same ordering.” This does not mean all refresh effects are rolled back: “Earlier refresh work is not rolled back by this cache change.”

**What the text cannot determine**

It does not determine whether P ultimately fulfills or rejects, when P settles, the base graph-rejection reporting channel, or the exact microtask timing of release settlement. It does not specify whether a later factory might independently return P again; clearing removes the cached association, not all possible ways to obtain the same promise. It also does not fully describe state changes performed before refresh fails. Base reuse and noncancellation have less direct support than their head counterparts.

**Uncertainty about explanation truth**

The diagram is expressly compressed, and no implementation was available to me. I cannot verify that all call paths obey the stated order or that rejection E is forwarded unchanged. The packet predicts that forwarding, but it remains an unverified explanation. “UNEXPLAINED” for handle retention concerns its rationale, not proof that the behavior is absent.

## Case validation

**Predictions**

- **Base:** The invalid snapshot reaches parsing in an already started worker. Thus a worker thread can exist when validation fails; indeed, the described validation runs in that worker. Exact support: “Parent starts the worker with the serialized policy; the worker entry parses it.” I expect the parent constructor to return a wrapper rather than synchronously throw that worker parser's error, but this is an inference from the separation of construction and worker parsing, not an explicit constructor guarantee. The failure originates through worker startup; the passage does not identify how the wrapper delivers it to its caller.
- **Head:** For the invalid snapshot rejected by the parser, parent construction throws synchronously and returns no wrapper. That construction attempt has not yet spawned its worker. Exact support: “NodeDaemonNavigationWorker first calls DaemonPolicy.fromSerialized to obtain maximumChunkRawBytes, then creates Worker” and “An invalid serialized snapshot can now throw synchronously before a thread is spawned.” The caller receives a synchronous construction exception.

**Ordering and unknowns**

Base establishes worker start before worker-entry parsing. Head establishes parent parsing before Worker creation. The passage frames worker-startup validation as remaining in scope, but does not show its full implementation. It does not identify the exception type or message, whether a base caller observes an event or a rejected promise, whether construction has other failure paths, or how a failed worker is cleaned up. It does not prove that base construction always returns successfully. “No worker spawned” at head refers to this construction attempt, not other workers already in the process.

**Uncertainty about explanation truth**

I have not verified that the constructor actually invokes the parser before every worker creation path. The claims about ordering and synchronous failure are explicit but unverified. The missing reason for the change does not establish whether the reported behavior is correct.

## Case owner

**Predictions**

- With visits A then B and both claiming shared.ts, **B is primary**. Exact support: “last configured owner as the primary project.” The given visitation order is consistent with “Keep FIFO configuration discovery.”
- **Both A and B are configured owners.** Their ownership is stipulated in the task; the passage selects a “primary project” from configured owners rather than saying that the primary is the only owner. Retaining both is a supported inference, although no owner-collection API is described.
- With visits B then A, **A is primary**. The same “last configured owner” rule applies. Both remain owners under the task's premise.
- An unowned file goes to **an inferred project**, directly supported by “an inferred project for unowned files.”

**What the text cannot determine**

It does not give the enumeration order or representation of all configured owners, the number or scope of inferred projects, or how ownership is computed. FIFO discovery does not by itself specify how initial configurations are enqueued. I can predict the owner set {A, B}, but not a returned array order.

**Uncertainty about explanation truth**

This is a compact preservation claim with no evidence in the supplied passage. I cannot verify that the implementation retains all owners or applies the stated primary-selection rule. “unexplained” supplies no rationale and is not a correctness verdict.

## Case 23

**Credential predictions**

All predictions assume the correctly shaped requests, matching instance, and applicable compatible protocol specified in the task. They concern credential admission only.

| Request | Required checks described by the top | Token absent or wrong |
| --- | --- | --- |
| ping | Protocol and instance; no token check | Does not fail credentials because of the token |
| stop | Protocol and instance; no token check | Does not fail credentials because of the token |
| execute | Protocol, instance, and token, on the inference that execute is an “other normal” request | Fails the required token check |
| identify | Early instance and token checks | Fails the early token check |
| terminate | Early instance and token checks | Fails the early token check |
| kill | Early instance and token checks | Fails the early token check |

Exact support: “Ping/stop: protocol+instance, no token. Other normal requests add token; identify/terminate/kill: early instance+token.” The passage does not explicitly enumerate execute among “other normal requests”; that classification is a supported reading of the distinction, not a quoted classification. It establishes early instance/token checks for the three exceptions; I would not infer their complete later protocol or command-validation behavior solely from “early.”

**DaemonClient policy**

The top cannot determine whether the host may omit policy or who supplies it if omitted. It mentions “Node-free host types; executor/environment inputs; runtime loads at construction” and “Host supplies readiness command,” but neither gives a policy parameter contract or a default-policy supplier. Any yes/no answer or supplier name would be an independent guess, which I withhold.

**Other unknowns**

The passage does not specify the failure response shape, error channel, exact order within every check group, or subsequent operational checks. Passing the stated checks does not guarantee successful execution, stopping, identification, termination, or killing. It also does not establish a protocol requirement for every exception after its early checks.

**Uncertainty about explanation truth**

I have no source confirmation of the authentication summary or the classification of execute. The policy gap is a limit of this top-layer excerpt, not evidence that the API lacks a policy default.

## Case 29

**Predictions**

| Queue composition | Base elapsed-time source | Head elapsed-time source |
| --- | --- | --- |
| Standalone, no supplied callback | Date.now, a wall-clock source | A monotonic source |
| Composed by the daemon process | An injected monotonic source | An injected monotonic source |

Exact support: “the standalone queue default changes Date.now → monotonic, while the process already injected monotonic time.” The continued process injection at head is a supported preservation inference, reinforced by “Preserve the old idle event boundaries.”

If Date.now jumps backward while monotonic time advances normally, **the base standalone queue's elapsed-time measurement is exposed**. It could report less elapsed time or postpone reaching an elapsed-time threshold, depending on the calculation. The head standalone queue and the process-composed queue at both versions are not exposed to that wall-clock jump through the stated elapsed-time sources. These consequences are inferences from the reported clocks, not reported execution results.

The passage does **not** imply that every daemon deadline switches to monotonic time. It describes “their own wall and monotonic time inputs,” identifies one standalone default change, and says process injection was already monotonic. It also says “Idle still starts at construction and resets at acceptance; readiness and completion resets are deferred,” which preserves named event boundaries rather than establishing a universal clock conversion.

**What the text cannot determine**

It does not identify the concrete monotonic API, units, elapsed-time calculation, clamping, scheduler behavior, or precise effect of a backward jump on expiration. It does not inventory the clocks used for every other daemon deadline or establish that all timers are immune to wall-clock changes. A process-composed queue's protected elapsed-time source does not prove that all surrounding process measurements are protected.

**Uncertainty about explanation truth**

The clock transition is explicit in the explanation, but I cannot verify either default or injection from this packet. The rollback consequences rely on those clock claims and on the task's assumption that monotonic time continues normally.
