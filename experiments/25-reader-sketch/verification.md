# Verification record

2026-09-13, approximately 01:54–01:58 UTC. These checks concern the notebook and its source fidelity, not symnav correctness.

- Chromium / Playwright: all 68 assertions in `verify-browser.js` passed. The harness exercises drawing with pointer input; keyboard movement, resizing, and arrow creation; erase; undo/redo; undo after clear; independent sheet state; reference revision switching; every decision dialog and excerpt; all seven atlas sections; custom-label escaping; reload clearing; and direct evidence navigation.
- Opened `index.html` through `file://` in an offline browser context. Drawing and comparison worked without a server or network.
- Checked document widths of 1440, 768, and 390 pixels. No horizontal document overflow. On narrow screens the reference map scrolls inside its own container.
- Checked every reference-map box label in all three sheets and both revisions against its containing rectangle. No text exceeded a box.
- Screenshot inspection caught opaque unlabeled drawing boxes obscuring existing labels. They now have no fill. A pointer check confirmed a reader can still select and move a labeled box inside a boundary drawn later. Label wrapping was also corrected and checked against the box geometry. The full interaction harness passed again after these fixes.
- All 43 generated excerpts match their source files and recorded line ranges exactly. The generator checks the worktree SHAs before writing.
- `DaemonPolicy`, its tests, and the policy record are byte-identical between the two revisions. The notebook treats them as context already present in the base.
- All 60 changed-file diffs are included. Every evidence-book fragment link resolves. `coverage.json` provides file-to-decision navigation, not a completeness score or a computed call graph.
- JavaScript syntax checks passed for `app.js`, `content.js`, and `evidence-data.js`. No JavaScript errors occurred during the tested flows.
- Both symnav worktrees reported clean `git status --short` before and after the work. No symnav builds or tests were run, and no symnav files were modified.

The initially missing favicon produced one HTTP 404 during the first inspection. A self-contained SVG favicon fixed it. A browser-inspection call also used `innerText` on SVG and failed; later inspection uses `textContent`. Neither was a symnav result.

The screenshots contain a synthetic example drawn by the builder through the page controls. It is not a captured reviewer response, and it is not preloaded into the artifact. Opening the page starts with blank paper.

`verify-browser.js` is an async function accepting a Playwright `page`. It was executed with the available browser tool while a temporary Python server served this folder on port 8725. That temporary server was stopped after verification. A browser runner can load the function to repeat the interaction checks; the disk-opening check uses this workspace’s absolute path.
