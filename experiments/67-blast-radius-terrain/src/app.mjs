import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { contours, hierarchy, tree, scalePoint, forceSimulation, forceX, forceY, forceCollide } from 'd3';
import data from './data.json';

const $ = id => document.getElementById(id);
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const short = file => file.split('/').at(-1);
const records = new Map(data.records.map(r=>[r.id,r]));
const peaks = data.peaks.map(p=>({...p,...records.get(p.id)}));
const peakMap = new Map(peaks.map(p=>[p.id,p]));
const viewport = $('viewport');
let selected = 'output', pair = null, fileFocus = null, currentReceipt = null, fullSource = false;
let renderer, scene, camera, controls, mesh, markerGroup, connectionGroup, boundaryGroup;
let mode = 'relief', showCoupling = true, showBoundary = false;
let terrainReady = false;
const pins = [], screenLabels = [], ridgeObjects = [], faultObjects = [];
const unit = 5, gridSize = 220, gridSteps = 220, half = gridSize/2;
const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));
const smooth = t => t*t*(3-2*t);

// The measured overlap tree supplies adjacency. D3 supplies all peak placement.
function branch(id, parent) {
  return {id,children:data.ridges.filter(l=>l.source===id||l.target===id)
    .map(l=>l.source===id?l.target:l.source).filter(x=>x!==parent)
    .sort((a,b)=>peaks.findIndex(p=>p.id===a)-peaks.findIndex(p=>p.id===b))
    .map(next=>branch(next,id))};
}
const layout = hierarchy(branch('resources'));
tree().size([204,108]).separation((a,b)=>a.parent===b.parent?1:1.4)(layout);
layout.each(n=>Object.assign(peakMap.get(n.data.id),{x:n.x-102,z:n.y-54}));
const ridges = data.ridges.map(l=>({...l,a:peakMap.get(l.source),b:peakMap.get(l.target)}));
function hill(x,z,p) {
  const radius = 15+p.count*1.15;
  const q = Math.hypot(x-p.x,z-p.z)/radius;
  return p.count*Math.pow(Math.max(0,1-q*q),2);
}
function ridge(x,z,r) {
  const dx=r.b.x-r.a.x,dz=r.b.z-r.a.z, length2=dx*dx+dz*dz;
  const t=clamp(((x-r.a.x)*dx+(z-r.a.z)*dz)/length2,0,1);
  const distance=Math.hypot(x-r.a.x-t*dx,z-r.a.z-t*dz);
  const width=3.5+r.count*2;
  const saddle=Math.min(r.a.count,r.b.count)*(.22+.06*r.count);
  const spine=t<.5?r.a.count+(saddle-r.a.count)*smooth(t*2):saddle+(r.b.count-saddle)*smooth((t-.5)*2);
  return spine*Math.pow(Math.max(0,1-distance*distance/(width*width)),2);
}
function altitude(x,z) {
  let h=0;
  for(const p of peaks) h=Math.max(h,hill(x,z,p));
  for(const r of ridges) h=Math.max(h,ridge(x,z,r));
  return h;
}
function biome(x,z,h) {
  let total=0; const color=new THREE.Color(0,0,0);
  for(const p of peaks) {
    const weight=Math.exp(-(Math.hypot(x-p.x,z-p.z)**2)/510);
    total+=weight; color.add(new THREE.Color(p.color).multiplyScalar(weight));
  }
  color.multiplyScalar(1/Math.max(total,1e-10));
  const paper=new THREE.Color('#dce1cf');
  color.lerp(paper, h<.08?1:Math.max(.17,.74-h*.085));
  return color;
}

function makeLine(points, color, dashed=false, opacity=1) {
  const material = dashed ? new THREE.LineDashedMaterial({color,dashSize:1.2,gapSize:.9,transparent:true,opacity})
    : new THREE.LineBasicMaterial({color,transparent:true,opacity});
  const object=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),material);
  if(dashed)object.computeLineDistances();
  return object;
}
function surfacePath(a,b,offset=.25) {
  return Array.from({length:65},(_,i)=>{
    const t=i/64,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;
    return new THREE.Vector3(x,altitude(x,z)*unit+offset,z);
  });
}
function createTerrain() {
  scene=new THREE.Scene(); scene.background=new THREE.Color('#e6e9dc');
  camera=new THREE.OrthographicCamera(-130,130,90,-90,.1,1000);
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-label','Three-dimensional policy reference terrain');
  renderer.domElement.setAttribute('role','img');
  viewport.prepend(renderer.domElement);
  controls=new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=false; controls.enablePan=true;
  controls.minZoom=.65; controls.maxZoom=3.5;
  controls.minPolarAngle=.01; controls.maxPolarAngle=Math.PI*.46;
  controls.addEventListener('change',render);
  scene.add(new THREE.HemisphereLight('#ffffff','#b2bda2',1.1));
  const light=new THREE.DirectionalLight('#fff9e8',1.2);light.position.set(-110,200,95);scene.add(light);

  const geometry=new THREE.PlaneGeometry(gridSize,gridSize,gridSteps,gridSteps);
  geometry.rotateX(-Math.PI/2);
  const positions=geometry.attributes.position, colors=[];
  for(let i=0;i<positions.count;i++) {
    const x=positions.getX(i),z=positions.getZ(i),h=altitude(x,z);
    positions.setY(i,h*unit);
    const color=biome(x,z,h);colors.push(color.r,color.g,color.b);
  }
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const land=[];
  for(let i=0;i<geometry.index.count;i+=3){
    const a=geometry.index.getX(i),b=geometry.index.getX(i+1),c=geometry.index.getX(i+2);
    if(Math.max(positions.getY(a),positions.getY(b),positions.getY(c))>.04)land.push(a,b,c);
  }
  geometry.setIndex(land);
  geometry.computeVertexNormals();
  mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,metalness:0}));
  scene.add(mesh);

  const size=gridSteps+1;
  const heights=Array.from({length:size*size},(_,i)=>altitude(i%size-half,Math.floor(i/size)-half));
  const isolines=contours().size([size,size]).thresholds([.12,.5,1.5,2.5,3.5,4.5,5.5,6.5])(heights);
  for(const contour of isolines) for(const polygon of contour.coordinates) for(const ring of polygon) {
    const line=makeLine(ring.map(([x,z])=>new THREE.Vector3(x-.5-half,contour.value*unit+.12,z-.5-half)), '#3b5743',false,contour.value===.12?.16:.38);
    scene.add(line);
  }
  connectionGroup=new THREE.Group();scene.add(connectionGroup);
  for(const r of ridges) {
    const line=makeLine(surfacePath(r.a,r.b,.36),'#fffbea',true,.58);connectionGroup.add(line);
    ridgeObjects.push({r,line});
    const x=(r.a.x+r.b.x)/2,z=(r.a.z+r.b.z)/2;
    const button=document.createElement('button');button.className='saddle-label';
    button.textContent='⋈ '+r.count;button.title=`${r.a.name} ↔ ${r.b.name}: ${r.count} shared reader files`;
    button.setAttribute('aria-label',button.title);button.dataset.saddle=r.source+'--'+r.target;
    button.addEventListener('click',()=>selectOverlap(r.source,r.target));$('labels').append(button);
    screenLabels.push({element:button,point:new THREE.Vector3(x,altitude(x,z)*unit+1,z),small:true});
  }

  markerGroup=new THREE.Group();scene.add(markerGroup);
  for(const p of peaks) {
    const point=new THREE.Vector3(p.x,p.count*unit,p.z);
    const pin=new THREE.Mesh(new THREE.SphereGeometry(.95,12,8),new THREE.MeshBasicMaterial({color:'#273d34'}));
    pin.position.copy(point).add(new THREE.Vector3(0,.6,0));markerGroup.add(pin);pins.push({id:p.id,pin});
    const button=document.createElement('button');button.className='peak-label';
    button.dataset.peak=p.id;button.style.setProperty('--biome',p.color);
    button.setAttribute('aria-label',`${p.name}: ${p.count} direct reader files`);
    button.innerHTML=`<span>${escape(p.name)}<small>${p.number} / POLICY</small></span><b>${p.count}</b>`;
    button.addEventListener('click',()=>select(p.id));$('labels').append(button);
    screenLabels.push({element:button,point:point.clone().add(new THREE.Vector3(0,3.5,0)),id:p.id});
  }
  // Fault offsets are editorial locators, with no numerical height or length meaning.
  const faults=data.records.filter(r=>r.kind==='fault');
  const angles=[1.6,-1.15,-2.3,.55,2.65];
  faults.forEach((record,i)=>{
    const p=peakMap.get(record.region),angle=angles[i],dx=Math.cos(angle),dz=Math.sin(angle);
    const a={x:p.x+dx*12-dz*7,z:p.z+dz*12+dx*7},b={x:p.x+dx*32+dz*7,z:p.z+dz*32-dx*7};
    const line=makeLine(surfacePath(a,b,.5),'#9e5c2b',true,.95);scene.add(line);faultObjects.push({id:record.id,line});
    const x=(a.x+b.x)/2,z=(a.z+b.z)/2;
    const button=document.createElement('button');button.className='fault-label';button.textContent=record.number;button.dataset.fault=record.id;
    button.setAttribute('aria-label',record.number+' '+record.name+': unexplained change');
    button.addEventListener('click',()=>select(record.id));$('labels').append(button);
    screenLabels.push({element:button,point:new THREE.Vector3(x,altitude(x,z)*unit+1,z),small:true,fault:true,id:record.id});
  });

  boundaryGroup=new THREE.Group();scene.add(boundaryGroup);boundaryGroup.visible=false;
  // Encircle consumer terrain: authority crosses into the CLI; code does not relocate.
  const linePoints=Array.from({length:180},(_,i)=>{
    const t=i/179*Math.PI*2,x=Math.cos(t)*103,z=Math.sin(t)*100;
    return new THREE.Vector3(x,altitude(x,z)*unit+.45,z);
  });
  boundaryGroup.add(makeLine(linePoints,'#965d30',true,.95));
  const note=document.createElement('div');note.className='boundary-note';note.id='boundary-note';note.hidden=true;
  note.innerHTML='<b>Moved authority, same package.</b> Threshold choice leaves CLI-local defaults. Required slices arrive from packages/daemon. This line is an illustrative authority boundary, not a file move.';document.querySelector('.map-actions').after(note);

  const pointerStart={x:0,y:0};
  renderer.domElement.addEventListener('pointerdown',e=>Object.assign(pointerStart,{x:e.clientX,y:e.clientY}));
  renderer.domElement.addEventListener('pointerup',e=>{
    if(Math.hypot(e.clientX-pointerStart.x,e.clientY-pointerStart.y)>5)return;
    const rect=renderer.domElement.getBoundingClientRect();
    const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);
    const hit=ray.intersectObject(mesh)[0];if(!hit)return;
    const p=[...peaks].sort((a,b)=>Math.hypot(a.x-hit.point.x,a.z-hit.point.z)-Math.hypot(b.x-hit.point.x,b.z-hit.point.z))[0];
    if(altitude(hit.point.x,hit.point.z)>.08)select(p.id);
  });
  terrainReady=true;resize();setView('relief');
  new ResizeObserver(resize).observe(viewport);
}

function projectLabels() {
  if(!terrainReady)return;
  const width=viewport.clientWidth,height=viewport.clientHeight;
  const visible=screenLabels.filter(l=>{
    const saddleVisible=width>=500||pair?.every(id=>l.element.dataset.saddle?.split('--').includes(id));
    const keep=l.id||(showCoupling&&saddleVisible);
    l.element.hidden=!keep;return keep;
  });
  const nodes=visible.map(l=>{
    const p=l.point.clone().project(camera);
    const px=(p.x+1)/2*width,py=(1-p.y)/2*height;
    return {...l,px,py,x:px,y:py,r:l.small?16:57};
  });
  if(width<500){
    // D3 point scales place summit labels on two reading rails on narrow maps.
    // Leader strokes still terminate at the same projected summit coordinates.
    for(const right of [false,true]){
      const group=nodes.filter(l=>!l.small&&(l.px>=width/2)===right).sort((a,b)=>a.py-b.py);
      const rail=scalePoint().domain(group.map(l=>l.id)).range([43,height-60]).padding(.25);
      group.forEach(l=>Object.assign(l,{fx:right?width-54:54,fy:rail(l.id),r:49}));
    }
  }
  // D3 handles label separation; leader strokes preserve each exact summit location.
  const simulation=forceSimulation(nodes).force('x',forceX(d=>clamp(d.px,60,width-60)).strength(.15)).force('y',forceY(d=>clamp(d.py-14,35,height-55)).strength(.25))
    .force('collide',forceCollide(d=>d.r).iterations(3)).stop();
  simulation.tick(80);
  $('leaders').innerHTML='';
  for(const l of nodes) {
    const hidden=(!showCoupling&&!l.id)||l.px<-80||l.px>width+80||l.py<-80||l.py>height+80;
    l.element.hidden=hidden;if(hidden)continue;
    const x=clamp(l.x,l.small?20:54,width-(l.small?20:54)),y=clamp(l.y,24,height-45);
    l.element.style.left=x+'px';l.element.style.top=y+'px';
    const line=document.createElementNS('http://www.w3.org/2000/svg','path');
    line.setAttribute('d',`M${l.px.toFixed(2)},${l.py.toFixed(2)}L${x.toFixed(2)},${y.toFixed(2)}`);
    line.setAttribute('stroke',l.fault?'#9e6531':'#52684c');line.setAttribute('stroke-width','.8');line.setAttribute('opacity','.65');
    $('leaders').append(line);
  }
}
function resize() {
  if(!terrainReady)return;
  const w=viewport.clientWidth,h=viewport.clientHeight;
  renderer.setSize(w,h);
  const extent=Math.max(226,154*w/h);
  const aspect=w/h;camera.left=-extent/2;camera.right=extent/2;camera.top=extent/(2*aspect);camera.bottom=-camera.top;
  camera.updateProjectionMatrix();render();
}
function render() {
  if(!terrainReady)return;
  renderer.render(scene,camera);projectLabels();
}
function setView(next) {
  mode=next;
  $('relief').classList.toggle('active',mode==='relief');$('plan').classList.toggle('active',mode==='plan');
  $('relief').setAttribute('aria-pressed',mode==='relief');$('plan').setAttribute('aria-pressed',mode==='plan');
  if(!terrainReady)return;
  controls.target.set(0,7,0);camera.zoom=1;
  camera.position.set(...(mode==='relief'?[24,185,165]:[0,310,.01]));
  camera.updateProjectionMatrix();controls.update();render();
}
function updateMap() {
  if(!terrainReady)return;
  const relevant=fileFocus?peaks.filter(p=>p.files.includes(fileFocus)).map(p=>p.id):pair||[records.get(selected)?.region||selected];
  for(const p of pins) {
    p.pin.material.color.set(relevant.includes(p.id)?'#9d5424':'#304735');p.pin.scale.setScalar(relevant.includes(p.id)?1.6:1);
  }
  for(const l of screenLabels) {
    l.element.classList.toggle('selected',Boolean(l.id===selected||pair?.includes(l.id)));
    l.element.classList.toggle('muted',Boolean(fileFocus)&&!relevant.includes(l.id)&&!l.small);
    if(l.id)l.element.setAttribute('aria-pressed',Boolean(l.id===selected||pair?.includes(l.id)));
  }
  for(const {r,line} of ridgeObjects) {
    const isPair=pair?.includes(r.source)&&pair?.includes(r.target);
    line.material.color.set(isPair?'#ad5d25':'#fffbea');line.material.opacity=isPair?1:.58;
  }
  for(const {id,line} of faultObjects)line.material.opacity=id===selected?1:.7;
  $('map-status').textContent=fileFocus?short(fileFocus):pair?`${records.get(pair[0]).name} ↔ ${records.get(pair[1]).name}`:'HEAD · b100221';
  render();
}
function receiptButton(r,i) {
  return `<button data-receipt="${i}">${escape(r.label)}<span>${escape(r.side)}:${r.line}</span></button>`;
}
function showReading() {
  const r=records.get(selected),p=peakMap.get(selected);
  $('inspector').dataset.selection=selected;
  const overlapLinks=p?data.links.filter(l=>l.source===p.id||l.target===p.id):[];
  const files=pair?peakMap.get(pair[0]).files.filter(f=>peakMap.get(pair[1]).files.includes(f)):p?.files||[];
  const label=pair?`${records.get(pair[0]).name} ↔ ${records.get(pair[1]).name}`:r.terrain;
  const count=pair?files.length:p?.count;
  const peers=overlapLinks.sort((a,b)=>b.count-a.count).map(l=>{
    const other=l.source===p.id?l.target:l.source;
    return `<button class="overlap-button${pair?.includes(other)?' selected':''}" data-overlap="${other}">${escape(records.get(other).name)} <b>${l.count}</b></button>`;
  }).join('');
  const fileButtons=files.map(f=>{
    const refs=data.references.head.filter(x=>x.file===f&&(pair||[selected]).includes(x.section));
    const locations=new Set(refs.map(x=>x.section+':'+x.line)).size;
    return `<button class="file-button" data-file="${escape(f)}" aria-label="${escape(short(f))}: ${locations} access locations"><span>${escape(short(f))}</span><span>${locations} ↘</span></button>`;
  }).join('');
  const faultLinks=data.records.filter(x=>x.region===selected).map(x=>`<a href="#${x.id}" data-select="${x.id}">${x.number} · ${escape(x.name)} ↗</a>`).join('');
  $('reading').innerHTML=`<div class="reading-kicker" style="--biome:${r.color}"><i></i>${r.number} / ${r.kind==='fault'?'UNEXPLAINED CHANGE':r.kind==='shore'?'TEST BOUNDARY':'POLICY CONTEXT'}</div>
    <div class="reading-heading"><h2>${escape(label)}</h2><div class="altitude">${count??'—'}<small>${pair?'SHARED FILES':p?'DIRECT FILES':'NO ALTITUDE'}</small></div></div>
    <p class="reading-title">${escape(pair?'These policy sections meet in the same source files.':r.title)}</p>
    <p class="reading-detail">${escape(pair?'A shared reader couples inputs in one source module. It does not prove that the settings change together at runtime. Select a file to see both sections’ exact accesses.':r.detail)}</p>
    ${pair?`<button id="leave-saddle" class="back-to-peak">← ${escape(r.name)} peak</button>`:`<div class="mini-boundary"><span><i>BEFORE</i>${escape(r.before)}</span><strong><i>AFTER</i>${escape(r.after)}</strong></div>`}
    ${files.length?`<h3 class="descent-label">${pair?'SHARED READERS':'SUMMIT → READER → EXACT ACCESS'}</h3><div class="file-buttons">${fileButtons}</div><p class="access-hint">Hover a file to mark its other policy regions. Click for source.</p>`:''}
    ${p?`<h3 class="descent-label">CROSS TO A SHARED READER</h3><div class="overlap-buttons">${peers}</div><p class="shared-note">${overlapLinks.length} overlaps; the map draws only the six tree ridges.</p>`:''}
    ${faultLinks?`<div class="local-faults">${faultLinks}</div>`:''}
    <h3 class="descent-label">${pair?'CONTEXT RECEIPTS':'MECHANISM & REASON RECEIPTS'}</h3><div class="receipt-buttons">${r.receipts.map(receiptButton).join('')}</div>
    <p class="reason-detail ${r.status==='Unexplained'?'unexplained':''}"><b>${r.status} reason.</b> ${escape(r.reason)}</p>
    <a class="return-survey" href="#survey-${r.id}">↓ Return to this survey row</a>`;
  $('reading').scrollTop=0;
  $('read-selection').textContent=`Read ${r.name} ↓`;
  $('previous').disabled=data.records[0].id===selected;$('next').disabled=data.records.at(-1).id===selected;
  $('reading').querySelectorAll('[data-file]').forEach(button=>{
    button.addEventListener('mouseenter',()=>{fileFocus=button.dataset.file;updateMap();});
    button.addEventListener('mouseleave',()=>{fileFocus=null;updateMap();});
    button.addEventListener('focus',()=>{fileFocus=button.dataset.file;updateMap();});
    button.addEventListener('blur',()=>{fileFocus=null;updateMap();});
  });
}
function select(id,history=true) {
  if(!records.has(id))return;
  selected=id;pair=null;fileFocus=null;
  if(history&&location.hash!=='#'+id)window.history.pushState(null,'','#'+id);
  showReading();updateMap();
}
function selectOverlap(a,b,history=true) {
  selected=a;pair=[a,b];fileFocus=null;
  if(history)window.history.pushState(null,'',`#${a}~${b}`);
  showReading();updateMap();
}
function fromHash() {
  const parts=decodeURIComponent(location.hash.slice(1)).split('~');
  if(peakMap.has(parts[0])&&peakMap.has(parts[1])&&data.links.some(l=>[l.source,l.target].includes(parts[0])&&[l.source,l.target].includes(parts[1])))selectOverlap(parts[0],parts[1],false);
  else if(records.has(parts[0]))select(parts[0],false);
}
function openFile(file) {
  const sections=pair||[selected];
  const accesses=data.references.head.filter(x=>x.file===file&&sections.includes(x.section));
  const refs=accesses.filter((v,i,all)=>all.findIndex(x=>x.line===v.line&&x.section===v.section)===i);
  openReceipt({source:refs[0].source,start:Math.max(1,refs[0].line-4),end:refs[0].line+12,line:refs[0].line,label:short(file),accesses:refs});
}
function openReceipt(receipt) {
  currentReceipt=receipt;fullSource=false;
  $('receipt-route').textContent=`${records.get(selected).number} / ${records.get(selected).name}${pair?' / shared reader':''} → SOURCE`;
  $('receipt-title').textContent=receipt.label;
  renderReceipt();
  if(!$('receipt').open)$('receipt').showModal();
}
function renderReceipt() {
  const r=currentReceipt,doc=data.sources[r.source];
  $('receipt-meta').textContent=`${doc.side.toUpperCase()} · ${doc.file}\n${doc.sha} · SHA-256 ${doc.hash}`;
  $('source-link').href=`evidence/source/${doc.id}.html#L${r.line}`;
  const lines=doc.text.split('\n'),start=fullSource?1:r.start,end=fullSource?lines.length:Math.min(lines.length,r.end);
  const marked=new Set(r.accesses?.map(x=>x.line)||[r.line]);
  $('source-code').innerHTML=lines.slice(start-1,end).map((line,i)=>`<span class="source-line${marked.has(start+i)?' marked':''}" data-line="${start+i}"><span class="ln">${start+i}</span>${escape(line)}</span>`).join('');
  $('full-source').textContent=fullSource?'Show excerpt':'Show full file';
  let list=$('access-list');
  if(!list){list=document.createElement('div');list.id='access-list';$('source-code').before(list);}
  list.hidden=!r.accesses;
  list.innerHTML=r.accesses?`<label for="access-select">${r.accesses.length} access locations in this file</label><select id="access-select" aria-label="Exact policy access">${r.accesses.map(x=>`<option value="${x.line}" ${x.line===r.line?'selected':''}>${escape(x.section)} · L${x.line} · ${escape(x.expression)}</option>`).join('')}</select>`:'';
  $('access-select')?.addEventListener('change',event=>{
    r.line=Number(event.target.value);r.start=Math.max(1,r.line-4);r.end=r.line+12;renderReceipt();
  });
  requestAnimationFrame(()=>{
    const mark=$('source-code').querySelector(`[data-line="${r.line}"]`);
    $('source-code').scrollTop=fullSource&&mark?mark.offsetTop-$('source-code').offsetTop-45:0;
  });
}

document.addEventListener('click',event=>{
  const selection=event.target.closest('[data-select]');
  if(selection){event.preventDefault();select(selection.dataset.select);$('atlas').scrollIntoView({behavior:'auto',block:'start'});return;}
  const receipt=event.target.closest('[data-receipt]');
  if(receipt){openReceipt(records.get(selected).receipts[Number(receipt.dataset.receipt)]);return;}
  const file=event.target.closest('[data-file]');if(file){openFile(file.dataset.file);return;}
  const overlap=event.target.closest('[data-overlap]');if(overlap){selectOverlap(selected,overlap.dataset.overlap);return;}
  if(event.target.closest('#leave-saddle'))select(selected);
});
$('previous').addEventListener('click',()=>select(data.records[data.records.findIndex(r=>r.id===selected)-1]?.id));
$('next').addEventListener('click',()=>select(data.records[data.records.findIndex(r=>r.id===selected)+1]?.id));
$('relief').addEventListener('click',()=>setView('relief'));
$('plan').addEventListener('click',()=>setView('plan'));
$('home').addEventListener('click',()=>setView(mode));
$('read-selection').addEventListener('click',()=>$('inspector').scrollIntoView({behavior:'auto',block:'start'}));
$('boundary').addEventListener('click',()=>{
  showBoundary=!showBoundary;$('boundary').setAttribute('aria-pressed',showBoundary);
  if(terrainReady){boundaryGroup.visible=showBoundary;$('boundary-note').hidden=!showBoundary;render();}
});
$('coupling').addEventListener('click',()=>{
  showCoupling=!showCoupling;$('coupling').setAttribute('aria-pressed',showCoupling);
  if(terrainReady){connectionGroup.visible=showCoupling;render();}
});
$('close-receipt').addEventListener('click',()=>$('receipt').close());
$('full-source').addEventListener('click',()=>{fullSource=!fullSource;renderReceipt();});
window.addEventListener('popstate',fromHash);
document.addEventListener('keydown',event=>{
  if($('receipt').open)return;
  if(event.key==='Escape'){select('output');setView('relief');}
  if(event.key==='Home'&&viewport.contains(document.activeElement)){event.preventDefault();setView(mode);}
});
try{createTerrain();}catch(error){
  $('fallback').hidden=false;viewport.querySelector('canvas')?.remove();
  $('labels').innerHTML='';$('leaders').innerHTML='';
  for(const id of ['relief','plan','home','boundary','coupling'])$(id).disabled=true;
  // Keep the complete HTML survey, measured readers and receipts available without WebGL.
  window.terrainFailure=String(error);
}
select('output',false);fromHash();
window.terrainAudit=()=>({ready:terrainReady,selection:selected,pair,view:mode,boundary:showBoundary,coupling:showCoupling,
  peaks:peaks.map(p=>({id:p.id,count:p.count,x:p.x,z:p.z,renderedAltitude:altitude(p.x,p.z)})),
  readerCount:data.unionReaders.length,receiptCount:data.records.reduce((sum,r)=>sum+r.receipts.length,0),
  camera:camera?{position:camera.position.toArray(),zoom:camera.zoom}:null});
