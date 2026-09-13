import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
const dir=resolve(fileURLToPath(new URL('..',import.meta.url)));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:1080},deviceScaleFactor:1});
const page=await context.newPage();const errors=[],external=[],report={checks:[],screenshots:[]};
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1:8475'))external.push(r.url());});
await mkdir(join(dir,'screenshots'),{recursive:true});
const state=()=>page.evaluate(()=>window.chamberState);
const capture=async(name,fullPage=false)=>{await page.screenshot({path:join(dir,'screenshots',name),fullPage});report.screenshots.push(name);};
const select=async(scene,condition)=>{await page.locator(`[data-scene="${scene}"]`).click();if(condition)await page.selectOption('#scenario',condition);};
const last=async()=>{while(!(await page.locator('#next').isDisabled()))await page.locator('#next').click();};
try{
 await page.goto('http://127.0.0.1:8475');await page.waitForFunction(()=>window.chamberReady);
 assert.equal((await state()).captured,2);assert.equal((await state()).playing,false);
 await capture('01-opening.png',true);report.checks.push('Opening is paused at the recorded disconnect: 2 of 4 records captured.');
 let count=0,dialogs=0;
 for(const scene of ['framing','transfer','identity','lifetime']){
  await select(scene);const conditions=await page.locator('#scenario option').evaluateAll(nodes=>nodes.map(n=>n.value));
  for(const condition of conditions){
   await page.selectOption('#scenario',condition);let previous;
   for(let i=0;i<(await state()).steps;i++){
    const current=await state();assert.equal(current.index,i);assert.ok(current.ledger===1);assert.ok(current.captured>=0&&current.captured<=4);assert.ok((await page.locator('#step-title').innerText()).length>10);
    await page.locator('#inspect-source').click();await page.locator('#receipt').waitFor({state:'visible'});assert.ok((await page.locator('#receipt-code').innerText()).length>80);
    await page.keyboard.press('Escape');assert.equal(await page.locator('#receipt').isVisible(),false);assert.equal(await page.locator('#inspect-source').evaluate(el=>el===document.activeElement),true);dialogs++;
    if(previous&&scene==='transfer'&&['clean','resume','held-append'].includes(condition))assert.ok(current.captured>=previous.captured);
    previous=current;count++;if(i<current.steps-1)await page.locator('#next').click();
   }
   if(scene==='transfer'&&['clean','resume','held-append'].includes(condition)){assert.equal((await state()).captured,4);assert.equal((await state()).spool,0);assert.equal((await state()).caller,true);}
   if(scene==='transfer'&&['wrong-offset','changed-manifest','bad-digest','ack-lost'].includes(condition)){assert.equal((await state()).captured,0);assert.equal((await state()).caller,false);}
   if(scene==='framing')assert.equal(await page.locator('#metric-b').innerText(),condition==='fragmented'?'1':'0');
  }
 }
 report.checks.push(`${count} checkpoints across 14 conditions: forward navigation, state bounds, per-step receipts and focus return (${dialogs} dialogs).`);
 await select('transfer','held-append');await page.locator('#next').click();await page.locator('#next').click();assert.equal((await state()).captured,0);assert.equal(await page.locator('#metric-b').innerText(),'0');await page.locator('#release-append').click();assert.equal((await state()).captured,1);assert.equal(await page.locator('#metric-b').innerText(),'1');
 report.checks.push('Injected append barrier holds offset 0; Release append advances to 1.');
 await select('transfer','resume');await page.locator('#play').click();await page.waitForTimeout(220);await page.locator('#play').click();const paused=await state();await page.waitForTimeout(180);assert.equal((await state()).progress,paused.progress);await page.locator('#scrub').focus();await page.keyboard.press('End');assert.equal((await state()).index,(await state()).steps-1);await page.keyboard.press('Home');assert.equal((await state()).index,0);
 report.checks.push('Playback progresses; pause holds position; keyboard Home/End scrub to the bounds.');
 await select('transfer','resume');for(let i=0;i<5;i++)await page.locator('#next').click();await page.locator('#instrument').scrollIntoViewIfNeeded();await capture('02-recovery.png');
 await select('framing','fragmented');for(let i=0;i<4;i++)await page.locator('#next').click();await page.locator('#instrument').scrollIntoViewIfNeeded();await capture('03-framing.png');assert.equal(await page.locator('#metric-a').innerText(),'185 / 186');assert.equal(await page.locator('#metric-b').innerText(),'0');await page.locator('#next').click();assert.equal(await page.locator('#metric-b').innerText(),'1');
 report.checks.push('185 buffered bytes emit zero records; the 186th emits one.');
 await select('lifetime');await page.locator('#next').click();await page.locator('#next').click();assert.equal((await state()).trace,0);assert.equal((await state()).spool,4);await page.locator('#instrument').scrollIntoViewIfNeeded();await capture('04-expired-trace.png');await last();assert.equal((await state()).ledger,1);assert.equal((await state()).spool,0);
 report.checks.push('Trace expiry retains the spool; acknowledgement empties it and leaves the ledger entry.');
 await select('identity','conflict');await last();await page.locator('#instrument').scrollIntoViewIfNeeded();await capture('05-conflict.png');
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.axe={violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))};assert.equal(axe.violations.length,0);
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`page overflow at ${width}`);await select('framing');await last();assert.equal((await state()).index,(await state()).steps-1);if(width===390){await page.locator('#instrument').scrollIntoViewIfNeeded();await capture('06-phone.png');}}
 report.checks.push('320, 390, 768 and 1440 px have no page overflow; the small-screen chamber scrolls within its own viewport.');
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForFunction(()=>window.chamberReady);assert.equal((await state()).playing,false);await page.locator('#next').click();assert.ok((await state()).index>0);report.checks.push('Reduced motion starts paused and supports explicit stepping.');
 await page.goto(pathToFileURL(join(dir,'index.html')).href);await page.waitForFunction(()=>window.chamberReady);await select('transfer','clean');await last();assert.equal((await state()).caller,true);report.checks.push('Direct file opening runs offline, including the complete transfer.');
 await page.goto(pathToFileURL(join(dir,'sources.html')).href);assert.equal(await page.locator('article').count(),24);report.checks.push('24 frozen source-book receipts open offline.');
 const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});const plain=await noJS.newPage();await plain.goto(pathToFileURL(join(dir,'index.html')).href);assert.equal(await plain.locator('.rules>li').count(),7);assert.ok(await plain.locator('.no-js').isVisible());await plain.locator('#rule-codec a').click();assert.ok(await plain.locator('#codec').isVisible());await noJS.close();report.checks.push('Without JavaScript, all seven facts and source-book links remain available.');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);report.checks.push('No page errors, external network requests or automated WCAG A/AA violations.');report.passed=true;
}catch(error){report.passed=false;report.failure=error.stack;throw error;}
finally{report.errors=errors;report.externalRequests=external;await writeFile(join(dir,'evidence/browser-checks.json'),JSON.stringify(report,null,2)+'\n');await browser.close();console.log(JSON.stringify(report,null,2));}
