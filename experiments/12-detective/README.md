# detective

## Entry point

Open [index.html](index.html). All scripts, styles, source snapshots, and captured traces are local; no installation or network service is needed by the page.

For the serving path used in browser verification, run:

```sh
python3 -m http.server 8912 --bind 127.0.0.1 --directory ~/projects/rich-review-v2/experiments/12-detective
```

Then open [the page on localhost](http://127.0.0.1:8912/index.html). The temporary verification server was stopped. Direct-file opening was not empirically verified; see [validation.md](validation.md) for the browser-tool restriction and headless-launch timeout.

## Kind

page

## Subjects

pr-148 only, against its PR-147 base. The stack architecture spec supplies the motivating context. No additional PR was treated as a subject.

## Declared choices

- Role framing: detective; start from the contributor symptom that a host must understand daemon mechanisms, then follow the actual composition sites to the ownership changes.
- Box lenses: static package/module structure, plus runtime process/thread topology. The page distinguishes package ownership from the still-active CLI consumer path.
- Opening style: reconstructed contributor symptom, illustrated as one command arriving with six mechanism dependencies. It is explicitly not a captured end-user incident.
- Shape: a case brief followed by six connected evidence trails. The complete brief exposes 24 grouped decisions, including preserved behavior, deferrals, and changed test scope.
- Navigation: linear clue order; direct links from the overview and every clue to detail; decision dialogs with reasons and source tabs; return links; a searchable file inventory. No comments, verdict controls, or stored reader responses.
- Trust posture: trace stated intent to code, then surface details that do not fit a simple “move files” explanation. Distinguish a stated architectural aim from an unexplained implementation or test choice.
- Persona: a teammate familiar with symnav who does not know this daemon corner.
- Representations used: motivating picture, before/head ownership diagrams, host contract boundary, process/thread lanes, staging sequence, measured source hashes, ordered guard playback with side-effect counters, route table, retry fork, registry coordinate map, illustrative idle timeline, test-scope comparison, exact source/diff viewer.
- Importance rule: start with the host’s composition burden and the active consumer boundary; then side-effect and replay boundaries; then authority and timing; give test deletions, narrowed assertions, and unexplained choices their own equally visible clue.
- Inputs used (beyond bundle): both provided worktrees; local architecture and follow-up functional specs; exact base/head source; git revision IDs and selected file history; existing package/meta-test execution; a controlled probe of the built routing classes. The bundled PR body, commits, full diff, file statistics, and relevant repository-rule searches were used. The overview files contained headings without useful symbol output and were not used as evidence.
- Tech: dependency-free HTML/CSS/classic JavaScript; Python for source capture; a Node script for actual guard execution; Playwright for browser checks. Source text is escaped in the viewer. No analytics, external fonts, fetch requests, or storage APIs.
- Built on earlier experiment(s): none. I listed earlier README paths to see what existed, but did not read or reuse their contents.

## What I tried

I followed the PR’s claimed symptom to `DaemonCommandDispatcher.createRuntime`, then checked whether the new client replaced it. Both that dispatcher and lifecycle registration are byte-identical to the base. That made staging the central clue: a new owner exists while the consumer stays connected to its compatibility graph.

Instead of inventing a bug reproduction, I used a clearly reconstructed host scenario. For a concrete mechanism exhibit, I executed the actual routing guards on fourteen constructed record/observation scenarios and recorded their calls. The initial case deliberately combines “starting” with “wrong version” so the first-decision rule is visible as work that never occurs.

The source pass also exposed the changed witnesses: generic worker tests lose CLI duration assertions, a worker/version rejection assertion becomes a direct CLI-factory assertion, policy-testing checks are retired, the new clock scan covers one folder, file parallelism is disabled, and Windows cleanup gets a different expectation. All appear in the complete brief. No coded prototype was abandoned.

## What I would drop

The complete 153-file inventory could live on a separate evidence page. It adds bulk after the investigation is understood; the focused excerpts do most of the explanatory work.

## What I would do next

Give the page to a fresh reader and ask them to sketch the still-active CLI path and explain when a lost warm answer may be replayed. Use what they miss to tighten the brief without hiding its exceptions deeper down.

## Time spent

Approximately 34 minutes wall-clock. Built with Codex; no subagents spawned.

## Validation and limits

The head build succeeded. Fourteen selected daemon-package test files passed (153 tests), and two selected meta-test files passed (8 tests). Browser checks exercised every decision dialog and its source tabs, all fourteen trace scenarios, diagram switching, file filtering, keyboard dismissal, and desktop/mobile layout. Both symnav worktrees remained clean. See [validation.md](validation.md), [package-checks.log](package-checks.log), and [meta-checks.log](meta-checks.log).

The page is an explanation, not a correctness verdict. There was no full workspace or end-to-end parity run. The Windows expectation was read, not executed on Windows. The guard capture uses real compiled code with constructed inputs, and does not exercise sockets, startup, the CLI, or the full client. Its method is stated at the exhibit. The idle timeline is illustrative.

The reason labels describe the supplied evidence: all 45 commit bodies are empty; the PR and specs contain the architectural reasons. A test describing a choice is not automatically a rationale for that choice. The seven unexplained decisions retain that distinction, even where a broader preservation or ownership goal is stated.

## Files and reproduction

- [brief.md](brief.md): the received brief.
- [index.html](index.html), [style.css](style.css), [page.js](page.js): the reading surface and interactions.
- [case-content.js](case-content.js): the 24 decisions, rationales, and 60 source references.
- [evidence-data.js](evidence-data.js): 247 frozen revision snapshots and all 153 file deltas, plus PR metadata and guard captures.
- [evidence-manifest.json](evidence-manifest.json): revision IDs, raw-byte source hashes, counts, and unchanged consumer comparisons.
- [route-probe.mjs](route-probe.mjs), [route-results.json](route-results.json): the probe and its fourteen recorded executions.
- [build-evidence.py](build-evidence.py): rebuilds the local evidence bundle from the specified input/worktree layout.
- [screenshots/01-desktop.png](screenshots/01-desktop.png), [screenshots/02-routing.png](screenshots/02-routing.png), [screenshots/03-mobile-routing.png](screenshots/03-mobile-routing.png): captured page views.

To regenerate evidence for these exact revisions, first build the head worktree, then run `node route-probe.mjs` and `python3 build-evidence.py` from this experiment folder. The existing page can be opened without the worktrees or either regeneration tool.
