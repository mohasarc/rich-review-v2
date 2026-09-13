import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('/tmp/rich-review-05-browser/node_modules/playwright');
const out=dirname(fileURLToPath(import.meta.url));
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await context.route(/^https?:/,r=>r.abort());
const p=await context.newPage();p.setDefaultTimeout(5000);
const errors=[],events=[];p.on('pageerror',e=>errors.push(e.message));
async function save(label){
 const state=await p.evaluate(()=>({model:window.morphology.state,hash:location.hash,focus:document.activeElement?.outerHTML.slice(0,500)}));
 const key='80-'+label;
 await writeFile(join(out,'operations',key+'.txt'),await p.locator('body').innerText());
 await writeFile(join(out,'operations',key+'.json'),JSON.stringify(state,null,2)+'\n');
 await p.screenshot({path:join(out,'operations',key+'.png')});
 events.push({label,...state});
}
try{
 await p.goto(pathToFileURL(join(dirname(out),'80-typographic-morphology/index.html')).href);
 await p.locator('[data-index="6"]').click();await save('staged');
 await p.locator('[data-reading="copies"]').first().click();await save('copy-receipt');
 await p.keyboard.press('Escape');await save('copy-return');
 await p.locator('[data-index="7"]').click();await save('consolidated');
 await p.locator('[data-reading="delivery"]').filter({visible:true}).first().click();await save('private-method');
 await p.keyboard.press('Escape');
 await p.locator('[data-reading="tests"]').filter({visible:true}).first().click();await save('test-receipt');
}catch(e){errors.push(e.message);}
finally{await context.close();await browser.close();}
await writeFile(join(out,'operations','80-manifest.json'),JSON.stringify({captured_utc:new Date().toISOString(),events,errors},null,2)+'\n');
console.log(JSON.stringify({saved:events.length,errors}));
