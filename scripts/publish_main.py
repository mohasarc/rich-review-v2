#!/usr/bin/env python3
import fcntl
import subprocess
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOG = ROOT / "orchestrator-log.md"
LOCK = ROOT / ".publish.lock"


def log(message: str) -> None:
    stamp = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")
    with LOG.open("a") as stream:
        stream.write(f"- {stamp}: PUBLISH {message}\n")


def main() -> None:
    with LOCK.open("w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        remote = subprocess.run(
            ["git", "remote", "get-url", "origin"],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )
        if remote.returncode:
            return
        pushed = subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=ROOT,
            text=True,
            capture_output=True,
        )
        output = (pushed.stdout + pushed.stderr).strip()
        if pushed.returncode:
            log(f"FAILED: {output}")
        elif "Everything up-to-date" not in output:
            log(f"OK: {output}")


if __name__ == "__main__":
    main()
