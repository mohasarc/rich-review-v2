# One variable: the opening

Opening A is [index.html](index.html), a workbench metaphor. Opening B is [failure.html](failure.html), an illustrative delayed release. Both are complete review pages, openable directly as files.

Only the region between `OPENING_START` and `OPENING_END` differs. One `common.html` supplies every subsequent word, diagram, decision, source excerpt, link, and interaction. Both use the same stylesheet and script. No variant flag enters the common body or JavaScript. The openings use one markup function and the same element structure, typography, dimensions, sequence of three boxes, and near-matched word budget. The page title, metadata, and navigation also match.

Both openings carry the same propositions:

- Six separate stores remain attached to a TypeScript query service.
- Core supplies a reusable lifecycle owner; TypeScript retains the query work.
- Clearing cached entries happens immediately, before project cleanup completes.
- Backend release now waits and carries the cleanup outcome.
- A new cache turn starts only after successful refresh.

The metaphor’s note names the simplification. The failure’s note names the invented delay and avoids presenting it as a production incident. Those notes belong to the manipulated opening region. The common top explicitly states that concrete TypeScript project cleanup is synchronous and that delayed cleanup comes from a test double. This matters: motivating the change with an alleged old stale-cache bug would misdescribe the base, which already cleared before release.

## Inspecting the pair

Open A and B in separate tabs at the same viewport size. Read an opening, then the common decision map. To explore whether the opening helps unfamiliar readers, give different readers different initial versions. A reader who sees both in succession carries knowledge from the first into the second; swapping order across readers reduces that confound. This folder collects no responses, records no reader state, and assigns no scores.

## Rebuild and check

```sh
cd ~/projects/rich-review-v2/experiments/33-pair-one-variable
python3 build.py
python3 verify.py
```

The source snapshots already in `evidence/` make rebuilds independent of the worktrees. `verify.py` checks byte equality outside the opening, matching opening element structures, word counts, local links, unique anchors, captured source hashes, and unchanged existing test bodies. `pair-verification.json` is the resulting record.

Browser checks additionally compare the opening and common-body geometry at desktop, tablet, and mobile sizes, exercise every release frame for both outcomes, check local source navigation and no-JavaScript reading, and record screenshots. They do not establish that either opening teaches better; that needs people reading the pair.

## Limits of the control

Different language necessarily changes emphasis: a metaphor transfers a familiar structure; a failure starts with a missing completion signal. Matching words and layout does not prove equal cognitive difficulty. The experiment controls everything after the opening so that this difference is the thing available to inspect. The top decision map is intentionally complete, so it is longer than a one-screen summary.
