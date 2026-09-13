#!/usr/bin/env python3
"""Copy read-only PR #127 evidence into this experiment; never alter a worktree."""
import hashlib
import json
from pathlib import Path
import re
import subprocess

OUTPUT = Path(__file__).resolve().parent
ROOT = OUTPUT.parents[1]
PATHS = {
    "scope": "packages/core/src/backend/turn-scoped-cache-scope.ts",
    "scope-tests": "packages/core/src/backend/turn-scoped-cache-scope.test.ts",
    "service": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",
    "service-tests": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",
    "backend": "packages/backend-typescript/src/typescript-backend/typescript-backend.ts",
    "exports": "packages/core/src/index.ts",
    "spec": "plans/005/daemon-architecture-functional-spec.md",
}
EXPECTED = {
    "base": "a1e325a5ff979bdfa25babc5554621c8c0f20497",
    "head": "64919bcbcf7fcc8202779b78c5f069b24662bb18",
}
sources = {}
for revision, expected in EXPECTED.items():
    worktree = ROOT / f"worktrees/pr-127-{revision}"
    sha = subprocess.check_output(["git", "-C", str(worktree), "rev-parse", "HEAD"], text=True).strip()
    if sha != expected:
        raise RuntimeError(f"{revision} worktree is at {sha}, expected {expected}; refusing to relabel evidence")
    for name, path in PATHS.items():
        file = worktree / path
        if not file.exists():
            if revision == "base" and name in ("scope", "scope-tests"):
                continue
            raise FileNotFoundError(file)
        raw = file.read_bytes()
        committed = subprocess.check_output(["git", "-C", str(worktree), "show", f"{sha}:{path}"])
        if raw != committed:
            raise RuntimeError(f"Tracked source differs from the named commit: {file}")
        sources[f"{revision}:{name}"] = {
            "revision": revision, "sha": sha, "path": path,
            "sha256": hashlib.sha256(raw).hexdigest(), "lines": raw.decode().splitlines(),
        }
pr = json.loads((ROOT / "inputs/pr-127/pr.json").read_text())
sources["pr"] = {
    "revision": "PR body", "sha": "bundle", "path": "inputs/pr-127/pr.json → body",
    "lines": pr["body"].splitlines(),
}
sources["commits"] = {
    "revision": "commits", "sha": "bundle", "path": "inputs/pr-127/pr.json → commits",
    "lines": [f"{c['sha']} {c['subject']}" for c in pr["commits"]],
}
base = "\n".join(sources["base:service-tests"]["lines"])
head = "\n".join(sources["head:service-tests"]["lines"])
start = '  it("shares one reference search across caller and reference projections"'
unchanged = base[base.index(start):] == head[head.index(start):]
if not unchanged:
    raise RuntimeError("The original service tests no longer match the recorded inventory")
audit = {
    "existing_test_body_and_helpers_identical": unchanged,
    "base_service_tests": len(re.findall(r"\bit\(", base)),
    "head_service_tests": len(re.findall(r"\bit\(", head)),
    "new_core_tests": len(re.findall(r"\bit\(", "\n".join(sources["head:scope-tests"]["lines"]))),
    "scope": "Two changed test files in PR #127; source comparison, not suite execution.",
}
(OUTPUT / "evidence").mkdir(exist_ok=True)
(OUTPUT / "evidence.js").write_text("window.EVIDENCE = " + json.dumps({"sources": sources, "testAudit": audit}, ensure_ascii=False) + ";\n")
(OUTPUT / "evidence/source-manifest.json").write_text(json.dumps({key: {k: v for k, v in source.items() if k != "lines"} for key, source in sources.items()}, indent=2) + "\n")
(OUTPUT / "evidence/test-diff-audit.json").write_text(json.dumps(audit, indent=2) + "\n")
(OUTPUT / "evidence/pr.json").write_text(json.dumps(pr, indent=2) + "\n")
(OUTPUT / "evidence/diff.patch").write_bytes((ROOT / "inputs/pr-127/diff.patch").read_bytes())
print(f"Captured {len(sources)} source records; original service tests and helpers are unchanged.")
