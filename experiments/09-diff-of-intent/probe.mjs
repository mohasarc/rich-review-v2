import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const require = createRequire(import.meta.url);
const ts = require(resolve(root, 'worktrees/pr-131-head/node_modules/typescript'));
const hashes = {};
function source(subject, side, path) {
  const key = `${subject}-${side}/${path}`;
  const text = readFileSync(resolve(root, 'worktrees', key), 'utf8');
  hashes[key] = createHash('sha256').update(text).digest('hex');
  return text;
}
function compile(text) {
  const js = ts.transpileModule(text, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  vm.runInNewContext(js, { exports, Map, Promise, Error }, { timeout: 2000 });
  return exports;
}

// Run the complete, unmodified cache module. No TypeScript backend is simulated.
const { TurnScopedCacheScope } = compile(source('pr-127', 'head',
  'packages/core/src/backend/turn-scoped-cache-scope.ts'));
const scope = new TurnScopedCacheScope();
const handle = scope.createCache();
let factoryCalls = 0;
handle.getOrCreate('undefined', () => { factoryCalls++; return undefined; });
handle.getOrCreate('undefined', () => { factoryCalls++; return undefined; });
assert.equal(factoryCalls, 1);
let synchronousThrows = 0;
for (let i = 0; i < 2; i++) {
  try { handle.getOrCreate('throw', () => { synchronousThrows++; throw new Error('sync'); }); }
  catch { /* record the next invocation of the factory */ }
}
assert.equal(synchronousThrows, 2);
const rejected = Promise.reject(new Error('async'));
rejected.catch(() => {});
assert.equal(handle.getOrCreate('reject', () => rejected), rejected);
await rejected.catch(() => {});
assert.equal(handle.getOrCreate('reject', () => Promise.resolve('replacement')), rejected);
const before = handle.getOrCreate('object', () => ({}));
scope.releaseTransientResources();
const after = handle.getOrCreate('object', () => ({}));
assert.notEqual(before, after);

// Extract exact method AST nodes. Stub the attempt boundary, not the method under study.
// This checks error selection only; it does not execute sockets, output, or a daemon.
function transportMethods(side) {
  const text = source('pr-131', side, 'apps/cli/src/daemon/local-daemon-transport.ts');
  const ast = ts.createSourceFile('transport.ts', text, ts.ScriptTarget.Latest, true);
  const classes = ast.statements.filter(ts.isClassDeclaration);
  const errorClass = classes.find(node => node.name?.text === 'DaemonTransportError');
  const transportClass = classes.find(node => node.name?.text === 'LocalDaemonTransport');
  const methodName = side === 'base' ? 'completeWithOneReattachment' : 'completeWithReattachments';
  const methods = transportClass.members.filter(node =>
    node.name && [methodName, 'isAcceptedConnectionClose'].includes(node.name.getText(ast)));
  assert.equal(methods.length, 2);
  const extracted = `${errorClass.getText(ast)}\nexport class LocalDaemonTransport {\n${methods.map(node => node.getText(ast)).join('\n')}\n}`;
  return { ...compile(extracted), methodName };
}
async function errorSelection(side, stage) {
  const { LocalDaemonTransport, DaemonTransportError, methodName } = transportMethods(side);
  const subject = new LocalDaemonTransport();
  subject.deliveryPolicy = { postAcceptanceExecutionReattachmentLimit: 1 };
  const first = new DaemonTransportError('closed', 'accepted', 'original-close', 'instance');
  const second = new DaemonTransportError('corrupt', 'accepted', 'later-failure', 'instance');
  let attempts = 0;
  subject.executeOnce = async () => {
    attempts++;
    if (stage === 'before-acceptance') throw second;
    return { completion: Promise.reject(second) };
  };
  let selected;
  try { await subject[methodName]('unused', { instanceId: 'instance' }, Promise.reject(first)); }
  catch (error) { selected = error === first ? 'original-close' : error === second ? 'later-failure' : 'unknown'; }
  assert.equal(attempts, 1);
  return { side, reattachedFailureStage: stage, selectedError: selected, reattachedAttempts: attempts };
}
const errorResults = [];
for (const stage of ['before-acceptance', 'completion']) {
  for (const side of ['base', 'head']) errorResults.push(await errorSelection(side, stage));
}
assert.deepEqual(errorResults.map(row => row.selectedError),
  ['original-close', 'original-close', 'original-close', 'later-failure']);
const result = {
  description: 'Isolated execution of current source: complete cache module; exact transport method ASTs with executeOnce stubbed.',
  limits: 'No sockets, daemon process, end-to-end parity, or whole-PR correctness tested.',
  cache: { undefinedFactoryCalls: factoryCalls, synchronousThrowFactoryCalls: synchronousThrows,
    rejectedPromiseRetained: true, sameHandleReusableAfterRelease: true },
  errorSelection: errorResults,
  sourceSha256: hashes,
};
writeFileSync(resolve(here, 'probe-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
