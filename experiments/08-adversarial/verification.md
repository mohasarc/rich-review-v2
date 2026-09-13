# Verification and evidence limits

The page is an explanation of decisions and their evidence. These checks do not establish that either PR is correct.

## Reproduced observations

The current authoring attempt reran three investigations in fresh temporary copies of the tracked worktree sources. Dependencies and existing build output were linked from the supplied worktrees. Instrumentation and synthetic fixtures were applied only to the temporary copies. The [manifest](evidence/verified/manifest.json) records the four commit IDs, tracked-content digests, script exit codes and clean worktree status before and after.

| Investigation | Observation | Limit |
| --- | --- | --- |
| PR 131 spill entry | Four selected suites passed on each side: 113 base tests and 116 head tests. Fifteen existing cases entered the instrumented disk-spill path only on base: fourteen client cases and one aggregate-capacity spool case. | This measures entry to the instrumented spill functions, not complete branch coverage. Other disk fault tests remain. |
| PR 131 reattachment | With an accepted close followed by a truncated frame, both sides attempted execution twice. Base returned the first `closed` error; head returned the later `corrupt` error. Repeated close and successful fetch controls also ran. | A synthetic peer demonstrates the transport-visible difference. It does not measure frequency or a user-facing CLI-output difference. |
| PR 148 registry identity | After changing only a scratch startup lock's identity key, base still accepted `isStartupOwner` and `refreshStartupLease`; head rejected both. The owner-record read still returned a record on both sides. | This isolates predicate behavior. It does not establish whether the mismatched state occurs in ordinary use. |

Raw logs and observations are in [evidence/verified/](evidence/verified/). The passing probe tests record outcomes; passing is not a parity verdict. The browser's recovery selector displays those recorded outcomes. Its spill and routing controls are source-derived illustrations, explicitly labeled on the page, and do not execute symnav.

To reproduce the observations in this checkout, with the supplied dependencies and builds available:

```sh
python3 experiments/08-adversarial/tools/recheck.py
```

Earlier incomplete attempts left broader coverage and mutation explorations in `evidence/` and `tools/`. They are retained, but their measurements are not the basis of the page's claims. Only the selected scripts were reviewed and rerun through `recheck.py` for this artifact.

## Source and page checks

- Generated 14 decision records, 59 local source snapshots and a mapping of all 213 changed paths to records. The mapping is an orientation aid, not a claim that each changed line was executed.
- Checked the 60 HTML documents for duplicate IDs, missing local files and missing fragment targets. The README link was reserved for the final completion step. Included full diffs match the input bundle bytes.
- `node --check app.js` passed. The Python page generator completed successfully.
- Opened the page directly over `file://` in private Playwright browser contexts. At desktop 1440 × 1120 and mobile 390 × 844, the document had no horizontal overflow. This also held with all 101 disclosure elements open.
- Exercised the spill, recovery and routing selectors, return controls, direct links into closed disclosures, keyboard opening of native disclosures, and a full source link with its line anchor.
- Confirmed native disclosures and fallback return links work with JavaScript disabled. Observed no page JavaScript errors or external HTTP resources. Visually inspected the opening and expanded spill explanation; screenshots are in [screenshots/](screenshots/).
- Rechecked all four symnav worktrees: no tracked source changes. No full symnav CI run was performed for this page.

To regenerate the static artifact and source snapshots from the supplied inputs:

```sh
python3 experiments/08-adversarial/build_page.py
```

Viewing the finished page requires neither command, a server, nor network access.
