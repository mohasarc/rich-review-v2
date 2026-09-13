# Comparator prompt (sent to an auditor after its register is sealed; {{PAGES}}, {{REGISTERS}} filled)

Second task. Compare independent blind readers' sealed notes against the source registers.

## 0. Seal first

If not done: in your register folder run `shasum -a 256 register.json register.md > register.seal && date -u +%FT%TZ >> register.seal`. Never edit sealed register files afterwards. Anything the comparison teaches you about the register (a decision you missed, a wrong receipt) goes into `addenda.md` in your register folder, each with a verified receipt.

## Pages

{{PAGES}}

Registers to use: {{REGISTERS}} (all under `/Users/moyaseen/projects/rich-review-v2/experiments/82-fresh-reader-refresh-70/truth/`).

## You may now read

- `82-fresh-reader-refresh-70/readers/<page>/L1.md`, `L2.md`, `report.json`, `quiz.md` if present (sealed; never edit), and `captures/` (what the reader saw: `*.visible.txt`, `*.alltext.txt` where `~ ` lines were hidden, PNGs).
- The page itself under `experiments/<page>/`: render with `node tools/page.cjs` (run from `82-fresh-reader-refresh-70/`, output under `compare/work/<page>/`), or read its HTML/source-book text, to decide whether something is on the page and at which layer.
- Registers listed above, bundles, worktrees, read-only git.

Still forbidden: the page folder's `README.md`, `brief.md`, `design-notes.md`, logs (self-descriptions, not the page); every other experiment; `mcp__playwright__*`; any write outside `82-fresh-reader-refresh-70/compare/` and your register folder's `addenda.md`.

## Output per page

`compare/<page>.md` and `compare/<page>.json`:

```json
{"page":"","registers":[],
 "scope":{"page_quote":"","where":"","slices_covered":[],"slices_outside":[]},
 "learned":[{"reader_id":"T1|D1","reader_text":"","register_ids":[],"match":"exact|partial|page-only-true|page-only-false|page-only-unverifiable|wrong","note":"","receipt":""}],
 "misses":[{"register_id":"","tier":"","in_scope":true,"on_page":"absent|top-not-recalled|depth-only-seen|depth-not-visited","evidence":"page quote + capture file, or terms searched: … none"}],
 "rule4":[{"source":"reader:R1|comparator","item":"","verdict":"confirmed|fidelity|not-depth|misread","top_check":"capture files + terms searched + result","depth_quote":"","why":""}],
 "wrong_on_page":[{"page_quote":"","where":"","source_says":"","receipt":""}],
 "quiz":[{"question_id":"","reader_answer":"","reader_location":"","grade":"correct|partial|wrong|not-on-page","in_scope":true,"note":""}]}
```

Rules:

1. **learned**: map every decision in the reader's L1 table (top) and L2 depth-only table. `exact` = same choice as the register item; `partial` = right area but the choice is missing, blurred, or incomplete; `page-only-*` = no register item: check source and classify true (then add to `addenda.md` with receipt) / false / unverifiable; `wrong` = contradicts source (receipt required).
2. **misses**: every T1 item of the registers, plus every T2 item in slices the page's own declared scope covers, that the reader did not learn exactly. `in_scope` follows the page's own words about its scope, quoted in `scope`. `on_page`: search the reader's captures and the page for it. `top-not-recalled` = on the top layer, reader did not record it; `depth-only-seen` = only deeper, reader visited it and still did not record it; `depth-not-visited` = only deeper, in a place the reader did not open; `absent` = not on the page (list terms searched).
3. **rule4**: give a verdict for every reader candidate, checking the top-layer captures yourself (`confirmed` = a deeper layer introduces a decision, behavior/condition, limit/reversal, or moving part absent from the top; `fidelity` = the top already carries it and depth adds exactness; `not-depth` = it is on the top; `misread`). Add as `comparator` any T1/T2 decision that the page shows only below its top layer and the reader did not flag; verify against the top captures.
4. **wrong_on_page**: page statements that source contradicts. These are explanation corrections, not symnav bug verdicts. Numbers, owners, timing, and "stated/unexplained" labels count.
5. **quiz**: grade the reader's answers (if `quiz.json` exists) against register answers; `in_scope` per the page's scope.

Be conservative: every verdict needs a quote or receipt. Do not credit what the page says but the reader did not record; that is a miss with `on_page` status, which is the useful signal.

Reply in at most 120 words per page: learned counts by match, in-scope misses by on_page status, confirmed rule-4 count, wrong_on_page count.
