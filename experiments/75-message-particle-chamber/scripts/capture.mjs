import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const out=resolve(fileURLToPath(new URL('..',import.meta.url))), root=resolve(out,'../..');
const head='20838f8dbf413e04767543eb2380d0d114da6c60',base='ba53c8e1662fd86d198b95321c90d9c9bef10184';
const entries=[
 ['codec','transport/wire-codec.ts',1,68,'4-byte envelope; separate limits'],
 ['decode','transport/wire-codec.ts',115,164,'Buffer fragments until a complete frame exists'],
 ['binary','transport/wire-codec.ts',168,258,'Binary header and per-chunk SHA-256'],
 ['manifest','transport/result-transfer-receiver.ts',18,92,'Identity, manifest equality and append barrier'],
 ['finish','transport/result-transfer-receiver.ts',94,176,'End, summary validation and output ownership'],
 ['reattach','transport/execution-client.ts',43,80,'Bounded reattachment of the identical request'],
 ['resume','transport/execution-client.ts',115,151,'Bounded result-transfer recovery'],
 ['fetch','transport/execution-client.ts',296,375,'Fetch the next record; validate, then acknowledge'],
 ['ack-client','transport/execution-client.ts',210,240,'Acknowledgement precedes caller completion'],
 ['retry','transport/transport-error.ts',14,43,'Replay authority depends on delivery state'],
 ['capture-owner','client/daemon-client-runtime.ts',94,105,'The package constructs result capture'],
 ['runtime','client/daemon-client-runtime.ts',185,224,'Warm failures and local fallback authority'],
 ['ledger','execution/accepted-request-ledger.ts',52,108,'Matching identity attaches; conflicting payload rejects'],
 ['ack-ledger','execution/accepted-request-ledger.ts',170,205,'Acknowledgement is a Set entry; ledger is retained'],
 ['ack-server','delivery/delivery-session.ts',185,216,'Matching transfer acknowledgement cleans up spool'],
 ['expiry','delivery/delivery-session.ts',389,456,'Only disconnected diagnostic traces expire; capacity also bounds them'],
 ['spool','delivery/completion-spool.ts',259,295,'Record-based reads and acknowledgement disposal'],
 ['limits','daemon-policy.ts',127,160,'Current recovery and trace-retention limits'],
 ['eviction','plans/005/daemon-follow-ups-functional-spec.md',1,8,'Follow-up behavior is deferred',true],
 ['eviction-detail','plans/005/daemon-follow-ups-functional-spec.md',80,94,'Ledger eviction is a future behavior',true],
 ['freeze','meta-tests/src/daemon-compatibility-copy.test.ts',1,77,'Freeze active CLI compatibility copies',true],
 ['capture-test','client/daemon-client.test.ts',149,186,'New package client capture and execution characterization'],
];
const receipts=[];
for(const [id,p,start,end,title,isRoot]of entries){const path=isRoot?p:'packages/daemon/src/'+p;const content=await readFile(join(root,'worktrees/pr-148-head',path),'utf8');const lines=content.split('\n');receipts.push({id,title,side:'head',revision:head,path,start,end:Math.min(end,lines.length),sha256:createHash('sha256').update(content).digest('hex'),text:lines.slice(start-1,end).join('\n')});}
const pr=JSON.parse(await readFile(join(root,'inputs/pr-148/pr.json'),'utf8'));
const bodyLines=pr.body.split('\n');
const intentStart=bodyLines.findIndex(line=>line.startsWith('- Chose package staging'));
assert.ok(intentStart>=0);
receipts.push({id:'intent',title:'PR 148: stated staging and output-ownership reasons',side:'bundle',revision:head,path:'inputs/pr-148/pr.json → body (body line numbers)',start:intentStart+1,end:intentStart+2,text:bodyLines.slice(intentStart,intentStart+2).join('\n')});
const pairs=[['daemon-wire-codec.test.ts','transport/wire-codec.test.ts'],['daemon-result-transfer-receiver.test.ts','transport/result-transfer-receiver.test.ts'],['daemon-execution-client.test.ts','transport/execution-client.test.ts'],['daemon-delivery-session.test.ts','delivery/delivery-session.test.ts']];
const tests=[];
for(const [bp,hp]of pairs){const a=await readFile(join(root,'worktrees/pr-148-base/apps/cli/src/daemon',bp),'utf8');const b=await readFile(join(root,'worktrees/pr-148-head/packages/daemon/src',hp),'utf8');const clean=s=>s.replace(/^import[\s\S]*?;\n/gm,'').replace('new AcceptedRequestLedger(() => 1)','new AcceptedRequestLedger({ wallNowMs: () => 1 })');assert.equal(clean(a),clean(b));tests.push({basePath:'apps/cli/src/daemon/'+bp,headPath:'packages/daemon/src/'+hp,baseSha256:createHash('sha256').update(a).digest('hex'),headSha256:createHash('sha256').update(b).digest('hex'),bodyEquivalent:true,normalization:'Remove imports; adapt the delivery-test fake clock constructor only.'});}
receipts.push({id:'tests',title:'Four focused test moves: assertion bodies retained',side:'comparison',revision:head,path:'evidence/test-inventory.json',start:1,text:JSON.stringify({base,head,tests},null,2)});
await mkdir(join(out,'evidence'),{recursive:true});await writeFile(join(out,'evidence/receipts.json'),JSON.stringify(receipts,null,2)+'\n');await writeFile(join(out,'evidence/test-inventory.json'),JSON.stringify(tests,null,2)+'\n');
console.log(`Captured ${receipts.length} source receipts; four test bodies retained.`);
