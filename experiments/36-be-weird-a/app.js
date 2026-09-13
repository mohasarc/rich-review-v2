/* The page only changes its view. It does not store comments, choices, or verdicts. */
(() => {
  'use strict';
  const data = window.CONTACT_DATA;
  const sources = window.SOURCE_DATA;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const source = (id, label, lines = '') => `<button data-source="${id}" data-lines="${lines}">${label}</button>`;
  const mechanisms = (parts, caption = '') => `<div class="mechanism">${parts.map((part, index) => `${index ? '<span class="arrow" aria-hidden="true">→</span>' : ''}<div class="atom ${index === parts.length - 1 ? 'main' : ''}">${part}</div>`).join('')}${caption ? `<span class="caption">${caption}</span>` : ''}</div>`;
  const table = (headers, rows) => `<table class="detail-table"><thead><tr>${headers.map((cell) => `<th scope="col">${cell}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const decisions = [
    {
      id: 1, status: 'stated', title: 'Move the lifetime owner',
      synopsis: 'Core exports the generic scope and cache interface. TypeScript keeps semantic algorithms, key construction and project resources; its service calls into core.',
      reason: 'Plan: language-independent retention belongs in core.',
      detail: mechanisms(['TypeScript query service<br>chooses keys + computes values', '@symnav/core<br>stores values + clears handles'], 'Package dependency: backend-typescript → core. Core imports no TypeScript module.') +
        '<p>The deleted TypeScript clear loop named six maps. The new core loop names registered handles. The service still decides when to call that loop; core knows neither workspace snapshots nor projects.</p>',
      evidence: source('head-plan', 'Plan · language boundary', '52-64') + source('base-service', 'Before · manual clear loop', '219-227') + source('head-scope', 'After · generic owner', '26-46') + source('head-exports', 'Core export', '152-154'),
    },
    {
      id: 2, status: 'stated', title: 'Share expiry, isolate stores',
      synopsis: 'One scope owns six typed stores: five promise caches by symbol identity and one location cache by file position. Callers reuse reference discovery; call-target resolution reuses definitions.',
      reason: 'PR: the existing key and value spaces are independent.',
      detail: table(['Store', 'Key', 'Stored value'], data.channels.map((channel) => [channel.name, channel.id === 'P' ? '<code>relativePath:start</code>' : '<code>formatSymbolIdentity(identity)</code>', channel.kind])) +
        mechanisms(['Callers', 'Reference-location promise'], 'Reference projections also use these locations; caller edges have their own promise cache.') +
        mechanisms(['Call-target resolution', 'Definitions promise']) +
        '<p>Blank space between the six diagonal islands is measured non-aliasing in this fixture. The isolated handles in source establish the separate stores; pixels alone cannot establish all possible key behavior.</p>',
      evidence: source('pr-body', 'PR · six handles decision') + source('head-service', 'Six declarations + keys', '27-55') + source('head-service', 'Shared discovery', '108-120') + source('head-scope', 'Each handle gets a Map', '10-19'),
    },
    {
      id: 3, status: 'stated', title: 'Cache “nothing” too',
      synopsis: 'A present key whose value is undefined stays cached. An empty location array stays cached too. Lookup uses Map.has before Map.get.',
      reason: 'PR: undefined is a valid cached value.',
      detail: mechanisms(['key present?<br>Map.has(key)', 'yes: return stored value<br>even undefined'], 'If absent: call the factory, store its return value, return that exact value.') +
        table(['Probe', 'Two accesses produce'], [['Generic undefined factory', `${data.core.undefinedCalls} factory call`], ['Missing TypeScript identifier', 'An empty stored location array reused within the turn; fresh empty projections on access']]) +
        '<p>The generic API explicitly supports undefined. The TypeScript position cache already retained empty arrays before this change.</p>',
      evidence: source('pr-body', 'PR · presence decision') + source('head-scope', 'Presence check', '14-19') + source('head-scope-tests', 'Undefined characterization', '6-26') + source('head-service-tests', 'Empty positions', '60-95'),
    },
    {
      id: 4, status: 'stated', title: 'Cut only after success',
      synopsis: 'Successful backend refresh begins the next cache turn. A failed refresh leaves existing query entries available. The refresh ordering already existed before this PR.',
      reason: 'PR: preserve the current successful turn when refresh fails.',
      detail: mechanisms(['refresh source cache', 'await graph (workspace only)', 'await state refresh', 'beginTurn(files)<br>clear all handles']) +
        '<p>A rejection before beginTurn never calls the cache clear. This explains the large A/F square in both prints. It is a statement about semantic query entries, not a claim that every earlier refresh side effect is rolled back.</p>' +
        '<p>The controlled sample uses selection coverage and injects failure at state.refresh. Successful refresh of the same file list still clears the query caches; expiry is not conditional on changed bytes.</p>',
      evidence: source('pr-body', 'PR · success boundary reason') + source('base-backend', 'Before · refresh order', '79-85') + source('head-backend', 'After · refresh order', '79-85') + source('head-service-tests', 'Failed refresh characterization', '135-162'),
    },
    {
      id: 5, status: 'stated', title: 'Clear now; finish later',
      synopsis: 'Release synchronously empties all stores, then awaits project release. Backend completion now waits and receives project rejection. Queries can repopulate the cleared stores while release is pending.',
      reason: 'PR: old entries must be unavailable while release is pending or rejecting.',
      detail: mechanisms(['call release', 'synchronous clear', 'await project release', 'backend settles']) +
        table(['Observation', 'Before', 'After'], [['Old entry reused after release call?', 'No', 'No'], ['Backend while project pending', 'Fulfilled', 'Pending'], ['Project rejects', 'Backend stays fulfilled', 'Backend rejects with the same error'], ['New query during pending release', 'Can populate fresh entry', 'Can populate fresh entry']]) +
        '<p>Clearing removes the old entries before the first await. No closed-state check is added. The probe’s pending-release reads explain the separate R block in both prints.</p>',
      evidence: source('pr-body', 'PR · release reason') + source('base-service', 'Before · discarded promise', '125-128') + source('head-service', 'Service now awaits', '129-132') + source('head-backend', 'Backend now awaits', '87-89') + source('head-service-tests', 'Pending + rejecting release', '164-217'),
    },
    {
      id: 6, status: 'stated', title: 'Keep the exact return',
      synopsis: 'No promise wrapping or cancellation in the cache: rejected promises stay cached; synchronous factory throws retry. An old pending promise may settle after clearing without replacing a new entry.',
      reason: 'PR: preserve promise/value identities and failure behavior.',
      detail: mechanisms(['createValue()', 'store exact return', 'return exact value'], 'A synchronous throw stops before storage. A returned promise is stored before its settlement is known.') +
        table(['Controlled head probe', 'Observed'], [['Rejected promise, read again after rejection', `Same promise; ${data.core.rejectedCalls} factory call`], ['Synchronous throw, read twice', `${data.core.thrownCalls} factory calls`], ['Old pending promise after beginTurn', `Still resolves to “${data.core.oldStillResolves}”; the new entry remains`]]) +
        '<p>Base and head semantic probes both retain rejected definition/callee promises and repeat synchronous reference discovery failures. There is no settlement callback in the new cache, so the old promise has no path to write into the new map entry.</p>',
      evidence: source('pr-body', 'PR · preservation commitment') + source('head-scope', 'Exact factory return', '14-19') + source('head-scope-tests', 'Failures + late settlement', '53-91') + source('head-service-tests', 'Semantic failure characterization', '97-136'),
    },
    {
      id: 7, status: 'unexplained', title: 'Contain the scope',
      synopsis: 'The query service creates and contains a TurnScopedCacheScope. The architecture plan describes shared core bases extended by TypeScript; this cache extraction uses composition.',
      reason: 'No specific reason for this shape was found.',
      detail: mechanisms(['TypeScriptSemanticQueryService', 'private cacheScope<br>= new TurnScopedCacheScope()']) +
        '<p>The plan repeatedly describes core bases and TypeScript extension. This service implements PositionDefinitionResolver and contains the new cache owner. The PR’s diagrams show that containment, but its decision list does not explain choosing it over inheritance.</p>' +
        '<div class="reason-line">The record establishes the chosen structure and the plan’s language. It does not establish that one design is preferable or that the plan forbids composition.</div>',
      evidence: source('head-plan', 'Plan · core bases', '225-231') + source('head-service', 'Service contains scope', '27-30') + source('pr-body', 'PR · chosen shape'),
    },
    {
      id: 8, status: 'unexplained', title: 'Expose a manual scope',
      synopsis: 'Handles expose only getOrCreate. Explicit scope calls clear all stores. There is no timer, closed state or handle disposal: stores work before beginTurn and after release, and live with the scope.',
      reason: 'The public surface is listed; this exact API shape has no recorded reason.',
      detail: table(['Consumer surface', 'Operation'], [['<code>TurnScopedCache&lt;K,V&gt;</code>', '<code>getOrCreate(key, factory): V</code>'], ['<code>TurnScopedCacheScope</code>', '<code>createCache&lt;K,V&gt;()</code>'], ['Same scope', '<code>beginTurn(): void</code>'], ['Same scope', '<code>releaseTransientResources(): void</code>']]) +
        '<p>The private handle has clear; the exported handle interface does not. Each created handle is appended to the scope’s array. Both lifecycle methods call the same synchronous loop. The class neither detects a JavaScript event-loop turn nor prevents use before beginTurn or after release.</p>' +
        '<p>The generic probe uses a cache before its first beginTurn and after repeated release. Those operations work because release clears data without disposing the scope.</p>',
      evidence: source('pr-body', 'PR · public surface') + source('head-scope', 'Complete scope implementation', '1-46') + source('head-exports', 'Package export', '153'),
    },
    {
      id: 9, status: 'unexplained', title: 'Pass files, not the snapshot',
      synopsis: 'The exported service’s beginTurn parameter narrows from WorkspaceSnapshot to readonly WorkspaceFile[]. Backend passes snapshot.files. The service continues storing the supplied files reference.',
      reason: 'PR announces the signature change but supplies no reason for it.',
      detail: table(['Before', 'After'], [['<code>beginTurn(snapshot: WorkspaceSnapshot)</code>', '<code>beginTurn(files: readonly WorkspaceFile[])</code>'], ['<code>this.files = snapshot.files</code>', '<code>this.files = files</code>'], ['Backend passes <code>request.snapshot</code>', 'Backend passes <code>request.snapshot.files</code>']]) +
        '<p>The service already read only the files field. That is visible in source, but it is not a recorded author rationale for changing the exported signature. No copy of the list is introduced.</p>',
      evidence: source('pr-body', 'PR · announced signature') + source('base-service', 'Before · snapshot parameter', '49-52') + source('head-service', 'After · files parameter', '63-66') + source('head-backend', 'Caller adaptation', '83'),
    },
    {
      id: 10, status: 'unexplained', title: 'Reuse locations; project again',
      synopsis: 'Locations cache; reference promises/results and position node arrays are fresh on access. Position nodes are looked up again and can be the same node. This existing behavior stays. Backend async wrappers are a separate boundary.',
      reason: 'Preservation is requested; the specific reason for reprojecting locations is not given.',
      detail: mechanisms(['R: cached locations promise', 'findReferences awaits<br>then builds a new array'], 'The public async findReferences call also returns a fresh wrapper promise.') +
        mechanisms(['P: cached location array<br>including []', 'look up nodes again<br>build a new array'], 'Callee discovery also uses the position resolver; cached locations are not cached output arrays.') +
        '<p>Switch to the service-return lens: R and P lose their off-diagonal ink in both builds. This does not mean their caches stopped working. The return values differ while their underlying locations remain shared. The position characterization separately checks fresh arrays containing the same node.</p>' +
        '<div class="reason-line">These plates stop at the semantic service. TypeScriptBackend adds async wrappers of its own; the service’s promise-identity contract cannot be silently transferred to that outer boundary.</div>',
      evidence: source('base-service', 'Before · fresh projections', '75-98') + source('head-service', 'Reference projection', '82-105') + source('head-service', 'Position rehydration', '134-161') + source('head-service-tests', 'Array identity vs node identity', '82-94'),
    },
    {
      id: 11, status: 'stated', title: 'Characterize before extraction',
      synopsis: 'Six service tests and four core tests are added. The five existing service tests and their assertions remain. Commit order records characterization, scope specification, implementation and adoption.',
      reason: 'Contributor guide calls for informative tests before implementation.',
      detail: table(['Added service tests', 'Added core tests'], [['Independent same-turn identity promises', 'Exact values / undefined / isolated handles'], ['Empty positions + node rehydration', 'All-handle clear at turn and release'], ['Retained async failures', 'Rejected promises + synchronous throws'], ['Retried sync reference failures', 'Old settlement cannot replace new entry'], ['Failed refresh preserves entries', ''], ['Clear before pending / rejecting release', '']]) +
        '<p>The pre-existing tests still cover shared reference discovery, reset at refresh, position grouping, diamond paths and rebuilding released semantics. The diff adds imports and six tests before them; it deletes no existing assertion.</p>' +
        '<p>Focused execution is recorded separately from explanation: head’s two affected files run 15 tests, and the base service file runs 5. These are bounded checks, not a stack-wide CI claim.</p>',
      evidence: source('commits', 'Six commit messages') + source('head-guide', 'Contributor guide · TDD', '44-46') + source('head-service-tests', 'Service characterizations', '28-217') + source('head-scope-tests', 'Core characterizations') + source('diff', 'Full diff · test changes'),
    },
    {
      id: 12, status: 'unexplained', title: 'Reconcile the release promise',
      synopsis: 'The PR introduces awaited release; the larger spec promises unchanged lifecycle outcomes. A deferred/rejecting injected graph changes completion/error behavior; concrete TypeScript cleanup is synchronous here. No reconciliation is recorded.',
      reason: 'The local ordering rationale is stated. Its fit with global parity is not.',
      detail: table(['Architecture spec', 'PR and measured behavior'], [['Same inputs and daemon state → identical lifecycle outcome', 'Backend release now stays pending until project release settles'], ['Behavior defects changed separately', 'A project rejection now reaches the backend caller']]) +
        '<p>The release probe supplies a deferred project promise to the actual backend/service classes. Concrete TypeScript project cleanup returns void; the inherited ProjectGraph API returns a promise and supports awaiting asynchronous projects. The probe measures that library boundary, not daemon output or a real operational failure.</p>' +
        '<p>The source and PR agree about the await; neither explains how this boundary adjustment fits the broader parity commitment.</p>' +
        '<div class="reason-line">This is a missing design explanation for the human to assess. It is not a claim that the PR is incorrect or that an end-to-end daemon outcome necessarily changes.</div>',
      evidence: source('head-plan', 'Plan · parity commitment', '17-28') + source('pr-body', 'PR · awaited release') + source('base-backend', 'Before · release boundary', '87-89') + source('head-backend', 'After · release boundary', '87-89') + source('head-ts-project-graph', 'Concrete cleanup is synchronous', '78-84') + source('head-project-graph', 'Inherited promise boundary', '144-152'),
    },
  ];

  $('#decision-cards').innerHTML = decisions.map((decision) => `<a class="decision-card" id="card-${decision.id}" href="#detail-${decision.id}" data-detail="${decision.id}"><div class="card-top"><span class="number">${String(decision.id).padStart(2, '0')}</span><span class="status ${decision.status}">${decision.status}</span></div><h3>${decision.title}</h3><p>${decision.synopsis}</p><p class="reason">${decision.reason}</p><span class="corner" aria-hidden="true">↗</span></a>`).join('');
  $('#decision-details').innerHTML = decisions.map((decision) => `<details class="decision-detail" id="detail-${decision.id}"><summary><span class="number">${String(decision.id).padStart(2, '0')}</span><span class="detail-title">${decision.title}</span><span class="status ${decision.status}">${decision.status}</span></summary><div class="detail-body">${decision.detail}<div class="reason-line"><strong>${decision.status === 'stated' ? 'Recorded reason' : 'Rationale gap'}:</strong> ${decision.reason}</div><div class="evidence-row">${decision.evidence}</div><div class="return-row"><a href="#card-${decision.id}">↑ Back to this decision in the whole change</a>${decision.id < 12 ? `<a href="#detail-${decision.id + 1}" data-detail="${decision.id + 1}">Next decision →</a>` : '<a href="#provenance">Measurement method →</a>'}</div></div></details>`).join('');

  const pin = (status) => `<span class="pin ${status}" aria-hidden="true"></span>${status}`;
  $('#release-pins').innerHTML = `<table class="pin-table"><thead><tr><th scope="col">Backend release</th><th scope="col">Project pending</th><th scope="col">Then project rejects</th></tr></thead><tbody>${['base', 'head'].map((version) => `<tr><th scope="row">${version === 'base' ? 'Before' : 'After'}</th><td>${pin(data.versions[version].releaseFailure.whilePending)}</td><td>${pin(data.versions[version].releaseFailure.afterProjectSettlement)}</td></tr>`).join('')}</tbody></table><p class="pin-caption">Controlled asynchronous project release. Concrete TypeScript cleanup is synchronous here; the inherited graph API returns a promise.</p>`;
  $('#capture-stamp').textContent = `Captured ${data.capturedAt} · Base ${data.versions.base.commit} · Head ${data.versions.head.commit}`;

  let lens = 'cached';
  let selectedChannel = 'all';
  let selected = { row: 0, col: 2, version: 'head' };
  let currentAxes = [];
  const palette = ['#16776c', '#16776c', '#16776c', '#16776c', '#263c39', '#263c39', '#a05c2e', '#a05c2e'];
  const shortNames = { D: 'defs', R: 'ref loc', T: 'target', C: 'callers', E: 'callees', P: 'position' };
  for (const channel of data.channels) {
    $('#channel').insertAdjacentHTML('beforeend', `<option value="${channel.id}">${channel.id} · ${channel.name}</option>`);
  }

  function axes() {
    return data.channels.filter((channel) => selectedChannel === 'all' || selectedChannel === channel.id).flatMap((channel) => data.stages.map((stage, stageIndex) => ({ channel, stage, stageIndex })));
  }

  function valueAt(version, axis) {
    return data.versions[version].contact.records[axis.stageIndex][lens][axis.channel.id];
  }

  function renderPrint(version) {
    const n = currentAxes.length;
    const cell = 384 / n;
    const left = 80;
    const top = 36;
    let content = '<rect x="80" y="36" width="384" height="384" fill="#e5e9df"/>';
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        const same = valueAt(version, currentAxes[row]) === valueAt(version, currentAxes[col]);
        if (same) content += `<rect class="plate-cell" x="${left + col * cell + .45}" y="${top + row * cell + .45}" width="${cell - .9}" height="${cell - .9}" fill="${palette[currentAxes[row].stageIndex]}"/>`;
      }
    }
    if (n === 48) {
      data.channels.forEach((channel, index) => {
        const center = left + index * cell * 8 + cell * 4;
        content += `<text class="plate-label channel-label" x="${center}" y="22" text-anchor="middle">${channel.id}</text><text class="plate-label channel-label" x="68" y="${top + index * cell * 8 + cell * 4}" text-anchor="end">${channel.id}</text><text class="plate-label" x="${center}" y="440" text-anchor="middle">${shortNames[channel.id]}</text>`;
        if (index > 0) content += `<path d="M ${left + index * cell * 8} ${top} V 420 M 80 ${top + index * cell * 8} H 464" stroke="#fafaf4" stroke-width="3" fill="none"/>`;
      });
      content += '<text class="plate-label" x="272" y="460" text-anchor="middle">Each store: A1 A2 F1 F2 B1 B2 R1 R2</text>';
    } else {
      currentAxes.forEach((axis, index) => {
        content += `<text class="plate-label channel-label" x="${left + (index + .5) * cell}" y="23" text-anchor="middle">${axis.stage.id}</text><text class="plate-label channel-label" x="68" y="${top + (index + .5) * cell + 4}" text-anchor="end">${axis.stage.id}</text>`;
      });
      for (const divider of [4, 6]) content += `<path d="M ${left + divider * cell} 36 V 420 M 80 ${top + divider * cell} H 464" stroke="#fafaf4" stroke-width="3" fill="none"/>`;
      content += `<text class="plate-label" x="272" y="449" text-anchor="middle">${data.channels.find((channel) => channel.id === selectedChannel).name} · 8 reads × 8 reads</text>`;
    }
    content += '<rect class="plate-axis-guide row-guide"/><rect class="plate-axis-guide col-guide"/><rect class="plate-focus"/>';
    $(`#${version}-print`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 474" tabindex="0" role="img" aria-label="${version === 'base' ? 'Before' : 'After'} identity print. ${n} observations on each axis. Use arrow keys to choose a pair; details appear below the prints." data-version="${version}">${content}</svg>`;
    const svg = $(`#${version}-print svg`);
    svg.addEventListener('click', (event) => {
      const point = svg.createSVGPoint();
      point.x = event.clientX; point.y = event.clientY;
      const location = point.matrixTransform(svg.getScreenCTM().inverse());
      if (location.x < left || location.y < top || location.x >= 464 || location.y >= 420) return;
      selected = { row: Math.floor((location.y - top) / cell), col: Math.floor((location.x - left) / cell), version };
      updateSelection();
    });
    svg.addEventListener('keydown', (event) => {
      const movement = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[event.key];
      if (!movement) return;
      event.preventDefault();
      selected = { row: Math.max(0, Math.min(n - 1, selected.row + movement[0])), col: Math.max(0, Math.min(n - 1, selected.col + movement[1])), version };
      updateSelection();
    });
  }

  function updateSelection() {
    const n = currentAxes.length;
    const cell = 384 / n;
    const a = currentAxes[selected.row];
    const b = currentAxes[selected.col];
    const valueA = valueAt(selected.version, a);
    const valueB = valueAt(selected.version, b);
    const same = valueA === valueB;
    for (const version of ['base', 'head']) {
      const svg = $(`#${version}-print svg`);
      const attrs = (element, object) => Object.entries(object).forEach(([key, value]) => element.setAttribute(key, value));
      attrs($('.row-guide', svg), { x: 80, y: 36 + selected.row * cell, width: 384, height: cell });
      attrs($('.col-guide', svg), { x: 80 + selected.col * cell, y: 36, width: cell, height: 384 });
      attrs($('.plate-focus', svg), { x: 80 + selected.col * cell, y: 36 + selected.row * cell, width: cell, height: cell });
    }
    let explanation;
    if (a.channel.id !== b.channel.id) explanation = 'Different stores share no object in this sampled pair. Each store has its own key and value space.';
    else if (a.stageIndex === b.stageIndex) explanation = 'A read compared with itself. Diagonal pixels do not demonstrate reuse between separate accesses.';
    else if (lens === 'returned' && ['R', 'P'].includes(a.channel.id)) explanation = 'The service creates a fresh projection on each access while reusing the underlying cached locations.';
    else if (same && Math.max(a.stageIndex, b.stageIndex) < 4 && Math.min(a.stageIndex, b.stageIndex) < 2 && Math.max(a.stageIndex, b.stageIndex) >= 2) explanation = 'The failed refresh did not reach beginTurn. The previously cached entry survives.';
    else if (same && a.stageIndex >= 6 && b.stageIndex >= 6) explanation = 'Both reads reuse a fresh entry populated after synchronous clearing, while project release is pending.';
    else if (same) explanation = 'No clearing boundary separates these reads. The exact cached object is reused.';
    else explanation = 'A successful refresh or release call cleared this store between the two reads.';
    const readout = $('#pixel-readout');
    readout.classList.toggle('different', !same);
    const nameOf = (axis) => lens === 'returned' && axis.channel.id === 'R' ? 'Reference projection' : lens === 'returned' && axis.channel.id === 'P' ? 'Node projection' : axis.channel.name;
    readout.innerHTML = `<b>${selected.version === 'base' ? 'Before' : 'After'} · ${nameOf(a)} ${a.stage.id} × ${nameOf(b)} ${b.stage.id} → ${same ? 'same object' : 'different objects'}</b><span>${explanation} <code>${valueA}${same ? '' : ` ≠ ${valueB}`}</code></span>`;
  }

  function render() {
    currentAxes = axes();
    selected.row = Math.min(selected.row, currentAxes.length - 1);
    selected.col = Math.min(selected.col, currentAxes.length - 1);
    $('#lens-description').textContent = lens === 'cached'
      ? 'Stored objects: D definitions, R reference locations, T call target, C callers, E callees, P position definitions. Five promises and one location array. The empty regions between stores show separate identities.'
      : 'Public service returns: fresh promises for reference projections (R) and fresh node arrays for position projections (P). Their locations still cache. D/T/C/E return their cached promises. This lens stops inside the backend boundary.';
    renderPrint('base'); renderPrint('head'); updateSelection();
  }

  $$('[data-lens]').forEach((button) => button.addEventListener('click', () => {
    lens = button.dataset.lens;
    $$('[data-lens]').forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
    render();
  }));
  $('#channel').addEventListener('change', (event) => { selectedChannel = event.target.value; selected.row = 0; selected.col = 2; render(); });
  render();

  function openDetail(id) {
    const element = $(`#detail-${id}`);
    if (element) element.open = true;
  }
  document.addEventListener('click', (event) => {
    const detailLink = event.target.closest('[data-detail]');
    if (detailLink) openDetail(detailLink.dataset.detail);
    const sourceLink = event.target.closest('[data-source]');
    if (sourceLink) openSource(sourceLink.dataset.source, sourceLink.dataset.lines);
  });
  const openHash = () => {
    const match = location.hash.match(/^#detail-(\d+)$/);
    if (match) openDetail(match[1]);
  };
  window.addEventListener('hashchange', openHash);
  openHash();
  $('#expand-all').addEventListener('click', (event) => {
    const expand = event.target.getAttribute('aria-expanded') !== 'true';
    $$('.decision-detail').forEach((detail) => { detail.open = expand; });
    event.target.setAttribute('aria-expanded', String(expand));
    event.target.textContent = expand ? 'Close all details' : 'Open all details';
  });

  const dialog = $('#source-dialog');
  function openSource(id, lines = '') {
    const record = sources[id];
    if (!record) throw new Error(`Source missing: ${id}`);
    const [start, end = start] = lines ? lines.split('-').map(Number) : [0, 0];
    $('#source-version').textContent = `${record.version} · frozen evidence`;
    $('#source-title').textContent = record.path;
    $('#source-meta').textContent = [record.commit && `Commit ${record.commit}`, record.sha256 && `SHA-256 ${record.sha256}`].filter(Boolean).join(' · ');
    $('#source-code').innerHTML = record.content.split('\n').map((line, index) => `<span class="source-line ${index + 1 >= start && index + 1 <= end ? 'highlight' : ''}" id="source-line-${index + 1}"><span class="line-number">${index + 1}</span><code>${escape(line)}</code></span>`).join('');
    dialog.showModal();
    $('#close-source').focus();
    requestAnimationFrame(() => {
      if (start) $(`#source-line-${start}`).scrollIntoView({ block: 'center', behavior: 'instant' });
      else dialog.scrollTop = 0;
    });
  }
  $('#close-source').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
})();
