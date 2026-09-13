async (page) => {
  const checks = [];
  const errors = [];
  const check = (name, condition) => {
    if (!condition) throw new Error(name);
    checks.push(name);
  };
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto('http://127.0.0.1:8725/');
  check('All 13 decisions are in the initial brief', await page.locator('.decision-card').count() === 13);
  check('Reference is initially hidden; sketch starts blank', !await page.locator('#reference-panel').isVisible() && await page.locator('[data-mark]').count() === 0);

  async function stroke(tool, points) {
    await page.locator(`[data-tool="${tool}"]`).click();
    await page.locator('#sketch').scrollIntoViewIfNeeded();
    const b = await page.locator('#sketch').boundingBox();
    const toScreen = ([x, y]) => [b.x + x * b.width / 800, b.y + y * b.height / 550];
    await page.mouse.move(...toScreen(points[0]));
    await page.mouse.down();
    for (const point of points.slice(1)) await page.mouse.move(...toScreen(point), { steps: 5 });
    await page.mouse.up();
  }
  await stroke('pen', [[55, 65], [120, 90], [170, 60], [210, 105]]);
  await stroke('box', [[270, 70], [505, 160]]);
  await stroke('arrow', [[210, 110], [267, 110]]);
  check('Pointer input creates freehand, rectangle, and arrow', await page.locator('[data-mark]').count() === 3);
  await page.locator('#stamp').selectOption('DaemonPolicy');
  await page.locator('#add-stamp').click();
  const label = page.locator('[data-mark]').last();
  check('Labeled box is keyboard reachable', await label.getAttribute('tabindex') === '0');
  await label.focus();
  await page.keyboard.press('ArrowRight');
  check('Keyboard moves the focused box', (await label.getAttribute('transform')).includes('10,0'));
  const width = Number(await label.locator('rect').first().getAttribute('width'));
  await page.keyboard.press('Shift+ArrowRight');
  check('Keyboard resizes a focused box', Number(await label.locator('rect').first().getAttribute('width')) === width + 10);
  await page.locator('#undo').click();
  check('Undo restores the prior box geometry', Number(await label.locator('rect').first().getAttribute('width')) === width);
  await page.locator('#redo').click();
  check('Redo restores the resized geometry', Number(await label.locator('rect').first().getAttribute('width')) === width + 10);

  await page.locator('#compare').click();
  const sketchBefore = await page.locator('#mark-layer').innerHTML();
  await page.locator('[data-version="before"]').click();
  check('Before map exposes local choices', (await page.locator('#reference').textContent()).includes('local choice'));
  await page.locator('[data-version="after"]').click();
  check('After map exposes required inputs', (await page.locator('#reference').textContent()).includes('required input'));
  check('Comparison does not change the reader sketch', await page.locator('#mark-layer').innerHTML() === sketchBefore);
  await page.locator('#reference [data-decision="output"]').click();
  check('Reference box opens its source detail', await page.locator('#detail').isVisible() && (await page.locator('#detail-title').textContent()).includes('capacity'));
  await page.keyboard.press('Escape');
  check('Escape returns to the comparison without losing marks', !await page.locator('#detail').isVisible() && await page.locator('[data-mark]').count() === 4);

  await page.locator('[data-tool="erase"]').click();
  await page.locator('[data-mark]').last().locator('rect').first().click();
  check('Eraser removes one mark', await page.locator('[data-mark]').count() === 3);
  await page.locator('#undo').click();
  await page.locator('#clear').click();
  check('Clear empties the sheet', await page.locator('[data-mark]').count() === 0);
  await page.locator('#undo').click();
  check('Clear is reversible', await page.locator('[data-mark]').count() === 4);

  await page.locator('#tab-runtime').click();
  check('Second sheet has independent marks and comparison state', await page.locator('[data-mark]').count() === 0 && !await page.locator('#reference-panel').isVisible());
  await page.locator('#add-stamp').click();
  await page.locator('#compare').click();
  check('Runtime map contains process and thread boundaries', (await page.locator('#reference').textContent()).includes('WORKER THREAD'));
  await page.locator('#tab-ownership').click();
  check('Returning to a sheet restores its marks and comparison', await page.locator('[data-mark]').count() === 4 && await page.locator('#reference-panel').isVisible());
  await page.locator('#tab-ownership').focus();
  await page.keyboard.press('End');
  check('Sheet tabs support keyboard navigation', await page.locator('#tab-recovery').getAttribute('aria-selected') === 'true');
  await page.locator('[data-tool="arrow"]').click();
  await page.locator('#sketch').focus();
  await page.keyboard.press('Enter');
  check('Keyboard can add an arrow without pointer input', await page.locator('[data-mark]').count() === 1 && (await page.locator('[data-mark]').getAttribute('aria-label')).startsWith('arrow;'));
  await page.locator('#compare').click();
  check('Recovery map separates admission from accepted completion', (await page.locator('#reference').textContent()).includes('NO COMPLETION TIMER'));

  for (const id of await page.locator('.decision-card').evaluateAll(nodes => nodes.map(node => node.dataset.decision))) {
    await page.locator(`#decision-${id}`).click();
    check(`Decision ${id} has exact source excerpts`, await page.locator('#detail .evidence-snippet').count() > 0);
    await page.locator('#detail .evidence-snippet').first().locator('summary').click();
    check(`Decision ${id} excerpt is readable`, (await page.locator('#detail pre').first().textContent()).length > 60);
    await page.locator('#close-detail').click();
  }
  let atlasRows = 0;
  for (const section of await page.locator('[data-section]').evaluateAll(nodes => nodes.map(node => node.dataset.section))) {
    await page.locator(`[data-section="${section}"]`).click();
    const count = await page.locator('#atlas-content tbody tr').count();
    check(`Atlas ${section} has policy fields`, count > 0);
    atlasRows += count;
  }
  check('Atlas covers all 44 recorded fields and recipes', atlasRows === 44);
  await page.locator('#custom-label').fill('<script>alert("test")</script>');
  await page.locator('#add-custom').click();
  check('Custom label stays text, never markup', await page.locator('#mark-layer script').count() === 0 && (await page.locator('#mark-layer').textContent()).includes('<script>'));

  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    check(`No document overflow at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
  }
  check('Narrow reference diagrams remain large enough to pan', await page.locator('#reference').evaluate(el => el.getBoundingClientRect().width >= 690));
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.reload();
  check('Reload discards all reader marks', await page.locator('[data-mark]').count() === 0);
  check('No browser storage is used', await page.evaluate(() => localStorage.length === 0 && sessionStorage.length === 0));

  const evidence = await page.context().newPage();
  await evidence.goto('http://127.0.0.1:8725/evidence.html#ref-error-1');
  check('Direct evidence anchors expand the requested source', await evidence.locator('#ref-error-1').getAttribute('open') !== null);
  const deadAnchors = await evidence.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')).filter(href => !document.getElementById(href.slice(1))));
  check('Every evidence-book anchor resolves', deadAnchors.length === 0);
  check('Evidence includes every changed file', await evidence.locator('details[id^="diff-"]').count() === 60);
  await evidence.close();

  const offlineContext = await page.context().browser().newContext();
  const offline = await offlineContext.newPage();
  await offlineContext.setOffline(true);
  await offline.goto('file:///Users/moyaseen/projects/rich-review-v2/experiments/25-reader-sketch/index.html');
  await offline.locator('#compare').click();
  await offline.locator('#add-stamp').click();
  check('Opens directly from disk and works offline', await offline.locator('[data-mark]').count() === 1 && await offline.locator('#reference-panel').isVisible());
  await offlineContext.close();
  check('No JavaScript errors during the exercised flows', errors.length === 0);
  return { passed: checks.length, checks, errors };
}
