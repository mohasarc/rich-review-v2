"""Verify evidence integrity, links, and authored delta-to-record assignments."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib, json, re, subprocess, datetime

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent

class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=[];self.links=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        for key in ('href','src'):
            if key in a:self.links.append(a[key])

checks=[]
pages={p.name:Page(p.read_text()) for p in [HERE/'index.html',HERE/'evidence.html']}
links=0
for name,page in pages.items():
    assert len(page.ids)==len(set(page.ids)),name
    for link in page.links:
        u=urlsplit(link)
        if u.scheme or u.netloc:continue
        destination=(HERE/unquote(u.path)) if u.path else HERE/name
        assert destination.exists(),(name,link)
        if u.fragment:
            target=pages.get(destination.name)
            assert target and unquote(u.fragment) in target.ids,(name,link)
        links+=1
checks.append({'check':'unique HTML IDs and valid local links/anchors','links':links})

decisions=json.loads((HERE/'content.json').read_text())
assert [d['id'] for d in decisions]==[f'{i:02}' for i in range(1,13)]
assert all(d['status'] in ('stated','unexplained') and d['reason'] for d in decisions)
for d in decisions:
    assert 'record-'+d['id'] in pages['index.html'].ids
    assert 'detail-'+d['id'] in pages['index.html'].ids
checks.append({'check':'12 visible parent records; 12 matching mechanism exits and returns; explicit rationale status','stated':sum(d['status']=='stated' for d in decisions),'unexplained':sum(d['status']=='unexplained' for d in decisions)})

sources=json.loads((HERE/'evidence/sources.json').read_text())
for s in sources:
    assert hashlib.sha256(s['text'].encode()).hexdigest()==s['sha256']
    assert (HERE/'evidence'/(s['id']+'.txt')).read_text()==s['text']
    if len(s['revision'])==40:
        actual=subprocess.check_output(['git','-C',str(ROOT/'worktrees/pr-127-head'),'show',s['revision']+':'+s['path']],text=True)
        assert actual==s['text'],s['id']
sm={s['id']:s for s in sources}
excerpts=0
for d in decisions:
    for key,start,end in d['sources']:
        assert 0<start<=end<=len(sm[key]['text'].splitlines())
        excerpts+=1
release_source='\n'.join('\n'.join(sm[key]['text'].splitlines()[start-1:end]) for key,start,end in decisions[7]['sources'])
assert 'await this.projects?.releaseTransientResources();' in release_source
assert 'await this.semanticQueries.releaseTransientResources();' in release_source
checks.append({'check':'source hashes match pinned Git objects; excerpts resolve and both await links are included','documents':len(sources),'excerpts':excerpts})

inventory=json.loads((HERE/'evidence/inventory.json').read_text())
assert inventory['five_original_cases_and_helpers_byte_identical']
assert [len(inventory[k]) for k in ('old_service_cases','head_service_cases','new_core_cases')]==[5,11,4]
actual_diff=subprocess.check_output(['git','-C',str(ROOT/'worktrees/pr-127-head'),'diff',inventory['pins']['base'],inventory['pins']['head']],text=True)
assert actual_diff==sm['diff']['text']
checks.append({'check':'supplied patch equals pinned six-file delta; original five cases/helpers identical','oldServiceCases':5,'addedServiceCases':6,'newCoreCases':4})

assignments={
 'typescript-backend.ts':[(80,['06','08','10'])],
 'typescript-semantic-query-service.test.ts':[(2,['11']),(14,['11']),(22,['03','04','06','07','08','09','11'])],
 'typescript-semantic-query-service.ts':[(1,['01','10']),(26,['01','02','10']),(46,['03','06','10']),(90,['02','03','07','08']),(132,['02','09']),(149,['03','09']),(162,['03','04','09']),(216,['01','07'])],
 'turn-scoped-cache-scope.test.ts':[(0,['02','03','04','05','11'])],
 'turn-scoped-cache-scope.ts':[(0,['01','02','03','04','05','10'])],
 'index.ts':[(149,['10'])]
}
rows=[];current=None;row=None
for line in actual_diff.splitlines():
    if line.startswith('diff --git '):current=line.split(' b/',1)[1]
    elif line.startswith('@@'):
        old=int(re.match(r'@@ -(\d+)',line).group(1))
        selected=[ids for start,ids in assignments[Path(current).name] if start==old]
        assert len(selected)==1,(current,old)
        row={'path':current,'hunk':line,'parents':selected[0],'added':0,'removed':0}
        rows.append(row)
    elif row is not None and line.startswith('+') and not line.startswith('+++'):row['added']+=1
    elif row is not None and line.startswith('-') and not line.startswith('---'):row['removed']+=1
assert len(rows)==15
assert sum(r['added'] for r in rows)==391
assert sum(r['removed'] for r in rows)==67
(HERE/'evidence/delta-coverage.json').write_text(json.dumps({'method':'Manual explanatory assignment per patch hunk, with automated accounting. Does not certify semantic completeness or correctness.','hunks':rows},indent=2)+'\n')
checks.append({'check':'every changed hunk assigned to already-visible records','hunks':len(rows),'addedLines':391,'removedLines':67})

for rev in ('base','head'):
    status=subprocess.check_output(['git','-C',str(ROOT/('worktrees/pr-127-'+rev)),'status','--short','--untracked-files=no'],text=True)
    assert not status.strip(),(rev,status)
checks.append({'check':'both worktrees have no tracked modifications'})
required=['Entry point','Kind','Subjects','Declared choices','What I tried','What I would drop','What I would do next','Time spent']
readme=(HERE/'README.md').read_text()
headings=re.findall(r'^## (.+)$',readme,re.M)
assert headings[:len(required)]==required,headings
assert (HERE/'brief.md').exists()
checks.append({'check':'README front headings and brief satisfy the folder contract'})
(HERE/'validation-static.json').write_text(json.dumps({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'checks':checks,'limits':'Hash/link/accounting checks plus authored parent assignments. No automated educational score, no proof of full command parity.'},indent=2)+'\n')
print(f'Passed {len(checks)} static check groups; {links} local links, {excerpts} excerpts, all 15 hunks (+391/-67).')
