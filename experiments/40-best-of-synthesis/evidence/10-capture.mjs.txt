import { writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';

const output = dirname(fileURLToPath(import.meta.url));
const root = resolve(output, '../..');
const cacheNames = [
  'definitionsByIdentity', 'callTargetsByIdentity', 'referencesByIdentity',
  'callersByIdentity', 'calleesByIdentity', 'definitionsByPosition',
];
const fixture = [
  'export function helper(): void {}',
  'export function target(): void { helper(); }',
  'export function caller(): void { target(); }',
  '',
].join('\n');
const tick = () => new Promise(resolveTick => setImmediate(resolveTick));

async function replay(version) {
  const tree = resolve(root, `worktrees/pr-127-${version}`);
  const core = await import(pathToFileURL(resolve(tree, 'packages/core/dist/index.js')));
  const { TypeScriptBackend } = await import(pathToFileURL(resolve(tree,
    'packages/backend-typescript/dist/typescript-backend/typescript-backend.js')));
  const fs = new core.InMemoryFileSystem({ '/repo/src/app.ts': fixture });
  const files = [{ relative: 'src/app.ts', absolute: '/repo/src/app.ts',
    metadata: fs.metadataSync('/repo/src/app.ts') }];
  const snapshot = { root: '/repo', files };
  const counts = { definitionSearch: 0, referenceSearch: 0, callTargetResolution: 0 };
  const backend = new TypeScriptBackend(fs, undefined, undefined,
    Object.fromEntries(Object.keys(counts).map(name => [name, () => counts[name]++])));
  const queries = backend.semanticQueries;
  if ((version === 'head') !== Boolean(queries.cacheScope)) {
    throw new Error(`Build for ${version} does not have the expected cache implementation`);
  }
  const identities = new WeakMap();
  let nextPromise = 1;
  let nextValue = 1;
  const id = value => {
    if (!identities.has(value)) identities.set(value,
      value instanceof Promise ? `P${nextPromise++}` : `V${nextValue++}`);
    return identities.get(value);
  };
  const serviceCalls = [];
  for (const name of ['findCallTarget', 'findDefinitions', 'findCallers', 'findCallees', 'referenceLocations']) {
    const original = queries[name].bind(queries);
    queries[name] = (...args) => {
      const returned = original(...args);
      serviceCalls.push({ method: name, returned: id(returned) });
      return returned;
    };
  }
  const inspect = (name, result = null) => ({
    name, counts: { ...counts }, serviceCalls: [...serviceCalls], result,
    caches: cacheNames.map(cacheName => ({ name: cacheName,
      entries: [...(version === 'base' ? queries[cacheName] : queries[cacheName].values)]
        .map(([key, value]) => ({ key, value: id(value), type: value instanceof Promise ? 'Promise' : 'locations' })),
    })),
  });
  const frames = [inspect('arrive')];
  await backend.refresh({ snapshot, coverage: 'workspace' });
  frames.push(inspect('refresh'));
  const identity = { file: 'src/app.ts', segments: [{ name: 'target' }] };
  const resolution = await backend.findCallTarget(files, identity);
  frames.push(inspect('target', { outcome: resolution.outcome }));
  const definitions = await backend.findDefinitions(files, identity);
  frames.push(inspect('definitions', { symbols: definitions.map(x => core.formatSymbolIdentity(x.identity)) }));
  const callers = await backend.findCallers(files, resolution.target.identity);
  frames.push(inspect('callers', { symbols: callers.map(x => core.formatSymbolIdentity(x.symbol.identity)) }));
  const callees = await backend.findCallees(files, resolution.target.identity);
  frames.push(inspect('callees', { symbols: callees.map(x => core.formatSymbolIdentity(x.symbol.identity)) }));
  const references = await backend.findReferences(files, identity);
  frames.push(inspect('references', { references }));
  const result = { definitions, callers, callees, references };
  frames.push(inspect('return', {
    definitions: definitions.length, callers: callers.length, callees: callees.length,
    references: references.length,
  }));
  return { backend, queries, frames, result, inspect, snapshot, id };
}

async function lifecycle(version, event) {
  const run = await replay(version);
  const before = run.inspect('before');
  if (event === 'refresh-success' || event === 'refresh-failure') {
    if (event === 'refresh-failure') run.backend.state.refresh = async () => {
      throw new Error('injected refresh failure');
    };
    let outcome = 'fulfilled';
    try { await run.backend.refresh({ snapshot: run.snapshot, coverage: 'workspace' }); }
    catch (error) { outcome = error.message; }
    return { before, after: run.inspect('after'), outcome };
  }
  let resolveProject, rejectProject;
  const gate = new Promise((resolveGate, rejectGate) => {
    resolveProject = resolveGate;
    rejectProject = rejectGate;
  });
  const project = run.backend.projectGraph;
  const original = project.releaseTransientResources.bind(project);
  const delayed = gate.then(() => original());
  // Observe the deliberately dropped base promise so this diagnostic harness can finish.
  delayed.catch(() => {});
  project.releaseTransientResources = () => delayed;
  let backendState = 'pending';
  const release = run.backend.releaseTransientResources();
  release.then(() => { backendState = 'fulfilled'; }, () => { backendState = 'rejected'; });
  const immediate = run.inspect('immediate-clear');
  await tick();
  const whileProjectPending = backendState;
  if (event === 'release-success') resolveProject();
  else rejectProject(new Error('injected project release failure'));
  await tick();
  return { before, immediate, whileProjectPending, after: run.inspect('after'),
    backendState, projectState: event === 'release-success' ? 'fulfilled' : 'rejected' };
}

const data = {
  generatedAt: new Date().toISOString(), fixture,
  method: 'Real built backend preparation followed by the semantic calls in context-command.ts lines 55–60. The target identity is supplied directly. CLI parsing, target selection, Git history, result building and rendering are omitted. Lifecycle cases are separate host actions; refresh failure and delayed/rejecting project release are injected in memory.',
  cacheNames, versions: {},
};
for (const version of ['base', 'head']) {
  const run = await replay(version);
  const events = {};
  for (const event of ['refresh-success', 'refresh-failure', 'release-success', 'release-failure']) {
    events[event] = await lifecycle(version, event);
  }
  data.versions[version] = {
    sha: execFileSync('git', ['-C', resolve(root, `worktrees/pr-127-${version}`), 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
    frames: run.frames, result: run.result, events,
  };
}
data.sameSemanticOutput = JSON.stringify(data.versions.base.result) === JSON.stringify(data.versions.head.result);
await writeFile(resolve(output, 'evidence/replay.json'), JSON.stringify(data, null, 2) + '\n');
await writeFile(resolve(output, 'replay-data.js'), `window.REPLAY = ${JSON.stringify(data)};\n`);
console.log(JSON.stringify({ sameSemanticOutput: data.sameSemanticOutput,
  cacheEntriesAtReturn: data.versions.head.frames.at(-1).caches.map(x => x.entries.length),
  searches: data.versions.head.frames.at(-1).counts,
  releasePending: Object.fromEntries(['base', 'head'].map(v => [v, data.versions[v].events['release-failure'].whileProjectPending])),
}, null, 2));
