(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const {decisions,stages} = CONTENT;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let stage=1, lifted=false, selectedDecision=0, moving=null, liftMotion=null;
  let currentSourceIds=[];
  const familyMap={route:'staging',wire:'body',process:'body',worker:'body',output:'body',memory:'body',state:'body',root:'surface',entries:'surface',testing:'inspection'};

  function cellMarkup(f,index,owner,ghost=false) {
    const [col,row]=BoardModel.body[index];
    const x=(owner==='cli'?58:582)+col*88+3, y=144+row*88+3;
    const key=(owner==='cli'?'old-':'family-')+f.id;
    const label=owner==='cli'&&f.id==='route'?'DISPATCH':f.label;
    const sub=owner==='cli'&&f.id==='route'?'host route':({route:'client boundary',wire:'sockets',process:'lifecycle',worker:'execution',output:'delivery',memory:'resources',state:'registry'}[f.id]);
    if(ghost) return `<rect x="${x}" y="${y}" width="82" height="82" rx="4" fill="url(#missing-hatch)" stroke="#8b6b5f" stroke-dasharray="3 4"/>`;
    return `<g class="board-cell ${owner==='cli'?'old-cell':''}" data-family="${f.id}" data-owner="${owner}" data-source="${key}" role="button" tabindex="0" aria-label="${esc(owner==='cli'?'CLI':'Daemon')} ${esc(f.title)}; inspect source">
      <rect class="tile" x="${x}" y="${y}" width="82" height="82" rx="4" fill="${owner==='cli'?'#dca077':'#b5ecd3'}" stroke="${owner==='cli'?'#f1b389':'#d0f6df'}" stroke-width="1"/>
      <text x="${x+10}" y="${y+20}" class="cell-code">${owner==='cli'?'CLI':'DMN'} / ${String(index+1).padStart(2,'0')}</text>
      <text x="${x+10}" y="${y+43}" class="cell-text" ${label==='DISPATCH'?'style="font-size:11px"':''}>${label}</text>
      <text x="${x+10}" y="${y+64}" class="cell-sub">${esc(sub)}</text>
    </g>`;
  }
  $('#old-body').innerHTML=EVIDENCE.families.map((f,i)=>cellMarkup(f,i,'cli')).join('');
  $('#new-body').innerHTML=EVIDENCE.families.map((f,i)=>cellMarkup(f,i,'daemon')).join('');
  $('#old-ghost').innerHTML=EVIDENCE.families.map((f,i)=>cellMarkup(f,i,'cli',true)).join('');
  $('#frozen-overlay').innerHTML=BoardModel.body.slice(1).map(([c,r])=>`<rect x="${61+c*88}" y="${147+r*88}" width="82" height="82" rx="4" fill="url(#frozen-hatch)"/>`).join('');
  const caps=[['root','ROOT','public client'],['entries','PROC','process-entry'],['entries','WORK','worker-entry'],['testing','TEST','read-only']];
  $('#cutover-piece').innerHTML=BoardModel.cap.map(([c,r],i)=>{
    const [key,label,sub]=caps[i], x=585+c*88,y=147+r*88;
    return `<g class="board-cell" data-family="${key}" data-owner="daemon" role="button" tabindex="0" aria-label="Final ${sub} surface; inspect source"><rect class="tile" x="${x}" y="${y}" width="82" height="82" rx="4" fill="#8dd7b1" stroke="#cef5dd"/><text x="${x+10}" y="${y+20}" class="cell-code">#149 CAP</text><text x="${x+10}" y="${y+43}" class="cell-text">${label}</text><text x="${x+10}" y="${y+64}" class="cap-small">${sub}</text></g>`;
  }).join('');
  $('.board-column').insertBefore($('.scrubber'),$('.board-scroll'));

  // All transforms are scheduled by GSAP. The grid is a fixed semantic board, not a layout algorithm.
  gsap.set('#new-piece',{y:-118,opacity:0});
  gsap.set('#cutover-piece',{y:-128,opacity:0});
  gsap.set('#old-ghost, #frozen-overlay, #entry-label, #new-route, #pins, #absence-label, #final-wall',{opacity:0});
  const timeline=gsap.timeline({paused:true});
  timeline.to('#new-piece',{y:0,opacity:1,duration:.86,ease:'power3.out'},.07)
    .to('#frozen-overlay',{opacity:1,duration:.3},.7)
    .to('#entry-label',{opacity:1,duration:.18},.81)
    .to('#cutover-piece',{y:0,opacity:1,duration:.68,ease:'power3.out'},1.05)
    .to('#entry-label',{opacity:0,duration:.16},1.08)
    .to('#new-route, #final-wall',{opacity:1,duration:.25},1.5)
    .to('#old-route',{opacity:0,duration:.2},1.5)
    .to('#old-body, #frozen-overlay',{opacity:0,duration:.3},1.62)
    .to('#old-ghost, #absence-label',{opacity:1,duration:.2},1.8)
    .to('#pins',{opacity:1,duration:.18},1.82);

  function setUrl(hash) {
    if(location.hash!==hash) history.pushState(null,'',hash);
  }
  function setStage(n,{animate=true,historyEntry=true}={}) {
    if(!Number.isInteger(n)||n<0||n>2) return;
    if(moving) moving.kill();
    resetLift();
    stage=n;
    const s=stages[n], state=BoardModel.at(n);
    if(historyEntry) setUrl(`#pr-${s.pr}`);
    $('#scrub').value=n;
    $('#scrub').setAttribute('aria-valuetext',`PR ${s.pr}: ${s.verb}`);
    $$('button[data-stage]').forEach(el=>{
      if(Number(el.dataset.stage)===n) el.setAttribute('aria-current','step');
      else el.removeAttribute('aria-current');
    });
    $('#stage-badge').textContent=`${24+n} / 26 · #${s.pr}`;
    $('#piece-tag').textContent=s.tag;
    $('#stage-title').textContent=s.title;
    $('#stage-description').textContent=s.description;
    $('#route-value').textContent=s.route;
    $('#copies-value').textContent=s.copies;
    $('#room-value').textContent=s.room;
    $('#cli-owner-label').textContent=n===2?'INVOCATION COORDINATION + HOST EXECUTOR':'HOST + COMPATIBILITY MECHANISMS';
    $('#left-caption').textContent=n===0?'CLI-LOCAL MECHANISM OWNERS':n===1?'38 FROZEN PRODUCTION COPIES':'OLD MECHANISM DIRECTORY ABSENT';
    $('#right-caption').textContent=n===0?'CONTRACT / POLICY OWNER':n===1?'STAGED BODY · CLI ROUTE STILL LOCAL':'MECHANISMS + FINAL PUBLIC SURFACE';
    $('#board-title').textContent=`PR ${s.pr}: ${s.verb}`;
    $('#board-desc').textContent=`${s.description} Cells name architectural surface families, not source size. ${n===2?'Final cap: root, process-entry, worker-entry, testing.':''}`;
    $('#lift').disabled=n===0;
    $('#lift-readout').textContent=n===0?'Scrub to #148 to seat the first piece.':n===1?'Does this CLI route need the new body yet?':'The old route is gone. Try the same lift.';
    $('#previous').disabled=n===0;
    $('#next').disabled=n===2;
    $('#packing').dataset.stage=n;
    $('#packing').setAttribute('aria-busy',animate&&!reduce.matches?'true':'false');
    setAvailability('#old-body',state.oldBodyPresent);
    setAvailability('#new-body',state.bodyPresent);
    setAvailability('#cutover-piece',state.capPresent);
    if(animate&&!reduce.matches){
      moving=timeline.tweenTo(n,{duration:.85,ease:'power1.inOut',onComplete:()=>$('#packing').setAttribute('aria-busy','false')});
    }else timeline.pause(n);
    $('#live').textContent=`PR ${s.pr}. ${s.description}`;
  }
  function setAvailability(selector,available) {
    $(selector).setAttribute('aria-hidden',String(!available));
    $(selector).style.pointerEvents=available?'auto':'none';
    $$(selector+' .board-cell').forEach(el=>el.setAttribute('tabindex',available?'0':'-1'));
  }
  function resetLift() {
    if(liftMotion) liftMotion.kill();
    lifted=false;
    gsap.set('#new-body',{rotation:0,x:0,y:0,transformOrigin:'50% 50%'});
    $('#lift').setAttribute('aria-pressed','false');
    $('#lift').textContent='↶ Try lifting the body';
    $('#packing').dataset.lift='seated';
  }
  function tryLift() {
    if(moving){moving.kill();timeline.pause(stage);$('#packing').setAttribute('aria-busy','false');}
    const result=BoardModel.lift(stage);
    if(!result.available) return;
    if(liftMotion) liftMotion.kill();
    if(result.allowed){
      lifted=!lifted;
      $('#lift').setAttribute('aria-pressed',String(lifted));
      $('#lift').textContent=lifted?'↷ Reseat the staged body':'↶ Try lifting the body';
      $('#packing').dataset.lift=lifted?'free':'seated';
      $('#lift-readout').textContent=lifted?'It lifts in this model. The CLI route still reaches its local body; contracts and policy stay put.':'Body reseated. The CLI route is still local.';
      $('#right-caption').textContent=lifted?'LIFTED IN MODEL · CLI ROUTE RETAINED':'STAGED BODY · CLI ROUTE STILL LOCAL';
      liftMotion=gsap.to('#new-body',{rotation:lifted?-17:0,x:lifted?19:0,y:lifted?-62:0,duration:reduce.matches?0:.6,ease:'power2.inOut',transformOrigin:'50% 50%'});
      gsap.set('#entry-label',{opacity:lifted?0:1});
    }else{
      $('#packing').dataset.lift='pinned';
      $('#lift-readout').textContent='Pinned: CLI → DaemonClient; external tests → /testing. The old CLI body is absent. A coordinated change would be needed.';
      $('#right-caption').textContent='PINNED BY CONSUMERS · OLD ROUTE ABSENT';
      if(!reduce.matches) liftMotion=gsap.timeline().to('#new-body',{rotation:-2.2,y:-4,duration:.13,transformOrigin:'50% 50%'}).to('#new-body',{rotation:0,y:0,duration:.3,ease:'power2.out'});
      $('#live').textContent='Lift constrained by caller and testing imports. This is a structural illustration, not a Git-revert test.';
    }
  }
  function selectCell(el) {
    $$('.board-cell.selected').forEach(x=>x.classList.remove('selected'));
    el.classList.add('selected');
    const id=el.dataset.family, owner=el.dataset.owner, f=EVIDENCE.families.find(x=>x.id===id);
    let sources,decision=familyMap[id];
    if(f){
      $('#cell-name').textContent=`${f.label} / ${owner==='cli'?'CLI':'daemon'}`;
      $('#cell-description').textContent=f.title+'. '+(owner==='cli'?f.before:f.after)+'. Original and staged witnesses are both pinned at #148.';
      sources=[owner==='cli'?'old-'+id:'family-'+id,owner==='cli'?'family-'+id:'old-'+id];
    }else{
      $('#cell-name').textContent=id==='testing'?'TEST / read-only window':id==='root'?'ROOT / DaemonClient':'ENTRY / package runtime';
      $('#cell-description').textContent=id==='testing'?'External tests observe instances, diagnostics and spool usage through @symnav/daemon/testing.':'The final four-path inventory is a closed opening onto a much larger mechanism body. Root and process/worker paths were already present at #148.';
      sources=id==='testing'?['inspector','observation','actors']:['exports','facade'];
    }
    const button=$('#cell-evidence');
    delete button.dataset.decision;
    button.onclick=()=>openReceipt(decision,sources);
    $('#live').textContent=$('#cell-name').textContent+'. '+$('#cell-description').textContent;
  }
  $$('.board-cell').forEach(el=>{
    el.addEventListener('click',()=>selectCell(el));
    el.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectCell(el);}});
  });

  $('#decision-register').innerHTML=decisions.map(d=>`<li id="decision-${d.id}"><span class="decision-number">${d.n}</span><button class="decision-title" data-detail="${d.id}">${esc(d.title)} <span aria-hidden="true">↘</span></button><p>${esc(d.summary)}</p><p class="rationale"><span class="status ${d.status==='Stated'?'':'gap'}">${esc(d.status)}</span>${esc(d.reason)}</p></li>`).join('');
  const witnessNames=['Starting only while the matching owner is live','Warm-up survives the initiating caller’s death','Clean a stale current-schema record','Prompt stuck-daemon status, same process','Keep ownership when a live daemon stops answering ping','Malformed activity without leaking or replacing ownership','Cold error and exit after workspace deletion','Wait for a starting process to exit','Drain in-flight work before stop returns','Force-kill stuck work before rendering success'];
  $('#root-witnesses').innerHTML=EVIDENCE.inventory.removedScenarios.map((s,i)=>`<li><span>${esc(s.file.toUpperCase())}</span><a href="evidence/${s.source}.html#L${s.line}" target="_blank" rel="noopener" title="${esc(s.name)}">${esc(witnessNames[i])}</a></li>`).join('');
  function showDecision(id,{scroll=false,historyEntry=false}={}) {
    const index=decisions.findIndex(x=>x.id===id);
    if(index<0)return;
    selectedDecision=index;
    const d=decisions[index];
    $('#detail-position').textContent=`${d.n} / 08`;
    $('#detail-status').textContent=d.status;
    $('#detail-status').className='status '+(d.status==='Stated'?'':'gap');
    $('#detail-title').textContent=d.title;
    $('#detail-prose').textContent=d.mechanism;
    $('#detail-reason').textContent=d.reason;
    $('#detail-return').href='#decision-'+id;
    $('#detail-return').textContent=`↑ Return to decision ${d.n}`;
    $('#comparison').innerHTML=d.comparison.map(s=>`<div>${esc(s)}</div>`).join('');
    $('#detail-sources').innerHTML=d.sources.map(key=>`<button data-receipt="${key}" data-parent="${id}">${esc(sourceLabel(key))} ↗</button>`).join('');
    let extra='';
    if(id==='testgap') extra='<p class="extra-note">Exact removed scenario titles (inventory, not a proof of lost coverage):</p><ol class="scenario-list">'+EVIDENCE.inventory.removedScenarios.map(s=>`<li><a href="evidence/${s.source}.html#L${s.line}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join('')+'</ol>';
    if(id==='testmove') extra=`<div class="test-moves">37 test-file renames<br>apps/cli/src/daemon → packages/daemon/src<br><a href="evidence/inventory.json" target="_blank" rel="noopener">Exact before/after path inventory ↗</a></div>`;
    $('#extra-detail').innerHTML=extra;
    $('#detail-prev').disabled=index===0;
    $('#detail-next').disabled=index===decisions.length-1;
    if(historyEntry)setUrl('#decision-'+id);
    if(scroll){
      setStage(d.stage,{historyEntry:false});
      $('#mechanism').scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'});
    }
  }
  function sourceLabel(key) {
    const labels={'cli-before':'CLI before','cli-after':'CLI after','freeze':'38-file freeze','absence':'absence check','coordinator':'invocation coordinator','composition':'host composition','executor':'CLI executor','facade':'public facade','exports':'four exports','leaf':'dependency table','capture':'client output capture','transport':'transport factory','inspector':'read-only inspector','observation':'external test helper','actors':'injected test actor','reachability':'import wall','storage':'storage wall','serial':'test serialization','tsx':'development dependency','status-old':'status before','status-new':'status after','stop-old':'stop before','stop-new':'stop after','policy-before':'policy API before','policy-after':'policy API after','manifest-before':'exports before','clock-inventory':'clock inventory','export-inventory':'root inventory'};
    return labels[key]||key.replace('family-','daemon / ').replace('old-','CLI / ');
  }
  function openReceipt(id,sourceIds=null,initial=null) {
    const d=decisions.find(x=>x.id===id)||decisions[0];
    currentSourceIds=sourceIds||d.sources;
    $('#source-title').textContent=d.title;
    $('#source-context').innerHTML=esc(d.summary+' '+d.reason)+' <span class="pr-reasons">Supplied rationale: <a href="evidence/pr-148.html" target="_blank" rel="noopener">PR #148</a> · <a href="evidence/pr-149.html" target="_blank" rel="noopener">PR #149</a>.</span>';
    $('#source-tabs').innerHTML=currentSourceIds.map(key=>`<button data-source-key="${key}">${esc(sourceLabel(key))}</button>`).join('');
    renderSource(initial||currentSourceIds[0]);
    if(!$('#source-dialog').open)$('#source-dialog').showModal();
  }
  function renderSource(key) {
    const source=EVIDENCE.sources[key];
    if(!source)throw new Error('Missing source: '+key);
    $$('[data-source-key]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.sourceKey===key)));
    $('#source-path').textContent=source.path;
    $('#source-pin').textContent=`#${source.stage} · ${source.sha} · lines ${source.start}–${source.end}`;
    $('#source-full').href=`evidence/${key}.html#L${source.start}`;
    $('#source-code').innerHTML=source.text.split('\n').map((line,i)=>`<span class="code-line"><span class="code-num">${source.start+i}</span>${esc(line)}</span>`).join('');
    $('#source-code').scrollTop=0;
    $('#source-code').scrollLeft=0;
  }
  document.addEventListener('click',event=>{
    const el=event.target.closest('button');
    if(!el)return;
    if(el.dataset.stage!==undefined)setStage(Number(el.dataset.stage));
    if(el.dataset.detail)showDecision(el.dataset.detail,{scroll:true,historyEntry:true});
    if(el.dataset.decision)openReceipt(el.dataset.decision);
    if(el.dataset.receipt)openReceipt(el.dataset.parent,null,el.dataset.receipt);
    if(el.dataset.sourceKey)renderSource(el.dataset.sourceKey);
  });
  $('#scrub').addEventListener('input',()=>setStage(Number($('#scrub').value)));
  $('#previous').onclick=()=>setStage(stage-1);
  $('#next').onclick=()=>setStage(stage+1);
  $('#lift').onclick=tryLift;
  $('#detail-prev').onclick=()=>showDecision(decisions[selectedDecision-1].id,{historyEntry:true});
  $('#detail-next').onclick=()=>showDecision(decisions[selectedDecision+1].id,{historyEntry:true});
  $('#close-dialog').onclick=()=>$('#source-dialog').close();
  $('#source-dialog').addEventListener('click',event=>{if(event.target===$('#source-dialog')){const b=event.target.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)event.target.close();}});
  $('#detail-return').addEventListener('click',event=>{
    event.preventDefault();
    const id=decisions[selectedDecision].id;
    setUrl('#decision-'+id);
    const row=$('#decision-'+id);
    row.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'});
    row.querySelector('button').focus({preventScroll:true});
  });
  function restoreAddress() {
    const pr=location.hash.match(/^#pr-(147|148|149)$/);
    const decision=location.hash.match(/^#decision-(.+)$/);
    if(pr)setStage(Number(pr[1])-147,{animate:false,historyEntry:false});
    else if(decision&&decisions.some(d=>d.id===decision[1])){
      const d=decisions.find(d=>d.id===decision[1]);
      showDecision(d.id);
      setStage(d.stage,{animate:false,historyEntry:false});
    }
  }
  window.addEventListener('popstate',restoreAddress);
  reduce.addEventListener('change',()=>{if(moving)moving.kill();setStage(stage,{animate:false,historyEntry:false});});
  showDecision('staging');
  setStage(1,{animate:false,historyEntry:false});
  restoreAddress();
  // Read-only introspection for artifact checks; no review or response state is persisted.
  window.BOARD = {get state(){return {stage,lifted,decision:decisions[selectedDecision].id,model:BoardModel.at(stage),time:timeline.time()};},setStage,showDecision,tryLift};
})();
