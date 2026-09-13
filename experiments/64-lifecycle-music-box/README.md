# lifecycle-music-box

## Entry point

Open [index.html](index.html) directly. No server, installation, network connection or live worktree is needed.

```sh
open ~/projects/rich-review-v2/experiments/64-lifecycle-music-box/index.html
```

**Cleared isn’t finished** is a paired step sequencer. Start with **Jump to the split**, enable **Sound**, and change **Listen to** between base and head. Use **Release completion** to solo that boundary. Choose one of six recordings, play/pause, step, scrub, or click a note to inspect its source. Sound starts off.

The complete score notes and frozen [source book](sources.html) remain readable without JavaScript. Desktop is the intended instrument surface; small screens scroll the rolls horizontally and retain the controls and text equivalent.

## Kind

other: interactive instrument

## Subjects

pr-127 only — Scope semantic caches to one turn. Comparison is the supplied #126 base `a1e325a5ff979bdfa25babc5554621c8c0f20497` against #127 head `64919bcbcf7fcc8202779b78c5f069b24662bb18`.

## Declared choices

- Role framing: learner operating a comparative instrument; assigned cache-turn/release ordering angle.
- Box lenses: lifecycle ownership and static package/module ownership. Rows are owners; package colors reveal the six Maps’ lifetime moving from the TypeScript service to core handles. The service still owns its scope instance. The release completion chain is a separate boundary.
- Opening style: a marked musical analogy and the visible before/after score, under the sentence “Cleared isn’t finished.”
- Shape: complete stopping layer = opening, selectable instrument and six open score notes. Note/source dialogs and a frozen source book deepen those same facts. The heading alone is not the complete layer.
- Navigation: linear scroll or nonlinear score selection, boundary solo, note inspection and per-decision source jumps. Closing the inspector restores focus. Arrow/Home/End keys move between notes; Space controls playback when a form or note does not own that key.
- Trust posture: source-grounded explanation. Stated reasons and specific rationale gaps are named separately; the PR’s preservation claim is shown alongside the changed await/failure boundary. “Aligned” can mean both promises rejected; it is a relation, not a correctness verdict.
- Persona: teammate familiar with TypeScript but unfamiliar with these semantic-cache owners. Musical notation knowledge is unnecessary.
- Representations used: paired piano rolls, unfinished-call tails, six-note clearing chords, owner pitch, completion intervals, stereo build comparison, boundary solo, step-specific state readouts, textual scores and exact source receipts. No verdict, input collection or persistence.
- Importance rule: distinguish cache invalidation from caller-visible completion first; then preserve successful-turn gating, refill/late-settlement behavior, value contracts, API and test choices in the complete notes.
- Inputs used (beyond bundle): pinned base/head source, compiled modules after successful builds, core ProjectGraph and concrete TypeScript project release, twelve fresh instrumented fixture recordings, the two changed test suites, Git revision/cleanliness metadata, source hashes and old-test suffix comparison. Bundle: PR body and six commit records, complete patch, changed-file inventory and relevant repo/spec material. No overview output was used as execution evidence.
- Tech: local HTML/CSS/JavaScript, SVG with D3 7.9.0, Tone.js 15.1.22, Node recording/build/check scripts, headless system Chrome through Playwright. System fonts; no generated bitmap assets. Codex harness; no delegated agents.
- Built on earlier experiment(s): read 04-textbook-chapter, 23-zoom-canvas, 36-be-weird-a, 37-be-weird-b and 53-be-weird-53. Borrowed the standard of bounded execution evidence, source receipts, focus-return navigation and explicit analogy limits. A README representation/technology survey across the earlier experiments checked novelty, including 61 and 63. No earlier experiment’s implementation was copied. This run resumed the unfinished scaffold already in **this** folder; the existing recorder, raw recording format and vendored libraries were retained and audited.

## What I tried

The inherited draft attempted a broad nine-score setlist, including worker-thread recordings and comparisons to main. It had no application, stylesheet, audio implementation or README. I retained that attempt in [attempts/initial-index.html](attempts/initial-index.html) and the original recorder/generated files, then narrowed the working instrument to the two supplied revisions and six lifecycle cases. Main/worker recordings are not loaded or presented by the finished instrument.

I kept exact event order but removed wrapper calls, routine returns of promise objects, and unrelated query traffic. Six consecutive synchronous clears become one chord. This produces 9–22 selected events per roll instead of an unreadable full trace. Every note retains its raw sequence number(s).

Browser checks caught an overbroad method filter matching a probe label containing “refresh.” The filter now excludes caller wrappers. A source check caught a guessed line range for head release; receipt boundaries now find that method by name. I also separated the state “graph settled, backend still pending” from “both pending.” The first audio check sampled before Tone’s scheduled attack; it now waits for the actual waveform instead of assuming a 140 ms startup delay.

## What I would drop

The stereo “both” mode is denser than listening to one build at a time. The six small pitch notes communicate grouped clearing, but they do not teach the individual key formats; the source layer does that better. The large historical worker evidence package is retained only to preserve the unfinished attempt.

## What I would do next

Give a fresh reader the silent and audible instruments. Ask them to predict a query during held release and the caller-visible outcome of rejecting that release. Compare the explanations with a conventional sequence diagram; no human comprehension trial was run here.

## Time spent

Approximately 30 minutes for this completion pass, including guidance/source reading, reconstruction, recording, implementation, browser/audio checks and documentation. Earlier interrupted attempts are separately recorded in `harness.txt` and the worker logs; their elapsed time is not included.

## Visual-variable and sound legend

| Channel | Fact carried | Sound / visual equivalent |
| --- | --- | --- |
| Row position and owner label | Which object executes an event | A stable owner pitch; explicit class/module receipt |
| Mint vs brass, plus package label | Core vs backend-typescript ownership | The lifetime row changes package between builds; pitch stays stable because the clearing operation is preserved |
| Horizontal position | Selected observed event order | One selected event per musical step; **not duration**, and columns in different builds are not simultaneous timestamps |
| Round onset / square endpoint | Call begins / call finishes | Owner’s note / short chime |
| Hatched tail | Call has not completed between its endpoints | Held owner tone; audio can stretch a synchronous interval because this is an arranged score |
| Six-dot cluster | All six cache clears, grouped | Six-note chord; the actual loop is sequential and synchronous |
| Hollow / ring / filled small glyph and label | Definition-cache miss / hit / store | Owner pitch; the explicit lookup label remains authoritative |
| Cross and rejection label | Rejection or the observed unhandled rejection | Low dissonant buzz |
| Open diamond, probe row and injection caption | Probe resolves/rejects the held operation | Probe pitch; this is controlled input, not an automatic production event |
| ≋ both pending / ↟ awaiting backend | Shared pending interval / completion travelling back | Open fifth |
| ⋈ completion split | Backend fulfilled while graph remains pending | Repeated C–D♭ semitone clash |
| = aligned completion | Matching backend/graph outcomes, including rejection | Resolved C-major chord; a rejection still has its separate buzz |
| ≠ outcomes differ | Base backend fulfilled, graph rejected | Low dissonant chord and both outcomes written out |
| Solo/dimming | Selected ownership boundary | Other tracks and unrelated relation chords fall silent; their geometry stays visible |

The condensed legend appears beside the instrument. All audio has a visible equivalent. Animation uses discrete musical steps, not simulated wall time. Reduced motion disables smooth navigation; manual steps and the full static score remain available.

## Libraries considered and used

- **Used: [Tone.js](https://tonejs.github.io/), 15.1.22.** Its transport schedules audio and its Draw scheduler synchronizes the playhead. PolySynth handles envelopes and voice allocation; Panner separates revisions; Analyser verifies real audio output. This avoids writing a custom audio clock or synthesizer. Vendored under its MIT license.
- **Used: [D3](https://d3js.org/d3-scale/band), 7.9.0.** Band scales, SVG joins and symbol generators arrange the categorical owner/step grid. D3’s timer supplies silent playback if audio initialization is unavailable. Vendored with its ISC license. There is no graph layout, semantic zoom or routed diagram to hand-build.
- **Considered: [native Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).** Capable of this result, but it would require more custom scheduling/envelope management. Tone provides those parts directly.
- **Considered then unused: jsdiff**, inherited with the draft. Exact, selected source receipts better serve individual notes than a second full diff viewer. Its vendor files remain with the attempt; the entry point does not load it.

No runtime CDN, font service, analytics or API call is needed.

## What the weird form teaches better or worse

The unfinished tails make the difference between “entries cleared” and “release completed” visible before reading code. The base backend’s short tail ending over a long project tail is the explanation. Soloing lets the reader hear just that dependency relationship; switching builds changes a clash into a shared held interval and an aligned ending. The preserved clearing chord keeps the ownership extraction separate from the changed completion chain.

The form is worse at query-key syntax, exact public wrapper identities and API design rationale. Those stay in the six compact score notes and receipts. Musical dissonance can feel like a verdict even though the page defines it only as a completion relationship. Equal-step arrangement distorts duration, especially synchronous work; this is labeled at the roll and opening. A conventional sequence diagram needs less training and prints more compactly.

## Evidence, regeneration and checks

The browser replays a selected recording; it does not execute symnav. [scripts/record.mjs](scripts/record.mjs) checks the two worktree pins and clean tracked status, then runs the retained real-method recorder in isolated child processes. Fixture files live in temporary directories. Instrumentation wraps real functions and Map methods, uses Node promise hooks, and preserves the returned promise identities. It can affect observation overhead; this is not a performance measurement.

For held-release cases, the real concrete cleanup runs synchronously **before** an injected returned promise is held. The late-answer and failed-refresh cases also declare their injections. The ordinary release and successful-refresh cases inject no delay or failure. The probe observes base’s unhandled rejection so the capture can finish; no production daemon behavior is inferred from that process.

From this folder, with the supplied dependencies/builds present:

```sh
node scripts/record.mjs
node scripts/build.mjs
node scripts/verify.mjs
node scripts/browser-check.cjs
```

Browser checks use the existing `/tmp/rich-review-05-browser/node_modules/playwright` installation and system Chrome. Set `MUSIC_BOX_PLAYWRIGHT` to another installed Playwright module path if needed. Rebuilding symnav, if needed, is `pnpm --dir ../../worktrees/pr-127-head build` and the equivalent base command; only build outputs are written there.

- [Instrument manifest](evidence/instrument-manifest.json): twelve recording hashes, revision pins, source hashes and test inventory.
- [Static checks](evidence/static-checks.json): source-to-Git reconciliation, event-to-recording mapping, ordering assertions, unchanged original tests, local dependency links and no persistence/fetching.
- [Browser checks](evidence/browser-checks.json): every selected note and source return, recording selection, keyboard controls, solo, transport interruption, real audio signal and interval selection, mute, four widths, reduced motion and no-JavaScript reading.
- [Focused tests](evidence/focused-tests.txt): 15 tests passed across the two changed suites. Five original service cases and helpers remain byte-identical; six service and four core cases were added. The test runner prints a Vite CJS deprecation warning.
- [Build logs](evidence/build-head.txt), [base build](evidence/build-base.txt) and [recording run](evidence/recording-run.txt): fresh execution evidence.
- [Screenshots](screenshots/): opening, completion split, phone layout and source inspector, visually inspected during the run.

Checks establish the artifact’s behavior and bounded observations, not PR correctness, production timing, perceptual sound quality or teaching effectiveness. Symnav source, branches and tracked files were not modified. Index and queue handling are left to the campaign orchestrator.
