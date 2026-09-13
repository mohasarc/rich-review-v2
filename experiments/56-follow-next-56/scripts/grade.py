#!/usr/bin/env python3
"""Blind grading of reader answers by two isolated grader sessions per arm.

  python3 scripts/grade.py sheets            # anonymized sheets + hidden mapping
  python3 scripts/grade.py run --arm 127     # two grader sessions
  python3 scripts/grade.py merge             # agreement, disagreements, final grades (+ grading/resolutions.json)
"""
import argparse
import hashlib
import json
import random
import re
import secrets
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
STUDY = json.loads((HERE / "study.json").read_text())
GRADERS = ("A", "B")
ROWS = {"a": "ping", "b": "stop", "c": "execute", "d": "result-fetch", "e": "terminate"}

SYSTEM = (
    "You grade short technical predictions against an answer key and rubric. Judge only whether each prediction states the key's facts. "
    "Ignore style, hedging words, confidence and extra detail unless the extra detail contradicts the key. You cannot open files or run code. "
    "Reply with JSON only."
)


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def collect(arm: str) -> list:
    items = []
    for stage_file in sorted((HERE / "readers" / arm).glob("*/*/stage*.json")):
        condition, reader, stage = stage_file.parent.parent.name, stage_file.parent.name, stage_file.stem
        record = json.loads(stage_file.read_text())
        answers = (record.get("answers") or {}).get("answers", [])
        by_id = {a.get("id"): a for a in answers}
        label = "repeat" if stage == "stage2" else condition
        for question in STUDY["arms"][arm]["questions"]:
            answer = by_id.get(question["id"], {})
            items.append({
                "arm": arm, "condition": label, "reader": reader, "stage": stage, "question": question["id"],
                "prediction": answer.get("prediction", ""), "basis": answer.get("basis", ""),
                "quote": answer.get("quote", ""), "confidence": answer.get("confidence"),
            })
    return items


def sheets():
    for arm in STUDY["arms"]:
        items = collect(arm)
        folder = HERE / "grading" / arm
        folder.mkdir(parents=True, exist_ok=True)
        for item in items:
            item["item"] = secrets.token_hex(3)
        (folder / "mapping.json").write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n")
        for grader in GRADERS:
            order = items[:]
            random.Random(f"{arm}-{grader}-{secrets.token_hex(4)}").shuffle(order)
            by_question = {}
            for item in order:
                by_question.setdefault(item["question"], []).append({"item": item["item"], "prediction": item["prediction"]})
            (folder / f"sheet-{grader}.json").write_text(json.dumps(by_question, indent=2, ensure_ascii=False) + "\n")
        print(arm, len(items), "items")


def prompt(arm: str, grader: str) -> str:
    sheet = json.loads((HERE / "grading" / arm / f"sheet-{grader}.json").read_text())
    parts = ["Grade every item. Each item is one reader's prediction for the question it is listed under.\n"]
    for question in STUDY["arms"][arm]["questions"]:
        parts.append(f"## {question['id']}\nQuestion: {question['text']}\nKey: {question['key']}\ncorrect: {question['full']}\npartial: {question['partial']}\nincorrect: {question['incorrect']}")
        if question.get("row_scoring"):
            parts.append("For this question also mark each row a-e true only if that row's set of required matches is exactly the key's set for that row.")
        parts.append("Items:\n" + json.dumps(sheet.get(question["id"], []), ensure_ascii=False, indent=1))
    parts.append('Reply with only this JSON: {"grades":[{"item":"<id>","grade":"correct|partial|incorrect","note":"<at most 15 words>"}]} '
                 'For question items that require rows, add "rows":{"a":true,"b":false,"c":true,"d":true,"e":false}. One entry per item.')
    return "\n\n".join(parts)


def run(arm: str):
    folder = HERE / "grading" / arm
    for grader in GRADERS:
        target = folder / f"grades-{grader}.json"
        if target.exists():
            print(arm, grader, "exists")
            continue
        cwd = Path(f"/tmp/rr56-graders/{arm}-{grader}")
        cwd.mkdir(parents=True, exist_ok=True)
        text = prompt(arm, grader)
        (folder / f"prompt-{grader}.md").write_text(text)
        command = ["claude", "-p", "--model", STUDY["model"], "--tools", "", "--safe-mode", "--strict-mcp-config",
                   "--system-prompt", SYSTEM, "--output-format", "json"]
        for attempt in range(1, 4):
            proc = subprocess.run(command, input=text, capture_output=True, text=True, cwd=cwd, timeout=3600)
            try:
                result = json.loads(proc.stdout)
            except json.JSONDecodeError:
                result = {"is_error": True, "result": proc.stdout[-2000:]}
            match = re.search(r"\{.*\}", result.get("result", ""), re.S)
            grades = None
            if match:
                try:
                    grades = json.loads(match.group(0))
                except json.JSONDecodeError:
                    grades = None
            if grades and not result.get("is_error"):
                break
            time.sleep(10)
        record = {"grader": grader, "finished_at": now(), "attempts": attempt, "session_id": result.get("session_id"),
                  "cost_usd": result.get("total_cost_usd"), "grades": grades, "raw": result.get("result", "")}
        target.write_text(json.dumps(record, indent=2, ensure_ascii=False) + "\n")
        print(arm, grader, "graded", len((grades or {}).get("grades", [])), "items; attempts", attempt)


def normalize(text: str) -> str:
    text = text.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"').replace("—", "-").replace("–", "-")
    return re.sub(r"\s+", " ", text).strip().lower()


def shown_text(arm: str, condition: str) -> str:
    if condition == "guess":
        return ""
    variant = "original" if condition == "original" else "promoted"
    name = f"{arm}-{variant}-top.txt" if arm == "127" else f"{arm}-{variant}-root.txt"
    return normalize((HERE / "captures" / name).read_text())


def row_grade(rows: dict) -> str:
    right = sum(1 for key in ROWS if rows.get(key) is True)
    return "correct" if right == 5 else "partial" if right >= 3 else "incorrect"


def merge():
    resolutions_path = HERE / "grading" / "resolutions.json"
    resolutions = json.loads(resolutions_path.read_text()) if resolutions_path.exists() else {}
    summary = {}
    for arm in STUDY["arms"]:
        folder = HERE / "grading" / arm
        items = json.loads((folder / "mapping.json").read_text())
        graded = {g: {x["item"]: x for x in json.loads((folder / f"grades-{g}.json").read_text())["grades"]["grades"]} for g in GRADERS}
        original_text, promoted_text = shown_text(arm, "original"), shown_text(arm, "promoted")
        disagreements, final = [], []
        for item in items:
            question = next(q for q in STUDY["arms"][arm]["questions"] if q["id"] == item["question"])
            votes = {}
            for g in GRADERS:
                entry = graded[g].get(item["item"], {})
                grade = entry.get("grade")
                if question.get("row_scoring") and isinstance(entry.get("rows"), dict):
                    grade = row_grade(entry["rows"])
                votes[g] = {"grade": grade, "note": entry.get("note"), "rows": entry.get("rows")}
            agreed = votes["A"]["grade"] == votes["B"]["grade"] and votes["A"]["grade"] is not None
            resolution = resolutions.get(item["item"])
            grade = votes["A"]["grade"] if agreed else (resolution or {}).get("grade")
            if not agreed:
                disagreements.append({"item": item["item"], "arm": arm, "question": item["question"], "prediction": item["prediction"], "votes": votes, "resolution": resolution})
            quote = normalize(item.get("quote") or "")
            seen = shown_text(arm, item["condition"])
            quote_on_shown_page = bool(quote) and quote.rstrip(".") in seen
            quote_from_promoted_sentence = bool(quote) and item["condition"] in ("promoted", "repeat") and quote.rstrip(".") in promoted_text and quote.rstrip(".") not in original_text
            final.append(item | {"votes": votes, "agreed": agreed, "grade": grade,
                                 "page_supported": item.get("basis") == "page" and quote_on_shown_page,
                                 "quote_on_shown_page": quote_on_shown_page,
                                 "quote_from_promoted_sentence": quote_from_promoted_sentence})
        (folder / "final.json").write_text(json.dumps(final, indent=2, ensure_ascii=False) + "\n")
        (folder / "disagreements.json").write_text(json.dumps(disagreements, indent=2, ensure_ascii=False) + "\n")
        agreed_count = sum(1 for x in final if x["agreed"])
        summary[arm] = {"items": len(final), "grader_agreement": f"{agreed_count}/{len(final)}", "unresolved": sum(1 for d in disagreements if not d["resolution"])}
    (HERE / "grading" / "summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["sheets", "run", "merge"])
    parser.add_argument("--arm")
    args = parser.parse_args()
    {"sheets": sheets, "merge": merge}.get(args.action, lambda: run(args.arm))()
