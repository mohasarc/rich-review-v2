import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const dir=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(dir,'../..'),repo=path.join(root,'worktrees/stack-head');
const read=p=>fs.readFileSync(path.join(dir,p),'utf8');
const context={window:{}};vm.runInNewContext(read('data.js'),context);vm.runInNewContext(read('facts.js'),context);
const d=context.window.CITY_DATA,facts=context.window.CITY_FACTS,capture=JSON.parse(read('evidence/capture.json'));
const readings=JSON.parse(read('src/readings.json'));
const git=(...args)=>execFileSync('git',['-C',repo,...args],{encoding:'utf8',maxBuffer:20e6});
assert.equal(d.snapshots.length,27);assert.equal(d.files.length,356);assert.equal(new Set(d.files.map(f=>f.path)).size,356);
let sourceRefs=0,patches=0;const blobs=new Set();
for(const f of d.files){
 vm.runInNewContext(read(`evidence/files/${f.id}.js`),context);const file=context.window.CITY_SOURCES[f.id];assert.equal(file.path,f.path);
 for(const [oid,source] of Object.entries(file.sources)){
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'),capture.sourceHashes[oid]);blobs.add(oid);
  assert.equal(crypto.createHash('sha1').update(`blob ${Buffer.byteLength(source)}\0`).update(source).digest('hex'),oid);
 }
 for(let i=0;i<27;i++){
  const s=d.snapshots[i][f.id];assert.equal(s.length,7);assert(s[5]<=i);assert(s.slice(0,6).every(n=>Number.isInteger(n)&&n>=0));
  if(s[0]){assert.equal(typeof file.sources[s[6]],'string');sourceRefs++;}else assert.equal(s[6],null);
  if(s[5])assert.equal(typeof file.diffs[s[5]],'string');
 }
 patches+=Object.keys(file.diffs).length;
}
assert.equal(blobs.size,767);
const missing=[];
for(const r of readings)for(const p of r.files)if(!d.files.some(f=>f.path===p))missing.push(p);
assert.deepEqual(missing,[]);
assert.equal(facts.frozen.length,38);assert.equal(facts.testMoves.length,37);
for(const p of facts.frozen){const f=d.files.find(f=>f.path===p);assert.equal(d.snapshots[25][f.id][0],1);assert.equal(d.snapshots[26][f.id][0],0);}
const restored=d.files.find(f=>f.path==='apps/cli/src/daemon-executor.test.ts');
assert(context.window.CITY_SOURCES[restored.id].sources[d.snapshots[25][restored.id][6]].includes('rejects a product version that does not match the CLI'));
const remaining=d.files.filter(f=>f.district==='cli'&&f.owner==='daemon'&&d.snapshots[26][f.id][0]);assert(remaining.every(f=>f.role==='test'));
// Each historical white road is a selected source call/construction chain, not a trace.
for(let i=0;i<27;i++){
 const sha=d.revisions[i],entry=git('show',`${sha}:apps/cli/src/cli.ts`);
 if(i<26){assert(entry.includes('DaemonCommandDispatcher'));assert(git('show',`${sha}:apps/cli/src/daemon/daemon-command-dispatcher.ts`).includes('LocalDaemonTransport'));}
 else{assert(entry.includes('CliInvocationCoordinator'));assert(git('show',`${sha}:apps/cli/src/cli-invocation-coordinator.ts`).includes('this.options.daemonClient.execute'));}
}
// Independent selected size checks, including the copy and demolition steps.
const sizeChecks=[];
for(const i of [1,7,13,24,25,26]){
 const lines=git('diff','--no-renames','--numstat',d.revisions[i-1],d.revisions[i]).trim().split('\n');
 const counts=lines.filter(l=>!l.startsWith('-\t')&&!l.endsWith('.DS_Store')).map(l=>l.split('\t'));
 const totals=[counts.reduce((n,l)=>n+Number(l[0]),0),counts.reduce((n,l)=>n+Number(l[1]),0)];
 assert.equal(totals[0],d.prs[i-1].surface.add);assert.equal(totals[1],d.prs[i-1].surface.delete);sizeChecks.push({step:i,totals});
}
const html=read('index.html');assert.equal((html.match(/class="reading"/g)||[]).length,7);
for(const file of ['index.html','README.md','brief.md','app.js','style.css','data.js','facts.js'])assert(fs.existsSync(path.join(dir,file)),`Missing ${file}`);
const statuses={};for(const name of ['main','stack-head'])statuses[name]=execFileSync('git',['-C',path.join(root,'worktrees',name),'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim();
assert(Object.values(statuses).every(x=>x===''));
const report={passed:true,skylines:27,physicalPaths:356,uniqueSourceBlobs:blobs.size,sourceReferences:sourceRefs,perPathPatches:patches,readings:7,frozenFiles:38,movedTests:37,cliDaemonConcernAtTip:remaining.map(f=>f.path),whiteRoadSourceChecks:27,sizeChecks,sourceHashes:'all receipt blobs match capture SHA-256',worktreeTrackedStatus:statuses,scope:'Artifact data/source verification only. No symnav test suite or production execution.'};
fs.writeFileSync(path.join(dir,'evidence/static-checks.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
