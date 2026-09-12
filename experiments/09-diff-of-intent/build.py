#!/usr/bin/env python3
"""Build a dependency-free offline page plus line-addressable source evidence."""
import hashlib
import html
import json
from pathlib import Path
import re
import subprocess

from content import ROWS, ADAPTATION_ROW
from figures import figure, overview

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
EVIDENCE = HERE / 'evidence'
EVIDENCE.mkdir(exist_ok=True)
SHAS = {(pr, side): subprocess.check_output(['git', '-C', str(ROOT / f'worktrees/pr-{pr}-{side}'), 'rev-parse', 'HEAD'], text=True).strip() for pr in (127, 131) for side in ('base', 'head')}
PRS = {pr: json.loads((ROOT / f'inputs/pr-{pr}/pr.json').read_text()) for pr in (127, 131)}
SOURCES = {}
ASSOCIATIONS = {}
MANIFEST = []
e = html.escape

def document(title, content, source=False):
    prefix = '../' if source else ''
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>{e(title)}</title>
<link rel="icon" href="data:,"><link rel="stylesheet" href="{prefix}style.css">
{'<script src="app.js" defer></script>' if not source else ''}</head>
<body class="{'source-page' if source else 'review-page'}">{content}</body></html>'''

def source(pr, side, path):
    key = (pr, side, path)
    if key in SOURCES:
        return SOURCES[key]
    if side == 'bundle':
        text = PRS[pr]['body']
        revision = 'supplied PR body · captured input'
        sha = None
    else:
        text = (ROOT / f'worktrees/pr-{pr}-{side}' / path).read_text()
        sha = SHAS[(pr, side)]
        revision = f'{side} · {sha[:12]}'
    slug = f'{pr}-{side}-{Path(path).name}-{hashlib.sha256(path.encode()).hexdigest()[:8]}.html'
    SOURCES[key] = dict(key=key, slug=slug, text=text, lines=text.splitlines(), path=path, revision=revision, sha=sha, pr=pr, side=side)
    return SOURCES[key]

def resolve_ref(ref, row_id):
    s = source(ref['subject'], ref['side'], ref['path'])
    matches = [i for i, line in enumerate(s['lines']) if ref['needle'] in line]
    if not matches:
        raise ValueError(f'Missing evidence needle: {row_id}: {ref}')
    # First occurrence is intentional for duplicated signature names; needles target implementations where needed.
    start = matches[0]
    end = min(len(s['lines']), start + ref['length'])
    ASSOCIATIONS.setdefault(s['key'], set()).add(row_id)
    ref['resolved_line'] = start + 1
    ref['href'] = 'evidence/' + s['slug'] + f'#L{start + 1}'
    return s, start, end

def excerpts(row):
    items = []
    for r in row['refs']:
        s, start, end = resolve_ref(r, row['id'])
        snippet = '\n'.join(f'{i+1:>4}  {s["lines"][i]}' for i in range(start, end))
        items.append(f'''<article class="excerpt"><p class="source-label">{e(s['revision'])}</p>
<a class="source-link" href="{r['href']}">{e(s['path'])}:{start + 1} ↗</a>
<pre><code>{e(snippet)}</code></pre></article>''')
    return '<details class="source-trail"><summary>Read the source trail <span>'+str(len(items))+' excerpts</span></summary>'+''.join(items)+'</details>'

def connection(relation):
    if relation == 'choice':
        path = 'M2 28 H23 C40 28 42 7 60 7 H85'
        label = 'choice beyond<br>the stated reason'
    elif relation == 'scope':
        path = 'M2 28 H29 L48 12 H85'
        label = 'scope needs<br>distinguishing'
    elif relation == 'tests':
        path = 'M2 28 H30 M40 28 H60 M70 28 H85'
        label = 'test contract'
    else:
        path = 'M2 28 H85'
        label = 'direct trace'
    return f'<span class="connector"><svg viewBox="0 0 90 36" aria-hidden="true"><path d="{path}"/><circle cx="3" cy="28" r="3"/><circle cx="85" cy="{7 if relation == "choice" else 12 if relation == "scope" else 28}" r="3"/></svg><span>{label}</span></span>'

def row_html(row):
    return f'''<details class="intent-row relation-{row['relation']}" id="{row['id']}" data-pr="{row['pr']}">
<summary><span class="row-number">{row['number']}</span><span class="decision-title">{e(row['title'])}</span><span class="toggle-mark" aria-hidden="true">+</span>
<span class="intent-cell">{e(row['intent'])}</span>{connection(row['relation'])}<span class="shipped-cell">{e(row['shipped'])}</span>
<span class="reasonline"><span class="reason {row['reason']}">reason {row['reason']}</span><span>{e(row['why'])}</span></span></summary>
<div class="decision-detail"><p class="eyebrow">#{row['pr']} · decision {row['number']} · mechanism and evidence</p>{figure(row['diagram'])}
<p class="explanation">{row['detail']}</p>{excerpts(row)}
<div class="detail-exit"><button type="button" class="close-row">Close this detail ↑</button><a href="#map-{row['pr']}">Back to #{row['pr']} map</a><a href="#{row['id']}" class="permalink">Link to this decision</a></div></div></details>'''

def changed_files(pr):
    patch = (ROOT / f'inputs/pr-{pr}/diff.patch').read_text()
    result = []
    for block in patch.split('diff --git ')[1:]:
        path = block.splitlines()[0].split(' b/', 1)[1]
        plus = sum(line.startswith('+') and not line.startswith('+++') for line in block.splitlines())
        minus = sum(line.startswith('-') and not line.startswith('---') for line in block.splitlines())
        result.append((path, plus, minus))
    return result

def inventory():
    sections = []
    for pr in (127, 131):
        entries = []
        for path, plus, minus in changed_files(pr):
            rows = [r for r in ROWS if r['pr'] == pr and path in r['files']]
            if not rows:
                assert pr == 131 and ('.test.ts' in path or '/test/' in path), f'Unassigned production file {path}'
                rows = [r for r in ROWS if r['id'] == ADAPTATION_ROW]
            head = source(pr, 'head', path)
            base_path = ROOT / f'worktrees/pr-{pr}-base' / path
            base = source(pr, 'base', path) if base_path.exists() else None
            for r in rows:
                ASSOCIATIONS.setdefault(head['key'], set()).add(r['id'])
                if base: ASSOCIATIONS.setdefault(base['key'], set()).add(r['id'])
            links = ' · '.join(f'<a href="#{r["id"]}">{r["number"]}</a>' for r in rows)
            base_link = f'<a href="evidence/{base["slug"]}#L1">base</a>' if base else 'added'
            entries.append(f'<tr><td><a href="evidence/{head["slug"]}#L1">{e(path)}</a></td><td>+{plus} / −{minus}</td><td>{base_link}</td><td>{links}</td></tr>')
            MANIFEST.append(dict(pr=pr, path=path, added=plus, deleted=minus, decisions=[r['id'] for r in rows], head='evidence/'+head['slug'], base='evidence/'+base['slug'] if base else None))
        (EVIDENCE/f'pr-{pr}.diff.patch').write_bytes((ROOT/f'inputs/pr-{pr}/diff.patch').read_bytes())
        sections.append(f'<h3>#{pr} · {len(entries)} files</h3><p class="patch-link"><a href="evidence/pr-{pr}.diff.patch">Supplied full patch ↗</a></p><div class="table-scroll"><table class="inventory-table"><thead><tr><th>Source path · head snapshot</th><th>Lines</th><th>Before</th><th>Map decisions</th></tr></thead><tbody>{"".join(entries)}</tbody></table></div>')
    return ''.join(sections)

def pr_section(pr):
    if pr == 127:
        description = 'Cache clearing moves into core. TypeScript still owns the algorithms and the moment a turn begins.'
        horizon = 'Shared plan: reusable lifecycle belongs in core; language backends keep only language-specific logic.'
        footprint = '6 files · +391 / −67'
        caveat = '<a href="#127-release">Awaited release is an explicit API change.</a> <a href="#127-surface">The composed surface</a> and <a href="#127-reuse">reusable-handle lifetime</a> have no recorded rationale.'
        part = '04'
    else:
        description = 'Consumers use the existing daemon policy. Most threshold choices leave the CLI constructors; the mechanisms stay in the CLI.'
        horizon = 'Shared plan: the daemon package owns policy and mechanisms; the CLI eventually only composes. This PR is the consumer-wiring layer.'
        footprint = '60 files · +1,298 / −544'
        caveat = '<a href="#131-error">Later completion errors can replace the original error.</a> <a href="#131-seams">Numeric seams remain.</a> <a href="#131-deleted-tests">Tests are deleted</a> and <a href="#131-fixtures">fixture boundaries change.</a>'
        part = '08'
    return f'''<section class="subject" id="map-{pr}" aria-labelledby="title-{pr}">
<div class="subject-heading"><div><p class="eyebrow">Subject #{pr} · stack layer {part}</p><h2 id="title-{pr}">{e(PRS[pr]['title'])}</h2></div><span class="footprint">{footprint}</span></div>
<p class="subject-description">{description}</p>{overview(pr)}
<div class="horizon"><span>Plan horizon</span><p>{horizon}</p></div>
<div class="caveats"><span>Keep in view</span><p>{caveat}</p></div>
<div class="map-caption"><span class="eyebrow">Figure {'1' if pr == 127 else '2'} · intent → shipped</span><span>All decisions visible · open any row for depth</span></div>
<div class="map-columns"><span>Stated intent <small>plan / PR body</small></span><span>Relationship</span><span>Shipped <small>base → head</small></span></div>
<div class="intent-map">{''.join(row_html(r) for r in ROWS if r['pr'] == pr)}</div>
<p class="map-end"><a href="#top">↑ Back to both subjects</a><span>End of #{pr} map</span></p></section>'''

def write_evidence():
    for s in SOURCES.values():
        backlinks = ''.join(f'<a href="../index.html#{row_id}">#{s["pr"]} · {next(r["number"] for r in ROWS if r["id"] == row_id)} {e(next(r["title"] for r in ROWS if r["id"] == row_id))}</a>' for row_id in sorted(ASSOCIATIONS.get(s['key'], [])))
        github = ''
        if s['sha']:
            github = f'<a href="https://github.com/mohasarc/symnav/blob/{s["sha"]}/{s["path"]}">GitHub at this revision ↗</a>'
        lines = ''.join(f'<div class="source-line" id="L{i}"><a href="#L{i}" aria-label="Line {i}">{i}</a><code>{e(line) or " "}</code></div>' for i,line in enumerate(s['lines'], 1))
        digest = hashlib.sha256(s['text'].encode()).hexdigest()
        content = f'''<header class="source-header"><a href="../index.html#map-{s['pr']}">← Intent map #{s['pr']}</a><span>{e(s['revision'])}</span>{github}</header>
<main class="source-main"><p class="eyebrow">Offline evidence · exact supplied source</p><h1>{e(s['path'])}</h1><p class="source-digest">SHA-256 {digest}</p><nav class="source-backlinks" aria-label="Decisions using this source">{backlinks}</nav><div class="source-code">{lines}</div></main>'''
        (EVIDENCE/s['slug']).write_text(document(f'{s["path"]} · {s["revision"]}', content, True))

def build():
    body = '''<a class="skip" href="#map-127">Skip to the first intent map</a>
<header class="site-header"><a class="wordmark" href="#top"><span class="registration-mark" aria-hidden="true">⌖</span> rich-review <span>/ 09</span></a>
<nav aria-label="Page"><a href="#map-127">#127 · caches</a><a href="#map-131">#131 · policy</a><a href="#method">Reading key</a><a href="#file-inventory">Sources</a></nav></header>
<main id="top"><section class="hero" aria-labelledby="page-title"><div class="hero-main"><p class="eyebrow">Diff of intent · two layers of one refactor</p><h1 id="page-title">Follow the promise.<br><em>Find the choices.</em></h1><p class="hero-deck">A plan names the destination. A PR names a step. The code makes the step concrete.</p></div>
<aside class="reading-card"><span class="eyebrow">How to read the figures</span><p>Left: the stated contract.<br>Right: the implemented boundary.</p><div class="legend-line"><span class="legend-straight">○────○</span><span>direct trace to the claim</span></div><div class="legend-line"><span class="legend-offset">○──╱─○</span><span>scope distinction or extra choice</span></div><p class="legend-note">A connection is a source trace, not a correctness verdict.</p></aside></section>
<div class="reading-strip"><strong>Two moves, two scales.</strong><span><a href="#map-127">#127 clears semantic caches through core.</a> <a href="#map-131">#131 supplies policy values to existing CLI mechanisms.</a></span><span class="read-only">Read-only study</span></div>
<p class="scope-note">The complete first layer is the two maps below. Every decision and unexplained choice stays visible; opening a row adds mechanism and evidence. Grouping is by decision, not by file.</p>'''
    body += pr_section(127) + pr_section(131)
    inv = inventory()
    body += f'''<section class="method" id="method"><p class="eyebrow">Reading key and limits</p><h2>Intent is a source, not a time machine.</h2>
<div class="method-grid"><div><h3>Stated / unexplained</h3><p><strong>Stated</strong> means a reason or purpose exists in the supplied body, commit messages, or reviewed plans. <strong>Unexplained</strong> means those sources disclose no reason for that choice. It does not mean the choice is wrong or unauthorized.</p></div><div><h3>Plan / body / code</h3><p>The shared architecture plan describes the whole stack. These pages compare only each subject’s own base and head. A PR body may have been written after the code; this is a contract comparison, not proof of what was requested first.</p></div><div><h3>Evidence / execution</h3><p>Both patches were read. Sources and test assertions are available offline at exact revisions. A focused source probe checks cache behavior and reattachment error selection. No full suite or end-to-end parity result is claimed.</p></div></div>
<p class="input-limit">No implementation transcript or phase-specific plan was supplied in either bundle. Commit bodies are empty. Overview files contain path headings rather than usable symbol output. Earlier experiments were not read.</p></section>
<section id="file-inventory" class="inventory"><details><summary><span><strong>Trace all 66 changed files</strong><small>6 in #127 · 60 in #131 · each mapped to the decisions above</small></span><span aria-hidden="true">+</span></summary>{inv}</details></section>
<footer><p>09 · diff-of-intent <span>Frozen subject revisions: #127 {SHAS[(127,'base')][:8]} → {SHAS[(127,'head')][:8]} · #131 {SHAS[(131,'base')][:8]} → {SHAS[(131,'head')][:8]}</span></p><div><a href="README.md">Experiment notes</a><a href="manifest.json">Source manifest</a><a href="#top">Back to top ↑</a></div></footer></main>'''
    (HERE/'index.html').write_text(document('Diff of intent · #127 / #131 · rich-review 09', body))
    write_evidence()
    manifest = dict(subjects={str(pr): dict(base=SHAS[(pr,'base')], head=SHAS[(pr,'head')]) for pr in (127,131)},
                    decisions=[{k: r[k] for k in ('id','pr','number','title','reason','relation','refs')} for r in ROWS],
                    changed_files=MANIFEST,
                    sources=[dict(path=s['path'], pr=s['pr'], side=s['side'], sha=s['sha'], file='evidence/'+s['slug'], lines=len(s['lines']), sha256=hashlib.sha256(s['text'].encode()).hexdigest()) for s in SOURCES.values()])
    (HERE/'manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
    print(f'Built {len(ROWS)} decision rows, {len(MANIFEST)} changed-file mappings, and {len(SOURCES)} offline source pages.')

if __name__ == '__main__': build()
