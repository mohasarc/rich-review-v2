async (page) => {
  const root='file:///Users/moyaseen/projects/rich-review-v2/experiments/49-follow-next-49/';
  const output='/Users/moyaseen/projects/rich-review-v2/experiments/49-follow-next-49/';
  const c=await page.context().browser().newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const p=await c.newPage();
  const errors=[], results=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.setDefaultTimeout(5000);
  try {
    for(const variant of ['original','revised']) {
      await p.goto(root+'variants/'+variant+'/23/index.html');
      await p.bringToFront();
      await p.locator('[data-node="process"] > .cover').waitFor({state:'visible'});
      const boxes=await p.locator('#world > .node.room > .cover').evaluateAll(es=>es.map(e=>{
        const b=e.getBoundingClientRect(), outline=e.querySelector('.outline').getBoundingClientRect();
        return {room:e.parentElement.dataset.node,visible:b.height>0,clientHeight:e.clientHeight,scrollHeight:e.scrollHeight,outlineBottom:outline.bottom,coverBottom:b.bottom,outlineFits:outline.bottom<=b.bottom+1};
      }));
      const clipped=boxes.filter(b=>!b.visible||!b.outlineFits);
      const paddingOverflow=boxes.filter(b=>b.scrollHeight>b.clientHeight+1);
      results.push({page:23,variant,boxes,clipped,paddingOverflow});
      for(const id of ['D13','D04']) {
        await p.locator('button[data-decision="'+id+'"]').click();
        await p.locator('[data-node="'+id+'"] > .inside').waitFor({state:'visible'});
        await p.keyboard.press('Home');
        await p.locator('[data-node="process"] > .cover').waitFor({state:'visible'});
        results.push({page:23,variant,route:id,returned:p.url().endsWith('#root'),visibleRoot:true});
      }
      await p.screenshot({path:output+'captures/23-'+variant+'-verified.png'});
      await p.goto(root+'variants/'+variant+'/29/index.html');
      await p.locator('#overview a[href="#A1"]').click();
      if(!await p.locator('#A1').evaluate(e=>e.open)) throw Error('A1 did not open');
      await p.locator('#A1 .return-link').click();
      results.push({page:29,variant,route:'A1',returned:p.url().endsWith('#map-1')});
    }
    for(const width of [1440,390]) {
      await p.setViewportSize({width,height:1000});
      await p.goto(root+'index.html');
      results.push({page:49,width,title:await p.title(),overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
      if(width===1440) await p.screenshot({path:output+'screenshots/01-study.png',fullPage:false});
    }
  } finally {await c.close();}
  return {checked_at:new Date().toISOString(),results,errors};
}
