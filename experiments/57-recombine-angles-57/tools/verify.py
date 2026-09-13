"""Artifact checks only. No tests of symnav behavior or human understanding."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import datetime
import hashlib
import json

OUT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.ids=[]; self.links=[]; self.tables=0; self.rows=[]
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='table':self.tables+=1
        if tag=='tr' and 'data-row' in a:self.rows.append(a['id'])
        for key in ('href','src'):
            if key in a:self.links.append(a[key])

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    checks=[]; errors=[]; pages={}
    for f in OUT.rglob('*.html'):
        pages[f.resolve()]=Page(f.read_text())
    for f,p in pages.items():
        if len(p.ids)!=len(set(p.ids)):errors.append(f'duplicate ids: {f}')
        for link in p.links:
            u=urlsplit(link)
            if u.scheme or u.netloc:errors.append(f'nonlocal link: {f.name} {link}');continue
            target=(f.parent/unquote(u.path)).resolve() if u.path else f
            if target == (OUT/'validation.json').resolve():continue
            if not target.exists():errors.append(f'missing target: {f.relative_to(OUT)} → {link}');continue
            if target in pages and u.fragment and unquote(u.fragment) not in pages[target].ids:
                errors.append(f'missing local anchor: {f.relative_to(OUT)} → {link}')
    checks.append({'name':'HTML links and own-file anchors','files':len(pages),'errors':len(errors)})
    seal=json.loads((OUT/'recall-seal.json').read_text())
    for entry in seal['files']:
        assert sha(OUT/entry['path'])==entry['sha256'],entry['path']
    checks.append({'name':'sealed recall and reading captures unchanged','files':len(seal['files'])})
    sm=json.loads((OUT/'source-manifest.json').read_text()); source={x['id']:x for x in sm['files']}
    for entry in sm['files']:
        raw=(OUT/entry['local']).read_bytes()
        assert hashlib.sha256(raw).hexdigest()==entry['sha256'],entry['id']
        assert hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==entry['blob'],entry['id']
    assert source['base-policy-plan']['blob']==source['head-policy-plan']['blob']
    assert source['base-cli']['blob']==source['head-cli']['blob']
    assert source['base-dispatcher']['blob']==source['head-dispatcher']['blob']
    assert sm['patch_matches_bundle']
    assert sha(OUT/'receipts/pr-148.patch')==sm['patch_sha256']
    assert (OUT/'receipts/pr-148.patch').read_bytes()==(OUT.parents[1]/'inputs/pr-148/diff.patch').read_bytes()
    checks.append({'name':'git blob and SHA-256 integrity; unchanged policy plan, CLI and dispatcher; exact bundle patch','sources':len(sm['files'])})
    rm=json.loads((OUT/'receipt-manifest.json').read_text())
    for e in rm:
        if e['kind']=='page':
            p=OUT/e['capture'];text=p.read_text();assert e['text'] in text
            assert sha(p)==e['sha256'];assert text[:text.index(e['text'])].count('\n')+1==e['start_line']
        else:
            s=source[e['source']];lines=(OUT/s['local']).read_text().splitlines()
            assert '\n'.join(lines[e['start']-1:e['end']])==e['text'];assert s['sha256']==e['sha256']
    checks.append({'name':'exact page/source quotations and line ranges','excerpts':len(rm)})
    rows=json.loads((OUT/'row-manifest.json').read_text())['rows']
    recall={r['id']:r for r in json.loads((OUT/'recall.json').read_text())['rows']}
    assert {r['id'] for r in rows}==set(recall)
    for row in rows:assert row['learned']==recall[row['id']]['learned']
    assert pages[(OUT/'index.html').resolve()].tables==1
    assert pages[(OUT/'receipts.html').resolve()].tables==0
    assert pages[(OUT/'index.html').resolve()].rows==[r['row_anchor'] for r in rows]
    checks.append({'name':'one visible comparison table, 15 surfaced readings, learned column from seal','rows':len(rows),'witnessed_rows':sum(bool(r['r4']) for r in rows)})
    originals=json.loads((OUT/'receipts/original-input-hashes.json').read_text())
    for e in originals:assert sha(OUT.parent/e['path'])==e['sha256'],e['path']
    checks.append({'name':'original teaching assets unchanged since construction snapshot','files':len(originals)})
    code=(OUT/'app.js').read_text()
    for forbidden in ('localStorage','sessionStorage','indexedDB','fetch(','XMLHttpRequest','WebSocket','sendBeacon'):
        assert forbidden not in code,forbidden
    checks.append({'name':'small in-memory UI has no storage or network API'})
    doc={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'artifact integrity and navigation targets; not implementation correctness, semantic completeness, or human learning','checks':checks,'errors':errors}
    (OUT/'validation.json').write_text(json.dumps(doc,indent=2)+'\n')
    print(json.dumps(doc,indent=2))
    if errors:raise SystemExit(1)

if __name__=='__main__':main()
