# Inspection notes

The evidence was read locally. No live GitHub state was used. The worktrees stayed read-only.

## Pinned range

- Before: `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e`
- After: `d07002357d3e9596bfaae910a1ac63b77981620b`
- 26 PR heads from `inputs/stack/pr.json`; each preceding head was verified as an ancestor of the next.
- “Time” on the scrubber is dependency order, not a calendar or commit-duration scale.

## What was inspected

All 26 PR bodies, their diagrams and decision sections, and commit subjects/bodies. The input overview files contained headings and absent-file markers rather than usable symbol inventories, so they were not treated as code evidence. The architecture spec and final policy record supplied constraints and threshold reasons.

The generator reads every per-PR patch and file inventory from git objects and embeds each PR's “Look here” source anchors at that PR's head. Direct code inspection concentrated on source/cache/session ownership, client/runtime routing, package composition, the protocol transition, test timeout commits, and the final status/stop/pressure test deltas. It did not execute symnav or exhaustively prove equivalence of all assertions in the stack.

## Additional choices surfaced

- #123: repository PR-template rewrite, including dropping image-embed requirements and the reading-order section; no bundling rationale found in the supplied record.
- #126: FIFO discovery, first-owner membership, inferred fallback, and sequential release are surfaced alongside the five PR decisions.
- #129: fixture synchronization uses all three markers; startup ownership is polled against original identity and heartbeat, including injected transient missing reads. Test budget increases from 15 s to 30 s and readiness wait from 5 s to 15 s are separately marked unexplained in their exact numerical choice.
- #130: all 44 recorded threshold values/recipes and five intentionally missing deadlines are visible as first-class choices at the policy stops.
- #135: two retained executor tests receive 15 s budgets. The commit names budgeting but provides no numerical rationale.
- #138: the twelve-MiB transfer test changes 20 s to 60 s. Assertions remain; a reason for the larger allowance is not recorded.
- #148: clock and registry authority changes, mechanism-test relocation while CLI copies remain active, and the explicit preservation of construction/acceptance-based idle timing.
- #149: ten CLI scenario deletions; changed pressure assertions; inspector read-error handling; removal of public policy serialization and policy override export.

“Unexplained” means no specific reason was found in the inspected bundle, code history, or supplied specs. It is not a claim that the author never discussed one elsewhere. A stated migration rationale does not establish the equivalence of an old CLI test chain and a new package test.

## Test comparison boundaries

The seven removed status and three removed stop scenarios are listed on the final frame. Three new package-client integrations correspond closely to status scenarios. Related controller, coordinator, and process tests were linked where found, while the difference in entry point remains explicit. No equivalent end-to-end replacement was established here for workspace-deletion error parity or the built stop command force-killing stuck work before rendering success. This is an inspection limit, not a statement that all related coverage is absent.

The per-frame removed-title inventory is a deliberately lossy regex scan. It does not recognize every multiline or parameterized test declaration, does not match assertion identities, and does not distinguish moves by itself. The full patches preserve the evidence the scan omits.

## Page validation

- JavaScript syntax checks passed.
- 27 scrub positions, all decision counts, and #148/#149 copy visibility checked in Chromium.
- Forward/back controls, Home/End, playback, keyboard hold-previous, both lenses, responsibility histories, source drawers, Escape and close controls exercised.
- 49 policy rows (44 values/recipes plus five absences) and ten final test-comparison rows checked.
- Direct `file:` opening with networking disabled passed; no server or fetch is needed.
- 1440 px and 390 px layouts checked. Package diagrams intentionally scroll inside their own container on narrow screens; the runtime view stacks vertically.
- Font/box clipping corrected; final inventory reports no clipped map labels or document overflow. One long flow-label wrap was corrected and retested separately.
- Both supplied worktrees reported clean status after inspection.

The detailed frame/layout results are in `browser-checks.json`. Screenshots capture baseline, package staging, cutover, and runtime views. These checks validate this artifact's behavior; they do not validate symnav's runtime behavior.
