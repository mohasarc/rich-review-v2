#!/usr/bin/env python3
"""Read pinned Git objects; write only this experiment. No source execution."""
import collections, hashlib, json, re, subprocess
from pathlib import Path

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
REPO = ROOT / 'worktrees/stack-head'
BUNDLE = json.loads((ROOT/'inputs/stack/pr.json').read_text())
def git(*args):
    return subprocess.check_output(['git', '-C', str(REPO), *args], text=True)
def write(path, text):
    p=OUT/path; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(text)
def dump(path, data): write(path, json.dumps(data, ensure_ascii=False, indent=2))
def js(data): return json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
prs=BUNDLE['pullRequests']
revs=[BUNDLE['base']]+[p['commits'][-1]['sha'] for p in prs]
assert revs[-1] == BUNDLE['head']
assert git('rev-parse','HEAD').strip()==revs[-1]
assert subprocess.check_output(['git','-C',str(ROOT/'worktrees/main'),'rev-parse','HEAD'],text=True).strip()==revs[0]
def stats(a,b):
    result={}
    for line in git('diff','--numstat','--no-renames',a,b).splitlines():
        plus,minus,path=line.split('\t',2)
        if plus!='-' and not path.endswith('.DS_Store'):
            result[path]=[int(plus),int(minus)]
    return result
steps=[{}]+[stats(a,b) for a,b in zip(revs,revs[1:])]
paths=sorted(set().union(*(s.keys() for s in steps)))
trees=[]
for sha in revs:
    tree={}
    for l in git('ls-tree','-r',sha).splitlines():
        meta,path=l.split('\t',1); tree[path]=meta.split()[2]
    trees.append(tree)
net=[{}]+[stats(revs[0],sha) for sha in revs[1:]]
districts={
    'daemon': {'name':'@symnav/daemon','label':'DAEMON','path':'packages/daemon'},
    'cli': {'name':'symnav · apps/cli','label':'CLI','path':'apps/cli'},
    'core': {'name':'@symnav/core','label':'CORE','path':'packages/core'},
    'typescript': {'name':'@symnav/backend-typescript','label':'TYPESCRIPT','path':'packages/backend-typescript'},
    'renderer': {'name':'@symnav/renderer','label':'RENDERER','path':'packages/renderer'},
    'telemetry': {'name':'@symnav/telemetry','label':'TELEMETRY','path':'packages/telemetry'},
    'meta': {'name':'meta-tests','label':'META-TESTS','path':'meta-tests'},
    'repository': {'name':'Repository infrastructure','label':'REPOSITORY','path':'(outside packages)'},
}
def district(path):
    for k,d in districts.items():
        if path.startswith(d['path']+'/'): return k
    return 'repository'
def role(path):
    if re.search(r'(^|/)(test|tests|meta-tests)/|\.test\.[cm]?[jt]sx?$',path): return 'test'
    if not re.search(r'\.[cm]?[jt]sx?$',path) or path.endswith('.config.ts') or path.endswith('.config.mjs'): return 'support'
    if re.search(r'(^|/)(index|.*contracts?|.*protocol|daemon-executor|daemon-lifecycle-report|daemon-command-name|daemon-execution-failure|daemon-admission|daemon-policy)\.ts$',path): return 'contract'
    return 'mechanism'
def owner(path,d):
    if d=='meta' or d=='repository': return 'infrastructure'
    if d=='cli':
        if path.startswith('apps/cli/src/commands/'): return 'host'
        if 'workspace-request-scope' in path: return 'core'
        if 'invocation-' in path or 'daemon-command-dispatcher' in path or 'daemon-executor' in path: return 'host'
        if 'daemon-lifecycle-renderer' in path: return 'renderer'
        if '/daemon/' in path or re.search(r'/daemon-(?!executor|invocation)',path): return 'daemon'
        return 'host'
    if d=='typescript' and path.endswith('/workspace-source-cache.ts'): return 'core'
    return d

files=[]; snapshots=[[] for _ in revs]; blobcache={}; total_bytes=0
for i,path in enumerate(paths):
    d=district(path); f={'id':i,'path':path,'district':d,'role':role(path),'owner':owner(path,d)}
    f['first']=next(k for k,s in enumerate(steps) if path in s)
    f['changes']=[k for k,s in enumerate(steps) if path in s]
    files.append(f); sources={}; diffs={}; last=0
    for k,sha in enumerate(revs):
        if path in steps[k]: last=k
        oid=trees[k].get(path)
        snapshots[k].append([int(oid is not None),*net[k].get(path,[0,0]),*steps[k].get(path,[0,0]),last,oid])
        if oid and oid not in sources:
            if oid not in blobcache: blobcache[oid]=git('show',oid)
            sources[oid]=blobcache[oid]
        if path in steps[k]:
            diffs[str(k)]=git('diff','--no-renames','--unified=4',revs[k-1],sha,'--',path)
    payload={'path':path,'sources':sources,'diffs':diffs}
    txt=f'window.CITY_SOURCES[{i}]={js(payload)};\n'; total_bytes+=len(txt.encode())
    write(Path('evidence/files')/f'{i}.js',txt)

rename_steps=[]
for k,(a,b) in enumerate(zip(revs,revs[1:]),1):
    renames=[]
    for l in git('diff','-M','--name-status',a,b).splitlines():
        bits=l.split('\t')
        if bits[0].startswith('R'): renames.append({'similarity':int(bits[0][1:]),'from':bits[1],'to':bits[2]})
    rename_steps.append(renames)
for k,p in enumerate(prs,1):
    p['sha']=revs[k]; p['index']=k
    p['context']=p['body'].split('## Shape')[0].replace('## Context','').strip()
    match=re.search(r'## Decisions\n(.*?)(?=\n## |\Z)',p['body'],re.S)
    p['decisions']=[l[2:] for l in match.group(1).strip().splitlines() if l.startswith('- ')] if match else []
    p['renames']=rename_steps[k-1]
    p['surface']={'add':sum(v[0] for v in steps[k].values()),'delete':sum(v[1] for v in steps[k].values()),'paths':len(steps[k])}

data={'base':revs[0],'head':revs[-1],'revisions':revs,'prs':prs,'files':files,'snapshots':snapshots,'districts':districts}
write('data.js','window.CITY_DATA='+js(data)+';\nwindow.CITY_SOURCES={};\n')
dump('evidence/capture.json',{'base':revs[0],'head':revs[-1],'revisions':revs,'fileCount':len(files),'sourceBlobCount':len(blobcache),'fileReceiptBytes':total_bytes,'classification':'Path-based concern and file-role grouping; not an AST census or CODEOWNERS.','measure':'Per physical path, git diff --numstat --no-renames main <skyline>; additions + deletions. Deleted paths become foundations.','sourceHashes':{k:hashlib.sha256(v.encode()).hexdigest() for k,v in blobcache.items()}})
dump('evidence/renames.json',{str(p['number']):p['renames'] for p in prs})
write('evidence/stack-pr-bodies.json',json.dumps(BUNDLE,ensure_ascii=False,indent=2))
survey=[]
for p in sorted((ROOT/'experiments').glob('*/README.md')):
    if p.parent==OUT: continue
    lines=[l for l in p.read_text().splitlines() if l.startswith(('- Shape:', '- Representations used:'))]
    if lines: survey.append({'experiment':p.parent.name,'declarations':lines})
dump('evidence/novelty-survey.json',survey)
frozen=sorted(p for p in trees[25] if p.startswith('apps/cli/src/daemon/') and p.endswith('.ts') and not p.endswith('.test.ts') and p.split('/')[-1] not in ['daemon-command-dispatcher.ts','invocation-route.ts','invocation-workspace-selector.ts'])
digest=hashlib.sha256()
for p in frozen:
    digest.update((p+'\0'+git('show',revs[25]+':'+p).replace('\r\n','\n')+'\0').encode())
assert len(frozen)==38
assert digest.hexdigest()=='d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e'
assert all(p not in trees[26] for p in frozen)
testmoves=[r for r in prs[24]['renames'] if r['from'].startswith('apps/cli/') and r['to'].startswith('packages/daemon/src/') and r['to'].endswith('.test.ts')]
assert len(testmoves)==37
facts={'frozen':frozen,'frozenDigest':digest.hexdigest(),'testMoves':testmoves,'selectedWorkerPatch':git('diff','-M',revs[24],revs[25],'--','apps/cli/src/daemon/daemon-navigation-worker.test.ts','packages/daemon/src/worker/navigation-worker.test.ts')}
facts['hostVersionPatch']=git('show','0f31a619e806dcadd81207de6643b92bd353e716','--','apps/cli/src/daemon-executor.test.ts')
dump('evidence/facts.json',facts)
write('facts.js','window.CITY_FACTS='+js(facts)+';\n')
print(json.dumps({'revisions':len(revs),'paths':len(paths),'sourceBlobs':len(blobcache),'receiptMB':round(total_bytes/1e6,2),'districtCounts':dict(collections.Counter(f['district'] for f in files))}))
