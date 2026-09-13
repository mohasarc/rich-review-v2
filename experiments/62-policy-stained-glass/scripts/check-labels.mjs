import {chromium} from 'playwright-core';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1050}});
await page.goto(pathToFileURL(resolve(root,'index.html')).href);
const result=await page.evaluate(()=>{
 const problems=[];
 document.querySelectorAll('.pane').forEach(pane=>{
  const fill=pane.querySelector('.glass-fill');
  pane.querySelectorAll('text tspan').forEach(tspan=>{
   const b=tspan.getBBox();
   const corners=[[b.x+1,b.y+1],[b.x+b.width-1,b.y+1],[b.x+1,b.y+b.height-1],[b.x+b.width-1,b.y+b.height-1]];
   if(!corners.every(([x,y])=>fill.isPointInFill(new DOMPoint(x,y))))problems.push({pane:pane.dataset.pane,text:tspan.textContent,bounds:{x:b.x,y:b.y,w:b.width,h:b.height}});
  });
 });
 return {problems};
});
writeFileSync(resolve(root,'evidence/label-check.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));await browser.close();
