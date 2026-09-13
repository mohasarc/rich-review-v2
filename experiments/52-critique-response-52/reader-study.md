# Separate-reader protocol

**State: prepared; no participants and no reader observations in this run.** This document is for the facilitator, outside the read-only PR explanation. The actual results file is [reader-results.md](reader-results.md). It contains no simulated answers.

## Assignment and exposure

Use two different people who have not read PR 131, its diff, its implementing discussion or this experiment’s ledger/findings. They may know TypeScript and the general repository; record that background in their own words. Do not use the author as a participant. Readers of the same PR in earlier experiments are not unfamiliar for this trial.

Randomize the two people between packet A and packet B before either starts. Packet A’s entry is [reader-a.html](reader-a.html); packet B’s is [reader-b.html](reader-b.html). The facilitator’s mapping is A = fuller, B = compact. The pages have the same title and no crossover links. Give each reader only their own entry and [reader-instructions.md](reader-instructions.md), not this mapping, the hub, source files or prior critiques.

Use the same desktop viewport, preferably 1440 × 950, for both readers. Do not constrain reading time. Record actual device and window dimensions; the effect changes on mobile. The packets are isolated by assignment and instructions, not by a security boundary. Participants can technically reach other files in the folder; record exposure deviations rather than claiming enforced blinding.

## First pass, before prompts

Each reader follows the page from its opening through “You can stop here” and does not descend. Close the page. Ask only: “Explain what this change makes the system do, where the responsibility now sits, and which choices still need context.” Retain the account verbatim in a research note outside the PR page. Do not correct it or supply missing topics.

## Unshown-case questions, still closed page

After preserving the unrestricted account, give both readers these exact questions in the same order:

1. A teammate wants a result-transfer resume setting of two to guarantee another fetch after the first fetch fails. What would you tell them from this change, and what would you need to check?
2. Two callers send the same `identify` request. One is aggregating daemon status and the other is doing ordinary lifecycle work. What selects their wait, and would this tell you how long an already accepted navigation may run?
3. A transport cleanup test asks for inline zero and supplies one 64 KiB record; its client directory is empty at the end. What did the assertion establish, and what did it leave uncertain? How would a workspace helper with inline zero and a two-byte result cap differ?
4. The first execution connection closes after acceptance. The next attachment is accepted and then fails during completion with a different error. Which error’s origin matters to this change? What if opening the next attachment had failed before acceptance?

Ask which representation or phrase the reader remembers using. These are qualitative probes, not a hidden scoring key. The ledger is an editorial account to be challenged, not a gold answer list. Record uncertainty without marking it wrong.

## Descent and revision

Reopen the same page. Let each reader choose the mechanism/evidence route that would resolve their uncertainty; they may inspect any supplied source after this point. Ask them to identify the exact phrase or code proposition that changed, narrowed or confirmed their account, and the overview statement they had connected it to. Record the before/after wording and path. A new function spelling alone is not automatically a surprise on descent; a new condition or outcome can be.

Do not show the other layout, these findings or the other reader’s responses until both independent passes are sealed. If later discussing both layouts, label it crossover discussion and keep it out of the initial comparison.

## Observations to retain

Keep each reader’s background, assigned packet, viewport, exposure deviations, literal first account, responses to the four questions, chosen paths, representation citations and exact revisions in separate research files. No approve/reject or comment storage belongs in the artifact. Do not compute a score, winner, pooled recall percentage or “time saved” claim from two people.

Compare the two records with concrete statements: what one account included, what the other qualified only after descent, and which representation each named. Different outcomes may reflect reader differences; a two-person trial would supply cases for further investigation, not causal proof of a layout advantage. Additional fresh readers can repeat the same assignment without changing the content.
