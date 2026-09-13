async (page) => {
  const output = '/Users/moyaseen/projects/rich-review-v2/experiments/30-adjacent-pair';
  const checks = [];
  const errors = [];
  const collectError = error => errors.push(error.message);
  page.on('pageerror', collectError);
  const check = (condition, description) => { if (!condition) throw new Error(description); checks.push(description); };
  const text = id => page.locator('#' + id).innerText();
  await page.setViewportSize({ width: 1440, height: 1020 });
  await page.goto('http://127.0.0.1:30330/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  check(await page.locator('.claim').count() === 19, 'All 19 decisions are visible in the top-level inventory.');
  const sourceCheck = await page.evaluate(() => {
    const failures = [];
    for (const d of REVIEW.decisions) for (const [key, a, b] of d.refs) {
      const source = SOURCES[key];
      if (!source || a < 1 || b < a || b > source.text.trimEnd().split('\n').length) failures.push([d.id, key, a, b]);
    }
    for (const b of document.querySelectorAll('[data-source]')) if (!SOURCES[b.dataset.source]) failures.push(b.dataset.source);
    return { failures, count: REVIEW.decisions.reduce((n, d) => n + d.refs.length, 0) };
  });
  check(sourceCheck.failures.length === 0, `All ${sourceCheck.count} decision citations and static source buttons resolve to valid pinned sources.`);
  await page.locator('[data-stage="before"]').click();
  check(await page.locator('#ownership-map .inside').count() === 2, 'Before #146, both responsibilities are inside the shell.');
  await page.locator('[data-stage="146"]').click();
  check(await page.locator('#ownership-map .inside').count() === 1, 'After #146, execution stays inside the shell and delivery is extracted.');
  await page.locator('[data-stage="147"]').click();
  check(await page.locator('#ownership-map .inside').count() === 0, 'After #147, both session boundaries are visible.');

  await page.locator('#claim-barrier .claim-title').click();
  check(page.url().endsWith('#d/barrier'), 'A top-level decision opens a bookmarkable detail.');
  await page.locator('#decision-panel [data-source="147/accepted-execution-session.ts"]').click();
  check(await page.locator('#source-dialog').isVisible() && (await text('source-lines')).includes('await this.options.delivery.trackedCompletion(request.requestId)'), 'Source drawer shows the actual delivery await at the pinned commit.');
  await page.locator('#show-whole-source').click();
  check((await text('source-range')).includes('Whole file'), 'Source context expands to the whole file.');
  await page.keyboard.press('Escape');
  check(!(await page.locator('#source-dialog').isVisible()), 'Escape closes source evidence without losing the selected decision.');
  await page.locator('#back-to-card').click();
  check(page.url().endsWith('#claim-barrier'), 'Back link returns to the originating decision.');

  await page.locator('#finish-worker').click();
  await page.locator('#finish-first').click();
  check((await text('request-b')).includes('Queued behind A') && await page.locator('#finish-sample').isDisabled(), 'First attachment settling cannot release B while the current promise is pending.');
  await page.screenshot({ path: output + '/screenshots/02-current-stream.png' });
  await page.locator('#finish-latest').click();
  check((await text('request-b')).includes('Queued behind A') && !(await page.locator('#finish-sample').isDisabled()), 'The latest promise releases the delivery gate, leaving the resource sample.');
  await page.locator('#finish-sample').click();
  check((await text('request-b')).includes('Worker can start') && (await text('spool-status')).includes('unacknowledged'), 'B can start before A is acknowledged.');
  await page.locator('#acknowledge').click();
  check((await text('spool-status')).includes('Identity remains'), 'Later acknowledgement preserves request identity in the model.');

  await page.locator('#reset-lab').click();
  await page.locator('#finish-worker').click();
  await page.locator('#finish-latest').click();
  await page.locator('#finish-sample').click();
  check((await text('first-status')).includes('Blocked') && (await text('request-b')).includes('Worker can start'), 'Complementary order: a blocked older attachment does not keep B behind the captured latest promise.');

  await page.locator('#reset-lab').click();
  await page.locator('#finish-worker').click();
  await page.locator('#disconnect-latest').click();
  await page.locator('#finish-sample').click();
  check((await text('latest-status')).includes('failure caught') && (await text('request-b')).includes('Worker can start') && (await text('spool-status')).includes('available for fetch'), 'A caught send failure settles the current wait and leaves completion available for fetch.');
  await page.locator('#reset-lab').click();
  check((await text('request-a')).includes('Worker running') && await page.locator('#finish-first').isDisabled(), 'Reset restores the initial state and control preconditions.');

  for (const d of await page.evaluate(() => REVIEW.decisions.map(d => ({ id: d.id, title: d.title })))) {
    await page.evaluate(id => { location.hash = '#d/' + id; }, d.id);
    await page.waitForFunction(title => document.querySelector('.detail-title').textContent === title, d.title);
  }
  check(true, 'All decision deep links render their matching explanation.');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { location.hash = '#top'; });
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '390 px layout has no page-level horizontal overflow.');
  await page.screenshot({ path: output + '/screenshots/03-mobile.png' });
  await page.locator('#claim-clock .claim-title').click();
  await page.locator('#decision-panel [data-source="146/daemon-delivery-session.ts"]').first().click();
  check(await page.locator('#source-dialog').isVisible(), 'Source evidence opens on mobile.');
  await page.locator('#close-source').click();

  await page.setViewportSize({ width: 1440, height: 1020 });
  await page.goto('file://' + output + '/index.html');
  check(await page.locator('.claim').count() === 19, 'Direct file opening loads all data and scripts without a server.');
  await page.locator('#finish-worker').click();
  check((await text('request-a')).includes('completed'), 'The illustrative example works from a file URL.');
  await page.locator('#reset-lab').click();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: output + '/screenshots/01-opening.png' });
  check(errors.length === 0, 'No JavaScript page errors during the verification.');
  page.off('pageerror', collectError);
  const report = { verifiedAt: new Date().toISOString(), scope: 'Artifact interaction and source-reference checks; symnav tests were not executed.', checks, errors };
  return report;
}
