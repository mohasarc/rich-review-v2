# Auditor scopes

Slice names are questions, not answers. They come from the declared scopes of the pages under review (their README "Subjects" lines), stripped of claims.

## pr127

Subject #127 "Scope semantic caches to one turn" (6 files, +391/−67). Read the full diff (609 lines), PR body and commits. Register every decision. Slices: `lifetime` (how long semantic cache state lives; what scopes it), `handles` (reusable handles/entries, identity, reuse across turns), `release` (release/cleanup timing; whether callers wait for it), `inflight` (work or promises held by callers when a cache is cleared; what a late settlement may affect), `tests` (test changes: added/weakened/deleted/moved), `scope` (changes the body does not ask for).

## pr131

Subject #131 "Route daemon thresholds through centralized policy" (60 files, +1298/−544). Read every production hunk; read test/benchmark/fixture hunks enough to classify them. Register every decision; group same-shape relocations into one decision with an instance list (consumer, field, old source/value, new source/value) in `register.json` under that decision (`instances` array). Slices: `policy-shape` (sections, required vs optional, whether a consumer receives a whole section or a projection), `consumer-routing` (which consumer reads which field), `values` (numbers changed or preserved), `overrides` (per-method/constructor numeric overrides or escape hatches that remain or were removed), `delivery-transfer` (any delivery, result-fetch, or reattachment state touched by this PR; say explicitly if none), `tests-benchmarks`, `scope`.

## pr148a

Subject #148 "Own daemon mechanisms behind DaemonClient" (153 files, +14.6k/−815), structural side; sibling `pr148b` covers runtime mechanisms. Register all T1 decisions for the whole PR, T2 for the slices. Read PR body, all commits, files.txt, and every hunk changing package structure, exports, imports, package.json/tsconfig/build config, public declarations, test layout. For large added files decide new / moved / copied (compare with base tree via git), and whether the base copy remains live (who imports each copy at head). Slices: `facade` (DaemonClient public surface vs internal mechanisms), `copies` (relocation vs duplication; which copy is live at head; how many duplicated bodies), `package-graph` (package boundaries, import direction, what the CLI imports at head), `routing` (T1 only: who owns route selection), `tests` (moved/added/deleted/weakened; test-only seams), `scope`.

## pr148b

Subject #148 "Own daemon mechanisms behind DaemonClient", runtime side; sibling `pr148a` covers structure. Register T1/T2 decisions in: `routing` (how the client chooses a route; ordering; laziness; which probes run and when; the caller boundary), `transfer` (result transfer framing, interruption, resume offsets, identity checks, lifetime of transfer state), `delivery` (completion delivery, acknowledgement, reattachment), `control-idle` (control and idle timing, shutdown), `registry-election` (startup/registry election), `entry` (entry construction), `failure` (failure vocabulary, fallback). For each decision state whether the behavior is new in #148 or carried from base code (diff against the base counterpart): a reader must know what #148 changed versus relocated.

## stack-a

Subject: whole stack main → #149 (26 PRs, #123–#149) as one delta, structural side; sibling `stack-b` covers runtime slices. Register: (1) `stack-top`: T1 decisions of each of the 26 PRs, 1–3 per PR, from PR bodies/commits verified against that PR's own diff (`git -C ~/projects/symnav diff origin/<base-branch>...origin/<head-branch>`), plus stack-level decisions visible only across PRs (reversals, introduced-then-removed, staging-then-cutover). (2) T2 depth for `package-handoff`: what #148 stages and #149 cuts over; frozen/compatibility copies; physical path ownership vs concern ownership; what the CLI imports at #148 vs #149; what #149 deletes and whether tests were deleted or moved. (3) `naming`: domain words whose meaning or owner changes across the stack.

## stack-b

Subject: whole stack main → #149 as one delta, runtime side; sibling `stack-a` covers structure and per-PR top decisions. Register T1/T2 decisions at #149 versus main, attributing each to the PR that introduced it: `accepted-turn` (lifetime of an accepted request/turn: terminal publication, completion delivery, sampling or queue order, acknowledgement; client disconnect mid-turn), `admission-fallback` (when a request may run locally instead of in the daemon; admission rejection semantics; which failures permit fallback and which forbid it), `recovery` (after acceptance: result-transfer resume, reattachment to an identical in-flight request, replay; what state each path keeps or allocates fresh; retry counts/limits and their source), `failure-vocabulary` (failure kinds, who classifies), `workers` (worker generations/replacement), `policy-values` (timing/threshold values used by these paths and where they come from).
