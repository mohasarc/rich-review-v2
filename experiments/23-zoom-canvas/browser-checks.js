async function checkCanvas(page) {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const errors = [];
  const onError = error => errors.push(error.message);
  page.on("pageerror", onError);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1560, height: 1120 });
  await page.goto("http://127.0.0.1:8423/index.html");
  await page.waitForFunction(() => window.zoomCanvas && document.body.dataset.depth === "1");
  await page.waitForTimeout(150);

  const manifest = await page.evaluate(() => ({
    decisions: window.REVIEW_DATA.decisions.length,
    excerpts: Object.keys(window.REVIEW_DATA.evidence).length,
    files: window.REVIEW_DATA.files.length,
    stops: window.zoomCanvas.state().sequence,
  }));
  assert(manifest.decisions === 25 && manifest.files === 153, "Incomplete input census");
  assert(await page.locator(".room>.cover .outline button").count() === 25, "Opening outline omitted a decision");
  const outlineClips = await page.evaluate(() => [...document.querySelectorAll(".room>.cover")].filter(e => e.scrollHeight > e.clientHeight + 1).map(e => e.parentElement.dataset.node));
  assert(!outlineClips.length, "Clipped opening decisions: " + outlineClips.join(", "));

  // Human navigation: enter a room, change an input, enter evidence, select a source.
  await page.getByRole("button", { name: "Enter Choose once; own the result", exact: true }).click();
  await settle();
  assert(await page.evaluate(() => window.zoomCanvas.state().active) === "routing", "Room entrance failed");
  const routes = [
    ["Daemon disabled", ["COLD / disabled", "reads 0", "observes 0", "no warm-up trigger"]],
    ["No registry record", ["COLD / absent", "reads 1", "observes 0", "+ independent warm-up"]],
    ["Record version differs", ["FALLBACK / incompatible", "observes 0"]],
    ["Compatible, busy and responsive", ["WARM / busy", "observes 1", "daemon execution"]],
    ["Process has exited", ["FALLBACK / dead", "removes 1"]],
    ["Observation identifies startup", ["COLD / starting", "observes 1"]],
  ];
  for (const [label, expected] of routes) {
    await page.locator("#route-scenario").selectOption({ label });
    const text = await page.locator(".route-effect").textContent();
    for (const phrase of expected) assert(text.includes(phrase), `Routing illustration: ${label} lacks ${phrase}`);
  }
  await page.locator('[data-node="D09"]>.cover').click();
  await settle();
  assert(await page.evaluate(() => window.zoomCanvas.state().active) === "D09", "Decision entrance failed");
  await page.locator("#source-D09").selectOption("1");
  assert((await page.locator('[data-node="D09"] .source-location').textContent()).includes("daemon-client.test.ts"), "Source switch failed");
  const code = page.locator('[data-node="D09"] .source-code');
  await code.hover();
  const beforeScroll = await page.evaluate(() => window.zoomCanvas.state().camera.scale);
  await page.mouse.wheel(0, 280);
  await page.waitForTimeout(80);
  assert(await code.evaluate(e => e.scrollTop) > 0, "Source wheel did not scroll the evidence");
  assert(await page.evaluate(() => window.zoomCanvas.state().camera.scale) === beforeScroll, "Source wheel moved the canvas");

  await page.keyboard.press("Escape");
  await settle();
  assert(await page.evaluate(() => window.zoomCanvas.state().active) === "routing", "Up did not preserve ancestry");
  await page.goBack();
  await settle();
  assert(await page.evaluate(() => window.zoomCanvas.state().active) === "D09", "Browser history did not restore the box");
  await page.keyboard.press("Home");
  await settle();
  await page.locator('[data-decision="D20"]').focus();
  await page.keyboard.press("Enter");
  await settle();
  assert(await page.evaluate(() => window.zoomCanvas.state().active) === "D20", "Keyboard outline jump selected the wrong box");
  await page.keyboard.press("ArrowRight");
  await settle();
  assert(await page.evaluate(() => window.zoomCanvas.state().active) === "D21", "Linear tour did not advance");

  // Every fit must make its own content readable, with a usable source scroller.
  const contentProblems = [], sourceProblems = [];
  let sourceSelections = 0;
  for (const id of manifest.stops.slice(1)) {
    await page.evaluate(id => window.zoomCanvas.focus(id), id);
    await settle();
    const result = await page.evaluate(id => {
      const n = document.querySelector(`[data-node="${id}"]`), inside = n.querySelector(":scope>.inside");
      return { id, overflow: inside.scrollHeight - inside.clientHeight,
        sourceHeight: n.classList.contains("decision") ? inside.querySelector(".source-code").clientHeight : null,
        clippedCards: [...inside.querySelectorAll(".decision>.cover")].filter(e => e.clientHeight > 0 && e.scrollHeight > e.clientHeight + 1).map(e => e.parentElement.dataset.node) };
    }, id);
    if (result.overflow > 1 || (result.sourceHeight !== null && result.sourceHeight < 130) || result.clippedCards.length) contentProblems.push(result);
    if (id.startsWith("D")) {
      const count = await page.locator(`#source-${id} option`).count();
      for (let i = 0; i < count; i++) {
        await page.locator(`#source-${id}`).selectOption(String(i));
        sourceSelections++;
        if (!(await page.locator(`[data-node="${id}"] .source-code`).textContent()).trim()) sourceProblems.push([id, i]);
      }
    }
  }
  assert(!contentProblems.length, JSON.stringify(contentProblems));
  assert(!sourceProblems.length, "Empty source views: " + JSON.stringify(sourceProblems));

  await page.evaluate(() => window.zoomCanvas.focus("root"));
  await settle();
  await page.locator("#open-census").click();
  await settle();
  assert(await page.locator(".file-inspector").evaluate(e => e.classList.contains("open")), "File census did not open");
  await page.locator(".file-inspector select").selectOption("152");
  assert((await page.locator(".file-inspector pre").textContent()).includes("pnpm-lock.yaml"), "Last file missing from census");
  await page.keyboard.press("Escape");
  await page.locator("#next").click();
  await settle();
  assert(!(await page.locator(".file-inspector").evaluate(e => e.classList.contains("open"))), "Census covers deeper content");

  // Camera gestures change the scene without writing review state.
  await page.keyboard.press("Home");
  await settle();
  const initial = await page.evaluate(() => window.zoomCanvas.state().camera);
  await page.mouse.move(780, 100);
  await page.mouse.down();
  await page.mouse.move(815, 130, { steps: 5 });
  await page.mouse.up();
  const panned = await page.evaluate(() => window.zoomCanvas.state().camera);
  assert(Math.abs(panned.x - initial.x) > 20, "Drag did not pan the world");
  await page.mouse.wheel(0, -190);
  await settle();
  const zoomed = await page.evaluate(() => window.zoomCanvas.state().camera);
  assert(zoomed.scale > panned.scale, "Wheel did not zoom the world");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(180);
  await page.evaluate(() => window.zoomCanvas.focus("root"));
  await settle();
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert(!desktopOverflow, "Desktop chrome overflows horizontally");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(180);
  await page.evaluate(() => window.zoomCanvas.focus("D17"));
  await settle();
  assert(await page.locator('[data-node="D17"]>.inside').isVisible(), "Narrow-screen box fit lost semantic content");
  const phoneOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert(!phoneOverflow, "Narrow-screen chrome overflows horizontally");

  // Static scripts must also work with no HTTP server.
  await page.goto("file:///Users/moyaseen/projects/rich-review-v2/experiments/23-zoom-canvas/index.html#D17");
  await page.waitForFunction(() => window.zoomCanvas?.state().active === "D17");
  assert((await page.locator('[data-node="D17"] .source-code').textContent()).includes("navigationAccepted"), "File URL source bank failed");
  assert(!errors.length, "Browser errors: " + errors.join("; "));
  page.off("pageerror", onError);
  await page.setViewportSize({ width: 1560, height: 1120 });
  await page.goto("http://127.0.0.1:8423/index.html");
  await page.waitForTimeout(180);
  return { passed: true, files: manifest.files, decisions: manifest.decisions, uniqueExcerpts: manifest.excerpts,
    sourceSelections, tourStops: manifest.stops.length, routingCases: routes.length,
    contentProblems, browserErrors: errors, viewportChecks: ["1560×1120", "1440×900", "390×844"],
    fileUrl: true, scope: "Artifact navigation and rendered evidence only. Symnav suites were not run." };
}
