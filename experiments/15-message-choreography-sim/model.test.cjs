const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { simulate } = require('./model.js');
const observations = JSON.parse(readFileSync(__dirname + '/evidence/observations.json', 'utf8'));

test('scripted exchanges agree with recorded real-client messages and outcomes', () => {
  for (const observed of observations.rows) {
    const input = observed.scenario === 'ping-150ms'
      ? { scene: 'reply', purpose: observed.purpose, delay: 150 }
      : { scene: 'execution', fault: observed.scenario,
        resumes: observed.scenario === 'fetch-eof' ? 2 : 1,
        reattachments: observed.scenario === 'two-reattachments' ? 2 : 1 };
    const trace = simulate(input, observed.edition);
    const sent = trace.events.filter(event => event.direction === 'out').map(event => event.payload.kind);
    assert.deepEqual(sent, observed.messages.map(message => message.kind), `${observed.edition}/${observed.scenario} sends`);
    assert.equal(trace.code, observed.error?.code ?? (observed.value.status ?? 'response'), `${observed.edition}/${observed.scenario} outcome`);
  }
});

test('changing the purpose changes the ping clock, while timer-boundary ties stay unresolved', () => {
  assert.equal(simulate({ purpose: 'ordinary', delay: 150 }).code, 'response');
  assert.equal(simulate({ purpose: 'status-observer', delay: 150 }).code, 'timeout');
  for (const [purpose, delay] of [['ordinary', 250], ['status-observer', 100]]) {
    assert.equal(simulate({ purpose, delay }).code, 'race');
  }
  const timedOut = simulate({ purpose: 'status-observer', delay: 150 });
  assert.equal(timedOut.events.find(event => event.label === 'Client closes the socket').time, 100);
});

test('accepted work can outlast admission and recovery preserves identity and record offsets', () => {
  const trace = simulate({ scene: 'execution', fault: 'reattach-then-resume', duration: 12000 });
  assert.equal(trace.code, 'completed');
  assert.equal(trace.final.executionCount, 1);
  const acceptIndex = trace.events.findIndex(event => event.label === 'accepted');
  assert.ok(trace.events.slice(acceptIndex).some(event => event.time > 5000 && event.state.clock.startsWith('off')));
  const executeMessages = trace.events.filter(event => event.payload?.kind === 'execute');
  assert.equal(executeMessages.length, 2);
  assert.deepEqual(executeMessages[0].payload, executeMessages[1].payload);
  const fetch = trace.events.find(event => event.payload?.kind === 'result-fetch');
  assert.equal(fetch.payload.offset, 2);
  assert.equal(fetch.state.resumes, 1);
  assert.equal(fetch.state.reattachments, 1);
  assert.equal(trace.events.filter(event => event.payload?.kind === 'result-ack').length, 1);
});

test('zero fetch allowance can reach the independent outer reattachment; zero outer allowance cannot', () => {
  const recovered = simulate({ scene: 'execution', fault: 'mid-transfer', resumes: 0, reattachments: 1 });
  assert.equal(recovered.code, 'completed');
  assert.equal(recovered.final.attempt, 2);
  assert.equal(recovered.events.filter(event => event.payload?.kind === 'result-fetch').length, 0);
  assert.equal(simulate({ scene: 'execution', fault: 'mid-transfer', resumes: 0, reattachments: 0 }).code, 'closed');
});

test('one-result output lab distinguishes exact inline and result boundaries', () => {
  const run = bytes => simulate({ scene: 'output', profile: 'miniature', bytes });
  assert.equal(run(4).final.storage, 'inline');
  assert.equal(run(5).final.storage, 'disk');
  assert.equal(run(8).code, 'completed');
  assert.equal(run(9).code, 'capacity');
  assert.equal(run(9).final.records, 0);
  assert.equal(run(6).final.records, 3);
  assert.equal(simulate({ scene: 'output', profile: 'miniature', bytes: 6 }, 'base').final.records, 1);
  assert.equal(run(0).code, 'completed');
  assert.equal(run(0).final.records, 0);
  const transfer = simulate({ scene: 'output', bytes: 327680 });
  assert.equal(transfer.events.find(event => event.state.records === 4).state.clientStorage, 'inline');
  assert.equal(transfer.events.find(event => event.state.records === 5).state.clientStorage, 'disk');
  assert.equal(transfer.final.clientRawBytes, 327680);
});

test('scenario tapes are finite, chronological and keep fetch offsets within stored records', () => {
  const faults = ['clean','before-acceptance','before-manifest','mid-transfer','reattach-then-resume','two-reattachments','corrupt-after-reattach','fetch-eof'];
  for (const edition of ['base', 'head']) for (const fault of faults) for (const resumes of [0, 1, 2]) for (const reattachments of [0, 1, 2]) {
    const trace = simulate({ scene: 'execution', fault, resumes, reattachments }, edition);
    assert.ok(trace.code, `${edition}/${fault}/${resumes}/${reattachments} terminates`);
    assert.ok(trace.events.length < 70);
    for (let index = 1; index < trace.events.length; index++) assert.ok(trace.events[index].time >= trace.events[index - 1].time);
    for (const event of trace.events.filter(event => event.payload?.kind === 'result-fetch')) assert.equal(event.payload.offset, event.state.records);
  }
});
