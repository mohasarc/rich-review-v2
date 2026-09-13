import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { bundlePrs, describeModule, git, MAIN_SHA, parse, prHeads, ROOT, TIP_SHA } from "./lib.mjs";

const heads = Object.fromEntries(prHeads().map((h) => [h.number, h.sha]));
const prs = bundlePrs();
const titleOf = (n) => prs.find((p) => p.number === n)?.title ?? "main";

const FRAMES = [
  { id: "main", label: "main", pr: null, sha: MAIN_SHA },
  ...[130, 131, 132, 133, 134, 135, 137, 144, 145, 146, 147].map((n) => ({ id: String(n), label: `#${n}`, pr: n, sha: heads[n] })),
  { id: "148-rename", label: "#148 · renamed", pr: 148, sha: "f6f942ef7a57a6c1632752aef3e685f66a496de1", sub: "7e860218e Rename workspace daemon as process coordinator … f6f942ef7 Route daemon timing through its clock" },
  { id: "148-stage", label: "#148 · staged copy", pr: 148, sha: "f2bda0b61ff09ceaea12eb3a7d5f666d83d5ac48", sub: "f2bda0b61 Stage daemon mechanism compatibility copies" },
  { id: "148", label: "#148", pr: 148, sha: heads[148] },
  { id: "149", label: "#149", pr: 149, sha: heads[149] },
];
if (FRAMES.at(-1).sha !== TIP_SHA) throw new Error("tip mismatch");

const BOX_FILE = /(^|\/)(workspace-daemon|daemon-process-coordinator|process-coordinator)\.ts$/;
const BOX_CLASS = new Set(["WorkspaceDaemon", "DaemonProcessCoordinator"]);
const OWNER_CLASSES = ["DaemonActivityProjector", "DaemonWorkerGenerationManager", "DaemonDeliverySession", "AcceptedExecutionSession"];
const OWNER_FILE = {
  DaemonActivityProjector: /(daemon-)?activity-projector\.ts$/,
  DaemonWorkerGenerationManager: /(daemon-)?worker-generation-manager\.ts$/,
  DaemonDeliverySession: /(daemon-)?delivery-session\.ts$/,
  AcceptedExecutionSession: /accepted-execution-session\.ts$/,
};

const cache = new Map();
const show = (sha, file) => {
  const k = `${sha}:${file}`;
  if (!cache.has(k)) cache.set(k, git("show", k));
  return cache.get(k);
};
const treeCache = new Map();
const tree = (sha) => {
  if (!treeCache.has(sha)) treeCache.set(sha, git("ls-tree", "-r", "--name-only", sha).split("\n").filter(Boolean));
  return treeCache.get(sha);
};

const ownerOf = (file) => (file.startsWith("apps/cli/") ? "cli" : file.startsWith("packages/daemon/") ? "daemon" : "other");

function rootExports(sha) {
  const file = "packages/daemon/src/index.ts";
  if (!tree(sha).includes(file)) return new Set();
  const sf = parse(show(sha, file), file);
  const names = new Set();
  for (const st of sf.statements) {
    if (ts.isExportDeclaration(st) && st.exportClause && ts.isNamedExports(st.exportClause)) {
      for (const el of st.exportClause.elements) names.add(el.name.text);
    }
  }
  return names;
}

function classifyImport(spec, fromFile) {
  if (spec.startsWith("node:")) return "node";
  if (spec === "@symnav/daemon") return "daemon-root";
  if (!spec.startsWith(".")) return "external";
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), spec));
  if (resolved.startsWith("packages/daemon/")) return "daemon-relative";
  if (resolved.startsWith("apps/cli/src/daemon/")) return "cli-daemon";
  if (resolved.startsWith("apps/cli/")) return "cli-app";
  return "other";
}

function optionsOf(sha, file) {
  const sf = parse(show(sha, file), file);
  for (const st of sf.statements) {
    if (ts.isInterfaceDeclaration(st) && /Options$/.test(st.name.text)) {
      return {
        name: st.name.text,
        keys: st.members.map((m) => ({ key: m.name.getText(sf), optional: Boolean(m.questionToken), type: m.type ? m.type.getText(sf).replace(/\s+/g, " ") : "" })),
      };
    }
  }
  return null;
}

function copyAt(sha, file, roots) {
  const d = describeModule(show(sha, file), file);
  const cls = d.classes.find((c) => BOX_CLASS.has(c.name));
  const members = cls.members
    .filter((m) => m.kind !== "constructor")
    .map((m) => ({ name: m.name, kind: m.kind, visibility: m.visibility, static: m.static, lines: m.end - m.start + 1, line: m.start }));
  const ctor = cls.members.find((m) => m.kind === "constructor");
  const imports = d.imports.flatMap((imp) => {
    const source = classifyImport(imp.spec, file);
    const sf = parse(show(sha, file), file);
    const decl = sf.statements.find((s) => ts.isImportDeclaration(s) && s.moduleSpecifier.text === imp.spec && sf.getLineAndCharacterOfPosition(s.getStart()).line + 1 === imp.line);
    const elements = decl?.importClause?.namedBindings && ts.isNamedImports(decl.importClause.namedBindings) ? decl.importClause.namedBindings.elements : [];
    return imp.names.map((name) => {
      const el = elements.find((e) => (e.propertyName ?? e.name).text === name);
      const typeOnly = imp.typeOnly || Boolean(el?.isTypeOnly);
      return { name, spec: imp.spec, source, typeOnly, rootPublic: source === "daemon-root" ? roots.has(name) : false, line: imp.line };
    });
  });
  return {
    path: file,
    owner: ownerOf(file),
    className: cls.name,
    lines: d.lines,
    constructorLines: ctor ? ctor.end - ctor.start + 1 : 0,
    options: optionsOf(sha, file),
    members,
    imports,
  };
}

function ownerAt(sha, className) {
  const files = tree(sha).filter((f) => OWNER_FILE[className].test(f) && !f.includes("/test/") && !f.endsWith(".test.ts"));
  return files.map((file) => {
    const d = describeModule(show(sha, file), file);
    const cls = d.classes.find((c) => c.name === className);
    if (!cls) return null;
    return {
      path: file,
      owner: ownerOf(file),
      className,
      lines: d.lines,
      members: cls.members.map((m) => ({ name: m.name, kind: m.kind, visibility: m.visibility, static: m.static, lines: m.end - m.start + 1, line: m.start })),
    };
  }).filter(Boolean);
}

function importers(sha) {
  let out = "";
  try {
    out = git("grep", "-l", "-E", "(workspace-daemon|daemon-process-coordinator|process-coordinator)(\\.js)?['\"]", sha, "--", "*.ts", "*.mts", "*.mjs");
  } catch (e) {
    if (e.status !== 1) throw e;
  }
  return out.split("\n").filter(Boolean).map((l) => l.slice(sha.length + 1))
    .filter((f) => !(BOX_FILE.test(f) && !f.includes("/test/")))
    .map((f) => ({ path: f, owner: ownerOf(f), kind: f.endsWith(".test.ts") || f.includes("/test/") ? "test" : "production" }));
}

const frames = FRAMES.map((f) => {
  const roots = rootExports(f.sha);
  const boxFiles = tree(f.sha).filter((file) => BOX_FILE.test(file) && !file.includes("/test/"));
  const copies = boxFiles.map((file) => copyAt(f.sha, file, roots));
  const owners = Object.fromEntries(OWNER_CLASSES.map((c) => [c, ownerAt(f.sha, c)]).filter(([, v]) => v.length));
  const hasFreeze = tree(f.sha).includes("meta-tests/src/daemon-compatibility-copy.test.ts");
  for (const c of copies) {
    if (c.owner === "cli") c.role = hasFreeze ? "frozen" : "live";
    else c.role = c.path.includes("/process/") ? "staged" : "staged-flat";
  }
  if (f.id === "149") for (const c of copies) c.role = "live";
  return { ...f, title: titleOf(f.pr), rootExportCount: roots.size, copies, owners, importers: importers(f.sha), freezeTest: hasFreeze };
});

mkdirSync(path.join(ROOT, "data"), { recursive: true });
writeFileSync(path.join(ROOT, "data/frames.json"), JSON.stringify({ pins: { main: MAIN_SHA, tip: TIP_SHA }, frames }, null, 2));

for (const f of frames) {
  const cs = f.copies.map((c) => `${c.owner}:${c.role}:${c.path.split("/").slice(-2).join("/")} ${c.className} ${c.lines}L body=${c.members.length} opts=${c.options?.keys.length} imp=${c.imports.length}(${c.imports.filter((i) => i.typeOnly).length}t, root ${c.imports.filter((i) => i.source === "daemon-root").length}/${c.imports.filter((i) => i.rootPublic).length} public)`).join(" | ");
  const os = Object.entries(f.owners).map(([k, v]) => `${k.replace("Daemon", "")}×${v.length}`).join(",");
  console.log(f.id.padEnd(11), cs, "|", os, "| prod importers", f.importers.filter((i) => i.kind === "production").map((i) => i.path.split("/").pop()).join(","), "| rootExports", f.rootExportCount);
}
