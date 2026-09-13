(() => {
  'use strict';
  const data = window.REVIEW_DATA;
  const content = window.REVIEW_CONTENT;
  const { MoveModel } = window.MoveModel;
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const basename = path => path.split('/').at(-1);
  const state = { revision: 'head', moves: {}, selected: content.specimens[0].file, visible: content.specimens.map(s => s.file), direction: 'out', tests: true, repair: false };
  let model;
  let edges;
  let dialogReturn;
  const dialogHistory = [];
  const specimen = file => content.specimens.find(s => s.file === file);
  const packageName = id => data.packages.find(p => p.id === id)?.name || (id === 'external' ? 'Node / external' : id);
  const moduleName = file => specimen(file)?.name || model.snapshot.files[file]?.declarations.find(d => d.kind === 'class')?.name || basename(file).replace(/\.ts$/, '');
  const sourceButton = (path, needle, label, revision = state.revision) => `<button class="link-button" data-source="${escape(path)}" data-needle="${escape(needle || '')}" data-source-revision="${revision}">${escape(label || 'Source ↗')}</button>`;

  function render() {
    model = new MoveModel(data, state.revision, state.moves);
    edges = model.edges();
    document.querySelectorAll('[data-revision]').forEach(button => button.setAttribute('aria-pressed', button.dataset.revision === state.revision));
    const impact = model.impact();
    $('#impact').innerHTML = `<div class="impact-context"><b>${state.revision === 'head' ? 'PR #131' : 'Before #131'}</b><span>${impact.moved ? `${impact.moved} hypothetical module move${impact.moved === 1 ? '' : 's'}` : 'Actual file locations'}</span><small>Counts include test callers.</small></div><div class="metric ${impact.addresses && !state.repair ? 'address' : ''}"><b>${state.repair ? '0' : impact.addresses}</b><span>stale address${impact.addresses === 1 && !state.repair ? '' : 'es'}${state.repair ? `<small>${impact.addresses} edits imagined</small>` : ''}</span></div><div class="metric ${impact.forbidden ? 'blocked' : ''}"><b>${impact.forbidden}</b><span>forbidden dependenc${impact.forbidden === 1 ? 'y' : 'ies'}</span></div><div class="metric"><b>${state.repair ? '0' : impact.exports}</b><span>module exports to add${state.repair ? `<small>${impact.exports} exposures imagined</small>` : ''}</span></div>`;
    renderBoard();
    renderInspector();
    renderConnections();
    $('#destination').value = state.moves[state.selected] || 'cli';
    $('#repair').checked = state.repair;
  }

  function renderBoard() {
    $('#board').innerHTML = ['cli', 'daemon', 'core'].map(id => {
      const pkg = data.packages.find(p => p.id === id);
      const placed = state.visible.filter(file => model.snapshot.files[file] && (state.moves[file] || 'cli') === id);
      return `<section class="package-zone ${id}" data-package="${id}" aria-label="${escape(pkg.name)} drop zone"><div class="package-title"><b>${id === 'cli' ? 'CLI' : id === 'daemon' ? 'daemon' : 'core'}</b><code>${pkg.dir}</code></div><div class="package-rule">${id === 'cli' ? 'May import the five production libraries.' : 'May import no other internal package.'}</div>${id === 'daemon' ? '<div class="fixed-node"><span>ALREADY HERE</span><b>DaemonPolicy</b><small>seven complete sections<br>unchanged by #131</small></div>' : ''}<div class="package-cards">${placed.map(card).join('')}</div>${!placed.length ? `<div class="empty-drop">Drop a module here<br><small>${id === 'daemon' ? 'Sharing a package with policy does not move its other dependencies.' : 'The import rules travel with the package.'}</small></div>` : ''}</section>`;
    }).join('');
  }

  function card(file) {
    const description = specimen(file);
    const related = edges.filter(e => e.from === file || e.to === file);
    const forbidden = related.filter(e => e.forbidden).length;
    const stale = related.filter(e => e.addressBroken).length;
    return `<button class="module-card ${state.selected === file ? 'selected' : ''} ${state.moves[file] ? 'moved' : ''}" draggable="true" data-module="${escape(file)}" aria-pressed="${state.selected === file}" aria-label="Select or drag ${escape(moduleName(file))}"><span class="card-grip" aria-hidden="true">⠿</span><b>${escape(moduleName(file))}</b><span>${escape(description?.short || 'Added dependency module')}</span><small>${escape(state.revision === 'head' ? description?.slices || basename(file) : 'before #131 · ' + basename(file))}</small>${forbidden || (stale && !state.repair) ? `<em class="card-impact ${forbidden ? 'blocked' : 'address'}">${forbidden ? `${forbidden} forbidden` : `${stale} stale`}</em>` : ''}</button>`;
  }

  function renderInspector() {
    const file = state.selected;
    const meta = model.snapshot.files[file];
    const description = specimen(file);
    $('#selected-title').textContent = moduleName(file);
    $('#selected-location').textContent = model.location(file);
    $('#selected-explanation').innerHTML = (state.revision === 'base' && description ? '<b>What #131 changes:</b> ' : '') + escape(description?.explanation || 'This source module was added from an import. Its declarations move together; its callers and dependencies stay at their current placements.') + (description ? ` <button class="link-button" data-decision-open="${description.decision}">Decision ↗</button>` : '');
    document.querySelectorAll('[data-direction]').forEach(button => button.setAttribute('aria-pressed', button.dataset.direction === state.direction));
    if (state.direction === 'changes') {
      renderImportChanges(file);
    } else {
      const selected = edges.filter(e => state.direction === 'out' ? e.from === file : e.to === file).filter(e => state.tests || !model.snapshot.files[e.from]?.test);
      selected.sort((a, b) => Number(b.forbidden) - Number(a.forbidden) || Number(b.addressBroken) - Number(a.addressBroken) || a.line - b.line);
      $('#edge-list').innerHTML = `<div class="list-count">${selected.length} direct import / re-export declaration${selected.length === 1 ? '' : 's'}</div>` + (selected.length ? selected.map(edgeRow).join('') : '<p class="empty-list">No direct declarations in this view. This does not establish runtime independence.</p>');
    }
    $('#runtime-note').innerHTML = meta.runtimeLoads.length ? `${meta.runtimeLoads.length} runtime URL, dynamic import, or import-type expression${meta.runtimeLoads.length === 1 ? '' : 's'} in this module ${meta.runtimeLoads.length === 1 ? 'is' : 'are'} outside the calculation. ${sourceButton(file, meta.runtimeLoads[0].text, 'Inspect the first ↗')}` : 'The calculation covers explicit imports and re-exports. It does not infer transitive symbol uses or execute the program.';
  }

  function edgeRow(edge) {
    const other = state.direction === 'out' ? edge.to : edge.from;
    const isExternal = other.startsWith('external:');
    const isTest = model.snapshot.files[edge.from]?.test;
    const heading = state.direction === 'out' ? edge.specifier : edge.from.replace(/^apps\/cli\//, '');
    const result = edge.forbidden ? 'forbidden' : edge.addressBroken ? state.repair ? 'address assumed repaired' : 'stale address' : edge.affected ? 'address resolves' : 'as written';
    const canAdd = other.startsWith('apps/cli/src/') && !model.snapshot.files[other]?.test && !state.visible.includes(other);
    const flags = edge.affected ? `<div class="edge-consequence">${edge.forbidden ? `<b>${escape(packageName(edge.fromPackage))} → ${escape(packageName(edge.toPackage))}</b> is not an allowed internal dependency, including type imports.` : 'The package dependency direction is allowed in the model.'}${edge.addressBroken ? `<p>${state.repair ? 'Imagined address' : 'Address edit'}: <code>${escape(edge.suggested)}</code>${edge.exportNeeded ? ' · expose the target module’s imported names through the package root.' : ''}</p>` : ''}${edge.exportNeeded && edge.forbidden ? '<p>An export alone cannot change that package rule.</p>' : ''}</div>` : '';
    return `<details class="edge-row ${edge.forbidden ? 'forbidden' : edge.addressBroken && !state.repair ? 'stale' : ''}"><summary><span class="edge-kind ${edge.kind}">${edge.kind === 'type' ? 'T' : edge.kind === 'mixed' ? 'T+V' : 'V'}</span><span class="edge-heading"><code>${escape(heading)}</code><small>${isTest ? 'test caller · ' : ''}${escape(result)}</small></span></summary><div class="edge-detail">${flags}<pre>${escape(edge.text)}</pre><div class="edge-path">${escape(edge.from)}:${edge.line}${!isExternal ? `<br>→ ${escape(edge.toLocation)}` : ''}</div>${sourceButton(edge.from, edge.text, 'Exact source ↗')}${canAdd ? `<button class="link-button" data-add-module="${escape(other)}">Put this dependency on the board +</button>` : !isExternal && state.visible.includes(other) ? `<button class="link-button" data-select-module="${escape(other)}">Select its card →</button>` : ''}</div></details>`;
  }

  function renderImportChanges(file) {
    const relevant = revision => data.snapshots[revision].edges.filter(e => (e.from === file || e.to === file) && (state.tests || !data.snapshots[revision].files[e.from]?.test));
    const signature = e => JSON.stringify([e.from, e.to, e.kind, e.symbols]);
    const base = relevant('base');
    const head = relevant('head');
    const baseKeys = new Set(base.map(signature));
    const headKeys = new Set(head.map(signature));
    const added = head.filter(e => !baseKeys.has(signature(e)));
    const removed = base.filter(e => !headKeys.has(signature(e)));
    const group = (list, kind, revision) => `<h4>${kind} · ${list.length}</h4>${list.map(edge => `<div class="change-row ${revision}"><code>${escape(edge.from === file ? edge.specifier : edge.from.replace('apps/cli/', ''))}</code><small>${edge.from === file ? 'outgoing' : 'incoming'} · ${escape(edge.kind)} · ${escape(edge.symbols.map(s => s.imported).join(', ') || 'side effect')}</small>${sourceButton(edge.from, edge.text, 'Declaration ↗', revision)}</div>`).join('') || '<p class="small-note">None.</p>'}`;
    $('#edge-list').innerHTML = `<p class="small-note">Actual before/head declaration changes, including changed imported names. Hypothetical placements do not affect this list.</p>${group(added, 'Added / rewritten', 'head')}${group(removed, 'Removed / rewritten', 'base')}`;
  }

  function renderConnections() {
    const groups = new Map();
    for (const edge of edges.filter(e => e.from === state.selected)) {
      if (!groups.has(edge.toPackage)) groups.set(edge.toPackage, []);
      groups.get(edge.toPackage).push(edge);
    }
    const height = Math.max(160, groups.size * 50 + 35);
    const middle = height / 2;
    $('#connection-map').innerHTML = `<div class="map-caption">Imports carried by the selected module <span>Grouped by package; arrows point to dependencies.</span></div><svg viewBox="0 0 720 ${height}" role="img" aria-label="${escape(moduleName(state.selected))} imports ${escape([...groups.keys()].map(packageName).join(', ') || 'no modules')}"><rect x="5" y="${middle - 30}" width="270" height="60" rx="8" fill="#f3eee3" stroke="#c7bdac"/><text x="18" y="${middle - 4}" class="svg-name">${escape(moduleName(state.selected))}</text><text x="18" y="${middle + 15}" class="svg-detail">${escape(packageName(model.packageOf(model.location(state.selected))))}</text>${[...groups.entries()].map(([id, list], index) => {
      const y = 30 + index * 50;
      const blocked = list.some(e => e.forbidden);
      const onlyTypes = list.every(e => e.kind === 'type');
      const color = blocked ? '#a8402b' : '#557765';
      return `<path d="M275 ${middle} C355 ${middle} 365 ${y} 433 ${y}" fill="none" stroke="${color}" stroke-width="${blocked ? 2.5 : 1.5}" ${onlyTypes ? 'stroke-dasharray="5 5"' : ''}/><path d="M426 ${y - 4} L434 ${y} L426 ${y + 4}" fill="none" stroke="${color}"/><rect x="440" y="${y - 18}" width="274" height="37" rx="6" fill="${blocked ? '#fbeae3' : '#f1f4ee'}" stroke="${blocked ? '#d7927d' : '#c5d0bd'}"/><text x="450" y="${y + 4}" class="svg-name">${escape(packageName(id))}</text><text x="698" y="${y + 4}" text-anchor="end" class="svg-count">${list.length}${onlyTypes ? ' T' : ''}</text>`;
    }).join('')}</svg>`;
  }

  function move(file, destination) {
    if (!model.snapshot.files[file] || !['cli', 'daemon', 'core'].includes(destination)) return;
    if (destination === 'cli') delete state.moves[file]; else state.moves[file] = destination;
    state.selected = file;
    render();
    const impact = model.impact();
    $('#announcement').textContent = `${moduleName(file)} moved to ${packageName(destination)} in the simulation. ${impact.addresses} stale addresses and ${impact.forbidden} forbidden dependencies across all moves.`;
  }

  function reset() {
    state.moves = {}; state.visible = content.specimens.map(s => s.file); state.selected = content.specimens[0].file; state.repair = false; render();
  }

  function add(file, select = true) {
    if (!state.visible.includes(file)) state.visible.push(file);
    if (select) state.selected = file;
  }

  function openDialog(title, eyebrow, body) {
    const dialog = $('#evidence-dialog');
    if (!dialog.open) dialogReturn = document.activeElement;
    else dialogHistory.push({ title: $('#dialog-title').textContent, eyebrow: $('#dialog-eyebrow').textContent, body: $('#dialog-body').innerHTML, scroll: $('#dialog-body').scrollTop, sourceScroll: $('.source-view')?.scrollTop });
    $('#dialog-title').textContent = title;
    $('#dialog-eyebrow').textContent = eyebrow;
    $('#dialog-body').innerHTML = body;
    $('#back-dialog').hidden = dialogHistory.length === 0;
    if (!dialog.open) dialog.showModal();
    $('#dialog-body').scrollTop = 0;
  }

  function sourceText(file, revision) {
    if (file === 'pr') return data.pr.title + '\n\n' + data.pr.body + '\n\nCOMMITS\n' + data.pr.commits.map(c => `${c.sha}\n${c.subject}\n${c.body}`).join('\n\n');
    return data.snapshots[revision].files[file]?.source || data.snapshots[revision].documents[file];
  }

  function openSource(file, needle = '', revision = state.revision, diff = false) {
    const change = data.changes.find(c => c.file === file);
    const source = diff ? change?.patch : sourceText(file, revision);
    const lines = source?.split('\n') || ['File absent in this revision.'];
    const matchPosition = source && needle ? source.indexOf(needle) : -1;
    const line = matchPosition >= 0 ? source.slice(0, matchPosition).split('\n').length : 1;
    const focusCount = Math.max(1, needle.split('\n').length);
    const metadata = data.snapshots[revision].files[file];
    const companionText = !diff && metadata ? `<div class="companions"><b>Module companions:</b> ${metadata.declarations.map(d => `<button class="link-button" data-source="${escape(file)}" data-needle="${escape((d.kind === 'class' ? 'class ' : d.kind === 'interface' ? 'interface ' : 'type ') + d.name)}" data-source-revision="${revision}">${escape(d.name)} <small>${d.kind}</small></button>`).join(' · ') || 'No top-level named class, interface, or type declarations.'}</div>` : '';
    const tabs = file !== 'pr' ? `<div class="source-tabs">${['base', 'head'].map(rev => `<button data-source="${escape(file)}" data-source-revision="${rev}" data-needle="${escape(needle)}" aria-pressed="${!diff && rev === revision}">${rev === 'base' ? 'Before #131' : 'PR #131'}</button>`).join('')}${change ? `<button data-diff="${escape(file)}" aria-pressed="${diff}">Exact patch</button>` : '<span>Unchanged by #131</span>'}</div>` : '';
    openDialog(basename(file === 'pr' ? 'PR body + commits' : file), `${diff ? 'EXACT BUNDLE PATCH' : 'SOURCE SNAPSHOT · ' + revision.toUpperCase()} / ${file}`, `${tabs}${companionText}<pre class="source-view"><code>${lines.map((text, i) => `<span class="source-line ${i + 1 >= line && i + 1 < line + focusCount ? 'highlight' : ''} ${diff && text.startsWith('+') ? 'addition' : diff && text.startsWith('-') ? 'deletion' : ''}" data-line="${i + 1}"><span class="line-number">${i + 1}</span>${escape(text) || ' '}</span>`).join('')}</code></pre>`);
    const view = $('.source-view');
    const highlight = view.querySelector(`[data-line="${line}"]`);
    view.scrollTop = Math.max(0, highlight.offsetTop - view.offsetTop - 75);
  }

  function openDecision(id) {
    const decision = content.decisions.find(d => d.id === id);
    if (!decision) return;
    openDialog(decision.title, `${decision.status.toUpperCase()} / DECISION ${content.decisions.indexOf(decision) + 1}`, `<p class="dialog-lead">${escape(decision.summary)}</p><div class="reason ${decision.status}"><b>${decision.status === 'stated' ? 'Where the reason exists' : 'What nobody explained'}</b><p>${escape(decision.reason)}</p></div><ol class="decision-detail">${decision.details.map(d => `<li>${escape(d)}</li>`).join('')}</ol><div class="evidence-links"><h3>Check the source</h3>${decision.refs.map(r => sourceButton(r.path, r.needle, r.label + ' ↗', r.revision)).join('')}</div><button class="quiet" data-close-dialog>Return to the decision map</button>`);
  }

  function renderDecisions() {
    $('#decision-cards').innerHTML = content.decisions.map((decision, index) => `<article class="decision-card ${decision.status}" id="decision-${decision.id}"><div class="decision-top"><span class="decision-number">${String(index + 1).padStart(2, '0')}</span><span class="reason-status">${decision.status}</span></div><h3>${escape(decision.title)}</h3><p>${escape(decision.summary)}</p><button class="link-button" data-decision-open="${decision.id}">Mechanism & evidence ↗</button></article>`).join('');
    const policySource = data.snapshots.head.documents['plans/005/daemon-policy.md'];
    const rows = policySource.split('\n').filter(line => line.startsWith('| `')).map(line => line.split('|').slice(1, -1).map(value => value.trim().replaceAll('`', ''))).filter(row => row.length === 5);
    $('#policy-groups').innerHTML = content.policyGroups.map(group => {
      const groupRows = rows.filter(row => row[0].startsWith(group.id + '.'));
      return `<details class="policy-group"><summary><b>${group.title}</b><span>${escape(group.consumer)}</span><em>${groupRows.length} values ↓</em></summary><div class="policy-detail"><p>Existing values, now read by these consumers. Reasons below are from the checked-in policy record.</p><div class="table-scroll"><table><thead><tr><th>Policy leaf</th><th>Default</th><th>Recorded reason</th></tr></thead><tbody>${groupRows.map(row => `<tr><td><code>${escape(row[0].slice(group.id.length + 1))}</code></td><td>${escape(row[1])}</td><td>${escape(row[3])}</td></tr>`).join('')}</tbody></table></div><button class="link-button" data-decision-open="${group.decision}">Return to the owning decision ↗</button> ${sourceButton('plans/005/daemon-policy.md', group.id + '.', 'Full record, including recipes ↗', 'head')}</div></details>`;
    }).join('');
    $('#model-details-content').innerHTML = `<div class="model-grid"><div><h3>What moves</h3><p>The module’s path changes from <code>apps/cli/src/…</code> to <code>packages/daemon/src/…</code> or <code>packages/core/src/…</code>. The remaining folder structure is preserved. All declarations in that file travel together. Tests stay put.</p><h3>What counts</h3><p>Each static import or re-export declaration is one edge, including type-only declarations. Both callers and dependencies are measured. Counts include tests; the inspector can filter test callers. Multiple declarations to one file count separately.</p></div><div><h3>What can break</h3><p>A relative specifier that no longer reaches its original target has a stale address. A dependency crossing a prohibited package direction is forbidden, regardless of types being erased at runtime. A cross-package relative import additionally needs a public entry-point plan; one required exposure is counted per target module.</p><h3>What this cannot establish</h3><p>Rewriting assumes new root exports and supporting build configuration. It does not execute TypeScript, prove symbol availability, detect cycles, install external packages, relocate runtime entry URLs, or follow transitive symbol uses. Zero flags is only zero flags in this model.</p></div></div><div class="evidence-links">${sourceButton('AGENTS.md', '## Dependency direction', 'Exact package rules ↗', 'head')}${sourceButton('eslint.config.mjs', 'function productionRules', 'ESLint rules ↗', 'head')}${sourceButton('packages/daemon/package.json', '"exports"', 'Existing daemon exports ↗', 'head')}</div>`;
  }

  function decisionsFor(file) {
    const ids = new Set(['ownership']);
    if (file.includes('test/')) ids.add('adapters');
    if (/command-execution-result|cli-program-executor|completion-spool|chunk-codec|worker-protocol/.test(file)) ids.add('output');
    if (/resource|persistent-pressure|benchmark/.test(file)) ids.add('resources');
    if (/lifetime|logger|registry|controller|process-launcher|diagnostic|stop\.test|startup/.test(file)) ids.add('lifecycle');
    if (/local-daemon-transport|register-daemon-command|status\.test/.test(file)) ids.add('timeouts');
    if (/local-daemon-transport|startup-coordinator/.test(file)) ids.add('attempts');
    if (/daemon-resource-monitor\.test/.test(file)) ids.add('test-retirement');
    if (/cli-program-executor\.test|completion-spool\.test|test\/helpers\/(local-daemon-transport|workspace-daemon)\.ts/.test(file)) ids.add('fixture-shape');
    if (file === 'apps/cli/src/daemon/local-daemon-transport.ts') ids.add('error-selection');
    if (file.startsWith('meta-tests/')) ids.add('guard-shape');
    if (/workspace-daemon\.ts$|daemon-navigation-worker/.test(file)) { ids.add('resources'); ids.add('output'); }
    return [...ids];
  }

  function renderLedger() {
    const query = $('#file-filter').value.toLowerCase();
    const files = data.changes.filter(change => change.file.toLowerCase().includes(query));
    $('#file-count').textContent = files.length + ' / ' + data.changes.length + ' paths';
    $('#file-ledger').innerHTML = files.map(change => `<div class="ledger-row"><button class="file-open" data-diff="${escape(change.file)}"><code>${escape(change.file)}</code><span><b>+${change.added}</b> / −${change.removed}</span></button><div class="ledger-decisions">${decisionsFor(change.file).map(id => `<button data-decision-open="${id}" class="link-button">${escape(content.decisions.find(d => d.id === id).title)}</button>`).join('')}</div></div>`).join('') || '<p>No matching paths.</p>';
  }

  function renderProvenance() {
    $('#provenance').innerHTML = `<div><b>${data.changes.length} changed files · +1298 / −544</b><p>Only PR 131’s base → head delta. The policy object and package boundary rules predate this PR.</p><code>base ${data.snapshots.base.sha.slice(0, 12)}<br>head ${data.snapshots.head.sha.slice(0, 12)}</code></div><div><b>Reproducible local extraction</b><p>TypeScript syntax trees over ${Object.keys(data.snapshots.base.files).length} → ${Object.keys(data.snapshots.head.files).length} source/test files: ${data.snapshots.base.edges.length.toLocaleString()} → ${data.snapshots.head.edges.length.toLocaleString()} static import / re-export declarations. Fixture directories and build output excluded.</p><p>The overview bundle contained headings with no symbol output; this artifact uses the source trees directly. Earlier experiments were not read.</p>${sourceButton('pr', '', 'PR body & six commits ↗', 'head')} ${sourceButton('AGENTS.md', '## Dependency direction', 'Package rules ↗', 'head')}</div>`;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.module) { state.selected = button.dataset.module; render(); $('#board').querySelector(`[data-module="${CSS.escape(state.selected)}"]`).focus({ preventScroll: true }); }
    else if (button.dataset.revision) { state.revision = button.dataset.revision; render(); }
    else if (button.dataset.direction) { state.direction = button.dataset.direction; renderInspector(); }
    else if (button.dataset.preset) {
      reset();
      const mode = button.dataset.preset;
      if (mode === 'lifetime') move('apps/cli/src/daemon/daemon-lifetime.ts', 'daemon');
      if (mode === 'transport') move('apps/cli/src/daemon/local-daemon-transport.ts', 'daemon');
      if (mode === 'output') {
        const output = 'apps/cli/src/command-execution-result.ts'; const context = 'apps/cli/src/program-context.ts';
        add(context, false); state.moves[context] = 'daemon'; move(output, 'daemon');
      }
    }
    else if (button.dataset.addModule) { add(button.dataset.addModule); render(); }
    else if (button.dataset.selectModule) { state.selected = button.dataset.selectModule; render(); }
    else if (button.dataset.decisionOpen) openDecision(button.dataset.decisionOpen);
    else if (button.dataset.source) openSource(button.dataset.source, button.dataset.needle || '', button.dataset.sourceRevision || state.revision);
    else if (button.dataset.diff) openSource(button.dataset.diff, '', 'head', true);
    else if (button.hasAttribute('data-close-dialog')) $('#evidence-dialog').close();
  });
  $('#reset').addEventListener('click', reset);
  $('#move-selected').addEventListener('click', () => move(state.selected, $('#destination').value));
  $('#restore-selected').addEventListener('click', () => move(state.selected, 'cli'));
  $('#repair').addEventListener('change', event => { state.repair = event.target.checked; render(); });
  $('#include-tests').addEventListener('change', event => { state.tests = event.target.checked; renderInspector(); });
  $('#selected-source').addEventListener('click', () => openSource(state.selected, 'class ' + moduleName(state.selected)));
  $('#file-filter').addEventListener('input', renderLedger);
  $('#close-dialog').addEventListener('click', () => $('#evidence-dialog').close());
  $('#back-dialog').addEventListener('click', () => {
    const previous = dialogHistory.pop();
    if (!previous) return;
    $('#dialog-title').textContent = previous.title; $('#dialog-eyebrow').textContent = previous.eyebrow; $('#dialog-body').innerHTML = previous.body; $('#dialog-body').scrollTop = previous.scroll;
    if ($('.source-view')) $('.source-view').scrollTop = previous.sourceScroll || 0;
    $('#back-dialog').hidden = dialogHistory.length === 0;
  });
  $('#evidence-dialog').addEventListener('close', () => { dialogHistory.length = 0; if (dialogReturn?.isConnected) dialogReturn.focus({ preventScroll: true }); });
  $('#evidence-dialog').addEventListener('click', event => { if (event.target === $('#evidence-dialog')) $('#evidence-dialog').close(); });

  let dragged;
  $('#board').addEventListener('dragstart', event => {
    const card = event.target.closest('[data-module]');
    if (!card) return;
    dragged = card.dataset.module;
    event.dataTransfer.setData('text/plain', dragged);
    event.dataTransfer.effectAllowed = 'move';
    card.classList.add('dragging');
  });
  $('#board').addEventListener('dragover', event => {
    const zone = event.target.closest('[data-package]');
    if (!zone || !dragged) return;
    event.preventDefault(); event.dataTransfer.dropEffect = 'move';
    document.querySelectorAll('.drop-active').forEach(node => node.classList.remove('drop-active'));
    zone.classList.add('drop-active');
  });
  $('#board').addEventListener('drop', event => {
    const zone = event.target.closest('[data-package]');
    if (!zone || !dragged) return;
    event.preventDefault();
    move(dragged, zone.dataset.package);
    dragged = undefined;
  });
  $('#board').addEventListener('dragend', () => {
    dragged = undefined;
    document.querySelectorAll('.drop-active, .dragging').forEach(node => node.classList.remove('drop-active', 'dragging'));
  });

  renderDecisions(); renderProvenance(); renderLedger(); render();
  window.DragBox = { state, impact: () => model.impact(), model: () => model, openSource };
})();
