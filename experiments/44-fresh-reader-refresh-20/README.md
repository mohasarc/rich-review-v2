# fresh-reader-refresh-20

## Entry point

Open [critique.md](critique.md) in a Markdown viewer. It contains one table with 39 entries: decisions learned from each page, later diff misses/corrections, and observed rule-4 surprises.

```sh
open ~/projects/rich-review-v2/experiments/44-fresh-reader-refresh-20/critique.md
```

The two observed parent-to-depth surprises are in 04 and 27. Source receipts and captured readings are linked from the table. No server or installation is required; the temporary browser-preview server has been stopped.

## Kind

critique

## Subjects

No direct subject was assigned. The finished pages reviewed cover `pr-127`, `pr-131`, `pr-148`, `stack`, and the adjacent pair #146/#147.

The cohort was frozen at **2026-09-13 03:52 UTC**: all primary subject pages in experiments **01–37**, plus **32/starter.html** and **33/failure.html**. Multi-subject tabs remain together in their page's row. The generic method/kit documentation, templates and source viewers are supporting material rather than additional subject pages. Critiques 38/41 were excluded; 39/40/42/43 had no finished README at that cutoff. Later completions were not added mid-pass.

## Declared choices

- Role framing: Reader first, evidence auditor second. Preserve mistaken learning instead of repairing it retrospectively.
- Box lenses: Static ownership and runtime/lifetime boundaries, assessed through what each page taught; failure and test-observation boundaries receive the same attention.
- Opening style: The observed surprises first, followed by the reading method and the complete comparison table.
- Shape: One Markdown table; linked source receipts and raw capture files provide checking depth.
- Navigation: Read rows in experiment order, or follow a page, captured text, or E-number to its supporting evidence.
- Trust posture: Separate recall misses, omissions on inspected routes, incorrect explanations and observed descent surprises. No blanket claim of page completeness. Wide-subject diff inspection was selective; prior probes were not rerun.
- Persona: One sequential reader with growing familiarity across repeated subjects. This is not an independent-reader experiment or a measurement of human comprehension.
- Representations used: Compressed teach-back, before/after comparisons, exact source excerpts, browser text/interaction captures, and three screenshots for visual inspection. Audio quality and mobile layouts were not evaluated.
- Importance rule: Keep decisions about observable outcomes, authority, identity, timing, lifetime, public contracts, rationale and changed test observations. A small behavioral or evidence change matters alongside a package move. Do not manufacture a miss when the diff supports the reading.
- Inputs used (beyond bundle): `philosophy.md`; playbook sections 1, 2, 3, 6, 7; rendered earlier experiments and their Entry point/Kind/Subjects metadata; the sibling `inputs/pr-127`, `inputs/pr-131`, and `inputs/pr-148` bundles; pinned git objects for before/after source, the policy plan, and #146/#147 diffs through the read-only stack-head worktree. The stack-head source was also read directly at selected paths.
- Tech: Playwright browser reading through a temporary local HTTP server; Python for immutable recall joining, patch inventories, source extraction, exact test-suffix comparison, link checks and hash comparison; Markdown/JSON output. No symnav execution or worktree edits.
- Built on earlier experiment(s): **01–37 were read as critique subjects.** Their implementations and probes were not reused. Only completion metadata was read for critiques 38/41; their critique prose was not read. No earlier critique supplied this table's conclusions.

## What I tried

I first read each page's declared stopping layer and selected deeper routes without opening an independent bundle diff. Page-authored examples and source strips were allowed. Each row records its route. Explicitly required decision sheets count as part of the top; the first viewport alone does not. Raw-source appendices and exhaustive file inventories were not the page-only reading task.

I locked the compressed teach-back at **04:05:51 UTC** in [locked-recall.json](locked-recall.json), then opened the diffs. The table reproduces that column unchanged. This catches false learning as well as absence: pages 01 and 22 taught first configured ownership, while the source's primary lookup keeps the last configured owner. Conversely, page 06's fresh local executor and page 30's graceful shutdown order were present at the top but absent from my teach-back. Those are recall misses.

The diff pass read the complete #127 six-file patch and #131 production/test patch. For #148, the adjacent pair and the stack, it used the complete changed-file inventories plus selected production, contract, test and rationale hunks. The [source receipts](audit/source-witnesses.md) state that limit. This is sufficient to support the listed findings, not an exhaustive independent inventory of every decision in the wide subjects.

Broad body dumps were awkward: long file inventories dominated, and one animated canvas capture included offscreen/transient content. I used named routes and saved the captures; the 23/D04 transient capture is explicitly excluded. Initial selector failures on 03 were followed by successful load/test-surface captures. No unsuccessful capture is treated as evidence that a page omitted a decision.

The observed rule-4 flags require an actual parent-to-authored-depth change: 04 contradicts its own disclosure claim, and 27 introduces a different test-stimulus decision in its adapter descent. Separate omissions and top-to-source contradictions remain visible without pretending an unvisited drawer was tested. Page 19's openly limited type-only view is recorded as insufficient for a whole-PR stopping layer; the labelled one-decision starter in 32 is retained as a fragment.

[Report verification](audit/report-verification.json) confirms 39 unchanged recall cells and 183 resolved local links, excluding the README while it was being written. [Cohort comparison](audit/cohort-drift.json) found no changes in 445 inventoried README/presentation files between snapshot and final check. That hash comparison does not cover every media or evidence dependency. [Source accounting](audit/source-accounting.json) confirms the five original #127 tests/helpers are byte-identical and records the three added #131 constructor double casts.

## What I would drop

The large raw browser dumps earn their place as receipts, not as reading material. I would also drop any attempt to rank these pages from this run: shared subjects prime later readings, routes differ, and neither time-to-understanding nor independent recall was measured.

I dropped the premise that every row needs a newly discovered flaw. Several #127 pages prepared all the decisions found in the small patch; the table says so with that bounded scope.

## What I would do next

Repair the parent statements identified in 04/27 and the incorrect owner fact in 01/22, then assign separate unprimed readers to the revised pages and lock their recall before showing the diff.

## Time spent

About 40 minutes for this reading and audit pass. Cohort snapshot: 03:52 UTC; recall locked: 04:05:51 UTC; final checks around 04:30 UTC. Earlier experiment generation and harness retries are excluded.
