/* All interactions are explanatory. State lives only in this page's memory. */
(() => {
  'use strict';
  const E = window.REVIEW_EVIDENCE;
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const outline = [
    {id:'shipping', title:'The shipped path stays wired', decisions:[
      ['Stage a complete package client and entries; defer the active CLI switch.', 'Stated', 'Separate mechanism ownership from host invocation review.'],
      ['Freeze 38 CLI mechanism files after preparation: 26 unchanged, 12 edited or renamed. Normalize CRLF for the digest.', 'Stated', 'Lock the compatibility graph; make the hash portable across checkout line endings.']
    ]},
    {id:'product', title:'Product logic stays with the host', decisions:[
      ['Keep core, backend, renderer, telemetry, commands, and the CLI executor unchanged. The host still supplies syntax, environment, executor, and readiness probe.', 'Stated', 'Preserve behavior; the daemon transports executor bytes without knowing the product.'],
      ['Keep public declarations free of Node ambient types; load the Node-backed runtime dynamically.', 'Stated', 'Host declarations must not acquire Node ambient dependencies.']
    ]},
    {id:'protocol', title:'The protocol and policy travel intact', decisions:[
      ['Carry transport, accepted execution, delivery, and worker mechanisms into ownership directories. Keep protocol/schema versions, policy defaults, and command/admission/failure contracts.', 'Stated', 'Give mechanisms one package home under the unchanged-behavior contract.'],
      ['Expose root + process/worker entries, keep mechanisms private, retire the temporary policy-testing export, and add no product tuning surface.', 'Stated', 'Enforce the package boundary and existing policy ownership.']
    ]},
    {id:'idle', title:'Completion still does not buy more time', decisions:[
      ['Route timing through one clock owner, preserving wall and monotonic sources and the 30-minute idle default.', 'Stated', 'The daemon owns its clocks.'],
      ['Keep the constructor/acceptance deadline; neither readiness nor completion re-arms it. Record both changes for later.', 'Stated', 'Those are behavior changes, explicitly deferred during extraction.']
    ]},
    {id:'ownership', title:'Ownership checks become one authority', decisions:[
      ['Centralize startup ownership equality and narrow its coordinate inputs. Keep file-lease election and authentication-before-state observation; characterize inert callback composition.', 'Stated', 'The architecture asks for one owner of lock checks and preservation of existing request behavior.'],
      ['Rename WorkspaceDaemon to DaemonProcessCoordinator; validate and adopt coordinates before component access; use explicit clock and workspace-existence callbacks.', 'Unexplained', 'The choices are specified, but no separate comparative rationale was found for the constructor shape and name.']
    ]},
    {id:'routing', title:'An early decision stops later effects', decisions:[
      ['Order lazy routing: present → not starting → compatible → responsive. Memoize reads; disabled runs stay local. Trigger startup only for absent or fallback routes, independently of local work.', 'Stated', 'The first routing decision must prevent every later routing side effect.'],
      ['Compose execute/start/status/stop inside the client. Preserve separate status timeout, action-specific reports, disabled start, and lifecycle errors to the host.', 'Stated', 'Own lifecycle composition while preserving the existing behavior and report contract.']
    ]},
    {id:'output', title:'Uncertainty does not authorize a replay', decisions:[
      ['Own warm capture, disposal, missing/malformed output, and controlled failures in the client. Give the completion spool a local codec instead of the CLI output helper.', 'Stated', 'Transfer cleanup and replay safety belong to the daemon; the package must not depend on CLI internals.'],
      ['Permit local fallback only when transport explicitly marks the failure retry-safe. Accepted or ambiguous execution stays warm, including capacity failures.', 'Stated', 'Retain the existing execution and failure vocabulary.']
    ]},
    {id:'tests', title:'Test evidence changes its boundary too', decisions:[
      ['Move 37 mechanism tests; use generic executors and built entries, with platform-specific cleanup assertions. Add facade, routing, dependency, and freeze checks. Keep e2e expectations and shared fixtures.', 'Stated', 'Move evidence with mechanism ownership; retain the behavioral baseline.'],
      ['Delete CLI entry tests; replace the CLI worker readiness/version path, restore version rejection at the executor factory, and remove duration assertions.', 'Unexplained', 'No one-to-one rationale for the narrower path or every removed assertion was found.'],
      ['Localize policy test helpers, remove two corresponding lint tests and their restriction, add tsx test tooling, and serialize package test files.', 'Unexplained', 'The export retirement is visible; the specific lint deletion and runner tradeoff are not explained.']
    ]}
  ];
  $('#outline').innerHTML = outline.map((c,i) => `<article class="outline-card"><a href="#${c.id}"><span>${String(i+1).padStart(2,'0')}</span>${c.title} ↘</a>${c.decisions.map(([choice,status,why]) => `<div class="decision">${escape(choice)}<span class="reason ${status==='Unexplained'?'unknown':''}"><b>${status}</b> · ${escape(why)}</span></div>`).join('')}</article>`).join('');
  $('#areas').innerHTML = E.areas.slice(0,5).map(a => `<div class="area"><strong>${a.count}</strong><span>${escape(a.title)}<br>all files unchanged</span><code>${escape(a.prefix)}</code></div>`).join('');
  $('#freeze-count').textContent = `${E.frozen.count} production files`;
  $('#freeze-grid').innerHTML = E.frozen.files.map((f,i)=>`<button type="button" class="freeze-tile ${f.status==='unchanged'?'':'changed'}" data-frozen="${i}" aria-label="${escape(f.path)}: ${escape(f.status)}" title="${escape(f.path)} — ${escape(f.status)}">${String(i+1).padStart(2,'0')}</button>`).join('');
  $('#copy-table').innerHTML = `<table><thead><tr><th>Base CLI file → head package file</th><th>Body comparison</th></tr></thead><tbody>${E.copiedBodies.map(p=>`<tr><td><code>${escape(p.basePath)}</code><br>↓<br><code>${escape(p.headPath)}</code></td><td>${p.equalAfterImportAndWhitespaceNormalization?'Matches after the stated normalization':'Differs: a local spool codec replaces the CLI output dependency. <button data-source="spool-codec">Inspect codec ↗</button>'}</td></tr>`).join('')}</tbody></table>`;

  document.querySelectorAll('[data-snapshot]').forEach(button => button.addEventListener('click', () => {
    const head = button.dataset.snapshot === 'head';
    $('#boundary-map').dataset.snapshot = head ? 'head' : 'base';
    document.querySelectorAll('[data-snapshot]').forEach(b=>b.setAttribute('aria-pressed', String(b===button)));
    $('#package-after').hidden = !head;
    $('#package-before').hidden = head;
    $('#package-label').textContent = head ? 'ADDED COMPOSITION' : 'BEFORE PR 148';
    $('#active-caption').textContent = head ? '38 mechanism copies are frozen here after preparation. The dispatcher remains byte-identical.' : 'CLI-local mechanisms serve the production path. The compatibility freeze has not been added yet.';
    $('#staged-caption').textContent = head ? 'The package can compose its own process and worker. Production consumers have not switched.' : 'The package already owns contracts and policy. Mechanism composition still belongs to the CLI.';
  }));

  const dialog = $('#source-dialog');
  function showSource(title, context, text, url) {
    $('#source-title').textContent = title;
    $('#source-context').textContent = context;
    $('#source-code').textContent = text;
    $('#source-code').scrollTop = 0;
    $('#source-link').hidden = !url;
    if(url) $('#source-link').href = url;
    if(!dialog.open) dialog.showModal();
  }
  function openSource(key) {
    if(E.snippets[key]) {
      const s = E.snippets[key];
      showSource(s.path, `${s.revision===E.base?'Base':'PR 148 head'} ${s.revision.slice(0,12)} · lines ${s.start}–${s.end}`, s.text.split('\n').map((line,i)=>`${String(i+s.start).padStart(4)}  ${line}`).join('\n'), s.url);
      return;
    }
    const inventory = E.frozen.files.map((f,i)=>`${String(i+1).padStart(2,'0')}  ${f.status.toUpperCase()}\n    ${f.path}${f.basePath!==f.path?'\n    base: '+f.basePath:''}`).join('\n\n');
    const special = {
      pr: ['PR 148 — body and recorded decisions', 'Supplied input bundle: inputs/pr-148/pr.json · rationale is attributed to this body, not inferred from test success.', E.prBody, 'https://github.com/mohasarc/symnav/pull/148'],
      inventory: ['38 frozen CLI mechanism files', 'The expected digest was reproduced from head Git objects using the test’s LF normalization. A freeze is a source snapshot, not a runtime comparison.', `SHA-256 ${E.frozen.digest}\n\n26 source files equal the base at the same path.\n12 were edited or renamed during this PR.\n\n${inventory}`, null],
      areas: ['Unchanged product and testing areas', 'For each directory: every head path has the same Git blob as base, and no base path was removed. Counts include every tracked file, not only production TypeScript.', E.areas.map(a=>`${a.title} · ${a.count} files\n${a.paths.join('\n')}`).join('\n\n'), null],
      'test-moves': ['37 relocated mechanism test files', 'Git rename detection at the two pinned commits. Rename similarity describes text; it does not establish equivalent assertions.', E.movedTests.map(t=>`${t.similarity}\n${t.before}\n→ ${t.after}`).join('\n\n'), null],
      e2e: ['End-to-end source comparison', 'Computed from the pinned base and head Git objects. No symnav test suite was run for this artifact.', `133 e2e files\n129 byte-identical files\n93 byte-identical snapshot files (included in the 129)\n\nFour files differ only after replacing workspace-daemon- with daemon-process-coordinator- in helper paths, plus whitespace and trailing-comma formatting:\n\n${E.e2e.helperPathOnly.join('\n')}\n\nAll 295 files in packages/testing also match.\n\nThe audit asserts path inventory and blob equality for preserved areas.`, null],
      method: ['What the audit establishes', `Base ${E.base}\nHead ${E.head}`, `${E.method}\n\nThe report is reproducible with:\npython3 experiments/18-negative-space/audit.py\n\nSnapshot sources are read with git show / git ls-tree / git diff. Only this experiment’s evidence.json and evidence.js are written.\n\n153 changed paths with rename detection:\n72 added · 35 modified · 45 renamed · 1 deleted\n\nRationale search scope: supplied PR body and commit messages, architecture spec, follow-up spec, changed source and tests. No external transcript was supplied or searched. Tests may specify a choice without explaining why it was preferred.`, null]
    };
    if(!special[key]) throw new Error(`Unresolved source key: ${key}`);
    showSource(...special[key]);
  }
  document.addEventListener('click', event => {
    const source = event.target.closest('[data-source]');
    if(source) openSource(source.dataset.source);
    const tile = event.target.closest('[data-frozen]');
    if(tile) {
      const f = E.frozen.files[Number(tile.dataset.frozen)];
      showSource(f.path, `${f.status} · base ${E.base.slice(0,7)} → head ${E.head.slice(0,7)}`, f.diff || `Byte-identical at the same path.\n\nBase blob: ${f.baseBlob}\nHead blob: ${f.headBlob}\n\nThis file is also part of the 38-file head compatibility digest.`, `https://github.com/mohasarc/symnav/blob/${E.head}/${f.path}`);
    }
  });
  $('#close-source').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    const r = dialog.getBoundingClientRect();
    if(event.target===dialog && (event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)) dialog.close();
  });

  function renderIdle() {
    const duration = $('#idle-scenario').value === 'short' ? 5 : 40;
    const today = Math.max(duration,30);
    const deferred = duration+30;
    const remaining = Math.max(30-duration,0);
    const events = [
      {at:0,label:'Navigation accepted'},
      {at:30,label:'Acceptance deadline'},
      {at:duration,label:'Navigation completes'},
      {at:today,label:'Base + PR 148: idle can trigger'},
      {at:deferred,label:'Deferred: completion + 30 min',later:true}
    ].sort((a,b)=>a.at-b.at);
    const x = value => 165 + value * 8;
    const minute = value => `${value} min`;
    $('#idle-chart').innerHTML = `<svg viewBox="0 0 780 223" role="img" aria-label="A ${duration}-minute navigation turn. PR 148 idle shutdown can trigger at minute ${today}; a deferred completion reset would move it to minute ${deferred}.">
      <line x1="165" y1="35" x2="725" y2="35" stroke="#c7cdc4"/>
      ${[0,10,20,30,40,50,60,70].map(t=>`<line x1="${x(t)}" y1="30" x2="${x(t)}" y2="40" stroke="#c7cdc4"/><text x="${x(t)}" y="21" text-anchor="middle" font-family="monospace" font-size="10" fill="#65716b">${t}</text>`).join('')}
      <text x="20" y="22" font-family="monospace" font-size="10" fill="#65716b">MINUTES</text>
      <text x="20" y="73" font-family="sans-serif" font-size="12" fill="#202b28">Navigation</text>
      <rect x="165" y="55" width="${duration*8}" height="25" fill="#dce8df" stroke="#759982"/>
      <text x="${x(duration)+8}" y="72" font-family="sans-serif" font-size="11" fill="#202b28">complete</text>
      <text x="20" y="119" font-family="sans-serif" font-size="12" fill="#202b28">Base + PR 148</text>
      <line x1="165" y1="113" x2="${x(30)}" y2="113" stroke="#202b28" stroke-width="4"/>
      <line x1="${x(30)}" y1="92" x2="${x(30)}" y2="130" stroke="#aa4d29" stroke-dasharray="3 3"/>
      <text x="${x(30)}" y="146" text-anchor="middle" font-family="monospace" font-size="10" fill="#aa4d29">acceptance deadline</text>
      <circle cx="${x(today)}" cy="113" r="5" fill="#aa4d29"/>
      <text x="${x(today)+10}" y="108" font-family="sans-serif" font-size="10" fill="#873f24">idle trigger · ${minute(today)}</text>
      <text x="20" y="187" font-family="sans-serif" font-size="12" fill="#65716b">Deferred reset</text>
      <line x1="${x(duration)}" y1="181" x2="${x(deferred)}" y2="181" stroke="#aa4d29" stroke-width="3" stroke-dasharray="5 4"/>
      <circle cx="${x(deferred)}" cy="181" r="5" fill="#fffefa" stroke="#aa4d29"/>
      <text x="${x(deferred)}" y="211" text-anchor="middle" font-family="monospace" font-size="10" fill="#873f24">completion + 30 min</text>
    </svg><div class="mobile-timeline">${events.map(e=>`<div class="${e.later?'later':''}"><span>${e.at} min</span><b>${e.label}</b></div>`).join('')}</div>`;
    $('#idle-consequence').innerHTML = `<strong>${remaining} min left</strong><span>${duration===40?'The deadline expires during the turn. The turn may finish; queue-idle can trigger shutdown immediately afterward.':'Five minutes of the acceptance-based interval were spent doing work. Completion leaves 25 minutes, rather than starting a fresh 30.'}</span>`;
  }
  $('#idle-scenario').addEventListener('change', renderIdle);
  renderIdle();

  const routes = {
    disabled:{stop:0,result:'cold',states:['disabled'],detail:'Execute through the host factory locally. No record read, observation, removal, or startup trigger in execute(). This describes execution routing, not absence of runtime object construction.'},
    absent:{stop:1,result:'cold',states:['enabled','absent'],detail:'No record exists. Trigger startup independently and execute locally; the local result does not wait for warm-up.'},
    starting:{stop:2,result:'cold',states:['enabled','present','starting'],detail:'The starting record decides the route. Its wrong version is not examined; no liveness observation or additional startup trigger follows.'},
    version:{stop:3,result:'fallback',states:['enabled','present','not starting','incompatible'],detail:'A ready record has the wrong version. Do not observe it. Trigger startup independently and execute locally in fallback mode.'},
    responsive:{stop:4,result:'warm',states:['enabled','present','not starting','compatible','responsive'],detail:'Execute through the warm transport. No local executor is created for a completed warm route.'},
    dead:{stop:4,result:'fallback',states:['enabled','present','not starting','compatible','exited'],detail:'Attempt compare-removal using instance and process token, then trigger startup independently and execute locally in fallback mode.'},
    recovering:{stop:4,result:'cold',states:['enabled','present','not starting','compatible','observation throws'],detail:'Treat the observation failure as recovery. Execute locally without removing the record or triggering another startup.'}
  };
  function renderRoute() {
    const r = routes[$('#route-scenario').value];
    const labels = ['Enabled?','Record present?','Not starting?','Version compatible?','Responsive?'];
    $('#guard-track').innerHTML = labels.map((label,i)=>`<div class="guard ${i<r.stop?'passed':i===r.stop?'stop':'skipped'}"><small>${i===0?'PRE':String(i).padStart(2,'0')}</small><strong>${label}</strong><span>${i>r.stop?'skipped':escape(r.states[i])}${i===r.stop?' · stop':''}</span></div>`).join('');
    $('#route-outcome').innerHTML = `<strong>${r.result}</strong><p>${escape(r.detail)}</p>`;
  }
  $('#route-scenario').addEventListener('change', renderRoute);
  renderRoute();

  const observer = new IntersectionObserver(entries=>{
    for(const entry of entries) if(entry.isIntersecting) {
      document.querySelectorAll('.rail a').forEach(a=>{
        const current = a.getAttribute('href') === `#${entry.target.id}`;
        a.classList.toggle('current',current);
        if(current) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
      });
    }
  }, {rootMargin:'-5% 0px -72% 0px'});
  document.querySelectorAll('main>section').forEach(s=>observer.observe(s));
})();
