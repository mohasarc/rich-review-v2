import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const out = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(out, '../..');
const inventory = JSON.parse(await readFile(resolve(out, 'evidence/inventory.json')));
const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; };
const load = (build, file) => import(pathToFileURL(resolve(root, `worktrees/pr-127-${build}/${file}`)));
for (const [build,pin] of Object.entries(inventory.pins)) {
  const cwd=resolve(root,`worktrees/pr-127-${build}`);
  assert.equal(execFileSync('git',['rev-parse','HEAD'],{cwd,encoding:'utf8'}).trim(),pin);
  assert.equal(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd,encoding:'utf8'}),'');
}
const {TurnScopedCacheScope}=await load('head','packages/core/dist/backend/turn-scoped-cache-scope.js');
const coreRuns=[];
for (const boundary of ['beginTurn','releaseTransientResources']) {
  const scope=new TurnScopedCacheScope(); const handle=scope.createCache();
  const old=deferred(); let calls=0; let oldState='pending';
  old.promise.then(()=>oldState='fulfilled');
  const p0=handle.getOrCreate('target',()=>{calls++;return old.promise;});
  assert.equal(handle.getOrCreate('target',()=>{throw Error('unexpected factory');}),p0);
  const run={boundary,checkpoints:[{step:'acquire',lookup:'P0',caller:'P0',callerState:oldState,factoryCalls:calls}]};
  scope[boundary]();
  // Access for measurement occurs only after the synchronous clear has returned.
  const p1=handle.getOrCreate('target',()=>{calls++;return Promise.resolve('new');});
  assert.notEqual(p1,p0);
  run.checkpoints.push({step:'clear-and-lookup',lookup:'P1',caller:'P0',callerState:oldState,factoryCalls:calls,sameHandle:true});
  old.resolve('old'); assert.equal(await p0,'old');
  assert.equal(handle.getOrCreate('target',()=>{throw Error('unexpected replacement');}),p1);
  assert.equal(await p1,'new');
  run.checkpoints.push({step:'old-settles',lookup:'P1',caller:'P0',callerState:oldState,callerValue:'old',lookupValue:'new',factoryCalls:calls});
  coreRuns.push(run);
}
const serviceRuns=[];
for (const build of ['base','head']) {
  const {TypeScriptSemanticQueryService}=await load(build,'packages/backend-typescript/dist/typescript-backend/typescript-semantic-query-service.js');
  const gate=deferred(); let searches=0; let oldState='pending';
  const state={ensureFiles:()=>gate.promise, locate:()=>[]};
  const service=new TypeScriptSemanticQueryService(undefined,state,{definitionSearch:()=>searches++});
  const begin=()=>service.beginTurn(build==='head'?[]:{root:'/repo',files:[]});
  begin(); const id={file:'src/app.ts',segments:[{name:'target'}]};
  const p0=service.findDefinitions(id); p0.then(()=>oldState='fulfilled');
  assert.equal(service.findDefinitions(id),p0);
  const run={build,checkpoints:[{step:'acquire',lookup:'P0',caller:'P0',callerState:oldState,definitionSearches:searches}]};
  begin(); const p1=service.findDefinitions(id); assert.notEqual(p1,p0);
  run.checkpoints.push({step:'clear-and-lookup',lookup:'P1',caller:'P0',callerState:oldState,definitionSearches:searches});
  gate.resolve(); assert.deepEqual(await p0,[]); assert.deepEqual(await p1,[]);
  assert.equal(service.findDefinitions(id),p1);
  run.checkpoints.push({step:'old-settles',lookup:'P1',caller:'P0',callerState:oldState,definitionSearches:searches});
  serviceRuns.push(run);
}
assert.deepEqual(serviceRuns[0].checkpoints,serviceRuns[1].checkpoints);
const result={kind:'actual compiled methods with injected factories / workspace-state collaborators',limits:'No daemon or real workspace query. Delays and empty semantic results are injected. P0/P1 name within-run promise identities, not cross-build objects. Browser presents a gesture analogy of saved checkpoints, not live Symnav execution.',pins:inventory.pins,coreRuns,serviceRuns};
await writeFile(resolve(out,'evidence/observations.json'),JSON.stringify(result,null,2)+'\n');
console.log('Recorded 2 core boundary runs and 2 service builds; all identity/settlement assertions passed.');
