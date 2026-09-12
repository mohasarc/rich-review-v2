'use strict';
const R = window.REVIEW;
const P = window.PROBE;
const main = document.querySelector('main');
const dialog = document.querySelector('#detail');
const byId = new Map(R.decisions.map(d => [d.id, d]));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean = value => esc(value).replace(/`([^`]+)`/g, '<code>$1</code>');
const status = d => `<span class="status ${d.status}">${d.status}</span>`;
const evidence = (doc, line = 1, label) => `<a href="source.html?doc=${encodeURIComponent(doc)}#L${line}" target="_blank" rel="noopener">${esc(label || R.sources[doc]?.title || doc)} ↗</a>`;
const decisionButton = d => `<button class="decision-button" data-decision="${d.id}"><span class="caption"><span class="decision-id">${d.id}</span>${esc(d.title)}</span>${status(d)}</button>`;
const extraCard = d => `<article class="extra-card" data-search="${esc((d.title+' '+d.statement+' '+d.status+' '+(d.pr||'')).toLowerCase())}"><button data-decision="${d.id}"><h3>${esc(d.title)}</h3>${status(d)}</button><p>${clean(d.statement)}</p><div class="decision-id">${d.id} ${d.pr ? '· #'+d.pr : ''} · reason & evidence ↗</div></article>`;
const sectionHead = (n,title,description,extra='') => `<div class="section-head"><div><span class="section-no">${n}</span><h2>${title}</h2>${description ? `<p>${description}</p>`:''}</div>${extra}</div>`;
let subject = '';
let mapView = 'packages';
let traceStep = 0;
let detailId;
let detailOrigin;

function packageBox(title, tokens, band, kind='', note='') {
  return `<button class="package ${kind}" data-jump="${band}"><span class="package-title">${title}${note?`<em>${note}</em>`:''}</span><span class="package-content">${tokens.map(t=>`<span class="token">${t}</span>`).join('')}</span></button>`;
}

function packageMap() {
  return `<div class="diptych">
    <article class="panel"><div class="panel-label">Before <span class="version">main · ${R.base.slice(0,7)}</span></div>
      ${packageBox('apps/cli', ['argv & printing','request scopes','daemon dispatcher','WorkspaceDaemon','LocalDaemonTransport','registry / workers / limits','lifecycle formatting'], 'host','old-owner','many owners in one app')}
      <div class="diagram-connector">↓ imports libraries</div>
      ${packageBox('backend-typescript',['TypeScript extraction & queries','source byte cache','revision / declaration indexes','project membership graph','six semantic maps'],'memory','old-owner')}
      <div class="stacked-packages">
        ${packageBox('core',['workspace / catalog','backend router','symbol representation'],'memory')}
        ${packageBox('renderer',['navigation text / JSON'],'authority')}
      </div>
      ${packageBox('telemetry',['events & storage','shared state-dir resolution'],'policy','old-owner')}
    </article>
    <article class="panel"><div class="panel-label">After <span class="version">#149 · ${R.head.slice(0,7)}</span></div>
      ${packageBox('apps/cli',['argv classification','environment & state path','host executor module','composition & printing'],'host','cli-owner','host')}
      <div class="diagram-connector">↓ public APIs · executor module URL → worker</div>
      ${packageBox('@symnav/daemon',['DaemonClient / routing','registry / launch / clock','policy / vocabularies','transport owners','execution / delivery','worker generations / activity'],'host','new-owner','no internal package dependency')}
      ${packageBox('@symnav/core',['WorkspaceSession','source byte cache','revisioned publication','project graph','TurnScopedCacheScope','router / symbols'],'memory','new-owner','no daemon or process concepts')}
      <div class="stacked-packages">
        ${packageBox('backend-typescript',['syntax / tsconfig / programs','semantic algorithms'],'memory','cli-owner')}
        ${packageBox('renderer',['navigation output','daemon lifecycle output'],'authority','new-owner')}
      </div>
      ${packageBox('telemetry',['events & storage','receives resolved path'],'policy')}
    </article>
  </div><div class="diagram-key"><span><i class="swatch old"></i> responsibility leaves this owner</span><span><i class="swatch new"></i> responsibility arrives here</span><span>Package inventory; arrows above show selected interactions.</span></div>
  <div class="boundary-callout">A package boundary is not a process boundary. The daemon package has no internal package imports; its worker loads a host-supplied executor module that uses core and TypeScript.</div>`;
}

function runtimeMap() {
  function side(after) {
    return `<article class="panel"><div class="panel-label">${after?'After #149':'Before main'} <span class="version">runtime topology</span></div>
      <div class="runtime-client"><b>Caller process</b><div class="runtime-row"><button data-jump="host">CLI argv</button> → <button data-jump="host">${after?'DaemonClient':'CLI dispatcher'}</button> → ordered output</div></div>
      <div class="diagram-connector">request / accepted / output / acknowledgement<br>↕ local socket</div>
      <div class="process"><h3>Daemon process</h3>
        <div class="runtime-row"><button data-jump="transport">${after?'socket server + codec':'LocalDaemonTransport'}</button> → <button data-jump="execution">${after?'ProcessCoordinator':'WorkspaceDaemon'}</button></div>
        <div class="runtime-row" style="margin-top:9px"><button data-jump="execution">${after?'execution session':'embedded execution'}</button><button data-jump="execution">${after?'delivery session':'embedded delivery'}</button><button data-jump="execution">${after?'generation manager':'embedded worker state'}</button></div>
        <div class="diagram-connector">↕ worker messages / chunks / resource samples</div>
        <div class="thread"><h4>Worker thread — retained across requests</h4>
          <div class="runtime-row"><button data-jump="authority">${after?'Load injected executor URL':'Construct CLI executor directly'}</button></div>
          <div class="diagram-connector">↓ same command program</div>
          <div class="runtime-row"><button data-jump="memory">${after?'core WorkspaceSession':'CLI retained program / scopes'}</button> → <button data-jump="memory">TypeScript backend</button></div>
          <div class="runtime-row" style="margin-top:9px"><button data-decision="p-release">${after?'core scope clears six caches':'service manually clears six maps'}</button></div>
        </div>
      </div>
    </article>`;
  }
  return `<div class="diptych">${side(false)}${side(true)}</div><div class="boundary-callout">The process and thread arrangement remains. Ownership changes inside it: accepted identity belongs to the ledger, bytes to the spool, delivery to a session, worker lifecycle to a manager, and reusable workspace retention to core.</div><span class="lossy">Selected warm request path; election, cold routing, errors and control paths are omitted here and remain on the decision sheet.</span>`;
}

function renderStack() {
  const authored = R.decisions.filter(d=>d.id.startsWith('d')).length;
  const additions = R.decisions.length-authored;
  main.innerHTML = `<section class="intro" id="orientation">
    <div><div class="eyebrow">symnav · main → #149 · one architecture delta</div><h1>Who owns<br>what survives?</h1><p class="lead">Daemon machinery leaves the CLI. Reusable workspace retention leaves TypeScript. The new boundaries separate <strong>a process, an accepted request, a delivery, and a semantic turn.</strong></p></div>
    <div class="scope-note"><strong>26 PRs · 254 changed files</strong>+27,533 / −8,698 lines in the supplied delta.<br><br>${authored} authored decisions + ${additions} additional recovered choices. 44 policy records. Five deliberately absent deadlines.<br><br><code>${R.base.slice(0,7)} → ${R.head.slice(0,7)}</code></div>
  </section>
  <div class="intuition"><div class="intuition-drawing" aria-hidden="true"><div class="workshop"><i></i><i></i><i></i><i></i><i></i><i></i></div><span>＋</span><div class="scratchpad"><i></i><i></i><i></i></div></div><div><p>Keep the workshop. Clear its scratch paper at the right boundary.</p><span class="lossy">Lossy analogy: tools = retained workspace objects; scratch paper = semantic memoization. Release clears caches without closing the session or cancelling existing callers.</span></div></div>
  <section class="section" id="map">${sectionHead('01 / locate the owners','The boundary moves; the work still has a path.','Choose a box to reach its complete decision group.',`<div class="view-switch" aria-label="Diagram lens"><button data-map="packages" aria-pressed="${mapView==='packages'}">Packages</button><button data-map="runtime" aria-pressed="${mapView==='runtime'}">Processes & lifetimes</button></div>`)}<div id="architecture-map">${mapView==='packages'?packageMap():runtimeMap()}</div></section>
  <div class="attention-strip"><h3>The seams to carry<br>with the picture</h3><div><p>The spec asks for unchanged behavior. The visible decision surface also includes an awaited release change, protocol generation 5, relative control-path normalization, removed CLI test scenarios, relaxed test budgets, and a PR-template edit.</p><div class="attention-links"><button data-decision="p-release">#127: release now waits ↗</button><button data-decision="x-test-lost-stop">Built CLI test boundaries ↗</button><button data-decision="x-cwd">Relative --cwd ↗</button><button data-decision="x-template">Unrequested template change ↗</button></div></div></div>
  <section class="section" id="contracts">${sectionHead('02 / hold the shape','Six ownership questions','The map’s six entrances. The decision sheet below is the complete top layer of recovered choices.')}
    <div class="cards">${R.bands.map((b,i)=>`<a class="contract-card" href="#stack/${b.id}"><div class="eyebrow">0${i+1} · ${b.prs.length} PRs</div><h3>${b.title}</h3><div class="move"><span>${b.old}</span><strong>↓ ${b.new}</strong></div><p>${b.summary}</p><div class="pr-list">${b.prs.map(n=>'#'+n).join(' · ')} ↗</div></a>`).join('')}</div>
  </section>
  <section class="section" id="sheet">${sectionHead('03 / see the choices','The decision sheet','Every row is an entrance. Reasons and evidence are attached to the same decision ID.')}
    <div class="sheet-intro"><div><p><strong>Stated</strong> means a reason is in a PR, commit or inspected plan. <strong>Unexplained</strong> means no reason was found there. Neither is a correctness verdict. Early PR choices are marked in their historical order; #149’s final API closures are visible under “Close the package boundary.”</p><div class="sheet-legend"><span>${authored} PR decisions</span><span>${additions} additional choices</span></div></div><label class="search">Find a choice, PR or missing reason<input type="search" id="decision-search" placeholder="e.g. 127, retry, unexplained" autocomplete="off"></label></div>
    <div id="search-status" class="search-status" aria-live="polite"></div><div id="decision-sheet">${renderBands()}</div>
  </section>
  <section class="section" id="edges">${sectionHead('04 / keep the awkward parts','Test changes and work outside the main boundary','These decisions have the same status, space and evidence access as architectural choices.')}<div class="extras-grid">${R.decisions.filter(d=>d.band==='edges').map(extraCard).join('')}</div><p class="footnote">The title audit is a search aid, not coverage accounting: it misses parameterized titles and cannot establish equivalent assertions. Removed composed tests are distinguished from their surviving lower-level counterparts.</p><div class="evidence-links"><a href="evidence/test-title-audit.json">Inspect unmatched-title search ↗</a>${evidence('architecture-spec',1,'Read the unchanged-behavior contract')}</div></section>
  <section class="section" id="numbers">${sectionHead('05 / keep the defaults visible','One policy, with its actual values','These values are decisions too. All are stated in the local policy record; open a reason to inspect the exact row.')}
    <div class="table-wrap"><table class="policy-table"><thead><tr><th scope="col">Policy / recipe</th><th scope="col">Value retained</th><th scope="col">Why / source</th></tr></thead><tbody>${R.policy.map(p=>`<tr><td>${esc(p.path)}</td><td>${esc(p.value)}</td><td><button data-policy="${p.id}"><span class="status">stated</span> ${esc(p.reason)} ↗</button></td></tr>`).join('')}</tbody></table></div>
    <h3 style="margin-top:26px">Five places with no deadline</h3><div class="absence-grid">${R.absences.map(a=>`<div class="absence"><span class="status">stated</span><strong>No timer</strong>${esc(a.name)}<p>${esc(a.reason)}</p></div>`).join('')}</div>
    <p class="footnote">Policy snapshots travel whole; internal process/worker serialization is not a public host API at #149. The facade can derive system policy; production consumers receive required policy slices. These are code policies, with no user flag or configuration knob for thresholds.</p>
  </section>
  <section class="section" id="zoom"><a class="read-also" href="#pr127"><div><strong>Put one boundary under the microscope.</strong><span>#127 · six caches · one actual before/after release trace</span></div><span aria-hidden="true" style="font-size:30px;color:var(--green)">→</span></a></section>
  <section class="section" id="evidence">${sectionHead('06 / inspect the grounding','What this page actually observed','Code and source history ground the map. This experiment does not certify the stack.')}<p class="footnote">Read all 26 PR bodies and commit messages, both supplied deltas programmatically, the architecture/policy/follow-up plans, and selected final and intermediate source and test files. The precomputed overview files contain path headings but no useful symbol output. #127’s two focused suites passed 15 tests; the stack’s claimed suite totals remain author reports. No full-stack behavioral parity run was performed here.</p><div class="evidence-links"><a href="source.html">${Object.keys(R.sources).length} local evidence documents ↗</a><a href="evidence/probe.json">Captured #127 observations ↗</a><a href="evidence/focused-tests.txt">Focused test run ↗</a><a href="README.md">Method, limits, abandoned approaches ↗</a></div></section>`;
}

function renderBands() {
  return R.bands.map((b,i)=>`<section class="band" id="band-${b.id}"><div class="band-header"><span>0${i+1}</span><h3>${b.title}</h3><span>${b.prs.map(n=>'#'+n).join(' ')}</span></div><div class="pr-grid">${R.prs.filter(p=>p.band===b.id).map(pr=>`<article class="pr-card" data-pr-card="${pr.number}"><div class="pr-heading"><a class="pr-number" href="source.html?doc=pr-${pr.number}" target="_blank" rel="noopener">#${pr.number} ↗</a><h3>${esc(pr.title)}</h3></div><div class="decision-list">${pr.ids.map(id=>decisionButton(byId.get(id))).join('')}</div></article>`).join('')}</div><div class="extras-grid">${R.decisions.filter(d=>d.band===b.id&&!d.id.startsWith('d')).map(extraCard).join('')}</div></section>`).join('');
}

function cacheMap() {
  return `<div class="diptych">
    <article class="panel"><div class="panel-label">Before #127 <span class="version">${P.versions[0].commit.slice(0,7)}</span></div>
      <div class="package cli-owner"><span class="package-title">backend-typescript / TypeScriptBackend</span><div class="token">await state.refresh → beginTurn(snapshot)</div><div class="diagram-connector">↓</div><button class="package old-owner" data-decision="d127-1"><span class="package-title">TypeScriptSemanticQueryService</span><span class="package-content"><span class="token">six query algorithms</span><span class="token">six Maps</span><span class="token">manual clear sequence</span></span></button><div class="diagram-connector">starts project release; promise not awaited</div></div>
      <div class="package"><span class="package-title">core</span><span class="package-content"><span class="token">workspace and backend contracts</span></span></div>
    </article>
    <article class="panel"><div class="panel-label">After #127 <span class="version">${P.versions[1].commit.slice(0,7)}</span></div>
      <div class="package cli-owner"><span class="package-title">backend-typescript / TypeScriptBackend</span><div class="token">await state.refresh → beginTurn(snapshot.files)</div><div class="diagram-connector">↓</div><button class="package" data-decision="p-position"><span class="package-title">TypeScriptSemanticQueryService</span><span class="package-content"><span class="token">same six query algorithms</span><span class="token">same keys / values</span><span class="token">instantiates a core scope</span></span></button><div class="diagram-connector">awaits project release; backend awaits service</div></div>
      <button class="package new-owner" data-decision="d127-1"><span class="package-title">core / TurnScopedCacheScope</span><span class="package-content"><span class="token">six isolated typed handles</span><span class="token">beginTurn() clears all</span><span class="token">release() clears all</span></span></button>
    </article>
  </div><div class="diagram-key"><span><i class="swatch old"></i> lifetime mechanics leave TypeScript</span><span><i class="swatch new"></i> generic lifetime mechanics arrive in core</span></div><p class="footnote">These are package boundaries, not separate processes. Each TypeScript query service creates its own core scope; the caches are not shared between services.</p>`;
}

function renderSmall() {
  main.innerHTML = `<section class="intro" id="orientation"><div><div class="eyebrow">#127 · layer 4 of 26 · six files</div><h1>Six caches.<br>One clearing boundary.</h1><p class="lead">Core supplies reusable cache lifetime. TypeScript keeps the algorithms and six independent key spaces. A successful refresh starts the next turn; release clears entries immediately <strong>and now waits for project cleanup.</strong></p></div><div class="scope-note"><strong>What changes beyond the move</strong>Backend release used to fulfill while project cleanup was pending. It now waits and receives the cleanup failure.<br><br>6 files · +391 / −67<br>10 decisions on this sheet.</div></section>
  <div class="intuition"><div class="intuition-drawing" aria-hidden="true"><div class="workshop"><i></i><i></i><i></i><i></i><i></i><i></i></div><span>↺</span><div class="scratchpad"><i></i><i></i><i></i></div></div><div><p>A fresh sheet, not a new workshop.</p><span class="lossy">Lossy analogy: clearing removes memoized entries, not retained workspace objects, running work or values already handed to callers. A lookup can refill a cache even while release is pending.</span></div></div>
  <section class="section" id="small-map">${sectionHead('01 / locate the owners','The clearing code crosses a package boundary.','The service still owns a scope instance. It no longer implements six independent clearing calls.')}${cacheMap()}</section>
  <section class="section" id="small-sheet">${sectionHead('02 / carry all the decisions','The complete #127 decision surface','Four authored choices, six additional contracts or choices. The rest of this page adds fidelity to these same IDs.')}
    <div class="micro-grid">${R.pr127Ids.map(id=>extraCard(byId.get(id))).join('')}</div>
  </section>
  <section class="section" id="trace">${sectionHead('03 / watch the boundary','One run, on both versions','Step through the recorded trace. A / B / C identify returned array objects; they are not source revisions.')}
    <div class="trace-surface"><div class="trace-heading"><span class="evidence-tag">RECORDED EXECUTION</span><p>Actual compiled TypeScriptBackend and semantic query service, with an injected workspace-state double and a manually held project-cleanup promise. This page replays saved JSON; it does not run a daemon. Only the definition cache is exercised in this trace.</p></div><div class="timeline" aria-label="Recorded events">${P.versions[0].events.map((e,i)=>`<button data-step="${i}" aria-current="${i===traceStep?'step':'false'}"><b>${String(i+1).padStart(2,'0')}</b>${esc(e.name)}</button>`).join('')}</div><label class="eyebrow" for="trace-position">Recorded event</label><input class="range" type="range" id="trace-position" min="0" max="8" step="1" value="${traceStep}"><div class="trace-controls"><button id="previous-step">← Previous</button><strong id="trace-event"></strong><button id="next-step">Next →</button></div><div class="trace-pair" id="trace-pair"></div><div class="trace-observation" id="trace-observation" aria-live="polite"></div><p class="trace-note">The five muted cache cells are outside this trace. New tests and source preserve their contracts; they are not measurements from this probe.</p></div>
    <div class="evidence-links" style="margin-top:15px"><a href="evidence/probe.json">Raw observation record ↗</a><a href="probe.mjs">Reproducible probe source ↗</a><a href="evidence/focused-tests.txt">15 focused tests passed ↗</a></div>
  </section>
  <section class="section" id="mechanism">${sectionHead('04 / open the handle','One generic operation; TypeScript chooses the meaning.','d127-1, d127-2, p-identity and p-position at code-level fidelity.')}
    <div class="cache-mechanism"><div><div class="step-path"><button class="step-node" data-decision="d127-2"><strong>Key present?</strong><small>Map.has includes undefined</small></button><span>→</span><button class="step-node" data-decision="p-identity"><strong>Return stored object</strong><small>No promise wrapper or clone</small></button></div><div class="step-path" style="margin-top:12px"><button class="step-node" data-decision="p-identity"><strong>Otherwise run factory</strong><small>A throw exits before insertion</small></button><span>→</span><button class="step-node" data-decision="p-identity"><strong>Store its exact return</strong><small>Promise rejection is still a value</small></button></div></div><div class="code-strip">if (values.has(key))
  return values.get(key);
const value = createValue();
<span class="lit">values.set(key, value);</span>
return value;<br><span style="font-size:10px;color:#b3c5c4">Source excerpt, type cast and this. omitted.</span></div></div>
    <div class="cache-inventory">${[['Definitions','identity → promise of declarations'],['Reference locations','identity → promise of locations'],['Call targets','identity → promise of resolution'],['Callers','identity → promise of call edges'],['Callees','identity → promise of call edges'],['Position definitions','path:offset → location array']].map(([name,desc])=>`<button class="cache-item" data-decision="p-position"><b>${name}</b><span>${desc}</span></button>`).join('')}</div>
    <div class="boundary-callout">Five handles store promises; one stores location arrays. “References” shares reference discovery with callers; it does not promise the same public projection-array identity. Position lookup rehydrates node arrays on every access.</div>
  </section>
  <section class="section" id="observation-table">${sectionHead('05 / compare the same contracts','What the probes preserve, and what they separate','p-identity, d127-3, d127-4 and p-release at observed-behavior fidelity.')}<div class="table-wrap"><table class="policy-table"><thead><tr><th>Observation</th><th>Before</th><th>After</th></tr></thead><tbody><tr><td>Repeated definition result</td><td>Same object</td><td>Same object</td></tr><tr><td>Failed refresh</td><td>Previous cached object remains</td><td>Previous cached object remains</td></tr><tr><td>Project cleanup pending</td><td>Cache cleared; backend release fulfilled</td><td>Cache cleared; backend release pending</td></tr><tr><td>Project cleanup rejects</td><td>Backend release already fulfilled</td><td>Backend release rejects</td></tr><tr><td>Rejected definition promise</td><td>Same promise; 1 factory call</td><td>Same promise; 1 factory call</td></tr><tr><td>Synchronous reference failure, twice</td><td>2 discovery attempts</td><td>2 discovery attempts</td></tr></tbody></table></div><p class="footnote">The separate head-only core probe also observed one factory call for cached undefined, isolated equal keys across handles, and old-promise settlement leaving the new-turn entry intact. It is not a comparison against a pre-existing core implementation; the base had none.</p></section>
  <section class="section" id="small-evidence">${sectionHead('06 / return or inspect','This small boundary is part of a larger ownership move.','The stack keeps sessions alive while worker, execution and delivery owners manage different lifetimes.')}
    <a class="read-also" href="#stack/memory"><div><strong>Back to the stack’s retention boundary.</strong><span>Transactions, project graph, source cache and workspace sessions</span></div><span aria-hidden="true" style="font-size:30px">↗</span></a><div class="evidence-links" style="margin-top:16px">${evidence('pr-127',1,'PR body & commits')}${evidence('scope-head',1,'All 46 lines of the scope')}${evidence('queries-head',1,'TypeScript service')}${evidence('backend-head',79,'Backend refresh / release')}<a href="evidence/pr-127.patch">Complete six-file diff ↗</a></div>
  </section>`;
  updateTrace();
}

function updateTrace() {
  if(subject!=='pr127') return;
  document.querySelector('#trace-event').textContent=P.versions[0].events[traceStep].name;
  document.querySelector('#trace-position').value=traceStep;
  document.querySelector('#trace-position').setAttribute('aria-valuetext',P.versions[0].events[traceStep].name);
  document.querySelector('#previous-step').disabled=traceStep===0;
  document.querySelector('#next-step').disabled=traceStep===8;
  document.querySelectorAll('[data-step]').forEach(el=>el.setAttribute('aria-current',Number(el.dataset.step)===traceStep?'step':'false'));
  document.querySelector('#trace-pair').innerHTML=P.versions.map((v,i)=>{
    const e=v.events[traceStep];
    return `<div class="trace-machine"><h3>${i?'After #127':'Before #127'}<span class="quiet">${v.commit.slice(0,7)}</span></h3><div class="eyebrow">Definition cache / returned object</div><div class="cache-bank"><div class="cache-cell">${e.identity==='empty'?'∅':e.identity}<small>definitions</small></div>${['refs','target','callers','callees','position'].map(n=>`<div class="cache-cell"><small>${n}<br>unprobed</small></div>`).join('')}</div><div class="trace-fact"><span>Definition searches so far</span><strong>${e.searches}</strong></div><div class="trace-fact"><span>Backend release promise</span><strong class="${e.releaseState}">${e.releaseState}</strong></div></div>`;
  }).join('');
  const captions=[
    'Refresh succeeded. The service has a file list and empty semantic caches. In both versions this happens after state refresh, not at entry.',
    'The first definition query performs one search and stores the result object A.',
    'The same query reuses A. There is still only one definition search.',
    'Refresh rejects before beginTurn. The previous successful turn’s A remains available.',
    'Both versions clear the definition cache immediately. Base already reports backend release fulfilled; head waits for the held project cleanup.',
    'A query during held cleanup creates B in both versions. Clearing is not a closed-state guard and does not prohibit new lookups.',
    'The cleanup promise rejects. Base backend release stays fulfilled. Head backend release rejects with that failure.',
    'A later successful refresh clears B. It does not recreate the service or its handles.',
    'The next query creates C. Cache lifetime changed owner; successful-turn invalidation remains the same.'
  ];
  const ids=['d127-4','p-identity','p-identity','d127-4','p-release','p-handles','p-release','d127-4','d127-1'];
  document.querySelector('#trace-observation').innerHTML=esc(captions[traceStep])+` <button data-decision="${ids[traceStep]}">Open this decision ↗</button>`;
}

function showDecision(id, keepOrigin=false) {
  const d=byId.get(id);
  if(!d) return;
  if(!keepOrigin) detailOrigin=document.activeElement;
  detailId=id;
  document.querySelector('#detail-context').textContent=`${subject==='pr127'?'#127':'Stack'} / ${d.pr?'PR #'+d.pr:'additional choice'} / ${d.id}`;
  document.querySelector('#detail-content').innerHTML=`<div class="detail-id">${status(d)} <span>${d.id}</span></div><h2 id="detail-title">${esc(d.title)}</h2><p>${clean(d.statement)}</p><div class="detail-reason ${d.status}"><div class="eyebrow">${d.status==='stated'?'Recorded reason':'Reason not found / scope of the search'}</div><p>${clean(d.reason)}</p></div><div class="eyebrow">Source trail</div>${d.evidence.map(e=>`<a class="source-item" href="source.html?doc=${e.doc}#L${e.line}" target="_blank" rel="noopener"><span>${esc(R.sources[e.doc].title)}:${e.line} ↗</span><small>${esc(R.sources[e.doc].version)}</small></a>`).join('')}<p class="footnote">${esc(d.sourceNote)}</p><div class="detail-navigation"><button data-detail-direction="-1">← Previous choice</button><button data-detail-direction="1">Next choice →</button></div>`;
  if(!dialog.open) dialog.showModal();
  dialog.scrollTop=0;
}

function showPolicy(id) {
  const p=R.policy.find(p=>p.id===id);
  if(!p)return;
  detailOrigin=document.activeElement;
  detailId=undefined;
  document.querySelector('#detail-context').textContent='Stack / policy record / '+p.id;
  document.querySelector('#detail-content').innerHTML=`<div class="detail-id"><span class="status">stated</span><span>${p.id}</span></div><h2 id="detail-title">${esc(p.path)}</h2><p><strong>${esc(p.value)}</strong></p><p>${esc(p.owner)}</p><div class="detail-reason"><div class="eyebrow">Recorded reason</div><p>${esc(p.reason)}</p></div><p class="footnote">The policy record names “${esc(p.oracle)}” as its behavior oracle. This is an author-provided association; this experiment did not execute that oracle.</p><a class="source-item" href="source.html?doc=policy-record#L${p.line}" target="_blank" rel="noopener"><span>plans/005/daemon-policy.md:${p.line} ↗</span></a>`;
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop=0;
}

function filterDecisions(term) {
  const q=term.toLowerCase().trim();
  let shown=0;
  document.querySelectorAll('#decision-sheet .decision-button').forEach(el=>{
    const d=byId.get(el.dataset.decision);
    const hit=!q||`${d.id} ${d.pr} ${d.title} ${d.reason} ${d.statement} ${d.status}`.toLowerCase().includes(q);
    el.hidden=!hit;
    if(hit)shown++;
  });
  document.querySelectorAll('[data-pr-card]').forEach(el=>{el.hidden=![...el.querySelectorAll('.decision-button')].some(b=>!b.hidden)});
  document.querySelectorAll('#decision-sheet .extra-card, #edges .extra-card').forEach(el=>{
    const hit=!q||el.dataset.search.includes(q);
    el.hidden=!hit;
    if(hit)shown++;
  });
  document.querySelectorAll('#decision-sheet .band').forEach(el=>{el.hidden=![...el.querySelectorAll('.pr-card,.extra-card')].some(b=>!b.hidden)});
  document.querySelector('#search-status').textContent=q?`${shown} matching decisions across the sheet and auxiliary changes.`:'';
}

function updateRoute() {
  const items=subject==='pr127'?[['orientation','At a glance'],['small-map','Package boundary'],['small-sheet','All 10 choices'],['trace','Recorded run'],['mechanism','Cache mechanism'],['observation-table','Observed contracts'],['small-evidence','Back to the stack']]:[['orientation','At a glance'],['map','Boundary maps'],['contracts','Six entrances'],['sheet','Decision sheet'],['edges','Tests & extra work'],['numbers','Policy values'],['zoom','Inside #127'],['evidence','Evidence & limits']];
  document.querySelector('#route').innerHTML=items.map(([id,label],i)=>`<a href="#${subject}/${id}"><span>${String(i+1).padStart(2,'0')}</span>${label}</a>`).join('');
  document.querySelectorAll('[data-subject]').forEach(el=>{
    if(el.dataset.subject===subject)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');
  });
}

function route() {
  const [view,place]=location.hash.slice(1).split('/');
  const next=view==='pr127'?'pr127':'stack';
  const changed=next!==subject;
  if(changed){
    if(dialog.open)dialog.close();
    subject=next;
    subject==='stack'?renderStack():renderSmall();
    updateRoute();
    document.title=(subject==='stack'?'Who owns what survives?':'Six caches. One clearing boundary.')+' — symnav boundary atlas';
  }
  if(place){
    const target=document.getElementById(place)||document.getElementById('band-'+place);
    if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }else if(changed){window.scrollTo({top:0,behavior:'instant'});}
}

document.addEventListener('click',event=>{
  const decision=event.target.closest('[data-decision]');
  if(decision){showDecision(decision.dataset.decision);return;}
  const policy=event.target.closest('[data-policy]');
  if(policy){showPolicy(policy.dataset.policy);return;}
  const map=event.target.closest('[data-map]');
  if(map){mapView=map.dataset.map;document.querySelector('#architecture-map').innerHTML=mapView==='packages'?packageMap():runtimeMap();document.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.map===mapView));return;}
  const jump=event.target.closest('[data-jump]');
  if(jump){location.hash='stack/'+jump.dataset.jump;return;}
  const step=event.target.closest('[data-step]');
  if(step){traceStep=Number(step.dataset.step);updateTrace();return;}
  if(event.target.closest('#previous-step')){traceStep=Math.max(0,traceStep-1);updateTrace();return;}
  if(event.target.closest('#next-step')){traceStep=Math.min(8,traceStep+1);updateTrace();return;}
  const direction=event.target.closest('[data-detail-direction]');
  if(direction&&detailId){const ids=subject==='pr127'?R.pr127Ids:R.decisions.map(d=>d.id);const pos=ids.indexOf(detailId);showDecision(ids[(pos+Number(direction.dataset.detailDirection)+ids.length)%ids.length],true);}
});
document.addEventListener('input',event=>{
  if(event.target.id==='trace-position'){traceStep=Number(event.target.value);updateTrace();}
  if(event.target.id==='decision-search')filterDecisions(event.target.value);
});
dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{if(detailOrigin?.isConnected)detailOrigin.focus({preventScroll:true})});
window.addEventListener('hashchange',route);
route();
