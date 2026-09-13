// Interaction checks use an isolated browser and only read the artifact.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const here=path.resolve(__dirname,'..');
const url=process.env.ORIGAMI_URL||'http://127.0.0.1:8478/';
const report={startedAt:new Date().toISOString(),checks:[],errors:[],externalRequests:[]};
let browser;
async function check(name,fn){const result=await fn();report.checks.push({name,passed:true,...(result||{})});}
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<.15,`${actual} != ${expected}`);

(async()=>{
 browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1080},deviceScaleFactor:1});
 const page=await context.newPage();
 page.on('pageerror',error=>report.errors.push(error.message));
 page.on('request',request=>{if(!request.url().startsWith(url)&&!request.url().startsWith('file:'))report.externalRequests.push(request.url());});
 await page.goto(url);
 await page.waitForFunction(()=>window.ORIGAMI_APP);
 const initialEdges=await page.locator('#edge-register').innerText();
 await page.evaluate(()=>window.originalHandles=[...document.querySelectorAll('.handle')]);
 await check('Three folds preserve the complete surface and the same six handle DOM objects',async()=>{
   for(const shape of ['pocket','accordion','gate']) {
     await page.locator(`button[data-shape="${shape}"]`).click();
     await page.waitForTimeout(950);
     assert.equal(await page.locator('#edge-register').innerText(),initialEdges);
     assert.equal(await page.locator('.handle').count(),6);
     assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.handle')].every((el,i)=>el===window.originalHandles[i])));
     const rotations=await page.evaluate(()=>({owner:gsap.getProperty('#ts-panel','rotationY'),entries:gsap.getProperty('.entry-leaf','rotationX')}));
     near(rotations.owner,shape==='pocket'?-42:0);
     near(rotations.entries,shape==='pocket'?15:143);
   }
 });
 await check('All six cleanup/revision comparisons match the captured return contract',async()=>{
   const returns=[];
   for(const build of ['base','head']) {
     await page.locator(`button[data-build="${build}"]`).click();
     for(const phase of ['held','resolve','reject']) {
       await page.locator(`button[data-phase="${phase}"]`).click();
       await page.waitForTimeout(950);
       const expected=build==='head'?(phase==='held'?'pending':phase==='reject'?'rejected':'fulfilled'):'fulfilled';
       assert.equal(await page.locator('#paper-return').innerText(),expected);
       const rotation=await page.evaluate(()=>gsap.getProperty('#ts-return','rotationX'));
       near(rotation,build==='head'&&phase==='held'?68:0);
       returns.push({build,phase,return:expected});
     }
   }
   return {observations:returns};
 });
 await check('Opening adds microprint while preserving the cleared-entry reading',async()=>{
   await page.locator('#openness').fill('100');
   assert.equal(await page.locator('#openness-value').innerText(),'100%');
   near(await page.evaluate(()=>gsap.getProperty('#ts-panel','rotationY')),0);
   near(await page.evaluate(()=>gsap.getProperty('.entry-leaf','rotationX')),0);
   assert.ok((await page.locator('.entry-front span').allTextContents()).every(t=>t==='∅'));
   assert.equal(await page.locator('.core-micro').evaluate(el=>getComputedStyle(el).opacity),'1');
   assert.ok(await page.locator('.entry-front span').evaluateAll(nodes=>nodes.every(node=>{
     const rect=node.getBoundingClientRect();
     return document.elementFromPoint(rect.x+rect.width/2,rect.y+rect.height/2)===node;
   })), 'Entry markers must remain above their backing paper when fully open');
   assert.equal(await page.locator('#edge-register').innerText(),initialEdges);
 });
 await page.emulateMedia({reducedMotion:'reduce'});
 await check('Every edge opens a matching mechanism; every source receipt opens and returns focus',async()=>{
   const counts={};
   for(const edge of ['ownership','values','turn','refresh','release','tests']) {
     await page.locator(`[data-edge="${edge}"]`).click();
     assert.equal(await page.locator('#detail').isVisible(),true);
     assert.ok((await page.locator('#detail-eyebrow').innerText()).includes('UNFOLDED EDGE'));
     await page.locator('#open-receipts').click();
     const options=await page.locator('#source-select option').count();
     counts[edge]=options;
     for(let i=0;i<options;i++) {
       await page.locator('#source-select').selectOption(String(i));
       assert.ok((await page.locator('#source-code').innerText()).trim().length>5);
       const raw=await page.locator('#source-raw').getAttribute('href');
       assert.equal((await context.request.get(new URL(raw,url).href)).status(),200);
     }
     await page.locator('#show-full').click();
     assert.equal(await page.locator('#show-full').innerText(),'Excerpt only');
     await page.keyboard.press('Escape');
     assert.equal(await page.locator('#source-dialog').isVisible(),false);
     assert.equal(await page.evaluate(()=>document.activeElement.id),'open-receipts');
     await page.locator('#close-detail').click();
     assert.equal(await page.evaluate(()=>document.activeElement.dataset.edge),edge);
   }
   return {receiptWindows:counts,total:Object.values(counts).reduce((a,b)=>a+b,0)};
 });
 await check('Sequential reading and return keep the selected edge',async()=>{
   await page.locator('[data-edge="ownership"]').click();
   assert.equal(await page.locator('#previous-edge').isDisabled(),true);
   for(let i=0;i<5;i++) await page.locator('#next-edge').click();
   assert.equal(await page.locator('#next-edge').isDisabled(),true);
   assert.ok((await page.locator('#detail-title').innerText()).includes('checked'));
   await page.locator('#previous-edge').click();
   assert.equal((await page.evaluate(()=>window.ORIGAMI_APP.getState())).edge,'release');
   await page.keyboard.press('Escape');
   assert.equal(await page.evaluate(()=>document.activeElement.dataset.edge),'release');
 });
 await check('URL reload and browser history restore shape, revision, cleanup, depth and edge',async()=>{
   await page.goto(url+'#fold=gate&rev=base&open=73&cleanup=reject&edge=release');
   const loaded=await page.evaluate(()=>window.ORIGAMI_APP.getState());
   assert.deepEqual(loaded,{shape:'gate',build:'base',phase:'reject',openness:73,edge:'release'});
   await page.locator('button[data-shape="pocket"]').click();
   await page.goBack();
   assert.equal((await page.evaluate(()=>window.ORIGAMI_APP.getState())).shape,'gate');
   await page.goForward();
   assert.equal((await page.evaluate(()=>window.ORIGAMI_APP.getState())).shape,'pocket');
 });
 await check('Native keyboard controls operate the fold buttons, slider and cleanup selector',async()=>{
   await page.locator('#reset').click();
   await page.locator('button[data-shape="accordion"]').focus();
   await page.keyboard.press('Enter');
   assert.equal((await page.evaluate(()=>window.ORIGAMI_APP.getState())).shape,'accordion');
   await page.locator('#openness').focus();
   await page.keyboard.press('End');
   assert.equal((await page.evaluate(()=>window.ORIGAMI_APP.getState())).openness,100);
   await page.keyboard.press('Home');
   assert.equal((await page.evaluate(()=>window.ORIGAMI_APP.getState())).openness,0);
 });
 await check('Rapid interruption settles to the requested pose',async()=>{
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.locator('button[data-shape="pocket"]').click();
   await page.locator('button[data-shape="gate"]').click();
   await page.locator('button[data-shape="accordion"]').click();
   await page.locator('button[data-shape="gate"]').click();
   await page.waitForTimeout(1100);
   near(await page.evaluate(()=>gsap.getProperty('#ts-panel','rotationY')),0);
   near(await page.evaluate(()=>gsap.getProperty('.entry-leaf','rotationX')),143);
 });
 await check('Reduced motion reaches the final geometry without a pending tween',async()=>{
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.locator('#reset').click();
   await page.locator('button[data-shape="gate"]').click();
   near(await page.evaluate(()=>gsap.getProperty('#ts-return','rotationX')),68);
   assert.equal(await page.evaluate(()=>gsap.isTweening('#ts-return')),false);
 });
 await check('320, 390, 768 and 1440 px layouts preserve controls, sources and page width',async()=>{
   const layouts=[];
   for(const width of [320,390,768,1440]) {
     await page.setViewportSize({width,height:width<600?844:1080});
     await page.locator('#reset').click();
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
     await page.locator('button[data-shape="gate"]').click();
     await page.locator('button[data-phase="reject"]').click();
     await page.locator('[data-edge="values"]').click();
     await page.locator('#open-receipts').click();
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
     assert.ok(await page.locator('#close-source').isVisible());
     await page.keyboard.press('Escape');
     await page.locator('#close-detail').click();
     layouts.push({width,overflow:false});
   }
   return {layouts};
 });
 await check('Direct file opening, no-JavaScript surface and print styles remain readable',async()=>{
   const file=await context.newPage();
   await file.goto('file://'+path.join(here,'index.html'));
   assert.equal(await file.locator('.handle').count(),6);
   await file.locator('button[data-shape="gate"]').click();
   assert.equal(await file.locator('#paper-return').innerText(),'pending');
   await file.close();
   const staticContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
   const staticPage=await staticContext.newPage();
   await staticPage.goto(url);
   assert.equal(await staticPage.locator('.edge-row').count(),6);
   assert.equal(await staticPage.locator('.noscript').isVisible(),true);
   assert.equal(await staticPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   await staticContext.close();
   await page.emulateMedia({media:'print'});
   assert.equal(await page.locator('.edge-row').count(),6);
   assert.equal(await page.locator('.stopping-edge').isVisible(),true);
   await page.emulateMedia({media:'screen'});
 });
 await check('Final screenshots captured at desktop and phone sizes',async()=>{
   await page.setViewportSize({width:1440,height:1080});
   await page.goto(url);await page.locator('#reset').click();
   await page.screenshot({path:path.join(here,'screenshots/01-pocket.png'),fullPage:true});
   await page.locator('button[data-shape="accordion"]').click();
   await page.screenshot({path:path.join(here,'screenshots/02-accordion.png')});
   await page.locator('button[data-shape="gate"]').click();
   await page.screenshot({path:path.join(here,'screenshots/03-gate-head.png')});
   await page.locator('button[data-build="base"]').click();
   await page.screenshot({path:path.join(here,'screenshots/04-gate-base.png')});
   await page.locator('#openness').fill('100');
   await page.screenshot({path:path.join(here,'screenshots/05-open.png')});
   await page.locator('[data-edge="release"]').click();
   await page.screenshot({path:path.join(here,'screenshots/06-release-mechanism.png')});
   await page.locator('#open-receipts').click();
   await page.locator('#source-select').selectOption('3');
   await page.screenshot({path:path.join(here,'screenshots/07-source.png')});
   await page.keyboard.press('Escape');
   await page.locator('#close-detail').click();
   await page.locator('#reset').click();
   await page.setViewportSize({width:390,height:844});
   await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:path.join(here,'screenshots/08-phone.png'),fullPage:true});
 });
 assert.deepEqual(report.errors,[]);
 assert.deepEqual(report.externalRequests,[]);
 report.complete=true;
 report.finishedAt=new Date().toISOString();
 fs.writeFileSync(path.join(here,'evidence/browser-checks.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
 await browser.close();
})().catch(async error=>{
 report.complete=false;report.failure=String(error.stack||error);
 fs.writeFileSync(path.join(here,'attempts/browser-check-failure.json'),JSON.stringify(report,null,2)+'\n');
 console.error(error);await browser?.close();process.exitCode=1;
});
