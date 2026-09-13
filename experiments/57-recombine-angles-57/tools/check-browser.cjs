const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('/tmp/rich-review-05-browser/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const rows = JSON.parse(fs.readFileSync(path.join(root,'row-manifest.json'))).rows;
const url = pathToFileURL(path.join(root,'index.html')).href;
const report = {checkedAt:new Date().toISOString(),scope:'Local artifact behavior, not source execution or learning',checks:[],errors:[],externalRequests:[]};
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  context.on('page',page=>{
   page.on('pageerror',e=>report.errors.push(String(e)));
   page.on('request',r=>{if(/^https?:/.test(r.url()))report.externalRequests.push(r.url())});
  });
  const page=await context.newPage();
  await page.goto(url);
  assert.equal(await page.locator('table').count(),1);
  assert.equal(await page.locator('[data-row]:visible').count(),15);
  fs.mkdirSync(path.join(root,'screenshots'),{recursive:true});
  await page.screenshot({path:path.join(root,'screenshots','01-opening.png')});
  for(const width of [1440,1100,768,390,320]){
   await page.setViewportSize({width,height:1000});
   const d=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,rows:[...document.querySelectorAll('[data-row]')].filter(x=>!x.hidden).length}));
   assert.ok(d.scroll<=width+1,JSON.stringify(d));assert.equal(d.rows,15);
   report.checks.push({layout:width,...d});
   if(width===390)await page.screenshot({path:path.join(root,'screenshots','02-mobile.png')});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#witnessed').check();
  const flagged=rows.filter(r=>r.r4.length).map(r=>r.row_anchor);
  assert.deepEqual(await page.locator('[data-row]:visible').evaluateAll(x=>x.map(e=>e.id)),flagged);
  await page.locator('#search').fill('no_such_phrase_57');
  assert.equal(await page.locator('[data-row]:visible').count(),0);await page.locator('#no-results').isVisible();
  await page.locator('#reset').click();assert.equal(await page.locator('[data-row]:visible').count(),15);
  await page.locator('#search').fill('257');assert.ok((await page.locator('[data-row]:visible').count())>0);
  // A direct finding link reveals its destination even when an active filter hid it.
  await page.evaluate(()=>location.hash='r18');
  await page.waitForTimeout(50);
  assert.equal(await page.locator('[data-row]:visible').count(),15);
  await page.waitForFunction(()=>document.activeElement.id==='r18');
  report.checks.push({filter:'text search, witnessed-only, zero result, reset and hidden-row hash return'});
  // Verify every row's first actual receipt navigation and its specific return link.
  for(const row of rows){
   await page.goto(url+'#'+row.row_anchor);
   await page.locator('#'+row.row_anchor+' .receipt-link').first().click();
   assert.ok(page.url().includes('receipts.html?from='+row.row_anchor));
   assert.equal(await page.locator('table').count(),0);
   await page.locator('[data-return]').click();
   assert.ok(page.url().endsWith('#'+row.row_anchor));
   await page.waitForFunction(id=>document.activeElement.id===id,row.row_anchor);
  }
  report.checks.push({roundTrips:15,focusRestored:true});
  await page.goto(url+'#r27');await page.screenshot({path:path.join(root,'screenshots','03-test-row.png')});
  await page.locator('#r27 .receipt-link').first().click();
  await page.locator('#tests .source-quote a').first().click();
  assert.ok(page.url().includes('source-pages/base-old-worker-test.html#L369'));
  await page.goBack();assert.ok(page.url().includes('receipts.html'));
  await page.screenshot({path:path.join(root,'screenshots','04-receipt.png')});
  report.checks.push({sourceLineRoundTrip:'base old worker test L369'});
  await page.goto(url);
  await page.locator('#search').fill('257');
  await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('[data-row]:visible').count(),15);
  await page.emulateMedia({media:'screen'});
  report.checks.push({print:'all rows even while filtered'});
  // Earlier entry anchors are checked in the browser; 23 uses generated DOM/hash routing.
  for(const row of rows){
   const [file,hash]=row.file.split('#');
   await page.goto(pathToFileURL(path.join(path.dirname(root),file)).href+(hash?'#'+hash:''));
   await page.waitForTimeout(550);
   if(hash){
    const present=await page.evaluate(id=>!!document.getElementById(id)||!!document.querySelector(`[data-node="${id}"]`)||(id==='root'&&document.querySelector('#current-label')?.textContent==='The complete outline'),hash);
    report.checks.push({original:row.id,hash,targetPresent:present});assert.ok(present,row.id+' '+hash);
   }
  }
  await context.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:1000}});
  const staticPage=await nojs.newPage();await staticPage.goto(url);
  assert.equal(await staticPage.locator('[data-row]:visible').count(),15);
  assert.equal(await staticPage.locator('[data-filters]').isVisible(),false);
  await staticPage.locator('#r12 .receipt-link').first().click();
  assert.equal(await staticPage.locator('#policy').count(),1);
  await staticPage.locator('#policy .returns a[href="index.html#r12"]').first().click();
  assert.ok(staticPage.url().endsWith('#r12'));
  report.checks.push({javascriptDisabled:'complete table and source return links readable'});
  await nojs.close();
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);
 } catch(e) { report.failure=String(e);throw e; }
 finally {fs.writeFileSync(path.join(root,'browser-checks.json'),JSON.stringify(report,null,2)+'\n');await browser.close();}
 console.log(JSON.stringify(report,null,2));
})();
