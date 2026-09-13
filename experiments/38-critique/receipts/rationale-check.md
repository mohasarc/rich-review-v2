# A rationale label checked against the pinned record

This check concerns the explanation's attribution, not whether symnav's implementation is correct.

## Policy-testing retirement in #148

The [23 decision inventory](../../23-zoom-canvas/decision-inventory.md) gives D03 the status unexplained and says no reason for the timing of removal or the deleted lint checks was found in the PR, commits, or plans. The record groups subpath removal, its lint gate, and associated tests.

At #148 head 20838f8dbf413e04767543eb2380d0d114da6c60, plans/005/daemon-policy.md has a “Migration access” section. Line 66 states:

> Phase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local. The subpath exports only `DaemonPolicyTestFactory` and production imports are rejected by lint and meta-tests.

The full document is preserved in [pr-148-daemon-policy.md](pr-148-daemon-policy.md), with its revision, path, and SHA-256 in [policy-source.json](policy-source.json). It was obtained using read-only git show from the assigned stack-head worktree, at the PR's historical head rather than the current tip.

The [06 README](../../06-hub-and-spokes/README.md) describes consulting this policy record and correcting an initial claim that the retirement was unrequested. The planned condition and sequence of retirement are therefore present in an available pinned source. Whether that supplies a sufficient reason for retiring the subpath should be made explicit; it is not an absence of recorded timing.

This does not establish a specific reason for every removed test assertion or lint change. The appropriate editorial repair is to split the compound choice and associate each status with the actual proposition for which a reason exists or was not found. Merely turning D03 green/stated would repeat the grouping problem.

## Release in #127

The supplied [PR 127 body](pr-127-body.md), read from inputs/stack/pr.json, explicitly describes:

- the backend as an awaited release boundary in the after diagram;
- the public service release return type changing to Promise<void>;
- synchronous cache clearing before project release, with a reason concerning pending or rejecting release;
- a narrower beginTurn file-list input in the public-surface section.

These are disclosures in the available body, not evidence of when the original request was made.

[04's source for its detailed release card](../../04-textbook-chapter/src/chapter.html) at decision d1 acknowledges those disclosures while retaining the missing-rationale finding. Its README's broader shorthand should therefore be read carefully. [09](../../09-diff-of-intent/content.py), [17's rendered root](rendered/17-executable-before-after.txt), and [24's rendered root](rendered/24-question-driven-nav.txt) group or separate release, cache clearing, and parity differently.

The distinction used in this critique is:

| Proposition | What the supplied body supports |
| --- | --- |
| The release surface now waits for project release | Explicitly disclosed. |
| Clearing happens before the pending/rejecting release | A specific reason is stated. |
| The changed caller-visible completion/error contract is reconciled with a broader unchanged-behavior promise | The preceding disclosures alone do not supply that reconciliation. |
| The original implementing request authorized or prohibited the change | A retrospective PR body alone does not establish this chronology. |

The critique does not add a new release probe or decide whether changing the contract was desirable.

[Return to F4](../critique.md#f4-rationale-is-an-evidence-problem-before-it-is-a-badge)
