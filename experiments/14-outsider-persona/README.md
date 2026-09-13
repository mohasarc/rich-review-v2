# outsider-persona

## Entry point

Open [index.html](index.html) directly. On this Mac:

```sh
open ~/projects/rich-review-v2/experiments/14-outsider-persona/index.html
```

No server, installation, network connection, or account is needed. JavaScript powers the decision sheet, source drawer, and illustrative walkthroughs. The opening maps also render without it. GitHub links are optional evidence exits.

## Kind

page

## Subjects

`stack`: all 26 PRs, from `main` at `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` to #149 at `d07002357d3e9596bfaae910a1ac63b77981620b`. One intermediate #148 test snapshot explains a temporary source-copy check; it is explicitly marked as historical.

## Declared choices

- Role framing: guide to an unfamiliar system, followed by a textbook-style explanation of its decisions.
- Box lenses: runtime topology and static package ownership; data lifetime is a supporting lens. The worker/executor injection seam is marked on the runtime map, and transferred responsibilities are bordered on the package comparison.
- Opening style: product input/question/output sketch, then a deliberately lossy “keep the workshop open” analogy. It introduces the product before any PR numbers or implementation details.
- Shape: an atlas, a complete choice sheet, and three deeper walkthroughs. The first viewport is orientation, not the complete top layer.
- Navigation: read downward, jump from a system box to its decision branch, expand an individual reason, open frozen source in a drawer, close back to the same location. Branch return links and hash anchors support nonlinear reading.
- Trust posture: explain the stated design; inspect changes beyond the stated architectural moves. General reasons for test migration are distinguished from missing reasons for dropping particular composed observations.
- Persona: a developer who has never used symnav and does not know its CLI, daemon, or package names.
- Representations used: product sketch, process/thread containment map, before/after package map, import-direction table, decision disclosures, policy tables, stepped command traces, lifetime matrix, record-transfer diagrams, and source comparisons.
- Importance rule: first establish what the product does and which boundaries mean process versus package; then explain state, acceptance, and delivery. Test-observation changes, API removals, deferred behavior, and an adjacent PR-template edit are first-class choices alongside package moves. File size does not determine importance.
- Inputs used (beyond bundle): read-only Git objects from the supplied main/stack-head history, selected production and test implementations, README, contributor/dependency rules, product and daemon functional specs, architecture spec, policy record, and follow-up spec. The PR bundle's bodies and commit metadata supply the recorded rationale. Git supplies the equivalent combined diff with rename detection. The overview text bundles were not used.
- Tech: static HTML, CSS, and vanilla JavaScript; Python's standard library and Git freeze the evidence. No dependencies or generated raster artwork.
- Built on earlier experiment(s): none. Earlier experiment outputs were ignored. Existing harness/worker log files in this assigned folder were not used or edited.

## What I tried

Started from the product and two separate maps. Combining package ownership and runtime topology into one box system would make the new daemon package look like a new process, so the page shows those views separately and marks the executor injection boundary.

Mechanically extracted all 117 PR decision entries, then added 25 records from source, plans, public-surface removals, and changed tests. The sheet keeps each choice visible while its rationale opens below it. The policy record contributes 44 values/recipes and five deliberate deadline absences.

The cache example initially needed only “warm versus cleared.” Source inspection showed that was too coarse: a selected-file refresh evicts omitted source bytes while preserving omitted prepared-file entries. The final example shows four lifetimes and separately bounded publication. An apparent compatibility-hash change also proved to be an intermediate test mechanism, so it is marked historical rather than presented as runtime behavior.

The first narrow-phone check found a long decision label overflowing by a few pixels; text wrapping was corrected. One dependency-table source pointer was corrected to line 86.

## What I would drop

Some repeated source links and the final teach-back answer. The 44-row policy table is demanding for this persona; a later experiment could compress it visually while keeping every choice available in the top layer. I would retain the separate process and package maps.

## What I would do next

Ask a reader new to symnav to redraw the process/package boundaries, distinguish byte-cache eviction from index retention, and explain why acceptance changes recovery. The browser checks do not measure comprehension.

## Time spent

About 36 minutes, including source inspection, implementation, and browser checks.

## Validation and limits

- [verification.json](verification.json) records 56 browser checks: all 117 PR choices and 44 policy rows, map navigation, reason expansion, original PR/commit access, before/after/diff switching, Escape/focus return, four request scenarios containing 20 steps, four cache events, both transfer modes, and evidence search. Desktop, tablet, 390 px phone, and 320 px phone layouts had no page-wide horizontal overflow. No script errors or HTTP requests occurred.
- A final source-pointer pass checked 455 rendered and scenario source references for availability and line bounds. The corrected dependency-table highlight was inspected in the drawer.
- [screenshots](screenshots/) contains seven views, including phone and mechanism views.
- Both supplied worktrees had no tracked changes when checked. The evidence builder reads Git objects and writes only into this experiment folder. No symnav build, daemon invocation, correctness suite, commit, or branch operation was performed.
- The demonstrations are explicitly illustrative, not executions or performance measurements. Author-reported verification remains attributed to the original PR material.
- “Unexplained” means no specific reason was found in the inspected PR bodies, commit bodies, and plans. It does not claim that no rationale exists elsewhere. A general package-boundary rationale does not establish equivalence between a removed CLI scenario and a related package test.
- The mechanical test-title screen reports 40 baseline titles absent verbatim at head. Renames count as absent; parameterized cases are not expanded; assertion changes under unchanged titles are not detected by that screen. Its unique-title counts are not suite test counts or coverage evidence. Material observation changes found by diff inspection are already on the choice sheet.
- The maps and six opening premises are explicitly lossy indexes. The complete choice sheet precedes the detailed walkthroughs so the walkthroughs elaborate already introduced decisions. This makes the top layer long; that is the central tradeoff of this experiment.

## Files and reproducibility

- [index.html](index.html), [style.css](style.css), [content.js](content.js), and [app.js](app.js): the page, authored explanations, and interactions. No comments, verdicts, or reviewer responses are collected; controls retain only in-memory display state.
- [evidence.js](evidence.js): frozen source, diffs, original PR bodies, commits, policy rows, and the test-title screen. It contains 254 changed file pairs, six unchanged context pairs, and one historical test pair. It is about 5.6 MiB.
- [evidence-manifest.json](evidence-manifest.json): exact revisions and inventory. The combined delta is 254 files, +27,533 / −8,698 with rename detection.
- [build.py](build.py): regenerate evidence with `python3 experiments/14-outsider-persona/build.py` from the rich-review-v2 root. This requires the supplied bundle and Git objects; opening the finished page does not.
- [verify-browser.js](verify-browser.js): the browser-check function used through the Playwright tool. It creates and closes an isolated browser context, leaving other agents' pages alone.
- [brief.md](brief.md): the supplied brief, preserved.
