// Usage: node run-mutants.mjs <worktree> [mutant-id-substring]
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { mutants } from "./mutants.mjs";

const [worktree, filter] = process.argv.slice(2);
const here = new URL(".", import.meta.url).pathname;
const outDirectory = join(here, process.env.RR_OUT_DIR ?? "out");
mkdirSync(outDirectory, { recursive: true });
const root = join(worktree, "apps/cli");
const vitest = join(worktree, "node_modules/.bin/vitest");
const applicationLog = join(outDirectory, "applications.jsonl");

function run(mutant) {
  const label = mutant?.id ?? "baseline";
  const reportPath = join(outDirectory, `report-${label}.json`);
  rmSync(reportPath, { force: true });
  const startedAt = Date.now();
  const result = spawnSync(
    vitest,
    ["run", "--config", join(here, "vitest.mutation.config.mjs"), "--reporter=json", `--outputFile=${reportPath}`],
    {
      cwd: root,
      env: {
        ...process.env,
        RR_ROOT: root,
        RR_APPLICATION_LOG: applicationLog,
        ...(mutant === undefined ? {} : { RR_MUTANT: JSON.stringify(mutant) }),
      },
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      timeout: 15 * 60 * 1000,
    },
  );
  const durationMs = Date.now() - startedAt;
  if (!existsSync(reportPath)) {
    return { id: label, durationMs, error: `no report; exit ${result.status}; ${result.stderr?.slice(-2000)}` };
  }
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const failures = report.testResults.flatMap((file) =>
    file.assertionResults
      .filter((test) => test.status === "failed")
      .map((test) => ({
        file: file.name.replace(`${root}/`, ""),
        test: test.fullName,
        message: (test.failureMessages?.[0] ?? "").split("\n")[0].slice(0, 300),
      })),
  );
  const fileErrors = report.testResults
    .filter((file) => file.status === "failed" && file.assertionResults.every((test) => test.status !== "failed"))
    .map((file) => ({ file: file.name.replace(`${root}/`, ""), message: (file.message ?? "").slice(0, 300) }));
  return {
    id: label,
    value: mutant?.value,
    durationMs,
    totals: {
      tests: report.numTotalTests,
      passed: report.numPassedTests,
      failed: report.numFailedTests,
      files: report.numTotalTestSuites,
    },
    failures,
    fileErrors,
  };
}

const selected =
  filter === "baseline-only"
    ? []
    : mutants.filter((mutant) => filter === undefined || filter.split(",").some((part) => mutant.id === part || mutant.id.includes(part)));
const results = [];
if (filter === undefined || filter === "baseline-only") {
  const baseline = run(undefined);
  results.push(baseline);
  console.log(JSON.stringify({ id: baseline.id, totals: baseline.totals, failures: baseline.failures.length, durationMs: baseline.durationMs }));
}
for (const mutant of selected) {
  const result = run(mutant);
  results.push(result);
  console.log(
    JSON.stringify({ id: result.id, totals: result.totals, failures: result.failures?.length, error: result.error, durationMs: result.durationMs }),
  );
  writeFileSync(join(outDirectory, `results${filter ? `-${filter}` : ""}.json`), JSON.stringify(results, null, 2));
}
writeFileSync(join(outDirectory, `results${filter ? `-${filter}` : ""}.json`), JSON.stringify(results, null, 2));
