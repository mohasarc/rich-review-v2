"""Check this written handoff and its receipts; not a semantic campaign audit."""
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import unquote
import hashlib
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
scope = json.loads((OUT / "scope-final.json").read_text())
finished = [r for r in scope["records"] if r["readme_present"]]
notes = json.loads((OUT / "ledger-notes.json").read_text())
expected = {f"{n:02d}" for n in range(1, 82)}
readme = (OUT / "README.md").read_text()
headings = re.findall(r"^## (.+)$", readme, re.M)
required_headings = ["Entry point", "Kind", "Subjects", "Declared choices", "What I tried", "What I would drop", "What I would do next", "Time spent"]
fields = ["Role framing", "Box lenses", "Opening style", "Shape", "Navigation", "Trust posture", "Persona", "Representations used", "Importance rule", "Inputs used (beyond bundle)", "Tech", "Built on earlier experiment(s)"]
docs = [OUT / n for n in ["README.md", "critique.md", "experiment-ledger.md", "inspection-notes.md"]]
missing_links = []
link_count = 0
for p in docs:
    for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", p.read_text()):
        if re.match(r"[a-z]+:", target) or target.startswith("#"):
            continue
        relative = unquote(target.split("#")[0].strip("<>"))
        link_count += 1
        if relative == "verification.json":
            continue  # This run writes the promised receipt below.
        if not (p.parent / relative).exists():
            missing_links.append({"file": p.name, "target": target})
captures = []
for name in ["manifest.json", "manifest-selected.json"]:
    captures += json.loads((OUT / "reading" / name).read_text())["entries"]
capture_issues = [e for e in captures if e.get("error") or e.get("errors")]
missing_captures = [e["key"] + suffix for e in captures for suffix in [".json", ".txt", ".png"] if not (OUT / "reading" / (e["key"] + suffix)).exists()]
operations = {}
for name in ["manifest.json", "supplement-manifest.json", "recheck-manifest.json", "80-manifest.json"]:
    d = json.loads((OUT / "operations" / name).read_text())
    operations[name] = {"saved_states": sum("label" in e for e in d["events"]), "issues": [e for e in d["events"] if e.get("error") or e.get("errors")], "errors": d.get("errors", [])}
worktrees = {}
for name in ["stack-head", "main"]:
    cwd = ROOT / "worktrees" / name
    result = subprocess.run(["git", "status", "--porcelain=v1", "--untracked-files=all"], cwd=cwd, capture_output=True, text=True, check=True)
    head = subprocess.run(["git", "rev-parse", "HEAD"], cwd=cwd, capture_output=True, text=True, check=True).stdout.strip()
    worktrees[name] = {"head": head, "porcelain": result.stdout, "clean": not result.stdout}
changed_since_cutoff = []
for r in finished:
    p = OUT.parent / r["experiment"] / "README.md"
    if hashlib.sha256(p.read_bytes()).hexdigest() != r["readme_sha256"]:
        changed_since_cutoff.append(r["experiment"])
checks = {
    "exact_readme_headings": headings == required_headings,
    "readme_title": readme.startswith("# critique-refresh-80\n"),
    "all_declared_fields": all(f"- {f}:" in readme for f in fields),
    "brief_preserved": (OUT / "brief.md").exists(),
    "all_81_finished_handoffs_have_notes": {r["experiment"][:2] for r in finished} == expected == set(notes),
    "all_81_ledger_rows": set(re.findall(r"^\| \[(\d\d)-", (OUT / "experiment-ledger.md").read_text(), re.M)) == expected,
    "local_link_targets_exist": not missing_links,
    "all_80_capture_entries_loaded": len(captures) == 80 and not capture_issues,
    "all_capture_files_present": not missing_captures,
    "fifty_operation_states": sum(d["saved_states"] for d in operations.values()) == 50,
    "completed_operation_runs_clean": all(not d["issues"] and not d["errors"] for n, d in operations.items() if n != "supplement-manifest.json"),
    "both_worktrees_clean": all(d["clean"] for d in worktrees.values()),
    "no_page_entry_created": not list(OUT.glob("*.html")),
}
report = {
    "checked_utc": datetime.now(timezone.utc).isoformat(),
    "scope_cutoff_utc": scope["captured_utc"],
    "purpose": "Structural handoff and receipt checks, not source correctness or human comprehension.",
    "checks": checks,
    "local_links_checked": link_count,
    "missing_links": missing_links,
    "capture_issues": capture_issues,
    "missing_capture_files": missing_captures,
    "operations": operations,
    "known_operator_error": "The supplemental 37 Evidence selector was wrong; recheck-manifest.json records the corrected Evidence depth route.",
    "worktrees": worktrees,
    "readmes_changed_after_cutoff": changed_since_cutoff,
    "document_sha256": {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in docs},
}
(OUT / "verification.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({"passed": sum(checks.values()), "total": len(checks), "failed": [k for k, v in checks.items() if not v], "missing_links": missing_links, "readmes_changed_after_cutoff": changed_since_cutoff}))
raise SystemExit(0 if all(checks.values()) else 1)
