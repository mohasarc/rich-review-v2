// Correct two operator mistakes in inspect.mjs; no changes to reviewed pages.
import {createRequire} from 'node:module';
import {readFile, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/rich-review-05-browser/node_modules/playwright');
const out=dirname(fileURLToPath(import.meta.url));
const scope=JSON.parse(await readFile(join(out,'scope-final.json'),'utf8'));
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await context.route(/^https?:/,r=>r.abort());
const events=[];
async function inspect(n,fn){
  const page=await context.newPage();page.setDefaultTimeout(5000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const folder=scope.records.find(r=>Number(r.experiment.slice(0,2))===n).experiment;
  async function save(label){
    await page.waitForTimeout(200);
    const state=await page.evaluate(()=>({text:document.body.innerText,hash:location.hash,
      selected:[...document.querySelectorAll('select')].map(e=>({id:e.id,value:e.value,label:e.selectedOptions[0]?.textContent})),
      focus:document.activeElement?.id,scrollY}));
    const key=`${n}-${label}`;
    await writeFile(join(out,'operations',key+'.txt'),state.text+'\n');delete state.text;
    await writeFile(join(out,'operations',key+'.json'),JSON.stringify(state,null,2)+'\n');
    await page.screenshot({path:join(out,'operations',key+'.png')});
    events.push({n,label,...state,errors:[...errors]});
  }
  try{await page.goto(pathToFileURL(join(dirname(out),folder,'index.html')).href,{waitUntil:'load'});await fn(page,save);}
  catch(e){events.push({n,error:e.message,errors});}
  finally{await page.close();}
}
try{
  await inspect(69,async(p,s)=>{
    await p.getByRole('button',{name:'04 Hold',exact:true}).click();
    await p.locator('#held-token').hover();await p.mouse.down();await s('pointer-held-p0');
    await p.mouse.up();await s('pointer-released-p0');
  });
  await inspect(75,async(p,s)=>{
    await p.locator('#scenario').selectOption({label:'Hold the first append'});
    await p.locator('#next').click();await p.locator('#next').click();await s('append-pending');
    await p.locator('#release-append').click();await s('append-released');
  });
}finally{
  await writeFile(join(out,'operations','recheck-manifest.json'),JSON.stringify({captured_utc:new Date().toISOString(),events},null,2)+'\n');
  await context.close();await browser.close();
}
console.log(JSON.stringify({saved:events.filter(e=>e.label).length,issues:events.filter(e=>e.error||e.errors?.length)}));
