// Builds index.html from data/ledger.json, probe outputs, and facts read from the worktrees.
// Usage: node build.mjs   (expects ~/projects/rich-review-v2/worktrees/pr-131-{base,head} and stack-head)
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const here = new URL(".", import.meta.url).pathname;
const worktrees = join(homedir(), "projects/rich-review-v2/worktrees");
const head = join(worktrees, "pr-131-head");
const base = join(worktrees, "pr-131-base");
const read = (path) => readFileSync(path, "utf8");
const readJson = (path) => JSON.parse(read(path));
const readJsonLines = (path) =>
  read(path)
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line));
const git = (...args) => execFileSync("git", ["-C", head, ...args], { encoding: "utf8" });

const ledger = readJson(join(here, "data/ledger.json"));

function policyRecord() {
  const rows = {};
  for (const line of read(join(head, "plans/005/daemon-policy.md")).split("\n")) {
    const match = line.match(/^\| `([a-zA-Z.]+)` \| (.*?) \| (.*?) \| (.*?) \| (.*?) \|$/);
    if (!match) continue;
    rows[match[1]] = { derivation: match[2], appliesTo: match[3], reason: match[4], oracle: match[5] };
  }
  return rows;
}

function mutationRuns() {
  const directory = join(here, "probes/mutation");
  const runs = [];
  for (const name of readdirSync(directory)) {
    if (!name.startsWith("out")) continue;
    const runDirectory = join(directory, name);
    if (!statSync(runDirectory).isDirectory()) continue;
    for (const file of readdirSync(runDirectory)) {
      if (!file.startsWith("results") || !file.endsWith(".json")) continue;
      for (const result of readJson(join(runDirectory, file))) runs.push({ run: `${name}/${file}`, ...result });
    }
  }
  return runs;
}

function mutation() {
  const results = readJson(join(here, "probes/mutation/out/results.json"));
  const applications = readJsonLines(join(here, "probes/mutation/out/applications.jsonl"));
  const matchesByMutant = {};
  for (const application of applications) {
    const key = `${application.mutant}|${application.file}|${application.pattern}`;
    matchesByMutant[application.mutant] ??= {};
    matchesByMutant[application.mutant][key] = Math.max(matchesByMutant[application.mutant][key] ?? 0, application.matches);
  }
  const runs = mutationRuns();
  return results.map((result) => {
    const allRuns = runs.filter((run) => run.id === result.id);
    return {
      ...result,
      appliedEdits: Object.values(matchesByMutant[result.id] ?? {}).filter((count) => count > 0).length,
      totalMatches: Object.values(matchesByMutant[result.id] ?? {}).reduce((sum, count) => sum + count, 0),
      runs: allRuns.map((run) => ({ run: run.run, failed: run.failures?.length ?? null, tests: run.totals?.tests ?? null, failures: (run.failures ?? []).map((failure) => failure.test) })),
    };
  });
}

function excerpt(tree, path, start, end) {
  const lines = read(join(tree, path)).split("\n").slice(start - 1, end);
  return { path, start, lines };
}

function excerpts() {
  const stack = join(worktrees, "stack-head");
  const specs = [
    { id: "reattach", title: "Post-accept reattachment", base: ["apps/cli/src/daemon/local-daemon-transport.ts", 398, 411], head: ["apps/cli/src/daemon/local-daemon-transport.ts", 402, 427] },
    { id: "resume", title: "Result transfer resume guard", base: ["apps/cli/src/daemon/local-daemon-transport.ts", 457, 468], head: ["apps/cli/src/daemon/local-daemon-transport.ts", 474, 485] },
    { id: "retry", title: "Startup child-failure retry", base: ["apps/cli/src/daemon/daemon-startup-coordinator.ts", 78, 87], head: ["apps/cli/src/daemon/daemon-startup-coordinator.ts", 76, 91] },
    { id: "purpose", title: "daemon status composition", base: ["apps/cli/src/commands/daemon/register-daemon-command.ts", 100, 105], head: ["apps/cli/src/commands/daemon/register-daemon-command.ts", 104, 115] },
    { id: "transport-constructor", title: "Transport constructor", base: ["apps/cli/src/daemon/local-daemon-transport.ts", 290, 298], head: ["apps/cli/src/daemon/local-daemon-transport.ts", 289, 302] },
    { id: "client-adapter", title: "Client adapter", head: ["apps/cli/test/helpers/local-daemon-transport.ts", 18, 63] },
    { id: "daemon-adapter", title: "Daemon adapter", head: ["apps/cli/test/helpers/workspace-daemon.ts", 28, 64] },
    { id: "validator", title: "Policy validator rules", head: ["packages/daemon/src/daemon-policy.ts", 266, 305] },
    { id: "fence", title: "Meta-test fence", head: ["meta-tests/src/daemon-package.test.ts", 192, 234] },
    { id: "shadow", title: "Fallback memory recipe", base: ["apps/cli/src/daemon/workspace-daemon.ts", 155, 159] },
    { id: "dead-knob", title: "D12 · startupTimeoutMs assigned, never read (base)", base: ["apps/cli/src/daemon/daemon-startup-coordinator.ts", 64, 72] },
    { id: "dispatcher-catch", title: "D5 reach · warm navigation maps any completion rejection to one result", head: ["apps/cli/src/daemon/daemon-command-dispatcher.ts", 226, 243] },
    { id: "start-message", title: "D5 reach · daemon start prints the rejection message", head: ["apps/cli/src/commands/daemon/register-daemon-command.ts", 84, 93] },
    { id: "worker-reparse", title: "D4 · worker parent re-parses the snapshot for one value", head: ["apps/cli/src/daemon/daemon-navigation-worker.ts", 78, 83] },
    { id: "memory-cap-ignored", title: "D9 · adapter accepts memoryCapBytes (never read below)", head: ["apps/cli/test/helpers/workspace-daemon.ts", 9, 31] },
    { id: "tip-reattach", title: "D5 later · #149 execution client (after #142 commit 5e9ee27)", head: ["packages/daemon/src/transport/execution-client.ts", 47, 73], headTree: "stack" },
  ];
  return specs.map((spec) => ({
    id: spec.id,
    title: spec.title,
    ...(spec.base ? { base: excerpt(base, ...spec.base) } : {}),
    ...(spec.head ? { head: excerpt(spec.headTree === "stack" ? stack : head, ...spec.head) } : {}),
    ...(spec.headTree === "stack" ? { headLabel: "stack tip #149" } : {}),
  }));
}

function bannedStringsInTests() {
  const source = read(join(head, "meta-tests/src/daemon-package.test.ts"));
  const start = source.indexOf("for (const retiredSeam of [") + "for (const retiredSeam of [".length;
  const banned = [...source.slice(start, source.indexOf("]) {", start)).matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  const testFiles = [];
  const walk = (directory, keep) => {
    for (const name of readdirSync(directory)) {
      const path = join(directory, name);
      if (statSync(path).isDirectory()) walk(path, keep);
      else if (keep(path)) testFiles.push(path);
    }
  };
  walk(join(head, "apps/cli/test"), (path) => path.endsWith(".ts"));
  walk(join(head, "apps/cli/src"), (path) => path.endsWith(".test.ts"));
  const text = testFiles.map((path) => read(path)).join("\n");
  return { banned: banned.length, presentInTests: banned.filter((item) => text.includes(item)) };
}

function spill() {
  const rows = [];
  for (const [group, prefix] of [
    ["transport", "spill-transport"],
    ["daemon", "spill-daemon"],
  ]) {
    const baseRows = readJsonLines(join(here, `probes/out/${prefix}-base.jsonl`));
    const headRows = readJsonLines(join(here, `probes/out/${prefix}-head.jsonl`));
    const key = (row) => `${row.file}::${row.test}`;
    const headByKey = new Map(headRows.map((row) => [key(row), row]));
    for (const baseRow of baseRows) {
      const headRow = headByKey.get(key(baseRow));
      rows.push({ group, file: baseRow.file, test: baseRow.test, base: baseRow, head: headRow ?? null });
    }
  }
  return rows;
}

function commits() {
  const shas = ["d7c3ceef7", "8dca04739", "5830598f2", "bb0205972", "3f673305d", "b100221db"];
  return shas.map((sha) => {
    const subject = git("log", "-1", "--format=%s", sha).trim();
    const numstat = git("show", "--numstat", "--format=", sha)
      .split("\n")
      .filter(Boolean)
      .map((line) => line.split("\t"));
    const productionFiles = numstat.filter(([, , path]) => path.startsWith("apps/cli/src") && !path.endsWith(".test.ts")).length;
    const statusSource = git("show", `${sha}:apps/cli/src/commands/daemon/register-daemon-command.ts`);
    const statusBlock = statusSource.slice(statusSource.indexOf("class DaemonStatusAction"));
    const statusTransport = statusBlock.slice(statusBlock.indexOf("new LocalDaemonTransport("), statusBlock.indexOf("stateDirectory,"));
    const statusTimeoutMs = /requestTimeoutMs: 100|status-observer/.test(statusTransport) ? 100 : 250;
    return {
      sha,
      subject,
      files: numstat.length,
      productionFiles,
      added: numstat.reduce((sum, [added]) => sum + Number(added), 0),
      removed: numstat.reduce((sum, [, removed]) => sum + Number(removed), 0),
      statusTransport: statusTransport.replace(/\s+/g, " ").trim(),
      statusTimeoutMs,
    };
  });
}

function sizes() {
  const categories = {};
  for (const line of git("diff", "--numstat", "b3a6c4fa5", "b100221db").split("\n").filter(Boolean)) {
    const [added, removed, path] = line.split("\t");
    let category = "production";
    if (path.startsWith("meta-tests")) category = "meta-test";
    else if (path.includes("/test/helpers/")) category = Number(removed) === 0 && git("log", "--diff-filter=A", "--format=%h", "b3a6c4fa5..b100221db", "--", path).trim() ? "new test adapters" : "edited test helpers";
    else if (path.includes("/test/e2e/") || path.includes("/test/benchmark/")) category = "e2e and benchmark tests";
    else if (path.endsWith(".test.ts")) category = "unit tests";
    categories[category] ??= { files: 0, added: 0, removed: 0 };
    categories[category].files += 1;
    categories[category].added += Number(added);
    categories[category].removed += Number(removed);
  }
  return categories;
}

function prDecisions() {
  const pr = readJson(join(here, "../../inputs/pr-131/pr.json"));
  const body = pr.body;
  const decisions = body
    .slice(body.indexOf("## Decisions"), body.indexOf("## Look here"))
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2));
  const context = body.slice(body.indexOf("## Context") + "## Context".length, body.indexOf("## Shape")).trim();
  return { number: pr.number, title: pr.title, decisions, context };
}

const banned = bannedStringsInTests();
const mutationResults = mutation();
const repeated = mutationResults.filter((result) => result.id !== "baseline" && result.runs.length > 1);
const flaky = repeated.filter((result) => new Set(result.runs.map((run) => run.failed > 0)).size > 1);
const baselines = mutationRuns().filter((run) => run.id === "baseline");
const data = {
  generatedAt: new Date().toISOString(),
  ledger,
  policyRecord: policyRecord(),
  mutation: mutationResults,
  mutationBaselines: baselines.map((run) => ({ run: run.run, passed: run.totals.passed, tests: run.totals.tests })),
  bannedInTests: banned.presentInTests.length,
  bannedStrings: banned,
  confirmSummary: `${repeated.length} mutants ran more than once; ${flaky.length} changed outcome between runs${flaky.length ? ` (${flaky.map((result) => result.id).join(", ")})` : ""}; ${baselines.length} unmutated baseline runs, all ${baselines.every((run) => run.totals.failed === 0) ? "passing" : "NOT passing"}`,
  excerpts: excerpts(),
  spill: spill(),
  reattach: readJsonLines(join(here, "probes/out/reattach-differential.jsonl")),
  reattachTip: readJsonLines(join(here, "probes/out/reattach-differential-tip.jsonl")),
  status: readJsonLines(join(here, "probes/out/status-timeout-surface.jsonl")),
  memoryRecipe: readJson(join(here, "probes/out/memory-recipe-differential.json")),
  commits: commits(),
  sizes: sizes(),
  pr: prDecisions(),
};

writeFileSync(join(here, "data/snapshot.json"), JSON.stringify(data, null, 1));
const template = read(join(here, "site/template.html"));
const html = template.replace("/*__DATA__*/null", JSON.stringify(data).replace(/</g, "\\u003c"));
writeFileSync(join(here, "index.html"), html);
console.log(`index.html written (${Math.round(html.length / 1024)} KiB)`);
if (!existsSync(join(worktrees, "stack-head"))) console.log("note: stack-head worktree missing; stack-tip facts are static text");
