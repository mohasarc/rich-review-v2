# Work record

2026-09-13, approximately 02:00–02:35 UTC. One Codex worker; no delegated agents.

- Read philosophy.md first, then the playbook (including the required sections). Inspected contributor guides before running tests. Never read the abandoned v1 directory. Ignored earlier experiments.
- Read both PR bodies and every supplied commit subject/body. Compared full bundle diffs with both base/head source trees. Followed removed assertions into replacement files and helpers. Consulted the architecture, policy, lifetime follow-up and selected daemon behavior clauses.
- Counted changed test **files** from patch headers, keeping rename records: #131 has 23; #148 has 63, including 37 moves and one wholly deleted test file. This count is an audit aid, not a measure of test strength.
- Promoted 21 decisions into a visible summary layer. Reasons and unexplained specifics appear with the decisions. Expanded readings separate the apparatus, asserted effects and remaining boundary; source pages preserve exact lines and commit IDs.
- Ran selected shipped witnesses with the existing dependencies and supplied builds: #131 208 passed in 10 files; #148 169 passed in 17 files. Ran the #148 package test typecheck. These were not full CI or CLI end-to-end runs. Commands and results are in logs/manifest.json and its linked logs.
- Reproduced #131’s added empty-result reattachment/fetch scenario against the prebuilt base and head transports over local sockets. Both produced two execute requests, one fetch and exit 0. This is a lab reproduction of the scenario, not a claim that the new test was literally run unchanged against the old source. The two variants use the same peer and assertion code, with their respective constructor APIs.
- Retained the passing probe as an explainer of witness reach, without turning it into a correctness verdict or a coverage score. Did not run non-default delivery-budget probes or mutation tests; those answer further questions.
- Browser verification initially could not navigate to file: because the browser tool blocks that protocol. Used a temporary local HTTP server for browser checks. The artifact itself uses ordinary relative CSS/JS and static HTML, with no fetch, external dependency, or storage; it can be opened directly from its folder.
- Verified map-to-reading navigation, exact line links, return links, close controls, recorded playback and reset, and inventory filters. Inspected opening, recovery and mobile boundary screenshots. Checked widths 390, 768 and 1440, including every decision expanded. Fixed a responsive diagram so all connecting arrows remain visible on narrow screens.
- The first screenshot call lacked its destination directory; created it and captured the screenshots. One browser automation snippet assumed a URL global in the tool runner; reran with plain URL-string handling. Neither was an application failure. Final application console and interaction checks had no errors.
- Checked every generated HTML local link/fragment. Source and diff archives make the page independent of GitHub and of the worktrees at viewing time. All four worktrees remained clean for tracked files; no symnav source, branch or commit was changed.

## Files

- index.html, style.css, app.js: offline page, read-only interactions.
- content.py: curated decisions and exact evidence needles.
- build_page.py: source/diff snapshots, line anchors and page generation.
- sources/: 180 source snapshots and provenance index.
- diffs/: 213 exact per-file diffs from the two bundles.
- raw/: copied PR metadata, complete diffs and file stats.
- inventory.json: every changed file and rename classification, not just the promoted witnesses.
- run_checks.py: reproducible selected existing test runs.
- probe-retry.mjs: before/after socket scenario reproduction.
- verify_artifact.py: local link/fragment checker for the page.
- logs/: runtime results, commands, browser verification and worktree status.
- screenshots/: three views for inspection and the experiment index.
