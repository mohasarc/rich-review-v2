"""Copy pinned, read-only source receipts into this experiment. No builds or tests."""
import hashlib
import json
import subprocess
from pathlib import Path

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
REPO = ROOT / "worktrees/stack-head"
RECEIPTS = OUT / "source"


def git(*args):
    return subprocess.check_output(["git", *args], cwd=REPO, text=True)


manifest = []


def save(name, body, origin):
    (RECEIPTS / name).write_text(body)
    manifest.append({"file": name, "origin": origin, "sha256": hashlib.sha256(body.encode()).hexdigest()})


def snapshot(name, revision, path, start=1, end=None):
    sha = git("rev-parse", revision).strip()
    whole = git("show", f"{sha}:{path}")
    lines = whole.splitlines()
    end = end or len(lines)
    body = f"Git object: {sha}:{path}\nOriginal lines: {start}–{end}\n\n"
    body += "\n".join(f"{i}: {line}" for i, line in enumerate(lines, 1) if start <= i <= end) + "\n"
    save(name, body, {"revision": sha, "path": path, "start": start, "end": end})


def patch(name, subject, start, end):
    path = ROOT / "inputs" / subject / "diff.patch"
    whole = path.read_text()
    body = f"Bundle: inputs/{subject}/diff.patch\nOriginal patch lines: {start}–{end}\n\n"
    body += "\n".join(f"{i}: {line}" for i, line in enumerate(whole.splitlines(), 1) if start <= i <= end) + "\n"
    save(name, body, {"bundle": subject, "start": start, "end": end, "bundle_sha256": hashlib.sha256(whole.encode()).hexdigest()})


patch("c1-cache-change.txt", "pr-127", 1, 609)
snapshot("p1-worker-base.txt", "b3a6c4fa", "apps/cli/src/daemon/daemon-navigation-worker.ts", 70, 105)
snapshot("p1-worker-head.txt", "b100221d", "apps/cli/src/daemon/daemon-navigation-worker.ts", 70, 110)
patch("p2-recovery-change.txt", "pr-131", 2680, 2788)
snapshot("p2-failed-fetch-head.txt", "b100221d", "apps/cli/src/daemon/local-daemon-transport.ts", 445, 505)
patch("p3-transport-helper.txt", "pr-131", 3552, 3621)
patch("p3-workspace-helper.txt", "pr-131", 3680, 3784)
patch("p3-resource-report.txt", "pr-131", 3396, 3435)
patch("p4-deleted-memory-cases.txt", "pr-131", 1321, 1405)
snapshot("p4-retained-memory-cases.txt", "b100221d", "packages/daemon/src/daemon-policy.test.ts", 67, 118)
patch("d1-host-inputs.txt", "pr-148", 2343, 2384)
snapshot("d1-runtime-policy.txt", "20838f8", "packages/daemon/src/client/daemon-client-runtime.ts", 74, 100)
patch("d1-shared-runtime-promise.txt", "pr-148", 3282, 3351)
patch("d2-standalone-clock.txt", "pr-148", 1792, 1824)
patch("d2-composed-clock.txt", "pr-148", 647, 686)
snapshot("d3-auth-partition.txt", "20838f8", "packages/daemon/src/process/process-coordinator.ts", 350, 433)
patch("d4-ownership-change.txt", "pr-148", 1379, 1507)
patch("d4-coordinate-validation.txt", "pr-148", 936, 966)
snapshot("d4-constructor-order.txt", "20838f8", "packages/daemon/src/process/process-coordinator.ts", 85, 115)
snapshot("d5-policy-plan-base.txt", "ba53c8e", "plans/005/daemon-policy.md", 62, 66)
snapshot("d5-policy-plan-head.txt", "20838f8", "plans/005/daemon-policy.md", 62, 66)
patch("d6-worker-test-change.txt", "pr-148", 15686, 15784)
patch("d6-entry-tests-deleted.txt", "pr-148", 299, 426)
patch("d6-runner.txt", "pr-148", 18353, 18365)
snapshot("s1-core-publication.txt", "d070023", "packages/core/src/backend/revisioned-backend-state.ts", 64, 88)
snapshot("s1-source-selection.txt", "d070023", "packages/core/src/workspace/workspace-source-cache.ts", 1, 43)
snapshot("s1-workspace-session.txt", "d070023", "packages/core/src/workspace/workspace-session.ts")
snapshot("s2-execution-recovery.txt", "d070023", "packages/daemon/src/transport/execution-client.ts", 38, 157)
snapshot("s2-result-receiver.txt", "d070023", "packages/daemon/src/transport/result-transfer-receiver.ts")
snapshot("s3-admission.txt", "d070023", "packages/daemon/src/daemon-admission.ts")
snapshot("s3-terminal-failures.txt", "d070023", "packages/daemon/src/daemon-execution-failure.ts")
snapshot("s4-accepted-session-147.txt", "ba53c8e", "apps/cli/src/daemon/accepted-execution-session.ts")
snapshot("s4-delivery-session-146.txt", "f79ba362", "apps/cli/src/daemon/daemon-delivery-session.ts")
patch("s5-status-stop-deletions.txt", "stack", 8287, 9318)
patch("s5-cold-start-deletion.txt", "stack", 1803, 1868)
patch("s5-pr-template.txt", "stack", 1, 138)
patch("s5-protocol.txt", "stack", 36086, 36208)

# These adjacent diffs were inspected for the page whose subject is #146 + #147.
pr_data = json.loads((ROOT / "inputs/stack/pr.json").read_text())["pullRequests"]
heads = {p["number"]: p["commits"][-1]["sha"] for p in pr_data}
for n, prev in [(146, 145), (147, 146)]:
    body = git("diff", "--find-renames", heads[prev], heads[n])
    save(f"pr-{n}.patch", body, {"base": heads[prev], "head": heads[n]})

(RECEIPTS / "receipt-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Saved {len(manifest)} pinned receipts in {RECEIPTS}")
