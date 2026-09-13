(() => {
  'use strict';
  const data = window.REVIEW;
  const decisions = data.decisions;
  const byId = new Map(decisions.map(d => [d.id, d]));
  const dialog = document.getElementById('detail');
  const scroll = document.getElementById('dialog-scroll');
  const content = document.getElementById('dialog-content');
  const search = document.getElementById('search');
  const unexplained = document.getElementById('unexplained-toggle');
  let activeId = null;
  let originHash = '';
  let originElement = null;
  let previousHash = '';
  let onlyUnexplained = false;
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = values => '#' + new URLSearchParams(Object.entries(values).filter(([,v]) => v !== undefined && v !== null)).toString();
  const choice = (id, text) => `<a href="${url({decision:id})}">${e(text || byId.get(id).title)} ↗</a>`;
  const box = (title, text, cls = '') => `<div class="box ${cls}"><b>${e(title)}</b><span>${e(text)}</span></div>`;
  const arrow = '<span class="arrow" aria-hidden="true">→</span>';
  const flow = boxes => `<div class="flow">${boxes.join(arrow)}</div>`;
  const note = text => `<p class="diagram-note">${e(text)}</p>`;
  const diagram = (title, markup, caption='Simplified mechanism sketch; see the source for full control flow.') => `<div class="diagram"><h4>${e(title)}</h4>${markup}${note(caption)}</div>`;
  const facts = d => `<dl class="fact-grid">${d.facts.map(([label,value])=>`<div><dt>${e(label)}</dt><dd>${e(value)}</dd></div>`).join('')}</dl>`;
  const pageHeading = (eyebrow, title, summary) => `<div class="detail-eyebrow">${e(eyebrow)}</div><h2 id="detail-title" tabindex="-1">${e(title)}</h2>${summary ? `<p class="detail-summary">${e(summary)}</p>` : ''}`;

  function sourceLink(r, label) {
    return `<a href="${url({decision:activeId,src:r.source,at:r.start,end:r.end})}">${e(label || 'Open full source')} ↗</a>`;
  }
  function lineMarkup(text, start=1, targetStart=0, targetEnd=0, diff=false, source=null) {
    return text.split('\n').map((line,index) => {
      const number = start + index;
      const cls = [number >= targetStart && number <= targetEnd ? 'target-line':'', diff ? line.startsWith('+') ? 'diff-add' : line.startsWith('-') ? 'diff-remove' : line.startsWith('@@') ? 'diff-hunk' : '' : ''].join(' ');
      const lineNo = source ? `<a class="line-no" aria-label="Link to line ${number}" href="${url({decision:activeId,src:source,at:number,end:number})}">${number}</a>` : `<span class="line-no">${number}</span>`;
      return `<div class="code-line ${cls}" data-line="${number}">${lineNo}<span class="line-text">${e(line) || ' '}</span></div>`;
    }).join('');
  }
  function excerpt(r) {
    const s = data.sources[r.source];
    return `<section class="excerpt"><header><span>${e(r.label || s.version.toUpperCase())} · ${e(s.path)}:${r.start}–${r.end}</span>${sourceLink(r, 'Full file')}</header><div class="code-lines" role="region" tabindex="0" aria-label="Source excerpt from ${e(s.path)}">${lineMarkup(r.excerpt,r.start)}</div></section>`;
  }
  function rationale(d) {
    const why = d.why;
    return `<div class="rationale"><div><span class="status ${d.status}">${d.status === 'stated' ? 'Stated':'Unexplained'}</span><span>${e(d.rationale)}</span></div>${why ? `<blockquote>${e(why.excerpt)}</blockquote>${sourceLink(why,why.label || 'Recorded reason')}` : `<p>Reason search: supplied PR body, all six commit messages, the inherited policy record, and the architecture functional spec. No implementation transcript was available. The diagram shows the effect; it supplies no author motive.</p>`}</div>`;
  }

  function draw(d) {
    switch(d.diagram) {
      case 'timeout': return diagram('Choose a composition; watch which field matters',
        `<div class="diagram-controls" role="group" aria-label="Timeout scenario"><button data-scenario="observer" aria-pressed="true">Observer test</button><button data-scenario="ordinary" aria-pressed="false">Execution-status test</button><button data-scenario="defaults" aria-pressed="false">Production values</button></div><div id="timeout-scenario"></div><div class="range-row"><label for="time-scrub">Time</label><input type="range" id="time-scrub" min="0" max="60" value="0" step="1"><output id="time-value" for="time-scrub">0 ms</output></div><div id="timeout-result" class="note-bar" aria-live="polite"></div>`,
        'Timing illustration of one silent socket until a response. No daemon is running; scheduling and socket activity are omitted. The production view is a hypothetical 150 ms response.');
      case 'acceptance': return diagram('The timer ends at the acceptance boundary',
        flow([box('Execute submission','policy.transport.executionAdmissionTimeoutMs · 5 s'),box('Accepted','publishAcceptance → socket.setTimeout(0)','highlight'),box('Completion / output ACK','No added deadline')]) +
        '<div class="boundary"><h4>Retained result</h4><span class="chip">Unacknowledged-result eviction stays deferred</span></div>');
      case 'retry': return diagram('The added test, one connection at a time',
        `<div class="chip-line"><span class="chip">reattachment limit = 1</span><span class="chip">resume / attempt = 1</span></div><div class="diagram-controls"><button id="trace-prev">← Step</button><button id="trace-next">Step →</button><button id="trace-reset">Reset</button></div><div class="trace-steps" id="trace-steps"></div><div class="note-bar" id="trace-count" aria-live="polite"></div>`,
        'Illustration of the checked-in test “gives the reattached execute attempt its own fetch resume”. Empty output; no daemon run. This test has one fetch overall.');
      case 'error': return diagram('The await moves outside the inner catch',
        `<div class="parallel"><div><div class="compare-label">Base</div>${flow([box('E₁: first completion closes','Inner try awaits executeOnce AND its completion'),box('E₂: reattached completion fails','Inner catch throws E₁','retired')])}</div><div><div class="compare-label">Head</div>${flow([box('E₁: first completion closes','Inner try gets receipt; stores new completion'),box('E₂: next iteration awaits it','At exhausted budget, throws E₂','highlight')])}</div></div><p class="diagram-note">If obtaining the reattached receipt itself fails, the current earlier error is still rethrown.</p>`,
        'Control-flow illustration with symbolic errors E₁ and E₂, read from source. It is not a runtime failure trace or a correctness verdict.');
      case 'output': return diagram('64 KiB follows the bytes across process and worker boundaries',
        flow([box('Worker thread','capture → worker response validation'),box('Daemon process','worker response validation → completion spool'),box('Client process','binary codec → capture / file decode')]) +
        `<div class="boundary"><h4>Supplied from the existing policy snapshot</h4><div class="chip-line"><span class="chip">output.maximumChunkRawBytes</span><span class="chip">required scalar at codec / protocol methods</span></div></div>`);
      case 'storage': return diagram('Three storage limits, three scopes',
        flow([box('Inline records','Up to 256 KiB before spill'),box('One completed result','256 MiB raw-byte capacity'),box('All retained daemon completions','512 MiB aggregate raw-byte capacity')]) +
        `<div class="boundary"><h4>Same output slice</h4><div class="chip-line"><span class="chip">CliProgramExecutor → capture</span><span class="chip">WorkspaceDaemon → spool store</span><span class="chip">Transport → client capture</span></div></div>`);
      case 'frames': return diagram('Frame capacity is not one universal number',
        `<div class="parallel"><div class="boundary"><h4>Ordinary JSON payload</h4>${box('8 MiB','transport.maximumJsonPayloadBytes')}</div><div class="boundary"><h4>Execution transfer payload</h4>${flow([box('Control allowance','256 KiB'),box('Raw chunk allowance','64 KiB')])}<p class="diagram-note">Binary ceiling = control + chunk; the chunk’s own raw bound is checked again.</p></div></div>`);
      case 'memory': return diagram('One resource record feeds reporting and enforcement',
        flow([box('Existing policy','1 GiB effective system memory'),box('resources slice','hard 512 · soft 409 · resume 358 MiB','highlight')]) +
        `<div class="owner-groups">${box('Resource supervisor','Read hard / soft / resume thresholds')}${box('Ready + resource reports','Report the same hardProcessRssBytes')}${box('Worker resource limits','256 MiB → maxOldGenerationSizeMb')}</div>`);
      case 'pressure': return diagram('Keep pressure states and the replacement circuit distinct',
        `<div class="chip-line"><span class="chip">RSS supervision: 250 ms</span><span class="chip">Worker heap sample: 25 ms</span></div>` +
        flow([box('RSS ≥ soft','Pause admission; shed once per hysteresis cycle'),box('RSS ≤ resume','Resume admission; reset shedding cycle')]) +
        flow([box('RSS ≥ hard','Request replacement'),box('First / second in 10 min','Replace worker'),box('Third in 10 min','Drain','highlight')]));
      case 'startup': return diagram('Coordination has a bound; healthy work does not',
        `<div class="parallel"><div class="boundary"><h4>Ownership / authorization</h4>${box('15 s coordination grace','Registry ownership · missing owner · process authorization')}<div class="chip-line" style="margin-top:12px"><span class="chip">heartbeat 100 ms</span><span class="chip">auth poll 10 ms</span></div></div><div class="boundary"><h4>Healthy warm-up</h4>${box('No project-size deadline','Observe readiness every 20 ms')}<div class="chip-line" style="margin-top:12px"><span class="chip">prior-instance termination: 5 min</span></div></div></div>`);
      case 'child': return diagram('Allocate retries outside ownership waiting',
        `<div class="diagram-controls" role="group" aria-label="Child retry limit"><button data-child-limit="0" aria-pressed="false">0 retries</button><button data-child-limit="1" aria-pressed="true">1 retry · default</button><button data-child-limit="2" aria-pressed="false">2 retries</button></div><div id="child-attempts"></div><p class="diagram-note">Only child exit or lost warm-up can consume another attempt; waiting for ownership does not replenish it.</p>`,
        'Attempt-allocation sketch. The zero- and two-retry settings are checked-in test inputs, not user tuning controls.');
      case 'stop': return diagram('Reserve forced termination inside the stop budget',
        `<div class="chip-line"><span class="chip">idle: 30 min</span><span class="chip">controller observation: 20 ms</span></div><div class="diagram-controls" role="group" aria-label="Stop budget illustration"><button data-stop-ms="5000" aria-pressed="true">5 s default</button><button data-stop-ms="200" aria-pressed="false">200 ms example</button></div><div id="stop-budget"></div>`,
        'Budget illustration of min(reserve maximum, floor(stop / 2)). The 200 ms value is a hypothetical test override; no daemon is running. Active navigation still delays idle shutdown.');
      case 'signals': return diagram('The terminator’s signal waits',
        flow([box('SIGTERM','Wait for exit, up to 500 ms'),box('If still alive: SIGKILL','Wait for exit, up to 500 ms'),box('Observe exit','20 ms polling')]) +
        `<p class="diagram-note">These process waits have their own fields. The controller separately manages its total stop budget.</p>`);
      case 'ack': return diagram('A short grace during drain',
        flow([box('Unacknowledged completion','Grace deadline = Date.now() + 250 ms'),box('Poll every 5 ms','While a completion remains and time is left'),box('Continue drain','ACK arrives or grace expires')]) +
        '<div class="chip-line"><span class="chip">Normal unacknowledged-result retention: no eviction deadline</span></div>');
      case 'logs': return diagram('Diagnostics has both memory and disk capacities',
        flow([box('Pending writes','1,024 events; overflow is recorded as diagnostics-dropped'),box('Active daemon.log','Rotate at 10 MiB'),box('History','4 backups plus active log')]) +
        '<div class="chip-line"><span class="chip">All three values: diagnostics slice</span><span class="chip">Storage remains injectable</span></div>');
      case 'traces': return diagram('Bound disconnected diagnostic traces in two ways',
        `<div class="boundary"><h4>Disconnected operation traces</h4><div class="parallel">${box('Age bound','Expire after 5 minutes')}${box('Count bound','1,024 by default; minimum 1. Expire oldest above capacity.')}</div></div><div class="boundary"><h4>Retained command output · separate state</h4><span class="chip">No result-retention deadline added</span></div>`);
      case 'adapters': return diagram('Compatibility stays on the test side',
        `<div class="boundary"><h4>apps/cli/test + local test adapters</h4>${flow([box('Legacy numeric test knobs','7 new helpers'),box('DaemonPolicyTestFactory','Merge overrides; validate complete snapshot','highlight')])}</div><div class="boundary"><h4>apps/cli/src runtime constructors</h4>${box('Required policy inputs','Clock, storage, worker and process injection stay separate')}</div>`);
      case 'fixtures': return diagram('The assertions remain; several stimuli change',
        `<table class="policy-table"><thead><tr><th>Fixture</th><th>Base</th><th>Head</th></tr></thead><tbody><tr><td>Capture spill threshold</td><td>1 byte</td><td>32 bytes</td></tr><tr><td>Spool disk-failure setup</td><td>inline 0; first record spills</td><td>positive inline; extra record crosses threshold</td></tr><tr><td>One request executor</td><td>one “xx” record</td><td>two “x” records</td></tr><tr><td>Workspace adapter</td><td>independent knobs</td><td>derive ordered capacities</td></tr></tbody></table><div class="chip-line" style="margin-top:15px"><span class="chip">0 &lt; chunk ≤ inline ≤ result ≤ aggregate</span></div>`,
        'Selected fixture changes. The validator explains why an invalid combination cannot be passed; it does not record why these exact replacements were chosen.');
      case 'transport-fixture': return diagram('An old fixture call now passes through a translation',
        flow([box('Test call','outputInlineBytes: 0'),box('New helper','max(default chunk, requested inline)','highlight'),box('Runtime policy','inlineRawBytes: 64 KiB')]) +
        `<div class="boundary"><h4>Additional setup in the helper</h4>${box('mkdirSync(outputDirectory, { recursive: true })','The helper creates the directory before constructing the transport.')}</div>`);
      case 'test-memory': return diagram('Two options enter; one configures the resource slice',
        `<div class="parallel">${box('memoryCapBytes','Accepted by the helper type, spread onward; not read by runtime','retired')}${box('resourcePolicy?.record / base policy','Used to construct policy.values.resources','highlight')}</div>` +
        flow([box('Validated resources slice','Passed to runtime WorkspaceDaemon'),box('Runtime consumers','Supervisor, worker limits, ready record')]),
        'Data-flow sketch read from the helper and runtime. No author reason was found for the retained inert option.');
      case 'removed-tests': return diagram('Deleted CLI cases beside existing package cases',
        `<div class="parallel"><div><div class="compare-label">Deleted CLI describe · 7 cases</div>${box('Five memory inputs','256 MiB · 512 MiB · 1 GiB · 16 GiB · 64 GiB','retired')}${box('Constraint + default assertions','Smaller constraint / literal 250 ms','retired')}</div><div><div class="compare-label">Package suite · already in base</div>${box('Five memory inputs','1 byte · 512 MiB · 1 GiB · 16 GiB · 64 GiB')}${box('Constraints + complete defaults','Additional constraint cases; 250 ms in expectedDefaults')}</div></div><p class="diagram-note">The exact 256 MiB derivation row is not repeated centrally. CLI sampling at 250 ms remains tested.</p>`,
        'Coverage comparison from checked-in sources. No assertion of equivalent coverage and no test execution result.');
      case 'consumer-tests': return diagram('Small supplied values expose the consumer seam',
        `<div class="owner-groups">${[['pressure','17 ms · 103/102/101 bytes'],['storage','Spool chunk capacity: 2 bytes'],['frames','JSON capacity: 32 bytes'],['logs','Queue capacity: 1'],['purpose','Timeouts: 10 / 1,000 ms'],['child-retries','Child retries: 0 / 2'],['budgets','2 executes · 1 fetch'],['small-fixtures','Chunk capacity: 1 byte']].map(([id,value])=>`<a href="${url({decision:id})}">${box(value,byId.get(id).title)}</a>`).join('')}</div>`,
        'An index of checked-in assertions. This experiment did not run Symnav’s test suites.');
      case 'guard': return diagram('An explicit vocabulary guards production source text',
        flow([box('CLI production .ts files','appProductionSources() excludes tests'),box('Retired strings','Constants · optional knobs · duplicate derivation'),box('not.toContain','Known spellings must be absent','highlight')]),
        'Source-guard sketch. A text scan does not establish that differently named or expressed bypasses are impossible.');
      default: return '';
    }
  }

  function decisionView(d, view) {
    const sourcesView = view === 'source';
    return pageHeading(`CHOICE ${String(d.number).padStart(2,'0')} / ${data.groups.find(g=>g[0]===d.group)[2]}`,d.title,d.summary) +
      `<nav class="view-tabs" aria-label="Explanation depth"><a class="${!sourcesView?'active':''}" ${!sourcesView?'aria-current="page"':''} href="${url({decision:d.id})}">Mechanism + reason</a><a class="${sourcesView?'active':''}" ${sourcesView?'aria-current="page"':''} href="${url({decision:d.id,view:'source'})}">Exact source · ${d.refs.length} excerpts</a></nav>` +
      (sourcesView ? `<p class="detail-summary">Verbatim excerpts at the pinned base and head. Line links open the embedded full file. Test assertions are not execution results.</p>${d.refs.map(excerpt).join('')}<section class="detail-section"><h3>Recorded reason</h3>${rationale(d)}</section>` :
        draw(d) + facts(d) + `<section class="detail-section"><h3>Mechanism in this choice</h3><p>${e(d.detail)}</p></section><section class="detail-section"><h3>Reason</h3>${rationale(d)}</section><section class="detail-section"><h3>Check the evidence</h3>${d.refs.slice(0,2).map(excerpt).join('')}<a href="${url({decision:d.id,view:'source'})}">Open all ${d.refs.length} source excerpts ↗</a></section>`);
  }

  function ownerMap(after=true) {
    return pageHeading('BOUNDARY LENS / SAME CHOICES','Policy ownership moves into the inputs','The package snapshot and its serialized process/worker bridges predate this PR. Operational mechanisms remain in apps/cli. Select a box to return to its evidence.') +
      `<div class="diagram-controls" role="group" aria-label="Owner map revision"><button data-map="base" aria-pressed="${!after}">Base · local inputs</button><button data-map="head" aria-pressed="${after}">Head · required slices</button></div>` +
      `<div class="diagram"><div class="boundary"><h4>packages/daemon · policy ownership</h4>${box('DaemonPolicy · immutable complete snapshot','transport · startup · shutdown · delivery · output · resources · diagnostics',after?'highlight':'')}</div>` +
      flow([box('CLI composition','Command registration · dispatcher · process entry',after?'highlight':''),box(after?'Required policy sections':'Local numbers and fallbacks',after?'Status observer selected by purpose; consumers receive their slice':'Consumer defaults and optional overrides configure runtime',after?'highlight':'retired')]) +
      `<div class="boundary"><h4>apps/cli · mechanisms · physical location unchanged</h4><div class="parallel"><div class="boundary"><h4>Client process</h4><div class="owner-groups">${[['purpose','Transport','timeouts + frames'],['storage','Output capture','inline + result'],['startup','Registry / coordinator','startup'],['idle-stop','Controller / terminator','shutdown']].map(([id,title,desc])=>`<a href="${url({decision:id})}">${box(title,desc)}</a>`).join('')}</div></div><div class="boundary"><h4>Daemon process</h4><div class="owner-groups">${[['pressure','WorkspaceDaemon','resources + lifecycle'],['storage','Completion spool','output'],['logs','Logger / traces','diagnostics']].map(([id,title,desc])=>`<a href="${url({decision:id})}">${box(title,desc)}</a>`).join('')}</div><div class="boundary"><h4>Worker thread</h4>${choice('chunks','Protocol validation + capture')}<br>${choice('pressure','Heap sampling')}</div></div></div></div>` +
      `<div class="boundary"><h4>Test boundary</h4>${choice('adapters','Seven helpers translate legacy knobs through the validated factory')}<br>${choice('guard','Meta-test rejects retired production-source strings')}</div>${note('Simplified ownership and execution-context map. Arrows show configuration, not socket traffic. Many constructors and the local-only execution path are condensed.')}</div>`;
  }

  function fileInventory() {
    return pageHeading('COVERAGE / 60 CHANGED FILES','Every touched file has a place on the surface','Mappings indicate which choices explain a file. They are an editorial coverage check, not a correctness judgment.') +
      `<div class="audit-grid"><div><b>60 / 60</b>changed paths mapped</div><div><b>+1,298 / −544</b>lines in the supplied diff</div></div><div class="file-list">${data.files.map(f=>`<div class="file-row"><div><a href="${url({file:f.path,rev:'diff'})}">${e(f.path)} ↗</a><small>${f.decisions.map(id=>choice(id,`${String(byId.get(id).number).padStart(2,'0')} ${byId.get(id).title}`)).join(' ')}</small></div><div class="diff-stat"><span class="add">+${f.added}</span> <span class="remove">−${f.removed}</span></div></div>`).join('')}</div>`;
  }

  function recordView() {
    return pageHeading('INHERITED CONTEXT / UNCHANGED IN #131','The policy record, exactly where values are owned','This table reproduces the checked-in record. The value choices already existed in the base; #131 changes their operational consumers. Each row links to its source.') +
      `<section class="detail-section"><table class="policy-table"><thead><tr><th>Policy path / recipe</th><th>Default / derivation</th><th>Recorded reason</th></tr></thead><tbody>${data.policyRows.map(r=>`<tr><td><a href="${url({src:'head:plans/005/daemon-policy.md',at:r.line,end:r.line})}">${e(r.path)}</a></td><td>${e(r.value)}</td><td>${e(r.reason)}</td></tr>`).join('')}</tbody></table></section>` +
      `<section class="detail-section"><h3>Intentional absences</h3><div class="chip-line">${['healthy startup','startup silence','post-accept completion','worker output acknowledgement','unacknowledged result'].map(x=>`<span class="chip">${e(x)}: no deadline</span>`).join('')}</div><p>Silence handling and unacknowledged-result eviction are deferred. The other absent deadlines preserve long healthy work and output backpressure.</p>${sourceLink({source:'head:plans/005/daemon-policy.md',start:52,end:60},'Read the full policy record')}</section>`;
  }

  function provenanceView() {
    return pageHeading('SOURCE BOUNDARY / PINNED INPUTS','What this page knows','All evidence needed to inspect these choices is embedded. The page makes no external requests and stores no review responses.') +
      `<dl class="fact-grid"><div><dt>Base revision</dt><dd>${e(data.meta.commits.base)}</dd></div><div><dt>Head revision</dt><dd>${e(data.meta.commits.head)}</dd></div></dl>` +
      `<ul class="provenance-list"><li><b>Read:</b> philosophy.md; playbook sections 1, 2, 3, 6, 7; the supplied PR body, all six commit messages, full diff, file statistics, and relevant repo-rules.md material.</li><li><b>Beyond the bundle:</b> exact base/head source and tests; the policy implementation, policy test factory, policy tests, and plans/005/daemon-policy.md; the architecture and follow-up specs; local git identities and the scoped plan history.</li><li><b>Inherited context:</b> policy implementation, factory, package policy tests, and the policy record are byte-identical between these two revisions. They are not attributed to #131.</li><li><b>Tests:</b> source assertions were inspected. This experiment did not run Symnav’s test suites. The interactive views are explicitly marked illustrations.</li><li><b>Reason search:</b> PR body, six empty commit bodies with their subjects, policy record, and architecture spec. No author transcript was available. “Unexplained” describes that search boundary.</li><li><b>Earlier experiments:</b> ignored. This experiment was developed from the assigned evidence. The provided brief was preserved.</li><li><b>Scope:</b> only PR 131. No Symnav source, branch, or commit was modified.</li></ul>` +
      `<div class="source-controls"><a href="evidence/diff.patch">Download supplied diff</a><a href="evidence/pr.json">Open PR metadata</a><a href="evidence/coverage.json">Open file mapping</a><a href="README.md">Experiment README</a></div><section class="detail-section"><h3>Six commits</h3>${data.commits.map(c=>`<div class="file-row"><div>${e(c.subject)}<small>${e(c.sha)}</small></div></div>`).join('')}</section>`;
  }

  function fullSource(params) {
    const file = params.get('file');
    const selected = file ? data.files.find(f=>f.path===file) : null;
    const revision = params.get('rev') || 'head';
    const sourceKey = params.get('src') || selected?.versions[revision];
    const source = data.sources[sourceKey];
    const isDiff = selected && revision === 'diff' && !params.get('src');
    if (!isDiff && !source) return pageHeading('SOURCE','Source not found','Return to the file inventory to choose an embedded source.');
    const path = isDiff ? file : source.path;
    const relatedFile = selected || data.files.find(f=>f.path===path);
    const at = Math.max(1, Number(params.get('at')) || 1);
    const end = Math.max(at, Number(params.get('end')) || at);
    const title = path.split('/').at(-1);
    const text = isDiff ? selected.diff : source.text;
    const version = isDiff ? 'BASE → HEAD DIFF' : source.version.toUpperCase();
    return pageHeading(`${version} / EMBEDDED FULL SOURCE`,title,null) +
      `<div class="source-meta">${e(path)}<br>${isDiff ? `+${selected.added} / −${selected.removed}` : `SHA-256 ${e(source.sha256)}`}</div>` +
      `<div class="source-controls">${activeId ? `<a href="${url({decision:activeId,view:'source'})}">← Choice ${byId.get(activeId).number} excerpts</a>` : '<a href="#files">← All files</a>'}${relatedFile ? ['diff','base','head'].filter(v=>v==='diff'||relatedFile.versions[v]).map(v=>`<a href="${url({decision:activeId,file:path,rev:v})}" ${((isDiff&&v==='diff')||(!isDiff&&source.version===v))?'aria-current="page"':''}>${e(v)}</a>`).join('') : ''}</div>` +
      `<div class="source-full" role="region" tabindex="0" aria-label="Full ${e(version.toLowerCase())} source for ${e(path)}">${lineMarkup(text,1,isDiff?0:at,isDiff?0:end,isDiff,isDiff?null:sourceKey)}</div>`;
  }

  function bindDiagrams(d) {
    if (d?.diagram === 'timeout') {
      let scenario = 'observer';
      const range = document.getElementById('time-scrub');
      function paint() {
        const t = Number(range.value);
        const config = scenario === 'observer' ? {ordinary:1000,observer:10,chosen:10,arrival:50,name:'identify / ping',purpose:'status-observer'} : scenario === 'ordinary' ? {ordinary:10,observer:1000,chosen:10,arrival:50,name:'execution-status',purpose:'ordinary'} : {ordinary:250,observer:100,chosen:100,arrival:150,name:'identify / ping',purpose:'status-observer'};
        document.getElementById('timeout-scenario').innerHTML = flow([box('Construction purpose',config.purpose),box('Request kind',config.name),box('Chosen field',`${config.purpose==='ordinary'?'singleResponseTimeoutMs':'statusResponseTimeoutMs'} = ${config.chosen} ms`,'highlight')]) +
          `<div class="chip-line"><span class="chip">ordinary = ${config.ordinary} ms</span><span class="chip">observer = ${config.observer} ms</span></div><div class="timeline"><div class="timeline-track"><div class="timeline-fill" style="width:${Math.min(100,t / Number(range.max)*100)}%"></div><div class="timeline-marker" style="left:${config.chosen/Number(range.max)*100}%"></div><div class="timeline-label"><span>0</span><span>selected timeout ${config.chosen} ms · response ${config.arrival} ms</span></div></div></div>`;
        document.getElementById('time-value').textContent = `${t} ms`;
        document.getElementById('timeout-result').textContent = t < config.chosen ? 'Waiting for the one response.' : t < config.arrival ? 'The selected timeout has elapsed; the scheduled response has not arrived.' : 'The scheduled response arrives after the selected timeout.';
        if(scenario==='defaults') document.getElementById('timeout-result').textContent += t<250 ? ' An ordinary transport’s 250 ms limit would still allow this 150 ms response.' : '';
      }
      document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>{
        scenario=b.dataset.scenario;range.max=scenario==='defaults'?'300':'60';range.value='0';
        document.querySelectorAll('[data-scenario]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));paint();
      }));range.addEventListener('input',paint);paint();
    }
    if(d?.diagram === 'retry') {
      let step=0;
      const steps=[
        ['Execute 1 → accepted','No manifest; resumeCount = 0. Execute connections: 1.',1,0],
        ['Connection closes','Without a manifest, fetch resume is unavailable. The authenticated accepted close reaches the outer loop.',1,0],
        ['Reattach: Execute 2 → accepted','Same request identity. reattachmentCount = 1; a new executeOnce starts resumeCount = 0.',2,0],
        ['Manifest arrives; connection closes','This attempt has acceptance + manifest, so its inner resume is allowed.',2,0],
        ['Fetch completion at offset 0','resumeCount = 1. The fixture returns the empty result manifest and result-end.',2,1],
        ['Acknowledge; completion resolves','The checked-in assertion is status completed, exitCode 0, executeCount 2, fetchCount 1.',2,1],
      ];
      function paint(){document.getElementById('trace-steps').innerHTML=steps.map(([title,text],i)=>`<div class="trace-step ${i===step?'current':i<step?'done':''}" ${i===step?'aria-current="step"':''}><span>${i+1}</span><div>${e(title)}<small>${e(text)}</small></div></div>`).join('');document.getElementById('trace-count').textContent=`Step ${step+1} / ${steps.length} · execute connections ${steps[step][2]} · fetch connections ${steps[step][3]}`;document.getElementById('trace-prev').disabled=step===0;document.getElementById('trace-next').disabled=step===steps.length-1;}
      document.getElementById('trace-prev').onclick=()=>{step=Math.max(0,step-1);paint();};document.getElementById('trace-next').onclick=()=>{step=Math.min(steps.length-1,step+1);paint();};document.getElementById('trace-reset').onclick=()=>{step=0;paint();};paint();
    }
    if(d?.diagram === 'child') {
      const paint=limit=>{document.getElementById('child-attempts').innerHTML=flow(Array.from({length:limit+1},(_,i)=>box(`Attempt ${i+1}`,i===0?'Initial triggerAndWait':`Retry ${i} · same ensureRunning budget`,i===limit?'highlight':'')));};
      document.querySelectorAll('[data-child-limit]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-child-limit]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));paint(Number(b.dataset.childLimit));});paint(1);
    }
    if(d?.diagram === 'stop') {
      const paint=ms=>{const reserve=Math.min(500,Math.floor(ms/2));document.getElementById('stop-budget').innerHTML=flow([box('Graceful part',`${ms-reserve} ms`),box('Reserved forced part',`${reserve} ms`,'highlight')])+`<div class="chip-line"><span class="chip">total ${ms} ms</span><span class="chip">min(500, floor(${ms} / 2)) = ${reserve}</span></div>`;};
      document.querySelectorAll('[data-stop-ms]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-stop-ms]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));paint(Number(b.dataset.stopMs));});paint(5000);
    }
  }

  function filter() {
    const query=search.value.toLowerCase().trim();
    const words=query.split(/\s+/).filter(Boolean);
    let count=0;
    decisions.forEach(d=>{
      const text=[d.title,d.specimen,d.summary,d.rationale,d.detail,...d.refs.map(r=>data.sources[r.source].path)].join(' ').toLowerCase();
      const show=(!onlyUnexplained||d.status==='unexplained')&&words.every(w=>text.includes(w));
      document.getElementById(`evidence-${d.id}`).hidden=!show;if(show)count++;
    });
    document.querySelectorAll('.evidence-group').forEach(group=>group.hidden=![...group.querySelectorAll('.decision')].some(el=>!el.hidden));
    document.getElementById('empty').hidden=count>0;
    document.getElementById('filter-status').textContent=count===decisions.length?`Showing all ${count} choices.`:`Showing ${count} of ${decisions.length} choices${onlyUnexplained?' without a recorded reason':''}${query?` matching “${search.value}”`:''}.`;
  }
  function resetFilters(){search.value='';onlyUnexplained=false;unexplained.setAttribute('aria-pressed','false');filter();}

  function returnToEvidence() {
    const hash = activeId ? `#evidence-${activeId}` : originHash;
    if(location.hash===hash) {dialog.close();document.body.style.overflow='';}
    else location.hash=hash;
  }
  function route() {
    const hash=location.hash;
    const special=hash.slice(1);
    const params=new URLSearchParams(special);
    const d=byId.get(params.get('decision'));
    const wantsDialog=Boolean(d||params.has('src')||params.has('file')||['map','files','record','provenance'].includes(special));
    if(!wantsDialog){
      const wasOpen=dialog.open;
      if(wasOpen){dialog.close();document.body.style.overflow='';}
      activeId=null;
      if(special.startsWith('evidence-')){
        const element=document.getElementById(special);
        if(element){if(element.hidden)resetFilters();requestAnimationFrame(()=>{element.scrollIntoView({block:'center',behavior:'instant'});element.focus({preventScroll:true});});}
      }else if(wasOpen&&originElement?.isConnected) originElement.focus({preventScroll:true});
      previousHash=hash;return;
    }
    if(!dialog.open){originHash=previousHash;originElement=document.activeElement;dialog.showModal();document.body.style.overflow='hidden';}
    activeId=d?.id||null;
    if(params.has('src')||params.has('file'))content.innerHTML=fullSource(params);
    else if(d)content.innerHTML=decisionView(d,params.get('view'));
    else if(special==='map')content.innerHTML=ownerMap();
    else if(special==='files')content.innerHTML=fileInventory();
    else if(special==='record')content.innerHTML=recordView();
    else content.innerHTML=provenanceView();
    const pos=d?`${String(d.number).padStart(2,'0')} / ${decisions.length} CHOICES`:special==='files'?'60 FILES':'PR 131';
    document.getElementById('position').textContent=pos;
    document.getElementById('decision-navigation').hidden=!d;
    document.getElementById('previous').disabled=!d||d.number===1;
    document.getElementById('next').disabled=!d||d.number===decisions.length;
    scroll.scrollTop=0;
    document.getElementById('detail-title')?.focus({preventScroll:true});
    if(d&&params.get('view')!=='source'&&!params.has('src')&&!params.has('file'))bindDiagrams(d);
    if(special==='map')bindMap();
    if(params.has('src'))requestAnimationFrame(()=>{const full=content.querySelector('.source-full');const line=full?.querySelector('.target-line');if(line)full.scrollTop=line.offsetTop-full.offsetTop-65;});
    previousHash=hash;
  }
  function bindMap(){document.querySelectorAll('[data-map]').forEach(b=>b.onclick=()=>{content.innerHTML=ownerMap(b.dataset.map==='head');bindMap();});}

  search.addEventListener('input',filter);
  unexplained.addEventListener('click',()=>{onlyUnexplained=!onlyUnexplained;unexplained.setAttribute('aria-pressed',String(onlyUnexplained));filter();});
  document.getElementById('clear-search').onclick=resetFilters;
  document.getElementById('return-evidence').onclick=returnToEvidence;
  document.getElementById('close-detail').onclick=returnToEvidence;
  document.getElementById('previous').onclick=()=>{const d=byId.get(activeId);if(d?.number>1)location.hash=url({decision:decisions[d.number-2].id});};
  document.getElementById('next').onclick=()=>{const d=byId.get(activeId);if(d&&d.number<decisions.length)location.hash=url({decision:decisions[d.number].id});};
  dialog.addEventListener('cancel',event=>{event.preventDefault();returnToEvidence();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)returnToEvidence();}});
  document.addEventListener('keydown',event=>{if(event.key==='/'&&!dialog.open&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){event.preventDefault();search.focus();}});
  window.addEventListener('hashchange',route);
  route();
})();
