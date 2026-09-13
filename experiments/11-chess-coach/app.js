(() => {
  'use strict';

  const position = document.querySelector('.boundary-board');
  document.querySelectorAll('button[data-position]').forEach(button => {
    button.addEventListener('click', () => {
      position.dataset.position = button.dataset.position;
      document.querySelectorAll('button[data-position]').forEach(peer => {
        peer.setAttribute('aria-pressed', String(peer === button));
      });
    });
  });

  const analysisCards = [...document.querySelectorAll('.analysis-card')];
  const expandButton = document.querySelector('#expand-analysis');
  const syncExpandLabel = () => {
    expandButton.textContent = analysisCards.every(card => card.open)
      ? 'Collapse all analysis' : 'Expand all analysis';
  };
  expandButton.addEventListener('click', () => {
    const open = !analysisCards.every(card => card.open);
    analysisCards.forEach(card => { card.open = open; });
    syncExpandLabel();
  });
  analysisCards.forEach(card => card.addEventListener('toggle', syncExpandLabel));

  const revealHash = () => {
    const target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    if (target.matches('.analysis-card')) {
      target.open = true;
      requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
    }
  };
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('a[href^="#analysis-"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target) target.open = true;
    });
  });
  revealHash();

  const replySlider = document.querySelector('#reply-delay');
  const showTimeoutModel = () => {
    const milliseconds = Number(replySlider.value);
    document.querySelector('#reply-delay-value').textContent = `${milliseconds} ms`;
    document.querySelectorAll('.timing-lane').forEach(lane => {
      const deadline = Number(lane.dataset.deadline);
      lane.querySelector('.reply-mark').style.left = `${milliseconds / 600 * 100}%`;
      lane.querySelector('.lab-result').textContent = milliseconds < deadline
        ? 'reply before limit' : milliseconds === deadline
          ? 'at boundary*' : 'limit before reply';
    });
  };
  replySlider.addEventListener('input', showTimeoutModel);
  showTimeoutModel();

  const spillButtons = [...document.querySelectorAll('[data-spill-bytes]')];
  const showSpillModel = bytes => {
    spillButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.spillBytes) === bytes));
    });
    document.querySelector('#spill-base').textContent = bytes > 0 ? 'Spills to a file' : 'Stays inline';
    document.querySelector('#spill-head').textContent = bytes > 65536 ? 'Spills to a file' : 'Stays inline';
    document.querySelector('#spill-consequence').textContent = bytes <= 65536
      ? 'At 64 KiB, only the base setup requires a file. The head adapter creates the directory even when output stays inline.'
      : 'Above 64 KiB, both setups cross their inline threshold. File creation and removal can now be observed separately from directory existence.';
  };
  spillButtons.forEach(button => button.addEventListener('click', () => showSpillModel(Number(button.dataset.spillBytes))));
  showSpillModel(65536);
})();
