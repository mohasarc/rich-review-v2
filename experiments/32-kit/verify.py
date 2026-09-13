"""Offline checks for the artifact and reusable authoring contracts, not symnav."""

from collections import Counter
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import unittest
from urllib.parse import unquote, urlsplit

import build
from kit.components import Box, BoxDiagram, DecisionCard, Edge, Layer, validate_layers

HERE = Path(__file__).resolve().parent


class Document(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.references = []
        self.tags = []
        self.claims = {}
        self.layers = {}
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append(tag)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if "data-claim" in attrs:
            self.claims[attrs["id"]] = attrs["data-claim"]
        if "data-claims" in attrs:
            self.layers[attrs["id"]] = attrs["data-claims"].split()
        for field in ("href", "src"):
            if field in attrs:
                self.references.append(attrs[field])


class ArtifactContracts(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.documents = {p.resolve(): Document(p) for p in HERE.rglob("*.html")}

    def test_all_local_links_assets_and_fragment_targets_exist(self):
        for path, document in self.documents.items():
            for ref in document.references:
                url = urlsplit(ref)
                if url.scheme or url.netloc:
                    self.assertEqual(url.scheme, "data", f"Unexpected network dependency: {path}: {ref}")
                    continue
                destination = (path.parent / unquote(url.path)).resolve() if url.path else path
                self.assertTrue(destination.is_relative_to(HERE), f"Artifact escapes its own folder: {ref}")
                self.assertTrue(destination.exists(), f"Missing file: {path}: {ref}")
                if url.fragment and destination in self.documents:
                    self.assertIn(unquote(url.fragment), self.documents[destination].ids, f"Missing anchor: {path}: {ref}")

    def test_ids_are_unique_and_pages_have_no_feedback_controls(self):
        for path, document in self.documents.items():
            duplicates = [key for key, count in Counter(document.ids).items() if count > 1]
            self.assertEqual(duplicates, [], str(path))
            self.assertFalse(set(document.tags) & {"form", "textarea", "input", "button"}, str(path))

    def test_every_declared_lower_claim_is_announced_by_its_parent(self):
        manifest = json.loads((HERE / "coverage.json").read_text())
        root = tuple(item["id"] for item in manifest["root_claims"])
        layers = tuple(Layer(item["id"], tuple(item["claims"]), item["parent"]) for item in manifest["layers"])
        validate_layers(root, layers)
        demo = self.documents[(HERE / "index.html").resolve()]
        self.assertEqual(set(demo.claims.values()), set(root))
        self.assertEqual(demo.layers, {item.id: list(item.claims) for item in layers})
        self.assertEqual(len(root), 10)

    def test_captured_hashes_and_excerpt_ranges_are_intact(self):
        snapshot = json.loads((HERE / "sources/snapshot.json").read_text())
        for key, source in snapshot["sources"].items():
            self.assertEqual(hashlib.sha256(source["text"].encode()).hexdigest(), source["sha256"], key)
        build.locate_evidence()
        for claim, (_, _, refs) in build.EVIDENCE.items():
            for key, start, end, *_ in refs:
                self.assertGreaterEqual(start, 1, claim)
                self.assertLessEqual(end, len(snapshot["sources"][key]["text"].splitlines()), claim)
                self.assertLessEqual(start, end, claim)

    def test_prior_test_cases_and_assertions_really_are_unchanged(self):
        sources = build.SOURCES
        marker = '  it("shares one reference search across caller and reference projections"'
        before, after = sources["service-test-base"]["text"], sources["service-test-head"]["text"]
        self.assertEqual(before[before.index(marker):], after[after.index(marker):])
        audit = json.loads((HERE / "sources/test-audit.json").read_text())
        self.assertEqual(len(audit["base_test_names"]), 5)
        self.assertEqual(len(audit["added_typescript_test_names"]), 6)
        self.assertEqual(len(audit["added_core_test_names"]), 4)

    def test_a_stated_reason_cannot_omit_its_source_destination(self):
        with self.assertRaises(ValueError):
            DecisionCard("choice", "01", "Title", "A choice", "stated", "A reason", "detail")
        with self.assertRaises(ValueError):
            DecisionCard("choice", "01", "Title", "A choice", "unexplained", "", "detail")

    def test_unannounced_children_and_dangling_diagram_edges_are_rejected(self):
        with self.assertRaises(ValueError):
            validate_layers(("known",), (Layer("detail", ("new-decision",), "overview"),))
        with self.assertRaises(ValueError):
            BoxDiagram("map", "Map", "Map description", 100, 100,
                (Box("known", 0, 0, 80, 80, "Known"),), (Edge("known", "missing", "calls"),)).render()


if __name__ == "__main__":
    unittest.main(verbosity=2)
