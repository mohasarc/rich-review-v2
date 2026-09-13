// Run with the prepared worktree's tsx loader; never edits symnav.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../..');
const head = path.join(repo, 'worktrees/stack-head');
const base = path.join(repo, 'worktrees/main');
const imp = (root, file) => import(new URL(`file://${root}/${file}`));
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((a, b) => { resolve = a; reject = b; });
  return { promise, resolve, reject };
};
const tick = () => new Promise(resolve => setImmediate(resolve));
const record = { capturedAt: new Date().toISOString(), kind: 'Real source modules with controlled collaborators; no full CLI or socket run', scenarios: {} };
const file = (name, rev) => ({ relative: name, absolute: `/lesson/${name}`, metadata: { changeToken: rev, size: 1, modifiedAtMs: 1, fileIdentity: name } });
const snapshot = files => ({ root: '/lesson', files });

// The same selected snapshot, through both source cache implementations.
record.scenarios.source = {};
for (const [label, root, p] of [
  ['main', base, 'packages/backend-typescript/src/typescript-backend/workspace-source-cache.ts'],
  ['tip', head, 'packages/core/src/workspace/workspace-source-cache.ts']
]) {
  const { WorkspaceSourceCache } = await imp(root, p);
  let reads = 0;
  const cache = new WorkspaceSourceCache({ readFile: async name => { reads++; return name; } });
  cache.refresh(snapshot([file('a.ts','1'),file('b.ts','1')]));
  await cache.readFile('/lesson/a.ts'); await cache.readFile('/lesson/b.ts');
  const steps = [{ at: 'both files read', reads }];
  cache.refresh(snapshot([file('a.ts','1')]));
  await cache.readFile('/lesson/a.ts'); steps.push({ at: 'select a; read a', reads });
  await cache.readFile('/lesson/b.ts'); steps.push({ at: 'read omitted b', reads });
  await cache.readFile('/lesson/b.ts'); steps.push({ at: 'read b again, still outside snapshot', reads });
  record.scenarios.source[label] = steps;
}

// Portable state uses a deliberately tiny language adapter, not ts-morph.
const { RevisionedBackendState } = await imp(head, 'packages/core/src/backend/revisioned-backend-state.ts');
class TinyState extends RevisionedBackendState {
  events = []; malformed = false;
  constructor() { super({}); }
  createPreparation(request) {
    return {
      prepare: async () => { this.events.push('prepare'); return this.malformed ? [] : request.changes.map(({file}) => ({file, entries:{ entries:[] },details:file.metadata.changeToken})); },
      commit: async () => { this.events.push('commit'); },
      rollback: async () => { this.events.push('rollback'); }
    };
  }
  versions() { return this.preparedFiles().map(p => `${p.file.relative}@${p.details}`); }
}
const state = new TinyState();
await state.refresh([file('a.ts','1'),file('b.ts','1')]);
const publication = [{at:'initial workspace',files:state.versions(),events:state.events.splice(0)}];
await state.refresh([file('a.ts','2')],'selection');
publication.push({at:'select a revision 2',files:state.versions(),events:state.events.splice(0)});
state.malformed = true;
try { await state.refresh([file('a.ts','3')],'selection'); } catch (e) {
  publication.push({at:'adapter omits changed a',files:state.versions(),events:state.events.splice(0),error:e.message});
}
record.scenarios.publication = publication;

const { ProjectGraph } = await imp(head,'packages/core/src/workspace/project-graph.ts');
class TinyGraph extends ProjectGraph {
  constructor() { super({existsSync:()=>true,isDirectorySync:()=>false,readFileSync:()=> 'config'}); }
  initialConfigurationPaths() { return ['/lesson/A.json','/lesson/B.json']; }
  async parseConfiguration({path,content}) { return {configuration:path,referencedConfigurationPaths:[],inputs:[{path,content}]}; }
  filesForConfiguration(_config,snapshot) { return snapshot.files; }
  async prepareProjects({configurations}) { return {configuredProjects:configurations.map(c=>({name:c.configuration,releaseTransientResources(){}})),inferredProject:{name:'inferred',releaseTransientResources(){}},inputs:[]}; }
  refresh(snapshot) { return this.refreshProjectGraph(snapshot); }
  owners(name) { return {all:this.projectsFor(name).map(p=>p.name),primary:this.primaryProjectFor(name)?.name}; }
}
const graph = new TinyGraph(); await graph.refresh(snapshot([file('a.ts','1')]));
record.scenarios.owners=graph.owners('a.ts');

// Hold project release open at the existing backend injection seam.
record.scenarios.release = {};
for (const [label,root] of [['main',base],['tip',head]]) {
  const { TypeScriptBackend } = await imp(root,'packages/backend-typescript/src/typescript-backend/typescript-backend.ts');
  const held = deferred(); let settled = false;
  const backend = new TypeScriptBackend({}, {}, {releaseTransientResources: () => held.promise});
  const done = backend.releaseTransientResources().then(() => {settled = true;});
  await tick();
  const steps=[{at:'project release pending',backendRelease:settled?'fulfilled':'pending'}];
  held.resolve(); await done; await tick();
  steps.push({at:'project release fulfilled',backendRelease:settled?'fulfilled':'pending'});
  record.scenarios.release[label]=steps;
}

const { TurnScopedCacheScope } = await imp(head,'packages/core/src/backend/turn-scoped-cache-scope.ts');
const scope = new TurnScopedCacheScope(), cache = scope.createCache();
let factories=0;
const first=cache.getOrCreate('same',()=>{factories++;return undefined;});
cache.getOrCreate('same',()=>{factories++;return 'replacement';});
const cacheSteps=[{at:'undefined cached twice',factories}];
scope.beginTurn();cache.getOrCreate('same',()=>{factories++;return undefined;});
cacheSteps.push({at:'new turn; same handle',factories});
record.scenarios.cache=cacheSteps;

const { DaemonPolicy,DaemonPolicyCodec } = await imp(head,'packages/daemon/src/daemon-policy.ts');
const policy=DaemonPolicy.fromSystemMemory({totalBytes:8*1024**3});
record.scenarios.policy={values:policy.values,roundTripEqual:JSON.stringify(policy.values)===JSON.stringify(DaemonPolicyCodec.deserialize(DaemonPolicyCodec.serialize(policy)).values)};
const { DaemonAdmissionPolicy } = await imp(head,'packages/daemon/src/daemon-admission.ts');
const admission = new DaemonAdmissionPolicy();
const common={request:{},authenticated:true,workerReady:true,resourceAdmissionPaused:false,queueState:'accepting',compatibility:'matching'};
record.scenarios.admission=[
  {at:'all conditions pass',result:admission.decide(common)},
  {at:'unauthenticated and not ready',result:admission.decide({...common,authenticated:false,workerReady:false})},
  {at:'not ready and under pressure',result:admission.decide({...common,workerReady:false,resourceAdmissionPaused:true})},
  {at:'ready, pressure and queue draining',result:admission.decide({...common,resourceAdmissionPaused:true,queueState:'draining'})}
];

const { DaemonWireCodec } = await imp(head,'packages/daemon/src/transport/wire-codec.ts');
const codec=new DaemonWireCodec({...policy.values.transport,...policy.values.output});
const frame=codec.encodeControl({kind:'ping'}), decoder=codec.controlDecoder();
record.scenarios.wire=[{at:'first 2 prefix bytes',emitted:decoder.append(frame.slice(0,2)).length},{at:'remaining prefix plus partial JSON',emitted:decoder.append(frame.slice(2,8)).length},{at:'remaining bytes',emitted:decoder.append(frame.slice(8)).length}];
decoder.assertComplete();

const { DaemonResultTransferReceiver } = await imp(head,'packages/daemon/src/transport/result-transfer-receiver.ts');
const appendGate=deferred();
const receiver=new DaemonResultTransferReceiver('Q42',{append:()=>appendGate.promise,dispose:async()=>{}});
const manifest={instanceId:'instance',requestId:'Q42',transferId:'T1',recordCount:2,rawBytes:2,sha256:'controlled-manifest',exitCode:0};
receiver.acceptManifest({kind:'result-manifest',instanceId:'instance',requestId:'Q42',manifest});
const pendingAppend=receiver.acceptChunk({requestId:'Q42',transferId:'T1',offset:0,sequence:0,stream:'stdout',bytes:new Uint8Array([65])});
record.scenarios.receiver=[{at:'record 0 append held',nextOffset:receiver.nextOffset}];
appendGate.resolve();await pendingAppend;
record.scenarios.receiver.push({at:'record 0 append fulfilled',nextOffset:receiver.nextOffset});
receiver.beginConnection();receiver.acceptManifest({kind:'result-manifest',instanceId:'instance',requestId:'Q42',manifest});
record.scenarios.receiver.push({at:'fresh connection, same receiver and manifest',nextOffset:receiver.nextOffset});

const { AcceptedRequestLedger }=await imp(head,'packages/daemon/src/execution/accepted-request-ledger.ts');
let clockReads=0;
const ledger=new AcceptedRequestLedger({wallNowMs:()=>{clockReads++;return 100;}});
const request={argv:['refs','a.ts'],cwd:'/lesson',telemetryEnabled:false,executionMode:'warm'};
const entry=ledger.accept('Q42','refs',request), duplicate=ledger.accept('Q42','refs',{...request});
record.scenarios.ledger={sameEntry:entry===duplicate,size:ledger.size,clockReads,acceptedAt:duplicate.acceptedAt,queuePosition:duplicate.queuePosition,changedCommand:ledger.compatibilityFor('Q42','def',request)};

// Real queue + accepted-execution session, with two independent held ports.
const { WorkspaceRequestQueue }=await imp(head,'packages/daemon/src/execution/request-queue.ts');
const { AcceptedExecutionSession }=await imp(head,'packages/daemon/src/execution/accepted-execution-session.ts');
const streamGate=deferred(), sampleGate=deferred(), queueEvents=[];
const fifo=new WorkspaceRequestQueue({monotonicNowMs:()=>5});
const sessionLedger=new AcceptedRequestLedger({wallNowMs:()=>100});
let sampleCalls=0,deliveryReads=0;
const trace={turnStarted(){},workerCompleted(){},executionTerminated(){}};
const session=new AcceptedExecutionSession({
  ledger:sessionLedger,queue:fifo,clock:{wallNowMs:()=>100,monotonicNowMs:()=>5},
  lifetime:{navigationAccepted(){},queueBecameIdle(){}},
  diagnostics:{record:e=>queueEvents.push('diagnostic:'+e.operation)},
  resourceSupervisor:{snapshot:{generation:1},workerHeapReported(){},sampleAtTurnBoundary:async()=>{sampleCalls++;queueEvents.push('sample:'+sampleCalls);if(sampleCalls===1)await sampleGate.promise;}},
  worker:{execute:async(id)=>{queueEvents.push('worker:'+id);return {generation:1,result:{exitCode:0},resources:{workerHeapUsedBytes:1,workerHeapLimitBytes:10,peakWorkerHeapUsedBytes:1},durations:{freshnessMs:0,navigationMs:0,renderMs:0,outputMs:0}};}},
  delivery:{beginAcceptedTrace:()=>trace,createCompletion:async()=>({finish:async()=>{},dispose:async()=>{}}),trackedCompletion:id=>{deliveryReads++;return id==='Q42'?streamGate.promise:undefined;}},
  processLifecycle:{workspaceExists:async()=>true,workspaceDeletedAfterDelivery:async()=>{},shutdownSnapshot:()=>({started:false})}
});
session.accept({requestId:'Q42',commandName:'refs',request});
session.accept({requestId:'Q43',commandName:'refs',request});
await tick();
const queueRecord=at=>({at,events:[...queueEvents],active:fifo.snapshot.active?.requestId??'none',queued:fifo.snapshot.queued,deliveryReads});
record.scenarios.queue=[queueRecord('attached stream held')];
streamGate.resolve();await tick();
record.scenarios.queue.push(queueRecord('stream settled; resource sample held'));
sampleGate.resolve();await tick();
await session.drain();
record.scenarios.queue.push(queueRecord('sample settled; second request runs without any ACK port'));

const { DaemonDeliverySession }=await imp(head,'packages/daemon/src/delivery/delivery-session.ts');
ledger.markRunning('Q42',110);ledger.complete('Q42','Q42',120);
const events=[];
const delivery=new DaemonDeliverySession({coordinates:{instanceId:'instance',processToken:'token'},journal:ledger,spoolStore:{open:async()=>({completedManifest:manifest,acknowledge:async()=>{events.push('physical cleanup attempted');throw new Error('controlled cleanup failure');}})},observer:{deliveryTerminated:()=>events.push('delivery trace terminated')},diagnostics:{record:event=>events.push(event.operation)},clock:{wallNowMs:()=>100},policy:policy.values});
const ack=await delivery.acknowledge({requestId:'Q42',transferId:'T1'});
record.scenarios.delivery={events,logicalAcknowledgement:ledger.isAcknowledged('Q42'),response:ack.kind};

const { InvocationWorkspaceSelector }=await imp(head,'apps/cli/src/invocation-workspace-selector.ts');
const selector=new InvocationWorkspaceSelector();
record.scenarios.host=[['refs','def'],['--help'],['daemon','status']].map(argv=>({argv,selected:selector.select(argv,'/lesson')}));
await writeFile(path.join(here,'evidence/recordings.json'),JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify(record,null,2));
