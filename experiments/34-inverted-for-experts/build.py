#!/usr/bin/env python3
"""Build an offline page and embed exact base/head evidence; no third-party packages."""
from pathlib import Path
import hashlib
import html
import json
import re
import subprocess
from content import DECISIONS, GROUPS, FILE_DECISIONS, POLICY, POLICY_TEST, RECORD

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
BUNDLE = ROOT / 'inputs/pr-131'
TREES = {v: ROOT / f'worktrees/pr-131-{v}' for v in ('base', 'head')}
pr = json.loads((BUNDLE / 'pr.json').read_text())
sources = {}
diffs = {}
escape = html.escape


def source(version, path):
    key = f'{version}:{path}'
    if key not in sources:
        if version == 'bundle':
            value = f'# PR {pr["number"]}: {pr["title"]}\n\n{pr["body"]}\n\n## Commit messages\n\n'
            value += '\n\n'.join(f'{c["sha"]}\n{c["subject"]}\n{c["body"]}' for c in pr['commits'])
        else:
            value = (TREES[version] / path).read_text()
        sources[key] = dict(path=path, version=version, text=value,
                            sha256=hashlib.sha256(value.encode()).hexdigest())
    return key


def resolve(r):
    key = source(r['version'], r['path'])
    lines = sources[key]['text'].splitlines()
    matches = [i for i, line in enumerate(lines) if r['needle'] in line]
    if not matches:
        raise ValueError(f'Missing reference: {key} :: {r["needle"]}')
    i = matches[0]
    start, end = max(0, i - r['before']), min(len(lines), i + r['after'] + 1)
    return dict(source=key, start=start+1, end=end, label=r.get('label'),
                excerpt='\n'.join(lines[start:end]))


patch = (BUNDLE / 'diff.patch').read_text()
for block in patch.split('diff --git ')[1:]:
    path = block.splitlines()[0].split(' b/')[1]
    diffs[path] = 'diff --git ' + block

ids = {d['id'] for d in DECISIONS}
assert len(ids) == len(DECISIONS)
decisions = []
for d in DECISIONS:
    item = {k: v for k, v in d.items() if k not in ('why', 'refs')}
    item['refs'] = [resolve(r) for r in d['refs']]
    item['why'] = resolve(d['why']) if d['why'] else None
    item['number'] = len(decisions) + 1
    decisions.append(item)

files = []
for path, diff in diffs.items():
    mapped = FILE_DECISIONS.get(path)
    if mapped is None:
        # The remaining diff blocks have been inspected: helper/import rewiring.
        assert '.test.' in path or '/test/' in path, f'Unmapped production source: {path}'
        mapped = ['adapters']
    assert all(x in ids for x in mapped)
    versions = {}
    for version, tree in TREES.items():
        if (tree / path).exists():
            versions[version] = source(version, path)
    lines = diff.splitlines()
    files.append(dict(path=path, decisions=mapped, versions=versions, diff=diff,
                      added=sum(x.startswith('+') and not x.startswith('+++') for x in lines),
                      removed=sum(x.startswith('-') and not x.startswith('---') for x in lines)))

for path in (POLICY, POLICY_TEST, RECORD, 'packages/daemon/src/policy-testing.ts'):
    base, head = source('base', path), source('head', path)
    assert sources[base]['sha256'] == sources[head]['sha256'], f'Inherited source changed: {path}'

commits = {v: subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=t, text=True).strip()
           for v, t in TREES.items()}
assert commits == {'base': 'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e',
                   'head': 'b100221db48754656328391b878299c5a0bab443'}
assert len(files) == 60
assert sum(f['added'] for f in files) == 1298
assert sum(f['removed'] for f in files) == 544

record_lines = sources[source('head', RECORD)]['text'].splitlines()
policy_rows = []
for i, line in enumerate(record_lines):
    if line.startswith('| `'):
        values = [v.strip().strip('`') for v in line.strip('|').split('|')]
        if len(values) == 5:
            policy_rows.append(dict(path=values[0], value=values[1], applies=values[2],
                                    reason=values[3], oracle=values[4], line=i+1))

data = dict(meta=dict(number=131, title=pr['title'], commits=commits,
                      stats=dict(files=60, added=1298, removed=544),
                      symnavTestsRun=False, earlierExperiments='ignored'),
            groups=GROUPS, decisions=decisions, sources=sources, files=files,
            policyRows=policy_rows, commits=pr['commits'])
(OUT / 'evidence' / 'review-data.js').write_text('window.REVIEW = ' + json.dumps(data, ensure_ascii=False) + ';\n')
(OUT / 'evidence' / 'diff.patch').write_text(patch)
(OUT / 'evidence' / 'pr.json').write_text(json.dumps(pr, indent=2, ensure_ascii=False) + '\n')
(OUT / 'evidence' / 'coverage.json').write_text(json.dumps([
    {k: f[k] for k in ('path', 'decisions', 'added', 'removed')} for f in files
], indent=2) + '\n')

cards = []
for group, number, name, desc in GROUPS:
    entries = [d for d in decisions if d['group'] == group]
    cards.append(f'<section class="evidence-group" id="group-{group}" aria-labelledby="heading-{group}">'
                 f'<div class="group-heading"><span>{number}</span><div><h2 id="heading-{group}">{name}</h2>'
                 f'<p>{desc}</p></div><span class="group-count">{len(entries)} choices</span></div>')
    for d in entries:
        first = d['refs'][0]
        src = sources[first['source']]
        cards.append(f'''<article class="decision" id="evidence-{d['id']}" data-decision="{d['id']}" tabindex="-1">
          <div class="decision-index">{d['number']:02d}</div>
          <div class="specimen"><pre>{escape(d['specimen'])}</pre>
            <a class="source-jump" href="#decision={d['id']}&view=source">{escape(src['version'])} · {escape(Path(src['path']).name)}:{first['start']} ↗</a>
          </div>
          <div class="decision-copy"><h3><a href="#decision={d['id']}">{escape(d['title'])}</a></h3>
            <p>{escape(d['summary'])}</p>
            <div class="reason-line"><span class="status {d['status']}">{d['status'].capitalize()}</span><span>{escape(d['rationale'])}</span></div>
          </div>
          <a class="explain" href="#decision={d['id']}" aria-label="Explain: {escape(d['title'])}">Explain <span aria-hidden="true">↗</span></a>
        </article>''')
    cards.append('</section>')

template = (OUT / 'page.html').read_text()
template = template.replace('{{CARDS}}', '\n'.join(cards))
template = template.replace('{{DECISIONS}}', str(len(decisions)))
template = template.replace('{{UNEXPLAINED}}', str(sum(d['status'] == 'unexplained' for d in decisions)))
template = template.replace('{{NAV}}', ''.join(f'<a href="#group-{g}"><span>{n}</span>{name}</a>' for g, n, name, _ in GROUPS))
(OUT / 'index.html').write_text(template)

print(json.dumps(dict(decisions=len(decisions), files=len(files), source_snapshots=len(sources),
                      resolved_excerpts=sum(len(d['refs']) + bool(d['why']) for d in decisions),
                      policy_rows=len(policy_rows), added=1298, removed=544,
                      unmapped_files=0, inherited_policy_files_unchanged=4), indent=2))
