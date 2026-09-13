import {createRequire} from 'node:module';
import {readFile,writeFile} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const {chromium}=createRequire(import.meta.url)('/tmp/rich-review-05-browser/node_modules/playwright');
const out=dirname(fileURLToPath(import.meta.url));
const browser=await chromium.launch({headless:true,channel:'chrome'});
const records=[],errors=[],requests=[];
try {
 for(const width of [1440,768,390,320]){
  const context=await browser.newContext({viewport:{width,height:950},javaScriptEnabled:false});
  await context.route(/^https?:/,r=>{requests.push(r.request().url());return r.abort();});
  const p=await context.newPage();p.setDefaultTimeout(4000);p.on('pageerror',e=>errors.push(e.message));
  await p.goto(pathToFileURL(join(out,'index.html')).href);
  if(width===1440)await p.screenshot({path:join(out,'screenshots/01-report-opening.png')});
  for(const details of await p.locator('details').all())await details.locator('summary').click();
  const dimensions=await p.evaluate(()=>({innerWidth,documentWidth:document.documentElement.scrollWidth,openDetails:document.querySelectorAll('details[open]').length}));
  if(dimensions.documentWidth>width)throw new Error('Report overflow '+width);
  await p.locator('a[href="#t5"]').first().click();
  if(!p.url().endsWith('#t5'))throw new Error('Helper route missing');
  if(width===390)await p.screenshot({path:join(out,'screenshots/04-helper-audit-phone.png')});
  await p.locator('#t5 a[href="#descendants"]').click();
  const returned=p.url().split('#')[1];
  await p.goto(pathToFileURL(join(out,'witnesses/program-head.html')).href+'#L7');
  const source=await p.locator('#L7').innerText();
  if(!source.includes('@symnav/daemon'))throw new Error('Source witness missing import');
  await p.goBack();
  records.push({width,javaScript:false,...dimensions,returnAnchor:returned,sourceWitness:source});
  await context.close();
 }
}finally{await browser.close();}
await writeFile(join(out,'observations/report-browser.json'),JSON.stringify({created:new Date().toISOString(),errors,requests,records},null,2)+'\n');
console.log(JSON.stringify({viewports:records.length,errors,requests}));
