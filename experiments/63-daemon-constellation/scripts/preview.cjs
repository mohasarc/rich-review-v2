const {chromium}=require(process.env.CONSTELLATION_PLAYWRIGHT || '/tmp/rich-review-05-browser/node_modules/playwright');
const path=require('path');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1440,height:1050},deviceScaleFactor:1});
page.on('pageerror',e=>console.log('PAGE ERROR',e.message));
await page.goto('file://'+path.resolve(__dirname,'../index.html'));
await page.waitForFunction(()=>window.constellation);
await page.screenshot({path:path.resolve(__dirname,'../screenshots/01-opening.png'),fullPage:true});
await page.locator('.observatory').screenshot({path:path.resolve(__dirname,'../screenshots/02-map.png')});
console.log(await page.evaluate(()=>({nodes:document.querySelectorAll('.star').length,folders:document.querySelectorAll('.orbit').length,width:document.documentElement.scrollWidth,viewport:innerWidth,graph:window.constellation.graph.size,readings:window.constellation.readings.length})));
await browser.close();
})();
