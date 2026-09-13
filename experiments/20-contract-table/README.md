# contract-table

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/20-contract-table/index.html
```

Everything needed for the page, including source evidence, is local. No server, install, or build is needed to view it. JavaScript is required for the explorer. `#pr131` opens the larger PR; `#call-p131-169` jumps directly to the execution contract.

## Kind

page

## Subjects

pr-127 and pr-131, each compared against its own supplied base. They are separate steps in the stack, not consecutive revisions of one comparison.

## Declared choices

- Role framing: a caller inspecting contracts, including failures and state changes that signatures alone conceal. Assigned angle: every public function before/after.
- Box lenses: static package/module ownership and public change surface, with lifecycle boundaries in the worked traces. #127 distinguishes where the lifetime implementation lives from who owns the scope instance. #131 shows that policy inputs change while mechanisms remain in `apps/cli`.
- Opening style: before/after in one frame. Clickable package boxes give the lossy intuition before the detailed contracts.
- Shape: one pyramid per PR: complete boundary map and decisions → worked operation → callable matrix → exact source and named types.
- Navigation: linear reading, box-to-table jumps, boundary/search/surface filters, direct callable links, evidence dialogs, and return links. Closing evidence preserves the reader’s location.
- Trust posture: source-grounded explanation. Rationale is marked stated or unexplained. Error-selection changes, retained numeric seams, adapter transformations and changed/deleted test witnesses receive visible decision entries. The page makes no correctness verdict.
- Persona: a teammate familiar with the repository but unfamiliar with these mechanisms.
- Representations used: package/input diagrams, before/after contract tables, illustrative operation traces, a 39-leaf policy table, paired numbered source, and a file coverage ledger.
- Importance rule: caller-visible input, identity, completion, failure and ownership changes first; unchanged contracts and test support remain available for completeness.
- Inputs used (beyond bundle): all four supplied worktrees; complete touched TypeScript modules; the existing daemon policy implementation, policy tests and policy record; selected definition/callee/caller implementations for cache semantics. Bundle inputs used were PR bodies and commits, patches, file statistics, and rule/spec excerpts. The precomputed overviews were not used.
- Tech: offline HTML/CSS/JavaScript, Node scripts, and the TypeScript parser already installed in the #131 head worktree. No frontend framework or remote assets. Harness: Codex.
- Built on earlier experiment(s): none. Earlier experiment contents were ignored; no code, prose or layout was reused.

## What I tried

Started with a complete declaration inventory. Comparing only signatures and member bodies hid changes behind unchanged option-type names and private helpers. I added local named-type field comparisons and hand-read behavioral notes. “Same declaration + body” is deliberately separate from unchanged behavior.

The result has **240 callable rows**:

| Subject | Changed modules | Production callables and ports | Test/benchmark callables |
| --- | ---: | ---: | ---: |
| #127 | 6 | 27 | 0 |
| #131 | 60 | 178 | 35 |

“Every public function” means the union of callable declarations in the PR’s changed TypeScript modules: exported functions, public methods/accessors/constructors of exported classes, and exported callable interfaces/type properties. Unchanged members are included. Overloads share an implementation row. Implicit constructors are synthesized for classes without an `extends` clause. Re-export fanout, inherited methods, private methods and imported library APIs are not expanded. Removed non-callable constants are covered by the decisions and full patch. Every changed file, including zero-callable tests and process entries, appears in the coverage ledger.

The page surfaces **17 decisions** and embeds **40 checked source anchors**. In particular, it separates #127’s new release barrier from preserved query identities, and #131’s policy plumbing from changed error provenance and earlier parent-side worker-policy validation. The two operation traces are explicitly illustrative; they are not execution recordings.

Validation: `verify.cjs` reconciled all 66 changed modules, 240 rows, 467 present before/after sides, source locations, annotations and policy leaves. Playwright Chromium opened the artifact directly through `file://`, exercised every callable evidence view and decision source link, and checked PR switching, named-type changes, filters, empty results, direct links and Escape dismissal. Desktop and 390-pixel mobile layouts were checked; document overflow, page errors and external HTTP requests were absent. Results are saved in [verification.json](verification.json) and [browser-verification.json](browser-verification.json); screenshots are in [screenshots/](screenshots/).

Symnav tests were **read, not run**. Statements about tests describe their assertions, not observed test results. Behavioral notes are manual source interpretations, not a whole-program effect analysis. Error cells cover explicit domain branches and named dependencies; callback interfaces cannot supply guarantees their types do not express. No symnav source, branch, or worktree was modified.

To regenerate the data with the supplied worktrees present:

```sh
cd ~/projects/rich-review-v2/experiments/20-contract-table
node extract.cjs > inventory.txt
node build.cjs
node verify.cjs
```

## What I would drop

Implicit utility constructors and the 20 benchmark callables contribute little to understanding the PR. I retained them to make the inventory rule consistent, but would move them to an appendix in a less exhaustive version. The #131 table is too long to read without its boundary filters; it works as a reference under the decision layer.

## What I would do next

Connect each policy leaf to the exact consuming call sites. Add a small real before/after execution capture for promise identity and release/error ordering to complement the source-derived contracts.

## Time spent

Approximately 32 minutes of wall-clock work, including source inspection, extraction, annotation, page construction and browser verification.
