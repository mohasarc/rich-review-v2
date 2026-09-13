// Independent offline browser inspection. Writes only to this experiment.
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.REVIEW54_PLAYWRIGHT || '/tmp/rich-review-05-browser/node_modules/playwright');
const out = dirname(fileURLToPath(import.meta.url));
const experiments = dirname(out);
const scope = JSON.parse(await readFile(join(out, 'scope-start.json'), 'utf8'));
const markdownOnly = new Set([38,41,42,43,44,45,47,48]);
const wanted = new Set(process.argv.slice(2).map(Number));
const entries = scope.records.filter(r => wanted.size ? wanted.has(Number(r.experiment.slice(0,2))) : r.readme_present && !markdownOnly.has(Number(r.experiment.slice(0,2))) && r.experiment !== '54-critique-refresh-50').map(r => ({folder:r.experiment, entry:Number(r.experiment.slice(0,2)) === 22 ? 'game.html' : 'index.html'}));
if (!wanted.size) entries.push({folder:'33-pair-one-variable',entry:'failure.html'}, {folder:'52-critique-response-52',entry:'compact.html'}, {folder:'52-critique-response-52',entry:'fuller.html'});
await mkdir(join(out,'reading'), {recursive:true});
const browser = await chromium.launch({headless:true,channel:'chrome'});
const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await context.route(/^https?:/, route=>route.abort());
const p = await context.newPage();
const manifest=[];
try {
  for (const {folder,entry} of entries) {
    const key=folder+'--'+entry.replace('.html','');
    const errors=[];
    const listener=e=>errors.push(e.message);
    p.on('pageerror',listener);
    try {
      await p.goto(pathToFileURL(join(experiments,folder,entry)).href,{waitUntil:'load',timeout:15000});
      await p.evaluate(()=>new Promise(requestAnimationFrame));
      const data=await p.evaluate(()=>({
        title:document.title, visibleText:document.body.innerText,
        svgText:[...document.querySelectorAll('svg text')].filter(e=>e.getBoundingClientRect().width).map(e=>e.textContent).join('\n'),
        headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(e=>({tag:e.tagName,id:e.id,text:e.innerText,y:Math.round(e.getBoundingClientRect().top+scrollY)})),
        controls:[...document.querySelectorAll('button,select,input,summary,a[href^="#"]')].map(e=>({tag:e.tagName,id:e.id,text:(e.innerText||e.getAttribute('aria-label')||'').slice(0,200),href:e.getAttribute('href'),visible:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)})),
        scrollHeight:document.documentElement.scrollHeight,
        viewport:{width:innerWidth,height:innerHeight}
      }));
      await writeFile(join(out,'reading',key+'.txt'),data.visibleText+'\n\n[SVG labels, document order]\n'+data.svgText+'\n');
      delete data.visibleText; delete data.svgText;
      await writeFile(join(out,'reading',key+'.json'),JSON.stringify({...data,errors},null,2)+'\n');
      if ([1,5,7,11,13,14,15,17,22,23,29,36,37,40,49,50,51,52,53].includes(Number(folder.slice(0,2)))) await p.screenshot({path:join(out,'reading',key+'.png')});
      manifest.push({folder,entry,capture:key,errors});
    } catch(e) { manifest.push({folder,entry,error:e.message}); }
    p.off('pageerror',listener);
  }
} finally {await context.close();await browser.close();}
await writeFile(join(out,'reading',wanted.size?'manifest-late.json':'manifest.json'),JSON.stringify({captured_utc:new Date().toISOString(),entries:manifest},null,2)+'\n');
console.log(JSON.stringify({captured:manifest.length,failures:manifest.filter(e=>e.error),pageErrors:manifest.filter(e=>e.errors?.length)}));
