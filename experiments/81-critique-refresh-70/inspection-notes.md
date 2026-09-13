# Reading and evidence limits

These notes support the [critique](critique.md) and [78-entry ledger](experiment-ledger.md). They record what I did, so that a broad reading pass is not mistaken for exhaustive source verification or a human study.

## Scope and required reading

I read [philosophy.md](../../philosophy.md) first, followed by the required playbook sections 1, 2, 3, 6, and 7. I also used the playbook's other sections as context, particularly the warning against a leaderboard or a gold answer key. I read earlier experiments rather than ignoring them. I did not access the failed v1 repository.

The subject is the finished experiment corpus, not a new symnav PR explanation. Targeted #127 and #148 reads resolve claims in that corpus. The initial census found 01–76; 77 and then 78 acquired README handoffs during the reading pass and were included. The closing census is **2026-09-13 11:52:58.516578 UTC / 14:52:58 Istanbul**, with 01–78 finished and 79, 80, and 82 unfinished. All 78 finished folders also had a matching queue-done file at that census. Experiment 81 is excluded from its own set.

The operational completion definition is a root README handoff, including an explicit negative result. That is why 56, 58, and 60 are included. Their README reports of worker interruption are not treated as proof that the planned forms failed pedagogically. I did not inspect unfinished work as though it were a finished artifact.

[scope-start.json](scope-start.json), [scope-current.json](scope-current.json), and [scope-final.json](scope-final.json) preserve membership observations. The latter contains README hashes, required sections, root artifact names, and independent queue status. It is a census and contract snapshot, not an immutable copy of every underlying artifact. The frozen cutoff prevents concurrent completions from making the reading task indefinitely moving.

## Reading depth

Every finished experiment received README reading: subjects, declarations, entry point, what was tried, what would be dropped, and what would follow. The main teaching artifacts received rendered text inspection, including their openings and heading structure; I then read selected complete-layer and deeper passages relevant to the critique. For 61–78 I read the visible complete teaching registers more extensively. Very large locator banks, all hidden source drawers, every generated record, and every README appendix were not read line by line.

For Markdown critiques I read their main findings, structure, scope, and selected witnesses, rather than treating their README summaries as the entire artifact. For HTML critique/intervention reports I read the report text and inspected selected companion surfaces. Additional methodological reading included 31's runbook, 32's kit contract, 49's intervention report and page copies, 52's comparison, 56's partial protocol, and 59's repaired comparison and ancestor audit. The negative handoffs were read as incomplete work with documented limits.

Consequently, this report does **not** certify that every artifact obeys every hard rule. An older critique's specific finding is attributed as such where I did not reproduce its route or source probe. The direct correction claims and the 64 comparison-state finding have their own current witnesses. I do not turn “I did not see it on this route” into “it is absent everywhere.”

The new briefs also matter as inputs. The recent representation briefs, beginning with [61](../61-pixel-causality-grid/brief.md), explicitly permit a narrow lesson without the whole PR or stack. I use that declared scope when discussing their completeness. A small root is not evidence that whole-stack compression is solved; a narrow artifact's intentional exclusions are not automatically rule-4 violations.

## Local browser capture

[capture.mjs](capture.mjs) adapts the local capture approach used by experiment 54. It serves the experiment files through an ephemeral loopback server and uses the already installed Playwright package at `/tmp/rich-review-05-browser/node_modules/playwright` with the local Chrome channel. The viewport is 1440 × 1000 with reduced motion requested. External network requests are blocked. The script writes only into this experiment's `reading/` directory.

The first pass captured **77 HTML entries**; the follow-up captured 78's main entry, for **78 entries total: 66 primary entries and twelve companions**. These counts are documents, not people, independent trials, or finished experiment counts. Markdown critiques and negative results do not require a browser entry.

The companion set is 31's method and record, 32's kit, 33's failure variant, 49's four original/revised page copies, 52's compact/fuller pair, and 59's two corrected baseline copies. The primary entry exceptions are 22's `game.html` and 55's `review.html`; other captured primaries use `index.html`.

Each capture includes body text, SVG text, selected document metadata, and a viewport screenshot. [The main manifest](reading/manifest.json) and [the 78 follow-up manifest](reading/manifest-selected.json) record no navigation exception or uncaught page error. This is an availability check under the harness, not proof that all assets, all controls, or all viewports work. Collected text may contain repetition between DOM and SVG and must not be used as an automatic proposition count.

I visually inspected the captured desktop views for 23, 63, 68, and 70 and the operated views for 64's split, 65's #148 lift, 69's held promise, 74's worker receipts, and 75's pending append. The other screenshots are receipts available for checking, not a claim that I visually inspected every pixel of all 78 documents. I did not evaluate audio or perform a phone, screen-reader, or comprehensive keyboard audit.

## Operated routes

[inspect.mjs](inspect.mjs) opens selected artifacts from `file://` in a fresh browser context, with the same desktop size and reduced-motion preference. External HTTP(S) requests are blocked. It saved 27 states. [recheck.mjs](recheck.mjs) saved four additional states after correcting two operator mistakes. Both runs completed and their manifests record no uncaught page errors or route exceptions.

| Artifact | Action and observed state | Receipt |
| --- | --- | --- |
| 36 | Select service-return identity, then reference locations. The selected lens and reference channel are preserved in the state record. | [Text](operations/36-service-reference.txt) |
| 61 | Select sampling rejection and cleanup rejection, then move the stream playback to its ending. | [Sampling](operations/61-sample-rejection-end.txt), [cleanup](operations/61-cleanup-rejection-end.txt) |
| 64 | Jump to the split, then select the rejection case. At the split the two 7/15 positions name different selected events and different cache stages. | [Split screenshot](operations/64-split.png), [split text](operations/64-split.txt), [rejection](operations/64-rejected.txt) |
| 65 | Try the staged-body lift at #148 and at #149. The model distinguishes an active local CLI body from a caller that now depends on the package. | [#148](operations/65-lift-148.txt), [#149](operations/65-lift-149.txt) |
| 68 | Inspect a starting record and a pong with both version/state faults; find the return, go to evidence, then return to mechanism. | [Two-fault state](operations/68-pong-version.txt), [return metadata](operations/68-return-to-mechanism.json) |
| 69 | Jump to Hold, press the actual P₀ token, then release it. While held, lookup points to fulfilled P₁ and caller-held P₀ is pending; after release, P₀ fulfills and lookup still points to P₁. | [Held](operations/69-pointer-held-p0.txt), [released](operations/69-pointer-released-p0.txt) |
| 70 | Select Registry, then the before state. The selected consumer and authority representation change. | [Registry](operations/70-registry.txt), [before](operations/70-before.txt) |
| 72 | Show the outcomes of a lying retry bit and two simultaneous admission failures. | [Lying bit](operations/72-lying-retry-bit.txt), [two failures](operations/72-two-failures.txt) |
| 74 | Select equal 250 ms values, open receipts, change to Worker × Output, then Command capture × Output. The URL and selected depth remain at receipts while the consumer changes. | [Worker metadata](operations/74-worker-receipts.json), [capture metadata](operations/74-capture-receipts.json) |
| 75 | Select “Hold the first append,” advance to the actual barrier, then release it. Captured records/next offset advance from 0/0 to 1/1 only after the append checkpoint completes. | [Pending](operations/75-append-pending.txt), [released](operations/75-append-released.txt) |
| 77 | Select active-use and test-movement films, open the source drawer, then Escape. The selected specimen persists and focus returns to `inline-inspect`. | [Source metadata](operations/77-source.json), [return metadata](operations/77-source-return.json) |

The initial 69 route pressed the single-step button instead of holding the token. The initial 75 route stopped after one advance, before reaching the barrier. Their old files are preserved in the first manifest, but are **not evidence of the intended hold operations**. The four states named `pointer-held-p0`, `pointer-released-p0`, `append-pending`, and `append-released` are the corrected observations. These were operator mistakes, not artifact failures. [The original manifest](operations/manifest.json) and [recheck manifest](operations/recheck-manifest.json) preserve the distinction.

The browser runs operate the authors' interactive models and frozen recordings. I did not rerun their source probes, launch a daemon, compile their worktrees, or infer that animation timing is actual execution timing. In 72, the page's frozen admission gates execute, but the complete network/daemon system does not.

## Three direct source witnesses

The exact excerpts, source revisions, bundle hash, and tracked worktree status are saved in [source-witnesses.json](source-witnesses.json). Reads use the supplied stack bundle and Git objects accessible through the allowed `stack-head` worktree.

1. **Configured primary ownership.** At #127 head `64919bcbcf7fcc8202779b78c5f069b24662bb18`, `packages/core/src/workspace/project-graph.ts:319–339` iterates configurations in order, appends each owner to the owner list, and overwrites the primary map entry for each matching file. “Last configured owner wins” is my inference from that loop. It contradicts 01's current root phrase “first configured owner wins.” The stack-head working file has the same loop.

2. **Release disclosure versus rationale coverage.** The supplied `inputs/stack/pr.json`, PR 127 body lines 22 and 25, explicitly names an awaited backend release boundary and an awaits-release edge. Line 80 states a reason for synchronous clearing before release can wait or reject. This is enough to reject 04's unqualified “PR body silent.” It is not a claim that the author separately justified every changed rejection outcome or reconciled every historical specification statement.

3. **Temporary policy export retirement.** At #148 head `20838f8dbf413e04767543eb2380d0d114da6c60`, `plans/005/daemon-policy.md:66` says: “Phase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local.” That is a documented removal condition. It does not explain every deleted lint check or test choice. 63 and 77 should split these claims; the evidence does not warrant labeling their whole combined sentence “stated.”

The stack bundle is pinned to main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` and tip `d07002357d3e9596bfaae910a1ac63b77981620b`. I made no source edits, builds, commits, pushes, or rebases in either allowed worktree. Tracked status was clean when captured. Other experiments' artifacts and original comparison copies were also left unchanged.

## How section 1 was used

This is an explanatory-artifact critique permitted by section 2, with no assigned PR subject and no page. It is not an audit of whether the symnav implementation is correct.

| Rule group | Question used in the critique |
| --- | --- |
| Scope and explanation, 1–3 | What did the brief actually authorize this artifact to teach? Does it expose a decision for human judgment without collecting a verdict? |
| Pyramid and early intuition, 4–5 | Does the declared stopping layer name the consequential meaning found below? Is it manageable, separately from whether it is technically complete? |
| Local limits, 6 | Does the representation state where analogy, selected events, counts, or geometry cease to be exact? Does the visual still invite an unsupported stronger inference? |
| Boundaries and decisions, 7–8 | Can the reader distinguish package, process, ownership, and active use? Are test changes and migration exceptions attached to the claim they qualify? Is a reason actually documented? |
| Navigation and substitution, 9–10 | Does depth preserve subject and return context? Does a picture replace a redundant explanation or add a new decoding task? |
| Openability and handoff, 11–14 | Can the artifact be opened as declared? Are inputs, choices, abandoned work, and limits reported? Were the worktrees left untouched? |

No numeric compliance score follows from these questions. The critique's broad conclusions are interpretations of this reading set; the linked witnesses permit narrower factual checks. There was no human participant, no fresh-reader claim for this run, and no attempt to treat agreement with an architectural preference as a correct answer.

## Handoff checks

[verify.py](verify.py) checks the 78-entry accounting against the frozen census, README headings and declarations, local Markdown link targets, receipt counts/errors, artifact presence, and the absence of a generated HTML page in this folder. [verification.json](verification.json) records the result. These are mechanical handoff checks. They do not establish semantic completeness, validate the original probes, or measure learning.
