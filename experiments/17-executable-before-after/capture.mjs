import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { runPair } from './server.mjs';

const folder = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(folder, '../..');
const presets = JSON.parse(readFileSync(join(folder, 'fixtures/presets.json')));
const scenarios = ['refresh', 'failed-refresh', 'release-real', 'release-hold', 'release-reject', 'failures'];
const runs = {};
const checks = [];

for (const preset of presets) {
  for (const scenario of scenarios) {
    const pair = await runPair({ ...preset, scenario, repeats: 2 });
    runs[`${preset.id}:${scenario}`] = pair;
    const at = (version, id) => pair[version].steps.find(step => step.id === id);
    const baseWarm = at('base', 'warm');
    const headWarm = at('head', 'warm');
    assert.deepEqual(baseWarm.rows.map(row => row.output), headWarm.rows.map(row => row.output), 'Real semantic query outputs differ');
    for (const version of ['base', 'head']) {
      const warm = at(version, 'warm');
      assert.deepEqual(warm.rows.slice(0,5).map(row => row.sameReturn), [true, true, true, false, true]);
      assert.equal(warm.counts.references, 1);
      assert.equal(warm.counts.definitions, 1);
      assert.equal(pair[version].provenance.sourceStatus, '');
      if (scenario === 'refresh') {
        assert.ok(at(version, 'boundary').caches.every(cache => cache.size === 0));
        assert.equal(at(version, 'after').details.sameDefinitionPromiseAcrossTurns, false);
      }
      if (scenario === 'failed-refresh') {
        assert.equal(at(version, 'boundary').details.error, 'fixture extraction failure');
        assert.equal(at(version, 'boundary').details.sameDefinitionPromise, true);
        assert.deepEqual(at(version, 'after').counts, warm.counts);
      }
      if (scenario.startsWith('release-')) assert.ok(at(version, 'cleared').caches.every(cache => cache.size === 0));
      if (scenario === 'failures') {
        assert.equal(at(version, 'sync-error').details.referenceSearches, 2);
        assert.equal(at(version, 'boundary').details.ensureCalls, 2);
        assert.equal(at(version, 'boundary').details.sameErrorObject, true);
        assert.equal(at(version, 'after').details.sameRejectedPromise, false);
      }
    }
    if (scenario === 'release-hold' || scenario === 'release-reject') {
      assert.deepEqual(at('base', 'boundary').release, { backend: 'fulfilled', project: 'pending' });
      assert.deepEqual(at('head', 'boundary').release, { backend: 'pending', project: 'pending' });
    }
    if (scenario === 'release-reject') {
      assert.deepEqual(at('base', 'settled').release, { backend: 'fulfilled', project: 'rejected' });
      assert.deepEqual(at('head', 'settled').release, { backend: 'rejected', project: 'rejected' });
      assert.equal(at('head', 'settled').details.sameErrorObject, true);
    }
    assert.equal(pair.base.core.available, false);
    assert.equal(pair.head.core.undefinedFactoryCalls, 1);
    assert.equal(pair.head.core.synchronousThrowCalls, 2);
    assert.equal(pair.head.core.rejectedFactoryCalls, 1);
    assert.equal(pair.head.core.lateSettlement.newPromiseRetained, true);
    checks.push(`${preset.id} / ${scenario}: captured both revisions; observation checks passed`);
    console.log(checks.at(-1));
  }
}

const paths = [
  'packages/backend-typescript/src/typescript-backend/typescript-backend.ts',
  'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts',
  'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts',
  'packages/core/src/backend/turn-scoped-cache-scope.ts',
  'packages/core/src/backend/turn-scoped-cache-scope.test.ts',
  'packages/core/src/index.ts',
  'packages/core/src/workspace/project-graph.ts',
  'packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts',
  'plans/005/daemon-architecture-functional-spec.md',
];
const sources = {};
for (const version of ['base', 'head']) {
  sources[version] = {};
  for (const path of paths) {
    try { const content = readFileSync(join(root, 'worktrees', `pr-127-${version}`, path), 'utf8'); sources[version][path] = { content, sha256: createHash('sha256').update(content).digest('hex') }; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
const bundle = {
  generatedAt: new Date().toISOString(), presets, runs, sources,
  pr: JSON.parse(readFileSync(join(root, 'inputs/pr-127/pr.json'))),
  diff: readFileSync(join(root, 'inputs/pr-127/diff.patch'), 'utf8'), checks,
  harnessHashes: ['runner.mjs', 'server.mjs', 'capture.mjs', 'fixtures/presets.json'].map(path => ({ path, sha256: createHash('sha256').update(readFileSync(join(folder, path))).digest('hex') })),
};
writeFileSync(join(folder, 'captured.js'), 'window.EXECUTION_CAPTURE = ' + JSON.stringify(bundle).replaceAll('<', '\\u003c') + ';\n');
writeFileSync(join(folder, 'evidence/observations.json'), JSON.stringify({ generatedAt: bundle.generatedAt, harnessHashes: bundle.harnessHashes, checks, sample: runs['calls:release-reject'] }, null, 2));
console.log(`Saved ${Object.keys(runs).length} comparisons to captured.js`);
