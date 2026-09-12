# unconstrained-a

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/01-unconstrained-a/index.html
```

No server, installation, network access or build is needed to read it. The two tabs are **26-PR stack** and **Inside #127**. Source links open an offline evidence viewer in another tab, at the cited line.

## Kind

page

With a reproducible observation probe and a data-building method.

## Subjects

- `pr-127`: its immediate base `a1e325a` → head `64919bc`.
- `stack`: `main` at `b6801eb` → #149 at `d070023`; all 26 supplied PRs treated as one delta.

## Declared choices

- Role framing: learner who traces ownership and then inspects the author's decisions.
- Box lenses: static package ownership; runtime process/thread topology; state lifetime within those processes.
- Opening style: a deliberately lossy workshop/scratch-paper analogy followed by an ownership diptych.
- Shape: two linked pyramids. The stack has a boundary map, six entrances, a complete surface of recovered decisions, then reasons and source. #127 has a smaller map and ten decision records, followed by a recorded run and the handle mechanism.
- Navigation: linear reading route; box → decision group; decision → modal reason → local source line. Escape/Close returns focus to the originating choice. Subject and section links work with browser history. The source shelf also allows independent browsing.
- Trust posture: compare intent with implementation and test boundaries. Preserve stated reasons verbatim; mark additional choices unexplained when no reason was found. No correctness verdict, approval, comment collection or scoring.
- Persona: a teammate who knows symnav but not the daemon's internals.
- Representations used: before/after package boxes, a process/thread request path, a six-handle cache diagram, an interactive replay of actual observations, a before/after behavior table, a grouped decision inventory, a full policy table, and line-addressed source snapshots.
- Importance rule: moved ownership first; asynchronous barriers and decisions without reasons next; test deletions, test budget changes and unrelated work receive the same decision-card treatment. No numeric ranking.
- Inputs used (beyond bundle): the four assigned worktrees' source and relevant tests; their contributor guides; the architecture, policy and follow-up plans; individual commit diffs for test budgets, synchronization and relative `--cwd`; existing compiled #127 backend/core modules; a new read-only observation probe; a focused run of the two affected #127 suites. The supplied overview files were inspected but contained no useful symbol output, so the artifact does not rely on them.
- Tech: plain HTML/CSS/JavaScript; Python standard library for extraction and snapshot packaging; Node for the probe; Playwright for browser verification. No CDN, application framework, raster assets, or runtime dependencies for reading.
- Built on earlier experiment(s): none. Other experiment folders and prior worker-attempt logs were ignored. This attempt used Codex and no delegated agents.

## What I tried

The organizing question was “who owns what survives?” It connects the whole-stack package move to the small cache-lifetime change without pretending that a socket, an accepted request and a worker all end together.

I considered a general lifetime simulation, then chose a saved execution trace instead: a toy implementation could silently turn an explanation into invented evidence. The probe imports both actual compiled backend versions and injects only a workspace-state double and a held cleanup promise. It records the same-value, failed-refresh and cleanup boundaries. The browser only replays those observations.

I extracted all 117 explicit PR decisions, then added 24 recovered choices/contracts and all 44 policy rows plus five absent deadlines. The extra records include the awaited release difference, API closures, startup/clock ownership, relative control-path normalization, removed composed CLI tests, relaxed test budgets and the unrelated PR-template edit. Initially the maps followed too much text; I moved them ahead of the dense decision sheets after viewing the page.

The important negative result is visible: a complete decision surface for a stack is long. Six pleasant summary cards cannot carry all of the defaults, test changes and unexplained choices. I kept the long sheet instead of hiding those facts in an attractive overview.

## What I would drop

The five muted “unprobed” cache cells in the recorded run are mostly a reminder of the six-handle shape; the other diagrams already supply that. The 26-PR grouping also partly repeats the six ownership groups. It helps provenance, but it costs reading space.

## What I would do next

Ask a fresh reader to explain the four lifetimes from the maps alone, then identify which decision-sheet items surprised them. Use those surprises to repair the pyramid, rather than adding another summary.

## Time spent

About 30 minutes for this completed attempt, including research, implementation, browser checks and documentation. Earlier harness logs already in the folder were preserved.

## Evidence and limits

The page contains **141 decision records**, **44 policy records**, **five intentional deadline absences**, and **94 local evidence documents**. Every decision record is present on the stack's default sheet; #127's ten records precede its mechanism and trace. All decisions carry `stated` or `unexplained`. Every record has a source trail. This is structural coverage of the recovered inventory, not a proof that a large diff contains no further implicit decision.

The strongest result is small and concrete: both compiled #127 versions clear caches before project cleanup settles. With asynchronous cleanup held open, base backend release fulfills while head remains pending; with cleanup rejection, only head's backend release rejects. The PR explicitly describes an awaited barrier but does not reconcile that observable difference with its preservation framing. The artifact presents the boundary for the human to assess; it does not diagnose a production failure.

The probes use actual compiled classes with explicit test doubles. They do not run a daemon, execute an entire navigation command, measure performance or prove all six semantic algorithms equivalent. Their module hashes and commit IDs are recorded. Object letters denote identity of empty definition-result arrays, not source revisions. The separate generic-scope probe is head-only because the base had no core scope.

Test migration was inspected as a decision. Three hostile-peer status scenarios reappear at a package integration boundary. Four other old CLI status scenarios, three built stop-command scenarios, and the dispatcher/reference-workspace integration are absent in their old composed form; related lower-level tests remain where noted. The title-matching file is only a search aid: it does not recognize parameterized titles or prove assertion equivalence. The artifact does not infer correctness or incorrectness from test counts.

The stack PR bodies report broad passing suites; those are author reports. This attempt ran only the two relevant #127 suites: **15 tests passed**. No full-stack parity run was performed. The snapshot source excerpts, full bundled diffs and original PR records remain available below the teaching layer.

## Reproduce or inspect

- [probe.mjs](probe.mjs): run `node probe.mjs` from this folder to record both existing compiled #127 worktrees again. It writes only this experiment's `evidence/probe.json` and `probe-data.js`.
- [build.py](build.py): run `python3 build.py` to rebuild the offline inventory and source shelf from the input bundles/worktrees. It writes only this experiment folder and does not build or alter symnav.
- [evidence/probe.json](evidence/probe.json): raw captured events, test-double scope, versions and compiled-module hashes.
- [evidence/focused-tests.txt](evidence/focused-tests.txt): actual focused Vitest output.
- [evidence/decision-inventory.json](evidence/decision-inventory.json): the full structured decision and policy inventory, including source pointers.
- [evidence/test-title-audit.json](evidence/test-title-audit.json): unmatched literal test-title search, with its limitations.
- [evidence/browser-checks.json](evidence/browser-checks.json): browser interaction and local-file checks.
- [evidence/worktree-baseline.json](evidence/worktree-baseline.json) and [evidence/worktree-final.json](evidence/worktree-final.json): identical HEADs and empty tracked/staged changes in all four assigned worktrees.

The checked-in experiment assets are enough to read the page elsewhere. Reproducing the data extraction and probe additionally needs the supplied workspace layout and prebuilt symnav modules.

## Pyramid audit

The decision IDs are the spine. A detail dialog elaborates an ID already visible on the parent sheet. The #127 run and mechanism explicitly point back to those same ten IDs. Policy values and absent deadlines are visible at the decision level, not first revealed in source. Additional work and removed test boundaries have full cards alongside architecture.

The remaining tension is that the first screen is an intuition, not the entire top layer. A reader who stops at the six entrances has the structure, but not every decision; the page explicitly identifies the decision sheet as the complete recovered top layer. I did not claim that six cards alone satisfy completeness.
