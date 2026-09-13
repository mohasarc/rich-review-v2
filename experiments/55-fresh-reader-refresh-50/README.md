# fresh-reader-refresh-50

## Entry point

Open [review.html](review.html). It works directly from disk with no server, install, build, or network.

```sh
open ~/projects/rich-review-v2/experiments/55-fresh-reader-refresh-50/review.html
```

The artifact is **one 53-row comparison table across 43 completed experiments**: decisions learned before the diff, decisions missed or corrected after it, and witnessed rule-4 surprises. All rows are initially visible. Filtering is temporary and stores nothing. [review.md](review.md) is the same table in Markdown; [witnesses.html](witnesses.html) contains 16 pinned receipts with return links.

Nine reading surfaces have witnessed rule-4 surprises, including repeated variants. The five recurring kinds are rationale attribution, optional policy, authentication partition, fixture translation, and queue-clock defaults. This is a bounded observation count, not a completeness score. Several complete #127 registers had no additional consequential miss in the full six-file diff.

## Kind

critique

## Subjects

None assigned as a new teaching page. The critique follows the existing pages' subjects: `pr-127`, `pr-131`, `pr-148`, `stack`, and the adjacent `pr-146`/`pr-147` pair in experiment 30.

The page-only cohort closed on **2026-09-13 at 05:43:01 UTC**, before any input diff was opened. It includes completed teaching/study experiments 01–37, 40, 49–53, their documented variants and the film/starter supplements: [53 routes](routes.json). Both subject tabs in 01 and 20 share their entry row. Critique reports 38/39/41–48, evidence viewers, build templates, abandoned attempts and unfinished 54 were excluded. Later finishes do not retroactively enter the sealed pre-diff pass.

## Declared choices

- Role framing: A reader records what an explanation taught, then compares it with pinned implementation evidence. No implementation-correctness verdict or ranking of pages.
- Box lenses: The reader's complete layer, deeper explanatory layer and source layer. Within findings, distinguish package ownership from process location; input ownership from failure timing; execution from delivery; and test assertions from the states their fixtures reach.
- Opening style: A four-step reading diagram and a concrete prediction problem: naming an owner can still leave a reader unable to predict a result.
- Shape: One comparison table with one row per documented reading surface. Supporting receipts contain exact source/page excerpts, not an additional hidden findings table.
- Navigation: Read every row in order, search temporarily, isolate witnessed rule-4 rows, or follow a finding to its pinned receipt and return. The complete critique is the introduction plus the whole table; the first viewport is an index to that layer.
- Trust posture: Sealed pre-diff recall; pinned base/head git objects; page quotations; source inferences explicitly distinguished from executions. An unremembered first-pass decision is not a claim that the text appears nowhere. “None witnessed” is not a pass certificate.
- Persona: One technically literate agent reading overlapping subjects sequentially. This is not independent unfamiliar-human research.
- Representations used: Reading-sequence diagram, one comparison table, saved rendered text, selected screenshots, optional line-numbered source receipts, hashes and a machine-readable row manifest. A comparison table serves this critique better than another daemon architecture illustration.
- Importance rule: Preserve decisions that change a prediction about ownership, accepted input, failure timing, replay, credentials, retained state, or test stimulus/oracle. Do not turn every additional number or source spelling into a rule-4 surprise. Record declared narrow scope separately from hidden depth.
- Inputs used (beyond bundle): `philosophy.md`; playbook §§1, 2, 3, 6, 7; the finished teaching pages and their documented variants; selected explanations on descent; pinned source context from read-only git objects, including the unchanged `plans/005/daemon-policy.md` at #148 base/head. No failed-v1 material, web research, or symnav runtime was used.
- Tech: Static HTML/CSS with a small in-memory filter; Markdown/JSON; Python standard library for receipts/verification; local Playwright/Chromium for browser reading and artifact checks. Existing Playwright availability under `/tmp/rich-review-05-browser` was used as tooling, not as evidence of page quality.
- Built on earlier experiment(s): Read the complete declared layers of all 43 teaching/study experiments in the cohort. Pages 49 and 50 supplied source-informed leads; their findings were independently checked against pinned objects, not credited as new blind discoveries. The initial README metadata scan also exposed critique summaries concerning 04/23/27. No earlier teaching artifact was edited or copied as this critique's implementation.

## What I tried

Read pages in the browser with preformatted source blocks withheld, write recall, inspect selected explanatory descents, then seal the notes and rendered-text captures before opening diffs. [The seal](before-diff-seal.json) records 85 hashes at 05:43:01 UTC; [source capture](source-capture.json) begins at 05:43:56. The learned column condenses [the first recall](notes/01-09-before-diff.md) and [remaining recall](notes/10-53-before-diff.md), which remain unchanged after sealing. Full rendered text sometimes includes off-camera canvas content; this is not an eye-tracking or independent visual-reading experiment. Not every drawer or simulator state was inspected, and film audio was not assessed.

The raw #127 git blobs resolve a conflict between pages: its old five test bodies and helpers are byte-identical. Page 01's “existing call gains await” claim is wrong. The PR body also discloses awaited release, contradicting page 04's “PR body silent” top label and agreeing with that page's own deeper paragraph. The final project graph selects the last configured owner. In #148, the policy plan records when `policy-testing` should retire; “no reason found” needs a narrower claim. These are explanation corrections, not symnav bug verdicts.

The source pass read the full #127 six-file diff; #131 production changes and selected helper/test/policy/benchmark context; #148 changed app/client/clock/registry/routing and test-boundary hunks plus the historical policy plan; selected #146/#147 session/ledger changes; and final-stack ownership/recovery/cwd/test-removal changes. All full pinned patches are saved. I did **not** perform an exhaustive line-by-line semantic audit of the 43,584-line net stack diff or every copied mechanism in #148, and ran no symnav suite, benchmark or malformed-input runtime probe.

I abandoned an “independent fresh reader” interpretation when the metadata scan exposed earlier findings. The page-before-diff sequence remains intact, but the report explicitly treats overlapping reads and donor leads as contamination. I also avoided counting equal variants as independent trials: 23/original23, 29/original29, and the compact/full 52 propositions match in captured rendered text.

Artifact checks are recorded in [verification.json](verification.json): cohort/table coverage, sealed hashes, local links/anchors, Markdown table structure, raw old-test byte comparison, browser opening and filtering. [browser-verification.json](browser-verification.json) also distinguishes the small post-source interaction check of 53 from the sealed reading pass. These checks validate this critique's delivery and provenance, not symnav correctness.

## What I would drop

The ambition to simulate 53 independent fresh readers with one sequential agent. Retain the honest recall/source comparison. Most full-page screenshots are archival overhead; the decisive evidence is a short top/depth quotation pair and the corresponding pinned source. Do not use the number of rows, decisions, or flags as a quality metric.

## What I would do next

Give genuinely unfamiliar readers one page and a few concrete prediction questions before source access. Promote the identified defaults, error boundaries and credential partitions, then repeat those same questions without introducing an unrelated layout change.

## Time spent

About 40 minutes, including the page-only census/readings, source comparisons, table, receipts and verification. No deadline was used. Work stayed inside this experiment; symnav worktrees and earlier experiments were not modified, and no commit or publishing action was performed.
