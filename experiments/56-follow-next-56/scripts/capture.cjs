// Capture the declared top layer of each page variant: rendered text, element geometry, screenshots.
// Usage: node scripts/capture.cjs
const { chromium } = require("/tmp/rich-review-05-browser/node_modules/playwright");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const HERE = path.resolve(__dirname, "..");
const OUT = path.join(HERE, "captures");
const VIEWPORT = { width: 1440, height: 1000 };
const TILE = 1000;

async function capture127(browser, variant) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(pathToFileURL(path.join(HERE, "pages", `127-${variant}`, "index.html")).href);
  await page.waitForLoadState("load");
  await page.waitForTimeout(600);
  const data = await page.evaluate(() => {
    const regions = [document.querySelector("header.masthead"), document.querySelector("#top"), document.querySelector("#whole-change")];
    const text = regions.map((region) => region.innerText.trim()).join("\n\n");
    const elements = [];
    for (const region of regions) {
      for (const element of [region, ...region.querySelectorAll("*")]) {
        const rect = element.getBoundingClientRect();
        elements.push({
          tag: element.tagName.toLowerCase(),
          id: element.id || undefined,
          className: typeof element.className === "string" ? element.className : undefined,
          rect: [rect.x, rect.y + window.scrollY, rect.width, rect.height].map((v) => Math.round(v * 10) / 10),
          ownText: [...element.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim().slice(0, 80),
        });
      }
    }
    const stop = document.querySelector("#whole-change .stop-line").getBoundingClientRect();
    const cards = [...document.querySelectorAll(".decision-grid > li")].map((li) => {
      const r = li.getBoundingClientRect();
      return { id: li.id, rect: [r.x, r.y + window.scrollY, r.width, r.height].map((v) => Math.round(v)) };
    });
    return { text, elements, stopBottom: Math.ceil(stop.bottom + window.scrollY), documentHeight: document.documentElement.scrollHeight, cards };
  });
  const shots = [];
  for (let y = 0, index = 1; y < data.stopBottom; y += TILE, index += 1) {
    const height = Math.min(TILE, data.stopBottom - y);
    const file = path.join(OUT, `127-${variant}-top-${index}.png`);
    await page.screenshot({ path: file, clip: { x: 0, y, width: VIEWPORT.width, height }, fullPage: true });
    shots.push(path.relative(HERE, file));
  }
  await context.close();
  return { variant, errors, ...data, screenshots: shots };
}

async function capture148(browser, variant) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(pathToFileURL(path.join(HERE, "pages", `148-${variant}`, "index.html")).href);
  await page.waitForLoadState("load");
  await page.waitForSelector("ul.outline li button", { state: "visible" });
  await page.waitForTimeout(1200);
  const data = await page.evaluate(() => {
    const text = document.body.innerText.trim();
    const rooms = [...document.querySelectorAll("ul.outline")].map((outline) => {
      const cover = outline.closest(".cover");
      const coverRect = cover.getBoundingClientRect();
      const style = getComputedStyle(cover);
      const innerBottom = coverRect.bottom - parseFloat(style.paddingBottom) - parseFloat(style.borderBottomWidth);
      const bottomNote = cover.querySelector(".cover-bottom");
      const contentBottom = Math.max(outline.getBoundingClientRect().bottom, bottomNote ? bottomNote.getBoundingClientRect().bottom : 0);
      const buttons = [...outline.querySelectorAll("button[data-decision]")].map((button) => {
        const r = button.getBoundingClientRect();
        return { id: button.dataset.decision, rect: [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 10) / 10), lines: Math.round(r.height / parseFloat(getComputedStyle(button).lineHeight || "0")) || null };
      });
      return {
        title: cover.querySelector(".room-title")?.textContent,
        coverRect: [coverRect.x, coverRect.y, coverRect.width, coverRect.height].map((v) => Math.round(v * 10) / 10),
        scrollOverflowPx: cover.scrollHeight - cover.clientHeight,
        contentBottomPx: Math.round(contentBottom * 10) / 10,
        innerBottomPx: Math.round(innerBottom * 10) / 10,
        marginPx: Math.round((innerBottom - contentBottom) * 10) / 10,
        buttons,
      };
    });
    return { text, rooms };
  });
  const file = path.join(OUT, `148-${variant}-root.png`);
  await page.screenshot({ path: file });
  const roomViews = {};
  for (const room of ["facade", "process"]) {
    const roomPage = await context.newPage();
    roomPage.on("pageerror", (error) => errors.push(`${room}: ${error.message}`));
    await roomPage.goto(pathToFileURL(path.join(HERE, "pages", `148-${variant}`, "index.html")).href + `#${room}`);
    await roomPage.waitForLoadState("load");
    await roomPage.waitForTimeout(1500);
    roomViews[room] = await roomPage.evaluate(() => [...document.querySelectorAll("h3.decision-title")]
      .filter((title) => title.getBoundingClientRect().width > 0 && title.closest(".cover") && getComputedStyle(title.closest(".cover")).visibility !== "hidden")
      .map((title) => {
        const cover = title.closest(".cover");
        const coverRect = cover.getBoundingClientRect();
        const titleRect = title.getBoundingClientRect();
        return {
          text: title.textContent,
          coverScrollOverflowPx: cover.scrollHeight - cover.clientHeight,
          titleInsideCover: titleRect.bottom <= coverRect.bottom && titleRect.right <= coverRect.right + 0.5,
        };
      }));
    const roomFile = path.join(OUT, `148-${variant}-room-${room}.png`);
    await roomPage.screenshot({ path: roomFile });
    await roomPage.close();
  }
  await context.close();
  return { variant, errors, ...data, roomViews, screenshots: [path.relative(HERE, file)] };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell` });
  const result = { capturedAt: new Date().toISOString(), viewport: VIEWPORT, arms: { 127: {}, 148: {} } };
  for (const variant of ["original", "promoted"]) {
    result.arms[127][variant] = await capture127(browser, variant);
    result.arms[148][variant] = await capture148(browser, variant);
    fs.writeFileSync(path.join(OUT, `127-${variant}-top.txt`), result.arms[127][variant].text + "\n");
    fs.writeFileSync(path.join(OUT, `148-${variant}-root.txt`), result.arms[148][variant].text + "\n");
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, "capture.json"), JSON.stringify(result, null, 2) + "\n");
  for (const arm of ["127", "148"]) {
    for (const variant of ["original", "promoted"]) {
      const r = result.arms[arm][variant];
      console.log(arm, variant, "errors", r.errors.length, "screens", r.screenshots.length, arm === "127" ? `stopBottom ${r.stopBottom}` : `margins ${r.rooms.map((room) => room.marginPx).join(",")} overflow ${r.rooms.map((room) => room.scrollOverflowPx).join(",")}`);
    }
  }
})();
