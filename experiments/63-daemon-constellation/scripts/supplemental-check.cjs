const {chromium}=require(process.env.CONSTELLATION_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');const path=require('path'),fs=require('fs'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.CONSTELLATION_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const p=await b.newPage({viewport:{width:1440,height:1050}});const report={checks:[],errors:[]};p.on('pageerror',e=>report.errors.push(e.message));
try{
await p.goto('file://'+path.join(root,'index.html'));await p.waitForFunction(()=>window.constellation);
await p.locator('#zoom-in').click();await p.waitForTimeout(300);assert((await p.evaluate(()=>window.constellation.state.transform.k))>1);
await p.locator('#fit').click();await p.waitForTimeout(550);assert.equal(await p.evaluate(()=>window.constellation.state.transform.k),1);report.checks.push('Ordinary-motion zoom and fit finish at the intended camera transform');
await p.locator('[data-lens="package"]').click();await p.waitForTimeout(650);
const overlap=await p.evaluate(()=>{const a=[...document.querySelectorAll('.labels text')].filter(e=>+e.getAttribute('opacity')>.5).map(e=>({name:e.textContent,r:e.getBoundingClientRect()}));const dirs=[...document.querySelectorAll('.orbit-label')].map(e=>({name:e.textContent,r:e.getBoundingClientRect()}));return a.flatMap((x,i)=>[...a.slice(i+1),...dirs].filter(y=>x.r.left<y.r.right&&x.r.right>y.r.left&&x.r.top<y.r.bottom&&x.r.bottom>y.r.top).map(y=>[x.name,y.name]));});assert.deepEqual(overlap,[]);report.checks.push('Package-launch star labels overlap neither one another nor directory labels');
await p.locator('.observatory').screenshot({path:path.join(root,'screenshots/03-package-launch.png')});
await p.goto('file://'+path.join(root,'index.html'));await p.screenshot({path:path.join(root,'screenshots/01-opening.png'),fullPage:true});await p.locator('.observatory').screenshot({path:path.join(root,'screenshots/02-map.png')});
await p.evaluate(()=>window.constellation.selectNode('p:registry/registry'));await p.locator('[data-counterpart]').click();await p.waitForTimeout(600);await p.locator('.observatory').screenshot({path:path.join(root,'screenshots/04-counterpart.png')});
for(const width of [320,390,768,1440]){
 await p.setViewportSize({width,height:1000});await p.goto('file://'+path.join(root,'index.html'));
 const geometry=await p.evaluate(()=>{const a=document.querySelector('.analogy').getBoundingClientRect(),c=document.querySelector('.map-controls').getBoundingClientRect();return {width:document.documentElement.scrollWidth,viewport:innerWidth,overlap:c.bottom>a.top};});assert(geometry.width<=geometry.viewport);assert(!geometry.overlap,JSON.stringify(geometry));
}
report.checks.push('Expanded analogy legend stays clear of camera controls at four widths');
await p.setViewportSize({width:390,height:844});await p.goto('file://'+path.join(root,'index.html'));await p.screenshot({path:path.join(root,'screenshots/05-phone.png'),fullPage:true});await p.locator('.observatory').screenshot({path:path.join(root,'screenshots/06-phone-map.png')});
assert.deepEqual(report.errors,[]);report.status='passed';
}catch(e){report.status='failed';report.failure=e.stack;process.exitCode=1;console.error(e.stack);}finally{await b.close();fs.writeFileSync(path.join(root,'evidence/supplemental-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));}
})();
