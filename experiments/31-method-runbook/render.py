#!/usr/bin/env python3
"""Render the frozen, manually authored ledger as a self-contained teaching page."""
from pathlib import Path
from html import escape
import json
import re

OUT = Path(__file__).resolve().parent
LEDGER = json.loads((OUT / "ledger.json").read_text())
MANIFEST = json.loads((OUT / "source-manifest.json").read_text())
ORDER = ["D01", "D12", "D02", "D03", "D04", "D05", "D06", "D08", "D09", "D07", "D10", "D11"]
DECISIONS = {d["id"]: d for d in LEDGER["decisions"]}
EVIDENCE = {e["id"]: e for e in LEDGER["evidence"]}
CLAIMS = {c["id"]: c for c in LEDGER["claims"]}

STYLE = """
:root{--paper:#f6f3eb;--white:#fffef9;--ink:#202c2b;--muted:#53645f;--line:#c7cec6;--green:#19645c;--greenwash:#e4eee7;--rust:#90462e;--rustwash:#f5e3d8;--amber:#775400;--amberwash:#f7ebc5;--mono:ui-monospace,SFMono-Regular,Menlo,monospace}
*{box-sizing:border-box}html{scroll-padding-top:84px}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:var(--green);text-decoration-thickness:1px;text-underline-offset:3px}a:hover{color:var(--rust)}a:focus-visible,summary:focus-visible{outline:3px solid var(--rust);outline-offset:4px}h1,h2,h3,h4,p,figure{margin-top:0}h1{font-size:clamp(36px,4.8vw,62px);font-weight:650;letter-spacing:-.045em;line-height:1.06;margin-bottom:24px;max-width:1020px}h2{font-size:30px;letter-spacing:-.025em;line-height:1.2}h3{font-size:21px;line-height:1.25;letter-spacing:-.02em}h4{font-size:17px}p{margin-bottom:15px}small,.small{font-size:13px}code{font-family:var(--mono);font-size:.86em}pre{white-space:pre;overflow:auto;font:12px/1.65 var(--mono);padding:18px;background:#182b2a;color:#eff3e9;border-radius:3px;tab-size:2}pre code{font-size:inherit}nav{display:flex;gap:22px;flex-wrap:wrap;align-items:center}nav a{text-decoration:none;font-size:13px;font-weight:600}header.bar{position:sticky;top:0;z-index:5;background:rgba(246,243,235,.97);border-bottom:1px solid var(--line);padding:16px max(24px,calc((100vw - 1180px)/2));display:flex;justify-content:space-between;align-items:center;gap:20px}.brand{font:12px var(--mono);letter-spacing:.08em}.brand b{display:inline-block;background:var(--ink);color:var(--paper);padding:5px 7px;margin-right:10px}main{max-width:1180px;margin:auto;padding:50px 24px 70px}.kicker{font:12px/1.5 var(--mono);letter-spacing:.07em;text-transform:uppercase;color:var(--muted);margin-bottom:18px}.intro{font-size:19px;max-width:870px;color:var(--muted)}.top-note{border-left:3px solid var(--line);padding-left:16px;max-width:920px;color:var(--muted);font-size:14px}.section-line{display:flex;align-items:baseline;justify-content:space-between;gap:20px;border-top:1px solid var(--line);padding-top:24px;margin-top:40px}.section-line h2{margin-bottom:14px}.diptych{display:grid;grid-template-columns:1fr 1fr;gap:20px}.map-side{border:1px solid var(--line);padding:20px;background:var(--white)}.side-title{display:flex;justify-content:space-between;font:12px var(--mono);margin-bottom:15px}.package{border:1px solid var(--line);padding:14px}.package+.package{margin-top:12px}.package-label{font:11px var(--mono);font-weight:700;margin-bottom:12px}.module{padding:10px 12px;border:1px solid var(--line);background:var(--paper);font-size:14px}.module strong{display:block}.module small{display:block;margin-top:3px;color:var(--muted)}.module a{display:block;text-decoration:none}.flow-arrow{font:11px/1.5 var(--mono);color:var(--muted);padding:6px;text-align:center}.removed{background:var(--rustwash);border-color:#c28e77}.added{background:var(--greenwash);border:2px solid var(--green)}.caches{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:10px}.cache{border:1px solid #809a89;border-radius:2px;padding:5px 2px;text-align:center;font:10px/1.35 var(--mono);background:var(--white)}.mini-context{font-size:12px;color:var(--muted);border-top:1px dashed var(--line);margin-top:12px;padding-top:10px}.legend{display:flex;gap:20px;flex-wrap:wrap;font-size:12px;margin:12px 0}.legend span:before{content:"";display:inline-block;width:10px;height:10px;margin-right:6px;background:var(--line)}.legend .old:before{background:#c28e77}.legend .new:before{background:var(--green)}figcaption{font-size:13px;color:var(--muted);margin-top:14px;max-width:960px}.lifelines{border:1px solid var(--line);background:var(--white);padding:20px}.life-row{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:center}.life-row+.life-row{margin-top:14px;border-top:1px solid var(--line);padding-top:14px}.life-label{font:12px var(--mono)}.steps{display:flex;gap:8px;align-items:stretch;flex-wrap:wrap}.step{padding:11px 13px;flex:1;min-width:145px;background:var(--paper);border:1px solid var(--line);font-size:13px}.step a{display:block}.step.changed{background:var(--greenwash);border-color:var(--green)}.step.caution{background:var(--amberwash);border-color:#b99853}.chevron{align-self:center;color:var(--muted)}.split-note{display:flex;gap:18px;flex-wrap:wrap;margin-top:14px;font-size:13px}.group-heading{font-size:17px;letter-spacing:0;margin:30px 0 14px}.decisions{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.decision{padding:22px;background:var(--white);border:1px solid var(--line);display:flex;flex-direction:column;scroll-margin-top:100px}.decision.unexplained{border-top:3px solid #b0882f}.decision h3{margin:10px 0 14px}.decision-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.decision-id{font:12px var(--mono);color:var(--muted)}.status{font:11px var(--mono);text-transform:uppercase;letter-spacing:.045em}.status.stated{color:var(--green)}.status.unexplained{color:var(--amber)}.decision p{font-size:14px;line-height:1.6}.decision .reason{border-top:1px solid var(--line);padding-top:12px;color:var(--muted);font-size:12px}.decision .deeper{margin-top:auto;font-size:13px;font-weight:650}.stop{margin:28px 0 65px;padding:18px 20px;border-left:4px solid var(--green);background:var(--greenwash);font-size:14px}.detail{padding-top:30px;margin-top:30px;border-top:1px solid var(--line)}.detail-head{display:flex;justify-content:space-between;gap:20px;align-items:baseline}.detail-head>a{font-size:13px;white-space:nowrap}.beforeafter{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);margin-bottom:22px}.beforeafter>div{padding:16px;background:var(--white);font-size:14px}.beforeafter label{display:block;font:10px var(--mono);color:var(--muted);text-transform:uppercase;margin-bottom:6px}.table-wrap{max-width:100%;overflow:auto}table{border-collapse:collapse;width:100%;font-size:13px;text-align:left;margin:15px 0 23px}th,td{padding:13px 12px;border-bottom:1px solid var(--line);vertical-align:top}th{font-weight:600;background:#e9ede5}td:first-child{font-weight:550}td code{overflow-wrap:anywhere}.claims th:first-child{width:18%}.claims th:last-child{width:16%}.ev-links{display:flex;gap:7px;flex-wrap:wrap}.ev-links a{font:11px var(--mono);padding:2px 5px;border:1px solid var(--line);text-decoration:none}.reason-detail{max-width:960px;font-size:14px}.reason-detail strong{font-weight:550}.trace{background:#e9ede5;padding:16px 20px}.trace p{font-size:13px}.source{margin-bottom:12px;background:var(--white);border:1px solid var(--line);padding:14px 18px;scroll-margin-top:90px}.source summary{cursor:pointer;font-size:14px}.source summary strong{font:12px var(--mono);margin-right:8px}.source-meta{margin:15px 0 8px;font:11px/1.7 var(--mono);overflow-wrap:anywhere;color:var(--muted)}.source .return{font-size:12px;display:flex;gap:12px;flex-wrap:wrap}.source:target,.decision:target,.detail:target{outline:2px solid #ae8228;outline-offset:4px}.limits{padding:20px;background:var(--amberwash);border-left:3px solid #a2813e}.document{max-width:870px;margin:auto}.document h2{margin-top:38px;font-size:25px}.document h3{margin-top:24px}.document li{margin:7px 0}.document blockquote{margin:20px 0;border-left:3px solid var(--green);padding:5px 20px;background:var(--greenwash)}.document p,.document li{font-size:15px}.method-nav{display:flex;gap:12px;flex-wrap:wrap;margin:26px 0}.method-nav a{border:1px solid var(--line);padding:10px 14px;background:var(--white);text-decoration:none;font-size:13px}.file-order{font:11px var(--mono);overflow-wrap:anywhere}.proof-count{font:36px var(--mono);display:block}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:25px 0}.stats>div{background:var(--white);border:1px solid var(--line);padding:17px;font-size:12px}.skip{position:absolute;top:-100px;background:var(--white);padding:8px;z-index:8}.skip:focus{top:5px}footer{border-top:1px solid var(--line);margin-top:50px;padding-top:18px;color:var(--muted);font-size:12px}
@media(max-width:760px){header.bar{padding:12px 18px;position:relative;align-items:flex-start}.brand{white-space:nowrap}nav{gap:10px 14px}main{padding:30px 18px}.diptych,.decisions,.beforeafter{grid-template-columns:1fr}.map-side{padding:15px}.section-line{display:block}.section-line h2{font-size:26px}.life-row{grid-template-columns:1fr}.steps{gap:6px}.step{min-width:130px}.decision{padding:19px}.detail-head{display:block}.detail-head>a{display:inline-block;margin-bottom:14px}.claims th:first-child{width:auto}.claims th:last-child{width:auto}.claims td,.claims th{padding:10px 6px;font-size:12px}.stats{grid-template-columns:1fr 1fr}.source{padding:12px}.source-meta{font-size:10px}.stop{margin-bottom:45px}}
@media print{header.bar{position:static}.source:not([open]){display:none}a{color:inherit}.decision,.map-side{break-inside:avoid}body{background:white}.detail{break-before:auto}}
"""


def refs(ids):
    return '<span class="ev-links">' + "".join(f'<a href="#source-{e}" title="{escape(EVIDENCE[e]["title"])}">{e}</a>' for e in dict.fromkeys(ids)) + '</span>'


def chrome(title, body, script=""):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="favicon.svg" type="image/svg+xml"><title>{escape(title)}</title><style>{STYLE}</style></head>
<body><a class="skip" href="#content">Skip to content</a><header class="bar"><div class="brand"><b>31</b> METHOD / RUNBOOK</div><nav aria-label="Experiment"><a href="index.html">PR 127</a><a href="method.html">Read the runbook</a><a href="record.html">Inspect this run</a><a href="README.md">README</a></nav></header><main id="content">{body}</main>{script}</body></html>'''


def card(d):
    return f'''<article class="decision {d['reason_status']}" id="{d['parent']}" data-decision="{d['id']}">
<div class="decision-head"><span class="decision-id">{d['id']}</span><span class="status {d['reason_status']}">Reason: {d['reason_status']}</span></div>
<h3>{escape(d['title'])}</h3><p class="announcement">{escape(d['consequence'])}</p>
<p class="reason">{escape(d['reason'])}</p><a class="deeper" href="#detail-{d['id']}">Mechanism & evidence ↗</a></article>'''


def map_figure():
    badges = '<div class="caches">' + ''.join(f'<span class="cache">{x}</span>' for x in ['definitions','references','call targets','callers','callees','positions']) + '</div>'
    return f'''<div class="section-line" id="map"><h2>Move the clearing machinery</h2><a href="#detail-D01">Follow the ownership change ↗</a></div>
<figure aria-label="Before and after package map"><div class="diptych">
<div class="map-side"><div class="side-title"><b>BEFORE</b><span>a1e325a</span></div>
<div class="package"><div class="package-label">@symnav/backend-typescript</div>
<div class="module"><a href="#detail-D03"><strong>TypeScriptBackend</strong><small>owns service, state, project graph, source cache</small></a></div>
<div class="flow-arrow">↓ refresh / release</div><div class="module removed"><a href="#detail-D01"><strong>Semantic query service</strong><small>query algorithms + six Maps + manual clear list</small>{badges}</a></div>
<div class="flow-arrow">↓ starts graph release; discards its promise</div><div class="module"><a href="#detail-D12"><strong>TypeScriptProjectGraph</strong><small>concrete project cleanup is synchronous</small></a></div></div>
<div class="package"><div class="package-label">@symnav/core</div><div class="module"><a href="#detail-D12"><strong>ProjectGraph base</strong><small>existing async release loop, inherited by TypeScript graph</small></a></div><div class="mini-context">The generic turn-cache scope does not exist here yet.</div></div></div>
<div class="map-side"><div class="side-title"><b>AFTER</b><span>64919bc</span></div>
<div class="package"><div class="package-label">@symnav/backend-typescript</div>
<div class="module"><a href="#detail-D12"><strong>TypeScriptBackend</strong><small>same owners; now awaits service release</small></a></div>
<div class="flow-arrow">↓ refresh / await release</div><div class="module"><a href="#detail-D04"><strong>Semantic query service</strong><small>query algorithms + file list; constructs a core scope</small></a></div>
<div class="flow-arrow">↓ clears scope, then awaits graph release</div><div class="module"><a href="#detail-D12"><strong>TypeScriptProjectGraph</strong><small>inherits the same async release loop</small></a></div></div>
<div class="flow-arrow">service → core: creates six handles; delegates lookup and clear</div>
<div class="package added"><div class="package-label">@symnav/core · NEW CACHE MODULE</div><div class="module added"><a href="#detail-D05"><strong>TurnScopedCacheScope</strong><small>registers and clears isolated Map-backed handles</small>{badges}</a></div><div class="mini-context"><a href="#detail-D04">Code is defined in core; the scope instance belongs to the service.</a><br>The existing ProjectGraph base remains in core.</div></div></div></div>
<div class="legend"><span class="old">clearing code removed from TypeScript</span><span class="new">clearing code added to core</span><span>existing units and calls</span></div>
<figcaption>Simplified package picture: only units needed for cache lifetime are shown; the six badges stand for separate caches, not six entries. The service already cleared query caches between successful turns. The new scope moves that responsibility across the existing TypeScript → core dependency.</figcaption></figure>'''


def lifetime():
    return '''<div class="section-line" id="lifetime"><h2>Keep clearing separate from finishing</h2><a href="#detail-D12">Follow completion and failure ↗</a></div>
<figure><div class="lifelines">
<div class="life-row"><div class="life-label">REFRESH<br>both versions</div><div class="steps"><div class="step">Current cache turn</div><span class="chevron" aria-hidden="true">→</span><div class="step"><a href="#detail-D03">Refresh source / projects / state</a></div><span class="chevron" aria-hidden="true">→</span><div class="step"><a href="#detail-D03">Success: begin next turn, clear entries</a><br>Failure: keep prior cache turn</div></div></div>
<div class="life-row"><div class="life-label">RELEASE<br>before</div><div class="steps"><div class="step">Clear six Maps now</div><span class="chevron" aria-hidden="true">→</span><div class="step">Start graph release</div><span class="chevron" aria-hidden="true">→</span><div class="step caution">Backend returns without graph's outcome</div></div></div>
<div class="life-row"><div class="life-label">RELEASE<br>after</div><div class="steps"><div class="step changed"><a href="#detail-D02">Clear scope entries now</a></div><span class="chevron" aria-hidden="true">→</span><div class="step changed"><a href="#detail-D12">Service + backend await graph</a></div><span class="chevron" aria-hidden="true">→</span><div class="step changed">Backend completes or rejects with graph</div></div></div></div>
<div class="split-note"><a href="#detail-D05">Handles can refill while release is pending.</a><a href="#detail-D08">Clearing does not cancel promises already returned.</a></div>
<figcaption>Schematic call order, not measured durations. The new pending/rejecting-release test controls a graph promise. The real graph already returns a promise; concrete TypeScript project cleanup is synchronous. A rejection can stop its later project releases. The cache scope itself has no active/released state.</figcaption></figure>'''


def worked_trace():
    rows = [
        ("1 · first lookup", "P₀", "P₀ pending", "The factory's promise is returned unchanged."),
        ("2 · same key, same turn", "P₀", "P₀ pending", "Hit: no second factory call."),
        ("3 · beginTurn()", "empty", "P₀ still pending", "Only the entry is forgotten."),
        ("4 · new lookup", "P₁", "P₀ and P₁", "A new factory result occupies the same key."),
        ("5 · P₀ settles", "P₁", "Old caller gets old result", "Settlement has no cache-write callback."),
    ]
    return '<figure class="trace"><h4>One key, two promise lifetimes</h4><p>Illustrative identity trace, transcribed from the new core test; no runtime was executed for this page.</p><div class="table-wrap"><table><thead><tr><th>Step</th><th>Entry in the cache</th><th>Returned work</th><th>What to notice</th></tr></thead><tbody>' + ''.join('<tr>'+''.join(f'<td>{escape(x)}</td>' for x in row)+'</tr>' for row in rows) + '</tbody></table></div></figure>'


def details(d):
    claims = [CLAIMS[c] for c in d["claims"]]
    rows = ''.join(f'<tr id="claim-{c["id"]}" data-parent="{c["parent"]}"><td>{escape(c["title"])}</td><td>{escape(c["detail"])}</td><td>{refs(c["evidence"])}</td></tr>' for c in claims)
    extra = worked_trace() if d["id"] == "D08" else ""
    return f'''<section class="detail" id="detail-{d['id']}" data-overview="{d['parent']}">
<div class="detail-head"><div><div class="kicker">{d['id']} · mechanism</div><h2>{escape(d['title'])}</h2></div><a href="#{d['parent']}">↑ Return to overview</a></div>
<div class="beforeafter"><div><label>Before</label>{escape(d['before'])}</div><div><label>After</label>{escape(d['after'])}</div></div>
{extra}<div class="table-wrap"><table class="claims"><thead><tr><th>Part</th><th>Mechanism / context</th><th>Evidence</th></tr></thead><tbody>{rows}</tbody></table></div>
<p class="reason-detail"><span class="status {d['reason_status']}">Reason: {d['reason_status']}</span> — {escape(d['reason'])}</p>
<p class="reason-detail"><strong>Intent record:</strong> {escape(d['intent'])}</p>{refs(d['evidence'])}</section>'''


def evidence_block(e):
    owners = [d for d in ORDER if e["id"] in DECISIONS[d]["evidence"] or any(e["id"] in CLAIMS[c]["evidence"] for c in DECISIONS[d]["claims"])]
    source = e["source"]
    revision = e["revision"] or "supplied PR body extracted from pr.json"
    numbered = '\n'.join(f'{i:4}  {line}' for i, line in enumerate(e["text"].splitlines(), e["start"]))
    returns = ''.join(f'<a href="#detail-{d}">↑ {d}: {escape(DECISIONS[d]["title"])}</a>' for d in owners)
    return f'''<details class="source" id="source-{e['id']}"><summary><strong>{e['id']}</strong>{escape(e['title'])}</summary>
<div class="source-meta">{escape(source)} · lines {e['start']}–{e['end']}<br>{escape(revision)}<br><a href="{escape(e['path'])}">Open copied source</a></div><pre><code>{escape(numbered)}</code></pre><div class="return">{returns}</div></details>'''


def render_pr():
    overview = ""
    for title, ids in [
        ("01 / The moved boundaries", ORDER[:4]),
        ("02 / Declared surfaces, missing reasons", ORDER[4:7]),
        ("03 / Contracts kept and made generic", ORDER[7:]),
    ]:
        overview += f'<h3 class="group-heading">{title}</h3><div class="decisions">' + ''.join(card(DECISIONS[d]) for d in ids) + '</div>'
    body = f'''<div class="kicker">PR 127 · Scope semantic caches to one turn · stack layer 4 / 26</div>
<h1>Core gets the clearing job.<br>Release gets an awaited boundary.</h1>
<p class="intro">These query results were already turn-scoped. This change moves their clearing machinery into core and connects project-release completion to the backend caller.</p>
<p class="top-note">A turn here is the service's cache interval, advanced after a successful backend refresh. Read the maps and all twelve decisions for the complete overview. Every deeper section adds mechanism or source to a choice already here.</p>
{map_figure()}{lifetime()}
<section id="overview"><div class="section-line"><h2>Twelve choices, with their reasons</h2><a href="record.html#ranking">Why this order ↗</a></div>
<p class="small">“Stated” means a source gives a reason. “Unexplained” means no reason was found in the bounded PR/commit/plan corpus; the choice may still be explicitly declared. The PR promises preservation, while release completion and failure visibility change. That distinction remains visible below.</p>
{overview}</section>
<div class="stop"><strong>The complete overview ends here.</strong> You have the moved boundaries, preserved contracts, public surfaces, test changes, and rationale gaps. Continue linearly, or follow any decision directly to its mechanism and evidence.</div>
<div class="section-line" id="mechanisms"><h2>The same choices, at source resolution</h2><a href="#overview">↑ Complete overview</a></div>
{''.join(details(DECISIONS[d]) for d in ORDER)}
<div class="section-line" id="evidence"><h2>Evidence shelf</h2><a href="#overview">↑ Complete overview</a></div>
<p class="small">Exact local excerpts from the frozen base/head and supplied PR. These show the sources of the choices above. Each link opens an excerpt and each excerpt links back to the mechanisms that use it. Full copied files are available beneath the excerpt.</p>
{''.join(evidence_block(e) for e in LEDGER['evidence'])}
<footer>Built by following <a href="method.html">Extract → rank → render v1</a>. <a href="record.html">Inspect the run</a> · <a href="ledger.json">Authored ledger</a> · <a href="coverage.json">Changed-line assignments</a>. Source inspection, not a correctness verdict, runtime comparison, or reader study. No input or response is stored.</footer>'''
    script = '''<script>
function revealAnchor(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const el=document.getElementById(id);if(!el)return;let p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}requestAnimationFrame(()=>el.scrollIntoView({block:'start'}));}
addEventListener('hashchange',revealAnchor);addEventListener('DOMContentLoaded',revealAnchor);
document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(a&&a.getAttribute('href')===location.hash)revealAnchor();});
</script>'''
    (OUT / "index.html").write_text(chrome("PR 127 — Cache lifetime and release boundaries", body, script))


def inline(text):
    escaped = escape(text)
    escaped = re.sub(r'`([^`]+)`', r'<code>\1</code>', escaped)
    escaped = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', escaped)
    escaped = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', escaped)
    return escaped


def markdown(text):
    """Small renderer for these known documents; no package install required."""
    lines = text.splitlines()
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip(): i += 1; continue
        if line.startswith('```'):
            i += 1; block = []
            while i < len(lines) and not lines[i].startswith('```'):
                block.append(lines[i]); i += 1
            out.append('<pre><code>' + escape('\n'.join(block)) + '</code></pre>'); i += 1
        elif line.startswith('#'):
            m = re.match(r'^(#+) (.*)$', line)
            n = min(len(m[1]), 6)
            out.append(f'<h{n}>{inline(m[2])}</h{n}>'); i += 1
        elif line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].startswith('|'):
                if not re.match(r'^\|[\s:|\-]+\|$', lines[i]): rows.append([inline(c.strip()) for c in lines[i].strip('|').split('|')])
                i+=1
            out.append('<div class="table-wrap"><table><thead><tr>' + ''.join('<th>'+c+'</th>' for c in rows[0]) + '</tr></thead><tbody>' + ''.join('<tr>'+''.join('<td>'+c+'</td>' for c in row)+'</tr>' for row in rows[1:]) + '</tbody></table></div>')
        elif re.match(r'^(?:- |\d+\. )', line):
            tag='ul' if line.startswith('-') else 'ol'; items=[]
            while i<len(lines) and re.match(r'^(?:- |\d+\. )',lines[i]):
                items.append(re.sub(r'^(?:- |\d+\. )','',lines[i])); i+=1
            out.append(f'<{tag}>'+''.join('<li>'+inline(x)+'</li>' for x in items)+f'</{tag}>')
        elif line.startswith('> '):
            out.append('<blockquote>'+inline(line[2:])+'</blockquote>'); i+=1
        else:
            para=[line]; i+=1
            while i<len(lines) and lines[i].strip() and not re.match(r'^(#|\||```|- |\d+\. |> )',lines[i]):
                para.append(lines[i]); i+=1
            out.append('<p>'+inline(' '.join(para))+'</p>')
    return '\n'.join(out)


def render_method():
    body = '<article class="document"><div class="kicker">The procedure · frozen before PR extraction</div><div class="method-nav"><a href="index.html">Open the resulting PR explanation ↗</a><a href="record.html">See how this run followed the procedure ↗</a><a href="RUNBOOK.md">Source runbook</a></div>' + markdown((OUT / "RUNBOOK.md").read_text()) + '</article>'
    (OUT / "method.html").write_text(chrome("Extract → rank → render — Runbook v1", body))


def render_record():
    coverage = json.loads((OUT / "coverage.json").read_text())
    hunks = json.loads((OUT / "hunks.json").read_text())
    rows = []
    for h in hunks:
        related=[r for r in coverage if r["hunk"]==h["id"]]
        ids=sorted({d for r in related for d in r["decisions"]})
        links=' '.join(f'<a href="index.html#overview-{d}">{d}</a>' for d in ids)
        rows.append(f'<tr><td>{h["id"]}</td><td class="file-order">{escape(h["path"])}<br>{escape(h["header"])}</td><td>{len(related)}</td><td>{links}</td></tr>')
    testrows=[]
    for t in LEDGER["tests"]:
        kind = 'core' if '/core/' in t['path'] else 'TypeScript'
        testrows.append(f'<tr><td>{kind}</td><td>{escape(t["name"])}</td><td>{t["change"]}</td><td>{t["line"]}</td></tr>')
    body=f'''<div class="kicker">One execution of the procedure · PR 127 only</div><h1>What went in.<br>What was kept visible.</h1><p class="intro">The method produces an inspectable chain from changed source to decisions to the complete overview. Semantic extraction and the surprise check remain authored work.</p>
<div class="method-nav"><a href="index.html">Resulting teaching page ↗</a><a href="method.html">Frozen runbook ↗</a><a href="ledger.json">Ledger JSON</a><a href="pyramid-map.json">Pyramid map</a><a href="source-manifest.json">Source hashes</a><a href="validation.json">Validation record</a></div>
<div class="stats"><div><span class="proof-count">15</span>diff regions inventoried</div><div><span class="proof-count">458</span>changed lines assigned</div><div><span class="proof-count">12</span>decisions kept visible</div><div><span class="proof-count">47</span>exact source excerpts</div></div>
<div class="limits"><strong>What these counts establish:</strong> the ledger covers each changed line mechanically, and every authored detail claim has an overview parent. They do not prove semantic completeness, PR correctness, or reader understanding. Four choices have no specific reason located in the bounded corpus. Tests were read, not run.</div>
<div class="section-line" id="source-boundary"><h2>Frozen comparison</h2></div><p class="file-order">Base: {MANIFEST['revisions']['base']}<br>Head: {MANIFEST['revisions']['head']}</p><p>Six files; +391 / −67. The bundle diff equals the three-dot commit comparison. All 32 copied sources match their recorded hashes; copied worktree sources were also checked against their committed blobs. The precomputed overviews contain no usable semantic content. No earlier experiments were read.</p>
<div class="section-line" id="coverage"><h2>Extract: account for the diff</h2><a href="coverage.json">Every changed-line assignment ↗</a></div><p class="small">Rows are in source order. Follow a decision to its visible overview. Imports and braces are assigned to the choice they implement; they are not invented as separate decisions.</p><div class="table-wrap"><table><thead><tr><th>Region</th><th>File and diff coordinates</th><th>Changed lines</th><th>Decisions</th></tr></thead><tbody>{''.join(rows)}</tbody></table></div>
<div class="section-line" id="tests"><h2>Test decisions</h2></div><p>All ten additions and all five retained tests are inventoried. The retained service-test suffix and helpers match byte for byte. No assertion was removed or weakened; the single removed import line is replaced with an expanded import. This is a source comparison, not test execution.</p><div class="table-wrap"><table><thead><tr><th>Owner</th><th>Test</th><th>Change</th><th>Head line</th></tr></thead><tbody>{''.join(testrows)}</tbody></table></div>
<article class="document" id="ranking">{markdown((OUT/'ranking.md').read_text())}</article>
<article class="document" id="log">{markdown((OUT/'run-log.md').read_text())}</article>
<footer>Scripts: <a href="capture_sources.py">capture_sources.py</a> → <a href="extract.py">extract.py</a> → <a href="render.py">render.py</a> → <a href="verify.py">verify.py</a>. Rebuilding the HTML reads only frozen experiment files.</footer>'''
    (OUT / "record.html").write_text(chrome("Run record — Method trial on PR 127", body))


if __name__ == "__main__":
    render_pr()
    render_method()
    render_record()
    print("Rendered index.html, method.html, record.html from the frozen ledger and runbook.")
