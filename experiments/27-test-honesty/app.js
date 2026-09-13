(() => {
  "use strict";
  function openHash() {
    const hash = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(hash);
    if (!target) return;
    if (target.matches("details.decision")) target.open = true;
    const parent = target.closest("details");
    if (parent) parent.open = true;
    if (target.matches("details.decision"))
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }
  addEventListener("hashchange", openHash);
  openHash();
  document.querySelectorAll('a[href^="#d-"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target) target.open = true;
    });
  });
  document.querySelectorAll(".close-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const details = button.closest("details");
      details.open = false;
      const summary = details.querySelector("summary");
      summary.focus({ preventScroll: true });
      details.scrollIntoView({ block: "start" });
    });
  });
  document.querySelectorAll("[data-replay]").forEach((replay) => {
    let current = 0;
    const steps = [...replay.querySelectorAll("[data-step]")];
    const notes = [
      "the first execute is accepted, then disconnected.",
      "the reattached execute receives a manifest, then disconnects.",
      "the reattached attempt fetches the empty result to completion.",
      "acknowledgement completes; both builds return exit 0.",
    ];
    const previous = replay.querySelector("[data-prev]");
    const next = replay.querySelector("[data-next]");
    function update() {
      steps.forEach((step, index) => {
        step.classList.toggle("active", index === current);
      });
      replay.querySelector(".trace-counter").textContent =
        `Exchange ${current + 1} of 4 · ${notes[current]}`;
      previous.disabled = current === 0;
      next.textContent =
        current === 3 ? "Replay from start ↺" : "Next exchange →";
    }
    previous.addEventListener("click", () => {
      current = Math.max(0, current - 1);
      update();
    });
    next.addEventListener("click", () => {
      current = (current + 1) % 4;
      update();
    });
    update();
  });
  const prSelect = document.querySelector("#filter-pr");
  const kindSelect = document.querySelector("#filter-kind");
  if (prSelect && kindSelect) {
    const rows = [...document.querySelectorAll(".inventory-table tbody tr")];
    const update = () => {
      let visible = 0;
      for (const row of rows) {
        const show =
          (prSelect.value === "all" || row.dataset.pr === prSelect.value) &&
          (kindSelect.value === "all" || row.dataset.kind === kindSelect.value);
        row.hidden = !show;
        if (show) visible++;
      }
      document.querySelector("#inventory-count").textContent =
        `${visible} test ${visible === 1 ? "file" : "files"}`;
    };
    prSelect.addEventListener("change", update);
    kindSelect.addEventListener("change", update);
    update();
  }
  const returnLink = document.querySelector(".return-link");
  const returnId = new URLSearchParams(location.search).get("return");
  if (returnLink && /^(?:d-[a-z-]+|inventory)$/.test(returnId || "")) {
    returnLink.href = `../index.html#${returnId}`;
    returnLink.textContent =
      returnId === "inventory"
        ? "← Return to the test inventory"
        : "← Return to this decision";
  }
  let printState = [];
  addEventListener("beforeprint", () => {
    printState = [...document.querySelectorAll("details")].map((el) => [
      el,
      el.open,
    ]);
    printState.forEach(([el]) => {
      el.open = true;
    });
  });
  addEventListener("afterprint", () => {
    printState.forEach(([el, open]) => {
      el.open = open;
    });
  });
})();
