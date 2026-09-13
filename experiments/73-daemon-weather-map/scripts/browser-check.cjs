const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const report={started:new Date().toISOString(),checks:[],pageErrors:[],consoleErrors:[],externalRequests:[],screenshots:[]};
const check=(name,detail)=>report.checks.push({name,pass:true,...detail});
const main=async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.WEATHER_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();
 page.on('pageerror',e=>report.pageErrors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text());});
 page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1'))report.externalRequests.push(r.url());});
 const url='file://'+path.join(root,'index.html');
 const shot=async name=>{await page.screenshot({path:path.join(root,'screenshots',name),fullPage:false});report.screenshots.push(name);};
 try{
  await page.goto(url);
  await page.waitForFunction(()=>window.weatherMap&&document.querySelector('.station'));
  assert.equal(await page.title(),'Daemon weather map — The request stays');
  assert.equal(await page.locator('.bulletin').count(),6);
  assert.equal(await page.locator('.station:visible').count(),4);
  assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'true');
  check('Direct file opening; complete six-reading layer; four visible head owners; reduced-motion default');
  await shot('01-opening.png');

  await page.getByRole('button',{name:'Main before',exact:true}).click();
  assert.equal(await page.locator('.station:visible').count(),2);
  assert.match(await page.locator('#revision-note').innerText(),/Three share/);
  const line=await page.locator('#weather line[stroke-dasharray="5 5"]').getAttribute('x1');
  const mainFront=await page.locator('.clickable-zone path').first().getAttribute('d');
  await shot('02-main.png');
  await page.getByRole('button',{name:'#149 after',exact:true}).click();
  await page.waitForTimeout(30);
  assert.equal(await page.locator('#weather line[stroke-dasharray="5 5"]').getAttribute('x1'),line);
  assert.notEqual(await page.locator('.clickable-zone path').first().getAttribute('d'),mainFront);
  check('Main/head source concentrations change while process boundary stays fixed');

  for(const [condition,phrase] of [['fetch','Fetch the missing'],['reattach','Reattach the same'],['exhausted','Corruption ends'],['clear','Return the captured']]){
   await page.selectOption('#condition',condition);
   assert.match(await page.locator('#report-title').innerText(),new RegExp(phrase));
   await page.locator('#trace-condition').click();
   assert(await page.locator('#reading-dialog').isVisible());
   const id=await page.evaluate(()=>window.weatherMap.conditions[window.weatherMap.state.condition].reading);
   assert.match(page.url(),new RegExp('#reading/'+id+'$'));
   await page.keyboard.press('Escape');
   assert.equal(await page.evaluate(()=>document.activeElement.id),'trace-condition');
   if(condition==='exhausted'){
    assert.equal(await page.locator('#wind-result').getAttribute('marker-end'),null);
    await shot('03-exhausted-fetch.png');
   }
  }
  check('Four illustrative conditions, station-state labels, terminal flow cutoff and scenario-to-source navigation');

  let receiptCount=0;
  const ids=await page.evaluate(()=>window.weatherMap.data.readings.map(x=>x.id));
  for(const id of ids){
   await page.locator(`[data-reading="${id}"]`).click();
   assert.match(await page.locator('#reading-label').innerText(),/READING/);
   const n=await page.locator('#reading-content [data-receipt]').count();
   for(let i=0;i<n;i++){
    await page.locator('#reading-content [data-receipt]').nth(i).click();
    assert(await page.locator('#source-dialog').isVisible());
    const lines=await page.locator('#source-code .source-line').count();assert(lines>0);
    const excerpt=await page.locator('#source-code').innerText();assert(excerpt.trim().length>10);
    await page.locator('#full-source').click();
    assert((await page.locator('#source-code .source-line').count())>=lines);
    await page.locator('#full-source').click();
    assert.equal(await page.locator('#source-code').innerText(),excerpt);
    await page.keyboard.press('Escape');
    assert(await page.locator('#reading-dialog').isVisible());
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.receipt),`${id}:${i}`);
    receiptCount++;
   }
   await page.keyboard.press('Escape');
   assert.equal(await page.evaluate(()=>document.activeElement.dataset.reading),id);
  }
  check('All six readings and every receipt; full-source toggle, Escape, exact focus return',{receipts:receiptCount});

  await page.locator('[data-reading="ownership"]').click();
  for(let i=1;i<6;i++)await page.locator('#next-reading').click();
  assert.equal(await page.locator('#next-reading').isDisabled(),true);
  for(let i=1;i<6;i++)await page.locator('#previous-reading').click();
  assert.equal(await page.locator('#previous-reading').isDisabled(),true);
  await page.goBack();
  assert.match(await page.locator('#reading-label').innerText(),/READING 02/);
  await page.keyboard.press('Escape');
  await page.goto(url+'#reading/forecast');
  assert(await page.locator('#reading-dialog').isVisible());
  assert.match(await page.locator('#reading-title').innerText(),/unexplained calibration/);
  await page.keyboard.press('Escape');
  check('Linear Previous/Next, browser Back and direct reading fragments');

  const station=page.getByRole('button',{name:'Execution client, 1 selected role; inspect owner',exact:true});
  await station.focus();await page.keyboard.press('Enter');
  assert.match(await page.locator('.dialog-owner').innerText(),/DaemonExecutionClient/);
  await page.getByRole('button',{name:/Exact reattachment predicate/}).click();
  assert.match(await page.locator('#source-code').innerText(),/authenticatedInstanceId === request.instanceId/);
  await shot('04-source.png');
  await page.keyboard.press('Escape');await page.keyboard.press('Escape');
  assert.equal(await station.evaluate(el=>document.activeElement===el),true);
  check('SVG owner keyboard activation and receipt predicate');

  await page.locator('#zoom-in').click();await page.waitForTimeout(50);
  assert(await page.evaluate(()=>Number(document.querySelector('.weather-scene').getAttribute('transform').match(/scale\(([^)]+)/)[1]))>1);
  await page.locator('#zoom-fit').click();await page.waitForTimeout(50);
  assert.match(await page.locator('.weather-scene').getAttribute('transform'),/scale\(1\)/);
  check('D3 magnification and fit controls');

  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>document.querySelector('#motion-toggle').getAttribute('aria-pressed')==='false');
  assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'false');
  const v1=await page.locator('#wind-request').getAttribute('stroke-dashoffset');
  await page.waitForTimeout(170);
  assert.notEqual(await page.locator('#wind-request').getAttribute('stroke-dashoffset'),v1);
  await page.locator('#motion-toggle').click();
  const v2=await page.locator('#wind-request').getAttribute('stroke-dashoffset');
  await page.waitForTimeout(170);
  assert.equal(await page.locator('#wind-request').getAttribute('stroke-dashoffset'),v2);
  check('Motion runs; explicit pause stops it; system reduced-motion preference is respected');

  const layouts=[];
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:900});
   await page.evaluate(()=>window.scrollTo(0,0));
   const result=await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,viewport:document.querySelector('#weather').getBoundingClientRect().width}));
   assert(result.overflow<=1);layouts.push(result);
   await page.locator('[data-reading="fetch"]').click();
   const bounds=await page.locator('#reading-dialog').boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=width+1);
   await page.keyboard.press('Escape');
   if(width===390){await page.evaluate(()=>window.scrollTo(0,0));await shot('05-mobile.png');}
  }
  check('320 / 390 / 768 / 1440 layouts and dialogs without page overflow',{layouts});

  const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  const phone=await touch.newPage();await phone.goto(url);
  await phone.locator('#zoom-in').tap();await phone.waitForTimeout(40);
  await phone.locator('#zoom-in').tap();await phone.waitForTimeout(40);
  const scale=await phone.locator('.weather-scene').getAttribute('transform');assert(!/scale\(1\)$/.test(scale));
  await phone.locator('#trace-condition').tap();assert(await phone.locator('#reading-dialog').isVisible());
  await phone.getByRole('button',{name:'Close reading',exact:true}).tap();
  await phone.screenshot({path:path.join(root,'screenshots/06-mobile-magnified.png')});
  await touch.close();check('Touch magnification, condition descent and return');

  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:1200,height:900}});
  const staticPage=await noJS.newPage();await staticPage.goto(url);
  assert.equal(await staticPage.locator('.bulletin').count(),6);
  await staticPage.locator('.source-book summary').click();
  assert.equal(await staticPage.locator('.mechanism:visible').count(),6);
  await staticPage.locator('.mechanism .receipts a').first().click();assert.match(staticPage.url(),/main-transport.html#L137$/);
  await noJS.close();check('JavaScript-disabled complete layer, unrolled mechanisms and standalone source anchors');
  assert.equal(report.pageErrors.length,0);assert.equal(report.consoleErrors.length,0);assert.equal(report.externalRequests.length,0);
  check('No JavaScript errors, console errors or external runtime requests');
  report.finished=new Date().toISOString();report.passed=true;
 }catch(error){report.passed=false;report.error=error.stack;try{await page.screenshot({path:path.join(root,'evidence/browser-failure.png'),fullPage:true})}catch{};throw error;}
 finally{fs.writeFileSync(path.join(root,'evidence/browser-checks.json'),JSON.stringify(report,null,2)+'\n');await browser.close();}
};
main().then(()=>console.log(JSON.stringify({passed:report.passed,groups:report.checks.length,receipts:report.checks.find(c=>c.receipts)?.receipts}))).catch(error=>{console.error(error);process.exitCode=1;});
