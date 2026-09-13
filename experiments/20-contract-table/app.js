'use strict';
const DATA=window.CONTRACT_DATA;
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let pr=127;
const subject=()=>DATA.subjects[pr];
const badge={same:'same declaration + body',signature:'signature edited',type:'named type edited',body:'body edited',added:'added',removed:'removed'};
const sourceButton=(e,label='Source ↗')=>`<button class="text-button" data-source="${esc(encodeURIComponent(JSON.stringify(e)))}">${esc(label)}</button>`;
const groupButton=(group,name,small='',changed=false)=>`<button class="unit ${changed?'changed':''}" data-group="${group}"><strong>${esc(name)}</strong>${small?`<small>${esc(small)}</small>`:''}</button>`;
function diagram127(){return `<div class="diptych">
 <div class="panel before"><div class="phase"><b>B</b> Base · lifetime in TypeScript</div><div class="diagram"><div class="boundary"><div class="boundary-label">packages/backend-typescript</div><div class="box-row">${groupButton('backend','Backend','refresh / release')}${groupButton('semantic','Query service','algorithms + 6 Maps')}</div><div class="arrow">service clears Maps → starts project release</div><div class="unit">Project graph</div></div><div class="boundary"><div class="boundary-label">packages/core</div><div class="unit dim">No shared turn-cache lifecycle</div></div></div></div>
 <div class="panel after"><div class="phase"><b>A</b> Head · lifetime in core</div><div class="diagram"><div class="boundary"><div class="boundary-label">packages/backend-typescript</div><div class="box-row">${groupButton('backend','Backend','awaits release',true)}${groupButton('semantic','Query service','same algorithms')}</div><div class="arrow">service awaits release ↓</div><div class="unit">Project graph</div></div><div class="arrow">service creates scope + six typed handles ↓</div><div class="boundary changed"><div class="boundary-label">packages/core · new code owner</div>${groupButton('cache','TurnScopedCacheScope','clear all handles synchronously',true)}</div></div></div></div><p class="caption">Compressed static-ownership view: imports and query internals are omitted. The service still owns its scope instance; the generic lifetime implementation moves into core. Select a box to inspect its contracts.</p>`;}
function diagram131(){return `<div class="diptych">
 <div class="panel before"><div class="phase"><b>B</b> Base · multiple sources of limits</div><div class="diagram"><div class="boundary"><div class="boundary-label">packages/daemon · already present</div><div class="unit">Immutable DaemonPolicy snapshot</div></div><div class="arrow">serialized across process / worker boundaries ↓</div><div class="boundary"><div class="boundary-label">apps/cli · mechanism implementations</div><div class="unit">Local defaults + optional numeric overrides</div><div class="arrow">↓ operational thresholds</div><div class="box-row">${groupButton('output','Output')}${groupButton('lifecycle','Lifecycle')}${groupButton('resource','Resources')}</div></div></div></div>
 <div class="panel after"><div class="phase"><b>A</b> Head · one source, required inputs</div><div class="diagram"><div class="boundary"><div class="boundary-label">packages/daemon · existing code owner</div><div class="unit">Same DaemonPolicy snapshot</div></div><div class="arrow">required slices / explicit leaf values ↓</div><div class="boundary changed"><div class="boundary-label">apps/cli · same physical home</div><div class="box-row">${groupButton('output','Output','record limits',true)}${groupButton('lifecycle','Lifecycle','wait / retry',true)}${groupButton('resource','Resources','RSS / workers',true)}</div><div class="box-row" style="margin-top:8px">${groupButton('transport','Transport','purpose + budgets',true)}${groupButton('diagnostics','Diagnostics','retention',true)}</div></div></div></div></div><p class="caption">Compressed package-and-input view: seven policy sections feed many consumers; some codecs accept individual numbers. No mechanism class moves package in #131. Select a box to inspect its contracts.</p>`;}
function overview(){
 const s=subject();
 const titles={127:'Cache identity stays. The release promise gains a barrier.',131:'One snapshot becomes the explicit consumer input.'};
 const intros={127:'Core takes over clearing six cache spaces. TypeScript keeps the queries. A new turn still starts only after refresh succeeds; releasing now waits for project cleanup and forwards its rejection.',131:'A complete policy snapshot already exists at the base of this PR. The change routes its output, transport, delivery, startup, shutdown, resource and diagnostic values into app-owned mechanisms. Public callers lose local numeric defaults; outcome shapes mostly stay.'};
 const count=s.rows.filter(r=>r.lane==='production').length;
 $('#overview').innerHTML=`<div class="overview-heading"><div><p class="eyebrow">${pr===127?'#127 · 6 changed files':'#131 · 60 changed files'} / the complete picture</p><h2 id="overview-title">${titles[pr]}</h2><p>${intros[pr]}</p></div><div class="count-box"><b>${count}</b>production<br>callables + ports</div></div>${pr===127?diagram127():diagram131()}<div class="scope-strip"><p>${pr===127?'<strong>Caller-visible boundaries:</strong> new generic cache API; a narrower beginTurn input; awaited release. Definition/call-target/caller/callee promise identities, reference projections, rehydrated position nodes, refresh-failure preservation and reusable cleared handles all matter.':'<strong>Caller-visible boundaries:</strong> required policy inputs; unchanged production defaults; purpose-selected timeouts; independent recovery budgets; centralized resource/diagnostic values; earlier parent-side policy validation. Also inspect changed error selection, remaining numeric seams, and test adapter/fixture changes.'}</p></div><div class="groups">${Object.entries(DATA.groups).filter(([,g])=>g.pr===pr).map(([id,g])=>`<button class="group-card" data-group="${id}"><small>${esc(g.sub)}</small><strong>${esc(g.title)}</strong><p>${esc(g.after)}</p><span class="group-foot">${s.rows.filter(r=>r.group===id).length} callables · inspect →</span></button>`).join('')}</div><p class="review-path">Read the decisions below, then any boundary’s callable table. Source evidence is the last layer.</p>`;
}
function decisionList(){
 $('#decisions').innerHTML=DATA.decisions.filter(d=>d.pr===pr).map(d=>`<article class="decision" id="decision-${d.id}"><div class="decision-id">${esc(d.id.toUpperCase())}</div><div><span class="reason-status ${d.status}">${d.status}</span><h3>${esc(d.title)}</h3><p class="reason">${esc(d.reason)}</p><button class="text-button" data-decision="${d.id}">Inspect the evidence ↗</button></div><div class="before-after"><div><b>B</b><span>${esc(d.before)}</span></div><div><b>A</b><span>${esc(d.after)}</span></div></div></article>`).join('');
}
function worked(){
 if(pr===127)$('#worked').innerHTML=`<div class="worked"><p class="eyebrow">Illustrative trace · source-derived, not executed</p><h3>Same request, different lifetime boundary</h3><p>P₁ and P₂ stand in for concrete query promises. This trace uses the semantic service for identity comparisons and the backend for release completion.</p><table class="trace-table"><thead><tr><th>Caller action</th><th>Base</th><th>Head</th></tr></thead><tbody><tr><td>findDefinitions(x), then again</td><td>P₁ → P₁</td><td>P₁ → P₁</td></tr><tr><td>Refresh fails, then query x</td><td>P₁ still cached</td><td>P₁ still cached</td></tr><tr><td>Refresh succeeds, then query x</td><td>New promise P₂</td><td>New promise P₂</td></tr><tr><td>Release starts; graph stays pending</td><td>Caches already empty.<br>Backend release can settle.</td><td>Caches already empty.<br>Backend release remains pending.</td></tr><tr><td>Graph release rejects with E</td><td>This boundary does not forward graph’s rejected Promise.</td><td>Backend release rejects with E.</td></tr></tbody></table><p class="caption">Clearing removes future cache hits. A caller that already holds P₁ keeps that promise; clearing provides no cancellation.</p><button class="text-button" data-call="p127-5">Inspect backend release ↗</button></div>`;
 else $('#worked').innerHTML=`<div class="worked"><p class="eyebrow">Illustrative path · source-derived, not executed</p><h3>A timeout belongs to a caller’s purpose</h3><div class="trace-card-row"><div class="trace-card"><span>daemon status observer</span><strong>100 ms</strong><small>Construct transport with status-observer purpose. Base passed the number 100 directly.</small></div><div class="trace-card"><span>ordinary execution-status exchange</span><strong>250 ms</strong><small>Ordinary transport stays ordinary even though the request contains “status”.</small></div><div class="trace-card"><span>execute admission → acceptance</span><strong>5 s → ∞</strong><small>5 s until acceptance; then timer disabled. ∞ means no completion deadline, not guaranteed completion.</small></div></div><table class="trace-table"><thead><tr><th>Recovery boundary</th><th>Base</th><th>Head</th></tr></thead><tbody><tr><td>Authenticated accepted connection closes</td><td>One outer reattachment</td><td>Counted reattachments; default 1</td></tr><tr><td>Manifest exists; transfer interrupted</td><td>Boolean resume guard in executeOnce</td><td>Resume count in executeOnce; default 1</td></tr><tr><td>Reattached executeOnce begins</td><td>A fresh boolean guard</td><td>A fresh resumeCount = 0</td></tr><tr><td>Fetch attempt fails</td><td>Reject this completion</td><td>Reject this completion; fetch path does not launch another fetch</td></tr><tr><td>Later accepted completion fails</td><td>Original completion error escapes</td><td>Later completion error can escape (P5)</td></tr></tbody></table><p class="caption">Independent budgets describe different recovery scopes. They do not authorize replay as a new local command. Zero/two startup retry values are characterized separately from delivery limits in the changed tests.</p><button class="text-button" data-call="p131-169">Inspect execute and its helpers ↗</button></div>`;
}
function cellPair(before,after,render){
 if(before===after&&before!==null)return `<div class="cell-side"><span class="side">=</span>${render(before)}</div>`;
 return `<div class="cell-side before"><span class="side">B</span>${before===null?'<span class="unavailable">Absent from this side.</span>':render(before)}</div><div class="cell-side after"><span class="side">A</span>${after===null?'<span class="unavailable">Absent from this side.</span>':render(after)}</div>`;
}
function params(c){
 if(!c)return null;
 if(c.overloads?.length)return c.overloads.map(o=>o.signature).join('\nOVERLOAD\n');
 let str=c.parameters.length?c.parameters.join('\nPARAM\n'):'No arguments';
 const generic=c.signature.match(/^(?:export\s+)?(?:static\s+)?(?:async\s+)?[\w*]+(<[^]*?>)\(/)?.[1];
 if(generic)str=`Type parameters ${generic}\nPARAM\n${str}`;
 if(c.inputChanges?.length)str+='\nPARAM\n'+c.inputChanges.join('\nPARAM\n');
 return str;
}
function paramHTML(str){return str.split(/\nPARAM\n|\nOVERLOAD\n/).map(s=>`<code class="param">${esc(s)}</code>`).join('');}
function resultHTML(s){const [type,...words]=s.split('\nRESULT\n');return `<code class="return-type">${esc(type)}</code><p>${esc(words.join('\nRESULT\n'))}</p>`;}
function table(){
 const q=$('#search').value.toLowerCase().trim(),g=$('#group-filter').value,lane=$('#lane-filter').value,change=$('#change-filter').value;
 const all=subject().rows;
 const visible=all.filter(r=>{
  if(g!=='all'&&g!==r.group)return false;
  if(lane!=='all'&&lane!==r.lane)return false;
  if(change==='edited'&&r.status==='same')return false;
  if(!['all','edited'].includes(change)&&change!==r.status)return false;
  return !q||[r.key,r.file,r.contract.note.outcome,r.contract.note.errors,r.contract.note.effects,r.contract.note.delta,r.before?.signature,r.after?.signature,...(r.after?.typeContext||[]).map(t=>t.source)].join(' ').toLowerCase().includes(q);
 });
 let last='';
 $('#rows').innerHTML=visible.map(r=>{
  const c=r.after||r.before;
  let html='';
  if(last!==r.file){html=`<tr class="table-group-row"><td colspan="5">${esc(DATA.groups[r.group].title)} / ${esc(r.file)} ${r.lane==='support'?'· TEST SUPPORT':''}</td></tr>`;last=r.file;}
  const b=r.before,a=r.after,cb=r.contract.before,ca=r.contract.after;
  const beforeOut=b?`${b.returns}\nRESULT\n${cb.outcome}`:null,afterOut=a?`${a.returns}\nRESULT\n${ca.outcome}`:null;
  return html+`<tr class="callable" id="call-${r.id}" data-id="${r.id}"><td><span class="callable-name">${esc(r.key)}</span><div class="callable-meta">${esc(c.kind==='port'?'interface port':c.kind==='callback'?'callback port':c.synthetic?'implicit constructor':c.name==='constructor'?'constructor':c.kind)} · ${r.id}</div><span class="source-badge ${r.status!=='same'?'edited':''}">${badge[r.status]}</span><br><button class="text-button" data-call="${r.id}">Source & named types ↗</button>${r.contract.note.delta?`<p class="delta">${esc(r.contract.note.delta)}</p>`:''}</td><td>${cellPair(params(b),params(a),paramHTML)}${r.status==='type'?'<p class="delta">Named input/output type changes. Open types beside source.</p>':''}</td><td>${cellPair(beforeOut,afterOut,resultHTML)}</td><td>${cellPair(cb?.errors??null,ca?.errors??null,s=>`<p>${esc(s)}</p>`)}</td><td>${cellPair(cb?.effects??null,ca?.effects??null,s=>`<p>${esc(s)}</p>`)}</td></tr>`;
 }).join('');
 $('#result-count').textContent=`${visible.length} of ${all.length} callable contracts · ${all.filter(r=>r.lane==='production').length} production / ${all.filter(r=>r.lane==='support').length} test support`;
 $('#empty').hidden=visible.length!==0;
}
function render(){
 document.querySelectorAll('[data-pr]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.pr)===pr?'true':'false'));
 overview();decisionList();worked();
 $('#group-filter').innerHTML='<option value="all">All boundaries</option>'+Object.entries(DATA.groups).filter(([,g])=>g.pr===pr).map(([id,g])=>`<option value="${id}">${esc(g.title)}</option>`).join('');
 $('#lane-filter').value='production';$('#change-filter').value='all';$('#search').value='';
 $('#policy-section').hidden=pr!==131;
 $('#policy-rows').innerHTML=DATA.policyRows.map(p=>`<tr><td>${esc(p.key)}</td><td>${esc(p.value)}</td><td>${esc(p.use)}</td><td>${esc(p.reason)}</td></tr>`).join('');
 $('#revisions').innerHTML=`#${pr} base ${esc(subject().commits.base)}<br>#${pr} head ${esc(subject().commits.head)}`;
 table();
}
function goGroup(group){
 const target=DATA.groups[group];if(target.pr!==pr){pr=target.pr;render();}
 $('#search').value='';$('#change-filter').value='all';$('#group-filter').value=group;$('#lane-filter').value=group==='support'?'support':'production';table();$('#contracts').scrollIntoView({behavior:'smooth'});
}
function openDialog(title,kicker,html){
 $('#evidence-title').textContent=title;$('#evidence-kicker').textContent=kicker;$('#evidence-content').innerHTML=html;
 if(!$('#evidence').open)$('#evidence').showModal();
 $('#evidence').scrollTop=0;
}
function lines(source,start=1,end=Infinity,focusStart=0,focusEnd=0){
 return `<div class="source-lines" tabindex="0">${source.split('\n').slice(start-1,end).map((line,i)=>{let n=start+i;return `<span class="source-line ${n>=focusStart&&n<=focusEnd?'focus':''}"><em>${n}</em>${esc(line)||' '}</span>`;}).join('')}</div>`;
}
function sourceCard(sourcePr,side,file,line=1,endLine=line+10,contextTypes=[]){
 const s=DATA.subjects[sourcePr],source=s.sources[`${side}:${file}`];
 if(source===undefined||source==='')return `<div class="source-card"><h3>${side==='base'?'BEFORE':'AFTER'}</h3><p class="unavailable">This declaration is absent on this side.</p></div>`;
 const start=Math.max(1,line-5),end=Math.min(source.split('\n').length,endLine+7);
 const fullArgs=encodeURIComponent(JSON.stringify({pr:sourcePr,side,file,line,full:true}));
 return `<div class="source-card"><h3>${side==='base'?'B · BASE':'A · HEAD'} <code>${s.commits[side].slice(0,10)}</code></h3><p class="source-address">${esc(file)}:${line}</p>${lines(source,start,end,line,endLine)}<button class="text-button full-source" data-source="${esc(fullArgs)}">Open complete file, including private helpers ↗</button>${contextTypes.length?`<details open><summary>Named types used by this signature (${contextTypes.length})</summary>${contextTypes.map(t=>`<p class="source-address">${esc(t.name)} · line ${t.line}</p><pre>${esc(t.source)}</pre>`).join('')}</details>`:''}</div>`;
}
function showCall(id){
 const sourcePr=Number(id.match(/^p(\d+)-/)[1]),s=DATA.subjects[sourcePr],r=s.rows.find(r=>r.id===id);
 if(!r)return;
 const side=(c,side)=>c?sourceCard(sourcePr,side,r.file,c.line,c.endLine,c.typeContext):`<div class="source-card"><h3>${side==='base'?'B · BASE':'A · HEAD'}</h3><p class="unavailable">Not declared in this revision.</p></div>`;
 const inherited=(r.after||r.before).synthetic?'<p class="evidence-abstract">This is an implicit default constructor, synthesized for the inventory. The source declares the class and its fields, not a written constructor body.</p>':'';
 openDialog(r.key,`#${sourcePr} · ${r.id} · ${badge[r.status]}`,`${inherited}<div class="evidence-abstract"><strong>${esc(DATA.groups[r.group].title)}</strong><p>${esc(r.contract.note.delta||'Declaration and member implementation stay the same in this PR; inspect the boundary’s decisions for surrounding changes.')}</p><p>Related decisions: ${DATA.groups[r.group].ids.map(id=>`<button class="text-button" data-decision="${id}">${id.toUpperCase()}</button>`).join(' · ')}</p>${r.before?.overloads?`<p>Public overloads are grouped into this row; the highlighted body is their implementation.</p><pre>${esc(r.before.overloads.map(o=>o.signature).join('\n'))}</pre>`:''}</div><div class="source-grid">${side(r.before,'base')}${side(r.after,'head')}</div>`);
}
function showSource(e){
 const s=DATA.subjects[e.pr],source=s.sources[`${e.side}:${e.file}`];
 if(source===undefined)return;
 if(source===''){openDialog(e.file,`#${e.pr} · ${e.side}`,'<p class="unavailable">This file does not exist in this revision.</p>');return;}
 openDialog(e.file,`#${e.pr} · ${e.side} ${s.commits[e.side].slice(0,12)} · line ${e.line||1}`,`<p class="evidence-abstract">Frozen local source from the supplied worktree. Highlighted line locates the cited boundary; surrounding implementation supplies the detail.</p>${e.full?lines(source,1,Infinity,e.line,e.line+5):sourceCard(e.pr,e.side,e.file,e.line||1,(e.line||1)+28)}`);
 if(e.full)requestAnimationFrame(()=>{const focus=$('#evidence-content .source-line.focus');if(focus)focus.scrollIntoView({block:'center'});});
}
function showDecision(id){
 const d=DATA.decisions.find(d=>d.id===id);if(!d)return;
 const s=DATA.subjects[d.pr];
 openDialog(d.title,`${d.id.toUpperCase()} · ${d.status}`,`<div class="evidence-abstract"><p>${esc(d.reason)}</p><div class="before-after"><div><b>B</b><span>${esc(d.before)}</span></div><div><b>A</b><span>${esc(d.after)}</span></div></div></div><div class="evidence-refs">${d.refs.map(e=>sourceButton(e,`${e.side} · ${e.file.split('/').at(-1)}:${e.line}`)).join('')}</div><details><summary>PR body and commit subjects (supplied input)</summary><pre class="pr-body">${esc(s.metadata.body)}</pre><ul>${s.metadata.commits.map(c=>`<li><code>${c.sha.slice(0,10)}</code> ${esc(c.subject)}${c.body?`<pre>${esc(c.body)}</pre>`:''}</li>`).join('')}</ul></details>${d.pr===131?`<p style="margin-top:20px">${sourceButton({pr:131,side:'head',file:'plans/005/daemon-policy.md',line:1,full:true},'Policy record: all recorded values and reasons ↗')}</p>`:''}`);
}
function coverage(){
 const s=subject(),total=s.modules.reduce((n,m)=>n+m.count,0);
 openDialog(`#${pr}: every changed TypeScript module`,'Coverage, not a correctness score',`<div class="evidence-abstract"><p>${s.modules.length} changed modules; ${total} unique callable rows. A zero means this module has no exported callable declaration under the inventory rule. Module bodies, imports and test assertions can still change.</p><p>“Public” means module-exported functions and non-private/non-protected members of exported classes, plus exported interface/type callables. Accessors and implicit constructors are included. Overloads share a row. Re-export fanout and inherited methods are not expanded. The new core index export is represented by the defining cache module.</p><p>Exact member declarations are extracted with the TypeScript parser. Behavioral notes are hand-read interpretations of the source and test assertions; symnav’s tests were not executed for this page.</p></div><div class="coverage-wrap"><table class="file-list"><thead><tr><th>Changed module</th><th>Surface</th><th>Callables</th><th>Source</th></tr></thead><tbody>${s.modules.map(m=>`<tr><td><code>${esc(m.file)}</code></td><td>${m.lane}</td><td>${m.count}</td><td>${sourceButton({pr,side:'base',file:m.file,line:1,full:true},'Base')} · ${sourceButton({pr,side:'head',file:m.file,line:1,full:true},'Head')}</td></tr>`).join('')}</tbody></table></div><p style="margin-top:16px"><button class="text-button" data-patch="${pr}">Open complete supplied patch, including removed exports and changed assertions ↗</button></p>`);
}
document.addEventListener('click',event=>{
 const t=event.target.closest('button');if(!t)return;
 if(t.dataset.pr){pr=Number(t.dataset.pr);render();history.replaceState(null,'',`#pr${pr}`);}
 if(t.dataset.group)goGroup(t.dataset.group);
 if(t.dataset.call)showCall(t.dataset.call);
 if(t.dataset.decision)showDecision(t.dataset.decision);
 if(t.dataset.source)showSource(JSON.parse(decodeURIComponent(t.dataset.source)));
 if(t.dataset.patch)openDialog(`Supplied #${t.dataset.patch} patch`,'Source evidence',`<pre class="patch">${esc(DATA.subjects[t.dataset.patch].patch)}</pre>`);
});
$('#close-evidence').addEventListener('click',()=>$('#evidence').close());
$('#evidence').addEventListener('click',event=>{if(event.target===$('#evidence')){const r=$('#evidence').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$('#evidence').close();}});
['#search','#group-filter','#lane-filter','#change-filter'].forEach(id=>$(id).addEventListener(id==='#search'?'input':'change',table));
$('#reset').addEventListener('click',()=>{ $('#search').value='';$('#group-filter').value='all';$('#lane-filter').value='production';$('#change-filter').value='all';table();});
$('#show-coverage').addEventListener('click',coverage);
$('#policy-source').addEventListener('click',()=>showSource({pr:131,side:'head',file:'plans/005/daemon-policy.md',line:1,full:true}));
function applyHash(){
 const h=location.hash;
 const direct=h.match(/^#call-(p(127|131)-\d+)$/),subjectHash=h.match(/^#pr(127|131)$/);
 if(subjectHash){if(pr!==Number(subjectHash[1])){pr=Number(subjectHash[1]);render();}return;}
 if(direct){pr=Number(direct[2]);render();const row=subject().rows.find(r=>r.id===direct[1]);if(row){$('#lane-filter').value='all';table();requestAnimationFrame(()=>document.getElementById('call-'+row.id)?.scrollIntoView());}return;}
 const decisionHash=h.match(/^#decision-([cp]\d+)$/);if(decisionHash){const d=DATA.decisions.find(d=>d.id===decisionHash[1]);if(d){pr=d.pr;render();requestAnimationFrame(()=>document.getElementById('decision-'+d.id)?.scrollIntoView());}}
}
render();applyHash();window.addEventListener('hashchange',applyHash);
