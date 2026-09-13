// Real source methods; fake worker, clock, filesystem, send and spool ports.
// No server, process or worker thread is launched. No symnav file is written.
import {pathToFileURL, fileURLToPath} from 'node:url';
import {resolve, dirname} from 'node:path';
import {writeFileSync, readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

const out=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const root=resolve(out,'../..');
const field=JSON.parse(readFileSync(resolve(out,'evidence/field.json')));
const imp=async (dir,path)=>import(pathToFileURL(resolve(dir,path)).href);
const deferred=()=>{let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};};
const settle=async()=>{for(let i=0;i<12;i++)await new Promise(r=>setImmediate(r));};

async function record(build,{sampleReject=false,cleanupReject=false}={}) {
  const dir=resolve(root,'worktrees',build==='main'?'main':'stack-head');
  const sha=execFileSync('git',['-C',dir,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
  assert.equal(sha,build==='main'?field.base:field.head);
  assert.equal(execFileSync('git',['-C',dir,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}),'');
  const pkg=build==='main'?'apps/cli/src/daemon/':'packages/daemon/src/';
  const {AcceptedRequestLedger}=await imp(dir,pkg+(build==='main'?'accepted-request-ledger.ts':'execution/accepted-request-ledger.ts'));
  const {WorkspaceRequestQueue}=await imp(dir,pkg+(build==='main'?'workspace-request-queue.ts':'execution/request-queue.ts'));
  let tick=1000; const clock={wallNowMs:()=>tick++,monotonicNowMs:()=>tick++};
  const ledger=new AcceptedRequestLedger(build==='main'?clock.wallNowMs:clock);
  const queue=new WorkspaceRequestQueue(build==='main'?clock.monotonicNowMs:clock);
  const events=[],checkpoints=[],diagnostics=[],started=[];
  const workerGate=deferred(),streamGate=deferred(),sampleGate=deferred(),cleanupGate=deferred();
  let navigationResets=0,samples=0,cleanupAttempted=false,ackReturned=false;
  const event=(boundary,detail,request='A')=>events.push({index:events.length,boundary,detail,request});
  const trace=()=>({accepted(){},turnStarted(){},workerCompleted(){},spooled(){},executionTerminated(){},clientDisconnected(){},reattached(){},deliveryTerminated(){}});
  const observer={start:trace,deliveryTerminated(){}};
  const logger={record(e){diagnostics.push(e);event(e.operation==='resource-sample'?'sample':'cleanup',e.operation+' rejected; recorded');}};
  const lifetime={navigationAccepted(){navigationResets++;},queueBecameIdle(){}};
  const spools=new Map();
  const store={
    async create(id){
      const manifest={transferId:'transfer-'+id,requestId:id,instanceId:'instance',exitCode:0,rawBytes:1,recordCount:1,sha256:'controlled-hash'};
      const spool={completedManifest:undefined,
        async append(){},
        async finish(){event('seal','completion.finish settled',id);spool.completedManifest=manifest;return manifest;},
        async *read(){yield {sequence:0,stream:'stdout',bytes:new Uint8Array([65])};},
        async acknowledge(){cleanupAttempted=true;event('cleanup','cleanup entered',id);await cleanupGate.promise;if(cleanupReject)throw new Error('injected cleanup rejection');event('cleanup','cleanup settled',id);},
        async dispose(){},
      };spools.set(id,spool);return spool;
    },
    async open(id){return spools.get(id);},usage(){return {rawBytes:spools.size};},async cleanupInstance(){},
  };
  const worker={async execute(id){
    started.push(id);event(id==='B'?'next':'worker','worker started',id);
    if(id==='A')await workerGate.promise;
    event('worker','worker result',id);
    return {kind:'result',requestId:id,generation:1,result:{exitCode:0},refresh:{},durations:{freshnessMs:0,navigationMs:0,renderMs:0,outputMs:0},resources:{workerHeapUsedBytes:1,workerHeapLimitBytes:10,peakWorkerHeapUsedBytes:1}};
  }};
  const resources={snapshot:{generation:1,admissionPaused:false},sample:async()=>{},workerHeapReported(){},async sampleAtTurnBoundary(){
    samples++;if(samples===1){event('sample','resource sample entered');await sampleGate.promise;if(sampleReject)throw new Error('injected sample rejection');event('sample','resource sample settled');}
  }};
  const request=id=>({kind:'execute',protocolVersion:build==='main'?4:5,instanceId:'instance',processToken:'token',requestId:id,commandName:'version',request:{argv:['--version'],cwd:'/fixture',telemetryEnabled:false,executionMode:'warm'}});
  const send=async frame=>{if(frame.kind==='accepted')event('accept','accepted frame',frame.requestId);if(frame.kind==='result-end'&&frame.requestId==='A'){event('stream','result-end send entered');await streamGate.promise;event('stream','result-end send settled');}};
  send.onClose=()=>{};
  let accept,acknowledge,dispose;
  if(build==='main'){
    const {WorkspaceDaemon}=await imp(dir,pkg+'workspace-daemon.ts');
    // Constructor bypass supplies ports; methods and internal coordination are original source.
    const h=Object.create(WorkspaceDaemon.prototype);
    Object.assign(h,{options:{instanceId:'instance',processToken:'token',identity:{workspaceRoot:'/fixture'},dependencies:{fs:{exists:async()=>true}}},now:clock.wallNowMs,clock,requestQueue:queue,logger,lifetime,resourceSupervisor:resources,acceptedRequests:ledger,completionSpools:store,workerReady:true,workerGeneration:{id:1,worker,ready:Promise.resolve({kind:'ready'})},operationObserver:observer,acceptances:new Map(),completionDeliveries:new Map(),operationTraces:new Map(),operationTraceExpirations:new Map(),operationTraceConnections:new Map(),resourceInterruptedRequests:new Set(),shutdownStarted:false});
    accept=id=>h.acceptExecution(request(id),send);
    acknowledge=()=>h.handle({...request('A'),kind:'result-ack',transferId:'transfer-A'},send);
    dispose=()=>{};
  }else{
    const {AcceptedExecutionSession}=await imp(dir,pkg+'execution/accepted-execution-session.ts');
    const {DaemonDeliverySession}=await imp(dir,pkg+'delivery/delivery-session.ts');
    const delivery=new DaemonDeliverySession({coordinates:{instanceId:'instance',processToken:'token'},journal:ledger,spoolStore:store,observer,diagnostics:logger,clock,policy:{diagnostics:{disconnectedTraceRetentionMs:1000,maximumDisconnectedTraces:10},shutdown:{resourceDrainAcknowledgementGraceMs:0,resourceDrainAcknowledgementPollIntervalMs:1},delivery:{}}});
    const session=new AcceptedExecutionSession({ledger,queue,worker,delivery,resourceSupervisor:resources,processLifecycle:{shutdownSnapshot:()=>({started:false}),workspaceExists:async()=>true,workspaceDeletedAfterDelivery:async()=>{}},lifetime,diagnostics:logger,clock});
    accept=async id=>{const r=session.accept(request(id));await delivery.attach(r.acceptance,send);return r;};
    acknowledge=()=>delivery.acknowledge({...request('A'),kind:'result-ack',transferId:'transfer-A'});
    dispose=()=>delivery.completeRetainedTraces();
  }
  const snap=(id,title,boundary)=>checkpoints.push({id,title,boundary,eventCount:events.length,started:[...started],aState:ledger.status('A').state,bState:ledger.entryFor('B')?ledger.status('B').state:'unseen',active:queue.snapshot.active?.requestId??null,queued:queue.snapshot.queued,unacknowledged:ledger.hasUnacknowledgedCompletions,ackReturned,cleanupAttempted,navigationResets,diagnostics:diagnostics.map(x=>x.operation)});
  await accept('A');
  ledger.subscribe('A',e=>{if(e.state.state==='completed')event('terminal','ledger completed');});
  await accept('B');
  const entry=ledger.entryFor('A');await accept('A');
  assert.equal(ledger.entryFor('A'),entry);assert.equal(navigationResets,2);
  await settle();snap('worker-held','A is running; B and the duplicate do not start','worker');
  assert.deepEqual(started,['A']);
  workerGate.resolve();await settle();snap('stream-held','A is completed; the stream still holds the FIFO','stream');
  assert.equal(ledger.status('A').state,'completed');assert.deepEqual(started,['A']);
  streamGate.resolve();await settle();snap('sample-held','The stream finished; sampling still holds B','sample');
  assert.deepEqual(started,['A']);assert.equal(samples,1);
  sampleGate.resolve();await settle();snap('next-started',sampleReject?'Sampling failed; B started after the diagnostic':'Sampling settled; B started without an ACK','next');
  assert.deepEqual(started,['A','B']);assert.equal(ledger.hasUnacknowledgedCompletions,true);
  const ack=acknowledge().then(x=>{assert.equal(x.kind,'result-acknowledged');ackReturned=true;event('ack','result-acknowledged returned');return x;});
  await settle();snap('cleanup-held','The ACK handler is waiting for its cleanup attempt','cleanup');
  assert.equal(ackReturned,false);assert.equal(cleanupAttempted,true);
  cleanupGate.resolve();await ack;await settle();snap('ack-returned',cleanupReject?'Cleanup failed; A was still acknowledged':'Cleanup settled; A was acknowledged','ack');
  // B remains unacknowledged, so use per-request status in the original sets.
  assert.equal(ledger.acknowledged.has('A'),true);assert.equal(ledger.acknowledged.has('B'),false);
  if(cleanupReject)assert(diagnostics.some(x=>x.operation==='completion-cleanup'));
  if(sampleReject)assert(diagnostics.some(x=>x.operation==='resource-sample'));
  await queue.drain();dispose();
  return {build,sha,scenario:cleanupReject?'cleanup-reject':sampleReject?'sample-reject':'normal',checkpoints,events,diagnostics,assertions:'passed'};
}
const runs=[];
for(const build of ['main','tip'])for(const scenario of [{},{sampleReject:true},{cleanupReject:true}])runs.push(await record(build,scenario));
const result={apparatus:'Real source coordination, ledger and queue on main and tip; tip also uses the real delivery session. Main WorkspaceDaemon is instantiated by prototype with injected ports. Fake worker, spool, clock, filesystem and sends; held promises control order. No disk, socket, worker thread, production latency or full daemon parity is measured.',runs};
writeFileSync(resolve(out,'evidence/recordings.json'),JSON.stringify(result,null,2));
writeFileSync(resolve(out,'recordings.js'),'window.RECORDINGS='+JSON.stringify(result)+';\n');
console.log(JSON.stringify({runs:runs.length,checkpoints:runs.reduce((s,r)=>s+r.checkpoints.length,0),assertions:'passed'}));
