(() => {
  'use strict';
  const { groups, decisions } = window.REVIEW;
  const byId = new Map(decisions.map(d => [d.id, d]));
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  let selected = 'barrier';

  const label = status => `<span class="label ${status}">${status}</span>`;
  $('inventory-grid').innerHTML = groups.map(group => `<article class="inventory-group group-${group.color}" id="group-${group.id}">
    <div class="group-title"><span>${group.number}</span><h3>${escape(group.title)}</h3></div>
    ${group.ids.map(id => {
      const d = byId.get(id);
      return `<div class="claim" id="claim-${id}"><div class="claim-line"><a class="claim-title" data-decision="${id}" href="#d/${id}">${escape(d.title)}</a>${label(d.status)}</div><p>${escape(d.summary)}</p><p class="reason"><b>${d.status === 'stated' ? 'Reason' : 'Missing reason'}:</b> ${escape(d.reason)}</p></div>`;
    }).join('')}
  </article>`).join('');

  $('decision-nav').innerHTML = groups.map(group => `<div class="nav-group">${group.number} / ${escape(group.title)}</div>${group.ids.map(id => `<a href="#d/${id}" data-decision="${id}">${escape(byId.get(id).title)}</a>`).join('')}`).join('');

  const sourceButton = ([key, start, end, title]) => `<button type="button" data-source="${escape(key)}" data-start="${start}" data-end="${end}">${escape(title)} ↗<small>${escape(key.split('/')[0] === 'before' ? 'before #146' : '#' + key.split('/')[0])} · L${start}${end !== start ? '–' + end : ''}</small></button>`;

  function renderDecision(id, navigate = false) {
    if (!byId.has(id)) return;
    selected = id;
    const d = byId.get(id);
    const group = groups.find(g => g.ids.includes(id));
    $('decision-panel').innerHTML = `<div class="detail-subline"><span>${group.number} / ${escape(group.title)}</span>${label(d.status)}</div>
      <h3 class="detail-title">${escape(d.title)}</h3>
      <p>${escape(d.summary)}</p>
      <div class="detail-rationale ${d.status}"><strong>${d.status === 'stated' ? 'Reason found in the inputs' : 'No specific rationale found'}</strong>${escape(d.reason)}</div>
      <div class="mechanism-flow" aria-label="Mechanism and ownership">${d.flow.map(([title, body]) => `<div class="mechanism-node"><b>${escape(title)}</b><span>${escape(body)}</span></div>`).join('')}</div>
      <p>${escape(d.detail)}</p>
      <div class="detail-evidence-label">Inspect the exact source</div><div class="source-buttons">${d.refs.map(sourceButton).join('')}</div>`;
    document.querySelectorAll('#decision-nav [data-decision]').forEach(a => a.setAttribute('aria-current', String(a.dataset.decision === id)));
    $('back-to-card').href = '#claim-' + id;
    const index = decisions.findIndex(x => x.id === id);
    $('decision-count').textContent = `${String(index + 1).padStart(2, '0')} / ${decisions.length}`;
    $('prev-decision').disabled = index === 0;
    $('next-decision').disabled = index === decisions.length - 1;
    if (navigate) {
      $('detail').scrollIntoView({ block: 'start' });
      $('detail').focus({ preventScroll: true });
    }
  }

  function goToDecision(id) {
    const hash = '#d/' + id;
    if (location.hash === hash) renderDecision(id, true);
    else location.hash = hash;
  }

  function onHash() {
    if (location.hash.startsWith('#d/')) renderDecision(location.hash.slice(3), true);
  }
  window.addEventListener('hashchange', onHash);
  $('prev-decision').addEventListener('click', () => goToDecision(decisions[decisions.findIndex(d => d.id === selected) - 1].id));
  $('next-decision').addEventListener('click', () => goToDecision(decisions[decisions.findIndex(d => d.id === selected) + 1].id));

  function executionBlock(inside = false) {
    return `<a class="map-block execution-block${inside ? ' inside' : ''}" href="#d/owners" data-decision="owners"><small>${inside ? 'Still inside WorkspaceDaemon' : 'EXTRACTED IN #147'}</small><h3>${inside ? 'Accepted execution coordination' : 'AcceptedExecutionSession'}</h3><p>Acceptance identity · queued worker turn<br>ledger completion · delivery wait · resource sample</p></a>`;
  }
  function deliveryBlock(inside = false) {
    return `<a class="map-block delivery-block${inside ? ' inside' : ''}" href="#d/owners" data-decision="owners"><small>${inside ? 'Still inside WorkspaceDaemon' : 'EXTRACTED IN #146'}</small><h3>${inside ? 'Completion delivery coordination' : 'DaemonDeliverySession'}</h3><p>Writers · attachments · result transfer · ACK<br>tracked stream promises · retained traces · cleanup</p></a>`;
  }
  const shellHeader = `<div class="shell-header"><a href="#d/authentication" data-decision="authentication">WorkspaceDaemon</a><small>composition · authentication · admission · shutdown</small></div>`;
  function renderMap(stage) {
    document.querySelectorAll('[data-stage]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stage === stage)));
    if (stage === 'before') $('ownership-map').innerHTML = `<div class="shell-box">${shellHeader}<div class="shell-contents">${executionBlock(true)}${deliveryBlock(true)}</div></div>`;
    else if (stage === '146') $('ownership-map').innerHTML = `<div class="map-pair"><div class="shell-box">${shellHeader}<div class="shell-contents">${executionBlock(true)}</div></div>${deliveryBlock()}</div><div class="map-linkage">shell execution ⇄ delivery: writer · trace · tracked promise</div>`;
    else $('ownership-map').innerHTML = `<div class="shell-box">${shellHeader}</div><div class="map-linkage"><span>↓ accept / status / drain / close</span><span>↓ attach / fetch / ACK / cleanup</span></div><div class="map-sessions">${executionBlock()}${deliveryBlock()}</div>`;
  }

  const sourceDialog = $('source-dialog');
  let sourceView;
  function renderSource(whole = false) {
    const { key, start, end } = sourceView;
    const s = window.SOURCES[key];
    const lines = s.text.replace(/\n$/, '').split('\n');
    const lo = whole ? 1 : Math.max(1, start - 4);
    const hi = whole ? lines.length : Math.min(lines.length, end + 4);
    $('source-revision').textContent = s.revision === 'before' ? 'Before #146 · pinned git object' : `#${s.revision} · pinned source`;
    $('source-title').textContent = s.path.split('/').pop();
    $('source-location').textContent = `${s.path} · ${s.sha}`;
    $('source-range').textContent = `${whole ? 'Whole file' : 'Excerpt with context'} · lines ${lo}–${hi} of ${lines.length}`;
    $('source-raw').href = s.raw.split('/').map(encodeURIComponent).join('/');
    $('show-whole-source').textContent = whole ? 'Return to excerpt' : 'Show whole file';
    $('show-whole-source').disabled = start === 1 && end === lines.length;
    $('show-whole-source').dataset.whole = String(whole);
    $('source-lines').innerHTML = lines.slice(lo - 1, hi).map((line, i) => {
      const n = i + lo;
      return `<div class="source-line${n >= start && n <= end ? ' selected' : ''}"><span class="line-number">${n}</span><code>${escape(line) || ' '}</code></div>`;
    }).join('');
    $('source-lines').scrollTop = 0;
    $('source-lines').scrollLeft = 0;
  }
  function openSource(key, start, end) {
    const source = window.SOURCES[key];
    if (!source) throw new Error('Unknown source: ' + key);
    sourceView = { key, start: start || 1, end: end || source.text.replace(/\n$/, '').split('\n').length };
    renderSource(false);
    sourceDialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  $('close-source').addEventListener('click', () => sourceDialog.close());
  sourceDialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  sourceDialog.addEventListener('click', e => { if (e.target === sourceDialog) { const r = sourceDialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) sourceDialog.close(); } });
  $('show-whole-source').addEventListener('click', () => renderSource($('show-whole-source').dataset.whole !== 'true'));

  document.addEventListener('click', e => {
    const decision = e.target.closest('[data-decision]');
    if (decision && !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) { e.preventDefault(); goToDecision(decision.dataset.decision); }
    const stage = e.target.closest('[data-stage]');
    if (stage) renderMap(stage.dataset.stage);
    const source = e.target.closest('[data-source]');
    if (source) openSource(source.dataset.source, Number(source.dataset.start), Number(source.dataset.end));
  });

  let lab;
  function resetLab() { lab = { complete: false, first: 'waiting', latest: 'waiting', sampled: false, acknowledged: false }; renderLab(); }
  function renderLab() {
    const settled = lab.latest === 'sent' || lab.latest === 'disconnected';
    $('request-a').innerHTML = `<b>A</b><span>${lab.complete ? 'Ledger: completed' : 'Worker running'}</span><small>one acceptance · one execution</small>`;
    $('request-b').innerHTML = `<b>B</b><span>${lab.sampled ? 'Worker can start' : 'Queued behind A'}</span><small>${lab.sampled ? 'ACK was not a turn gate' : 'execution count: 0'}</small>`;
    $('request-b').classList.toggle('running', lab.sampled);
    $('wait-label').textContent = !lab.complete ? 'A owns the turn' : !settled ? 'waiting for latest delivery' : !lab.sampled ? 'waiting for resource sample' : 'B released after the sample';
    $('first-status').textContent = !lab.complete ? 'Attached, waiting for completion' : lab.first === 'sent' ? 'result-end sent; promise settled' : 'Blocked at result-end';
    $('latest-status').textContent = !lab.complete ? 'Attached, waiting for completion' : lab.latest === 'sent' ? 'result-end sent; tracked promise settled' : lab.latest === 'disconnected' ? 'Send rejected; failure caught; promise settled' : 'Blocked at result-end; tracked promise pending';
    $('first-stream').classList.toggle('settled', lab.first === 'sent');
    $('latest-stream').classList.toggle('settled', settled);
    $('spool-status').textContent = lab.acknowledged ? 'Cleanup attempted; ledger ACK recorded. Identity remains.' : lab.complete ? 'Retained · ledger is unacknowledged · available for fetch' : 'Writer open; result not yet finalized';
    $('sample-status').textContent = lab.sampled ? 'Boundary sample settled. The queue may take B.' : settled ? 'Scheduled at the turn boundary. B still waits.' : 'Runs after the delivery wait settles.';
    $('sample-status').className = 'sample-card' + (lab.sampled ? ' done' : settled ? ' pending' : '');
    $('finish-worker').disabled = lab.complete;
    $('finish-first').disabled = !lab.complete || lab.first === 'sent';
    $('finish-latest').disabled = !lab.complete || settled;
    $('disconnect-latest').disabled = !lab.complete || settled;
    $('finish-sample').disabled = !settled || lab.sampled;
    $('acknowledge').disabled = !lab.sampled || lab.acknowledged || (lab.first !== 'sent' && lab.latest !== 'sent');
    let message;
    if (lab.acknowledged) message = '<b>The two lifecycles have separated.</b> B was released by the delivery wait and resource sample. A’s later ACK retires its bytes, while its request identity remains.';
    else if (lab.sampled) message = '<b>B can start with A still unacknowledged.</b> The queue waited for the current delivery promise and the resource sample. Result retention continues independently.';
    else if (lab.latest === 'disconnected') message = '<b>A failed send also settles the tracked wait.</b> Delivery records a diagnostic. A’s completed result stays retained for another fetch; the resource sample now gates B.';
    else if (settled && lab.first !== 'sent') message = '<b>The latest stream settled while the first is still blocked.</b> Only the resource sample now gates B. The implementation does not aggregate attachment promises.';
    else if (settled) message = '<b>The tracked delivery wait is over.</b> The resource sample is the remaining gate before B can run.';
    else if (lab.first === 'sent') message = '<b>First result-end arrived. B still waits.</b> The promise captured by execution belongs to the latest stream.';
    else if (lab.complete) message = '<b>Worker A is done; its FIFO turn is still held.</b> The ledger has published completion and both streams are blocked at result-end.';
    else message = '<b>One acceptance, two attachments.</b> A runs once. Its duplicate creates another delivery stream, and B waits behind the same turn.';
    $('lab-message').innerHTML = message;
  }
  $('finish-worker').addEventListener('click', () => { lab.complete = true; lab.first = 'blocked'; lab.latest = 'blocked'; renderLab(); });
  $('finish-first').addEventListener('click', () => { lab.first = 'sent'; renderLab(); });
  $('finish-latest').addEventListener('click', () => { lab.latest = 'sent'; renderLab(); });
  $('disconnect-latest').addEventListener('click', () => { lab.latest = 'disconnected'; renderLab(); });
  $('finish-sample').addEventListener('click', () => { lab.sampled = true; renderLab(); });
  $('acknowledge').addEventListener('click', () => { lab.acknowledged = true; renderLab(); });
  $('reset-lab').addEventListener('click', resetLab);
  renderMap('147');
  renderDecision('barrier');
  resetLab();
  onHash();
})();
