# failure-domain-pinball

## Entry point

```sh
open ~/projects/rich-review-v2/experiments/79-failure-domain-pinball/index.html
```

[Open the pinball table](index.html). No installation, server, network connection or worktree is needed. Phaser and the frozen evidence are local.

Choose a failure domain and condition, then **Launch request** or **Step**. **Space** plays/pauses; **→** steps when focus is outside a form control. **Try local gate** probes the current flippers without changing the recorded route. Click a bumper or an **Inspect** link for its source. Escape closes the receipt and restores focus. Inspection leaves playback paused. On a phone, **Magnify table** enables native sideways scrolling. Reduced motion defaults to instant steps.

The seven open rules remain readable without JavaScript. A local server is optional: `npm run serve` serves this folder at `http://127.0.0.1:8479`.

## Kind

other: game — source-grounded pinball replay, without points, verdicts or review collection.

## Subjects

**stack**, main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → tip of #149 `d07002357d3e9596bfaae910a1ac63b77981620b`.

Narrow subject: the failure vocabulary and available exits of one already-selected warm request. The relevant decisions run through #133, #134, #142, #147 and the #149 package cutover; #148 supplies migration context. This is not an explanation or correctness audit of all 26 PRs.

## Declared choices

- Role framing: learner operating a request through failure domains; assigned pinball angle.
- Box lenses: static package ownership plus runtime failure/request boundaries. The package contains mechanisms in both caller and daemon processes. The worker is inside the daemon process; the injected host executor is distinguished from its package owner.
- Opening style: marked physical analogy, then the main → tip ownership strip. The first sentence names acceptance as the point that changes the exits.
- Shape: complete stopping layer = opening, machine, compact legend and seven open rules. Source dialogs and recordings deepen those same facts. The headline alone is not the complete layer.
- Navigation: 18 replay conditions grouped by domain; sequential stops and previous/next replay controls; direct bumper and rule jumps; related source receipts; direct replay fragments; source close/return controls. Nothing must be won or unlocked.
- Trust posture: actual-method observations and exact source receipts, with explicit projection limits. Reasons are stated only where supplied; the historical guard/terminal precedence selections and choice of exactly one recovery attempt retain bounded rationale gaps. Policy records do state the purposes of both budgets.
- Persona: teammate familiar with Symnav’s purpose, unfamiliar with its daemon failure handling.
- Representations used: numbered guard bumpers, one request-identity ball, local flippers controlled by retry permission, separate recovery loops, package/process enclosures, an inner worker diamond, an outer terminal classifier, neutral state lamps, a capture readout and frozen source/observation drawers.
- Importance rule: acceptance and duplicate-execution consequences first; distinct vocabularies, recovery ownership and classification precedence next. Evidence and rationale limits remain in the open layer.
- Inputs used (beyond bundle): read-only main/tip production code and tests; Git objects for the original #133/#134/#142 authority suites; contributor guides; daemon policy, architecture and relevant functional-spec clauses; a fresh daemon package build; actual compiled-method recordings; four focused existing test suites; source hashes and final worktree status. Bundle used: `pr.json` and relevant `repo-rules.md` material. Precomputed overviews and the full net patch were not used to establish claims.
- Tech: **Phaser 3.90.0**, HTML/CSS/classic JavaScript, Python evidence capture and integrity checks, Node actual-method recorder, **Playwright 1.61.1** with system Google Chrome. System fonts; no generated bitmap assets or audio. Codex harness; no delegated agents.
- Built on earlier experiment(s): no implementation, layout, recording or evidence bank reused. Read the required **04-textbook-chapter**, **23-zoom-canvas**, **36-be-weird-a**, **37-be-weird-b** and **53-be-weird-53** READMEs. Surveyed declared representations/attempts from **22-game-any**, **63-daemon-constellation**, **64-lifecycle-music-box**, **65-decision-tetris**, **66-boundary-subway**, **67-blast-radius-terrain**, **72-admission-circuit-board**, **73-daemon-weather-map** and **75-message-particle-chamber**. Borrowed standards of bounded evidence, complete stopping layers, explicit analogy limits and focus-return checks. In particular, 72 already represents admission as a circuit and 75 represents byte/record transfers as particles; this experiment centers the spatial consequences of one identity entering different failure domains, including outer terminal precedence.

## What I tried

Evaluated physics, a rendering stack and a game engine before implementation. Free collisions would allow chance to select a code branch or imply that a stronger launch defeats an admission guard. I chose Phaser’s curves, tween manager and hit areas for controlled replay. Bounce is illustrative; source observations choose the route.

Recorded 18 client cases using real compiled methods with scripted peers, including refusal before submission, each admission refusal, contradictory retry safety, two recovery scopes and their exhaustion, and competing terminal failure facts. The server duplicate bypass and local executor lane remain visibly marked source projections.

The first layout placed controls below a tall board. Browser use led to moving them above it, fitting the board to the viewport and adding native phone magnification. I fixed pending replay timers so changing a case or inspecting a source cannot advance an old run. State now commits when the ball reaches a stop. Initial screenshots remain in [evidence/attempts](evidence/attempts/). No implemented representation was abandoned.

A source audit corrected several initially guessed excerpt ranges, and the policy record refined the rationale wording: budget purposes are stated, while selecting exactly one rather than another bound is not explained. The three direct authority test bodies proved byte-identical from their introductions through tip.

## What I would drop

The chassis screws and serial ornament add little. The miniature phone fit is a locator; reading the board’s labels requires magnification. The seven-rule register is necessary for a complete stopping layer but carries precision that the pinball alone cannot express.

## What I would do next

Give a fresh reader this table and a conventional state diagram. Ask them to explain why a lost socket can recover while a lost worker returns a terminal code, and why result-fetch keeps a capture while reattachment replaces it. No human comprehension trial was run here.

## Time spent

Approximately 45–50 minutes of active work, including source reading, implementation, recordings, browser checks and documentation.

## Visual-variable legend

| Channel | Meaning |
| --- | --- |
| Amber | Admission vocabulary and the local retry gate. |
| Blue | Transport failures and recovery exchanges. |
| Rose | Outer accepted-execution terminal vocabulary. |
| Lavender | Distinct inner worker-failure domain. |
| Pale cream | Request/result identity; not a “good” verdict. |
| Numbered circular bumper | One admission guard; physical order depicts first-failure order. |
| Package envelope / shaded process regions / dashed seam | Static ownership, runtime containment, and socket crossing respectively. The CLI host shares the caller process but remains outside daemon mechanism ownership. |
| Worker diamond inside worker outline | Injected execution inside a worker thread; its inner vocabulary is not a one-to-one translation to the outer classifier. |
| Brass flippers | Current permission to execute locally, derived from delivery state and authenticated rejection meaning. |
| Return-loop geometry | Reattachment returns to admission and bypasses a new worker execution; result-fetch returns to delivery with the existing capture. |
| Lamps and numeric readouts | Acceptance, manifest receipt, used recovery allowances and capture identity. State only; no score or judgment. |
| Motion | Authored ordering of selected source steps. Speed, distance, force and bounce are invented and have no measured units. |

## Libraries considered and used

| Library | Evaluation |
| --- | --- |
| **Phaser 3.90.0 — used** | Its scene, graphics, input hit areas, curves and tween manager fit one interactive cabinet. Phaser owns interpolation and animation scheduling. The local bundle opens directly without a build. See [Phaser paths](https://docs.phaser.io/api-documentation/class/curves-path) and [tweens](https://docs.phaser.io/phaser/concepts/tweens). |
| **Matter.js — considered** | Suitable for body collisions and physical constraints, but free physics would make guard ordering and recovery branch selection look contingent on momentum. No physics engine determines semantic outcomes here. See [Matter.Engine](https://brm.io/matter-js/docs/classes/Engine.html). |
| **PixiJS — considered** | A capable renderer with interaction and a ticker. This cabinet would still need additional orchestration for its replay. Phaser supplied the required game facilities in one dependency. See [PixiJS interaction](https://pixijs.com/8.x/guides/components/events) and [ticker](https://pixijs.com/8.x/guides/components/ticker). |
| **Playwright 1.61.1 — used for checks** | Exercises real browser input, source navigation, replay state, responsive layouts and direct file opening. It is not needed by the reader. |

The game board’s geometry is authored, as a pinball playfield. This is not a hand-written graph-layout or routing engine. Curves and tween timing come from Phaser. The vendored [Phaser license](vendor/PHASER-LICENSE.md) and lockfile preserve the dependency choice.

## What the form teaches better or worse

The strongest physical fact is the closed local exit after acceptance. A reader can push the flippers, see the state remain closed, and follow a recovery loop that retains the identity. The two loops make “new attempt/fresh capture” versus “same attempt/same capture” spatially memorable. Color keeps the same word from being casually treated as the same failure domain.

A conventional diagram is faster for reading the exact classification precedence, the five outer literals, and rationale gaps. Pinball cannot faithfully depict async concurrency, socket timing, full daemon resource recovery or all message exchanges. One ball groups a request and its return/recovery messages. The open rules and source drawers carry the precision that the analogy loses. These are design observations, not measured claims about reader learning.

## Evidence and verification

- [Decision/depth map and evidence limits](evidence/decision-coverage.md): seven-rule coverage, reason-search boundary, actual versus projected execution, and workspace incident disclosure.
- [Recorded observations](evidence/observations.json): 18 real execution-client cases, five admission contexts and six terminal-classifier contexts. Peers, output and failure facts are injected. No daemon process or worker is launched by the recorder.
- [Frozen sources](evidence/sources.json) and [24 receipts](evidence/receipts.json): full captured files with hashes, exact line ranges and revisions. Pinned GitHub links are optional; offline evidence is complete for the authored claims.
- [Focused test output](evidence/focused-tests.txt): **95 tests passed** in admission, failure vocabulary, execution-client and transport-execution suites. This is not a full-stack verification result.
- [Historical test inventory](evidence/test-inventory.json): three direct authority suites retain byte-identical bodies from first `describe` through EOF; imports and relocation are outside that comparison. Other stack tests were not audited for removals.
- [Browser checks](evidence/browser-checks.json): all 18 paths, all 24 reachable receipts, actual Phaser hit areas, gate probing, keyboard controls, pause/resume, inspector interruption, stale-timer cancellation, natural animated completion, five viewport widths, reduced motion and JavaScript-disabled reading. No page errors or runtime network requests in the local-file checks.
- [Static integrity checks](evidence/static-checks.json): source hashes/excerpts, assets, root/source links, expected observation inventory and clean main/tip worktrees.
- [Screenshots](screenshots/): opening, reattachment, fetch, terminal failure, source receipt and phone view. Screenshots were visually inspected.

No Symnav tracked source, branch or commit was changed. A temporary untracked stylesheet was accidentally created in the daemon worktree during a misdirected UI edit, checked to contain only the newly written CSS, and removed immediately; the [incident record](evidence/decision-coverage.md#workspace-incident) describes it. Both worktrees are clean at completion. Index, queue and commit handling are left to the campaign orchestrator.

## Reproduce the evidence

With the supplied worktrees pinned and the daemon package built, run from this folder:

```sh
python3 scripts/capture.py
node scripts/record.mjs
python3 scripts/inventory.py
python3 scripts/verify.py
```

To repeat browser checks, install this folder’s locked dependencies with `npm ci --ignore-scripts`, then run `npm run check`. It uses system Google Chrome by default; `PINBALL_BROWSER_CHANNEL` can select another installed Playwright browser channel.

The focused Symnav test command, run from `worktrees/stack-head/packages/daemon`, was:

```sh
pnpm exec vitest run src/daemon-admission.test.ts src/daemon-execution-failure.test.ts src/transport/execution-client.test.ts src/transport/daemon-transport-execution.test.ts
```

The received [brief](brief.md) and campaign harness log are preserved in this folder.
