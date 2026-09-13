#!/usr/bin/env bash
# E1: does each test still write output to disk after #131's test adapters?
# Works on scratch copies under /tmp/rr08 (rsync of worktrees, no .git). Never touches worktrees.
set -euo pipefail
SCRATCH=${SCRATCH:-/tmp/rr08}
OUT=${OUT:-$(cd "$(dirname "$0")/.." && pwd)/evidence}
FILES=(
  src/daemon/local-daemon-transport-execution.test.ts
  src/daemon/workspace-daemon-requests.test.ts
  src/daemon/completion-spool.test.ts
  src/cli-program-executor.test.ts
)

instrument() {
  local src=$1 dst=$2
  rsync -a --delete "$src/" "$dst/"
  python3 - "$dst" <<'PY'
import sys, pathlib
root = pathlib.Path(sys.argv[1]) / "apps/cli"
def patch(rel, anchor, line):
    p = root / rel
    s = p.read_text()
    assert s.count(anchor) == 1, (rel, s.count(anchor))
    p.write_text(s.replace(anchor, line + anchor))
patch("src/command-execution-result.ts",
      "    await mkdir(this.directory, { recursive: true, mode: 0o700 });",
      '    if (process.env.RR08_LOG) (await import("node:fs")).appendFileSync(process.env.RR08_LOG, "SPILL client-output-file\\n");\n')
patch("src/daemon/completion-spool.ts",
      "    this.file = await this.options.storage.createFile(this.filePath);",
      '    if (process.env.RR08_LOG) (await import("node:fs")).appendFileSync(process.env.RR08_LOG, "SPILL daemon-spool-file\\n");\n')
(root / "rr08-setup.ts").write_text('''import { appendFileSync } from "node:fs";
import { beforeEach } from "vitest";
beforeEach((ctx) => {
  const names: string[] = [];
  let task: any = ctx.task;
  while (task) { if (task.name && task.name !== ctx.task.file?.name) names.unshift(task.name); task = task.suite; }
  if (process.env.RR08_LOG) appendFileSync(process.env.RR08_LOG, `TEST ${ctx.task.file?.name} :: ${names.join(" > ")}\\n`);
});
''')
(root / "vitest.rr08.config.ts").write_text('''import { defineConfig } from "vitest/config";
export default defineConfig({ test: { include: ["src/**/*.test.ts", "test/**/*.test.ts"], fileParallelism: false, setupFiles: ["./rr08-setup.ts"] } });
''')
PY
}

run() {
  local tree=$1 label=$2
  local log="$OUT/spill-$label.log"
  rm -f "$log"
  (cd "$tree/apps/cli" && RR08_LOG="$log" node ../../node_modules/vitest/vitest.mjs run \
     --config vitest.rr08.config.ts "${FILES[@]}" > "$OUT/spill-$label.vitest.txt" 2>&1) || true
  tail -6 "$OUT/spill-$label.vitest.txt"
}

instrument "$SCRATCH/pr-131-base" "$SCRATCH/i131-base"
instrument "$SCRATCH/pr-131-head" "$SCRATCH/i131-head"
run "$SCRATCH/i131-base" 131-base
run "$SCRATCH/i131-head" 131-head
