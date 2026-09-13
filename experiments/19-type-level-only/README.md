# type-level-only

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/19-type-level-only/index.html
```

The page and its evidence work from this folder. No server, installation, internet connection or build is needed to read them.

## Kind

page

## Subjects

pr-131 — Route daemon thresholds through centralized policy.

## Declared choices

- Role framing: learner reading the change through the type system.
- Box lenses: static package/module structure; change surface, especially required input records and the production/test construction boundary.
- Opening style: a before/after picture of optional inputs becoming required policy inputs. The representative signatures are explicitly marked as simplified.
- Shape: seven decision summaries, then exact contract families and assignability observations, then a complete declaration inventory and local evidence.
- Navigation: linear reading; policy-section links; decision-to-detail links; native expandable comparisons; searchable evidence; source-line anchors with a return that restores the selected file.
- Trust posture: separate author-stated reasons from observed declarations. Keep unexplained optionality and invisible implementation/test changes visible at the top. No correctness judgment.
- Persona: a TypeScript-capable teammate who knows the repository but not these daemon mechanisms.
- Representations used: package and input-boundary diagrams, before/after signatures, contract table, schematic set relationships, an interactive display of actual compiler observations, source excerpts and a test-file manifest.
- Importance rule: changes in required construction inputs first; distinguish record assignability from removed field names; give unexplained exceptions and coverage limits space beside the main consolidation decision.
- Inputs used (beyond bundle): declaration syntax from both supplied worktrees for all 60 changed TypeScript files; unchanged `daemon-policy.ts`, `policy-testing.ts`, daemon `index.ts` and `program-dependencies.ts`; the head policy record; worktree contributor instructions; immutable Git revision IDs and numstat; the installed TypeScript 6.0.3 compiler for declaration-only observations. From the bundle: `pr.json`, `files.txt`, relevant `repo-rules.md` passages and only the file headers of `diff.patch`. The overview files and implementation diff hunks were not used.
- Tech: static HTML/CSS/classic JavaScript. A Node/TypeScript AST extractor produces local data and source views. No runtime libraries, remote assets, fetches, storage or services.
- Built on earlier experiment(s): none. Earlier experiments were ignored.
- Harness: Codex, one worker; no delegated agents.

## What I tried

I extracted explicit declarations before designing the page. The traversal does not descend into executable bodies or initializer expressions. Default presence records optionality; inferred types remain unknown. Overloads stay separate, with implementation signatures distinguished from caller overloads.

I considered treating deleted knobs as type narrowing, then discarded that framing: removing the required workspace `memoryCapBytes` field widens the option record when its referenced dependency types are held fixed. The page separates requiredness, vocabulary, record shape and primitive value domains instead.

The interactive examples use computed conditional-type results. They demonstrate both the newly required output slice and the continued acceptance of structural lookalikes, negative numeric literals and extra properties on named values. They do not simulate daemon behavior.

The browser tool blocks file URLs, so I inspected the page using a temporary loopback server and stopped it after verification. A source-navigation check also led me to preserve the selected evidence file when returning from a declaration page.

## What I would drop

Most private-field rows from the initial evidence selector. They help establish extraction coverage but compete with the constructor and option contracts; the full downloadable snapshots could carry them alone. The sixteen-row consumer table also repeats some of the section diagrams.

## What I would do next

Pair this view with a separately identified implementation/test audit to cover the decisions that declarations cannot reveal. Keep its claims separate so the additional evidence does not masquerade as a type guarantee.

## Time spent

About 30 minutes wall-clock, including extraction, page construction, compiler observations and browser inspection.

## Scope and the hard-rule limitation

The assigned “types added/narrowed/widened; no bodies” angle cannot fully satisfy playbook rule 8’s requirement to surface every decision, including weakened/deleted assertions and unrequested implementation changes. This is a known limitation of the method, not evidence that those changes are absent. The opening layer and the evidence boundary both state it.

The page records all four author-stated PR decisions. It shows the optional stored-output capacity as unexplained and distinguishes the general reason for required policy from the missing per-consumer explanation for slice width. It does not claim to have established every implementation decision or preserved test assertion.

No implementation or test-assertion body was used as evidence. The AST parser necessarily reads complete source files, but extraction never traverses function bodies or initializer expressions, and no such code appears in the generated source views. No symnav tests were run. Both source worktrees remained clean; no symnav file or branch was modified, committed, pushed or rebased.

## Reading the type observations accurately

- “Required” establishes the presence and declared shape of an input. It does not establish validation, actual value flow, snapshot origin or runtime freezing.
- The shared policy schema is unchanged: seven sections, 39 readonly numeric fields. The migration changes consumers’ dependencies on that schema.
- Workspace assignability holds the referenced dependency types fixed with shared opaque stand-ins. It isolates option-field changes; it is not a compatibility test of class instances across revisions.
- Conditional-type examples compare named structural types. Fresh-object-literal excess-property checks are a separate mechanism and were not executed in these examples.
- Default expressions and inferred types are withheld. The inspection records are not emitted `.d.ts` files.
- “Assignable” is a compiler observation about a candidate type, not an approval or rejection of the PR. The page stores no reviewer input.

## Validation

- TypeScript 6.0.3 in strict mode evaluated 21 conditional-type observations with zero diagnostics.
- The extraction contains 120 changed declaration records across 60 changed files. Sixteen of nineteen changed production files have declaration changes; 23 changed test files remain outside assertion-level analysis.
- The artifact audit inspected 2,790 records, preserved 20 overload signatures across both revisions, and found no executable bodies or initializers in those records.
- All 128 local declaration source views and 3,046 generated evidence links/fragment targets passed the static audit.
- Desktop 1440 × 1080 and mobile 390 × 844 were inspected. All six scenario controls, evidence filters, empty states, source-line navigation and return navigation worked; no document overflow or final browser console errors/warnings were found.
- JavaScript syntax checks passed. Screenshots are in [screenshots/](screenshots/).

Detailed records: [verification.md](evidence/verification.md), [artifact-audit.json](evidence/artifact-audit.json), [browser-checks.json](evidence/browser-checks.json), [compiler-observations.json](evidence/compiler-observations.json).

## Reproduce the evidence

From this experiment folder, with the supplied worktrees and their TypeScript installation still present:

```sh
node scripts/extract.cjs
node scripts/check-contracts.cjs
node scripts/build.cjs
node scripts/validate-artifact.cjs
```

These commands write only inside this experiment folder. The built page does not need the worktrees to remain available.

The comparison uses base `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e` and head `b100221db48754656328391b878299c5a0bab443`. Source views include these revision IDs and original declaration line numbers. Author intent is preserved locally in [pr-intent.md](evidence/pr-intent.md), [architecture-excerpts.md](evidence/architecture-excerpts.md) and [policy-record.md](evidence/policy-record.md).
