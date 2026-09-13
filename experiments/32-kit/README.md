# kit

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/32-kit/index.html
```

The reusable component guide is [kit.html](kit.html). No install, build, network, or running server is needed to read either page. [starter.html](starter.html) demonstrates a smaller composition of the same four components.

## Kind

kit

Four reusable Python components—`BoxDiagram`, `DecisionCard`, `BeforeAfter`, and `ExitLink`—with a complete static PR 127 demo, an authoring guide, and a runnable starter.

## Subjects

pr-127. Base #126 is used only for the before/after comparison. Other sample bundles were not used.

## Declared choices

- Role framing: Learner/textbook. The assigned angle is reusable explanation components; the demo presents decisions without collecting responses or judging correctness.
- Box lenses: Static package/class ownership and lifecycle boundaries. The package diagram shows cache lifetime crossing into core; paired release sequences show completion moving to the end of project release.
- Opening style: Before/after in one frame, preceded by the compact idea “Six caches get one lifetime owner.” The opening also names the awaited-release change.
- Shape: Three-level pyramid: complete overview with ten decision cards, mechanisms for those same choices, then pinned source evidence.
- Navigation: One continuous document with nonlinear exits from boxes and cards. Native anchors, exact return links, keyboard focus restoration, browser Back, and fallback backlinks without JavaScript.
- Trust posture: Compare stated intent with the complete six-file patch. Distinguish the PR's requested release barrier from the broader spec's unchanged-failure promise. Surface files-only input and composed/reusable scope as unexplained choices. Audit test additions and retained assertions.
- Persona: A teammate who knows Symnav but does not know the semantic-cache implementation.
- Representations used: Nested SVG ownership boxes, directional edges, paired before/after panels, decision cards, control-flow sequences, cache family grid, behavior tables, API signatures, verbatim source excerpts with original line numbers. Simplified diagrams and illustrative sequences are marked where they appear.
- Importance rule: Ownership first, then identity/failure/lifecycle contracts, public API choices, and test decisions. Every extracted choice stays visible in the overview; unexplained reasons receive an amber marker.
- Inputs used (beyond bundle): Read-only PR 127 base/head sources and tests, both worktree contributor guides, TypeScript package exports, architecture spec, and relevant follow-ups spec passages. Compared captured files against their committed Git objects. Used bundle PR body, all six commit subjects/bodies, full patch, file statistics, stack position, and repository rules. Did not use generated overviews, runtime traces, live GitHub, or an implementing-agent transcript.
- Tech: Python 3.10+ standard-library static generation; HTML, CSS, SVG, and a small classic JavaScript navigation enhancement. Reading requires only a browser. No dependencies or external assets. Codex harness, without delegated agents.
- Built on earlier experiment(s): none. Earlier experiments were deliberately ignored. The pre-existing brief and harness logs in this folder were preserved.

## What I tried

Built immutable component dataclasses first, then composed the entire demo from them. Added mandatory reason provenance for stated decisions and a structural parent/claim check for deeper layers. Captured source excerpts locally so the evidence does not require GitHub or the worktrees after generation.

The first diagram grouped handle queries and scope clearing on one edge. Visual inspection exposed that ambiguity: handles cannot clear themselves. The final diagram separates `getOrCreate` from the service's scope lifecycle calls. Source-range validation also caught two off-by-one excerpt ranges during the first build.

I considered a client-side component/router framework, then chose static generation and native anchors to preserve linear reading and direct file opening. The JavaScript enhancement only improves navigation. Browser testing caught excess anchor offsets, which were removed. No alternative implementation was left unfinished.

## What I would drop

Repeated source excerpts make each decision self-contained but lengthen the evidence layer. I would consolidate repeated core-code excerpts once the return navigation for shared evidence is equally clear. The four-column component chooser is useful for kit authors; it belongs only in the guide, as it does here.

## What I would do next

Reuse the unmodified `kit/` directory on PR 131 to see where wide ownership diagrams need a different layout. Have a fresh reader check whether the ten-card overview preserves understanding without becoming too much to scan.

## Time spent

About 27 minutes in this Codex attempt, including source reading, implementation, browser checks, and documentation.

## Reusing and rebuilding

Copy [kit/](kit/) and read [KIT.md](KIT.md) for the component API and authoring contract. PR-specific content lives in [build.py](build.py), separately from the reusable components.

From this folder:

```sh
python3 build.py
python3 starter.py
python3 verify.py
```

Rebuilding uses [sources/snapshot.json](sources/snapshot.json), so the original worktrees are unnecessary. `capture_sources.py` is an optional recapture tool tied to the exact supplied base/head revisions; it reads worktrees and writes only this experiment.

## Evidence and validation

[content-audit.md](content-audit.md) maps every changed file to the decision inventory, distinguishes recorded reasons from missing rationale, and records the manual descent audit. [coverage.json](coverage.json) maps the same root choices into mechanisms and evidence. The structural check cannot determine whether prose hides a new fact.

Seven offline checks cover local assets and anchors, unique IDs, read-only UI, layer coverage, snapshot/excerpt integrity, preservation of prior test source, and invalid component inputs. The Playwright check exercised 25 browser behaviors: keyboard and SVG navigation, return focus, browser Back, copied source fragments, guide/starter reuse, mobile layout, no-JavaScript reading, and absence of browser errors or external requests. See [browser-results.json](browser-results.json) and [browser-check.js](browser-check.js). Screenshots are in [screenshots/](screenshots/).

The browser harness blocks `file:` navigation, so its checks used a temporary localhost server. The shipped pages use relative assets and native anchors, with no module loading or fetch. No Symnav test suite was run; test assertions were read and their source compared. Symnav source and branches were untouched.

The key limits are author-controlled diagram coordinates, a substantial complete overview, and reliance on human judgment for semantic completeness. This is one complete PR demonstration and a smaller example from the same PR; broader reuse is still untested.
