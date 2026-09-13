const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root=path.resolve(__dirname,'..');
const model=require(path.join(root,'model.js'));
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),context);
vm.runInNewContext(fs.readFileSync(path.join(root,'evidence.js'),'utf8'),context);
const {CONTENT,EVIDENCE}=context.window;
const checks=[];
function check(name,fn){fn();checks.push({name,passed:true});}
check('Consumer dependencies change only at the cutover',()=>{
  assert.equal(model.at(0).caller,'cli');assert.equal(model.at(1).caller,'cli');assert.equal(model.at(2).caller,'package');
  assert.equal(model.lift(0).available,false);assert.equal(model.lift(1).allowed,true);assert.equal(model.lift(2).allowed,false);
  assert.equal(model.lift(2).pins.length,3);
});
check('Stage 148 retains old body; 149 removes it and seals the cap',()=>{
  assert.equal(model.at(1).oldBodyPresent,true);assert.equal(model.at(1).frozen,true);
  assert.equal(model.at(2).oldBodyPresent,false);assert.equal(model.at(2).capPresent,true);
});
check('Pieces are connected, disjoint and stay in named grid slots',()=>{
  for(const cells of [model.body,model.cap]){
    let visited=new Set([cells[0].join(',')]);let changed=true;
    while(changed){changed=false;for(const [x,y]of cells){if(visited.has([x,y].join(',')))continue;if([[x+1,y],[x-1,y],[x,y+1],[x,y-1]].some(p=>visited.has(p.join(',')))){visited.add([x,y].join(','));changed=true;}}}
    assert.equal(visited.size,cells.length);
    for(const [x,y] of cells){assert(x>=0&&x<4&&y>=0&&y<4);}
  }
  assert.equal(new Set([...model.body,...model.cap].map(x=>x.join(','))).size,11);
});
check('All eight root records have reasons and resolve every source',()=>{
  assert.equal(CONTENT.decisions.length,8);
  for(const d of CONTENT.decisions){assert(d.summary&&d.reason&&d.mechanism);for(const s of d.sources)assert(EVIDENCE.sources[s],s);}
});
check('Pinned source receipts match their captured source hashes and slices',()=>{
  const crypto=require('node:crypto');const full=JSON.parse(fs.readFileSync(path.join(root,'evidence/sources.json'),'utf8'));
  for(const [key,s] of Object.entries(full)){
    assert.equal(crypto.createHash('sha256').update(s.full).digest('hex'),s.hash,key);
    assert.equal(s.full.split(/\n/).slice(s.start-1,s.end).join('\n'),s.text,key);
    assert(fs.existsSync(path.join(root,'evidence',key+'.html')));
  }
});
check('The principal counts are extracted, not geometric area',()=>{
  assert.equal(EVIDENCE.inventory.frozenFiles.length,38);
  assert.equal(EVIDENCE.inventory.freezeDigest,EVIDENCE.inventory.freezeExpected);
  assert.equal(EVIDENCE.inventory.testMoves.length,37);
  assert.equal(EVIDENCE.inventory.removedScenarios.length,10);
});
const result={scope:'Artifact model and captured evidence integrity; not a symnav correctness test.',checks};
fs.writeFileSync(path.join(root,'verification-static.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
