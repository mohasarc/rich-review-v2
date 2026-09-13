import { chromium } from 'playwright-core';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const out=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const url=pathToFileURL(resolve(out,'index.html')).href;
const browser=await chromium.launch({headless:true,executablePath:process.env.GRAMMAR_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
const page=await context.newPage();const errors=[],external=[];const checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
const record=(name,details)=>checks.push({name,passed:true,...details});
try {
  await page.goto(url);await page.waitForFunction(()=>window.GRAMMAR);
  assert.equal(await page.locator('.specimen svg').count(),3);
  const positions=await page.locator('.specimen svg').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {top:r.top,width:r.width,height:r.height};}));
  assert.ok(Math.max(...positions.map(p=>p.top))-Math.min(...positions.map(p=>p.top))<1);
  assert.ok(Math.max(...positions.map(p=>p.width))-Math.min(...positions.map(p=>p.width))<1);
  record('Direct file opening, SVG rendering and source-row alignment',{positions});
  await page.screenshot({path:resolve(out,'screenshots/01-opening.png')});
  await page.locator('#base').click();assert.equal(await page.evaluate(()=>GRAMMAR.state.side),'base');
  await page.screenshot({path:resolve(out,'screenshots/02-before.png')});
  await page.locator('#separate').click();assert.equal(await page.evaluate(()=>GRAMMAR.state.separated),true);
  assert.match(await page.locator('#figure-note').innerText(),/Alignment and intersection are suspended/);
  await page.locator('#separate').click();await page.locator('#head').click();
  record('Both revisions and reduced-motion separation');
  for(const key of ['resources','shutdown','startup']){
    await page.locator(`[data-consumer="${key}"]`).click();
    assert.equal(await page.evaluate(()=>GRAMMAR.state.selected),key);
    assert.ok(page.url().endsWith(`#decode-${key}`));
    const fields=await page.locator('.field-row').count();
    for(let i=0;i<fields;i++){
      const row=page.locator('.field-row').nth(i);await row.click();
      assert.equal(await row.getAttribute('aria-pressed'),'true');
      const name=await row.getAttribute('data-field');assert.ok((await page.locator('#field-reading').innerText()).includes(name));
      assert.equal(await page.locator(`#decoder-drawing [data-field="${name}"]`).getAttribute('r'),'7');
    }
    await page.locator('#decoder').scrollIntoViewIfNeeded();
    if(key==='startup')await page.screenshot({path:resolve(out,'screenshots/03-decoder.png')});
  }
  record('All three nonlinear exits and all 23 field selections');
  for(let i=1;i<=6;i++){
    await page.locator(`#reading-${i} .descend`).click();assert.ok(page.url().endsWith(`#mechanism-${i}`));
    await page.locator(`#mechanism-${i} .return`).click();assert.ok(page.url().endsWith(`#reading-${i}`));
  }
  record('All six linear mechanism descents and exact reading returns');
  const receiptButtons=page.locator('[data-source]');const count=await receiptButtons.count();
  for(let i=0;i<count;i++){
    const trigger=receiptButtons.nth(i);await trigger.click();
    assert.equal(await page.locator('#source-dialog').evaluate(n=>n.open),true);
    assert.ok((await page.locator('#source-code').innerText()).length>20);
    await page.keyboard.press('Escape');
    assert.equal(await trigger.evaluate(n=>n===document.activeElement),true);
  }
  record('Every source receipt opens, Escape closes, focus returns',{receipts:count});
  await page.locator('#glyph-resources').focus();await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>GRAMMAR.state.selected),'resources');
  await page.locator('#fields button').first().focus();await page.keyboard.press('Space');
  assert.equal(await page.locator('#fields button').first().getAttribute('aria-pressed'),'true');
  record('Keyboard glyph and field selection');
  await page.goto(`${url}#decode-startup`);assert.equal(await page.evaluate(()=>GRAMMAR.state.selected),'startup');
  await page.locator('#glyph-shutdown').click();await page.goBack();
  assert.equal(await page.evaluate(()=>GRAMMAR.state.selected),'startup');
  record('Direct fragment and browser Back preserve selected consumer');
  const layouts=[];
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});await page.goto(url);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,`Opening overflow at ${width}`);
    await page.locator('#glyph-resources').click();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`Decoder overflow at ${width}`);
    const badText=await page.locator('svg').evaluateAll(svgs=>svgs.flatMap(svg=>[...svg.querySelectorAll('text')].filter(n=>{const b=n.getBBox();return b.x<-.5||b.y<-.5||b.x+b.width>360.5||b.y+b.height>427.5;}).map(n=>n.textContent)));
    assert.deepEqual(badText,[],`SVG label bounds at ${width}`);
    if(width===390){await page.screenshot({path:resolve(out,'screenshots/04-mobile-decoder.png')});await page.goto(url);await page.screenshot({path:resolve(out,'screenshots/05-mobile-opening.png')});}
    layouts.push({width,overflow:false});
  }
  record('Responsive opening, decoder and SVG label bounds',{layouts});
  await page.setViewportSize({width:1440,height:1100});await page.goto(url);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('#separate').click();await page.waitForTimeout(450);
  assert.equal(await page.evaluate(()=>GRAMMAR.state.separated),true);
  await page.screenshot({path:resolve(out,'screenshots/06-separated.png')});await page.locator('#separate').click();await page.waitForTimeout(450);
  record('SVG.js animated separation and rejoin');
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('#decoder').isVisible(),false);assert.equal(await page.locator('#readings').isVisible(),true);
  await page.emulateMedia({media:'screen'});record('Print retains the complete reading');
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const fallback=await noJS.newPage();await fallback.goto(url);
  assert.equal(await fallback.locator('#readings li').count(),6);assert.equal(await fallback.locator('.mechanisms article').count(),6);
  await fallback.getByRole('link',{name:'source book',exact:true}).last().click();assert.ok((await fallback.locator('h1').innerText()).includes('source book'));
  await noJS.close();record('JavaScript-disabled readings, mechanisms and source-book navigation');
  const touch=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844}});const phone=await touch.newPage();await phone.goto(url);
  await phone.locator('#glyph-startup').tap();assert.equal(await phone.evaluate(()=>GRAMMAR.state.selected),'startup');
  await phone.locator('#fields button').first().tap();assert.equal(await phone.locator('#fields button').first().getAttribute('aria-pressed'),'true');
  await touch.close();record('Touch glyph and field selection');
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);record('No browser errors or external requests',{errors,external});
  writeFileSync(resolve(out,'evidence/browser-checks.json'),JSON.stringify({url,checks,errors,external},null,2)+'\n');
  console.log(`${checks.length} browser check groups passed; ${count} source buttons; 23 field selections.`);
} catch(error){
  writeFileSync(resolve(out,'evidence/browser-check-failure.json'),JSON.stringify({checks,errors,external,failure:error.stack},null,2)+'\n');
  throw error;
} finally {await browser.close();}
