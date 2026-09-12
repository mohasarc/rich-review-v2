# Artifact checks

This records checks of the explanation and its presentation, not a correctness verdict on PR 148.

- Read the philosophy before the playbook. Read the complete playbook, applying the assigned worker scope.
- Compared worktree revisions `ba53c8e1662fd86d198b95321c90d9c9bef10184` and `20838f8dbf413e04767543eb2380d0d114da6c60`.
- Recomputed the changed-path inventory: 153 paths. Git rename detection identifies 37 moved mechanism test files. Copy detection additionally identifies 37 package production sources with base CLI origins; similarity is used only as a reading aid.
- Recomputed the 38-file compatibility digest: `d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e`, matching the source meta-test. This checks snapshot identity, not behavior.
- Read normalized mechanism and test deltas against the base sources. Import declarations and `WorkspaceDaemon` naming are normalized in those auxiliary reports, so their limitations are labeled in the page.
- Checked every editorial source anchor against the actual source; all 24 decisions have source excerpts. The standalone HTML contains 269 source snapshots, including supporting files and base/origin versions.
- Every one of the 153 changed paths has at least one link to a declared decision. Links are editorial categories, not an automated completeness proof.
- Rebuilt the daemon package with `pnpm --filter @symnav/daemon build`; the build completed.
- Recorded 32 calls through the built public facade, runtime and routing guards using inert synthetic ports. No real daemon, worker, socket or persistent registry was started by the recorder.
- Checked the specific explanatory claims about a starting/old-version record, old ready record, uncertain submission, authenticated safe rejection, malformed output disposal, missing output, disabled routing and a warm-up trigger that never resolves.
- Opened the generated artifact via `file://` in Chromium. All 24 decisions rendered with evidence. Tested source drill-down and return, sequential next-choice navigation, Escape and focus restoration, base/head map changes, source/runtime lens changes, and the explicitly illustrative package-caller path.
- Exercised trace selection, start-over, step and final-result controls. A starting old-version record showed two guards, one read, no observation and no trigger. An uncertain submitted request showed warm mode, exit 1 and no local executor.
- Exercised file search, source opening, and the narrower worker-test category. All 153 rows render when unfiltered.
- Checked at 1440×1000 and 390×844. No document horizontal overflow; the mobile detail dialog stayed within its viewport. Wide diagrams/tables deliberately scroll inside their containers. No page errors were observed during these checks.
- Both symnav worktrees reported clean `git status --short` at the final source check. No symnav source edit or branch operation was performed. An initial output-directory command briefly created empty directories in the base worktree; those empty directories were immediately removed before any file was written there.

The overview input files contain only file headings and absent-file markers, without symbol output. Direct source reads replaced that missing input. No earlier experiment or the forbidden v1 project was read.

The standalone page is about 3.3 MB. It loads no external scripts, fonts, services or images. Its controls alter only the current view; there is no verdict or annotation persistence.

The original symnav source tests were inspected, not run as a full suite. The recordings do not test real transport, disk capture, process launch, workers, lifecycle control, platform cleanup, or local navigation semantics. The page labels that boundary before the trace player.
