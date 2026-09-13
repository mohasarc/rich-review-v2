// Compares the deleted CLI memory recipe (base DaemonResourcePolicy) with the surviving
// DaemonPolicy recipe over boundary and random memory sizes.
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [baseWorktree, headWorktree] = process.argv.slice(2);
const { DaemonResourcePolicy } = await import(
  pathToFileURL(join(baseWorktree, "apps/cli/dist/daemon/daemon-resource-monitor.js")).href
);
const { DaemonPolicy } = await import(
  pathToFileURL(join(headWorktree, "packages/daemon/dist/index.js")).href
);

const MiB = 1024 * 1024;
const GiB = 1024 * MiB;
const sizes = new Set([1, MiB - 1, MiB, MiB + 1, 256 * MiB, 512 * MiB - 1, 512 * MiB, 513 * MiB, GiB, 16 * GiB, 16 * GiB + 1, 32 * GiB, 64 * GiB, 128 * GiB]);
for (let exponent = 0; exponent <= 37; exponent += 1) {
  for (const delta of [-1, 0, 1]) sizes.add(Math.max(1, 2 ** exponent + delta));
}
let seed = 131;
const random = () => {
  seed = (seed * 1103515245 + 12345) % 2 ** 31;
  return seed / 2 ** 31;
};
while (sizes.size < 10_000) sizes.add(1 + Math.floor(random() * 256 * GiB));

let comparisons = 0;
const mismatches = [];
for (const total of sizes) {
  for (const constrained of [undefined, 0, -1, Math.floor(total / 3), total, total * 2]) {
    comparisons += 1;
    const before = DaemonResourcePolicy.fromSystemMemory(total, constrained).record;
    const after = DaemonPolicy.fromSystemMemory(
      constrained === undefined ? { totalBytes: total } : { totalBytes: total, constrainedBytes: constrained },
    ).values.resources;
    const pairs = [
      ["effectiveMemoryBytes", before.effectiveMemoryBytes, after.effectiveMemoryBytes],
      ["hardProcessRssBytes", before.hardProcessRssBytes, after.hardProcessRssBytes],
      ["softProcessRssBytes", before.softProcessRssBytes, after.softProcessRssBytes],
      ["resumeProcessRssBytes", before.resumeProcessRssBytes, after.resumeProcessRssBytes],
      ["workerMaxOldGeneration", before.workerMaxOldGenerationSizeMb, after.workerMaxOldGenerationSizeMiB],
    ];
    for (const [field, left, right] of pairs) {
      if (left !== right && mismatches.length < 20) mismatches.push({ total, constrained, field, before: left, after: right });
    }
  }
}
console.log(JSON.stringify({ memorySizes: sizes.size, comparisons, mismatchCount: mismatches.length, mismatches }));
