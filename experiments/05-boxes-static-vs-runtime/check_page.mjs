// Browser checks for the artifact only. Never executes or mutates symnav.
// Usage: PLAYWRIGHT_PACKAGE=/path/to/playwright node check_page.mjs
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const folder = dirname(fileURLToPath(import.meta.url));
const executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors = [];
page.on('pageerror',error=>errors.push(error.message));
const network=[];
page.on('request',request=>{if(/^https?:/.test(request.url()))network.push(request.url());});
const url=pathToFileURL(join(folder,'index.html')).href;
await page.goto(url);
await page.waitForSelector('.decision-card');
assert.equal(await page.locator('.decision-card').count(),12);
assert.equal(await page.locator('.diagram-scroll svg').count(),2);
assert.equal(await page.locator('#policy-rows tr').count(),39);
assert.equal(await page.locator('.file-row').count(),60);
const missing=await page.evaluate(()=>{
  const missing=[];
  for(const d of window.DECISIONS)for(const [file,needle] of d.refs)if(!window.EVIDENCE.files[file]?.head?.includes(needle))missing.push({id:d.id,file,needle});
  for(const a of document.querySelectorAll('a[href^="#"]'))if(!document.getElementById(a.getAttribute('href').slice(1)))missing.push({href:a.getAttribute('href')});
  return missing;
});
assert.deepEqual(missing,[]);
for(const revision of ['base','head','delta']) {
  await page.locator(`#map-controls button[data-version="${revision}"]`).click();
  assert.equal(await page.locator('body').getAttribute('data-version'),revision);
  const newEdges=await page.locator('.edge.new:visible').count();
  const oldEdges=await page.locator('.edge.old:visible').count();
  if(revision==='base'){assert.equal(newEdges,0);assert.ok(oldEdges>0);}
  if(revision==='head'){assert.equal(oldEdges,0);assert.ok(newEdges>0);}
  if(revision==='delta'){assert.ok(newEdges>0);assert.ok(oldEdges>0);}
}
await page.selectOption('#focus-picker','output');
assert.ok(await page.locator('.topic.dimmed').count()>0);
await page.selectOption('#focus-picker','all');
await page.locator('#runtime-svg a[href="#decision-output"]').first().click();
assert.equal(await page.locator('#decision-output').getAttribute('open'),'');
await page.locator('#decision-output [data-evidence]').first().click();
assert.ok(await page.locator('#evidence-dialog').isVisible());
await page.locator('[data-source-mode="base"]').click();
await page.locator('[data-source-mode="patch"]').click();
await page.selectOption('#evidence-file','apps/cli/test/helpers/daemon-controller.ts');
await page.locator('[data-source-mode="base"]').click();
assert.match(await page.locator('#code-view').innerText(),/File absent/);
await page.keyboard.press('Escape');
assert.equal(await page.locator('#evidence-dialog').isVisible(),false);
await page.goto(url+'#decision-fixtures');
assert.equal(await page.locator('#decision-fixtures').getAttribute('open'),'');
await page.locator('#policy-table .supplement').first().locator('summary').click();
await page.locator('#policy-search').fill('acknowledgement');
assert.ok(await page.locator('#policy-rows tr:visible').count()>0);
assert.ok(await page.locator('#policy-rows tr:visible').count()<39);
await page.locator('#policy-search').fill('');
await page.locator('#policy-table .supplement').first().locator('summary').click();
await page.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=false));
await page.goto(url);
await page.waitForSelector('#runtime-svg svg');
const svgOverflow=await page.evaluate(()=>{
  const issues=[];
  for(const a of document.querySelectorAll('.diagram-scroll a')){
    if(!a.getClientRects().length)continue;
    const rect=a.querySelector('rect');if(!rect)continue;
    const bounds=rect.getBBox();
    for(const text of a.querySelectorAll('text')){
      const b=text.getBBox();if(b.x+b.width>bounds.x+bounds.width-3)issues.push({text:text.textContent,overflow:Math.round(b.x+b.width-bounds.x-bounds.width)});
    }
  }
  return issues;
});
assert.deepEqual(svgOverflow,[]);
await mkdir(join(folder,'screenshots'),{recursive:true});
await page.mouse.move(0,0);
await page.screenshot({path:join(folder,'screenshots','02-opening.png')});
const screenshotStyle='.map-controls{position:static!important}';
await page.locator('#static-map').screenshot({path:join(folder,'screenshots','03-static.png'),style:screenshotStyle});
await page.locator('#runtime-map').screenshot({path:join(folder,'screenshots','04-runtime.png'),style:screenshotStyle});
const clip=await page.evaluate(()=>{const a=document.getElementById('static-map').getBoundingClientRect();const b=document.getElementById('runtime-map').getBoundingClientRect();return{x:Math.floor(a.x),y:Math.floor(a.y+scrollY),width:Math.ceil(a.width),height:Math.ceil(b.bottom-a.top)};});
await page.screenshot({path:join(folder,'screenshots','01-maps.png'),clip,fullPage:true,style:screenshotStyle});
await page.setViewportSize({width:390,height:844});
await page.goto(url);
await page.waitForSelector('#static-svg svg');
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
assert.ok(await page.locator('.diagram-scroll').first().evaluate(el=>el.scrollWidth>el.clientWidth));
await page.screenshot({path:join(folder,'screenshots','05-mobile.png')});
await page.goto(url+'#decision-attempts');
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
await page.locator('#decision-attempts [data-evidence]').first().click();
assert.ok(await page.locator('#evidence-dialog').isVisible());
await page.keyboard.press('Escape');
assert.deepEqual(errors,[]);
assert.deepEqual(network,[]);
const result={status:'passed',scope:'artifact browser behavior and evidence-link integrity only',checks:['12 decision cards and expandable mechanisms','2 SVG maps','39 policy leaves','60 changed-file links','all source anchors resolve','all local anchors resolve','before/after/changes edge visibility','shared focus selection','diagram → mechanism navigation','base/head/diff evidence viewer','new-file absence in base','Escape closes evidence modal','direct deep links open target','policy table filtering','SVG node text fits bounds','390 px layout has no document overflow','mobile maps pan horizontally','mobile evidence dialog','no JavaScript page errors','no HTTP(S) requests'],screenshots:['01-maps.png','02-opening.png','03-static.png','04-runtime.png','05-mobile.png']};
await writeFile(join(folder,'validation.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
await browser.close();
