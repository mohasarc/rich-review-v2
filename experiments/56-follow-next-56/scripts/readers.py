#!/usr/bin/env python3
"""Build reader packets, seal the protocol, and run isolated tool-less reader sessions.

  python3 scripts/readers.py packets
  python3 scripts/readers.py seal
  python3 scripts/readers.py run --arm 127 --condition original --count 6 [--parallel 3]
  python3 scripts/readers.py repeat --arm 127 [--parallel 3]
"""
import argparse
import base64
import hashlib
import json
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
STUDY = json.loads((HERE / "study.json").read_text())
MODEL = STUDY["model"]
SANDBOX = Path("/tmp/rr56-readers")

SYSTEM = (
    "You are an experienced software engineer reviewing a code change in a codebase you have never seen. "
    "You cannot open files, browse, or run code; everything available to you is in the messages. "
    "Answer every question with your best concrete prediction. Reply with JSON only, in the format requested."
)

FORMAT = """For each question give:
- "prediction": your concrete answer (at most 80 words)
- "basis": "page" if words on the page support it, otherwise "inference"
- "quote": if basis is "page", the exact words from the page you relied on (at most 30 words); otherwise ""
- "confidence": 0-100

Reply with only this JSON: {"answers":[{"id":"Q1","prediction":"...","basis":"page","quote":"...","confidence":80}]} with one entry per question."""

TOP_FILES = {
    "127": {"text": "captures/127-{variant}-top.txt", "images": ["captures/127-{variant}-top-1.png", "captures/127-{variant}-top-2.png", "captures/127-{variant}-top-3.png"]},
    "148": {"text": "captures/148-{variant}-root.txt", "images": ["captures/148-{variant}-root.png"]},
}


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def questions_block(arm: str) -> str:
    return "Questions:\n" + "\n".join(f"{q['id']}. {q['text']}" for q in STUDY["arms"][arm]["questions"])


def page_blocks(arm: str, variant: str, lead: str) -> list:
    files = TOP_FILES[arm]
    images = [HERE / p.format(variant=variant) for p in files["images"]]
    text = (HERE / files["text"].format(variant=variant)).read_text()
    blocks = [{"type": "text", "text": lead.format(n=len(images))}]
    for image in images:
        blocks.append({"type": "image_path", "path": str(image.relative_to(HERE))})
    blocks.append({"type": "text", "text": f"<page_text>\n{text}</page_text>"})
    return blocks


def build_packets():
    out = HERE / "packets"
    for arm, spec in STUDY["arms"].items():
        folder = out / arm
        folder.mkdir(parents=True, exist_ok=True)
        context = spec["context"]
        guess = [{"type": "text", "text": f"{context}\n\nYou have not seen any explanation of this change. Predict from what you would expect of such code.\n\n{questions_block(arm)}\n\n{FORMAT}"}]
        lead = context + "\n\nBelow is the top part of a review page written to explain this change: the part a reviewer reads before choosing whether to go deeper. You get it twice: as {n} screenshot(s), and as its extracted text."
        packets = {
            "guess": guess,
            "original": page_blocks(arm, "original", lead) + [{"type": "text", "text": f"{questions_block(arm)}\n\n{FORMAT}"}],
            "promoted": page_blocks(arm, "promoted", lead) + [{"type": "text", "text": f"{questions_block(arm)}\n\n{FORMAT}"}],
            "repeat": page_blocks(arm, "promoted", "The review page has since been revised. Below is the revised top part, again as {n} screenshot(s) and as extracted text.")
            + [{"type": "text", "text": "Answer the same questions again from this version, in the same JSON format. You may keep or change any answer.\n\n" + questions_block(arm)}],
        }
        for name, blocks in packets.items():
            (folder / f"{name}.json").write_text(json.dumps({"system": SYSTEM, "content": blocks}, indent=2, ensure_ascii=False) + "\n")
            preview = "\n\n".join(b["text"] if b["type"] == "text" else f"[image: {b['path']}]" for b in blocks)
            (folder / f"{name}.md").write_text(f"<!-- system -->\n{SYSTEM}\n\n<!-- user -->\n{preview}\n")
    print("packets written")


def seal():
    tracked = [HERE / "protocol.md", HERE / "study.json", HERE / "scripts/edits.json", HERE / "pages/manifest.json", HERE / "scripts/readers.py"]
    tracked += sorted((HERE / "packets").rglob("*.json"))
    for arm, files in TOP_FILES.items():
        for variant in ("original", "promoted"):
            tracked.append(HERE / files["text"].format(variant=variant))
            tracked += [HERE / p.format(variant=variant) for p in files["images"]]
    record = {"sealed_at": now(), "files": {str(p.relative_to(HERE)): sha(p) for p in tracked}}
    target = HERE / "seal.json"
    if target.exists():
        raise SystemExit("seal.json exists; refusing to overwrite")
    target.write_text(json.dumps(record, indent=2) + "\n")
    print("sealed", len(record["files"]), "files at", record["sealed_at"])


def materialize(blocks: list) -> list:
    content = []
    for block in blocks:
        if block["type"] == "image_path":
            data = base64.b64encode((HERE / block["path"]).read_bytes()).decode()
            content.append({"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": data}})
        else:
            content.append(block)
    return content


def parse_answers(text: str):
    match = re.search(r"\{.*\}", text, re.S)
    if not match:
        return None
    try:
        return json.loads(match.group(0))
    except json.JSONDecodeError:
        return None


def session(reader_dir: Path, cwd: Path, packet: dict, stage: str, resume: str | None = None):
    command = ["claude", "-p", "--model", MODEL, "--tools", "", "--safe-mode", "--strict-mcp-config",
               "--system-prompt", packet["system"], "--input-format", "stream-json", "--output-format", "stream-json", "--verbose"]
    if resume:
        command += ["--resume", resume]
    message = {"type": "user", "message": {"role": "user", "content": materialize(packet["content"])}}
    started = now()
    for attempt in range(1, 4):
        proc = subprocess.run(command, input=json.dumps(message) + "\n", capture_output=True, text=True, cwd=cwd, timeout=1800)
        events = [json.loads(line) for line in proc.stdout.splitlines() if line.strip().startswith("{")]
        result = next((e for e in events if e.get("type") == "result"), None)
        (reader_dir / f"{stage}.attempt{attempt}.stderr.txt").write_text(proc.stderr)
        if result and not result.get("is_error"):
            break
        time.sleep(10)
    tool_uses = sum(1 for e in events if e.get("type") == "assistant" for c in e.get("message", {}).get("content", []) if c.get("type") == "tool_use")
    lines = []
    for e in events:
        if e.get("type") == "user":
            e = json.loads(json.dumps(e))
            for c in e.get("message", {}).get("content", []):
                if isinstance(c, dict) and c.get("type") == "image":
                    c["source"]["data"] = f"<{len(c['source']['data'])} base64 chars omitted>"
        lines.append(json.dumps(e, ensure_ascii=False))
    (reader_dir / f"{stage}.stream.jsonl").write_text("\n".join(lines) + "\n")
    text = result.get("result", "") if result else ""
    answers = parse_answers(text)
    record = {
        "stage": stage, "started_at": started, "finished_at": now(), "attempts": attempt,
        "session_id": result.get("session_id") if result else None, "model": MODEL,
        "cost_usd": result.get("total_cost_usd") if result else None, "tool_uses": tool_uses,
        "parse_ok": answers is not None, "answers": answers, "raw": text,
    }
    path = reader_dir / f"{stage}.json"
    path.write_text(json.dumps(record, indent=2, ensure_ascii=False) + "\n")
    return record, sha(path)


def run(arm: str, condition: str, count: int, parallel: int):
    packet = json.loads((HERE / "packets" / arm / f"{condition}.json").read_text())
    prefix = {"guess": "G", "original": "O", "promoted": "P"}[condition]

    def one(index: int):
        reader = f"{prefix}{index}"
        reader_dir = HERE / "readers" / arm / condition / reader
        if (reader_dir / "stage1.json").exists():
            return reader, "skip (exists)"
        reader_dir.mkdir(parents=True, exist_ok=True)
        cwd = SANDBOX / f"{arm}-{condition}-{reader}"
        cwd.mkdir(parents=True, exist_ok=True)
        record, digest = session(reader_dir, cwd, packet, "stage1")
        with (HERE / "readers" / "hashes.log").open("a") as log:
            log.write(f"{record['finished_at']} {arm}/{condition}/{reader}/stage1.json {digest}\n")
        return reader, f"parse_ok={record['parse_ok']} tools={record['tool_uses']} cost={record['cost_usd']}"

    with ThreadPoolExecutor(max_workers=parallel) as pool:
        for reader, status in pool.map(one, range(1, count + 1)):
            print(arm, condition, reader, status, flush=True)


def repeat(arm: str, parallel: int):
    packet = json.loads((HERE / "packets" / arm / "repeat.json").read_text())
    readers = sorted((HERE / "readers" / arm / "original").glob("O*"))

    def one(reader_dir: Path):
        if (reader_dir / "stage2.json").exists():
            return reader_dir.name, "skip (exists)"
        first = json.loads((reader_dir / "stage1.json").read_text())
        cwd = SANDBOX / f"{arm}-original-{reader_dir.name}"
        record, digest = session(reader_dir, cwd, packet, "stage2", resume=first["session_id"])
        with (HERE / "readers" / "hashes.log").open("a") as log:
            log.write(f"{record['finished_at']} {arm}/original/{reader_dir.name}/stage2.json {digest}\n")
        return reader_dir.name, f"parse_ok={record['parse_ok']} tools={record['tool_uses']} cost={record['cost_usd']}"

    with ThreadPoolExecutor(max_workers=parallel) as pool:
        for reader, status in pool.map(one, readers):
            print(arm, "repeat", reader, status, flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["packets", "seal", "run", "repeat"])
    parser.add_argument("--arm")
    parser.add_argument("--condition")
    parser.add_argument("--count", type=int, default=1)
    parser.add_argument("--parallel", type=int, default=3)
    args = parser.parse_args()
    if args.action == "packets":
        build_packets()
    elif args.action == "seal":
        seal()
    elif args.action == "run":
        run(args.arm, args.condition, args.count, args.parallel)
    else:
        repeat(args.arm, args.parallel)
