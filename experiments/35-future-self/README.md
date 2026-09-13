# future-self

## Entry point

Open [index.html](index.html), or on this Mac:

```sh
open /Users/moyaseen/projects/rich-review-v2/experiments/35-future-self/index.html
```

The page and its 239 pinned source pages work directly from disk. No server, installation, network, or original worktree is needed to read them. Start with the ownership map, choose a reason for returning, or read the 20 decision records in order.

## Kind

page

## Subjects

pr-148 — Own daemon mechanisms behind DaemonClient.

Base: `ba53c8e1662fd86d198b95321c90d9c9bef10184`.
Head: `20838f8dbf413e04767543eb2380d0d114da6c60`.
No additional PR was used as a subject; later consumer adoption is not assumed.

## Declared choices

- Role framing: The author recovering decisions before making another change. Preserve recorded reasons and the places where a reason could not be recovered.
- Box lenses: Static package/module ownership and runtime process/thread topology. The map distinguishes the newly staged package graph from the CLI compatibility graph that still carries the shipped invocation.
- Opening style: A before/after ownership picture, introduced by “The caller hadn't moved yet.” The intended intuition is that an intermediate extraction state can be remembered incorrectly as the finished migration.
- Shape: A decision notebook with four chapters and 20 expandable records. Each visible record face carries its choice and reason state; descent adds a mechanism table, exact source wording, and witnesses for the same facts.
- Navigation: Linear reading; return cues for likely future edits; clickable diagram boxes; native expandable records; source links with line anchors and a return to the originating record; a searchable index of all 153 changed paths.
- Trust posture: Reasons are quoted from the PR or specs. Eleven records have a stated source reason; nine identify a specific missing reason. A general extraction requirement is not treated as an explanation for every changed test observation. No correctness verdict, approval, or comment collection.
- Persona: The original author, six months later. The “when you return” cues are marked as editorial prompts, not reconstructed author statements.
- Representations used: Ownership diptych; runtime chain; five-part ordering strip; decision records; preserved quotations; mechanism and before/after tables; illustrative routing and idle-lifetime models; immutable source witnesses and a complete path index.
- Importance rule: Put the decisions most likely to be misremembered first: staging versus consumer adoption, order and replay consequences, and preserved versus deferred behavior. Give removed or narrowed test evidence and unexplained setup changes their own records.
- Inputs used (beyond bundle): Pinned Git source and test files from both supplied revisions; the unchanged CLI dispatcher to establish the active consumer path; the CLI output codec to identify the package-local copy; the head daemon functional, architecture, and follow-up specs; commit/path history; worktree contributor and meta-test guides. From the bundle, used `pr.json`, the full patch, `files.txt`, and repository rules. The overview files were inspected briefly but contain headings without usable symbol output, so they did not support the explanation. No implementing-author transcript was supplied or inferred.
- Tech: Static HTML, CSS, and vanilla JavaScript. Python standard-library build script generates the page and line-addressed evidence. All reading interactions are local and transient; there is no storage or network code.
- Built on earlier experiment(s): none. Earlier experiment contents were ignored. No page, code, or analysis was reused from them.

## What I tried

Made the durable unit a choice plus its recovered reason, with a cue for the next time the author might reconsider it. The opening preserves the staging state instead of presenting the eventual architecture as already active. The source audit added separate records for the temporary test export removal, deleted CLI entry tests, narrower worker/CLI integration evidence, Windows cleanup expectations, and serial test setup.

An initial all-pairs textual similarity scan of mechanism copies was too slow and was stopped. I switched to Git's rename mappings and direct comparisons of the corresponding CLI and package files. Those comparisons also exposed the package-local spool codec and the additional client composition seams. No page approach was abandoned midway.

The two interactive models are explicitly illustrative. The routing model makes skipped observations visible; the idle model separates the acceptance deadline preserved in this PR from the completion-based reset recorded as a follow-up. Neither executes symnav.

## What I would drop

The five-part ordering strip contributes less than the return cues and the two ownership pictures. It is the first candidate to remove. The complete source archive is useful for future retrieval but heavy; the full lockfile could become a plain download without losing explanatory value.

## What I would do next

Use an actual implementing-author transcript, if available, to recover the missing reasons without changing the observed decisions. Give a returning author one concrete edit task and see whether the notebook gets them to the relevant reason and source.

## Time spent

About 30 minutes, using Codex. Most effort went into the base/head and test-evidence audit, then offline page construction and browser checks.

## Verification and limits

See [verification.md](verification.md). Static checks covered the 240 generated HTML pages, source anchors, complete changed-file mapping, and byte equality of the archived patch with the pinned Git diff. Chromium checks covered desktop/mobile layout, keyboard expansion, source-and-back navigation, both illustrative models, and file filtering. No page JavaScript errors or horizontal document overflow were observed at the checked sizes.

The symnav tests are inspected evidence, not a reported test run. Neither symnav worktree's source was modified. “Unexplained” is scoped to the inspected PR body, empty commit bodies, and plans; it is not a claim that the author never had a reason. The inventory accounts for changed paths, not an automated proof of exhaustive intent.

To rebuild while the original input/worktree layout exists, run `python3 build.py` here. To check the finished artifact and its pinned patch, run `python3 verify.py`. Editorial content lives in [content.py](content.py); layout in [page.html](page.html), [style.css](style.css), and [app.js](app.js).
