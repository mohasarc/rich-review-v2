// Real built backend methods, with an injected workspace and deferred project graph.
// Run after `pnpm exec tsc --build` in both supplied worktrees.
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const identity = { file: 'src/app.ts', segments: [{ name: 'target' }] };
const flush = async () => { for (let i=0; i<12; i++) await Promise.resolve(); };
const result = { recordedAt: new Date().toISOString(), fixture: 'Real compiled backend/service. Fake empty workspace, one held graph promise, and definition-search observer. No daemon, real compiler cleanup, wall-clock latency, or all-six occupancy measurement.', builds: {} };

for (const revision of ['base', 'head']) {
  const worktree = resolve(root, 'worktrees/pr-127-'+revision);
  const expected=revision==='base'?'a1e325a5ff979bdfa25babc5554621c8c0f20497':'64919bcbcf7fcc8202779b78c5f069b24662bb18';
  assert.equal(execFileSync('git',['-C',worktree,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),expected);
  assert.equal(execFileSync('git',['-C',worktree,'status','--short','--untracked-files=no'],{encoding:'utf8'}).trim(),'');
  const modulePath = resolve(worktree, 'packages/backend-typescript/dist/typescript-backend/typescript-backend.js');
  const {TypeScriptBackend} = await import(pathToFileURL(modulePath));
  const {InMemoryFileSystem} = await import(pathToFileURL(resolve(worktree,'packages/core/dist/index.js')));
  const runs = {};
  for (const outcome of ['fulfilled','rejected']) for (const rebuild of [false,true]) {
    let finish, fail, searches = 0, graphCalls = 0;
    const graphPromise = new Promise((res,rej)=>{finish=res;fail=rej;});
    // Base intentionally does not connect this promise to backend release.
    // Observe it here so a deliberate rejection does not crash the harness.
    graphPromise.catch(()=>{});
    const graph = {releaseTransientResources(){graphCalls++;return graphPromise;}};
    const state = {refresh:async()=>({added:0,changed:0,removed:0,unchanged:0}),ensureFiles:async()=>{},locate:()=>[]};
    const backend = new TypeScriptBackend(new InMemoryFileSystem({}),state,graph,{definitionSearch(){searches++;}});
    await backend.refresh({snapshot:{root:'/repo',files:[]},coverage:'selection'});
    const oldAnswer = await backend.findDefinitions([],identity);
    const cachedAgain = await backend.findDefinitions([],identity);
    assert.equal(oldAnswer,cachedAgain);
    let backendStatus = 'pending', backendError;
    const release = backend.releaseTransientResources();
    release.then(()=>{backendStatus='fulfilled';},e=>{backendStatus='rejected';backendError=e;});
    await flush();
    const pending = {project:'pending',backend:backendStatus,definitionSearches:searches,graphCalls};
    let rebuiltPending;
    if (rebuild) {
      const rebuilt = await backend.findDefinitions([],identity);
      const rebuiltAgain = await backend.findDefinitions([],identity);
      rebuiltPending = {project:'pending',backend:backendStatus,definitionSearches:searches,newAnswer:rebuilt!==oldAnswer,retainsNewAnswer:rebuilt===rebuiltAgain,oldAnswerStillHeld:Array.isArray(oldAnswer)};
      assert.equal(rebuiltPending.newAnswer,true);
    }
    const error = new Error('controlled project cleanup failure');
    if (outcome==='fulfilled') finish(); else fail(error);
    await flush();
    const after = {project:outcome,backend:backendStatus,sameFailure:backendError===error,definitionSearches:searches};
    assert.equal(pending.backend, revision==='base'?'fulfilled':'pending');
    assert.equal(searches,rebuild?2:1);
    assert.equal(after.backend,revision==='base'?'fulfilled':outcome);
    if(revision==='head' && outcome==='rejected') assert.equal(after.sameFailure,true);
    runs[outcome+'-'+(rebuild?'rebuild':'empty')] = {pending,rebuiltPending,after};
  }
  let failRefresh=false, searches=0;
  const refreshState={refresh:async()=>{if(failRefresh)throw new Error('controlled refresh failure');return {added:0,changed:0,removed:0,unchanged:0};},ensureFiles:async()=>{},locate:()=>[]};
  const backend=new TypeScriptBackend(new InMemoryFileSystem({}),refreshState,undefined,{definitionSearch(){searches++;}});
  const request={snapshot:{root:'/repo',files:[]},coverage:'selection'};
  await backend.refresh(request);
  const before=await backend.findDefinitions([],identity);
  failRefresh=true;
  await backend.refresh(request).catch(()=>{});
  const afterFailure=await backend.findDefinitions([],identity);
  failRefresh=false;
  await backend.refresh(request);
  const afterSuccess=await backend.findDefinitions([],identity);
  const refresh={sameAfterFailure:before===afterFailure,newAfterSuccess:before!==afterSuccess,definitionSearches:searches};
  assert.deepEqual(refresh,{sameAfterFailure:true,newAfterSuccess:true,definitionSearches:2});
  result.builds[revision]={revision:execFileSync('git',['-C',worktree,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),moduleSha256:createHash('sha256').update(readFileSync(modulePath)).digest('hex'),runs,refresh};
}

const {TurnScopedCacheScope}=await import(pathToFileURL(resolve(root,'worktrees/pr-127-head/packages/core/dist/backend/turn-scoped-cache-scope.js')));
const scope=new TurnScopedCacheScope();
const cache=scope.createCache();
let settleOld;
const oldPromise=new Promise(resolve=>{settleOld=resolve;});
cache.getOrCreate('key',()=>oldPromise);
scope.releaseTransientResources();
const newPromise=Promise.resolve('new');
cache.getOrCreate('key',()=>newPromise);
settleOld('old');
result.oldPromise={oldCallerReceives:await oldPromise,currentCacheReceives:await cache.getOrCreate('key',()=>Promise.resolve('other')),sameHandleAfterRelease:true};
assert.equal(result.oldPromise.currentCacheReceives,'new');
writeFileSync(resolve(here,'evidence/observations.json'),JSON.stringify(result,null,2)+'\n');
console.log('Recorded both actual backend versions: held release, fulfillment, rejection, rebuild, failed/successful refresh; plus core old-promise settlement. All harness assertions passed.');
