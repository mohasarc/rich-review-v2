#!/usr/bin/env python3
"""Collect symnav refs and count direct, distinct file reach. No graph inference."""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import subprocess
import time

HERE = Path(__file__).resolve().parent


def file_kind(path: str) -> str:
    parts = Path(path).parts
    if "dist" in parts or "node_modules" in parts or path.endswith(".d.ts"):
        return "generated"
    if ("test" in parts or "tests" in parts or "fixtures" in parts
            or "meta-tests" in parts or ".test." in path or ".spec." in path):
        return "test"
    return "production"


def box(path: str) -> str:
    if file_kind(path) == "test":
        return "Tests & adapters"
    if path.startswith("packages/"):
        return "/".join(path.split("/")[:2])
    if path.startswith("apps/cli/src/daemon/"):
        return "CLI daemon mechanisms"
    if path.startswith("apps/cli/"):
        return "CLI composition & execution"
    return "Other source"


def command(args: list[str], cwd: Path) -> str:
    return subprocess.run(args, cwd=cwd, check=True, capture_output=True, text=True).stdout.strip()


def reference_key(ref: dict) -> tuple:
    return (ref["file"], ref["line"], ref.get("matchStart"), ref.get("matchEnd"), ref["kind"])


def validate_response(raw: dict, target: str) -> None:
    actual = raw.get("identity", {})
    identity = actual.get("file", "") + "::" + "::".join(
        segment["name"] + ("#" + str(segment["disambiguator"]) if "disambiguator" in segment else "")
        for segment in actual.get("segments", [])
    )
    if identity != target:
        raise ValueError(f"Resolved {identity!r}, expected exact seed {target!r}")
    if not isinstance(raw.get("references"), list) or raw.get("total") != len(raw["references"]):
        raise ValueError("Missing or paginated refs; refusing to rank an incomplete response")
    if raw.get("page", 1) != 1 or raw.get("pageCount", 1) > 1:
        raise ValueError("--all did not return all references")


def collect(worktree: Path, side: str, sha: str, target: str, data: Path,
            state: Path, refresh: bool, timeout: int) -> dict:
    digest = hashlib.sha256((sha + "\n" + target).encode()).hexdigest()[:16]
    cache = data / "refs" / f"{side}-{digest}.json"
    if cache.exists() and not refresh:
        record = json.loads(cache.read_text())
        if record["sha"] != sha or record["target"] != target or record["side"] != side:
            raise ValueError(f"Cache provenance mismatch: {cache}")
        validate_response(record["response"], target)
        return record
    argv = ["node", str(worktree / "apps/cli/dist/cli.js"), "--cwd", str(worktree),
            "refs", target, "--all", "--full-lines", "--json"]
    env = {**os.environ, "SYMNAV_DAEMON": "0", "SYMNAV_TELEMETRY": "0",
           "SYMNAV_STATE_DIR": str(state / side)}
    started = time.monotonic()
    result = subprocess.run(argv, cwd=worktree, env=env, capture_output=True, text=True,
                            timeout=timeout)
    try:
        if result.returncode:
            raise ValueError(f"CLI exit {result.returncode}")
        response = json.loads(result.stdout)
        validate_response(response, target)
    except (ValueError, KeyError) as error:
        failure = {"side": side, "sha": sha, "target": target, "command": argv,
                   "stdout": result.stdout, "stderr": result.stderr, "error": str(error)}
        (data / "refs" / f"{side}-{digest}.error.json").write_text(json.dumps(failure, indent=2))
        raise ValueError(f"{side} {target}: {error}") from error
    record = {"side": side, "sha": sha, "target": target,
              "command": argv, "environment": {key: env[key] for key in
                ("SYMNAV_DAEMON", "SYMNAV_TELEMETRY", "SYMNAV_STATE_DIR")},
              "seconds": round(time.monotonic() - started, 3), "stderr": result.stderr,
              "response": response, "rawFile": str(cache.relative_to(HERE))}
    cache.write_text(json.dumps(record, indent=2) + "\n")
    return record


def measure(records: list[dict], include_types: bool) -> dict:
    """Count external file unions; never sum reference counts across seeds."""
    seed_files = {record["target"].split("::")[0] for record in records}
    seen = {}
    for record in records:
        for ref in record["response"]["references"]:
            if not include_types and ref["kind"] != "usage":
                continue
            item = seen.setdefault(reference_key(ref), {**ref, "via": []})
            if record["target"] not in item["via"]:
                item["via"].append(record["target"])
    files = {}
    internal = set()
    generated = set()
    for ref in seen.values():
        path = ref["file"]
        if path in seed_files:
            internal.add(path)
            continue
        if file_kind(path) == "generated":
            generated.add(path)
            continue
        entry = files.setdefault(path, {"file": path, "kind": file_kind(path),
                                       "box": box(path), "refs": []})
        entry["refs"].append(ref)
    ordered = [files[name] for name in sorted(files)]
    return {"production": [f["file"] for f in ordered if f["kind"] == "production"],
            "test": [f["file"] for f in ordered if f["kind"] == "test"],
            "files": ordered, "internalFilesExcluded": sorted(internal),
            "generatedFilesExcluded": sorted(generated), "seedFiles": sorted(seed_files)}


def diff_inventory(patch: str) -> list[dict]:
    inventory = []
    for block in patch.split("diff --git ")[1:]:
        path = block.splitlines()[0].split(" b/", 1)[1]
        lines = block.splitlines()
        inventory.append({"file": path, "kind": file_kind(path), "box": box(path),
                          "added": sum(line.startswith("+") and not line.startswith("+++") for line in lines),
                          "removed": sum(line.startswith("-") and not line.startswith("---") for line in lines),
                          "patch": "diff --git " + block})
    return inventory


def evidence_excerpt(worktrees: dict, spec: dict) -> dict:
    side = spec.get("side", "head")
    source = (worktrees[side] / spec["file"]).read_text().splitlines()
    matches = [i for i, line in enumerate(source) if spec["needle"] in line]
    if not matches:
        raise ValueError(f"Evidence needle missing: {spec}")
    index = matches[spec.get("occurrence", 0)]
    start = max(0, index - spec.get("before", 2))
    end = min(len(source), index + spec.get("after", 12) + 1)
    return {**spec, "side": side, "start": start + 1, "end": end,
            "lines": source[start:end]}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", type=Path, default=HERE / "decisions.json")
    parser.add_argument("--base", type=Path, default=HERE.parents[1] / "worktrees/pr-131-base")
    parser.add_argument("--head", type=Path, default=HERE.parents[1] / "worktrees/pr-131-head")
    parser.add_argument("--bundle", type=Path, default=HERE.parents[1] / "inputs/pr-131")
    parser.add_argument("--jobs", type=int, default=2)
    parser.add_argument("--timeout", type=int, default=180)
    parser.add_argument("--refresh", action="store_true")
    args = parser.parse_args()
    worktrees = {"base": args.base.resolve(), "head": args.head.resolve()}
    manifest = json.loads(args.manifest.read_text())
    data = HERE / "data"
    (data / "refs").mkdir(parents=True, exist_ok=True)
    (data / "intent").mkdir(parents=True, exist_ok=True)
    intent_sources = [
        (args.bundle / "pr.json", "pr.json"),
        (worktrees["head"] / "plans/005/daemon-policy.md", "daemon-policy.md"),
        (worktrees["head"] / "plans/005/daemon-architecture-functional-spec.md", "daemon-architecture-functional-spec.md"),
    ]
    for source, name in intent_sources:
        (data / "intent" / name).write_text(source.read_text())
    revisions = {side: command(["git", "rev-parse", "HEAD"], path) for side, path in worktrees.items()}
    statuses = {side: command(["git", "status", "--porcelain", "--untracked-files=no"], path)
                for side, path in worktrees.items()}
    if any(statuses.values()):
        raise ValueError("Tracked worktree changes would invalidate revision-based caching")
    bundle_patch = (args.bundle / "diff.patch").read_text()
    real_patch = subprocess.run(["git", "diff", revisions["base"], revisions["head"]],
                                cwd=worktrees["head"], capture_output=True, text=True, check=True).stdout
    if real_patch != bundle_patch:
        raise ValueError("Worktree revisions do not reproduce the supplied diff")
    inventory = diff_inventory(bundle_patch)
    for item in inventory:
        item["decisions"] = [d["id"] for d in manifest["decisions"] if item["file"] in d["changedFiles"]]
        if not item["decisions"]:
            raise ValueError(f"Changed file has no decision: {item['file']}")
    for decision in manifest["decisions"]:
        unknown = set(decision["changedFiles"]) - {f["file"] for f in inventory}
        if unknown:
            raise ValueError(f"Manifest contains unchanged files as changed: {unknown}")
    tasks = sorted({(side, target) for decision in manifest["decisions"]
                    for side in worktrees for target in decision["seeds"].get(side, [])})
    results = {}
    with ThreadPoolExecutor(max_workers=args.jobs) as pool:
        futures = {pool.submit(collect, worktrees[side], side, revisions[side], target,
                               data, HERE / ".state", args.refresh, args.timeout): (side, target)
                   for side, target in tasks}
        for i, future in enumerate(as_completed(futures), 1):
            side, target = futures[future]
            results[(side, target)] = future.result()
            print(f"[{i}/{len(tasks)}] {side}: {target}", flush=True)
    for decision in manifest["decisions"]:
        decision["evidence"] = [evidence_excerpt(worktrees, spec) for spec in decision["evidence"]]
        decision["metrics"] = {}
        decision["queries"] = {}
        for side in worktrees:
            records = [results[(side, target)] for target in decision["seeds"].get(side, [])]
            decision["queries"][side] = [{key: r[key] for key in ("target", "rawFile", "seconds")}
                                           | {"total": r["response"]["total"]} for r in records]
            decision["metrics"][side] = {"all": measure(records, True), "usage": measure(records, False)}
    output = {**manifest, "generatedAt": datetime.now(timezone.utc).isoformat(),
              "revisions": revisions, "queryCount": len(tasks), "files": inventory,
              "diffSha256": hashlib.sha256(bundle_patch.encode()).hexdigest(),
              "manifestSha256": hashlib.sha256(args.manifest.read_bytes()).hexdigest(),
              "diagnostics": sorted({d["message"] for r in results.values()
                                     for d in r["response"].get("diagnostics", [])}),
              "measurement": "Distinct external production files in direct symnav refs; union across seeds. Includes import/export/type/usage unless usage filter selected. No transitive traversal. Declaration files and generated files excluded. Test reach kept separate. Base/head union is the default ranking; ties break by decision ID."}
    encoded = json.dumps(output, indent=2, ensure_ascii=False)
    (data / "report.json").write_text(encoded + "\n")
    (data / "report.js").write_text("window.BLAST_RADIUS = " + encoded.replace("</", "<\\/") + ";\n")
    print(f"Wrote data/report.json and data/report.js: {len(manifest['decisions'])} decisions, {len(inventory)} changed files")


if __name__ == "__main__":
    main()
