# adjacent-pair

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/30-adjacent-pair/index.html
```

It works directly from a file URL. No installation, build, network connection or running server is required.

## Kind

page

## Subjects

#146 **Own daemon completion delivery in one session** and #147 **Serialize accepted daemon execution in one session**, from the `stack` bundle. The preceding commit is used only as the pair's baseline; this is not an explanation of the entire stack.

## Declared choices

- Role framing: Teammate following a boundary through two consecutive PRs.
- Box lenses: Static module structure and lifecycle. A shared-owner rail makes ledger, queue and spool ownership explicit within those views.
- Opening style: A short intuition—“Split the owners. Keep the wait.”—followed by a three-stage ownership picture.
- Shape: An adjacent-pair map above six groups of decisions, a shared detail view, an interactive example and source receipts.
- Navigation: Read sections A–E in order; jump from a map box or decision into its explanation; move between explanations with previous/next; open source in a modal and return without losing the decision. Decision URLs use `#d/<id>`.
- Trust posture: Compare intent with the actual two diffs. Preserve the distinction between a documented reason, an observed dependency and a reason not found. Include clock substitutions, trace-predicate/event-order edits, type aliases and test access alongside the architectural decisions.
- Persona: A teammate familiar with symnav who does not know this part of the daemon.
- Representations used: An ownership map with three selectable revisions; contract directions; mechanism strips; a two-attachment delivery example with independently releasable gates; an evidence table; local source excerpts expandable to whole files.
- Importance rule: Put what crosses the split first. Give unexplained surrounding edits and test changes their own entries. The map plus all six decision groups are the complete top layer; the headline alone is an intuition, not the complete review.
- Inputs used (beyond bundle): Read-only `git show`, diff, stat, file lists and commit messages at the three exact commits below; the relevant source and tests; the existing queue implementation; the architecture functional spec at #147; the stack-head contributor guide. From the bundle, used #146/#147 PR bodies and commit metadata in `inputs/stack/pr.json`, plus relevant material in `repo-rules.md`. Did not use the stack-tip overview as a substitute for the pair's historical source. No implementation transcript or separate Phase 23/24 implementation plan was found in the inspected bundle and tracked plans.
- Tech: Plain HTML, CSS and JavaScript; system fonts; native dialog; embedded local source data. Python copies pinned git objects into this experiment. Playwright checks the artifact. No external dependencies or persistent state.
- Built on earlier experiment(s): none. Earlier experiment artifacts were ignored. The pre-existing brief, harness record and attempt logs in this assigned folder were preserved.

Assigned angle: **why is the split here; what crosses**. Harness for this completed attempt: Codex.

## What I tried

I first approached the pair as an execution-to-delivery handoff. Reading the source made that picture inadequate: delivery lends the writer and trace before completion, both sessions touch the authoritative ledger, and execution waits for a delivery promise. The page therefore treats the split as two coordinators with different lifetimes and a continuing synchronization dependency.

I used one three-stage map instead of two independent PR summaries. The intermediate stage matters: #146 has already established the surface that #147's extracted caller consumes, and #147 leaves delivery's production implementation unchanged while changing its tests for the ledger-entry metadata.

The key interactive example allows either attachment to finish first, then requires a resource sample before B starts. It also permits the latest send to fail and distinguishes stream settlement from acknowledgement. I kept it explicitly illustrative rather than claiming a trace of real daemon execution. A single detail view keeps nineteen decisions from becoming nineteen expanded essays.

During verification I corrected an out-of-range source citation and removed an unsupported registry-cleanup step from the shutdown explanation. The source supports server close at that point. The browser harness could not dynamically import Node's filesystem API, so its returned report was saved by the orchestration tools instead. No replacement artifact was needed.

## What I would drop

Some of the three-cell mechanism strips, particularly the type-alias and private-test-access entries, repeat what their short explanation already carries. The ownership map and delivery gates do more explanatory work. The full process-test snapshots are useful evidence but much larger than the excerpts most readers will open.

## What I would do next

Replace the illustrative gates with captured events from the exact historical modules, including the reverse attachment order. Ask a fresh reader to explain which waits remain across the split before opening the source.

## Time spent

About 25 minutes of active Codex work. This excludes the earlier attempts recorded by the orchestrator.

## Evidence and limits

| Position | Commit |
| --- | --- |
| Before #146 | `b8e8b7b85fe0e5fd0cb5784895ee090be015afa1` |
| #146 head | `f79ba36278c77c41ca887aa4efc24fd0781e4cec` |
| #147 head | `ba53c8e1662fd86d198b95321c90d9c9bef10184` |

The [source manifest](evidence/manifest.json) records 22 local source records with paths, revisions and SHA-256 digests. Raw code/spec copies were checked byte for byte against their pinned git objects. [collect-evidence.py](collect-evidence.py) recreates the snapshots using read-only git operations. [knowledge.js](knowledge.js) contains nineteen decision entries and 81 source citations; [sources.js](sources.js) makes those citations available offline.

“Stated” means a reason exists in the inspected inputs. For preserved transfer/failure/lifecycle behavior, that reason is the architecture spec's explicit preservation requirement; the detail view identifies it. “Unexplained” is scoped to the inspected inputs. In particular, the author states the extraction order and the two ownership boundaries, but does not compare two PRs with combining or reversing them. The source establishes how this actual order works, not that it was necessary.

The delivery example assumes two attachments are subscribed before request A completes, a present workspace and successful resource sampling. Buttons settle modeled send promises. A later fetch does not retarget a promise execution already captured. Workspace deletion, acknowledgement grace, cleanup failure, trace expiry and worker failures are explained separately with source evidence.

The two PR diffs were inspected for deleted tests and changed expectations. No deleted test case or weakened behavioral expectation was found. The ledger's internal shape expectations move with the fields; an additional post-acknowledgement assertion preserves the acceptance metadata. Test harness casts follow private state into the new sessions, and that choice is surfaced separately. The #147 session-order test uses resolved stubs; the #146 process delivery test uses deferred send gates.

The experiment does **not** run symnav tests or validate the PRs' correctness. Full-suite and mutation results in the PR bodies are author-reported. No symnav branch or worktree file was modified; stack-head remained clean.

## Artifact verification

[verification.json](verification.json) records 23 browser checks and a subsequent source-integrity check. They cover all three ownership stages, all decision deep links, valid citation ranges, source expansion and return, both attachment release orders, send failure, resource gating, acknowledgement independence, reset, a 390 px mobile layout and direct `file://` opening. No JavaScript page errors occurred. The final content edits were reloaded and checked in the browser.

[verify-page.js](verify-page.js) is the Playwright callback used for these checks. It expects the optional local test server on port 30330, then also verifies direct file opening. The test server was stopped after verification. Screenshots are in [screenshots/](screenshots/).

The artifact collects no verdicts, comments or other stored reader input. Its only state is the current view and the disposable example.
