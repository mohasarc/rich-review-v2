# Ranking record

This ordering was fixed after extraction and before rendering. No decision was removed to make the top shorter. The identifiers are extraction identities, not importance scores.

## Order and reason

| Order | Decision | Why here |
| --- | --- | --- |
| 1 | D01 — one clearing owner, six isolated handles | Principal ownership movement; establishes the nouns |
| 2 | D12 — await completion and failure through backend | Principal changed observation, plus an unresolved rationale gap |
| 3 | D02 — clear synchronously before project release | Separates eviction from completion; the reason is actually stated |
| 4 | D03 — begin only after successful refresh | Defines the other boundary and the failure exception; preserved behavior |
| 5 | D04 — compose the scope | Unexplained implementation form compared with plan wording |
| 6 | D05 — reusable public scope and minimal handles | Unexplained limits qualify what “turn-scoped” and “release” mean |
| 7 | D06 — public file-list argument | Explicitly declared API change with no reason located |
| 8 | D08 — exact factory values and old promises | Needed to understand the following failure asymmetry |
| 9 | D09 — returned rejection versus thrown failure | Exception with consequences for repeated queries |
| 10 | D07 — presence includes undefined | Supporting generic cache policy with an explicit reason |
| 11 | D10 — preserve projections, observers, query algorithms | Shows what remains language-specific without implying universal identity |
| 12 | D11 — add tests and retain prior assertions | Contract inventory, including the boundary between an async double and real cleanup |

Rule: ownership/lifetime boundaries first, then qualifications and unexplained choices, then supporting implementation and tests. Editorial override: D08 precedes D09 so the reader first knows that a promise is stored as an ordinary factory value. D03 remains beside D02 because the two define the lifetime together. Test changes receive full visible space; no weakened or removed test warrants moving a test decision to the front.

## Grouping for the complete overview

- **The moved boundaries:** D01, D12, D02, D03.
- **Declared surfaces, missing reasons:** D04, D05, D06.
- **Contracts kept and made generic:** D08, D09, D07, D10, D11.

Every decision's consequence and reason status remain visible. Groups are reading order, not collapsed containers. The complete overview deliberately extends beyond one screen.

## Reverse pyramid check before rendering

The initial temptation was a single sentence: “core clears six caches once per turn.” It cannot carry the release promise, failed-refresh preservation, public signature change, reuse after release, or the test contract. It was dropped as a complete overview; a quick picture can still supply that intuition.

The detail pass promoted these qualifications into their parents before rendering:

| Detail discovered | Explicit announcement in the overview |
| --- | --- |
| Core release does not mark a scope inactive | D05: usable before begin, after repeat release, during pending release; no gate |
| Clearing is not promise cancellation | D08: old work still settles, without replacing a new entry |
| Some async functions return wrapper promises | D08 and D10: identity belongs to cached handle/service returns, not every public wrapper |
| findReferences wraps a synchronous discovery failure | D09: internal failure timing determines caching even when the caller receives a rejection |
| The graph is already asynchronous; concrete cleanup is synchronous | D12 and D11: both are stated, along with the use of a controlled test double |
| Generic graph stops release iteration on rejection | D12: failure can stop later project releases |
| Current turn surviving refresh does not prove whole-refresh rollback | D03: cache guarantee only; earlier refresh work excluded from that claim |
| Empty arrays are cached locations, but nodes are reconstructed | D10: empty results and new node arrays explicitly named |
| A narrower argument belongs to an exported class | D06: direct public consumers need an argument-shape change |
| The broad preservation promise sits beside changed completion/failure visibility | D12: declaration and rationale separated; no correctness conclusion |

## Author teach-back

The service still answers the same kinds of TypeScript query and already cleared caches at successful turn changes and release. Now it instantiates a core scope to clear six separate caches. A successful refresh starts the next cache turn; failed refresh retains the current cache turn. Release clears immediately, then the backend awaits the existing graph and can expose its failure. That does not cancel returned promises or prohibit fresh queries. The reusable generic API, composition form, file-list signature, and rationale for changed release observation are choices a reader can assess. Exact values, asymmetric failure caching, language-specific projections, and existing tests are preserved; ten tests characterize those contracts.

This is an author self-check, not evidence from a fresh reader. The 33 detail claims in `pyramid-map.json` name their actual visible parent consequence. Structural validation cannot decide whether the prose is sufficient; the reverse reading above remains manual.
