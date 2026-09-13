(() => {
  'use strict';
  const { facts, depths } = window.REVIEW;
  const { sources, testAudit } = window.EVIDENCE;
  const $ = (id) => document.getElementById(id);
  const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num = (i) => String(i + 1).padStart(2, '0');
  let factIndex = 0;
  let depthIndex = 0;
  let unrolled = false;
  let svgSerial = 0;

  function svgText(x, y, text, cls = '') {
    return `<text x="${x}" y="${y}" class="${cls}">${escape(text)}</text>`;
  }
  function svgBox(x, y, width, height, lines, cls = '') {
    const first = y + (height - ((lines.length - 1) * 19)) / 2 + 4;
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" class="node ${cls}"/>` + lines.map((s, i) => svgText(x + 12, first + i * 19, s, i ? 'tiny' : 'title')).join('');
  }
  function svgWire(x1, y1, x2, y2, marker, coral = false) {
    return `<path d="M${x1} ${y1}L${x2} ${y2}" class="${coral ? 'coral-wire' : 'wire'}" marker-end="url(#${marker})"/>`;
  }
  function diagram(fact) {
    const serial = ++svgSerial;
    const marker = `arrow-${serial}`;
    const t = svgText;
    const b = svgBox;
    const w = (x1,y1,x2,y2,coral=false) => svgWire(x1,y1,x2,y2,marker,coral);
    let body = '';
    let caption = '';
    let height = 240;
    switch (fact.id) {
      case 'owner':
        body = `<rect x="8" y="24" width="226" height="176" class="container"/><rect x="300" y="24" width="232" height="176" class="container"/>` +
          t(21,46,'BACKEND TYPESCRIPT','tiny') + t(313,46,'CORE','tiny') +
          b(21,62,200,56,['Semantic query service','algorithms stay here']) +
          b(21,136,200,46,['holds scope instance']) +
          b(313,62,206,56,['Scope implementation','register + clear handles'],'moved') +
          b(313,136,206,46,['6 separate Maps'],'moved') +
          w(225,91,307,91,true) + t(247,79,'uses','tiny') + w(416,121,416,130) +
          t(16,225,'Package direction stays TypeScript → core.','tiny');
        caption = 'Source ownership and object ownership are different: the core class is instantiated inside the TypeScript service.';
        break;
      case 'six': {
        body = b(157,8,225,36,['One clearing scope'],'moved');
        const labels = [['definitions','identity → promise'],['references','identity → promise'],['call targets','identity → promise'],['callers','identity → promise'],['callees','identity → promise'],['positions','file:start → locations[]']];
        labels.forEach((item,i) => { const x=8+(i%3)*180,y=70+Math.floor(i/3)*86; body += b(x,y,164,66,item); });
        body += `<path d="M270 44v13M89 57h362M89 57v12M269 57v12M449 57v12" class="coral-wire"/>`;
        body += t(17,240,'Each handle owns its own Map; names do not collide.','tiny');
        height = 254;
        caption = 'The scope unifies lifetime. The six typed key/value spaces stay isolated.';
        break;
      }
      case 'presence':
        body = t(10,22,'Map.has(key) controls both branches','title') +
          b(10,47,160,56,['key absent','has → false']) + w(174,75,232,75) + b(240,47,287,56,['Call factory → store value'],'moved') +
          b(10,123,160,56,['key → undefined','has → true']) + w(174,151,232,151) + b(240,123,287,56,['Return stored undefined'],'retained') +
          t(15,218,'An empty value is not the same as an absent entry.','tiny');
        caption = 'This is a new generic contract; the existing TypeScript handles still store their original promise and array types.';
        break;
      case 'failure':
        body = t(10,22,'RETURNED PROMISE','tiny') + b(10,38,153,57,['Factory returns P','store P immediately']) + w(167,66,191,66) +
          b(200,38,150,57,['P rejects later','entry still holds P'],'retained') + w(355,66,380,66) + b(387,38,143,57,['Next lookup','same P']) +
          t(10,130,'SYNCHRONOUS THROW','tiny') + b(10,146,153,57,['Factory throws','no value returned']) + w(167,174,191,174) +
          b(200,146,150,57,['No Map.set','key stays absent'],'moved') + w(355,174,380,174) + b(387,146,143,57,['Next lookup','factory retries']);
        caption = 'Order from source. The cache does not transform promises. Observer calls are part of attempted fills.';
        break;
      case 'refresh':
        body = t(10,22,'SUCCESSFUL REFRESH','tiny') +
          b(10,44,110,62,['Source cache','refresh']) + w(123,75,139,75) + b(148,44,116,62,['Graph refresh','workspace only']) + w(267,75,282,75) +
          b(291,44,111,62,['State refresh','await']) + w(405,75,420,75,true) + b(428,44,105,62,['beginTurn','clear all'],'moved') +
          `<path d="M204 112v41h126M347 112v41h-17" class="wire"/>` +
          b(130,165,280,52,['If an awaited refresh rejects','previous semantic-cache turn remains'],'retained') +
          t(12,239,'Ordering diagram; no whole-system rollback is implied.','tiny');
        height=253;
        caption = 'This success boundary is retained from base. Selection coverage skips the project-graph refresh.';
        break;
      case 'clear': {
        body = t(10,24,'CACHE ENTRIES','tiny') + t(192,24,'SYNCHRONOUS SWEEP','tiny') + t(395,24,'PROJECT RELEASE','tiny');
        for(let i=0;i<6;i++) body += b(10+(i%3)*43,46+Math.floor(i/3)*38,33,28,['•'],'retained');
        for(let i=0;i<6;i++) body += b(219+(i%3)*43,46+Math.floor(i/3)*38,33,28,[]);
        body += w(150,80,207,80,true)+w(358,80,385,80)+b(394,46,137,66,['await graph','pending / rejects']);
        body += b(126,157,286,52,['A query during the wait can refill','release is not a query admission gate']);
        caption = 'Order from source, with schematic spacing. The new test queries before release settles and observes a new cached value.';
        break;
      }
      case 'await':
        body = t(10,22,'BEFORE','tiny') + t(10,130,'AFTER','tiny') +
          `<path d="M155 27v185M493 27v185" class="container"/>` +
          t(121,232,'clear','tiny') + t(396,232,'project settles','tiny') +
          b(10,44,195,50,['Backend can resolve','project release still pending']) +
          `<path d="M211 69h275" class="wire" stroke-dasharray="4 4"/>` +
          b(10,150,348,50,['Backend release promise stays pending','await service → await project graph'],'moved') +
          w(363,175,395,175,true) + b(403,150,129,50,['Finish / reject']);
        height=250;
        caption = 'Ordering diagram; not elapsed time or a recorded execution. The completion boundary moves in the source.';
        break;
      case 'projection':
        body = b(12,24,182,59,['Query a position','file:start']) + w(199,53,222,53) +
          b(232,24,297,59,['Cached semantic locations','file + start + syntax kind; [] can be cached'],'retained') +
          `<path d="M382 89v20H112v19M382 109v19" class="wire"/>` +
          b(12,136,237,61,['Access one → rehydrate','new result array A']) + b(287,136,242,61,['Access two → rehydrate','new result array B']) +
          t(94,228,'A ≠ B; a resolved node can be the same object.','tiny');
        caption = 'Position results are rebuilt from locations on every access. Reference results are likewise projected after cache lookup.';
        break;
      case 'files':
        body = t(10,22,'BEFORE','tiny') + t(291,22,'AFTER','tiny') +
          b(10,40,232,66,['WorkspaceSnapshot','root + files']) + b(291,40,240,66,['readonly WorkspaceFile[]','files only'],'moved') +
          w(125,112,125,134)+w(410,112,410,134)+
          b(10,144,232,58,['service.beginTurn','this.files = snapshot.files']) + b(291,144,240,58,['service.beginTurn','this.files = files']) +
          t(49,235,'Both assign files before clearing the cache turn.','tiny');
        height=250;
        caption = 'The source narrows the input. The PR names the signature change but gives no reason for that choice.';
        break;
      case 'handles':
        body = `<rect x="8" y="18" width="524" height="161" class="container"/>` + t(24,42,'SCOPE KEEPS ITS HANDLE REGISTRY','tiny') +
          b(25,60,209,69,['Same handle object','getOrCreate(key, factory)'],'retained') + w(239,94,287,94,true) +
          b(297,60,218,69,['Same Map; empty entries','beginTurn / release → clear'],'moved') +
          t(26,159,'The scope can clear; the public handle type cannot.','tiny') +
          t(18,212,'No dispose, per-key eviction, cancellation, or active-turn gate.','tiny');
        caption = 'Release is a reusable clearing operation. It neither destroys the handles nor clears the service’s files field.';
        break;
      case 'settlement':
        body = b(10,30,152,62,['Turn A','key → oldPromise'])+w(168,60,190,60,true)+b(200,30,150,62,['Clear + turn B','key → newPromise'],'moved')+w(356,60,378,60)+b(389,30,142,62,['Read turn B','newPromise'],'retained')+
          `<path d="M86 97v72h105" class="wire"/>`+b(201,144,329,60,['Old promise still settles for its holder','No settlement callback writes back into the cache.'])+
          t(15,234,'Eviction removes an entry, not a promise held elsewhere.','tiny');
        height=248;
        caption = 'Order from the core test. This is a diagram of the contract, not a running simulation.';
        break;
      case 'tests':
        body = t(10,24,'SERVICE TESTS','tiny')+b(10,44,230,61,['5 existing tests','source tail unchanged'],'retained')+b(285,44,246,61,['+6 characterization tests','identities · projections · boundaries'],'moved')+
          t(10,143,'CORE TESTS','tiny')+b(10,162,521,59,['+4 new lifecycle tests','exact values · clearing · errors · late settlement'],'moved');
        caption = 'Source comparison across the two changed test files. Counts describe the diff, not a correctness score.';
        break;
    }
    return `<figure class="detail-figure"><svg viewBox="0 0 540 ${height}" role="img" aria-labelledby="diagram-title-${serial}"><title id="diagram-title-${serial}">${escape(fact.title)}. ${escape(caption)}</title><defs><marker id="${marker}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#202e35"/></marker></defs>${body}</svg><figcaption>${escape(caption)}</figcaption></figure>`;
  }

  function reasonHTML(fact) {
    return `<p class="selected-reason ${fact.status}"><span class="status ${fact.status}">${fact.status.toUpperCase()}</span>${escape(fact.reason)}</p>`;
  }
  function comparisonHTML(fact) {
    return `<p class="choice-line">${escape(fact.choice)}</p><div class="comparison"><div><b>BEFORE</b>${escape(fact.before)}</div><div><b>AFTER</b>${escape(fact.after)}</div></div>`;
  }
  function mechanismHTML(fact) {
    let result = `<ol class="steps">${fact.steps.map(([title,body],i)=>`<li><span class="step-number">${num(i)}</span><div><strong>${escape(title)}</strong><p>${escape(body)}</p></div></li>`).join('')}</ol>`;
    if (fact.table) {
      result += `<table class="contract-table"><thead><tr>${fact.table.heads.map(h=>`<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${fact.table.rows.map(row=>`<tr>${row.map((cell,i)=>`<${i?'td':'th'}${i?'':' scope="row"'}>${escape(cell)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table>`;
    }
    return result;
  }
  function resolveExcerpt(ref) {
    const source = sources[ref.key];
    if (!source) throw new Error(`Missing source ${ref.key}`);
    const start = ref.find ? source.lines.findIndex(line => line.includes(ref.find)) + 1 : ref.start;
    const end = ref.find ? start + (ref.span || 1) - 1 : ref.end;
    if (start < 1 || end > source.lines.length || end < start) throw new Error(`Invalid excerpt ${ref.key}: ${ref.find || start}`);
    return {source,start,end};
  }
  function sourceHTML(ref) {
    const {source,start,end} = resolveExcerpt(ref);
    return `<figure class="source-block"><figcaption>${escape(ref.caption)}</figcaption><p class="source-path">${escape(source.revision.toUpperCase())} · ${escape(source.sha.slice(0,8))} · ${escape(source.path)}:${start}–${end}</p><pre><code>${source.lines.slice(start-1,end).map((line,i)=>`<span class="source-line"><span class="line-number">${start+i}</span>${escape(line)}</span>`).join('')}</code></pre></figure>`;
  }
  function testsHTML() {
    const names = (key) => sources[key].lines.filter(l => /\bit\("/.test(l)).map(l => l.match(/\bit\("([^"]+)"/)[1]);
    return `<p class="audit-note">Compared original service-test tail including helpers: ${testAudit.existing_test_body_and_helpers_identical ? 'identical' : 'different'}.<br>Base service: ${testAudit.base_service_tests} · Head service: ${testAudit.head_service_tests} · New core: ${testAudit.new_core_tests}.<br>This is a source inventory; no end-to-end parity conclusion follows.</p><p class="depth-label">Service test names</p><ol class="test-inventory">${names('head:service-tests').map((name,i)=>`<li>${escape(name)} <span class="status">${i<6?'ADDED':'UNCHANGED'}</span></li>`).join('')}</ol><p class="depth-label">New core test names</p><ol class="test-inventory">${names('head:scope-tests').map(name=>`<li>${escape(name)}</li>`).join('')}</ol>`;
  }
  function evidenceHTML(fact) {
    return `<p class="evidence-intro">Exact local source excerpts, tied to the bundle’s base and head commits. Line numbers refer to the named revision. Rationale is attributed separately from implementation.</p>` + fact.evidence.map(sourceHTML).join('') + (fact.id === 'tests' ? testsHTML() : '');
  }
  function detailHTML(fact, depth) {
    if(depth===0) return diagram(fact);
    if(depth===1) return `<p class="depth-label">The decision, at the same boundary</p>${comparisonHTML(fact)}`;
    if(depth===2) return `<p class="depth-label">The same contract, with its moving parts</p>${diagram(fact)}${mechanismHTML(fact)}`;
    return `<p class="depth-label">Inspect the source of this thread</p>${evidenceHTML(fact)}`;
  }
  function makeRows() {
    $('depth-headings').innerHTML = depths.map((name,d)=>`<button type="button" data-depth="${d}" aria-label="${escape(name)} depth" aria-pressed="false">${escape(name)}</button>`).join('');
    $('decision-rows').innerHTML = facts.map((fact,i)=>`<article id="thread-${fact.id}" class="decision-row" aria-label="Decision ${num(i)}: ${escape(fact.title)}"><div class="thread"><button type="button" class="thread-title" data-fact="${i}" aria-label="Select decision ${num(i)}: ${escape(fact.title)}"><span class="thread-number">${num(i)}</span><span>${escape(fact.title)}</span></button><p class="thread-summary">${escape(fact.summary)}</p><p class="thread-reason"><span class="status ${fact.status}">${fact.status.toUpperCase()}</span>${escape(fact.reason)}</p></div><div class="crossings">${depths.map((depth,d)=>`<button type="button" class="crossing" data-cell="${i},${d}" aria-label="${num(i)} ${escape(fact.short)}, ${escape(depth)}" aria-pressed="false"><span aria-hidden="true">${d+1}</span></button>`).join('')}</div></article>`).join('');
  }
  function updatePane() {
    const fact = facts[factIndex];
    $('reading-pane').innerHTML = `<p class="address-tag"><span>DECISION ${num(factIndex)}</span><span>×</span><span>${depths[depthIndex].toUpperCase()}</span></p><h3>${escape(fact.title)}</h3><p class="selected-summary">${escape(fact.summary)}</p>${reasonHTML(fact)}${detailHTML(fact,depthIndex)}`;
    $('reading-pane').scrollTop=0;
    $('fact-coordinate').value = `${num(factIndex)} / ${facts.length}`;
    $('depth-coordinate').value = `${depthIndex+1} / ${depths.length}`;
    $('reading-address').textContent = `${fact.id} / ${depths[depthIndex].toLowerCase()}`;
    $('prev-fact').disabled = factIndex===0;
    $('next-fact').disabled = factIndex===facts.length-1;
    $('prev-depth').disabled = depthIndex===0;
    $('next-depth').disabled = depthIndex===depths.length-1;
    $('surface').disabled = depthIndex===0;
    document.querySelectorAll('[data-cell]').forEach(cell=>{
      const [i,d] = cell.dataset.cell.split(',').map(Number);
      cell.classList.toggle('active-depth',d===depthIndex);
      cell.setAttribute('aria-pressed',String(i===factIndex&&d===depthIndex));
      cell.tabIndex = i===factIndex&&d===depthIndex ? 0 : -1;
    });
    document.querySelectorAll('.decision-row').forEach((row,i)=>row.classList.toggle('is-selected',i===factIndex));
    document.querySelectorAll('[data-depth]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.depth)===depthIndex)));
    $('announcement').textContent=`Decision ${num(factIndex)} of ${facts.length}: ${fact.title}. ${depths[depthIndex]} depth.`;
  }
  function move(f,d,{writeHistory=true,focusCell=false,follow=false,revealPane=false}={}) {
    factIndex=Math.min(facts.length-1,Math.max(0,f));
    depthIndex=Math.min(depths.length-1,Math.max(0,d));
    updatePane();
    if(writeHistory) history.pushState(null,'',`#${facts[factIndex].id}/${depths[depthIndex].toLowerCase()}`);
    const mobile=matchMedia('(max-width:820px)').matches;
    if(focusCell) document.querySelector(`[data-cell="${factIndex},${depthIndex}"]`).focus({preventScroll:true});
    if(follow&&!mobile) {
      const row=$(`thread-${facts[factIndex].id}`);
      const box=row.getBoundingClientRect();
      if(box.top<70||box.bottom>innerHeight) row.scrollIntoView({block:'nearest'});
    }
    if(revealPane||(mobile&&follow)) {
      document.querySelector('.reader').scrollIntoView({block:'start'});
      if(mobile) $('reading-pane').focus({preventScroll:true});
    }
  }
  function fromHash() {
    const parts=location.hash.slice(1).split('/');
    const i=facts.findIndex(f=>f.id===parts[0]);
    const d=depths.findIndex(name=>name.toLowerCase()===parts[1]);
    if(i>=0&&d>=0) move(i,d,{writeHistory:false});
    else move(0,0,{writeHistory:false});
  }
  function toggleUnroll() {
    unrolled=!unrolled;
    $('loom-body').hidden=unrolled;
    $('unrolled').hidden=!unrolled;
    $('unroll-toggle').setAttribute('aria-expanded',String(unrolled));
    $('unroll-toggle').textContent=unrolled?'Return to the loom ↑':'Unroll the full review ↓';
    if(unrolled) {
      if(!$('unrolled').innerHTML) $('unrolled').innerHTML=`<button type="button" class="unroll-return" data-return-loom>Return to the same crossing ↑</button>`+facts.map((fact,i)=>`<article class="unrolled-fact"><p class="address-tag">DECISION ${num(i)} · ${escape(fact.short.toUpperCase())}</p><h3>${escape(fact.title)}</h3><p class="selected-summary">${escape(fact.summary)}</p>${reasonHTML(fact)}${diagram(fact)}<p class="depth-label">Choice</p>${comparisonHTML(fact)}<p class="depth-label">Mechanism</p>${mechanismHTML(fact)}<p class="depth-label">Evidence</p>${evidenceHTML(fact)}</article>`).join('');
      $('unrolled').scrollIntoView({block:'start'});
    } else {
      $('loom-body').scrollIntoView({block:'start'});
    }
  }

  // Fail on a bad source pointer before any reader has to discover it.
  facts.forEach(fact=>fact.evidence.forEach(resolveExcerpt));
  makeRows();
  fromHash();
  document.addEventListener('click',(event)=>{
    const cell=event.target.closest('[data-cell]');
    if(cell) {const [i,d]=cell.dataset.cell.split(',').map(Number);move(i,d,{revealPane:matchMedia('(max-width:820px)').matches});return;}
    const topic=event.target.closest('[data-fact]');
    if(topic) {move(Number(topic.dataset.fact),depthIndex,{revealPane:matchMedia('(max-width:820px)').matches});return;}
    const depth=event.target.closest('[data-depth]');
    if(depth) {move(factIndex,Number(depth.dataset.depth));return;}
    const jump=event.target.closest('[data-jump]');
    if(jump) {const [id,depthName]=jump.dataset.jump.split('/');if(unrolled) toggleUnroll();move(facts.findIndex(f=>f.id===id),depths.findIndex(d=>d.toLowerCase()===depthName),{revealPane:true});return;}
    if(event.target.closest('[data-return-loom]')) toggleUnroll();
  });
  $('prev-fact').addEventListener('click',()=>move(factIndex-1,depthIndex,{follow:true}));
  $('next-fact').addEventListener('click',()=>move(factIndex+1,depthIndex,{follow:true}));
  $('prev-depth').addEventListener('click',()=>move(factIndex,depthIndex-1));
  $('next-depth').addEventListener('click',()=>move(factIndex,depthIndex+1));
  $('surface').addEventListener('click',()=>move(factIndex,0));
  $('find-thread').addEventListener('click',()=>{
    const cell=document.querySelector(`[data-cell="${factIndex},${depthIndex}"]`);
    cell.focus({preventScroll:true});
    $(`thread-${facts[factIndex].id}`).scrollIntoView({block:'center'});
  });
  $('unroll-toggle').addEventListener('click',toggleUnroll);
  $('decision-rows').addEventListener('keydown',(event)=>{
    if(!event.target.closest('[data-cell]')) return;
    const movement={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]};
    if(event.key==='Escape') {event.preventDefault();move(factIndex,0,{focusCell:true,follow:true});}
    else if(movement[event.key]) {event.preventDefault();const [f,d]=movement[event.key];move(factIndex+f,depthIndex+d,{focusCell:true,follow:true});}
  });
  addEventListener('hashchange',fromHash);
  addEventListener('popstate',fromHash);
})();
