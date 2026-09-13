/* Progressive navigation only. No requests, responses, persistence, or UI state store. */
(() => {
  "use strict";
  const targetOf = (hash) => {
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return null; }
  };
  const reveal = (target) => {
    let changed = false;
    for (let node = target; node; node = node.parentElement) {
      if (node instanceof HTMLDetailsElement && !node.open) {
        node.open = true;
        changed = true;
      }
    }
    return changed;
  };
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.("a[data-exit]");
    if (!link) return;
    const url = new URL(link.href.baseVal || link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) return;
    const target = targetOf(url.hash);
    if (!target) return;
    reveal(target);
    const returnLink = target.querySelector(":scope > .depth-header [data-return]");
    if (returnLink && link.id) {
      returnLink.href = `#${link.id}`;
      const card = link.closest("[data-claim]");
      const context = card?.querySelector("h3")?.textContent || link.getAttribute("aria-label") || link.textContent;
      returnLink.textContent = `← Return to ${context.replace(/\s*↗\s*$/, "").replace(/\. Open explanation\.$/, "")}`;
    }
    // Leave the actual jump to the browser, preserving history, new-tab and no-JS behavior.
  });
  const followHash = () => {
    const target = targetOf(location.hash);
    if (!target) return;
    const revealed = reveal(target);
    const focus = target.matches("a,button,summary,input,[tabindex]")
      ? target : target.querySelector("h1,h2,h3,summary") || target;
    if (!focus.hasAttribute("tabindex") && !focus.matches("a,button,summary,input")) focus.tabIndex = -1;
    focus.focus({ preventScroll: true });
    if (revealed) target.scrollIntoView({block: "start"});
  };
  window.addEventListener("hashchange", followHash);
  followHash();
})();
