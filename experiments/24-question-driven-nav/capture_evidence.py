"""Capture only the assigned PR's evidence. Never writes to the worktrees."""
from pathlib import Path
import json
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
HEAD = ROOT / "worktrees/pr-127-head"
BASE = ROOT / "worktrees/pr-127-base"
BUNDLE = ROOT / "inputs/pr-127"

paths = {
    "scope": "packages/core/src/backend/turn-scoped-cache-scope.ts",
    "scope-test": "packages/core/src/backend/turn-scoped-cache-scope.test.ts",
    "service": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",
    "service-test": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",
    "backend": "packages/backend-typescript/src/typescript-backend/typescript-backend.ts",
    "exports": "packages/core/src/index.ts",
    "project-graph": "packages/core/src/workspace/project-graph.ts",
    "ts-project": "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts",
    "spec": "plans/005/daemon-architecture-functional-spec.md",
}
sources = {}
for version, tree in [("head", HEAD), ("base", BASE)]:
    sha = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=tree, text=True).strip()
    for name, path in paths.items():
        source = tree / path
        if not source.exists():
            continue
        text = source.read_text()
        filename = version + "-" + name + ".txt"
        (HERE / "evidence" / filename).write_text(text)
        sources[version + "-" + name] = dict(path=path, sha=sha, text=text, file=filename)

for filename in ["pr.json", "diff.patch", "files.txt"]:
    (HERE / "evidence" / filename).write_bytes((BUNDLE / filename).read_bytes())
(HERE / "evidence/sources.json").write_text(json.dumps(sources, indent=2) + "\n")
print("Captured " + str(len(sources)) + " source snapshots, PR metadata, diff, and file counts.")
