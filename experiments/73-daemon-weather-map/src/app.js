import * as d3 from 'd3';
import data from './data.json';

const $=s=>document.querySelector(s);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const state={revision:'head',condition:'fetch',paused:reduced.matches,reading:0,role:null,full:false};
const palette={ink:'#214047',blue:'#257390',orange:'#af623b',teal:'#4a8275',grid:'#9bb2a0',paper:'#e8eee5'};
const conditions={
 fetch:{kicker:'RAIN OVER THE CONNECTION',title:'Fetch the missing records.',description:'Acceptance and a manifest arrived. Record 0 was appended before the link broke. Fetch begins at offset 1, keeping this receiver and capture.',values:[['Execute identity','unchanged'],['Receiver / capture','retained'],['Next record','1']],wire:'result-fetch · offset 1',result:'remaining records → same capture',rain:'LINK CLOSE',reading:'fetch'},
 reattach:{kicker:'CLOSE BEFORE THE MANIFEST',title:'Reattach the same request.',description:'The authenticated connection closes after acceptance, before a manifest. A qualifying close starts a new delivery attempt for the identical execute request.',values:[['Execute identity','identical'],['Receiver / capture','fresh'],['Next record','0']],wire:'execute · identical request',result:'new delivery → fresh capture',rain:'ACCEPTED CLOSE',reading:'reattach'},
 exhausted:{kicker:'RAIN AT THE RECOVERY LIMIT',title:'Corruption ends recovery.',description:'The allowed fetch ends cleanly without completing the result. It becomes accepted corruption. There is no execution reattachment on this error path.',values:[['Execute attempts','1'],['Fetch attempts','1'],['Outcome','accepted / corrupt']],wire:'result-fetch · incomplete',result:'partial capture disposed',rain:'FETCH EOF',reading:'failure'},
 clear:{kicker:'TERMINAL RESULT + ACKNOWLEDGEMENT',title:'Return the captured result.',description:'Records and the end frame agree with the manifest. Captured counts and digest validate; acknowledgement succeeds before the result is returned.',values:[['Execute attempts','1'],['Fetch attempts','0'],['Outcome','completed']],wire:'execute',result:'validated result · acknowledged',rain:'',reading:'failure'}
};
const svgRoot=d3.select('#weather');
const defs=svgRoot.append('defs');
const svg=svgRoot.append('g').attr('class','weather-scene');
defs.append('pattern').attr('id','haze-pattern').attr('width',7).attr('height',7).attr('patternUnits','userSpaceOnUse').append('path').attr('d','M-2,7L7,-2M5,9L9,5').attr('stroke','#7c8976').attr('stroke-width',.7).attr('opacity',.6);
for(const [id,color] of [['request',palette.blue],['result',palette.orange]]){
 defs.append('marker').attr('id',`arrow-${id}`).attr('viewBox','0 -4 9 8').attr('refX',8).attr('refY',0).attr('markerWidth',7).attr('markerHeight',7).attr('orient','auto').append('path').attr('d','M0,-4L8,0L0,4Z').attr('fill',color);
}
const background=svg.append('g').attr('aria-hidden',true);
background.append('rect').attr('width',1120).attr('height',570).attr('fill',palette.paper);
background.selectAll('.meridian').data(d3.range(40,1120,80)).join('line').attr('x1',d=>d).attr('x2',d=>d).attr('y1',50).attr('y2',526).attr('stroke',palette.grid).attr('opacity',.23).attr('stroke-dasharray','2 4');
background.selectAll('.parallel').data(d3.range(70,560,70)).join('line').attr('x1',20).attr('x2',1100).attr('y1',d=>d).attr('y2',d=>d).attr('stroke',palette.grid).attr('opacity',.23).attr('stroke-dasharray','2 4');
background.append('path').attr('d','M20,47H1100M20,525H1100').attr('stroke','#93a997').attr('fill','none').attr('opacity',.5);

// A fixed conceptual geography, not a geographic projection or a graph layout.
// Each field is an illustrative max of four-role source-file concentrations.
const centres={
 main:[{x:495,y:237,q:3},{x:341,y:445,q:1}],
 head:[{x:363,y:181,q:1},{x:729,y:184,q:1},{x:712,y:447,q:1},{x:342,y:449,q:1}]
};
const contourLayer=svg.append('g').attr('aria-hidden',true);
const contourPath=d3.geoPath(d3.geoIdentity().scale(5));
const contourGroups={};
for(const rev of ['main','head']){
 const field=Array.from({length:224*114},(_,i)=>{
  const x=(i%224)*5,y=Math.floor(i/224)*5;
  return d3.max(centres[rev],c=>c.q*Math.exp(-.5*(((x-c.x)/110)**2+((y-c.y)/66)**2)));
 });
 const polygons=d3.contours().size([224,114]).thresholds([.12,.22,.36,.53,.74,.94,1.25,1.7,2.25,2.75])(field);
 const g=contourLayer.append('g').attr('opacity',rev===state.revision?1:0);
 g.selectAll('path').data(polygons).join('path').attr('d',contourPath).attr('fill',d=>d.value<1?'#729781':'#517e68').attr('fill-opacity',.038).attr('stroke',d=>d.value<1?'#7c9d87':'#557d67').attr('stroke-opacity',d=>d.value>.9?.7:.53).attr('stroke-width',d=>d.value>.9?1.4:1);
 contourGroups[rev]=g;
}
const labels=svg.append('g');
function label(parent,x,y,text,size=12,color=palette.ink,anchor='start',cls='svg-mono'){
 return parent.append('text').attr('x',x).attr('y',y).attr('font-size',size).attr('fill',color).attr('text-anchor',anchor).attr('class',cls).text(text);
}
label(labels,432,28,'CLIENT PROCESS',10,palette.ink,'middle').attr('letter-spacing',2);
label(labels,1009,28,'DAEMON PROCESS',10,palette.ink,'middle').attr('letter-spacing',1);
labels.append('line').attr('x1',906).attr('x2',906).attr('y1',48).attr('y2',525).attr('stroke','#617774').attr('stroke-width',1.3).attr('stroke-dasharray','5 5');
label(labels,918,502,'fixed runtime',9,'#526e68');
label(labels,918,515,'boundary',9,'#526e68');
const packageTitle=label(labels,227,73,'packages/daemon',12,palette.teal).attr('letter-spacing',1);
const cliTitle=label(labels,33,73,'apps/cli',12,palette.teal).attr('letter-spacing',1);
const front=svg.append('g').attr('class','clickable-zone').attr('role','button').attr('tabindex',0).attr('aria-label','Read 01: Moving source package boundary');
front.append('path').attr('fill','none').attr('stroke',palette.orange).attr('stroke-width',2);
front.selectAll('polygon').data(d3.range(123,495,53)).join('polygon').attr('points','0,0 11,-6 11,6').attr('fill',palette.orange);
const frontLabel=label(front,0,0,'PACKAGE FRONT',9,palette.orange,'middle').attr('transform','rotate(-90)');
const frontX=y=>state.revision==='head'?183+Math.sin(y/86)*9:1098;
function setFront(animate=true){
 const duration=animate&&!state.paused?1000:0;
 const points=d3.range(92,507,20).map(y=>[frontX(y),y]);
 const change=selection=>{selection.interrupt();return duration?selection.transition().duration(duration).ease(d3.easeCubicInOut):selection;};
 change(front.select('path')).attr('d',d3.line().curve(d3.curveBasis)(points));
 change(front.selectAll('polygon')).attr('transform',y=>`translate(${frontX(y)},${y})`);
 change(frontLabel.attr('x',-429)).attr('y',state.revision==='head'?169:1084);
}
front.on('click',()=>openReading('ownership')).on('keydown',e=>activate(e,()=>openReading('ownership')));
const forecast=svg.append('g').attr('class','clickable-zone').attr('tabindex',0).attr('role','button').attr('aria-label','Read 05: Why exactly one fetch and one reattachment?');
forecast.append('ellipse').attr('cx',559).attr('cy',103).attr('rx',149).attr('ry',34).attr('fill','#e5e8d9').attr('stroke','#8c9a85').attr('stroke-dasharray','3 5');
forecast.append('ellipse').attr('cx',559).attr('cy',103).attr('rx',149).attr('ry',34).attr('fill','url(#haze-pattern)').attr('opacity',.6);
label(forecast,559,101,'U / why exactly 1 + 1?',13,palette.ink,'middle').attr('class','svg-mono svg-label');
label(forecast,559,117,'default calibration unexplained',9,palette.ink,'middle').attr('class','svg-mono svg-label');
forecast.on('click',()=>openReading('forecast')).on('keydown',e=>activate(e,()=>openReading('forecast')));

const streams=svg.append('g').attr('aria-hidden',true);
const windLine=d3.line().curve(d3.curveCatmullRom.alpha(.5));
const pathRequest=windLine([[105,285],[336,279],[552,259],[796,272],[1020,287]]);
const pathResult=windLine([[1020,318],[839,340],[644,365],[420,382],[107,332]]);
for(const [name,geometry,color] of [['request',pathRequest,palette.blue],['result',pathResult,palette.orange]]){
 streams.append('path').attr('data-flow-background',name).attr('d',geometry).attr('fill','none').attr('stroke',color).attr('stroke-width',12).attr('stroke-opacity',.055);
 streams.append('path').attr('data-flow-background',name).attr('d',geometry).attr('fill','none').attr('stroke',color).attr('stroke-width',1.1).attr('opacity',.5);
 streams.append('path').attr('id',`wind-${name}`).attr('d',geometry).attr('fill','none').attr('stroke',color).attr('stroke-width',2.2).attr('stroke-dasharray','10 15').attr('marker-end',`url(#arrow-${name})`);
}
const requestLabel=label(streams,567,247,'',11,palette.blue,'middle','svg-mono svg-label');
const resultLabel=label(streams,550,404,'',11,palette.orange,'middle','svg-mono svg-label');
const people=svg.append('g').attr('aria-hidden',true);
people.append('circle').attr('cx',85).attr('cy',308).attr('r',16).attr('fill',palette.ink);
label(people,85,313,'C',15,'#f5f1e4','middle','svg-serif');
label(people,85,244,'CLI',14,palette.ink,'middle','svg-serif');
label(people,85,262,'caller',14,palette.ink,'middle','svg-serif');
people.append('circle').attr('cx',1037).attr('cy',302).attr('r',18).attr('fill',palette.ink);
label(people,1037,308,'A',17,'#f5f1e4','middle','svg-serif');
label(people,1006,227,'Accepted work',18,palette.ink,'middle','svg-serif');
label(people,1006,249,'same request identity',9,palette.ink,'middle');
label(people,1006,376,'server context',9,palette.ink,'middle');
label(people,1006,391,'outside the role census',8,palette.ink,'middle');
const stations=svg.append('g');
const ownerGroups={};
function station(parent,{x,y,q,title,lines,reading,role}){
 const g=parent.append('g').attr('class','station').attr('transform',`translate(${x},${y})`).attr('tabindex',0).attr('role','button').attr('aria-label',`${title}, ${q} selected ${q===1?'role':'roles'}; inspect owner`).attr('data-owner',role||'combined');
 g.append('rect').attr('class','halo').attr('x',-135).attr('y',-40).attr('width',270).attr('height',95).attr('rx',30);
 const h=label(g,0,-5,'H',35,palette.ink,'middle','svg-serif svg-label');
 label(g,19,1,String(q),15,palette.teal,'start','svg-mono svg-label');
 label(g,0,18,title,14,palette.ink,'middle','svg-serif svg-label');
 lines.forEach((s,i)=>label(g,0,35+i*13,s,9,palette.ink,'middle','svg-mono svg-label').attr('data-role-detail',i===1?role||'combined':null));
 g.on('click',()=>openReading(reading,role)).on('keydown',e=>activate(e,()=>openReading(reading,role)));
 return g;
}
ownerGroups.main=stations.append('g').attr('data-owner-revision','main');
station(ownerGroups.main,{x:495,y:201,q:3,title:'LocalDaemonTransport file',lines:['socket I/O · accepted recovery','embedded transfer receiver'],reading:'ownership'});
station(ownerGroups.main,{x:341,y:455,q:1,title:'OrderedCommandOutput',lines:['command-execution-result.ts','capture retained'],reading:'ownership',role:'capture'});
ownerGroups.head=stations.append('g').attr('data-owner-revision','head');
station(ownerGroups.head,{x:363,y:183,q:1,title:'Execution client',lines:['execution-client.ts','accepted recovery'],reading:'reattach',role:'recovery'});
station(ownerGroups.head,{x:746,y:186,q:1,title:'Socket client',lines:['socket-client.ts','raw I/O'],reading:'ownership',role:'socket'});
station(ownerGroups.head,{x:712,y:464,q:1,title:'Transfer receiver',lines:['result-transfer-receiver.ts','manifest + next offset'],reading:'fetch',role:'receiver'});
station(ownerGroups.head,{x:342,y:458,q:1,title:'Output capture',lines:['client-result-capture.ts','appended records + digest'],reading:'fetch',role:'capture'});

const storm=svg.append('g').attr('aria-hidden',true);
storm.append('ellipse').attr('cx',853).attr('cy',307).attr('rx',37).attr('ry',64).attr('fill','#bc7442').attr('opacity',.075);
storm.selectAll('line').data(d3.range(28)).join('line').attr('x1',i=>829+(i%4)*15).attr('x2',i=>823+(i%4)*15).attr('y1',i=>255+Math.floor(i/4)*15).attr('y2',i=>267+Math.floor(i/4)*15).attr('stroke',palette.orange).attr('stroke-width',1.2).attr('opacity',.6);
const stormLabel=label(storm,849,401,'LINK CLOSE',9,palette.orange,'middle','svg-mono svg-label');
const failureMark=svg.append('g').attr('class','clickable-zone').attr('role','button').attr('tabindex',0).attr('aria-label','Read 04: Exhausted fetch corruption is terminal');
failureMark.append('circle').attr('cx',605).attr('cy',365).attr('r',18).attr('fill','#f0e2cf').attr('stroke',palette.orange);
failureMark.append('path').attr('d','M598,358L612,372M612,358L598,372').attr('stroke',palette.orange).attr('stroke-width',2);
failureMark.on('click',()=>openReading('failure')).on('keydown',e=>activate(e,()=>openReading('failure')));
const foot=svg.append('g').attr('aria-hidden',true);
label(foot,26,545,'H = SELECTED ROLES / SOURCE FILE',9,'#4c695f');
label(foot,26,558,'CONTOURS & GEOGRAPHY ARE ILLUSTRATIVE',8,'#657b6f');
const concentration=label(foot,882,546,'1 + 1 + 1 + 1 = 4 roles',10,palette.ink,'end');
label(foot,882,559,'local calls simplified · socket hop at dashed line',8,'#657b6f','end');

// D3 supplies optical zoom, pointer anchoring and drag/pinch handling.
const zoom=d3.zoom().extent([[0,0],[1120,570]]).translateExtent([[0,0],[1120,570]]).scaleExtent([1,3.5]).clickDistance(5).on('zoom',e=>svg.attr('transform',e.transform));
svgRoot.call(zoom).on('dblclick.zoom',null);
$('#zoom-in').addEventListener('click',()=>svgRoot.transition().duration(state.paused?0:300).call(zoom.scaleBy,1.45));
$('#zoom-out').addEventListener('click',()=>svgRoot.transition().duration(state.paused?0:300).call(zoom.scaleBy,1/1.45));
$('#zoom-fit').addEventListener('click',()=>svgRoot.transition().duration(state.paused?0:300).call(zoom.transform,d3.zoomIdentity));

function activate(event,fn){if(event.key==='Enter'||event.key===' '){event.preventDefault();fn();}}
function animateWinds(){
 streams.selectAll('path').interrupt('wind');
 storm.interrupt('rain');
 if(state.paused||document.hidden){return;}
 const run=(sel,duration)=>{
  if(state.paused||document.hidden)return;
  sel.attr('stroke-dashoffset',0).transition('wind').duration(duration).ease(d3.easeLinear).attr('stroke-dashoffset',-25).on('end',()=>run(sel,duration));
 };
 run(d3.select('#wind-request'),1350);
 if(state.condition!=='exhausted')run(d3.select('#wind-result'),1650);
 function rainfall(){
  if(state.paused||document.hidden||state.condition==='clear')return;
  storm.attr('opacity',.9).transition('rain').duration(1250).ease(d3.easeSinInOut).attr('opacity',.45).transition('rain').duration(1250).attr('opacity',.9).on('end',rainfall);
 }
 rainfall();
}
function updateRevision(animate=true){
 document.querySelectorAll('[data-revision]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.revision===state.revision)));
 $('#revision-note').textContent=state.revision==='head'?'Four roles. Four package files. Still client-side.':'Four roles. Three share the transport file in apps/cli.';
 for(const rev of ['main','head']){
  const active=rev===state.revision;
  contourGroups[rev].interrupt();
  const changed=animate&&!state.paused?contourGroups[rev].transition().duration(900):contourGroups[rev];
  changed.attr('opacity',active?1:0);
  ownerGroups[rev].attr('display',active?null:'none').attr('aria-hidden',!active);
  ownerGroups[rev].selectAll('[tabindex]').attr('tabindex',active?0:-1);
 }
 packageTitle.text(state.revision==='head'?'packages/daemon':'apps/cli owns all four roles').attr('x',state.revision==='head'?227:237);
 cliTitle.attr('opacity',state.revision==='head'?1:0);
 concentration.text(state.revision==='head'?'1 + 1 + 1 + 1 = 4 roles':'3 + 1 = 4 roles');
 requestLabel.attr('x',state.revision==='head'?567:760);
 setFront(animate);
}
function updateCondition(){
 const c=conditions[state.condition];
 $('#condition').value=state.condition;
 $('#report-kicker').textContent=c.kicker;
 $('#report-title').textContent=c.title;
 $('#report-description').textContent=c.description;
 $('#report-values').innerHTML=c.values.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
 requestLabel.text(c.wire);resultLabel.text(c.result);stormLabel.text(c.rain);
 const receiverState={fetch:'kept · next offset 1',reattach:'fresh · next offset 0',exhausted:'incomplete · terminal',clear:'validated · complete'}[state.condition];
 const captureState={fetch:'kept · record 0 appended',reattach:'fresh · starts empty',exhausted:'partial output disposed',clear:'returned after acknowledgement'}[state.condition];
 svg.selectAll('[data-role-detail="receiver"]').text(receiverState);
 svg.selectAll('[data-role-detail="combined"]').text('receiver '+receiverState);
 svg.selectAll('[data-role-detail="capture"]').text(captureState);
 const resultGeometry=state.condition==='exhausted'?windLine([[1020,318],[839,340],[625,363]]):pathResult;
 streams.selectAll('[data-flow-background="result"]').attr('d',resultGeometry);
 d3.select('#wind-result').attr('d',resultGeometry).attr('marker-end',state.condition==='exhausted'?null:'url(#arrow-result)');
 storm.attr('display',state.condition==='clear'?'none':null);
 failureMark.attr('display',state.condition==='exhausted'?null:'none').attr('tabindex',state.condition==='exhausted'?0:-1);
 d3.select('#wind-result').attr('opacity',state.condition==='exhausted'?.28:1);
 animateWinds();
}
function motionState(){
 const b=$('#motion-toggle');
 b.setAttribute('aria-pressed',String(state.paused));
 b.innerHTML=state.paused?'▷ Resume motion':'Ⅱ Pause motion';
 if(state.paused){contourLayer.selectAll('*').interrupt();front.selectAll('*').interrupt();updateRevision(false);}
 animateWinds();
}
document.querySelectorAll('[data-revision]').forEach(b=>b.addEventListener('click',()=>{state.revision=b.dataset.revision;updateRevision();}));
$('#condition').addEventListener('change',e=>{state.condition=e.target.value;updateCondition();});
$('#motion-toggle').addEventListener('click',()=>{state.paused=!state.paused;motionState();});
$('#trace-condition').addEventListener('click',()=>openReading(conditions[state.condition].reading));
reduced.addEventListener('change',e=>{state.paused=e.matches;motionState();});
document.addEventListener('visibilitychange',animateWinds);

const readingDialog=$('#reading-dialog'), sourceDialog=$('#source-dialog');
let opener,sourceOpener,activeReceipt;
function openReading(id,role=null,history=true){
 const index=data.readings.findIndex(r=>r.id===id);if(index<0)return;
 if(!readingDialog.open)opener=document.activeElement;
 state.reading=index;state.role=role;
 renderReading();
 if(!readingDialog.open)readingDialog.showModal();
 readingDialog.scrollTop=0;
 if(history)window.history.pushState({reading:id},'',`#reading/${id}`);
}
function renderReading(){
 const r=data.readings[state.reading];
 $('#reading-label').textContent=`READING ${r.number} / ${data.readings.length.toString().padStart(2,'0')} · ${state.revision==='head'?'#149':'MAIN'} MAP`;
 let owner='';
 if(state.role){const role=data.roles.find(x=>x.id===state.role);if(role){const key=role[state.revision];owner=`<div class="dialog-owner"><b>${esc(role.name)} / ${esc(role[state.revision+'Owner'])}</b><br>${esc(data.sources[key].path)}<br>${state.revision==='head'?'Daemon package, client process':'CLI source, client process'}</div>`;}}
 $('#reading-content').innerHTML=`<h2 id="reading-title">${esc(r.title)}</h2>${owner}<p class="reading-summary">${esc(r.summary)}</p><p><span class="status ${r.status}">${r.status==='mixed'?'STATED + UNEXPLAINED':'STATED'}</span> ${esc(r.reason)}</p><hr><p>${esc(r.mechanism)}</p><p>${esc(r.detail)}</p><p class="eyebrow">CHECK THE SOURCE</p><div class="receipts">${r.receipts.map((q,i)=>`<button class="receipt-button" data-receipt="${r.id}:${i}">${esc(q.label)} <span>${q.start}–${q.end} ↗</span></button>`).join('')}</div>${r.id==='tests'?'<p><a href="main-tests.log">34 main tests</a> · <a href="head-tests.log">80 tip tests</a> · <a href="evidence/transport-test.diff">full scoped test diff</a></p>':''}`;
 $('#previous-reading').disabled=state.reading===0;$('#next-reading').disabled=state.reading===data.readings.length-1;
}
function closeReading(update=true){
 if(sourceDialog.open)sourceDialog.close();
 readingDialog.close();
 if(update)window.history.replaceState({},'',opener?.closest('.bulletin')?'#'+opener.closest('.bulletin').id:'#map');
 if(opener?.isConnected)opener.focus({preventScroll:true});
}
document.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>closeReading()));
readingDialog.addEventListener('cancel',e=>{e.preventDefault();closeReading();});
$('#previous-reading').addEventListener('click',()=>openReading(data.readings[state.reading-1].id));
$('#next-reading').addEventListener('click',()=>openReading(data.readings[state.reading+1].id));
document.addEventListener('click',e=>{
 const read=e.target.closest('[data-reading]');if(read){e.preventDefault();openReading(read.dataset.reading);return;}
 const receipt=e.target.closest('[data-receipt]');if(receipt){e.preventDefault();const [id,i]=receipt.dataset.receipt.split(':');openSource(data.readings.find(x=>x.id===id).receipts[+i]);}
});
function openSource(receipt){
 sourceOpener=document.activeElement;activeReceipt=receipt;state.full=false;
 const s=data.sources[receipt.source];
 $('#source-title').textContent=s.path;
 $('#source-meta').textContent=`${s.revision} · ${s.commit} · SHA-256 ${s.sha256}`;
 $('#standalone-source').href=`evidence/sources/${s.key}.${s.key.startsWith('pr-')?'txt':'html#L'+receipt.start}`;
 renderSource();sourceDialog.showModal();$('#source-code').scrollTop=0;
}
function renderSource(){
 const q=activeReceipt,s=data.sources[q.source],lines=s.text.split('\n');
 $('#full-source').textContent=state.full?'Show excerpt':'Show full source';
 $('#source-code').innerHTML=lines.map((line,i)=>({line,n:i+1})).filter(x=>state.full||(x.n>=q.start&&x.n<=q.end)).map(x=>`<span class="source-line${x.n>=q.start&&x.n<=q.end?' marked':''}" data-line="${x.n}"><b>${x.n}</b>${esc(x.line)||' '}</span>`).join('');
}
$('#full-source').addEventListener('click',()=>{state.full=!state.full;renderSource();const first=$('#source-code .marked');if(first)$('#source-code').scrollTop=first.offsetTop-$('#source-code').offsetTop-16;});
function closeSource(){sourceDialog.close();sourceOpener?.focus({preventScroll:true});}
$('#close-source').addEventListener('click',closeSource);
sourceDialog.addEventListener('cancel',e=>{e.preventDefault();closeSource();});
function restoreHash(){const match=location.hash.match(/^#reading\/([a-z]+)$/);if(match)openReading(match[1],null,false);else if(readingDialog.open)closeReading(false);}
window.addEventListener('popstate',restoreHash);
window.addEventListener('beforeprint',()=>{$('.source-book').open=true;svgRoot.call(zoom.transform,d3.zoomIdentity);});
updateRevision(false);updateCondition();motionState();restoreHash();
window.weatherMap={state,data,conditions};
