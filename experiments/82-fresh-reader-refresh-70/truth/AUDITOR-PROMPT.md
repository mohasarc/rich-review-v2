# Source auditor prompt (sent to one subagent per register; {{KEY}}, {{SCOPE}} filled)

You build a ground-truth **decision register** for one code change, from source only. It is the yardstick against which independent readers of explanatory pages are checked later ("which decisions did the page fail to teach?"). Its quality decides whether that check means anything: be exhaustive inside scope, exact, and honest about rationale.

Register key: `{{KEY}}`
Output folder (create): `/Users/moyaseen/projects/rich-review-v2/experiments/82-fresh-reader-refresh-70/truth/{{KEY}}/`

## Scope

{{SCOPE}}

## Inputs you may read

- Bundles: `~/projects/rich-review-v2/inputs/<key>/` — `pr.json` (PR body, commits with bodies), `diff.patch`, `files.txt`, `overview-before.txt`, `overview-after.txt`, `repo-rules.md` (repo CLAUDE.md, plans). Keys: `pr-127`, `pr-131`, `pr-148`, `stack` (stack `pr.json` holds all 26 PRs under `pullRequests`).
- Worktrees (read-only): `~/projects/rich-review-v2/worktrees/{main,stack-head,pr-127-base,pr-127-head,pr-131-base,pr-131-head,pr-148-base,pr-148-head}`.
- The clone `~/projects/symnav`, read-only git only: `git -C ~/projects/symnav show|diff|log|grep` on `origin/agent/daemon-architecture-refactor-part-NN*` refs and `origin/main`. Plans live under `plans/` in the trees.
- Stack pins: main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → #149 `d07002357d3e9596bfaae910a1ac63b77981620b`. #127: base `a1e325a5ff979bdfa25babc5554621c8c0f20497` → head `64919bcbcf7fcc8202779b78c5f069b24662bb18`. #131: base `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e` → head `b100221db48754656328391b878299c5a0bab443`. #148: base `ba53c8e1662fd86d198b95321c90d9c9bef10184` → head `20838f8dbf413e04767543eb2380d0d114da6c60`.

## Forbidden

- Anything under `~/projects/rich-review-v2/experiments/` except this prompt file and your output folder. The explanatory pages, reader notes, sibling registers, and earlier experiments must not shape this one.
- `~/projects/rich-review/`. Any write, commit, checkout, rebase, or push in symnav or the worktrees (building/running tests is unnecessary; do not).
- `mcp__playwright__*` tools.

## Definitions

- **Decision**: a choice the change embodies where a plausible alternative existed: ownership/placement, boundary/import direction, lifetime of state, default or number, error/failure/timing behavior, public contract, naming that changes meaning, something left out, a change the PR body does not ask for, a test added/weakened/deleted/moved with changed oracle. Pure mechanism with no alternative is not a decision.
- **Rationale**: `stated` only with a verbatim reason from the PR body, a commit message, a plan/spec, or `stated-in-code-comment` for a code comment. Otherwise `unexplained`. Never invent or paraphrase a reason into existence. A plan that mandates the choice counts as stated; quote it.
- **Tier**: `T1` a reviewer of this change must know it to judge the change; `T2` should know it to predict behavior correctly; `T3` detail.

## Output

`register.md` (human) and `register.json` (machine), same content:

```json
{"key":"{{KEY}}","pins":{},"coverage":{"read_fully":[],"sampled":[],"not_read":[]},
 "boxes":[{"unit":"","before":"","after":"","boundary_moved":""}],
 "decisions":[{"id":"K-D01","tier":"T1","slices":[],"category":"","decision":"","alternative":"",
   "rationale":{"status":"stated|stated-in-code-comment|unexplained","quote":"","where":""},
   "receipts":[{"rev":"head|base|<sha>","path":"","lines":"","excerpt":""}],
   "consequence":"what a reviewer would predict wrongly without knowing this"}],
 "body_vs_diff":[{"claim_or_change":"","kind":"claimed-not-shipped|shipped-not-claimed|mismatch","receipt":""}],
 "questions":[{"id":"K-Q01","slices":[],"question":"","answer":"","register_ids":[],"receipt":""}]}
```

- Use id prefix `{{KEY}}` (e.g. `pr127-D01`).
- Receipts: real path and line range at a pinned revision, excerpt ≤ 3 lines. Verify every receipt by reading the lines; do not cite from memory of the diff hunk header alone.
- `alternative`: only when evidenced (plan, body, prior code, sibling code); else empty.
- `body_vs_diff`: check every PR-body claim and every commit against the diff.
- `questions`: 10–16 prediction questions a reader of a good explanation should answer in one sentence: behavior, ownership, failure timing, what state survives, defaults, what a test now proves. No line numbers, no trivia. Tag each with slices. Spread across tiers and slices.
- `coverage`: say exactly what you read fully and what you sampled.

When done, reply in at most 120 words: decision counts per tier, question count, top five T1 decisions in one line each, and coverage gaps.
