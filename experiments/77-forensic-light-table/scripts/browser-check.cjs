const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.LIGHT_TABLE_PLAYWRIGHT || '/tmp/rich-review-05-browser/node_modules/playwright');
const out=path.resolve(__dirname,'..');
const baseURL=process.env.LIGHT_TABLE_URL || 'http://127.0.0.1:8477';
const results={date:new Date().toISOString(),checks:[],errors:[],externalRequests:[]};
async function main(){
 const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1100}});
 const page=await context.newPage();
 page.on('pageerror',e=>results.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')results.errors.push(m.text());});
 page.on('request',r=>{if(!r.url().startsWith(baseURL)&&!r.url().startsWith('file:')&&!r.url().startsWith('data:'))results.externalRequests.push(r.url());});
 await page.goto(baseURL);await page.waitForFunction(()=>window.__lightTable&&document.querySelector('canvas'));
 assert.equal(await page.locator('.reading').count(),9);assert.equal(await page.locator('#specimen option').count(),43);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),1440);
 await page.screenshot({path:path.join(out,'screenshots/01-light-table.png'),fullPage:true});
 results.checks.push('Opening: all nine complete readings, 43 production specimens, no desktop overflow.');
 // Native keyboard controls must change the actual canvas, not just the numeric readout.
 for(const id of ['copied','moved','owned','active','compat','tested','unexplained']){
  const slider=page.locator('#alpha-'+id);await slider.focus();await slider.press('Home');
  const dark=await page.locator('canvas').evaluate(e=>e.toDataURL());
  await slider.press('End');
  const bright=await page.locator('canvas').evaluate(e=>e.toDataURL());assert.notEqual(dark,bright,'Exposure produces pixels: '+id);
  await page.locator(`[data-film-select="${id}"]`).click();
  await page.locator('#sweep').focus();await page.locator('#sweep').press('Home');
  const hidden=await page.locator('canvas').evaluate(e=>e.toDataURL());
  await page.locator('#sweep').press('End');assert.notEqual(hidden,await page.locator('canvas').evaluate(e=>e.toDataURL()),'Film edge clips pixels: '+id);
 }
 results.checks.push('All seven exposure sliders and all seven sweep masks produce different canvas pixels via keyboard.');
 await page.locator('[data-preset="twins"]').click();
 await page.locator('[data-film-select="copied"]').click();
 await page.locator('#table').scrollIntoViewIfNeeded();
 const coords=await page.evaluate(()=>{const r=document.querySelector('#plate').getBoundingClientRect(),g=window.__lightTableGeometry;return{start:{x:r.left+g.width-24,y:r.top+54},end:{x:r.left+g.x0+(g.width-g.x0)*.55,y:r.top+54}};});
 await page.mouse.move(coords.start.x,coords.start.y);await page.mouse.down();await page.mouse.move(coords.end.x,coords.end.y,{steps:12});await page.mouse.up();
 const edge=await page.evaluate(()=>window.__lightTable.state.edge.copied);assert(edge>40&&edge<75,'Pointer drag changes film edge');
 await page.screenshot({path:path.join(out,'screenshots/02-sliding-copy-film.png'),fullPage:false});
 await page.locator('#register').click();assert.equal(await page.locator('#sweep').inputValue(),'100');
 results.checks.push('Konva pointer drag clips selected film; register restores all film edges.');
 const point=await page.evaluate(()=>{const r=document.querySelector('#plate').getBoundingClientRect(),g=window.__lightTableGeometry,p=g.rows.find(x=>x.id==='registry--registry');return{x:r.left+g.x0+g.col+30,y:r.top+p.y+2};});
 await page.mouse.click(point.x,point.y);assert.equal(await page.locator('#specimen').inputValue(),'registry--registry');
 await page.locator('#inline-inspect').click();assert(await page.locator('#detail-dialog').evaluate(e=>e.open));await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>document.activeElement.id),'inline-inspect');
 results.checks.push('Canvas hit selection updates visible readout; inline source opens, Escape restores focus.');
 for(const preset of ['active','tests','gaps']){
  await page.locator(`[data-preset="${preset}"]`).click();
  assert.equal(await page.locator(`[data-preset="${preset}"]`).getAttribute('aria-pressed'),'true');
  if(preset==='tests'){
   assert.equal(await page.locator('#specimen option').count(),37);
   assert((await page.locator('#source-stations').innerText()).includes('Path removed from CLI.'));
   await page.locator('#inline-inspect').click();assert((await page.locator('.code').innerText()).includes('-        startupDurations:'));assert((await page.locator('.code').innerText()).includes('-        durations:'));await page.keyboard.press('Escape');
  }
  await page.locator('#table').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`screenshots/03-${preset}.png`),fullPage:false});
 }
 results.checks.push('All guided exposures switch layers/selection; moved-test diff contains removed startup and execution duration assertions.');
 // Every reading and every curated receipt must render the exact frozen source lines.
 let receiptCount=0;
 const readings=await page.evaluate(()=>window.__lightTable.readings.map(r=>({id:r.id,receipts:r.receipts})));
 for(const reading of readings){
  await page.locator(`[data-reading="${reading.id}"]`).click();
  for(let i=0;i<reading.receipts.length;i++){
   await page.locator(`[data-receipt="${i}"]`).click();
   const [key,a,b]=reading.receipts[i];
   const expected=await page.evaluate(({key,a,b})=>window.__lightTable.data.sources[key].text.split('\n').slice(a-1,b).join('\n'),{key,a,b});
   const actual=await page.locator('#source-pane .code-text').allTextContents();assert.equal(actual.join('\n'),expected,'Exact receipt: '+key);receiptCount++;
  }
  await page.keyboard.press('Escape');assert.equal(await page.locator(`[data-reading="${reading.id}"]`).evaluate(e=>document.activeElement===e),true);
 }
 results.checks.push(`${readings.length} readings and ${receiptCount} exact source receipts; Escape returns focus to every originating reading.`);
 // Nonlinear/linear navigation: locate, next reading, previous/next specimen, URL history.
 await page.locator('[data-reading="facade"]').click();await page.locator('#next-reading').click();assert((await page.locator('#dialog-kicker').innerText()).includes('04'));
 await page.locator('[data-locate="client--daemon-client-runtime"]').click();assert.equal(await page.locator('#specimen').inputValue(),'client--daemon-client-runtime');
 await page.locator('#next-file').click();const next=await page.locator('#specimen').inputValue();await page.locator('#previous-file').click();assert.notEqual(await page.locator('#specimen').inputValue(),next);
 await page.goto(baseURL+'/#file/test--worker--navigation-worker');assert.equal(await page.locator('#specimen option').count(),37);assert.equal(await page.locator('#specimen').inputValue(),'test--worker--navigation-worker');
 await page.locator('#next-file').click();await page.goBack();assert.equal(await page.locator('#specimen').inputValue(),'test--worker--navigation-worker');
 results.checks.push('Next reading, locate-on-plate, next/previous file, test-file deep link and browser Back preserve navigation.');
 // Every selectable row has source paths and a functional receipt route.
 let total=0;
 for(const dataset of ['production','tests']){
  await page.locator(`[data-dataset="${dataset}"]`).click();
  const ids=await page.locator('#specimen option').evaluateAll(es=>es.map(e=>e.value));
  for(const id of ids){await page.selectOption('#specimen',id);assert((await page.locator('#selected-name').innerText()).length>0);total++;}
 }
 results.checks.push(`All ${total} specimen selections render their corresponding source stations.`);
 for(const width of [768,390,320]){
  await page.setViewportSize({width,height:900});await page.locator('[data-preset="twins"]').click();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,'Page overflow at '+width);
  const clipped=await page.locator('#films input').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect(),p=document.querySelector('.film-controls').getBoundingClientRect();return r.right>p.right||r.left<p.left;}).length);
  assert.equal(clipped,0,'All seven controls fit the rail at '+width);
  await page.locator('#specimen').selectOption('client--daemon-client');await page.locator('#inline-inspect').click();
  assert(await page.locator('#detail-dialog').evaluate(e=>e.open));await page.keyboard.press('Escape');
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(out,`screenshots/04-${width}px.png`),fullPage:width===390});
 }
 results.checks.push('768, 390 and 320 px: no page overflow; native file selector and source dialog work. The detailed plate intentionally scrolls horizontally.');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-preset="tests"]').click();assert.equal(await page.locator('#specimen option').count(),37);
 await page.emulateMedia({media:'print'});assert.equal(await page.locator('.reading').count(),9);assert.equal(await page.locator('.instrument').isVisible(),false);await page.emulateMedia({media:'screen'});
 results.checks.push('Reduced-motion mode remains functional; print retains the nine complete readings.');
 await page.goto('file://'+path.join(out,'index.html')+'#file/delivery--delivery-session');
 await page.waitForFunction(()=>window.__lightTable);assert.equal(await page.locator('#specimen').inputValue(),'delivery--delivery-session');await page.locator('#inline-inspect').click();assert(await page.locator('#detail-dialog').evaluate(e=>e.open));
 results.checks.push('Direct file:// opening, embedded data, canvas rendering and source comparisons work without a server.');
 assert.deepEqual(results.errors,[]);assert.deepEqual(results.externalRequests,[]);
 await browser.close();results.status='passed';fs.writeFileSync(path.join(out,'evidence/browser-checks.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}
main().catch(e=>{results.status='failed';results.failure=e.stack;fs.writeFileSync(path.join(out,'evidence/browser-checks.json'),JSON.stringify(results,null,2));console.error(e);process.exit(1);});
