# rich-review v2 — overnight experiment playbook

This document is handed to an orchestrator agent (Codex). It runs unattended for hours. The human is asleep. Every decision needed to run is in here. When something is not covered, pick the option that produces more variety across agents, and write the choice into `orchestrator-log.md`.

Read `philosophy.md` (same directory) before anything else. It is the problem statement. This file is the operating manual.

Do not look at, read, copy, or reference `~/projects/rich-review/`. It is a failed v1. Treat it as nonexistent.

---

## 0. The one-paragraph version

Agents write code faster than humans can read it. Humans still own the system. We want a review artifact that lets a human understand a change they did not write — the boxes, the boundaries, the decisions, how it works — without reading the diff, and without the artifact wasting their time. Nobody knows what that artifact looks like yet. Tonight, many agents each build their own answer against the same set of real PRs. In the morning the human inspects everything, keeps what works, discards the rest, and iterates. Variety is the product. Convergence is failure.

---

## 1. What every agent must produce (hard rules)

These apply to every experiment, whatever form it takes.

1. **Subject is the symnav daemon refactor stack** (section 3). An agent works on the subjects assigned in its brief, nothing else.
2. **Read-only.** No verdict buttons, no approve/reject, no comment storage. v1 of the artifact teaches; it does not collect.
3. **The artifact explains, it does not judge correctness.** Tests and machines judge correctness. The artifact surfaces decisions, boundaries, mechanisms, and what nobody explained, so the human can judge.
4. **Pyramid invariant.** Layered depth is required in some form. The top layer(s) carry everything the reader needs to know. Every deeper layer adds fidelity on the same facts. A deeper layer never introduces a fact, decision, or surprise absent from the layer above. Top does not have to be a single idea; it can be a few. It must be complete.
5. **Intuition early.** Somewhere near the start, before mechanism detail, something quick and lossy that gives the shape of the change. Metaphor, picture, motivating failure, naive-solution-and-why-not, one concrete run, a question. Does not have to be the literal first element.
6. **Lossy things are marked.** Anything not exactly accurate says so, briefly, where it appears. Nothing else gets a label. No fidelity tags on every node.
7. **Boxes and boundaries.** The artifact shows what the high-level units are, what is inside them, where the boundaries run, how they interact, and which boundaries the change moved. Which box system to use is the agent's call (section 5.2).
8. **Decisions are first-class.** Every decision the change embodies is surfaced. Each is marked as *stated* (a reason exists in PR body, commits, plan, transcript) or *unexplained* (no reason found). Never invent a reason. Unrequested changes and weakened/deleted tests are decisions and get the same weight as architectural ones.
9. **Linear and nonlinear.** A reader can go top to bottom, or jump from any high-level element into a lower-level explanation of that element, and come back.
10. **Pictures before words.** When a diagram and a paragraph say the same thing, the paragraph goes.
11. **Openable by the human.** The README says how to open it: a file, one command, or a URL. Servers, hosting, external services, any library or API are all fine.
12. **Symnav untouched.** Never modify, commit to, push, or rebase any symnav branch. Worktrees are read-only except for build artifacts (`node_modules`, `dist`).
13. **Every experiment folder has a README** (section 7). The README is as important as the artifact.
14. **The agent declares its choices**: angle, shape, box lens, opening style, representations used, inputs used, what it tried and dropped. In the README.

Anything not in this list is free.

---

## 2. What is explicitly free

- **Technology.** HTML, three.js, pixi, d3, React, WebGL, canvas, SVG, Python, a terminal UI, a game engine, a video, a slide deck, a printable PDF. If it can be opened on a Mac from a folder, it counts.
- **Complexity.** A single static page is fine. A mini FPS game where you walk through the daemon's rooms is fine. A strategy game where you route requests is fine. The only test: does the human come away understanding the change.
- **Kind of experiment.** A page. A method plus a page produced by it. A reusable kit plus a demo. A tool that computes something plus a page using it. A written negative result ("tried X, doesn't work because Y"). Two pages differing in one variable. A critique of other outputs. Any of these is a valid overnight output.
- **Effort allocation.** No deadline, no size target. Deep and ugly beats shallow and polished. If an approach turns out bad halfway, write that up in the README and start another one in the same folder.
- **Reuse.** Later agents may read earlier agents' folders and build on them, or ignore them. They must say which in the README.

---

## 3. Subjects

### 3.1 The open PR set

All 26 open PRs on `mohasarc/symnav` are one stack: the daemon architecture refactor. Base of #123 is `main`; each later PR is based on the previous one.

| PR | Title | Head branch | Base branch | Files | Lines |
| --- | --- | --- | --- | --- | --- |
| #123 | Move workspace source caching to core | `agent/daemon-architecture-refactor-part-01-source-cache` | `main` | 8 | +398/-79 |
| #124 | Publish revisioned backend state transactionally | `agent/daemon-architecture-refactor-part-02-transactional-backend-state` | `agent/daemon-architecture-refactor-part-01-source-cache` | 12 | +1115/-395 |
| #126 | Publish project membership transactionally | `agent/daemon-architecture-refactor-part-03-project-membership-graph` | `agent/daemon-architecture-refactor-part-02-transactional-backend-state` | 5 | +1102/-194 |
| #127 | Scope semantic caches to one turn | `agent/daemon-architecture-refactor-part-04-query-cache-lifecycle` | `agent/daemon-architecture-refactor-part-03-project-membership-graph` | 6 | +391/-67 |
| #128 | Retain workspaces through core sessions | `agent/daemon-architecture-refactor-part-05-workspace-session` | `agent/daemon-architecture-refactor-part-04-query-cache-lifecycle` | 14 | +531/-271 |
| #129 | Resolve state directories in CLI | `agent/daemon-architecture-refactor-part-06-state-directory-ownership` | `agent/daemon-architecture-refactor-part-05-workspace-session` | 25 | +312/-173 |
| #130 | Establish daemon package and policy snapshot | `agent/daemon-architecture-refactor-part-07-daemon-package-policy-snapshot` | `agent/daemon-architecture-refactor-part-06-state-directory-ownership` | 51 | +2220/-134 |
| #131 | Route daemon thresholds through centralized policy | `agent/daemon-architecture-refactor-part-08-daemon-policy-consumers` | `agent/daemon-architecture-refactor-part-07-daemon-package-policy-snapshot` | 60 | +1298/-544 |
| #132 | Own one daemon command vocabulary | `agent/daemon-architecture-refactor-part-09-command-vocabulary` | `agent/daemon-architecture-refactor-part-08-daemon-policy-consumers` | 41 | +422/-192 |
| #133 | Unify daemon execution failure vocabulary | `agent/daemon-architecture-refactor-part-10-execution-failure-vocabulary` | `agent/daemon-architecture-refactor-part-09-command-vocabulary` | 18 | +405/-91 |
| #134 | Make daemon admission rejection authoritative | `agent/daemon-architecture-refactor-part-11-admission-rejection` | `agent/daemon-architecture-refactor-part-10-execution-failure-vocabulary` | 14 | +700/-73 |
| #135 | Execute daemon work through an injected host module | `agent/daemon-architecture-refactor-part-12-injected-host-module` | `agent/daemon-architecture-refactor-part-11-admission-rejection` | 43 | +1605/-206 |
| #136 | Render daemon lifecycle reports in renderer | `agent/daemon-architecture-refactor-part-13-lifecycle-renderer` | `agent/daemon-architecture-refactor-part-12-injected-host-module` | 7 | +417/-66 |
| #137 | Isolate daemon transport framing and validation | `agent/daemon-architecture-refactor-part-14-transport-framing` | `agent/daemon-architecture-refactor-part-13-lifecycle-renderer` | 24 | +1747/-965 |
| #138 | Receive resumable daemon result transfers | `agent/daemon-architecture-refactor-part-15` | `agent/daemon-architecture-refactor-part-14-transport-framing` | 12 | +1023/-226 |
| #139 | Route outbound daemon sockets through one client | `agent/daemon-architecture-refactor-part-16-socket-client` | `agent/daemon-architecture-refactor-part-15` | 6 | +961/-312 |
| #140 | Route daemon lifecycle exchanges through one client | `agent/daemon-architecture-refactor-part-17-lifecycle-client` | `agent/daemon-architecture-refactor-part-16-socket-client` | 12 | +738/-181 |
| #141 | Route inbound daemon sockets through one server | `agent/daemon-architecture-refactor-part-18` | `agent/daemon-architecture-refactor-part-17-lifecycle-client` | 4 | +677/-182 |
| #142 | Preserve accepted execution recovery in one client | `agent/daemon-architecture-refactor-part-19` | `agent/daemon-architecture-refactor-part-18` | 4 | +1130/-417 |
| #143 | Compose local daemon transport from split owners | `agent/daemon-architecture-refactor-part-20` | `agent/daemon-architecture-refactor-part-19` | 8 | +383/-84 |
| #144 | Project daemon activity from explicit snapshots | `agent/daemon-architecture-refactor-part-21` | `agent/daemon-architecture-refactor-part-20` | 4 | +508/-75 |
| #145 | Manage daemon worker generations explicitly | `agent/daemon-architecture-refactor-part-22` | `agent/daemon-architecture-refactor-part-21` | 8 | +976/-143 |
| #146 | Own daemon completion delivery in one session | `agent/daemon-architecture-refactor-part-23` | `agent/daemon-architecture-refactor-part-22` | 4 | +1334/-346 |
| #147 | Serialize accepted daemon execution in one session | `agent/daemon-architecture-refactor-part-24` | `agent/daemon-architecture-refactor-part-23` | 8 | +687/-213 |
| #148 | Own daemon mechanisms behind DaemonClient | `agent/daemon-architecture-refactor-part-25` | `agent/daemon-architecture-refactor-part-24` | 153 | +14624/-815 |
| #149 | Enforce physical daemon package ownership | `agent/daemon-architecture-refactor-part-28` | `agent/daemon-architecture-refactor-part-25` | 158 | +4863/-15288 |

Shape of the stack by size:

| Files | PRs |
| --- | --- |
| 4–8 | #123, #126, #127, #141–#147 |
| 12–25 | #124, #128, #129, #133, #134, #136–#140 |
| 41–60 | #130, #131, #132, #135 |
| 150+ | #148, #149 |

Every PR has a body with context, before/after mermaid diagrams, and a "where it lives" file tree. Read them; they are inputs. Do not assume they are correct or complete.

### 3.2 The fixed sample

Every page-producing agent works on one or more of these four subjects. The brief says which.

| Key | Subject | Why it is in the sample |
| --- | --- | --- |
| `pr-127` | #127 Scope semantic caches to one turn (6 files) | Small diff, real reasoning. Tests whether the top layer can be small |
| `pr-131` | #131 Route daemon thresholds through centralized policy (60 files) | Wide, many boxes touched. Tests the box diagram |
| `pr-148` | #148 Own daemon mechanisms behind DaemonClient (153 files, +14.6k) | Huge, mostly structural. Tests refusal, timeline, hub-and-spokes |
| `stack` | `main` → tip of #149, all 26 PRs as one delta | The real problem: 26 PRs nobody read, one architecture shift. Tests stack-level shape |

Agents may additionally pick any other PR from the stack if their angle needs it (e.g. adjacent pairs, a bug-shaped one, a test-only one). Say so in the README.

### 3.3 Code access

The symnav clone is at `~/projects/symnav`. Remote `origin` = `https://github.com/mohasarc/symnav.git`. All 26 head branches exist on `origin`.

Orchestrator sets up worktrees once, before spawning agents:

```bash
cd ~/projects/symnav
git fetch origin
W=~/projects/rich-review-v2/worktrees
mkdir -p $W
wt() { git worktree add --detach "$W/$1" "origin/$2"; }
wt main                          main
wt pr-127-head                   agent/daemon-architecture-refactor-part-04-query-cache-lifecycle
wt pr-127-base                   agent/daemon-architecture-refactor-part-03-project-membership-graph
wt pr-131-head                   agent/daemon-architecture-refactor-part-08-daemon-policy-consumers
wt pr-131-base                   agent/daemon-architecture-refactor-part-07-daemon-package-policy-snapshot
wt pr-148-head                   agent/daemon-architecture-refactor-part-25
wt pr-148-base                   agent/daemon-architecture-refactor-part-24
wt stack-head                    agent/daemon-architecture-refactor-part-28
for d in $W/*/; do (cd "$d" && pnpm install --frozen-lockfile && pnpm build) || echo "BUILD FAILED $d" >> ~/projects/rich-review-v2/orchestrator-log.md; done
```

`stack-base` is `main`. Agents needing another PR create their own worktree under `$W/` with the same pattern and never delete others'.

In a worktree an agent may: build, run `pnpm test`, run the CLI from source (`pnpm --filter symnav dev -- overview path/to/file.ts`), run symnav commands against the fixture projects, instrument and trace. It may not commit or push.

### 3.4 Precomputed input bundle

Orchestrator generates once, at `~/projects/rich-review-v2/inputs/<key>/`, for each of the four sample keys:

| File | Content | How |
| --- | --- | --- |
| `pr.json` | number, title, body, base, head, commits (sha, subject, body) | `gh pr view N --json number,title,body,baseRefName,headRefName,commits`. For `stack`: all 26 |
| `diff.patch` | full diff base...head | `git diff base-sha...head-sha` in the worktree |
| `files.txt` | changed paths with +/- counts | `git diff --stat` |
| `overview-before.txt`, `overview-after.txt` | symnav overview of every changed `.ts` file in base and head | run from the worktree: `pnpm --filter symnav dev -- overview <file>` per file |
| `stack.md` | the table from 3.1 plus this PR's position | copy |
| `repo-rules.md` | symnav's `CLAUDE.md` and `plans/000/*.md` and `plans/005/daemon-architecture-functional-spec.md` if present | copy |

Agents get the bundle path in their brief. They may go beyond it (git log of touched files, test output, runtime traces, symnav refs/graph). They state what they used.

---

## 4. Repo and output layout

```
~/projects/rich-review-v2/
  philosophy.md            problem statement (read first)
  playbook.md              this file
  orchestrator-log.md      orchestrator's running notes: choices made, failures, timings
  queue/                   one file per pending brief (section 8); orchestrator moves to running/ then done/
    running/
    done/
  inputs/<key>/            precomputed bundle per subject (3.4)
  worktrees/               symnav worktrees (3.3); gitignored
  experiments/<NN>-<slug>/ one folder per agent run (section 7)
  index.html               regenerated by a script after every finish (section 10)
  scripts/                 whatever the orchestrator writes for itself: bundle builder, index builder
```

`git init` the directory. Commit `philosophy.md`, `playbook.md`, `scripts/`, `queue/`, and every experiment folder as it completes (one commit per experiment: `Add experiment NN <slug>`). Gitignore `worktrees/`, `node_modules/`, and anything over 20 MB.

---

## 5. Angle menus (inspiration, not rules)

Each agent's brief assigns some of these. Agents may also pick from any list, or invent, as long as the README says what they did. These lists exist to keep 30 agents from converging on the same page.

### 5.1 Reviewer role framing — what the artifact treats the reader as

| Framing | Artifact centres on |
| --- | --- |
| Learner / textbook (default) | one idea, worked example, mechanism figure, quiz |
| Juror | evidence for and against each decision |
| Detective | start from the symptom or issue, trace to what changed, spot what does not fit |
| Tour guide | walk one request through old and new |
| Chess coach | the position, the move played, the move not played, why |
| Editor | the change as a manuscript: structure, redundancy, what to cut |
| Investor | the bet, the upside, the risk, the alternative |
| Auditor | invariants the change must preserve, each with proof or gap |
| Adversary (see 5.4) | worst honest reading of the change |

### 5.2 Box systems — what "architecture" means for this change

| Lens | Box | Boundary |
| --- | --- | --- |
| Static structure (baseline, always include) | package, module, class | import direction; symnav's locked dependency table |
| Runtime topology | process, worker, daemon vs client | transport, IPC, socket |
| Data ownership | who may mutate which state | write access |
| Lifecycle / state machine | states a thing passes through | transition |
| Request path | one call from CLI entry to backend and back | hop |
| Concept / domain language | the nouns the code uses | where a word changes meaning |
| Failure domain | what breaks together | blast radius |
| Change surface | public API vs internal | what a consumer can see |

Pick the two that suit the change, say which, show changed boundaries lit up in both.

### 5.3 Human capabilities the artifact leans on

Things the reader can do that the implementing agent could not (lack of context, nature, possible misalignment):

| Capability | Wants |
| --- | --- |
| Spatial pattern matching | diagrams; the box that is too big, the edge crossing the wrong way |
| Taste / smell | names, shapes, analogies to known things |
| Context the agent lacks | decisions framed as "does this still hold given what you know" (roadmap, history, plans) |
| Counterfactual reasoning | alternatives side by side |
| Mental simulation | traceable path, or an actual sim so they need not |
| Boredom as signal | honest about size; tedious = probably over-complicated |
| Teach-back | a question, a "say it in your words" prompt |
| Consequence prediction | change placed against future plans |

### 5.4 Trust posture toward the implementer

| Posture | What the artifact does |
| --- | --- |
| Trusting | explains what is there |
| Suspicious | every change tagged "was this asked for?" against PR body/plan; unrequested floats to top |
| Adversarial | builder instructed to find the worst honest reading: what could this hide, what did it make easier to get wrong |
| Diff-of-intent | promised (plan, PR body) vs shipped, rendered as its own figure |
| Test honesty | what tests pin down vs what the change claims; weakened or deleted assertions as decisions |
| Two builders | one explains, one attacks; artifact shows both |

Rule 8 (unrequested changes and weakened tests are decisions) applies to every artifact regardless of posture.

### 5.5 Representations

Text, diagram, before/after table, animation, metaphor, story, quiz — plus:

| Representation | Note |
| --- | --- |
| Executable | old vs new run on the same input, live. Real execution when the worktree allows; illustrative otherwise; say which |
| Interactive diagram | click box to expand, drag a request through, toggle old/new |
| Timeline | commits or PRs as frames; scrub |
| Type-level view | what types got added/narrowed/widened; bodies ignored |
| Contract table | every public function before/after: inputs, outputs, errors, side effects |
| Counterexample generator | an input the old accepted and the new rejects, and vice versa |
| Audio / narrated | a spoken top layer |
| Physical analogy | plumbing, traffic, kitchen; deliberately lo-fi |
| Negative space | what the change does not touch, and why that matters |
| Reader's own sketch | blank canvas: draw what you think it does, then compare |
| Game | FPS through the daemon's rooms, strategy game routing requests, anything |

Sims and games, any complexity. Only requirement: real vs illustrative is stated.

### 5.6 Navigation shapes

| Shape | Description |
| --- | --- |
| Narrative with exits | linear story; any element opens a side door deeper; you return where you were |
| Lattice | any node links to any related node at any level |
| Zoom | one canvas, semantic zoom; zoom into a box, its internals render |
| Multiple pyramids | one per box lens; reader picks pyramid then descends |
| Question-driven | each node ends "want to know X? Y?"; reader picks |
| Strict tree | classic; least flexible |

### 5.7 Opening styles (the "intuition early" element)

Metaphor first · picture first · motivating failure first · before/after in one frame · the obvious solution and why not · analogy to something elsewhere in the same repo · one concrete run · a question the reader answers before seeing the answer.

### 5.8 Importance ranking — what rises to the top layer

Boundary crossing · unexplained · divergence from plan · blast radius (computable: symnav refs) · reversibility · surprise to a repo-familiar teammate · novelty in the codebase · cost of being wrong. State the rule used.

### 5.9 Reader persona

Default: teammate who knows the repo but not this corner. Alternatives: owner of the corner (must get out of their way), complete outsider (needs the system map first), future self six months on, onboarding engineer, manager/non-coder, the next agent, security reviewer. One persona per artifact unless the artifact reshapes on choice.

### 5.10 Overall shape

Pyramid (default) · hub-and-spokes (fits "route X through one Y", which is most of this stack) · timeline (fits the 26-PR stack) · map (no top; box diagram is root) · before/after diptych · question tree · story · inverted (evidence first, for experts). Any shape must still satisfy rule 4.

### 5.11 Subject shapes beyond one PR

Stack as one delta · a decision spread across PRs · a single box's history · plan vs shipped · adjacent pair (why is the split here) · refusal ("this is three things", split it).

### 5.12 Inputs beyond the bundle

Git history of touched files · test run output and coverage delta · runtime trace (run the fixture, capture the path) · symnav refs/graph (blast radius) · repo docs and specs · sibling PRs · the implementing agent's transcript if found under `plans/` or the PR.

---

## 6. Anti-examples — what a bad artifact looks like

- A wall of generated prose. Paragraphs are cheapest to make and most expensive to read.
- The diff restated in sentences. "Adds a function foo that takes bar" is the diff with worse formatting.
- A long flat middle. No top to stop at, no bottom to check against.
- Surprise on descent. Layer 2 reveals a decision layer 1 did not mention. Violates rule 4.
- Invented rationale. A reason the agent made up presented as the author's.
- Labels everywhere. Fidelity tags on every element. Only inexact things get marked.
- Pretty and empty. Polished diagram of boxes that does not show which boundary moved.
- Correctness review in disguise. "This might have a bug on line 40" is not what the human is for.
- Requires GitHub to make sense above the evidence layer. The top must stand alone.
- A README that says nothing about what was tried and what failed.

---

## 7. Experiment folder contract

`experiments/<NN>-<slug>/` where NN is zero-padded run order and slug is short kebab-case from the brief.

Required:

```
README.md        see below
<artifact>       whatever the agent built; entry point named in README
brief.md         copy of the brief the agent received
```

README.md front section, filled by the agent, exactly these headings:

```markdown
# <slug>

## Entry point
How to open it. One command or one file path.

## Kind
page | method | kit | tool | negative-result | pair | critique | other: <what>

## Subjects
Which of pr-127 / pr-131 / pr-148 / stack, plus any extra PRs.

## Declared choices
- Role framing:
- Box lenses:
- Opening style:
- Shape:
- Navigation:
- Trust posture:
- Persona:
- Representations used:
- Importance rule:
- Inputs used (beyond bundle):
- Tech:
- Built on earlier experiment(s): none | <NN-slug>, what was reused

## What I tried
Short. Including approaches abandoned mid-run and why.

## What I would drop
The parts of this artifact that did not earn their place.

## What I would do next
One or two lines.

## Time spent
Rough wall-clock.
```

Nothing else is mandated. Screenshots (`screenshots/*.png`) are welcome; the index shows the first one if present.

---

## 8. The queue

One file per brief in `queue/`, named `NN-<slug>.md`. The orchestrator drains it in order. When the queue is empty, the orchestrator generates new briefs (section 8.3) and keeps going until killed.

### 8.1 Brief template

```markdown
# Brief NN — <slug>

You are one of many agents running tonight on the same problem. Read, in order:
1. ~/projects/rich-review-v2/philosophy.md
2. ~/projects/rich-review-v2/playbook.md sections 1, 2, 3, 6, 7 (the rest is inspiration; read it if useful)

Your output folder: ~/projects/rich-review-v2/experiments/NN-<slug>/  (create it)
Input bundles: ~/projects/rich-review-v2/inputs/<key>/
Worktrees: ~/projects/rich-review-v2/worktrees/<key>-head, <key>-base (read-only except build output)
Earlier experiments: ~/projects/rich-review-v2/experiments/ (you may read them or ignore them; say which)

## Subjects
<keys>

## Assigned angle
<one to three lines from the menus, or "free">

## Kind
<page | method | kit | tool | negative-result | pair | critique | free>

## Constraints
Hard rules in playbook section 1 apply. Technology is your choice. No deadline, no size target. Deep and ugly beats shallow and polished. If your approach turns bad halfway, write it up and start another in the same folder.

## When done
README.md per playbook section 7. Then stop.
```

### 8.2 Initial queue (write all of these before starting workers)

| NN | slug | subjects | angle | kind |
| --- | --- | --- | --- | --- |
| 01 | unconstrained-a | pr-127, stack | free | free |
| 02 | unconstrained-b | pr-131 | free | free |
| 03 | unconstrained-c | pr-148 | free | free |
| 04 | textbook-chapter | pr-127 | learner framing, worked example, quiz at end | page |
| 05 | boxes-static-vs-runtime | pr-131 | static structure + runtime topology, both diagrams, changed edges lit | page |
| 06 | hub-and-spokes | pr-148 | hub-and-spokes shape: DaemonClient is the hub | page |
| 07 | stack-timeline | stack | timeline shape; scrub through 26 PRs, box diagram morphs | page, interactive |
| 08 | adversarial | pr-131, pr-148 | adversarial posture: worst honest reading, unrequested changes, weakened tests | page |
| 09 | diff-of-intent | pr-127, pr-131 | plan/PR-body vs shipped, rendered as its own figure | page |
| 10 | tour-guide | pr-127 | one request walked through old and new | page, interactive |
| 11 | chess-coach | pr-131 | move played vs move not played, per decision | page |
| 12 | detective | pr-148 | start from the symptom the stack is fixing; trace to what changed | page |
| 13 | owner-persona | pr-131 | reader owns this corner; artifact must get out of their way | page |
| 14 | outsider-persona | stack | reader has never seen symnav; system map first | page |
| 15 | message-choreography-sim | pr-127 or pr-131 | client and daemon as two actors; reader sends a message, watches the exchange | interactive sim |
| 16 | drag-the-box | pr-131 | move a class to another package, see which imports break | interactive |
| 17 | executable-before-after | pr-127 | real execution old vs new on fixture inputs, in-page | tool + page |
| 18 | negative-space | pr-148 | what the change does not touch and why that matters | page |
| 19 | type-level-only | pr-131 | types added/narrowed/widened; no bodies | page |
| 20 | contract-table | pr-127, pr-131 | every public function before/after | page |
| 21 | narrated-top | stack | 90-second spoken/animated top layer, page below | video/audio + page |
| 22 | game-any | stack | build a game. FPS, strategy, puzzle, your call. Must satisfy rule 4 | game |
| 23 | zoom-canvas | pr-148 | semantic zoom; one canvas, zoom into boxes | interactive |
| 24 | question-driven-nav | pr-127 | each node ends with questions; reader picks | page |
| 25 | reader-sketch | pr-131 | reader draws what they think it does, then compares | interactive |
| 26 | physical-analogy | pr-127 | plumbing / kitchen / post office; lo-fi; marked lossy | page |
| 27 | test-honesty | pr-131, pr-148 | what tests pin down vs what the change claims | page |
| 28 | blast-radius-tool | pr-131 | script computing blast radius from symnav refs; page ranks decisions by it | tool + page |
| 29 | refusal | pr-148 | decide whether this PR is one thing; if not, split it and explain each | page |
| 30 | adjacent-pair | #146 + #147 | why is the split here; what crosses | page |
| 31 | method-runbook | pr-127 | write the extract→rank→render method as a runbook, then follow it once | method |
| 32 | kit | any | reusable components (box diagram, decision card, before/after, exit-link); demo on pr-127 | kit |
| 33 | pair-one-variable | pr-127 | two pages, identical except opening style (metaphor vs motivating failure) | pair |
| 34 | inverted-for-experts | pr-131 | evidence first, abstractions on demand | page |
| 35 | future-self | pr-148 | reader is the author six months later; decisions and reasons preserved | page |
| 36 | be-weird-a | any | invent a representation not in section 5; no other constraint | free |
| 37 | be-weird-b | any | invent a navigation shape not in section 5; no other constraint | free |
| 38 | critique | none | read all finished experiments; against philosophy.md and section 1, write what is missing, what repeats, what is promising. No page | critique |
| 39 | fresh-reader-check | none | for each finished page: read it without the diff, list the decisions you learned, then read the diff and list what you missed. One table. Also flag any rule-4 violation (surprise on descent) | critique |
| 40 | best-of-synthesis | pr-127 | read all finished experiments on pr-127; build one page taking the best element from each; credit them | page |

Briefs 38–40 go last. Re-queue 38 and 39 every ten completed experiments so the morning has a recent map. This is triage only; the human does the real judgment.

### 8.3 Generating more briefs when the queue is empty

Read the last five READMEs' "What I would do next" lines and the latest critique. Write new briefs that: (a) try what those lines suggest, (b) recombine two earlier angles that have not been combined, (c) apply a strong earlier angle to a subject it has not been tried on. Keep one in five as "be-weird". Log each generated brief in `orchestrator-log.md` with the reason.

---

## 9. Worker loop

The orchestrator runs each brief as its own subagent, using whatever subagent mechanism it has. How subagents are spawned is the orchestrator's business. What must hold:

- **One brief, one subagent, one experiment folder.** The subagent receives the brief text and nothing else from the orchestrator. Everything it needs is in the files the brief names.
- **Concurrency 5.** Raise to 8 if the machine stays responsive.
- **Queue state on disk.** A brief moves `queue/` → `queue/running/` → `queue/done/`. A copy lands in the experiment folder as `brief.md`.
- **Logs kept.** Each subagent's output or transcript is saved in its experiment folder.
- **Finish handling.** When a subagent ends: check for `README.md` (log if missing), commit the folder (`Add experiment NN <slug>`), regenerate `index.html`.
- **Stall handling.** A brief in `running/` for over three hours with no README goes back to `queue/`. Restarting the orchestrator must be safe.
- **Empty queue.** Generate more briefs per section 8.3. Never idle for long while the human sleeps.
- **Runs until killed.** Record how to stop it in `orchestrator-log.md`.
- **Model.** Strongest available. Do not downgrade to save cost.
- **Harness variety.** Two harnesses are available: Codex and Claude Code. Spread briefs across both and record which per experiment; different harnesses are one more source of variety. Codex credits are effectively unlimited. Claude Code subagents must run the Opus model, never Fable. If Claude Code fails for credit or quota reasons, put that brief back in the queue, run it on Codex, and send every later brief to Codex. Log the switch.

---

## 10. Index

The orchestrator keeps a script that regenerates `index.html` from every `experiments/*/README.md`: one row per experiment with NN, slug, kind, subjects, declared angle, entry-point link (relative), first screenshot if any, time spent, and the "What I would drop" line. Sort newest first. Also link `orchestrator-log.md` and the latest critique folders at the top. Plain HTML, no dependencies.

---

## 11. Light self-evaluation

Only what briefs 38 and 39 do: a critique pass and a fresh-reader recall check, re-run every ten experiments. Output is a table the human reads in the morning to decide where to look first. Do not build a scoring system, a leaderboard, or a gold answer key. The human is the judge; automation here is only for ordering the pile.

---

## 12. Morning handoff

When the human returns they open `index.html`. It should let them, in this order:

1. See how many experiments finished, how many failed, how many are running.
2. Read the latest critique and fresh-reader tables.
3. Open any artifact in one click.
4. Read that artifact's README without leaving the index.

`orchestrator-log.md` holds the rest: setup failures, generated briefs and why, harness per experiment, anything the orchestrator had to decide alone.

---

## 13. Forbidden

- Modifying, committing to, pushing, or rebasing any symnav branch or the symnav clone.
- Deleting another agent's worktree or experiment folder.
- Reading `~/projects/rich-review/`.
- Verdict, approve/reject, or comment-storage UI.
- Inventing a rationale for a decision and presenting it as the author's.
- Any scoring beyond section 11.

---

## 14. Decision record (from the 2026-09-13 design session)

Kept here so the orchestrator does not re-decide them.

| Topic | Decision |
| --- | --- |
| Goal | human reviews decisions and architecture, learns how the change works, judges pass/change/direction; correctness delegated to machines |
| Role framings | all of 5.1 allowed; learner is default not only |
| Boxes | lens chosen per change; show contents, boundaries, interactions |
| Human capabilities | 5.3 is the list; these are what LLMs lack |
| Trust posture | at least one adversarial agent; unrequested changes and weakened tests are first-class decisions everywhere |
| Representations | all of 5.5, freeform, any complexity including games |
| Navigation | linear and nonlinear both required; shapes in 5.6 all allowed |
| Reviewer output | none; read-only v1 |
| Inputs | bundle plus anything in 5.12; state what was used |
| Importance | 5.8; agent states its rule |
| Time budgets | rejected; not a measure |
| Measures | recall of decisions, teach-back, miss rate; tonight only light triage (section 11) |
| Subjects | fixed sample pr-127 / pr-131 / pr-148 / stack, mixed across agents; extras allowed |
| Persona | default teammate-not-this-corner; owner and outsider as required alternatives |
| Intuition | early not first; quick; lossy allowed |
| Labeling | only inexact things marked; no per-node fidelity tags |
| Experiment design | unbounded agents, run until killed, same subjects, maximum spread |
| Experiment kind | freeform |
| Technology | freeform |
| Requirements doc | layered: hard core (section 1) + inspiration (section 5) |
| Pyramid | conceptual; top can be a few ideas; deeper = higher fidelity, never new information |
| Existing surfaces | borrow allowed; page replaces GitHub above evidence layer |
| v1 repo | abandoned; never read |
| Effort | no deadline, no size target, README as important as artifact |
| Symnav | untouched, independent |
| Loop | headless workers, 5 concurrent, pre-generated queue then generative |
