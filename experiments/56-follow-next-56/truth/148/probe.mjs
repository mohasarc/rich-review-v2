// Real execution against the built pr-148 head worktree. No worktree file is modified.
// Usage: node probe.mjs <worktree>
import { copyFileSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const [worktree] = process.argv.slice(2);
const dist = join(worktree, "packages/daemon/dist");
const daemon = await import(pathToFileURL(join(dist, "index.js")).href);
const { DaemonClientRuntime } = await import(pathToFileURL(join(dist, "client/daemon-client-runtime.js")).href);
const { DaemonPolicy } = daemon;
const results = { node: process.version, worktree };

const stateDirectory = mkdtempSync(join(tmpdir(), "rr56-148-state-"));
const baseOptions = {
  stateDirectory,
  productVersion: "probe",
  daemonEnabled: false,
  executorFactory: async () => ({ execute: async () => ({ exitCode: 0 }) }),
  executorModuleUrl: "file:///nonexistent-executor.js",
  readinessProbe: { argv: ["--version"] },
};

// P1 · omitted policy.
{
  const omitted = new DaemonClientRuntime(baseOptions);
  const system = DaemonPolicy.currentSystem();
  const custom = DaemonPolicy.currentSystem();
  const supplied = new DaemonClientRuntime({ ...baseOptions, policy: custom });
  results.P1_omittedPolicy = {
    constructorThrew: false,
    omittedPolicyIsDaemonPolicy: omitted.policy instanceof DaemonPolicy,
    omittedValuesEqualCurrentSystem: JSON.stringify(omitted.policy.values) === JSON.stringify(system.values),
    suppliedPolicyUsedByIdentity: supplied.policy === custom,
    sampleValues: {
      startup: omitted.policy.values.startup,
      transportStatusResponseTimeoutMs: omitted.policy.values.transport?.statusResponseTimeoutMs,
    },
  };
}

// P2 · runtime module cannot load: facade copied alone, so its dynamic import of ./daemon-client-runtime.js fails.
const isolated = mkdtempSync(join(tmpdir(), "rr56-148-facade-"));
copyFileSync(join(dist, "client/daemon-client.js"), join(isolated, "daemon-client.js"));
{
  const { DaemonClient } = await import(pathToFileURL(join(isolated, "daemon-client.js")).href);
  let constructorError = null;
  let client;
  try {
    client = new DaemonClient(baseOptions);
  } catch (error) {
    constructorError = error.message;
  }
  const request = { workspaceRoot: "/w", commandName: "overview", argv: ["overview"], cwd: "/w", telemetryEnabled: false };
  const errors = [];
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await client.execute(request);
      errors.push({ attempt, outcome: "fulfilled" });
    } catch (error) {
      errors.push({ attempt, outcome: "rejected", error });
    }
  }
  let controlOutcome;
  try {
    await client.control({ action: "status" });
    controlOutcome = "fulfilled";
  } catch (error) {
    controlOutcome = error === errors[0].error ? "rejected with the same error object" : `rejected: ${error.message}`;
  }
  results.P2_runtimeLoadFailure = {
    constructorError,
    calls: errors.map(({ attempt, outcome, error }) => ({ attempt, outcome, code: error?.code, message: error?.message?.split("\n")[0] })),
    secondCallSameErrorObject: errors[0].error !== undefined && errors[0].error === errors[1].error,
    controlOutcome,
  };
}

// P2b · construct, then wait one timer turn before the first call, in a child process with default handlers.
{
  const script = join(isolated, "delayed.mjs");
  writeFileSync(
    script,
    [
      `import { DaemonClient } from ${JSON.stringify(pathToFileURL(join(isolated, "daemon-client.js")).href)};`,
      `const client = new DaemonClient(${JSON.stringify({ ...baseOptions, executorFactory: undefined })});`,
      `await new Promise((resolve) => setTimeout(resolve, 50));`,
      `try { await client.execute({}); console.log("late-call-fulfilled"); } catch (error) { console.log("late-call-rejected", error.code); }`,
    ].join("\n"),
  );
  const child = spawnSync(process.execPath, [script], { encoding: "utf8" });
  results.P2b_delayedFirstCall = {
    exitStatus: child.status,
    stdout: child.stdout.trim(),
    stderrFirstLines: child.stderr.split("\n").slice(0, 4),
  };
}

rmSync(isolated, { recursive: true, force: true });
rmSync(stateDirectory, { recursive: true, force: true });
process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
