"""Check the critique's receipts and structure, not symnav behavior."""
import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent
checks = []


def check(name, condition, detail=None):
    checks.append({"check": name, "ok": bool(condition), "detail": detail})


seal = json.loads((ROOT / "blind-seal.json").read_text())
changed = [name for name, digest in seal["files"].items()
           if hashlib.sha256((ROOT / name).read_bytes()).hexdigest() != digest]
check("sealed page-only files unchanged", not changed, {"files": len(seal["files"]), "changed": changed})

rows = json.loads((ROOT / "comparisons.json").read_text())
review = (ROOT / "review.md").read_text()
table_rows = [line for line in review.splitlines() if line.startswith("| [")]
expected_folders = {f"{i:02d}" for i in range(1, 38)} | {"40"}
check("40 standalone rows with unique ids", len(rows) == 40 and len({r["id"] for r in rows}) == 40)
check("38 finished page-producing experiments covered", {r["folder"][:2] for r in rows} == expected_folders)
check("one four-column comparison table", len(table_rows) == 40
      and sum(line.startswith("| --- |") for line in review.splitlines()) == 1
      and all(line.count("|") == 5 for line in table_rows))
expected_lines = []
for row in rows:
    label = re.sub(r"^\d+-", "", row["folder"])
    expected_lines.append(
        f"| [{row['id']} · {label}](../{row['folder']}/{row.get('entry', 'index.html')})"
        f"<br>{row['subject']} | {row['learned']} | {row['after']} | {row['r4']} |")
check("table agrees with structured comparisons", table_rows == expected_lines)
check("two named rule-4 route flags", [r["id"] for r in rows if r["r4"].startswith("**Flag")] == ["23", "29"])

broken = []
for name in ["README.md", "review.md", "source-witnesses.md", "post-diff-rechecks.md"]:
    content = (ROOT / name).read_text()
    for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", content):
        if re.match(r"[a-z]+://", target):
            continue
        path, _, anchor = unquote(target).partition("#")
        dest = (ROOT / path).resolve() if path else ROOT / name
        if not dest.exists():
            broken.append(f"{name}: {target}")
        elif anchor and dest.suffix == ".md":
            text = dest.read_text()
            if f'id="{anchor}"' not in text:
                broken.append(f"{name}: missing anchor {target}")
check("authored artifact links and witness anchors resolve", not broken, broken)

headings = re.findall(r"^## (.+)$", (ROOT / "README.md").read_text(), re.M)
check("README section-7 headings", headings == ["Entry point", "Kind", "Subjects", "Declared choices",
      "What I tried", "What I would drop", "What I would do next", "Time spent"])
choice_labels = ["Role framing", "Box lenses", "Opening style", "Shape", "Navigation", "Trust posture",
                 "Persona", "Representations used", "Importance rule", "Inputs used (beyond bundle)",
                 "Tech", "Built on earlier experiment(s)"]
readme = (ROOT / "README.md").read_text()
check("all required declared choices", all(f"- {label}:" in readme for label in choice_labels))
check("received brief retained", (ROOT / "brief.md").read_text().startswith("# Brief 48 — fresh-reader-refresh-40"))

manifest = json.loads((ROOT / "source-check/manifest.json").read_text())
wrong_diffs = [subject for subject, data in manifest["subjects"].items()
               if hashlib.sha256((ROOT / "source-check" / subject / "copy-aware.patch").read_bytes()).hexdigest()
               != data["copy_aware_sha256"]]
check("pinned extracted diff hashes", not wrong_diffs, wrong_diffs)
check("source capture follows blind seal", manifest["captured_at"] > seal["sealed_at"])
context = json.loads((ROOT / "source-check/context/manifest.json").read_text())
wrong_context = [r["file"] for r in context["files"]
                 if hashlib.sha256((ROOT / "source-check/context" / r["file"]).read_bytes()).hexdigest() != r["sha256"]]
check("pinned context hashes", not wrong_context, {"files": len(context["files"]), "changed": wrong_context})

entries = json.loads((ROOT / "page-captures/entries.json").read_text())
routes = json.loads((ROOT / "page-captures/routes1.json").read_text())
first = next(r["text"] for r in entries if r["name"].startswith("33-"))
second = next(r["text"] for r in routes if r["url"].endswith("/failure.html"))
marker = "01 / THE WHOLE CHANGE"
check("33 common rendered body is identical", marker in first and marker in second
      and first.split(marker, 1)[1] == second.split(marker, 1)[1])

tests = (ROOT / "source-check/pr-127/tests.patch").read_text()
added = len(re.findall(r'^\+[ \t]+it\(', tests, re.M))
removed = re.findall(r'^-[ \t]+.*(?:expect\(|it\()', tests, re.M)
check("127 test-count statement matches diff", added == 10 and not removed,
      {"added_it_declarations": added, "removed_test_or_assertion_lines": removed})
end = json.loads((ROOT / "census-end.json").read_text())
check("newly finished artifacts are critiques", all(r["kind"].lower().startswith("critique")
      for r in end["newly_finished_after_cutoff"]), end["newly_finished_after_cutoff"])

result = {"checked_at": datetime.now(timezone.utc).isoformat(), "checks": checks,
          "ok": all(c["ok"] for c in checks),
          "limits": "Artifact consistency checks only. No symnav test run, usability score, or exhaustive decision-coverage proof."}
(ROOT / "verification.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
for c in checks:
    print(("OK " if c["ok"] else "FAIL ") + c["check"])
raise SystemExit(0 if result["ok"] else 1)
