async (page) => {
  const root = '/Users/moyaseen/projects/rich-review-v2/experiments/';
  const context = await page.context().browser().newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route(/^https?:/, route => route.abort());
  const p = await context.newPage();
  p.setDefaultTimeout(5000);
  const results = [];
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  const open = async path => { await p.goto('file://' + root + path); await p.evaluate(() => new Promise(requestAnimationFrame)); };
  const save = async (name, selector = 'body') => {
    results.push({ name, url: p.url(), selector, text: await p.locator(selector).innerText(), errors: [...errors] });
  };
  try {
    await open('23-zoom-canvas/index.html');
    await p.locator('button').filter({ hasText: /^ENTER ↗$/ }).nth(1).click();
    await p.waitForTimeout(400);
    await save('23-public-room');
    await open('25-reader-sketch/index.html');
    await p.locator('#decision-tests-removed').click();
    await save('25-removed-test-dialog', 'dialog');
    await open('27-test-honesty/index.html');
    await p.locator('summary').filter({ hasText: 'Keep tiny test knobs in test-only adapters' }).click();
    await save('27-adapter-expanded');
    await open('30-adjacent-pair/index.html');
    await p.locator('#finish-worker').click(); await save('30-worker-finishes', '#lab');
    await p.locator('#finish-latest').click(); await save('30-latest-finishes', '#lab');
    await p.locator('#finish-sample').click(); await save('30-sample-finishes', '#lab');
    await p.locator('#lab').screenshot({ path: root + '47-critique-refresh-40/reading/30-latest-before-first.png' });
    await open('36-be-weird-a/index.html');
    await p.locator('#channel').selectOption('R'); await save('36-reference-cache', '#contact');
    await p.getByRole('button', { name: 'At the service return', exact: true }).click();
    await save('36-reference-return', '#contact');
    await p.locator('#contact').screenshot({ path: root + '47-critique-refresh-40/reading/36-reference-return.png' });
    for (const address of ['clear/mechanism', 'await/mechanism', 'await/evidence']) {
      await open('37-be-weird-b/index.html#' + address); await save('37-' + address.replace('/', '-'), '#reading-pane');
    }
    await open('40-best-of-synthesis/index.html');
    await p.getByRole('button', { name: /07\s+References/ }).click(); await save('40-request-references', '#request');
    await p.locator('#contact-channel').selectOption('P'); await save('40-position-contact', '#contact');
    await p.locator('#contact').screenshot({ path: root + '47-critique-refresh-40/reading/40-position-contact.png' });
  } catch (error) { results.push({ harnessError: String(error), url: p.url() }); }
  finally { await context.close(); }
  return results;
}
