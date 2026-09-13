from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import hashlib
import json
import re

OUT = Path(__file__).resolve().parent.parent


class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a" and "href" in attrs:
            self.links.append(attrs["href"])


errors = []
docs = {}
for name in ["index.html", "evidence.html"]:
    doc = Document()
    doc.feed((OUT / name).read_text())
    docs[name] = doc
    if len(doc.ids) != len(set(doc.ids)):
        errors.append(f"Duplicate ids: {name}")
links = 0
for name, doc in docs.items():
    for link in doc.links:
        parts = urlsplit(link)
        if parts.scheme:
            continue
        target = (OUT / (unquote(parts.path) or name)).resolve()
        links += 1
        if not target.exists():
            errors.append(f"Missing file: {name} → {link}")
        if parts.fragment and target.parent == OUT and target.name in docs:
            if unquote(parts.fragment) not in docs[target.name].ids:
                errors.append(f"Missing anchor: {name} → {link}")

rows = json.loads((OUT / "comparisons.json").read_text())
assert len(rows) == 47
assert len({r["id"] for r in rows}) == 47
assert {r["id"] for r in rows if r["flag"]} == {"04", "23", "27-131"}
assert len({r["folder"] for r in rows if r["id"] != "39-meta"}) == 38

seal = json.loads((OUT / "blind-seal.json").read_text())
for file, digest in seal["files"].items():
    if hashlib.sha256((OUT / file).read_bytes()).hexdigest() != digest:
        errors.append(f"Changed sealed file: {file}")

sources = json.loads((OUT / "evidence/source-index.json").read_text())
for s in sources:
    file = OUT / "evidence" / s["snapshot"]
    if hashlib.sha256(file.read_bytes()).hexdigest() != s["sha256"]:
        errors.append(f"Source hash mismatch: {s['snapshot']}")

for f in json.loads((OUT / "evidence/findings.json").read_text()):
    for s in f["sources"]:
        count = len((OUT / "evidence" / s["file"]).read_text().splitlines())
        if not 1 <= s["start"] <= min(s["end"], count):
            errors.append(f"Invalid excerpt: {f['id']} {s}")

expected = ["# fresh-reader-refresh-30", "## Entry point", "## Kind", "## Subjects", "## Declared choices", "## What I tried", "## What I would drop", "## What I would do next", "## Time spent"]
headings = re.findall(r"^#{1,2} .+$", (OUT / "README.md").read_text(), re.M)
if headings != expected:
    errors.append("README heading contract mismatch")

result = dict(rows=len(rows), subject_experiments=38, rule_4_flags=3, local_links_checked=links, sealed_files_checked=len(seal["files"]), source_hashes_checked=len(sources), errors=errors)
(OUT / "validation.json").write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps(result))
if errors:
    raise SystemExit(1)
