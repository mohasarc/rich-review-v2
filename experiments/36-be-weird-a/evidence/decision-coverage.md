# Mapping the six-file delta to the stopping layer

This is an extraction record, not a correctness review. All decision IDs refer to visible cards in `index.html`; no item here requires discovering a new decision on descent.

| Changed file | Change or retained contract inspected | Visible decisions |
| --- | --- | --- |
| `packages/core/src/backend/turn-scoped-cache-scope.ts` | Generic interface/class, private per-handle Map, `has`/`get`, exact factory return, throw-before-store, no settlement hook, scope registry, explicit synchronous all-handle clear | 1, 2, 3, 6, 8 |
| `packages/core/src/index.ts` | New scope + cache interface export | 1, 8 |
| `packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts` | Compose a scope, replace six Maps with handles, preserve keys/algorithms, narrow beginTurn parameter, clear before awaited project release, preserve reference/position projections, remove manual clear loop | 1, 2, 3, 5, 6, 7, 9, 10 |
| `packages/backend-typescript/src/typescript-backend/typescript-backend.ts` | Pass snapshot.files; retain successful-refresh boundary; await semantic release | 4, 5, 9, 12 |
| `packages/core/src/backend/turn-scoped-cache-scope.test.ts` | Four added tests: exact values/undefined/isolation; all-handle reset; promise rejection/sync throw; late old settlement | 3, 6, 8, 11 |
| `packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts` | Six added tests: identity, empty positions/rehydration, async failures, sync reference failures, failed refresh, pending/rejecting release. Five existing tests retained | 2, 3, 4, 5, 6, 10, 11 |

Reasons were read in the supplied PR body, all six supplied commit messages, the daemon architecture spec, and contributor guide. The PR provides specific reasons for isolated handles, presence checking, clear-before-release, and begin-after-success; the spec assigns generic retention to core. The PR requests identity/algorithm/failure preservation. The contributor guide gives the characterization-first rationale.

No specific rationale was found for composition versus the plan’s base-class language, the precise public scope API, the narrowed service argument, the original location-reprojection choice, or reconciliation of the awaited release boundary with the global parity commitment. These are marked unexplained; their implementation is not treated as a reason.

The public API changes are expressly announced by the PR. No unrelated or covert additional edit was found in the six-file diff. No existing test case or assertion was removed or weakened. Added service tests precede the existing tests, and the only removal lines in that test file replace an import.

The release comparison is deliberately bounded: actual backend/service classes, injected deferred/rejecting project graph. Concrete TypeScript project cleanup returns void; the inherited core graph method returns a promise. No claim about changed daemon output or a real observed operational failure is made.
