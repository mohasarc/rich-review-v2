"""Collects analysis outputs and exact code excerpts into data.js for index.html."""

import json
import subprocess
from pathlib import Path

HERE = Path(__file__).parent
ANALYSIS = HERE / "analysis"
WORKTREES = HERE.resolve().parents[1] / "worktrees"
TREES = {"head": WORKTREES / "pr-148-head", "base": WORKTREES / "pr-148-base", "stack": WORKTREES / "stack-head"}
BASE_REF = "ba53c8e1662fd86d198b95321c90d9c9bef10184"
HEAD_REF = "20838f8dbf413e04767543eb2380d0d114da6c60"


def lines_of(tree: str, path: str) -> list[str]:
    return (TREES[tree] / path).read_text().splitlines()


def find(lines: list[str], needle: str, after: int = 0) -> int:
    for index in range(after, len(lines)):
        if needle in lines[index]:
            return index
    raise ValueError(f"anchor not found: {needle}")


def excerpt(key: str, tree: str, path: str, start: str | int, end: str | int, note: str = "") -> dict:
    lines = lines_of(tree, path)
    first = start - 1 if isinstance(start, int) else find(lines, start)
    if isinstance(end, int) and not isinstance(start, int):
        last = first + end - 1
    elif isinstance(end, int):
        last = end - 1
    else:
        last = find(lines, end, first + 1) - 1
        while last > first and not lines[last].strip():
            last -= 1
    return {
        "key": key,
        "tree": tree,
        "path": path,
        "start": first + 1,
        "end": last + 1,
        "code": "\n".join(lines[first : last + 1]),
        "note": note,
    }


EXCERPTS = [
    excerpt("policyTimeouts", "head", "plans/005/daemon-policy.md", 1, 10),
    excerpt("policyMigration", "head", "plans/005/daemon-policy.md", "## Migration access", 5),
    excerpt("functionalIdle", "head", "plans/005/daemon-functional-spec.md", 299, 304),
    excerpt("facade", "head", "packages/daemon/src/client/daemon-client.ts", 1, 64),
    excerpt("contracts", "head", "packages/daemon/src/client/daemon-client-contracts.ts", 1, 36),
    excerpt("runtimeConstructor", "head", "packages/daemon/src/client/daemon-client-runtime.ts", "export class DaemonClientRuntime", "  async execute(request"),
    excerpt("runtimeExecute", "head", "packages/daemon/src/client/daemon-client-runtime.ts", "  async execute(request", "  control("),
    excerpt("runtimeControl", "head", "packages/daemon/src/client/daemon-client-runtime.ts", 170, 179),
    excerpt("runtimeWarm", "head", "packages/daemon/src/client/daemon-client-runtime.ts", "  private async executeWarm(", "  private static executorRequest("),
    excerpt("controlledResult", "head", "packages/daemon/src/client/daemon-client-runtime.ts", "class DaemonControlledResult", 17),
    excerpt("cliControlledResult", "head", "apps/cli/src/command-execution-result.ts", "export class ControlledCommandResult", 22),
    excerpt("guards", "head", "packages/daemon/src/client/daemon-routing-policy.ts", 66, 137),
    excerpt("routingContext", "head", "packages/daemon/src/client/daemon-routing-policy.ts", "export class DaemonRoutingContextState", "class RecordPresentRoutingGuard"),
    excerpt("dispatcherExecute", "head", "apps/cli/src/daemon/daemon-command-dispatcher.ts", "  async execute(request: CliExecutionRequest)", "  private async executeWarm("),
    excerpt("dispatcherWarm", "head", "apps/cli/src/daemon/daemon-command-dispatcher.ts", "  private async executeWarm(", "  private executeRoute("),
    excerpt("dispatcherRuntime", "head", "apps/cli/src/daemon/daemon-command-dispatcher.ts", "  private static createRuntime(", "  private static isCompleteResult("),
    excerpt("cliEntry", "head", "apps/cli/src/cli.ts", 1, 23),
    excerpt("compatDigest", "head", "meta-tests/src/daemon-compatibility-copy.test.ts", 8, 48),
    excerpt("pkgLauncherEntry", "head", "packages/daemon/src/process/process-launcher.ts", 155, 157),
    excerpt("cliLauncherEntry", "head", "apps/cli/src/daemon/daemon-process-launcher.ts", 155, 157),
    excerpt("pkgWorkerEntryUrl", "head", "packages/daemon/src/worker/navigation-worker.ts", 95, 105),
    excerpt("processEntry", "head", "packages/daemon/src/process-entry.ts", 1, 42),
    excerpt("packageJson", "head", "packages/daemon/package.json", 1, 32),
    excerpt("readinessDefault", "head", "packages/daemon/src/registry/startup-coordinator.ts", "    this.readinessProbe = options.readinessProbe ?? {", 4),
    excerpt("readinessUse", "head", "packages/daemon/src/registry/startup-coordinator.ts", "  private async probeExecution(", "  private alreadyRunning("),
    excerpt("lifetime", "head", "packages/daemon/src/lifecycle/daemon-lifetime.ts", 11, 34),
    excerpt("lifetimeTest", "head", "packages/daemon/src/lifecycle/daemon-lifetime.test.ts", "keeps the constructor-started acceptance deadline after completion", 17),
    excerpt("registryPredicate", "head", "apps/cli/src/daemon/daemon-registry.ts", "  private startupOwnershipMatches(", 20),
    excerpt("registryPredicateBase", "base", "apps/cli/src/daemon/daemon-registry.ts", "  private static sameStartupOwner(", 15),
    excerpt("isStartupOwnerBase", "base", "apps/cli/src/daemon/daemon-registry.ts", "  isStartupOwner(identity", 3),
    excerpt("isStartupOwnerHead", "head", "apps/cli/src/daemon/daemon-registry.ts", "  isStartupOwner(identity", 8),
    excerpt("validateCoordinates", "head", "packages/daemon/src/process/process-coordinator.ts", "  private static validateCoordinates(", 14),
    excerpt("entryBase", "base", "apps/cli/src/daemon/daemon-entry.ts", 1, 49),
    excerpt("spoolCodec", "head", "packages/daemon/src/delivery/completion-spool.ts", 1, 30),
    excerpt("routeTable", "head", "packages/daemon/src/client/daemon-client.test.ts", 33, 124),
    excerpt("controlTest", "head", "packages/daemon/src/client/daemon-client-control.test.ts", 11, 41),
    excerpt("routingMemoTest", "head", "packages/daemon/src/client/daemon-routing-policy.test.ts", "performs no work until a decision and memoizes context operations", 40),
    excerpt("hostContractTest", "head", "packages/daemon/src/host-contract.test.ts", '  it("defines the exact daemon client host boundary"', 16),
    excerpt("stackWiring", "stack", "apps/cli/src/program.ts", "  const daemonClient = new DaemonClient({", 9, "from #149 (stack tip), not part of #148"),
    excerpt("resultCaptureTest", "head", "packages/daemon/src/client/daemon-client.test.ts", "composes fresh warm result captures", 16),
    excerpt("perAttemptTest", "head", "packages/daemon/src/client/daemon-client.test.ts", "creates a new executor for every local attempt", 10),
]


def git_head(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=TREES["head"], capture_output=True, text=True, check=True).stdout


def diff_of(paths: list[str]) -> str:
    return git_head("diff", "-M", f"{BASE_REF}...HEAD", "--", *paths)


def load(name: str):
    return json.loads((ANALYSIS / name).read_text())


def compact_trace(trace: dict, keep_args: bool) -> dict:
    events = []
    for event in trace["events"]:
        item = {k: event[k] for k in ("id", "parent", "step", "t", "spoke", "method", "phase") if k in event}
        if event.get("instance"):
            item["instance"] = event["instance"]
        value = event.get("value", event.get("detail"))
        if value is not None and event["phase"] != "call":
            text = json.dumps(value)
            item["value"] = text if len(text) < 160 else text[:157] + "..."
        events.append(item)
    steps = []
    for step in trace["steps"]:
        slim = {k: step[k] for k in step if k not in ("diskBefore", "diskAfter")}
        if "diskAfter" in step:
            slim["disk"] = [
                {"path": e["path"].split("/", 2)[-1] if e["path"].startswith("daemons/") else e["path"], "kind": e["kind"], "state": (e.get("json") or {}).get("state"), "ownerKind": (e.get("json") or {}).get("ownerKind")}
                for e in step["diskAfter"]
                if e["kind"] != "dir"
            ]
        steps.append(slim)
    logs = []
    for log in trace.get("daemonLogs", []):
        for line in log["lines"]:
            logs.append({"timestamp": line["timestamp"], "instance": line["instanceId"][:8], "kind": line["kind"]})
    return {
        "recordedAt": trace["recordedAt"],
        "wallStartMs": trace.get("wallStartMs"),
        "executorModule": trace.get("executorModule"),
        "steps": steps,
        "events": events,
        "daemonLog": logs,
    }


def main() -> None:
    for tree, expected in (("base", BASE_REF), ("head", HEAD_REF)):
        actual = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=TREES[tree], text=True).strip()
        if actual != expected:
            raise ValueError(f"{tree} worktree revision differs: expected {expected}, found {actual}")
    pairs = load("pairs.json")
    for pair in pairs:
        slug = Path(pair["cli"]).stem
        diverged = pair["cliToPackageIgnoringImports"]
        if diverged["added"] or diverged["removed"]:
            pair["cliToPackageDiff"] = (ANALYSIS / "pairs" / f"{slug}.cli-to-package.diff").read_text()
        edited = pair["baseToCli"]
        if edited["added"] or edited["removed"]:
            pair["baseToCliDiff"] = (ANALYSIS / "pairs" / f"{slug}.base-to-cli.diff").read_text()
    graph = load("graph.json")
    data = {
        "revisions": {"base": BASE_REF, "head": HEAD_REF},
        "excerpts": {e["key"]: e for e in EXCERPTS},
        "pairs": pairs,
        "tests": load("tests.json"),
        "commits": [
            {k: c[k] for k in ("sha", "subject", "date", "specify", "areas")} | {"files": [f["path"] for f in c["files"]]}
            for c in load("commits.json")
        ],
        "sizes": {k: {kk: v[kk] for kk in ("files", "added", "removed")} for k, v in load("size-buckets.json").items()},
        "graph": {
            "files": graph["files"],
            "inProcess": graph["inProcess"],
            "unreachable": graph["unreachable"],
            "loaded": load("module-load.json"),
            "selfImporters": graph["selfImporters"],
        },
        "traces": {
            "fixture": compact_trace(load("trace.json"), True),
            "cli": compact_trace(load("trace-cli.json"), True),
            "oldHead": {"recordedAt": load("trace-old-head.json")["recordedAt"], "steps": load("trace-old-head.json")["steps"], "events": load("trace-old-head.json")["events"]},
            "oldBase": {"recordedAt": load("trace-old-base.json")["recordedAt"], "steps": load("trace-old-base.json")["steps"]},
        },
        "probes": {
            "head": (ANALYSIS / "cli-probe-head.txt").read_text(),
            "base": (ANALYSIS / "cli-probe-base.txt").read_text(),
        },
        "diffs": {
            "lintPolicyTesting": diff_of(["eslint.config.mjs", "meta-tests/src/lint-rule.test.ts", "meta-tests/src/daemon-package.test.ts"]),
            "followUps": diff_of(["plans/005/daemon-follow-ups-functional-spec.md"]),
            "controller": diff_of(["apps/cli/src/daemon/daemon-controller.ts"]),
            "entryDeletedTest": subprocess.run(["git", "show", f"{BASE_REF}:apps/cli/src/daemon/daemon-entry.test.ts"], cwd=TREES["head"], capture_output=True, text=True, check=True).stdout,
            "executorOracle": diff_of(["apps/cli/src/daemon-executor.test.ts"]),
            "hostContract": diff_of(["packages/daemon/src/host-contract.test.ts"]),
        },
    }
    (HERE / "data.js").write_text("window.REVIEW = " + json.dumps(data) + ";\n")
    size = (HERE / "data.js").stat().st_size
    print(f"data.js {size/1024:.0f} KB, excerpts={len(EXCERPTS)}")
    for e in EXCERPTS:
        print(f"  {e['key']:<22} {e['tree']}:{e['path']}:{e['start']}-{e['end']}  first={e['code'].splitlines()[0][:60]!r}")


if __name__ == "__main__":
    main()
