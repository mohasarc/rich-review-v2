# pixel-city-stack

## Entry point

Open [index.html](index.html) directly:

```sh
open ~/projects/rich-review-v2/experiments/71-pixel-city-stack/index.html
```

No installation, server, network connection or live worktree is required. The browser bundle and receipts are local. The city uses WebGL; the seven complete boundary readings remain readable without JavaScript.

Start at **#148**, then select **#149**. **Trace CLI road** fades surrounding buildings so the active source path becomes visible. **Moved-source roads** instead shows cross-district Git renames in the selected PR; choosing one of those files isolates its relocation. These are source diagrams, not runtime traces.

Scrub or play all 26 PRs. Pick a building, or use the path finder, to inspect its current source and last change. Selection stays at the same physical address across skylines. **Find old/new address** follows a detected rename. Drag to pan; wheel/pinch or +/− zooms. With the city focused, Left/Right steps, Home/End selects main/tip, and Escape clears selection and fits the city. Receipts close with Escape and restore focus. Skyline/file URLs and browser Back/Forward work.

## Kind

page, interactive — a pixel city of physical source paths

## Subjects

stack: main plus all 26 supplied PR heads, #123–149 in dependency order. Base `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → tip `d07002357d3e9596bfaae910a1ac63b77981620b`.

The narrow subject is **physical package ownership versus concern ownership and changed text**. The central example is the staged package at #148 and the CLI cutover at #149. This is not a complete explanation of every cache, transport or lifecycle decision in the stack.

## Declared choices

- Role framing: learner surveying a changing source city.
- Box lenses: physical package/app containment; concern ownership and file role; a selected CLI call/construction path shows the consumer boundary.
- Opening style: picture and a marked city analogy; #148 and #149 are directly selectable in the opening sentence.
- Shape: the city, its keys and seven open boundary readings form the complete stopping layer. Each reading has matching mechanism detail and original reason/source receipts. The headline alone is not claimed to be complete.
- Navigation: stable physical parcels across 27 snapshots, linear stepping/playback, nonlinear building and reading selection, rename counterparts, in-place source dialogs, URL state and focus returns. Camera zoom is geometric, not semantic.
- Trust posture: measured Git surface with conservative, explicit rationale attribution. The deleted timing observations and the narrower host version assertion are named in the complete layer. No verdict, comment collection, review storage or correctness score.
- Persona: a teammate who knows symnav but did not follow the daemon extraction.
- Representations used: an orthographic pixel city; source-path parcels and package districts; changed-text building heights; concern hues; role-specific window textures; removed-path foundations; selected invocation streets and rename roads; seven open boundary readings; exact source and patch receipts.
- Importance rule: distinguish where a concern lives, who invokes it and how much text changed; keep test-observation changes alongside ownership changes.
- Inputs used (beyond bundle): read-only Git objects for main and all 26 PR heads; per-step and main-to-skyline diffs; all versions of surveyed files; the architecture spec; the #148 compatibility inventory and digest; #149 absence inventory; moved worker tests; the commit restoring the host executor version oracle. Bundle use: `pr.json`, contexts/decisions/commits, pins and relevant `repo-rules.md`. The supplied net patch and symbol overviews were not used for measurements. Official library documentation was consulted for renderer, layout and interaction selection.
- Tech: Three.js 0.180.0, D3 hierarchy 3.1.2, PathFinding.js 0.4.18, GSAP 3.13.0, esbuild 0.25.10; native HTML/CSS and locally generated canvas window textures. Python captures evidence; isolated system Chrome through Playwright checks the artifact. Codex; no subagents.
- Built on earlier experiment(s): no implementation, evidence bank, recording or screenshot reused. Read the required **04-textbook-chapter**, **23-zoom-canvas**, **36-be-weird-a**, **37-be-weird-b** and **53-be-weird-53** READMEs. Surveyed earlier shape/representation declarations, including **07-stack-timeline**, **61-pixel-causality-grid**, **63-daemon-constellation**, **65-decision-tetris**, **66-boundary-subway** and **67-blast-radius-terrain**. Borrowed their standards for explicit analogy limits, pinned receipts, complete top layers and return navigation. The [novelty survey](evidence/novelty-survey.json) records the inspected declarations.

## What I tried

Considered one permanent tower per PR/package contribution, then rejected it before implementation: cumulative churn would make deletion grow a tower and obscure the #149 demolition. The final design fixes **physical file addresses** and measures each surviving file against main. A deletion clears the lot while keeping its evidence accessible.

Compared PixiJS, Phaser, Isomer and Three.js before selecting Three.js for real occlusion, orthographic projection and picking. D3 lays out the parcels; PathFinding.js routes streets through free grid cells; GSAP owns the transitions, playback scheduling and render ticker. No custom graph layout, camera gesture system, A* implementation or animation engine was written.

The first city made the invocation road hard to follow between tall buildings. Added endpoint flags and a **Trace CLI road** spotlight. The initial per-building render callbacks were coalesced through the GSAP ticker so animation draws one scene per tick and stops rendering when idle. Moved the receipt controls above the longer block metadata so the source entrance remains visible.

Source checking corrected two draft readings. A command-registration file was initially colored as a daemon mechanism because its directory contained `daemon`; the classifier now keeps CLI command registration with the host. The removed worker version-mismatch case also has a new direct host executor assertion in commit `0f31a619`; the complete note now names both observations and does not call this a repository-wide loss of version coverage.

One browser check initially tried to start a pan on a district-label button. The corrected check drags empty canvas and waits for the rendered camera update. The [first check report](evidence/attempts/browser-checks-first.json) and initial screenshots remain under [attempts](evidence/attempts/). No completed representation was abandoned.

## What I would drop

Repository infrastructure adds visual completeness but little to the central ownership lesson. The all-path finder is useful for auditing and awkward for casual exploration. Full historical source receipts are much larger than the curated explanation. On a phone, the city at fit scale is a locator; zoom or the path finder is needed to inspect individual buildings.

## What I would do next

Ask a maintainer to explain why blue test buildings remain in CLI after #149, then compare their answer with a conventional package diagram using the same evidence. No human comprehension study was performed.

## Time spent

About 40 minutes, including reading, library evaluation, capture, implementation, source reconciliation, browser checks and documentation.

## Visual-variable legend

| Variable | Factual meaning | Limit |
| --- | --- | --- |
| District | Physical package/app prefix. Repository is a separately named infrastructure annex. | Only paths touched in this stack are surveyed; these are not complete package inventories. Reserved empty land may contain future addresses. |
| Parcel | One physical source path, fixed across all snapshots. | A rename occupies two addresses. Parcel area and placement are schematic, not file size or architectural importance. |
| Building height | Added + deleted text lines for that path in `git diff --no-renames main <skyline>`, compressed as `0.55 + 0.4√lines`. | Measures changed text, not total LOC, new behavior, complexity, execution cost or cumulative work. Height can decrease when a change is undone. |
| Faint low stub | Existing path with no text difference from main. | Its 0.55-unit base is an illustrative visibility floor. |
| Crossed foundation | A previously present/touched physical path is absent at this skyline. | There is no height encoding on a cleared lot. The inspector retains exact deletion counts; removal does not prove behavior disappeared. |
| Facade hue | Curated concern owner: daemon cyan, CLI host coral, core green, TypeScript violet, renderer gold, telemetry pink, infrastructure gray. | A path-based interpretation, not CODEOWNERS or human authorship. A mixed file receives one coarse hue. Blue test buildings can remain in CLI after the mechanism move. |
| Windows | Vertical bars: mechanism; checker: test/test support; horizontal bands: contract-oriented path; blank: other support/configuration/docs. | Path rules, not an AST census. Contract files may execute validation; windows do not count assertions or passing tests. |
| Cream road and flags | Selected shipped workspace-daemon call/construction path: CLI → local dispatcher/transport through #148; CLI → invocation coordinator → DaemonClient at #149. | Source-derived schematic, not every invocation branch, package dependency, request hop or live trace. |
| Cyan dashed roads | Selected cross-district renames detected by Git against the preceding PR. Up to five are shown; selecting a participating file isolates its road. | Rename similarity is Git's heuristic. These roads are not an exhaustive list of responsibility transfers. Their distance is meaningless. |
| Skyline control | Main, then each of the 26 dependent PR heads. | Equal spacing and construction motion are illustrative, not development time. There is no autoplay on opening. |
| Outline/filter/spotlight | Reader selection or focus. | No source mutation or persisted review state. |

## Libraries considered and used

| Library | Decision |
| --- | --- |
| [Three.js orthographic camera](https://threejs.org/docs/pages/OrthographicCamera.html) and [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html) | **Used.** Geometry, lighting, depth handling, ray picking and camera gestures suit hundreds of extruded file parcels. Fixed orientation preserves spatial memory; rotation is disabled. |
| [D3 treemap](https://d3js.org/d3-hierarchy/treemap) | **Used.** One stable hierarchical layout assigns package districts and file parcels. Layout weights balance readable districts; they are deliberately not another quantitative channel. |
| [PathFinding.js](https://github.com/qiao/PathFinding.js) | **Used.** Grid A* routes the selected streets around occupied parcels; path compression supplies the orthogonal segments. Road geometry illustrates those library-computed paths. |
| [GSAP](https://github.com/greensock/GSAP) | **Used.** Object-property tweens, easing, delayed playback and ticker scheduling. Reduced motion removes construction interpolation. Original license notices and the [license reference](vendor/gsap-license.txt) are retained. |
| [PixiJS](https://pixijs.com/8.x/guides/components/scene-objects) | Considered. Strong fit for pixel sprites and text; this city would still need projected geometry/depth and a camera integration. Three supplied those together. |
| [Phaser](https://docs.phaser.io/phaser/getting-started/set-up-dev-environment) | Considered. Its game scenes/input and tilemaps are useful, but this artifact has no physics or game-state challenge, and needs source inspection more than a game framework. |
| [Isomer](https://jdan.github.io/isomer/) | Considered. Compact isometric drawing, but the selected interaction needs picking and camera gestures in addition to drawing. |

These are design evaluations, not comparative renderer benchmarks. No generated imagery, remote font, external asset request or hosted service is used. Library notices are in [vendor](vendor/) and [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt).

## What the weird form taught better or worse

**Better:** #148 creates two visible homes for daemon concerns while its invocation road stays in CLI. #149 empties the compatibility lots and redirects the road. The cyan buildings left in CLI have test windows: ownership, source location and observation are distinct facts that can be read together. A giant addition appears as physical surface without implying the same amount of invented behavior. The fixed lots make a removal inspectable instead of deleting it from the explanation.

**Worse:** perspective occludes small files, and height compression needs an explicit scale explanation. An architecture diagram states import direction more directly and is faster for a single revision. This city cannot show temporal correctness, lifecycle gates or assertion coverage through skyline shape; the exact test-observation difference still needs a short note and its patch. Path heuristics are necessarily coarser than symbol ownership.

## Evidence and verification

- [Capture manifest](evidence/capture.json): 27 pinned revisions, 356 physical text paths and 767 unique source blobs. Per-file receipts under `evidence/files/` contain current historical source and the last individual path patch; roughly 15.5 MB of text is loaded only when its file is inspected.
- [Static checks](evidence/static-checks.json): receipt SHA-256 and Git blob identities, complete snapshot references, authored entrances, independently checked selected diff totals, all 27 invocation-road source witnesses, the 38-file freeze/removal and the 37 test moves. Both supplied worktrees have clean tracked status at completion.
- [Browser checks](evidence/browser-checks.json): all 27 skylines; selected file retention; rename roads/counterparts; source/deletion dialogs; all seven reading jumps and reason returns; every authored source entrance; history and direct URLs; keyboard, pixel picking, pan/zoom, role filtering, playback/pause, ordinary/reduced motion, touch controls, JavaScript-disabled reading and widths 320/390/768/1440. Final run: no JavaScript errors or external requests. [Screenshots](screenshots/) were visually inspected.
- [Independent facts](evidence/facts.json): recomputed compatibility digest, all 37 test moves, the rename-aware worker patch and the host version-oracle restoration patch. The new host assertion tests direct executor rejection; it does not reproduce the removed worker initialization-failure observation.
- [Frozen PR input](evidence/stack-pr-bodies.json) and [rename inventory](evidence/renames.json) preserve author context and measurement provenance.

The headline change counts intentionally differ from Git's usual rename-folded PR statistics. For example, #148 is **+32,844/−19,035 across 198 physical text paths** here; the supplied PR summary is +14,624/−815 across 153 rename-folded files. Both have the same net +13,809. Showing both addresses is necessary for the city, and the on-page count caption states this convention.

Rationale search covered supplied PR context/decisions/commit prose and the relevant architecture material. The specific duration-assertion removals remain unexplained in that inspected material; this is not a claim that no explanation could exist elsewhere. Existing symnav test suites were **not run**. The artifact presents source and recorded Git measurements, not runtime execution, parity, performance or correctness results.

No symnav source, branch or worktree was modified. Campaign queue, index and commit handling are left to the orchestrator.

## Regeneration

Opening the artifact requires none of these commands. With the supplied worktrees and Git objects available, from this folder:

```sh
npm ci
python3 scripts/capture.py
npm run build
node scripts/verify.mjs
node scripts/browser-check.cjs
```

The browser checker uses the already installed Playwright package at `/tmp/rich-review-05-browser/node_modules/playwright` and system Chrome. Override `CITY_PLAYWRIGHT`, `CITY_CHROME` or `CITY_URL` if needed. It otherwise opens `index.html` directly with an isolated browser. Capture and generation write only inside this experiment.
