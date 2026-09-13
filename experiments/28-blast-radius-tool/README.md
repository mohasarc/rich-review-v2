# blast-radius-tool

## Entry point

Open [index.html](index.html), or on this Mac:

```sh
open ~/projects/rich-review-v2/experiments/28-blast-radius-tool/index.html
```

The delivered page uses saved data and has no server, CDN, installation or network dependency. Select a decision, then choose **Mechanism**, **References** or **Evidence**. The full decision inventory remains readable without opening those panels.

## Kind

tool + page

## Subjects

pr-131 only: Route daemon thresholds through centralized policy.

Base: `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`  
Head: `b100221db48754656328391b878299c5a0bab443`

## Declared choices

- Role framing: a source-coupling analyst helping a teammate understand ownership choices.
- Box lenses: static policy ownership versus CLI consumers; caller process, daemon process and worker thread placement. Reference files are also grouped by source boundary.
- Opening style: a before/after ownership picture. The existing snapshot becomes a required source of consumer inputs; mechanisms remain in `apps/cli`.
- Shape: a ranked inventory with a small explanation pyramid for each decision.
- Navigation: read all 15 summaries in order, jump from the map or small-count attention links, switch depth in the inspector, follow shared-file decisions, return to the selected row. Decision URLs support direct entry.
- Trust posture: distinguish recorded reasons from unexplained choices. Surface test transformations, deleted assertions, casts and changed error provenance alongside architecture. No verdict or comment UI.
- Persona: teammate who knows the repository but does not own daemon internals.
- Representations used: simplified ownership boxes, runtime placement strip, computed radius bars and counts, before/after comparisons, concept sequences, real reference locations, pinned source excerpts and complete related file diffs.
- Importance rule: distinct external production files in direct `symnav refs`, unioned across each decision's declared seeds and then across base/head. Descending file count; decision ID breaks ties. Tests are counted separately. No weighted risk or correctness score. Zero and unmeasured are distinct, and unexplained small-count decisions have prominent jump links.
- Inputs used (beyond bundle): both read-only worktrees; their built CLI; 40 fresh reference queries (17 base, 23 head); a policy symbol overview and two exploratory reference queries; `plans/005/daemon-policy.md`, the architecture contract and existing package policy tests. Bundle overviews contained headings without symbol data. No implementing-agent transcript was supplied. Author inputs are copied under `data/intent/`.
- Tech: Python standard library collector and verifier; dependency-free HTML, CSS and JavaScript page. Collection used Python 3.11.11 and Node 22.12.0. Browser inspection used Playwright. No source changes, commits or branch operations in symnav.
- Built on earlier experiment(s): none. Earlier experiment artifacts were ignored. The existing brief and orchestrator logs in this assigned folder were preserved.

## What I tried

I first queried `DaemonPolicyValues::output`, intending to rank policy sections by their incoming references. The actual result contained only two references inside the daemon package and missed known CLI accesses such as the executor's `policy.values.output`. The [raw probe](data/probes/output-refs-valid.json) and [symbol overview](data/probes/policy-overview.json) are retained. The cause of this cross-project/type-projection coverage gap was not isolated.

I restarted the measurement around explicitly chosen consumer classes and methods. That produces a traceable footprint, but the seed granularity matters: a class includes consumers of its unchanged members, while a private method can have no external file reach. I avoided a speculative transitive file-import walk.

The resulting inventory covers all 60 changed paths, grouped into 15 decisions. Startup has the widest observed production radius (5 files), then shutdown (4). Eight of the nine nonzero production footprints retain exactly the same base/head file set. Reference reach can order the existing coupling; it does not explain the new input ownership by itself. The page supplies that explanation.

Four decisions have unexplained aspects. Three decisions are explicitly unmeasured because test assertions or string-scanning rules do not have a meaningful symbol-reference footprint. Error provenance has a measured zero external radius, which is a different condition.

## What I would drop

Some generic vertical concept sequences. The ownership map and source before/after comparisons often carry their explanation more precisely. I would also resist making the file counts more visually authoritative: the seed choices and known coverage gap limit what they mean.

## What I would do next

Isolate the missed cross-project policy-field references, then compare rankings from policy-field, method and class seeds while keeping the same authored decision inventory.

## Time spent

About 30 minutes of wall-clock work for this attempt, including reading, collection, implementation and inspection.

## Recomputing the artifact

From this folder, with the supplied built worktrees still present:

```sh
python3 blast_radius.py
python3 verify.py
```

`blast_radius.py --refresh` reruns every query; otherwise raw responses are cached by revision and canonical symbol ID. `--base`, `--head`, `--bundle`, `--manifest`, `--jobs` and `--timeout` are available. The default concurrency is two. Collection sets `SYMNAV_DAEMON=0` and `SYMNAV_TELEMETRY=0`, and directs any state into this experiment's ignored `.state/` directory.

Edit [decisions.json](decisions.json) to change the authored grouping or seeds. The collector checks worktree revisions against the bundled diff, requires all changed paths to be assigned, rejects tracked worktree modifications, resolves each seed exactly and rejects failed or paginated reference results. The page is rendered from the resulting [report.json](data/report.json) / `report.js` pair.

## Counting limits

All seed declaration files are excluded from a decision's external radius, including references between its seeds. Generated files are excluded. Tests, helpers, meta-tests and fixtures are separated from production. Imports, exports, types and usages count by default; the Usage control removes the first three categories. This remains static reference information.

Base/head union compares file paths, not individual unchanged reference locations. A file is counted once even if multiple seeds and many locations reach it. Decisions can overlap; their counts must not be summed. The tool does not infer runtime execution, transitive effects, behavioral consequences, correctness, test coverage or rationale. Selecting seeds and grouping decisions are authored steps, not automatic discoveries.

## Validation

[Ten checks passed](data/verification.txt): deduplication, exclusion of seed files, production/test/generated separation, usage filtering, zero versus invalid/paginated responses, input hashes, the 60-file +1298/−544 inventory, every saved metric against raw references, and every source excerpt and reference preview against its worktree file.

[Browser checks](data/browser-validation.json) exercised all 15 selections, evidence and reference panels, six filter combinations, source expansion, keyboard tabs, direct decision URLs, and mobile selection/return navigation. Screenshots were inspected at 1440×1050 and 390×844; no horizontal overflow or page JavaScript errors were observed. A sample of 12 rendered local links returned HTTP 200. The browser harness blocks `file:` navigation, so inspection used a temporary local HTTP server, which was stopped afterward.

Both symnav worktrees were clean at the end. No symnav correctness or CI verdict is claimed; these checks validate this experiment's computation, evidence and reader interface.
