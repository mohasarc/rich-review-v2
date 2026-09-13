(() => {
'use strict';
const D=window.FIELD, R=window.RECORDINGS, $=s=>document.querySelector(s);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const B=D.boundaries, byId=new Map(D.cells.map(c=>[c.id,c]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shapes={state:d3.symbolSquare,gate:d3.symbolDiamond,dispatch:d3.symbolTriangle,effect:d3.symbolCircle};
const symbol=(b,size=180)=>d3.symbol().type(shapes[b.kind]).size(b.kind==='gate'?size*.67:size)();
const turn=d3.scaleBand().domain(B.slice(0,7).map(b=>b.id)).range([205,695]).padding(.08);
const ack=d3.scaleBand().domain(['cleanup','ack']).range([718,851]).padding(.08);
const x=id=>(turn(id)??ack(id))+((turn(id)!==undefined?turn:ack).bandwidth()/2);
const sy=d3.scaleBand().domain(D.rows.map(r=>r.number)).range([84,550]).padding(.10);
const y=n=>sy(n)+sy.bandwidth()/2;
const boundary=id=>B.find(b=>b.id===id);
const tint=c=>{const co=d3.hsl(D.owners[c.owner].color);if(boundary(c.boundary).reason==='unexplained')co.s*=.30;return co.formatHex();};
let selected='149-stream',step=1,playing=false,timer=null,lastDialogFocus=null;
const labels=['Baseline','Source byte cache','Revisioned state','Project membership','Semantic turn scope','Workspace sessions','State directory','Policy snapshot','Policy consumers','Command identity','Failure vocabulary','Admission authority','Injected executor','Lifecycle renderer','Wire framing','Result receiver','Outbound sockets','Lifecycle exchanges','Inbound sockets','Execution recovery','Transport composition','Activity projection','Worker generations','Delivery session','Execution session','Package staged · CLI active','CLI → daemon package'];

const svg=d3.select('#field').attr('role','grid').attr('aria-rowcount',27).attr('aria-colcount',9);
svg.append('text').attr('x',5).attr('y',24).attr('fill','#779a89').attr('font-family','var(--mono)').attr('font-size',9).text('STACK ORDER ↓');
svg.append('text').attr('x',209).attr('y',22).attr('fill','#abc2af').attr('font-family','var(--mono)').attr('font-size',9).text('TURN DEPENDENCIES →');
svg.append('text').attr('x',718).attr('y',22).attr('fill','#a9b9b1').attr('font-family','var(--mono)').attr('font-size',8).text('SEPARATE ACK BRANCH');
svg.append('line').attr('x1',704).attr('x2',704).attr('y1',30).attr('y2',556).attr('class','branch-line');
const headers=svg.append('g');
B.forEach(b=>{
 const g=headers.append('g').attr('transform',`translate(${x(b.id)},0)`);
 g.append('text').attr('text-anchor','middle').attr('y',43).attr('fill','#e3d4a4').attr('font-family','var(--mono)').attr('font-size',10).text(b.letter);
 const words={accept:['Accept','once'],worker:['Await','worker'],seal:['Seal','bytes'],terminal:['Publish','terminal'],stream:['Wait for','stream'],sample:['Sample at','boundary'],next:['Next','turn'],cleanup:['Try','cleanup'],ack:['Record','ACK']}[b.id];
 words.forEach((w,i)=>g.append('text').attr('text-anchor','middle').attr('y',58+i*12).attr('fill','#95afa0').attr('font-family','var(--mono)').attr('font-size',9).text(w));
});
const backing=svg.append('g');
backing.selectAll('rect').data(D.rows).join('rect').attr('x',199).attr('y',r=>sy(r.number)).attr('width',656).attr('height',sy.bandwidth()).attr('fill',(r,i)=>i%2?'#15201d':'#17231f');
const selection=svg.append('g').attr('aria-hidden',true);
selection.append('rect').attr('class','column-selection').attr('y',80).attr('height',475).attr('width',62).attr('fill','#adc1a9').attr('opacity',.045);
selection.append('rect').attr('class','row-selection').attr('x',0).attr('width',855).attr('height',sy.bandwidth()+2).attr('fill','#b6c6a8').attr('opacity',.065);
svg.append('rect').attr('x',0).attr('y',sy(149)-2).attr('width',855).attr('height',sy.bandwidth()+4).attr('fill','none').attr('stroke','#5b896e').attr('stroke-width',1);
svg.append('line').attr('x1',0).attr('x2',853).attr('y1',sy(145)-4).attr('y2',sy(145)-4).attr('stroke','#627a64').attr('stroke-width',.6).attr('stroke-dasharray','3 3');
svg.append('g').selectAll('text').data(D.rows).join('text').attr('class','row-label').attr('x',5).attr('y',r=>y(r.number)+3).attr('fill',r=>r.number>=145?'#d2cfaf':'#829c8e').attr('font-family','var(--mono)').attr('font-size',9).attr('role','button').attr('tabindex',-1).attr('aria-label',r=>`${r.label}: ${r.title}`).each(function(r,i){
 const t=d3.select(this);t.append('tspan').attr('fill',r.number===149?'#bad7b3':'#a7b59f').text(r.number===0?'main':String(r.number));t.append('tspan').attr('x',39).attr('font-size',9).text(labels[i]);t.append('title').text(r.title+' · '+r.sha);
}).on('click',(_,r)=>choose(`${r.number}-${byId.get(selected).boundary}`));
const rows=svg.append('g').selectAll('g').data(D.rows).join('g').attr('role','row').attr('aria-rowindex',(_,i)=>i+1);
const cell=rows.selectAll('g').data(r=>D.cells.filter(c=>c.pr===r.number)).join('g').attr('class','field-cell').attr('data-cell-id',c=>c.id).attr('role','gridcell').attr('transform',c=>`translate(${x(c.boundary)},${y(c.pr)})`).attr('aria-colindex',c=>B.indexOf(boundary(c.boundary))+1).attr('aria-label',c=>`${c.pr||'main'}, ${boundary(c.boundary).letter}, ${boundary(c.boundary).title}; ${D.owners[c.owner].label}; ${c.package}; ${boundary(c.boundary).reason}`);
cell.append('rect').attr('class','hit').attr('x',-30).attr('y',-8.5).attr('width',60).attr('height',17).attr('rx',2);
cell.append('path').attr('class','pixel').attr('d',c=>symbol(boundary(c.boundary),125)).attr('transform',c=>boundary(c.boundary).kind==='dispatch'?'rotate(90)':'').attr('fill',tint).attr('stroke',c=>d3.color(tint(c)).darker(.5));
cell.append('title').text(c=>`${c.pr?'#'+c.pr:'main'} / ${boundary(c.boundary).title}\n${D.owners[c.owner].module} · ${c.package}\n${boundary(c.boundary).reason}`);
cell.on('click',(_,c)=>choose(c.id)).on('keydown',(ev,c)=>{
 const ri=D.rows.findIndex(r=>r.number===c.pr),bi=B.findIndex(b=>b.id===c.boundary);
 let r=ri,b=bi;
 if(ev.key==='ArrowLeft')b=Math.max(0,b-1);else if(ev.key==='ArrowRight')b=Math.min(8,b+1);else if(ev.key==='ArrowUp')r=Math.max(0,r-1);else if(ev.key==='ArrowDown')r=Math.min(26,r+1);else if(ev.key==='Home')r=0;else if(ev.key==='End')r=26;else if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();$('#inspector').scrollIntoView({block:'start'});$('#return-field').focus({preventScroll:true});return;}else return;
 ev.preventDefault();choose(`${D.rows[r].number}-${B[b].id}`,{focus:true});
});
const marker=svg.append('rect').attr('id','motion-marker').attr('x',-12).attr('y',-9).attr('width',24).attr('height',18).attr('rx',2).attr('fill','none').attr('stroke','#f4edcf').attr('stroke-width',1.5).attr('pointer-events','none').attr('opacity',0);
svg.append('text').attr('x',5).attr('y',576).attr('fill','#94ad94').attr('font-family','var(--mono)').attr('font-size',9).text('243 source-addressed cells · package location changes at #149');

function codeHTML(ref,full=false){
 const s=D.sources[ref.source],lines=s.text.split('\n');
 const start=full?1:ref.start,end=full?lines.length:ref.end;
 return lines.slice(start-1,end).map((l,i)=>`<span class="code-line ${i+start===ref.anchor?'anchor':''}" data-line="${i+start}"><span class="line-no">${i+start}</span>${esc(l)}</span>`).join('');
}
function receiptHTML(ref,index=0){
 const s=D.sources[ref.source];
 return `<article class="receipt"><div class="receipt-head"><span>${esc(s.path)}</span><button data-expand="${index}">Expand ↗</button></div><pre>${codeHTML(ref)}</pre><div class="receipt-foot">${s.sha.slice(0,12)} · lines ${ref.start}–${ref.end} · <a href="evidence/source/${ref.source}.html#L${ref.anchor}" target="_blank" rel="noopener">Full local source ↗</a></div></article>`;
}
function choose(id,{push=true,scroll=false,focus=false}={}){
 if(!byId.has(id))return;
 selected=id;const c=byId.get(id),b=boundary(c.boundary),r=D.rows.find(r=>r.number===c.pr);
 if(push&&location.hash!==`#${id}`)history.pushState({cell:id},'',`#${id}`);
 selection.select('.column-selection').attr('x',x(c.boundary)-31);
 selection.select('.row-selection').attr('y',sy(c.pr)-1);
 cell.attr('tabindex',d=>d.id===id?0:-1).attr('aria-selected',d=>d.id===id?'true':'false');
 cell.select('.hit').attr('stroke',d=>d.id===id?'#dfd39d':'none');
 document.querySelectorAll('.surface-key li').forEach(l=>l.classList.toggle('active',l.id===`surface-${c.boundary}`));
 $('#coordinate').innerHTML=`${r.label} / ${b.letter} · ${b.title} <button class="text-button" id="inspect-selected">Inspect ↗</button>`;
 $('#inspect-selected').onclick=()=>$('#inspector').scrollIntoView({block:'start'});
 $('#inspector-coordinate').textContent=`EVIDENCE / ${r.label} · ${b.letter}`;
 $('#inspector-title').textContent=b.title;
 $('#owner-path').textContent=`${c.package} / ${D.owners[c.owner].module}`;
 $('#mechanism-text').textContent=b.mechanism;
 $('#reason-heading').textContent=b.reason==='stated'?'S / A specific reason is stated':'U / No specific reason found';
 $('#reason-text').textContent=b.rationale;
 $('#pr-context').textContent=`Selected snapshot: ${r.label} · ${r.title}. ${r.sha}. This receipt identifies active source ownership at that head; it is not a runtime measurement of this revision.`;
 $('#reason-sources').innerHTML=b.prs.map(pr=>`<button class="source-chip" data-pr="${pr}">PR #${pr} reason ↗</button>`).join('');
 $('#reason-sources').querySelectorAll('button').forEach(el=>el.onclick=()=>openSource({source:`pr-${el.dataset.pr}`,start:1,end:999,anchor:1},true));
 $('#receipts').innerHTML=c.refs.map(receiptHTML).join('');
 $('#receipts').querySelectorAll('[data-expand]').forEach(el=>el.onclick=()=>openSource(c.refs[Number(el.dataset.expand)],true));
 if(focus)$(`[data-cell-id="${id}"]`).focus();
 if(scroll)$('#inspector').scrollIntoView({block:'start'});
}
document.querySelectorAll('[data-select]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();choose(el.dataset.select,{scroll:el.classList.contains('fact-letter')||!!el.closest('.surface-key')});}));
$('#previous-cell').onclick=()=>{const c=byId.get(selected),i=B.indexOf(boundary(c.boundary));choose(`${c.pr}-${B[(i+8)%9].id}`);};
$('#next-cell').onclick=()=>{const c=byId.get(selected),i=B.indexOf(boundary(c.boundary));choose(`${c.pr}-${B[(i+1)%9].id}`);};
$('#return-field').onclick=returnToField;
function returnToField(){const el=$(`[data-cell-id="${selected}"]`);el.focus({preventScroll:true});el.scrollIntoView({block:'center',inline:'center',behavior:reduced.matches?'instant':'smooth'});}
window.addEventListener('popstate',()=>choose(location.hash.slice(1),{push:false}));
window.addEventListener('hashchange',()=>{if(byId.has(location.hash.slice(1)))choose(location.hash.slice(1),{push:false});});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&!$('#source-dialog').open&&!['INPUT','SELECT'].includes(document.activeElement.tagName)){stop();returnToField();}});

function openSource(ref,full=false){
 const s=D.sources[ref.source];lastDialogFocus=document.activeElement;
 $('#dialog-title').textContent=s.path;
 $('#dialog-content').innerHTML=`<p>${s.sha}<br>SHA-256 ${s.hash}</p><pre>${codeHTML(ref,full)}</pre><p><a href="evidence/source/${ref.source}.html#L${ref.anchor}" target="_blank" rel="noopener">Open this receipt as its own local page ↗</a></p>`;
 $('#source-dialog').showModal();$('#close-dialog').focus();
 const line=$('#dialog-content .anchor');if(line){const pre=$('#dialog-content pre');pre.scrollTop=line.offsetTop-pre.offsetTop-55;}
}
$('#close-dialog').onclick=()=>$('#source-dialog').close();
$('#source-dialog').addEventListener('close',()=>lastDialogFocus?.focus({preventScroll:true}));
document.querySelectorAll('[data-special]').forEach(el=>el.onclick=()=>{
 if(el.dataset.special==='test'){openSource({source:'readiness-diff',start:35,end:95,anchor:49});return;}
 lastDialogFocus=document.activeElement;$('#dialog-title').textContent='#148 stages; #149 consumes';
 const refs=D.supplements.filter(s=>s.id.startsWith('entry-')).flatMap(s=>s.refs);
 $('#dialog-content').innerHTML='<p>The #148 entry still imports the CLI dispatcher. The #149 entry calls the invocation coordinator with a public daemon client supplied by host composition. The selected rows track the active path, so staging does not recolor #148 as package execution.</p>'+refs.map((ref)=>{const s=D.sources[ref.source];return `<p>${esc(s.path)} · ${s.sha.slice(0,12)}</p><pre>${codeHTML(ref)}</pre><p><a href="evidence/source/${ref.source}.html#L${ref.anchor}" target="_blank" rel="noopener">Full source ↗</a></p>`;}).join('');
 $('#source-dialog').showModal();$('#close-dialog').focus();
});

// The second raster holds the same nine boundaries; only the observed checkpoint moves.
const runSVG=d3.select('#run-field');
const rx=d3.scalePoint().domain(B.map(b=>b.id)).range([130,1090]);
runSVG.append('line').attr('x1',rx('accept')).attr('x2',rx('next')).attr('y1',80).attr('y2',80).attr('stroke','#3a5140');
runSVG.append('line').attr('x1',rx('cleanup')).attr('x2',rx('ack')).attr('y1',80).attr('y2',80).attr('stroke','#3a5140');
runSVG.append('line').attr('x1',rx('next')+57).attr('x2',rx('next')+57).attr('y1',12).attr('y2',181).attr('class','branch-line');
runSVG.append('text').attr('x',(rx('cleanup')+rx('ack'))/2).attr('text-anchor','middle').attr('y',148).attr('fill','#859880').attr('font-size',9).attr('font-family','var(--mono)').text('ACK exchange');
runSVG.append('text').attr('x',(rx('cleanup')+rx('ack'))/2).attr('text-anchor','middle').attr('y',164).attr('fill','#859880').attr('font-size',9).attr('font-family','var(--mono)').text('separate from FIFO');
runSVG.selectAll('.run-letter').data(B).join('text').attr('class','run-letter').attr('x',b=>rx(b.id)).attr('y',22).attr('text-anchor','middle').attr('fill','#d9c798').attr('font-family','var(--mono)').attr('font-size',10).text(b=>b.letter);
runSVG.selectAll('.run-head').data(B).join('text').attr('class','run-head').attr('x',b=>rx(b.id)).attr('y',40).attr('text-anchor','middle').attr('fill','#b4c5a8').attr('font-family','var(--mono)').attr('font-size',9).text(b=>b.title);
for(const [id,yPos,bs] of [['A',80,B],['B',140,B.slice(0,7)]]){
 runSVG.append('text').attr('x',12).attr('y',yPos+4).attr('fill','#c8d5b5').attr('font-family','var(--mono)').attr('font-size',12).text('REQUEST '+id);
 runSVG.append('g').selectAll('path').data(bs).join('path').attr('class','run-pixel').attr('data-boundary',b=>b.id).attr('data-request',id).attr('d',b=>symbol(b,240)).attr('transform',b=>`translate(${rx(b.id)},${yPos}) ${b.kind==='dispatch'?'rotate(90)':''}`);
}
const tokenA=runSVG.append('circle').attr('r',19).attr('cy',80).attr('fill','none').attr('stroke','#faf0c8').attr('stroke-width',2);
const tokenB=runSVG.append('circle').attr('r',18).attr('cy',140).attr('fill','none').attr('stroke','#b9c8a4').attr('stroke-width',1.3).attr('stroke-dasharray','3 3');
function currentRun(){return R.runs.find(r=>r.build===$('#build').value&&r.scenario===$('#scenario').value);}
function paintRecording(animate=false){
 const r=currentRun(),s=r.checkpoints[step],pr=r.build==='main'?0:149;
 runSVG.selectAll('.run-pixel').attr('fill',b=>tint(byId.get(`${pr}-${b.id}`))).attr('stroke',b=>D.owners[byId.get(`${pr}-${b.id}`).owner].color).attr('stroke-width',.5);
 const duration=animate&&!reduced.matches?430:0;
 tokenA.interrupt().transition().duration(duration).ease(d3.easeCubicInOut).attr('cx',rx(s.boundary));
 tokenB.interrupt().transition().duration(duration).ease(d3.easeCubicInOut).attr('cx',rx(s.bState==='completed'?'terminal':s.started.includes('B')?'worker':'accept'));
 marker.interrupt().attr('opacity',1).transition().duration(duration).ease(d3.easeCubicInOut).attr('transform',`translate(${x(s.boundary)},${y(pr)})`);
 $('#step').value=step;$('#step-count').textContent=`${String(step+1).padStart(2,'0')} / 06`;
 $('#checkpoint-title').textContent=s.title;
 $('#checkpoint-facts').innerHTML=`<span>A <b>${s.aState}</b></span><span>B <b>${s.bState}</b></span><span>Started <b>${s.started.join(', ')}</b></span><span>A ACK <b>${s.ackReturned?'returned':'pending'}</b></span><span>New acceptances <b>${s.navigationResets}</b></span>${s.diagnostics.length?`<span>Diagnostic <b>${s.diagnostics.join(', ')}</b></span>`:''}`;
 $('#prev-step').disabled=step===0;$('#next-step').disabled=step===5;
 runSVG.attr('aria-label',`${s.title}. A ${s.aState}; B ${s.bState}. A acknowledgement ${s.ackReturned?'returned':'pending'}.`);
}
function stop(){playing=false;timer?.stop();timer=null;$('#play').textContent='▶ Play recording';$('#play').setAttribute('aria-pressed','false');}
function setStep(n,animate=true){step=Math.max(0,Math.min(5,n));paintRecording(animate);}
$('#play').onclick=()=>{if(playing){stop();return;}if(step===5)setStep(0);playing=true;$('#play').textContent='Ⅱ Pause recording';$('#play').setAttribute('aria-pressed','true');timer=d3.interval(()=>{if(step>=5){stop();return;}setStep(step+1);if(step===5)stop();},1450);};
$('#prev-step').onclick=()=>{stop();setStep(step-1);};$('#next-step').onclick=()=>{stop();setStep(step+1);};
$('#step').oninput=e=>{stop();setStep(Number(e.target.value),false);};
for(const id of ['build','scenario'])$('#'+id).onchange=()=>{stop();paintRecording(false);};
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
reduced.addEventListener('change',()=>{stop();paintRecording(false);});
choose(byId.has(location.hash.slice(1))?location.hash.slice(1):selected,{push:false});
paintRecording(false);
window.FIELD_API={get selected(){return selected;},get step(){return step;},get playing(){return playing;}};
})();
