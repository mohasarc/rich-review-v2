(() => {
  const rows = [...document.querySelectorAll('[data-row]')];
  if (rows.length) {
    const search = document.querySelector('#search');
    const witnessed = document.querySelector('#witnessed');
    const count = document.querySelector('#count');
    document.querySelector('[data-filters]').hidden = false;
    const apply = () => {
      const words = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      rows.forEach(row => {
        const text = row.textContent.toLocaleLowerCase();
        row.hidden = !words.every(word => text.includes(word)) || (witnessed.checked && row.dataset.witnessed !== 'true');
        if (!row.hidden) shown++;
      });
      count.textContent = `${shown} of ${rows.length} surfaces · ${shown === rows.length ? 'complete table visible' : 'filtered reading'}`;
      document.querySelector('#no-results').hidden = shown !== 0;
    };
    const reset = () => { search.value = ''; witnessed.checked = false; apply(); };
    const revealDestination = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = rows.find(row => row.id === id);
      if (!target) return;
      if (target.hidden) reset();
      requestAnimationFrame(() => { target.scrollIntoView({block:'start'}); target.focus({preventScroll:true}); });
    };
    search.addEventListener('input', apply);
    witnessed.addEventListener('change', apply);
    document.querySelector('#reset').addEventListener('click', reset);
    window.addEventListener('hashchange', revealDestination);
    apply();
    revealDestination();
  }
  const origin = new URLSearchParams(location.search).get('from');
  if (origin && /^r(?:03|06|08|12|18|23|27|29|35|50|49-report|49-23-original|49-23-revised|49-29-original|49-29-revised)$/.test(origin)) {
    document.querySelectorAll('[data-return]').forEach(link => {
      link.href = `index.html#${origin}`;
      link.textContent = `← Return to row ${origin.slice(1)}`;
    });
  }
})();
