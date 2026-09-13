(function () {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const bytes = value => value >= 1048576 ? `${+(value / 1048576).toFixed(2)} MiB` : value >= 1024 ? `${+(value / 1024).toFixed(2)} KiB` : `${value} B`;
  const decisions = CONTENT.decisions;
  const decision = id => decisions.find(item => item.id === id);
  const config = { scene: 'reply', purpose: 'status-observer', message: 'ping', delay: 150, fault: 'reattach-then-resume',
    reattachments: 1, resumes: 1, duration: 6000, profile: 'production', bytes: 327680 };
  let edition = 'head';
  let traces;
  let cursors = { base: -1, head: -1 };
  let timer;
  let running = false;
  let started = false;
  let views = [];
  const inspector = $('#inspector');

  $('#decision-cards').innerHTML = decisions.map(item => `<button class="decision-card" data-decision="${item.id}" data-status="${item.status}"><span class="card-top"><span class="card-number">${item.number}</span><span class="status ${item.status}">${item.status}</span><span class="card-arrow">↗</span></span><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p></button>`).join('');

  function option(value, label, selected) { return `<option value="${value}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`; }
  function select(name, label, values, disabled = false) {
    return `<label class="control-field"><span>${label}</span><select name="${name}"${disabled ? ' disabled' : ''}>${values.map(([value, text]) => option(value, text, String(config[name]))).join('')}</select></label>`;
  }
  function range(name, label, min, max, step, unit) {
    return `<label class="control-field"><span>${label}</span><span class="value-line"><output for="input-${name}">${name === 'bytes' ? bytes(config[name]) : Number(config[name]).toLocaleString() + ' ' + unit}</output><span>${unit === 'ms' ? 'virtual' : 'raw'}</span></span><input id="input-${name}" name="${name}" type="range" min="${min}" max="${max}" step="${step}" value="${config[name]}"></label>`;
  }
  function form() {
    const scene = CONTENT.scenes[config.scene];
    let fields = `<h3>${scene.title}</h3><p class="form-intro">${scene.intro}</p>`;
    if (config.scene === 'reply') {
      fields += select('message', 'Message to send', [['ping', 'ping'], ['identify', 'identify'], ['execution-status', 'execution-status']]);
      fields += select('purpose', 'Client constructed for', [['status-observer', 'status observation · 100 ms'], ['ordinary', 'ordinary exchange · 250 ms']], config.message === 'execution-status');
      fields += range('delay', 'Daemon response delay', 20, 400, 10, 'ms');
      fields += `<p class="lab-note">${config.message === 'execution-status' ? 'This path uses the ordinary client in the PR, despite “status” in the message name.' : 'Switch purpose while keeping this message unchanged. Both clocks existed before #131.'}</p>`;
    } else if (config.scene === 'execution') {
      fields += select('fault', 'Scripted interruption', [
        ['clean', 'No interruption'], ['before-acceptance', 'EOF before acceptance'], ['before-manifest', 'EOF before manifest'],
        ['mid-transfer', 'EOF after 2 records'], ['reattach-then-resume', 'Reattach, then resume'], ['two-reattachments', 'Two closes before manifest'],
        ['corrupt-after-reattach', 'Malformed after reattachment'], ['fetch-eof', 'EOF during fetch'],
      ]);
      fields += range('duration', 'Accepted work duration', 500, 12000, 500, 'ms');
      fields += `<div class="budget-row">${select('reattachments', 'Reattach limit', [['0', '0'], ['1', '1 · default'], ['2', '2']])}${select('resumes', 'Fetch allowance', [['0', '0'], ['1', '1 · default'], ['2', '2']])}</div>`;
      fields += '<p class="lab-note">Non-default allowances are laboratory policy inputs, not symnav options. Base stays at one each. Four invented records make offsets visible; recorded probes use empty output.</p>';
    } else {
      fields += select('profile', 'Output policy', [['production', 'Production defaults'], ['miniature', 'Miniature test snapshot']]);
      fields += config.profile === 'production' ? range('bytes', 'Command output', 0, 1048576, 65536, 'bytes') : range('bytes', 'Command output', 0, 16, 1, 'bytes');
      fields += `<p class="lab-note">${config.profile === 'production'
        ? '64 KiB chunks · 256 KiB inline · 256 MiB per result · 512 MiB aggregate. This run retains only one completion.'
        : 'Illustrative test snapshot: 2 B chunks ≤ 4 B inline ≤ 8 B result ≤ 12 B aggregate. The base uses its local defaults; there was no single output-policy input to those consumers.'}</p>`;
    }
    $('#scene-form').innerHTML = fields;
    $('#scene-controls').setAttribute('aria-labelledby', `tab-${config.scene}`);
    $$('.scene-tabs button').forEach(button => { const active = button.dataset.scene === config.scene; button.setAttribute('aria-selected', active); button.tabIndex = active ? 0 : -1; });
    $('#scene-insight').textContent = scene.insight;
  }
  function pause() {
    clearTimeout(timer);
    running = false;
    $('#pause').textContent = 'Resume';
  }
  function prepare() {
    pause();
    cursors = { base: -1, head: -1 };
    started = false;
    traces = Object.fromEntries(['base', 'head'].map(version => [version, Simulation.simulate(config, version)]));
    render();
  }
  function setScene(scene) {
    config.scene = scene;
    form();
    prepare();
  }
  function render() {
    const trace = traces[edition];
    const cursor = cursors[edition];
    const current = trace.events[cursor];
    const state = current?.state ?? { client: 'ready', daemon: 'ready', attempt: 0, reattachments: 0, resumes: 0,
      records: 0, retained: 0, clock: 'not armed', storage: 'none', clientStorage: 'none' };
    $$('.edition-switch button').forEach(button => button.setAttribute('aria-pressed', button.dataset.edition === edition));
    $('#edition-caption').textContent = edition === 'head' ? 'HEAD #131 · policy-fed consumers' : 'BASE · CLI defaults + optional numbers';
    $('#virtual-time').textContent = `t = ${(current?.time ?? 0).toLocaleString()} ms`;
    $('#client-state').textContent = state.client;
    $('#daemon-state').textContent = state.daemon;
    $('#client-clock').textContent = state.clock;
    $('#client-records').textContent = `${state.records} records stored${state.clientStorage === 'none' ? '' : ` · ${state.clientStorage}`}`;
    $('#daemon-spool').textContent = `${bytes(state.retained)} raw bytes retained`;
    $('#client-counters').innerHTML = config.scene === 'execution'
      ? `<span class="counter">execute attempt <b>${state.attempt}</b></span><span class="counter">reattach <b>${state.reattachments} / ${trace.final.reattachLimit}</b></span><span class="counter">fetch this attempt <b>${state.resumes} / ${trace.final.resumeLimit}</b></span>`
      : config.scene === 'output' ? `<span class="counter">record cap <b>${bytes(trace.limits.chunk)}</b></span><span class="counter">inline cap <b>${bytes(trace.limits.inline)}</b></span>` : '';
    $('#event-index').textContent = current ? `${String(cursor + 1).padStart(2, '0')} / ${String(trace.events.length).padStart(2, '0')}` : 'READY';
    $('#event-title').textContent = current?.label ?? `${config.scene === 'reply' ? 'A ' + config.message : 'An execute request'} is waiting at the client.`;
    $('#event-detail').textContent = current?.detail ?? 'Press Send, or use Step to move one event at a time.';
    const packet = $('#packet');
    packet.className = current ? `packet ${current.direction === 'boundary' ? 'boundary' : ['client', 'daemon'].includes(current.direction) ? 'local' : ''}` : 'packet hidden';
    packet.textContent = current ? (current.direction === 'out' ? '→ ' : current.direction === 'in' ? '← ' : current.direction === 'boundary' ? '× ' : '· ') + current.label.split(' · ')[0] : '';
    if (current && running && ['in', 'out'].includes(current.direction)) {
      void packet.offsetWidth;
      packet.classList.add(current.direction === 'out' ? 'travel-out' : 'travel-in');
    }
    $('#wire-caption').textContent = current ? ({ out: 'CLIENT → DAEMON', in: 'DAEMON → CLIENT', boundary: 'CONNECTION EVENT', client: 'INSIDE CLIENT', daemon: 'INSIDE DAEMON' }[current.direction]) : 'Ready to send';
    $('#event-tape').innerHTML = trace.events.map((event, index) => `<button data-event="${index}" class="${index === cursor ? 'active' : index < cursor ? 'past' : 'future'} ${event.direction === 'boundary' ? 'boundary' : ''}" ${index === cursor ? 'aria-current="step"' : ''} title="${esc(event.label)} at ${event.time} ms">${String(index + 1).padStart(2, '0')} ${event.direction === 'out' ? '→' : event.direction === 'in' ? '←' : event.direction === 'boundary' ? '×' : '·'} ${esc(event.label.split(' · ')[0])}</button>`).join('');
    $('#send').textContent = `${cursor >= trace.events.length - 1 ? 'Send again' : 'Send ' + (config.scene === 'reply' ? config.message : 'execute')} →`;
    $('#step').disabled = cursor >= trace.events.length - 1;
    $('#pause').disabled = cursor < 0 || cursor >= trace.events.length - 1;
    $('#pause').textContent = running ? 'Pause' : 'Resume';
    $('#envelope').disabled = !current;
    ['base', 'head'].forEach(version => {
      const other = traces[version];
      $(`#${version}-result`).textContent = started ? other.outcome : 'Waiting';
      $(`#${version}-meta`).textContent = !started ? '' : config.scene === 'execution'
        ? `${other.final.attempt} execute · ${other.events.filter(event => event.direction === 'out' && event.label.startsWith('result-fetch')).length} fetch · ${other.final.records} records`
        : config.scene === 'output' ? `${other.final.records} records · ${other.final.storage}${config.profile === 'miniature' && version === 'base' ? ' · local defaults' : ''}`
          : `${config.delay} ms response / ${config.purpose === 'status-observer' ? 100 : 250} ms budget`;
    });
    $('#comparison-note').textContent = !started ? 'Send to reveal both outcomes.' : traces.base.code === traces.head.code
      ? 'Same outcome for this input. Select a revision to inspect its steps.'
      : 'Different outcomes for this input. Select a revision to inspect the boundary.';
  }
  function advance() {
    started = true;
    const last = traces[edition].events.length - 1;
    cursors[edition] = Math.min(last, cursors[edition] + 1);
    if (cursors[edition] === last) pause();
    render();
    if (running) timer = setTimeout(advance, 820);
  }
  function play(restart = false) {
    clearTimeout(timer);
    if (restart) cursors[edition] = -1;
    running = true;
    advance();
  }
  function usePreset(name) {
    if (inspector.open) inspector.close();
    if (name === 'purpose') { config.scene = 'reply'; config.message = 'ping'; config.purpose = config.purpose === 'ordinary' ? 'status-observer' : 'ordinary'; config.delay = 150; }
    else {
      config.scene = 'execution';
      config.fault = ({ reattach: 'reattach-then-resume', error: 'corrupt-after-reattach', fetch: 'fetch-eof' })[name] ?? name;
      config.reattachments = 1;
      config.resumes = config.fault === 'fetch-eof' ? 2 : 1;
    }
    edition = 'head';
    form();
    prepare();
    $('#simulator').scrollIntoView({ block: 'start' });
    $('#send').focus({ preventScroll: true });
  }

  function openView(view, push = true) {
    pause();
    render();
    if (views.length && push) views[views.length - 1].scroll = inspector.scrollTop;
    if (!inspector.open) views = [];
    if (push) views.push(view);
    $('#inspector-back').disabled = views.length < 2;
    $('#inspector-content').innerHTML = viewHTML(view);
    if (!inspector.open) inspector.showModal();
    inspector.scrollTop = view.scroll ?? 0;
  }
  function refButtons(refs) {
    return `<span class="reference-label">SOURCE EXCERPTS · EXACT LOCAL LINES</span><div class="detail-links">${refs.map(id => `<button data-ref="${id}">${esc(id)} ↗</button>`).join('')}</div>`;
  }
  function viewHTML(view) {
    if (view.type === 'decision') {
      const item = decision(view.id);
      return `<p class="eyebrow">DECISION ${item.number} / MECHANISM</p><span class="status ${item.status}">${item.status}</span><h2 id="inspector-title">${esc(item.title)}</h2><p>${esc(item.summary)}</p><div class="reason-box ${item.status === 'unexplained' ? 'unexplained-reason' : ''}"><small>${item.status === 'stated' ? 'RECORDED REASON' : 'WHAT WAS NOT EXPLAINED'}</small><p>${esc(item.reason)}</p></div><p>${esc(item.detail)}</p>${item.scene ? `<button data-try-scene="${item.scene}">Try this exchange →</button>` : ''}${refButtons(item.refs)}<div class="detail-links"><button data-open="policy">Policy values + reasons ↗</button>${['recovery','error','fetch-limit'].includes(item.id) ? '<button data-open="observations">Recorded socket probes ↗</button>' : ''}<button data-open="sources">Full changed-file patch ↗</button></div><span class="reference-label">RELATED DECISIONS</span><div class="detail-links">${(item.related ?? []).map(id => `<button data-decision="${id}">${decision(id).number} · ${esc(decision(id).title)}</button>`).join('')}</div><p class="snapshot-note">Reasons were sought in the supplied PR and commit bodies, architecture spec and policy record. No implementing-agent transcript was supplied. “Unexplained” describes that evidence boundary.</p>`;
    }
    if (view.type === 'ref') {
      const reference = EVIDENCE.refs[view.id];
      const last = reference.first + reference.lines.length - 1;
      return `<p class="eyebrow">EXACT SOURCE / ${reference.edition.toUpperCase()}</p><h2 id="inspector-title">${esc(view.id)}</h2><p class="source-heading">${esc(reference.path)}<br>${EVIDENCE.commits[reference.edition].slice(0, 12)} · lines ${reference.first}–${last}</p><a class="source-link" target="_blank" rel="noopener noreferrer" href="https://github.com/mohasarc/symnav/blob/${EVIDENCE.commits[reference.edition]}/${reference.path}#L${reference.first}-L${last}">Pinned repository source ↗</a><div class="code-window">${reference.lines.map((line, index) => `<span class="code-line"><span class="line-number">${reference.first + index}</span>${esc(line)}</span>`).join('')}</div><button data-file="${esc(reference.path)}">Changed-file patch ↗</button><p class="snapshot-note">This excerpt is bundled locally. The linked repository is optional.</p>`;
    }
    if (view.type === 'policy') {
      return `<p class="eyebrow">EXISTING POLICY / CONSUMED BY #131</p><h2 id="inspector-title">Every threshold keeps its own meaning.</h2><p>The policy object and this record predate #131. This PR connects their values to the consumers. The reasons below are from <code>plans/005/daemon-policy.md</code>; equal numbers remain distinct policy entries.</p><div class="detail-links">${['all','transport','delivery','output','resources','startup','shutdown','diagnostics','recipe'].map(group => `<button data-policy-group="${group}" aria-pressed="${(view.group ?? 'all') === group}">${group}</button>`).join('')}</div><div class="table-scroll"><table><thead><tr><th>Policy entry</th><th>Value / recipe</th><th>Applies to</th><th>Stated reason</th></tr></thead><tbody>${EVIDENCE.policyRows.filter(row => !view.group || view.group === 'all' || row.path.startsWith(view.group + '.')).map(row => `<tr><td><code>${esc(row.path)}</code></td><td>${esc(row.value)}</td><td>${esc(row.consumer)}</td><td>${esc(row.reason)}</td></tr>`).join('')}</tbody></table></div><p class="reference-label">INTENTIONAL ABSENCES · RECORDED REASONS</p><div class="table-scroll"><table><tbody><tr><td>Healthy startup</td><td>Progressing warm-up has no project-size deadline.</td></tr><tr><td>Startup silence</td><td>Silence handling is deferred to the follow-up contract.</td></tr><tr><td>Post-accept completion</td><td>Accepted work is not failed or replayed because it runs long.</td></tr><tr><td>Worker output acknowledgement</td><td>Backpressure waits for durable consumption without a timer.</td></tr><tr><td>Unacknowledged result</td><td>Retention eviction is deferred to the follow-up contract.</td></tr></tbody></table></div>${refButtons(['defaults','validation'])}<a href="evidence/daemon-policy.md">Full local policy record ↗</a>`;
    }
    if (view.type === 'observations') {
      return `<p class="eyebrow">RECORDED LOCAL SOCKET EXCHANGES</p><h2 id="inspector-title">Real client. Scripted peer.</h2><p>${esc(EVIDENCE.observations.method)}</p><p class="snapshot-note">Recorded ${esc(EVIDENCE.observations.recordedAt)} · ${EVIDENCE.observations.node}. Probes use an empty result and fetch offset 0; the page’s illustrative four-record transfer makes offset 2 visible. These are scoped observations, not a daemon correctness verdict.</p>${['ping-150ms','reattach-then-resume','corrupt-after-reattach','fetch-eof','two-reattachments'].map(scenario => `<div class="recording"><h3>${esc(scenario)}</h3>${EVIDENCE.observations.rows.filter(row => row.scenario === scenario).map(row => `<div class="run-line">${row.edition.toUpperCase()}${row.purpose ? ' / ' + row.purpose : ''}: ${row.messages.map(message => esc(message.kind + (message.offset === undefined ? '' : `(offset=${message.offset})`))).join(' → ')}</div><div class="result-line">${esc(row.error ? `${row.error.code} / ${row.error.delivery} · ${row.error.message}` : row.value.status ?? row.value.kind)}</div>`).join('')}</div>`).join('')}<div class="detail-links"><a href="evidence/observations.json">Raw observation data ↗</a><a href="evidence/probe.mjs">Reproducible probe ↗</a></div>${refButtons(['base-reattach','reattach','fetch'])}`;
    }
    if (view.type === 'sources') {
      return `<p class="eyebrow">60 CHANGED FILES / BASE → HEAD</p><h2 id="inspector-title">Source desk</h2><p>The entire supplied patch is bundled here. Excerpts above point to exact head or base lines. Production changes route policy; tests and helpers account for much of the file count.</p><p class="source-heading">Base: ${EVIDENCE.commits.base}<br>Head: ${EVIDENCE.commits.head}</p><div class="detail-links"><a href="evidence/pr-131.patch">Full local patch ↗</a><button data-open="pr">PR body and commits ↗</button><button data-open="observations">Recorded socket probes ↗</button></div><label class="reference-label" for="source-filter">FILTER CHANGED PATHS</label><input type="search" id="source-filter" class="filter-input" placeholder="transport, test, spool…" value="${esc(view.filter ?? '')}"><div class="source-list" id="source-list">${fileList(view.filter ?? '')}</div>`;
    }
    if (view.type === 'file') {
      const file = EVIDENCE.files.find(file => file.path === view.path);
      if (!file) return `<h2 id="inspector-title">Unchanged in #131</h2><p>${esc(view.path)} belongs to the preceding policy layer. Its excerpt is context, not part of this patch.</p><button data-open="sources">Back to changed files ↗</button>`;
      return `<p class="eyebrow">SUPPLIED PATCH / EXACT TEXT</p><h2 id="inspector-title">${esc(file.path.split('/').pop())}</h2><p class="source-heading">${esc(file.path)} · +${file.added} / −${file.removed}</p><div class="code-window patch">${file.patch.split('\n').map(line => `<span class="code-line ${line.startsWith('+') ? 'added' : line.startsWith('-') ? 'removed' : line.startsWith('@@') ? 'hunk' : ''}">${esc(line) || ' '}</span>`).join('')}</div>`;
    }
    if (view.type === 'pr') {
      return `<p class="eyebrow">SUPPLIED PR INPUT</p><h2 id="inspector-title">#131 · ${esc(EVIDENCE.pr.title)}</h2><p class="snapshot-note">PR body is rendered as its original Markdown text. Its diagrams are input claims; the artifact also checked the implementation.</p><pre class="envelope-code">${esc(EVIDENCE.pr.body)}</pre><h3>Commits, in supplied order</h3>${EVIDENCE.pr.commits.map(commit => `<p class="source-heading">${commit.sha.slice(0, 12)} · ${esc(commit.subject)}<br>${esc(commit.body || '(empty commit body)')}</p>`).join('')}`;
    }
    if (view.type === 'envelope') {
      const event = traces[edition].events[cursors[edition]];
      return `<p class="eyebrow">${edition.toUpperCase()} / EVENT ${cursors[edition] + 1}</p><h2 id="inspector-title">${esc(event.label)}</h2><p>${esc(event.detail)}</p><p class="lossy">Envelope sketch: opaque IDs, tokens, digest and byte arrays are shortened. This is not sendable JSON. Local actions and connection events have no message envelope.</p><pre class="envelope-code">${esc(event.payload ? JSON.stringify(event.payload, null, 2) : 'No wire message at this step.')}</pre><p class="reference-label">ACTOR STATE AFTER THIS EVENT</p><pre class="envelope-code">${esc(JSON.stringify(event.state, null, 2))}</pre><div class="detail-links"><button data-decision="${config.scene === 'reply' ? 'deadlines' : config.scene === 'output' ? 'output' : 'recovery'}">Back to the decision ↗</button></div>`;
    }
    return '';
  }
  function fileList(filter) {
    const files = EVIDENCE.files.filter(file => file.path.toLowerCase().includes(filter.toLowerCase()));
    return files.length ? files.map(file => `<button data-file="${esc(file.path)}"><span>${esc(file.path)}</span><span class="source-counts">+${file.added} −${file.removed} ↗</span></button>`).join('') : '<p>No matching changed files.</p>';
  }

  $('#scene-form').addEventListener('input', event => {
    const input = event.target;
    if (input.tagName !== 'INPUT') return;
    config[input.name] = Number(input.value);
    input.closest('label').querySelector('output').textContent = input.name === 'bytes' ? bytes(config.bytes) : `${config[input.name].toLocaleString()} ms`;
    prepare();
  });
  $('#scene-form').addEventListener('change', event => {
    const input = event.target;
    if (input.tagName !== 'SELECT') return;
    config[input.name] = ['resumes','reattachments'].includes(input.name) ? Number(input.value) : input.value;
    if (input.name === 'message' && input.value === 'execution-status') config.purpose = 'ordinary';
    if (input.name === 'profile') config.bytes = input.value === 'miniature' ? 6 : 327680;
    const name = input.name;
    form();
    prepare();
    $(`#scene-form [name="${name}"]`)?.focus({ preventScroll: true });
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.decision) return openView({ type: 'decision', id: button.dataset.decision });
    if (button.dataset.ref) return openView({ type: 'ref', id: button.dataset.ref });
    if (button.dataset.open) return openView({ type: button.dataset.open });
    if (button.dataset.file) return openView({ type: 'file', path: button.dataset.file });
    if (button.dataset.scene) return setScene(button.dataset.scene);
    if (button.dataset.preset) return usePreset(button.dataset.preset);
    if (button.dataset.tryScene) {
      if (CONTENT.scenes[button.dataset.tryScene]) { inspector.close(); setScene(button.dataset.tryScene); $('#simulator').scrollIntoView(); $('#send').focus({ preventScroll: true }); }
      else usePreset(button.dataset.tryScene);
      return;
    }
    if (button.dataset.policyGroup) {
      const view = { type: 'policy', group: button.dataset.policyGroup };
      views[views.length - 1] = view;
      openView(view, false);
      return;
    }
    if (button.dataset.edition || button.dataset.compare) {
      pause();
      edition = button.dataset.edition ?? button.dataset.compare;
      if (button.dataset.compare) { cursors[edition] = traces[edition].events.length - 1; started = true; }
      render();
      return;
    }
    if (button.dataset.event !== undefined) {
      pause(); started = true; cursors[edition] = Number(button.dataset.event); render();
      $(`[data-event="${cursors[edition]}"]`)?.focus({ preventScroll: true });
      return;
    }
    if (button.id === 'send') return play(true);
    if (button.id === 'step') { pause(); advance(); return; }
    if (button.id === 'pause') { if (running) { pause(); render(); } else play(); return; }
    if (button.id === 'reset') return prepare();
    if (button.id === 'envelope') return openView({ type: 'envelope' });
    if (button.id === 'inspector-close') return inspector.close();
    if (button.id === 'inspector-back') { views.pop(); openView(views.at(-1), false); }
  });
  document.addEventListener('input', event => {
    if (event.target.id !== 'source-filter') return;
    views[views.length - 1].filter = event.target.value;
    $('#source-list').innerHTML = fileList(event.target.value);
  });
  $$('.scene-tabs button').forEach(button => button.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const scenes = ['reply','execution','output'];
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (scenes.indexOf(config.scene) + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
    setScene(scenes[next]);
    $(`#tab-${scenes[next]}`).focus();
  }));
  inspector.addEventListener('click', event => {
    const rect = inspector.getBoundingClientRect();
    if (event.target === inspector && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) inspector.close();
  });
  inspector.addEventListener('close', () => { views = []; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { pause(); render(); } });
  form();
  prepare();
})();
