import {createRequire} from 'node:module';
import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const {chromium} = createRequire(import.meta.url)('/tmp/rich-review-05-browser/node_modules/playwright');
const out = dirname(fileURLToPath(import.meta.url));
const experiments = dirname(out);
await mkdir(join(out, 'observations'), {recursive:true});
const browser = await chromium.launch({headless:true, channel:'chrome'});
const context = await browser.newContext({viewport:{width:1440,height:950},reducedMotion:'reduce'});
await context.route(/^https?:/, route => route.abort());
const page = await context.newPage();
const records = [];
try {
  for (const variant of ['compact','fuller']) {
    await page.goto(pathToFileURL(join(experiments,'52-critique-response-52',variant+'.html')).href);
    const fronts = await page.locator('#decisions').innerText();
    await writeFile(join(out,'observations','52-original-'+variant+'-fronts.txt'),fronts+'\n');
    const root = await page.locator('.root-register .rk-decision').evaluateAll(nodes => nodes.map(n => ({id:n.id, text:n.innerText})));
    const maps = await page.locator('#static-maps').innerText();
    await page.locator('#static-maps').screenshot({path:join(out,'observations','52-original-'+variant+'-maps.png')});
    const geometry = await page.evaluate(() => ({stopY:document.querySelector('#stop').getBoundingClientRect().top+scrollY, scrollWidth:document.documentElement.scrollWidth,innerWidth, mapArrows:[...document.querySelectorAll('#static-maps .rk-edge')].map(n=>n.outerHTML)}));
    records.push({variant,url:page.url(),root,maps,geometry});
  }
  await page.goto(pathToFileURL(join(experiments,'51-angle-new-subject-51','index.html')).href+'#policy');
  await page.locator('#policy').screenshot({path:join(out,'observations','51-policy.png')});
  const fronts = await page.locator('[id]').evaluateAll(ns=>ns.filter(n=>/^(P[1-9]|R[1-5])$/.test(n.id)).map(n=>({id:n.id,text:n.innerText})));
  const bullets = await page.locator('[id^="pr-131-d"]').evaluateAll(ns=>ns.map(n=>({id:n.id,parent:n.dataset.parent,text:n.innerText,visible:!!n.getClientRects().length})));
  await writeFile(join(out,'observations','51-fronts-and-mapping.json'),JSON.stringify({fronts,bullets},null,2)+'\n');
  await page.locator('#P2').getByRole('link').first().click();
  records.push({episode:'51-policy',afterExit:page.url(),visibleMain:await page.locator('main').innerText()});
  await writeFile(join(out,'observations','original-browser.json'),JSON.stringify({created:new Date().toISOString(),scope:'Author inspection. Already primed by prior critiques. Not an unfamiliar-reader trial.',records},null,2)+'\n');
} finally {await browser.close();}
