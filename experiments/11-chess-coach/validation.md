# Artifact validation

Checked on 2026-09-13, using the local base and head named below. This records checks of the explanation artifact, not a correctness review of symnav.

- Base: `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`.
- Head: `b100221db48754656328391b878299c5a0bab443`.
- The supplied diff is byte-for-byte equal to `git diff --no-ext-diff <base> <head>`: 60 changed files, +1298 / −544.
- All 66 copied source paths match the recorded SHA-256 hashes of their base and head files. Six are supporting files already present before this PR.
- The builder resolved all 80 excerpt anchors in the checked-out sources. Every changed file is linked to at least one of the 22 decision groups.
- An HTML parser checked 70 generated pages and 1,003 local links, including fragment IDs. No missing targets or duplicate IDs were found. The README link was deferred until the final README write.
- `node --check app.js` and Python compilation of `build.py` and `content.py` passed.
- Playwright opened `index.html` using `file://`. No HTTP requests or page errors were observed.
- At 1440 px and 390 px viewport widths, the document width equals the viewport width. A small mobile variation-card overflow was corrected with grid min-width and wrapping rules; a second check found no overflowing decision, variation, analysis or model panels.
- Base/played ownership switching changes the diagram and pressed-button state.
- A move-sheet link opens its analysis. Its return link lands on the same move. A direct `#analysis-08` URL opens that panel. Previous/next links are included in the static fragment check.
- Expand all opens 22 analysis panels; collapse all closes all 22.
- Following an excerpt into a source page opens the correct base/head disclosure and highlights the referenced line. Browser back returns to the originating analysis hash.
- At an illustrative reply delay of 150 ms, the status-observer lane reaches its 100 ms limit before the reply; the ordinary and hypothetical 250 ms lanes show the reply before the limit.
- At an illustrative output size of 64 KiB, the old zero-inline setup spills and the head test adapter stays inline. At 64 KiB + 1 byte, both spill. These are model results from the displayed source condition, not runtime measurements.
- Desktop and mobile screenshots are in `screenshots/`.
- Both symnav worktrees had no tracked modifications when checked. No symnav build or test suite was run for this page; source snapshots and checked-in test changes are the evidence.

## Evidence limits

The author's PR body supplies four explicit decision rationales. The broader policy record supplies reasons for the inherited thresholds. Neither file provides a decision-by-decision account of the fixture substitutions, error-selection change, retained helper seams or removed tests. Those are marked unexplained at the complete decision layer. No implementing-agent transcript was supplied or used.

The policy test table already exists in the base. The deleted app suite has a 256 MiB example; the central table has a 1-byte example in that position. The page describes that evidence change without declaring the PR correct or incorrect.

The page does not multiply the numeric fetch-resume budget into an invented number of guaranteed connections. It shows the actual original-socket check and the single-connection fetch path, and scopes the new checked-in test to the one fetch it performs after reattachment.
