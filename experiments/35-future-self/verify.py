#!/usr/bin/env python3
"""Check the portable artifact's local links, source anchors, and pinned diff."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import hashlib
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parent


class Scan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        fields = dict(attrs)
        if "id" in fields:
            self.ids.append(fields["id"])
        if tag in ("a", "link", "script"):
            value = fields.get("href", fields.get("src"))
            if value:
                self.links.append(value)


pages = [ROOT / "index.html", *(ROOT / "evidence").glob("*.html")]
scans = {}
errors = []
for path in pages:
    scan = Scan()
    scan.feed(path.read_text())
    scans[path.resolve()] = scan

for path, scan in scans.items():
    if len(scan.ids) != len(set(scan.ids)):
        errors.append(f"Duplicate IDs in {path}")
    for href in scan.links:
        url = urlsplit(href)
        if url.scheme or url.netloc:
            errors.append(f"Unexpected external dependency/link in offline page: {href}")
            continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if not target.exists():
            errors.append(f"Missing file: {target}")
        elif url.fragment and target in scans and url.fragment not in scans[target].ids:
            errors.append(f"Missing anchor: {target}#{url.fragment}")

metadata = json.loads((ROOT / "evidence/manifest.json").read_text())
inventory = json.loads((ROOT / "evidence/inventory.json").read_text())
patch = (ROOT / "evidence/diff.patch").read_bytes()
canonical = subprocess.check_output([
    "git", "-C", str(ROOT.parent.parent / "worktrees/pr-148-head"),
    "diff", metadata["base"], metadata["head"],
])
if patch != canonical:
    errors.append("Pinned Git diff differs from the bundled patch")
if len(inventory) != 153 or any(not item["decisions"] for item in inventory):
    errors.append("Incomplete changed-file mapping")

report = {
    "html_pages": len(scans),
    "pinned_sources": len(metadata["sources"]),
    "changed_file_mappings": len(inventory),
    "patch_matches_pinned_git_diff": patch == canonical,
    "patch_sha256": hashlib.sha256(patch).hexdigest(),
    "errors": errors,
}
print(json.dumps(report, indent=2))
sys.exit(bool(errors))
