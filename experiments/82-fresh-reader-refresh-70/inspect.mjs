import {chromium} from '/tmp/rich-review-05-browser/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const root='/Users/moyaseen/projects/rich-review-v2';
const out=path.join(root,'experiments/82-fresh-reader-refresh-70');
const routes=JSON.parse(fs.readFileSync(path.join(out,'routes.json'),'utf8'));
const scenarios=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const browser=await chromium.launch({headless:true,executablePath:'/Users/moyaseen/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
const log=[];
for(const s of scenarios){
 const r=routes.find(x=>x.id===s.id); const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await context.route(/^https?:/,r=>r.abort()); const p=await context.newPage();
 try{
  await p.goto('file://'+path.join(root,'experiments',r.experiment,r.entry),{waitUntil:'load',timeout:20000});
  for(const a of s.actions){
   if(a.key){await p.keyboard.press(a.key);continue;}
   let loc=a.role?p.getByRole(a.role,{name:a.name,exact:!!a.exact}):p.locator(a.selector);
   if(a.text)loc=loc.filter({hasText:a.text});
   loc=loc.nth(a.nth||0);
   if(a.select)await loc.selectOption(a.select);else if(a.fill!==undefined)await loc.fill(a.fill);else await loc.click({timeout:5000});
  }
  await p.waitForTimeout(250);
  const data=await p.evaluate(()=>({title:document.title,url:location.href,text:document.body.innerText,controls:[...document.querySelectorAll('button,a,summary,select,input')].filter(e=>e.getClientRects().length).map(e=>({tag:e.tagName,id:e.id,text:(e.innerText||e.getAttribute('aria-label')||'').slice(0,160),href:e.getAttribute('href'),data:Object.fromEntries([...e.attributes].filter(a=>a.name.startsWith('data-')).map(a=>[a.name,a.value]))}))}));
  const name=s.id+'-'+s.label;
  fs.writeFileSync(path.join(out,'captures',name+'.json'),JSON.stringify({...s,captured_utc:new Date().toISOString(),...data},null,2)+'\n');
  fs.writeFileSync(path.join(out,'captures',name+'.txt'),data.text+'\n');
  await p.screenshot({path:path.join(out,'captures',name+'.png')});
  log.push({...s,chars:data.text.length,ok:true});
 }catch(e){log.push({...s,ok:false,error:e.message});}
 await context.close();
}
await browser.close();
fs.writeFileSync(process.argv[2].replace(/\.json$/, '-result.json'),JSON.stringify(log,null,2)+'\n');
console.log(JSON.stringify(log,null,2));
