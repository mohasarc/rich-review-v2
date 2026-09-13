import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

const folder = resolve(fileURLToPath(new URL('..', import.meta.url)));
const root = resolve(folder, '../..');
const pins = { base: 'ba53c8e1662fd86d198b95321c90d9c9bef10184', head: '20838f8dbf413e04767543eb2380d0d114da6c60' };
const records = ['alpha\n', 'note\n', 'beta\n', 'done\n'].map((s, sequence) => ({ sequence, stream: sequence === 1 ? 'stderr' : 'stdout', bytes: Buffer.from(s) }));
const sha = createHash('sha256');
for (const r of records) { const b = Buffer.alloc(5); b[0] = r.stream === 'stderr' ? 1 : 0; b.writeUInt32BE(r.bytes.length, 1); sha.update(b).update(r.bytes); }
const manifest = { transferId: 'T1', requestId: 'R7', instanceId: 'I1', exitCode: 0, rawBytes: records.reduce((n,r)=>n+r.bytes.length,0), recordCount: 4, sha256: sha.digest('hex') };
const coordinates = { instanceId: 'I1', processToken: 'P1', requestId: 'R7' };
const mf = { kind: 'result-manifest', ...coordinates, manifest };
const end = { kind: 'result-end', ...coordinates, ...Object.fromEntries(['transferId','rawBytes','recordCount','sha256'].map(k=>[k,manifest[k]])) };
const chunk = (n, extras={}) => ({ transferId: 'T1', requestId: 'R7', offset:n, ...records[n], ...extras });
const failure = (fn) => { try { fn(); return null; } catch (e) { return e.message; } };
const output = { pins, fixture: { records: records.map(r=>({...r,bytes:r.bytes.toString()})), manifest }, limitations: 'Actual compiled classes. Scripted incoming bytes, in-memory output, fixed identities and clocks; 12 ms injected trace retention. No live daemon, real network, production incident or performance measurement.', builds: {} };

for (const side of ['base','head']) {
  const wt = join(root, `worktrees/pr-148-${side}`);
  assert.equal(execFileSync('git',['rev-parse','HEAD'],{cwd:wt,encoding:'utf8'}).trim(),pins[side]);
  assert.equal(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:wt,encoding:'utf8'}).trim(),'');
  const prefix = side === 'head' ? 'packages/daemon/dist/' : 'apps/cli/dist/daemon/';
  const names = { codec:['transport/wire-codec','daemon-wire-codec'], receiver:['transport/result-transfer-receiver','daemon-result-transfer-receiver'], capture:['transport/client-result-capture','daemon-client-result-capture'], client:['transport/execution-client','daemon-execution-client'], validator:['transport/protocol-validator','daemon-protocol-validator'], errors:['transport/transport-error','daemon-transport-error'], protocol:['transport/protocol','daemon-protocol'], ledger:['execution/accepted-request-ledger','accepted-request-ledger'], delivery:['delivery/delivery-session','daemon-delivery-session'], spool:['delivery/completion-spool','completion-spool'], observer:['diagnostics/operation-observer','daemon-operation-observer'] };
  const mods = {};
  for (const [key,paths] of Object.entries(names)) mods[key] = await import(pathToFileURL(join(wt,prefix+paths[side==='head'?0:1]+'.js')));
  const { DaemonPolicy } = await import(pathToFileURL(join(wt,'packages/daemon/dist/index.js')));
  const policy = DaemonPolicy.currentSystem().values;
  const codec = new mods.codec.DaemonWireCodec({ maximumJsonPayloadBytes: policy.transport.maximumJsonPayloadBytes, maximumExecutionControlPayloadBytes: policy.transport.maximumExecutionControlPayloadBytes, maximumChunkRawBytes: policy.output.maximumChunkRawBytes });
  const encoded = Buffer.from(codec.encodeServerMessage(chunk(0)));
  const sizes = [2, 2, 37, encoded.length-42, 1];
  const decoder = codec.transferDecoder(); let supplied=0;
  const fragments = sizes.map(size=>{ const frames=decoder.append(encoded.subarray(supplied,supplied+size)); supplied+=size; return { bytesAdded:size, supplied, frames:frames.length }; });
  decoder.assertComplete(); assert.deepEqual(fragments.map(x=>x.frames),[0,0,0,0,1]);
  const truncated=codec.transferDecoder(); truncated.append(encoded.subarray(0,-1));
  const corrupt=Buffer.from(encoded); corrupt[corrupt.length-1]^=1;
  const controlA=codec.encodeControl({ kind:'status', value:'λ' }); const controlB=codec.encodeControl({ kind:'stop' });
  const coalesced=codec.controlDecoder().append(Buffer.concat([controlA,controlB]));
  const framing={ length:encoded.length, prefixHex:encoded.subarray(0,4).toString('hex'), binary:Boolean(encoded.readUInt32BE(0)&0x80000000), payloadLength:encoded.readUInt32BE(0)&0x7fffffff, headerLength:encoded.readUInt32BE(4), fragments, truncated:failure(()=>truncated.assertComplete()), corrupt:failure(()=>codec.transferDecoder().append(corrupt)), coalesced:coalesced.length };

  const capture = () => new mods.capture.DaemonClientResultCapture({policy:policy.output});
  let release; const gate=new Promise(r=>release=r); const held=capture();
  const receiver = new mods.receiver.DaemonResultTransferReceiver('R7',{ append:async r=>{ await gate; await held.append(r); },finish:code=>held.finish(code),dispose:()=>held.dispose() });
  receiver.acceptManifest(mf); const accepting=receiver.acceptChunk(chunk(0));
  const offsetBeforeAppend=receiver.nextOffset; release(); await accepting;
  const offsetAfterAppend=receiver.nextOffset; receiver.beginConnection(); const offsetAfterReconnect=receiver.nextOffset;
  const changedManifest= failure(()=>receiver.acceptManifest({...mf,manifest:{...manifest,transferId:'T2'}}));
  receiver.acceptManifest(mf);
  const duplicate=await receiver.acceptChunk(chunk(0)).then(()=>null,e=>e.message);
  await receiver.dispose();
  assert.deepEqual([offsetBeforeAppend,offsetAfterAppend,offsetAfterReconnect],[0,1,1]); assert.ok(duplicate&&changedManifest);
  const transfer={offsetBeforeAppend,offsetAfterAppend,offsetAfterReconnect,changedManifest,duplicate};

  const request={kind:'execute',protocolVersion:mods.protocol.DAEMON_PROTOCOL_VERSION,...coordinates,commandName:'overview',request:{argv:['overview','src/a.ts'],cwd:'/repo',telemetryEnabled:false,executionMode:'warm'}};
  const accepted={kind:'accepted',...coordinates,acceptedAt:10,queuePosition:0};
  const encode=frames=>Buffer.concat(frames.map(f=>codec.encodeServerMessage(f)));
  const cases={};
  for(const name of ['clean','resume','reattach','wrong-offset','changed-manifest','bad-digest','ack-lost','exhausted']) {
    let scripts;
    if(name==='reattach') scripts=[[accepted],[accepted,mf,...records.map((_,i)=>chunk(i)),end]];
    else if(name==='resume') scripts=[[accepted,mf,chunk(0),chunk(1)],[mf,chunk(2),chunk(3),end]];
    else if(name==='changed-manifest') scripts=[[accepted,mf,chunk(0),chunk(1)],[{...mf,manifest:{...manifest,transferId:'T2'}}]];
    else if(name==='wrong-offset') scripts=[[accepted,mf,chunk(0),chunk(1),chunk(2,{offset:0})]];
    else if(name==='bad-digest') { const bad={...manifest,sha256:'f'.repeat(64)}; scripts=[[accepted,{...mf,manifest:bad},...records.map((_,i)=>chunk(i)),{...end,sha256:bad.sha256}]]; }
    else if(name==='exhausted') scripts=[[accepted],[accepted]];
    else scripts=[[accepted,mf,...records.map((_,i)=>chunk(i)),end]];
    const events=[]; const writes=[]; let connectionCount=0, ackCount=0, disposalCount=0, outputDisposalCount=0;
    const client=new mods.client.DaemonExecutionClient({
      codec,validator:new mods.validator.DaemonProtocolValidator(),transportPolicy:policy.transport,deliveryPolicy:policy.delivery,
      sockets:{async connect(){ const n=connectionCount++; const script=scripts[n]; if(!script) throw new Error('No scripted connection'); events.push({kind:'connect',connection:n}); return { write(bytes){ const decoded=codec.controlDecoder().append(bytes)[0]; writes.push(decoded); events.push({kind:'request',value:decoded.kind,offset:decoded.offset}); },disableTimeout(){},end(){},destroy(){}, incoming:(async function*(){ for(const frame of script){events.push({kind:'incoming',value:frame.kind??'chunk',sequence:frame.sequence,offset:frame.offset}); yield encode([frame]); } events.push({kind:'eof',connection:n});})() };}},
      lifecycle:{async acknowledgeResult(){ackCount++;events.push({kind:'ack'});if(name==='ack-lost')throw new Error('Injected lost acknowledgement');}},
      createOutput(){ const c=capture(); return { async append(r){events.push({kind:'append-start',sequence:r.sequence});await c.append(r);events.push({kind:'append-done',sequence:r.sequence});},async finish(code){events.push({kind:'capture-finish'});const value=await c.finish(code);const dispose=value.result.output.dispose.bind(value.result.output);value.result.output.dispose=async()=>{outputDisposalCount++;events.push({kind:'output-dispose'});await dispose();};return value;},async dispose(){disposalCount++;events.push({kind:'partial-dispose'});await c.dispose();} }; }
    });
    const receipt=await client.execute('scripted',request);
    let result; let error; let captured=[];
    try { result=await receipt.completion; if(result.status==='completed')for await(const r of result.result.output.records())captured.push({stream:r.stream,bytes:Buffer.from(r.bytes).toString()}); }
    catch(e){error={message:e.message,code:e.code??null,retrySafe:e.retrySafe??null,delivery:e.delivery??null};}
    cases[name]={writes,events,connectionCount,ackCount,disposalCount,outputDisposalCount,status:result?.status??'error',error,captured};
    if(result?.status==='completed')await result.result.output.dispose();
  }
  assert.equal(cases.resume.writes[1].kind,'result-fetch'); assert.equal(cases.resume.writes[1].offset,2);
  assert.deepEqual(cases.resume.captured,records.map(r=>({stream:r.stream,bytes:r.bytes.toString()})));
  assert.deepEqual(cases.reattach.writes[0],cases.reattach.writes[1]); assert.equal(cases.exhausted.connectionCount,2); assert.equal(cases.exhausted.error.retrySafe,false);
  for(const name of ['wrong-offset','changed-manifest','bad-digest']){assert.equal(cases[name].status,'error');assert.equal(cases[name].ackCount,0);}
  assert.equal(cases['ack-lost'].outputDisposalCount,1);

  const clock={wallNowMs:()=>10,monotonicNowMs:()=>1};
  const ledger=new mods.ledger.AcceptedRequestLedger(side==='head'?clock:()=>10);
  const original=ledger.accept('R7','overview',request.request);
  const identical=ledger.accept('R7','overview',request.request);
  const conflicting=failure(()=>ledger.accept('R7','overview',{...request.request,argv:['overview','other.ts']}));
  assert.equal(original,identical); assert.ok(conflicting);
  const directory=await mkdtemp(join(tmpdir(),'particle-chamber-'));
  const diagnostics=[]; const recorder={record:e=>diagnostics.push(e)};
  const spoolStore=new mods.spool.DaemonCompletionSpoolStore({directory,workspaceKey:'W1',instanceId:'I1',policy:policy.output});
  const session=new mods.delivery.DaemonDeliverySession({coordinates,journal:ledger,spoolStore,observer:new mods.observer.DaemonOperationObserver(recorder,clock),diagnostics:recorder,clock,policy:{...policy,diagnostics:{...policy.diagnostics,disconnectedTraceRetentionMs:12}}});
  session.beginAcceptedTrace('R7','overview',0,1); let onClose;
  const send=async frame=>{if(frame.sequence===2)throw new Error('Injected disconnected client');}; send.onClose=fn=>{onClose=fn;};
  await session.attach({requestId:'R7',acceptedAt:10,queuePosition:0},send);
  const spool=await session.createCompletion('R7'); for(const r of records)await spool.append(r);const storedManifest=await spool.finish(0);
  ledger.markRunning('R7',10); ledger.complete('R7',storedManifest.transferId,11);await session.trackedCompletion('R7');onClose?.();
  const retainedBefore={...session.snapshot,ledgerEntries:ledger.size};
  await new Promise(r=>setTimeout(r,35));
  const retainedAfter={...session.snapshot,ledgerEntries:ledger.size};
  assert.deepEqual(retainedBefore,retainedAfter);assert.ok(diagnostics.some(e=>e.kind.includes('expired')));
  await session.acknowledge({...coordinates,kind:'result-ack',transferId:storedManifest.transferId});
  const afterAck={...session.snapshot,ledgerEntries:ledger.size,acknowledged:ledger.isAcknowledged('R7')};
  assert.equal(afterAck.spoolBytes,0);assert.equal(afterAck.ledgerEntries,1);assert.equal(afterAck.acknowledged,true);
  await session.cleanupInstance();await rm(directory,{recursive:true,force:true});
  const replay=['not-submitted','submitted-unconfirmed','accepted'].map(delivery=>({delivery,retrySafe:new mods.errors.DaemonTransportError('closed',delivery,'Injected close','I1').retrySafe}));
  output.builds[side]={framing,transfer,cases,identity:{sameEntry:original===identical,conflicting},retention:{injectedRetentionMs:12,defaultRetentionMs:policy.diagnostics.disconnectedTraceRetentionMs,maximumDisconnectedTraces:policy.diagnostics.maximumDisconnectedTraces,retainedBefore,retainedAfter,afterAck,diagnostics},replay,limits:policy.delivery};
}
assert.deepEqual(output.builds.base,output.builds.head);
output.comparison='All recorded observations match between base CLI owners and head package owners for these fixtures.';
await mkdir(join(folder,'evidence'),{recursive:true});
await writeFile(join(folder,'evidence/observations.json'),JSON.stringify(output,null,2)+'\n');
console.log('Recorded matching base/head observations: framing, held append, eight client scenarios, identity, trace expiry, acknowledgement and replay authority.');
