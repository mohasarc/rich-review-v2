# recombine-angles-50

## Entry point

Open [index.html](index.html): **The caller stays. Some answers change.**

```sh
open ~/projects/rich-review-v2/experiments/50-recombine-angles-50/index.html
```

The page, its comparison and pinned source excerpts work directly from disk, including with JavaScript disabled. No installation, server, network or symnav checkout is needed to read them. Keep this folder together.

The supporting [Markdown critique](critique.md), also [rendered for the browser](critique.html), contains 40 page rows and a 46-experiment ledger. Links to original experiments require their sibling folders; the captured readings and screenshots remain local. The temporary loopback inspection server has been stopped.

## Kind

page

With a Markdown critique and JSON inspection/source receipts. The primary PR explanation has 26 decision rows, nine shared receipts and 47 exact excerpts. These counts describe the artifact; they are not a score or evidence of comprehension.

## Subjects

pr-148 — Own daemon mechanisms behind DaemonClient.

Base `ba53c8e1662fd86d198b95321c90d9c9bef10184` → head `20838f8dbf413e04767543eb2380d0d114da6c60`. Other PR pages were read as representation and editorial inputs; their code was not reviewed as additional subjects.

## Declared choices

- Role framing: A reader reconstructing decisions and an editor asking what that reader can understand, predict and reconsider. Source corrections concern the explanation; there is no symnav correctness verdict.
- Box lenses: Code/package ownership versus the process holding an instance; client/runtime, per-attempt executor and returned output lifetimes; validation/failure boundaries; implementation, stimulus and observation in a test.
- Opening style: Consequences first: stricter live registry matching, changed test observations and a recovered migration reason. Two ownership/lifetime maps lead into the complete comparison. A bounded optional-policy descent is named before the table.
- Shape: A static page with one visible 26-row decision comparison and optional source depth. Supporting Markdown critique with 40 page rows, a 46-experiment ledger, sealed page-only notes, browser text captures, two retained zoom-canvas screenshots and newly pinned source witnesses. This adapts the predecessor critiques' “no page” declarations to the brief's explicit Kind: page.
- Navigation: Linear comparison order and direct decision→receipt→decision links; full source pages have exact line anchors and receipt returns. The critique links each original page and its capture. No score, completion gate, verdict or comment storage.
- Trust posture: Keep recorded reason, implemented consequence, missing record context, an omitted implication in my notes, an inherited finding and an editorial judgment separate. The policy plan corrects broad “unexplained retirement” claims without justifying every deleted assertion. Sampled routes remain sampled. Checked-in tests and producer-reported execution are not presented as new executions.
- Persona: One technically capable sequential agent reader. The PR body, README metadata and earlier pages prime later readings. This is not an independent human recall study. The conflicting predecessor declarations about reading critiques are reconciled chronologically: none before the seal; attributed readings of 38/39/41–46 afterward.
- Representations used: Package and process/object maps, comparison tables, a test-observation diagram, an explicitly illustrative idle timeline, rendered browser text, original page diagrams/simulations as reading inputs, screenshots, raw patches and numbered source excerpts. No predecessor execution data was copied into the new page.
- Importance rule: Changed outcomes, validation timing, authority and test observation before cosmetic differences or inventory size. “No new material decision found” is an acceptable bounded comparison result. The declared stopping layer is the opening orientation, maps and complete comparison; deeper receipts elaborate those same decisions.
- Inputs used (beyond bundle): Philosophy first, required playbook sections 1/2/3/6/7, with the rest read for context; all finished 01–46 at bounded depth, including README entry/kind/subject metadata and selected declarations; historical git objects from the read-only stack-head worktree, pinned contributor/meta-test AGENTS guidance, functional/architecture/policy/follow-up plans, and relevant base/head implementation/tests. The unchanged #148 daemon-policy migration paragraph was explicitly checked. The supplied PR body/45 commit records, full file inventory and patch were used; wide copied bodies received inventory/context inspection rather than an exhaustive semantic audit. No external web research, v1 material, symnav build, test or execution was used.
- Tech: Native HTML/CSS, Markdown and JSON; Python and git read operations for extraction/generation/integrity checks; isolated Playwright on a temporary loopback server, plus direct-file/no-JavaScript verification. The delivered artifact has no runtime dependency. Optional rebuilding uses Python's installed Markdown package; verification uses the standard library.
- Built on earlier experiment(s): Read all finished 01–46 as bounded editorial inputs. The 40 page entries are 01–37 and 40, plus 32 starter and the second 33 opening. Full membership and paths are in [manifest.json](manifest.json), [comparisons.json](comparisons.json) and [experiment-ledger.json](experiment-ledger.json). Specific contributions: 05/06 package/process separation; 08 stricter ownership lead; 13 consequence-first ordering; 23 bounded descent; 27 test apparatus; 29 preparation/staging cuts; 30 separate lifetimes; 35 intermediate history; 36 stored/returned-object lens; 40 attributed reconciliation. Critiques 38/39/41–46 are credited after the seal. No predecessor implementation was copied. Experiments 47 onward were not read as critique subjects.

## What I tried

Combined the critique methods into a PR page rather than making another collection-wide diagnosis the primary entry. Captured all 40 page entries, read their openings and selected text, inspected the #148 decision layers more closely, then sealed the notes before the independent patch and predecessor critique bodies. The notes are explicitly page-only, not blind: the PR body/metadata and page 23's embedded source were already available.

Pinned 253 source snapshots and the exact 153-path patch; the latter matches the bundle byte-for-byte. Used a second, copy-aware Git comparison to make relocation easier to inspect. It is not a semantic equivalence claim. Checked the live registry's stronger equality, construction ordering, client object lifetimes, route/output behavior, deleted or narrowed test observations and the historical policy record. Reproduced the 23 optional-policy descent after reading its attribution in 42/46.

Dropped a possible “new worker validation in #148” account when the base already contained it. My sealed question about a changed entry catch outcome also did not become a finding: the checked source supports a direct-constructor contract and ordering change, while entry validation already existed. Large browser body dumps could not establish viewport visibility, so retained screenshots and a separate room capture bound the claims.

The initial inspection had browser-tool VM import/global restrictions and an ARIA-name selector miss. These were corrected as harness issues. A draft link check caught a relative link copied from README metadata; metadata now renders as plain labels. The Markdown comparison tables received local scrolling containers for small screens. No complete implementation was abandoned midway.

[Artifact checks](verification.json) cover pinned hashes, the 44-file seal, local targets, excerpt ranges, unchanged note columns, row counts and authored file/decision assignments. [Browser checks](browser-checks.json) passed all 26 decision/receipt returns, keyboard disclosure, a full-source round trip, 1440/768/390/320 layouts, and direct-file reading with JavaScript disabled. There were no external resource requests or remaining browser errors. Both assigned symnav worktrees had no tracked changes. These checks establish neither semantic completeness nor human understanding.

[Inspection record](inspection-record.md) and [authored pyramid map](pyramid-map.json) preserve the reading/validation limits. The received brief and pre-existing harness logs were retained; oversized worker logs are ignored for commits.

Optional regeneration from the frozen inputs, from this directory:

```sh
python3 build_critique.py
python3 verify.py
```

`build_critique.py` also rebuilds the primary page and source viewers. `capture_source.py` additionally needs the pinned objects in the original stack-head worktree. `seal_notes.py` refuses to overwrite the existing seal. `browser-check.js` is a function for the available Playwright tool; its loopback port must match a new temporary server if rerun.

## What I would drop

Most raw body/control dumps from the human reading path; they belong only in receipts. The 26-row complete stopping layer is still long, and the two large supporting ledgers add little to a reader concerned only with #148. They satisfy the assigned comparison shape but do not establish that more inventory helps understanding. I would also reduce the full source archive if portability to the original worktrees were acceptable.

## What I would do next

Have an unfamiliar maintainer stop after the comparison and predict the mismatched-lock outcome, a malformed warm result and the scope of the version test. Compare which source descent changes their interpretation; do not turn this agent's own recall into a human result.

## Time spent

Approximately 35 minutes of active reading, extraction, writing, construction and checks. Harness: Codex; one sequential agent, no delegated agents. The scope capture began at 05:04 UTC after the initial philosophy/playbook and metadata reading.
