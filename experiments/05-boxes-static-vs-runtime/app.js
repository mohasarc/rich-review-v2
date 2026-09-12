'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const D = window.DECISIONS;
const E = window.EVIDENCE;
const shortFile = path => path.split('/').at(-1);
const sectionFor = id => D.find(d => d.id === id);
const reasonBadge = status => `<span class="reason-badge ${status}">${status}</span>`;
const sourceButton = (file, find = '', label = null, mode = 'head') => {
  const lines = (E.files[file]?.head || '').split('\n');
  const at = find ? lines.findIndex(line => line.includes(find)) + 1 : 0;
  return `<button class="source-link" data-evidence="${escapeHtml(file)}" data-find="${escapeHtml(find)}" data-mode="${mode}">${escapeHtml(label || shortFile(file))}${at > 0 ? ':' + at : ''} ↗</button>`;
};

$('#decision-cards').innerHTML = D.map((d, i) => `<a class="decision-card" href="#decision-${d.id}"><div class="card-top"><span class="decision-number">${String(i + 1).padStart(2, '0')}</span>${reasonBadge(d.status)}</div><h3>${d.title}</h3><p>${d.summary}</p><span class="card-link">Open mechanism & source ↗</span></a>`).join('');
$('#decision-details').innerHTML = D.map((d, i) => `<details class="decision-detail" id="decision-${d.id}"><summary><span class="decision-number">${String(i + 1).padStart(2, '0')}</span><h3>${d.title}</h3>${reasonBadge(d.status)}</summary><div class="detail-body"><div class="reason"><strong>${d.status === 'stated' ? 'Recorded reason.' : 'Rationale gap.'}</strong>${d.reason} ${d.reasonFile === 'PR' ? '<button class="source-link" data-evidence="PR">Read supplied PR body ↗</button>' : d.reasonFile ? sourceButton(d.reasonFile) : ''}</div>${d.body}<div class="source-list" aria-label="Evidence for ${escapeHtml(d.title)}">${d.refs.map(([file, find]) => sourceButton(file, find)).join('')}</div><nav class="return-links" aria-label="Return from ${escapeHtml(d.title)}"><a href="#decision-index">↑ Decision index</a><a href="#static-map">↑ Static map</a><a href="#runtime-map">↑ Runtime map</a></nav></div></details>`).join('');

function svgStart(id, height, title, desc) {
  return `<svg viewBox="0 0 1160 ${height}" xmlns="http://www.w3.org/2000/svg" aria-labelledby="${id}-title ${id}-desc" role="graphics-document"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs>${['new','old','existing'].map(kind => `<marker id="${id}-${kind}" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto-start-reverse"><path d="M0 0 L7 3.5 L0 7" fill="none" stroke="${{new:'#6de9b2',old:'#ff9c85',existing:'#8a9aaa'}[kind]}" stroke-width="1.2"/></marker>`).join('')}</defs>`;
}
function text(x,y,value,cls='',anchor='start') { return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${escapeHtml(value)}</text>`; }
function node(x,y,w,h,title,lines,id,group='all',cls='') {
  return `<a href="#decision-${id}" class="topic ${cls}" data-topic="${group}" aria-label="${escapeHtml(title)}: open decision ${escapeHtml(sectionFor(id).title)}"><rect class="node-bg" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>${text(x+14,y+26,title,'box-title')}${lines.map((line,i)=>text(x+14,y+48+i*17,line,'box-small')).join('')}</a>`;
}
function edge(id,path,kind='existing',group='all',double=false) {
  return `<path class="edge ${kind} topic ${kind==='new'?'after-only':kind==='old'?'before-only':''}" data-topic="${group}" d="${path}" marker-end="url(#${id}-${kind})" ${double?`marker-start="url(#${id}-${kind})"`:''}/>`;
}
function label(x,y,value,group='all',cls='') { return `<g class="topic ${cls}" data-topic="${group}">${text(x,y,value,'edge-label')}</g>`; }
function drawStatic() {
  const id='static'; let s=svgStart(id,665,'Static structure before and after PR 131','The daemon package owns policy. CLI mechanisms remain in the app. New green edges point from consumer groups to the public policy types; red dashed routes to local defaults disappear. Tests gain adapters.');
  s += `<rect class="boundary" x="20" y="24" width="286" height="610" rx="5"/><rect class="boundary" x="368" y="24" width="773" height="610" rx="5"/>`;
  s += text(36,49,'packages/daemon','boundary-label')+text(384,49,'apps/cli · all mechanisms remain here','boundary-label');
  s += `<path d="M20 472 H306 M368 488 H1141" stroke="#596e7a" stroke-dasharray="4 4" fill="none"/>`;
  s += text(37,495,'test-only subpath (already exists)','legend-small')+text(386,510,'test code / benchmark fixtures','legend-small');
  // Dependency edges point toward the imported owner.
  s += edge(id,'M397 112 H282');
  s += label(315,95,'imports');
  s += edge(id,'M684 149 V184')+edge(id,'M974 149 V184');
  s += label(698,174,'constructs');
  s += edge(id,'M1109 150 H1124 V441 H974 V432');
  s += edge(id,'M1124 442 H803 V431');
  s += edge(id,'M560 219 H530','old','output');
  s += edge(id,'M844 245 H823 V291 H530','old','resources');
  s += edge(id,'M560 371 H530','old','clocks');
  s += edge(id,'M844 385 H818 V439 H509 V430','old','delivery');
  s += edge(id,'M684 275 V303 H550 V446 H344 V264 H282','new','output');
  s += edge(id,'M974 275 V307 H839 V455 H356 V302 H282','new','resources');
  s += edge(id,'M684 431 V465 H350 V348 H282','new','clocks');
  s += edge(id,'M974 431 V477 H330 V388 H282','new','delivery');
  s += edge(id,'M601 185 V163 H330 V162 H282','new','output');
  s += label(311,178,'value import','output','after-only');
  s += edge(id,'M544 564 H609','new','adapters');
  s += edge(id,'M645 606 V626 H168 V598','new','adapters');
  s += label(374,652,'New test adapters import the existing policy factory; production does not.','adapters');
  s += node(40,82,242,99,'DaemonPolicy',['immutable snapshot + serialization','currentSystem / fromSerialized','definitions unchanged in #131'],'contract','all','policy');
  s += node(40,230,242,181,'DaemonPolicyValues',['transport · delivery · output','resources','startup · shutdown','diagnostics','','public input types'],'contract','all','policy');
  s += node(40,516,242,82,'Policy test factory',['withOverrides → validate','@symnav/daemon/policy-testing'],'adapters','adapters','policy');
  s += node(397,77,712,72,'Composition: dependencies, command actions, process & worker entries',['imports policy; constructs app mechanisms; passes required inputs after #131'],'contract');
  s += node(390,189,140,242,'Local defaults',['output constants','resource class','lifecycle values','diagnostic caps','numeric options','','retired routes'],'contract','all','retired before-only');
  s += node(560,185,248,90,'Output & spool',['OrderedCommandOutput / spool','worker checks + leaf codecs'],'output','output');
  s += node(844,185,265,90,'Resource supervision',['DaemonResourceSupervisor','worker limits / heap sampling'],'resources','resources');
  s += node(560,324,248,107,'Lifecycle & diagnostics',['registry / coordinator / controller','lifetime / terminator / logger','WorkspaceDaemon traces + drain'],'clocks','clocks');
  s += node(844,324,265,107,'Transport',['LocalDaemonTransport','purpose deadline / retry scopes','framing + output capture'],'deadlines','delivery');
  s += `<g class="after-only">${text(48,442,'← required public policy dependencies','legend-small')}</g>`;
  s += node(390,529,154,77,'Tests & fixtures',['legacy knobs','existing scenarios'],'tests','adapters');
  s += node(609,529,500,77,'7 helper adapters + local logger adapter',['translate test options → validated policy → runtime constructor'],'adapters','adapters','new-node after-only');
  s += `<g class="base-only">${text(628,558,'Before: tests call the mechanisms with local knobs.','box-small')}</g>`;
  s += '</svg>'; $('#static-svg').innerHTML=s;
}
function drawRuntime() {
  const id='runtime'; let s=svgStart(id,756,'Runtime topology before and after PR 131','A CLI process launches a separate daemon process; the daemon contains a worker thread. Serialized policy already crosses launch boundaries. Green arrows connect each local snapshot to consumers. Gray socket and worker-message paths persist.');
  s += `<rect class="process-boundary" x="20" y="24" width="294" height="602" rx="5"/><rect class="process-boundary" x="368" y="24" width="773" height="602" rx="5"/><rect class="thread-boundary" x="794" y="206" width="330" height="351" rx="5"/>`;
  s += text(37,49,'CLI PROCESS','boundary-label')+text(387,49,'DAEMON PROCESS','boundary-label')+text(399,186,'MAIN THREAD','boundary-label')+text(811,226,'WORKER THREAD · inside daemon','boundary-label');
  s += edge(id,'M294 113 H398');
  s += label(311,83,'spawn argv');
  s += edge(id,'M736 113 H963 V244');
  s += label(817,139,'workerData');
  s += label(817,158,'serialized policy (already)');
  s += edge(id,'M100 147 V236','new','clocks');
  s += edge(id,'M277 147 H304 V481 H294','new','delivery');
  s += edge(id,'M112 347 V325','old','clocks');
  s += edge(id,'M188 405 V446','old','delivery');
  s += edge(id,'M489 147 V236','new','clocks');
  s += label(403,213,'startup / shutdown / diagnostics','clocks','after-only');
  s += edge(id,'M711 147 H757 V425 H736','new','resources');
  s += edge(id,'M724 147 H770 V442 H736','new','output');
  s += edge(id,'M736 128 H782 V562 H736','new','delivery');
  s += edge(id,'M703 147 V173 H1115 V206','new','resources');
  s += label(982,190,'V8 heap cap','resources','after-only');
  s += edge(id,'M453 345 V325','old','clocks');
  s += edge(id,'M457 374 V385','old','resources');
  s += edge(id,'M726 374 H746 V561 H736','old','output');
  s += edge(id,'M294 484 H342 V562 H398','existing','delivery',true);
  s += label(320,516,'local'); s += label(320,533,'socket');
  s += edge(id,'M829 309 V349','new','output');
  s += edge(id,'M1090 309 H1113 V512 H1100','new','resources');
  s += edge(id,'M893 447 V433','old','output');
  s += edge(id,'M966 473 V486','old','resources');
  s += edge(id,'M710 475 V609 H843 V433','existing','output',true);
  s += label(799,649,'worker messages: execute / chunks / output-ack','output');
  s += label(808,590,'main-thread worker bridge ↔ worker','output');
  s += edge(id,'M80 524 V684','existing','output');
  s += edge(id,'M410 475 H380 V703 H398');
  s += label(89,666,'client temp output','output');
  s += node(40,82,254,65,'Policy snapshot',['created with currentSystem()'],'contract','all','policy');
  s += node(398,82,338,65,'Same policy values',['fromSerialized(configuration.policy)'],'contract','all','policy');
  s += node(816,244,284,65,'Same policy values',['fromSerialized(workerData.policy)'],'contract','all','policy');
  s += node(40,236,254,89,'Controller + coordinator',['startup / stop / registry','process termination'],'clocks','clocks');
  s += node(40,347,254,58,'Local defaults / knobs',['timeouts · polling · fixed retry'],'contract','all','retired before-only');
  s += node(40,446,254,78,'Transport · client',['purpose / attempts / byte caps','ordered output capture'],'deadlines','delivery');
  s += node(398,236,338,89,'WorkspaceDaemon + logger',['startup / idle / traces / drain','diagnostic queue + rotation'],'clocks','clocks');
  s += `<a href="#decision-resources" class="topic retired before-only" data-topic="all"><rect class="node-bg" x="398" y="345" width="338" height="29" rx="3"/>${text(410,365,'local resource class / constants / knobs','box-small')}</a>`;
  s += node(398,385,338,90,'Spool + resource supervisor',['raw capacities / RSS / replacement','main-thread worker bridge: chunk check'],'resources','resources output');
  s += node(398,532,338,60,'Transport · server',['control frames + result chunks'],'output','output delivery');
  s += node(816,349,284,84,'CliProgramExecutor + protocol',['output capture / chunk validation','worker sends; main thread checks'],'output','output');
  s += `<a href="#decision-output" class="topic retired before-only" data-topic="all"><rect class="node-bg" x="816" y="447" width="284" height="26" rx="3"/>${text(828,465,'local chunk cap / 25 ms constant','box-small')}</a>`;
  s += node(816,486,284,57,'Heap sampler',['active-command sampling interval'],'resources','resources');
  s += node(40,684,254,57,'Temporary output files',['existing client storage path'],'output','output');
  s += node(398,684,702,57,'Local state files: registry / completion spool / diagnostics',['existing filesystem I/O, grouped here; storage boundaries do not move in #131'],'clocks','clocks output');
  s += '</svg>'; $('#runtime-svg').innerHTML=s;
}
drawStatic(); drawRuntime();

const focusDescriptions={
  all:'All routes shown. “Follow” highlights the same concern in both maps.',
  output:'Output: static types and leaf byte limits feed capture, spool and codecs. At runtime, worker send/receive checks, daemon storage and client decoding agree on the chunk ceiling.',
  resources:'Resources: the duplicate app policy class disappears. The daemon uses supplied RSS thresholds and worker heap limits; the worker uses the supplied heap-sampling interval.',
  clocks:'Lifecycle and diagnostics: separate fields feed client control and daemon lifetime, drain, logging and traces. Equal numeric defaults remain distinct policy fields.',
  delivery:'Deadlines and attempts: the client transport receives required transport/delivery/output sections. Status purpose selects its deadline; reattachment wraps a fresh execute attempt.',
  adapters:'Test adapters are a static test-code boundary. They are not another production process. The runtime map keeps its production topology while the test route is highlighted above.'
};
function applyFocus(value) {
  document.body.dataset.focus=value;
  $('#focus-picker').value=value;
  $$('.diagram-scroll .topic').forEach(el=>el.classList.toggle('dimmed',value!=='all' && el.dataset.topic!=='all' && !el.dataset.topic.split(' ').includes(value)));
  $('#focus-readout').textContent=focusDescriptions[value];
}
$('#focus-picker').addEventListener('change',event=>applyFocus(event.target.value));
$$('[data-version]', $('#map-controls')).forEach(button=>button.addEventListener('click',()=>{
  const version=button.dataset.version;document.body.dataset.version=version;
  $$('#map-controls [data-version]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  $('#revision-note').textContent={base:'Before · '+E.baseSha.slice(0,8),head:'After · '+E.headSha.slice(0,8),delta:'Changes · base → head of #131'}[version];
}));

const rows = E.policyRows.filter(row=>!row.path.startsWith('recipe.'));
$('#policy-rows').innerHTML=rows.map(row=>`<tr><td>${escapeHtml(row.path)}</td><td>${escapeHtml(row.default)}</td><td>${escapeHtml(row.applies)}</td><td>${escapeHtml(row.reason)}</td></tr>`).join('');
$('#policy-search').addEventListener('input',event=>{
  const needle=event.target.value.toLowerCase();
  $$('#policy-rows tr').forEach(row=>row.hidden=!row.textContent.toLowerCase().includes(needle));
});

function classify(path) {
  if(path.startsWith('meta-tests')) return 'guards';
  if(path.endsWith('daemon-resource-monitor.test.ts') || path.endsWith('daemon-startup-coordinator.test.ts')) return 'tests';
  if(path.endsWith('completion-spool.test.ts') || path.endsWith('cli-program-executor.test.ts') || path.endsWith('workspace-daemon-requests.test.ts') || path.endsWith('local-daemon-transport-execution.test.ts')) return 'fixtures';
  if(path.endsWith('local-daemon-transport-validation.test.ts')) return 'deadlines';
  if(path.includes('/test/') || path.includes('.test.')) return 'adapters';
  if(path.endsWith('local-daemon-transport.ts')) return 'attempts';
  if(path.endsWith('daemon-resource-monitor.ts') || path.endsWith('daemon-navigation-worker-entry.ts')) return 'resources';
  if(/command-execution-result|cli-program-executor|completion-spool|daemon-result-chunk-codec|daemon-navigation-worker-protocol|daemon-navigation-worker\.ts/.test(path))return 'output';
  if(/daemon-command-dispatcher|daemon-entry|register-daemon-command|workspace-daemon/.test(path))return 'contract';
  return 'clocks';
}
$('#file-index').innerHTML=Object.entries(E.files).filter(([,f])=>f.changed).map(([path,f])=>`<div class="file-row">${sourceButton(path,'',path,'patch')}<span class="file-count">+${f.added} / −${f.removed}</span><a href="#decision-${classify(path)}">${sectionFor(classify(path)).title} ↗</a></div>`).join('');
$('#shas').textContent=`${E.baseSha.slice(0,8)} → ${E.headSha.slice(0,8)}`;

function openHash(shouldScroll=true) {
  const id=decodeURIComponent(location.hash.slice(1));
  if(!id)return;
  const target=document.getElementById(id);
  if(!target)return;
  if(target.matches('details'))target.open=true;
  const decision=sectionFor(id.replace('decision-',''));
  if(decision)applyFocus(decision.group);
  if(shouldScroll)requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
}
window.addEventListener('hashchange',()=>openHash());
document.addEventListener('click',event=>{
  const a=event.target.closest('a[href^="#"]');
  if(!a)return;
  const target=document.getElementById(a.getAttribute('href').slice(1));
  if(target?.matches('details'))target.open=true;
  if(a.getAttribute('href')===location.hash)openHash();
});
openHash(false);

const evidenceDialog=$('#evidence-dialog');
const fileSelect=$('#evidence-file');
fileSelect.innerHTML='<option value="PR">Supplied PR body + commits</option>'+Object.keys(E.files).sort().map(path=>`<option value="${escapeHtml(path)}">${escapeHtml(path)}${E.files[path].changed?'':' · unchanged context'}</option>`).join('');
let evidenceState={file:'PR',mode:'head',find:''};
function renderEvidence() {
  const {file,mode,find}=evidenceState;
  fileSelect.value=file;
  $$('.evidence-controls [data-source-mode]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.sourceMode===mode));b.disabled=file==='PR';});
  if(file==='PR') {
    $('#evidence-title').textContent=E.pr.title;
    $('#evidence-location').textContent='Supplied inputs/pr-131/pr.json · PR narrative and commit messages are claims, checked against source in this page.';
    $('#code-view').innerHTML=`<div class="intent-text">${escapeHtml(E.pr.body+'\n\nCOMMITS\n'+E.pr.commits.map(c=>c.sha.slice(0,8)+' '+c.subject+(c.body?'\n'+c.body:'')).join('\n'))}</div>`;
    $('#code-view').scrollTop=0;return;
  }
  const f=E.files[file];$('#evidence-title').textContent=file;
  const content=f[mode];
  $('#evidence-location').textContent=(mode==='patch'?E.baseSha.slice(0,12)+' → '+E.headSha.slice(0,12):(mode==='base'?E.baseSha:E.headSha).slice(0,12))+' · '+(f.changed?'changed in PR #131':'unchanged context')+(find?' · locate: '+find:'');
  if(content===null) {$('#code-view').innerHTML='<div class="intent-text">File absent in this revision.</div>';return;}
  let oldLine=0,newLine=0,hit=false;
  $('#code-view').innerHTML=content.split('\n').map((line,i)=>{
    let cls='',number=String(i+1);
    if(mode==='patch') {
      const hunk=line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
      if(hunk){oldLine=Number(hunk[1]);newLine=Number(hunk[2]);cls='hunk';number='';}
      else if(line.startsWith('+')&&!line.startsWith('+++')){cls='add';number='  '+newLine++;}
      else if(line.startsWith('-')&&!line.startsWith('---')){cls='remove';number=oldLine+++'  ';}
      else if(line.startsWith(' ')&&oldLine){number=oldLine+++' '+newLine++;}
      else number='';
    }
    if(!hit&&find&&line.includes(find)){cls+=' hit';hit=true;}
    return `<div class="code-line ${cls}"><span class="ln ${mode==='patch'?'diff-ln':''}">${number}</span><span>${escapeHtml(line)||' '}</span></div>`;
  }).join('');
  const view=$('#code-view');view.scrollTop=0;
  requestAnimationFrame(()=>{const match=$('.hit',view);if(match)view.scrollTop=match.offsetTop-view.offsetTop-100;});
}
function showEvidence(file,find='',mode='head') {
  evidenceState={file,find,mode};renderEvidence();
  if(!evidenceDialog.open)evidenceDialog.showModal();
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-evidence]');if(button)showEvidence(button.dataset.evidence,button.dataset.find||'',button.dataset.mode||'head');});
$('#open-intent').addEventListener('click',()=>showEvidence('PR'));
$('#close-evidence').addEventListener('click',()=>evidenceDialog.close());
evidenceDialog.addEventListener('click',event=>{if(event.target===evidenceDialog){const rect=evidenceDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)evidenceDialog.close();}});
fileSelect.addEventListener('change',event=>{evidenceState.file=event.target.value;evidenceState.find='';renderEvidence();});
$$('[data-source-mode]').forEach(button=>button.addEventListener('click',()=>{evidenceState.mode=button.dataset.sourceMode;renderEvidence();}));
