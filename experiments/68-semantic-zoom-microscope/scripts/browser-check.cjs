const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.MICROSCOPE_PLAYWRIGHT || '/tmp/rich-review-05-browser/node_modules/playwright');
const out=path.resolve(__dirname,'..');
const entry=pathToFileURL(path.join(out,'index.html')).href;
const results=[], errors=[], remote=[];
const save=(name,data)=>results.push({name,...data});
const check=async(name,fn)=>{await fn();save(name,{passed:true});console.log('PASS '+name);};
(async()=>{
 const browser=await chromium.launch({channel:process.env.MICROSCOPE_CHROME_CHANNEL||'chrome',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  context.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url());});});
  const page=await context.newPage();
  const goto=async(id,level)=>{await page.evaluate(({id,level})=>microscope.navigate(id,level,{instant:true}),{id,level});};
  const state=()=>page.evaluate(()=>microscope.getState());
  await page.goto(entry);await page.waitForFunction(()=>window.microscope?.getState().width>0);
  await check('Direct-file opening and complete top layer',async()=>{
    assert.equal((await state()).level,0);assert.equal(await page.locator('[data-note]').count(),8);
    assert(await page.locator('.end-notes').textContent());
    assert.equal(await page.locator('#sample option').count(),17);
    assert.equal(await page.locator('.feature').count(),16);
    await page.screenshot({path:path.join(out,'screenshots/01-specimen.png')});
  });
  await check('Pointer descent through all four actual semantic levels',async()=>{
    await page.getByRole('button',{name:'Inspect Starting wins',exact:true}).click();assert.equal((await state()).level,1);
    await page.screenshot({path:path.join(out,'screenshots/02-box.png')});
    await page.getByRole('button',{name:'Inspect Starting wins',exact:true}).click();assert.equal((await state()).level,2);
    await page.screenshot({path:path.join(out,'screenshots/03-mechanism.png')});
    await page.locator('#next-depth').click();assert.equal((await state()).level,3);
    await page.screenshot({path:path.join(out,'screenshots/04-evidence.png')});
    await page.locator('#up').click();assert.equal((await state()).level,2);
    await page.keyboard.press('Escape');assert.equal((await state()).level,1);
    await page.keyboard.press('Home');assert.equal((await state()).level,0);
  });
  const features=await page.evaluate(()=>microscope.features);
  await check('All 16 fixed features at box, mechanism and evidence depth',async()=>{
    const original=await page.locator('.feature').evaluateAll(nodes=>nodes.map(n=>[n.dataset.feature,n.getAttribute('transform')]).sort());
    for(const f of features)for(const level of [1,2,3]){
      await goto(f.id,level);const current=await state();assert.equal(current.focus,f.id);assert.equal(current.level,level);
      assert(await page.locator(`.feature[data-feature="${f.id}"] .semantic-${level}`).isVisible());
      if(level>=2){
        const visible=await page.locator(`.semantic-${level}`).evaluateAll(nodes=>nodes.filter(n=>getComputedStyle(n).display!=='none').length);assert.equal(visible,1);
      }
    }
    const after=await page.locator('.feature').evaluateAll(nodes=>nodes.map(n=>[n.dataset.feature,n.getAttribute('transform')]).sort());assert.deepEqual(original,after);
  });
  await check('All 60 pinned source witness controls and camera-preserving dialogs',async()=>{
    let witnesses=0;
    for(const f of features){
      await goto(f.id,3);const camera=(await state()).transform;
      await page.locator('#open-receipt').click();assert(await page.locator('#receipt-dialog').isVisible());
      const count=await page.locator('#receipt-tabs button').count();
      for(let i=0;i<count;i++){
        await page.locator('#receipt-tabs button').nth(i).click();
        assert((await page.locator('#receipt-code').textContent()).trim().length>0);
        assert((await page.locator('#receipt-meta').textContent()).includes('SHA-256'));
        assert((await page.locator('#full-source').getAttribute('href')).includes('-L'));witnesses++;
      }
      await page.keyboard.press('Escape');assert.equal(await page.locator('#receipt-dialog').isVisible(),false);
      assert.deepEqual((await state()).transform,camera);
      assert.equal(await page.evaluate(()=>document.activeElement.id),'open-receipt');
    }
    assert.equal(witnesses,60);
  });
  await check('All 17 recorded inputs, effect counts and not-reached texture',async()=>{
    const rows=await page.evaluate(()=>RECORDINGS.rows);
    for(const row of rows){
      await page.locator('#sample').selectOption(row.id);
      for(const side of ['base','head'])for(const effect of ['read','observe','remove'])assert.equal(await page.locator(`#${side}-${effect}`).textContent(),String(row[side].effects[effect]));
      assert.equal(await page.locator('#result-kind').textContent(),row.head.route);
      const texture=await page.locator('.not-reached').evaluateAll(nodes=>nodes.map(n=>Number(n.getAttribute('opacity'))));
      texture.forEach((opacity,i)=>assert.equal(opacity>0,i+1>row.stop));
      await page.locator('#find-return').click();assert.equal((await state()).focus,await page.evaluate(id=>MICROSCOPE.sampleFeatures[id],row.id));
    }
    await page.locator('#sample').selectOption('pong-both');await page.locator('#find-return').click();await goto('pong-mismatch',2);
    await page.screenshot({path:path.join(out,'screenshots/05-pong-priority.png')});
  });
  await check('Wheel semantic thresholds and pointer-centered zoom',async()=>{
    await goto('starting',0);
    const frame=await page.locator('#stage').boundingBox();
    const t=(await state()).transform, f=features.find(f=>f.id==='starting');
    const point={x:t.x+t.k*f.x,y:t.y+t.k*f.y};
    await page.mouse.move(frame.x+point.x,frame.y+point.y);
    await page.evaluate(()=>document.querySelector('#stage').addEventListener('wheel',event=>{window.__wheelPoint=d3.pointer(event,document.querySelector('#stage'));},{capture:true,once:true}));
    await page.mouse.wheel(0,-450);await page.waitForTimeout(250);
    const actual=await page.evaluate(()=>window.__wheelPoint);
    const worldBefore={x:(actual[0]-t.x)/t.k,y:(actual[1]-t.y)/t.k};
    const after=(await state()).transform;
    assert.equal((await state()).level,1);
    assert(Math.abs((actual[0]-after.x)/after.k-worldBefore.x)<.001);
    assert(Math.abs((actual[1]-after.y)/after.k-worldBefore.y)<.001);
    await page.mouse.wheel(0,-450);await page.waitForTimeout(250);assert.equal((await state()).level,2);
    await page.mouse.wheel(0,-450);await page.waitForTimeout(250);assert.equal((await state()).level,3);
  });
  await check('Pan, keyboard, source scrolling, direct links and history',async()=>{
    await goto('starting',1);const t=(await state()).transform, frame=await page.locator('#stage').boundingBox();
    await page.mouse.move(frame.x+30,frame.y+100);await page.mouse.down();await page.mouse.move(frame.x+95,frame.y+140,{steps:6});await page.mouse.up();
    const p=(await state()).transform;assert.equal(p.k,t.k);assert(Math.abs(p.x-t.x)>50);
    await page.locator('#stage').focus();await page.keyboard.press('3');assert.equal((await state()).level,2);
    const before=(await state()).focus;await page.keyboard.press(']');assert.notEqual((await state()).focus,before);assert.equal((await state()).level,2);
    await goto('tests',3);
    const code=page.locator('.feature[data-feature="tests"] .micro-evidence');const codebox=await code.boundingBox();const beforeScroll=(await state()).transform;
    await page.mouse.move(codebox.x+codebox.width/2,codebox.y+codebox.height/2);await page.mouse.wheel(0,700);await page.waitForTimeout(200);
    assert(await code.evaluate(n=>n.scrollTop)>0);assert.deepEqual((await state()).transform,beforeScroll);
    await goto('starting',2);const url=page.url();await goto('exited',3);await page.goBack();assert.equal((await state()).focus,'starting');assert.equal((await state()).level,2);
    await page.reload();await page.waitForFunction(()=>window.microscope?.getState().width>0);assert.equal((await state()).focus,'starting');assert.equal((await state()).level,2);assert.equal(page.url(),url);
    await page.locator('[data-focus="dispatch"]').click();assert.equal((await state()).focus,'dispatch');assert.equal((await state()).level,1);
  });
  await check('Every top-layer jump has a route back to the specimen',async()=>{
    const ids=await page.locator('[data-focus]').evaluateAll(nodes=>nodes.map(n=>n.dataset.focus));
    for(const id of ids){await page.locator(`[data-focus="${id}"]`).click();assert.equal((await state()).focus,id);await page.locator('#home').click();assert.equal((await state()).level,0);}
  });
  await check('Receipt source-book navigation',async()=>{
    await goto('exited',3);await page.locator('#open-receipt').click();await page.screenshot({path:path.join(out,'screenshots/06-receipt.png')});
    const popupPromise=page.waitForEvent('popup');await page.locator('#full-source').click();const book=await popupPromise;await book.waitForLoadState();
    assert.equal(await book.locator(':target').count(),1);await book.close();await page.locator('#close-receipt').click();
  });
  await check('320, 390, 768, 1440 and 1920 px layouts and resize at depth',async()=>{
    for(const w of [320,390,768,1440,1920]){
      await page.setViewportSize({width:w,height:w<900?844:1000});await page.waitForTimeout(100);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'horizontal overflow '+w);
      assert.equal((await state()).level,3,'depth changed on resize '+w);
      await goto('starting',3);
      assert.equal((await state()).focus,'starting');assert.equal((await state()).level,3);
      const aperture=await page.locator('.feature[data-feature="starting"] .micro-evidence').boundingBox(), stage=await page.locator('#stage').boundingBox();
      assert(aperture.x>=stage.x-1 && aperture.x+aperture.width<=stage.x+stage.width+1,'clipped evidence '+w);
    }
    await page.setViewportSize({width:390,height:844});await page.waitForTimeout(100);await goto('starting',0);await page.screenshot({path:path.join(out,'screenshots/07-phone.png'),fullPage:true});
    await goto('starting',2);await page.locator('#open-receipt').click();await page.screenshot({path:path.join(out,'screenshots/08-phone-receipt.png')});await page.locator('#close-receipt').click();
  });
  await check('Touch pinch, drag and cancellation through D3',async()=>{
    const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const p=await touch.newPage();await p.goto(entry);await p.waitForFunction(()=>window.microscope?.getState().width>0);
    const cdp=await touch.newCDPSession(p), frame=await p.locator('#stage').boundingBox(), x=frame.x+frame.width/2,y=frame.y+frame.height/2;
    const before=await p.evaluate(()=>microscope.getState().transform.k);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-25,y,id:1},{x:x+25,y,id:2}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-70,y,id:1},{x:x+70,y,id:2}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    assert((await p.evaluate(()=>microscope.getState().transform.k))>before*2);
    const old=await p.evaluate(()=>microscope.getState().transform.x);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y:y-90,id:3}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+40,y:y-65,id:3}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
    assert.notEqual(await p.evaluate(()=>microscope.getState().transform.x),old);await touch.close();
  });
  await check('Ordinary-motion camera and JavaScript-disabled reading',async()=>{
    const motion=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const p=await motion.newPage();await p.goto(entry);await p.waitForFunction(()=>window.microscope?.getState().width>0);
    await p.locator('[data-level="2"]').click();await p.waitForTimeout(750);assert.equal(await p.evaluate(()=>microscope.getState().level),2);await motion.close();
    const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const nojs=await plain.newPage();await nojs.goto(entry);assert.equal(await nojs.locator('[data-note]').count(),8);assert(await nojs.locator('noscript').isVisible());assert.equal(await nojs.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await plain.close();
  });
  assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);
  fs.writeFileSync(path.join(out,'evidence/browser-checks.json'),JSON.stringify({entry:'index.html via file://',groups:results,pageErrors:errors,externalRequests:remote,scope:'Artifact interaction checks, not a human comprehension study.'},null,2)+'\n');
  console.log(`${results.length} groups passed; no page errors or external requests.`);
 }catch(error){
   fs.mkdirSync(path.join(out,'evidence/attempts'),{recursive:true});
    fs.writeFileSync(path.join(out,`evidence/attempts/browser-failure-${Date.now()}.json`),JSON.stringify({passed:results,error:String(error),stack:error.stack,pageErrors:errors},null,2)+'\n');throw error;
 }finally{await browser.close();}
})();
