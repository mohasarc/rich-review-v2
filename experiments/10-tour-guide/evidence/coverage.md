# Evidence coverage for the tour

The unit of explanation is one `context src/app.ts:target` request. The capture supplies that identity directly, refreshes a fresh backend, then runs the five semantic calls in the order used by `context-command.ts:55–60`. It records cache contents and observer counts after each call. Parsing, symbol selection, history, result building, rendering and daemon transport are outside this replay.

The three-line source is synthetic. The backend algorithms and cache implementations run from each supplied worktree's existing `dist` build. Promise labels are assigned by object identity within each run; labels shared across versions do not imply that the objects are the same. The browser loads recorded data and does not execute TypeScript algorithms on every click.

## The six-file diff

| Changed file | Decision doors | Evidence |
| --- | --- | --- |
| `packages/core/src/backend/turn-scoped-cache-scope.ts` | 01 ownership, 02 exact values / key isolation, 05 failure behavior, 06 public handle and lifecycle surface | Entire 46-line implementation embedded in `sources.js` |
| `packages/core/src/index.ts` | 06 exported API | Added barrel export embedded |
| `packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts` | 01 ownership, 02 algorithms / keys / projections preserved, 04 async release, 05 factory failure behavior, 07 narrower input | Base and head excerpts for all changed mechanisms; full aggregate diff inspected |
| `packages/backend-typescript/src/typescript-backend/typescript-backend.ts` | 03 successful-refresh placement, 04 awaiting release, 07 passing files | Base and head refresh / release excerpts |
| `packages/core/src/backend/turn-scoped-cache-scope.test.ts` | 08 tests; evidence for 02, 05 and 06 | All four new cases embedded and executed |
| `packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts` | 08 tests; evidence for 02, 03, 04 and 05 | Six added cases and five retained cases embedded and executed |

No existing test assertions are removed or edited in the aggregate six-file diff. The public-input change and exact minimal handle API have no specific rationale in the sources inspected. The awaited release boundary is explicitly declared by the PR, while the broader spec calls for unchanged behavior. The page surfaces that difference in its overview and release door.

## Four later host actions

Each host action starts with an independent replay of the same request; the live objects are not reused between cases. This avoids letting one scenario's mutations affect another.

- Successful refresh: refresh the same snapshot and inspect the existing handles after clearing.
- Failed refresh: replace only the in-memory workspace-state `refresh` method with a rejecting implementation. This probes semantic-cache retention, not rollback of every source or graph side effect.
- Resolving release: wrap the existing graph release with a manually held Promise, inspect caches immediately, inspect backend completion after a microtask turn, then allow real project release to finish.
- Rejecting release: reject that held Promise before actual project release. The base drops the returned graph Promise; the harness observes its rejection so the capture process can finish. This observation belongs to the harness, not to the base backend. The head propagates the rejection through its awaited release chain.

Release is never presented as an automatic tail of `context`. The code implements an explicit host operation, and the tour marks the transition to it.

## Scope of verification

- Captured base and head semantic result objects are structurally equal for this fixture. This does not claim parity of full CLI output bytes or every workspace.
- Base focused suite: 5 existing semantic-service cases.
- Head focused suites: 11 semantic-service cases and 4 core-scope cases.
- Browser checks: offline file opening, all eight stops, recorded cache occupancy, hits, nested evidence navigation, focus return, keyboard controls, all four host actions, autoplay pause, mobile overflow, and absence of script errors or external network requests. See `browser-checks.json`.
- No full workspace CI run was performed. No source files in either symnav worktree were changed.
