# method-runbook

## Entry point

Open [index.html](index.html) for the PR explanation. Open [method.html](method.html) for the runbook and [record.html](record.html) for its execution record.

```sh
open ~/projects/rich-review-v2/experiments/31-method-runbook/index.html
```

All three HTML files work directly from disk, without a server, network access, or dependencies. The original procedure is [RUNBOOK.md](RUNBOOK.md).

## Kind

method

## Subjects

pr-127 only. Base `a1e325a5ff979bdfa25babc5554621c8c0f20497` → head `64919bcbcf7fcc8202779b78c5f069b24662bb18`.

## Declared choices

- Role framing: learner, with an operator's audit trail alongside the teaching page.
- Box lenses: static package/module ownership and cache/release lifecycle. The service owns a scope instance whose implementation lives in core; the inherited graph and concrete TypeScript project are distinct units.
- Opening style: a before/after package picture, then refresh and release call paths. Simplifications are marked beside the pictures.
- Shape: one complete overview with twelve visible decisions, followed by the same decisions at mechanism and source depth.
- Navigation: linear reading, direct anchors from maps and decisions to detail, automatically opened evidence disclosures, return links from each excerpt and mechanism.
- Trust posture: source-grounded explanation; distinguish declared intent from stated rationale; expose broad plan/API tensions without a correctness verdict.
- Persona: teammate familiar with the repository but unfamiliar with this corner.
- Representations used: package containment diagram, lifecycle lanes, before/after contracts, decision cards, one illustrative promise-identity trace, exact source excerpts, diff-assignment matrix, test inventory, and a procedure flowchart.
- Importance rule: moved ownership/lifetime boundaries first; qualifications and unexplained choices next; supporting contracts and tests last. Dependency-based overrides are recorded in [ranking.md](ranking.md). No scores or decisions dropped for brevity.
- Inputs used (beyond bundle): base/head source snapshots of all changed files; public backend exports; inherited core `ProjectGraph.releaseTransientResources`; concrete TypeScript semantic-project cleanup; definition/callee async entry points; root worktree instructions; relevant architecture-spec passages; keyword searches through worktree plans; touched-file commit messages. Full bundle read except unrelated sections of the large rules compilation; searched the whole compilation and read its relevant architecture section. The supplied overviews contain no usable semantic output. No network research or runtime trace.
- Tech: Python standard library for snapshot capture, authored extraction, rendering, and structural verification; self-contained HTML/CSS; a small anchor/disclosure script. Codex harness. No sub-agents spawned.
- Built on earlier experiment(s): none. Earlier artifacts and READMEs were deliberately ignored. The supervisor-provided brief, harness record, and worker log in this folder were retained.

## What I tried

Wrote and froze the runbook before opening the PR body or diff, then followed its extract → rank → render sequence. The trial preserves 32 source copies, 15 diff regions, assignments for all 391 added and 67 removed lines, 12 decisions, 33 mapped detail claims, 47 source excerpts, and the changed-test inventory. Eight decisions have stated reasons; four have no specific rationale located in the bounded corpus.

A one-sentence complete top (“core clears six caches per turn”) concealed too much and was dropped. The complete overview now includes awaited release, failure-only qualifications, reusable handles, public API changes, and test decisions. The core clearing-order reason was initially tempting to use for the entire release change; it is kept separate from the unexplained rationale for changed completion/error visibility.

The precomputed overviews were empty, so extraction used source directly. An initially ambiguous project box was split after reading the inherited async graph and synchronous concrete cleanup. Rough maps were encoded directly in the renderer rather than saved as separate intermediate drawings; this deviation is recorded. The browser harness blocks file URLs, so browser validation uses a temporary loopback server.

The extraction is human-authored Python data. Scripts compute coordinates, coverage, and HTML; they do not discover semantic decisions or certify the pyramid invariant. The frozen procedure is unchanged. [run-log.md](run-log.md), [ranking.md](ranking.md), and [record.html](record.html) keep the actual path and limitations visible.

## What I would drop

The full raw source copies could be reduced to the excerpts plus hashes for a single-use page. Repeated before/after panels in the mechanism layer add less than the evidence links. Twelve full cards preserve completeness but make the overview longer than I would want for routine use; I would keep the facts while testing denser presentation.

## What I would do next

Give only the frozen runbook to another operator on another PR, then have a fresh reader attempt a boundary/decision teach-back. The current trial cannot establish reproducibility across operators or actual understanding.

## Time spent

About 27 minutes (02:32–02:59 UTC), including source reading, procedure writing, extraction, rendering, and verification.

## Reproduce and inspect

Rebuild the three pages from the frozen experiment files:

```sh
cd ~/projects/rich-review-v2/experiments/31-method-runbook
python3 render.py
python3 verify.py
```

`extract.py` reconstructs `ledger.json`, `coverage.json`, and `pyramid-map.json` from the authored claims and copied sources. `capture_sources.py` is a separate source-acquisition step that requires the original bundle and worktrees; it checks the exact commit comparison. It is not needed to open or rebuild the pages.

See [validation.json](validation.json) and [browser-validation.json](browser-validation.json) for the recorded checks. Source hashes, excerpt coordinates, all changed-line assignments, overview/detail mappings, local links, and README structure pass. All three pages fit desktop and mobile widths; a full evidence/return route, keyboard activation, and direct evidence URL pass with no browser errors. An early event-timing assertion failure is retained and explained in the run log. The PR's tests were inspected, not executed. No symnav branch, worktree source, shared index, or other experiment was modified; no verdict or comment interface exists.
