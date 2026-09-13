// Read-only reading harness adapted from 81; selected current routes plus new 78/79 operations.
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/rich-review-05-browser/node_modules/playwright');
const out=dirname(fileURLToPath(import.meta.url));
const scope=JSON.parse(await readFile(join(out,'scope-start.json'),'utf8'));
await mkdir(join(out,'operations'),{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await context.route(/^https?:/,r=>r.abort());
const events=[];
async function inspect(n,fn){
 const page=await context.newPage();page.setDefaultTimeout(5000);
 const folder=scope.records.find(r=>Number(r.experiment.slice(0,2))===n).experiment;
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 async function save(label){
  await page.waitForTimeout(400);
  const state=await page.evaluate(()=>({text:document.body.innerText,hash:location.hash,
    selected:[...document.querySelectorAll('select')].map(e=>({id:e.id,value:e.value,label:e.selectedOptions[0]?.textContent})),
    pressed:[...document.querySelectorAll('[aria-pressed="true"],[aria-selected="true"]')].map(e=>({id:e.id,text:e.textContent})),
    focus:document.activeElement?.id,scrollY,viewport:{width:innerWidth,height:innerHeight}}));
  const key=`${n}-${label}`;
  await writeFile(join(out,'operations',key+'.txt'),state.text+'\n');delete state.text;
  await writeFile(join(out,'operations',key+'.json'),JSON.stringify(state,null,2)+'\n');
  await page.screenshot({path:join(out,'operations',key+'.png')});events.push({n,label,...state,errors:[...errors]});
 }
 try{await page.goto(pathToFileURL(join(dirname(out),folder,'index.html')).href,{waitUntil:'load'});await fn(page,save);}
 catch(e){events.push({n,error:e.message,errors});}
 finally{await page.close();}
}
try {
 await inspect(1,async(p,s)=>{await p.getByRole('link',{name:'Inside #127',exact:true}).first().click();await s('pr127-tab');});
 await inspect(20,async(p,s)=>{await p.getByRole('button',{name:/#131.*Policy consumers/s}).click();await s('pr131-tab');});
 await inspect(37,async(p,s)=>{await p.getByRole('button',{name:'Evidence',exact:true}).click();await s('evidence-owner');await p.getByRole('button',{name:/Release clears now/}).click();await s('evidence-release');});
} finally{await context.close();await browser.close();}
await writeFile(join(out,'operations','supplement-manifest.json'),JSON.stringify({captured_utc:new Date().toISOString(),events},null,2)+'\n');
console.log(JSON.stringify({saved:events.filter(e=>e.label).length,issues:events.filter(e=>e.error||e.errors?.length)}));
