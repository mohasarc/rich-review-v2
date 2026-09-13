"""Integrity and explanatory-surface checks; no verdict about symnav correctness."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import hashlib
import html
import json
import re

from content import BASE, HEAD, DECISIONS, EXCERPTS, CREDITS

HERE = Path(__file__).resolve().parent


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.tags = []
        self.parents = []
        self.decision_ids = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append(tag)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for key in ["href", "src"]:
            if key in attrs:
                self.links.append(attrs[key])
        if attrs.get("data-parents"):
            self.parents.append((attrs.get("id"), attrs["data-parents"].split()))
        if "decision" in attrs.get("class", "").split():
            self.decision_ids.append(attrs["id"])


def read(path):
    return json.loads(path.read_text())


def verify():
    doc = (HERE / "index.html").read_text()
    page = Page()
    page.feed(doc)
    checks = []
    duplicates = [key for key, count in Counter(page.ids).items() if count > 1]
    assert not duplicates, duplicates
    assert page.decision_ids == [d["id"] for d in DECISIONS]
    assert all(d["status"] in ("stated", "unexplained") and d["fact"] and d["reason"] for d in DECISIONS)
    checks.append("12 visible decision records have facts, reasons, and valid reason status; IDs are unique")
    for link in page.links:
        parsed = urlsplit(link)
        if parsed.scheme:
            assert parsed.scheme == "data", link
            continue
        target = (HERE / unquote(parsed.path)).resolve() if parsed.path else HERE / "index.html"
        if target == HERE / "README.md" and not target.exists():
            continue
        assert target.exists(), link
        if parsed.fragment:
            other = page
            if target != HERE / "index.html":
                other = Page()
                other.feed(target.read_text())
            assert unquote(parsed.fragment) in other.ids, link
    checks.append("All asset, credit, local-source, and in-page links resolve (README is checked when present)")
    snapshots = read(HERE / "evidence/snapshots.json")
    for entry in snapshots.values():
        actual = (HERE / "evidence" / entry["local"]).read_bytes()
        assert actual.decode() == entry["text"]
        assert hashlib.sha256(actual).hexdigest() == entry["sha256"]
    for eid, key, start, end, _ in EXCERPTS:
        expected = snapshots[key]["text"].splitlines()[start-1:end]
        lines = []
        for n in range(start, end + 1):
            match = re.search(rf'<span id="L-{re.escape(eid)}-{n}"><i aria-hidden="true">{n}</i>(.*?)</span>', doc)
            assert match, (eid, n)
            lines.append(html.unescape(match.group(1)))
        assert lines == expected, eid
    checks.append(f"{len(snapshots)} frozen source documents and all 32 rendered excerpts match their recorded bytes")
    coverage = read(HERE / "evidence/coverage.json")
    ids = {d["id"] for d in DECISIONS}
    assigned = []
    for hunk in coverage["hunks"]:
        assert set(hunk["decisions"]) <= ids
        assigned.extend(hunk["changedPatchLines"])
    patch = (HERE / "evidence/diff.patch").read_text().splitlines()
    changed = [i for i, line in enumerate(patch, 1) if line[:1] in ("+", "-") and not line.startswith(("+++", "---"))]
    assert sorted(assigned) == changed
    assert coverage["added"] == 391 and coverage["removed"] == 67
    checks.append("Every +391/-67 changed line in all 15 hunks maps to overview decisions")
    pyramid = read(HERE / "evidence/pyramid-map.json")
    for section, parents in page.parents:
        assert set(parents) <= ids
        assert pyramid["sections"][section] == parents
    for d in DECISIONS:
        assert d["target"] in page.ids
        assert all("e-" + source in page.ids for source in d["sources"])
    checks.append("Every mechanism has named overview parents; every decision has mechanism and source exits")
    tour = read(HERE / "evidence/request-original.json")
    assert tour["sameSemanticOutput"] is True
    assert tour["versions"]["base"]["sha"] == BASE and tour["versions"]["head"]["sha"] == HEAD
    assert tour["versions"]["base"]["result"] == tour["versions"]["head"]["result"]
    assert len(tour["versions"]["head"]["frames"]) == 8
    lab = read(HERE / "evidence/lifecycle-original.json")["runs"]
    for name, run in lab.items():
        for side, sha in [("base", BASE), ("head", HEAD)]:
            assert run[side]["provenance"]["sha"] == sha
            if name.startswith("release"):
                frames = {s["id"]: s for s in run[side]["steps"]}
                assert all(c["size"] == 0 for c in frames["cleared"]["caches"])
                assert frames["boundary"]["release"]["backend"] == ("fulfilled" if side == "base" else "pending")
                if name == "release-reject":
                    assert frames["settled"]["release"]["backend"] == ("fulfilled" if side == "base" else "rejected")
    checks.append("Recorded opening and release observations match the source data; revisions and fixture-output equality are retained")
    census = read(HERE / "evidence/review-census.json")
    assert {r["experiment"] for r in census["reviewed"]} == {row[0] for row in CREDITS}
    assert len(CREDITS) == 13 and all("credit-" + row[0][:2] in page.ids for row in CREDITS)
    checks.append("All 13 finished pr-127 predecessors have a visible, specific contribution and source link")
    assert not {"form", "textarea"} & set(page.tags)
    js = (HERE / "app.js").read_text()
    assert not re.search(r'localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon|WebSocket', js)
    checks.append("No form, comment collection, browser storage, or network API in the reading surface")
    if (HERE / "README.md").exists():
        readme = (HERE / "README.md").read_text()
        for heading in ["Entry point", "Kind", "Subjects", "Declared choices", "What I tried", "What I would drop", "What I would do next", "Time spent"]:
            assert f"## {heading}" in readme
        checks.append("README has every mandated front-section heading")
    report = dict(checks=checks, passed=True, limits="Integrity and author-assigned parent checks do not prove semantic completeness or human understanding. No symnav tests executed here.")
    (HERE / "verification.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    verify()
