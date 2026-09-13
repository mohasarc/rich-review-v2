# Validation record

Executed on 2026-09-13. These checks validate the capture tool and page, not a verdict on PR 127.

## Code identity and builds

- Base: `a1e325a5ff979bdfa25babc5554621c8c0f20497`.
- Head: `64919bcbcf7fcc8202779b78c5f069b24662bb18`.
- `pnpm build` completed in both assigned worktrees.
- Both worktrees had empty `git status --short` output before and after execution and focused tests.
- Each capture records the Git revision, tracked source status, Node version and SHA-256 hashes of key compiled modules. `observations.json` also records the runner, server, capture script and fixture hashes.
- `node --check` completed for the page script, runner, server, capture script and generated capture bundle.

## Captured executions

`node capture.mjs` executes three fixture projects across six scenarios, with separate base and head processes for each pair: 18 comparisons, 36 executions. The final capture was generated at the timestamp in `observations.json`.

The capture script checks observed result values and identities, observer counts, synchronous cache clearing, preservation after a failed refresh, the pending/rejected release boundary, and the generic core contracts. All 18 final comparisons were captured successfully.

The fixture projects are two calls to one target, an unresolved call position, and overloads. The scenarios are unchanged-source successful refresh, changed-source failed refresh, concrete project release, delayed release, rejected release, and synchronous versus asynchronous semantic failures.

No timing comparison or performance claim is made. `elapsedMs` in raw JSON includes worker startup and compilation-library loading.

## Focused upstream tests

| Worktree | Command (from the package directory) | Result |
| --- | --- | --- |
| Base backend-typescript | `pnpm exec vitest run src/typescript-backend/typescript-semantic-query-service.test.ts` | 5 passed |
| Head backend-typescript | `pnpm exec vitest run src/typescript-backend/typescript-semantic-query-service.test.ts` | 11 passed |
| Head core | `pnpm exec vitest run src/backend/turn-scoped-cache-scope.test.ts` | 4 passed |

Vitest emitted its existing CJS Node API deprecation notice. No test failures occurred. The full workspace CI suite was not run; symnav source was not changed.

## Browser checks

Playwright exercised the actual page against the local Node server and directly through `file://`:

- Default held-release recording: base backend fulfilled; base graph pending; head backend pending; head graph pending.
- Query checkpoint: seven rows for the default fixture, including both call positions. Reference-result dialog contains the actual fixture reference locations.
- Clicking a cache cell opens its actual stored entries.
- Running with three repetitions creates a fresh run ID and three repeated semantic-service promise IDs.
- Rejected live release: base backend fulfilled, base graph rejected, head backend rejected, head graph rejected.
- Editing source to contain three calls changes the live results to eight rows, including three position queries.
- Selecting the missing-call fixture shows an empty position result, with fresh result arrays and no additional resolution search on repeated access.
- Editing the target to an absent symbol produces real query failures and switches the worked-example narration to describe those failures.
- A target path outside the fixture is rejected; the page retains the last completed observation and marks the edited inputs as pending execution.
- The unexplained signature decision opens source, and source can switch between base `WorkspaceSnapshot` and head `readonly WorkspaceFile[]`.
- Observation export downloads JSON containing the fixture and both revisions' provenance.
- The static JSON evidence endpoint serves valid JSON with 18 capture records.
- Offline recordings work with live execution disabled and visible startup instructions.
- At 390 × 844, the document and decision dialog have no horizontal overflow; boundary selection remains usable.
- All local fragment links resolve.

The local validation server was stopped after these checks. Screenshots were captured at desktop and mobile sizes. There is no persistent service to clean up.

## Boundary audit

The supplied six-file diff adds six semantic-service tests and four core tests. It removes no existing test assertions. The page surfaces the changed service signatures, the public core export, lifecycle ownership, six-cache isolation, presence checks, exact identities and failure behavior, successful-refresh timing, awaited release, and reusable handles. Signature narrowing and the minimal handle/clear API are explicitly marked unexplained. The rationale for preserving existing failure behavior is distinguished from the absent rationale for that original policy.

The controlled project-release gate, throwing extractor, and rejecting `ensureFiles` seam are visible where those scenarios are selected. The real concrete-release scenario is retained. The page does not infer production delays, daemon scheduling, correctness, memory savings, or speed from these probes.
