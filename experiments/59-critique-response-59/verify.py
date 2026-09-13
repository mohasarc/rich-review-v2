"""Check provenance, paired invariants and local navigation. Not comprehension."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote,urlsplit
import hashlib,json,subprocess

ROOT=Path(__file__).resolve().parent
PRE=ROOT.parent/'52-critique-response-52'
sha=lambda data:hashlib.sha256(data).hexdigest()
class Document(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=set();self.duplicates=[];self.links=[];self.forms=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:self.duplicates.append(a['id'])
            self.ids.add(a['id'])
        if tag in ('form','input','textarea','select'):self.forms.append(tag)
        for k in ('href','src'):
            if a.get(k):self.links.append(a[k])

cache={}
def parse(path):
    if path not in cache:
        p=Document();p.feed(path.read_text());cache[path]=p
    return cache[path]
errors=[];link_count=0
for path in ROOT.rglob('*.html'):
    p=parse(path)
    if p.duplicates:errors.append([str(path.relative_to(ROOT)),'duplicate ids',p.duplicates])
    if p.forms:errors.append([str(path.relative_to(ROOT)),'response input',p.forms])
    for raw in p.links:
        u=urlsplit(raw)
        if u.scheme or u.netloc:continue
        target=(path.parent/unquote(u.path)).resolve() if u.path else path
        link_count+=1
        # 52's shared files are assembly fragments, not independent reader pages.
        # Resolve their cross-layer anchors in the delivered complete document.
        if target.parent == ROOT/'baseline-52' and target.name in ('shared-overview.html','shared-depth.html'):
            target=ROOT/'baseline-52/compact.html'
        # README and this report are created at final handoff; all other targets must already exist.
        if target in (ROOT/'README.md', ROOT/'verification.json'):continue
        if not target.is_file():errors.append([str(path.relative_to(ROOT)),'missing target',raw]);continue
        if u.fragment and target.suffix=='.html' and unquote(u.fragment) not in parse(target).ids:
            errors.append([str(path.relative_to(ROOT)),'missing fragment',raw])

prep=json.loads((ROOT/'evidence/preparation.json').read_text())
for name,record in prep['repairs'].items():
    if sha((PRE/name).read_bytes())!=record['original_sha256']:errors.append(['predecessor changed',name])
    if sha((ROOT/'baseline-52'/name).read_bytes())!=record['repaired_sha256']:errors.append(['repaired copy changed',name])
for name,digest in prep['copied_sha256'].items():
    if sha((ROOT/'baseline-52'/name).read_bytes())!=digest:errors.append(['unchanged dependency changed',name])
for variant in ('compact','fuller','reader-a','reader-b'):
    text=(ROOT/'baseline-52'/(variant+'.html')).read_text()
    if text.count('d="M 136 175 L 270 88"')!=2:errors.append(['wrong import direction',variant])
    if 'd="M 270 88 L 136 175"' in text:errors.append(['old import direction remains',variant])
    if 'selected dependency edges' in text:errors.append(['old mixed-edge caption remains',variant])

browser=json.loads((ROOT/'observations/pair-browser.json').read_text())
register_hashes={r['register_sha256'] for r in browser['records'] if 'register_sha256' in r}
if len(register_hashes)!=1:errors.append(['rendered registers differ'])
if browser['errors'] or browser['requests']:errors.append(['browser error/external request'])
states={}
for side in ('base','head'):
    wt=ROOT.parents[1]/'worktrees'/('pr-131-'+side)
    states[side]=subprocess.check_output(['git','status','--short','--untracked-files=no'],cwd=wt,text=True)
    if states[side]!=prep['worktrees'][side]['tracked_status']:errors.append(['worktree tracked state changed',side])
report={'scope':'Artifact provenance, shared repair, local link/fragment integrity and recorded UI invariants. Shared overview/depth fragments are validated inside assembled compact.html. No semantic proof, learning score or Symnav correctness verdict.','errors':errors,'html_files_checked':len(list(ROOT.rglob('*.html'))),'local_references_checked':link_count,'same_rendered_register':len(register_hashes)==1,'source_files_verified_against_pr131_git_objects':len(prep['verified_pinned_sources']),'predecessor_copies_unchanged':True if not any('changed' in str(e) for e in errors) else False,'worktree_tracked_status':states}
(ROOT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
raise SystemExit(bool(errors))
