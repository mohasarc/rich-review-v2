// Isolated browser. Start the README's optional local server first, or use FIELD_URL.
const {chromium}=require(process.env.FIELD_PLAYWRIGHT || '/tmp/rich-review-05-browser/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const out=path.resolve(__dirname,'..');
const url=process.env.FIELD_URL || 'http://127.0.0.1:8461/';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FIELD_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const ctx=await browser.newContext({viewport:{width:1440,height:1100}});
 const p=await ctx.newPage();const errors=[],external=[],failures=[];const report={groups:[],errors,external,failures};
 p.on('pageerror',e=>errors.push(String(e)));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 p.on('request',r=>{if(!r.url().startsWith(url)&&!r.url().startsWith('data:')&&!r.url().startsWith('file:'))external.push(r.url());});
 const check=(name,details)=>report.groups.push({name,status:'passed',details});
 try{
 await p.goto(url);await p.waitForFunction(()=>window.FIELD_API&&document.querySelectorAll('[data-cell-id]').length===243);
 const ids=await p.locator('[data-cell-id]').evaluateAll(es=>es.map(e=>e.dataset.cellId));
 for(const id of ids){
   await p.locator(`[data-cell-id="${id}"]`).click();
   assert.equal(await p.evaluate(()=>FIELD_API.selected),id);
   const state=await p.evaluate(()=>({coordinate:document.querySelector('#inspector-coordinate').textContent,receipts:document.querySelectorAll('#receipts .receipt').length,focusable:document.querySelectorAll('[data-cell-id][tabindex="0"]').length,sourceText:document.querySelector('#receipts pre').textContent}));
   assert(state.receipts>0&&state.focusable===1&&state.sourceText.length>20);
 }
 check('Every field cell selects its own source',{cells:ids.length});
 await p.locator('[data-cell-id="146-stream"]').click();await p.locator('[data-cell-id="146-stream"]').focus();
 await p.keyboard.press('ArrowDown');assert.equal(await p.evaluate(()=>FIELD_API.selected),'147-stream');
 await p.keyboard.press('ArrowRight');assert.equal(await p.evaluate(()=>FIELD_API.selected),'147-sample');
 await p.keyboard.press('Home');assert.equal(await p.evaluate(()=>FIELD_API.selected),'0-sample');
 await p.keyboard.press('End');assert.equal(await p.evaluate(()=>FIELD_API.selected),'149-sample');
 await p.keyboard.press('Enter');assert.equal(await p.locator('#return-field').evaluate(e=>e===document.activeElement),true);
 await p.locator('#return-field').click();assert.equal(await p.locator('[data-cell-id="149-sample"]').evaluate(e=>e===document.activeElement),true);
 check('Roving keyboard, baseline/tip and return focus','Arrow keys; Home; End; Enter; return');
 await p.locator('[data-cell-id="148-accept"]').click();assert.equal(await p.locator('#owner-path').innerText(),'apps/cli / AcceptedExecutionSession');
 await p.locator('[data-cell-id="149-accept"]').click();assert.equal(await p.locator('#owner-path').innerText(),'@symnav/daemon / AcceptedExecutionSession');
 await p.goBack();assert.equal(await p.evaluate(()=>FIELD_API.selected),'148-accept');
 await p.goto(url+'#145-worker');assert.equal(await p.evaluate(()=>FIELD_API.selected),'145-worker');
 check('Active package cutover and history','148 CLI / 149 package; Back; direct 145-worker fragment');
 await p.locator('#receipts [data-expand]').first().click();assert.equal(await p.locator('#source-dialog').evaluate(e=>e.open),true);
 assert((await p.locator('#dialog-content').innerText()).includes('SHA-256'));
 await p.keyboard.press('Escape');assert.equal(await p.locator('#source-dialog').evaluate(e=>e.open),false);
 assert.equal(await p.locator('#receipts [data-expand]').first().evaluate(e=>e===document.activeElement),true);
 for(const special of ['package','test']){await p.locator(`[data-special="${special}"]`).click();assert.equal(await p.locator('#source-dialog').evaluate(e=>e.open),true);await p.locator('#close-dialog').click();}
 check('Evidence dialogs and focus restoration','Exact source expansion, Escape, package and test receipts');
 for(const build of ['main','tip'])for(const scenario of ['normal','sample-reject','cleanup-reject']){
   await p.selectOption('#build',build);await p.selectOption('#scenario',scenario);
   for(let step=0;step<6;step++){
    await p.locator('#step').fill(String(step));
    assert.equal(await p.evaluate(()=>FIELD_API.step),step);
    const expected=await p.evaluate(({build,scenario,step})=>RECORDINGS.runs.find(r=>r.build===build&&r.scenario===scenario).checkpoints[step].title,{build,scenario,step});
    assert.equal(await p.locator('#checkpoint-title').innerText(),expected);
   }
 }
 check('Every recorded checkpoint','6 scenarios/build pairs × 6 checkpoints = 36');
 await p.selectOption('#build','tip');await p.selectOption('#scenario','normal');await p.locator('#step').fill('0');
 await p.locator('#play').click();await p.waitForFunction(()=>FIELD_API.step===1);await p.locator('#play').click();
 assert.equal(await p.evaluate(()=>FIELD_API.playing),false);
 await p.locator('#next-step').click();assert.equal(await p.evaluate(()=>FIELD_API.step),2);await p.locator('#prev-step').click();assert.equal(await p.evaluate(()=>FIELD_API.step),1);
 check('Playback start/pause and step buttons','Automatic advance; manual stop; next; previous');
 const clipping=await p.evaluate(()=>{
  const issues=[];for(const svg of document.querySelectorAll('svg')){
    const vb=svg.viewBox.baseVal;
    for(const t of svg.querySelectorAll('text')){const b=t.getBBox();const tr=t.getCTM(),sr=svg.getCTM();if(!tr||!sr)continue;const a=new DOMPoint(b.x,b.y).matrixTransform(tr).matrixTransform(sr.inverse());const z=new DOMPoint(b.x+b.width,b.y+b.height).matrixTransform(tr).matrixTransform(sr.inverse());if(a.x<-.5||a.y<-.5||z.x>vb.width+.5||z.y>vb.height+.5)issues.push(t.textContent);}
  }return issues;
 });assert.deepEqual(clipping,[]);check('SVG labels remain inside both view boxes',clipping);
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:path.join(out,'screenshots/01-opening.png')});
 await p.locator('#recording').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'screenshots/02-recording.png')});
 await p.locator('[data-special="test"]').click();await p.screenshot({path:path.join(out,'screenshots/03-test-receipt.png')});await p.locator('#close-dialog').click();
 const responsive=[];
 for(const width of [320,390,768,1120,1440]){
   await p.setViewportSize({width,height:900});await p.evaluate(()=>scrollTo(0,0));
   const dims=await p.evaluate(()=>({viewport:innerWidth,page:document.documentElement.scrollWidth,fieldScroll:document.querySelector('.field-scroll').scrollWidth>document.querySelector('.field-scroll').clientWidth}));
   assert.equal(dims.page,dims.viewport);responsive.push(dims);
   await p.locator('[data-select="149-cleanup"]').first().click();assert.equal(await p.evaluate(()=>FIELD_API.selected),'149-cleanup');
 }
 check('Responsive page without horizontal page overflow',responsive);
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:path.join(out,'screenshots/04-mobile.png')});
 await p.emulateMedia({reducedMotion:'reduce'});await p.locator('#step').fill('2');await p.locator('#next-step').click();assert.equal(await p.evaluate(()=>FIELD_API.step),3);
 await p.emulateMedia({media:'print'});assert.equal(await p.locator('#surface').isVisible(),true);await p.emulateMedia({media:'screen'});
 check('Reduced motion and print','Immediate checkpoint change; complete key present for print');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(url);assert.equal(await np.locator('.surface-key li').count(),9);assert.equal(await np.locator('.surface-foot>div').count(),2);assert.equal(await np.locator('.inventory tbody tr').count(),27);await nojs.close();
 check('JavaScript-disabled complete layer','9 boundaries, P and T, and 27-row source inventory');
 const file=await ctx.newPage();await file.goto('file://'+path.join(out,'index.html'));await file.waitForFunction(()=>window.FIELD_API?.selected==='149-stream');assert.equal(await file.locator('[data-cell-id]').count(),243);
 const link=await file.locator('#receipts .receipt-foot a').first().getAttribute('href');await file.goto('file://'+path.join(out,link));assert((await file.locator('body').innerText()).includes('SHA-256'));await file.close();
 check('Direct offline file opening','Field JavaScript and source receipt both work over file://');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 report.status='passed';
 }catch(e){failures.push(e.stack);report.status='failed';await p.screenshot({path:path.join(out,'screenshots/check-failure.png'),fullPage:true});process.exitCode=1;}
 fs.writeFileSync(path.join(out,'evidence/browser-checks.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));await browser.close();
})();
