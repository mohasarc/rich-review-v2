# test-honesty

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/27-test-honesty/index.html
```

The page works offline with no server or install. Keep the folder together: its source evidence and exact diffs are local snapshots. The temporary browser-verification server has been stopped.

## Kind

page

## Subjects

pr-131 and pr-148 only.

## Declared choices

- Role framing: auditor who explains the reach of an assertion, without issuing correctness verdicts.
- Box lenses: static package ownership plus the path actually traversed by a test, including process, worker, mock and host boundaries.
- Opening style: a deliberately lossy window analogy, followed by a concrete before/after recovery observation and two ownership diagrams.
- Shape: two PR pyramids. The 21 visible decision summaries are the complete top layer; the hero supplies intuition. Expanded rows add apparatus, mechanism, assertions and evidence limits on the same decisions. Exact source and diff snapshots form the bottom layer.
- Navigation: linear reading through decision summaries; nonlinear jumps from boundary diagrams to readings, then exact source lines and a return link. The complete changed-test inventory can be filtered by PR and file change.
- Trust posture: test honesty. Trace every promoted claim through setup, exercised implementation and assertion. Track moved tests before interpreting deletions, and show replacement witnesses at their actual boundaries.
- Persona: a teammate who knows the repository but not this corner of its daemon implementation.
- Representations used: boundary diagrams, stimulus/assertion tables, before/after fixture and assertion comparisons, a fake-clock timeline, a directory-scope diagram, and four-step playback of a recorded real socket scenario. Playback does not execute symnav in the browser.
- Importance rule: promote the places where a claim extends beyond its witness, where ownership moves, or where a changed fixture/assertion changes what can be observed. Unexplained choices receive the same visible treatment as architectural choices. No scores, verdicts or review storage.
- Inputs used (beyond bundle): all four supplied read-only base/head worktrees; selected test and implementation sources; architecture, policy and follow-up specs and relevant daemon-functional-spec clauses; supplied prebuilt transports/process/worker entries; local selected test results; one new isolated socket reproduction. From the bundles, used PR metadata and commits, full diffs, file stats and repository rules. Did not use the precomputed overview outputs, external research or implementing-agent transcripts.
- Tech: plain HTML/CSS/JavaScript generated with Python. Node for the isolated probe; existing pnpm/Vitest/TypeScript tooling for selected source checks. Browser inspection used Playwright tools. Viewing requires none of those development tools.
- Built on earlier experiment(s): none. Earlier experiment contents were ignored. Built by one Codex worker without sub-agents.

## What I tried

I walked from PR claims to tests, then inspected helpers and base versions before deciding what a deletion meant. A changed-test tally was useful only as an appendix: it cannot distinguish a moved witness, a retired duplicate, or a changed assertion. The final page has 21 expandable readings, an inventory of all 86 changed test files, 180 source snapshots and 213 exact file diffs.

The strongest concrete result is the default recovery comparison. I reproduced #131’s new empty-result socket scenario against the supplied base and head transports. Both completed with two execute requests, one fetch and exit 0. That observation characterizes an existing default path; it does not establish the new interface’s non-default delivery-budget behavior. The page preserves this distinction, alongside the separate startup tests that vary retries through 0 and 2.

For #148, the page makes the active CLI graph and staged package graph visible together. It follows the 37 relocated test files, the 38-file compatibility digest, generic executor substitution, removed timing expectations, the separately restored CLI version check, deleted entry assertions, public façade smoke scope, directory-limited clock scan and platform-specific cleanup expectations. Reasons are marked stated or unexplained; a rationale for package independence is not silently reused as a rationale for every assertion removal.

Validation completed:

- #131: 208 existing tests passed in 10 selected files.
- #148: 169 existing tests passed in 17 selected files; the daemon package test typecheck also passed.
- The isolated before/after recovery probe passed its asserted scenario on both supplied builds.
- Browser checks exercised diagram jumps, disclosure controls, exact source links and returns, replay/reset and inventory filters. All readings fit widths 390, 768 and 1440 without document overflow; wide tables scroll inside their own containers. Three screenshots are included.
- The artifact checker validates local links and line fragments. The final report is [logs/artifact-links.json](logs/artifact-links.json).
- All four symnav worktrees stayed clean for tracked files. No symnav source, branch or commit was changed.

These are selected local checks on macOS 15 / Node 22.12.0, not full CI or a Windows run. CLI end-to-end suites were inspected but not executed here. The browser tool blocks file URLs, so visual verification used a temporary HTTP server; the page contains no fetches or external dependencies. [WORKLOG.md](WORKLOG.md) records the process and tooling failures; [logs/manifest.json](logs/manifest.json) records exact commands, commits and results.

## What I would drop

The full per-file diff archive is bulky, and simple ownership readings do not always need all three apparatus/assertion/limit columns. A next version could keep the complete inventory but reserve detailed layouts for the witnesses whose boundaries need a picture. I would keep the deleted-assertion accounting and the recorded comparison.

## What I would do next

Measure which decisions the supplied tests distinguish using isolated, targeted mutations, starting with non-default delivery budgets. Separately trace the public DaemonClient through a real package daemon to expose the composition boundary between the current smoke and integration witnesses.

## Time spent

About 35 minutes, approximately 02:00–02:35 UTC on 2026-09-13.
