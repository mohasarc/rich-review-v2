from pathlib import Path
import json, html
OUT=Path(__file__).resolve().parents[1]
d=json.loads((OUT/'evidence/field.json').read_text())
esc=html.escape
surface=''.join(f'<li id="surface-{b["id"]}"><a href="#149-{b["id"]}" data-select="149-{b["id"]}" class="fact-letter">{b["letter"]}</a><div><a href="#149-{b["id"]}" data-select="149-{b["id"]}"><strong>{b["title"]}</strong></a><span class="reason-tag {b["reason"]}">{"S" if b["reason"]=="stated" else "U"}</span><p>{esc(b["summary"])}</p></div></li>' for b in d['boundaries'])
legend=''.join(f'<span><i style="background:{o["color"]}"></i>{o["label"]}</span>' for o in d['owners'].values())
table=''
for r in d['rows']:
    cells=[c for c in d['cells'] if c['pr']==r['number']]
    table+='<tr><th>'+r['label']+'</th>'+''.join(f'<td><a href="evidence/source/{c["refs"][0]["source"]}.html#L{c["refs"][0]["anchor"]}">{esc(d["owners"][c["owner"]]["label"])}</a></td>' for c in cells)+'</tr>'
template='''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>Finished isn’t finished · Pixel causality field</title><link rel="icon" href="data:,"><link rel="stylesheet" href="style.css"><script defer src="vendor/d3.v7.9.0.min.js"></script><script defer src="data.js"></script><script defer src="recordings.js"></script><script defer src="app.js"></script></head>
<body><a class="skip" href="#surface">Skip to the complete boundary key</a>
<header class="masthead"><a href="#top" class="brand"><span class="brand-pixel"></span>RICH REVIEW <span>/ FIELD NOTES</span></a><span>EXPERIMENT 061 <b>·</b> STACK / 123—149</span><a href="README.md">READ ME ↗</a></header>
<main id="top">
<section class="opening"><div><p class="eyebrow">THE PIXEL CAUSALITY FIELD</p><h1>Finished isn’t finished<span>.</span></h1><p class="dek">One accepted request, nine boundaries, 26 PRs.<br>A terminal result can still be holding the next turn.</p></div><div class="scope"><span class="scope-number">26<span>×</span>9</span><p>PR heads × boundary events<br><span>plus main as the baseline</span></p><a href="#recording">Watch the FIFO stay closed ↓</a></div></section>

<section class="surface-layout" aria-label="Complete stopping layer">
<div class="map-side">
<div class="panel-heading"><h2>Where the boundary lives</h2><span>ACTIVE PATH · MAIN → #149</span></div>
<div class="owner-legend" aria-label="Hue is coordinating owner">__LEGEND__</div>
<div class="small-legend"><span><b>■</b> state</span><span><b>◆</b> await gate</span><span><b>▶</b> dispatch</span><span><b>●</b> side effect</span><span class="sat-key"><i></i> S stated <i class="muted"></i> U unexplained</span></div>
<p class="encoding-note">Hue = local owner · shape = mechanism · saturation = reason status in the supplied stack. S is not a date or a correctness claim.</p>
<div class="field-scroll" tabindex="0" aria-label="Scrollable 27 by 9 field. Arrow keys on a cell select adjacent events."><svg id="field" viewBox="0 0 860 586" aria-labelledby="field-title field-desc"><title id="field-title">Ownership field across 26 PR heads and main</title><desc id="field-desc">Rows advance through the PR stack; columns A through G follow the turn dependency order. H and I are a separate acknowledgement branch. Every symbol selects its exact source receipt.</desc></svg><noscript><p>JavaScript draws the field. The complete boundary key and source inventory remain available below.</p></noscript></div>
<div class="field-bottom"><span id="coordinate">#149 / E · Wait for stream</span><span>← ↑ ↓ → MOVE &nbsp; ENTER INSPECT</span></div>
<p class="geometry-note">Schematic coordinates: vertical spacing is stack order, horizontal spacing is dependency order; neither measures time or code size. Stable color does not mean unchanged code.</p>
<div class="movement-notes">
<a href="#145-worker" data-select="145-worker"><b>145</b><span>Worker generations leave the process shell.</span></a>
<a href="#146-stream" data-select="146-stream"><b>146</b><span>Delivery gets its own coordinator.</span></a>
<a href="#147-accept" data-select="147-accept"><b>147</b><span>Accepted execution gets its own coordinator.</span></a>
</div>
</div>
<aside id="surface" class="surface-key"><div class="panel-heading"><h2>The complete boundary key</h2><span>A— I</span></div><p class="key-intro">Read down once, or select any letter.<br>Each deeper view refines one of these facts.</p><ol>__SURFACE__</ol></aside>
</section>

<section class="surface-foot" aria-label="Additional decisions in the complete layer">
<div><p class="eyebrow">P / THE PACKAGE BOUNDARY <span class="reason-tag stated">S</span></p><p><strong>#148 stages the package; #149 switches the CLI.</strong> The active #148 path still uses the frozen CLI graph. #149 removes those app-owned mechanisms; CLI invocation remains host-owned.</p><p class="reason-line">Stated: keep relocation and host coordination separately reviewable (#148); retain argv/workspace ownership in CLI (#149).</p><button class="text-button" data-special="package">Inspect the two entry paths ↗</button></div>
<div><p class="eyebrow">T / WHAT A TEST STOPS SAYING <span class="reason-tag unexplained">U</span></p><p><strong>#148 changes the worker readiness fixture and removes its timing expectations.</strong> Startup and execution-duration expectations disappear from that case. This does not establish the absence of timing coverage elsewhere.</p><p class="reason-line">The package test move is explained; the removal of these precise expectations is unexplained in the inspected prose.</p><button class="text-button" data-special="test">Inspect the removed expectations ↗</button></div>
</section>
<div class="stopping-line"><span>COMPLETE STOPPING LAYER ENDS HERE</span><p>Nine boundaries + package cutover + changed test evidence. Other stack decisions are outside this narrow lens.</p></div>

<section id="recording" class="recording">
<div class="section-top"><div><p class="eyebrow">MOTION / WHAT MUST SETTLE NEXT</p><h2>Hold the stream. Watch the queue.</h2></div><div class="record-selectors"><label>Build<select id="build"><option value="tip">#149 · package</option><option value="main">main · CLI</option></select></label><label>Recording<select id="scenario"><option value="normal">Normal completion</option><option value="sample-reject">Sampling rejects</option><option value="cleanup-reject">Cleanup rejects</option></select></label></div></div>
<p class="recording-limits"><strong>Recorded source execution with controlled ports.</strong> Real coordinator, queue, ledger and delivery methods; fake worker, spool, filesystem, clock and sends. The workspace remains present. Playback spacing and motion are illustrative, not measured latency. No live daemon runs here.</p>
<div class="runtime-boxes"><span>CLI process <small>caller</small></span><b>↔ socket boundary</b><span>Daemon process <small>acceptance · FIFO · delivery · ledger</small></span><b>↔ worker protocol</b><span>Worker thread <small>host executor</small></span></div>
<p class="geometry-note">Runtime topology is a simplified source map. Package relocation does not turn these into three new processes; the recording substitutes ports at these boundaries.</p>
<div class="record-stage"><svg id="run-field" viewBox="0 0 1160 195" aria-label="Recorded checkpoint. Request A and B occupy separate rows; acknowledgement takes a separate branch."></svg></div>
<div class="transport-controls"><button id="prev-step" aria-label="Previous recorded checkpoint">←</button><button id="play">▶ Play recording</button><button id="next-step" aria-label="Next recorded checkpoint">→</button><input id="step" aria-label="Recorded checkpoint" type="range" min="0" max="5" value="1"><span id="step-count">02 / 06</span></div>
<div class="readout" aria-live="polite"><p id="checkpoint-title"></p><div id="checkpoint-facts"></div></div>
<a class="text-link" href="evidence/recordings.json">Open all six raw recordings ↗</a>
</section>

<section id="inspector" class="inspector" aria-labelledby="inspector-title">
<div class="section-top"><div><p class="eyebrow" id="inspector-coordinate">EVIDENCE / #149 · E</p><h2 id="inspector-title">Wait for stream</h2></div><div class="inspect-controls"><button id="previous-cell">← Previous boundary</button><button id="next-cell">Next boundary →</button><button id="return-field">↑ Return to selected pixel</button></div></div>
<div class="inspector-body"><div class="mechanism"><p id="owner-path"></p><p id="mechanism-text"></p><div class="rationale"><p id="reason-heading"></p><p id="reason-text"></p></div><p id="pr-context"></p><div id="reason-sources"></div></div><div class="receipts" id="receipts"></div></div>
</section>

<details class="inventory"><summary>Text inventory · all 243 cells and their local source receipts</summary><p>Each linked owner is one boundary at one revision. Open a source file to see its pin, hash and numbered lines.</p><div class="inventory-scroll"><table><thead><tr><th>PR</th>__HEADERS__</tr></thead><tbody>__TABLE__</tbody></table></div></details>
<footer><span>READ-ONLY · NO REVIEW STATE COLLECTED</span><p>Main <code>b6801eb</code> → tip <code>d070023</code>. Captured from supplied bundles and pinned Git objects. <a href="evidence/capture.json">Capture manifest</a> · <a href="README.md">Method, limits & checks</a></p><a href="#top">Back to field ↑</a></footer>
</main>
<dialog id="source-dialog" aria-labelledby="dialog-title"><div class="dialog-heading"><div><p class="eyebrow">PINNED SOURCE</p><h2 id="dialog-title"></h2></div><button id="close-dialog" aria-label="Close source">×</button></div><div id="dialog-content"></div></dialog>
</body></html>'''
(OUT/'index.html').write_text(template.replace('__SURFACE__',surface).replace('__LEGEND__',legend).replace('__TABLE__',table).replace('__HEADERS__',''.join('<th>'+b['letter']+' '+b['title']+'</th>' for b in d['boundaries'])))
print('Built index.html with complete static boundary key and 243 linked source cells.')
