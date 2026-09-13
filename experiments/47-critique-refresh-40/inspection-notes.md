# Reading scope, checks, and limits

[Complete critique](critique.md) · [Experiment ledger](experiment-ledger.md) · [README](README.md)

## Census and reading order

I read `philosophy.md` first, then the playbook, including the required sections 1, 2, 3, 6, and 7. I used the additional material for the no-ranking/no-score constraint and folder/handoff conventions. No skill or delegated agent was used.

The initial census at **2026-09-13 04:06:35 UTC** had **42 finished experiments, 01–42**. Finished means the folder has a README and its brief has a matching `queue/done` marker. The [initial inventory](scope-start.json) records that evidence and file metadata. 43, 44, 45, and 46 subsequently finished and were read and incorporated. The closing inventory and final count are recorded in [scope-final.json](scope-final.json) and the README. Running work is not evaluated from draft files.

The closing cutoff is **2026-09-13 04:42:09 UTC / 07:42:09 Istanbul**: **46 finished experiments, 01–46**. Experiment 48 was still running; this experiment 47 is excluded from its own census. All 3,109 files inventoried in the initial finished set retained their recorded size and modification time. This is metadata stability, not an opening-time content-hash archive. Closing hashes cover immediate Markdown/HTML/CSS/JS files in each included folder.

Every included README and primary critique/report or subject explanation was read. The primary explanatory reading centers on the declared stopping layers, not merely the first viewport. Large callable/source archives, all animation states, every fixture permutation, and every generated evidence mirror were not read exhaustively. “Read all experiments” here means each experiment received an artifact reading and a specific ledger entry; it does not claim every file in every folder was inspected.

For the initial corpus I opened all **38 primary subject artifacts** (01–37 and 40), plus 39's HTML critique. I also opened 21's video wrapper, 32's starter, and 33's failure opening: **42 distinct HTML files**. Alternate subject views in 01 and 20 share their HTML files. 08/09/27 expose both subjects within the same primary artifact. The method/kit documentation was read as supporting material, not counted as extra subject reviews.

The late HTML report 46 adds one more distinct file, for **43 HTML files opened** overall. Its [captured text](reading/46-fresh-reader-refresh-30.txt) was read in full. The report and its README state its independent source-pass limit and later credited use of 39.

The earlier critiques/reports 38, 39, 41, 42, 43, 44, 45, and 46 were read in full, with selected supporting witnesses checked. Supporting reads included 31's `RUNBOOK.md`, 32's `KIT.md`, 33's `pair-contract.md`, 36's `METHOD.md`, 21's narration, and 40's reuse/provenance account. I used earlier critiques as leads to inspect, not as authority over conflicting primary material.

This was not a fresh-reader protocol. I had overlapping page knowledge and had read earlier critiques before some targeted checks. The late reader reports retain their own phase boundaries; their locked recall is evidence from those reports, not mine. Their source audits have different scopes and routes. I did not combine their tables into scores.

## Browser inspection

The primary capture opened local files at 1440 × 1000 in an isolated browser context with HTTP(S) requests blocked. [capture-pages.js](capture-pages.js) is the capture code. It saved rendered text, headings, controls, opening screenshots, and page errors into [reading/](reading/). All 39 initial primary/critique HTML opens completed with no recorded page errors. This is an opening check, not proof that every control or external-service mode works.

I inspected selected screenshots for 05, 13, 23, and 36, and the operated 30/36/40 states linked below. Most other screenshots are capture receipts, not independent visual assessments. Rendered `innerText` can include off-viewport text; semantic-zoom pages can retain other rooms outside the camera. Such text did not establish that all rooms were visually visited. 23's public room was entered by its actual button before interpreting that mechanism.

The initial harness could not use Node `require` or dynamic import through the browser tool. I changed it to return JSON and used a separate filesystem command to save the results. Two later selectors looked for visible button text as an accessible name and timed out on 07/23. Text-based locators then succeeded. Those failures were capture errors, not findings about a page. Intermediate records are in `routes-1.json` and `routes-2.json`; the successful remaining routes are in `routes-3.json`. [inspect-routes.js](inspect-routes.js) contains the final remaining-route pass. It does not recreate the earlier supplemental pass by itself.

<a id="routes"></a>
## Directly inspected routes and what they establish

| Route / receipt | Observation and limit |
| --- | --- |
| [01 #127](reading/01-pr127.txt), [20 #131](reading/20-pr131.txt) | Read the alternate subject surfaces, including 01's old-test-edit statement and 20's parent-side worker-validation decision. The latter capture includes a large callable archive that was sampled, not read method by method. |
| [04 initial chapter](reading/04-textbook-chapter.txt) | Its complete overview says “PR body silent”; later 4.9 says “The PR body shows it.” Both are authored prose. The source body supports disclosure. 46 corrected earlier critics' 4.8 destination; the captured heading confirms 4.9. |
| [07 initial](reading/07-stack-timeline.txt) → [selected #148](reading/07-selected148.txt) | “Existing idle timing” becomes construction/acceptance with readiness/completion deferred. This reproduces the 41/43 event-rule finding. |
| [23 initial canvas](reading/23-zoom-canvas.txt) → [Public client](reading/23-public-room.txt) | The entered public mechanism adds optional policy to host inputs. Other off-camera room text in the same capture is not another visited route. I separately read D22 from its data record when checking 44's hashing correction. |
| [25 pocket brief](reading/25-reader-sketch.txt) → [removed-test drawer](reading/25-removed-test-dialog.txt) | The drawer supplies the old 5 ms field's unused status. This changes the interpretation of the removed input, not just the source spelling. No drawing was submitted. |
| [27 initial](reading/27-test-honesty.txt) → [adapter expansion](reading/27-adapter-expanded.txt) | Row 05's spool threshold story gains the separate transport clamp/lost-same-state qualification. This reproduces 39/44's authored-depth witness; the concrete disk case is supported by their source work and other #131 artifacts. I did not run a new spill probe. |
| [30 worker finishes](reading/30-worker-finishes.txt) → [latest finishes](reading/30-latest-finishes.txt) → [sample finishes](reading/30-sample-finishes.txt) | B can start with the first stream blocked and no ACK. Both attachments existed before publication in this model. [Screenshot](reading/30-latest-before-first.png). This is illustrative model operation, not execution of symnav. |
| [36 cached R](reading/36-reference-cache.txt) → [returned R](reading/36-reference-return.txt) | The matrix changes to fresh service-return identities while the block captions and plot name remain tied to cached locations. [Screenshot](reading/36-reference-return.png). Reproduces 43's caption finding. |
| [37 clear/mechanism](reading/37-clear-mechanism.txt) → [await/mechanism](reading/37-await-mechanism.txt) → [await/evidence](reading/37-await-evidence.txt) | Decision and depth vary independently; the selected parent summary and reason remain visible. Verifies the route and attribution, not a reader benefit from the coordinate system. |
| [40 References stop](reading/40-request-references.txt), [position contact](reading/40-position-contact.txt) | Inspected a later request stop and switched the paired matrices' operation. [Screenshot](reading/40-position-contact.png). Replayed saved observations; did not run the backend. Separate one-file/two-file/request fixtures are explicitly labelled. |
| [32 starter](reading/32-starter.txt), [33 B](reading/33-failure.txt), [21 player](reading/21-video.txt) | Checked their declared scope and relationship to the full artifact. Read the narration separately. No auditory comprehension, mobile, accessibility, or independent opening-preference trial was performed. |

## Bounded source checks

The input bundle was `inputs/stack`. Historical branches named in its `pr.json` were resolved through the assigned read-only stack worktree. I did not modify a branch, build symnav, run a test suite, or start the optional execution server. The [source receipt](reading/source-checks.txt) contains the following checks:

| Question | Evidence used | Conclusion |
| --- | --- | --- |
| Was #127's awaited release disclosed? | The supplied #127 body inside `inputs/stack/pr.json`: after diagram, public signature, and decision prose. | Yes. The source explicitly gives a clear-first reason. A separate reconciliation with the preservation promise is a narrower unanswered question. |
| Was #148 test-export retirement planned? | `20838f8dbf413e04767543eb2380d0d114da6c60:plans/005/daemon-policy.md`, lines 62–66. | The policy plan supplies the migration condition. It does not explain every adjacent deletion or enforcement choice. |
| Which configured project becomes primary? | `a1e325a5ff979bdfa25babc5554621c8c0f20497:packages/core/src/workspace/project-graph.ts`, lines 319–339. | The loop overwrites the primary map for each match, so the last matching configured project wins. This supports the correction of 01/22. |
| Did an old #127 semantic test gain `await`? | Compare the five-case test/helper tail from base `a1e325a5` against head `64919bcb`. | The entire old tail occurs byte-identically at head. Six new service cases precede it. This is source accounting, not test execution. |
| Does parent policy parsing precede worker creation? | `b100221db48754656328391b878299c5a0bab443:apps/cli/src/daemon/daemon-navigation-worker.ts`, lines 78–97. | Parsing occurs before `new Worker`; malformed-policy rejection can therefore prevent spawn. No malformed-policy runtime probe was run here. |
| Does 23 deny portability context? | D22 from `23-zoom-canvas/data.js`; commit subjects `80d4afe0` and `cef67300` at #148. | No. It names portability/normalization and asks for the further digest-mechanism reason. The badge is broader than the detailed absence claim; 44's correction should retain that distinction. |

This is not an independent complete decision audit of the stack. For the broader diagnostic-test, warm-protocol, registry, fixture-cast, and optional-host findings, the critique identifies the earlier report or artifact supplying the evidence. Those claims were not silently promoted into my own execution results.

## Applying the hard rules

| Rule | How it informs this critique |
| --- | --- |
| 1 · Assigned subject | No new PR subject is invented. The assigned objects are the finished experiments; historical source reads check their claims. |
| 2 · Read-only | No approve/reject interface, stored comments, or user-response collection was requested or built. Their absence is not a gap in this round. |
| 3 · Explain, do not judge code correctness | Findings concern explanations, provenance, and learning. Matching probes and source contracts do not establish global correctness; no implementation verdict or leaderboard is given. |
| 4 · Pyramid | Distinguish a long complete layer, an honest partial supplement, a source-level omission, a false claim, and an actual parent/child surprise. Require a consequential proposition and a route before claiming the last. The critique's opening table carries all finding families. |
| 5 · Intuition early | Preserve openings that establish a useful boundary quickly. A motivating failure need not be a fabricated incident; 33/40 mark their controlled or illustrative basis. |
| 6 · Mark lossy things locally | Distinguish source-derived models, controlled real execution, and generic type/reference proxies where their results appear. A limitation label does not restore omitted decisions. |
| 7 · Units and boundaries | Check package versus process, implementation versus instance ownership, stored versus returned object, and the particular promise/event being tracked. A changed lens must change its interpretation. No new architecture picture is needed for this no-page critique. |
| 8 · Decisions and reasons | Test premises and unrequested work receive the same attention as architecture. Absence claims are bounded by source scope. Compound reason badges can obscure both known purpose and unanswered detail. Restricted inventories cannot certify all decision kinds. |
| 9 · Linear and nonlinear | The critique reads linearly or through its finding anchors, ledger, and receipts, with return links. Page navigation was sampled, not exhaustively audited. |
| 10 · Pictures before redundant prose | Praise representations for revealing a relationship; question repeated mechanism prose and stale captions. Tables in this critique compare parallel findings and witnesses; a decorative architecture diagram would add no evidence. |
| 11, 13, 14 · Openable, README, declared choices | Markdown is the entry; no server or dependency is needed. The README uses the required headings and records choices, prior work, limitations, and time. Local links are checked. |
| 12 · Symnav untouched | All writes made by this task are in experiment 47. Worktree operations were reads of files/git objects. Other concurrent workers' changes are not attributed to this task. |

The reading ledger and captured files are audit depth. They should not become a mandatory linear lesson or another argument that volume equals completeness. The final verification records structural facts about this handoff, not educational success.

[Return to the critique](critique.md)
