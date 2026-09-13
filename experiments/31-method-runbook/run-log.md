# Run record — PR 127

## 2026-09-13, about 02:32–02:34 UTC — before extraction

- Read `philosophy.md`, then the complete `playbook.md` (required sections first in purpose; remaining sections supplied context).
- Read both worktree root `AGENTS.md` files. No source edits or PR actions are part of this experiment.
- Earlier experiments: ignored; no artifact or README consulted. Listed instruction-file paths only.
- Output folder and `brief.md`, `harness.txt`, worker log already existed from the supervisor; retained them.
- Reader: teammate familiar with the repository, unfamiliar with semantic-cache lifecycle.
- Wrote `RUNBOOK.md` v1 before opening the PR body or diff. Will preserve it and record deviations here.
- Technique: manually authored semantic extraction, explicit ranking, generated static HTML; no external dependencies or source mutation planned.

## Extraction — about 02:34–02:43 UTC

- Read the PR body and six commit subjects/bodies, then the full six-file diff. Both precomputed overview files contain only path separators (and absent-file markers), so they provided no semantic analysis.
- Base `a1e325a5ff979bdfa25babc5554621c8c0f20497`; head `64919bcbcf7fcc8202779b78c5f069b24662bb18`. `capture_sources.py` confirmed the bundle diff exactly matches that three-dot comparison and every copied working source equals its committed blob.
- Read both complete service implementations, the head backend and all changed test regions, plus the retained test block and fixture helpers. Inspected the public exports, definition/callee async entry points, inherited graph release, concrete project cleanup, and relevant architecture-spec passages. Keyword-searched the supplied repo rules and worktree plans for lifecycle rationale. The supplied commits have no extended bodies.
- Two guessed context paths did not exist (`backend/project-membership-graph.ts` and `src/project/`); used `rg --files` to find the actual `core/src/workspace/project-graph.ts`. No missing source was treated as absent behavior.
- Important correction during context reading: the concrete TypeScript semantic project clears synchronously, but its graph inherits an async release method from core. The artifact must show those as distinct units. The newly added pending-release test uses a controlled graph double.
- Extracted 12 decisions, 33 detail claims, 47 exact source excerpts, and 15 diff hunks. All 391 additions and 67 removals have decision assignments in `coverage.json`.
- Verified the existing service-test suffix, from the first pre-existing test through all helpers, is byte-for-byte identical. Ten tests are added, five retained, no expectations removed or weakened. Tests are inspected, not executed.
- The capture script copies local snapshots and computes coordinates. `extract.py` contains the authored interpretation; this is not an automatic decision extractor. Earlier experiments remain unconsulted.

## Ranking — about 02:43–02:44 UTC

- Wrote `ranking.md` before the HTML renderer. Ownership/lifetime boundaries lead; visible qualifications and rationale gaps follow; supporting contracts and tests complete the overview.
- Split synchronous clear ordering (D02, stated rationale) from completion/error propagation (D12, declared but separate rationale unexplained). The reason for ordering is not evidence of a reason for every release change.
- Marked four rationale gaps: awaited boundary rationale relative to the preservation promise; composition form; minimal reusable scope API; narrower file-list argument. All are present in the PR or derivable from its public surface; none is silently called unrequested.
- Dropped a one-sentence complete top because it concealed these choices. Kept a lossy opening picture, followed by a complete visible decision overview. Promoted late settlement, reuse during release, scope of promise identity, and test-double limits into the top before rendering.
- Deviation from runbook output wording: the rough maps are design material encoded directly in the renderer rather than separate image files. The required two lenses and their moved boundaries remain explicit.

## Rendering — about 02:44–02:50 UTC

- Generated a self-contained teaching page, a browser-readable version of the frozen runbook, and an execution record. Each of the twelve decisions is visible above the end-of-overview marker. Mechanisms and source excerpts are optional depth, with direct routes back.
- Added a static, explicitly illustrative old/new-promise trace. No PR code was run or benchmarked. No image-generation or external dependency was needed.
- Kept the full authored ledger and source copies beside the page so this is an inspectable method trial, not just a page with an idealized description of its method.

## Verification and finish — about 02:50–02:59 UTC

- Structural audit checks every copied-source hash, the frozen runbook hash, all 47 exact excerpts, all changed-line assignments, all 33 claim-to-overview mappings, every local link and anchor, and required README headings. It also checks that no overview decision is hidden in a disclosure and no form/storage code exists.
- The browser harness refused `file:` navigation; tested through a temporary loopback server on port 8731 instead. The delivered pages make no fetch calls and use relative local links, so their opening path remains a file.
- The first browser load requested a missing favicon. Added a local SVG icon, eliminating that resource error. No application exceptions were observed.
- Browser checks covered all three pages at 1440px and 390px widths, the complete D12 overview → mechanism → E17 evidence → mechanism → overview route, keyboard activation, and a direct E31 evidence URL. Screenshots of the package map, lifecycle, mobile decision, and runbook were inspected.
- A repeated automated pass read the evidence `open` attribute before the asynchronous hashchange handler ran. Inspection immediately afterward showed the target open. Preserved the failed record as `browser-validation-before-wait.json`; changed the check to wait for the target disclosure to become visible, then reran it successfully. No implementation change was needed for that event timing.
- Source review during validation tightened D08/D09 from “within/for the turn” to “between/until clears,” because release may clear within the same successful turn. Extended the backend excerpt to include the async query wrappers used by its identity qualification. Removed a mechanism clause about a node fallback that was not present in the selected excerpt. Regenerated extraction and rendering, then reran the relevant checks.
- Final browser record: all six width/page combinations fit the viewport, all 12 decisions are exposed, route checks pass, and browser page/console error lists are empty. Final structural results are in `validation.json`.
- Both worktrees still report an empty tracked-file status. No source edits, builds, branch actions, shared-index changes, or other experiment edits were made. The temporary validation server is stopped at handoff.
- The surviving weakness is operator judgment: source-line coverage cannot prove every decision was recognized, and claim-parent links cannot prove the reader will experience no surprise. No independent reader or second operator was tested.
