# be-weird-a

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/36-be-weird-a/index.html
```

It works directly from the folder. No server, install, network connection or live worktree is required to read it. JavaScript must be enabled.

## Kind

page

The page is accompanied by a reproducible measurement script and [representation method](METHOD.md).

## Subjects

pr-127 only: **Scope semantic caches to one turn**.

Base: `a1e325a5ff979bdfa25babc5554621c8c0f20497` (#126). Head: `64919bcbcf7fcc8202779b78c5f069b24662bb18` (#127).

## Declared choices

- Role framing: Reader of measurements, examining which observations still refer to the same thing.
- Box lenses: Static package/module ownership and the lifetime of stored values. The service → core scope ownership move is shown separately from the backend → project release completion boundary.
- Opening style: Picture first, with a definition of each pixel and a bounded-fixture caveat.
- Shape: One complete stopping layer across sections 01–03: contact sheet, ownership/release picture, and all twelve decision cards. Per-decision mechanism and source evidence sit below it. The opening sentence alone is not claimed to be the complete layer.
- Navigation: Linear scrolling; selectable store/interface views; a pixel can compare any pair of observations. Cards and boxes jump to numbered disclosures, each with a return link. Sources open in place and close with Escape.
- Trust posture: Measured behavior and recorded reasons kept explicit. Unexplained API/structure choices receive the same card treatment as architectural choices. The artifact teaches without a correctness verdict.
- Persona: A teammate who knows symnav but has not worked in its semantic cache implementation.
- Representations used: **Pairwise identity contact sheet**, invented for this brief outside section 5’s listed representations. Each pixel is an equality relation between two observations, rather than a node, request, code line, duration or animation frame. Supporting representations are package boxes, a release completion readout, compact decision cards and frozen source excerpts.
- Importance rule: Lifetime and completion boundaries first, followed by every associated public API, exception, projection, test and rationale decision. No importance score.
- Inputs used (beyond bundle): Actual source and compiled modules from the supplied pr-127 base/head worktrees; contributor guide; daemon architecture spec; core ProjectGraph and concrete TypeScript project cleanup; focused existing test runs; an in-memory TypeScript fixture; controlled failure/release probes; isolated Playwright browser checks. From the bundle, used pr.json (body and all six commits), diff.patch, files.txt and repo-rules.md. Did not use the precomputed overviews or other subjects’ bundles.
- Tech: Plain HTML, CSS, SVG and JavaScript; a Node `.mjs` capture script importing existing built worktree modules. No frontend dependencies or external assets. Browser checks used the available Playwright tool.
- Built on earlier experiment(s): none. Earlier experiments were left unread; no content or implementation was reused.

## What I tried

I considered a literal “cache loom” and a replay before building, but both would fit existing menu entries. I instead turned an observation sequence into a square relation: ink means exact object reuse. Real base/head probes produce all six stores’ prints.

The stored-value plots match. Switching to public service returns removes off-diagonal ink for reference promises and position node arrays even though their locations remain cached. Keeping both lenses makes that distinction visible.

The matrix alone cannot carry the release-completion change: both versions clear the old entries, so the print remains the same. I kept the representation and added a separate completion readout. This limit is documented in METHOD.md. The deferred graph is explicitly injected; concrete TypeScript cleanup is synchronous here.

Visual checks caught crowded all-store labels and, with every detail open at 320 pixels, unbreakable code in tables. Both were corrected. No approach was abandoned after implementation.

## What I would drop

Some of the empty area between stores in the all-six view. It makes isolation visible, but consumes a lot of space on a phone; a single-store print earns its space more consistently. The large opening title could also shrink.

## What I would do next

Try this relation on a change that deliberately alters sharing between cache families, and see whether a reader can predict the identity boundaries from the print without consulting source.

## Time spent

Approximately 35 minutes of active work, including source inspection, measurement, implementation and browser checks. Harness: Codex.

## Evidence and limits

The six-file diff maps to visible decisions in [decision-coverage.md](evidence/decision-coverage.md). Reasons are marked stated only when supported by the PR, plan, commits or contributor guide. Composition, the precise scope API, the narrowed files argument, the historical reprojection rationale and the release/parity reconciliation have no specific explanation in the inspected inputs. No implementing conversation was supplied.

The measurements cover one in-memory source file and controlled boundary conditions. Identity comparisons are within each build; matching IDs or colors across builds do not mean shared objects. The service-return lens does not measure backend wrapper promises. Release observations use an injected deferred/rejecting graph and are not daemon traces or claims about changed end-to-end output.

Both worktrees built. Existing focused tests passed: **15 head tests and 5 base tests**. Browser checks exercised the two lenses, keyboard selection, details, source dialogs, anchors and responsive layouts with no remaining overflow or page errors. Full logs and the bounded validation scope are in [verification.md](evidence/verification.md). No symnav source or branch was changed.

To regenerate observations from the supplied, built worktrees:

```sh
cd ~/projects/rich-review-v2/experiments/36-be-weird-a
node scripts/capture.mjs
```

This updates `data.js` and the frozen observation/source records under `evidence/`. It does not rerun the existing tests or browser checks.

The folder includes the received [brief](brief.md), [raw observations](evidence/observations.json), [frozen sources with hashes](evidence/sources.json), the [capture script](scripts/capture.mjs), and [screenshots](screenshots/01-contact-sheet.png). The page stores no comments, verdicts or review state.
