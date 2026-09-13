"""Freeze 52's usable pair, make one shared semantic repair, preserve witnesses.

Reads predecessors and pinned git objects. Writes only this experiment.
"""
from pathlib import Path
from datetime import datetime, timezone
import ast, difflib, hashlib, json, re, shutil, subprocess

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[1]
PRE = ROOT.parent / '52-critique-response-52'
P51 = ROOT.parent / '51-angle-new-subject-51'
DEST = ROOT / 'baseline-52'
sha = lambda b: hashlib.sha256(b).hexdigest()
def dump(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')

DEST.mkdir(exist_ok=True)
copied = {}
for directory in ('kit', 'evidence', 'sources'):
    for source in sorted((PRE / directory).rglob('*')):
        if not source.is_file() or '__pycache__' in source.parts: continue
        rel = source.relative_to(PRE)
        target = DEST / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, target)
        copied[str(rel)] = sha(source.read_bytes())
for name in ('layout.css','compact.css','coverage.json','ledger.json','source-manifest.json',
             'reader-study.md','reader-instructions.md','reader-results.md'):
    shutil.copyfile(PRE/name, DEST/name)
    copied[name] = sha((PRE/name).read_bytes())

OLD_CAPTION = 'Schematic: grouped modules and selected dependency edges. Green marks the new value route; dashed rust marks retired local authority.'
NEW_CAPTION = 'Schematic: grouped modules. Gray arrow: CLI composition imports and constructs daemon policy. Horizontal arrow: composition supplies values. Green marks required inputs; dashed rust marks replaced optional inputs.'
OLD_DESC = 'The daemon package owns the policy. Inside apps/cli, composition and daemon mechanisms remain separate modules.'
NEW_DESC = 'The daemon package owns the policy; CLI composition imports and constructs it. Inside apps/cli, composition and daemon mechanisms remain separate modules.'
patches=[]
repaired={}
for name in ('compact.html','fuller.html','reader-a.html','reader-b.html','shared-overview.html','shared-depth.html'):
    before=(PRE/name).read_text()
    after=before
    expected = 0 if name == 'shared-depth.html' else 2
    assert before.count('d="M 270 88 L 136 175"') == expected, name
    after=after.replace('d="M 270 88 L 136 175"','d="M 136 175 L 270 88"')
    assert after.count(OLD_CAPTION) == expected, name
    after=after.replace(OLD_CAPTION,NEW_CAPTION).replace(OLD_DESC,NEW_DESC)
    (DEST/name).write_text(after)
    repaired[name]={'original_sha256':sha(before.encode()),'repaired_sha256':sha(after.encode()),'reversed_edges':expected}
    patches.extend(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='52/'+name,tofile='59/baseline-52/'+name))
(ROOT/'arrow-repair.patch').write_text(''.join(patches))

manifest=json.loads((DEST/'source-manifest.json').read_text())
verified=[]
for path, record in manifest['files'].items():
    target=DEST/path
    assert target.is_file(), path
    assert sha(target.read_bytes()) == record['sha256'], path
    if path.startswith(('evidence/base/','evidence/head/')):
        _,side,sourcepath=path.split('/',2)
        worktree=REPO/'worktrees'/('pr-131-'+side)
        pinned=subprocess.check_output(['git','show',record['revision']+':'+sourcepath],cwd=worktree)
        assert target.read_bytes()==pinned, path
        verified.append({'side':side,'path':sourcepath,'revision':record['revision'],'sha256':sha(pinned)})

# Freeze the actual authored front/child relation, without executing predecessor code.
tree=ast.parse((P51/'content.py').read_text())
class LiteralDicts(ast.NodeTransformer):
    def visit_Call(self, node):
        assert isinstance(node.func, ast.Name) and node.func.id == 'dict' and not node.args
        return ast.Dict(keys=[ast.Constant(k.arg) for k in node.keywords], values=[self.visit(k.value) for k in node.keywords])
episodes=None
for node in tree.body:
    if isinstance(node,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='EPISODES' for t in node.targets):
        episodes=ast.literal_eval(LiteralDicts().visit(node.value))
assert episodes
parents=json.loads((P51/'evidence/parent-map.json').read_text())
pr=json.loads((REPO/'inputs/pr-131/pr.json').read_text())
decisions=re.findall(r'^- (.*)',re.search(r'## Decisions\n(.*?)(?=\n## |\Z)',pr['body'],re.S)[1],re.M)
selected=[{'id':e[0],'statement':e[1],'status':e[2],'reason':e[3],'source':e[4],'episode':ep['id']} for ep in episodes for e in ep['extras']]
dump(ROOT/'evidence/51-parents.json',{'origin':'51-angle-new-subject-51/content.py','sha256':sha((P51/'content.py').read_bytes()),'scope':'Authored text, not a fresh source check of the final stack. All fronts retained to check whether a PR-131 consequence appears elsewhere. Only PR-131 descendants are audited.','episodes':[{'id':ep['id'],'takeaway':ep['takeaway'],'before':ep['before'],'after':ep['after']} for ep in episodes],'fronts':selected,'pr131_children':[{'id':f'pr-131-d{i+1}','parent':parent,'statement':statement} for i,(parent,statement) in enumerate(zip(parents['prDecisions']['131'],decisions))]})
for name in ('pr.json','diff.patch','files.txt'):
    shutil.copyfile(REPO/'inputs/pr-131'/name,ROOT/'evidence'/name)
# A context file outside the changed-file census proves the actual import direction.
program_path='apps/cli/src/program.ts'
for side in ('base','head'):
    revision=manifest['revisions'][side]
    content=subprocess.check_output(['git','show',revision+':'+program_path],cwd=REPO/'worktrees'/('pr-131-'+side))
    (ROOT/'evidence'/('program-'+side+'.ts')).write_bytes(content)
    verified.append({'side':side,'path':program_path,'revision':revision,'sha256':sha(content)})
worktrees={}
for side in ('base','head'):
    wt=REPO/'worktrees'/('pr-131-'+side)
    worktrees[side]={'revision':subprocess.check_output(['git','rev-parse','HEAD'],cwd=wt,text=True).strip(),'tracked_status':subprocess.check_output(['git','status','--short','--untracked-files=no'],cwd=wt,text=True)}
dump(ROOT/'evidence/preparation.json',{'captured':datetime.now(timezone.utc).isoformat(),'copied_sha256':copied,'repairs':repaired,'verified_pinned_sources':verified,'worktrees':worktrees,'limits':'Hashes check provenance and copy integrity, not interpretation or completeness.'})
print(f'Copied the pair; corrected arrows and legends in both treatments and packets. Verified {len(verified)} source files against pinned git objects.')
