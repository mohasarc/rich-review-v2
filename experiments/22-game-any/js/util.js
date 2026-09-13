const U = (() => {
  const SVGNS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    applyAttrs(node, attrs);
    appendChildren(node, children);
    return node;
  }

  function svg(tag, attrs, ...children) {
    const node = document.createElementNS(SVGNS, tag);
    applyAttrs(node, attrs);
    appendChildren(node, children);
    return node;
  }

  function applyAttrs(node, attrs) {
    if (!attrs) return;
    for (const [key, value] of Object.entries(attrs)) {
      if (value === undefined || value === null || value === false) continue;
      if (key === "class") node.setAttribute("class", value);
      else if (key === "text") node.textContent = value;
      else if (key === "html") node.innerHTML = value;
      else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2), value);
      else if (key === "style" && typeof value === "object") Object.assign(node.style, value);
      else node.setAttribute(key, value === true ? "" : String(value));
    }
  }

  function appendChildren(node, children) {
    for (const child of children.flat(Infinity)) {
      if (child === undefined || child === null || child === false) continue;
      node.appendChild(typeof child === "string" || typeof child === "number" ? document.createTextNode(String(child)) : child);
    }
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  const fmt = (n) => (n === undefined || n === null ? "–" : Number(n).toLocaleString("en-US"));
  const signed = (n) => (n > 0 ? "+" + fmt(n) : n < 0 ? "−" + fmt(-n) : "0");
  const base = (path) => path.split("/").pop();
  const stem = (path) => base(path).replace(/\.(ts|mjs|cjs|js)$/, "");
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function githubBlob(sha, path, line) {
    return `https://github.com/mohasarc/symnav/blob/${sha}/${path}${line ? "#L" + line : ""}`;
  }
  function githubPr(n) {
    return `https://github.com/mohasarc/symnav/pull/${n}`;
  }
  function githubCommit(sha) {
    return `https://github.com/mohasarc/symnav/commit/${sha}`;
  }

  const tooltip = () => document.getElementById("tooltip");
  function showTip(event, content) {
    const tip = tooltip();
    clear(tip);
    if (typeof content === "string") tip.textContent = content;
    else tip.appendChild(content);
    tip.hidden = false;
    moveTip(event);
  }
  function moveTip(event) {
    const tip = tooltip();
    const pad = 14;
    const rect = tip.getBoundingClientRect();
    let x = event.clientX + pad;
    let y = event.clientY + pad;
    if (x + rect.width > window.innerWidth - 8) x = event.clientX - rect.width - pad;
    if (y + rect.height > window.innerHeight - 8) y = event.clientY - rect.height - pad;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  function hideTip() {
    tooltip().hidden = true;
  }
  function tip(node, contentFn) {
    node.addEventListener("pointerenter", (e) => showTip(e, contentFn()));
    node.addEventListener("pointermove", moveTip);
    node.addEventListener("pointerleave", hideTip);
    return node;
  }

  function animate(duration, step) {
    return new Promise((resolve) => {
      const start = performance.now();
      function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        step(ease(t), t);
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  return { el, svg, clear, fmt, signed, base, stem, lerp, ease, githubBlob, githubPr, githubCommit, tip, showTip, hideTip, animate, sleep };
})();
