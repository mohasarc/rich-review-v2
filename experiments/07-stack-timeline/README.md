# stack-timeline

## Entry point

Open [index.html](index.html) directly. On this Mac:

```sh
open ~/projects/rich-review-v2/experiments/07-stack-timeline/index.html
```

No install, build, server, or network connection is required. The page was tested with networking disabled. Optional links to full GitHub source files require a connection; excerpts, PR bodies, and complete PR patches are included locally.

Start at `main`, drag the slider through 26 PRs, or choose a chapter. Arrow keys step, Home/End reach the endpoints, and **Hold previous** temporarily shows the preceding frame. Choose **Running request** for the process/thread view. Click a diagram box to follow its decision history. The last two stops are the important comparison: #148 stages package mechanisms while the CLI still uses copies; #149 switches the caller and removes those copies.

## Kind

page, interactive

## Subjects

stack — `main` through #149, all 26 supplied PRs. No additional subjects.

## Declared choices

- Role framing: Learner following an architecture through a sequence of ownership decisions.
- Box lenses: Static package/module ownership, plus runtime topology across the CLI process, daemon process, and worker thread. Ledger, spool, and resource ownership remain visible inside those lenses.
- Opening style: The complete ownership change first, a marked lossy moving-rooms shorthand, then five chapter summaries and the package picture. Protocol, policy, deferred behavior, test changes, and the unexplained template rewrite are visible before descent.
- Shape: The assigned timeline. Stable package outlines; responsibilities move between packages, transport/process rows acquire their own boundaries, and #148 shows the temporary coexistence of both implementations.
- Navigation: Scrub, previous/next, playback, chapter jumps, a linear list of every move, box-specific histories, and source dialogs that return to the current position. Direct fragments such as `index.html#pr-148` select a frame.
- Trust posture: Preserve recorded reasons and expose accompanying choices. Six entries are marked unexplained; a generic migration reason does not establish that a removed CLI test has an equivalent replacement. No correctness verdicts or response storage.
- Persona: A teammate who knows symnav but has not followed this daemon refactor.
- Representations used: Morphing package map, runtime request schematic, milestone rail, mechanism sequences, decision/reason cards, policy tables, removed-test correspondence table, and pinned source excerpts/patches.
- Importance rule: Boundary movement and the staging-versus-cutover distinction first. Deferred behavior, changed protocol compatibility, test timing/deletions, and missing rationale receive explicit decisions alongside architecture choices.
- Inputs used (beyond bundle): Read-only git objects at every PR head; per-PR diffs and file inventories; source at the PR-provided anchors; final policy and follow-up specs; selected core/client/runtime code; timeout commits; removed status/stop scenarios and related package tests. Both worktree contributor guides were read. The bundle's overview files offered no usable symbol inventory and were not used as evidence. Details are in [inspection-notes.md](inspection-notes.md).
- Tech: Plain HTML/CSS/JavaScript and a small SVG connector. Local Python generates the offline evidence data. No runtime dependencies, external fonts, services, or generated bitmap assets.
- Built on earlier experiment(s): none. Earlier experiment contents were deliberately ignored. The supplied brief and harness files in this experiment folder were retained.

## What I tried

I separated the stack into five phases, then pinned every stop to its actual git head. Reading the final two PRs ruled out treating package relocation as an immediate production cutover: the map needs two copies at #148. It also needs visible internal splits during #137–147, when package ownership has not moved yet.

The page carries 131 decision entries, all 44 recorded policy values/recipes, and five intentional missing deadlines. It includes the PR's reasons plus additional source-observed choices: a template rewrite, fixture synchronization, enlarged test budgets, test relocation, deleted CLI scenarios, changed pressure assertions, inspector failure behavior, and narrowed policy exports.

I tried a narrower diagram on phones. It clipped the dense labels, so the package map now scrolls horizontally within its own container; the runtime view stacks vertically. I retained the removed-test-title scan only as a marked lossy inventory, supplemented by a manual ten-scenario comparison. No replacement experiment was needed.

## What I would drop

Automatic playback. One fixed dwell time does not match the uneven reading load across these PRs. Manual scrubbing and holding the preceding frame do more explanatory work.

## What I would do next

Check whether a fresh reader can explain why #148 and #149 are separate steps. Then deepen the ten removed-test correspondences with assertion-level tracing, keeping the original CLI entry points distinct from package-level tests.

## Time spent

Approximately 35 minutes, including source inspection, implementation, browser checks, and screenshots. Harness: Codex. No sub-agents.

## Evidence and limits

Baseline: `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e`. Tip: `d07002357d3e9596bfaae910a1ac63b77981620b`. Each preceding PR head was verified as an ancestor of the next. The timeline uses dependency order, not calendar time.

The upper summaries introduce the same choices that the decision cards and evidence refine. A selected stop shows every recorded PR decision plus the additional inspected choices, including test changes. Policy choices are expanded at #130–131; the ten removed CLI scenarios are expanded at #149. The original PR notes and complete patches remain available beneath the explanation.

This is an authored explanation with a reproducible evidence bundle, not an exhaustive semantic audit. The diagrams deliberately group files, omit branches, and do not measure code size. Removed-title counts cannot establish lost coverage. Reasons absent from the inspected material may exist in an unavailable conversation. Symnav itself was not executed or tested for behavior parity; both supplied worktrees remained clean.

## Validation

JavaScript syntax and evidence integrity checks passed. Chromium checks covered all 27 positions, decision counts, #148's two copies, #149's removal, playback, arrow/Home/End navigation, keyboard comparison, both lenses, responsibility histories, source dialogs, and closing/returning. The policy and test-comparison row counts matched their source inventories.

Direct `file:` opening with networking disabled passed. All 27 frames were checked at desktop and phone widths; the final results contain no page errors, clipped map labels, or document overflow. See [browser-checks.json](browser-checks.json) and [inspection-notes.md](inspection-notes.md). Screenshots are in [screenshots/](screenshots/).

## Files and rebuilding

- `index.html`, `style.css`, `app.js`: interactive artifact.
- `content.js`: authored stage explanations and responsibility histories.
- `data.js`: 26 pinned frames, decisions, source excerpts, inventories, policy rows, and test correspondences.
- `evidence/`: complete per-PR patches and bodies, plus policy/architecture/follow-up specs.
- `build_data.py`: regenerates the evidence data using only read-only git commands against the supplied worktree.

To regenerate the evidence bundle in this checkout:

```sh
python3 ~/projects/rich-review-v2/experiments/07-stack-timeline/build_data.py
```

Regeneration is optional; the included page opens independently of the worktrees.
