# game-any

## Entry point

[Open Keep the Turn](game.html). The entry page is `game.html`; `index.html` forwards to it. No installation or build step is needed.

For the localhost setup used in browser verification, run:

```sh
python3 ~/projects/rich-review-v2/experiments/22-game-any/tools/serve.py
```

Open the URL it prints. Press Ctrl-C to stop the server. The temporary validation server has been stopped.

## Kind

other: game — five open-book strategy puzzles.

## Subjects

`stack`: all 26 PRs, main `b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e` → #149 tip `d07002357d3e9596bfaae910a1ac63b77981620b`.

## Declared choices

- Role framing: the reader operates the architecture as a workshop dispatcher and learns by moving state across boundaries.
- Box lenses: static package ownership and lifecycle/state ownership. A separate process/thread path disambiguates packages from runtime locations.
- Opening style: workshop metaphor, marked lossy, followed by a before/after ownership map.
- Shape: a complete open briefing above five independent puzzle boards.
- Navigation: linear briefing → games → evidence; direct jumps from contracts into stations and decisions; evidence drawer with return links and previous/next decisions; all stations open immediately.
- Trust posture: explain the chosen mechanisms and separate stated reasons from unexplained choices. Test changes receive their own root entries. No correctness verdicts.
- Persona: a teammate who knows symnav's purpose but has not read the daemon stack.
- Representations used: responsibility tiles, before/after package map, runtime path, cache shelves, ordered guard tracks, FIFO ledger, worker generations, record-transfer board, decision cards, policy table, pinned source excerpts.
- Importance rule: ownership changes and distinct lifetimes lead; preserved behavior debts, unexplained changes, and removed/narrowed test observations stay visible alongside architecture.
- Inputs used (beyond bundle): pinned `git show` source from both supplied worktrees; core, TypeScript, CLI, renderer, daemon policy/transport/execution/resource/worker/testing implementation; changed tests; daemon-policy and follow-up specifications. Read the philosophy and playbook in order. Used bundle PR bodies, commit subjects/bodies, patch, file inventory, and repository rules; did not use overview dumps.
- Tech: local HTML, CSS, classic JavaScript, a pure illustrative state machine, Python standard-library evidence builder/server, Node behavioral checks, Playwright browser verification. No remote assets, libraries, APIs, analytics, or storage.
- Built on earlier experiment(s): none. Other experiment folders were ignored. An unfinished earlier attempt already in this assigned folder was inspected and preserved in `abandoned-seams/`; its graph data, styles, scripts, and decision taxonomy are not loaded by the delivered game.

## What I tried

The existing SEAMS shell referenced missing gameplay scripts and included a score placeholder. I preserved it and started Keep the Turn in the same folder. I chose five bounded causal puzzles: move package owners, preserve a failed refresh's current turn, order guards, hand off a worker behind delivery/sample barriers, and recover output without replaying accepted work.

An early worker model compressed readiness and resource recovery together. Reading the generation manager, resource supervisor, and request queue led to separate ready-report, termination, recovery-bookkeeping, and boundary-settlement moves. A keyboard navigation race and narrow-screen overflow were found and fixed through browser use.

## What I would drop

The package-sorting puzzle is less revealing than the worker and transfer puzzles; it would be the first game to drop. The unused SEAMS graph intermediates also add folder weight without helping the delivered artifact.

## What I would do next

Add a real captured request trace beside the toy model. Ask a fresh reader to explain why fetch and identical-request reattachment preserve different state, using the board alone.

## Time spent

About one hour for this completion pass. Earlier unfinished attempts were already present and are excluded from that estimate.

## Playing

Click a responsibility and then its destination. Click two guards to exchange their order. Other boards expose event buttons: receive, append, publish, release, replace, acknowledge. A move reports its consequence. Undo and Restart operate on page memory only. “Show next move” performs one disclosed walkthrough move. Arrow keys navigate station tabs; all controls also support Tab and Enter. Escape closes evidence.

There are no scores, timers, locked facts, approval/rejection controls, comment fields, or persisted responses. Completing a station marks only that its model was demonstrated.

## How rule 4 is implemented

The root briefing includes the ownership map, every game contract, all **117 PR-declared decisions**, **20 supplementary observations**, **44 policy/recipe rows**, and **five intentional missing deadlines**. These render before the workbench and are never hidden behind progress. The early workshop link permits an immediate nonlinear jump.

Each game animates rules already present in its root contract. Evidence links open the same choice and rationale with a related final-tip excerpt. The **46 local evidence pages** include full pinned source, its main counterpart where available, and the supplied historical PR body/commits. Temporary choices are explicitly distinguished from the final tip: policy testing/serialization, compatibility transport, and staged CLI copies are later internalized or removed.

This makes the complete root long. The short opening conveys the shape; the full briefing carries exhaustive declared decisions. Keeping every reason visible has a real scanning cost, which this experiment accepts rather than hiding decisions behind gameplay.

## Fidelity and scope

The game does **not** execute symnav. Requests, revisions, cache entries, pressure events, output records, and digest seals are toy representations. Durability means the modeled awaited capture append; it is not an fsync claim. The cache board models a revisioned index and semantic-turn timing, and explicitly separates the independent project-graph transaction. The worker board starts after initial readiness activation. It does not simulate real scheduling, memory quantities, or the full recovery circuit.

Supplementary observations cover preserved behavior debts, the PR-template change, project ordering, inspector behavior, raw-log assertions replaced by parsed-event inspection, a transfer test budget increase, mechanism-test relocation, and each of the ten removed built-CLI status/stop scenarios. Related package tests are not presented as proof of equivalent coverage. “Unexplained” is bounded to the inspected inputs; commit subjects naming a change are not treated as its reason.

## Validation and maintenance

`node tools/verify-model.cjs` passes 10 behavioral checks. The final Playwright pass passes 23 checks, including all stations, both recovery scopes, keyboard movement, Undo, evidence focus restoration, all local source pages, complete root rendering, and zero document overflow at 320/390/768/1200 pixels. See [validation.md](validation.md), [browser results](validation-browser.json), and [screenshots](screenshots/01-opening.png).

Browser verification used HTTP because the browser tool blocks `file:` navigation. No symnav test suite was run, no runtime trace was claimed, and no symnav source or branch was modified. No changes were committed; experiment finish handling belongs to the orchestrator.

To regenerate the reading material from the supplied pins, run `python3 tools/build-evidence.py` from this folder. It reads symnav through Git and writes only this experiment's `assets/briefing.js` and `evidence/`. `tools/browser-check.js` is a Playwright function accepting an open `page` on this artifact. Older `data/`, `content/`, `work/`, root `js/` and `css/`, and other preexisting extraction scripts remain unused provenance.
