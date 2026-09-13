# pixel-causality-grid

## Entry point

Open [index.html](index.html) directly:

```sh
open ~/projects/rich-review-v2/experiments/61-pixel-causality-grid/index.html
```

No install, server, network or worktree is needed to read the artifact. D3 and the evidence are local. JavaScript draws the interactive field; the complete boundary key, package/test decisions and linked source inventory also work without it.

Select a pixel to inspect its revision and owner. Arrow keys move between boundaries and PR heads; Home/End reach main/#149; Enter opens the inspector; **Return to selected pixel** restores focus. Boundary letters jump directly into evidence. Browser Back and fragments retain the selected coordinate. Playback supports stepping, scrubbing, pause, two source builds and three controlled outcomes. Nothing is collected or saved from the reader.

## Kind

page, interactive

## Subjects

stack — all 26 supplied PR heads, plus main as a baseline. Main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → #149 `d07002357d3e9596bfaae910a1ac63b77981620b`.

The narrow subject is **the lifetime of an accepted turn across terminal publication, delivery, FIFO sampling and acknowledgement**. The field has 243 concrete boundary instances: nine boundaries at 27 revisions. It does not claim 243 unique decisions or an explanation of every other change in the stack.

## Declared choices

- Role framing: learner reading a causal instrument; assigned angle is the pixel causality field.
- Box lenses: static module/package ownership, plus runtime object/lifecycle authority. CLI process, daemon process and worker thread remain distinct from package ownership.
- Opening style: a short completion paradox and a simultaneous ownership field. The visibly separate ACK branch supplies the early intuition; schematic distances are marked.
- Shape: complete field/key and two visible package/test decisions → controlled recording and selected mechanism → exact pinned source. The complete stopping layer spans more than one viewport and has an explicit end marker.
- Navigation: a fixed coordinate grid, linear boundary controls, a six-checkpoint replay, direct links, browser history and return focus. There is no semantic zoom.
- Trust posture: distinguish implemented order from author rationale. Seven boundary families have a specific stated reason; two exact ordering rationales were not found. Package staging has a stated reason; the precise readiness-timing assertion deletions are unexplained. No correctness verdict.
- Persona: a teammate who knows symnav but has not followed the daemon refactor.
- Representations used: a 27 × 9 ownership raster, compound symbols, an ACK branch, physical-package cutover enclosure, two moving request indicators tied to recorded checkpoints, process/thread containment, exact source excerpts, a textual source inventory and a test diff.
- Importance rule: expose what prevents the next turn, which owner controls that barrier, and what is independent of it. Preserve rationale gaps, staging and changed test observation at the top.
- Inputs used (beyond bundle): read-only Git objects for all 26 heads and main; source for the process shell, accepted-execution session, generation manager, ledger, queue, delivery, lifetime and CLI composition; architecture/follow-up specs; the #148 readiness test rename/diff; new controlled source-method recordings. Bundle use: all 26 PR context/decision sections, commit-message rationale search, revision pins and relevant `repo-rules.md`. Symbol overview placeholders were not used as evidence. The supplied net diff was not needed; the scoped historical diff was generated directly from pinned objects.
- Tech: D3 7.9.0, SVG, native HTML/CSS/JavaScript; Python capture/build/verification; Node with the prepared worktree's `tsx` loader for source recording; isolated Playwright with system Chrome for checks. No generated images, remote fonts or hosted services. Harness: Codex; no delegated agents.
- Built on earlier experiment(s): read the required 04-textbook-chapter, 23-zoom-canvas, 36-be-weird-a, 37-be-weird-b and 53-be-weird-53 READMEs in order; surveyed representation/shape declarations across 01–60; read 51-angle-new-subject-51's README and 23's decision inventory. Borrowed the standards for bounded recordings, exact receipts, explicit unknown reasons and return navigation. No predecessor implementation, dataset, probe or screenshot was copied. The #148 test claim was independently checked against its original Git diff.

## What I tried

Initially considered a PR-column field of the 117 authored decisions. It would mainly encode a large prose inventory and make the narrow runtime dependency harder to see. Before implementing it, changed the axes to **revision × the same nine boundary events**. This makes both retained structure and eventual extraction visible at once.

The first raster was too tall: the ownership split fell below the initial desktop viewport. Smaller pixels and tighter row bands brought #145–#149 into view without hiding early PRs. The first playback had overlapping headers and a clipped ACK caption; separate letters and shorter labels fixed both. A 768 px browser check found the source pane's intrinsic width expanding the page; allowing the grid item to shrink fixed it. The initial failure report is preserved in [browser-checks-initial.json](evidence/browser-checks-initial.json).

The probe used actual source coordination on main and tip, with independently held worker, delivery, sampling and cleanup ports. Both builds exhibit the chosen distinction: a completed ledger entry can still hold the FIFO; delivery settling is followed by a sampling gate; ordinary ACK remains independent. A sampling rejection releases its boundary after diagnosis. A valid ACK still succeeds when injected cleanup rejects. This is a controlled observation, not a production daemon trace or a parity claim about all PRs.

No completed representation was abandoned. Rejected design options and UI corrections are retained here rather than presented as negative findings about symnav.

## What I would drop

The source inventory table duplicates the per-pixel receipts, but earns a place as the JavaScript-free and keyboard-independent route. The first 22 rows, including main, contain little ownership variation in this lens; their repetition is evidence, but a reader already familiar with that fact may prefer a collapsed band. On a phone, the field requires horizontal scrolling and loses much of its simultaneous comparison benefit.

## What I would do next

Give a maintainer only the complete stopping layer, then ask when B can start and whether cleanup rejection withholds ACK. Compare their explanation with a conventional sequence diagram using the same facts; no human comprehension study was performed here.

## Time spent

Approximately 30 minutes, including required reading, source capture, new recordings, implementation, browser inspection and documentation.

## Visual-variable legend

| Variable | Factual meaning | Limit |
| --- | --- | --- |
| Vertical position | main, then the 26 supplied PR heads in stack/dependency order | Equal spacing is not elapsed development time. |
| Horizontal position | A–G: the selected successful-turn dependencies. H–I: the separate result-ACK branch | Equal spacing is not latency. ACK is not a required step after G. Workspace-deletion shutdown is the explicitly named exception to ordinary ACK independence. |
| Hue | The module owning the selected operation/state: process shell (ochre), execution session (mint), generation manager (coral), ledger (violet), delivery session (blue), queue (lime) | This is local ownership, not authorship or file size. A stable hue does not establish unchanged code. |
| Shape | Square: publish/retain state; diamond: await gate; triangle: dispatch; circle: side effect | A categorical mechanism key, not a UML vocabulary. |
| Saturation | Saturated: a specific stated reason in the inspected stack prose; desaturated: no specific rationale found | S does not mean the reason was first stated at that row's date. U is scoped to inspected material, not a claim about all possible conversations. Neither grades correctness. Textual S/U labels repeat the distinction. |
| Row enclosure | #149 is the active physical `@symnav/daemon` boundary | #148 stages package code while the active CLI path remains in `apps/cli`. |
| White moving outline | The boundary reached by the recorded A checkpoint; B has a dashed outline | Playback interpolation and spacing are illustrative. Recorded states are authoritative; motion is not a measured trace duration. No autoplay on opening. |
| Selection outline | The exact cell whose source is being read | Separate from the white playback position; selection does not modify symnav. |

The ownership unit is explicit per column: A is acceptance coordination; B is worker-generation readiness/execution; C is the caller's seal await; D is ledger publication; E is the tracked delivery promise owner; F is sampling scheduling; G is the FIFO scheduler; H/I are ACK coordination. For E, the blue delivery owner supplies the promise while the execution coordinator awaits it. Each E receipt includes both sides.

## Libraries considered and used

**Used D3 7.9.0** for categorical band/point placement, keyed SVG data joins, mechanism symbols, colors, easing, transitions and playback timing. At 243 cells, retaining an individual accessible element per pixel was useful. No graph layout, routing engine, semantic camera or animation loop was hand-written. Native overflow handles small screens; this is an ordered grid rather than an arbitrary graph.

Considered [PixiJS scene objects](https://pixijs.com/8.x/guides/components/scene-objects) for a larger GPU field, but this scale benefits more from direct SVG focus/source association. Considered [Observable Plot's cell mark](https://observablehq.github.io/plot/marks/cell); the design would also need symbol layers and custom per-cell navigation, so direct D3 was a better fit for this artifact. Regl was considered only at the sketch stage, with no prototype. These choices were design evaluations, not renderer benchmarks.

Consulted the official [D3 band-scale documentation](https://d3js.org/d3-scale/band) and [transition documentation](https://d3js.org/d3-transition). The pinned distribution and [license](vendor/d3.LICENSE) are vendored. The artifact makes no external requests.

## What the weird form taught better or worse

**Better:** simultaneous repetition makes the distinction between a retained causal order and an ownership extraction visible. Three small color changes near the bottom replace an entire process-shell column family; #148's staged copy does not masquerade as a production cutover. The ledger's terminal column and the delivery/sample columns remain spatially separate, and the moving outline can stop after “completed” while B remains at acceptance. ACK occupies its own branch rather than appearing as the next box in a misleading total order.

**Worse:** the field cannot explain a missing author rationale through color alone, or represent a duplicate-attachment promise map with full fidelity. Exact reasons and the latest-promise qualification still require short text. A conventional sequence diagram is quicker for one revision and can show the call/return edges more explicitly. The grid earns its space only when comparing the stack's owners; its quiet early region is expensive on small screens.

## Evidence, scope and verification

- [Field data](evidence/field.json) and [capture manifest](evidence/capture.json): all 243 coordinates, revision pins and 105 frozen source/prose documents. Each cell's excerpt is checked against its own Git revision. Full receipts include SHA-256 and line anchors.
- [Recordings](evidence/recordings.json): main and tip × normal, sampling rejection, cleanup rejection; six runs and 36 checkpoints. Real main `WorkspaceDaemon` methods use a prototype instance with controlled dependencies. Tip uses real `AcceptedExecutionSession` and `DaemonDeliverySession`; both use their real queue and ledger. Worker, spool, filesystem, clock and send behavior are fake ports. Two new request IDs plus one identical duplicate yield two actual worker starts and two navigation-acceptance resets. No sockets, process startup, disk durability, production latency, generation transitions or full-stack parity were measured.
- [Static verification](evidence/verification.json): cell coverage, source hashes, excerpt bounds, seal/publication/delivery ordering at all 27 snapshots, recorded gates, local destinations and clean tracked status of both worktrees.
- [Browser checks](evidence/browser-checks.json): every cell, keyboard/return navigation, history and fragments, source dialogs, all recordings, playback controls, SVG label bounds, responsive widths, reduced motion, print, JavaScript-disabled reading and direct offline file opening. [Screenshots](screenshots/) were visually inspected; the initial responsive failure and its screenshot are retained.
- [Readiness test patch](evidence/readiness-test.patch): exact #147 → #148 rename-aware diff. The page exposes the changed fixture and removed duration expectations, without claiming repository-wide absence of timing tests. Existing symnav test suites were not run for this experiment; the new source-method probes were executed.

Rationale search covered the supplied PR contexts/decisions and commit messages, relevant repository rules, and the architecture/follow-up specs. An original pre-stack design rationale or implementing conversation may exist outside those inputs. General preservation intent was not used to invent a specific reason for C or D.

No symnav source, branch or worktree was modified. The artifact has no verdict, approval, comment, score or review-storage controls. Queue, index and campaign completion handling are left to the orchestrator.

## Regeneration

Opening the page needs none of these commands. With the supplied worktrees available, from this folder:

```sh
python3 scripts/capture.py
python3 scripts/build.py
python3 scripts/verify.py
```

To regenerate the recordings from source, from the repository root:

```sh
node --import ./worktrees/stack-head/apps/cli/node_modules/tsx/dist/loader.mjs experiments/61-pixel-causality-grid/scripts/record.mjs
```

For optional browser verification, serve this folder with `python3 -m http.server 8461 --bind 127.0.0.1`, then run `node scripts/browser-check.cjs` in another terminal. The check uses the existing Playwright package at `/tmp/rich-review-05-browser/node_modules/playwright` and system Chrome. Override with `FIELD_PLAYWRIGHT`, `FIELD_CHROME` or `FIELD_URL` if needed. The browser is isolated from the campaign's shared browser session.
