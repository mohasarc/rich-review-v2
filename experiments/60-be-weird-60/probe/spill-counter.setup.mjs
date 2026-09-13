// Counts spill files created per test: client output (OrderedCommandOutput) and daemon completions (CompletionSpool).
import { appendFileSync } from "node:fs";
import { join } from "node:path";

const cliRoot = process.env.SPILL_CLI_ROOT;
const outputModule = await import(join(cliRoot, "src/command-execution-result.ts"));
const spoolModule = await import(join(cliRoot, "src/daemon/completion-spool.ts"));
const counts = { clientSpills: 0, daemonSpills: 0 };

const outputSpill = outputModule.OrderedCommandOutput.prototype.spillInlineRecords;
outputModule.OrderedCommandOutput.prototype.spillInlineRecords = async function (...args) {
  counts.clientSpills += 1;
  return outputSpill.apply(this, args);
};
const spoolSpill = spoolModule.CompletionSpool.prototype.spillInlineRecords;
spoolModule.CompletionSpool.prototype.spillInlineRecords = async function (...args) {
  counts.daemonSpills += 1;
  return spoolSpill.apply(this, args);
};

beforeEach(() => {
  counts.clientSpills = 0;
  counts.daemonSpills = 0;
});
afterEach((context) => {
  appendFileSync(
    process.env.SPILL_LOG,
    `${JSON.stringify({ file: context.task.file?.name, test: context.task.name, state: context.task.result?.state ?? null, ...counts })}\n`,
  );
});
