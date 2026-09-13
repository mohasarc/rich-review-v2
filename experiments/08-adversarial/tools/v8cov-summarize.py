"""Summarize raw NODE_V8_COVERAGE dumps: per source file under apps/cli/src/daemon (ts via vite-node, js via dist),
functions executed / total. Merges all processes; a function counts as executed if any dump saw count>0."""
import json, pathlib, sys, collections, urllib.parse
cov_dir = pathlib.Path(sys.argv[1]); root = sys.argv[2]; out = sys.argv[3]
funcs = collections.defaultdict(dict)   # file -> {(start,end,name): executed}
for dump in cov_dir.glob("*.json"):
    try: data = json.load(open(dump))
    except Exception: continue
    for script in data.get("result", []):
        url = script.get("url", "")
        path = urllib.parse.unquote(url[7:]) if url.startswith("file://") else url
        if "/apps/cli/src/daemon/" not in path and "/apps/cli/dist/daemon/" not in path: continue
        if not path.startswith(root) and not path.startswith("/private" + root): continue
        name = pathlib.Path(path).name.replace(".js", ".ts")
        kind = "dist" if "/dist/" in path else "src"
        key = f"{kind}:{name}"
        for fn in script["functions"]:
            r = fn["ranges"][0]
            if r["startOffset"] == 0 and fn["functionName"] == "": continue
            k = (fn["functionName"], r["startOffset"], r["endOffset"])
            funcs[key][k] = funcs[key].get(k, False) or r["count"] > 0
summary = {k: {"executed": sum(v.values()), "total": len(v)} for k, v in sorted(funcs.items())}
json.dump(summary, open(out, "w"), indent=1)
for k, v in summary.items(): print(f'{k:<55} {v["executed"]:>4}/{v["total"]:<4}')
