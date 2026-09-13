import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import assert from 'node:assert/strict';

const folder = dirname(fileURLToPath(import.meta.url));
const root = resolve(folder, '../..');
const require = createRequire(import.meta.url);
const ts = require(resolve(root, 'worktrees/pr-131-head/node_modules/typescript/lib/typescript.js'));
const sourcePath = 'apps/cli/src/daemon/local-daemon-transport.ts';

function between(source, start, end) {
  const begin = source.indexOf(start);
  const finish = source.indexOf(end, begin + start.length);
  assert(begin >= 0 && finish > begin, `Missing source boundary: ${start}`);
  return source.slice(begin, finish);
}

function extract(side) {
  const source = readFileSync(resolve(root, `worktrees/pr-131-${side}`, sourcePath), 'utf8');
  const methodName = side === 'base' ? 'completeWithOneReattachment' : 'completeWithReattachments';
  const method = between(source, `  private async ${methodName}(`, '\n  private executeOnce(');
  const guard = between(source, '  private static isAcceptedConnectionClose(', '\n  private fetchCompletion(');
  const errorClass = between(source, 'export class DaemonTransportError', '\nclass DaemonResponseError').replace('export ', '');
  const isolated = `${errorClass}\nclass LocalDaemonTransport {\n${method}\n${guard}\n}`;
  const js = ts.transpileModule(isolated, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
  }).outputText;
  const types = new Function(`${js}\nreturn {LocalDaemonTransport, DaemonTransportError};`)();
  return { ...types, methodName, sha256: createHash('sha256').update(isolated).digest('hex') };
}

const request = { instanceId: 'instance' };
const result = {
  scope: 'Exact extracted completion methods, guard, and transport-error class; executeOnce and completion promises are stubs. No sockets or daemon.',
  sourcePath,
  cases: [],
};
for (const side of ['base', 'head']) {
  const { LocalDaemonTransport, DaemonTransportError, methodName, sha256 } = extract(side);
  for (const stage of ['before-acceptance', 'after-acceptance']) {
    const E0 = new DaemonTransportError('closed', 'accepted', 'E0', 'instance');
    const E1 = new DaemonTransportError('corrupt', 'accepted', 'E1', 'instance');
    const transport = new LocalDaemonTransport();
    transport.deliveryPolicy = { postAcceptanceExecutionReattachmentLimit: 1 };
    let reattachments = 0;
    transport.executeOnce = async () => {
      reattachments++;
      if (stage === 'before-acceptance') throw E1;
      return { completion: Promise.reject(E1) };
    };
    let returned;
    try {
      await transport[methodName]('unused', request, Promise.reject(E0));
    } catch (error) {
      returned = error === E0 ? 'E0' : error === E1 ? 'E1' : 'unknown';
    }
    const expected = side === 'head' && stage === 'after-acceptance' ? 'E1' : 'E0';
    assert.equal(returned, expected);
    assert.equal(reattachments, 1);
    result.cases.push({ side, stage, returned, reattachments, extractedSourceSha256: sha256 });
  }
}
writeFileSync(resolve(folder, 'probe-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
