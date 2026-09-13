# Pairwise identity as a review representation

The unit of this representation is an equivalence relation between observations. A pixel does not stand for a class, a request, a line of code, a duration, or a correctness result.

For one build, let an observation be `(store, sample)`. The probe retains the object seen at each observation. Fill pixel `(i,j)` when the two observations contain the same object. This is a binary identity matrix, rendered as a contact sheet. Ordering observations by store, then sample makes ownership separation and clearing boundaries visible as different scales of empty space.

The before and after plots are computed independently. They may have the same shape even though no objects are shared across the builds. Color follows the observation group, not a performance measure or a verdict.

This differs from a trace replay: the reader examines any pair of observations, including two separated by a failure or across two stores. The entire relation is present at once. The all-store view exposes isolation; the single-store view exposes lifetime. The service-return lens exposes the distinction between a reused input to projection and a freshly constructed result.

## Apply it

1. Find a change where identity, retention, deduplication, sharing, ownership or lifetime is part of the design.
2. Define the observed boundary explicitly. “Returned promise” and “resolved array” are different objects. “Inside the service” and “at its backend wrapper” are different interfaces.
3. Use actual implementations. Introduce controlled scheduling or failures through dependencies, and record those substitutions beside the figure.
4. Collect handles to objects without replacing their implementation. Assign identity IDs with a Map. Never serialize values and use deep equality as a substitute for alias identity.
5. Pair every observation with every other observation within the same build. Keep the two builds’ identity spaces separate.
6. Sort axes to make the question visible. Here: store first, sample second. Do not interpret blank space as universal proof of isolation; inspect source for that claim.
7. Add the boxes that own the observed relation and every accompanying decision. An unchanged plot cannot explain an ownership move alone. A changed completion boundary will not necessarily appear in an identity plot.
8. Expose evidence under the same named decisions. The top must include exception behavior, public API changes, retained behaviors, test changes and missing rationale before any reader opens a detail.

## This experiment’s samples

| Samples | Boundary immediately before them | What runs |
| --- | --- | --- |
| A1, A2 | Successful backend refresh | First read, repeated read |
| F1, F2 | Injected state refresh rejection | First read, repeated read |
| B1, B2 | Next successful refresh of the same file list | First read, repeated read |
| R1, R2 | Release called; injected project promise still pending | First read, repeated read |

The fixture uses real InMemoryFileSystem, TypeScriptWorkspaceState, TypeScriptSemanticQueryService, TypeScriptBackend and semantic algorithms from each built worktree. The contact sheet observes compiled private cache fields; it never substitutes a hand-written cache algorithm. State.refresh is wrapped only to inject a rejection. Project release scheduling is supplied through a small injected object. `sourceFileFor` delegates to the real state.

The six stores are definitions, reference locations, call target, callers, callees, and position definitions. The first five store promises; the last stores semantic locations. Symbol keys and position keys stay distinct. In the service-return lens, R is the public findReferences promise and P is the returned node array. D/T/C/E are direct service promise returns. Backend wrapper promises are outside this lens.

Separate probes measure release fulfillment/rejection using injected state, existing semantic failure behavior using injected failing state, and the head-only generic scope’s undefined/throw/rejection/late-settlement behaviors. Their raw records are in `evidence/observations.json`.

## Limits

The print covers one source file, one target/caller pair, one missing identifier and eight sampling points. It does not show performance, memory size, actual daemon activity, all possible keys, or all interleavings. Concrete TypeScript project cleanup is synchronous in these revisions; the deferred release probe exercises the inherited asynchronous graph boundary, as the PR’s new test does.

Most stored promises in the contact sheet have settled by the time their IDs are assigned; the original promise objects are retained for comparison. Pending and rejecting behavior is isolated in separate probes and the supplied tests. The plot is not a concurrency test.

The main representation failed to carry the release-completion decision by itself: both builds clear before project release, so their identity matrices match. A separate release-state readout is therefore necessary. This is a limit of the representation, not missing data to conceal.
