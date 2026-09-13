(() => {
  'use strict';
  const E = window.EVIDENCE;
  const C = window.CONTENT;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const inline = (text) => esc(text).replace(/`([^`]+)`/g, '<code>$1</code>');
  const sourceButton = (path, line=1, side='after', label) => `<button class="source-link" data-source="${esc(path)}" data-line="${line}" data-side="${side}">${esc(label || path.split('/').at(-1))} ↗</button>`;
  const reasonBadge = (status) => `<span class="reason ${status}">${status}</span>`;
  const prByNumber = new Map(E.prs.map(pr => [pr.number,pr]));
  const fileByPath = new Map();
  E.files.forEach(file => [file.beforePath,file.afterPath].filter(Boolean).forEach(path => fileByPath.set(path,file)));
  const appendSources = (sources) => sources.map(value => Array.isArray(value) ? sourceButton(...value) : sourceButton(value)).join(' ');

  $('#small-shas').textContent = `${E.base.slice(0,7)} → ${E.head.slice(0,7)}`;
  $('#decision-count').textContent = `${E.decisionCount} recorded PR decisions`;
  $('#choice-sheet').innerHTML = C.groups.map(group => `<div class="choice-group" id="choices-${group.id}">
    <h3>${esc(group.title)}</h3><p>${esc(group.description)}</p>
    ${group.prs.map(number => {
      const pr=prByNumber.get(number), info=C.prInfo[number];
      return `<article class="pr-group" id="pr-${number}"><div class="pr-heading"><a class="pr-number" href="#pr-${number}">#${number}</a><h4>${esc(info.plain)}</h4></div><p class="pr-intro">${esc(info.intro)}</p>
        ${info.historical ? `<p class="historical">${esc(info.historical)}</p>` : ''}
        ${pr.decisions.map(d => `<details class="decision" id="${d.id}"><summary><span class="choice-text">${inline(d.choice)}</span>${reasonBadge(d.status)}</summary><div class="decision-body"><span class="rationale-label">Reason recorded in PR #${number}</span><p>${inline(d.reason ? d.reason.charAt(0).toUpperCase()+d.reason.slice(1) : 'No reason in this decision entry.')}</p><button class="source-link" data-pr="${number}">Read the original PR and commits ↗</button><a class="source-link" href="#choices-${group.id}">Return to this branch ↑</a></div></details>`).join('')}
        <div class="pr-sources">${appendSources(info.sources)}<button class="source-link" data-pr="${number}">Original #${number} ↗</button></div></article>`;
    }).join('')}
  </div>`).join('');
  $('#extra-choices').innerHTML = C.extra.map(d => `<details class="decision extra-decision" id="extra-${d.id}"><summary><span class="choice-text">${esc(d.title)}</span>${reasonBadge(d.status)}</summary><div class="decision-body"><span class="rationale-label">${d.status==='stated'?'Recorded reason':'Reason search'}</span><p>${esc(d.reason)}</p><p>${esc(d.detail)}</p>${appendSources(d.sources)}<a class="source-link" href="#choices-edges">Return to these choices ↑</a></div></details>`).join('');
  $('#policy-rows').innerHTML = E.policy.map(p=>`<tr><td><code>${esc(p.path)}</code></td><td>${inline(p.value)}</td><td>${inline(p.applies)}</td><td class="policy-reason">${reasonBadge('stated')}${inline(p.reason)}</td></tr>`).join('');
  $('#policy-absences').innerHTML = `<h4>Intentional absences</h4><div class="no-deadlines">${C.noDeadlines.map(([name,value,reason])=>`<div><strong>${esc(name)}: ${esc(value)}</strong><small>${esc(reason)}</small>${reasonBadge('stated')}</div>`).join('')}</div>`;

  const dialog = $('#source-dialog');
  let currentFile;
  let currentSide='after';
  let currentLine=1;
  let evidenceOpener;
  function openDialog(){
    evidenceOpener=document.activeElement;
    if(!dialog.open) dialog.showModal();
  }
  function renderFile(){
    const f=currentFile, side=currentSide;
    const path=side==='before'?f.beforePath:f.afterPath || f.beforePath;
    const revision=side==='before'?(f.beforeRevision || E.base):(f.afterRevision || E.head);
    $('#source-title').textContent=f.label || path || (side==='before'?f.afterPath:f.beforePath);
    $('#source-context').textContent=f.status==='stage'?'INTERMEDIATE STACK EVIDENCE · NOT FINAL RUNTIME':'FROZEN EVIDENCE · MAIN → #149';
    const beforeLabel=f.status==='stage'?'Before commit':'Before · main';
    const afterLabel=f.status==='stage'?'After commit':'After · #149';
    const gitPath=f.status==='stage'?'meta-tests/src/daemon-compatibility-copy.test.ts':(path || f.afterPath || f.beforePath);
    $('#source-switches').innerHTML = `<button data-evidence-side="before" aria-pressed="${side==='before'}">${beforeLabel}</button><button data-evidence-side="after" aria-pressed="${side==='after'}">${afterLabel}</button><button data-evidence-side="diff" aria-pressed="${side==='diff'}">Change</button><a href="https://github.com/mohasarc/symnav/blob/${revision}/${gitPath.split('/').map(encodeURIComponent).join('/')}#L${currentLine}" target="_blank" rel="noreferrer">Same revision on GitHub ↗</a>`;
    $('#source-description').textContent = side==='diff' ? (f.status==='context'?'Unchanged context file; no combined delta.':f.status==='stage'?`Commit ${f.afterRevision}`:`${E.base} → ${E.head} · rename detection enabled`) : `${revision} · ${path || 'This file does not exist on this side.'}`;
    const content=f[side];
    if(!content){
      $('#source-code').innerHTML=`<pre>${side==='diff'?'No delta for this context file.':`This file is ${side==='before'?'added by':'removed by'} the stack.`}</pre>`;
      return;
    }
    const codeLines=content.split('\n');
    $('#source-code').innerHTML=codeLines.map((line,i)=>{
      const klass=side==='diff'?(line.startsWith('+')?'diff-added':line.startsWith('-')?'diff-deleted':''):(i+1===currentLine?'highlighted':'');
      return `<div class="code-line ${klass}" data-code-line="${i+1}"><span class="line-number">${i+1}</span><span>${esc(line)||' '}</span></div>`;
    }).join('');
    requestAnimationFrame(()=>{
      const panel=$('#source-code');
      const target=panel.querySelector('.highlighted');
      panel.scrollTop=target ? Math.max(0,target.offsetTop-panel.offsetTop-65) : 0;
      panel.scrollLeft=0;
    });
  }
  function showSource(path,line=1,side='after'){
    currentFile=fileByPath.get(path);
    if(!currentFile){throw new Error(`Missing evidence source: ${path}`);}
    currentLine=Number(line)||1;
    currentSide=side;
    openDialog();renderFile();
  }
  function showPr(number){
    const pr=prByNumber.get(Number(number));
    if(!pr) throw new Error(`Unknown PR ${number}`);
    openDialog();
    currentFile=undefined;
    $('#source-context').textContent='ORIGINAL INPUT · AUTHOR RATIONALE, NOT INDEPENDENT VERIFICATION';
    $('#source-title').textContent=`#${pr.number} · ${pr.title}`;
    $('#source-description').textContent='Copied from inputs/stack/pr.json. Source paths inside the original body may describe intermediate stack states; the page’s source buttons use final-head destinations.';
    $('#source-switches').innerHTML=`<a href="https://github.com/mohasarc/symnav/pull/${pr.number}" target="_blank" rel="noreferrer">Original PR on GitHub ↗</a>`;
    const commits=pr.commits.map(c=>`${c.sha}\n${c.subject}\n${c.body || ''}`).join('\n\n');
    $('#source-code').innerHTML=`<pre>${esc(pr.body)}\n\nCOMMIT RECORD\n\n${esc(commits)}</pre>`;
    $('#source-code').scrollTop=0;
  }
  $('#close-source').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>evidenceOpener?.focus({preventScroll:true}));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  document.addEventListener('click',event=>{
    const source=event.target.closest('[data-source]');
    if(source){showSource(source.dataset.source,source.dataset.line,source.dataset.side||'after');return;}
    const pr=event.target.closest('[data-pr]');
    if(pr){showPr(pr.dataset.pr);return;}
    const side=event.target.closest('[data-evidence-side]');
    if(side){currentSide=side.dataset.evidenceSide;renderFile();return;}
  });

  let requestScenario='warm', requestStep=0;
  $('#request-scenarios').innerHTML=Object.entries(C.requests).map(([key,s])=>`<button data-scenario="${key}" aria-pressed="${key===requestScenario}">${esc(s.label)}</button>`).join('');
  function renderRequest(){
    const scenario=C.requests[requestScenario];
    const step=scenario.steps[requestStep];
    document.querySelectorAll('[data-scenario]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.scenario===requestScenario)));
    $('#scenario-premise').textContent=scenario.premise;
    $('#request-trace').innerHTML=scenario.steps.map((s,i)=>`<button class="trace-node ${i<requestStep?'past':''}" data-step="${i}" ${i===requestStep?'aria-current="step"':''}><span>${String(i+1).padStart(2,'0')} · ${esc(s[0])}</span><b>${esc(s[1])}</b></button>`).join('');
    $('#step-detail').innerHTML=`<p class="owner-label">${esc(step[0])}</p><h3>${esc(step[1])}</h3><p>${esc(step[2])}</p><p class="state-note">${esc(step[3])}</p>${sourceButton(step[4],step[5],'after','Open the implementing boundary')}`;
    $('#step-count').textContent=`${requestStep+1} / ${scenario.steps.length}`;
    $('#previous-step').disabled=requestStep===0;
    $('#next-step').disabled=requestStep===scenario.steps.length-1;
  }
  $('#request-scenarios').addEventListener('click',event=>{
    const button=event.target.closest('[data-scenario]');
    if(button){requestScenario=button.dataset.scenario;requestStep=0;renderRequest();}
  });
  $('#request-trace').addEventListener('click',event=>{
    const button=event.target.closest('[data-step]');
    if(button){requestStep=Number(button.dataset.step);renderRequest();$('#request-trace [aria-current=step]').focus({preventScroll:true});}
  });
  $('#previous-step').addEventListener('click',()=>{requestStep=Math.max(0,requestStep-1);renderRequest();});
  $('#next-step').addEventListener('click',()=>{requestStep=Math.min(C.requests[requestScenario].steps.length-1,requestStep+1);renderRequest();});
  $('#reset-trace').addEventListener('click',()=>{requestStep=0;renderRequest();});
  renderRequest();

  let stateScenario='full';
  $('#state-scenarios').innerHTML=Object.entries(C.states).map(([key,s])=>`<button data-state="${key}" aria-pressed="${key===stateScenario}">${esc(s.label)}</button>`).join('');
  function renderState(){
    const state=C.states[stateScenario];
    document.querySelectorAll('[data-state]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.state===stateScenario)));
    $('#state-model').innerHTML=`<h3>${esc(state.title)}</h3><p>${esc(state.description)}</p><div class="state-cells">${state.cells.map(([name,tokens,note])=>`<div class="state-cell"><b>${esc(name)}</b>${tokens.map(token=>`<span class="state-token ${token.startsWith('!')?'evicted':''}">${esc(token.replace(/^!/,''))}</span>`).join('')}<small>${esc(note)}</small></div>`).join('')}</div>${sourceButton(state.source,state.line,'after','Open this lifetime boundary')}`;
  }
  $('#state-scenarios').addEventListener('click',event=>{const button=event.target.closest('[data-state]');if(button){stateScenario=button.dataset.state;renderState();}});
  renderState();

  function renderTransfer(kind){
    document.querySelectorAll('[data-transfer]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.transfer===kind)));
    const isFetch=kind==='fetch';
    $('#transfer-model').innerHTML=`<div class="transfer-model"><div class="transfer-heading"><h3>${isFetch?'Same receiver. New socket.':'Same request. New capture.'}</h3><span class="budget">${isFetch?'Default: 1 fetch resume per execute attempt':'Default: 1 accepted reattachment'}</span></div><div class="transfer-lanes"><div><h4>Daemon process</h4><p>Ledger: accepted request <code>R</code><br>Spool: completed records for <code>R</code></p><div class="record-strip"><span>0</span><span>1</span><span>2</span><span>3</span></div><small>${isFetch?'Read the stored transfer from offset 2.':'The same request ID, command name, and payload match the ledger. Attach; do not enqueue a new turn.'}</small></div><div class="lane-arrow" aria-hidden="true">→</div><div><h4>Caller process</h4><p>${isFetch?'Keep receiver, manifest and captured records.<br>Create a new wire decoder for this connection.':'Dispose the interrupted capture.<br>Create a fresh receiver and output capture.'}</p><div class="record-strip">${isFetch?'<span>0</span><span>1</span><span class="waiting">2</span><span class="waiting">3</span>':'<span class="gone">old</span><span class="waiting">0</span><span class="waiting">1</span><span class="waiting">2</span><span class="waiting">3</span>'}</div><small>${isFetch?'Records 0 and 1 were appended. The first not-yet-appended record is 2.':'The reattached execute attempt has its own fetch-resume allowance.'}</small></div></div><p class="receipt-line">${isFetch?'await append(record 2) → nextOffset becomes 3':'matching duplicate R → original acceptance metadata → no second execution'}</p><p>${isFetch?'Receiving a frame is not enough to advance the offset. Finish requires the manifest’s record count, byte total, and digest to match captured output. The completed output is handed to the caller for disposal.':'Only the accepted-connection-close recovery path can use reattachment. Corrupt terminal output or exhausted fetch recovery does not authorize local execution. The client returns a controlled accepted-work failure if recovery cannot complete.'}</p>${sourceButton(isFetch?'packages/daemon/src/transport/result-transfer-receiver.ts':'packages/daemon/src/transport/execution-client.ts',isFetch?62:44,'after','Open the recovery implementation')}${sourceButton('packages/daemon/src/execution/accepted-execution-session.ts',44,'after','Open duplicate acceptance')}</div>`;
  }
  document.querySelectorAll('[data-transfer]').forEach(button=>button.addEventListener('click',()=>renderTransfer(button.dataset.transfer)));
  renderTransfer('fetch');

  $('#base-sha').textContent=E.base;
  $('#head-sha').textContent=E.head;
  $('#delta-stats').textContent=E.stats;
  $('#missing-count').textContent=E.missingTests.length;
  $('#missing-tests').innerHTML=E.missingTests.map(test=>`<div class="missing-test"><b>${esc(test.title)}</b>${test.paths.map(path=>sourceButton(path,1,'before',path)).join(' ')}</div>`).join('');
  function renderFiles(){
    const query=$('#file-search').value.toLowerCase().trim();
    const files=E.files.filter(file=>`${file.beforePath||''} ${file.afterPath||''} ${file.label||''}`.toLowerCase().includes(query));
    $('#file-count').textContent=`${files.length} of ${E.files.length} source pairs · includes unchanged context and one explicitly marked intermediate test snapshot`;
    $('#file-list').innerHTML=files.map(file=>{
      const label=file.label || (file.beforePath && file.afterPath && file.beforePath!==file.afterPath ? `${file.beforePath} → ${file.afterPath}` : file.afterPath || file.beforePath);
      return `<div class="file-row"><span class="file-status">${esc(file.status)}</span>${sourceButton(file.afterPath||file.beforePath,1,file.status==='context'?'after':'diff',label)}<span class="change-stat">+${file.added} / −${file.deleted}</span></div>`;
    }).join('') || '<p>No matching files.</p>';
  }
  $('#file-search').addEventListener('input',renderFiles);
  renderFiles();

  function exposeAnchor(){
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    if(!id)return;
    const target=document.getElementById(id);
    if(!target)return;
    let parent=target.parentElement;
    while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }
  window.addEventListener('hashchange',exposeAnchor);
  if(location.hash)exposeAnchor();
  const navLinks=[...document.querySelectorAll('.navigation nav a')];
  const navSections=navLinks.map(link=>document.querySelector(link.getAttribute('href')));
  let scrollQueued=false;
  function markSection(){
    let current=navSections[0];
    for(const section of navSections){if(section.getBoundingClientRect().top<180)current=section;}
    navLinks.forEach(link=>{const active=link.getAttribute('href')===`#${current.id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    scrollQueued=false;
  }
  window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(markSection);}},{passive:true});
  markSection();
  window.OUTSIDER_DEBUG = {
    sourceCount:E.files.length,
    decisionCount:E.decisionCount,
    validateSources:()=>{
      const missing=[];
      document.querySelectorAll('[data-source]').forEach(button=>{if(!fileByPath.has(button.dataset.source))missing.push(button.dataset.source);});
      for(const scenario of Object.values(C.requests))for(const step of scenario.steps)if(!fileByPath.has(step[4]))missing.push(step[4]);
      for(const state of Object.values(C.states))if(!fileByPath.has(state.source))missing.push(state.source);
      return [...new Set(missing)];
    }
  };
})();
