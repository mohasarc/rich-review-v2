# negative-space

## Entry point

Open [index.html](index.html), or run:

```sh
open ~/projects/rich-review-v2/experiments/18-negative-space/index.html
```

No installation, build, server, or network connection is needed. Keep `style.css`, `app.js`, and `evidence.js` beside the HTML. JavaScript enables the outline, comparisons, and evidence drawers. GitHub links are optional exits from the evidence layer.

## Kind

page

## Subjects

pr-148 only. Base `ba53c8e1662fd86d198b95321c90d9c9bef10184`; head `20838f8dbf413e04767543eb2380d0d114da6c60`.

## Declared choices

- Role framing: Teach the change through what it leaves alone, and make the different meanings of “untouched” explicit.
- Box lenses: Source ownership and the active CLI call graph; host/package contracts; ownership authority; the time interval consumed by a navigation turn.
- Opening style: A marked call-path metaphor followed by a diagram with an intentionally missing CLI-to-DaemonClient connection. The base/head control shows package staging while the shipped route remains.
- Shape: One page with a complete eight-part decision outline, eight corresponding chapters, then source evidence reachable at the point of explanation.
- Navigation: Read top to bottom, use the numbered rail, jump from diagram elements or outline entries, and return through each chapter's Outline link. Source drawers close with Escape and restore focus.
- Trust posture: Attribute stated reasons to the PR, architecture contract, and recorded purposes; mark unexplained constructor and test choices. Distinguish byte equality, textual relocation, intended behavior preservation, and deferred behavior. Tests specify choices without necessarily explaining their reasons. No correctness verdict or claim that symnav tests passed.
- Persona: A reviewer unfamiliar with this daemon stack who needs to understand which boundary moved and what still runs.
- Representations used: Ownership diagram with snapshot comparison; unchanged-directory counts; an interactive 38-file freeze inventory; host/daemon exchange diagram; protocol and policy comparison; idle timeline with two scenarios and a separate mobile rendering; registry authority diagram; seven routing walkthroughs; replay branches; a test evidence ledger; embedded numbered source excerpts and per-file diffs.
- Importance rule: Give exclusions and test changes the same weight as the new facade. A file's relocation volume does not determine its importance.
- Inputs used (beyond bundle): Both supplied worktrees, immutable Git objects at the pinned commits, selected commit diffs, the head contributor guide, architecture and follow-up specifications, and changed source/test files. From the bundle: `pr.json`, `files.txt`, `diff.patch`, and relevant `repo-rules.md` sections. The generated overview files were not used. No external conversation transcript or original agent request was available.
- Tech: Plain HTML, CSS, JavaScript, inline SVG; Python standard library and read-only Git commands for evidence generation. System fonts; no remote assets, frameworks, storage, analytics, or comment controls.
- Built on earlier experiment(s): none. Earlier experiments were deliberately not read or reused. No sub-agents were spawned.

## What I tried

I began by looking for untouched directories. That produced a useful frame: all 254 tracked files in core, backend, renderer, telemetry, and command implementations match the base. But it could not explain the migration on its own.

The compatibility freeze supplied the stronger experiment. Its 38 tiles divide into 26 byte-identical files and 12 files edited or renamed before freezing. That distinction became the opening: a frozen staging graph is different evidence from an unchanged implementation or an unchanged production caller.

I also tried treating copied mechanisms as simple relocation. A textual comparison rejected that description for the completion spool: it gains a local codec to remove a CLI output dependency. The page keeps that exception. Six other selected bodies match after the disclosed import/whitespace normalization; the table makes no semantic-equivalence claim.

The idle example uses source-derived arithmetic rather than a daemon simulation. It shows a five-minute and a forty-minute turn against the existing thirty-minute acceptance deadline, alongside the explicitly deferred completion reset. The separate readiness reset appears in the outline and chapter as another deferred behavior.

Finally, I traced the test movement instead of treating renamed tests as unchanged coverage. The outline surfaces the deleted CLI entry tests, replaced CLI worker path, restored executor-factory version check, removed duration assertions, retired lint checks, and serial runner setting. No second page was needed; the initial all-unchanged framing was revised in place.

## What I would drop

The seven-file relocation table is the least essential representation. It is useful for checking the explanation, but duplicates some work better served by the source drawers. The complete outline is intentionally dense; it is the costliest part to read.

## What I would do next

Watch a reader explain why the production route remains local and why only 26 frozen files match the base. Then test whether the long-turn example makes the deferred completion reset predictable without opening code.

## Time spent

About 30 minutes, including source investigation, implementation, browser checks, and documentation.

## Evidence and validation

Rebuild [evidence.json](evidence.json) and its browser-ready twin with this command from the rich-review-v2 root:

```sh
python3 experiments/18-negative-space/audit.py
```

The audit reads Git objects, not current build output. It asserts directory path/blob equality, reproduces the 38-file compatibility hash, counts the 37 relocated mechanism tests, and checks that the four edited e2e files only change helper names and formatting. All 93 e2e snapshots and all 295 shared testing files match. The script writes only these two evidence files in this experiment directory.

[validation.json](validation.json) records the browser checks: both snapshot states, 41 nonempty source drawers with focus restoration, changed/unchanged freeze tiles, seven route scenarios, both idle scenarios, working internal anchors, and no horizontal overflow at 1440, 390, or 320 pixels. The page produced no JavaScript errors; `node --check` passed. Five [screenshots](screenshots/) capture desktop and mobile views.

Symnav tests and before/after daemon workloads were not run. The worktrees and symnav branches were not modified. All behavior claims are scoped to stated intent, inspected source, or explicitly marked illustrations; source equality is not runtime parity.

Operational `harness.txt` and `worker-attempt-*.log` files, if present, belong to the surrounding runner and are not page dependencies.
