#!/usr/bin/env bash
# G4: inject one regression at a time into a shipped apps/cli daemon file (text identical in #148 base and head).
# Record which suites notice: base apps/cli unit tests; head apps/cli unit tests, head freeze meta-test,
# head twin package tests, head e2e daemon suite. Scratch copies only; worktrees untouched.
set -uo pipefail
SCRATCH=${SCRATCH:-/tmp/rr08}
HERE=$(cd "$(dirname "$0")" && pwd); OUT=${OUT:-$HERE/../evidence/mutants}
mkdir -p "$OUT"
RUN_E2E=${RUN_E2E:-1}

rsync -a --delete "$SCRATCH/pr-148-base/" "$SCRATCH/mut-base/"
rsync -a --delete "$SCRATCH/pr-148-head/" "$SCRATCH/mut-head/"

# id ^ shipped file ^ search ^ replace ^ twin package test files
MUTANTS=(
  "M1-wire-frame-cap^daemon-wire-codec.ts^if (payload.byteLength > maximumPayloadBytes) {^if (payload.byteLength > maximumPayloadBytes + 1) {^src/transport/wire-codec.test.ts"
  "M2-spool-aggregate-cap^completion-spool.ts^if (this.rawBytes + bytes > this.maximumAggregateBytes) {^if (false && this.rawBytes + bytes > this.maximumAggregateBytes) {^src/delivery/completion-spool.test.ts"
  "M3-identity-request-extra-keys^daemon-protocol-validator.ts^!DaemonProtocolValidator.hasExactKeys(value, [\"kind\", \"instanceId\", \"processToken\"]) ||\\n        !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||\\n        !DaemonProtocolValidator.isRuntimeString(value.processToken)\\n      ) {\\n        throw new Error(\"Malformed daemon identity request\");^!DaemonProtocolValidator.isRuntimeString(value.instanceId) ||\\n        !DaemonProtocolValidator.isRuntimeString(value.processToken)\\n      ) {\\n        throw new Error(\"Malformed daemon identity request\");^src/transport/protocol-validator.test.ts"
  "M4-ledger-conflict-blind^accepted-request-ledger.ts^return existing.requestFingerprint === requestFingerprint ? \"matching\" : \"conflicting\";^return existing.requestFingerprint === requestFingerprint ? \"matching\" : \"matching\";^src/execution/accepted-request-ledger.test.ts src/process/process-coordinator-requests.test.ts"
)

apply() {
  python3 - "$1" "$2" "$3" <<'PY'
import sys, pathlib
path, search, replace = sys.argv[1], sys.argv[2].encode().decode("unicode_escape"), sys.argv[3].encode().decode("unicode_escape")
p = pathlib.Path(path); s = p.read_text()
assert s.count(search) == 1, (path, s.count(search))
p.write_text(s.replace(search, replace))
PY
}

failed_tests() { grep -E '^ FAIL ' "$1" | sed 's/^ FAIL  //' | sort -u; }

summary="$OUT/summary.jsonl"; rm -f "$summary"
for tree in base head; do
  (cd "$SCRATCH/mut-$tree/apps/cli" && node ../../node_modules/vitest/vitest.mjs run src > "$OUT/M0-baseline-$tree-cli-unit.txt" 2>&1)
  echo "baseline $tree cli unit: $(grep -E '^\s+Tests ' "$OUT/M0-baseline-$tree-cli-unit.txt" | tail -1)"
done
if [ "$RUN_E2E" = "1" ]; then
  (cd "$SCRATCH/mut-head/apps/cli" && node ../../node_modules/vitest/vitest.mjs run test/e2e/daemon > "$OUT/M0-baseline-head-e2e.txt" 2>&1)
  echo "baseline head e2e: $(grep -E '^\s+Tests ' "$OUT/M0-baseline-head-e2e.txt" | tail -1)"
fi
for spec in "${MUTANTS[@]}"; do
  IFS='^' read -r id file search replace twin_tests <<<"$spec"
  echo "=== $id ($file)"
  for tree in base head; do
    cp "$SCRATCH/mut-$tree/apps/cli/src/daemon/$file" "$SCRATCH/mut-$tree/apps/cli/src/daemon/$file.orig"
    apply "$SCRATCH/mut-$tree/apps/cli/src/daemon/$file" "$search" "$replace"
    (cd "$SCRATCH/mut-$tree/apps/cli" && node ../../node_modules/vitest/vitest.mjs run src > "$OUT/$id-$tree-cli-unit.txt" 2>&1)
    echo "  $tree cli unit: $(grep -E '^\s+Tests ' "$OUT/$id-$tree-cli-unit.txt" | tail -1)"
  done
  (cd "$SCRATCH/mut-head/meta-tests" && node ../node_modules/vitest/vitest.mjs run src/daemon-compatibility-copy.test.ts > "$OUT/$id-head-freeze.txt" 2>&1)
  echo "  head freeze meta-test: $(grep -E '^\s+Tests ' "$OUT/$id-head-freeze.txt" | tail -1)"
  (cd "$SCRATCH/mut-head/packages/daemon" && node ../../node_modules/vitest/vitest.mjs run $twin_tests > "$OUT/$id-head-twin.txt" 2>&1)
  echo "  head twin package tests: $(grep -E '^\s+Tests ' "$OUT/$id-head-twin.txt" | tail -1)"
  e2e_line="skipped"
  if [ "$RUN_E2E" = "1" ]; then
    (cd "$SCRATCH/mut-head" && node node_modules/typescript/bin/tsc --build > "$OUT/$id-head-build.txt" 2>&1)
    (cd "$SCRATCH/mut-head/apps/cli" && node ../../node_modules/vitest/vitest.mjs run test/e2e/daemon > "$OUT/$id-head-e2e.txt" 2>&1)
    e2e_line=$(grep -E '^\s+Tests ' "$OUT/$id-head-e2e.txt" | tail -1)
    echo "  head e2e daemon: $e2e_line"
  fi
  python3 - "$id" "$file" "$OUT" "$summary" <<'PY'
import json, re, sys, pathlib
mid, file, out, summary = sys.argv[1:]
def fails(name):
    p = pathlib.Path(out) / name
    if not p.exists(): return None
    t = p.read_text()
    m = re.findall(r"^\s+Tests\s+(.*)$", t, flags=re.M)
    return {"line": m[-1].strip() if m else None, "failed": sorted(set(re.findall(r"^ FAIL  (.*)$", t, flags=re.M)))}
json.dump({"mutant": mid, "file": file,
           "baseCliUnit": fails(f"{mid}-base-cli-unit.txt"), "headCliUnit": fails(f"{mid}-head-cli-unit.txt"),
           "headFreeze": fails(f"{mid}-head-freeze.txt"), "headTwin": fails(f"{mid}-head-twin.txt"),
           "headE2e": fails(f"{mid}-head-e2e.txt")}, open(summary, "a")); open(summary, "a").write("\n")
PY
  for tree in base head; do
    mv "$SCRATCH/mut-$tree/apps/cli/src/daemon/$file.orig" "$SCRATCH/mut-$tree/apps/cli/src/daemon/$file"
  done
done
if [ "$RUN_E2E" = "1" ]; then (cd "$SCRATCH/mut-head" && node node_modules/typescript/bin/tsc --build > /dev/null 2>&1); fi
echo done
