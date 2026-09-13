async (page) => {
  const base = "http://127.0.0.1:8032";
  const checks = [];
  const errors = [];
  const external = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => {
    if (/^https?:/.test(request.url()) && !request.url().startsWith(base + "/")) external.push(request.url());
  });
  const require = (value, message) => { if (!value) throw new Error(message); checks.push(message); };
  await page.setViewportSize({width: 1360, height: 1000});
  await page.goto(base + "/index.html");
  require(await page.locator("#overview .rk-decision").count() === 10, "All ten decisions are visible in the overview");
  require(await page.locator("#overview .unexplained").count() === 2, "Both unexplained API choices are present at the root");
  require(await page.locator("form,textarea,input,button").count() === 0, "No feedback or verdict controls");

  await page.locator("#d06-exit").focus();
  await page.keyboard.press("Enter");
  require(await page.evaluate(() => location.hash === "#detail-d06" && document.activeElement.textContent.includes("make release wait")), "Keyboard exit focuses the mechanism heading");
  require(await page.locator("#detail-d06 [data-return]").getAttribute("href") === "#d06-exit", "Mechanism knows its exact origin");
  await page.locator("#mechanism-d06-evidence").click();
  require(await page.locator("#ev-d06 [data-return]").getAttribute("href") === "#mechanism-d06-evidence", "Evidence preserves its own origin");
  await page.locator("#ev-d06 [data-return]").click();
  require(await page.evaluate(() => document.activeElement.id === "mechanism-d06-evidence"), "Evidence return restores focus to the mechanism exit");
  await page.locator("#detail-d06 [data-return]").click();
  require(await page.evaluate(() => document.activeElement.id === "d06-exit"), "Mechanism return restores focus to the original card");
  await page.locator("#d06-exit").click();
  await page.goBack();
  require(await page.evaluate(() => location.hash === "#d06-exit" && document.activeElement.id === "d06-exit"), "Browser Back restores the prior anchor and focus");

  await page.locator("#ownership-after-scope-exit").click();
  require(await page.locator("#detail-d01 [data-return]").getAttribute("href") === "#ownership-after-scope-exit", "SVG box exits have exact return addresses");
  await page.locator("#detail-d01 [data-return]").click();
  require(await page.evaluate(() => document.activeElement.id === "ownership-after-scope-exit"), "Returning to an SVG box restores keyboard focus");

  await page.goto(base + "/index.html#ev-d06-s6-l214");
  require(await page.evaluate(() => document.getElementById("ev-d06-s6-l214").closest("details").open), "A copied deep link opens its containing evidence details");
  require(await page.evaluate(() => { const r = document.getElementById("ev-d06-s6-l214").getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }), "A copied deep link scrolls the revealed source line into view");
  await page.locator("#ev-d06-s6-l214 > a").click();
  require(page.url().endsWith("/sources/service-test-head.html#L214"), "Original line links reach the captured full source");
  require((await page.locator("#L214").textContent()).includes("rejects.toBe(releaseFailure)"), "The linked source line is the expected assertion");

  await page.goto(base + "/kit.html");
  await page.locator("#specimen-card-exit").click();
  require(await page.locator("#specimen-detail [data-return]").getAttribute("href") === "#specimen-card-exit", "The standalone guide specimen reuses working components");
  await page.goto(base + "/starter.html");
  require(await page.locator(".rk-diagram").count() === 2 && await page.locator(".rk-decision").count() === 1, "The minimal starter renders the same library");

  await page.setViewportSize({width: 390, height: 844});
  await page.goto(base + "/index.html");
  const mobile = await page.evaluate(() => {
    const a = document.querySelector("#ownership .rk-before").getBoundingClientRect();
    const b = document.querySelector("#ownership .rk-after").getBoundingClientRect();
    return {viewport: innerWidth, width: document.documentElement.scrollWidth, stacked: b.top >= a.bottom, diagramsScroll: document.querySelector(".rk-diagram-scroll").scrollWidth > document.querySelector(".rk-diagram-scroll").clientWidth};
  });
  require(mobile.width <= mobile.viewport, "Mobile page has no unintended horizontal overflow");
  require(mobile.stacked && mobile.diagramsScroll, "Mobile comparisons stack and diagrams retain a readable inner scroll area");
  await page.locator("#d09-exit").click();
  require(await page.locator("#detail-d09 [data-return]").getAttribute("href") === "#d09-exit", "Mobile decision exits remain usable");
  await page.screenshot({path: "/Users/moyaseen/projects/rich-review-v2/experiments/32-kit/screenshots/03-mobile-mechanism.png"});

  const noScriptContext = await page.context().browser().newContext({javaScriptEnabled: false, viewport: {width: 1200, height: 900}});
  const noScript = await noScriptContext.newPage();
  try {
    await noScript.goto(base + "/index.html");
    require(await noScript.locator("#overview .rk-decision").count() === 10, "Overview remains complete with JavaScript disabled");
    await noScript.locator("#d08-exit").click();
    require(noScript.url().endsWith("#detail-d08"), "Exits are ordinary anchors without JavaScript");
    await noScript.locator("#detail-d08 [data-return]").click();
    require(noScript.url().endsWith("#d08"), "Fallback backlinks work without JavaScript");
  } finally {
    await noScriptContext.close();
  }

  await page.setViewportSize({width: 1360, height: 1000});
  await page.goto(base + "/index.html");
  await page.screenshot({path: "/Users/moyaseen/projects/rich-review-v2/experiments/32-kit/screenshots/01-overview.png"});
  await page.locator("#d06-exit").click();
  await page.screenshot({path: "/Users/moyaseen/projects/rich-review-v2/experiments/32-kit/screenshots/02-release.png"});
  require(errors.length === 0, "No browser JavaScript errors");
  require(external.length === 0, "No network requests to external services");
  return {checks, browserErrors: errors, externalRequests: external, mobile};
}
