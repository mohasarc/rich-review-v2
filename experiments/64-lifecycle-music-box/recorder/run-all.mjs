import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const recorderDirectory = dirname(fileURLToPath(import.meta.url));
const traces = resolve(recorderDirectory, "../evidence/traces");
mkdirSync(traces, { recursive: true });

const inProcess = [
  ["turn", ["base", "head"]],
  ["refresh-fails", ["base", "head"]],
  ["release-sync", ["main", "base", "head"]],
  ["release-held", ["base", "head"]],
  ["release-held-rejects", ["base", "head"]],
  ["release-throws", ["main", "base", "head"]],
  ["late-answer", ["base", "head"]],
];
const worker = [
  ["throw", ["main", "base", "head"]],
  ["none", ["main", "base", "head"]],
  ["hold", ["base", "head"]],
];

const run = (script, args) => {
  const output = execFileSync(process.execPath, [join(recorderDirectory, script), ...args], {
    encoding: "utf8",
    timeout: 120_000,
  });
  process.stdout.write(output);
};

for (const [scenario, builds] of inProcess) {
  for (const build of builds) {
    run("record-in-process.mjs", [`--build=${build}`, `--scenario=${scenario}`, `--out=${join(traces, `${scenario}--${build}.json`)}`]);
  }
}
for (const [fault, builds] of worker) {
  for (const build of builds) {
    run("record-worker.mjs", [`--build=${build}`, `--fault=${fault}`, `--out=${join(traces, `worker-${fault}--${build}.json`)}`]);
  }
}
