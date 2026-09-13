import { createServer } from 'node:net';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = new URL('../../../', import.meta.url);
const coordinates = { instanceId: 'instance', processToken: 'token', requestId: 'request' };
const request = { kind: 'execute', protocolVersion: 4, ...coordinates,
  request: { argv: ['overview', 'src/a.ts'], cwd: '/repo', telemetryEnabled: false } };
const manifest = { transferId: 'transfer', instanceId: 'instance', requestId: 'request', rawBytes: 0, recordCount: 0,
  sha256: createHash('sha256').digest('hex'), exitCode: 0 };
const accepted = { kind: 'accepted', ...coordinates, acceptedAt: 10, queuePosition: 0 };
const resultManifest = { kind: 'result-manifest', ...coordinates, manifest };
const resultEnd = { kind: 'result-end', ...coordinates, transferId: manifest.transferId,
  rawBytes: 0, recordCount: 0, sha256: manifest.sha256 };
const ack = { kind: 'result-acknowledged', ...coordinates, transferId: manifest.transferId };
function frame(value) {
  const payload = Buffer.from(JSON.stringify(value));
  const header = Buffer.alloc(4);
  header.writeUInt32BE(payload.length);
  return Buffer.concat([header, payload]);
}
function encode(...values) { return Buffer.concat(values.map(frame)); }

async function serverRun(handler, operation) {
  const directory = await mkdtemp(join(tmpdir(), 'rr15-'));
  const endpoint = join(directory, 'socket');
  const sockets = new Set();
  const messages = [];
  const timers = [];
  const server = createServer(socket => {
    sockets.add(socket);
    socket.on('error', () => {});
    let buffered = Buffer.alloc(0);
    socket.on('data', data => {
      buffered = Buffer.concat([buffered, data]);
      if (buffered.length < 4 || buffered.length < 4 + buffered.readUInt32BE(0)) return;
      const message = JSON.parse(buffered.subarray(4, 4 + buffered.readUInt32BE(0)).toString());
      messages.push({ kind: message.kind, ...(message.offset === undefined ? {} : { offset: message.offset }) });
      buffered = Buffer.alloc(0);
      handler(socket, message, messages, timers);
    });
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(endpoint, resolve); });
  try {
    const value = await operation(endpoint);
    return { messages, value };
  } catch (error) {
    return { messages, error: { name: error.name, code: error.code, delivery: error.delivery,
      message: error.message, authenticatedInstanceId: error.authenticatedInstanceId,
      retrySafe: error.retrySafe } };
  } finally {
    timers.forEach(clearTimeout);
    for (const socket of sockets) socket.destroy();
    await new Promise(resolve => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
}

const rows = [];
for (const edition of ['base', 'head']) {
  const worktree = new URL(`worktrees/pr-131-${edition}/`, root);
  const { LocalDaemonTransport } = await import(new URL('apps/cli/dist/daemon/local-daemon-transport.js', worktree));
  const { DaemonPolicy } = await import(new URL('packages/daemon/dist/daemon-policy.js', worktree));
  const defaults = DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }).values;
  const transport = (purpose = 'ordinary', resume = 1, reattach = 1) => edition === 'base'
    ? new LocalDaemonTransport(purpose === 'status-observer' ? { requestTimeoutMs: 100 } : {})
    : new LocalDaemonTransport({ ...defaults, delivery: {
      resultTransferResumeLimitPerExecutionAttempt: resume,
      postAcceptanceExecutionReattachmentLimit: reattach,
    } }, { responseTimeoutPurpose: purpose });
  for (const purpose of ['ordinary', 'status-observer']) {
    const result = await serverRun((socket, message, _messages, timers) => {
      timers.push(setTimeout(() => socket.end(frame({ kind: 'pong', protocolVersion: 4,
        instanceId: 'instance', symnavVersion: 'test' })), 150));
    }, endpoint => transport(purpose).request(endpoint, {
      kind: 'ping', protocolVersion: 4, instanceId: 'instance', processToken: 'token' }));
    rows.push({ edition, scenario: 'ping-150ms', purpose, ...result });
  }
  for (const scenario of ['reattach-then-resume', 'corrupt-after-reattach', 'fetch-eof', 'two-reattachments']) {
    let executeCount = 0;
    const result = await serverRun((socket, message) => {
      if (message.kind === 'result-ack') return socket.end(frame(ack));
      if (message.kind === 'result-fetch') {
        return socket.end(scenario === 'fetch-eof' ? frame(resultManifest) : encode(resultManifest, resultEnd));
      }
      executeCount++;
      if (scenario === 'fetch-eof') return socket.end(encode(accepted, resultManifest));
      if (executeCount === 1 || (scenario === 'two-reattachments' && executeCount === 2))
        return socket.end(frame(accepted));
      if (scenario === 'corrupt-after-reattach') return socket.end(encode(accepted, { kind: 'not-a-frame' }));
      if (scenario === 'two-reattachments') return socket.end(encode(accepted, resultManifest, resultEnd));
      socket.end(encode(accepted, resultManifest));
    }, async endpoint => {
      const receipt = await transport('ordinary', scenario === 'fetch-eof' ? 2 : 1,
        scenario === 'two-reattachments' ? 2 : 1).execute(endpoint, request);
      const completion = await receipt.completion;
      if (completion.status !== 'completed') return completion;
      const value = { status: completion.status, exitCode: completion.result.exitCode,
        rawBytes: completion.result.output.summary.rawBytes };
      await completion.result.output.dispose();
      return value;
    });
    rows.push({ edition, scenario, ...result });
  }
}
const result = {
  recordedAt: new Date().toISOString(),
  node: process.version,
  method: 'Real compiled LocalDaemonTransport modules against a scripted local Unix socket peer. No full daemon, worker, navigation or production server. Non-default budgets are injected only for fetch-eof (resume=2) and two-reattachments (reattach=2); the base has no matching numeric seam.',
  commits: Object.fromEntries(['base', 'head'].map(edition => [edition,
    execFileSync('git', ['-C', fileURLToPath(new URL(`worktrees/pr-131-${edition}`, root)), 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()])),
  rows,
};
await writeFile(new URL('observations.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
