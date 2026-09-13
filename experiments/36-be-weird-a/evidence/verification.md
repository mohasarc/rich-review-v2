# Verification record

## Measurement and source

- Both supplied worktrees built successfully with `pnpm exec tsc --build`. Their logs are `build-base.log` and `build-head.log` (successful incremental builds produced no text).
- `node scripts/capture.mjs` completed against the actual compiled classes in both builds. Its summary is in `capture.log`; the full observations are in `observations.json`.
- All 18 frozen worktree source records match their SHA-256 hashes and the inspected working files. The complete six-file diff has no removed test case or assertion lines. See `source-checks.json`; the manual decision mapping is `decision-coverage.md`.
- `node --check app.js` completed successfully.
- Both symnav worktrees reported no tracked or untracked source changes after the work. No symnav branch was modified, committed, pushed, or rebased.

## Existing focused tests

From `worktrees/pr-127-head`:

```sh
pnpm exec vitest run packages/core/src/backend/turn-scoped-cache-scope.test.ts packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts --maxWorkers=1 --minWorkers=1
```

15 tests passed in 2 files. See `tests-head.log`.

From `worktrees/pr-127-base`:

```sh
pnpm exec vitest run packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts --maxWorkers=1 --minWorkers=1
```

5 tests passed in 1 file. See `tests-base.log`.

These runs do not constitute full symnav CI or establish that the design choices are right. No test expectation was edited.

## Browser

Opened the actual `file://` entry point in a fresh, isolated Playwright browser context. No local web server was needed. The checks exercised:

- Stored-value and service-return lenses; the same reference pair changes from shared underlying cache identity to distinct service-return identity.
- Single-store magnification, arrow-key pixel selection, and live readout.
- High-level card → expanded detail, source modal, correct highlighted synchronous-cleanup evidence, and Escape to close.
- All twelve details opening together.
- All source buttons resolving, source ranges staying within their files, and all page anchors resolving.
- No page JavaScript errors.
- No horizontal overflow at desktop width or, with all details open, 1024, 768, 390, and 320 pixels. The first 320-pixel run found unbreakable code tokens in three detail tables. Code wrapping was added and 320/390 were rechecked successfully.

Machine-readable results are in `browser-checks.json`. Screenshots show the contact sheet, the full default page, and a mobile position-return view. Browser contexts were closed after the checks.
