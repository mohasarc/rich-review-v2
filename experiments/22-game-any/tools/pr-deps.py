import json, os, collections, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
LABELS = ["main","123","124","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149"]

def load(label):
    return json.load(open(os.path.join(ROOT, "data", "graphs", label + ".json")))["files"]

def renames(label):
    out = {}
    for line in open(os.path.join(ROOT, "work", "diffs", label + ".name-status")):
        parts = line.rstrip("\n").split("\t")
        if parts[0].startswith("R") or parts[0].startswith("C"):
            out[parts[2]] = parts[1]
    return out

graphs = {l: load(l) for l in LABELS}

intro = {}
for l in LABELS:
    for f, info in graphs[l].items():
        if info["test"]:
            continue
        for n in info.get("exports", []):
            if (info["pkg"], n) not in intro:
                intro[(info["pkg"], n)] = l

def target_pkg(label, imp):
    if imp.get("file"):
        t = graphs[label].get(imp["file"])
        return t["pkg"] if t else None
    return imp.get("pkg")

exporters_at = {}
for l in LABELS:
    m = collections.defaultdict(set)
    for f, info in graphs[l].items():
        if info["test"]:
            continue
        for n in info.get("exports", []):
            m[n].add(f)
    exporters_at[l] = m

def imported_names(info):
    s = set()
    for imp in info.get("namedImports", []):
        for n in imp["names"]:
            s.add(n)
    return s

def deps(include_tests):
    result = collections.OrderedDict()
    for idx in range(1, len(LABELS)):
        j = LABELS[idx]
        base = graphs[LABELS[idx - 1]]
        head = graphs[j]
        rn = renames(j)
        by = collections.defaultdict(list)
        for f, info in head.items():
            if info["test"] and not include_tests:
                continue
            fb = rn.get(f, f)
            before = imported_names(base[fb]) if fb in base else set()
            for imp in info.get("namedImports", []):
                if imp.get("external"):
                    continue
                tp = target_pkg(j, imp)
                for n in imp["names"]:
                    if n in before or n in ("*", "default"):
                        continue
                    k = intro.get((tp, n))
                    if k is None or k == "main" or k == j:
                        continue
                    if LABELS.index(k) > idx:
                        continue
                    by[k].append((f, n))
        result[j] = by
    return result

if __name__ == "__main__":
    include_tests = "--tests" in sys.argv
    verbose = "-v" in sys.argv
    r = deps(include_tests)
    for j, by in r.items():
        ks = sorted(by, key=LABELS.index)
        print(j, "<-", " ".join("%s(%d)" % (k, len(by[k])) for k in ks))
        if verbose:
            for k in ks:
                names = sorted(set(n for _, n in by[k]))
                print("      %s: %s" % (k, ", ".join(names[:14]) + (" ..." if len(names) > 14 else "")))

def added_by():
    owner = {}
    for idx in range(1, len(LABELS)):
        j = LABELS[idx]
        for line in open(os.path.join(ROOT, "work", "diffs", j + ".name-status")):
            parts = line.rstrip("\n").split("\t")
            st = parts[0]
            if st == "A":
                owner[parts[1]] = j
            elif st.startswith("R"):
                if parts[1] in owner:
                    owner[parts[2]] = owner[parts[1]]
    return owner

def touch_deps(prod_only):
    owner = {}
    out = collections.OrderedDict()
    for idx in range(1, len(LABELS)):
        j = LABELS[idx]
        by = collections.defaultdict(list)
        rows = [l.rstrip("\n").split("\t") for l in open(os.path.join(ROOT, "work", "diffs", j + ".name-status"))]
        for parts in rows:
            st = parts[0]
            path = parts[1]
            is_test = bool(re.search(r"\.test\.|/test/|meta-tests/|fixture", path))
            if prod_only and is_test:
                continue
            if st in ("M", "D") or st.startswith("R"):
                k = owner.get(path)
                if k and k != j:
                    by[k].append((st[0], path))
        for parts in rows:
            st = parts[0]
            if st == "A":
                owner[parts[1]] = j
            elif st.startswith("R"):
                if parts[1] in owner:
                    owner[parts[2]] = owner.pop(parts[1])
        out[j] = by
    return out

if __name__ == "__main__" and "--touch" in sys.argv:
    t = touch_deps("--all" not in sys.argv)
    for j, by in t.items():
        ks = sorted(by, key=LABELS.index)
        print("T", j, "<-", " ".join("%s(%d)" % (k, len(by[k])) for k in ks))
        if verbose:
            for k in ks:
                print("        %s: %s" % (k, ", ".join(sorted(set(p.split('/')[-1] for _, p in by[k])))[:200]))

def moved_import_deps():
    out = collections.OrderedDict()
    for idx in range(1, len(LABELS)):
        j = LABELS[idx]
        head = graphs[j]
        by = collections.defaultdict(list)
        for line in open(os.path.join(ROOT, "work", "diffs", j + ".name-status")):
            parts = line.rstrip("\n").split("\t")
            if not parts[0].startswith("R"):
                continue
            old, new = parts[1], parts[2]
            if old.split("/")[:2] == new.split("/")[:2]:
                continue
            info = head.get(new)
            if not info or info["test"]:
                continue
            for imp in info.get("namedImports", []):
                if imp.get("external"):
                    continue
                tp = target_pkg(j, imp)
                for n in imp["names"]:
                    k = intro.get((tp, n))
                    if k and k not in ("main", j) and LABELS.index(k) < idx:
                        by[k].append((new, n))
        out[j] = by
    return out

def copy_deps():
    owner = {}
    out = collections.OrderedDict()
    for idx in range(1, len(LABELS)):
        j = LABELS[idx]
        by = collections.defaultdict(list)
        rows = [l.rstrip("\n").split("\t") for l in open(os.path.join(ROOT, "work", "diffs", j + ".copies"))]
        for parts in rows:
            if parts[0].startswith("C"):
                src = parts[1]
                if re.search(r"\.test\.|/test/|meta-tests/|fixture", src):
                    continue
                k = owner.get(src)
                if k and k != j:
                    by[k].append(("C", src))
        for parts in rows:
            if parts[0] == "A":
                owner[parts[1]] = j
            elif parts[0].startswith("C"):
                owner[parts[2]] = j
            elif parts[0].startswith("R"):
                owner[parts[2]] = owner.pop(parts[1], j)
        out[j] = by
    return out

def combined():
    a = deps(False)
    c = copy_deps()
    t = touch_deps(True)
    m = moved_import_deps()
    out = collections.OrderedDict()
    for j in LABELS[1:]:
        ks = set(a[j]) | set(t[j]) | set(m[j]) | set(c[j])
        out[j] = {k: {"names": sorted(set(n for _, n in a[j].get(k, []) + m[j].get(k, []))), "files": sorted(set(p for _, p in t[j].get(k, []))), "copied": sorted(set(p for _, p in c[j].get(k, [])))} for k in ks}
    return out

def reduction(dag):
    order = LABELS[1:]
    reach = {j: set() for j in order}
    for j in order:
        for k in dag[j]:
            reach[j] |= {k} | reach[k]
    red = {}
    for j in order:
        direct = set(dag[j])
        red[j] = sorted([k for k in direct if not any(k in reach[o] for o in direct if o != k)], key=LABELS.index)
    return red, reach

if __name__ == "__main__" and "--combined" in sys.argv:
    dag = combined()
    red, reach = reduction(dag)
    json.dump({"deps": dag, "reduced": red, "ancestors": {j: sorted(v, key=LABELS.index) for j, v in reach.items()}}, open(os.path.join(ROOT, "data", "pr-deps.json"), "w"), indent=1)
    for j in LABELS[1:]:
        print(j, "direct:", sorted(dag[j], key=LABELS.index), "reduced:", red[j], "ancestors:", len(reach[j]))
