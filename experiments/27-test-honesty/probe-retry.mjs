// Lab reproduction of the new PR #131 "own fetch resume" witness.
// The socket script and assertions match its empty-result scenario. Only
// constructor composition differs between base and head. This is not a PR test.
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:net';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('.', import.meta.url));
const request = {
  kind: 'execute', protocolVersion: 4, instanceId: 'instance',
  processToken: 'token', requestId: 'request',
  request: { argv: ['overview', 'src/a.ts'], cwd: '/repo', telemetryEnabled: false },
};
const coordinates = { instanceId: 'instance', processToken: 'token', requestId: 'request' };

function frame(message) {
  const bytes = Buffer.from(JSON.stringify(message));
  const length = Buffer.alloc(4);
  length.writeUInt32BE(bytes.length);
  return Buffer.concat([length, bytes]);
}

async function reproduce(side) {
  const worktree = new URL(`../../worktrees/pr-131-${side}/`, import.meta.url);
  const { LocalDaemonTransport } = await import(new URL('apps/cli/dist/daemon/local-daemon-transport.js', worktree));
  const { DaemonCompletionSpoolStore } = await import(new URL('apps/cli/dist/daemon/completion-spool.js', worktree));
  const { DaemonPolicy } = await import(new URL('packages/daemon/dist/daemon-policy.js', worktree));
  const directory = mkdtempSync(join(tmpdir(), 'honesty-27-'));
  const policy = DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 });
  const store = new DaemonCompletionSpoolStore({
    directory, workspaceKey: 'workspace', instanceId: request.instanceId,
    ...(side === 'head' ? { policy: policy.values.output } : {}),
  });
  const spool = await store.create(request.requestId);
  const manifest = await spool.finish(0);
  const accepted = { kind: 'accepted', ...coordinates, acceptedAt: 10, queuePosition: 0 };
  const resultManifest = { kind: 'result-manifest', ...coordinates, manifest };
  const resultEnd = {
    kind: 'result-end', ...coordinates, transferId: manifest.transferId,
    rawBytes: manifest.rawBytes, recordCount: manifest.recordCount, sha256: manifest.sha256,
  };
  const sockets = new Set();
  const events = [];
  let executeCount = 0;
  let fetchCount = 0;
  const server = createServer(socket => {
    sockets.add(socket);
    socket.on('error', () => {});
    socket.on('close', () => sockets.delete(socket));
    let input = Buffer.alloc(0);
    socket.on('data', bytes => {
      input = Buffer.concat([input, bytes]);
      if (input.length < 4 || input.length < 4 + input.readUInt32BE(0)) return;
      const message = JSON.parse(input.subarray(4, 4 + input.readUInt32BE(0)));
      socket.removeAllListeners('data');
      if (message.kind === 'result-ack') {
        events.push({ client: 'result-ack', server: 'result-acknowledged' });
        socket.end(frame({ kind: 'result-acknowledged', ...coordinates, transferId: manifest.transferId }));
      } else if (message.kind === 'result-fetch') {
        fetchCount += 1;
        events.push({ client: 'result-fetch', server: 'manifest + end' });
        socket.end(Buffer.concat([frame(resultManifest), frame(resultEnd)]));
      } else {
        executeCount += 1;
        events.push({ client: 'execute', server: executeCount === 1 ? 'accepted; close before manifest' : 'accepted + manifest; close before end' });
        socket.end(executeCount === 1 ? frame(accepted) : Buffer.concat([frame(accepted), frame(resultManifest)]));
      }
    });
  });
  const endpoint = join(directory, 'daemon.sock');
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(endpoint, resolve); });
  let timer;
  try {
    const transport = side === 'head' ? new LocalDaemonTransport(policy.values) : new LocalDaemonTransport();
    const completion = await Promise.race([
      transport.execute(endpoint, request).then(receipt => receipt.completion),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Probe timeout')), 5000); }),
    ]);
    assert.equal(completion.status, 'completed');
    assert.equal(completion.result.exitCode, 0);
    assert.deepEqual({ executeCount, fetchCount }, { executeCount: 2, fetchCount: 1 });
    await completion.result.output.dispose();
    return {
      side, sha: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: worktree, encoding: 'utf8' }).trim(),
      executeCount, fetchCount, rawBytes: manifest.rawBytes, status: completion.status,
      exitCode: completion.result.exitCode, events,
    };
  } finally {
    clearTimeout(timer);
    for (const socket of sockets) socket.destroy();
    await new Promise(resolve => server.close(resolve));
    rmSync(directory, { recursive: true, force: true });
  }
}

const result = {
  kind: 'Lab reproduction; not an added PR test',
  scenario: 'PR #131 new default-budget reattach + fetch witness, empty result',
  runtime: process.version, platform: process.platform, generated: new Date().toISOString(),
  scope: 'Executes the supplied prebuilt base/head transports over real local sockets; no daemon process or CLI command is launched.',
  runs: [await reproduce('base'), await reproduce('head')],
};
mkdirSync(join(output, 'logs'), { recursive: true });
writeFileSync(join(output, 'logs', 'retry-probe.json'), JSON.stringify(result, null, 2) + '\n');
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
