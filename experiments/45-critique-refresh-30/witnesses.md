# Concrete witnesses and their limits

These cases support [the critique](critique.md). They assess the explanation against [playbook §1](../../playbook.md#1-what-every-agent-must-produce-hard-rules), not the correctness or desirability of symnav. They are selected counterexamples to particular claims, not a compliance scorecard or an exhaustive answer key. “Source checked” below does not mean the entire PR was audited.

<a id="reason-attribution"></a>
## 1. Disclosure of a change is different from a reason for it

**Direct page observation:** [04](../04-textbook-chapter/index.html), opening finding 3, says “One failure path changed; PR body silent.” Its later decision 1 says the PR body shows an “awaited release boundary” and the changed public surface. Both passages are preserved in [the rendered capture](observations/04-textbook-chapter.json).

**Independent input check:** The #127 entry in [the supplied stack PR bodies](../../inputs/stack/pr.json) names an awaited backend boundary, depicts the service awaiting release, and lists `releaseTransientResources(): Promise<void>`. It states why caches must clear before pending or rejecting project release. It does not separately explain how changed completion/rejection behavior fits the plan’s preservation requirement.

**Implication:** “PR body silent” is too broad. The change is disclosed; the reconciliation remains unexplained. 39 records this as a descent surprise about disclosure. I can establish an internal attribution contradiction directly, without claiming the whole chapter fails rule 4. The correction belongs in the opening. It should not erase the unexplained rationale.

**Useful repair already present elsewhere:** [40 D08](../40-best-of-synthesis/index.html#D08) separates the stated clear-first ordering from [D09](../40-best-of-synthesis/index.html#D09), the disclosed barrier and missing parity reconciliation. Its D12 also separates added tests from retained ones. Those are improvements in the unit of explanation, not just the prose.

## 2. An unchanged plan supplies a retirement condition

**Page claims:** 23’s D03 and 35’s record 03 treat retirement of `@symnav/daemon/policy-testing` as unexplained. 29 groups retirement with other package-enforcement choices. Earlier critiques already identified this problem; it is not a novel discovery of this pass.

**Independent source check:** At #148 head `20838f8dbf413e04767543eb2380d0d114da6c60`, `plans/005/daemon-policy.md`, “Migration access,” says Phase 26 removes the temporary testing subpath after app-owned mechanism tests move package-local. I read this exact git object through the read-only stack worktree. [42’s pinned copy](../42-fresh-reader-refresh-10/source-check/snapshots/148-head--daemon-policy.md) and [its explanation](../42-fresh-reader-refresh-10/source-check/evidence.md#s11) make the source independently openable. [06](../06-hub-and-spokes/README.md) had already found this rationale.

**Implication:** Rule 8 requires a finer attribution. The migration condition is stated. Reasons for every accompanying assertion deletion, exact lint design, or serial test configuration do not follow from it. A badge on the whole cluster loses information in either direction.

## 3. A test adapter changes what an assertion can witness

**Direct interaction:** I opened [27’s adapter row](../27-test-honesty/index.html#d-adapters). The parent says: “Forced spill at 0 becomes a threshold crossing, inline 1 becomes 32 in one capture comparison, and records are split to fit the chunk cap.” The child adds that a transport helper clamps inline capacity to the default chunk size and that an unchanged-looking call need not reach the same storage state. [Parent and child captures](observations/targeted-reading.json).

**Specific source witness, from the reader checks:** [42 S7](../42-fresh-reader-refresh-10/source-check/evidence.md#s7) traces a cleanup test that requests inline zero and sends one 64 KiB record. The new adapter floors inline capacity at 64 KiB. Storage spills only above the threshold. The retained empty-directory assertion therefore no longer witnesses deletion of a client spill file in that case. This pass read that source analysis; it did not independently rerun the fixture or verify every affected-case count.

**Implication and disagreement:** 39 calls the parent/child change a rule-4 surprise; 42 treats the precise lost disk witness as an omission discovered only through source. My direct reading supports both the narrower child qualification and the need to repair the parent. It does not support claiming that the child itself teaches the full concrete cleanup witness. The top should state that some preserved fixtures no longer cause a disk spill. This is more useful than resolving the disagreement by counting a flag.

The broader apparatus–assertion–limit design remains promising. A good representation can still contain an incomplete instance.

## 4. A complete callable inventory can omit test decisions

**Direct page observation:** [20’s #127 complete layer](../20-contract-table/index.html) has five decision cards: lifetime ownership, cache identities/failures, refresh/input, release, and reusable handles. The rendered inventory and expanded decision texts are saved in [targeted-reading.json](observations/targeted-reading.json). Test-file coverage entries do not explain the choices embodied by the added tests.

**Corroboration:** Both [39](../39-fresh-reader-check/index.html) and [42’s #127 contract row](../42-fresh-reader-refresh-10/review.md) missed the ten added cases and five retained cases. [42 S2](../42-fresh-reader-refresh-10/source-check/evidence.md#s2) checks the exact additions and byte-unchanged old-test suffix.

**Implication:** This is a rule-8 omission in the claimed complete decision layer, not a demonstrated descent-only surprise. “All changed files” and hundreds of callable contracts cannot establish that test decisions are surfaced. The same page’s #131 view does teach the earlier parent validation consequence, which many other readings missed. The method has a useful strength and a specific blind spot.

## 5. Discovery order does not select the first owner

**Page claims:** [01’s stack view](../01-unconstrained-a/index.html) says “Discover FIFO; first configured owner wins; inferred fallback.” 22’s complete sheet says “keeps first configured ownership.” 14 says the last configured owner is primary. The conflicting accounts were recorded by both reader checks.

**Independent source check:** [ProjectGraph.buildOwnership](../../worktrees/stack-head/packages/core/src/workspace/project-graph.ts) at lines 319–338 appends each owner and unconditionally sets that file’s primary owner on every iteration. [The test](../../worktrees/stack-head/packages/core/src/workspace/project-graph.test.ts) at lines 244–266 is named “orders all owners and selects the last owner as primary”; it expects `/repo/c.json` after discovering a, b, c. The pinned copies are also available in [42 S1](../42-fresh-reader-refresh-10/source-check/evidence.md#s1).

**Implication:** 01’s sentence is wrong; 22’s wording requires correction or clarification. This concerns fidelity of the teaching, not a recommendation to change primary-owner selection. Repeated appearances are not independent evidence of the claim. A source inventory can coexist with a mistaken root fact.

42 also establishes a separate false claim in 01 about editing an old test to add `await`. I retain that as [42’s checked finding](../42-fresh-reader-refresh-10/source-check/evidence.md#s2); I did not repeat its whole suffix comparison here.

## 6. Public input and failure location are decisions, not just wiring

**Findings inherited with attribution:** [42](../42-fresh-reader-refresh-10/review.md) records optional host policy first appearing below the complete layer in 12, 23, and 29. It preserves exact parent/child captures and connects them to `policy?: DaemonPolicy` and the runtime’s supplied-or-current-system default. It also records 25 first qualifying the removed 5 ms startup field as unused in its detail. These are its exercised descents; this pass did not independently replay each one.

Both reader checks repeatedly missed #131’s new validation in the parent worker constructor. [42 S4](../42-fresh-reader-refresh-10/source-check/evidence.md#s4) identifies parsing before `new Worker`, and labels earlier failure as source inference rather than a newly executed malformed-policy scenario. Its [S5](../42-fresh-reader-refresh-10/source-check/evidence.md#s5) distinguishes three test fixtures’ casts through `unknown` from ordinary constructor assignability. 20 teaches the first consequence; 28 teaches the second choice.

**Implication:** No single representational lens recovers all decision kinds. Inputs confer authority; validation placement changes where failure becomes observable; casts change what a test demonstrates. A box title, an edge, or a constructor listing needs the consequential qualification attached to it. The reader checks supply concrete cases to investigate, not a universal verdict on every unseen panel.

## 7. Interactions that add a distinct relationship

I exercised three bounded routes, preserved in [variants-and-models.json](observations/variants-and-models.json):

- **16:** Move `DaemonLifetime` to daemon, then imagine imports rewritten and exports added. Address/export problems disappear; the telemetry type dependency remains forbidden under the displayed package rules. This separates different kinds of constraint. The model explicitly covers direct imports/re-exports and does not compile a modified program.
- **30:** Finish worker A, then its first attached stream, then its latest stream, then the resource sample. B remains queued after the first stream and starts after the sample, with A unacknowledged. The model announces these gates before play. It illustrates source-derived order; I did not run the daemon.
- **36:** Select reference locations, then change from stored objects to service returns. A reused underlying location entry produces different returned projections. Identity is within one build. This image cannot establish completion or failure behavior, which the separate release comparison explains.

These routes support claims about the representations’ content and behavior. They do not establish that a fresh human learned from them. No correctness judgment, comment, vote, or persistent reader response was submitted.

<a id="changing-view"></a>
## 8. The matrix changes; its interpretation does not follow

**Finding prompted by 43:** Its [main critique](../43-critique-refresh-20/critique.md#pictures) identifies stale captions in 36’s return-value lens. My earlier stored/returned captures in [variants-and-models.json](observations/variants-and-models.json) contain the same mismatch, and I recaptured the selected view with the captions visible in [this screenshot](observations/screenshots/36-returned-reference-captions.png).

**Exact state:** Choose reference locations, then “At the service return.” The pair readout correctly changes from the same cached location object to different reference projections. The matrix becomes diagonal. Its plot title still says “Reference locations”; below it, “One large block” and “Two smaller blocks” still describe the stored-object pattern.

**Implication:** The cache explanation remains true about the other interface, but the visible caption is no longer an explanation of the selected plot. The representation should update its object name and interpretation with the lens, or explicitly distinguish the two. This is an explanation-fidelity problem, separate from a claim about source correctness or human comprehension.
