import difflib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path.home() / "projects/rich-review-v2"
HEAD = ROOT / "worktrees/pr-148-head"
BASE = ROOT / "worktrees/pr-148-base"
OUT = Path(__file__).parent

PAIRS = [
    ("accepted-execution-session-contracts.ts", None, "execution/accepted-execution-session-contracts.ts"),
    ("accepted-execution-session.ts", None, "execution/accepted-execution-session.ts"),
    ("accepted-request-ledger.ts", None, "execution/accepted-request-ledger.ts"),
    ("completion-spool.ts", None, "delivery/completion-spool.ts"),
    ("daemon-activity-projector.ts", None, "process/activity-projector.ts"),
    ("daemon-client-result-capture.ts", None, "transport/client-result-capture.ts"),
    ("daemon-clock.ts", None, "lifecycle/daemon-clock.ts"),
    ("daemon-controller.ts", None, "process/controller.ts"),
    ("daemon-delivery-session.ts", None, "delivery/delivery-session.ts"),
    ("daemon-entry.ts", None, "process-entry.ts"),
    ("daemon-execution-client.ts", None, "transport/execution-client.ts"),
    ("daemon-lifecycle-client.ts", None, "transport/lifecycle-client.ts"),
    ("daemon-lifetime.ts", None, "lifecycle/daemon-lifetime.ts"),
    ("daemon-logger.ts", None, "diagnostics/logger.ts"),
    ("daemon-navigation-worker-entry.ts", None, "worker/navigation-worker-entry.ts"),
    ("daemon-navigation-worker-protocol.ts", None, "worker/worker-protocol.ts"),
    ("daemon-navigation-worker.ts", None, "worker/navigation-worker.ts"),
    ("daemon-operation-observer.ts", None, "diagnostics/operation-observer.ts"),
    ("daemon-process-coordinator.ts", "workspace-daemon.ts", "process/process-coordinator.ts"),
    ("daemon-process-launcher.ts", None, "process/process-launcher.ts"),
    ("daemon-process-termination-observer.ts", None, "process/process-termination-observer.ts"),
    ("daemon-protocol-validator.ts", None, "transport/protocol-validator.ts"),
    ("daemon-protocol.ts", None, "transport/protocol.ts"),
    ("daemon-record-observer.ts", None, "registry/record-observer.ts"),
    ("daemon-registry.ts", None, "registry/registry.ts"),
    ("daemon-resource-monitor.ts", None, "resources/resource-supervisor.ts"),
    ("daemon-result-transfer-receiver.ts", None, "transport/result-transfer-receiver.ts"),
    ("daemon-runtime-values.ts", None, "process/runtime-values.ts"),
    ("daemon-startup-coordinator.ts", None, "registry/startup-coordinator.ts"),
    ("daemon-transport-error.ts", None, "transport/transport-error.ts"),
    ("daemon-transport.ts", None, "transport/contracts.ts"),
    ("daemon-wire-codec.ts", None, "transport/wire-codec.ts"),
    ("daemon-worker-generation-manager.ts", None, "worker/worker-generation-manager.ts"),
    ("daemon-workspace-identity.ts", None, "registry/workspace-identity.ts"),
    ("local-daemon-socket-client.ts", None, "transport/socket-client.ts"),
    ("local-daemon-socket-server.ts", None, "transport/socket-server.ts"),
    ("local-daemon-transport.ts", None, "transport/local-transport.ts"),
    ("workspace-request-queue.ts", None, "execution/request-queue.ts"),
]

IMPORT_BLOCK = re.compile(r'^import\b[^;]*?from\s+"[^"]+";\s*$|^import\s+"[^"]+";\s*$', re.M | re.S)


def read(path: Path) -> str:
    return path.read_text() if path.exists() else ""


def strip_imports(source: str) -> list[str]:
    return [line for line in IMPORT_BLOCK.sub("", source).splitlines() if line.strip()]


def diff_counts(a: list[str], b: list[str]) -> tuple[int, int, list[str]]:
    lines = list(difflib.unified_diff(a, b, lineterm="", n=2))
    added = sum(1 for l in lines if l.startswith("+") and not l.startswith("+++"))
    removed = sum(1 for l in lines if l.startswith("-") and not l.startswith("---"))
    return added, removed, lines


def main() -> None:
    (OUT / "pairs").mkdir(exist_ok=True)
    rows = []
    for cli_name, base_name, package_path in PAIRS:
        base_src = read(BASE / "apps/cli/src/daemon" / (base_name or cli_name))
        cli_src = read(HEAD / "apps/cli/src/daemon" / cli_name)
        pkg_src = read(HEAD / "packages/daemon/src" / package_path)
        a1, r1, d1 = diff_counts(base_src.splitlines(), cli_src.splitlines())
        a2, r2, d2 = diff_counts(strip_imports(cli_src), strip_imports(pkg_src))
        a3, r3, d3 = diff_counts(strip_imports(base_src), strip_imports(pkg_src))
        slug = cli_name.removesuffix(".ts")
        (OUT / "pairs" / f"{slug}.base-to-cli.diff").write_text("\n".join(d1) + "\n")
        (OUT / "pairs" / f"{slug}.cli-to-package.diff").write_text("\n".join(d2) + "\n")
        rows.append(
            {
                "cli": f"apps/cli/src/daemon/{cli_name}",
                "base": f"apps/cli/src/daemon/{base_name or cli_name}",
                "package": f"packages/daemon/src/{package_path}",
                "cliLines": len(cli_src.splitlines()),
                "packageLines": len(pkg_src.splitlines()),
                "baseToCli": {"added": a1, "removed": r1},
                "cliToPackageIgnoringImports": {"added": a2, "removed": r2},
                "baseToPackageIgnoringImports": {"added": a3, "removed": r3},
            }
        )
    (OUT / "pairs.json").write_text(json.dumps(rows, indent=2))
    total_pkg = sum(r["packageLines"] for r in rows)
    identical = [r for r in rows if r["cliToPackageIgnoringImports"] == {"added": 0, "removed": 0}]
    print(f"pairs={len(rows)} packageLines={total_pkg} identicalIgnoringImports={len(identical)}")
    for r in rows:
        c = r["cliToPackageIgnoringImports"]
        b = r["baseToCli"]
        print(
            f'{r["package"]:<60} pkg={r["packageLines"]:>4} cli->pkg +{c["added"]:<3} -{c["removed"]:<3} base->cli +{b["added"]:<3} -{b["removed"]:<3}'
        )


if __name__ == "__main__":
    main()
