(() => {
 'use strict';
 const D=window.INSTRUMENT,$=s=>document.querySelector(s),esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const colors={core:'#8dd9bb',ts:'#e9b987',probe:'#b7b5d9'};
 const soloRows={all:Object.keys(D.rows),release:['backend','service','graph','configured','inferred','probe'],cache:['lifetime','service'],turn:['state','service','lifetime']};
 const soloText={all:'All owners visible and audible',release:'Service + backend waiting on project release',cache:'Clearing, reuse and lookup identity',turn:'Workspace state → begin turn → cache clear'};
 const relText={ready:'ready',pending:'≋ both pending',following:'↟ awaiting backend',split:'⋈ completion split',aligned:'= completion aligned',different:'≠ outcomes differ'};
 const relLong={ready:'Release has not reached the project graph.',pending:'Backend and project graph are both pending.',following:'Project graph settled; completion is travelling through service to backend.',split:'Backend fulfilled while project graph is pending.',aligned:'Backend and project graph have matching completion.',different:'Backend fulfilled; project graph rejected.'};
 let score=D.scores[0],step=0,solo='all',playing=false,returnFocus=null;
 const dimensions={width:1120,left:164,right:30,row:34,top:22,bottom:14};
 let scales={};
 function options(){return {sound:$('#sound').checked,listen:$('#listen').value,tempo:+$('#tempo').value,solo,rows:soloRows[solo]};}
 function count(){return Math.max(...Object.values(score.runs).map(r=>r.events.length));}
 function stop(){MusicSound.stop();playing=false;$('#play').innerHTML='▶ <span>Play</span>';$('#play').setAttribute('aria-label','Play recording');}
 function sourceId(event,build){
  if(event.row==='service'&&event.label.includes('release'))return 'release-'+build;
  if(event.row==='service'&&event.label.includes('findDefinitions'))return 'query-'+build;
  return event.source;
 }
 function description(event,build){
  const owner=event.row==='lifetime'?(build==='head'?'Core’s six cache handles':'Service’s six Maps'):D.rows[event.row].name;
  if(event.type==='clear')return owner+' clear synchronously.';
  if(event.type==='hit')return 'Definition lookup hits the existing entry.';
  if(event.type==='miss')return 'Definition lookup misses; a new search is needed.';
  if(event.type==='store')return 'Definition cache stores the new promise immediately.';
  if(event.type==='gate')return event.label.replace('test ','Probe ')+'.';
  if(event.kind==='unhandled')return 'Node observes the unhandled project rejection.';
  const method=event.label.includes('findDefinitions')?'definition search':event.label.includes('beginTurn')?'beginTurn':event.label.includes('release')?'release':'refresh';
  return owner+' '+method+' '+(event.type==='start'?'starts':event.type==='reject'?'rejects':event.kind==='return'?'returns synchronously':'settles')+'.';
 }
 function sourceHTML(ids){
  return [...new Set(ids)].map(id=>{
   const r=D.receipts.find(r=>r.id===id);if(!r)return `<p>Receipt unavailable: ${esc(id)}</p>`;
   return `<section class="source"><h3>${esc(r.path)}</h3><p class="source-meta">${r.build==='bundle'?'SUPPLIED PR BODY':r.build.toUpperCase()+' · '+r.commit.slice(0,12)+' · lines '+r.start+'–'+r.end}</p><pre>${r.text.split('\n').map((l,i)=>esc(String(r.start+i).padStart(4)+'  '+l)).join('\n')}</pre><a href="sources.html#${r.id}">Open in source book ↗</a></section>`;
  }).join('');
 }
 function openDialog(title,body,target){
  stop();returnFocus=target||document.activeElement;$('#inspector-title').textContent=title;$('#inspector-body').innerHTML=body;
  $('#inspector').showModal();$('#inspector').scrollTop=0;$('#close-inspector').focus();
 }
 function inspectEvent(build,index,target){
  setStep(index);const run=score.runs[build],e=run.events[Math.min(index,run.events.length-1)],id=sourceId(e,build);
  const ids=[id];if(e.row==='lifetime'&&e.type!=='clear')ids.push('lifetime-'+build);if(e.row==='service'&&e.label.includes('release'))ids.push('backend-'+build,'graph-'+build);
  openDialog(description(e,build),`<p><b>${build==='base'?'#126 base':'#127 head'}</b> · selected step ${index+1} · raw event ${e.seqs.join(', ')}<br>${esc(score.limit)}</p><p>${esc(e.label)}${e.detail?' · '+esc(e.detail):''}${e.outcome?' · '+esc(e.outcome):''}</p><p>${e.type==='clear'?'Arranged as one chord. Source performs six clears in sequence, synchronously. ':''}<a href="${run.path}">Open complete raw recording ↗</a></p>${sourceHTML(ids)}`,target);
 }
 function drawRoll(build){
  const run=score.runs[build],rows=run.rows,w=dimensions.width,h=dimensions.top+rows.length*dimensions.row+dimensions.bottom;
  const shell=d3.select('#rolls').append('article').attr('class','roll').attr('data-build',build);
  shell.append('div').attr('class','roll-head').html(`<div class="roll-build"><b>${build==='base'?'#126':'#127'}</b><span>${build==='base'?'BASE':'HEAD'}</span><small>${build==='base'?'service clears Maps':'core owns clearing'}</small></div><span class="relation-pill" id="relation-${build}"></span>`);
  const svg=shell.append('div').attr('class','roll-body').append('svg').attr('viewBox',`0 0 ${w} ${h}`).attr('aria-label',`${build==='base'?'Base #126':'Head #127'} owner tracks; recorded lifecycle events`).attr('role','group');
  svg.append('title').text('Selected event order, not elapsed time. Enter or click a note to inspect it. Arrow keys move within the score.');
  const x=d3.scaleBand().domain(d3.range(count())).range([dimensions.left,w-dimensions.right]).padding(.15);
  const y=d3.scaleBand().domain(rows).range([dimensions.top,h-dimensions.bottom]).padding(.12);scales[build]={x,y};
  const defs=svg.append('defs'),pattern=defs.append('pattern').attr('id','hatch-'+build).attr('width',5).attr('height',5).attr('patternUnits','userSpaceOnUse').attr('patternTransform','rotate(35)');
  pattern.append('rect').attr('width',2).attr('height',5).attr('fill','#cde5d6');
  const pkg=row=>row==='lifetime'&&build==='base'?'ts':D.rows[row].pkg;
  const rowG=svg.selectAll('.owner').data(rows).join('g').attr('class','owner').attr('data-row',d=>d);
  rowG.append('rect').attr('class','row-bg').attr('x',0).attr('y',r=>y(r)).attr('width',w).attr('height',y.bandwidth());
  rowG.append('line').attr('class','row-seam').attr('x1',dimensions.left-10).attr('x2',w-15).attr('y1',r=>y(r)+y.bandwidth()).attr('y2',r=>y(r)+y.bandwidth());
  const labels=rowG.append('g').attr('class','track-label').attr('role','button').attr('tabindex',0).attr('aria-label',r=>`Inspect ${D.rows[r].name} ownership`).on('click',function(e,r){openOwner(build,r,this);}).on('keydown',function(e,r){if(e.key==='Enter'||e.key===' '){e.preventDefault();openOwner(build,r,this);}});
  labels.append('rect').attr('x',13).attr('y',r=>y(r)+8).attr('width',3).attr('height',16).attr('fill',r=>colors[pkg(r)]);
  labels.append('text').attr('class','row-name').attr('x',23).attr('y',r=>y(r)+12).text(r=>D.rows[r].name);
  labels.append('text').attr('class','pkg-name').attr('x',23).attr('y',r=>y(r)+23).text(r=>r==='lifetime'?(build==='base'?'TYPESCRIPT · SIX MAPS':'CORE · SIX HANDLES'):pkg(r)==='ts'?'BACKEND–TYPESCRIPT':pkg(r)==='core'?'CORE':'PROBE / NODE');
  rowG.filter(r=>!run.events.some(e=>e.row===r)).append('text').attr('class','pkg-name').attr('x',dimensions.left+12).attr('y',r=>y(r)+17).text('no call in this selected recording');
  svg.selectAll('.column').data(d3.range(count())).join('line').attr('class','grid-line').attr('x1',i=>x(i)+x.bandwidth()/2).attr('x2',i=>x(i)+x.bandwidth()/2).attr('y1',dimensions.top-3).attr('y2',h-dimensions.bottom);
  svg.selectAll('.tick-label').data(d3.range(count())).join('text').attr('class','tick-label').attr('text-anchor','middle').attr('x',i=>x(i)+x.bandwidth()/2).attr('y',13).text(i=>String(i+1).padStart(2,'0'));
  svg.append('rect').attr('class','playhead').attr('y',dimensions.top-3).attr('height',h-dimensions.top-dimensions.bottom+3);
  svg.append('line').attr('class','playhead-line').attr('y1',dimensions.top-3).attr('y2',h-dimensions.bottom);
  svg.selectAll('.tail').data(run.bands).join('rect').attr('class','tail').attr('data-row',b=>b.row).attr('x',b=>x(b.start)+x.bandwidth()/2).attr('y',b=>y(b.row)+8).attr('width',b=>x(b.end)-x(b.start)).attr('height',7).attr('fill',`url(#hatch-${build})`).attr('stroke','#b4d2bf').attr('stroke-width',.5).append('title').text(b=>b.label+' has not completed through this interval');
  const notes=svg.selectAll('.note').data(run.events).join('g').attr('class','note').attr('data-row',e=>e.row).attr('data-index',(_,i)=>i).attr('tabindex',(_,i)=>i===0?0:-1).attr('role','button').attr('aria-label',(e,i)=>`Step ${i+1}: ${description(e,build)}`).attr('transform',(e,i)=>`translate(${x(i)+x.bandwidth()/2},${y(e.row)+11.5})`).on('click',function(ev,e){inspectEvent(build,run.events.indexOf(e),this);}).on('keydown',function(ev,e){const i=run.events.indexOf(e);if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();inspectEvent(build,i,this);}if(['ArrowRight','ArrowLeft','Home','End'].includes(ev.key)){ev.preventDefault();let next=ev.key==='Home'?0:ev.key==='End'?run.events.length-1:i+(ev.key==='ArrowRight'?1:-1);next=Math.max(0,Math.min(run.events.length-1,next));setStep(next);svg.select(`.note[data-index="${next}"]`).node().focus();}});
  notes.append('rect').attr('class','note-hit').attr('x',-x.bandwidth()/2).attr('y',-10).attr('width',x.bandwidth()).attr('height',28).attr('rx',3);
  notes.each(function(e){const g=d3.select(this),color=e.type==='reject'?'#ed9a9a':colors[pkg(e.row)];
   if(e.type==='clear'){g.selectAll('circle.gong').data(d3.range(6)).join('circle').attr('class','gong').attr('cx',i=>(i%3-1)*6).attr('cy',i=>Math.floor(i/3)*6-3).attr('r',2.3).attr('fill',color);}
   else if(e.type==='reject'){g.append('path').attr('d','M-4,-4 L4,4 M4,-4 L-4,4').attr('stroke',color).attr('stroke-width',2.3);}
   else if(['finish','store'].includes(e.type)){g.append('rect').attr('x',-4).attr('y',-4).attr('width',8).attr('height',8).attr('rx',e.type==='store'?2:0).attr('fill',color);}
   else if(e.type==='gate'){g.append('path').attr('d',d3.symbol().type(d3.symbolDiamond).size(55)()).attr('fill','none').attr('stroke',color);}
   else{g.append('circle').attr('r',e.type==='hit'?4:4.5).attr('fill',e.type==='miss'?'#14272d':color).attr('stroke',color).attr('stroke-width',1.6);if(e.type==='hit')g.append('circle').attr('r',1.7).attr('fill','#14272d');}
   if(e.short.length>7)g.append('rect').attr('class','label-backing').attr('x',-24).attr('y',9).attr('width',48).attr('height',10);
   g.append('text').attr('class','note-label').attr('text-anchor','middle').attr('y',17).text(e.short);
  });
 }
 function openOwner(build,row,target){
  const id=row==='probe'?'intent':row==='lifetime'?'lifetime-'+build:row==='service'?((score.group==='release'?'release-':'service-')+build):row+'-'+build;
  openDialog(D.rows[row].name,`<p>${esc(D.rows[row].detail)}. ${row==='lifetime'?(build==='head'?'The service holds one core scope; each handle keeps an independent Map.':'The service itself holds and clears the six Maps.'):'The track names the owner executing these selected events.'}</p>${sourceHTML([id])}`,target);
 }
 function draw(){
  $('#rolls').innerHTML='';for(const b of ['base','head'])drawRoll(b);
  $('#scenario-hint').textContent=score.hint;$('#scenario-limit').textContent=score.limit;
  $('.console-heading h2').textContent=score.group==='release'?'Follow the release boundary.':'Follow the successful turn.';
  document.querySelectorAll('[data-score]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.score===score.id)));
  $('#scrub').max=count()-1;
  $('#text-score').innerHTML=['base','head'].map(b=>`<div><b>${b==='base'?'#126 BASE':'#127 HEAD'}</b><ol>${score.runs[b].events.map((e,i)=>`<li><button data-note-build="${b}" data-note-index="${i}">${esc(description(e,b))} [raw ${e.seqs.join(', ')}]</button></li>`).join('')}</ol></div>`).join('');
  document.querySelectorAll('[data-note-index]').forEach(el=>el.addEventListener('click',()=>inspectEvent(el.dataset.noteBuild,+el.dataset.noteIndex,el)));
  const split=score.runs.base.checkpoints.findIndex(c=>c.relation==='split'||c.relation==='different');
  $('#checkpoint').textContent=split>=0?'Jump to the split ↗':score.id==='refresh-fails'?'Jump to preserved entry ↗':score.id==='late-answer'?'Jump to the late answer ↗':'Jump to the clearing chord ↗';
  applySolo();setStep(step);
 }
 function applySolo(){
  document.querySelectorAll('[data-solo]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.solo===solo));b.disabled=(b.dataset.solo==='turn'&&score.group!=='turn')||(b.dataset.solo==='release'&&score.group!=='release');b.title=b.disabled?'Choose a '+(b.dataset.solo==='turn'?'refresh':'release')+' recording to solo this boundary':'';});$('#solo-description').textContent=soloText[solo];
  d3.selectAll('.owner,.note,.tail').classed('muted-track',function(){return !soloRows[solo].includes(this.dataset.row);});
 }
 function setStep(i){
  step=Math.max(0,Math.min(count()-1,i));$('#scrub').value=step;$('#step-label').textContent=`${String(step+1).padStart(2,'0')} / ${count()}`;
  const states=[];
  for(const build of ['base','head']){
   const run=score.runs[build],actual=Math.min(step,run.events.length-1),cp=run.checkpoints[actual],e=run.events[actual],svg=d3.select(`.roll[data-build="${build}"] svg`),{x}=scales[build];
   svg.select('.playhead').attr('x',x(step)-2).attr('width',x.bandwidth()+4);svg.select('.playhead-line').attr('x1',x(step)+x.bandwidth()/2).attr('x2',x(step)+x.bandwidth()/2);
   svg.selectAll('.note').classed('selected',(_,index)=>index===actual).attr('tabindex',(_,index)=>index===actual?0:-1);
   svg.selectAll('.tail').classed('active',b=>b.start<=actual&&b.end>actual);
   const pill=$('#relation-'+build);pill.textContent=score.group==='release'?relText[cp.relation]:(cp.cache==='old entry'?'old entry retained':cp.cache==='empty'?'cleared · empty':'new entry stored');pill.className='relation-pill '+cp.relation;
   const symbol={ready:'·',pending:'≋',following:'↟',split:'⋈',aligned:'=',different:'≠'}[cp.relation];
   states.push(`<div class="state-pair"><div class="state-build">${build==='base'?'#126 BASE':'#127 HEAD'} · ${actual+1}/${run.events.length}${step>=run.events.length?' · end':''}</div><p class="state-title"><span class="state-symbol ${cp.relation}">${symbol}</span>${esc(description(e,build))}</p><p class="state-detail">${score.group==='release'?esc(relLong[cp.relation])+'<br>':''}Definition cache: <b>${esc(cp.cache)}</b>${score.group==='release'?' · backend '+esc(cp.backend)+' / graph '+esc(cp.graph):''}</p></div>`);
  }
  $('#status-pair').innerHTML=states.join('');$('#back').disabled=step===0;$('#next').disabled=step===count()-1;
 }
 function choose(id,push=true){stop();score=D.scores.find(s=>s.id===id)||D.scores[0];if((solo==='release'&&score.group!=='release')||(solo==='turn'&&score.group!=='turn'))solo='all';step=0;draw();if(push)history.replaceState(null,'','#score='+score.id);}
 async function play(){if(playing){stop();return;}if(step===count()-1)setStep(0);playing=true;$('#play').innerHTML='Ⅱ <span>Pause</span>';$('#play').setAttribute('aria-label','Pause recording');await MusicSound.play(score,step,options(),setStep,stop,e=>{$('#sound').checked=false;$('#audio-label').textContent='off';$('#audio-status').textContent='Audio unavailable; visual playback continues.';});}
 async function preview(){try{await MusicSound.preview(score,step,options());}catch(e){$('#sound').checked=false;$('#audio-label').textContent='off';$('#audio-status').textContent='Audio unavailable; visual controls remain active.';}}
 $('.scenario-tabs').innerHTML=D.scores.map(s=>`<button data-score="${s.id}" aria-pressed="${s.id===score.id}">${esc(s.title)}</button>`).join('');
 document.querySelectorAll('[data-score]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.score)));
 document.querySelectorAll('[data-solo]').forEach(b=>b.addEventListener('click',()=>{stop();solo=b.dataset.solo;applySolo();}));
 $('#play').addEventListener('click',play);$('#restart').addEventListener('click',()=>{stop();setStep(0);});$('#back').addEventListener('click',()=>{stop();setStep(step-1);preview();});$('#next').addEventListener('click',()=>{stop();setStep(step+1);preview();});
 $('#scrub').addEventListener('input',()=>{stop();setStep(+$('#scrub').value);});$('#scrub').addEventListener('change',preview);
 $('#sound').addEventListener('change',()=>{stop();$('#audio-label').textContent=$('#sound').checked?'on':'off';$('#audio-status').textContent=$('#sound').checked?'Audio + visual · owner pitches and boundary intervals':'Silent mode · every sound has a visible equivalent';preview();});
 $('#listen').addEventListener('change',()=>{stop();preview();});$('#tempo').addEventListener('input',()=>{stop();$('#tempo-label').value=$('#tempo').value;});
 $('#checkpoint').addEventListener('click',()=>{stop();const run=score.runs.base;let i=run.checkpoints.findIndex(c=>['split','different'].includes(c.relation));if(i<0)i=score.id==='refresh-fails'?run.events.findIndex(e=>e.type==='hit'):score.id==='late-answer'?run.events.findIndex(e=>e.type==='gate'):run.events.findIndex(e=>e.type==='clear');setStep(Math.max(0,i));preview();});
 document.querySelectorAll('[data-sources]').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.jump){choose(b.dataset.jump);solo=b.dataset.boundary||'all';applySolo();}
  openDialog(b.closest('.decision').querySelector('h3').textContent,sourceHTML(b.dataset.sources.split(',')),b);
 }));
 $('#close-inspector').addEventListener('click',()=>$('#inspector').close());$('#back-to-score').addEventListener('click',()=>$('#inspector').close());
 $('#inspector').addEventListener('close',()=>returnFocus?.focus({preventScroll:true}));
 $('#inspector').addEventListener('click',e=>{if(e.target===$('#inspector')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
 document.addEventListener('keydown',e=>{if(e.code==='Space'&&!$('#inspector').open&&!/INPUT|BUTTON|SELECT|TEXTAREA|SUMMARY/.test(e.target.tagName)&&e.target.getAttribute('role')!=='button'){e.preventDefault();play();}});
 window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 window.addEventListener('hashchange',()=>{const match=location.hash.match(/^#score=(.+)/);if(match&&D.scores.some(s=>s.id===match[1]))choose(match[1],false);});
 const initial=location.hash.match(/^#score=(.+)/);choose(initial?.[1]||'release-held',false);
 window.InstrumentApp={choose,setStep,stop,get state(){return {score:score.id,step,solo,playing,options:options()};},description,sourceId};
})();
