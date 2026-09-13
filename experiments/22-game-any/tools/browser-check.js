async (page) => {
  const failures=[];
  const checks=[];
  const check=(name,condition)=>{if(!condition)failures.push(name);checks.push({name,passed:!!condition});};
  const errors=[];
  const onError=error=>errors.push(error.message);
  page.on('pageerror',onError);
  await page.setViewportSize({width:1200,height:880});
  await page.goto(page.url().split('#')[0].replace(/[^/]*$/,'game.html'));
  await page.locator('.decision-row').last().waitFor();
  const root=await page.evaluate(()=>({
    decisions:document.querySelectorAll('.decision-row').length,
    extras:document.querySelectorAll('.extra-card').length,
    policy:document.querySelectorAll('#policy-rows tr').length,
    rootVisible:[...document.querySelectorAll('.decision-row,.extra-card')].every(e=>e.getClientRects().length>0),
    rootBeforePlay:document.querySelector('#policy-record').compareDocumentPosition(document.querySelector('#play'))===Node.DOCUMENT_POSITION_FOLLOWING,
    brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href').slice(1)).filter(id=>id&&!document.getElementById(id)),
    invalidRefs:[...document.querySelectorAll('[data-ref]')].map(e=>e.dataset.ref).filter(id=>!document.getElementById('decision-'+id))
  }));
  check('117 declared + 20 supplementary + 44 policy rows rendered before play',root.decisions===117&&root.extras===20&&root.policy===44&&root.rootBeforePlay);
  check('all root decisions exposed without an unlock',root.rootVisible);
  check('all root navigation anchors and evidence IDs resolve',root.brokenAnchors.length===0&&root.invalidRefs.length===0);
  await page.locator('[data-map="before"]').click();
  check('main map shows absent daemon package',(await page.locator('#reference-map').innerText()).includes('No daemon package in main'));
  await page.locator('[data-map="after"]').click();
  check('tip map shows daemon mechanism owner',(await page.locator('#reference-map').innerText()).includes('DaemonClient'));
  await page.locator('#station-owners').click();
  await page.locator('#piece-source').focus();await page.keyboard.press('Enter');
  await page.locator('#place-core').focus();await page.keyboard.press('Enter');
  check('keyboard placement moves a piece',await page.locator('#piece-source').evaluate(e=>e.parentElement.textContent.includes('@symnav/core')));
  await page.locator('#undo').click();
  check('Undo restores the previous owner',await page.locator('#piece-source').evaluate(e=>e.parentElement.textContent.includes('TypeScript backend')));
  const completed=[];
  for(const id of ['owners','cache','gates','worker','transfer']) {
    await page.locator('#station-'+id).click();
    await page.locator('#restart').click();
    let moves=0;
    while(!(await page.locator('.completion-banner').count())&&moves++<60)await page.locator('#walkthrough').click();
    const done=await page.locator('.completion-banner').count()===1;
    check('browser controls complete '+id,done);completed.push({id,moves});
  }
  await page.locator('[data-transfer-mode="reattach"]').click();
  let moves=0;
  while(!(await page.locator('.completion-banner').count())&&moves++<60)await page.locator('#walkthrough').click();
  check('browser controls complete separate reattachment scope',await page.locator('.completion-banner').count()===1);
  await page.locator('#station-transfer').focus();await page.keyboard.press('ArrowLeft');
  await page.locator('#station-worker[aria-selected="true"]').waitFor();
  check('arrow-key tab navigation selects worker',await page.locator('#station-worker').getAttribute('aria-selected')==='true');
  check('station state survives navigation',await page.locator('.completion-banner').count()===1);
  await page.locator('#station-panel [data-ref="145.4"]').click();
  check('evidence opens with source excerpt',await page.locator('#evidence-dialog').isVisible()&&await page.locator('.source-code').count()===1);
  await page.keyboard.press('Escape');
  check('Escape closes evidence and restores focus',!(await page.locator('#evidence-dialog').isVisible())&&await page.evaluate(()=>document.activeElement.dataset.ref==='145.4'));
  const evidence=await page.evaluate(async()=>{
    const ids=Object.keys(window.BRIEFING.evidence);
    const results=[];
    for(let i=0;i<ids.length;i+=4){
      const batch=ids.slice(i,i+4);
      const settled=await Promise.allSettled(batch.map(async id=>({id,ok:(await fetch('evidence/'+id+'.html')).ok})));
      settled.forEach((result,j)=>results.push(result.status==='fulfilled'?result.value:{id:batch[j],ok:false,error:String(result.reason)}));
    }
    return {total:results.length,failed:results.filter(r=>!r.ok)};
  });
  check('all 46 pinned source pages load',evidence.total===46&&evidence.failed.length===0);
  const widths=[];
  for(const width of [320,390,768,1200]) {
    await page.setViewportSize({width,height:844});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    check('no document overflow at '+width+'px',overflow===0);widths.push({width,overflow});
  }
  check('no JavaScript runtime exceptions',errors.length===0);
  page.off('pageerror',onError);
  if(failures.length)throw new Error(JSON.stringify({failures,root,widths,errors}));
  return {checks,completed,widths,evidence,errors};
}
