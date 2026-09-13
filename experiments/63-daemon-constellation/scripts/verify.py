from pathlib import Path
import json, hashlib, re, subprocess
from html.parser import HTMLParser
HERE=Path(__file__).resolve().parents[1]; ROOT=HERE.parents[1]
data=json.loads((HERE/'data.js').read_text().removeprefix('window.CONSTELLATION = ').removesuffix(';\n'))
records=json.loads((HERE/'evidence/pyramid-map.json').read_text())
checks=[]
def ok(name):checks.append({'name':name,'status':'passed'})
for key,doc in data['receipts'].items():
 p=ROOT/'inputs/pr-148/pr.json' if key.startswith('bundle:') else ROOT/('worktrees/pr-148-'+doc['revision'])/doc['path']
 assert hashlib.sha256(p.read_bytes()).hexdigest()==doc['sha256'],key
 if not key.startswith('bundle:'):assert p.read_text().splitlines()==doc['lines'],key
ok('All 166 captured document hashes and original line arrays match supplied sources')
byid={n['id']:n for n in data['nodes']}
assert len(byid)==92
pairs=set()
for n in data['nodes']:
 assert n['receipt'] in data['receipts']
 assert n['path']==data['receipts'][n['receipt']]['path']
 if n.get('counterpart'):
  other=byid[n['counterpart']];assert other['counterpart']==n['id'];assert other['owner']!=n['owner']
  pairs.add(tuple(sorted([n['id'],other['id']])))
assert len(pairs)==38
assert sum(n['compat'] for n in data['nodes'])==38
ok('38 symmetric CLI/package correspondences and 92 distinct production files')
for e in data['edges']:
 assert e['source'] in byid and e['target'] in byid
 assert e['cite']['receipt']==byid[e['source']]['receipt']
 assert 1<=e['cite']['start']<=e['cite']['end']<=len(data['receipts'][e['cite']['receipt']]['lines'])
assert len(data['edges'])==59
ok('Every one of 59 dependencies has a source-file witness and valid line range')
for r in records:
 assert r['surface'] and r['rationale'] and r['descent']
 for key,a,b in r['sources']:assert 1<=a<=b<=len(data['receipts'][key]['lines'])
 for n in r['focus']:assert n in byid
assert sum(len(r['sources']) for r in records)==37
ok('Seven surface/descent mappings and all 37 reading citation ranges resolve')
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id'in a:self.ids.add(a['id'])
  for k in ['href','src']:
   if k in a:self.links.append(a[k])
l=Links();l.feed((HERE/'index.html').read_text())
for link in l.links:
 if not link or link=='#' or link.startswith(('https:','data:')):continue
 if link.startswith('#'):assert link[1:] in l.ids,link
 else:assert (HERE/link.split('#')[0]).exists(),link
for m in re.finditer(r'\]\(([^)]+)\)',(HERE/'README.md').read_text()):
 link=m[1]
 if not link.startswith(('https:','#')) and link!='evidence/static-checks.json':assert (HERE/link.split('#')[0]).exists(),link
ok('Artifact and README relative links resolve')
assert len(re.findall('class="register-row"',(HERE/'index.html').read_text()))==7
for r in records:assert r['title'] in (HERE/'index.html').read_text()
ok('Complete stopping layer exists in HTML before JavaScript executes')
for p in ['README.md','brief.md','index.html','app.js','data.js','LICENSES.md','package-lock.json']:assert (HERE/p).is_file()
status={}
for rev in ['base','head']:
 w=ROOT/('worktrees/pr-148-'+rev)
 commit=subprocess.check_output(['git','-C',str(w),'rev-parse','HEAD'],text=True).strip()
 assert commit==data['inventory']['pins'][rev]
 status[rev]=subprocess.check_output(['git','-C',str(w),'status','--short','--untracked-files=no'],text=True).strip()
 assert not status[rev]
ok('Folder contract and exact source pins; both symnav worktrees have clean tracked status')
report={'status':'passed','checks':checks,'worktreeStatus':status,'scope':'Source hashes, inventories, citations and artifact links; not a semantic audit of the PR.'}
(HERE/'evidence/static-checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
