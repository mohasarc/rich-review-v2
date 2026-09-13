"""Record a bounded finished corpus without changing another experiment."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import sys

OUT = Path(__file__).resolve().parent
ROOT = OUT.parent.parent
records = []
for folder in sorted((ROOT / "experiments").iterdir()):
    if not folder.is_dir() or folder == OUT:
        continue
    readme = folder / "README.md"
    records.append({
        "experiment": folder.name,
        "readme_present": readme.is_file(),
        "queue_done": (ROOT / "queue" / "done" / (folder.name + ".md")).is_file(),
        "readme_sha256": hashlib.sha256(readme.read_bytes()).hexdigest() if readme.is_file() else None,
        "readme_modified_utc": datetime.fromtimestamp(readme.stat().st_mtime, timezone.utc).isoformat() if readme.is_file() else None,
    })
payload = {"captured_utc": datetime.now(timezone.utc).isoformat(), "completion_rule": "README exists; queue done recorded separately", "records": records}
destination = OUT / (sys.argv[1] if len(sys.argv) > 1 else "scope-start.json")
destination.write_text(json.dumps(payload, indent=2) + "\n")
print(json.dumps({"file": str(destination), "finished": sum(r["readme_present"] for r in records), "unfinished": [r["experiment"] for r in records if not r["readme_present"]]}))
