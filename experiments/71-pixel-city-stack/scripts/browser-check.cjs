const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.CITY_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');
const ROOT=path.resolve(__dirname,'..'),url=process.env.CITY_URL||pathToFileURL(path.join(ROOT,'index.html')).href;
const report={url,checks:[],errors:[],externalRequests:[],screenshots:[]};
const save=()=>fs.writeFileSync(path.join(ROOT,'evidence/browser-checks.json'),JSON.stringify(report,null,2)+'\n');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CITY_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1080},deviceScaleFactor:1,reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url()))report.externalRequests.push(r.url());});
 const check=(name,data=true)=>{report.checks.push({name,passed:true,data});console.log('PASS',name);};
 const screenshot=async name=>{await page.screenshot({path:path.join(ROOT,'screenshots',name)});report.screenshots.push(name);};
 const step=async n=>{await page.locator(`#milestones button[data-index="${n}"]`).click();await page.waitForFunction(n=>CITY_APP.state.step===n,n);};
 const state=()=>page.evaluate(()=>CITY_APP.state);
 const pick=async p=>{await page.locator('#search').fill(p);const id=await page.evaluate(p=>CITY_DATA.files.find(f=>f.path===p).id,p);await page.locator('#file-picker').selectOption(String(id));return id;};
 const top=async()=>page.evaluate(()=>scrollTo(0,0));
 try{
  await page.goto(url);await page.waitForFunction(()=>window.CITY_APP?.renderInfo.ready&&CITY_APP.renderInfo.frameNo>0);
  assert.equal((await state()).step,25);check('Direct offline opening with WebGL');
  await screenshot('01-staged-city.png');
  const selected=(await state()).file;
  const all=[];
  for(let n=0;n<=26;n++){
   await step(n);const s=await state();assert.equal(s.file,selected);
   const info=await page.evaluate(()=>({r:CITY_APP.renderInfo,expected:CITY_DATA.snapshots[CITY_APP.state.step].filter(s=>s[0]||s[5]).length}));
   assert.equal(info.r.meshVisible,info.expected);assert(info.r.roadRoutes.every(r=>r.points>1));all.push({step:n,standing:info.r.standing,removed:info.r.removed,road:info.r.roadRoutes});
  }
  check('Every skyline; persistent selection; all source roads routed',all);
  await top();await screenshot('02-cutover-city.png');
  await page.click('#trace-road');await page.waitForTimeout(100);assert.equal((await state()).trace,true);await screenshot('03-cutover-road.png');
  await page.click('#trace-road');
  await step(25);
  const worker='packages/daemon/src/worker/navigation-worker.test.ts';await pick(worker);await page.click('#road-toggle');
  let r=await page.evaluate(()=>CITY_APP.renderInfo);assert.equal(r.movedRoadCount,1);assert(r.roadRoutes[0].points>1);
  await page.click('#counterpart');assert.equal(await page.locator('.block-path').textContent(),'apps/cli/src/daemon/daemon-navigation-worker.test.ts');
  assert((await page.locator('#block-details').textContent()).includes('Removed · foundation'));
  await page.click('#file-receipt');await page.waitForFunction(()=>document.querySelector('#receipt-content').textContent.includes('does not exist'));
  await page.click('#show-diff');await page.waitForFunction(()=>document.querySelector('#receipt-content').textContent.includes('deleted file mode'));
  await page.keyboard.press('Escape');assert.equal(await page.locator('#receipt').evaluate(d=>d.open),false);assert.equal(await page.evaluate(()=>document.activeElement.id),'file-receipt');
  check('Selected rename road, counterpart foundation, deletion receipt and focus return');
  await page.click('#counterpart');await page.click('#file-receipt');await page.waitForFunction(()=>document.querySelector('#receipt-content').textContent.includes('generic executor module'));
  await page.click('#show-diff');await page.waitForFunction(()=>document.querySelector('#receipt-content').textContent.includes('diff --git'));
  await page.keyboard.press('Escape');
  await page.locator('#reading-tests summary').click();await page.click('#worker-patch');
  assert((await page.locator('#receipt-content').textContent()).includes('startupDurations'));
  assert((await page.locator('#receipt-content').textContent()).includes('Restore CLI executor version rejection oracle'));
  await screenshot('04-test-change-receipt.png');await page.keyboard.press('Escape');
  check('Moved source receipt plus removed timing and restored host-test patch');
  for(const id of ['portable','leaf','host','split','stage','cutover','tests']){
   await page.click(`[data-reading-receipt="${id}"]`);assert(await page.locator('#receipt').evaluate(d=>d.open));assert.equal(await page.locator('.receipt-tabs').isVisible(),false);await page.keyboard.press('Escape');
   assert.equal(await page.evaluate(()=>document.activeElement.dataset.readingReceipt),id);
   await page.click(`[data-reading-step="${id}"]`);assert.equal((await state()).reading,id);
  }
  check('All seven nonlinear reading jumps and reason returns');
  const sourceLinks=await page.locator('[data-source-path]').evaluateAll(bs=>bs.map(b=>({path:b.dataset.sourcePath,step:Number(b.dataset.sourceStep)})));
  for(const link of sourceLinks){
   const b=page.locator(`[data-source-path="${link.path}"][data-source-step="${link.step}"]`).first();
   await b.locator('xpath=ancestor::details').evaluate(d=>d.open=true);await b.click();
   await page.waitForFunction(()=>!document.querySelector('#receipt-content').textContent.startsWith('Loading'));
   assert(!(await page.locator('#receipt-content').textContent()).includes('could not be loaded'));
   await page.keyboard.press('Escape');
  }
  check('Every authored source entrance loads offline',sourceLinks.length);
  await page.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=false));
  await step(24);await step(25);await page.goBack();assert.equal((await state()).step,24);await page.goForward();assert.equal((await state()).step,25);check('Browser Back and Forward preserve skyline');
  await page.locator('#city').focus();await page.keyboard.press('Home');assert.equal((await state()).step,0);await page.keyboard.press('End');assert.equal((await state()).step,26);await page.keyboard.press('ArrowLeft');assert.equal((await state()).step,25);check('Keyboard skyline navigation');
  await page.click('#fit');await top();
  const original=await page.evaluate(()=>CITY_APP.project(CITY_APP.state.file));await page.click('[data-role="test"]');assert.equal((await state()).role,'test');const filtered=await page.evaluate(()=>CITY_APP.project(CITY_APP.state.file));assert(Math.abs(original.x-filtered.x)<1);await page.click('[data-role="all"]');
  await page.click('#zoom-in');assert((await page.evaluate(()=>CITY_APP.renderInfo.zoom))>1);await page.click('#fit');assert.equal(await page.evaluate(()=>CITY_APP.renderInfo.zoom),1);
  await page.click('#road-toggle'); // active source road again
  const ids=await page.evaluate(()=>CITY_DATA.files.filter(f=>f.district==='renderer'&&CITY_DATA.snapshots[25][f.id][0]).map(f=>f.id));
  const point=await page.evaluate(id=>CITY_APP.project(id),ids[0]);await page.mouse.click(point.x,point.y);assert((await state()).file!==null);
  const selectedPath=await page.evaluate(()=>CITY_DATA.files[CITY_APP.state.file].path);assert.equal(await page.locator('.block-path').textContent(),selectedPath);
  const before=await page.evaluate(()=>CITY_APP.project(CITY_APP.state.file));const rect=await page.locator('#city').boundingBox();
  await page.mouse.move(rect.x+35,rect.y+75);await page.mouse.down();await page.mouse.move(rect.x+85,rect.y+95,{steps:6});await page.mouse.up();await page.waitForTimeout(80);
  const after=await page.evaluate(()=>CITY_APP.project(CITY_APP.state.file));assert(Math.hypot(before.x-after.x,before.y-after.y)>10);
  await page.click('#fit');check('Role filter, zoom, pixel picking and drag-to-pan');
  await step(0);await page.click('#play');await page.waitForFunction(()=>CITY_APP.state.step>=1,null,{timeout:5000});await page.click('#play');const paused=(await state()).step;await page.waitForTimeout(1600);assert.equal((await state()).step,paused);check('Playback grows and pauses');
  for(const w of [320,390,768,1440]){
   await page.setViewportSize({width:w,height:900});await step(26);await page.click('#fit');await top();await page.waitForTimeout(60);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   await pick('packages/daemon/src/client/daemon-client.ts');await page.click('#file-receipt');await page.waitForFunction(()=>document.querySelector('#receipt-content').textContent.includes('DaemonClientRuntimeLoader'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.keyboard.press('Escape');
   if(w===390){await top();await screenshot('05-phone-city.png');}
  }
  check('320 / 390 / 768 / 1440 px page and source-dialog layouts');
  await page.setViewportSize({width:1440,height:1080});await page.emulateMedia({reducedMotion:'no-preference'});await step(24);await page.waitForTimeout(650);await step(25);await page.waitForTimeout(700);
  const frameNo=await page.evaluate(()=>CITY_APP.renderInfo.frameNo);await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>CITY_APP.renderInfo.frameNo),frameNo);check('Ordinary animation settles; no continuous rendering while idle');
  const link=url+'#skyline=26&file='+await page.evaluate(()=>CITY_DATA.files.find(f=>f.path==='apps/cli/src/cli-invocation-coordinator.ts').id);
  const deep=await browser.newPage({viewport:{width:1200,height:900}});await deep.goto(link);await deep.waitForFunction(()=>window.CITY_APP?.state.step===26);assert.equal(await deep.locator('.block-name').textContent(),'cli-invocation-coordinator.ts');await deep.close();check('Direct skyline and block URL');
  const touch=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1});await touch.goto(url);await touch.waitForFunction(()=>window.CITY_APP?.renderInfo.ready);
  await touch.locator('#next').tap();assert.equal(await touch.evaluate(()=>CITY_APP.state.step),26);await touch.locator('#zoom-in').tap();assert((await touch.evaluate(()=>CITY_APP.renderInfo.zoom))>1);await touch.locator('#fit').tap();await touch.close();check('Touch skyline and camera controls');
  const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:1100,height:900}});await nojs.goto(url);assert.equal(await nojs.locator('.reading').count(),7);assert(await nojs.locator('.no-script').isVisible());await nojs.close();check('Complete seven-reading layer survives JavaScript disabled');
  assert.equal(report.errors.length,0);assert.equal(report.externalRequests.length,0);check('No JavaScript errors or external requests');
  report.passed=true;save();
 }catch(e){report.passed=false;report.failure=e.stack;await page.screenshot({path:path.join(ROOT,'evidence/attempts/browser-failure.png'),fullPage:true});save();throw e;}
 finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
