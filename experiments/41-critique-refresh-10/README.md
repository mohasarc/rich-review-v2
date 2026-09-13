# critique-refresh-10

## Entry point

Open [critique.md](critique.md). The [experiment ledger](experiment-ledger.md) contains one row for each of the 38 finished experiments reviewed.

```sh
open ~/projects/rich-review-v2/experiments/41-critique-refresh-10/critique.md
```

Markdown only; no server or page. Review cutoff: **2026-09-13 03:45:06 UTC**. Experiments 01–38 were finished; 39, 40, and 42 were still running. The initial prototype pass covered 01–37; 38 was incorporated after its completion.

## Kind

critique

## Subjects

None assigned. This critiques the finished experiments, whose underlying subjects are #127, #131, #148, the full stack, and the #146/#147 pair. It does not add a symnav PR review.

## Declared choices

- Role framing: Critic helping the human choose which explanation ideas and unresolved questions deserve another experiment.
- Box lenses: Static ownership, runtime containment, and state lifetime as represented by the artifacts; distinctions between source, authored claim, observed interface behavior, and human understanding.
- Opening style: Six findings in a missing/repeating/promising comparison table.
- Shape: Complete critique, concrete supporting comparisons, one row per finished experiment, then optional inspection receipts.
- Navigation: Read linearly or follow relative links to the ledger, original artifacts, READMEs, methods, screenshots, and pinned source checks.
- Trust posture: Separate direct observations from producer-reported execution and my editorial inference. Check rationale disagreements against historical source. Treat missing human evidence and semantic completeness as unresolved, without scores or symnav correctness verdicts.
- Persona: The person inspecting the overnight collection and deciding what to try next.
- Representations used: Markdown comparison tables, per-experiment ledger, linked original figures, rendered-text captures, and exact source snapshots for targeted attribution checks.
- Importance rule: Consequences for a reader's ability to understand, predict, and reconsider a decision. Distinguish hard-rule gaps from reading-cost tradeoffs; do not rank whole experiments.
- Inputs used (beyond bundle): Philosophy first, then the playbook including required sections 1, 2, 3, 6, and 7; all finished experiment READMEs; all 37 prototype entry surfaces, selected alternate subjects and mechanisms; producer screenshots for 05, 13, 22, 23, 34, 36, and 37; 31's runbook, 32's kit contract and relevant generator/validator source, 33's pair contract/openings, 36's method, and 21's narration. Read 38's complete README, critique, and ledger after it finished. Queue records establish scope. The stack bundle's `pr.json` supplies #127/#148 body and commit evidence; the #148 policy document was read from its pinned git object through the read-only stack worktree. The current policy wording was also inspected to distinguish historical context. The full symnav diff, overview bundles, unfinished critique drafts, and worker transcripts were not used as a new semantic audit.
- Tech: Markdown and JSON; Python for census, source copying, and handoff checks; isolated Chromium/Playwright contexts for reading and selected interactions. No application, library installation, symnav build, or live symnav probe.
- Built on earlier experiment(s): **All finished experiments 01–38 were read and critiqued.** Their individual contributions and limitations are recorded in the ledger. The prototype critique was drafted independently before reading 38. Original rendered text and targeted source passages are retained as receipts; no earlier page implementation was reused.

## What I tried

Started with a completion census and README reading, then opened every finished prototype from disk. Scanned the rendered openings, decision surfaces, and controls; sampled deeper material where a criticism needed a concrete witness. This does not claim every UI state or every duplicated source snapshot was read.

The broad concern about long top layers became a more precise comparison of complete-but-long registers, 13's consequence rows, 23's spatial density, and 34's expert evidence strips. Targeted checks found a timeline idle-event surprise, an explicitly incomplete type-only method, missed historical retirement rationale, and incompatible units behind counts of unexplained decisions.

Exercised 30's worker/delivery/sample gates, 36's stored-versus-returned identity view, 37's independent decision/depth route, 24's linear reading, and alternate subject/opening views in 01, 20, and 33. One wrong browser selector for 01 timed out; the actual link worked. That was a harness error, not an artifact finding. Large capture dumps proved too noisy for the main critique, so the delivered argument uses targeted witnesses and keeps captures below it. No page approach was started or abandoned.

Experiment 38 finished during handoff. Its complete written output was then read and added as a 38th ledger row, with an explicit account of agreement and the limited new findings in this refresh.

## What I would drop

The rendered-text captures and control inventories should stay outside the reading path. Two complete critiques now repeat many observations; later refreshes should preserve one current ledger and make changes since the preceding cutoff explicit. More source mirroring would not resolve the missing reader evidence.

## What I would do next

Compare compact and full stopping surfaces using the same reconciled decision set, and use 33's controlled openings or 30/36's causal tasks with unfamiliar human readers. Keep their specific explanations and misconceptions rather than producing a score or a standard page shell.

## Time spent

About 25 minutes, including reading, browser inspection, late incorporation of 38, writing, and handoff checks. No delegated agents.
