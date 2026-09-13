"""M2: for each shipped apps/cli daemon mechanism file, which test files reach it (direct import = unit test;
transitive = through other modules). Static relative-import graph within the repo. Read-only on worktrees."""
import json, pathlib, re, sys
IMPORT = re.compile(r'''(?:import|export)\s[^;]*?from\s+["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|new URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url''')
def build(root: pathlib.Path):
    files = [p for p in root.rglob("*") if p.suffix in (".ts", ".mts", ".mjs") and "node_modules" not in p.parts and "dist" not in p.parts]
    graph = {}
    for f in files:
        deps = set()
        for m in IMPORT.finditer(f.read_text(errors="ignore")):
            spec = m.group(1) or m.group(2) or m.group(3)
            if not spec or not spec.startswith("."): continue
            target = (f.parent / spec).resolve()
            for cand in (target.with_suffix(".ts"), target, target.with_suffix(".mjs"), target.with_suffix(".mts")):
                if cand.exists() and cand.is_file():
                    deps.add(cand); break
        graph[f.resolve()] = deps
    return graph
def reach(graph, start):
    seen, stack = set(), [start]
    while stack:
        n = stack.pop()
        for d in graph.get(n, ()):
            if d not in seen: seen.add(d); stack.append(d)
    return seen
def analyse(root, names):
    root = root.resolve(); graph = build(root)
    tests = [f for f in graph if f.name.endswith(".test.ts") and "apps/cli" in str(f)]
    out = {}
    for name in names:
        target = (root / "apps/cli/src/daemon" / name).resolve()
        if not target.exists(): out[name] = None; continue
        direct = sorted(str(t.relative_to(root)) for t in tests if target in graph[t])
        trans = sorted(str(t.relative_to(root)) for t in tests if target in reach(graph, t) and target not in graph[t])
        out[name] = {"direct": direct, "transitive": trans}
    return out
base, head, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), sys.argv[3]
cli_owned = {"daemon-command-dispatcher.ts", "invocation-route.ts", "invocation-workspace-selector.ts"}
head_names = sorted(p.name for p in (head / "apps/cli/src/daemon").glob("*.ts") if not p.name.endswith(".test.ts") and p.name not in cli_owned)
renames = {"daemon-process-coordinator.ts": "workspace-daemon.ts"}
b = analyse(base, [renames.get(n, n) for n in head_names]); h = analyse(head, head_names)
rows = []
for n in head_names:
    bn = renames.get(n, n); br = b[bn]; hr = h[n]
    rows.append({"file": n, "baseName": bn,
                 "baseDirect": len(br["direct"]) if br else None, "baseTransitive": len(br["transitive"]) if br else None,
                 "headDirect": len(hr["direct"]), "headTransitive": len(hr["transitive"]),
                 "baseDirectFiles": br["direct"] if br else [], "headDirectFiles": hr["direct"], "headTransitiveFiles": hr["transitive"]})
json.dump(rows, open(out, "w"), indent=1)
print(f'{"file":<45} base direct/trans   head direct/trans')
for r in rows: print(f'{r["file"]:<45} {r["baseDirect"]!s:>4} / {r["baseTransitive"]!s:<4}      {r["headDirect"]:>4} / {r["headTransitive"]}')
print("sum", sum(r["baseDirect"] or 0 for r in rows), sum(r["headDirect"] for r in rows))
