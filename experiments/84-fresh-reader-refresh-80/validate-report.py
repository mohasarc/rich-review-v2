"""Check the artifact's coverage, seals, provenance, and local navigation."""
import hashlib
import json
import re
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

OUT = Path(__file__).resolve().parent


class Document(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.ids, self.hrefs = [], []
        self.tables = self.rows = 0
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a" and "href" in attrs:
            self.hrefs.append(attrs["href"])
        self.tables += tag == "table"
        self.rows += tag == "tr"


checks = []


def check(name, condition):
    assert condition, name
    checks.append(name)


rows = json.loads((OUT / "comparison.json").read_text())
keys = [r["key"] for r in rows]
captures = json.loads((OUT / "capture-manifest.json").read_text())["read_texts"]
check("70 unique rows match every captured teaching surface", len(rows) == len(set(keys)) == 70 and set(keys) == {Path(c["read"]).stem for c in captures})
for capture in captures:
    check("capture intact: " + capture["read"], hashlib.sha256((OUT / "reads" / capture["read"]).read_bytes()).hexdigest() == capture["sha256"])
seal = json.loads((OUT / "phase-seal.json").read_text())
check("page-only recall still matches its pre-source seal", hashlib.sha256((OUT / "cold-notes.md").read_bytes()).hexdigest() == seal["cold_notes_sha256"])
frozen = json.loads((OUT / "inventory.json").read_text())["experiments"]
finished = {e["experiment"] for e in frozen if e["done"]}
covered = {Path(r["page"]).parts[1] for r in rows}
check("all compared surfaces belonged to finished experiments at the cutoff", covered <= finished)
check("63 teaching experiments from 80 finished handoffs", len(covered) == 63 and len(finished) == 80)
check("direct witnesses restricted to operated 23 and 29", {r["key"] for r in rows if r["flag"]} == {"23-zoom-canvas", "29-refusal"})
for receipt in json.loads((OUT / "source/receipt-manifest.json").read_text()):
    check("source receipt intact: " + receipt["file"], hashlib.sha256((OUT / "source" / receipt["file"]).read_bytes()).hexdigest() == receipt["sha256"])

docs = {name: Document((OUT / name).read_text()) for name in ["index.html", "evidence.html"]}
check("one HTML comparison table with 70 body rows", docs["index.html"].tables == 1 and docs["index.html"].rows == 71)
check("receipt page adds no second comparison table", docs["evidence.html"].tables == 0)
for name, doc in docs.items():
    check("unique anchors in " + name, len(doc.ids) == len(set(doc.ids)))
    for href in doc.hrefs:
        url = urlsplit(href)
        check("local navigation: " + href, not url.scheme and not url.netloc)
        target = (OUT / unquote(url.path)).resolve() if url.path else OUT / name
        check("link target exists: " + href, target.exists())
        if url.fragment and target.name in docs and target.parent == OUT:
            check("anchor exists: " + href, unquote(url.fragment) in docs[target.name].ids)

readme = (OUT / "README.md").read_text()
headings = re.findall(r"^#{1,2} .+$", readme, re.M)
check("README uses required section-7 headings", headings == ["# fresh-reader-refresh-80", "## Entry point", "## Kind", "## Subjects", "## Declared choices", "## What I tried", "## What I would drop", "## What I would do next", "## Time spent"])
check("Markdown table contains 70 body rows", len(re.findall(r"^\|", (OUT / "review.md").read_text(), re.M)) == 72)
result = {"validated_utc": datetime.now(timezone.utc).isoformat(), "checks_passed": len(checks), "surface_rows": len(rows), "finished_experiments": len(finished), "teaching_experiments": len(covered), "direct_rule4_pages": 2, "checks": checks, "limits": "Artifact integrity/navigation only; no Symnav correctness tests or comprehension experiment."}
(OUT / "validation.json").write_text(json.dumps(result, indent=2) + "\n")
print(f"Passed artifact checks: {len(checks)}; 70 rows, 63 teaching experiments, 2 directly witnessed rule-4 pages.")
