"""Freeze only supplied PR-127 inputs/source; never writes to a worktree."""
from pathlib import Path
import hashlib, json, re, subprocess

HERE = Path(__file__).resolve().parents[1]
ROOT = HERE.parents[1]
PINS = {"base": "a1e325a5ff979bdfa25babc5554621c8c0f20497", "head": "64919bcbcf7fcc8202779b78c5f069b24662bb18"}
DOCS = {}

def read_doc(key, build, path):
    text = (ROOT / "worktrees" / f"pr-127-{build}" / path).read_text()
    DOCS[key] = {"path": path, "revision": PINS[build], "build": build, "text": text,
                 "sha256": hashlib.sha256(text.encode()).hexdigest()}
    (HERE / "evidence/sources" / f"{key}.txt").write_text(text)

for build, pin in PINS.items():
    wt = ROOT / "worktrees" / f"pr-127-{build}"
    actual = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=wt, text=True).strip()
    assert actual == pin, (build, actual)
    assert not subprocess.check_output(["git", "status", "--porcelain", "--untracked-files=no"], cwd=wt, text=True).strip()
    for key, path in {
        "backend": "packages/backend-typescript/src/typescript-backend/typescript-backend.ts",
        "service": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",
        "service-tests": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",
        "graph": "packages/core/src/workspace/project-graph.ts",
        "ts-project": "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts",
    }.items(): read_doc(f"{build}-{key}", build, path)
for key, path in {
    "scope": "packages/core/src/backend/turn-scoped-cache-scope.ts",
    "scope-tests": "packages/core/src/backend/turn-scoped-cache-scope.test.ts",
    "exports": "packages/core/src/index.ts",
    "spec": "plans/005/daemon-architecture-functional-spec.md",
    "follow-ups": "plans/005/daemon-follow-ups-functional-spec.md",
    "guide": "AGENTS.md",
}.items(): read_doc(key, "head", path)

pr = json.loads((ROOT / "inputs/pr-127/pr.json").read_text())
DOCS["pr"] = {"path": "inputs/pr-127/pr.json → body", "revision": "supplied PR #127 body", "build": "bundle", "text": pr["body"], "sha256": hashlib.sha256(pr["body"].encode()).hexdigest()}
(HERE / "evidence/sources/pr.txt").write_text(pr["body"])
patch = (ROOT / "inputs/pr-127/diff.patch").read_text()
(HERE / "evidence/diff.patch").write_text(patch)
(HERE / "evidence/pr.json").write_text(json.dumps(pr, indent=2) + "\n")
files = re.findall(r"^diff --git a/(.+) b/(.+)$", patch, re.M)
add = sum(line.startswith("+") and not line.startswith("+++") for line in patch.splitlines())
delete = sum(line.startswith("-") and not line.startswith("---") for line in patch.splitlines())
base_tests = DOCS["base-service-tests"]["text"]
head_tests = DOCS["head-service-tests"]["text"]
first = '  it("shares one reference search across caller and reference projections"'
assert base_tests[base_tests.index(first):] == head_tests[head_tests.index(first):]
inventory = {"pins": PINS, "files": [x[1] for x in files], "addedLines": add, "deletedLines": delete,
    "serviceTestsBefore": len(re.findall(r"\bit\(", base_tests)),
    "serviceTestsAfter": len(re.findall(r"\bit\(", head_tests)),
    "coreTestsAdded": len(re.findall(r"\bit\(", DOCS["scope-tests"]["text"])),
    "originalFiveTestsAndHelpersByteIdentical": True, "hunks": len(re.findall(r"^@@", patch, re.M))}
assert (len(files), add, delete) == (6, 391, 67)
assert (inventory["serviceTestsBefore"], inventory["serviceTestsAfter"], inventory["coreTestsAdded"]) == (5,11,4)

# An excerpt is a window into one frozen, hashed document; line numbers are original.
selections = {
    "ownership": [("head-service",29,65),("scope",1,46),("exports",144,155),("base-service",28,57)],
    "values": [("scope",9,23),("scope-tests",5,26),("head-service",68,126),("head-service",134,170),("head-service-tests",29,133)],
    "turn": [("scope",26,46),("scope-tests",28,91)],
    "refresh": [("base-backend",79,85),("head-backend",79,85),("base-service",48,55),("head-service",63,66),("head-service-tests",135,162)],
    "release": [("base-backend",87,89),("base-service",124,130),("head-backend",87,89),("head-service",129,132),("head-graph",144,152),("head-ts-project",78,84),("head-service-tests",164,217)],
    "tests": [("scope-tests",1,92),("head-service-tests",29,217),("guide",42,47),("spec",1,32)]
}
evidence = {"docs": DOCS, "selections": selections, "inventory": inventory, "pr": pr}
(HERE / "evidence/sources.json").write_text(json.dumps(evidence, indent=2) + "\n")
(HERE / "evidence/inventory.json").write_text(json.dumps(inventory, indent=2) + "\n")
(HERE / "receipts.js").write_text("window.ORIGAMI_EVIDENCE = " + json.dumps(evidence).replace("</", "<\\/") + ";\n")

survey = []
for path in sorted((ROOT / "experiments").glob("*/README.md")):
    if path.parent == HERE: continue
    lines = path.read_text().splitlines()
    chosen = [line for line in lines if "Representations used:" in line or "Shape:" in line or "origami" in line.lower() or "folding" in line.lower()]
    if chosen: survey.append({"experiment": path.parent.name, "declarations": chosen})
(HERE / "evidence/novelty-survey.json").write_text(json.dumps(survey, indent=2) + "\n")
print(json.dumps({"documents": len(DOCS), "inventory": inventory, "surveyed": len(survey)}, indent=2))
