#!/usr/bin/env bash
# E2: remove TestLocalDaemonTransport's mkdirSync in a scratch copy of #131 head; which tests fail?
set -euo pipefail
SCRATCH=${SCRATCH:-/tmp/rr08}
OUT=${OUT:-$(cd "$(dirname "$0")/.." && pwd)/evidence}
rsync -a --delete "$SCRATCH/pr-131-head/" "$SCRATCH/cf131-nomkdir/"
python3 - "$SCRATCH/cf131-nomkdir/apps/cli/test/helpers/local-daemon-transport.ts" <<'PY'
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
anchor = """    if (options.outputDirectory !== undefined) {
      mkdirSync(options.outputDirectory, { recursive: true });
    }
"""
assert s.count(anchor) == 1
p.write_text(s.replace(anchor, ""))
PY
cd "$SCRATCH/cf131-nomkdir/apps/cli"
node ../../node_modules/vitest/vitest.mjs run src/daemon/local-daemon-transport-execution.test.ts > "$OUT/counterfactual-131-nomkdir.txt" 2>&1 || true
grep -E '^\s+(✓|×|❯)|Tests |FAIL' "$OUT/counterfactual-131-nomkdir.txt" | head -60
