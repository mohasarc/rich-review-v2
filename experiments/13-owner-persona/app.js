(() => {
  'use strict';
  const data = JSON.parse(document.getElementById('evidence-data').textContent);
  const decisions = [...document.querySelectorAll('details.decision')];
  const expand = document.getElementById('expand-all');
  const dialog = document.getElementById('evidence-dialog');
  const title = document.getElementById('evidence-title');
  const code = document.getElementById('evidence-code');
  const panel = document.getElementById('code-panel');
  const revision = document.getElementById('evidence-revision');
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  let activePath;
  let activeLine;
  let activeSide = 'diff';

  function updateExpand() {
    const allOpen = decisions.every(item => item.open);
    expand.textContent = allOpen ? 'Collapse explanations' : 'Expand explanations';
    expand.setAttribute('aria-pressed', String(allOpen));
  }
  expand.addEventListener('click', () => {
    const allOpen = decisions.every(item => item.open);
    decisions.forEach(item => { item.open = !allOpen; });
    updateExpand();
  });
  decisions.forEach(item => item.addEventListener('toggle', updateExpand));
  document.querySelectorAll('.close-decision').forEach(button => {
    button.addEventListener('click', () => {
      const detail = button.closest('details');
      detail.open = false;
      detail.querySelector('summary').focus({ preventScroll: true });
      detail.scrollIntoView({ block: 'nearest' });
    });
  });

  function openHash() {
    if (!location.hash.startsWith('#d-')) return;
    const detail = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (detail?.matches('details.decision')) {
      detail.open = true;
      requestAnimationFrame(() => detail.scrollIntoView({ block: 'start' }));
    }
  }
  document.querySelectorAll('.topic-jump').forEach(link => link.addEventListener('click', () => {
    const detail = document.getElementById(link.hash.slice(1));
    if (detail?.matches('details.decision')) detail.open = true;
    if (location.hash === link.hash) detail?.scrollIntoView({ block: 'start' });
  }));
  window.addEventListener('hashchange', openHash);
  openHash();

  const rows = [...document.querySelectorAll('tr[data-file]')];
  document.getElementById('file-filter').addEventListener('input', event => {
    const query = event.target.value.trim().toLowerCase();
    let count = 0;
    rows.forEach(row => {
      row.hidden = !row.dataset.file.includes(query);
      if (!row.hidden) count++;
    });
    document.getElementById('file-count').textContent = query ? `${count} of 60 changed files` : '60 changed files';
    document.getElementById('no-files').hidden = count !== 0;
  });

  function renderSource(side, line) {
    const source = data.sources[activePath];
    if (!source) return;
    activeSide = side;
    tabs.forEach(tab => {
      const selected = tab.dataset.side === side;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `tab-${side}`);
    title.textContent = activePath;
    revision.textContent = side === 'diff' ? `${data.shas.base.slice(0,8)} → ${data.shas.head.slice(0,8)}`
      : activePath === 'pr.json' ? 'Supplied PR bundle' : `${side} · ${data.shas[side].slice(0,12)}`;
    code.replaceChildren();
    const text = source[side];
    if (!text) {
      const empty = document.createElement('span');
      empty.className = 'empty-source';
      empty.textContent = side === 'base' ? 'This file is absent from the base.' : 'No source available for this view.';
      code.append(empty);
    } else {
      const fragment = document.createDocumentFragment();
      const lines = text.split('\n');
      if (lines.at(-1) === '') lines.pop();
      lines.forEach((textLine, index) => {
        const item = document.createElement('span');
        item.className = 'code-line';
        item.dataset.line = String(index + 1);
        if (side === 'diff') {
          if (textLine.startsWith('+') && !textLine.startsWith('+++')) item.classList.add('added');
          if (textLine.startsWith('-') && !textLine.startsWith('---')) item.classList.add('removed');
          if (textLine.startsWith('@@')) item.classList.add('hunk');
        }
        if (line === index + 1) item.classList.add('highlight');
        const number = document.createElement('span');
        number.className = 'line-number';
        number.setAttribute('aria-hidden', 'true');
        number.textContent = String(index + 1);
        item.append(number, document.createTextNode(textLine || ' '));
        fragment.append(item);
      });
      code.append(fragment);
    }
    panel.scrollTop = 0;
    panel.scrollLeft = 0;
    requestAnimationFrame(() => {
      const highlighted = code.querySelector('.highlight');
      if (highlighted) panel.scrollTop = Math.max(0, highlighted.offsetTop - panel.offsetTop - 80);
    });
  }

  document.querySelectorAll('.evidence-link').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (!dialog.showModal || !data.sources[link.dataset.source]) return;
    event.preventDefault();
    activePath = link.dataset.source;
    activeLine = link.dataset.line ? Number(link.dataset.line) : undefined;
    renderSource(link.dataset.side || 'diff', activeLine);
    dialog.showModal();
  }));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => renderSource(tab.dataset.side, tab.dataset.side === activeSide ? activeLine : undefined));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      renderSource(tabs[next].dataset.side);
      tabs[next].focus();
    });
  });
  document.getElementById('close-evidence').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
