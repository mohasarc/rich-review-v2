import * as Plot from '@observablehq/plot';
import sources from '../evidence/sources.json';
import observations from '../evidence/observations.json';
import {cacheConditions,deliveryConditions} from './content.mjs';

const teal='#287a79',rust='#bc5936',ink='#243b3c',paper='#f6f3e9',rule='#c9cec0';
let stain='all';
const $=id=>document.getElementById(id);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const opacity=d=>stain==='all'||d.cls===stain?1:.16;
const width=id=>Math.max(260,Math.floor($(id).getBoundingClientRect().width));
const color=d=>d.cls==='fresh'?rust:teal;

function anatomy(kind) {
  const cache=kind==='cache',id=cache?'cache-plate':'delivery-plate';
  const w=width(id),compact=w<480;
  const sections=cache?['01 / TURN 0','02 / TURN 1','03 / OLD SETTLES']:['01 / ATTEMPT 1','02 / ATTEMPT 2','03 / FETCH'];
  const bounds=[],cells=[],dots=[],labels=[],rules=[];
  for(let s=0;s<3;s++) {
    const section=sections[s];
    const add=(arr,item)=>arr.push({section,...item});
    if(compact)add(labels,{x:50,y:3,text:section,size:11,cls:'retained'});
    if(cache) {
      add(bounds,{x1:1,x2:99,y1:12,y2:79,cls:'retained',stroke:ink,dash:null});
      add(bounds,{x1:5,x2:95,y1:26,y2:74,cls:'retained',stroke:teal,dash:'3,3'});
      add(labels,{x:50,y:18,text:'TypeScript service',size:12,cls:'retained'});
      add(labels,{x:50,y:31,text:'core scope · 6 handles',size:11,cls:'retained'});
      ['D','R','T','C','E','P'].forEach((name,i)=>{
        const x=13+i*14.8;
        add(cells,{x1:x-5.5,x2:x+5.5,y1:40,y2:66,cls:'retained'});
        add(labels,{x,y:46,text:name,size:12,cls:'retained'});
      });
      add(dots,{x:13,y:59,symbol:'circle',r:compact?4:7,cls:s===0?'retained':'fresh',label:s===0?'p₀':'p₁'});
      add(labels,{x:50,y:70,text:s===0?'one cached promise':'new entry; same handles',size:11,cls:s===0?'retained':'fresh'});
      add(dots,{x:19,y:89,symbol:'circle',r:compact?4:7,cls:'outside',label:'p₀'});
      add(labels,{x:57,y:89,text:s===2?'p₀ resolved':'caller holds p₀',size:12,cls:'outside'});
      if(s===2)add(labels,{x:50,y:98,text:'p₁ is still current',size:11,cls:'fresh'});
    } else {
      add(bounds,{x1:1,x2:99,y1:12,y2:94,cls:'retained',stroke:ink,dash:null});
      add(labels,{x:50,y:18,text:'CLI completion loop',size:12,cls:'retained'});
      add(dots,{x:17,y:31,symbol:'diamond',r:compact?5:8,cls:'retained',label:s===0?'R = 0':'R = 1'});
      add(labels,{x:63,y:31,text:s===0?'R = 0 / 1':'R = 1 / 1',size:13,cls:'retained'});
      add(bounds,{x1:8,x2:92,y1:42,y2:78,cls:s===0?'retained':'fresh',stroke:s===0?teal:rust,dash:'3,3'});
      add(labels,{x:50,y:48,text:s===0?'executeOnce ₁':'executeOnce ₂',size:12,cls:s===0?'retained':'fresh'});
      add(dots,{x:25,y:61,symbol:'square',r:compact?5:8,cls:s===0?'retained':'fresh',label:'receiver + output'});
      add(dots,{x:65,y:61,symbol:'diamond',r:compact?5:8,cls:s===0?'retained':'fresh',label:s===2?'F = 1':'F = 0'});
      add(labels,{x:27,y:72,text:s===0?'output ₁':'output ₂',size:12,cls:s===0?'retained':'fresh'});
      add(labels,{x:69,y:72,text:s===2?'F = 1 / 1':'F = 0 / 1',size:12,cls:s===0?'retained':'fresh'});
      add(labels,{x:50,y:86,text:'same request identity',size:12,cls:'retained'});
      if(s===2)add(labels,{x:50,y:99,text:'fetch resumes result',size:11,cls:'fresh'});
    }
  }
  const facet=compact?{fy:'section'}:{fx:'section'};
  const plot=Plot.plot({width:w,height:compact?700:300,marginTop:compact?0:30,marginBottom:9,marginLeft:0,marginRight:0,x:{domain:[0,100],axis:null},y:{domain:[0,102],reverse:true,axis:null},...(compact?{fy:{domain:sections,axis:null,padding:.08}}:{fx:{domain:sections,axis:'top',label:null,tickSize:0,padding:.12}}),style:{fontSize:'11px',fontFamily:'Arial, sans-serif'},marks:[
    Plot.rect(bounds.filter(d=>!d.dash),{...facet,x1:'x1',x2:'x2',y1:'y1',y2:'y2',rx:18,fill:'none',stroke:'stroke',strokeWidth:1.15,strokeOpacity:opacity}),
    Plot.rect(bounds.filter(d=>d.dash),{...facet,x1:'x1',x2:'x2',y1:'y1',y2:'y2',rx:7,fill:'none',stroke:'stroke',strokeWidth:1.15,strokeDasharray:'4,3',strokeOpacity:opacity}),
    Plot.rect(cells,{...facet,x1:'x1',x2:'x2',y1:'y1',y2:'y2',fill:paper,stroke:teal,strokeOpacity:opacity,fillOpacity:opacity}),
    Plot.dot(dots,{...facet,x:'x',y:'y',symbol:'symbol',r:7,fill:color,fillOpacity:opacity,stroke:paper,strokeWidth:1,title:d=>d.label}),
    Plot.text(labels,{...facet,x:'x',y:'y',text:'text',fontSize:'size',fill:d=>d.cls==='fresh'?rust:ink,fillOpacity:opacity})
  ]});
  plot.setAttribute('role','img');plot.setAttribute('aria-label',cache?'Cache sections: same service and six handles; current promise changes from p0 to p1; caller p0 later resolves without replacing p1.':'Delivery sections: outer reattachment counter goes from zero to one and stays one; attempt two has its own fetch count starting at zero.');
  $(id).replaceChildren(plot);
}

function renderCache() {
  const condition=$('cache-condition').value;
  const meta=cacheConditions.find(c=>c[0]===condition);
  $('cache-protocol').textContent=meta[3];$('cache-outcome').textContent=meta[2];
  const runs=observations.cache.filter(r=>r.condition===condition);
  const data=runs.flatMap(r=>r.steps.map((step,i)=>({...step,build:r.build==='base'?'BASE':'HEAD',i})));
  const stepLabels=runs[0].steps.map(s=>s.label);
  const w=width('cache-observation'),small=w<470;
  const plot=Plot.plot({width:w,height:small?290:220,marginLeft:33,marginRight:small?36:55,marginBottom:small?62:43,marginTop:12,fy:{domain:['BASE','HEAD'],label:null,tickSize:0},x:{domain:stepLabels,label:null,tickSize:0,tickFormat:small?(d)=>d.replace('Cleanup settled','Settled').replace('Query during cleanup','Query').replace('Old promise settled','Old settled').replace('Refresh rejected','Rejected').replace('Cleanup held','Held'):undefined},y:{domain:[0,2.5],ticks:[0,1,2],grid:true,label:null},style:{fontSize:small?'9px':'10px'},marks:[
    Plot.line(data,{fy:'build',x:'label',y:'searches',stroke:rule,strokeWidth:1.5}),
    Plot.dot(data,{fy:'build',x:'label',y:'searches',r:6,fill:d=>d.entryState==='empty'?paper:d.sameEntry?teal:rust,stroke:d=>d.entryState==='empty'?ink:paper,strokeWidth:1.5,title:d=>`${d.build} · ${d.label}\nSearches: ${d.searches}\nCurrent entry: ${d.entryState==='empty'?'empty':d.sameEntry?'original':'new'}\nSame handle: ${d.sameHandle}\nRelease: ${d.release}`}),
    Plot.text(data,{fy:'build',x:'label',y:'searches',text:d=>String(d.searches),dy:-14,fontSize:11,fill:ink})
  ]});
  plot.setAttribute('role','img');plot.setAttribute('aria-label',`Search counts at checkpoints for ${meta[1]}. ${meta[2]}`);$('cache-observation').replaceChildren(plot);
  const releasing=condition.startsWith('release'),oldPromise=condition==='old-promise';
  $('cache-results').innerHTML=`<table class="result-table"><caption class="eyebrow">Final observations / same fixture</caption><thead><tr><th>Build</th><th>Searches</th><th>Handle</th><th>Current entry</th>${releasing?'<th>Release: held → settled</th>':oldPromise?'<th>Caller p₀</th>':''}</tr></thead><tbody>${runs.map(r=>{const last=r.steps.at(-1);return `<tr><td>${r.build.toUpperCase()}</td><td>${last.searches}</td><td>${last.sameHandle?'same':'replaced'}</td><td>${last.sameEntry?'same':'new'}</td>${releasing?`<td>${r.steps.find(s=>s.label==='Cleanup held').release} → ${last.release}</td>`:oldPromise?`<td>${last.oldCaller}</td>`:''}</tr>`}).join('')}</tbody></table>`;
}

function renderDelivery() {
  const condition=$('delivery-condition').value;
  const meta=deliveryConditions.find(c=>c[0]===condition);
  $('delivery-protocol').textContent=meta[3];$('delivery-outcome').textContent=meta[2];
  const runs=observations.delivery.filter(r=>r.condition===condition);
  const data=runs.flatMap(r=>[{build:r.build.toUpperCase(),kind:'execute',count:r.executeCount},{build:r.build.toUpperCase(),kind:'fetch',count:r.fetchCount}]);
  const w=width('delivery-observation');
  const plot=Plot.plot({width:w,height:210,marginLeft:48,marginRight:42,marginTop:18,marginBottom:35,fx:{domain:runs.map(r=>r.build.toUpperCase()),axis:'top',label:null,tickSize:0},x:{domain:[0,3.4],ticks:[0,1,2,3],grid:true,label:null},y:{domain:['execute','fetch'],label:null,tickSize:0},marks:[
    Plot.ruleY(data,{fx:'build',y:'kind',x1:0,x2:'count',stroke:teal,strokeOpacity:.3,strokeWidth:3}),
    Plot.dot(data,{fx:'build',x:'count',y:'kind',symbol:d=>d.kind==='execute'?'square':'diamond',r:7,fill:d=>d.build==='HEAD'?rust:teal}),
    Plot.text(data,{fx:'build',x:'count',y:'kind',text:d=>String(d.count),dx:17,fontSize:12})
  ]});plot.setAttribute('role','img');plot.setAttribute('aria-label',`${meta[1]}. ${meta[2]}`);$('delivery-observation').replaceChildren(plot);
  $('delivery-results').innerHTML=`<table class="result-table"><caption class="eyebrow">Recorded wire sequence / E = execute, F = fetch</caption><thead><tr><th>Build</th><th>Limits R / F</th><th>Sequence</th><th>Caller result</th></tr></thead><tbody>${runs.map(r=>`<tr><td>${r.build.toUpperCase()}</td><td>${r.limits.reattach} / ${r.limits.fetch}</td><td>${r.events.map(e=>e.kind==='execute'?'E':e.kind==='result-fetch'?'F':'ACK').join(' → ')}</td><td>${r.outcome}${r.error?` · <span class="fresh-result">${esc(r.error.code)}</span>`:''}</td></tr>`).join('')}</tbody></table>`;
}

for(const button of document.querySelectorAll('[data-stain]'))button.addEventListener('click',()=>{
  stain=button.dataset.stain;
  document.querySelectorAll('[data-stain]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  $('stain-caption').textContent={all:'Compare the same structures across each section.',retained:'Same handles; the outer reattachment budget remains in force.',fresh:'New entries or a new per-attempt receiver, output and counter.',outside:'The caller’s old promise survives the cache clear.'}[stain];
  anatomy('cache');anatomy('delivery');
});
function selectLab(name,focus=false){
  for(const tab of document.querySelectorAll('[data-lab]')){const selected=tab.dataset.lab===name;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;if(selected&&focus)tab.focus()}
  $('cache-lab').hidden=name!=='cache';$('delivery-lab').hidden=name!=='delivery';
  if(name==='cache')renderCache();else renderDelivery();
}
document.querySelectorAll('[data-lab]').forEach(tab=>{
  tab.addEventListener('click',()=>selectLab(tab.dataset.lab));
  tab.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();selectLab(event.key==='Home'?'cache':event.key==='End'?'delivery':tab.dataset.lab==='cache'?'delivery':'cache',true)}});
});
$('cache-condition').addEventListener('change',renderCache);$('delivery-condition').addEventListener('change',renderDelivery);
document.querySelectorAll('[data-receipt]').forEach(link=>link.addEventListener('click',event=>{
  const r=sources.receipts.find(s=>s.id===link.dataset.receipt);if(!r)return;event.preventDefault();
  $('source-content').innerHTML=`<article class="receipt"><p class="eyebrow">${esc(r.subject)} · ${r.revision.slice(0,12)}</p><h2>${esc(r.path)}</h2><p class="source-loc">Lines ${r.start}–${r.end} · <a href="evidence.html#${r.id}">Open in the source book ↗</a></p><pre>${r.text.split('\n').map((line,i)=>`<span class="code-line"><span class="line-number">${r.start+i}</span>${esc(line)||' '}</span>`).join('')}</pre></article>`;
  $('source-dialog').showModal();$('source-dialog').scrollTop=0;
}));
let queued=false;
const resize=new ResizeObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;anatomy('cache');anatomy('delivery');if(!$('cache-lab').hidden)renderCache();if(!$('delivery-lab').hidden)renderDelivery()})});
resize.observe($('cache-plate'));resize.observe($('delivery-plate'));
anatomy('cache');anatomy('delivery');renderCache();
document.documentElement.dataset.ready='true';
