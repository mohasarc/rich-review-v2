async (page) => {
  const url = "file:///Users/moyaseen/projects/rich-review-v2/experiments/24-question-driven-nav/index.html";
  const p = page.context().pages().find((candidate) => candidate.url().startsWith(url)) ||
    await page.context().newPage();
  const errors = [];
  p.on("pageerror", (error) => errors.push(error.message));
  const checks = [];
  const expect = (condition, name, details = null) => {
    if (!condition) throw new Error(name + ": " + JSON.stringify(details));
    checks.push({ check: name, passed: true, ...(details ? { details } : {}) });
  };
  const visit = async (id) => {
    await p.goto(url + "#" + id);
    await p.locator("#node-" + id).waitFor();
  };
  await p.setViewportSize({ width: 1440, height: 1080 });
  await visit("overview");
  expect(await p.locator(".overview-card").count() === 7, "All seven top-level answers are visible");
  const order = await p.evaluate(() => window.REVIEW_NODES.map((n) => n.id));
  expect(order.length === 15, "Fifteen question nodes are available");
  const graph = await p.evaluate(() => window.REVIEW_NODES.map((n) => ({ id: n.id, choices: n.choices })));
  expect(graph.every((n) => n.choices.length >= 2 && n.choices.every((c) =>
    order.includes(c.target) && c.question.endsWith("?"))), "Every node ends with valid questions");

  const story = ["overview", "ownership", "sharing", "turn", "release", "failures", "surface", "tests", "overview"];
  for (let i = 1; i < story.length; i++) {
    await p.locator("article .question-link.continue").click();
    await p.locator("#node-" + story[i]).waitFor();
  }
  expect(true, "The complete linear question route works", story);

  await p.locator('.overview-card a[data-go="release"]').click();
  const evidenceLink = p.locator('article .questions a[data-go="e-release"]');
  await evidenceLink.scrollIntoViewIfNeeded();
  const savedScroll = await p.evaluate(() => window.scrollY);
  await evidenceLink.click();
  await p.locator("#node-e-release").waitFor();
  expect(await p.locator("#trail li").count() === 3, "Evidence descent retains the question path");
  await p.locator("#return").click();
  await p.locator("#node-release").waitFor();
  await p.waitForFunction((scroll) => Math.abs(window.scrollY - scroll) < 4, savedScroll);
  expect(true, "Return restores the originating question and scroll position");
  await p.goBack();
  await p.locator("#node-e-release").waitFor();
  expect(true, "Native browser Back restores the prior node");

  await visit("turn");
  await p.locator('[data-turn="success"]').click();
  expect((await p.locator('[data-screen="turn"]').innerText()).includes("B · newly created"),
    "Successful-refresh illustration creates the next entry");
  await p.locator('[data-turn="failure"]').click();
  expect((await p.locator('[data-screen="turn"]').innerText()).includes("key → A"),
    "Failed-refresh illustration retains the current entry");
  await p.locator('[data-turn="release"]').click();
  expect((await p.locator('[data-screen="turn"]').innerText()).includes("even while project cleanup is pending"),
    "Release illustration shows that handles remain usable");

  await visit("release");
  await p.locator('[data-release="pending"]').click();
  expect((await p.locator('[data-screen="release"]').innerText()).includes("cleared synchronously") &&
    await p.locator('[data-screen="release"] .token').filter({ hasText: "pending" }).count() === 2,
    "Pending-release frame separates eviction from two pending promises");
  await p.locator('[data-release="rejected"]').click();
  expect(await p.locator('[data-screen="release"] .failure').count() === 2,
    "Rejected-release frame propagates the same error through both boundaries");
  await p.locator('[data-release="resolved"]').click();
  expect(await p.locator('[data-screen="release"] .token').filter({ hasText: "resolved" }).count() === 2,
    "Resolved-release frame completes both awaited boundaries");

  await visit("e-failures");
  expect(await p.locator("#trail li").count() === 3, "A fresh evidence deep link reconstructs its ancestors");
  await p.locator("#reading-mode").click();
  expect(await p.locator("article").count() === 15 && await p.locator("article .questions").count() === 15,
    "Read-in-order mode exposes all nodes and every question footer");
  const orphanedLinks = await p.evaluate(() => [...document.querySelectorAll('a[data-go]')]
    .filter((a) => !window.REVIEW_NODES.some((n) => n.id === a.dataset.go)).map((a) => a.outerHTML));
  expect(orphanedLinks.length === 0, "Every rendered internal navigation link resolves", orphanedLinks);
  await p.locator("#reading-mode").click();
  expect(await p.locator("article").count() === 1 && await p.locator("#node-e-failures").count() === 1,
    "Leaving read-in-order mode keeps the current question");

  await p.goto(url + "#read/release");
  await p.locator("#node-release").waitFor();
  await p.waitForFunction(() => Math.abs(document.querySelector("#node-release").getBoundingClientRect().top - 100) < 10);
  expect(true, "A fresh read-in-order deep link lands on its named node");
  for (const width of [1440, 1024, 768, 390, 320]) {
    await p.setViewportSize({ width, height: 900 });
    const measured = await p.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(measured.document <= width, "No document overflow at " + width + " px", measured);
  }

  await p.setViewportSize({ width: 390, height: 844 });
  await visit("overview");
  const focusCheck = p.locator('.overview-card a[data-go="ownership"]');
  await focusCheck.focus();
  await p.keyboard.press("Enter");
  await p.locator("#node-ownership").waitFor();
  await p.waitForFunction(() => document.activeElement.id === "title-ownership");
  expect(await p.evaluate(() => document.activeElement.id) === "title-ownership",
    "Keyboard navigation focuses the new question heading");

  for (const id of order) {
    await visit(id);
    expect(await p.locator("article .questions a").count() === 3, "Direct file deep link and question footer: " + id);
  }
  expect(errors.length === 0, "No uncaught browser errors", errors);
  await p.setViewportSize({ width: 1440, height: 1080 });
  await visit("overview");
  return { checkedAt: new Date().toISOString(), browser: "Playwright Chromium", checks, errors };
}
