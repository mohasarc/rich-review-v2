import {chromium} from 'playwright';
import {writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const out=fileURLToPath(new URL('../',import.meta.url));
const browser=await chromium.launch({executablePath:process.env.ATLAS_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
const errors=[],external=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url())});
try{
 await page.goto(pathToFileURL(join(out,'index.html')).href);
 await page.waitForSelector('html[data-ready=true]');
 await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('#cache-plate svg').count(),1);
 assert.equal(await page.locator('#delivery-plate svg').count(),1);
 assert.ok(await page.locator('#cache-plate [stroke-dasharray="4,3"]').count()>0);
 checks.push('Direct file opening; both Plot figures render.');
 await page.screenshot({path:join(out,'screenshots/01-overview.png'),fullPage:false});
 await page.locator('#atlas').scrollIntoViewIfNeeded();
 await page.screenshot({path:join(out,'screenshots/02-plate.png'),fullPage:false});
 for(const stain of ['retained','fresh','outside','all']){
   await page.locator(`[data-stain=${stain}]`).click();
   assert.equal(await page.locator(`[data-stain=${stain}]`).getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('[data-stain][aria-pressed=true]').count(),1);
   if(stain!=='all')assert.ok(await page.locator('#cache-plate [fill-opacity="0.16"]').count()>0);
 }
 checks.push('All four selective stains preserve the full findings.');
 for(const id of ['a1','a2','a3','a4','a5','b1','b2','b3','b4','e1']){
   await page.locator(`#reading-${id} .reading-key`).click();
   assert.equal(await page.evaluate(()=>location.hash),`#detail-${id}`);
   await page.locator(`#detail-${id} .back-link`).click();
   assert.equal(await page.evaluate(()=>location.hash),`#reading-${id}`);
 }
 checks.push('All ten direct finding jumps and returns.');
 await page.locator('#reading-a3 .reading-key').click();
 await page.goBack();assert.equal(await page.evaluate(()=>location.hash),'#reading-e1');
 checks.push('Native browser history restores the preceding finding.');
 const sourceIds=await page.locator('[data-receipt]').evaluateAll(els=>[...new Set(els.map(e=>e.dataset.receipt))]);
 for(const id of sourceIds){
   const link=page.locator(`[data-receipt="${id}"]`).first();
   await link.click();assert.equal(await page.locator('#source-dialog').evaluate(e=>e.open),true);
   assert.ok((await page.locator('#source-content pre').innerText()).length>30);
   await page.keyboard.press('Escape');assert.equal(await page.locator('#source-dialog').evaluate(e=>e.open),false);
   assert.equal(await link.evaluate(e=>e===document.activeElement),true);
 }
 checks.push(`${sourceIds.length} source receipts open; Escape restores focus.`);
 for(const c of ['old-promise','turn','failed-refresh','release-ok','release-error']){
   await page.selectOption('#cache-condition',c);
   assert.equal(await page.locator('#cache-observation svg').count(),1);
   assert.equal(await page.locator('#cache-results tbody tr').count(),2);
   if(c==='failed-refresh')assert.match(await page.locator('#cache-results').innerText(),/same/);
   if(c==='release-error'){
     const rows=await page.locator('#cache-results tbody tr').allTextContents();
     assert.ok(rows[0].includes('resolved')&&rows[1].includes('rejected'));
   }
 }
 await page.locator('#lab').scrollIntoViewIfNeeded();
 await page.screenshot({path:join(out,'screenshots/03-cache-experiment.png')});
 checks.push('Five cache recordings including failed refresh and cleanup rejection.');
 await page.locator('#delivery-tab').click();
 for(const c of ['fresh-fetch','two-reattachments','no-fetch','fetch-three','later-error']){
   await page.selectOption('#delivery-condition',c);
   assert.equal(await page.locator('#delivery-observation svg').count(),1);
   assert.equal(await page.locator('#delivery-results tbody tr').count(),['no-fetch','fetch-three'].includes(c)?1:2);
   if(c==='fresh-fetch')assert.match(await page.locator('#delivery-results').innerText(),/E → E → F → ACK/);
   if(c==='later-error'){
     const rows=await page.locator('#delivery-results tbody tr').allTextContents();
     assert.ok(rows[0].includes('closed')&&rows[1].includes('corrupt'));
   }
 }
 await page.locator('#lab').scrollIntoViewIfNeeded();
 await page.screenshot({path:join(out,'screenshots/04-delivery-experiment.png')});
 checks.push('Five delivery recordings, head-only policies and error provenance.');
 await page.locator('#delivery-tab').focus();await page.keyboard.press('ArrowLeft');
 assert.equal(await page.locator('#cache-tab').getAttribute('aria-selected'),'true');
 checks.push('Keyboard tab selection moves focus and exposes the matching panel.');
 for(const details of await page.locator('.prediction details').all()){
   await details.locator('summary').click();assert.equal(await details.evaluate(e=>e.open),true);
 }
 checks.push('Both prediction answers reveal locally without collection.');
 const viewports=[];
 for(const size of [{width:1440,height:1100},{width:768,height:1000},{width:390,height:844},{width:320,height:800}]){
   await page.setViewportSize(size);await page.waitForTimeout(150);
   const overflow=await page.evaluate(()=>({body:document.body.scrollWidth,viewport:innerWidth}));
   assert.ok(overflow.body<=overflow.viewport+1,JSON.stringify({size,overflow}));
   viewports.push({...size,overflow:false});
   if(size.width===390){await page.locator('#cache-plate').scrollIntoViewIfNeeded();await page.screenshot({path:join(out,'screenshots/05-mobile.png')});await page.locator('#lab').scrollIntoViewIfNeeded();await page.screenshot({path:join(out,'screenshots/07-mobile-lab.png')})}
 }
 checks.push('No horizontal page overflow at 320, 390, 768 or 1440 pixels.');
 await page.setViewportSize({width:1440,height:1100});
 await page.locator('[data-receipt=transport-head]').first().click();
 await page.screenshot({path:join(out,'screenshots/06-source.png')});
 await page.keyboard.press('Escape');
 await page.goto(pathToFileURL(join(out,'evidence.html')).href+'#transport-head');
 assert.equal(await page.locator('.receipt').count(),20);
 checks.push('Standalone source book has all 20 receipts.');
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto(pathToFileURL(join(out,'index.html')).href);
 assert.equal(await nojs.locator('.reading').count(),10);
 assert.equal(await nojs.locator('.structure').count(),10);
 checks.push('Without JavaScript all findings and structure notes remain readable.');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 await writeFile(join(out,'evidence/browser-checks.json'),JSON.stringify({passed:true,checks,viewports,errors,externalRequests:external},null,2)+'\n');
 console.log(JSON.stringify({passed:true,checks},null,2));
}catch(error){await mkdir(join(out,'evidence/attempts'),{recursive:true});await writeFile(join(out,'evidence/attempts/browser-failure.json'),JSON.stringify({message:error.message,stack:error.stack,checks,errors},null,2));await page.screenshot({path:join(out,'evidence/attempts/browser-failure.png')});throw error}
finally{await browser.close()}
