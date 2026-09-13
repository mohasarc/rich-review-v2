'use strict';
(() => {
  const { declarations, observations } = window.REVIEW_DATA;
  const files = declarations.files;
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const syntax = code => escape(code).replace(/\b(readonly|interface|export|type|private|public|static|constructor|extends|number|string|unknown|void|Promise|Pick|Omit|Partial)\b/g, word => `<span class="${['number', 'string', 'unknown', 'void', 'Promise', 'Pick', 'Omit', 'Partial'].includes(word) ? 'type-token' : 'kw'}">${word}</span>`);
  const fileFor = path => files.find(f => f.path === path);
  const recordFor = (file, side, id) => file[side].records.find(r => r.id === id);
  const sourceHref = (file, side, record) => `evidence/${side}/${file.path}.html${record ? '#L' + record.line : ''}`;
  function sideView(file, side, record) {
    return `<div><div class="comparison-label"><span>${side === 'before' ? 'BASE' : 'HEAD'}</span>${record ? `<a href="${escape(sourceHref(file, side, record))}">Declaration · source L${record.line} ↗</a>` : '<span>Absent</span>'}</div>${record?.signatureRole ? '<p class="quiet">' + escape(record.signatureRole) + '</p>' : ''}<pre class="comparison-code">${record ? syntax(record.code) : '— no declaration —'}</pre></div>`;
  }
  function comparison(file, previous, next) { return `<div class="comparison">${sideView(file, 'before', previous)}${sideView(file, 'after', next)}</div>`; }
  function pair(path, id, title) {
    const file = fileFor(path);
    if (!file) throw new Error('Unknown file: ' + path);
    const before = recordFor(file, 'before', id), after = recordFor(file, 'after', id);
    if (!before && !after) throw new Error('Unknown declaration: ' + id);
    return `<details class="details-panel"><summary>${escape(title || (after || before).name)} <span>declarations</span></summary>${comparison(file, before, after)}</details>`;
  }
  const production = 'apps/cli/src/';
  const daemon = production + 'daemon/';
  const helpers = 'apps/cli/test/helpers/';
  const rows = [
    ['Capture', 'OrderedCommandOutput', 'options?: { inlineBytes?; maximumBytes?; directory? }', 'options: { policy: Values["output"]; directory? }', production + 'command-execution-result.ts'],
    ['Spool', 'DaemonCompletionSpoolStoreOptions', 'inlineBytes?; maximumResultBytes?; maximumAggregateBytes?', 'policy: Values["output"]', daemon + 'completion-spool.ts'],
    ['Resource supervision', 'DaemonResourceSupervisorOptions', 'policy: DaemonResourcePolicy; intervalMs?', 'policy: Values["resources"]', daemon + 'daemon-resource-monitor.ts'],
    ['Controller', 'DaemonController', 'options? with stopTimeoutMs? / pollIntervalMs?', 'options with policy: Pick<Values, "startup" | "shutdown">', daemon + 'daemon-controller.ts'],
    ['Startup coordinator', 'DaemonStartupCoordinator', 'options? with startup / termination / poll intervals?', 'options with policy: Pick<Values, "startup" | "shutdown">', daemon + 'daemon-startup-coordinator.ts'],
    ['Registry', 'DaemonRegistry', '(directory, platform?, renamePath?)', '(directory, Values["startup"], platform?, renamePath?)', daemon + 'daemon-registry.ts'],
    ['Process terminator', 'NodeDaemonProcessTerminator', '(defaulted inputs; inferred types withheld)', '(policy: Values["shutdown"])', daemon + 'daemon-process-launcher.ts'],
    ['Idle lifetime', 'DaemonLifetime', 'idleTimeoutMs: number', 'policy: Pick<Values["shutdown"], "idleTimeoutMs">', daemon + 'daemon-lifetime.ts'],
    ['Logger', 'DaemonLogger', 'options? with rotateBytes? / maximumQueuedEvents?', 'options with policy: Values["diagnostics"]', daemon + 'daemon-logger.ts'],
    ['Transport', 'LocalDaemonTransport', '(options?)', '(Pick<Values, "transport" | "delivery" | "output">, options?)', daemon + 'local-daemon-transport.ts'],
    ['File reader', 'OrderedCommandOutput.decodeFileRecords', '(filePath)', '(filePath, maximumRecordBytes: number)', production + 'command-execution-result.ts'],
    ['Spool storage reader', 'CompletionSpoolStorage.records', '(path)', '(path, maximumChunkBytes: number)', daemon + 'completion-spool.ts'],
    ['Chunk codec', 'DaemonResultChunkCodec.encode / decode', '(chunk) / (payload)', '(chunk, maximumChunkRawBytes: number) / (payload, maximumChunkRawBytes: number)', daemon + 'daemon-result-chunk-codec.ts'],
    ['Transfer frame decoder', 'DaemonTransferFrameDecoder', '(maximumControlFrameBytes)', '(maximumControlFrameBytes, maximumChunkRawBytes: number)', daemon + 'daemon-result-chunk-codec.ts'],
    ['Worker response parser', 'DaemonNavigationWorkerProtocol.response', '(value: unknown)', '(value: unknown, maximumChunkRawBytes: number)', daemon + 'daemon-navigation-worker-protocol.ts'],
    ['Worker heap sampler', 'WorkerHeapHighWater', '()', '(sampleIntervalMs: number)', daemon + 'daemon-navigation-worker-entry.ts'],
  ];
  $('consumer-table').innerHTML = `<table class="consumer-table"><thead><tr><th>Consumer</th><th>Base input</th><th>Head input</th><th>Evidence</th></tr></thead><tbody>${rows.map(([label, name, oldInput, newInput, file]) => `<tr><td>${escape(label)}<span class="tiny">${escape(name)}</span></td><td><code>${escape(oldInput)}</code></td><td><code>${escape(newInput)}</code></td><td><a href="#evidence" data-evidence="${escape(file)}">Declarations ↘</a></td></tr>`).join('')}</tbody></table>`;
  $('output-evidence').innerHTML = pair(production + 'command-execution-result.ts', 'interface:OrderedCommandOutputOptions') + pair(daemon + 'completion-spool.ts', 'interface:DaemonCompletionSpoolStoreOptions') + pair(daemon + 'completion-spool.ts', 'interface:CompletionSpoolStorage');
  $('resource-evidence').innerHTML = pair(daemon + 'daemon-resource-monitor.ts', 'interface:DaemonResourcePolicyRecord', 'The removed local record') + pair(daemon + 'daemon-resource-monitor.ts', 'interface:DaemonResourceSupervisorOptions', 'The supervisor’s replacement input');
  $('transport-evidence').innerHTML = pair(daemon + 'local-daemon-transport.ts', 'interface:LocalDaemonTransportOptions') + pair(daemon + 'local-daemon-transport.ts', 'type:LocalDaemonTransportPolicy') + pair(daemon + 'local-daemon-transport.ts', 'LocalDaemonTransport.constructor');
  $('workspace-evidence').innerHTML = pair(daemon + 'workspace-daemon.ts', 'interface:WorkspaceDaemonOptions', 'The full workspace options before and after');
  $('optional-evidence').innerHTML = pair(production + 'command-execution-result.ts', 'StoredCommandOutput.constructor') + pair(production + 'command-execution-result.ts', 'OrderedCommandOutput.decodeFileRecords');
  $('inferred-evidence').innerHTML = pair(daemon + 'daemon-registry.ts', 'DaemonRegistry.constructor') + pair(daemon + 'daemon-process-launcher.ts', 'NodeDaemonProcessTerminator.constructor');
  $('helper-evidence').innerHTML = pair(helpers + 'local-daemon-transport.ts', 'TestLocalDaemonTransport.constructor', 'Transport helper: a policy-or-options union') + pair(helpers + 'daemon-controller.ts', 'interface:TestDaemonControllerOptions', 'Controller helper: policy and legacy knobs stay optional') + pair(helpers + 'workspace-daemon.ts', 'type:TestWorkspaceDaemonOptions', 'Workspace helper: Omit production policy, then intersect test policy options') + pair(daemon + 'daemon-logger.test.ts', 'interface:TestDaemonLoggerOptions', 'Colocated logger helper options') + pair(daemon + 'local-daemon-transport-execution.test.ts', 'DaemonCompletionSpoolStore.constructor', 'Colocated spool wrapper omits the policy field');
  $('removed-workspace').innerHTML = ['memoryCapBytes', 'resourcePolicy?', 'idleTimeoutMs?', 'resourceCheckIntervalMs?', 'startupHeartbeatIntervalMs?', 'completionSpoolLimits?', 'operationTraceRetentionMs?', 'maximumRetainedOperationTraces?'].map(name => `<li>${escape(name)}</li>`).join('');
  $('removed-constants').innerHTML = files.filter(f => !f.context && f.scope === 'production').flatMap(f => f.deltas.filter(d => d.change === 'removed' && d.before.kind === 'variable').map(d => `<a href="${escape(sourceHref(f, 'before', d.before))}">${escape(d.before.name)} ↗</a>`)).join('');
  $('silent-files').innerHTML = files.filter(f => !f.context && f.scope === 'production' && !f.deltas.length).map(f => `<li><a href="#evidence" data-evidence="${escape(f.path)}"><code>${escape(f.path)}</code></a></li>`).join('');
  $('test-manifest').innerHTML = `<table class="manifest"><thead><tr><th>Changed path</th><th>+ lines</th><th>− lines</th></tr></thead><tbody>${files.filter(f => f.scope === 'test' || f.scope === 'meta-test').map(f => `<tr><td><a href="#evidence" data-evidence="${escape(f.path)}">${escape(f.path)}</a></td><td>${f.added}</td><td>${f.removed}</td></tr>`).join('')}</tbody></table>`;
  $('purpose-observations').innerHTML = `<table class="observation-table"><thead><tr><th>Shape</th><th>Assignable to declared input?</th></tr></thead><tbody>${observations.observations.map(o => `<tr><td>${escape(o.name)}</td><td class="${o.actual ? 'yes' : 'no'}">${o.actual ? 'Yes' : 'No'}</td></tr>`).join('')}</tbody></table><p>TypeScript ${escape(observations.compilerVersion)}; conditional types, no runtime. <a href="evidence/contract-observations.ts">Exact compiler input ↗</a></p>`;
  $('workspace-observations').innerHTML = `<table class="observation-table"><thead><tr><th>Named record · dependency types held fixed</th><th>Fits base option fields</th><th>Fits head option fields</th></tr></thead><tbody>${observations.cases.filter(c => c.id.startsWith('workspace')).map(c => `<tr><td>${escape(c.name)}</td>${c.actual.map(a => `<td class="${a ? 'yes' : 'no'}">${a ? 'Yes' : 'No'}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="annotation">Simplified comparison: full option declarations with shared opaque stand-ins for their referenced dependencies. This isolates record-field changes; it does not compare dependency class instances across revisions or fresh object literals. <a href="evidence/contract-observations.ts">Compiler input ↗</a></p>`;
  document.querySelectorAll('.compiler-version').forEach(el => { el.textContent = `TypeScript ${observations.compilerVersion} · strict`; });
  const labCases = observations.cases.filter(c => !c.id.startsWith('workspace'));
  $('case-buttons').innerHTML = labCases.map(c => `<button type="button" data-case="${c.id}" aria-pressed="false">${escape(c.name)}</button>`).join('');
  function showCase(id) {
    const c = labCases.find(c => c.id === id);
    if (!c) return;
    document.querySelectorAll('[data-case]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.case === id)));
    let expression = c.expression.replaceAll('; readonly ', ';\n  readonly ').replace('{ readonly ', '{\n  readonly ').replace(/ } }$/, '\n  }\n}').replace(/ }$/, '\n}');
    $('case-code').textContent = `type Candidate = ${expression};`;
    for (const [index, elementId] of ['base-result', 'head-result'].entries()) {
      $(elementId).textContent = c.actual[index] ? 'Assignable' : 'Not assignable';
      $(elementId).className = c.actual[index] ? 'fits' : 'misses';
    }
    $('case-note').textContent = c.note;
  }
  $('case-buttons').addEventListener('click', event => { const button = event.target.closest('[data-case]'); if (button) showCase(button.dataset.case); });
  showCase('empty');

  const initialFile = new URLSearchParams(window.location.search).get('file');
  let currentFile = fileFor(initialFile) ? initialFile : production + 'command-execution-result.ts';
  function importChanges(file) {
    const before = file.before.imports.map(i => i.code), after = file.after.imports.map(i => i.code);
    const removed = before.filter(i => !after.includes(i)), added = after.filter(i => !before.includes(i));
    if (!removed.length && !added.length) return '';
    return `<details class="details-panel"><summary>Import changes <span>separate from declaration deltas</span></summary><div class="imports-code"><div><div class="comparison-label">REMOVED / REPLACED</div><pre>${removed.length ? syntax(removed.join('\n\n')) : '—'}</pre></div><div><div class="comparison-label">ADDED / REPLACEMENT</div><pre>${added.length ? syntax(added.join('\n\n')) : '—'}</pre></div></div></details>`;
  }
  function renderFile(path) {
    const file = fileFor(path);
    if (!file) { $('evidence-content').innerHTML = '<div class="empty-evidence">No file matches this filter.</div>'; return; }
    currentFile = path;
    const changes = file.context ? file.after.records.map(r => ({ id: r.id, change: 'unchanged context', before: recordFor(file, 'before', r.id), after: r })) : file.deltas;
    $('evidence-content').innerHTML = `<div class="evidence-heading"><h3>${escape(file.path)}</h3><p>${escape(file.context ? 'Unchanged context' : file.scope)} · ${file.context ? '0' : file.deltas.length} declaration changes · patch +${file.added} / −${file.removed} lines <span>·</span> <a href="${escape(sourceHref(file, 'before'))}">All base declarations ↗</a> <span>·</span> <a href="${escape(sourceHref(file, 'after'))}">All head declarations ↗</a></p></div>${changes.length ? changes.map(d => `<div class="delta-record"><div class="delta-header"><span class="change-label">${escape(d.change)}</span><code>${escape((d.after || d.before).name)}</code></div>${comparison(file, d.before, d.after)}</div>`).join('') : `<div class="empty-evidence">No extracted declaration delta. This file’s patch changes other syntax; bodies and initializer values are outside the method. See the separate import changes, if any, below.</div>`}${importChanges(file)}`;
  }
  function scopeMatches(file, scope) { return scope === 'all' || scope === 'context' && file.context || !file.context && (scope === file.scope || scope === 'test' && file.scope === 'meta-test'); }
  function refreshFiles(preferred = currentFile) {
    const scope = $('scope-select').value, query = $('evidence-search').value.trim().toLowerCase();
    const visible = files.filter(f => scopeMatches(f, scope) && (!query || (f.path + ' ' + f.before.records.map(r => r.code).join(' ') + ' ' + f.after.records.map(r => r.code).join(' ')).toLowerCase().includes(query)));
    $('file-select').innerHTML = visible.map(f => `<option value="${escape(f.path)}">${escape(f.path)}${f.context ? ' · context' : ' · ' + f.deltas.length + ' declaration changes'}</option>`).join('');
    const selection = visible.some(f => f.path === preferred) ? preferred : visible[0]?.path;
    $('file-select').value = selection || '';
    renderFile(selection);
  }
  $('scope-select').addEventListener('change', () => refreshFiles());
  $('evidence-search').addEventListener('input', () => refreshFiles());
  $('file-select').addEventListener('change', () => renderFile($('file-select').value));
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-evidence]');
    if (!link) return;
    const file = fileFor(link.dataset.evidence);
    if (!file) return;
    $('scope-select').value = file.context ? 'context' : file.scope === 'meta-test' ? 'test' : file.scope;
    $('evidence-search').value = '';
    refreshFiles(file.path);
    // Native hash navigation keeps browser back/forward and keyboard semantics.
  });
  if (fileFor(initialFile)) {
    const file = fileFor(initialFile);
    $('scope-select').value = file.context ? 'context' : file.scope === 'meta-test' ? 'test' : file.scope;
  }
  refreshFiles();
})();
