import { writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { git, MAIN_SHA, parse, prHeads, ROOT } from "./lib.mjs";

const BOX_TEST = /^(apps\/cli\/src\/daemon|packages\/daemon\/src\/process)\/(workspace-daemon|daemon-process-coordinator|process-coordinator)(-[a-z-]+)?\.test\.ts$/;
const stops = [{ id: "main", sha: MAIN_SHA }].concat(prHeads().map((h) => ({ id: `#${h.number}`, sha: h.sha })));

const normalize = (s) => s
  .replace(/WorkspaceDaemon/g, "DaemonProcessCoordinator")
  .replace(/workspace-daemon/g, "process-coordinator")
  .replace(/\s+/g, " ")
  .trim();

function tests(sha) {
  const files = git("ls-tree", "-r", "--name-only", sha).split("\n").filter((f) => BOX_TEST.test(f));
  const out = new Map();
  for (const file of files) {
    const src = git("show", `${sha}:${file}`);
    const sf = parse(src, file);
    const suite = file.split("/").pop().replace(/^(workspace-daemon|daemon-process-coordinator|process-coordinator)/, "BOX");
    const visit = (node, prefix) => {
      if (ts.isCallExpression(node)) {
        const callee = node.expression.getText(sf);
        const base = callee.split(".")[0];
        const first = node.arguments[0];
        const title = first && (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first)) ? first.text : undefined;
        if (title && base === "describe") {
          node.arguments.slice(1).forEach((a) => ts.forEachChild(a, (c) => visit(c, [...prefix, normalize(title)])));
          return;
        }
        if (title && (base === "it" || base === "test")) {
          const bodyNode = node.arguments[1] ?? node.arguments.at(-1);
          const text = bodyNode.getText(sf);
          const expectLines = text.split("\n").map((l) => l.trim()).filter((l) => /\bexpect(\.|\()/.test(l)).map(normalize);
          out.set(`${suite} :: ${[...prefix, title].join(" › ")}`, {
            file,
            line: sf.getLineAndCharacterOfPosition(node.getStart()).line + 1,
            body: normalize(text),
            expectLines,
          });
          return;
        }
      }
      ts.forEachChild(node, (c) => visit(c, prefix));
    };
    visit(sf, []);
  }
  return out;
}

const report = [];
let prev = tests(stops[0].sha);
for (const stop of stops.slice(1)) {
  const cur = tests(stop.sha);
  const removedTests = [...prev.keys()].filter((k) => !cur.has(k));
  const addedTests = [...cur.keys()].filter((k) => !prev.has(k));
  const changed = [];
  for (const [k, v] of cur) {
    const p = prev.get(k);
    if (!p || p.body === v.body) continue;
    const removedExpects = p.expectLines.filter((l) => !v.expectLines.includes(l));
    const addedExpects = v.expectLines.filter((l) => !p.expectLines.includes(l));
    changed.push({ test: k, file: v.file, line: v.line, expectsBefore: p.expectLines.length, expectsAfter: v.expectLines.length, removedExpects, addedExpects });
  }
  if (removedTests.length || addedTests.length || changed.length) {
    report.push({ stop: stop.id, sha: stop.sha, removedTests, addedTests, changed });
  }
  prev = cur;
}
writeFileSync(path.join(ROOT, "data/test-bodies.json"), JSON.stringify(report, null, 2));
for (const r of report) {
  console.log(`\n== ${r.stop}: tests -${r.removedTests.length} +${r.addedTests.length}, bodies changed ${r.changed.length}`);
  for (const t of r.removedTests) console.log("  REMOVED", t);
  for (const c of r.changed) {
    const flag = c.removedExpects.length ? "EXPECT-REMOVED" : "";
    console.log(`  ~ ${c.test.slice(0, 120)} expects ${c.expectsBefore}->${c.expectsAfter} ${flag}`);
    for (const e of c.removedExpects) console.log("      - ", e.slice(0, 200));
    for (const e of c.addedExpects) console.log("      + ", e.slice(0, 200));
  }
}
