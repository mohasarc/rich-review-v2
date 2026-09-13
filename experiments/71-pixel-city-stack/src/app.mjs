import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {hierarchy, treemap, treemapSquarify} from 'd3-hierarchy';
import {gsap} from 'gsap';
import PF from 'pathfinding';
import readings from './readings.json';

const D=window.CITY_DATA,F=window.CITY_FACTS;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=n=>n.toLocaleString('en-US');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const filesByPath=new Map(D.files.map(f=>[f.path,f]));
const owners={daemon:['#69c4c7','Daemon'],host:['#e59b76','CLI host'],core:['#afce90','Core'],typescript:['#a99cdc','TypeScript'],renderer:['#e7cc87','Renderer'],telemetry:['#cf9cb8','Telemetry'],infrastructure:['#8fa0a6','Infrastructure']};
const state={step:25,file:null,role:'all',roads:false,trace:false,playing:false,district:null,reading:'stage'};
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const canvasHost=$('#canvas-host'),city=$('#city');
let renderer,scene,camera,controls,roadGroup,selection,playTimer,lastOpener,receiptFile,receiptMode='source',movedRoadCount=0,roadRoutes=[];
const meshes=new Map(),districtObjects=[],pickables=[],plots=new Map(),materials=[];
const W=144,H=100;
let geometry,frameNo=0,needsRender=false;

function readingAt(step){return readings.find(r=>r.step===step&&r.id!=='tests')||readings.find(r=>step<=r.step)||readings[5];}
function fileState(f){return D.snapshots[state.step][f.id];}
function writeHash(replace=false){const p=new URLSearchParams({skyline:String(state.step)});if(state.file!==null)p.set('file',state.file);if(state.reading)p.set('reading',state.reading);history[replace?'replaceState':'pushState']({},'',`#${p}`);}
function parseHash(){const p=new URLSearchParams(location.hash.slice(1));if(!p.has('skyline'))return;const n=Number(p.get('skyline'));if(Number.isInteger(n)&&n>=0&&n<=26)state.step=n;const f=Number(p.get('file'));state.file=p.has('file')&&D.files[f]?f:null;state.reading=readings.some(r=>r.id===p.get('reading'))?p.get('reading'):readingAt(state.step).id;}
function setStep(n,{history=true,animate=true}={}){
 state.step=Math.max(0,Math.min(26,n));state.reading=readingAt(state.step).id;
 updateScene(animate);updateUI();if(history)writeHash();
}
function selectFile(id,{history=true}={}){state.file=id===null?null:Number(id);updateSelection();updatePicker();updateBlock();if(state.roads)drawRoads();if(history)writeHash();render();}

function makeLayout(){
 const groups=Object.keys(D.districts).map(id=>{
  const files=D.files.filter(f=>f.district===id).sort((a,b)=>a.owner.localeCompare(b.owner)||a.role.localeCompare(b.role)||a.path.localeCompare(b.path));
  return {id,children:files.map(f=>({file:f,weight:Math.max(3.7,Math.sqrt(files.length))/files.length}))};
 });
 const root=hierarchy({children:groups}).sum(d=>d.weight||0);
 treemap().tile(treemapSquarify).size([W,H]).paddingOuter(3).paddingInner(2).paddingTop(d=>d.depth===1?6:0).round(true)(root);
 for(const d of root.children){
  districtObjects.push({id:d.data.id,x:d.x0-W/2,z:d.y0-H/2,w:d.x1-d.x0,h:d.y1-d.y0,cx:(d.x0+d.x1-W)/2,cz:(d.y0+d.y1-H)/2});
 }
 for(const n of root.leaves()){
  const f=n.data.file;plots.set(f.id,{x:(n.x0+n.x1-W)/2,z:(n.y0+n.y1-H)/2,w:Math.max(.65,n.x1-n.x0-.45),d:Math.max(.65,n.y1-n.y0-.45)});
 }
}
makeLayout();

function windowTexture(role){
 const c=document.createElement('canvas');c.width=16;c.height=16;const x=c.getContext('2d');x.fillStyle='#4c6a6e';x.fillRect(0,0,16,16);x.fillStyle='#c9e6db';
 if(role==='test'){for(let a=2;a<16;a+=6)for(let b=2;b<16;b+=6)if((a+b)%12===4)x.fillRect(a,b,3,3);}
 if(role==='mechanism'){for(let a=2;a<16;a+=5)x.fillRect(a,3,2,9);}
 if(role==='contract'){x.fillRect(2,3,12,2);x.fillRect(2,10,12,2);}
 if(role==='support'){x.fillStyle='#6f8988';x.fillRect(0,14,16,2);}
 const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;return t;
}
function initCity(){
 try{
  renderer=new THREE.WebGLRenderer({antialias:false,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1)*.9);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0x101a22,0);canvasHost.appendChild(renderer.domElement);
  scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-100,100,70,-70,.1,600);camera.position.set(145,172,182);camera.lookAt(0,0,0);
  controls=new OrbitControls(camera,renderer.domElement);controls.enableRotate=false;controls.enableDamping=false;controls.screenSpacePanning=true;controls.mouseButtons.LEFT=THREE.MOUSE.PAN;controls.mouseButtons.RIGHT=THREE.MOUSE.PAN;controls.touches.ONE=THREE.TOUCH.PAN;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;controls.minZoom=.65;controls.maxZoom=5;controls.addEventListener('change',render);
  scene.add(new THREE.AmbientLight(0xc9e4e9,1.8));const sun=new THREE.DirectionalLight(0xffe5bb,2.2);sun.position.set(-70,140,20);scene.add(sun);
  const ground=new THREE.Mesh(new THREE.BoxGeometry(W+7,.8,H+7),new THREE.MeshLambertMaterial({color:0x1d3139}));ground.position.y=-.5;scene.add(ground);
  geometry=new THREE.BoxGeometry(1,1,1);
  for(const d of districtObjects){
   const pad=new THREE.Mesh(new THREE.BoxGeometry(d.w,.28,d.h),new THREE.MeshLambertMaterial({color:d.id==='daemon'?0x244349:d.id==='cli'?0x343d40:0x2a3c42}));pad.position.set(d.cx,-.01,d.cz);scene.add(pad);
   const edges=new THREE.LineSegments(new THREE.EdgesGeometry(pad.geometry),new THREE.LineBasicMaterial({color:0x526b6d,transparent:true,opacity:.6}));edges.position.copy(pad.position);scene.add(edges);
   const label=document.createElement('button');label.className='district-label';label.dataset.district=d.id;label.innerHTML=`${D.districts[d.id].label}<small></small>`;label.title=D.districts[d.id].name+' — locate district';label.addEventListener('click',()=>focusDistrict(d.id));$('#district-labels').appendChild(label);d.label=label;
  }
  for(const f of D.files){
   const p=plots.get(f.id),color=new THREE.Color(owners[f.owner][0]);const tex=windowTexture(f.role);
   const side=new THREE.MeshLambertMaterial({color,map:tex,transparent:true});const roof=new THREE.MeshLambertMaterial({color:color.clone().multiplyScalar(1.12),transparent:true});materials.push(side,roof);
   const m=new THREE.Mesh(geometry,[side,side,roof,roof,side,side]);m.position.set(p.x,.4,p.z);m.scale.set(p.w,.8,p.d);m.userData={file:f.id,side,roof,tex};scene.add(m);meshes.set(f.id,m);pickables.push(m);
   const rim=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(p.w,.04,p.d)),new THREE.LineBasicMaterial({color:0x6e9091,transparent:true,opacity:.4}));rim.position.set(p.x,.18,p.z);scene.add(rim);m.userData.rim=rim;
   const crossG=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-p.w/2,0,-p.d/2),new THREE.Vector3(p.w/2,0,p.d/2),new THREE.Vector3(-p.w/2,0,p.d/2),new THREE.Vector3(p.w/2,0,-p.d/2)]);
   const cross=new THREE.LineSegments(crossG,new THREE.LineBasicMaterial({color:0xc79179,transparent:true,opacity:.8}));cross.position.set(p.x,.23,p.z);cross.visible=false;scene.add(cross);m.userData.cross=cross;
  }
  roadGroup=new THREE.Group();scene.add(roadGroup);
  selection=new THREE.BoxHelper(undefined,0xffeb9d);scene.add(selection);selection.visible=false;
  new ResizeObserver(resize).observe(city);resize();bindPicking();
 }catch(error){$('#webgl-error').hidden=false;console.warn('Pixel city renderer unavailable:',error.message);}
 $('#loading').hidden=true;
}
function resize(){if(!renderer)return;const w=city.clientWidth,h=city.clientHeight;renderer.setSize(w,h,false);const aspect=w/h,span=Math.max(107,180/aspect);camera.left=-span*aspect/2;camera.right=span*aspect/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();render();}
function render(){needsRender=true;}
function drawFrame(){
 if(!needsRender)return;needsRender=false;
 if(!renderer||!scene)return;frameNo++;
 if(selection&&state.file!==null){selection.setFromObject(meshes.get(state.file));selection.visible=true;}
 renderer.render(scene,camera);
 for(const d of districtObjects){
  const v=new THREE.Vector3(d.cx,.7,d.z+2.2).project(camera);d.label.style.left=`${(v.x*.5+.5)*city.clientWidth}px`;d.label.style.top=`${(-v.y*.5+.5)*city.clientHeight}px`;d.label.style.display=v.z>1||v.x < -1.1||v.x>1.1||v.y < -1.1||v.y>1.1?'none':'';
 }
}
gsap.ticker.add(drawFrame);
function fitCity(){if(!controls)return;gsap.killTweensOf(camera);gsap.killTweensOf(controls.target);controls.target.set(0,0,0);camera.position.set(145,172,182);camera.zoom=1;camera.updateProjectionMatrix();controls.update();state.district=null;updatePicker();render();}
function focusPosition(x,z,zoom=2){if(!controls)return;const dx=x-controls.target.x,dz=z-controls.target.z;camera.position.x+=dx;camera.position.z+=dz;controls.target.set(x,0,z);camera.zoom=zoom;camera.updateProjectionMatrix();controls.update();render();}
function focusDistrict(id){const d=districtObjects.find(x=>x.id===id);state.district=id;focusPosition(d.cx,d.cz,1.8);updatePicker();}
function heightFor(s){return s[0]?(s[1]+s[2]? .55+.4*Math.sqrt(s[1]+s[2]):.55):.13;}
function updateScene(animate=true){
 if(!scene)return;
 const routePaths=state.step===26?['apps/cli/src/cli.ts','apps/cli/src/cli-invocation-coordinator.ts','packages/daemon/src/client/daemon-client.ts']:['apps/cli/src/cli.ts','apps/cli/src/daemon/daemon-command-dispatcher.ts','apps/cli/src/daemon/local-daemon-transport.ts'];
 for(const f of D.files){const s=fileState(f),m=meshes.get(f.id),p=plots.get(f.id),h=heightFor(s);const seen=s[0]||s[5]>0;const removed=!s[0]&&s[5]>0;const dim=state.role!=='all'&&state.role!==f.role;const untouched=s[1]+s[2]===0;
  m.visible=!!seen;m.userData.rim.visible=!!seen;m.userData.cross.visible=!!removed;
  const color=removed?'#72594c':owners[f.owner][0];m.userData.side.color.set(color);m.userData.roof.color.set(color);
  const traceDim=state.trace&&!routePaths.includes(f.path);
  m.userData.side.opacity=m.userData.roof.opacity=traceDim?.1:dim?.13:state.trace?1:untouched?.24:removed?.35:1;
  m.userData.side.depthWrite=m.userData.roof.depthWrite=!traceDim;
  m.userData.rim.material.opacity=removed?.9:dim?.1:.35;
  m.userData.tex.repeat.set(Math.max(.5,p.w/2),Math.max(.35,h/3));
  gsap.killTweensOf(m.scale);gsap.killTweensOf(m.position);
  const duration=animate&&!reduced.matches?.55:0;
  gsap.to(m.scale,{y:h,duration,ease:'power2.out',onUpdate:render});gsap.to(m.position,{y:h/2+.18,duration,ease:'power2.out'});
 }
 for(const d of districtObjects){const fs=D.files.filter(f=>f.district===d.id);const present=fs.filter(f=>fileState(f)[0]).length;d.label.querySelector('small').textContent=present?`${present} standing paths`:'future addresses';}
 drawRoads();updateSelection();render();
}
function updateSelection(){if(!selection)return;selection.visible=state.file!==null;if(state.file!==null){const m=meshes.get(state.file);selection.setFromObject(m);selection.material.color.set(0xffe3a1);}}

function gridForRoads(){
 const grid=new PF.Grid(W+9,H+9);
 for(const [id,p] of plots){if(!D.snapshots[state.step][id][0])continue;
  for(let x=Math.ceil(p.x+W/2+4-p.w/2);x<=Math.floor(p.x+W/2+4+p.w/2);x++)for(let z=Math.ceil(p.z+H/2+4-p.d/2);z<=Math.floor(p.z+H/2+4+p.d/2);z++)if(grid.isInside(x,z))grid.setWalkableAt(x,z,false);
 }
 return grid;
}
function routeBetween(a,b,color,dashed=false){
 if(!a||!b)return;const pa=plots.get(a.id),pb=plots.get(b.id),grid=gridForRoads();
 function door(p){const sx=Math.round(p.x+W/2+4),sz=Math.round(p.z+H/2+4);for(let j=sz;j<=Math.ceil(sz+p.d/2+1)&&grid.isInside(sx,j);j++)grid.setWalkableAt(sx,j,true);return [sx,sz];}
 const start=door(pa),end=door(pb);const finder=new PF.AStarFinder({allowDiagonal:false});const path=finder.findPath(...start,...end,grid);roadRoutes.push({from:a.id,to:b.id,points:path.length});if(path.length<2)return;
 const points=PF.Util.compressPath(path).map(([x,z])=>new THREE.Vector3(x-W/2-4,.3,z-H/2-4));
 for(let i=1;i<points.length;i++){
  const a=points[i-1],b=points[i],delta=b.clone().sub(a),len=delta.length(),mid=a.clone().add(b).multiplyScalar(.5);
  const base=new THREE.Mesh(new THREE.BoxGeometry(delta.x?len+.6:1.0,.04,delta.z?len+.6:1.0),new THREE.MeshBasicMaterial({color:0x14232a}));base.position.copy(mid);roadGroup.add(base);
  if(dashed){for(let dist=0;dist<len;dist+=1.5){const p=a.clone().addScaledVector(delta.clone().normalize(),Math.min(len,dist+.4));const dash=new THREE.Mesh(new THREE.BoxGeometry(delta.x?.8:.25,.06,delta.z?.8:.25),new THREE.MeshBasicMaterial({color}));dash.position.copy(p);dash.position.y=.36;roadGroup.add(dash);}}
  else{const lane=new THREE.Mesh(new THREE.BoxGeometry(delta.x?len+.25:.3,.06,delta.z?len+.25:.3),new THREE.MeshBasicMaterial({color}));lane.position.copy(mid);lane.position.y=.36;roadGroup.add(lane);}
 }
 for(const file of [a,b]){
  const p=plots.get(file.id),height=heightFor(fileState(file));
  const mast=new THREE.Mesh(new THREE.BoxGeometry(.17,height+2,.17),new THREE.MeshBasicMaterial({color}));mast.position.set(p.x,(height+2)/2+.2,p.z);roadGroup.add(mast);
  const flag=new THREE.Mesh(new THREE.BoxGeometry(1.3,.75,.2),new THREE.MeshBasicMaterial({color}));flag.position.set(p.x+.55,height+2.1,p.z);roadGroup.add(flag);
 }
}
function drawRoads(){
 if(!roadGroup)return;while(roadGroup.children.length){const c=roadGroup.children[0];c.geometry.dispose();c.material.dispose();roadGroup.remove(c);}
 const get=p=>filesByPath.get(p);movedRoadCount=0;roadRoutes=[];
 if(state.roads&&state.step>0){
  const all=D.prs[state.step-1].renames.filter(r=>get(r.from)&&get(r.to)&&get(r.from).district!==get(r.to).district);
  const chosen=state.file!==null?all.filter(r=>get(r.from).id===state.file||get(r.to).id===state.file):[];
  const sample=chosen.length?chosen:all.slice(0,5);
  for(const r of sample){routeBetween(get(r.from),get(r.to),0x79d9d3,true);movedRoadCount++;}
  $('#road-caption').textContent=all.length?`${sample.length} of ${all.length} cross-district renames at this PR · schematic`:'No cross-district Git renames at this PR · other boundary changes may exist';
  $('.road-caption i').style.background='#79d9d3';
 }else{
  if(state.step<26){routeBetween(get('apps/cli/src/cli.ts'),get('apps/cli/src/daemon/daemon-command-dispatcher.ts'),0xf5d396);routeBetween(get('apps/cli/src/daemon/daemon-command-dispatcher.ts'),get('apps/cli/src/daemon/local-daemon-transport.ts'),0xf5d396);}
  else{routeBetween(get('apps/cli/src/cli.ts'),get('apps/cli/src/cli-invocation-coordinator.ts'),0xf5d396);routeBetween(get('apps/cli/src/cli-invocation-coordinator.ts'),get('packages/daemon/src/client/daemon-client.ts'),0xf5d396);}
  $('#road-caption').textContent=state.step===26?'CLI entry → invocation coordinator → DaemonClient':'CLI entry → CLI dispatcher → local transport';$('.road-caption i').style.background='#f5d396';
 }
}

function bindPicking(){
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
 function hit(e){const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(pickables.filter(m=>m.visible&&m.userData.side.opacity>.2),false)[0];}
 renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];});
 renderer.domElement.addEventListener('pointerup',e=>{if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])<6){const h=hit(e);if(h){selectFile(h.object.userData.file);if(state.roads){drawRoads();render();}}}down=null;});
 renderer.domElement.addEventListener('pointermove',e=>{const h=hit(e),tip=$('#tooltip');if(!h||down){tip.hidden=true;return;}const f=D.files[h.object.userData.file],s=fileState(f),r=city.getBoundingClientRect();tip.innerHTML=`<b>${esc(f.path.split('/').at(-1))}</b>${esc(D.districts[f.district].label)} / ${esc(f.role)}<br>${s[0]?fmt(s[1]+s[2])+' changed lines vs main':'Removed path · foundation'}<br>Click to inspect`;tip.hidden=false;tip.style.left=`${Math.max(8,Math.min(city.clientWidth-270,e.clientX-r.left+13))}px`;tip.style.top=`${Math.min(city.clientHeight-95,e.clientY-r.top+13)}px`;});
 renderer.domElement.addEventListener('pointerleave',()=>$('#tooltip').hidden=true);
}
function updatePicker(){
 const q=$('#search').value.trim().toLowerCase();const selected=state.file;
 const candidates=D.files.filter(f=>(!state.district||f.district===state.district)&&f.path.toLowerCase().includes(q));
 const options=[`<option value="">${candidates.length} surveyed paths${state.district?' in '+D.districts[state.district].label:''}</option>`];
 for(const f of candidates){const s=fileState(f);options.push(`<option value="${f.id}">${s[0]?'▰':s[5]?'×':'·'} ${esc(f.path)}</option>`);}
 $('#file-picker').innerHTML=options.join('');$('#file-picker').value=selected===null?'':String(selected);
}
function updateBlock(){
 const f=state.file===null?null:D.files[state.file];$('#focus-block').disabled=!f;$('#file-receipt').disabled=!f;
 if(!f){$('#block-details').innerHTML='<p class="block-limits">Choose a building in the city or a path above. Selection stays put when you move through PRs.</p>';return;}
 const s=fileState(f),present=!!s[0],last=s[5],status=present?(s[1]+s[2]?'Standing · changed':'Standing · unchanged vs main'):last?'Removed · foundation':'Not yet present';
 const sameStep=state.step>0?D.prs[state.step-1].renames.find(r=>r.from===f.path||r.to===f.path):null;
 $('#block-details').innerHTML=`<h3 class="block-name">${esc(f.path.split('/').at(-1))}</h3><p class="block-path">${esc(f.path)}</p><dl class="block-facts"><dt>District</dt><dd>${esc(D.districts[f.district].name)}</dd><dt>Concern</dt><dd style="color:${owners[f.owner][0]}">${owners[f.owner][1]}</dd><dt>Windows</dt><dd>${f.role} <span style="color:#8da5a9">(path rule)</span></dd><dt>State</dt><dd class="state-chip ${!present?'removed':''}">${status}</dd><dt>vs main</dt><dd>+${fmt(s[1])} / −${fmt(s[2])} lines</dd><dt>This PR</dt><dd>+${fmt(s[3])} / −${fmt(s[4])} lines</dd><dt>Last edit</dt><dd>${last?'#'+D.prs[last-1].number:'main baseline'}</dd></dl>${sameStep?`<button class="text-button" id="counterpart">Find ${sameStep.from===f.path?'new':'old'} address →</button>`:''}<p class="block-limits">${present?'Height uses the square root of the total changed lines above.':'An empty lot has no height encoding; the deleted text remains in the receipt.'}</p>`;
 if(sameStep)$('#counterpart').addEventListener('click',()=>selectFile(filesByPath.get(sameStep.from===f.path?sameStep.to:sameStep.from).id));
}
function updateUI(){
 const p=state.step?D.prs[state.step-1]:null,reading=readingAt(state.step);
 $('#scene-label').textContent=`${String(state.step).padStart(2,'0')} / 26 · ${p?'#'+p.number:'MAIN'}`;
 $('#revision-number').textContent=`SKYLINE ${state.step} / 26${p?' · #'+p.number:''}`;
 $('#revision-title').textContent=p?p.title:'Before the stack';
 $('#revision-counts').innerHTML=p?`+${fmt(p.surface.add)} <span class="minus">/ −${fmt(p.surface.delete)}</span><small>${p.surface.paths} physical text paths · this PR, moves counted at both addresses</small>`:'0 changed lines<small>Only paths touched later in this stack are surveyed.</small>';
 $('#revision-reading').textContent=state.step===0?'The surveyed baseline has daemon concerns inside CLI. Future addresses are empty.':reading.summary;
 $('#step-reason').disabled=!p;
 $('#map-phase').textContent=state.step===26?'CUTOVER / DAEMON OWNS THE MECHANISMS':state.step===25?'STAGED / CLI STILL ACTIVE':state.step>=7?'DAEMON DISTRICT EXISTS / CLI PATH STILL LOCAL':state.step===0?'MAIN / THE SURVEYED BASELINE':'REUSABLE WORK FINDS ITS OWNER';
 $('#scrub').value=state.step;$('#scrub').setAttribute('aria-valuetext',p?`PR ${p.number}: ${p.title}`:'main baseline');
 $$('#milestones button').forEach((b,i)=>{b.classList.toggle('active',i===state.step);b.classList.toggle('passed',i<=state.step);b.setAttribute('aria-current',i===state.step?'step':'false');});
 $('#previous').disabled=state.step===0;$('#next').disabled=state.step===26;
 updatePicker();updateBlock();
}

function stop(){state.playing=false;playTimer?.kill();$('#play').innerHTML='▶ <span>Grow the city</span>';$('#play').setAttribute('aria-label','Play through skylines');}
function advance(){if(!state.playing)return;if(state.step===26){stop();return;}setStep(state.step+1,{history:false});writeHash(true);playTimer=gsap.delayedCall(1.45,advance);}
function play(){if(state.playing){stop();return;}if(state.step===26)setStep(0);state.playing=true;$('#play').innerHTML='Ⅱ <span>Pause skyline</span>';$('#play').setAttribute('aria-label','Pause skyline playback');playTimer=gsap.delayedCall(1.45,advance);}

function openDialog(kind,title){stop();lastOpener=document.activeElement;$('#receipt-kind').textContent=kind;$('#receipt-title').textContent=title;$('#receipt-meta').textContent='';$('#receipt-content').textContent='Loading local receipt…';$('.receipt-tabs').hidden=kind!=='PHYSICAL PATH RECEIPT';$('#receipt').showModal();$('#close-receipt').focus();}
function sourceLines(source,isDiff=false){return '<pre>'+source.split('\n').map((l,i)=>`<span class="source-line ${isDiff&&l.startsWith('+')?'add':isDiff&&l.startsWith('-')?'del':''}"><span class="ln">${i+1}</span>${esc(l)}</span>`).join('')+'</pre>';}
async function loadFile(id){if(window.CITY_SOURCES[id])return window.CITY_SOURCES[id];return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=`evidence/files/${id}.js`;script.onload=()=>resolve(window.CITY_SOURCES[id]);script.onerror=()=>reject(new Error('Local receipt could not be loaded.'));document.head.append(script);});}
async function showFileReceipt(id,step=state.step){receiptFile={id,step};receiptMode='source';openDialog('PHYSICAL PATH RECEIPT',D.files[id].path);await renderFileReceipt();}
async function renderFileReceipt(){
 if(!receiptFile)return;const{id,step}=receiptFile,f=D.files[id],s=D.snapshots[step][id];
 $('#show-source').classList.toggle('active',receiptMode==='source');$('#show-diff').classList.toggle('active',receiptMode==='diff');
 try{const data=await loadFile(id);if(receiptFile.id!==id||receiptFile.step!==step)return;
  const present=!!s[0],last=s[5],sha=D.revisions[step];
  $('#receipt-meta').textContent=receiptMode==='source'?`${present?'Source exists at':'Path absent at'} ${step?'#'+D.prs[step-1].number:'main'} · ${sha}${present?' · blob '+s[6]:''}`:last?`Last edit to this physical path: #${D.prs[last-1].number} · ${D.revisions[last-1]} → ${D.revisions[last]} · no rename folding`:'No edit before this skyline; baseline source only.';
  const source=receiptMode==='source'?(present?data.sources[s[6]]:'This physical path does not exist at the selected skyline. Open “Last change to this path” for its deletion, or choose an earlier skyline.'):(last?data.diffs[last]:'No change from the main baseline at this skyline.');
  $('#receipt-content').innerHTML=sourceLines(source,receiptMode==='diff');
  $('#github-source').href=`https://github.com/mohasarc/symnav/blob/${sha}/${f.path}`;$('#github-source').hidden=!present;
 }catch(e){$('#receipt-content').textContent=e.message;}
}
function showReasons(r){openDialog('STATED REASONS / FROZEN PR BODIES',r.title);$('#receipt-meta').textContent=r.reason;$('#receipt-content').innerHTML=r.prs.map(n=>{const p=D.prs.find(p=>p.number===n);return `<h3>#${n} · ${esc(p.title)}</h3><p class="block-limits">head ${p.sha} · supplied bundle, not a live PR</p>${sourceLines(p.body)}`;}).join('');}
function showStepReason(){const p=D.prs[state.step-1];if(!p)return;showReasons({title:'#'+p.number+' · '+p.title,reason:'The supplied PR body is the author’s evidence. It is not a correctness or parity result.',prs:[p.number]});}
function showWorkerPatch(){openDialog('RENAME-AWARE TEST RECEIPT','A moved test changes what it observes');$('#receipt-meta').textContent=`#147 → #148 · ${D.revisions[24]} → ${D.revisions[25]} · removed worker observations and the direct host replacement`;$('#receipt-content').innerHTML='<h3>Worker test: generic fixture, removed duration fields and mismatch case</h3>'+sourceLines(F.selectedWorkerPatch,true)+'<h3>Host executor: direct version rejection restored</h3>'+sourceLines(F.hostVersionPatch,true);}

function bindUI(){
 $('#milestones').innerHTML=['main',...D.prs.map(p=>p.number)].map((n,i)=>`<button data-index="${i}" class="${[5,7,13,24,25,26].includes(i)?'milestone':''}" title="${i?'#'+n+' — '+esc(D.prs[i-1].title):'main baseline'}" aria-label="${i?'Skyline '+i+', PR '+n:'Main baseline'}">${n}</button>`).join('');
 $$('#milestones button').forEach(b=>b.addEventListener('click',()=>{stop();setStep(Number(b.dataset.index));}));
 $$('[data-step]').forEach(b=>b.addEventListener('click',()=>{stop();setStep(Number(b.dataset.step));}));
 $('#scrub').addEventListener('input',()=>{stop();setStep(Number($('#scrub').value),{history:false});});$('#scrub').addEventListener('change',()=>writeHash());
 $('#previous').addEventListener('click',()=>{stop();setStep(state.step-1);});$('#next').addEventListener('click',()=>{stop();setStep(state.step+1);});$('#play').addEventListener('click',play);
 $('#fit').addEventListener('click',fitCity);$('#zoom-in').addEventListener('click',()=>{if(camera){camera.zoom=Math.min(5,camera.zoom*1.3);camera.updateProjectionMatrix();render();}});$('#zoom-out').addEventListener('click',()=>{if(camera){camera.zoom=Math.max(.65,camera.zoom/1.3);camera.updateProjectionMatrix();render();}});
 $('#trace-road').addEventListener('click',()=>{state.trace=!state.trace;state.roads=false;$('#trace-road').setAttribute('aria-pressed',state.trace);$('#road-toggle').setAttribute('aria-pressed','false');updateScene(false);});
 $('#road-toggle').addEventListener('click',()=>{state.roads=!state.roads;state.trace=false;$('#trace-road').setAttribute('aria-pressed','false');$('#road-toggle').setAttribute('aria-pressed',state.roads);updateScene(false);});
 $$('[data-role]').forEach(b=>b.addEventListener('click',()=>{state.role=b.dataset.role;$$('[data-role]').forEach(n=>n.classList.toggle('active',n===b));updateScene(false);}));
 $('#search').addEventListener('input',()=>{state.district=null;updatePicker();});$('#file-picker').addEventListener('change',()=>selectFile($('#file-picker').value===''?null:Number($('#file-picker').value)));
 $('#clear-block').addEventListener('click',()=>selectFile(null));$('#focus-block').addEventListener('click',()=>{if(state.file!==null){const p=plots.get(state.file);focusPosition(p.x,p.z,2.2);}});$('#file-receipt').addEventListener('click',()=>{if(state.file!==null)showFileReceipt(state.file);});
 $('#step-reason').addEventListener('click',showStepReason);
 $$('[data-reading-step]').forEach(b=>b.addEventListener('click',()=>{const r=readings.find(r=>r.id===b.dataset.readingStep);stop();setStep(r.step,{history:false});state.reading=r.id;const f=r.files.map(p=>filesByPath.get(p)).find(Boolean);if(f)selectFile(f.id,{history:false});writeHash();fitCity();city.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});}));
 $$('[data-reading-receipt]').forEach(b=>b.addEventListener('click',()=>showReasons(readings.find(r=>r.id===b.dataset.readingReceipt))));
 $$('[data-source-path]').forEach(b=>b.addEventListener('click',()=>{const f=filesByPath.get(b.dataset.sourcePath);if(f)showFileReceipt(f.id,Number(b.dataset.sourceStep));}));
 $('#worker-patch').addEventListener('click',showWorkerPatch);
 $('#close-receipt').addEventListener('click',()=>$('#receipt').close());$('#receipt').addEventListener('close',()=>{lastOpener?.focus();});
 $('#show-source').addEventListener('click',()=>{receiptMode='source';renderFileReceipt();});$('#show-diff').addEventListener('click',()=>{receiptMode='diff';renderFileReceipt();});
 city.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();stop();setStep(state.step+1);}if(e.key==='ArrowLeft'){e.preventDefault();stop();setStep(state.step-1);}if(e.key==='Home'){e.preventDefault();stop();setStep(0);}if(e.key==='End'){e.preventDefault();stop();setStep(26);}if(e.key==='Escape'){selectFile(null);fitCity();}});
 window.addEventListener('popstate',()=>{stop();parseHash();updateScene(false);updateUI();});
 $('#owner-swatches').innerHTML=Object.entries(owners).map(([k,[c,label]])=>`<span><i style="background:${c}"></i>${label}</span>`).join('');
 $('#census').textContent=`${D.files.length} touched text paths surveyed. District = package/app; repository is an infrastructure annex.`;
}

parseHash();bindUI();initCity();updateScene(false);updateUI();
if(state.file===null&&state.step===25)selectFile(filesByPath.get('packages/daemon/src/client/daemon-client.ts').id,{history:false});
window.CITY_APP={
 get state(){return {...state};},
 get renderInfo(){return {ready:!!renderer,frameNo,standing:D.files.filter(f=>fileState(f)[0]).length,removed:D.files.filter(f=>!fileState(f)[0]&&fileState(f)[5]).length,meshVisible:[...meshes.values()].filter(m=>m.visible).length,movedRoadCount,roadRoutes,zoom:camera?.zoom};},
 project(id){if(!camera)return null;const m=meshes.get(id),v=m.position.clone();v.y+=m.scale.y/2;v.project(camera);const r=city.getBoundingClientRect();return {x:(v.x*.5+.5)*r.width+r.left,y:(-v.y*.5+.5)*r.height+r.top};},
 districts:districtObjects.map(({id,x,z,w,h})=>({id,x,z,w,h}))
};
