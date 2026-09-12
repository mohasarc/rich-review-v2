# diff-of-intent

## Entry point

```sh
open ~/projects/rich-review-v2/experiments/09-diff-of-intent/index.html
```

[Open the page](index.html). It works directly from the filesystem, including its local source evidence. No server, installation, network connection, or build is needed. Keep the experiment folder together.

## Kind

page

## Subjects

pr-127 and pr-131. Each compares its own supplied base and head. No other PR is analyzed.

## Declared choices

- Role framing: a contributor tracing stated contracts into concrete implementation choices.
- Box lenses: package ownership in both subjects; cache lifecycle in #127; configuration authority and consumer boundaries in #131.
- Opening style: short ownership sketches, explicitly marked as simplified, followed by paired intent/shipped figures.
- Shape: two decision maps, with 8 rows for #127 and 13 for #131. All 21 decisions and their reason status remain visible when details are closed. A row opens into its mechanism, then source excerpts and full source snapshots.
- Navigation: linear reading, subject anchors, decision permalinks, native expandable rows, and source-to-decision return links. Direct decision links open the corresponding detail. No feedback collection or storage.
- Trust posture: diff-of-intent. The shared plan is the stack destination; the PR body is a stated contract for this step. Bodies may be retrospective. “Unexplained” means no reason in the reviewed source corpus, not proof that the change was unauthorized.
- Persona: a contributor who can read TypeScript but does not know this corner of symnav.
- Representations used: paired nodes with trace connectors; nested package boxes; release sequence; cache-entry table; policy-to-consumer paths; timeout lanes; nested recovery scopes; changed-test correspondence; an executed source-method probe; line-addressable offline evidence.
- Importance rule: one row per decision family, regardless of diff size. Failure selection, retained numeric seams, deleted tests, and transformed fixtures receive the same visible treatment as architectural ownership. All 66 changed files map back to these rows. File coverage is an audit aid, not a proof that every implicit choice has been identified.
- Inputs used (beyond bundle): exact base/head implementation and test files in the four assigned worktrees; their contributor guides; the architecture spec; #131’s pre-existing `plans/005/daemon-policy.md`, policy implementation, validator, and policy tests; Git revision and clean-worktree checks; an isolated probe compiled from the actual TypeScript sources. Both complete patches, PR bodies, commit metadata, and file statistics were used. The overview files were inspected but contain no usable symbol output. No transcript or phase-specific implementation plan was supplied in the bundles.
- Tech: generated static HTML, CSS, and small vanilla JavaScript for navigation. Python generates the page, source snapshots, and manifest. The optional Node probe uses TypeScript already installed in the worktree. No new dependencies were installed.
- Built on earlier experiment(s): none. Earlier experiment folders were deliberately not read.

## What I tried

I initially considered giving the plan, body, and implementation equal columns. That made a whole-stack destination look like a promise that each single PR should already fulfill. The final figures keep the plan horizon separate and trace the concrete promises into shipped behavior. I also dropped weighted flow widths before implementation: file counts and line counts would give a misleading weight to an intent claim.

The useful result was more specific than “the code matches the description.” #127 explicitly changes the release barrier alongside its query-preservation contract. #131 wires existing policy without moving the mechanisms into the daemon package. It also changes which error can escape after an accepted reattachment, leaves some numeric seams, deletes a resource-derivation suite whose related package tests already existed, and transforms several storage fixtures. Those distinctions are visible before opening the evidence.

I checked the error-selection observation with a source probe. After an original authenticated close and a later reattached-completion corruption error, the base returns the original error and the head returns the later one. A reattached submission failure still returns the original error in both versions. The probe executes the exact recovery methods with `executeOnce` stubbed; it does not simulate or run the daemon network.

## What I would drop

The complete source mirror is heavier than the teaching surface needs: 131 source pages, about 7 MiB. For a maintained product I would consider a shared source viewer with excerpts loaded on demand. Here the mirror makes both revisions inspectable offline and keeps the experiment independent of GitHub.

The opening could also be shorter. The decision maps carry more explanatory value than the headline and reading legend.

## What I would do next

Compare the unexplained choices with timestamped implementation plans or transcripts, if available. Then test whether a reader can explain the release boundary and the two recovery scopes after reading only the maps.

## Time spent

About half an hour, including source comparison, implementation, the isolated probe, and browser/evidence checks.

## Verification

- Static checks passed for 132 HTML pages, local links and fragments, all 21 decision rows, all 66 file mappings, and all 131 source hashes. Diff totals match the supplied bundles.
- Chromium checks passed through both a local preview server and `file://`. All 21 rows opened with Enter and closed with their return control. Source navigation reached the cited line and reopened the associated decision on return.
- Expanded content was checked at 1440 × 1050 and 390 × 844. No document-width overflow or page errors were observed. Wide comparison tables scroll within their own region on a phone.
- The filesystem browser run made no external requests. All four symnav worktrees remained clean. The temporary preview server was stopped.
- No full symnav suite, real daemon/socket scenario, or end-to-end parity test was run. The artifact explains source and test contracts; it makes no whole-PR correctness claim.

Recorded checks: [validation.json](validation.json). Probe output: [probe-results.json](probe-results.json). Screenshots are in [screenshots/](screenshots/).

## Files and reproduction

- [content.py](content.py): authored claims, reasons, file mapping, and evidence needles.
- [figures.py](figures.py): subject-specific mechanism figures.
- [build.py](build.py): creates the page, complete source snapshots, and [manifest.json](manifest.json).
- [style.css](style.css) and [app.js](app.js): presentation and browsing behavior.
- [verify.py](verify.py): evidence/link completeness and read-only surface checks.
- [probe.mjs](probe.mjs): reproducible cache and error-selection observations from source.
- [brief.md](brief.md): the supplied brief, retained unchanged.

Rebuilding and rerunning the source probe require the original bundles, assigned worktrees, and the worktree’s installed TypeScript package. Opening the finished page requires only this experiment folder.

```sh
python3 ~/projects/rich-review-v2/experiments/09-diff-of-intent/build.py
python3 ~/projects/rich-review-v2/experiments/09-diff-of-intent/verify.py
node ~/projects/rich-review-v2/experiments/09-diff-of-intent/probe.mjs
```
