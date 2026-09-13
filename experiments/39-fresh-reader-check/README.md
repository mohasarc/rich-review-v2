# fresh-reader-check

## Entry point

Open [index.html](index.html). It is one comparison table, works offline, and needs no installation or server.

```sh
open ~/projects/rich-review-v2/experiments/39-fresh-reader-check/index.html
```

The table links to the original pages, captured reading surfaces, and [source witnesses](evidence.html). A [screenshot](screenshots/table.png) shows its opening.

## Kind

critique

## Subjects

None assigned as a new review page. This critiques the finished experiments whose pages cover `pr-127`, `pr-131`, `pr-148`, `stack`, and the adjacent #146/#147 pair.

Scope was frozen at **2026-09-13 03:12:45 UTC / 06:12:45 Istanbul**. Finished meant a README and its documented explanatory entry point existed. That included **01–33 and 35**, or 34 experiments. The table has 42 rows after separating subject views and documented variants.

34, 36, 37 and 38 were unfinished at the cutoff; this experiment excludes itself. Later completion does not silently expand the cohort. Method guides, source archives, templates and embedded-player support files are not additional subject reviews. The standalone video and kit starter are included as explicitly limited supplements.

## Declared choices

- Role framing: A reader giving a teach-back account, then checking it against the change.
- Box lenses: The boundary between page claims and independent source; the boundary a test observes. The table preserves each page’s account of package, process and state ownership.
- Opening style: A small, explicitly simplified sequence showing page reading, sealed notes and source comparison.
- Shape: One four-column table. Every learned decision, miss and descent finding is visible before opening evidence.
- Navigation: Experiment order, row anchors, links to pages and source excerpts, and return links from evidence to the relevant rows.
- Trust posture: Preserve the initial account before correction. Distinguish recall misses, source corrections, declared limits and demonstrated surprises. Recorded intent is not an invented rationale or a correctness verdict.
- Persona: One technically capable outsider reading sequentially. Earlier pages can teach later ones; this is not a controlled trial with independent fresh readers.
- Representations used: Rendered page text, one comparison table, a small sequence diagram, captured navigation changes, pinned source excerpts and a screenshot.
- Importance rule: Attend to ownership, failure timing, recovery, test stimulus and the provenance of reasons. Do not turn omissions into scores, a leaderboard or an answer key.
- Inputs used (beyond bundle): Sibling `inputs/pr-127`, `inputs/pr-131` and `inputs/pr-148` bundles; read-only base/head source and git objects; the policy and follow-up plans; earlier pages and the entry/kind/subject portions of their READMEs; experiment 21’s narration transcript and player. #146/#147 diffs were generated from the supplied stack commit endpoints. No external service was needed.
- Tech: Python standard library generates static HTML/CSS and evidence from JSON records. Playwright reads pages and checks the delivered artifact. No browser framework or runtime dependency.
- Built on earlier experiment(s): **01–33 and 35 were read as the objects of critique.** Their implementations were not reused. Embedded claims and test reports were reader input; separate builder audits, validation reports, extraction inventories and another critique were not used to seed recall. The actual page-only record is retained rather than replaced with a synthesized consensus.

## What I tried

I read the philosophy first, then the requested playbook material. I collected the finished-page census before reading the pages, then wrote all root recall notes before opening independent diffs. Alternating page/diff/page would have let the first diff teach the later readings. Deferring the diffs reduces that contamination, although reading earlier pages still creates it.

The [sealed notes](blind-notes.json) contain 42 accounts. The [phase seal](blind-phase-seal.json) records the cutoff between reading and source checking, including late page-only descents and the limitations. [Editorial notes](editorial-notes.json) make compressed wording readable without changing that sealed file. [Comparisons](comparisons.json) contain the later corrections.

I counted the whole declared complete layer as the top, including long decision sheets below the first screen. I read rendered text and sampled mechanisms; I checked the canvas outline visually. The video was read through its narration and player. I did not treat off-camera canvas DOM content as independently visited rooms. Authored inline code could be part of a page’s explanation; one registry evidence excerpt in experiment 12 was opened after every root note had already been recorded. These are reasons not to describe this as an unprimed human retention experiment.

The independent pass read the small #127 patch in full. For the wide patches I used changed-file and changed-line inventories, contextual source reads, copy-aware comparison for #148, and inspection of changed assertions. The adjacent pair uses its own endpoints rather than the final renamed classes. This is a bounded source comparison, not an exhaustive extraction of every decision in the stack. “No additional decision found” reports that reading, not a proof of completeness.

I kept a missed source fact separate from a demonstrated rule-4 violation. The two flags have explicit parent/child witnesses: experiment 04 changes its disclosure claim below the overview; experiment 27 introduces loss of a disk-test premise below its fixture summary. Other rows retain their omissions and corrections without claiming an unvisited route was observed.

[Validation](validation.json) records one table, 42 data rows, 22 evidence sections, 370 checked local links with no broken targets, and an unchanged notes hash. Browser checks covered evidence expansion, return navigation and horizontal table scrolling on a narrow screen. Censused files were unchanged at the final recheck. No symnav files were modified and no symnav test suite was run for this critique.

## What I would drop

The repeated descriptions of shared omissions make the table long. A future presentation could shorten those cells to named findings, provided each row still gives a concrete account of what its reader missed. The duplicate text/JSON captures are useful for this audit but do not both need to be prominent in the reading interface.

I would drop any attempt to infer which opening teaches better from this sequence: the second reading is already contaminated. I would also drop removed-test-title counts as evidence of equivalent or lost coverage; the changed premise and assertion are the useful units.

## What I would do next

Use a separate reader for each frozen page, then compare teach-back accounts with the same source witnesses. Repeat against later-finished pages as a new, explicitly dated cohort.

## Time spent

About 50 minutes wall-clock, including the page-only pass, source comparison, table assembly and checks.
