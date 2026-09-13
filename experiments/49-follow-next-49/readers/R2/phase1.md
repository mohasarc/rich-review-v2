# Reader R2 · phase 1

This is a fresh agent-reader observation based only on the assigned packet. I did not inspect source, follow links, browse, or consult other readers. The predictions below describe what the passages support, not verified implementation behavior. Where an answer is missing, I leave it unknown rather than supply a guess.

## Case 127

### Predictions and supporting wording

- **When lookup stops returning the cached P:** At base, the release path clears the service's Maps before starting project release: “service clears Maps → starts project release.” At head, clearing also happens before waiting for cleanup: “Scope clearing is synchronous.” Thus the existing entry for P is removed when clearing runs at either version, without waiting for cleanup to finish. This concerns the old cached entry; it does not establish that a later factory cannot return P again.
- **Cancellation of P:** At head, clearing does not cancel P: “Clearing does not cancel work already holding a promise.” I also expect base Map clearing not to cancel an already returned promise, based on the described clearing operation and preservation claim. That base prediction is an inference; the explicit no-cancellation sentence appears in the head description. Neither prediction determines what project cleanup or P's underlying work might independently do to P.
- **Reuse:** Head explicitly permits reuse: “A caller can keep using a handle after either boundary.” At base, the reusable objects are the existing Maps: “Six fixed Maps remain attached to the service.” I infer that those Maps can be populated again. The new generic cache-handle API is a head feature, so I would not assume a caller has that API at base.
- **Backend release at base:** I predict fulfillment after its own release work returns, without waiting for graph cleanup, assuming no other failure. It can therefore finish while cleanup is pending. The later graph rejection E is not forwarded through an awaited graph release. Support: “Service release returns void and starts project release without waiting” and “backend returns Promise<void> without awaiting the graph.”
- **Backend release at head:** It remains pending while graph cleanup is pending, then rejects with E when cleanup rejects. Support: “Service and backend await graph release; rejection reaches the backend caller.” Clearing has already happened by then.
- **Failed refresh:** At both versions, a failed refresh does not begin the next cache turn or clear the current successful turn's cached values. Support: “Clear only after state.refresh resolves” and “Same ordering.” This is not a prediction of complete refresh rollback: the head description explicitly says “Earlier refresh work is not rolled back by this cache change.”

### What the text cannot determine

The passage does not specify exact promise scheduling, how base handles the detached cleanup rejection, P's eventual settlement, concurrent query behavior during cleanup, or all effects of a failed refresh. Reusable handles also mean I cannot infer a permanent prohibition on repopulating the cache after release begins.

### Uncertainty about explanation truth

These lifecycle claims are fairly explicit, but I have no source confirmation. The stated aim that released semantics be unavailable while cleanup is pending should be read alongside the explicit reuse permission: the concrete supported mechanism is immediate clearing, not sealing the scope. Whether the implementation achieves the wider aim is unverified.

## Case validation

### Predictions and supporting wording

- **Head:** For the invalid snapshot described, I predict construction throws synchronously and does not return a wrapper. A worker thread from this construction has not yet been spawned when that parser failure happens. Support: “first calls DaemonPolicy.fromSerialized” and “then creates Worker,” followed by “throw synchronously before a thread is spawned.” The caller receives a thrown construction-time exception.
- **Base:** Validation occurs in the worker after the parent starts it: “Parent starts the worker with the serialized policy; the worker entry parses it.” A worker can therefore already exist when validation fails. I expect the parent constructor to return its wrapper if worker creation itself succeeds, because the stated parser invocation is in the worker rather than the parent. That return prediction is an inference, not an explicit constructor contract in the excerpt.
- **Ordering:** Head establishes parent parsing before Worker creation. Base establishes worker startup before the worker-entry parse. It does not establish whether the worker's parse finishes before or after the parent constructor returns.

### What the text cannot determine

At base, the passage does not identify the channel that delivers worker failure to the caller: an error event, a rejected readiness promise, some other wrapper mechanism, or no direct forwarding. I would not select one from this text. It also does not specify the exception type/message, unrelated constructor failures, or cleanup after worker-side failure. The head ordering says nothing about workers that existed before this particular construction.

### Uncertainty about explanation truth

The head ordering and synchronous failure are direct claims, but remain unverified. “UNEXPLAINED” concerns the reason for moving failure into parent construction; it does not itself establish whether the behavior description is true or false.

## Case owner

### Predictions and supporting wording

- With visits A then B and both claiming shared.ts, **B is primary**, supported by “last configured owner as the primary project.”
- **A and B are both configured owners** under the supplied scenario. The last-owner rule selects a primary among those claims; it does not say the earlier claim ceases to exist.
- With visits reversed to B then A, **A is primary**. The configured-owner membership is still A and B. Support is the same last-owner rule; “Keep FIFO configuration discovery” supports treating visit order as consequential rather than introducing an unstated ranking between projects.
- An unowned file goes to **an inferred project**, supported directly by “an inferred project for unowned files.”

### What the text cannot determine

The passage does not say whether all owners are stored or exposed as a collection, or what order such a collection uses. It does not explain nested discovery, repeated visits, ownership updates, or whether inferred projects are shared across files. The scenario supplies the visit order, so none of those details is needed to select its primary.

### Uncertainty about explanation truth

This is a terse preservation claim with no evidence in the excerpt. I can apply its stated rule, but cannot independently verify the rule or explain its rationale from the word “unexplained.”

## Case 23

### Predictions and supporting wording

The top does not give the required per-command credential matrix. Its relevant wording is “Separate protocol/instance and token paths, including control exceptions.” That establishes the existence of distinctions, but does not identify the checks or exceptions for particular commands.

| Command | Token absent | Token wrong |
| --- | --- | --- |
| ping | Cannot determine required checks or credential outcome | Cannot determine required checks or credential outcome |
| stop | Cannot determine required checks or credential outcome | Cannot determine required checks or credential outcome |
| execute | Cannot determine required checks or credential outcome | Cannot determine required checks or credential outcome |
| identify | Cannot determine required checks or credential outcome | Cannot determine required checks or credential outcome |
| terminate | Cannot determine required checks or credential outcome | Cannot determine required checks or credential outcome |
| kill | Cannot determine required checks or credential outcome | Cannot determine required checks or credential outcome |

Matching instance and compatible protocol, where applicable, do not resolve the missing token rules. I do not infer credential exemptions from command names. Even a known credential pass would not establish execution success.

**Omitting policy from DaemonClient construction is also unknown.** “executor/environment inputs” and “Host supplies readiness command” name some host inputs, but neither declares policy optional, mandatory, or defaulted. The top does not identify who supplies policy if the host omits it.

### What the text cannot determine

It cannot determine which commands require token presence, compare token values, bypass token checks, use another authority path, or differ between missing and incorrect tokens. It also does not give the precise authentication order or the client policy-defaulting contract.

### Uncertainty about explanation truth

I cannot check the broad ownership claims from this excerpt. Their lack of operational detail is not evidence that they are false; it means they cannot support the requested credential and policy predictions.

## Case 29

### Predictions and supporting wording

The source assignment for each requested queue is unknown:

| Queue | Base elapsed-time source | Head elapsed-time source |
| --- | --- | --- |
| Standalone, no supplied time callback | Not specified | Not specified |
| Composed by the daemon process | Not specified for this queue | Daemon-owned timing is suggested by the ownership account, but the queue's concrete callback and clock are not specified |

Support for the broad head ownership change is “Daemon wall and monotonic clocks replace telemetry and scattered time callbacks.” This does not identify a standalone fallback, establish that the queue uses a supplied callback for elapsed time, or assign wall versus monotonic time to the composed queue. I therefore cannot predict a particular clock function for any table cell.

**Backward Date.now jump:** Conditionally, a measurement formed by subtracting readings from Date.now is exposed to a backward jump and could undercount elapsed time or become negative. A measurement using a normally advancing monotonic source is not exposed to that wall-clock jump. The passage does not let me assign those outcomes to either queue at base or head.

**All daemon deadlines becoming monotonic:** No such conclusion follows. The passage names both “wall and monotonic time inputs” and says to “Preserve the old idle event boundaries.” Neither statement maps every deadline to a monotonic clock. Preserving event boundaries also does not establish every elapsed-time formula or clock source.

### What the text cannot determine

The missing information includes queue default callbacks, daemon composition arguments at both versions, which telemetry source was previously used, elapsed-time arithmetic or clamping, and the clock backing individual deadlines.

### Uncertainty about explanation truth

The ownership and preservation claims remain unverified. The top supports a change in ownership of timing facilities, but its omissions prevent checking the specific queue predictions. I make no independent guess about their concrete implementations.
