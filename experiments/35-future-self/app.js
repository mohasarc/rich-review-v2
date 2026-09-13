/* Reading interactions only. No storage, network, analytics, or feedback collection. */
(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function openRecord(id, scroll = true) {
    const record = document.getElementById(id);
    const detail = document.getElementById(`detail-${id}`);
    if (!record || !detail) return;
    detail.open = true;
    record.classList.add('expanded');
    if (scroll) record.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  }

  function followHash() {
    const match = location.hash.match(/^#detail-(d\d{2})$/);
    if (match) openRecord(match[1]);
  }

  document.querySelectorAll('[data-open]').forEach(link => {
    link.addEventListener('click', () => openRecord(link.dataset.open, false));
  });

  document.querySelectorAll('.decision > details').forEach(detail => {
    detail.addEventListener('toggle', () => detail.closest('.decision').classList.toggle('expanded', detail.open));
  });

  document.querySelectorAll('[data-close]').forEach(button => {
    button.addEventListener('click', () => {
      const record = document.getElementById(button.dataset.close);
      const detail = document.getElementById(`detail-${button.dataset.close}`);
      detail.open = false;
      record.classList.remove('expanded');
      detail.querySelector('summary').focus({ preventScroll: true });
      record.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
    });
  });

  window.addEventListener('hashchange', followHash);
  followHash();

  const scenarios = {
    starting: { stop: 2, route: 'cold / starting', reads: 1, observations: 0, removals: 0, trigger: 'No startup trigger', note: 'The starting guard decides before the version guard. The different product version is not examined for this route.' },
    absent: { stop: 1, route: 'cold / absent', reads: 1, observations: 0, removals: 0, trigger: 'Independent startup trigger', note: 'No record means no observation. The command gets a fresh local executor without waiting for warm-up.' },
    disabled: { stop: 0, route: 'cold local / disabled', reads: 0, observations: 0, removals: 0, trigger: 'No startup trigger', note: 'The enabled check in execute returns before workspace identity and registry routing.' },
    incompatible: { stop: 3, route: 'fallback / incompatible', reads: 1, observations: 0, removals: 0, trigger: 'Independent startup trigger', note: 'A record-version mismatch decides without probing transport. Local execution is labeled fallback.' },
    ready: { stop: 4, route: 'warm', reads: 1, observations: 1, removals: 0, trigger: 'No startup trigger', note: 'A responsive compatible busy daemon still routes warm. This call does not create a local executor.' },
    unresponsive: { stop: 4, route: 'cold / recovering', reads: 1, observations: 1, removals: 0, trigger: 'No startup trigger', note: 'Unresponsive is not confirmed exit. This route executes locally without removing the record or triggering replacement.' },
    exited: { stop: 4, route: 'fallback / dead', reads: 1, observations: 1, removals: 1, trigger: 'Independent startup trigger', note: 'Confirmed exit invokes best-effort removeIfProcess during routing, then startup is triggered independently.' },
    recovering: { stop: 1, route: 'cold / recovering', reads: 1, observations: 0, removals: 0, trigger: 'No startup trigger', note: 'A registry read failure stops route selection. No transport observation follows.' },
  };

  const scenarioControl = document.getElementById('route-scenario');
  function renderRoute() {
    const s = scenarios[scenarioControl.value];
    document.querySelectorAll('[data-guard]').forEach(guard => {
      const i = Number(guard.dataset.guard);
      guard.classList.toggle('visited', i < s.stop);
      guard.classList.toggle('decisive', i === s.stop);
      guard.classList.toggle('skipped', i > s.stop);
      guard.setAttribute('aria-label', `${guard.textContent}: ${i < s.stop ? 'passes' : i === s.stop ? 'decides the route' : 'not evaluated'}`);
    });
    const result = document.getElementById('route-result');
    result.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = s.route;
    const explanation = document.createElement('p');
    explanation.textContent = s.note;
    const counts = document.createElement('div');
    counts.className = 'operation-counts';
    counts.textContent = `Read attempts ${s.reads} · Observations ${s.observations} · Routing removals ${s.removals} · ${s.trigger}`;
    result.append(heading, explanation, counts);
  }
  scenarioControl.addEventListener('change', renderRoute);
  renderRoute();

  const turnLength = document.getElementById('turn-length');
  function renderLifetime() {
    const length = Number(turnLength.value);
    const complete = 8 + length;
    const preserved = Math.max(18, complete);
    const deferred = complete + 10;
    document.getElementById('turn-label').textContent = `${length} unit${length === 1 ? '' : 's'}`;
    document.getElementById('preserved-time').textContent = `${preserved}`;
    document.getElementById('deferred-time').textContent = `${deferred}`;
    document.querySelectorAll('.turn-bar').forEach(bar => { bar.style.left = `${8 / 42 * 100}%`; bar.style.width = `${length / 42 * 100}%`; });
    document.querySelector('#preserved-track .shutdown-marker').style.left = `${preserved / 42 * 100}%`;
    document.querySelector('#deferred-track .shutdown-marker').style.left = `${deferred / 42 * 100}%`;
    document.getElementById('time-result').textContent = `The request completes at ${complete}. At this head, ${complete >= 18 ? 'the acceptance deadline has already passed, so queue-idle can trigger shutdown immediately' : `the acceptance deadline stays at 18, leaving ${18 - complete} idle units`}. The completion-based follow-up would instead allow a fresh 10 units, until ${deferred}.`;
  }
  turnLength.addEventListener('input', renderLifetime);
  renderLifetime();

  const search = document.getElementById('file-search');
  const fileRows = [...document.querySelectorAll('[data-file-row]')];
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    let shown = 0;
    fileRows.forEach(row => {
      const matches = row.textContent.toLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) shown++;
    });
    document.getElementById('file-count').textContent = `${shown} of ${fileRows.length} changes`;
  });
  root.classList.add('interactive');
})();
