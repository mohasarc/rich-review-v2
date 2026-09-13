# semantic-zoom-microscope

## Entry point

Open [index.html](index.html) directly:

```sh
open ~/projects/rich-review-v2/experiments/68-semantic-zoom-microscope/index.html
```

No server, installation, network or live worktree is needed to read it. All libraries, recordings and source receipts are local.

**A decision before a probe** is a microscope for one narrow part of #148: the ordered, lazy routing decision. Click a feature or use the four objectives to descend through **Specimen → Box → Mechanism → Evidence**. Wheel/pinch changes the actual camera scale and semantic representation. Drag pans. **Home / Fit** returns to the specimen; **Escape** moves up. **1–4** select depth; **[ / ]** or the previous/next arrows walk all 16 features while preserving depth. The source button opens a receipt and returns to the same view. URL fragments and browser history retain the selected feature, depth and recording; history also retains the camera field.

The eight open notes are the complete stopping layer. They scroll beside the instrument on desktop and follow it on narrow screens. On a phone the overview is a locator; zoom, or use **Source** for readable text. The complete notes and the [frozen source book](source-book.html) also work without JavaScript.

## Kind

other: interactive semantic microscope

## Subjects

pr-148 only — Own daemon mechanisms behind DaemonClient.

Base `ba53c8e1662fd86d198b95321c90d9c9bef10184` → head `20838f8dbf413e04767543eb2380d0d114da6c60`.

Scope: routing selection, its immediate caller boundary, and the evidence for those decisions. This is intentionally **not a whole-PR decision inventory**. Execution delivery, control, idle timing, registry election, entry construction, public declaration design and unrelated test changes are outside this specimen.

## Declared choices

- Role framing: learner operating an instrument; notice where observation becomes impossible after a decision.
- Box lenses: static module/package ownership and effect boundaries within one routing decision. The CLI dispatcher and added package policy are distinct source owners. Record reads, observer calls and cleanup attempts are distinct effects. Membranes are ordered guards, not process boundaries.
- Opening style: picture first, using a marked microscope analogy and a real controlled example: a record is both starting and from the wrong version, but returns cold/starting without an observation.
- Shape: one complete eight-reading surface, then four magnifications of the same fixed specimen. Labels become return vocabulary, then check paths, then exact pinned source. Nothing is unlocked as a reward for interaction.
- Navigation: D3 camera zoom/pan; direct top-reading jumps; direct specimen-feature selection; linear previous/next feature traversal at any depth; depth objectives; minimap; keyboard; fragments/history; source dialogs with focus restoration.
- Trust posture: source-grounded, conservative about rationale, and bounded about measurements. `S` means a reason was stated; `U` means a specific reason was not found in the inspected PR body, 45 commit records and specifications. General preservation intent does not explain the original precedence or cleanup policy.
- Persona: a teammate who knows TypeScript and symnav, but not the daemon routing implementation.
- Representations used: fixed guard membranes; source-ordered check paths; return-color staining; operation glyphs; hatching for guards not reached; one shared lazy-context strand; paired measured effect counters; semantic replacement at four depths; exact source microprint and a full receipt viewer.
- Importance rule: observation prevented by an earlier decision first; inherited asymmetries and cleanup policy next; ownership staging, caller effects and evidence boundaries stay on the complete surface.
- Inputs used (beyond bundle): pinned head/base source, the two existing focused head suites, both successful worktree builds, actual compiled base `routeFor` and head `DaemonRoutingPolicy` methods with injected ports, existing dispatcher/test identity checks, architecture/product specifications, and Git revision/status checks. Bundle use: `pr.json` body and all commits, `diff.patch`/file inventory for the scoped delta, and relevant repository/spec material. The overview dumps were not used as evidence. No other PR worktree was used.
- Tech: locally vendored D3 7.9.0; SVG, native HTML/CSS/JavaScript; Python evidence capture; Node controlled recorder and integrity checks; isolated Chrome/Playwright browser checks. System fonts; no generated bitmap assets. Codex harness, no delegated agents.
- Built on earlier experiment(s): read the required 04-textbook-chapter, 23-zoom-canvas, 36-be-weird-a, 37-be-weird-b and 53-be-weird-53 READMEs. Borrowed bounded recordings, pinned receipts, explicit analogy limits and reliable return paths. Also read 63-daemon-constellation and surveyed representation declarations from 56, 60, 61 and 65. No implementation, coordinates, evidence bank or recording from those experiments was reused. Retained and independently reran this folder’s partial capture/recording scripts and vendored D3 from the interrupted earlier attempt.

## What I tried

The partial folder already contained a useful narrow experiment: 17 base/head routing pairs and pinned sources, but no interface or README. I verified the source pins, rebuilt both worktrees, reran the recordings, expanded capture to check the original CLI tests, and completed the instrument.

Considered OpenSeadragon, PixiJS viewport and D3. D3 matched the need for small, selectable vector structures and readable DOM source excerpts. A tiled raster would make the microscope literal but would make semantic text replacement and accessible source interaction harder for this specimen.

The first mechanism view was a bordered block containing three lines of explanation. Its [retained screenshot](evidence/attempts/attempt-02-mechanism.png) records the weak result: it was too much like a card behind a camera. I replaced guard mechanisms with source-ordered check glyphs, a return branch and hatched skipped checks. The same early-return fact now changes the structure of the image.

The first evidence scale clipped the aperture. A [retained screenshot](evidence/attempts/attempt-03-evidence.png) shows it; the final camera objective fits the source aperture to the viewport. A later resize correction preserves semantic depth when switching between desktop and phone. Final screenshot inspection also caught magnified context labels crossing the fixed legend; a shaded instrument margin separates them. Browser-check failures exposed two checking assumptions: D3 raises selected nodes in DOM order without moving coordinates, and browser wheel coordinates are rounded. The checks now compare coordinates by feature ID and use the actual event pointer. Failure records are preserved under `evidence/attempts/`.

## What I would drop

The graticule and instrument branding can shrink; they carry orientation, not routing facts. The source-home and test features earn less from magnification than the guards. On a phone, use the normal-size receipt instead of trying to read a whole code line through a small aperture. The full frozen files are useful for audit but far larger than the 60 targeted witnesses.

## What I would do next

Ask a fresh reader to predict both double-fault cases: a starting/wrong-version record and a starting/wrong-version pong. Compare their explanation with the same facts in a conventional decision tree. No human comprehension trial was performed here.

## Time spent

Approximately 35 minutes for this completion pass, plus the retained interrupted preparation. Includes guidance/source reading, library comparison, builds, recordings, rendering, interaction checks and screenshot inspection.

## Visual-variable legend

| Variable | Meaning | Limit |
| --- | --- | --- |
| Left-to-right membrane position, 01–04 | Actual guard order: record present, not starting, record version, responsive | Spacing and membrane dimensions measure nothing about cost, memory or elapsed time. |
| Blue / green / coral | Cold / warm / fallback route | Color is duplicated by route text. Muted green structure is context, not a fourth result. |
| Square / circle / diamond | Record-based check / observation / cleanup attempt | Repeated squares are not repeated registry reads; the context memoizes the read. These are operation families, not call counts. |
| Diagonal texture | Guard or check not reached for the selected case/return | Source-traced reachability, not measured duration or dimmed importance. |
| Colored membrane and ring | The first return for the selected recording | The recording selector changes this emphasis; it does not alter the implementation. |
| Solid path, then downward return | Continue through checks until one decision returns | Source-traced sequence; no animation of daemon execution or physical motion is claimed. |
| Dashed continuation | Later checks cannot be evaluated after that return | Distinct from post-route startup, which can still happen in the caller. |
| Paired numbers under BASE / HEAD | Measured registry-read, observation and removal call counts in the controlled methods | Excludes startup coordinator work, disk, sockets, actual command execution and elapsed time. |
| Magnification | Level of explanation: specimen → owner/guard vocabulary → mechanism → pinned source | Scale is editorial, not optical resolution or runtime magnitude. |
| Fixed feature coordinates and locator rectangle | Same source fact and current field of view at every depth | The drawing is a lossy microscope analogy, not a biological or process simulation. |

The compact color/shape/texture legend and analogy limit remain beside the instrument. Mechanism paths label themselves source-traced; recording limits sit beside the counters.

## Libraries considered and used

| Library | Evaluation | Result |
| --- | --- | --- |
| [OpenSeadragon](https://openseadragon.github.io/docs/OpenSeadragon.Viewer.html) | Image viewer with tiled-image, overlay, navigator and viewport facilities. A natural choice for an actual microscopy scan. Here the specimen consists of changing, selectable vector semantics and source text. | Considered, not used. No raster tiles were created. |
| [PixiJS viewport](https://github.com/pixijs-userland/pixi-viewport) | Mature 2D camera with drag, pinch, wheel and viewport plugins. Appropriate if this needed a large sprite field. The small specimen and DOM source interaction did not require a Pixi scene. | Considered, not used. |
| [D3 zoom](https://d3js.org/d3-zoom) | Supports pointer, wheel, touch, transforms, coordinate inversion and interpolated programmatic navigation. Works with the SVG/DOM combination used here. | Used for all camera behavior and semantic-scale events. No custom gesture or camera engine. |
| D3 scales, shapes and links | Ordered categorical positions, operation glyphs, check connectors and return branches. | Used. These are authored order axes rather than a graph needing force layout. |

D3 7.9.0 is distributed in `vendor/d3.v7.9.0.min.js` with its [ISC license](vendor/D3-LICENSE). Semantic content selection is driven by D3’s current transform scale, including wheel/pinch changes; the objective buttons do not independently toggle hidden panels. The app adds content thresholds and accessibility/navigation controls, not an independent camera system.

## What the weird form teaches better or worse

**Better:** the record’s starting check and the later version/probe checks remain in the same places. Selecting the double-fault recording puts a return in the second membrane and hatches the third and fourth. Going closer shows exactly where the path leaves. At the responsive-pong branch, the version check precedes the state check; the visual priority changes while the observer stays in its fourth membrane. The zero observation count is beside both views. The reader can connect an absence of work to the source line that prevents it.

**Worse:** a conventional decision tree could present all observer kinds at one readable size. The microscope spends screen area on preserving location, and the first overview is small on phones. Rationale, staging context and measurement limits still need prose. These are design observations, not demonstrated learning gains.

This differs from 23’s broad authored rooms and 63’s file constellation: it fixes one narrow decision tissue in place and lets a return resolve into its check sequence and exact source. It does not attempt to explain all 153 changed files.

## Evidence and verification

- [Source capture](scripts/capture.py): 11 frozen documents with revision and SHA-256; every worktree file verified against its pinned Git blob. The active CLI dispatcher **and its tests are byte-identical** between base and head. The two new test files have +219/−0 and +447/−0 lines. These are scoped observations, not a claim about unrelated tests in #148.
- [Controlled recorder](scripts/record.mjs), [raw recordings](evidence/recordings.json): actual compiled base `DaemonCommandDispatcher.prototype.routeFor` and head policy/context, with injected registry/observer/removal ports. Seventeen pairs agree on returned kind/reason, effect counts and call order. A separate context probe checks no eager work and reused record/observation identity. Captured build hashes accompany the recordings.
- [Focused test log](evidence/focused-tests.log): 15 policy tests and 29 client tests passed. The two builds completed successfully: [head](evidence/build-head.log), [base](evidence/build-base.log). No full daemon/end-to-end parity run is claimed.
- [Pyramid map](evidence/pyramid-map.json): all 16 fixed features map to one of the eight complete top readings and 60 source witness selections. The register explicitly names the state/version asymmetry, reason-label distinctions, best-effort cleanup, disabled union member, post-route trigger boundary and test scope before descent.
- [Static checks](evidence/static-checks.json): pins, hashes, citation ranges, source anchors, recording mappings, scope inventory and clean tracked worktrees.
- [Browser check source](scripts/browser-check.cjs), [results](evidence/browser-checks.json): direct-file opening, actual pointer descent, all feature/depth combinations, every source witness, every recording, wheel-centered zoom, pan, keyboard, source scrolling, return paths, links/history, responsive layouts, touch, reduced/ordinary motion and JavaScript-disabled reading. No browser errors or external requests in the final run.
- [Screenshots](screenshots/01-specimen.png): final specimen, box, mechanism, evidence, pong precedence, source receipt and phone views; inspected visually. Earlier visual failures remain under `evidence/attempts/`.

The 17 inputs include deliberate double faults and injected errors. They are fixtures, not production incidents. The browser replays saved measurements and uses source order for the drawn traversal; it does not run symnav. Neither the counts nor the test run is presented as a correctness verdict. The artifact collects no comments, approvals, scores or review state.

## Regeneration

Opening the artifact requires none of these commands. With the supplied, built worktrees still pinned, run from this folder:

```sh
python3 scripts/capture.py
node scripts/record.mjs
node scripts/verify.cjs
node scripts/browser-check.cjs
```

The browser check defaults to system Chrome and the existing Playwright installation at `/tmp/rich-review-05-browser/node_modules/playwright`. Set `MICROSCOPE_PLAYWRIGHT` or `MICROSCOPE_CHROME_CHANNEL` if needed. To repeat the focused source tests, run `pnpm exec vitest run src/client/daemon-routing-policy.test.ts src/client/daemon-client.test.ts` from `worktrees/pr-148-head/packages/daemon`.

Only this experiment and permitted worktree build output were written. Symnav source and branches remain untouched. The index, queue, supervisor files and other experiments are left to the orchestrator. The received [brief](brief.md) and earlier attempt logs are retained.
