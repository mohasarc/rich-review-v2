const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
const out=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(out,'src/data.json'),'utf8'));
const url=pathToFileURL(path.join(out,'index.html')).href;
const checks=[],errors=[],requests=[];
const report={started:new Date().toISOString(),entry:url,checks,errors,externalRequests:requests};
const check=(name,details)=>{checks.push({name,pass:true,details});console.log('PASS '+name);};
const snapshot=(page,name)=>page.screenshot({path:path.join(out,'screenshots',name),fullPage:false});
let browser;
(async()=>{
 browser=await chromium.launch({headless:true,executablePath:process.env.TERRAIN_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--enable-unsafe-swiftshader']});
 const context=await browser.newContext({viewport:{width:1440,height:1080},reducedMotion:'reduce'});
 const page=await context.newPage();page.setDefaultTimeout(6000);
 page.on('pageerror',e=>errors.push(String(e)));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 await page.goto(url);await page.waitForFunction(()=>window.terrainAudit?.().ready);
 const audit=await page.evaluate(()=>window.terrainAudit());
 assert.equal(audit.readerCount,17);assert.equal(audit.receiptCount,71);
 for(const p of audit.peaks)assert.ok(Math.abs(p.renderedAltitude-p.count)<1e-8,p.id+' summit height');
 await snapshot(page,'01-opening.png');
 check('Offline entry and literal summit heights',audit.peaks);

 let receiptCount=0;
 for(const record of data.records){
   await page.locator('.survey-name[data-select="'+record.id+'"]').click();
   assert.equal(await page.locator('#inspector').getAttribute('data-selection'),record.id);
   assert.deepEqual(await page.locator('.peak-label.selected').evaluateAll(es=>es.map(e=>e.dataset.peak)),data.peaks.some(p=>p.id===record.id)?[record.id]:[]);
   assert.deepEqual(await page.locator('.fault-label.selected').evaluateAll(es=>es.map(e=>e.dataset.fault)),record.kind==='fault'?[record.id]:[]);
   assert.ok((await page.locator('#reading').innerText()).includes(record.title));
   for(let i=0;i<record.receipts.length;i++){
     const r=record.receipts[i],button=page.locator('[data-receipt="'+i+'"]');
     await button.click();assert.equal(await page.locator('#receipt').evaluate(e=>e.open),true);
     const doc=data.sources[r.source];
     assert.equal(await page.locator('#source-code [data-line="'+r.line+'"]').innerText(),r.line+doc.text.split('\n')[r.line-1]);
     assert.ok((await page.locator('#receipt-meta').innerText()).includes(doc.sha));
     await page.keyboard.press('Escape');
     assert.equal(await button.evaluate(e=>document.activeElement===e),true);
     receiptCount++;
   }
 }
 check('Every survey entry, every source receipt, Escape focus return',{readings:data.records.length,receipts:receiptCount});

 let sourceFileVisits=0;
 for(const peak of data.peaks){
   await page.locator('.survey-name[data-select="'+peak.id+'"]').click();
   assert.equal(await page.locator('[data-file]').count(),peak.files.length);
   for(const file of peak.files){
     const button=page.locator('[data-file="'+file+'"]');await button.hover();
     const expected=data.peaks.filter(p=>p.files.includes(file)).map(p=>p.id).sort();
     const lit=await page.locator('.peak-label:not(.muted)').evaluateAll(es=>es.map(e=>e.dataset.peak).sort());assert.deepEqual(lit,expected);
     await button.click();
     const access=page.locator('#access-select');
     const n=await access.locator('option').count();
     assert.ok((await button.getAttribute('aria-label')).endsWith(n+' access locations'));
     if(n>1)await access.selectOption({index:n-1});
     const line=Number(await access.inputValue());assert.ok(await page.locator('#source-code [data-line="'+line+'"].marked').count());
     const excerpt=await page.locator('#source-code .source-line').count();await page.locator('#full-source').click();
     assert.ok(await page.locator('#source-code .source-line').count()>excerpt);
     await page.locator('#close-receipt').click();sourceFileVisits++;
   }
 }
 check('Every measured reader opens source and highlights its other regions',{visits:sourceFileVisits});

 for(const link of data.links){
   await page.locator('.survey-name[data-select="'+link.source+'"]').click();
   await page.locator('[data-overlap="'+link.target+'"]').click();
   assert.deepEqual((await page.evaluate(()=>window.terrainAudit())).pair,[link.source,link.target]);
   assert.deepEqual(await page.locator('.peak-label.selected').evaluateAll(es=>es.map(e=>e.dataset.peak).sort()),[link.source,link.target].sort());
   const shared=await page.locator('[data-file]').evaluateAll(es=>es.map(e=>e.dataset.file).sort());assert.deepEqual(shared,[...link.files].sort());
 }
 check('All overlaps retain exact shared-file membership',{overlaps:data.links.length});
 await page.locator('.survey-name[data-select="startup"]').click();await page.locator('[data-overlap="shutdown"]').click();
 await page.locator('#atlas').scrollIntoViewIfNeeded();await snapshot(page,'02-shared-saddle.png');
 await page.locator('[data-file="apps/cli/src/daemon/daemon-startup-coordinator.ts"]').click();
 const accessSections=await page.locator('#access-select option').allTextContents();
 assert.ok(accessSections.some(x=>x.startsWith('startup'))&&accessSections.some(x=>x.startsWith('shutdown')));
 await snapshot(page,'03-exact-access.png');
 const sourceURL=new URL(await page.locator('#source-link').getAttribute('href'),url).href;
 const sourcePage=await context.newPage();await sourcePage.goto(sourceURL);
 assert.equal(await sourcePage.locator(':target').count(),1);await sourcePage.close();
 await page.keyboard.press('Escape');check('Shared saddle reaches both sections and a standalone source line',{sourceURL});

 await page.locator('.survey-name[data-select="error"]').click();await page.locator('#atlas').scrollIntoViewIfNeeded();
 await snapshot(page,'04-error-fault.png');
 await page.locator('#plan').click();assert.equal((await page.evaluate(()=>window.terrainAudit())).view,'plan');
 await page.locator('#boundary').click();assert.equal(await page.locator('#boundary-note').isVisible(),true);
 await snapshot(page,'05-boundary-plan.png');await page.locator('#boundary').click();
 await page.locator('#coupling').click();assert.equal(await page.locator('.saddle-label:visible').count(),0);
 await page.locator('#coupling').click();assert.equal(await page.locator('.saddle-label:visible').count(),6);
 await page.locator('#relief').click();
 const canvas=await page.locator('#viewport canvas').boundingBox();
 const before=await page.evaluate(()=>window.terrainAudit().camera);
 await page.mouse.move(canvas.x+45,canvas.y+90);await page.mouse.down();await page.mouse.move(canvas.x+120,canvas.y+140,{steps:6});await page.mouse.up();
 assert.notDeepEqual((await page.evaluate(()=>window.terrainAudit())).camera.position,before.position);
 await page.mouse.move(canvas.x+35,canvas.y+50);await page.mouse.wheel(0,-220);
 await page.waitForFunction(()=>window.terrainAudit().camera.zoom>1);
 await page.locator('#home').click();assert.equal((await page.evaluate(()=>window.terrainAudit())).camera.zoom,1);
 check('Relief, plan, moved boundary, coupling overlay, drag, zoom and Fit');

 for(const r of data.records.filter(x=>x.kind==='fault')){
   await page.locator('[data-fault="'+r.id+'"]').click();assert.equal((await page.evaluate(()=>window.terrainAudit())).selection,r.id);
 }
 await page.locator('[data-peak="transport"]').focus();await page.keyboard.press('Enter');
 assert.equal((await page.evaluate(()=>window.terrainAudit())).selection,'transport');
 await page.locator('#next').click();assert.equal((await page.evaluate(()=>window.terrainAudit())).selection,'delivery');
 await page.goBack();assert.equal((await page.evaluate(()=>window.terrainAudit())).selection,'transport');
 await page.keyboard.press('Escape');assert.equal((await page.evaluate(()=>window.terrainAudit())).selection,'output');
 check('Fault picking, keyboard peak activation, sequential traversal, browser Back and Escape');

 const layouts=[];
 for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:width<768?844:1080});await page.locator('#home').click();
   const result=await page.evaluate(()=>{
     const map=document.getElementById('viewport').getBoundingClientRect();
     const boxes=[...document.querySelectorAll('.peak-label')].map(e=>({id:e.dataset.peak,r:e.getBoundingClientRect()}));
     const overlaps=[];for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
       const a=boxes[i].r,b=boxes[j].r;if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)overlaps.push([boxes[i].id,boxes[j].id]);
     }
     return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,overlaps,clipped:boxes.filter(({r})=>r.left<map.left||r.right>map.right||r.top<map.top||r.bottom>map.bottom).map(x=>x.id)};
   });
   assert.equal(result.overflow,false);assert.deepEqual(result.clipped,[]);assert.deepEqual(result.overlaps,[]);layouts.push(result);
   if(width===390){
     await page.locator('#atlas').scrollIntoViewIfNeeded();await snapshot(page,'06-phone-terrain.png');
     await page.locator('[data-peak="output"]').click();await page.locator('#read-selection').click();
     assert.ok((await page.locator('#inspector').boundingBox()).y<30);
     await page.locator('[data-file]').first().click();await snapshot(page,'07-phone-source.png');await page.keyboard.press('Escape');
     await page.locator('.return-map').click();
   }
 }
 check('Responsive layouts and mobile map-to-source return',layouts);

 await page.goto(url+'#validation');assert.equal((await page.evaluate(()=>window.terrainAudit())).selection,'validation');
 await page.goto(url+'#startup~shutdown');assert.deepEqual((await page.evaluate(()=>window.terrainAudit())).pair,['startup','shutdown']);
 await page.locator('#sourcebook summary').click();assert.equal(await page.locator('#sourcebook section').count(),13);
 check('Direct region/saddle links and the linear source book');

 const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const plain=await noJS.newPage();await plain.goto(url);assert.equal(await plain.locator('.survey-row').count(),13);
 await plain.locator('.survey-name[data-select="validation"]').click();assert.equal(await plain.locator('#sourcebook').evaluate(e=>e.open),true);
 await plain.locator('#reading-validation a').first().click();assert.ok((await plain.title()).includes('daemon-navigation-worker.ts'));
 await noJS.close();check('No-JavaScript survey, native detail anchor and exact source');

 const fallbackContext=await browser.newContext({viewport:{width:390,height:844}});
 await fallbackContext.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return /webgl/.test(kind)?null:original.call(this,kind,...args);};});
 const fallback=await fallbackContext.newPage();await fallback.goto(url);
 assert.equal(await fallback.locator('#fallback').isVisible(),true);assert.equal(await fallback.locator('.survey-row').count(),13);
 await fallback.locator('[data-file]').first().click();assert.equal(await fallback.locator('#receipt').evaluate(e=>e.open),true);
 await fallbackContext.close();check('WebGL unavailable: reader inspector and receipts still work');

 const touchContext=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
 const touch=await touchContext.newPage();await touch.goto(url);await touch.locator('[data-peak="delivery"]').tap();
 assert.equal((await touch.evaluate(()=>window.terrainAudit())).selection,'delivery');await touch.locator('#read-selection').tap();
 await touch.locator('[data-receipt="0"]').tap();assert.equal(await touch.locator('#receipt').evaluate(e=>e.open),true);
 await touchContext.close();check('Touch peak, Read jump and source receipt');
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);check('No page/console errors or external runtime requests');
 report.finished=new Date().toISOString();report.passed=true;
 fs.writeFileSync(path.join(out,'evidence/browser-checks.json'),JSON.stringify(report,null,2));
 await browser.close();
})().catch(async error=>{
 report.passed=false;report.failure=String(error.stack||error);
 fs.writeFileSync(path.join(out,'evidence/attempts/browser-failure-'+Date.now()+'.json'),JSON.stringify(report,null,2));
 console.error(error);if(browser)await browser.close();process.exitCode=1;
});
