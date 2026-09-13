import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const url=pathToFileURL(resolve(root,'index.html')).href;
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
const checks=[],errors=[],external=[];
const watch=p=>{p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});};
watch(page);
const state=p=>p.locator('body').getAttribute('data-state');
const jump=(p,s)=>p.locator(`[data-jump="${s}"]`).click();
async function check(name,fn){await fn();checks.push({name,passed:true});console.log('PASS',name);}
try{
await page.goto(url);
await check('direct-file opening and seven-stage single-step path',async()=>{
  assert.equal(await state(page),'point');
  for(const expected of ['drag','predict','hold','holding','compare','say']){await page.locator('#primary').click();assert.equal(await state(page),expected);}
  assert.equal(await page.locator('#model-answer').isVisible(),false);
  await page.locator('#primary').click();assert.equal(await page.locator('#model-answer').isVisible(),true);
  await page.locator('#primary').click();assert.equal(await page.locator('#model-answer').isVisible(),false);
  await page.locator('#restart').click();assert.equal(await state(page),'point');
  await page.screenshot({path:resolve(root,'screenshots/01-opening.png')});
});
await check('pointer acquisition, missed drop return, and duplicate reference',async()=>{
  await page.locator('#key').click();assert.equal(await state(page),'drag');
  let a=await page.locator('#drag-token').boundingBox();
  await page.mouse.move(a.x+a.width/2,a.y+a.height/2);await page.mouse.down();await page.mouse.move(a.x-40,a.y+80,{steps:8});await page.mouse.up();
  await page.waitForTimeout(260);assert.equal(await state(page),'drag');
  a=await page.locator('#drag-token').boundingBox();const target=await page.locator('#caller-zone').boundingBox();
  await page.mouse.move(a.x+a.width/2,a.y+a.height/2);await page.mouse.down();await page.mouse.move(target.x+target.width/2,target.y+target.height/2,{steps:15});
  assert.match(await page.locator('#cache-token').innerText(),/P/);
  await page.mouse.up();assert.equal(await state(page),'predict');
  assert.match(await page.locator('#lookup-caption').innerText(),/P₀/);assert.match(await page.locator('#caller-caption').innerText(),/P₀/);
});
await check('physical hold crosses clear; release outside settles old work only',async()=>{
  await page.locator('#primary').click();assert.equal(await state(page),'hold');
  const r=await page.locator('#held-token').boundingBox();
  await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();
  assert.equal(await state(page),'holding');assert.match(await page.locator('#lookup-caption').innerText(),/P₁/);assert.match(await page.locator('#caller-caption').innerText(),/pending/);
  await page.waitForTimeout(320);await page.screenshot({path:resolve(root,'screenshots/02-holding.png')});
  await page.mouse.move(20,20);await page.mouse.up();assert.equal(await state(page),'compare');
  assert.match(await page.locator('#caller-caption').innerText(),/fulfilled/);assert.match(await page.locator('#lookup-caption').innerText(),/P₁/);
  await page.screenshot({path:resolve(root,'screenshots/03-compare.png')});
});
await check('keyboard path, key-repeat hold and escape cancellation',async()=>{
  await jump(page,'point');await page.locator('#primary').focus();
  for(const expected of ['drag','predict','hold']){await page.keyboard.press('Enter');assert.equal(await state(page),expected);}
  await page.locator('#held-token').focus();await page.keyboard.down('Space');assert.equal(await state(page),'holding');
  await page.keyboard.down('Space');assert.equal(await state(page),'holding');
  await page.keyboard.up('Space');assert.equal(await state(page),'compare');
  await jump(page,'hold');await page.locator('#held-token').focus();await page.keyboard.down('Enter');await page.keyboard.press('Escape');await page.keyboard.up('Enter');
  assert.equal(await state(page),'holding');await page.locator('#primary').click();assert.equal(await state(page),'compare');
});
await check('all source receipts open, scroll, close and restore exact focus',async()=>{
  const links=page.locator('.decision-register a[data-receipt]');
  const done=new Set();
  for(let i=0;i<await links.count();i++){
    const link=links.nth(i),id=await link.getAttribute('data-receipt');if(done.has(id))continue;done.add(id);
    await link.click();assert.equal(await page.locator('#source-dialog').isVisible(),true);
    assert.ok((await page.locator('#source-content').innerText()).length>60);
    await page.keyboard.press('Escape');assert.equal(await page.locator('#source-dialog').isVisible(),false);
    assert.equal(await link.evaluate(el=>document.activeElement===el),true);
  }
  assert.equal(done.size,23);
});
await check('source book and browser Back preserve a working ritual',async()=>{
  await jump(page,'predict');await page.locator('.evidence-link').first().click();assert.match(page.url(),/sources.html/);
  assert.equal(await page.locator('.source-section').count(),23);
  await page.goBack();await page.locator('#primary').click();
  assert.ok(['drag','hold'].includes(await state(page)));
});
await check('every stage fits 320, 390, 768, 1024 and 1440 px layouts',async()=>{
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    for(const s of ['point','drag','predict','hold','holding','compare','say']){
      await jump(page,s);assert.equal(await state(page),s);
      const geometry=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,clipped:[...document.querySelectorAll('.command,.steps button,.handle,.box-heading,.decision h3')].filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.className)}));
      assert.ok(geometry.scroll<=geometry.width,JSON.stringify({width,s,...geometry}));assert.deepEqual(geometry.clipped,[],JSON.stringify({width,s,...geometry}));
    }
  }
});
await check('reduced motion and accessibility checks at initial and held stages',async()=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const s of ['point','holding','say']){
    await jump(page,s);await page.addScriptTag({path:resolve(root,'node_modules/axe-core/axe.min.js')});
    const audit=await page.evaluate(async()=>{const a=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));});
    assert.deepEqual(audit,[],JSON.stringify(audit));
  }
  await page.setViewportSize({width:390,height:844});await jump(page,'holding');await page.locator('#ritual').scrollIntoViewIfNeeded();
  await page.screenshot({path:resolve(root,'screenshots/04-mobile.png'),fullPage:false});
  await page.setViewportSize({width:1440,height:1000});await jump(page,'say');await page.locator('#primary').click();
  await page.locator('#ritual').scrollIntoViewIfNeeded();await page.screenshot({path:resolve(root,'screenshots/05-say-it-back.png')});
});
await check('touch drag, hold and touch cancellation',async()=>{
  const c=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await c.newPage();watch(p);await p.goto(url);
  const client=await c.newCDPSession(p);
  const touch=(type,x,y)=>client.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'||type==='touchCancel'?[]:[{x,y}]});
  await p.locator('#key').tap();let a=await p.locator('#drag-token').boundingBox(),d=await p.locator('#caller-zone').boundingBox();
  const x=a.x+a.width/2,y=a.y+a.height/2,tx=d.x+d.width/2,ty=d.y+d.height/2;
  await touch('touchStart',x,y);for(let j=1;j<=12;j++)await touch('touchMove',x+(tx-x)*j/12,y+(ty-y)*j/12);await touch('touchEnd');assert.equal(await state(p),'predict');
  await jump(p,'hold');a=await p.locator('#held-token').boundingBox();
  await touch('touchStart',a.x+a.width/2,a.y+a.height/2);assert.equal(await state(p),'holding');await touch('touchCancel');assert.equal(await state(p),'holding');
  await p.locator('#primary').tap();assert.equal(await state(p),'compare');
  await jump(p,'hold');a=await p.locator('#held-token').boundingBox();await touch('touchStart',a.x+a.width/2,a.y+a.height/2);await touch('touchEnd');assert.equal(await state(p),'compare');
  await c.close();
});
await check('JavaScript-disabled reading and no persisted responses',async()=>{
  const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const p=await c.newPage();watch(p);await p.goto(url);
  assert.equal(await p.locator('.decision').count(),8);assert.equal(await p.locator('noscript').isVisible(),true);
  await p.locator('.decision-register a').first().click();assert.match(p.url(),/sources.html#handles/);await c.close();
  assert.deepEqual(await context.cookies(),[]);
  assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  const source=await readFile(resolve(root,'src/app.js'),'utf8');assert.doesNotMatch(source,/localStorage|sessionStorage|indexedDB|document\.cookie|fetch\(|sendBeacon|MediaRecorder|getUserMedia/);
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
});
await writeFile(resolve(root,'validation-browser.json'),JSON.stringify({passed:true,checks,pageErrors:errors,externalRequests:external,engine:'system Chrome via Playwright',entry:'direct file://',accessibility:'axe-core WCAG 2 A/AA + 2.1 AA; not a human assistive-technology study'},null,2)+'\n');
}catch(error){
  await writeFile(resolve(root,'validation-browser-failure.json'),JSON.stringify({passed:false,checks,error:String(error),stack:error.stack,pageErrors:errors,externalRequests:external},null,2)+'\n');
  throw error;
}finally{await browser.close();}
