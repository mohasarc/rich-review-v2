import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const folder=resolve(fileURLToPath(new URL('..',import.meta.url)));
const url=new URL('../index.html',import.meta.url).href;
const observations=JSON.parse(await readFile(resolve(folder,'evidence/observations.json'),'utf8'));
const receiptData=JSON.parse(await readFile(resolve(folder,'evidence/receipts.json'),'utf8'));
await mkdir(resolve(folder,'screenshots'),{recursive:true});
const browser=await chromium.launch({channel:process.env.PINBALL_BROWSER_CHANNEL||'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1080},deviceScaleFactor:1});
const page=await context.newPage();
const errors=[],requests=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
const state=()=>page.evaluate(()=>window.__pinball.state);
const waitReady=()=>page.waitForFunction(()=>window.__pinballReady);
async function select(id){
  const mapping={unreachable:0,normal:0,pressure:1,readiness:1,draining:1,authentication:1,conflict:1,contradiction:1,reattach:2,'reattach-exhausted':2,fetch:3,'fetch-exhausted':3,worker:4,stopping:4,'controlled-exit':4,resource:5,capacity:5,internal:5};
  await page.locator('.cartridge').nth(mapping[id]).click();await page.locator('#variant').selectOption(id);
  assert.equal((await state()).selected,id);
}
async function finish(){
  for(let guard=0;guard<30;guard++){
    const s=await state();if(s.index===s.total-1)return s;
    await page.locator('#step').click();
  }
  throw new Error('Replay did not terminate');
}
try{
  await page.goto(url);await waitReady();
  assert.equal(await page.title(),'Failure domain pinball · Stack / 79');
  await page.screenshot({path:resolve(folder,'screenshots/01-opening.png'),fullPage:true});
  checks.push({check:'Direct file opening with vendored Phaser and frozen evidence',passed:true});
  await page.locator('#motion').check();
  const finalStates={};
  for(const id of Object.keys(observations.transport)){
    await select(id);const source=observations.transport[id];
    const stopReceipts=await page.evaluate(()=>window.__pinball.steps.map(s=>s.receipt));
    for(const receipt of stopReceipts)assert(receiptData.receipts[receipt],`Missing receipt ${receipt}`);
    const s=await finish();
    assert.equal(s.accepted,!!source.acceptance,id+' acceptance');
    assert.equal(s.capture,source.captureCount,id+' capture count');
    if(source.completion?.status==='failed')assert.equal(s.code,source.completion.code,id+' terminal code');
    if(source.error?.code==='corrupt'||source.error?.code==='closed')assert.equal(s.code,source.error.code,id+' transport code');
    if(source.error?.retrySafe)assert.equal(s.retry,true,id+' fallback gate');
    if(source.acceptance)assert.equal(s.retry,false,id+' acceptance prohibits local fallback');
    if(id.startsWith('fetch')){assert.equal(s.fetch,1);assert.equal(s.reattach,0);}
    if(id.startsWith('reattach')){assert.equal(s.reattach,1);assert.equal(s.fetch,0);}
    finalStates[id]=s;
  }
  checks.push({check:'All 18 source-grounded cases: acceptance, capture ownership, failure code, recovery budget and local gate',passed:true,finalStates});

  // Gate probing does not mutate the recorded path or state.
  await select('worker');await finish();const gateBefore=await state();
  await page.locator('#local-gate').click();assert.match(await page.locator('#event-title').innerText(),/closed/);assert.deepEqual(await state(),gateBefore);
  checks.push({check:'Illustrative flipper probe preserves the actual replay state',passed:true});

  // Every open rule has a source path; all related receipts can be opened in place.
  const visited=new Set();
  for(let i=0;i<7;i++){
    const b=page.locator('.rule-list > li > button').nth(i);
    await b.click();await page.locator('#source-dialog').waitFor({state:'visible'});
    assert((await page.locator('#source-code').innerText()).length>40);
    await page.keyboard.press('Escape');
    assert(await b.evaluate(el=>document.activeElement===el),'Focus did not return to rule');
  }
  // Establish full reachability from the seven actual root buttons without changing app state.
  const relations={cutover:['old-client','old-failure','fallback'],guards:['admission-host','retry','guard-tests'],transport:['retry','fallback','admission-deadline','completion-deadline'],identity:['reattach','recovery-tests'],fetch:['resume','manifest','ack','limits'],failure:['classify','old-failure','failure-tests'],'recovery-tests':['reattach','identity'],retry:['transport','guards'],fallback:['transport','old-client'],reattach:['identity','close','limits','recovery-tests'],resume:['fetch','limits','reattach'],manifest:['ack','fetch'],ack:['manifest','fetch'],limits:['budget-reasons','resume','reattach'],close:['reattach','transport'],classify:['failure','old-failure'],'failure-tests':['failure'],'guard-tests':['guards']};
  const rootControls={cutover:'.rule-list > li:nth-child(1) > button',guards:'.rule-list > li:nth-child(2) > button',transport:'.rule-list > li:nth-child(3) > button',reattach:'.rule-list > li:nth-child(4) > button',fetch:'.rule-list > li:nth-child(5) > button',failure:'.rule-list > li:nth-child(6) > button','recovery-tests':'.rule-list > li:nth-child(7) > button'};
  const paths={};const pending=Object.keys(rootControls).map(id=>[id]);
  while(pending.length){const path=pending.shift(),id=path.at(-1);if(paths[id])continue;paths[id]=path;for(const next of relations[id]||[])pending.push([...path,next]);}
  for(const [id,r] of Object.entries(receiptData.receipts)){
    assert(paths[id],`Unreachable source ${id}`);
    const path=paths[id];await page.locator(rootControls[path[0]]).click();
    for(const next of path.slice(1))await page.getByRole('button',{name:receiptData.receipts[next].title,exact:true}).click();
    assert.equal(await page.locator('#source-title').innerText(),r.title);
    assert((await page.locator('#source-code').innerText()).includes(r.text.split('\n')[0].trim()));
    visited.add(id);await page.keyboard.press('Escape');
  }
  assert.equal(visited.size,Object.keys(receiptData.receipts).length);
  checks.push({check:'All 24 source receipts reachable through the seven open rules; Escape restores focus',passed:true});

  // Click an actual bumper in the Phaser canvas.
  await page.locator('#table').scrollIntoViewIfNeeded();
  const box=await page.locator('#table canvas').boundingBox();
  await page.mouse.click(box.x+462/900*box.width,box.y+165/810*box.height);
  assert.equal(await page.locator('#source-title').innerText(),receiptData.receipts.guards.title);
  await page.keyboard.press('Escape');
  checks.push({check:'Phaser bumper hit area opens its source receipt',passed:true});

  // Normal animation, pause, dialog interruption, selection reset and keyboard.
  await select('normal');await page.locator('#motion').uncheck();await page.locator('#launch').click();
  await page.waitForFunction(()=>window.__pinball.state.index>=1);
  await page.locator('#pause').click();const paused=await state();
  await page.waitForTimeout(1000);assert.equal((await state()).index,paused.index);assert.equal((await state()).running,false);
  await page.locator('#inspect').click();await page.keyboard.press('Escape');assert.equal((await state()).running,false);
  await page.locator('#pause').click();await page.waitForFunction(()=>window.__pinball.state.running);
  await select('fetch');await page.waitForTimeout(1700);assert.equal((await state()).index,0);assert.equal((await state()).running,false);
  await page.locator('#motion').check();await page.locator('h1').click();await page.keyboard.press('ArrowRight');assert.equal((await state()).index,1);
  await page.locator('#reset').click();await page.locator('h1').click();await page.keyboard.press('Space');await page.waitForFunction(()=>window.__pinball.state.index>=1);await page.keyboard.press('Space');assert.equal((await state()).running,false);
  checks.push({check:'Real Phaser animation, pause/resume, inspector pause, stale-timer cancellation, keyboard play/step',passed:true});

  await select('normal');await page.locator('#motion').uncheck();await page.locator('#launch').click();
  await page.waitForFunction(()=>{const s=window.__pinball.state;return s.index===s.total-1&&!s.running;},{},{timeout:40000});
  const autoplayState=await state();assert.equal(autoplayState.accepted,true);assert.equal(autoplayState.manifest,true);assert.equal(autoplayState.capture,1);
  checks.push({check:'Complete normal-motion autoplay finishes naturally with accepted and manifest state retained',passed:true,state:autoplayState});
  await page.locator('#motion').check();
  await select('reattach');await finish();await page.locator('.machine').screenshot({path:resolve(folder,'screenshots/02-reattachment.png')});
  await select('fetch');await finish();await page.locator('.machine').screenshot({path:resolve(folder,'screenshots/03-fetch.png')});
  await select('controlled-exit');await finish();await page.locator('.machine').screenshot({path:resolve(folder,'screenshots/04-terminal.png')});
  await page.locator('.rule-list>li:nth-child(6)>button').click();await page.locator('#source-dialog').screenshot({path:resolve(folder,'screenshots/05-source.png')});await page.keyboard.press('Escape');

  // Responsive controls and native table magnification on a phone.
  const sizes=[];
  for(const width of [320,390,768,1280,1440]){
    await page.setViewportSize({width,height:900});
    const dimensions=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
    assert(dimensions.scrollWidth<=width,`Horizontal page overflow at ${width}`);sizes.push(dimensions);
  }
  await page.setViewportSize({width:390,height:844});await select('fetch');
  await page.locator('#magnify').click();
  assert(await page.locator('#table-scroll').evaluate(el=>el.scrollWidth>el.clientWidth));
  await page.locator('#table-scroll').evaluate(el=>el.scrollLeft=el.scrollWidth);
  assert(await page.locator('#table-scroll').evaluate(el=>el.scrollLeft>0));
  await page.locator('#magnify').click();await finish();await page.screenshot({path:resolve(folder,'screenshots/06-mobile.png'),fullPage:true});
  checks.push({check:'320, 390, 768, 1280 and 1440 px layouts; native magnification and horizontal board scrolling',passed:true,sizes});

  const reduced=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
  const rp=await reduced.newPage();await rp.goto(url+'#replay=fetch');await rp.waitForFunction(()=>window.__pinballReady);
  assert(await rp.locator('#motion').isChecked());assert.equal(await rp.evaluate(()=>window.__pinball.state.selected),'fetch');
  await rp.locator('#step').click();assert.equal(await rp.evaluate(()=>window.__pinball.state.animating),false);await reduced.close();
  const staticContext=await browser.newContext({javaScriptEnabled:false});const sp=await staticContext.newPage();await sp.goto(url);
  assert.equal(await sp.locator('.rule-list>li').count(),7);assert(await sp.locator('noscript').isVisible());await staticContext.close();
  checks.push({check:'Reduced motion uses instant steps; direct replay fragments; all seven rules remain readable without JavaScript',passed:true});
  assert.equal(errors.length,0);assert.equal(requests.filter(u=>/^https?:/.test(u)).length,0);
  checks.push({check:'No page errors or network requests while opening and using the local artifact',passed:true});
  await writeFile(resolve(folder,'evidence/browser-checks.json'),JSON.stringify({passed:true,checks,errors,requests},null,2)+'\n');
  console.log(`${checks.length} browser check groups passed, including all 18 cases and 24 receipts.`);
}catch(error){
  await page.screenshot({path:resolve(folder,'evidence/browser-failure.png'),fullPage:true}).catch(()=>{});
  await writeFile(resolve(folder,'evidence/browser-failure.json'),JSON.stringify({message:error.message,stack:error.stack,checks,errors},null,2)+'\n');
  console.error(error);process.exitCode=1;
}finally{await browser.close();}
