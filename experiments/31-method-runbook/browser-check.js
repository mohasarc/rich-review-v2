async (page) => {
  const origin = 'http://127.0.0.1:8731/';
  const screenshots = '/Users/moyaseen/projects/rich-review-v2/experiments/31-method-runbook/screenshots/';
  const report = { timestamp: new Date().toISOString(), transport: 'temporary loopback server', checks: [], routes: {}, pageErrors: [], consoleErrors: [] };
  page.on('pageerror', error => report.pageErrors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1300 : 844 });
    for (const file of ['index.html', 'method.html', 'record.html']) {
      await page.goto(origin + file);
      const dimensions = await page.evaluate(() => ({
        title: document.title,
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        decisionCount: document.querySelectorAll('[data-decision]').length,
        concealedDecisions: [...document.querySelectorAll('[data-decision]')].filter(element => element.closest('details') || getComputedStyle(element).display === 'none').length,
        collectionControls: document.querySelectorAll('form,input,textarea,select').length,
      }));
      report.checks.push({ file, ...dimensions });
      if (dimensions.documentWidth !== width || dimensions.concealedDecisions || dimensions.collectionControls) throw new Error('Layout or read-only contract failed: ' + file + ' at ' + width);
      if (file === 'index.html' && dimensions.decisionCount !== 12) throw new Error('Missing overview decision');
    }
  }
  await page.setViewportSize({ width: 1440, height: 1300 });
  await page.goto(origin + 'index.html');
  await page.locator('#overview-D12 .deeper').click();
  report.routes.overviewToDetail = await page.evaluate(() => location.hash);
  await page.locator('#detail-D12 a[href="#source-E17"]').first().click();
  report.routes.detailToEvidence = await page.evaluate(() => location.hash);
  await page.locator('#source-E17[open]').waitFor({ state: 'visible' });
  report.routes.evidenceAutomaticallyOpened = await page.locator('#source-E17').getAttribute('open') !== null;
  await page.locator('#source-E17 .return a[href="#detail-D12"]').click();
  report.routes.evidenceToDetail = await page.evaluate(() => location.hash);
  await page.locator('#detail-D12 .detail-head > a').click();
  report.routes.detailToOverview = await page.evaluate(() => location.hash);
  await page.locator('#overview-D12 .deeper').focus();
  await page.keyboard.press('Enter');
  report.routes.keyboardEnter = await page.evaluate(() => location.hash);
  await page.goto(origin + 'index.html#source-E31');
  await page.locator('#source-E31[open]').waitFor({ state: 'visible' });
  report.routes.directEvidenceURL = await page.locator('#source-E31').getAttribute('open') !== null;
  report.routeFailure = report.routes.overviewToDetail !== '#detail-D12' || report.routes.detailToEvidence !== '#source-E17' || !report.routes.evidenceAutomaticallyOpened || report.routes.evidenceToDetail !== '#detail-D12' || report.routes.detailToOverview !== '#overview-D12' || report.routes.keyboardEnter !== '#detail-D12' || !report.routes.directEvidenceURL;
  await page.goto(origin + 'index.html');
  await page.screenshot({ path: screenshots + '01-overview.png', fullPage: false });
  await page.goto(origin + 'index.html#lifetime');
  await page.screenshot({ path: screenshots + '02-lifecycle.png', fullPage: false });
  await page.goto(origin + 'method.html');
  await page.screenshot({ path: screenshots + '04-runbook.png', fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin + 'index.html#overview-D12');
  await page.screenshot({ path: screenshots + '03-mobile-decision.png', fullPage: false });
  report.status = report.pageErrors.length || report.consoleErrors.length || report.routeFailure ? 'failed' : 'passed';
  report.limitations = ['File URL blocked by browser harness; tested over loopback HTTP', 'Navigation and layout checks only; no runtime execution of PR code', 'Keyboard route checked; no screen-reader or human-learning study'];
  return report;
}
