# textbook-chapter

## Entry point
`open ~/projects/rich-review-v2/experiments/04-textbook-chapter/index.html`

Single static file, no network. Rebuild after editing `src/chapter.html` or probe output: `node build.mjs`.

## Kind
page

## Subjects
pr-127. Used as context only: #126 (base; history of `ProjectGraph.releaseTransientResources`), #117 (origin of the un-awaited call), #149 (stack tip; checked that the scope and service files are unchanged).

## Declared choices
- Role framing: learner / textbook. Chapter 4 of 26, learning goals, key terms, one worked example with predict-then-reveal rows, 12 end-of-chapter exercises (answers revealed locally, nothing stored).
- Box lenses: static structure (packages → modules, changed edges lit, Fig 4.4) and lifecycle/ownership ("who decides what" table, cache-entry state machine Fig 4.6, turn timeline Fig 4.1). Runtime topology only as context (daemon worker thread).
- Opening style: before/after in one frame (Fig 4.0), then motivating failure (stale answer, real run with emptying disabled), then a whiteboard metaphor marked lossy.
- Shape: pyramid. 4.0 is the complete top; 4.1–4.3 intuition; 4.4–4.8 mechanism; 4.9–4.10 decisions and tests; 4.11 code; 4.12 exercises.
- Navigation: narrative with exits. Sticky TOC grouped by depth; every top-layer item links down; an "↩ Back to <section>" button returns to the exact scroll position (checked in browser).
- Trust posture: trusting explainer plus test honesty. Every PR-body claim is checked against a run or a test; red/green history verified by running commits.
- Persona: teammate who knows symnav but not the TypeScript semantic-query corner.
- Representations used: SVG before/after diptych; turn timeline; module diagram; ownership table; real cache-key table; state machine; refresh sequence; release call chains on three builds; recorded 18-step session table with a six-cell cache "rack" per step; results table from three probes; traced daemon-consequence flow; commit strip with test-run chips; 12 decision cards; code excerpts; metaphor figure and table; quiz.
- Importance rule: changes behavior → no stated reason → crosses a package or public surface → kept and newly pinned.
- Inputs used (beyond bundle): source at main, #126, #127 and #149 worktrees; `git log -L` / `git show` on the six PR commits, #126 commits and #117; #126 PR body from `inputs/stack/pr.json`; `plans/005` architecture and follow-ups specs at #127 and #149; real runs (below).
- Tech: hand-written HTML/CSS/inline SVG, vanilla JS; recorded JSON embedded at build time; Node probe scripts against built worktree `dist/`.
- Built on earlier experiments: none. Folders 01–05 existed without READMEs or artifacts when this run started; not read.

## What I tried
- Planned the worked example as a walk through the PR's own fake-collaborator test. Switched to one real session on three builds after `git log -L` showed the release call path changed in #126. The three-build comparison became the spine.
- Framed decision 1 as "fixes a #126 regression" until `release-window.mjs` showed main also resolves early for async project release. Reframed: restores main for today's synchronous projects, new contract for async ones.
- Tried to reach a cached async rejection with real files. Not reachable: unknown symbols resolve empty or throw inside the factory. The page cites the PR's fake-state test for that path and says so.
- Did not run the full daemon to observe replacement causes. Figure 4.9 is traced from code and labelled.
- Rule-4 audit on the draft found deeper facts missing from the top: the memory-pressure trigger, future hosts, and pinning gaps. I added them to 4.0. I removed two deeper additions instead of lifting them: a #128 `WorkspaceSession` mention and a repo-rule citation beside an unexplained decision, which read like a supplied reason.
- First draft said "new import edge backend-typescript → core". The service already imported core, so I reworded it: no package dependency changed; what crossed the package line is the job of emptying caches.
- Playwright blocks `file://`, so I checked rendering through a temporary local HTTP server. Layout fixes came from those screenshots: crossing edges in Fig 4.4, an arrow through a box in Fig 4.0, overlapping state-machine labels.

## What I would drop
- 4.2 metaphor: its table restates the mechanism; low value for a repo-familiar reader.
- Decisions 10–12 as separate rows and cards: collapse into one "API shape" row.
- 4.11 excerpts of the service diff: partly duplicate the worked example and Fig 4.8.
- Exercises 10–12 (open answers): nothing checks them beyond a model answer.
- Page length (~19k px) is the cost of the depth; the top layer alone is about one screen of figure plus one table.

## What I would do next
Run the full daemon with an injected release failure and replace traced Fig 4.9 with a recorded diagnostic log. Then give 4.0 alone to a fresh reader and score the exercises, to test whether the top layer is complete.

## Time spent
About 50 minutes wall-clock (01:39–02:28 +03).

## Real vs illustrative
| Element | Kind | How |
| --- | --- | --- |
| Worked Example 4.1, top-layer "17 of 18" | real | `probe/semantics.mjs` on `worktrees/main`, `pr-127-base`, `pr-127-head`; counts via observer hooks, cache sizes read from live objects; failure injected through the observer hook inside real project release |
| Stale answer (4.1) | real, sabotaged in memory | same probe, `clearing-disabled` replaces `cacheScope.beginTurn` with a no-op |
| Table 4.1 col 2 | real code, fake async project graph | `probe/release-window.mjs` (same setup as the PR's own test) |
| Table 4.1 col 3 | real daemon worker thread | `probe/worker-release.mjs` starts the real `daemon-navigation-worker-entry.js` via `NodeDaemonNavigationWorker`; project release patched to fail inside the worker; no-fault control on #126 |
| Key table (4.5), failure shapes (4.6) | real | `probe/cache-keys.mjs`, `probe/failure-shapes.mjs` |
| Test chips (4.10) | real | `git archive` of commits 1, 5, 6 into `/tmp`, `pnpm install --frozen-lockfile && pnpm build`, vitest on the two test files; logs in `probe/out/tests-*.log` |
| Fig 4.9 daemon consequence | traced in code, not run | marked on the page |
| Figs 4.0, 4.1, 4.2, 4.8, 4.11 excerpt | simplified where marked | marked on the page |

Nothing was written inside symnav worktrees or the clone (`git status` clean on all four worktrees afterwards; no worktree added).

## What the chapter found (for triage)
- 17 of 18 recorded steps are identical on main, #126 and #127: answers, searches run, cache occupancy.
- The one divergence: when project release fails, `TypeScriptBackend.releaseTransientResources()` rejects on main and #127 but resolves on #126, where the daemon worker thread then answers `"heap"` (success) and dies 2 ms later (`cause: error`). #126 made `ProjectGraph.releaseTransientResources` async; the service's call was never awaited (since #117). #127 adds the `await`. Neither PR body mentions it. The spec forbids behavior fixes during restructuring and routes them to the follow-ups spec, which has no entry.
- With an async project release, main also resolves early, so the `await` is new relative to main for async projects.
- 12 decisions; 6 have no stated reason. Two PR-body "Chose…" items (turn begins after refresh succeeds; clear before project release) keep existing order and are newly pinned by tests.
- 5 characterization tests pass on #126 code (10/10); the release test fails on #126 code at `expect(releaseSettled).toBe(false)`; no test removed or weakened.
