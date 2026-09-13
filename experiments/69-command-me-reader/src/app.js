import { createMachine, createActor, assign } from 'xstate';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);
const $ = s => document.querySelector(s);
const receipts = JSON.parse($('#receipt-data').textContent);
const observations = JSON.parse($('#observation-data').textContent);
const stages = ['point','drag','predict','hold','holding','compare','say'];
const copy = {
  point: { title:'Point to the key.', body:'Select target inside the handle. Notice what the cache actually keeps: one key → one promise.', action:'Point to target ↗', foot:'Keyboard: use the button or Tab to target, then Enter.', source:'core', note:'A lookup associates a key with a value. Here, that value is a promise.' },
  drag: { title:'Take a reference.', body:'Drag the rust P₀ into the caller area. The cache keeps its own reference to exactly the same promise.', action:'Take a reference →', foot:'Use this button instead of dragging. No precise movement is required.', source:'recording', note:'Acquiring a reference does not remove the cache entry. Two references can name one object.' },
  predict: { title:'Predict the next lookup.', body:'A clear is coming. Will the same key return P₀ or a new promise? Can your old P₀ still finish? Answer to yourself.', action:'Keep that prediction →', foot:'Nothing to submit. The prediction is yours; the page does not collect it.', source:'core-tests', note:'Both locations refer to P₀. Predict which relationship the clear can remove.' },
  hold: { title:'Hold through the clear.', body:'Press and hold P₀ in the caller area. Your press clears the handle and looks up target again. Keep watching the old circle.', action:'Clear while keeping P₀ →', foot:'Single-step: use the button. Keyboard hold: focus P₀, hold Space or Enter. No minimum duration.', source:'core', note:'The handle will survive. The lookup entry will change. Your old reference stays in place.' },
  holding: { title:'Now let go.', body:'P₁ occupies the same handle. You still have pending P₀. Release your press to let the injected old work finish.', action:'Let old work finish →', foot:'Single-step: use the button. Release means settling old work here, not project cleanup.', source:'core-tests', note:'The clear and the new lookup are complete. Caller-held P₀ is still pending.' },
  compare: { title:'Compare what survived.', body:'Old P₀ fulfilled in your caller. The cache still points to new P₁. Old settlement did not put P₀ back.', action:'Say it back →', foot:'The values “old” and “new” come from injected factories in the core recording.', source:'recording', note:'P₀ settles where it was held. The handle still returns P₁: settlement did not rewrite the lookup.' },
  say: { title:'Say the boundary back.', body:'Without reading the line below, explain what clearing removed, what your caller kept, and why old settlement cannot replace P₁.', action:'Reveal a model answer', foot:'Say it aloud or silently. No microphone, answer field, score, or saved response.', source:'core-tests', note:'Lookup reachability and promise settlement have different boundaries.' },
};
const machine = createMachine({
  id:'ritual', initial:'point', context:{revealed:false},
  on:{
    JUMP: stages.map(stage=>({guard:({event})=>event.stage===stage,target:'.'+stage,actions:assign({revealed:false})})),
    RESET:{target:'.point',actions:assign({revealed:false})},
  },
  states:{
    point:{on:{NEXT:'drag'}},drag:{on:{NEXT:'predict'}},predict:{on:{NEXT:'hold'}},
    hold:{on:{NEXT:'holding'}},holding:{on:{NEXT:'compare'}},compare:{on:{NEXT:'say'}},
    say:{on:{NEXT:{actions:assign({revealed:({context})=>!context.revealed})}}},
  }
});
const actor=createActor(machine);
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let previousState, activeHold=false, heldPointer=null, heldKey=null, returnFocus=null;
const ui={board:$('#board'),key:$('#key'),cache:$('#cache-token'),drag:$('#drag-token'),held:$('#held-token'),zone:$('#caller-zone'),primary:$('#primary')};
const next=()=>actor.send({type:'NEXT'});
const stage=()=>actor.getSnapshot().value;
const moveToStart=()=>{
  gsap.killTweensOf(ui.drag);
  gsap.set(ui.drag,{x:0,y:0});
  const rect=ui.cache.getBoundingClientRect(), board=ui.board.getBoundingClientRect();
  ui.drag.style.left=(rect.left-board.left)+'px'; ui.drag.style.top=(rect.top-board.top)+'px';
  ui.drag.style.width=rect.width+'px';ui.drag.style.height=rect.height+'px';
  dragger?.update(true);
};
let dragger;
[dragger]=Draggable.create(ui.drag,{
  type:'x,y',bounds:ui.board,edgeResistance:1,allowContextMenu:false,minimumMovement:4,
  onPress(){ if(stage()!=='drag') return;gsap.killTweensOf(ui.drag); },
  onDrag(){ui.zone.classList.toggle('drop-ready',this.hitTest(ui.zone,'25%'));},
  onDragEnd(){
    const hit=this.hitTest(ui.zone,'25%');ui.zone.classList.remove('drop-ready');
    if(stage()!=='drag')return;
    if(hit){next();}else{gsap.to(ui.drag,{x:0,y:0,duration:motion.matches?0:.22,ease:'power2.out',onComplete:()=>dragger.update()});}
  }
});
dragger.disable();
function render(snapshot){
  const state=snapshot.value, i=stages.indexOf(state), item=copy[state], changed=state!==previousState;
  document.body.dataset.state=state;ui.board.dataset.scene=state;
  const acquired=i>=2,cleared=i>=4,settled=i>=5;
  ui.drag.hidden=state!=='drag';ui.held.hidden=!acquired;$('#caller-empty').hidden=acquired;
  ui.key.disabled=state!=='point';
  ui.held.disabled=state!=='hold'&&state!=='holding';
  ui.held.setAttribute('aria-label',state==='holding'?'P0 is pending; release your hold to settle old work':'Hold P0 through a cache clear');
  ui.cache.className='token '+(cleared?'new fulfilled':'old pending');
  ui.cache.innerHTML=cleared?'<span>P<sub>1</sub></span>':'<span>P<sub>0</sub></span>';
  ui.cache.setAttribute('aria-label',cleared?'Cache points to P1, fulfilled':'Cache points to P0, pending');
  ui.held.classList.toggle('fulfilled',settled);ui.held.classList.toggle('pending',!settled);
  $('#lookup-caption').textContent=cleared?'entry → P₁ · fulfilled':'entry → P₀ · pending';
  $('#caller-caption').textContent=acquired?(settled?'you kept P₀ · fulfilled':'you keep P₀ · pending'):'the caller has no reference yet';
  $('#boundary-label').textContent=cleared?'same H · old entry cleared':'entry belongs to this turn';
  $('#board-note').textContent=item.note;
  $('#command-number').innerHTML=String(i+1).padStart(2,'0')+' <span>/ 07</span>';
  $('#command-title').textContent=state==='holding'&&!activeHold?'Let old work finish.':item.title;
  $('#command-copy').textContent=state==='holding'&&!activeHold?'P₁ occupies the same handle. Your caller still has pending P₀. Use the button to let the injected old work finish.':item.body;
  ui.primary.textContent=state==='say'&&snapshot.context.revealed?'Hide the model answer':item.action;
  $('#command-foot').textContent=item.foot;
  $('#comparison').hidden=state!=='compare';$('#model-answer').hidden=state!=='say'||!snapshot.context.revealed;
  $('#stage-source').dataset.receipt=item.source;$('#stage-source').href='sources.html#'+item.source;
  document.querySelectorAll('[data-jump]').forEach(button=>{
    if(button.dataset.jump===state)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
  });
  if(i>=2){
    const checkpoint=observations.coreRuns[0].checkpoints[settled?2:cleared?1:0];
    $('#readout').textContent=`Core recording / ${checkpoint.step}: lookup ${checkpoint.lookup}; caller ${checkpoint.caller} ${checkpoint.callerState}; factory calls ${checkpoint.factoryCalls}.`;
  }else $('#readout').textContent='Recorded setup: target points to pending P₀. The caller reference is acquired at step 02.';
  if(state==='drag'){moveToStart();dragger.enable();}else{dragger.disable();ui.zone.classList.remove('drop-ready');}
  if(changed&&cleared&&stages.indexOf(previousState)<4){gsap.fromTo(ui.cache,{opacity:.25},{opacity:1,duration:motion.matches?0:.26,ease:'power1.out'});}
  else gsap.set(ui.cache,{opacity:1});
  previousState=state;
}
actor.subscribe(render);actor.start();
ui.key.addEventListener('click',()=>{if(stage()==='point'){next();ui.primary.focus({preventScroll:true});}});
ui.primary.addEventListener('click',()=>{activeHold=false;heldKey=null;heldPointer=null;next();});
$('#restart').addEventListener('click',()=>{cancelHold();actor.send({type:'RESET'});});
document.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>{
  cancelHold();actor.send({type:'JUMP',stage:button.dataset.jump});
}));
function cancelHold(){activeHold=false;heldKey=null;heldPointer=null;ui.zone.classList.remove('drop-ready');}
ui.held.addEventListener('pointerdown',event=>{
  if(stage()!=='hold'||event.button!==0)return;
  event.preventDefault();ui.held.focus({preventScroll:true});activeHold=true;heldPointer=event.pointerId;
  ui.held.setPointerCapture(event.pointerId);next();
});
ui.held.addEventListener('pointerup',event=>{
  if(activeHold&&heldPointer===event.pointerId&&stage()==='holding'){cancelHold();next();}
});
ui.held.addEventListener('pointercancel',()=>{cancelHold();});
ui.held.addEventListener('keydown',event=>{
  if(![' ','Enter'].includes(event.key))return;event.preventDefault();
  if(!event.repeat&&stage()==='hold'){activeHold=true;heldKey=event.key;next();}
});
ui.held.addEventListener('keyup',event=>{
  if(![' ','Enter'].includes(event.key))return;event.preventDefault();
  if(activeHold&&heldKey===event.key&&stage()==='holding'){cancelHold();next();}
});
ui.held.addEventListener('blur',()=>cancelHold());
window.addEventListener('blur',()=>cancelHold());
document.addEventListener('keydown',event=>{if(event.key==='Escape')cancelHold();});
window.addEventListener('resize',()=>{if(stage()==='drag')moveToStart();});
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dialog=$('#source-dialog');
document.addEventListener('click',event=>{
  const link=event.target.closest('a[data-receipt]');if(!link)return;
  const receipt=receipts[link.dataset.receipt];if(!receipt)return;
  event.preventDefault();cancelHold();returnFocus=link;
  $('#source-title').textContent=receipt.title||'Source / '+receipt.id;
  const code=receipt.text.split('\n').map((line,i)=>'<span class="line"><span class="line-number">'+(receipt.start+i)+'</span>'+escape(line)+'</span>').join('');
  $('#source-content').innerHTML='<div class="source-meta">'+escape(receipt.build)+' · '+escape(receipt.revision.slice(0,12))+'<br>'+escape(receipt.path)+'<br><a href="sources.html#'+escape(receipt.id)+'">Open in the source book ↗</a></div><pre class="code-lines">'+code+'</pre>';
  dialog.showModal();$('#close-dialog').focus();
});
$('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>returnFocus?.focus({preventScroll:true}));
