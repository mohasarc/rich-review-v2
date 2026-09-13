# Receipts for the comparison

[Return to the single comparison table](review.md). These receipts substantiate facts already named in its rows. They are not additional decisions to learn after stopping there. The repository and its tests were not modified or executed.

## Reading protocol and limits

The inventory was frozen at **2026-09-13 12:12:07 UTC**. A finished handoff meant a README and a matching queue/done entry at that moment. There were 80 finished experiments: 63 with teaching surfaces examined here, 14 report-only handoffs, and three negative results. Seventy surfaces account for the main entrances plus the alternate opening, video, and pair variants. Later finishes are outside this snapshot.

Every surface in the table was opened in a browser before the underlying diffs. Reading covered the advertised decision/stopping layers and selected explanatory descendants. It did not cover every possible control state, code receipt, source listing, or alternate subject entrance. Page 20's #131 tab was operated; page 01's separate #127 tab was not. The video account uses its narration transcript; a rendered player alone contains almost no lesson. These limits are part of the table, not hidden behind a completeness score.

The canonical page observations are the `.txt` files in [reads/](reads/), named by surface. Visible code blocks were replaced with `[Code receipt deferred]`. The initial JSON captures also contain page code receipts; those were not used for page-only reading. A capture is not evidence that its entire text was read. The recall record is [cold-notes.md](cold-notes.md), sealed by [phase-seal.json](phase-seal.json) at **12:25:17 UTC**, before any underlying source diff, source worktree, or PR body was opened. Its SHA-256 is `d541ad6d5886c920c20653960a07e92681f96ae96d4f78a21fbd57c3e70a237a`. The learned column compresses those notes; it has not been repaired with source findings.

This was **one sequential agent reader**, not seventy fresh people or independent comprehension trials. Knowledge accumulated across pages, including similar bodies and repeated variants. The initial intention to avoid earlier critiques also failed: teaching page 50 embeds prior critique material, and opening 57 late in the page phase revealed a prior review table. Those exposures are disclosed; subsequent source checks of their issues are corroboration. Other prior critique reports/reader notes were not read. README entry/subject metadata had also supplied some summaries before reading pages.

The source pass read the small #127 patch, inventories of all changed paths for #131/#148/stack, and focused implementation/test diffs for those larger subjects. Pinned `git show` snapshots resolved current-versus-historical context. The adjacent #146/#147 diffs were inspected for page 30. This was **not a line-by-line audit of all 66,501 bundle patch lines**. A no-miss row means no additional miss was established by those checks; it is not a completeness or correctness certificate. [Source indexes and pinned receipt manifest](source/receipt-manifest.json) record the provenance. The only post-source page interaction added to the record was a check of timeline 07's #127/#131 steps, explicitly labelled [after source](routes/07-after-source.json).

Report-only handoffs excluded from a new PR-lesson row: 38, 39, 41–48, 54, 55, 57, 81. Negative results: 56, 58, 60. Pair/report hubs 49, 52 and 59 are represented by their actual teaching variants. Evidence viewers, source books, kit catalogue/starter and navigation hubs are descendants or tools, not extra independent finished lessons. Experiments 80, 82 and 83 were unfinished at the cutoff; 84 is this critique. The [inventory](inventory.json) records the classification inputs.

## What counts as rule 4

The complete advertised stopping layer includes its opening picture and open decision register. A hero alone need not carry everything. A new authority, outcome, ordering exception, default change or test observation below that stopping point is a surprise. A field spelling or finer mechanism for an already disclosed choice is refinement. A fact recovered only from source is a miss, but does not by itself establish a witnessed surprise on descent.

The flags below are editorial applications of the playbook's pyramid invariant, not judgments that Symnav is incorrect. They do not imply any unauthorized security condition: the credential partition is a preserved local protocol contract whose shape readers need to understand.

## R1

**Host policy is additional authority, not just another spelling of executor input.**

On [23's captured whole-change outline](reads/23-zoom-canvas.txt), D04 says: “Node-free host types; executor/environment inputs; runtime loads at construction.” The public-client ENTER control leads to a room whose host-input diagram adds **“optional policy”**. The [operated route](routes/0.json) records that room and `data-depth=2`. The root does not name policy among host inputs. The reader first learns at that depth that a host can supply the threshold snapshot. Source [D1](#d1) shows that the value actually changes construction.

[29's captured complete decision map](reads/29-refusal.txt) similarly names executor and readiness input, while its lower host diagram adds “readiness command/argv · optional policy.” That map occurs beyond the explicit “decision map above is the stopping point.” The same omission is visible in the captured original/revised roots of 49; their controls were not independently replayed. Revised 23 edits authentication, not the policy parent.

The smallest parent repair is: **“Host supplies execution/environment/readiness and may supply policy; omitted policy uses currentSystem.”** This names the authority and fallback without requiring a new room or full field inventory. The specific optional-policy/default choice has no separate comparative rationale in the record inspected here.

## R2

**Ownership wording concealed a default-change distinction.**

29's complete map labels A1: “Daemon wall and monotonic clocks replace telemetry and scattered time callbacks.” Opening A1 reveals: “The queue’s standalone default changes from Date.now to monotonicNowMs; the process already supplied monotonic time before this PR.” The [operated A1/B4 capture](routes/2.json) records both the parent and open descendant. [D2](#d2) corroborates it in the immediate #148 patch.

This is more than a clock implementation name. A reader stopping at A1 cannot distinguish an ownership-only composed path from a changed standalone default. The suggested parent is exactly the distinction the revised 49/29 root now carries. That revision repairs this selected omission; it does not establish that the remaining map is complete.

## R3

**Naming unspecified exceptions did not teach the authentication partition.**

29's parent B4 says request authentication order is retained, “including the identity/termination exceptions.” Its opened explanation first states that identify and terminate/kill dispatch before the ordinary protocol/instance check, that ping follows the ordinary check, and that execution/status/fetch/ACK use the process token. See the [same operated capture](routes/2.json) and [D3 source](#d3).

The reader needs to know which boundary an operation crosses. “Exceptions exist” does not say which input is required where. A compact parent can say: **“Ping/stop: protocol+instance; ordinary execution/status/fetch/ACK also authenticate token; identify/terminate/kill use early instance+token handlers.”** The source supplies the token-free stop case too; it was not explicitly learned from the opened B4 paragraph. Distinguish that source recovery from the witnessed branch-order addition.

The revised 49/23 D13 root supplies this partition. The original 23 process room sampled here gives only a coarse sentence about ordinary and special paths; I have not counted it as a second independently witnessed exact-auth surprise.

## C1

**#127's small diff supports the cache lessons' concrete distinctions.**

The [complete #127 patch receipt](source/c1-cache-change.txt) contains all six changed files. `SemanticCacheScope` registers reusable handles and clears their maps. `Map.has` preserves cached `undefined`. The factory result is stored after a successful synchronous return; a synchronous throw is not stored, while a returned promise—including its rejection—is. There is no settlement callback writing an old promise into a new map, no cancellation and no released-state guard.

The service composes six independent stores, keeps semantic keys/algorithms, retains the supplied files array, and may produce fresh outward projections over retained entries. The backend begins a turn after successful refresh. Release clears before graph cleanup, and the backend changes from calling to **awaiting** the service release. Concrete TypeScript graph cleanup is synchronous, while the new delayed/rejecting graph is a controlled test double. The added test selection cannot establish a whole daemon failure outcome. These are the facts the no-additional-miss cache rows already learned.

## Policy checks

Rows for #131 were checked against its immediate base `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e` and head `b100221db48754656328391b878299c5a0bab443`, not the final stack's more developed recovery implementation. The package policy predates #131. The checked distinctions are earlier parent failure (P1), recovery outcome (P2), translated test inputs/side effects (P3), and the nonidentical removed derivation table (P4).

## P1

**A chunk-limit input adds an earlier failure boundary.**

At [base worker construction](source/p1-worker-base.txt), the parent creates its promise and Worker while passing serialized policy onward. At [head construction](source/p1-worker-head.txt), lines 79–82 call `DaemonPolicy.fromSerialized(...).values.output.maximumChunkRawBytes` before either the exited promise or `new Worker`.

Code-derived consequence: malformed policy rejected by that parser can now throw synchronously from parent construction before a worker is created. “The parent reparses a snapshot for its chunk leaf” is true, but omits this consequence unless the page carries it too. The general reason for supplying policy-derived validation limits is stated; a separate reason for this additional parse/failure boundary was not found. This is already present by #148's base, so it must not be described as a new #148 worker change.

## P2

**Numeric recovery conversion changes which completion error escapes.**

The [immediate #131 recovery diff](source/p2-recovery-change.txt) changes the single outer try/catch into a loop around `currentCompletion`. At base, a later reattached completion failure is caught by the inner catch and the first error is thrown. At head, the next iteration catches the later completion's error. A reattachment request that itself fails still throws the current earlier error. This is a source-derived branch comparison, not a newly executed transport trial.

The [head failed-fetch branch](source/p2-failed-fetch-head.txt) ends in `.catch(fail)`. The numeric fetch allowance does not introduce a retry loop after a fetch failure at this revision. Its counter is local to each execution attempt; accepted reattachment has an outer counter. Final-stack behavior must be checked separately under [S2](#s2).

## P3

**The adapters change stimuli, setup and serialized reports.**

The [transport helper](source/p3-transport-helper.txt) maps legacy inline capacity to `max(default maximumChunkRawBytes, requested inline bytes)`. With the default chunk size, zero becomes 64 KiB. It also creates `outputDirectory` recursively before composing capture, even when the output stays inline. A cleanup assertion on an empty directory consequently does not, by itself, observe deletion of an actual spill file.

The [workspace helper](source/p3-workspace-helper.txt) still declares `memoryCapBytes` but does not translate it into policy. It couples aggregate/result/inline/chunk limits, including a positive inline value for the zero-inline/specified-result case. The [resource helper](source/p3-resource-report.txt) adds replacement window/limit fields to the report record consumed by the benchmark. These are concrete choices beyond renaming imports. The page rows that already teach them are corroborations, not misses. Specific reasons for these exact translations/side effects were not found; a general test-adapter rationale does not supply them.

## P4

**Related retained tests do not repeat every removed input.**

The [deleted CLI table](source/p4-deleted-memory-cases.txt) uses 256 MiB, 512 MiB, 1 GiB, 16 GiB and 64 GiB, plus constrained-memory comparisons and a literal cadence assertion. The [already retained package table](source/p4-retained-memory-cases.txt) uses 1 byte where the CLI table used 256 MiB, with the other four table inputs shared and separate constraint/default tests present.

The missing exact 256 MiB input is the claim. This is not a claim that the formula or its lower clamp has no tests. Its numerical output can coincide with other small inputs. Pages that say merely “derivation coverage moves” fail to teach the changed selection; pages already naming the mismatch do not.

## Package checks

Rows for #148 use base `ba53c8e1662fd86d198b95321c90d9c9bef10184` and head `20838f8dbf413e04767543eb2380d0d114da6c60`. These are staged package mechanisms; the shipped CLI still retains its prepared compatibility graph. The checks address host authority/loading (D1), clock context (D2), credential paths (D3), actual authority/constructor changes (D4), rationale context (D5), and changed observations in tests (D6).

## D1

**Host input and public-instance lifetime carry concrete choices.**

The [new client options](source/d1-host-inputs.txt) include optional policy. The [runtime constructor](source/d1-runtime-policy.txt) chooses `options.policy ?? DaemonPolicy.currentSystem()` and builds retained mechanisms from it. The [public façade](source/d1-shared-runtime-promise.txt) starts loading in the constructor and stores one promise; execute/control await that same promise. There is no method-level reload after it rejects.

The Node-free declaration boundary is a stated goal. It does not imply browser execution, lazy first-use loading, or an automatic load retry. No separate comparative rationale was found for optional policy/defaulting or retaining construction-time load failure. Where page-only recall omitted these, the table reports misses, without claiming every descendant of that page was searched.

## D2

**Standalone default changes; the composed process already used monotonic time.**

The [queue diff](source/d2-standalone-clock.txt) replaces a default `Date.now` function with a `NodeDaemonClock` monotonic input. The [coordinator diff](source/d2-composed-clock.txt) shows the old process already constructed the queue with `() => this.clock.monotonicNowMs()`. The new object-shaped injection changes ownership and type shape, while the standalone default is a separate behavioral distinction. The clock-ownership goal is stated; these facts should not be compressed into a claim that every queue changes time behavior.

## D3

**Request authentication remains partitioned.**

[Head coordinator lines 353–433](source/d3-auth-partition.txt) dispatch identify/terminate/kill early into instance/token handlers. Other requests first check protocol and instance; ping returns there, and execute goes to admission. Execution-status, result-fetch and result-ACK additionally compare process token. Stop reaches the drain path without that token branch. This is a preserved partition characterized by #148, not a new uniform authentication gate. The record's preservation requirement supplies context; the source specifies the exact branches.

## D4

**Centralization includes stricter answers and an earlier constructor contract.**

The [ownership diff](source/d4-ownership-change.txt) changes `isStartupOwner` from an instance-only comparison to a predicate requiring identity and instance, with optional credentials/observation fields for wider claims. Assuming a structurally readable lock at the expected path with the same instance but conflicting identity, those two source branches answer differently. This is a code-derived counterexample, not an executed corruption test or a claim about its occurrence rate. A goal of one comparison owner does not erase the changed result.

The [constructor](source/d4-constructor-order.txt) validates adopted coordinates before reading policy; the [new validator](source/d4-coordinate-validation.txt) compares root, keys and endpoint. Entry validation already existed. The new direct-constructor contract is the supported claim, not a demonstrated new entry catch outcome. The plan states canonical ownership; no separate reconciliation of the tightened result with preservation intent, or comparative reason for every constructor-shape choice, was found.

## D5

**The retirement condition was already recorded.**

The same Migration access paragraph exists in both [#148 base](source/d5-policy-plan-base.txt) and [#148 head](source/d5-policy-plan-head.txt): “Phase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local.” It also describes the temporary test-only factory and lint/meta-test restriction. The preceding paragraph gives a different condition for later serialization-API retirement after entries move.

This is a reason/context found in a pinned plan even though the PR does not edit the paragraph. It corrects a broad absence claim about export retirement. It does **not** individually explain every removed assertion, prove replacement evidence equivalent, or settle why the exact PR/commit timing differs from phase numbering. Pages 06 and 50 already supply this condition; several others omit it or group it under a broad unexplained label. My verification is not an independent discovery of the issue, because it was learned on earlier pages too.

## D6

**Moved tests change observation boundaries.**

The [worker test diff](source/d6-worker-test-change.txt) replaces a built CLI executor/readiness path with a generic fixture (`files:17` and requested stdout). It removes three startup-duration and four result-duration expectations. The worker/CLI version-mismatch initialization test disappears; the page record points to a direct executor-factory check instead. Those targets are different observations even when version rejection remains tested somewhere.

The [deleted CLI-entry tests](source/d6-entry-tests-deleted.txt) contain the explicit **257 MiB** worker-limit handoff and termination-recorder setup. New built-entry evidence does not become the same assertion just because it traverses process startup. The [runner addition](source/d6-runner.txt) serializes package test files. These are explanatory test-selection choices; no tests were run by this critique, and a test title/deletion count alone is not a lost-coverage count. The finer reasons remain narrower unknowns than the recorded package-test relocation goal.

## Stack checks

The whole-stack subjects use `main` at `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` through `d07002357d3e9596bfaae910a1ac63b77981620b`. Checks concentrated on core publication/selection (S1), accepted result recovery (S2), admission/failure authority (S3), FIFO/delivery ordering (S4), and removed observations/accompanying surface changes (S5). Many other changed bodies were only inventoried. A narrow lesson's disclosed scope is retained in its table row.

## S1

**Publication, discovery retention and cached bytes are different lifetimes.**

[Core refresh](source/s1-core-publication.txt) prepares and commits before assigning the candidate index. Missing-file ensure iterates one file at a time. This supports per-publication atomicity, not a whole request/pipeline transaction. [Source-cache refresh](source/s1-source-selection.txt) evicts omitted revisions when given a selected snapshot. [WorkspaceSession](source/s1-workspace-session.txt) retains backend instances and optionally a catalog, creates a fresh router per preparation, and discovers selections afresh. The broad stack rows already name these limits; source context corroborates them.

## S2

**Check recovery at the revision actually being taught.**

The [stack-tip execution client](source/s2-execution-recovery.txt) retains `originalAcceptedClose` through exhausted accepted-close reattachments and permits a failed accepted fetch to call `resume()` again within its configured allowance. Clean fetch exhaustion is converted to accepted corruption. [The receiver](source/s2-result-receiver.txt) retains its expected manifest/output/offset across a fresh connection, advances offset only after append, checks terminal/digest consistency, and owns disposal until successful completion. An execute reattachment constructs a new receiver/capture while keeping request identity outside it.

These are the narrow weather-map/circuit/specimen distinctions. #131's local transport has the earlier P2 branches. The table avoids flattening these historical versions into one story. ACK-before-return and failure cleanup remain part of the full execution path taught by the pages; receiver completion alone is not protocol acknowledgement.

## S3

**Authority comes from ordered contracts, not diagram motion.**

[Admission source](source/s3-admission.txt) evaluates authentication, readiness, resource pause, queue state and duplicate compatibility in order. Authentication disconnects. A single code-to-retry map makes not-ready/draining/resource-pressure retry-safe and incompatible unsafe, and validates consistent frames. [Terminal classification](source/s3-terminal-failures.txt) prioritizes recorded resource interruption, then response capacity, then worker exit with a stopping special case, then shutdown/internal state. Worker wire failures use their own vocabulary. The narrow circuit and pinball pages already teach these facts; their simulations are illustrations rather than source execution evidence.

## S4

**Latest delivery, FIFO boundary and acknowledgement are distinct.**

The [#147 accepted session](source/s4-accepted-session-147.txt) retains the ledger's original acceptance metadata and returns early for an existing request before new execution/idle reset. It seals completion, publishes terminal state and waits for the tracked completion before a scheduled boundary resource sample lets the queue progress. The [#146 delivery session](source/s4-delivery-session-146.txt) owns attachment/traces/acknowledgement over the existing journal and spool; its tracked map is not an all-subscriber acknowledgement barrier. ACK cleanup errors are recorded before logical acknowledgement still proceeds.

Page 30's immediate [#146 diff](source/pr-146.patch) and [#147 diff](source/pr-147.patch), plus these source owners, support the adjacent-cut model. Source does not supply a separate why for having two review units rather than one. The narrow execution/delivery lessons already keep these lifetimes separate.

## S5

**Removed built-CLI observations are not just relocated file counts.**

The [stack status/stop diff](source/s5-status-stop-deletions.txt) removes ten scenario bodies: live startup-owner status; independent warmup surviving caller death; stale-record cleanup; stuck-live status; unresponsive authenticated ownership; malformed authenticated activity; workspace deletion; launched-starting stop; in-flight stop drain; forced stop before success rendering. These are the exact observations named by the broad stack and cutover pages. This receipt does not claim equivalent behaviors lack all other tests.

The [concurrent cold-start integration deletion](source/s5-cold-start-deletion.txt) is another observation, not part of that ten. The stack also changes [protocol generation](source/s5-protocol.txt) and the [PR template](source/s5-pr-template.txt). General “tests change” narration does not teach which observations were removed. These checks establish the video's stated limit, not a whole-stack verdict.

## Timeline misses

The 07 root summary and its post-source #127/#131 frames were compared with [C1](#c1) and [P1–P3](#p1). They do not carry the newly joined backend completion, later completion-error provenance, earlier worker parse failure or concrete adapter stimuli. “Clear before awaiting release,” “independent counters,” and “test-only adapters” name mechanisms without those changed outcomes. This is a source-supported stopping-layer omission. The route was visited after the seal, so it is not claimed as a cold surprise witness.

## Video limit

The video/transcript preserves six ownership jobs and general test caveats, while [C1](#c1) and [S5](#s5) add concrete release/test decisions not recalled from narration. The full 21 page contains a much larger decision sheet. Treat the narration as the labelled lossy opening, with the full page as the actual stopping layer. No causal comprehension comparison of video versus prose was conducted.
