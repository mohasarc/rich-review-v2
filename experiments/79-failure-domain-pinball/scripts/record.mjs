// Actual compiled daemon methods with deterministic, injected socket peers.
// No daemon process or navigation worker is started; no production traffic is used.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

const folder = resolve(fileURLToPath(new URL('..', import.meta.url)));
const wt = resolve(folder, '../../worktrees/stack-head');
const pin = execFileSync('git',['-C',wt,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
assert.equal(pin,'d07002357d3e9596bfaae910a1ac63b77981620b');
const mod = p => import(pathToFileURL(resolve(wt,'packages/daemon/dist',p)));
const {DaemonAdmissionPolicy,DaemonAdmissionRejections} = await mod('daemon-admission.js');
const {DaemonExecutionFailures} = await mod('daemon-execution-failure.js');
const {DaemonTransportError} = await mod('transport/transport-error.js');
const {DaemonExecutionClient} = await mod('transport/execution-client.js');
const {DaemonWireCodec} = await mod('transport/wire-codec.js');
const {DaemonProtocolValidator} = await mod('transport/protocol-validator.js');
const {DaemonClientResultCapture} = await mod('transport/client-result-capture.js');
const {DAEMON_PROTOCOL_VERSION} = await mod('transport/protocol.js');
const {DaemonPolicy} = await mod('daemon-policy.js');
const policy = DaemonPolicy.currentSystem().values;
const codec = new DaemonWireCodec({maximumJsonPayloadBytes:policy.transport.maximumJsonPayloadBytes,maximumExecutionControlPayloadBytes:policy.transport.maximumExecutionControlPayloadBytes,maximumChunkRawBytes:policy.output.maximumChunkRawBytes});
const request={kind:'execute',protocolVersion:DAEMON_PROTOCOL_VERSION,instanceId:'instance-79',processToken:'fixture-token',requestId:'request-79',commandName:'overview',request:{argv:['overview','fixture.ts'],cwd:'/illustrative-fixture',telemetryEnabled:false,executionMode:'warm'}};
const coords={instanceId:request.instanceId,processToken:request.processToken,requestId:request.requestId};
const accepted={kind:'accepted',...coords,acceptedAt:10,queuePosition:0};
const control=v=>codec.encodeControl(v);
const recs=[{sequence:0,stream:'stdout',bytes:Buffer.from('alpha\n')},{sequence:1,stream:'stdout',bytes:Buffer.from('beta\n')}];
const temporary = new DaemonClientResultCapture({policy:policy.output,directory:resolve(folder,'evidence/capture-tmp')});
for(const r of recs) await temporary.append(r);
const generated = await temporary.finish(0);
const manifest={...generated.summary,instanceId:request.instanceId,requestId:request.requestId,transferId:'transfer-79',exitCode:0};
await generated.result.output.dispose();
const mf={kind:'result-manifest',...coords,manifest};
const end={kind:'result-end',...coords,transferId:manifest.transferId,...generated.summary};
const chunk=i=>codec.encodeServerMessage({...recs[i],requestId:request.requestId,transferId:manifest.transferId,offset:i});
const resultBytes=[control(mf),chunk(0),chunk(1),control(end)];

const baseAdmission={request,authenticated:true,workerReady:true,resourceAdmissionPaused:false,queueState:'accepting',compatibility:'unseen'};
const admissions={
  authentication:{authenticated:false,workerReady:false,resourceAdmissionPaused:true,queueState:'draining',compatibility:'conflicting'},
  readiness:{workerReady:false,resourceAdmissionPaused:true,queueState:'draining'},
  pressure:{resourceAdmissionPaused:true,queueState:'draining'},
  draining:{queueState:'draining',compatibility:'conflicting'},
  conflict:{compatibility:'conflicting'},
};
const observations={pin,kind:'Actual compiled methods; injected socket peers and contexts. Not a live daemon trace.',policy:{reattach:policy.delivery.postAcceptanceExecutionReattachmentLimit,fetch:policy.delivery.resultTransferResumeLimitPerExecutionAttempt},admission:{},classification:{},transport:{}};
for(const [id,overrides] of Object.entries(admissions)){
  const context={...baseAdmission,...overrides};
  const decision=new DaemonAdmissionPolicy().decide(context);
  observations.admission[id]={context:overrides,decision};
}
const failureBase={resourceInterrupted:false,responseCapacityExceeded:false,workerExited:false,shutdownStarted:false};
const failures={
  worker:{workerExited:true},
  stopping:{workerExited:true,shutdownStarted:true,shutdownFailureCode:'stopping'},
  resource:{resourceInterrupted:true,responseCapacityExceeded:true,workerExited:true,shutdownStarted:true,shutdownFailureCode:'stopping'},
  capacity:{responseCapacityExceeded:true,workerExited:true,shutdownStarted:true,shutdownFailureCode:'stopping'},
  'controlled-exit':{workerExited:true,shutdownStarted:true,shutdownFailureCode:'controlled-resource'},
  internal:{},
};
for(const [id,overrides] of Object.entries(failures)){
  const context={...failureBase,...overrides};
  observations.classification[id]={context,code:DaemonExecutionFailures.classify(context)};
}

async function run(id,streams){
  const log=[]; let connectionIndex=0, captureCount=0; const disposals=[];
  const sockets={async connect(endpoint,timeoutMs){
    const index=connectionIndex++; log.push({event:'connect',index,timeoutMs:timeoutMs??null});
    const stream=streams[index];
    if(stream instanceof Error) throw stream;
    if(!stream) throw new Error('Unexpected extra connection');
    return {
      incoming:(async function*(){ for(const value of stream) {if(value instanceof Error)throw value;yield value;} })(),
      write(bytes){const decoder=codec.transferDecoder();log.push({event:'write',index,frame:decoder.append(bytes)[0]});},
      disableTimeout(){log.push({event:'disableTimeout',index});},
      end(){log.push({event:'end',index});},destroy(){log.push({event:'destroy',index});}
    };
  }};
  const client=new DaemonExecutionClient({sockets,codec,validator:new DaemonProtocolValidator(),transportPolicy:policy.transport,deliveryPolicy:policy.delivery,lifecycle:{async acknowledgeResult(_endpoint,_request,transferId){log.push({event:'acknowledge',transferId});}},createOutput(){
    const index=captureCount++;log.push({event:'createCapture',index});
    const output=new DaemonClientResultCapture({policy:policy.output,directory:resolve(folder,'evidence/capture-tmp')});
    return {async append(record){log.push({event:'captureRecord',index,sequence:record.sequence});return output.append(record);},finish:(code)=>output.finish(code),async dispose(){disposals.push(index);log.push({event:'disposeCapture',index});return output.dispose();}};
  }});
  let receipt,completion,error;
  try{
    receipt=await client.execute('injected-peer',request);
    completion=await receipt.completion;
    if(completion.status==='completed'){
      const output=completion.result.output;
      // The actual capture has validated its digest. No navigation was executed.
      completion={status:'completed',exitCode:completion.result.exitCode};
      await output.dispose();
    }
  }catch(e){error={code:e.code,delivery:e.delivery,retrySafe:e.retrySafe,message:e.message,authenticatedInstanceId:e.authenticatedInstanceId};}
  observations.transport[id]={acceptance:receipt?.acceptance,completion,error,connections:connectionIndex,captureCount,disposals,log};
}
await run('unreachable',[new Error('Injected unavailable socket')]);
await run('authentication',[[]]);
for(const [id,o] of Object.entries(observations.admission)){
  if(o.decision.kind==='reject')await run(id,[[control(DaemonAdmissionRejections.frame(o.decision.code,coords))]]);
}
await run('contradiction',[[control({...DaemonAdmissionRejections.frame('incompatible',coords),retrySafe:true})]]);
await run('reattach',[[control(accepted)],[control(accepted),...resultBytes]]);
await run('reattach-exhausted',[[control(accepted)],[control(accepted)]]);
await run('fetch',[[control(accepted),control(mf),chunk(0)],[control(mf),chunk(1),control(end)]]);
await run('fetch-exhausted',[[control(accepted),control(mf),chunk(0)],[control(mf)]]);
await run('normal',[[control(accepted),...resultBytes]]);
for(const [id,o]of Object.entries(observations.classification)){
  await run(id,[[control(accepted),control({kind:'execution-failed',...coords,code:o.code})]]);
}

assert.equal(observations.transport.unreachable.error.retrySafe,true);
for(const id of ['readiness','pressure','draining'])assert.equal(observations.transport[id].error.retrySafe,true);
for(const id of ['authentication','conflict','contradiction','fetch-exhausted','reattach-exhausted'])assert.equal(observations.transport[id].error.retrySafe,false);
assert.equal(observations.transport.contradiction.error.code,'corrupt');
assert.equal(observations.transport.reattach.captureCount,2);
const writes=observations.transport.reattach.log.filter(e=>e.event==='write');
assert.deepEqual(writes[0].frame,writes[1].frame);
assert.equal(observations.transport.fetch.captureCount,1);
assert.equal(observations.transport.fetch.log.find(e=>e.event==='write'&&e.index===1).frame.offset,1);
assert.equal(observations.transport.fetch.completion.status,'completed');
assert.equal(observations.transport['fetch-exhausted'].error.code,'corrupt');
assert.equal(observations.transport['reattach-exhausted'].error.code,'closed');
for(const id of Object.keys(failures))assert.equal(observations.transport[id].completion.code,observations.classification[id].code);

await mkdir(resolve(folder,'evidence'),{recursive:true});
await writeFile(resolve(folder,'evidence/observations.json'),JSON.stringify(observations,null,2)+'\n');
await writeFile(resolve(folder,'observations.js'),'window.PINBALL_OBSERVATIONS = '+JSON.stringify(observations)+';\n');
console.log(`${Object.keys(observations.transport).length} actual execution-client cases captured; all bounded assertions passed.`);
