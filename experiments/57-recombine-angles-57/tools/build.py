from pathlib import Path
import datetime
import hashlib
import html
import importlib.util
import json
import re

OUT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('receipt_content', Path(__file__).with_name('receipt-content.py'))
content = importlib.util.module_from_spec(spec)
spec.loader.exec_module(content)
GROUPS = content.GROUPS
E = html.escape

INTRO = [
 ('A name is a start. A prediction needs a condition.',
  'PR #148 gives daemon mechanisms a package-owned DaemonClient; the shipped CLI still uses its prepared compatibility copies. Naming those owners is useful. It does not yet say which values a host can supply, when a constructor fails, which credentials a request needs, or what a moved test actually exercises.'),
 ('The complete critique is this introduction plus every row.',
  'This page compares fifteen documented #148 reading surfaces in eleven earlier experiments. Its first viewport is an index to that complete layer. The table separates recalled learning, source corrections, editorial observations and witnessed rule-4 descents. Receipts contain exact page quotations and pinned source excerpts for claims already named here. There is no ranking of pages or verdict on symnav correctness.'),
 ('What counts as consequential.',
  'Preserve decisions that change a prediction about ownership, accepted input, failure timing, replay, credentials, retained state, or a test’s stimulus and oracle. A named topic can still hide a consequential condition. Extra source spellings and numbers alone do not create a rule-4 surprise. A declared narrow study is different from an undisclosed deeper decision.'),
 ('What this reading can establish.',
  'One technically literate agent read overlapping pages sequentially. README metadata and the brief exposed prior critique leads; pages 49 and 50 added source-informed explanations before the recall seal. Recall was sealed before the independent input diff and git-source pass. This is informed pre-diff recall, not an unfamiliar-human or independent blind study. A missed item in recall does not mean it appears nowhere. “None witnessed” is not a pass certificate.'),
 ('Evidence and scope.',
  'Read the complete declared #148 layers of 03, 06, 08, 12, 18, 23, 27, 29, 35 and 50, plus 49’s focused report and four archived #148 variants. Other-subject sections and stack-wide teaching pages are outside this comparison. Selected descents were inspected, not every drawer or interaction. After sealing, 54’s critique and 55’s introduction/#148 rows supplied attributed editorial leads. Pinned source checks cover the selected app/client/registry/clock/construction and test-boundary changes, including the unchanged daemon-policy plan. The large copied graph received an inventory/context check, not an exhaustive semantic audit.'),
 ('Source inference and executed evidence stay separate.',
  'No symnav code, tests, builds or runtime probes were executed here. Earlier recordings and reader responses remain their producers’ evidence. Browser captures and artifact checks performed here establish rendered text, routes, links and byte stability; they do not establish human understanding. Execution, delivery and acknowledgement are separate stages; a worker result alone does not imply all retained output has been acknowledged.')
]

THEMES = [
 ('Missing','01','Conditions before topic names','12','Optional policy, credentials and queue defaults must reach their parent.'),
 ('Missing','02','Reasons at the right scope','35','The plan states export retirement; individual assertion removals still need their own reasons.'),
 ('Promising','03','Two axes, several lifetimes','06','Package home, process location, shared objects and fresh attempts carry different relationships.'),
 ('Promising','04','The path a test actually takes','27','Keep stimulus, exercised implementation and assertion together.'),
 ('Repeating','05','A second account of the same move','03','Generic before/after prose and inventories can make the reader reconstruct the same model.'),
 ('Promising','06','An entrance with a reason to use it','29','Separate review questions and future-edit cues connect understanding to a choice.'),
 ('Missing / promising','07','Repairs live in particular copies','49-report','Two edits improve two predictions; the originals and untouched conditions remain visible.')
]

def shell(title, body, script='app.js', css='style.css'):
    return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + \
        f'<title>{E(title)}</title><link rel="stylesheet" href="{css}"></head><body>{body}' + \
        (f'<script src="{script}" defer></script>' if script else '') + '</body></html>\n'

def paragraphs(items):
    return ''.join(f'<p>{E(x)}</p>' for x in items)

def main():
    rows = json.loads((OUT/'rows.json').read_text())
    recall = {x['id']:x for x in json.loads((OUT/'recall.json').read_text())['rows']}
    sources = json.loads((OUT/'source-manifest.json').read_text())
    source_by_id = {x['id']:x for x in sources['files']}
    seal = json.loads((OUT/'recall-seal.json').read_text())
    for item in seal['files']:
        assert hashlib.sha256((OUT/item['path']).read_bytes()).hexdigest() == item['sha256'], item['path']
    # A compact rendering of the sealed learned account; no source-phase content replaces it.
    for row in rows:
        row['learned'] = recall[row['id']]['learned']
        row['recall_question'] = recall[row['id']]['question']
        row['capture'] = f"receipts/readings/{row['id']}-opening.txt"
        row['row_anchor'] = 'r'+row['id']

    nav = '<a class="skip" href="#comparison">Skip to the complete table</a><header class="sitebar"><a href="#top">57 <span>READING / EDITING</span></a><nav><a href="#comparison">All surfaces</a><a href="receipts.html">Receipts</a><a href="README.md">README</a></nav></header>'
    diagram = '<ol class="sequence" aria-label="The four-step reading sequence">' + ''.join(
        f'<li><span>0{i}</span><strong>{title}</strong><small>{desc}</small></li>' for i,title,desc in [
            (1,'Read the complete layer','All declared choices, beyond the first screen'),
            (2,'Follow selected depth','Capture the parent and the newly specified condition'),
            (3,'Seal the recalled model','Before the independent diff; prior exposure disclosed'),
            (4,'Check pinned evidence','Compare source, reason scope and explanatory usefulness')])+'</ol>'
    theme_nav = '<nav class="themes" aria-label="Seven editorial threads">'+''.join(
        f'<a href="#r{rid}"><small>{E(kind)} · {num}</small><strong>{E(title)}</strong><span>{E(desc)}</span></a>'
        for kind,num,title,rid,desc in THEMES)+'</nav>'
    top = f'''<main id="top"><section class="opening"><p class="eyebrow">BRIEF 57 · PR #148 · AN INFORMED READER / EDITOR</p>
<h1>Knowing the owner<br>isn’t the whole answer.</h1>
<div class="prediction"><span class="eyebrow">ONE CONCRETE PREDICTION</span><p>A page says the process owns authentication. With a valid protocol and instance, will <code>ping</code> and <code>execute</code> both accept a missing token?</p><p><strong>The source distinguishes them:</strong> ping needs no token; execute also checks the process token. The parent must carry that partition if the reader is to predict it before descending. <a href="#r23">Follow the original and revised statements →</a></p></div>
{diagram}<p class="index-note"><strong>Start here, then read all fifteen rows.</strong> These seven threads are an index. The whole table carries the complete findings, including useful devices and bounded “none witnessed” observations.</p>{theme_nav}</section>'''
    intro_html = '<section class="introduction" aria-label="Scope and reading claims">' + ''.join(f'<p><strong>{E(t)}</strong> {E(p)}</p>' for t,p in INTRO) + \
        '<p class="provenance-links"><a href="protocol.md">Reading protocol</a> · <a href="recall.json">Sealed recall</a> · <a href="recall-seal.json">Seal and hashes</a> · <a href="row-manifest.json">Machine-readable rows</a> · <a href="review.md">Same critique in Markdown</a></p></section>'
    filterbar = '''<section class="table-section" id="comparison" aria-labelledby="table-title"><div class="table-heading"><p class="eyebrow">THE COMPLETE COMPARISON · NUMERICAL SURFACE ORDER</p><h2 id="table-title">What survived the reading?<br>What needs a condition, correction or cut?</h2></div>
<div class="filters" data-filters hidden><label>Find within rows <input id="search" type="search" placeholder="policy, credentials, fixtures…" autocomplete="off"></label><label class="check"><input id="witnessed" type="checkbox"> Witnessed rule-4 rows</label><button id="reset" type="button">Show all rows</button><p id="count" role="status" aria-live="polite"></p></div>
<p class="table-note">Read every row in order, or use a temporary filter. A filtered view is a partial reading. Receipt links open exact evidence; returning to a row restores its visibility. Printing includes every row.</p>'''
    table = '<table id="findings"><caption>Fifteen documented #148 surfaces. Repeated variants are separate rows, not independent readers.</caption><colgroup><col class="surface"><col class="learned"><col class="missing"><col class="editorial"><col class="descent"></colgroup><thead><tr><th scope="col">Reading surface</th><th scope="col">What I learned<br><small>condensed from sealed recall</small></th><th scope="col">Missing or corrected<br><small>after the source pass</small></th><th scope="col">Repeating / promising<br><small>editorial observation</small></th><th scope="col">Descent and scope<br><small>bounded route observation</small></th></tr></thead><tbody>'
    md = ['# Knowing the owner isn’t the whole answer.','',
          'A valid protocol and instance do not make ping and execute accept the same missing-token request: ping needs no token; execute also checks the process token. That condition belongs in the parent if the reader is to predict it before descent.','',
          'Read the complete layer → follow selected depth → seal recall → compare pinned evidence.','']
    for t,p in INTRO: md += [f'**{t}** {p}','']
    md += ['[Protocol](protocol.md) · [Recall](recall.json) · [Seal](recall-seal.json) · [Row manifest](row-manifest.json)','',
           '| Surface / layer | Learned before independent diff | Missing or corrected | Repeating / promising | Descent and scope |',
           '| --- | --- | --- | --- | --- |']
    def mdcell(x): return x.replace('|','\\|').replace('\n','<br>')
    for row in rows:
        rid = row['row_anchor']
        links = ''.join(f'<a class="receipt-link" href="receipts.html?from={rid}#{g}">{E(GROUPS[g]["title"])}</a>' for g in row['receipts'])
        flags = paragraphs(row['r4']) if row['r4'] else '<p>None witnessed.</p>'
        table += f'''<tr id="{rid}" data-row data-witnessed="{str(bool(row['r4'])).lower()}" tabindex="-1">
<th scope="row"><span class="row-id">{E(row['id'])}</span><a href="../{E(row['file'],quote=True)}">{E(row['title'])} ↗</a><p class="layer">{E(row['layer'])}</p><a class="capture-link" href="{row['capture']}">Saved rendered text</a></th>
<td data-label="Learned">{paragraphs([row['learned']])}</td>
<td data-label="Missing or corrected">{paragraphs(row['missing'])}<div class="receipt-links">{links}</div></td>
<td data-label="Repeating / promising"><p><span class="dimension repeat">Repeating</span>{E(row['repeating'])}</p><p><span class="dimension promising">Promising</span>{E(row['promising'])}</p></td>
<td data-label="Descent and scope"><strong class="status {'witness' if row['r4'] else 'bounded'}">{'Witnessed rule-4 descent' if row['r4'] else 'None witnessed'}</strong>{flags if row['r4'] else ''}<p class="scope">{E(row['scope'])}</p><a href="#top" class="back-index">↑ Reading index</a></td></tr>'''
        mdlinks = ' · '.join(f'[{g}](receipts.html?from={rid}#{g})' for g in row['receipts'])
        md += ['| '+' | '.join(map(mdcell,[f'<a id="{rid}"></a>**{row["id"]}** [{row["title"]}](../{row["file"]})<br>{row["layer"]}<br>[Saved text]({row["capture"]})',row['learned'],'<br><br>'.join(row['missing'])+'<br>'+mdlinks,'**Repeating:** '+row['repeating']+'<br><br>**Promising:** '+row['promising'],('<br>'.join(row['r4']) if row['r4'] else '**None witnessed.**')+'<br><br>'+row['scope']]))+' |']
    table += '</tbody></table><p id="no-results" hidden>No matching surfaces. Use Show all rows to restore the complete critique.</p></section>'
    footer = '<footer><p>Base <code>ba53c8e1662fd86d198b95321c90d9c9bef10184</code><br>Head <code>20838f8dbf413e04767543eb2380d0d114da6c60</code></p><p>Experiment 57 · source readings and local artifact checks · no symnav execution.</p><p><a href="validation.json">Artifact checks</a> · <a href="source-manifest.json">Source hashes</a> · <a href="receipts/capture-adjustments.md">Capture adjustments</a> · <a href="#top">Return to the reading index ↑</a></p></footer>'
    (OUT/'index.html').write_text(shell('57 — Knowing the owner isn’t the whole answer',nav+top+intro_html+filterbar+table+footer+'</main>'))
    (OUT/'review.md').write_text('\n'.join(md)+'\n')
    manifest = {'built_at':datetime.datetime.now(datetime.timezone.utc).isoformat(), 'subject':'pr-148', 'surfaces':len(rows),
                'complete_layer':'Introduction plus every table row', 'prior_experiments':'11 source experiments; 54 editorial critique, 55 introduction and #148 rows; README metadata scan through 55',
                'seal': 'recall-seal.json','source_manifest':'source-manifest.json','rows':rows}
    (OUT/'row-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    receipt_manifest = []
    receipt_body = '<a class="skip" href="#receipts">Skip to receipts</a><header class="sitebar"><a href="index.html">57 <span>PINNED RECEIPTS</span></a><nav><a data-return href="index.html#comparison">Return to the table</a><a href="README.md">README</a></nav></header><main class="evidence-main" id="receipts"><p class="eyebrow">OPTIONAL EVIDENCE LAYER</p><h1>The exact words.<br>The pinned source.</h1><p class="evidence-intro">These are quotations and source excerpts for claims already present in the complete comparison. They are not an additional findings table. A page quotation records an authored claim; a source excerpt supports a separately labelled inference in the table. No symnav execution is reported here.</p><p><a href="source-manifest.json">All source hashes</a> · <a href="recall-seal.json">Reading hashes</a> · <a href="receipts/pr-148.patch">Exact input patch</a> · <a href="receipts/variant-comparison.json">Rendered variant comparison</a></p><nav class="receipt-index">'+''.join(f'<a href="#{g}">{E(d["title"])}</a>' for g,d in GROUPS.items())+'</nav>'
    for g, d in GROUPS.items():
        parents = [r for r in rows if g in r['receipts']]
        return_links = ' '.join(f'<a href="index.html#{r["row_anchor"]}">{r["id"]}</a>' for r in parents)
        receipt_body += f'<section class="receipt" id="{g}"><p class="eyebrow">EXACT RECEIPT · {E(g)}</p><h2>{E(d["title"])}</h2><p class="returns">Return to table row: {return_links}</p>'
        for cap,label,quote in d['pages']:
            f = OUT/f'receipts/readings/{cap}.txt'
            text = f.read_text()
            assert quote in text, (cap,quote)
            line = text[:text.index(quote)].count('\n')+1
            entry = {'group':g,'kind':'page','capture':str(f.relative_to(OUT)),'label':label,'start_line':line,'text':quote,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()}
            receipt_manifest.append(entry)
            receipt_body += f'<figure class="page-quote"><figcaption><span>Page quotation</span> {E(cap)} · {E(label)} · saved text L{line}</figcaption><blockquote>{E(quote)}</blockquote><a href="{entry["capture"]}">Full rendered capture ↗</a></figure>'
        for sid,start,end in d['source']:
            s = source_by_id[sid]
            lines = (OUT/s['local']).read_text().splitlines()
            assert 1 <= start <= end <= len(lines), (sid,start,end,len(lines))
            numbered = '\n'.join(f'{i:4}  {lines[i-1]}' for i in range(start,end+1))
            receipt_manifest.append({'group':g,'kind':'source','source':sid,'start':start,'end':end,'text':'\n'.join(lines[start-1:end]),'sha256':s['sha256']})
            receipt_body += f'<figure class="source-quote"><figcaption><span>Pinned source · {s["version"]}</span><code>{E(s["path"])}</code><small>{s["revision"]} · L{start}–{end}</small></figcaption><pre>{E(numbered)}</pre><a href="receipts/source-pages/{sid}.html#L{start}">Full pinned file at line {start} ↗</a></figure>'
        if g == 'variants': receipt_body += '<p><a href="receipts/variant-comparison.json">Exact rendered-body differences and hashes</a> · <a href="receipts/screenshots/49-23-revised-opening.png">Revised canvas at 1440 × 1000</a></p>'
        if g in ('policy','authentication'): receipt_body += '<p><a href="receipts/screenshots/23-D04.png">Settled D04 screenshot</a> · <a href="receipts/screenshots/23-D13.png">Settled D13 screenshot</a></p>'
        receipt_body += f'<p class="returns">Return to table row: {return_links}</p></section>'
    receipt_body += '</main>'
    (OUT/'receipts.html').write_text(shell('57 — Exact page and source receipts',receipt_body))
    (OUT/'receipt-manifest.json').write_text(json.dumps(receipt_manifest,ensure_ascii=False,indent=2)+'\n')
    source_out = OUT/'receipts/source-pages'
    source_out.mkdir(exist_ok=True)
    for s in sources['files']:
        lines = (OUT/s['local']).read_text().splitlines()
        code = ''.join(f'<span id="L{i}"><a href="#L{i}" aria-label="Line {i}">{i}</a> {E(t)}</span>\n' for i,t in enumerate(lines,1))
        body = f'<main class="source-file"><a href="../../receipts.html">← Return to receipt index</a><p>{s["version"]} · {s["revision"]}</p><h1>{E(s["path"])}</h1><p>Git blob <code>{s["blob"]}</code><br>SHA-256 <code>{s["sha256"]}</code></p><a href="../sources/{s["id"]}.txt">Raw pinned text</a><pre>{code}</pre><a href="../../receipts.html">← Return to receipt index</a></main>'
        (source_out/f'{s["id"]}.html').write_text(shell(s['path'],body,script=None,css='../../style.css'))
    # Hash original reading inputs separately from the sealed visible-text files.
    originals = []
    for r in rows:
        entry = OUT.parent/r['file'].split('#')[0]
        for p in sorted(entry.parent.iterdir()):
            if p.is_file() and p.suffix in ('.html','.css','.js') or p == entry.parent/'README.md':
                originals.append({'path':str(p.relative_to(OUT.parent)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
    unique = {x['path']:x for x in originals}
    (OUT/'receipts/original-input-hashes.json').write_text(json.dumps(list(unique.values()),indent=2)+'\n')
    print(json.dumps({'rows':len(rows),'receipts':len(receipt_manifest),'source_pages':len(sources['files'])}))

if __name__ == '__main__':
    main()
