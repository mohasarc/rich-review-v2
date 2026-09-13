# Artifact validation

Validated on 2026-09-13. This record concerns the game and its source links, not symnav correctness.

- `node tools/verify-model.cjs`: 10 passing checks covering all five stations, both recovery scopes, failed refresh retention, synchronous cache release, guard order, FIFO delivery/sample barriers, generation fencing, durable offsets, independent recovery budgets, acknowledgement cleanup, corruption, and evidence inventory.
- `tools/browser-check.js`, executed through Playwright: 23 passing browser checks. Exact results are in [validation-browser.json](validation-browser.json).
- Every station completed through rendered controls; the transfer station also completed its separate reattachment scenario.
- Tile placement works by keyboard. Undo restores the previous position. Tab arrow navigation works. Evidence opens, Escape closes it, and focus returns to the evidence link.
- All 117 declared decisions, 20 supplementary observations, and 44 policy rows render before the workbench. All root anchors and evidence IDs resolve. All 46 local evidence pages return successfully.
- No document overflow at widths 320, 390, 768, and 1200 pixels. No JavaScript runtime exceptions in the final browser pass.
- Four screenshots are saved under `screenshots/`.

Issues found and fixed during validation: an extra policy header parsed as a value; the sixth cache's display name; an over-compressed distinction between worker readiness, resource recovery, and boundary-sample settlement; a navigation/keyboard selection race; mobile diagram overflow. A bulk evidence-link probe briefly exceeded the development server's practical connection burst; the probe now uses four concurrent reads and reports every result.

The browser tool rejects `file:` navigation, so browser validation used the included loopback HTTP server. The artifact uses classic local scripts and no runtime fetch, module loader, remote font, dependency installation, storage API, or external service. No symnav test suite was run and no symnav source file was modified.
