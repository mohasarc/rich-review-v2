"""Rebuild the offline evidence bundle. Reads symnav git objects; writes only here."""
from pathlib import Path
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
REPO = ROOT / "worktrees/stack-head"
BUNDLE = json.loads((ROOT / "inputs/stack/pr.json").read_text())


def git(*args):
    return subprocess.check_output(["git", "-C", str(REPO), *args], text=True)


def source(sha, path, line=1):
    raw = git("show", f"{sha}:{path}")
    lines = raw.splitlines()
    start = max(1, min(line - 8, len(lines) - 30))
    end = min(len(lines), start + 42)
    return {"path": path, "line": line, "start": start,
            "code": "\n".join(lines[start - 1:end]), "sha": sha}


def extra(title, reason, status="unexplained", paths=(), kind="record gap"):
    return {"choice": title, "reason": reason, "status": status,
            "paths": list(paths), "kind": kind}


EXTRAS = {
    123: [extra("Rewrite the repository PR template alongside source caching",
                "The commit says ‘Update pull request template’. No reason for bundling template rules with cache ownership appears in the supplied PR, commit body, or architecture spec.",
                paths=[".github/PULL_REQUEST_TEMPLATE.md"], kind="outside the stated architecture scope")],
    126: [extra("Keep FIFO configuration discovery, first-owner membership, an inferred fallback, and sequential project release",
                "The architecture spec asks to preserve existing behavior; commits explicitly characterize these ordering and fallback choices.", "stated",
                ["packages/core/src/workspace/project-graph.ts"], "preserved ordering")],
    129: [extra("Wait for three fixture markers and poll matching startup ownership",
                "Commits name fixture synchronization and transient owner reads. The test injects an undefined owner read and then waits for the original daemon identity and a later heartbeat.", "stated",
                ["apps/cli/test/e2e/daemon/parity.test.ts", "apps/cli/test/e2e/daemon/status.test.ts"], "test synchronization"),
          extra("Increase the caller-exit status test budget from 15 s to 30 s; readiness wait from 5 s to 15 s",
                "The surrounding commit is called ‘Stabilize daemon startup ownership oracle’; no reason for these particular larger budgets is recorded.",
                paths=["apps/cli/test/e2e/daemon/status.test.ts"], kind="weaker timing constraint")],
    130: [extra("Centralize threshold values, memory recipes, and five intentional missing deadlines",
                "The policy record gives a value, scope, and reason for every listed limit. Healthy startup, startup silence, accepted completion, output acknowledgement, and unacknowledged results have no deadline; silence and result eviction remain deferred.", "stated",
                ["plans/005/daemon-policy.md"], "policy choices")],
    135: [extra("Set two retained-executor test budgets to 15 s",
                "The commit says ‘Budget retained executor integration tests’. No rationale for 15 s is recorded; assertions remain in the diff.",
                paths=["apps/cli/src/daemon-executor.test.ts"], kind="weaker timing constraint")],
    138: [extra("Increase the twelve-MiB transfer test budget from 20 s to 60 s",
                "The commit says ‘Budget twelve MiB transport test’. No rationale for tripling the time budget is recorded; the byte and completion assertions remain.",
                paths=["apps/cli/src/daemon/local-daemon-transport-execution.test.ts"], kind="weaker timing constraint")],
    148: [extra("Give lifetime its clock and centralize startup ownership checks",
                "The architecture spec explicitly assigns clocks to daemon and demands one lock-ownership authority. The commit series performs both before staging the mechanisms.", "stated",
                ["packages/daemon/src/lifecycle/daemon-lifetime.ts", "packages/daemon/src/registry/registry.ts"], "authority"),
          extra("Move mechanism tests to the package while the active CLI still uses frozen copies",
                "The PR deliberately separates package ownership from consumer cutover. This also relocates the direct unit-test target before the production CLI switches; the compatibility graph gets a hash gate.", "stated",
                ["meta-tests/src/daemon-compatibility-copy.test.ts"], "test ownership"),
          extra("Keep idle timing based on construction and navigation acceptance",
                "Readiness-armed and completion-based idle accounting are explicitly recorded as later behavior changes, alongside selection-aware source retention.", "stated",
                ["plans/005/daemon-follow-ups-functional-spec.md"], "deferred behavior")],
    149: [extra("Remove seven CLI status scenarios and three CLI stop scenarios",
                "Package ownership explains migration in general. Three status scenarios have related new package-client integrations; the removed CLI chains are not identical tests. No specific reason is recorded for dropping each remaining end-to-end oracle. The correspondence table records the limits of this inspection.",
                paths=["apps/cli/test/e2e/daemon/status.test.ts", "apps/cli/test/e2e/daemon/stop.test.ts"], kind="deleted tests"),
          extra("Replace direct pressure-test endpoint, token, and registry assertions with inspector and public-status observations",
                "The PR states that external assertions must observe through a read-only inspector. The old endpoint-exists and processToken checks disappear at that boundary; the new assertions observe identity, queue state, and instance cleanup.", "stated",
                ["apps/cli/test/e2e/daemon/persistent-pressure.test.ts"], "changed assertions"),
          extra("Normalize invalid inspector paths and classify every artifact-read failure",
                "Commits and tests specify the new testing API's failure cases, but no rationale for the exact failure grouping is recorded in their commit bodies or the PR decisions.",
                paths=["packages/daemon/src/testing/daemon-testing-inspector.ts"], kind="testing API behavior"),
          extra("Remove public policy serialization and the temporary policy-testing export",
                "The final surface restricts external tests to read-only inspection and keeps policy codecs and override factories package-local, as the final package ownership contract requires.", "stated",
                ["packages/daemon/src/daemon-policy.ts", "packages/daemon/package.json"], "public surface")],
}

TEST_CORRESPONDENCE = [
    ["reports starting only while the matching cross-process owner is live", "Package integration: startup publication while cross-process owner is live", "Related replacement; invokes DaemonClient, not the built CLI", "packages/daemon/test/integration/adversarial-daemon-peers.test.ts"],
    ["keeps one daemon-owned warm-up when its initiating caller is killed", "Startup coordinator: later caller uses the original warm-up after initiating caller exits", "Related unit test; killed-caller CLI chain not established", "packages/daemon/src/registry/startup-coordinator.test.ts"],
    ["cleans a stale current-schema record", "Controller: cleans stale starting state while reporting status", "Related unit test; exact current-schema CLI chain not established", "packages/daemon/src/process/controller.test.ts"],
    ["reports a stuck live daemon promptly without replacing its process", "Live-silent peer integration also asserts prompt unresponsive status and retained identity", "Overlapping scenario; stuck-work CLI chain not established", "packages/daemon/test/integration/adversarial-daemon-peers.test.ts"],
    ["retains authenticated ownership when a live daemon stops answering ping", "Package integration: live peer stops answering ping", "Related replacement; invokes DaemonClient, not the built CLI", "packages/daemon/test/integration/adversarial-daemon-peers.test.ts"],
    ["reports malformed authenticated activity without leaking or replacing ownership", "Package integration: redacts malformed authenticated activity", "Related replacement; invokes DaemonClient, not the built CLI", "packages/daemon/test/integration/adversarial-daemon-peers.test.ts"],
    ["returns the cold workspace error and exits after workspace deletion", "No equivalent end-to-end test established in this inspection", "Deletion surfaced; no coverage verdict", ""],
    ["waits for a launched starting process to exit before reporting stopped", "Controller: retains starting ownership until the exact launched process exits", "Related unit test; built-stop chain not established", "packages/daemon/src/process/controller.test.ts"],
    ["drains an in-flight request before the built stop command returns", "Process coordinator: returns an in-flight result before graceful stop exits", "Related mechanism test; built-stop chain not established", "packages/daemon/src/process/process-coordinator.test.ts"],
    ["force-kills stuck work before the built stop command renders success", "No equivalent built-stop test established in this inspection", "Deletion surfaced; no coverage verdict", ""],
]


def main():
    evidence_dir = OUT / "evidence"
    evidence_dir.mkdir(exist_ok=True)
    frames = []
    previous = BUNDLE["base"]
    for index, pr in enumerate(BUNDLE["pullRequests"], 1):
        sha = pr["commits"][-1]["sha"]
        assert git("merge-base", previous, sha).strip() == previous
        patch = git("diff", "--find-renames", previous, sha)
        (evidence_dir / f"{pr['number']}.patch").write_text(patch)
        (evidence_dir / f"{pr['number']}.md").write_text(pr["body"])
        stat = git("diff", "--numstat", "--no-renames", previous, sha)
        files = [{"path": s[2], "added": int(s[0]) if s[0].isdigit() else 0,
                  "removed": int(s[1]) if s[1].isdigit() else 0}
                 for line in stat.splitlines() if len(s := line.split("\t")) == 3]
        body = pr["body"]
        section = body.split("## Decisions\n", 1)[1].split("\n## ", 1)[0]
        decisions = []
        for line in section.splitlines():
            if not line.startswith("- "): continue
            choice, sep, reason = line[2:].partition(", because ")
            decisions.append({"choice": choice.rstrip("."), "reason": reason if sep else "Reason not separated in the PR decision.", "status": "stated" if sep else "unexplained", "kind": "PR decision"})
        decisions += EXTRAS.get(pr["number"], [])
        refs = []
        for path, n in re.findall(r"`([^`\n]+\.(?:ts|json|md)):(\d+)`", body.split("## Look here")[-1]):
            refs.append(source(sha, path, int(n)))
        for decision in decisions:
            for path in decision.get("paths", []):
                if not any(r["path"] == path for r in refs):
                    refs.append(source(sha, path))
        tests = [f for f in files if re.search(r"(?:\.test\.[cm]?ts$|/test/|/meta-tests/)", f["path"])]
        deleted_titles = []
        current_path = ""
        for line in patch.splitlines():
            if line.startswith("diff --git "):
                current_path = line.split(" b/", 1)[-1]
            if line.startswith("-") and not line.startswith("---"):
                if m := re.search(r'\b(?:it|test)\(\s*[\"\']([^\"\']+)', line):
                    deleted_titles.append({"path": current_path, "title": m[1]})
        # This is a syntax inventory, never a claim of removed coverage.
        tree = git("ls-tree", "-r", "--name-only", sha).splitlines()
        frames.append({"step": index, "number": pr["number"], "title": pr["title"],
                       "sha": sha, "baseSha": previous, "body": body,
                       "context": body.split("## Context\n", 1)[1].split("\n## ", 1)[0].strip(),
                       "decisions": decisions, "refs": refs, "files": files,
                       "testFiles": tests, "removedTestTitles": deleted_titles,
                       "commits": pr["commits"],
                       "appMechanismFiles": sum(t.startswith("apps/cli/src/daemon/") and t.endswith(".ts") and not t.endswith(".test.ts") for t in tree),
                       "packageMechanismFiles": sum(t.startswith("packages/daemon/src/") and t.endswith(".ts") and not t.endswith(".test.ts") for t in tree)})
        previous = sha
    assert previous == BUNDLE["head"]
    policy_text = git("show", f"{BUNDLE['head']}:plans/005/daemon-policy.md")
    policy = []
    absences = []
    for line in policy_text.splitlines():
        if not line.startswith("| ") or "---" in line: continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) == 5 and cells[0] != "Policy path or recipe": policy.append(cells)
        if len(cells) == 3 and cells[0] != "Deadline": absences.append(cells)
    for filename in ["daemon-policy.md", "daemon-follow-ups-functional-spec.md", "daemon-architecture-functional-spec.md"]:
        (evidence_dir / filename).write_text(git("show", f"{BUNDLE['head']}:plans/005/{filename}"))
    for path in {r[3] for r in TEST_CORRESPONDENCE if r[3]}:
        frames[-1]["refs"].append(source(BUNDLE["head"], path))
    data = {"base": BUNDLE["base"], "head": BUNDLE["head"], "frames": frames,
            "policy": policy, "absences": absences, "testCorrespondence": TEST_CORRESPONDENCE,
            "decisionCount": sum(len(f["decisions"]) for f in frames)}
    (OUT / "data.js").write_text("window.STACK_DATA = " + json.dumps(data, ensure_ascii=False) + ";\n")
    print(f"Built {len(frames)} frames, {data['decisionCount']} decisions, {len(policy)} policy rows, {len(absences)} deadline absences.")
    print(f"Verified ancestry from {BUNDLE['base'][:8]} to {BUNDLE['head'][:8]}.")


if __name__ == "__main__":
    main()
