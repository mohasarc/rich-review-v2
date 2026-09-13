# Evidence and model boundaries

The artifact explains PR #131 against these local revisions:

- Base: `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`
- Head: `b100221db48754656328391b878299c5a0bab443`

The PR bundle's entire 60-file diff was read. The source desk embeds that exact diff and 33 numbered excerpts. The accompanying policy record and the policy definition/tests already existed in the base; the artifact does not attribute their introduction to #131. `coverage.md` maps changed files to the opening decisions.

The PR and commits supplied no implementing-agent transcript. Reasons were sought in the PR body, its six commit subjects and empty bodies, the supplied architecture spec, and the worktree's policy record. Broad rationale for policy routing and test adapters is stated. Rationale for the selected enforcement technique, individual fixture changes, and the completion-error selection difference was not found. “Unexplained” means this bounded search found no specific rationale.

## What runs

The page executes `model.js`, a deterministic scenario generator, not symnav. Its event tape is driven by message choice, response delay, interruption placement, accepted-work duration, two test policy allowances, and output size/profile. Both revision traces are computed for the same input. It has no persistence or network calls.

`probe.mjs` executes the prepared worktrees' real compiled `LocalDaemonTransport` modules. The other side is a deliberately scripted Unix-domain socket peer, not WorkspaceDaemon. The probe creates and removes its own temporary socket directory; it does not launch a daemon, worker, navigation command or local fallback. It writes only `observations.json` in this experiment. Existing worktree build output was used without rebuilding or running the full symnav suite.

The first probe draft omitted the manifest's instance and request identifiers. That draft exercised malformed-manifest handling instead of the intended recovery path. The envelope was corrected against the protocol validator before the recorded observations and model comparisons were produced. Those invalid draft observations were discarded.

## Observed and modeled

| Boundary | Real client observation | Model representation |
| --- | --- | --- |
| Status vs ordinary ping | At 150 ms, the status client times out and the ordinary client responds, in both revisions | Same ping, selectable composition purpose, virtual deadline |
| Two recovery scopes | Both revisions send execute, execute, result-fetch, result-ack for an empty result | Four invented records make a partial receiver and offset 2 visible |
| Malformed completion after reattachment | Base returns the original `closed / accepted`; head returns the subsequent `corrupt / accepted` | A named preset shows the differing error selection |
| Clean EOF during fetch | One fetch followed by `corrupt / accepted`; head's resume limit of 2 does not cause a second fetch | The fetch allowance visibly has unused capacity on this path |
| Two pre-manifest closes | Base stops after two execute submissions; head with reattachment limit 2 reaches a third and completes | The outer counter spends a separate allowance per reattachment |
| Inline and result capacities | Derived from source, not exercised by the socket probes | One completion, grouped capture, separate client storage as records arrive |

## Losses stated in the UI

- Virtual time and animation speed are independent. Socket setup, scheduling, navigation and filesystem costs are not measured.
- At an exact response/deadline tie, the model reports a race instead of choosing a winner.
- A four-record completion, abbreviated identities and digests, and readable output descriptions replace real byte arrays. The envelope sketch is explicitly not sendable JSON. The probes use an empty result and offset 0.
- The two main actors are processes; the worker appears inside the daemon as a thread boundary. This PR leaves physical mechanism files in `apps/cli`.
- The scripted daemon retains the same accepted request identity across execute reattachment. The existing production daemon's duplicate-request attachment path is included as the `same-request` source excerpt. The probes themselves do not prove single execution by the full daemon.
- The output scene collapses capture, disk I/O, error-result framing and stream interleaving. Large runs group record arrows. It models one retained result; aggregate capacity, worker checks and control-frame caps are explained by the same opening output decision and the deeper policy/source views, not separately simulated.
- Production defaults stay unchanged in the illustrated cases. Non-default allowances and the miniature 2/4/8/12-byte snapshot are test-only composition experiments. The base stays at its local defaults for this comparison; it did have independent per-consumer overrides.
- The clean fetch-EOF observation is not generalized to every socket error or close sequence. Completion recovery and acknowledgement have other existing paths outside the selected scenarios.

## Checks

`node --test model.test.cjs` checks the selected model traces against the recorded actual-client observations, clock purpose/ties, identity and offset continuity, zero allowances, exact output thresholds, and termination/chronology across 144 fault/allowance/revision combinations. This validates the artifact's selected representations, not the PR's correctness.

`browser-check.js` is a Playwright-tool function taking a page. Its recorded result is `browser-check.json`. It checks the opening decisions, every primary source exit and return, form controls, stepping/play/pause/resume, revision comparison, source filtering, policy filtering, narrow-screen interaction and opening through `file://`. Screenshots are in `../screenshots/`.

No symnav source, branch, commit or worktree configuration was modified. No earlier experiment was read or reused. The shared project index, queue and orchestrator files belong to the orchestrator and were left alone.
