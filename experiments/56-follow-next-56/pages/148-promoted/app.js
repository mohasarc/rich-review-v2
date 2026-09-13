(() => {
  "use strict";
  const data = window.REVIEW_DATA;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const viewport = $("#viewport"), world = $("#world");
  const W = 1680, H = 1080, INNER_W = 1200, INNER_H = 920;
  const colors = { mint: "#85dcb5", amber: "#efc278", blue: "#96bded", rose: "#ecadbb" };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const decisions = new Map(data.decisions.map(d => [d.id, d]));
  const nodes = new Map();
  const sequence = ["root", ...data.rooms.flatMap(room => [room.id, ...room.decisions])];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let camera = { x: 0, y: 0, scale: 1 }, active = "root", animation = 0, manualFocus = true;
  let rootScale = 1, drag = null, moved = false, resizeTimer, wheelTimer;
  const pointers = new Map();
  let pinch = null;

  const outlines = {
    D01: "Stabilize and freeze 38 CLI copies; the active CLI stays on them.",
    D02: "Package folders own mechanisms; no internal production dependencies.",
    D03: "Remove policy-testing export, its lint gate and related tests.",
    D04: "Node-free host types; executor/environment inputs; no policy → currentSystem(); failed load at construction rejects calls.",
    D05: "Host supplies readiness command; startup runs it cold, telemetry off.",
    D06: "Reuse controls; separate status timeout; disabled status/stop and errors reach host.",
    D07: "Lazy, memoized guards: present → not starting → version → responsive.",
    D08: "Preserve routes; fresh local executors; warm-up runs independently.",
    D09: "Only safe failures retry locally. Uncertain/accepted work is not replayed.",
    D10: "Own capture, spool codec and controlled errors; dispose malformed output.",
    D11: "Validate coordinates before composition; reuse the supplied endpoint.",
    D12: "One registry ownership predicate; narrow queries and full mutation checks.",
    D13: "Ping/stop: protocol+instance, no token. Others add token; identify/terminate/kill drop protocol.",
    D14: "Keep execution, delivery, worker, resource and activity owners; bind callbacks.",
    D15: "Package process/worker entries load the injected executor; no entry API.",
    D16: "Daemon owns injectable wall/monotonic sources for timestamps and durations.",
    D17: "Idle still starts at construction, resets at acceptance. Readiness/completion fixes deferred.",
    D18: "37 tests move; generic fixtures and built entries replace CLI coupling.",
    D19: "Worker/CLI version rejection becomes a direct factory test.",
    D20: "Generic readiness drops CLI startup/result timing assertions.",
    D21: "Windows forced-exit cleanup uses an observer; diagnostic absent.",
    D22: "Freeze hash normalizes CRLF, still detects source edits.",
    D23: "New checks: exports, Node-free types, side-effect-only entries.",
    D24: "Disable parallel test files in the daemon's Vitest configuration.",
    D25: "Add tsx and lockfile entry for moved TypeScript test helpers.",
  };

  function tag(name, attrs = {}, text) {
    const element = document.createElement(name);
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function svgBox(x, y, w, h, label, color = colors.mint, small, dashed = false) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#1a282d" stroke="${color}" stroke-width="2" ${dashed ? 'stroke-dasharray="7 6"' : ""}/><text x="${x + 14}" y="${y + (small ? 28 : h / 2 + 8)}" font-size="22">${escape(label)}</text>${small ? `<text x="${x + 14}" y="${y + 53}" font-size="17" fill="#a9bfbd">${escape(small)}</text>` : ""}`;
  }
  function arrow(x1, y1, x2, y2, color = colors.mint, dashed = false, label = "") {
    const horizontal = Math.abs(x2 - x1) >= Math.abs(y2 - y1);
    let end;
    if (horizontal) end = `M${x2 - Math.sign(x2 - x1) * 8},${y2 - 5} L${x2},${y2} L${x2 - Math.sign(x2 - x1) * 8},${y2 + 5}`;
    else end = `M${x2 - 5},${y2 - Math.sign(y2 - y1) * 8} L${x2},${y2} L${x2 + 5},${y2 - Math.sign(y2 - y1) * 8}`;
    return `<path d="M${x1},${y1} L${x2},${y2}" fill="none" stroke="${color}" stroke-width="2" ${dashed ? 'stroke-dasharray="7 5"' : ""}/><path d="${end}" fill="none" stroke="${color}" stroke-width="2"/>${label ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 10}" font-size="16" text-anchor="middle">${escape(label)}</text>` : ""}`;
  }
  const svg = (body, height = 200, label = "Mechanism diagram") => `<svg viewBox="0 0 1140 ${height}" role="img" aria-label="${escape(label)}">${body}</svg>`;

  function rootPicture() {
    return `<svg viewBox="0 0 1620 105" role="img" aria-label="Before: CLI composes local mechanisms. At PR head the active CLI uses frozen compatibility mechanisms, alongside a new DaemonClient package boundary.">
      <text x="0" y="17" font-size="15" fill="${colors.amber}">BASE</text>
      ${svgBox(0, 30, 76, 42, "CLI", colors.amber)}${arrow(76, 51, 115, 51, colors.amber)}
      ${svgBox(115, 30, 315, 42, "CLI-local mechanisms", colors.amber)}
      <path d="M467 11 V79" stroke="#4a5a5f"/>
      <text x="500" y="17" font-size="15" fill="${colors.amber}">HEAD / ACTIVE CLI</text>
      ${svgBox(500, 30, 76, 42, "CLI", colors.amber)}${arrow(576, 51, 615, 51, colors.amber)}
      ${svgBox(615, 30, 292, 42, "38 frozen mechanisms", colors.amber)}
      ${arrow(930, 51, 1000, 51, colors.mint, true, "staged")}
      <rect x="1014" y="0" width="604" height="82" rx="10" fill="#254f3b22" stroke="${colors.mint}" stroke-width="2"/>
      <text x="1030" y="19" font-size="15" fill="${colors.mint}">@symnav/daemon / NEW OWNERSHIP BOUNDARY</text>
      ${svgBox(1030, 30, 210, 40, "DaemonClient")}${arrow(1240, 51, 1280, 51)}${svgBox(1280, 30, 320, 40, "private mechanisms")}
      <text x="0" y="100" font-size="15" fill="#9aacae">Structural sketch · solid = selected composition; dashed = staged ownership. The CLI still executes the app-local graph.</text>
    </svg>`;
  }

  function mechanism(room) {
    if (room.id === "staging") return svg(
      svgBox(5, 4, 263, 66, "Active CLI dispatcher", colors.amber, "argv + workspace selection") + arrow(268, 37, 310, 37, colors.amber) +
      svgBox(310, 4, 822, 66, "38 app-local compatibility sources", colors.amber, "registry · startup · transport · process · execution · delivery · workers · clocks") +
      svgBox(5, 87, 263, 66, "New DaemonClient", colors.mint, "execute / control") + arrow(268, 120, 310, 120) +
      svgBox(310, 87, 822, 66, "Private package owners · no internal production dependencies", colors.mint, "policy-testing removed; local test helpers replace the temporary export") +
      `<text x="5" y="186" font-size="18" fill="#abbab8">The CLI-copy source digest normalizes CRLF; package ownership and active invocation remain separate.</text>`, 200,
      "The active CLI and the staged package each compose their own mechanisms. Only the package surface is newly portable.");
    if (room.id === "facade") return svg(
      `<rect x="5" y="7" width="350" height="127" rx="10" stroke="${colors.amber}" fill="#3b312321"/>` +
      `<text x="20" y="33" font-size="21">HOST INPUTS</text><text x="20" y="62" font-size="18">executor · module URL · environment</text><text x="20" y="90" font-size="18">readiness command + invocation</text><text x="20" y="118" font-size="18">optional policy · typed control</text>` +
      arrow(355, 70, 408, 70) + svgBox(408, 29, 245, 86, "DaemonClient", colors.mint, "Node-free declarations") +
      arrow(653, 70, 718, 70, colors.mint, true) +
      svgBox(718, 7, 409, 127, "Private Node runtime", colors.blue, "registry · routing · shared startup") +
      `<text x="732" y="97" font-size="18">status has a separate timeout</text><text x="732" y="122" font-size="18">constructor starts import()</text>` +
      `<text x="5" y="166" font-size="18" fill="#abbab8">Disabled: execute → cold; start → disabled; status / stop run. Lifecycle errors reject.</text>` +
      `<text x="5" y="194" font-size="17" fill="#abbab8">New checks lock the root declaration surface, package exports and side-effect-only entries.</text>`, 205,
      "Host inputs cross a portable public type boundary into a dynamically loaded Node runtime.");
    if (room.id === "process") return svg(
      `<text x="3" y="22" font-size="17" fill="${colors.blue}">PACKAGE BOUNDARY · selected runtime hops and composed owners</text>` +
      svgBox(3, 42, 181, 66, "process entry", colors.blue, "adopt coordinates") + arrow(184, 75, 218, 75, colors.blue) +
      svgBox(218, 42, 268, 66, "process coordinator", colors.blue, "authenticate / compose") + arrow(486, 75, 520, 75, colors.blue) +
      svgBox(520, 42, 261, 66, "execution + delivery", colors.blue, "queue / ledger / spool") + arrow(781, 75, 813, 75, colors.blue) +
      svgBox(813, 42, 324, 66, "worker thread", colors.blue, "generations → injected executor") +
      `<path d="M804,30 V122" stroke="#7291ae" stroke-dasharray="5 5"/>` +
      `<text x="5" y="147" font-size="20">Registry: startup authority</text><text x="410" y="147" font-size="20">Resources / lifetime: turn & drain callbacks</text>` +
      `<text x="5" y="181" font-size="17" fill="#abbab8">Ordinary: protocol + instance first; execution adds token. Special control paths use instance + token.</text>`, 197,
      "Package process entry composes a process coordinator, execution and delivery owners and a worker thread. Registry owns startup identity; resources and lifetime call across owner boundaries.");
    if (room.id === "clocks") return svg(
      svgBox(8, 6, 283, 68, "DaemonClock", colors.blue, "inject wall + monotonic") +
      arrow(291, 40, 338, 40, colors.blue) +
      `<text x="353" y="29" font-size="21">wall → timestamps, idle and coordination deadlines</text><text x="353" y="65" font-size="21">monotonic → queue, worker and diagnostic durations</text>` +
      `<text x="8" y="128" font-size="18" fill="${colors.amber}">IDLE EVENTS IN THIS PR</text>` +
      svgBox(8, 147, 260, 74, "construct", colors.amber, "deadline = now + interval") + arrow(268, 184, 324, 184, colors.amber) +
      svgBox(324, 147, 294, 74, "accept navigation", colors.amber, "reset that deadline") + arrow(618, 184, 672, 184, colors.amber) +
      svgBox(672, 147, 460, 74, "queue becomes idle", colors.amber, "past deadline? initiate drain") +
      `<text x="8" y="277" font-size="20" fill="#abbab8">Readiness arming + completion reset are specified as later work.</text>` +
      `<text x="8" y="309" font-size="17" fill="#abbab8">Illustrative timeline · durations omitted. A long startup / turn may consume the idle interval.</text>`, 325,
      "One owned clock supplies wall and monotonic time. The existing idle deadline starts at construction, resets on acceptance and is checked when the queue becomes idle.");
    if (room.id === "tests") return svg(
      svgBox(5, 25, 255, 65, "CLI mechanism tests", colors.amber, "37 file moves") + arrow(260, 56, 310, 56, colors.rose) +
      svgBox(310, 25, 385, 65, "Package fixtures + built entries", colors.rose, "portable mechanisms; altered oracles") + arrow(695, 56, 743, 56, colors.rose) +
      svgBox(743, 25, 389, 65, "Boundary & freeze tests", colors.rose, "exports · types · source digest") +
      `<text x="5" y="128" font-size="20">Version rejection: worker → factory. Timing assertions: removed from generic readiness.</text>` +
      `<text x="5" y="163" font-size="18" fill="#abbab8">Also: Windows observer cleanup · serial test files · a package-local tsx development dependency.</text>`, 190,
      "Mechanism tests move into the package. Worker/CLI version rejection becomes a factory assertion, readiness timing assertions disappear, and boundary and freeze tests are added.");
    return "";
  }

  const scenarios = [
    { label: "Daemon disabled", stop: -1, route: "cold", reason: "disabled", reads: 0, observations: 0, removals: 0, trigger: false },
    { label: "No registry record", stop: 0, route: "cold", reason: "absent", reads: 1, observations: 0, removals: 0, trigger: true },
    { label: "Registry read throws", stop: 0, route: "cold", reason: "recovering", reads: 1, observations: 0, removals: 0, trigger: false },
    { label: "Record says starting", stop: 1, route: "cold", reason: "starting", reads: 1, observations: 0, removals: 0, trigger: false },
    { label: "Record version differs", stop: 2, route: "fallback", reason: "incompatible", reads: 1, observations: 0, removals: 0, trigger: true },
    { label: "Compatible, ready and responsive", stop: 3, route: "warm", reason: "ready", reads: 1, observations: 1, removals: 0, trigger: false },
    { label: "Compatible, busy and responsive", stop: 3, route: "warm", reason: "busy", reads: 1, observations: 1, removals: 0, trigger: false },
    { label: "Pong says starting", stop: 3, route: "cold", reason: "recovering", reads: 1, observations: 1, removals: 0, trigger: false },
    { label: "Observation identifies startup", stop: 3, route: "cold", reason: "starting", reads: 1, observations: 1, removals: 0, trigger: false },
    { label: "Process unresponsive", stop: 3, route: "cold", reason: "recovering", reads: 1, observations: 1, removals: 0, trigger: false },
    { label: "Process has exited", stop: 3, route: "fallback", reason: "dead", reads: 1, observations: 1, removals: 1, trigger: true },
    { label: "Pong version differs", stop: 3, route: "fallback", reason: "incompatible", reads: 1, observations: 1, removals: 0, trigger: true },
    { label: "Observation is corrupt", stop: 3, route: "fallback", reason: "incompatible", reads: 1, observations: 1, removals: 0, trigger: true },
    { label: "Observation throws", stop: 3, route: "cold", reason: "recovering", reads: 1, observations: 1, removals: 0, trigger: false },
  ];

  function renderRouting(container) {
    container.innerHTML = `<div class="route-controls"><label for="route-scenario">One input:</label><select id="route-scenario">${scenarios.map((s, i) => `<option value="${i}" ${i === 4 ? "selected" : ""}>${escape(s.label)}</option>`).join("")}</select><span>Illustrative · source-derived, no symnav execution</span></div><div class="routing-diagram"></div><div class="route-effect" role="status" aria-live="polite"></div>`;
    const select = $("select", container);
    function update() {
      const s = scenarios[Number(select.value)];
      const labels = ["record present", "not starting", "version matches", "responsive"];
      let drawing = "";
      labels.forEach((label, i) => {
        const color = i > s.stop ? "#4d6068" : i === s.stop ? colors.amber : colors.mint;
        drawing += svgBox(i * 283 + 3, 10, 246, 65, label, color, i > s.stop ? "not observed" : i === s.stop ? "decision" : "continue", i > s.stop);
        if (i < 3) drawing += arrow(i * 283 + 249, 43, i * 283 + 283, 43, color, i >= s.stop);
      });
      $(".routing-diagram", container).innerHTML = svg(drawing, 90, `Routing ${s.label}: ${s.route}, ${s.reason}. Later guards do not run.`);
      $(".route-effect", container).innerHTML = `<b>${escape(s.route.toUpperCase())} / ${escape(s.reason)}</b><span class="effect-count">reads ${s.reads}</span><span class="effect-count">observes ${s.observations}</span><span class="effect-count">removes ${s.removals}</span><span>${s.route === "warm" ? "→ daemon execution" : "→ fresh local executor"}</span><span>${s.trigger ? "+ independent warm-up" : "no warm-up trigger"}</span>`;
    }
    select.addEventListener("change", update);
    update();
  }

  function addNode(id, parent, bounds, color, type) {
    const parentNode = nodes.get(parent);
    const parentScale = parentNode ? (parentNode.bounds.w - 4) / INNER_W * parentNode.global.w / parentNode.bounds.w : 1;
    const parentBorder = parentNode ? 2 * parentNode.global.w / parentNode.bounds.w : 0;
    const global = parentNode ? { x: parentNode.global.x + parentBorder + bounds.x * parentScale, y: parentNode.global.y + parentBorder + bounds.y * parentScale, w: bounds.w * parentScale, h: bounds.h * parentScale } : { ...bounds };
    const element = tag("section", { class: `node ${type}`, "data-node": id, "data-color": color, "aria-label": id });
    Object.assign(element.style, { left: `${bounds.x}px`, top: `${bounds.y}px`, width: `${bounds.w}px`, height: `${bounds.h}px` });
    const cover = tag("div", type === "room" ? { class: "cover", role: "group" } : { class: "cover", role: "button", tabindex: "0", "aria-label": `Zoom into ${id}` });
    const inside = tag("div", { class: `inside${type === "decision" ? " leaf" : ""}` });
    inside.style.transform = `scale(${(bounds.w - 4) / INNER_W})`;
    inside.inert = true;
    element.append(cover, inside);
    (parentNode ? parentNode.inside : world).append(element);
    const node = { id, parent, global, bounds, element, cover, inside, color, type };
    nodes.set(id, node);
    cover.addEventListener("click", e => { if (moved || e.target.closest("button")) return; focusNode(id); });
    cover.addEventListener("keydown", e => { if (e.target === cover && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); e.stopPropagation(); focusNode(id); } });
    return node;
  }

  function renderCode(element, evidence) {
    element.classList.toggle("source-prose", evidence.kind === "text");
    element.innerHTML = evidence.text.split("\n").map((line, i) => {
      let type = "";
      if (evidence.kind === "diff") type = line.startsWith("+") ? " code-add" : line.startsWith("-") ? " code-remove" : line.startsWith("@@") ? " code-hunk" : "";
      return `<span class="code-line${type}"><span class="line-no">${evidence.firstLine + i}</span>${escape(line) || " "}</span>`;
    }).join("");
    element.scrollTop = 0;
    element.scrollLeft = 0;
  }

  function buildLeaf(node, decision) {
    node.cover.setAttribute("aria-label", `Zoom into ${decision.id}: ${decision.title}`);
    node.cover.innerHTML = `<div class="decision-id">${decision.id}<span class="status-pill ${decision.status}">${decision.status}</span></div><h3 class="decision-title">${escape(outlines[decision.id])}</h3><div class="cover-bottom">Choice → reason → source ↗</div>`;
    node.inside.innerHTML = `<div class="leaf-head"><div class="eyebrow">${decision.id} / DECISION <span class="status-pill ${decision.status}">${decision.status}</span>${decision.scope ? `<span class="scope">${escape(decision.scope)}</span>` : ""}</div><h2>${escape(decision.title)}</h2><div class="boundary-label">${escape(decision.boundary)}</div></div><div class="before-after"><div><b>BASE / PREVIOUS OWNER</b><p>${escape(decision.before)}</p></div><div><b>HEAD / RESULTING SHAPE</b><p>${escape(decision.after)}</p></div></div><p class="rationale ${decision.status}"><b>${decision.status === "stated" ? "RECORDED REASON" : "NO RECORDED REASON FOUND"}</b>${escape(decision.rationale)}</p><section class="evidence-panel" aria-label="Captured source evidence"><div class="evidence-tools"><label for="source-${decision.id}">SOURCE</label><select id="source-${decision.id}">${decision.sources.map((source, i) => `<option value="${i}">${escape(source.title)}</option>`).join("")}</select><a class="upstream-source" target="_blank" rel="noopener">GitHub ↗</a></div><div class="source-location"></div><pre class="source-code" tabindex="0" aria-label="Scrollable source excerpt"></pre></section><div class="evidence-footer"><span>Exact local snapshot · code is evidence; this artifact does not judge correctness.</span><button data-up="${node.parent}">↑ ${escape(data.rooms.find(r => r.id === node.parent).short)}</button></div>`;
    const select = $("select", node.inside);
    function update() {
      const source = decision.sources[Number(select.value)], evidence = data.evidence[source.key];
      $(".source-location", node.inside).textContent = `${evidence.revision} · ${evidence.path}${evidence.kind === "code" ? ` · L${evidence.firstLine}–${evidence.firstLine + evidence.text.split("\n").length - 1}` : evidence.kind === "diff" ? " · full file diff (display line numbers)" : ""}`;
      const link = $(".upstream-source", node.inside);
      link.hidden = !evidence.url;
      if (evidence.url) link.href = evidence.url;
      renderCode($(".source-code", node.inside), evidence);
    }
    select.addEventListener("change", update);
    $("[data-up]", node.inside).addEventListener("click", () => focusNode(node.parent));
    update();
  }

  function buildRoom(room, index) {
    const x = 30 + (index % 3) * 550, y = 218 + Math.floor(index / 3) * 420;
    const node = addNode(room.id, "root", { x, y, w: 520, h: 400 }, room.color, "room");
    node.cover.setAttribute("aria-label", `Zoom into ${room.title}`);
    const intents = {staging:"Stated intent: separate ownership and consumer-switch review.",facade:"Stated intent: no Node ambient types in host declarations.",routing:"Stated intent: stop later effects; own cleanup and replay safety.",clocks:"Stated intent: preserve timing while moving its owner."};
    node.cover.innerHTML = `<div class="room-number"><span>${room.number} / ${room.short.toUpperCase()}</span><button class="room-enter" aria-label="Enter ${escape(room.title)}">ENTER ↗</button></div><h2 class="room-title">${escape(room.title)}</h2><ul class="outline">${room.decisions.map(id => { const d = decisions.get(id); return `<li><span class="reason-mark ${d.status}" aria-label="${d.status}" title="${d.status} reason">${d.status === "stated" ? "S" : "U"}</span><button data-decision="${id}" aria-label="${id}, ${d.status}: ${escape(outlines[id])}">${escape(outlines[id])}</button></li>`; }).join("")}</ul>${intents[room.id] ? `<div class="cover-bottom">${escape(intents[room.id])}</div>` : ""}`;
    $(".room-enter", node.cover).addEventListener("click", () => focusNode(room.id));
    for (const button of node.cover.querySelectorAll("[data-decision]")) button.addEventListener("click", e => { e.stopPropagation(); if (!moved) focusNode(button.dataset.decision); });
    node.inside.innerHTML = `<div class="room-head"><div class="eyebrow">${room.number} / ${escape(room.short.toUpperCase())}${room.id === "tests" ? '<button class="inventory-open-button">153-file source census ↗</button>' : ""}</div><h2>${escape(room.title)}</h2><p>${escape(room.subtitle)}</p></div><div class="mechanism ${room.decisions.length <= 3 ? "large" : ""}"></div>`;
    const diagram = $(".mechanism", node.inside);
    if (room.id === "routing") renderRouting(diagram); else diagram.innerHTML = mechanism(room);
    if (room.id === "routing") {
      const output = tag("div", {class:"output-mechanism"});
      output.innerHTML = `<svg viewBox="0 0 744 254" role="img" aria-label="Package output ownership. Safe transport failure may retry locally. Uncertain or accepted failure produces a controlled result. Successful ordered bytes flow through package capture."><text x="4" y="20" font-size="17" fill="${colors.mint}">AFTER ROUTING / OUTPUT & REPLAY BOUNDARY</text><path d="M4 34 H738" stroke="#426755"/><text x="4" y="66" font-size="21">retrySafe transport error → one local fallback</text><text x="4" y="100" font-size="21">uncertain / accepted failure → controlled result</text><path d="M4 119 H738" stroke="#426755"/><text x="4" y="149" font-size="21">ordered stdout / stderr → capture → result</text><text x="4" y="180" font-size="19" fill="#abbab8">inline bytes → temporary spool when policy requires</text><text x="4" y="218" font-size="16" fill="#abbab8">Counts above cover routing only. Independent startup may</text><text x="4" y="240" font-size="16" fill="#abbab8">observe more state. Illustration; no subprocesses run here.</text></svg>`;
      node.inside.append(output);
    }
    const isPair = room.decisions.length === 2;
    room.decisions.forEach((id, i) => {
      const w = isPair ? 550 : 360, h = w * INNER_H / INNER_W;
      const childX = isPair ? 30 + i * 575 : 30 + (i % 3) * 390;
      const childY = isPair ? 450 : room.decisions.length <= 3 ? 535 : 330 + Math.floor(i / 3) * 287;
      const leaf = addNode(id, room.id, { x: childX, y: childY, w, h }, room.color, "decision");
      buildLeaf(leaf, decisions.get(id));
    });
    if (room.decisions.length <= 3) node.inside.append(tag("div", { class: "room-footnote" }, "Each box above was already named in the whole-change outline. Enter it to inspect the source."));
    if (room.id === "tests") buildFileInspector(node);
  }

  function buildFileInspector(node) {
    const panel = tag("section", { class: "file-inspector", "aria-label": "Full changed-file census" });
    panel.innerHTML = `<header><h3>153 files · complete supplied diff</h3><button class="close-inspector">Back to test choices ×</button></header><p>Supplementary evidence. Counts are Git diff counts, not new-code or correctness measures. Moved mechanisms retain earlier-stack behavior.</p><select aria-label="Choose changed file">${data.files.map((file, i) => `<option value="${i}">${file.change} · +${file.added}/−${file.removed} · ${escape(file.path)}</option>`).join("")}</select><pre class="source-code" tabindex="0" aria-label="Scrollable complete file diff"></pre>`;
    node.inside.append(panel);
    const select = $("select", panel);
    function update() { renderCode($("pre", panel), { text: data.files[Number(select.value)].patch, firstLine: 1, kind: "diff" }); }
    select.addEventListener("change", update);
    $(".close-inspector", panel).addEventListener("click", () => panel.classList.remove("open"));
    $(".inventory-open-button", node.inside).addEventListener("click", () => { panel.classList.add("open"); select.focus({ preventScroll: true }); });
    update();
  }

  function ancestors(id) {
    const result = [];
    while (id && id !== "root") { result.unshift(id); id = nodes.get(id)?.parent; }
    return ["root", ...result];
  }

  function updateLod() {
    const path = ancestors(active);
    for (const node of nodes.values()) {
      const detailed = (manualFocus && path.includes(node.id)) || node.global.w * camera.scale > (node.type === "room" ? 800 : 880);
      node.element.classList.toggle("expanded", detailed);
      node.cover.inert = detailed;
      node.inside.inert = !detailed;
      const b = node.global, x = b.x * camera.scale + camera.x, y = b.y * camera.scale + camera.y;
      const width = b.w * camera.scale, height = b.h * camera.scale;
      const intersection = Math.max(0, Math.min(x + width, viewport.clientWidth) - Math.max(x, 0)) * Math.max(0, Math.min(y + height, viewport.clientHeight) - Math.max(y, 0));
      node.element.inert = !path.includes(node.id) && intersection / Math.min(width * height, viewport.clientWidth * viewport.clientHeight) < .18;
    }
  }

  function renderMinimap() {
    const view = { x: -camera.x / camera.scale, y: -camera.y / camera.scale, w: viewport.clientWidth / camera.scale, h: viewport.clientHeight / camera.scale };
    $("#mini-map").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Camera position within the whole change">${data.rooms.map(room => { const b = nodes.get(room.id).global; return `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="${colors[room.color]}25" stroke="${colors[room.color]}" stroke-width="15"/>`; }).join("")}<rect x="${view.x}" y="${view.y}" width="${view.w}" height="${view.h}" fill="#ffffff07" stroke="#f0f8ee" stroke-width="15"/></svg>`;
  }
  function applyCamera() {
    world.style.transform = `translate(${camera.x}px,${camera.y}px) scale(${camera.scale})`;
    $("#zoom-value").textContent = `${Math.round(camera.scale / rootScale * 100)}%`;
    updateLod();
    renderMinimap();
  }
  function fitCamera(id) {
    const b = id === "root" ? { x: 0, y: 0, w: W, h: H } : nodes.get(id).global;
    const padX = id === "root" ? 16 : 50, padY = id === "root" ? 16 : 38;
    const width = viewport.clientWidth, height = viewport.clientHeight;
    const scale = Math.max(.12, Math.min((width - padX * 2) / b.w, (height - padY * 2) / b.h));
    return { scale, x: width / 2 - (b.x + b.w / 2) * scale, y: height / 2 - (b.y + b.h / 2) * scale };
  }
  function updateNavigation(announce = true) {
    const path = ancestors(active), crumbs = $("#breadcrumbs");
    document.body.dataset.depth = String(path.length);
    crumbs.replaceChildren();
    path.forEach((id, i) => {
      if (i) crumbs.append(tag("span", { "aria-hidden": "true" }, "/"));
      const label = id === "root" ? "Whole change" : decisions.has(id) ? id : data.rooms.find(room => room.id === id).short;
      const button = tag("button", id === active ? { "aria-current": "location" } : {}, label);
      button.addEventListener("click", () => focusNode(id)); crumbs.append(button);
    });
    const position = sequence.indexOf(active);
    $("#tour-position").textContent = `${position + 1} / ${sequence.length}`;
    $("#previous").disabled = position === 0;
    $("#next").disabled = position === sequence.length - 1;
    const next = sequence[position + 1];
    $("#next").textContent = next ? `Next: ${decisions.has(next) ? next : data.rooms.find(r => r.id === next).short} →` : "End of canvas";
    const title = active === "root" ? "The complete outline" : decisions.has(active) ? decisions.get(active).title : data.rooms.find(r => r.id === active).title;
    $("#current-label").textContent = title;
    $("#depth-label").textContent = `${String(path.length).padStart(2, "0")} / ${path.length === 1 ? "WHOLE CHANGE" : path.length === 2 ? "MECHANISM" : "DECISION + EVIDENCE"}`;
    $("#up-button").disabled = active === "root";
    if (announce) $("#announcement").textContent = `${path.length === 1 ? "Whole change" : path.length === 2 ? "Mechanism" : "Decision and source"}: ${title}`;
  }
  function focusNode(id, options = {}) {
    if (id !== "root" && !nodes.has(id)) id = "root";
    if (id !== "tests") $(".file-inspector.open")?.classList.remove("open");
    cancelAnimationFrame(animation);
    active = id; manualFocus = true;
    if (options.history !== false && location.hash !== `#${id}`) history.pushState({ node: id }, "", `#${id}`);
    updateNavigation();
    const start = { ...camera }, target = fitCamera(id);
    const duration = options.instant || reducedMotion ? 0 : 440;
    const started = performance.now();
    function frame(now) {
      const t = duration ? Math.min(1, (now - started) / duration) : 1;
      const eased = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      camera = { x: start.x + (target.x - start.x) * eased, y: start.y + (target.y - start.y) * eased, scale: start.scale + (target.scale - start.scale) * eased };
      applyCamera();
      if (t < 1) animation = requestAnimationFrame(frame);
    }
    animation = requestAnimationFrame(frame);
    if (options.focus !== false) viewport.focus({ preventScroll: true });
  }
  function inferFocus() {
    const center = { x: (viewport.clientWidth / 2 - camera.x) / camera.scale, y: (viewport.clientHeight / 2 - camera.y) / camera.scale };
    let next = "root";
    for (const node of nodes.values()) {
      const b = node.global;
      if (b.w * camera.scale > (node.type === "room" ? 800 : 880) && center.x >= b.x && center.x <= b.x + b.w && center.y >= b.y && center.y <= b.y + b.h) next = node.id;
    }
    if (active !== next) { active = next; history.replaceState({ node: active }, "", `#${active}`); updateNavigation(false); }
  }
  function zoom(factor, x = viewport.clientWidth / 2, y = viewport.clientHeight / 2) {
    cancelAnimationFrame(animation);
    const next = Math.min(36, Math.max(rootScale * .62, camera.scale * factor));
    const ratio = next / camera.scale;
    camera = { scale: next, x: x - (x - camera.x) * ratio, y: y - (y - camera.y) * ratio };
    manualFocus = false;
    inferFocus(); applyCamera();
  }
  function tour(direction) {
    const position = Math.max(0, Math.min(sequence.length - 1, sequence.indexOf(active) + direction));
    focusNode(sequence[position]);
  }

  world.innerHTML = `<div class="world-title"><h1>Package ownership lands before the CLI switch.</h1><p><span class="meta-stat">SYMNAV / PR 148</span><span>${data.meta.commits.length} commits</span><button id="open-census" aria-label="Open the 153 changed-file source census">153 files</button><span>+${data.meta.added.toLocaleString()} / −${data.meta.removed.toLocaleString()}</span><span>${data.decisions.length} choices · 6 rooms · source at the bottom</span></p></div><div class="root-picture">${rootPicture()}</div>`;
  data.rooms.forEach(buildRoom);
  $("#open-census").addEventListener("click", () => { focusNode("tests"); $(".file-inspector", nodes.get("tests").inside).classList.add("open"); });
  $("#fit-button").addEventListener("click", () => focusNode("root"));
  $(".brand").addEventListener("click", e => { e.preventDefault(); focusNode("root"); });
  $("#up-button").addEventListener("click", () => focusNode(nodes.get(active)?.parent || "root"));
  $("#previous").addEventListener("click", () => tour(-1));
  $("#next").addEventListener("click", () => tour(1));
  $("#zoom-in").addEventListener("click", () => zoom(1.3));
  $("#zoom-out").addEventListener("click", () => zoom(1 / 1.3));
  $("#help-button").addEventListener("click", () => { const help = $("#help"); help.hidden = !help.hidden; $("#help-button").setAttribute("aria-expanded", String(!help.hidden)); });
  $("#mini-map").addEventListener("click", e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * W, y = (e.clientY - rect.top) / rect.height * H;
    const room = data.rooms.find(room => { const b = nodes.get(room.id).global; return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h; });
    focusNode(room?.id || "root");
  });
  viewport.addEventListener("wheel", e => {
    if (e.target.closest(".source-code") && !e.ctrlKey && !e.metaKey) return;
    if (e.target.closest("#help, select")) return;
    e.preventDefault();
    const rect = viewport.getBoundingClientRect();
    zoom(Math.exp(-e.deltaY * (e.ctrlKey ? .009 : .002)), e.clientX - rect.left, e.clientY - rect.top);
    clearTimeout(wheelTimer); wheelTimer = setTimeout(inferFocus, 150);
  }, { passive: false });

  viewport.addEventListener("pointerdown", e => {
    if (e.target.closest("button, select, a, .source-code, #help, .camera-controls, #mini-map") || e.button !== 0) return;
    cancelAnimationFrame(animation);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved = false;
    drag = { x: e.clientX, y: e.clientY, cameraX: camera.x, cameraY: camera.y };
    if (pointers.size === 2) {
      const points = [...pointers.values()];
      pinch = { distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) };
      moved = true;
    }
  });
  window.addEventListener("pointermove", e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && pinch) {
      const points = [...pointers.values()], rect = viewport.getBoundingClientRect();
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      zoom(distance / Math.max(1, pinch.distance), (points[0].x + points[1].x) / 2 - rect.left, (points[0].y + points[1].y) / 2 - rect.top);
      pinch.distance = distance; moved = true; return;
    }
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 5) moved = true;
    if (moved) {
      viewport.classList.add("dragging");
      camera.x = drag.cameraX + dx; camera.y = drag.cameraY + dy;
      applyCamera();
    }
  });
  function pointerEnd(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 0) { drag = null; viewport.classList.remove("dragging"); if (moved) { manualFocus = false; inferFocus(); applyCamera(); } setTimeout(() => { moved = false; }, 0); }
    else { const point = [...pointers.values()][0]; drag = { x: point.x, y: point.y, cameraX: camera.x, cameraY: camera.y }; }
  }
  window.addEventListener("pointerup", pointerEnd);
  window.addEventListener("pointercancel", pointerEnd);
  window.addEventListener("keydown", e => {
    if (e.target.closest("select, input, textarea")) return;
    if (e.key === "Escape") {
      const inspector = $(".file-inspector.open");
      if (inspector) { inspector.classList.remove("open"); e.preventDefault(); return; }
      if (!$("#help").hidden) { $("#help-button").click(); e.preventDefault(); return; }
      focusNode(nodes.get(active)?.parent || "root");
    } else if (e.key === "Home") focusNode("root");
    else if (e.key === "ArrowRight" && !e.target.closest(".source-code")) tour(1);
    else if (e.key === "ArrowLeft" && !e.target.closest(".source-code")) tour(-1);
    else if (e.key === "+" || e.key === "=") zoom(1.3);
    else if (e.key === "-") zoom(1 / 1.3);
    else return;
    e.preventDefault();
  });
  window.addEventListener("popstate", () => focusNode(location.hash.slice(1) || "root", { history: false }));
  window.addEventListener("hashchange", () => { const id = location.hash.slice(1) || "root"; if (id !== active) focusNode(id, { history: false }); });
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { rootScale = fitCamera("root").scale; focusNode(active, { instant: true, history: false, focus: false }); }, 100);
  }).observe(viewport);
  rootScale = fitCamera("root").scale;
  camera = fitCamera("root");
  focusNode(location.hash.slice(1) || "root", { instant: true, history: false, focus: false });
  // Inspection port for the experiment's browser checks; it never writes review state.
  window.zoomCanvas = { focus: (id) => focusNode(id, { instant: true }), state: () => ({ active, camera: { ...camera }, sequence: [...sequence] }), scenarios };
})();
