"use strict";

document.documentElement.classList.add("js-ready");

function revealDestination() {
  let target;
  try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
  catch { return; }
  if (!target) return;
  let parent = target;
  while (parent) {
    if (parent instanceof HTMLDetailsElement) parent.open = true;
    parent = parent.parentElement;
  }
  requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
}
window.addEventListener("hashchange", revealDestination);
if (location.hash) revealDestination();

const slider = document.getElementById("trace-step");
const outcome = document.getElementById("release-outcome");
const previous = document.getElementById("trace-prev");
const next = document.getElementById("trace-next");
const slotNames = ["def", "refs", "target", "in", "out", "pos"];
const frameTitles = [
  ["0 / Queries have filled caches", "A cache interval is in use. No release call has started."],
  ["1 / Call release: clear, then start cleanup", "Both versions remove their old cache entries before project cleanup."],
  ["2 / Give the caller a continuation", "The base call finishes. The head call is still awaiting the graph."],
  ["3 / Query again while cleanup is pending", "A definitions lookup refills its own store. Release has not disabled the handles."],
  ["4 / Project cleanup settles", "The head carries the project’s result through the backend’s release promise."]
];

function write(id, value) { document.getElementById(id).textContent = value; }
function drawSlots(id, step) {
  const slots = document.getElementById(id);
  slots.replaceChildren(...slotNames.map((name, i) => {
    const slot = document.createElement("span");
    const old = step === 0;
    const fresh = step >= 3 && i === 0;
    slot.textContent = old ? name : fresh ? "new" : "—";
    slot.className = old ? "full" : fresh ? "fresh" : "";
    slot.title = `${name}: ${old ? "old entry" : fresh ? "fresh entry" : "empty"}`;
    return slot;
  }));
}
function renderTrace() {
  const step = Number(slider.value);
  const rejects = outcome.value === "reject";
  const [title, detail] = frameTitles[step];
  const frame = document.getElementById("trace-frame");
  const heading = document.createElement("b");
  heading.textContent = title;
  const subtitle = document.createElement("span");
  subtitle.textContent = detail;
  frame.replaceChildren(heading, subtitle);
  slider.setAttribute("aria-valuetext", title);
  const project = step === 0 ? "Not started" : step < 4 ? "Pending" : rejects ? "Rejected" : "Complete";
  const cache = step === 0 ? "Old values" : step < 3 ? "Empty" : "Fresh definition entry";
  write("base-project", project);
  write("head-project", project);
  write("base-cache", cache);
  write("head-cache", cache);
  write("base-caller", step === 0 ? "No release call" : step === 1 ? "About to finish" : "Release fulfilled");
  write("head-caller", step === 0 ? "No release call" : step < 4 ? "Release pending" : rejects ? "Release rejected" : "Release fulfilled");
  const captions = [
    "The six slots represent independent stores under one service. They do not share entries.",
    "Clearing first is retained from the base. The ownership of that clearing routine moves to core.",
    "The changed boundary is what the caller’s release promise waits for. Old cache entries are already gone in both versions.",
    "The scope has no closed state. A query may refill a handle before the release call settles.",
    rejects ? "Project rejection reaches the head’s release caller. The base release promise has already fulfilled and does not carry that rejection." : "The head release promise fulfills after the graph completes. The base release promise fulfilled earlier."
  ];
  write("trace-caption", captions[step]);
  drawSlots("base-slots", step);
  drawSlots("head-slots", step);
  previous.disabled = step === 0;
  next.disabled = step === 4;
}
slider.addEventListener("input", renderTrace);
outcome.addEventListener("change", renderTrace);
previous.addEventListener("click", () => { slider.value = String(Math.max(0, Number(slider.value) - 1)); renderTrace(); });
next.addEventListener("click", () => { slider.value = String(Math.min(4, Number(slider.value) + 1)); renderTrace(); });
renderTrace();
