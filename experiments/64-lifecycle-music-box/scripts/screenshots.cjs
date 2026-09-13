const {chromium}=require(process.env.MUSIC_BOX_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');
const {resolve}=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
 await page.goto('file://'+resolve(__dirname,'../index.html'));await page.screenshot({path:resolve(__dirname,'../screenshots/01-opening.png'),fullPage:true});
 await page.locator('#checkpoint').click();await page.locator('#instrument').screenshot({path:resolve(__dirname,'../screenshots/00-instrument.png')});await page.locator('#status-pair').scrollIntoViewIfNeeded();await page.screenshot({path:resolve(__dirname,'../screenshots/02-release-split.png')});
 await page.setViewportSize({width:390,height:844});await page.locator('.roll').first().scrollIntoViewIfNeeded();await page.screenshot({path:resolve(__dirname,'../screenshots/05-mobile-instrument.png')});
 console.log(await page.locator('.roll-body').first().evaluate(el=>({scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,svg:el.querySelector('svg').getBoundingClientRect().toJSON()})));
 await browser.close();
})();
