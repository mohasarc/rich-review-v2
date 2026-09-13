"use strict";

class PostalReviewPage {
  constructor() {
    this.step = 0;
    this.scenario = "refresh-ok";
    this.sourceTrigger = null;
    this.drawers = {
      definitions: {
        field: "definitionsByIdentity", title: "Where is this symbol defined?",
        key: "formatSymbolIdentity(identity)", value: "Promise<readonly SymbolOverviewNode[]>",
        repeat: "The service returns the same stored promise.",
        note: "findDefinitions still runs in TypeScript. Its observer fires inside the factory, so a hit does not repeat the search.",
        lines: "68:78",
      },
      references: {
        field: "referencesByIdentity", title: "Which locations refer to this symbol?",
        key: "formatSymbolIdentity(identity)", value: "Promise<readonly SemanticReferenceLocation[]>",
        repeat: "referenceLocations reuses its promise; findReferences builds a projection on every access.",
        note: "Callers and references share this location search. The synchronous discovery runs before Promise.resolve can wrap its result; a throw leaves no cache entry.",
        lines: "163:177",
      },
      targets: {
        field: "callTargetsByIdentity", title: "Which definition is the call target?",
        key: "formatSymbolIdentity(identity)", value: "Promise<CallTargetResolution>",
        repeat: "The service returns the same stored resolution promise.",
        note: "The existing resolveCallTarget routine consumes findDefinitions. The target and definition caches remain different handles despite sharing a key string.",
        lines: "103:106",
      },
      callers: {
        field: "callersByIdentity", title: "Who calls this symbol?",
        key: "formatSymbolIdentity(identity)", value: "Promise<readonly CallEdge[]>",
        repeat: "The service returns the same stored caller promise.",
        note: "This cached promise projects the shared reference-location promise through CallerFinder. Sharing a dependency does not merge the two cache entries.",
        lines: "108:115",
      },
      callees: {
        field: "calleesByIdentity", title: "What does this symbol call?",
        key: "formatSymbolIdentity(identity)", value: "Promise<readonly CallEdge[]>",
        repeat: "The service returns the same stored callee promise.",
        note: "The existing TypeScript findCallees routine still receives workspace state, the current file list and this service as its position-definition resolver.",
        lines: "117:127",
      },
      positions: {
        field: "definitionsByPosition", title: "What does the name at this position mean?",
        key: "relativePath + ':' + node.getStart()", value: "readonly SemanticNodeLocation[] (not a promise)",
        repeat: "Reuse locations, including []; rehydrate nodes and return a fresh output array each time.",
        note: "Each location keeps a file path, start and syntax kind. Rehydration looks in the project source file, then falls back to workspace state. This algorithm is retained.",
        lines: "134:160",
      },
    };
    const initial = {
      event: "A completed refresh has established the current turn.",
      before: ["P1 · current ticket", "ready", "no operation pending"],
      after: ["P1 · current ticket", "ready", "no operation pending"],
      note: "Both versions already reuse entries within a turn. This PR extracts the clearing mechanism.",
    };
    const releaseStart = {
      event: "Call release. The graph returns a promise held pending.",
      before: [null, "release pending", "resolved; graph promise not awaited"],
      after: [null, "release pending", "pending; awaits service → graph"],
      note: "Both versions clear before starting project release. The changed behavior is the return path: the backend now waits for that release.",
    };
    const releaseQuery = {
      event: "While graph release is pending, another lookup asks for the same key.",
      before: ["P2 · new ticket", "release pending", "already resolved"],
      after: ["P2 · new ticket", "release pending", "still pending"],
      note: "There is no release lock in this cache mechanism. The old entry is gone, but a new query can populate a new entry. The added boundary test performs this lookup.",
    };
    this.scenarios = {
      "refresh-ok": [initial, {
        event: "Refresh the same files. Workspace-state refresh is still pending.",
        before: ["P1 · current ticket", "refresh completed", "refresh pending on workspace state"],
        after: ["P1 · current ticket", "refresh completed", "refresh pending on workspace state"],
        note: "The refresh path has not reached beginTurn. The old entries remain in both versions. This example uses workspace coverage.",
      }, {
        event: "Workspace-state refresh succeeds. Call beginTurn(files).",
        before: [null, "ready", "refresh resolved"],
        after: [null, "ready", "refresh resolved"],
        note: "Unchanged files still start a new semantic-cache turn. Before: six manual clears. After: one synchronous scope call clears all registered handles.",
      }, {
        event: "Look up the same key again in the new turn.",
        before: ["P2 · new ticket", "ready", "no operation pending"],
        after: ["P2 · new ticket", "ready", "no operation pending"],
        note: "Both versions run the factory again. The new core abstraction changes who implements clearing, not this successful-turn behavior.",
      }],
      "refresh-fail": [initial, {
        event: "Refresh starts, but workspace-state preparation rejects.",
        before: ["P1 · current ticket", "refresh completed", "refresh rejected"],
        after: ["P1 · current ticket", "refresh completed", "refresh rejected"],
        note: "Neither version reaches beginTurn. The current semantic-cache entries and service file list are retained. This does not assert rollback of earlier source-cache or graph work.",
      }, {
        event: "Ask for the cached key again.",
        before: ["P1 · same ticket", "ready", "no operation pending"],
        after: ["P1 · same ticket", "ready", "no operation pending"],
        note: "There is no extra factory call for that cached entry. The failed-refresh test observes one definition search across the failure.",
      }],
      "release-ok": [initial, releaseStart, releaseQuery, {
        event: "The project graph’s release promise resolves.",
        before: ["P2 · new ticket", "release fulfilled", "already resolved earlier"],
        after: ["P2 · new ticket", "release fulfilled", "now resolves"],
        note: "The new backend completion is a release barrier. Resolving project release does not perform a second cache clear, so the intervening query’s entry remains.",
      }],
      "release-fail": [initial, releaseStart, releaseQuery, {
        event: "The project graph’s release promise rejects.",
        before: ["P2 · new ticket", "release rejected", "already resolved; rejection not forwarded"],
        after: ["P2 · new ticket", "release rejected", "now rejects with the graph’s failure"],
        note: "Before, the graph promise was discarded by the service. After, its rejection reaches the backend caller. Neither path restores the old entry. Host handling of a discarded rejection is outside this model.",
      }],
      "old-promise": [{
        event: "The cache stores promise P1. A caller also holds P1.",
        before: ["P1 · still pending", "ready", "no lifecycle operation pending"],
        after: ["P1 · still pending", "ready", "no lifecycle operation pending"],
        note: "The ticket is the promise itself. Its result does not have to exist before the cache can share it.",
        held: "Outside the cabinet: the first caller holds P1, still pending.",
      }, {
        event: "A successful refresh starts a new turn and clears the maps.",
        before: [null, "ready", "refresh resolved"],
        after: [null, "ready", "refresh resolved"],
        note: "Clearing removes the cache’s reference. It does not cancel P1 or take it away from the caller.",
        held: "Outside the cabinet: the first caller still holds P1, still pending.",
      }, {
        event: "The next lookup stores P2 under the same key.",
        before: ["P2 · new-turn ticket", "ready", "no operation pending"],
        after: ["P2 · new-turn ticket", "ready", "no operation pending"],
        note: "The handle and key can be reused. No generation number is needed by this implementation because it does not install promise-settlement cache writes.",
        held: "Outside the cabinet: the first caller still holds P1. The cache now holds P2.",
      }, {
        event: "P1 finally resolves with its old value.",
        before: ["P2 · unchanged", "ready", "no operation pending"],
        after: ["P2 · unchanged", "ready", "no operation pending"],
        note: "The existing caller can receive P1’s result. P1’s settlement cannot overwrite P2 through this cache mechanism. The added core test pins this behavior.",
        held: "Outside the cabinet: the first caller receives P1’s old value. The next cache lookup still gets P2.",
      }],
    };
    this.bind();
    this.showDrawer("definitions");
    this.renderReplay();
  }

  bind() {
    document.addEventListener("click", (event) => {
      const sourceButton = event.target.closest("[data-source]");
      if (sourceButton) this.openSource(sourceButton);
      const drawerButton = event.target.closest("[data-drawer]");
      if (drawerButton) this.showDrawer(drawerButton.dataset.drawer);
      const drawerLink = event.target.closest("[data-select-drawer]");
      if (drawerLink) this.showDrawer(drawerLink.dataset.selectDrawer);
      const replayLink = event.target.closest("[data-replay]");
      if (replayLink) {
        this.scenario = replayLink.dataset.replay;
        this.step = 0;
        document.querySelector("#scenario").value = this.scenario;
        this.renderReplay();
      }
    });
    document.querySelector(".drawer-picker").addEventListener("keydown", (event) => {
      const tabs = [...document.querySelectorAll("[data-drawer]")];
      const index = tabs.indexOf(document.activeElement);
      if (index === -1) return;
      const movement = {ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1};
      let next;
      if (event.key in movement) next = (index + movement[event.key] + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      this.showDrawer(tabs[next].dataset.drawer);
      tabs[next].focus();
    });
    document.querySelector("#scenario").addEventListener("change", (event) => {
      this.scenario = event.target.value;
      this.step = 0;
      this.renderReplay();
    });
    document.querySelector("#previous-step").addEventListener("click", () => {
      this.step = Math.max(0, this.step - 1);
      this.renderReplay();
    });
    document.querySelector("#next-step").addEventListener("click", () => {
      this.step = Math.min(this.scenarios[this.scenario].length - 1, this.step + 1);
      this.renderReplay();
    });
    const dialog = document.querySelector("#source-dialog");
    document.querySelector("#close-source").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => this.sourceTrigger?.focus({preventScroll: true}));
  }

  showDrawer(key) {
    const drawer = this.drawers[key];
    document.querySelectorAll("[data-drawer]").forEach((tab) => {
      const active = tab.dataset.drawer === key;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    const panel = document.querySelector("#drawer-detail");
    panel.setAttribute("aria-labelledby", `tab-${key}`);
    panel.replaceChildren();
    panel.append(this.element("p", drawer.field, "kicker"), this.element("h3", drawer.title));
    const definitionList = document.createElement("dl");
    for (const [label, content] of [["Key", drawer.key], ["Stored entry", drawer.value], ["On repeat", drawer.repeat]]) {
      definitionList.append(this.element("dt", label), this.element("dd", content));
    }
    panel.append(definitionList, this.element("p", drawer.note));
    const source = this.element("button", "Inspect this lookup ↗");
    source.dataset.source = "service-head";
    source.dataset.lines = drawer.lines;
    panel.append(source);
  }

  renderReplay() {
    const steps = this.scenarios[this.scenario];
    const frame = steps[this.step];
    document.querySelector("#step-label").textContent = `${this.step + 1} / ${steps.length} · ${frame.event}`;
    document.querySelector("#step-explanation").textContent = frame.note;
    for (const version of ["before", "after"]) {
      const [ticket, project, backend] = frame[version];
      const slot = document.querySelector(`#${version}-ticket`);
      slot.textContent = ticket ?? "empty · no cached entry";
      slot.classList.toggle("empty", ticket === null);
      document.querySelector(`#${version}-project`).textContent = project;
      document.querySelector(`#${version}-backend`).textContent = backend;
    }
    document.querySelector("#previous-step").disabled = this.step === 0;
    document.querySelector("#next-step").disabled = this.step === steps.length - 1;
    const held = document.querySelector("#held-ticket");
    held.hidden = !frame.held;
    held.textContent = frame.held || "";
  }

  openSource(trigger) {
    const key = trigger.dataset.source;
    const source = window.SOURCES[key];
    if (!source) return;
    const requested = (trigger.dataset.lines || `1:${source.lines.length}`).split(":").map(Number);
    const start = Math.max(1, requested[0]);
    const end = Math.min(source.lines.length, requested[1] || start);
    this.sourceTrigger = trigger;
    document.querySelector("#source-title").textContent = source.path;
    document.querySelector("#source-version").textContent = `${source.version}${source.sha ? ` · ${source.sha.slice(0, 12)}` : " · supplied input"}`;
    document.querySelector("#source-range").textContent = `Lines ${start}–${end} · exact excerpt; line numbers preserved`;
    const code = document.querySelector("#source-code");
    code.replaceChildren();
    source.lines.slice(start - 1, end).forEach((line, index) => {
      const row = this.element("span", "", "source-line");
      row.append(this.element("span", String(start + index), "line-number"), document.createTextNode(line));
      code.append(row);
    });
    document.querySelector("#full-source").href = `evidence/sources.html#${key}-L${start}`;
    document.querySelector("#source-dialog").showModal();
    code.scrollTop = 0;
    code.scrollLeft = 0;
  }

  element(tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text;
    if (className) node.className = className;
    return node;
  }
}

new PostalReviewPage();
