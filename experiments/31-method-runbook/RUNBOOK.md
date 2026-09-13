# Extract → rank → render

Version 1, written before reading PR 127's body or diff. This is an operator procedure, not an automatic explanation generator. The trial will preserve this version and record deviations separately.

## Intended result

A teammate who knows the repository but not this corner can stop at a complete overview, or follow one decision down to mechanism and source. The document explains the change; it never offers a correctness verdict or collects responses.

```text
source bundle + base/head snapshots
             │
     EXTRACT │ behavior, boundaries, decisions, reasons, tests
             ▼
      evidence-linked ledger ───── uncovered diff regions ↺
             │
        RANK │ order by consequence; never delete for brevity
             ▼
       complete overview ───────── unannounced detail ↺
             │
      RENDER │ picture → decision → mechanism → evidence
             ▼
       openable teaching page + auditable run record
```

## 0. Start a bounded run

1. Read the experiment constraints and applicable repository instructions. Record the assigned subject, input paths, output path, reader, and whether earlier experiments were consulted.
2. Record base/head commit identifiers and input hashes. Check that the supplied diff agrees with those snapshots. Do not fetch newer PR state: the snapshot is the subject.
3. Keep all scripts, copied evidence, logs, and output in the experiment directory. Never mutate source worktrees. A runtime check is optional; if used, inspect its side effects first.
4. Create a run log with stage start/finish times, discoveries that changed the explanation, and failed or abandoned approaches. Do not rewrite this as an idealized history later.

**Output:** `run-log.md`, `source-manifest.json`.

**Exit gate:** one explicit comparison boundary and one explicit reader. If sources disagree, preserve the discrepancy and label the affected claim; do not silently choose.

## 1. EXTRACT: inventory before storytelling

### 1a. Read intention, then implementation

Read the PR body and commit messages for the promised outcome and stated reasons. Next read the entire diff, including tests and documentation. Then read enough surrounding base/head source to see callers, ownership, and lifetimes. Search the supplied plans for the particular mechanism. Stop expanding context when those boundaries and every changed region can be accounted for.

Keep two separate questions: **what happens?** and **why did the author choose it?** Source code can answer the first. A reason needs a passage from a PR, commit, plan, or transcript; a plausible engineering benefit is not that passage.

### 1b. Make an atomic ledger

Assign stable identifiers to behavior claims (`C…`), decisions (`D…`), source excerpts (`E…`), and diff regions (`H…`). A decision is any chosen change to ownership, scope, API, algorithm, policy, default, exception, test contract, or documentation contract. Group syntax-only edits with the choice they implement. Split a choice when it has a different rationale or independently meaningful consequence.

For each decision, record:

| Field | Required content |
| --- | --- |
| `id`, `title` | Stable identity and a concrete choice |
| `before`, `after` | Observable behavior or ownership on each side |
| `consequence` | What a reader must remember to reason about the choice |
| `reason_status` | Exactly `stated` or `unexplained` |
| `reason` | Author's reason, with excerpt reference; or the scope searched with no reason found |
| `intent` | Explicitly requested, supports a request, or not located in supplied intent; cite it |
| `evidence` | Exact path, side/revision, line range, and copied excerpt |
| `regions` | Every changed region implementing the choice |
| `box`, `boundary` | Owner and the boundary affected |
| `parent` | Overview element that will announce this choice |
| `mechanism` | Fidelity to add below that overview element |

Use `stated` only when the cited passage explains this choice at this granularity. If a plan explains the general architecture but not a particular fallback, mark the architecture stated and the fallback unexplained. Preserve the general reason as context without laundering it into a specific reason.

Extract unchanged facts only when needed to understand the change. Record them as context claims, not new decisions. Alternatives may be useful, but explicitly identify any alternative invented by the explainer.

### 1c. Inventory every changed test

For each changed test region record the assertion or fixture change, what behavior it demonstrates, and whether an old assertion was removed, narrowed, replaced, or retained. Test evidence has the same decision status requirements as architecture. Record text inspection separately from actual execution. Do not infer performance, memory, correctness, or coverage from a passing test count.

### 1d. Close extraction

Build a matrix assigning every added/removed diff line to at least one decision or a documented mechanical consequence. Read the matrix in file order to catch changes missed by the architecture story. Read it in decision order to catch duplicated claims. An unassigned line sends the operator back to extraction.

Draw two rough maps: static units and a second lens suitable to the subject (lifecycle, data ownership, topology, etc.). Each map names the relevant contents, interactions, and boundary moved. Mark unchanged boundaries as context only where they prevent confusion.

**Output:** `ledger.json`, `coverage.json`, evidence excerpts, test inventory, rough maps.

**Exit gate:** all changed lines accounted for; every choice has provenance or explicit absent rationale; test removals and unrequested changes are visible. Mechanical coverage is not proof of semantic completeness: perform the file-order reread too.

## 2. RANK: order without concealing

Use this ordering rule, without numerical scores:

1. Choices that change the principal ownership or lifetime boundary.
2. Exceptions, unexplained choices, changes not found in the supplied intent, and weakened/deleted tests that qualify the principal claim.
3. Supporting implementations and test/documentation contracts.

Break ties by dependency: explain the thing a reader needs before its dependent mechanism. Record any editorial override in `ranking.md`. Ranking chooses order and visual space, never whether a decision is shown.

Group decisions into the smallest set of overview elements that still states every independent consequence. Each decision must retain a visible title, before/after or consequence, and reason status in the overview. A broad heading such as “other changes” is not an announcement.

Construct the overview before writing detail. For each proposed lower section ask:

> Could a reader be surprised by a policy, exception, tradeoff, test change, or rationale gap here after reading only the overview?

If yes, expand its parent. Do not fix this by deleting evidence or calling an important fact “detail.” The top may be longer than the initial ambition. Precision about lines, symbol names, and step order is deeper fidelity; a previously undisclosed behavior is a pyramid violation.

Write a `pyramid-map.json` assigning each detail claim to an explicit overview statement. Read it in reverse, bottom to top. Then read only the overview and attempt a short teach-back of boundaries, decisions, and unknown reasons. This is an author self-check, not a fresh-reader experiment.

**Output:** `ranking.md`, ordered ledger, `pyramid-map.json`.

**Exit gate:** no orphan decision or behavior claim; importance rule and overrides recorded; overview stands alone without GitHub. A mapping validator catches missing links, not whether the parent's prose really entails the child.

## 3. RENDER: compile the model into a teaching surface

1. Put a quick picture or concrete run near the beginning. If it simplifies reality, label the simplification next to it. Give the reader the shape before names and mechanics.
2. Show the two box maps. Use containment for ownership and arrows for interactions. Highlight the boundary that moved. Include package/module context alongside the dynamic lens.
3. Render all ranked decisions visibly in the complete overview. Do not hide overview decisions in closed accordions, hover states, tabs, or filters. Give each a direct route to its deeper explanation.
4. Add mechanism sections in the same order. Reuse the same nouns and visual grammar. Use a worked example or state/contract table where it clarifies something the diagram cannot show. Do not duplicate a diagram with a paragraph.
5. Place source excerpts under the matching mechanism. Preserve revision, path, line numbers, and enough context to check the claim. Raw source is an optional evidence layer. Its relevant behavioral implications must already be announced above.
6. Provide both a linear reading path and anchors from every high-level element to detail, plus return links to the originating overview element. Native links and disclosure widgets are sufficient.
7. Keep the artifact read-only. Navigation and illustrative state changes are allowed; verdicts, feedback forms, or stored comments are not.
8. Generate from the ledger when practical so decision titles, statuses, and source references cannot drift across layers. Manual diagrams remain explicit authored work; do not claim this step is automatic semantic extraction.

**Output:** self-contained `index.html`, reproducible renderer, linked runbook and run record.

## 4. Verify the artifact, then stop

Check source references and hashes, diff coverage, all internal anchors, decision-to-overview mappings, and presence of the required README headings. Open the page in a browser at desktop and narrow widths. Follow one complete route from overview through mechanism to evidence and back. Check the other links mechanically; inspect diagram legibility, keyboard navigation, and browser errors. Save the result and a screenshot if useful.

This verifies the artifact and the recorded method. It does not certify the PR, establish that a human learned, or prove an exhaustive decision inventory. List those limits candidly.

Write the README with the required experiment contract, including choices, discarded attempts, what to drop, what to try next, inputs actually read, earlier experiment reuse, and rough wall-clock time. Preserve deviations in the run log. Stop after the deliverable is complete; do not update shared indexes or other workers' folders.

## Recovery rules

| Symptom | Action |
| --- | --- |
| The title explains less than the diff | Extract the extra decisions and announce them above |
| A reason sounds obvious but has no passage | Mark unexplained; name the searched corpus |
| A map could describe the old code equally well | Draw old and new; identify the changed edge or enclosure |
| The top grows beyond a screen | Keep it complete; improve grouping and pictures before cutting facts |
| Reading source adds a new consequence | Promote it to the overview and rerun the pyramid check |
| Verification needs unsafe source mutations | Skip that runtime check and disclose the narrower evidence |
| The method turns into diff paraphrase | Record the failure; rebuild around boundary and consequence |

The repeatable unit is the chain **source → decision → visible overview → mechanism → evidence**, with two feedback loops: uncovered source returns to extraction; surprising detail returns to ranking.
