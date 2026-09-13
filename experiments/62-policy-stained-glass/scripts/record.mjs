import {createServer} from 'node:net';
import {createHash} from 'node:crypto';
import {mkdtempSync,rmSync,readdirSync,writeFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {pins} from '../src/content.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const repo=resolve(root,'../..');
const load=(wt,path)=>import(pathToFileURL(resolve(wt,path)).href);
const frame=value=>{const body=Buffer.from(JSON.stringify(value));const prefix=Buffer.alloc(4);prefix.writeUInt32BE(body.length);return Buffer.concat([prefix,body]);};
const request={kind:'execute',protocolVersion:4,instanceId:'instance',processToken:'token',requestId:'request',request:{argv:['overview','src/a.ts'],cwd:'/repo',telemetryEnabled:false}};
const identity={instanceId:request.instanceId,processToken:request.processToken,requestId:request.requestId};
const accepted={kind:'accepted',...identity,acceptedAt:10,queuePosition:0};
const manifest={transferId:'transfer',requestId:request.requestId,instanceId:request.instanceId,exitCode:0,rawBytes:0,recordCount:0,sha256:createHash('sha256').update('').digest('hex')};
const resultManifest={kind:'result-manifest',...identity,manifest};
const resultEnd={kind:'result-end',...identity,transferId:manifest.transferId,rawBytes:0,recordCount:0,sha256:manifest.sha256};
async function serverRun(handler,run) {
 const dir=mkdtempSync(join(tmpdir(),'glass-')); const sockets=new Set();const timers=new Set();
 const server=createServer(socket=>{sockets.add(socket);socket.on('error',()=>{});let pending=Buffer.alloc(0);socket.on('data',data=>{
  pending=Buffer.concat([pending,data]);
  if(pending.length<4||pending.length<pending.readUInt32BE(0)+4)return;
  const message=JSON.parse(pending.subarray(4,4+pending.readUInt32BE(0))); pending=Buffer.alloc(0);
  handler(socket,message,(fn,ms)=>{const timer=setTimeout(fn,ms);timers.add(timer);});
 });});
 const endpoint=join(dir,'s'); await new Promise(res=>server.listen(endpoint,res));
 let watchdog;try { return await Promise.race([run(endpoint),new Promise((_,reject)=>{watchdog=setTimeout(()=>reject(Error('probe watchdog')),5000);})]); }
 finally {clearTimeout(watchdog);for(const t of timers)clearTimeout(t);for(const s of sockets)s.destroy();await new Promise(res=>server.close(res));rmSync(dir,{recursive:true,force:true});}
}
const records={capturedAt:new Date().toISOString(),pins,scope:'Actual compiled base/head methods with scripted local socket peers; no daemon process or command backend. The spill probe calls actual output capture with the adapter-equivalent inline threshold. Browser replays these frozen observations.',deadlines:[],delivery:[],spill:[]};
for(const side of ['base','head']) {
 const wt=resolve(repo,'worktrees/pr-131-'+side);
 assert.equal(execFileSync('git',['-C',wt,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),pins[side]);
 const {LocalDaemonTransport}=await load(wt,'apps/cli/dist/daemon/local-daemon-transport.js');
 const {DaemonPolicy}=await load(wt,'packages/daemon/dist/daemon-policy.js');
 const {DaemonPolicyTestFactory}=await load(wt,'packages/daemon/dist/policy-testing.js');
 const baseline=DaemonPolicy.fromSystemMemory({totalBytes:8*1024**3});
 for(const purpose of ['status-observer','ordinary']) {
  const transport=side==='head'?new LocalDaemonTransport(baseline.values,{responseTimeoutPurpose:purpose}):new LocalDaemonTransport(purpose==='ordinary'?{}:{requestTimeoutMs:100});
  const sent={kind:'identify',instanceId:'instance',processToken:'token'};
  const observed=await serverRun((socket,msg,later)=>later(()=>socket.end(frame({kind:'identity',instanceId:msg.instanceId,processToken:msg.processToken,pid:123,startedAt:10})),160),async endpoint=>{
   const start=performance.now();try{const response=await transport.request(endpoint,sent);return {outcome:response.kind,elapsedMs:Math.round(performance.now()-start)};}catch(e){return {outcome:e.code,elapsedMs:Math.round(performance.now()-start)};}
  });
  assert.equal(observed.outcome,purpose==='ordinary'?'identity':'timeout');
  records.deadlines.push({side,purpose,request:sent,configuredMs:purpose==='ordinary'?250:100,peerDelayMs:160,...observed});
 }
 for(const scenario of ['scope','two-reattachments','later-error','fetch-limit-two']) {
  const overrides=scenario==='two-reattachments'?{postAcceptanceExecutionReattachmentLimit:2}:scenario==='fetch-limit-two'?{resultTransferResumeLimitPerExecutionAttempt:2}:{};
  const policy=DaemonPolicyTestFactory.withOverrides(baseline,{delivery:overrides});
  const transport=side==='head'?new LocalDaemonTransport(policy.values):new LocalDaemonTransport();
  const events=[];let executes=0;
  const result=await serverRun((socket,msg)=>{
   events.push(msg.kind);
   if(msg.kind==='result-ack'){socket.end(frame({kind:'result-acknowledged',...identity,transferId:manifest.transferId}));return;}
   if(msg.kind==='result-fetch') {socket.end(scenario==='fetch-limit-two'?undefined:Buffer.concat([frame(resultManifest),frame(resultEnd)]));return;}
   executes++;
   if(scenario==='later-error'&&executes===2){socket.end(Buffer.concat([frame(accepted),frame({kind:'unexpected',...identity})]));return;}
   if(scenario==='scope') {socket.end(executes===1?frame(accepted):Buffer.concat([frame(accepted),frame(resultManifest)]));return;}
   if(scenario==='fetch-limit-two'){socket.end(Buffer.concat([frame(accepted),frame(resultManifest)]));return;}
   socket.end(executes<=2?frame(accepted):Buffer.concat([frame(accepted),frame(resultManifest),frame(resultEnd)]));
  },async endpoint=>{
   try { const receipt=await transport.execute(endpoint,request);const completion=await receipt.completion;if(completion.status==='completed')await completion.result.output.dispose();return {outcome:completion.status}; }
   catch(e) {return {outcome:e.code??e.message,delivery:e.delivery};}
  });
  const expected=scenario==='scope'?'completed':scenario==='two-reattachments'?(side==='head'?'completed':'closed'):scenario==='later-error'?(side==='head'?'corrupt':'closed'):'corrupt';
  assert.equal(result.outcome,expected,side+' '+scenario+' '+JSON.stringify(events));
  records.delivery.push({side,scenario,policyOverridesApplied:side==='head'?overrides:{},events,...result});
 }
 const {OrderedCommandOutput}=await load(wt,'apps/cli/dist/command-execution-result.js');
 const directory=mkdtempSync(join(tmpdir(),'glass-spill-'));
 const inline=side==='base'?0:Math.max(baseline.values.output.maximumChunkRawBytes,0);
 const capture=side==='base'?new OrderedCommandOutput({inlineBytes:inline,directory}):new OrderedCommandOutput({policy:DaemonPolicyTestFactory.withOverrides(baseline,{output:{inlineRawBytes:inline}}).values.output,directory});
 capture.stdout.write('glass');const completion=await capture.finish(0);const filesWhileRetained=readdirSync(directory);await completion.output.dispose();const filesAfterDispose=readdirSync(directory);
 assert.equal(filesWhileRetained.length,side==='base'?1:0);assert.equal(filesAfterDispose.length,0);
 records.spill.push({side,requestedInlineBytes:0,effectiveInlineBytes:inline,rawBytes:5,filesWhileRetained:filesWhileRetained.length,filesAfterDispose:filesAfterDispose.length,adapter:'Head threshold is computed from the exact adapter expression; the adapter class itself is not executed.'});
 rmSync(directory,{recursive:true,force:true});
}
mkdirSync(resolve(root,'evidence'),{recursive:true});writeFileSync(resolve(root,'evidence/observations.json'),JSON.stringify(records,null,2)+'\n');
console.log(JSON.stringify(records,null,2));
