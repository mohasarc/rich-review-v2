"""Provenance, matched treatment and offline navigation checks. No comprehension score."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import hashlib,json,re
from content import DECISIONS

ROOT=Path(__file__).resolve().parent
def sha(data):return hashlib.sha256(data).hexdigest()
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=[];self.links=[];self.controls=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag in ('a','link','script','img'):
            url=a.get('href') or a.get('src')
            if url:self.links.append(url)
        if tag in ('input','textarea','form'):self.controls.append(tag)

manifest=json.loads((ROOT/'source-manifest.json').read_text())
for rel,record in manifest['files'].items():
    assert sha((ROOT/rel).read_bytes())==record['sha256'],rel
for name in ['components.py','review.css','exit-link.js']:
    assert (ROOT/'kit'/name).read_bytes()==(ROOT.parent/'32-kit/kit'/name).read_bytes(),name
full=(ROOT/'fuller.html').read_text();compact=(ROOT/'compact.html').read_text()
assert compact.replace('<link rel="stylesheet" href="compact.css">','')==full,'Pair differs beyond root stylesheet'
pair=json.loads((ROOT/'pair-contract.json').read_text())
assert pair['root_markup_sha256']==sha((ROOT/'shared-overview.html').read_bytes())
assert pair['shared_depth_sha256']==sha((ROOT/'shared-depth.html').read_bytes())
for d in DECISIONS:
    assert d['status'] in ('stated','unexplained')
    assert (d['status']=='stated')==(d['reason_source'] is not None)
for excerpt in json.loads((ROOT/'excerpts.json').read_text()):
    source=ROOT/'evidence'/excerpt['path'] if excerpt['side']=='bundle' else ROOT/'evidence'/excerpt['side']/excerpt['path']
    lines=source.read_text().splitlines()
    text='\n'.join(lines[excerpt['first']-1:excerpt['last']])
    assert sha(text.encode())==excerpt['sha256'],excerpt['id']
pages={p:Page(p.read_text()) for p in ROOT.glob('*.html') if p.name not in ('shared-overview.html','shared-depth.html')}
pages.update({p:Page(p.read_text()) for p in (ROOT/'sources').glob('*.html')})
broken=[]
for path,page in pages.items():
    assert len(page.ids)==len(set(page.ids)),str(path)+' duplicate IDs'
    assert not page.controls,str(path)+' response collection UI'
    for url in page.links:
        parsed=urlsplit(url)
        if parsed.scheme in ('http','https','data','mailto'):continue
        target=(path.parent/unquote(parsed.path)).resolve() if parsed.path else path
        if not target.exists():broken.append([str(path.relative_to(ROOT)),url,'missing file']);continue
        if parsed.fragment and target.suffix=='.html':
            dest=pages.get(target) or Page(target.read_text())
            if unquote(parsed.fragment) not in dest.ids:broken.append([str(path.relative_to(ROOT)),url,'missing anchor'])
assert not broken,broken
for variant in ['fuller','compact']:
    text=(ROOT/(variant+'.html')).read_text()
    for d in DECISIONS:
        assert f'id="{d["id"]}"' in text and f'id="m-{d["id"]}"' in text
    assert not re.search(r'localStorage|sessionStorage|fetch\(|XMLHttpRequest',text)
result=dict(status='passed',source_hashes=len(manifest['files']),unchanged_kit_files=3,
    matching_propositions=len(DECISIONS),source_excerpts=len(json.loads((ROOT/'excerpts.json').read_text())),
    checked_html_files=len(pages),broken_links=broken,
    scope='Artifact integrity, not semantic completeness, reader comprehension or Symnav correctness.')
(ROOT/'verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
