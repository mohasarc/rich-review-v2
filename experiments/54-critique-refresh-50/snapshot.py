"""Record a bounded review cohort; never writes outside this experiment."""
from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import sys

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
HEADINGS = ["Entry point", "Kind", "Subjects", "Declared choices", "What I tried",
            "What I would drop", "What I would do next", "Time spent"]

def digest(p):
    return sha256(p.read_bytes()).hexdigest()

records = []
for folder in sorted((ROOT / "experiments").iterdir()):
    if not folder.is_dir():
        continue
    readme = folder / "README.md"
    text = readme.read_text() if readme.exists() else ""
    records.append({
        "experiment": folder.name,
        "readme_present": readme.exists(),
        "readme_sha256": digest(readme) if readme.exists() else None,
        "required_headings_missing": [h for h in HEADINGS if "## " + h not in text],
        "queue_done": (ROOT / "queue/done" / (folder.name + ".md")).exists(),
        "queue_running": (ROOT / "queue/running" / (folder.name + ".md")).exists(),
        "entry_candidates": [p.name for p in sorted(folder.glob("*.html"))],
    })
result = {
    "captured_utc": datetime.now(timezone.utc).isoformat(),
    "definition": "Root README exists; independently record contract and queue status. This is a handoff marker, not a quality or completion verdict.",
    "own_folder_excluded_from_cohort": OUT.name,
    "records": records,
}
target = OUT / (sys.argv[1] if len(sys.argv) > 1 else "scope-start.json")
target.write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps({"path": str(target), "readme_count_excluding_self": sum(r["readme_present"] and r["experiment"] != OUT.name for r in records), "incomplete_readmes": [r["experiment"] for r in records if r["readme_present"] and r["required_headings_missing"]]}))
