"""G6: for every test file renamed in #148 (git -M), compare test titles and expect() counts base vs head.
Reads git blobs from worktrees (read-only)."""
import json, re, subprocess, sys
head_wt, base_wt, out = sys.argv[1], sys.argv[2], sys.argv[3]
base_sha = subprocess.check_output(["git", "-C", base_wt, "rev-parse", "HEAD"], text=True).strip()
ns = subprocess.check_output(["git", "-C", head_wt, "diff", "-M", "--name-status", base_sha, "HEAD"], text=True)
def blob(wt, rev, path):
    return subprocess.check_output(["git", "-C", wt, "show", f"{rev}:{path}"], text=True)
TITLE = re.compile(r'''\b(?:it|test)(?:\.each\([\s\S]*?\))?\(\s*(["'`])((?:\\.|(?!\1).)*)\1''')
def inventory(src):
    titles = [m.group(2) for m in TITLE.finditer(src)]
    return {"titles": titles, "expects": len(re.findall(r'\bexpect(?:TypeOf)?\(', src)), "lines": src.count("\n")}
rows = []
for line in ns.splitlines():
    parts = line.split("\t")
    if not parts[0].startswith("R") or not parts[1].endswith((".test.ts",)): continue
    old, new = parts[1], parts[2]
    b = inventory(blob(head_wt, base_sha, old)); h = inventory(blob(head_wt, "HEAD", new))
    missing = [t for t in b["titles"] if t not in h["titles"]]
    added = [t for t in h["titles"] if t not in b["titles"]]
    rows.append({"from": old, "to": new, "similarity": parts[0], "baseTests": len(b["titles"]), "headTests": len(h["titles"]),
                 "baseExpects": b["expects"], "headExpects": h["expects"], "missingTitles": missing, "addedTitles": added})
json.dump(rows, open(out, "w"), indent=1)
tb = sum(r["baseTests"] for r in rows); th = sum(r["headTests"] for r in rows)
eb = sum(r["baseExpects"] for r in rows); eh = sum(r["headExpects"] for r in rows)
print(f"{len(rows)} renamed test files | titles {tb} -> {th} | expect() {eb} -> {eh}")
for r in rows:
    if r["missingTitles"] or r["baseExpects"] != r["headExpects"]:
        print(f'{r["similarity"]} {r["from"].split("/")[-1]} -> {r["to"]}: tests {r["baseTests"]}->{r["headTests"]} expects {r["baseExpects"]}->{r["headExpects"]}')
        for t in r["missingTitles"]: print("   - missing:", t)
        for t in r["addedTitles"]: print("   + added:  ", t)
