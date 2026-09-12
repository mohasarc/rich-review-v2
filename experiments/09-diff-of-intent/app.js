// Browsing state stays in the document. This page never stores feedback or notes.
(() => {
  function revealHash() {
    const raw = location.hash.slice(1);
    let id;
    try { id = decodeURIComponent(raw); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    if (target.classList.contains('intent-row')) target.open = true;
    let parent = target.parentElement;
    while (parent) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
      parent = parent.parentElement;
    }
    if (raw) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
  document.querySelectorAll('.close-row').forEach(button => {
    button.addEventListener('click', () => {
      const row = button.closest('.intent-row');
      row.open = false;
      row.querySelector('summary').focus({ preventScroll: true });
      row.scrollIntoView({ block: 'start' });
    });
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash) revealHash();
  });
  window.addEventListener('hashchange', revealHash);
  revealHash();
})();
