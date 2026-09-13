async (page) => {
  const root = '/Users/moyaseen/projects/rich-review-v2/experiments/14-outsider-persona';
  const context = await page.context().browser().newContext({
    viewport: {width:1440,height:1100}, reducedMotion:'reduce'
  });
  const p = await context.newPage();
  const errors=[], requests=[], checks=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.on('request',request=>requests.push(request.url()));
  const check=(name,condition)=>{if(!condition)throw new Error(name);checks.push(name);};
  try {
    await p.goto(`file://${root}/index.html`);
    await p.waitForSelector('#pr-149');
    const inventory=await p.evaluate(()=>({
      choices:document.querySelectorAll('#choice-sheet .decision').length,
      extra:document.querySelectorAll('#extra-choices .decision').length,
      policies:document.querySelectorAll('#policy-rows tr').length,
      missingSources:window.OUTSIDER_DEBUG.validateSources(),
      brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')),
      duplicateIds:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,all)=>all.indexOf(id)!==i),
      width:document.documentElement.scrollWidth, viewport:innerWidth
    }));
    check('All 117 PR choices and 44 policy rows render',inventory.choices===117 && inventory.policies===44);
    check('Every source reference resolves',inventory.missingSources.length===0);
    check('Every anchor resolves and every ID is unique',inventory.brokenAnchors.length===0&&inventory.duplicateIds.length===0);
    check('Desktop has no page-wide horizontal overflow',inventory.width===inventory.viewport);
    await p.locator('#map').screenshot({path:`${root}/screenshots/01-system-map.png`});
    await p.locator('#boundary').screenshot({path:`${root}/screenshots/02-ownership.png`});

    await p.locator('.runtime-map a[href="#choices-state"]').first().click();
    check('A system box jumps to its decision branch',await p.evaluate(()=>location.hash==='#choices-state'));
    await p.locator('#d123-1 summary').click();
    check('Choice expands its recorded rationale',await p.locator('#d123-1 .decision-body').isVisible());
    await p.locator('#d123-1 [data-pr]').click();
    check('Original PR opens in the evidence drawer',(await p.locator('#source-title').innerText()).includes('#123'));
    check('Original commit metadata is available',(await p.locator('#source-code').innerText()).includes('Characterize backend selection replacement'));
    await p.keyboard.press('Escape');
    check('Escape closes the drawer and restores focus',await p.evaluate(()=>!document.querySelector('#source-dialog').open&&document.activeElement.dataset.pr==='123'));

    await p.locator('#pr-123 .pr-sources [data-source]').first().click();
    await p.locator('[data-evidence-side="before"]').click();
    check('Rename comparison follows the baseline source path',(await p.locator('#source-title').innerText()).includes('backend-typescript'));
    await p.locator('[data-evidence-side="after"]').click();
    check('Rename comparison follows the final source path',(await p.locator('#source-title').innerText()).includes('core/src/workspace'));
    await p.locator('[data-evidence-side="diff"]').click();
    check('Diff renders line additions and removals',await p.locator('#source-code .diff-added').count()>0);
    await p.locator('#close-source').click();

    const requestScenarios=await p.locator('[data-scenario]').evaluateAll(elements=>elements.map(e=>e.dataset.scenario));
    let totalSteps=0;
    for(const scenario of requestScenarios){
      await p.locator(`[data-scenario="${scenario}"]`).click();
      const steps=await p.locator('[data-step]').count();
      for(let i=0;i<steps;i++){
        await p.locator(`[data-step="${i}"]`).click();
        check(`Scenario ${scenario}: step ${i+1} displays its implementing source`,await p.locator('#step-detail [data-source]').count()===1);
        totalSteps++;
      }
      check(`Scenario ${scenario}: last-step bound`,await p.locator('#next-step').isDisabled());
      await p.locator('#reset-trace').click();
      check(`Scenario ${scenario}: reset and first-step bound`,await p.locator('#previous-step').isDisabled());
    }
    await p.locator('[data-scenario="warm"]').click();
    await p.locator('[data-step="2"]').click();
    await p.locator('#request').screenshot({path:`${root}/screenshots/03-command-path.png`});

    for(const state of ['full','selection','failure','release']){
      await p.locator(`[data-state="${state}"]`).click();
      check(`State ${state}: four distinct lifetimes render`,await p.locator('.state-cell').count()===4);
    }
    await p.locator('[data-state="selection"]').click();
    check('Selected-file model separates byte eviction from prepared retention',await p.locator('.state-token.evicted').innerText()==='b.ts · evicted' && (await p.locator('#state-model').innerText()).includes('b.ts · prepared'));
    await p.locator('#state').screenshot({path:`${root}/screenshots/04-cache-lifetimes.png`});

    await p.locator('[data-transfer="reattach"]').click();
    check('Reattachment shows fresh capture and same request',(await p.locator('#transfer-model').innerText()).includes('Same request. New capture.'));
    await p.locator('[data-transfer="fetch"]').click();
    check('Fetch shows record offset after append',(await p.locator('#transfer-model').innerText()).includes('nextOffset becomes 3'));
    await p.locator('#file-search').fill('status.test');
    check('File search narrows the frozen evidence',await p.locator('.file-row').count()===1);
    await p.locator('.file-row [data-source]').click();
    check('Removed-test diff is available',(await p.locator('#source-code').innerText()).includes('keeps one daemon-owned warm-up when its initiating caller is killed'));
    await p.keyboard.press('Escape');
    await p.locator('#file-search').fill('');

    await p.setViewportSize({width:390,height:844});
    await p.evaluate(()=>scrollTo(0,0));
    check('Phone has no page-wide horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
    await p.screenshot({path:`${root}/screenshots/05-phone-opening.png`});
    await p.locator('[data-state="selection"]').click();
    check('Phone state controls remain usable',await p.locator('.state-token.evicted').isVisible());
    await p.locator('#state-model').screenshot({path:`${root}/screenshots/06-phone-state.png`});
    await p.locator('#state-model [data-source]').click();
    check('Phone evidence drawer remains within viewport',await p.locator('#source-dialog').evaluate(d=>d.getBoundingClientRect().right<=innerWidth&&d.getBoundingClientRect().left>=0));
    await p.keyboard.press('Escape');
    await p.setViewportSize({width:320,height:700});
    check('Narrow phone has no page-wide horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth));
    await p.setViewportSize({width:1024,height:800});
    check('Tablet has no page-wide horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth));

    check('No browser script errors',errors.length===0);
    check('No HTTP requests are needed',requests.every(url=>url.startsWith('file:')));
    const report={timestamp:new Date().toISOString(),inventory,requestScenarios:requestScenarios.length,requestSteps:totalSteps,checks,errors,requests};
    return report;
  } finally {
    await context.close();
  }
}
