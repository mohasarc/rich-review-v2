# drag-the-box

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/16-drag-the-box/index.html
```

Everything runs from the folder, including source evidence. No server, install, network connection, or API key is needed. Desktop dragging has a select-and-move alternative for keyboard and narrow-screen use.

## Kind

page

Interactive package-move workbench with an extracted import model.

## Subjects

pr-131 only: **Route daemon thresholds through centralized policy**.

- Base: `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`
- Head: `b100221db48754656328391b878299c5a0bab443`

## Declared choices

- Role framing: learner practicing counterfactual reasoning. The artifact explains dependency consequences and the PR’s decisions; it supplies no correctness verdict.
- Box lenses: physical packages and source modules; separately, CLI process / daemon process / worker thread. The first lens is manipulable; the second explains where policy values are consumed.
- Opening style: before/after ownership picture, followed by dragging a module while its callers and dependencies remain attached.
- Shape: a package workbench followed by a complete decision map, then mechanism and source evidence.
- Navigation: linear sections 01–04; nonlinear class → imports / callers / actual PR import changes, class → decision, decision → exact source, policy section → recorded values. Dialog Back and Close preserve the reader’s place.
- Trust posture: explanatory with an explicit rationale audit. Stated decisions and unexplained test deletions, fixture transformations, error selection, and source-text enforcement all have visible cards.
- Persona: teammate who knows the repository but not this daemon corner.
- Representations used: draggable source-module cards, package zones, grouped dependency arrows, before/after ownership diagram, process topology, nested recovery-attempt diagram, policy tables, decision cards, exact numbered source, and exact patches.
- Importance rule: changed authority and boundary crossings first; distinct deadline/recovery scopes next; test migration and unexplained choices receive their own root-level cards.
- Inputs used (beyond bundle): both read-only source trees, including production and test imports; their AGENTS.md, ESLint boundary rules, package manifests and tsconfigs; the existing daemon policy record, architecture functional spec, and central policy tests. The bundle’s PR body, six commits, full patch, file statistics, and overview files were read. The overview files contained headings without usable symbol output.
- Tech: dependency-free HTML/CSS/JavaScript at runtime; TypeScript 6.0.3 syntax-tree extraction during generation; Node assertions and Playwright Chromium for artifact verification.
- Built on earlier experiment(s): none. Other experiment folders were not read. The orchestrator-provided brief and logs already in this assigned folder were preserved.
- Assigned angle: move a class to another package and see which imports break.
- Harness: Codex; no sub-agents spawned.

## What I tried

I began with literal class relocation in mind. A class-only simulation would silently leave private collaborators and co-located types behind, so the implemented move unit is the entire source module. That approximation is stated beside the board, and the evidence drawer lists its companions.

I extracted the actual imports before and after the PR instead of inventing example dependencies. Three distinct effects are visible: stale relative addresses, prohibited package directions, and target modules needing a public entry-point plan. An “imagine imports rewritten and exports added” control removes only the address/exposure flags; it cannot erase package rules.

I considered a live compiler sandbox but did not implement one. This version can open offline and lets the reader add dependency modules to the board and move several together. It explicitly stops short of compiler, runtime-URL, and transitive-symbol claims.

The useful discovery was that this PR performs no physical class move at all. The codec loses its import of a spool-owned capacity constant, but retains a CLI protocol type. The lifetime module adds a policy type while retaining telemetry’s Clock. The interaction makes those remaining dependencies tangible.

I also read the changed tests and helpers. Deleted resource-policy tests, adjusted spill thresholds, helper normalization/setup, later-attempt error selection, and the meta-test’s string denylist are surfaced beside the stated architectural decisions.

## What I would drop

The nine initial cards make the first board taller than necessary; five would probably teach the first lesson faster. The 6.7 MiB data snapshot also includes more source than most readers will inspect. It earns reproducibility here, but unrelated test bodies could be trimmed for distribution.

## What I would do next

Add an isolated compiler replay for a small number of hand-picked moves, comparing its diagnostics to the static model. Then try true per-symbol extraction with an explicit list of companions carried along.

## Time spent

About 31 minutes of wall-clock work in this attempt.

## A short route through the artifact

1. Drag **DaemonLifetime** from CLI to daemon. Two caller addresses become stale; its type-only telemetry import violates daemon’s package rule.
2. Imagine the address edits. The telemetry dependency remains. Inspect the exact `Clock` import.
3. Move **DaemonResultChunkCodec** to daemon and switch revisions. Its forbidden outgoing declarations fall from two to one: the spool constant import disappears in #131, but the protocol type stays.
4. Try **Output + context → daemon**. Moving both modules preserves their relative import and removes that CLI dependency in this model, while callers still need address changes.
5. Read the eleven visible decision cards. Each deeper explanation adds implementation and evidence to a choice already named on its card.

## Model contract

The extractor scans 417 base and 424 head TypeScript files, excluding fixture directories, declarations, dependencies, and build output. It records 1,875 → 1,929 static import/re-export declarations. Every relative declaration resolves in its original snapshot.

- A card moves `apps/cli/src/…` to `packages/daemon/src/…` or `packages/core/src/…`, preserving the remaining folder structure. Classes, interfaces, aliases, and private collaborators in the same file travel together. Tests remain in their original locations.
- One import or re-export declaration is one edge, even if it names multiple symbols. Separate declarations to the same file count separately. Type-only edges count toward package direction.
- The address calculation compares the written relative path at its virtual new location against its original target’s virtual location. Co-moving modules can preserve an existing relative path.
- The package calculation follows the repository’s declared internal dependency matrix. Type erasure does not remove this architectural dependency.
- A cross-package relative import produces an entry-point requirement. The display counts distinct target modules, not the number of symbols to export. Some requirements point in a forbidden direction; exposing names alone cannot make those imports allowed.
- Rewriting is an explicit assumption: root exports and supporting build configuration are imagined. No source, package manifest, or tsconfig is edited.
- Node and other external imports are displayed but are outside the internal package-rule calculation. The model does not install dependencies, follow barrel symbols transitively, detect cycles, check actual exported-name availability, or relocate dynamic imports and runtime entry URLs. Runtime-load expressions are called out on the selected module.
- Zero model flags is not a build result or a correctness judgment.

The decision map is the top conceptual layer, including all unexplained details. The workbench demonstrates its boundary consequences. Policy leaves and exact source are deeper fidelity on those same decisions.

## Evidence and coverage

All 60 changed paths are linked to decisions and their exact bundle patches. The seven required policy sections are expandable, with the existing record’s values and reasons. The source drawer includes both snapshots and the original PR body/commits, so GitHub is unnecessary.

There are seven stated decision cards and four unexplained cards. The latter cover test retirement, fixture/helper transformations, changed error selection, and the enforcement mechanism. Reasons are attributed to the supplied PR and checked-in records; no author rationale is inferred from code.

The existing central resource-policy tests are shown as context for the deleted CLI suite. They predate #131 and are not claimed to be identical coverage: the smallest central derivation-table input differs from the deleted table.

## Verification

Run the artifact checks:

```sh
node ~/projects/rich-review-v2/experiments/16-drag-the-box/verify.cjs
```

Nine checks passed: exact PR/delta identity, every declaration’s source/line anchor, unchanged-location baselines, telemetry type dependency, the additional daemon dependency when lifetime moves to core, the codec’s before/after difference, a two-module move, reset semantics, and every authored evidence reference. Results are in [verification.json](verification.json).

Playwright checks passed for native dragging, keyboard card selection, the move control, imagined repairs, revision switching, callers with/without tests, import changes, adding dependencies, accumulated moves, decision/source/back navigation, policy tables, changed-path filtering, exact patches, reset, and reload. No JavaScript errors, HTTP requests, or horizontal overflow at 1440 px and 390 px were observed. Results are in [browser-verification.json](browser-verification.json); [screenshots](screenshots/) include the active drag result, opening, and mobile layout.

Symnav source was untouched. No symnav build or test suite was run; these checks validate the teaching artifact.

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `style.css`, `app.js` | Offline interaction, diagrams, and evidence navigation |
| `content.js` | Authored decisions, specimen explanations, and evidence anchors |
| `model.js` | Virtual placement and import-impact calculation |
| `data.js` | Captured base/head source and imports, documents, PR metadata, and patches |
| `extract.cjs` | Rebuild the snapshot using the supplied worktrees and their installed TypeScript |
| `extraction-report.json` | Scan sizes, exact SHAs, and unresolved-reference audit |
| `verify.cjs`, `verification.json` | Artifact checks and their result |
| `browser-verification.json`, `screenshots/` | Browser verification record and visual samples |
| `brief.md` | Supplied brief |

To regenerate data while the supplied worktrees are present:

```sh
node ~/projects/rich-review-v2/experiments/16-drag-the-box/extract.cjs
```

This reads the worktrees and writes only this experiment’s data and extraction report.
