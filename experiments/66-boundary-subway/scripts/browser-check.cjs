const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.SUBWAY_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');
const root=path.resolve(__dirname,'..'), entry=pathToFileURL(path.join(root,'index.html')).href;
const report={startedAt:new Date().toISOString(),browser:'system Chrome through Playwright',entry:'file:// index.html',checks:[],errors:[],externalRequests:[]};
const save=()=>fs.writeFileSync(path.join(root,'evidence/browser-checks.json'),JSON.stringify(report,null,2));
async function main(){
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('request',r=>{if(/^https?:/.test(r.url()))report.externalRequests.push(r.url());});
  await page.goto(entry);await page.waitForFunction(()=>window.subwayDebug);
  assert.equal(await page.locator('.notice').count(),8);
  assert.equal(await page.locator('.station').count(),5);
  const letters=await page.locator('.line-key .line-disc').allTextContents();assert.deepEqual(letters,['Q','R','X','L']);
  await page.screenshot({path:path.join(root,'screenshots/01-opening.png')});
  report.checks.push({name:'Direct file opening, complete notices, express view',passed:true});
  const symbolGaps=await page.evaluate(()=>[...document.querySelectorAll('.station')].map(n=>{const a=n.querySelector('.symbol').getBBox(),b=n.querySelector('.label').getBBox();return {id:n.dataset.station,gap:b.y-a.y-a.height};}));
  assert.ok(symbolGaps.every(g=>g.gap>=0),JSON.stringify(symbolGaps));
  report.checks.push({name:'Station glyph / label separation',passed:true,symbolGaps});
  for(const mode of ['express','local']){
    await page.locator(`[data-mode="${mode}"]`).click();
    for(const l of ['request','result','recovery','lifecycle','all']){
      await page.locator(`[data-line="${l}"]`).click();
      assert.equal(await page.locator(`[data-line="${l}"]`).getAttribute('aria-pressed'),'true');
      assert.equal(await page.evaluate(()=>subwayDebug.state.line),l);
      assert.ok(await page.locator('.station').count()>0);
    }
  }
  report.checks.push({name:'Both detail modes × all five line filters',passed:true});
  const stationIds=await page.evaluate(()=>SUBWAY.nodes.map(n=>n.id));
  for(const id of stationIds){
    await page.goto(entry+'#station='+id);
    await page.waitForFunction(id=>subwayDebug.state.selected===id,id);
    assert.equal(await page.locator('.station.active').getAttribute('data-station'),id);
    await page.locator('.station.active').focus();await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(()=>subwayDebug.state.selected),id);
  }
  report.checks.push({name:'All 16 stations: direct fragments and keyboard selection',passed:true});
  const journeys=await page.evaluate(()=>SUBWAY.journeys.map(j=>({id:j.id,steps:j.steps.map(s=>s[0])})));
  let stepCount=0;
  for(const j of journeys){
    await page.locator('#journey').selectOption(j.id);
    for(let i=0;i<j.steps.length;i++){
      await page.locator(`[data-step="${i}"]`).click();
      assert.equal(await page.locator('.station.active').getAttribute('data-station'),j.steps[i]);
      assert.equal(await page.locator('[aria-current="step"]').getAttribute('data-step'),String(i));
      const stepText=await page.locator('[role="status"]').innerText();assert.ok(stepText.length>10);
      stepCount++;
    }
    assert.equal(await page.locator('#next-step').isDisabled(),true);
    if(j.steps.length>1){await page.locator('#previous-step').click();assert.equal(await page.evaluate(()=>subwayDebug.state.step),j.steps.length-2);}
  }
  report.checks.push({name:'All ten source walks, every step and end boundary',passed:true,steps:stepCount});
  await page.locator('#journey').selectOption('reattach');
  await page.locator('[data-step="2"]').click();
  await page.locator('#network').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(root,'screenshots/03-accepted-reattachment.png')});
  await page.locator('#next-step').click();await page.goBack();
  assert.equal(await page.evaluate(()=>subwayDebug.state.step),2);
  await page.locator('#next-step').focus();await page.keyboard.press('ArrowLeft');
  assert.equal(await page.evaluate(()=>subwayDebug.state.step),1);
  await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(()=>subwayDebug.state.selected),'facade');
  report.checks.push({name:'History, keyboard journey traversal and Escape return',passed:true});
  const decisions=await page.evaluate(()=>SUBWAY.decisions.map(d=>({id:d.id,sources:d.sources})));
  const seen=new Set();
  for(const d of decisions){
    await page.locator(`#notice-${d.id} .notice-number`).click();
    assert.equal(await page.evaluate(()=>subwayDebug.state.decision),d.id);
    for(const id of d.sources){
      const sourceButton=page.locator(`#inspection [data-source="${id}"]`);
      await sourceButton.click();
      assert.equal(await page.locator('#source-dialog').evaluate(e=>e.open),true);
      assert.ok((await page.locator('#receipt-content pre').innerText()).length>20);
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(()=>document.activeElement.dataset.source),id);
      seen.add(id);
    }
    await page.locator(`#inspection a[href="#notice-${d.id}"]`).click();
    assert.ok((await page.locator(`#notice-${d.id}`).boundingBox()).y<page.viewportSize().height);
  }
  report.checks.push({name:'Eight notice exits and returns; every attached source opens, closes and restores focus',passed:true,uniqueReceipts:seen.size});
  await page.goto(entry+'#decision=tests');
  await page.locator('#inspection [data-source="test-changes"]').click();
  await page.screenshot({path:path.join(root,'screenshots/04-test-source.png')});
  await page.locator('#source-book-link').click();
  assert.equal(await page.locator('#source-test-changes').evaluate(e=>e.open),true);
  report.checks.push({name:'Source dialog → expanded offline source book',passed:true});
  await page.goto(entry);
  const before=await page.locator('#map>g').getAttribute('transform');
  await page.locator('#zoom-in').click();
  await page.waitForFunction(t=>document.querySelector('#map>g').getAttribute('transform')!==t,before);
  const zoomed=await page.locator('#map>g').getAttribute('transform');
  const r=await page.locator('#map').boundingBox();
  await page.mouse.move(r.x+55,r.y+55);await page.mouse.down();await page.mouse.move(r.x+105,r.y+90);await page.mouse.up();
  assert.notEqual(await page.locator('#map>g').getAttribute('transform'),zoomed);
  await page.locator('#map').focus();await page.keyboard.press('Home');
  await page.waitForFunction(t=>document.querySelector('#map>g').getAttribute('transform')===t,before);
  report.checks.push({name:'D3 zoom, pan and keyboard fit',passed:true});
  await page.locator('[data-mode="local"]').click();await page.locator('[data-line="recovery"]').click();
  await page.locator('#network').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'screenshots/02-recovery-line.png')});
  const viewports=[];
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});await page.goto(entry);
    await page.waitForFunction(()=>window.subwayDebug);
    let dimensions=await page.evaluate(()=>({body:document.documentElement.scrollWidth,viewport:innerWidth}));
    assert.ok(dimensions.body<=dimensions.viewport,JSON.stringify(dimensions));
    await page.locator('#journey').selectOption('fetch');await page.locator('[data-step="2"]').click();
    assert.equal(await page.locator('.station.active').getAttribute('data-station'),'delivery');
    dimensions=await page.evaluate(()=>({body:document.documentElement.scrollWidth,viewport:innerWidth}));
    assert.ok(dimensions.body<=dimensions.viewport);
    await page.locator('#inspection [data-source]').first().click();assert.equal(await page.locator('#source-dialog').evaluate(e=>e.open),true);
    await page.keyboard.press('Escape');
    viewports.push({width,overflow:false,journeyAndSource:true});
  }
  report.checks.push({name:'Responsive layouts and source interactions',passed:true,viewports});
  await page.setViewportSize({width:390,height:844});await page.goto(entry);await page.locator('#network').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'screenshots/05-mobile.png')});
  await page.locator('#journey').selectOption('fallback');await page.locator('[data-step="2"]').click();await page.screenshot({path:path.join(root,'screenshots/06-mobile-fallback.png'),fullPage:true});
  const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const fallback=await noJs.newPage();await fallback.goto(entry);
  assert.equal(await fallback.locator('.notice').count(),8);assert.equal(await fallback.locator('.source-details details').count(),58);
  assert.ok((await fallback.locator('#notice-replay').innerText()).includes('do not replay locally'));
  assert.ok(await fallback.locator('#source-retry summary').isVisible());await fallback.locator('#source-retry summary').click();assert.equal(await fallback.locator('#source-retry').getAttribute('open'),'');
  report.checks.push({name:'JavaScript-disabled complete layer and source book',passed:true});await noJs.close();
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);
  report.passed=true;report.finishedAt=new Date().toISOString();save();
  console.log(JSON.stringify({passed:true,groups:report.checks.length,steps:stepCount,receipts:seen.size,errors:report.errors,externalRequests:report.externalRequests}));
 }catch(e){report.passed=false;report.failure=String(e.stack);save();throw e;}finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
