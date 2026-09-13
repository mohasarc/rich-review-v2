# Composition choices

Reviewed the official references for [SVG.js 3.2](https://svgjs.dev/docs/3.2/), [Paper.js](https://paperjs.org/about/) and [p5.js](https://p5js.org/reference/). This was a capability review, not a comparative performance benchmark. Only SVG.js was installed and executed.

| Option | Needed capability | Decision |
| --- | --- | --- |
| SVG.js 3.2.4 | Retained SVG groups, circle/rectangle/polygon construction, clip paths, animation, element events | Used. The circle/consumer intersection is a clipped duplicate circle; source-field marks remain inspectable DOM elements. Its built-in animation handles temporary separation. |
| Paper.js | Vector scene graph, compound paths, geometric operations | Considered. The fixed grammar needs no path booleans beyond a simple clip; a canvas scene would add a second accessibility representation. |
| p5.js | Canvas primitive drawing and interactive composition | Considered. A draw loop supplies no needed capability for three static contracts and an inspectable field list. |
| Hand-written SVG alone | Fixed primitive generation | Considered. SVG.js supplies a consistent group/clip/animation API without building that machinery here. |

The layout is a fixed three-row type specimen, not an inferred graph. There is no graph layout, diagram routing, semantic zoom or physical simulation. Direct arithmetic sets circle area to one area unit per input field. Other primitive sizes are constant.

An early idea made overlap area proportional to direct reads. It was dropped before implementation: it would make the required-slice relationship look like fractional memory sharing and would obscure the optional scalar. The shipped grammar uses binary overlap plus explicit field points.

The first rendered columns had unequal inner widths, so the same source row drifted across columns. Equal padding/borders and top-aligned button contents fixed that. Browser checks then found a long class name overflowing at 320 px; word wrapping fixed it. The retained `evidence/browser-check-failure.json` records that pre-fix failure. A separated registry label also needed its own offset to remain readable beside the shifted square.

No alternate implementation was abandoned. The initial broader policy-family idea was narrowed before construction after reading experiments 62 and 67, which already teach shared policy domains.
