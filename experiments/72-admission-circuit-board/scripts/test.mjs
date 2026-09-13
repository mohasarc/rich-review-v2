import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {readings} from '../src/content.js';
import {traces,components} from '../src/topology.mjs';
fs.mkdirSync('.cache',{recursive:true});
await build({entryPoints:['src/simulator.js'],bundle:true,format:'esm',platform:'node',outfile:'.cache/simulator.mjs'});
const {simulate,defaults,presets}=await import('../.cache/simulator.mjs');
const probe=JSON.parse(fs.readFileSync('evidence/probes.json'));
const cases={complete:{},unreachable:{wire:'before'},uncertain:{wire:'unconfirmed'},'not-ready':{ready:false},draining:{queue:'draining'},incompatible:{duplicate:'conflicting'},contradictory:{duplicate:'conflicting',tamper:true},terminal:{ending:'internal'},reattach:{ending:'reattach'},fetch:{ending:'fetch'},both:{ending:'both'},'exhaust-fetch':{ending:'exhaust-fetch'},'exhaust-reattach':{ending:'exhaust-reattach'}};
const comparisons=[];
for(const [id,config] of Object.entries(cases)){
 const sim=simulate(config),actual=probe.results[id];
 const expected=actual.outcome.status==='completed'?'done':actual.outcome.retrySafe?'local':'halt';
 assert.equal(sim.outcome,expected,id);
 assert.equal(sim.stats.executeWrites,actual.writes.filter(w=>w.kind==='execute').length,id);
 assert.equal(sim.stats.fetches,actual.writes.filter(w=>w.kind==='result-fetch').length,id);
 if(actual.outcome.retrySafe!==undefined)assert.equal(sim.retrySafe,actual.outcome.retrySafe,id);
 if(actual.outcome.code&&actual.outcome.code!=='rejected')assert.equal(sim.code,actual.outcome.code,id);
 if(actual.outcome.delivery)assert.equal(sim.delivery,actual.outcome.delivery,id);
 comparisons.push({id,modeledOutcome:sim.outcome,actual:actual.outcome,executeWrites:sim.stats.executeWrites,fetches:sim.stats.fetches});
}
let combinations=0;
for(const auth of [true,false])for(const ready of [true,false])for(const pressure of [true,false])for(const queue of ['accepting','draining','closed'])for(const duplicate of ['unseen','matching','conflicting'])for(const tamper of [true,false])for(const ending of ['complete','both','exhaust-fetch','worker-exit']){
 const sim=simulate({auth,ready,pressure,queue,duplicate,tamper,ending});combinations++;
 if(sim.stats.accepted)assert.equal(sim.stats.localRuns,0,'An accepted signal may never run locally');
 if(!auth){assert.equal(sim.stats.admissionSamples,0);assert.equal(sim.outcome,'halt');assert.equal(sim.steps.filter(s=>s.guard).length,1);}
 for(const step of sim.steps)if(step.edge)assert.ok(traces.some(e=>e.id===step.edge),'Every lit wire must exist');
}
const first=simulate({queue:'draining',duplicate:'conflicting'});
assert.equal(first.code,'draining');assert.equal(first.outcome,'local');
assert.equal(first.steps.filter(s=>s.guard).length,4,'A queue rejection must leave compatibility unobserved');
assert.equal(simulate({ending:'both'}).stats.admissionSamples,2,'Each authenticated execute attempt initiates an admission sample');
for(const route of ['cold','fallback']){const s=simulate({route});assert.equal(s.stats.executeWrites,0);assert.equal(s.stats.localRuns,1);assert.equal(s.stats.admissionSamples,0);}
const bank=JSON.parse(fs.readFileSync('src/sources.json'));
let excerpts=0;
for(const r of readings)for(const [id,start,end] of r.sources){assert.ok(bank[id],id);const lines=bank[id].text.split('\n');assert.ok(start>0&&start<=end&&end<=lines.length,`${r.id}: invalid range ${id}:${start}-${end} of ${lines.length}`);excerpts++;}
for(const [id,s] of Object.entries(bank)){
 const path=s.version==='bundle'?`evidence/${s.path}`:`evidence/${s.version}/${s.path}`;
 const bytes=fs.readFileSync(path);assert.equal(createHash('sha256').update(bytes).digest('hex'),s.sha256,id);
}
const graph=JSON.parse(fs.readFileSync('src/layout.json'));
assert.equal(graph.children.length,components.length);assert.equal(graph.edges.length,traces.length);
for(const a of graph.children)for(const b of graph.children){if(a.id>=b.id)continue;assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y,`Overlapping components ${a.id} and ${b.id}`);}
const record={status:'passed',simulationProbeComparisons:comparisons,admissionCombinations:combinations,presets:presets.length,sourceFiles:Object.keys(bank).length,excerpts,layout:{components:graph.children.length,traces:graph.edges.length,overlappingComponents:0},scope:'Artifact invariants and frozen receipts; not a whole-stack correctness or parity test.'};
fs.writeFileSync('evidence/artifact-checks.json',JSON.stringify(record,null,2));
console.log(`Passed: 13 recorded-client comparisons, ${combinations} admission combinations, ${excerpts} excerpts, ${Object.keys(bank).length} source hashes, ELK component bounds.`);
