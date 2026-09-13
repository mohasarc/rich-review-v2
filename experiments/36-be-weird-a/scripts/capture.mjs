import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const output = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(output, '../..');
const stages = [
  ['A1', 'After successful refresh · first read'],
  ['A2', 'Same turn · repeat'],
  ['F1', 'Refresh rejected · first read'],
  ['F2', 'Refresh rejected · repeat'],
  ['B1', 'Next successful refresh · first read'],
  ['B2', 'New turn · repeat'],
  ['R1', 'Release called, project pending · first read'],
  ['R2', 'Project still pending · repeat'],
];
const channels = [
  { id: 'D', name: 'Definitions', field: 'definitionsByIdentity', kind: 'Promise', key: 'symbol identity' },
  { id: 'R', name: 'Reference locations', field: 'referencesByIdentity', kind: 'Promise', key: 'symbol identity' },
  { id: 'T', name: 'Call target', field: 'callTargetsByIdentity', kind: 'Promise', key: 'symbol identity' },
  { id: 'C', name: 'Callers', field: 'callersByIdentity', kind: 'Promise', key: 'symbol identity' },
  { id: 'E', name: 'Callees', field: 'calleesByIdentity', kind: 'Promise', key: 'symbol identity' },
  { id: 'P', name: 'Position definitions', field: 'definitionsByPosition', kind: 'location array', key: 'relative path + start' },
];

class IdentityBook {
  #values = new Map();
  get(value) {
    if (value === undefined) throw new Error('Probe expected a stored object, got undefined');
    if (!this.#values.has(value)) this.#values.set(value, `object-${this.#values.size + 1}`);
    return this.#values.get(value);
  }
}

function deferred() {
  let resolvePromise, rejectPromise;
  const promise = new Promise((yes, no) => { resolvePromise = yes; rejectPromise = no; });
  // The base implementation discards this promise. Observe it here to keep the
  // controlled rejection from becoming a process-level unhandled rejection.
  void promise.catch(() => {});
  return { promise, resolve: resolvePromise, reject: rejectPromise };
}

async function load(version) {
  const tree = resolve(root, `worktrees/pr-127-${version}`);
  const moduleAt = (path) => import(pathToFileURL(resolve(tree, path)).href);
  const core = await moduleAt('packages/core/dist/index.js');
  const { TypeScriptBackend } = await moduleAt('packages/backend-typescript/dist/typescript-backend/typescript-backend.js');
  const { TypeScriptWorkspaceState } = await moduleAt('packages/backend-typescript/dist/typescript-backend/typescript-workspace-state.js');
  const { TypeScriptSemanticQueryService } = await moduleAt('packages/backend-typescript/dist/typescript-backend/typescript-semantic-query-service.js');
  const { createRequire } = await import('node:module');
  const requireFromBackend = createRequire(pathToFileURL(resolve(tree, 'packages/backend-typescript/package.json')));
  const { SyntaxKind } = requireFromBackend('ts-morph');
  return { tree, core, TypeScriptBackend, TypeScriptWorkspaceState, TypeScriptSemanticQueryService, SyntaxKind };
}

async function contactSheet(version, modules) {
  const { core, TypeScriptBackend, TypeScriptWorkspaceState, SyntaxKind } = modules;
  const fixture = 'export function target(): void {}\nexport function caller(): void { target(); missing(); }\n';
  const fs = new core.InMemoryFileSystem({ '/repo/src/app.ts': fixture });
  const files = [{ relative: 'src/app.ts', absolute: '/repo/src/app.ts', metadata: fs.metadataSync('/repo/src/app.ts') }];
  const snapshot = { root: '/repo', files };
  const state = new TypeScriptWorkspaceState(fs);
  const actualRefresh = state.refresh.bind(state);
  let failRefresh = false;
  state.refresh = async (...args) => {
    if (failRefresh) throw new Error('controlled refresh failure');
    return actualRefresh(...args);
  };
  const releaseGate = deferred();
  const projects = {
    sourceFileFor: (path) => state.sourceFile(path),
    releaseTransientResources: () => releaseGate.promise,
  };
  const counts = { definitionSearch: 0, referenceSearch: 0, callTargetResolution: 0 };
  const observer = Object.fromEntries(Object.keys(counts).map((key) => [key, () => { counts[key]++; }]));
  const backend = new TypeScriptBackend(fs, state, projects, observer);
  // TypeScript private fields are deliberately read by this measurement probe.
  // No production method or cache implementation is replaced.
  const queries = backend.semanticQueries;
  const target = { file: 'src/app.ts', segments: [{ name: 'target' }] };
  const caller = { file: 'src/app.ts', segments: [{ name: 'caller' }] };
  const identities = new IdentityBook();
  const records = [];

  async function observe(stageIndex) {
    const source = state.sourceFile('src/app.ts');
    const identifiers = source.getDescendantsOfKind(SyntaxKind.Identifier);
    const targetNode = [...identifiers].reverse().find((node) => node.getText() === 'target');
    const missingNode = [...identifiers].reverse().find((node) => node.getText() === 'missing');
    const returned = {
      D: queries.findDefinitions(target),
      R: queries.findReferences(target),
      T: queries.findCallTarget(target),
      C: queries.findCallers(target),
      E: queries.findCallees(caller),
    };
    await Promise.all(Object.values(returned));
    returned.P = queries.definitionNodesOf(targetNode);
    const missingNodes = queries.definitionNodesOf(missingNode);
    const cached = {};
    for (const channel of channels) {
      const handle = queries[channel.field];
      const map = handle instanceof Map ? handle : handle.values;
      const key = channel.id === 'P' ? `src/app.ts:${targetNode.getStart()}` : core.formatSymbolIdentity(channel.id === 'E' ? caller : target);
      cached[channel.id] = map.get(key);
    }
    const missingHandle = queries.definitionsByPosition;
    const missingMap = missingHandle instanceof Map ? missingHandle : missingHandle.values;
    const missingStored = missingMap.get(`src/app.ts:${missingNode.getStart()}`);
    records.push({
      stage: stages[stageIndex][0],
      cached: Object.fromEntries(channels.map(({ id }) => [id, identities.get(cached[id])])),
      returned: Object.fromEntries(channels.map(({ id }) => [id, identities.get(returned[id])])),
      node: identities.get(returned.P[0]),
      emptyPositionCache: identities.get(missingStored),
      emptyPositionLength: missingNodes.length,
      counts: { ...counts },
    });
  }

  await backend.refresh({ snapshot, coverage: 'selection' });
  await observe(0); await observe(1);
  failRefresh = true;
  let refreshError;
  try { await backend.refresh({ snapshot, coverage: 'selection' }); } catch (error) { refreshError = error.message; }
  await observe(2); await observe(3);
  failRefresh = false;
  await backend.refresh({ snapshot, coverage: 'selection' });
  await observe(4); await observe(5);
  let releaseState = 'pending';
  const release = backend.releaseTransientResources();
  void release.then(() => { releaseState = 'fulfilled'; }, () => { releaseState = 'rejected'; });
  await observe(6); await observe(7);
  const releaseWhileProjectPending = releaseState;
  releaseGate.resolve();
  await release;
  return { fixture, records, refreshError, releaseWhileProjectPending };
}

async function releaseProbe(modules, reject) {
  const { core, TypeScriptBackend } = modules;
  const gate = deferred();
  const state = {
    refresh: async () => ({ added: 0, changed: 0, removed: 0, unchanged: 0 }),
    ensureFiles: async () => {}, locate: () => [],
  };
  const graph = { releaseTransientResources: () => gate.promise };
  let searches = 0;
  const backend = new TypeScriptBackend(new core.InMemoryFileSystem({}), state, graph, { definitionSearch: () => { searches++; } });
  const target = { file: 'src/app.ts', segments: [{ name: 'target' }] };
  await backend.refresh({ snapshot: { root: '/repo', files: [] }, coverage: 'selection' });
  const before = await backend.findDefinitions([], target);
  let status = 'pending';
  const release = backend.releaseTransientResources();
  void release.then(() => { status = 'fulfilled'; }, () => { status = 'rejected'; });
  const after = await backend.findDefinitions([], target);
  await Promise.resolve();
  const whilePending = status;
  const failure = new Error('controlled project release failure');
  if (reject) gate.reject(failure); else gate.resolve();
  let returnedFailure = false;
  try { await release; } catch (error) { returnedFailure = error === failure; }
  await Promise.resolve();
  return { whilePending, afterProjectSettlement: status, returnedFailure, oldEntryReused: before === after, searches };
}

async function failureProbe(version, modules) {
  const { TypeScriptSemanticQueryService } = modules;
  const failure = new Error('controlled semantic failure');
  let preparations = 0;
  const queries = new TypeScriptSemanticQueryService(undefined, { ensureFiles: async () => { preparations++; throw failure; } });
  queries.beginTurn(version === 'head' ? [] : { root: '/repo', files: [] });
  const target = { file: 'src/app.ts', segments: [{ name: 'target' }] };
  const definition = queries.findDefinitions(target);
  const callee = queries.findCallees(target);
  await Promise.allSettled([definition, callee]);
  const retainedDefinition = definition === queries.findDefinitions(target);
  const retainedCallee = callee === queries.findCallees(target);
  let referenceSearches = 0;
  const references = new TypeScriptSemanticQueryService(undefined, { locateSemanticCopies: () => { referenceSearches++; throw failure; } });
  references.beginTurn(version === 'head' ? [] : { root: '/repo', files: [] });
  await Promise.allSettled([references.findReferences(target), references.findReferences(target)]);
  return { retainedDefinition, retainedCallee, preparations, referenceSearches };
}

async function coreProbe(core) {
  const scope = new core.TurnScopedCacheScope();
  const first = scope.createCache(), second = scope.createCache();
  let undefinedCalls = 0, thrownCalls = 0, rejectedCalls = 0;
  const firstObject = first.getOrCreate('same', () => ({}));
  const secondObject = second.getOrCreate('same', () => ({}));
  for (let i = 0; i < 2; i++) first.getOrCreate('undefined', () => { undefinedCalls++; return undefined; });
  for (let i = 0; i < 2; i++) {
    try { first.getOrCreate('throw', () => { thrownCalls++; throw new Error('controlled synchronous failure'); }); } catch {}
  }
  const rejected = Promise.reject(new Error('controlled rejection'));
  const getRejected = () => first.getOrCreate('rejected', () => { rejectedCalls++; return rejected; });
  const firstRejected = getRejected();
  await Promise.allSettled([firstRejected]);
  const sameRejectedAfterSettlement = firstRejected === getRejected();
  const old = deferred();
  first.getOrCreate('late', () => old.promise);
  scope.beginTurn();
  const next = Promise.resolve('new');
  first.getOrCreate('late', () => next);
  old.resolve('old');
  const oldStillResolves = await old.promise;
  const lateSettlementKeptNewEntry = first.getOrCreate('late', () => Promise.resolve('unexpected')) === next;
  const beforeRelease = first.getOrCreate('same', () => ({}));
  scope.releaseTransientResources(); scope.releaseTransientResources();
  const usableAfterRepeatedRelease = first.getOrCreate('same', () => ({})) !== beforeRelease;
  return { handlesIsolated: firstObject !== secondObject, usableBeforeBeginTurn: !!firstObject, undefinedCalls, thrownCalls, rejectedCalls, sameRejectedAfterSettlement, oldStillResolves, lateSettlementKeptNewEntry, usableAfterRepeatedRelease };
}

const result = {
  capturedAt: new Date().toISOString(),
  method: 'Actual compiled base/head classes. In-memory TypeScript fixture. Controlled refresh rejection and deferred project release. Identity equality is measured within a version only. Private fields are observed, never replaced.',
  stages: stages.map(([id, label]) => ({ id, label })), channels, versions: {},
};
const sources = {};
const sourcePaths = [
  ['backend', 'packages/backend-typescript/src/typescript-backend/typescript-backend.ts'],
  ['service', 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts'],
  ['service-tests', 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts'],
  ['scope', 'packages/core/src/backend/turn-scoped-cache-scope.ts'],
  ['scope-tests', 'packages/core/src/backend/turn-scoped-cache-scope.test.ts'],
  ['exports', 'packages/core/src/index.ts'],
  ['plan', 'plans/005/daemon-architecture-functional-spec.md'],
  ['guide', 'AGENTS.md'],
  ['project-graph', 'packages/core/src/workspace/project-graph.ts'],
  ['ts-project-graph', 'packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts'],
];
for (const version of ['base', 'head']) {
  const modules = await load(version);
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: modules.tree, encoding: 'utf8' }).trim();
  result.versions[version] = {
    commit,
    contact: await contactSheet(version, modules),
    releaseSuccess: await releaseProbe(modules, false),
    releaseFailure: await releaseProbe(modules, true),
    failures: await failureProbe(version, modules),
  };
  if (version === 'head') result.core = await coreProbe(modules.core);
  for (const [id, path] of sourcePaths) {
    if (version === 'base' && id.startsWith('scope')) continue;
    const content = readFileSync(resolve(modules.tree, path), 'utf8');
    const sha256 = createHash('sha256').update(content).digest('hex');
    sources[`${version}-${id}`] = { path, version, commit, sha256, content };
  }
}
const pr = JSON.parse(readFileSync(resolve(root, 'inputs/pr-127/pr.json'), 'utf8'));
sources['pr-body'] = { path: 'inputs/pr-127/pr.json → body', version: 'bundle', content: pr.body };
sources['commits'] = { path: 'inputs/pr-127/pr.json → commits', version: 'bundle', content: pr.commits.map((commit) => `${commit.sha}\n${commit.subject}\n${commit.body}`).join('\n\n') };
const patch = readFileSync(resolve(root, 'inputs/pr-127/diff.patch'), 'utf8');
sources['diff'] = { path: 'inputs/pr-127/diff.patch', version: 'bundle', content: patch };
mkdirSync(resolve(output, 'evidence'), { recursive: true });
writeFileSync(resolve(output, 'evidence/observations.json'), JSON.stringify(result, null, 2) + '\n');
writeFileSync(resolve(output, 'evidence/sources.json'), JSON.stringify(sources, null, 2) + '\n');
writeFileSync(resolve(output, 'data.js'), `window.CONTACT_DATA = ${JSON.stringify(result)};\nwindow.SOURCE_DATA = ${JSON.stringify(sources)};\n`);
console.log(JSON.stringify({ commits: Object.fromEntries(Object.entries(result.versions).map(([key, value]) => [key, value.commit])), baseRelease: result.versions.base.releaseFailure, headRelease: result.versions.head.releaseFailure, core: result.core }, null, 2));
