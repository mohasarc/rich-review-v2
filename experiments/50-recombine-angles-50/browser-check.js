async (page) => {
  const url = 'http://127.0.0.1:58895/experiments/50-recombine-angles-50/';
  const files = 'file:///Users/moyaseen/projects/rich-review-v2/experiments/50-recombine-angles-50/';
  const out = '/Users/moyaseen/projects/rich-review-v2/experiments/50-recombine-angles-50/screenshots/';
  const results = { errors: [], decisionReturns: [], layouts: [], fileRead: {}, screenshots: [], externalRequests: [] };
  const assert = (value, message) => { if (!value) results.errors.push(message); };
  const context = await page.context().browser().newContext({ viewport: { width: 1440, height: 1050 } });
  try {
    await context.route('**/*', r => {
      const target = r.request().url();
      if (target.startsWith('http://127.0.0.1:58895/') || target.startsWith('file:')) return r.continue();
      results.externalRequests.push(r.request().url());
      return r.abort();
    });
    const p = await context.newPage();
    p.on('pageerror', e => results.errors.push(String(e)));
    await p.goto(url + 'index.html');
    const rows = await p.locator('#comparison tbody tr').evaluateAll(es => es.map(e => ({ id: e.id, receipt: e.querySelector('a').getAttribute('href') })));
    assert(rows.length === 26, 'Expected 26 visible decision rows');
    for (const row of rows) {
      await p.locator('#' + row.id + ' a').click();
      assert(('#' + p.url().split('#')[1]) === row.receipt, 'Decision did not reach receipt: ' + row.id);
      await p.locator(row.receipt + ' .back a[href="#' + row.id + '"]').click();
      assert(('#' + p.url().split('#')[1]) === '#' + row.id, 'Receipt did not return to decision: ' + row.id);
      results.decisionReturns.push(row.id);
    }
    await p.goto(url + 'index.html#R7');
    const disclosure = p.locator('#R7 details').first();
    await disclosure.locator('summary').focus();
    await p.keyboard.press('Enter');
    assert(await disclosure.evaluate(e => e.open), 'Keyboard did not open source disclosure');
    const sourceLink = disclosure.locator('.source-head a');
    const destination = await sourceLink.getAttribute('href');
    await sourceLink.click();
    assert(p.url().endsWith(destination), 'Source did not open at pinned line');
    const fragment = ('#' + p.url().split('#')[1]);
    assert(await p.locator(fragment).count() === 1, 'Pinned source line missing');
    await p.locator('a[href="../../index.html#R7"]').first().click();
    assert(('#' + p.url().split('#')[1]) === '#R7', 'Full source did not return to receipt');
    for (const width of [1440, 768, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      for (const entry of ['index.html', 'critique.html', 'source-index.html', destination]) {
        await p.goto(url + entry);
        const layout = await p.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, title: document.title }));
        results.layouts.push({ entry, ...layout });
        assert(layout.scrollWidth <= width, 'Horizontal page overflow: ' + width + ' ' + entry);
      }
    }
    await p.setViewportSize({ width: 1440, height: 1050 });
    for (const [entry, name] of [['index.html', '00-opening.png'], ['index.html#comparison', '01-comparison.png'], ['index.html#R7', '02-test-observation.png']]) {
      await p.goto(url + entry);
      await p.screenshot({ path: out + name });
      results.screenshots.push(name);
    }
    await p.setViewportSize({ width: 390, height: 900 });
    await p.goto(url + 'index.html');
    await p.screenshot({ path: out + '03-mobile.png' });
    results.screenshots.push('03-mobile.png');
    const offline = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    try {
      const f = await offline.newPage();
      f.on('pageerror', e => results.errors.push(String(e)));
      await f.goto(files + 'index.html');
      results.fileRead = { title: await f.title(), decisionRows: await f.locator('#comparison tbody tr').count(), scriptElements: await f.locator('script').count() };
      await f.locator('#D24 a').click();
      await f.locator('#R9 details').first().locator('summary').click();
      results.fileRead.disclosureWorks = await f.locator('#R9 details').first().evaluate(e => e.open);
      await f.locator('#R9 details').first().locator('.source-head a').click();
      results.fileRead.sourceLine = ('#' + f.url().split('#')[1]);
      assert(results.fileRead.decisionRows === 26 && results.fileRead.disclosureWorks, 'Direct file/no-JS reading failed');
    } finally { await offline.close(); }
    assert(results.externalRequests.length === 0, 'Page requested external resources');
    return results;
  } finally { await context.close(); }
}
