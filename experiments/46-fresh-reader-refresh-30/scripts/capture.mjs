import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/rich-review-05-browser/node_modules/playwright');
const root = '/Users/moyaseen/projects/rich-review-v2';
const out = path.join(root, 'experiments/46-fresh-reader-refresh-30');
const scope = JSON.parse(fs.readFileSync(path.join(out, 'scope.json'), 'utf8'));
const jobs = JSON.parse(process.argv[2]);
const browser = await chromium.launch({ headless: true, executablePath: '/Users/moyaseen/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
try {
  for (const job of jobs) {
    const row = scope.subject_experiments.find(x => x.folder.startsWith(job.id + '-'));
    if (!row && !job.path) throw new Error(`Unknown page ${job.id}`);
    const file = job.path ?? (job.file ? path.join(path.dirname(row.path), job.file) : row.path);
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.route(/^https?:/, route => route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(4000);
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('file://' + path.join(root, file) + (job.hash ?? ''), { waitUntil: 'load' });
    await page.waitForTimeout(180);
    for (const action of job.actions ?? []) {
      try {
      if (action.click) await page.getByText(action.click, { exact: action.exact ?? true }).first().click();
      if (action.role) await page.getByRole(action.role, { name: action.name, exact: action.exact ?? true }).first().click();
      if (action.select) await page.locator(action.select).selectOption(action.value);
      if (action.selector) await page.locator(action.selector).first().click();
      if (action.key) await page.keyboard.press(action.key);
      if (action.fill) await page.locator(action.fill).fill(action.value);
      await page.waitForTimeout(100);
      } catch (e) { errors.push('ACTION: ' + e.message); break; }
    }
    const data = await page.evaluate(() => {
      let text = document.body.innerText;
      // Preserve the reader-facing prose while keeping raw source out of this phase.
      for (const el of document.querySelectorAll('pre')) {
        const raw = el.innerText;
        if (raw.trim()) text = text.replace(raw, '[RAW CODE BLOCK NOT READ DURING BLIND PHASE]');
      }
      const visible = e => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';
      return {
        title: document.title, url: location.href, text,
        headings: [...document.querySelectorAll('h1,h2,h3,h4')].filter(visible).map(e => ({tag:e.tagName,text:e.innerText,y:Math.round(e.getBoundingClientRect().top+scrollY),id:e.id})),
        controls: [...document.querySelectorAll('button,summary,select,input,a[href], [role="button"]')].filter(visible).map(e => ({tag:e.tagName,text:(e.innerText||e.getAttribute('aria-label')||e.getAttribute('title')||'').trim().slice(0,180),id:e.id,href:e.getAttribute('href'),type:e.getAttribute('type'),value:e.value,options:e.tagName==='SELECT'?[...e.options].map(o=>({label:o.label,value:o.value})):undefined})),
        svgText: [...document.querySelectorAll('svg')].filter(visible).map(e=>e.textContent.trim()).filter(Boolean)
      };
    });
    const name = job.name ?? `${job.id}-top`;
    data.captured_utc = new Date().toISOString(); data.actions = job.actions ?? []; data.errors = errors;
    fs.writeFileSync(path.join(out,'captures',name+'.json'), JSON.stringify(data,null,2)+'\n');
    fs.writeFileSync(path.join(out,'captures',name+'.txt'), data.text+'\n');
    if (job.screenshot !== false) await page.screenshot({ path:path.join(out,'captures',name+'.png'), fullPage:false });
    console.log(JSON.stringify({name,title:data.title,characters:data.text.length,errors}));
    await context.close();
  }
} finally { await browser.close(); }
