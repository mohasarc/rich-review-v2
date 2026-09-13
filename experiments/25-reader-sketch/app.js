(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const { decisions, sheets, atlas } = window.NOTEBOOK;
  const sheetIds = Object.keys(sheets);
  const states = Object.fromEntries(sheetIds.map(id => [id, { marks: [], past: [], future: [], compared: false, version: 'after' }]));
  const clone = value => JSON.parse(JSON.stringify(value));
  const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  let activeSheet = 'ownership';
  let tool = 'pen';
  let color = '#285ca1';
  let selectedId;
  let gesture;
  let nextId = 0;
  let detailIndex = 0;
  const state = () => states[activeSheet];

  $('#decision-grid').innerHTML = decisions.map((d, i) => `<button class="decision-card" id="decision-${d.id}" data-decision="${d.id}" aria-haspopup="dialog"><div class="card-top"><span class="card-number">${String(i + 1).padStart(2, '0')} ↗</span><span class="reason-status ${d.status}">${d.status} reason</span></div><h3>${escape(d.title)}</h3><p>${escape(d.summary)}</p><p class="why">${escape(d.why)}</p></button>`).join('');

  function showDetail(id) {
    detailIndex = decisions.findIndex(d => d.id === id);
    if (detailIndex < 0) return;
    const d = decisions[detailIndex];
    $('#detail-content').innerHTML = `<span class="reason-status ${d.status}">${d.status} reason · ${String(detailIndex + 1).padStart(2, '0')}</span><h2 id="detail-title">${escape(d.title)}</h2><p>${escape(d.summary)}</p><div class="rationale ${d.status}"><p>${escape(d.why)}</p>${d.status === 'stated' ? '<a class="source-link" href="evidence.html#pr-body" target="_blank" rel="noopener">PR body and commits ↗</a> · <a class="source-link" href="evidence.html#policy-record" target="_blank" rel="noopener">Policy record ↗</a>' : ''}</div><h3>Open the boxes</h3>${d.detail}<h3>Check the source</h3>${d.refs.map((_, i) => {
      const r = window.SOURCES.refs[`${d.id}-${i}`];
      return `<details class="evidence-snippet"><summary>${r.side === 'base' ? 'Before' : 'After'} · ${escape(r.path)}:${r.start}–${r.end}</summary><pre>${r.lines.map((line, j) => `<span>${String(r.start + j).padStart(4)}</span> ${escape(line)}`).join('\n')}</pre></details><a class="source-link" target="_blank" rel="noopener" href="evidence.html#${r.hash}">Open excerpt in evidence book ↗</a>`;
    }).join('')}`;
    if (!$('#detail').open) $('#detail').showModal();
    $('#detail').scrollTop = 0;
    $('#close-detail').focus();
    $('#previous-detail').disabled = detailIndex === 0;
    $('#next-detail').disabled = detailIndex === decisions.length - 1;
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-decision]');
    if (trigger) showDetail(trigger.dataset.decision);
  });
  document.addEventListener('keydown', event => {
    const trigger = event.target.closest('svg [data-decision]');
    if (trigger && ['Enter', ' '].includes(event.key)) { event.preventDefault(); showDetail(trigger.dataset.decision); }
  });
  $('#close-detail').addEventListener('click', () => $('#detail').close());
  $('#detail').addEventListener('click', event => {
    if (event.target === $('#detail')) {
      const r = $('#detail').getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $('#detail').close();
    }
  });
  $('#previous-detail').onclick = () => showDetail(decisions[detailIndex - 1].id);
  $('#next-detail').onclick = () => showDetail(decisions[detailIndex + 1].id);

  function setTool(value) {
    tool = value;
    $$('[data-tool]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tool === value)));
    $('#sketch').style.cursor = value === 'move' ? 'grab' : value === 'erase' ? 'pointer' : 'crosshair';
  }
  $$('[data-tool]').forEach(button => button.onclick = () => setTool(button.dataset.tool));
  $$('[data-color]').forEach(button => button.onclick = () => {
    color = button.dataset.color;
    $$('[data-color]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  });

  function remember(previous) { state().past.push(previous); state().future = []; }
  function edit(operation) {
    remember(clone(state().marks));
    operation(state().marks);
    renderMarks();
  }
  function undo() {
    if (!state().past.length) return;
    state().future.push(clone(state().marks));
    state().marks = state().past.pop();
    selectedId = undefined;
    renderMarks();
  }
  function redo() {
    if (!state().future.length) return;
    state().past.push(clone(state().marks));
    state().marks = state().future.pop();
    selectedId = undefined;
    renderMarks();
  }
  $('#undo').onclick = undo;
  $('#redo').onclick = redo;
  $('#clear').onclick = () => edit(marks => { marks.length = 0; selectedId = undefined; });

  function wrapWords(text, max = 24) {
    const lines = [];
    let line = '';
    for (let word of text.split(/\s+/)) {
      while (word.length > max) {
        if (line) { lines.push(line); line = ''; }
        lines.push(word.slice(0, max)); word = word.slice(max);
      }
      if (line && `${line} ${word}`.length > max) { lines.push(line); line = word; }
      else line += `${line ? ' ' : ''}${word}`;
    }
    if (line) lines.push(line);
    return lines;
  }
  function labelLines(label, width) { return wrapWords(label || '', Math.max(3, Math.floor((width - 24) / 9.5))); }
  function markBounds(mark) {
    if (mark.type === 'box') return { x: mark.x, y: mark.y, w: mark.w, h: mark.h };
    const points = mark.type === 'arrow' ? [[mark.x, mark.y], [mark.x2, mark.y2]] : mark.points;
    const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
    return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
  }
  function arrowPath(x, y, x2, y2, size = 11) {
    const angle = Math.atan2(y2 - y, x2 - x);
    const a = angle + Math.PI * .83, b = angle - Math.PI * .83;
    return `M${x},${y} L${x2},${y2} M${x2 + size * Math.cos(a)},${y2 + size * Math.sin(a)} L${x2},${y2} L${x2 + size * Math.cos(b)},${y2 + size * Math.sin(b)}`;
  }
  function renderMark(mark, index) {
    const c = escape(mark.color), b = markBounds(mark);
    let shape = '';
    if (mark.type === 'box') {
      const lines = labelLines(mark.label, mark.w);
      const offset = mark.y + mark.h / 2 - ((lines.length - 1) * 19) / 2 + 5;
      shape = `<rect x="${mark.x}" y="${mark.y}" width="${mark.w}" height="${mark.h}" rx="3" fill="${mark.label ? '#fffdf7ed' : 'none'}" stroke="${c}" stroke-width="2.3"/><text x="${mark.x + mark.w / 2}" y="${offset}" text-anchor="middle" fill="${c}" font-size="15" font-family="ui-monospace,monospace" pointer-events="none">${lines.map((line, i) => `<tspan x="${mark.x + mark.w / 2}" dy="${i ? 19 : 0}">${escape(line)}</tspan>`).join('')}</text>`;
    } else {
      const d = mark.type === 'arrow' ? arrowPath(mark.x, mark.y, mark.x2, mark.y2) : mark.points.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
      shape = `<path d="${d}" fill="none" stroke="transparent" stroke-width="18"/><path d="${d}" fill="none" stroke="${c}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.6" pointer-events="none"/>`;
    }
    return `<g data-mark="${mark.id}" tabindex="0" role="button" aria-label="${escape(mark.label || mark.type)}; mark ${index + 1}. Arrow keys move; Shift arrows resize boxes or arrow endpoints; Delete removes." transform="translate(${mark.dx || 0},${mark.dy || 0})" class="${selectedId === mark.id ? 'selected' : ''}">${shape}<rect class="mark-outline" x="${b.x - 5}" y="${b.y - 5}" width="${Math.max(10, b.w + 10)}" height="${Math.max(10, b.h + 10)}" fill="none" stroke="transparent" pointer-events="none"/></g>`;
  }
  function renderMarks(focusId) {
    $('#mark-layer').innerHTML = state().marks.map(renderMark).join('');
    $('#empty-hint').hidden = state().marks.length > 0;
    $('#undo').disabled = !state().past.length;
    $('#redo').disabled = !state().future.length;
    $('#clear').disabled = !state().marks.length;
    $('#mark-status').textContent = state().marks.length ? `${state().marks.length} mark${state().marks.length === 1 ? '' : 's'} · nothing saved` : 'Blank paper';
    if (focusId) $(`[data-mark="${focusId}"]`)?.focus({ preventScroll: true });
  }
  function addBox(label) {
    const n = state().marks.length;
    const mark = { id: `m${++nextId}`, type: 'box', x: 45 + (n % 3) * 240, y: 60 + (Math.floor(n / 3) % 5) * 90, w: 205, h: Math.max(72, labelLines(label, 205).length * 19 + 24), color, label };
    edit(marks => marks.push(mark));
    selectedId = mark.id;
    setTool('move');
    renderMarks(mark.id);
  }
  $('#add-stamp').onclick = () => addBox($('#stamp').value);
  $('#add-custom').onclick = () => {
    const value = $('#custom-label').value.trim();
    if (value) { addBox(value); $('#custom-label').value = ''; }
    else $('#custom-label').focus();
  };
  $('#custom-label').addEventListener('keydown', event => { if (event.key === 'Enter') $('#add-custom').click(); });

  function coordinates(event) {
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform($('#sketch').getScreenCTM().inverse());
    return [Math.max(3, Math.min(797, point.x)), Math.max(3, Math.min(547, point.y))];
  }
  function translateMark(mark, original, dx, dy) {
    const b = markBounds(original);
    mark.dx = Math.max(5 - b.x, Math.min(795 - b.x - b.w, (original.dx || 0) + dx));
    mark.dy = Math.max(5 - b.y, Math.min(545 - b.y - b.h, (original.dy || 0) + dy));
  }
  $('#sketch').addEventListener('pointerdown', event => {
    if (event.button !== 0 || gesture) return;
    event.preventDefault();
    const [x, y] = coordinates(event);
    const targetId = event.target.closest('[data-mark]')?.dataset.mark;
    if (tool === 'erase') {
      if (targetId) edit(marks => { marks.splice(marks.findIndex(m => m.id === targetId), 1); selectedId = undefined; });
      return;
    }
    if (tool === 'move') {
      selectedId = targetId;
      if (targetId) gesture = { kind: 'move', x, y, id: targetId, previous: clone(state().marks), pointerId: event.pointerId };
      renderMarks();
    } else {
      const mark = { id: `m${++nextId}`, type: tool, x, y, color, dx: 0, dy: 0 };
      if (tool === 'pen') mark.points = [[x, y], [x + .1, y + .1]];
      if (tool === 'box') Object.assign(mark, { w: 0, h: 0, label: '' });
      if (tool === 'arrow') Object.assign(mark, { x2: x, y2: y });
      gesture = { kind: 'draw', x, y, mark, pointerId: event.pointerId };
      selectedId = undefined;
    }
    if (gesture) $('#sketch').setPointerCapture(event.pointerId);
  });
  $('#sketch').addEventListener('pointermove', event => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const [x, y] = coordinates(event);
    if (gesture.kind === 'move') {
      const current = state().marks.find(m => m.id === gesture.id);
      translateMark(current, gesture.previous.find(m => m.id === gesture.id), x - gesture.x, y - gesture.y);
      renderMarks();
    } else {
      const m = gesture.mark;
      if (m.type === 'pen') m.points.push([x, y]);
      if (m.type === 'arrow') Object.assign(m, { x2: x, y2: y });
      if (m.type === 'box') Object.assign(m, { x: Math.min(x, gesture.x), y: Math.min(y, gesture.y), w: Math.abs(x - gesture.x), h: Math.abs(y - gesture.y) });
      $('#preview-layer').innerHTML = renderMark(m, state().marks.length);
    }
  });
  function finishGesture(cancel = false) {
    if (!gesture) return;
    if (gesture.kind === 'move') {
      if (cancel) state().marks = gesture.previous;
      else if (JSON.stringify(gesture.previous) !== JSON.stringify(state().marks)) remember(gesture.previous);
    } else if (!cancel) {
      const m = gesture.mark;
      const b = markBounds(m);
      if (m.type === 'pen' || b.w > 5 || b.h > 5) {
        if (m.type === 'box') { m.w = Math.max(25, m.w); m.h = Math.max(25, m.h); }
        remember(clone(state().marks)); state().marks.push(m);
      }
    }
    gesture = undefined;
    $('#preview-layer').innerHTML = '';
    renderMarks();
  }
  $('#sketch').addEventListener('pointerup', () => finishGesture());
  $('#sketch').addEventListener('pointercancel', () => finishGesture(true));
  $('#sketch').addEventListener('lostpointercapture', () => { if (gesture) finishGesture(true); });
  $('#sketch').addEventListener('focusin', event => {
    const id = event.target.closest('[data-mark]')?.dataset.mark;
    if (id) { selectedId = id; $$('[data-mark]').forEach(g => g.classList.toggle('selected', g.dataset.mark === id)); }
  });
  document.addEventListener('keydown', event => {
    if ($('#detail').open || event.target.closest('input,textarea,select')) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); return; }
    const id = event.target.closest('[data-mark]')?.dataset.mark;
    if (id) {
      const m = state().marks.find(mark => mark.id === id);
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault(); edit(marks => marks.splice(marks.findIndex(mark => mark.id === id), 1)); $('#sketch').focus(); return;
      }
      const delta = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[event.key];
      if (delta) {
        event.preventDefault();
        edit(() => {
          if (event.shiftKey && m.type === 'box') {
            m.w = Math.max(m.label ? 120 : 30, Math.min(795 - m.x - (m.dx || 0), m.w + delta[0]));
            const minimumHeight = m.label ? labelLines(m.label, m.w).length * 19 + 24 : 25;
            m.h = Math.max(minimumHeight, Math.min(545 - m.y - (m.dy || 0), m.h + delta[1]));
            translateMark(m, clone(m), 0, 0);
          } else if (event.shiftKey && m.type === 'arrow') {
            m.x2 = Math.max(5 - (m.dx || 0), Math.min(795 - (m.dx || 0), m.x2 + delta[0]));
            m.y2 = Math.max(5 - (m.dy || 0), Math.min(545 - (m.dy || 0), m.y2 + delta[1]));
          } else translateMark(m, clone(m), ...delta);
        });
        renderMarks(id); return;
      }
    }
    if (event.target === $('#sketch') && event.key === 'Enter') {
      event.preventDefault();
      if (tool === 'arrow') {
        const m = { id: `m${++nextId}`, type: 'arrow', x: 270, y: 275, x2: 500, y2: 275, color };
        edit(marks => marks.push(m)); selectedId = m.id; setTool('move'); renderMarks(m.id);
      } else addBox($('#stamp').value);
      return;
    }
    if (event.key === 'Escape') { finishGesture(true); selectedId = undefined; renderMarks(); }
    if (!event.ctrlKey && !event.metaKey && !event.altKey) {
      const shortcut = { p: 'pen', b: 'box', a: 'arrow', v: 'move', e: 'erase' }[event.key.toLowerCase()];
      if (shortcut) setTool(shortcut);
    }
  });

  function drawGuides() {
    const hints = {
      ownership: [[25, 35, 215, 450, '@symnav/daemon'], [265, 35, 510, 450, 'apps/cli']],
      runtime: [[25, 35, 215, 480, 'CLI process'], [265, 35, 510, 480, 'daemon process'], [505, 225, 245, 270, 'worker thread']],
      recovery: [[30, 155, 740, 310, 'accepted request'], [60, 240, 285, 160, 'execute attempt'], [455, 240, 285, 160, 'execute attempt']]
    }[activeSheet];
    $('#guide-layer').innerHTML = $('#guides').checked ? hints.map(([x, y, w, h, label]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#b9c0b2" stroke-dasharray="7 7"/><text x="${x + 10}" y="${y + 23}" font-size="13" fill="#9caa94">${escape(label)}</text>`).join('') : '';
  }
  $('#guides').onchange = drawGuides;
  function switchSheet(id) {
    finishGesture(true);
    activeSheet = id; selectedId = undefined;
    const s = sheets[id];
    $$('[data-sheet]').forEach(button => { button.setAttribute('aria-selected', String(button.dataset.sheet === id)); button.tabIndex = button.dataset.sheet === id ? 0 : -1; });
    $('#sheet-panel').setAttribute('aria-labelledby', `tab-${id}`);
    $('#sheet-title').textContent = s.title;
    $('#sheet-prompt').textContent = s.prompt;
    $('#sheet-cue').textContent = s.cue;
    $('#stamp').innerHTML = s.stamps.map(label => `<option>${escape(label)}</option>`).join('');
    $('#next-sheet').textContent = id === 'recovery' ? 'Follow a policy field ↓' : 'Next sheet →';
    renderMarks(); drawGuides(); renderComparison();
  }
  $$('[data-sheet]').forEach(button => {
    button.onclick = () => switchSheet(button.dataset.sheet);
    button.onkeydown = event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let i = sheetIds.indexOf(activeSheet);
      i = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (i + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
      switchSheet(sheetIds[i]); $(`#tab-${sheetIds[i]}`).focus();
    };
  });
  $('#next-sheet').onclick = () => {
    const index = sheetIds.indexOf(activeSheet);
    if (index === 2) $('#atlas').scrollIntoView();
    else { switchSheet(sheetIds[index + 1]); $('#studio').scrollIntoView(); }
  };
  $('#compare').onclick = () => { state().compared = !state().compared; renderComparison(); };
  $$('[data-version]').forEach(button => button.onclick = () => { state().version = button.dataset.version; renderComparison(); });

  function box(x, y, w, h, title, subtitle, decision, fill = '#f5f3e9', stroke = '#9fa89b') {
    const lines = Array.isArray(subtitle) ? subtitle : subtitle ? [subtitle] : [];
    return `<g ${decision ? `data-decision="${decision}" role="button" tabindex="0" aria-label="${escape(title)}. Open source explanation."` : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/><text x="${x + 13}" y="${y + 25}" class="title">${escape(title)}</text>${lines.map((line, i) => `<text x="${x + 13}" y="${y + 47 + i * 18}" class="small">${escape(line)}</text>`).join('')}</g>`;
  }
  function boundary(x, y, w, h, label, fill = 'none') {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="#7f8d82" stroke-width="1.3"/><text x="${x + 14}" y="${y + 23}" class="eyelabel">${escape(label)}</text>`;
  }
  function edge(x, y, x2, y2, changed = false, old = false) {
    return `<path d="${arrowPath(x, y, x2, y2, 8)}" fill="none" stroke="${changed ? '#52723f' : old ? '#9a4e36' : '#8a9388'}" stroke-width="${changed ? 2.5 : 1.6}" ${old ? 'stroke-dasharray="5 4"' : ''}/>`;
  }
  function words(x, y, text, cls = 'caption') { return `<text x="${x}" y="${y}" class="${cls}">${escape(text)}</text>`; }

  function ownershipMap(after) {
    let s = boundary(25, 30, 215, 455, '@symnav/daemon', '#f0f3e8') + boundary(265, 30, 510, 455, 'apps/cli');
    s += box(42, 91, 180, 83, 'DaemonPolicy', ['complete snapshot', 'already in the base'], 'ownership', '#e2ebd9');
    s += words(45, 217, 'Seven policy sections', 'small');
    const sections = ['resources', 'output', 'transport', 'startup', 'shutdown', 'diagnostics', 'delivery'];
    sections.forEach((label, i) => { s += words(55, 251 + i * 28, label, 'caption'); });
    s += edge(222, 121, 295, 121) + box(297, 89, 451, 70, 'CLI composition', ['selects slices; serializes the complete snapshot'], 'ownership');
    const rows = [['Resource supervisor', 'resources'], ['Capture / spool / codecs', 'output'], ['Startup / shutdown', 'lifecycle'], ['Logger / traces', 'diagnostics'], ['Transport / recovery', 'recovery']];
    rows.forEach(([label, id], i) => {
      const y = 188 + i * 55;
      s += box(326, y, 253, 42, label, '', id, after ? '#eef3e7' : '#fff8eb');
      if (after) {
        s += `<path d="M309 159V${y + 21}H323" fill="none" stroke="#52723f" stroke-width="2.5"/>`;
        s += words(603, y + 26, 'required input', 'small');
      } else {
        s += edge(615, y + 21, 582, y + 21, false, true);
        s += box(618, y + 3, 139, 36, 'local choice', '', id, '#f5e6dc', '#9a4e36');
      }
    });
    s += box(25, 500, 460, 37, after ? 'Tests → seven validated-policy adapters' : 'Tests → per-consumer numeric knobs', '', 'adapters', '#efeee5');
    s += box(500, 500, 275, 37, after ? 'Meta-test: retired names' : 'Existing package guards', '', 'guard', '#efeee5');
    return s;
  }
  function runtimeMap(after) {
    let s = boundary(25, 30, 215, 495, 'CLI PROCESS') + boundary(265, 30, 510, 495, 'DAEMON PROCESS');
    s += box(41, 77, 183, 77, 'Policy snapshot', ['from system memory', 'in CLI composition'], 'ownership', '#e2ebd9');
    s += box(291, 77, 456, 77, 'Policy from serialized configuration', ['whole snapshot; bridge already present before #131'], 'ownership', '#e2ebd9');
    s += edge(225, 113, 288, 113);
    s += box(41, 228, 183, 81, 'Local capture', [after ? 'output slice' : 'local output defaults'], 'output', after ? '#eef3e7' : '#f5e6dc');
    s += box(41, 367, 183, 83, 'Client transport', [after ? 'transport / delivery' : 'local waits / one-shots', after ? '+ output slices' : '+ local output limits'], 'deadlines', after ? '#eef3e7' : '#f5e6dc');
    if (after) s += '<path d="M133 154V185H33V410M33 269H39M33 410H39" fill="none" stroke="#52723f" stroke-width="2.5"/>';
    s += words(46, 488, 'source: apps/cli', 'small');
    const rows = [['Logger / traces', 'diagnostics', 177], ['Completion spool', 'output', 265], ['Resources / reports', 'resources', 353], ['Lifecycle', 'lifecycle', 441]];
    rows.forEach(([title, id, y]) => {
      s += box(290, y, 198, 65, title, [after ? `${id === 'lifecycle' ? 'startup / shutdown' : id} slice` : 'local defaults / options'], id, after ? '#eef3e7' : '#f5e6dc');
      if (after) s += `<path d="M281 154V${y + 33}H288" fill="none" stroke="#52723f" stroke-width="2.3"/>`;
    });
    s += boundary(505, 221, 244, 285, 'WORKER THREAD', '#f0f2eb');
    s += box(523, 265, 209, 60, 'Policy copy', ['whole serialized snapshot'], 'ownership', '#e2ebd9');
    s += edge(624, 155, 624, 262) + words(546, 189, 'existing workerData', 'small');
    s += box(523, 349, 209, 65, 'Capture + validation', [after ? 'output.maximumChunk…' : 'local chunk constants'], 'output', after ? '#eef3e7' : '#f5e6dc');
    s += box(523, 432, 209, 59, 'Heap sampler', [after ? 'resources cadence' : '25 ms literal'], 'resources', after ? '#eef3e7' : '#f5e6dc');
    if (after) s += '<path d="M624 325V336H514V461M514 381H521M514 461H521" fill="none" stroke="#52723f" stroke-width="2.5"/>';
    return s;
  }
  function recoveryMap(after) {
    let s = box(30, 27, 226, 80, 'Status observer', [after ? 'purpose → policy: 100 ms' : 'raw override: 100 ms', 'identify / ping / status'], 'deadlines', '#edf1e7');
    s += box(287, 27, 226, 80, 'Ordinary exchange', [after ? 'ordinary → policy: 250 ms' : 'default: 250 ms', 'includes execution-status'], 'deadlines', '#edf1e7');
    s += box(544, 27, 226, 80, 'Admission', [after ? 'policy: 5 s to acceptance' : 'default: 5 s to acceptance', 'then socket timeout → 0'], 'deadlines', '#edf1e7');
    s += boundary(30, 155, 740, 310, 'ACCEPTED REQUEST · SAME IDENTITY · NO COMPLETION TIMER');
    s += words(75, 207, after ? 'request-scoped reattachmentCount / default limit 1' : 'request-scoped wrapper / one hard-coded reattachment', 'caption');
    s += box(61, 238, 285, 165, 'Execute attempt 1', ['accepted; connection closes'], 'recovery');
    s += box(455, 238, 285, 165, 'Execute attempt 2', ['reattach to accepted work'], 'recovery');
    s += edge(349, 272, 452, 272, after);
    s += words(357, 294, 'reattach', 'small');
    [75, 470].forEach(x => {
      s += box(x, 316, 256, 71, after ? 'Fresh resumeCount; limit 1' : 'Fresh resumeStarted = false', ['fetch needs acceptance + manifest'], 'recovery', after ? '#e2ebd9' : '#f5e6dc', after ? '#52723f' : '#9a4e36');
    });
    s += box(61, 418, 679, 33, after ? 'Later completion rejection can escape as the later error ↗' : 'Reattached failure escapes as the original error ↗', '', 'error', '#f1e9de', '#9a4e36');
    s += box(30, 487, 740, 43, after ? 'Startup, separately: childFailureRetryLimit = 1 → at most 2 launches' : 'Startup, separately: fixed second launch after an eligible child failure', '', 'startup');
    s += edge(659, 108, 659, 152);
    return s;
  }
  function renderComparison() {
    const shown = state().compared;
    $('#reference-panel').hidden = !shown;
    $('#comparison-notes').hidden = !shown;
    $('#drawing-layout').classList.toggle('comparing', shown);
    $('#compare').setAttribute('aria-expanded', String(shown));
    $('#compare').textContent = shown ? 'Hide source map' : 'Compare with source map ↗';
    $$('[data-version]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.version === state().version)));
    const after = state().version === 'after';
    $('#reference').innerHTML = `<title>${sheets[activeSheet].title} ${after ? 'After PR 131' : 'Before PR 131'}</title>` + ({ ownership: ownershipMap, runtime: runtimeMap, recovery: recoveryMap }[activeSheet])(after);
    $('#comparison-notes').innerHTML = sheets[activeSheet].notes.map(([title, text, id]) => `<div><h4>${escape(title)}</h4><p>${escape(text)}</p><button data-decision="${id}" aria-haspopup="dialog">Follow this into the source ↗</button></div>`).join('');
  }
  $('#atlas-tabs').innerHTML = Object.keys(atlas).map(section => `<button data-section="${section}" aria-pressed="false">${section}</button>`).join('');
  function showSection(section) {
    const a = atlas[section];
    $$('[data-section]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.section === section)));
    $('#atlas-content').innerHTML = `<h3>${escape(a.title)}</h3><p>${escape(a.description)} <button data-decision="${a.decision}">Open mechanism ↗</button></p><table><thead><tr><th>Policy field / recipe</th><th>Default or derivation</th><th>Consumer / stated reason</th></tr></thead><tbody>${window.SOURCES.fields[section].map(f => `<tr><td><code>${escape(f.name)}</code></td><td>${escape(f.value)}</td><td><button data-decision="${a.decision}">${escape(f.consumer)}</button><br>${escape(f.reason)}</td></tr>`).join('')}</tbody></table><a class="source-link" href="evidence.html#policy-record" target="_blank" rel="noopener">Read the complete policy record ↗</a>`;
  }
  $$('[data-section]').forEach(button => button.onclick = () => showSection(button.dataset.section));
  switchSheet('ownership');
  showSection('resources');
})();
