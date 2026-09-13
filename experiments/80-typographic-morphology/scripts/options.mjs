import ts from "typescript";
import { git, parse, prHeads, MAIN_SHA } from "./lib.mjs";
const stops = [{ id: "main", sha: MAIN_SHA }].concat(prHeads().map((h) => ({ id: `#${h.number}`, sha: h.sha })));
let prev = "";
for (const s of stops) {
  const files = git("ls-tree", "-r", "--name-only", s.sha).split("\n").filter((f) => /(^|\/)(workspace-daemon|daemon-process-coordinator|process-coordinator)\.ts$/.test(f) && !f.includes("/test/"));
  const out = [];
  for (const f of files) {
    const sf = parse(git("show", `${s.sha}:${f}`), f);
    for (const st of sf.statements) {
      if (ts.isInterfaceDeclaration(st) && /Options$/.test(st.name.text)) {
        const keys = st.members.map((m) => `${m.name.getText(sf)}${m.questionToken ? "?" : ""}`);
        out.push(`${f.split("/").slice(-2).join("/")} ${st.name.text}{${keys.join(" ")}}`);
      }
    }
    // start() signature
    sf.forEachChild((n) => {
      if (ts.isClassDeclaration(n)) for (const m of n.members) if (ts.isMethodDeclaration(m) && m.name.getText(sf) === "start") out.push(`start${m.parameters.length ? "(" + m.parameters.map((p) => p.getText(sf)).join(",") + ")" : "()"}:${m.type ? m.type.getText(sf) : "?"}`);
    });
  }
  const line = out.join(" | ");
  if (line !== prev) console.log(s.id.padEnd(5), line);
  prev = line;
}
