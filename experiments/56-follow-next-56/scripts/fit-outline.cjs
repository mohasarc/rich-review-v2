// Measure candidate D13/D04 outline strings inside the unchanged page-23 room covers.
// Usage: node scripts/fit-outline.cjs
const { chromium } = require("/tmp/rich-review-05-browser/node_modules/playwright");
const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");

const HERE = path.resolve(__dirname, "..");
const candidates = {
  D13: [
    "Separate protocol/instance and token paths, including control exceptions.",
    "Ping/stop: protocol+instance. Others add token; identify/terminate/kill drop protocol.",
    "Ping/stop: protocol+instance only. Others add token; identify/terminate/kill drop protocol.",
    "Ping/stop: protocol+instance, no token. Others add token; identify/terminate/kill drop protocol.",
    "Ping/stop: protocol+instance, no token. Execute/status/fetch/ack add token; identify/terminate/kill drop protocol.",
  ],
  D04: [
    "Node-free host types; executor/environment inputs; runtime loads at construction.",
    "Node-free host types; executor/environment inputs; no policy → currentSystem(); one load at construction, its failure rejects every call.",
    "Node-free host types; executor/environment inputs; omitted policy → currentSystem(); one load at construction, its failure rejects every call.",
  ],
};

(async () => {
  const browser = await chromium.launch({ executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell` });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(pathToFileURL(path.join(HERE, "pages/148-original/index.html")).href);
  await page.waitForSelector("ul.outline li button", { state: "visible" });
  await page.waitForTimeout(1200);
  const rows = [];
  for (const [id, strings] of Object.entries(candidates)) {
    for (const text of strings) {
      rows.push(await page.evaluate(([id, text]) => {
        const button = document.querySelector(`button[data-decision="${id}"]`);
        const original = button.textContent;
        button.textContent = text;
        const cover = button.closest(".cover");
        const lineHeight = parseFloat(getComputedStyle(button).lineHeight);
        const rect = button.getBoundingClientRect();
        const allButtons = [...cover.querySelectorAll("button[data-decision]")];
        const last = allButtons[allButtons.length - 1].getBoundingClientRect();
        const style = getComputedStyle(cover);
        const coverRect = cover.getBoundingClientRect();
        const result = {
          id,
          chars: text.length,
          lines: Math.round(rect.height / lineHeight),
          scrollOverflowPx: cover.scrollHeight - cover.clientHeight,
          lastOutlineBottomToCoverInnerPx: Math.round((coverRect.bottom - parseFloat(style.paddingBottom) - last.bottom) * 10) / 10,
          text,
        };
        button.textContent = original;
        return result;
      }, [id, text]));
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(HERE, "captures/outline-fit.json"), JSON.stringify(rows, null, 2) + "\n");
  for (const row of rows) console.log(row.id, row.chars, "lines", row.lines, "overflow", row.scrollOverflowPx, "gap", row.lastOutlineBottomToCoverInnerPx, "|", row.text);
})();
