from datetime import datetime, timezone
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parents[1]


class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.links, self.ids, self.duplicates, self.tables = [], set(), [], 0
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                self.duplicates.append(attrs['id'])
            self.ids.add(attrs['id'])
        self.tables += tag == 'table'


report = {'time_utc':datetime.now(timezone.utc).isoformat()}
failures = []
routes = json.loads((ROOT/'routes.json').read_text())
rows = json.loads((ROOT/'review.json').read_text())
report['routes'] = len(routes)
report['experiments'] = len(set(r['folder'] for r in routes))
report['table_rows'] = len(rows)
report['r4_surfaces'] = sum(r['flagged'] for r in rows)
assert report['routes'] == report['table_rows'] == 53
assert report['experiments'] == 43
assert report['r4_surfaces'] == 9
assert {r['id'] for r in rows} == {r['id'] for r in routes}
assert len({r['id'] for r in rows}) == len(rows)

for manifest_name in ['before-diff-seal.json','source-capture.json']:
    manifest = json.loads((ROOT/manifest_name).read_text())
    checks = []
    for file in manifest['files']:
        actual = hashlib.sha256((ROOT/file['path']).read_bytes()).hexdigest()
        if actual != file['sha256']:
            failures.append('Hash changed: '+file['path'])
        checks.append(actual == file['sha256'])
    report[manifest_name] = {'files':len(checks),'all_hashes_match':all(checks)}

parsed = {}
for name in ['review.html','witnesses.html']:
    path = ROOT/name
    parsed[path] = Document(path)
    if parsed[path].duplicates:
        failures.append('Duplicate anchors: '+name)
link_count = 0
for path in list(parsed):
    for link in parsed[path].links:
        parts = urlsplit(link)
        if parts.scheme or parts.netloc:
            failures.append('Nonlocal link in offline artifact: '+link)
            continue
        target = (path.parent/unquote(parts.path)).resolve() if parts.path else path
        if not target.exists():
            failures.append(f'Missing link from {path.name}: {link}')
            continue
        if parts.fragment and target.suffix == '.html':
            if target not in parsed:
                parsed[target] = Document(target)
            if unquote(parts.fragment) not in parsed[target].ids:
                failures.append(f'Missing anchor from {path.name}: {link}')
        link_count += 1
report['local_links_checked'] = link_count
report['html_tables'] = parsed[ROOT/'review.html'].tables
assert report['html_tables'] == 1
md = (ROOT/'review.md').read_text()
report['markdown_table_data_rows'] = len([s for s in md.splitlines() if s.startswith('| [')])
assert report['markdown_table_data_rows'] == 53
assert len(re.findall(r'^\| ---',md,re.M)) == 1
assert '\n\n| [01 ' not in md  # One continuous table after its header.

required = ['# fresh-reader-refresh-50','## Entry point','## Kind','## Subjects','## Declared choices',
            '## What I tried','## What I would drop','## What I would do next','## Time spent']
readme = (ROOT/'README.md').read_text()
report['readme_required_headings'] = [h for h in required if h in readme.splitlines()]
assert report['readme_required_headings'] == required
assert (ROOT/'brief.md').exists()

sources = json.loads((ROOT/'evidence/source-manifest.json').read_text())
report['pinned_source_snapshots'] = len(sources)
report['pinned_source_hashes'] = [{**r,'sha256':hashlib.sha256((ROOT/'evidence'/r['file']).read_bytes()).hexdigest()} for r in sources]
report['old_127_tests'] = json.loads((ROOT/'evidence/127-test-comparison.json').read_text())
report['browser'] = json.loads((ROOT/'browser-verification.json').read_text())['success']
if not report['browser']:
    failures.append('Browser validation failed')
report['worktree_status'] = {}
for name in ['main','stack-head']:
    report['worktree_status'][name] = subprocess.check_output(
        ['git','status','--short'],cwd=REPO_ROOT/'worktrees'/name,text=True)
report['failures'] = failures
report['success'] = not failures
(ROOT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k not in ['pinned_source_hashes']},indent=2))
if failures:
    raise SystemExit(1)
