"""Save pinned context for claims whose surrounding lines are outside a diff hunk."""
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(__file__).resolve().parent
REPO = OUT.parents[1] / "worktrees" / "stack-head"
PINS = json.loads((OUT / "source-check/manifest.json").read_text())["subjects"]
CONTEXT = [
    ("131-worker.ts", "pr-131", "head", "apps/cli/src/daemon/daemon-navigation-worker.ts"),
    ("131-policy.ts", "pr-131", "head", "packages/daemon/src/daemon-policy.ts"),
    ("131-transport.ts", "pr-131", "head", "apps/cli/src/daemon/local-daemon-transport.ts"),
    ("131-benchmark.ts", "pr-131", "head", "apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts"),
    ("148-policy-plan.md", "pr-148", "head", "plans/005/daemon-policy.md"),
    ("148-dispatcher.ts", "pr-148", "head", "apps/cli/src/daemon/daemon-command-dispatcher.ts"),
    ("148-client-runtime.ts", "pr-148", "head", "packages/daemon/src/client/daemon-client-runtime.ts"),
    ("148-client.ts", "pr-148", "head", "packages/daemon/src/client/daemon-client.ts"),
    ("148-coordinator.ts", "pr-148", "head", "packages/daemon/src/process/process-coordinator.ts"),
    ("148-registry.ts", "pr-148", "head", "packages/daemon/src/registry/registry.ts"),
    ("148-base-queue.ts", "pr-148", "base", "apps/cli/src/daemon/workspace-request-queue.ts"),
    ("148-head-queue.ts", "pr-148", "head", "packages/daemon/src/execution/request-queue.ts"),
    ("stack-project-graph.ts", "stack", "head", "packages/core/src/workspace/project-graph.ts"),
    ("stack-inspector.ts", "stack", "head", "packages/daemon/src/testing/daemon-testing-inspector.ts"),
]
dest = OUT / "source-check/context"
dest.mkdir(exist_ok=True)
records = []
for name, subject, side, path in CONTEXT:
    commit = PINS[subject][side]
    data = subprocess.check_output(["git", "show", f"{commit}:{path}"], cwd=REPO)
    (dest / name).write_bytes(data)
    records.append({"file": name, "subject": subject, "side": side, "commit": commit,
                    "path": path, "sha256": hashlib.sha256(data).hexdigest()})
(dest / "manifest.json").write_text(json.dumps({
    "captured_at": datetime.now(timezone.utc).isoformat(), "files": records
}, indent=2) + "\n")
print(f"Saved {len(records)} pinned context files.")
