(() => {
  'use strict';
  const { decisions, stops, caches } = window.TOUR_CONTENT;
  const replay = window.REPLAY;
  const sources = window.SOURCES.sources;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const decisionById = id => decisions.find(decision => decision.id === id);
  let current = 0;
  let playback;
  let hostEvent = 'release-success';
  let projectSettled = false;
  let originalFocus;
  const detailHistory = [];
  const dialog = $('#detail-dialog');
  const backButton = document.createElement('button');
  backButton.id = 'dialog-back';
  backButton.textContent = '← Previous door';
  backButton.hidden = true;
  $('.dialog-top').insertBefore(backButton, $('#close-dialog'));

  function reasonTag(decision) {
    return `<span class="reason-tag ${decision.status}">${decision.status}</span>`;
  }

  function stopPlayback() {
    clearInterval(playback);
    playback = undefined;
    $('#play').textContent = 'Play';
    $('#play').setAttribute('aria-label', 'Play the walkthrough');
  }

  function showDetail(kicker, html) {
    stopPlayback();
    if (dialog.open) {
      detailHistory.push({ kicker: $('#detail-kicker').textContent, html: $('#dialog-content').innerHTML });
    } else {
      originalFocus = document.activeElement;
      detailHistory.length = 0;
    }
    $('#detail-kicker').textContent = kicker;
    $('#dialog-content').innerHTML = html;
    backButton.hidden = detailHistory.length === 0;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    $('#close-dialog').focus();
  }

  function sourceExcerpt(id, open = false) {
    const source = sources[id];
    const name = source.path.split('/').at(-1);
    return `<details class="source" ${open ? 'open' : ''}><summary><span class="source-version ${source.version}">${source.version === 'base' ? 'before' : 'after'}</span>${esc(name)} · L${source.start}–${source.end}<span class="source-location">${esc(source.path)}</span></summary><pre aria-label="${esc(source.path)}, lines ${source.start} to ${source.end}"><code>${source.lines.map((line, i) => `<span class="source-line"><span class="line-number" aria-hidden="true">${source.start + i}</span><span class="code-line">${esc(line)}</span></span>`).join('')}</code></pre></details>`;
  }

  function sourceList(ids) {
    return `<h3 class="sources-heading">Check the exact boundary</h3><p class="local-caption">Local excerpts from the recorded base and head. Expand only the source you want.</p>${[...new Set(ids)].map(id => sourceExcerpt(id)).join('')}`;
  }

  function cacheTable() {
    return `<table class="detail-table"><caption>Six isolated key and value spaces</caption><thead><tr><th>Handle</th><th>Key</th><th>Stored value</th></tr></thead><tbody>${caches.map(cache => `<tr><td>${esc(cache.title)}</td><td>${esc(cache.key)}</td><td><code>${esc(cache.value)}</code></td></tr>`).join('')}</tbody></table>`;
  }

  function decisionDetail(id) {
    const decision = decisionById(id);
    showDetail(`DECISION ${decision.number} / ${decision.status.toUpperCase()}`, `
      <h2 id="detail-title">${esc(decision.title)}</h2>
      <p class="detail-intro">${esc(decision.detail)}</p>
      <div class="detail-reason">${reasonTag(decision)}<p>${esc(decision.reason)}</p></div>
      <div class="detail-diagram">${decision.diagram.map(text => `<div>${esc(text)}</div>`).join('<span aria-hidden="true">→</span>')}</div>
      <p class="detail-sketch-note">Schematic: ${id === 'failure' ? 'three separate outcomes, not three consecutive actions.' : id === 'tests' ? 'test groups, not runtime actions.' : 'the relevant ownership or ordering, with unrelated work omitted.'}</p>
      ${['ownership', 'identity'].includes(id) ? cacheTable() : ''}
      <div class="detail-actions"><button data-jump="${decision.stop}">Walk stop ${decision.stop + 1}: ${esc(stops[decision.stop].label)}</button>${['release', 'refresh', 'surface'].includes(id) ? '<button data-jump-host>Explore the later host action</button>' : ''}</div>
      ${sourceList(decision.sources)}
      <p class="local-caption">Reason search: bundled PR body and six commit messages, full six-file diff, architecture spec and supplied repository rules. No implementing-agent transcript was supplied.</p>
    `);
  }

  function cacheDetail(index, version) {
    const cache = caches[index];
    const frame = replay.versions[version].frames[current];
    const entries = frame.caches[index].entries;
    showDetail(`CACHE DOOR / ${version === 'base' ? 'BEFORE' : 'AFTER'} / STOP ${current + 1}`, `
      <h2 id="detail-title">${esc(cache.title)}</h2>
      <p class="detail-intro">${esc(cache.explanation)} ${version === 'base' ? 'This entry is in a Map owned and cleared by the TypeScript service.' : 'This entry is in a typed handle owned by the service’s core scope.'}</p>
      <table class="detail-table"><caption>Observed at “${esc(stops[current].label)}”</caption><thead><tr><th>Exact key</th><th>Object label</th><th>Stored type</th></tr></thead><tbody>${entries.length ? entries.map(entry => `<tr><td><code>${esc(entry.key)}</code></td><td><code>${esc(entry.value)}</code></td><td>${esc(entry.type)}</td></tr>`).join('') : '<tr><td colspan="3">Empty at this stop.</td></tr>'}</tbody></table>
      <p class="local-caption">Object labels are assigned by the capture harness within each run. Equal labels across different versions do not assert cross-process identity.</p>
      <div class="detail-actions"><button data-decision="identity">Read the identity decision</button><button data-decision="ownership">See who owns the handle</button></div>
      ${sourceList(index === 5 ? ['positions', 'core-scope', 'identity-tests'] : ['new-ownership', 'core-scope', index === 0 ? 'new-definitions' : 'new-projections'])}
    `);
  }

  function stopDetail(index) {
    const stop = stops[index];
    const decision = decisionById(stop.decision);
    const frame = replay.versions.head.frames[index];
    showDetail(`REQUEST / STOP ${index + 1} OF ${stops.length}`, `
      <h2 id="detail-title">${esc(stop.title)}</h2><p class="detail-intro">${esc(stop.text)}</p>
      <div class="detail-reason">${reasonTag(decision)}<p>${esc(decision.reason)}</p></div>
      <p class="local-caption">${esc(stop.note)}</p>
      <div class="detail-actions"><button data-decision="${stop.decision}">Decision ${decision.number}: ${esc(decision.title)}</button></div>
      <h3 class="sources-heading">Recorded after this stop</h3>
      <pre class="raw-trace">${esc(JSON.stringify({ observerCounts: frame.counts, semanticServicePromiseReturnsSoFar: frame.serviceCalls, result: frame.result }, null, 2))}</pre>
      <p class="local-caption">This receipt is from the head run. Both versions’ full frames are in <a href="evidence/replay.json">replay.json</a>. The capture runs the semantic calls, not the full CLI.</p>
      ${sourceList(stop.sources)}
    `);
  }

  function lane(version) {
    const isNew = version === 'head';
    const frame = replay.versions[version].frames[current];
    const stop = stops[current];
    return `<article class="lane ${isNew ? 'new' : 'old'}" aria-label="${isNew ? 'After' : 'Before'} at ${esc(stop.label)}">
      <div class="lane-header"><strong>${isNew ? 'AFTER / Core scope' : 'BEFORE / Manual clearing'}</strong><code>${replay.versions[version].sha.slice(0, 8)}</code></div>
      <div class="request-band"><span class="request-token" aria-hidden="true">Q</span><span>${esc(stop.action)}</span></div>
      <div class="lane-body">
        <button class="backend-box ${stop.focus === 'backend' ? 'focused' : ''}" data-decision="refresh">TypeScriptBackend<span class="module-sub">refresh · query adapters · ${isNew ? 'awaited release' : 'release entry'}</span></button>
        <div class="call-connector" aria-hidden="true">↓</div>
        <div class="service-box">
          <button class="service-name" data-decision="ownership">TypeScriptSemanticQueryService ↗</button>
          <div class="engine-row"><button class="${current === 2 ? 'focused' : ''}" data-decision="identity">Definitions<span>TypeScript logic</span></button><button class="${current === 4 ? 'focused' : ''}" data-decision="identity">References<span>TypeScript logic</span></button><button class="${current === 5 ? 'focused' : ''}" data-decision="identity">Call traversal<span>TypeScript logic</span></button></div>
          <div class="scope-box ${stop.focus === 'scope' ? 'focused' : ''}">
            <div class="scope-heading"><button class="scope-name" data-decision="ownership">${isNew ? 'TurnScopedCacheScope' : 'Six independent Maps'}<small>${isNew ? 'core implementation · this service owns the instance' : 'TypeScript service owns the clearing list'}</small></button><span class="scope-tag">${isNew ? 'CORE' : 'TYPESCRIPT'}</span></div>
            <div class="cache-grid">${frame.caches.map((cache, index) => `<button class="cache ${cache.entries.length ? 'filled' : ''} ${stop.active.includes(index) ? 'active' : ''}" data-cache="${index}" data-version="${version}" aria-label="${esc(caches[index].title)}, ${cache.entries.length ? cache.entries.map(entry => entry.value).join(', ') : 'empty'}${stop.hits.includes(index) ? ', cache hit' : ''}; inspect ${isNew ? 'after' : 'before'}"><span class="cache-title">${esc(caches[index].title)}</span><span class="cache-value">${cache.entries.length ? cache.entries.map(entry => esc(entry.value)).join(', ') : '—'}</span>${stop.hits.includes(index) ? '<span class="cache-hit">HIT</span>' : ''}</button>`).join('')}</div>
          </div>
          <div class="state-row">uses <button data-decision="ownership">prepared workspace state</button><button data-decision="release">project graph</button></div>
        </div>
        <div class="lane-counts"><div><b>${frame.counts.definitionSearch}</b><span>definition<br>searches</span></div><div><b>${frame.counts.referenceSearch}</b><span>reference<br>searches</span></div><div><b>${frame.counts.callTargetResolution}</b><span>position<br>resolutions</span></div></div>
      </div>
    </article>`;
  }

  function receipt() {
    const frame = replay.versions.head.frames[current];
    let text;
    if (current === 0) text = 'Input fixture: caller → target → helper. Cache entries: 0.';
    else if (current === 1) text = 'Both beginTurn calls reached after refresh. All six caches are empty.';
    else if (current === 2) text = 'Call target: resolved. Two separate promises for the same symbol key.';
    else if (current === 3) text = 'The same definition Promise returned twice by the service. Definition searches: 1.';
    else if (current === 4) text = 'Caller found: src/app.ts:caller. Reference searches: 1.';
    else if (current === 5) text = `Callee found: src/app.ts:helper. Position key: ${frame.caches[5].entries[0].key}.`;
    else if (current === 6) text = `References: ${frame.result.references.length}. The reference-location Promise is reused. Reference searches: 1.`;
    else text = replay.sameSemanticOutput ? 'Captured semantic results match: 1 definition · 1 caller · 1 callee · 1 reference.' : 'Captured semantic results differ; inspect the raw trace.';
    $('#receipt').innerHTML = `<span class="receipt-label">RECORDED RECEIPT</span><strong>${esc(text)}</strong><button class="text-link" data-stop="${current}">Inspect ↗</button>`;
  }

  function renderStop() {
    const stop = stops[current];
    $('#stop-count').textContent = `${current + 1} / ${stops.length}`;
    $('#scrub').value = current;
    $('#scrub').setAttribute('aria-valuetext', `Stop ${current + 1}: ${stop.label}`);
    $('#stop-number').textContent = String(current + 1).padStart(2, '0');
    $('#stop-title').textContent = stop.title;
    $('#stop-text').textContent = stop.text;
    $('#stop-note').textContent = stop.note;
    $('#previous').disabled = current === 0;
    $('#next').disabled = current === stops.length - 1;
    $('#previous-bottom').disabled = current === 0;
    $('#next-bottom').disabled = current === stops.length - 1;
    $('#walk-position').textContent = `${current + 1} / ${stops.length} · ${stop.label}`;
    $('#comparison').innerHTML = lane('base') + lane('head');
    document.querySelectorAll('.route-stop').forEach((button, index) => {
      if (index === current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
      button.classList.toggle('visited', index < current);
    });
    receipt();
  }

  function setStop(index, manual = true) {
    if (manual) stopPlayback();
    current = Math.max(0, Math.min(stops.length - 1, Number(index)));
    renderStop();
  }

  function hostLane(version) {
    const event = replay.versions[version].events[hostEvent];
    const isRelease = hostEvent.startsWith('release');
    const after = isRelease && !projectSettled ? event.immediate : event.after;
    const count = after.caches.reduce((total, cache) => total + cache.entries.length, 0);
    const status = isRelease ? (projectSettled ? event.backendState : event.whileProjectPending) : hostEvent === 'refresh-success' ? 'fulfilled' : 'rejected';
    let explanation;
    if (!isRelease) explanation = hostEvent === 'refresh-success' ? 'beginTurn was reached. Each existing Map or handle was cleared.' : 'beginTurn was not reached. The same cached object labels remain.';
    else if (!projectSettled) explanation = version === 'base' ? 'Project release is still pending, but the service dropped its Promise. The backend has already returned.' : 'The cache clear has already run. The backend Promise waits on the service, which waits on the project graph.';
    else if (hostEvent === 'release-success') explanation = version === 'base' ? 'Project release finished later. The backend had already fulfilled.' : 'Project release finished; the awaited backend operation now fulfills.';
    else explanation = version === 'base' ? 'The project Promise rejected later. It is not connected to the already-fulfilled backend Promise.' : 'The project rejection travels through the awaited service Promise to the backend caller.';
    return `<article class="host-lane ${version === 'base' ? 'old' : 'new'}"><span class="version-small">${version === 'base' ? 'BEFORE · TYPESCRIPT MAPS' : 'AFTER · CORE HANDLES'}</span><div class="host-cache-row"><strong>${count} cached entries remain</strong><span>started with 6</span></div><div class="mini-caches" aria-label="${count} of six caches contain an entry">${after.caches.map(cache => `<span class="mini-cache ${cache.entries.length ? 'full' : ''}">${cache.entries.length ? cache.entries[0].value : '—'}</span>`).join('')}</div><div class="status-line"><span>Backend ${isRelease ? 'release' : 'refresh'} Promise</span><span class="status ${status}">${status}</span></div><p class="host-explanation">${explanation}</p></article>`;
  }

  function renderHost() {
    const isRelease = hostEvent.startsWith('release');
    const willReject = hostEvent === 'release-failure';
    document.querySelectorAll('[data-event]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.event === hostEvent)));
    $('#settle-project').hidden = !isRelease;
    $('#settle-project').textContent = projectSettled ? 'Replay the pending interval' : willReject ? 'Let the project reject →' : 'Let the project finish →';
    $('#host-title').textContent = isRelease ? projectSettled ? willReject ? 'Project rejected. Where does the error arrive?' : 'Project finished. When did the backend finish?' : 'Caches cleared. Project release is still pending.' : hostEvent === 'refresh-success' ? 'Same snapshot, new successful turn.' : 'Failed refresh, same semantic cache entries.';
    $('#host-comparison').innerHTML = hostLane('base') + hostLane('head');
    $('#host-note').textContent = isRelease ? 'Both clear synchronously before project release can finish or reject. The new await chain changes completion and rejection propagation. Clearing is not cancellation or disposal: callers holding old promises keep them, and the same handles can be used again.' : hostEvent === 'refresh-success' ? 'Both versions clear all semantic caches after successful refresh, even when files are unchanged. The difference is who owns the clear operation.' : 'Both preserve the semantic cache entries when the injected workspace-state refresh fails. This is not a claim that all earlier source or project refresh work is rolled back.';
  }

  $('#decision-grid').innerHTML = decisions.map(decision => `<button class="decision-card" data-decision="${decision.id}"><span class="decision-top"><span class="decision-no">${decision.number}</span>${reasonTag(decision)}<span class="card-arrow" aria-hidden="true">↗</span></span><strong>${esc(decision.title)}</strong><span class="decision-short">${esc(decision.short)}</span><span class="decision-reason">${esc(decision.reason)}</span></button>`).join('');
  $('#route-stops').innerHTML = stops.map((stop, index) => `<button class="route-stop" data-route="${index}" aria-label="Stop ${index + 1}: ${esc(stop.label)}"><span class="dot" aria-hidden="true">${index + 1}</span><span>${esc(stop.label)}</span></button>`).join('');
  $('#base-sha').textContent = replay.versions.base.sha;
  $('#head-sha').textContent = replay.versions.head.sha;

  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.decision) decisionDetail(button.dataset.decision);
    else if (button.dataset.cache !== undefined) cacheDetail(Number(button.dataset.cache), button.dataset.version);
    else if (button.dataset.stop !== undefined) stopDetail(Number(button.dataset.stop));
    else if (button.dataset.route !== undefined) setStop(button.dataset.route);
    else if (button.dataset.event) { hostEvent = button.dataset.event; projectSettled = false; renderHost(); }
    else if (button.dataset.jump !== undefined) {
      const destination = Number(button.dataset.jump);
      originalFocus = undefined;
      dialog.close();
      setStop(destination);
      $('#journey').scrollIntoView({ block: 'start' });
      document.querySelector(`[data-route="${destination}"]`).focus({ preventScroll: true });
    } else if ('jumpHost' in button.dataset) {
      originalFocus = undefined;
      dialog.close();
      $('#after').scrollIntoView({ block: 'start' });
      document.querySelector(`[data-event="${hostEvent}"]`).focus({ preventScroll: true });
    }
  });
  $('#previous').addEventListener('click', () => setStop(current - 1));
  $('#next').addEventListener('click', () => setStop(current + 1));
  $('#previous-bottom').addEventListener('click', () => { setStop(current - 1); $('#journey').scrollIntoView({ block: 'start' }); });
  $('#next-bottom').addEventListener('click', () => { setStop(current + 1); $('#journey').scrollIntoView({ block: 'start' }); });
  $('#scrub').addEventListener('input', event => setStop(event.target.value));
  $('#stop-door').addEventListener('click', () => stopDetail(current));
  $('#play').addEventListener('click', () => {
    if (playback) return stopPlayback();
    if (current === stops.length - 1) setStop(0);
    $('#play').textContent = 'Pause';
    $('#play').setAttribute('aria-label', 'Pause the walkthrough');
    playback = setInterval(() => {
      setStop(current + 1, false);
      if (current === stops.length - 1) stopPlayback();
    }, 4000);
  });
  $('#journey').addEventListener('keydown', event => {
    if (dialog.open || event.target.matches('input')) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); setStop(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); setStop(current - 1); }
  });
  $('#settle-project').addEventListener('click', () => { projectSettled = !projectSettled; renderHost(); });
  $('#close-dialog').addEventListener('click', () => dialog.close());
  backButton.addEventListener('click', () => {
    const previous = detailHistory.pop();
    if (!previous) return;
    $('#detail-kicker').textContent = previous.kicker;
    $('#dialog-content').innerHTML = previous.html;
    backButton.hidden = detailHistory.length === 0;
    dialog.scrollTop = 0;
  });
  dialog.addEventListener('close', () => {
    detailHistory.length = 0;
    if (originalFocus?.isConnected) originalFocus.focus({ preventScroll: true });
  });
  $('#all-sources').addEventListener('click', () => showDetail('EVIDENCE / 23 LOCAL EXCERPTS', `<h2 id="detail-title">Inspect the source at either revision.</h2><p class="detail-intro">The tour follows only PR #127. Untouched command and project-graph excerpts establish the request order and release boundary.</p>${sourceList(Object.keys(sources))}`));
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopPlayback(); });

  const initialStop = location.hash.match(/^#stop-([1-8])$/);
  setStop(initialStop ? Number(initialStop[1]) - 1 : 0);
  renderHost();
  if (initialStop) $('#journey').scrollIntoView({ block: 'start' });
})();
