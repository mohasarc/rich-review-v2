import {createRequire} from 'node:module';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname, join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const {chromium}=createRequire(import.meta.url)('/tmp/rich-review-05-browser/node_modules/playwright');
const out=dirname(fileURLToPath(import.meta.url));
const sha=s=>createHash('sha256').update(s).digest('hex');
await mkdir(join(out,'screenshots'),{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const records=[], errors=[],requests=[];
try {
  for(const width of [1440,768,390,320]){
    const context=await browser.newContext({viewport:{width,height:950},reducedMotion:'reduce'});
    await context.route(/^https?:/,r=>{requests.push(r.request().url());return r.abort();});
    for(const variant of ['compact','fuller']) {
      const page=await context.newPage();page.setDefaultTimeout(4000);
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto(pathToFileURL(join(out,'baseline-52',variant+'.html')).href);
      const register=await page.locator('#decisions').innerText();
      const original=await readFile(join(out,'observations','52-original-'+variant+'-fronts.txt'),'utf8');
      if(register+'\n'!==original)throw new Error('Register changed: '+variant);
      const maps=await page.locator('#static-maps .rk-edge').evaluateAll(ns=>ns.map(n=>({label:n.textContent.trim(),path:n.querySelector('path').getAttribute('d')})));
      for(const arrow of maps.filter(n=>n.label==='imports / constructs'))if(arrow.path!=='M 136 175 L 270 88')throw new Error('Wrong direction');
      const geometry=await page.evaluate(()=>({stopY:Math.round(document.querySelector('#stop').getBoundingClientRect().top+scrollY),width:innerWidth,documentWidth:document.documentElement.scrollWidth,minimumStaticTitleFont:parseFloat(getComputedStyle(document.querySelector('#static-before .rk-box-title')).fontSize)*document.querySelector('#static-before svg').getBoundingClientRect().width/540}));
      if(geometry.documentWidth>width)throw new Error('Document overflow '+variant+' '+width);
      const routes=[];
      if(width===1440) {
        await page.locator('#static-maps').screenshot({path:join(out,'screenshots','02-corrected-'+variant+'-arrows.png')});
        for(const id of ['d06','d04','d17','d19','d07','d01','d29','d23']){
          await page.locator('#'+id+'-exit').click();
          const destination=page.url().split('#')[1];
          if(destination!=='m-'+id)throw new Error('Wrong destination');
          const text=await page.locator('#m-'+id).innerText();
          await writeFile(join(out,'observations',variant+'-'+id+'-descent.txt'),text+'\n');
          await page.locator('#m-'+id+' a[data-return]').first().click();
          const active=await page.evaluate(()=>document.activeElement.id);
          if(active!==id+'-exit')throw new Error('Focus not returned: '+id+' '+active);
          routes.push({id,destination,returnedFocus:active});
        }
      }
      if(width===390){await page.locator('#d17').scrollIntoViewIfNeeded();await page.screenshot({path:join(out,'screenshots','03-'+variant+'-phone.png')});}
      records.push({variant,width,register_sha256:sha(register),registerWords:register.trim().split(/\s+/).length,maps,geometry,routes});
      await page.close();
    }
    await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:950}});
  const page=await nojs.newPage();await page.goto(pathToFileURL(join(out,'baseline-52/compact.html')).href);
  await page.locator('#d06-exit').click();
  records.push({noJavaScript:true,route:page.url().split('#')[1],cards:await page.locator('.root-register .rk-decision').count()});
  await nojs.close();
  const context=await browser.newContext({viewport:{width:1440,height:950},reducedMotion:'reduce'});
  const p=await context.newPage();
  await p.goto(pathToFileURL(join(dirname(out),'51-angle-new-subject-51/index.html')).href+'#P2');
  await p.locator('#P2 .decision-key').click();
  await p.locator('#example-policy .rationale > summary').click();
  const children=await p.locator('[id^="pr-131-d"]').evaluateAll(ns=>ns.map(n=>({id:n.id,parent:n.dataset.parent,text:n.innerText})));
  await writeFile(join(out,'observations','51-authored-descent.json'),JSON.stringify(children,null,2)+'\n');
  await p.getByText('Exact values and stated purposes for the seven policy families',{exact:true}).click();
  const table=await p.locator('#example-policy .source-disclosure').filter({has:p.getByText('Exact values and stated purposes for the seven policy families',{exact:true})}).locator('table').innerText();
  await writeFile(join(out,'observations','51-policy-table.txt'),table+'\n');
  await p.locator('#pr-131-d2 a').click();
  records.push({episode:'51',children,returnedTo:p.url().split('#')[1]});
  await context.close();
} finally {await browser.close();}
await writeFile(join(out,'observations','pair-browser.json'),JSON.stringify({created:new Date().toISOString(),scope:'Source-informed author observation of rendered comparisons and selected routes. No unfamiliar readers, learning scores or Symnav execution.',errors,requests,records},null,2)+'\n');
console.log(JSON.stringify({observations:records.length,pageErrors:errors.length,externalRequests:requests.length}));
