import {readFile,writeFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
import assert from 'node:assert/strict';
import {readings} from '../src/content.mjs';
const out=fileURLToPath(new URL('../',import.meta.url)),root=resolve(out,'../..');
const sources=JSON.parse(await readFile(join(out,'evidence/sources.json')));
const observations=JSON.parse(await readFile(join(out,'evidence/observations.json')));
const ui=JSON.parse(await readFile(join(out,'evidence/browser-checks.json')));
assert.equal(ui.passed,true);
const clean=[];
for(const [subject,pin] of Object.entries(sources.pins)){
 const wt=join(root,'worktrees',subject);
 assert.equal(execFileSync('git',['-C',wt,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),pin);
 assert.equal(execFileSync('git',['-C',wt,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim(),'');
 clean.push(subject);
}
for(const d of sources.documents){
 const bytes=execFileSync('git',['-C',join(root,'worktrees',d.subject),'show',`${d.revision}:${d.path}`]);
 assert.equal(bytes.toString(),d.text);assert.equal(createHash('sha256').update(bytes).digest('hex'),d.sha256);
}
for(const receipt of sources.receipts.filter(r=>!['pr127','pr131'].includes(r.id))){
 const doc=sources.documents.find(d=>d.subject===receipt.subject&&d.path===receipt.path);
 assert.equal(doc.text.split(/\r?\n/).slice(receipt.start-1,receipt.end).join('\n'),receipt.text);
}
for(const r of readings)for(const id of r.sources)assert.ok(sources.receipts.some(s=>s.id===id));
for(const name of ['index.html','evidence.html']){
 const html=await readFile(join(out,name),'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const target=match[1];if(/^(https?:|data:)/.test(target))continue;
  const [file,anchor]=target.split('#');
  const destination=join(out,file||name);assert.ok(await stat(destination));
  if(anchor){const text=await readFile(destination,'utf8');assert.ok(text.includes(`id="${anchor}"`),target)}
 }
}
assert.equal(observations.cache.length,10);assert.equal(observations.delivery.length,8);assert.equal(observations.outer.length,4);
assert.deepEqual(observations.factory,{undefinedCalls:1,throwCalls:2,rejectionCalls:1});
assert.deepEqual(sources.inventories['127'],{changedFiles:6,additions:391,deletions:67,originalFiveTestsAndHelpersUnchanged:true,newServiceCases:6,newCoreCases:4});
const tests127=await readFile(join(out,'evidence/tests-127-head.txt'),'utf8');
const tests131=await readFile(join(out,'evidence/tests-131-head.txt'),'utf8');
assert.match(tests127,/Tests\s+15 passed/);assert.match(tests131,/Tests\s+35 passed/);
const readme=await readFile(join(out,'README.md'),'utf8');
for(const heading of ['Entry point','Kind','Subjects','Declared choices','What I tried','What I would drop','What I would do next','Time spent'])assert.ok(readme.includes(`## ${heading}`));
const result={passed:true,cleanTrackedWorktrees:clean,frozenDocuments:sources.documents.length,receipts:sources.receipts.length,findings:readings.length,sourceHashesAndExcerptsMatch:true,localLinksAndAnchorsExist:true,recordedCases:{cache:10,sockets:8,outerLoop:4,factoryOutcomes:3},focusedHeadTests:{pr127:15,pr131:35},readmeContract:true};
await writeFile(join(out,'evidence/static-checks.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
