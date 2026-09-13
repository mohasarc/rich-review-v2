import { git, describeModule, prHeads, MAIN_SHA } from "./lib.mjs";
const OWNERS = { DaemonActivityProjector: /(daemon-)?activity-projector\.ts$/, DaemonWorkerGenerationManager: /(daemon-)?worker-generation-manager\.ts$/, DaemonDeliverySession: /(daemon-)?delivery-session\.ts$/, AcceptedExecutionSession: /accepted-execution-session\.ts$/ };
const stops = [{ id: "main", sha: MAIN_SHA }].concat(prHeads().map((h) => ({ id: `#${h.number}`, sha: h.sha }))).filter((s) => ["#143","#144","#145","#146","#147","#148","#149"].includes(s.id));
for (const s of stops) {
  const files = git("ls-tree", "-r", "--name-only", s.sha).split("\n");
  for (const [cls, re] of Object.entries(OWNERS)) {
    for (const f of files.filter((x) => re.test(x) && !x.includes("/test/"))) {
      const d = describeModule(git("show", `${s.sha}:${f}`), f);
      const c = d.classes.find((k) => k.name === cls);
      if (!c) continue;
      const pub = c.members.filter((m) => m.visibility === "public" && m.kind !== "property");
      console.log(s.id, f, cls, `${d.lines}L`, "members", c.members.length, "public", pub.map((m) => (m.static ? "static " : "") + m.name).join(","));
    }
  }
}
