// Read-only: reads git objects from ~/projects/symnav; writes data/graphs/<label>.json
import { spawnSync, spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const require = createRequire(import.meta.url);
const ts = require(path.join(os.homedir(), "projects/rich-review-v2/worktrees/stack-head/node_modules/typescript/lib/typescript.js"));

const REPO = path.join(os.homedir(), "projects/symnav");
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), "../data/graphs");
mkdirSync(OUT, { recursive: true });

const STACK = [
  ["main", "origin/main", null],
  ["123", "origin/agent/daemon-architecture-refactor-part-01-source-cache"],
  ["124", "origin/agent/daemon-architecture-refactor-part-02-transactional-backend-state"],
  ["126", "origin/agent/daemon-architecture-refactor-part-03-project-membership-graph"],
  ["127", "origin/agent/daemon-architecture-refactor-part-04-query-cache-lifecycle"],
  ["128", "origin/agent/daemon-architecture-refactor-part-05-workspace-session"],
  ["129", "origin/agent/daemon-architecture-refactor-part-06-state-directory-ownership"],
  ["130", "origin/agent/daemon-architecture-refactor-part-07-daemon-package-policy-snapshot"],
  ["131", "origin/agent/daemon-architecture-refactor-part-08-daemon-policy-consumers"],
  ["132", "origin/agent/daemon-architecture-refactor-part-09-command-vocabulary"],
  ["133", "origin/agent/daemon-architecture-refactor-part-10-execution-failure-vocabulary"],
  ["134", "origin/agent/daemon-architecture-refactor-part-11-admission-rejection"],
  ["135", "origin/agent/daemon-architecture-refactor-part-12-injected-host-module"],
  ["136", "origin/agent/daemon-architecture-refactor-part-13-lifecycle-renderer"],
  ["137", "origin/agent/daemon-architecture-refactor-part-14-transport-framing"],
  ["138", "origin/agent/daemon-architecture-refactor-part-15"],
  ["139", "origin/agent/daemon-architecture-refactor-part-16-socket-client"],
  ["140", "origin/agent/daemon-architecture-refactor-part-17-lifecycle-client"],
  ["141", "origin/agent/daemon-architecture-refactor-part-18"],
  ["142", "origin/agent/daemon-architecture-refactor-part-19"],
  ["143", "origin/agent/daemon-architecture-refactor-part-20"],
  ["144", "origin/agent/daemon-architecture-refactor-part-21"],
  ["145", "origin/agent/daemon-architecture-refactor-part-22"],
  ["146", "origin/agent/daemon-architecture-refactor-part-23"],
  ["147", "origin/agent/daemon-architecture-refactor-part-24"],
  ["148", "origin/agent/daemon-architecture-refactor-part-25"],
  ["149", "origin/agent/daemon-architecture-refactor-part-28"],
];

const CODE = /\.(ts|tsx|mts|cts|mjs|cjs|js)$/;
const SKIP = [/node_modules\//, /\/dist\//, /^packages\/testing\/fixtures\//, /\.d\.ts$/];

function git(args) {
  const r = spawnSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 1 << 30 });
  if (r.status !== 0) throw new Error(r.stderr);
  return r.stdout;
}

function packageOf(file) {
  const m = file.match(/^(apps|packages)\/([^/]+)\//);
  if (m) return m[1] === "apps" ? "cli" : m[2];
  if (file.startsWith("meta-tests/")) return "meta-tests";
  return "root";
}

function isTestFile(file) {
  return /\.test\.(ts|mts|cts)$/.test(file) || /\/test\//.test(file) || /(^|\/)testing\//.test(file) && !file.startsWith("packages/daemon/src/testing/") || file.startsWith("meta-tests/") || /test-support|fixture/.test(file);
}

async function readBlobs(shas) {
  return new Promise((resolve, reject) => {
    const proc = spawn("git", ["-C", REPO, "cat-file", "--batch"]);
    const chunks = [];
    proc.stdout.on("data", (c) => chunks.push(c));
    proc.on("error", reject);
    proc.on("close", () => {
      const buf = Buffer.concat(chunks);
      const out = new Map();
      let off = 0;
      while (off < buf.length) {
        const nl = buf.indexOf(10, off);
        const header = buf.slice(off, nl).toString();
        const [sha, , sizeStr] = header.split(" ");
        const size = Number(sizeStr);
        out.set(sha, buf.slice(nl + 1, nl + 1 + size).toString("utf8"));
        off = nl + 1 + size + 1;
      }
      resolve(out);
    });
    proc.stdin.write(shas.join("\n") + "\n");
    proc.stdin.end();
  });
}

function resolveRelative(fromFile, spec, fileSet) {
  const base = path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), spec));
  const stems = [base];
  const extMap = { ".js": [".ts", ".tsx", ".js"], ".mjs": [".mts", ".mjs"], ".cjs": [".cts", ".cjs"] };
  const ext = path.posix.extname(base);
  const candidates = [];
  if (extMap[ext]) for (const e of extMap[ext]) candidates.push(base.slice(0, -ext.length) + e);
  candidates.push(base, base + ".ts", base + ".tsx", base + ".mjs", base + ".js", base + "/index.ts", base + "/index.js");
  for (const c of candidates) if (fileSet.has(c)) return c;
  return null;
}

function symbols(file, text, fileSet) {
  const kind = /\.(mjs|cjs|js)$/.test(file) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, false, kind);
  const exportsList = [];
  const namedImports = [];
  const hasExport = (node) => (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0;
  const target = (spec) => {
    if (spec.startsWith(".")) return { file: resolveRelative(file, spec, fileSet) };
    if (spec.startsWith("@symnav/")) { const parts = spec.split("/"); return { pkg: parts[1], sub: parts.slice(2).join("/") }; }
    return { external: spec };
  };
  for (const st of sf.statements) {
    if (ts.isImportDeclaration(st) && ts.isStringLiteral(st.moduleSpecifier)) {
      const names = [];
      const clause = st.importClause;
      if (clause) {
        if (clause.name) names.push("default");
        const nb = clause.namedBindings;
        if (nb && ts.isNamedImports(nb)) for (const el of nb.elements) names.push((el.propertyName ?? el.name).text);
        if (nb && ts.isNamespaceImport(nb)) names.push("*");
      }
      namedImports.push({ spec: st.moduleSpecifier.text, ...target(st.moduleSpecifier.text), names });
    } else if (ts.isExportDeclaration(st)) {
      const names = [];
      if (st.exportClause && ts.isNamedExports(st.exportClause)) for (const el of st.exportClause.elements) { exportsList.push(el.name.text); names.push((el.propertyName ?? el.name).text); }
      else if (!st.exportClause) exportsList.push("*");
      if (st.moduleSpecifier && ts.isStringLiteral(st.moduleSpecifier)) namedImports.push({ spec: st.moduleSpecifier.text, ...target(st.moduleSpecifier.text), names, reexport: true });
    } else if ((ts.isClassDeclaration(st) || ts.isFunctionDeclaration(st) || ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st) || ts.isEnumDeclaration(st)) && hasExport(st) && st.name) {
      exportsList.push(st.name.text);
    } else if (ts.isVariableStatement(st) && hasExport(st)) {
      for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name)) exportsList.push(d.name.text);
    }
  }
  return { exportsList, namedImports };
}

async function extract(label, ref) {
  const commit = git(["rev-parse", ref]).trim();
  const tree = git(["ls-tree", "-r", commit]).trim().split("\n");
  const entries = [];
  for (const line of tree) {
    const [meta, file] = line.split("\t");
    const [, type, sha] = meta.split(" ");
    if (type !== "blob") continue;
    if (!/^(apps|packages|meta-tests)\//.test(file)) continue;
    if (!CODE.test(file) || SKIP.some((r) => r.test(file))) continue;
    entries.push({ file, sha });
  }
  const blobs = await readBlobs([...new Set(entries.map((e) => e.sha))]);
  const fileSet = new Set(entries.map((e) => e.file));
  const files = {};
  for (const { file, sha } of entries) {
    const text = blobs.get(sha) ?? "";
    const info = ts.preProcessFile(text, true, true);
    const imports = [];
    for (const imp of info.importedFiles) {
      const spec = imp.fileName;
      if (spec.startsWith(".")) {
        imports.push({ spec, file: resolveRelative(file, spec, fileSet) });
      } else if (spec.startsWith("@symnav/") || spec === "symnav" || spec.startsWith("symnav/")) {
        const parts = spec.split("/");
        const pkg = spec.startsWith("@symnav/") ? parts[1] : "cli";
        const sub = spec.startsWith("@symnav/") ? parts.slice(2).join("/") : parts.slice(1).join("/");
        imports.push({ spec, pkg, sub });
      } else {
        imports.push({ spec, external: true });
      }
    }
    const typeOnly = [...text.matchAll(/import\s+type\s+[^;]*?from\s+["']([^"']+)["']/g)].map((m) => m[1]);
    const { exportsList, namedImports } = symbols(file, text, fileSet);
    files[file] = {
      sha,
      lines: text.split("\n").length - (text.endsWith("\n") ? 1 : 0),
      pkg: packageOf(file),
      test: isTestFile(file),
      imports,
      typeOnly: [...new Set(typeOnly)],
      exports: exportsList,
      namedImports,
    };
  }
  const outFile = path.join(OUT, `${label}.json`);
  writeFileSync(outFile, JSON.stringify({ label, ref, commit, files }));
  return { label, commit, count: entries.length };
}

for (const [label, ref] of STACK) {
  const r = await extract(label, ref);
  console.log(r.label, r.commit.slice(0, 9), r.count);
}
