async (page) => {
  const base = 'http://127.0.0.1:8852/experiments/52-critique-response-52/';
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  const geometry = [], routes = [], texts = {};
  for (const variant of ['fuller', 'compact']) {
    await page.goto(base + variant + '.html');
    texts[variant] = await page.locator('#decisions').innerText();
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 950 });
      geometry.push(await page.evaluate(variant => ({
        variant, width: innerWidth, pageWidth: document.body.scrollWidth,
        completeLayerEnd: Math.round(document.querySelector('#stop').getBoundingClientRect().bottom + scrollY),
        runtimeDiagramWidth: document.querySelector('#runtime svg').getBoundingClientRect().width,
        decisionWords: document.querySelector('#decisions').innerText.split(/\s+/).length,
        cards: document.querySelectorAll('.root-register .rk-decision').length,
        collectionControls: document.querySelectorAll('input, textarea, form').length,
      }), variant));
    }
    await page.setViewportSize({width:1440,height:950});
    for (const id of ['d01','d05','d07','d10','d17','d19','d21','d25','d28','d30']) {
      await page.locator('#' + id + '-exit').click();
      await page.waitForFunction(id => location.hash === '#m-' + id, id);
      const destinationFocused = await page.locator('#m-' + id).evaluate(e => e.contains(document.activeElement));
      await page.locator('#m-' + id + ' > .depth-header [data-return]').click();
      await page.waitForFunction(id => location.hash === '#' + id + '-exit', id);
      routes.push({variant, id, destinationFocused,
        returnedFocus: await page.locator('#' + id + '-exit').evaluate(e => e === document.activeElement)});
    }
    await page.goto(base + variant + '.html#e-d10-2');
    if (!await page.locator('#e-d10-2').evaluate(e => e.open)) throw Error('Deep source disclosure closed');
    await page.locator('#e-d10-2 .source-meta a').click();
    if (!page.url().includes('/sources/')) throw Error('Missing local source destination');
    await page.goBack();
    if (!page.url().includes(variant + '.html')) throw Error('Source back failed');
  }
  if (texts.fuller !== texts.compact) throw Error('Rendered proposition text differs');
  if (geometry.some(r => r.pageWidth > r.width || r.collectionControls || r.cards !== 30)) throw Error('Page overflow or missing cards');
  if (routes.some(r => !r.destinationFocused || !r.returnedFocus)) throw Error('Focus navigation failed');
  const context = await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:950}});
  const nojs = await context.newPage();
  await nojs.goto(base + 'compact.html');
  const noJavaScript = {cards:await nojs.locator('.root-register .rk-decision').count(),stopVisibleInDOM:await nojs.locator('#stop').count()};
  await nojs.locator('#d10-exit').click();
  await nojs.locator('#e-d10-2 summary').click();
  noJavaScript.sourceCanOpen = await nojs.locator('#e-d10-2').evaluate(e=>e.open);
  await context.close();
  if(errors.length) throw Error(errors.join('\n'));
  return {status:'passed',geometry,routes,noJavaScript,renderedTextIdentical:true,errors,
    scope:'Interface checks and geometric measurements only; no reader trial or Symnav execution.'};
}
