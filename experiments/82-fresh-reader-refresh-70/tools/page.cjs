#!/usr/bin/env node
// Stateless page reader: fresh load, replay actions, capture text + controls + screenshot.
// Usage: node page.cjs --url <path-or-url> --out <dir> --tag <name> [--actions file.json | --a '<json array>'] [--full] [--w 1440] [--h 900] [--settle 1500]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function arg(name, dflt) {
  const i = process.argv.indexOf('--' + name);
  if (i < 0) return dflt;
  const v = process.argv[i + 1];
  return v === undefined || v.startsWith('--') ? true : v;
}

const rawUrl = arg('url');
const out = arg('out', '.');
const tag = arg('tag', 'capture');
const full = !!arg('full', false);
const width = parseInt(arg('w', '1440'), 10);
const height = parseInt(arg('h', '900'), 10);
const settle = parseInt(arg('settle', '1500'), 10);
let actions = [];
if (arg('actions')) actions = JSON.parse(fs.readFileSync(arg('actions'), 'utf8'));
if (arg('a')) actions = JSON.parse(arg('a'));
if (!rawUrl) { console.error('--url required'); process.exit(2); }

function toUrl(u) {
  if (/^(file|https?):/.test(u)) return u;
  const [p, frag] = u.split('#');
  return 'file://' + path.resolve(p) + (frag ? '#' + frag : '');
}

const CONTROLS_JS = () => {
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const sel = 'a[href],button,summary,input,select,textarea,[role=button],[role=tab],[role=link],[role=slider],[role=option],[role=menuitem],[tabindex]:not([tabindex="-1"])';
  const rows = [];
  document.querySelectorAll(sel).forEach((el) => {
    if (!vis(el)) return;
    const r = el.getBoundingClientRect();
    const name = (el.getAttribute('aria-label') || el.innerText || el.value || el.getAttribute('title') || el.getAttribute('href') || '').replace(/\s+/g, ' ').trim().slice(0, 90);
    const id = el.id ? '#' + el.id : '';
    const role = el.getAttribute('role') || el.tagName.toLowerCase();
    const extra = el.tagName === 'A' ? ' href=' + el.getAttribute('href') : (el.type ? ' type=' + el.type : '');
    const pressed = el.getAttribute('aria-pressed') || el.getAttribute('aria-selected') || el.getAttribute('aria-expanded');
    rows.push(`${role}${id} @(${Math.round(r.x)},${Math.round(r.y + window.scrollY)}) "${name}"${extra}${pressed ? ' state=' + pressed : ''}`);
  });
  return rows.join('\n');
};

const ALLTEXT_JS = () => {
  // Every text node, marking whether it is currently rendered; shows content hidden behind interactions.
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent.replace(/\s+/g, ' ').trim();
    if (!t) continue;
    const el = n.parentElement;
    if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue;
    let shown = true;
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.display === 'none' || s.visibility === 'hidden' || e.hidden) { shown = false; break; }
      if (e.tagName === 'DETAILS' && !e.open && e !== el && !(el.closest('summary') && el.closest('details') === e)) { shown = false; break; }
    }
    out.push((shown ? '  ' : '~ ') + t);
  }
  return out.join('\n');
};

async function run() {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || require('os').homedir() + '/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell',
    args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
  });
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const logs = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message));
  page.on('request', (r) => { const u = r.url(); if (/^https?:/.test(u)) logs.push('[network] ' + u); });
  await page.goto(toUrl(rawUrl), { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(settle);
  let step = 0;
  for (const a of actions) {
    step++;
    try {
      if (a.goto) { await page.goto(toUrl(a.goto), { waitUntil: 'load' }); await page.waitForTimeout(settle); }
      else if (a.click) await page.locator(a.click).nth(a.nth || 0).click({ timeout: 8000 });
      else if (a.clickText) await page.getByText(a.clickText, { exact: !!a.exact }).nth(a.nth || 0).click({ timeout: 8000 });
      else if (a.clickRole) await page.getByRole(a.clickRole.role, { name: a.clickRole.name, exact: !!a.clickRole.exact }).nth(a.nth || 0).click({ timeout: 8000 });
      else if (a.press) await page.keyboard.press(a.press);
      else if (a.type) await page.locator(a.type.selector).fill(a.type.text);
      else if (a.select) await page.locator(a.select.selector).selectOption(a.select.value);
      else if (a.hover) await page.locator(a.hover).first().hover();
      else if (a.scroll !== undefined) await page.evaluate((y) => window.scrollTo(0, y === 'bottom' ? document.body.scrollHeight : y), a.scroll);
      else if (a.scrollTo) await page.locator(a.scrollTo).first().scrollIntoViewIfNeeded();
      else if (a.mouse) await page.mouse.click(a.mouse.x, a.mouse.y);
      else if (a.wheel) { await page.mouse.move(a.wheel.x, a.wheel.y); await page.mouse.wheel(0, a.wheel.dy); }
      else if (a.drag) { await page.mouse.move(a.drag.from.x, a.drag.from.y); await page.mouse.down(); await page.mouse.move(a.drag.to.x, a.drag.to.y, { steps: 12 }); await page.mouse.up(); }
      else if (a.openDetails) await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
      else if (a.evaluate) { const v = await page.evaluate(a.evaluate); fs.writeFileSync(path.join(out, `${tag}.eval${step}.txt`), typeof v === 'string' ? v : JSON.stringify(v, null, 2)); }
      else if (a.wait) await page.waitForTimeout(a.wait);
      else if (a.shot) await page.screenshot({ path: path.join(out, `${tag}.${a.shot}.png`), fullPage: !!a.full });
      else if (a.text) fs.writeFileSync(path.join(out, `${tag}.${a.text}.visible.txt`), await page.evaluate(() => document.body.innerText));
      if (!a.wait && !a.shot && !a.text) await page.waitForTimeout(a.settle || 400);
    } catch (e) {
      logs.push(`[action ${step} failed] ${JSON.stringify(a)} :: ${e.message.split('\n')[0]}`);
    }
  }
  await page.screenshot({ path: path.join(out, `${tag}.png`), fullPage: false });
  if (full) await page.screenshot({ path: path.join(out, `${tag}.full.png`), fullPage: true });
  fs.writeFileSync(path.join(out, `${tag}.visible.txt`), await page.evaluate(() => document.body.innerText));
  fs.writeFileSync(path.join(out, `${tag}.alltext.txt`), await page.evaluate(ALLTEXT_JS));
  fs.writeFileSync(path.join(out, `${tag}.controls.txt`), await page.evaluate(CONTROLS_JS));
  fs.writeFileSync(path.join(out, `${tag}.log.txt`), `final url: ${page.url()}\nscrollHeight: ${await page.evaluate(() => document.body.scrollHeight)}\n` + logs.join('\n'));
  await browser.close();
  const vis = fs.readFileSync(path.join(out, `${tag}.visible.txt`), 'utf8');
  console.log(`ok ${tag}: visible ${vis.length} chars, ${logs.length} log lines -> ${out}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
