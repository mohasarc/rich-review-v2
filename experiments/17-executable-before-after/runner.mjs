import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const folder = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(folder, '../..');
const cacheNames = ['definitionsByIdentity', 'referencesByIdentity', 'callTargetsByIdentity', 'callersByIdentity', 'calleesByIdentity', 'definitionsByPosition'];

export class Execution {
  constructor(version, input) {
    this.version = version;
    this.input = input;
    this.tree = join(root, 'worktrees', `pr-127-${version}`);
    this.ids = new WeakMap();
    this.nextId = 0;
    this.steps = [];
    this.turn = 1;
    this.counts = { definitions: 0, references: 0, positions: 0, projectLoads: 0, projectReleases: 0 };
    this.release = { backend: 'not called', project: 'not called' };
  }

  async load() {
    const fromTree = (path) => import(pathToFileURL(join(this.tree, path)).href);
    this.core = await fromTree('packages/core/dist/index.js');
    const { TypeScriptBackend } = await fromTree('packages/backend-typescript/dist/typescript-backend/typescript-backend.js');
    const { TypeScriptFileEntryExtractor } = await fromTree('packages/backend-typescript/dist/typescript-backend/typescript-workspace-state.js');
    const require = createRequire(join(this.tree, 'packages/backend-typescript/package.json'));
    this.morph = require('ts-morph');
    this.contents = Object.fromEntries(Object.entries(this.input.files).map(([path, source]) => [`/repo/${path}`, source]));
    this.fs = new this.core.InMemoryFileSystem(this.contents);
    const realExtractor = new TypeScriptFileEntryExtractor();
    const extractor = { extract: (request) => {
      if (this.failExtraction) throw this.extractionFailure;
      return realExtractor.extract(request);
    } };
    this.backend = new TypeScriptBackend(this.fs, undefined, undefined, {
      definitionSearch: () => this.counts.definitions++,
      referenceSearch: () => this.counts.references++,
      callTargetResolution: () => this.counts.positions++,
      semanticProjectLoaded: () => this.counts.projectLoads++,
      semanticCacheReleased: () => this.counts.projectReleases++,
    }, extractor);
    this.queries = this.backend.semanticQueries;
    this.target = { file: this.input.targetFile, segments: this.input.target.split('.').map(name => ({ name })) };
    this.caller = { file: this.input.callerFile, segments: this.input.caller.split('.').map(name => ({ name })) };
    const summary = await this.backend.refresh({ snapshot: this.snapshot(), coverage: 'workspace' });
    this.record('start', 'Refresh succeeds · turn 1 begins', { summary });
  }

  snapshot() {
    this.files = Object.keys(this.input.files).map(relative => ({ relative, absolute: `/repo/${relative}`, metadata: this.fs.metadataSync(`/repo/${relative}`) }));
    return { root: '/repo', files: this.files };
  }

  id(value) {
    if ((typeof value !== 'object' || value === null) && typeof value !== 'function') return String(value);
    if (!this.ids.has(value)) this.ids.set(value, `${value instanceof Promise ? 'P' : Array.isArray(value) ? 'A' : 'O'}${++this.nextId}`);
    return this.ids.get(value);
  }

  cacheState() {
    return cacheNames.map(name => {
      const handle = this.queries[name];
      const map = handle instanceof Map ? handle : handle.values;
      return { name, size: map.size, entries: [...map].map(([key, value]) => ({ key, id: this.id(value), type: value instanceof Promise ? 'promise' : 'locations', ...(Array.isArray(value) ? { length: value.length } : {}) })) };
    });
  }

  record(id, label, details = {}, rows = []) {
    const step = { id, label, turn: this.turn, caches: this.cacheState(), counts: { ...this.counts }, release: { ...this.release }, details, rows };
    this.steps.push(step);
    return step;
  }

  compact(value) {
    return JSON.parse(JSON.stringify(value, (key, entry) => typeof entry === 'bigint' ? String(entry) : entry));
  }

  async queryBatch(id, label) {
    const q = this.queries;
    const methods = [
      ['Definitions', () => q.findDefinitions(this.target)],
      ['Call target', () => q.findCallTarget(this.target)],
      ['Callers', () => q.findCallers(this.target)],
      ['References', () => q.findReferences(this.target)],
      ['Callees', () => q.findCallees(this.caller)],
    ];
    const issued = methods.map(([name, call]) => {
      const values = Array.from({ length: this.input.repeats }, () => { try { return { returned: call() }; } catch (error) { return { error }; } });
      for (const item of values) if (item.returned instanceof Promise) void item.returned.catch(() => {});
      return { name, values };
    });
    const rows = [];
    for (const { name, values } of issued) {
      const settled = await Promise.all(values.map(async item => {
        if (item.error) return { state: 'threw', error: item.error.message };
        try { return { state: 'fulfilled', value: await item.returned }; }
        catch (error) { return { state: 'rejected', error: error.message }; }
      }));
      rows.push({
        name,
        returnIds: values.map(item => item.error ? 'throw' : this.id(item.returned)),
        sameReturn: values.every(item => item.returned === values[0].returned && !item.error),
        valueIds: settled.map(item => item.state === 'fulfilled' ? this.id(item.value) : item.state),
        sameValue: settled.every(item => item.state === 'fulfilled' && item.value === settled[0].value),
        output: settled[0].state === 'fulfilled' ? this.compact(settled[0].value) : settled[0],
      });
    }
    const source = this.backend.state.sourceFile(this.input.callerFile);
    const calls = source?.getDescendantsOfKind(this.morph.SyntaxKind.CallExpression) ?? [];
    for (const call of calls) {
      const node = call.getExpression();
      if (!this.morph.Node.isIdentifier(node)) continue;
      const values = Array.from({ length: this.input.repeats }, () => q.definitionNodesOf(node));
      rows.push({ name: `Position ${node.getText()} @${node.getStart()}`, returnIds: values.map(value => this.id(value)), sameReturn: values.every(value => value === values[0]), valueIds: values.map(value => value[0] ? this.id(value[0]) : 'empty'), sameValue: values.every(value => value[0] === values[0][0]), output: values[0].map(definition => ({ file: this.backend.state.relativePathOf(definition.getSourceFile()), start: definition.getStart(), kind: definition.getKindName(), text: definition.getText() })) });
    }
    this.record(id, label, { repeats: this.input.repeats, observationBoundary: 'Direct semantic-service return values; backend refresh and release methods run unchanged.' }, rows);
  }

  async refreshScenario() {
    const old = this.queries.findDefinitions(this.target);
    if (this.input.scenario === 'failed-refresh') {
      this.extractionFailure = new Error('fixture extraction failure');
      this.failExtraction = true;
      this.contents[`/repo/${this.input.callerFile}`] += '\n// a changed revision triggers extraction\n';
      let error;
      try { await this.backend.refresh({ snapshot: this.snapshot(), coverage: 'selection' }); }
      catch (caught) { error = caught.message; }
      this.failExtraction = false;
      this.record('boundary', 'Refresh rejects · current cache entries remain', { error, sameDefinitionPromise: this.queries.findDefinitions(this.target) === old, injection: 'The extractor throws once the real state refresh attempts to prepare a changed source revision. The backend, state refresh, and rollback run unchanged.' });
      await this.queryBatch('after', 'Query the preserved successful turn');
    } else {
      const summary = await this.backend.refresh({ snapshot: this.snapshot(), coverage: 'workspace' });
      this.turn++;
      this.record('boundary', 'Refresh succeeds · all six caches are empty', { summary, sourceBytesChanged: false });
      await this.queryBatch('after', 'Same source, fresh query entries in turn 2');
      this.steps.at(-1).details.sameDefinitionPromiseAcrossTurns = this.queries.findDefinitions(this.target) === old;
    }
  }

  async releaseScenario() {
    const mode = this.input.scenario;
    const graph = this.backend.projectGraph;
    const realRelease = graph.releaseTransientResources.bind(graph);
    let settleGate;
    let rejectGate;
    let projectPromise;
    const gate = new Promise((resolve, reject) => { settleGate = resolve; rejectGate = reject; });
    // Observe the ignored base promise to record rejection without crashing the worker.
    // This does not join it to the backend's returned promise.
    graph.releaseTransientResources = () => {
      this.release.project = 'pending';
      projectPromise = mode === 'release-real' ? realRelease() : gate.then(() => realRelease());
      void projectPromise.then(() => { this.release.project = 'fulfilled'; }, error => { this.release.project = 'rejected'; this.projectError = error; });
      return projectPromise;
    };
    this.release.backend = 'pending';
    const returned = this.backend.releaseTransientResources();
    void returned.then(() => { this.release.backend = 'fulfilled'; }, error => { this.release.backend = 'rejected'; this.backendError = error; });
    this.record('cleared', 'Release called · cache clearing has already happened', { backendReturn: this.id(returned), graphReturn: this.id(projectPromise), observation: 'Synchronous snapshot immediately after calling backend.releaseTransientResources().' });
    await new Promise(resolve => setImmediate(resolve));
    this.record('boundary', mode === 'release-real' ? 'Observe the concrete release' : 'Project release is held open', { controlledGate: mode !== 'release-real' });
    // Querying while release is pending probes invalidation, not a daemon scheduling policy.
    await this.queryBatch('during', 'A later access creates fresh entries');
    if (mode === 'release-reject') rejectGate(new Error('fixture project release failure'));
    else settleGate();
    await Promise.allSettled([projectPromise, returned]);
    await new Promise(resolve => setImmediate(resolve));
    this.record('settled', mode === 'release-reject' ? 'Reject project release · observe the backend promise' : 'Finish project release · observe the backend promise', { projectError: this.projectError?.message ?? null, backendError: this.backendError?.message ?? null, sameErrorObject: this.projectError ? this.projectError === this.backendError : null });
  }

  async failureScenario() {
    // A real absent symbol throws during synchronous reference discovery.
    let absentName = '__fixture_absent_symbol__';
    while (Object.values(this.contents).some(source => source.includes(absentName))) absentName += '_';
    const missing = { file: this.input.targetFile, segments: [{ name: absentName }] };
    const referenceErrors = [];
    const startSearches = this.counts.references;
    for (let i = 0; i < 2; i++) { try { await this.queries.findReferences(missing); } catch (error) { referenceErrors.push(error.message); } }
    this.record('sync-error', 'Synchronous discovery throws · the next call retries', { requestedIdentity: missing, referenceSearches: this.counts.references - startSearches, errors: referenceErrors, injection: 'None: reference discovery is asked for a symbol absent from the real fixture.' });
    const state = this.backend.state;
    const realEnsure = state.ensureFiles.bind(state);
    const failure = new Error('fixture semantic preparation failure');
    let ensureCalls = 0;
    state.ensureFiles = () => { ensureCalls++; return Promise.reject(failure); };
    const definitions = this.queries.findDefinitions(missing);
    const callees = this.queries.findCallees(missing);
    const settled = await Promise.allSettled([definitions, callees]);
    const againDefinitions = this.queries.findDefinitions(missing);
    const againCallees = this.queries.findCallees(missing);
    await Promise.allSettled([againDefinitions, againCallees]);
    state.ensureFiles = realEnsure;
    this.record('boundary', 'Rejected promises stay cached for this turn', { ensureCalls, definitions: [this.id(definitions), this.id(againDefinitions)], callees: [this.id(callees), this.id(againCallees)], sameErrorObject: settled.every(result => result.status === 'rejected' && result.reason === failure), injection: 'ensureFiles returns a rejected promise. Real definition/callee functions and cache methods execute.' });
    const summary = await this.backend.refresh({ snapshot: this.snapshot(), coverage: 'workspace' });
    this.turn++;
    this.record('reset-errors', 'A successful refresh clears those rejected entries', { summary });
    const after = this.queries.findDefinitions(missing);
    const value = await after;
    this.record('after', 'The absent definition now resolves to an empty result', { returnId: this.id(after), sameRejectedPromise: after === definitions, output: value });
  }

  async coreContracts() {
    if (!this.core.TurnScopedCacheScope) return { available: false, note: 'No exported generic cache scope exists in the base. These are head-only executions, not a simulated base.' };
    const scope = new this.core.TurnScopedCacheScope();
    const first = scope.createCache();
    const second = scope.createCache();
    let undefinedCalls = 0;
    first.getOrCreate('undefined', () => { undefinedCalls++; return undefined; });
    first.getOrCreate('undefined', () => { undefinedCalls++; return 'replacement'; });
    const one = first.getOrCreate('same-key', () => []);
    const two = second.getOrCreate('same-key', () => []);
    let throwCalls = 0;
    for (let i = 0; i < 2; i++) { try { first.getOrCreate('throw', () => { throwCalls++; throw new Error('sync'); }); } catch {} }
    const failure = new Error('rejected');
    const rejected = Promise.reject(failure);
    void rejected.catch(() => {});
    let rejectedCalls = 0;
    const p1 = first.getOrCreate('reject', () => { rejectedCalls++; return rejected; });
    await Promise.allSettled([p1]);
    const p2 = first.getOrCreate('reject', () => { rejectedCalls++; return Promise.resolve('other'); });
    let settleOld;
    const oldPromise = new Promise(resolve => { settleOld = resolve; });
    first.getOrCreate('late', () => oldPromise);
    scope.beginTurn();
    const currentPromise = Promise.resolve('new');
    first.getOrCreate('late', () => currentPromise);
    settleOld('old');
    const oldResult = await oldPromise;
    const stored = first.getOrCreate('late', () => Promise.resolve('replacement'));
    const newResult = await stored;
    const beforeRelease = first.getOrCreate('value', () => ({}));
    scope.releaseTransientResources();
    scope.releaseTransientResources();
    const afterRelease = first.getOrCreate('value', () => ({}));
    return { available: true, undefinedFactoryCalls: undefinedCalls, isolatedSameKeyValues: one !== two, synchronousThrowCalls: throwCalls, rejectedFactoryCalls: rejectedCalls, sameRejectedPromise: p1 === p2, lateSettlement: { oldResult, newResult, newPromiseRetained: stored === currentPromise }, repeatedRelease: { cleared: beforeRelease !== afterRelease, sameHandleUsable: true } };
  }

  provenance() {
    const files = ['packages/backend-typescript/dist/typescript-backend/typescript-backend.js', 'packages/backend-typescript/dist/typescript-backend/typescript-semantic-query-service.js', 'packages/core/dist/workspace/project-graph.js'];
    if (this.version === 'head') files.push('packages/core/dist/backend/turn-scoped-cache-scope.js');
    return { version: this.version, sha: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: this.tree, encoding: 'utf8' }).trim(), node: process.version, sourceStatus: execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { cwd: this.tree, encoding: 'utf8' }).trim(), loadedFiles: files.map(path => ({ path, sha256: createHash('sha256').update(readFileSync(join(this.tree, path))).digest('hex') })) };
  }

  async run() {
    await this.load();
    await this.queryBatch('warm', `Ask every query ${this.input.repeats} times inside one turn`);
    if (this.input.scenario.startsWith('release-')) await this.releaseScenario();
    else if (this.input.scenario === 'failures') await this.failureScenario();
    else await this.refreshScenario();
    return { provenance: this.provenance(), steps: this.steps, core: await this.coreContracts() };
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;
  try { process.stdout.write(JSON.stringify(await new Execution(process.argv[2], JSON.parse(input)).run())); }
  catch (error) { process.stderr.write(error.stack + '\n'); process.exitCode = 1; }
}
