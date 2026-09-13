const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { MoveModel } = require('./model.js');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8'), sandbox);
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'content.js'), 'utf8'), sandbox);
const data = sandbox.window.REVIEW_DATA;
const content = sandbox.window.REVIEW_CONTENT;
const daemon = name => 'apps/cli/src/daemon/' + name + '.ts';
const output = 'apps/cli/src/command-execution-result.ts';
const context = 'apps/cli/src/program-context.ts';
const checks = [];
function check(name, run) { run(); checks.push(name); console.log('PASS ' + name); }

check('The captured delta is PR 131, with all 60 changed paths and exact line totals', () => {
  assert.equal(data.snapshots.base.sha, 'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e');
  assert.equal(data.snapshots.head.sha, 'b100221db48754656328391b878299c5a0bab443');
  assert.equal(data.changes.length, 60);
  assert.equal(data.changes.reduce((sum, c) => sum + c.added, 0), 1298);
  assert.equal(data.changes.reduce((sum, c) => sum + c.removed, 0), 544);
});
check('Every extracted edge is anchored to an exact source declaration and line', () => {
  for (const snapshot of Object.values(data.snapshots)) for (const edge of snapshot.edges) {
    assert(!edge.to.startsWith('unresolved:'), edge.from + ' ' + edge.specifier);
    const source = snapshot.files[edge.from].source;
    assert(source.split('\n').slice(edge.line - 1).join('\n').trimStart().startsWith(edge.text), edge.from + ':' + edge.line);
    if (!edge.to.startsWith('external:')) assert(snapshot.files[edge.to], edge.to);
  }
});
check('Both actual revisions have no stale addresses or forbidden package edges in this model', () => {
  for (const revision of ['base', 'head']) {
    const edges = new MoveModel(data, revision).edges();
    assert.equal(edges.filter(e => e.addressBroken).length, 0);
    assert.equal(edges.filter(e => e.forbidden).length, 0);
  }
});
check('Moving Lifetime to daemon leaves Clock forbidden even though it is type-only', () => {
  const impact = new MoveModel(data, 'head', { [daemon('daemon-lifetime')]: 'daemon' }).impact();
  assert.equal(impact.addresses, 2);
  assert.equal(impact.forbidden, 1);
  assert.equal(impact.exports, 1);
  const forbidden = impact.edges.find(e => e.forbidden);
  assert.equal(forbidden.specifier, '@symnav/telemetry');
  assert.equal(forbidden.kind, 'type');
  assert.equal(forbidden.addressBroken, false);
});
check('Moving Lifetime to core additionally crosses its newly required daemon policy import', () => {
  const before = new MoveModel(data, 'base', { [daemon('daemon-lifetime')]: 'core' }).impact();
  const after = new MoveModel(data, 'head', { [daemon('daemon-lifetime')]: 'core' }).impact();
  assert.equal(before.forbidden, 1);
  assert.equal(after.forbidden, 2);
});
check('The codec move loses the spool constant edge in head and retains the protocol type edge', () => {
  const before = new MoveModel(data, 'base', { [daemon('daemon-result-chunk-codec')]: 'daemon' }).impact();
  const after = new MoveModel(data, 'head', { [daemon('daemon-result-chunk-codec')]: 'daemon' }).impact();
  assert.equal(before.forbidden, 2);
  assert.equal(after.forbidden, 1);
  assert.equal(after.edges.find(e => e.forbidden).specifier, './daemon-protocol.js');
  assert.equal(after.edges.find(e => e.forbidden).kind, 'type');
});
check('Co-moving output and ProgramContext keeps their local relative import valid', () => {
  const alone = new MoveModel(data, 'head', { [output]: 'daemon' }).impact();
  assert.equal(alone.forbidden, 1);
  const together = new MoveModel(data, 'head', { [output]: 'daemon', [context]: 'daemon' }).impact();
  assert.equal(together.forbidden, 0);
  const connection = together.edges.find(e => e.from === output && e.to === context);
  assert.equal(connection.addressBroken, false);
  assert.equal(connection.exportNeeded, false);
  assert.equal(connection.crossed, false);
  assert(together.addresses > 0, 'Callers staying behind still need address edits');
});
check('A module restored to CLI produces no residual hypothetical effects', () => {
  const result = new MoveModel(data, 'head', { [output]: 'cli' }).impact();
  assert.equal(result.addresses, 0); assert.equal(result.forbidden, 0); assert.equal(result.exports, 0); assert.equal(result.moved, 0);
});
check('Every authored decision reference finds its exact evidence needle', () => {
  for (const decision of content.decisions) for (const ref of decision.refs) {
    const source = ref.path === 'pr' ? data.pr.body : data.snapshots[ref.revision].files[ref.path]?.source || data.snapshots[ref.revision].documents[ref.path];
    assert(source && source.includes(ref.needle), decision.id + ': ' + ref.path + ': ' + ref.needle);
  }
});
const report = { artifactChecks: checks, result: 'passed', subjectTestsRun: false, note: 'These checks validate the teaching artifact and captured evidence. They are not a correctness review of symnav.' };
fs.writeFileSync(path.join(__dirname, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
