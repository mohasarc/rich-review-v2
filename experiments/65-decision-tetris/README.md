# decision-tetris

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/65-decision-tetris/index.html
```

No installation, server, network or live worktree is required. JavaScript is required. Start at **#148**, try **lifting the body**, then scrub to **#149** and repeat. The slider also supports arrow keys, Home and End. Cells support Tab, Enter and Space. Receipts close with Escape. Browser Back restores PR positions. On narrow screens, the board scrolls horizontally inside the page.

## Kind

other: interactive page — a constrained package packing board

## Subjects

**stack**, narrowly focused on the final physical package handoff. The two pieces are **#148** and **#149**. The earlier 24 stack PRs are compressed into the **#147** baseline. This is not a complete explanation or semantic audit of the stack, or of either final PR's routing, protocol and lifecycle algorithms.

The baseline is `ba53c8e1662fd86d198b95321c90d9c9bef10184`; staging is `20838f8dbf413e04767543eb2380d0d114da6c60`; cutover is `d07002357d3e9596bfaae910a1ac63b77981620b`. The supplied main-to-tip bundle starts at `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e`.

## Declared choices

- Role framing: learner examining a source ownership constraint by manipulating the same staged body before and after caller cutover.
- Box lenses: static package/module ownership, plus public/private change surface. Source packages are never drawn as process instances. CLI composition and the injected TypeScript/core executor remain visible.
- Opening style: the #148 duplication in one picture, with the #149 consequence named immediately. A marked packing analogy supplies intuition.
- Shape: a pyramid with a complete stopping layer consisting of the board, legend, eight open decision records and removed-observation strip; matching mechanism and source layers follow.
- Navigation: three scrub detents, previous/next PR buttons, reversible pose at #148 and constrained pose at #149, selectable cells, eight direct decision jumps, linear decision arrows, exact return links, local source dialogs, numbered full sources and URL/history state.
- Trust posture: pinned source and bounded reason attribution. Stated reasons come from the supplied PR bodies; specific policy API removals, runner choices and ten removed CLI scenarios retain rationale gaps. A test's source is not reported as an executed test.
- Persona: a teammate who knows the repository but has not followed the daemon migration.
- Representations used: two package wells; a seven-cell staged mechanism body; a separate four-cell hooked cutover cap; fixed role slots; frozen hatching; removal silhouettes; caller pins; controlled lift/rotation; a compact open decision register; paired boundary statements; source receipts and exact test-file inventories.
- Importance rule: distinguish staged code from active consumer ownership first; retain the host seam, public access and enforcement next; test relocation and missing observations receive equal root-level treatment.
- Inputs used (beyond bundle): read-only Git objects at the three pins; CLI entry, coordinator, executor and composition; daemon client, manifest and selected mechanism owners; testing inspector and actor; import/storage/clock/export tests; freeze and absence checks; before/after status and stop suites; per-PR rename-aware diffs. Main and stack-head contributor guides and tracked status were read. Bundle files used: `pr.json` (including #130 context, final PR bodies and commit records) and `stack.md`. The precomputed overview dumps and net patch were not used to establish claims.
- Tech: SVG and ordinary HTML/CSS, **GSAP 3.15.0**, classic JavaScript, Python standard-library evidence capture, Node integrity checks and isolated Chrome/Playwright interaction checks. Codex harness; no delegated agents.
- Built on earlier experiment(s): no implementation reused. Full READMEs read: **04-textbook-chapter, 23-zoom-canvas, 36-be-weird-a, 37-be-weird-b, 53-be-weird-53, 07-stack-timeline, 16-drag-the-box, 22-game-any, 60-be-weird-60**. Also surveyed earlier README shape/representation fields; [novelty-survey.json](novelty-survey.json) records the census. Borrowed source pinning, explicit simulation limits, complete root records and focus-return checks as standards. The 07 timeline ruled out another all-stack playback; the 16 relocation workbench and 22 package-sorting game ruled out another freeform ownership puzzle.

## What I tried

I considered dropping all 26 PRs, but the existing timeline already shows every stop and the resulting small pieces would hide the important dependency. I selected the last two steps, where a full package and a changed caller are separate facts.

The first piece seats a public client and six grouped internal families while the CLI's old route survives. The second seats a hooked cap for the affected final export surface, switches the caller and removes the compatibility silhouette. Trying the same lift on both revisions exposes the structural dependency. It never changes source files or promises a safe revert.

I evaluated a renderer, a physics engine and an animation toolkit before implementation; the comparison below explains the choice. No implemented representation was abandoned. The early full-page screenshot is retained as [preview.png](screenshots/preview.png).

Browser use led to concrete fixes: the scrubber moved above the board; a long cell subtitle was shortened; the testing pin and label moved clear of the worker tile; the CLI subtitle now changes after cutover; ordinary anchors no longer steal focus on a decision return; an asynchronous custom dialog focus handler was removed in favor of native dialog restoration. The verification script also needed to distinguish stage buttons from the SVG's stage metadata. A final pyramid audit promoted all ten removed scenario names into the open witness strip, so their individual subjects do not first appear on descent.

## What I would drop

The small PR-piece glyphs are decorative and could go. The generic comparison bars below the board earn less than the source witnesses. A wider variant could replace the horizontal phone board, but shrinking the labels would make the representation harder to read.

## What I would do next

Give a fresh reader the two board states and ask which caller would need a coordinated change if the staged mechanisms were removed. Compare their explanation with a conventional two-column ownership diagram; no comprehension trial has been performed here.

## Time spent

Approximately 40 minutes, including reading, library evaluation, evidence extraction, construction, browser checks and screenshot inspection.

## Visual-variable legend

| Variable | Encoded fact | Limit |
| --- | --- | --- |
| Amber / mint | CLI / daemon source owner | Colors do not measure correctness or runtime activity. |
| Broad seven-cell silhouette | #148 stages a client plus six grouped mechanism families | Neither equal file counts nor byte-identical copies. The CLI dispatch cell is a host router, not one of the 38 frozen files. |
| Hooked four-cell cap | #149 changes consumer access and seals root, process-entry, worker-entry and testing paths | Root and both entry paths already exist at #148. These are affected paths, not four new APIs. |
| Cell coordinates and occupancy | A named responsibility or public surface within a package | The finite grid is illustrative. Blank cells are not spare capacity; size is not source size or effort. |
| Hatching / crossed-out silhouettes | Frozen CLI mechanism families / physically removed old body | The 38-file count comes from the reproduced source digest, not the picture. |
| Active connector and coral pins | CLI root access and the external testing import | Selected consumer edges; not a complete call graph or a runtime trace. |
| Lift and rotation | Old selected CLI route still exists at #148; final consumers need the package at #149 | **Illustrative structural reversibility only.** Not a Git revert, compiler result or valid deletion plan. Package-internal tests and build/export dependencies are not simulated. Rotation angle and travel have no numerical meaning. |

All movement is explicitly illustrative. No timed gameplay, collision physics, row-clearing, scores, correctness verdicts, comments or response storage are present. The inspector and controls alter only in-memory reading state and the URL.

## Libraries considered and used

| Library | Evaluation | Decision |
| --- | --- | --- |
| [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/) | Controls a sequence as one playhead and supports seeking/reversing. It can also animate SVG transforms for the controlled lift. This fits a small fixed semantic board. | **Used: 3.15.0**, pinned in the lockfile and vendored. All drop, reverse, lift and constrained-return animation is GSAP-controlled. |
| [PixiJS](https://pixijs.com/8.x/guides/components/application) | Its renderer and interactive scene objects would suit many pieces. Here, SVG text and HTML controls already provide selectable source cells and browser accessibility without a canvas-specific text layer. | Considered; not installed. |
| [Matter.js](https://brm.io/matter-js/) | Rigid-body physics would produce appealing motion, but contact, mass and gravity would introduce rules unrelated to the source dependency being taught. | Considered; not installed. |

The grid has authored semantic slots; it is not an automatically laid-out graph. The few fixed connectors are parts of the board's coordinate system. No graph-layout, semantic-zoom or physics algorithm was implemented.

The vendored GSAP file retains its upstream copyright and [license reference](https://gsap.com/standard-license). No external assets, fonts, analytics or network requests are needed to read the artifact.

## What the unusual form teaches

The useful moment is a repeated action with a different consequence. At #148, raising the mint body leaves the amber caller's route legible and intact. At #149, that route has been removed and the selected consumers are visibly attached to the mint body. This makes staging versus activation and the consequence of deleting compatibility copies easier to hold together than a row saying “moved to daemon.” The cap also makes the public opening visibly smaller than the private mechanism body.

A conventional diagram would explain the direction of dependencies faster, without a rotation legend. This board compresses many internal owners into six cells and cannot teach their algorithms, actual rollback cost, process topology or behavioral parity. Its benefit is a hypothesis about understanding, not a measured reader outcome.

## Evidence and scope

- **43 frozen source receipts**, with full local numbered source, exact revision, SHA-256 hash and selected excerpt. [Source bank](evidence/sources.json).
- **38 frozen production files** at #148: the capture script reproduces the exact normalized source/name digest from the repository's freeze test. At #149, the entire old mechanism directory is absent in the Git tree. [Inventory](evidence/inventory.json).
- **37 mechanism test-file renames** at #148: extracted using `git diff --name-status -M`, with every before/after path retained. This is not an assertion-equivalence measurement.
- **Seven status and three stop scenarios** removed at #149: names are extracted from the two specific built-CLI suites and linked to their original lines. Exact [status](evidence/status-149.patch) and [stop](evidence/stop-149.patch) patches are included. No claim that all coverage was lost, or that package tests replace it, is made.
- [Supplied #148 body](evidence/pr-148.html) and [supplied #149 body](evidence/pr-149.html), with original commit records alongside them. PR-reported test results remain author statements; this artifact did not rerun them.

Reason searches were bounded to the supplied final PR bodies and all 45/94 commit records. Those commits have empty bodies. The author's wider intent or an unavailable conversation could supply additional reasons. The artifact scopes its eight decisions to the physical ownership handoff. No finer routing, acceptance, idle, protocol, timeout or cache mechanism is explained below that root layer.

## Verification and regeneration

[Static checks](verification-static.json) cover the model's three states and consumer constraints, connected/disjoint role slots, the complete decision/source mapping, source hashes/excerpt slices and extracted counts. [Browser checks](verification-browser.json) cover direct offline file opening, all stages, keyboard scrubbing, both lift outcomes, interrupted transitions, all selectable cells, all eight decisions, source tabs and full local source pages, focus return, browser Back, text bounds, reduced motion and widths 320/390/768/1440 px. See the [screenshots](screenshots/).

The final pass contains six static check groups and fifteen browser check groups, with no JavaScript errors or external requests. [Final folder checks](verification-final.json) record the README contract, local links, artifact hashes and clean tracked worktree status.

Symnav source was neither changed nor executed. No symnav test suite was run. Both supplied worktrees were clean for tracked files at evidence capture and final verification. The initial harness/brief files are preserved. Queue, index and commit handling belong to the campaign orchestrator.

To recapture from the supplied pinned Git objects and repeat the integrity checks:

```sh
cd ~/projects/rich-review-v2/experiments/65-decision-tetris
python3 scripts/capture.py
node scripts/check-model.cjs
```

To repeat browser checks, `scripts/browser-check.cjs` uses the existing Playwright installation at `/tmp/rich-review-05-browser/node_modules/playwright` and system Chrome. Set `BOARD_PLAYWRIGHT` to an alternative installed Playwright package path when needed, then run:

```sh
node scripts/browser-check.cjs
```

Opening the included page requires none of these regeneration steps. `npm ci` restores the pinned GSAP development dependency; the page loads the included `vendor/gsap.min.js` directly.
