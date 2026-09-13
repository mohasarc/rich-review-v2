from pathlib import Path
import json, subprocess, hashlib, difflib, re

OUT=Path(__file__).resolve().parents[1]
ROOT=OUT.parents[1]
HEAD=ROOT/'worktrees/pr-148-head'
BASE=ROOT/'worktrees/pr-148-base'
PINS={'base':'ba53c8e1662fd86d198b95321c90d9c9bef10184','head':'20838f8dbf413e04767543eb2380d0d114da6c60'}
AST=json.loads((OUT/'evidence/ast.json').read_text())
def git(*args): return subprocess.check_output(['git','-C',str(HEAD),*args],text=True)
for side,folder in [('base',BASE),('head',HEAD)]:
    assert subprocess.check_output(['git','-C',str(folder),'rev-parse','HEAD'],text=True).strip()==PINS[side]

mapping={
 'client/daemon-client-contracts.ts':None, 'client/daemon-client.ts':None,
 'client/daemon-client-runtime.ts':None, 'client/daemon-routing-policy.ts':None,
 'delivery/completion-spool.ts':'completion-spool.ts', 'delivery/delivery-session.ts':'daemon-delivery-session.ts',
 'diagnostics/logger.ts':'daemon-logger.ts','diagnostics/operation-observer.ts':'daemon-operation-observer.ts',
 'execution/accepted-execution-session-contracts.ts':'accepted-execution-session-contracts.ts',
 'execution/accepted-execution-session.ts':'accepted-execution-session.ts',
 'execution/accepted-request-ledger.ts':'accepted-request-ledger.ts','execution/request-queue.ts':'workspace-request-queue.ts',
 'lifecycle/daemon-clock.ts':'daemon-clock.ts','lifecycle/daemon-lifetime.ts':'daemon-lifetime.ts',
 'process/activity-projector.ts':'daemon-activity-projector.ts','process/controller.ts':'daemon-controller.ts',
 'process/process-coordinator.ts':'daemon-process-coordinator.ts','process/process-launcher.ts':'daemon-process-launcher.ts',
 'process/process-termination-observer.ts':'daemon-process-termination-observer.ts','process/runtime-values.ts':'daemon-runtime-values.ts',
 'registry/record-observer.ts':'daemon-record-observer.ts','registry/registry.ts':'daemon-registry.ts',
 'registry/startup-coordinator.ts':'daemon-startup-coordinator.ts','registry/workspace-identity.ts':'daemon-workspace-identity.ts',
 'resources/resource-supervisor.ts':'daemon-resource-monitor.ts',
 'transport/client-result-capture.ts':'daemon-client-result-capture.ts','transport/contracts.ts':'daemon-transport.ts',
 'transport/execution-client.ts':'daemon-execution-client.ts','transport/lifecycle-client.ts':'daemon-lifecycle-client.ts',
 'transport/local-transport.ts':'local-daemon-transport.ts','transport/protocol-validator.ts':'daemon-protocol-validator.ts',
 'transport/protocol.ts':'daemon-protocol.ts','transport/result-transfer-receiver.ts':'daemon-result-transfer-receiver.ts',
 'transport/socket-client.ts':'local-daemon-socket-client.ts','transport/socket-server.ts':'local-daemon-socket-server.ts',
 'transport/transport-error.ts':'daemon-transport-error.ts','transport/wire-codec.ts':'daemon-wire-codec.ts',
 'worker/navigation-worker-entry.ts':'daemon-navigation-worker-entry.ts','worker/navigation-worker.ts':'daemon-navigation-worker.ts',
 'worker/worker-generation-manager.ts':'daemon-worker-generation-manager.ts','worker/worker-protocol.ts':'daemon-navigation-worker-protocol.ts',
 'process-entry.ts':'daemon-entry.ts','worker-entry.ts':None,
}
frozen=sorted('apps/cli/src/daemon/'+p.name for p in (HEAD/'apps/cli/src/daemon').glob('*.ts') if not p.name.endswith('.test.ts') and p.name not in {'daemon-command-dispatcher.ts','invocation-route.ts','invocation-workspace-selector.ts'})
assert sorted('apps/cli/src/daemon/'+v for v in mapping.values() if v)==frozen
digest=hashlib.sha256()
for p in frozen: digest.update(p.encode()+b'\0'+(HEAD/p).read_text().encode()+b'\0')
assert digest.hexdigest()=='d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e'
sources={}
def capture(side,p):
    if p is None:return None
    key=side+':'+p
    if key not in sources:
        folder=HEAD if side=='head' else BASE
        text=(folder/p).read_text()
        sources[key]={'path':p,'side':side,'sha':PINS[side], 'hash':hashlib.sha256((folder/p).read_bytes()).hexdigest(),'text':text}
    return key
def specimen(side,p):
    if p is None:return None
    a=AST[side]['records'][p]
    return {'source':capture(side,p),'path':p,'lines':len(sources[side+':'+p]['text'].splitlines()),'body':a['body'],'active':p in AST[side]['reachable']}
def compare(a,b):
    if not a or not b:return {'equal':False,'matches':[],'matched':0,'diff':''}
    x=[v['text'] for v in a['body']];y=[v['text'] for v in b['body']]
    blocks=difflib.SequenceMatcher(None,x,y,autojunk=False).get_matching_blocks()
    diff=''.join(difflib.unified_diff(sources[a['source']]['text'].splitlines(True),sources[b['source']]['text'].splitlines(True),fromfile=a['source'],tofile=b['source']))
    return {'equal':x==y,'matches':[list(v) for v in blocks if v.size], 'matched':sum(v.size for v in blocks),'diff':diff}

units=[]
for target,origin in mapping.items():
    group=target.split('/')[0] if '/' in target else 'entries'
    old='apps/cli/src/daemon/'+origin if origin else None
    base=old.replace('daemon-process-coordinator.ts','workspace-daemon.ts') if old else None
    new='packages/daemon/src/'+target
    u={'id':target.removesuffix('.ts').replace('/','--'),'name':Path(target).stem,'group':group,'kind':'production','base':specimen('base',base),'cli':specimen('head',old),'pkg':specimen('head',new)}
    u['copy']=compare(u['cli'],u['pkg']);u['stabilization']=compare(u['base'],u['cli'])
    u['tests']=[capture('head',p) for p,r in AST['head']['records'].items() if p.endswith('.test.ts') and any(e['target']==new for e in r['edges'])]
    units.append(u)
new_prod=[str(p.relative_to(HEAD)) for p in (HEAD/'packages/daemon/src').rglob('*.ts') if not p.name.endswith('.test.ts') and not (BASE/p.relative_to(HEAD)).exists()]
assert sorted(new_prod)==sorted(u['pkg']['path'] for u in units)
moves=[]
for line in git('diff','--name-status','-M',PINS['base'],PINS['head']).splitlines():
    v=line.split('\t')
    if len(v)==3 and v[0].startswith('R') and v[1].startswith('apps/cli/src/daemon/') and v[2].startswith('packages/daemon/src/') and v[2].endswith('.test.ts'):
        target=v[2].removeprefix('packages/daemon/src/')
        u={'id':'test--'+target.removesuffix('.test.ts').replace('/','--'),'name':Path(target).stem.replace('.test',''),'group':target.split('/')[0], 'kind':'test','base':specimen('base',v[1]),'cli':None,'pkg':specimen('head',v[2]),'renameSimilarity':int(v[0][1:]),'tests':[]}
        assert not (HEAD/v[1]).exists()
        u['copy']=compare(u['base'],u['pkg']);u['stabilization']=compare(None,None)
        moves.append(u)
assert len(moves)==37
# Freeze additional sources used by authored, line-numbered receipts.
extras=['apps/cli/src/cli.ts','apps/cli/src/daemon/daemon-command-dispatcher.ts','apps/cli/src/daemon-executor.test.ts',
 'meta-tests/src/daemon-compatibility-copy.test.ts','meta-tests/src/daemon-package.test.ts','meta-tests/src/lint-rule.test.ts',
 'packages/daemon/src/index.ts','packages/daemon/src/host-contract.test.ts','packages/daemon/src/entry-boundary.test.ts','packages/daemon/src/package-boundary.test.ts',
 'packages/daemon/src/client/daemon-client-public.test.ts','packages/daemon/src/client/daemon-client-control.test.ts','packages/daemon/src/client/daemon-client.test.ts',
 'packages/daemon/src/client/daemon-routing-policy.test.ts','packages/daemon/test/integration/built-entry-artifacts.test.ts',
 'packages/daemon/test/integration/built-process-entry.test.ts','packages/daemon/test/integration/built-process-launcher.test.ts',
 'packages/daemon/src/process/process-coordinator-construction.test.ts','packages/daemon/package.json','packages/daemon/vitest.config.ts',
 'plans/005/daemon-architecture-functional-spec.md','plans/005/daemon-follow-ups-functional-spec.md','eslint.config.mjs']
for p in extras:capture('head',p)
for p in ['apps/cli/src/daemon/daemon-entry.test.ts','meta-tests/src/lint-rule.test.ts','packages/daemon/package.json','eslint.config.mjs']:capture('base',p)
pr=json.loads((ROOT/'inputs/pr-148/pr.json').read_text())
(OUT/'evidence/pr.json').write_bytes((ROOT/'inputs/pr-148/pr.json').read_bytes())
sources['bundle:pr']={'path':'inputs/pr-148/pr.json → body','side':'bundle','sha':PINS['head'],'hash':hashlib.sha256((ROOT/'inputs/pr-148/pr.json').read_bytes()).hexdigest(),'text':pr['body']+'\n\nCOMMIT SUBJECTS\n'+'\n'.join(c['sha']+' '+c['subject'] for c in pr['commits'])}
patch=(ROOT/'inputs/pr-148/diff.patch').read_text()
(OUT/'evidence/diff.patch').write_text(patch)
counts={'files':len(re.findall(r'^diff --git ',patch,re.M)), 'added':len(re.findall(r'^\+(?!\+\+)',patch,re.M)), 'deleted':len(re.findall(r'^-(?!--)',patch,re.M)), 'productionAdded':len(units),'copies':38,'movedTests':len(moves),'bodyEqual':sum(u['copy']['equal'] for u in units),'headPackageLines':sum(u['pkg']['lines'] for u in units),'activeValueReachableCopies':sum(bool(u['cli'] and u['cli']['active']) for u in units)}
assert (counts['files'],counts['added'],counts['deleted'])==(153,14624,815)
data={'pins':PINS,'counts':counts,'frozenDigest':digest.hexdigest(),'units':units,'moves':moves,'sources':sources,'graph':{s:{'reachable':AST[s]['reachable'],'predecessor':AST[s]['predecessor']} for s in ['base','head']}}
(OUT/'data.js').write_text('window.LIGHT_TABLE_DATA = '+json.dumps(data,ensure_ascii=False)+';\n')
(OUT/'evidence/inventory.json').write_text(json.dumps({'pins':PINS,'counts':counts,'frozen':frozen,'digest':digest.hexdigest(),'production':[{'id':u['id'],'base':u['base']['path'] if u['base'] else None,'cli':u['cli']['path'] if u['cli'] else None,'package':u['pkg']['path'],'bodyEqual':u['copy']['equal'],'directTestImports':u['tests']} for u in units], 'moves':[{'from':u['base']['path'],'to':u['pkg']['path'],'gitSimilarity':u['renameSimilarity']} for u in moves]},indent=2))
survey=[]
for p in sorted((ROOT/'experiments').glob('*/README.md')):
    n=int(p.parent.name[:2])
    if n in [4,23,36,37,53] or 60<=n<=76:
        survey.append({'experiment':p.parent.name,'read':'full README' if n in [4,23,36,37,53] else 'representation/shape declarations','declarations':[l for l in p.read_text().splitlines() if any(v in l for v in ['Representations used:', 'Shape:', 'Opening style:'])]})
(OUT/'evidence/novelty-survey.json').write_text(json.dumps(survey,indent=2))
print(json.dumps(counts,indent=2))
print('Body differences beyond imports:',[u['id'] for u in units if u['cli'] and not u['copy']['equal']])
print('Not value-reachable in traced CLI graph:',[u['id'] for u in units if u['cli'] and not u['cli']['active']])
