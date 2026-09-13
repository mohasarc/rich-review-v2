#!/usr/bin/env bash
# M2b: V8 precise function coverage of shipped apps/cli daemon code under apps/cli tests. Scratch copies only.
# Coverage is taken inside each vitest worker (inspector session in a setup file), so forked workers need not exit cleanly.
set -uo pipefail
SCRATCH=${SCRATCH:-/tmp/rr08}
HERE=$(cd "$(dirname "$0")" && pwd); OUT=${OUT:-$HERE/../evidence}
label=$1; tree=$2; shift 2
cov="$SCRATCH/cov-$label"; rm -rf "$cov"; mkdir -p "$cov"
cli="$SCRATCH/$tree/apps/cli"
cat > "$cli/rr08-cov-setup.ts" <<'TS'
import { Session } from "node:inspector/promises";
import { writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { afterAll, beforeAll } from "vitest";
const session = new Session();
beforeAll(async () => {
  session.connect();
  await session.post("Profiler.enable");
  await session.post("Profiler.startPreciseCoverage", { callCount: true, detailed: true });
});
afterAll(async () => {
  const coverage = await session.post("Profiler.takePreciseCoverage");
  writeFileSync(`${process.env.RR08_COV}/cov-${process.pid}-${randomUUID()}.json`, JSON.stringify(coverage));
  await session.post("Profiler.stopPreciseCoverage");
  session.disconnect();
});
TS
cat > "$cli/vitest.rr08cov.config.ts" <<'TS'
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { include: ["src/**/*.test.ts", "test/**/*.test.ts"], fileParallelism: false, passWithNoTests: false, setupFiles: ["./rr08-cov-setup.ts"], testTimeout: 20000 } });
TS
(cd "$cli" && RR08_COV="$cov" node ../../node_modules/vitest/vitest.mjs run --config vitest.rr08cov.config.ts "$@" > "$OUT/cov-$label.vitest.txt" 2>&1)
tail -5 "$OUT/cov-$label.vitest.txt"
echo "dumps: $(ls "$cov" | wc -l)"
python3 "$HERE/v8cov-summarize.py" "$cov" "$SCRATCH/$tree" "$OUT/cov-$label.json" > "$OUT/cov-$label.summary.txt"
wc -l < "$OUT/cov-$label.summary.txt"
