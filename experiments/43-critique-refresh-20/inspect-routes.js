async (page) => {
 const context=await page.context().browser().newContext({viewport:{width:1440,height:1000},offline:true});
 context.setDefaultTimeout(5000);
 const records=[];
 try {
 const p=await context.newPage();
 const visit=async (folder)=>{await p.goto('file:///Users/moyaseen/projects/rich-review-v2/experiments/'+folder+'/index.html');};
 await visit('13-owner-persona');
 await p.locator('#d-fixtures > summary').click();
 records.push({experiment:'13',route:'Fixture translations → expanded mechanism',text:await p.locator('#d-fixtures').innerText()});
 await p.locator('#d-fixtures > summary').click();
 records.push({experiment:'13',route:'Close same row',closed:await p.locator('#d-fixtures').evaluate(e=>!e.open)});
 await visit('23-zoom-canvas');
 await p.locator('button[data-decision="D03"]').click();
 await p.waitForTimeout(450);
 records.push({experiment:'23',route:'Whole change → policy-testing decision',text:await p.locator('body').innerText(),url:p.url()});
 await p.screenshot({path:'/Users/moyaseen/projects/rich-review-v2/experiments/43-critique-refresh-20/receipts/23-policy-testing.png'});
 await p.keyboard.press('Escape');await p.waitForTimeout(450);
 records.push({experiment:'23',route:'Escape one level',text:(await p.locator('body').innerText()).slice(0,4000),url:p.url()});
 await visit('29-refusal');
 const d29=p.locator('details').filter({hasText:'temporary policy-testing export'}).first();
 await d29.locator('summary').click();
 records.push({experiment:'29',route:'Policy-testing retirement detail',text:await d29.innerText()});
 await visit('35-future-self');
 const d35=p.locator('#detail-d03');
 await p.locator('#detail-d03 > summary').click();
 records.push({experiment:'35',route:'Policy-testing retirement detail',text:await p.locator('#d03').innerText()});
 }catch(error){records.push({harnessError:String(error)});}finally{await context.close();}
 return records;
}
