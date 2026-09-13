async (page) => {
  const root = '/Users/moyaseen/projects/rich-review-v2/experiments/';
  const out = root + '49-follow-next-49/';
  const c = await page.context().browser().newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const p = await c.newPage();
  p.setDefaultTimeout(5000);
  await c.route(/^https?:/, r => r.abort());
  const rows = {}, errors = [], routes = [];
  p.on('pageerror', e => errors.push(e.message));
  const open = async file => {await p.goto('file://' + root + file); await p.waitForTimeout(80);};
  const save = (key, text, selector) => {rows[key]={text,selector,url:p.url(),captured_at:new Date().toISOString()};};
  try {
    await open('20-contract-table/index.html');
    save('127-top', await p.locator('#overview').innerText()+'\n\n'+await p.locator('#decisions').innerText(), '#overview + #decisions');
    await p.locator('[data-pr="131"]').click();
    save('validation-explicit', await p.locator('#decision-p12').innerText(),'#decision-p12');
    await open('02-unconstrained-b/index.html');
    save('validation-general', await p.locator('#decision-register [data-decision="shapes"]').innerText(),'#decision-register [data-decision="shapes"]');
    await open('01-unconstrained-a/index.html');
    save('owner-first', await p.locator('.extra-card').filter({has:p.locator('[data-decision="x-graph-order"]')}).innerText(),'.extra-card containing x-graph-order');
    await open('14-outsider-persona/index.html');
    save('owner-last', await p.locator('#extra-project-order > summary').innerText(),'#extra-project-order > summary');
    for(const variant of ['original','revised']) {
      await open('49-follow-next-49/variants/'+variant+'/23/index.html');
      save('23-'+variant+'-top',await p.locator('#world > .world-title').innerText()+'\n'+await p.locator('#world > .root-picture').innerText()+'\n'+(await p.locator('#world > .node.room > .cover').allInnerTexts()).join('\n\n'),'#world root picture and room covers');
      await p.screenshot({path:out+'captures/23-'+variant+'-root.png'});
      for(const id of ['D13','D04']) {
        await p.locator('button[data-decision="'+id+'"]').click();
        await p.waitForTimeout(80);
        const selector='[data-node="'+id+'"] > .inside';
        save('23-'+variant+'-'+id,await p.locator(selector+' > .leaf-head').innerText()+'\n'+await p.locator(selector+' > .before-after').innerText()+'\n'+await p.locator(selector+' > .rationale').innerText(),selector+' (explanation only; embedded source withheld)');
        routes.push({variant,page:23,steps:['#root','button[data-decision="'+id+'"]',p.url().split('#')[1],'Home','#root'],source_visible_on_actual_page:true,source_withheld_from_reader_packet:true});
        await p.keyboard.press('Home');
        await p.waitForTimeout(80);
        if(!p.url().endsWith('#root')) throw Error('23 root return failed');
      }
      const clipping = await p.locator('#world > .node.room > .cover').evaluateAll(es=>es.map(e=>({room:e.parentElement.dataset.node,client:e.clientHeight,scroll:e.scrollHeight,outline: e.querySelector('.outline')?.getBoundingClientRect().bottom, bottom:e.getBoundingClientRect().bottom})));
      rows['23-'+variant+'-geometry']=clipping;
      await open('49-follow-next-49/variants/'+variant+'/29/index.html');
      save('29-'+variant+'-top',await p.locator('.opening').innerText()+'\n'+await p.locator('.boundary-overview').innerText()+'\n'+await p.locator('#overview').innerText(),'.opening + .boundary-overview + #overview');
      await p.locator('#overview a[href="#A1"]').click();
      if(!await p.locator('#A1').evaluate(e=>e.open)) await p.locator('#A1 > summary').click();
      save('29-'+variant+'-A1',await p.locator('#A1').innerText(),'#A1 open, source dialogs closed');
      routes.push({variant,page:29,steps:['#overview','a[href="#A1"] (opens disclosure)','#A1 reason','#A1 .return-link','#map-1']});
      await p.locator('#A1 .return-link').click();
      if(!p.url().endsWith('#map-1')) throw Error('29 overview return failed');
      await p.locator('#overview').screenshot({path:out+'captures/29-'+variant+'-overview.png'});
    }
  } finally {await c.close();}
  return {captured_at:new Date().toISOString(),rows,routes,errors};
}
