import {chromium} from 'playwright-core';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const url=pathToFileURL(resolve(root,'index.html')).href;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const results={started:new Date().toISOString(),entry:url,checks:[],errors:[],externalRequests:[],viewports:[]};
const context=await browser.newContext({viewport:{width:1440,height:1050},reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',e=>results.errors.push(e.message));
page.on('request',r=>{if(/^https?:/.test(r.url()))results.externalRequests.push(r.url());});
const mark=(name,detail)=>results.checks.push({name,passed:true,detail});
mkdirSync(resolve(root,'screenshots'),{recursive:true});
try {
 await page.goto(url);await page.waitForFunction(()=>typeof window.glassView==='function');
 assert.equal(await page.locator('.decision-record').count(),14);
 assert.equal(await page.locator('.pane').count(),11);
 await page.screenshot({path:resolve(root,'screenshots/01-opening.png')});
 mark('offline load and complete layer',{records:14,panes:11});
 const panes=await page.locator('.pane').evaluateAll(ns=>ns.map(n=>({id:n.dataset.pane,material:n.dataset.material})));
 for(const p of panes){await page.locator('#pane-'+p.id).click();assert.equal((await page.evaluate(()=>window.glassView())).selected,p.id);assert.equal(await page.locator('#pane-'+p.id).getAttribute('aria-pressed'),'true');}
 mark('all glass selections and readouts',panes.map(p=>p.id));
 for(const material of ['all','output','resources','transport','startup','shutdown','diagnostics','delivery']){
  await page.locator('button[data-light="'+material+'"]').click();
  assert.equal((await page.evaluate(()=>window.glassView())).light,material);
  assert.equal(await page.locator('.pane.dimmed').count(),material==='all'?0:panes.filter(p=>p.material!==material).length);
 }
 await page.locator('button[data-light="transport"]').click();await page.screenshot({path:resolve(root,'screenshots/02-transport-light.png')});
 await page.locator('button[data-light="all"]').click();
 mark('all eight material filters');
 await page.locator('button[data-revision="base"]').click();
 assert.equal(await page.locator('.head-cracks').isVisible(),false);
 assert.equal(await page.locator('.base-hatch').first().evaluate(e=>getComputedStyle(e).opacity),'1');
 await page.screenshot({path:resolve(root,'screenshots/03-before.png')});
 await page.locator('button[data-revision="head"]').click();assert(await page.locator('.head-cracks').isVisible());
 mark('base and head boundary treatments');
 await page.locator('#pane-status').focus();await page.keyboard.press('Enter');assert.equal((await page.evaluate(()=>window.glassView())).selected,'status');
 await page.keyboard.press('ArrowRight');assert.equal((await page.evaluate(()=>window.glassView())).selected,'ordinary');
 await page.keyboard.press('Space');assert.equal(await page.locator('#pane-ordinary').getAttribute('aria-pressed'),'true');
 await page.goBack();assert.equal((await page.evaluate(()=>window.glassView())).selected,'status');
 await page.goto(url+'#glass=fetch&light=delivery&rev=base');await page.waitForFunction(()=>window.glassView().selected==='fetch');
 assert.deepEqual(await page.evaluate(()=>{const {selected,light,revision}=window.glassView();return {selected,light,revision};}),{selected:'fetch',light:'delivery',revision:'base'});
 mark('keyboard selection, history and direct view links');
 await page.goto(url);
 for(const id of ['04','09','08']){await page.locator(`[data-crack="${id}"] a`).click();assert.equal(new URL(page.url()).hash,'#decision-'+id);const b=await page.locator('#decision-'+id).boundingBox();assert(b.y>=0&&b.y<1050);}
 mark('all three crack jumps');
 const ids=Array.from({length:14},(_,i)=>String(i+1).padStart(2,'0'));
 for(const id of ids){await page.locator('#decision-'+id+' h3 a').click();assert.equal(new URL(page.url()).hash,'#detail-'+id);await page.locator('#detail-'+id+' .back-link').click();assert.equal(new URL(page.url()).hash,'#decision-'+id);}
 mark('all fourteen descent and exact return anchors');
 const sources=await page.locator('[data-receipt]').evaluateAll(ns=>ns.map(n=>n.dataset.receipt));
 for(const id of sources){const link=page.locator(`[data-receipt="${id}"]`).first();await link.click();assert(await page.locator('#source-dialog').isVisible());assert((await page.locator('#source-code').innerText()).trim().length>0);await page.keyboard.press('Escape');assert.equal(await page.locator('#source-dialog').isVisible(),false);assert(await link.evaluate(e=>document.activeElement===e));}
 mark('all source disclosures, Escape and restored focus',{links:sources.length});
 await page.locator('[data-receipt="E06-3"]').click();await page.screenshot({path:resolve(root,'screenshots/04-source.png')});await page.locator('#close-source').click();
 for(let i=0;i<4;i++){await page.locator(`[data-step="${i}"]`).click();assert.equal(await page.locator(`[data-step="${i}"]`).getAttribute('aria-pressed'),'true');}
 assert.equal(await page.locator('#attempt-one strong').innerText(),'0');await page.locator('#detail-07').scrollIntoViewIfNeeded();await page.screenshot({path:resolve(root,'screenshots/05-scope-recording.png')});
 mark('recorded request playback: all four steps');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:width<=390?844:1050});await page.goto(url);
  const metrics=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,panes:document.querySelectorAll('.pane').length}));
  assert(metrics.document<=width+1,JSON.stringify(metrics));
  await page.locator('#pane-status').click();assert.equal((await page.evaluate(()=>window.glassView())).selected,'status');
  await page.locator('#inspect-cut').click();await page.locator('[data-receipt="E06-3"]').click();
  const box=await page.locator('#source-dialog').boundingBox();assert(box.width<=width);
  await page.keyboard.press('Escape');
  await page.goto(url);await page.screenshot({path:resolve(root,`screenshots/${width===390?'06-phone':width===320?'07-narrow':width===768?'08-tablet':'09-desktop'} .png`.replace(' .png','.png'))});
  results.viewports.push(metrics);
 }
 mark('four viewport layouts, pane interaction and source dialogs',results.viewports);
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(url);await page.locator('button[data-light="delivery"]').click();await page.waitForTimeout(260);assert.equal(await page.locator('.pane.dimmed').count(),9);
 await page.emulateMedia({media:'print',reducedMotion:'reduce'});assert.equal(await page.locator('.decision-record').count(),14);await page.emulateMedia({media:'screen'});
 mark('ordinary/reduced motion and print media');
 await page.goto(pathToFileURL(resolve(root,'evidence.html')).href+'#E06-3');assert.equal(await page.locator('.source-excerpt').count(),68);assert.equal(await page.locator('.file-diff').count(),60);await page.locator('.file-diff summary').first().click();assert(await page.locator('.file-diff').first().getAttribute('open')!==null);
 mark('standalone evidence: 68 excerpts and 60 file diffs');
 const touch=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844},reducedMotion:'reduce'});const tapped=await touch.newPage();await tapped.goto(url);await tapped.bringToFront();await tapped.locator('#pane-ordinary').tap();assert.equal((await tapped.evaluate(()=>window.glassView())).selected,'ordinary');await tapped.locator('button[data-light="delivery"]').tap();assert.equal((await tapped.evaluate(()=>window.glassView())).light,'delivery');await touch.close();mark('phone touch selection and material filtering');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},reducedMotion:'reduce'});const plain=await nojs.newPage();await plain.goto(url);await plain.bringToFront();assert.equal(await plain.locator('.decision-record').count(),14);await plain.locator('#decision-06 h3 a').click();await plain.locator('[data-receipt="E06-3"]').click();assert(new URL(plain.url()).pathname.endsWith('/evidence.html'));assert.equal(new URL(plain.url()).hash,'#E06-3');await nojs.close();
 mark('JavaScript-disabled decision reading and source links');
 assert.equal(results.errors.length,0);assert.equal(results.externalRequests.length,0);mark('no browser errors or external requests');
 results.passed=true;
} catch(error) {results.passed=false;results.failure=error.stack;await page.screenshot({path:resolve(root,'screenshots/check-failure.png')});throw error;}
finally {results.finished=new Date().toISOString();writeFileSync(resolve(root,'evidence/browser-checks.json'),JSON.stringify(results,null,2)+'\n');await browser.close();}
console.log(JSON.stringify(results,null,2));
