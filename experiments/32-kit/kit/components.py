"""Four static review components. Python standard library; no browser framework."""

from dataclasses import dataclass
from html import escape
import re
from typing import Literal


def text(value: object) -> str:
    return escape(str(value), quote=True)


def identifier(value: str) -> str:
    if not re.fullmatch(r"[a-z][a-z0-9-]*", value):
        raise ValueError(f"Invalid HTML identifier: {value!r}")
    return value


@dataclass(frozen=True)
class ExitLink:
    """An ordinary same-document anchor, enhanced with an exact return address."""

    id: str
    target: str
    label: str

    def render(self) -> str:
        return (
            f'<a class="rk-exit" data-exit id="{identifier(self.id)}" '
            f'href="#{identifier(self.target)}">{text(self.label)}'
            '<span aria-hidden="true"> ↗</span></a>'
        )


@dataclass(frozen=True)
class DecisionCard:
    id: str
    number: str
    title: str
    choice: str
    status: Literal["stated", "unexplained"]
    reason: str
    target: str
    reason_target: str | None = None

    def __post_init__(self):
        identifier(self.id)
        if self.status not in ("stated", "unexplained"):
            raise ValueError("A decision needs a stated or unexplained reason.")
        if not self.reason.strip():
            raise ValueError("Explain the reason, or describe where none was found.")
        if self.status == "stated" and not self.reason_target:
            raise ValueError("A stated reason needs an evidence destination.")

    def render(self) -> str:
        reason_link = (
            ExitLink(f"{self.id}-reason", self.reason_target, "Reason source").render()
            if self.reason_target else ""
        )
        return f'''<article class="rk-decision {self.status}" id="{self.id}" data-claim="{self.id}">
          <div class="rk-card-meta"><span class="rk-number">{text(self.number)}</span>
            <span class="rk-status">Reason {text(self.status)}</span></div>
          <h3>{text(self.title)}</h3><p class="rk-choice">{text(self.choice)}</p>
          <p class="rk-reason">{text(self.reason)}</p>
          <div class="rk-card-links">{ExitLink(f"{self.id}-exit", self.target, "See how it works").render()}{reason_link}</div>
        </article>'''


@dataclass(frozen=True)
class BeforeAfter:
    id: str
    title: str
    before: str
    after: str
    before_label: str = "Before"
    after_label: str = "After"
    note: str = ""

    def render(self) -> str:
        # before/after are trusted, already-rendered component HTML.
        return f'''<section class="rk-comparison" id="{identifier(self.id)}" aria-label="{text(self.title)}">
          <div class="rk-pair"><div class="rk-side rk-before"><h3 class="rk-side-label">{text(self.before_label)}</h3>{self.before}</div>
          <div class="rk-side rk-after"><h3 class="rk-side-label">{text(self.after_label)}</h3>{self.after}</div></div>
          {f'<p class="rk-caption">{text(self.note)}</p>' if self.note else ''}
        </section>'''


@dataclass(frozen=True)
class Box:
    id: str
    x: int
    y: int
    width: int
    height: int
    title: str
    lines: tuple[str, ...] = ()
    boundary: bool = False
    tone: Literal["neutral", "changed", "removed"] = "neutral"
    target: str | None = None

    def port(self, name):
        return {
            "top": (self.x + self.width / 2, self.y),
            "bottom": (self.x + self.width / 2, self.y + self.height),
            "left": (self.x, self.y + self.height / 2),
            "right": (self.x + self.width, self.y + self.height / 2),
        }[name]


@dataclass(frozen=True)
class Edge:
    source: str
    target: str
    label: str
    source_port: str = "bottom"
    target_port: str = "top"
    tone: Literal["neutral", "changed", "removed"] = "neutral"
    via: tuple[tuple[int, int], ...] = ()
    label_at: tuple[int, int] | None = None


@dataclass(frozen=True)
class BoxDiagram:
    id: str
    title: str
    description: str
    width: int
    height: int
    boxes: tuple[Box, ...]
    edges: tuple[Edge, ...] = ()
    lossy_note: str = ""

    def render(self) -> str:
        identifier(self.id)
        by_id = {box.id: box for box in self.boxes}
        if len(by_id) != len(self.boxes):
            raise ValueError("Diagram boxes must have distinct identifiers.")
        shapes = []
        for box in self.boxes:
            if box.x < 0 or box.y < 0 or box.x + box.width > self.width or box.y + box.height > self.height:
                raise ValueError(f"Box {box.id} falls outside the diagram.")
            kind = "boundary" if box.boundary else "node"
            label = "; ".join((box.title, *box.lines))
            rect = f'<rect x="{box.x}" y="{box.y}" width="{box.width}" height="{box.height}" rx="7"/>'
            title = f'<text class="rk-box-title" x="{box.x+14}" y="{box.y+25}">{text(box.title)}</text>'
            lines = "".join(f'<text class="rk-box-line" x="{box.x+14}" y="{box.y+49+i*20}">{text(line)}</text>' for i, line in enumerate(box.lines))
            content = f'<g class="rk-{kind} {box.tone}">{rect}{title}{lines}</g>'
            if box.target:
                link_id = identifier(f"{self.id}-{box.id}-exit")
                content = f'<a data-exit id="{link_id}" href="#{identifier(box.target)}" aria-label="{text(label)}. Open explanation.">{content}</a>'
            shapes.append(content)
        edges = []
        for edge in self.edges:
            if edge.source not in by_id or edge.target not in by_id:
                raise ValueError("Every edge must name two existing boxes.")
            start, end = by_id[edge.source].port(edge.source_port), by_id[edge.target].port(edge.target_port)
            points = (start, *edge.via, end)
            path = "M " + " L ".join(f"{x:g} {y:g}" for x, y in points)
            x, y = edge.label_at or ((start[0]+end[0])/2+8, (start[1]+end[1])/2-6)
            edges.append(f'<g class="rk-edge {edge.tone}"><path d="{path}" marker-end="url(#{self.id}-arrow-{edge.tone})"/><text x="{x:g}" y="{y:g}">{text(edge.label)}</text></g>')
        markers = "".join(f'<marker id="{self.id}-arrow-{tone}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path class="rk-arrow {tone}" d="M0,0 L8,4 L0,8 Z"/></marker>' for tone in ("neutral", "changed", "removed"))
        return f'''<figure class="rk-diagram" id="{self.id}">
          <div class="rk-diagram-scroll" tabindex="0" role="group" aria-label="{text(self.title)}; scroll horizontally on narrow screens">
          <svg viewBox="0 0 {self.width} {self.height}" role="group" aria-labelledby="{self.id}-title {self.id}-desc">
            <title id="{self.id}-title">{text(self.title)}</title><desc id="{self.id}-desc">{text(self.description)}</desc>
            <defs>{markers}</defs>{''.join(shapes)}{''.join(edges)}
          </svg></div>{f'<figcaption class="rk-caption">{text(self.lossy_note)}</figcaption>' if self.lossy_note else ''}
        </figure>'''


@dataclass(frozen=True)
class Layer:
    """Structural coverage only. A human must still check semantic completeness."""

    id: str
    claims: tuple[str, ...]
    parent: str


def validate_layers(root_claims: tuple[str, ...], layers: tuple[Layer, ...]) -> None:
    available = {"overview": set(root_claims)}
    if len(available["overview"]) != len(root_claims):
        raise ValueError("Duplicate root claim.")
    for layer in layers:
        identifier(layer.id)
        if layer.id in available or layer.parent not in available:
            raise ValueError(f"Layer {layer.id} needs a unique ID and an earlier parent.")
        if not layer.claims or not set(layer.claims) <= available[layer.parent]:
            raise ValueError(f"Layer {layer.id} introduces an unannounced claim.")
        available[layer.id] = set(layer.claims)


def page(title: str, body: str, *, prefix: str = "", active: str = "demo") -> str:
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{text(title)}</title><link rel="icon" href="data:,"><link rel="stylesheet" href="{prefix}kit/review.css">
<script src="{prefix}kit/exit-link.js" defer></script></head><body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><a class="wordmark" href="{prefix}index.html">rich<span>review</span> <b>32 / KIT</b></a>
<nav aria-label="Experiment"><a href="{prefix}index.html" {'aria-current="page"' if active=='demo' else ''}>PR 127 demo</a><a href="{prefix}kit.html" {'aria-current="page"' if active=='kit' else ''}>Use the components</a></nav></header>
<main id="main">{body}</main><footer class="site-footer">Experiment 32 · Read-only review kit · <a href="{prefix}README.md">Experiment notes</a></footer>
</body></html>'''
