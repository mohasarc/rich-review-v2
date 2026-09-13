#!/usr/bin/env bash
# M2c: NODE_V8_COVERAGE across spawned symnav binaries and daemon processes during apps/cli/test/e2e/daemon. Scratch copies only.
set -uo pipefail
SCRATCH=${SCRATCH:-/tmp/rr08}
HERE=$(cd "$(dirname "$0")" && pwd); OUT=${OUT:-$HERE/../evidence}
label=$1; tree=$2
cov="$SCRATCH/cov-$label"; rm -rf "$cov"; mkdir -p "$cov"
(cd "$SCRATCH/$tree/apps/cli" && NODE_V8_COVERAGE="$cov" node ../../node_modules/vitest/vitest.mjs run test/e2e/daemon > "$OUT/cov-$label.vitest.txt" 2>&1)
tail -5 "$OUT/cov-$label.vitest.txt"; echo "dumps: $(ls "$cov" | wc -l)"
python3 - "$cov" "$tree" "$OUT/cov-$label.json" <<'PY'
import json, pathlib, collections, urllib.parse, sys
cov, tree, out = pathlib.Path(sys.argv[1]), sys.argv[2], sys.argv[3]
executed = collections.defaultdict(set)
for dump in cov.glob("*.json"):
    try: data = json.load(open(dump))
    except Exception: continue
    for script in data["result"]:
        url = script.get("url", ""); path = urllib.parse.unquote(url[7:]) if url.startswith("file://") else url
        for kind, marker in (("dist", f"/rr08/{tree}/apps/cli/dist/daemon/"), ("src", f"/rr08/{tree}/apps/cli/src/daemon/")):
            if marker in path and path.endswith(".js" if kind == "dist" else ".ts"):
                name = pathlib.Path(path).name.replace(".js", ".ts")
                for fn in script["functions"]:
                    r = fn["ranges"][0]
                    if r["startOffset"] == 0 and fn["functionName"] == "": continue
                    if r["count"] > 0: executed[f"{kind}:{name}"].add((fn["functionName"], r["startOffset"], r["endOffset"]))
json.dump({k: {"executed": len(v)} for k, v in sorted(executed.items())}, open(out, "w"), indent=1)
print(len(executed), "files with executed functions")
PY
