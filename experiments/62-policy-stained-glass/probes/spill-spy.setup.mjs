import { appendFileSync } from "node:fs";
import { afterEach, beforeEach } from "vitest";

const cliRoot = process.env.SPILL_CLI_ROOT;
const logPath = process.env.SPILL_LOG;

const { OrderedCommandOutput } = await import(`${cliRoot}/src/command-execution-result.ts`);
const { CompletionSpool } = await import(`${cliRoot}/src/daemon/completion-spool.ts`);

let counts = { clientSpills: 0, daemonSpills: 0 };

class SpillSpy {
  static wrap(prototype, counter) {
    const original = prototype.spillInlineRecords;
    prototype.spillInlineRecords = async function (...parameters) {
      counts[counter] += 1;
      return original.apply(this, parameters);
    };
  }
}

SpillSpy.wrap(OrderedCommandOutput.prototype, "clientSpills");
SpillSpy.wrap(CompletionSpool.prototype, "daemonSpills");

beforeEach(() => {
  counts = { clientSpills: 0, daemonSpills: 0 };
});

afterEach((context) => {
  const describeName = context.task.suite?.name ?? "";
  appendFileSync(
    logPath,
    `${JSON.stringify({
      file: context.task.file?.name,
      suite: describeName,
      test: context.task.name,
      ...counts,
    })}\n`,
  );
});
