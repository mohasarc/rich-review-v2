"""Check the generated artifact's local links and line targets, not symnav behavior."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import sys

ROOT = Path(__file__).resolve().parent


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.duplicates = []
        self.links = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "id" in values:
            if values["id"] in self.ids:
                self.duplicates.append(values["id"])
            self.ids.add(values["id"])
        for attr in ("href", "src"):
            if attr in values:
                self.links.append(values[attr])


def main():
    parsed = {p: Document(p.read_text()) for p in ROOT.rglob("*.html")}
    errors = []
    count = 0
    for path, doc in parsed.items():
        for duplicate in doc.duplicates:
            errors.append(f"Duplicate ID {path.relative_to(ROOT)}: {duplicate}")
        for link in doc.links:
            url = urlsplit(link)
            if url.scheme:
                if url.scheme != "data":
                    errors.append(f"External dependency/link {path.name}: {link}")
                continue
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            if target == ROOT / "README.md" and "--allow-unwritten-readme" in sys.argv:
                continue
            count += 1
            if not target.exists():
                errors.append(f"Missing target {path.relative_to(ROOT)}: {link}")
            elif url.fragment and target.suffix == ".html":
                if target not in parsed or unquote(url.fragment) not in parsed[target].ids:
                    errors.append(f"Missing fragment {path.relative_to(ROOT)}: {link}")
    result = {
        "htmlFiles": len(parsed), "localLinksChecked": count, "errors": errors,
        "unwrittenReadmeAllowed": "--allow-unwritten-readme" in sys.argv,
    }
    (ROOT / "logs/artifact-links.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result, indent=2))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
