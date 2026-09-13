const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('/tmp/rich-review-05-browser/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const experiments = path.dirname(root);
const config = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const sha = s => require('node:crypto').createHash('sha256').update(s).digest('hex');
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  const context = await browser.newContext({viewport: {width: 1440, height: 1000}});
  const logs = [];
  for (const item of config) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(pathToFileURL(path.join(experiments, item.file)).href + (item.hash || ''));
    await page.waitForTimeout(200);
    const states = [{name: 'opening'}, ...(item.steps || [])];
    for (const step of states) {
      if (step.click) await page.locator(step.click).click({force: !!step.force});
      if (step.evaluate) await page.evaluate(`(${step.evaluate})()`);
      if (step.key) await page.keyboard.press(step.key);
      await page.waitForTimeout(step.wait || 700);
      const visible = await page.locator('body').innerText();
      const out = path.join(root, 'receipts', 'readings', `${item.id}-${step.name}.txt`);
      fs.mkdirSync(path.dirname(out), {recursive: true});
      fs.writeFileSync(out, visible + '\n');
      const structure = await page.evaluate(() => ({
        headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(x=>({tag:x.tagName,id:x.id,text:x.innerText})),
        controls: [...document.querySelectorAll('button,summary,select')].map(x=>({tag:x.tagName,id:x.id,text:x.innerText,attrs:[...x.attributes].filter(a=>a.name.startsWith('data-')).map(a=>[a.name,a.value])})),
        links: [...document.querySelectorAll('a')].map(x=>({text:x.innerText,href:x.getAttribute('href')}))
      }));
      const record = {id:item.id,file:item.file,state:step.name,step,url:page.url(),captured:new Date().toISOString(),text:path.relative(root,out),sha256:sha(visible+'\n'),characters:visible.length,errors,structure};
      logs.push(record);
      fs.writeFileSync(out.replace('.txt','.json'), JSON.stringify(record,null,2)+'\n');
      if (step.screenshot || (item.screenshot && step.name==='opening')) {
        fs.mkdirSync(path.join(root,'receipts','screenshots'),{recursive:true});
        await page.screenshot({path:path.join(root,'receipts','screenshots',`${item.id}-${step.name}.png`),fullPage:false});
      }
      console.log(JSON.stringify({id:item.id,state:step.name,characters:visible.length,errors}));
    }
    await page.close();
  }
  await browser.close();
})();
