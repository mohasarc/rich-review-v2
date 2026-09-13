#!/usr/bin/env python3
"""Copy the bounded input snapshot; extract diff coordinates, not semantics."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
BUNDLE = ROOT / "inputs/pr-127"
WORKTREES = {side: ROOT / f"worktrees/pr-127-{side}" for side in ("base", "head")}


def git(side, *args):
    return subprocess.check_output(["git", "-C", str(WORKTREES[side]), *args])


def sha(data):
    return hashlib.sha256(data).hexdigest()


def main():
    revisions = {side: git(side, "rev-parse", "HEAD").decode().strip() for side in WORKTREES}
    diff = (BUNDLE / "diff.patch").read_bytes()
    computed = git("head", "diff", "--no-ext-diff", f"{revisions['base']}...{revisions['head']}")
    assert computed == diff, "Bundle diff does not match the worktree commit comparison"
    paths = re.findall(r"^diff --git a/(.*?) b/", diff.decode(), re.M)
    context = [
        "packages/core/src/workspace/project-graph.ts",
        "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts",
        "packages/backend-typescript/src/index.ts",
        "packages/backend-typescript/src/definition/find-definitions.ts",
        "packages/backend-typescript/src/call-graph/find-callees.ts",
        "plans/005/daemon-architecture-functional-spec.md",
        "AGENTS.md",
    ]
    sources = []

    def capture(key, original, data, revision=None):
        destination = OUT / "evidence" / key
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
        sources.append({"key": key, "original": str(original), "copy": str(destination.relative_to(OUT)),
                        "sha256": sha(data), "bytes": len(data), "revision": revision})

    for path in sorted(BUNDLE.iterdir()):
        if path.is_file():
            capture("bundle/" + path.name, path, path.read_bytes())
    body = json.loads((BUNDLE / "pr.json").read_text())["body"]
    capture("derived/pr-body.md", BUNDLE / "pr.json", body.encode())
    for side, tree in WORKTREES.items():
        for path in dict.fromkeys(paths + context):
            original = tree / path
            if original.exists():
                data = original.read_bytes()
                committed = git(side, "show", f"{revisions[side]}:{path}")
                assert data == committed, f"Working file differs from commit: {side}/{path}"
                capture(f"{side}/{path}", original, data, revisions[side])

    hunks = []
    current = None
    for patch_line, line in enumerate(diff.decode().splitlines(), 1):
        if line.startswith("diff --git "):
            path = re.match(r"diff --git a/(.*?) b/", line).group(1)
        elif line.startswith("@@ "):
            m = re.match(r"@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@", line)
            old, new = int(m[1]), int(m[3])
            current = {"id": f"H{len(hunks)+1:02}", "path": path, "header": line,
                       "patch_line": patch_line, "changed_lines": []}
            hunks.append(current)
        elif current and line.startswith("+") and not line.startswith("+++"):
            current["changed_lines"].append({"side": "head", "line": new, "patch_line": patch_line, "text": line[1:]})
            new += 1
        elif current and line.startswith("-") and not line.startswith("---"):
            current["changed_lines"].append({"side": "base", "line": old, "patch_line": patch_line, "text": line[1:]})
            old += 1
        elif current and line.startswith(" "):
            old += 1
            new += 1
    manifest = {"subject": "pr-127", "revisions": revisions, "diff_matches": True,
                "changed_files": paths, "runbook_v1_sha256": sha((OUT / "RUNBOOK.md").read_bytes()),
                "sources": sources}
    (OUT / "source-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    (OUT / "hunks.json").write_text(json.dumps(hunks, indent=2) + "\n")
    print(json.dumps({"revisions": revisions, "diff_matches": True, "sources": len(sources),
                      "hunks": [{"id": h["id"], "path": h["path"], "header": h["header"],
                                 "changed_lines": len(h["changed_lines"])} for h in hunks]}, indent=2))


if __name__ == "__main__":
    main()
