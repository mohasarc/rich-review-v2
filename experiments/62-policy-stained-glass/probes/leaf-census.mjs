import { createRequire } from "node:module";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { execFileSync } from "node:child_process";

const [worktree, outputPath, sourceRootArgument] = process.argv.slice(2);
const sourceRoot = sourceRootArgument ?? worktree;
const require = createRequire(join(worktree, "package.json"));
const ts = require("typescript");

class SourceTree {
  static list(directory) {
    const files = [];
    for (const name of readdirSync(directory)) {
      if (name === "node_modules" || name === "dist" || name === "fixtures") continue;
      const path = join(directory, name);
      if (statSync(path).isDirectory()) files.push(...SourceTree.list(path));
      else if (name.endsWith(".ts") && !name.endsWith(".d.ts")) files.push(path);
    }
    return files;
  }
}

const roots = ["apps/cli/src", "apps/cli/test", "packages/daemon/src", "meta-tests/src"];
const files = roots.flatMap((root) => {
  try {
    return SourceTree.list(join(sourceRoot, root));
  } catch {
    return [];
  }
});
const packageEntry = (name, entry = "index.ts") => [join(sourceRoot, "packages", name, "src", entry)];
const compilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  noEmit: true,
  skipLibCheck: true,
  allowImportingTsExtensions: false,
  baseUrl: sourceRoot,
  paths: {
    "@symnav/daemon": packageEntry("daemon"),
    "@symnav/daemon/policy-testing": packageEntry("daemon", "policy-testing.ts"),
    "@symnav/core": packageEntry("core"),
    "@symnav/renderer": packageEntry("renderer"),
    "@symnav/telemetry": packageEntry("telemetry"),
    "@symnav/backend-typescript": packageEntry("backend-typescript"),
    "@symnav/testing": packageEntry("testing"),
  },
  types: ["node"],
  typeRoots: [join(worktree, "node_modules/@types")],
};
const snapshots = new Map();
const host = {
  getScriptFileNames: () => files,
  getScriptVersion: () => "1",
  getScriptSnapshot: (fileName) => {
    if (!snapshots.has(fileName)) {
      try {
        snapshots.set(fileName, ts.ScriptSnapshot.fromString(readFileSync(fileName, "utf8")));
      } catch {
        return undefined;
      }
    }
    return snapshots.get(fileName);
  },
  getCurrentDirectory: () => sourceRoot,
  getCompilationSettings: () => compilerOptions,
  getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
  readDirectory: ts.sys.readDirectory,
  directoryExists: ts.sys.directoryExists,
  getDirectories: ts.sys.getDirectories,
};
const service = ts.createLanguageService(host, ts.createDocumentRegistry());
const program = service.getProgram();

const policyFile = join(sourceRoot, "packages/daemon/src/daemon-policy.ts");
const policySource = program.getSourceFile(policyFile);

class Enclosing {
  static describe(sourceFile, position) {
    let found = [];
    const visit = (node) => {
      if (position < node.getStart(sourceFile) || position >= node.getEnd()) return;
      if (
        (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
        node.name !== undefined
      ) {
        found.push({ kind: "class", name: node.name.text });
      }
      if (
        (ts.isMethodDeclaration(node) ||
          ts.isPropertyDeclaration(node) ||
          ts.isGetAccessorDeclaration(node)) &&
        node.name !== undefined &&
        ts.isIdentifier(node.name)
      ) {
        found.push({ kind: "member", name: node.name.text });
      }
      if (ts.isConstructorDeclaration(node)) found.push({ kind: "member", name: "constructor" });
      if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
        found.push({ kind: "function", name: node.name.text });
      }
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        if (["it", "describe", "test"].includes(node.expression.text)) {
          const title = node.arguments[0];
          if (title !== undefined && ts.isStringLiteralLike(title)) {
            found.push({ kind: node.expression.text, name: title.text });
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    const last = (kind) => [...found].reverse().find((entry) => entry.kind === kind)?.name;
    return {
      class: last("class"),
      member: last("member"),
      function: last("function"),
      test: last("it") ?? last("test"),
    };
  }
}

const leaves = [];
const valuesInterface = policySource.statements.find(
  (statement) => ts.isInterfaceDeclaration(statement) && statement.name.text === "DaemonPolicyValues",
);
for (const section of valuesInterface.members) {
  const sectionName = section.name.text;
  leaves.push({ section: sectionName, leaf: null, node: section });
  for (const leaf of section.type.members) {
    leaves.push({ section: sectionName, leaf: leaf.name.text, node: leaf });
  }
}

const results = [];
for (const entry of leaves) {
  const referenced = service.findReferences(policyFile, entry.node.name.getStart(policySource)) ?? [];
  const references = [];
  const seen = new Set();
  for (const symbol of referenced) {
    for (const reference of symbol.references) {
      if (reference.isDefinition) continue;
      const sourceFile = program.getSourceFile(reference.fileName);
      if (sourceFile === undefined) continue;
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(reference.textSpan.start);
      const key = `${reference.fileName}:${reference.textSpan.start}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const path = relative(sourceRoot, reference.fileName);
      const isTest = /\.test\.ts$/.test(path) || path.includes("/test/") || path.startsWith("meta-tests/");
      references.push({
        path,
        line: line + 1,
        column: character + 1,
        role: isTest ? "test" : path.startsWith("packages/daemon/") ? "policy-package" : "production",
        text: sourceFile.text.split("\n")[line].trim(),
        ...Enclosing.describe(sourceFile, reference.textSpan.start),
      });
    }
  }
  const { line } = policySource.getLineAndCharacterOfPosition(entry.node.getStart(policySource));
  results.push({
    section: entry.section,
    leaf: entry.leaf,
    declaredAt: `packages/daemon/src/daemon-policy.ts:${line + 1}`,
    references,
  });
}

const commit = sourceRootArgument === undefined ? execFileSync("git", ["-C", worktree, "rev-parse", "HEAD"]).toString().trim() : process.env.CENSUS_COMMIT ?? "archive";
writeFileSync(
  outputPath,
  JSON.stringify(
    {
      method:
        "TypeScript LanguageService.findReferences on each DaemonPolicyValues section and leaf declaration; @symnav/* mapped to package src; definitions excluded",
      typescript: ts.version,
      source: sourceRootArgument === undefined ? relative(join(worktree, ".."), worktree) : `git archive ${process.env.CENSUS_COMMIT ?? ""}`,
      commit,
      fileCount: files.length,
      results,
    },
    null,
    1,
  ),
);
console.log(
  results
    .map(
      (result) =>
        `${result.section}.${result.leaf ?? "*"}: prod=${result.references.filter((reference) => reference.role === "production").length} test=${result.references.filter((reference) => reference.role === "test").length}`,
    )
    .join("\n"),
);
