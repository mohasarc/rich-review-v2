#!/usr/bin/env python3
import os
import shutil
import signal
import subprocess
import time
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOG = ROOT / "orchestrator-log.md"
SUPERVISOR_PID = ROOT / "supervisor.pid"
MONITOR_PID = ROOT / "monitor.pid"
WORKTREES = ROOT / "worktrees"
INTERVAL_SECONDS = 5 * 60
HEARTBEAT_EVERY = 3
stopping = False


def log(message: str) -> None:
    stamp = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")
    with LOG.open("a") as stream:
        stream.write(f"- {stamp}: MONITOR {message}\n")


def process_alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
        return True
    except (ProcessLookupError, PermissionError):
        return False


def supervisor_pid() -> int | None:
    if not SUPERVISOR_PID.exists():
        return None
    try:
        return int(SUPERVISOR_PID.read_text().strip())
    except ValueError:
        return -1


def restart_crashed_supervisor(stale_pid: int) -> None:
    log(f"ALERT supervisor pid {stale_pid} is dead with a stale PID file; restarting")
    try:
        SUPERVISOR_PID.unlink()
    except FileNotFoundError:
        pass
    subprocess.Popen(
        ["python3", "scripts/supervise.py"],
        cwd=ROOT,
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
    )


def dirty_worktrees() -> list[str]:
    dirty = []
    for worktree in sorted(WORKTREES.iterdir()):
        if not (worktree / ".git").exists():
            continue
        completed = subprocess.run(
            ["git", "status", "--short"],
            cwd=worktree,
            text=True,
            capture_output=True,
        )
        if completed.stdout.strip():
            dirty.append(f"{worktree.name}: {completed.stdout.strip().replace(chr(10), '; ')}")
    return dirty


def missing_readmes() -> list[str]:
    missing = []
    for brief_path in (ROOT / "queue/done").glob("*.md"):
        experiment = ROOT / "experiments" / brief_path.stem
        if not (experiment / "README.md").exists():
            missing.append(brief_path.stem)
    return sorted(missing)


def stale_running() -> list[str]:
    stale = []
    cutoff = time.time() - 3 * 60 * 60
    for brief_path in (ROOT / "queue/running").glob("*.md"):
        experiment = ROOT / "experiments" / brief_path.stem
        if (experiment / "README.md").exists():
            continue
        mtimes = [path.stat().st_mtime for path in experiment.rglob("*") if path.is_file()]
        if mtimes and max(mtimes) < cutoff:
            stale.append(brief_path.stem)
    return sorted(stale)


def large_files() -> list[str]:
    threshold = 20 * 1024 * 1024
    return sorted(
        str(path.relative_to(ROOT))
        for path in (ROOT / "experiments").rglob("*")
        if path.is_file()
        and not path.name.startswith("worker-attempt-")
        and path.stat().st_size > threshold
    )


def audit(iteration: int) -> None:
    pid = supervisor_pid()
    if pid is None:
        log("supervisor PID file removed; treating this as an intentional stop and exiting")
        raise SystemExit(0)
    if pid < 0 or not process_alive(pid):
        restart_crashed_supervisor(pid)
        return
    subprocess.run(["python3", "scripts/build_index.py"], cwd=ROOT, check=False)
    running = len(list((ROOT / "queue/running").glob("*.md")))
    queued = len(list((ROOT / "queue").glob("*.md")))
    finished = len(list((ROOT / "queue/done").glob("*.md")))
    dirty = dirty_worktrees()
    missing = missing_readmes()
    stale = stale_running()
    oversized = large_files()
    if dirty:
        log(f"ALERT symnav worktree mutation detected: {' | '.join(dirty)}")
    if missing:
        log(f"ALERT done experiments missing README: {', '.join(missing)}")
    if stale:
        log(f"ALERT running experiments show no file activity for three hours: {', '.join(stale)}")
    if oversized:
        log(f"ALERT files over 20 MB require ignore handling: {', '.join(oversized)}")
    if queued and running < 5:
        log(f"NOTICE concurrency below five while queue has work: running={running}, queued={queued}")
    if iteration % HEARTBEAT_EVERY == 0:
        free_gib = shutil.disk_usage(ROOT).free / (1024 ** 3)
        log(
            f"OK supervisor={pid}, finished={finished}, running={running}, queued={queued}, "
            f"dirty-worktrees={len(dirty)}, missing-readmes={len(missing)}, free-disk={free_gib:.1f}GiB"
        )


def stop_handler(signum, frame) -> None:
    global stopping
    stopping = True


def main() -> None:
    MONITOR_PID.write_text(f"{os.getpid()}\n")
    signal.signal(signal.SIGTERM, stop_handler)
    signal.signal(signal.SIGINT, stop_handler)
    log(f"START pid {os.getpid()}, five-minute audits enabled")
    iteration = 0
    try:
        while not stopping:
            audit(iteration)
            iteration += 1
            for _ in range(INTERVAL_SECONDS):
                if stopping:
                    break
                time.sleep(1)
    finally:
        try:
            MONITOR_PID.unlink()
        except FileNotFoundError:
            pass
        log("STOPPED")


if __name__ == "__main__":
    main()
