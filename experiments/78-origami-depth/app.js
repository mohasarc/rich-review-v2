(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const evidence = window.ORIGAMI_EVIDENCE;
  const recordings = window.ORIGAMI_RECORDINGS;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion = window.gsap;
  const flip = window.Flip;
  if (motion && flip) motion.registerPlugin(flip);
  const state = {shape:'pocket',build:'head',phase:'held',openness:0,edge:null};
  const shapeIds = ['pocket','accordion','gate'];
  const edgeIds = ['ownership','values','turn','refresh','release','tests'];
  const foldInfo = {
    pocket:{number:'01 / OWNERSHIP',title:'One owner.<br>Six separate interiors.',copy:'Fold the TypeScript edge toward core: the service holds a scope, and the scope holds six reusable handles. Query logic stays on the terracotta paper.',caption:'The class moves to core. The instance stays with the TypeScript service.',edge:'ownership'},
    accordion:{number:'02 / LIFETIME',title:'The crease clears.<br>The handle survives.',copy:'All six entry leaves turn away together. The handle tabs remain. A caller’s old promise stays outside the fold and can still settle.',caption:'∅ means old lookup removed. The same handles can accept new entries.',edge:'turn'},
    gate:{number:'03 / COMPLETION',title:'Empty first.<br>Finished later.',copy:'The cache fold happens before the cleanup fold. At head, two awaits keep the backend return attached to cleanup, including its rejection.',caption:'Raised cleanup and backend flaps share a completion boundary only at head.',edge:'release'},
  };
  const block = (label,kind='') => `<span class="block ${kind}">${label}</span>`;
  const arrow = '<span class="arrow" aria-hidden="true">→</span>';
  const line = (inner) => `<div class="mechanism-line">${inner}</div>`;
  const diagram = (inner,note='Schematic relationships; distances and fold angles are not measurements.') => `<div class="detail-diagram">${inner}<p class="diagram-note">${note}</p></div>`;
  const prose = (inner) => `<div class="mechanism-text">${inner}</div>`;
  const details = {
    ownership:{title:'A class changes address. Its instance has an owner.',html:()=>diagram(
      line('<small>BASE</small>'+block('TS service<br>six Maps + clear sequence','ts'))+
      line('<small>HEAD</small>'+block('TS service','ts')+arrow+block('core scope')+arrow+block('six handles'))+
      line('<small>holds instance</small><span>≠</span><small>where the class is defined</small>'))+
      prose('<p>The old <code>clearQueryCaches()</code> sequence becomes the core scope’s <code>clear()</code> loop. Each service creates one scope and six handles. Each handle has its own <code>Map</code>; key equality across handles does not cause sharing.</p><p>The package import direction already existed. Core exports <code>TurnScopedCacheScope</code> and the <code>TurnScopedCache</code> interface. Consumers get <code>getOrCreate</code>; the concrete handle and its <code>clear</code> method stay private.</p><p><span class="rationale stated">S: the spec assigns generic lifetime to core; the PR cites independent key/value spaces.</span> <span class="rationale unknown">U: composition instead of a base class, and this exact public/private API.</span></p>')},
    values:{title:'Store a value, not a story about its outcome.',html:()=>diagram(
      line(block('has(key)')+arrow+block('return exact stored value'))+
      line(block('miss','clear')+arrow+block('factory()')+arrow+block('set → return'))+
      line(block('factory throws','ts')+arrow+block('no entry → retry','clear'))+
      line(block('factory returns P','promise')+arrow+block('keep P, even rejected','promise')))+
      prose('<p><code>Map.has</code> makes <code>undefined</code> a real cached value. The scope stores the factory’s value directly. It adds no promise wrapper, rejection eviction, or settlement callback.</p><table class="mini-table"><thead><tr><th>Service family</th><th>Stored form / public access</th></tr></thead><tbody><tr><td>D, T, I, O</td><td>Identity key → promise; repeated service calls return that promise.</td></tr><tr><td>R</td><td>Identity key → location promise, shared with callers; references are projected on each access.</td></tr><tr><td>L</td><td>File + start → locations, including empty arrays; nodes are rehydrated on each access.</td></tr></tbody></table><p><span class="rationale stated">S: preserve algorithms, keys, identity and failure behavior; cache undefined.</span> <span class="rationale unknown">U: why the inherited projections originally used these forms.</span></p>')},
    turn:{title:'Unreachable by lookup does not mean cancelled.',html:()=>diagram(
      line(block('handle H')+arrow+block('entry P₀','promise'))+
      line(block('beginTurn() / release()','ts')+arrow+block('clear Map','clear'))+
      line(block('same H')+arrow+block('new entry P₁','promise'))+
      line(block('caller holds P₀','promise')+arrow+block('settles “old”','promise')),
      'The picture is schematic. The “old” / “new” results are recorded from the actual head core scope with a deferred promise.')+
      prose('<p>Clearing empties the handle’s map; it does not replace the handle. The scope keeps its handle list and traverses it synchronously for both lifecycle methods. Releasing twice still leaves the handles reusable.</p><p>In the core recording, six synthetic handles each produce a new value after a turn and again after release. Separately, a held <code>P₀</code> settles after a new entry <code>P₁</code> is installed. The next lookup still returns <code>P₁</code>.</p><p><span class="rationale stated">S: one-turn lifetime with preserved promise behavior.</span> There is no cancellation or disposal API. The six recorded generic handles are not six real TypeScript queries.</p>')},
    refresh:{title:'The fold follows successful refresh.',html:()=>diagram(
      line(block('refresh succeeds','ts')+arrow+block('beginTurn(files)')+arrow+block('clear all','clear'))+
      line(block('refresh rejects','ts')+arrow+block('existing turn stays')),
      'This order is present in both revisions. The following observations replay actual backend calls with an injected empty workspace state.')+
      prose('<table class="mini-table"><thead><tr><th>Observed lookup</th><th>Base</th><th>Head</th></tr></thead><tbody><tr><td>After failed refresh</td><td>same result</td><td>same result</td></tr><tr><td>After successful refresh</td><td>new result</td><td>new result</td></tr><tr><td>Search count over those steps</td><td>1 → 1 → 2</td><td>1 → 1 → 2</td></tr></tbody></table><p>The backend calls <code>beginTurn</code> after awaited refresh work succeeds. The service assigns its files and clears its stores. This ordering is retained and newly characterized.</p><p><span class="rationale stated">S: failed refresh must preserve the current successful turn.</span> <span class="rationale unknown">U: the exported service now accepts the file array alone; no specific reason for that narrowing was found.</span></p>')},
    release:{title:'Two awaits attach the return to cleanup.',html:()=>diagram(
      line('<small>BASE</small>'+block('clear','clear')+arrow+block('start cleanup','project')+arrow+block('backend fulfills','ts'))+
      line('<small>HEAD</small>'+block('clear','clear')+arrow+block('await cleanup','project')+arrow+block('backend settles','ts'))+
      line('<small>Same clearing order. Different completion contract.</small>'),
      'Illustrative order only. The recorded pending window is injected. Concrete TypeScript project cleanup is synchronous; the generic graph supports an asynchronous release.')+
      prose('<table class="mini-table"><thead><tr><th>Controlled observation</th><th>Base return</th><th>Head return</th></tr></thead><tbody><tr><td>Cleanup held</td><td>fulfilled</td><td>pending</td></tr><tr><td>Cleanup fulfills</td><td>fulfilled</td><td>fulfilled</td></tr><tr><td>Cleanup rejects</td><td>already fulfilled</td><td>same rejection</td></tr></tbody></table><p>The service changes from <code>void</code> to <code>Promise&lt;void&gt;</code> and awaits the project graph. The backend now awaits the service. A query during held cleanup obtains a new result in both recordings.</p><p><span class="rationale stated">S: clear before waiting so old semantics are unavailable.</span> The PR names the awaited boundary, but <span class="rationale unknown">U: neither its body, six commit messages, nor the inspected follow-up spec reconciles the changed completion/rejection contract with the architecture spec’s parity requirement.</span> This recording is not a daemon trace.</p>')},
    tests:{title:'A frozen record of what was checked.',html:()=>diagram(
      line(block('5 existing service cases','ts')+arrow+block('5 byte-identical cases','ts'))+
      line(block('+6 service cases','ts')+block('+4 core cases'))+
      line('<small>Focused execution: 5 base / 15 head pass.</small>'),
      'These counts describe source and focused execution. They do not measure whole-system parity or assign a correctness verdict.')+
      prose('<p>The original five cases and everything after their first declaration, including helpers, are byte-identical. The added service cases cover identity, position rehydration, asynchronous rejection, synchronous retry, failed refresh, and awaited release. Core adds exact values, all-handle clearing, failure behavior, and old-promise settlement.</p><p><span class="rationale stated">S: repository guidance requires tests for behavior.</span> The commits name characterization, lifecycle and awaited release as their intent. <span class="rationale unknown">U: no explanation for exactly this selection.</span> Both builds and these focused tests passed. The recordings inject collaborators into actual compiled methods; no complete daemon or end-to-end parity suite was run.</p><p><a href="evidence/base-service-tests.log">Base service run</a> · <a href="evidence/head-service-tests.log">Head service run</a> · <a href="evidence/head-core-tests.log">Head core run</a></p>')},
  };

  function storedRun(build, phase) {
    const run=recordings.runs.find(r=>r.build===build&&r.outcome===(phase==='reject'?'reject':'resolve'));
    return {run, checkpoint:run.checkpoints.find(r=>r.id===(phase==='held'?'query-during-release':`cleanup-${phase}`))};
  }
  function readout(label,value,className='') {return `<div class="readout"><span>${label}</span><strong class="${className}">${value}</strong></div>`;}
  function renderReading() {
    const info=foldInfo[state.shape];
    $('#reading-number').textContent=`FOLD ${info.number}`;
    $('#reading-title').innerHTML=info.title;
    $('#reading-copy').textContent=state.build==='base'&&state.shape==='pocket'?'At base, the TypeScript service owns six Maps and the clearing sequence. The core-colored lifetime class has not yet been introduced. The query families are the same.':info.copy;
    $('#flat-caption').textContent=info.caption;
    $('#cleanup-controls').hidden=state.shape!=='gate';
    $('#core-owner').textContent=state.build==='head'?'C':'TS';
    $('#core-owner-name').textContent=state.build==='head'?'@symnav/core':'backend-typescript';
    $('#scope-name').textContent=state.build==='head'?'TurnScopedCacheScope':'six Maps in the service';
    $('#scope-job').textContent=state.build==='head'?'one clearing owner / six isolated stores':'manual clearing / six isolated stores';
    $('.scope-link').innerHTML=state.build==='head'?'holds one scope instance <span>→</span>':'owns six independent Maps <span>→</span>';
    $('.ts-paper > .microprint').innerHTML=state.build==='head'?'beginTurn(files)<br>await semanticQueries.releaseTransientResources()':'beginTurn(snapshot)<br>semanticQueries.releaseTransientResources()';
    $('.core-micro').innerHTML=state.build==='head'?'has(key) → exact value<br>miss → create → set<br>beginTurn / release → clear all':'get(key) → existing<br>miss → compute → set<br>clearQueryCaches() → clear all';
    $('#flat-caption').textContent=state.build==='base'&&state.shape==='pocket'?'Before: the TypeScript service owns both queries and the clearing sequence.':info.caption;
    $('#await-seam').classList.toggle('broken',state.build==='base');
    $$('#await-seam span').forEach((node,i)=>node.textContent=(state.build==='head'?'await ':'start ')+(i===0?'service':'graph'));
    $('.return-face small').textContent=state.build==='head'?'service await + backend await':'project completion is not awaited';
    const {checkpoint}=storedRun(state.build,state.phase);
    $('#paper-return').textContent=state.shape==='gate'?checkpoint.backendRelease:(state.build==='head'?'awaits cleanup':'starts cleanup only');
    $('#paper-cleanup').textContent=state.phase==='held'?'cleanup held open':state.phase==='resolve'?'cleanup fulfilled':'cleanup rejected';
    $('#gate-symbol').style.borderStyle=state.phase==='held'?'solid':state.phase==='reject'?'dashed':'double';
    $('#cache-edge').textContent=state.shape==='pocket'?'ENTRIES TURN-SCOPED · HANDLES REUSABLE':'OLD LOOKUPS CLEARED · HANDLES REUSABLE';
    $$('.entry-front span').forEach((node,i)=>node.textContent=state.shape==='pocket'?(i===5?'[ ]':'P'):'∅');
    $('#stage').dataset.shape=state.shape;
    $('#stage').dataset.build=state.build;
    $('#stage').setAttribute('aria-label',state.shape==='pocket'?`${state.build}: TypeScript service holds ${state.build==='head'?'a core scope with six reusable handles':'six Maps and their clearing sequence'}. Project cleanup is a separate collaborator.`:state.shape==='accordion'?'All six old entry leaves fold away, while the same handles and the caller-held old promise remain.':`${state.build}: old cache lookups cleared; cleanup ${state.phase}; recorded backend return ${checkpoint.backendRelease}.`);
    let reading;
    if(state.shape==='pocket') reading=readout('Lifetime code',state.build==='head'?'core':'TypeScript')+readout('Stores','6 isolated')+readout('Evidence','source mapping');
    else if(state.shape==='accordion') {
      const rows=storedRun(state.build,'held').run.checkpoints;
      reading=readout('Failed refresh',rows[1].resultSame?'same result':'new result')+readout('Successful refresh',rows[2].resultSame?'same result':'new result')+readout('Evidence','recorded backend');
    } else reading=readout('Lookup during hold','new result')+readout('Backend return',checkpoint.backendRelease,checkpoint.backendRelease==='pending'?'pending':checkpoint.backendRelease==='rejected'?'failure':'')+readout('Evidence','recorded backend');
    $('#readouts').innerHTML=reading;
    $$('[data-shape]').filter(n=>n.tagName==='BUTTON').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.shape===state.shape)));
    $$('[data-build]').filter(n=>n.tagName==='BUTTON').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.build===state.build)));
    $$('[data-phase]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.phase===state.phase)));
  }
  function applyMotion(immediate=false) {
    const folded=1-state.openness/100;
    const gate=state.shape==='gate';
    const pocket=state.shape==='pocket';
    const accordion=state.shape==='accordion';
    const pending=state.phase==='held';
    const duration=immediate||reduce.matches?0:.85;
    const pose=[
      ['#sheet',{rotationX:(pocket?-20:gate?-21:-16)*folded,rotationZ:(pocket?-7:gate?-3:-4)*folded,y:(gate?0:-8)*folded-70*state.openness/100}],
      ['#ts-panel',{rotationY:(pocket?-42:0)*folded}],
      ['#project-panel',{rotationY:(pocket?42:0)*folded}],
      ['.entry-leaf',{rotationX:(pocket?15:143)*folded,z:1}],
      ['#project-flap',{rotationX:(gate?(pending?68:0):pocket?12:14)*folded,z:1}],
      ['#ts-return',{rotationX:(gate&&state.build==='head'&&pending?68:0)*folded,z:1}],
      ['.microprint',{opacity:Math.max(0,(state.openness-55)/45)}],
      ['.paper-front,.owner-panel',{height:275+70*state.openness/100}],
      ['#await-seam',{top:285+70*state.openness/100}],
      ['#retained-slip',{opacity:accordion?1:0,y:accordion?0:12}],
      ['#next-slip',{opacity:accordion?1:0,y:accordion?0:12}],
    ];
    if (motion) {
      pose.forEach(([selector,properties])=>motion.to(selector,{...properties,duration,ease:'power2.inOut',overwrite:'auto'}));
    } else {
      // A flat, readable sheet is the fallback when the local motion library is unavailable.
      $$('.microprint').forEach(n=>n.style.opacity='1');
      $('#retained-slip').style.opacity=accordion?'1':'0';
      $('#next-slip').style.opacity=accordion?'1':'0';
    }
    $('#openness-value').textContent=`${state.openness}%`;
    $('#openness').value=state.openness;
    $('#retained-slip small').textContent='actual head core: old promise settles';
    document.body.dataset.motion=reduce.matches?'reduced':'full';
    document.body.dataset.shape=state.shape;
    document.body.dataset.build=state.build;
    document.body.dataset.phase=state.phase;
  }
  function fitSheet() {
    const stage=$('#stage');
    const scale=Math.min(stage.clientWidth/900,stage.clientHeight/530);
    $('#scene-fit').style.transform=`scale(${scale})`;
    $('#scene-fit').style.left=`${(stage.clientWidth-900*scale)/2}px`;
    $('#scene-fit').style.top=`${(stage.clientHeight-530*scale)/2}px`;
  }
  function updateURL(replace=false) {
    const params=new URLSearchParams({fold:state.shape,rev:state.build,open:String(state.openness),cleanup:state.phase});
    if(state.edge) params.set('edge',state.edge);
    const url=`#${params}`;
    if(location.hash!==url) history[replace?'replaceState':'pushState'](null,'',url);
  }
  function render(immediate=false) {renderReading();applyMotion(immediate);fitSheet();}
  function setShape(shape) {
    state.shape=shape;
    render();updateURL();
    $('#live-status').textContent=`${foldInfo[shape].number}. ${foldInfo[shape].title.replace('<br>',' ')}`;
  }
  function openEdge(edge,{focus=true,history=true}={}) {
    state.edge=edge;
    const idx=edgeIds.indexOf(edge);
    const detail=$('#detail');
    const wasHidden=detail.hidden;
    const previous=flip&&!wasHidden&&!reduce.matches?flip.getState(detail):null;
    $('#detail-eyebrow').textContent=`UNFOLDED EDGE ${String(idx+1).padStart(2,'0')} / SAME CONTRACT`;
    $('#detail-title').textContent=details[edge].title;
    $('#detail-content').innerHTML=details[edge].html();
    detail.hidden=false;
    if(previous) flip.from(previous,{duration:.35,ease:'power2.inOut',scale:false});
    $('#previous-edge').disabled=idx===0;
    $('#next-edge').disabled=idx===edgeIds.length-1;
    if(history) updateURL();
    if(focus) {detail.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'});$('#detail-title').focus({preventScroll:true});}
  }
  function closeEdge() {
    const previous=state.edge;
    state.edge=null;$('#detail').hidden=true;updateURL();
    if(previous) {
      const button=$(`[data-edge="${previous}"]`);
      button.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'center'});
      button.focus({preventScroll:true});
    }
  }
  function restore() {
    if(!location.hash.startsWith('#fold=')) return;
    const p=new URLSearchParams(location.hash.slice(1));
    state.shape=shapeIds.includes(p.get('fold'))?p.get('fold'):'pocket';
    state.build=p.get('rev')==='base'?'base':'head';
    state.phase=['held','resolve','reject'].includes(p.get('cleanup'))?p.get('cleanup'):'held';
    state.openness=Math.min(100,Math.max(0,Number(p.get('open'))||0));
    const edge=p.get('edge');
    if(edgeIds.includes(edge)) openEdge(edge,{focus:false,history:false});
    else {state.edge=null;$('#detail').hidden=true;}
    render(true);
  }

  let sourceRows=[],showFull=false,sourceReturn=null;
  const escapeHTML = (s)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  function sourceWindow() {
    const selected=sourceRows[Number($('#source-select').value)||0];
    const [key,start,end]=selected;
    const doc=evidence.docs[key];
    const allLines=doc.text.split('\n');
    const from=showFull?1:start, to=showFull?allLines.length:end;
    $('#source-code').innerHTML=allLines.slice(from-1,to).map((text,i)=>{
      const number=from+i;
      return `<span class="line${number>=start&&number<=end?' highlight':''}" id="receipt-line-${number}"><span class="line-number">${number}</span>${escapeHTML(text)}</span>`;
    }).join('');
    $('#source-meta').textContent=`${doc.path} · ${doc.build} ${doc.revision} · lines ${start}–${end}`;
    $('#source-raw').href=`evidence/sources/${key}.txt`;
    $('#source-hash').textContent=`SHA-256 ${doc.sha256.slice(0,20)}…`;
    $('#show-full').textContent=showFull?'Excerpt only':'Full file';
    $('#source-code').scrollTop=0;$('#source-code').scrollLeft=0;
    if(showFull) {
      const target=$(`#receipt-line-${start}`);
      $('#source-code').scrollTop=target.offsetTop-$('#source-code').offsetTop-20;
    }
  }
  function openSources() {
    if(!state.edge) return;
    sourceReturn=document.activeElement;
    sourceRows=[...evidence.selections[state.edge]];
    // Rationale is available next to implementation for every decision family.
    sourceRows.push(['pr',1,evidence.docs.pr.text.split('\n').length]);
    if(state.edge==='release') sourceRows.push(['spec',1,32],['follow-ups',1,evidence.docs['follow-ups'].text.split('\n').length]);
    $('#source-select').innerHTML=sourceRows.map(([key,start,end],i)=>`<option value="${i}">${evidence.docs[key].build} · ${key} · L${start}–${end}</option>`).join('');
    $('#source-title').textContent=`Edge ${String(edgeIds.indexOf(state.edge)+1).padStart(2,'0')} · ${state.edge}`;
    showFull=false;sourceWindow();$('#source-dialog').showModal();$('#source-select').focus();
  }
  $$('button[data-shape]').forEach(b=>b.addEventListener('click',()=>setShape(b.dataset.shape)));
  $$('button[data-build]').forEach(b=>b.addEventListener('click',()=>{state.build=b.dataset.build;render();updateURL();}));
  $$('button[data-phase]').forEach(b=>b.addEventListener('click',()=>{state.phase=b.dataset.phase;render();updateURL();}));
  $$('[data-edge]').forEach(b=>b.addEventListener('click',()=>openEdge(b.dataset.edge)));
  $('#next-fold').addEventListener('click',()=>setShape(shapeIds[(shapeIds.indexOf(state.shape)+1)%3]));
  $('#openness').addEventListener('input',(event)=>{state.openness=Number(event.target.value);applyMotion(true);});
  $('#openness').addEventListener('change',()=>updateURL());
  $('#inspect-fold').addEventListener('click',()=>openEdge(foldInfo[state.shape].edge));
  $('#reset').addEventListener('click',()=>{state.shape='pocket';state.build='head';state.phase='held';state.openness=0;render();updateURL();});
  $('#close-detail').addEventListener('click',closeEdge);
  $('#previous-edge').addEventListener('click',()=>openEdge(edgeIds[edgeIds.indexOf(state.edge)-1]));
  $('#next-edge').addEventListener('click',()=>openEdge(edgeIds[edgeIds.indexOf(state.edge)+1]));
  $('#open-receipts').addEventListener('click',openSources);
  $('#close-source').addEventListener('click',()=>$('#source-dialog').close());
  $('#source-dialog').addEventListener('close',()=>sourceReturn?.focus({preventScroll:true}));
  $('#source-select').addEventListener('change',()=>{showFull=false;sourceWindow();});
  $('#show-full').addEventListener('click',()=>{showFull=!showFull;sourceWindow();});
  window.addEventListener('popstate',restore);
  reduce.addEventListener('change',()=>render(true));
  new ResizeObserver(fitSheet).observe($('#stage'));
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'&&!$('#source-dialog').open&&state.edge){event.preventDefault();closeEdge();}
  });
  if(location.hash.startsWith('#fold=')) restore(); else {render(true);if(!location.hash)updateURL(true);}
  window.ORIGAMI_APP={getState:()=>({...state}),render,fitSheet};
})();
