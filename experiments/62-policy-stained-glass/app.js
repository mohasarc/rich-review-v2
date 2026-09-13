(() => {
 'use strict';
 const data=window.GLASS_DATA;
 const drawing=SVG('#policy-glass');
 const paneNodes=drawing.find('.pane');
 const art=document.querySelector('.window-art');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const readout=document.querySelector('#selection-readout');
 let selected=null, light='all', revision='head';
 const descriptions={
  capture:['One cap, several surfaces','Capture and completion spooling enforce the same output slice. File reading and codecs receive its chunk limit too.','Inspect output boundaries'],
  framing:['Control has its own cap','Blue transport material bounds JSON and execution-control frames. Pink output material separately bounds raw chunks.','Inspect frame boundaries'],
  worker:['A required cap, a different input','Worker messages use the output chunk cap. The parent worker re-parses serialized policy to obtain it; the projection choice is unexplained.','Inspect seam 09'],
  memory:['Derive, then consume','Resource supervision reads the existing policy section. A crack marks the test helper’s ignored memoryCapBytes option. Production already reported the hard RSS limit.','Inspect resource policy'],
  status:['100 ms','daemon status constructs a status-observer transport. The same request kind can wait 250 ms in an ordinary composition.','Inspect the timeout cut'],
  ordinary:['250 ms','Ordinary lifecycle and execution-status exchanges use this wait. The blue material also has a separate 100 ms status-observer leaf.','Inspect the timeout cut'],
  reattach:['1 per request','The default reattachment allowance surrounds executeOnce. A new execute attempt receives its own fetch-resume allowance.','Inspect the two scopes'],
  fetch:['1 per attempt','The fetch-resume count starts inside executeOnce. Reattaching creates a new attempt with a fresh allowance.','Inspect the two scopes'],
  startup:['1 child-failure retry','The policy count replaces a fixed second launch. Healthy startup remains without a project-size deadline.','Inspect startup boundaries'],
  shutdown:['Separate lifetimes','Idle lifetime, user stop, signal exit and drain acknowledgement use their own shutdown leaves. The stop-reserve recipe stays local.','Inspect lifetime boundaries'],
  diagnostics:['Separate retention','Logs and disconnected traces use diagnostic limits. Result retention has a different purpose and is not given a new deadline.','Inspect diagnostic boundaries'],
 };
 const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 function updateReadout() {
  if(selected) {
   const p=data.paneItems.find(p=>p.id===selected), [title,body,link]=descriptions[selected];
   const m=data.materials.find(m=>m.id===p.material);
   readout.innerHTML=`<p class="eyebrow">${esc(m.name.toUpperCase())} / ${revision==='head'?'POLICY INPUT':'BASE LOCAL INPUT'}</p><h3>${esc(title)}</h3><p>${revision==='base'?'Before: the same default purposes coexist with local constants or numeric options. ':''}${esc(body)}</p><a href="#detail-${p.decision}" id="inspect-cut">${esc(link)} ↘</a>`;
  } else if(light==='all') {
   readout.innerHTML='<p class="eyebrow">BLUE GLASS / TWO PURPOSES</p><h3><span class="measure">100 ms</span> <span class="measure">& 250 ms</span></h3><p>The status observer and ordinary caller use the same transport class. Composition selects their different waits.</p><a href="#detail-06" id="inspect-cut">Inspect the timeout cut ↘</a>';
  } else {
   const m=data.materials.find(m=>m.id===light);
   const p=data.paneItems.filter(p=>p.material===light);
   readout.innerHTML=`<p class="eyebrow">ONE MATERIAL / ${esc(m.name.toUpperCase())}</p><h3>${esc(m.name)}</h3><p>${p.map(p=>esc(p.label.join(' '))).join(' · ')}. Select a lit piece to inspect its boundary.</p><a href="#decisions" id="inspect-cut">Read all decisions ↘</a>`;
  }
 }
 function paint() {
  art.dataset.revision=revision;
  document.querySelectorAll('[data-revision]').forEach(el=>{if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',String(el.dataset.revision===revision));});
  document.querySelector('#revision-note').textContent=revision==='head'?'HEAD · b100221':'BASE · b3a6c4f';
  document.querySelectorAll('[data-light]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.light===light)));
  paneNodes.forEach(node=>{
   node.attr('aria-pressed',String(node.attr('data-pane')===selected));
   if(light!=='all'&&node.attr('data-material')!==light)node.addClass('dimmed');else node.removeClass('dimmed');
  });
  updateReadout();
 }
 function remember() {
  const hash='#glass='+encodeURIComponent(selected??'all')+'&light='+light+'&rev='+revision;
  if(location.hash!==hash)history.pushState(null,'',hash);
 }
 function select(id,save=true) {
  selected=id;const p=data.paneItems.find(p=>p.id===id);
  if(light!=='all'&&p.material!==light)light=p.material;
  paint();if(save)remember();
 }
 paneNodes.forEach((node,index)=>{
  node.on('click',()=>select(node.attr('data-pane')));
  node.on('keydown',event=>{
   if(event.key==='Enter'||event.key===' '){event.preventDefault();select(node.attr('data-pane'));}
   if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(event.key)){
    event.preventDefault();const direction=['ArrowRight','ArrowDown'].includes(event.key)?1:-1;
    const next=paneNodes[(index+direction+paneNodes.length)%paneNodes.length];next.node.focus();select(next.attr('data-pane'));
   }
  });
 });
 document.querySelectorAll('button[data-light]').forEach(button=>button.addEventListener('click',()=>{light=button.dataset.light;selected=null;paint();remember();}));
 document.querySelectorAll('button[data-revision]').forEach(button=>button.addEventListener('click',()=>{revision=button.dataset.revision;paint();remember();}));
 function restore() {
  if(!location.hash.startsWith('#glass='))return;
  const state=new URLSearchParams(location.hash.slice(1));
  selected=data.paneItems.some(p=>p.id===state.get('glass'))?state.get('glass'):null;
  light=data.materials.some(m=>m.id===state.get('light'))?state.get('light'):'all';
  revision=state.get('rev')==='base'?'base':'head';paint();
 }
 window.addEventListener('popstate',restore);
 window.addEventListener('hashchange',restore);
 restore();paint();

 const dialog=document.querySelector('#source-dialog');let lastSource;
 document.querySelectorAll('[data-receipt]').forEach(link=>link.addEventListener('click',event=>{
  if(typeof dialog.showModal!=='function'||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();lastSource=link;const e=data.excerpts.find(e=>e.id===link.dataset.receipt);
  document.querySelector('#source-owner').textContent=`SEAM ${e.decision} / EXACT SOURCE / ${e.side.toUpperCase()}`;
  document.querySelector('#source-title').textContent=e.path.split('/').pop();
  document.querySelector('#source-location').textContent=`${e.path}:${e.start}–${e.end} · ${e.sha}`;
  document.querySelector('#source-code').innerHTML=e.code.split('\n').map((line,i)=>`<span class="source-line"><span class="line-number">${e.start+i}</span>${esc(line)}</span>`).join('');
  document.querySelector('#full-source').href=`evidence.html#${e.id}`;dialog.showModal();document.querySelector('#close-source').focus();
 }));
 document.querySelector('#close-source').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>lastSource?.focus({preventScroll:true}));
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 const scopeMessages=[
  '1 / execute: the original accepted connection.',
  '2 / reattach: a new attempt, a fresh fetch allowance.',
  '3 / result-fetch: the second attempt uses its allowance.',
  '4 / result-ack: the recorded result is acknowledged.',
 ];
 document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{
  const step=Number(button.dataset.step);
  document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('#scope-caption').textContent=scopeMessages[step];
  document.querySelector('#scope-reattach').textContent='reattach available: '+(step===0?'1':'0');
  document.querySelector('#attempt-zero').classList.toggle('active',step===0);
  document.querySelector('#attempt-one').classList.toggle('active',step>0);
  document.querySelector('#attempt-one strong').textContent=step>=2?'0':'1';
 }));
 // Expose only view state for the browser receipt; no review data is stored.
 window.glassView=()=>({selected,light,revision,reducedMotion:reduce.matches});
})();
