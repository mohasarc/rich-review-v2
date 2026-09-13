import json, os, re, collections, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
INPUTS = os.path.normpath(os.path.join(ROOT, "..", "..", "inputs", "stack"))
LABELS = ["main","123","124","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149"]

pr_json = json.load(open(os.path.join(INPUTS, "pr.json")))
decisions = json.load(open(os.path.join(ROOT, "data", "decisions-stated.json")))
deps = json.load(open(os.path.join(ROOT, "data", "pr-deps.json")))
board = json.load(open(os.path.join(ROOT, "data", "board.json")))
kinds = json.load(open(os.path.join(ROOT, "content", "decision-kinds.json")))

def is_test(path):
    return bool(re.search(r"\.test\.|/test/|^meta-tests/|/testing/(?!daemon-testing-inspector)|fixture", path))

def section(body, name):
    m = re.search(r"## " + re.escape(name) + r"\s*\n(.*?)(\n## |\Z)", body, re.S)
    return m.group(1).strip() if m else ""

def first_paragraph(text):
    return text.split("\n\n")[0].strip()

def mermaid_blocks(text):
    return re.findall(r"```mermaid\n(.*?)```", text, re.S)

def tree_block(text):
    m = re.search(r"```text\n(.*?)```", text, re.S)
    return m.group(1).rstrip() if m else ""

def ts_blocks(text):
    return re.findall(r"```ts\n(.*?)```", text, re.S)

commit_of = {c["label"]: c["sha"] for c in board["commits"]}

prs = []
for p in pr_json["pullRequests"]:
    label = str(p["number"])
    numstat = [l.split("\t") for l in open(os.path.join(ROOT, "work", "diffs", label + ".numstat")).read().strip().split("\n") if l]
    prod_add = prod_del = test_add = test_del = other_add = other_del = 0
    files = []
    for add, dele, path in numstat:
        a = int(add) if add != "-" else 0
        d = int(dele) if dele != "-" else 0
        path = re.sub(r"\{(.*?) => (.*?)\}", lambda m: m.group(2), path)
        path = path.split(" => ")[-1]
        kind = "test" if is_test(path) else ("prod" if re.search(r"\.(ts|mjs|cjs|js)$", path) and re.match(r"^(apps|packages)/", path) else "other")
        files.append({"path": path, "add": a, "del": d, "kind": kind})
        if kind == "test":
            test_add += a; test_del += d
        elif kind == "prod":
            prod_add += a; prod_del += d
        else:
            other_add += a; other_del += d
    status = collections.Counter(l.split("\t")[0][0] for l in open(os.path.join(ROOT, "work", "diffs", label + ".name-status")).read().strip().split("\n") if l)
    body = p["body"]
    look = re.findall(r"^- `([^`]+)`", section(body, "Look here"), re.M)
    shape = section(body, "Shape")
    prs.append({
        "n": p["number"],
        "label": label,
        "title": p["title"],
        "base": LABELS[LABELS.index(label) - 1],
        "sha": commit_of[label],
        "baseSha": commit_of[LABELS[LABELS.index(label) - 1]],
        "head": p.get("headRefName") or p.get("head", ""),
        "context": first_paragraph(section(body, "Context")),
        "contextFull": section(body, "Context"),
        "diagrams": mermaid_blocks(shape),
        "shapeNotes": [l[2:] for l in shape.split("\n") if l.startswith("- ")],
        "tree": tree_block(section(body, "Where it lives")),
        "surface": ts_blocks(section(body, "Public surface")),
        "look": look,
        "commits": [{"sha": c["sha"][:9], "subject": c["subject"], "body": c.get("body", "")} for c in p["commits"]],
        "stat": {"files": len(numstat), "add": sum(f["add"] for f in files), "del": sum(f["del"] for f in files),
                  "prodAdd": prod_add, "prodDel": prod_del, "testAdd": test_add, "testDel": test_del, "otherAdd": other_add, "otherDel": other_del,
                  "A": status.get("A", 0), "M": status.get("M", 0), "D": status.get("D", 0), "R": status.get("R", 0)},
        "files": files,
        "deps": deps["deps"][label],
        "reduced": deps["reduced"][label],
        "ancestors": deps["ancestors"][label],
    })

kind_of = {}
for k in kinds["kinds"]:
    for ref in k["decisions"]:
        kind_of[ref] = k["id"]
for d in decisions:
    ref = "%d.%d" % (d["pr"], d["i"])
    d["id"] = ref
    d["kind"] = kind_of.get(ref)
    d["status"] = "stated"
missing = [d["id"] for d in decisions if not d["kind"]]
if missing:
    raise SystemExit("unclassified decisions: %s" % missing)

depth = {}
for label in LABELS[1:]:
    ds = deps["deps"][label]
    depth[label] = 1 + max([depth[k] for k in ds] or [0])
for p in prs:
    p["depth"] = depth[p["label"]]

dependents = collections.defaultdict(list)
for p in prs:
    for k in p["deps"]:
        dependents[k].append(p["label"])
for p in prs:
    p["dependents"] = sorted(dependents[p["label"]], key=LABELS.index)

stack = {"prs": prs, "decisions": decisions, "kinds": kinds["kinds"], "kindsNote": kinds["note"], "labels": LABELS,
         "base": pr_json["base"], "head": pr_json["head"]}
out = os.path.join(ROOT, "data", "stack.js")
open(out, "w").write("window.STACK = " + json.dumps(stack, separators=(",", ":")) + ";\n")
open(os.path.join(ROOT, "data", "board.js"), "w").write("window.BOARD = " + json.dumps(board, separators=(",", ":")) + ";\n")
print("wrote stack.js", os.path.getsize(out), "board.js", os.path.getsize(os.path.join(ROOT, "data", "board.js")))
print("depths", collections.Counter(depth.values()))
for p in prs:
    print(p["label"], "depth", p["depth"], "stat", p["stat"], "dependents", p["dependents"])
