"""Compare executed-function counts (V8, count>0) for the 38 frozen apps/cli daemon files, #148 base vs head."""
import json, sys
base = json.load(open(sys.argv[1])); head = json.load(open(sys.argv[2]))
fb = json.load(open(sys.argv[3])); fh = json.load(open(sys.argv[4])); out = sys.argv[5]
cli_owned = {"daemon-command-dispatcher.ts", "invocation-route.ts", "invocation-workspace-selector.ts"}
names = sorted(n for n in fh if n not in cli_owned)
rename = {"daemon-process-coordinator.ts": "workspace-daemon.ts"}
rows = []
for n in names:
    bn = rename.get(n, n)
    b = base.get(f"src:{bn}", {}).get("executed", 0); h = head.get(f"src:{n}", {}).get("executed", 0)
    rows.append({"file": n, "baseName": bn, "staticFunctions": fh[n], "baseExecuted": b, "headExecuted": h})
json.dump(rows, open(out, "w"), indent=1)
tb = sum(r["baseExecuted"] for r in rows); th = sum(r["headExecuted"] for r in rows); ts = sum(r["staticFunctions"] for r in rows)
print(f"static functions {ts} | executed under apps/cli src tests: base {tb} head {th}")
print("files with zero executed functions: base", sum(1 for r in rows if r["baseExecuted"] == 0), "head", sum(1 for r in rows if r["headExecuted"] == 0))
for r in rows: print(f'{r["file"]:<45} static {r["staticFunctions"]:>3}  base {r["baseExecuted"]:>3}  head {r["headExecuted"]:>3}')
