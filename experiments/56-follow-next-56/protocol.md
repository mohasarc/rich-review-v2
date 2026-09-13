# Protocol (written and sealed before any reader session)

## Question the run answers

55 found that pages name owners but leave readers unable to predict defaults, failure visibility and credential branches. Does moving those facts into a page's declared top layer — nothing else changed — let fresh readers predict them from the top alone?

## Arms

| Arm | Subject | Page | Declared top given to readers | Promoted statements |
| --- | --- | --- | --- | --- |
| 127 | pr-127 (assigned) | 26-physical-analogy | masthead, opening, "Eight things to carry away" through its stop line | decision 2 (+1 sentence: shared reference search), decision 5 (+2 sentences: sequential stop on failure; synchronous concrete cleanup) |
| 148 | pr-148 (the default and credential items 55 named live here; #127 has no credentials: 0 token/credential/auth terms in its diff) | 23-zoom-canvas | root canvas view | D04 outline (default policy supplier; load failure rejects calls), D13 outline (request credential partition) |

Exact before/after strings: `scripts/edits.json`. Copies and hashes: `pages/manifest.json`. Only `index.html` (127) or `app.js` (148) differs between variants.

## Layout constraint

- 127: identical DOM element sequence (145 elements, same tag/class/id order). Two cards gain lines; top height 2102 → 2185 px at 1440 px width. No CSS change.
- 148: root room covers keep identical geometry and margins. Where page 23 reuses the same outline string in room-level decision cards, D04 and D13 gain one wrapped line; the card's bottom label moves 1.5 px; nothing clipped. Longer candidate wordings that clipped or overflowed were rejected (`captures/outline-fit*.json`).

## Conditions

| Condition | Reader sees | n per arm |
| --- | --- | --- |
| guess | context paragraph only | 3 |
| original | context + original top (screenshots + extracted rendered text) | 6 |
| promoted | context + promoted top (same form) | 6 |
| repeat | the same original readers, same session, then given the promoted top and the same questions | 6 |

Readers are fresh `claude -p --model claude-opus-5 --tools "" --safe-mode --strict-mcp-config` sessions with a custom system prompt, run from an empty temp directory. No tools, no files, no CLAUDE.md, no memory, no MCP. They are not told the study's purpose, the hypothesis, that a variant exists (until the repeat stage says "revised"), or which statements differ.

They are asked for a concrete prediction, a basis (`page` with a verbatim quote, or `inference`), and a confidence per question. They are not told that "unknown" is preferred; the guess condition measures what inference alone achieves.

## Questions and keys

`study.json`. Keys were established before sealing by executing base/head builds (`truth/127/*.json`, `truth/148/probe-head.json`), running the relevant pr-148 test files, and pinned source reads (`truth/*/source-receipts.txt`).

Roles: `target` = fact changed by promotion; `control-top` = already stated in both tops; `control-implied` = implied by both tops; `calibration-absent` = in neither top nor anywhere on the page.

## Grading

1. Two independent grader sessions per arm (same isolation, no tools) receive the rubric and all answers shuffled under random ids, with condition and reader removed.
2. Grades: correct / partial / incorrect. For 148 Q3, graders also mark each of the five rows.
3. Disagreements are resolved by the experimenter against the receipts; each resolution is written down.
4. Page support is computed mechanically: a `page`-basis quote counts only if it occurs in the text that reader was shown (whitespace/quote normalized).

## Pre-stated expectations

- Targets: promoted > original; original ≈ guess.
- Controls: promoted ≈ original.
- Calibration (127 Q7): low in all conditions; count confident wrong answers.
- Repeat: original readers improve on targets after seeing the promoted top.

## Analysis

Per question × condition counts, page-supported counts, confidence. Target vs control summaries. Within-reader change table for the repeat. No significance tests: n = 6 per cell cannot carry them. Every summary links to the raw answers.

## Confounds declared in advance

- Readers are one model family, the same model as the experimenter who wrote questions and promotions. Not humans.
- Question text itself teaches the possibility space; it is identical across conditions and the guess condition measures it.
- Promoted text is longer (+42 words 127; +8 words 148). Length and position are not separated.
- 148 D04 promotion adds `currentSystem()` and "failed load … rejects calls", which page 23 does not state at any depth; the other promoted facts exist deeper in the same page. Reported per edit.
- Repeat readers have already answered once and are told the page was revised.
- Screenshots and extracted text are both given; this is not a visual-attention study.
- Graders are the same model family as readers.

## Seal

`seal.json` records SHA-256 of this file, `study.json`, `scripts/edits.json`, `pages/manifest.json`, every packet, and the timestamp, before the first reader starts. Reader outputs are hashed as they finish.
