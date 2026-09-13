# Source audit notes

The reviewed delta is `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → `d07002357d3e9596bfaae910a1ac63b77981620b`. PR text describes intermediate ownership, so its paths and public surfaces must be interpreted at that PR's position in the stack.

All 26 PR bodies and commit subjects were read. Their 117 Decisions bullets are preserved verbatim in `content.json`; the page uses shorter choice labels and opens the recorded reason on demand. Local PR copies include their commit subjects and full SHAs. Reason labels describe the evidence found, not the quality of the decision.

The code audit concentrated on the boundaries used by the film: `WorkspaceSession`, revision and graph publication, the successful-refresh semantic-turn barrier, clear-before-release, CLI invocation routing, executor injection, `DaemonClient`, admission order, result-transfer offsets, accepted reattachment, policy propagation, idle lifetime, final package exports, and testing ownership. The diff, changed-file inventory, repository rules, architecture spec, policy record, and deferred-behavior spec supplied the surrounding context. The precomputed overview files contain headings with empty result bodies and were not used as semantic evidence.

## Additional choices

The map adds eleven choices beyond the PR Decisions sections. Four have a stated reason; seven are marked unexplained for the particular choice being described. These include exact test-budget selection, the loss of the built-CLI observation boundary for ten scenarios, the final removal of a completion-file wait, the PR-template rewrite, host-side policy recomputation, and separate publication across cache / graph / backend owners. The status is narrower than claiming no rationale exists anywhere: it means none was found in the inspected material for that specific choice.

The general testing-boundary rationale is stated in #149. The page separately marks the missing per-scenario removal rationale. The seven removed status scenarios and three removed stop scenarios appear in commit `9284116a4bb2be984054d9b3af010b31b61a90b2`; related final package tests are named without claiming equivalence. Three final adversarial-peer tests call `DaemonClient`. Process, controller and startup tests cover related internal mechanisms, with different observation boundaries.

The test-title scan is a search aid. It detects literal `it("…")` / `test("…")` titles, excludes generated and parameterized names, and reports 40 unmatched main titles across the repository. A title that disappears can have renamed or rewritten coverage. Neither the scan nor the explanation establishes test-suite completeness. No new skip/todo lines were found by the inspected patch search; this is not presented as a correctness result.

## Scope distinctions preserved in the artifact

- #148 stages package mechanisms while the CLI still runs its frozen app-local graph. #149 switches the active CLI and removes the copies.
- A package with no internal imports can dynamically load a supplied host module. Node-free public declarations do not mean browser execution or sandboxing.
- A backend index transaction is narrower than the complete TypeScript backend refresh sequence. The page's illustrative state model states this scope.
- Result fetch resumes after an awaited durable append and counts records. Accepted reattachment begins a fresh capture for the same request. Neither means new execution.
- The injected daemon snapshot configures process and worker machinery. The CLI executor separately calls `DaemonPolicy.currentSystem()` when it creates its own dependencies.
- The five-minute diagnostic-trace retention is separate from unacknowledged result and ledger retention. The latter changes remain deferred.
- Idle is armed at lifetime construction and reset at acceptance. Readiness-armed and completion-based idle changes are not delivered by this stack.
- Policy serialization and the temporary policy-testing subpath visible in earlier PRs are absent from the final public surface.

## Representation limits

The 90-second narration has 246 words. Its six diagrams are compressed ownership schematics, and the moving markers have illustrative timing. The A/B file and R7 request examples are explanatory models, not captured symnav executions. The full stopping layer includes the visible decision map, additional choices, ten named removed CLI scenarios, and eight deferred behaviors. The film alone provides orientation.

No earlier experiment was read, copied, or referenced. The abandoned v1 repository was not accessed. Both symnav worktrees remained clean at their supplied SHAs; no symnav build, test, branch mutation, commit, or push was performed.

The initial basic Python preview server could play the MP4 but did not support reliable byte-range seeking. The final `serve.py` handles ranges, and `video.html` provides an explicit video player. Browser playback and seeking to 84 seconds passed both through the range server and with direct file opening. Prefix, suffix and unsatisfiable range requests were checked. The interactive audio player also resumed correctly after seeking to the recovery chapter.
