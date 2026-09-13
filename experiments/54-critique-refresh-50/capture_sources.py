"""Capture only the pinned source witnesses used by this critique."""
from pathlib import Path
from hashlib import sha256
import json
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
SOURCES = OUT / "reading/sources"
SOURCES.mkdir(parents=True, exist_ok=True)
specs = [
    ("primary-owner.ts", "d07002357d3e9596bfaae910a1ac63b77981620b", "packages/core/src/workspace/project-graph.ts", [(154,160),(319,340)]),
    ("migration-plan.md", "20838f8dbf413e04767543eb2380d0d114da6c60", "plans/005/daemon-policy.md", [(62,66)]),
    ("client-runtime.ts", "20838f8dbf413e04767543eb2380d0d114da6c60", "packages/daemon/src/client/daemon-client-runtime.ts", [(85,100)]),
    ("worker-parent.ts", "b100221db48754656328391b878299c5a0bab443", "apps/cli/src/daemon/daemon-navigation-worker.ts", [(78,100)]),
    ("program-policy.ts", "b100221db48754656328391b878299c5a0bab443", "apps/cli/src/program.ts", [(7,7),(70,80)]),
]
records = []
for name, revision, path, ranges in specs:
    data = subprocess.check_output(["git", "-C", str(ROOT / "worktrees/stack-head"), "show", revision + ":" + path])
    (SOURCES / name).write_bytes(data)
    records.append({"file":name,"revision":revision,"source_path":path,"sha256":sha256(data).hexdigest(),"relevant_lines":ranges})
prs = json.loads((ROOT / "inputs/stack/pr.json").read_text())["pullRequests"]
body = next(p["body"] for p in prs if p["number"] == 127)
(SOURCES / "pr-127-body.md").write_text(body + "\n")
records.append({"file":"pr-127-body.md","origin":"inputs/stack/pr.json, pull request 127 body","sha256":sha256((body+"\n").encode()).hexdigest()})
(SOURCES / "manifest.json").write_text(json.dumps(records,indent=2)+"\n")
print(json.dumps({"captured":len(records)}))
