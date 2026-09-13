"""M1b: per twin pair, diff with import/export-from lines and blank lines removed. Prints non-import hunks."""
import difflib, json, pathlib, re, sys
WT = pathlib.Path(sys.argv[1]); rows = json.load(open(sys.argv[2])); out = sys.argv[3]
def norm(p):
    s = (WT / p).read_text().replace("\r\n", "\n")
    s = re.sub(r'^import[\s\S]*?from\s+"[^"]+";\s*$', "", s, flags=re.M)
    s = re.sub(r'^export\s+(type\s+)?\{[^}]*\}\s+from\s+"[^"]+";\s*$', "", s, flags=re.M)
    return [l for l in s.splitlines() if l.strip()]
result = []
tot_app = tot_logic = 0
for r in rows:
    a, t = norm(r["app"]), norm(r["twin"])
    d = [l for l in difflib.unified_diff(a, t, r["app"], r["twin"], n=1, lineterm="")]
    changed = [l for l in d if (l.startswith("+") or l.startswith("-")) and not l.startswith(("+++", "---"))]
    r2 = dict(r, logicChangedLines=len(changed), logicDiff="\n".join(d))
    result.append(r2); tot_app += r["appLines"]; tot_logic += len(changed)
json.dump(result, open(out, "w"), indent=1)
print("total frozen app lines", tot_app, "| non-import +/- lines vs twins", tot_logic)
for r in sorted(result, key=lambda x: -x["logicChangedLines"]):
    if r["logicChangedLines"]: print(r["logicChangedLines"], r["app"], "->", r["twin"])
