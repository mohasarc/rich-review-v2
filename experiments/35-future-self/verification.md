# Artifact verification

This records checks on the explanatory page, not a correctness verdict on PR 148.

- `python3 build.py` resolves every curated source anchor and checks every quoted reason against its actual source wording. It generated 20 records and 239 pinned source pages.
- A local HTML/link scan covered the entry page plus all 239 source pages. No duplicate IDs, missing source files, or missing fragment targets were found. The experiment README was written after the initial scan; `verify.py` also checks that final link.
- All 153 changed-file records link to at least one decision. Git detects 37 mechanism test-file moves from the CLI daemon directory.
- The archived original patch is byte-identical to `git diff ba53c8e1662fd86d198b95321c90d9c9bef10184 20838f8dbf413e04767543eb2380d0d114da6c60`. SHA-256: `069ff010c04c6001232375c7c535e32810dcfe858b081e4470066ca5f1a16480`.
- `node --check app.js` passed.
- Chromium opened the page directly with `file://`. There were no page JavaScript errors. Desktop size: 1440 × 1120. Mobile size: 390 × 844. Neither the initial mobile page nor an expanded record caused horizontal document overflow.
- A return cue opened decision 07; its evidence link reached source line 181; the source page's return link reopened decision 07; closing the record restored the reading surface.
- Routing illustration checked with starting/different-version, disabled, warm/busy, unresponsive, and confirmed-exit scenarios. Each selected one decisive guard; the displayed route and read/observe/remove counts matched the source-derived table. These are hand-authored explanatory cases, not executions of the daemon.
- Lifetime illustration checked at navigation durations 1, 14, and 24: preserved shutdown times 18, 22, 32; hypothetical completion-based times 19, 32, 42. Units are explicitly invented; the actual lifetime code is available beside the illustration.
- File filtering found 6 navigation-worker changes, showed 0 for a nonexistent path, and restored all 153 when cleared.
- Enter on a focused native record summary opened the record on mobile. Screenshots were inspected for desktop, mobile, and an expanded routing record.
- The supplied base and head symnav worktrees had clean `git status --short` output after inspection. No symnav tests were run and no symnav source was changed.

Recheck the static artifact with `python3 verify.py` while the supplied worktree is available. Reading the page and its evidence does not require that worktree.
