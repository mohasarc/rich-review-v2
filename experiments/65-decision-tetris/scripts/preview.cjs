const {chromium}=require(process.env.BOARD_PLAYWRIGHT||'/tmp/rich-review-05-browser/node_modules/playwright');
const path=require('node:path');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto('file://'+path.resolve(__dirname,'../index.html'));
  await page.waitForFunction(()=>window.BOARD);
  await page.screenshot({path:path.resolve(__dirname,'../screenshots/preview.png'),fullPage:true});
  console.log(JSON.stringify({errors,state:await page.evaluate(()=>BOARD.state),overflow:await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth})),board:await page.locator('#packing').boundingBox()},null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
