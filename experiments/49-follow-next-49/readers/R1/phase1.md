# Reader R1 — phase 1

Fresh agent-reader observation, not a human study. I read only the assigned packet. All predictions below are conditional on the explanation being accurate; I did not inspect source or follow links. I make no independent implementation guesses where the packet leaves an answer open.

## Case 127

### Predictions and supporting wording

- **Base: lookup stops returning cached P when release clears the Maps, before pending project cleanup finishes.** The base says, “service clears Maps → starts project release.” This establishes clearing before the project release begins, rather than waiting for its settlement.
- **Head: lookup stops returning cached P during synchronous scope clearing, before waiting for cleanup.** The head says, “Release clears first, then waits and propagates project failure” and “Scope clearing is synchronous.” Clearing removes the cached entry; it does not revoke a reference to P already returned to a caller.
- **Head: clearing does not cancel P.** Exact support: “Clearing does not cancel work already holding a promise.” **Base: I also expect no cancellation from clearing the Maps**, but this is an inference from the described clearing operation and preserved behavior; the explicit non-cancellation sentence appears under the head description.
- **Head: the same handle can be used again after release or beginTurn.** Exact support: “A caller can keep using a handle after either boundary” and “without disposal, sealing, or cancellation.” This permits new cache entries even while project release is pending; it does not guarantee that a new semantic query succeeds against the releasing project.
- **Base: I infer that the service's existing Maps remain reusable after clearing.** Exact support: “Six fixed Maps remain attached to the service.” The new generic cache-handle API belongs to the head, so I cannot attribute that API to the base. If “same handle” means the base's existing cache storage, retention supports reuse.
- **Base: backend release does not wait for the pending project cleanup.** The base says, “Service release returns void and starts project release without waiting; backend returns Promise<void> without awaiting the graph.” In the supplied scenario I expect the backend release promise to fulfill independently of cleanup, rather than wait and reject with E. The later graph rejection is not forwarded through that backend promise by the described release path.
- **Head: backend release remains pending while graph cleanup is pending, then rejects with the cleanup rejection E.** Exact support: “Service and backend await graph release; rejection reaches the backend caller.” I interpret “forwards its rejection” as forwarding E, although the top does not show code to independently verify error-object identity.
- **Both versions: a failed refresh preserves the current successful semantic turn.** Exact support: “failed refresh must preserve the current successful turn,” “Clear only after state.refresh resolves,” and “Same ordering.” This preserves that turn's caches across the failed refresh; it is not a promise that all earlier refresh effects are undone. The head explicitly says, “Earlier refresh work is not rolled back by this cache change.”

### What the text cannot determine

The top does not establish P's eventual result or settlement time, where the base's graph rejection goes, or exact promise/microtask scheduling. It also does not guarantee the outcome of semantic operations attempted through a reused handle after release. Removing the cached entry alone cannot establish that some later factory could never return the same P again. The base has no described generic handle contract equivalent to the head's new API.

### Uncertainty about explanation truth

The passage makes unusually explicit before/after claims, so these predictions require little extrapolation beyond the qualifications above. “STATED” and the reported PR requirements remain claims in the explanation, not independent verification that the implementation satisfies them.

## Case validation

### Predictions and supporting wording

- **Whether construction returns a wrapper is unknown.** The passage says, “The worker parent reparses the snapshot for a chunk limit.” Given the task's invalid snapshot, I expect that reparse to encounter validation failure if reached with that snapshot. The passage does not locate the reparse within construction or say whether failure is caught.
- **Whether a worker thread can already exist at failure is unknown.** Nothing states whether worker creation precedes or follows the parent's reparse. Both orderings are compatible with this excerpt.
- **The caller's failure channel is unknown.** A synchronous constructor exception, asynchronous rejection, or another error-reporting path cannot be selected from the passage. “Reparses” by itself does not specify how parser failure reaches the caller.
- **The established ordering is an input-depth description, not a constructor execution sequence.** Exact wording: “Snapshot → sections → fields → numbers” and “Some consumers take several sections, others one field or a bare number.” The excerpt identifies input shapes and a parent-side reparse, but gives no relative ordering between validation and thread creation.

### What the text cannot determine

It does not show the wrapper constructor, parser failure behavior, catches, worker allocation, or error forwarding. “Defaults hidden in consumers and helpers” does not establish that a default makes an invalid snapshot acceptable.

### Uncertainty about explanation truth

Even the parent reparse is an unverified explanatory claim. The excerpt is too narrow to support a concrete construction-lifecycle prediction, independently of whether that claim is true.

## Case owner

### Predictions and supporting wording

- **With A visited before B, shared.ts has A as its primary configured project.** Support: “preserves configured-owner order” and “uses the first owner for primary lookup.”
- **Its configured-owner collection contains A then B**, for the two claimants supplied in the task. Support: “preserves configured-owner order.” The primary selection does not imply dropping B from the owner collection.
- **Reversing the configured visitation order makes B primary and gives the ordered owners B then A.** This applies the same first-owner and order-preservation claims to the reversed scenario.
- **An unowned file goes to an inferred project.** Exact support: “sends unowned files to an inferred project.”

“traverses configuration references FIFO” supplies the traversal-order rule; the task already supplies the resulting A-then-B order.

### What the text cannot determine

The passage does not explain why either project claims the file, how the initial traversal queue is seeded, deduplication details, or how the inferred project is selected or created. It does not establish any additional owners beyond the scenario's two claimants.

### Uncertainty about explanation truth

These are direct conditional predictions from the passage. The “unexplained” label leaves the rationale unavailable; it does not itself establish whether the implementation follows the described rules. Source accuracy remains unverified.

## Case 23

### Predictions and supporting wording

For correctly shaped requests with the stipulated instance and protocol matches, the top does **not** give the command-by-command credential rules:

| Command | Token absent | Token wrong |
| --- | --- | --- |
| ping | Cannot determine which credential checks are required or passed. | Cannot determine whether token mismatch rejects it. |
| stop | Cannot determine which credential checks are required or passed. | Cannot determine whether token mismatch rejects it. |
| execute | Cannot determine which credential checks are required or passed. | Cannot determine whether token mismatch rejects it. |
| identify | Cannot determine which credential checks are required or passed. | Cannot determine whether token mismatch rejects it. |
| terminate | Cannot determine which credential checks are required or passed. | Cannot determine whether token mismatch rejects it. |
| kill | Cannot determine which credential checks are required or passed. | Cannot determine whether token mismatch rejects it. |

Exact support for the existence of differentiated paths is “Separate protocol/instance and token paths, including control exceptions.” That establishes distinctions and exceptions without assigning them to these commands or explaining absent versus incorrect credentials. The adjacent “narrow queries and full mutation checks” describes the registry ownership predicate; it does not establish the request-token matrix. Naming an action “kill” or “ping” is not sufficient evidence for assigning a credential rule.

**Whether a host may omit policy when constructing DaemonClient is also unknown.** “executor/environment inputs; runtime loads at construction” is not a complete constructor signature. “Host supplies readiness command” assigns readiness responsibility, not policy responsibility. The removal of a “policy-testing export” likewise says nothing about constructor defaults. The packet's statement in Case 29 that the package “retains its existing contracts and policy” still does not identify optional constructor inputs or a default supplier.

### What the text cannot determine

The top does not provide the per-command token checks, the actual exceptions, failure responses, or whether checks differ for an absent and a wrong token. It does not specify whether policy is required, optional, defaulted by DaemonClient, or supplied elsewhere. Credential acceptance would not by itself establish successful execution or control.

### Uncertainty about explanation truth

The broad statement that separate authentication paths exist is unverified. Even assuming it is true leaves the requested matrix unresolved. I have not substituted conventional security expectations for missing text.

## Case 29

### Predictions and supporting wording

| Queue | Base elapsed-time source | Head elapsed-time source |
| --- | --- | --- |
| Standalone, no supplied callback | Unknown: no default callback is specified. | Unknown: no default callback is specified. |
| Composed by the daemon process | Unknown: the top mentions former telemetry and scattered callbacks without identifying this queue's wiring. | The ownership description suggests a daemon-owned time input if this queue is among the affected mechanisms, but the exact callback and whether it is wall or monotonic time are not established. |

Exact support for the broader change is “Daemon wall and monotonic clocks replace telemetry and scattered time callbacks” and “Give daemon mechanisms their own wall and monotonic time inputs.” These support a change of clock ownership; they do not identify a standalone queue's default or trace the process-composed queue's elapsed-time callback. Inferring that durations ought to use monotonic time would not establish that this particular queue does so.

**I cannot identify which named queue measurement is exposed to a backward Date.now jump.** As a conditional deduction from the scenario, an unclamped elapsed calculation subtracting Date.now readings can shrink or become negative across the jump. An elapsed calculation based only on the normally advancing monotonic source would not be affected by that jump. The top does not assign either queue, at either revision, to those implementations.

**The passage does not imply that all daemon deadlines switch to monotonic time.** Its explicit preservation claim is “Idle still starts at construction and resets at acceptance; readiness and completion resets are deferred.” That describes event boundaries, not a universal deadline-clock conversion. The coexistence of wall and monotonic inputs also gives no deadline-by-deadline mapping.

### What the text cannot determine

Missing details include both revisions' default queue callback, the callback supplied by process composition, the concrete clock APIs, any elapsed-time clamping, and the clocks used by individual deadlines. The raw-clock guard's stated scope does not supply those details.

### Uncertainty about explanation truth

The ownership change and preserved event boundaries are unverified claims. Even if they are accurate, the top is not specific enough to resolve the queue comparison. The possible daemon-owned callback at head is a text-supported inference about scope, not a verified prediction of its clock source.
