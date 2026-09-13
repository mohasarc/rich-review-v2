# admission-circuit-board

## Entry point

Open [index.html](index.html) directly:

```sh
open ~/projects/rich-review-v2/experiments/72-admission-circuit-board/index.html
```

No installation, server, network, or worktree is needed to use the built artifact. JavaScript is required. The opening shows a completed two-scope recovery. **Trace again** follows its signal; **Step**, the stage slider, and **Show outcome** support inspection at any pace. Choose a preset or change the switches. Click a component or one of the eight readings for mechanism and frozen source. Escape returns focus to the opener.

Drag to pan; use **Fit board** or **Follow signal** to change scale. On a phone, the fitted circuit is an overview; Follow signal enlarges the current component. The complete readings remain normal-sized text.

## Kind

other: interactive simulation — an offline circuit board with source-executed admission/retry gates and modeled I/O.

## Subjects

`stack`: main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → #149 `d07002357d3e9596bfaae910a1ac63b77981620b`.

Narrow teaching scope: **what permits a warm request to fall back locally, and what recovery remains after acceptance**. Relevant slices are #133–134 (failure/admission authority), #137–139 (transport/transfer ownership), #142 (execution recovery), and #148–149 (staging and active package ownership). This is not a decision inventory for all 26 PRs. Cache lifetimes, worker replacement, startup election, policy beyond these recovery counters, and the full stack's test changes are outside the explanation.

## Declared choices

- Role framing: learner operating a fault-injection instrument; no verdicts or response collection.
- Box lenses: source package ownership and caller/daemon/host process boundaries, kept distinct through the board enclosure and package stamps.
- Opening style: completed recovery circuit and the marked acceptance-latch analogy; before/after ownership strip.
- Shape: complete stopping layer = opening, circuit, legend, simulation caveat and eight open readings. Matching mechanism/source dialogs deepen those readings. The headline alone is not the complete layer.
- Navigation: linear signal stepping and numbered readings; nonlinear switches, component inspection, source selection and geometric pan/zoom. Dialogs have previous/next and focus-preserving return. No semantic zoom.
- Trust posture: source-derived simulation, conservative stated/unexplained reasons, frozen source receipts, controlled actual-client probes, and bounded test results. No correctness verdict or whole-stack parity assertion.
- Persona: a TypeScript teammate who understands a request/response exchange but has not learned this daemon's acceptance boundary.
- Representations used: ordered gate chain; route multiplexer; consistency fuse; local-permit OR gate; acceptance latch; two recovery counters; colored orthogonal traces; outcome LEDs; package/process stamps; controlled failure presets; exact source excerpts.
- Importance rule: authority to start local execution first, then delivery state, first-failure vocabulary, recovery scope, physical ownership and evidence limits.
- Inputs used (beyond bundle): pinned main/head source and test files; contributor guidance and architecture/policy specifications; Git object/hash verification; built head modules; 13 controlled execution-client probes and a real ledger deduplication probe; five focused source test files; Chromium interaction and screenshot checks. Bundle inputs used: selected PR bodies and commit records from `pr.json`, `stack.md`, and selected `diff.patch` sections. Precomputed overviews were not used.
- Tech: React 19.3.0, React Flow 12.11.6, ELK.js 0.11.1, GSAP 3.15.0 with MotionPathPlugin, esbuild 0.25.12; Python capture; Node recording/checking; Playwright 1.63.0 with system Chrome. All browser assets are bundled locally; system fonts; no generated bitmap assets.
- Built on earlier experiment(s): no reused implementation, evidence, or content. Read 04-textbook-chapter, 23-zoom-canvas, 36-be-weird-a, 37-be-weird-b, and 53-be-weird-53 in full for their evidence and interaction standard. Surveyed available 01–68 README representation/opening fields, with particular attention to 15-message-choreography-sim, 22-game-any, 25-reader-sketch, 61-pixel-causality-grid, 62-policy-stained-glass, 63-daemon-constellation, 65-decision-tetris, 66-boundary-subway and 68-semantic-zoom-microscope. No subagents were used.

## What I tried

Considered putting every routing and admission guard on one long graph. Experiment 68 already concentrates on routing precedence, and that design would obscure the acceptance boundary. The final board compresses routing into a supplied snapshot and spends its space on admission authority and the two recovery circuits.

Compared Rete's execution engine with React Flow plus ELK. The graph is read-only and the admission/retry classes can execute unchanged; a second graph execution engine was unnecessary. ELK computes all component positions, ports and orthogonal trace routes. The tiny ordered gate glyphs inside U2 are a static source-order illustration.

The first browser image exposed a black library background and undersized gate text. I replaced the background, tightened ELK spacing and enlarged the lettering. The opening now shows a completed recovery trace. Tests caught non-editable nodes swallowing pointer events and dialog removal losing focus; both were fixed. The simulation audit also corrected admission-sample counts for a reattachment: it makes another authenticated execute attempt, even though the drawn loop abbreviates repeated admission.

Early images and two failed browser-check reports are retained in [attempts](attempts). No complete representation was abandoned.

## What I would drop

The component subtitles are secondary at overview scale. The process stamps also require the legend; a conventional swimlane has a lower decoding cost. The phone overview is a locator, not a comfortable way to read every gate simultaneously.

## What I would do next

Ask a fresh reader to predict the two simultaneous-failure case and the contradictory retry-bit case, then compare with the same facts in a conventional flowchart. No human comprehension study was performed here.

## Time spent

About 35 minutes, including source inspection, library evaluation, probes, construction, browser fixes and documentation.

## Visual-variable legend

| Channel | What it encodes |
| --- | --- |
| Gate shape | Multiplexer = first route; ordered AND-like gates = admission priority; fuse = rejection consistency; OR = local retry authority; D/Q latch = retained acceptance. These are explicitly mnemonic, not literal digital logic. |
| Trace color | Amber = admission rejection vocabulary; rose = transport failures/uncertainty; violet = accepted execution failures; cyan = delivery recovery; pale green = signal/result or local permit. Wires also have directional arrowheads. |
| Component package | Single outline / C = caller-process daemon mechanism; double outline / D = daemon-process admission; H = host-supplied local execution. The green enclosure identifies final daemon package ownership, with H explicitly external. |
| LED state | Bright outcome LED = selected outcome; dark = not reached. Admission LEDs distinguish passed and failed gates. The acceptance latch remains lit after a terminal failure. |
| Hatching | `//` marks a later guard that the signal never reached. Two faults can therefore expose a visible priority decision. |
| Counter enclosure | One reattachment allowance belongs to the request; one fetch allowance belongs to each execute attempt. Counts are modeled events, not performance measurements. |
| Motion | One bright pulse follows the selected trace. Motion and geometric distance carry order, never duration or electrical behavior. Reduced motion removes the pulse while preserving stepping. |

## Libraries considered and used

| Library | Evaluation |
| --- | --- |
| [Rete.js engine](https://retejs.org/docs/concepts/engine/) | Considered its dataflow/control-flow engines. Useful for editable executable graphs, but this instrument needs fixed topology and direct source policy execution. Not used. |
| [React Flow](https://reactflow.dev/learn/layouting/layouting) | Used for custom nodes/edges, viewport navigation, zoom controls and keyboard-accessible component controls. Its layout overview helped separate rendering from layout. |
| [ELK Layered](https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html) | Used for all graph placement and orthogonal routing with constrained ports, including the backward recovery edge. A good match for circuit-style wiring. Dagre was considered through the React Flow comparison; the port and routing controls favored ELK. |
| [GSAP MotionPathPlugin](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/) | Used to animate the signal on the actual ELK path. GSAP also schedules playback; no custom animation or pan/zoom engine. |

Versions are recorded in `package-lock.json`. The generated `app.js.LEGAL.txt` retains bundled library notices.

## What the circuit form teaches

The strongest feature is the **absence of an energized local path** after acceptance. Recovery lights another circuit while the local LED remains dark. The fuse makes a wire Boolean visibly subordinate to code authority. The ordered gate chain makes a later conflicting duplicate remain unobserved when draining already failed. These are changes a reader can cause and compare, not decoration around a card summary.

A conventional flowchart would need less explanation of symbols and would show process placement more directly. This board compresses calls into traces and abbreviates reattachment; it cannot establish concurrency, latency, resource consumption, or an actual host execution count. The claimed teaching benefits are design judgments, not measured learning gains.

## Evidence and verification

- [Source manifest](evidence/source-manifest.json): 31 frozen documents. Every captured worktree source equals its pinned Git object. The UI contains 49 selected excerpts, including explicit rationale receipts.
- [Controlled probes](evidence/probes.json): 13 runs of the actual compiled head execution client with scripted sockets, fake empty-output capture and ACK stub. Includes pre-write refusal, uncertain close, normal/contradictory rejections, accepted terminal failure, both recovery paths and both exhaustion paths. The ledger probe reuses the same actual entry for a matching request. These are not live-daemon traces.
- [Focused source tests](evidence/focused-tests.log): 147 tests passed across five files: admission, client routing/fallback, protocol validation, direct execution client and socket execution delivery. This includes existing real socket and mixed-stream transfer tests. The daemon package build passed. The whole repository suite was not run.
- [Artifact checks](evidence/artifact-checks.json): the model agrees with all 13 recorded client cases on outcomes and I/O counts; 576 admission combinations preserve the acceptance/no-local-replay invariant; source hashes, all excerpt bounds and ELK component bounds pass.
- [Browser checks](evidence/browser-checks.json): preset/field interactions, all board components, all source receipts, source previous/next and Escape focus return, playback/pause/step, keyboard slider, pan/zoom/fit/follow, 1440/768/390/320 layouts, reduced motion and direct `file://` opening. No external runtime requests or browser errors in the passing run.
- [Screenshots](screenshots): final overview, precedence and corruption states, source detail, and a phone view were visually inspected.
- [Pyramid map](evidence/pyramid-map.md): authored details and visible top-layer parents. The two rationale gaps are the original priority's justification and the quantitative basis for exactly-one recovery defaults; the preservation rationale itself is stated.

Both symnav worktrees remained clean for tracked files. All source edits and generated artifacts are in this experiment; allowed build/test outputs stayed in the worktree's build/cache locations. No commits, pushes, branch changes, comment storage, verdicts or review persistence.

## Rebuild and repeat

Opening the artifact needs none of these commands. From this folder:

```sh
npm ci
python3 scripts/capture.py
npm run build
npm test
```

With the supplied head worktree pinned and built, `node scripts/probe.mjs` regenerates the controlled receipts. It does not run a daemon or mutate the source. The original focused source test command was:

```sh
cd ~/projects/rich-review-v2/worktrees/stack-head/packages/daemon
pnpm exec vitest run src/daemon-admission.test.ts src/client/daemon-client.test.ts src/transport/protocol-validator.test.ts src/transport/execution-client.test.ts src/transport/daemon-transport-execution.test.ts
```

For the browser suite, run `npm start` from the experiment (localhost:8472), then `node scripts/browser-check.mjs` in another terminal. System Chrome is required for that check script. [brief.md](brief.md) preserves the received assignment.
