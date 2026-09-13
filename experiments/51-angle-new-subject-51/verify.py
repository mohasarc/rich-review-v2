#!/usr/bin/env python3
"""Artifact/source integrity checks, not symnav correctness or reader scoring."""
import hashlib,json,re,subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote,urlsplit
from content import EPISODES
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent

class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=[];self.links=[];self.fronts=[];self.parents=[];self.feed(text)
    def handle_starttag(self,tag,attributes):
        a=dict(attributes)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='a' and 'href' in a:self.links.append(a['href'])
        if 'data-decision' in a:self.fronts.append(a['id'])
        if 'data-parent' in a:self.parents.append(a['data-parent'])

problems=[]
pages={p.resolve():Page(p.read_text()) for p in [HERE/'index.html',*(HERE/'sources').glob('*.html')]}
for path,page in pages.items():
    if len(page.ids)!=len(set(page.ids)):problems.append(f'duplicate ids: {path}')
    for link in page.links:
        u=urlsplit(link)
        if u.scheme:continue
        target=(path.parent/unquote(u.path)).resolve() if u.path else path
        if not target.exists():problems.append(f'missing: {path.name} → {link}')
        if target in pages and u.fragment and u.fragment not in pages[target].ids:problems.append(f'fragment: {path.name} → {link}')
index=pages[(HERE/'index.html').resolve()]
expected_fronts=[r[0] for ep in EPISODES for r in ep['extras']]
assert index.fronts==expected_fronts
assert len(index.parents)==117
assert all(p in index.fronts for p in index.parents)
pr_numbers=[n for ep in EPISODES for n in ep['prs']]
assert len(pr_numbers)==len(set(pr_numbers))==26
source_count=0
for key,doc in json.loads((HERE/'evidence/sources.json').read_text()).items():
    assert hashlib.sha256(doc['text'].encode()).hexdigest()==doc['sha256'],key
    current=subprocess.check_output(['git','-C',str(ROOT/'worktrees/stack-head'),'show',f'{doc["revision"]}:{doc["path"]}'],text=True)
    assert current==doc['text'],key
    source_count+=1
rec=json.loads((HERE/'evidence/recordings.json').read_text())['scenarios']
assert [x['reads'] for x in rec['source']['main']]==[2,2,3,4]
assert rec['source']['main']==rec['source']['tip']
assert rec['publication'][-1]['files']==['a.ts@2','b.ts@1']
assert rec['publication'][-1]['events']==['prepare','rollback']
assert rec['release']['main'][0]['backendRelease']=='fulfilled'
assert rec['release']['tip'][0]['backendRelease']=='pending'
assert [x['nextOffset'] for x in rec['receiver']]==[0,1,1]
assert rec['ledger']['sameEntry'] and rec['ledger']['clockReads']==1
assert rec['delivery']['logicalAcknowledgement'] and rec['delivery']['response']=='result-acknowledged'
assert rec['owners']['primary']=='/lesson/B.json' and len(rec['owners']['all'])==2
assert rec['queue'][0]['active']=='Q42' and rec['queue'][0]['queued']==1
assert rec['queue'][1]['active']=='none' and rec['queue'][1]['queued']==1
assert rec['queue'][2]['queued']==0
assert rec['queue'][2]['events']==['worker:Q42','sample:1','worker:Q43','sample:2']
assert rec['policy']['roundTripEqual']
assert not re.search(r'\b(localStorage|sessionStorage|indexedDB)\b',(HERE/'app.js').read_text())
statuses={}
for worktree in ['main','stack-head']:
    statuses[worktree]=subprocess.check_output(['git','-C',str(ROOT/'worktrees'/worktree),'status','--porcelain'],text=True)
report=dict(kind='Source, links and recording consistency; no symnav verdict',htmlPages=len(pages),sourceFiles=source_count,frontRows=len(index.fronts),mappedPrDecisions=len(index.parents),uniquePrs=len(pr_numbers),localLinks=sum(len(p.links) for p in pages.values()),sourceHashesMatch=True,recordingChecks=True,worktreeStatus=statuses,problems=problems)
(HERE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
if problems:raise SystemExit(1)
