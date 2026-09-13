# pair-one-variable

## Entry point

Open [index.html](index.html) for the **metaphor** and [failure.html](failure.html) for the **motivating failure**. One command opens both on this Mac:

```sh
open ~/projects/rich-review-v2/experiments/33-pair-one-variable/index.html ~/projects/rich-review-v2/experiments/33-pair-one-variable/failure.html
```

No server, installation, network, or build is needed. Both pages contain the complete explanation. Their navigation calls the versions “Opening A” and “Opening B.” JavaScript adds the optional release trace; the rest also works without it.

## Kind

pair

## Subjects

pr-127 only: “Scope semantic caches to one turn,” comparing base `a1e325a5ff979bdfa25babc5554621c8c0f20497` with head `64919bcbcf7fcc8202779b78c5f069b24662bb18`.

## Declared choices

- Role framing: Learner, with a complete decision map before the mechanism detail.
- Box lenses: Static package structure and lifecycle; runtime instance ownership is explicit within those views. Core supplies the implementation, while each service constructs its own scope.
- Opening style: A uses a six-tray workbench metaphor. B starts with an illustrative release that finishes before delayed cleanup. Both openings contain 129 whitespace-delimited words of visible text, counting the common “One way in” label.
- Shape: The same pyramid in both pages: opening → complete ownership/lifetime map and ten decisions → mechanisms → numbered source excerpts. Important exceptions and evidence limits appear in the decision map before descent.
- Navigation: Continuous reading, high-level links into each mechanism, return links to decisions, native source disclosures, and stable source-line anchors.
- Trust posture: Source-checked explanation. Reasons are marked stated or unexplained. Describing a public API change is distinguished from giving a reason for it. Test additions and preserved assertions have their own decision. No correctness verdict or response collection.
- Persona: A teammate who knows the repository but not the TypeScript semantic-cache corner.
- Representations used: Three-box openings; before/after package diagram; instance ownership chain; six-store table; refresh sequence; illustrative release trace with both versions on the same events; lookup branches; API and test-boundary tables; captured source excerpts.
- Importance rule: Establish ownership and cache contracts, then expose the timing/error boundary and API choices whose separate rationale is missing. Keep test changes and limitations visible at the top.
- Inputs used (beyond bundle): Both worktrees’ changed files; unchanged core project-graph release and concrete TypeScript project cleanup; the architecture spec; touched-file git history; and a focused run of the two relevant head test suites. Sources are copied into `evidence/` with hashes and exact revision labels. From the bundle I used `pr.json`, `diff.patch`, `files.txt`, `stack.md`, and relevant portions of `repo-rules.md`. `overview-after.txt` contained file headings without symbol output, so it supplied no evidence.
- Tech: Static HTML, shared CSS and vanilla JavaScript; Python standard library for generation and integrity checks; Playwright for browser verification. No external assets or fonts.
- Built on earlier experiment(s): none. Earlier experiments’ content, code, and assets were neither read nor reused.
- Assigned angle: Two complete pages identical except their opening style. The body, source excerpts, layout, and interactions come from one shared template.
- Harness: Codex. No additional agents were spawned.

## What I tried

I first read the PR’s source delta and rationale, then built one common explanation. The decision map separates the ownership move, preserved cache behavior, and expanded release boundary. Three choices have no separate rationale in the inspected material: the caller-visible release contract change under the unchanged-behavior spec, the exact public API/narrower file-list input, and reusable handles without a closed or disposed state.

I ruled out a stale-cache motivating story during source reading: the base already clears caches synchronously before starting project cleanup. The failure opening instead uses the pending/rejecting graph from the new test. Both the opening and the shared top state its limits; the concrete TypeScript project cleanup is synchronous. The trace is explicitly illustrative, including its successful-delay branch, which is not a new PR test.

I generated both pages from `common.html` and one `opening_markup` function fed by `openings.json`. I matched word counts and reserved the same layout space, then fixed narrow-screen text overflow in both conditions together. The browser harness could not dynamically import the local check module; I executed its check function as an injected script and saved the results. No explanation approach was abandoned after implementation.

The result is a controlled pair, not evidence that either opening teaches better. [pair-contract.md](pair-contract.md) records the control and its limits.

## What I would drop

The common release table and the interactive trace explain much of the same boundary. If readers can explain it from one, I would remove the other from both conditions. The complete ten-decision map also occupies several screens; its completeness is useful here, but its reading cost deserves a human check.

## What I would do next

Give each opening to a different unfamiliar reader and ask them to explain who owns the caches and when backend release finishes. Reverse the opening order with another pair of readers; do not treat one person reading both as an independent comparison.

## Time spent

About 30 minutes of active work, including source reading, implementation, browser checks, and documentation.

## Verification

- `python3 verify.py` checks byte equality outside the marked opening, matching opening element structure and word counts, local links and unique anchors, all 20 captured source hashes, and preservation of the five existing service-test bodies. The record is [pair-verification.json](pair-verification.json).
- Browser checks covered both variants at 12 widths from 320 to 1280 pixels. The opening heights and the common body’s starting position match at every width; no opening text clips and no page overflows horizontally. The rendered common DOM also matches. All 20 variant/outcome/frame combinations, previous/next controls, keyboard scrubbing, decision returns, source-line disclosure, and opening links worked. No browser errors were recorded. Both variants were checked with JavaScript disabled. See [browser-verification.json](browser-verification.json) and [browser-check.mjs](browser-check.mjs).
- The existing head suites were run with `pnpm exec vitest run packages/core/src/backend/turn-scoped-cache-scope.test.ts packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts --maxWorkers=2 --minWorkers=1`: **15 tests passed in 2 suites**. [test-run.txt](test-run.txt) contains the output. This was a focused run, not full CI.
- Both symnav worktrees remained clean. No branch, source file, queue, shared index, or other experiment was modified by this work.

## Files

`index.html` and `failure.html` are the deliverables. `common.html`, `openings.json`, `decisions.json`, `style.css`, and `review.js` are their sources. `build.py` rebuilds from the included source snapshots; `verify.py` checks the pair. `evidence/` contains the PR inputs and base/head source snapshots; `evidence-manifest.json` records their provenance. `screenshots/` contains both desktop openings, both mobile openings, the shared decision map, and the shared release trace. The supplied `brief.md` and harness log are retained.

To rebuild and verify, from this folder:

```sh
python3 build.py
python3 verify.py
```
