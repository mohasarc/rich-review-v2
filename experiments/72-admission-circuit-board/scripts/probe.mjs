import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const root = new URL('../', import.meta.url);
const tree = new URL('../../worktrees/stack-head/', root);
assert.equal(execFileSync('git', ['-C', tree.pathname, 'rev-parse', 'HEAD'], {encoding:'utf8'}).trim(), 'd07002357d3e9596bfaae910a1ac63b77981620b');
const mod = async path => import(new URL(`packages/daemon/dist/${path}.js`, tree));
const {DaemonExecutionClient} = await mod('transport/execution-client');
const {DaemonWireCodec} = await mod('transport/wire-codec');
const {DaemonProtocolValidator} = await mod('transport/protocol-validator');
const {DaemonPolicy} = await mod('daemon-policy');
const {AcceptedRequestLedger} = await mod('execution/accepted-request-ledger');
const {DAEMON_PROTOCOL_VERSION} = await mod('transport/protocol');
const policy = DaemonPolicy.currentSystem().values;
const codec = new DaemonWireCodec({...policy.transport, maximumChunkRawBytes:policy.output.maximumChunkRawBytes});
const coordinates = {instanceId:'bench-instance',processToken:'bench-token',requestId:'signal-72'};
const request = {kind:'execute',protocolVersion:DAEMON_PROTOCOL_VERSION,...coordinates,commandName:'overview',request:{argv:['overview','src/a.ts'],cwd:'/bench',telemetryEnabled:false,executionMode:'warm'}};
const manifest={transferId:'bench-transfer',requestId:request.requestId,instanceId:request.instanceId,exitCode:0,rawBytes:0,recordCount:0,sha256:createHash('sha256').digest('hex')};
const accepted={kind:'accepted',...coordinates,acceptedAt:10,queuePosition:0};
const mf={kind:'result-manifest',...coordinates,manifest};
const end={kind:'result-end',...coordinates,transferId:manifest.transferId,rawBytes:0,recordCount:0,sha256:manifest.sha256};
const failed={kind:'execution-failed',...coordinates,code:'internal'};
const rejection=(code,retrySafe)=>({kind:'rejected',...coordinates,code,retrySafe});
const specs = {
 complete:[[accepted,mf,end]],
 unreachable:[null],
 uncertain:[[]],
 'not-ready':[[rejection('not-ready',true)]],
 draining:[[rejection('draining',true)]],
 incompatible:[[rejection('incompatible',false)]],
 contradictory:[[rejection('incompatible',true)]],
 terminal:[[accepted,failed]],
 reattach:[[accepted],[accepted,mf,end]],
 fetch:[[accepted,mf],[mf,end]],
 both:[[accepted],[accepted,mf],[mf,end]],
 'exhaust-fetch':[[accepted,mf],[mf]],
 'exhaust-reattach':[[accepted],[accepted]],
};
const results={};
for (const [name,streams] of Object.entries(specs)) {
 const trace=[],writes=[],captures=[];
 let connectionIndex=0;
 const client=new DaemonExecutionClient({
  codec,validator:new DaemonProtocolValidator(),transportPolicy:policy.transport,deliveryPolicy:policy.delivery,
  sockets:{async connect(endpoint,timeout){
   const i=connectionIndex++; trace.push({event:'connect',i,timeout});
   if(streams[i]==null)throw new Error('Scripted connection refused');
   return {
    incoming:(async function*(){for(const value of streams[i]){trace.push({event:'receive',i,kind:value.kind});yield codec.encodeControl(value);}trace.push({event:'eof',i});})(),
    write(bytes){const value=codec.controlDecoder().append(bytes)[0]; writes.push(value);trace.push({event:'write',i,kind:value.kind,...(value.offset===undefined?{}:{offset:value.offset})});},
    disableTimeout(){trace.push({event:'disable-admission-timeout',i});},end(){},destroy(){}
   };
  }},
  lifecycle:{async acknowledgeResult(){trace.push({event:'acknowledge'});}},
  createOutput(){
   const capture={disposed:0};captures.push(capture);
   return {async append(){throw new Error('Empty-result fixture received an unexpected chunk');},async dispose(){capture.disposed++;},async finish(exitCode){return {summary:manifest,result:{exitCode,output:{async dispose(){capture.disposed++;}}}};}};
  }
 });
 let outcome;
 try {
  const receipt=await client.execute('scripted-endpoint',request);
  trace.push({event:'acceptance-received'});
  const completion=await receipt.completion;
  outcome={status:completion.status,...(completion.code?{code:completion.code}:{}),...(completion.result?{exitCode:completion.result.exitCode}:{})};
  if(completion.result)await completion.result.output.dispose();
 }catch(error){outcome={status:'error',code:error.code,delivery:error.delivery,retrySafe:error.retrySafe,message:error.message};}
 results[name]={outcome,writes,trace,captures};
}
assert.equal(results.contradictory.outcome.code,'corrupt');
assert.equal(results.contradictory.outcome.retrySafe,false);
assert.equal(results.unreachable.outcome.retrySafe,true);
assert.equal(results.uncertain.outcome.retrySafe,false);
assert.deepEqual(results.both.writes.map(w=>w.kind),['execute','execute','result-fetch']);
assert.deepEqual(results.both.writes[0],results.both.writes[1]);
assert.equal(results.both.outcome.status,'completed');
assert.equal(results['exhaust-fetch'].outcome.code,'corrupt');
assert.equal(results['exhaust-fetch'].writes.length,2);
assert.equal(results['exhaust-reattach'].outcome.code,'closed');
const ledger=new AcceptedRequestLedger({wallNowMs:()=>10});
const first=ledger.accept(request.requestId,request.commandName,request.request);
const matching=ledger.compatibilityFor(request.requestId,request.commandName,request.request);
const duplicate=ledger.accept(request.requestId,request.commandName,request.request);
assert.equal(first,duplicate);
assert.equal(ledger.size,1);
const output={kind:'Actual compiled execution client with scripted socket streams, fake empty-output capture, and fake ACK port; no live daemon or host execution.',revision:'d07002357d3e9596bfaae910a1ac63b77981620b',policy:{reattach:policy.delivery.postAcceptanceExecutionReattachmentLimit,fetch:policy.delivery.resultTransferResumeLimitPerExecutionAttempt},results,ledger:{matching,sameEntry:first===duplicate,size:ledger.size}};
fs.writeFileSync(new URL('evidence/probes.json',root),JSON.stringify(output,null,2));
console.log(`Recorded ${Object.keys(results).length} execution-client cases and actual ledger deduplication; assertions passed.`);
