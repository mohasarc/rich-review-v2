(function (root) {
  'use strict';
  const DEFAULTS = { chunk: 65536, inline: 262144, result: 268435456, aggregate: 536870912 };
  const MINIATURE = { chunk: 2, inline: 4, result: 8, aggregate: 12 };
  const identity = { instanceId: 'daemon-1', processToken: 'token…', requestId: 'request-15' };

  function simulate(input = {}, edition = 'head') {
    const config = { scene: 'reply', purpose: 'status-observer', message: 'ping', delay: 150,
      fault: 'reattach-then-resume', reattachments: 1, resumes: 1, duration: 6000,
      profile: 'production', bytes: 327680, ...input };
    const state = { client: 'ready', daemon: 'ready', attempt: 0, reattachments: 0, resumes: 0,
      resumeLimit: edition === 'base' ? 1 : Number(config.resumes),
      reattachLimit: edition === 'base' ? 1 : Number(config.reattachments),
      records: 0, retained: 0, clientRawBytes: 0, clientStorage: 'none', clock: 'not armed', storage: 'none', executionCount: 0 };
    const limits = config.scene === 'output' && edition === 'head' && config.profile === 'miniature' ? MINIATURE : DEFAULTS;
    const events = [];
    let at = 0;
    let outcome = '';
    let resultCode = '';
    function event(direction, label, detail, delta = {}, payload = null, time) {
      Object.assign(state, delta);
      if (time !== undefined) at = Math.max(at, time);
      else at += 8;
      events.push({ direction, label, detail, payload, time: at, state: { ...state } });
    }
    function finish(code, label, detail) {
      resultCode = code;
      outcome = label;
      event('client', label, detail, { client: label, clock: 'off' });
    }
    const wireRequest = kind => ({ kind, protocolVersion: 4, ...identity,
      ...(kind === 'execute' ? { request: { argv: ['overview', 'src/a.ts'], cwd: '/repo', telemetryEnabled: false } } : {}) });
    function sendExecute() {
      event('out', state.attempt ? 'execute · same request identity' : 'execute',
        state.attempt ? 'Reattach to the accepted request. A new client receiver starts at record zero.' : 'Submit one navigation request. The admission clock starts.',
        { attempt: state.attempt + 1, resumes: 0, records: 0, clientRawBytes: 0, clientStorage: 'none', client: 'awaiting acceptance', clock: '5,000 ms admission' }, wireRequest('execute'));
    }
    function accept() {
      event('in', 'accepted', 'Acceptance turns off the admission timer. It does not mean the result is complete.',
        { client: 'accepted · waiting', daemon: 'accepted request retained', clock: 'off · accepted completion is untimed', executionCount: 1 },
        { kind: 'accepted', ...identity, acceptedAt: at, queuePosition: 0 });
    }
    function sendManifest(count = 4, bytes = 262144) {
      event('in', 'result-manifest', 'The client now knows the transfer identity and expected record count.',
        { client: 'receiving', daemon: 'completion ready', retained: bytes, storage: bytes > limits.inline ? 'disk' : 'inline' }, { kind: 'result-manifest', ...identity,
          manifest: { instanceId: identity.instanceId, requestId: identity.requestId, transferId: 'transfer-1', recordCount: count, rawBytes: bytes, sha256: 'digest…', exitCode: 0 } });
    }
    function sendRecords(count, chunk, end = count, total = count * chunk) {
      const start = state.records;
      const steps = Math.min(6, end - start);
      for (let index = 0; index < steps; index++) {
        const next = index === steps - 1 ? end : start + index + 1;
        event('in', next - state.records > 1 ? `result-chunks · records ${state.records}–${next - 1}` : `result-chunk · record ${state.records}`,
          'The client advances its next offset only after appending the record.',
          { records: next, clientRawBytes: Math.min(next * chunk, total), clientStorage: Math.min(next * chunk, total) > limits.inline ? 'disk' : 'inline' }, { kind: 'result-chunk', transferId: 'transfer-1', requestId: identity.requestId,
            offset: state.records, sequence: state.records, stream: 'stdout', bytes: `${chunk} raw bytes (last record may be smaller)` });
      }
    }
    function complete(count, bytes, storage = 'inline') {
      event('in', 'result-end', 'The client checks the manifest totals and digest before acknowledging.',
        { client: 'validating complete result', storage, clientStorage: storage },
        { kind: 'result-end', ...identity, transferId: 'transfer-1', recordCount: count, rawBytes: bytes, sha256: 'digest…' });
      event('out', 'result-ack', 'A separate acknowledgement exchange lets the daemon release its retained completion.',
        { client: 'awaiting acknowledgement' }, { kind: 'result-ack', protocolVersion: 4, ...identity, transferId: 'transfer-1' });
      event('in', 'result-acknowledged', 'The daemon releases this completion; the client can return its captured output.',
        { retained: 0, daemon: 'ready · completion released' }, { kind: 'result-acknowledged', ...identity, transferId: 'transfer-1' });
      finish('completed', 'completed', `${count} output records received. One accepted request identity. No local replay.`);
    }
    function reattachAllowed() {
      if (state.reattachments >= state.reattachLimit) {
        finish('closed', 'closed · accepted', 'The reattachment allowance is exhausted. This transport does not replay the command locally.');
        return false;
      }
      event('client', 'Spend one reattachment', 'Only an authenticated closed / accepted failure enters this recovery path.',
        { reattachments: state.reattachments + 1, client: 'reattaching' });
      return true;
    }

    if (config.scene === 'reply') {
      const timeout = config.purpose === 'status-observer' ? 100 : 250;
      const kind = config.message;
      const payload = kind === 'ping'
        ? { kind, protocolVersion: 4, instanceId: identity.instanceId, processToken: identity.processToken }
        : kind === 'identify' ? { kind, instanceId: identity.instanceId, processToken: identity.processToken }
        : wireRequest(kind);
      event('client', `Select ${timeout} ms`, edition === 'head'
        ? `The ${config.purpose} constructor purpose projects the matching transport policy value.`
        : config.purpose === 'status-observer' ? 'DaemonStatusAction passes its local requestTimeoutMs: 100 override.' : 'LocalDaemonTransport uses its local 250 ms default.',
        { clock: `${timeout} ms · ${config.purpose}` }, null, 0);
      event('out', kind, 'The message kind does not choose the timeout.', { client: 'awaiting response', daemon: 'response scheduled' }, payload, 0);
      if (Number(config.delay) === timeout) {
        event('boundary', 'Response and timeout share a timestamp', 'The simulation leaves this race unresolved. Real scheduling decides which callback wins.', {}, null, timeout);
        finish('race', 'boundary race', 'Choose a different delay to compare outcomes without a scheduling tie.');
      } else if (Number(config.delay) > timeout) {
        event('client', 'timeout', 'The client’s one-response deadline expires.', { client: 'timeout', clock: 'expired' }, null, timeout);
        event('boundary', 'Client closes the socket', 'The client stops waiting when the deadline expires.', {}, null, timeout);
        event('daemon', 'Scripted response is too late', 'The response cannot reach this completed client exchange.', { daemon: 'response too late' }, null, Number(config.delay));
        finish('timeout', 'timeout', `${timeout} ms budget; ${config.delay} ms scripted response.`);
      } else {
        const response = kind === 'ping' ? { kind: 'pong', protocolVersion: 4, instanceId: identity.instanceId, symnavVersion: 'test' }
          : kind === 'identify' ? { kind: 'identity', instanceId: identity.instanceId, processToken: identity.processToken, pid: 123, startedAt: 10 }
          : { kind: 'execution-status', ...identity, status: { kind: 'unknown' } };
        event('in', response.kind, 'A complete response arrives before the selected deadline.', { client: 'response received', daemon: 'ready', clock: 'off' }, response, Number(config.delay));
        finish('response', 'response received', `${config.delay} ms response inside a ${timeout} ms budget.`);
      }
    } else if (config.scene === 'output') {
      const bytes = Number(config.bytes);
      const count = Math.ceil(bytes / limits.chunk);
      const storage = bytes > limits.inline ? 'disk' : 'inline';
      sendExecute();
      accept();
      event('daemon', 'Worker produces output', 'This lab models raw byte thresholds; record headers, filesystem operations and stdout/stderr interleaving are collapsed.',
        { daemon: 'capturing stdout', retained: Math.min(bytes, limits.result), storage }, null, 40);
      if (bytes > limits.result) {
        event('daemon', 'Result capacity exceeded', 'The capacity path replaces the result. Partial navigation output is not returned.', { retained: 0, daemon: 'capacity response' });
        finish('capacity', 'capacity response', `Requested ${bytes} raw bytes exceed this result limit of ${limits.result}. Error-result framing is collapsed in this lab.`);
      } else {
        event('daemon', storage === 'disk' ? 'Inline threshold crossed → spill' : 'Retain inline',
          `${bytes} raw bytes; inline threshold ${limits.inline}. The aggregate spool cap is ${limits.aggregate}. This lab has only one retained completion.`, { storage });
        sendManifest(count, bytes);
        sendRecords(count, limits.chunk, count, bytes);
        complete(count, bytes, storage);
      }
    } else {
      const fault = config.fault;
      let done = false;
      while (!done && state.attempt < 5) {
        sendExecute();
        if (fault === 'before-acceptance') {
          event('boundary', 'EOF before acceptance', 'The request was submitted, but the client has no authenticated acceptance.', { daemon: 'peer closed', client: 'submitted · unconfirmed' });
          finish('closed', 'closed · unconfirmed', 'The post-accept reattachment loop has not started. No fallback is modeled here.');
          break;
        }
        accept();
        const closesBeforeManifest = (['before-manifest', 'reattach-then-resume', 'corrupt-after-reattach'].includes(fault) && state.attempt === 1)
          || (fault === 'two-reattachments' && state.attempt <= 2);
        if (closesBeforeManifest) {
          event('boundary', 'EOF · no manifest yet', 'Fetch cannot resume without a manifest. The accepted request identity is known.', { client: 'closed · accepted' });
          if (!reattachAllowed()) break;
          continue;
        }
        if (fault === 'corrupt-after-reattach') {
          event('in', 'malformed completion', 'This scripted frame passes no completion validation.', {}, { kind: 'not-a-frame' });
          finish(edition === 'base' ? 'closed' : 'corrupt', edition === 'base' ? 'closed · first error' : 'corrupt · later error', edition === 'base'
            ? 'The base catches the reattached completion failure and throws the original closed error.'
            : 'The head awaits this completion on the next loop iteration. Its corrupt error now escapes.');
          break;
        }
        event('daemon', 'Accepted work continues', 'No post-accept completion deadline is armed. This duration is illustrative.',
          { daemon: 'executing once', client: 'waiting for result' }, null, at + Number(config.duration));
        sendManifest();
        const needsFetch = (['mid-transfer', 'fetch-eof'].includes(fault) && state.attempt === 1)
          || (fault === 'reattach-then-resume' && state.attempt === 2);
        if (needsFetch) {
          sendRecords(4, 65536, 2);
          event('boundary', 'EOF · 2 records stored', 'The next durable record offset is 2. The receiver keeps it for a fetch resume.', { client: 'transfer interrupted' });
          if (state.resumeLimit === 0) {
            event('client', 'No fetch allowance', 'This attempt has no fetch resume. The authenticated close can still reach the outer reattachment loop.');
            if (!reattachAllowed()) break;
            continue;
          }
          event('out', 'result-fetch · offset 2', 'Spend one fetch resume inside this execute attempt. Keep the existing receiver and stored records.',
            { resumes: 1, client: 'resuming transfer' }, { kind: 'result-fetch', protocolVersion: 4, ...identity, offset: 2 });
          sendManifest();
          if (fault === 'fetch-eof') {
            event('boundary', 'EOF during fetch', 'fetchCompletion sends this failure outward. It does not call resume again.', { client: 'fetch ended early' });
            finish('corrupt', 'corrupt · fetch EOF', `One fetch was sent, even with an allowance of ${state.resumeLimit}. This clean EOF is not an authenticated closed error.`);
            break;
          }
        }
        sendRecords(4, 65536);
        complete(4, 262144);
        done = true;
      }
    }
    return { config, edition, events, outcome, code: resultCode, final: { ...state },
      limits };
  }
  const api = { simulate, DEFAULTS, MINIATURE };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Simulation = api;
})(typeof window === 'undefined' ? globalThis : window);
