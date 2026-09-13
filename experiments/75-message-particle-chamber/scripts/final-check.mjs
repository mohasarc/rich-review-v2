import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFile,writeFile } from 'node:fs/promises';
import { fileURLToPath,pathToFileURL } from 'node:url';
import { resolve,join } from 'node:path';
import { createHash } from 'node:crypto';
const folder=resolve(fileURLToPath(new URL('..',import.meta.url)));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:1080}});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));const report={checks:[]};
try{
 await page.goto(pathToFileURL(join(folder,'index.html')).href+'#chamber=lifetime/expiry');await page.waitForFunction(()=>window.chamberReady);
 await page.locator('#next').click();await page.locator('#next').click();assert.equal((await page.evaluate(()=>window.chamberState)).trace,0);
 await page.locator('#instrument').scrollIntoViewIfNeeded();await page.screenshot({path:join(folder,'screenshots/04-expired-trace.png')});
 await page.locator('[data-scene="identity"]').click();await page.selectOption('#scenario','conflict');for(let i=0;i<3;i++)await page.locator('#next').click();assert.equal((await page.evaluate(()=>window.chamberState)).ledger,1);await page.screenshot({path:join(folder,'screenshots/05-conflict.png')});
 assert.equal(await page.locator('.scroll-hint').isVisible(),false);
 report.checks.push('Refreshed final lifetime and conflict screenshots; identity is retained and the desktop scroll hint is hidden.');
 await page.locator('#rule-manifest button').click();assert.equal(await page.locator('#return-surface').getAttribute('href'),'#rule-manifest');await page.locator('#return-surface').click();assert.equal(new URL(page.url()).hash,'#rule-manifest');report.checks.push('Fact → experiment → return restores the originating fact anchor.');
 await page.locator('.ownership-strip [data-source="intent"]').click();assert.ok((await page.locator('#receipt-code').innerText()).includes('Chose package staging'));assert.ok((await page.locator('#receipt-code').innerText()).includes('Chose package-owned result capture'));assert.equal((await page.locator('#receipt-code').innerText()).split('\n').length,2);await page.keyboard.press('Escape');report.checks.push('The stated-reason receipt contains only the two scoped, exact PR-body lines.');
 await page.setViewportSize({width:390,height:900});await page.locator('[data-scene="framing"]').click();for(let i=0;i<5;i++)await page.locator('#next').click();await page.locator('#instrument').scrollIntoViewIfNeeded();
 assert.equal(await page.locator('.scroll-hint').isVisible(),true);assert.ok(await page.locator('.canvas-scroll').evaluate(e=>e.scrollWidth>e.clientWidth));await page.screenshot({path:join(folder,'screenshots/06-phone.png')});
 await page.locator('.canvas-scroll').focus();await page.keyboard.press('End');await page.locator('.canvas-scroll').evaluate(e=>{e.scrollLeft=e.scrollWidth;});assert.ok(await page.locator('.canvas-scroll').evaluate(e=>e.scrollLeft>0));await page.screenshot({path:join(folder,'screenshots/07-phone-output.png')});
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}
 report.checks.push('Larger small-screen diagram text, visible sideways-scroll instruction, internal scrolling and no page overflow at four widths.');
 const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(scan.violations,[]);report.checks.push('Final DOM has zero automated WCAG A/AA violations.');
 assert.deepEqual(errors,[]);report.passed=true;
}catch(error){report.passed=false;report.failure=error.stack;throw error;}finally{
 report.errors=errors;report.artifactSha256=createHash('sha256').update(await readFile(join(folder,'assets/chamber.js'))).digest('hex');await writeFile(join(folder,'evidence/final-browser-checks.json'),JSON.stringify(report,null,2)+'\n');await browser.close();console.log(JSON.stringify(report,null,2));
}
