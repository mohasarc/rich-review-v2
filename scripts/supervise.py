#!/usr/bin/env python3
import json
import os
import re
import shutil
import signal
import subprocess
import time
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

from write_briefs import brief

ROOT = Path(__file__).resolve().parents[1]
QUEUE = ROOT / "queue"
RUNNING = QUEUE / "running"
DONE = QUEUE / "done"
EXPERIMENTS = ROOT / "experiments"
LOG = ROOT / "orchestrator-log.md"
STATE_PATH = ROOT / "supervisor-state.json"
PID_PATH = ROOT / "supervisor.pid"
CONCURRENCY = 5
STALL_SECONDS = 3 * 60 * 60
POLL_SECONDS = 10
QUOTA_WORDS = ("credit", "quota", "billing", "rate limit", "usage limit", "insufficient balance")


@dataclass
class Worker:
    brief_path: Path
    experiment: Path
    harness: str
    attempt: int
    started: float
    process: subprocess.Popen
    log_stream: object


workers: dict[int, Worker] = {}
stopping = False


def log(message: str) -> None:
    stamp = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")
    with LOG.open("a") as stream:
        stream.write(f"- {stamp}: {message}\n")


def load_state() -> dict:
    if STATE_PATH.exists():
        try:
            return json.loads(STATE_PATH.read_text())
        except Exception as error:
            log(f"State file unreadable; starting from disk state: {error}")
    return {"claude_disabled": False, "attempts": {}, "last_refresh_bucket": 0, "completed": 0}


state = load_state()


def save_state() -> None:
    temporary = STATE_PATH.with_suffix(".tmp")
    temporary.write_text(json.dumps(state, indent=2) + "\n")
    temporary.replace(STATE_PATH)


def parse_name(path: Path) -> tuple[int, str]:
    match = re.match(r"(\d+)-(.+)\.md$", path.name)
    if not match:
        raise ValueError(f"invalid brief filename: {path.name}")
    return int(match.group(1)), match.group(2)


def next_number() -> int:
    numbers = []
    for path in list(QUEUE.glob("*.md")) + list(RUNNING.glob("*.md")) + list(DONE.glob("*.md")):
        try:
            numbers.append(parse_name(path)[0])
        except ValueError:
            pass
    for path in EXPERIMENTS.glob("[0-9]*-*"):
        match = re.match(r"(\d+)-", path.name)
        if match:
            numbers.append(int(match.group(1)))
    return max(numbers, default=0) + 1


def queue_brief(number: int, slug: str, subjects: str, angle: str, kind: str, reason: str) -> None:
    path = QUEUE / f"{number:02d}-{slug}.md"
    path.write_text(brief(number, slug, subjects, angle, kind))
    log(f"Generated brief {number:02d}-{slug}: {reason}")


def section(markdown: str, heading: str) -> str:
    match = re.search(rf"^## {re.escape(heading)}\s*$\n(.*?)(?=^## |\Z)", markdown, re.MULTILINE | re.DOTALL)
    return match.group(1).strip() if match else ""


def generate_more() -> None:
    readmes = sorted(EXPERIMENTS.glob("[0-9]*-*/README.md"), reverse=True)[:5]
    suggestions = []
    choices = []
    for readme in readmes:
        markdown = readme.read_text(errors="replace")
        suggestion = section(markdown, "What I would do next").replace("\n", " ").strip()
        if suggestion:
            suggestions.append((readme.parent.name, suggestion))
        declared = section(markdown, "Declared choices").replace("\n", "; ").strip()
        if declared:
            choices.append((readme.parent.name, declared))
    while len(suggestions) < 2:
        suggestions.append(("playbook", "make the top layer more visual and test teach-back"))
    while len(choices) < 2:
        choices.append(("playbook", "runtime topology; decision cards; question-driven navigation"))
    critique = next(iter(sorted(EXPERIMENTS.glob("*critique*/README.md"), reverse=True)), None)
    critique_hint = "test a missing visual explanation"
    critique_source = "playbook"
    if critique:
        critique_source = critique.parent.name
        critique_hint = section(critique.read_text(errors="replace"), "What I would do next").replace("\n", " ").strip() or critique_hint
    starts = next_number()
    generated = [
        ("weird-follow-next", "pr-127", f"Turn this earlier next step into an unfamiliar visual or physical instrument: {suggestions[0][1]}", "free", f"weirdly follows {suggestions[0][0]}'s next step"),
        ("compound-visual-grammar", "pr-148", f"Recombine these through one visual grammar where color, shape, and position carry different facts: {choices[0][1]} + {choices[1][1]}", "page", f"visually recombines choices from {choices[0][0]} and {choices[1][0]}"),
        ("library-rescue", "stack", "Find a weak hand-built diagram in an earlier experiment and rebuild the underlying explanation with a mature layout, rendering, animation, or simulation library; make the representation materially different", "page", "tests whether established tooling improves a weak diagram"),
        ("science-gets-weird", "pr-131", f"Use the science-chapter pattern—specimen, controlled experiment, prediction, observed result—but express it through a strange spatial, sensory, or game-like form. Consider this critique direction: {critique_hint}", "free", f"combines textbook pedagogy with {critique_source}"),
        ("be-weirder", "any", "Invent a representational grammar no finished experiment uses. Compound at least three higher-level concepts through color, shape, position, motion, sound, texture, or interaction. Prefer a mature library over hand-built diagram geometry.", "free", "dedicated weird-interface slot"),
    ]
    for offset, (slug, subjects, angle, kind, reason) in enumerate(generated):
        number = starts + offset
        queue_brief(number, f"{slug}-{number:02d}", subjects, angle, kind, reason)


def queue_refreshes() -> None:
    bucket = state["completed"] // 10
    while bucket > state["last_refresh_bucket"]:
        completed_mark = state["last_refresh_bucket"] * 10 + 10
        number = next_number()
        queue_brief(
            number,
            f"critique-refresh-{completed_mark}",
            "none",
            "read all finished experiments; against philosophy.md and section 1, write what is missing, what repeats, what is promising. No page",
            "critique",
            f"recurring brief 38 after {completed_mark} completions",
        )
        queue_brief(
            number + 1,
            f"fresh-reader-refresh-{completed_mark}",
            "none",
            "for each finished page: read it without the diff, list decisions learned, then read the diff and list misses in one table; flag rule-4 surprises",
            "critique",
            f"recurring brief 39 after {completed_mark} completions",
        )
        state["last_refresh_bucket"] += 1
        save_state()


def choose_harness(number: int, attempts: int) -> str:
    if state["claude_disabled"]:
        return "codex"
    preferred = "codex" if number % 2 else "claude-opus"
    if preferred == "claude-opus" and attempts >= 2:
        return "codex"
    return preferred


def command_for(harness: str) -> list[str]:
    if harness == "claude-opus":
        return [
            "claude", "--print", "--model", "opus", "--effort", "max",
            "--dangerously-skip-permissions", "--output-format", "text",
        ]
    return [
        "codex", "exec", "--model", "gpt-6-astra",
        "--config", 'model_reasoning_effort="max"',
        "--dangerously-bypass-approvals-and-sandbox",
        "--cd", str(ROOT), "-",
    ]


def launch(path: Path) -> None:
    number, slug = parse_name(path)
    attempts = int(state["attempts"].get(path.name, 0)) + 1
    state["attempts"][path.name] = attempts
    harness = choose_harness(number, attempts - 1)
    experiment = EXPERIMENTS / f"{number:02d}-{slug}"
    experiment.mkdir(parents=True, exist_ok=True)
    running_path = RUNNING / path.name
    path.replace(running_path)
    brief_copy = experiment / "brief.md"
    shutil.copy2(running_path, brief_copy)
    harness_line = f"attempt {attempts}: {harness}\n"
    with (experiment / "harness.txt").open("a") as stream:
        stream.write(harness_line)
    log_path = experiment / f"worker-attempt-{attempts}.log"
    log_stream = log_path.open("a")
    stdin_stream = brief_copy.open("r")
    process = subprocess.Popen(
        command_for(harness),
        cwd=ROOT,
        stdin=stdin_stream,
        stdout=log_stream,
        stderr=subprocess.STDOUT,
        text=True,
        start_new_session=True,
    )
    stdin_stream.close()
    workers[process.pid] = Worker(running_path, experiment, harness, attempts, time.time(), process, log_stream)
    log(f"START {number:02d}-{slug} attempt {attempts} via {harness}, pid {process.pid}")
    save_state()


def is_quota_failure(worker: Worker) -> bool:
    try:
        text = (worker.experiment / f"worker-attempt-{worker.attempt}.log").read_text(errors="replace").lower()
    except OSError:
        return False
    return any(word in text for word in QUOTA_WORDS)


def requeue(worker: Worker, reason: str) -> None:
    pending = QUEUE / worker.brief_path.name
    if worker.brief_path.exists():
        worker.brief_path.replace(pending)
    log(f"REQUEUE {worker.experiment.name} after attempt {worker.attempt}: {reason}")


def failure_readme(worker: Worker, reason: str) -> None:
    brief_text = (worker.experiment / "brief.md").read_text(errors="replace")
    subjects = section(brief_text, "Subjects") or "unknown"
    readme = f"""# {worker.experiment.name}

## Entry point
Open `brief.md` and `worker-attempt-{worker.attempt}.log`. No artifact was produced.

## Kind
negative-result

## Subjects
{subjects}

## Declared choices
- Role framing: unavailable; worker failed
- Box lenses: unavailable; worker failed
- Opening style: unavailable; worker failed
- Shape: unavailable; worker failed
- Navigation: unavailable; worker failed
- Trust posture: unavailable; worker failed
- Persona: unavailable; worker failed
- Representations used: failure transcript
- Importance rule: unavailable; worker failed
- Inputs used (beyond bundle): unknown
- Tech: {worker.harness}
- Built on earlier experiment(s): unknown

## What I tried
The worker was attempted {worker.attempt} times. Last failure: {reason}.

## What I would drop
The failed run itself.

## What I would do next
Reissue this angle to a fresh worker if it remains useful.

## Time spent
Worker did not report a duration.
"""
    (worker.experiment / "README.md").write_text(readme)


def git_commit(worker: Worker) -> None:
    subprocess.run(["python3", "scripts/build_index.py"], cwd=ROOT, check=False)
    relative_experiment = worker.experiment.relative_to(ROOT)
    paths = [str(relative_experiment), str(worker.brief_path.relative_to(ROOT)), "orchestrator-log.md", "index.html", "supervisor-state.json"]
    subprocess.run(["git", "add", "--", *paths], cwd=ROOT, check=False)
    number, slug = parse_name(worker.brief_path)
    completed = subprocess.run(
        ["git", "commit", "-m", f"Add experiment {number:02d} {slug}"],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )
    if completed.returncode:
        log(f"COMMIT FAILED {worker.experiment.name}: {completed.stderr.strip() or completed.stdout.strip()}")
    else:
        log(f"COMMIT OK {worker.experiment.name}: {completed.stdout.splitlines()[0]}")


def finish(worker: Worker, returncode: int) -> None:
    worker.log_stream.close()
    readme = worker.experiment / "README.md"
    quota = worker.harness == "claude-opus" and is_quota_failure(worker)
    if quota:
        state["claude_disabled"] = True
        log(f"CLAUDE DISABLED after quota/credit failure in {worker.experiment.name}; this and every later brief will use Codex")
        requeue(worker, "Claude quota or credit failure")
        save_state()
        return
    if not readme.exists():
        log(f"README MISSING {worker.experiment.name} after worker exit {returncode}")
        if worker.attempt < 3:
            requeue(worker, f"worker exited {returncode} without README")
            save_state()
            return
        failure_readme(worker, f"worker exited {returncode} without README")
    destination = DONE / worker.brief_path.name
    if worker.brief_path.exists():
        worker.brief_path.replace(destination)
    worker.brief_path = destination
    state["completed"] = int(state.get("completed", 0)) + 1
    save_state()
    log(f"FINISH {worker.experiment.name} via {worker.harness}, exit {returncode}, README {'present' if readme.exists() else 'synthesized'}")
    git_commit(worker)
    queue_refreshes()
    subprocess.run(["python3", "scripts/build_index.py"], cwd=ROOT, check=False)


def reap() -> None:
    for pid, worker in list(workers.items()):
        returncode = worker.process.poll()
        if returncode is not None:
            del workers[pid]
            finish(worker, returncode)
            continue
        if time.time() - worker.started > STALL_SECONDS and not (worker.experiment / "README.md").exists():
            try:
                os.killpg(worker.process.pid, signal.SIGTERM)
                worker.process.wait(timeout=30)
            except Exception:
                try:
                    os.killpg(worker.process.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
            worker.log_stream.close()
            del workers[pid]
            requeue(worker, "three-hour stall without README")
            save_state()


def pending() -> list[Path]:
    return sorted(QUEUE.glob("[0-9]*-*.md"), key=lambda path: parse_name(path)[0])


def recover_orphaned_running() -> None:
    for path in RUNNING.glob("[0-9]*-*.md"):
        destination = QUEUE / path.name
        path.replace(destination)
        log(f"RECOVER {path.name}: prior supervisor stopped; returned running brief to queue")


def stop_handler(signum, frame) -> None:
    global stopping
    stopping = True
    log(f"STOP signal {signum}; terminating {len(workers)} active workers")


def stop_workers() -> None:
    for worker in workers.values():
        try:
            os.killpg(worker.process.pid, signal.SIGTERM)
        except ProcessLookupError:
            pass
    deadline = time.time() + 20
    for worker in workers.values():
        timeout = max(0, deadline - time.time())
        try:
            worker.process.wait(timeout=timeout)
        except subprocess.TimeoutExpired:
            try:
                os.killpg(worker.process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
        worker.log_stream.close()


def main() -> None:
    PID_PATH.write_text(f"{os.getpid()}\n")
    signal.signal(signal.SIGTERM, stop_handler)
    signal.signal(signal.SIGINT, stop_handler)
    recover_orphaned_running()
    subprocess.run(["python3", "scripts/build_index.py"], cwd=ROOT, check=False)
    log(f"SUPERVISOR START pid {os.getpid()}; stop with: kill $(cat {PID_PATH})")
    try:
        while not stopping:
            reap()
            queue_refreshes()
            available = pending()
            if not available and not workers:
                generate_more()
                available = pending()
            while available and len(workers) < CONCURRENCY:
                launch(available.pop(0))
            time.sleep(POLL_SECONDS)
    finally:
        stop_workers()
        subprocess.run(["python3", "scripts/build_index.py"], cwd=ROOT, check=False)
        try:
            PID_PATH.unlink()
        except FileNotFoundError:
            pass
        log("SUPERVISOR STOPPED")


if __name__ == "__main__":
    main()
