import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync, writeFileSync, mkdirSync, existsSync, renameSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const out=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const model=JSON.parse(readFileSync(resolve(out,'evidence/model.json'),'utf8'));
const url=process.env.LOOM_URL||'http://127.0.0.1:8474/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[],external=[],failedRequests=[],checks=[];
const context=await browser.newContext({viewport:{width:1440,height:1120},reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('request',r=>{if(!r.url().startsWith(url)&&!r.url().startsWith('data:'))external.push(r.url());});
page.on('response',r=>{if(r.status()>=400)failedRequests.push([r.status(),r.url()]);});
const report=()=>({checks,errors,external,failedRequests,passed:errors.length===0&&external.length===0&&failedRequests.length===0});
const done=(name,details)=>{checks.push({name,details});console.log(name+': '+JSON.stringify(details));};
const state=()=>page.evaluate(()=>Object.fromEntries(new URLSearchParams(location.hash.slice(1))));
const setSelect=async(selector,value)=>page.selectOption(selector,value);
const goto=async(s)=>page.goto(url+'#'+new URLSearchParams(s));
const at=async(row,slice,depth='surface',thread='all',note='')=>{await goto({row,slice,depth,thread,note});await page.locator('#selection-content h3').waitFor();};
async function shot(name,locator){await (locator?page.locator(locator):page).screenshot({path:resolve(out,'screenshots',name)});}
try{
 await page.goto(url);await page.locator('#cell-capture-output').waitFor();
 assert.equal(await page.locator('.crossing').count(),49);assert.equal(await page.locator('.contract-rim').count(),15);assert.equal(await page.locator('.field-thread').count(),38);assert.equal(await page.locator('.reading').count(),12);
 done('Inventory', {coordinates:49,activeCrossings:15,fieldStrands:38,openReadings:12,knots:await page.locator('.knot').count()});
 await shot('01-opening.png');
 await page.evaluate(()=>window.scrollTo(0,420));await shot('02-full-fabric.png');
 let visits=0;
 for(const depth of ['surface','wiring','source']){
  await page.locator(`[data-depth="${depth}"]`).click();
  for(const row of model.rows){await setSelect('#row-select',row.id);
   for(const slice of model.slices){await setSelect('#slice-select',slice.id);const current=await state();assert.equal(current.row,row.id);assert.equal(current.slice,slice.id);assert.equal(current.depth,depth);assert.equal(await page.locator('.crossing[aria-selected=true]').count(),1);visits++;}
  }
 }
 done('Independent addressing', {visits,all49CoordinatesAtAll3Depths:true});
 await at('capture','output','wiring');await page.locator('#cell-capture-output').focus();
 await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowRight');const a=await state();
 await at('capture','output','wiring');await page.locator('#cell-capture-output').focus();
 await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowDown');const b=await state();assert.deepEqual(a,b);assert.equal(a.row,'spool');assert.equal(a.slice,'transport');assert.equal(a.depth,'wiring');
 await page.keyboard.press('PageDown');assert.equal((await state()).depth,'source');await page.keyboard.press('PageUp');assert.equal((await state()).depth,'wiring');
 done('Keyboard commutation',{rightThenDownEqualsDownThenRight:true,pageKeysPreserveCoordinates:true});
 await at('capture','output','source','equal');
 for(let i=0;i<15;i++){assert.equal((await state()).depth,'source');assert.equal((await state()).thread,'equal');await page.locator('#next-cell').click();}assert.equal((await state()).row,'capture');assert.equal((await state()).slice,'output');
 done('Linear route',{activeCrossingsVisited:15,depthAndThreadPreserved:true});
 await at('capture','output');let leaves=0;
 for(const f of model.fields){await setSelect('#thread-select',f.id);const count=await page.locator('.knot').evaluateAll(nodes=>nodes.filter(n=>getComputedStyle(n).opacity==='1').length);assert.equal(count,f.rows.length,f.id);leaves++;}
 for(const [mode,count] of [['chunk',5],['equal',3],['budgets',2]]){await page.locator(`[data-mode="${mode}"]`).click();assert.equal(await page.locator('.knot').evaluateAll(nodes=>nodes.filter(n=>getComputedStyle(n).opacity==='1').length),count);}
 done('Thread identity',{exactFields:leaves,chunkFamilies:5,unrelated250msFields:3,separateDeliveryBudgets:2});
 await page.locator('[data-mode="equal"]').click();await page.evaluate(()=>window.scrollTo(0,420));await shot('03-equal-values.png');
 await page.locator('[data-mode="chunk"]').click();await page.locator('[data-depth="wiring"]').click();await page.locator('#selection-content').evaluate(e=>e.scrollTop=0);await page.evaluate(()=>window.scrollTo(0,420));await shot('04-shared-chunk.png');
 await page.locator('#cell-worker-output .knot').click();assert.equal((await state()).row,'worker');assert.equal((await state()).thread,'output.maximumChunkRawBytes');assert.equal((await state()).depth,'wiring');
 done('Pointer knots',{selectsFamilyAndExactField:true,preservesDepth:true});
 const opened=new Set();
 const visitSources=async()=>{
  const ids=await page.locator('[data-receipt]').evaluateAll(ns=>ns.map(n=>n.dataset.receipt));
  for(const id of ids){if(opened.has(id))continue;const opener=page.locator(`[data-receipt="${id}"]`);await opener.click();assert.equal(await page.locator('#source-dialog').evaluate(e=>e.open),true);const r=model.receipts[id],s=model.sources[r.source];assert.equal(await page.locator('#source-code span').count(),r.end-r.start+1);assert.equal(await page.locator('#source-path').textContent(),s.path+':'+r.start+'–'+r.end);await page.keyboard.press('Escape');assert.equal(await page.locator('#source-dialog').evaluate(e=>e.open),false);assert.equal(await opener.evaluate(e=>e===document.activeElement),true);opened.add(id);}
 };
 for(const cell of model.cells){await at(cell.row,cell.slice,'source');await visitSources();}
 for(const note of model.notes){await page.locator(`#reading-${note.id} .inspect-reading`).click();assert.equal((await state()).note,note.id);assert.equal((await state()).depth,'wiring');await page.locator('[data-depth="source"]').click();await visitSources();await page.locator('.selected-note a').click();assert.equal(new URL(page.url()).hash,'#reading-'+note.id);}
 done('Depth returns and receipts',{allOpenReadings:12,uniqueModalReceipts:opened.size,escapeReturnsFocus:true});
 await at('socket','delivery','source','budgets','05');await page.locator('[data-receipt="reattach-base"]').click();await shot('05-recovery-source.png');await page.locator('#close-source').click();
 await at('worker','output','source','chunk','06');const before=await state();await setSelect('#row-select','host');await page.goBack();assert.deepEqual(await state(),before);
 await page.locator('#surface-button').click();assert.equal((await state()).row,'worker');assert.equal((await state()).slice,'output');assert.equal((await state()).depth,'surface');
 await page.locator('#locate-button').click();assert.equal(await page.locator('#cell-worker-output').evaluate(e=>e===document.activeElement),true);
 done('History and surface',{allCoordinatesRestored:true,surfaceKeepsCrossing:true,locateRestoresGridFocus:true});
 const responsive=[];
 for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:900});await at('host','diagnostics','source');const metrics=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,chartWidth:document.querySelector('.cloth-scroll').scrollWidth,chartViewport:document.querySelector('.cloth-scroll').clientWidth}));assert.ok(metrics.scroll<=width+1,JSON.stringify(metrics));responsive.push(metrics);await page.locator('[data-receipt="trace-floor"]').click();assert.ok(await page.locator('#source-dialog').evaluate(e=>e.getBoundingClientRect().right<=innerWidth));await page.keyboard.press('Escape');}
 done('Responsive reading',responsive);
 await page.setViewportSize({width:390,height:844});await at('socket','delivery','wiring','budgets','05');await page.locator('#inspector').scrollIntoViewIfNeeded();await shot('06-phone-depth.png');
 await page.setViewportSize({width:1440,height:1120});await at('capture','output');
 const textBounds=await page.locator('#loom text').evaluateAll(nodes=>nodes.map(n=>({text:n.textContent,box:n.getBBox()})).filter(({box:b})=>b.x<0||b.x+b.width>1076||b.y<0||b.y+b.height>686).map(n=>n.text));assert.deepEqual(textBounds,[]);
 done('SVG text bounds',{outsideViewBox:textBounds});
 await page.emulateMedia({media:'print'});assert.equal(await page.locator('.reading:visible').count(),12);await page.emulateMedia({media:'screen'});
 const book=await context.newPage();await book.goto(url+'evidence.html');assert.equal(await book.locator('article').count(),72);for(const [id,r] of Object.entries(model.receipts))assert.equal(await book.locator(`#${id}-L${r.anchor}`).count(),1);await book.close();
 done('Print and static source book',{visiblePrintReadings:12,anchoredReceipts:72});
 const offlineContext=await browser.newContext({offline:true,viewport:{width:1440,height:900}}), offline=await offlineContext.newPage();const offlineErrors=[];offline.on('pageerror',e=>offlineErrors.push(e.message));await offline.goto(pathToFileURL(resolve(out,'index.html')).href);assert.equal(await offline.locator('.crossing').count(),49);await offline.locator('[data-mode="budgets"]').click();assert.match(await offline.locator('#comparison-readout').innerText(),/TWO SCOPES/);assert.deepEqual(offlineErrors,[]);await offlineContext.close();
 const nojsContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}), nojs=await nojsContext.newPage();await nojs.goto(url);assert.equal(await nojs.locator('.reading').count(),12);await nojs.locator('#reading-05 a[href^="evidence.html"]').click();assert.equal(await nojs.locator('article').count(),72);await nojsContext.close();
 const touchContext=await browser.newContext({isMobile:true,hasTouch:true,viewport:{width:390,height:844}}), touch=await touchContext.newPage();await touch.goto(url);await touch.locator('[data-mode="chunk"]').tap();await touch.locator('[data-depth="wiring"]').tap();assert.equal(await touch.locator('[data-depth="wiring"]').getAttribute('aria-pressed'),'true');await touchContext.close();
 done('Offline, fallback and touch',{directFileOffline:true,javaScriptDisabledReadingsAndSources:true,touchControls:true,reducedMotion:true});
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(failedRequests,[]);
 writeFileSync(resolve(out,'evidence/browser-checks.json'),JSON.stringify(report(),null,2)+'\n');
 console.log('PASS: '+checks.length+' check groups.');
}catch(error){mkdirSync(resolve(out,'evidence/attempts'),{recursive:true});writeFileSync(resolve(out,'evidence/attempts/browser-failure-'+Date.now()+'.json'),JSON.stringify({...report(),failure:error.stack},null,2)+'\n');throw error;}
finally{await browser.close();}
