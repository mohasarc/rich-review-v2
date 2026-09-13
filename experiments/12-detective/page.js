(() => {
  'use strict';
  const evidence = window.CASE_EVIDENCE;
  const chapters = window.CASE_CHAPTERS;
  const references = window.CASE_REFERENCES;
  const decisions = chapters.flatMap(chapter => chapter.decisions.map(decision => ({ ...decision, chapter: chapter.id })));
  const byId = new Map(decisions.map(decision => [decision.id, decision]));
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

  $('#brief-grid').innerHTML = chapters.map(chapter => `
    <article class="brief-card" id="brief-${chapter.id}">
      <div class="brief-card-head"><span class="chapter-number">${chapter.number}</span><h3><a href="#detail-${chapter.id}">${escape(chapter.title)} ↗</a></h3></div>
      <p class="brief-subtitle">${escape(chapter.subtitle)}</p>
      ${chapter.decisions.map(decision => `<button class="decision-summary" id="decision-${decision.id}" data-decision="${decision.id}" aria-label="${decision.id}: ${escape(decision.title)}. ${decision.status}. Open reason and evidence.">
        <span class="decision-heading"><span class="decision-id">${decision.id}</span><strong>${escape(decision.title)}</strong><span class="status ${decision.status}">${decision.status}</span></span>
        <p>${escape(decision.summary)}</p><span class="decision-open">reason + evidence ↗</span>
      </button>`).join('')}
    </article>`).join('');

  document.querySelectorAll('.decision-links').forEach(container => {
    const chapter = chapters.find(item => item.id === container.dataset.chapter);
    container.innerHTML = '<span>Decisions in this clue</span>' + chapter.decisions.map(decision => `<button data-decision="${decision.id}" aria-label="${decision.id}: ${escape(decision.title)}">${decision.id} ↗</button>`).join('');
  });

  function showScene(revision) {
    const head = revision === 'head';
    document.querySelectorAll('[data-revision]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.revision === revision)));
    $('#ownership-scene').innerHTML = `
      <div class="scene-lane live-lane">
        <span class="box-label">apps/cli · shipped consumer</span><h3>${head ? 'The production route remains here.' : 'The CLI owns the daemon composition.'}</h3>
        <a class="scene-node" href="#detail-coupling"><strong>CLI dispatcher + lifecycle registration</strong><small>Host builds registry, transport, startup, launcher, observer, terminator</small></a>
        <div class="scene-connector" aria-hidden="true">↓</div>
        <a class="scene-node" href="#detail-authority"><strong>${head ? 'DaemonProcessCoordinator' : 'WorkspaceDaemon'}</strong><small>CLI-local process entry and worker entry</small></a>
        <a class="scene-node" href="#detail-staging"><strong>${head ? '38 frozen compatibility mechanism files' : 'Daemon mechanisms in the app'}</strong><small>execution · delivery · registry · transport · worker · resources · lifetime · diagnostics</small></a>
        <p class="scene-footnote">${head ? 'Dispatcher and lifecycle registration: byte-identical to the base. The mechanisms were prepared before the freeze.' : 'The daemon package already owns contracts and policy; the app still owns the mechanism graph.'}</p>
      </div>
      <div class="scene-lane ${head ? 'package-lane' : ''}">
        <span class="box-label">packages/daemon · ${head ? 'added mechanism ownership' : 'existing package'}</span><h3>${head ? 'A new host-facing path is available.' : 'Contracts and policy, without this client.'}</h3>
        ${head ? `<a class="scene-node" href="#detail-coupling"><strong>DaemonClient → private Node runtime</strong><small>Host calls execute() or control(); no mechanism factories in its public contract</small></a>
        <div class="scene-connector" aria-hidden="true">↓</div>
        <a class="scene-node" href="#detail-routing"><strong>Routing + lifecycle composition</strong><small>guards · registry · transports · controller · startup</small></a>
        <a class="scene-node" href="#detail-coupling"><strong>Package process entry + worker entry</strong><small>Injected host executor still supplies product behavior</small></a>
        <div class="mechanism-tags"><strong>Private concern folders</strong>client / process / registry / transport / execution / delivery / worker / resources / diagnostics / lifecycle</div>
        <p class="scene-footnote">Added ownership is blue. There is no active CLI → DaemonClient edge in this revision.</p>` : `<a class="scene-node" href="#detail-coupling"><strong>Host contracts, policy, admission, vocabularies</strong><small>No internal production package dependencies</small></a><div class="not-yet">Package-owned DaemonClient, process entry,<br>worker entry, and mechanism folders arrive in #148.</div>`}
      </div>`;
    $('#scene-summary').textContent = head ? 'The new public client exists alongside the old consumer graph.' : 'The existing CLI must know how the daemon mechanisms fit together.';
  }
  showScene('head');

  $('#unchanged-files').innerHTML = evidence.unchanged.map(file => `<div class="hash-row"><strong>${file.identical ? 'Identical at base and head' : 'Changed'}</strong><span>${escape(file.path)}</span><span>sha256 ${file.sha256.slice(0, 24)}…</span><button class="evidence-link" data-file="${escape(file.path)}" data-side="base">Base source ↗</button><button class="evidence-link" data-file="${escape(file.path)}" data-side="head">Head source ↗</button></div>`).join('');

  const guardNames = ['RecordPresentRoutingGuard', 'NotStartingRoutingGuard', 'RecordVersionRoutingGuard', 'ResponsiveRoutingGuard'];
  const guardLabels = ['Record present?', 'Not starting?', 'Version matches?', 'Responsive?'];
  const guardDescriptions = ['Read the record once.', 'A starting record answers here.', 'Compare the record’s version.', 'Observe only if still undecided.'];
  let selectedRoute = evidence.routes.results[0];
  let routeStep = selectedRoute.events.filter(event => event.kind === 'guard').length;
  $('#route-scenario').innerHTML = evidence.routes.results.map(route => `<option value="${route.id}">${escape(route.title)}</option>`).join('');

  function displayRoute() {
    const visited = selectedRoute.events.filter(event => event.kind === 'guard');
    const complete = routeStep >= visited.length;
    let guardIndex = 0;
    const shownEvents = selectedRoute.events.filter(event => {
      if (event.kind === 'guard') guardIndex += 1;
      return guardIndex <= routeStep;
    });
    $('#guard-trace').innerHTML = guardNames.map((name, index) => {
      const decision = selectedRoute.events.find(event => event.kind === 'decision' && event.name === name);
      const seen = index < routeStep && decision;
      const skipped = complete && !decision;
      const state = seen ? (decision.result === 'continue' ? 'Continue →' : decision.result) : skipped ? 'Not evaluated' : 'Pending';
      const style = seen ? (decision.result === 'continue' ? 'continued' : 'decided') : skipped ? 'skipped' : 'pending';
      return `<div class="guard-node ${style}"><span class="step-number">GUARD 0${index + 1}</span><h3>${guardLabels[index]}</h3><p>${guardDescriptions[index]}</p><span class="guard-state">${escape(state)}</span></div>`;
    }).join('');
    $('#route-result').innerHTML = `<small>${complete ? 'Recorded route' : 'Trace position'}</small>${complete ? escape(selectedRoute.route.kind + (selectedRoute.route.reason ? ' / ' + selectedRoute.route.reason : '')) : routeStep + ' guards examined'}`;
    $('#effect-counters').innerHTML = [['readRecord', 'registry reads'], ['observe', 'observations'], ['removeIfProcess', 'cleanup attempts']].map(([name, label]) => `<div class="effect-counter"><strong>${shownEvents.filter(event => event.kind === 'effect' && event.name === name).length}</strong><span>${label}</span></div>`).join('');
    $('#route-observation').textContent = complete ? selectedRoute.clue : 'The next guard runs only while the route remains undecided.';
    $('#route-raw').textContent = shownEvents.length ? shownEvents.map(event => `${event.kind.padEnd(8)} ${event.name}${event.result ? ' → ' + event.result : ''}`).join('\n') : 'No guard evaluated yet.';
    $('#route-next').disabled = complete;
    $('#route-reset').disabled = routeStep === 0;
  }
  displayRoute();
  $('#route-scenario').addEventListener('change', event => {
    selectedRoute = evidence.routes.results.find(route => route.id === event.target.value);
    routeStep = selectedRoute.events.filter(item => item.kind === 'guard').length;
    displayRoute();
  });
  $('#route-reset').addEventListener('click', () => { routeStep = 0; displayRoute(); });
  $('#route-next').addEventListener('click', () => { routeStep += 1; displayRoute(); });

  function renderFiles() {
    const query = $('#file-search').value.toLowerCase().trim();
    const kind = $('#file-kind').value;
    const matches = evidence.files.filter(file => (!query || `${file.old} ${file.path}`.toLowerCase().includes(query)) && (kind === 'all' || file.status === kind));
    $('#file-count').textContent = `${matches.length} / ${evidence.files.length}`;
    $('#file-rows').innerHTML = matches.map(file => `<tr><td><button data-diff="${escape(file.path)}">${escape(file.path)}</button>${file.status === 'moved' ? `<div class="file-status">from ${escape(file.old)}</div>` : ''}</td><td><span class="file-status">${file.status}</span></td><td>+${file.added} / −${file.removed}</td></tr>`).join('') || '<tr><td colspan="3">No files match this filter.</td></tr>';
  }
  $('#file-search').addEventListener('input', renderFiles);
  $('#file-kind').addEventListener('change', renderFiles);
  renderFiles();

  const dialog = $('#source-dialog');
  let currentDecision;
  let currentReference;
  let currentMode;
  let previousFocus;

  function deltaFor(path) {
    return evidence.files.find(file => file.path === path || file.old === path);
  }
  function snapshotFor(side, path) {
    const delta = deltaFor(path);
    return evidence.sources[`${side}:${delta ? (side === 'head' ? delta.path : delta.old) : path}`];
  }

  function openDialog() {
    if (!dialog.open) {
      previousFocus = document.activeElement;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    dialog.scrollTop = 0;
  }
  function closeDialog() { dialog.close(); }
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    previousFocus?.focus({ preventScroll: true });
  });
  $('#dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) closeDialog();
  });

  function decisionContext() {
    if (!currentDecision) { $('#decision-context').innerHTML = ''; return; }
    const sourceRefs = [...currentDecision.evidence];
    if (!sourceRefs.includes('pr-context')) sourceRefs.push('pr-context');
    if (currentDecision.status === 'stated' && !sourceRefs.includes('host-spec')) sourceRefs.push('host-spec');
    $('#decision-context').innerHTML = `<div class="decision-context"><p>${escape(currentDecision.summary)}</p><p class="reason"><span class="status ${currentDecision.status}">${currentDecision.status}</span>${escape(currentDecision.reason)}</p><div class="decision-source-list">${sourceRefs.map(ref => `<button data-dialog-ref="${ref}" aria-pressed="${references[ref] === currentReference}">${escape(references[ref][4])}</button>`).join('')}</div></div>`;
  }

  function openDecision(id) {
    currentDecision = byId.get(id);
    if (!currentDecision) return;
    currentReference = references[currentDecision.evidence[0]];
    currentMode = currentReference[0] === 'diff' ? 'diff' : currentReference[0] === 'pr' ? 'pr' : 'excerpt';
    renderSource();
    openDialog();
  }

  function openReference(ref) {
    currentDecision = undefined;
    currentReference = references[ref];
    if (!currentReference) return;
    currentMode = currentReference[0] === 'diff' ? 'diff' : currentReference[0] === 'pr' ? 'pr' : 'excerpt';
    renderSource();
    openDialog();
  }

  function openFile(path, side = 'head', diff = false) {
    currentDecision = undefined;
    currentReference = [diff ? 'diff' : side, path, 1, 1, path];
    currentMode = diff ? 'diff' : side;
    renderSource();
    openDialog();
  }

  function renderCode(text, firstLine, highlightStart, highlightEnd, isDiff) {
    const lines = text.split('\n');
    return `<div class="code-view" tabindex="0" aria-label="${isDiff ? 'Exact file diff' : 'Source code with line numbers'}">${lines.map((line, index) => {
      const lineNumber = firstLine + index;
      const kind = isDiff ? line.startsWith('+') ? 'diff-add' : line.startsWith('-') ? 'diff-remove' : line.startsWith('@@') ? 'diff-hunk' : '' : lineNumber >= highlightStart && lineNumber <= highlightEnd ? 'highlight' : '';
      return `<div class="code-line ${kind}"><span class="line-number">${isDiff ? '' : lineNumber}</span><span class="code-text">${escape(line) || ' '}</span></div>`;
    }).join('')}</div>`;
  }

  function renderSource() {
    const [side, path, start, end, label] = currentReference;
    $('#dialog-kicker').textContent = currentDecision ? `${currentDecision.id} / clue ${chapters.find(chapter => chapter.id === currentDecision.chapter).number} / reason and evidence` : 'Frozen local evidence / PR 148';
    $('#dialog-title').textContent = currentDecision ? currentDecision.title : label;
    decisionContext();
    $('#source-caption').className = 'source-caption';
    if (side === 'pr') {
      $('#source-tabs').innerHTML = '';
      $('#source-caption').textContent = 'Supplied inputs/pr-148/pr.json · author text and commit subjects; all 45 supplied commit bodies are empty.';
      $('#source-body').innerHTML = `<pre class="pr-body">${escape(evidence.pr.body)}</pre><div class="commit-list"><h3>${evidence.pr.commits.length} commits in this PR</h3>${evidence.pr.commits.map(commit => `<div><code>${commit.sha.slice(0, 8)}</code><span>${escape(commit.subject)}${commit.body ? '<p>' + escape(commit.body) + '</p>' : ''}</span></div>`).join('')}</div>`;
      return;
    }
    const options = [];
    if (side !== 'diff') options.push(['excerpt', 'Excerpt']);
    if (snapshotFor('base', path)) options.push(['base', 'Full base source']);
    if (snapshotFor('head', path)) options.push(['head', 'Full head source']);
    const delta = deltaFor(path);
    if (delta) options.push(['diff', 'File diff']);
    $('#source-tabs').innerHTML = options.map(([mode, title]) => `<button data-source-mode="${mode}" aria-pressed="${currentMode === mode}">${title}</button>`).join('');
    if (currentMode === 'diff') {
      $('#source-caption').textContent = `${delta.old} → ${delta.path} · ${evidence.base.slice(0, 8)} → ${evidence.head.slice(0, 8)} · +${delta.added} / −${delta.removed}`;
      $('#source-body').innerHTML = renderCode(delta.diff, 1, 0, 0, true);
    } else {
      const sourceSide = currentMode === 'excerpt' ? side : currentMode;
      const source = snapshotFor(sourceSide, path);
      const lines = source.text.split('\n');
      const firstLine = currentMode === 'excerpt' ? Math.max(1, start) : 1;
      const lastLine = currentMode === 'excerpt' ? Math.min(end, lines.length) : lines.length;
      const displayed = lines.slice(firstLine - 1, lastLine).join('\n');
      $('#source-caption').textContent = `${sourceSide.toUpperCase()} ${evidence[sourceSide].slice(0, 8)} · ${source.path} · lines ${firstLine}–${lastLine} · sha256 ${source.sha256.slice(0, 16)}…`;
      $('#source-body').innerHTML = renderCode(displayed, firstLine, currentMode === 'excerpt' ? firstLine : sourceSide === side ? start : -1, sourceSide === side ? end : -1, false);
    }
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('button, a');
    if (!target) return;
    if (target.dataset.revision) showScene(target.dataset.revision);
    if (target.dataset.decision) openDecision(target.dataset.decision);
    if (target.dataset.ref) openReference(target.dataset.ref);
    if (target.dataset.diff) openFile(target.dataset.diff, 'head', true);
    if (target.dataset.file) openFile(target.dataset.file, target.dataset.side || 'head');
    if (target.dataset.dialogRef) {
      currentReference = references[target.dataset.dialogRef];
      currentMode = currentReference[0] === 'diff' ? 'diff' : currentReference[0] === 'pr' ? 'pr' : 'excerpt';
      renderSource();
    }
    if (target.dataset.sourceMode) { currentMode = target.dataset.sourceMode; renderSource(); }
    const hash = target.getAttribute('href');
    if (hash?.startsWith('#decision-')) { event.preventDefault(); openDecision(hash.slice('#decision-'.length)); }
  });

  if (location.hash.startsWith('#decision-')) openDecision(location.hash.slice('#decision-'.length));
  // Read-only navigation state stays in memory. No comments, votes, or storage APIs.
})();
