"""Minimal reuse of all four components, using one decision from the PR 127 demo."""

from pathlib import Path

from kit.components import BeforeAfter, Box, BoxDiagram, DecisionCard, ExitLink, page


old = BoxDiagram(
    "starter-before", "Cache lifetime before PR 127", "The TypeScript service owns six Maps and manual clearing.",
    480, 210,
    (Box("service", 20, 20, 440, 170, "@symnav/backend-typescript", boundary=True),
     Box("maps", 45, 76, 390, 78, "Six Maps and manual clearing", ("TypeScript semantic query service",), tone="removed", target="starter-detail")),
).render()
new = BoxDiagram(
    "starter-after", "Cache lifetime after PR 127", "Core implements the scope and its private Maps; TypeScript invokes this object.",
    480, 210,
    (Box("core", 20, 20, 440, 170, "@symnav/core", boundary=True, tone="changed"),
     Box("scope", 45, 76, 390, 78, "TurnScopedCacheScope", ("Called by the TypeScript query service",), tone="changed", target="starter-detail")),
).render()
decision = DecisionCard(
    "starter-decision", "01", "Put cache lifetime in core",
    "Core implements the scope and typed handles; TypeScript calls the scope at turn and release boundaries.",
    "stated", "The architecture spec assigns shared query-cache lifecycle to core.",
    "starter-detail", "starter-evidence",
).render()
body = '<div class="hero"><p class="eyebrow">One real decision / a minimal composition</p><h1>Move the lifetime owner.</h1><p class="lead">This is a component example drawn from PR 127. <a href="index.html">The complete review covers the other decisions.</a></p></div>'
body += BeforeAfter("starter-comparison", "Move the cache lifetime owner", old, new,
    note="Simplified ownership fragment: other classes, handles, and interactions are omitted. This example covers only the core-ownership decision.").render()
body += f'<div class="section-intro"><h2>The choice and its reason</h2></div>{decision}'
body += f'''<section class="depth-section" id="starter-detail"><header class="depth-header"><h3>The service calls a core object.</h3><a data-return href="#starter-decision">← Return to the decision</a></header><p>TypeScript still determines the turn and release boundaries. The core scope implements clearing through the typed cache handles it owns.</p>{ExitLink("starter-evidence-exit", "starter-evidence", "Read the stated reason").render()}</section>'''
body += '<section class="depth-section" id="starter-evidence"><header class="depth-header"><h3>The architecture spec assigns ownership.</h3><a data-return href="#starter-detail">← Return to the mechanism</a></header><p><a href="sources/spec-head.html#L53">Captured spec, lines 53–64</a> names turn-scoped query-cache lifecycle as shared core logic and semantic query bodies as TypeScript logic. <a href="sources/core-index-head.html#L152">The new core export</a> and <a href="sources/service-head.html#L31">the service’s scope field</a> show the implementation.</p></section>'
Path(__file__).with_name("starter.html").write_text(page("One ownership decision · Kit starter", body, active="kit"))
print("Built starter.html with all four components.")
