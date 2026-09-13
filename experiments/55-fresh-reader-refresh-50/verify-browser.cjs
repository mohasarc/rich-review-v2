const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('/tmp/rich-review-05-browser/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'/Users/moyaseen/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'});
  const page = await browser.newPage({viewport:{width:1440,height:1050}});
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  const report = {time_utc:new Date().toISOString(), artifact:{}, post_source_53:{}, errors};
  try {
    await page.goto(pathToFileURL(path.join(__dirname,'review.html')).href);
    const count = () => page.locator('tbody tr:visible').count();
    if (await count() !== 53) throw Error('Expected 53 initially visible rows');
    report.artifact.opened_via_file_url = true;
    report.artifact.initial_rows = await count();
    await page.screenshot({path:path.join(__dirname,'screenshots/00-review.png')});
    await page.locator('#flags').click();
    if (await count() !== 9) throw Error('Expected 9 witnessed R4 rows');
    report.artifact.r4_rows = await count();
    await page.locator('#reset').click();
    await page.locator('#filter').fill('pre-allocation');
    report.artifact.search_rows = await count();
    if (report.artifact.search_rows < 1 || report.artifact.search_rows === 53) throw Error('Search did not filter');
    await page.locator('#reset').click();
    if (await count() !== 53) throw Error('Reset did not restore all rows');
    await page.locator('#comparison').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(__dirname,'screenshots/00-table.png')});
    await page.goto(pathToFileURL(path.join(__dirname,'witnesses.html')).href+'#C2');
    await page.locator('#C2 details').first().locator('summary').click();
    if (!(await page.locator('#C2 pre').first().innerText()).includes('byte_identical')) throw Error('Receipt did not open');
    report.artifact.receipt_opened = 'C2';
    report.artifact.console_errors = [...errors];

    // A separate representation check, explicitly after the sealed source phase.
    await page.goto('http://127.0.0.1:8755/experiments/53-be-weird-53/index.html');
    await page.locator('#pull-all').click();
    await page.waitForTimeout(200);
    const benchText = () => page.locator('#bench').innerText();
    report.post_source_53.pulled = await benchText();
    await page.locator('#rebuild').click();
    await page.waitForTimeout(150);
    report.post_source_53.queried_during_wait = await benchText();
    await page.locator('#finish').click();
    await page.waitForTimeout(200);
    report.post_source_53.finished = await benchText();
    await page.locator('#reset').click();
    await page.locator('#pull-all').click();
    await page.locator('#throw').click();
    await page.waitForTimeout(200);
    report.post_source_53.rejected = await benchText();
    fs.writeFileSync(path.join(__dirname,'captures/post-source-53-bench.txt'),
      'POST-SOURCE INTERACTION CHECK; NOT PART OF SEALED RECALL\n\n'+
      Object.entries(report.post_source_53).map(([k,v])=>k+'\n'+v).join('\n\n'));
    await page.screenshot({path:path.join(__dirname,'screenshots/post-source-53-bench.png')});
    report.post_source_53.actions_completed = ['pull','query during wait','finish cleanup','reset','pull','throw cleanup error'];
    report.post_source_53.scope = 'Browser representation only. No symnav runtime executed; not a fresh-reader observation.';
    report.success = errors.length === 0;
  } catch (e) {
    report.success = false;
    report.failure = String(e);
  } finally {
    fs.writeFileSync(path.join(__dirname,'browser-verification.json'), JSON.stringify(report,null,2)+'\n');
    await browser.close();
  }
  console.log(JSON.stringify({success:report.success,artifact:report.artifact,post_source_53:report.post_source_53.actions_completed,errors,failure:report.failure},null,2));
  if (!report.success) process.exitCode=1;
})();
