# question-driven-nav

## Entry point

Open [index.html](index.html), or on this Mac:

    open ~/projects/rich-review-v2/experiments/24-question-driven-nav/index.html

No installation, server, or network is needed. JavaScript is required. All source evidence is captured locally.

Choose a question under an answer. “Return to my question” restores the previous reading position; browser Back also works. “Read in order” puts the complete overview, seven mechanism answers, and seven evidence answers in one column.

## Kind

page

## Subjects

pr-127 only: “Scope semantic caches to one turn,” relative to its supplied PR #126 base.

## Declared choices

- Role framing: Learner choosing what they need explained next.
- Box lenses: Static package/module structure and lifecycle. Before/after boxes highlight moved cache ownership; release diagrams highlight the newly awaited completion boundary.
- Opening style: A question followed by a simplified cache-lifetime picture. Its lossy marks and non-cancellation limit are labeled at the picture.
- Shape: A complete seven-answer overview above a graph of mechanism and source questions. Fifteen nodes total.
- Navigation: Assigned angle—each node ends with three questions. The first choice supplies a sequential route; other choices cross to related mechanisms or evidence. Deep links reconstruct ancestors. Reading position and route use browser history, with no response collection.
- Trust posture: Explain recorded decisions and expose absent reasons. The page distinguishes the stated release barrier from the unrecorded reconciliation with the spec's broader parity promise.
- Persona: A teammate who knows the repository but not this corner.
- Representations used: Package boxes, before/after release paths, six-cache inventory, projection diagram, factory return/throw comparison, two interactive illustrative sequences, contract and test tables, numbered source excerpts.
- Importance rule: Ownership and completion/failure boundaries, then unrecorded choices. The entire decision set is visible before descent; exact types, cases, and lines come later.
- Inputs used (beyond bundle): Base/head source, contributor guide, architecture spec, unchanged core ProjectGraph and TypeScript semantic-project context, six commit subjects/bodies, focused test execution, and a byte comparison of retained service tests. The bundle's overview files had headings/absent-file notices but no symbol output.
- Tech: Plain HTML, CSS, and JavaScript; system fonts; Python 3 generates nodes from captured evidence. No runtime dependencies. Playwright Chromium used for browser checks.
- Built on earlier experiment(s): none. No earlier experiment content was read or reused.

## What I tried

One answer at a time, with three question exits and a remembered return path. I considered a short opening followed by a pure branching tree, but rejected that before implementation because it would hide decisions until the reader picked the right branch. The complete seven-answer root is the compromise.

The mechanism pages distinguish cache eviction from resource completion, and cached values from public projections. Two fixed-frame illustrations let readers choose successful/failed refresh and pending/resolved/rejected release; they do not execute symnav.

The evidence audit found ten added test cases and five previous service cases whose assertions and helpers are byte-for-byte retained. All 15 tests passed in the two focused files. This does not establish whole-CLI or daemon parity.

Forty browser checks passed, including all deep links, the sequential route, return-position restoration, browser Back, keyboard focus, and layouts from 320 to 1440 pixels. Native hash scrolling and a duplicate anchor offset needed fixes during validation. Desktop and mobile screenshots were inspected; Safari and a screen reader were not exercised.

Supporting records: [pyramid map](pyramid-map.md), [source and test observations](evidence/verification.md), [browser checks](browser-checks.json), [work log](work-log.md), and [screenshots](screenshots/01-overview.png). Both assigned worktrees remain clean.

## What I would drop

The duplicated full scope listing across evidence routes. Some repeated recall sentences also add reading weight; the overview is deliberately complete, but that makes it longer than the opening question suggests.

## What I would do next

Let a teammate choose their own path, then explain when an old promise can survive and when backend release finishes. Use where they get lost to revise the question wording and cross-links.

## Time spent

About 30 minutes of wall-clock work. Harness: Codex.
