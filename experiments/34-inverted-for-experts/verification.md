# Verification record

This verifies the artifact and its source references. Symnav's test suites were **not run** by this experiment. Tests shown on the page are checked-in assertions, and the interactive views are illustrations.

## Evidence checks

- Pinned base: `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`.
- Pinned head: `b100221db48754656328391b878299c5a0bab443`.
- All 60 supplied diff paths map to visible choices: 1,298 added and 544 removed lines.
- 23 visible choices: 18 stated reasons, 5 unexplained decisions.
- 103 resolved references: 85 implementation/test excerpts and 18 rationale excerpts. Each excerpt matches the referenced source lines exactly.
- 122 embedded source snapshots, with SHA-256 hashes shown in the full-source viewer.
- The policy implementation, test factory, policy tests, and policy record are identical in base and head. They are identified as inherited context.
- 44 policy-record rows are reproduced from the checked-in document.
- Both Symnav worktrees returned an empty `git status --short` after the work.

## Browser checks

Tested in Chromium through Playwright using the local `file://` entry point.

- All 23 mechanism views opened; all 23 exact-source views opened. The 85 rendered implementation/test excerpts matched the embedded text.
- Source selection opened the full file, highlighted the selected lines, and scrolled to them. The expanded opening test excerpt was also checked after the final content rebuild.
- All 60 files appeared in the inventory. Diff/base/head switching worked, including diff hunk rendering.
- The 44 policy rows rendered. Owner-map base/head switching worked.
- Timeout controls selected the observer test, ordinary execution-status test, and explicitly hypothetical production scenario.
- The recovery stepper ended at six steps, two execute connections, and one fetch connection, matching the illustrated fixture.
- Two child retries displayed three attempts. A hypothetical 200 ms stop window split into 100 ms graceful time and 100 ms reserved time.
- Search, its keyboard shortcut, empty results, reset, and the five-unexplained filter worked.
- Browser Back returned from source to explanation; Next navigated to the next choice; Escape and the return button restored the evidence row and focus.
- No JavaScript page errors or external network requests were observed in the complete explanation/source traversal.
- Desktop checked at 1440 × 1000; mobile at 390 × 844. The mobile document width was 390 px. Long code remains inside its own horizontal scroll region.
- Fixed an active-button hover contrast issue and a mobile overflow caused by long policy names in a rationale quote. The final mobile overflow check returned equal 372 px client/scroll widths for the affected dialog.

Two early browser checks needed corrected selectors/waits: a heading existed on both the surface and in the dialog, and clicking the opening source card correctly opened source rather than the timing controls. One apparent persistent CSS failure was a same-document hash navigation retaining the previous stylesheet; a full reload verified the fix.

## Limits

No maintainer usability session, screen-reader session, Safari run, daemon execution trace, or full parity run was performed. File coverage is editorial mapping, not proof of semantic completeness. The error-provenance view is explicitly a reading of the two control flows. The retry view follows only the added fixture; it does not extrapolate arbitrary fetch-resume counts.
