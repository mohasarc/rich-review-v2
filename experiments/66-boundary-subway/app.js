(() => {
  'use strict';
  const D=window.SUBWAY, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const line=id=>D.lines.find(l=>l.id===id), decision=id=>D.decisions.find(d=>d.id===id), node=id=>D.nodes.find(n=>n.id===id);
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const state={mode:'express',line:'all',selected:'facade',journey:null,step:0,decision:null};
  const svg=d3.select('#map'), stage=svg.append('g'), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const symbolTypes={contract:d3.symbolCircle,gate:d3.symbolDiamond,state:d3.symbolSquare,injected:d3.symbolTriangle};
  const roles={contract:'Contract',gate:'Decision gate',state:'State owner',injected:'Injected executor / host'};
  const zoom=d3.zoom().scaleExtent([.15,4]).filter(e=>(e.type!=='wheel'||e.ctrlKey)&&!e.button).on('zoom',e=>stage.attr('transform',e.transform));
  svg.call(zoom).on('dblclick.zoom',null);
  let graph, ns, es, savedFocus=null;
  function dimensions(){return {w:$('#map').clientWidth,h:$('#map').clientHeight};}
  function fit(animate=false){
    const {w,h}=dimensions();const k=Math.min((w-38)/graph.width,(h-82)/graph.height,1.3);
    const t=d3.zoomIdentity.translate((w-graph.width*k)/2,(h-graph.height*k)/2+2).scale(k);
    (animate&&!reduced?svg.transition().duration(350):svg).call(zoom.transform,t);
  }
  function focusStation(id){
    const n=graph.nodes.find(n=>n.id===id);if(!n)return;
    const {w,h}=dimensions();const k=Math.min(w<550?1.15:1.35,Math.max(d3.zoomTransform(svg.node()).k,1));
    const t=d3.zoomIdentity.translate(w/2-(n.x+10)*k,h/2-(n.y+10)*k).scale(k);
    (reduced?svg:svg.transition().duration(350)).call(zoom.transform,t);
  }
  function draw(){
    const baseKey=state.journey?'journey-'+state.journey:state.mode==='local'&&state.line!=='all'?'line-'+state.line:state.mode;
    const key=baseKey+(innerWidth<=760?'-phone':'');
    graph=D.layouts[key];ns=state.journey?D.journeyGraphs[state.journey].nodes:state.mode==='express'?D.expressNodes:D.nodes;es=state.journey?D.journeyGraphs[state.journey].edges:state.mode==='express'?D.expressEdges:D.edges;
    $('.map-canvas').style.height=innerWidth<=760?Math.min(1150,Math.max(400,(dimensions().w-38)/graph.width*graph.height+82))+'px':'';
    stage.selectAll('*').remove();
    const defs=stage.append('defs');
    for(const l of D.lines)defs.append('marker').attr('id','arrow-'+l.id).attr('viewBox','0 0 10 10').attr('refX',8).attr('refY',5).attr('markerWidth',5).attr('markerHeight',5).attr('orient','auto').append('path').attr('d','M2 2L8 5L2 8').attr('fill','none').attr('stroke',l.color).attr('stroke-width',1.7);
    const groups=stage.append('g').selectAll('g').data(graph.groups).join('g').attr('class','map-group').attr('data-group',d=>d.id).attr('transform',d=>`translate(${d.x},${d.y})`);
    groups.append('rect').attr('width',d=>d.width).attr('height',d=>d.height);
    groups.append('text').attr('class','group-title').attr('x',17).attr('y',23).text(d=>D.groups.find(g=>g.id===d.id).label);
    groups.append('text').attr('class','group-sub').attr('x',17).attr('y',39).text(d=>d.id==='host'?'caller process':d.id==='client'?'caller process · package boundary':'daemon process · worker inside');
    const path=d3.line().x(p=>p.x).y(p=>p.y).curve(d3.curveLinear);
    const route=stage.append('g').attr('class','routes').selectAll('g').data(graph.edges).join('g').attr('class','route').attr('data-edge',d=>d.id);
    route.each(function(e){const semantic=es.find(s=>s.id===e.id), g=d3.select(this);for(const s of e.sections){const p=path([s.startPoint,...s.bendPoints,s.endPoint]);g.append('path').attr('class','route-halo').attr('d',p);const rail=g.append('path').attr('class','route-path').attr('d',p).attr('stroke',line(semantic.line).color);const element=rail.node(),length=element.getTotalLength(),middle=element.getPointAtLength(length*.56),next=element.getPointAtLength(length*.56+1),angle=Math.atan2(next.y-middle.y,next.x-middle.x)*180/Math.PI+(e.reversed?180:0);g.append('path').attr('class','direction-arrow').attr('d','M-3 -3 L0 0 L-3 3').attr('transform',`translate(${middle.x},${middle.y}) rotate(${angle})`).attr('stroke','white').attr('stroke-width',1.5).attr('fill','none');g.append('path').attr('class','route-hit').attr('d',p).on('click',()=>selectDecision(semantic.decision));}});
    const stops=stage.append('g').attr('class','stops').selectAll('g').data(graph.nodes).join('g').attr('class','station').attr('data-station',d=>d.id).attr('transform',d=>`translate(${d.x+10},${d.y+10})`).attr('tabindex',0).attr('role','button').attr('aria-label',d=>{const n=ns.find(n=>n.id===d.id);return `${n.label}, ${roles[n.authority]}, ${n.services.length} mapped flow types. Inspect station.`;}).on('click',(e,d)=>selectStation(d.id)).on('keydown',(e,d)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectStation(d.id);}});
    stops.append('circle').attr('class','station-halo').attr('r',35);
    stops.append('path').attr('class','symbol').attr('d',d=>{const n=ns.find(n=>n.id===d.id);return d3.symbol().type(symbolTypes[n.authority]).size(140+145*n.services.length)();});
    stops.append('circle').attr('class','station-dot').attr('r',2.5);
    stops.append('title').text(d=>node(d.id)?.blurb??d.id);
    stops.each(function(d){const n=ns.find(n=>n.id===d.id), words=n.label.split(' '), rows=n.label.length<18?[n.label]:[words.slice(0,Math.ceil(words.length/2)).join(' '),words.slice(Math.ceil(words.length/2)).join(' ')];const label=d.labels[0];const text=d3.select(this).append('text').attr('class','label').attr('x',label.x+label.width/2-10).attr('y',label.y-10+13);rows.forEach((t,i)=>text.append('tspan').attr('x',label.x+label.width/2-10).attr('dy',i?18:0).text(t));});
    $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode)));
    $('#map-tag').textContent=state.journey?'SOURCE WALK / SCHEMATIC, SKIPS COLLABORATORS':state.mode==='express'?'EXPRESS SERVICE / GROUPED STOPS':state.line==='all'?'LOCAL OVERVIEW / SELECT A LINE FOR A CLOSER VIEW':'LOCAL SERVICE / '+line(state.line).name.toUpperCase()+' LINE';
    styleSelection();fit();
  }
  function styleSelection(){
    const j=D.journeys.find(j=>j.id===state.journey), itinerary=new Set(j?.steps.map(s=>s[0])??[]);
    stage.selectAll('.route').attr('opacity',e=>{const s=es.find(s=>s.id===e.id);if(state.decision)return s.decision===state.decision?1:.11;if(j)return itinerary.has(s.source)&&itinerary.has(s.target)?1:.12;return state.line==='all'||s.line===state.line?1:.09;});
    stage.selectAll('.station').classed('active',d=>d.id===state.selected).attr('opacity',d=>{const n=ns.find(n=>n.id===d.id);if(j)return itinerary.has(d.id)?1:.28;if(state.decision)return n.decision===state.decision||d.id===state.selected?1:.4;return state.line==='all'||n.services.includes(state.line)?1:.28;});
    $$('[data-line]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.line===state.line)));
  }
  function discs(services){return `<div class="service-dots">${services.map(id=>`<span title="${line(id).name}" class="line-disc ${line(id).letter.toLowerCase()}">${line(id).letter}</span>`).join('')}</div>`;}
  function setPanel(html){$('#inspection').innerHTML=html;}
  function stationPanel(id){
    const n=node(id),d=decision(n.decision);
    setPanel(`<div class="inspection-number">STATION ${D.nodes.findIndex(x=>x.id===id)+1} / ${roles[n.authority].toUpperCase()}</div><h3>${esc(n.label)}</h3>${discs(n.services)}<p>${esc(n.blurb)}</p><p class="micro">${n.services.length} mapped flow types meet here. Station area = 140 + 145 × flow types; an editorial responsibility count.</p><button class="decision-cta" data-decision="${d.id}">Notice ${d.number} · ${esc(d.title)} ↗</button><div class="proof-row"><button data-source="${d.sources[0]}">Source receipt ↗</button><button data-focus="${id}">Bring station closer</button></div><div class="inspection-nav"><button data-tour="-1">← Previous notice</button><button data-tour="1">Next notice →</button></div>`);
  }
  function decisionPanel(id){
    const d=decision(id);
    setPanel(`<div class="inspection-number">NOTICE ${d.number} / MECHANISM</div><h3>${esc(d.title)}</h3><p>${esc(d.summary)}</p><div class="inspection-detail"><p>${esc(d.detail)}</p><p class="micro">${esc(d.reason)}</p></div><div class="source-list-title">EXACT SOURCE RECEIPTS</div><div class="proof-row">${d.sources.map(s=>`<button data-source="${s}">${esc(s)} ↗</button>`).join('')}</div><div class="inspection-nav"><button data-tour="-1">← Previous</button><a href="#notice-${d.id}">Return to notice ${d.number} ↓</a><button data-tour="1">Next →</button></div>`);
  }
  function journeyPanel(){
    const j=D.journeys.find(j=>j.id===state.journey),step=j.steps[state.step],n=node(step[0]);
    state.selected=n.id;
    setPanel(`<div class="inspection-number">SOURCE WALK / ${state.step+1} OF ${j.steps.length}</div><p class="micro">${esc(j.name)}</p><h3>${esc(n.label)}</h3>${discs([j.line])}<p role="status">${esc(step[1])}</p><div class="step-indicator" aria-label="Journey stops">${j.steps.map((s,i)=>`<button data-step="${i}" aria-label="Step ${i+1}: ${esc(node(s[0]).label)}" ${i===state.step?'aria-current="step"':''}>${i+1}</button>`).join('')}</div><div class="proof-row"><button data-source="${step[2]}">This stop’s source ↗</button><button data-focus="${step[0]}">Bring station closer</button></div><div class="inspection-nav"><button id="previous-step" ${state.step===0?'disabled':''}>← Previous stop</button><button id="next-step" ${state.step===j.steps.length-1?'disabled':''}>Next stop →</button></div><button class="decision-cta" data-decision="${j.decision}">Read the complete notice ↗</button>`);
    styleSelection();
  }
  function selectStation(id,history=true){
    if(!node(id))return;const wasJourney=!!state.journey;state.selected=id;state.decision=null;state.journey=null;$('#journey').value='';const missing=!graph.nodes.some(n=>n.id===id);if(missing){state.mode='local';state.line='all';}if(wasJourney||missing)draw();stationPanel(id);styleSelection();if(history)setHash('station='+id);
  }
  function selectDecision(id,history=true){
    const d=decision(id);if(!d)return;state.decision=id;state.journey=null;state.selected=D.nodes.find(n=>n.decision===id)?.id??null;$('#journey').value='';if(id==='boundary'){state.mode='express';state.line='all';}else if(id!=='tests'){state.mode='local';state.line=d.line;}draw();decisionPanel(id);styleSelection();if(history)setHash('decision='+id);
  }
  function selectJourney(id,step=0,history=true){
    const j=D.journeys.find(j=>j.id===id);if(!j)return;state.journey=id;state.decision=null;state.line='all';state.step=Math.min(j.steps.length-1,Math.max(0,step));$('#journey').value=id;
    const changed=graph.name!=='journey-'+id+(innerWidth<=760?'-phone':'');
    state.mode='local';if(changed)draw();
    journeyPanel();if(history)setHash(`journey=${id}&step=${state.step}`);
  }
  function setHash(s){history.pushState(null,'','#'+s);}
  function source(id){
    const s=D.bank[id];if(!s)return;savedFocus=document.activeElement;
    $('#receipt-content').innerHTML=`<h2 id="receipt-title">${esc(s.file)}</h2><p>${esc(s.rev)} · ${esc(s.sha)} · ${s.isExtract?'assembled excerpt; local row numbers':'lines '+s.start+'–'+s.end}</p><pre tabindex="0" aria-label="Exact source excerpt">${esc(s.text.split('\n').map((l,i)=>String(i+s.start).padStart(4)+'  '+l).join('\n'))}</pre><p><a href="${s.url}" target="_blank" rel="noreferrer">Open pinned source on GitHub ↗</a> · <a href="#source-${s.id}" id="source-book-link">Find in offline source book ↓</a></p><p class="receipt-hash">Full source SHA-256: ${s.hash}</p>`;
    $('#source-dialog').showModal();
  }
  function closeSource(){if($('#source-dialog').open)$('#source-dialog').close();}
  function fromHash(){
    const s=new URLSearchParams(location.hash.slice(1));
    if(s.has('decision')){selectDecision(s.get('decision'),false);$('#network').scrollIntoView({behavior:'instant',block:'start'});}
    else if(s.has('station'))selectStation(s.get('station'),false);
    else if(s.has('journey'))selectJourney(s.get('journey'),Number(s.get('step'))||0,false);
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('button,a');if(!b)return;
    if(b.dataset.source)source(b.dataset.source);
    if(b.dataset.decision){selectDecision(b.dataset.decision);$('#network').scrollIntoView({block:'start'});}
    if(b.dataset.focus)focusStation(b.dataset.focus);
    if(b.dataset.mode){state.mode=b.dataset.mode;state.journey=null;$('#journey').value='';draw();state.decision?decisionPanel(state.decision):stationPanel(state.selected??'facade');}
    if(b.dataset.line){state.line=b.dataset.line;state.decision=null;state.journey=null;$('#journey').value='';draw();if(state.line==='all')stationPanel(state.selected??'facade');else{const l=line(state.line);setPanel(`<div class="inspection-number">${l.letter} LINE / ${l.name.toUpperCase()}</div><h3>${esc(l.promise)}.</h3>${discs([l.id])}<p>${esc({request:'Ordered guards choose warm, cold or fallback before later observations. The process gate authenticates before admission.',result:'The package captures output, finishes its transfer and acknowledges it before returning. Missing or malformed output becomes a controlled warm result.',recovery:'The only local branch is retry-safe. Uncertain work stays a controlled warm failure; accepted recovery goes back to the same request or its result.',lifecycle:'Start, status and stop share the facade but have separate mechanism paths. Navigation acceptance owns the idle reset.'}[l.id])}</p><p class="micro">${state.mode==='local'?'The local map now contains this line’s stops.':'Other lines are dimmed.'} Select a station to inspect its authority, or choose a journey below.</p><button class="decision-cta" data-decision="${{request:'routing',result:'output',recovery:'replay',lifecycle:'control'}[l.id]}">Read this line’s notice ↗</button>`);}}
    if(b.dataset.step!==undefined)selectJourney(state.journey,Number(b.dataset.step));
    if(b.id==='next-step')selectJourney(state.journey,state.step+1);
    if(b.id==='previous-step')selectJourney(state.journey,state.step-1);
    if(b.dataset.tour){const current=state.decision??node(state.selected??'facade').decision;const at=D.decisions.findIndex(d=>d.id===current);selectDecision(D.decisions[(at+Number(b.dataset.tour)+D.decisions.length)%D.decisions.length].id);}
    if(b.id==='close-source')closeSource();
    if(b.id==='source-book-link'){document.getElementById(b.hash.slice(1)).open=true;closeSource();}
  });
  $('#source-dialog').addEventListener('click',e=>{if(e.target===$('#source-dialog'))closeSource();});
  $('#source-dialog').addEventListener('close',()=>savedFocus?.isConnected&&savedFocus.focus({preventScroll:true}));
  $('#journey').innerHTML+=D.journeys.map(j=>`<option value="${j.id}">${esc(j.name)}</option>`).join('');
  $('#journey').addEventListener('change',e=>e.target.value?selectJourney(e.target.value):selectStation('facade'));
  $('#zoom-in').onclick=()=>svg.transition().duration(reduced?0:250).call(zoom.scaleBy,1.35);
  $('#zoom-out').onclick=()=>svg.transition().duration(reduced?0:250).call(zoom.scaleBy,1/1.35);
  $('#fit').onclick=()=>fit(true);
  window.addEventListener('hashchange',fromHash);window.addEventListener('popstate',fromHash);
  document.addEventListener('keydown',e=>{if($('#source-dialog').open||['SELECT','INPUT','TEXTAREA'].includes(e.target.tagName))return;if(e.key==='Escape'){state.decision=null;state.journey=null;state.line='all';selectStation('facade');fit(true);}if(e.key==='Home'&&e.target.closest('.map-section')){e.preventDefault();fit(true);}if(state.journey&&['ArrowRight','ArrowLeft'].includes(e.key)&&e.target.closest('.map-section')){e.preventDefault();selectJourney(state.journey,state.step+(e.key==='ArrowRight'?1:-1));}});
  new ResizeObserver(()=>{if(graph.name.endsWith('-phone')!==(innerWidth<=760))draw();else fit();}).observe($('#map'));
  draw();stationPanel('facade');fromHash();
  window.subwayDebug={state,fit,graph:()=>graph};
})();
