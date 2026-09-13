# daemon-constellation

## Entry point

Open [index.html](index.html) directly:

```sh
open ~/projects/rich-review-v2/experiments/63-daemon-constellation/index.html
```

No server, installation, network connection or live worktree is required. The browser bundle and source receipts are local. JavaScript enables the map; the complete seven-reading layer is also present in static HTML and in [Markdown](evidence/decision-register.md).

Select a star to inspect its owner and dependencies. Select a directory ring to zoom. **Find counterpart** connects the CLI and package files with a dotted source-correspondence tether. **Follow active CLI** and **Follow package launch** expose different dependency sets. Search accepts file names or paths. Wheel/pinch zooms; dragging pans; **Home** fits both owners; **Escape** returns from a star or source receipt. The seven numbered readings and previous/next controls provide a linear route. Direct fragments and browser history preserve the selected reading and file.

## Kind

page, interactive

## Subjects

pr-148 only — Own daemon mechanisms behind DaemonClient.

Base `ba53c8e1662fd86d198b95321c90d9c9bef10184` → head `20838f8dbf413e04767543eb2380d0d114da6c60`.

## Declared choices

- Role framing: learner exploring source ownership. Assigned angle: a navigable constellation of daemon ownership.
- Box lenses: static package/directory/module containment plus runtime construction, calls and executable-entry dependencies. Directory rings are explicitly not process boundaries.
- Opening style: picture and a marked spatial analogy. Two simultaneously occupied source homes make the headline concrete: the package gains mechanisms while the shipped CLI keeps its own graph.
- Shape: ownership constellation above one complete seven-reading register. The register names every authored decision, exception and rationale gap explored through the inspector. It is the complete stopping layer together with the opening; the headline alone is not claimed to satisfy the pyramid invariant.
- Navigation: directory zoom, graph-neighbor traversal, source-counterpart jumps, search, seven linear readings, ordinary anchors, browser history and direct fragments. Source dialogs preserve selection and restore focus.
- Trust posture: source-backed explanation with stated versus unexplained reasons. The 38-file freeze is independently recomputed; the selected runtime dependencies have exact call/construction/load witnesses. Existing symnav tests are evidence as source, not reported passing runs. No correctness verdict, review storage or response collection.
- Persona: a teammate who knows symnav but has not worked on the daemon extraction.
- Representations used: two directory-packed source constellations, five mechanism glyphs, ownership color, compatibility dimming, directed dependency paths, source-counterpart tethers, an inspectable owner/path/dependency panel, a complete decision register, and predict/reveal prompts. The representation itself carries containment, coexistence, composition and the absent consumer switch.
- Importance rule: source ownership versus active invocation first; public and executable boundaries next; private authority and clock ownership after that. Deleted test observations and unexplained choices stay in the complete layer.
- Inputs used (beyond bundle): read-only base/head production sources, package manifest, boundary and construction tests, moved worker/lifetime tests, architecture and functional follow-up plans, and pinned Git identities. Bundle: PR body, all 45 commit subjects, full patch, file inventory. No other PR worktree, live daemon run or previous experiment recording was used.
- Tech: D3 7.9.0, Graphology 0.26.0, local SVG/HTML/CSS, esbuild 0.25.10, Python source capture, system Chrome via Playwright. System fonts. Codex harness; no delegated agents.
- Built on earlier experiment(s): no earlier implementation, layout or evidence bank was reused. Read the required 04-textbook-chapter, 23-zoom-canvas, 36-be-weird-a, 37-be-weird-b and 53-be-weird-53 READMEs. Also read 23's decision inventory as an exception checklist, then checked claims against the supplied sources. Surveyed representation declarations across finished READMEs and specifically inspected 06-hub-and-spokes, 18-negative-space, 35-future-self, 50-recombine-angles-50, 57-recombine-angles-57 and 60-be-weird-60. Borrowed the standards of bounded evidence, explicit analogy limits, source return paths, and test honesty. This is neither 06's single central hub nor 23's authored rectangular room hierarchy: the directory tree lays out actual files, and both ownership graphs coexist.

## What I tried

Considered Sigma.js/Graphology, Cytoscape.js and D3. Chose D3's circle packing for real nested directory containment, D3 zoom for the camera, Graphology for directed dependency navigation, and D3 force collision for label placement. A continuously moving force constellation was rejected before implementation: proximity would imply a measured relationship and source positions would drift while being read. The final layout is stable.

The first package launch view had two overlapping worker labels. The [initial screenshot](evidence/attempts/label-overlap.png) is retained. D3 collision placement separated the labels; a browser geometry check now verifies the visible launch labels. Thin leaders keep displaced labels attached to their stars. An evidence build also caught a citation ending beyond package.json; the range was corrected before delivery. A later 320px check caught the expanded analogy note touching the camera controls; spacing was corrected and the failing receipt is retained under evidence/attempts/.

The first ownership view hid all arrows, which made its instruction to follow the active caller unhelpful. The opening now shows the dispatcher's local construction links and the facade's internal load dependency. Deeper selections add relevant links rather than drawing an unreadable complete edge web.

## What I would drop

The one-star-per-file density is useful for seeing that the CLI copies remain, but some small protocol and contract stars add little on a phone. The name-based search is more useful there. I would also shorten the seven-reading rationale register if a future brief permits omission of peripheral test/configuration choices; those details do not naturally fit a constellation.

## What I would do next

Give an unfamiliar reader the two-owner view and ask which CLI files can be removed at this commit, then ask them to follow the package's launcher to its worker entry. Compare their explanation with the same facts in a conventional two-column dependency diagram. No human comprehension study was performed here.

## Time spent

Approximately 30 minutes, including guidance/source reading, library comparison, construction, browser checks, screenshot inspection and documentation.

## Visual-variable legend

| Variable | Meaning | Limit |
| --- | --- | --- |
| Outer orbit | Mapped source directory belonging to CLI or daemon package | Only `apps/cli/src/daemon` and `packages/daemon/src` are mapped; this is not all app code. |
| Nested orbit | Real package source subdirectory | Rings are source containment, not processes. |
| Amber | CLI / former mechanism home | Owner color does not mean the file is unchanged from base. |
| Mint | Added production source in the package / new home | 43 added files include client and entry additions, not only copies. |
| Slate | Eight existing package source files | This is retained source ownership, not an inactivity signal. |
| Star / triangle / diamond / square / circle | Composition / entry or launch / transfer / state or policy / contract or vocabulary | An editorial primary-role grouping; a file can have several roles. |
| Dim amber at overview | One of the 38 frozen compatibility mechanisms | They still belong to the active CLI graph. Focus brightens selected dependencies without changing their role. |
| Solid directed link | Selected runtime construction or call dependence; source → collaborator | Not all imports or every possible runtime edge. Calls may be conditional. |
| Dashed directed link | Runtime load, process launch or worker creation | Source-traced possible dependence, not an observed chronological trace. |
| Fine line without arrow | Attaches a displaced label to its star | A label leader, not a dependency. |
| Dotted tether | CLI/package source correspondence | Both exist at head; it is not a runtime edge or a file-move animation. |
| Bright halo | Current selection and its neighborhood | UI focus, not traffic or importance. |
| Position / size / camera motion | Layout and navigation | No force, time, frequency, memory, importance or runtime magnitude is measured. |

There are 92 production file stars: 41 CLI files (38 frozen plus three invocation files) and 51 package files (43 additions plus eight existing). The graph contains 59 selected directed dependencies. The primary-role glyph assignment and selection dimming are editorial; directory paths, file counts, source pins and dependency witnesses are factual. The analogy warning sits beside the instrument, and the source-correspondence caveat appears with the tether.

## Libraries considered and used

| Library | Consideration | Result |
| --- | --- | --- |
| [Sigma.js + Graphology](https://www.sigmajs.org/) | Strong graph navigation/rendering direction; nested directory enclosures and five glyph roles were the decisive requirements for this small graph. | Graphology used for graph structure and incoming/outgoing/neighborhood queries. Sigma renderer not used. |
| [Cytoscape.js](https://js.cytoscape.org/#notation/compound-nodes) | Mature compound graphs, styling and layouts. | Considered; chose literal circle enclosure rather than compound-node diagram styling for this experiment. |
| [D3 hierarchy / pack](https://d3js.org/d3-hierarchy/pack) | Directly encodes directory hierarchy as nested enclosures. | Used for every file and directory coordinate within each owner frame. |
| [D3 zoom](https://d3js.org/d3-zoom) | Pointer, wheel, touch, programmatic fit and animated camera transforms. | Used; no hand-built camera or semantic zoom engine. |
| [D3 force](https://d3js.org/d3-force) | Collision and position forces for readable labels. | Used as a stopped deterministic label layout, not a simulated daemon. |
| D3 shapes and transitions | Standard symbols and reduced-motion-aware transitions. | Used for glyphs and navigation. |
| esbuild | Produces a local browser bundle from pinned npm dependencies. | Build only; the artifact opens without npm. |

Exact dependency versions are locked in [package-lock.json](package-lock.json). [License notices](LICENSES.md) accompany the distributed bundle. No hosted runtime dependency or generated bitmap asset is used.

## What the weird form teaches better or worse

**Better:** the 38 dim amber stars remain visibly present beside their mint counterparts. Ownership transfer cannot quietly imply that the production caller switched. Directory rings also make the package's separate execution, transport, lifecycle and worker owners visible without treating every owner as a new process. Following an arrow and then opening its construction line connects a spatial claim to a precise witness. The counterpart tether makes duplication tangible.

**Worse:** a normal directed diagram can put launcher → process → worker in a cleaner reading order. This layout favors directory membership, so launch arrows cross module rings and exact chronology is deliberately absent. File glyphs summarize multi-role modules; small labels need zoom/search. Reasons, changed test observations and control exceptions still require prose. The register is long relative to the narrow visual lesson. These are design observations, not measured comprehension gains.

## Evidence and validation

- [Source capture](scripts/capture.py) pins both commits, enumerates every mapped production file, independently verifies the normalized compatibility digest and 37 test-file relocations, and captures 166 frozen documents. It writes only in this experiment.
- [Inventory](evidence/inventory.json) records the counts, digest, pins, source counts and initial worktree status. [sources.json](evidence/sources.json) contains full files with SHA-256 hashes and original line structure. [diff.patch](evidence/diff.patch) is the supplied patch.
- [Pyramid map](evidence/pyramid-map.json) maps each complete reading to its inspector explanation, teach-back and source receipts. There are 37 reading receipt selections in addition to every dependency's witness and file-level base/head access.
- [Browser check source](scripts/browser-check.cjs) and [passing results](evidence/browser-checks.json): 13 groups cover all 92 pointer-selectable stars, all 59 dependency receipts, seven reading returns, all 37 reading sources, correspondence navigation, search, deep links, reload/history, keyboard, pan/zoom, source expansion, widths 320/390/768/1440/1920, touch, reduced motion, static reading and printing. No browser errors or network requests occurred. Ordinary-motion camera behavior is checked separately in [supplemental checks](evidence/supplemental-checks.json).
- [Static validation](evidence/static-checks.json) reconciles captured hashes, citation ranges, links, correspondence inventory, manifest and clean tracked worktree status.
- [Screenshots](screenshots/) were inspected: opening, ownership map, launch dependencies, a CLI/package counterpart and the phone reading surface.

The graph is curated source evidence, **not** a Node module-resolution trace or daemon run. The 59 edges are a selected set; a zero outgoing count in the inspector does not prove isolation. This experiment did not run existing symnav tests, benchmark the daemon or judge PR correctness. Source/branch files in both symnav worktrees remained unchanged.

## Rebuild and recheck

Opening the finished page needs none of these steps. From this folder, with the supplied worktrees still at the pinned commits:

```sh
npm ci
python3 scripts/capture.py
npm run build
python3 scripts/verify.py
npm run check
node scripts/supplemental-check.cjs
```

The browser check uses the installed Playwright package at `/tmp/rich-review-05-browser/node_modules/playwright` and system Chrome. Set `CONSTELLATION_PLAYWRIGHT` and `CONSTELLATION_CHROME` to other installed paths when needed. The repository index, queue, supervisor files and other experiment folders are left to the campaign orchestrator.
