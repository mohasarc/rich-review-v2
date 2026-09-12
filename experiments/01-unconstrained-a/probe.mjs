import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repository = resolve(here, '../..');
const target = { file: 'src/app.ts', segments: [{ name: 'target' }] };
const snapshot = { root: '/repo', files: [] };
const settle = () => new Promise(resolve => setImmediate(resolve));
const sourceHash = path => createHash('sha256').update(readFileSync(path)).digest('hex');

async function observe(version) {
  const root = resolve(repository, 'worktrees', `pr-127-${version}`);
  const backendPath = resolve(root, 'packages/backend-typescript/dist/typescript-backend/typescript-backend.js');
  const queryPath = resolve(root, 'packages/backend-typescript/dist/typescript-backend/typescript-semantic-query-service.js');
  const { TypeScriptBackend } = await import(pathToFileURL(backendPath));
  const { TypeScriptSemanticQueryService } = await import(pathToFileURL(queryPath));
  let refreshFails = false;
  let searches = 0;
  let rejectCleanup;
  const cleanup = new Promise((_resolve, reject) => { rejectCleanup = reject; });
  void cleanup.catch(() => undefined);
  const state = {
    refresh: async () => {
      if (refreshFails) throw new Error('refresh failure');
      return { added: 0, changed: 0, removed: 0, unchanged: 0 };
    },
    ensureFiles: async () => undefined,
    locate: () => [],
  };
  const graph = { releaseTransientResources: () => cleanup };
  const backend = new TypeScriptBackend({}, state, graph, { definitionSearch: () => { searches++; } });
  const events = [];
  let releaseState = 'not started';
  const event = (name, identity, extra = {}) => events.push({ name, searches, identity, releaseState, ...extra });
  await backend.refresh({ snapshot, coverage: 'selection' });
  event('Successful refresh', 'empty');
  const first = await backend.findDefinitions([], target);
  event('First query', 'A');
  const repeat = await backend.findDefinitions([], target);
  event('Same query', repeat === first ? 'A' : 'different');
  refreshFails = true;
  try { await backend.refresh({ snapshot, coverage: 'selection' }); } catch {}
  const afterFailure = await backend.findDefinitions([], target);
  event('Failed refresh', afterFailure === first ? 'A' : 'different');
  releaseState = 'pending';
  const release = backend.releaseTransientResources();
  void release.then(() => { releaseState = 'fulfilled'; }, () => { releaseState = 'rejected'; });
  await settle();
  event('Project cleanup held open', 'empty');
  const afterRelease = await backend.findDefinitions([], target);
  event('Query while cleanup is held', afterRelease === first ? 'A' : 'B');
  rejectCleanup(new Error('project cleanup failure'));
  await settle();
  event('Project cleanup rejects', 'B');
  refreshFails = false;
  await backend.refresh({ snapshot, coverage: 'selection' });
  event('Next successful refresh', 'empty');
  const next = await backend.findDefinitions([], target);
  event('Next query', next === afterRelease ? 'B' : 'C');

  let failures = 0;
  const brokenState = { ensureFiles: () => { failures++; return Promise.reject(new Error('semantic failure')); } };
  const queries = new TypeScriptSemanticQueryService(undefined, brokenState);
  queries.beginTurn(version === 'head' ? [] : snapshot);
  const rejected = queries.findDefinitions(target);
  const sameRejected = queries.findDefinitions(target);
  await rejected.catch(() => undefined);
  let referenceAttempts = 0;
  const throwing = new TypeScriptSemanticQueryService(undefined, {
    locateSemanticCopies: () => { referenceAttempts++; throw new Error('synchronous failure'); },
  });
  throwing.beginTurn(version === 'head' ? [] : snapshot);
  await throwing.findReferences(target).catch(() => undefined);
  await throwing.findReferences(target).catch(() => undefined);
  return {
    version,
    commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    compiledModules: [backendPath, queryPath].map(path => ({ path: path.slice(repository.length + 1), sha256: sourceHash(path) })),
    events,
    observations: {
      repeatValueIdentity: repeat === first,
      failedRefreshRetainsValue: afterFailure === first,
      releaseClearsBeforeCleanupSettles: afterRelease !== first,
      finalReleaseState: releaseState,
      rejectedPromiseIdentity: rejected === sameRejected,
      rejectedPromiseFactoryCalls: failures,
      synchronousReferenceFailureAttempts: referenceAttempts,
    },
  };
}

async function observeCore() {
  const module = resolve(repository, 'worktrees/pr-127-head/packages/core/dist/backend/turn-scoped-cache-scope.js');
  const { TurnScopedCacheScope } = await import(pathToFileURL(module));
  const scope = new TurnScopedCacheScope();
  const first = scope.createCache();
  const second = scope.createCache();
  let calls = 0;
  first.getOrCreate('undefined', () => { calls++; return undefined; });
  first.getOrCreate('undefined', () => { calls++; return 'unexpected'; });
  const a = first.getOrCreate('same key', () => ({}));
  const b = second.getOrCreate('same key', () => ({}));
  let resolveOld;
  const oldPromise = new Promise(resolve => { resolveOld = resolve; });
  first.getOrCreate('pending', () => oldPromise);
  scope.beginTurn();
  const newPromise = Promise.resolve('new');
  first.getOrCreate('pending', () => newPromise);
  resolveOld('old');
  await oldPromise;
  return {
    undefinedFactoryCalls: calls,
    equalKeysInDifferentHandlesHaveDifferentValues: a !== b,
    oldSettlementCannotReplaceNewEntry: first.getOrCreate('pending', () => 'unexpected') === newPromise,
    oldCallerStillReceives: await oldPromise,
    newCallerReceives: await newPromise,
    compiledModule: { path: module.slice(repository.length + 1), sha256: sourceHash(module) },
  };
}

const result = {
  capturedAt: new Date().toISOString(),
  method: 'Executed the existing compiled backend and query service on both worktrees. Injected a minimal in-memory workspace state and a manually settled project-release promise. No actual daemon or TypeScript project is launched. Object letters stand for reference identity, not contents; empty definition arrays are the values.',
  versions: [await observe('base'), await observe('head')],
  core: await observeCore(),
};
mkdirSync(resolve(here, 'evidence'), { recursive: true });
writeFileSync(resolve(here, 'evidence/probe.json'), JSON.stringify(result, null, 2) + '\n');
writeFileSync(resolve(here, 'probe-data.js'), 'window.PROBE = ' + JSON.stringify(result) + ';\n');
console.log(JSON.stringify(result, null, 2));
