# unconstrained-c

## Entry point

Open [index.html](index.html). It is a standalone offline page, including its source snapshots.

```sh
open ~/projects/rich-review-v2/experiments/03-unconstrained-c/index.html
```

“The switch is still open” explains why the package has a usable DaemonClient while the shipped CLI still uses compatibility copies. It includes two interactive maps, 24 decisions, 32 recorded client scenarios, and source links for all 153 changed paths. Controls change the view; they do not store feedback.

## Kind

page

A small source-inventory tool and an actual-code recording harness support the page.

## Subjects

pr-148 only. Base `ba53c8e1662fd86d198b95321c90d9c9bef10184`; head `20838f8dbf413e04767543eb2380d0d114da6c60`.

## Declared choices

- Role framing: Teammate reconstructing ownership and the choices behind it. Free angle: separate physical relocation from consumer adoption.
- Box lenses: Static package/module ownership and runtime process/thread boundaries. The worker is visibly inside the daemon process.
- Opening style: Before/after picture, initially showing both implementations at the PR head. No metaphor beyond the title.
- Shape: A complete overview followed by decision details and exact evidence. Five decision families form smaller pyramids under the opening map.
- Navigation: Read down all choices, use previous/next inside details, or jump from a map box or file to a decision and its source. Closing a detail returns focus to its origin.
- Trust posture: Compare intent with shipped scope. Preserve unknown rationale explicitly. Test relocation, removed assertions, retired enforcement, and unmentioned test scheduling get the same card treatment as architecture.
- Persona: A teammate who knows symnav but not the daemon internals.
- Representations used: Source map, nested process/thread diagram, before/after comparisons, ordered guard diagram, ownership-coordinate matrix, idle timeline, replay boundary, recorded event player, file inventory, and line-numbered source excerpts.
- Importance rule: Lead with the distinction between the active and staged graphs; then host boundaries, routing effects, process ownership, and changes in what tests observe. No correctness ranking or verdicts.
- Inputs used (beyond bundle): Direct source and test reads in both supplied worktrees; Git rename/copy inventory; the head’s daemon follow-up spec, functional spec, policy record and contributor guide; a daemon package build; 32 calls to built DaemonClient with synthetic external ports. The bundle’s two overview files had no symbol output, so direct source reads supplied the mechanism detail. Used the supplied PR body, 45 commit messages, diff, file counts and repository rules.
- Tech: Vanilla HTML/CSS/JavaScript and SVG; Python inventory/build scripts; Node.js recording harness; Chromium/Playwright checks. No external libraries or network services are needed to open the artifact. Harness: Codex.
- Built on earlier experiment(s): none. Earlier experiments were ignored, not read or reused.

## What I tried

Started with a relocation-only map. Reading the actual delta made that insufficient: the CLI copies are changed before being frozen, and test migration changes what some tests observe. Kept the map, then gave those additional choices their own overview cards. Seventeen choices have a stated reason; seven retain an explicit rationale gap.

Considered a handwritten routing simulator, but dropped it before implementation. Instead, [record.mjs](record.mjs) executes the built façade, runtime and routing guards while replacing registry, observer, transport, trigger and executor operations in memory. [recordings.json](recordings.json) preserves the resulting events. The browser replays them. This is actual client code with synthetic ports, not real process or transport execution.

The first runtime drawing placed the worker outside the process rectangle. Corrected it to a nested thread boundary. Source-anchor checks also caught and corrected an early assumption that the readiness probe disposed its output; its actual implementation uses a cold-mode execution and checks completion/exit status.

The completeness cost is visible: the overview is 24 cards across several screens. The picture alone is intuition; the picture plus those cards is the complete top layer. Deeper views refine those same choices, including the changed test coverage and unexplained scheduling choice.

## What I would drop

Some generic before/after text panels repeat what the choice already says. The specific guard, ownership and timing diagrams earn their space more clearly. The 153-path browser is useful for auditing scope but probably too prominent for an ordinary reader.

## What I would do next

Have a fresh reader explain which implementation ships, when local replay is permitted, and which worker-test observations changed. Then compress the 24-card overview without moving a decision into a hidden layer.

## Time spent

About 31 minutes of wall-clock work.

The page opened offline at desktop and mobile sizes. All decisions and evidence links were checked, along with map switches, sequential navigation, trace controls, file search, Escape and focus restoration. Both symnav worktrees remained clean at the final source check. See [validation.md](validation.md) for the checks and their limits; no full symnav test-suite result is claimed.

To regenerate the saved page from the existing inventory and recordings, run `python3 -B build.py` in this folder. `python3 -B audit.py` rebuilds the read-only source inventory; `node record.mjs` regenerates client recordings after the head daemon package has been built. The auxiliary reduced-delta reports intentionally normalize imports/naming and are labeled as lossy. The HTML’s exact snapshots do not depend on those reductions.
