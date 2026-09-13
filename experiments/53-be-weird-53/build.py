"""Render static stopping layer, mechanisms, evidence, and local recording data."""
from pathlib import Path
import json, html

HERE=Path(__file__).resolve().parent
escape=html.escape
decisions=json.loads((HERE/'content.json').read_text())
sources=json.loads((HERE/'evidence/sources.json').read_text())
source_map={s['id']:s for s in sources}
observations=json.loads((HERE/'evidence/observations.json').read_text())

def source_link(ref):
    key,start,end=ref
    source=source_map[key]
    assert 0<start<=end<=len(source['text'].splitlines()), ref
    return f'<a class="source-link" data-source="{key}:{start}:{end}" href="evidence.html#{key}-L{start}">{escape(key)} : {start}–{end} ↗</a>'

cards=[]
mechanisms=[]
for d in decisions:
    n=d['id']
    cards.append(f'''<article class="decision" id="record-{n}"><div class="record-heading"><a href="#detail-{n}" class="record-number" aria-label="Mechanism for record {n}">{n}</a><span class="status {d['status']}">{d['status'].capitalize()}</span></div><h3><a href="#detail-{n}">{escape(d['title'])} <span>↗</span></a></h3><p>{escape(d['top'])}</p><p class="reason"><b>Reason:</b> {escape(d['reason'])}</p></article>''')
    mechanisms.append(f'''<article class="mechanism" id="detail-{n}" data-parent="record-{n}"><header><span class="record-number">{n}</span><h3>{escape(d['title'])}</h3><a href="#record-{n}">Return to record {n} ↑</a></header><div class="mechanism-body">{d['mechanism']}</div><div class="sources">{''.join(source_link(s) for s in d['sources'])}</div></article>''')

template=(HERE/'index.template.html').read_text()
(HERE/'index.html').write_text(template.replace('{{DECISIONS}}','\n'.join(cards)).replace('{{MECHANISMS}}','\n'.join(mechanisms)))
data={'observations':observations,'sources':source_map}
(HERE/'data.js').write_text('window.BENCH_DATA = '+json.dumps(data,ensure_ascii=False).replace('</',r'<\/')+';\n')

parts=['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pinned source · Instrument 53</title><link rel="stylesheet" href="style.css"></head><body class="source-book"><header class="mast"><a href="index.html#complete">← Return to the whole change</a><a href="evidence/inventory.json">Six-file inventory</a></header><main><h1>Pinned source.</h1><p>Base a1e325a → head 64919bc. Full files retain surrounding context; only the six-file delta is this experiment’s subject.</p><nav class="source-index">']
for s in sources:
    parts.append(f'<a href="#{s["id"]}">{s["id"]}</a>')
parts.append('</nav>')
for s in sources:
    lines='\n'.join(f'<span id="{s["id"]}-L{i}" class="code-line"><a href="#{s["id"]}-L{i}" class="line-no">{i}</a>{escape(line)}</span>' for i,line in enumerate(s['text'].splitlines(),1))
    parts.append(f'<section id="{s["id"]}"><h2>{s["id"]}</h2><p>{escape(s["path"])}<br><code>{s["revision"]}</code><br>SHA-256 <code>{s["sha256"]}</code></p><a href="evidence/{s["id"]}.txt">Plain text</a><pre>{lines}</pre><a href="index.html#complete">Return to complete layer ↑</a></section>')
parts.append('</main></body></html>')
(HERE/'evidence.html').write_text('\n'.join(parts))
print(f'Rendered {len(decisions)} complete records, {len(mechanisms)} matching mechanisms, and {len(sources)} pinned documents.')
