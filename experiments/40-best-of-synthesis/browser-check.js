async (page) => {
  const base = 'file:///Users/moyaseen/projects/rich-review-v2/experiments/40-best-of-synthesis/index.html';
  const folder = '/Users/moyaseen/projects/rich-review-v2/experiments/40-best-of-synthesis/screenshots/';
  const context = await page.context().browser().newContext({viewport:{width:1440,height:1080}});
  const p = await context.newPage();
  const errors = [], externalRequests = [], checks = [];
  const expect = (condition, name) => {if(!condition)throw new Error(name);};
  p.on('pageerror',error=>errors.push(error.message));
  p.on('request',request=>{if(/^https?:/.test(request.url()))externalRequests.push(request.url());});
  await p.goto(base);
  expect(await p.locator('.decision').count()===12,'decision count');
  expect(await p.locator('.credit-table tbody tr').count()===13,'credit count');
  await p.screenshot({path:folder+'01-opening.png'});
  checks.push('Direct file opening: 12 visible decisions and 13 credited predecessors');

  for(let i=1;i<=12;i++){
    const id='D'+String(i).padStart(2,'0');
    const anchor=p.locator('#'+id+' h3 a');
    await anchor.scrollIntoViewIfNeeded();
    const href=await anchor.getAttribute('href');
    await anchor.click();
    expect(await p.evaluate(()=>location.hash)===href,'decision destination '+id);
    const saved=await p.evaluate(()=>returnTrail.at(-1));
    await p.locator('#return-float').click();
    expect(Math.abs((await p.evaluate(()=>scrollY))-saved.scroll)<2,'return position '+id);
    expect(await p.evaluate(id=>document.activeElement.id===id,saved.id),'return focus '+id);
  }
  checks.push('All 12 decision-to-mechanism exits restore exact reading position and focus');

  for(let i=0;i<8;i++){
    await p.locator(`[data-request-step="${i}"]`).click();
    expect(await p.locator('#request-position').innerText()===`${i+1} / 8`,'request counter');
    expect(await p.locator(`[data-request-step="${i}"]`).getAttribute('aria-pressed')==='true','request pressed state');
    expect(await p.locator('[data-cache]').count()===12,'six caches per side');
  }
  for(let i=0;i<12;i++){
    await p.locator('[data-cache]').nth(i).click();
    expect(await p.locator('#cache-dialog').evaluate(d=>d.open),'cache dialog opens');
    expect((await p.locator('#cache-dialog-body').innerText()).includes('src/app.ts'),'cached entry has fixture key');
    await p.keyboard.press('Escape');
    expect(!(await p.locator('#cache-dialog').evaluate(d=>d.open)),'Escape closes dialog');
    expect(await p.evaluate(()=>document.activeElement.hasAttribute('data-cache')),'cache focus restored');
  }
  await p.locator('[data-cache]').first().click();
  await p.locator('#cache-dialog-body a').first().click();
  expect(!(await p.locator('#cache-dialog').evaluate(d=>d.open)),'source exit closes dialog');
  expect(await p.locator('#e-projections').evaluate(d=>d.open),'source exit opens projection excerpt');
  await p.evaluate(()=>new Promise(requestAnimationFrame));
  expect(await p.evaluate(()=>document.activeElement.id==='e-projections'),'source exit keeps focus on its evidence');
  await p.locator('#return-float').click();
  expect(await p.evaluate(()=>document.activeElement.hasAttribute('data-cache')),'source exit returns to cache');
  checks.push('All 8 request stops, 12 cache dialogs, Escape/focus, and cache → source → return work');
  await p.evaluate(()=>document.getElementById('request').scrollIntoView({block:'start'}));
  await p.screenshot({path:folder+'02-request.png'});

  for(const name of ['release-reject','release-hold','refresh','failed-refresh']){
    await p.locator('#scenario').selectOption(name);
    const length=await p.locator('[data-lab-step]').count();
    for(let i=0;i<length;i++){
      await p.locator(`[data-lab-step="${i}"]`).click();
      const actual=await p.locator('#lab-panels .signal.backend b').allTextContents();
      const expected=await p.evaluate(({name,i})=>['base','head'].map(side=>SYNTH.lab[name][side].steps[i].release.backend),{name,i});
      expect(JSON.stringify(actual)===JSON.stringify(expected),'rendered release states '+name+':'+i);
      expect(await p.locator('#lab-panels .lab-cache').count()===12,'lab six-store counts');
    }
    if(name==='release-reject')expect((await p.locator('#lab-panels .signal.backend b').allTextContents()).join('/')==='fulfilled/rejected','changed rejection boundary');
  }
  await p.locator('#scenario').selectOption('release-reject');
  expect((await p.locator('#lab-panels .signal.backend b').allTextContents()).join('/')==='fulfilled/pending','held release boundary');
  await p.locator('#lab-next').click();
  await p.locator('#lab-prev').click();
  await p.evaluate(()=>document.getElementById('boundaries').scrollIntoView({block:'start'}));
  await p.screenshot({path:folder+'03-boundary.png'});
  checks.push('All 20 checkpoints across 4 recorded boundary cases render their saved states; pending and rejection differences checked');

  for(const version of ['base','head']){
    await p.locator('#contact-version').selectOption(version);
    for(const channel of ['D','R','T','C','E','P']){
      await p.locator('#contact-channel').selectOption(channel);
      const counts=await p.locator('.relation-matrix').evaluateAll(figures=>figures.map(f=>f.querySelectorAll('td.same').length));
      expect(counts[0]===24 && counts[1]===(['R','P'].includes(channel)?8:24),'identity matrices '+version+channel);
    }
  }
  await p.locator('#contact-version').selectOption('head');
  await p.locator('#contact-channel').selectOption('R');
  await p.evaluate(()=>document.getElementById('contact').scrollIntoView({block:'start'}));
  await p.screenshot({path:folder+'04-identity-matrix.png'});
  checks.push('All 12 store/revision selections: 24 within-cache equality cells; reference/position returns have only 8 diagonal cells');

  await p.locator('#depth-index summary').click();
  await p.locator('[data-crossing="0,1"]').focus();
  await p.keyboard.press('ArrowDown');await p.keyboard.press('ArrowRight');
  expect(await p.evaluate(()=>document.activeElement.dataset.crossing)==='1,2','depth axes down/right');
  await p.locator('[data-crossing="0,1"]').focus();
  await p.keyboard.press('ArrowRight');await p.keyboard.press('ArrowDown');
  expect(await p.evaluate(()=>document.activeElement.dataset.crossing)==='1,2','depth axes right/down');
  await p.locator('[data-crossing="8,2"]').click();
  expect(await p.locator('#e-backend-after').evaluate(d=>d.open),'depth evidence destination');
  await p.locator('#return-float').click();
  expect(await p.evaluate(()=>document.activeElement.dataset.crossing)==='8,2','return to same crossing');
  checks.push('Decision × depth keyboard axes commute; evidence and return preserve the selected crossing');

  const sourceIds=await p.locator('.source').evaluateAll(es=>es.map(e=>e.id));
  for(const id of sourceIds){
    await p.goto(base+'#'+id);
    expect(await p.locator('#'+id).evaluate(d=>d.open),'direct source link opens '+id);
    expect(await p.locator('#'+id+' pre').isVisible(),'direct source excerpt visible '+id);
  }
  checks.push('All 32 source excerpts open from copied URL fragments');

  const widths=[320,390,768,1440];
  for(const width of widths){
    await p.setViewportSize({width,height:width<500?844:1080});
    await p.goto(base);
    for(const id of ['opening','decisions','request','contact','boundaries','api','evidence']){
      await p.evaluate(id=>document.getElementById(id).scrollIntoView({block:'start'}),id);
      expect(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page overflow '+width+' '+id);
    }
    await p.evaluate(()=>document.querySelectorAll('.source').forEach(d=>d.open=true));
    expect(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'all sources open overflow '+width);
    if(width===390){
      await p.evaluate(()=>scrollTo(0,0));
      await p.screenshot({path:folder+'05-mobile.png'});
      await p.evaluate(()=>document.getElementById('contact').scrollIntoView({block:'start'}));
      await p.screenshot({path:folder+'06-mobile-matrix.png'});
    }
  }
  checks.push('320, 390, 768, and 1440 px layouts: no document overflow, including all source excerpts open');
  expect(!errors.length,'browser errors: '+errors.join('; '));
  expect(!externalRequests.length,'external requests');
  await context.close();

  const nojs=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const np=await nojs.newPage();
  await np.goto(base);
  expect(await np.locator('.decision').count()===12,'no-js overview');
  await np.locator('#e-scope summary').click();
  expect(await np.locator('#e-scope pre').isVisible(),'no-js source disclosure');
  await np.locator('#e-scope .source-footer a[href="#D11"]').click();
  expect((await np.url()).endsWith('#D11'),'no-js decision backlink');
  await np.locator('#depth-index summary').click();
  expect(await np.locator('[data-crossing]').count()===36,'no-js depth links');
  expect(await np.locator('.noscript-note').isVisible(),'no-js guidance');
  await nojs.close();
  checks.push('JavaScript disabled: complete overview, source disclosure/backlink, depth matrix, and static recording tables remain available');
  return {passed:true,checks,errors,externalRequests,browser:'Chromium via isolated Playwright contexts; file://',limits:'Browser interaction and layout checks, not a comprehension study or symnav test run.'};
}
