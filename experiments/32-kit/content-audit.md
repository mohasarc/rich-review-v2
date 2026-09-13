# Content and evidence audit

This is an explanation audit, not a review of whether PR 127 is correct. It records how the complete diff was accounted for and where reasons were found. There are no scores or verdicts.

## Source boundary

The supplied `pr-127` bundle provided PR body, six commit subjects with empty bodies, patch, file statistics, stack position, and repository/spec context. The head and base worktrees provided exact source and test contents. `capture_sources.py` checks their commits and compares each captured file to `git show` before giving it a revision label. `sources/snapshot.json` contains the complete captured text and SHA-256 hashes. The generated source pages preserve line numbers.

Head: `64919bcbcf7fcc8202779b78c5f069b24662bb18`.

Base: `a1e325a5ff979bdfa25babc5554621c8c0f20497`.

Read the architecture spec, the relevant repository rules, and the follow-ups spec's cache/release references. The latter did not supply a reason for this PR's API shape. No implementing-agent transcript was provided or used, no live GitHub data was fetched, and no earlier experiment was read. “Unexplained” always means no reason found within this source boundary.

## Complete changed-file accounting

| Changed path | Decisions it contributes |
| --- | --- |
| `packages/core/src/backend/turn-scoped-cache-scope.ts` | 01: core ownership; 02: separate handle Maps; 03: membership and exact value storage; 04: failure timing; 09: composed/reusable scope API, persistent registry, no cancellation hooks |
| `packages/core/src/index.ts` | 01: public scope and handle export |
| `packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts` | 01–04: scope/handle adoption preserving algorithms and cache semantics; 06: awaited project release; 07: preserved projections and miss observers; 08: files-only input; 09: constructed scope and retained files/handles |
| `packages/backend-typescript/src/typescript-backend/typescript-backend.ts` | 05: successful-refresh ordering retained; 06: backend awaits release; 08: call site passes `snapshot.files` |
| `packages/core/src/backend/turn-scoped-cache-scope.test.ts` | 10: four new cases; evidence for 02–04 and 09 |
| `packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts` | 10: six new cases with existing five cases unchanged; evidence for 03–07 and 09 |

Import additions in test files support the new fixtures and assertions. They do not introduce a production dependency. No production hunk is left outside the ten decision groups.

## Stated reasons, gaps, and scope tension

| Decision | Where the reason comes from | Limit of attribution |
| --- | --- | --- |
| 01 Core ownership | Architecture spec, language backend guarantee | Does not explain composition over inheritance. That separate gap is 09. |
| 02 Six handles | PR Decisions: independent key/value spaces | The maps remain separate; the scope shares lifetime, not contents. |
| 03 Exact values and membership | PR Context plus the explicit `Map.has` reason | `undefined` support is the generic handle contract. The six TypeScript cache types do not all use undefined. |
| 04 Failure distinction | PR Context promises preservation; characterization commits/tests | This is a reason to retain the distinction during extraction, not a claimed rationale for its original design. |
| 05 Successful refresh only | Explicit PR decision | Already true in the base. Do not present it as a new behavior or a guarantee that every prior refresh step rolls back. |
| 06 Awaited release | PR Shape, Public surface, and clearing-order decision | Awaited release is explicitly requested by the PR. The broader architecture spec also requires unchanged failures; the two sources do not explain the reconciliation. |
| 07 TypeScript query bodies | PR Context and architecture spec | Internal cached promises are distinct from outward async wrappers/projection arrays. |
| 08 Files-only beginTurn | No reason found | The PR lists this API change, so it is not a wholly unmentioned change; listing it does not explain it. |
| 09 Reusable composed scope | No reason found | Code and tests establish the behavior; they do not explain why this API was chosen over a shared base or a revocable scope. |
| 10 Added contract tests | Characterization/lifecycle/release commit subjects and preservation intent | Assertions were read and compared, not executed in this experiment. |

No other unrequested production change was identified in the six-file patch. No existing test or assertion was removed or weakened: the original TypeScript test block from its first case through end of file is exactly retained, and the other test file is new. `sources/test-audit.json` records the exact names and comparison result.

## Descent audit

The root consists of the hero, ownership pair, turn/lifetime note, and all ten decision cards. It is one complete layer, not a promise that the hero sentence alone contains every choice.

Every lower section has an explicit claim set in `coverage.json`; the matching HTML carries those same IDs. The two facts most likely to be hidden during compression—awaited failure propagation versus the stack's parity wording, and the non-revoking/repopulatable scope—are both on the root cards. The files-only public input and composition choice are also visible there as unexplained.

Mechanisms 01, 03, and 06 explicitly cross-link to related root choices; their claim sets include those related decisions. The evidence layers are original lines supporting the same choices. Source files can be inspected in full below those excerpts, with original revision and line anchors.

The structural check catches unannounced identifiers. It cannot certify that a sentence does not smuggle in a new fact. A manual read checked the root against the call sequences, API before/after, promise paths, projection table, and test audit. Specific method names and source lines below the overview add fidelity to already-announced behavior.

## Artifact verification

`browser-check.js` exercised 25 browser behaviors in Chromium: root completeness, keyboard and SVG exits, exact return focus, nested evidence exits, browser Back, direct source fragments, guide/starter reuse, mobile panel stacking and contained diagram scrolling, no-JavaScript fallbacks, and absence of runtime errors/external service requests. Results are in `browser-results.json`.

The browser harness rejected the `file:` protocol, so browser checks used a temporary server bound to `127.0.0.1`. The shipped HTML uses local relative assets, classic JavaScript, and native anchors; it has no module loader, fetch, external font, or build requirement for reading. Opening it directly is the intended entry point.

`verify.py` checks local files and fragment targets, unique HTML IDs, absence of feedback controls, declared layer coverage, captured-source integrity, excerpt ranges, retained test text, and failure cases in the component contracts. These checks validate the artifact, not Symnav behavior.
