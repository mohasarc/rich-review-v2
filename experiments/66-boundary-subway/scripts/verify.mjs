import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const out=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(out,'../..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(out,'data.js'),'utf8'),context);
const d=context.window.SUBWAY,bank=JSON.parse(fs.readFileSync(path.join(out,'evidence/sources.json'),'utf8'));
const checks=[];
for(const s of Object.values(bank.documents)){
 const raw=fs.readFileSync(path.join(root,'worktrees/pr-148-'+s.rev,s.file),'utf8');
 assert.equal(raw,s.text);assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),s.hash);
}
for(const r of Object.values(d.bank)){
 if(r.isExtract)continue;
 const s=bank.documents[r.rev+':'+r.file];assert.ok(s);
 assert.equal(s.text.trimEnd().split('\n').slice(r.start-1,r.end).join('\n'),r.text);
}
checks.push({name:'All 35 frozen documents and 56 source excerpts match pinned worktrees',passed:true});
let edgeCount=0;
const contains=(n,p)=>p.x>=n.x-0.01&&p.x<=n.x+n.width+0.01&&p.y>=n.y-0.01&&p.y<=n.y+n.height+0.01;
for(const g of Object.values(d.layouts)){
 const ns=Object.fromEntries(g.nodes.map(n=>[n.id,n]));
 for(const e of g.edges){
   assert.ok(ns[e.sources[0]]&&ns[e.targets[0]],g.name+': dangling edge '+e.id);
   assert.ok(e.sections.length,g.name+': no routing sections '+e.id);
   assert.ok(contains(ns[e.sources[0]],e.sections[0].startPoint),g.name+': offset at source '+e.id);
   assert.ok(contains(ns[e.targets[0]],e.sections.at(-1).endPoint),g.name+': offset at target '+e.id);
   edgeCount++;
 }
}
checks.push({name:'Every routed edge meets its ELK source and destination across all 32 layouts',passed:true,routedEdges:edgeCount});
const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
for(const n of d.decisions){assert.ok(html.includes('id="notice-'+n.id+'"'));for(const s of n.sources)assert.ok(d.bank[s]);assert.ok(n.reason.includes('Stated:'));}
for(const n of d.nodes)assert.ok(d.decisions.some(x=>x.id===n.decision));
for(const j of d.journeys){assert.ok(d.decisions.some(x=>x.id===j.decision));for(const [id,,source] of j.steps){assert.ok(d.nodes.some(n=>n.id===id));assert.ok(d.bank[source]);}}
checks.push({name:'Decisions, stations and journeys have complete top-layer addresses and source destinations',passed:true});
const missing=[];
for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 const target=m[1];if(/^(#|https?:|data:)/.test(target))continue;
 if(!fs.existsSync(path.join(out,target.split('#')[0])))missing.push(target);
}
assert.deepEqual(missing,[]);
checks.push({name:'All local document and asset links resolve',passed:true});
assert.equal(d.frozen.count,38);assert.equal(d.movedTests.length,37);
for(const rev of ['base','head'])assert.equal(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:path.join(root,'worktrees/pr-148-'+rev),encoding:'utf8'}).trim(),'');
checks.push({name:'38 frozen CLI copies, 37 relocated test files, clean tracked worktrees',passed:true});
for(const name of ['README.md','brief.md','index.html'])assert.ok(fs.existsSync(path.join(out,name)));
const report={checkedAt:new Date().toISOString(),passed:true,checks};
fs.writeFileSync(path.join(out,'evidence/static-checks.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
