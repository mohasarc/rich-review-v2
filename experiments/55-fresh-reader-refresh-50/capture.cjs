// Captures rendered reading surfaces, never page data objects or source drawers.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {chromium} = require('/tmp/rich-review-05-browser/node_modules/playwright');
const out = __dirname;
const root = path.resolve(out, '../..');
const census = JSON.parse(fs.readFileSync(path.join(out, 'census-start.json')));
const latePath=path.join(out,'census-late.json');
if(fs.existsSync(latePath)) census.experiments.push(...JSON.parse(fs.readFileSync(latePath)).experiments);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const primary = census.experiments.filter(x => /^(0[1-9]|[12]\d|3[0-7]|40|49|5[0-3])-/.test(x.folder)&&x.readme_present);
const uniquePrimary=[...new Map(primary.map(x=>[x.folder,x])).values()];
let routes = uniquePrimary.map(x => ({id:x.folder.slice(0,2),folder:x.folder,file:x.folder.startsWith('22-')?'game.html':'index.html'}));
for (const [id, folder, file] of [
  ['21-video','21-narrated-top','video.html'],
  ['32-starter','32-kit','starter.html'],
  ['33-failure','33-pair-one-variable','failure.html'],
  ['49-original23','49-follow-next-49','variants/original/23/index.html'],
  ['49-revised23','49-follow-next-49','variants/revised/23/index.html'],
  ['49-original29','49-follow-next-49','variants/original/29/index.html'],
  ['49-revised29','49-follow-next-49','variants/revised/29/index.html'],
  ['52-compact','52-critique-response-52','compact.html'],
  ['52-fuller','52-critique-response-52','fuller.html'],
  ['52-transfer','52-critique-response-52','transfer-before.html'],
]) routes.push({id,folder,file});
routes.sort((a,b)=>a.id.localeCompare(b.id));
fs.writeFileSync(path.join(out,'routes.json'), JSON.stringify(routes,null,2)+'\n');

async function snapshot(page, route, state) {
  const data = await page.evaluate(() => {
    const pres = [...document.querySelectorAll('pre')];
    const displays = pres.map(x=>x.style.display);
    pres.forEach(x=>x.style.display='none');
    const text = document.body.innerText;
    const headings = [...document.querySelectorAll('h1,h2,h3')].filter(x=>x.getClientRects().length).map(x=>({tag:x.tagName,id:x.id,text:x.innerText}));
    const controls = [...document.querySelectorAll('button,a,summary,select,input,[role=button],[role=tab]')].filter(x=>x.getClientRects().length).map(x=>({tag:x.tagName,id:x.id,role:x.getAttribute('role'),text:(x.innerText||x.getAttribute('aria-label')||'').trim().slice(0,220),href:x.getAttribute('href'),type:x.type,data:{...x.dataset},options:x.tagName==='SELECT'?[...x.options].map(o=>({value:o.value,text:o.text})):undefined}));
    pres.forEach((x,i)=>x.style.display=displays[i]);
    return {title:document.title,text,headings,controls,excludedPreBlocks:pres.length};
  });
  const result = {route,state,url:page.url(),time_utc:new Date().toISOString(),...data};
  fs.writeFileSync(path.join(out,'captures',`${route.id}-${state}.json`),JSON.stringify(result,null,2)+'\n');
  fs.writeFileSync(path.join(out,'captures',`${route.id}-${state}.txt`),data.text+'\n');
  return result;
}

module.exports = {snapshot,routes};
if (require.main === module) (async()=>{
  const browser = await chromium.launch({headless:true,executablePath:'/Users/moyaseen/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
  const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await context.route('**/*', route=>route.request().url().startsWith('http://127.0.0.1:8755/')?route.continue():route.abort());
  const page = await context.newPage();
  const errors=[]; page.on('pageerror', e=>errors.push({url:page.url(),message:e.message}));
  const wanted=process.argv[2]?.split(',');
  for (const route of routes.filter(r=>!wanted||wanted.includes(r.id))) {
    await page.goto(`http://127.0.0.1:8755/experiments/${route.folder}/${route.file}`,{waitUntil:'load'});
    const result=await snapshot(page,route,'entry');
    await page.screenshot({path:path.join(out,'screenshots',route.id+'-entry.png')});
    const entryPath=path.join(root,'experiments',route.folder,route.file);
    result.entry_sha256=hash(fs.readFileSync(entryPath));
    fs.writeFileSync(path.join(out,'captures',route.id+'-entry.json'),JSON.stringify(result,null,2)+'\n');
    console.log(`${route.id}: ${result.title} | ${result.text.length} chars | ${result.controls.length} controls`);
  }
  fs.writeFileSync(path.join(out,'capture-errors.json'),JSON.stringify(errors,null,2)+'\n');
  await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
