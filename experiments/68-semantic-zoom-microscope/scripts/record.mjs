import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';

const out = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(out, '../..');
const pins = { base: 'ba53c8e1662fd86d198b95321c90d9c9bef10184', head: '20838f8dbf413e04767543eb2380d0d114da6c60' };
for (const [side, pin] of Object.entries(pins)) {
  assert.equal(execFileSync('git', ['rev-parse', 'HEAD'], {cwd: resolve(root, 'worktrees/pr-148-'+side), encoding:'utf8'}).trim(), pin);
}
const headFile = resolve(root, 'worktrees/pr-148-head/packages/daemon/dist/client/daemon-routing-policy.js');
const baseFile = resolve(root, 'worktrees/pr-148-base/apps/cli/dist/daemon/daemon-command-dispatcher.js');
const { DaemonRoutingPolicy, DaemonRoutingContextState } = await import(pathToFileURL(headFile));
const { DaemonCommandDispatcher } = await import(pathToFileURL(baseFile));
const cases = [
  {id:'starting-mismatch', name:'Starting + wrong version', state:'starting', version:'old', stop:2},
  {id:'mismatch', name:'Ready record + wrong version', version:'old', stop:3},
  {id:'ready', name:'Ready + responsive', stop:4},
  {id:'busy', name:'Ready + busy', pongState:'busy', stop:4},
  {id:'absent', name:'No record', absent:true, stop:1},
  {id:'read-error', name:'Registry read throws', readError:true, stop:1},
  {id:'starting', name:'Starting record', state:'starting', stop:2},
  {id:'pong-starting', name:'Responsive pong says starting', pongState:'starting', stop:4},
  {id:'pong-mismatch', name:'Responsive pong + wrong version', pongVersion:'old', stop:4},
  {id:'pong-both', name:'Pong: wrong version + starting', pongState:'starting', pongVersion:'old', stop:4},
  {id:'observe-error', name:'Observation throws', observeError:true, stop:4},
  {id:'observed-starting', name:'Observer reports starting', kind:'starting', stop:4},
  {id:'unresponsive', name:'Observer reports unresponsive', kind:'unresponsive', stop:4},
  {id:'exited', name:'Observer reports exited', kind:'exited', stop:4},
  {id:'cleanup-error', name:'Exited + cleanup throws', kind:'exited', removeError:true, stop:4},
  {id:'incompatible', name:'Observer reports incompatible', kind:'incompatible', stop:4},
  {id:'corrupt', name:'Observer reports corrupt', kind:'corrupt', stop:4},
];
function ports(c) {
  const effects = { read:0, observe:0, remove:0 };
  const events = [];
  const record = { schemaVersion:1, protocolVersion:1, symnavVersion:c.version ?? '0.1.0', state:c.state ?? 'ready', instanceId:'fixture-instance', processToken:'fixture-process', pid:123, endpoint:'/fixture-endpoint' };
  return { effects, events,
    read() { effects.read++; events.push('registry.read'); if(c.readError) throw new Error('injected read failure'); return c.absent ? undefined : record; },
    async observe(r) { effects.observe++; events.push('observer.observe'); if(c.observeError) throw new Error('injected observation failure'); return c.kind ? {kind:c.kind,record:r} : {kind:'responsive',record:r,pong:{symnavVersion:c.pongVersion ?? r.symnavVersion,state:c.pongState ?? 'ready'}}; },
    remove() { effects.remove++; events.push('registry.removeIfProcess'); if(c.removeError) throw new Error('injected cleanup failure'); return true; },
  };
}
const rows=[];
for (const c of cases) {
  const versions={};
  for (const side of ['base','head']) {
    const p=ports(c);
    const result=side==='head'
      ? await new DaemonRoutingPolicy().decide(new DaemonRoutingContextState({},'0.1.0',p.read,p.observe,p.remove))
      : await DaemonCommandDispatcher.prototype.routeFor.call({}, {}, {registry:{read:p.read,removeIfProcess:p.remove},observer:{observe:p.observe}}, '0.1.0');
    versions[side]={ route:result.kind, reason:result.reason ?? null, effects:p.effects, events:p.events };
  }
  assert.deepEqual(versions.head,versions.base, c.id);
  rows.push({...c,...versions});
}
const p=ports({});
const context=new DaemonRoutingContextState({},'0.1.0',p.read,p.observe,p.remove);
assert.deepEqual(p.effects,{read:0,observe:0,remove:0});
const first=context.readRecord(), second=context.readRecord();
const firstObservation=context.observe(first), secondObservation=context.observe(second);
assert.equal(first,second); assert.equal(firstObservation,secondObservation);
await firstObservation;
assert.deepEqual(p.effects,{read:1,observe:1,remove:0});
const result={ pins, method:'Actual compiled base routeFor and head DaemonRoutingPolicy.decide with injected registry/observer ports. No real socket, process, disk registry, startup, execution, or wall-clock timing. stop annotations follow source guard order; effect counts and outcomes are measured.', rows, memoization:{ before:{read:0,observe:0,remove:0}, after:p.effects, sameRecord:true,sameObservationPromise:true }, builds:[headFile,baseFile].map(path=>({path: path.replace(root+'/',''), sha256:createHash('sha256').update(readFileSync(path)).digest('hex')})) };
writeFileSync(resolve(out,'evidence/recordings.json'),JSON.stringify(result,null,2)+'\n');
writeFileSync(resolve(out,'recordings.js'),'window.RECORDINGS = '+JSON.stringify(result)+';\n');
console.log(`${rows.length} controlled base/head pairs agree; lazy context probe passed. Recordings saved.`);
