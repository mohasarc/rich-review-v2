const {chromium}=require(process.env.MORPHOLOGY_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');
const fs=require('node:fs');const path=require('node:path');const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'data/morphology.json'),'utf8'));
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.MORPHOLOGY_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();const errors=[],requests=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url())});
 const check=(name,ok,details)=>{checks.push({name,passed:!!ok,details});if(!ok)throw Error(`${name}: ${JSON.stringify(details)}`)};
 const state=()=>page.evaluate(()=>window.morphology.state);
 const jump=async i=>{await page.locator('#scrub').evaluate((e,i)=>{e.value=String(i);e.dispatchEvent(new Event('input',{bubbles:true}))},i);};
 try{
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.evaluate(()=>document.fonts.ready);
 check('direct file opening', (await state()).step==='main');
 check('local variable font loads',await page.evaluate(()=>document.fonts.check('600 32px Recursive')));
 check('complete top has all ten readings',await page.locator('#readings .reading').count()===10);
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:width<700?844:1000});
  for(let i=0;i<8;i++){
   await jump(i);
   const dims=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
   check(`no page overflow ${width} ${data.snapshots[i].id}`,dims.scroll<=dims.width,dims);
   const copyCount=await page.locator('.type-copy:not(.absent)').count();
   check(`copies ${width} ${data.snapshots[i].id}`,copyCount===data.snapshots[i].copies.length);
   const visibleWords=await page.locator('.type-copy:not(.absent) .extracted .morpheme').count();
   check(`separate words ${width} ${data.snapshots[i].id}`,visibleWords===data.snapshots[i].extracted*copyCount);
   const collision=await page.evaluate(()=>[...document.querySelectorAll('.type-copy:not(.absent) .extracted')].some(group=>{const a=[...group.children].map(x=>x.getBoundingClientRect());return a.some((r,i)=>a.slice(i+1).some(s=>Math.min(r.right,s.right)-Math.max(r.left,s.left)>1&&Math.min(r.bottom,s.bottom)-Math.max(r.top,s.top)>1))}));
   check(`no word collision ${width} ${data.snapshots[i].id}`,!collision);
  }
 }
 await page.setViewportSize({width:1440,height:1000});await jump(6);await page.screenshot({path:path.join(root,'screenshots/01-two-addresses.png'),fullPage:false});
 for(const r of data.readings){
  const b=page.locator(`#reading-${r.id} .reading-title`);await b.click();
  check(`open reading ${r.id}`,await page.locator('#reader').isVisible()&&(await state()).reading===r.id);
  check(`correct reading text ${r.id}`,(await page.locator('#reader-summary').innerText())===r.summary);
  check(`receipts ${r.id}`,await page.locator('.receipt').count()===r.receipts.length);
  for(let i=0;i<r.receipts.length;i++){
   const details=page.locator('.receipt').nth(i);
   if(!(await details.getAttribute('open'))&&!(await details.evaluate(e=>e.open)))await details.locator('summary').click();
   check(`source opens ${r.id} ${i}`,await details.locator('pre').isVisible());
   const source=await details.locator('code').allTextContents(),rc=r.receipts[i];
   check(`exact source excerpt ${r.id} ${i}`,source.join('\n')===data.sources[rc.source].text.split('\n').slice(rc.start-1,rc.end).join('\n'));
  }
  if(r.id==='copies'){await page.locator('#reader-scroll').evaluate(e=>e.scrollTop=0);} if(r.id==='copies')await page.screenshot({path:path.join(root,'screenshots/04-source-reader.png'),fullPage:false});
  await page.keyboard.press('Escape');
  check(`Escape restores focus ${r.id}`,await b.evaluate(e=>e===document.activeElement));
 }
 await page.locator('#reading-activity .reading-title').click();
 for(let i=1;i<10;i++){await page.locator('#reader-next').click();check(`linear reading ${i}`,(await state()).reading===data.readings[i].id);}
 for(let i=8;i>=0;i--){await page.locator('#reader-prev').click();check(`reverse reading ${i}`,(await state()).reading===data.readings[i].id);}
 await page.locator('#show-frame').click();check('reading jumps to its source frame',(await state()).step==='144'&&!await page.locator('#reader').isVisible());
 await page.locator('#specimen').focus();await page.keyboard.press('End');check('keyboard End',(await state()).step==='149');await page.keyboard.press('Home');check('keyboard Home',(await state()).step==='main');await page.keyboard.press('ArrowRight');check('keyboard next',(await state()).step==='143');
 await page.locator('#joins').click();check('join channel can be isolated',!(await state()).joins);await page.locator('#joins').click();
 // A real, non-reduced FLIP move, including the midpoint and final physical position.
 await jump(1);const word=page.locator('#type-cli [data-domain="0"]');const before=await word.boundingBox();
 await page.locator('[data-index="2"]').click();await page.waitForTimeout(450);const middle=await word.boundingBox();await page.waitForTimeout(800);const after=await word.boundingBox();
 check('FLIP moves Activity continuously',Math.abs(before.y-after.y)>10&&Math.abs(middle.y-after.y)>1,{before,middle,after});
 // Pause cancels playback; changing frame also cancels its delayed call.
 await page.locator('#play').click();check('play active',(await state()).playing);await page.waitForTimeout(3950);check('play advances',(await state()).step==='145');await page.locator('#play').click();const paused=(await state()).step;await page.waitForTimeout(4000);check('pause has no stale advance',(await state()).step===paused&&!(await state()).playing);
 await page.locator('#play').click();await page.locator('[data-index="6"]').click();await page.waitForTimeout(4050);check('manual selection cancels playback',(await state()).step==='148'&&!(await state()).playing);
 // Back returns from an evidence address to the selected frame.
 await page.locator('#reading-copies .reading-title').click();await page.goBack();check('browser Back returns to specimen',!(await state()).reading&&(await state()).step==='148');
 await page.goto(pathToFileURL(path.join(root,'index.html')).href+'#read=surface');check('direct reading fragment',(await state()).reading==='surface');await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await jump(6);check('reduced motion disables playback',await page.locator('#play').isDisabled());await page.locator('[data-index="7"]').click();check('reduced motion keeps snapshot controls',(await state()).step==='149');
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(root,'screenshots/03-phone.png'),fullPage:true});
 await page.locator('#reading-worker .reading-title').click();const mob=await page.evaluate(()=>({dialog:document.querySelector('dialog').getBoundingClientRect().toJSON(),width:innerWidth,doc:document.documentElement.scrollWidth}));check('mobile source dialog fits',mob.dialog.left>=0&&mob.dialog.right<=mob.width&&mob.doc<=mob.width,mob);await page.keyboard.press('Escape');
 await page.setViewportSize({width:1440,height:1000});await jump(0);await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(root,'screenshots/02-start.png')});
 await jump(7);await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(root,'screenshots/05-consolidated.png')});
 await page.emulateMedia({media:'print'});await page.pdf({path:path.join(root,'evidence/print-check.pdf'),format:'A4',printBackground:true});
 check('no page or console errors',errors.length===0,errors);check('no external requests on file reader',requests.length===0,requests);
 const staticContext=await browser.newContext({javaScriptEnabled:false});const staticPage=await staticContext.newPage();
 await staticPage.goto(pathToFileURL(path.join(root,'evidence/reading.html')).href);check('static fallback without JavaScript',await staticPage.locator('section').count()===10);await staticPage.locator('details summary').first().click();check('static sources without JavaScript',await staticPage.locator('pre').first().isVisible());await staticContext.close();
 fs.writeFileSync(path.join(root,'evidence/verification-browser.json'),JSON.stringify({passed:true,generatedAt:new Date().toISOString(),checks,errors,externalRequests:requests,scope:'Isolated headless system Chrome; direct file opening; source and interaction checks, not a human comprehension study.'},null,2));
 console.log(`${checks.length} browser checks passed.`);
 }catch(e){fs.writeFileSync(path.join(root,'evidence/attempts/browser-failure.json'),JSON.stringify({error:e.stack,checks,errors,requests},null,2));await page.screenshot({path:path.join(root,'evidence/attempts/browser-failure.png'),fullPage:true});throw e;}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
