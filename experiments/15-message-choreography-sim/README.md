# message-choreography-sim

## Entry point

Open [index.html](index.html) directly. On this Mac:

```sh
open ~/projects/rich-review-v2/experiments/15-message-choreography-sim/index.html
```

No server, installation or internet connection is required. Click **Send the first ping**, then use **Send**, **Step**, **Pause**, the event tape, or the base/head controls. The page has three scenes: one-response timing, accepted-execution recovery, and output capacity.

## Kind

other: interactive sim

## Subjects

pr-131 — Route daemon thresholds through centralized policy.

The pr-127 PR body and file summary were inspected when choosing the subject. It is not explained by this artifact.

## Declared choices

- Role framing: The reader operates the client and observes a scripted daemon. A tour through concrete exchanges, with explicit decisions above the simulation.
- Box lenses: Static structure (existing `@symnav/daemon` policy and mechanisms still in `apps/cli`) plus runtime topology (client process, socket, daemon process, nested worker thread). Gold edges show the changed supply of policy values; the process boundary stays in place.
- Opening style: Picture first, followed by a complete opening inventory. A 150 ms ping is the first runnable example.
- Shape: Pyramid: eleven opening decision summaries → parameterized exchanges and mechanism details → exact source and recorded probes. The error-selection difference and test changes are present in the opening layer.
- Navigation: Linear page with exits into a dialog; source → Back returns to the mechanism. Each tape event is directly selectable. Closing detail preserves the current run. Both revisions can be inspected independently.
- Trust posture: Check the PR's account against the base and head. Mark recorded reasons as stated; identify the bounded search behind unexplained choices. Explain observations without issuing a correctness verdict.
- Persona: A teammate who knows symnav but not this daemon corner.
- Representations used: Process/module boxes, moving message envelopes, virtual time, independent recovery counters, record offsets, separate client/spool state, base/head outcomes, policy tables, exact source excerpts, and recorded real-client socket exchanges.
- Importance rule: Configuration ownership first, then timing and recovery boundaries. Unrequested behavior and changed test scope stay in the opening inventory rather than appearing as surprises in evidence.
- Inputs used (beyond bundle): Base/head source files; existing policy record and policy definition/tests; existing duplicate-request attachment code; prepared worktree build output for local Unix-socket probes. Bundle inputs used: `pr.json`, the entire `diff.patch`, `files.txt`, and contributor/architecture portions of `repo-rules.md`. Generated overview files were not used.
- Tech: Dependency-free HTML/CSS/JavaScript; Node for the probe and model checks; Python for bundling evidence; Playwright for browser checks. Harness: Codex.
- Built on earlier experiment(s): none. Earlier experiment contents were ignored; nothing was reused.

## What I tried

I chose #131 because its transport and policy consumers support the assigned two-actor angle directly. The first recovery story risked making independent fetch scope look newly introduced. Reading the base and running socket probes showed that a reattached execute already received its own fetch allowance. The artifact now shows that preserved behavior and the actual change to numeric inputs.

The same probes exposed a narrower before/after difference: after reattachment accepts, a malformed completion surfaces as `corrupt` in the head while the base returns the earlier `closed` error. A clean EOF during fetch also showed why a numeric allowance of two does not produce two fetches on that path. Both are explained with their limits, without supplying an invented reason.

The first probe draft had an incomplete manifest; its invalid observations were discarded after correcting the identity fields. Browser inspection also led to separating the client's storage state from the daemon's spool state. [Method notes](evidence/method-notes.md) record these boundaries and losses.

I kept startup, resource supervision and diagnostics in the opening map and source views. Putting every mechanism into one animated request would imply a causal sequence the source does not contain.

## What I would drop

The output scene is less distinctive than the two timing/recovery scenes. The eleven-card opening also takes substantial space: it preserves complete decision coverage but delays the main interaction. I would try a more compact visual inventory before adding another scene.

## What I would do next

Capture partial-record exchanges from a full daemon and feed those events into the same tape. Compare the current complete opening against a compact map that preserves the same decisions.

## Time spent

Approximately 40 minutes.

## Verification and evidence

Six model checks pass, including comparisons against twelve recorded real-client probe runs and a sweep of 144 fault/allowance/revision combinations. Browser checks passed for every primary source exit and return, controls, playback, revision comparison, source/policy filtering, 390 px interaction, and direct `file://` opening. No page JavaScript errors were observed.

The page runs an illustrative model. The probes execute the real compiled transport against a scripted socket peer, not a full daemon. The full symnav test suite was not run. Symnav sources and branches were untouched.

From this folder, with the prepared base/head worktree builds available:

```sh
node evidence/probe.mjs
python3 evidence/build-evidence.py
node --test model.test.cjs
```

The evidence desk embeds all 60 changed-file patches, 33 source excerpts, and 44 policy entries/recipes. Supporting files:

- [File-to-decision inventory](evidence/coverage.md)
- [Recorded socket observations](evidence/observations.json)
- [Model check output](evidence/model-test.txt)
- [Browser check results](evidence/browser-check.json) and [Playwright-tool check function](evidence/browser-check.js)
- [Simulation screenshot](screenshots/01-message.png), [opening](screenshots/02-opening.png), [mobile](screenshots/03-mobile.png)

Only this experiment folder was written. Shared index, queue, orchestrator files and earlier experiments were left to their owners. The temporary verification server was stopped; the artifact opens as a file.
