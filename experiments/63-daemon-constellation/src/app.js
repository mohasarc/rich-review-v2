import * as d3 from 'd3';
import Graph from 'graphology';
import {readings} from './content.js';
const data=window.CONSTELLATION;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const graph=new Graph({type:'directed',multi:false});
const byId=new Map(data.nodes.map(n=>[n.id,n]));
for(const n of data.nodes)graph.addNode(n.id,n);
for(const e of data.edges)graph.addEdgeWithKey(e.id,e.source,e.target,e);
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
const state={reading:0,node:null,lens:'ownership',readingFocus:false,copy:false,history:[],transform:d3.zoomIdentity};
const colors={cli:'#e8b578',package:'#8ce0cc',retained:'#91a2b6'};
const kindNames={compose:'Composition',entry:'Entry / launch',transfer:'Transfer',state:'State / policy',contract:'Contract / vocabulary'};
const shapes={compose:d3.symbolStar,entry:d3.symbolTriangle,transfer:d3.symbolDiamond,state:d3.symbolSquare,contract:d3.symbolCircle};
const svg=d3.select('#map');
const defs=svg.append('defs');
for(const [id,color] of [['mint',colors.package],['gold',colors.cli]]){
 defs.append('marker').attr('id','arrow-'+id).attr('viewBox','0 -3 7 6').attr('refX',6).attr('refY',0).attr('markerWidth',5).attr('markerHeight',5).attr('orient','auto').append('path').attr('d','M0,-3L7,0L0,3').attr('fill',color);
}
const scene=svg.append('g');
const orbitLayer=scene.append('g').attr('class','orbits');
const edgeLayer=scene.append('g').attr('class','edges');
const copyLayer=scene.append('g');
const starLayer=scene.append('g').attr('class','stars');
const labelLeaderLayer=scene.append('g').attr('class','label-leaders');
const labelLayer=scene.append('g').attr('class','labels');
const titleLayer=scene.append('g');
let directoryNodes=[];
function layout(){
 // D3 owns the entire directory/leaf layout; the two owner frames have fixed reading anchors.
 const pkg={id:'owner:package',name:'packages/daemon/src',owner:'package',children:[]};
 const folders=new Map();
 for(const n of data.nodes.filter(n=>n.owner==='package')){
  if(n.module==='(src root)')pkg.children.push(n);
  else{
   if(!folders.has(n.module)){const f={id:'dir:'+n.module,name:n.module+'/',owner:'package',children:[]};folders.set(n.module,f);pkg.children.push(f);}
   folders.get(n.module).children.push(n);
  }
 }
 const cli={id:'owner:cli',name:'apps/cli/src/daemon',owner:'cli',children:data.nodes.filter(n=>n.owner==='cli')};
 for(const [tree,x,y,size] of [[cli,286,428,475],[pkg,880,428,650]]){
  const h=d3.hierarchy(tree).sum(d=>d.children?0:1).sort((a,b)=>(b.height-a.height)||(b.value-a.value)||a.data.id.localeCompare(b.data.id));
  d3.pack().size([size,size]).padding(d=>d.depth===0?24:15)(h);
  h.each(d=>{d.x+=x-size/2;d.y+=y-size/2;if(!d.children){d.data.x=d.x;d.data.y=d.y;d.data.r=d.r;}else{directoryNodes.push(d);}});
 }
}
layout();
const circles=orbitLayer.selectAll('circle').data(directoryNodes).join('circle')
 .attr('class',d=>'orbit '+d.data.owner+(d.depth?' module':''))
 .attr('cx',d=>d.x).attr('cy',d=>d.y).attr('r',d=>d.r)
 .attr('tabindex',0).attr('role','button').attr('aria-label',d=>'Zoom to '+d.data.name)
 .on('click',(event,d)=>{event.stopPropagation();zoomTo(d.x,d.y,d.r*2.3);})
 .on('keydown',(event,d)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();zoomTo(d.x,d.y,d.r*2.3);}});
const dirLabels=orbitLayer.selectAll('text').data(directoryNodes.filter(d=>d.depth)).join('text').attr('class','orbit-label').attr('x',d=>d.x).attr('y',d=>d.y-d.r+16).text(d=>d.data.name);
for(const d of directoryNodes.filter(d=>!d.depth)){
 titleLayer.append('text').attr('class','owner-name '+d.data.owner).attr('x',d.x).attr('y',d.y-d.r-39).text(d.data.owner==='cli'?'apps/cli':'@symnav/daemon');
 titleLayer.append('text').attr('class','owner-note').attr('x',d.x).attr('y',d.y-d.r-18).text(d.data.owner==='cli'?'src/daemon · 38 frozen + 3 invocation files':'src · 43 added + 8 existing files');
}
function linePath(e){
 const a=byId.get(e.source),b=byId.get(e.target);
 const dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1;
 return `M${a.x+dx/l*13},${a.y+dy/l*13}L${b.x-dx/l*15},${b.y-dy/l*15}`;
}
const lines=edgeLayer.selectAll('path').data(data.edges).join('path').attr('d',linePath)
 .attr('class',e=>'dependency '+byId.get(e.source).owner+' '+e.style)
 .attr('marker-end',e=>'url(#arrow-'+(byId.get(e.source).owner==='cli'?'gold':'mint')+')');
const star=starLayer.selectAll('g').data(data.nodes).join('g')
 .attr('class','star').attr('data-node',n=>n.id).attr('transform',n=>`translate(${n.x},${n.y})`)
 .attr('role','button').attr('tabindex',0).attr('aria-label',n=>`${n.name}, ${n.owner==='cli'?'CLI':'daemon package'}, ${n.compat?'frozen compatibility copy, still active':kindNames[n.kind]}`)
 .on('click',(event,n)=>{event.stopPropagation();selectNode(n.id);})
 .on('keydown',(event,n)=>{
  if(event.key==='Enter'||event.key===' '){event.preventDefault();selectNode(n.id);}
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
   event.preventDefault();const adjacent=graph.neighbors(n.id);const next=adjacent[event.key==='ArrowRight'?0:adjacent.length-1];if(next){selectNode(next);focusStar(next);}
  }
 })
 .on('mouseenter',(event,n)=>{const t=$('#tooltip');t.hidden=false;t.innerHTML=`${esc(n.name)}<small>${esc(n.owner==='cli'?'CLI'+(n.compat?' · frozen compatibility, still active':' · invocation owner'):n.module+' · '+(n.new?'new package home':'existing package surface'))}</small>`;})
 .on('mouseleave',()=>{$('#tooltip').hidden=true;});
star.append('circle').attr('class','hit').attr('r',n=>Math.min(n.r+2,24));
star.append('circle').attr('class','halo').attr('r',19);
star.append('path').attr('class','glyph').attr('d',n=>d3.symbol(shapes[n.kind],n.kind==='compose'?195:160)())
 .attr('fill',n=>n.owner==='cli'?colors.cli:n.new?colors.package:colors.retained)
 .attr('stroke',n=>n.owner==='cli'?colors.cli:n.new?colors.package:colors.retained);
const starLabels=labelLayer.selectAll('text').data(data.nodes).join('text').attr('class','star-label').text(n=>n.name);
const zoom=d3.zoom().scaleExtent([.7,5]).extent([[0,0],[1240,820]]).on('zoom',event=>{
 state.transform=event.transform;scene.attr('transform',event.transform);$('#zoom-value').textContent=Math.round(event.transform.k*100)+'%';updateVisibility();
});
svg.call(zoom).on('dblclick.zoom',null);
function zoomTo(x,y,diameter){
 const k=Math.max(.7,Math.min(5,Math.min(1150/diameter,710/diameter)));
 const target=d3.zoomIdentity.translate(620-k*x,410-k*y).scale(k);
 svg.interrupt();if(motion.matches)svg.call(zoom.transform,target);else svg.transition().duration(600).ease(d3.easeCubicInOut).call(zoom.transform,target);
}
function fit(){svg.interrupt();const t=d3.zoomIdentity;if(motion.matches)svg.call(zoom.transform,t);else svg.transition().duration(500).call(zoom.transform,t);}
function focusStar(id){const n=byId.get(id);if(n){const el=document.querySelector(`[data-node="${CSS.escape(id)}"]`);el?.focus({preventScroll:true});}}
function focusedSet(){
 if(state.node){return new Set([state.node,...graph.neighbors(state.node),...(state.copy&&byId.get(state.node).counterpart?[byId.get(state.node).counterpart]:[])]);}
 if(state.lens==='cli')return new Set(data.nodes.filter(n=>n.owner==='cli').map(n=>n.id));
 if(state.lens==='package')return new Set(readings[2].focus);
 if(state.readingFocus)return new Set(readings[state.reading].focus);
 return null;
}
function activeEdges(){
 if(state.node)return new Set(graph.edges(state.node));
 if(state.lens==='cli')return new Set(data.edges.filter(e=>byId.get(e.source).owner==='cli').map(e=>e.id));
 if(state.lens==='package'){const ids=new Set(readings[2].focus);return new Set(data.edges.filter(e=>ids.has(e.source)&&ids.has(e.target)).map(e=>e.id));}
 if(state.readingFocus){const ids=new Set(readings[state.reading].focus);return new Set(data.edges.filter(e=>ids.has(e.source)&&ids.has(e.target)).map(e=>e.id));}
 return new Set(data.edges.filter(e=>e.source==='c:daemon-command-dispatcher'||e.source==='p:client/daemon-client').map(e=>e.id));
}
let labelSignature='';
function positionLabels(ids){
 const size=15/Math.sqrt(state.transform.k);
 const signature=ids.join('|')+':'+size.toFixed(1);
 starLabels.attr('opacity',n=>ids.includes(n.id)?1:0);
 if(labelSignature===signature)return;
 labelSignature=signature;
 const labels=ids.map(id=>{const n=byId.get(id);return {id,x:n.x,y:n.y+28,ax:n.x,ay:n.y+28,r:Math.min(100,n.name.length*size*.27+5)};});
 const fixed=directoryNodes.filter(d=>d.depth).map(d=>({id:d.data.id,fx:d.x,fy:d.y-d.r+12,x:d.x,y:d.y-d.r+12,ax:d.x,ay:d.y-d.r+12,r:d.data.name.length*3.5+6}));
 // D3's mature collision and position forces separate visible labels; no physics is implied.
 d3.forceSimulation([...labels,...fixed]).force('x',d3.forceX(d=>d.ax).strength(.35)).force('y',d3.forceY(d=>d.ay).strength(.55)).force('collide',d3.forceCollide(d=>d.r).iterations(3)).stop().tick(130);
 const loc=new Map(labels.map(n=>[n.id,n]));
 labelLeaderLayer.selectAll('path').data(labels.filter(d=>{const n=byId.get(d.id);return Math.hypot(d.x-n.x,d.y-n.y-28)>16;}),d=>d.id).join('path')
  .attr('d',d=>{const n=byId.get(d.id);return d3.line()([[n.x,n.y+(d.y>n.y?13:-13)],[d.x,d.y-7]]);});
 starLabels.attr('font-size',size).attr('x',n=>loc.get(n.id)?.x??n.x).attr('y',n=>loc.get(n.id)?.y??n.y+28);
}
function updateVisibility(){
 const focus=focusedSet(),edges=activeEdges();
 star.select('.glyph').attr('opacity',n=>focus?(focus.has(n.id)?1:.16):(n.compat?.42:1));
 star.select('.halo').attr('stroke',n=>n.id===state.node?'#f4f4dc':focus?.has(n.id)?(n.owner==='cli'?colors.cli:colors.package):'transparent').attr('opacity',n=>n.id===state.node?1:.4);
 const labelIds=data.nodes.filter(n=>{
  if(n.id===state.node||(state.copy&&n.id===byId.get(state.node)?.counterpart))return true;
  if(state.transform.k>1.85)return !focus||focus.has(n.id);
  if(state.node)return false;
  if(state.lens==='package')return readings[2].focus.includes(n.id);
  if(state.readingFocus)return readings[state.reading].focus.includes(n.id);
  if(state.lens==='cli')return ['c:daemon-command-dispatcher','c:daemon-process-coordinator','c:daemon-entry'].includes(n.id);
  return ['p:client/daemon-client','c:daemon-command-dispatcher'].includes(n.id);
 }).map(n=>n.id);
 positionLabels(labelIds);
 lines.attr('opacity',e=>edges.has(e.id)?.8:0).classed('selected',e=>state.node&&e.source===state.node);
 dirLabels.attr('opacity',state.transform.k>3?.6:1);
 const n=state.node&&byId.get(state.node);
 copyLayer.selectAll('path').data(state.copy&&n?.counterpart?[{source:n.id,target:n.counterpart}]:[]).join('path').attr('class','copy-link').attr('d',linePath);
 d3.selectAll('[data-lens]').attr('aria-pressed',function(){return this.dataset.lens===state.lens?'true':'false';});
 $('#map-label').textContent=state.node?'SELECTED: '+byId.get(state.node).name.toUpperCase():state.lens==='cli'?'THE ACTIVE CLI DEPENDENCIES':state.lens==='package'?'THE STAGED PACKAGE LAUNCH PATH':'THE TWO SOURCE OWNERS';
}
function sourceButton(c,label='Source receipt'){
 return `<button class="inspector-action" data-receipt="${esc(c[0])}" data-start="${c[1]}" data-end="${c[2]}">${esc(label)} ↗</button>`;
}
function receiptLabel(key){
 if(key==='bundle:body')return 'PR rationale';
 const p=data.receipts[key].path.split('/').pop().replace(/\.(ts|mjs|json|md)$/,'').replace(/^daemon-/,'').replaceAll('-',' ');
 return (key.startsWith('base:')?'Base: ':'')+p;
}
function renderReading(){
 const r=readings[state.reading];
 $('#inspector-content').innerHTML=`
 <p class="inspector-kicker">READING ${r.number} / 07</p>
 <h2 class="inspector-title">${esc(r.title)}</h2>
 <p class="inspector-body">${esc(r.caption)}</p>
 <button class="inspector-action primary" data-inspect="${esc(r.anchor)}">Inspect ${esc(byId.get(r.anchor).name)} →</button>
 <button class="inspector-action" data-register="${r.id}">Read this decision & its reason ↓</button>
 <div class="reading-shortcuts" aria-label="Choose a reading">${readings.map((x,i)=>`<button data-reading="${i}" class="${i===state.reading?'active':''}" aria-label="Reading ${x.number}: ${esc(x.title)}" aria-pressed="${i===state.reading}">${x.number}</button>`).join('')}</div>
 <div class="source-buttons" aria-label="Reading source receipts">${r.sources.map((c,i)=>`<button title="${esc(data.receipts[c[0]].path)}" data-receipt="${esc(c[0])}" data-start="${c[1]}" data-end="${c[2]}">${i+1} · ${esc(receiptLabel(c[0]))}</button>`).join('')}</div>
 <details class="challenge"><summary>${esc(r.challenge)}</summary><p>${esc(r.answer)}</p></details>
 <div class="navigator"><button data-step="-1" ${state.reading===0?'disabled':''} aria-label="Previous reading">←</button><span>${r.number} OF 07</span><button data-step="1" ${state.reading===6?'disabled':''} aria-label="Next reading">→</button></div>
 <p class="inspector-foot">Select a star: inspect its owner.<br>Select a ring: enter its directory.<br>Wheel / pinch: zoom. Drag: pan.<br>Escape: return. Home: fit both owners.</p>`;
}
function renderNode(){
 const n=byId.get(state.node),incoming=graph.inEdges(n.id),outgoing=graph.outEdges(n.id),r=readings[state.reading];
 const showEdges=(ids,inbound)=>ids.map(id=>{const e=graph.getEdgeAttributes(id),other=byId.get(inbound?e.source:e.target);return `<div class="connection"><button data-inspect="${esc(other.id)}">${inbound?'←':'→'} ${esc(other.name)}<small>${esc(e.action)}</small></button><button data-edge="${id}" data-receipt="${esc(e.cite.receipt)}" data-start="${e.cite.start}" data-end="${e.cite.end}" aria-label="Source for ${esc(e.action)}">lines ↗</button></div>`;}).join('');
 $('#inspector-content').innerHTML=`
 <div class="history-actions">${state.history.length?'<button id="back-star">← Previous star</button>':''}<button id="back-reading">↶ Reading ${r.number}</button></div>
 <p class="inspector-kicker">${n.owner==='cli'?'CLI / OLD HOME':n.new?'DAEMON PACKAGE / NEW HOME':'DAEMON PACKAGE / EXISTING'}</p>
 <h2 class="inspector-title">${esc(n.name)}</h2><div class="file-path ${n.owner}">${esc(n.path)}</div>
 <dl class="file-facts"><dt>Mechanism</dt><dd>${kindNames[n.kind]}</dd><dt>Surface</dt><dd>${n.compat?'Frozen compatibility copy':n.owner==='cli'?'CLI invocation module':n.key==='client/daemon-client'?'Public facade':n.key==='process-entry'||n.key==='worker-entry'?'Executable entry':n.module==='(src root)'?'Package root surface':'Package-local mechanism'}</dd></dl>
 ${n.compat?'<p class="selection-note">Dim means compatibility ownership. This copy still belongs to the active CLI graph.</p>':''}
 ${sourceButton([n.receipt,1,Math.min(75,data.receipts[n.receipt].lines.length)],'Read head source')}
 ${n.before?sourceButton([n.before.receipt,1,Math.min(75,data.receipts[n.before.receipt].lines.length)],'Read base antecedent'):''}
 ${n.counterpart?`<button class="inspector-action primary" data-counterpart="${esc(n.counterpart)}">Find ${n.owner==='cli'?'package':'CLI'} counterpart ⇄</button>`:''}
 ${state.copy?'<p class="selection-note">Dotted tether = source counterpart, not runtime dependence. Both files exist at head; it is not a move animation.</p>':''}
 <div class="connections"><h3>DEPENDS ON · ${outgoing.length} SHOWN</h3>${outgoing.length?showEdges(outgoing,false):'<p class="inspector-body">No outgoing dependency was selected for this file. This is not proof of isolation.</p>'}${incoming.length?`<h3 style="margin-top:18px">USED BY · ${incoming.length} SHOWN</h3>${showEdges(incoming,true)}`:''}</div>`;
 $('#inspector').scrollTop=0;
}
function writeHash(){
 const h=new URLSearchParams();h.set('reading',readings[state.reading].id);if(state.node)h.set('star',state.node);if(state.lens!=='ownership')h.set('lens',state.lens);
 const val='#'+h.toString();if(location.hash!==val)history.pushState({},'',val);
}
function reading(i,{hash=true,scroll=false}={}){
 state.reading=Math.max(0,Math.min(6,i));state.node=null;state.copy=false;state.history=[];
 state.lens=i===0?'cli':i===2?'package':'ownership';
 state.readingFocus=i!==0&&i!==2;
 renderReading();updateVisibility();markReading();if(hash)writeHash();
 if(scroll)$('.observatory').scrollIntoView({block:'start',behavior:motion.matches?'auto':'smooth'});
}
function selectNode(id,{hash=true,remember=true,fitNode=false}={}){
 if(!byId.has(id))return;
 if(state.node&&state.node!==id&&remember)state.history.push(state.node);
 state.node=id;state.copy=false;renderNode();updateVisibility();if(hash)writeHash();
 if(fitNode){const n=byId.get(id);zoomTo(n.x,n.y,370);}
 $('#search-results').hidden=true;$('#tooltip').hidden=true;
}
function markReading(){document.querySelectorAll('.register-row').forEach((el,i)=>el.classList.toggle('active',i===state.reading));}
function renderRegister(){
 $('#reading-register').innerHTML=readings.map((r,i)=>`<article class="register-row" id="decision-${r.id}"><span class="register-number">${r.number}</span><h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p><p class="reason">${esc(r.reason)}</p><button data-reading="${i}" data-scroll="true" aria-label="Locate reading ${r.number} in the constellation">Locate ↗</button></article>`).join('');
}
function restore(){
 if(!location.hash.includes('='))return;
 const h=new URLSearchParams(location.hash.slice(1));const i=readings.findIndex(r=>r.id===h.get('reading'));
 if(i>=0)state.reading=i;
 state.node=null;state.copy=false;state.history=[];state.lens=['ownership','cli','package'].includes(h.get('lens'))?h.get('lens'):'ownership';
 state.readingFocus=state.lens==='ownership'&&state.reading>0;
 const node=h.get('star');if(node&&byId.has(node)){state.node=node;renderNode();}else renderReading();updateVisibility();markReading();
}
let sourceState=null,returnFocus=null;
function openSource(key,start=1,end=75){
 const doc=data.receipts[key];if(!doc)return;
 returnFocus=document.activeElement;sourceState={key,start:Number(start),end:Math.min(Number(end),doc.lines.length),full:false};
 $('#source-title').textContent=doc.path;$('#source-revision').textContent=doc.revision==='bundle'?'SUPPLIED PR BUNDLE':doc.revision.toUpperCase()+' SOURCE';
 $('#source-meta').textContent=`commit ${doc.commit} · SHA-256 ${doc.sha256}`;
 const a=$('#source-github');a.hidden=doc.revision==='bundle';a.href=`https://github.com/mohasarc/symnav/blob/${doc.commit}/${doc.path}#L${start}`;
 drawSource();$('#source-dialog').showModal();
}
function drawSource(){
 const doc=data.receipts[sourceState.key],start=sourceState.full?1:sourceState.start,end=sourceState.full?doc.lines.length:sourceState.end;
 $('#source-code').innerHTML=doc.lines.slice(start-1,end).map((l,i)=>`<div class="code-line ${i+start>=sourceState.start&&i+start<=sourceState.end?'target':''}" id="source-line-${i+start}"><span class="line-no">${i+start}</span><span class="line-code">${esc(l)}</span></div>`).join('');
 $('#source-full').textContent=sourceState.full?'Show cited excerpt':'Show whole file';$('#source-code').scrollTop=0;
 if(sourceState.full)document.getElementById('source-line-'+sourceState.start)?.scrollIntoView({block:'start'});
}
function closeSource(){$('#source-dialog').close();returnFocus?.focus({preventScroll:true});}
$('#close-source').addEventListener('click',closeSource);
$('#source-dialog').addEventListener('cancel',()=>{requestAnimationFrame(()=>returnFocus?.focus({preventScroll:true}));});
$('#source-dialog').addEventListener('click',e=>{if(e.target===$('#source-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeSource();}});
$('#source-full').addEventListener('click',()=>{sourceState.full=!sourceState.full;drawSource();});
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.reading!==undefined){reading(Number(b.dataset.reading),{scroll:!!b.dataset.scroll});fit();}
 if(b.dataset.step){reading(state.reading+Number(b.dataset.step));fit();}
 if(b.dataset.inspect)selectNode(b.dataset.inspect);
 if(b.dataset.register)document.getElementById('decision-'+b.dataset.register)?.scrollIntoView({block:'center',behavior:motion.matches?'auto':'smooth'});
 if(b.dataset.receipt)openSource(b.dataset.receipt,b.dataset.start,b.dataset.end);
 if(b.dataset.lens){state.lens=b.dataset.lens;state.node=null;state.copy=false;state.readingFocus=false;state.history=[];state.reading=state.lens==='package'?2:0;renderReading();updateVisibility();markReading();writeHash();fit();}
 if(b.dataset.counterpart){const origin=state.node;selectNode(b.dataset.counterpart);state.copy=true;renderNode();updateVisibility();fit();}
 if(b.id==='back-reading'){state.node=null;state.copy=false;renderReading();updateVisibility();writeHash();}
 if(b.id==='back-star'){const id=state.history.pop();selectNode(id,{remember:false});}
});
$('#zoom-in').addEventListener('click',()=>svg.transition().duration(motion.matches?0:200).call(zoom.scaleBy,1.4));
$('#zoom-out').addEventListener('click',()=>svg.transition().duration(motion.matches?0:200).call(zoom.scaleBy,1/1.4));
$('#fit').addEventListener('click',fit);
$('#find-star').addEventListener('input',e=>{
 const q=e.target.value.trim().toLowerCase();const result=$('#search-results');if(!q){result.hidden=true;return;}
 const found=data.nodes.filter(n=>(n.name+' '+n.path).toLowerCase().includes(q)).slice(0,20);
 result.innerHTML=found.length?found.map(n=>`<button data-search="${esc(n.id)}">${esc(n.name)}<small>${esc(n.owner==='cli'?'CLI · '+(n.compat?'compatibility':'invocation'):'Package · '+n.module)}</small></button>`).join(''):'<p style="padding:0 12px">No matching source file.</p>';result.hidden=false;
});
$('#search-results').addEventListener('click',e=>{const b=e.target.closest('[data-search]');if(b){selectNode(b.dataset.search,{fitNode:true});$('#find-star').value='';}});
$('#find-star').addEventListener('keydown',e=>{if(e.key==='Escape'){$('#search-results').hidden=true;e.stopPropagation();}if(e.key==='ArrowDown'){e.preventDefault();$('#search-results button')?.focus();}if(e.key==='Enter'){const b=$('#search-results button');if(b){selectNode(b.dataset.search,{fitNode:true});$('#find-star').value='';}}});
document.addEventListener('click',e=>{if(!e.target.closest('.find-control'))$('#search-results').hidden=true;});
document.addEventListener('keydown',e=>{
 if($('#source-dialog').open||e.target.matches('input,textarea'))return;
 if(e.key==='Escape'){e.preventDefault();if(state.node){state.node=null;state.copy=false;renderReading();updateVisibility();writeHash();}else fit();}
 if(e.key==='Home'){e.preventDefault();fit();}
});
window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);
renderRegister();renderReading();updateVisibility();markReading();restore();
// Read-only inspection for repeatable artifact checks; no review state is stored.
window.constellation={graph,data,readings,state,selectNode,reading,zoomTo,fit,openSource,closeSource,byId,directoryNodes};
