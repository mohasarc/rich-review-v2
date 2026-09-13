# zoom-canvas

## Entry point

Open [index.html](index.html) directly. No install, server, network connection or build is required.

```sh
open ~/projects/rich-review-v2/experiments/23-zoom-canvas/index.html
```

Click **ENTER** on a room, then a decision box. Wheel/pinch zooms at the pointer; dragging pans. **Escape** goes up, **Home** returns to the complete outline, and **Previous / Next** follows a linear tour. Every decision also has a direct jump from the opening outline. Breadcrumbs, browser history and URL fragments preserve navigation. Scroll over source code to read it without moving the camera.

Desktop is the intended reading surface. Narrow screens retain the controls and semantic levels, but need manual zooming to read comfortably.

## Kind

page — interactive semantic zoom canvas

## Subjects

pr-148 only: **Own daemon mechanisms behind DaemonClient**.

The main idea is visible immediately: the package gains real mechanism ownership while the shipped CLI continues to use its stabilized, frozen compatibility graph. The 14.6k added lines are not presented as 14.6k lines of newly invented behavior.

## Declared choices

- Role framing: learner, using spatial memory to keep the owner of each decision in view.
- Box lenses: static package/module ownership and public-versus-private change surface. A process/worker inset supplies runtime context.
- Opening style: before/after in one frame. The structural sketch marks the active CLI path and the staged package boundary; its selected edges and grouped modules are explicitly lossy.
- Shape: a pyramid inside six sibling rooms, with three semantic depths: complete outline → mechanism and choices → reason and evidence.
- Navigation: one continuous coordinate space; click-to-fit and pointer zoom replace a box's outline with its internals. Nonlinear jumps coexist with a 32-stop linear tour, breadcrumbs, minimap and return controls.
- Trust posture: compare stated intent with the implementation and changed test evidence. `S` means a stated reason; `U` means no reason was found in the examined prose. Test names that specify behavior are not automatically treated as rationales. Preservation intent is distinguished from the original reason for an inherited setting.
- Persona: a teammate who knows the repository but not this daemon corner.
- Representations used: package boundary comparison, nested owner diagrams, an illustrative routing selector with skipped observations, an idle-event timeline, decision before/after comparisons, captured source excerpts and a complete file-diff census.
- Importance rule: ownership and authority first; unexplained choices and changed/deleted test expectations remain on the opening layer. Test serialization and the added development dependency receive decision boxes too.
- Inputs used (beyond bundle): the supplied head/base source trees, package metadata and test configurations, architecture/follow-up specifications, mechanism and contract tests, Git revision/status metadata, and comparisons between new package files and their CLI antecedents. Bundle inputs used: `pr.json`, `diff.patch`, `files.txt`; `overview-after.txt` was inspected but contained headers without useful symbol output. No external research or other PR worktree was used.
- Tech: dependency-free HTML/CSS/JavaScript with SVG diagrams and transformed DOM boxes. Python builds a local evidence bank; opening the artifact needs only the generated files. Codex harness.
- Built on earlier experiment(s): none. Earlier experiment artifacts were left unread and nothing was reused from them.

## What I tried

I first compared the copied mechanisms with their CLI antecedents, then collected the actual boundary changes rather than treating the large additions as all new mechanisms. This surfaced the facade/runtime split, clock and registry ownership, output capture, entry construction, authentication exceptions and the test changes.

The initial six-room outline held 23 grouped choices. A final configuration sweep found two more: `fileParallelism: false` and the `tsx` development dependency. I moved the freeze and declaration-test choices into the ownership rooms they explain, keeping all 25 choices visible in the opening outline. Uniform text sizing initially clipped the test outline and two long cards; tighter outline wording and a slightly denser test room fixed those failures.

The camera keeps the physical boxes in place while their representations change. The routing control shows first-decision effects on an illustrative input. It does **not** execute symnav; its counts cover routing observations, not subsequent independent startup activity. The source layer embeds 84 distinct evidence excerpts and all 153 file diffs, so it works offline.

## What I would drop

The complete raw-diff census earns less space than the targeted evidence: it is thorough but makes the reader sort through move/import noise again. The long linear tour is a fallback; walking every source box in order is tiring. The complete opening outline is necessarily dense, and the phone-sized fit is a locator rather than a comfortable reading view.

## What I would do next

Observe a fresh reader finding the active CLI path, the replay boundary and the missing timing assertions. Use where they lose their position to revise zoom thresholds and pin source views to the relevant hunk.

## Time spent

About 40 minutes, including source inspection, construction and browser checks.

## Evidence and verification

The supplied snapshot is base `ba53c8e1662fd86d198b95321c90d9c9bef10184` → head `20838f8dbf413e04767543eb2380d0d114da6c60`. The input patch contains 153 files, +14,624/−815 lines and 37 test-file moves into package source. The evidence builder checks those inventories and captures exact source locations with optional commit-pinned GitHub links.

- [decision-inventory.md](decision-inventory.md): the authored choices and scoped rationales.
- [build-evidence.py](build-evidence.py): rebuild `data.js` and the inventory with `python3 experiments/23-zoom-canvas/build-evidence.py` from the repository root. It reads the supplied inputs/worktrees and writes only this experiment.
- [browser-checks.js](browser-checks.js): the Playwright page function used for interaction checks. It expects the folder served on localhost port 8423, and also verifies direct file opening.
- [verification.json](verification.json): passing artifact checks for all 32 tour stops, 94 source selections, representative routing cases, pan/zoom, source scrolling, keyboard jumps, history, the file census and three viewport sizes. No JavaScript errors or clipped decision content were found in the final pass.
- [screenshots](screenshots/): opening map, routing mechanism and a deleted-assertion decision.

Symnav's test suites were **not run** for this experiment; existing tests are presented as source evidence, not reported execution results. Both supplied worktrees remained clean. The artifact has no verdict controls, comment collection, review persistence or correctness score.
