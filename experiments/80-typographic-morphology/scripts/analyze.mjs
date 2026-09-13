import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { LINEAGE, PLAN } from "../content/entry.mjs";
import { bundlePrs, describeModule, git, MAIN_SHA, prHeads, ROOT, TIP_SHA } from "./lib.mjs";

const { frames } = JSON.parse(readFileSync(path.join(ROOT, "data/frames.json"), "utf8"));
const extract = JSON.parse(readFileSync(path.join(ROOT, "data/extract.json"), "utf8"));
const testBodies = JSON.parse(readFileSync(path.join(ROOT, "data/test-bodies.json"), "utf8"));
const byId = Object.fromEntries(frames.map((f) => [f.id, f]));
const heads = prHeads();
const out = {};

// 1. Lineage coverage: every body word that disappears between consecutive frames has exactly one fate.
const order = frames.map((f) => f.id);
const coverage = [];
for (let i = 1; i < order.length; i += 1) {
  const a = byId[order[i - 1]].copies.find((c) => c.owner === "cli") ?? byId[order[i - 1]].copies[0];
  const b = byId[order[i]].copies.find((c) => c.owner === "cli") ?? byId[order[i]].copies[0];
  const bn = new Set(b.members.map((m) => m.name));
  const an = new Set(a.members.map((m) => m.name));
  const removed = a.members.filter((m) => !bn.has(m.name)).map((m) => m.name);
  const added = b.members.filter((m) => !an.has(m.name)).map((m) => m.name);
  const fates = (LINEAGE[order[i]] ?? []).map((l) => l.from);
  const missing = removed.filter((r) => !fates.includes(r));
  const extra = fates.filter((f) => !removed.includes(f));
  coverage.push({ frame: order[i], removed, added, missing, extra });
  for (const fate of LINEAGE[order[i]] ?? []) {
    if (!fate.owner) continue;
    const owner = byId[order[i]].owners[fate.owner]?.[0];
    if (!owner) throw new Error(`owner ${fate.owner} missing at ${order[i]}`);
    if (["same", "renamed"].includes(fate.kind) && !owner.members.some((m) => m.name === fate.to)) {
      throw new Error(`${order[i]}: ${fate.from} → ${fate.owner}.${fate.to} not found`);
    }
  }
}
out.coverage = coverage;
const coverageErrors = coverage.filter((c) => c.missing.length || c.extra.length);
if (coverageErrors.length) {
  console.error(JSON.stringify(coverageErrors, null, 2));
  throw new Error("lineage coverage mismatch");
}

// 2. Similarity scores for moved words (from extract.json lineage, recomputed there with token-bigram Dice).
const scores = {};
for (const step of extract.steps) {
  for (const l of step.lineage) {
    if (!l.best) continue;
    scores[`${step.number}:${l.member}`] = { best: `${l.best.className}.${l.best.name}`, score: Number(l.best.score.toFixed(2)) };
  }
}
out.similarity = scores;

// 3. Morpheme prediction at #137 (last frame before extraction).
const before = byId["137"].copies[0].members.map((m) => m.name);
const fateOf = {};
for (const id of ["144", "145", "146", "147"]) for (const l of LINEAGE[id]) fateOf[l.from] = { frame: id, ...l };
const planOwners = PLAN.owners.filter((o) => o.key !== "coordinator");
const prediction = before.map((word) => {
  const predicted = planOwners.filter((o) => o.morpheme.test(word)).map((o) => o.className);
  const fate = fateOf[word];
  return { word, predicted, actual: fate?.owner ?? null, kind: fate?.kind ?? "stays" };
});
const summary = {};
for (const o of planOwners) {
  const tinted = prediction.filter((p) => p.predicted.includes(o.className));
  const went = prediction.filter((p) => p.actual === o.className);
  summary[o.className] = {
    tinted: tinted.length,
    tintedAndWent: tinted.filter((p) => p.actual === o.className).map((p) => p.word),
    tintedButStayedOrElsewhere: tinted.filter((p) => p.actual !== o.className).map((p) => `${p.word}→${p.actual ?? "stays"}`),
    wentUntinted: went.filter((p) => !p.predicted.includes(o.className)).map((p) => p.word),
    went: went.length,
  };
}
out.prediction = { words: prediction, summary };

// 4. Morpheme "daemon" in file names vs class names.
const nameStats = [];
for (const [label, sha, re] of [["#147 apps/cli/src/daemon", heads.find((h) => h.number === 147).sha, /^apps\/cli\/src\/daemon\/[^/]+\.ts$/], ["#149 packages/daemon/src", TIP_SHA, /^packages\/daemon\/src\/.+\.ts$/]]) {
  const files = git("ls-tree", "-r", "--name-only", sha).split("\n").filter((f) => re.test(f) && !f.endsWith(".test.ts"));
  const classes = files.flatMap((f) => describeModule(git("show", `${sha}:${f}`), f).classes.filter((c) => c.exported).map((c) => c.name));
  nameStats.push({
    label, sha,
    files: files.length,
    filesWithDaemon: files.filter((f) => f.split("/").pop().includes("daemon")).length,
    classes: classes.length,
    classesWithDaemon: classes.filter((c) => c.includes("Daemon")).length,
  });
}
out.nameStats = nameStats;

// 5. #148 copies: body identical, import specifiers differ.
const sha148 = byId["148"].sha;
const cliSrc = git("show", `${sha148}:apps/cli/src/daemon/daemon-process-coordinator.ts`).split("\n");
const pkgSrc = git("show", `${sha148}:packages/daemon/src/process/process-coordinator.ts`).split("\n");
const isImportLine = (l) => /^(import |} from |  [A-Za-z]+,$|  type [A-Za-z]+,$)/.test(l) || /import\(".+"\)/.test(l);
const strip = (lines) => lines.map((l) => l.replace(/(["'])\.{1,2}\/[^"']+\1/g, '"<path>"')).join("\n").replace(/\s+/g, " ");
const cliCopy = byId["148"].copies.find((c) => c.owner === "cli");
const pkgCopy = byId["148"].copies.find((c) => c.owner === "daemon");
const specDiff = cliCopy.imports.filter((i) => {
  const twin = pkgCopy.imports.find((j) => j.name === i.name);
  return twin && twin.spec !== i.spec;
}).length;
out.copy148 = {
  cliLines: cliSrc.length - 1,
  pkgLines: pkgSrc.length - 1,
  identicalAfterPathNormalization: strip(cliSrc.filter((l) => !isImportLine(l))) === strip(pkgSrc.filter((l) => !isImportLine(l))),
  bodyMembersIdentical: JSON.stringify(cliCopy.members.map((m) => [m.name, m.lines])) === JSON.stringify(pkgCopy.members.map((m) => [m.name, m.lines])),
  importedNamesWithDifferentSpecifier: specDiff,
  importedNames: cliCopy.imports.length,
};

// 6. Freeze digest recomputed from git objects at #148.
const freezeTest = git("show", `${sha148}:meta-tests/src/daemon-compatibility-copy.test.ts`);
const expectedDigest = freezeTest.match(/"([0-9a-f]{64})"/)[1];
const cliOwned = new Set(["daemon-command-dispatcher.ts", "invocation-route.ts", "invocation-workspace-selector.ts"]);
const frozenFiles = git("ls-tree", "--name-only", `${sha148}:apps/cli/src/daemon/`).split("\n").filter(Boolean)
  .filter((n) => n.endsWith(".ts") && !n.endsWith(".test.ts") && !cliOwned.has(n)).sort().map((n) => `apps/cli/src/daemon/${n}`);
const hash = createHash("sha256");
for (const f of frozenFiles) {
  hash.update(f); hash.update("\0");
  hash.update(git("show", `${sha148}:${f}`).replace(/\r\n/g, "\n")); hash.update("\0");
}
out.freeze = { expectedDigest, recomputed: hash.digest("hex"), files: frozenFiles.length, includesBox: frozenFiles.includes("apps/cli/src/daemon/daemon-process-coordinator.ts") };

// 7. Public members: box across all 27 snapshots; owners at tip.
const allStops = [{ id: "main", sha: MAIN_SHA }].concat(heads.map((h) => ({ id: `#${h.number}`, sha: h.sha })));
const publicWords = [];
for (const s of allStops) {
  const files = git("ls-tree", "-r", "--name-only", s.sha).split("\n").filter((f) => /(^|\/)(workspace-daemon|daemon-process-coordinator|process-coordinator)\.ts$/.test(f) && !f.includes("/test/"));
  for (const f of files) {
    const d = describeModule(git("show", `${s.sha}:${f}`), f);
    const cls = d.classes.find((c) => ["WorkspaceDaemon", "DaemonProcessCoordinator"].includes(c.name));
    const ctor = cls.members.find((m) => m.kind === "constructor");
    publicWords.push({ stop: s.id, path: f, className: cls.name, public: cls.members.filter((m) => m.visibility === "public").map((m) => m.name), constructorLines: ctor.end - ctor.start + 1, lines: d.lines, members: cls.members.length });
  }
}
out.publicWords = publicWords;
const tipOwners = byId["149"].owners;
out.ownerPublic = Object.fromEntries(Object.entries(tipOwners).map(([k, v]) => [k, v[0].members.filter((m) => m.visibility === "public" && m.kind !== "property").map((m) => (m.static ? `static ${m.name}` : m.name))]));
out.ownerPublicTotal = Object.values(out.ownerPublic).reduce((n, v) => n + v.length, 0);

// 8. Package entry exports of any of the five names, all snapshots.
const five = ["WorkspaceDaemon", "DaemonProcessCoordinator", "DaemonActivityProjector", "DaemonWorkerGenerationManager", "DaemonDeliverySession", "AcceptedExecutionSession"];
const entryHits = [];
for (const s of allStops) {
  for (const f of ["apps/cli/src/index.ts", "packages/daemon/src/index.ts", "packages/daemon/src/testing/index.ts", "packages/daemon/src/process-entry.ts", "packages/daemon/src/worker-entry.ts"]) {
    let src = "";
    try { src = git("show", `${s.sha}:${f}`); } catch { continue; }
    for (const name of five) if (new RegExp(`export[^;]*\\b${name}\\b`).test(src)) entryHits.push({ stop: s.id, file: f, name });
  }
}
out.entryExports = entryHits;

// 9. Tests: counts per snapshot + changes.
const testCounts = extract.frames.map((f) => ({ stop: f.id, files: f.tests.map((t) => ({ path: t.path, tests: t.titles.length, expects: t.expects })), tests: f.tests.reduce((n, t) => n + t.titles.length, 0) }));
out.tests = { counts: testCounts, changes: testBodies };

// 10. Touch table and commits.
const prs = bundlePrs();
out.touch = extract.steps.map((s) => ({ pr: s.number, title: s.title, numstat: s.numstat, commits: s.boxCommits.map((c) => ({ sha: c.sha, subject: c.subject })) }));
out.touchedPrs = out.touch.length;
out.touchCommits = out.touch.reduce((n, t) => n + t.commits.length, 0);
out.untouched = prs.map((p) => p.number).filter((n) => !out.touch.some((t) => t.pr === n));

// 11. Prose names for the class in PR bodies.
const prose = [];
for (const p of prs) {
  const body = p.body.replace(/```mermaid[\s\S]*?```/g, " ");
  const hits = {};
  for (const [label, re] of [["WorkspaceDaemon", /WorkspaceDaemon/g], ["workspace daemon", /workspace daemon/gi], ["process shell", /process shell/gi], ["process coordinator", /process coordinator/gi]]) {
    const n = (body.match(re) ?? []).length;
    if (n) hits[label] = n;
  }
  if (Object.keys(hits).length) prose.push({ pr: p.number, hits });
}
out.proseNames = prose;

writeFileSync(path.join(ROOT, "data/analysis.json"), JSON.stringify(out, null, 2));
console.log("coverage ok;", coverage.filter((c) => c.removed.length || c.added.length).map((c) => `${c.frame}:-${c.removed.length}+${c.added.length}`).join(" "));
console.log("prediction", JSON.stringify(summary, null, 1));
console.log("nameStats", JSON.stringify(nameStats));
console.log("copy148", JSON.stringify(out.copy148));
console.log("freeze", JSON.stringify(out.freeze));
console.log("public box words per stop unique:", [...new Set(publicWords.map((p) => p.public.join("+")))], "ctor lines", publicWords.map((p) => `${p.stop}:${p.constructorLines}`).join(" "));
console.log("owner public", out.ownerPublicTotal, JSON.stringify(out.ownerPublic));
console.log("entry exports", JSON.stringify(entryHits));
console.log("tests", testCounts.map((t) => `${t.stop}:${t.tests}`).join(" "));
console.log("touched", out.touchedPrs, "commits", out.touchCommits, "untouched", out.untouched.join(","));
console.log("prose", JSON.stringify(prose));
