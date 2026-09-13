# be-weird-b

## Entry point

Open [index.html](index.html) directly, or run:

```sh
open ~/projects/rich-review-v2/experiments/37-be-weird-b/index.html
```

No server, installation, network connection, or worktree is needed to read it. JavaScript must be enabled. The evidence is embedded locally.

The page is called **The reading loom**. Select a crossing between a decision and a depth. Use the independent decision/depth arrow controls, or use arrow keys while a crossing has focus. **Surface** returns to the same decision’s top layer; **Find this thread** locates its row. Browser Back and URL fragments restore both coordinates. **Unroll the full review** provides linear reading and printing, then returns to the same crossing.

## Kind

page

## Subjects

`pr-127` — Scope semantic caches to one turn, layer 4 of the 26-PR daemon architecture refactor. No additional PRs.

## Declared choices

- Role framing: Learner examining ownership and caller-visible boundaries.
- Box lenses: Static structure (packages and modules) + lifecycle (cache turns, reusable handles, pending release). The diagrams distinguish the core class’s source location from the TypeScript service that holds its instance.
- Opening style: A briefly marked, lossy drawer metaphor beside a before/after package diagram. The changed release-completion boundary appears before the navigation begins.
- Shape: One complete surface containing twelve decisions and their reasons; four depths repeat those facts with more fidelity: Shape, Choice, Mechanism, Evidence.
- Navigation: **Orthogonal addressing, presented as a reading loom.** Its address is `(decision, depth)`. Moving along one axis preserves the other. From 06 × Mechanism, moving down then right or right then down reaches 07 × Evidence. This fixed coordinate system is the experiment’s addition to section 5: navigation is controlled by two independent operations, with neither arbitrary related-node links nor a parent/child route. There is no semantic zoom. The ordinary unroll is a fallback, not the principal navigation.
- Trust posture: Read-only explanation with conservative rationale attribution and comparison of stated intent to shipped boundaries. Nine reasons are marked stated; three specific reasons were not found. No verdict, scoring, comments, or response storage.
- Persona: A teammate who knows symnav but not its semantic-cache implementation.
- Representations used: Package and object-ownership diagrams, lifecycle-order diagrams, before/after comparisons, key/value and test-inventory tables, numbered mechanism steps, exact source excerpts with revision and line numbers. Diagrams of time-like order are marked schematic; there is no running simulation.
- Importance rule: Ownership first, then preservation contracts and lifecycle boundaries, then API and test choices. The caller-visible release timing/rejection change is additionally pulled above the loom. Test changes receive a full thread with the same access to depth as architectural changes.
- Inputs used (beyond bundle): Read-only base/head source at `a1e325a5ff979bdfa25babc5554621c8c0f20497` and `64919bcbcf7fcc8202779b78c5f069b24662bb18`; head contributor guidance and architecture spec; focused execution of the two changed test suites. [research-notes.md](research-notes.md) records the extraction, rationale search boundary, and surface-to-evidence mapping. The overview bundles and the other three subject bundles were not used.
- Tech: Plain HTML, CSS, JavaScript, inline SVG, system fonts. A Python script captures and verifies source snapshots; isolated Chromium/Playwright was used for browser checks. Built with Codex; no subagents were used.
- Built on earlier experiment(s): none. Earlier experiment folders were intentionally left unread.

## What I tried

I considered a zipper/folding metaphor before implementation and discarded it because the navigation reduced to an expanding hierarchy. The loom keeps its two coordinates independent and lets a reader compare different decisions at the same depth. No implementation was abandoned halfway.

The initial phone layout could enter evidence but required scrolling back to find the surface thread. I added a direct return to the selected row. I also added the unrolled view so the unfamiliar navigation does not become a prerequisite for reading every layer.

All 48 crossings were exercised, including preservation of the selected surface contract, keyboard movement, direct fragments, history, and unroll/return. Desktop at 1440px and mobile at 390px had no horizontal page overflow or browser errors; SVG text stayed inside its view boxes. [UI check record](evidence/ui-checks.json), [browser check source](browser-check.js), and [screenshots](screenshots/02-loom.png) are included.

Source capture was checked against the actual commits using [capture-evidence.py](capture-evidence.py). The five original service tests and all their helpers remain identical; six service tests and four core tests were added. The focused head run passed all 15 tests across those two files ([raw output](evidence/focused-test-run.txt)). This does not establish end-to-end parity or a correctness verdict. Both symnav worktrees remained clean for tracked files.

## What I would drop

The vertically rotated depth names are slow to scan. Repeating the entire selected summary and reason in the pane preserves context but consumes substantial space. On a phone the loom becomes an inspector above a list, and much of its spatial benefit disappears. Twelve complete surface threads may be too much even for this six-file change.

## What I would do next

Watch a reader compare release clearing with release completion while holding Mechanism or Evidence fixed. Compare that experience with the same content in ordinary tabs; test whether preserving depth actually helps them keep the distinction in mind.

## Time spent

Approximately 25 minutes, including source reading, implementation, browser inspection, focused test execution, and documentation. No human comprehension test was performed.
