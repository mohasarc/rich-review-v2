const {chromium}=require(process.env.MUSIC_BOX_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');
const fs=require('node:fs'),{resolve}=require('node:path'),assert=require('node:assert/strict');
const root=resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
 const errors=[],requests=[],checks=[],audio={};page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
 await page.goto('file://'+root+'/index.html');
 const scenarios=await page.evaluate(()=>INSTRUMENT.scores.map(s=>s.id));
 let noteCount=0;
 for(const id of scenarios){
  await page.locator(`[data-score="${id}"]`).click();
  assert.equal(await page.evaluate(()=>InstrumentApp.state.score),id);
  for(const build of ['base','head']){
   const notes=page.locator(`.roll[data-build="${build}"] .note`),length=await notes.count();
   for(let i=0;i<length;i++){
    await notes.nth(i).click();assert.equal(await page.locator('#inspector').evaluate(d=>d.open),true);
    assert.equal(await page.locator('#inspector-body').innerText().then(t=>t.includes('Receipt unavailable')),false,`${id}/${build}/${i}: missing receipt`);
    await page.keyboard.press('Escape');assert.equal(await page.locator('#inspector').evaluate(d=>d.open),false);
    assert.equal(await notes.nth(i).evaluate(e=>document.activeElement===e),true);noteCount++;
   }
  }
 }
 checks.push({check:'All six recordings, every note, exact receipts, Escape and focus return',notes:noteCount,pass:true});
 await page.locator('[data-score="release-held"]').click();await page.locator('#checkpoint').click();
 let state=await page.locator('#status-pair').innerText();assert.match(state,/Backend fulfilled while project graph is pending/);assert.match(state,/both pending/);
 await page.locator('#back').click();await page.locator('#next').click();assert.equal(await page.evaluate(()=>InstrumentApp.state.step),6);
 await page.locator('#restart').click();const note=page.locator('.roll[data-build="head"] .note').first();await note.focus();await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>InstrumentApp.state.step),1);
 await page.keyboard.press('End');assert.equal(await page.evaluate(()=>InstrumentApp.state.step),14);await page.keyboard.press('Home');assert.equal(await page.evaluate(()=>InstrumentApp.state.step),0);
 checks.push({check:'Split checkpoint, next/back/restart and note arrow/Home/End navigation',pass:true});
 for(const solo of ['release','cache','turn','all']){
  if(solo==='turn')await page.locator('[data-score="turn"]').click();
  await page.locator(`[data-solo="${solo}"]`).click();assert.equal(await page.locator(`[data-solo="${solo}"]`).getAttribute('aria-pressed'),'true');
  const dim=await page.locator('.owner.muted-track').count();assert.ok(solo==='all'?dim===0:dim>0);
 }
 assert.equal(await page.locator('[data-solo="release"]').isDisabled(),true);await page.locator('[data-score="release-held"]').click();assert.equal(await page.locator('[data-solo="turn"]').isDisabled(),true);checks.push({check:'Four solo states filter owner tracks; inapplicable boundaries disabled',pass:true});
 for(let i=0;i<6;i++){const button=page.locator('.decision .receipt').nth(i);await button.click();assert.ok(await page.locator('#inspector-body .source').count());await page.locator('#back-to-score').click();assert.equal(await button.evaluate(e=>document.activeElement===e),true);}
 checks.push({check:'All six complete score notes open/return from source depth',pass:true});
 // Actual Web Audio nodes, including the dissonant dependency relation.
 await page.locator('[data-score="release-held"]').click();await page.locator('[data-solo="release"]').click();
 await page.locator('#listen').selectOption('base');await page.locator('#checkpoint').click();await page.locator('#sound').check();
 await page.waitForFunction(()=>MusicSound.ready && MusicSound.amplitude>0,{}, {timeout:5000});
 audio.split=await page.evaluate(()=>({amplitude:MusicSound.amplitude,history:MusicSound.debug.relationHistory.slice(),context:Tone.getContext().state}));
 assert.ok(audio.split.amplitude>0);assert.equal(audio.split.context,'running');assert.ok(audio.split.history.some(h=>h.build==='base'&&h.relation==='split'&&h.notes.includes('Db3')));
 await page.locator('#listen').selectOption('head');await page.waitForFunction(()=>MusicSound.amplitude>0 && MusicSound.debug.relationHistory.at(-1)?.relation==='pending',{}, {timeout:5000});
 audio.pending=await page.evaluate(()=>({amplitude:MusicSound.amplitude,last:MusicSound.debug.relationHistory.at(-1)}));assert.ok(audio.pending.amplitude>0);assert.equal(audio.pending.last.relation,'pending');
 await page.locator('#restart').click();await page.locator('#tempo').focus();await page.keyboard.press('End');await page.locator('#listen').selectOption('both');
 await page.locator('#play').click();await page.waitForFunction(()=>InstrumentApp.state.step>=3);await page.locator('#play').click();const paused=await page.evaluate(()=>InstrumentApp.state.step);await page.waitForTimeout(600);assert.equal(await page.evaluate(()=>InstrumentApp.state.step),paused);
 await page.locator('#restart').click();await page.locator('#play').click();await page.waitForFunction(()=>!InstrumentApp.state.playing,{},{timeout:15000});
 audio.end=await page.evaluate(()=>({state:InstrumentApp.state,debug:MusicSound.debug,amplitude:MusicSound.amplitude}));assert.equal(audio.end.state.step,14);assert.ok(audio.end.debug.relationHistory.some(h=>h.relation==='aligned'));assert.equal(audio.end.debug.errors.length,0);
 checks.push({check:'Real audio signal, semitone split/open fifth/aligned chord, transport pause and full completion',pass:true});
 // Solo suppresses both lifecycle notes and unrelated dependency chords.
 await page.locator('[data-solo="cache"]').click();await page.locator('#restart').click();await page.evaluate(()=>{MusicSound.debug.noteHistory.length=0;MusicSound.debug.relationHistory.length=0;});
 await page.locator('#play').click();await page.waitForFunction(()=>!InstrumentApp.state.playing,{},{timeout:15000});
 audio.solo=await page.evaluate(()=>({notes:MusicSound.debug.noteHistory,relations:MusicSound.debug.relationHistory}));assert.ok(audio.solo.notes.length);assert.ok(audio.solo.notes.every(e=>['lifetime','service'].includes(e.row)));assert.equal(audio.solo.relations.length,0);
 await page.locator('#sound').uncheck();await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>MusicSound.amplitude),0);
 checks.push({check:'Solo filters audible events and relation chords; mute produces silence',pass:true});
 // Control changes interrupt pending playback without a late callback restoring it.
 await page.locator('#restart').click();await page.locator('#play').click();await page.locator('[data-score="refresh-fails"]').click();await page.waitForTimeout(600);assert.equal(await page.evaluate(()=>InstrumentApp.state.score),'refresh-fails');assert.equal(await page.evaluate(()=>InstrumentApp.state.playing),false);assert.equal(await page.evaluate(()=>InstrumentApp.state.step),0);
 checks.push({check:'Changing recording cancels playback and pending callbacks',pass:true});
 await page.locator('#checkpoint').click();assert.match(await page.locator('#status-pair').innerText(),/old entry/);
 await page.locator('[data-score="release-held-rejects"]').click();await page.locator('#scrub').focus();await page.keyboard.press('End');assert.match(await page.locator('#status-pair').innerText(),/Backend fulfilled; project graph rejected/);
 assert.match(await page.locator('#status-pair').innerText(),/backend rejected \/ graph rejected/);
 checks.push({check:'Failed-refresh preservation and asymmetric release-rejection endings',pass:true});
 // Screenshots and responsive controls.
 await page.locator('[data-score="release-held"]').click();await page.locator('[data-solo="all"]').click();await page.locator('#checkpoint').click();
 for(const [width,height] of [[1440,1100],[768,1000],[390,844],[320,700]]){
  await page.setViewportSize({width,height});
  const over=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(over,false);
  await page.locator('#play').scrollIntoViewIfNeeded();assert.ok(await page.locator('#play').isVisible());
  if(width===390)await page.screenshot({path:resolve(root,'screenshots/03-mobile.png'),fullPage:true});
 }
 await page.setViewportSize({width:1440,height:1100});await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 checks.push({check:'1440, 768, 390, 320 px; contained roll scrolling; reduced motion',pass:true});
 await page.locator('.roll[data-build="head"] .note').nth(12).click();await page.screenshot({path:resolve(root,'screenshots/04-source-receipt.png')});await page.keyboard.press('Escape');
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto('file://'+root+'/index.html');assert.equal(await nojs.locator('.decision').count(),6);await nojs.goto('file://'+root+'/sources.html#release-head');assert.match(await nojs.locator('#release-head pre').innerText(),/await this.projects/);await nojs.close();
 checks.push({check:'JavaScript-disabled complete score notes and frozen source book',pass:true});
 assert.equal(errors.length,0);assert.equal(requests.length,0);
 checks.push({check:'No page exceptions or external network requests',pass:true});
 const report={date:new Date().toISOString(),browser:await browser.version(),versions:await page.evaluate(()=>MusicSound.versions),checks,audio,errors,externalRequests:requests};
 fs.writeFileSync(resolve(root,'evidence/browser-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({checks:checks.length,notes:noteCount,errors,externalRequests:requests},null,2));await browser.close();
})().catch(e=>{fs.writeFileSync(resolve(root,'evidence/browser-check-failure.txt'),e.stack);console.error(e);process.exit(1);});
