import { chromium } from '/tmp/rich-review-05-browser/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = '/Users/moyaseen/projects/rich-review-v2';
const out = path.join(root, 'experiments/82-fresh-reader-refresh-70');
const dirs = fs.readdirSync(path.join(root, 'experiments'));
const primary = [...Array.from({length:37},(_,i)=>i+1),40,49,50,51,53,...Array.from({length:19},(_,i)=>i+61)];
const routes = primary.map(n=>({id:String(n).padStart(2,'0'),experiment:dirs.find(d=>d.startsWith(String(n).padStart(2,'0')+'-')),entry:n===22?'game.html':'index.html'}));
for (const [n,id,entry] of [[21,'21-video','video.html'],[32,'32-starter','starter.html'],[33,'33-failure','failure.html'],[49,'49-original23','variants/original/23/index.html'],[49,'49-revised23','variants/revised/23/index.html'],[49,'49-original29','variants/original/29/index.html'],[49,'49-revised29','variants/revised/29/index.html'],[52,'52-compact','compact.html'],[52,'52-fuller','fuller.html'],[52,'52-transfer','transfer-before.html'],[59,'59-compact','baseline-52/compact.html'],[59,'59-fuller','baseline-52/fuller.html']]) {
  routes.push({id,experiment:dirs.find(d=>d.startsWith(String(n).padStart(2,'0')+'-')),entry});
}
routes.sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
fs.writeFileSync(path.join(out,'routes.json'),JSON.stringify(routes,null,2)+'\n');
const selected = process.argv.slice(2);
const browser = await chromium.launch({headless:true,executablePath:'/Users/moyaseen/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
for (const route of routes.filter(r=>!selected.length || selected.includes(r.id))) {
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await context.route(/^https?:/,r=>r.abort());
  const page=await context.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const input=path.join(root,'experiments',route.experiment,route.entry);
  try {
    await page.goto('file://'+input,{waitUntil:'load',timeout:25000});
    await page.waitForTimeout(200);
    const data=await page.evaluate(()=>({title:document.title,url:location.href,text:document.body.innerText,headings:[...document.querySelectorAll('h1,h2,h3,h4')].filter(e=>e.getClientRects().length).map(e=>({tag:e.tagName,id:e.id,text:e.innerText})),controls:[...document.querySelectorAll('button,a,summary,select,[role=button],input')].filter(e=>e.getClientRects().length).map(e=>({tag:e.tagName,id:e.id,text:(e.innerText||e.getAttribute('aria-label')||e.getAttribute('title')||'').slice(0,160),href:e.getAttribute('href'),data:Object.fromEntries([...e.attributes].filter(a=>a.name.startsWith('data-')).map(a=>[a.name,a.value]))}))}));
    fs.writeFileSync(path.join(out,'captures',route.id+'-initial.json'),JSON.stringify({...route,captured_utc:new Date().toISOString(),entry_sha256:crypto.createHash('sha256').update(fs.readFileSync(input)).digest('hex'),errors,...data},null,2)+'\n');
    fs.writeFileSync(path.join(out,'captures',route.id+'-initial.txt'),data.text+'\n');
    await page.screenshot({path:path.join(out,'captures',route.id+'-initial.png')});
    console.log(JSON.stringify({id:route.id,title:data.title,chars:data.text.length,controls:data.controls.length,errors}));
  } catch(e) {console.log(JSON.stringify({id:route.id,error:e.message}));}
  await context.close();
}
await browser.close();
