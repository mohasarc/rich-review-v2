# tour-guide

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/10-tour-guide/index.html
```

Works directly from disk, offline, with no install or server. Start with the ownership picture and eight decision cards, then walk the numbered request stops. Cache boxes open source drawers; closing a drawer returns to the same stop. The later host actions explore refresh and release separately.

## Kind

page

## Subjects

`pr-127` — Scope semantic caches to one turn.

Base: `a1e325a5ff979bdfa25babc5554621c8c0f20497`  
Head: `64919bcbcf7fcc8202779b78c5f069b24662bb18`

## Declared choices

- Role framing: Tour guide; one `context src/app.ts:target` request walked through both versions.
- Box lenses: Static package ownership and request path. A separate lifecycle view shows the later refresh/release boundary. The diagrams distinguish ownership of a scope instance from ownership of its implementation.
- Opening style: One concrete source example, `caller → target → helper`, beside a before/after ownership picture.
- Shape: A narrative with paired old/new views. The complete decision overview precedes the mechanism; source evidence adds depth to those same decisions.
- Navigation: Eight linear stops, direct stop selection, scrubbing, optional playback, keyboard controls, clickable cache entries, nested evidence drawers with return navigation, and four later host actions.
- Trust posture: Follow the observed mechanism and distinguish stated reasons from unexplained choices. Surface the awaited-release contract change alongside the spec's unchanged-behavior requirement. No verdict or feedback storage.
- Persona: A teammate familiar with symnav but unfamiliar with its semantic-cache implementation.
- Representations used: A source fixture, package ownership diagram, paired request diagrams, observed cache contents and object labels, search counters, lifecycle probes, decision cards, and expandable line-numbered source excerpts.
- Importance rule: Put the moved ownership boundary, exact-value reuse, successful-refresh boundary, and release completion boundary first. Give unexplained API choices and test changes explicit doors too.
- Inputs used (beyond bundle): Read-only base/head source for the backend, semantic service, cache scope, project graph and context command; existing built modules from both worktrees; a synthetic in-memory three-function fixture; focused existing Vitest suites; Git commit IDs and worktree status. Bundle inputs used were `pr.json`, `diff.patch`, `files.txt`, and relevant portions of `repo-rules.md`. Also read the required philosophy and playbook, including the optional angle menus. Did not use the precomputed overview files or the forbidden v1 repository.
- Tech: Plain HTML, CSS and JavaScript; local data scripts; Node capture and evidence-collection scripts. No runtime dependencies, requests to external services, storage, or build step for viewing.
- Built on earlier experiment(s): none. Earlier experiment artifacts were ignored. Existing files from this folder's supervisor/earlier worker attempts were preserved; their trace content was not used.

## What I tried

I first traced definition lookup, then found that `context` already visits all six caches in one natural request. Call-target resolution fills definitions; the explicit definition question reuses them. Callers discover reference locations; references later reuse that discovery. Callees visit the position cache. That sequence became the eight-stop tour.

I ran the actual built backend implementations against the same tiny fixture and captured intermediate cache contents. The recorded semantic results match for this example. Separate host probes make a successful unchanged refresh, a failed refresh, pending project release and rejected release inspectable. The release probe exposes an actual contract difference: base returns while the project is pending; head waits and propagates its asynchronous rejection.

No implemented explanatory approach was abandoned. Browser inspection led to navigation controls below the paired panels so mobile readers can continue without returning to the top. One verification attempt used a dynamic import unsupported by the browser tool's execution context; verification was rerun without that import.

## What I would drop

Autoplay. Direct stop selection and scrubbing communicate the mechanism more clearly. The eight-card overview also has some repetition with the evidence drawers; I would shorten that copy after a fresh-reader check.

## What I would do next

Have a fresh reader predict the reference-search count and the backend release outcome before revealing those stops. Use what they miss to tune the ownership diagram and the boundary between request and later host action.

## Time spent

About 27 minutes for this Codex attempt, including capture, implementation and browser verification.

## Evidence and limits

The browser replays captured data. It does not execute symnav on each click. The capture performs backend refresh, then the five semantic calls in `context-command.ts:55–60`, supplying the target identity directly. CLI parsing, target selection, Git history, result building, rendering and daemon transport are omitted and labeled as such. This is a semantic request-path example, not a whole-CLI parity demonstration.

Failure and delayed-release conditions are injected into live objects in the capture process. They are controlled probes, not a record of a daemon incident. Rejected project promises dropped by the base are observed by the harness so capture can finish. That observation is not attributed to the base backend.

- [Coverage and capture method](evidence/coverage.md) maps all six changed files to the eight decision doors.
- [Raw replay](evidence/replay.json) contains the source fixture, both revisions, all frames, object labels, counters, outputs and host probes.
- [Source snapshots](evidence/source-snapshots.json) contains 23 local excerpts and the supplied PR metadata.
- [Base test output](evidence/base-tests.txt): 5 existing semantic-service cases passed.
- [Head test output](evidence/head-tests.txt): 11 semantic-service cases and 4 core-scope cases passed. No full workspace CI run was performed.
- [Browser checks](evidence/browser-checks.json): 39 interaction checks passed in an isolated offline Chromium context, including every request stop, all host branches, evidence return/focus, keyboard navigation, playback and mobile layout. No uncaught browser errors or external network requests were observed.

Both symnav worktrees had clean tracked status after the work. All authored files are inside this experiment folder.

To regenerate the recorded backend data using the supplied worktrees' existing builds:

```sh
node ~/projects/rich-review-v2/experiments/10-tour-guide/capture.mjs
```

To refresh the source excerpts from those worktrees and the input bundle:

```sh
node ~/projects/rich-review-v2/experiments/10-tour-guide/collect-evidence.mjs
```

The original assignment is preserved in [brief.md](brief.md). Screenshots cover the [request](screenshots/01-request.png), [opening](screenshots/02-opening.png), [mobile layout](screenshots/03-mobile.png), and [pending release](screenshots/04-release.png).
