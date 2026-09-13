// Real compiled methods, injected empty state and held cleanup. No Symnav source mutation.
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const here = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(here, '../..');
const inventory = JSON.parse(await readFile(path.join(here, 'evidence/inventory.json'), 'utf8'));
const flush = async () => { for (let i=0;i<12;i++) await Promise.resolve(); };
const modules = {};
for (const build of ['base','head']) {
  const wt = path.join(root, `worktrees/pr-127-${build}`);
  assert.equal(execFileSync('git', ['rev-parse','HEAD'], {cwd:wt,encoding:'utf8'}).trim(),inventory.pins[build]);
  modules[build] = {
    ...(await import(path.join(wt,'packages/core/dist/index.js'))),
    ...(await import(path.join(wt,'packages/backend-typescript/dist/typescript-backend/typescript-backend.js'))),
  };
}

async function recordBackend(build, outcome) {
  const {TypeScriptBackend, InMemoryFileSystem} = modules[build];
  let resolveCleanup, rejectCleanup, refreshFails = false, searches = 0, graphCalls=0;
  const cleanup = new Promise((resolve,reject) => {resolveCleanup=resolve;rejectCleanup=reject;});
  // Base intentionally drops this promise; handle it here so the recorder can observe safely.
  cleanup.catch(()=>{});
  const graph = { releaseTransientResources() {graphCalls++;return cleanup;} };
  const failure = new Error('injected project release');
  const state = {
    refresh: () => refreshFails ? Promise.reject(new Error('injected refresh')) : Promise.resolve({added:0,changed:0,removed:0,unchanged:0}),
    ensureFiles: async () => {}, locate: () => [],
  };
  const backend = new TypeScriptBackend(new InMemoryFileSystem({}),state,graph,{definitionSearch:()=>searches++});
  const snapshot = {root:'/repo', files:[]};
  const request={snapshot,coverage:'selection'};
  const target = {file:'src/app.ts',segments:[{name:'target'}]};
  await backend.refresh(request);
  const initial = await backend.findDefinitions([],target);
  const repeated = await backend.findDefinitions([],target);
  const checkpoints = [{id:'warm', resultSame:initial===repeated, searches, backendRelease:'not called', graphCalls}];
  refreshFails=true;
  await backend.refresh(request).catch(()=>{});
  const afterFailure=await backend.findDefinitions([],target);
  checkpoints.push({id:'failed-refresh',resultSame:initial===afterFailure,searches,backendRelease:'not called',graphCalls});
  refreshFails=false;
  await backend.refresh(request);
  const afterSuccess=await backend.findDefinitions([],target);
  checkpoints.push({id:'successful-refresh',resultSame:initial===afterSuccess,searches,backendRelease:'not called',graphCalls});
  let releaseState='pending', sameFailure=false;
  const release=backend.releaseTransientResources();
  release.then(()=>releaseState='fulfilled',error=>{releaseState='rejected';sameFailure=error===failure;});
  await flush();
  // A held-cleanup observation before repopulating the definition cache.
  checkpoints.push({id:'release-held',backendRelease:releaseState,searches,graphCalls});
  const duringRelease=await backend.findDefinitions([],target);
  checkpoints.push({id:'query-during-release',resultSame:afterSuccess===duringRelease,searches,backendRelease:releaseState,graphCalls});
  if (outcome==='reject') rejectCleanup(failure); else resolveCleanup();
  await flush();
  await release.catch(()=>{});
  checkpoints.push({id:`cleanup-${outcome}`,backendRelease:releaseState,sameFailure,searches,graphCalls});
  assert.equal(checkpoints[1].resultSame,true);
  assert.equal(checkpoints[2].resultSame,false);
  assert.equal(checkpoints[4].resultSame,false);
  assert.equal(checkpoints[3].backendRelease,build==='head'?'pending':'fulfilled');
  assert.equal(releaseState,build==='head'&&outcome==='reject'?'rejected':'fulfilled');
  return {build,outcome,checkpoints};
}

const runs=[];
for (const build of ['base','head']) for (const outcome of ['resolve','reject']) runs.push(await recordBackend(build,outcome));

const {TurnScopedCacheScope} = modules.head;
const scope=new TurnScopedCacheScope();
const handles=Array.from({length:6},()=>scope.createCache());
const initial=handles.map((h,i)=>h.getOrCreate('same key',()=>({id:i})));
assert.equal(new Set(initial).size,6);
scope.beginTurn();
const next=handles.map((h,i)=>h.getOrCreate('same key',()=>({id:i})));
assert.ok(next.every((v,i)=>v!==initial[i]));
scope.releaseTransientResources();
const released=handles.map((h,i)=>h.getOrCreate('same key',()=>({id:i})));
assert.ok(released.every((v,i)=>v!==next[i]));
const promiseCache=scope.createCache();
let resolveOld;
const oldPromise = new Promise(resolve=>resolveOld=resolve);
assert.equal(promiseCache.getOrCreate('key',()=>oldPromise),oldPromise);
scope.beginTurn();
const newPromise=Promise.resolve('new');
promiseCache.getOrCreate('key',()=>newPromise);
resolveOld('old');
assert.equal(await oldPromise,'old');
assert.equal(promiseCache.getOrCreate('key',()=>null),newPromise);
const errorCache=scope.createCache();
let syncAttempts=0,undefinedCalls=0,rejectCalls=0;
for(let i=0;i<2;i++) {try {errorCache.getOrCreate('sync',()=>{syncAttempts++;throw new Error('sync');});} catch {}}
for(let i=0;i<2;i++) errorCache.getOrCreate('undefined',()=>{undefinedCalls++;return undefined;});
const rejected=Promise.reject(new Error('async')); rejected.catch(()=>{});
for(let i=0;i<2;i++) assert.equal(errorCache.getOrCreate('async',()=>{rejectCalls++;return rejected;}),rejected);
assert.equal(syncAttempts,2);assert.equal(undefinedCalls,1);assert.equal(rejectCalls,1);
const recording={
  createdAt:new Date().toISOString(),pins:inventory.pins,
  scope:'Actual compiled backend and core methods. Empty workspace state, held project cleanup and failure are injected. This is not a daemon execution or a six-query workload. Microtask checkpoints are not durations.',
  runs,
  core:{sixIsolatedHandles:true,allSixReusedAfterBeginTurn:true,allSixReusedAfterRelease:true,oldPromiseSettles:'old',newEntryStays:'new',syncAttempts,undefinedCalls,rejectCalls}
};
await writeFile(path.join(here,'evidence/recordings.json'),JSON.stringify(recording,null,2)+'\n');
await writeFile(path.join(here,'recordings.js'),'window.ORIGAMI_RECORDINGS = '+JSON.stringify(recording)+';\n');
console.log(JSON.stringify(recording,null,2));
