# Reading scope and hard-rule audit

This supports the six findings in [critique.md](critique.md). The [ledger](experiment-ledger.md) accounts for every finished experiment without ranking them. This document distinguishes this critic's inspection from predecessor reports and editorial inference.

**Completion boundary.** The first census contained 01–38. Experiment 41 finished during the first review; 39, 40 and 42 finished before the final census and were then incorporated. The final boundary is **2026-09-13 04:10:54 UTC / 07:10:54 Istanbul**, covering **01–42**. Finished means a `queue/done` brief and the experiment's README both existed. At that boundary 44–47 were running, 48 was queued, and this experiment was in progress. Their drafts were not assessed as finished work. The [snapshot](corpus-snapshot.json) preserves the earlier census and final scope with hashes. Later completions belong to a later refresh.

I read philosophy first and the required playbook sections before reviewing the corpus. All 42 README handoffs and delivered primary explanatory artifacts were read. For 01–37 and 40 this included rendered complete decision surfaces; for 38/41 their main critiques; for 39 its complete comparison table; for 42 its complete review table. Supporting ledgers, methods, source drawers and recordings received targeted inspection. This does not mean every mirrored source file, generated observation, worker log or possible UI state was read.

**What was inspected.**

| Material | Work performed | Limit |
| --- | --- | --- |
| 38 prototype entries, 39's critique entry, six companion pages | Opened all 45 distinct HTML files through `file://` in isolated offline browser contexts. Captured default rendered text and control inventories. Companions: 31 method/record; 32 kit/starter; 33 failure opening; 39 source-witness page. | No page errors were emitted on these loads. This is an opening check, not a full interaction, accessibility, storage or offline-functionality audit. |
| Alternate views | Opened 01's #127 view, 20's #131 view, and 22's worker and transfer stations. | Opening a station is not completing its exercises. |
| Depth and return routes | Expanded/closed 13's fixture row; entered 23 D03 and returned with Escape; opened policy-export records in 29/35; reproduced 07's #148 idle-event descent. | Specific observations; unvisited routes receive no completeness verdict. |
| Operated models | In 15 changed ping purpose with the same delay; in 30 settled the latest attachment before the first, then sampled resources; in 36 switched identity views; in 37 changed decision/depth and returned with Escape. | Actions on delivered models or recorded observations. No daemon or live symnav execution was started. |
| Visuals | Inspected selected layouts, including 13/23 openings, the late 40 opening, and 36's reference-return state. Additional screenshots are retained. | Capturing an image is not proof of inspecting every pixel. No responsive-layout survey was conducted. |
| Methods/media | Read 31's runbook, 32's kit guide, 33's pair contract, 36's method, and 21's narration, with relevant handoffs and rendered support pages. | No audio-quality, complete film-playback or human-retention test. |
| Attribution | Recovered #127's PR body from the stack bundle and the historical #148 policy migration section at its immutable head. Read relevant pinned-source witnesses from the new reader checks. | The wider source audits and runtime results remain attributed to their producers. |

The [browser inventory](receipts/browser-inventory.json), [late inventory](receipts/late-browser-inventory.json), [selected routes](receipts/selected-routes.json), [model routes](receipts/model-routes.json), [alternate views](receipts/alternate-views.json), and [idle descent](receipts/07-idle-descent.json) retain these observations. Capture scripts are Playwright-tool function files, not standalone Node programs.

The initial capture needed a fallback for an unnamed summary control. Several first-pass selectors also failed because accessible names differed from visible labels or a disclosure contained nested summaries. These were inspection-harness errors, not page defects. The final selected-route capture was rerun with corrected selectors; its six records and the eleven model-route records contain no harness error. The 36 caption mismatch remains an explanatory finding despite working controls.

**Independent attribution checks.** The [#127 PR-body receipt](receipts/pr127-body.txt) preserves the announced awaited boundary and the separate clear-first reason. This supports qualifying “PR body silent” without inventing an explanation for the parity tension. The [migration receipt](receipts/policy-migration.txt) comes from `plans/005/daemon-policy.md` at `20838f8dbf413e04767543eb2380d0d114da6c60`, read with `git show` in `worktrees/stack-head`. It supplies the condition for retiring the temporary testing export, without explaining every associated assertion or enforcement choice.

I did not reread the entire stack patch, independently rebuild every decision inventory, rerun producer probes, run symnav tests, or consult implementing-agent conversations outside the supplied material. No symnav branch, source file, sibling experiment, queue entry or shared index was edited. All authored output is in this folder; the supplied brief and supervisor files were retained.

**Playbook section 1.** These are applicability and evidence notes, not scores or certification of every artifact.

| Rule | What the critique establishes or leaves open |
| --- | --- |
| 1 · Assigned subject | This critique has no new PR subject. Existing symnav experiments are the objects of analysis; targeted source checks resolve their claims. |
| 2 · Read-only | Collected review responses are deliberately absent from this round. Temporary sketches and model actions can support learning. This critique is plain files. No request to add verdict controls follows from philosophy's eventual response goal. |
| 3 · Explain, do not judge correctness | Criticism concerns explanation fidelity, attribution and human understanding. A wrong primary-owner sentence is an artifact finding, not a judgment that symnav's algorithm is wrong. |
| 4 · Complete pyramid | A costly long top differs from a demonstrated deeper-only decision. Six complete findings precede elaboration here. Selected witnesses do not prove corpus-wide completeness. |
| 5 · Intuition early | Concrete boundaries, qualified metaphors and ownership pictures are widespread. 40's held-cleanup opening is a late example. This no-page critique begins with the collection's central tension and comparative table. |
| 6 · Mark losses locally | Strong disclosures distinguish illustrative dynamics, controlled recordings, measured identities and assertion scope at their use. Labels cannot substitute for precise nouns. Stated/unexplained serves rule 8. |
| 7 · Boxes and boundaries | Package, process, state and completion boundaries are usefully distinguished. 36 shows why a changed observation lens must also change its interpretation. This critique links existing visual evidence. |
| 8 · Every decision and its reason | Tests and API choices often receive equal visual standing with architecture. Rationale scope remains mixed; 19's restricted method cannot cover bodies/assertions. 39/42 add source/recall gaps. Counts cannot prove decision completeness. |
| 9 · Linear and nonlinear | Most entries provide ordered reading, jumps and returns. Selected routes operated successfully. This critique links its top to elaboration, originals and supporting records. |
| 10 · Pictures before duplicate words | Repeated strips, ownership prose and mirrored evidence add reading work. Different views earn space when they reveal different relationships. Comparison tables and links to actual pictures serve this written critique. |
| 11 · Openable | All inspected HTML entries opened locally; 17's optional live execution was not invoked. This critique opens as Markdown with no server. |
| 12 · Symnav untouched | Only read operations against the assigned worktree and bundles; no build output needed. |
| 13 · README | Every included experiment had its README at the census. This folder supplies the required handoff and brief. |
| 14 · Declared choices | Handoffs expose roles, lenses, methods, limits and attempted cuts. They are author testimony; declarations alone do not verify the rendered work. This critic's choices are in its README. |

**Other critics.** I read 38/41 after reviewing the earlier README corpus and prototype openings, then the late 39/42 comparisons after my initial draft. This is an informed editorial review, not a blind recall exercise. Their findings are credited. Reproducing 07, operating 36's lens, narrowing 29's attribution issue, and incorporating the late synthesis/recall work are the concrete refresh contributions. Agreement among agents is not a human learning result.

[Back to the critique](critique.md) · [Every experiment](experiment-ledger.md) · [README](README.md)
