#!/usr/bin/env python3
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SYMNAV = Path.home() / "projects" / "symnav"
INPUTS = ROOT / "inputs"
LOG = ROOT / "orchestrator-log.md"

PRS = [123, 124, *range(126, 150)]
SUBJECTS = {
    "pr-127": (ROOT / "worktrees/pr-127-base", ROOT / "worktrees/pr-127-head", [127], "4 of 26"),
    "pr-131": (ROOT / "worktrees/pr-131-base", ROOT / "worktrees/pr-131-head", [131], "8 of 26"),
    "pr-148": (ROOT / "worktrees/pr-148-base", ROOT / "worktrees/pr-148-head", [148], "25 of 26"),
    "stack": (ROOT / "worktrees/main", ROOT / "worktrees/stack-head", PRS, "all 26"),
}

STACK_ROWS = [
    (123, "Move workspace source caching to core", "main"),
    (124, "Publish revisioned backend state transactionally", "#123"),
    (126, "Publish project membership transactionally", "#124"),
    (127, "Scope semantic caches to one turn", "#126"),
    (128, "Retain workspaces through core sessions", "#127"),
    (129, "Resolve state directories in CLI", "#128"),
    (130, "Establish daemon package and policy snapshot", "#129"),
    (131, "Route daemon thresholds through centralized policy", "#130"),
    (132, "Own one daemon command vocabulary", "#131"),
    (133, "Unify daemon execution failure vocabulary", "#132"),
    (134, "Make daemon admission rejection authoritative", "#133"),
    (135, "Execute daemon work through an injected host module", "#134"),
    (136, "Render daemon lifecycle reports in renderer", "#135"),
    (137, "Isolate daemon transport framing and validation", "#136"),
    (138, "Receive resumable daemon result transfers", "#137"),
    (139, "Route outbound daemon sockets through one client", "#138"),
    (140, "Route daemon lifecycle exchanges through one client", "#139"),
    (141, "Route inbound daemon sockets through one server", "#140"),
    (142, "Preserve accepted execution recovery in one client", "#141"),
    (143, "Compose local daemon transport from split owners", "#142"),
    (144, "Project daemon activity from explicit snapshots", "#143"),
    (145, "Manage daemon worker generations explicitly", "#144"),
    (146, "Own daemon completion delivery in one session", "#145"),
    (147, "Serialize accepted daemon execution in one session", "#146"),
    (148, "Own daemon mechanisms behind DaemonClient", "#147"),
    (149, "Enforce physical daemon package ownership", "#148"),
]


def log(message: str) -> None:
    with LOG.open("a") as stream:
        stream.write(f"- {message}\n")


def run(command: list[str], cwd: Path, allow_failure: bool = False) -> str:
    completed = subprocess.run(command, cwd=cwd, text=True, capture_output=True)
    if completed.returncode and not allow_failure:
        raise RuntimeError(f"{' '.join(command)} failed in {cwd}: {completed.stderr.strip()}")
    return completed.stdout


def pr_data(number: int) -> dict:
    raw = run([
        "gh", "pr", "view", str(number), "--repo", "mohasarc/symnav", "--json",
        "number,title,body,baseRefName,headRefName,commits",
    ], SYMNAV)
    data = json.loads(raw)
    data["base"] = data.pop("baseRefName")
    data["head"] = data.pop("headRefName")
    data["commits"] = [
        {
            "sha": commit.get("oid", ""),
            "subject": commit.get("messageHeadline", ""),
            "body": commit.get("messageBody", ""),
        }
        for commit in data["commits"]
    ]
    return data


def overview(worktree: Path, relative_path: str) -> tuple[str, str]:
    file_path = worktree / relative_path
    if not file_path.is_file():
        return relative_path, "[file absent in this revision]\n"
    command = ["node", "apps/cli/dist/index.js", "overview", relative_path]
    completed = subprocess.run(command, cwd=worktree, text=True, capture_output=True, timeout=300)
    output = completed.stdout
    if completed.returncode:
        output += f"\n[overview failed: {completed.stderr.strip()}]\n"
    return relative_path, output


def overview_all(worktree: Path, paths: list[str]) -> str:
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda path: overview(worktree, path), paths))
    return "\n".join(f"===== {path} =====\n{output.rstrip()}\n" for path, output in results)


def repo_rules(head: Path) -> str:
    candidates = [head / "CLAUDE.md"]
    candidates.extend(sorted((head / "plans/000").glob("*.md")))
    daemon_spec = head / "plans/005/daemon-architecture-functional-spec.md"
    if daemon_spec.exists():
        candidates.append(daemon_spec)
    return "\n\n".join(
        f"# {path.relative_to(head)}\n\n{path.read_text()}" for path in candidates if path.is_file()
    )


def stack_description(key: str, position: str) -> str:
    lines = [
        "# Daemon architecture refactor stack",
        "",
        f"Bundle `{key}` position: {position}.",
        "",
        "| PR | Title | Based on |",
        "| --- | --- | --- |",
    ]
    lines.extend(f"| #{number} | {title} | {base} |" for number, title, base in STACK_ROWS)
    return "\n".join(lines) + "\n"


def build_subject(key: str, base: Path, head: Path, numbers: list[int], position: str) -> None:
    destination = INPUTS / key
    destination.mkdir(parents=True, exist_ok=True)
    base_sha = run(["git", "rev-parse", "HEAD"], base).strip()
    head_sha = run(["git", "rev-parse", "HEAD"], head).strip()
    revision_range = f"{base_sha}...{head_sha}"
    metadata = [pr_data(number) for number in numbers]
    pr_json = metadata[0] if len(metadata) == 1 else {
        "subject": "main to tip of #149",
        "base": base_sha,
        "head": head_sha,
        "pullRequests": metadata,
    }
    (destination / "pr.json").write_text(json.dumps(pr_json, indent=2) + "\n")
    (destination / "diff.patch").write_text(run(["git", "diff", "--no-ext-diff", revision_range], head))
    (destination / "files.txt").write_text(run(["git", "diff", "--stat", revision_range], head))
    changed = run(["git", "diff", "--name-only", "--diff-filter=ACDMRT", revision_range], head).splitlines()
    typescript_paths = sorted(path for path in changed if path.endswith((".ts", ".tsx")))
    (destination / "overview-before.txt").write_text(overview_all(base, typescript_paths))
    (destination / "overview-after.txt").write_text(overview_all(head, typescript_paths))
    (destination / "stack.md").write_text(stack_description(key, position))
    (destination / "repo-rules.md").write_text(repo_rules(head))
    log(f"INPUT OK {key}: {len(typescript_paths)} changed TypeScript files, {base_sha[:8]}...{head_sha[:8]}")


def main() -> None:
    INPUTS.mkdir(exist_ok=True)
    for key, arguments in SUBJECTS.items():
        try:
            build_subject(key, *arguments)
        except Exception as error:
            log(f"INPUT FAILED {key}: {error}")


if __name__ == "__main__":
    main()
