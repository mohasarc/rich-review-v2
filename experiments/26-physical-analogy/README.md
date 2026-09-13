# physical-analogy

## Entry point

Open [index.html](index.html), or on this Mac:

```sh
open /Users/moyaseen/projects/rich-review-v2/experiments/26-physical-analogy/index.html
```

The folder is standalone. No install, build, server, network, or external fonts are required. Keep `style.css`, `page.js`, `sources.js`, and `evidence/` alongside the page.

## Kind

page

## Subjects

pr-127 — Scope semantic caches to one turn. No additional PR subjects.

Base `a1e325a5ff979bdfa25babc5554621c8c0f20497` → head `64919bcbcf7fcc8202779b78c5f069b24662bb18`.

## Declared choices

- Role framing: a clerk explains a six-drawer sorting cabinet, then opens it to reveal the implementation.
- Assigned angle: post office, deliberately lo-fi, with the physical analogy and illustrative replays marked lossy where they appear.
- Box lenses: code ownership across the TypeScript/core package boundary; runtime instance ownership and cache/resource lifetime. Core supplies the implementation; the service still owns its own scope instance.
- Opening style: physical before/after diptych. Six individual clearing actions become one shared clearing mechanism; the release return path gains a wait.
- Shape: pyramid. An opening picture plus eight visible decision cards is the complete overview. Mechanism sections refine those same eight subjects. Exact source excerpts form the evidence layer.
- Navigation: linear reading, links from each overview decision, direct links from each pictured drawer to its selected detail, five event replays, local source dialogs, return links, and a complete source explorer. Closing a dialog restores focus to its trigger.
- Trust posture: explain the mechanism and preserve the distinction between recorded rationale, unexplained choices, illustrative events, and executed tests. No correctness verdict or review collection.
- Persona: a teammate who knows the repository but not this corner.
- Representations used: cabinet drawing in HTML/CSS; package and instance diagrams; six selectable drawer descriptions; lookup and lifecycle flows; before/after event replays; contract tables; exact numbered source excerpts.
- Importance rule: surface the ownership move, preserved lookup semantics, and changed release barrier before expanding implementation detail. The unexplained scope/API choices and test preservation remain visible at the same overview depth.
- Inputs used (beyond bundle): both supplied worktrees; the architecture spec's ownership clauses; unchanged core project-graph release and concrete TypeScript project cleanup; the six commit messages; focused Vitest execution; working-tree status checks. From the bundle, used `pr.json`, `diff.patch`, `files.txt`, and contributor/spec material. Did not use the overview files or `stack.md`.
- Tech: vanilla HTML, CSS, and JavaScript; Python standard-library evidence copier. Browser validation used Playwright. Classic local scripts avoid file-protocol fetch/module requirements.
- Built on earlier experiment(s): none. Earlier experiment folders were ignored; no page, method, or component was reused.
- Harness: Codex.

## What I tried

Considered plumbing and kitchen metaphors, but disposal and washing suggest that clearing destroys the underlying work. Chose a sorting cabinet with claim tickets instead. A caller can hold an old ticket outside the cabinet after the drawer has been emptied.

The cabinet alone could not explain release completion, so I added a small before/after rehearsal with explicit backend and project-graph states. It covers successful refresh, failed refresh, pending release followed by success or failure, and an old promise settling after a new turn. These are authored illustrations, not executions of symnav.

No built approach was abandoned. During validation, corrected a narrow-screen cabinet overflow, a before-release evidence range, file statistics, mobile text spacing, and diagram links that initially jumped to the drawer section without selecting the corresponding drawer.

## What I would drop

The successful-refresh replay is the first candidate: both versions behave alike, and the static lifecycle diagram already explains it. The failed-refresh and release replays earn more space. The postal stamp is decoration rather than explanation.

## What I would do next

Have a teammate explain the change from the overview alone, especially whether clearing cancels old work or locks out new queries. Shorten the overview only if those limits and the API choice survive that retelling.

## Time spent

About 25 minutes, including source inspection, construction, focused test execution, and browser validation.

## Validation and evidence limits

- The two changed test files ran at the head revision: **15 tests passed** (11 service tests, 4 core tests). [Raw report](evidence/focused-tests.json). This is a focused run, not a full-suite or end-to-end daemon claim.
- Browser checks exercised every drawer, all five replays in both directions, immediate clearing and pending/rejected release states, source dialogs, Escape/focus return, keyboard drawer selection, and direct overview jumps. No runtime JavaScript errors were observed. Layout checked at 320, 390, 768, and 1280 pixels; source dialogs also checked at mobile width.
- All embedded excerpt ranges and local source targets were checked. The complete source explorer was opened at its requested line anchor. [Screenshots](screenshots/) record the opening, release rehearsal, mobile layout, and complete overview.
- Automated browsing used a temporary local HTTP server because the browser tool blocks `file:` navigation. That server was stopped. The artifact itself uses local styles and classic scripts and has no fetch calls, remote dependencies, storage APIs, forms, verdict controls, or comment collection.
- Both symnav worktrees remained clean in the final status check. No symnav source, branch, commit, or remote was changed.

Rationale labels are bounded by the supplied PR body, six commit messages (all bodies empty), and inspected architecture-plan clauses. The reusable scope's omitted cancellation/locking/turn-token facilities and the exact public API/file-list narrowing have no separate reason in those materials. They are marked **unexplained**, not given invented motivations. The file-list API change is disclosed by the PR and is not labeled unrequested. The diff adds ten tests and preserves the previous five service tests without weakened assertions.

The analogy deliberately does not model actual mail delivery, TypeScript scheduling, all refresh side effects, or cancellation. Its pending graph is a controlled scenario corresponding to the new test double; the concrete TypeScript cleanup remains synchronous. Cached entry identity is distinguished from fresh reference/position projections and async wrapper identity.

`build-evidence.py` can regenerate the local source copies from the two supplied worktrees and bundle. It is not needed to open the artifact. [sources.js](sources.js) and [the source explorer](evidence/sources.html) embed the six changed files at their available revisions plus the relevant plan and graph context. [The exact diff](evidence/diff.patch) and [PR bundle](evidence/pr.json) are also included.
