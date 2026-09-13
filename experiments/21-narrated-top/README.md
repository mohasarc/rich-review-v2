# narrated-top

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/21-narrated-top/index.html
```

Everything needed to view the page is local. Press **Play 90 seconds**. The standalone [video player](video.html), [MP4](assets/narrated-top.mp4), [audio](assets/narration.mp3), and [transcript](narration.txt) are also included.

Optional local preview with media seeking:

```sh
python3 ~/projects/rich-review-v2/experiments/21-narrated-top/serve.py
```

Open `http://127.0.0.1:8721/`. Ctrl-C stops it. Development preview servers were stopped at handoff.

## Kind

other: video/audio + page

## Subjects

`stack`: all 26 daemon architecture PRs, main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → #149 tip `d07002357d3e9596bfaae910a1ac63b77981620b`.

## Declared choices

- Role framing: a teammate explaining a change before the human examines its decisions.
- Box lenses: package ownership, runtime host injection, and state lifetime. Package dependencies and runtime loading are drawn separately.
- Opening style: an explicitly approximate workshop metaphor, immediately followed by the actual before/after ownership boxes.
- Shape: six narrated 15-second chapters, then a visible decision map, then mechanisms and source evidence. Assigned angle: 90-second spoken/animated top layer, page below.
- Navigation: play, pause, scrub, chapter jump; diagram-to-mechanism links; choice-to-reason dialogs; source excerpts; return links to the relevant film chapter.
- Trust posture: preserve author-stated reasons, identify unexplained choices, distinguish staged ownership from active ownership, and give test/scope changes the same visibility as architecture. No correctness verdicts or response collection.
- Persona: a developer familiar with TypeScript who does not know this daemon implementation.
- Representations used: synthesized speech, synchronized captions, animated SVG schematics, before/after boxes, choice chips, admission controls, illustrative cache/recovery models, comparison tables, and exact source excerpts.
- Importance rule: ownership, acceptance/replay, publication and release boundaries, policy and lifetime first; test-boundary changes and deferred behavior remain visible in the stopping layer.
- Inputs used (beyond bundle): read-only final implementations and tests in both worktrees; git history and selected exact commit patches; final architecture, policy and follow-up contracts; literal test-title comparison. Bundle PR bodies, commit subjects, diff, changed-file inventory and selected repository rules were used. The empty precomputed overview bodies were not used as semantic evidence.
- Tech: dependency-free HTML/CSS/JavaScript; deterministic SVG; macOS Samantha speech; ffmpeg; Python; Chromium/Playwright for rendering and verification. Runtime needs no installed library or external service. Harness: Codex.
- Built on earlier experiment(s): none. Earlier experiments were ignored. The abandoned v1 repository was not accessed.

## What I tried

I began with a longer spoken script and cut it to 246 words. The narration takes exactly 90 seconds. Each scene has two caption cues, timed from the generated speech, and the same drawing code drives the page and exported film.

Speech alone could not carry 117 individual PR decisions at a useful pace. I made the film a marked compressed orientation and put the complete extracted decision inventory immediately below it, before the mechanism layer. All 117 stated PR choices, 11 additional source choices, ten removed CLI scenarios and eight deferred behaviors are visible there. The detailed layer expands those choices rather than concealing them in default-closed cards.

Reading the code changed two parts of the story: transactional backend publication is narrower than the whole workspace refresh, and the CLI executor constructs a separate default policy. Both qualifications are visible before descent. The source audit also exposed relaxed test budgets, removed built-CLI scenarios, a completion-wait removal and the PR-template rewrite.

The first film layout overflowed some small boxes; measured text wrapping fixed it. The basic Python preview server played media but failed reliable seeking. I replaced it with a small byte-range server and added an explicit standalone video page. Direct file opening also works.

## What I would drop

The repeated PR-card scaffolding makes the full map long. I would replace it with a boundary-oriented choice layout once that layout can preserve all the source connections. The synthetic voice is serviceable but has less useful emphasis than a human explanation.

## What I would do next

Have an unfamiliar reader watch once, then explain accepted-request recovery and the package/runtime boundary. Compare what they can explain after the film with what the visible decision map adds.

## Time spent

About 40 minutes on 2026-09-13.

## The stopping layer

The full stopping layer is the film **plus the visible decision map**. The film supplies orientation; it is not presented as an exhaustive spoken inventory. The page explicitly marks where the reader can stop. Lower models, recorded reasons and code add fidelity to the same choices.

The eight future behaviors are labeled as deferred throughout. #148's temporary compatibility graph and earlier public policy/testing surfaces are distinguished from the final #149 state. Synthetic motion and A/B/R7 examples are labeled as illustrations, not captured runtime traces.

## What is included

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Narrated review and complete extracted choice map |
| [video.html](video.html) | Standalone native video player |
| [assets/narrated-top.mp4](assets/narrated-top.mp4) | 90-second 1280×720 H.264/AAC film, burned captions, subtitle track and six chapters; 3.2 MB |
| [assets/narration.mp3](assets/narration.mp3) | Portable 90-second soundtrack |
| [assets/narration.wav](assets/narration.wav) | Uncompressed soundtrack for rebuilding |
| [assets/captions.vtt](assets/captions.vtt) | Timed English captions |
| [narration.txt](narration.txt) | Readable script |
| [content.json](content.json) | 26 PRs, 117 stated decisions, 11 additional choices, policy record and source excerpts |
| [audit-notes.md](audit-notes.md) | Source coverage, distinctions and limits |
| [evidence/validation.json](evidence/validation.json) | Verification record |
| [evidence/media-probe.json](evidence/media-probe.json) | Actual video/audio/subtitle/chapter metadata |
| [evidence/test-title-scan.json](evidence/test-title-scan.json) | Literal-title search aid, with its limits |
| `evidence/pr-*.md` | Local copies of all PR bodies and commit subjects |
| `evidence/commit-*.patch` | Exact patches supporting additional choices |
| `screenshots/` | Desktop, mobile, mechanism and film previews |

## Validation

36 browser assertions passed: native audio, all six chapter jumps, pause, rationale dialogs and keyboard focus, source navigation, cache/admission/recovery models, in-page anchors, direct file opening and a 390-pixel mobile layout. No JavaScript exceptions or horizontal page overflow were observed. Mobile has readable captions outside the scaled diagram; reduced-motion users get static cue states.

The MP4 has 90-second video, audio and subtitle streams, six 15-second chapters, and 2,160 encoded frames. Motion was captured at 12 distinct frames per second and encoded at 24. Full ffmpeg decoding produced no errors. Video playback and seeking to 84 seconds passed through the range server and from `file://`; audio resumed after seeking to 45 seconds. Prefix, suffix and invalid byte ranges returned the expected responses. The 34 checked local content links resolved.

These checks validate the artifact. The symnav suite was not rerun; PR test-pass claims remain author-reported. Related package tests are identified without claiming that they replace every removed built-CLI assertion. Both symnav worktrees remained clean at their supplied SHAs. No symnav code, branch, commit or build output was changed.

## Rebuilding

The delivered artifact needs no build. To regenerate its content and voice from this workspace:

```sh
cd ~/projects/rich-review-v2/experiments/21-narrated-top
python3 scripts/build_data.py
python3 scripts/make_audio.py
python3 serve.py
```

Run [scripts/capture-video.js](scripts/capture-video.js) using Playwright MCP's `browser_run_code_unsafe` filename parameter, then run `python3 scripts/encode-video.py`. The capture script uses an isolated browser context and writes only this experiment's temporary frames. [scripts/check-browser.js](scripts/check-browser.js) contains the interaction checks. Temporary frames were removed from the delivered folder.
