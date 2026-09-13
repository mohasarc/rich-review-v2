# blast-radius-terrain

## Entry point

Open [index.html](index.html) directly:

```sh
open ~/projects/rich-review-v2/experiments/67-blast-radius-terrain/index.html
```

No installation, server or network is needed to read it. Select a peak, cross a numbered saddle, then select a reader file to open exact source. **Relief / Plan**, drag, wheel and **Fit** change the view. **Previous / Next** traverses the 13 readings. Escape closes source and restores focus; outside source it returns to Output. Browser Back restores a peak or saddle. On a phone, **Read [region]** jumps to the inspector and **Map** returns.

The open survey is the complete stopping layer. The linear source book and survey also work without JavaScript. If WebGL is unavailable, the inspector still exposes the measured readers and receipts.

## Kind

page, interactive

## Subjects

pr-131 — Route daemon thresholds through centralized policy. Base `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e` → head `b100221db48754656328391b878299c5a0bab443`. Sixty changed files, +1,298/−544. No other PR is explained.

## Declared choices

- Role framing: a reader surveying where one policy decision reaches multiple mechanisms.
- Box lenses: static package/module ownership and shared input coupling. `packages/daemon` supplies the policy; the measured mechanisms remain in `apps/cli`. The authority boundary moves without a package move. Parent/worker validation supplies one concrete runtime boundary fault.
- Opening style: a marked terrain analogy and a compact before/after ownership strip.
- Shape: one connected topographic field, seven policy regions, a test shore and five faults. The narrow teaching subject is **direct policy readership versus shared consumers**. It is not an end-to-end daemon explanation.
- Navigation: peak → reader → exact access; saddle → shared readers → both sections' accesses. An open survey, sequential inspector controls, direct fragments, source book and return links provide linear and nonlinear reading.
- Trust posture: measured static references, source-traced consequences and attributed reasons. Eight grouped records have stated reasons; five fault records identify specific rationale gaps. A general rationale for adapters or budgets is not applied to every implementation detail.
- Persona: a TypeScript-familiar teammate who knows symnav but not daemon composition.
- Representations used: D3 contours lifted into Three.js relief; policy biome colors; shared-reader saddles; dashed authority/failure/test faults; linked source footprints; a package ownership strip; open decision register; base/head source receipts.
- Importance rule: altitude orders distinct direct production-reader files. Unexplained choices remain visible regardless of altitude. No weighted risk, correctness or quality score.
- Inputs used (beyond bundle): pinned base/head TypeScript source and compiler configuration; unchanged central policy implementation and tests; `plans/005/daemon-policy.md`, architecture specification and contributor guidance; Git blobs and worktree status; fresh TypeScript-checker reference extraction. Bundle files used: `pr.json`, `diff.patch`, `files.txt`. The overviews were not used. No daemon trace or implementing-agent conversation was supplied or invented.
- Tech: D3 7.9.0, Three.js 0.180.0 and OrbitControls; TypeScript 5.9.2 for extraction; esbuild 0.25.10 for an offline bundle; Playwright 1.61.1 and system Chrome for checks. System fonts, no external assets. Codex, no subagents.
- Built on earlier experiment(s): the READMEs for **04-textbook-chapter**, **23-zoom-canvas**, **36-be-weird-a**, **37-be-weird-b** and **53-be-weird-53** informed evidence, complete-layer and return-navigation standards. Their implementation and PR-specific evidence were not copied. **28-blast-radius-tool** supplied a warning about missed policy-field references and the limits of seed-based radius; this experiment instead makes a fresh compiler-resolved field census. **52-critique-response-52** supplied audit leads about validation timing, adapter precedence and benchmark fields, rechecked against the worktrees. A scan of earlier README representation fields found identity matrices, a loom, tension bench, ranked radius bars, constellations, a raster and Tetris, but no finished policy terrain. Experiments 62 and 66 had no README when checked. Existing unfinished files and two worker logs in this same assigned folder were preserved and completed.

## What I tried

Kept the unfinished folder's source-capture and survey starting point, corrected its source anchors, and built the terrain renderer and interactions. Re-ran extraction rather than accepting the earlier capture. Passing the absolute compiler configuration path fixed ambient Node-type resolution; the final base/head collector has zero syntax or semantic diagnostics. The reader counts did not change.

The terrain uses a maximum spanning tree of observed section overlaps, laid out by D3. This gives six continuous ridges without drawing thirteen crossing connectors. Every omitted overlap is still available in the inspector. The scalar field combines compact hills with saddles; summit height is exact, while intervening relief is explicitly illustrative.

Early screenshots exposed a clipped summit, an overly bright rectangular ground plane, an unreadable selected label and collisions at 320 pixels. I fitted the camera, removed the surrounding mesh, corrected selected text color and used D3 point scales for narrow-screen label rails. Removing smooth page scrolling resolved an unstable native source-link check with JavaScript disabled. Earlier screenshots and failed check receipts are retained in [evidence/attempts](evidence/attempts/). No complete representation was abandoned.

The audit added the parent-side validation fault and clarified a test distinction: base expectations already shared production constants. Switching them to policy values is not presented as a newly invented dependence on production values.

## What I would drop

The full-file source bank is useful for checking claims but large for ordinary reading. The separate fault strip repeats labels already on the map; it remains because small reference counts must not hide those choices. The open survey is still long. The 3D view loses its advantage on a phone, where the labeled plan and source inspector do more work.

## What I would do next

Ask an unfamiliar reader why Startup and Shutdown share the broadest saddle, and why Transport's low summit says little about its callers. Compare their explanation with one elicited by a conventional adjacency matrix. No comprehension trial was run here.

## Time spent

About 30 minutes for this completion pass, including source reconciliation, rendering, browser checks and documentation. The two pre-existing unfinished attempt logs are retained; their time is not included in this estimate.

## Visual-variable legend

| Variable | Encoded fact | Limit of the analogy |
| --- | --- | --- |
| Summit elevation and large numeral | Distinct head production files that directly read the policy section or a leaf | Static source footprint; excludes transitive callers and runtime frequency. A low peak is not low operational importance. |
| Contour interval | One file-unit between interior contours | Only summit values are observations. Slopes and interpolated values between summits are synthetic. The faint shoreline is an illustrative boundary. |
| Biome color | Output green; Startup olive; Shutdown rose; Resources ochre; Diagnostics violet; Transport blue; Delivery orange | These are named policy contexts, not formal process or package boundaries. Blended ground colors do not indicate additional contexts. |
| Saddle width | Number of reader files shared by two sections | Six ridges form a maximum spanning tree; all thirteen overlaps are inspectable. Ridge length, location and travel distance are not measured dependencies. |
| Numbered saddle badge | Exact shared-file count | Narrow maps show the selected saddle's badge; the inspector retains all overlaps. |
| Rust dashed fault and F1–F5 marker | Error provenance, translated fixtures/report shape, deleted assertions, test premises, earlier parent validation | Marker position, length and elevation carry no severity or probability. Each opens the stated rationale gap and source. |
| Outer dashed line, on demand | Threshold authority moves from local CLI defaults to required package policy | An illustrative authority boundary. Code does not relocate into the daemon package in this PR. |
| Reader hover/focus | Highlights every region read by that selected source file | File-level coupling, not proof that its settings interact in the same execution. |

## Libraries considered and used

| Option | Decision |
| --- | --- |
| [D3 contours](https://d3js.org/d3-contour) | Used to compute contour polygons from the scalar field. The contouring algorithm is supplied by the library. |
| [D3 tree](https://d3js.org/d3-hierarchy/tree), [collision force](https://d3js.org/d3-force/collide) and point scales | Used for overlap-tree placement, separated labels and narrow-screen label rails. No custom graph layout or semantic-zoom engine. |
| [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html) | Used for relief, plan camera, orbit, pan, zoom and pointer picking. It makes height physically inspectable. No automatic camera animation. |
| [deck.gl TerrainLayer](https://deck.gl/docs/api-reference/geo-layers/terrain-layer) | Considered; its elevation-image and geographic terrain path adds machinery this small source-derived field does not need. |
| [Observable Plot contour mark](https://observablehq.com/plot/marks/contour) | Considered for a flat contour sheet. A good simpler alternative, but relief and precise 3D picking earned a Three.js renderer here. |

Dependencies are bundled locally. Licenses are included in [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt).

## What the terrain teaches better or worse

The intended advantage is simultaneous reading of **reach, context and coupling**. Output is the highest summit, but Startup–Shutdown has the widest shared saddle. Those are different source facts. Hovering `workspace-daemon.ts` lights five policy regions; hovering `local-daemon-transport.ts` lights Output, Transport and Delivery. The small transport peak therefore exposes the measurement's limit rather than making a claim about runtime importance.

A conventional diagram would show exact adjacency more directly and an adjacency matrix would expose every overlap without a spanning-tree projection. Terrain makes a few relationships memorable but gives arbitrary distance and height undue visual authority unless its limits remain visible. Error provenance, test-case selection and rationale gaps need prose and paired source: hills alone cannot explain them. These are design judgments, not measured comprehension outcomes.

## Evidence, verification and regeneration

The census contains **91 resolved access expressions in 17 distinct head production files**. Nested property expressions may produce multiple access entries on the same line; altitude deduplicates by file. Counts are Output 7, Startup 6, Shutdown 6, Resources 4, Diagnostics 3, Transport 1, Delivery 1. These counts overlap and must not be summed. Base counts record adoption of the policy snapshot, not the old local-default blast radius.

- [capture.json](evidence/capture.json): every expression, file set, revision, source and SHA-256 hash.
- [decision-register.md](evidence/decision-register.md) and [pyramid-map.json](evidence/pyramid-map.json): the thirteen open records and their mechanism/source crosswalk.
- [static-checks.json](evidence/static-checks.json): frozen source/Git checks, patch inventory, exact access locations, counts, overlaps, source anchors and local links.
- [browser-checks.json](evidence/browser-checks.json): all 13 readings, 71 receipts, 28 reader-file visits, 13 overlap relationships, shared-section access selection, full-source expansion, focus/history, camera controls, 320/390/768/1440 pixel layouts, touch, direct file opening, JavaScript-disabled reading and WebGL fallback. Final normal-browser checks report no page/console errors or external runtime requests.
- [screenshots](screenshots/): visually inspected opening, shared saddle, source descent, error fault, plan boundary and phone views. Failed drafts remain under `evidence/attempts`.

These checks validate this artifact and its extraction. **No Symnav test suite or daemon execution was run for this experiment.** Tests are presented as source evidence. Both supplied worktrees retain clean tracked status; no Symnav source, commit or branch was changed. The page has no verdict, comment storage or review collection.

To regenerate, with the supplied worktrees still present, run from this folder:

```sh
npm ci
npm run capture
npm run build
node scripts/verify.mjs
npm run check
```

Browser checks use installed Google Chrome on macOS. Set `TERRAIN_CHROME` to another Chrome/Chromium executable path if needed. These commands are only for rebuilding and verification; opening the generated page needs none of them. Index, queue and repository commits are left to the campaign orchestrator.
