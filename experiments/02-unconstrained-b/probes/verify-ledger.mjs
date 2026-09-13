// Checks every ledger file:line against the worktrees; reports lines that do not contain the cited token.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const [ledgerPath, baseWorktree, headWorktree] = process.argv.slice(2);
const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
const moduleFile = new Map(ledger.modules.map((module) => [module.id, module.file]));
const cache = new Map();
const lines = (worktree, file) => {
  const key = `${worktree}:${file}`;
  if (!cache.has(key)) cache.set(key, readFileSync(join(worktree, ledger.cliRoot, file), "utf8").split("\n"));
  return cache.get(key);
};
const tokens = (text) =>
  (text.match(/[A-Za-z_][A-Za-z0-9_]{3,}|\d[\d_]*/g) ?? []).filter(
    (token) => !["this", "const", "export", "readonly", "private", "options", "return", "static", "Math", "floor", "value", "chunk"].includes(token),
  );

let checked = 0;
const problems = [];
for (const leaf of ledger.leaves) {
  for (const [side, worktree, entries] of [
    ["before", baseWorktree, leaf.before],
    ["after", headWorktree, leaf.after],
  ]) {
    for (const entry of entries) {
      checked += 1;
      const file = moduleFile.get(entry.module);
      const window = lines(worktree, file).slice(Math.max(0, entry.line - 1), entry.line + 2).join(" ");
      const needed = tokens(entry.text).slice(0, 3);
      const missing = needed.filter((token) => !window.includes(token));
      if (missing.length > 0) {
        problems.push({ leaf: leaf.id, side, file, line: entry.line, missing, actual: lines(worktree, file)[entry.line - 1]?.trim() });
      }
    }
  }
}
console.log(JSON.stringify({ checked, problems }, null, 2));
