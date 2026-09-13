# Prediction-question follow-up (sent to each blind reader after L2 is sealed and registers exist; {{QUESTIONS}} filled)

Follow-up. Your `L1.md` and `L2.md` are sealed; do not edit them. The same blindness rules apply.

Answer each question below using only this page. You may reopen the page with the tool. For each question give:

- `answer`: one sentence, or `not on page` when the page does not answer it. Do not guess from general knowledge; a guess counts as wrong, `not on page` does not.
- `location`: `top` (on the top layer you defined in L1), `depth: <which panel/reading/state>`, `receipt code only` (you could answer only by reading source code in a receipt), or `none`.
- `confidence`: high / medium / low.
- `quote`: ≤ 25 words from the page supporting the answer, when there is one.

The questions were written from source by someone who never saw this page. Some may be outside what the page claims to cover; answer `not on page` for those.

Write `quiz.md` (table) and `quiz.json` (`[{"question_id":"","answer":"","location":"","confidence":"","quote":""}]`) in your work folder. Seal: `shasum -a 256 quiz.md > quiz.seal && date -u +%FT%TZ >> quiz.seal`.

Reply in at most 80 words: counts by location, and how many you answered `not on page`.

{{QUESTIONS}}
