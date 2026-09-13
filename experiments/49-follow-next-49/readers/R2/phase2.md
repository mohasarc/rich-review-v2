# Reader R2 · phase 2

I read only my sealed phase-one response and the assigned descent packet. This is explanation descent, not source verification; the implementation truth of these claims remains unverified. Phase one is unchanged.

## D13 · Authentication

**Prediction now possible:** For correctly shaped requests with matching instance and compatible protocol where applicable, the head description yields this credential matrix. “Pass” concerns credentials only.

| Command | Required credentials | Token absent | Token wrong |
| --- | --- | --- | --- |
| ping | Protocol and instance | Pass | Pass |
| stop | Protocol and instance | Pass | Pass |
| execute | Protocol and instance, then token | Fail | Fail |
| identify | Instance and token on an earlier branch | Fail | Fail |
| terminate | Instance and token on an earlier branch | Fail | Fail |
| kill | Instance and token on an earlier branch | Fail | Fail |

**Exact new wording:** “Normal requests check protocol and instance first.” “execute, execution-status, result-fetch and result-ack also check the token; ping/stop require protocol and instance only.” “identify/terminate/kill branch earlier and check instance plus token.”

**Did the top already support this?** No. My phase-one record quotes only distinct protocol/instance and token paths with unspecified control exceptions. It did not identify the credential sets or their command mapping. The descent directly supports the head matrix. Its base account and preservation language suggest these distinctions are retained, but the complete base matrix is not separately spelled out.

**Remaining unknowns:** Exact rejection messages/channels, token comparison details, and the ordering of instance versus token checks inside the special branch are unstated. Credential success does not determine command success. No reason is supplied for the differing credential sets, and the statement that tests characterize them has not been checked against those tests.

**Other actionable surprise:** stop and terminate/kill use different credential sets despite all being control actions. A caller or reviewer needs to select and test the actual command path, rather than apply one blanket rule to control operations. The newly named execution-status/result-fetch/result-ack paths also require tokens.

## D04 · Host policy

**Prediction now possible:** The host may omit policy from DaemonClient options. The destination explicitly calls it optional. It still does not identify who supplies policy when omitted, so that part of the original prediction remains unknown.

**Exact new wording:** “Options carry state directory, version, enabled flag, executor factory, module URL, readiness probe and optional policy.”

**Did the top already support this?** No. The host inputs recorded in phase one did not establish whether policy was optional or where a default came from. The optional-policy claim is new information here.

**Remaining unknowns:** The policy provider, default values, resolution timing, and handling of invalid supplied policy are not described. Optionality alone does not establish the success of every construction or operation.

**Other actionable surprise:** “Construction starts one runtime-loading promise; methods await it.” The top already located runtime loading at construction; the single shared promise and method waiting are more specific. Hosts must account for loading beginning at construction rather than first execution, although failure delivery is not specified here. Also, the destination explicitly says “this does not make actual execution browser-portable.” Node-free declarations do not establish browser execution support.

## A1 · Queue clock default

**Prediction now possible:**

| Queue | Base elapsed-time source | Head elapsed-time source |
| --- | --- | --- |
| Standalone, without a supplied callback | Date.now | monotonicNowMs |
| Composed by the daemon process | Supplied monotonic time | Monotonic time passed through the daemon's clock ownership |

**Exact new wording:** “The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR.” The destination also says “elapsed queue and worker measurements use monotonic time” and that the coordinator “passes it into lifetime, ledger, queue and resource owners.”

With Date.now jumping backward while monotonic time advances normally, the **base standalone queue's elapsed measurement is exposed**. The head standalone queue and both versions of the process-composed queue use monotonic time and are not exposed to that wall-clock jump under the supplied conditions. The amount of any undercount, or whether a negative result is clamped, remains unspecified.

**Did the top already support this?** No. The top's ownership statement did not give the standalone default or identify the process's existing supplied clock. Phase one's conditional wall-versus-monotonic reasoning still applies; the descent now assigns those sources to the queues.

**All deadlines monotonic?** No. The destination explicitly says: “Wall time still drives absolute timestamps, grace periods and idle deadlines.” This strengthens phase one's conclusion that the broad ownership change did not imply a universal deadline conversion.

**Remaining unknowns:** The implementations and units of the clock providers, precise elapsed-time arithmetic, and behavior of wall-time deadlines after a backward jump are not given. Source references are listed but were not opened.

**Other actionable surprise:** The standalone default changes even though the process-composed queue already used monotonic time. A standalone consumer or test that relies on Date.now controlling queue elapsed time therefore needs to revisit that assumption. The destination also requires a DaemonClock at coordinator composition and gives worker timing its own NodeDaemonClock; one injected coordinator clock cannot be assumed to govern worker timing.
