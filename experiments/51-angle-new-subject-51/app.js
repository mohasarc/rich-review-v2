(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const positions = [];
  const back = document.getElementById('back');
  const openAncestors = element => {
    for (let e = element; e; e = e.parentElement) if (e.tagName === 'DETAILS') e.open = true;
  };
  const remember = element => {
    positions.push({ x: scrollX, y: scrollY, focus: element, hash: location.hash });
    back.hidden = false;
  };
  const jump = (target, origin) => {
    remember(origin);
    openAncestors(target);
    history.replaceState(null, '', '#' + target.id);
    requestAnimationFrame(() => {
      target.scrollIntoView({block:'start'});
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
    });
  };
  const restore = () => {
    const position = positions.pop();
    if (!position) return false;
    history.replaceState(null, '', position.hash || location.pathname + location.search);
    position.focus?.focus({preventScroll:true});
    scrollTo({left:position.x,top:position.y,behavior:'instant'});
    back.hidden = positions.length === 0;
    return true;
  };
  back.addEventListener('click', restore);
  document.addEventListener('click', event => {
    const a = event.target.closest('a');
    if (!a || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (a.hasAttribute('data-back')) {
      if (restore()) event.preventDefault();
      return;
    }
    if (!a.hasAttribute('data-jump')) return;
    const target = document.getElementById(a.hash.slice(1));
    if (target) { event.preventDefault(); jump(target, a); }
  });
  for (const details of document.querySelectorAll('details.example')) {
    details.querySelector(':scope > summary').addEventListener('click', event => {
      if (!details.open) remember(event.currentTarget);
    });
  }
  for (const stepper of document.querySelectorAll('[data-stepper]')) {
    const buttons = [...stepper.querySelectorAll('[data-step]')];
    const panels = [...stepper.querySelectorAll('[data-panel]')];
    const select = index => {
      buttons.forEach((b,i) => b.setAttribute('aria-pressed', String(i === index)));
      panels.forEach((p,i) => p.hidden = i !== index);
    };
    buttons.forEach((b,i) => b.addEventListener('click', () => select(i)));
    select(0);
  }
  const initial = document.getElementById(location.hash.slice(1));
  if (initial) {
    openAncestors(initial);
    requestAnimationFrame(() => initial.scrollIntoView({block:'start'}));
  }
  addEventListener('hashchange', () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target) openAncestors(target);
  });
})();
