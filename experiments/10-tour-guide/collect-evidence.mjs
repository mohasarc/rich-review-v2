import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const output = dirname(fileURLToPath(import.meta.url));
const root = resolve(output, '../..');
const service = 'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts';
const backend = 'packages/backend-typescript/src/typescript-backend/typescript-backend.ts';
const core = 'packages/core/src/backend/turn-scoped-cache-scope.ts';
const serviceTest = service.replace('.ts', '.test.ts');
const specs = [
  ['old-ownership', 'base', service, 28, 52],
  ['new-ownership', 'head', service, 29, 66],
  ['old-definitions', 'base', service, 54, 65],
  ['new-definitions', 'head', service, 68, 78],
  ['old-projections', 'base', service, 68, 122],
  ['new-projections', 'head', service, 80, 127],
  ['old-release', 'base', service, 125, 128],
  ['new-release', 'head', service, 129, 132],
  ['positions', 'head', service, 134, 171],
  ['call-target', 'head', service, 204, 216],
  ['old-backend', 'base', backend, 79, 89],
  ['new-backend', 'head', backend, 79, 89],
  ['backend-adapter', 'head', backend, 110, 148],
  ['core-scope', 'head', core, 1, 46],
  ['core-tests', 'head', core.replace('.ts', '.test.ts'), 1, 92],
  ['identity-tests', 'head', serviceTest, 29, 134],
  ['lifecycle-tests', 'head', serviceTest, 135, 217],
  ['existing-tests', 'head', serviceTest, 219, 410],
  ['context-route', 'head', 'apps/cli/src/commands/context/context-command.ts', 43, 78],
  ['project-release', 'head', 'packages/core/src/workspace/project-graph.ts', 144, 152],
  ['spec-behavior', 'head', 'plans/005/daemon-architecture-functional-spec.md', 15, 27],
  ['spec-ownership', 'head', 'plans/005/daemon-architecture-functional-spec.md', 53, 64],
];
const sources = {};
for (const [id, version, path, start, end] of specs) {
  const all = (await readFile(resolve(root, `worktrees/pr-127-${version}`, path), 'utf8')).split('\n');
  sources[id] = { version, path, start, end, lines: all.slice(start - 1, end) };
}
const pr = JSON.parse(await readFile(resolve(root, 'inputs/pr-127/pr.json'), 'utf8'));
const indexPath = 'packages/core/src/index.ts';
const indexLines = (await readFile(resolve(root, 'worktrees/pr-127-head', indexPath), 'utf8')).split('\n');
const exportLine = indexLines.findIndex(line => line.includes('turn-scoped-cache-scope'));
sources['public-export'] = { version: 'head', path: indexPath, start: exportLine + 1,
  end: exportLine + 1, lines: [indexLines[exportLine]] };
const evidence = { sources, pr };
await writeFile(resolve(output, 'evidence/source-snapshots.json'), JSON.stringify(evidence, null, 2) + '\n');
await writeFile(resolve(output, 'sources.js'), `window.SOURCES = ${JSON.stringify(evidence)};\n`);
await writeFile(resolve(output, 'evidence/pr-body.md'), pr.body + '\n');
console.log(`Collected ${Object.keys(sources).length} line-numbered source excerpts.`);
