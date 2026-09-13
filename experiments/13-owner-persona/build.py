#!/usr/bin/env python3
"""Build an offline page from editorial content and pinned local source snapshots."""
from pathlib import Path
from html import escape
from urllib.parse import quote
import hashlib
import json
import re
import subprocess
import sys
sys.dont_write_bytecode = True
from content import TOPICS, POLICY, POLICY_TEST, RECORD, SPEC

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
BUNDLE = ROOT / 'inputs/pr-131'
TREES = {side: ROOT / f'worktrees/pr-131-{side}' for side in ('base', 'head')}
SHAS = {side: subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=tree, text=True).strip()
        for side, tree in TREES.items()}
assert SHAS == {'base': 'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e', 'head': 'b100221db48754656328391b878299c5a0bab443'}, SHAS
PATCH = (BUNDLE / 'diff.patch').read_text()
actual_patch = subprocess.check_output(['git', 'diff', SHAS['base']+'...'+SHAS['head']], cwd=TREES['head'], text=True)
assert PATCH == actual_patch, 'Bundle patch differs from the provided worktree revisions'
SOURCES = {}
for part in PATCH.split('diff --git ')[1:]:
    path = part.splitlines()[0].split(' b/')[1]
    lines = part.splitlines()
    SOURCES[path] = {
        'path': path, 'diff': 'diff --git '+part,
        'added': sum(line.startswith('+') and not line.startswith('+++') for line in lines),
        'removed': sum(line.startswith('-') and not line.startswith('---') for line in lines),
        'kind': 'production' if '/src/' in path and '.test.' not in path else 'test / helper',
        **{side: (tree/path).read_text() if (tree/path).exists() else '' for side, tree in TREES.items()},
    }
CHANGED = list(SOURCES)
assert len(CHANGED) == 60
assert sum(s['added'] for s in SOURCES.values()) == 1298
assert sum(s['removed'] for s in SOURCES.values()) == 544
for path in [POLICY, POLICY_TEST, RECORD, SPEC, 'packages/daemon/src/policy-testing.ts']:
    SOURCES[path] = {'path': path, 'diff': 'Unchanged in PR #131. Included as context.', 'kind': 'existing context',
                     **{side: (tree/path).read_text() for side, tree in TREES.items()}}
SOURCES['pr.json'] = {'path': 'pr.json', 'kind': 'input bundle', 'diff': 'PR metadata supplied in the input bundle.',
                      'base': '', 'head': (BUNDLE/'pr.json').read_text()}

coverage = {path: [t['id'] for t in TOPICS if path in t['files']] for path in CHANGED}
assert all(coverage.values()), [path for path, topics in coverage.items() if not topics]
for topic in TOPICS:
    for path in topic['files']:
        assert path in SOURCES, path

def render_topic(topic, number):
    refs = '<nav class="source-links" aria-label="Evidence for '+escape(topic['title'])+'">'+' '.join(topic['evidence'])+'</nav>'
    status = topic['status']
    return f'''<details class="decision" id="d-{topic['id']}" data-status="{status}">
    <summary><span class="decision-title"><span class="number">{number:02}</span><strong>{topic['title']}</strong></span>
    <span class="decision-delta">{topic['delta']}</span>
    <span class="decision-reason"><span class="reason-state {status}">{status.title()}</span>{topic['reason']}</span>
    <span class="expander" aria-hidden="true">+</span></summary>
    <div class="explanation"><div class="explanation-header"><h3>{topic['title']} · mechanism and evidence</h3><button class="close-decision" type="button">Back to row ↑</button></div>
    {topic['body']}{refs}</div></details>'''

topics_html = ''.join(render_topic(t,i+1) for i,t in enumerate(TOPICS))
file_rows = []
for path in CHANGED:
    source = SOURCES[path]
    topic_links = ' · '.join(f'<a href="#d-{topic_id}" class="topic-jump">{next(t["title"] for t in TOPICS if t["id"]==topic_id)}</a>' for topic_id in coverage[path])
    file_rows.append(f'''<tr data-file="{escape(path.lower())}"><td><a class="evidence-link" href="evidence.html#{quote(path)}" data-source="{escape(path)}" data-side="diff">{escape(path)}</a></td><td class="file-stat">+{source['added']} / −{source['removed']}</td><td>{topic_links}</td></tr>''')

probe = json.loads((HERE/'probe-results.json').read_text())
data = {'shas': SHAS, 'sources': SOURCES, 'coverage': coverage, 'probe': probe}
safe_json = json.dumps(data, ensure_ascii=False).replace('<', '\\u003c')
template = (HERE/'page.html').read_text()
replacements = {'{{STYLES}}': (HERE/'styles.css').read_text(), '{{APP}}': (HERE/'app.js').read_text(),
                '{{TOPICS}}': topics_html, '{{FILES}}': ''.join(file_rows), '{{DATA}}': safe_json,
                '{{BASE_SHA}}': SHAS['base'], '{{HEAD_SHA}}': SHAS['head']}
for marker, value in replacements.items():
    template = template.replace(marker, value)
assert not re.search(r'\{\{[A-Z_]+\}\}', template)
for reference in re.findall(r'data-source="([^"]+)"', template):
    assert reference in SOURCES, reference
(HERE/'index.html').write_text(template)

evidence_parts = []
for path, source in SOURCES.items():
    file_content = ''.join(f'<details><summary>{side.title()}</summary><pre>{escape(source[side])}</pre></details>' for side in ['diff','base','head'])
    evidence_parts.append(f'<article id="{escape(path)}"><h2>{escape(path)}</h2><p><a href="index.html#files">Return to file index</a></p>{file_content}</article>')
(HERE/'evidence.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PR 131 · local evidence</title><style>body{font:16px system-ui;max-width:1100px;margin:40px auto;padding:0 24px;color:#152e28;background:#f7f8f4}a{color:#12634d}article{border-top:1px solid #b9c9bd;padding:20px 0;scroll-margin-top:15px}h2{font:16px monospace;overflow-wrap:anywhere}pre{font:12px/1.6 monospace;overflow:auto;padding:16px;background:white}summary{cursor:pointer;padding:10px}article:target{outline:2px solid #12634d;outline-offset:10px}</style><h1>PR #131 · local evidence</h1><p><a href="index.html">Return to owner page</a></p><p>Exact bundle diff and worktree source. Base '''+SHAS['base']+' · head '+SHAS['head']+'''. Unchanged context is identified in its Diff view.</p>'''+''.join(evidence_parts)+'''<script>function reveal(){const article=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(article){article.querySelector('details').open=true;article.scrollIntoView()}}addEventListener('hashchange',reveal);reveal();</script></html>''')

manifest = {'base': SHAS['base'], 'head': SHAS['head'], 'bundlePatchSha256': hashlib.sha256(PATCH.encode()).hexdigest(),
            'changedFiles': len(CHANGED), 'productionFiles': sum(s['kind']=='production' for s in SOURCES.values()),
            'added':1298, 'removed':544, 'topics':len(TOPICS), 'fileCoverage':coverage,
            'sourceChecksums': {p:{side:hashlib.sha256(s[side].encode()).hexdigest() for side in ['base','head']} for p,s in SOURCES.items()}}
(HERE/'audit.json').write_text(json.dumps(manifest, indent=2)+'\n')
print(f'Built index.html ({len(template.encode()):,} bytes); 60 / 60 changed files mapped to {len(TOPICS)} decisions.')
