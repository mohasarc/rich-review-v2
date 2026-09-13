import json, os, subprocess, collections, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
REPO = os.path.expanduser("~/projects/symnav")
LABELS = ["main","123","124","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149"]
TERRITORY = {"cli": "cli", "core": "core", "backend-typescript": "typescript", "renderer": "renderer", "telemetry": "telemetry", "daemon": "daemon"}

graphs = {l: json.load(open(os.path.join(ROOT, "data", "graphs", l + ".json"))) for l in LABELS}
prs = {str(p["number"]): p for p in json.load(open(os.path.join(ROOT, "..", "..", "inputs", "stack", "pr.json")))["pullRequests"]}

def on_board(path, info):
    if info["test"]:
        return False
    if not re.match(r"^(apps/cli|packages/(core|backend-typescript|renderer|telemetry|daemon))/src/", path):
        return False
    return True

def territory(path):
    m = re.match(r"^(apps|packages)/([^/]+)/", path)
    return TERRITORY["cli" if m.group(1) == "apps" else m.group(2)]

def district(path):
    parts = path.split("/")
    s = parts.index("src")
    return "/".join(parts[s + 1:-1]) or "."

def name_status(base, head):
    out = subprocess.run(["git", "-C", REPO, "diff", "-M", "-C", "--find-copies-harder", "--name-status", base, head], capture_output=True, text=True).stdout
    rows = []
    for line in out.strip().split("\n"):
        if not line:
            continue
        parts = line.split("\t")
        rows.append(parts)
    return rows

ids = {}
next_id = [0]
def fresh(path):
    next_id[0] += 1
    return "f%d" % next_id[0]

lineage = {}
copy_of = {}
births = {}
first = graphs["main"]["files"]
for path, info in sorted(first.items()):
    if on_board(path, info):
        i = fresh(path)
        ids[("main", path)] = i
        lineage[i] = [("main", path)]
        births[i] = "main"

for idx in range(1, len(LABELS)):
    b, h = LABELS[idx - 1], LABELS[idx]
    base_files = graphs[b]["files"]
    head_files = graphs[h]["files"]
    rows = name_status(graphs[b]["commit"], graphs[h]["commit"])
    renamed = {}
    copied = {}
    for parts in rows:
        st = parts[0]
        if st.startswith("R"):
            renamed.setdefault(parts[1], []).append(parts[2])
        elif st.startswith("C"):
            copied.setdefault(parts[1], []).append(parts[2])
    for old, news in list(renamed.items()):
        for new in news:
            for c in copied.get(old, []):
                if territory(c) == territory(old) and territory(new) != territory(old) and c in head_files and on_board(c, head_files[c]):
                    renamed[old] = [c]
                    copied[old] = [x for x in copied[old] if x != c] + [new]
    carried = set()
    for path, info in head_files.items():
        if not on_board(path, info):
            continue
        if path in base_files and (b, path) in ids and path not in sum(renamed.values(), []):
            still_exists_as_rename_source = path in renamed
            if not still_exists_as_rename_source:
                ids[(h, path)] = ids[(b, path)]
                carried.add(path)
    for old, news in renamed.items():
        for new in news:
            if (b, old) in ids and new in head_files and on_board(new, head_files[new]):
                ids[(h, new)] = ids[(b, old)]
    for old, news in copied.items():
        for new in news:
            if (h, new) in ids:
                continue
            if new in head_files and on_board(new, head_files[new]):
                i = fresh(new)
                ids[(h, new)] = i
                births[i] = h
                if (b, old) in ids:
                    copy_of[i] = ids[(b, old)]
    for path, info in head_files.items():
        if on_board(path, info) and (h, path) not in ids:
            i = fresh(path)
            ids[(h, path)] = i
            births[i] = h

def cross_edges(label):
    files = graphs[label]["files"]
    edges = collections.Counter()
    for path, info in files.items():
        if not on_board(path, info):
            continue
        src = ids[(label, path)]
        ts = territory(path)
        for imp in info["imports"]:
            if imp.get("external"):
                continue
            if imp.get("file"):
                tp = imp["file"]
                if tp not in files or not on_board(tp, files[tp]):
                    continue
                tt = territory(tp)
                if tt != ts:
                    edges[(src, ids[(label, tp)])] += 1
            elif "pkg" in imp and imp["pkg"] in TERRITORY:
                tt = TERRITORY[imp["pkg"]]
                if tt != ts:
                    edges[(src, "@" + tt + ("/" + imp["sub"] if imp["sub"] else ""))] += 1
    return edges

def is_mechanism(path):
    return path.startswith("apps/cli/src/daemon/") or path.startswith("packages/daemon/src/")

def tethers(label):
    files = graphs[label]["files"]
    out = []
    for path, info in files.items():
        if not on_board(path, info) or not is_mechanism(path):
            continue
        for imp in info["imports"]:
            if imp.get("external"):
                continue
            if imp.get("file"):
                tp = imp["file"]
                if tp in files and on_board(tp, files[tp]) and not is_mechanism(tp):
                    out.append([ids[(label, path)], ids[(label, tp)], imp.get("spec")])
            elif "pkg" in imp and imp["pkg"] in TERRITORY and imp["pkg"] != "daemon":
                out.append([ids[(label, path)], "@" + TERRITORY[imp["pkg"]] + ("/" + imp["sub"] if imp["sub"] else ""), imp.get("spec")])
    uniq = {}
    for a, t, s in out:
        uniq[(a, t)] = s
    return [[a, t] for (a, t) in sorted(uniq)]

commits = []
for l in LABELS:
    g = graphs[l]
    entries = []
    for path, info in sorted(g["files"].items()):
        if not on_board(path, info):
            continue
        entries.append({"id": ids[(l, path)], "path": path, "t": territory(path), "d": district(path), "n": info["lines"]})
    pr = prs.get(l)
    commits.append({
        "label": l,
        "sha": g["commit"],
        "title": pr["title"] if pr else "main",
        "files": entries,
        "edges": [[a, b, n] for (a, b), n in sorted(cross_edges(l).items())],
        "tethers": tethers(l),
    })

board = {"labels": LABELS, "commits": commits, "copyOf": copy_of, "births": births}
out = os.path.join(ROOT, "data", "board.json")
json.dump(board, open(out, "w"), separators=(",", ":"))
print("wrote", out, os.path.getsize(out), "bytes; ids", next_id[0], "copies", len(copy_of))
for c in commits:
    tl = collections.Counter(e["t"] for e in c["files"])
    lines = collections.Counter()
    for e in c["files"]:
        lines[e["t"]] += e["n"]
    print(c["label"], len(c["files"]), "files", dict(lines), "tethers", len(c["tethers"]), "edges", len(c["edges"]))
