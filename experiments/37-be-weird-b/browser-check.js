async (page) => {
  const context = await page.context().browser().newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const p = await context.newPage();
  const errors = [];
  const checks = [];
  const overflow = [];
  const uri = 'file:///Users/moyaseen/projects/rich-review-v2/experiments/37-be-weird-b/index.html';
  p.on('pageerror', e => errors.push(e.message));
  p.on('console', e => {if(e.type()==='error') errors.push(e.text());});
  const assert = (ok,message) => {if(!ok) throw new Error(message);checks.push(message);};
  const address = () => p.locator('#reading-address').innerText();
  try {
    await p.goto(uri);
    assert(await p.locator('.decision-row').count()===12,'All twelve complete surface threads render');
    assert(await p.locator('.crossing').count()===48,'All forty-eight crossings are available');
    const facts = await p.evaluate(()=>window.REVIEW.facts.map(f=>({id:f.id,title:f.title,summary:f.summary})));
    const depths = ['Shape','Choice','Mechanism','Evidence'];
    for(let i=0;i<12;i++) {
      for(let d=0;d<4;d++) {
        await p.locator(`[data-cell="${i},${d}"]`).click();
        const current = await address();
        if(current!==`${facts[i].id} / ${depths[d].toLowerCase()}`) throw new Error('Crossing mismatch: '+current);
        if(await p.locator('#reading-pane .selected-summary').innerText()!==facts[i].summary) throw new Error('A deeper layer dropped its surface contract');
        if(d===3&&await p.locator('#reading-pane .source-block').count()===0) throw new Error('Missing source evidence');
        const clipped = await p.locator('#reading-pane svg').evaluateAll(svgs=>svgs.flatMap(svg=>Array.from(svg.querySelectorAll('text')).filter(t=>{const b=t.getBBox();return b.x<0||b.x+b.width>svg.viewBox.baseVal.width||b.y<0||b.y+b.height>svg.viewBox.baseVal.height;}).map(t=>t.textContent)));
        if(clipped.length) overflow.push({id:facts[i].id,depth:d,text:clipped});
      }
    }
    checks.push('All forty-eight crossings preserve their surface fact and render the requested depth');
    await p.locator('[data-cell="5,2"]').click();
    await p.getByRole('button',{name:'Next decision',exact:true}).click();
    assert(await address()==='await / mechanism','Changing decision preserves mechanism depth');
    await p.getByRole('button',{name:'Deeper depth',exact:true}).click();
    assert(await address()==='await / evidence','Changing depth preserves the decision');
    await p.getByRole('button',{name:'Surface ↖',exact:true}).click();
    assert(await address()==='await / shape','Surface returns to the same decision at shape depth');
    await p.goBack();
    assert(await address()==='await / evidence','Browser Back restores both coordinates');
    await p.locator('[data-cell="5,2"]').click();
    await p.locator('[data-cell="5,2"]').focus();
    await p.keyboard.press('ArrowDown');
    assert(await address()==='await / mechanism','Keyboard Down preserves depth');
    await p.keyboard.press('ArrowRight');
    assert(await address()==='await / evidence','Keyboard Right preserves decision');
    await p.keyboard.press('Escape');
    assert(await address()==='await / shape','Keyboard Escape returns to shape');
    await p.goto(uri+'#await/evidence');
    assert(await address()==='await / evidence','Direct fragment opens exact evidence crossing');
    await p.locator('[data-cell="5,2"]').click();
    await p.locator('#thread-clear').scrollIntoViewIfNeeded();
    await p.screenshot({path:'/Users/moyaseen/projects/rich-review-v2/experiments/37-be-weird-b/screenshots/02-loom.png',fullPage:false});
    await p.locator('[data-cell="6,3"]').click();
    await p.screenshot({path:'/Users/moyaseen/projects/rich-review-v2/experiments/37-be-weird-b/screenshots/03-evidence.png',fullPage:false});
    await p.locator('#unroll-toggle').click();
    assert(await p.locator('.unrolled-fact').count()===12,'Unrolled reading includes every decision, mechanism, and source');
    await p.locator('[data-return-loom]').click();
    assert(await address()==='await / evidence','Unrolling and returning preserves the crossing');
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Desktop page has no horizontal overflow');
    await p.setViewportSize({width:390,height:844});
    await p.goto(uri);
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'390px page has no horizontal overflow');
    await p.screenshot({path:'/Users/moyaseen/projects/rich-review-v2/experiments/37-be-weird-b/screenshots/04-mobile-opening.png',fullPage:false});
    await p.locator('[data-cell="6,3"]').click();
    assert(await address()==='await / evidence','Mobile can enter an arbitrary evidence crossing');
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile evidence keeps wide source lines inside their code scroller');
    await p.screenshot({path:'/Users/moyaseen/projects/rich-review-v2/experiments/37-be-weird-b/screenshots/05-mobile-evidence.png',fullPage:false});
    await p.getByRole('button',{name:'Find this thread ↓',exact:true}).click();
    const returned = await p.locator('#thread-await').boundingBox();
    assert(returned.y>=0&&returned.y<844,'Mobile return locates the selected surface thread');
    await p.goto(uri+'#invalid/nonsense');
    assert(await address()==='owner / shape','Malformed fragment returns to a usable initial view');
    assert(errors.length===0,'No browser errors during navigation');
    return {checks,errors,svgTextOverflow:overflow,viewportChecks:[1440,390],source:'file:// direct open',note:'UI verification only; no user-comprehension test.'};
  } finally {
    await context.close();
  }
}
