/* Real Chromium interaction checks against the offline artifact, not symnav execution. */
const {chromium}=require(process.env.CONSTELLATION_PLAYWRIGHT || '/tmp/rich-review-05-browser/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const report={scope:'Artifact interaction and source receipt checks; no symnav execution or human comprehension test.',startedAt:new Date().toISOString(),checks:[],errors:[],externalRequests:[]};
async function group(name,fn){const t=Date.now();await fn();report.checks.push({name,status:'passed',ms:Date.now()-t});console.log('PASS',name);}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CONSTELLATION_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1050},reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))report.externalRequests.push(r.url());});
 const url='file://'+path.join(root,'index.html');
 await page.goto(url);await page.waitForFunction(()=>window.constellation);
 await group('Direct file opening, complete source inventory, and directory containment',async()=>{
  const m=await page.evaluate(()=>{
   const c=window.constellation;
   const bad=c.directoryNodes.flatMap(d=>d.children.filter(n=>Math.hypot(n.x-d.x,n.y-d.y)+n.r>d.r+.01).map(n=>n.data.id));
   return {stars:document.querySelectorAll('.star').length,files:c.graph.order,edges:c.graph.size,compat:c.data.nodes.filter(n=>n.compat).length,newPackage:c.data.nodes.filter(n=>n.owner==='package'&&n.new).length,bad,register:document.querySelectorAll('.register-row').length,cliCallsPackage:c.graph.outNeighbors('c:daemon-command-dispatcher').filter(x=>x.startsWith('p:'))};
  });
  assert.deepEqual(m,{stars:92,files:92,edges:59,compat:38,newPackage:43,bad:[],register:7,cliCallsPackage:[]});
 });
 await group('All 92 stars are reachable through pointer interaction',async()=>{
  const nodes=await page.evaluate(()=>window.constellation.data.nodes.map(n=>({id:n.id,name:n.name,path:n.path})));
  for(const n of nodes){await page.locator(`[data-node="${n.id}"]`).click();assert.equal(await page.locator('.inspector-title').textContent(),n.name);assert.equal(await page.locator('.file-path').textContent(),n.path);}
 });
 await group('Every selected dependency opens its own exact source receipt and returns',async()=>{
  const edges=await page.evaluate(()=>window.constellation.data.edges);
  for(const e of edges){
   await page.evaluate(id=>window.constellation.selectNode(id),e.source);
   await page.locator(`[data-edge="${e.id}"]`).click();
   assert(await page.locator('#source-dialog').isVisible());
   assert.equal(await page.locator('#source-title').textContent(),e.cite.receipt.replace(/^head:/,''));
   const first=await page.locator('.line-no').first().textContent();assert.equal(+first,e.cite.start);
   assert((await page.locator('.line-code').allTextContents()).some(x=>x.trim()));
   await page.keyboard.press('Escape');assert(!(await page.locator('#source-dialog').isVisible()));
   assert.equal(await page.evaluate(()=>window.constellation.state.node),e.source);
  }
 });
 await group('Seven complete readings, all 37 source buttons, and independent return links',async()=>{
  const readings=await page.evaluate(()=>window.constellation.readings);
  for(let i=0;i<readings.length;i++){
   await page.evaluate(i=>window.constellation.reading(i),i);
   assert.equal(await page.locator('.inspector-title').textContent(),readings[i].title);
   const buttons=page.locator('.source-buttons button');assert.equal(await buttons.count(),readings[i].sources.length);
   for(let j=0;j<readings[i].sources.length;j++){
    await buttons.nth(j).click();assert(await page.locator('#source-dialog').isVisible());
    await page.locator('#close-source').click();assert(await buttons.nth(j).evaluate(el=>el===document.activeElement));
   }
   await page.locator('[data-register]').click();assert(await page.locator(`#decision-${readings[i].id}`).isVisible());
   await page.locator(`#decision-${readings[i].id} button`).click();assert.equal(await page.evaluate(()=>window.constellation.state.reading),i);
   await page.locator('.challenge summary').click();assert.equal(await page.locator('.challenge p').textContent(),readings[i].answer);
  }
 });
 await group('Counterpart tether preserves two distinct files and is not a runtime edge',async()=>{
  await page.evaluate(()=>window.constellation.selectNode('p:registry/registry'));
  await page.locator('[data-counterpart]').click();
  assert.equal(await page.evaluate(()=>window.constellation.state.node),'c:daemon-registry');assert.equal(await page.locator('.copy-link').count(),1);
  assert((await page.locator('.selection-note').allTextContents()).some(t=>t.includes('not runtime dependence')));
  await page.locator('#back-star').click();assert.equal(await page.evaluate(()=>window.constellation.state.node),'p:registry/registry');
 });
 await group('Search, direct fragments, reload, and browser history',async()=>{
  await page.goto(url);await page.locator('#find-star').fill('registry');await page.locator('#find-star').press('ArrowDown');await page.keyboard.press('Enter');
  assert(await page.locator('.file-path').isVisible());const first=await page.evaluate(()=>window.constellation.state.node);
  await page.evaluate(()=>window.constellation.selectNode('p:client/daemon-client'));const fragment=page.url();
  await page.reload();assert.equal(await page.evaluate(()=>window.constellation.state.node),'p:client/daemon-client');
  await page.goBack();assert.equal(await page.evaluate(()=>window.constellation.state.node),first);
  await page.goto(fragment);assert.equal(await page.evaluate(()=>window.constellation.state.node),'p:client/daemon-client');
 });
 await group('Keyboard star selection, neighbors, source Escape, and Home camera reset',async()=>{
  await page.goto(url);const star=page.locator('[data-node="p:client/daemon-client"]');await star.focus();await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>window.constellation.state.node),'p:client/daemon-client');
  await star.focus();await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>window.constellation.state.node),'p:client/daemon-client-runtime');
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>window.constellation.state.node),null);
  await page.locator('#zoom-in').click();await page.waitForTimeout(30);assert((await page.evaluate(()=>window.constellation.state.transform.k))>1);
  await page.keyboard.press('Home');assert.equal(await page.evaluate(()=>window.constellation.state.transform.k),1);
 });
 await group('Wheel, pan, directory fit, and reset use the D3 camera',async()=>{
  await page.locator('#map').scrollIntoViewIfNeeded();const box=await page.locator('#map').boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.wheel(0,-230);await page.waitForTimeout(200);
  const before=await page.evaluate(()=>({...window.constellation.state.transform}));assert(before.k>1);
  await page.mouse.move(box.x+box.width*.4,box.y+box.height*.1);await page.mouse.down();await page.mouse.move(box.x+box.width*.4+70,box.y+box.height*.1+40,{steps:5});await page.mouse.up();
  const after=await page.evaluate(()=>({...window.constellation.state.transform}));assert.notEqual(after.x,before.x);
  await page.locator('#fit').click();assert.equal(await page.evaluate(()=>window.constellation.state.transform.k),1);
  await page.locator('[aria-label="Zoom to lifecycle/"]').focus();await page.keyboard.press('Enter');assert((await page.evaluate(()=>window.constellation.state.transform.k))>1.5);
  await page.locator('#fit').click();
 });
 await group('Whole-file source expansion preserves a numbered cited location',async()=>{
  await page.evaluate(()=>window.constellation.selectNode('p:registry/registry'));
  await page.locator('button[data-receipt="head:packages/daemon/src/registry/registry.ts"]').first().click();await page.locator('#source-full').click();
  assert.equal(await page.locator('.code-line').count(),985);await page.locator('#source-full').click();assert.equal(await page.locator('.code-line').count(),75);await page.keyboard.press('Escape');
 });
 await group('390, 320, 768, 1440, and 1920 px reading and source layouts do not overflow',async()=>{
  for(const width of [390,320,768,1440,1920]){
   await page.setViewportSize({width,height:1000});await page.goto(url);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Page overflow at ${width}`);
   await page.locator('[data-lens="package"]').click();
   await page.evaluate(()=>window.constellation.selectNode('p:client/daemon-client-runtime'));
   await page.locator('button[data-receipt="head:packages/daemon/src/client/daemon-client-runtime.ts"]').first().click();
   assert(await page.locator('#source-dialog').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;}),`Dialog overflow at ${width}`);
   await page.keyboard.press('Escape');
  }
 });
 await group('No-JavaScript complete stopping layer and print fallback',async()=>{
  const off=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await off.goto(url);assert.equal(await off.locator('.register-row').count(),7);assert((await off.locator('#complete').textContent()).includes('readiness startup/duration assertions are deleted'));await off.close();
  await page.emulateMedia({media:'print'});assert(!(await page.locator('.observatory').isVisible()));assert.equal(await page.locator('.register-row:visible').count(),7);await page.emulateMedia({media:'screen'});
 });
 await group('Touch selection on a small viewport',async()=>{
  const touch=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await touch.goto(url);
  await touch.locator('[data-node="p:client/daemon-client"]').tap();assert.equal(await touch.locator('.inspector-title').textContent(),'DaemonClient');await touch.close();
 });
 await group('Final screenshots and label separation at the launch view',async()=>{
  await page.setViewportSize({width:1440,height:1050});await page.goto(url);await page.screenshot({path:path.join(root,'screenshots/01-opening.png'),fullPage:true});await page.locator('.observatory').screenshot({path:path.join(root,'screenshots/02-map.png')});
  await page.locator('[data-lens="package"]').click();await page.locator('.observatory').screenshot({path:path.join(root,'screenshots/03-package-launch.png')});
  const overlaps=await page.evaluate(()=>{const t=[...document.querySelectorAll('.labels text')].filter(e=>+e.getAttribute('opacity')>.5).map(e=>({name:e.textContent,r:e.getBoundingClientRect()}));return t.flatMap((a,i)=>t.slice(i+1).filter(b=>a.r.left<b.r.right&&a.r.right>b.r.left&&a.r.top<b.r.bottom&&a.r.bottom>b.r.top).map(b=>[a.name,b.name]));});assert.deepEqual(overlaps,[]);
  await page.evaluate(()=>window.constellation.selectNode('p:registry/registry'));await page.locator('[data-counterpart]').click();await page.locator('.observatory').screenshot({path:path.join(root,'screenshots/04-counterpart.png')});
  await page.setViewportSize({width:390,height:844});await page.goto(url);await page.screenshot({path:path.join(root,'screenshots/05-phone.png'),fullPage:true});
 });
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);
 report.status='passed';report.completedAt=new Date().toISOString();
 }catch(error){report.status='failed';report.failure=error.stack;console.error(error.stack);process.exitCode=1;}finally{await browser.close();fs.writeFileSync(path.join(root,'evidence/browser-checks.json'),JSON.stringify(report,null,2));}
})();
