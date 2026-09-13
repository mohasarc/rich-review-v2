# Observations for experiment 24

These are evidence observations, not a verdict on the PR.

## Source identity

- Base: a1e325a5ff979bdfa25babc5554621c8c0f20497
- Head: 64919bcbcf7fcc8202779b78c5f069b24662bb18
- Subject: PR #127 relative to PR #126, layer 4 of the supplied stack.
- The supplied diff reports 6 changed files, +391 / −67.
- The overview-before/after bundle files contain file headings and absent-file notices but no useful symbol output; the page uses actual source snapshots instead.

## Existing tests executed

Date: 13 September 2026, approximately 04:50 Europe/Istanbul.

From worktrees/pr-127-head/packages/core:

    pnpm exec vitest run src/backend/turn-scoped-cache-scope.test.ts

Observed: 1 file passed, 4 tests passed. Test execution 3 ms; reported duration 220 ms.

From worktrees/pr-127-head/packages/backend-typescript:

    pnpm exec vitest run src/typescript-backend/typescript-semantic-query-service.test.ts

Observed: 1 file passed, 11 tests passed. Test execution 769 ms; reported duration 1.33 s.

The existing installed dependencies/build outputs were used. These are focused test runs. No claim is made about a fresh install, a complete build, full-suite parity, lint, typecheck, CLI outputs, daemon timing, or production performance. Both test invocations printed Vite's CJS API deprecation notice.

## Assertion and change-surface audit

- The new core test file contains four cases.
- The service test file adds six cases.
- Starting at the original first service case, “shares one reference search across caller and reference projections,” the base and head file suffixes are byte-for-byte identical. This includes all five prior cases and their helpers.
- No existing test assertion was removed, replaced, or weakened in the supplied diff. Its test-file deletion is the replaced import line.
- Four production files account for the entire production delta: the new core scope, the core index export, the TypeScript semantic service, and the TypeScript backend.
- The retained project-graph implementation is context, not another changed subject. It already had an awaitable release operation.
- The pending/rejecting release test uses a controlled project-graph substitute. The retained release/rebuild test uses a mutable filesystem fixture.

## Artifact checks

The page is a local HTML/CSS/JavaScript artifact. Its illustrations do not run symnav.

Forty browser checks passed in Playwright Chromium: all 15 direct file deep links, every question footer, the sequential route, branch return and scroll restoration, native browser Back, reading-mode switching, illustrative scenarios, keyboard focus, and no document overflow at 320, 390, 768, 1024, or 1440 pixels. No uncaught browser errors were observed.

The first browser pass found a read-in-order hash navigation scroll issue. Handling native hash changes and removing duplicate scroll offsets fixed it. A focus check was also adjusted to wait for the scheduled focus update rather than asserting before the animation frame.

See [the browser results](../browser-checks.json) and [the browser check function](../verify-browser.js). Desktop overview, release, and mobile screenshots were inspected. Chromium was exercised; no Safari or screen-reader session was run.
