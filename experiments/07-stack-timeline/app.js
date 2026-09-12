(() => {
  'use strict';
  const D = window.STACK_DATA;
  const C = window.TIMELINE_CONTENT;
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rich = (value) => esc(value).replace(/`([^`]+)`/g, '<code>$1</code>');
  const label = n => n === 0 ? 'main' : `#${D.frames[n - 1].number}`;
  const frame = n => D.frames[n - 1];
  let selected = 0;
  let lens = 'ownership';
  let timer = null;
  let comparing = false;
  let detailReturnFocus = null;

  const nodes = {};
  const nodeDefs = [
    ['host','host'], ['source','source'], ['revision','revision'], ['project','project'], ['turn','turn'],
    ['session','session'], ['path','path'], ['policy','policy'], ['format','renderer'],
    ['app-transport','transport'], ['app-process','process'], ['pkg-transport','transport'],
    ['pkg-process','process'], ['client','client']
  ];
  for (const [id, thread] of nodeDefs) {
    const el = document.createElement('button');
    el.className = 'map-node';
    el.dataset.thread = thread;
    el.id = `node-${id}`;
    $('map-nodes').append(el);
    nodes[id] = el;
  }

  function place(id, pos, title, subtitle, changed=false, visible=true, extra='') {
    const el = nodes[id];
    const [x,y,w,h] = pos;
    Object.assign(el.style, {left:`${x/1160*100}%`,top:`${y/690*100}%`,width:`${w/1160*100}%`,height:`${h/690*100}%`,opacity:visible?'1':'0',pointerEvents:visible?'auto':'none'});
    el.className = `map-node ${changed?'changed':''} ${extra}`;
    el.tabIndex = visible ? 0 : -1;
    el.setAttribute('aria-hidden', String(!visible));
    el.setAttribute('aria-label', `${title}. ${subtitle}. Follow this responsibility's decisions`);
    el.innerHTML = `<strong>${esc(title)}</strong><small>${esc(subtitle)}</small>`;
  }

  const transportRows = [
    [14,'Wire codec + validator','framing + validation'],
    [15,'Receiver + capture','result receipt + storage'],
    [16,'Socket client','outbound socket mechanics'],
    [17,'Lifecycle client','bounded exchanges'],
    [18,'Socket server','inbound socket mechanics'],
    [19,'Execution client','accepted execution recovery']
  ];
  const processRows = [
    [21,'Activity projector','activity projection'],
    [22,'Generation manager','worker generation lifecycle'],
    [23,'Delivery session','completion delivery'],
    [24,'Accepted execution','FIFO accepted turns']
  ];

  function group(id, type, n, isPackage) {
    const transport = type === 'transport';
    const positions = isPackage ? (transport?[494,135,306,240]:[812,135,316,240]) : (transport?[32,135,201,240]:[245,135,201,240]);
    const hiddenPosition = transport?[32,135,201,240]:[245,135,201,240];
    const visible = isPackage ? n>=25 : n<26;
    const changedAt = transport ? [14,15,16,17,18,19,20,25,26] : [21,22,23,24,25,26];
    let title = transport ? (n>=26?'Transport composition':'LocalDaemonTransport') : (n>=25?'ProcessCoordinator':'WorkspaceDaemon');
    if (!isPackage && n===25) title = transport?'CLI transport copy':'CLI process copy';
    place(id, isPackage && n<25 ? hiddenPosition:positions, title, '', changedAt.includes(n)&&visible, visible, `group ${!isPackage&&n===25?'compatibility':''}`);
    const rows = transport ? transportRows : processRows;
    const el = nodes[id];
    el.innerHTML = `<strong>${title}</strong>${rows.map(([at,after,before])=>`<span class="module-row ${n<at?'embedded':''} ${n===at?'recent':''}">${esc(n>=at?after:before)}<small>${n>=at?'owner':'inside'}</small></span>`).join('')}
      ${transport ? `<span class="support">${n>=26?'Factory composes operation-shaped ports.':n>=20?'Facade only composes and delegates.':'Unsplit rows still belong to the facade.'}</span>` : '<span class="support">Existing owners: ledger & FIFO queue, spool bytes, registry & launch, resources, lifetime & clock.</span>'}
      ${!isPackage&&n===25?'<span class="copy-label">STILL USED BY THE CLI</span>':''}`;
    el.setAttribute('aria-label', `${title}. ${rows.filter(r=>n>=r[0]).length} responsibilities extracted. ${!isPackage&&n===25?'Active compatibility copy. ':''}Follow ${type} decisions`);
  }

  function renderMap(n) {
    $('daemon-package').classList.toggle('exists',n>=7);
    $('cli-boundary-note').textContent = n===25 ? 'Production path still uses app-local compatibility copies' : n===26 ? 'Package root only; no daemon storage or internal imports' : 'Daemon mechanisms remain here until the final cutover';
    $('daemon-boundary-note').textContent = n>=25 ? 'Owns mechanisms; host execution arrives by module URL' : n>=7?'Portable contracts + policy; mechanism move still ahead':'';
    $('empty-daemon').innerHTML = n<7 ? '<strong>No daemon package yet.</strong><small>The daemon already runs; its implementation lives inside the CLI.</small>' : n<25 ? '<strong>Boundary first. Mechanisms later.</strong><small>The CLI consumes these contracts and policy while transport and process responsibilities split in place.</small>' : '';
    $('empty-cli').style.opacity = n===26?'1':'0';
    place('host',n>=6?[32,77,266,46]:[32,77,414,46],n===26?'CLI invocation coordinator':'CLI composition + dispatcher',n>=12?'argv · workspace · injected executor':'argv · workspace · concrete dependencies', [5,6,9,12,26].includes(n));
    place('source',n>=1?[32,528,156,35]:[408,516,156,38],'Source bytes',n>=1?'core WorkspaceSourceCache':'TypeScript cache',n===1);
    place('revision',n>=2?[204,528,156,35]:[580,516,156,38],'Revision index',n>=2?'core transactional base':'TypeScript workspace state',n===2);
    place('project',n>=3?[32,570,156,35]:[408,563,156,38],'Project membership',n>=3?'core graph + input collector':'TypeScript project graph',n===3);
    place('turn',n>=4?[204,570,156,35]:[580,563,156,38],'Turn-cache lifetime',n>=4?'core scope · six handles':'TypeScript-owned maps',n===4);
    place('session',n>=5?[32,612,328,36]:[32,390,130,36],n>=5?'WorkspaceSession':'Workspace scope',n>=5?'request / retained discovery; fresh router per turn':'CLI-owned preparation',n===5);
    place('path',n>=6?[310,77,136,46]:[980,516,148,51],'State directory',n>=6?'CLI resolves once':'telemetry resolves',n===6);
    const contracts = n>=12?'policy · commands · failures · admission · executor':n>=11?'policy · commands · failures · admission':n>=10?'policy · commands · failures':n>=9?'policy · command identity':n>=7?'portable host contracts · complete versioned snapshot':'defaults · contracts';
    place('policy',n>=7?[494,77,634,46]:[174,390,130,36],n>=7?'Contracts + DaemonPolicy':'Thresholds',contracts,[7,8,9,10,11,12].includes(n));
    place('format',n>=13?[784,516,148,51]:[316,390,130,36],'Lifecycle bytes',n>=13?'renderer owns formatting':'CLI-owned formatting',n===13);
    group('app-transport','transport',n,false);
    group('app-process','process',n,false);
    group('pkg-transport','transport',n,true);
    group('pkg-process','process',n,true);
    place('client',n>=25?[494,390,634,36]:[32,77,414,46],'DaemonClient',n===25?'staged public facade · CLI consumer switch is next':'public execute / control · lazy private runtime',n>=25,n>=25);
    const edge = $('host-edge'), text = $('host-edge-label');
    if(n===26){edge.setAttribute('d','M 165 124 L 165 128 L 466 128 L 466 408 L 491 408');text.setAttribute('x','475');text.setAttribute('y','456');text.textContent='CLI now calls package execute / control';}
    else {edge.setAttribute('d',n>=6?'M 150 124 L 150 132':'M 135 124 L 135 132');text.setAttribute('x','494');text.setAttribute('y','456');text.textContent=n===25?'Active CLI path stays on the left for this PR':'CLI → app-local daemon execution';}
    $('dependencies').innerHTML = `<strong>IMPORT DIRECTION</strong><span>CLI → core · TypeScript · renderer · telemetry${n>=7?' · <b class="'+(n===7?'new':'')+'">daemon</b>':''}</span><span>TypeScript → core</span><span>renderer → core${n>=13?' · <b class="'+(n===13?'new':'')+'">daemon reports</b>':n>=7?' · daemon permitted':''}</span><span>core${n>=7?' / daemon':''} / telemetry → no internal package</span>`;
  }

  function renderRuntime(n) {
    const c = (...steps) => steps.includes(n)?'changed':'';
    $('runtime-panel').innerHTML = `<div class="runtime"><div class="runtime-title">ONE WARM NAVIGATION · THREE RUNTIME LOCATIONS</div><div class="owner-indicator">${n<25?'Process and transport mechanisms are CLI-owned.':n===25?'Package entries are staged; this shipped CLI still launches its compatibility graph.':'The shipped CLI launches package-owned daemon / worker entries.'}</div><button data-thread="policy" class="runtime-policy ${c(7,8)}">${n<7?'Configuration: mechanisms own local defaults and partial process / worker inputs.':n===7?'CLI builds complete DaemonPolicy → daemon process → worker thread. Consumers still have local defaults.':'One DaemonPolicy → process + worker snapshots → required slices at each consumer.'}</button><div class="runtime-lanes">
      <div class="runtime-box"><h3>CLI process</h3><small>Host + client-side code</small><div class="runtime-step ${c(6,9,26)}">Parse argv; resolve workspace & environment<small>${n>=9?'Pass explicit commandName beside argv':'Operational command name still derived downstream'}</small></div><div class="runtime-step ${c(25,26)}">${n===26?'DaemonClient':'CLI daemon dispatcher'}<small>Choose warm / cold / fallback</small></div><div class="runtime-step ${c(14,15,16,17,19,20,26)}">${n>=19?'Execution client → receiver + capture':n>=15?'Transport → receiver + capture':'Transport owns receipt & output'}<small>${n>=15?'Durable offsets survive a fetch reconnect':'Results return as ordered stdout / stderr records'}</small></div></div>
      <div class="runtime-arrow"><span>local socket</span><b>⇄</b><span>${n>=9?'protocol 5':'protocol 4'}</span></div>
      <div class="runtime-box"><h3>Daemon process</h3><small>One workspace’s process coordination</small><div class="runtime-step ${c(11,18)}">${n>=18?'Socket server → admission':'Transport → admission'}<small>${n>=11?'Ordered guards; rejection code owns retry safety':'Inline admission and retry meaning'}</small></div><div class="runtime-step ${c(23,24)}">${n>=24?'Accepted execution session → FIFO': 'Process shell → FIFO turns'}<small>${n>=23?'Delivery session coordinates ledger + spool':'Process shell coordinates ledger + spool'}</small></div><div class="runtime-step ${c(21,22)}">${n>=22?'Worker generation manager':'Process-owned worker generations'}<small>${n>=21?'Explicit snapshots → activity projector':'Activity is projected inline'}; resources & lifetime remain separate data owners</small></div></div>
      <div class="runtime-arrow"><span>worker IPC</span><b>⇄</b><span>bytes + reports</span></div>
      <div class="runtime-box"><h3>Worker thread</h3><small>Inside the daemon process</small><div class="runtime-step ${c(12)}">${n>=12?'Load + validate host module URL':'Construct CLI execution objects'}<small>${n>=12?'Daemon-defined executor; CLI implementation':'Worker directly knows CLI/core construction'}</small></div><div class="runtime-step ${c(5)}">${n>=5?'Retained core WorkspaceSession':'CLI-owned retained workspace preparation'}<small>Reuse retained backend state across turns</small></div><div class="runtime-step ${c(1,2,3,4)}">TypeScript language work<small>${n>=4?'Core owns source, revision, membership, and cache lifetimes':'Reusable state is moving into core over #123–127'}</small></div></div>
      </div><button data-thread="renderer" class="runtime-policy ${c(13,26)}">Lifecycle control path: daemon start / status / stop reports → ${n>=13?'@symnav/renderer formats':'CLI formats'} → CLI writes to the terminal.</button><p class="runtime-footer">Illustrative warm path: startup election and failure branches are omitted. Runtime boxes stay in place while ownership changes. Daemon package code can run in the CLI process, daemon process, and worker thread. Cold/fallback execution uses the host executor locally; accepted recovery does not replay work locally.</p></div>`;
    const threads=['host','client','transport','policy','process','process','session','session','turn'];
    $('runtime-panel').querySelectorAll('.runtime-step').forEach((el,i)=>{el.dataset.thread=threads[i];el.setAttribute('role','button');el.tabIndex=0;});
  }

  function decisionCard(d, index, n) {
    return `<article class="decision ${d.status}"><div class="card-top"><span class="status ${d.status}">${d.status}</span><span>${esc(d.kind)}</span><span style="margin-left:auto">${String(index+1).padStart(2,'0')}</span></div><h3>${rich(d.choice)}</h3><p><span class="why">${d.status==='stated'?'RECORDED REASON':'NO SPECIFIC REASON FOUND'}</span>${rich(d.reason)}</p><button class="source-button" data-evidence="${n}" data-decision="${index}">Open source & context ↗</button></article>`;
  }

  function flow(n) { return C.stops[n].flow.map((s,i)=>`${i?'<span class="flow-arrow" aria-hidden="true">→</span>':''}<div class="flow-box">${esc(s)}</div>`).join(''); }

  function policyTables() {
    return `<div class="special"><h3>The values are decisions too.</h3><p>Stated reasons from the policy record. These are the recorded defaults and recipes, not tuning controls. The final record also makes serialization and override factories private.</p><div class="table-scroll"><table class="policy-table"><caption>44 values and derivations · stated</caption><thead><tr><th>Policy path / recipe</th><th>Default / derivation</th><th>Applies to</th><th>Recorded reason</th></tr></thead><tbody>${D.policy.map(r=>`<tr>${r.slice(0,4).map(c=>`<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table><table class="policy-table"><caption>Five intentional absences · stated</caption><thead><tr><th>Deadline</th><th>Value</th><th>Recorded reason</th></tr></thead><tbody>${D.absences.map(r=>`<tr>${r.map(c=>`<td>${rich(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p><a href="evidence/daemon-policy.md" target="_blank">Original policy record ↗</a></p></div>`;
  }

  function testTable() {
    return `<div class="special"><h3>Ten removed CLI scenarios are part of this move.</h3><p>Seven status and three stop test bodies disappear in #149. The table separates a related mechanism test from the original end-to-end chain. This is a source comparison, not a coverage or correctness verdict. The PR states a general ownership reason; it does not explain each lost CLI oracle.</p><div class="table-scroll"><table class="policy-table"><thead><tr><th>Removed CLI scenario</th><th>Related test found at the tip</th><th>What this inspection establishes</th></tr></thead><tbody>${D.testCorrespondence.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}${r[3]?`<br><a href="https://github.com/mohasarc/symnav/blob/${D.head}/${r[3]}" target="_blank" rel="noreferrer">Pinned source ↗</a>`:''}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div><p><button data-evidence="26" data-tests="true">Inspect local test patches and titles ↗</button></p></div>`;
  }

  function renderDecisions(n) {
    $('mechanism-flow').innerHTML = flow(n);
    $('decisions-title').textContent = n ? `${label(n)} · decisions before details` : 'Before the first move';
    $('decision-count').textContent = n ? `${frame(n).decisions.length} choices in this frame` : 'One existing daemon';
    if(n===0){
      $('decisions').innerHTML = '<div class="at-main"><p>The daemon is already warm-capable. The stack changes who owns its mechanisms, reusable state, contracts, and output. Follow the 26 stops to see each choice and its recorded reason, including accompanying test and documentation changes.</p><button data-jump="1">Start with source caching →</button></div>';
      $('special-detail').innerHTML='';$('test-surface').innerHTML='';return;
    }
    const f=frame(n);
    $('decisions').innerHTML=f.decisions.map((d,i)=>decisionCard(d,i,n)).join('');
    $('special-detail').innerHTML = n===7||n===8?policyTables():n===26?testTable():'';
    const removed=f.removedTestTitles.length;
    $('test-surface').innerHTML=`<strong>Test surface in this PR:</strong> ${f.testFiles.length} test / helper files touched. ${removed} removed test-title lines in the patch.<br><span>Lossy inventory: this scans test syntax; titles can be renamed, replaced, or relocated. It is not a count of lost coverage. Deleted CLI chains and explicit timing relaxations are called out as decisions above.</span><br><button data-evidence="${n}" data-tests="true">Inspect changed test files${removed?' and removed titles':''} ↗</button>`;
  }

  function render(n) {
    document.body.dataset.stage=String(n);
    $('current-label').textContent=`${comparing?'PREVIOUS FRAME · ':''}${n?`STEP ${String(n).padStart(2,'0')} / 26 · PR ${frame(n).number}`:'MAIN · BEFORE THE STACK'}`;
    $('current-title').textContent=C.stops[n].title;
    $('current-summary').textContent=C.stops[n].summary;
    renderMap(n);renderRuntime(n);renderDecisions(n);
    $('source-position').textContent=n?`${frame(n).baseSha.slice(0,8)} → ${frame(n).sha.slice(0,8)} · ${frame(n).appMechanismFiles} CLI daemon source files / ${frame(n).packageMechanismFiles} package source files`:`Pinned baseline ${D.base.slice(0,12)}`;
    $('frame-evidence').disabled=n===0;
  }

  function stopPlaying(){if(timer){clearInterval(timer);timer=null;}$('play').textContent='Play stack';$('play').setAttribute('aria-pressed','false');}
  function setStep(n,{scroll=false,manual=true}={}) {
    if(manual)stopPlaying();
    comparing=false;$('compare').classList.remove('held');
    selected=Math.max(0,Math.min(26,Number(n)));
    $('scrubber').value=String(selected);
    $('scrubber').setAttribute('aria-valuetext',`${label(selected)}: ${C.stops[selected].label}`);
    $('position').textContent=`${String(selected).padStart(2,'0')} / 26`;
    $('previous').disabled=selected===0;$('next').disabled=selected===26;$('compare').disabled=selected===0;
    document.querySelectorAll('.tick').forEach((e,i)=>{if(i===selected)e.setAttribute('aria-current','step');else e.removeAttribute('aria-current');});
    try{history.replaceState(null,'',selected?`#pr-${frame(selected).number}`:'#main');}catch{}
    render(selected);
    if(scroll)document.querySelector('.current').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }

  function showDialog(kicker,html) {
    stopPlaying();
    if(!$('detail-dialog').open)detailReturnFocus=document.activeElement;
    $('detail-kicker').textContent=kicker;
    $('detail-content').innerHTML=html;
    if(!$('detail-dialog').open)$('detail-dialog').showModal();
    $('detail-dialog').scrollTop=0;
    $('close-detail').focus();
  }

  function sourceHTML(r) {
    return `<section class="source-ref"><h3>${esc(r.path)}:${r.line}</h3><p class="revision">${r.sha.slice(0,12)} · source as it existed at this PR’s head</p><pre class="code-lines">${r.code.split('\n').map((s,i)=>`<span class="line ${r.start+i===r.line?'target':''}" data-n="${r.start+i}">${esc(s)}</span>`).join('')}</pre><a href="https://github.com/mohasarc/symnav/blob/${r.sha}/${r.path}#L${r.line}" target="_blank" rel="noreferrer">Full file at pinned revision ↗</a></section>`;
  }

  function fileList(files){return `<ul class="file-inventory">${files.map(f=>`<li><span class="add">+${f.added}</span><span class="remove">−${f.removed}</span>${esc(f.path)}</li>`).join('')}</ul>`;}

  function showEvidence(n,choiceIndex,tests=false) {
    if(n===0)return;
    const f=frame(n);
    const choice=Number.isInteger(choiceIndex)?f.decisions[choiceIndex]:null;
    let html=`<h2 id="detail-title">${label(n)} · ${tests?'Test changes':choice?'Decision evidence':esc(f.title)}</h2><p class="detail-intro">${esc(C.stops[n].summary)}</p>`;
    if(choice)html+=decisionCard(choice,choiceIndex,n).replace(/<button class="source-button"[\s\S]*?<\/button>/,'');
    html+=`<div class="evidence-links"><a href="evidence/${f.number}.md" target="_blank">Original PR body ↗</a><a href="evidence/${f.number}.patch" target="_blank">Full local PR patch ↗</a></div>`;
    html+=`<p class="detail-intro">${f.baseSha.slice(0,12)} → ${f.sha.slice(0,12)}. Reasons marked “stated” come from the PR, policy/spec, or named commit. The source excerpts below are PR-level anchors; the patch contains the complete change.</p>`;
    if(tests){
      html+=`<h3>Changed test / helper files</h3>${fileList(f.testFiles)}<h3>Removed test-title lines</h3><p class="detail-intro">Lossy syntax inventory. A deleted title can be a move or rename; no coverage conclusion follows from this list.</p>`;
      html+=f.removedTestTitles.length?`<ul class="file-inventory">${f.removedTestTitles.map(t=>`<li><strong>${esc(t.title)}</strong><br>${esc(t.path)}</li>`).join('')}</ul>`:'<p>No removed single-line test titles found by the inventory.</p>';
      html+=`<div class="evidence-links"><a href="evidence/${f.number}.patch" target="_blank">Read assertion changes in the full patch ↗</a></div>`;
    } else {
      html+=`<div class="mechanism-flow detail-flow">${flow(n)}</div>`;
      let refs=f.refs;
      if(choice?.paths?.length)refs=[...f.refs.filter(r=>choice.paths.includes(r.path)),...f.refs.filter(r=>!choice.paths.includes(r.path))];
      html+=refs.map(sourceHTML).join('');
    }
    html+=`<details><summary>All changed paths (${f.files.length}; additions/deletions counted without rename detection)</summary>${fileList(f.files)}</details><details><summary>Commit sequence (${f.commits.length})</summary><ul class="file-inventory">${f.commits.map(c=>`<li>${esc(c.sha.slice(0,8))} · ${esc(c.subject)}${c.body?`<br>${esc(c.body)}`:''}</li>`).join('')}</ul></details>`;
    showDialog('PINNED LOCAL EVIDENCE',html);
  }

  function showThread(key) {
    const t=C.threads[key];
    let html=`<h2 id="detail-title">${esc(t.title)}</h2><p class="detail-intro">Follow this responsibility across the stack. The diagram remains at ${label(selected)} when you close this view; choose a stop to move it.</p>`;
    for(const n of t.steps){
      html+=`<section class="thread-stop"><span class="eyebrow">${label(n)} · STEP ${n}${n===selected?' · CURRENT FRAME':''}</span><h3>${esc(C.stops[n].title)}</h3><p>${esc(C.stops[n].summary)}</p><div class="mechanism-flow">${flow(n)}</div><ul class="thread-decisions">${frame(n).decisions.map(d=>`<li><span class="status ${d.status}">${d.status}</span><strong>${rich(d.choice)}</strong> — ${rich(d.reason)}</li>`).join('')}</ul><button data-jump="${n}" data-close="true">Go to this frame →</button> <button data-evidence="${n}">Open its source ↗</button></section>`;
    }
    showDialog('RESPONSIBILITY HISTORY',html);
  }

  function closeDetail(){if($('detail-dialog').open)$('detail-dialog').close();}
  $('detail-dialog').addEventListener('close',()=>{if(detailReturnFocus?.isConnected)detailReturnFocus.focus();});
  $('close-detail').addEventListener('click',closeDetail);
  $('detail-dialog').addEventListener('click',e=>{if(e.target===$('detail-dialog')){const r=$('detail-dialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail();}});

  $('chapters').innerHTML=C.chapters.map((c,i)=>`<button class="chapter" data-jump="${c.start}"><span class="chapter-number">0${i+1} / ${c.range}</span><strong>${esc(c.title)}</strong><small>${esc(c.note)}</small></button>`).join('');
  $('ticks').innerHTML=C.stops.map((s,n)=>`<button class="tick" data-jump="${n}" data-nos-scroll="true" title="${label(n)} · ${esc(s.label)}" aria-label="${label(n)}: ${esc(s.label)}">${n?frame(n).number:'main'}${n&&frame(n).decisions.some(d=>d.status==='unexplained')?'<i class="gap-dot" aria-hidden="true"></i>':''}</button>`).join('');
  $('phase-track').innerHTML='<i></i>'.repeat(6);
  $('stop-list').innerHTML=C.stops.slice(1).map((s,i)=>{const n=i+1,c=C.chapters.find(c=>c.start===n);return `${c?`<div class="chapter-divider">${esc(c.title.toUpperCase())} · ${c.range}</div>`:''}<button class="stop" data-jump="${n}"><span class="stop-number">${label(n)}</span><strong>${esc(s.title)}</strong><small>${esc(s.summary)}</small><span class="stop-arrow">↗</span></button>`;}).join('');
  $('coverage-count').textContent=`${D.decisionCount} decision entries + ${D.policy.length} policy values / recipes + ${D.absences.length} deadline absences`;

  document.addEventListener('click',e=>{
    const jump=e.target.closest('[data-jump]');
    if(jump){if(jump.dataset.close)closeDetail();setStep(jump.dataset.jump,{scroll:!jump.dataset.nosScroll});return;}
    const evidence=e.target.closest('[data-evidence]');
    if(evidence){showEvidence(Number(evidence.dataset.evidence),evidence.dataset.decision===undefined?null:Number(evidence.dataset.decision),!!evidence.dataset.tests);return;}
    const thread=e.target.closest('[data-thread]');
    if(thread)showThread(thread.dataset.thread);
  });
  $('scrubber').addEventListener('input',e=>setStep(e.target.value));
  $('previous').addEventListener('click',()=>setStep(selected-1));
  $('next').addEventListener('click',()=>setStep(selected+1));
  $('frame-evidence').addEventListener('click',()=>showEvidence(comparing?selected-1:selected));
  $('play').addEventListener('click',()=>{
    if(timer){stopPlaying();return;}
    if(selected===26)setStep(0,{manual:false});
    $('play').textContent='Pause';$('play').setAttribute('aria-pressed','true');
    timer=setInterval(()=>{if(selected>=26){stopPlaying();return;}setStep(selected+1,{manual:false});if(selected===26)stopPlaying();},3600);
  });
  const compareStart=()=>{if(selected===0||comparing)return;stopPlaying();comparing=true;$('compare').classList.add('held');render(selected-1);};
  const compareEnd=()=>{if(!comparing)return;comparing=false;$('compare').classList.remove('held');render(selected);};
  $('compare').addEventListener('pointerdown',e=>{e.preventDefault();$('compare').setPointerCapture(e.pointerId);compareStart();});
  $('compare').addEventListener('pointerup',compareEnd);
  $('compare').addEventListener('pointercancel',compareEnd);
  $('compare').addEventListener('lostpointercapture',compareEnd);
  $('compare').addEventListener('keydown',e=>{if(e.code==='Space'||e.key==='Enter'){e.preventDefault();compareStart();}});
  $('compare').addEventListener('keyup',e=>{if(e.code==='Space'||e.key==='Enter'){e.preventDefault();compareEnd();}});
  $('compare').addEventListener('blur',compareEnd);
  for(const l of ['ownership','runtime'])$(l+'-view').addEventListener('click',()=>{
    lens=l;$('package-panel').hidden=l!=='ownership';$('runtime-panel').hidden=l!=='runtime';
    $('ownership-view').setAttribute('aria-pressed',String(l==='ownership'));$('runtime-view').setAttribute('aria-pressed',String(l==='runtime'));
    $('diagram-note').textContent=l==='ownership'?'Schematic: cards group responsibilities, not files; areas do not measure code size. Solid outer boxes are packages. Transport/process rows split before they move.':'Illustrative runtime path, not an execution trace. Arrows carry requests, output bytes, and reports; package ownership changes while these runtime locations stay in place.';
  });
  document.addEventListener('keydown',e=>{
    const thread=e.target.closest('[data-thread]');
    if(thread&&thread.tagName!=='BUTTON'&&(e.key==='Enter'||e.code==='Space')){e.preventDefault();showThread(thread.dataset.thread);return;}
    if($('detail-dialog').open||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,#compare'))return;
    if(e.key==='ArrowRight'){e.preventDefault();setStep(selected+1);}
    if(e.key==='ArrowLeft'){e.preventDefault();setStep(selected-1);}
    if(e.key==='Home'){e.preventDefault();setStep(0);}
    if(e.key==='End'){e.preventDefault();setStep(26);}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlaying();});
  const hash=location.hash.match(/^#pr-(\d+)$/);
  const initial=hash?D.frames.findIndex(f=>f.number===Number(hash[1]))+1:0;
  setStep(initial);
})();
