import { Application, Container, Graphics, Text, ParticleContainer, Particle } from 'pixi.js';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import receipts from '../evidence/receipts.json';
import { observed, fixture, options, purposes, getSteps } from './scenes.js';
gsap.registerPlugin(MotionPathPlugin);

const $=s=>document.querySelector(s);
const palette={ink:0xe7eeea,muted:0xa4b6bb,line:0x3b5865,cyan:0x76deeb,amber:0xf0bf77,violet:0xb8a6f7,mint:0xa7e2bb,coral:0xfa997e,panel:0x142b36,dark:0x10232e};
let scene='transfer',condition='resume',steps=[],timeline,phase={value:0},active=-1,paintKey='',lastTrigger,app,stage,geometry,labels,particles,marker,markerLabel,traceLayer,heldOnce=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const dotPool=[];const bytePool=[];const slotOffsets=[[-33,-32],[33,-32],[-33,32],[33,32]];
const center={server:{x:189,y:195},client:{x:811,y:195}};
const textures={};let rawPath=null;
const receiptMap=new Map(receipts.map(r=>[r.id,r]));
const htmlEscape=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

function showReceipt(id,trigger){
 const r=receiptMap.get(id);if(!r)return;
 timeline?.pause();syncPlay();lastTrigger=trigger;
 $('#receipt-title').textContent=r.title;
 $('#receipt-path').textContent=`${r.side} · ${r.revision}\n${r.path} · lines ${r.start}–${r.end??r.start+r.text.split('\n').length-1}`;
 $('#receipt-code').textContent=r.text.split('\n').map((line,i)=>`${String(r.start+i).padStart(4)}  ${line}`).join('\n');
 $('#receipt-hash').textContent=r.sha256?`Full-file SHA-256 ${r.sha256}`:'Frozen bundle / comparison receipt';
 $('#receipt-full').href=`sources.html#${id}`;
 $('#receipt').showModal();$('#close-receipt').focus();
}
document.addEventListener('click',event=>{
 const link=event.target.closest('[data-source]');if(link){event.preventDefault();showReceipt(link.dataset.source,link);}
 const jump=event.target.closest('[data-jump]');if(jump){loadScene(jump.dataset.jump,jump.dataset.condition);$('#return-surface').href=`#${jump.closest('li').id}`;$('#instrument').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});$('#play').focus({preventScroll:true});}
});
$('#close-receipt').onclick=()=>$('#receipt').close();
$('#receipt').addEventListener('close',()=>lastTrigger?.focus({preventScroll:true}));
$('#receipt').addEventListener('click',e=>{if(e.target===$('#receipt')){const r=$('#receipt').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#receipt').close();}});

function label(text,x,y,{size=11,color=palette.muted,align='center',mono=false,weight='400',source}={}){
 if(window.innerWidth<=620)size=Math.max(size,12);
 const t=new Text({text,style:{fontFamily:mono?'Menlo, Consolas, monospace':'Avenir Next, Segoe UI, sans-serif',fontSize:size,fill:color,fontWeight:weight,align,lineHeight:size*1.45},resolution:2});
 t.anchor.set(align==='center'?.5:align==='right'?1:0,0);t.position.set(x,y);labels.addChild(t);
 if(source){t.eventMode='static';t.cursor='pointer';t.on('pointertap',()=>showReceipt(source,$('#inspect-source')));}
 return t;
}
function line(g,x1,y1,x2,y2,color=palette.line,width=1,alpha=1){g.moveTo(x1,y1).lineTo(x2,y2).stroke({color,width,alpha});}
function dashedCircle(g,cx,cy,r,color,alpha=1){for(let i=0;i<44;i++){const start=i*Math.PI*2/44;g.arc(cx,cy,r,start,start+.085).stroke({color,width:1,alpha});}}
function glyph(g,kind,x,y,size,color,alpha=1){
 if(kind==='stderr')g.poly([x,y-size,x+size,y+size,x-size,y+size]).fill({color,alpha});
 else if(kind==='stdout')g.roundRect(x-size,y-size,size*2,size*2,3).fill({color,alpha});
 else if(kind==='bad')g.poly([x,y-size,x+size,y,x,y+size,x-size,y]).fill({color,alpha});
 else g.circle(x,y,size).fill({color,alpha});
}
function recordSlot(owner,n,filled,{dim=false,bad=false}={}){
 const c=center[owner],offset=slotOffsets[n],x=c.x+offset[0],y=c.y+offset[1];
 geometry.circle(x,y,25).fill(palette.dark).stroke({color:filled?(bad?palette.coral:n===1?palette.amber:palette.cyan):palette.line,width:1,alpha:dim?.4:1});
 if(filled)glyph(geometry,n===1?'stderr':'stdout',x,y,10,bad?palette.coral:n===1?palette.amber:palette.cyan,dim?.3:.9);
 label(String(n),x,y-7,{size:10,color:filled?palette.dark:palette.muted,mono:true,weight:'600',source:owner==='server'?'spool':'manifest'});
}
function drawOwnerShells(s,cap){
 geometry.roundRect(38,58,302,263,128).fill({color:0x19323e,alpha:.45}).stroke({color:palette.line,width:1});
 geometry.roundRect(660,58,302,263,128).fill({color:0x19323e,alpha:.45}).stroke({color:palette.line,width:1});
 label('DAEMON PROCESS',189,24,{size:10,mono:true,color:palette.ink});
 label('CLIENT PROCESS',811,24,{size:10,mono:true,color:palette.ink});
 label(scene==='identity'?'AcceptedRequestLedger':'DeliverySession / spool',189,44,{size:9,source:scene==='identity'?'ledger':'ack-server'});
 label(s.caller?'Caller / output':'TransferReceiver / capture',811,44,{size:9,source:'finish'});
 label('FRAMED CONNECTION',500,150,{size:9,mono:true});
 for(let i=0;i<28;i++)line(geometry,353+i*10.8,194,358+i*10.8,194,palette.line,1,.6);
 line(geometry,368,255,632,255,palette.line,1,.8);line(geometry,368,251,368,259);line(geometry,632,251,632,259);
 label('transport boundary',500,265,{size:9});
 geometry.circle(189,195,94).stroke({color:palette.cyan,width:1,alpha:.28});
 geometry.circle(811,195,94).stroke({color:s.validated?palette.mint:s.manifest?palette.violet:palette.line,width:s.validated?2:1,alpha:.8});
 label(scene==='identity'?'R7 / ACCEPTED IDENTITY':s.server===null?'T1 / UNOBSERVED':'T1 / STORED RESULT',189,92,{size:9,color:s.server===null?palette.amber:palette.cyan,mono:true,source:'spool'});
 label(s.disposed?'CAPTURE DISPOSED':s.caller?'CALLER-OWNED':s.manifest?'T1 / MATCHED MANIFEST':'AWAIT MANIFEST',811,92,{size:9,color:s.disposed?palette.coral:s.caller?palette.mint:palette.violet,mono:true,source:'manifest'});
 for(let n=0;n<4;n++){if(scene!=='identity')recordSlot('server',n,s.server!==0&&s.server!==null);recordSlot('client',n,n<cap);}
 label(scene==='identity'?'result not yet observed':s.server===null?'ack outcome unknown':s.server===0?'0 bytes / spool removed':'21 bytes / 4 records',189,300,{size:10,color:s.server===0?palette.muted:palette.ink});
 label(s.disposed?'no usable output':`${cap} records captured`,811,300,{size:10,color:s.disposed?palette.coral:palette.ink});
 geometry.roundRect(93,338,192,30,15).fill(palette.dark).stroke({color:s.acknowledged?palette.mint:palette.violet,width:1});
 glyph(geometry,'control',112,353,4,palette.violet);label(`R7 · ledger entry ${s.acknowledged?'✓':'1'}`,196,345,{size:10,color:palette.ink,mono:true,source:'ack-ledger'});
 label('retained identity',189,372,{size:8});
 geometry.roundRect(723,338,176,30,4).fill(palette.dark).stroke({color:s.caller?palette.mint:palette.line,width:1});
 if(!s.caller){for(let x=730;x<888;x+=12)line(geometry,x,365,x+16,342,palette.line,1,.45);}
 label(s.caller?'OUTPUT DISPOSAL → CALLER':'LOCAL EXECUTOR · GATED',811,347,{size:9,color:s.caller?palette.mint:palette.muted,mono:true,source:'runtime'});
 if(s.cut){line(geometry,485,169,515,216,palette.coral,3);line(geometry,501,169,531,216,palette.coral,1,.5);label('connection closed',500,219,{size:10,color:palette.coral});}
 if(s.motion==='fetch'||s.motion==='reattach'||s.motion==='conflict')label(s.motion==='fetch'?'result-fetch · offset 2':s.motion==='conflict'?'R7 · changed payload':'execute · identical R7',500,68,{size:11,color:s.bad?palette.coral:palette.mint,mono:true});
 if(s.motion==='manifest'||s.motion==='bad-manifest')label(s.bad?'manifest · T2 ≠ T1':'result-manifest · T1',500,171,{size:10,color:s.bad?palette.coral:palette.violet});
 if(s.motion==='ack')label('acknowledge · T1',500,86,{size:11,color:palette.mint,mono:true});
 if(s.motion==='end')label('result-end · 4 / 21 / SHA',500,173,{size:10,color:palette.violet});
 if(s.hold){line(geometry,708,158,708,237,palette.amber,3);label('append pending',598,217,{size:11,color:palette.amber});}
 if(s.motion==='digest-fail'){label('SHA-256 MISMATCH',500,194,{size:13,color:palette.coral,mono:true});}
 else if(s.validated&&!s.motion&&!s.caller)label('DIGEST MATCHED',500,194,{size:12,color:palette.mint,mono:true});
 else if(s.caller)label('COMPLETION RESOLVED',500,194,{size:11,color:palette.mint,mono:true});
 if(s.matched){geometry.circle(189,353,0);label('matching entry reused',500,195,{size:12,color:palette.mint});}
 if(s.blocked)label('retrySafe = false',500,218,{size:12,color:palette.coral,mono:true});
 if(s.bad&&!s.motion&&!s.blocked)label(scene==='identity'&&condition==='conflict'?'CONFLICT REJECTED':'COMPLETION FAILED',500,194,{size:11,color:palette.coral,mono:true});
}
function drawIdentity(s){
 // Identity scenes share the process boundary, but enlarge the object that collides.
 geometry.circle(189,195,64).fill(palette.panel).stroke({color:s.bad?palette.violet:palette.mint,width:2});
 label('R7',189,162,{size:36,color:palette.ink,mono:true,source:'ledger'});
 label('ACCEPTED ENTRY',189,215,{size:9,color:palette.violet,mono:true});
 label('fingerprint retained',189,235,{size:8});
 if(s.matched)dashedCircle(geometry,189,195,71,palette.mint);
}
function framingStatic(s,arrived){
 const f=observed.framing;
 geometry.roundRect(30,62,280,256,20).fill({color:0x19323e,alpha:.6}).stroke({color:palette.line,width:1});
 geometry.roundRect(365,62,286,256,20).fill({color:0x19323e,alpha:.6}).stroke({color:palette.line,width:1});
 geometry.roundRect(714,62,252,256,116).fill({color:0x19323e,alpha:.6}).stroke({color:palette.line,width:1});
 label('ENCODED WIRE FRAME',170,24,{size:10,color:palette.ink,mono:true});
 label('DECODER BUFFER',507,24,{size:10,color:palette.ink,mono:true});
 label('DECODED RESULT CHUNK',840,24,{size:10,color:palette.ink,mono:true});
 label('one dot = one byte',170,43,{size:9});label('holds incomplete envelope',507,43,{size:9});label('emitted atomically',840,43,{size:9});
 label(`186 B / 0x${f.prefixHex}`,170,277,{size:10,color:palette.ink,mono:true});
 label('length gate',678,135,{size:8,color:palette.amber});
 for(let i=0;i<4;i++)geometry.roundRect(669+i*5,165,3,64,1).fill({color:palette.amber,alpha:(s.decoded&&arrived)?.22:.9});
 label(s.bad?'REJECTED':s.decoded&&arrived?'1 COMPLETE RECORD':'0 RECORDS EMITTED',840,270,{size:10,color:s.bad?palette.coral:s.decoded&&arrived?palette.cyan:palette.muted,mono:true});
 geometry.circle(840,194,58).stroke({color:s.bad?palette.coral:palette.line,width:1});
 if(s.decoded&&arrived){glyph(geometry,'stdout',840,194,22,palette.cyan);label('0',840,179,{size:20,color:palette.dark,mono:true,weight:'600'});}
 if(s.bad&&arrived){glyph(geometry,'bad',840,194,24,palette.coral);label('×',840,177,{size:25,color:palette.dark});}
 label('PREFIX',71,350,{size:8,color:palette.amber,align:'left',mono:true});label('4 B',139,346,{size:15,color:palette.amber,mono:true});
 label('HEADER LENGTH',231,350,{size:8,color:palette.violet,align:'left',mono:true});label('4 B',357,346,{size:15,color:palette.violet,mono:true});
 label('JSON HEADER',458,350,{size:8,color:palette.violet,align:'left',mono:true});label('172 B',577,346,{size:15,color:palette.violet,mono:true});
 label('RAW PAYLOAD',710,350,{size:8,color:palette.cyan,align:'left',mono:true});label('6 B',830,346,{size:15,color:palette.cyan,mono:true});
}
function pointOf(owner,n){const c=center[owner],d=slotOffsets[n];return{x:c.x+d[0],y:c.y+d[1]};}
function motionPath(s){
 let points;
 if(s.motion==='record'||s.motion==='bad-record'||s.motion==='hold-record'){
  const a=pointOf('server',s.record),b=pointOf('client',s.record);points=[a,{x:365,y:195},{x:615,y:195},b];
  if(s.bad)points=[a,{x:400,y:195},{x:700,y:195},{x:592,y:231}];
  if(s.hold)points=[a,{x:365,y:195},{x:615,y:195},{x:694,y:195}];
 }else if(['fetch','reattach','conflict','ack'].includes(s.motion)){
  const target=s.motion==='reattach'||s.motion==='conflict'?{x:189,y:195}:{x:189,y:135};
  points=[{x:811,y:145},{x:620,y:96},{x:410,y:96},target];
  if(s.motion==='conflict')points=[...points,{x:370,y:266}];
 }else if(s.motion){points=[{x:189,y:195},{x:400,y:195},{x:615,y:195},{x:811,y:195}];if(s.motion==='bad-manifest')points=[...points.slice(0,-1),{x:710,y:195},{x:590,y:229}];}
 if(!points)return null;
 const raw=MotionPathPlugin.arrayToRawPath(points,{curviness:s.motion==='record'?.5:.8});MotionPathPlugin.cacheRawPathMeasurements(raw);return raw;
}
function metric(labelId,valueId,labelText,value){$(labelId).textContent=labelText;$(valueId).textContent=String(value);}
function render(){
 if(!app||!steps.length)return;
 const index=Math.min(steps.length-1,Math.floor(phase.value));const progress=Math.min(1,phase.value-index);const s=steps[index];
 const arrived=progress>.93||(!s.motion&&scene!=='framing');let cap=s.captured;
 if(s.motion==='record'&&!arrived)cap--;
 const key=`${scene}/${condition}/${index}/${arrived}`;
 if(paintKey!==key){
  paintKey=key;geometry.clear();labels.removeChildren().forEach(t=>t.destroy());traceLayer.clear();
  if(scene==='framing')framingStatic(s,progress>.93);else{drawOwnerShells(s,cap);if(scene==='identity')drawIdentity(s);}
  rawPath=motionPath(s);
 }
 traceLayer.clear();
 if(scene!=='framing'&&scene!=='identity'){
  const previous=index?steps[index-1].trace:s.trace;
  const traceAlpha=gsap.utils.interpolate(previous,s.trace,gsap.parseEase('power1.inOut')(progress));
  dashedCircle(traceLayer,189,195,120,palette.muted,traceAlpha*.55);
 }
 if(scene==='framing'){
  const count=progress>.93?s.supplied:Math.floor(gsap.utils.interpolate(s.previous??s.supplied,s.supplied,gsap.parseEase('power1.inOut')(progress)));
  bytePool.forEach((p,n)=>{
   const received=n<count;const row=Math.floor(n/19),col=n%19;
   p.x=(received?393:57)+col*12.4;p.y=105+row*14.8;
   p.alpha=1;p.tint=n<4?palette.amber:n<180?palette.violet:palette.cyan;
   if(s.bad&&n===185&&received)p.tint=palette.coral;
  });
  metric('#metric-a-label','#metric-a','BUFFERED BYTES',`${count} / 186`);
  metric('#metric-b-label','#metric-b','DECODED RECORDS',s.decoded&&count===186?1:0);
  metric('#metric-c-label','#metric-c','ENVELOPE',s.bad?'rejected':count===186?'complete':'waiting');
 }else{
  for(const p of bytePool)p.alpha=0;
  metric('#metric-a-label','#metric-a',scene==='identity'?'LEDGER ENTRIES':scene==='lifetime'?'SERVER SPOOL':'CAPTURED RECORDS',scene==='identity'?1:scene==='lifetime'?`${s.server===0?0:21} bytes`:`${cap} / 4`);
  metric('#metric-b-label','#metric-b',scene==='identity'?(condition==='conflict'?'PAYLOAD MATCH':'EXECUTE CONNECTIONS'):scene==='lifetime'?'DIAGNOSTIC TRACE':'NEXT RECORD OFFSET',scene==='identity'?(condition==='conflict'?(index<2?'original':'conflicting'):(index<2?1:2)):scene==='lifetime'?(s.trace===0?'expired':s.trace<1?'retained':'retained'):cap);
  metric('#metric-c-label','#metric-c',scene==='lifetime'?'LEDGER ENTRIES':'LOCAL REPLAY',scene==='lifetime'?1:'withheld');
 }
 marker.visible=Boolean(rawPath);markerLabel.visible=Boolean(rawPath);
 const tint=s.bad?palette.coral:['fetch','ack','reattach'].includes(s.motion)?palette.mint:['record','hold-record'].includes(s.motion)?(s.record===1?palette.amber:palette.cyan):palette.violet;
 dotPool.forEach((p,n)=>{
  if(!rawPath){p.alpha=0;return;}
  const at=n/(dotPool.length-1);const pos=MotionPathPlugin.getPositionOnPath(rawPath,at,true);p.x=pos.x;p.y=pos.y;p.tint=tint;p.alpha=at<=progress?.16+.45*at:.035;
 });
 if(rawPath){
  const pos=MotionPathPlugin.getPositionOnPath(rawPath,progress,true);marker.clear();const kind=s.bad?'bad':['record','hold-record'].includes(s.motion)?s.record===1?'stderr':'stdout':'control';glyph(marker,kind,0,0,s.motion==='reattach'||s.motion==='conflict'?19:11,tint);marker.position.set(pos.x,pos.y);
  markerLabel.text=['reattach','conflict'].includes(s.motion)?'R7':['record','hold-record'].includes(s.motion)?String(s.record):s.motion==='fetch'?'↶':s.motion==='ack'?'✓':s.motion==='manifest'?'M':s.motion==='end'?'E':'×';markerLabel.position.set(pos.x,pos.y);markerLabel.style.fill=palette.dark;
 }
 if(active!==index){
  active=index;$('#step-kicker').textContent=s.kicker;$('#step-title').textContent=s.title;$('#step-copy').textContent=s.copy;$('#inspect-source').dataset.source=s.source;$('#inspect-source').href=`sources.html#${s.source}`;
  $('#step-position').textContent=`${String(index+1).padStart(2,'0')} / ${String(steps.length).padStart(2,'0')}`;
  $('#back').disabled=index===0;$('#next').disabled=index===steps.length-1;
  $('#release-append').hidden=!s.hold;
 }
 $('#scrub').value=String(Math.round(phase.value/steps.length*1000));
 app.renderer.render(app.stage);
 window.chamberState={scene,condition,index,progress:Number(progress.toFixed(3)),title:s.title,captured:cap,spool:s.server,trace:s.trace,ledger:s.ledger,caller:!!s.caller,source:s.source,playing:!timeline?.paused(),steps:steps.length};
 if(s.hold&&progress>.95&&!timeline.paused()&&!heldOnce){heldOnce=true;timeline.pause();syncPlay();}
}
function syncPlay(){const running=timeline&&!timeline.paused();$('#play').textContent=running?'Ⅱ Pause':'▶ Play';$('#play').setAttribute('aria-label',running?'Pause simulation':'Play simulation');}
function seekStep(index){timeline.pause().seek((Math.max(0,Math.min(steps.length-1,index))+.98)*1.6);render();syncPlay();}
function updateURL(){const hash=`chamber=${scene}/${condition}`;history.replaceState(null,'',`#${hash}`);}
function loadScene(which,nextCondition,initial=false){
 if(!options[which])return;scene=which;condition=nextCondition&&options[which].some(o=>o[0]===nextCondition)?nextCondition:options[which][0][0];
 steps=getSteps(scene,condition);active=-1;paintKey='';heldOnce=false;
 $('#scenario').innerHTML=options[scene].map(([v,t])=>`<option value="${v}" ${v===condition?'selected':''}>${htmlEscape(t)}</option>`).join('');
 document.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scene===scene)));
 $('#scene-purpose').textContent=purposes[scene];
 timeline?.kill();phase.value=0;
 timeline=gsap.timeline({paused:true,onUpdate:render,onComplete:()=>{timeline.pause();syncPlay();}});
 timeline.to(phase,{value:steps.length,duration:steps.length*1.6,ease:'none'});
 seekStep(initial&&scene==='transfer'&&condition==='resume'?4:0);if(!initial)updateURL();
}
document.querySelectorAll('[data-scene]').forEach(b=>b.onclick=()=>loadScene(b.dataset.scene));
$('#scenario').onchange=e=>loadScene(scene,e.target.value);
$('#play').onclick=()=>{if(timeline.paused()){if(phase.value>=steps.length-.01)timeline.seek(0);timeline.play();}else timeline.pause();syncPlay();};
$('#back').onclick=()=>seekStep(active-1);$('#next').onclick=()=>seekStep(active+1);$('#reset').onclick=()=>seekStep(0);
$('#release-append').onclick=()=>seekStep(active+1);
$('#scrub').oninput=e=>{timeline.pause().seek(Number(e.target.value)/1000*steps.length*1.6);render();syncPlay();};
window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#chamber=([^/]+)\/([^/]+)$/);if(m)loadScene(m[1],m[2],true);});
reduced.addEventListener('change',()=>{if(reduced.matches){timeline?.pause();syncPlay();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){timeline?.pause();syncPlay();}});

async function init(){
 app=new Application();
 await app.init({width:1000,height:392,backgroundAlpha:0,antialias:true,resolution:Math.min(devicePixelRatio,2),autoDensity:true,autoStart:false,preference:'webgl',powerPreference:'low-power'});
 $('#canvas-fallback').remove();$('#chamber').append(app.canvas);app.canvas.setAttribute('aria-hidden','true');
 stage=new Container();app.stage.addChild(stage);
 geometry=new Graphics();traceLayer=new Graphics();labels=new Container();
 stage.addChild(geometry,traceLayer);
 const dotGraphic=new Graphics().circle(3,3,2.3).fill(0xffffff);textures.dot=app.renderer.generateTexture({target:dotGraphic,resolution:2});dotGraphic.destroy();
 particles=new ParticleContainer({dynamicProperties:{position:true,color:true,rotation:false,vertex:false},roundPixels:false});stage.addChild(particles);
 for(let n=0;n<55;n++){const p=new Particle({texture:textures.dot,alpha:0});particles.addParticle(p);dotPool.push(p);}
 for(let n=0;n<186;n++){const p=new Particle({texture:textures.dot,alpha:0});particles.addParticle(p);bytePool.push(p);}
 stage.addChild(labels);marker=new Graphics();stage.addChild(marker);markerLabel=new Text({text:'',style:{fontFamily:'Menlo, monospace',fontSize:12,fill:palette.dark,fontWeight:'600'},resolution:2});markerLabel.anchor.set(.5);stage.addChild(markerLabel);
 marker.eventMode='static';marker.cursor='pointer';marker.on('pointertap',()=>showReceipt(steps[active].source,$('#inspect-source')));
 const resize=()=>{const el=$('#chamber');const w=el.clientWidth,h=el.clientHeight;app.renderer.resize(w,h);stage.scale.set(Math.min(w/1000,h/392));stage.position.set((w-1000*stage.scale.x)/2,(h-392*stage.scale.y)/2);paintKey='';render();};
 new ResizeObserver(resize).observe($('#chamber'));
 const match=location.hash.match(/^#chamber=([^/]+)\/([^/]+)$/);loadScene(match?.[1]??'transfer',match?.[2]??'resume',true);resize();
 window.chamberReady=true;
}
init().catch(error=>{console.error(error);$('#canvas-fallback').innerHTML='<p>The WebGL chamber could not start.</p><p>Read the seven facts below, or open the source book.</p>';});
