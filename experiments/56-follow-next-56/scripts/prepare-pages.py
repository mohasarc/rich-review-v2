#!/usr/bin/env python3
"""Copy the two studied pages and derive promoted variants by exact, single-occurrence string edits."""
import hashlib
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parents[1]
EDITS = json.loads((HERE / "scripts/edits.json").read_text())


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def tree_hashes(folder: Path) -> dict:
    return {str(p.relative_to(folder)): sha(p) for p in sorted(folder.rglob("*")) if p.is_file()}


manifest = {"prepared_at": datetime.now(timezone.utc).isoformat(), "arms": {}}
for arm, spec in EDITS.items():
    origin = ROOT / spec["origin"]
    arm_record = {"origin": spec["origin"], "variants": {}}
    for variant in ("original", "promoted"):
        target = HERE / "pages" / f"{arm}-{variant}"
        if target.exists():
            shutil.rmtree(target)
        target.mkdir(parents=True)
        for name in spec["files"]:
            source = origin / name
            if source.is_dir():
                shutil.copytree(source, target / name)
            else:
                shutil.copy2(source, target / name)
        if variant == "promoted":
            for edit in spec["edits"]:
                path = target / edit["file"]
                text = path.read_text()
                count = text.count(edit["before"])
                if count != 1:
                    raise SystemExit(f"{edit['id']}: expected one anchor in {path}, found {count}")
                path.write_text(text.replace(edit["before"], edit["after"]))
        arm_record["variants"][variant] = tree_hashes(target)
    original = arm_record["variants"]["original"]
    promoted = arm_record["variants"]["promoted"]
    arm_record["changed_files"] = sorted(k for k in original if original[k] != promoted.get(k))
    arm_record["origin_matches_original_copy"] = all(
        sha(origin / rel) == digest for rel, digest in original.items()
    )
    arm_record["edits"] = [
        {k: edit[k] for k in ("id", "kind", "file", "questions", "before", "after", "depth_source")}
        | {"added_words": len(edit["after"].split()) - len(edit["before"].split())}
        for edit in spec["edits"]
    ]
    manifest["arms"][arm] = arm_record

(HERE / "pages/manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
for arm, record in manifest["arms"].items():
    print(arm, "changed:", record["changed_files"], "origin match:", record["origin_matches_original_copy"],
          "added words:", [e["added_words"] for e in record["edits"]])
