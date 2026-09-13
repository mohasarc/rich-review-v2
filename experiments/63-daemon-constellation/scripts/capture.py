"""Freeze a bounded source-backed ownership graph. Writes only to this experiment."""
from pathlib import Path
import json, re, hashlib, subprocess
HERE=Path(__file__).resolve().parents[1]
ROOT=HERE.parents[1]
HEAD=ROOT/'worktrees/pr-148-head'; BASE=ROOT/'worktrees/pr-148-base'
P='packages/daemon/src/'; C='apps/cli/src/daemon/'
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def git(w,*args): return subprocess.check_output(['git','-C',str(w),*args],text=True).strip()
pins={'base':git(BASE,'rev-parse','HEAD'),'head':git(HEAD,'rev-parse','HEAD')}
assert pins=={'base':'ba53c8e1662fd86d198b95321c90d9c9bef10184','head':'20838f8dbf413e04767543eb2380d0d114da6c60'}
pr=json.loads((ROOT/'inputs/pr-148/pr.json').read_text())
receipts={}
def receipt(path,rev='head'):
 key=rev+':'+path
 if key not in receipts:
  f=(HEAD if rev=='head' else BASE)/path
  receipts[key]={'path':path,'revision':rev,'commit':pins[rev],'sha256':sha(f),'lines':f.read_text().splitlines()}
 return key
receipts['bundle:body']={'path':'inputs/pr-148/pr.json → body','revision':'bundle','commit':pins['head'],'sha256':sha(ROOT/'inputs/pr-148/pr.json'),'lines':pr['body'].splitlines()}
receipts['bundle:commits']={'path':'inputs/pr-148/pr.json → commits','revision':'bundle','commit':pins['head'],'sha256':sha(ROOT/'inputs/pr-148/pr.json'),'lines':[c['sha']+' '+c['subject'] for c in pr['commits']]}
def cite(path,needle=None,rev='head',before=3,after=12):
 key=receipt(path,rev)
 lines=receipts[key]['lines']
 start=0 if needle is None else next(i for i,l in enumerate(lines) if needle in l)
 return {'receipt':key,'start':max(1,start+1-before),'end':min(len(lines),start+1+after)}
# Explicit antecedents: names are not inferred from similarity scores.
MAP={
'accepted-execution-session-contracts':'execution/accepted-execution-session-contracts',
'accepted-execution-session':'execution/accepted-execution-session',
'accepted-request-ledger':'execution/accepted-request-ledger',
'completion-spool':'delivery/completion-spool',
'daemon-activity-projector':'process/activity-projector',
'daemon-client-result-capture':'transport/client-result-capture',
'daemon-clock':'lifecycle/daemon-clock',
'daemon-controller':'process/controller',
'daemon-delivery-session':'delivery/delivery-session',
'daemon-entry':'process-entry',
'daemon-execution-client':'transport/execution-client',
'daemon-lifecycle-client':'transport/lifecycle-client',
'daemon-lifetime':'lifecycle/daemon-lifetime',
'daemon-logger':'diagnostics/logger',
'daemon-navigation-worker-entry':'worker/navigation-worker-entry',
'daemon-navigation-worker-protocol':'worker/worker-protocol',
'daemon-navigation-worker':'worker/navigation-worker',
'daemon-operation-observer':'diagnostics/operation-observer',
'daemon-process-coordinator':'process/process-coordinator',
'daemon-process-launcher':'process/process-launcher',
'daemon-process-termination-observer':'process/process-termination-observer',
'daemon-protocol-validator':'transport/protocol-validator',
'daemon-protocol':'transport/protocol',
'daemon-record-observer':'registry/record-observer',
'daemon-registry':'registry/registry',
'daemon-resource-monitor':'resources/resource-supervisor',
'daemon-result-transfer-receiver':'transport/result-transfer-receiver',
'daemon-runtime-values':'process/runtime-values',
'daemon-startup-coordinator':'registry/startup-coordinator',
'daemon-transport-error':'transport/transport-error',
'daemon-transport':'transport/contracts',
'daemon-wire-codec':'transport/wire-codec',
'daemon-worker-generation-manager':'worker/worker-generation-manager',
'daemon-workspace-identity':'registry/workspace-identity',
'local-daemon-socket-client':'transport/socket-client',
'local-daemon-socket-server':'transport/socket-server',
'local-daemon-transport':'transport/local-transport',
'workspace-request-queue':'execution/request-queue'}
FREE={'daemon-command-dispatcher','invocation-route','invocation-workspace-selector'}
compat=sorted(str(f.relative_to(HEAD)) for f in (HEAD/C).glob('*.ts') if not f.name.endswith('.test.ts') and f.stem not in FREE)
assert len(compat)==38 and set(compat)=={C+k+'.ts' for k in MAP}
h=hashlib.sha256()
for p in compat:
 h.update(p.encode());h.update(b'\0');h.update((HEAD/p).read_text().replace('\r\n','\n').encode());h.update(b'\0')
assert h.hexdigest()=='d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e'
short={
'client/daemon-client':'DaemonClient','client/daemon-client-runtime':'Client runtime','client/daemon-client-contracts':'Host contracts','client/daemon-routing-policy':'Routing guards',
'process/process-coordinator':'Process coordinator','process/process-launcher':'Process launcher','worker/navigation-worker':'Worker host','worker/navigation-worker-entry':'Worker runtime',
'worker/worker-generation-manager':'Worker generations','transport/local-transport':'Local transport','transport/client-result-capture':'Result capture',
'process-entry':'Process entry','worker-entry':'Worker entry','lifecycle/daemon-clock':'Clock','lifecycle/daemon-lifetime':'Lifetime',
'daemon-command-dispatcher':'CLI dispatcher','invocation-workspace-selector':'Argv selector','daemon-executor':'Executor contract / loader',
'execution/accepted-execution-session':'Execution session','delivery/delivery-session':'Delivery session','resources/resource-supervisor':'Resources',
'process/controller':'Controller','registry/startup-coordinator':'Startup','registry/registry':'Registry','index':'Public exports'}
contract={'client/daemon-client-contracts','execution/accepted-execution-session-contracts','transport/contracts','transport/protocol','worker/worker-protocol','process/runtime-values','daemon-command-name','daemon-diagnostics','daemon-execution-failure','daemon-lifecycle-report','index','invocation-route'}
coord={'client/daemon-client','client/daemon-client-runtime','process/process-coordinator','process/controller','registry/startup-coordinator','execution/accepted-execution-session','delivery/delivery-session','worker/worker-generation-manager','daemon-command-dispatcher'}
def kind(s):
 if s in contract: return 'contract'
 if s in coord: return 'compose'
 if 'entry' in s or s in {'process/process-launcher','worker/navigation-worker'}: return 'entry'
 if s.startswith('transport/') or s=='daemon-executor': return 'transfer'
 return 'state'
def label(s): return short.get(s,s.split('/')[-1].removeprefix('daemon-').replace('-',' ').capitalize())
nodes=[]
revmap={v:k for k,v in MAP.items()}
for f in sorted((HEAD/P).rglob('*.ts')):
 if f.name.endswith('.test.ts'): continue
 rel=str(f.relative_to(HEAD/P)).removesuffix('.ts');path=P+rel+'.ts'
 prev=C+revmap[rel]+'.ts' if rel in revmap else path if (BASE/path).exists() else None
 if prev and prev.endswith('daemon-process-coordinator.ts'): prev=C+'workspace-daemon.ts'
 if prev and not (BASE/prev).exists(): prev=None
 node={'id':'p:'+rel,'name':label(rel),'key':rel,'owner':'package','kind':kind(rel),'compat':False,'path':path,'module':rel.rsplit('/',1)[0] if '/' in rel else '(src root)','receipt':receipt(path),'new':not (BASE/path).exists()}
 if rel in revmap: node['counterpart']='c:'+revmap[rel]
 if prev: node['before']={'path':prev,'receipt':receipt(prev,'base')}
 nodes.append(node)
for f in sorted((HEAD/C).glob('*.ts')):
 if f.name.endswith('.test.ts'): continue
 rel=f.stem;canon=MAP.get(rel,rel);path=C+rel+'.ts'
 prev=C+('workspace-daemon' if rel=='daemon-process-coordinator' else rel)+'.ts'
 node={'id':'c:'+rel,'name':label(canon),'key':rel,'owner':'cli','kind':kind(canon),'compat':rel in MAP,'path':path,'module':'src/daemon','receipt':receipt(path),'new':False}
 if rel in MAP:node['counterpart']='p:'+MAP[rel]
 if (BASE/prev).exists():node['before']={'path':prev,'receipt':receipt(prev,'base')}
 nodes.append(node)
lookup={n['id']:n for n in nodes}
edges=[]
def edge(a,b,needle,action,style='call',mirror=True):
 assert a in lookup and b in lookup,(a,b)
 witness=cite(lookup[a]['path'],needle,before=2,after=10)
 edges.append({'id':'e'+str(len(edges)),'source':a,'target':b,'action':action,'style':style,'cite':witness})
 if mirror and 'counterpart' in lookup[a] and 'counterpart' in lookup[b]:
  ca=lookup[a]['counterpart'];cb=lookup[b]['counterpart']
  # The mirror is independently source checked; spellings can differ.
  replacements={'../process-entry.js':'./daemon-entry.js','../worker-entry.js':'./daemon-navigation-worker-entry.js'}
  n=replacements.get(needle,needle)
  if any(n in l for l in receipts[lookup[ca]['receipt']]['lines']): edge(ca,cb,n,action,style,False)
for b,needle,action in [
 ('client/daemon-routing-policy','new DaemonRoutingPolicy','constructs routing guards'),('registry/registry','new DaemonRegistry','constructs registry'),
 ('transport/local-transport','new LocalDaemonTransport','constructs routing and status transports'),('transport/client-result-capture','new DaemonClientResultCapture','supplies package-owned output capture'),
 ('process/process-launcher','new NodeDaemonProcessLauncher','constructs launcher'),('registry/record-observer','new DaemonRecordObserver','constructs record observer'),
 ('registry/startup-coordinator','new DaemonStartupCoordinator','constructs startup coordinator'),('process/controller','new DaemonController','constructs control and status controllers')]:
 edge('p:client/daemon-client-runtime','p:'+b,needle,action)
edge('p:client/daemon-client','p:client/daemon-client-runtime','await import(runtimeModuleUrl)','loads internal runtime at construction','load',False)
for b,needle,action in [('daemon-registry','new DaemonRegistry','constructs CLI registry'),('local-daemon-transport','new LocalDaemonTransport','constructs CLI transport'),('daemon-process-launcher','new NodeDaemonProcessLauncher','constructs CLI launcher'),('daemon-startup-coordinator','new DaemonStartupCoordinator','constructs CLI startup')]:
 edge('c:daemon-command-dispatcher','c:'+b,needle,action,mirror=False)
for b,needle in [('process/process-coordinator','new DaemonProcessCoordinator'),('lifecycle/daemon-clock','new NodeDaemonClock'),('registry/registry','new DaemonRegistry'),('transport/local-transport','new LocalDaemonTransport')]:
 edge('p:process-entry','p:'+b,needle,'constructs '+label(b).lower())
edge('p:process/process-launcher','p:process-entry','../process-entry.js','launches Node at the package process entry','spawn')
edge('p:worker/navigation-worker','p:worker-entry','../worker-entry.js','creates a worker thread at the package entry','spawn',False)
edge('c:daemon-navigation-worker','c:daemon-navigation-worker-entry','new Worker','creates the CLI worker thread','spawn',False)
edge('p:worker-entry','p:worker/navigation-worker-entry','import ','runs the worker implementation','load',False)
edge('p:worker/navigation-worker-entry','p:daemon-executor','await DaemonExecutorModuleLoader.load','loads the host-supplied executor module URL','load',False)
for b,needle,action in [
 ('execution/request-queue','new WorkspaceRequestQueue','constructs the request queue'),('execution/accepted-request-ledger','new AcceptedRequestLedger','constructs the accepted ledger'),
 ('delivery/completion-spool','new DaemonCompletionSpoolStore','constructs the completion spool store'),('worker/navigation-worker','new NodeDaemonNavigationWorker','supplies the default worker factory'),
 ('lifecycle/daemon-lifetime','new DaemonLifetime','constructs lifetime using the daemon clock'),('worker/worker-generation-manager','new DaemonWorkerGenerationManager','constructs the worker manager'),
 ('resources/resource-supervisor','new DaemonResourceSupervisor','constructs resource supervision'),('delivery/delivery-session','new DaemonDeliverySession','constructs the delivery session'),
 ('execution/accepted-execution-session','new AcceptedExecutionSession','constructs the accepted execution session')]:
 edge('p:process/process-coordinator','p:'+b,needle,action)
for b,needle in [('transport/socket-client','new LocalDaemonSocketClient'),('transport/lifecycle-client','new DaemonLifecycleClient'),('transport/execution-client','new DaemonExecutionClient'),('transport/socket-server','new LocalDaemonSocketServer')]:
 edge('p:transport/local-transport','p:'+b,needle,'constructs '+label(b).lower())
edge('p:process/process-coordinator','p:process/activity-projector','DaemonActivityProjector.project','projects the activity snapshot')
edge('p:process/process-coordinator','p:registry/registry','this.options.registry.removeIfProcess','uses registry process-ownership cleanup')
edge('p:lifecycle/daemon-lifetime','p:lifecycle/daemon-clock','this.clock.wallNowMs()','reads the injected daemon wall clock')
# Dependency endpoints are not chronological trace steps. Every edge is source witnessed.
extra=['meta-tests/src/daemon-compatibility-copy.test.ts','packages/daemon/package.json','packages/daemon/src/package-boundary.test.ts','packages/daemon/src/entry-boundary.test.ts','packages/daemon/src/host-contract.test.ts','packages/daemon/src/client/daemon-client-public.test.ts','packages/daemon/src/client/daemon-client.test.ts','packages/daemon/src/worker/navigation-worker.test.ts','packages/daemon/src/lifecycle/daemon-lifetime.test.ts','packages/daemon/src/process/process-coordinator-construction.test.ts','packages/daemon/src/process/process-coordinator-requests.test.ts','packages/daemon/test/integration/built-process-entry.test.ts','apps/cli/src/daemon-executor.test.ts','packages/daemon/vitest.config.ts','eslint.config.mjs','meta-tests/src/lint-rule.test.ts','plans/005/daemon-architecture-functional-spec.md','plans/005/daemon-follow-ups-functional-spec.md']
for p in extra:receipt(p)
for p in ['packages/daemon/package.json','apps/cli/src/daemon/daemon-navigation-worker.test.ts','apps/cli/src/daemon/daemon-entry.test.ts','eslint.config.mjs','meta-tests/src/lint-rule.test.ts']:receipt(p,'base')
patch=(ROOT/'inputs/pr-148/diff.patch').read_text()
(HERE/'evidence/diff.patch').write_text(patch)
renamed=re.findall(r'rename from (apps/cli/src/daemon/[^\n]+\.test\.ts)\nrename to (packages/daemon/src/[^\n]+)',patch)
assert len(renamed)==37
inventory={'pins':pins,'files':len(nodes),'packageFiles':len([n for n in nodes if n['owner']=='package']),'cliFiles':len([n for n in nodes if n['owner']=='cli']),'newPackageFiles':len([n for n in nodes if n['owner']=='package' and n['new']]),'compatibilityFiles':compat,'compatibilityDigest':h.hexdigest(),'movedTests':renamed,'sourceCount':len(receipts),'dependencies':len(edges),'trackedStatusBefore':{k:git(w,'status','--short','--untracked-files=no') for k,w in [('base',BASE),('head',HEAD)]}}
assert len(nodes)==92 and inventory['packageFiles']==51 and inventory['newPackageFiles']==43
(HERE/'evidence/sources.json').write_text(json.dumps(receipts,indent=2))
(HERE/'evidence/inventory.json').write_text(json.dumps(inventory,indent=2))
data={'nodes':nodes,'edges':edges,'receipts':receipts,'inventory':inventory}
(HERE/'data.js').write_text('window.CONSTELLATION = '+json.dumps(data,ensure_ascii=False)+';\n')
print(json.dumps({k:v for k,v in inventory.items() if k not in ['compatibilityFiles','movedTests']},indent=2))
