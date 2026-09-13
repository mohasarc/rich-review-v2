const {chromium}=require(process.env.BOARD_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const url='file://'+path.join(root,'index.html');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1320},deviceScaleFactor:1,offline:true});
  const page=await context.newPage();
  const errors=[],external=[],checks=[];
  page.on('pageerror',error=>errors.push(String(error)));
  page.on('request',request=>{if(/^https?:/.test(request.url()))external.push(request.url());});
  const check=async(name,fn)=>{await fn();checks.push({name,passed:true});};
  const stage=async n=>{await page.locator(`button[data-stage="${n}"]`).click();await page.waitForFunction(n=>BOARD.state.stage===n&&document.querySelector('#packing').getAttribute('aria-busy')==='false',n);};
  await page.goto(url);
  await page.waitForFunction(()=>window.BOARD);
  await check('Direct file opening with the network offline',async()=>{assert.equal(await page.title(),'Decision Tetris — A full package is not a handoff');assert.equal(await page.evaluate(()=>BOARD.state.stage),1);});
  await page.screenshot({path:path.join(root,'screenshots/01-opening.png')});
  await check('Three settled states, caller, body visibility and focusability',async()=>{
    for(const n of [0,1,2,1,0,2]){
      await stage(n);
      const values=await page.evaluate(()=>({state:BOARD.state,old:+getComputedStyle(document.querySelector('#old-body')).opacity,new:+getComputedStyle(document.querySelector('#new-piece')).opacity,cap:+getComputedStyle(document.querySelector('#cutover-piece')).opacity,oldFocus:[...document.querySelectorAll('#old-body [tabindex="0"]')].length,newFocus:[...document.querySelectorAll('#new-body [tabindex="0"]')].length}));
      assert.equal(values.state.stage,n);assert.equal(values.old,n<2?1:0);assert.equal(values.new,n>0?1:0);assert.equal(values.cap,n===2?1:0);
      assert.equal(values.oldFocus,n<2?7:0);assert.equal(values.newFocus,n>0?7:0);
    }
  });
  await page.locator('.instrument').screenshot({path:path.join(root,'screenshots/02-cutover.png')});
  await check('Scrubber keyboard Home, ArrowRight and End',async()=>{
    await page.locator('#scrub').focus();
    for(const [key,n]of [['Home',0],['ArrowRight',1],['End',2]]){
      await page.keyboard.press(key);await page.waitForFunction(n=>BOARD.state.stage===n,n);
    }
  });
  await check('The same lift is free at 148 and pinned at 149',async()=>{
    await stage(1);await page.locator('#lift').click();
    assert.equal(await page.locator('#packing').getAttribute('data-lift'),'free');
    assert.match(await page.locator('#lift-readout').innerText(),/CLI route still reaches its local body/);
    await page.waitForTimeout(650);
    await page.locator('.instrument').screenshot({path:path.join(root,'screenshots/03-lift.png')});
    await page.locator('#lift').click();assert.equal(await page.locator('#packing').getAttribute('data-lift'),'seated');
    await stage(2);await page.locator('#lift').click();
    assert.equal(await page.locator('#packing').getAttribute('data-lift'),'pinned');
    assert.match(await page.locator('#lift-readout').innerText(),/external tests/);
    assert.equal(await page.evaluate(()=>BOARD.state.lifted),false);
    await stage(0);assert(await page.locator('#lift').isDisabled());
  });
  await check('Rapid stage changes reset a partially lifted piece',async()=>{
    await stage(1);await page.locator('#lift').click();
    await page.locator('button[data-stage="2"]').click();await page.locator('button[data-stage="0"]').click();
    await page.waitForFunction(()=>BOARD.state.stage===0&&document.querySelector('#packing').getAttribute('aria-busy')==='false');
    assert.equal(await page.evaluate(()=>BOARD.state.lifted),false);
    assert.equal(await page.locator('#packing').getAttribute('data-lift'),'seated');
  });
  await check('Every visible cell opens the correct source family with keyboard or pointer',async()=>{
    for(const n of [1,2]){
      await stage(n);
      const cells=page.locator('.board-cell[tabindex="0"]');
      const count=await cells.count();assert.equal(count,n===1?14:11);
      for(let i=0;i<count;i++){
        await cells.nth(i).focus();await page.keyboard.press('Enter');
        assert((await page.locator('#cell-name').innerText()).length>5);
        await page.locator('#cell-evidence').click();
        assert(await page.locator('#source-dialog').isVisible());
        assert((await page.locator('#source-code').innerText()).length>40);
        await page.keyboard.press('Escape');await page.locator('#source-dialog').waitFor({state:'hidden'});
        assert.equal(await page.evaluate(()=>document.activeElement.id),'cell-evidence');
      }
    }
  });
  await check('Eight complete decisions, nonlinear descent, exact return and all source tabs',async()=>{
    assert.equal(await page.locator('#decision-register li').count(),8);
    assert.equal(await page.locator('#root-witnesses li').count(),10);
    const sourceIds=new Set();
    for(let i=0;i<8;i++){
      const button=page.locator('#decision-register .decision-title').nth(i);
      await button.click();
      assert.equal(await page.locator('#detail-position').innerText(),`${String(i+1).padStart(2,'0')} / 08`);
      const ids=await page.locator('#detail-sources button').evaluateAll(es=>es.map(x=>x.dataset.receipt));
      for(const id of ids){
        await page.locator(`#detail-sources [data-receipt="${id}"]`).click();
        const expected=await page.evaluate(id=>EVIDENCE.sources[id].path,id);
        assert.equal(await page.locator('#source-path').innerText(),expected);
        for(const key of await page.locator('[data-source-key]').evaluateAll(es=>es.map(e=>e.dataset.sourceKey))){
          await page.locator(`[data-source-key="${key}"]`).click();
          assert.match(await page.locator('#source-pin').innerText(),/[a-f0-9]{40}/);sourceIds.add(key);
        }
        await page.keyboard.press('Escape');await page.locator('#source-dialog').waitFor({state:'hidden'});
      }
      await page.locator('#detail-return').click();
      assert.equal(await page.evaluate(()=>document.activeElement.className),'decision-title');
    }
    assert(sourceIds.size>=30);
    assert.equal(await page.locator('.scenario-list li').count(),10);
    await page.locator('#complete').screenshot({path:path.join(root,'screenshots/06-complete-layer.png')});
  });
  await check('Linear detail arrows retain a complete record and source access',async()=>{
    await page.locator('[data-detail="staging"]').click();
    for(let i=1;i<8;i++){await page.locator('#detail-next').click();assert.equal(await page.locator('#detail-position').innerText(),`${String(i+1).padStart(2,'0')} / 08`);}
    assert(await page.locator('#detail-next').isDisabled());
    for(let i=6;i>=0;i--)await page.locator('#detail-prev').click();
    assert(await page.locator('#detail-prev').isDisabled());
  });
  await check('Browser Back restores the actual PR position',async()=>{
    await stage(0);await stage(1);await stage(2);
    await page.goBack();await page.waitForFunction(()=>BOARD.state.stage===1);
    await page.goBack();await page.waitForFunction(()=>BOARD.state.stage===0);
  });
  await check('Source dialog contains scrolling, supports Escape and restores focus',async()=>{
    await page.locator('[data-detail="surface"]').click();
    const trigger=page.locator('[data-receipt="policy-before"]');await trigger.click();
    await page.locator('#source-code').evaluate(e=>e.scrollTop=e.scrollHeight);
    assert((await page.locator('#source-code').evaluate(e=>e.scrollTop))>0);
    await page.screenshot({path:path.join(root,'screenshots/04-source.png')});
    await page.keyboard.press('Escape');await page.locator('#source-dialog').waitFor({state:'hidden'});assert.equal(await page.evaluate(()=>document.activeElement.dataset.receipt),'policy-before');
  });
  await check('All frozen source links exist and open locally',async()=>{
    const sources=await page.evaluate(()=>Object.keys(EVIDENCE.sources));
    const sourcePage=await context.newPage();
    for(const key of sources){
      await sourcePage.goto('file://'+path.join(root,'evidence',key+'.html'));
      assert((await sourcePage.locator('pre').innerText()).length>40);
      const local=JSON.parse(fs.readFileSync(path.join(root,'evidence/sources.json'),'utf8'))[key];
      assert.match(await sourcePage.locator('body').innerText(),new RegExp(local.hash));
    }
    await sourcePage.close();
  });
  await check('No text crosses its cell boundary in either piece',async()=>{
    await stage(2);
    const bad=await page.evaluate(()=>[...document.querySelectorAll('.board-cell')].flatMap(g=>{
      const rect=g.querySelector('rect').getBBox();return [...g.querySelectorAll('text')].filter(t=>{const b=t.getBBox();return b.x<rect.x||b.x+b.width>rect.x+rect.width||b.y<rect.y||b.y+b.height>rect.y+rect.height;}).map(t=>({cell:g.dataset.family,text:t.textContent}));
    }));assert.deepEqual(bad,[]);
  });
  await check('320 / 390 / 768 / 1440 px layouts have contained board scrolling and no page overflow',async()=>{
    for(const width of [320,390,768,1440]){
      await page.setViewportSize({width,height:width<600?844:1100});
      for(const n of [0,1,2]){
        await page.evaluate(n=>BOARD.setStage(n,{animate:false,historyEntry:false}),n);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`page overflow at ${width} / ${n}`);
      }
      await page.locator('[data-decision="testgap"]').click();
      assert(await page.locator('#source-dialog').evaluate(e=>e.getBoundingClientRect().width<=innerWidth));
      await page.keyboard.press('Escape');await page.locator('#source-dialog').waitFor({state:'hidden'});
      if(width===390){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(root,'screenshots/05-mobile.png')});}
    }
  });
  await check('Reduced motion preserves the facts and snaps to settled poses',async()=>{
    await page.emulateMedia({reducedMotion:'reduce'});
    await stage(1);await page.locator('#lift').click();assert.equal(await page.locator('#packing').getAttribute('data-lift'),'free');
    await stage(2);await page.locator('#lift').click();assert.equal(await page.locator('#packing').getAttribute('data-lift'),'pinned');
    assert.equal(await page.locator('#packing').getAttribute('aria-busy'),'false');
  });
  await check('No external requests, JavaScript errors or response storage',async()=>{
    assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
    assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  });
  const result={browser:'Isolated system Chrome through Playwright',opening:'file:// with offline:true',checks,errors,externalRequests:external};
  fs.writeFileSync(path.join(root,'verification-browser.json'),JSON.stringify(result,null,2)+'\n');
  await browser.close();console.log(JSON.stringify(result,null,2));
})().catch(error=>{console.error(error);process.exit(1)});
