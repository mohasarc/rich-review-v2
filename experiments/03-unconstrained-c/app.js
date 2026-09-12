const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const choice = (id) => DATA.decisions.find(d => d.id === id);
const number = (id) => String(DATA.decisions.findIndex(d => d.id === id) + 1).padStart(2, '0');

$('#decision-groups').innerHTML = DATA.groups.map(([id, n, title, text]) => `<div class="decision-group"><div class="group-lead"><span class="num">${n}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></div><div class="decision-cards">${DATA.decisions.filter(d => d.group === id).map(d => `<article class="decision-card ${d.status}" id="d-${d.id}"><div class="card-meta"><span>Choice ${number(d.id)}</span><span class="status">${d.status}</span></div><button class="card-title" type="button" data-open="${d.id}"><span class="open-affordance" aria-hidden="true">↗</span>${esc(d.title)}</button><p class="card-gist">${esc(d.gist)}</p><p class="card-why">${esc(d.why)}</p></article>`).join('')}</div></div>`).join('');

let lens = 'source', revision = 'head', runtimePath = 'cli';
const palette = { amber:'#ad571d', amberBg:'#f4e4ce', teal:'#226b68', tealBg:'#e0ede6', border:'#c8ccbf', paper:'#fffef9' };
function node(id, x, y, w, h, title, sub, tone='neutral') {
  const stroke = tone==='teal' ? palette.teal : tone==='amber' ? palette.amber : palette.border;
  const fill = tone==='teal' ? palette.tealBg : tone==='amber' ? palette.amberBg : palette.paper;
  return `<g role="button" tabindex="0" data-open="${id}" aria-label="${esc(choice(id).title)}"><rect class="node" x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" ${tone==='teal'?'stroke-dasharray="5 3"':''}/><text class="box-title" x="${x+16}" y="${y+29}">${esc(title)}</text>${sub?`<text class="sub" x="${x+16}" y="${y+50}">${esc(sub)}</text>`:''}</g>`;
}
function line(x1,y1,x2,y2,tone='neutral',dashed=false) {
  const c = tone==='teal'?palette.teal:tone==='amber'?palette.amber:'#777e70';
  return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${c}" stroke-width="2" ${dashed?'stroke-dasharray="5 4"':''} marker-end="url(#arrow-${tone})"/>`;
}
function renderMap() {
  document.querySelectorAll('[data-lens]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lens===lens)));
  const defs = `<defs>${['neutral','amber','teal'].map(t => `<marker id="arrow-${t}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${t==='teal'?palette.teal:t==='amber'?palette.amber:'#777e70'}"/></marker>`).join('')}</defs>`;
  let svg = '';
  if (lens === 'source') {
    const head = revision === 'head';
    $('#map-switch').innerHTML = `<button type="button" data-revision="base" aria-pressed="${!head}">Base / part 24</button><button type="button" data-revision="head" aria-pressed="${head}">Head / PR 148</button>`;
    $('#map-caption').textContent = head ? 'At this PR’s head: solid amber follows the shipped CLI; dashed teal marks the staged package path.' : 'At the base revision: the daemon package supplies contracts and policy; CLI-local mechanisms compose execution.';
    svg = `<rect x="18" y="45" width="398" height="296" rx="5" fill="#fcf5e9" stroke="${palette.amber}"/><text class="label" x="38" y="75">apps/cli</text><text class="small" x="286" y="75">SHIPPED PATH</text>
      <rect x="465" y="45" width="637" height="296" rx="5" fill="${head?'#f0f6f0':'#f2f3eb'}" stroke="${head?palette.teal:palette.border}"/><text class="label" x="486" y="75">packages/daemon</text><text class="small" x="879" y="75">${head?'STAGED MECHANISM OWNER':'CONTRACT & POLICY OWNER'}</text>
      ${node('stage',38,100,358,69,'CLI entry → dispatcher','argv selection + invocation composition','amber')}
      ${line(218,170,218,199,'amber')}
      ${node('stage',38,199,358,113,head?'38 compatibility source files':'CLI-local daemon mechanisms',head?'Clocks / ownership revised, then frozen':'WorkspaceDaemon + registry / transport / …','amber')}
      <text class="sub" x="54" y="284">${head?'Same CLI consumers; no DaemonClient call':'Process coordination, execution, delivery'}</text>
      ${head?`${node('contract',486,100,267,69,'DaemonClient','execute() + control()','teal')}${node('entries',775,100,306,69,'Executable entries','process-entry / worker-entry','teal')}${line(620,170,620,199,'teal',true)}${line(928,170,928,199,'teal',true)}${node('owners',486,199,595,73,'Private mechanism owners','registry · transport · process · worker · execution','teal')}<text class="sub" x="502" y="260">delivery · lifecycle · resources · diagnostics</text>`:`<text x="784" y="160" text-anchor="middle" class="box-title">No DaemonClient yet</text><text x="784" y="185" text-anchor="middle" class="sub">No package-local process or worker graph</text>`}
      ${node('portable',486,288,595,36,'Root contracts + policy',null)}
      ${line(397,310,484,310,'neutral')}
      <text class="small" x="429" y="293" text-anchor="middle">imports</text>
      <text class="label" x="20" y="372">${head?'The old source is retained. The new package boundary is usable but not adopted by cli.ts.':'The arrow to the package is a contract/policy dependency, not ownership of mechanisms.'}</text>`;
  } else {
    const staged = runtimePath === 'package';
    const tone = staged?'teal':'amber';
    const color = palette[tone];
    $('#map-switch').innerHTML = `<button type="button" data-runtime="cli" aria-pressed="${!staged}">Shipped CLI</button><button type="button" data-runtime="package" aria-pressed="${staged}">Package caller scenario</button>`;
    $('#map-caption').textContent = staged ? 'Illustrative adopting-host scenario: package ownership follows the same client → daemon process → worker topology. The shipped CLI does not take this path in #148.' : 'The shipped path still uses CLI compatibility modules. Packages are source boundaries; the socket and worker message boundary are runtime boundaries.';
    svg = `<rect x="18" y="65" width="324" height="267" rx="5" fill="${staged?'#f0f6f0':'#fcf5e9'}" stroke="${color}"/><text class="label" x="38" y="94">HOST PROCESS</text>
      ${node(staged?'contract':'stage',38,115,284,69,staged?'DaemonClient':'CLI dispatcher',staged?'Package runtime + routing guards':'CLI compatibility composition',tone)}
      ${node('cold',38,237,284,69,'Local executor','Cold / fallback stays in this process',tone)}
      ${line(180,185,180,235,tone,staged)}
      <rect x="436" y="65" width="670" height="267" rx="5" fill="${staged?'#f0f6f0':'#fcf5e9'}" stroke="${color}"/><text class="label" x="456" y="94">DAEMON PROCESS</text>
      ${node('coordinates',456,115,368,69,'Process coordinator','Lifecycle + registry + clock + resources',tone)}
      ${node('owners',456,214,368,92,'Execution & delivery sessions','Queue / ledger / worker generations',tone)}<text class="sub" x="472" y="287">Completion spool + transport server</text>
      ${line(640,185,640,212,tone,staged)}
      <rect x="908" y="153" width="178" height="158" rx="5" fill="${staged?'#edf5ee':'#f8efdf'}" stroke="${color}" stroke-dasharray="2 3"/><text class="label" x="924" y="179">WORKER THREAD</text>
      ${node('contract',920,198,154,92,'Executor','Host module URL',tone)}
      ${line(343,148,434,148,tone,staged)}<text class="small" x="387" y="127" text-anchor="middle">local socket</text><text class="small" x="387" y="178" text-anchor="middle">warm request</text>
      ${line(825,243,918,243,tone,staged)}<text class="small" x="865" y="222" text-anchor="middle">messages</text>
      <text class="label" x="20" y="371">${staged?'Staged path: daemon mechanics are package-owned; the executor is still supplied by a host.':'Shipped path: compatibility modules run across these processes. DaemonClient is not in this route.'}</text>`;
  }
  $('#diagram').innerHTML = `<svg viewBox="0 0 1120 393" role="group" aria-label="${lens==='source'?'Source ownership':'Runtime process'} map">${defs}${svg}</svg>`;
}
renderMap();

const dialog = $('#detail-dialog');
let views = [], returnFocus;
function openView(view, replace=false) {
  if (!dialog.open) { returnFocus=document.activeElement; views=[]; dialog.showModal(); }
  if (replace) views[views.length-1]=view; else views.push(view);
  renderDetail();
  dialog.scrollTop=0;
  $('#detail-close').focus({preventScroll:true});
}
function code(key,start=1,end) {
  const s=DATA.sources[key];
  const lines=s.text.split('\n');
  const stop=Math.min(end??lines.length,lines.length);
  return `<pre class="source-code" aria-label="Source lines ${start} to ${stop}"><code>${lines.slice(start-1,stop).map((text,i)=>`<span class="code-line"><em>${start+i}</em>${esc(text)}</span>`).join('')}</code></pre>`;
}
function visual(d) {
  const kind=d.visual;
  if (!kind) return '';
  let inner='';
  if (kind==='guards') inner=`<div class="mini-flow"><span>Record present</span><b>→</b><span class="stop">Not starting<br>starting = stop</span><b>⤫</b><span>Version</span><b>⤫</b><span>Observe</span></div><p>For a starting, old-version record: cold / starting. The later compatibility check and observation never run.</p>`;
  if (kind==='routes') inner=`<table><thead><tr><th>Observed route</th><th>Execution</th><th>Warm-up trigger</th></tr></thead><tbody><tr><td>Disabled</td><td>Cold local</td><td>—</td></tr><tr><td>Absent</td><td>Cold local</td><td>Independent</td></tr><tr><td>Starting / recovering</td><td>Cold local</td><td>—</td></tr><tr><td>Dead / incompatible</td><td>Fallback local</td><td>Independent</td></tr><tr><td>Ready / busy responsive</td><td>Warm transport</td><td>—</td></tr></tbody></table>`;
  if (kind==='replay') inner=`<div class="mini-flow"><span>No submission<br>retrySafe</span><b>→</b><span>Local fallback</span></div><div class="mini-flow" style="margin-top:12px"><span>Authenticated safe rejection<br>retrySafe</span><b>→</b><span>Local fallback</span></div><div class="mini-flow" style="margin-top:12px"><span>Uncertain submission<br>or accepted failure</span><b>→</b><span class="stop">Controlled warm result<br>No local re-execution</span></div><p>The error’s retrySafe value is the authority, not a guessed point in a timeline.</p>`;
  if (kind==='idle') inner=`<div class="idle-ruler"><span><i>0</i>Construct</span><span><i>8</i>Navigation active<i class="end">18</i></span></div><div class="idle-after"><span>Accept at 8<br>deadline = 8 + 10</span><b>At 18: queue becomes idle<br>deadline reached → onIdle</b></div><p>Illustrative clock units. Readiness/completion do not grant a new interval in this PR.</p>`;
  if (kind==='registry') inner=`<table><thead><tr><th>Expectation</th><th>Identity</th><th>Instance</th><th>Token</th><th>Kind / PID</th><th>Times / revision</th></tr></thead><tbody><tr><td>Instance lookup</td><td>match</td><td>match</td><td>—</td><td>—</td><td>—</td></tr><tr><td>Record credentials</td><td>match</td><td>match</td><td>match</td><td>—</td><td>—</td></tr><tr><td>Daemon process owner</td><td>match</td><td>match</td><td>match</td><td>match</td><td>—</td></tr><tr><td>Full observed owner</td><td>match</td><td>match</td><td>match</td><td>match</td><td>match</td></tr></tbody></table><p>“—” means the expectation omits that constraint. These calls share one matching predicate.</p>`;
  return `<div class="mini-visual"><div class="mini-label">${kind==='idle'?'ILLUSTRATIVE TIMING':'MECHANISM VIEW'}</div><div class="table-scroll">${inner}</div></div>`;
}
function renderDetail() {
  const v=views.at(-1);
  $('#detail-back').textContent=views.length>1?'← Back to previous detail':'← Back to guide';
  if (v.type==='decision') {
    const d=choice(v.id), idx=DATA.decisions.indexOf(d);
    $('#detail-position').textContent=`CHOICE ${number(d.id)} / 24`;
    $('#detail-content').className='';
    $('#detail-content').innerHTML=`<div class="kicker">${esc(DATA.groups.find(g=>g[0]===d.group)[2])}</div><h2 id="dialog-title">${esc(d.title)}</h2><p class="detail-gist">${esc(d.gist)}</p><div class="detail-rationale ${d.status}"><strong>${d.status}</strong>${esc(d.why)}</div><div class="compare"><div><div class="compare-label">Before / base</div><ul>${d.before.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div><div><div class="compare-label">After / head</div><ul>${d.after.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></div>${visual(d)}<p class="detail-text">${esc(d.detail)}</p>${['guards','cold','replay','output','malformed'].includes(d.id)?'<button type="button" class="text-button" data-jump-trace>Explore recorded client calls ↓</button>':''}<div class="detail-evidence"><h3>Check the source</h3><p class="source-meta">Exact local snapshots. Line numbers belong to the indicated revision.</p>${d.refs.map(r=>`<details><summary class="evidence-label">${esc(r.revision.toUpperCase())} · ${esc(r.path)} · L${r.start}–${r.end}</summary>${code(r.key,r.start,r.end)}<button type="button" class="text-button" data-source="${esc(r.key)}" data-line="${r.start}">Open surrounding source ↗</button></details>`).join('')}<button type="button" class="text-button" data-source="bundle:pr" style="margin-top:18px">PR body and commit rationale ↗</button></div>`;
    $('#detail-nav').innerHTML=`<button type="button" ${idx===0?'disabled':''} data-next-choice="${DATA.decisions[idx-1]?.id??''}">← Previous choice</button><button type="button" ${idx===23?'disabled':''} data-next-choice="${DATA.decisions[idx+1]?.id??''}">Next choice →</button>`;
  } else {
    const s=DATA.sources[v.key], lines=s.text.split('\n');
    const start=v.all?1:Math.max(1,(v.line??1)-8), end=v.all?lines.length:Math.min(lines.length,(v.line??1)+130);
    const e=v.entry===undefined?undefined:DATA.inventory.entries[v.entry];
    $('#detail-position').textContent=`SOURCE · ${s.revision.toUpperCase()}`;
    $('#detail-content').className='source-view';
    $('#detail-content').innerHTML=`<div class="kicker">EXACT SNAPSHOT</div><h2 id="dialog-title">${esc(s.path)}</h2><p class="source-meta">${s.revision==='bundle'?'Supplied input bundle':`${s.revision.toUpperCase()} ${DATA.inventory[s.revision]} · SHA-256 ${s.sha256}`}</p>${e?`<div class="source-switch">${['baseKey','headKey'].map(k=>e[k]?`<button type="button" data-file-source="${v.entry}" data-revision-key="${k}" aria-pressed="${e[k]===v.key}">${k==='baseKey'?'Base / origin':'Head'}</button>`:'').join('')}</div>`:''}${code(v.key,start,end)}<div class="source-meta">Showing lines ${start}–${end} of ${lines.length}.</div>${!v.all&&end<lines.length?'<button type="button" class="text-button" data-all-source>Show the whole file</button>':''}`;
    $('#detail-nav').innerHTML=`<button type="button" data-back-detail>← ${views.length>1?'Back to previous detail':'Back to guide'}</button>`;
  }
}
function closeDetail(){dialog.close();}
function backDetail(){if(views.length>1){views.pop();renderDetail();dialog.scrollTop=0;}else closeDetail();}
$('#detail-close').addEventListener('click',closeDetail);
$('#detail-back').addEventListener('click',backDetail);
dialog.addEventListener('close',()=>{views=[];returnFocus?.focus({preventScroll:true});});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail();}});

const traces=DATA.traces.recordings;
let trace=traces.find(t=>t.id==='starting-old'), step=trace.events.length;
$('#scenario').innerHTML=traces.map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('');
$('#scenario').value=trace.id;
function renderTrace(){
  const visible=trace.events.slice(0,step);
  const called=k=>visible.filter(e=>e.kind===k).length;
  const guards=visible.filter(e=>e.kind==='guard').map(e=>e.detail);
  const decision=visible.find(e=>e.kind==='decision');
  const guardNames=['Record present','Not starting','Version compatible','Responsive'];
  const isComplete=step===trace.events.length;
  const facts=Object.entries(trace.scenario).map(([k,v])=>`${k}: ${JSON.stringify(v)}`);
  $('#scenario-input').innerHTML=esc(facts.length?facts.join('\n'):'ready record\nmatching version\nresponsive ready pong').replaceAll('\n','<br>');
  $('#trace-position').textContent=`${step} / ${trace.events.length} recorded events${isComplete?' · returned':''}`;
  $('#step').disabled=isComplete;
  $('#guard-track').innerHTML=guardNames.map((name,i)=>`<div class="guard ${guards.includes(name)?'visited':''} ${decision&&guards.at(-1)===name?'stopped':''}"><span>0${i+1}</span>${name}</div>`).join('');
  $('#effect-track').innerHTML=[['read','Read'],['observe','Observe'],['remove','Remove'],['trigger','Trigger'],['factory','Local factory'],['warm','Warm execute'],['dispose','Dispose']].map(([k,label])=>`<div class="effect ${called(k)?'called':''}">${label} ×${called(k)}</div>`).join('');
  $('#event-list').innerHTML=visible.length?visible.map((e,i)=>`<li class="${i===visible.length-1?'current':''}"><code>${esc(e.kind)}</code>${esc(e.detail)}</li>`).join(''):'<li>No recorded operation has been revealed yet.</li>';
  $('#trace-output').innerHTML=isComplete?`<div class="result-box"><div class="result-mode">${esc(trace.mode)}</div><span class="mono">exit ${trace.exitCode}</span><pre>${trace.output.map(r=>`${esc(r.stream)}\n${esc(r.text)}`).join('\n')}</pre><span class="mono">${decision?esc(decision.detail):'disabled → local cold'}</span></div>`:`<div class="result-box"><span class="mono">Result not reached yet.</span></div>`;
}
$('#scenario').addEventListener('change',e=>{trace=traces.find(t=>t.id===e.target.value);step=trace.events.length;renderTrace();});
$('#replay').addEventListener('click',()=>{step=0;renderTrace();});
$('#step').addEventListener('click',()=>{step=Math.min(trace.events.length,step+1);renderTrace();});
$('#finish').addEventListener('click',()=>{step=trace.events.length;renderTrace();});
$('#trace-table').innerHTML=`<table><thead><tr><th>Input</th><th>Mode</th><th>Exit</th>${['read','observe','remove','trigger','factory','warm','dispose'].map(t=>`<th>${t}</th>`).join('')}</tr></thead><tbody>${traces.map(t=>`<tr><td><button type="button" class="text-button" data-trace="${t.id}">${esc(t.name)}</button></td><td>${t.mode}</td><td>${t.exitCode}</td>${['read','observe','remove','trigger','factory','warm','dispose'].map(k=>`<td>${t.events.filter(e=>e.kind===k).length}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
renderTrace();

function renderFiles(){
  const q=$('#file-filter').value.trim().toLowerCase();
  const entries=DATA.inventory.entries.map((e,i)=>({...e,i})).filter(e=>[e.path,e.origin,...e.decisions].join(' ').toLowerCase().includes(q));
  $('#file-count').textContent=`${entries.length} of 153 paths`;
  $('#file-rows').innerHTML=entries.map(e=>`<tr><td><span class="file-path">${esc(e.path)}</span>${e.origin&&e.origin!==e.path?`<div class="file-origin">Origin: ${esc(e.origin)}<br>Git similarity ${e.similarity}%</div>`:''}</td><td>${esc(e.status)}</td><td>${e.decisions.map(id=>`<button type="button" data-open="${id}" title="${esc(choice(id).title)}">${number(id)} · ${esc(id)}</button>`).join('')}</td><td>${e.baseKey?`<button type="button" data-file-source="${e.i}" data-revision-key="baseKey">Base</button>`:''}${e.headKey?`<button type="button" data-file-source="${e.i}" data-revision-key="headKey">Head</button>`:''}</td></tr>`).join('');
}
$('#file-filter').addEventListener('input',renderFiles);
renderFiles();

document.addEventListener('click',e=>{
  const el=e.target.closest('[data-open],[data-source],[data-next-choice],[data-lens],[data-revision],[data-runtime],[data-file-source],[data-all-source],[data-back-detail],[data-jump-trace],[data-trace]');
  if(!el)return;
  if(el.hasAttribute('data-open'))openView({type:'decision',id:el.dataset.open});
  else if(el.hasAttribute('data-source'))openView({type:'source',key:el.dataset.source,line:Number(el.dataset.line??1)});
  else if(el.hasAttribute('data-next-choice'))openView({type:'decision',id:el.dataset.nextChoice},true);
  else if(el.hasAttribute('data-lens')){lens=el.dataset.lens;renderMap();}
  else if(el.hasAttribute('data-revision')){revision=el.dataset.revision;renderMap();}
  else if(el.hasAttribute('data-runtime')){runtimePath=el.dataset.runtime;renderMap();}
  else if(el.hasAttribute('data-file-source')){const i=Number(el.dataset.fileSource);openView({type:'source',key:DATA.inventory.entries[i][el.dataset.revisionKey],entry:i},views.at(-1)?.type==='source');}
  else if(el.hasAttribute('data-all-source')){views.at(-1).all=true;renderDetail();}
  else if(el.hasAttribute('data-back-detail'))backDetail();
  else if(el.hasAttribute('data-jump-trace')){closeDetail();$('#trace').scrollIntoView();$('#scenario').focus({preventScroll:true});}
  else if(el.hasAttribute('data-trace')){trace=traces.find(t=>t.id===el.dataset.trace);step=trace.events.length;$('#scenario').value=trace.id;renderTrace();$('.trace-layout').scrollIntoView({block:'center'});}
});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('g[role=button]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
