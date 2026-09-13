"""Reproduce the three observations used by the page, without editing worktrees.

Requires the supplied worktrees with installed dependencies and build artifacts.
Existing exploratory scripts are run against private temporary source copies.
"""
from pathlib import Path
import datetime
import hashlib
import json
import os
import shutil
import subprocess
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = HERE.parent / "evidence" / "verified"
OUT.mkdir(parents=True, exist_ok=True)
KEYS = ["pr-131-base", "pr-131-head", "pr-148-base", "pr-148-head"]


def git(tree, *args):
    return subprocess.check_output(["git", "-C", str(tree), *args], text=True).strip()


def snapshot(tree, destination):
    paths = git(tree, "ls-files").splitlines()
    digest = hashlib.sha256()
    for name in paths:
        source = tree / name
        if not source.is_file():
            continue
        target = destination / name
        target.parent.mkdir(parents=True, exist_ok=True)
        data = source.read_bytes()
        target.write_bytes(data)
        digest.update(name.encode() + b"\0" + data + b"\0")
    # Resolve dependencies and built package imports from the supplied builds.
    for package in [tree, *list((tree / "apps").iterdir()), *list((tree / "packages").iterdir()), tree / "meta-tests"]:
        for name in ["node_modules", "dist"]:
            source = package / name
            target = destination / source.relative_to(tree)
            if source.exists() and not target.exists():
                target.parent.mkdir(parents=True, exist_ok=True)
                target.symlink_to(source, target_is_directory=True)
    return {"sha": git(tree, "rev-parse", "HEAD"), "trackedContentSha256": digest.hexdigest(), "statusBefore": git(tree, "status", "--short")}


manifest = {"time": datetime.datetime.now(datetime.timezone.utc).isoformat(), "inputs": {}, "runs": []}
with tempfile.TemporaryDirectory(prefix="rr08-recheck-") as scratch:
    scratch = Path(scratch)
    for key in KEYS:
        manifest["inputs"][key] = snapshot(ROOT / "worktrees" / key, scratch / key)
    env = {**os.environ, "SCRATCH": str(scratch), "OUT": str(OUT)}
    for script in ["spill-coverage.sh", "reattach-probe.sh", "registry-identity-probe.sh"]:
        result = subprocess.run(["bash", str(HERE / script)], env=env, capture_output=True, text=True)
        (OUT / (script + ".log")).write_text(result.stdout + result.stderr)
        manifest["runs"].append({"script": script, "exitCode": result.returncode})
        print(script, result.returncode, flush=True)
    result = subprocess.run(["python3", str(HERE / "spill-compare.py"), str(OUT / "spill-131-base.log"), str(OUT / "spill-131-head.log"), str(OUT / "spill-131.json")], capture_output=True, text=True)
    (OUT / "spill-comparison.txt").write_text(result.stdout + result.stderr)
    result = subprocess.run(["python3", str(HERE / "moved-test-inventory.py"), str(ROOT / "worktrees/pr-148-head"), str(ROOT / "worktrees/pr-148-base"), str(OUT / "moved-tests-148.json")], capture_output=True, text=True)
    (OUT / "moved-test-inventory.txt").write_text(result.stdout + result.stderr)
    for key in KEYS:
        manifest["inputs"][key]["statusAfter"] = git(ROOT / "worktrees" / key, "status", "--short")
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    # Probe tests record observations; a passing probe is not a parity verdict.
    for name in ["reattach-131-base.jsonl", "reattach-131-head.jsonl", "registry-probe-148-base.jsonl", "registry-probe-148-head.jsonl"]:
        print(name, (OUT / name).read_text(), flush=True)
