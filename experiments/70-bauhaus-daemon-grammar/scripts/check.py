from pathlib import Path
from html.parser import HTMLParser
import hashlib,json,re,subprocess

OUT=Path(__file__).resolve().parents[1]
ROOT=OUT.parents[1]
class Links(HTMLParser):
    def __init__(self): super().__init__(); self.links=[]; self.ids=[]; self.receipts=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if 'data-source' in a:self.receipts.append(a['data-source'])
        if tag in ['a','script','link']:
            url=a.get('href') or a.get('src')
            if url:self.links.append(url)

bank=json.loads((OUT/'evidence/sources.json').read_text())
for side,pin in bank['pins'].items():
    wt=ROOT/'worktrees'/f'pr-131-{side}'
    assert subprocess.check_output(['git','rev-parse','HEAD'],cwd=wt,text=True).strip()==pin
    assert not subprocess.check_output(['git','status','--porcelain','--untracked-files=no'],cwd=wt,text=True).strip()
for key,doc in bank['documents'].items():
    actual=json.loads((ROOT/'inputs/pr-131/pr.json').read_text())['body'] if key=='pr' else (ROOT/'worktrees'/f'pr-131-{doc["side"]}'/doc['path']).read_text()
    assert actual==doc['text'];assert hashlib.sha256(actual.encode()).hexdigest()==doc['sha256']
for e in bank['excerpts'].values():
    if e['doc']=='pr':
        # This receipt preserves the complete supplied body including its final
        # newline; ordinary source excerpts preserve the addressed lines.
        assert e['text']==bank['documents']['pr']['text']
        assert e['start']==1 and e['end']==len(e['text'].splitlines())
    else:
        assert '\n'.join(bank['documents'][e['doc']]['text'].splitlines()[e['start']-1:e['end']])==e['text']
main=(OUT/'index.html').read_text();p=Links();p.feed(main)
assert len(p.ids)==len(set(p.ids))
for url in p.links:
    if re.match(r'https?:|data:|mailto:',url):continue
    path,_,fragment=url.partition('#')
    target=OUT/path if path else OUT/'index.html'
    assert target.exists(),url
    if fragment and target.suffix=='.html':
        q=Links();q.feed(target.read_text());assert fragment in q.ids,url
assert all(key in bank['excerpts'] for key in p.receipts)
for n in range(1,7):
    assert f'reading-{n}' in p.ids and f'mechanism-{n}' in p.ids
    assert f'href="#reading-{n}"' in main and f'href="#mechanism-{n}"' in main
for required in ['README.md','brief.md','vendor/svg.min.js','vendor/SVG.js-LICENSE.txt','evidence/recordings.json','evidence/test-runs.json','evidence/browser-checks.json']:
    assert (OUT/required).is_file(),required
readme=(OUT/'README.md').read_text()
headings=['Entry point','Kind','Subjects','Declared choices','What I tried','What I would drop','What I would do next','Time spent']
assert all('## '+h in readme for h in headings)
tests=json.loads((OUT/'evidence/test-runs.json').read_text());assert all(r['exitCode']==0 for r in tests)
browser=json.loads((OUT/'evidence/browser-checks.json').read_text());assert all(c['passed'] for c in browser['checks'])
source=(OUT/'src/app.js').read_text();assert not any(s in source for s in ['localStorage','sessionStorage','fetch(','XMLHttpRequest','WebSocket'])
result={'sourcesAndHashes':len(bank['documents']),'exactExcerpts':len(bank['excerpts']),'localLinksChecked':len(p.links),'topReadings':6,'matchingMechanisms':6,'focusedRuns':len(tests),'browserGroups':len(browser['checks']),'trackedWorktreesClean':True,'readmeContract':True,'pyramidAudit':'Manual scope mapping in evidence/pyramid-audit.md; anchor checks alone do not establish completeness.'}
(OUT/'evidence/static-checks.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
