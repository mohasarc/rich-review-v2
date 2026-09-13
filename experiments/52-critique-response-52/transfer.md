# Applying 32 to PR 131

The wider subject is new to the kit: its earlier complete demonstration was the six-file PR 127; this application covers the assigned sixty-file PR 131. Earlier claims were used as search leads and checked against the assigned diff and snapshots. This is not a rerender of 32’s demonstration ledger.

## The preserved baseline

Read and copied [KIT-unchanged.md](KIT-unchanged.md), then copied `kit/components.py`, `kit/review.css` and `kit/exit-link.js` verbatim. The source hashes in [source-manifest.json](source-manifest.json) and checks in [verify.py](verify.py) establish the copies’ identity with experiment 32. No predecessor file was edited.

The first render used:

| Component as shipped | New-subject use |
| --- | --- |
| BoxDiagram / Box / Edge | Static policy/composition/consumer comparison and a runtime client/daemon/worker map. Containment and coordinates are authored. |
| DecisionCard | Thirty visible propositions, each with one reason status and its mechanism exit. |
| BeforeAfter | Static maps and each decision’s before/after mechanism. |
| ExitLink | Card, reason, and diagram exits, with the original script restoring their origins. |
| Layer / validate_layers | Each mechanism is assigned its root proposition; this verifies identifiers, not semantic entailment. |

The optional `page()` shell was replaced with subject-specific navigation as explicitly allowed in KIT.md. Subject maps, prose, evidence capture, evidence wrappers and `layout.css` are author inputs, not modifications of the four reusable components.

Run `python3 build.py --baseline-only` to render the fuller component composition; this uses the final shared content and final common diagram sizing. The saved [pre-adaptation specimen](transfer-before.html) preserves the layout before the diagram-width repair, using [layout-before-fix.css](transfer/layout-before-fix.css). [transfer-baseline.json](transfer-baseline.json) and the [mobile screenshot](screenshots/transfer-before-mobile.png) were captured before the repair or compact layout existed.

## Failures and changes, in order

1. **Reason scope needed more author work.** One status per card cannot express independently explained and unexplained choices. I separated the explicit-policy precedence and constructor casts into distinct entries before the baseline. The library already supported this; it required no API change.
2. **A valid wide map became unreadable.** At a 390 px viewport, the kit’s generic 445 px SVG minimum rendered a 1,100-unit map with roughly 5.26 px title text. No page overflow occurred, so an overflow-only check would pass. This was observed in the actual browser.
3. **Only after that baseline, adapt host sizing.** Add `#runtime svg{min-width:1100px}` and 540 px minima for the static comparison. The existing scroll container now exposes horizontal scrolling rather than shrinking labels. Both treatments use the same adaptation; the three kit files are unchanged.
4. **Then compose the compact treatment.** `compact.css` places the same DecisionCard DOM into rows. It does not replace card strings, remove explanation, change reason targets or alter deeper content.
5. **Keep the remaining costs visible.** Mobile users must pan the runtime map and scroll a long complete register. Source and layer hashes cannot determine what a novice learned. These are limitations of the trial, not “fixed” by a green validation report.
6. **Visual inspection corrected an authored edge label.** The before diagram initially put “local defaults” on the composition-to-consumer arrow. That could imply the composition owned those fallbacks. The final diagram names that arrow “optional inputs” and places “local fallback values” inside the consumer. The saved baseline keeps the earlier wording. This was an author error, not a component failure.

## The method’s reach

The components transfer to a wider subject at the mechanical level. They accept enough distinct root decisions, preserve exact returns, and work offline. Geometry remains manual; reason granularity remains editorial; source coverage and parentage remain author claims requiring inspection. Successful HTML generation does not establish explanation transfer.

31’s RUNBOOK.md was read for its extract/rank/render and file-order reread ideas. It was not the unchanged-method trial: that trial is specifically 32’s component transfer. No claim is made that 31’s full line-coverage procedure was followed unchanged.
