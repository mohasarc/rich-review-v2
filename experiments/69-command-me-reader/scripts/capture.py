from pathlib import Path
import hashlib, json, subprocess, re

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
PINS = {'base': 'a1e325a5ff979bdfa25babc5554621c8c0f20497', 'head': '64919bcbcf7fcc8202779b78c5f069b24662bb18'}
B = 'packages/backend-typescript/src/typescript-backend/'
C = 'packages/core/src/'
specs = [
 ('core', 'head', C+'backend/turn-scoped-cache-scope.ts', 1, 46),
 ('core-tests', 'head', C+'backend/turn-scoped-cache-scope.test.ts', 1, 92),
 ('handles', 'head', B+'typescript-semantic-query-service.ts', 29, 77),
 ('projection', 'head', B+'typescript-semantic-query-service.ts', 80, 101),
 ('identity-queries', 'head', B+'typescript-semantic-query-service.ts', 103, 127),
 ('release', 'head', B+'typescript-semantic-query-service.ts', 129, 156),
 ('positions', 'head', B+'typescript-semantic-query-service.ts', 134, 173),
 ('backend', 'head', B+'typescript-backend.ts', 79, 89),
 ('base-backend', 'base', B+'typescript-backend.ts', 79, 89),
 ('base-service', 'base', B+'typescript-semantic-query-service.ts', 28, 75),
 ('base-release', 'base', B+'typescript-semantic-query-service.ts', 125, 128),
 ('base-clear', 'base', B+'typescript-semantic-query-service.ts', 219, 228),
 ('service-tests', 'head', B+'typescript-semantic-query-service.test.ts', 28, 217),
 ('graph', 'head', C+'workspace/project-graph.ts', 144, 153),
 ('project', 'head', B+'typescript-project-graph.ts', 68, 85),
 ('public', 'head', C+'index.ts', 152, 152),
 ('backend-wrappers', 'head', B+'typescript-backend.ts', 110, 148),
 ('spec', 'head', 'plans/005/daemon-architecture-functional-spec.md', 20, 28),
 ('spec-owner', 'head', 'plans/005/daemon-architecture-functional-spec.md', 48, 64),
 ('spec-extends', 'head', 'plans/005/daemon-architecture-functional-spec.md', 90, 97),
]
docs, receipts = {}, {}
status = {}
for kind,pin in PINS.items():
    tree=ROOT/'worktrees'/('pr-127-'+kind)
    actual=subprocess.check_output(['git','rev-parse','HEAD'],cwd=tree,text=True).strip()
    assert actual==pin,(kind,actual)
    status[kind]=subprocess.check_output(['git','status','--porcelain','--untracked-files=no'],cwd=tree,text=True)
    assert not status[kind], status[kind]
for key,kind,path,start,end in specs:
    tree=ROOT/'worktrees'/('pr-127-'+kind)
    text=(tree/path).read_text()
    pinned=subprocess.check_output(['git','show',PINS[kind]+':'+path],cwd=tree).decode()
    assert text==pinned,path
    docid=kind+':'+path
    docs[docid]={'revision':PINS[kind],'path':path,'sha256':hashlib.sha256(text.encode()).hexdigest(),'text':text}
    receipts[key]={'id':key,'build':kind,'path':path,'revision':PINS[kind], 'start':start,'end':end,'text':'\n'.join(text.splitlines()[start-1:end]),'document':docid}
pr=json.loads((ROOT/'inputs/pr-127/pr.json').read_text())
receipts['intent']={'id':'intent','build':'bundle','path':'inputs/pr-127/pr.json · body and commits','revision':PINS['head'],'start':1,'end':0,'text':pr['body']+'\n\nCOMMITS\n'+'\n'.join(x['sha']+' '+x['subject'] for x in pr['commits'])}
service=B+'typescript-semantic-query-service.test.ts'
head=(ROOT/'worktrees/pr-127-head'/service).read_text()
base=(ROOT/'worktrees/pr-127-base'/service).read_text()
marker='  it("shares one reference search across caller and reference projections"'
identical=head[head.index(marker):]==base[base.index(marker):]
assert identical
patch=(ROOT/'inputs/pr-127/diff.patch').read_text()
inventory={'pins':PINS,'changedFiles':len(re.findall(r'^diff --git ',patch,re.M)),'addedLines':sum(l.startswith('+') and not l.startswith('+++') for l in patch.splitlines()),'removedLines':sum(l.startswith('-') and not l.startswith('---') for l in patch.splitlines()),'headServiceTests':len(re.findall(r'  it\(',head)),'baseServiceTests':len(re.findall(r'  it\(',base)),'newCoreTests':4,'originalTestsAndHelpersByteIdentical':identical,'trackedWorktreeStatus':status}
for name,data in [('sources.json',docs),('receipts.json',receipts),('inventory.json',inventory)]:
    (OUT/'evidence'/name).write_text(json.dumps(data,indent=2)+'\n')
(OUT/'evidence/diff.patch').write_text(patch)
(OUT/'evidence/pr.json').write_text(json.dumps(pr,indent=2)+'\n')
print(json.dumps(inventory,indent=2))
