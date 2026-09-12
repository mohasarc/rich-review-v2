# boxes-static-vs-runtime

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/05-boxes-static-vs-runtime/index.html
```

The page works directly from disk. No server, installation, account, or network connection is needed. [Both maps in one screenshot](screenshots/01-maps.png).

## Kind

page

## Subjects

pr-131 only — Route daemon thresholds through centralized policy.

Base: `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`  
Head: `b100221db48754656328391b878299c5a0bab443`

## Declared choices

- Role framing: learner examining ownership and mechanism, with explicit evidence for departures from the PR narrative.
- Box lenses: static package/module dependencies and runtime process/thread topology. Both show changed edges. Static arrows point toward dependencies; runtime arrows follow data. The daemon worker is nested inside the daemon process, while all three runtime actors execute app-owned implementations.
- Opening style: a deliberately simplified before/after wiring picture. The central distinction is that the snapshot already traveled across launch boundaries; #131 makes more consumers use it.
- Shape: a complete decision index followed by two coordinated maps and expandable mechanisms. Twelve decision groups cover required inputs, output, resources, clocks, timeout purpose, retry scopes, error selection, fetch failure handling, adapters, changed fixture conditions, test retirement, and source-scan enforcement.
- Navigation: linear reading or direct jumps from cards and diagram boxes into mechanisms, with return links. Shared Before / After / Changes controls and concern highlighting. A source modal provides base, head and diff without leaving the page. Deep links open the target mechanism.
- Trust posture: compare the supplied PR narrative with both revisions. Stated reasons link to the PR or policy record. Specific unexplained choices have the same card treatment as the architectural choices. No verdict, response collection or comment storage.
- Persona: a teammate who knows symnav but does not know this daemon corner.
- Representations used: native SVG diagrams, a before/after intuition strip, shared revision/focus controls, nested retry-scope diagram, capacity and timeout panels, comparison tables, a searchable 39-field policy record, captured source with line numbers, and a manifest of all 60 changed files.
- Importance rule: ownership boundaries first, followed by distinct operational purposes and unexplained behavior/test changes. Test-adapter effects are visible in the complete index rather than first appearing in the evidence layer.
- Inputs used (beyond bundle): both read-only worktrees; all 19 changed production files and the changed tests/helpers/benchmark/meta-test; unchanged policy implementation and policy tests; policy test factory; program composition; process snapshot test and record observer; `AGENTS.md` dependency table; `plans/005/daemon-policy.md`; architecture functional spec; installed Node type documentation for socket inactivity timeout semantics. From the bundle: PR body and six commit messages, full diff, file statistics and repository rules. The supplied before/after overview files contained path headings but no symbol overviews, so they did not provide usable mechanism evidence.
- Tech: HTML, CSS, JavaScript and SVG, with no page dependencies. Python captures evidence into a local JavaScript data file. Playwright/Chromium checks the artifact. Harness: Codex, one worker; no delegated agents.
- Built on earlier experiment(s): none. Earlier experiment contents were deliberately ignored.

## What I tried

The page separates two meanings of “daemon”: the package containing policy definitions and the running daemon process containing app-owned mechanisms. Keeping the launch/worker-data edges gray makes the change in local policy consumption visible without suggesting new processes or a policy service.

I kept diagram geometry stable across revisions. An early static drawing routed green edges behind the retired-defaults box, hiding the connection being explained; those edges now route around it. Source inspection also changed the story: the two delivery recovery scopes already existed in base, even though the PR describes moving away from a shared boolean.

The source pass surfaced details that now appear in the top index: later completion errors can replace the original accepted-close error; the fetch path retains a terminal failure continuation; test adapters alter tiny-limit and directory conditions; the workspace helper retains an unused memory-cap option; benchmark resource records gain replacement fields; and the local derivation suite is deleted while package policy tests already exist. These are source observations with rationale gaps, not correctness verdicts.

The browser checks in [validation.json](validation.json) passed: both revision diagrams, shared focus, diagram-to-mechanism links, source tabs and Escape handling, direct deep links, source/anchor integrity, policy filtering, all 60 changed-file links, SVG text bounds, and a 390 px mobile layout. The page issued no HTTP(S) requests and produced no JavaScript page errors. The screenshots were visually inspected; map screenshots suppress sticky positioning so it does not obscure their headings.

No symnav test suite or daemon runtime trace was run. Both worktrees had clean `git status --short` output at the end. The runtime diagram is explicitly identified as source-derived; the error and fetch explanations are control-flow readings. Grouped module diagrams omit unrelated imports, and the topology shows one launch path and one worker generation.

Captured evidence is in [evidence.js](evidence.js): all 60 changed files in both revisions, their diffs, and 10 unchanged context files. Its totals match the supplied diff: +1,298 / −544. The policy implementation is byte-identical between revisions. Regenerate it with `python3 build_evidence.py` from this folder while the input bundle and worktrees remain available. [check_page.mjs](check_page.mjs) documents the optional browser-check invocation; Playwright is needed only for those checks.

## What I would drop

The in-page 60-file manifest adds more audit convenience than understanding. I would keep the captured files but move that manifest into a separate evidence page. The static map's parallel dependency routes are still busy; the concern filter helps, but a smaller set of diagrams might be easier to scan.

## What I would do next

Try small multiples for the static consumer groups while retaining the shared runtime map. A narrowly recorded before/after spill example could make the changed cleanup-test conditions easier to grasp than the current table.

## Time spent

About 30 minutes, including source investigation, implementation, browser checks and visual inspection.
