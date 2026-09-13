# owner-persona

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/13-owner-persona/index.html
```

The entry file contains its styles, scripts, and source evidence. It needs no server, installation, or network. Keep the folder together for the standalone evidence fallback and audit links.

## Kind

page

## Subjects

pr-131 only: “Route daemon thresholds through centralized policy.” Base `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`; head `b100221db48754656328391b878299c5a0bab443`.

## Declared choices

- Role framing: owner inspecting the consequences of someone else’s change. Familiar mechanisms get compact names; unexplained consequences lead.
- Box lenses: static package structure and data ownership across CLI process, daemon process, and worker thread. The package diagram marks the new required value feeds and the removed local threshold path. The process diagram distinguishes the existing serialization bridge from the new consumer feeds.
- Opening style: one ownership picture, preceded by a short delta. Its grouping is explicitly marked as lossy.
- Shape: complete, collapsed decision register with twelve rows; mechanism explanations inside each row; exact source underneath.
- Navigation: native disclosures, expand/collapse all for linear reading, map-to-row links, bookmarked rows, file-to-decision links, and a modal source viewer that restores focus on close. No-JavaScript reading uses native disclosures and a standalone evidence page.
- Trust posture: compare stated intent with shipped boundaries and test changes. Explain the choices and leave their judgment to the owner.
- Persona: reader already owns this daemon corner. No daemon primer, onboarding sequence, quiz, or required interaction.
- Representations used: package and process diagrams, compact decision register, before/after error table, nested recovery scopes, deadline bars, output flow, policy-to-consumer tables, and exact base/head/diff evidence.
- Importance rule: unexplained observable consequences and altered test witnesses first; purpose and recovery distinctions next in explanatory depth; broad policy plumbing is grouped by consumer family. No correctness score or verdict.
- Inputs used (beyond bundle): targeted base/head implementation and test source; unchanged `packages/daemon/src/daemon-policy.ts`, its tests, and `policy-testing.ts`; `plans/005/daemon-policy.md` and the architecture functional spec; worktree contributor guides; exact revision and clean-tree checks. Bundle inputs used: full patch, PR body and all six commit messages, changed-file statistics, stack position, and contributor/spec context. Precomputed overviews were not used to infer behavior. No implementing transcript was available in the inspected material.
- Tech: plain HTML/CSS/JavaScript; Python generator; a small Node/TypeScript source-method probe. Browser validation used Chromium through Playwright in isolated contexts. Harness: Codex. No sub-agents.
- Built on earlier experiment(s): none. Earlier experiment folders and artifacts were not read. The supplied brief and harness files already existed in this experiment folder and were preserved.

## What I tried

I read the entire supplied diff, then followed the composition, recovery, and test-adapter changes into source. I considered an interactive timeout/recovery simulation and dropped it before implementation: the owner needs the scope of each decision immediately. The implemented page uses small fixed diagrams and optional source inspection instead.

The first tempting headline was that only threshold ownership changes. Source inspection made that incomplete. The final register also exposes the changed returned-error identity, test-only inline-limit coercion and directory creation, the unused legacy memory-cap option, deleted resource tests, policy-derived expectation sources, and remaining numeric seams. Stated reasons and missing reasons remain separate. A register row is the stopping layer; its explanation adds exact paths, values, mechanics, and evidence for the same decisions.

Verification completed:

- The generator checks the two exact revisions and verifies that the bundled patch equals their three-dot diff. All 60 changed files map to register rows; the totals are 19 production files and 41 test/helper files, +1,298/−544. See [audit.json](audit.json).
- [probe.mjs](probe.mjs) extracts the actual base/head completion methods, error class, and authentication guard, then runs them with stubbed execute/completion promises. Its four observations support the displayed error table. It does not exercise a daemon or socket. See [probe-results.json](probe-results.json).
- Browser checks covered disclosures, source revisions and line targets, keyboard tabs/Escape/focus return, file filtering, deep links, desktop/mobile overflow, and the no-JavaScript fallback. No page errors or network requests occurred. See [browser-check-results.json](browser-check-results.json) and [screenshots](screenshots/).
- The browser harness first hit an unsupported dynamic import and then an exact link-name selector that omitted the visible arrow. Both harness issues were fixed before the successful run. No page implementation was abandoned.
- Both symnav worktrees remained clean. Symnav suites were not run, and their correctness is not claimed.

To regenerate from the supplied worktrees, run `node probe.mjs` and then `python3 build.py` inside this folder. Editorial content is in [content.py](content.py); the template, styles, and interaction source are separate from the generated entry file. [browser-check.js](browser-check.js) is a Playwright tool snippet taking a `page` argument; it returns the report preserved alongside it.

## What I would drop

The always-visible 60-file index is useful for completeness but consumes a lot of page below the stopping line. I would move it to a separate sheet if owners consistently navigate by decision. The mobile opening diagram also takes nearly a screen; desktop is the primary reading surface here.

## What I would do next

Have a daemon owner read only the collapsed register, then describe the returned-error and fixture changes. Use their omissions and redundant-reading complaints to edit the rows; this experiment has no human recall result yet.

## Time spent

About 24 minutes of wall-clock time, including source inspection, implementation, the source probe, browser checks, screenshots, and this handoff.
