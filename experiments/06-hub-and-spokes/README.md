# hub-and-spokes

## Entry point

Open [index.html](index.html), or on this Mac:

```sh
open ~/projects/rich-review-v2/experiments/06-hub-and-spokes/index.html
```

The page works offline with its adjacent `app.js`, `data.js`, and `style.css`. No installation, server, account, or external service is required. JavaScript must be enabled. The temporary browser-check server has been stopped.

Start with the hub map, try a recorded request, then follow a spoke or decision card. Every diagram node supports keyboard navigation; the return button restores focus to its origin. Wide diagrams and tables scroll horizontally on small screens.

## Kind

page

## Subjects

pr-148. One source excerpt and a comparison column from the #149 stack tip provide cutover context; #149 is not reviewed as another subject.

PR 148 adds the package-owned DaemonClient while the shipped CLI continues through its own frozen compatibility graph. The page keeps that distinction visible throughout.

## Declared choices

- Role framing: architecture guide explaining ownership, composition, and the choices a teammate needs to understand.
- Box lenses: static package ownership; runtime processes, threads, and object lifetimes. The host-process client is distinct from the daemon-process coordinator.
- Opening style: picture first, with the new package hub beside the active CLI hub. The star explicitly groups direct and indirect dependencies; the constructor matrix supplies precise wiring.
- Shape: hub-and-spokes, with DaemonClient at the center and nine dependency families around it. The CLI dispatcher and remote process coordinator explain the surrounding boundaries.
- Navigation: a linear page of top-level decision cards, ten deeper sections, and expandable evidence; nonlinear diagram links, card links, section navigation, and return buttons. Eighteen decision groups carry the facts before descent. Mixed groups separately mark stated and unexplained choices.
- Trust posture: compare intent, source, and recorded behavior. No correctness verdict. An omitted PR-body detail is not automatically unrequested: the policy document explicitly plans the retirement of `policy-testing`.
- Persona: a teammate who knows the repository but not this daemon corner.
- Representations used: interactive SVG hub map, package before/after diagram, responsibility and routing matrices, object-lifetime strips, recorded call sequence, idle timeline, copy inventory, test-declaration inventory, commit bars, and 41 embedded source excerpts.
- Importance rule: first, what users run and which tests exercise it; second, the client contract and shared lifetimes; third, local structural choices. Unexplained choices appear first within each tier.
- Inputs used (beyond bundle): head/base source and tests; Git history for the 45 commits; all four `plans/005` documents; contributor rules; stored executions using the real CLI executor and a generic fixture executor; built-module resolution probes; a narrow #149 wiring excerpt. The bundle's overview files contain headings but no usable symbol output.
- Tech: plain HTML/CSS/JavaScript and SVG; Python packs local evidence. The delivered page reads only embedded data and local assets. It has no comment storage or verdict controls.
- Built on earlier experiment(s): none. Other experiment folders were ignored. I continued the unfinished artifact already in **this same folder**, retained its recordings, audited its claims, and completed it. `harness.txt` records earlier Claude Opus attempts and the final Codex pass.

## What I tried

Kept the existing dual-hub design because a single package star hides the most consequential fact: the CLI has not switched to DaemonClient. The saved executions let the reader follow cold, warm, fallback, status, stop, and disabled paths without starting a daemon from the page.

The exploratory static import graph overestimated executed module membership by following conditional dynamic imports. Runtime diagrams therefore use recorded Node resolution results; the static graph supplies the facade's type-dependency closure. Its limitations are documented in `analysis/graph.py`.

The first draft called ten copied files different “beyond imports.” Three differences are only type import/re-export paths left by the normalizer. The page now explains the normalization and avoids treating text differences as behavioral differences. Git and Python difflib also align four changed lines differently; both totals are identified where used.

A broader policy-document check changed the initial attribution of the removed `policy-testing` subpath: its retirement was planned. Documented migration choices and unexplained implementation choices are now separated on their cards. The retained idle behavior is also shown alongside the functional spec and deferred follow-up.

Fixed inactive links on the old hub, keyboard activation and return focus, mobile page overflow, initial mobile centering on DaemonClient, and clipped diagram labels. Early screenshots are preserved under `analysis/wip-screenshots/`; final screenshots are in [screenshots/](screenshots/).

## What I would drop

The 45-commit bar chart and exhaustive module lists compete with the hub for attention. I would move them into an evidence appendix. Eighteen complete top-level cards are also a substantial reading cost; this version favors keeping every decision visible over a short opening.

## What I would do next

Have a fresh reader explain which implementation ships, where a local replay is allowed, and which objects survive between client calls. Then shorten the top cards only where the diagrams already carry the same fact.

## Time spent

About 1 hour 45 minutes elapsed across attempts, including interruptions; roughly 25 minutes for the final Codex completion and audit.

## Verification and evidence limits

- **68 daemon checks passed:** client execution/control/routing, host contract, package and entry boundaries, and public imports. **Two compatibility-copy checks passed.** Exact output is saved in [verification-daemon.txt](analysis/verification-daemon.txt) and [verification-compatibility.txt](analysis/verification-compatibility.txt). The full suite and Windows execution were not run.
- All **41 embedded excerpts** match their worktree source lines. The three saved real-executor scenarios—cold, warm, and disabled—match across base dispatcher, head dispatcher, and head DaemonClient on mode, exit code, output size, and stored fingerprint. See [verification-data.txt](analysis/verification-data.txt).
- Browser checks exercised all **16 replay controls**, **20 diagram navigation/return paths**, expandable evidence, and widths of 390, 768, 1100, and 1440 pixels. No missing anchor targets, page errors, or clipped SVG text remained. The page requested no external resources. See [verification-browser.json](analysis/verification-browser.json). The card/section check validates references; it is not a semantic proof of the pyramid or a comprehension score.
- Recordings are real executions retained from earlier attempts, not live execution in the page. Highlighting aggregates client calls and correlates daemon-log timestamps; that simplification is marked beside the player. Durations include instrumentation and are not a benchmark. Output fingerprints retain the first 16 hex characters of SHA-256 over stream names and bytes; a matching fixture is not a whole-system parity result.
- Static test counts describe declarations and `expect` calls. `it.each` counts once in that inventory, regardless of generated case count. Counts do not establish coverage or assertion strength.
- “Unexplained” means no reason was found in the inspected PR body, commit messages, plans, and contributor rules. It does not claim that the author had no reason.
- The symnav head and base worktrees remain clean. No symnav source, branch, or commit was changed during this completion pass.

## Rebuilding the evidence bundle

The page already contains the evidence needed to open it. With the provided worktrees and saved `analysis/` outputs still present, run from this folder:

```sh
python3 build.py
```

This regenerates `data.js` from saved analysis and source excerpts; it does not rerun the recorded daemon sessions. The build checks these pinned revisions:

| Tree | Revision |
| --- | --- |
| base | `ba53c8e1662fd86d198b95321c90d9c9bef10184` |
| head | `20838f8dbf413e04767543eb2380d0d114da6c60` |

The probe and inventory scripts are retained in `analysis/` for inspection. They are research receipts rather than a general-purpose review generator.
