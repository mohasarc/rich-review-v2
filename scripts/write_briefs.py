#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUEUE = ROOT / "queue"

BRIEFS = [
    (1, "unconstrained-a", "pr-127, stack", "free", "free"),
    (2, "unconstrained-b", "pr-131", "free", "free"),
    (3, "unconstrained-c", "pr-148", "free", "free"),
    (4, "textbook-chapter", "pr-127", "learner framing, worked example, quiz at end", "page"),
    (5, "boxes-static-vs-runtime", "pr-131", "static structure + runtime topology, both diagrams, changed edges lit", "page"),
    (6, "hub-and-spokes", "pr-148", "hub-and-spokes shape: DaemonClient is the hub", "page"),
    (7, "stack-timeline", "stack", "timeline shape; scrub through 26 PRs, box diagram morphs", "page, interactive"),
    (8, "adversarial", "pr-131, pr-148", "adversarial posture: worst honest reading, unrequested changes, weakened tests", "page"),
    (9, "diff-of-intent", "pr-127, pr-131", "plan/PR-body vs shipped, rendered as its own figure", "page"),
    (10, "tour-guide", "pr-127", "one request walked through old and new", "page, interactive"),
    (11, "chess-coach", "pr-131", "move played vs move not played, per decision", "page"),
    (12, "detective", "pr-148", "start from the symptom the stack is fixing; trace to what changed", "page"),
    (13, "owner-persona", "pr-131", "reader owns this corner; artifact must get out of their way", "page"),
    (14, "outsider-persona", "stack", "reader has never seen symnav; system map first", "page"),
    (15, "message-choreography-sim", "pr-127 or pr-131", "client and daemon as two actors; reader sends a message, watches the exchange", "interactive sim"),
    (16, "drag-the-box", "pr-131", "move a class to another package, see which imports break", "interactive"),
    (17, "executable-before-after", "pr-127", "real execution old vs new on fixture inputs, in-page", "tool + page"),
    (18, "negative-space", "pr-148", "what the change does not touch and why that matters", "page"),
    (19, "type-level-only", "pr-131", "types added/narrowed/widened; no bodies", "page"),
    (20, "contract-table", "pr-127, pr-131", "every public function before/after", "page"),
    (21, "narrated-top", "stack", "90-second spoken/animated top layer, page below", "video/audio + page"),
    (22, "game-any", "stack", "build a game. FPS, strategy, puzzle, your call. Must satisfy rule 4", "game"),
    (23, "zoom-canvas", "pr-148", "semantic zoom; one canvas, zoom into boxes", "interactive"),
    (24, "question-driven-nav", "pr-127", "each node ends with questions; reader picks", "page"),
    (25, "reader-sketch", "pr-131", "reader draws what they think it does, then compares", "interactive"),
    (26, "physical-analogy", "pr-127", "plumbing / kitchen / post office; lo-fi; marked lossy", "page"),
    (27, "test-honesty", "pr-131, pr-148", "what tests pin down vs what the change claims", "page"),
    (28, "blast-radius-tool", "pr-131", "script computing blast radius from symnav refs; page ranks decisions by it", "tool + page"),
    (29, "refusal", "pr-148", "decide whether this PR is one thing; if not, split it and explain each", "page"),
    (30, "adjacent-pair", "#146 + #147", "why is the split here; what crosses", "page"),
    (31, "method-runbook", "pr-127", "write the extract→rank→render method as a runbook, then follow it once", "method"),
    (32, "kit", "any", "reusable components (box diagram, decision card, before/after, exit-link); demo on pr-127", "kit"),
    (33, "pair-one-variable", "pr-127", "two pages, identical except opening style (metaphor vs motivating failure)", "pair"),
    (34, "inverted-for-experts", "pr-131", "evidence first, abstractions on demand", "page"),
    (35, "future-self", "pr-148", "reader is the author six months later; decisions and reasons preserved", "page"),
    (36, "be-weird-a", "any", "invent a representation not in section 5; no other constraint", "free"),
    (37, "be-weird-b", "any", "invent a navigation shape not in section 5; no other constraint", "free"),
    (38, "critique", "none", "read all finished experiments; against philosophy.md and section 1, write what is missing, what repeats, what is promising. No page", "critique"),
    (39, "fresh-reader-check", "none", "for each finished page: read it without the diff, list the decisions you learned, then read the diff and list what you missed. One table. Also flag any rule-4 violation (surprise on descent)", "critique"),
    (40, "best-of-synthesis", "pr-127", "read all finished experiments on pr-127; build one page taking the best element from each; credit them", "page"),
]


def paths_for(subjects: str) -> tuple[str, str]:
    keys = [key for key in ("pr-127", "pr-131", "pr-148", "stack") if key in subjects]
    if subjects == "any":
        keys = ["pr-127", "pr-131", "pr-148", "stack"]
    if subjects in ("none", "#146 + #147"):
        keys = ["stack"]
    bundles = ", ".join(f"~/projects/rich-review-v2/inputs/{key}/" for key in keys)
    worktrees = []
    for key in keys:
        if key == "stack":
            worktrees.extend(["~/projects/rich-review-v2/worktrees/stack-head", "~/projects/rich-review-v2/worktrees/main"])
        else:
            worktrees.extend([f"~/projects/rich-review-v2/worktrees/{key}-head", f"~/projects/rich-review-v2/worktrees/{key}-base"])
    return bundles, ", ".join(worktrees)


def brief(number: int, slug: str, subjects: str, angle: str, kind: str) -> str:
    bundles, worktrees = paths_for(subjects)
    return f"""# Brief {number:02d} — {slug}

You are one of many agents running tonight on the same problem. Read, in order:
1. ~/projects/rich-review-v2/philosophy.md
2. ~/projects/rich-review-v2/playbook.md sections 1, 2, 3, 6, 7 (the rest is inspiration; read it if useful)

Your output folder: ~/projects/rich-review-v2/experiments/{number:02d}-{slug}/  (create it)
Input bundles: {bundles}
Worktrees: {worktrees} (read-only except build output)
Earlier experiments: ~/projects/rich-review-v2/experiments/ (you may read them or ignore them; say which)

## Subjects
{subjects}

## Assigned angle
{angle}

## Kind
{kind}

## Constraints
Hard rules in playbook section 1 apply. Technology is your choice. No deadline, no size target. Deep and ugly beats shallow and polished. If your approach turns bad halfway, write it up and start another in the same folder.

## When done
README.md per playbook section 7. Then stop.
"""


def main() -> None:
    (QUEUE / "running").mkdir(parents=True, exist_ok=True)
    (QUEUE / "done").mkdir(parents=True, exist_ok=True)
    for arguments in BRIEFS:
        number, slug, *_ = arguments
        path = QUEUE / f"{number:02d}-{slug}.md"
        if not path.exists() and not (QUEUE / "running" / path.name).exists() and not (QUEUE / "done" / path.name).exists():
            path.write_text(brief(*arguments))


if __name__ == "__main__":
    main()
