// Local reading aid, adapted from experiment 54's capture approach.
// Captures are observations, not an automated assessment of understanding.
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/rich-review-05-browser/node_modules/playwright');
const out = dirname(fileURLToPath(import.meta.url));
const root = dirname(out);
const scope = JSON.parse(await readFile(join(out, process.env.REVIEW81_SCOPE || 'scope-start.json'), 'utf8'));
const markdownOnly = new Set([38,41,42,43,44,45,47,48,54,56,58,60]);
const wanted = new Set(process.argv.slice(2).map(Number));
const entries = scope.records.filter(r => r.readme_present && !markdownOnly.has(Number(r.experiment.slice(0,2))) && (!wanted.size || wanted.has(Number(r.experiment.slice(0,2))))).map(r => ({folder:r.experiment,entry:r.experiment.startsWith('22-')?'game.html':r.experiment.startsWith('55-')?'review.html':'index.html'}));
for (const [id, names] of [[31,['method.html','record.html']],[32,['kit.html']],[33,['failure.html']],[49,['variants/original/23/index.html','variants/revised/23/index.html','variants/original/29/index.html','variants/revised/29/index.html']],[52,['compact.html','fuller.html']],[59,['baseline-52/compact.html','baseline-52/fuller.html']]]) {
  const folder=scope.records.find(r=>Number(r.experiment.slice(0,2))===id)?.experiment;
  if (folder && (!wanted.size || wanted.has(id))) for (const entry of names) entries.push({folder,entry});
}
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.mp3':'audio/mpeg','.mp4':'video/mp4'};
const server=createServer(async(req,res)=>{
 try {
  const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));
  if (!path.startsWith(root+'/')) {res.writeHead(403);res.end();return;}
  const file=(await stat(path)).isDirectory()?join(path,'index.html'):path;
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(await readFile(file));
 } catch {res.writeHead(404);res.end('Not found');}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
await mkdir(join(out,'reading'),{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await context.route('**/*',r=>r.request().url().startsWith(base)||r.request().url().startsWith('data:')||r.request().url().startsWith('blob:')?r.continue():r.abort());
const manifest=[];
try {
 for (const {folder,entry} of entries) {
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const key=folder+'--'+entry.replaceAll('/','--').replace('.html','');
  try {
   await page.goto(`${base}/${folder}/${entry}`,{waitUntil:'load',timeout:15000});
   await page.waitForTimeout(250);
   const data=await page.evaluate(()=>({title:document.title,visibleText:document.body.innerText,
    svgText:[...document.querySelectorAll('svg text')].filter(e=>e.getBoundingClientRect().width).map(e=>e.textContent).join('\n'),
    headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(e=>({tag:e.tagName,id:e.id,text:e.innerText,y:Math.round(e.getBoundingClientRect().top+scrollY)})),
    controls:[...document.querySelectorAll('button,select,input,summary,a[href^="#"]')].map(e=>({tag:e.tagName,id:e.id,text:(e.innerText||e.getAttribute('aria-label')||'').slice(0,180),href:e.getAttribute('href'),visible:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)})),
    scrollHeight:document.documentElement.scrollHeight,viewport:{width:innerWidth,height:innerHeight}}));
   await writeFile(join(out,'reading',key+'.txt'),data.visibleText+'\n\n[SVG text in document order]\n'+data.svgText+'\n');
   delete data.visibleText;delete data.svgText;
   await writeFile(join(out,'reading',key+'.json'),JSON.stringify({...data,errors},null,2)+'\n');
   await page.screenshot({path:join(out,'reading',key+'.png')});
   manifest.push({folder,entry,key,errors});
  } catch(e) {manifest.push({folder,entry,key,error:e.message});}
  await page.close();
 }
} finally {await context.close();await browser.close();await new Promise(r=>server.close(r));}
await writeFile(join(out,'reading',wanted.size?'manifest-selected.json':'manifest.json'),JSON.stringify({captured_utc:new Date().toISOString(),entries:manifest},null,2)+'\n');
console.log(JSON.stringify({captured:manifest.length,failures:manifest.filter(e=>e.error),pageErrors:manifest.filter(e=>e.errors?.length)}));
