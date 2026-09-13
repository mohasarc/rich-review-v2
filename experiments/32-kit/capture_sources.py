"""Capture the supplied PR and read-only worktrees into this experiment only."""

from pathlib import Path
import hashlib
import json
import subprocess


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
EXPECTED = {
    "head": "64919bcbcf7fcc8202779b78c5f069b24662bb18",
    "base": "a1e325a5ff979bdfa25babc5554621c8c0f20497",
}
FILES = {
    "scope": "packages/core/src/backend/turn-scoped-cache-scope.ts",
    "scope-test": "packages/core/src/backend/turn-scoped-cache-scope.test.ts",
    "core-index": "packages/core/src/index.ts",
    "service": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",
    "service-test": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",
    "backend": "packages/backend-typescript/src/typescript-backend/typescript-backend.ts",
    "backend-index": "packages/backend-typescript/src/index.ts",
    "spec": "plans/005/daemon-architecture-functional-spec.md",
}


def capture():
    sources = {}
    for revision, sha in EXPECTED.items():
        tree = ROOT / "worktrees" / f"pr-127-{revision}"
        actual = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=tree, text=True).strip()
        if actual != sha:
            raise ValueError(f"{tree}: expected {sha}, got {actual}")
        for key, path in FILES.items():
            source = tree / path
            if not source.exists():
                continue
            value = source.read_text()
            committed = subprocess.check_output(["git", "show", f"{sha}:{path}"], cwd=tree, text=True)
            if value != committed:
                raise ValueError(f"{source} differs from the captured commit; refusing to label it as {sha}")
            sources[f"{key}-{revision}"] = {
                "path": path, "revision": revision, "sha": sha, "text": value,
                "sha256": hashlib.sha256(value.encode()).hexdigest(),
            }
    bundle = ROOT / "inputs" / "pr-127"
    pr = json.loads((bundle / "pr.json").read_text())
    for key, value, path in (
        ("pr-body", pr["body"], "inputs/pr-127/pr.json · body"),
        ("commits", "\n\n".join(c["sha"] + "\n" + c["subject"] + "\n" + c["body"] for c in pr["commits"]), "inputs/pr-127/pr.json · commits"),
        ("diff", (bundle / "diff.patch").read_text(), "inputs/pr-127/diff.patch"),
    ):
        sources[key] = {"path": path, "revision": "bundle", "sha": EXPECTED["head"], "text": value, "sha256": hashlib.sha256(value.encode()).hexdigest()}
    result = {"repository": "mohasarc/symnav", "pr": 127, "revisions": EXPECTED, "sources": sources}
    (HERE / "sources" / "snapshot.json").write_text(json.dumps(result, indent=2) + "\n")
    print(f"Captured {len(sources)} source texts; worktrees only read.")


if __name__ == "__main__":
    capture()
