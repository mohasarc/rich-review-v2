import json
import subprocess
from collections import defaultdict
from pathlib import Path

HEAD = Path.home() / "projects/rich-review-v2/worktrees/pr-148-head"
BASE_REF = "origin/agent/daemon-architecture-refactor-part-24"
OUT = Path(__file__).parent


def git(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=HEAD, capture_output=True, text=True, check=True).stdout


def area(path: str) -> str:
    if path.startswith("packages/daemon/src/"):
        rest = path.removeprefix("packages/daemon/src/")
        folder = rest.split("/")[0] if "/" in rest else "(root)"
        kind = "test" if rest.endswith(".test.ts") else "src"
        return f"package {kind}: {folder}"
    if path.startswith("packages/daemon/test/"):
        return "package test: fixtures/helpers/integration"
    if path.startswith("apps/cli/src/daemon/"):
        return "cli test: daemon" if path.endswith(".test.ts") else "cli src: daemon"
    if path.startswith("apps/cli/test/"):
        return "cli test: e2e/helpers"
    if path.startswith("apps/cli/"):
        return "cli test: other" if ".test." in path else "cli src: other"
    if path.startswith("meta-tests/"):
        return "meta-tests"
    if path.startswith("plans/"):
        return "plans"
    return "config"


def main() -> None:
    shas = git("log", "--reverse", "--format=%H", f"{BASE_REF}..HEAD").split()
    rows = []
    for sha in shas:
        subject = git("log", "-1", "--format=%s", sha).strip()
        date = git("log", "-1", "--format=%ad", "--date=iso-strict", sha).strip()
        areas = defaultdict(lambda: {"files": 0, "added": 0, "removed": 0})
        files = []
        for line in git("show", "--numstat", "--format=", "-M", sha).splitlines():
            if not line.strip():
                continue
            added, removed, path = line.split("\t", 2)
            if " => " in path:
                path = path.split(" => ")[-1].replace("}", "").replace("{", "")
            added_n = int(added) if added != "-" else 0
            removed_n = int(removed) if removed != "-" else 0
            bucket = areas[area(path)]
            bucket["files"] += 1
            bucket["added"] += added_n
            bucket["removed"] += removed_n
            files.append({"path": path, "added": added_n, "removed": removed_n})
        rows.append(
            {
                "sha": sha[:9],
                "subject": subject,
                "date": date,
                "specify": subject.startswith(("Specify", "Characterize")),
                "areas": areas,
                "files": files,
            }
        )
    (OUT / "commits.json").write_text(json.dumps(rows, indent=2))
    for r in rows:
        total_a = sum(a["added"] for a in r["areas"].values())
        total_r = sum(a["removed"] for a in r["areas"].values())
        top = ", ".join(f"{k} {v['files']}" for k, v in sorted(r["areas"].items(), key=lambda kv: -kv[1]["added"] - kv[1]["removed"])[:3])
        print(f"{r['sha']} {r['date'][5:16]} +{total_a:<6} -{total_r:<6} {r['subject'][:52]:<52} | {top}")


if __name__ == "__main__":
    main()
