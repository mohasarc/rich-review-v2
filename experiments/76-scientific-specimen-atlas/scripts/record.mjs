import {readFile, writeFile, mkdtemp, rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createServer} from 'node:net';
import {tmpdir} from 'node:os';
import {resolve, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';

const out = fileURLToPath(new URL('../', import.meta.url));
const root = resolve(out, '../..');
const sources = JSON.parse(await readFile(join(out,'evidence/sources.json')));
for (const [name,pin] of Object.entries(sources.pins)) {
  assert.equal(execFileSync('git',['-C',join(root,'worktrees',name),'rev-parse','HEAD'],{encoding:'utf8'}).trim(),pin);
}
const imp = (subject,path) => import(pathToFileURL(join(root,'worktrees',subject,path)));
const tick = async () => {for(let i=0;i<12;i++) await Promise.resolve();};
const identity = {file:'src/app.ts',segments:[{name:'target'}]};
const snapshot = {root:'/repo',files:[]};
const records = {recordedAt:new Date().toISOString(),pins:sources.pins,limits:'Actual compiled methods; injected empty workspace, deferred project cleanup, and scripted local sockets. No full daemon or end-to-end output parity claim.',cache:[],delivery:[],outer:[]};

for (const build of ['base','head']) {
  const subject=`pr-127-${build}`;
  const {TypeScriptBackend} = await imp(subject,'packages/backend-typescript/dist/typescript-backend/typescript-backend.js');
  const {InMemoryFileSystem} = await imp(subject,'packages/core/dist/index.js');
  for (const condition of ['turn','failed-refresh','release-ok','release-error','old-promise']) {
    let refreshFails=false, searches=0, settleRelease, rejectRelease, settleOld;
    const heldRelease = new Promise((yes,no)=>{settleRelease=yes;rejectRelease=no});
    void heldRelease.catch(()=>{});
    const heldOld = new Promise(yes=>{settleOld=yes});
    let ensureCount=0;
    const state={refresh:async()=>{if(refreshFails) throw new Error('injected refresh');return {added:0,changed:0,removed:0,unchanged:0}},ensureFiles:()=>condition==='old-promise' && ++ensureCount===1 ? heldOld : Promise.resolve(),locate:()=>[]};
    const graph={releaseTransientResources:()=>heldRelease};
    const backend=new TypeScriptBackend(new InMemoryFileSystem({}),state,graph,{definitionSearch(){searches++}});
    await backend.refresh({snapshot,coverage:'selection'});
    const service=backend.semanticQueries;
    const handle=service.definitionsByIdentity;
    const first=service.findDefinitions(identity);
    const repeat=service.findDefinitions(identity);
    const steps=[{label:'Prepared',sameHandle:true,sameEntry:true,searches,release:'not called',oldCaller:condition==='old-promise'?'pending':'held'}];
    assert.equal(first,repeat);
    let boundary='not applicable';
    if(condition==='turn' || condition==='old-promise') await backend.refresh({snapshot,coverage:'selection'});
    if(condition==='failed-refresh') {refreshFails=true;await assert.rejects(backend.refresh({snapshot,coverage:'selection'}));}
    if(condition.startsWith('release')) {
      const release=backend.releaseTransientResources();
      boundary='pending';
      release.then(()=>{boundary='resolved'},()=>{boundary='rejected'});
      await tick();
      const currentHandle=service.definitionsByIdentity;
      const entries=build==='base'?currentHandle:currentHandle.values;
      assert.equal(entries.size,0);
      steps.push({label:'Cleanup held',sameHandle:handle===service.definitionsByIdentity,sameEntry:false,entryState:'empty',searches,release:boundary,oldCaller:'held'});
      const pending=service.findDefinitions(identity);
      assert.notEqual(first,pending);
      steps.push({label:'Query during cleanup',sameHandle:handle===service.definitionsByIdentity,sameEntry:first===pending,searches,release:boundary,oldCaller:'held'});
      if(condition==='release-error') rejectRelease(new Error('injected cleanup')); else settleRelease();
      await tick();
      steps.push({label:'Cleanup settled',sameHandle:handle===service.definitionsByIdentity,sameEntry:false,searches,release:boundary,oldCaller:'held'});
      assert.equal(boundary,build==='base'?'resolved':condition==='release-error'?'rejected':'resolved');
    } else {
      const after=service.findDefinitions(identity);
      steps.push({label:condition==='failed-refresh'?'Refresh rejected':'New turn',sameHandle:handle===service.definitionsByIdentity,sameEntry:first===after,searches,release:boundary,oldCaller:condition==='old-promise'?'pending':'held'});
      assert.equal(first===after,condition==='failed-refresh');
      if(condition==='old-promise') {
        settleOld(); await first;
        assert.equal(service.findDefinitions(identity),after);
        steps.push({label:'Old promise settled',sameHandle:true,sameEntry:false,searches,release:boundary,oldCaller:'resolved; current entry unchanged'});
      }
    }
    records.cache.push({build,condition,steps});
  }
}

const {TurnScopedCacheScope}=await imp('pr-127-head','packages/core/dist/backend/turn-scoped-cache-scope.js');
const scope=new TurnScopedCacheScope();const values=scope.createCache();let undefinedCalls=0,throwCalls=0,rejectionCalls=0;
for(let i=0;i<2;i++) values.getOrCreate('undefined',()=>{undefinedCalls++;return undefined});
for(let i=0;i<2;i++) try{values.getOrCreate('throw',()=>{throwCalls++;throw new Error('injected')})}catch{}
const rejection=Promise.reject(new Error('injected'));void rejection.catch(()=>{});
const rejected=values.getOrCreate('rejection',()=>{rejectionCalls++;return rejection});
await assert.rejects(rejected);assert.equal(values.getOrCreate('rejection',()=>{rejectionCalls++;return Promise.resolve()}),rejected);
records.factory={undefinedCalls,throwCalls,rejectionCalls};assert.deepEqual(records.factory,{undefinedCalls:1,throwCalls:2,rejectionCalls:1});

for (const build of ['base','head']) {
  const subject=`pr-131-${build}`;
  const {LocalDaemonTransport,DaemonTransportError}=await imp(subject,'apps/cli/dist/daemon/local-daemon-transport.js');
  const {DaemonPolicy}=await imp(subject,'packages/daemon/dist/daemon-policy.js');
  const {DaemonPolicyTestFactory}=await imp(subject,'packages/daemon/dist/policy-testing.js');
  const {DaemonCompletionSpoolStore}=await imp(subject,'apps/cli/dist/daemon/completion-spool.js');
  const policy=DaemonPolicy.fromSystemMemory({totalBytes:8*1024**3});
  const request={kind:'execute',protocolVersion:4,instanceId:'specimen',processToken:'token',requestId:'atlas-request',request:{argv:['overview','src/a.ts'],cwd:'/repo',telemetryEnabled:false}};
  const frame=value=>{const data=Buffer.from(JSON.stringify(value));const length=Buffer.alloc(4);length.writeUInt32BE(data.length);return Buffer.concat([length,data])};
  const auth={instanceId:request.instanceId,processToken:request.processToken,requestId:request.requestId};
  const accepted={kind:'accepted',...auth,acceptedAt:10,queuePosition:0};
  const make=(r=1,f=1)=>build==='head'?new LocalDaemonTransport(DaemonPolicyTestFactory.withOverrides(policy,{delivery:{postAcceptanceExecutionReattachmentLimit:r,resultTransferResumeLimitPerExecutionAttempt:f}}).values):new LocalDaemonTransport();
  for (const condition of ['fresh-fetch','two-reattachments','no-fetch','fetch-three','later-error']) {
    if(build==='base' && ['no-fetch','fetch-three'].includes(condition)) continue;
    const dir=await mkdtemp(join(tmpdir(),'atlas76-'));
    const endpoint=join(dir,'s');
    const store=new DaemonCompletionSpoolStore({directory:join(dir,'output'),workspaceKey:'atlas',instanceId:request.instanceId,...(build==='head'?{policy:policy.values.output}:{})});
    const spool=await store.create(request.requestId);const manifest=await spool.finish(0);
    const mf={kind:'result-manifest',...auth,manifest};
    const end={kind:'result-end',...auth,transferId:manifest.transferId,rawBytes:manifest.rawBytes,recordCount:manifest.recordCount,sha256:manifest.sha256};
    let executeCount=0,fetchCount=0;const events=[];const sockets=new Set();
    const server=createServer(socket=>{sockets.add(socket);socket.on('error',()=>{});socket.once('data',bytes=>{
      const message=JSON.parse(bytes.subarray(4));events.push({kind:message.kind,attempt:message.kind==='execute'?executeCount+1:executeCount,offset:message.offset??null,requestId:message.requestId});
      if(message.kind==='result-ack'){socket.end(frame({kind:'result-acknowledged',...auth,transferId:manifest.transferId}));return}
      if(message.kind==='result-fetch'){fetchCount++;socket.end(Buffer.concat((condition==='fetch-three'?[mf]:[mf,end]).map(frame)));return}
      executeCount++;
      if(condition==='later-error' && executeCount===2){socket.end(Buffer.concat([frame(accepted),frame({...mf,instanceId:'wrong'})]));return}
      if(condition==='two-reattachments'){socket.end(Buffer.concat((executeCount<3?[accepted]:[accepted,mf,end]).map(frame)));return}
      socket.end(Buffer.concat((condition==='fresh-fetch' || condition==='later-error') && executeCount===1 ? [frame(accepted)] : [frame(accepted),frame(mf)]));
    })});
    await new Promise(resolve=>server.listen(endpoint,resolve));
    const r=condition==='two-reattachments'?2:condition==='fetch-three'||condition==='no-fetch'?0:1;
    const f=condition==='no-fetch'?0:condition==='fetch-three'?3:1;
    let outcome,error;
    try{const receipt=await make(r,f).execute(endpoint,request);const completion=await receipt.completion;outcome=completion.status;if(completion.status==='completed') await completion.result.output.dispose()}
    catch(e){outcome='rejected';error={code:e.code,delivery:e.delivery,message:e.message,authenticatedInstanceId:e.authenticatedInstanceId??null}}
    for(const socket of sockets)socket.destroy();await new Promise(resolve=>server.close(resolve));await rm(dir,{recursive:true,force:true});
    records.delivery.push({build,condition,limits:build==='head'?{reattach:r,fetch:f}:{reattach:1,fetch:1},executeCount,fetchCount,outcome,error,events});
    if(condition==='fresh-fetch'){assert.equal(outcome,'completed');assert.equal(executeCount,2);assert.equal(fetchCount,1)}
    if(condition==='two-reattachments'){assert.equal(executeCount,build==='head'?3:2);assert.equal(outcome,build==='head'?'completed':'rejected')}
    if(condition==='no-fetch')assert.equal(fetchCount,0);
    if(condition==='fetch-three'){assert.equal(fetchCount,1);assert.equal(outcome,'rejected')}
  }
  // Isolate the outer completion loop to identify which error escapes after reattachment.
  for(const second of ['completion-reject','setup-reject']) {
    const transport=make();const first=new DaemonTransportError('closed','accepted','first close',request.instanceId);
    const later=new DaemonTransportError('corrupt','accepted','later corruption',request.instanceId);
    transport.executeOnce=async()=>{if(second==='setup-reject')throw later;return {completion:Promise.reject(later)}};
    const method=build==='head'?'completeWithReattachments':'completeWithOneReattachment';
    let received;try{await transport[method]('unused',request,Promise.reject(first))}catch(e){received=e}
    records.outer.push({build,condition:second,error:received===first?'first close':'later corruption'});
    assert.equal(received,build==='head'&&second==='completion-reject'?later:first);
  }
}
await writeFile(join(out,'evidence/observations.json'),JSON.stringify(records,null,2)+'\n');
console.log(JSON.stringify({cache:records.cache.length,delivery:records.delivery,outer:records.outer,factory:records.factory},null,2));
