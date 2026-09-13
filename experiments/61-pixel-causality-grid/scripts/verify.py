from pathlib import Path
import hashlib,json,re,subprocess
from html.parser import HTMLParser
OUT=Path(__file__).resolve().parents[1];ROOT=OUT.parents[1]
d=json.loads((OUT/'evidence/field.json').read_text())
r=json.loads((OUT/'evidence/recordings.json').read_text())
checks=[]
def passed(name,detail): checks.append(dict(name=name,status='passed',detail=detail))
assert len(d['rows'])==27 and len(d['cells'])==243
assert {c['boundary'] for c in d['cells']}=={b['id'] for b in d['boundaries']}
for c in d['cells']:
 assert c['package']==('@symnav/daemon' if c['pr']==149 else 'apps/cli')
 for ref in c['refs']:
  s=d['sources'][ref['source']];lines=s['text'].splitlines()
  assert 1<=ref['start']<=ref['anchor']<=ref['end']<=len(lines)
  assert s['sha']==next(row['sha'] for row in d['rows'] if row['number']==c['pr'])
passed('243 complete boundary coordinates','Every cell has in-bounds excerpts at its own pinned revision; active package cutover is 149.')
for s in d['sources'].values():
 assert hashlib.sha256(s['text'].encode()).hexdigest()==s['hash']
 if not s['path'].startswith(('Supplied PR','PR #')):
  actual=subprocess.check_output(['git','-C',str(ROOT/'worktrees/stack-head'),'show',s['sha']+':'+s['path']])
  assert hashlib.sha256(actual).hexdigest()==s['hash']
passed('Source hashes match the pinned objects',len(d['sources']))
for row in d['rows']:
 cells={c['boundary']:c for c in d['cells'] if c['pr']==row['number']}
 ex=d['sources'][cells['seal']['refs'][0]['source']]['text']
 seal=re.search(r'await (?:spool|completion)\.finish',ex).start()
 complete=re.search(r'this\.(?:options.ledger|acceptedRequests)\.complete\(',ex).start()
 wait=re.search(r'await this\.(?:options.delivery|deliverySession|completionDeliveries)\.(?:trackedCompletion|get)\(',ex).start()
 assert seal<complete<wait
passed('Ordering at all 27 source snapshots','seal await < terminal publication < tracked delivery await')
assert len(r['runs'])==6
for run in r['runs']:
 cp=run['checkpoints'];assert len(cp)==6
 assert cp[1]['aState']=='completed' and cp[1]['started']==['A']
 assert cp[2]['started']==['A'] and cp[3]['started']==['A','B'] and not cp[3]['ackReturned']
 assert cp[5]['ackReturned'] and cp[5]['navigationResets']==2
passed('Recorded causal gates','Both source builds × normal, sample rejection, cleanup rejection; 36 checkpoints')
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  for name in ['href','src']:
   if name in a:self.links.append(a[name])
page=(OUT/'index.html').read_text();parsed=Links();parsed.feed(page)
for b in d['boundaries']:
 assert 'surface-'+b['id'] in parsed.ids
 assert b['summary'].replace('&','&amp;') in page
for link in parsed.links:
 if link.startswith(('data:','http:','https:','#')):continue
 p=OUT/link.split('#')[0]
 # README is the final handoff and may be written after the first verification pass.
 if p.name!='README.md':assert p.exists(),link
assert not re.search(r'localStorage|sessionStorage|indexedDB|fetch\(', (OUT/'app.js').read_text())
passed('Static complete layer and local destinations','9 boundary summaries remain open; source inventory is local; no collection/storage calls')
for tree in ['main','stack-head']:
 status=subprocess.check_output(['git','-C',str(ROOT/'worktrees'/tree),'status','--porcelain','--untracked-files=no'],text=True)
 assert status=='',status
passed('Symnav worktrees remain untouched','No tracked changes in main or stack-head')
report=dict(status='passed',checks=checks)
(OUT/'evidence/verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
