// Static count of function-like nodes per .ts file (denominator for executed-function ratios).
import { createRequire } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const [tree, dir, out] = process.argv.slice(2);
const require = createRequire(join(tree, "package.json"));
const ts = require("typescript");
const result = {};
for (const name of readdirSync(join(tree, dir))) {
  if (!name.endsWith(".ts") || name.endsWith(".test.ts")) continue;
  const text = readFileSync(join(tree, dir, name), "utf8");
  const sf = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true);
  let count = 0;
  const visit = (node) => {
    if ((ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isConstructorDeclaration(node) ||
         ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isGetAccessorDeclaration(node) ||
         ts.isSetAccessorDeclaration(node)) && node.body) count += 1;
    ts.forEachChild(node, visit);
  };
  visit(sf);
  result[name] = count;
}
process.stdout.write(JSON.stringify(result, null, 1));
if (out) (await import("node:fs")).writeFileSync(out, JSON.stringify(result, null, 1));
