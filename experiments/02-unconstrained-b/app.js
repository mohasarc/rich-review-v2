"use strict";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const leafById = new Map(DATA.ledger.leaves.map((leaf) => [leaf.id, leaf]));
const groupById = new Map(DATA.groups.map((group) => [group.id, group]));
const decisionById = new Map(DATA.decisions.map((decision) => [decision.id, decision]));
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const originStack = [];
let selectedGroup = "output";
let selectedLeaf = "output.maximumChunkRawBytes";
let revision = "head";

const names = {
  singleResponseTimeoutMs: "Ordinary response", statusResponseTimeoutMs: "Status response",
  executionAdmissionTimeoutMs: "Execution admission", maximumJsonPayloadBytes: "JSON control frame",
  maximumExecutionControlPayloadBytes: "Transfer control frame", coordinationGraceMs: "Coordination grace",
  heartbeatIntervalMs: "Startup heartbeat", authorizationPollIntervalMs: "Authorization polling",
  observationPollIntervalMs: "Readiness polling", previousInstanceTerminationTimeoutMs: "Previous-instance exit",
  childFailureRetryLimit: "Startup retries", idleTimeoutMs: "Idle lifetime", stopTimeoutMs: "Stop deadline",
  forcedTerminationReserveMaximumMs: "Force-exit reserve", controllerPollIntervalMs: "Controller polling",
  processSignalExitTimeoutMs: "Signal exit wait", processExitPollIntervalMs: "Process-exit polling",
  resourceDrainAcknowledgementGraceMs: "Drain acknowledgement grace",
  resourceDrainAcknowledgementPollIntervalMs: "Drain acknowledgement polling",
  postAcceptanceExecutionReattachmentLimit: "Execution reattachments",
  resultTransferResumeLimitPerExecutionAttempt: "Fetch resumes per attempt",
  maximumChunkRawBytes: "One raw chunk", inlineRawBytes: "Inline output",
  maximumResultRawBytes: "One completed result", maximumAggregateSpoolRawBytes: "All retained spool output",
  effectiveMemoryBytes: "Effective memory", hardProcessRssBytes: "Hard process RSS",
  softProcessRssBytes: "Soft process RSS", resumeProcessRssBytes: "Admission resumption RSS",
  workerMaxOldGenerationSizeMiB: "Worker old-generation heap",
  supervisionIntervalMs: "Resource sampling", replacementWindowMs: "Replacement window",
  replacementLimit: "Replacements in the window", workerHeapSampleIntervalMs: "Worker heap sampling",
  logRotateBytes: "Log rotation", logBackupCount: "Log backups", maximumQueuedEvents: "Queued log events",
  disconnectedTraceRetentionMs: "Disconnected trace lifetime", maximumDisconnectedTraces: "Disconnected trace count"
};
function leafName(leaf) { return names[leaf.id.split(".")[1]]; }
function statusMarkup(status) { return '<span class="status ' + status + '">' + status + "</span>"; }
function numberOf(decision) { return String(DATA.decisions.indexOf(decision) + 1).padStart(2, "0"); }
function sourceButton(ref, label) {
  return '<button class="source-button" data-source="' + escapeHtml(JSON.stringify(ref)) + '">' +
    escapeHtml(label || ref.side + " · " + ref.path.split("/").pop() + ":" + ref.start + "–" + ref.end) + "</button>";
}

function goTo(id, remember = true) {
  const target = document.getElementById(id);
  if (!target) return;
  if (remember) {
    originStack.push({ y: scrollY, hash: location.hash, focus: document.activeElement });
    $("#return-to-origin").hidden = false;
  }
  if (location.hash !== "#" + id) history.pushState(null, "", "#" + id);
  target.scrollIntoView({ behavior: prefersReducedMotion ? "instant" : "smooth", block: "start" });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}
function returnToOrigin() {
  const origin = originStack.pop();
  if (!origin) return;
  history.replaceState(null, "", origin.hash || location.pathname + location.search);
  scrollTo({ top: origin.y, behavior: prefersReducedMotion ? "instant" : "smooth" });
  if (origin.focus && origin.focus.isConnected) origin.focus.focus({ preventScroll: true });
  $("#return-to-origin").hidden = originStack.length === 0;
}

function svgNode(tag, attrs, parent, text) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attrs || {})) node.setAttribute(key, String(value));
  if (text !== undefined) node.textContent = text;
  if (parent) parent.appendChild(node);
  return node;
}
function renderMap() {
  const root = $("#authority-map");
  root.setAttribute("role", "group");
  Array.from(root.children).filter((child) => !["title", "desc"].includes(child.tagName)).forEach((child) => child.remove());
  const after = revision === "head";
  const green = "#166c60", muted = "#6a7c70", old = "#a54d32";
  svgNode("rect", { x: 16, y: 20, width: 282, height: 415, fill: "#edf3e9", stroke: "#afc3b1" }, root);
  svgNode("rect", { x: 378, y: 20, width: 686, height: 415, fill: "#fbfcf7", stroke: "#afc3b1" }, root);
  svgNode("text", { x: 34, y: 48, "font-size": 13, "font-weight": 700, fill: "#233633", class: "svg-mono" }, root, "packages/daemon");
  svgNode("text", { x: 34, y: 68, "font-size": 11, fill: muted }, root, "DaemonPolicy · already present in base");
  svgNode("text", { x: 398, y: 48, "font-size": 13, "font-weight": 700, fill: "#233633", class: "svg-mono" }, root, "apps/cli");
  svgNode("text", { x: 398, y: 68, "font-size": 11, fill: muted }, root, after ? "Composition supplies policy inputs to the existing consumers" : "Consumers still have local sources for their operating limits");
  svgNode("path", { d: "M298 78 H365 V416", stroke: muted, "stroke-width": 1, "stroke-dasharray": "3 5", fill: "none" }, root);
  const consumers = {
    transport: ["LocalDaemonTransport", "JSON / control-frame validation · response deadlines"],
    startup: ["Registry · StartupCoordinator · WorkspaceDaemon", "Ownership · launch retries · heartbeat and polling"],
    shutdown: ["Controller · Lifetime · ProcessTerminator · WorkspaceDaemon", "Idle timer · stop budget · exit polling · drain acknowledgements"],
    delivery: ["LocalDaemonTransport", "Accepted-execution reattachments · per-attempt fetch resume"],
    output: ["Capture · Spool · Codec · TransferDecoder · WorkerProtocol", "Write, retain, frame, validate and read the same chunk limit"],
    resources: ["ResourceSupervisor · WorkspaceDaemon · worker entry", "RSS thresholds · replacement circuit · worker heap and sampling"],
    diagnostics: ["DaemonLogger · WorkspaceDaemon", "Rotation · queued events · disconnected traces"]
  };
  DATA.groups.forEach((group, i) => {
    const y = 89 + i * 44;
    const count = DATA.ledger.leaves.filter((leaf) => leaf.id.startsWith(group.id + ".")).length;
    const anchor = svgNode("a", { href: "#follow", "data-map-group": group.id, "aria-label": "Follow " + group.name + " policy", tabindex: "0" }, root);
    svgNode("rect", { x: 30, y: y, width: 254, height: 36, rx: 2, fill: "#fffefa", stroke: "#c5d4c4", class: "group-back" }, anchor);
    svgNode("text", { x: 43, y: y + 22, "font-size": 12, "font-weight": 600, fill: green }, anchor, group.name);
    svgNode("text", { x: 265, y: y + 22, "font-size": 10, fill: muted, "text-anchor": "end" }, anchor, count + " fields ↗");
    svgNode("path", { d: "M284 " + (y + 18) + " H388", fill: "none", stroke: after ? green : "#a9b4ab", "stroke-width": after ? 2 : 1, "stroke-dasharray": after ? "none" : "3 5" }, root);
    if (after) svgNode("path", { d: "M383 " + (y + 14) + " L390 " + (y + 18) + " L383 " + (y + 22), stroke: green, fill: "none", "stroke-width": 2 }, root);
    svgNode("rect", { x: 396, y: y, width: 99, height: 35, rx: 2, fill: after ? "#e1efe5" : "#fae8db", stroke: after ? "#9dbda9" : "#d5ac91" }, root);
    svgNode("text", { x: 445, y: y + 14, "text-anchor": "middle", "font-size": 9, fill: after ? green : old }, root, after ? "required" : "local");
    svgNode("text", { x: 445, y: y + 26, "text-anchor": "middle", "font-size": 9, fill: after ? green : old }, root, after ? "policy input" : "value / input");
    svgNode("path", { d: "M495 " + (y + 18) + " H520", stroke: after ? green : old, "stroke-width": 2 }, root);
    svgNode("path", { d: "M516 " + (y + 14) + " L523 " + (y + 18) + " L516 " + (y + 22), stroke: after ? green : old, fill: "none", "stroke-width": 2 }, root);
    svgNode("text", { x: 534, y: y + 14, "font-size": 11, "font-weight": 600, fill: "#233633" }, root, consumers[group.id][0]);
    svgNode("text", { x: 534, y: y + 29, "font-size": 10, fill: muted }, root, consumers[group.id][1]);
  });
  svgNode("text", { x: 34, y: 421, "font-size": 10, fill: muted }, root, "Select a section to follow its values.");
  svgNode("text", { x: 398, y: 421, "font-size": 10, fill: after ? green : old }, root, after ? "Changed: the supply path. The consumers remain in this package." : "The snapshot already crosses processes; local defaults still coexist.");
}

function renderDecisions() {
  const shortReasons = {
    required: "Omitted composition must not recreate local defaults.",
    values: "The architecture spec requires behavior preservation, one policy owner and no user tuning.",
    purpose: "Status observation and ordinary execution-status requests have distinct deadlines.",
    budgets: "Each reattached execute attempt needs its own fetch-resume allowance; startup retains a fresh launch after failure.",
    adapters: "Tests need small limits without restoring production tuning seams."
  };
  $("#decision-register").innerHTML = DATA.decisions.map((decision) =>
    '<a class="decision-row" href="#decision-' + decision.id + '" data-decision="' + decision.id + '" style="text-decoration:none;color:inherit">' +
    '<span class="decision-num">' + numberOf(decision) + "</span>" +
    '<span class="decision-name">' + escapeHtml(decision.title) + "</span>" +
    '<span class="decision-description"><span class="decision-change"><span class="from">' + escapeHtml(decision.before) +
    '</span><span aria-hidden="true">→</span><span class="to">' + escapeHtml(decision.after) + '</span></span>' +
    '<span class="decision-brief" style="display:block">' + escapeHtml(decision.summary) + "</span>" +
    (shortReasons[decision.id] ? '<span class="top-reason">Reason: ' + escapeHtml(shortReasons[decision.id]) + "</span>" : "") + "</span>" +
    statusMarkup(decision.status) + "</a>"
  ).join("");
  $("#decision-details").innerHTML = DATA.decisions.map((decision) =>
    '<article id="decision-' + decision.id + '" class="decision-detail">' +
    '<div class="detail-title"><span class="decision-num">' + numberOf(decision) + "</span><h3>" + escapeHtml(decision.title) + "</h3>" + statusMarkup(decision.status) + "</div>" +
    '<div class="detail-reason"><b>Reason found</b><p>' + escapeHtml(decision.reason) + "<small>" + escapeHtml(decision.reasonSource) + "</small></p></div>" +
    '<div class="detail-mechanism">' + decision.details.map((pair) => "<div><h4>" + escapeHtml(pair[0]) + "</h4><p>" + escapeHtml(pair[1]) + "</p></div>").join("") + "</div>" +
    '<div class="detail-citations">' + decision.refs.map((ref) => sourceButton(ref)).join("") + "</div>" +
    '<div class="detail-actions"><button class="text-button" data-leaf-jump="' + decision.leaf + '">Follow the related value ↗</button><a href="#whole-change" data-top-decision="' + decision.id + '">↑ Decision ' + numberOf(decision) + " in the whole change</a></div></article>"
  ).join("");
}

function renderGroupPicker() {
  $("#group-picker").innerHTML = DATA.groups.map((group) =>
    '<button data-group="' + group.id + '" aria-pressed="' + (group.id === selectedGroup) + '"><span aria-hidden="true">' +
    group.icon + "</span>" + group.name + "</button>").join("");
  $("#leaf-menu-title").textContent = groupById.get(selectedGroup).subtitle;
  $("#leaf-picker").innerHTML = DATA.ledger.leaves.filter((leaf) => leaf.id.startsWith(selectedGroup + ".")).map((leaf) =>
    '<button data-leaf="' + leaf.id + '" aria-pressed="' + (leaf.id === selectedLeaf) + '">' +
    leafName(leaf) + "<span>" + escapeHtml(leaf.display) + "</span></button>").join("");
}
function selectGroup(groupId) {
  selectedGroup = groupId;
  selectedLeaf = DATA.ledger.leaves.find((leaf) => leaf.id.startsWith(groupId + ".")).id;
  renderGroupPicker();
  renderLeaf();
}
function selectLeaf(id) {
  if (!leafById.has(id)) return;
  selectedLeaf = id;
  selectedGroup = id.split(".")[0];
  renderGroupPicker();
  renderLeaf();
}
function routeEntry(entry, side) {
  const file = entry.path.split("/").pop();
  const lines = DATA.sources[side + ":" + entry.path];
  const sourceRef = { side: side, path: entry.path, start: Math.max(1, entry.line - 2), end: Math.min(lines.length, entry.line + 5), highlight: entry.line };
  const form = side === "base" ? entry.form || "local supply" : entry.composition ? "composition selects the input" : "reads or receives the policy value";
  return '<div class="route-node"><b>' + escapeHtml(file) + '</b><span>' + escapeHtml(form) + '</span><span>' +
    escapeHtml(entry.text) + "</span>" + sourceButton(sourceRef, side + " · line " + entry.line + " ↗") + "</div>";
}
function renderLeaf() {
  const leaf = leafById.get(selectedLeaf);
  $("#leaf-path").textContent = leaf.id;
  $("#leaf-name").textContent = leafName(leaf);
  $("#leaf-value").textContent = leaf.display;
  $("#leaf-purpose").textContent = leaf.record.applies + " · " + leaf.record.value.replaceAll("`", "");
  $("#before-route").innerHTML = leaf.before.map((entry) => routeEntry(entry, "base")).join("");
  $("#after-route").innerHTML = '<div class="route-node" style="background:var(--pale)"><b>DaemonPolicy.values.' + escapeHtml(selectedGroup) +
    '</b><span>' + escapeHtml(leaf.id.split(".")[1]) + "</span></div>" +
    (leaf.after.length ? leaf.after.map((entry) => routeEntry(entry, "head")).join("") :
      '<div class="route-empty">No direct CLI production reader remains. This field stays in the policy snapshot and its derivation; the daemon no longer re-derives the resource policy from it.</div>');
  $("#leaf-reason").textContent = leaf.record.reason + " — existing policy record, line " + leaf.record.line + ".";
  const related = DATA.decisions.filter((decision) => decision.leaf === selectedLeaf || decision.id === groupById.get(selectedGroup).decision);
  $("#leaf-related").innerHTML = sourceButton({ side: "head", path: "plans/005/daemon-policy.md", start: leaf.record.line, end: leaf.record.line }, "Source of this value's reason ↗") +
    related.map((decision) => '<button class="text-button" data-decision="' + decision.id + '">Decision ' + numberOf(decision) + " · " + escapeHtml(decision.title) + " ↗</button>").join("");
}

function renderClock() {
  const status = $("#clock-purpose").value === "status-observer";
  $("#clock-fill").style.width = status ? "40%" : "100%";
  $("#clock-value").textContent = status ? "100 ms" : "250 ms";
  $("#clock-explanation").textContent = status ?
    "The status action chooses the status-observer purpose. Its identify and ping exchanges use the 100 ms response budget." :
    "Ordinary composition chooses the 250 ms response budget. This also governs execution-status; the word status in a message does not select the shorter clock.";
}
function renderRecovery() {
  const scenario = $("#recovery-scenario").value;
  $("#recovery-result").innerHTML = ["base", "head"].map((side) => {
    const run = DATA.reattach.find((row) => row.scenario === scenario && row.side === side);
    return "<div><span>" + (side === "base" ? "Before" : "After") + "</span><b>" + escapeHtml(run.code || run.status) +
      "</b><small>" + run.executeAttempts + " execute attempts</small><small>" + escapeHtml(run.message || "The retained result completes.") + "</small></div>";
  }).join("");
}
function renderEvidence() {
  $("#spill-rows").innerHTML = DATA.spill.map((row) => "<tr><td>" + escapeHtml(row.test) +
    '</td><td class="numeric">' + row.before.clientSpills + " → " + row.after.clientSpills +
    '</td><td class="numeric">' + row.before.daemonSpills + " → " + row.after.daemonSpills + "</td></tr>").join("");
  $("#file-rows").innerHTML = DATA.files.map((file) =>
    '<tr><td class="path"><a href="evidence.html#' + file.id + '">' + escapeHtml(file.path) + "</a></td><td>" +
    escapeHtml(file.category) + '</td><td class="numeric">+' + file.added + " / −" + file.removed + "</td></tr>").join("");
}
function showSource(ref) {
  const lines = DATA.sources[ref.side + ":" + ref.path];
  $("#source-side").textContent = ref.side === "head" ? "After · PR 131 head" : "Before · PR 131 base";
  $("#source-title").textContent = ref.path.split("/").pop();
  $("#source-location").textContent = ref.path + " · lines " + ref.start + "–" + ref.end;
  $("#source-code").innerHTML = lines.slice(ref.start - 1, ref.end).map((line, offset) => {
    const number = ref.start + offset;
    return '<span class="source-line' + (number === ref.highlight ? " highlight" : "") + '"><span class="line-no">' +
      number + "</span>" + escapeHtml(line || " ") + "</span>";
  }).join("");
  $("#source-revision").textContent = "Exact source at " + DATA.shas[ref.side] + ". Close or press Escape to return.";
  $("#source-dialog").showModal();
  $(".source-scroll").scrollTop = 0;
}

document.addEventListener("click", (event) => {
  const source = event.target.closest("[data-source]");
  if (source) { showSource(JSON.parse(source.dataset.source)); return; }
  const mapGroup = event.target.closest("[data-map-group]");
  if (mapGroup) { event.preventDefault(); selectGroup(mapGroup.dataset.mapGroup); goTo("follow"); return; }
  const revisionButton = event.target.closest("[data-revision]");
  if (revisionButton) {
    revision = revisionButton.dataset.revision;
    $$("[data-revision]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.revision === revision)));
    renderMap(); return;
  }
  const decision = event.target.closest("[data-decision]");
  if (decision) { event.preventDefault(); goTo("decision-" + decision.dataset.decision); return; }
  const topDecision = event.target.closest("[data-top-decision]");
  if (topDecision) {
    event.preventDefault();
    const row = document.querySelector('.decision-row[data-decision="' + topDecision.dataset.topDecision + '"]');
    originStack.push({ y: scrollY, hash: location.hash, focus: document.activeElement });
    $("#return-to-origin").hidden = false;
    history.pushState(null, "", "#whole-change");
    row.scrollIntoView({ behavior: prefersReducedMotion ? "instant" : "smooth", block: "center" });
    row.focus({ preventScroll: true }); return;
  }
  const leafJump = event.target.closest("[data-leaf-jump]");
  if (leafJump) { selectLeaf(leafJump.dataset.leafJump); goTo("follow"); return; }
  const group = event.target.closest("[data-group]");
  if (group) {
    const id = group.dataset.group;
    selectGroup(id);
    document.querySelector('#group-picker [data-group="' + id + '"]').focus({ preventScroll: true });
    return;
  }
  const leaf = event.target.closest("[data-leaf]");
  if (leaf) {
    const id = leaf.dataset.leaf;
    selectLeaf(id);
    document.querySelector('#leaf-picker [data-leaf="' + id + '"]').focus({ preventScroll: true });
    return;
  }
});
$("#close-source").addEventListener("click", () => $("#source-dialog").close());
$("#source-dialog").addEventListener("click", (event) => {
  if (event.target !== $("#source-dialog")) return;
  const box = $("#source-dialog").getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) $("#source-dialog").close();
});
$("#return-to-origin").addEventListener("click", returnToOrigin);
$("#clock-purpose").addEventListener("change", renderClock);
$("#recovery-scenario").addEventListener("change", renderRecovery);
renderMap();
renderDecisions();
renderGroupPicker();
renderLeaf();
renderClock();
renderRecovery();
renderEvidence();
if (location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))) {
  requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1))).scrollIntoView());
}
