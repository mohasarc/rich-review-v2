// Measure candidate outline strings where page 23 reuses them: root room covers and room-level decision covers.
// Usage: node scripts/fit-room.cjs
const { chromium } = require("/tmp/rich-review-05-browser/node_modules/playwright");
const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");

const HERE = path.resolve(__dirname, "..");
const EXECUTABLE = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const candidates = {
  D04: [
    "Node-free host types; executor/environment inputs; runtime loads at construction.",
    "Node-free host types; executor/environment inputs; omitted policy → currentSystem(); a failed load rejects every call.",
    "Node-free host types; executor/environment inputs; no policy → currentSystem(); a failed construction load rejects calls.",
    "Node-free host types; executor/environment inputs; no policy → currentSystem(); failed load at construction rejects calls.",
    "Node-free host types; executor/environment inputs; no policy → currentSystem(); loads at construction; failure rejects calls.",
    "Node-free host types; executor/environment inputs; no policy → currentSystem(); construction load failure rejects calls.",
  ],
  D13: [
    "Separate protocol/instance and token paths, including control exceptions.",
    "Ping/stop: protocol+instance, no token. Others add token; identify/terminate/kill drop protocol.",
    "Ping/stop: protocol+instance. Others add token; identify/terminate/kill drop protocol.",
    "Ping/stop: protocol+instance only. Others add token; identify/terminate/kill drop protocol.",
  ],
};
const roomOf = { D04: "facade", D13: "process" };

async function measure(page, id, text, level) {
  return page.evaluate(([id, text, level]) => {
    const target = level === "root"
      ? document.querySelector(`button[data-decision="${id}"]`)
      : [...document.querySelectorAll("h3.decision-title")].find((title) => title.closest(".cover")?.parentElement?.dataset?.id === id || title.closest("[data-id]")?.dataset?.id === id) ||
        [...document.querySelectorAll("h3.decision-title")].find((title) => title.closest(".cover").querySelector(".decision-id")?.textContent.startsWith(id));
    const original = target.textContent;
    target.textContent = text;
    const cover = target.closest(".cover");
    const overflow = cover.scrollHeight - cover.clientHeight;
    let bottomLabelShiftPx = null;
    if (level === "room") {
      const labels = [...cover.parentElement.parentElement.querySelectorAll(".cover-bottom")];
      const own = cover.querySelector(".cover-bottom").getBoundingClientRect();
      const ownCover = cover.getBoundingClientRect();
      const siblingOffsets = labels.filter((label) => label.closest(".cover") !== cover).map((label) => label.getBoundingClientRect().top - label.closest(".cover").getBoundingClientRect().top);
      bottomLabelShiftPx = Math.round(((own.top - ownCover.top) - Math.min(...siblingOffsets)) * 10) / 10;
    }
    const lineHeight = parseFloat(getComputedStyle(target).lineHeight) || parseFloat(getComputedStyle(target).fontSize) * 1.2;
    const lines = Math.round(target.getBoundingClientRect().height / lineHeight);
    target.textContent = original;
    return { id, level, chars: text.length, lines, overflow, bottomLabelShiftPx, text };
  }, [id, text, level]);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXECUTABLE });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const rows = [];
  for (const [id, strings] of Object.entries(candidates)) {
    for (const level of ["root", "room"]) {
      const page = await context.newPage();
      await page.goto(pathToFileURL(path.join(HERE, "pages/148-original/index.html")).href + (level === "room" ? `#${roomOf[id]}` : ""));
      await page.waitForLoadState("load");
      await page.waitForTimeout(1500);
      for (const text of strings) rows.push(await measure(page, id, text, level));
      await page.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(HERE, "captures/outline-fit-levels.json"), JSON.stringify(rows, null, 2) + "\n");
  for (const row of rows) console.log(row.id, row.level, row.chars, "lines", row.lines, "overflow", row.overflow, "shift", row.bottomLabelShiftPx, "|", row.text);
})();
