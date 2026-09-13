# Review kit authoring contract

Open `kit.html` for the illustrated guide and live component specimen. Open `index.html` for the complete PR 127 demo. Both work as files, with no install or server.

Copy `kit/` into your own folder. Run `python3 starter.py` here to rebuild the smallest example using all four components. Python 3.10 or later, standard library only. `python3 build.py` rebuilds the full demo from `sources/snapshot.json`; it does not need the original worktrees or network.

## Four exported components

Import from `kit.components`. Every component is an immutable dataclass with a `.render() -> str` method. Text fields are escaped. Identifiers must match `[a-z][a-z0-9-]*` and be unique within the resulting document. The `before`, `after`, and `page` body arguments accept trusted HTML returned by other components or written by the author; they are not an untrusted-content sanitizer.

| Component | Required inputs | Contract |
| --- | --- | --- |
| `BoxDiagram` | `id`, `title`, `description`, `width`, `height`, `boxes` | Draw explicit ownership; name the interactions. All edge endpoints must exist, box IDs must be distinct, and boxes must fit the view box. |
| `DecisionCard` | `id`, `number`, `title`, `choice`, `status`, `reason`, `target` | Surface the choice before explaining how. `status` must be `stated` or `unexplained`. A stated reason also requires `reason_target`. |
| `BeforeAfter` | `id`, `title`, `before`, `after` | Present both versions of the same subject together. Both contents are trusted HTML. |
| `ExitLink` | `id`, `target`, `label` | Link to an existing same-document ID. A unique origin makes an exact return possible. |

`Box` inputs: `id, x, y, width, height, title`, then optional `lines=()`, `boundary=False`, `tone="neutral"`, `target=None`. `boundary=True` draws an ownership enclosure; place it before its contained boxes in the list. Coordinates express containment visually; the accessible diagram description must name that containment too. A target turns the box into an ordinary SVG anchor. Optional tones are `neutral`, `changed`, and `removed`.

`Edge` inputs: `source, target, label`, then `source_port="bottom"`, `target_port="top"`, `tone="neutral"`, `via=()`, `label_at=None`. Ports are `top`, `bottom`, `left`, or `right`. `via` holds optional coordinate tuples for author-controlled bends. `label_at` positions the label. The kit draws arrows, validates endpoint names, and does not invent layout or architecture.

`BoxDiagram` also accepts `edges=()` and `lossy_note=""`. A full description is required for nonvisual reading. Put any simplifying assumption in `lossy_note`; do not label each node with a fidelity score. The paired PR 127 diagram uses a comparison-level note because the same simplification applies to both halves.

`BeforeAfter` also accepts `before_label="Before"`, `after_label="After"`, and `note=""`. Its slots can hold diagrams, flow markup, tables, code, or other static HTML. A failure-path comparison can use alternative labels while preserving paired layout. Timelines must say when they are illustrative rather than recorded executions.

`page(title, body, prefix="", active="demo")` is an optional experiment shell. It references `kit/review.css` and `kit/exit-link.js`. For reuse, replace this tiny shell with your own navigation, or include those two assets from an existing page. The four components themselves contain no PR-specific navigation.

## Returning from an exit

Use an ordinary destination section:

```html
<section id="mechanism-id">
  <header class="depth-header">
    <h3>The mechanism</h3>
    <a data-return href="#decision-id">← Return to the decision</a>
  </header>
  ...
</section>
```

An exit click updates this return anchor to the origin’s unique ID. The anchor jump remains native, so browser history and modifier-click work normally. `hashchange` moves focus to the destination heading or link. Deep links open enclosing `<details>`. A return to an SVG box focuses its anchor. Missing JavaScript leaves an ordinary linear page and ordinary fallback backlinks. The script never calls a service or uses local/session storage.

The author supplies fallback backlinks; the component library cannot know the best fallback for a copied deep link. If several readers or visits need distinct histories, each loaded browser document already has its own navigation. No review data is collected.

## Preserve the pyramid while authoring

1. Extract decisions from the full diff and intent sources. Include small public API changes, unrequested changes, test deletions, and changed assertions. Do not limit extraction to the PR's Decisions heading.
2. Give every choice a root card. Include its reason or the absence of one, its lifetime limits, and conflicts between sources. Use diagrams and paired views to make their relationships visible.
3. Write a mechanism for each root choice. A lower section may add concrete names, values, and call order for a fact already announced. If it adds a distinct consequence or decision, promote that fact to the root first.
4. Attach source excerpts to the same choice. Distinguish the source of a reason from the source showing the implementation. Tests contain asserted behavior; reading them is not running them.
5. Connect root → mechanism → evidence and provide returns. Keep the document readable top to bottom too.

`Layer(id, claims, parent)` and `validate_layers(root_claims, layers)` provide a small structural check. Parents must precede children, IDs must be unique, and each child's claims must be a nonempty subset of its parent's. This catches an orphan decision identifier. It cannot prove that prose contains no surprise; a manual descent audit is still necessary. It is not a score or a correctness check on the PR.

## Reuse without inheriting this demo's decisions

The reusable directory is `kit/`. `build.py`, `capture_sources.py`, the source snapshots, and the PR-specific prose are the demonstration. Rebuild from the checked-in snapshots for reproducibility. Recapture only when deliberately updating the subject; `capture_sources.py` checks the expected worktree commits and only reads them.

The CSS uses `rk-` names for the four components and a few optional document layout classes. It does not use Shadow DOM. Adapt typography and color variables at `:root`; keep visible focus, distinct changed/removed stroke patterns, mobile panel stacking, and evidence overflow. The page shell adds global element styles; scope those if embedding in another application.

## Limits observed in this experiment

- The complete root becomes substantial when ten decisions need distinct reasons. Two columns keep cards readable, but a reusable component does not solve ranking or information compression.
- SVG coordinates make ownership precise and deterministic, but they cost author time. Small displays scroll within a diagram rather than shrinking its labels below legibility.
- Source excerpts can be verified against the captured text; capture hashes do not prove the upstream author intended every explanation.
- The JavaScript enhancement remembers one latest origin per destination in the current DOM. Browser Back provides the full navigation history.
- This prototype has a complete single-PR demo and a smaller example from that PR. It has not established that the same components explain PR 148 or the whole stack equally well.
