#!/usr/bin/env python3
"""Check the artifact's navigable evidence, complete file mapping, and read-only surface."""
from collections import Counter
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urlsplit

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.links, self.feedback = [], [], []
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs: self.ids.append(attrs['id'])
        if tag in ('a','link') and 'href' in attrs: self.links.append(attrs['href'])
        if tag == 'script' and 'src' in attrs: self.links.append(attrs['src'])
        if tag in ('form','textarea','input') or attrs.get('contenteditable') == 'true':
            self.feedback.append(tag)

pages = {p.resolve(): Page(p) for p in HERE.rglob('*.html')}
link_count = 0
for path, page in pages.items():
    assert len(page.ids) == len(set(page.ids)), f'Duplicate ids in {path}'
    assert not page.feedback, f'Feedback interface in {path}'
    for raw in page.links:
        u = urlsplit(raw)
        if u.scheme or u.netloc: continue
        dest = (path.parent / unquote(u.path)).resolve() if u.path else path
        # README is deliberately written last under the experiment contract.
        if dest.name == 'README.md' and not dest.exists(): continue
        assert dest.exists(), f'Broken local link in {path}: {raw}'
        assert dest == HERE or HERE in dest.parents, f'Non-portable link: {raw}'
        if u.fragment:
            assert dest in pages, f'Fragment on non-HTML source: {raw}'
            assert unquote(u.fragment) in pages[dest].ids, f'Broken fragment in {path}: {raw}'
        link_count += 1

manifest = json.loads((HERE/'manifest.json').read_text())
ids = {r['id'] for r in manifest['decisions']}
assert len(ids) == 21
assert ids <= set(pages[HERE/'index.html'].ids)
assert Counter(f['pr'] for f in manifest['changed_files']) == {127: 6, 131: 60}
for n, totals in ((127,(391,67)), (131,(1298,544))):
    files = [f for f in manifest['changed_files'] if f['pr'] == n]
    assert (sum(f['added'] for f in files), sum(f['deleted'] for f in files)) == totals
    for f in files: assert f['decisions'] and set(f['decisions']) <= ids
for r in manifest['decisions']:
    assert r['reason'] in ('stated','unexplained') and r['refs']
    for ref in r['refs']:
        assert ref['resolved_line'] > 0 and ref['href']
for s in manifest['sources']:
    if s['side'] == 'bundle':
        text = json.loads((ROOT/f'inputs/pr-{s["pr"]}/pr.json').read_text())['body']
    else:
        text = (ROOT/f'worktrees/pr-{s["pr"]}-{s["side"]}'/s['path']).read_text()
    assert hashlib.sha256(text.encode()).hexdigest() == s['sha256']

js = (HERE/'app.js').read_text()
assert not any(token in js for token in ('localStorage','sessionStorage','indexedDB','fetch(', 'XMLHttpRequest'))
print(f'Verified {len(pages)} HTML pages, {link_count} local links/fragments, 21 decisions, 66 file mappings, and {len(manifest["sources"])} source hashes.')
