'use strict';
document.documentElement.classList.add('js');
const data = window.SYNTH;
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cacheByName = new Map(data.caches.map(c => [c.name, c]));
const requestNotes = [
  ['One source, five related semantic questions.', 'The fresh backend has no semantic entries. The supplied identity is target in src/app.ts.'],
  ['Refresh has succeeded; the turn can begin.', 'Both revisions hand over the file list and clear the stores after successful refresh. There are no query entries yet.'],
  ['Finding the call target also finds its definition.', 'Two separate promises now occupy the definition and target stores. Only one definition search ran.'],
  ['The explicit definition question reuses the work.', 'The direct service returns P1 again; no second definition search runs. The backend wrapper is outside this promise-identity claim.'],
  ['Callers need reference locations first.', 'Reference discovery fills P3; caller edges get their own promise P4. Independent stores still share query work.'],
  ['Outgoing calls fill the last two stores.', 'The callee promise and one position-location array are now cached. Target calls helper at source offset 67.'],
  ['References reuse discovery already done for callers.', 'The internal reference-location promise is P3 again. One reference search has served both questions in both revisions.'],
  ['The request has answers; the entries remain.', 'All six stores are populated in this fixture. Returning the request is not itself a clearing signal.']
];
let requestStep = 6;
let scenario = 'release-reject';
let labStep = data.lab[scenario].head.steps.findIndex(s => s.id === 'boundary');
let dialogOrigin;
const returnTrail = [];
let nextOrigin = 0;

function renderContact() {
  const channel = $('#contact-channel').value;
  const version = $('#contact-version').value;
  const records = data.contact.versions[version].contact.records;
  const name = data.contact.channels.find(c=>c.id===channel).name;
  $('#contact-panels').innerHTML = ['cached','returned'].map(lens=>{
    const ids = records.map(record=>record[lens][channel]);
    return `<figure class="relation-matrix"><figcaption><b>${lens==='cached'?'Inside the cache':'At the service return'}</b><span>${esc(name)} · ${version}</span></figcaption><table aria-label="${esc(name)} ${lens} pairwise object identity in ${version}"><thead><tr><th scope="col"><span class="sr-only">Read</span></th>${records.map(r=>`<th scope="col">${r.stage}</th>`).join('')}</tr></thead><tbody>${records.map((r,row)=>`<tr><th scope="row">${r.stage}</th>${records.map((s,column)=>`<td class="${ids[row]===ids[column]?'same':'different'}" title="${r.stage} × ${s.stage}: ${ids[row]===ids[column]?'same':'different'} object"><span class="sr-only">${ids[row]===ids[column]?'same':'different'} object</span></td>`).join('')}</tr>`).join('')}</tbody></table></figure>`;
  }).join('');
  $('#contact-observation').textContent = channel==='R'
    ? 'References reuse a cached location promise while every public service return is a fresh promise. The cache still does its job.'
    : channel==='P'
      ? 'The stored position-location array is reused within a cache interval. Each service access returns a fresh node array.'
      : 'This service method returns its exact cached promise: the two identity patterns match. Failed refresh keeps the large A/F block; successful refresh and release begin fresh blocks.';
}

function resultText(frame) {
  const result = frame.result;
  if (!result) return 'No semantic result at this checkpoint.';
  if (result.outcome) return 'Call target: ' + result.outcome;
  if (result.symbols) return result.symbols.join(', ');
  if (Array.isArray(result.references)) return result.references.map(r => `${r.file}:${r.line}`).join(', ');
  return Object.entries(result).map(([key, count]) => `${key}: ${count}`).join(' · ');
}

function requestPanel(side) {
  const version = data.tour.versions[side];
  const frame = version.frames[requestStep];
  const previous = version.frames[Math.max(0, requestStep - 1)];
  return `<article class="replay-side ${side === 'base' ? 'before' : 'after'}" aria-label="${side} request checkpoint">
    <div class="side-heading"><b>${side === 'base' ? 'BEFORE' : 'AFTER'}</b><code>${version.sha.slice(0,8)}</code></div>
    <div class="owner">${side === 'base' ? 'TypeScript service · six Maps' : 'Core implementation · this service’s scope'}</div>
    <div class="cache-rack">${frame.caches.map((cache, index) => {
      const info = cacheByName.get(cache.name);
      const changed = JSON.stringify(cache.entries) !== JSON.stringify(previous.caches[index].entries);
      return `<button type="button" class="cache-cell ${cache.entries.length ? '' : 'empty'} ${changed ? 'changed' : ''}" data-cache="${cache.name}" data-cache-side="${side}" aria-label="Inspect ${side} ${info.title}">
        <span>${esc(info.title)} ↗</span><b class="entry">${cache.entries.map(e=>esc(e.value)).join(' · ') || '∅'}</b>
        <small>${cache.entries.length ? esc(cache.entries.map(e=>e.key).join(', ')) : 'empty'}</small></button>`;
    }).join('')}</div>
    <div class="search-counts"><div><b>${frame.counts.definitionSearch}</b><span>definition<br>searches</span></div><div><b>${frame.counts.referenceSearch}</b><span>reference<br>searches</span></div><div><b>${frame.counts.callTargetResolution}</b><span>position<br>resolutions</span></div></div>
    <p class="request-result">${esc(resultText(frame))}</p></article>`;
}

function renderRequest() {
  $('#request-panels').innerHTML = requestPanel('base') + requestPanel('head');
  $('#request-narration').innerHTML = `<b>${requestNotes[requestStep][0]}</b><span>${requestNotes[requestStep][1]}</span>`;
  document.querySelectorAll('[data-request-step]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.requestStep) === requestStep)));
  $('#request-position').textContent = `${requestStep + 1} / 8`;
  $('#request-prev').disabled = requestStep === 0;
  $('#request-next').disabled = requestStep === 7;
}

const scenarioNotes = {
  'release-reject': 'A gate holds the graph’s promise before real project cleanup. Rejecting the gate prevents that cleanup from running. Both real backend/service implementations are unchanged. This is a controlled contract probe.',
  'release-hold': 'A gate holds the graph’s promise before real project cleanup. Releasing the gate lets the real cleanup finish. The browser replays that completed experiment; no backend is waiting on these controls.',
  'refresh': 'The real backend refreshes the same two-file snapshot with workspace coverage. Source bytes are unchanged. This recording uses no failure injection.',
  'failed-refresh': 'One in-memory source revision changes. An injected throwing extractor interrupts real state preparation; backend refresh and rollback run unchanged. The query-cache guarantee does not promise rollback of every earlier refresh effect.'
};
const stepLabels = {start:'Refresh', warm:'Ask twice', cleared:'Call release', boundary:'Observe boundary', during:'Ask during wait', settled:'Graph settles', after:'Ask afterward'};
const shortCacheNames = {definitionsByIdentity:'defs',referencesByIdentity:'refs',callTargetsByIdentity:'target',callersByIdentity:'callers',calleesByIdentity:'callees',definitionsByPosition:'pos'};

function labPanel(side) {
  const version = data.lab[scenario][side];
  const step = version.steps[labStep];
  return `<article class="replay-side ${side === 'base' ? 'before' : 'after'}" aria-label="${side} lifecycle checkpoint">
    <div class="side-heading"><b>${side === 'base' ? 'BEFORE' : 'AFTER'}</b><code>${version.provenance.sha.slice(0,8)}</code></div>
    <div class="signal backend"><span>Backend release promise</span><b>${esc(step.release.backend)}</b></div>
    <div class="await-edge">${side === 'base' ? 'service starts graph · promise detached' : 'backend awaits service · service awaits graph'}</div>
    <div class="signal"><span>Project graph promise</span><b>${esc(step.release.project)}</b></div>
    <div class="lab-rack">${step.caches.map(c=>`<div class="lab-cache ${c.size ? 'filled' : ''}" title="${esc(c.name)}"><b>${c.size}</b><span>${shortCacheNames[c.name]}</span></div>`).join('')}</div>
    <span class="cache-total">${step.caches.reduce((sum,c)=>sum+c.size,0)} entries in six stores · cache turn ${step.turn}</span>
    <div class="search-counts"><div><b>${step.counts.definitions}</b><span>definition<br>searches</span></div><div><b>${step.counts.references}</b><span>reference<br>searches</span></div><div><b>${step.counts.positions}</b><span>position<br>resolutions</span></div></div>
    ${step.details.backendError ? `<p class="request-result">Backend error: ${esc(step.details.backendError)}<br>Same error object as graph: ${step.details.sameErrorObject ? 'yes' : 'no'}</p>` : ''}</article>`;
}

function labObservation() {
  const step = data.lab[scenario].head.steps[labStep];
  if (step.id === 'start') return 'Successful preparation establishes turn 1; no semantic query entries exist yet in either revision.';
  if (step.id === 'warm') return 'The same two accesses per query reuse cached work. Seven entries fill six stores: there are two distinct call positions.';
  if (step.id === 'cleared') return 'Immediately after calling release, every store is empty. Neither observer has yet recorded backend settlement; do not read “pending” here as proof that the base awaits cleanup.';
  if (step.id === 'during') return 'The graph is still held open, but a query batch can refill the stores. The head backend release remains pending. This probes the API, not daemon scheduling.';
  if (step.id === 'settled') return scenario === 'release-reject'
    ? 'The graph rejects in both runs. The base backend already fulfilled; the head backend rejects with that same error object. Entries remain because the previous checkpoint queried during cleanup.'
    : 'Project cleanup has now fulfilled in both runs. The head backend fulfills after it; the base had fulfilled earlier. Queries between clearing and settlement already refilled the stores.';
  if (scenario === 'refresh') return step.id === 'boundary'
    ? 'Both revisions clear all six stores after a successful refresh, even though the source bytes did not change. The next query will perform fresh work.'
    : 'The next batch refills the stores in turn 2. Both versions have performed a new definition and reference search.';
  if (scenario === 'failed-refresh') return step.id === 'boundary'
    ? 'The changed-source refresh rejects before beginTurn. Both recordings retain the prior definition promise and all seven existing entries.'
    : 'The next query batch reuses the retained semantic-cache turn. This cache observation does not assert whole-backend transactional rollback.';
  return 'Both sets of cache entries are gone. The base backend has fulfilled; the head backend remains pending with the held graph.';
}

function renderLab() {
  const steps = data.lab[scenario].head.steps;
  $('#lab-method').textContent = scenarioNotes[scenario];
  $('#lab-steps').innerHTML = steps.map((step,index)=>`<button type="button" data-lab-step="${index}" aria-pressed="${index === labStep}"><span>${String(index+1).padStart(2,'0')}</span>${stepLabels[step.id] || esc(step.id)}</button>`).join('');
  $('#lab-panels').innerHTML = labPanel('base') + labPanel('head');
  $('#lab-observation').textContent = labObservation();
  $('#lab-position').textContent = `${labStep + 1} / ${steps.length}`;
  $('#lab-prev').disabled = labStep === 0;
  $('#lab-next').disabled = labStep === steps.length - 1;
}

function reveal(target) {
  if (!target) return;
  let parent = target;
  while (parent) {
    if (parent.tagName === 'DETAILS') parent.open = true;
    parent = parent.parentElement;
  }
}

function remember(origin) {
  if (!origin.id) origin.id = 'route-origin-' + ++nextOrigin;
  returnTrail.push({id:origin.id, scroll:window.scrollY, hash:location.hash});
  $('#return-float').hidden = false;
}

function goToHash(hash, origin) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  if (origin) remember(origin);
  history.replaceState({...history.state, synthScroll:window.scrollY}, '', location.href);
  if ($('#cache-dialog').open) $('#cache-dialog').close('navigate');
  reveal(target);
  history.pushState({synth:true}, '', hash);
  target.scrollIntoView({block:'start'});
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex','-1');
  target.focus({preventScroll:true});
}

function returnToOrigin() {
  const previous = returnTrail.pop();
  if (!previous) return;
  const target = document.getElementById(previous.id);
  const url = location.pathname + location.search + previous.hash;
  history.pushState({synth:true,synthScroll:previous.scroll}, '', url);
  if (target) {
    reveal(target);
    target.focus({preventScroll:true});
  }
  window.scrollTo({top:previous.scroll, behavior:'instant'});
  $('#return-float').hidden = returnTrail.length === 0;
}

function showCache(button) {
  dialogOrigin = button;
  const name = button.dataset.cache;
  const side = button.dataset.cacheSide;
  const info = cacheByName.get(name);
  const frame = data.tour.versions[side].frames[requestStep];
  const cache = frame.caches.find(c=>c.name === name);
  $('#cache-dialog-title').textContent = info.title;
  $('#cache-dialog-side').textContent = `${side} · recorded step ${requestStep + 1} / 8`;
  $('#cache-dialog-body').innerHTML = `<code>${esc(name)}</code><dl><dt>Key</dt><dd>${esc(info.key)}</dd><dt>Stores</dt><dd>${esc(info.value)}</dd></dl><p>${esc(info.note)}</p><pre>${esc(cache.entries.length ? cache.entries.map(e=>`${e.key} → ${e.value} (${e.type})`).join('\n') : 'No entry exists at this checkpoint.')}</pre><p>Entry IDs belong to this recorded run. The map itself is independent of the other five stores.</p><p><a href="#e-${info.source}" data-exit>Read the source ↗</a> · <a href="#cache-${name}" data-exit>See all six contracts ↗</a></p>`;
  $('#cache-dialog').returnValue = '';
  $('#cache-dialog').showModal();
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (button?.hasAttribute('data-request-step')) {
    requestStep = Number(button.dataset.requestStep); renderRequest();
  } else if (button?.hasAttribute('data-lab-step')) {
    labStep = Number(button.dataset.labStep); renderLab();
    document.querySelector(`[data-lab-step="${labStep}"]`).focus({preventScroll:true});
  } else if (button?.hasAttribute('data-cache')) {
    showCache(button);
  } else if (button?.hasAttribute('data-return') || button?.id === 'return-float') {
    returnToOrigin();
  }
  const anchor = event.target.closest('a[data-exit]');
  if (anchor && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    const origin = $('#cache-dialog').open ? dialogOrigin : anchor;
    goToHash(anchor.hash, origin);
  }
});
$('#request-prev').addEventListener('click', ()=>{requestStep=Math.max(0,requestStep-1);renderRequest();});
$('#request-next').addEventListener('click', ()=>{requestStep=Math.min(7,requestStep+1);renderRequest();});
$('#lab-prev').addEventListener('click', ()=>{labStep=Math.max(0,labStep-1);renderLab();});
$('#lab-next').addEventListener('click', ()=>{labStep=Math.min(data.lab[scenario].head.steps.length-1,labStep+1);renderLab();});
$('#scenario').addEventListener('change', event=>{scenario=event.target.value;labStep=data.lab[scenario].head.steps.findIndex(step=>step.id==='boundary');renderLab();});
$('#contact-channel').addEventListener('change',renderContact);
$('#contact-version').addEventListener('change',renderContact);
$('#depth-index').addEventListener('keydown',event=>{
  const crossing=event.target.closest('[data-crossing]');
  if(!crossing || !['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key))return;
  event.preventDefault();
  let [row,column]=crossing.dataset.crossing.split(',').map(Number);
  if(event.key==='ArrowUp')row=Math.max(0,row-1);
  if(event.key==='ArrowDown')row=Math.min(11,row+1);
  if(event.key==='ArrowLeft')column=Math.max(0,column-1);
  if(event.key==='ArrowRight')column=Math.min(2,column+1);
  document.querySelector(`[data-crossing="${row},${column}"]`).focus();
});
$('#close-cache').addEventListener('click', ()=>$('#cache-dialog').close());
$('#cache-dialog').addEventListener('close', event=>{if(event.currentTarget.returnValue !== 'navigate' && dialogOrigin?.isConnected)dialogOrigin.focus({preventScroll:true});});
window.addEventListener('hashchange', ()=>reveal(document.getElementById(decodeURIComponent(location.hash.slice(1)))));
window.addEventListener('popstate', event=>{
  const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
  reveal(target);
  requestAnimationFrame(()=>{
    if(typeof event.state?.synthScroll==='number')window.scrollTo({top:event.state.synthScroll,behavior:'instant'});
    else if(target)target.scrollIntoView({block:'start'});
  });
});
renderRequest();
renderLab();
renderContact();
const initialTarget=document.getElementById(decodeURIComponent(location.hash.slice(1)));
if(initialTarget){reveal(initialTarget);requestAnimationFrame(()=>initialTarget.scrollIntoView({block:'start'}));}
