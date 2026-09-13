const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('/tmp/rich-review-05-browser/node_modules/playwright');
const {snapshot,routes}=require('./capture.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Users/moyaseen/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8755/')?r.continue():r.abort());
 const page=await context.newPage(); page.setDefaultTimeout(4000);
 const actions=[
  ['01','pr127',async()=>page.locator('[data-subject="pr127"]').first().click()],
  ['20','pr131',async()=>page.locator('[data-pr="131"]').click()],
  ...[4,8,25,26].map(n=>['07','stop-'+n,async()=>page.locator(`[data-jump="${n}"]`).first().click()]),
  ...[0,1,2,3,4,5].map(n=>['21','film-'+n,async()=>page.locator(`[data-chapter="${n}"]`).click()]),
  ...['23','49-original23','49-revised23'].map(id=>[id,'public-room',async()=>page.locator('button').filter({hasText:/^ENTER/}).nth(1).click()]),
  ...['23','49-original23','49-revised23'].map(id=>[id,'client-choice',async()=>page.locator('[data-decision="D04"]').click()]),
  ...['23','49-original23','49-revised23'].map(id=>[id,'auth-choice',async()=>page.locator('[data-decision="D13"]').click()]),
  ['24','release',async()=>page.locator('[data-go="release"]').first().click()],
  ['27','adapters',async()=>page.locator('summary').filter({hasText:'Keep tiny test knobs'}).click()],
  ...['29','49-original29','49-revised29'].map(id=>[id,'auth',async()=>page.locator('summary').filter({hasText:'B4'}).click()]),
  ...['29','49-original29','49-revised29'].map(id=>[id,'clock',async()=>page.locator('summary').filter({hasText:'A1'}).click()]),
  ['37','tests-mechanism',async()=>page.locator('[data-cell="11,2"]').click()],
 ];
 const log=[];
 for(const [id,state,act] of actions){
  const route=routes.find(r=>r.id===id);
  try{
   await page.goto(`http://127.0.0.1:8755/experiments/${route.folder}/${route.file}`,{waitUntil:'load'});
   await act();
   await page.waitForTimeout(800); // allow camera transitions and rendering to finish
   const result=await snapshot(page,route,state);
   if(['public-room','adapters','client-choice'].includes(state)) await page.screenshot({path:path.join(__dirname,'screenshots',id+'-'+state+'.png')});
   log.push({id,state,ok:true,length:result.text.length});
  }catch(e){log.push({id,state,ok:false,error:e.message})}
 }
 fs.writeFileSync(path.join(__dirname,'descent-log.json'),JSON.stringify(log,null,2)+'\n');
 console.log(JSON.stringify(log,null,2)); await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
