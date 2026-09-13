/* D3 owns gesture handling, transforms, interpolation and coordinate inversion. */
(() => {
  'use strict';
  const M = window.MICROSCOPE, sources = window.SOURCES.sources, recordings = window.RECORDINGS;
  const $ = (selector) => document.querySelector(selector);
  const svg = d3.select('#stage'), stage = svg.node(), mini = d3.select('#minimap');
  const color = { cold: '#9fbded', warm: '#c3e6a3', fallback: '#eea391', context: '#97bda3' };
  const names = ['Specimen', 'Box', 'Mechanism', 'Evidence'];
  let ratios = [1, 1.65, 4.3, 8.1];
  let thresholds = [1.4, 2.85, 6.2];
  const positions = d3.scalePoint().domain([1, 2, 3, 4]).range([205, 1195]);
  M.features.forEach(f => { if (f.guard) f.x = positions(f.guard); });
  const byId = new Map(M.features.map(f => [f.id, f]));
  const state = { focus: 'starting', sample: 'starting-mismatch', level: 0, ratio: 1 };
  let width = 0, height = 0, baseK = 1, changing = false, initialized = false, receiptReturn;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = () => width < 520;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const selected = () => byId.get(state.focus);
  const sample = () => recordings.rows.find(row => row.id === state.sample);

  const defs = svg.append('defs');
  const grid = defs.append('pattern').attr('id','graticule').attr('patternUnits','userSpaceOnUse').attr('width',40).attr('height',40);
  grid.append('path').attr('d','M0 4V0H4').attr('stroke','#789b8338').attr('stroke-width',.5).attr('fill','none');
  const hatch = defs.append('pattern').attr('id','unreached').attr('patternUnits','userSpaceOnUse').attr('width',12).attr('height',12).attr('patternTransform','rotate(32)');
  hatch.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',12).attr('stroke','#859c7950').attr('stroke-width',1);
  const arrow = defs.append('marker').attr('id','arrow').attr('viewBox','0 -4 8 8').attr('refX',7).attr('refY',0).attr('markerWidth',5).attr('markerHeight',5).attr('orient','auto');
  arrow.append('path').attr('d','M0,-3L7,0L0,3').attr('stroke','#96b789').attr('fill','none');
  const world = svg.append('g').attr('id','world');
  world.append('rect').attr('x',-700).attr('y',-500).attr('width',2800).attr('height',1780).attr('fill','url(#graticule)').attr('pointer-events','none');
  const specimen = world.append('g').attr('class','specimen-structure');
  specimen.append('rect').attr('x',42).attr('y',24).attr('width',1324).attr('height',724).attr('rx',32).attr('fill','none').attr('stroke','#6d8b6659').attr('stroke-width',1).attr('vector-effect','non-scaling-stroke');
  specimen.append('path').attr('d',d3.line()([[350,110],[490,110],[890,110],[1050,110]])).attr('stroke','#83a47b').attr('stroke-width',2).attr('stroke-dasharray','2 7').attr('fill','none');
  specimen.append('text').attr('x',700).attr('y',36).attr('text-anchor','middle').attr('fill','#91ad8b').attr('font-size',11).attr('font-family','monospace').text('PACKAGE-OWNED DaemonRoutingPolicy · selected routing tissue');
  const guide = specimen.append('g').attr('class','order-guide');
  const link = d3.linkHorizontal();
  for (let i=1; i<4; i++) {
    guide.append('path').attr('d',link({source:[positions(i)+40,157],target:[positions(i+1)-38,157]})).attr('fill','none').attr('stroke','#718f71').attr('stroke-width',1).attr('marker-end','url(#arrow)');
  }
  const guardGroups = specimen.selectAll('.guard').data(M.guards).join('g').attr('class','guard').attr('data-guard', d=>d.id).attr('transform',d=>`translate(${positions(d.id)},0)`);
  guardGroups.append('rect').attr('class','membrane').attr('x',-143).attr('y',201).attr('width',286).attr('height',443).attr('rx',108).attr('fill','#60815e0b').attr('stroke','#819d705e').attr('stroke-width',1).attr('vector-effect','non-scaling-stroke');
  guardGroups.append('rect').attr('class','not-reached').attr('x',-139).attr('y',205).attr('width',278).attr('height',435).attr('rx',106).attr('fill','url(#unreached)').attr('pointer-events','none');
  guardGroups.append('circle').attr('cx',0).attr('cy',157).attr('r',23).attr('fill','#213f34').attr('stroke','#a3bc80').attr('stroke-width',1).attr('vector-effect','non-scaling-stroke');
  guardGroups.append('text').attr('class','guard-number').attr('text-anchor','middle').attr('y',161).text(d=>`0${d.id}`);
  guardGroups.append('text').attr('class','guard-title').attr('text-anchor','middle').attr('y',192).text(d=>d.title);
  guardGroups.append('text').attr('class','guard-subtitle').attr('text-anchor','middle').attr('y',669).text(d=>d.subtitle);
  guardGroups.append('text').attr('class','reach-label').attr('text-anchor','middle').attr('y',628).attr('font-size',9).attr('font-family','monospace').attr('letter-spacing',1.5);
  guardGroups.attr('role','button').attr('tabindex',0).attr('aria-label',d=>`Inspect guard ${d.id}: ${d.title}`).on('click',(event,d)=>{ event.stopPropagation(); navigate(d.home,1); }).on('keydown',(event,d)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();navigate(d.home,1);}});
  const trace = specimen.append('g').attr('class','trace').attr('pointer-events','none');
  trace.append('path').attr('class','traversal').attr('fill','none').attr('stroke-width',2).attr('stroke-linecap','round').attr('vector-effect','non-scaling-stroke');
  trace.append('circle').attr('class','return-ring').attr('r',17).attr('fill','none').attr('stroke-width',1.5).attr('vector-effect','non-scaling-stroke');
  const features = world.append('g').attr('id','features').selectAll('.feature').data(M.features).join('g').attr('class','feature').attr('data-feature',d=>d.id).attr('transform',d=>`translate(${d.x},${d.y})`).attr('role','button').attr('tabindex',0).attr('aria-label',d=>`Inspect ${d.title}`);
  features.append('rect').attr('class','feature-hit').attr('x',-124).attr('y',-27).attr('width',248).attr('height',55).attr('fill','transparent');
  const shape = d3.symbol().size(105);
  features.append('path').attr('class','landmark').attr('d',d=>shape.type(d.op==='remove'?d3.symbolDiamond:d.op==='observe'?d3.symbolCircle:d3.symbolSquare)()).attr('transform','translate(-112,0)').attr('stroke',d=>color[d.route]).attr('stroke-width',1).attr('fill',d=>`${color[d.route]}1c`).attr('vector-effect','non-scaling-stroke');
  features.append('line').attr('x1',-100).attr('x2',110).attr('y1',25).attr('y2',25).attr('stroke','#69876250').attr('stroke-width',.5).attr('vector-effect','non-scaling-stroke');
  const overview = features.append('g').attr('class','semantic semantic-0');
  overview.append('text').attr('class','feature-short').attr('x',-96).attr('y',-1).attr('font-size',d=>d.guard?16:12).text(d=>d.short[0]);
  overview.append('text').attr('class','feature-result').attr('x',-96).attr('y',17).attr('fill',d=>color[d.route]).text(d=>d.short[1]);
  const box = features.append('g').attr('class','semantic semantic-1');
  box.append('text').attr('class','box-rule').attr('x',-95).attr('y',-7).text(d=>d.title.toUpperCase());
  box.append('text').attr('class','box-result').attr('x',-95).attr('y',8).attr('fill',d=>color[d.route]).text(d=>d.short[1]);
  box.append('text').attr('class','box-small').attr('x',-95).attr('y',20).text(d=>d.short[0]);
  const mechanism = features.append('g').attr('class','semantic semantic-2');
  const mechObject = mechanism.append('foreignObject').attr('x',-102).attr('y',-26).attr('width',218).attr('height',58);
  mechObject.append('xhtml:div').attr('class','micro-mechanism').html(d=>`<div class="micro-label">MECHANISM / ${escape(d.title.toUpperCase())}</div>${d.mechanism.map((line,i)=>`<div class="mechanism-line">${i+1} &nbsp;${escape(line)}</div>`).join('')}`);
  // Ordered check axes are laid out with D3; the route leaves at the first return.
  // This is source-traced structure, not an animation or synthetic runtime.
  mechanism.filter(d=>d.guard).each(function(f){
    const g=d3.select(this);g.select('foreignObject').remove();
    let labels=['PRESENT','STARTING','VERSION','OBSERVE'], stop=f.guard-1;
    let operations=['record','record','record','observe'];
    if(['pong-mismatch','pong-starting','warm'].includes(f.id)){
      labels=['PONG VERSION','PONG STATE','WARM'];operations=['observe','observe','observe'];
      stop=f.id==='pong-mismatch'?0:f.id==='pong-starting'?1:2;
    }else if(f.guard===4){
      labels=f.id==='exited'?['OBSERVE','EXITED','TRY REMOVAL']:['OBSERVE',f.id==='observe-error'?'THROWS / UNRESP.':f.id==='incompatible'?'INVALID KIND':'STARTING'];
      operations=labels.map((_,i)=>f.id==='exited'&&i===2?'remove':'observe');stop=labels.length-1;
    }
    const x=d3.scalePoint().domain(labels.map((_,i)=>i)).range([-82,88]);
    g.append('text').attr('x',-109).attr('y',-61).attr('class','mechanism-eyebrow').text('SOURCE-TRACED CHECK ORDER / '+f.title.toUpperCase());
    g.append('text').attr('x',-109).attr('y',-45).attr('class','mechanism-predicate').text(f.mechanism[0]);
    g.append('text').attr('x',-109).attr('y',-32).attr('class','mechanism-annotation').text(f.mechanism[1]);
    labels.forEach((label,i)=>{
      if(i<labels.length-1)g.append('path').attr('d',link({source:[x(i)+10,0],target:[x(i+1)-10,0]})).attr('fill','none').attr('stroke',i<stop?color[f.route]:'#607b67').attr('stroke-width',.6).attr('stroke-dasharray',i>=stop?'1.5 2':null);
      const node=g.append('g').attr('transform',`translate(${x(i)},0)`);
      const glyph=d3.symbol().size(200).type(operations[i]==='remove'?d3.symbolDiamond:operations[i]==='observe'?d3.symbolCircle:d3.symbolSquare);
      node.append('path').attr('d',glyph()).attr('fill',i>stop?'url(#unreached)':'#1b3c31').attr('stroke',i===stop?color[f.route]:'#8aa37a').attr('stroke-width',i===stop?1:.45);
      node.append('text').attr('text-anchor','middle').attr('y',-15).attr('class','mechanism-node-label').attr('fill',i>stop?'#8da48c':'#e0ecca').text(label);
      if(i>stop)node.append('text').attr('text-anchor','middle').attr('y',18).attr('class','mechanism-node-label').attr('fill','#8da48c').text('SKIPPED');
      else if(i<stop)node.append('text').attr('text-anchor','middle').attr('y',18).attr('class','mechanism-node-label').attr('fill','#8da48c').text('CONTINUE');
    });
    g.append('path').attr('d',d3.linkVertical()({source:[x(stop),9],target:[x(stop),38]})).attr('fill','none').attr('stroke',color[f.route]).attr('stroke-width',1);
    g.append('text').attr('x',x(stop)).attr('y',49).attr('text-anchor','middle').attr('class','mechanism-return').attr('fill',color[f.route]).text(f.short[1]);
    g.append('text').attr('x',-109).attr('y',74).attr('class','mechanism-annotation').text(f.mechanism[2]);
  });
  const evidence = features.append('g').attr('class','semantic semantic-3');
  const evidenceObject = evidence.append('foreignObject').attr('x',-92).attr('y',-28).attr('width',188).attr('height',59);
  evidenceObject.append('xhtml:div').attr('class','micro-evidence').html(d=>{
    const [key,from,to] = d.refs[0], source=sources[key];
    return `<div class="micro-label">${escape(source.side.toUpperCase())} ${source.sha.slice(0,7)} / ${escape(key)} : ${from}–${to} · scroll excerpt <button type="button" tabindex="-1" data-receipt="${d.id}">Receipt + context ↗</button></div><pre>${source.lines.slice(from-1,to).map((line,i)=>`<span class="line-n">${from+i}</span>${escape(line)}`).join('\n')}</pre>`;
  });
  features.on('click',(event,d)=>{ if(event.target.closest('.micro-evidence')) return; event.stopPropagation(); navigate(d.id,state.focus!==d.id?Math.max(1,state.level):Math.min(3,state.level+1)); }).on('keydown',(event,d)=>{
    if(event.target.closest('.micro-evidence'))return;
    if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();if(state.level===3 && state.focus===d.id) openReceipt(d.id);else navigate(d.id,Math.min(3,state.level+1));}
  });
  features.selectAll('[data-receipt]').on('click',(event)=>{event.stopPropagation();openReceipt(event.target.dataset.receipt);});
  features.selectAll('.micro-evidence, .micro-mechanism').on('wheel',(event)=>event.stopPropagation()).on('mousedown',(event)=>event.stopPropagation()).on('touchstart',(event)=>event.stopPropagation());

  mini.selectAll('.mini-guard').data(M.guards).join('rect').attr('class','mini-guard').attr('x',d=>positions(d.id)-139).attr('y',201).attr('width',278).attr('height',443).attr('rx',100).attr('stroke','#7d9e78').attr('fill','#34523d').attr('stroke-width',5);
  mini.selectAll('.mini-feature').data(M.features).join('circle').attr('class','mini-feature').attr('cx',d=>d.x).attr('cy',d=>d.y).attr('r',10).attr('fill',d=>color[d.route]);
  mini.append('rect').attr('id','mini-viewport').attr('fill','#d8eeb81a').attr('stroke','#edf7d2').attr('stroke-width',9);
  mini.append('circle').attr('id','mini-focus').attr('r',24).attr('fill','none').attr('stroke','#f1f4d9').attr('stroke-width',7);

  const zoom = d3.zoom().scaleExtent([.05,30]).translateExtent([[-600,-400],[2000,1180]]).clickDistance(6).touchable(()=>true).filter(event=>!event.target.closest('.micro-evidence, .micro-mechanism') && (!event.ctrlKey || event.type==='wheel') && !event.button).on('zoom',event=>{
    world.attr('transform',event.transform);
    state.ratio=event.transform.k/baseK;
    const previous=state.level;
    state.level = d3.bisect(thresholds,state.ratio);
    if(event.sourceEvent && state.level>=1){
      const center=event.transform.invert([width/2,(height-30)/2]);
      const closest=d3.least(M.features,f=>Math.hypot(f.x-center[0],f.y-center[1]));
      if(closest)state.focus=closest.id;
    }
    if(previous!==state.level || event.sourceEvent)updateSemantic();
    updateCameraReadout(event.transform);
  }).on('end',event=>{
    if(event.sourceEvent && initialized){writeHistory(false);announce();}
  });
  svg.call(zoom).on('dblclick.zoom',null);

  function updateCameraReadout(transform){
    $('#magnification').textContent=`${state.ratio.toFixed(1)}×`;
    const a=transform.invert([0,0]), b=transform.invert([width,height]);
    mini.select('#mini-viewport').attr('x',a[0]).attr('y',a[1]).attr('width',b[0]-a[0]).attr('height',b[1]-a[1]);
  }
  function updateSemantic(){
    const f=selected();
    features.classed('is-selected',d=>d.id===f.id).attr('aria-current',d=>d.id===f.id?'true':null);
    features.attr('tabindex',d=>state.level===0 || (state.level===1&&d.guard===f.guard) || d.id===f.id ? 0 : -1);
    guardGroups.attr('tabindex',state.level<2?0:-1);
    features.selectAll('.semantic').style('display','none');
    if(state.level<2)features.selectAll(`.semantic-${state.level}`).style('display',null);
    else features.filter(d=>d.id===f.id).selectAll(`.semantic-${state.level}`).style('display',null);
    features.selectAll('[data-receipt]').attr('tabindex',d=>state.level===3&&d.id===f.id?0:-1);
    features.select('.landmark').attr('opacity',d=>state.level<2||d.id===f.id?1:.35);
    features.filter(d=>d.id===f.id).raise();
    guardGroups.selectAll('.guard-title,.guard-subtitle,.guard-number,.reach-label').attr('opacity',state.level>=2?.07:1);
    guardGroups.select('.membrane').attr('opacity',state.level>=2?.3:1);
    specimen.select('.order-guide').attr('opacity',state.level>=2?.1:1);
    trace.attr('opacity',state.level>=2?.2:1);
    $('#selected-title').textContent=f.title;
    $('#focus-label').textContent=state.level===0?'SPECIMEN / ALL FOUR GUARDS':`${names[state.level].toUpperCase()} / ${f.guard?`GUARD 0${f.guard} / `:''}${f.title.toUpperCase()}`;
    $('#depth-description').textContent=[
      'All decisions are already named in the complete top layer.',
      'A guard and its return vocabulary. Select a feature to sharpen.',
      'The same return, resolved into operations and skipped work.',
      'Exact pinned lines at the same location. Open the receipt for context.'
    ][state.level];
    document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.level===state.level)));
    document.querySelectorAll('[data-note]').forEach(n=>n.classList.toggle('is-selected',n.dataset.note===f.note));
    $('#up').disabled=state.level===0;
    $('#next-depth').style.display=state.level===3?'none':'';
    $('#open-receipt').style.display=state.level===3 || (mobile()&&state.level>0)?'block':'none';
    $('#next-depth').textContent=state.level===0?'Enter specimen →':'Sharpen →';
    mini.select('#mini-focus').attr('cx',f.x).attr('cy',f.y);
    stage.dataset.level=String(state.level);stage.dataset.focus=state.focus;
  }
  function targetTransform(f,level){
    const k=baseK*ratios[level];
    let point=level===0?[700,390]:level===1&&f.guard?[f.x,412]:[f.x,f.y];
    return d3.zoomIdentity.translate(width/2,(height-35)/2).scale(k).translate(-point[0],-point[1]);
  }
  function navigate(id,level,{history=true,instant=false,transform=null}={}){
    if(!byId.has(id))id='starting';
    state.focus=id;state.level=Math.max(0,Math.min(3,level));
    changing=true;
    svg.interrupt();
    const target=transform||targetTransform(selected(),state.level);
    updateSemantic();
    if(instant||reduced.matches){svg.call(zoom.transform,target);finish();}
    else svg.transition().duration(650).call(zoom.transform,target).on('end',finish).on('interrupt',()=>{changing=false;});
    function finish(){changing=false;updateSemantic();if(history)writeHistory(true);announce();}
  }
  function announce(){ $('#announcer').textContent=`${names[state.level]} level. ${selected().title}. Recorded case: ${sample().name}, ${sample().head.route} ${sample().head.reason||''}.`; }
  function writeHistory(push){
    const t=d3.zoomTransform(stage), data={focus:state.focus,level:state.level,sample:state.sample,ratio:t.k/baseK,center:t.invert([width/2,(height-35)/2])};
    const hash=`#focus=${state.focus}&level=${state.level}&sample=${state.sample}`;
    if(push && location.hash!==hash)history.pushState(data,'',hash);else history.replaceState(data,'',hash);
  }
  function readLocation(historyState){
    const params=new URLSearchParams(location.hash.slice(1));
    state.sample=recordings.rows.some(r=>r.id===params.get('sample'))?params.get('sample'):'starting-mismatch';
    $('#sample').value=state.sample;updateRecording();
    const id=byId.has(params.get('focus'))?params.get('focus'):'starting';
    const level=Math.max(0,Math.min(3,Number(params.get('level'))||0));
    let transform=null;
    if(historyState?.center)transform=d3.zoomIdentity.translate(width/2,(height-35)/2).scale(baseK*historyState.ratio).translate(-historyState.center[0],-historyState.center[1]);
    navigate(id,level,{history:false,instant:true,transform});
  }
  function updateRecording(){
    const row=sample(), returned=M.sampleFeatures[row.id], f=byId.get(returned);
    guardGroups.select('.not-reached').attr('opacity',d=>d.id>row.stop ? .85 : 0);
    guardGroups.select('.reach-label').text(d=>d.id>row.stop?'NOT REACHED':d.id===row.stop?'FIRST RETURN':'CONTINUE').attr('fill',d=>d.id===row.stop?color[row.head.route]:'#8caa81');
    guardGroups.select('.membrane').attr('stroke',d=>d.id===row.stop?color[row.head.route]:'#819d705e');
    const points=[];
    for(let i=1;i<=row.stop;i++)points.push([positions(i),220]);
    points.push([f.x-112,f.y]);
    trace.select('.traversal').attr('d',d3.line().curve(d3.curveStepAfter)(points)).attr('stroke',color[row.head.route]).attr('opacity',.55);
    trace.select('.return-ring').attr('cx',f.x-112).attr('cy',f.y).attr('stroke',color[row.head.route]);
    features.classed('is-return',d=>d.id===returned);
    $('#result-kind').textContent=row.head.route;
    $('#result-reason').textContent=row.head.reason||'warm route';
    for(const side of ['base','head'])for(const effect of ['read','observe','remove'])$(`#${side}-${effect}`).textContent=row[side].effects[effect];
    $('#recording-status').textContent='Same measured outcome on both builds';
    $('#find-return').textContent=`Locate guard 0${row.stop} return ↗`;
    stage.dataset.sample=row.id;stage.dataset.return=returned;
    mini.selectAll('.mini-guard').attr('fill',d=>d.id>row.stop?'#263d34':d.id===row.stop?'#6d8262':'#34523d');
  }
  function openReceipt(id=state.focus){
    const f=byId.get(id);receiptReturn=document.activeElement;
    $('#receipt-title').textContent=f.title;$('#receipt-detail').textContent=f.detail;
    $('#receipt-tabs').replaceChildren();
    f.refs.forEach((ref,i)=>{
      const b=document.createElement('button');b.type='button';b.textContent=ref[3];b.addEventListener('click',()=>showWitness(f,i));$('#receipt-tabs').append(b);
    });
    showWitness(f,0);
    if(!$('#receipt-dialog').open)$('#receipt-dialog').showModal();
  }
  function showWitness(f,index){
    const [key,from,to] = f.refs[index], source=sources[key];
    $('#receipt-meta').textContent=`${source.side.toUpperCase()} · ${source.sha}\n${source.path} : ${from}–${to}\nSHA-256 ${source.sha256}`;
    $('#receipt-code').innerHTML=source.lines.slice(from-1,to).map((line,i)=>`<span class="line-n">${from+i}</span>${escape(line)}`).join('\n');
    $('#full-source').href=`source-book.html#${key}-L${from}`;
    Array.from($('#receipt-tabs').children).forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));
    $('#receipt-dialog').dataset.feature=f.id;$('#receipt-dialog').dataset.witness=String(index);
  }
  function nextFeature(direction){
    const index=M.features.findIndex(f=>f.id===state.focus), next=M.features[(index+direction+M.features.length)%M.features.length];
    navigate(next.id,Math.max(1,state.level));
  }
  function nextDepth(){navigate(state.focus,Math.min(3,state.level+1));}
  document.querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>navigate(state.focus,+b.dataset.level)));
  document.querySelectorAll('[data-focus]').forEach(a=>a.addEventListener('click',event=>{
    event.preventDefault();navigate(a.dataset.focus,1);
    if(matchMedia('(max-width:900px)').matches)document.querySelector('.instrument').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
  }));
  $('#brand').addEventListener('click',event=>{event.preventDefault();navigate(state.focus,0);});
  $('#home').addEventListener('click',()=>navigate(state.focus,0));
  $('#up').addEventListener('click',()=>navigate(state.focus,Math.max(0,state.level-1)));
  $('#next-depth').addEventListener('click',nextDepth);
  $('#open-receipt').addEventListener('click',()=>openReceipt());
  $('#prev-feature').addEventListener('click',()=>nextFeature(-1));
  $('#next-feature').addEventListener('click',()=>nextFeature(1));
  $('#find-return').addEventListener('click',()=>navigate(M.sampleFeatures[state.sample],Math.max(1,state.level)));
  $('#close-receipt').addEventListener('click',()=>$('#receipt-dialog').close());
  $('#receipt-dialog').addEventListener('close',()=>receiptReturn?.focus({preventScroll:true}));
  for(const row of recordings.rows){const option=document.createElement('option');option.value=row.id;option.textContent=row.name;$('#sample').append(option);}
  $('#sample').addEventListener('change',()=>{state.sample=$('#sample').value;updateRecording();writeHistory(true);announce();});
  window.addEventListener('popstate',event=>readLocation(event.state));
  window.addEventListener('hashchange',()=>{if(!changing)readLocation(history.state);});
  document.addEventListener('keydown',event=>{
    if($('#receipt-dialog').open || event.target.closest('select,input,textarea,pre,.micro-evidence'))return;
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    if(['1','2','3','4'].includes(event.key)){event.preventDefault();navigate(state.focus,Number(event.key)-1);}
    else if(event.key==='Home'){event.preventDefault();navigate(state.focus,0);}
    else if(event.key==='Escape'){event.preventDefault();navigate(state.focus,Math.max(0,state.level-1));}
    else if(event.key===']'){event.preventDefault();nextFeature(1);}
    else if(event.key==='['){event.preventDefault();nextFeature(-1);}
    else if(event.target===stage && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
      event.preventDefault();const k=d3.zoomTransform(stage).k;const delta=60/k;
      svg.call(zoom.translateBy,event.key==='ArrowLeft'?delta:event.key==='ArrowRight'?-delta:0,event.key==='ArrowUp'?delta:event.key==='ArrowDown'?-delta:0);writeHistory(false);
    }
  });
  const resize = new ResizeObserver(()=>{
    const previous=d3.zoomTransform(stage), center=initialized?previous.invert([width/2,(height-35)/2]):[700,390], previousLevel=state.level;
    let ratio=initialized?previous.k/baseK:1;
    svg.interrupt();
    width=stage.clientWidth;height=stage.clientHeight;
    baseK=Math.max(.05,Math.min((width-36)/1400,(height-113)/780));
    ratios=[1,1.65,mobile()?5.6:4.3,Math.min(mobile()?18:9.8,(width-(mobile()?40:90))/((mobile()?110:188)*baseK))];
    thresholds=[1.4,(ratios[1]+ratios[2])/2,(ratios[2]+ratios[3])/2];
    if(initialized && d3.bisect(thresholds,ratio)!==previousLevel)ratio=ratios[previousLevel];
    zoom.extent([[0,0],[width,height]]).scaleExtent([baseK*.7,baseK*22]);
    if(mobile()){
      evidenceObject.attr('x',-55).attr('width',110).attr('height',100).attr('y',-45);
      evidenceObject.select('.micro-evidence').style('font-size','4.4px');evidenceObject.select('.micro-label').style('font-size','3.4px');evidenceObject.select('button').style('font-size','3.8px');
      mechObject.attr('height',106).attr('y',-48);mechObject.select('.micro-mechanism').style('font-size','8.5px');
    }else{
      evidenceObject.attr('x',-92).attr('width',188).attr('height',59).attr('y',-28);evidenceObject.select('.micro-evidence').style('font-size',null);evidenceObject.select('.micro-label').style('font-size',null);evidenceObject.select('button').style('font-size',null);
      mechObject.attr('height',58).attr('y',-26);mechObject.select('.micro-mechanism').style('font-size',null);
    }
    if(!initialized){readLocation(null);initialized=true;writeHistory(false);}
    else {const t=d3.zoomIdentity.translate(width/2,(height-35)/2).scale(baseK*ratio).translate(-center[0],-center[1]);svg.call(zoom.transform,t);updateSemantic();writeHistory(false);}
  });
  resize.observe(stage);
  // Read-only instrumentation for reproducible interaction checks.
  window.microscope = { getState:()=>({...state, transform:{...d3.zoomTransform(stage)},baseK,width,height}), features:M.features.map(f=>({id:f.id,x:f.x,y:f.y,guard:f.guard})), navigate, openReceipt };
})();
