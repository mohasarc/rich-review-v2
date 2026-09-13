const Board = (() => {
  const labels = BOARD.labels;
  const byLabel = new Map(BOARD.commits.map((c) => [c.label, c]));
  const filesCache = new Map();
  const layoutCache = new Map();

  const TERRITORIES = {
    typescript: { x: 16, y: 40, w: 300, h: 178, name: "@symnav/backend-typescript", color: "#5b93f5" },
    core: { x: 332, y: 40, w: 300, h: 178, name: "@symnav/core", color: "#a283f0" },
    renderer: { x: 648, y: 40, w: 204, h: 96, name: "@symnav/renderer", color: "#73c56f" },
    telemetry: { x: 868, y: 40, w: 116, h: 72, name: "@symnav/telemetry", color: "#9aa4ae" },
    cli: { x: 16, y: 236, w: 476, h: 396, name: "apps/cli  (symnav)", color: "#e3a64f" },
    daemon: { x: 508, y: 236, w: 476, h: 396, name: "@symnav/daemon", color: "#43c6b3" },
  };
  const ORDER = ["typescript", "core", "renderer", "telemetry", "cli", "daemon"];
  const K = 9.0;
  const HEADER = 22;
  const PAD = 6;

  const birthIndex = {};
  const firstPath = {};
  for (const c of BOARD.commits) {
    for (const f of c.files) {
      if (!(f.id in firstPath)) {
        firstPath[f.id] = f.path;
        birthIndex[f.id] = labels.indexOf(c.label);
      }
    }
  }
  const districtFirst = {};
  for (const c of BOARD.commits) {
    for (const f of c.files) {
      const key = f.t + ":" + f.d;
      if (!(key in districtFirst)) districtFirst[key] = labels.indexOf(c.label);
    }
  }

  function commit(label) {
    return byLabel.get(label);
  }

  function files(label) {
    if (!filesCache.has(label)) filesCache.set(label, new Map(commit(label).files.map((f) => [f.id, f])));
    return filesCache.get(label);
  }

  function isMechanism(path) {
    return path.startsWith("apps/cli/src/daemon/") || path.startsWith("packages/daemon/src/");
  }

  function strip(items, x, y, w) {
    const rects = new Map();
    let row = [];
    let cy = y;
    const worst = (r) => {
      const s = r.reduce((a, it) => a + it.area, 0);
      if (s <= 0) return Infinity;
      const h = s / w;
      let m = 0;
      for (const it of r) {
        const iw = it.area / h;
        m = Math.max(m, Math.max(iw / h, h / iw));
      }
      return m;
    };
    const place = (r) => {
      const s = r.reduce((a, it) => a + it.area, 0);
      const h = s / w;
      let cx = x;
      for (const it of r) {
        const iw = it.area / h;
        rects.set(it.id, { x: cx, y: cy, w: iw, h });
        cx += iw;
      }
      cy += h;
    };
    for (const it of items) {
      if (it.area <= 0) continue;
      if (row.length === 0) {
        row.push(it);
        continue;
      }
      if (worst([...row, it]) <= worst(row)) row.push(it);
      else {
        place(row);
        row = [it];
      }
    }
    if (row.length) place(row);
    return { rects, height: cy - y };
  }

  function layout(label) {
    if (layoutCache.has(label)) return layoutCache.get(label);
    const result = { files: new Map(), districts: [], territories: {} };
    const byTerritory = {};
    for (const f of commit(label).files) (byTerritory[f.t] = byTerritory[f.t] || []).push(f);
    for (const t of ORDER) {
      const box = TERRITORIES[t];
      const list = byTerritory[t] || [];
      const lines = list.reduce((a, f) => a + f.n, 0);
      result.territories[t] = { ...box, lines, count: list.length };
      if (!list.length) continue;
      const districts = new Map();
      for (const f of list) {
        if (!districts.has(f.d)) districts.set(f.d, []);
        districts.get(f.d).push(f);
      }
      const dItems = [...districts.entries()]
        .sort((a, b) => districtFirst[t + ":" + a[0]] - districtFirst[t + ":" + b[0]] || a[0].localeCompare(b[0]))
        .map(([d, fs]) => ({ id: d, area: fs.reduce((a, f) => a + f.n, 0) * K, files: fs }));
      const innerW = box.w - PAD * 2;
      const dl = strip(dItems, box.x + PAD, box.y + HEADER, innerW);
      for (const item of dItems) {
        const r = dl.rects.get(item.id);
        if (!r) continue;
        const inset = r.w > 6 && r.h > 6 ? 1 : 0;
        const inner = { x: r.x + inset, y: r.y + inset, w: Math.max(0.5, r.w - inset * 2), h: Math.max(0.5, r.h - inset * 2) };
        result.districts.push({ t, d: item.id, ...r, lines: item.area / K, count: item.files.length });
        const scale = (inner.w * inner.h) / item.area;
        const fItems = item.files
          .slice()
          .sort((a, b) => birthIndex[a.id] - birthIndex[b.id] || firstPath[a.id].localeCompare(firstPath[b.id]))
          .map((f) => ({ id: f.id, area: f.n * K * scale }));
        const fl = strip(fItems, inner.x, inner.y, inner.w);
        for (const f of item.files) {
          const fr = fl.rects.get(f.id);
          if (fr) result.files.set(f.id, { ...fr, t, d: item.id, path: f.path, n: f.n, mech: isMechanism(f.path) });
        }
      }
    }
    layoutCache.set(label, result);
    return result;
  }

  function lineage(id) {
    return labels.map((l) => {
      const f = files(l).get(id);
      return f ? { label: l, path: f.path, n: f.n } : null;
    });
  }

  function idByPath(label, path) {
    for (const f of commit(label).files) if (f.path === path) return f.id;
    return null;
  }

  function roads(label) {
    const fmap = files(label);
    const counts = new Map();
    for (const [a, b] of commit(label).edges) {
      const from = fmap.get(a);
      if (!from) continue;
      const toT = b.startsWith("@") ? b.slice(1).split("/")[0] : fmap.get(b) && fmap.get(b).t;
      if (!toT || toT === from.t) continue;
      const key = from.t + ">" + toT;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return counts;
  }

  function territoryLines(label) {
    const out = {};
    for (const f of commit(label).files) out[f.t] = (out[f.t] || 0) + f.n;
    return out;
  }

  return { labels, TERRITORIES, ORDER, commit, files, layout, lineage, idByPath, roads, territoryLines, isMechanism, copyOf: BOARD.copyOf, firstPath };
})();

function createMap(container, options = {}) {
  const T = Board.TERRITORIES;
  const root = U.svg("svg", { class: "map", viewBox: options.viewBox || "0 0 1000 644", preserveAspectRatio: "xMidYMid meet" });
  const defs = U.svg("defs");
  defs.innerHTML = `
    <pattern id="hatch-daemon" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
      <rect width="5" height="5" fill="rgba(67,198,179,0.20)"></rect>
      <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(67,198,179,0.55)" stroke-width="1.6"></line>
    </pattern>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke"></path>
    </marker>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.2" result="b"></feGaussianBlur>
      <feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
    </filter>`;
  root.appendChild(defs);
  const gTerr = U.svg("g", { class: "layer-territories" });
  const gDist = U.svg("g", { class: "layer-districts" });
  const gFiles = U.svg("g", { class: "layer-files" });
  const gLabels = U.svg("g", { class: "layer-labels" });
  const gRoads = U.svg("g", { class: "layer-roads" });
  const gRopes = U.svg("g", { class: "layer-ropes" });
  const gOver = U.svg("g", { class: "layer-overlay" });
  root.append(gTerr, gDist, gFiles, gLabels, gRoads, gRopes, gOver);
  container.appendChild(root);

  const state = {
    label: null,
    layers: { ropes: true, roads: true, labels: true, ...(options.layers || {}) },
    tiles: new Map(),
    frame: null,
    highlight: new Set(),
    dim: false,
  };

  const terrNodes = {};
  for (const t of Board.ORDER) {
    const box = T[t];
    const g = U.svg("g", { class: "territory t-" + t });
    const rect = U.svg("rect", { x: box.x, y: box.y, width: box.w, height: box.h, rx: 7, class: "terr-box", style: `--c:${box.color}` });
    const name = U.svg("text", { x: box.x + 8, y: box.y + 15, class: "terr-name", style: `fill:${box.color}` });
    const lines = U.svg("text", { x: box.x + box.w - 8, y: box.y + 15, class: "terr-lines", "text-anchor": "end" });
    const empty = U.svg("text", { x: box.x + box.w / 2, y: box.y + box.h / 2 + 4, class: "terr-empty", "text-anchor": "middle" });
    g.append(rect, name, lines, empty);
    gTerr.appendChild(g);
    terrNodes[t] = { g, rect, name, lines, empty };
  }

  function tileNode(id) {
    if (state.tiles.has(id)) return state.tiles.get(id);
    const g = U.svg("g", { class: "tile", "data-id": id });
    const rect = U.svg("rect", { class: "tile-rect" });
    const text = U.svg("text", { class: "tile-label" });
    g.append(rect, text);
    g.addEventListener("pointerenter", (e) => {
      const f = currentFile(id);
      if (!f) return;
      U.showTip(e, tipFor(id, f));
      if (options.onTileHover) options.onTileHover(id, true);
    });
    g.addEventListener("pointermove", (e) => {
      const tipNode = document.getElementById("tooltip");
      if (!tipNode.hidden) {
        const pad = 14;
        tipNode.style.left = e.clientX + pad + "px";
        tipNode.style.top = e.clientY + pad + "px";
      }
    });
    g.addEventListener("pointerleave", () => {
      U.hideTip();
      if (options.onTileHover) options.onTileHover(id, false);
    });
    g.addEventListener("click", () => options.onTileClick && options.onTileClick(id, state.label));
    gFiles.appendChild(g);
    const entry = { g, rect, text, id };
    state.tiles.set(id, entry);
    return entry;
  }

  function currentFile(id) {
    return state.label ? Board.files(state.label).get(id) : null;
  }

  function tipFor(id, f) {
    const lin = Board.lineage(id).filter(Boolean);
    const born = lin[0];
    const node = U.el("div", { class: "tip" },
      U.el("div", { class: "tip-path" }, f.path),
      U.el("div", {}, U.fmt(f.n) + " lines at " + (state.label === "main" ? "main" : "#" + state.label)),
      born && born.label !== "main" ? U.el("div", { class: "muted" }, "appears at #" + born.label + (Board.copyOf[id] ? " (copy of " + U.base(Board.firstPath[Board.copyOf[id]]) + ")" : "")) : null,
      Board.isMechanism(f.path) && f.path.startsWith("apps/cli/") ? U.el("div", { class: "hatch-note" }, "daemon code inside the CLI package") : null,
      U.el("div", { class: "muted" }, "click: file history"));
    return node;
  }

  function drawTiles(layoutA, layoutB, t, label) {
    const ids = new Set([...layoutA.files.keys(), ...layoutB.files.keys()]);
    for (const id of ids) {
      const a = layoutA.files.get(id);
      const b = layoutB.files.get(id);
      const node = tileNode(id);
      let r;
      let opacity = 1;
      if (a && b) {
        r = { x: U.lerp(a.x, b.x, t), y: U.lerp(a.y, b.y, t), w: U.lerp(a.w, b.w, t), h: U.lerp(a.h, b.h, t) };
      } else if (b) {
        const src = Board.copyOf[id] && layoutA.files.get(Board.copyOf[id]);
        if (src) r = { x: U.lerp(src.x, b.x, t), y: U.lerp(src.y, b.y, t), w: U.lerp(src.w, b.w, t), h: U.lerp(src.h, b.h, t) };
        else r = { x: b.x + (b.w * (1 - t)) / 2, y: b.y + (b.h * (1 - t)) / 2, w: b.w * t, h: b.h * t };
        opacity = Math.min(1, 0.25 + t);
      } else {
        r = { x: a.x + (a.w * t) / 2, y: a.y + (a.h * t) / 2, w: a.w * (1 - t), h: a.h * (1 - t) };
        opacity = 1 - t;
      }
      const f = b || a;
      node.g.style.display = r.w < 0.2 || r.h < 0.2 ? "none" : "";
      node.g.style.opacity = opacity;
      node.rect.setAttribute("x", r.x.toFixed(2));
      node.rect.setAttribute("y", r.y.toFixed(2));
      node.rect.setAttribute("width", Math.max(0, r.w - 0.6).toFixed(2));
      node.rect.setAttribute("height", Math.max(0, r.h - 0.6).toFixed(2));
      const territoryColor = T[f.t].color;
      const hatch = f.mech && f.t === "cli";
      node.rect.setAttribute("style", `--c:${territoryColor}`);
      node.g.setAttribute("class", "tile" + (hatch ? " hatch" : "") + (state.highlight.has(id) ? " hl" : "") + (state.dim && !state.highlight.has(id) ? " dim" : ""));
      const showLabel = state.layers.labels && r.w > 38 && r.h > 12;
      node.text.style.display = showLabel ? "" : "none";
      if (showLabel) {
        const stem = U.stem(f.path);
        const maxChars = Math.floor((r.w - 4) / 4.6);
        node.text.textContent = stem.length > maxChars ? stem.slice(0, Math.max(3, maxChars - 1)) + "…" : stem;
        node.text.setAttribute("x", (r.x + 3).toFixed(2));
        node.text.setAttribute("y", (r.y + 10).toFixed(2));
      }
      if (!b && t >= 1) {
        node.g.remove();
        state.tiles.delete(id);
      }
    }
  }

  function drawDistricts(lay) {
    U.clear(gDist);
    for (const d of lay.districts) {
      if (d.w < 3 || d.h < 3) continue;
      const cls = "district" + (d.t === "cli" && d.d === "daemon" ? " district-daemon" : "");
      const r = U.svg("rect", { x: d.x, y: d.y, width: Math.max(0, d.w), height: Math.max(0, d.h), class: cls, style: `--c:${T[d.t].color}` });
      gDist.appendChild(r);
      if (d.w > 70 && d.h > 24 && d.lines > 700) {
        gDist.appendChild(U.svg("text", { x: d.x + d.w - 3, y: d.y + d.h - 3, class: "district-label", "text-anchor": "end" }, (d.t === "cli" ? "src/" : "") + d.d));
      }
    }
  }

  function drawTerritories(lay) {
    for (const t of Board.ORDER) {
      const info = lay.territories[t];
      const node = terrNodes[t];
      node.lines.textContent = info.lines ? U.fmt(info.lines) + " lines · " + info.count + " files" : "";
      node.empty.textContent = info.lines ? "" : t === "daemon" ? "package does not exist yet" : "";
      node.g.classList.toggle("empty", !info.lines);
    }
  }

  function anchor(t, toward) {
    const b = T[t];
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    const tb = T[toward];
    const tx = tb.x + tb.w / 2;
    const ty = tb.y + tb.h / 2;
    const dx = tx - cx;
    const dy = ty - cy;
    const sx = dx === 0 ? Infinity : b.w / 2 / Math.abs(dx);
    const sy = dy === 0 ? Infinity : b.h / 2 / Math.abs(dy);
    const s = Math.min(sx, sy);
    return { x: cx + dx * s, y: cy + dy * s };
  }

  const ROAD_BEND = { "cli>core": -40, "cli>typescript": 30, "cli>renderer": -60, "cli>telemetry": -90, "renderer>core": 0, "typescript>core": 0, "cli>daemon": 0, "renderer>daemon": 40 };

  function drawRoads(label) {
    U.clear(gRoads);
    if (!state.layers.roads) return;
    const counts = Board.roads(label);
    for (const [key, n] of counts) {
      const [a, b] = key.split(">");
      const p1 = anchor(a, b);
      const p2 = anchor(b, a);
      const bend = ROAD_BEND[key] || 0;
      const mx = (p1.x + p2.x) / 2 + bend;
      const my = (p1.y + p2.y) / 2 - Math.abs(bend) * 0.3;
      const width = 1 + Math.log2(1 + n) * 0.9;
      const path = U.svg("path", { d: `M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`, class: "road", "stroke-width": width, style: `stroke:${T[a].color}`, "marker-end": "url(#arrow)" });
      const lx = 0.25 * p1.x + 0.5 * mx + 0.25 * p2.x;
      const ly = 0.25 * p1.y + 0.5 * my + 0.25 * p2.y;
      const badge = U.svg("g", { class: "road-badge" },
        U.svg("rect", { x: lx - 11, y: ly - 7, width: 22, height: 13, rx: 6 }),
        U.svg("text", { x: lx, y: ly + 3, "text-anchor": "middle" }, String(n)));
      const group = U.svg("g", { class: "road-group" }, path, badge);
      U.tip(group, () => `${T[a].name} → ${T[b].name}: ${n} import edges (production files) at ${label === "main" ? "main" : "#" + label}`);
      gRoads.appendChild(group);
    }
  }

  function tileCenter(lay, id) {
    const r = lay.files.get(id);
    return r ? { x: r.x + r.w / 2, y: r.y + r.h / 2 } : null;
  }

  function ropeTarget(lay, target) {
    if (target.startsWith("@")) {
      const t = target.slice(1).split("/")[0];
      const b = T[t];
      return { x: b.x + b.w / 2, y: b.y + b.h - 6 };
    }
    return tileCenter(lay, target);
  }

  function drawRopes(label, lay) {
    U.clear(gRopes);
    if (!state.layers.ropes) return;
    const tethers = Board.commit(label).tethers;
    tethers.forEach(([a, b], i) => {
      const p1 = tileCenter(lay, a);
      const p2 = ropeTarget(lay, b);
      if (!p1 || !p2) return;
      const mx = (p1.x + p2.x) / 2 + ((i % 5) - 2) * 9;
      const my = Math.min(p1.y, p2.y) - 20 - (i % 4) * 6;
      const fa = Board.files(label).get(a);
      const fb = b.startsWith("@") ? null : Board.files(label).get(b);
      const path = U.svg("path", { d: `M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`, class: "rope", "data-rope": a + "|" + b });
      const hit = U.svg("path", { d: `M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`, class: "rope-hit", "data-rope": a + "|" + b, "data-target": "rope:" + a + "|" + b });
      U.tip(hit, () => U.el("div", { class: "tip" },
        U.el("div", { class: "tip-path" }, "rope (import tether)"),
        U.el("div", {}, U.base(fa.path) + " → " + (fb ? fb.path : "@symnav/" + b.slice(1))),
        U.el("div", { class: "muted" }, "daemon code importing outside daemon code")));
      gRopes.append(path, hit);
    });
  }

  function render(label) {
    const lay = Board.layout(label);
    drawTerritories(lay);
    drawDistricts(lay);
    drawTiles(lay, lay, 1, label);
    drawRoads(label);
    drawRopes(label, lay);
    if (options.onRender) options.onRender(label, lay);
  }

  function show(label) {
    if (state.frame) state.frame.cancelled = true;
    const prev = state.label;
    state.label = label;
    if (prev && prev !== label) {
      for (const [id, node] of state.tiles) if (!Board.layout(label).files.has(id)) { node.g.remove(); state.tiles.delete(id); }
    }
    render(label);
  }

  async function morph(from, to, duration = 1100) {
    if (state.frame) state.frame.cancelled = true;
    const token = { cancelled: false };
    state.frame = token;
    const A = Board.layout(from);
    const B = Board.layout(to);
    state.label = to;
    U.clear(gRopes);
    U.clear(gRoads);
    drawTerritories(B);
    U.clear(gDist);
    await U.animate(duration, (t) => {
      if (token.cancelled) return;
      drawTiles(A, B, t, to);
    });
    if (token.cancelled) return false;
    render(to);
    return true;
  }

  function setLayers(layers) {
    Object.assign(state.layers, layers);
    if (state.label) render(state.label);
  }

  function setHighlight(ids, dim = false) {
    state.highlight = new Set(ids || []);
    state.dim = dim && state.highlight.size > 0;
    if (state.label) render(state.label);
  }

  async function zoomTo(viewBox, duration = 700) {
    const from = root.getAttribute("viewBox").split(/\s+/).map(Number);
    const to = viewBox.split(/\s+/).map(Number);
    await U.animate(duration, (t) => {
      root.setAttribute("viewBox", from.map((v, i) => U.lerp(v, to[i], t).toFixed(2)).join(" "));
    });
  }

  return { svg: root, overlay: gOver, show, morph, render, setLayers, setHighlight, zoomTo, get label() { return state.label; }, layout: () => Board.layout(state.label), tileCenter: (id) => tileCenter(Board.layout(state.label), id) };
}
