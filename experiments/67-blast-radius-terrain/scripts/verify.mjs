import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const out=path.resolve(import.meta.dirname,'..'),root=path.resolve(out,'../..');
const data=JSON.parse(fs.readFileSync(path.join(out,'src/data.json'),'utf8'));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const checks=[];
function check(name,run){const details=run();checks.push({name,pass:true,details});}
const source=(side,file)=>data.sources[side+'--'+file.replaceAll('/','--')];
check('Frozen sources equal the supplied worktrees and Git revisions',()=>{
 for(const [side,sha] of Object.entries(data.pins)){
   const wt=path.join(root,'worktrees/pr-131-'+side);
   assert.equal(execFileSync('git',['-C',wt,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),sha);
   assert.equal(execFileSync('git',['-C',wt,'status','--short','--untracked-files=no'],{encoding:'utf8'}).trim(),'');
 }
 for(const doc of Object.values(data.sources)){
   assert.equal(hash(doc.text),doc.hash);
   if(doc.side!=='bundle'){
     const wt=path.join(root,'worktrees/pr-131-'+doc.side);
     assert.equal(fs.readFileSync(path.join(wt,doc.file),'utf8'),doc.text);
     assert.equal(execFileSync('git',['-C',wt,'show',doc.sha+':'+doc.file],{encoding:'utf8',maxBuffer:10*1024*1024}),doc.text);
   }
 }
 return {sourceDocuments:Object.keys(data.sources).length,worktreesClean:true,pins:data.pins};
});
check('Input patch and unchanged policy owner',()=>{
 const patch=fs.readFileSync(path.join(root,'inputs/pr-131/diff.patch'),'utf8');
 assert.equal(hash(patch),data.patchHash);
 const entries=patch.split(/^diff --git /m).slice(1);assert.equal(entries.length,60);
 assert.equal(patch.split('\n').filter(l=>l.startsWith('+')&&!l.startsWith('+++')).length,1298);
 assert.equal(patch.split('\n').filter(l=>l.startsWith('-')&&!l.startsWith('---')).length,544);
 for(const f of ['packages/daemon/src/daemon-policy.ts','packages/daemon/src/daemon-policy.test.ts'])assert.equal(source('base',f).hash,source('head',f).hash);
 return {files:60,additions:1298,deletions:544,centralPolicyAndTestsUnchanged:true};
});
check('Resolved references have exact file/line/column receipts',()=>{
 for(const side of ['base','head']){
   assert.equal(data.diagnostics[side].syntaxErrors,0);assert.equal(data.diagnostics[side].semanticErrors,0);
   for(const r of data.references[side]){
     assert.ok(r.file.startsWith('apps/cli/src/'));assert.ok(!r.file.includes('.test.'));
     const text=data.sources[r.source].text;
     const offset=text.split('\n').slice(0,r.line-1).reduce((sum,line)=>sum+line.length+1,0)+r.column-1;
     assert.equal(text.slice(offset,offset+r.expression.length),r.expression);
   }
 }
 return {headAccesses:data.references.head.length,baseAccesses:data.references.base.length,diagnostics:data.diagnostics};
});
check('Source footprint and exact shared-file sets',()=>{
 // Independent expected counts from the file-order source audit; never a risk score.
 const expected={output:7,startup:6,shutdown:6,resources:4,diagnostics:3,transport:1,delivery:1};
 for(const peak of data.peaks){
   assert.equal(peak.count,expected[peak.id]);
   assert.deepEqual(peak.files,[...new Set(data.references.head.filter(x=>x.section===peak.id).map(x=>x.file))].sort());
 }
 assert.equal(new Set(data.peaks.flatMap(x=>x.files)).size,17);
 for(const l of data.links){
   const a=data.peaks.find(p=>p.id===l.source),b=data.peaks.find(p=>p.id===l.target);
   assert.deepEqual(l.files,a.files.filter(f=>b.files.includes(f)));assert.equal(l.count,l.files.length);
 }
 assert.equal(data.links.length,13);assert.equal(data.ridges.length,6);
 const strongest=data.links.find(l=>l.source==='startup'&&l.target==='shutdown');
 assert.deepEqual(strongest.files.map(f=>path.basename(f)),['daemon-command-dispatcher.ts','daemon-startup-coordinator.ts','workspace-daemon.ts']);
 return {expected,distinctFiles:17,overlaps:13,ridges:6,strongestSharedFiles:strongest.files};
});
check('Every authored mechanism belongs to an open surface record',()=>{
 const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
 assert.equal(data.records.length,13);
 for(const r of data.records){
   assert.ok(html.includes('id="survey-'+r.id+'"'));assert.ok(html.includes('id="reading-'+r.id+'"'));
   assert.ok(r.summary&&r.reason&&r.title&&r.detail&&r.receipts.length);
   assert.ok(['Stated','Unexplained'].includes(r.status));
   for(const e of r.receipts){
     const doc=data.sources[e.source],lines=doc.text.split('\n');
     assert.ok(lines[e.line-1].includes(e.needle));assert.ok(e.start<=e.line&&e.end>=e.line&&e.end<=lines.length);
     const file=fs.readFileSync(path.join(out,'evidence/source',doc.id+'.html'),'utf8');
     assert.ok(file.includes('id="L'+e.line+'"'));
   }
 }
 return {records:13,stated:8,unexplained:5,receipts:data.records.reduce((n,r)=>n+r.receipts.length,0),semanticPyramidAudit:'Authored crosswalk in evidence/pyramid-map.json; this structural check does not prove semantic completeness.'};
});
check('Output folder contract and local file links',()=>{
 for(const file of ['README.md','brief.md','index.html','app.js','style.css','THIRD-PARTY-NOTICES.txt'])assert.ok(fs.existsSync(path.join(out,file)),file);
 const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
 const links=[...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
 for(const href of links){
   if(/^(?:data:|https?:|#)/.test(href))continue;
   assert.ok(fs.existsSync(path.join(out,href.split('#')[0])),href);
 }
 return {localLinks:links.filter(x=>!x.startsWith('#')).length};
});
const result={checkedAt:new Date().toISOString(),passed:true,checks};
fs.writeFileSync(path.join(out,'evidence/static-checks.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
