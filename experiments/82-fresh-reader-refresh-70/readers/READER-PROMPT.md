# Blind reader prompt (sent verbatim to one fresh subagent per page; {{NN}}, {{FOLDER}}, {{ENTRY}} filled)

You are a fresh reader in a study of code-review artifacts. Background, all you need: an agent wrote a long stack of pull requests refactoring the daemon of a TypeScript code-navigation tool called symnav. Other agents built explanatory pages meant to let a human understand a change without reading its diff. You read ONE such page and record what it taught you. Source code is shown to someone else later; you never see it.

Page: /Users/moyaseen/projects/rich-review-v2/experiments/{{FOLDER}}/{{ENTRY}}
Your work folder (create it): /Users/moyaseen/projects/rich-review-v2/experiments/82-fresh-reader-refresh-70/readers/{{FOLDER}}/

## Blindness rules (hard)

- Read only through rendering: the entry page, and pages it links inside `experiments/{{FOLDER}}/` (source books, evidence pages, receipt dialogs), opened with the tool below.
- Never open, cat, grep, or list: that folder's `README.md`, `brief.md`, `design-notes.md`, `*.log`, `scripts/`, `src/`, `package*.json`, `validation*`/`verification*` files, or the page's JS/JSON data files. If the page links to "experiment notes"/README, do not follow it; note that it exists.
- Never open anything under `~/projects/rich-review-v2/inputs`, `~/projects/rich-review-v2/worktrees`, `~/projects/symnav`, any other `experiments/*` folder, `orchestrator-log.md`, the root `index.html`, `playbook.md`, GitHub, or the web. Inside `82-fresh-reader-refresh-70/` you may open only `tools/page.cjs`, this prompt, and your own work folder (not `truth/`, not other readers' folders).
- Do not use any `mcp__playwright__*` tool: that browser is shared with other readers. Do not modify anything outside your work folder.
- Use no knowledge of symnav from anywhere but this page.

## Tool

```sh
cd /Users/moyaseen/projects/rich-review-v2/experiments/82-fresh-reader-refresh-70
node tools/page.cjs --url ../{{FOLDER}}/{{ENTRY}} --out readers/{{FOLDER}}/captures --tag <name> [--settle 3000] [--full] [--a '<json actions>']
```

Each run is a fresh page load, then the actions, then captures: `<tag>.png` (viewport 1440x900; add `--full` for a full-page PNG), `<tag>.visible.txt` (rendered text), `<tag>.alltext.txt` (all DOM text; lines starting `~ ` are currently hidden), `<tag>.controls.txt` (visible clickable things with coordinates and state), `<tag>.log.txt` (errors, failed actions). View PNGs with the Read tool. Heavy canvas/WebGL pages may need `--settle 4000`.

Actions (JSON array, run in order): `{"clickText":"Next","exact":true,"nth":0}`, `{"clickRole":{"role":"button","name":"Play"}}`, `{"click":"css selector"}`, `{"press":"ArrowRight"}`, `{"scroll":900}` or `{"scroll":"bottom"}`, `{"scrollTo":"#id"}`, `{"mouse":{"x":500,"y":400}}`, `{"drag":{"from":{"x":1,"y":2},"to":{"x":3,"y":4}}}`, `{"wheel":{"x":700,"y":500,"dy":-400}}`, `{"select":{"selector":"select","value":"v"}}`, `{"type":{"selector":"input","text":"x"}}`, `{"hover":"sel"}`, `{"wait":2000}`, `{"shot":"name"}` (mid-sequence screenshot; add `"full":true`), `{"text":"name"}` (mid-sequence text dump), `{"goto":"../{{FOLDER}}/{{ENTRY}}#fragment"}`. Replay a prefix of actions to return to a state.

## Definitions

- **Decision**: a choice the change embodies where a plausible alternative existed: who owns what, where a boundary runs, a default or number, error/failure behavior, lifetime of state, what was left out, a change nobody asked for, a test added/weakened/deleted. A description of mechanism with no choice in it is not a decision.
- **Stated / unexplained**: how the page marks the decision's reason (a reason given by the PR author/commits/plans vs. "no reason found"). Record "not marked" if the page does neither.
- **Top layer**: what the page offers as its stopping layer. If the page claims one ("these N readings are the complete stopping layer"), use that claim. Otherwise: everything visible without opening any panel, dialog, drawer, `<details>`, tab, simulation step, or zoom level. Record what you counted.
- **Rule 4 (pyramid invariant)**: the top layer carries everything a reader needs; each deeper layer adds fidelity on the same facts; a deeper layer never introduces a fact, decision, or surprise absent from the layer above. Extra exactness about something the top already named (a precise value, a file path, a line) is fidelity. A deeper-layer decision, behavior/condition that changes what you would predict, caveat that limits or reverses a top claim, or moving part the top never mentioned is a **rule-4 candidate**.

## Procedure

**Step 1: top layer only.** Load the page. Screenshot the first viewport, then scroll through the main column (scroll actions + shots, or `--full`). Read the rendered text. Operate only controls needed to reveal the page's declared top layer. Write `L1.md`:

1. What you counted as top layer, and why.
2. The change in at most three sentences, your words.
3. Boxes and boundaries: units, what is inside them, which boundary moved and how.
4. Decisions learned: table `# | decision | page marking (stated / unexplained / not marked) | anchor quote ≤ 20 words`.
5. Questions the top layer left open.
6. Lossy/illustrative marks noticed.
7. What you could not perceive (canvas-only detail, sound, animation you could not run).

Seal it: `shasum -a 256 L1.md > L1.seal && date -u +%FT%TZ >> L1.seal`. Never edit `L1.md` after sealing.

**Step 2: descend.** Open every deeper layer the page offers: each reading/panel/drawer, each simulation preset or condition (run it), each zoom level, and source receipts (every receipt tied to a decision; at least three overall). Keep captures. Write `L2.md`:

1. Layers and states visited, with the actions that reached them.
2. New at depth: table `# | item | kind (fidelity / new fact / new decision / limit-or-reversal / new moving part) | quote ≤ 30 words + where | top-layer check: terms searched in your top-layer text captures and result | rule-4 candidate? yes/no + why`. Check the page's top-layer captures, not only your memory of them.
3. Decisions learned only at depth: same table as L1 step 4. Mark any decision you inferred only by reading source code inside a receipt as `inferred from receipt code`.
4. Contradictions between layers or within the page.
5. Interaction failures and unreadable parts.

Seal `L2.md` the same way (`L2.seal`).

**Step 3: report.** Write `report.json`:

```json
{"page":"{{FOLDER}}","top_layer_definition":"","one_line_change":"",
 "decisions_top":[{"id":"T1","text":"","marking":"","anchor":""}],
 "decisions_depth_only":[{"id":"D1","text":"","marking":"","anchor":"","inferred_from_receipt_code":false}],
 "rule4_candidates":[{"id":"R1","quote":"","location":"","why":"","top_terms_checked":""}],
 "contradictions":[], "unperceived":[], "files_opened":[], "capture_runs":0,
 "seals":{"L1":"<sha256>","L2":"<sha256>"}}
```

`files_opened` lists every path you read or listed and every URL the tool loaded (capture files under your work folder may be summarized as one entry).

Be thorough: read like a reviewer spending 30–60 minutes. Deep beats fast.

Reply to me in at most 150 words: counts of top and depth-only decisions, each rule-4 candidate in one line, and a one-line confirmation that no forbidden path was opened. Stay available: a follow-up question set may arrive later.
