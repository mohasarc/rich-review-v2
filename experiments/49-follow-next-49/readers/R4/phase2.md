# R4 · phase 2

Fresh agent-reader observation. I read only my sealed phase-1 response and the prescribed descent packet. Phase 1 remains unchanged. This is explanation descent, not source verification; all implementation predictions remain conditional on the explanations being accurate.

## D13 · authentication

**Prediction now possible.** For correctly shaped requests with matching instance and applicable compatible protocol, an absent or wrong token does not prevent ping or stop from passing the described credential checks. It prevents execute, identify, terminate and kill from passing. Normal requests check protocol and instance first; execute then requires the token. identify/terminate/kill take an earlier instance-plus-token branch, distinct from the normal protocol-bearing path. Passing these checks still does not establish command success.

**What phase 1 already supported.** The top supported those token-admission predictions. My classification of execute as an “other normal” request was an inference; this destination names it explicitly. The top's “early instance+token” supported an early special path but left me uncertain about its relationship to later protocol checks. The descent more clearly distinguishes that branch from protocol-bearing requests, although it still does not show the complete implementation.

**Exact new wording.** “Normal requests check protocol and instance first.” “execute, execution-status, result-fetch and result-ack also check the token; ping/stop require protocol and instance only.” “identify/terminate/kill branch earlier and check instance plus token.” The base description also says the coordinator “already distinguishes identify/terminate/kill from protocol-bearing execution and lifecycle requests.”

**Remaining unknowns.** Failure response shapes, error delivery channels, full branch internals, and subsequent command checks remain unavailable. The destination supports an exception to the normal protocol path; it does not establish every possible treatment of protocol fields on special requests. No rationale for the credential differences is supplied, and the reported tests have not been inspected.

**Other actionable surprise.** Execution-status, result-fetch and result-ack are explicitly token-protected too. A host cannot assume that obtaining or acknowledging execution results uses the token-free ping/stop path. Also, “New tests pin the ordering and exceptions” describes added characterization; it does not mean these credential distinctions were newly introduced by the refactor.

## D04 · host policy

**Prediction now possible.** The host may omit policy when constructing DaemonClient: policy is explicitly optional. The destination still cannot tell me who supplies the effective policy when omitted, whether the runtime uses a shared default, or whether omission is carried farther down the call chain. Naming a supplier would remain a guess.

**What phase 1 already supported.** The top did not establish optionality or a supplier, and my phase-1 answer left both unknown. Optionality is newly answerable; supplying behavior is not.

**Exact new wording.** “Options carry state directory, version, enabled flag, executor factory, module URL, readiness probe and optional policy.”

**Remaining unknowns.** The omitted-policy default, its owner, values, construction timing and override semantics are not explained. The passage does not expose the complete options type or establish which other inputs are optional. Nor does it establish that every otherwise valid construction succeeds merely because policy may be omitted.

**Other actionable surprise.** “Construction starts one runtime-loading promise; methods await it.” A host should account for methods waiting on runtime initialization, rather than infer that construction finishes all runtime loading synchronously. Failure handling and retry behavior remain unspecified. Also, “this does not make actual execution browser-portable”: Node-free declarations alone do not support choosing DaemonClient for execution in a browser.

## A1 · clock default

**Prediction now possible.** The queue comparison remains: a standalone queue with no callback uses Date.now at base and monotonicNowMs at head; a process-composed queue uses injected monotonic time at both. With a backward Date.now jump and normally advancing monotonic time, the base standalone queue's elapsed measurement is exposed; the other three queue cases are not exposed through their stated elapsed-time source. The exact measurement or expiry effect still depends on unseen calculations.

**What phase 1 already supported.** The top already stated the standalone default change and the process's preexisting monotonic injection. Those predictions do not change. It also did not justify a claim that all daemon deadlines switch to monotonic time. The destination now identifies concrete wall-clock responsibilities and the named standalone callback.

**Exact new wording.** “The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR.” “Wall time still drives absolute timestamps, grace periods and idle deadlines; elapsed queue and worker measurements use monotonic time.”

**Remaining unknowns.** The underlying monotonic API, exact formulas, clamping, timer scheduling and the size or timing of effects from a backward wall-clock jump remain unknown. Neither the clock name nor the ownership summary proves every owner uses its intended source on every path. The cited source locations were not opened.

**Other actionable surprise.** Grace periods and idle deadlines explicitly remain wall-clock-driven. A reviewer or host concerned about clock adjustments should examine those paths separately from queue elapsed measurements; the queue change cannot establish their immunity. The coordinator now requires a DaemonClock and passes it to several owners, while “Worker timing uses its own NodeDaemonClock.” That separation means the explanation does not establish that substituting the coordinator's clock also controls worker timing.
