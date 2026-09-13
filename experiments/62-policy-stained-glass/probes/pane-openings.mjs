import { createRequire } from "node:module";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const [worktree, outputPath] = process.argv.slice(2);
const require = createRequire(join(worktree, "package.json"));
const ts = require("typescript");

const policyTypePattern = /\bDaemonPolicy(Values)?\b|LocalDaemonTransportPolicy/;
const numberBoundaryNames = new Set([
  "maximumChunkRawBytes",
  "maximumChunkBytes",
  "maximumRecordBytes",
  "maximumControlFrameBytes",
  "sampleIntervalMs",
  "graceMs",
]);

class Files {
  static production(directory) {
    return readdirSync(directory).flatMap((name) => {
      const path = join(directory, name);
      if (statSync(path).isDirectory()) return Files.production(path);
      return name.endsWith(".ts") && !name.endsWith(".test.ts") ? [path] : [];
    });
  }
}

class Openings {
  static scan(path) {
    const text = readFileSync(path, "utf8");
    const source = ts.createSourceFile(path, text, ts.ScriptTarget.ES2022, true);
    const found = [];
    const owner = (node) => {
      for (let current = node.parent; current !== undefined; current = current.parent) {
        if ((ts.isClassDeclaration(current) || ts.isInterfaceDeclaration(current)) && current.name) {
          return current.name.text;
        }
        if (ts.isTypeAliasDeclaration(current)) return current.name.text;
      }
      return undefined;
    };
    const member = (node) => {
      for (let current = node.parent; current !== undefined; current = current.parent) {
        if (ts.isConstructorDeclaration(current)) return "constructor";
        if ((ts.isMethodDeclaration(current) || ts.isFunctionDeclaration(current)) && current.name) {
          return current.name.getText(source);
        }
        if (ts.isClassDeclaration(current) || ts.isInterfaceDeclaration(current)) return undefined;
      }
      return undefined;
    };
    const record = (node, name, typeText, optional, defaultText) => {
      const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));
      found.push({
        path: relative(worktree, path),
        line: line + 1,
        owner: owner(node),
        member: member(node),
        name,
        type: typeText,
        optional,
        default: defaultText,
      });
    };
    const visit = (node) => {
      if (ts.isParameter(node) && ts.isIdentifier(node.name)) {
        const typeText = node.type?.getText(source) ?? "";
        const isPolicyType = policyTypePattern.test(typeText);
        const isNumberBoundary = numberBoundaryNames.has(node.name.text) && /number/.test(typeText);
        const hasPolicyDefault = node.initializer !== undefined && /policy/i.test(node.initializer.getText(source));
        if (isPolicyType || isNumberBoundary || hasPolicyDefault) {
          record(
            node,
            node.name.text,
            typeText,
            node.questionToken !== undefined || node.initializer !== undefined,
            node.initializer?.getText(source),
          );
        }
      }
      if (ts.isPropertySignature(node) && node.type && policyTypePattern.test(node.type.getText(source))) {
        record(node, node.name.getText(source), node.type.getText(source), node.questionToken !== undefined);
      }
      if (ts.isTypeAliasDeclaration(node) && policyTypePattern.test(node.type.getText(source))) {
        record(node, node.name.text, node.type.getText(source).replace(/\s+/g, " "), false);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    return found;
  }
}

const files = Files.production(join(worktree, "apps/cli/src"));
const openings = files.flatMap((path) => Openings.scan(path)).sort((left, right) =>
  `${left.path}:${String(left.line).padStart(5, "0")}`.localeCompare(
    `${right.path}:${String(right.line).padStart(5, "0")}`,
  ),
);
writeFileSync(
  outputPath,
  JSON.stringify(
    {
      method:
        "TypeScript AST scan of apps/cli/src production files: parameters and property signatures whose type mentions DaemonPolicy/DaemonPolicyValues/LocalDaemonTransportPolicy, numeric boundary parameters by name, and parameter defaults reading policy",
      openings,
    },
    null,
    1,
  ),
);
for (const opening of openings) {
  console.log(
    `${opening.path}:${opening.line} ${opening.owner ?? ""}.${opening.member ?? ""} ${opening.name}${opening.optional ? "?" : ""}: ${opening.type}${opening.default ? ` = ${opening.default}` : ""}`,
  );
}
