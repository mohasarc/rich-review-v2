# executable-before-after

## Entry point

Open [index.html](index.html) directly. All 18 recorded comparisons, source drilldowns, and checkpoint controls work offline.

For fresh execution of editable fixture inputs, run this one command:

```sh
node ~/projects/rich-review-v2/experiments/17-executable-before-after/server.mjs
```

Then open [http://127.0.0.1:4717](http://127.0.0.1:4717). The server builds both assigned worktrees before serving. It uses the existing Node, pnpm, and worktree dependencies. Ctrl-C stops it. The validation server has already been stopped.

## Kind

tool + page

## Subjects

pr-127 — Scope semantic caches to one turn. No other PRs.

## Declared choices

- Role framing: experimentalist; let the reader inspect observations from actual execution.
- Box lenses: static package ownership and runtime cache/promise lifetime. The service owns the scope instance; core owns its implementation. Separate process columns are the experiment's isolation, not symnav's production topology.
- Opening style: before/after ownership in one frame, followed by a complete decision map. The default worked example holds project release open and exposes the changed backend promise boundary.
- Shape: before/after diptych → executable laboratory → exact source and observation evidence.
- Navigation: linear reading, high-level links into scenario recordings, checkpoint selection, cache/result dialogs, decision-to-source links with base/head switching, and return links. Closing a source dialog returns to the page.
- Trust posture: compare stated intent with measured behavior; mark missing rationale explicitly. No correctness verdict, scoring, approvals, or comment storage.
- Persona: a teammate familiar with the repository but unfamiliar with semantic query lifetime.
- Representations used: ownership boxes, lifecycle strips, live base/head executions, recorded checkpoints, six-map occupancy displays, exact object-identity tables, actual result JSON, head-only generic core probes, and numbered source snapshots.
- Importance rule: show the ownership change and awaited release boundary; make preserved behavior visible so equal query outputs remain informative. Surface unexplained API choices and test decisions explicitly.
- Inputs used (beyond bundle): both assigned worktrees' source and compiled output; Git revision/status and six commit subjects; real fixture executions; focused base/head semantic-service tests and head core-scope tests. From the bundle, used `pr.json`, `diff.patch`, `files.txt`, and `repo-rules.md`. Read the philosophy and playbook. Did not use the precomputed overview files or external web sources.
- Tech: vanilla HTML/CSS/JavaScript; Node HTTP server and child-process runner; the worktrees' existing TypeScript compiler, ts-morph, and symnav implementations. No artifact npm install, CDN, font service, or remote API. Harness: Codex.
- Built on earlier experiment(s): none. Earlier experiments were intentionally ignored.

## What I tried

The real runner imports each worktree's compiled backend. It prepares in-memory TypeScript projects, repeats all query kinds, reads the actual six maps, and records the service's return identities. Backend refresh and release run through their unchanged methods. Recording the service boundary matters: the backend's async wrappers do not expose the same promise identity as the directly returned service queries.

Concrete project release is retained as a control. Its TypeScript cleanup is synchronous on these revisions, so ordinary completion alone does not expose the changed await chain. A controlled graph-release gate makes that chain observable without rewriting the backend or cache algorithms. A rejection fixture makes the error boundary observable too. Reimplementing an old/new cache in browser JavaScript was considered and dropped: it would demonstrate our implementation rather than this PR.

The fixtures cover repeated calls, an unresolved call position, and overloads. Six scenarios run against each: successful refresh, failed refresh, concrete release, held release, rejected release, and synchronous/asynchronous query failure. The failed refresh uses a throwing extractor during real preparation and rollback; the asynchronous query failure uses a rejecting `ensureFiles` seam. Every controlled input is labeled in the page.

The generic core probes execute the actual new scope with undefined values, isolated handles, throwing factories, rejected promises, an old promise settling after a new turn, and repeated release. They are explicitly head-only because there is no equivalent public abstraction in the base. No fictional old undefined-value failure is shown.

The initial worked-example narration assumed the fixture's target existed. That fixed success wording was dropped for failing edited inputs after exercising the editor. The page now displays the real failures. The broader comparison deliberately avoids a timing race: startup and compiler-library loading would dominate these small probes.

## What I would drop

Full-file source dialogs are more material than most readers need. Highlighted function slices with an explicit full-file exit would make the evidence easier to inspect. The overload preset adds fidelity, but the default and unresolved-position fixtures carry most of the explanation.

## What I would do next

Ask a fresh reader to explain the difference between clearing entries, closing handles, and awaiting project cleanup after using the page. Then test whether the identity table adds understanding beyond the cache occupancy and release states.

## Time spent

Approximately 27 minutes, including source investigation, implementation, execution captures, focused tests, browser checks, and this README.

## What the recorded runs establish

The 18 comparisons execute both supplied revisions: 36 separate backend executions. For the bundled fixtures, the actual semantic query outputs match. Same-turn identity reuse and clearing after successful refresh remain visible in both versions.

With project release held open, the base backend promise has fulfilled while the head backend promise remains pending. Both have synchronously emptied every cache. Rejecting that controlled project promise reaches the head backend with the same Error object; the base backend had already fulfilled. A later query can refill the handles in both versions. These observations explain the lifetime decision; they are not a PR verdict or a production scheduling claim.

The top-level map includes all six changed files' decisions: core lifetime ownership and export, six isolated spaces, presence checks for undefined, preserved values and failure behavior, successful-refresh timing, awaited release, narrowed `beginTurn` input, reusable handles, and ten additive tests. Signature narrowing and the minimal handle/clear API are marked unexplained. The PR's preservation goal is distinguished from the absent reason for the original failure policy. No existing test assertion was deleted or weakened in the supplied diff.

## Execution fidelity and limits

- Queries parse and analyze the fixture's TypeScript; the fixture is not evaluated as an application program. No source fixture files are written into symnav.
- Cache counts are read from emitted private fields, and search counts use the existing observer. This harness is deliberately specific to these revisions' internal structure.
- A graph-release wrapper records the returned promise. Controlled modes gate that promise before actual project cleanup. Rejection therefore prevents cleanup from being reached. An observer rejection handler keeps the ignored base promise from crashing the capture process; it does not change what the backend promise does.
- The failed-refresh scenario changes one in-memory source revision, then throws from extraction during real state preparation. The rejected semantic scenario changes only the `ensureFiles` seam. The reference-discovery failure uses a real absent symbol.
- Checkpoint controls replay completed observations. Fresh execution happens when “Run both revisions” is pressed; the UI does not pause a running backend. Recorded and fresh runs are visibly distinguished.
- Object labels such as `P1` denote exact identity inside one process. Matching labels across revisions do not imply object equality across processes.
- Source snapshots are frozen at the supplied base/head revisions. Live runs read the assigned worktrees at execution time and record their actual revisions, tracked source state, and hashes of key compiled modules. Transitive dependencies are not individually hashed.
- The artifact does not measure memory retention, speed, daemon scheduling, or full-CLI output. The full workspace CI suite was not run. Only build output and dependency test caches were permitted in the worktrees; tracked source remained unchanged.
- Edits and live observations stay in browser memory. The only export is an explicit download of fixture inputs, observations, and provenance; there is no review-comment storage.

## Verification

Both worktrees built successfully. The focused upstream tests passed: base semantic service 5/5; head semantic service 11/11; head core scope 4/4. Both worktrees remained clean.

The capture tool checks all 18 comparison records. Playwright checked live execution, changed source, changed repeat count, absent-symbol output, input validation, source navigation, result/map inspection, JSON export, offline opening, and mobile layout. Details are in [evidence/validation.md](evidence/validation.md). [evidence/observations.json](evidence/observations.json) contains capture checks, harness hashes, and a complete rejected-release example.

## Files and reproduction

| File | Purpose |
| --- | --- |
| [index.html](index.html), [app.js](app.js), [style.css](style.css) | Review page and interactions |
| [runner.mjs](runner.mjs) | Real backend execution and observation in one revision |
| [server.mjs](server.mjs) | Local page server, fixture validation, and paired child processes |
| [capture.mjs](capture.mjs) | Execute the fixture matrix, check observations, and generate the offline bundle |
| [captured.js](captured.js) | All 18 recordings plus local source, intent, and diff snapshots |
| [fixtures/presets.json](fixtures/presets.json) | Three inspectable fixture projects |
| [brief.md](brief.md) | Copy of the received brief |
| [screenshots/01-laboratory.png](screenshots/01-laboratory.png) | The executable comparison |
| [screenshots/02-overview.png](screenshots/02-overview.png) | Ownership and opening layer |
| [screenshots/03-mobile.png](screenshots/03-mobile.png) | Mobile opening |

After building the worktrees, regenerate the offline data with `node capture.mjs` from this folder. It writes only inside this experiment. To use a different local port, set `EXPERIMENT_PORT`, for example `EXPERIMENT_PORT=4718 node server.mjs`. The page itself has no external dependencies and can be copied with its adjacent files for offline inspection.
