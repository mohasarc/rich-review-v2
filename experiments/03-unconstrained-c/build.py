"""Build a dependency-free, offline HTML artifact from frozen local source snapshots."""
from pathlib import Path
from copy import deepcopy
import hashlib
import json
from content import DECISIONS, GROUPS

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
inventory = json.loads((OUT / 'inventory.json').read_text())
decisions = deepcopy(DECISIONS)
sources = {}

def source(revision, path):
    key = revision + ':' + path
    if key not in sources:
        p = ROOT / 'worktrees' / ('pr-148-' + revision) / path
        text = p.read_text()
        sources[key] = dict(path=path, revision=revision, text=text, sha256=hashlib.sha256(text.encode()).hexdigest())
    return key

for d in decisions:
    for r in d['refs']:
        key = source(r['revision'], r['path'])
        text = sources[key]['text']
        assert r['needle'] in text, r
        start = text[:text.index(r['needle'])].count('\n') + 1 if r['needle'] else 1
        r['key'], r['start'], r['end'] = key, start, min(start+r['count']-1, len(text.splitlines()))
        del r['needle']

def related(e):
    p = e['path']
    ids = []
    if 'compatibility-copy' in p: return ['stage', 'freeze']
    if 'vitest.config' in p: return ['serial']
    if 'follow-ups' in p: return ['idle', 'probe']
    if 'policy-testing' in (e.get('old') or '') or 'helpers/daemon-policy' in p or 'lint-rule' in p or p == 'eslint.config.mjs': return ['test-surface']
    if p.endswith('package.json') or p == 'pnpm-lock.yaml': return ['entries', 'test-move', 'test-surface']
    if 'daemon-package.test' in p or 'host-contract.test' in p or 'public-import.test' in p: return ['contract', 'portable', 'test-surface']
    if 'daemon-entry.test' in p or 'entry-boundary' in p or 'package-boundary' in p or '/integration/built-' in p: return ['entries', 'entry-tests']
    if p.endswith('daemon-executor.test.ts') or '/worker/navigation-worker.test.ts' in p: return ['test-narrow']
    if '/client/' in p:
        if 'routing-policy' in p: return ['guards', 'cold']
        if 'control' in p: return ['control', 'probe']
        if 'contracts' in p: return ['contract']
        if p.endswith('daemon-client.ts'): return ['portable', 'load']
        return ['guards', 'cold', 'replay', 'output', 'malformed', 'control', 'probe']
    if '/registry/' in p or 'daemon-registry' in p or 'record-observer' in p: ids += ['registry', 'clock']
    if 'startup-coordinator' in p: ids += ['registry', 'probe', 'control', 'clock']
    if 'lifetime' in p: ids += ['clock', 'idle']
    if 'clock' in p: ids += ['clock', 'test-surface']
    if 'process-coordinator' in p: ids += ['coordinates', 'auth', 'idle', 'clock']
    if 'controller' in p: ids += ['control', 'clock', 'registry']
    if 'process-entry' in p or 'daemon-entry' in p or 'worker-entry' in p or 'process-launcher' in p: ids += ['entries', 'coordinates', 'clock']
    if 'completion-spool' in p or 'client-result-capture' in p or 'local-transport' in p: ids += ['output']
    if 'request-queue' in p or 'accepted-request-ledger' in p or 'resource-monitor' in p or 'resource-supervisor' in p: ids += ['clock']
    if p.endswith('.test.ts') or '/test/' in p: ids += ['test-move']
    if p.startswith('packages/daemon/src/') and not p.endswith('.test.ts'): ids += ['owners']
    if p.startswith('apps/cli/src/daemon/') and not p.endswith('.test.ts'): ids += ['stage']
    if not ids: ids = ['test-move'] if 'test' in p else ['owners']
    return list(dict.fromkeys(ids))

for e in inventory['entries']:
    e['decisions'] = related(e)
    e['headKey'] = source('head', e['path']) if (ROOT / 'worktrees/pr-148-head' / e['path']).exists() else None
    origin = e.get('origin') or e.get('old')
    e['baseKey'] = source('base', origin) if origin and (ROOT / 'worktrees/pr-148-base' / origin).exists() else None

pr = json.loads((ROOT / 'inputs/pr-148/pr.json').read_text())
sources['bundle:pr'] = dict(path='inputs/pr-148/pr.json → body and commits', revision='bundle', text=pr['body']+'\n\nCOMMIT RECORD\n\n'+'\n'.join(c['sha']+' '+c['subject']+'\n'+c['body'] for c in pr['commits']))
data = dict(groups=GROUPS, decisions=decisions, inventory=inventory, sources=sources, traces=json.loads((OUT / 'recordings.json').read_text()))
payload = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
template = (OUT / 'page.html').read_text()
html = template.replace('/* INLINE_STYLE */', (OUT / 'style.css').read_text()).replace('/* INLINE_DATA */', 'const DATA = '+payload+';').replace('/* INLINE_APP */', (OUT / 'app.js').read_text())
(OUT / 'index.html').write_text(html)
(OUT / 'coverage.json').write_text(json.dumps([dict(path=e['path'], decisions=e['decisions']) for e in inventory['entries']], indent=2)+'\n')
print(f'Built index.html: {len(decisions)} choices, {len(inventory["entries"])} changed paths, {len(sources)} source snapshots, {len(html.encode()):,} bytes')
