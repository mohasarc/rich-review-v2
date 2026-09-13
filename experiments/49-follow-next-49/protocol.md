# Reading protocol and scope

The comparison was assigned from experiment 48's next-step paragraph. The brief names pr-127 as its subject but explicitly requests before-spawn validation (#131), conflicting primary-owner accounts (stack), and two top-statement edits in 23/29 (#148). I treated those named cases as the narrowly authorized comparison scope and used pr-127 as a common substantive control. No other symnav PR was independently reviewed.

The phrase “two flagged top statements” was operationalized before recruiting readers as 23's D13 root outline and 29's A1 decision-map sentence. Experiment 48 also flags 23's optional-policy omission. Its D04 root wording remains untouched as a control. This experiment does not claim to repair all of either page's rule-4 violations.

## Frozen conditions

| Reader | 23 and 29 | Validation passage | Ownership passage |
| --- | --- | --- | --- |
| R1 | Original | 02's input-shapes row | 01's first-owner card |
| R2 | Original | 20's P12 | 14's last-owner summary |
| R3 | Revised | 02's input-shapes row | 01's first-owner card |
| R4 | Revised | 20's P12 | 14's last-owner summary |

All received 20's unchanged complete #127 overview and C1–C5. The full case questions are in the top packets. They ask about an invalid serialized snapshot, A/B ownership, cache release against pending then rejecting cleanup, missing/wrong tokens, policy omission and a backward wall-clock jump. They are prompted consequence tasks, not free recall. The 02/20 and 01/14 excerpts differ in scope and length; those comparisons are not single-variable edits. Neither alternative was manufactured for this run.

The first three readers began in fresh sessions with no conversation fork. R4 began when a concurrency slot became available. Each reader was instructed to read only its specified packet, preserve unknowns, quote support, separate inference from implementation truth, avoid external browsing and other readers, and write only its own response. They were not told whether their 23/29 text was original or revised, and were not shown the prior critique's conclusions. Packet headings identify the case numbers, so this is not an anonymous-page study.

## Phase boundary

1. **Top only.** Rendered top prose, with source and lower explanations withheld. Readers wrote `phase1.md` and stopped.
2. **Seal, then descend.** The parent recorded a SHA-256 and timestamp in `phase1-seal.json` before sending the next packet. Readers received the identical D13, D04 and A1 destination prose and wrote `phase2.md`. Validation, ownership and #127 had no authored descent in this phase.
3. **Seal, then inspect source.** The parent sealed phase 2 before exposing the shared `packets/source.md`. Readers wrote `phase3.md`, separating confirmations, corrections, newly determined facts, and unresolved questions. Prior responses were never rewritten.

The source packet contains selected exact snippets with pinned commits and original line numbers. It gives no prescribed answers. It is shared across conditions. The parent read source and prior critique independently while reader predictions were pending; the readers were fresh, not the experimenter.

Access separation was instruction-enforced in the shared filesystem. It is not a sandbox or proof that a human reader would act similarly. The response files explicitly attest their reading scope; a cryptographic seal proves later file stability, not what an agent internally knew.

## Browser route versus reader exposure

The parent used isolated browser contexts to open local pages, capture their rendered tops, and follow root→D13→Home, root→D04→Home, and overview→A1 reason→return to cut 1 for each variant. Experiment 48's retained destinations are #D13, #D04 and A1's reason disclosure. A1's overview link opens its disclosure automatically. This fact mattered to the capture harness.

23's leaf displays source at the same time as the prose. Reader packets deliberately contain only the leaf heading, before/after explanation and rationale. Therefore this run isolates supplied wording before code; it does **not** observe a source-blind person navigating the actual leaf. 29's source dialogs stayed closed. The capture records identify the removed regions explicitly.

Original and revised 23 data.js are identical, so all leaf prose and evidence are identical. The only 23 change is one outline string in app.js, reused in the existing room/decision covers. Only the first A1 sentence occurrence in 29 index.html changes; its deeper summary and explanation stay identical. No CSS or navigation change was made.

## Attempts and adjustments

- Initial text search across minified data produced excessively broad output. I switched to focused rendered selectors and structured extraction.
- The browser tool's execution context did not provide Node `require` or a dynamic import callback. Captures are returned as JSON and saved through the filesystem tool instead.
- The first A1 route attempt clicked the disclosure summary after the overview link had already opened it, closing it. The successful route checks current open state. This was a harness mistake, not evidence of broken navigation.
- An early geometry measurement immediately after Home found hidden covers because the camera's animation frame had not settled. Final checks bring the page to the front and wait for visible root covers.
- A later overflow check classified the revised 23 process room as clipped because its padding extends 13 CSS pixels beyond the cover. Measuring the actual outline and inspecting the screenshot showed all text inside the visible border, with 6.4 screen pixels remaining at 1440×1000. The final receipt distinguishes content fit from padding overflow. No CSS was changed to improve the measured condition.
- `prepare.py` was replayed after the readings to add the missing copied 29 brief link. All previously studied entry/dependency bytes reproduce the same hashes; the two intervention strings did not change. The rendered capture timestamps and sealed packet hashes retain the pre-reading state. The variant manifest records the latest copy preparation time, not the start of the study.

## Reading limits

These are four sessions of the same available agent model, two per edited condition, with explicit uncertainty instructions. They are not statistically independent samples of human behavior. Conditions were fixed, not randomized. The case order was shared. The #127 passage is substantially longer than the short validation/ownership excerpts. No score, leaderboard, exhaustive decision key, or correctness verdict is produced.

The source packet omits full validation error delivery, base authentication, FIFO discovery, full graph-release internals, base elapsed projection, and grace/idle clock consumers. Readers explicitly distinguish those limits. The parent separately checked the complete #127 diff and its old test-body preservation. It did not run symnav or a production test suite.

The resulting finding is narrow: these edited sentences supply the prompted token and queue-source predictions earlier, while the untouched policy gap and other descent qualifications remain. The first-owner contradiction also shows why successful teach-back alone cannot establish fidelity to source.
