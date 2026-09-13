#!/usr/bin/env python3
"""Check the assigned one-variable constraint and the local source/link record."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import hashlib
import json
import re
from urllib.parse import unquote, urlsplit

HERE = Path(__file__).resolve().parent
OPENING = re.compile(r"<!-- OPENING_START -->[\s\S]*?<!-- OPENING_END -->")


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.ids = []
        self.links = []
        self.structure = []
        self.words = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.structure.append((tag, tuple(attrs)))
        for key, value in attrs:
            if key == "id":
                self.ids.append(value)
            elif key in ["href", "src"]:
                self.links.append(value)

    def handle_endtag(self, tag):
        self.structure.append(("/" + tag, ()))

    def handle_data(self, data):
        self.words.extend(re.findall(r"\S+", data))


def main():
    documents = [(HERE / name).read_text() for name in ["index.html", "failure.html"]]
    openings = [OPENING.findall(page) for page in documents]
    assert all(len(x) == 1 for x in openings), "Exactly one opening region required per page"
    assert openings[0] != openings[1], "Openings must differ"
    bodies = [OPENING.sub("<!-- OPENING -->", page) for page in documents]
    assert bodies[0] == bodies[1], "A difference escaped the opening region"
    assert Page(openings[0][0]).structure == Page(openings[1][0]).structure, "Opening markup must match"
    word_counts = [len(Page(o[0]).words) for o in openings]
    assert abs(word_counts[0] - word_counts[1]) <= 6, f"Opening lengths diverged: {word_counts}"
    checked_links = 0
    for document in documents:
        parsed = Page(document)
        duplicate_ids = [key for key, count in Counter(parsed.ids).items() if count > 1]
        assert not duplicate_ids, f"Duplicate IDs: {duplicate_ids}"
        for link in parsed.links:
            url = urlsplit(link)
            if url.scheme:
                assert url.scheme == "data", f"Unexpected external resource: {link}"
                continue
            if not url.path:
                assert unquote(url.fragment) in parsed.ids, f"Missing fragment: {link}"
            else:
                assert (HERE / unquote(url.path)).exists(), f"Missing local resource: {link}"
            checked_links += 1
    manifest = json.loads((HERE / "evidence-manifest.json").read_text())
    for record in manifest["files"]:
        actual = hashlib.sha256((HERE / record["path"]).read_bytes()).hexdigest()
        assert actual == record["sha256"], f"Evidence changed: {record['path']}"
    patch = (HERE / "evidence/diff.patch").read_text()
    test_delta = patch.split("diff --git a/packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts")[1].split("diff --git", 1)[0]
    removed_test_lines = [line[1:] for line in test_delta.splitlines() if line.startswith("-") and not line.startswith("---")]
    assert all(line.startswith("import ") for line in removed_test_lines), removed_test_lines
    base_tests = (HERE / "evidence/base/packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts").read_text()
    head_tests = (HERE / "evidence/head/packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts").read_text()
    old_start = '  it("shares one reference search across caller and reference projections"'
    assert base_tests[base_tests.index(old_start):] == head_tests[head_tests.index(old_start):], "Existing tests changed"
    decisions = json.loads((HERE / "decisions.json").read_text())
    assert len(decisions) == 10 and {d["status"] for d in decisions} == {"stated", "unexplained"}
    report = {
        "pair_equal_outside_opening": True,
        "opening_element_structure_equal": True,
        "opening_word_counts": dict(zip(["metaphor", "failure"], word_counts)),
        "shared_document_sha256": hashlib.sha256(bodies[0].encode()).hexdigest(),
        "source_files_hash_checked": len(manifest["files"]),
        "local_links_checked_including_duplicates": checked_links,
        "existing_five_service_test_bodies_unchanged": True,
        "decision_count": len(decisions),
        "note": "These are artifact-integrity checks, not a score of explanatory quality. Browser behavior is recorded separately."
    }
    (HERE / "pair-verification.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
