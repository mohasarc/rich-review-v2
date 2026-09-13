# How this critique was made

[Return to the findings](critique.md) · [All 53 experiments](experiment-ledger.md)

This is one informed editorial reading. Earlier artifacts and critiques primed it. It supplies new artifact observations and checks several source claims; it supplies no fresh-reader or human-learning result.

## Census and reading extent

I read `philosophy.md` first, then the required playbook sections. The supplied brief assigned no new symnav subject and asked for a written critique, so source access served only to check claims in other experiments.

The [initial census](scope-start.json) contained 50 finished folders: 01–49 and 52. Experiments 50, 51, and 53 finished during the reading and were included. The [review census](scope-current.json), captured at **2026-09-13 05:40:57 UTC**, contains all 53 root READMEs for 01–53, each with the required section-7 headings. The [final census](scope-final.json) at **05:58:55 UTC** found no additional handoffs and no changed README hashes. A root README is the handoff marker used here; queue status is recorded separately. Neither is evidence that the artifact satisfies its teaching claims. Experiment 54 is this critique. Experiment 55 had no finished handoff at either census and is not treated as a failed experiment.

Every root README was read, including the late arrivals. For every delivered subject page I inspected the opening, organization, captured decision headings, and selected teaching content. The ledger says which controls I additionally operated. Written critiques and reading reports were read for their arguments, comparison structures, and relevant findings; I consulted repeated rows and raw evidence selectively. I did not read every source mirror, watch the entire narrated artifact, exhaust every interactive state, or repeat all producers' executions. A default-page capture by itself is not full interaction coverage.

The method material received separate attention: 31's full runbook, 32's kit contract, 36's representation method, 49's reading protocol and selected sealed results, 52's transfer/findings/analysis of 40, and 53's design notes. The historical refreshes remain dated observations. Their agreement was not counted as independent support.

## New browser observations

[capture.mjs](capture.mjs) opens local files in a separate Playwright/system-Chrome context at 1440 × 1000 with reduced motion. HTTP(S) requests are blocked. [The first manifest](reading/manifest.json) records 45 successful entry loads, including the two openings of 33 and both treatments of 52; [the late manifest](reading/manifest-late.json) records 50/51/53. None emitted a page error during those loads. This establishes that these entries opened under those conditions, not that every control or external link works. Markdown-only reports were read as files.

The `.txt` captures contain body text and, for default entries, SVG labels in document order. Body text can include off-camera canvas rooms and content below the viewport. SVG labels can repeat the body capture. Consequently these files are searchable reading aids, not transcripts of what a human sees at one depth, and their word counts are not reading-time measures. Screenshots preserve selected viewports; only screenshots explicitly used in the ledger/findings received visual inspection.

[inspect.mjs](inspect.mjs) records these bounded operations:

| Artifact | Operation and observation | Receipt |
| --- | --- | --- |
| 16 | Move Lifetime into daemon, then imagine address/export repair. Address and exposure flags disappear; a forbidden dependency remains. | [Before repair](reading/routes/16-move.txt), [after](reading/routes/16-repair.txt) |
| 30 | Finish worker, first stream, latest stream, and resource sample in that order. A still awaits ACK and retains its result when B can start. | [Worker](reading/routes/30-worker.txt), [last checkpoint](reading/routes/30-sample.txt) |
| 36 | Select reference locations, switch cached identity to returned identity. Matrix and introductory explanation change; the old block captions remain. | [Cached](reading/routes/36-cached.txt), [returned](reading/routes/36-returned.txt) |
| 23 | Open D04 and D13 from the root and return Home between them. Optional policy and exact credential sets appear in the leaves. | [D04 viewport](reading/routes/23-D04.png), [D13 viewport](reading/routes/23-D13.png) |
| 37 | Keep mechanism depth while moving clear → await, descend to evidence, then return to shape. | [Clear](reading/routes/37-clear.txt), [await](reading/routes/37-await.txt), [return](reading/routes/37-return.txt) |
| 51 | Open all nine worked examples and select the final checkpoint of each. | [Examples](reading/routes/51-worked-examples.txt), [final checkpoints](reading/routes/51-last-checkpoints.txt) |
| 53 | Pull both handles, query during held cleanup, reject cleanup, reset, then fulfill it. Head can retain a new B while release is pending and later rejected; base release already fulfilled. | [Refill](reading/routes/53-refill.txt), [rejection](reading/routes/53-rejection.txt), [fulfillment](reading/routes/53-fulfillment.txt) |

These are interactions with authored models or recorded replays. They are not new source executions. For 53 I used its simultaneous-pull button, not a measured human drag or a haptic device.

The browser harness initially tried an unavailable bundled Chromium; switching to installed Chrome worked. A later route attempt accidentally encoded a URL fragment as part of a filename. After that was fixed, a nested-summary locator for 51 proved ambiguous; selecting the direct summary fixed it. [The first attempt](reading/routes/manifest-attempt-1.json) and [subsequent manifest](reading/routes/manifest.json) retain those harness failures. [51's successful rerun](reading/routes/51-manifest.json) supersedes its recorded locator error. None is reported as a defect in the subject artifact.

## New source checks and inherited results

[capture_sources.py](capture_sources.py) copies five pinned files with `git show` from the read-only stack worktree and extracts #127's supplied PR body. [The source manifest](reading/sources/manifest.json) records paths, revisions, useful line locations, and hashes. No symnav branch was changed or executed.

| Claim checked here | Witness | Limit of the inference |
| --- | --- | --- |
| 01/22 first-owner teaching | [Primary owner](reading/sources/primary-owner.ts), lines 154–160 and 319–340 | Repeated map assignment makes the last configured owner primary. This does not reverse the ordered all-owners list or FIFO discovery. |
| 04's release attribution | [Supplied #127 body](reading/sources/pr-127-body.md) | The await boundary is disclosed. That does not supply a reason for changing caller-visible completion/failure under a preservation promise. |
| Historical policy-test retirement | [Plan](reading/sources/migration-plan.md), lines 62–66 | Gives staged migration context. It does not justify every specific weakened assertion or enforcement choice. |
| Optional host policy and default | [Client runtime](reading/sources/client-runtime.ts), lines 85–100 | Shows the fallback construction. It does not turn the overall portability rationale into a stated reason for this separate choice. |
| Parent-before-worker validation | [Worker parent](reading/sources/worker-parent.ts), lines 78–100 | Parsing precedes Worker construction and handler registration. A full comparison of every old error channel would require more source. |
| 52's import/construction arrow | [CLI composition](reading/sources/program-policy.ts), lines 7 and 77; [diagram generator](../52-critique-response-52/build.py), lines 65–67 | The labelled dependency runs from the importer/constructor toward policy. A policy-supply edge may point the other way if named accordingly. |

The owner error, policy omission, historical reason, and changed-view caption were already discussed elsewhere. Independently checking them here makes them current receipts, not newly discovered issues. The shared dependency-arrow conflict in 52 is an additional finding of this refresh.

49's four-reader intervention, 51/53's source recordings, 52's word/geometry counts, unchanged component hashes, and its preserved mobile baseline are **producer results inspected here**, not replications. 49 supplied fresh agent sessions with staged packets and source withholding; it did not observe humans navigating the actual canvas. 52 explicitly has zero unfamiliar-reader observations. I make no claim about learning gains, natural stopping, owner versus outsider performance, whole-stack runtime parity, or execution of the full test suite.

## How the hard rules affected the critique

The main findings map to the required rules: A/B challenge parent completeness (4); C checks decisions and exact reasons, including tests (8); D checks early intuition, local analogy limits, edge meaning, and redundant representations (5–7, 10); E preserves the separation between understanding and correctness judgment (3). Selected operated routes inform navigation (9). The entry-load check and README census cover only the mechanical parts of 11/13/14.

Read-only learning controls are compatible with rule 2. A sketch, toggle, or hypothetical move does not become forbidden merely because it accepts transient input. Lack of approve/reject or comment storage is not counted against the philosophy. Rule 4 does not impose a one-screen limit; long complete layers and actual surprises are different findings. Rule 8's “unexplained” is bounded by the searched evidence, not proof that the author had no reason.

All writes for this task stayed in this experiment folder. I did not edit another experiment, build or modify symnav, change the shared index/queue, or consult the excluded v1 repository. No page or new product interface was built. The critique is a set of reviewable claims and next questions, without a score, leaderboard, or global pass/fail certificate.
