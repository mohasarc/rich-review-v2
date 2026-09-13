import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { DaemonRoutingContextState, DaemonRoutingPolicy } from '../../worktrees/pr-148-head/packages/daemon/dist/client/daemon-routing-policy.js';

// Instrument instances in this process. The worktree and its source stay untouched.
const path = new URL('../../worktrees/pr-148-head/packages/daemon/src/client/daemon-routing-policy.ts', import.meta.url);
const record = { schemaVersion: 1, protocolVersion: 1, state: 'ready', symnavVersion: '1.2.3', instanceId: 'case-instance', processToken: 'case-token', endpoint: '/constructed/daemon.sock', workspaceRoot: '/constructed/workspace', workspaceKey: 'workspace', stateKey: 'state', identityKey: 'identity', pid: 123, startedAt: 0, memoryCapBytes: 1 };
const scenarios = [
  { id: 'starting-mismatch', title: 'Starting record + wrong version', clue: 'The starting guard ends the search before version compatibility is examined.', record: { ...record, state: 'starting', symnavVersion: 'old' } },
  { id: 'absent', title: 'No record', clue: 'The record guard can decide without contacting a daemon.', record: undefined },
  { id: 'read-error', title: 'Registry read throws', clue: 'A read failure chooses recovering. It does not become absence.', readError: true },
  { id: 'version-mismatch', title: 'Ready record + wrong version', clue: 'A known version mismatch ends the search before observation.', record: { ...record, symnavVersion: 'old' } },
  { id: 'ready', title: 'Ready and responsive', clue: 'All four guards run; the observer confirms the warm route.', record },
  { id: 'busy', title: 'Busy and responsive', clue: 'Busy still routes warm. Queueing belongs inside the daemon.', record, pongState: 'busy' },
  { id: 'pong-starting', title: 'Ready record, starting reply', clue: 'The observed process is still recovering, so this invocation runs cold.', record, pongState: 'starting' },
  { id: 'unresponsive', title: 'Live but unresponsive', clue: 'Silence selects recovering, without deleting a live process record.', record, observation: 'unresponsive' },
  { id: 'exited', title: 'Process has exited', clue: 'An exited observation attempts exact-process cleanup and selects fallback.', record, observation: 'exited' },
  { id: 'cleanup-error', title: 'Exited, but cleanup throws', clue: 'Cleanup failure does not replace the already selected fallback route.', record, observation: 'exited', cleanupError: true },
  { id: 'pong-version', title: 'Compatible record, wrong reply version', clue: 'Compatibility is also checked on the live response.', record, pongVersion: 'old' },
  { id: 'observe-error', title: 'Observer throws', clue: 'Observation failure selects recovering without cleanup.', record, observeError: true },
  { id: 'observed-starting', title: 'Observer reports starting', clue: 'Starting is distinct from a responsive reply that reports starting.', record, observation: 'starting' },
  { id: 'invalid', title: 'Observer reports corrupt', clue: 'Other observations select incompatible fallback.', record, observation: 'corrupt' },
];
const results = [];
for (const scenario of scenarios) {
  const events = [];
  const policy = new DaemonRoutingPolicy();
  // TypeScript private members compile to ordinary instance properties here.
  // Each wrapper delegates to the original real implementation and only records it.
  policy.guards = policy.guards.map(guard => ({
    evaluate: async context => {
      const name = guard.constructor.name;
      events.push({ kind: 'guard', name });
      const decision = await guard.evaluate(context);
      events.push({ kind: 'decision', name, result: decision === undefined ? 'continue' : `${decision.kind}${decision.reason ? ' / ' + decision.reason : ''}` });
      return decision;
    }
  }));
  const context = new DaemonRoutingContextState(
    { identityKey: 'identity' }, '1.2.3',
    () => { events.push({ kind: 'effect', name: 'readRecord' }); if (scenario.readError) throw new Error('constructed read failure'); return scenario.record; },
    async observed => {
      events.push({ kind: 'effect', name: 'observe' });
      if (scenario.observeError) throw new Error('constructed observation failure');
      return scenario.observation ? { kind: scenario.observation, record: observed } : { kind: 'responsive', record: observed, pong: { state: scenario.pongState ?? 'ready', symnavVersion: scenario.pongVersion ?? '1.2.3' } };
    },
    () => { events.push({ kind: 'effect', name: 'removeIfProcess' }); if (scenario.cleanupError) throw new Error('constructed cleanup failure'); return true; }
  );
  const route = await policy.decide(context);
  results.push({ id: scenario.id, title: scenario.title, clue: scenario.clue, route: { kind: route.kind, ...(route.reason ? { reason: route.reason } : {}) }, events });
}
const result = {
  capturedAt: new Date().toISOString(),
  head: '20838f8dbf413e04767543eb2380d0d114da6c60',
  source: 'packages/daemon/src/client/daemon-routing-policy.ts',
  sourceSha256: createHash('sha256').update(readFileSync(path)).digest('hex'),
  method: 'Real compiled head DaemonRoutingPolicy and DaemonRoutingContextState; constructed records and observer callbacks. Recorded guard execution and callback calls. No sockets, registry files, process launch, or CLI execution. UI replays these captures; it does not run TypeScript in the browser.',
  results
};
writeFileSync(new URL('./route-results.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
console.log(`Captured ${results.length} scenarios from ${fileURLToPath(path)}.`);
