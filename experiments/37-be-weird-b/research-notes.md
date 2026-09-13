# Evidence and coverage notes

The subject is PR #127 alone, layer 4 of the daemon refactor stack. The other supplied subjects were not inspected. Earlier experiment folders were left unread; no component or content was reused from them.

## What was read

- `philosophy.md`, then the playbook, including required sections 1, 2, 3, 6, 7 and the section 5 menu.
- `inputs/pr-127/pr.json`, including the complete body and six commit subjects; commit bodies are empty.
- The complete `inputs/pr-127/diff.patch`, its six-file stat, and stack position.
- The contributor guidance and relevant architecture functional spec in `repo-rules.md`.
- PR #127 base and head tracked source for the semantic service, backend, core export, and both changed test files; the head worktree’s `AGENTS.md` and architecture spec.
- Package and Vitest configuration needed to run two existing focused suites.

The overview bundles were not used. No implementation transcript or phased implementation plan was in this input, and none was claimed. “Unexplained” means no specific reason was found in the sources above, not that the author could not have a reason.

## How decisions were extracted

Every production hunk and changed public signature was assigned a thread. The two changed test files were compared separately. The four reasons explicitly given under the PR’s Decisions heading were preserved as reasons. The PR’s broader identity/algorithm preservation constraint was used as the stated reason for retained semantics. Merely listing a new signature was not treated as explaining why it changed.

| Thread | Surface contract | Deeper material adds |
| --- | --- | --- |
| 01 Ownership | Core owns generic lifetime; TypeScript retains algorithms and a scope instance | File boundary, export, field, dependency direction |
| 02 Six handles | Five identity/promise spaces and one position/location space remain independent; reference work is shared where it already was | Names, types, exact formatted keys, caller use of reference locations |
| 03 Presence | Stored undefined is a hit; only absent keys run the factory | Membership branch and exact-value assertions |
| 04 Failures | Promise identity and rejection are retained; synchronous factory failures retry; observers count fill attempts | Statement order, eager argument evaluation, observed assertions |
| 05 Refresh | Source, optional graph, state, then cache reset; failure keeps the semantic turn; no general rollback claim | Base/head call sequence and focused mocked-state test |
| 06 Clear first | Clear before waiting; old entries gone during pending/rejecting release; new queries can refill | Scope loop and an explicit query during pending release |
| 07 Await release | Backend completion/rejection changes; preservation claim and missing reconciliation are visible | Both ends of the old and new await chain, new expectations, PR disclosure |
| 08 Projection | Locations cached, empty results retained, nodes rehydrated, returned arrays may differ | Position record fields, node lookup, reference projection, identity assertions |
| 09 Input | Snapshot becomes readonly files; assignment precedes clearing; reason absent | The two signatures and caller extraction |
| 10 Handle lifetime | Scope owns clearing; handles/registry/files survive; refill is allowed; omitted lifetime operations are visible | Minimal public interface, persistent registry, in-place sweep, reuse assertions |
| 11 Late settlement | Eviction is not cancellation or revocation; old work cannot replace a new cache entry | The old/new promise test and lack of settlement writeback |
| 12 Tests | Six service + four core additions; five original tests and helpers unchanged; no separate unrelated feature found | Exact inventory, source-tail comparison, author’s commit sequence |

The original service test tail, beginning at “shares one reference search across caller and reference projections” through the end of the file, is identical across base and head. This is stronger than comparing test names. No original assertion was weakened or removed in that file. The core test file is new. The remaining changed files are the service, backend, core implementation, and core export; no unrelated feature was found in that complete diff. The API changes are explicitly disclosed in the PR, and are not mislabeled as unrequested.

## Rationale classification

Nine threads are marked **stated**. Four use explicit PR reasons (six handles, membership, refresh, clear-before-release); ownership uses the spec; retained identities/projections/settlement and characterization use the explicit preservation constraint and commit/test intent.

Three threads are marked **unexplained**:

- 07: The author names an awaited barrier, but does not explain how altered caller-visible completion and rejection fit the claimed failure preservation. The artifact describes the difference and does not judge whether it is desirable or correct.
- 09: The author documents narrowing `beginTurn` to files but does not provide a specific reason. A plausible decoupling explanation is deliberately not attributed to the author.
- 10: The author documents the minimal scope/handle API and tests repeated release/reuse; a specific reason for its public capability split and non-terminal release semantics was not found. Generic contributor advice was not promoted into a decision-specific rationale.

## Navigation hypothesis

Address = `(decision, depth)`. A decision change leaves depth invariant; a depth change leaves decision invariant. The two moves commute. The long surface and the four vertical depth threads stay visible; the reader moves a crossing through them. This is coordinate selection in a product space, rather than the playbook’s graph of arbitrary related-node links or a hierarchy with parents and children. It uses no semantic zoom. The word “loom” describes the navigation; it is not a claim that the daemon or its cache is a loom.

The fallback unroll expands the exact same content into ordinary linear reading and printing. Returning restores the selected crossing. URL fragments preserve coordinates without storing comments, verdicts, or reading progress.

## Verification and limits

- `capture-evidence.py` verifies each source against `git show` at the named revision before embedding its lines and SHA-256 digest. All evidence paths resolve locally; the artifact itself requires neither the worktrees nor a server.
- `browser-check.js` was run in an isolated Chromium context through the Playwright tool. It exercised all 48 crossings, coordinate independence, source rendering, keyboard controls, fragments/history, unroll/return, and 1440px/390px layouts. Browser errors and SVG text leaving its view box were checked. Screenshots were inspected for the opening, active loom, and mobile evidence view.
- Two focused head suites ran: 11 service tests and 4 core tests passed. The raw output is in `evidence/focused-test-run.txt`. The full CI sequence and end-to-end parity suites were not run; no PR correctness conclusion is claimed.
- The artifact contains diagrams of source order and test contracts. They are not recordings and do not execute a cache simulation. Time-like diagrams say that their spacing is schematic.
- The complete surface is deliberately long. It is a completeness experiment, not evidence that twelve threads are the right amount for a reader.
- The rationale boundary and surface/depth mapping were manually checked. The UI test that preserves a summary does not establish the semantic pyramid invariant by itself.
- No human recall, navigation preference, or comprehension study was performed. Whether the loom helps is still the experiment’s question.

No symnav tracked file was edited. Test execution wrote only ordinary build/cache output and temporary fixture data. Only this experiment folder was authored; the orchestrator’s queue, index, and commits were left to the orchestrator.
