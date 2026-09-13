import {readFileSync as read,writeFileSync as write,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),ctx={window:{}};
vm.runInNewContext(read(resolve(root,'data/instrument.js'),'utf8'),ctx);const d=ctx.window.INSTRUMENT;
const checks=[];
const pass=(check,detail)=>checks.push({check,pass:true,detail});
const sha=t=>createHash('sha256').update(t).digest('hex');
for(const build of ['base','head']){
 const wt=resolve(root,'../../worktrees/pr-127-'+build);const git=(...a)=>execFileSync('git',['-C',wt,...a],{encoding:'utf8'}).trim();
 assert.equal(git('rev-parse','HEAD'),d.pins[build]);assert.equal(git('status','--porcelain','--untracked-files=no'),'');
}
pass('Supplied worktrees remain pinned with no tracked modifications',d.pins);
for(const r of d.receipts.filter(r=>r.build!=='bundle')){
 const full=execFileSync('git',['-C',resolve(root,'../../worktrees/pr-127-'+r.build),'show',r.commit+':'+r.path],{encoding:'utf8'});
 assert.equal(sha(full),r.fileSha256);assert.equal(full.split('\n').slice(r.start-1,r.end).join('\n'),r.text);
}
assert.match(d.receipts.find(r=>r.id==='release-head').text,/await this.projects\?\.releaseTransientResources\(\)/);
assert.doesNotMatch(d.receipts.find(r=>r.id==='release-base').text,/await/);
assert.match(d.receipts.find(r=>r.id==='backend-head').text,/await this.semanticQueries.releaseTransientResources/);
assert.match(d.receipts.find(r=>r.id==='lifetime-head').text,/this.values.has\(key\)/);
pass('All source excerpts match pinned Git objects; release excerpts contain the actual await change',d.receipts.length-1);
let totalNotes=0;
for(const scenario of d.scores)for(const [build,run] of Object.entries(scenario.runs)){
 const raw=read(resolve(root,run.path),'utf8'),t=JSON.parse(raw);assert.equal(sha(raw),run.sha256);assert.equal(t.commit,d.pins[build]);
 for(let i=0;i<run.events.length;i++){
  const e=run.events[i];assert.ok(!i||run.events[i-1].seq<e.seq);assert.ok(d.rows[e.row]);
  for(const seq of e.seqs)assert.ok(t.events.some(r=>r.seq===seq));
  assert.ok(d.receipts.some(r=>r.id===e.source),`${scenario.id}/${build}/${e.source}`);
  if(e.type==='clear'){assert.equal(e.seqs.length,6);assert.ok(e.seqs.every(seq=>t.events.find(r=>r.seq===seq).kind==='clear'));}
  const c=run.checkpoints[i];if(c.relation==='pending'){assert.equal(c.backend,'pending');assert.equal(c.graph,'pending');}if(c.relation==='following'){assert.equal(c.backend,'pending');assert.ok(['fulfilled','rejected'].includes(c.graph));}
 }
 if(scenario.group==='release'){
  const graph=t.calls.find(c=>c.track==='graph'&&c.label.includes('releaseTransientResources'));
  const backend=t.calls.find(c=>c.track==='backend'&&c.label.includes('releaseTransientResources'));
  const clears=run.events.find(e=>e.type==='clear').seqs;assert.ok(Math.max(...clears)<graph.startSeq);
  if(build==='head')assert.ok(backend.settleSeq>graph.settleSeq);
  if(build==='base'&&scenario.id!=='release-sync')assert.ok(backend.settleSeq<graph.settleSeq);
  if(scenario.id==='release-held-rejects'){assert.equal(graph.outcome,'rejected');assert.equal(backend.outcome,build==='head'?'rejected':'fulfilled');assert.equal(t.calls.filter(c=>c.track==='projects'&&c.lane==='inferred').length,0);}
  if(scenario.id==='release-held')assert.ok(t.notes.includes('answer refilled during pending release survives completion: true'));
 }else if(scenario.id==='refresh-fails'){
  assert.equal(run.events.filter(e=>e.type==='clear').length,0);assert.equal(run.events.at(-1).type,'hit');assert.equal(run.checkpoints.at(-1).cache,'old entry');assert.ok(t.notes.includes('answer identity preserved across failed refresh: true'));
 }else if(scenario.id==='late-answer'){
  assert.equal(run.initialCache,'empty');assert.equal(run.events.at(-1).type,'hit');assert.equal(run.checkpoints.at(-1).cache,'new entry');assert.ok(t.notes.includes('new-turn answer kept after old settles: true'));
 }
 totalNotes+=run.events.length;
}
pass('Every arranged note maps to the raw recording, in order; all six scenarios satisfy their stated observations',{recordings:12,selectedNotes:totalNotes});
assert.equal(d.inventory.oldServiceTests,5);assert.equal(d.inventory.newServiceTests,11);assert.equal(d.inventory.coreTests,4);assert.equal(d.inventory.originalCasesAndHelpersIdentical,true);
assert.match(read(resolve(root,'evidence/focused-tests.txt'),'utf8'),/15 passed/);pass('Test additions and unchanged old cases reconcile with the focused 15-test run',d.inventory);
const html=read(resolve(root,'index.html'),'utf8'),css=read(resolve(root,'style.css'),'utf8');
assert.equal((html.match(/class="decision"/g)||[]).length,6);
for(const path of [...html.matchAll(/(?:src|href)="([^"#]+)(?:#[^"]*)?"/g)].map(m=>m[1]).filter(p=>!p.startsWith('data:')&&!/^[a-z]+:/.test(p)))assert.ok(existsSync(resolve(root,path)),path);
assert.doesNotMatch(css,/@import/);
for(const path of ['app.js','sound.js'])assert.doesNotMatch(read(resolve(root,path),'utf8'),/localStorage|sessionStorage|indexedDB|fetch\(/);
pass('Complete notes, local entry dependencies and no persistence or runtime fetching');
write(resolve(root,'evidence/static-checks.json'),JSON.stringify({date:new Date().toISOString(),checks},null,2));console.log(JSON.stringify({checks:checks.length,selectedNotes:totalNotes},null,2));
