// Uses an isolated browser; never shares another agent's page or server.
const {chromium}=require(process.env.BENCH_PLAYWRIGHT || '/tmp/rich-review-05-browser/node_modules/playwright');
const {resolve}=require('node:path');
const {pathToFileURL}=require('node:url');
const {mkdirSync,writeFileSync}=require('node:fs');
const assert=require('node:assert/strict');
const here=__dirname;
const url=pathToFileURL(resolve(here,'index.html')).href;
const checks=[],errors=[],external=[];
const report=(name,details=true)=>checks.push({name,details});

(async()=>{
  mkdirSync(resolve(here,'screenshots'),{recursive:true});
  const browser=await chromium.launch({headless:true,channel:'chrome'});
  try {
    const context=await browser.newContext({viewport:{width:1440,height:1060},reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',e=>errors.push(String(e)));
    page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
    await page.goto(url);
    assert.equal(await page.locator('.decision').count(),12);
    assert.equal(await page.locator('.decision .status.unexplained').count(),5);
    assert.equal(await page.locator('.decision .status.stated').count(),7);
    assert.equal(await page.locator('input,textarea').count(),0);
    report('File protocol loads complete layer and all 12 decisions without a server');
    await page.screenshot({path:resolve(here,'screenshots/01-opening.png')});
    for(const n of Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0'))) {
      await page.locator(`#record-${n} h3 a`).click();
      assert.equal(new URL(page.url()).hash,'#detail-'+n);
      await page.locator(`#detail-${n} header>a`).click();
      assert.equal(new URL(page.url()).hash,'#record-'+n);
    }
    report('All 12 nonlinear descent and return links');
    const sourceCount=await page.locator('[data-source]').count();
    for(let i=0;i<sourceCount;i++) {
      const a=page.locator('[data-source]').nth(i);
      await a.click();
      assert.equal(await page.locator('#source-dialog').evaluate(el=>el.open),true);
      assert.ok((await page.locator('#source-code').textContent()).length>10);
      await page.keyboard.press('Escape');
      assert.equal(await a.evaluate(el=>el===document.activeElement),true);
    }
    report('Every source excerpt opens, Escape closes, trigger regains focus',sourceCount);

    await page.locator('#bench').scrollIntoViewIfNeeded();
    const slider=page.locator('#pull-control');
    const positions=()=>page.locator('.rail').evaluateAll(els=>Object.fromEntries(els.map(e=>[e.dataset.revision,Number(e.dataset.position)])));
    await slider.focus();
    await page.keyboard.press('End');
    await page.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=base]').dataset.position)>.95);
    const pulled=await positions();
    assert.ok(pulled.base>.95&&pulled.head<.5&&pulled.head>.4);
    assert.equal(await page.locator('#head-status').textContent(),'release pending');
    report('Full keyboard pull cannot cross the pending boundary',pulled);
    await page.locator('#instrument').screenshot({path:resolve(here,'screenshots/02-pull-held.png')});
    await page.keyboard.press('Home');
    await page.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)<.01);
    assert.ok((await positions()).base>.95);
    report('Releasing recoils only the pending head handle');

    for(const rebuild of [false,true]) for(const phase of ['fulfilled','rejected']) {
      await page.locator('#reset').click();
      if(rebuild) {
        await page.locator('#rebuild').click();
        assert.equal(await page.locator('.cache-slots i.filled').count(),2);
        assert.match(await page.locator('#search-count').textContent(),/base 2 · head 2/);
      }
      await page.locator(phase==='fulfilled'?'#finish':'#throw').click();
      assert.equal(await page.locator('#base-status').textContent(),'release fulfilled');
      assert.equal(await page.locator('#head-status').textContent(),'release '+phase);
      assert.equal(await page.locator('#error-message').isVisible(),phase==='rejected');
      assert.equal(await page.locator('#finish').isDisabled(),true);
      assert.equal(await page.locator('#throw').isDisabled(),true);
      assert.equal(await page.locator('#rebuild').isDisabled(),true);
      await page.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)>.95);
    }
    report('Four recorded outcome paths: fulfillment/failure with and without query rebuild');
    await page.locator('#bench').screenshot({path:resolve(here,'screenshots/03-cleanup-error.png'),style:'.mast{visibility:hidden!important}'});

    await page.locator('#reset').click();
    await slider.scrollIntoViewIfNeeded();
    const box=await slider.boundingBox();
    await page.mouse.move(box.x+24,box.y+24);
    await page.mouse.down();
    await page.mouse.move(box.x+box.width-25,box.y+24,{steps:12});
    await page.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)>.4);
    assert.equal(await slider.getAttribute('aria-valuenow'),'100');
    await page.mouse.up();
    await page.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)<.01);
    report('Real pointer drag and release, with pointer capture');

    // A real touch session exercises browser-managed pointer IDs.
    const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
    const mobile=await touch.newPage();
    mobile.on('pageerror',e=>errors.push(String(e)));
    await mobile.goto(url+'#bench');
    await mobile.locator('#pull-control').scrollIntoViewIfNeeded();
    const tb=await mobile.locator('#pull-control').boundingBox();
    const cdp=await touch.newCDPSession(mobile);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:tb.x+24,y:tb.y+24}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:tb.x+tb.width-24,y:tb.y+24}]});
    await mobile.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)>.4);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
    await mobile.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)<.01);
    report('Touch drag and touch cancellation release the spring');
    await mobile.locator('#instrument').screenshot({path:resolve(here,'screenshots/04-mobile-bench.png'),style:'.mast{visibility:hidden!important}'});
    await touch.close();

    for(const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:900});
      await page.goto(url+'#bench');
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      assert.equal(overflow,false,'overflow at '+width);
      await page.locator('#pull-all').click();
      await page.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)>.4);
      assert.ok((await positions()).head<.5);
    }
    report('No horizontal document overflow and working spring at 320/390/768/1440 px');
    await page.setViewportSize({width:320,height:900});
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.ok((await positions()).head<.5);
    report('Resize while pulling keeps both handles within the track');

    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const staticPage=await nojs.newPage();
    await staticPage.goto(url);
    assert.equal(await staticPage.locator('.decision').count(),12);
    assert.equal(await staticPage.locator('.mechanism').count(),12);
    await staticPage.locator('#record-08 h3 a').click();
    await staticPage.locator('#detail-08 .source-link').first().click();
    assert.ok(staticPage.url().includes('evidence.html#'));
    assert.equal(await staticPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    report('JavaScript-disabled reading, descent, and full source navigation');
    await nojs.close();
    const motion=await browser.newContext({viewport:{width:1100,height:1000},reducedMotion:'no-preference'});
    const movingPage=await motion.newPage();
    await movingPage.goto(url+'#bench');
    await movingPage.locator('#pull-all').click();
    await movingPage.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)>.4);
    await movingPage.locator('#let-go').click();
    await movingPage.waitForFunction(()=>Number(document.querySelector('.rail[data-revision=head]').dataset.position)<.01);
    await movingPage.emulateMedia({media:'print'});
    assert.equal(await movingPage.locator('#bench').isVisible(),false);
    assert.equal(await movingPage.locator('.decision').count(),12);
    report('Animated resistance/recoil without reduced-motion and complete printable records');
    await motion.close();
    assert.deepEqual(external,[]);
    assert.deepEqual(errors,[]);
    report('No external requests, no browser errors');
    await context.close();
    writeFileSync(resolve(here,'validation-browser.json'),JSON.stringify({checkedAt:new Date().toISOString(),entry:url,checks,errors,externalRequests:external},null,2)+'\n');
    console.log(JSON.stringify({checks:checks.length,errors,externalRequests:external}));
  } finally {await browser.close();}
})().catch(error=>{writeFileSync(resolve(here,'validation-browser-failure.json'),JSON.stringify({error:String(error),checks,errors,external},null,2));console.error(error);process.exitCode=1;});
