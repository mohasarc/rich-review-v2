(() => {
  'use strict';
  const D=window.LIGHT_TABLE_DATA, R=window.LIGHT_TABLE_READINGS, K=window.Konva;
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const C={copied:'#67e2d1',moved:'#d5e2f2',owned:'#f1a0bd',active:'#e9bd69',compat:'#c3c3a3',tested:'#a4d67e',unexplained:'#baa4f8'};
  const films=[
    ['copied','Copied','═','Matching retained source lines'],
    ['moved','Moved','↗','Old path gone; new path remains'],
    ['owned','Newly owned','□','Added package source boundary'],
    ['active','Active CLI graph','━','Relative value imports + entry URLs'],
    ['compat','Compatibility-only','┄','Retained owner; can still be active'],
    ['tested','Tested surface','∴','Direct test import; source, not coverage'],
    ['unexplained','Unexplained','╱','A named reason gap touches this file']
  ];
  const state={dataset:'production',selected:'process--process-coordinator',film:'copied',preset:'twins',alpha:{copied:80,moved:70,owned:80,active:48,compat:65,tested:55,unexplained:45},edge:Object.fromEntries(films.map(f=>[f[0],100]))};
  const groupsOrder=['client','process','registry','transport','execution','delivery','worker','lifecycle','resources','diagnostics','entries'];
  const all=[...D.units,...D.moves];
  const uncertainty=new Set(['client--daemon-client-runtime','process--controller','process--process-coordinator','registry--startup-coordinator','process-entry','worker--navigation-worker','test--worker--navigation-worker']);
  const descriptions={
    twins:'<b>The repeated silhouette is the point.</b> 38 new package files have retained CLI counterparts. Cyan illuminates identical non-import, nonblank source lines; magenta adds the new owner. A magenta rim around cyan is copied text under a new source boundary.',
    active:'<b>Compatibility-only can still be active.</b> Amber reaches 36 of the 38 retained CLI files through relative value imports and entry URLs; two are type-only contracts. The CLI does not construct DaemonClient. This is a source trace, not recorded execution.',
    tests:'<b>This time the middle station is empty.</b> 37 mechanism tests leave their CLI paths for package paths. The moved navigation-worker test also loses timing assertions and a worker-level CLI version oracle. Test relocation is not evidence of equivalent coverage.',
    gaps:'<b>Light does not cancel uncertainty.</b> Violet marks files involved in named rationale gaps, including control composition, coordinates/authentication and changed test promises. Test dots can overlap those gaps. Neither dot density nor brightness is a confidence measure.'
  };
  let stage, layer, rowPositions=[], geometry, returning=null, readingIndex=null, dialogMode=null;
  function currentUnits(){return (state.dataset==='production'?D.units:D.moves).slice().sort((a,b)=>groupsOrder.indexOf(a.group)-groupsOrder.indexOf(b.group)||a.name.localeCompare(b.name));}
  function current(){return all.find(u=>u.id===state.selected)||currentUnits()[0];}
  function initControls(){
    $('#films').innerHTML=films.map(([id,name,icon,desc])=>`<div class="film ${id===state.film?'selected':''}" data-film="${id}" style="--film-color:${C[id]}"><div class="film-top"><button class="film-select" data-film-select="${id}" aria-pressed="${id===state.film}" title="Select ${name} film to slide"><span class="film-icon" aria-hidden="true">${icon}</span>${name}</button><output for="alpha-${id}">${state.alpha[id]}%</output></div><small>${desc}</small><input id="alpha-${id}" aria-label="${name} exposure" type="range" min="0" max="100" value="${state.alpha[id]}"></div>`).join('');
    $$('[data-film-select]').forEach(b=>b.addEventListener('click',()=>{state.film=b.dataset.filmSelect;syncControls();renderPlate();}));
    films.forEach(([id])=>$('#alpha-'+id).addEventListener('input',e=>{state.alpha[id]=+e.target.value;state.preset=null;syncControls();renderPlate();}));
    $('#sweep').addEventListener('input',e=>{state.edge[state.film]=+e.target.value;syncControls();renderPlate();});
    $('#register').addEventListener('click',()=>{state.edge=Object.fromEntries(films.map(f=>[f[0],100]));syncControls();renderPlate();});
    $$('[data-dataset]').forEach(b=>b.addEventListener('click',()=>setDataset(b.dataset.dataset)));
    $$('[data-preset]').forEach(b=>b.addEventListener('click',()=>preset(b.dataset.preset)));
    $('#specimen').addEventListener('change',e=>selectUnit(e.target.value));
    $('#previous-file').addEventListener('click',()=>moveFile(-1));$('#next-file').addEventListener('click',()=>moveFile(1));
    syncControls();populateSelect();
  }
  function syncControls(){
    films.forEach(([id,name])=>{const el=$(`[data-film="${id}"]`);el.classList.toggle('selected',id===state.film);el.querySelector('button').setAttribute('aria-pressed',String(id===state.film));el.querySelector('input').value=state.alpha[id];el.querySelector('output').textContent=state.alpha[id]+'%';if(id===state.film)$('#sweep-name').textContent=name;});
    $('#sweep').value=state.edge[state.film];$('#sweep').style.setProperty('--film-color',C[state.film]);$('#sweep-value').textContent=Math.round(state.edge[state.film])+'%';
    $$('[data-dataset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dataset===state.dataset)));
    $$('[data-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preset===state.preset)));
    $('#comparison-rule').textContent=state.dataset==='production'?'Cyan compares base↔CLI and CLI↔package separately, as text, not behavior.':'Cyan compares base CLI↔package test text; the middle path is gone. Test dots are used only on the production plate.';
    if(state.preset)$('#exposure-caption').innerHTML=descriptions[state.preset];
  }
  function populateSelect(){
    $('#specimen').innerHTML=currentUnits().map(u=>`<option value="${u.id}">${esc(u.group+' / '+u.name)}</option>`).join('');$('#specimen').value=state.selected;
  }
  function setDataset(dataset,selected){
    state.dataset=dataset;state.selected=selected||(dataset==='tests'?'test--worker--navigation-worker':'process--process-coordinator');state.preset=dataset==='tests'?'tests':'twins';
    syncControls();populateSelect();renderPlate();renderSelection();
  }
  function selectUnit(id,push=true){
    const u=all.find(x=>x.id===id);if(!u)return;
    const dataset=u.kind==='test'?'tests':'production';
    if(state.dataset!==dataset){state.dataset=dataset;state.preset=dataset==='tests'?'tests':'twins';populateSelect();syncControls();}
    state.selected=id;$('#specimen').value=id;renderPlate();renderSelection();
    if(push)history.pushState(null,'','#file/'+id);
  }
  function moveFile(n){const list=currentUnits(),i=list.findIndex(u=>u.id===state.selected);selectUnit(list[(i+n+list.length)%list.length].id);}
  function preset(name){
    state.preset=name;state.edge=Object.fromEntries(films.map(f=>[f[0],100]));
    if(name==='twins'){state.alpha={copied:95,moved:65,owned:85,active:35,compat:50,tested:30,unexplained:20};state.film='copied';setDataset('production','delivery--delivery-session');}
    if(name==='active'){state.alpha={copied:25,moved:20,owned:45,active:100,compat:100,tested:0,unexplained:0};state.film='active';setDataset('production','process--process-launcher');}
    if(name==='tests'){state.alpha={copied:28,moved:100,owned:60,active:0,compat:30,tested:70,unexplained:80};state.film='moved';setDataset('tests','test--worker--navigation-worker');}
    if(name==='gaps'){state.alpha={copied:40,moved:15,owned:50,active:25,compat:30,tested:70,unexplained:100};state.film='unexplained';setDataset('production','client--daemon-client-runtime');}
    state.preset=name;syncControls();renderPlate();history.pushState(null,'','#file/'+state.selected);
  }
  function text(parent,txt,x,y,opts={}){parent.add(new K.Text({text:txt,x,y,fontFamily:'SFMono-Regular, Consolas, monospace',fontSize:9,fill:'#819b9d',listening:false,...opts}));}
  function line(parent,points,opts={}){parent.add(new K.Line({points,stroke:'#355156',strokeWidth:1,listening:false,...opts}));}
  function rect(parent,x,y,width,height,opts={}){parent.add(new K.Rect({x,y,width,height,listening:false,...opts}));}
  function renderPlate(){
    if(!K)return;
    const list=currentUnits(),container=$('#plate');
    const width=Math.max(680,container.parentElement.clientWidth);const x0=132,gap=28,col=(width-x0-34)/3,bodyWidth=col-gap;
    const max=Math.max(...list.flatMap(u=>[u.base,u.cli,u.pkg].map(s=>s?.body.length||0)));
    const scale=bodyWidth/max;let y=88,previous='';rowPositions=[];
    for(const u of list){if(previous!==u.group){y+=14;previous=u.group;}rowPositions.push({u,y});y+=10.5;}
    const height=y+38;geometry={width,height,x0,col,bodyWidth,max,scale};
    if(!stage){stage=new K.Stage({container:'plate',width,height});layer=new K.Layer();stage.add(layer);}
    stage.size({width,height});layer.destroyChildren();
    // These are registered measurement columns, not an automatically laid-out dependency graph.
    for(let i=0;i<3;i++){
      const x=x0+i*col;
      rect(layer,x-8,71,bodyWidth+16,height-94,{fill:i===2?'#a4cbbb08':'#60898a05',stroke:'#56777a32',strokeWidth:1,cornerRadius:2});
      for(let count=0;count<=max;count+=max>1500?500:250){line(layer,[x+count*scale,73,x+count*scale,height-24],{stroke:'#51717424'});text(layer,String(count),x+count*scale-3,58,{fontSize:7,fill:'#789092'});}
      text(layer,['BASE · CLI','HEAD · CLI','HEAD · DAEMON'][i],x,19,{fontSize:10,fill:i===2?'#e8bbcb':'#d1d9cc'});
      text(layer,(state.dataset==='production'?['antecedent','retained compatibility','new source owner']:['original test source','old paths absent','relocated test source'])[i],x,36,{fontSize:8,fill:'#93a8a5'});
    }
    text(layer,'SOURCE FAMILY',14,20,{fontSize:8,fill:'#9fb2ae'});text(layer,'same line scale →',14,36,{fontSize:8});
    line(layer,[x0+col-8,9,width-34,9],{stroke:'#9e78824d'});
    // All films share one canvas and screen-composite their strokes/fills against the substrate.
    const filmGroups={};
    for(const [id] of films){const group=new K.Group({opacity:state.alpha[id]/100,clipX:x0-10,clipY:0,clipWidth:(width-x0-14)*state.edge[id]/100,clipHeight:height,listening:false});filmGroups[id]=group;}
    if(state.dataset==='production'){
      rect(filmGroups.compat,x0+col-8,70,bodyWidth+16,height-93,{stroke:C.compat,strokeWidth:1,dash:[4,5],globalCompositeOperation:'screen'});
    }
    let group='';
    for(const {u,y:rowY} of rowPositions){
      if(group!==u.group){text(layer,u.group.toUpperCase(),14,rowY-1,{fontSize:8,fill:'#a7bcb7'});group=u.group;}
      const selected=u.id===state.selected;
      if(selected){rect(layer,9,rowY-4,width-29,12,{fill:'#d5e5d915',cornerRadius:2});text(layer,'›',width-21,rowY-5,{fontSize:14,fill:'#dce8d6'});}
      const specs=[u.base,u.cli,u.pkg];
      specs.forEach((s,i)=>{
        const x=x0+i*col;
        if(s){rect(layer,x,rowY,Math.max(1,s.body.length*scale),5.5,{fill:'#70909546',cornerRadius:.5});}
        else {line(layer,[x,rowY+2,x+8,rowY+2],{stroke:'#65848c66'});}
      });
      if(u.kind==='production'&&u.cli){
        for(const [a,b,n] of u.copy.matches){
          rect(filmGroups.copied,x0+col+a*scale,rowY,n*scale,5.5,{fill:C.copied,globalCompositeOperation:'screen'});
          rect(filmGroups.copied,x0+2*col+b*scale,rowY,n*scale,5.5,{fill:C.copied,globalCompositeOperation:'screen'});
        }
        // Base-to-retained equality is measured separately, without implying that the PR did no stabilization.
        for(const [a,,n] of u.stabilization.matches)rect(filmGroups.copied,x0+a*scale,rowY,n*scale,5.5,{fill:C.copied,opacity:.65,globalCompositeOperation:'screen'});
        const cliWidth=Math.max(1,u.cli.body.length*scale);
        line(filmGroups.compat,[x0+col,rowY+7.5,x0+col+cliWidth,rowY+7.5],{stroke:C.compat,dash:[2,3],strokeWidth:.7,globalCompositeOperation:'screen'});
      }
      if(u.kind==='test'){
        for(const [a,b,n] of u.copy.matches){
          rect(filmGroups.copied,x0+a*scale,rowY,n*scale,5.5,{fill:C.copied,globalCompositeOperation:'screen'});
          rect(filmGroups.copied,x0+2*col+b*scale,rowY,n*scale,5.5,{fill:C.copied,globalCompositeOperation:'screen'});
        }
        line(filmGroups.moved,[x0+u.base.body.length*scale+3,rowY+2.5,x0+2*col-6,rowY+2.5],{stroke:C.moved,strokeWidth:.7,dash:[2,4],globalCompositeOperation:'screen'});
        filmGroups.moved.add(new K.RegularPolygon({x:x0+2*col-4,y:rowY+2.5,sides:3,radius:3,rotation:90,fill:C.moved,globalCompositeOperation:'screen',listening:false}));
      }else if(u.base?.path!==u.cli?.path&&u.cli){
        line(filmGroups.moved,[x0+u.base.body.length*scale+3,rowY+2.5,x0+col-4,rowY+2.5],{stroke:C.moved,dash:[2,3],globalCompositeOperation:'screen'});
      }
      rect(filmGroups.owned,x0+2*col-.5,rowY-1,Math.max(2,u.pkg.body.length*scale)+1,7.5,{stroke:C.owned,strokeWidth:.8,globalCompositeOperation:'screen'});
      if(u.kind==='production')for(const [i,s] of [[0,u.base],[1,u.cli]])if(s?.active){line(filmGroups.active,[x0+i*col,rowY+2.5,x0+i*col+s.body.length*scale,rowY+2.5],{stroke:C.active,strokeWidth:1.4,globalCompositeOperation:'screen'});}
      if(u.kind==='production'&&u.tests.length){
        // Texture denotes presence of direct test-source imports, never line-level execution coverage.
        const w=Math.max(5,u.pkg.body.length*scale);
        for(let dx=3;dx<w;dx+=9)filmGroups.tested.add(new K.Circle({x:x0+2*col+dx,y:rowY+2.7,radius:1,fill:C.tested,globalCompositeOperation:'screen',listening:false}));
      }
      if(uncertainty.has(u.id)){
        const w=Math.max(4,u.pkg.body.length*scale);
        const hatch=new K.Group({clipX:x0+2*col,clipY:rowY-1,clipWidth:w,clipHeight:8});
        for(let dx=-8;dx<w+8;dx+=8)line(hatch,[x0+2*col+dx,rowY+7,x0+2*col+dx+8,rowY-1],{stroke:C.unexplained,strokeWidth:1.1,globalCompositeOperation:'screen'});
        filmGroups.unexplained.add(hatch);
      }
    }
    for(const [id] of films)layer.add(filmGroups[id]);
    // Hit regions are above the optical layers; native select provides the equivalent keyboard path.
    for(const {u,y:rowY} of rowPositions){
      const hit=new K.Rect({x:10,y:rowY-3,width:width-22,height:10.5,fill:'rgba(0,0,0,0)'});
      hit.on('mouseenter',()=>{stage.container().style.cursor='crosshair';});hit.on('mouseleave',()=>stage.container().style.cursor='default');hit.on('click tap',()=>selectUnit(u.id));layer.add(hit);
    }
    text(layer,state.dataset==='production'?'43 files · 38 counterparts · 28 normalized matches':'37 moved test files · empty retained-CLI station',14,height-14,{fontSize:8,fill:'#9bb7b0'});
    const edge=x0-10+(width-x0-14)*state.edge[state.film]/100;
    const handle=new K.Group({x:edge,y:0,draggable:true,dragBoundFunc:p=>({x:Math.min(width-24,Math.max(x0-10,p.x)),y:0})});
    line(handle,[0,50,0,height-23],{stroke:C[state.film],strokeWidth:1,opacity:.8});
    handle.add(new K.Rect({x:-10,y:47,width:20,height:height-64,fill:'rgba(0,0,0,0)'}));
    handle.add(new K.Rect({x:-8,y:47,width:16,height:15,fill:C[state.film],cornerRadius:2}));
    text(handle,'↔',-5,49,{fontSize:10,fill:'#173034'});
    handle.on('mouseenter',()=>stage.container().style.cursor='ew-resize');
    handle.on('dragmove',()=>{state.edge[state.film]=Math.max(0,Math.min(100,(handle.x()-x0+10)/(width-x0-14)*100));filmGroups[state.film].clipWidth((width-x0-14)*state.edge[state.film]/100);syncControls();layer.batchDraw();});
    handle.on('dragend',()=>renderPlate());layer.add(handle);layer.draw();
    window.__lightTableGeometry={...geometry,rows:rowPositions.map(r=>({id:r.u.id,y:r.y}))};
  }
  function renderSelection(){
    const u=current(),index=currentUnits().findIndex(x=>x.id===u.id)+1;
    $('#selected-index').textContent=String(index).padStart(2,'0')+' / '+currentUnits().length+' · '+u.group.toUpperCase();$('#selected-name').textContent=u.name+(u.kind==='test'?'.test.ts':'.ts');
    $('#selected-status').textContent=u.kind==='test'?'MOVED WITH EDITS · CLI PATH REMOVED':!u.cli?'NO ONE-FILE COUNTERPART':u.copy.equal?'MATCHES AFTER IMPORT / BLANK-LINE REMOVAL':'COUNTERPART WITH RESIDUAL DIFFERENCES';
    $('#inline-reading').textContent=u.name+' · '+(u.kind==='test'?'CLI path removed → package test':!u.cli?'new source seam · no one-file counterpart':u.copy.equal?'same retained text · two head owners':'two head owners · residual text differences');
    $('#inline-inspect').onclick=()=>u.base?openComparison(u,'copy'):openSource(u.pkg.source);
    $('#source-stations').innerHTML=[['base','BASE / CLI'],['cli','HEAD / CLI'],['pkg','HEAD / DAEMON']].map(([key,label])=>{const s=u[key];return `<div class="station"><p class="station-label">${label}</p>${s?`<button class="path" data-open-source="${esc(s.source)}">${esc(s.path)} ↗</button><p class="size"><b>${s.lines.toLocaleString()}</b> physical lines · <b>${s.body.length.toLocaleString()}</b> imaged</p>`:`<span class="path">${u.kind==='test'?'Path removed from CLI.':'No one-file counterpart.'}</span><p class="size">${u.kind==='test'?'Movement, not retention.':'This does not mean new behavior.'}</p>`}</div>`;}).join('');
    let note=u.kind==='test'?'Git detects this rename at '+u.renameSimilarity+'% similarity. This is text similarity, not test coverage.':u.cli?`${u.copy.matched.toLocaleString()} of ${u.pkg.body.length.toLocaleString()} package lines match its head CLI counterpart after removing import declarations and blank lines.`:'This new source boundary has no one-file CLI counterpart. The client composes behavior previously spread through the CLI.';
    if(u.kind==='production')note+=' '+(u.tests.length?u.tests.length+' test file(s) directly import this package file.':'No direct test import in the inspected package/CLI test sources; indirect tests may exist.');
    $('#selected-note').textContent=note;
    const actions=[];
    if(u.base&&u.cli)actions.push('<button data-compare="stabilization">Base → retained CLI</button>');
    if(u.base)actions.push(`<button data-compare="copy">${u.kind==='test'?'Base → moved test':'CLI → package'}</button>`);
    if(u.tests.length)actions.push('<button id="show-tests">Test imports ↗</button>');
    actions.push('<button id="show-related">Related readings ↗</button>');$('#selected-actions').innerHTML=actions.join('');
    $$('[data-open-source]').forEach(b=>b.onclick=()=>openSource(b.dataset.openSource));
    $$('[data-compare]').forEach(b=>b.onclick=()=>openComparison(u,b.dataset.compare));
    if($('#show-tests'))$('#show-tests').onclick=()=>openTestImports(u);
    $('#show-related').onclick=()=>openRelated(u);
  }
  function renderReadings(){
    $('#reading-register').innerHTML=R.map(r=>`<article class="reading" id="reading-${r.id}"><span class="reading-number">${r.number}</span><div><h3>${esc(r.title)}</h3><span class="reason-tag ${r.status}">${r.status==='mixed'?'Stated + unexplained':r.status}</span></div><div><p>${esc(r.summary)}</p><p class="reason">${esc(r.reason)}</p></div><button data-reading="${r.id}" aria-label="Open reading ${r.number}: ${esc(r.title)}">Inspect ↗</button></article>`).join('');
    $$('[data-reading]').forEach(b=>b.addEventListener('click',()=>openReading(b.dataset.reading)));
  }
  function showDialog(kicker,html){
    const dialog=$('#detail-dialog');if(!dialog.open){returning=document.activeElement;dialog.showModal();}
    $('#dialog-kicker').textContent=kicker;$('#dialog-content').innerHTML=html;$('#next-reading').hidden=readingIndex===null;
    dialog.scrollTop=0;
  }
  function closeDialog(updateURL=true){if($('#detail-dialog').open)$('#detail-dialog').close();returning?.focus({preventScroll:true});if(updateURL&&location.hash.startsWith('#reading/'))history.replaceState(null,'','#file/'+state.selected);readingIndex=null;dialogMode=null;}
  function openReading(id,push=true){
    const r=R.find(x=>x.id===id);if(!r)return;readingIndex=R.indexOf(r);dialogMode='reading';
    showDialog('READING '+r.number+' / '+R.length,`<h2 id="dialog-title">${esc(r.title)}</h2><p class="detail-summary">${esc(r.detail)}</p><p class="reason">${esc(r.reason)}</p><div class="reading-links">${r.units.filter(id=>all.some(u=>u.id===id)).map(id=>{const u=all.find(u=>u.id===id);return `<button data-locate="${id}">Locate ${esc(u.name+(u.kind==='test'?'.test.ts':'.ts'))} ↗</button>`;}).join('')}</div><div class="receipt-list">${r.receipts.map((s,i)=>`<button data-receipt="${i}" aria-pressed="${i===0}">${esc(s[3])}</button>`).join('')}</div><div id="source-pane"></div>`);
    $$('[data-receipt]').forEach(b=>b.onclick=()=>{ $$('[data-receipt]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const s=r.receipts[+b.dataset.receipt];showReceipt(s[0],s[1],s[2]);});
    $$('[data-locate]').forEach(b=>b.onclick=()=>{closeDialog();selectUnit(b.dataset.locate);$('#selection').scrollIntoView({block:'center'});});
    showReceipt(r.receipts[0][0],r.receipts[0][1],r.receipts[0][2]);
    if(push)history.pushState(null,'','#reading/'+id);
  }
  function sourceHtml(key,from,to){
    const s=D.sources[key];if(!s)return '<p>Receipt unavailable.</p>';
    const lines=s.text.split('\n');const a=Math.max(1,from||1),b=Math.min(lines.length,to||lines.length);
    return `<div class="source-meta"><b>${esc(s.path)}</b><br>${esc(s.side.toUpperCase())} · ${esc(s.sha)} · lines ${a}–${b}<br>SHA-256 ${esc(s.hash)}</div><pre class="code" tabindex="0" aria-label="Source excerpt">${lines.slice(a-1,b).map((l,i)=>`<span class="code-line"><span class="line-no">${a+i}</span><span class="code-text">${esc(l)}</span></span>`).join('')}</pre>`;
  }
  function showReceipt(key,from,to){$('#source-pane').innerHTML=sourceHtml(key,from,to);}
  function openSource(key){readingIndex=null;dialogMode='source';showDialog('FROZEN SOURCE',`<h2 id="dialog-title">${esc(D.sources[key].path.split('/').pop())}</h2>${sourceHtml(key)}`);}
  function openComparison(u,which){
    readingIndex=null;dialogMode='compare';const comp=u[which];const text=comp.diff||'No source-text differences.';
    showDialog('SOURCE COMPARISON · '+(which==='stabilization'?'BASE → RETAINED CLI':u.kind==='test'?'BASE CLI → HEAD PACKAGE':'HEAD CLI → HEAD PACKAGE'),`<h2 id="dialog-title">${esc(u.name)}</h2><p class="detail-summary">${which==='stabilization'?'The retained graph was stabilized in this PR before its source was frozen.':'The plate omits import declarations and blank lines. This comparison restores every source line, including those imports.'}</p><p class="reason">Text differences do not classify behavioral change. These exact pinned-source excerpts deepen the nine open readings.</p><pre class="code" tabindex="0" aria-label="Exact source diff">${text.split('\n').map((l,i)=>`<span class="code-line ${l.startsWith('+')?'add':l.startsWith('-')?'del':l.startsWith('@@')?'hunk':''}"><span class="line-no">${i+1}</span><span class="code-text">${esc(l)}</span></span>`).join('')}</pre>`);
  }
  function openTestImports(u){
    readingIndex=null;dialogMode='tests';showDialog('TEST-SOURCE CONNECTIONS',`<h2 id="dialog-title">${esc(u.name)}</h2><p class="detail-summary">${u.tests.length} test file(s) directly import this source file. Imports include type imports. This texture is not line coverage and does not claim these tests ran.</p><div class="receipt-list">${u.tests.map(k=>`<button data-test-source="${esc(k)}">${esc(D.sources[k].path)}</button>`).join('')}</div><div id="source-pane"></div>`);
    $$('[data-test-source]').forEach(b=>b.onclick=()=>showReceipt(b.dataset.testSource));showReceipt(u.tests[0],1,50);
  }
  function openRelated(u){
    let related=R.filter(r=>r.units.includes(u.id));if(!related.length)related=R.filter(r=>['homes','copy','tests'].includes(r.id));
    readingIndex=null;dialogMode='related';showDialog('RETURN TO THE COMPLETE LAYER',`<h2 id="dialog-title">Read ${esc(u.name)} in context.</h2><div class="receipt-list">${related.map(r=>`<button data-open-reading="${r.id}">${r.number} · ${esc(r.title)}</button>`).join('')}</div>`);$$('[data-open-reading]').forEach(b=>b.onclick=()=>openReading(b.dataset.openReading));
  }
  $('#close-dialog').onclick=closeDialog;$('#dialog-back').onclick=closeDialog;
  $('#next-reading').onclick=()=>openReading(R[(readingIndex+1)%R.length].id);
  $('#detail-dialog').addEventListener('cancel',e=>{e.preventDefault();closeDialog();});
  $('#detail-dialog').addEventListener('click',e=>{if(e.target===$('#detail-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
  function restore(){const parts=decodeURIComponent(location.hash.slice(1)).split('/');if(parts[0]==='file'){closeDialog(false);selectUnit(parts[1],false);}else if(parts[0]==='reading')openReading(parts[1],false);else closeDialog(false);}
  window.addEventListener('popstate',restore);
  initControls();renderReadings();renderPlate();renderSelection();restore();
  new ResizeObserver(()=>renderPlate()).observe($('#plate').parentElement);
  window.__lightTable={state,data:D,readings:R,selectUnit,preset,openReading};
})();
