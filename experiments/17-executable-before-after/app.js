(() => {
  'use strict';
  const capture = window.EXECUTION_CAPTURE;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  if (!capture) { $('#connection').textContent = 'Captured data missing. Run node capture.mjs.'; return; }
  const sourceRoot = 'packages/backend-typescript/src/typescript-backend/';
  const sources = {
    backend: { title: 'Backend refresh and release boundary', path: sourceRoot + 'typescript-backend.ts', line: 79, end: 89, baseLine: 79, baseEnd: 89 },
    service: { title: 'The six semantic caches', path: sourceRoot + 'typescript-semantic-query-service.ts', line: 29, end: 66, baseLine: 28, baseEnd: 51 },
    release: { title: 'Clear before awaiting project release', path: sourceRoot + 'typescript-semantic-query-service.ts', line: 128, end: 133, baseLine: 124, baseEnd: 129 },
    projection: { title: 'Cache locations, rebuild projections', path: sourceRoot + 'typescript-semantic-query-service.ts', line: 134, end: 163, baseLine: 130, baseEnd: 162 },
    scope: { title: 'TurnScopedCacheScope and its handles', path: 'packages/core/src/backend/turn-scoped-cache-scope.ts', line: 1, end: 46 },
    tests: { title: 'Added semantic-query characterizations', path: sourceRoot + 'typescript-semantic-query-service.test.ts', line: 29, end: 216, baseLine: 22, baseEnd: 60 },
    'core-tests': { title: 'Four core-scope contracts', path: 'packages/core/src/backend/turn-scoped-cache-scope.test.ts', line: 1, end: 92 },
    'graph-release': { title: 'The project graph already awaits project releases', path: 'packages/core/src/workspace/project-graph.ts', line: 144, end: 152, baseLine: 144, baseEnd: 152 },
    'concrete-release': { title: 'Concrete TypeScript project cleanup is synchronous', path: sourceRoot + 'typescript-project-graph.ts', line: 78, end: 84, baseLine: 78, baseEnd: 84 },
    spec: { title: 'The specification assigns shared lifetime to core', path: 'plans/005/daemon-architecture-functional-spec.md', line: 49, end: 64, baseLine: 49, baseEnd: 64 },
    exports: { title: 'The new public core export', path: 'packages/core/src/index.ts', line: 152, end: 152, baseLine: 143, baseEnd: 154 },
  };
  const decisions = [
    { id: 'owner', title: 'Core owns generic cache lifetime; TypeScript keeps query bodies.', status: 'stated', reason: 'The architecture spec assigns shareable retention mechanisms to core.', detail: 'The service owns one TurnScopedCacheScope instance. The implementation of clearing moves to core; this does not create a new process or move TypeScript semantic algorithms into core. The new class and handle type are exported from the core package.', links: ['service', 'scope', 'exports', 'spec'], scenario: 'refresh' },
    { id: 'isolation', title: 'Keep six isolated key/value spaces and the existing projections.', status: 'stated', reason: 'The PR chooses six handles because the query spaces are independent.', detail: 'Definitions, reference locations, call targets, callers, and callees cache promises by formatted symbol identity. Position definitions cache locations by path and start offset. Callers and references reuse one reference-location search. findReferences creates fresh projected arrays; definitionNodesOf creates fresh arrays and rehydrates nodes. Those details already existed.', links: ['service', 'projection'], scenario: 'refresh' },
    { id: 'presence', title: 'Use Map.has so an undefined factory value is still cached.', status: 'stated', reason: 'The PR explicitly treats undefined as a valid generic cached value.', detail: 'The generic handle checks presence, invokes a factory only when absent, stores the exact value, and returns it directly. Before this abstraction, the six semantic maps stored promises or location arrays, which are truthy; this is not evidence of an old undefined-value bug.', links: ['scope', 'core-tests'], scenario: 'refresh' },
    { id: 'turn', title: 'Clear only after refresh succeeds—even if source bytes did not change.', status: 'stated', reason: 'The PR says a failed refresh must preserve the current successful turn.', detail: 'Both backend revisions call beginTurn after awaiting state refresh. The head delegates clearing to the scope. A successful refresh clears every handle even when every source revision is unchanged. A failure before beginTurn leaves the current cache entries available.', links: ['backend', 'tests'], scenario: 'failed-refresh' },
    { id: 'release', title: 'Clear synchronously; keep backend release joined to project release.', status: 'stated', reason: 'The PR says released cache entries must be unavailable while release is pending or rejecting.', detail: 'Both revisions clear their query entries immediately. The head service returns Promise<void> and awaits the graph; the already-async backend now awaits that service promise. The graph already supports asynchronous project release. A later access can populate fresh query entries while a release is pending; this probe does not prescribe daemon scheduling.', links: ['release', 'backend', 'graph-release', 'concrete-release', 'tests'], scenario: 'release-reject' },
    { id: 'identity', title: 'Preserve exact values: rejected promises stay; synchronous throws retry.', status: 'stated', reason: 'The PR explicitly commits to preserving promise/value identities and failure behavior.', detail: 'Factories are not wrapped in a new promise. A promise that later rejects is already cached. A synchronous throw exits before insertion, so the next call tries again. Clearing does not cancel pending promises, and their later settlement does not overwrite a new turn entry. The inputs give no separate rationale for the pre-existing retry/retention policy itself.', links: ['scope', 'core-tests', 'tests'], scenario: 'failures' },
    { id: 'files', title: 'Narrow service beginTurn from a whole snapshot to a file list.', status: 'unexplained', reason: 'The public-surface change is listed; no reason for the signature narrowing is given.', detail: 'Before: beginTurn(snapshot: WorkspaceSnapshot). After: beginTurn(files: readonly WorkspaceFile[]). The service still keeps the files for TypeScript queries. This is a change on the exported service, while the backend refresh request remains the same.', links: ['service', 'backend'], scenario: 'refresh' },
    { id: 'handles', title: 'Expose getOrCreate handles; clearing keeps those handles reusable.', status: 'unexplained', reason: 'No distinct rationale is given for this minimal API or for omitting cancellation and a closed state.', detail: 'Only the scope exposes beginTurn and releaseTransientResources. Each clears all registered handles. Repeated release is allowed; handles can refill afterwards. No settlement callback, promise cancellation, per-handle public clear, or dispose/closed-state transition is added.', links: ['scope', 'core-tests'], scenario: 'release-hold' },
    { id: 'tests', title: 'Add ten characterizations; retain existing test assertions.', status: 'stated', reason: 'Commits explicitly characterize identities and specify lifetime and awaited release.', detail: 'Six tests were added to the semantic-service test file, and a new core file adds four. The supplied diff removes no test assertions. Coverage pins the same identities, empty results, failures, successful-turn preservation, immediate clearing, and awaited rejection shown above.', links: ['tests', 'core-tests'], scenario: 'failures' },
  ];
  const explanations = {
    refresh: 'Real backend refresh on unchanged fixture bytes. A successful refresh starts a new turn and clears all query handles in both revisions.',
    'failed-refresh': '<strong>Controlled failure:</strong> an injected extractor throws while the real state refresh prepares a changed in-memory source revision. Real backend ordering and transactional state rollback execute.',
    'release-real': 'Real project-graph release with an observer wrapper. Concrete TypeScript project cleanup is synchronous here; both backends eventually fulfill. The graph still returns a promise.',
    'release-hold': '<strong>Controlled delay:</strong> a gate holds the graph-release promise open before running real project cleanup. The unchanged backend and semantic-service methods receive that promise.',
    'release-reject': '<strong>Controlled rejection:</strong> the graph-release gate rejects with one Error object; real project cleanup is therefore not reached. Observe whether the unchanged backend promise receives that error.',
    failures: '<strong>Controlled asynchronous failure:</strong> ensureFiles returns a rejected promise. The synchronous case asks real reference discovery for an absent symbol. Cache and query bodies are unchanged.',
  };
  const shortLabels = { start: 'Successful refresh', warm: 'Repeated queries', cleared: 'Release called', boundary: 'Observe boundary', during: 'Query again', settled: 'Release settles', after: 'Query afterwards', 'sync-error': 'Discovery throws', 'reset-errors': 'Refresh succeeds' };
  const cacheLabels = ['definitions', 'ref locations', 'call target', 'callers', 'callees', 'positions'];
  const state = { live: false, busy: false, dirty: false, fixtureId: capture.presets[0].id, scenario: 'release-hold', pair: null, step: 0, recorded: true };

  $('#decision-map').innerHTML = decisions.map((d, index) => `<article class="decision" id="decision-${d.id}"><div class="decision-number">${String(index + 1).padStart(2, '0')}</div><div><h3>${esc(d.title)}</h3><p><span class="reason ${d.status}">${d.status}</span>${esc(d.reason)}</p><button data-decision="${d.id}">Open this decision and its sources ↗</button></div></article>`).join('');
  $('#fixture').innerHTML = capture.presets.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('');
  $('#source-links').innerHTML = ['backend', 'service', 'scope', 'graph-release', 'concrete-release', 'spec'].map(key => `<button class="source-button" data-source="${key}">${esc(sources[key].title)} ↗</button>`).join('') + '<button id="pr-body">PR body and commit intent ↗</button>';

  function preset() { return capture.presets.find(p => p.id === state.fixtureId); }
  function editInput() {
    const files = Object.fromEntries([...document.querySelectorAll('[data-file]')].map(editor => [editor.dataset.file, editor.value]));
    return { files, targetFile: $('#target-file').value, target: $('#target-name').value, callerFile: $('#caller-file').value, caller: $('#caller-name').value, scenario: state.scenario, repeats: Number($('#repeats').value) };
  }
  function fillEditors(input) {
    $('#file-editors').innerHTML = Object.entries(input.files).map(([path, source]) => `<label>${esc(path)}<textarea data-file="${esc(path)}" aria-label="${esc(path)} fixture source" spellcheck="false">${esc(source)}</textarea></label>`).join('');
    $('#target-file').value = input.targetFile; $('#target-name').value = input.target;
    $('#caller-file').value = input.callerFile; $('#caller-name').value = input.caller;
    $('#repeats').value = input.repeats || 2;
    $('#fixture-origin').textContent = preset().origin;
    state.dirty = false;
    $('#input-state').textContent = 'input for the displayed recording';
  }
  function markDirty() {
    state.dirty = true;
    $('#input-state').textContent = 'edited · run to observe these inputs';
    $('#run-provenance').textContent = 'Inputs changed. Displayed observations still belong to the previous run.';
    $('#observation').classList.add('stale');
  }
  function loadRecording(resetInput = true) {
    state.pair = capture.runs[`${state.fixtureId}:${state.scenario}`];
    state.recorded = true;
    state.step = Math.max(0, state.pair.base.steps.findIndex(step => step.id === 'boundary'));
    $('#scenario').value = state.scenario;
    $('#scenario-explanation').innerHTML = explanations[state.scenario];
    if (resetInput) fillEditors(state.pair.input);
    $('#run-error').hidden = true;
    render();
  }

  function observationText(base, head) {
    if (base.id === 'start') return 'A successful refresh has started the turn. Both versions have six empty semantic caches.';
    if (base.id === 'warm') {
      const failures = base.rows.filter(row => row.output?.state === 'rejected' || row.output?.state === 'threw');
      if (failures.length) return `These fixture inputs produced ${failures.length} failing query kinds in the base run. Inspect the real return identities and errors below; a synchronous failure can prevent a cache entry from being created.`;
      return `Both versions reuse the four directly returned query promises. Callers and references share ${base.counts.references} reference search; references and position accesses return fresh arrays.`;
    }
    if (base.id === 'cleared') return 'The call has returned a promise, and every cache is already empty in both versions. No await was needed to clear entries.';
    if (base.id === 'boundary' && state.pair.input.scenario === 'failed-refresh') return 'The refresh rejected. Both versions still return the exact definition promise from the successful turn; the definition-search count did not increase.';
    if (base.id === 'boundary' && state.pair.input.scenario === 'refresh') return 'No source bytes changed. A successful refresh still cleared all six caches in both versions.';
    if (base.id === 'boundary' && state.pair.input.scenario === 'failures') return 'Both versions retain the rejected definition and callee promises. A second access does not call the failing preparation again.';
    if (base.id === 'boundary' && state.pair.input.scenario === 'release-real') return `Concrete project cleanup finished. The base backend is ${base.release.backend}; the head backend is ${head.release.backend}. The controlled gate is absent in this run.`;
    if (base.id === 'boundary') return `Project release is pending on both sides. The base backend has ${base.release.backend}; the head backend remains ${head.release.backend}.`;
    if (base.id === 'during') return 'Access after clearing creates new entries in both versions. Release clears the old entries; it does not close the handles or block later queries.';
    if (base.id === 'settled' && state.pair.input.scenario === 'release-reject') return 'The same project-release failure reached the head backend promise. The base backend promise had already fulfilled.';
    if (base.id === 'settled') return 'Project release finished. Both backend promises are now fulfilled; their relationship to the project promise differed while it was pending.';
    if (base.id === 'sync-error') return 'The absent-symbol reference discovery threw before cache insertion. Both versions searched again on the second call.';
    if (base.id === 'reset-errors') return 'A successful refresh removed the rejected cache entries. The existing handles remain usable.';
    if (state.pair.input.scenario === 'failed-refresh') return 'The prior definition promise is still reused. The failed refresh did not clear the caches.';
    if (state.pair.input.scenario === 'failures') return 'With preparation restored and a new turn started, the absent definition resolves to an empty array instead of reusing the old rejection.';
    return 'The same source produces fresh query entries in the next turn. Repetition still shares work within that turn.';
  }

  function runtime(version, checkpoint) {
    const head = version === 'head';
    const provenance = state.pair[version].provenance;
    const releaseActive = checkpoint.release.backend !== 'not called';
    return `<article class="runtime-panel ${head ? 'after' : 'before'}"><div class="version-title"><span>${head ? 'AFTER' : 'BEFORE'} · TURN ${checkpoint.turn}</span><code>${provenance.sha.slice(0,8)}</code></div><div class="release-box"><span>Backend release promise</span><b class="state ${esc(checkpoint.release.backend)}">${esc(checkpoint.release.backend)}</b></div><div class="await-edge">${head ? '↓ awaits semantic service ↓ awaits graph' : '↓ calls service; graph promise is not awaited'}</div><div class="release-box"><span>Project graph release</span><b class="state ${esc(checkpoint.release.project)}">${esc(checkpoint.release.project)}</b></div><div class="cache-group ${head ? 'core' : ''}"><div class="cache-label">${head ? 'CORE SCOPE · six reusable handles' : 'TYPESCRIPT SERVICE · six independent Maps'}</div><div class="cache-cells">${checkpoint.caches.map((cache, index) => `<button class="cache-cell ${cache.size === 0 ? 'empty' : ''}" data-cache="${index}" data-version="${version}" aria-label="Inspect ${head ? 'after' : 'before'} ${cacheLabels[index]} cache: ${cache.size} entries"><b>${cache.size}</b><span>${cacheLabels[index]}</span></button>`).join('')}</div></div><div class="counters"><span>definition searches <b>${checkpoint.counts.definitions}</b></span><span>reference searches <b>${checkpoint.counts.references}</b></span><span>positions resolved <b>${checkpoint.counts.positions}</b></span></div><p class="caption">${releaseActive ? `Semantic projects loaded: ${checkpoint.counts.projectLoads} · cleanup events: ${checkpoint.counts.projectReleases}` : 'Counts come from the existing semantic-query observer.'}</p></article>`;
  }
  function describeOutput(row) {
    if (Array.isArray(row.output)) return `${row.output.length} ${row.name.startsWith('Position') ? 'definition nodes' : row.name === 'References' ? 'reference projections' : row.name === 'Callers' || row.name === 'Callees' ? 'edges' : 'definitions'}`;
    return row.output?.outcome || row.output?.state || 'value';
  }
  function queryCell(row) {
    return `<code>${row.returnIds.map(esc).join(' · ')}</code><small>${row.sameReturn ? 'same return object' : 'fresh return objects'}</small><code>values: ${row.valueIds.map(esc).join(' · ')}</code><small>${esc(describeOutput(row))}</small>`;
  }
  function renderQueries(base, head) {
    if (!base.rows.length) {
      $('#query-results').innerHTML = '<div class="results-empty">No query batch was issued at this checkpoint. Select “Repeated queries” or a later query checkpoint to inspect return identities and result values.</div>';
      return;
    }
    $('#query-results').innerHTML = `<div class="table-scroll"><table class="query-table"><thead><tr><th>Semantic-service access</th><th>Before · return identities</th><th>After · return identities</th><th>Actual result</th></tr></thead><tbody>${base.rows.map((row, index) => `<tr><td>${esc(row.name)}${row.name === 'References' ? '<small>shared search; fresh projection</small>' : row.name.startsWith('Position') ? '<small>cached locations; nodes rehydrated</small>' : ''}</td><td>${queryCell(row)}</td><td>${queryCell(head.rows[index])}</td><td><button data-result="${index}">Inspect both ↗</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  function renderCore() {
    const core = state.pair.head.core;
    const cards = [
      [core.undefinedFactoryCalls, 'Factory call for cached undefined', 'Two accesses; the handle checks key presence.'],
      [core.isolatedSameKeyValues ? '2' : '1', 'Distinct values for one key in two handles', 'The handles keep independent maps.'],
      [core.synchronousThrowCalls, 'Factory attempts after two synchronous throws', 'Throwing happens before insertion.'],
      [core.rejectedFactoryCalls, 'Factory call for a rejected promise', `Same promise after rejection: ${core.sameRejectedPromise}.`],
      [core.lateSettlement.newResult, 'Entry after an old promise settles', `Old promise still resolves to “${core.lateSettlement.oldResult}”; the new promise remains stored.`],
      [core.repeatedRelease.cleared ? 'refill' : 'retained', 'Handle after repeated release', 'Clearing empties entries and leaves the handle usable.'],
    ];
    $('#core-results').innerHTML = cards.map(([number, title, text]) => `<article class="core-result"><b>${esc(number)}</b><strong>${esc(title)}</strong><p>${esc(text)}</p></article>`).join('');
  }
  function render() {
    const base = state.pair.base.steps[state.step];
    const head = state.pair.head.steps[state.step];
    const label = state.recorded ? 'Recorded execution' : 'Fresh local execution';
    $('#run-provenance').textContent = `${label} · ${new Date(state.pair.startedAt).toLocaleString()} · run ${state.pair.id.slice(0,8)} · fixture ${state.pair.input.targetFile}#${state.pair.input.target}`;
    $('#observation').classList.remove('stale');
    $('#observation-text').textContent = observationText(base, head);
    $('#steps').innerHTML = state.pair.base.steps.map((step, index) => `<button class="step" data-step="${index}" ${state.step === index ? 'aria-current="step"' : ''}><span class="step-number">${String(index + 1).padStart(2, '0')}</span>${esc(shortLabels[step.id] || step.label)}</button>`).join('');
    $('#previous').disabled = state.step === 0; $('#next').disabled = state.step === state.pair.base.steps.length - 1;
    $('#comparison').innerHTML = runtime('base', base) + runtime('head', head);
    $('#checkpoint-json').textContent = JSON.stringify({ base, head }, null, 2);
    renderQueries(base, head);
    renderCore();
    if (state.dirty) markDirty();
  }

  function openDialog(title, kicker, html) {
    $('#dialog-title').textContent = title;
    $('#dialog-kicker').textContent = kicker;
    $('#dialog-content').innerHTML = html;
    const dialog = $('#source-dialog');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }
  function openSource(key, version = 'head') {
    const source = sources[key];
    const entry = capture.sources[version][source.path];
    const first = version === 'base' ? source.baseLine || source.line : source.line;
    const last = version === 'base' ? source.baseEnd || source.end : source.end;
    const controls = `<div class="source-controls"><button data-open-source="${key}" data-source-version="base" class="${version === 'base' ? 'active' : ''}">Base source</button><button data-open-source="${key}" data-source-version="head" class="${version === 'head' ? 'active' : ''}">Head source</button></div>`;
    const content = entry ? `<p class="source-hash">${esc(source.path)}<br>SHA-256 ${entry.sha256}</p><pre>${entry.content.split('\n').map((line, index) => `<span class="source-line ${index + 1 >= first && index + 1 <= last ? 'highlight' : ''}" id="source-line-${index + 1}"><span class="line-number">${index + 1}</span>${esc(line)}</span>`).join('')}</pre>` : '<p>This file does not exist in the base revision. The scope is a new public core abstraction.</p>';
    openDialog(source.title, `${version.toUpperCase()} / CAPTURED SOURCE`, controls + content);
    if (entry) setTimeout(() => {
      const line = $(`#source-line-${Math.max(1, first - 4)}`);
      const dialog = $('#source-dialog');
      if (line) dialog.scrollTop = Math.max(0, line.offsetTop - 155);
    }, 0);
  }
  function openDecision(id) {
    const d = decisions.find(decision => decision.id === id);
    openDialog(d.title, 'DECISION / SAME FACT, MORE FIDELITY', `<div class="dialog-reason"><p><span class="reason ${d.status}">${d.status}</span>${esc(d.reason)}</p><p>${esc(d.detail)}</p></div><div class="source-controls">${d.links.map(key => `<button class="source-button" data-source="${key}">${esc(sources[key].title)} ↗</button>`).join('')}</div><button data-run-decision="${d.scenario}" class="primary">Explore the ${esc(d.scenario)} fixture</button>`);
  }
  function chooseScenario(scenario) {
    state.scenario = scenario;
    // The top-level links deliberately open the bundled worked example.
    loadRecording();
  }
  async function run() {
    if (!state.live || state.busy) return;
    state.busy = true;
    $('#run').disabled = true; $('#run').textContent = 'Executing base + head…';
    $('#run-error').hidden = true;
    const input = editInput();
    const controls = [...document.querySelectorAll('#lab input, #lab select, #lab textarea')];
    controls.forEach(control => { control.disabled = true; });
    try {
      const response = await fetch('/api/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input), signal: AbortSignal.timeout(65000) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Runner returned ${response.status}`);
      state.pair = result; state.recorded = false; state.dirty = false;
      state.step = Math.max(0, result.base.steps.findIndex(step => step.id === 'boundary'));
      $('#input-state').textContent = 'input for this fresh execution';
      render();
    } catch (error) {
      $('#run-error').textContent = `Execution did not finish: ${error.message}. The last observation remains below.`;
      $('#run-error').hidden = false;
    } finally {
      state.busy = false; $('#run').disabled = !state.live; $('#run').textContent = 'Run both revisions';
      controls.forEach(control => { control.disabled = false; });
    }
  }

  document.addEventListener('click', event => {
    const decision = event.target.closest('[data-decision]');
    if (decision) return openDecision(decision.dataset.decision);
    const sourceButton = event.target.closest('[data-source]');
    if (sourceButton) return openSource(sourceButton.dataset.source);
    const sourceVersion = event.target.closest('[data-open-source]');
    if (sourceVersion) return openSource(sourceVersion.dataset.openSource, sourceVersion.dataset.sourceVersion);
    const scenario = event.target.closest('[data-scenario]');
    if (scenario) { if (!state.busy) chooseScenario(scenario.dataset.scenario); return; }
    const runDecision = event.target.closest('[data-run-decision]');
    if (runDecision) { $('#source-dialog').close(); if (!state.busy) chooseScenario(runDecision.dataset.runDecision); location.hash = 'lab'; return; }
    const step = event.target.closest('[data-step]');
    if (step) { state.step = Number(step.dataset.step); render(); return; }
    const cache = event.target.closest('[data-cache]');
    if (cache) {
      const data = state.pair[cache.dataset.version].steps[state.step].caches[Number(cache.dataset.cache)];
      openDialog(data.name, `${cache.dataset.version.toUpperCase()} / ACTUAL MAP ENTRIES`, `<p>${data.size} entries at this checkpoint. IDs denote the exact stored objects within this run.</p><pre>${esc(JSON.stringify(data, null, 2))}</pre>`); return;
    }
    const result = event.target.closest('[data-result]');
    if (result) {
      const index = Number(result.dataset.result);
      const base = state.pair.base.steps[state.step].rows[index];
      const head = state.pair.head.steps[state.step].rows[index];
      openDialog(base.name, 'RETURN IDENTITIES AND RESULT VALUES', `<p>IDs are local to each version’s process. The values below are the actual semantic query results, not a rewritten algorithm’s output.</p><pre>${esc(JSON.stringify({ base, head }, null, 2))}</pre>`);
    }
  });
  $('#close-dialog').addEventListener('click', () => $('#source-dialog').close());
  $('#source-dialog').addEventListener('click', event => { if (event.target === $('#source-dialog')) { const box = event.target.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.target.close(); } });
  $('#fixture').addEventListener('change', () => { state.fixtureId = $('#fixture').value; loadRecording(); });
  $('#scenario').addEventListener('change', () => {
    const edited = state.dirty ? editInput() : null;
    state.scenario = $('#scenario').value;
    loadRecording(!edited);
    if (edited) markDirty();
  });
  $('#repeats').addEventListener('change', markDirty);
  $('.fixture-editor').addEventListener('input', markDirty);
  $('#run').addEventListener('click', run);
  $('#previous').addEventListener('click', () => { state.step--; render(); });
  $('#next').addEventListener('click', () => { state.step++; render(); });
  $('#export-run').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state.pair, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url;
    link.download = `pr-127-observation-${state.pair.id.slice(0,8)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('#show-provenance').addEventListener('click', () => openDialog('Revisions and observed module hashes', 'EXECUTION PROVENANCE', `<p>Captured source links belong to the bundled revisions. These hashes belong to key compiled modules in the ${state.recorded ? 'recorded' : 'fresh local'} run currently displayed. Transitive library dependencies are not individually hashed.</p><pre>${esc(JSON.stringify({ runId: state.pair.id, timestamp: state.pair.startedAt, base: state.pair.base.provenance, head: state.pair.head.provenance }, null, 2))}</pre>`));
  $('#show-diff').addEventListener('click', () => openDialog('The supplied six-file diff', 'PR 127 / EVIDENCE', `<pre>${esc(capture.diff)}</pre>`));
  $('#pr-body').addEventListener('click', () => openDialog('PR body and commit subjects', 'LOCAL INPUT BUNDLE / INTENT', `<pre>${esc(capture.pr.body)}\n\nCOMMITS\n${esc(capture.pr.commits.map(commit => `${commit.sha}\n${commit.subject}\n${commit.body}`).join('\n'))}</pre>`));
  loadRecording();
  if (location.protocol === 'http:' || location.protocol === 'https:') {
    fetch('/api/meta', { signal: AbortSignal.timeout(2000) }).then(response => response.ok ? response.json() : null).then(meta => {
      if (!meta?.live) return;
      state.live = true; $('#connection').textContent = 'Local runner connected'; $('#connection').classList.add('live'); $('#run').disabled = false; $('#runner-help').hidden = true;
    }).catch(() => {});
  }
  if (!state.live) $('#connection').title = 'For fresh execution: node server.mjs, then open http://127.0.0.1:4717. Recorded runs work without a server.';
})();
