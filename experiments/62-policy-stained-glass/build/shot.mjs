import { chromium } from "playwright-core";

const [url, output, width = "1440", height = "900"] = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
const messages = [];
page.on("console", (message) => messages.push(`${message.type()}: ${message.text()}`));
page.on("pageerror", (error) => messages.push(`pageerror: ${error.message}`));
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(800);
await page.screenshot({ path: output, fullPage: false });
console.log(messages.join("\n") || "no console messages");
await browser.close();
