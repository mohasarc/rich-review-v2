# best-of-synthesis

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/40-best-of-synthesis/index.html
```

One offline page. No installation or server. JavaScript enables recorded-state selectors, cache inspection, identity matrices, and remembered return positions. The complete overview, mechanisms, contracts, checkpoint tables, and source disclosures also work without JavaScript.

## Kind

page

## Subjects

pr-127 — Scope semantic caches to one turn.

Base `a1e325a5ff979bdfa25babc5554621c8c0f20497` → head `64919bcbcf7fcc8202779b78c5f069b24662bb18`. Six files, +391/−67. No additional PR review.

## Declared choices

- Role framing: Learner who should be able to predict reuse, reset, and release completion before inspecting source.
- Box lenses: Static package ownership and per-service instance ownership; cache lifetime and the completion/error boundary.
- Opening style: A concrete recorded moment: both caches are empty while base backend release has fulfilled and head remains pending.
- Shape: Opening → ownership diptych → twelve visible decisions and an explicit stopping point → request, identity, boundary, intent, lookup, and contract mechanisms → source evidence and credits.
- Navigation: Continuous reading, question exits, linked diagram boxes, native source disclosures, exact return position/focus, and an optional decision-by-depth link matrix. No autoplay.
- Trust posture: Check predecessor claims against the supplied patch and pinned source. Distinguish the PR's declared awaited barrier, its stated clear-first reason, and the unexplained reconciliation with the plan's timing/failure promise. No correctness verdict or inferred author motive.
- Persona: The maintainer returning to a change they did not write. Basic TypeScript familiarity assumed; cache identities and cleanup boundaries explained.
- Representations used: Ownership diagram, paired recorded runs, eight-stop request tour, pairwise object-identity matrices, before/after contract tables, intent trace, lossy claim-ticket analogy, predict/reveal prompts, numbered source excerpts, and a changed-line coverage map.
- Importance rule: Put ownership, reusable cache semantics, and caller-visible completion first. Cover every changed line, while treating hunk assignments as an audit aid rather than proof that all decisions were found. Mark reasons at the stated decision's granularity.
- Inputs used (beyond bundle): Philosophy first; the required playbook sections; all 13 finished pr-127 experiments listed below; the assigned worktrees' relevant source, tests, exports, context-command order, architecture plan, and git objects. Read the bundle's PR body, commits, file summary, and complete patch. Overview text bundles, external web sources, and the failed v1 were not used.
- Tech: Native HTML/CSS/JavaScript; a Python standard-library generator; frozen local JSON and source text. No package dependencies, network requests, storage, or collected answers. Source recordings are replayed; this experiment runs no symnav build, probe, or test suite.
- Built on earlier experiment(s): Read all 13 finished experiments whose declared subjects include pr-127, including the pr-127 portions of multi-subject pages. Every contribution has a local credit beside its use and a row in the page's [credits](index.html#credits). The table below records the selected element, not a measured ranking.

| Earlier experiment | Element used |
| --- | --- |
| [01-unconstrained-a](../01-unconstrained-a/README.md) | Separate the package implementing a scope from the service owning its instance. |
| [04-textbook-chapter](../04-textbook-chapter/README.md) | Predict before revealing the explanation. |
| [09-diff-of-intent](../09-diff-of-intent/README.md) | Trace plan, PR disclosure, and implementation separately. |
| [10-tour-guide](../10-tour-guide/README.md) | Reuse its exact context-order recording that fills all six stores. |
| [17-executable-before-after](../17-executable-before-after/README.md) | Reuse four calls-fixture recordings, including held and rejecting cleanup. |
| [20-contract-table](../20-contract-table/README.md) | Show the changed completion contract despite an unchanged backend signature. |
| [24-question-driven-nav](../24-question-driven-nav/README.md) | Meaningful question exits with a remembered reading position. |
| [26-physical-analogy](../26-physical-analogy/README.md) | A caller's promise survives eviction from the cache drawer. |
| [31-method-runbook](../31-method-runbook/README.md) | Extract, rank, render; account for the full delta and map deeper facts to overview decisions. |
| [32-kit](../32-kit/README.md) | Native source disclosures, anchors, and backlinks that survive disabled JavaScript. |
| [33-pair-one-variable](../33-pair-one-variable/README.md) | Opening B's unfinished-cleanup question, grounded in 17's recording. |
| [36-be-weird-a](../36-be-weird-a/README.md) | Reuse its identity observations as two compact matrices: cached object versus service return. |
| [37-be-weird-b](../37-be-weird-b/README.md) | Move between decisions while keeping the same depth, or deepen one decision. |

The [census](evidence/review-census.json) records inspected entry/README hashes and the cutoff. Experiments 36 and 37 finished during this run and were incorporated. Experiment 15 explains pr-131 despite mentioning pr-127 in its subject-selection notes. Collection-wide critiques 38 and 41 declare no PR subject; their READMEs and briefs were checked for scope, and their critiques were not used. Unfinished reader-check experiments and stack-only artifacts are outside this census.

## What I tried

Composed one explanation around two boundaries, then gave each predecessor a specific job. Read their handoffs and pr-127 teaching content, plus relevant capture scripts and source/method material. Borrowed data from 10, 17, and 36; rebuilt the UI and prose. Bundled original capture code and provenance instead of requiring the original servers.

Reconciled contradictory accounts before composing the decisions. The PR does disclose the await chain. Clear-first ordering has a reason; changing backend completion under the plan's parity wording has no separate located reconciliation. The five old service tests and their helper tail are byte-identical, rather than modified to await release. Cached identity and fresh public projection are separate observations.

Replaced an early repeated-identity table with 36's matrix. Kept 37's navigation optional so it does not become another mandatory explanation. Corrected the project graph's package placement in the diagram, a double anchor offset, a 320-pixel fixture overflow, and a dialog-close handler that pulled keyboard focus away from the source destination. No full approach was abandoned.

Verification: [static checks](verification.json) validate 22 frozen source documents, all 32 displayed excerpts, every changed line across 15 hunks, local links, and the authored parent map. [Browser checks](browser-verification.json) exercised all twelve decision return paths, eight request stops, twelve cache dialogs, twenty boundary checkpoints, twelve identity selections, depth navigation, direct source fragments, and 320/390/768/1440-pixel layouts. Disabled-JavaScript reading was also checked. Six [screenshots](screenshots/01-opening.png) record the result. Both symnav worktrees remain free of tracked changes.

These are source-integrity and interface checks, not evidence of reader comprehension or symnav correctness. The page identifies each recording's controlled seam and fixture. There is no new runtime, performance, daemon-concurrency, or full-CLI parity result here. [Recording copy hashes](evidence/reuse-manifest.json) distinguish reused data from new work.

Rebuild from the bundled evidence with `python3 build.py`; check the artifact with `python3 verify.py`, from this folder. `build.py --capture` additionally requires the original prepared worktrees and predecessor recordings. `browser-check.js` is the function executed through the available Playwright browser tool, not a standalone Node command.

## What I would drop

The optional decision-by-depth index is the weakest addition: useful for comparison, but redundant with the continuous page's anchors. The full raw observation and coverage tables should stay behind disclosures. Thirteen useful elements still make a long page; requiring every predecessor creates reading cost as well as variety.

## What I would do next

Ask an unfamiliar maintainer to explain the change after stopping at the complete overview, then predict a reference-return identity and a held cleanup outcome. Compare whether the matrices correct a misconception that the simpler request counters leave behind.

## Time spent

About 50 minutes of this run, including predecessor reading, source reconciliation, late additions, implementation, and browser checks. No delegated agents.
