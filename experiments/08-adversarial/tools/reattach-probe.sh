#!/usr/bin/env bash
# E3: same socket scenarios against #131 base and head LocalDaemonTransport. Scratch copies only.
set -euo pipefail
SCRATCH=${SCRATCH:-/tmp/rr08}
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=${OUT:-$HERE/../evidence}
probe() {
  local tree=$1 label=$2 imports=$3 transport=$4 store=$5
  rsync -a --delete "$SCRATCH/$tree/" "$SCRATCH/probe-$label/"
  python3 - "$HERE/reattach-probe.template.ts" "$SCRATCH/probe-$label/apps/cli/src/daemon/rr08-reattach-probe.test.ts" "$imports" "$transport" "$store" <<'PY'
import sys, pathlib
src, dst, imports, transport, store = sys.argv[1:]
s = pathlib.Path(src).read_text().replace("__IMPORTS__", imports).replace("__TRANSPORT__", transport).replace("__STORE__", store)
pathlib.Path(dst).write_text(s)
PY
  rm -f "$OUT/reattach-$label.jsonl"
  (cd "$SCRATCH/probe-$label/apps/cli" && RR08_LOG="$OUT/reattach-$label.jsonl" \
    node ../../node_modules/vitest/vitest.mjs run src/daemon/rr08-reattach-probe.test.ts > "$OUT/reattach-$label.vitest.txt" 2>&1) || true
  echo "== $label"; cat "$OUT/reattach-$label.jsonl"
}
probe pr-131-base 131-base "" \
  "new LocalDaemonTransport({ requestTimeoutMs: 100 })" \
  "((directory: string) => new DaemonCompletionSpoolStore({ directory, workspaceKey: 'workspace', instanceId: request.instanceId }))"
probe pr-131-head 131-head 'import { DaemonPolicy } from "@symnav/daemon";' \
  "new LocalDaemonTransport(DaemonPolicy.currentSystem().values)" \
  "((directory: string) => new DaemonCompletionSpoolStore({ directory, workspaceKey: 'workspace', instanceId: request.instanceId, policy: DaemonPolicy.currentSystem().values.output }))"
