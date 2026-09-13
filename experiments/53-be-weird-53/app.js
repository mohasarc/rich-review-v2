(() => {
  'use strict';
  const $=s=>document.querySelector(s);
  const all=s=>[...document.querySelectorAll(s)];
  const data=window.BENCH_DATA;
  const slider=$('#pull-control');
  const grip=$('.grip');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const state={phase:'pending',rebuilt:false,pull:0,active:false,pointer:null,rest:{base:0,head:0},positions:{base:0,head:0},frame:0};
  let lastFocus=null;

  function observed(rev) {
    const outcome=state.phase==='rejected'?'rejected':'fulfilled';
    const run=data.observations.builds[rev].runs[outcome+'-'+(state.rebuilt?'rebuild':'empty')];
    return state.phase==='pending' ? (state.rebuilt?run.rebuiltPending:run.pending) : run.after;
  }

  function springPath(start,end,y,tethered) {
    if(!tethered || end-start<24) return `M${start} ${y}H${Math.max(start,end)}`;
    let d=`M${start} ${y}H${start+8}`;
    const length=end-start-16;
    for(let i=0;i<12;i++)d+=`L${start+8+length*(i+.5)/12} ${y+(i%2?7:-7)}`;
    return d+`L${end-8} ${y}H${end}`;
  }

  function target(rev) {
    if(!state.active) return state.rest[rev];
    if(rev==='head'&&state.phase==='pending')return .47*(1-Math.exp(-3.8*state.pull));
    return state.pull;
  }

  function draw() {
    let moving=false;
    for(const rev of ['base','head']) {
      const rail=$(`.rail[data-revision=${rev}]`),track=rail.querySelector('.track'),sled=rail.querySelector('.sled');
      const width=track.clientWidth;
      const goal=target(rev),old=state.positions[rev];
      const value=reduced.matches?goal:old+(goal-old)*.27;
      state.positions[rev]=Math.abs(goal-value)<.001?goal:value;
      if(Math.abs(goal-value)>=.001)moving=true;
      const start=13,available=width-sled.offsetWidth-23;
      const x=start+state.positions[rev]*available;
      sled.style.transform=`translateX(${x}px)`;
      const svg=rail.querySelector('svg');
      svg.setAttribute('viewBox',`0 0 ${width} 86`);
      svg.querySelector('path').setAttribute('d',springPath(17,x+2,49,rev==='head'&&state.phase==='pending'));
      svg.querySelector('path').style.opacity=rev==='head'&&state.phase!=='pending'?'.12':'';
      rail.dataset.position=state.positions[rev].toFixed(4);
    }
    grip.style.transform=`translateX(${state.pull*(slider.clientWidth-grip.offsetWidth)}px)`;
    state.frame=moving?requestAnimationFrame(draw):0;
  }
  function repaint() { if(!state.frame)state.frame=requestAnimationFrame(draw); }

  function render() {
    const pending=state.phase==='pending';
    for(const rev of ['base','head']) {
      const record=observed(rev),rail=$(`.rail[data-revision=${rev}]`),tag=$(`#${rev}-status`);
      tag.textContent='release '+record.backend;
      tag.className='result-status '+record.backend;
      rail.dataset.state=record.backend;
      rail.querySelector('.cache-caption').textContent=state.rebuilt?'D contains new answer B':'all empty';
      const slots=rail.querySelector('.cache-slots');
      slots.setAttribute('aria-label',state.rebuilt?'definition handle contains new answer B; five other handles empty':'six empty handles');
      slots.querySelector('i').classList.toggle('filled',state.rebuilt);
    }
    $('#project-status').textContent=pending?'PROJECT CLEANUP HELD':state.phase==='fulfilled'?'PROJECT CLEANUP FINISHED':'PROJECT CLEANUP THREW';
    $('#project-lamp').className='lamp '+state.phase;
    $('#finish').disabled=!pending;
    $('#throw').disabled=!pending;
    $('#rebuild').disabled=!pending||state.rebuilt;
    $('#error-message').hidden=state.phase!=='rejected';
    $('#boundary-message').textContent=pending ? (state.rebuilt?'Both versions now reuse the new answer B. Base release is fulfilled; head release remains pending.':'Both sets of caches have been emptied. Base release has fulfilled; head release is still pending.') : state.phase==='fulfilled'?'Project cleanup finished. Both backend release promises are fulfilled. The head handle is free.':'Project cleanup threw. Head release rejected; base release remains fulfilled. The wait has ended with a failure.';
    $('#rebuild-message').textContent=state.rebuilt?'The first new query creates answer B; the repeat query reuses B. Caller-held A still exists outside the cache.':'A caller still holds the old answer A. The cache entry that supplied it is gone.';
    $('#search-count').textContent=`Definition searches so far: base ${observed('base').definitionSearches} · head ${observed('head').definitionSearches}.`;
    repaint();
  }

  function pull(value) {
    state.active=true;
    state.pull=Math.max(0,Math.min(1,value));
    slider.setAttribute('aria-valuenow',String(Math.round(state.pull*100)));
    slider.setAttribute('aria-valuetext',`${Math.round(state.pull*100)} percent pull. ${state.phase==='pending'?'Head remains attached to unfinished project cleanup.':'Both return handles are free.'}`);
    $('#pull-readout').textContent=Math.round(state.pull*100)+'%';
    repaint();
  }

  function release() {
    if(!state.active)return;
    state.rest.base=target('base');
    state.rest.head=state.phase==='pending'?0:target('head');
    state.active=false;state.pull=0;
    slider.setAttribute('aria-valuenow','0');
    slider.setAttribute('aria-valuetext',state.phase==='pending'?'Released. Head recoils because project cleanup is pending.':'Released. Both handles are free.');
    $('#pull-readout').textContent='0%';repaint();
  }

  function reset() {
    if(state.pointer!==null&&slider.hasPointerCapture(state.pointer))slider.releasePointerCapture(state.pointer);
    state.pointer=null;state.phase='pending';state.rebuilt=false;state.active=false;state.pull=0;state.rest={base:0,head:0};
    slider.setAttribute('aria-valuenow','0');slider.setAttribute('aria-valuetext','No pull. Head is attached to unfinished project cleanup.');
    $('#pull-readout').textContent='0%';render();
  }
  function settle(outcome) {
    if(state.phase!=='pending')return;
    state.phase=outcome;state.rest={base:1,head:1};
    state.active=false;state.pull=0;slider.setAttribute('aria-valuenow','0');
    slider.setAttribute('aria-valuetext','No pull. Both handles are free because the project has settled.');
    $('#pull-readout').textContent='0%';render();
  }
  function pointerValue(event) {
    const rect=slider.getBoundingClientRect();
    return (event.clientX-rect.left-grip.offsetWidth/2)/(rect.width-grip.offsetWidth);
  }
  slider.addEventListener('pointerdown',event=>{
    if(event.button!==0||state.pointer!==null)return;
    event.preventDefault();slider.focus({preventScroll:true});state.pointer=event.pointerId;
    slider.setPointerCapture(event.pointerId);pull(pointerValue(event));
  });
  slider.addEventListener('pointermove',event=>{if(state.pointer===event.pointerId)pull(pointerValue(event));});
  function endPointer(event) {
    if(state.pointer!==event.pointerId)return;
    state.pointer=null;release();
    if(slider.hasPointerCapture(event.pointerId))slider.releasePointerCapture(event.pointerId);
  }
  slider.addEventListener('pointerup',endPointer);
  slider.addEventListener('pointercancel',endPointer);
  slider.addEventListener('lostpointercapture',event=>{if(state.pointer===event.pointerId){state.pointer=null;release();}});
  slider.addEventListener('keydown',event=>{
    if(['ArrowRight','ArrowUp','ArrowLeft','ArrowDown','Home','End','Escape'].includes(event.key))event.preventDefault();
    if(event.key==='ArrowRight'||event.key==='ArrowUp')pull(state.pull+.1);
    if(event.key==='ArrowLeft'||event.key==='ArrowDown')pull(state.pull-.1);
    if(event.key==='End')pull(1);
    if(event.key==='Home'||event.key==='Escape')release();
  });
  slider.addEventListener('blur',()=>{if(state.pointer===null)release();});
  window.addEventListener('blur',()=>{state.pointer=null;release();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){state.pointer=null;release();}});
  $('#pull-all').addEventListener('click',()=>pull(1));
  $('#let-go').addEventListener('click',release);
  $('#finish').addEventListener('click',()=>settle('fulfilled'));
  $('#throw').addEventListener('click',()=>settle('rejected'));
  $('#reset').addEventListener('click',reset);
  $('#rebuild').addEventListener('click',()=>{if(state.phase==='pending'&&!state.rebuilt){state.rebuilt=true;render();}});
  new ResizeObserver(()=>{
    if(state.frame)cancelAnimationFrame(state.frame);
    state.frame=0;draw();
  }).observe($('#instrument'));
  reduced.addEventListener('change',repaint);

  const dialog=$('#source-dialog');
  all('[data-source]').forEach(link=>link.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();lastFocus=link;
    const [key,first,last]=link.dataset.source.split(':');
    const source=data.sources[key],start=Number(first),end=Number(last);
    $('#source-title').textContent=key+' · '+start+'–'+end;
    $('#source-meta').textContent=source.path+' · '+source.revision;
    $('#source-code').textContent=source.text.split('\n').slice(start-1,end).map((line,i)=>String(start+i).padStart(4)+'  '+line).join('\n');
    $('#source-full').href=link.getAttribute('href');
    dialog.showModal();$('#source-code').scrollTop=0;
  }));
  $('#close-source').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{if(lastFocus)lastFocus.focus({preventScroll:true});});
  render();
})();
