// Execute the actual built client with inert registry, transport, launch and executor ports.
// No daemon, socket, worker or persistent registry is created by this recording.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const out = new URL('.', import.meta.url);
const head = new URL('../../worktrees/pr-148-head/', out);
const pkg = new URL('packages/daemon/dist/', head);
const { DaemonClient, DaemonPolicy } = await import(new URL('index.js', pkg));
const { DaemonTransportError } = await import(new URL('transport/transport-error.js', pkg));
const { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } = await import(new URL('transport/protocol.js', pkg));
const cases = [
  ['disabled', 'Daemon disabled', { enabled: false }],
  ['absent', 'No registry record', { absent: true }],
  ['read-error', 'Registry read throws', { readError: true }],
  ['starting', 'Starting record', { state: 'starting' }],
  ['starting-old', 'Starting record + old version', { state: 'starting', version: '0.0.9' }],
  ['old-record', 'Ready record + old version', { version: '0.0.9' }],
  ['ready', 'Ready and responsive', {}],
  ['busy', 'Busy and responsive', { pongState: 'busy' }],
  ['pong-starting', 'Ready record; starting pong', { pongState: 'starting' }],
  ['pong-old', 'Ready record; old-version pong', { pongVersion: '0.0.9' }],
  ['observation-starting', 'Observer reports starting', { observed: 'starting' }],
  ['unresponsive', 'Observer reports unresponsive', { observed: 'unresponsive' }],
  ['observe-error', 'Observation throws', { observeError: true }],
  ['exited', 'Recorded process exited', { observed: 'exited' }],
  ['remove-error', 'Exited; record cleanup throws', { observed: 'exited', removeError: true }],
  ['incompatible', 'Observer reports incompatible', { observed: 'incompatible' }],
  ['corrupt', 'Observer reports corrupt', { observed: 'corrupt' }],
  ['trigger-pending', 'Absent; warm-up never resolves', { absent: true, triggerPending: true }],
  ['not-submitted', 'Warm transport cannot submit', { failure: ['unreachable', 'not-submitted'] }],
  ['safe-rejection', 'Authenticated not-ready rejection', { failure: ['rejected', 'submitted-unconfirmed', 'not-ready'] }],
  ['uncertain', 'Submitted; no confirmation', { failure: ['timeout', 'submitted-unconfirmed'] }],
  ['accepted-close', 'Accepted; connection closes', { failure: ['closed', 'accepted'] }],
  ['unsafe-rejection', 'Authenticated incompatible rejection', { failure: ['rejected', 'submitted-unconfirmed', 'incompatible'] }],
  ['unknown-error', 'Warm transport throws unknown error', { unknownError: true }],
  ['completion-error', 'Completion promise rejects', { completionError: true }],
  ['workspace-capacity', 'Completion: controlled-resource', { terminal: 'controlled-resource' }],
  ['response-capacity', 'Completion: response-capacity', { terminal: 'response-capacity' }],
  ['worker-exit', 'Completion: worker-exit', { terminal: 'worker-exit' }],
  ['stopping', 'Completion: stopping', { terminal: 'stopping' }],
  ['internal', 'Completion: internal', { terminal: 'internal' }],
  ['malformed', 'Completion: fractional exit code', { malformed: true }],
  ['missing-output', 'Completion: missing output', { missingOutput: true }],
];
const recordings = [];
for (const [id, name, scenario] of cases) {
  const events = [];
  const event = (kind, detail = '') => events.push({ kind, detail });
  const output = (label) => ({
    async *records() { yield { stream: 'stdout', bytes: new TextEncoder().encode('answer\n') }; },
    async dispose() { event('dispose', label); },
  });
  const client = new DaemonClient({
    stateDirectory: fileURLToPath(new URL('unused-state', out)),
    productVersion: '0.1.0', daemonEnabled: scenario.enabled !== false,
    executorModuleUrl: 'file:///unused-executor.mjs',
    readinessProbe: { commandName: 'version', argv: ['--version'] },
    policy: DaemonPolicy.fromSystemMemory({ totalBytes: 512 * 1024 * 1024 }),
    executorFactory: async () => {
      event('factory', 'fresh local executor');
      return { async execute(request) {
        event('local', request.executionMode);
        return { exitCode: 0, output: output('local output') };
      } };
    },
  });
  const runtime = await client.runtime;
  const record = {
    schemaVersion: DAEMON_RECORD_SCHEMA_VERSION, protocolVersion: DAEMON_PROTOCOL_VERSION,
    symnavVersion: scenario.version ?? '0.1.0', workspaceRoot: '/workspace', workspaceKey: 'workspace',
    stateKey: 'state', identityKey: 'identity', instanceId: 'instance-1', processToken: 'token-1',
    endpoint: '/unused-endpoint', pid: 123, state: scenario.state ?? 'ready', startedAt: 1,
  };
  runtime.registry.read = () => {
    event('read', 'registry record');
    if (scenario.readError) throw new Error('synthetic read failure');
    return scenario.absent ? undefined : record;
  };
  runtime.registry.removeIfProcess = () => {
    event('remove', 'matching record only');
    if (scenario.removeError) throw new Error('synthetic removal failure');
    return true;
  };
  runtime.observer.observe = async () => {
    event('observe', 'record observer');
    if (scenario.observeError) throw new Error('synthetic observation failure');
    return { kind: scenario.observed ?? 'responsive', record, pong: {
      kind: 'pong', protocolVersion: DAEMON_PROTOCOL_VERSION, instanceId: 'instance-1',
      symnavVersion: scenario.pongVersion ?? '0.1.0', state: scenario.pongState ?? 'ready',
    } };
  };
  runtime.coordinator.trigger = () => {
    event('trigger', scenario.triggerPending ? 'independent; remains pending' : 'independent warm-up');
    return scenario.triggerPending ? new Promise(() => {}) : Promise.resolve({ status: 'launched' });
  };
  const guards = ['Record present', 'Not starting', 'Version compatible', 'Responsive'];
  runtime.routing.guards.forEach((guard, i) => {
    const evaluate = guard.evaluate.bind(guard);
    guard.evaluate = async (context) => {
      event('guard', guards[i]);
      const result = await evaluate(context);
      if (result) event('decision', result.kind + (result.reason ? ' / ' + result.reason : ''));
      return result;
    };
  });
  runtime.routingTransport.execute = async () => {
    event('warm', 'transport.execute');
    if (scenario.failure) {
      const [code, delivery, rejection] = scenario.failure;
      throw new DaemonTransportError(code, delivery, 'synthetic failure', rejection ? 'instance-1' : undefined, rejection);
    }
    if (scenario.unknownError) throw new Error('synthetic unknown failure');
    return { completion: Promise.resolve().then(() => {
      event('completion', scenario.terminal ?? (scenario.completionError ? 'rejected promise' : 'completed'));
      if (scenario.completionError) throw new Error('synthetic completion failure');
      if (scenario.terminal) return { status: 'failed', code: scenario.terminal };
      return { status: 'completed', result: { exitCode: scenario.malformed ? 1.5 : 0,
        ...(scenario.missingOutput ? {} : { output: output('malformed warm output') }) } };
    }) };
  };
  const result = await client.execute({ workspaceRoot: '/workspace', commandName: 'overview',
    argv: ['overview', 'src/a.ts'], cwd: '/workspace', telemetryEnabled: false });
  const records = [];
  for await (const r of result.result.output.records()) records.push({ stream: r.stream, text: new TextDecoder().decode(r.bytes) });
  recordings.push({ id, name, scenario, events, mode: result.mode, exitCode: result.result.exitCode, output: records });
}
const data = {
  provenance: {
    head: execFileSync('git', ['-C', fileURLToPath(head), 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
    node: process.version,
    technique: 'Actual built DaemonClient façade, runtime and routing guards. Instance ports replaced in memory with deterministic synthetic registry, observer, trigger, transport and executor functions. Browser replays these saved traces; it does not run TypeScript or launch a daemon.',
  },
  recordings,
};
writeFileSync(new URL('recordings.json', out), JSON.stringify(data, null, 2) + '\n');
console.log(`Recorded ${recordings.length} actual client calls with inert external ports.`);
