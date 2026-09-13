"""Run selected existing witnesses; never write source in a symnav worktree."""
from pathlib import Path
import datetime
import json
import platform
import subprocess
import time

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
LOGS = OUT / "logs"
LOGS.mkdir(exist_ok=True)

CHECKS = [
    ("pr131-witnesses", "pr-131-head", [
        "pnpm", "exec", "vitest", "run", "--fileParallelism=false",
        "packages/daemon/src/daemon-policy.test.ts",
        "apps/cli/src/cli-program-executor.test.ts",
        "apps/cli/src/daemon/completion-spool.test.ts",
        "apps/cli/src/daemon/daemon-resource-monitor.test.ts",
        "apps/cli/src/daemon/daemon-logger.test.ts",
        "apps/cli/src/daemon/daemon-lifetime.test.ts",
        "apps/cli/src/daemon/daemon-startup-coordinator.test.ts",
        "apps/cli/src/daemon/local-daemon-transport-validation.test.ts",
        "apps/cli/src/daemon/local-daemon-transport-execution.test.ts",
        "meta-tests/src/daemon-package.test.ts",
    ]),
    ("pr148-witnesses", "pr-148-head", [
        "pnpm", "exec", "vitest", "run", "--fileParallelism=false",
        "packages/daemon/src/client/daemon-client.test.ts",
        "packages/daemon/src/client/daemon-client-control.test.ts",
        "packages/daemon/src/client/daemon-client-public.test.ts",
        "packages/daemon/src/client/daemon-routing-policy.test.ts",
        "packages/daemon/src/lifecycle/daemon-clock.test.ts",
        "packages/daemon/src/lifecycle/daemon-lifetime.test.ts",
        "packages/daemon/src/process/process-coordinator-construction.test.ts",
        "packages/daemon/src/registry/registry.test.ts",
        "packages/daemon/src/entry-boundary.test.ts",
        "packages/daemon/src/package-boundary.test.ts",
        "packages/daemon/src/host-contract.test.ts",
        "packages/daemon/test/integration/built-entry-artifacts.test.ts",
        "packages/daemon/test/integration/built-process-entry.test.ts",
        "packages/daemon/test/integration/built-process-launcher.test.ts",
        "apps/cli/src/daemon-executor.test.ts",
        "meta-tests/src/daemon-compatibility-copy.test.ts",
        "meta-tests/src/daemon-package.test.ts",
    ]),
    ("pr148-contract-types", "pr-148-head", [
        "pnpm", "exec", "tsc", "-p", "packages/daemon/tsconfig.test.json", "--noEmit",
    ]),
]


def capture(cwd, *args):
    return subprocess.check_output(args, cwd=cwd, text=True).strip()


def main():
    manifest = {"platform": platform.platform(), "started": datetime.datetime.now(datetime.timezone.utc).isoformat(), "runs": []}
    for name, worktree, arguments in CHECKS:
        cwd = ROOT / "worktrees" / worktree
        before = capture(cwd, "git", "status", "--porcelain", "--untracked-files=no")
        record = {"name": name, "worktree": worktree, "sha": capture(cwd, "git", "rev-parse", "HEAD"), "node": capture(cwd, "node", "--version"), "arguments": arguments, "statusBefore": before}
        if "vitest" in arguments:
            arguments = arguments + ["--reporter=default", "--reporter=json", f"--outputFile.json={LOGS / (name + '.json')}"]
        print(f"Running {name}", flush=True)
        start = time.monotonic()
        with (LOGS / (name + ".txt")).open("w") as log:
            result = subprocess.run(arguments, cwd=cwd, stdout=log, stderr=subprocess.STDOUT)
        record.update({"arguments": arguments, "exitCode": result.returncode, "elapsedSeconds": round(time.monotonic() - start, 2), "statusAfter": capture(cwd, "git", "status", "--porcelain", "--untracked-files=no")})
        manifest["runs"].append(record)
        (LOGS / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        print(f"{name}: exit {result.returncode}, {record['elapsedSeconds']}s", flush=True)
    print("Selected checks finished; see logs/manifest.json", flush=True)


if __name__ == "__main__":
    main()
