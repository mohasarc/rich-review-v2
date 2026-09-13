(function () {
  'use strict';
  const M=window.TURN_MODEL, B=window.BRIEFING;
  const $=id=>document.getElementById(id);
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=value=>esc(value).replace(/`([^`]+)`/g,'<code>$1</code>');
  const ref=(id,label)=>`<button type="button" class="ref-link" data-ref="${esc(id)}" aria-label="Read evidence for decision ${esc(id)}">${esc(label||id)}</button>`;
  const allDecisions=[...B.extras,...B.prs.flatMap(pr=>pr.decisions.map(d=>({...d,pr:pr.number,title:pr.title})))];
  const states=Object.fromEntries(M.stations.map(s=>[s.id,M.initial(s.id)]));
  const histories=Object.fromEntries(M.stations.map(s=>[s.id,[]]));
  const events=Object.fromEntries(M.stations.map(s=>[s.id,[]]));
  const messages=Object.fromEntries(M.stations.map(s=>[s.id,{message:'The contract is open. Choose a move, or let the walkthrough make one.',tone:'event'}]));
  let current='owners', selectedPiece=null, selectedGuard=null, diagram='after';
  const panels=$('station-panel');
  const control=(action,label,value,primary=false)=>`<button type="button" id="act-${esc(action)}${value===undefined?'':'-'+esc(String(value).replace(/[^a-z0-9]/gi,'-'))}" data-action="${esc(action)}" ${value===undefined?'':`data-value="${esc(value)}"`} class="${primary?'primary':''}">${esc(label)}</button>`;
  const counter=(label,value)=>`<div class="state-counter"><small>${esc(label)}</small><strong>${esc(value)}</strong></div>`;

  function renderReference() {
    const baseContents={
      cli:'argv, executor, all daemon mechanisms, retention wiring, lifecycle formatting',
      daemon:'No daemon package in main',
      core:'Workspace and navigation primitives; filesystem and backend contracts',
      typescript:'Source cache, revisioned indexes, project membership, manual cache lifetime, TypeScript semantics',
      renderer:'Navigation text and JSON',telemetry:'Usage capture, usage paths, shared state-directory resolution'
    };
    const afterContents={
      cli:'argv + workspace root · canonical environment · concrete executor · dependency wiring · printing',
      daemon:'DaemonClient · policy · clock · registry · transport · process · worker · execution · delivery · resources',
      core:'WorkspaceSession · source cache · revisioned index · project membership · turn-cache lifetime',
      typescript:'tsconfig parsing · ts-morph projects · semantic query bodies · TypeScript mutation journal',
      renderer:'Navigation + daemon lifecycle text and JSON',telemetry:'Usage events · capture · aggregation · usage-log paths'
    };
    const links={cli:'group-host',daemon:'group-package',core:'group-workspace',typescript:'group-workspace',renderer:'pr-136',telemetry:'pr-129'};
    const imports={cli:diagram==='after'?'→ core · daemon · renderer · TypeScript · telemetry':'→ core · renderer · TypeScript · telemetry',daemon:'→ no internal package',core:'→ no internal package',typescript:'→ core',renderer:diagram==='after'?'→ core · daemon':'→ core',telemetry:'→ no internal package'};
    $('reference-map').innerHTML=`<div class="reference-grid">${M.owners.map(o=>`<article class="reference-package ${diagram==='after'&&o.id!=='typescript'?'moved':''} ${diagram==='before'&&o.id==='daemon'?'empty':''}"><h3><a href="#${links[o.id]}">${esc(o.name)} ↘</a></h3><div class="contents">${esc((diagram==='after'?afterContents:baseContents)[o.id])}</div><div class="imports">${diagram==='before'&&o.id==='daemon'?'not present':esc(imports[o.id])}</div></article>`).join('')}</div>`;
    document.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.map===diagram)));
  }

  function renderBriefing() {
    $('contract-cards').innerHTML=M.stations.map(s=>`<article class="contract-card" id="contract-${s.id}"><div class="contract-header"><span class="contract-number">${s.n}</span><h3>${esc(s.verb)}</h3></div><ol>${s.rules.map((r,i)=>`<li id="rule-${s.id}-${i+1}">${text(r)}</li>`).join('')}</ol><div class="contract-footer"><a href="#station-${s.id}">Play ${esc(s.name)} ↗</a><a href="#group-${s.group}">All decisions in this family ↓</a>${s.refs.slice(0,3).map(r=>ref(r)).join(' ')}</div></article>`).join('');
    $('atlas-nav').innerHTML=B.groups.map(g=>`<a href="#group-${g.id}">${g.glyph} · ${esc(g.title)}</a>`).join('');
    $('extra-decisions').innerHTML=B.extras.map(d=>`<article id="decision-${d.id}" class="extra-card ${d.status}"><div class="decision-meta">${ref(d.id)}<span class="status ${d.status}">${d.status}</span></div><h4>${esc(d.title)}</h4><p>${text(d.choice)}</p><p class="reason">${text(d.reason)}</p><a class="quiet-link" href="evidence/${d.id}.html" target="_blank" rel="noopener">Pinned source ↗</a></article>`).join('');
    $('decision-atlas').innerHTML=B.groups.map(g=>`<section class="atlas-group" id="group-${g.id}"><h3><span>${g.glyph}</span>${esc(g.title)}</h3><div class="pr-grid">${B.prs.filter(p=>p.group===g.id).map(p=>`<article class="pr-card" id="pr-${p.number}"><div class="pr-heading"><span class="pr-number">#${p.number}</span><h4>${esc(p.title)}</h4></div>${p.stage?`<div class="stage-note">${text(p.stage)}</div>`:''}${p.decisions.map(d=>`<div class="decision-row" id="decision-${d.id}"><div class="decision-meta">${ref(d.id,'Decision '+d.id+' ↗')}<span class="status">stated</span></div><div class="choice"><b>${text(d.chosen)}</b><span class="alternative">${text(d.alternative)}</span></div><div class="reason-arrow"><span aria-hidden="true">↳</span><div>${text(d.reason)}</div></div></div>`).join('')}</article>`).join('')}</div></section>`).join('');
    $('policy-absences').innerHTML=`<div class="absences">${B.absences.map(a=>`<div class="absence"><b>${esc(a.key)}</b><strong>${esc(a.value)}</strong><p>${esc(a.reason)}</p></div>`).join('')}</div>`;
    $('policy-rows').innerHTML=B.policy.map(p=>`<tr><td>${esc(p.key)}</td><td>${esc(p.value)}</td><td>${esc(p.reason)}</td></tr>`).join('');
  }

  function ownersBoard(s) {
    return `<h4>Move responsibilities from main to the final package map</h4><p class="selection">${selectedPiece?'Selected: '+esc(M.pieces.find(p=>p.id===selectedPiece).name)+'. Choose “Place here” in a package.':'Choose a responsibility tile, then place it in its owner. Keyboard: Tab, Enter, Tab to destination.'}</p><div class="package-board">${M.owners.map(o=>`<section class="package-bin"><h4>${esc(o.name)}</h4>${M.pieces.filter(p=>s.placements[p.id]===o.id).map(p=>`<button type="button" id="piece-${p.id}" data-piece="${p.id}" aria-pressed="${selectedPiece===p.id}" class="piece ${selectedPiece===p.id?'selected':''} ${p.before!==s.placements[p.id]?'moved':''}">${esc(p.name)}</button>`).join('')}<button type="button" id="place-${o.id}" class="place" data-place="${o.id}" ${selectedPiece?'':'disabled'} aria-label="Place selected responsibility in ${esc(o.name)}">Place here</button></section>`).join('')}</div><div class="action-row">${control('run','Route the request',undefined,true)}</div>`;
  }

  function cacheBoard(s) {
    const names=['definitions','reference locations','call targets','callers','callees','definition at position'];
    return `<h4>Three lifetimes / one failed preparation supplied</h4><div class="state-counters">${counter('SESSION',s.session)}${counter('PUBLISHED INDEX','rev '+s.published)}${counter('SEMANTIC TURN',s.turn)}</div><div class="shelf durable"><div class="shelf-heading"><b>Retained workspace + backend state</b><small>outlives one query turn</small></div><div class="candidate">${s.phase==='candidate'||s.phase==='validated'?'Candidate revision 8 · '+s.phase:s.phase==='failed'?'Candidate rejected · published index remains 7':'Published revision '+s.published+' · identity retained'}</div><div class="process-arrows">prepare → validate → toolchain commit → portable publication</div></div><div class="shelf transient"><div class="shelf-heading"><b>Six separate cache handles</b><small>${s.caches?'entries present':'entries cleared'}</small></div><div class="cache-crates">${names.map((n,i)=>`<div class="cache-crate ${s.caches?'':'empty'}">${n}<b>${s.caches?(s.probes&&i===5?'undefined ✓':'turn '+s.turn):'∅'}</b></div>`).join('')}</div><p class="small" style="margin:12px 0 0">Toy entries show cache lifetime; these are not executed TypeScript queries. Release: ${esc(s.release)}.</p></div><div class="action-row">${control('prepare','Prepare candidate')}${control('validate','Validate')}${control('commit','Commit + publish')}${control('begin','Begin next turn')}${control('probe','Probe cached undefined')}${control('release','Release transient resources')}${control('settle','Let cleanup reject')}</div>`;
  }

  function gatesBoard(s) {
    const def=M.laneDefs[s.lane],reports=s.reports[s.lane]||[];
    return `<h4>Reorder the guard tiles / click two to exchange positions</h4><div class="segmented">${['admission','routing'].map(l=>`<button type="button" data-action="lane" data-value="${l}" aria-pressed="${s.lane===l}">${l==='admission'?'Server admission':'Client routing'}${s.solved[l]?' · demonstrated':''}</button>`).join('')}</div><div class="guard-track">${s.orders[s.lane].map((g,i)=>`<button type="button" id="guard-${i}" class="guard ${selectedGuard===i?'selected':''}" data-guard="${i}" aria-pressed="${selectedGuard===i}"><small>${i+1} →</small>${esc(def.labels[g])}</button>`).join('')}</div><p class="small">Each arrival below includes all the named failing guards, not just its first failure. The contract’s outcome is visible before you send it.</p><div class="table-scroll"><table class="case-table"><thead><tr><th>Arrival / failures</th><th>Stack contract</th><th>Your ordered trace</th></tr></thead><tbody>${def.cases.map((c,i)=>`<tr class="${reports[i]&&reports[i].result!==c.result?'diverged':''}"><td><b>${esc(c.name)}</b><br><span class="trace">${esc(c.fail.map(g=>def.labels[g].replace('?','')).join(' · ')||'none')}</span></td><td>${esc(c.result)}<br><span class="trace">${esc(c.effect)}</span></td><td>${reports[i]?`${esc(reports[i].result)}<br><span class="trace">${esc(reports[i].checked.map(g=>def.labels[g]).join(' → '))}</span>`:'Awaiting arrival'}</td></tr>`).join('')}</tbody></table></div><div class="action-row">${control('run','Send all arrivals',undefined,true)}</div>`;
  }

  function workerBoard(s) {
    return `<h4>Original acceptance metadata survives every attachment</h4><table class="ledger"><thead><tr><th>Ledger identity</th><th>Acceptance (toy)</th><th>Queue / delivery</th></tr></thead><tbody><tr><td><b>A</b>${s.duplicate?' + attached duplicate':''}</td><td>time 10 · position 0</td><td>${esc(s.a)}</td></tr><tr><td><b>B</b></td><td>time 11 · position 1</td><td>${esc(s.b)}</td></tr></tbody></table><div class="worker-rail"><div class="worker-box ${s.generation===2?'retired':''}"><b>generation 1</b><p>${s.generation===1?'current · ready':s.oldTerminated?'termination settled':'termination pending'}</p><p>${s.lateIgnored?'late exit fenced':'late exit not yet sent'}</p></div><span class="generation-arrow" aria-hidden="true">→</span><div class="worker-box"><b>generation 2</b><p>${s.generation===1?'not started':s.ready?'current · ready':s.newReport?'ready report held':'starting · not ready'}</p><p>${s.replacing?'one shared replacement operation':'replacement '+(s.generation===2?'settled':'not started')}</p></div></div><div class="boundary-bar">Delivery A: ${s.a==='delivered'?'settled':'still a barrier'} → sample A: ${s.recoverySettled?'settled':s.sampledA?'awaiting recovery':'pending'} → resource admission: ${s.admissionPaused?'paused':'open'} → B: ${esc(s.b)}</div><div class="action-row">${control('duplicate','Attach duplicate A')}${control('finish-a','Finish A')}${control('deliver-a','Settle latest A delivery')}${control('sample-a','Sample after A')}${control('replace','Start replacement')}${control('ready-new','Receive ready report 2')}${control('terminate-old','Settle termination 1')}${control('old-exit','Inject late exit 1')}${control('settle-recovery','Settle resource recovery')}${control('start-b','Run B')}${control('finish-b','Finish B')}${control('deliver-b','Settle B delivery')}${control('sample-b','Sample after B')}${control('inspect','Inspect the handoff',undefined,true)}</div>`;
  }

  function transferBoard(s) {
    return `<h4>Recover an accepted job / both recovery scopes are open</h4><div class="segmented"><button type="button" data-transfer-mode="fetch" aria-pressed="${s.mode==='fetch'}">Stalled append → fetch</button><button type="button" data-transfer-mode="reattach" aria-pressed="${s.mode==='reattach'}">Accepted close → reattach</button></div><p class="small" style="margin-top:14px">${s.mode==='fetch'?'Starting position: records 0 and 1 durable; record 2 append pending; socket closed.':'Starting position: accepted request A; interrupted old capture; old attempt’s fetch allowance spent. Reattach A with a fresh capture.'}</p><div class="state-counters">${counter('DAEMON EXECUTIONS',s.executions)}${counter('CAPTURE / DECODER',s.capture+' / '+s.decoder)}${counter('NEXT DURABLE OFFSET',s.durable)}</div><div class="connection-line ${s.connected?'':'closed'}">${s.connected?'socket open → '+(s.manifest?'manifest matched':'await manifest'):'socket closed × · receipt state survives'}</div><div class="records">${['stdout α','stderr β','stdout γ','stdout δ'].map((label,i)=>`<div class="record ${i<s.durable?'durable':s.pending===i?'pending':''}"><b>${i}</b><span>${label}</span><br><span>${i<s.durable?'durable':s.pending===i?'append pending':'missing'}</span></div>`).join('')}</div><div class="process-arrows">fetch allowance used: ${s.fetchUsed} / 1 in this attempt · reattachment allowance used: ${s.reattachUsed} / 1<br>Illustrative durability means awaited capture append. The real capture may use memory or spill files; this is not an fsync claim.</div><div class="fetch-controls"><label for="fetch-offset">Resume at record</label><select id="fetch-offset">${[0,1,2,3,4].map(i=>`<option value="${i}" ${i===s.durable?'selected':''}>${i}</option>`).join('')}</select>${control('fetch','Fetch missing records')}</div><div class="action-row">${control('append','Settle append')}${control('reattach','Reattach identical request')}${control('manifest','Receive matching manifest')}${control('receive','Receive next record')}${control('disconnect','Disconnect socket')}${control('verify','Verify end + digest seal')}${control('ack','Acknowledge result')}${control('ack-error','Acknowledge with cleanup error')}${control('replay','Replay stored output')}${control('dispose','Dispose client capture',undefined,true)}${control('local-replay','Try executing locally')}${control('bad-manifest','Send changed manifest')}</div>${s.replayed?`<div class="terminal" style="margin-top:20px"><small>CALLER OUTPUT · ORIGINAL ORDER</small>stdout α\nstderr β\nstdout γ\nstdout δ<small>client capture: ${s.disposed?'disposed':'caller-owned'} · server acknowledgement: ${s.acked?'settled':'pending'}${s.cleanupError?' · spool cleanup diagnostic':''}</small></div>`:''}${s.stopped?'<div class="boundary-bar">Delivery terminated. No local replay. Undo rewinds the game model.</div>':''}`;
  }

  const boards={owners:ownersBoard,cache:cacheBoard,gates:gatesBoard,worker:workerBoard,transfer:transferBoard};
  function renderStation() {
    const focused=document.activeElement?.id;
    const def=M.stations.find(s=>s.id===current),s=states[current],message=messages[current];
    $('station-tabs').innerHTML=M.stations.map(t=>`<button type="button" role="tab" id="station-${t.id}" data-station="${t.id}" aria-controls="station-panel" aria-selected="${t.id===current}" tabindex="${t.id===current?0:-1}"><span>${t.n} ${states[t.id].done?'· demonstrated':''}</span>${esc(t.name)}</button>`).join('');
    panels.setAttribute('aria-labelledby','station-'+current);
    panels.innerHTML=`<div class="station-top"><div><h3>${def.n} / ${esc(def.verb)}</h3><p>${esc(def.goal)}</p></div><div class="station-controls"><button type="button" id="undo" data-undo ${histories[current].length?'':'disabled'}>Undo</button><button type="button" id="restart" data-restart>Restart station</button><button type="button" id="walkthrough" data-walkthrough ${s.done?'disabled':''}>Show next move →</button></div></div><p class="exercise-note">Illustrative, reversible tabletop model of the selected contracts. The buttons advance toy events; they never invoke symnav. Undo rewinds only this page.</p><div class="game-layout"><div><div class="game-board">${boards[current](s)}</div><div id="feedback" class="feedback ${esc(message.tone)}" role="status" aria-live="polite" aria-atomic="true"><span>${message.tone==='blocked'?'The move stops here':message.tone==='complete'?'Mechanism demonstrated':'What moved'}</span>${esc(message.message)}</div>${s.done?`<div class="completion-banner">${esc(def.name)} is demonstrated. <a href="#station-${M.stations[(M.stations.indexOf(def)+1)%M.stations.length].id}">Enter another station ↗</a></div>`:''}<ol class="event-log" aria-label="Recent model events">${events[current].slice(-4).map(e=>`<li>${esc(e)}</li>`).join('')}</ol></div><aside class="console"><div class="console-panel"><h4>What you are manipulating</h4><p>${current==='owners'?'Responsibility tiles. A move changes their owner; routing reports the first ownership seam that differs from the tip.':current==='cache'?'One revisioned index and one semantic-query service. Project-graph publication is separate; no global transaction is implied.':current==='gates'?'Ordered checks. All arrivals and expected outcomes are disclosed before play. A failed guard prevents later evaluation.':current==='worker'?'A FIFO queue, two immutable accepted identities, one current worker generation, and explicit delivery/sample barriers.':'Toy output records. A record moves from missing → append pending → durable. Socket, receiver, capture and request lifetimes differ.'}</p><a href="#contract-${current}" class="quiet-link">Read this complete contract ↑</a></div><div class="console-panel"><h4>Open evidence</h4><p>Each link returns to a choice already in the briefing, with its stated reason and pinned source.</p><div class="refs">${def.refs.map(r=>ref(r)).join('')}</div><a href="#group-${def.group}" class="quiet-link" style="display:block;margin-top:17px">All decisions in this family ↓</a></div><div class="console-panel"><h4>No hidden solution</h4><p>“Show next move” makes one illustrative move. It does not unlock rules. You can return to any station with its current position intact until reload.</p><a href="#atlas" class="quiet-link">Full decision briefing ↓</a></div></aside></div>`;
    if(focused){const restore=$(focused);if(restore&&!restore.disabled)restore.focus({preventScroll:true});}
  }

  function perform(action,value) {
    const outcome=M.transition(current,states[current],action,value);
    if(outcome.changed){histories[current].push(states[current]);states[current]=outcome.state;events[current].push(outcome.message);}
    messages[current]=outcome;
    renderStation();
  }
  function restart(mode) {
    histories[current]=[];events[current]=[];states[current]=M.initial(current,mode||(current==='transfer'?states[current].mode:undefined));
    messages[current]={message:'Fresh position. Every rule is still open.',tone:'event'};selectedPiece=null;selectedGuard=null;renderStation();
  }

  function openEvidence(id) {
    const d=allDecisions.find(d=>d.id===id);if(!d)return;
    const n=d.pr||id,ev=B.evidence[String(n)];
    const pr=d.pr?B.prs.find(p=>p.number===d.pr):null;
    const i=allDecisions.indexOf(d);
    $('dialog-content').innerHTML=`<div class="dialog-heading"><div><p class="eyebrow">Higher fidelity / decision ${esc(id)}</p><h2 id="evidence-title">${esc(d.title)}</h2></div><button type="button" data-close-dialog>Close / Esc</button></div><div class="dialog-body"><span class="status ${d.status}">${d.status}</span><p class="choice" style="margin-top:15px"><b>${text(d.chosen||d.choice)}</b>${d.alternative?`<span class="alternative">${text(d.alternative)}</span>`:''}</p><blockquote>${text(d.reason)}</blockquote>${pr?.stage?`<div class="stage-note">${text(pr.stage)}</div>`:''}<p class="small">${pr?'Reason above is from the supplied PR body. This related source excerpt is from the final tip; historical temporary surfaces may differ.':'Reason and inspected change are already visible in the root briefing. The local snapshot shows the relevant before/after observation surface.'}</p>${ev?.excerpt?`<p><code>${esc(ev.path)}:${ev.start}</code></p><pre class="source-code">${ev.excerpt.split('\n').map((line,i)=>`<span><i>${ev.start+i}</i>${esc(line)}</span>`).join('')}</pre>`:''}<div class="dialog-links"><a href="evidence/${esc(n)}.html" target="_blank" rel="noopener">Full pinned source + main snapshot${pr?' + PR body':''} ↗</a><a href="#decision-${esc(id)}" data-return-decision="${esc(id)}">Return to this root decision ↑</a></div><div class="dialog-footer"><button type="button" data-ref="${allDecisions[(i-1+allDecisions.length)%allDecisions.length].id}">← Previous decision</button><button type="button" data-ref="${allDecisions[(i+1)%allDecisions.length].id}">Next decision →</button></div></div>`;
    const dialog=$('evidence-dialog');if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
  }

  document.addEventListener('click',event=>{
    const target=event.target.closest('button,a');if(!target)return;
    if(target.dataset.ref){openEvidence(target.dataset.ref);return;}
    if(target.hasAttribute('data-close-dialog')){$('evidence-dialog').close();return;}
    if(target.dataset.returnDecision){$('evidence-dialog').close();return;}
    if(target.dataset.map){diagram=target.dataset.map;renderReference();return;}
    if(target.dataset.station){selectStation(target.dataset.station,true);return;}
    if(target.hasAttribute('data-transfer-mode')){restart(target.dataset.transferMode);return;}
    if(target.dataset.piece){selectedPiece=selectedPiece===target.dataset.piece?null:target.dataset.piece;renderStation();return;}
    if(target.dataset.place){if(selectedPiece){const p=selectedPiece;selectedPiece=null;perform('place',p+':'+target.dataset.place);}return;}
    if(target.hasAttribute('data-guard')){const i=Number(target.dataset.guard);if(selectedGuard===null){selectedGuard=i;renderStation();}else{const from=selectedGuard;selectedGuard=null;perform('swap',from+':'+i);}return;}
    if(target.dataset.action){let value=target.dataset.value;if(target.dataset.action==='fetch')value=$('fetch-offset').value;if(target.dataset.action==='lane')selectedGuard=null;perform(target.dataset.action,value);return;}
    if(target.hasAttribute('data-restart')){restart();return;}
    if(target.hasAttribute('data-undo')){const old=histories[current].pop();if(old){states[current]=old;events[current].pop();messages[current]={message:'One game move rewound. This is model history, not daemon recovery.',tone:'event'};renderStation();}return;}
    if(target.hasAttribute('data-walkthrough')){const next=M.nextMove(current,states[current]);if(next){selectedPiece=null;selectedGuard=null;perform(...next);}return;}
  });
  $('station-tabs').addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const index=M.stations.findIndex(s=>s.id===current);
    const next=event.key==='Home'?0:event.key==='End'?M.stations.length-1:(index+(event.key==='ArrowRight'?1:-1)+M.stations.length)%M.stations.length;
    selectStation(M.stations[next].id,true);
  });
  function selectStation(id,updateHistory=false) {
    if(!M.stations.some(s=>s.id===id))return;
    current=id;selectedPiece=null;selectedGuard=null;renderStation();
    if(updateHistory&&location.hash!=='#station-'+id)history.pushState(null,'','#station-'+id);
    $('play').scrollIntoView();$('station-'+id).focus({preventScroll:true});
  }
  function navigate() {
    const hash=location.hash.slice(1);
    if(hash.startsWith('station-')){
      const id=hash.slice(8);selectStation(id);
    }
  }
  window.addEventListener('hashchange',navigate);
  renderReference();renderBriefing();renderStation();navigate();
})();
