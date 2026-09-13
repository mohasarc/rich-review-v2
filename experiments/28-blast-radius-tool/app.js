(() => {
  'use strict';
  const report = window.BLAST_RADIUS;
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!report) {
    $('ranked-list').textContent = 'The saved report is missing. Run python3 blast_radius.py in this folder to create it.';
    return;
  }
  const state = { revision:'union', kinds:'all', selected:null, tab:'mechanism' };
  const mobile = () => window.matchMedia('(max-width: 740px)').matches;
  const byId = new Map(report.decisions.map(d => [d.id,d]));
  const short = path => path.replace(/^apps\/cli\//, '').replace(/^packages\//, 'pkg/');
  const metric = (d, side) => d.metrics[side][state.kinds];
  const filesFor = (d, kind, revision = state.revision) => revision === 'union'
    ? [...new Set([...metric(d,'base')[kind], ...metric(d,'head')[kind]])].sort()
    : metric(d,revision)[kind];
  const count = (d, kind, revision) => filesFor(d,kind,revision).length;
  const sorted = () => [...report.decisions].filter(d => !d.unmeasured).sort((a,b) => count(b,'production') - count(a,'production') || a.id.localeCompare(b.id));
  const ordered = () => [...sorted(),...report.decisions.filter(d => d.unmeasured)];
  const badge = d => `<span class="reason-badge ${d.reason.status}">${d.reason.status}</span>`;

  function renderList() {
    const list = sorted();
    const max = Math.max(1,...list.map(d => count(d,'production')));
    const card = (d,i) => {
      const n = count(d,'production');
      const production = d.unmeasured ? '—' : n;
      const tests = d.unmeasured ? '—' : count(d,'test');
      const modeLabel = state.revision === 'union' ? 'base ∪ head' : state.revision;
      return `<button class="decision-card" id="row-${d.id}" data-decision="${d.id}" aria-pressed="${d.id === state.selected}" aria-controls="inspector">
        <div class="decision-main"><div class="decision-title"><span class="rank">${d.unmeasured ? '—' : String(i+1).padStart(2,'0')}</span>${esc(d.title)}</div>
          ${badge(d)}<span class="box-tag">${esc(d.box)}</span>
          <p class="decision-summary">${esc(d.summary)}</p>
          ${d.numbers ? `<div class="default-line">${esc(d.numbers)}</div>` : ''}
          ${!d.unmeasured ? `<div class="radius-track" aria-hidden="true"><span style="width:${n/max*100}%"></span></div><div class="decision-foot">BASE ${count(d,'production','base')} → HEAD ${count(d,'production','head')} <span aria-hidden="true">·</span> OPEN MECHANISM ↗</div>` : `<div class="decision-foot">${esc(d.unmeasured)}</div>`}
        </div><div class="count"><strong>${production}</strong><small>${d.unmeasured ? 'no metric' : modeLabel}</small></div><div class="count test"><strong>${tests}</strong></div></button>`;
    };
    $('ranked-list').innerHTML = list.map(card).join('');
    $('unmeasured-list').innerHTML = report.decisions.filter(d => d.unmeasured).map(card).join('');
  }

  function nextControls(d) {
    const order = ordered();
    const i = order.findIndex(item => item.id === d.id);
    return `<div class="detail-next">${i ? `<button class="text-button" data-decision="${order[i-1].id}">← Previous decision</button>` : '<span></span>'}${i < order.length-1 ? `<button class="text-button" data-decision="${order[i+1].id}">Next decision →</button>` : '<a href="#method">Measurement method ↓</a>'}</div>`;
  }

  function mechanism(d) {
    const intentFile = d.reason.source.includes('architecture') ? 'daemon-architecture-functional-spec.md' : d.reason.source.includes('daemon-policy.md') ? 'daemon-policy.md' : 'pr.json';
    return `<div class="reason-box ${d.reason.status}"><p class="section-kicker">REASON · ${d.reason.status.toUpperCase()}</p><p>${esc(d.reason.text)}</p><small>${esc(d.reason.source)} ${d.reason.status === 'stated' ? `<a href="data/intent/${intentFile}">Read source ↗</a>` : '<a href="#method">Input scope ↓</a>'}</small></div>
      <p class="section-kicker">THE RELATIONSHIP</p><div class="flow">${d.flow.map((node,i) => `${i ? '<div class="flow-arrow" aria-hidden="true">↓</div>' : ''}<div class="flow-node">${esc(node)}</div>`).join('')}</div>
      <p class="diagram-note">Simplified concept sequence; boxes may be alternatives or parallel owners, not chronological execution steps.</p>
      <div class="compare"><div><p class="eyebrow">BEFORE</p>${d.before.map(p=>`<p>${esc(p)}</p>`).join('')}</div><div><p class="eyebrow">AFTER</p>${d.after.map(p=>`<p>${esc(p)}</p>`).join('')}</div></div>
      ${d.numbers ? `<div class="default-detail"><strong>Recorded defaults</strong><br>${esc(d.numbers)}</div>`:''}
      ${d.baseline ? `<p class="empty" style="margin-top:18px">${esc(d.baseline)}</p>`:''}
      <div class="detail-next"><button class="text-button" data-tab="references">Trace the observed reach →</button><button class="text-button" data-tab="evidence">Read the source →</button></div>${nextControls(d)}`;
  }

  function references(d) {
    if (d.unmeasured) return `<p class="ref-warning">${esc(d.unmeasured)}</p><p class="empty">The changed-file inventory and source excerpts remain available. Absence of a symbol metric says nothing about the consequence of this decision.</p><button class="text-button" data-tab="evidence">Open its evidence →</button>${nextControls(d)}`;
    const sides = state.revision === 'union' ? ['base','head'] : [state.revision];
    const sourceFiles = new Map();
    for (const side of sides) {
      for (const file of metric(d,side).files) {
        const current = sourceFiles.get(file.file) || { ...file, refs:[], sides:[] };
        current.sides.push(side);
        current.refs.push(...file.refs.map(ref => ({...ref,side})));
        sourceFiles.set(file.file,current);
      }
    }
    const entries = [...sourceFiles.values()].sort((a,b)=>a.file.localeCompare(b.file));
    const fileMarkup = (file) => `<details class="ref-file"><summary>${esc(short(file.file))}<span>${esc(file.box)} · ${file.sides.join(' + ')} · ${file.refs.length} reference locations across shown revisions</span></summary>${file.refs.map(ref => `<div class="ref-line"><span class="location">${ref.side.toUpperCase()} :${ref.line} · ${esc(ref.kind)}</span><code>${esc(ref.previewSource)}</code><div class="via">via ${ref.via.map(esc).join('<br>via ')}</div></div>`).join('')}</details>`;
    const counts = `<div class="reach-summary"><div><strong>${count(d,'production')}</strong><small>external production files · ${state.revision === 'union' ? 'base ∪ head' : state.revision}</small></div><div><strong>${count(d,'test')}</strong><small>test / fixture files · shown separately</small></div></div>`;
    const groups = ['production','test'].map(kind => `<h3 class="ref-subtitle">${kind === 'production' ? 'Production files' : 'Test and fixture files'}</h3>${entries.filter(f=>f.kind===kind).map(fileMarkup).join('') || '<p class="empty">No external files observed for these seeds and filters.</p>'}`).join('');
    const queries = sides.map(side=>`<h3 class="ref-subtitle">${side.toUpperCase()} · queried symbols</h3>${d.queries[side].map(query => `<div class="seed">${esc(query.target)}<br><a href="${esc(query.rawFile)}">Raw CLI result · ${query.total} refs ↗</a></div>`).join('') || '<p class="empty">No corresponding symbol in this revision (declared in manifest).</p>'}`).join('');
    const exclusions = sides.map(side=>`<p class="empty"><strong>${side.toUpperCase()} declaration files excluded:</strong><br>${metric(d,side).seedFiles.map(f=>esc(short(f))).join('<br>') || 'None'}<br>Generated reference files excluded: ${metric(d,side).generatedFilesExcluded.length}</p>`).join('');
    return `${counts}<p class="empty">${state.kinds === 'all' ? 'Imports, exports, types and usages' : 'Static usage references'}; union across seeds. Same-file coupling is excluded. These are symbols’ consumers, which can include unchanged behavior.</p>${d.baseline ? `<p class="ref-warning">${esc(d.baseline)}</p>` : ''}${groups}${queries}${exclusions}${nextControls(d)}`;
  }

  function evidence(d) {
    const snippets = d.evidence.map(e => `<article class="evidence-item"><p>${esc(e.label)}</p><div class="code-location">${e.side.toUpperCase()} ${report.revisions[e.side].slice(0,10)}<br>${esc(e.file)}:${e.start}–${e.end}</div><div class="code-lines">${e.lines.map((line,i)=>`<div class="code-line"><span class="line-no">${e.start+i}</span><code>${esc(line)}</code></div>`).join('')}</div></article>`).join('');
    const files = d.changedFiles.map(file => report.files.find(f=>f.file===file));
    return `<p class="empty">Source snapshots from the pinned revisions. Excerpts substantiate the decision above; a shared file can implement several listed decisions.</p>${snippets}<h3 class="ref-subtitle">Full diffs of related changed files</h3>${files.map(file => `<details class="file-patch"><summary>${esc(short(file.file))} <span class="muted">+${file.added} / −${file.removed}</span></summary><p class="empty">Other decisions sharing this file: ${file.decisions.filter(id=>id!==d.id).map(id=>`<a href="#decision-${id}">${esc(byId.get(id).title)}</a>`).join(' · ') || 'none'}</p><pre class="patch">${esc(file.patch)}</pre></details>`).join('')}${nextControls(d)}`;
  }

  function renderDetail() {
    const d = byId.get(state.selected);
    if (!d) return;
    const rank = sorted().findIndex(item=>item.id===d.id)+1;
    $('detail-header').innerHTML = `<div class="detail-meta">${badge(d)}<span class="mono">${d.unmeasured ? 'UNMEASURED' : 'RANK ' + String(rank).padStart(2,'0')} / ${esc(d.box.toUpperCase())}</span></div><h2>${esc(d.title)}</h2><p class="detail-summary">${esc(d.summary)}</p>`;
    document.querySelectorAll('.tabs button').forEach(button => {
      button.setAttribute('aria-selected',String(button.dataset.tab===state.tab));
      button.tabIndex = button.dataset.tab===state.tab ? 0 : -1;
    });
    $('detail-content').setAttribute('aria-labelledby','tab-'+state.tab);
    $('detail-content').innerHTML = ({mechanism,references,evidence})[state.tab](d);
    $('return-link').href = '#row-' + d.id;
  }

  function select(id, navigate=true) {
    if (!byId.has(id)) return;
    state.selected = id;
    state.tab = 'mechanism';
    if (navigate) history.pushState(null,'','#decision-'+id);
    $('inspector').classList.remove('mobile-idle');
    renderList();
    renderDetail();
    $('inspector').scrollTop = 0;
    if (navigate && mobile()) $('inspector').scrollIntoView({block:'start'});
  }

  function setTab(tab) {
    if (!['mechanism','references','evidence'].includes(tab)) return;
    state.tab = tab;
    renderDetail();
  }

  document.addEventListener('click',event=>{
    const row = event.target.closest('[data-decision]');
    if (row) { select(row.dataset.decision); return; }
    const tab = event.target.closest('[data-tab]');
    if (tab) { setTab(tab.dataset.tab); return; }
    const link = event.target.closest('a[href^="#decision-"]');
    if (link) {
      event.preventDefault();
      select(link.getAttribute('href').slice('#decision-'.length));
      if (!mobile()) $('decisions').scrollIntoView({block:'start'});
    }
  });
  document.querySelector('.tabs').addEventListener('keydown',event=>{
    const keys = ['ArrowLeft','ArrowRight','Home','End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const tabs=['mechanism','references','evidence'];
    const index = tabs.indexOf(state.tab);
    const next = event.key==='Home' ? 0 : event.key==='End' ? 2 : (index + (event.key==='ArrowRight'?1:2))%3;
    setTab(tabs[next]);
    $('tab-'+tabs[next]).focus();
  });
  for (const key of ['revision','kinds']) $(key).addEventListener('change',event=>{
    state[key]=event.target.value;
    renderList();
    renderDetail();
  });
  window.addEventListener('popstate',()=>{
    if (location.hash.startsWith('#decision-')) select(location.hash.slice(10),false);
  });
  $('query-count').textContent=report.queryCount;
  const nonzero = report.decisions.filter(d => !d.unmeasured && count(d,'production','union') > 0);
  const unchanged = nonzero.filter(d => JSON.stringify(metric(d,'base').production) === JSON.stringify(metric(d,'head').production));
  $('observed-finding').innerHTML=`<strong>Reach is mostly stable.</strong> ${unchanged.length} of ${nonzero.length} nonzero production footprints contain the same base/head files. This refactor changes how existing consumers get their thresholds.`;
  $('revisions').textContent=report.revisions.base.slice(0,10)+' → '+report.revisions.head.slice(0,10);
  $('field-probe').textContent=report.provenance.fieldProbe;
  $('source-scope').textContent=report.provenance.sourceScope;
  $('diagnostics').textContent='Backend diagnostic retained: '+report.diagnostics.join(' · ');
  $('integrity').textContent='DIFF SHA256 '+report.diffSha256+'\nMANIFEST SHA256 '+report.manifestSha256;
  $('coverage-summary').textContent=`All ${report.files.length} changed files are assigned to decisions`;
  $('coverage-table').innerHTML='<table class="mini-table"><tbody>'+report.files.map(file=>`<tr><td><code>${esc(file.file)}</code><br>${file.kind} · +${file.added}/−${file.removed}</td><td>${file.decisions.map(id=>`<a href="#decision-${id}">${esc(byId.get(id).title)}</a>`).join('<br>')}</td></tr>`).join('')+'</tbody></table>';
  $('seed-table').innerHTML=report.decisions.map(d=>`<details><summary>${esc(d.title)}</summary>${['base','head'].map(side=>`<p class="empty">${side.toUpperCase()}</p>${d.seeds[side].map(seed=>`<div class="seed">${esc(seed)}</div>`).join('') || '<p class="empty">No seed selected.</p>'}`).join('')}</details>`).join('');
  const initial=location.hash.startsWith('#decision-') ? location.hash.slice(10) : sorted()[0].id;
  select(byId.has(initial) ? initial : sorted()[0].id,false);
  if (mobile() && !location.hash.startsWith('#decision-')) $('inspector').classList.add('mobile-idle');
})();
