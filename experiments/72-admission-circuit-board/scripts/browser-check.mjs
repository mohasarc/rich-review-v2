import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1100}});
const page=await context.newPage();
const errors=[],warnings=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});page.on('request',r=>requests.push(r.url()));
const report={checks:[],presets:[],screens:[]};
const state=()=>page.evaluate(()=>({step:window.__circuit.step,index:window.__circuit.index,result:window.__circuit.result,playing:window.__circuit.playing}));
const choose=async id=>{await page.getByLabel('LOAD A SIGNAL',{exact:true}).selectOption(id);await page.getByRole('button',{name:'Show outcome'}).click();return state();};
try{
 await page.goto('http://127.0.0.1:8472');await page.locator('.react-flow__node').first().waitFor();
 assert.equal(await page.locator('.react-flow__node').count(),11);
 assert.equal(await page.locator('.react-flow__edge').count(),19);
 for(const [id,outcome,code] of [['complete','done',''],['precedence','local','draining'],['auth','halt','closed'],['contradictory','halt','corrupt'],['unreachable','local','unreachable'],['uncertain','halt','closed'],['both','done',''],['exhaust-fetch','halt','corrupt'],['exhaust-reattach','halt','closed'],['terminal','halt','worker-exit'],['cold','local','']]){
  const s=await choose(id);assert.equal(s.result.outcome,outcome,id);assert.equal(s.result.code,code,id);
  assert.equal(await page.getByTestId('local-count').textContent(),String(s.step.localRuns));
  report.presets.push({id,outcome,code,steps:s.result.steps.length});
 }
 report.checks.push('All 11 presets and their visible terminal outputs');
 await choose('complete');
 for(const code of ['worker-exit','controlled-resource','response-capacity','stopping','internal']){
  await page.getByLabel('After acceptance',{exact:true}).selectOption(code);await page.getByRole('button',{name:'Show outcome'}).click();
  const s=await state();assert.equal(s.step.code,code);assert.equal(s.step.localRuns,0);
 }
 await choose('complete');await page.getByLabel('Queue',{exact:true}).selectOption('closed');await page.getByRole('button',{name:'Show outcome'}).click();assert.equal((await state()).step.code,'draining');
 await choose('complete');await page.getByLabel('Duplicate identity',{exact:true}).selectOption('matching');await page.getByRole('button',{name:'Show outcome'}).click();assert.equal((await state()).result.outcome,'done');
 await page.getByLabel('Worker ready',{exact:true}).uncheck();await page.getByRole('button',{name:'Show outcome'}).click();assert.equal((await state()).step.code,'not-ready');
 await page.getByLabel('Flip wire retrySafe').check();await page.getByRole('button',{name:'Show outcome'}).click();assert.equal((await state()).step.code,'corrupt');
 await choose('complete');await page.getByLabel('Resource pause',{exact:true}).check();await page.getByRole('button',{name:'Show outcome'}).click();assert.equal((await state()).step.code,'resource-pressure');
 report.checks.push('All outer terminal codes, matching duplicate, closed queue, readiness, resource pause and contradictory retry bit');
 await choose('complete');
 const slider=page.getByRole('slider',{name:'Signal stage'});await slider.focus();await slider.press('Home');assert.equal((await state()).index,0);await slider.press('ArrowRight');assert.equal((await state()).index,1);await slider.press('End');assert.equal((await state()).step.node,'done');
 await page.getByRole('button',{name:'Reset signal'}).click();await page.getByRole('button',{name:'Step →',exact:true}).click();assert.equal((await state()).index,1);
 await page.getByRole('button',{name:'Inject signal'}).click();await page.waitForFunction(()=>window.__circuit.index>1);await page.getByRole('button',{name:'Pause signal'}).click();const paused=(await state()).index;await page.waitForTimeout(1300);assert.equal((await state()).index,paused);
 report.checks.push('Pointer step, reset, playback/pause, keyboard Home/End/ArrowRight scrubber');
 await choose('precedence');await page.getByRole('button',{name:'Fit board',exact:true}).click();
 for(const id of ['owner','route','admission','delivery','authority','accepted','recovery','evidence']){
  const trigger=page.locator(`#reading-${id} button`);await trigger.click();await page.locator('dialog[open]').waitFor();
  const select=page.getByLabel('Source receipt');const count=await select.locator('option').count();
  for(let i=0;i<count;i++){await select.selectOption(String(i));assert.ok((await page.locator('.source-code').innerText()).trim().length>15);}
  await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
  report.checks.push(`Reading ${id}: ${count} source receipts and Escape return`);
 }
 await page.getByRole('button',{name:'Fit board',exact:true}).click();
 for(const name of ['Inspect U1 ROUTE','Inspect J1 SUBMIT','Inspect U2 ADMISSION','Inspect F1 FRAME FUSE','Inspect U3 LOCAL PERMIT','Inspect U4 ACCEPTED','Inspect U5 RECOVERY','Inspect J2 RESULT + ACK','Inspect D1 LOCAL RUN','Inspect D2 DELIVERED','Inspect D3 CONTROLLED']){
  const trigger=page.getByRole('button',{name,exact:true});await trigger.click();await page.locator('dialog[open]').waitFor();await page.getByRole('button',{name:'Close evidence and return'}).click();
 }
 report.checks.push('Every board component opens its matching evidence reading');
 await page.locator('#reading-owner button').click();await page.getByRole('button',{name:'Next reading'}).click();await page.waitForFunction(()=>document.querySelector('#reading-title')?.textContent==='A route is chosen before submission.');await page.getByRole('button',{name:'Previous reading'}).click();await page.keyboard.press('Escape');
 const focused=await page.evaluate(()=>document.activeElement?.closest('article')?.id);report.focusReturn=focused??null;
 assert.equal(focused,'reading-owner','Dialog must return focus to its opener');
 await page.getByRole('button',{name:'Fit board',exact:true}).click();await page.waitForTimeout(300);
 const before=await page.locator('.react-flow__viewport').getAttribute('style');await page.getByRole('button',{name:'zoom in',exact:false}).click();const after=await page.locator('.react-flow__viewport').getAttribute('style');assert.notEqual(before,after);
 await page.getByRole('button',{name:'Follow signal',exact:true}).click();await page.waitForTimeout(300);assert.ok((await page.locator('.react-flow__viewport').getAttribute('style')).includes('scale(1)'));
 await page.getByRole('button',{name:'Fit board',exact:true}).click();await page.waitForTimeout(300);
 report.checks.push('React Flow zoom, fit, and signal focus');
 const pane=await page.locator('.react-flow__pane').boundingBox();
 const panBefore=await page.locator('.react-flow__viewport').getAttribute('style');
 await page.mouse.move(pane.x+pane.width*.5,pane.y+28);await page.mouse.down();await page.mouse.move(pane.x+pane.width*.5+60,pane.y+55,{steps:5});await page.mouse.up();
 assert.notEqual(await page.locator('.react-flow__viewport').getAttribute('style'),panBefore);await page.getByRole('button',{name:'Fit board',exact:true}).click();await page.waitForTimeout(300);report.checks.push('Pointer dragging pans the board');
 const textOverflow=await page.evaluate(()=>[...document.querySelectorAll('.component svg text')].flatMap(e=>{const b=e.getBBox(),svg=e.ownerSVGElement,v=svg.viewBox.baseVal;return b.x< -1||b.x+b.width>v.width+1?[e.textContent]:[]}));
 assert.deepEqual(textOverflow,[],'Component text must fit its SVG');
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:width<800?844:1100});await page.getByRole('button',{name:'Fit board',exact:true}).click();await page.waitForTimeout(300);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,`Overflow at ${width}`);
  await page.locator('#reading-recovery button').click();await page.locator('dialog[open]').waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);await page.keyboard.press('Escape');
  report.screens.push({width,overflow:false});
 }
 report.checks.push('1440, 768, 390, 320px layouts including source dialogs; SVG text bounds');
 await page.emulateMedia({reducedMotion:'reduce'});await choose('both');await page.getByRole('button',{name:'Reset signal'}).click();await page.getByRole('button',{name:'Step →',exact:true}).click();assert.equal((await state()).index,1);assert.equal(await page.locator('.signal-dot').evaluateAll(es=>es.some(e=>Number(getComputedStyle(e).opacity)>0)),false);
 report.checks.push('Reduced motion retains stepping with no moving pulse');
 const offline=await context.newPage();await offline.goto(new URL('../index.html',import.meta.url).href);await offline.locator('.react-flow__node').first().waitFor();await offline.getByRole('button',{name:'Show outcome'}).click();assert.equal(await offline.getByTestId('local-count').textContent(),'0');await offline.close();report.checks.push('Direct file:// opening works without a server');
 assert.deepEqual(errors,[]);assert.deepEqual(warnings,[]);assert.deepEqual(requests.filter(u=>!u.startsWith('http://127.0.0.1:8472/')&&!u.startsWith('data:')),[]);
 report.status='passed';report.errors=errors;report.warnings=warnings;report.externalRequests=[];
}catch(e){report.status='failed';report.error=e.stack;process.exitCode=1;await page.screenshot({path:'screenshots/browser-failure.png',fullPage:true});}
fs.writeFileSync('evidence/browser-checks.json',JSON.stringify(report,null,2));
await browser.close();console.log(JSON.stringify(report,null,2));
