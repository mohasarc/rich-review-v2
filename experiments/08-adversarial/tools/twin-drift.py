"""M1: pair each frozen apps/cli daemon copy with its closest packages/daemon twin; measure drift.
Reads worktrees read-only. Output: evidence/twin-drift-148.json"""
import difflib, json, os, pathlib, sys
WT = pathlib.Path(sys.argv[1])          # worktree root (pr-148-head)
OUT = pathlib.Path(sys.argv[2])
app_dir = WT / "apps/cli/src/daemon"
cli_owned = {"daemon-command-dispatcher.ts", "invocation-route.ts", "invocation-workspace-selector.ts"}
app = sorted(p for p in app_dir.glob("*.ts") if not p.name.endswith(".test.ts") and p.name not in cli_owned)
pkg = sorted(p for p in (WT / "packages/daemon/src").rglob("*.ts") if not p.name.endswith(".test.ts"))
def lines(p): return p.read_text().replace("\r\n", "\n").splitlines()
pkg_lines = {p: lines(p) for p in pkg}
rows = []
for a in app:
    al = lines(a)
    best = None
    for p, pl in pkg_lines.items():
        sm = difflib.SequenceMatcher(None, al, pl, autojunk=False)
        r = sm.ratio()
        if best is None or r > best[0]:
            best = (r, p, sm)
    r, p, sm = best
    changed = sum(max(i2 - i1, j2 - j1) for tag, i1, i2, j1, j2 in sm.get_opcodes() if tag != "equal")
    rows.append({"app": str(a.relative_to(WT)), "appLines": len(al), "twin": str(p.relative_to(WT)) if r > 0.3 else None,
                 "twinLines": len(pkg_lines[p]), "similarity": round(r, 3), "changedLines": changed if r > 0.3 else None})
json.dump(rows, open(OUT, "w"), indent=1)
print(len(app), "frozen app files")
for x in rows: print(f'{x["similarity"]:.2f} {x["changedLines"]!s:>5} {x["app"]:<60} -> {x["twin"]}')
