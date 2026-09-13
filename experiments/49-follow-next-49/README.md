# follow-next-49

## Entry point

Open [index.html](index.html). It works offline with no install or server:

```sh
open ~/projects/rich-review-v2/experiments/49-follow-next-49/index.html
```

The report links the four original/revised page copies, exact patches, twelve reader responses, sealed packets and pinned source. [protocol.md](protocol.md) records the reading procedure and capture adjustments. [verification.json](verification.json) records artifact checks.

## Kind

pair — a two-statement intervention, four independent agent-reader sessions, and a focused source comparison.

## Subjects

pr-127 is the shared control and has a complete decision surface in the report. The assigned next-step text also explicitly names cases belonging to pr-131 (validation), stack (primary ownership), and pr-148 (23/29). I treated those as narrowly authorized comparison subjects despite the brief's single-subject line. I did not review the rest of those PRs independently.

## Declared choices

- Role framing: Reader predicting concrete consequences before seeing code, then comparing those predictions with source.
- Box lenses: Static ownership and runtime failure/lifetime boundaries: TypeScript service/core scope; parent/worker; primary/all-owner maps; host/runtime policy; standalone/process-composed queue.
- Opening style: The experimental finding and a comparison table; source-derived event/ownership sketches accompany the cases. Sketch omissions are marked.
- Shape: Focused comparison above receipts, plus the complete #127 control surface and two archived page pairs. Each source disclosure follows a claim already exposed above it.
- Navigation: Linear report, direct case/receipt jumps and return link; unchanged nonlinear navigation inside the archived 23/29 pages.
- Trust posture: Separate a passage's predictive usefulness from its fidelity to source. Preserve unknowns and distinguish top learning, descent learning and source correction. No verdict on symnav, scores or leaderboard.
- Persona: Four fresh agent readers with no conversation fork, using the same available model; not human participants. The experimenter had read the earlier critique.
- Representations used: Condition and prediction tables; simple box/event sketches; original/revised interactive pages; exact sentence patches; browser captures; frozen prose responses; line-linked source.
- Importance rule: Whether a reader can predict the selected failure, ownership, credential or lifetime boundary before descending. A precise wrong prediction remains a source-fidelity problem.
- Inputs used (beyond bundle): philosophy.md and playbook; the #127 worktree contributor guide; freshly read pinned git objects for the named cases; existing page assets and rendered prose; experiment 48's next-step, route notes and source-witness leads. Bundle files used: pr.json, diff.patch and files.txt. The generated overviews were not used. No external web research, symnav build or test run.
- Tech: Offline HTML/CSS; Python standard library for copying, extraction, packets and integrity checks; isolated Playwright contexts for rendered routes. Codex harness with four requested independent reader agents. No storage or review-collection interface.
- Built on earlier experiment(s): 01-unconstrained-a and 14-outsider-persona supply conflicting owner passages; 02-unconstrained-b and 20-contract-table supply general/explicit validation passages; 20 also supplies the unchanged #127 reader control. 23-zoom-canvas and 29-refusal supply the actual page copies. 48-fresh-reader-refresh-40 supplies the assigned follow-up and exact destinations. I also searched relevant README/critique snippets in 41–47 and read 47's route-capture script as a method lead. I did not read the full earlier corpus.

## What I tried

I changed only 23's D13 outline sentence and the first, top-level occurrence of 29's A1 clock sentence. Styles, behavior, evidence and deeper prose remain identical between each pair. 23's D04 optional-policy statement was deliberately left unchanged, resolving the earlier note's ambiguity about two flagged pages versus three propositions.

R1/R2 received original tops; R3/R4 received revised tops. Each pair included both the general/first-owner and explicit/last-owner passage conditions. The same #127 control went to everyone. I sealed predictions before giving descent prose, then sealed descent responses before giving the common source packet. The browser followed the routes; the readers received extracted text with embedded source withheld. This isolates wording and does not test reader navigation or unprompted recall.

The original readers left the token and queue-source questions unresolved until descent. Both revised readers could predict those outcomes from the top. All four still learned optional policy only on D04 descent and its current-system fallback only from source. General parent-reparse wording left failure timing unknown; explicit ordering supplied it. First-owner wording produced faithful but source-contradicted predictions. The shared #127 passage supported its release/cache predictions before source.

I abandoned broad minified-text dumps and direct filesystem writes from the browser tool. A1's auto-opening link initially caused a redundant click to close it. A premature Home measurement caught an unsettled camera. An overstrict overflow check mistook padding for clipped text; final geometry and screenshots show all outline text inside the border, with just 6.4 px remaining below revised 23's process outline at 1440×1000. These adjustments are documented, not hidden as successful initial attempts. The studied strings never changed after readers began.

## What I would drop

The full archived source banks and long reader responses are useful audit material but bulky for ordinary reading. The two edits do not justify claiming that either entire page now satisfies the pyramid invariant: explicit result/status operations, special-branch protocol detail, wall-clock deadline assignments, worker clock separation and optional policy still need attention. The revised canvas also has little spare text space.

## What I would do next

Give a human the same cases without the explicit uncertainty coaching. Test optional policy as a separate one-statement change, and shorten the credential wording while preserving its outcomes and restoring layout margin.

## Time spent

About 30 minutes wall-clock, starting at 05:01 UTC on 2026-09-13, including four reader sessions, source inspection, report construction and checks.

## Reproduction and limits

`prepare.py` reproduces the two pairs from the earlier artifacts. `capture.js` is a Playwright browser-tool function; save its returned object as `captures/rendered.json`. `make-packets.py` derives the reader packets. `capture-source.py` reads pinned git objects, and `make-source-packet.py` selects the source excerpts. Reader outputs are observations from this run, not generated answer keys; rerunning preparation does not reproduce a fresh reading study.

`verify-browser.js` repeats the six routes, checks visible root text and report layout, and returns the browser receipt. `python3 experiments/49-follow-next-49/verify.py` checks packet/response seals, exact edits, unchanged originals, source hashes, local HTML links, the #127 test-body claim and required README headings. Checks concern this artifact; none certify exhaustive semantic coverage or execute symnav. The initial browser receipt's zero-size post-Home geometry is superseded by the settled final browser receipt.

All files written by this run are inside this experiment. The original 23/29 files retain their hashes, both assigned symnav worktrees remain clean, and no branches, commits, PRs, messages or original experiments were changed. The shared workspace's unrelated pre-existing changes were left alone.
