async (page) => {
  const out='/Users/moyaseen/projects/rich-review-v2/experiments/51-angle-new-subject-51';
  const browser=page.context().browser();
  const context=await browser.newContext({viewport:{width:1440,height:1100}});
  const p=await context.newPage();
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  const requests=[];p.on('request',r=>requests.push(r.url()));
  await p.goto('http://127.0.0.1:5151/');
  const checkpoints=[];
  const ids=await p.locator('details.example').evaluateAll(nodes=>nodes.map(n=>n.id));
  for(const id of ids){
    await p.locator('#'+id+' > summary').click();
    const buttons=p.locator('#'+id+' [data-step]');
    const count=await buttons.count();
    for(let i=0;i<count;i++){
      await buttons.nth(i).click();
      const shown=await p.locator('#'+id+' [data-panel]:not([hidden])').count();
      if(shown!==1)throw new Error(id+': '+shown+' visible checkpoints');
      if(await buttons.nth(i).getAttribute('aria-pressed')!=='true')throw new Error(id+': pressed state');
    }
    checkpoints.push({id,count});
    await p.locator('#'+id+' > summary').click();
  }
  // Every front's downward link must open its example and restore exact position/focus.
  const frontIds=await p.locator('[data-decision]').evaluateAll(nodes=>nodes.map(n=>n.id));
  let returns=0;
  for(const id of frontIds){
    const a=p.locator('#'+id+' .decision-key');
    await a.scrollIntoViewIfNeeded();
    const y=await p.evaluate(()=>scrollY);
    await a.click();
    await p.waitForTimeout(25);
    await p.locator('#back').click();
    const state=await p.evaluate(()=>({y:scrollY,focus:document.activeElement.closest('[data-decision]')?.id}));
    if(Math.abs(state.y-y)>2||state.focus!==id)throw new Error('Return '+id+': '+JSON.stringify({y,state}));
    returns++;
  }
  const widths=[];
  for(const width of [320,390,768,1440]){
    await p.setViewportSize({width,height:1000});
    await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
    const size=await p.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
    if(size.document>width+1)throw new Error('Overflow at '+width+': '+size.document);
    widths.push(size);
  }
  await p.setViewportSize({width:1440,height:1100});
  await p.goto('http://127.0.0.1:5151/');
  await p.screenshot({path:out+'/screenshots/01-opening.png'});
  await p.goto('http://127.0.0.1:5151/#example-state');
  await p.locator('#example-state [data-step="1"]').click();
  await p.locator('#example-state').scrollIntoViewIfNeeded();
  await p.screenshot({path:out+'/screenshots/02-publication.png'});
  await p.goto('http://127.0.0.1:5151/#example-turn');
  await p.locator('#example-turn [data-step="2"]').click();
  await p.locator('#example-turn').scrollIntoViewIfNeeded();
  await p.screenshot({path:out+'/screenshots/03-release.png'});
  await p.setViewportSize({width:390,height:1000});
  await p.goto('http://127.0.0.1:5151/#example-recovery');
  await p.locator('#example-recovery [data-step="1"]').click();
  await p.locator('#example-recovery').scrollIntoViewIfNeeded();
  await p.screenshot({path:out+'/screenshots/04-mobile-recovery.png'});
  const source=await context.newPage();
  await source.goto('http://127.0.0.1:5151/sources/receiver.html#L63');
  if(!await source.locator('#L63').isVisible())throw new Error('source line link');
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:1000}});
  const plain=await nojs.newPage();
  await plain.goto('http://127.0.0.1:5151/');
  if(await plain.locator('[data-decision]').count()!==frontIds.length)throw new Error('No-JS fronts');
  await plain.locator('#example-turn > summary').click();
  if(await plain.locator('#example-turn [data-panel]:visible').count()!==4)throw new Error('No-JS linear checkpoints');
  await plain.close();await nojs.close();
  const report={checkpoints,returns,widths,pageErrors:errors,externalRequests:requests.filter(u=>!u.startsWith('http://127.0.0.1:5151/')),noJsFronts:true,noJsLinearExample:true,directSourceFragment:true};
  await context.close();
  return report;
}
