/* A deterministic replay cabinet. Phaser owns curves, tweens, drawing and hit areas.
   Branch outcomes are frozen observations from compiled Symnav methods, never physics. */
(() => {
  'use strict';
  const O = window.PINBALL_OBSERVATIONS, E = window.PINBALL_EVIDENCE;
  const $ = id => document.getElementById(id);
  const colors = {request:0xe8efce,admission:0xe7b963,transport:0x81c6dc,terminal:0xed998c};
  const hex = n => '#'+n.toString(16).padStart(6,'0');
  const groups = [
    {name:'Before submission',ids:['unreachable','normal']},
    {name:'At admission',ids:['pressure','readiness','draining','authentication','conflict','contradiction']},
    {name:'Connection lost',ids:['reattach','reattach-exhausted']},
    {name:'Delivery interrupted',ids:['fetch','fetch-exhausted']},
    {name:'Worker lost',ids:['worker','stopping','controlled-exit']},
    {name:'Failures overlap',ids:['resource','capacity','internal']},
  ];
  const cases = {
    unreachable:['Socket unavailable','Connect fails before the request is written. The local lane is permitted.'],
    normal:['No injected failure','Admission passes; two fixture output records are validated and acknowledged.'],
    pressure:['Resource pressure + draining','Both guards would refuse. Resources are checked first: resource-pressure.'],
    readiness:['Not ready + pressure + draining','Three refusals are present. The readiness bumper is encountered first.'],
    draining:['Draining + duplicate conflict','Queue refusal precedes duplicate compatibility. The code is draining.'],
    authentication:['Authentication + all later faults','The caller does not authenticate. No rejection frame or admission resource sample is produced.'],
    conflict:['Conflicting duplicate identity','Earlier guards pass. An incompatible request cannot reuse accepted identity or fall back locally.'],
    contradiction:['Forged retrySafe: true','An injected incompatible rejection claims retry safety. The client treats the contradiction as corrupt.'],
    reattach:['Close before a manifest','Acceptance arrived, then the socket ended. Reattach to the same instance with the identical request.'],
    'reattach-exhausted':['Reattachment closes too','Both attempts stop after acceptance. The first accepted-close error survives the exhausted budget.'],
    fetch:['Break after record 0','The manifest and first record arrived. Fetch starts at record offset 1 using the same capture.'],
    'fetch-exhausted':['Resumed fetch ends early','The only permitted fetch also ends without result-end. The accepted result becomes corrupt.'],
    worker:['Worker exits','The request is not marked resource-interrupted; no shutdown code is recorded.'],
    stopping:['Worker exits during stopping','An explicit stopping shutdown changes the worker-exit classification to stopping.'],
    'controlled-exit':['Worker exits during resource shutdown','Shutdown says controlled-resource, but this request has no resource-interruption mark. Worker-exit takes precedence.'],
    resource:['Resource + capacity + worker exit','The request is marked resource-interrupted. That fact takes precedence over capacity and worker exit.'],
    capacity:['Capacity + worker exit','No resource-interruption mark. Completion capacity takes precedence over worker exit.'],
    internal:['No more specific failure fact','Execution failed with no resource, capacity, worker-exit or shutdown fact. The outer code is internal.'],
  };
  const positions={start:[272,148],gate:[594,373],worker:[594,488],delivery:[594,642],socket:[383,423],reattach:[272,281],fetch:[272,563],localgate:[272,390],local:[87,487],returned:[272,713],classifier:[774,560]};
  const guards=[
    {name:'Authentication',short:'AUTH',x:462,y:165,id:'authentication'},
    {name:'Readiness',short:'READY',x:583,y:225,id:'readiness'},
    {name:'Resources',short:'RESOURCE',x:719,y:169,id:'pressure'},
    {name:'Queue',short:'QUEUE',x:706,y:293,id:'draining'},
    {name:'Compatibility',short:'IDENTITY',x:521,y:302,id:'conflict'},
  ];
  const guardPoint = i => [guards[i].x,guards[i].y-38];
  let selected='pressure',groupIndex=1,index=0,steps=[],running=false,scene,animation=null;
  let currentState={},pendingAdvance=null,pendingIndex=null;
  let drawerFocus=null,wasPlaying=false;
  const motionMedia=matchMedia('(prefers-reduced-motion: reduce)');
  $('motion').checked=motionMedia.matches;

  function makeSteps(id){
    const observed=O.transport[id], list=[];
    let state={delivery:'not-submitted',accepted:false,manifest:false,reattach:0,fetch:0,capture:1,domain:'request',code:'—',retry:true};
    const add=(point,title,detail,receipt,patch={},via=[],bumper)=>{
      state={...state,...patch}; list.push({point:[...point],title,detail,receipt,state:{...state},via,bumper});
    };
    add(positions.start,'Load one request.','A warm route has already been selected. Request 79 is still in the caller process.','fallback');
    const returned=(title,detail,domain='request')=>add(positions.returned,title,detail,'fallback',{domain,retry:false},[[323,675]]);
    const local=(code,receipt='transport')=>{
      add(positions.localgate,'Local gate opens.',`The recorded ${code} error has retrySafe: true. DaemonClient may call the host executor locally.`,receipt,{retry:true});
      add(positions.local,'Local fallback route.','Source projection: the host executes locally. The fixture measured permission to fall back, not a local command run.','fallback',{},[[179,420],[90,425]]);
    };
    if(id==='unreachable'){
      add([347,148],'No socket; nothing submitted.','The injected connect call fails. Delivery remains not-submitted, so retrySafe is true.','transport',{domain:'transport',code:observed.error.code});
      local('unreachable'); return list;
    }
    const rejectIndex=guards.findIndex(g=>g.id===id || (id==='contradiction'&&g.id==='conflict'));
    for(let g=0;g<guards.length;g++){
      const rejected=g===rejectIndex;
      add(guardPoint(g),rejected?`${guards[g].name} stops the request.`:`${guards[g].name} passes.`,rejected?cases[id][1]:'First-failure order: only a passing guard allows the request to reach the next one.','guards',{
        delivery:'submitted-unconfirmed',retry:false,domain:rejected?'admission':'request',code:rejected?(O.admission[id]?.decision.code??'incompatible'):'—'
      },[],g);
      if(rejected)break;
    }
    if(rejectIndex>=0){
      if(id==='authentication'){
        add(positions.reattach,'The socket closes silently.','No authenticated rejection frame arrived. The client records closed / submitted-unconfirmed, with retrySafe: false.','admission-host',{domain:'transport',code:observed.error.code},[[397,120],[330,180]]);
      }else{
        add(positions.reattach,id==='contradiction'?'The wire claim is corrupt.':'The client validates the refusal.',id==='contradiction'?'incompatible plus retrySafe: true contradicts the daemon-owned table. The actual client rejects it as corrupt.':`The authenticated rejection code is ${observed.error.code==='rejected'?O.admission[id].decision.code:observed.error.code}; retrySafe is ${observed.error.retrySafe}.`,'retry',{domain:id==='contradiction'?'transport':'admission',code:id==='contradiction'?'corrupt':O.admission[id].decision.code,retry:observed.error.retrySafe},[[425,228],[343,250]]);
      }
      if(observed.error.retrySafe)local(O.admission[id].decision.code);
      else{
        add(positions.localgate,'The local gate stays closed.','The client has no proof that permits a separate local execution. It returns a controlled result.','transport',{retry:false});
        returned('Controlled result returned.','This request does not enter the local executor. No correctness judgment is implied by the drain.',id==='conflict'?'admission':'transport');
      }
      return list;
    }
    add(positions.gate,'Acceptance closes the local exit.','The acceptance receipt latches this identity. All later recovery is for the same accepted request.','identity',{delivery:'accepted',accepted:true,retry:false});
    if(O.classification[id]){
      add(positions.worker,'The execution domain fails.','Illustrative server leg: the recorded classifier receives concrete failure facts from an accepted execution. This probe did not start a worker.','classify',{domain:'terminal'});
      const f=O.classification[id];
      add(positions.classifier,`${f.code}.`,cases[id][1],'failure',{code:f.code,domain:'terminal'},[[702,488],[774,505]]);
      returned('Terminal failure returned.',`${f.code} is an outer completion code. The client resolves a failed completion and produces a controlled result; it never re-executes locally.`,'terminal');
      return list;
    }
    if(id.startsWith('reattach')){
      add(positions.socket,'Accepted connection lost.','The stream ends before a result manifest. The close belongs to the authenticated instance.','close',{domain:'transport',code:'closed'},[[436,397]]);
      add(positions.reattach,'Reattach the identical request.','The real client sends the same request again. The new attempt owns capture 2; capture 1 was disposed.','reattach',{reattach:1,capture:2},[[331,402],[238,340]]);
      add(positions.gate,'Original acceptance, same identity.','Source projection of the server: admission passes again; an existing ledger entry attaches without a new worker execution.','identity',{code:'—',domain:'request'},[[314,190],[408,111],guardPoint(0),guardPoint(1),guardPoint(2),guardPoint(3),guardPoint(4)]);
      if(id==='reattach-exhausted'){
        add(positions.socket,'The second attempt also closes.','One reattachment was allowed. The real client preserves the first accepted-close error.','reattach',{domain:'transport',code:'closed'},[[437,397]]);
        returned('Recovery budget exhausted.','The original accepted-close error reaches the warm client. Local fallback remains closed.','transport'); return list;
      }
      add(positions.delivery,'Attach to the original completion.','Illustrative bypass: duplicate attachment does not enqueue a second execution. The scripted peer supplies the retained result to capture 2.','identity',{manifest:true},[[802,408],[808,603],[728,661]]);
    }else{
      add(positions.worker,'One accepted execution.','Illustrative server leg: the injected host executor runs inside the daemon worker. Output is owned by completion delivery.','identity');
      add(positions.delivery,'A manifest anchors the result.','The client receives a two-record fixture manifest. The delivery has an identity and expected end metadata.','manifest',{manifest:true},[[549,556]]);
    }
    if(id.startsWith('fetch')){
      add([383,640],'Record 0 arrived; the link broke.','One output record is captured. The next offset is 1. The manifest allows a result-fetch recovery.','resume',{domain:'transport',code:'closed'},[[503,686]]);
      add(positions.fetch,'Fetch record offset 1.','The real client sends result-fetch, not execute. It keeps capture 1 and uses its independent fetch budget.','fetch',{fetch:1},[[307,621],[241,602]]);
      if(id==='fetch-exhausted'){
        add([350,566],'The resumed fetch ends early.','No result-end arrives. Exhausted truncated fetch becomes corrupt / accepted, not another execution.','resume',{code:'corrupt'},[[309,522]]);
        returned('Accepted result is corrupt.','Incomplete output is disposed. There is no local fallback and no new execution attempt.','transport');return list;
      }
      add(positions.delivery,'Same capture; remaining record.','The resumed manifest matches. Record 1 continues the original capture; the offset does not restart at 0.','fetch',{domain:'request',code:'—'},[[328,602],[445,703],[604,706]]);
    }
    add([383,699],'Validate, then acknowledge.','The real capture validates end metadata and digest. A successful acknowledgement precedes exposing the result.','ack',{domain:'request',code:'—'},[[506,707]]);
    returned('Completed result returned.',`The real execution client completed with ${observed.captureCount} capture${observed.captureCount===1?'':'s'} across ${observed.connections} connection${observed.connections===1?'':'s'}. The output records are a fixture.`);
    return list;
  }

  class PinballTable extends Phaser.Scene {
    create(){
      scene=this;
      this.base=this.add.graphics();this.trail=this.add.graphics();this.flash=this.add.graphics();
      this.bumpers=[];this.links=[];
      this.drawTable();
      const tex=this.make.graphics({x:0,y:0,add:false});
      tex.fillStyle(0x000000,.25).fillCircle(21,25,11);
      tex.fillStyle(0xe8efce,1).fillCircle(19,19,11);
      tex.fillStyle(0xffffff,.9).fillCircle(16,15,4);
      tex.lineStyle(1,0x44624a,1).strokeCircle(19,19,11);
      tex.generateTexture('ball',42,42);tex.destroy();
      this.ball=this.add.image(...positions.start,'ball').setDepth(30);
      this.halo=this.add.circle(...positions.start,20,colors.request,.13).setDepth(29);
      this.ballLabel=this.add.text(0,0,'79',{fontFamily:'Courier New',fontSize:'10px',color:'#122d2a',fontStyle:'bold'}).setOrigin(.5).setDepth(31);
      this.ready=true;select(selected,false);
      window.__pinballReady=true;
    }
    label(x,y,text,size=11,color=0xaebda1,align='center'){
      const t=this.add.text(x,y,text,{fontFamily:'Arial',fontSize:size+'px',color:hex(color),align,lineSpacing:5}).setOrigin(align==='center'?.5:0,.5);
      return t;
    }
    mono(x,y,text,size=10,color=0xaebda1){const t=this.label(x,y,text,size,color);t.setFontFamily('Courier New');return t;}
    curve(points,graphic=this.base,color=0x58705b,width=2,alpha=1){
      const c=new Phaser.Curves.Spline(points.map(p=>new Phaser.Math.Vector2(...p)));
      graphic.lineStyle(width,color,alpha);graphic.strokePoints(c.getPoints(100),false);return c;
    }
    hit(x,y,w,h,receipt){
      this.add.zone(x,y,w,h).setInteractive({useHandCursor:true}).on('pointerdown',()=>showReceipt(receipt));
    }
    drawTable(){
      const g=this.base;
      // These authored rails are a game board, not a measured graph layout.
      g.fillStyle(0x102920,1).fillRoundedRect(7,8,886,784,14);
      g.lineStyle(1,0x668065,1).strokeRoundedRect(7,8,886,784,14);
      g.lineStyle(3,0x9fb592,.75).strokeRoundedRect(176,36,683,730,14);
      this.mono(526,53,'@symnav/daemon  /  PACKAGE OWNER AT TIP',11,0xe0e8c6);
      g.fillStyle(0x1a392d,.7).fillRoundedRect(191,84,176,659,12);
      g.fillStyle(0x1b392e,.35).fillRoundedRect(400,84,443,659,12);
      this.mono(279,98,'CALLER PROCESS',10,0xc5d1b1);
      this.mono(618,98,'DAEMON PROCESS',10,0xc5d1b1);
      g.lineStyle(1,0xacc7b5,.6);for(let y=92;y<732;y+=15)g.lineBetween(383,y,383,y+7);
      this.mono(383,756,'SOCKET',9,0xa2c3b1);
      // Local host is outside the package mechanism envelope.
      g.lineStyle(1,0x8c9670,.65).strokeRoundedRect(22,202,127,368,53);
      this.mono(85,236,'CLI HOST',11,0xbac2a0);
      this.label(85,261,'local executor',10,0xabb89b);
      this.label(85,281,'same caller process',9,0xabb89b);
      this.curve([[87,325],[60,371],[87,421],[87,487]],g,0x889370,4,.7);
      g.lineStyle(2,0xb6bd93).strokeCircle(87,488,30);
      this.label(85,529,'LOCAL\nFALLBACK',12,0xd8dfb8);
      this.mono(85,597,'HOST SUPPLIES',9,0x8fa48c);this.mono(85,612,'THE EXECUTOR',9,0x8fa48c);
      // Brass wire course through five guards.
      this.curve([positions.start,[369,132],...guards.map((_g,i)=>guardPoint(i)),positions.gate],g,0x7b7856,4,.8);
      this.curve([positions.gate,[594,412],positions.worker,[549,556],positions.delivery,[495,704],positions.returned],g,0x5d765c,5,.7);
      this.curve([[383,423],[324,401],[237,340],positions.reattach,[304,197],[407,110],guardPoint(0)],g,colors.transport,2,.55);
      this.curve([[383,640],[307,621],[242,602],positions.fetch,[328,603],[445,703],[604,706],positions.delivery],g,colors.transport,2,.55);
      this.curve([positions.gate,[802,408],[808,603],[728,661],positions.delivery],g,colors.transport,1,.3);
      this.curve([positions.reattach,positions.localgate,[179,420],[90,425],positions.local],g,colors.admission,2,.65);
      this.curve([positions.worker,[702,488],[774,505],positions.classifier,[750,688],[383,726],positions.returned],g,colors.terminal,2,.4);
      // Request plunger.
      g.lineStyle(2,0xb5c49e).strokeRoundedRect(224,126,98,47,22);
      this.mono(272,191,'REQUEST 79',11,0xdbe4bd);this.hit(272,151,100,62,'fallback');
      this.mono(272,250,'↶ REATTACH',12,colors.transport);
      this.label(272,272,'same request',11,0xb4cabb);
      this.label(272,302,'fresh capture',10,0x94b19d);this.hit(272,275,150,75,'reattach');
      // Local flipper pivots; actual retry state sets their pose.
      this.flipperLeft=this.add.rectangle(215,389,55,10,0xd5be77).setOrigin(0,.5).setStrokeStyle(1,0x827448);
      this.flipperRight=this.add.rectangle(325,389,55,10,0xd5be77).setOrigin(0,.5).setStrokeStyle(1,0x827448);
      g.lineStyle(1,0xc8bd7d);g.strokeCircle(215,389,7);g.strokeCircle(325,389,7);
      this.localLabel=this.mono(272,424,'LOCAL GATE',11,colors.admission);
      this.localSub=this.label(272,444,'not submitted · open',9,0xadbda0);
      this.hit(272,407,140,95,'transport');
      this.mono(272,529,'↶ RESULT-FETCH',11,colors.transport);
      this.label(272,552,'next record offset',11,0xb4cabb);
      this.label(272,583,'same capture',10,0x94b19d);this.hit(272,552,150,76,'fetch');
      g.lineStyle(2,0xbac99e).strokeRoundedRect(214,686,118,54,26);
      this.mono(272,666,'RETURN TO CALLER',10,0xcedab3);this.hit(272,708,130,70,'fallback');
      guards.forEach((guard,i)=>{
        const container=this.add.container(guard.x,guard.y);
        const body=this.add.graphics();
        body.fillStyle(0x061b17,.8).fillCircle(3,6,28);
        body.lineStyle(2,0xae985a).strokeCircle(0,0,29);
        body.fillStyle(0x314633).fillCircle(0,0,24);
        body.lineStyle(1,0xdfc078).strokeCircle(0,0,21);
        body.fillStyle(0x798161).fillCircle(-6,-7,5);
        const num=this.add.text(0,0,String(i+1),{fontFamily:'Courier New',fontSize:'17px',fontStyle:'bold',color:'#eee2b4'}).setOrigin(.5);
        container.add([body,num]);this.bumpers.push(container);
        this.mono(guard.x,guard.y+45,guard.short,10,0xd7c798);
        this.hit(guard.x,guard.y,80,92,'guards');
      });
      g.fillStyle(0x344d36).fillRoundedRect(512,354,164,37,5);
      g.lineStyle(2,0xc1c89b).strokeRoundedRect(512,354,164,37,5);
      this.mono(594,373,'ACCEPTANCE',13,0xe1e8ba);
      this.gateStatus=this.mono(594,407,'one identity / no local replay',10,0xafbd9c);
      this.hit(594,376,178,51,'identity');
      // Runtime containment is distinct from package geometry.
      g.fillStyle(0x244331,.75).fillRoundedRect(461,440,272,127,8);
      g.lineStyle(1,0x9da883,.65).strokeRoundedRect(461,440,272,127,8);
      this.mono(596,455,'WORKER THREAD',10,0xc2cdab);
      g.fillStyle(0x3e5240).fillPoints([{x:594,y:472},{x:635,y:494},{x:594,y:516},{x:553,y:494}],true);
      g.lineStyle(1,0xb9afd4).strokePoints([{x:594,y:472},{x:635,y:494},{x:594,y:516},{x:553,y:494},{x:594,y:472}],false);
      this.label(594,532,'injected host executor',11,0xc9d4b1);
      this.mono(594,551,'inner failure vocabulary',9,0xb9afd4);this.hit(592,505,267,126,'failure');
      g.lineStyle(2,colors.terminal,.8).strokeCircle(774,560,26);
      this.mono(774,560,'ƒ',22,colors.terminal);
      this.label(774,602,'classify',11,colors.terminal);this.hit(774,560,65,72,'failure');
      g.fillStyle(0x284d39).fillRoundedRect(491,616,207,53,9);
      g.lineStyle(2,0x94b7a0,.9).strokeRoundedRect(491,616,207,53,9);
      this.mono(594,632,'COMPLETION DELIVERY',11,0xd3e0bb);
      this.label(594,652,'manifest · records · end',10,0xb2c5ab);this.hit(594,643,215,65,'manifest');
      this.label(742,705,'duplicate attachment\nbypasses new execution',9,0x8eb4aa);
      // Chassis screw heads, outside the fact-carrying surface.
      for(const [x,y] of [[22,22],[878,22],[22,778],[878,778]]){
        g.fillStyle(0x68806a).fillCircle(x,y,4);g.lineStyle(1,0x233e30).lineBetween(x-2,y+2,x+2,y-2);
      }
    }
    paintBall(x,y){this.ball.setPosition(x,y);this.halo.setPosition(x,y);this.ballLabel.setPosition(x,y+1);}
    state(s){
      this.ball.setTint(colors[s.domain]);this.halo.setFillStyle(colors[s.domain],.12);
      this.flipperLeft.rotation=s.retry?-.85:.08;this.flipperRight.rotation=s.retry?Math.PI+.85:Math.PI-.08;
      this.localSub.setText(s.retry?'retrySafe · open':s.accepted?'accepted · closed':'unconfirmed · closed');
      this.gateStatus.setText(s.accepted?'latched / identity retained':'one identity / no local replay');
    }
    bumper(i){
      if(i===undefined||$('motion').checked)return;
      const b=this.bumpers[i];this.tweens.add({targets:b,scaleX:1.15,scaleY:1.15,duration:100,yoyo:true,ease:'Quad.easeOut'});
    }
    move(from,to,done,instant){
      const points=[from,...to.via,to.point];
      const path=new Phaser.Curves.Spline(points.map(p=>new Phaser.Math.Vector2(...p)));
      this.trail.lineStyle(3,colors[to.state.domain],.8);this.trail.strokePoints(path.getPoints(80));
      if(instant){this.paintBall(...to.point);done();return;}
      const follower={t:0};
      animation=this.tweens.add({targets:follower,t:1,duration:Math.max(380,Math.min(1450,path.getLength()*2.8)),ease:'Sine.easeInOut',onUpdate:()=>{const p=path.getPoint(follower.t);this.paintBall(p.x,p.y);},onComplete:()=>{animation=null;done();}});
    }
    probe(){
      if(!$('motion').checked)this.tweens.add({targets:[this.flipperLeft,this.flipperRight],scaleY:1.8,duration:130,yoyo:true,repeat:1});
    }
  }

  function render(){
    const s=steps[index];currentState={...s.state};
    $('event-count').textContent=index===0?'READY':`STOP ${String(index).padStart(2,'0')} / ${steps.length-1}`;
    $('domain').textContent=s.state.domain==='request'?'REQUEST / RESULT':s.state.domain.toUpperCase();
    $('domain').style.color=hex(colors[s.state.domain]);
    $('event-title').textContent=s.title;$('event-detail').textContent=s.detail;
    $('delivery-state').textContent=s.state.delivery;$('failure-code').textContent=s.state.code;$('capture-state').textContent=String(s.state.capture);
    $('lamp-accepted').classList.toggle('on',s.state.accepted);$('lamp-manifest').classList.toggle('on',s.state.manifest);
    $('light-reattach').textContent=`${s.state.reattach} / ${O.policy.reattach}`;$('light-fetch').textContent=`${s.state.fetch} / ${O.policy.fetch}`;
    $('launch').innerHTML=index===steps.length-1?'<span>↺</span> REPLAY REQUEST':'<span>↗</span> LAUNCH REQUEST';
    $('pause').disabled=!running&&!animation;$('pause').textContent=running?'Pause':'Resume';
    $('step').disabled=index===steps.length-1;
    if(scene?.ready)scene.state(s.state);
  }
  function clearPending(){pendingAdvance?.remove();pendingAdvance=null;}
  function stop(){running=false;clearPending();if(animation){animation.remove();animation=null;}pendingIndex=null;scene?.tweens.killTweensOf(scene.bumpers);}
  function select(id,updateHash=true){
    stop();selected=id;groupIndex=groups.findIndex(g=>g.ids.includes(id));steps=makeSteps(id);index=0;
    document.querySelectorAll('.cartridge').forEach((b,i)=>{b.classList.toggle('active',i===groupIndex);b.setAttribute('aria-pressed',String(i===groupIndex));});
    $('variant').innerHTML='';for(const value of groups[groupIndex].ids){const op=document.createElement('option');op.value=value;op.textContent=cases[value][0];op.selected=value===id;$('variant').append(op);}
    $('scenario-context').textContent=cases[id][1];$('replay-number').textContent=`${Object.keys(cases).indexOf(id)+1} / ${Object.keys(cases).length}`;
    if(scene?.ready){scene.trail.clear();scene.paintBall(...positions.start);}render();
    if(updateHash)history.replaceState(null,'','#replay='+id);
  }
  function advance(automatic=false){
    clearPending();
    if(animation){animation.remove();animation=null;index=pendingIndex;pendingIndex=null;scene.paintBall(...steps[index].point);render();if(!automatic)return;}
    if(index>=steps.length-1){running=false;render();return;}
    const from=steps[index].point;
    const targetIndex=index+1;pendingIndex=targetIndex;
    const target=steps[targetIndex];
    scene.move(from,target,()=>{
      index=targetIndex;pendingIndex=null;
      render();scene.bumper(target.bumper);
      if(index===steps.length-1){running=false;render();return;}
      if(running&&automatic){pendingAdvance=scene.time.delayedCall($('motion').checked?550:720,()=>{pendingAdvance=null;if(running)advance(true);});}
    },$('motion').checked);
  }
  function play(){
    if(!scene?.ready)return;
    if(index===steps.length-1)select(selected);
    if(running)return;
    if(index===0&&!$('source-dialog').open)document.querySelector('.machine').scrollIntoView({behavior:'instant',block:'start'});
    running=true;render();
    if(animation)animation.resume();else advance(true);
  }
  function pause(){
    if(running){running=false;clearPending();animation?.pause();render();$('pause').disabled=false;$('pause').textContent='Resume';}
    else play();
  }
  groups.forEach((g,i)=>{
    const b=document.createElement('button');b.className='cartridge';b.innerHTML=`<small>0${i+1}</small><span>${g.name}</span>`;b.setAttribute('aria-pressed','false');b.onclick=()=>select(g.ids[0]);$('cartridges').append(b);
  });
  $('variant').onchange=e=>select(e.target.value);
  $('launch').onclick=play;$('pause').onclick=pause;
  $('step').onclick=()=>{running=false;advance(false);};$('reset').onclick=()=>select(selected);
  $('motion').onchange=()=>{if(animation){animation.remove();animation=null;index=pendingIndex;pendingIndex=null;scene.paintBall(...steps[index].point);render();if(running)advance(true);}};
  $('local-gate').onclick=()=>{
    scene.probe();
    const s=steps[index].state;
    $('event-title').textContent=s.retry?'Local gate: open.':'Local gate: closed.';
    $('event-detail').textContent=(s.retry?'This stop permits local fallback.':'This stop does not permit a new local execution.')+' Gate probe is illustrative; the recorded path is unchanged. Step or resume to continue.';
  };
  $('magnify').onclick=()=>{const on=$('magnify').getAttribute('aria-pressed')!=='true';$('magnify').setAttribute('aria-pressed',String(on));$('magnify').textContent=on?'Fit whole table ↙':'Magnify table ↗';$('table-scroll').classList.toggle('magnified',on);};
  const allIds=Object.keys(cases);
  function changeCase(delta){select(allIds[(allIds.indexOf(selected)+delta+allIds.length)%allIds.length]);}
  $('previous-case').onclick=()=>changeCase(-1);$('next-case').onclick=()=>changeCase(1);
  document.addEventListener('keydown',e=>{
    if($('source-dialog').open||/INPUT|SELECT|TEXTAREA|BUTTON|A/.test(e.target.tagName))return;
    if(e.code==='Space'){e.preventDefault();running?pause():play();}
    if(e.code==='ArrowRight'){e.preventDefault();running=false;advance(false);}
    if(e.code==='KeyR'){e.preventDefault();select(selected);}
  });

  const related={
    cutover:['old-client','old-failure','fallback'],guards:['admission-host','retry','guard-tests'],retry:['transport','guards'],transport:['retry','fallback','admission-deadline','completion-deadline'],
    identity:['reattach','recovery-tests'],classify:['failure','old-failure'],failure:['classify','old-failure','failure-tests'],
    reattach:['identity','close','limits','recovery-tests'],resume:['fetch','limits','reattach'],fetch:['resume','manifest','ack','limits'],
    close:['reattach','transport'],ack:['manifest','fetch'],manifest:['ack','fetch'],limits:['budget-reasons','resume','reattach'],fallback:['transport','old-client'],
    'recovery-tests':['reattach','identity'],'failure-tests':['failure'],'guard-tests':['guards']
  };
  const notes={
    guards:'The first guard to refuse decides the outcome. The order is explicit in the package; it was previously embedded in CLI branches.',
    retry:'The code is the authority. The frame constructor derives retrySafe, and the validator rejects disagreement.',
    transport:'The local lane is a permission projection from this constructor and the warm client. A true wire boolean by itself is insufficient.',
    identity:'Server behavior is source-traced here. Recorded client peers are injected; the pinball bypass depicts this existing-entry branch, not measured worker activity.',
    failure:'Classifications were recorded by calling this actual compiled method with injected contexts. The worker strings belong to a separate inner domain; these branches do not translate them one for one.',
    reattach:'The client method was executed with scripted peers. The identical request was written twice and two real output captures were constructed. The policy record states each budget’s purpose; choosing exactly one rather than another bound is not explained.',
    fetch:'Recorded result-fetch requested offset 1 after record 0. The real capture retained the first record and validated the resumed result. The offset is a record index, not a byte index.',
    resume:'An existing manifest enables fetch recovery inside this attempt. Exhausted truncated fetch is converted to accepted corruption.',
    ack:'The acknowledgement collaborator was injected. The client and output capture were real compiled implementations; this experiment did not measure a daemon acknowledgement exchange.',
    cutover:'Source ownership crosses the package boundary at the stack tip. This does not imply a new operating-system process boundary.',
    'recovery-tests':'Existing test source, independently executed with the three other scoped suites: 95 tests passed. A focused run does not establish all-stack parity.',
  };
  function openDialog(){
    if(!$('source-dialog').open){drawerFocus=document.activeElement;wasPlaying=running;if(running)pause();$('source-dialog').showModal();$('close-source').focus();}
  }
  function showReceipt(id){
    const r=E.receipts[id];if(!r)return;
    $('source-kind').textContent='SOURCE RECEIPT';$('source-title').textContent=r.title;
    $('source-note').textContent=notes[id]??'Frozen at the supplied revision. This receipt deepens one of the seven open table rules.';
    $('source-location').textContent=`${r.build==='head'?'STACK TIP':'MAIN'} · ${r.path}:${r.start}–${r.end} · ${r.revision.slice(0,12)}`;
    $('source-code').textContent=r.text.split('\n').map((line,i)=>`${String(r.start+i).padStart(4)}  ${line}`).join('\n');
    $('source-related').innerHTML='';for(const other of related[id]??[]){const b=document.createElement('button');b.textContent=E.receipts[other].title;b.onclick=()=>showReceipt(other);$('source-related').append(b);}
    $('source-link').href=`https://github.com/mohasarc/symnav/blob/${r.revision}/${r.path}#L${r.start}-L${r.end}`;$('source-link').hidden=false;openDialog();
    $('source-code').scrollTop=0;
  }
  document.querySelectorAll('[data-receipt]').forEach(b=>b.onclick=()=>showReceipt(b.dataset.receipt));
  $('inspect').onclick=()=>showReceipt(steps[index].receipt);
  $('record').onclick=()=>{
    $('source-kind').textContent='RECORDED METHOD RUN';$('source-title').textContent=cases[selected][0];
    $('source-note').textContent=O.kind+' Each event below was captured from the real execution client and output capture. These are fixture coordinates. The browser replays the record; the local lane and server execution/duplicate legs are source projections.';
    $('source-location').textContent=`head ${O.pin} · scripts/record.mjs · case ${selected}`;
    $('source-related').innerHTML='';$('source-code').textContent=JSON.stringify({admission:O.admission[selected],classification:O.classification[selected],...O.transport[selected]},null,2);$('source-link').hidden=true;openDialog();
  };
  function closeDialog(){ $('source-dialog').close(); }
  $('close-source').onclick=closeDialog;
  $('source-dialog').addEventListener('close',()=>{drawerFocus?.focus({preventScroll:true});/* Inspection intentionally leaves playback paused. */wasPlaying=false;});
  $('source-return').onclick=()=>{$('source-dialog').close();};
  window.addEventListener('hashchange',()=>{const id=location.hash.replace('#replay=','');if(cases[id])select(id,false);});
  const hashId=location.hash.replace('#replay=','');if(cases[hashId])selected=hashId;
  const game=new Phaser.Game({type:Phaser.CANVAS,parent:'table',width:900,height:810,backgroundColor:'#122d2a',antialias:true,roundPixels:false,banner:false,audio:{noAudio:true},scale:{mode:Phaser.Scale.NONE},scene:PinballTable});
  // Read-only harness visibility for reproducible browser assertions. No saved review state.
  Object.defineProperty(window,'__pinball',{value:{get state(){return {selected,index,total:steps.length,running,animating:!!animation,...currentState};},get steps(){return steps.map(s=>({title:s.title,point:s.point,state:s.state,receipt:s.receipt}));},cases:allIds,receipts:Object.keys(E.receipts),game},writable:false});
})();
