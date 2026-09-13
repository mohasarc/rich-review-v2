from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, hashlib, subprocess, re

OUT=Path(__file__).resolve().parents[1]
ROOT=OUT.parents[1]
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=set();self.links=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids,attrs['id']
            self.ids.add(attrs['id'])
        for key in ('href','src'):
            if attrs.get(key):self.links.append(attrs[key])

pages={name:Page((OUT/name).read_text()) for name in ['index.html','sources.html']}
checked_links=0
for name,page in pages.items():
    for link in page.links:
        url=urlsplit(link)
        if url.scheme or url.netloc:continue
        path=unquote(url.path) or name
        assert (OUT/path).is_file(),(name,link)
        if url.fragment and path in pages:assert unquote(url.fragment) in pages[path].ids,(name,link)
        checked_links+=1
docs=json.loads((OUT/'evidence/sources.json').read_text())
receipts=json.loads((OUT/'evidence/receipts.json').read_text())
for key,d in docs.items():
    assert hashlib.sha256(d['text'].encode()).hexdigest()==d['sha256']
    tree=ROOT/'worktrees'/('pr-127-'+key.split(':')[0])
    actual=subprocess.check_output(['git','show',d['revision']+':'+d['path']],cwd=tree).decode()
    assert d['text']==actual,key
for key,r in receipts.items():
    if 'document' not in r:continue
    assert r['text']=='\n'.join(docs[r['document']]['text'].splitlines()[r['start']-1:r['end']]),key
assert 'TurnScopedCacheScope' in receipts['public']['text']
assert 'releaseTransientResources(): void' in receipts['base-release']['text']
assert 'does not let an old promise settlement replace a new turn entry' in receipts['core-tests']['text']
inventory=json.loads((OUT/'evidence/inventory.json').read_text())
assert (inventory['changedFiles'],inventory['addedLines'],inventory['removedLines'])==(6,391,67)
assert inventory['originalTestsAndHelpersByteIdentical']
decisions=json.loads((OUT/'src/decisions.json').read_text())
ids={d['id'] for d in decisions}
file_map={
 'typescript-backend.ts':['refresh','release','projections'],
 'typescript-semantic-query-service.ts':['ownership','identity','held','projections','refresh','release','surface'],
 'typescript-semantic-query-service.test.ts':['identity','projections','refresh','release','tests'],
 'turn-scoped-cache-scope.ts':['ownership','identity','held','surface'],
 'turn-scoped-cache-scope.test.ts':['identity','held','tests'],
 'index.ts':['surface'],
}
patch=(OUT/'evidence/diff.patch').read_text()
coverage=[]
for part in patch.split('diff --git ')[1:]:
    path=part.splitlines()[0].split(' b/')[1]
    readings=file_map[Path(path).name];assert all(x in ids for x in readings)
    coverage.append({'path':path,'hunks':re.findall(r'^@@.*@@.*$',part,re.M),'openReadings':readings})
stage_map={'point':['identity'],'drag':['identity','held'],'predict':['held'],'hold':['held'],'holding':['held'],'compare':['held','tests'],'say':['held']}
assert all(x in ids for values in stage_map.values() for x in values)
(OUT/'evidence/coverage.json').write_text(json.dumps({'completeLayer':'opening, instrument legend, ownership strip and eight open readings','changedPaths':coverage,'ritualStages':stage_map,'sourceLinks':{d['id']:d['sources'] for d in decisions}},indent=2)+'\n')
status={}
for build,pin in inventory['pins'].items():
    tree=ROOT/'worktrees'/('pr-127-'+build)
    assert subprocess.check_output(['git','rev-parse','HEAD'],cwd=tree,text=True).strip()==pin
    status[build]=subprocess.check_output(['git','status','--porcelain','--untracked-files=no'],cwd=tree,text=True)
    assert status[build]=='',status
required=['Entry point','Kind','Subjects','Declared choices','What I tried','What I would drop','What I would do next','Time spent']
readme=(OUT/'README.md').read_text()
for h in required:assert '## '+h in readme,h
assert (OUT/'brief.md').read_text()==(ROOT/'queue/running/69-command-me-reader.md').read_text() if (ROOT/'queue/running/69-command-me-reader.md').exists() else (OUT/'brief.md').is_file()
assert '15 passed' in (OUT/'evidence/head-tests.txt').read_text()
browser=json.loads((OUT/'validation-browser.json').read_text());assert browser['passed']
result={'passed':True,'localLinksChecked':checked_links,'sourceDocumentsVerified':len(docs),'receiptsVerified':len(receipts),'completeReadings':len(decisions),'changedPathsCovered':len(coverage),'hunksCovered':sum(len(x['hunks']) for x in coverage),'stagesCovered':len(stage_map),'trackedWorktreeStatus':status,'builtAssets':{p:hashlib.sha256((OUT/p).read_bytes()).hexdigest() for p in ['index.html','sources.html','app.js','style.css']}}
(OUT/'validation-static.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
