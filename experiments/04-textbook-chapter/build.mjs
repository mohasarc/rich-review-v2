// Embeds recorded probe output into src/chapter.html → index.html.
// Usage: node build.mjs
import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "probe", "out");
const readJson = (name) => JSON.parse(readFileSync(join(out, name), "utf8"));
const withoutPaths = (run) => {
  const { worktree, ...rest } = run;
  return rest;
};

const scopeSnapshot = join(out, "turn-scoped-cache-scope.ts");
const scopeInWorktree = join(
  root,
  "../../worktrees/pr-127-head/packages/core/src/backend/turn-scoped-cache-scope.ts",
);
if (existsSync(scopeInWorktree)) copyFileSync(scopeInWorktree, scopeSnapshot);

const serviceFile = "typescript-semantic-query-service.test.ts";
const scopeFile = "turn-scoped-cache-scope.test.ts";
const testRun = (name) => {
  const log = readFileSync(join(out, name), "utf8");
  const fileLine = (file) => log.split("\n").find((line) => line.includes(file) && /\(\d+ tests/.test(line));
  const counts = (line) => {
    if (!line) return undefined;
    const total = Number(/\((\d+) tests/.exec(line)[1]);
    const failed = Number(/(\d+) failed/.exec(line)?.[1] ?? 0);
    return { total, failed, passed: total - failed };
  };
  const service = counts(fileLine(serviceFile));
  const scope = counts(fileLine(scopeFile));
  const failingTests = log
    .split("\n")
    .filter((line) => line.trim().startsWith("×"))
    .map((line) => line.replace(/^\s*×\s*/, "").replace(/\s+\d+ms$/, ""));
  return {
    service,
    scope,
    passed: (service?.passed ?? 0) + (scope?.passed ?? 0),
    failed: (service?.failed ?? 0) + (scope?.failed ?? 0),
    failingTests,
  };
};

const data = {
  semantics: {
    main: withoutPaths(readJson("semantics-main.json")),
    base: withoutPaths(readJson("semantics-base.json")),
    head: withoutPaths(readJson("semantics-head.json")),
  },
  clearingDisabled: withoutPaths(readJson("semantics-head-clearing-disabled.json")),
  releaseWindow: {
    main: readJson("release-window-main.json"),
    base: readJson("release-window-base.json"),
    head: readJson("release-window-head.json"),
  },
  worker: {
    main: readJson("worker-main.json"),
    base: readJson("worker-base.json"),
    head: readJson("worker-head.json"),
    baseControl: readJson("worker-base-control.json"),
  },
  cacheKeys: readJson("cache-keys-head.json"),
  tests: {
    characterize: testRun("tests-44de06c63-characterize.log"),
    specifyRelease: testRun("tests-9e6565189-specify-release.log"),
    head: testRun("tests-64919bcbc-head.log"),
  },
  scopeSource: readFileSync(scopeSnapshot, "utf8").replace(/\n$/, ""),
};

const template = readFileSync(join(root, "src", "chapter.html"), "utf8");
const json = JSON.stringify(data).replace(/</g, "\\u003c");
const html = template.replace("/*__DATA__*/", () => json);
writeFileSync(join(root, "index.html"), html);
console.log(
  `index.html written: ${html.length} bytes; tests`,
  JSON.stringify(data.tests, null, 0),
);
