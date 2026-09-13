# unconstrained-b

## Entry point

Open [index.html](index.html) in a browser:

```sh
open ~/projects/rich-review-v2/experiments/02-unconstrained-b/index.html
```

No server, installation or build is needed. Keep index.html, app.js and style.css together. Evidence and source excerpts also work offline.

## Kind

page

## Subjects

pr-131 only: Route daemon thresholds through centralized policy.

Base b3a6c4fa5 → head b100221db. The page treats the preceding policy snapshot as existing context.

## Declared choices

- Role framing: explain where a limit gets its authority. Assigned angle was free; the chosen angle is following one value through its consumers.
- Box lenses: static package structure and runtime topology, connected by snapshot supply. The worker is nested inside the daemon process; the policy package is not drawn as a service.
- Opening style: before/after supply map. It shows the already-existing snapshot alongside the local sources this PR retires.
- Shape: complete overview, then selectable value paths, mechanisms and evidence.
- Navigation: linear reading plus section/value selection, links from every decision, source dialogs and a return-to-origin control. Escape closes source excerpts.
- Trust posture: compare the stated intent with the actual delta. Test rewrites, deleted tests and changed error selection have the same visibility as architectural choices. No verdict or scoring.
- Persona: a teammate who knows symnav but not this part of its daemon.
- Representations used: package map, nested runtime boxes, before/after decision rows, 39 value paths, response-budget illustration, nested retry scopes, recorded recovery outcomes, storage-path comparison, exact source excerpts and the complete local diff.
- Importance rule: authority and boundary movement first; retain every material decision in the first layer, including unexplained interface choices and test changes. Later layers add mechanics and evidence to those same decisions.
- Inputs used (beyond bundle): the two assigned worktrees; their contributor guide; policy implementation and tests; plans/005 policy record and specifications, including targeted rationale searches; existing built clients; focused memory, recovery and spill probes. The supplied overview files contain headings without symbol output.
- Tech: local HTML/CSS/SVG and vanilla JavaScript; Python generates the artifact from authored content and source. Node and the worktrees' existing Vitest installation were used for probes, not for opening the page.
- Built on earlier experiment(s): none; other experiment folders were not read. This folder already contained an unfinished attempt for the same brief. Its ledger, probe scripts and research were inspected and selectively recovered; original files are preserved in abandoned-attempt-a/.
- Harness: Codex. No subagents were spawned.

## What I tried

The inherited attempt combined a useful value map with mutation-test scores, repeated evidence labels and later-stack material. I archived it and rebuilt the entry point around PR 131's supply boundary. Its out-of-scope material and mutation results are not used by the delivered page.

I retained the 39-field ledger after checking its 106 citations, then reran the focused probes. Those observations helped explain two details without judging the change: a reattached completion can expose a different error, and 14 existing transport tests stop exercising client spills after the adapter raises their inline limit.

The first layout placed the runtime diagram below the overview. I moved it up to avoid introducing a new boundary on descent. I also made stated reasons visible in the first-layer register. Browser checks found a mobile selector overflow; the final layout fixes it and preserves keyboard focus when selections change.

## What I would drop

The main page's 60-row file index duplicates the index in evidence.html. It is the first piece I would remove. The seven-site chunk path is also bulky; it could use a more compact representation without hiding its source links.

## What I would do next

Give a teammate only the first layer and ask them to explain who supplies the limits, which runtime boundaries already existed, and what changed in the test adapter. Use their omissions to revise the opening.

## Time spent

About 30 minutes for this recovery, rebuild and validation run. The inherited unfinished attempt had additional work; its active elapsed time was not reconstructed.

## Validation and limits

- Build checks match the bundle: 60 files, +1,298 / −544, 39 fields and 13 surfaced decisions.
- All 106 recovered value citations passed the source-location check.
- Browser checks exercised all 39 selections at 1440 px and 390 px, source dialogs, keyboard focus, return navigation, the clock selector and recorded recovery outcomes. No script errors, page overflow, broken internal anchors or external requests were observed. The separate diff page contains all 60 file sections.
- Instrumented source tests passed for the two selected files: 41 cases in base and 43 in head. These runs record spill-method calls; they are not a PR-wide validation claim.
- The old and surviving memory recipes agreed on 60,000 tested input pairs. Four scripted recovery scenarios were run against each built transport client.
- Recovery and memory probes used the worktrees' existing dist output; this run did not rebuild symnav or run full CI. Spill observations ran through Vitest against source.
- Both symnav worktrees remained clean. No branches were modified, committed, pushed or rebased.

The clock bar is explicitly illustrative. Recovery and spill examples show recorded code execution. Grouped diagrams are marked where they omit fidelity. “Unexplained” means no reason for that specific choice was found in the PR body, its six commit messages or plans/005; it does not assert that no reason exists elsewhere.

## Files and reproduction

- [index.html](index.html): delivered artifact.
- [evidence.html](evidence.html): complete supplied diff, with a local file index.
- [content.py](content.py): authored decisions, rationales and citations.
- [data/ledger.json](data/ledger.json): recovered threshold inventory.
- [data/artifact.json](data/artifact.json): generated claims, source text and observations.
- [checks/](checks/): build, citation, browser, focused test and reading-audit records.
- [probes/](probes/): retained scripts and freshly recorded outputs.
- [screenshots/](screenshots/): desktop and mobile views.
- [abandoned-attempt-a/NOTE.md](abandoned-attempt-a/NOTE.md): why the previous approach was abandoned. Archived scripts retain their old path assumptions and are not the current entry point.

From this folder, rebuild the page with:

```sh
python3 build.py
```

This needs the assigned input bundle and worktrees. To refresh the focused observations first, with existing builds and Vitest available in both trees:

```sh
python3 probes/run.py
python3 build.py
```

The runner replaces only this experiment's named probe outputs and logs. It instruments methods in memory and writes no symnav source.
