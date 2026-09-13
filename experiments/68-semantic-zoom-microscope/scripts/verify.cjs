const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const out = path.resolve(__dirname, '..'), root = path.resolve(out, '../..');
const context = {window:{}};
for (const file of ['content.js','sources.js','recordings.js']) vm.runInNewContext(fs.readFileSync(path.join(out,file),'utf8'),context);
const M=context.window.MICROSCOPE, S=context.window.SOURCES, R=context.window.RECORDINGS;
const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
const book=fs.readFileSync(path.join(out,'source-book.html'),'utf8');
const notes=[...html.matchAll(/data-note="(.*?)"/g)].map(m=>m[1]);
assert.equal(notes.length,8);
let references=0;
for(const f of M.features){
  assert(notes.includes(f.note),f.id+' has no top-layer parent');
  for(const [key,from,to] of f.refs){
    const source=S.sources[key];assert(source,key);assert(from>=1 && to>=from && to<=source.lines.length,`${f.id} invalid ${key}:${from}-${to}`);
    assert(book.includes(`id="${key}-L${from}"`));references++;
  }
}
for(const source of Object.values(S.sources)){
  if(source.side==='bundle')continue;
  const worktree=path.join(root,'worktrees','pr-148-'+source.side);
  const disk=fs.readFileSync(path.join(worktree,source.path));
  const pinned=cp.execFileSync('git',['show',source.sha+':'+source.path],{cwd:worktree});
  assert(disk.equals(pinned),source.path+' differs from pin');
  assert.equal(crypto.createHash('sha256').update(disk).digest('hex'),source.sha256);
}
assert.equal(S.sources.before.sha256,S.sources.compatibility.sha256);
assert.equal(S.sources['before-tests'].sha256,S.sources['compatibility-tests'].sha256);
assert.equal(R.rows.length,17);
for(const row of R.rows){
  assert.deepEqual(row.base,row.head);assert(M.features.some(f=>f.id===M.sampleFeatures[row.id]));
  assert.equal(row.head.effects.read,1);
  if(row.stop<4)assert.equal(row.head.effects.observe,0);
  assert.equal(row.head.effects.remove,['exited','cleanup-error'].includes(row.id)?1:0);
}
const states={};
for(const side of ['base','head'])states[side]=cp.execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:path.join(root,'worktrees','pr-148-'+side),encoding:'utf8'}).trim();
assert.equal(states.base,'');assert.equal(states.head,'');
const evidence={sources:Object.keys(S.sources).length,references,features:M.features.length,topReadings:notes.length,controlledPairs:R.rows.length,cliDispatcherAndTestsByteIdentical:true,trackedWorktrees:states,scope:'Routing selection and its immediate caller boundary. No whole-PR decision or test census is claimed.'};
fs.writeFileSync(path.join(out,'evidence/static-checks.json'),JSON.stringify(evidence,null,2)+'\n');
fs.writeFileSync(path.join(out,'evidence/pyramid-map.json'),JSON.stringify(M.features.map(f=>({feature:f.id,topReading:f.note,box:f.short,mechanism:f.mechanism,evidence:f.refs})),null,2)+'\n');
console.log(JSON.stringify(evidence,null,2));
