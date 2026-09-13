async (page) => {
 const entries=[{"experiment":"01-unconstrained-a","file":"index.html"},{"experiment":"02-unconstrained-b","file":"index.html"},{"experiment":"03-unconstrained-c","file":"index.html"},{"experiment":"04-textbook-chapter","file":"index.html"},{"experiment":"05-boxes-static-vs-runtime","file":"index.html"},{"experiment":"06-hub-and-spokes","file":"index.html"},{"experiment":"07-stack-timeline","file":"index.html"},{"experiment":"08-adversarial","file":"index.html"},{"experiment":"09-diff-of-intent","file":"index.html"},{"experiment":"10-tour-guide","file":"index.html"},{"experiment":"11-chess-coach","file":"index.html"},{"experiment":"12-detective","file":"index.html"},{"experiment":"13-owner-persona","file":"index.html"},{"experiment":"14-outsider-persona","file":"index.html"},{"experiment":"15-message-choreography-sim","file":"index.html"},{"experiment":"16-drag-the-box","file":"index.html"},{"experiment":"17-executable-before-after","file":"index.html"},{"experiment":"18-negative-space","file":"index.html"},{"experiment":"19-type-level-only","file":"index.html"},{"experiment":"20-contract-table","file":"index.html"},{"experiment":"21-narrated-top","file":"index.html"},{"experiment":"22-game-any","file":"game.html"},{"experiment":"23-zoom-canvas","file":"index.html"},{"experiment":"24-question-driven-nav","file":"index.html"},{"experiment":"25-reader-sketch","file":"index.html"},{"experiment":"26-physical-analogy","file":"index.html"},{"experiment":"27-test-honesty","file":"index.html"},{"experiment":"28-blast-radius-tool","file":"index.html"},{"experiment":"29-refusal","file":"index.html"},{"experiment":"30-adjacent-pair","file":"index.html"},{"experiment":"31-method-runbook","file":"index.html"},{"experiment":"32-kit","file":"index.html"},{"experiment":"33-pair-one-variable","file":"index.html"},{"experiment":"34-inverted-for-experts","file":"index.html"},{"experiment":"35-future-self","file":"index.html"},{"experiment":"36-be-weird-a","file":"index.html"},{"experiment":"37-be-weird-b","file":"index.html"},{"experiment":"31-method-runbook","file":"method.html"},{"experiment":"31-method-runbook","file":"record.html"},{"experiment":"32-kit","file":"kit.html"},{"experiment":"32-kit","file":"starter.html"},{"experiment":"33-pair-one-variable","file":"failure.html"}];
 const context=await page.context().browser().newContext({viewport:{width:1440,height:1000},offline:true});
 const records=[];
 try { const p=await context.newPage(); for(const e of entries) {
  const errors=[]; const handler=error=>errors.push(String(error));p.on('pageerror',handler);
  try {
   await p.goto('file:///Users/moyaseen/projects/rich-review-v2/experiments/'+e.experiment+'/'+e.file,{waitUntil:'load',timeout:20000});
   await p.waitForTimeout(150);
   const record=await p.evaluate(()=>({
    title:document.title,text:document.body.innerText,
    headings:[...document.querySelectorAll('h1,h2,h3,h4')].filter(e=>e.getClientRects().length).map(e=>({level:e.tagName,text:e.innerText,id:e.id||e.closest('[id]')?.id,y:Math.round(e.getBoundingClientRect().top+scrollY)})),
    controls:[...document.querySelectorAll('button,summary,select,input,textarea')].filter(e=>e.getClientRects().length).map(e=>({tag:e.tagName,text:(e.innerText||e.getAttribute('aria-label')||e.name||e.type||'').slice(0,250),id:e.id})),
    details:[...document.querySelectorAll('details')].map(e=>({id:e.id,open:e.open,summary:e.querySelector('summary')?.innerText})),
    documentHeight:document.documentElement.scrollHeight
   }));
   records.push({...e,...record,errors});
   if(e.file==='index.html'&&['11','13','23','30','34','36','37'].includes(e.experiment.slice(0,2))) await p.screenshot({path:'/Users/moyaseen/projects/rich-review-v2/experiments/43-critique-refresh-20/receipts/'+e.experiment+'-opening.png'});
  }catch(error){records.push({...e,error:String(error),errors});}
  p.off('pageerror',handler);
 }}finally{await context.close();}
 return records;
}
