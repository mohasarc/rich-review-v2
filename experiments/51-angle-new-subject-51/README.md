# angle-new-subject-51

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/51-angle-new-subject-51/index.html
```

An offline page. No install, server or network is needed. All nine fronts, predictions, examples and source disclosures remain readable without JavaScript; JavaScript adds checkpoint selection and exact return positions.

## Kind

page

## Subjects

stack — all 26 PRs, main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` to #149 tip `d07002357d3e9596bfaae910a1ac63b77981620b`. Individual PR records and a few intermediate snapshots explain staging within this same subject.

## Declared choices

- Role framing: Learner. Predict one result, step through a small example, inspect the same decision in source.
- Box lenses: Static package ownership and runtime/object lifetimes. The opening distinguishes package movement from the retained CLI-process → daemon-process → worker-thread topology. Each episode then names the state owner and moved boundary.
- Opening style: Three short lifetime intuitions—workspace, accepted request, completion—followed by a runtime map. The intuition and simplified diagrams are marked where they appear.
- Shape: Nine linked small pyramids: host handoff; workspace publication; semantic turns; policy/admission; connection mechanics; transfer recovery; accepted execution/generations; delivery/ACK; final physical ownership. All nine fronts together are the complete overview. The introductory map is explicitly orientation.
- Navigation: Continuous page, a nine-door map, front-to-example exits, prediction disclosures, cross-boundary links, exact scroll/focus returns and line-addressable local source pages. No responses or comments are stored.
- Trust posture: Reconcile the stated preservation promise with actual source boundaries, while keeping disclosure and rationale separate. Surface test stimulus changes, assertion removals, intermediate staging and changes outside a PR’s named purpose. No correctness verdict or inferred author motive.
- Persona: A teammate familiar with symnav but unfamiliar with daemon internals.
- Representations used: Ownership diptychs; runtime topology; nine checkpoint examples; paired main/tip recorded tables; record-offset and queue-gate states; project-owner comparison; predict/reveal prompts; policy table; linked original PR decisions; numbered source excerpts and full source files with net diffs.
- Importance rule: Changed ownership and different lifetimes first; qualifications that change a prediction stay on the same front. Test and unexplained decisions receive the same front visibility. The 117 PR decision bullets map to 59 front consequence rows, rather than becoming a second independent overview. Counts and parent links are an audit aid, not a proof that every implicit choice was found.
- Inputs used (beyond bundle): Read philosophy first and the required playbook sections (also the inspiration menus). Used the supplied stack PR/commit record and file inventory; inspected the overview placeholders but did not use them as semantic evidence. Generated a copy-aware main→tip diff from pinned git objects, inspected selected production/test changes and all changed paths/test-title removals, read the relevant main/tip sources, contributor guide, architecture/policy/follow-up plans, and historical #129/#148 test/retirement context. Ran the controlled source probes described below. Did not read the failed v1 or browse external sources.
- Tech: Native HTML/CSS/JavaScript; Python standard-library generator and verifier; optional Node probes through the prepared worktree’s tsx loader. The probes import real TypeScript source modules; transitive package imports use the prepared workspace dependencies/builds. The shipped artifact contains frozen observations and source and executes no symnav code in the browser. Harness: Codex; no delegated agents.
- Built on earlier experiment(s): Read 04-textbook-chapter, 17-executable-before-after and 40-best-of-synthesis (handoffs and selected page/code content). Reused their prediction, controlled-completion and progressive-depth ideas. Read 47-critique-refresh-40 and 48-fresh-reader-refresh-40 for source/rationale corrections and warnings about surprise on descent. No predecessor implementation or recording was copied. Relevant claims were checked against the pinned source; this experiment’s recordings are new.

## What I tried

Scaled the small-change worked-example pattern by grouping the stack around nine questions a reader can answer independently. Kept source-cache eviction distinct from prepared-index retention; kept semantic reset distinct from backend release completion; kept result fetch distinct from execute reattachment; kept stream completion distinct from ordinary ACK and physical cleanup.

Rejected a second visible inventory of all 117 original PR bullets. Their exact text instead sits beneath the corresponding fronts, with explicit parent links. This keeps author reasons available without making PR chronology the primary explanation. The nine fronts still contain substantial text: the full stack did not become a one-screen change.

The source pass corrected a draft that called existing SHA-256 request hashing new. Only its commandName/request envelope changes. It also separated that request fingerprint from #148’s unrelated compatibility-source digest. A later pass brought #129’s synchronization/oracle test edits onto the host front and moved cross-episode rationale parents onto their own local fronts. No complete approach was abandoned.

The initial ACK probe omitted an observer method required by the real delivery session; fixed the fake collaborator and reran. The browser runner did not expose Node dynamic-import/require APIs, so the check returns its report and the orchestration saves it. These were harness failures, not symnav findings.

The recordings in [evidence/recordings.json](evidence/recordings.json), generated by [probe.mjs](probe.mjs), contain:

| Probe | Real subject code | Controlled part / limit |
| --- | --- | --- |
| Selection byte eviction, main vs tip | Both WorkspaceSourceCache implementations | Tiny fake filesystem; counts underlying reads, no real disk |
| Prepared-state overlay and rollback | Tip RevisionedBackendState | Tiny language preparation adapter; no ts-morph transaction claim |
| Last configured primary owner | Tip ProjectGraph | Two injected configurations sharing one file |
| Held release, main vs tip | Both TypeScriptBackend implementations and their services | Asynchronous project-release gate; actual TypeScript project cleanup is synchronous |
| Cached undefined and handle reuse | Tip TurnScopedCacheScope | Direct factory inputs; no semantic result parity claim |
| Policy and admission | Tip policy codec/factory and admission guards | 8-GiB memory input and explicit contexts; no process launch |
| Partial frame | Tip DaemonWireCodec | Fragmented in-memory encoded object; no sockets |
| Durable cursor | Tip DaemonResultTransferReceiver | Held append and controlled manifest; no digest finish or disk durability claim |
| Duplicate acceptance | Tip AcceptedRequestLedger | Fixed clock and request |
| FIFO completion gates | Tip AcceptedExecutionSession + WorkspaceRequestQueue + ledger | Immediate fake worker, independent held delivery/sample ports; no real worker or ACK exchange |
| Cleanup failure with successful ACK | Tip DaemonDeliverySession + ledger | Spool cleanup throws; diagnostics/observer are controlled ports |
| Command-looking target | Tip InvocationWorkspaceSelector | `refs def`, help and lifecycle argv; no full CLI execution |

Everything else is explicitly a simplified source trace, including real socket recovery, worker-generation transitions and package-cutover diagrams. This is not a full-stack integration run, benchmark or CI-parity result.

Validation: [verification.json](verification.json) checks local destinations/fragments, 68 source hashes against pinned git objects, the 26-PR/117-decision mapping, selected recording invariants and clean symnav worktree status. [browser-verification.json](browser-verification.json) records 34 checkpoint controls, all 59 exact front return paths, 320/390/768/1440-pixel layouts with all disclosures open, no page errors or external requests, no-JavaScript reading, source fragments and a direct file opening. Four [screenshots](screenshots/01-opening.png) show the opening and selected examples. These checks do not measure reader comprehension.

Rebuild from the frozen evidence, from this folder:

```sh
python3 build.py
python3 verify.py
```

`python3 build.py --capture` additionally reads the original prepared worktrees’ pinned git objects. To rerun the probes, from the repository root:

```sh
node --import ./worktrees/stack-head/apps/cli/node_modules/tsx/dist/loader.mjs experiments/51-angle-new-subject-51/probe.mjs
```

[browser-check.js](browser-check.js) is a Playwright-tool function, not a standalone Node script. It expects the artifact served temporarily on `127.0.0.1:5151`; the validation server has been stopped. The artifact itself opens directly from disk.

## What I would drop

The repeated before/after box rows earn less in the transport and final-ownership episodes than the concrete cursor and gate examples. Some could be replaced with a single changed edge. The full policy table belongs behind its disclosure; requiring it in the reading route would make this another long inventory.

## What I would do next

Give an unfamiliar maintainer only the nine fronts, then ask them to predict selection retention, a duplicate accepted request and a held cleanup. Record which first descent changes their account, rather than treating interface checks as evidence that the page taught them.

## Time spent

About 35 minutes, including source reading, new controlled probes, page construction, correction and browser checks.
