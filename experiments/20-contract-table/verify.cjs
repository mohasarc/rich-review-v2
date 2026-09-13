const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'data.js'),'utf8'),context);
const {subjects,groups,decisions,policyRows}=context.window.CONTRACT_DATA;
let checkedSides=0,checkedFields=0;
const report={scope:'Artifact integrity checks, not symnav correctness tests',counts:{},checks:[]};
for(const [pr,s] of Object.entries(subjects)) {
 const patchFiles=[...s.patch.matchAll(/^diff --git a\/(.*?) b\/(.*?)$/gm)].map(m=>m[2]);
 assert.equal(s.modules.length,patchFiles.length);
 assert.deepEqual(new Set(s.modules.map(m=>m.file)),new Set(patchFiles));
 assert.equal(s.modules.reduce((n,m)=>n+m.count,0),s.rows.length);
 assert.equal(new Set(s.rows.map(r=>r.id)).size,s.rows.length);
 assert.equal(new Set(s.rows.map(r=>r.file+'::'+r.key)).size,s.rows.length);
 for(const r of s.rows){
  assert.equal(groups[r.group].pr,Number(pr));
  for(const side of ['before','after']){
   const c=r[side],a=r.contract[side];assert.equal(c===null,a===null);
   if(!c)continue;
   const source=s.sources[`${side==='before'?'base':'head'}:${r.file}`];
   assert.equal(typeof source,'string');
   assert(c.line>=1&&c.line<=source.split('\n').length);
   assert(c.endLine>=c.line);
   if(!c.synthetic)assert(source.split('\n').slice(c.line-1,c.endLine).join('\n').includes(c.source));
   for(const k of ['outcome','errors','effects']){assert(a[k]&&typeof a[k]==='string');checkedFields++;}
   checkedSides++;
  }
 }
 report.counts[pr]={modules:s.modules.length,rows:s.rows.length,production:s.rows.filter(r=>r.lane==='production').length,support:s.rows.filter(r=>r.lane==='support').length};
}
for(const d of decisions){
 assert(['stated','unexplained'].includes(d.status));assert(d.reason&&d.before&&d.after);
 for(const r of d.refs){const source=subjects[r.pr].sources[`${r.side}:${r.file}`];assert(source.includes(r.needle));assert.equal(source.slice(0,source.indexOf(r.needle)).split('\n').length,r.line);}
}
for(const g of Object.values(groups))for(const id of g.ids)assert(decisions.some(d=>d.id===id));
assert.equal(policyRows.length,39);assert.equal(new Set(policyRows.map(p=>p.key)).size,39);
report.checks.push('Every changed module is represented, including zero-callable test and entry modules.','Callable identifiers are unique and per-module counts reconcile.','Every present side has outputs, errors and effects; absent sides have no invented contract.','Every extracted member source is contained at the recorded source lines.','Every decision has a rationale status and valid source anchors.','All 39 policy leaves have distinct keys.');
report.checkedCallableSides=checkedSides;report.checkedContractFields=checkedFields;report.decisions=decisions.length;report.sourceAnchors=decisions.flatMap(d=>d.refs).length;
fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
