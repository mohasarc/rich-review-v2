(() => {
  "use strict";
  const ordered = window.REVIEW_NODES;
  const nodes = new Map(ordered.map((node) => [node.id, node]));
  const page = document.getElementById("page");
  const trailList = document.getElementById("trail");
  const chapterList = document.getElementById("chapter-list");
  const returnButton = document.getElementById("return");
  const modeButton = document.getElementById("reading-mode");
  const announcement = document.getElementById("announcement");
  const escape = (text) => String(text).replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const questionLink = (c) => '<a class="question-link' + (c.continued ? " continue" : "") +
    '" href="#' + c.target + '" data-go="' + c.target + '"><span><span class="q-title">' +
    escape(c.question) + '</span><span class="q-hint">' + escape(c.hint) +
    '</span></span><span class="q-arrow" aria-hidden="true">→</span></a>';

  function readHash() {
    const hash = location.hash.slice(1);
    const linear = hash.startsWith("read/");
    const id = linear ? hash.slice(5) : hash;
    return { id: nodes.has(id) ? id : "overview", linear };
  }

  function ancestors(id) {
    const node = nodes.get(id);
    return (node.parent ? ancestors(node.parent) : []).concat([{ id, scroll: 0, focus: null }]);
  }

  const initial = readHash();
  let linear = initial.linear;
  let trail = ancestors(initial.id);
  const hasSavedState = history.state?.experiment === 24 && Array.isArray(history.state.trail) &&
      history.state.trail.every((entry) => nodes.has(entry.id)) &&
      history.state.trail.at(-1)?.id === initial.id;
  if (hasSavedState) {
    trail = history.state.trail;
  }
  let current = initial.id;
  history.scrollRestoration = "manual";

  function saveCurrent() {
    trail[trail.length - 1].scroll = window.scrollY;
    const active = document.activeElement;
    trail[trail.length - 1].focus = active?.dataset?.go || null;
    history.replaceState({ experiment: 24, trail, linear }, "", location.href);
  }

  function commit() {
    history.pushState({ experiment: 24, trail, linear }, "",
      "#" + (linear ? "read/" : "") + current);
  }

  function nodeMarkup(node) {
    const ordinal = ordered.filter((n) => n.layer === "mechanism").findIndex((n) => n.id === node.id) + 1;
    const label = node.layer === "overview" ? "The complete overview" :
      node.layer === "evidence" ? "Source evidence" : "Question " + String(ordinal).padStart(2, "0") + " of 07";
    return '<article id="node-' + node.id + '" data-node="' + node.id + '" aria-labelledby="title-' + node.id + '">' +
      '<div class="node-meta"><span>symnav #127</span><span class="dot" aria-hidden="true"></span><span>' +
      label + '</span></div>' +
      (node.recall ? '<p class="inherited"><a href="#overview" data-go="overview">From the overview ↗</a> &nbsp; ' + escape(node.recall) + '</p>' : "") +
      '<h1 id="title-' + node.id + '" tabindex="-1">' + escape(node.title) + '</h1><p class="lede">' +
      escape(node.lede) + '</p>' + node.body +
      '<footer class="questions" aria-label="Questions after ' + escape(node.short) + '"><h2>Where does your curiosity go next?</h2>' +
      '<div class="question-list">' + node.choices.map(questionLink).join("") + '</div></footer></article>';
  }

  function renderNavigation() {
    trailList.innerHTML = trail.map((entry, index) => '<li>' +
      (index === trail.length - 1 ? '<span aria-current="page">' + escape(nodes.get(entry.id).short) + '</span>' :
        '<a href="#' + entry.id + '" data-trail="' + index + '">' + escape(nodes.get(entry.id).short) + '</a>') +
      '</li>').join("");
    returnButton.hidden = trail.length < 2;
    chapterList.innerHTML = ordered.filter((node) => node.layer === "mechanism").map((node) =>
      '<li><a href="#' + node.id + '" data-go="' + node.id + '"' +
      (current === node.id || nodes.get(current).parent === node.id ? ' aria-current="page"' : "") + '>' +
      escape(node.short) + '</a></li>').join("");
    modeButton.setAttribute("aria-pressed", String(linear));
    modeButton.textContent = linear ? "One question at a time" : "Read in order";
    document.title = nodes.get(current).title + " · symnav #127";
  }

  let renderSequence = 0;
  function render({ restore = false, focus = false } = {}) {
    const sequence = ++renderSequence;
    page.classList.toggle("linear", linear);
    page.innerHTML = linear ?
      '<div class="linear-banner">Read from top to bottom: the overview, seven explanations, then their source evidence. Every question still works as a jump.</div>' +
      ordered.map(nodeMarkup).join("") : nodeMarkup(nodes.get(current));
    renderNavigation();
    page.querySelectorAll('[data-widget="turn"]').forEach((widget) => showTurn(widget, "repeat"));
    page.querySelectorAll('[data-widget="release"]').forEach((widget) => showRelease(widget, "before"));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (sequence !== renderSequence) return;
      const entry = trail.at(-1);
      const article = document.getElementById("node-" + current);
      if (restore) {
        window.scrollTo({ top: entry.scroll || 0, behavior: "instant" });
      } else if (linear) {
        article.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      if (focus) {
        const target = restore && entry.focus ?
          article.querySelector('a[data-go="' + entry.focus + '"]') : null;
        (target || document.getElementById("title-" + current)).focus({ preventScroll: true });
        announcement.textContent = nodes.get(current).title;
      }
    }));
  }

  function go(id) {
    if (!nodes.has(id)) return;
    saveCurrent();
    if (id === current) {
      const article = document.getElementById("node-" + id);
      article.scrollIntoView({ behavior: "instant", block: "start" });
      document.getElementById("title-" + id).focus({ preventScroll: true });
      return;
    }
    const prior = trail.findLastIndex((entry) => entry.id === id);
    const returning = prior !== -1;
    trail = returning ? trail.slice(0, prior + 1) :
      trail.concat([{ id, scroll: 0, focus: null }]);
    current = id;
    commit();
    render({ restore: returning, focus: true });
  }

  function returnTo(index) {
    if (index < 0 || index >= trail.length - 1) return;
    saveCurrent();
    trail = trail.slice(0, index + 1);
    current = trail.at(-1).id;
    commit();
    render({ restore: true, focus: true });
  }

  function restoreFromHistory() {
    const parsed = readHash();
    current = parsed.id;
    linear = parsed.linear;
    const state = history.state;
    const saved = state?.experiment === 24 && state.trail?.at(-1)?.id === current;
    trail = saved ? state.trail : ancestors(current);
    render({ restore: saved, focus: true });
  }

  document.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const route = event.target.closest("a[data-go]");
    if (route) {
      event.preventDefault();
      go(route.dataset.go);
      return;
    }
    const previous = event.target.closest("a[data-trail]");
    if (previous) {
      event.preventDefault();
      returnTo(Number(previous.dataset.trail));
      return;
    }
    const turnButton = event.target.closest("button[data-turn]");
    if (turnButton) showTurn(turnButton.closest("[data-widget]"), turnButton.dataset.turn);
    const releaseButton = event.target.closest("button[data-release]");
    if (releaseButton) showRelease(releaseButton.closest("[data-widget]"), releaseButton.dataset.release);
  });

  returnButton.addEventListener("click", () => returnTo(trail.length - 2));
  modeButton.addEventListener("click", () => {
    saveCurrent();
    linear = !linear;
    commit();
    render({ focus: true });
  });
  window.addEventListener("popstate", restoreFromHistory);
  window.addEventListener("hashchange", restoreFromHistory);
  window.addEventListener("pagehide", saveCurrent);

  const token = (text, kind = "") => '<span class="token ' + kind + '">' + text + '</span>';
  const row = (label, text) => '<div class="trace-row"><span>' + label + '</span><span>' + text + '</span></div>';

  function showTurn(widget, kind) {
    const frames = {
      repeat: {
        event: "A repeated lookup, with no boundary between calls",
        cache: token("key → A"), next: token("A"),
        conclusion: "The existing entry answers again."
      },
      success: {
        event: "Refresh succeeds, even with unchanged files",
        cache: token("all six clear", "empty"), next: token("B · newly created"),
        conclusion: "The next successful turn gets a fresh entry."
      },
      failure: {
        event: "Refresh rejects before beginTurn",
        cache: token("key → A"), next: token("A"),
        conclusion: "The cached entry survives the failed refresh."
      },
      release: {
        event: "releaseTransientResources starts",
        cache: token("all six clear", "empty"), next: token("B · newly created"),
        conclusion: "A later lookup can refill the handle, even while project cleanup is pending."
      }
    };
    const frame = frames[kind];
    widget.querySelectorAll("[data-turn]").forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.turn === kind)));
    widget.querySelector('[data-screen="turn"]').innerHTML =
      row("Event", frame.event) + row("Immediately after", frame.cache) + row("Next lookup", frame.next) +
      '<p class="trace-conclusion">' + frame.conclusion + '</p>';
  }

  function showRelease(widget, kind) {
    const frames = {
      before: {
        entries: token("old cached entries"), projects: "Not started",
        backend: "No release call yet", held: token("old promise A", "old"),
        conclusion: "The service still has the current turn's entries."
      },
      pending: {
        entries: token("cleared synchronously", "empty"), projects: token("pending", "empty"),
        backend: token("pending", "empty"), held: token("A can still settle", "old"),
        conclusion: "The cache has forgotten; the caller is still waiting."
      },
      resolved: {
        entries: token("old entries remain absent", "empty"), projects: token("resolved"),
        backend: token("resolved"), held: token("A is not revoked", "old"),
        conclusion: "Project cleanup has completed, so backend release can complete."
      },
      rejected: {
        entries: token("old entries remain absent", "empty"), projects: token("rejects with E", "failure"),
        backend: token("rejects with E", "failure"), held: token("A is not revoked", "old"),
        conclusion: "The cleanup error reaches the caller. The old entries are not restored."
      }
    };
    const frame = frames[kind];
    widget.querySelectorAll("[data-release]").forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.release === kind)));
    widget.querySelector('[data-screen="release"]').innerHTML =
      row("Six cache handles", frame.entries) + row("Project graph", frame.projects) +
      row("Backend release", frame.backend) + row("Already held value", frame.held) +
      '<p class="trace-conclusion">' + frame.conclusion + '</p>';
  }

  history.replaceState({ experiment: 24, trail, linear }, "", location.href);
  render({ restore: hasSavedState });
})();
