import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import ts from "typescript";

export const SYMNAV = path.join(homedir(), "projects/symnav");
export const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
export const BUNDLE = path.join(homedir(), "projects/rich-review-v2/inputs/stack");

export const MAIN_SHA = "b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e";
export const TIP_SHA = "d07002357d3e9596bfaae910a1ac63b77981620b";

export const PARTS = [
  [123, "01-source-cache"], [124, "02-transactional-backend-state"], [126, "03-project-membership-graph"],
  [127, "04-query-cache-lifecycle"], [128, "05-workspace-session"], [129, "06-state-directory-ownership"],
  [130, "07-daemon-package-policy-snapshot"], [131, "08-daemon-policy-consumers"], [132, "09-command-vocabulary"],
  [133, "10-execution-failure-vocabulary"], [134, "11-admission-rejection"], [135, "12-injected-host-module"],
  [136, "13-lifecycle-renderer"], [137, "14-transport-framing"], [138, "15"], [139, "16-socket-client"],
  [140, "17-lifecycle-client"], [141, "18"], [142, "19"], [143, "20"], [144, "21"], [145, "22"], [146, "23"],
  [147, "24"], [148, "25"], [149, "28"],
];

export function git(...args) {
  return execFileSync("git", ["-C", SYMNAV, ...args], { encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
}

export function gitMaybe(...args) {
  try {
    return git(...args);
  } catch (error) {
    if (error.status === 1) return "";
    throw error;
  }
}

export function prHeads() {
  return PARTS.map(([number, part]) => ({
    number,
    branch: `agent/daemon-architecture-refactor-part-${part}`,
    sha: git("rev-parse", `origin/agent/daemon-architecture-refactor-part-${part}`).trim(),
  }));
}

export function bundlePrs() {
  return JSON.parse(readFileSync(path.join(BUNDLE, "pr.json"), "utf8")).pullRequests;
}

export function parse(source, fileName = "x.ts") {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function lineOf(sf, pos) {
  return sf.getLineAndCharacterOfPosition(pos).line + 1;
}

export function describeModule(source, fileName) {
  const sf = parse(source, fileName);
  const imports = [];
  const classes = [];
  const exports = [];
  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt)) {
      const spec = stmt.moduleSpecifier.text;
      const clause = stmt.importClause;
      const names = [];
      if (clause?.name) names.push(clause.name.text);
      if (clause?.namedBindings) {
        if (ts.isNamespaceImport(clause.namedBindings)) names.push(`* as ${clause.namedBindings.name.text}`);
        else for (const el of clause.namedBindings.elements) names.push((el.propertyName ?? el.name).text);
      }
      imports.push({ spec, names, typeOnly: Boolean(clause?.isTypeOnly), line: lineOf(sf, stmt.getStart()) });
    }
    const exported = ts.canHaveModifiers(stmt) && ts.getModifiers(stmt)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (exported && stmt.name) exports.push(stmt.name.text);
    if (ts.isExportDeclaration(stmt) && stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
      for (const el of stmt.exportClause.elements) exports.push(el.name.text);
    }
    if (ts.isClassDeclaration(stmt) && stmt.name) {
      const members = [];
      for (const m of stmt.members) {
        const mods = (ts.canHaveModifiers(m) ? ts.getModifiers(m) : undefined) ?? [];
        const has = (k) => mods.some((x) => x.kind === k);
        const rawName = m.name ? (ts.isPrivateIdentifier(m.name) ? m.name.text : m.name.getText(sf)) : "constructor";
        const kind = ts.isConstructorDeclaration(m) ? "constructor"
          : ts.isMethodDeclaration(m) ? "method"
          : ts.isPropertyDeclaration(m) ? "property"
          : ts.isGetAccessor(m) ? "getter"
          : ts.isSetAccessor(m) ? "setter"
          : "other";
        const isHashPrivate = Boolean(m.name && ts.isPrivateIdentifier(m.name));
        const visibility = has(ts.SyntaxKind.PrivateKeyword) || isHashPrivate ? "private"
          : has(ts.SyntaxKind.ProtectedKeyword) ? "protected" : "public";
        members.push({
          name: rawName,
          kind,
          visibility,
          static: has(ts.SyntaxKind.StaticKeyword),
          readonly: has(ts.SyntaxKind.ReadonlyKeyword),
          start: lineOf(sf, m.getStart()),
          end: lineOf(sf, m.getEnd()),
        });
      }
      classes.push({
        name: stmt.name.text,
        start: lineOf(sf, stmt.getStart()),
        end: lineOf(sf, stmt.getEnd()),
        exported: Boolean(exported),
        members,
      });
    }
  }
  const lines = source.split("\n").length - (source.endsWith("\n") ? 1 : 0);
  return { lines, imports, classes, exports };
}
