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
 await inspect(36,async(p,s)=>{await p.getByRole('button',{name:'At the service return',exact:true}).click();await p.locator('#channel').selectOption({label:'R · Reference locations'});await s('service-reference');});
 await inspect(64,async(p,s)=>{await p.locator('#checkpoint').click();await s('split');await p.getByRole('button',{name:'Release, then reject',exact:true}).click();await p.locator('#scrub').focus();await p.locator('#scrub').press('End');await s('rejected');});
 await inspect(65,async(p,s)=>{await p.locator('#lift').click();await s('lift-148');await p.locator('#scrub').focus();await p.locator('#scrub').press('End');await p.locator('#lift').click();await s('lift-149');});
 await inspect(68,async(p,s)=>{await p.getByRole('button',{name:'03 Mechanism',exact:true}).click();await s('record-starting');await p.locator('#sample').selectOption({label:'Pong: wrong version + starting'});await p.locator('#find-return').click();await s('pong-version');await p.getByRole('button',{name:'04 Evidence',exact:true}).click();await s('evidence');await p.locator('#up').click();await s('return-to-mechanism');});
 await inspect(69,async(p,s)=>{await p.getByRole('button',{name:'04 Hold',exact:true}).click();await p.locator('#held-token').hover();await p.mouse.down();await s('holding');await p.mouse.up();await s('released');});
 await inspect(70,async(p,s)=>{await p.getByRole('button',{name:'Registry',exact:true}).click();await s('registry');await p.locator('#base').click();await s('before');});
 await inspect(72,async(p,s)=>{await p.locator('select').first().selectOption({label:'04 · A lying retry bit'});await p.getByRole('button',{name:/Show outcome/}).click();await s('lying-retry-bit');});
 await inspect(74,async(p,s)=>{await p.getByRole('button',{name:'Same value 250 ms',exact:true}).click();await s('equal-values');await p.getByRole('button',{name:'3 Receipts',exact:true}).click();await p.locator('#row-select').selectOption({label:'Worker boundary'});await p.locator('#slice-select').selectOption({label:'Output'});await s('worker-receipts');await p.locator('#row-select').selectOption({label:'Command capture'});await s('capture-receipts');});
 await inspect(75,async(p,s)=>{await p.locator('#scenario').selectOption({label:'Hold the first append'});await p.locator('#next').click();await p.locator('#next').click();await s('append-pending');await p.locator('#release-append').click();await s('append-released');});
 await inspect(77,async(p,s)=>{await p.getByRole('button',{name:'02 Follow active use',exact:true}).click();await s('active-film');await p.getByRole('button',{name:'03 Watch tests move',exact:true}).click();await s('test-film');await p.locator('#inline-inspect').click();await s('source');await p.keyboard.press('Escape');await s('source-return');});
 await inspect(78,async(p,s)=>{await p.getByRole('button',{name:/03 Gate/}).click();await s('gate-head');await p.getByRole('button',{name:'Base #126',exact:true}).click();await s('gate-base');await p.getByRole('button',{name:'Head #127',exact:true}).click();await p.locator('#openness').focus();await p.locator('#openness').press('End');await s('opened-head');});
 await inspect(79,async(p,s)=>{
  await p.waitForFunction(()=>window.__pinballReady);
  const series=[];
  async function run(label,group,variant,checkpoints=[]){
   await p.getByRole('button',{name:new RegExp(group)}).click();await p.locator('#variant').selectOption(variant);
   let count=0;
   while(!(await p.locator('#step').isDisabled()) && count++<30){
    await p.locator('#step').click();
    const state=await p.evaluate(()=>({title:document.querySelector('#event-title').textContent,detail:document.querySelector('#event-detail').textContent,delivery:document.querySelector('#delivery-state').textContent,capture:document.querySelector('#capture-state').textContent,reattach:document.querySelector('#light-reattach').textContent,fetch:document.querySelector('#light-fetch').textContent,code:document.querySelector('#failure-code').textContent}));
    series.push({variant,...state});
    if(checkpoints.some(x=>state.title.includes(x))){await s(label+'-checkpoint-'+count);}
   }
   await p.locator('#local-gate').click();await s(label+'-gate');
  }
  await run('refusal','At admission','pressure',['Local gate opens']);
  await run('forged-bit','At admission','contradiction',['wire claim']);
  await run('reattach','Connection lost','reattach',['Reattach the identical','Original acceptance']);
  await run('fetch','Delivery interrupted','fetch',['Fetch record offset','Same capture']);
  await run('resource-exit','Worker lost','controlled-exit',['worker-exit']);
  await p.locator('#record').click();await s('recording');await p.keyboard.press('Escape');await s('recording-return');
  await writeFile(join(out,'operations','79-sequences.json'),JSON.stringify(series,null,2)+'\n');
 });
} finally{await context.close();await browser.close();}
await writeFile(join(out,'operations','manifest.json'),JSON.stringify({captured_utc:new Date().toISOString(),events},null,2)+'\n');
console.log(JSON.stringify({saved:events.filter(e=>e.label).length,issues:events.filter(e=>e.error||e.errors?.length)}));
