/* The geometry is a fixed typographic grammar, not a graph layout. SVG.js owns
   construction, clipping, event binding and the optional separation animation. */
(() => {
  'use strict';
  const E=window.EVIDENCE;
  const $=s=>document.querySelector(s);
  const $$=s=>[...document.querySelectorAll(s)];
  const paper='#f2eee4',ink='#242820';
  const model={
    resources:{name:'DaemonResourceSupervisor',short:'Resource supervisor',letter:'R',color:'#d6533b',dark:'#973a29',file:'apps/cli/src/daemon/daemon-resource-monitor.ts',input:'resource-input',shape:'policy-shape',reads:'resource-reads',caption:'250 ms cadence · 2 replacements / 10 min',old:'5-field local policy + 3 numbers',test:'Validated test policy',explanation:'resources: 9 received / 6 read. Local cadence and circuit numbers join the required policy section.'},
    shutdown:{name:'NodeDaemonProcessTerminator',short:'Process terminator',letter:'S',color:'#4673c1',dark:'#284982',file:'apps/cli/src/daemon/daemon-process-launcher.ts',input:'terminator-input',shape:'shutdown-shape',reads:'terminator-input',caption:'500 ms per signal · 20 ms polling',old:'2 defaultable numeric inputs',test:'Numeric test adapter',explanation:'shutdown: 8 received / 2 read. The numeric constructor survives in test composition.'},
    startup:{name:'DaemonRegistry',short:'Registry',letter:'E',color:'#e7b831',dark:'#977620',file:'apps/cli/src/daemon/daemon-registry.ts',input:'registry-input',shape:'startup-shape',reads:'registry-grace',caption:'15 s grace · method override remains',old:'1 local constant + method override',test:'Defaulting test adapter',explanation:'startup: 6 received / 1 read. The extra dashed circle is the still-optional graceMs method argument.'}
  };
  let side='head',selected='resources',separated=false,activeField=null,lastSourceTrigger=null;
  const shapes=[];
  function text(g,value,x,y,size=11,fill=ink,anchor='start',weight=400) {
    return g.plain(value).font({family:'Arial, sans-serif',size,weight}).fill(fill).attr({'text-anchor':anchor,x,y});
  }
  function rail(g,y,label) {
    g.line(3,y,58,y).stroke({color:'#aeb2a1',width:.8});
    text(g,label,4,y-8,7.5,'#5e6455');
  }
  function point(g,x,y,read,field,color) {
    const dot=g.circle(8).center(x,y).fill(read?paper:'none').stroke({color:read?paper:ink,width:1.2});
    if(field)dot.attr({'data-field':field,'data-read':String(read)});
    return dot;
  }
  function inputCircle(draw,g,m,cx,cy,n,kind,square,readFields=[],unreadFields=[],plain=false) {
    const radius=30*Math.sqrt(n);
    const circle=g.circle(radius*2).center(cx,cy).fill(m.color);
    if(kind!=='constant') circle.stroke({color:ink,width:2.5,dasharray:kind==='optional'?'6 4':undefined});
    if(square){
      const clip=draw.clip().add(draw.rect(square.size,square.size).center(square.x,square.y));
      g.circle(radius*2).center(cx,cy).fill(m.dark).clipWith(clip);
      if(kind!=='constant')g.circle(radius*2).center(cx,cy).fill('none').stroke({color:ink,width:2.5,dasharray:kind==='optional'?'6 4':undefined});
    }
    if(!plain){
      text(g,`${m.letter} / ${n}`,cx,cy-radius+28,17,ink,'middle',700);
      const unread=unreadFields.length;
      unreadFields.forEach((field,i)=>{
        const rows=Math.ceil(unread/3),row=Math.floor(i/3),inRow=Math.min(3,unread-row*3);
        point(g,cx+(i%3-(inRow-1)/2)*20,cy+row*18-(rows-1)*9,false,field);
      });
      readFields.forEach((field,i)=>{
        const row=Math.floor(i/3),inRow=Math.min(3,readFields.length-row*3);
        point(g,cx+(i%3-(inRow-1)/2)*20,readFields.length>3?176+row*16:174,true,field);
      });
    }
    return circle;
  }
  function drawGlyph(target,key,revision='head',decoder=false) {
    const m=model[key];const draw=SVG().addTo(target).size('100%','100%').viewbox(0,0,360,427);
    draw.attr({'role':'img','aria-label':revision==='head'?m.explanation:`Before #131. ${m.short}: ${m.old}.`});
    draw.node.insertAdjacentHTML('afterbegin',`<title>${revision==='head'?m.explanation:`Before: ${m.old}`}</title>`);
    const base=draw.group();rail(base,112,'DAEMON PKG');rail(base,240,'CLI SOURCE');rail(base,370,'CLI TESTS');
    const consumer=draw.group(),value=draw.group(),adapter=draw.group();
    let override;
    const square={x:180,y:240,size:158};
    if(revision==='head'){
      // The triangle's center is on the test-code row; its overlap with the
      // square denotes construction of the same production consumer.
      adapter.polygon('180,290 260,410 100,410').fill(m.color).stroke({color:ink,width:2.5});
      text(adapter,'TEST',180,367,10,ink,'middle',700);
      text(adapter,key==='resources'?'fixture':'adapter',180,388,9,ink,'middle');
      adapter.back();base.back();
      consumer.rect(square.size,square.size).center(square.x,square.y).fill(ink);
      inputCircle(draw,value,m,180,112,E.fields[key].length,'required',square,E.directReads[key],E.fields[key].filter(f=>!E.directReads[key].includes(f)));
      text(consumer,`${E.directReads[key].length} / ${E.fields[key].length}`,180,266,34,paper,'middle',700);
      text(consumer,'FIELDS READ',180,287,8.5,paper,'middle');
      if(key==='startup'){
        override=value.group();
        inputCircle(draw,override,m,279,240,1,'optional',square,[],[],true);
        text(override,'1',279,246,17,ink,'middle',700);
        text(override,'graceMs?',282,286,10,ink,'middle');
      }
    } else {
      text(base,'Policy already exists.',180,100,11,'#5e6455','middle');
      text(base,'These inputs still come from CLI.',180,118,9,'#5e6455','middle');
      consumer.rect(158,158).center(180,240).fill(ink);
      if(key==='resources'){
        const local=inputCircle(draw,value,m,106,240,5,'required',square,[],[],true);
        text(value,'5',85,223,20,ink,'middle',700);
        point(value,76,249,false);point(value,95,263,false);
        point(value,130,220,true);point(value,139,240,true);point(value,130,260,true);
        inputCircle(draw,value,m,216,236,2,'constant',square,[],[],true);
        text(value,'2',216,231,16,paper,'middle',700);point(value,205,250,true);point(value,225,250,true);
        inputCircle(draw,value,m,283,240,1,'optional',square,[],[],true);
        text(value,'1',283,246,17,ink,'middle',700);
        text(value,'interval?',287,285,9,ink,'middle');
        text(consumer,'3 RSS + cadence + circuit',180,304,8,paper,'middle');
      } else if(key==='shutdown'){
        inputCircle(draw,value,m,140,240,1,'optional',square,[],[],true);
        inputCircle(draw,value,m,220,240,1,'optional',square,[],[],true);
        text(value,'500',140,245,14,paper,'middle',700);text(value,'20',220,245,14,paper,'middle',700);
        text(consumer,'SIGNAL / POLL · ms',180,293,8.5,paper,'middle');
      } else {
        inputCircle(draw,value,m,180,240,1,'constant',square,[],[],true);
        text(value,'15 s',180,246,17,paper,'middle',700);
        inputCircle(draw,value,m,279,240,1,'optional',square,[],[],true);
        text(value,'1',279,246,17,ink,'middle',700);text(value,'graceMs?',279,286,10,ink,'middle');
      }
      text(base,'Tests use the old runtime inputs.',180,374,10,'#5e6455','middle');
    }
    shapes.push({value,consumer,adapter,override,decoder});
    if(decoder)draw.find('[data-field]').forEach(dot=>dot.on('click',()=>selectField(dot.attr('data-field'))));
    return draw;
  }
  function paint(){
    shapes.splice(0);
    Object.keys(model).forEach(key=>{
      $(`#draw-${key}`).replaceChildren();drawGlyph(`#draw-${key}`,key,side);
      $(`#glyph-${key}`).setAttribute('aria-label',side==='head'?`Read ${model[key].short}. ${model[key].explanation}`:`Read ${model[key].short}. Before #131: ${model[key].old}.`);
      $(`#caption-${key}`).innerHTML=side==='head'?`<strong>${E.fields[key].length} required · ${E.directReads[key].length} read</strong><br>${model[key].caption}`:`<strong>${model[key].old}</strong><br>${model[key].caption}`;
    });
    renderDecoder();
    if(separated)animateSeparation(false);
  }
  function renderDecoder(){
    const m=model[selected];
    $('#decoder-drawing').replaceChildren();drawGlyph('#decoder-drawing',selected,'head',true);
    $('#decoder-equation').textContent=m.explanation;
    $('#field-count').textContent=`AFTER #131 / ${E.directReads[selected].length} READ OF ${E.fields[selected].length} RECEIVED`;
    $('#selected-title').textContent=m.name;$('#selected-path').textContent=m.file;
    $('#fields').replaceChildren();
    for(const field of E.fields[selected]){
      const read=E.directReads[selected].includes(field),button=document.createElement('button');
      button.className='field-row';button.dataset.field=field;button.dataset.read=String(read);button.setAttribute('aria-pressed','false');
      const mark=document.createElement('span');mark.className='read-mark';mark.setAttribute('aria-hidden','true');
      const code=document.createElement('code');code.textContent=field;
      const state=document.createElement('span');state.className='field-state';state.textContent=read?'read':'unread here';
      button.append(mark,code,state);button.addEventListener('click',()=>selectField(field));$('#fields').append(button);
    }
    $('#field-reading').textContent='White points sit in the consumer overlap. Open points remain in the received section.';
    $('#decoder-receipts').replaceChildren();
    [[m.input,'Constructor input'],[m.shape,'Section definition'],[m.reads,'Consumer reads']].forEach(([key,label])=>{
      const b=document.createElement('button');b.textContent=label;b.dataset.source=key;$('#decoder-receipts').append(b);
    });
    $$('[data-select]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.select===selected)));
    if(activeField&&E.fields[selected].includes(activeField))selectField(activeField);else activeField=null;
  }
  function selectField(field){
    activeField=field;
    $$('.field-row').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.field===field)));
    SVG('#decoder-drawing svg').find('[data-field]').forEach(dot=>{
      const active=dot.attr('data-field')===field;
      dot.radius(active?7:4).stroke({color:active?'#ffffff':dot.attr('data-read')==='true'?paper:ink,width:active?3:1.2});
    });
    const read=E.directReads[selected].includes(field);
    $('#field-reading').textContent=`${field}: ${read?'directly read by this consumer.':'received in the required section; not read by this consumer.'}`;
  }
  function animateSeparation(animate=true){
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    shapes.filter(s=>!s.decoder).forEach(({value,consumer,adapter,override})=>{
      const transforms=[[value,separated?-15:0,separated?-12:0],[consumer,separated?15:0,0],[adapter,0,separated?10:0]];
      if(override)transforms.push([override,separated?33:0,separated?12:0]);
      for(const [g,x,y] of transforms){
        g.timeline().finish();
        if(animate&&!reduce)g.animate(320,'<>').transform({translateX:x,translateY:y},false);
        else g.transform({translateX:x,translateY:y},false);
      }
    });
    $('#separate').setAttribute('aria-pressed',String(separated));$('#separate').textContent=separated?'Rejoin shapes':'Separate shapes';
    $('#figure-note').textContent=separated?'Illustrative separation for reading the parts. Alignment and intersection are suspended in this view; no program runs. Rejoin to read the contract.':'Schematic notation. Circle area counts fields; overlap means “uses”, not shared memory or call order. Dot positions separate fields read here from fields only received. Select any compound to decode it.';
  }
  function setSide(value){side=value;separated=false;$('#base').setAttribute('aria-pressed',String(side==='base'));$('#head').setAttribute('aria-pressed',String(side==='head'));paint();animateSeparation(false);}
  function selectConsumer(key,jump=false){selected=key;activeField=null;paint();if(jump){location.hash=`decode-${key}`;$('#decoder').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}
  function handleHash(){const match=location.hash.match(/^#decode-(resources|shutdown|startup)$/);if(match){selectConsumer(match[1]);$('#decoder').scrollIntoView({behavior:'instant'});}}
  $('#base').addEventListener('click',()=>setSide('base'));$('#head').addEventListener('click',()=>setSide('head'));
  $('#separate').addEventListener('click',()=>{separated=!separated;animateSeparation();});
  $$('[data-consumer]').forEach(b=>b.addEventListener('click',()=>selectConsumer(b.dataset.consumer,true)));
  $$('[data-select]').forEach(b=>b.addEventListener('click',()=>selectConsumer(b.dataset.select,false)));
  document.addEventListener('click',e=>{
    const trigger=e.target.closest('[data-source]');if(!trigger)return;
    const receipt=E.excerpts[trigger.dataset.source];if(!receipt)return;
    lastSourceTrigger=trigger;
    $('#source-title').textContent=receipt.path;
    $('#source-location').textContent=`${receipt.side.toUpperCase()} · ${receipt.revision} · lines ${receipt.start}–${receipt.end}`;
    $('#source-code').textContent=receipt.text.split('\n').map((line,i)=>`${String(receipt.start+i).padStart(4)}  ${line}`).join('\n');
    $('#source-code').scrollTop=0;$('#source-code').scrollLeft=0;
    $('#full-source').href=`evidence/source-book.html#${receipt.doc}-L${receipt.start}`;
    $('#source-dialog').showModal();
  });
  $('#close-source').addEventListener('click',()=>$('#source-dialog').close());
  $('#source-dialog').addEventListener('close',()=>lastSourceTrigger?.focus({preventScroll:true}));
  window.addEventListener('hashchange',handleHash);
  paint();handleHash();
  window.GRAMMAR={model,get state(){return {side,selected,separated,activeField}}};
})();
