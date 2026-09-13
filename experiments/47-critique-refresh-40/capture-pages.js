async (page) => {
  const root = '/Users/moyaseen/projects/rich-review-v2/experiments';
  const out = root + '/47-critique-refresh-40/reading';
  const context = await page.context().browser().newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route(/^https?:/, route => route.abort());
  const p = await context.newPage();
  const results = [];
  try {
    for (const name of ["01-unconstrained-a", "02-unconstrained-b", "03-unconstrained-c", "04-textbook-chapter", "05-boxes-static-vs-runtime", "06-hub-and-spokes", "07-stack-timeline", "08-adversarial", "09-diff-of-intent", "10-tour-guide", "11-chess-coach", "12-detective", "13-owner-persona", "14-outsider-persona", "15-message-choreography-sim", "16-drag-the-box", "17-executable-before-after", "18-negative-space", "19-type-level-only", "20-contract-table", "21-narrated-top", "22-game-any", "23-zoom-canvas", "24-question-driven-nav", "25-reader-sketch", "26-physical-analogy", "27-test-honesty", "28-blast-radius-tool", "29-refusal", "30-adjacent-pair", "31-method-runbook", "32-kit", "33-pair-one-variable", "34-inverted-for-experts", "35-future-self", "36-be-weird-a", "37-be-weird-b", "39-fresh-reader-check", "40-best-of-synthesis"]) {
      const number = Number(name.slice(0, 2));
      if (!(number >= 1 && number <= 42) || number === 38 || number === 41 || number === 42) continue;
      const entry = number === 22 ? 'game.html' : 'index.html';
      const errors = [];
      const onError = error => errors.push(error.message);
      p.on('pageerror', onError);
      await p.goto('file://' + root + '/' + name + '/' + entry, { waitUntil: 'load' });
      await p.evaluate(() => new Promise(requestAnimationFrame));
      const capture = await p.evaluate(() => ({
        title: document.title,
        visibleText: document.body.innerText,
        headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(e => ({ level: e.tagName, text: e.innerText, id: e.id, top: Math.round(e.getBoundingClientRect().top + scrollY) })),
        controls: [...document.querySelectorAll('button,select,input,summary,a[href^="#"]')].map(e => ({ tag: e.tagName, id: e.id, text: (e.innerText || e.getAttribute('aria-label') || '').slice(0, 180), href: e.getAttribute('href'), type: e.getAttribute('type'), visible: !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) })),
        scrollHeight: document.documentElement.scrollHeight,
        viewport: { width: innerWidth, height: innerHeight }
      }));
      await p.screenshot({ path: out + '/' + name + '.png' });
      results.push({ experiment: name, ...capture, errors });
      p.off('pageerror', onError);
    }
  } finally { await context.close(); }
  return results;
}
