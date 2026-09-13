# inverted-for-experts

## Entry point

Open [index.html](index.html), or run:

```sh
open /Users/moyaseen/projects/rich-review-v2/experiments/34-inverted-for-experts/index.html
```

The page works offline from the folder. No server, installation, or build is required. A modern browser is needed for the explanation dialogs; Chromium was tested. All 23 decisions remain readable with JavaScript disabled.

## Kind

page

## Subjects

pr-131 — Route daemon thresholds through centralized policy.

Base `b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e` → head `b100221db48754656328391b878299c5a0bab443`.

## Declared choices

- Role framing: An expert inspecting concrete evidence and deciding which mechanisms need explanation.
- Box lenses: Threshold ownership, composition, runtime consumers, process/worker boundaries, and the production/test boundary. Mechanisms still reside in `apps/cli`; the existing policy belongs to `packages/daemon`.
- Opening style: Two checked-in timeout tests with reversed policy inputs. A small, explicitly simplified ownership sketch supplies early intuition.
- Shape: Evidence table with 23 visible decisions in six groups. Every decision has a mechanism view, a stated or unexplained reason, exact excerpts, and access to full source. The complete decision surface includes test changes and unrecorded choices.
- Navigation: Linear scrolling; group anchors; search; an unexplained-only filter; links into any explanation; previous/next choice; browser history; line-level source links; Escape/return to the evidence row. The owner map, policy record, and file inventory offer alternate entry points.
- Trust posture: Reasons require a source. Five decisions have no specific reason in the inspected records: completion-error provenance, small output fixture translations, transport fixture normalization/directory creation, the retained inert test memory input, and deleted resource-policy cases.
- Persona: A maintainer who recognizes code and tests quickly but wants help reconstructing ownership and scope.
- Representations used: Compact value strips; verbatim numbered source; base/head diffs; boundary diagrams; a timeout scrubber; a six-step recovery fixture; retry allocation and stop-budget illustrations; a policy table; file-to-decision mapping.
- Importance rule: Lead with differences that depend on purpose or scope, then follow bytes, resources, lifecycle, diagnostics, and test seams. Deleted or adjusted tests receive visible entries alongside production choices.
- Inputs used (beyond bundle): Both read-only worktrees; exact source and tests; `daemon-policy.ts`, `policy-testing.ts`, `daemon-policy.test.ts`, and `plans/005/daemon-policy.md`; architecture and follow-up specs; local contributor instructions; pinned git identities and scoped plan history. Bundle materials used: `pr.json`, `diff.patch`, `files.txt`, and relevant `repo-rules.md` sections. Philosophy and required playbook sections were read first.
- Tech: Static HTML/CSS/JavaScript. Python standard library generates the page and embeds the source archive. Native browser dialogs; no third-party frontend dependencies, remote assets, response collection, or persistent review state.
- Built on earlier experiment(s): none. Earlier experiments were ignored.
- Assigned angle: evidence first, abstractions on demand.

## What I tried

I inverted the representation while retaining a complete decision layer. Readers encounter the supplied values and changed evidence before opening an explanation. The 23 entries account for all 60 changed paths, including adapter behavior and removed tests that the four decisions in the PR body do not fully describe.

I considered a raw-diff opening during planning. It would require readers to discover the important decisions themselves, so I used a compact evidence table. There was no discarded implemented prototype.

The recovery illustration is deliberately bounded to the added fixture: two executes, one fetch, empty output. Source inspection showed that a failed fetch settles its execution attempt, so an arbitrary multi-resume simulator would imply more than this evidence establishes. The error-provenance diagram uses symbolic errors and explicitly identifies itself as a control-flow reading.

The page includes 122 source snapshots and 103 resolved excerpts/reasons. The policy implementation, factory, tests, and record are identified as inherited, byte-identical context. Browser checks covered all explanation and source views, navigation, filters, illustrated controls, and desktop/mobile rendering. Two display issues were fixed. Full details and limitations are in [verification.md](verification.md). Symnav test assertions were read; its test suites were not run. Both worktrees remained clean.

Screenshots: [opening](screenshots/01-evidence-first.png), [recovery explanation](screenshots/02-recovery-explanation.png), [owner map](screenshots/03-owner-map.png), [mobile](screenshots/04-mobile.png).

To regenerate after editing `content.py`, `page.html`, or the reference specifications, run `python3 build.py` from this folder. It resolves every excerpt, checks all file mappings and diff totals, and verifies the four inherited policy files. The generated page itself does not need the worktrees.

## What I would drop

Some diagrams for straightforward signal, acknowledgement, and diagnostic wiring repeat their value strips. They satisfy the same interaction pattern but earn less space than the timeout, recovery, memory, and ownership views. I would make those simple explanations smaller after observing actual use.

The source archive is useful for expert inspection, but the default two excerpts beneath every mechanism make the drawer long. One selected excerpt plus the existing source tab may be enough.

## What I would do next

Ask a maintainer to explain why an execution-status request gets 250 ms and what resets the fetch-resume allowance, then observe whether the evidence-first opening shortens that task. Check whether the five unexplained entries make the changed test assumptions easier to notice.

## Time spent

About 32 minutes, including source inspection, implementation, and browser verification.
