const fs = require('node:fs');
const path = require('node:path');
const data = require('./inventory.json');
const {groups, decisions, groupFor} = require('./content.cjs');
const {contracts} = require('./contracts.cjs');
const root = path.resolve(__dirname,'../..');
const ts=require(path.join(root,'worktrees/pr-131-head/node_modules/typescript'));
function fields(context) {
 if(!context)return {};
 const sf=ts.createSourceFile('types.ts',context.source,ts.ScriptTarget.Latest,true);
 const decl=sf.statements[0];
 const members=decl?.members||decl?.type?.members;
 if(!members)return {'(definition)':context.source.replace(/\s+/g,' ').trim()};
 return Object.fromEntries(members.map(m=>[m.name?.getText(sf)||'(call)',m.getText(sf).replace(/\s+/g,' ').trim()]));
}
for(const subject of Object.values(data)) {
  for(const row of subject.rows) {
   row.group=groupFor(row); row.contract=contracts(row);
   if(row.before&&row.after) {
    row.before.inputChanges=[];row.after.inputChanges=[];
    for(const name of new Set([...(row.before.inputTypeNames||[]),...(row.after.inputTypeNames||[])])) {
     const a=fields(row.before.typeContext.find(t=>t.name===name)),b=fields(row.after.typeContext.find(t=>t.name===name));
     const changed=[...new Set([...Object.keys(a),...Object.keys(b)])].filter(key=>a[key]!==b[key]);
     if(changed.length){
      row.before.inputChanges.push(`Changes in ${name}:`,...changed.map(key=>a[key]||`${key}: (not present)`));
      row.after.inputChanges.push(`Changes in ${name}:`,...changed.map(key=>b[key]||`${key}: (removed)`));
     }
    }
   }
  }
  subject.policyRecord = subject.pr===131 ? fs.readFileSync(path.join(root,'worktrees/pr-131-head/plans/005/daemon-policy.md'),'utf8') : '';
  subject.patch = fs.readFileSync(path.join(root,`inputs/pr-${subject.pr}/diff.patch`),'utf8');
}
const supplemental = [
 [131,'packages/daemon/src/daemon-policy.ts'],
 [131,'packages/daemon/src/daemon-policy.test.ts'],
 [131,'packages/daemon/src/daemon-policy-test-factory.ts'],
 [131,'plans/005/daemon-policy.md'],
 [127,'packages/backend-typescript/src/definition/find-definitions.ts'],
 [127,'packages/backend-typescript/src/call-graph/find-callees.ts'],
 [127,'packages/backend-typescript/src/call-graph/find-callers.ts'],
];
for(const [pr,file] of supplemental) for(const side of ['base','head']) {
 const absolute=path.join(root,`worktrees/pr-${pr}-${side}`,file);
 if(fs.existsSync(absolute))data[pr].sources[`${side}:${file}`]=fs.readFileSync(absolute,'utf8');
}
for(const d of decisions)for(const e of d.refs){
 const source=data[e.pr].sources[`${e.side}:${e.file}`];
 if(source===undefined)throw new Error(`Missing source ${e.file}`);
 const offset=source.indexOf(e.needle);
 if(offset<0)throw new Error(`Missing anchor ${d.id}: ${e.needle} in ${e.file}`);
 e.line=source.slice(0,offset).split('\n').length;
}
const policyRows=data[131].policyRecord.split('\n').filter(l=>l.startsWith('| `') && !l.includes('recipe.')).map(l=>{
 const c=l.split('|').slice(1,-1).map(s=>s.trim().replace(/`/g,''));
 return {key:c[0],value:c[1],use:c[2],reason:c[3],oracle:c[4]};
});
fs.writeFileSync(path.join(__dirname,'data.js'),'window.CONTRACT_DATA = '+JSON.stringify({subjects:data,groups,decisions,policyRows}).replace(/</g,'\\u003c')+';\n');
const counts=Object.fromEntries(Object.entries(data).map(([pr,s])=>[pr,{callables:s.rows.length,production:s.rows.filter(r=>r.lane==='production').length,support:s.rows.filter(r=>r.lane==='support').length,modules:s.modules.length,productionModules:s.modules.filter(m=>m.lane==='production').length}]));
fs.writeFileSync(path.join(__dirname,'coverage.json'),JSON.stringify({scope:'Union of public callable declarations in changed TS modules. Overloads grouped with their implementation. Default constructors synthesized only without an extends clause. Re-export fanout and inherited members are not expanded.',counts,modules:Object.fromEntries(Object.entries(data).map(([p,s])=>[p,s.modules.map(m=>({file:m.file,lane:m.lane,callables:m.count}))]))},null,2));
console.log(JSON.stringify(counts));
console.log(`Embedded ${decisions.length} decisions, ${decisions.flatMap(d=>d.refs).length} checked source anchors, ${policyRows.length} policy leaves.`);
