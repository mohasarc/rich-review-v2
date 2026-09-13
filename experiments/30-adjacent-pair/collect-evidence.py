"""Copy pinned git objects; never check out or modify a symnav worktree."""
from pathlib import Path
import hashlib
import json
import subprocess

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1] / "worktrees" / "stack-head"
COMMITS = {
    "before": "b8e8b7b85fe0e5fd0cb5784895ee090be015afa1",
    "146": "f79ba36278c77c41ca887aa4efc24fd0781e4cec",
    "147": "ba53c8e1662fd86d198b95321c90d9c9bef10184",
}
FILES = {
    "before": ["workspace-daemon.ts", "accepted-request-ledger.ts"],
    "146": ["workspace-daemon.ts", "daemon-delivery-session.ts", "daemon-delivery-session.test.ts", "workspace-daemon-requests.test.ts"],
    "147": ["accepted-execution-session.ts", "accepted-execution-session-contracts.ts", "accepted-execution-session.test.ts", "accepted-request-ledger.ts", "accepted-request-ledger.test.ts", "daemon-delivery-session.test.ts", "workspace-daemon.ts", "workspace-daemon-requests.test.ts", "workspace-request-queue.ts"],
}

def git(*args):
    return subprocess.check_output(["git", "-C", str(REPO), *args]).decode()

sources = {}

def add(key, text, path, revision, sha):
    dest = HERE / "evidence" / revision / (Path(path).name + ".txt")
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text)
    sources[key] = dict(text=text, path=path, revision=revision, sha=sha,
                        raw=str(dest.relative_to(HERE)), sha256=hashlib.sha256(text.encode()).hexdigest())

for revision, names in FILES.items():
    sha = COMMITS[revision]
    for name in names:
        path = "apps/cli/src/daemon/" + name
        add(revision + "/" + name, git("show", sha + ":" + path), path, revision, sha)

for number, base, head in [("146", "before", "146"), ("147", "146", "147")]:
    add(number + "/diff.patch", git("diff", COMMITS[base], COMMITS[head]),
        "diff.patch", number, COMMITS[head])

bundle = json.loads((HERE.parents[1] / "inputs/stack/pr.json").read_text())
for pr in bundle["pullRequests"]:
    if pr["number"] in [146, 147]:
        number = str(pr["number"])
        add(number + "/pr.md", pr["body"], "PR #" + number + " — " + pr["title"], number, COMMITS[number])
        add(number + "/commits.txt", "\n\n".join(c["sha"] + "\n" + c["subject"] + "\n" + c["body"] for c in pr["commits"]), "commits.txt", number, COMMITS[number])

path = "plans/005/daemon-architecture-functional-spec.md"
add("147/spec.md", git("show", COMMITS["147"] + ":" + path), path, "147", COMMITS["147"])
(HERE / "sources.js").write_text("window.SOURCES = " + json.dumps(sources, ensure_ascii=False) + ";\n")
(HERE / "evidence/manifest.json").write_text(json.dumps({k: {n: v for n, v in s.items() if n != "text"} for k, s in sources.items()}, indent=2) + "\n")
print(f"Captured {len(sources)} source records from three pinned commits.")
