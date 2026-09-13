(() => {
  "use strict";
  const data = window.REVIEW_DATA;
  const dialog = document.getElementById("source-dialog");
  const close = document.getElementById("close-source");

  function revealHash() {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    if (target.tagName === "DETAILS") target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }
  window.addEventListener("hashchange", revealHash);
  revealHash();

  document.querySelectorAll("[data-source]").forEach(button => {
    button.addEventListener("click", () => {
      const source = data.sources[button.dataset.source];
      document.getElementById("source-side").textContent = `${source.side} · ${source.sha.slice(0, 8)}`;
      document.getElementById("source-title").textContent = source.path.split("/").at(-1);
      document.getElementById("source-location").textContent = `${source.path} · lines ${source.start}–${source.start + source.lines.length - 1}`;
      const code = document.getElementById("source-code");
      code.replaceChildren(...source.lines.map((line, offset) => {
        const row = document.createElement("span");
        const number = document.createElement("span");
        number.className = "line-number";
        number.textContent = String(source.start + offset);
        row.append(number, document.createTextNode(line || " "));
        return row;
      }));
      const full = document.getElementById("source-full");
      full.href = `evidence.html${source.diffId ? "#" + source.diffId : ""}`;
      full.textContent = source.diffId ? "Open the full PR diff for this path →" : "This source is unchanged in the PR; browse the changed paths →";
      dialog.showModal();
      close.focus();
    });
  });
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  const routes = {
    disabled: [0, "cold", "Execute locally before registry reads or daemon observation.", 0, 0, 0, 0],
    absent: [1, "cold · absent", "Trigger independent startup and execute locally without waiting for it.", 1, 0, 0, 1],
    "read-error": [1, "cold · recovering", "Execute locally after the registry read fails. No startup trigger.", 1, 0, 0, 0],
    starting: [2, "cold · starting", "Execute locally. Starting wins before version comparison, even if the record is incompatible.", 1, 0, 0, 0],
    version: [3, "fallback · incompatible", "Trigger independent startup and execute locally in fallback mode. No socket observation.", 1, 0, 0, 1],
    ready: [4, "warm", "Execute on the compatible daemon. No local executor is created.", 1, 1, 0, 0],
    busy: [4, "warm", "Busy remains a warm route. Admission and queueing are handled by the daemon.", 1, 1, 0, 0],
    "pong-starting": [4, "cold · recovering", "The stored record passed, but the pong reports starting. Execute locally without a trigger.", 1, 1, 0, 0],
    "pong-version": [4, "fallback · incompatible", "The pong version differs. Trigger independent startup and execute locally in fallback mode.", 1, 1, 0, 1],
    unresponsive: [4, "cold · recovering", "Execute locally after an unresponsive observation. Do not remove the record or trigger startup here.", 1, 1, 0, 0],
    "observe-error": [4, "cold · recovering", "Observation throws. Execute locally without a startup trigger.", 1, 1, 0, 0],
    "observed-starting": [4, "cold · starting", "The observer reports a starting daemon. Execute locally without a startup trigger.", 1, 1, 0, 0],
    exited: [4, "fallback · dead", "Attempt compare-removal of the exited process record, trigger startup and execute locally in fallback mode.", 1, 1, 1, 1],
    invalid: [4, "fallback · incompatible", "Trigger independent startup and execute locally in fallback mode.", 1, 1, 0, 1],
  };
  const selector = document.getElementById("route-case");
  function renderRoute() {
    const [stop, mode, description, reads, observations, removals, triggers] = routes[selector.value];
    document.querySelectorAll("[data-guard]").forEach(node => {
      const index = Number(node.dataset.guard);
      node.classList.toggle("passed", index < stop);
      node.classList.toggle("decided", index === stop);
      node.classList.toggle("skipped", index > stop);
      node.title = index < stop ? "Passed; next guard is reached" : index === stop ? "This step selects the route" : "Skipped after the decision";
      node.setAttribute("aria-label", `${node.textContent}: ${node.title}`);
    });
    document.getElementById("route-mode").textContent = mode;
    document.getElementById("route-description").textContent = description;
    const counts = [
      ["Record read attempts", reads],
      ["Observation calls", observations],
      ["Compare-removal attempts", removals],
      ["Independent startup triggers", triggers],
      ["Local executor factories", mode === "warm" ? 0 : 1],
    ];
    document.getElementById("route-effects").replaceChildren(...counts.flatMap(([label, count]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const value = document.createElement("dd");
      value.textContent = String(count);
      return [term, value];
    }));
  }
  selector.addEventListener("change", renderRoute);
  renderRoute();
})();
