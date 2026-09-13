#!/usr/bin/env python3
from pathlib import Path

from write_briefs import paths_for

ROOT = Path(__file__).resolve().parents[1]
QUEUE = ROOT / "queue"

BRIEFS = [
    (61, "pixel-causality-grid", "stack", "Turn the 26-PR stack into a pixel causality field. Each cell is a concrete decision or boundary event; compound hue=owner, shape=mechanism kind, saturation=stated/unexplained, position=dependency/time, and motion=runtime consequence.", "page, interactive", "PixiJS, regl, Observable Plot, D3, or another high-quality dense-grid renderer."),
    (62, "policy-stained-glass", "pr-131", "Represent centralized policy as stained glass: policy slices are colored material, consumer families are pane shapes, shared lead lines are required boundaries, and cracks expose bypasses or unexplained decisions. Teach why one policy can still have distinct purposes.", "page", "SVG.js, Paper.js, Rough.js, Two.js, or a generative-art library with reliable geometry."),
    (63, "daemon-constellation", "pr-148", "Build a navigable constellation of daemon ownership. Orbital groups encode package/module containment; star shape encodes mechanism type; color encodes old/new owner; gravitational links encode runtime dependence; dim stars show compatibility-only surfaces.", "page, interactive", "Sigma.js + Graphology, Cytoscape.js, D3-force, or another mature graph stack."),
    (64, "lifecycle-music-box", "pr-127", "Teach cache-turn and release ordering as a step sequencer or music box. Tracks are owners, notes are lifecycle events, harmony/dissonance distinguishes aligned vs pending completion, and the reader can solo one boundary. Sound must add information and have a visual equivalent.", "interactive instrument", "Tone.js, Web Audio helpers, canvas/SVG charting, or a sequencer component library."),
    (65, "decision-tetris", "stack", "Treat PRs as pieces that reshape architectural space. Scrubbing drops each piece into a constrained package board; color, silhouette, rotation, and occupied cells encode ownership, kind, reversibility, and affected surface. Do not make this a decorative commit animation.", "interactive", "PixiJS, Phaser, Matter.js, GSAP, or another suitable game/animation toolkit."),
    (66, "boundary-subway", "pr-148", "Map request, result, recovery, and lifecycle routes as a transit system. Line color is flow type, station shape is authority, interchange size is compounded responsibility, closures are removed routes, and express/local service distinguishes facade vs mechanism.", "page, interactive", "D3, Cytoscape, ELK.js, JointJS, or a diagram library with real routing/layout."),
    (67, "blast-radius-terrain", "pr-131", "Render policy migration as topographic terrain. Height is reference/blast radius, biome color is bounded context, contour shape is shared policy coupling, and fault lines are moved boundaries or unexplained changes. Let the reader traverse from one peak to exact evidence.", "page, interactive", "D3 contours, deck.gl, Observable Plot, Three.js terrain, or another mature spatial renderer."),
    (68, "semantic-zoom-microscope", "pr-148", "Build a microscope rather than a page: specimen overview → organelle/box → mechanism → evidence at true semantic zoom levels. Different facts may sharpen, but no new decision can appear below the top. Preserve spatial location across levels.", "interactive", "OpenSeadragon, PixiJS viewport, deck.gl, D3 zoom, or another proven zoom/pan system; do not hand-roll camera math."),
    (69, "command-me-reader", "pr-127", "Make the artifact direct the reader through a short physical/intellectual ritual: point, drag, predict, hold, release, compare, say it back. The sequence itself should make one boundary intuitive. It remains read-only and stores nothing; every instruction must earn its place.", "guided interactive", "Use a state-machine, motion, gesture, or audio library if it makes the directed experience precise and accessible."),
    (70, "bauhaus-daemon-grammar", "pr-131", "Invent a strict abstract shape language with no conventional box-and-arrow overview. Circle/square/triangle, hue, border, scale, overlap, and alignment each encode a different architectural concept. Compound them so one glyph communicates a whole policy-consumer relationship.", "page", "Paper.js, p5.js, SVG.js, Motion Canvas, or another visual-composition library."),
    (71, "pixel-city-stack", "stack", "Build a pixel city that grows across 26 PRs. District is package, building height is changed surface, facade color is owner, window patterns distinguish tests/mechanisms/contracts, and road changes show moved boundaries. Reader can stop at any skyline and inspect one block.", "interactive", "PixiJS, Phaser, Isomer, Three.js, or a tilemap/isometric library."),
    (72, "admission-circuit-board", "stack", "Explain admission, routing, transport, and recovery as a circuit board centered on the relevant stack slices. Trace one signal through logic gates; gate shape, trace color, component package, and LED state encode authority, failure vocabulary, boundary, and outcome.", "interactive simulation", "Rete.js, React Flow, JointJS, ELK.js, or a circuit/graph library. Real execution or source-derived simulation; label which."),
    (73, "daemon-weather-map", "stack", "Represent the architecture shift as changing weather. Pressure systems are ownership concentrations, fronts are moving boundaries, wind vectors are request/result flow, precipitation is failure pressure, and forecast uncertainty marks unexplained decisions. Keep mappings exact and the metaphor explicitly lossy.", "page, animated", "D3 geo/contours, deck.gl, MapLibre custom layers, or a weather visualization toolkit."),
    (74, "policy-reading-loom", "pr-131", "Evolve experiment 37's orthogonal grid for the wide policy PR. One axis is consumer family, one is policy slice; depth is held independently. Weave color, knot shape, line weight, and crossings encode purpose, shared threshold, enforcement, and rationale state.", "interactive grid", "AG Grid, Handsontable, Observable Plot, D3, CSS Grid plus a mature rendering helper, or another strong matrix toolkit."),
    (75, "message-particle-chamber", "pr-148", "Use a particle chamber to teach message framing, chunk transfer, replay, and completion ownership. Particle color, trail shape, collision behavior, chamber boundary, and decay encode message kind, identity, recovery, owner, and lifecycle. Motion must expose mechanism rather than add ambience.", "interactive simulation", "PixiJS particles, Three.js, regl, Matter.js, or another performant simulation library."),
    (76, "scientific-specimen-atlas", "pr-127, pr-131", "Combine the strong science-chapter pedagogy with a weird specimen atlas. Treat mechanisms as prepared slides: overview plate, labeled structures, controlled experiment, observed result, and prediction question. Use a visual taxonomy across the small and wide PR.", "page", "Use a publication-quality diagram/chart library, typesetting system, or notebook framework; reuse proven textbook components rather than drawing everything manually."),
    (77, "forensic-light-table", "pr-148", "Create an X-ray/light-table interface for structural change. Sliding spectral layers reveal copied, moved, newly owned, active, compatibility-only, tested, and unexplained surfaces. Color and opacity must compound into an honest structural reading of the huge PR.", "interactive", "OpenSeadragon, image-comparison/slider components, WebGL blend layers, or a canvas compositing library."),
    (78, "origami-depth", "pr-127", "Fold one complete explanation into different shapes. Every fold preserves the same facts while changing which relationships touch; unfolding adds fidelity, never a surprise. Crease direction, paper color, layer order, and exposed edge encode ownership and lifecycle.", "interactive", "GSAP Flip, Framer Motion, Three.js/CSS 3D, Origami-style prototyping tools, or another robust motion/layout library."),
    (79, "failure-domain-pinball", "stack", "Turn one request into a pinball moving through daemon failure domains. Bumpers are guards, lanes are fallback/recovery routes, color is failure vocabulary, geometry is ownership, and score lights are state only—not judgment. Let the reader replay several source-grounded paths.", "game", "Phaser, Matter.js, PixiJS, Howler, or another game/physics stack."),
    (80, "typographic-morphology", "stack", "Use typography as the architecture. Package and domain words physically morph across the stack; letterform, weight, spacing, color, and ligature encode ownership, coupling, public surface, rationale state, and consolidation. Teach one box's history through the changing word itself.", "page, animated", "Variable-font tooling, GSAP, Motion Canvas, SVG text libraries, or another typography/motion toolkit."),
]


def brief(number: int, slug: str, subjects: str, angle: str, kind: str, library_direction: str) -> str:
    bundles, worktrees = paths_for(subjects)
    return f"""# Brief {number:02d} — {slug}

You are one of many agents in a weird-interface campaign. Read, in order:
1. ~/projects/rich-review-v2/philosophy.md
2. ~/projects/rich-review-v2/playbook.md sections 1, 2, 3, 6, 7
3. The READMEs for experiments 04-textbook-chapter, 23-zoom-canvas, 36-be-weird-a, 37-be-weird-b, and 53-be-weird-53. Borrow the standard of evidence and interaction, not their implementation.

Your output folder: ~/projects/rich-review-v2/experiments/{number:02d}-{slug}/  (create it)
Input bundles: {bundles}
Worktrees: {worktrees} (read-only except build output)
Earlier experiments: ~/projects/rich-review-v2/experiments/ (read enough to avoid repeating an existing representation; name what you used)

## Subjects
{subjects}

## Assigned angle
{angle}

## Kind
{kind}

## Library direction
{library_direction}

## Weirdness contract
- Teach one narrow aspect deeply. You do not need to explain the whole PR or stack.
- The unusual representation is the explanation, not a themed wrapper around ordinary cards.
- Compound at least three factual concepts through distinct channels such as color, shape, position, texture, motion, sound, scale, or interaction. Provide a compact legend.
- Preserve the pyramid invariant. The complete top layer names every decision or surprise that appears below it.
- Prefer mature libraries, components, assets, layout engines, renderers, and services when they improve the result. Spend time evaluating options. Do not hand-roll graph layout, semantic zoom, animation, or diagram routing when a suitable library can do it better.
- Visual and interaction quality matter. Run browser/interaction checks and inspect screenshots. Keep conventional prose only where the representation cannot carry the fact.
- Mark every lossy analogy or illustrative simulation where it appears. Ground factual claims in the supplied bundles, worktrees, real traces, or source receipts.

## Constraints
Hard rules in playbook section 1 apply. Technology is unrestricted. External libraries, APIs, hosted helpers, generated assets, native apps, game engines, notebooks, and build systems are allowed. No deadline or size target. If the idea fails, preserve the negative result and try another representation in the same folder.

## When done
README.md per playbook section 7. Add the representation's visual-variable legend, libraries considered/used, and what the weird form taught better or worse than a conventional diagram. Then stop.
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
