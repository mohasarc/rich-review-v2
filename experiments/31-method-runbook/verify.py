#!/usr/bin/env python3
"""Structural audit of this teaching artifact, not a test of PR correctness."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json

OUT = Path(__file__).resolve().parent


class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.disclosures = 0
        self.visible_decisions = []
        self.forms = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "details": self.disclosures += 1
        if "id" in attrs: self.ids.append(attrs["id"])
        if "href" in attrs: self.links.append(attrs["href"])
        if "data-decision" in attrs:
            assert self.disclosures == 0, "Overview decision hidden in a disclosure"
            self.visible_decisions.append(attrs["data-decision"])
        if tag in ("form", "input", "textarea", "select"): self.forms.append(tag)

    def handle_endtag(self, tag):
        if tag == "details": self.disclosures -= 1


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    manifest = json.loads((OUT / "source-manifest.json").read_text())
    ledger = json.loads((OUT / "ledger.json").read_text())
    coverage = json.loads((OUT / "coverage.json").read_text())
    hunks = json.loads((OUT / "hunks.json").read_text())
    for source in manifest["sources"]:
        assert digest(OUT/source["copy"]) == source["sha256"], source["key"]
    assert digest(OUT / "RUNBOOK.md") == manifest["runbook_v1_sha256"], "Frozen runbook changed"
    for e in ledger["evidence"]:
        expected = '\n'.join((OUT/e["path"]).read_text().splitlines()[e["start"]-1:e["end"]])
        assert expected == e["text"], e["id"]

    docs = {}
    for path in sorted(OUT.glob("*.html")):
        doc = Document(); doc.feed(path.read_text()); docs[path.name] = doc
        assert len(doc.ids) == len(set(doc.ids)), f"Duplicate anchor in {path.name}"
        assert not doc.forms, f"Unexpected input collection in {path.name}"
    links_checked = 0
    for name, doc in docs.items():
        for link in doc.links:
            split = urlsplit(link)
            assert not split.scheme, f"Unexpected external dependency: {link}"
            filename = unquote(split.path) or name
            target = (OUT / filename).resolve()
            assert target.is_relative_to(OUT), f"Link escapes portable experiment: {link}"
            # This report is produced by this script; the browser report must already exist.
            if filename != "validation.json":
                assert target.exists(), f"Missing local target: {name}: {link}"
            if split.fragment:
                assert filename in docs, f"Non-HTML fragment target: {link}"
                assert unquote(split.fragment) in docs[filename].ids, f"Missing anchor: {name}: {link}"
            links_checked += 1

    decisions = {d["id"]: d for d in ledger["decisions"]}
    evidence_ids = {e["id"] for e in ledger["evidence"]}
    claims = {c["id"]: c for c in ledger["claims"]}
    assert set(docs["index.html"].visible_decisions) == set(decisions)
    for d in decisions.values():
        assert d["reason_status"] in ("stated", "unexplained")
        assert d["regions"] and d["evidence"] and d["consequence"]
        if d["reason_status"] == "stated": assert d["reason_evidence"]
        assert set(d["evidence"] + d["reason_evidence"]) <= evidence_ids
        assert d["parent"] in docs["index.html"].ids
        for c in d["claims"]:
            assert claims[c]["parent"] == d["parent"]
            assert claims[c]["announcement"] == d["consequence"]
            assert set(claims[c]["evidence"]) <= evidence_ids
            assert f"claim-{c}" in docs["index.html"].ids
    original = [(h["id"], h["path"], c["side"], c["line"], c["patch_line"], c["text"]) for h in hunks for c in h["changed_lines"]]
    assigned = [(r["hunk"], r["path"], r["side"], r["line"], r["patch_line"], r["text"]) for r in coverage]
    assert Counter(original) == Counter(assigned), "Coverage changed the diff inventory"
    for row in coverage: assert row["decisions"] and set(row["decisions"]) <= set(decisions)
    assert sum(r["side"] == "head" for r in coverage) == 391
    assert sum(r["side"] == "base" for r in coverage) == 67
    headings = [line for line in (OUT/"README.md").read_text().splitlines() if line.startswith("#")]
    required = ["# method-runbook", "## Entry point", "## Kind", "## Subjects", "## Declared choices", "## What I tried", "## What I would drop", "## What I would do next", "## Time spent"]
    assert headings[:len(required)] == required, headings
    assert (OUT / "brief.md").is_file()
    js = (OUT / "index.html").read_text()
    for forbidden in ("localStorage", "sessionStorage", "fetch(", "XMLHttpRequest"):
        assert forbidden not in js
    report = dict(timestamp=datetime.now(timezone.utc).isoformat(), status="passed",
                  source_hashes_checked=len(manifest["sources"]), frozen_runbook_unchanged=True,
                  evidence_excerpts_checked=len(ledger["evidence"]), diff_regions=len(hunks),
                  changed_lines_accounted=len(coverage), additions=391, removals=67,
                  overview_decisions=len(decisions), detail_claims_with_parents=len(claims),
                  local_links_checked=links_checked, html_files=list(docs), no_form_or_storage=True,
                  readme_headings_match=True, tests=ledger["test_delta"],
                  limits=["No PR tests executed", "No semantic completeness or reader-understanding certification",
                          "Pyramid prose checked manually by the author; mappings checked mechanically",
                          "Browser results recorded separately in browser-validation.json"])
    (OUT/"validation.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
