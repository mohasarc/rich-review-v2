# boundary-subway

## Entry point

Open [index.html](index.html) directly:

```sh
open ~/projects/rich-review-v2/experiments/66-boundary-subway/index.html
```

No installation, server, network connection or live worktree is required to read it. Select **Express** for the facade boundary, **Local** for mechanisms, or a colored line to isolate one flow. **Follow a journey** provides ten source walks. Select a station or numbered notice for mechanism and exact receipts. Drag to pan, Ctrl + wheel to zoom, or use the camera buttons. **Home** fits the map; **Escape** returns to the facade. Journey controls also accept left/right arrows. Source dialogs restore focus on close. Direct fragments, history and ordinary return links preserve navigation.

The eight complete notices and offline source book remain available with JavaScript disabled. Desktop is the best surface for the complete local network; phone layouts run vertically and selected journeys are more readable than the full network.

## Kind

page, interactive

## Subjects

pr-148 only — **Own daemon mechanisms behind DaemonClient**.

Base `ba53c8e1662fd86d198b95321c90d9c9bef10184` → head `20838f8dbf413e04767543eb2380d0d114da6c60`.

## Declared choices

- Role framing: learner tracing responsibility across a public client boundary. Assigned angle: request, result, recovery and lifecycle as transit services.
- Box lenses: static host/package mechanism ownership and runtime caller/daemon/worker containment. The host and package client share a caller process; the daemon group contains its executor worker. The still-active CLI graph is shown separately.
- Opening style: a marked transit analogy and express network. One entrance serves four responsibilities, while the shipped CLI still uses its frozen graph.
- Shape: complete opening map plus eight visible service notices → selected mechanism or journey → pinned source receipt. The complete stopping layer spans several viewports; the headline alone is not claimed to be complete.
- Navigation: line isolation, express/local service, station selection, ten stepwise source walks, eight sequential notices, direct fragments/history, source dialogs and return links. D3 zoom changes camera scale; express/local is an explicit detail switch, not custom semantic zoom.
- Trust posture: read-only explanation. Reasons are stated only when found in the supplied prose; exact choices with no rationale remain unexplained. Removed observations and test/configuration changes appear in the complete layer. No verdict, comment collection, persistence or correctness score.
- Persona: a teammate who knows symnav but not the daemon boundary.
- Representations used: four directed transit networks; authority-shaped stations; responsibility-sized interchanges; package/process enclosures; active compatibility strip; two actual closure tracks; schematic source walks; open service notices; frozen source and diff excerpts.
- Importance rule: crossing the client boundary and replay authority first; retained lifecycle/authentication exceptions next; removed routes and changed test observations stay visible. The narrow lesson is who owns a route and when it is permitted, not an explanation of every internal algorithm.
- Inputs used (beyond bundle): pinned base/head source, contributor guide, architecture/policy/follow-up plans, manifests, moved and added tests, six focused head test suites, Git identities and tracked status. Independently recomputed the compatibility digest and test-move inventory. Bundle use: PR body/commits, patch, file inventory and relevant repo rules. No other PR worktree or live daemon trace was used.
- Tech: D3 7.9.0 for SVG joins, symbols, paths, zoom and camera transitions; ELK.js 0.12.0 for layered compound layout and orthogonal routing; HTML/CSS/JavaScript; Node evidence/build scripts; isolated system Chrome through Playwright. Codex harness; no delegated agents.
- Built on earlier experiment(s): borrowed evidence and interaction standards from the required 04, 23, 36, 37 and 53 READMEs. Surveyed earlier representation declarations and inspected relevant material in 06, 18, 57, 61, 63 and 65. Used 23's decision inventory as an exception checklist, with claims checked against source. No earlier experiment implementation or evidence bank was reused. Continued this folder's interrupted model/dependency setup; [research notes](evidence/research-notes.md) identify that reuse and the survey.

## What I tried

Started from the unfinished model already in this assigned folder, then verified its claims and corrected two stale source anchors. The first compound layout produced long return loops and revealed an adapter error: ELK's internal edge coordinates belong to their declared container. Correcting that conversion and orienting layout constraints by responsibility stage made the express network readable. Runtime arrows retain their original direction.

The full 16-station view still shrank labels too far. I kept it as a locator and added independently laid-out line and journey views. A downward ELK layout plus a taller canvas replaced the first tiny phone rendering. ELK label spacing fixed a diamond/label collision. Failed screenshots remain in [evidence/attempts](evidence/attempts).

The pyramid audit promoted constructor-time loading, memoized observations, ACK disposal, probe settings and active-work deferral into the visible notices. It also retained the lint closures, Windows test expectation, direct-factory oracle and test configuration choices rather than letting those appear only in receipts.

## What I would drop

The all-local view is dense and mainly helps orientation. The exact station-area formula is less useful than simply seeing which flows meet, and editorial authority shapes need a legend. The peripheral test/configuration notice is long because those decisions do not fit naturally on transit tracks. The form works best on one selected route.

## What I would do next

Give a reader the recovery line and ask where an uncertain submission, an accepted close and a partially received result can go. Compare their explanation with the same facts in a conventional sequence diagram. No human comprehension trial was performed.

## Time spent

About 30 minutes for the completion pass. Earlier interrupted attempts and their logs were retained in the assigned folder.

## Visual-variable legend

| Variable | Meaning | Limit |
| --- | --- | --- |
| Teal / Q | Request selection and submission | Selected responsibility path, not every transport hop. |
| Blue / R | Result transfer and return | Capture/ACK details are expanded in the source walks. |
| Coral / X | Recovery and permission to replay | The local branch is retry-safe only. A closure symbol is not used for forbidden replay: that route was not removed by this PR. |
| Ochre / L | Start, status, stop and lifetime | Different lifecycle actions have different credentials and timeouts. |
| Circle | Contract / callable boundary | Editorial primary authority role. |
| Diamond | Decision or authentication gate | A diamond does not mean every action uses the same credential check. |
| Square | Owner of retained state | Some stations group several collaborating mechanisms. |
| Triangle | Injected executor or host integration | The host-supplied executor can run locally or in the daemon worker. |
| Station area | `140 + 145 × distinct mapped flow types` SVG units² | Curated responsibility count, not traffic, importance, complexity or measured workload. |
| Dotted enclosure + label | Host integration, package client, daemon process | Client and host are in the caller process; the worker is inside the daemon process. Source ownership and process boundaries are explicitly named. |
| Express / local | Grouped facade stops / private mechanism stops | Express is fewer explanatory stops, not faster execution. |
| White chevron | Direction of the mapped flow | Layout can place a return destination to the left or above its source. |
| Grey dashed track with crosses | An actually removed timing input or public test export | The separately shown frozen CLI service remains active. |
| Muted green solid service | Shipped CLI through 38 frozen app-local mechanisms | Frozen does not mean unused or byte-identical to the PR base. |
| Yellow station fill / dotted halo | Selected station or journey step | UI focus, not live traffic. |
| Position, distance and camera movement | Navigation and diagram layout | No timing, load, force or performance measurement. |

The lossy-map label appears beside the network. Every journey states that it is a schematic source walk and no daemon is running. The browser changes the explanatory selection; it does not simulate execution outcomes or claim a recorded trace.

## Libraries considered and used

| Library | Evaluation | Choice |
| --- | --- | --- |
| [ELK Layered](https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html) / [ELK.js](https://github.com/kieler/elkjs) | Compound groups, multiple edges and orthogonal routing suit package regions with shared transit stops. | Used at build time for all 32 desktop/phone layouts. Station positions and bend points are library outputs. |
| [D3](https://d3js.org/d3-zoom) | Provides SVG data joins, standard symbols and mature pan/zoom while retaining custom station labels and HTML evidence. Alone it would still need a routing/layout engine. | Used with ELK; a local pinned runtime and license are in `vendor/`. |
| [Cytoscape.js](https://js.cytoscape.org/) | Attractive for graph interaction and selection, but this small artifact needs specific transit glyphs and routed compound geometry more than a general graph workspace. It would still need an appropriate routing layout. | Considered; selected ELK plus D3 to keep one SVG camera and direct control of the transit rendering. |

ELK runs during generation, so opening the artifact does not need workers, cross-origin imports or the npm installation. Reproduction dependencies are pinned by `package-lock.json`.

## What the form teaches better or worse

The recovery branch makes a useful distinction spatial: a safe failure can return to the host's local executor; accepted recovery heads back toward the same accepted work or its retained result. Four services converging on one circle and separating behind it distinguish the public facade from compounded internal responsibility. The still-open compatibility strip prevents package ownership from being mistaken for a completed CLI cutover. Actual crossed-out inputs make removal distinct from staging.

A conventional sequence diagram is better at exact timing, await order, and conditional transport calls. The subway deliberately compresses those into grouped stops; receipts and step descriptions restore precision. A table is better for the differing authentication credentials and deleted test assertions. Those remain concise notices rather than being forced into invented transit behavior. These are design observations, not measured learning gains.

## Evidence and checks

- [Source bank](evidence/sources.json): 35 full frozen documents and 58 receipts, including two assembled bundle excerpts. Worktree excerpts use original line numbers and source hashes. Bundle excerpts explicitly use local row numbering; patch hunks retain their original before/after coordinates.
- [Inventory](evidence/inventory.json): 153 changed files in the supplied patch, 37 relocated mechanism tests, and the independently verified 38-file compatibility digest.
- [Confirmed focused test run](evidence/focused-tests-confirmed.log): **57 passed in 6 files**. The retained [earlier run](evidence/focused-tests.log) reports the same selection. This is not full CI, CLI parity, a Windows run, or a live transfer recording.
- [Browser checks](evidence/browser-checks.json): 11 passing groups, all 16 stations, all ten journeys and 45 steps, both modes and four lines, eight notice returns, 52 unique attached source receipts, focus restoration, source-book expansion, history, keyboard, pan/zoom, 320/390/768/1440px widths and JavaScript-disabled reading. No page errors, page overflow or external requests in the checked paths.
- [Static checks](evidence/static-checks.json): frozen source reconciliation, all graph endpoints checked against ELK station coordinates, source/notice addresses, local links, file inventories and clean tracked worktrees.
- [Screenshots](screenshots): opening, recovery line, accepted reattachment, source receipt and phone layouts. Desktop, source and phone captures were visually inspected; intermediate failures are retained.
- [Research and pyramid audit](evidence/research-notes.md): rationale search boundary, per-notice coverage, analogy limits, earlier experiments used and failed attempts.

Symnav source and branches were untouched. This completion writes only inside `experiments/66-boundary-subway/`; root index and queue handling are left to the campaign.

## Reproduce

Reading requires only the supplied files. To regenerate after editing the model/template, with the assigned worktrees still at their pins:

```sh
cd ~/projects/rich-review-v2/experiments/66-boundary-subway
npm ci
npm run build
node scripts/verify.mjs
npm run check
```

The browser script uses system Chrome and `/tmp/rich-review-05-browser/node_modules/playwright`. Set `SUBWAY_PLAYWRIGHT` to another installed Playwright package path if needed. It creates an isolated browser and writes its report/screenshots here.

To repeat the focused source suites from `worktrees/pr-148-head/packages/daemon`:

```sh
pnpm exec vitest run src/client/daemon-client.test.ts src/client/daemon-routing-policy.test.ts src/client/daemon-client-control.test.ts src/client/daemon-client-public.test.ts src/transport/execution-client.test.ts src/lifecycle/daemon-lifetime.test.ts
```
