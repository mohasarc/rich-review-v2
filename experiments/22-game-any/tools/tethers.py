import json, sys, collections, os

HERE = os.path.dirname(os.path.abspath(__file__))
G = os.path.join(HERE, "..", "data", "graphs")
LABELS = ["main","123","124","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149"]

def load(label):
    return json.load(open(os.path.join(G, label + ".json")))

def target_pkg(f, imp, files):
    if imp.get("external"):
        return None
    if "pkg" in imp:
        return imp["pkg"]
    if imp.get("file"):
        return files[imp["file"]]["pkg"]
    return "?"

def is_daemon_mechanism(path):
    return path.startswith("apps/cli/src/daemon/") or path.startswith("packages/daemon/src/")

def tethers(label, prod_only=True):
    g = load(label)
    files = g["files"]
    out = collections.defaultdict(list)
    for f, info in files.items():
        if prod_only and info["test"]:
            continue
        if not is_daemon_mechanism(f):
            continue
        for imp in info["imports"]:
            if imp.get("external"):
                continue
            if imp.get("file"):
                tf = imp["file"]
                if is_daemon_mechanism(tf):
                    continue
                out[f].append(tf)
            elif "pkg" in imp:
                if imp["pkg"] == "daemon":
                    continue
                out[f].append("@symnav/" + imp["pkg"] + ("/" + imp["sub"] if imp["sub"] else ""))
            else:
                out[f].append("UNRESOLVED " + imp["spec"])
    return out

def pkg_edges(label, prod_only=True):
    g = load(label)
    files = g["files"]
    edges = collections.Counter()
    for f, info in files.items():
        if prod_only and info["test"]:
            continue
        for imp in info["imports"]:
            tp = target_pkg(f, imp, files)
            if tp and tp != info["pkg"]:
                edges[(info["pkg"], tp)] += 1
    return edges

if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "tethers":
        for label in sys.argv[2:]:
            t = tethers(label)
            print("=====", label, sum(len(v) for v in t.values()), "tethers in", len(t), "files")
            for f in sorted(t):
                print("  ", f)
                for x in sorted(set(t[f])):
                    print("       ->", x)
    elif mode == "pkg":
        for label in sys.argv[2:]:
            print("=====", label)
            for (a, b), n in sorted(pkg_edges(label).items()):
                print("   %-20s -> %-20s %d" % (a, b, n))
    elif mode == "count":
        for label in LABELS:
            t = tethers(label)
            print(label, sum(len(set(v)) for v in t.values()), len(t))
