// Behavioral checks for the illustrative game, not correctness tests for symnav.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const M = require('../assets/model.js');
let checks = 0;
function check(name, run) { run(); checks++; console.log('PASS', name); }
function act(id, state, action, value) {
  const original = JSON.stringify(state);
  const result = M.transition(id, state, action, value);
  assert.equal(JSON.stringify(state), original, 'Transitions cannot mutate the saved position');
  return result;
}
function advance(id, state, actions) {
  for (const [a,v] of actions) {
    const result = act(id,state,a,v);
    assert.equal(result.changed,true,`${id}: ${a}: ${result.message}`);
    state = result.state;
  }
  return state;
}
check('all five stations and both transfer recovery scopes reach completion',()=>{
  for(const station of M.stations) for(const mode of station.id==='transfer'?['fetch','reattach']:[undefined]) {
    let state=M.initial(station.id,mode), steps=0;
    while(!state.done && steps++<60) {
      const move=M.nextMove(station.id,state);
      assert.ok(move, station.id);
      const result=act(station.id,state,...move);
      assert.ok(result.changed,result.message);
      state=result.state;
    }
    assert.ok(state.done, station.id+' did not finish');
    if(station.id==='transfer') assert.equal(state.executions,1);
  }
});
check('failed refresh cannot advance the semantic turn or erase current answers',()=>{
  let s=M.initial('cache');
  assert.equal(act('cache',s,'begin').changed,false);
  s=advance('cache',s,[['prepare'],['validate']]);
  assert.equal(s.phase,'failed');assert.equal(s.published,7);assert.equal(s.turn,7);assert.equal(s.caches,true);
  assert.equal(act('cache',s,'commit').changed,false);
  assert.equal(act('cache',s,'begin').changed,false);
  s=advance('cache',s,[['prepare'],['validate'],['commit']]);
  assert.equal(s.published,8);assert.equal(s.turn,7);
  s=advance('cache',s,[['begin'],['probe'],['release']]);
  assert.equal(s.caches,false);assert.equal(s.release,'pending');
  s=advance('cache',s,[['settle']]);
  assert.equal(s.caches,false);assert.equal(s.session,'session α');assert.equal(s.published,8);
  assert.equal(act('cache',s,'release').state.release,'pending');
});
check('admission and routing stop at the first failed guard',()=>{
  let s=M.initial('gates');s.orders.admission=[...M.laneDefs.admission.order];
  s=advance('gates',s,[['run']]);
  assert.deepEqual(s.reports.admission[0].checked,['authentication']);
  assert.equal(s.reports.admission[0].result,'disconnect / authentication');
  assert.equal(s.reports.admission[5].result,'attach existing');
  s.orders.routing=[...M.laneDefs.routing.order];
  s=advance('gates',s,[['lane','routing'],['run']]);
  assert.deepEqual(s.reports.routing[1].checked,['record','starting']);
  assert.equal(s.reports.routing[1].result,'cold / starting');
  assert.equal(s.done,true);
});
check('FIFO next turn waits for delivery and the boundary sample including replacement recovery',()=>{
  let s=M.initial('worker');
  assert.equal(act('worker',s,'start-b').changed,false);
  s=advance('worker',s,[['duplicate'],['finish-a']]);
  assert.equal(act('worker',s,'sample-a').changed,false);
  s=advance('worker',s,[['deliver-a'],['sample-a']]);
  assert.equal(s.ready,true);assert.equal(s.admissionPaused,true);
  s=advance('worker',s,[['replace'],['old-exit'],['ready-new']]);
  assert.equal(s.ready,false);assert.equal(s.generation,2);assert.equal(s.lateIgnored,true);
  s=advance('worker',s,[['terminate-old']]);assert.equal(s.ready,true);
  assert.equal(act('worker',s,'start-b').changed,false);
  s=advance('worker',s,[['settle-recovery'],['start-b']]);assert.equal(s.b,'running');
});
check('resume offset follows awaited append and rejects skips or duplicate output',()=>{
  let s=M.initial('transfer','fetch');
  assert.equal(s.durable,2);assert.equal(s.pending,2);
  assert.equal(act('transfer',s,'fetch','2').changed,false);
  s=advance('transfer',s,[['append']]);assert.equal(s.durable,3);
  assert.equal(act('transfer',s,'fetch','2').changed,false);
  assert.equal(act('transfer',s,'fetch','4').changed,false);
  s=advance('transfer',s,[['fetch','3']]);
  assert.equal(s.capture,1);assert.equal(s.decoder,2);assert.equal(s.durable,3);
  assert.equal(act('transfer',s,'receive').changed,false);
  s=advance('transfer',s,[['manifest'],['receive']]);assert.equal(s.durable,3);assert.equal(s.pending,3);
  assert.equal(act('transfer',s,'verify').changed,false);
  s=advance('transfer',s,[['append'],['verify']]);assert.equal(s.durable,4);assert.equal(s.verified,true);
});
check('reattachment resets capture and fetch allowance while retaining accepted identity',()=>{
  let s=M.initial('transfer','reattach');
  assert.equal(s.fetchUsed,1);assert.equal(s.capture,1);
  assert.equal(act('transfer',s,'local-replay').changed,false);
  s=advance('transfer',s,[['reattach']]);
  assert.equal(s.fetchUsed,0);assert.equal(s.reattachUsed,1);assert.equal(s.capture,2);assert.equal(s.durable,0);assert.equal(s.request,'request A');assert.equal(s.executions,1);
});
check('cleanup diagnostics do not withhold acknowledgement; caller disposes successful output',()=>{
  let s=M.initial('transfer','fetch');
  s=advance('transfer',s,[['append'],['fetch','3'],['manifest'],['receive'],['append'],['verify']]);
  assert.equal(act('transfer',s,'replay').changed,false);
  s=advance('transfer',s,[['ack-error']]);assert.equal(s.acked,true);assert.equal(s.cleanupError,true);assert.equal(s.disposed,false);
  s=advance('transfer',s,[['replay'],['dispose']]);assert.equal(s.done,true);assert.equal(s.disposed,true);assert.equal(s.executions,1);
});
check('changed manifest terminates receipt and disposes capture without executing again',()=>{
  let s=M.initial('transfer','fetch');
  s=advance('transfer',s,[['append'],['fetch','3'],['bad-manifest']]);
  assert.equal(s.stopped,true);assert.equal(s.disposed,true);assert.equal(s.executions,1);
  assert.equal(act('transfer',s,'receive').changed,false);
});
check('exhausted fetch terminates accepted delivery without replay',()=>{
  let s=M.initial('transfer','fetch');
  s=advance('transfer',s,[['append'],['fetch','3'],['manifest'],['disconnect'],['fetch','3']]);
  assert.equal(s.stopped,true);assert.equal(s.disposed,true);assert.equal(s.executions,1);
});
check('all declared decisions, game references, policy rows, and local evidence are present',()=>{
  const context={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/briefing.js'),'utf8'),context);
  const B=context.window.BRIEFING;
  assert.equal(B.prs.length,26);assert.equal(B.prs.flatMap(p=>p.decisions).length,117);
  assert.equal(B.extras.length,20);assert.equal(B.policy.length,44);assert.equal(B.absences.length,5);
  const ids=new Set(B.prs.flatMap(p=>p.decisions.map(d=>d.id)));
  for(const station of M.stations)for(const ref of station.refs)assert.ok(ids.has(ref),ref);
  for(const key of Object.keys(B.evidence))assert.ok(fs.existsSync(path.join(__dirname,'../evidence',key+'.html')),key);
  assert.ok(!B.policy.some(p=>p.reason==='Reason'));
});
console.log(`${checks} checks passed. These validate the artifact model only.`);
