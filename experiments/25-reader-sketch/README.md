# reader-sketch

## Entry point

Open [index.html](index.html), or on this Mac:

```sh
open ~/projects/rich-review-v2/experiments/25-reader-sketch/index.html
```

No install, build, server, or network is needed. The full folder is portable. A desktop browser gives the two drawings room to sit beside each other; narrow screens stack them and allow horizontal scrolling inside the source map.

Read the pocket brief, choose a sheet, draw your interpretation, then reveal the source map. Pen, boxes, arrows, movable labels, optional boundary guides, undo/redo, and keyboard controls work on all three sheets. Each sheet keeps its own temporary marks. Reload clears everything. There is no submission, verdict, score, saved sketch, or comment storage.

## Kind

page

Interactive notebook, as assigned.

## Subjects

pr-131 — Route daemon thresholds through centralized policy.

Base: `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`.
Head: `b100221db48754656328391b878299c5a0bab443`.

No additional PR subjects. Existing policy implementation and tests in the base provide context for this delta.

## Declared choices

- Role framing: reader as sketcher; teach-back through spatial reconstruction.
- Box lenses: static package/module ownership and runtime topology. The third sheet adds the lexical scopes of deadlines and recovery counters.
- Opening style: a question plus a marked, lossy analogy of local knobs becoming a policy board with wires.
- Shape: a complete pocket brief followed by three drawing sheets: who chooses values, what crosses process boundaries, and which scope owns a clock or recovery budget.
- Navigation: linear read → draw → compare → follow a field; nonlinear jumps from every decision card, source-map box, and atlas consumer into a detail dialog. Closing returns to the drawing; dialogs also have previous/next navigation. All evidence is local.
- Trust posture: compare the PR’s account with both revisions. Mark recorded reasons as stated; mark missing reasons as unexplained. Surface test removals, test-input transformations, and the changed error-selection scope alongside architectural decisions.
- Persona: a teammate who knows the repo but not the daemon corner.
- Representations used: the reader’s own SVG sketch, labeled boxes, freehand ink, before/after source maps, nested request/attempt boxes, decision cards, a policy-field table, exact source excerpts, and a full changed-file evidence book. Maps group modules and show settings flow; they do not execute symnav.
- Importance rule: ownership boundaries first, then distinct value consumers and recovery scopes. Test choices and unexplained changes receive their own cards in the same initial layer rather than appearing as surprises in source detail.
- Inputs used (beyond bundle): direct reads of changed production/test code in both read-only worktrees; the existing `packages/daemon/src/daemon-policy.ts`, its tests, and `policy-testing.ts` references; `plans/005/daemon-policy.md`; the architecture functional specification; contributor/dependency rules. From the bundle: PR body and all six commit subjects, full diff, changed-file statistics, stack position, and relevant repo-rule sections. The generated overview files were not used. No GitHub/network research, runtime traces, or implementing-agent transcript was used.
- Tech: plain HTML, CSS, JavaScript, and SVG; system fonts; no application dependencies. A Node script generates source excerpts, the policy atlas data, evidence HTML, and file-to-decision links. Playwright was used for browser verification.
- Built on earlier experiment(s): none. Earlier experiment folders were left unread. All implementation and diagrams were made for this brief.

## What I tried

I kept true free drawing, then added optional labeled boxes and keyboard editing because a trackpad should not make handwriting a prerequisite. The reference is a separate drawing: revealing it does not alter the reader’s marks or assign a score.

I considered hiding the explanation until the reader finished drawing, but that would conceal decisions below the initial layer. Instead, all thirteen decision summaries and missing reasons are visible first; only the reference geometry is withheld. This tests reconstruction from a brief, not unaided recall from a PR title. The label palette deliberately offers help and may make reconstruction easier than drawing from scratch.

I dropped the idea of pixel-overlay comparison. Two conceptually equivalent drawings can have unrelated layouts. Side-by-side inspection keeps the comparison about ownership and scope.

Reading the base prevented an inaccurate story: the fetch-resume flag was already inside each `executeOnce`. The new numeric controls preserve that nesting. The source map also avoids portraying the numeric fetch field as an arbitrary repeated-fetch loop: fetch failure exits the attempt. Separately, the reattachment loop moves the completion await outside the original error-preserving catch; that unexplained selection change has a top-layer card and both source excerpts.

Screenshot inspection found that an empty boundary box obscured earlier labels. Empty boxes are now transparent, can be added after their contents, and allow selection of enclosed marks. Label wrapping was corrected too.

## What I would drop

The full policy atlas is the least essential element; its 44 fields and recipes could live entirely in the evidence book. The opening knob analogy is also expendable once the reader understands the drawing task. I would keep all three boundary lenses and the explicit test-change cards.

## What I would do next

Watch an unfamiliar teammate explain their arrows after comparing. Try a version with fewer supplied labels to see whether the palette is teaching the mechanism or merely cueing its vocabulary.

## Time spent

Approximately 29 minutes, including source inspection, implementation, browser verification, and screenshots. Codex harness; no additional agents delegated.

## Evidence and verification

[verification.md](verification.md) records the checks and limits. The browser harness passed all 68 assertions, including direct offline file opening. Both symnav worktrees remained clean. No symnav tests were run; this artifact does not report a correctness result for the PR.

The initial brief gives all decision categories before the reader descends. Dialogs refine the same facts with mechanism and source. The field atlas adds the recorded values and recipes for those same policy sections. There is no forced drawing step before comparison.

The resource derivation test deletions are distinguished from central tests that already existed in the base. The changed spill fixtures and helper clamps are not treated as evidence of identical test scenarios. The source-text meta-test is described as a denylist, with its limits visible.

## Files

- [index.html](index.html), `style.css`, and `app.js`: the drawing notebook.
- `content.js`: authored decision summaries, source selectors, and sheet prompts.
- `evidence-data.js`: 43 exact excerpts and the 44 recorded policy fields/recipes.
- [evidence.html](evidence.html): PR body, commit subjects, policy record, architecture specification, excerpts, and all 60 changed-file diffs.
- `coverage.json`: navigation from each changed path to related decisions; it is not an automated completeness assessment.
- `build-evidence.mjs`: regenerates the evidence from the frozen local worktrees. Run `node build-evidence.mjs` from this folder if rebuilding; it checks both revision IDs and the claimed unchanged policy context.
- `verify-browser.js`: the exercised Playwright-page function.
- `screenshots/`: builder-created examples. The shipped notebook starts blank.
- [brief.md](brief.md): the received brief.
