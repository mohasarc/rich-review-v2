import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const folder = new URL("./", import.meta.url);
const localPath = (relative) => fileURLToPath(new URL(relative, folder));
const pageUrl = (relative) => new URL(relative, folder).href;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export default async function check(page) {
  const browser = page.context().browser();
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const report = { geometry: [], interactions: [], consoleErrors: [], noJavaScript: [], screenshots: [] };
  try {
    const review = await context.newPage();
    review.on("pageerror", error => report.consoleErrors.push(error.message));
    review.on("console", message => { if (message.type() === "error") report.consoleErrors.push(message.text()); });
    review.on("requestfailed", request => report.consoleErrors.push(`${request.url()}: ${request.failure()?.errorText}`));
    let sharedDOM;
    for (const width of [320, 360, 375, 381, 390, 540, 640, 641, 768, 801, 960, 1280]) {
      await review.setViewportSize({ width, height: 900 });
      const pair = [];
      for (const file of ["index.html", "failure.html"]) {
        await review.goto(pageUrl(file));
        const geometry = await review.evaluate(() => ({
          pageWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          openingHeight: document.querySelector(".opening").getBoundingClientRect().height,
          commonStartY: document.querySelector("#overview").getBoundingClientRect().y,
          clippedOpeningElements: [...document.querySelectorAll(".opening > *, .opening-step")]
            .filter(el => el.scrollHeight > el.clientHeight + 2)
            .map(el => el.className || el.tagName),
          sharedDOM: [...document.querySelectorAll("main > :not(.opening)")].map(el => el.outerHTML).join("\n"),
        }));
        assert(geometry.pageWidth === geometry.viewportWidth, `${file} overflows at ${width}`);
        assert(geometry.clippedOpeningElements.length === 0, `${file} clips at ${width}`);
        if (!sharedDOM) sharedDOM = geometry.sharedDOM;
        assert(sharedDOM === geometry.sharedDOM, `Shared rendered DOM changed: ${file}, ${width}`);
        delete geometry.sharedDOM;
        pair.push({ file, ...geometry });
      }
      assert(pair[0].openingHeight === pair[1].openingHeight, `Opening heights differ at ${width}`);
      assert(pair[0].commonStartY === pair[1].commonStartY, `Body starts differ at ${width}`);
      report.geometry.push({ width, variants: pair, matched: true });
    }

    await review.setViewportSize({ width: 1280, height: 900 });
    for (const file of ["index.html", "failure.html"]) {
      await review.goto(pageUrl(file));
      await review.getByRole("link", { name: "Follow D1", exact: true }).click();
      assert(new URL(review.url()).hash === "#ownership", "Decision drill-in failed");
      await review.getByRole("link", { name: "↑ Back to D1", exact: true }).click();
      assert(new URL(review.url()).hash === "#D1", "Decision return failed");

      for (const outcome of ["reject", "resolve"]) {
        await review.locator("#release-outcome").selectOption(outcome);
        await review.locator("#trace-step").focus();
        await review.locator("#trace-step").press("Home");
        assert(await review.locator("#trace-prev").isDisabled(), "Initial previous button is not disabled");
        for (let step = 0; step <= 4; step++) {
          if (step) await review.locator("#trace-next").click();
          const state = await review.evaluate(() => ({
            step: Number(document.getElementById("trace-step").value),
            base: document.getElementById("base-caller").textContent,
            head: document.getElementById("head-caller").textContent,
            baseCache: document.getElementById("base-cache").textContent,
            headCache: document.getElementById("head-cache").textContent,
            freshSlots: document.querySelectorAll(".cache-slots .fresh").length,
          }));
          assert(state.step === step, "Next button did not advance one frame");
          assert(state.baseCache === state.headCache, "Cache behavior diverged in the model");
          if (step >= 2) assert(state.base === "Release fulfilled", "Base release should have finished");
          if (step >= 1 && step < 4) assert(state.head === "Release pending", "Head should still await cleanup");
          if (step === 4) assert(state.head === (outcome === "reject" ? "Release rejected" : "Release fulfilled"), "Head outcome mismatch");
          if (step >= 3) assert(state.freshSlots === 2, "Exactly one fresh entry per version should be shown");
          report.interactions.push({ file, outcome, ...state });
        }
        assert(await review.locator("#trace-next").isDisabled(), "Final next button is not disabled");
        await review.locator("#trace-prev").click();
        assert(await review.locator("#trace-step").inputValue() === "3", "Previous button failed");
      }
      await review.goto(pageUrl(file) + "#e-head-release-L130");
      assert(await review.locator("#e-head-release").getAttribute("open") !== null, "Deep source anchor did not open evidence");
      assert((await review.locator("#e-head-release-L130 code").textContent()).includes("cacheScope.releaseTransientResources"), "Wrong source line");
      await review.locator("#e-head-release > summary").click();
      assert(await review.locator("#e-head-release").getAttribute("open") === null, "Evidence disclosure did not close");
    }

    await review.goto(pageUrl("index.html"));
    await review.getByRole("link", { name: "Opening B", exact: true }).click();
    assert(new URL(review.url()).pathname.endsWith("/failure.html"), "Opening B link failed");
    await review.getByRole("link", { name: "Opening A", exact: true }).click();
    assert(new URL(review.url()).pathname.endsWith("/index.html"), "Opening A link failed");

    for (const [file, screenshot] of [["index.html", "01-metaphor-desktop.png"], ["failure.html", "02-failure-desktop.png"]]) {
      await review.goto(pageUrl(file));
      await review.screenshot({ path: localPath("screenshots/" + screenshot) });
      report.screenshots.push(screenshot);
    }
    await review.locator("#overview").screenshot({ path: localPath("screenshots/03-shared-decision-map.png") });
    report.screenshots.push("03-shared-decision-map.png");
    await review.locator("#trace-step").focus();
    await review.locator("#trace-step").press("End");
    await review.locator("#trace-prev").click();
    await review.locator("#release-trace").screenshot({ path: localPath("screenshots/04-shared-release-trace.png") });
    report.screenshots.push("04-shared-release-trace.png");
    await review.setViewportSize({ width: 390, height: 1100 });
    await review.goto(pageUrl("failure.html"));
    await review.screenshot({ path: localPath("screenshots/05-failure-mobile.png") });
    report.screenshots.push("05-failure-mobile.png");
    await review.goto(pageUrl("index.html"));
    await review.screenshot({ path: localPath("screenshots/06-metaphor-mobile.png") });
    report.screenshots.push("06-metaphor-mobile.png");
    assert(report.consoleErrors.length === 0, "Browser errors were recorded");
  } finally {
    await context.close();
  }

  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const review = await noScript.newPage();
    for (const file of ["index.html", "failure.html"]) {
      await review.goto(pageUrl(file));
      assert(await review.locator(".decision").count() === 10, "Decision map requires JavaScript");
      assert(!await review.locator("#release-trace").isVisible(), "Nonfunctional trace visible without JavaScript");
      await review.locator("#e-core > summary").click();
      assert(await review.locator("#e-core .source-lines").isVisible(), "Source disclosure requires JavaScript");
      report.noJavaScript.push({ file, decisions: 10, staticReleaseTablePresent: await review.getByText("At the backend’s release call", { exact: true }).count() === 1, sourceDisclosureWorks: true });
    }
  } finally {
    await noScript.close();
  }
  report.directFileOpening = true;
  report.sharedRenderedDOMEqual = true;
  report.deepSourceAnchorWorks = true;
  report.openingLinksWork = true;
  report.focusedPRTests = "See test-run.txt: 15 tests passed in 2 suites.";
  await writeFile(localPath("browser-verification.json"), JSON.stringify(report, null, 2) + "\n");
  return { widthsChecked: report.geometry.length, variantOutcomeFramesChecked: report.interactions.length, browserErrors: report.consoleErrors.length, noJavaScriptVariants: report.noJavaScript.length, screenshots: report.screenshots, directFileOpening: true, sharedRenderedDOMEqual: true };
}
