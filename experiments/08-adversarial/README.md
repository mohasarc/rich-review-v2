# adversarial

## Entry point

Open [index.html](index.html) directly in a browser. Keep its adjacent assets and `sources/` folder together; no server, installation or network access is needed.

## Kind

page

## Subjects

pr-131, pr-148

## Declared choices

- Role framing: adversary required to present the evidence that limits each accusation.
- Box lenses: package and module ownership, caller/daemon/worker topology, and which implementation each test suite reaches.
- Opening style: paired orientation diagrams followed by three consequential qualifications: changed stimulus, changed failure outcome, and changed test reach.
- Shape: two subject pyramids containing 14 visible decision records. Each names the choices, worst honest reading, counterevidence and an architectural question before opening mechanism and source detail.
- Navigation: continuous reading, numbered subject links, native disclosures, return controls, and local source links with line anchors.
- Trust posture: distinguish stated reasons from unexplained choices; keep unrequested behavior changes and weakened test stimuli explicit. No correctness verdict or reviewer-output storage.
- Persona: a teammate who knows the repository but does not own the daemon corner.
- Representations used: box maps, before/after tables, a recorded recovery trace selector, illustrative spill and routing selectors, source excerpts, full local snapshots and a changed-path map.
- Importance rule: lead with changes to the PR's promise or evidence, then ownership boundaries and unexplained choices. No numerical ranking.
- Inputs used (beyond bundle): the four worktrees and their local instructions, source and test bodies, architecture/policy/follow-up documents, moved-test inventory, and three probes reproduced in private temporary source copies.
- Tech: static HTML, CSS and JavaScript; Python generation and evidence scripts; Playwright browser checks. Current authoring and verification used Codex.
- Built on earlier experiment(s): none. Other experiment folders were ignored. Incomplete earlier attempts in this same folder supplied exploratory scripts; selected observations were independently checked and reproduced. Their remaining logs are retained but not used as page evidence.

## What I tried

I followed suspicious changes back through both source versions and the tests that could actually distinguish them. This produced a concrete spill-stimulus loss in PR 131, a changed error after reattachment, and stricter registry identity matching in PR 148. It also weakened some accusations: recovery scopes were already separate on base, many removed tests have successors, and the shipped CLI retains integration coverage while mechanism tests move to the package.

Broad inherited coverage and mutation results did not become a correctness score. The page uses bounded observations with explicit limits instead. There was no abandoned page implementation. A source audit corrected overstatements about custom timeout tests and diagnostic queue testing. [Verification details](verification.md) document the runs, browser checks, reproduction commands and limits.

## What I would drop

The 213-path inventory is useful as an audit fallback but adds little to ordinary reading. The full first layer is also dense; its 14 records preserve the decisions at the cost of a long scroll.

## What I would do next

Ask a fresh reader to explain which implementation each test family reaches and which observations narrow the PR's promise. Use the omissions to revise the first layer.

## Time spent

Approximately 35 minutes for this authoring and verification attempt, excluding the incomplete exploratory work inherited in the same folder.
