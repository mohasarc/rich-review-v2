import {DaemonAdmissionPolicy,DaemonAdmissionRejections} from '../evidence/head/packages/daemon/src/daemon-admission.ts';
import {DaemonTransportError} from '../evidence/head/packages/daemon/src/transport/transport-error.ts';
export const defaults={route:'warm',auth:true,ready:true,pressure:false,queue:'accepting',duplicate:'unseen',wire:'intact',tamper:false,ending:'complete'};
export const presets=[
 {id:'complete',name:'01 · A clean delivery',patch:{},note:'All five guards pass. Acceptance closes the local replay path.'},
 {id:'precedence',name:'02 · Two failures at once',patch:{queue:'draining',duplicate:'conflicting'},note:'The queue is draining and the duplicate conflicts. Which rejection reaches the client?'},
 {id:'auth',name:'03 · Wrong process token',patch:{auth:false,ready:false,pressure:true},note:'Authentication cuts the signal before a rejection frame or resource sample.'},
 {id:'contradictory',name:'04 · A lying retry bit',patch:{duplicate:'conflicting',tamper:true},note:'The wire says incompatible + retrySafe=true. The code table owns the answer.'},
 {id:'unreachable',name:'05 · Socket never connects',patch:{wire:'before'},note:'Nothing was submitted. The local permit has proof of safe fallback.'},
 {id:'uncertain',name:'06 · Silence after the write',patch:{wire:'unconfirmed'},note:'No acceptance was heard. That does not prove the daemon did no work.'},
 {id:'both',name:'07 · Two recovery circuits',patch:{ending:'both'},note:'First reattach the identical execute request; then resume its result transfer.'},
 {id:'exhaust-fetch',name:'08 · Fetch ends too soon',patch:{ending:'exhaust-fetch'},note:'A clean but incomplete fetch exhausts as accepted corruption. It cannot buy another execute attempt.'},
 {id:'exhaust-reattach',name:'09 · Reattachment exhausted',patch:{ending:'exhaust-reattach'},note:'The original authenticated accepted-close error survives the recovery failure.'},
 {id:'terminal',name:'10 · Worker exits after acceptance',patch:{ending:'worker-exit'},note:'A terminal execution code is a controlled result, never an admission rejection.'},
 {id:'cold',name:'11 · No daemon record',patch:{route:'cold'},note:'Choose local now. Independent daemon warmup cannot switch this request to warm.'},
];
const guardIds=['auth','ready','pressure','queue','duplicate'];
export function simulate(input){
 const c={...defaults,...input},steps=[];
 const stats={localRuns:0,executeWrites:0,fetches:0,reattachments:0,accepted:false,admissionSamples:0};
 let outcome='pending',code='',delivery='not-submitted',retrySafe=false;
 const add=(node,title,text,edge,extra={})=>steps.push({node,title,text,edge,delivery,...stats,...extra});
 const finish=(node,title,text,edge,extra={})=>{outcome=node;add(node,title,text,edge,extra);return {input:c,steps,stats,outcome,code,delivery,retrySafe};};
 add('route','Choose one route',c.route==='warm'?'A compatible responsive daemon is available. This workspace request takes the warm route.':c.route==='cold'?'No daemon record: choose cold execution and trigger warmup independently.':'Incompatible route snapshot: choose local fallback and trigger startup independently.');
 if(c.route!=='warm'){stats.localRuns=1;return finish('local',c.route==='cold'?'Cold local execution':'Local fallback','The selected route remains local even if independent warmup finishes.','route-local');}
 add('wire','Connect to the execution socket','The request is not submitted until the write succeeds.','route-wire');
 if(c.wire==='before'){
  const error=new DaemonTransportError('unreachable','not-submitted','simulated refused connection');retrySafe=error.retrySafe;code=error.code;
  add('retry','not-submitted → safe','The transport error proves this request was not submitted.','wire-retry',{code,retrySafe});
  stats.localRuns=1;return finish('local','One local fallback','DaemonClientRuntime invokes its local executor once.','retry-local',{code,retrySafe});
 }
 stats.executeWrites++;delivery='submitted-unconfirmed';
 add('wire','Write sent · acceptance unknown','A successful socket write is not an acceptance receipt.');
 if(c.wire==='unconfirmed'){code='closed';return finish('halt','Uncertain delivery · no local replay','A close after the write cannot prove that execution did not start.','wire-halt',{code,retrySafe:false});}
 const decision=new DaemonAdmissionPolicy().decide({request:{},authenticated:c.auth,workerReady:c.ready,resourceAdmissionPaused:c.pressure,queueState:c.queue,compatibility:c.duplicate});
 if(c.auth)stats.admissionSamples=1;
 const failed=decision.kind==='accept'?5:{authentication:0,'not-ready':1,'resource-pressure':2,draining:3,incompatible:4}[decision.code];
 const guardTexts=[['Authenticate','The process token must match. A mismatch disconnects; no rejection frame and no admission resource sample.'],['Worker ready','A worker that is not ready rejects with not-ready.'],['Resources allow','Paused resource admission rejects with resource-pressure.'],['Queue accepts','Both draining and closed queues reject with draining.'],['Duplicate matches','An unseen or matching request passes. A conflicting duplicate rejects without mutating its accepted entry.']];
 for(let i=0;i<Math.min(failed+1,5);i++)add('admission',guardTexts[i][0],guardTexts[i][1],i===0?'wire-admission':undefined,{guard:guardIds[i],guardIndex:i,guardFailed:failed===i,code:failed===i?decision.code:undefined});
 if(decision.kind==='disconnect'){code='closed';return finish('halt','Authentication disconnect','The client sees a submitted-unconfirmed close, not an authenticated retry-safe rejection.','admission-halt',{code,retrySafe:false});}
 if(decision.kind==='reject'){
  const frame=DaemonAdmissionRejections.frame(decision.code,{instanceId:'bench-instance',processToken:'bench-token',requestId:'signal-72'});
  if(c.tamper)frame.retrySafe=!frame.retrySafe;
  add('fuse','Validate the rejection',`${frame.code} + retrySafe=${frame.retrySafe}. Identity is held matching in this bench; the two fields must agree with the authoritative code table.`,'admission-fuse',{frame});
  try{DaemonAdmissionRejections.assertConsistent(frame);}catch{
   code='corrupt';return finish('halt','Contradictory frame · fuse open','The validator rejects this frame as corrupt before it can grant local retry permission.','fuse-halt',{code,retrySafe:false,fuseBlown:true});
  }
  const error=new DaemonTransportError('rejected',delivery,'simulated rejection',frame.instanceId,frame.code);retrySafe=error.retrySafe;code=frame.code;
  add('retry',retrySafe?'Authenticated rejection → safe':'Incompatible → no replay',`${frame.code} derives retrySafe=${retrySafe}. The wire boolean is checked, then the code supplies the client decision.`,'fuse-retry',{code,retrySafe});
  if(retrySafe){stats.localRuns=1;return finish('local','One local fallback','The authenticated rejection proves admission did not accept this request.','retry-local',{code,retrySafe});}
  return finish('halt','Controlled failure · no local replay','An incompatible rejection does not grant retry permission.','retry-halt',{code,retrySafe});
 }
 stats.accepted=true;delivery='accepted';
 add('latch','Acceptance retained','The client has a receipt for signal-72. Its admission timeout is disabled; accepted completion has no deadline. Matching duplicates reuse the accepted entry.','admission-latch');
 const failures=['worker-exit','controlled-resource','response-capacity','stopping','internal'];
 if(failures.includes(c.ending)){code=c.ending;return finish('halt',`execution-failed · ${code}`,'This is the outer completion vocabulary. The client returns a controlled failure and does not invoke the local executor.','latch-halt',{code});}
 if(c.ending!=='complete'){
  const reattach=['reattach','both','exhaust-reattach'].includes(c.ending);
  add('recovery',reattach?'Closed before a manifest':'Interrupted manifest transfer',reattach?'An authenticated close after acceptance may spend the request’s reattachment allowance.':'A manifest exists: fetch the same transfer from its next contiguous record offset.','latch-recovery');
  if(reattach){
   stats.reattachments=1;stats.executeWrites++;stats.admissionSamples++;
   add('latch','Reattach · identical execute request','Send the same request identity and payload. A fresh capture is created; a matching accepted entry is reused. This is not local replay.','recovery-latch');
   if(c.ending==='exhaust-reattach'){add('recovery','Accepted close again','The request has spent its one reattachment allowance.','latch-recovery');code='closed';return finish('halt','Reattachment budget exhausted','Current policy allows one reattachment. Preserve the first authenticated accepted-close error.','recovery-halt',{code});}
  }
  if(['fetch','both','exhaust-fetch'].includes(c.ending)){
   if(c.ending==='both')add('recovery','The new attempt owns its fetch allowance','This attempt has a manifest. Its result-fetch counter starts at zero independently of the request’s spent reattachment.','latch-recovery');
   stats.fetches=1;
   add('recovery','Fetch · next record offset','Spend one fetch resume for this attempt; keep its existing capture. Offset counts complete records, not bytes.');
   if(c.ending==='exhaust-fetch'){code='corrupt';return finish('halt','Clean fetch exhaustion → corrupt','A clean EOF before the result end becomes accepted corruption. It does not become an accepted-close reattachment.','recovery-halt',{code});}
  }
 }
 add('ack','Finish result, then acknowledge','Verify the manifest and output summary; acknowledge the transfer before resolving completion.', ['fetch','both'].includes(c.ending)?'recovery-ack':'latch-ack');
 return finish('done','Daemon result delivered','The output is returned after successful acknowledgement. Local executions for this signal: zero.','ack-done');
}
