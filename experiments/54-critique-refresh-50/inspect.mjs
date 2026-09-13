import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const {chromium}=createRequire(import.meta.url)('/tmp/rich-review-05-browser/node_modules/playwright');
const out=dirname(fileURLToPath(import.meta.url)), root=dirname(out);
await mkdir(join(out,'reading/routes'),{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await context.route(/^https?:/,r=>r.abort());
const p=await context.newPage(); p.setDefaultTimeout(4000);
const records=[];
const open=async(folder,entry='index.html')=>{
  const [file,fragment]=entry.split('#');
  const url=pathToFileURL(join(root,folder,file));
  if(fragment)url.hash=fragment;
  return p.goto(url.href);
};
const capture=async(name,selector='body',shot=false)=>{
  await p.evaluate(()=>new Promise(requestAnimationFrame));
  const text=await p.locator(selector).innerText();
  await writeFile(join(out,'reading/routes',name+'.txt'),text+'\n');
  if(shot) await p.screenshot({path:join(out,'reading/routes',name+'.png')});
  records.push({name,url:p.url(),selector});
};
const run=async(name,fn)=>{if(process.argv[2]&&!name.startsWith(process.argv[2]))return;try{await fn();}catch(e){records.push({name,harnessError:e.message});}};
try {
  await run('16 dependencies',async()=>{
    await open('16-drag-the-box');
    await p.getByRole('button',{name:'Lifetime → daemon',exact:true}).click();
    await capture('16-move');
    await p.locator('#repair').check();
    await capture('16-repair');
  });
  await run('30 gates',async()=>{
    await open('30-adjacent-pair');
    for(const [id,key] of [['finish-worker','worker'],['finish-first','first'],['finish-latest','latest'],['finish-sample','sample']]) {
      await p.locator('#'+id).click(); await capture('30-'+key,'#lab',key==='sample');
    }
  });
  await run('36 return view',async()=>{
    await open('36-be-weird-a');
    const options=await p.locator('#channel option').evaluateAll(es=>es.map(e=>({value:e.value,label:e.textContent})));
    const choice=options.find(e=>/reference/i.test(e.label));
    await p.locator('#channel').selectOption(choice.value);
    await capture('36-cached');
    await p.locator('[data-lens="returned"]').click();
    await capture('36-returned','body',true);
  });
  await run('23 policy and token',async()=>{
    await open('23-zoom-canvas');
    for(const id of ['D04','D13']){
      await p.locator('[data-decision="'+id+'"]').click();
      await p.waitForTimeout(800);
      await capture('23-'+id,'body',true);
      await p.locator('#fit-button').click();await p.waitForTimeout(800);
    }
  });
  await run('37 fixed depth',async()=>{
    await open('37-be-weird-b','index.html#clear/mechanism');
    await capture('37-clear'); await p.locator('#next-fact').click();
    await capture('37-await');await p.locator('#next-depth').click();
    await capture('37-await-evidence');await p.locator('#surface').click();
    await capture('37-return');
  });
  await run('53 resistance and failures',async()=>{
    await open('53-be-weird-53');
    for(const [id,key] of [['pull-all','pull'],['rebuild','refill'],['throw','rejection'],['reset','reset'],['finish','fulfillment']]){
      await p.locator('#'+id).click();await capture('53-'+key,'body',key==='refill'||key==='rejection');
    }
  });
  await run('51 authored fronts and examples',async()=>{
    await open('51-angle-new-subject-51');
    records.push({name:'51-dom',sections:await p.locator('section').evaluateAll(es=>es.map(e=>({id:e.id,title:e.querySelector('h2')?.innerText}))),steppers:await p.locator('[data-stepper]').evaluateAll(es=>es.map(e=>({id:e.id,buttons:[...e.querySelectorAll('[data-step]')].map(b=>({step:b.dataset.step,label:b.innerText}))})))});
    const details=p.locator('details');
    for(let i=0;i<await details.count();i++){
      const d=details.nth(i), summary=await d.locator(':scope > summary').innerText();
      if(/Work through one small example/.test(summary)) await d.locator(':scope > summary').click();
    }
    await capture('51-worked-examples');
    for(const stepper of await p.locator('[data-stepper]').all()){
      const buttons=stepper.locator('[data-step]');if(await buttons.count()>1)await buttons.last().click();
    }
    await capture('51-last-checkpoints');
  });
}finally{await context.close();await browser.close();}
await writeFile(join(out,'reading/routes',process.argv[2]?process.argv[2]+'-manifest.json':'manifest.json'),JSON.stringify({captured_utc:new Date().toISOString(),records},null,2)+'\n');
console.log(JSON.stringify({records:records.length,errors:records.filter(r=>r.harnessError)}));
