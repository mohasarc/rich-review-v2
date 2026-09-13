# chess-coach

## Entry point

Open [index.html](index.html) directly. It works offline with no installation or server.

```sh
open ~/projects/rich-review-v2/experiments/11-chess-coach/index.html
```

The opening map compares ownership before and after. The complete move sheet exposes all 22 decision groups. “Analyze” opens the matching mechanism, counterfactual and source excerpts. Start with moves 05, 07 or 17 to see the angle most clearly.

## Kind

page

## Subjects

pr-131 — Route daemon thresholds through centralized policy.

## Declared choices

- Role framing: Chess coach. Assigned angle: move played versus move not played, per decision. The page compares commitments and consequences without grading the moves.
- Box lenses: Static ownership across `packages/daemon`, CLI composition, CLI mechanisms and test helpers; runtime boundaries across the CLI process, daemon process and worker thread. Snapshot transfer predates this PR; the changed ownership is in the consumers.
- Opening style: “The number stays; the authority moves,” followed by a before/after boundary picture. Chess is explicitly a lossy analogy.
- Shape: A complete, visible variation sheet above 22 smaller decision pyramids. Test changes and unexplained details appear in that sheet before any descent.
- Navigation: Linear numbered reading; links from map to move, move to analysis, analysis to source; previous/next and return-to-move links. Native disclosures preserve optional depth. Direct analysis and source-line URLs open their target disclosures.
- Trust posture: Check the PR against source. Distinguish author-named alternatives, actual base behavior and hypothetical coach variations. Label rationale as stated or unexplained at the granularity of the particular decision.
- Persona: A teammate who knows symnav but does not own this corner.
- Representations used: Package and runtime diagrams, paired move paths, a complete decision matrix, two interactive illustrative comparisons, verbatim excerpts, full before/after source copies, and a file-to-decision coverage table. No review responses are collected or stored.
- Importance rule: Ownership and cross-boundary effects first, then deadline/recovery scope, then test and API details that alter how the architecture can be understood. The latter receive the same decision format and depth as the architectural choices.
- Inputs used (beyond bundle): All changed base/head source files; existing `DaemonPolicy`, its tests and test factory; `plans/005/daemon-policy.md`; the architecture spec; `program.ts`; contributor instructions; local commit identities and diff. The bundle's overview files contain only filename headings, so they supplied no symbol analysis. No implementation transcript was available. Base `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e`; head `b100221db48754656328391b878299c5a0bab443`.
- Tech: Dependency-free HTML, CSS and JavaScript. Python generates the page and 66 local source pages from authored `content.py`. The generated page needs no Python. Browser checks used Playwright and `file://`.
- Built on earlier experiment(s): none. I ignored earlier experiment outputs and did not read them.

## What I tried

I started with the four decisions named in the PR, then followed every changed file to find decisions that a four-card account would hide. The result includes deleted resource-policy tests, adjusted output fixtures, an unused startup knob, an ignored legacy test cap, error selection after reattachment, the single-connection fetch path and retained scalar seams.

A literal chess board was considered and dropped before implementation: assigning modules to chess pieces would add a second system to learn. I also dropped a generic retry-budget simulator. Multiplying the two numeric limits would imply repeated-fetch behavior that this source does not demonstrate. The page instead shows the real scopes and bounds the checked-in test's claim.

The two small models earned their place: caller purpose changes which timeout applies to the same message; fixture normalization changes whether the same output ever touches a file. Both are marked illustrative beside the controls.

The finished artifact has 80 source excerpts and maps all 60 changed paths to decisions. [Validation notes](validation.md) record source/hash checks, 1,003 checked local links, offline operation, navigation, model behavior and desktop/mobile layout. No symnav correctness or full-suite result is claimed. Symnav source was untouched.

## What I would drop

Some generic alternatives, especially “one timer for everything,” reveal less than the concrete fixture and error-selection forks. The complete sheet is text-heavy; the cost of avoiding surprises on descent is visible here. Full source snapshots also add about 6 MB, although they make the evidence independent of GitHub and the worktrees.

## What I would do next

Ask a fresh reader to explain why a 64 KiB cleanup fixture changed its physical path, then inspect whether the paired pictures carried that understanding. Replace the least useful hypothetical alternatives with concrete scenarios that force the same design choice.

## Time spent

About 21 minutes wall-clock, using Codex. No sub-agents were spawned.
