"""Render the authored, unscored reading ledger for the frozen corpus."""
from pathlib import Path
import json

OUT = Path(__file__).resolve().parent
scope = json.loads((OUT / "scope-final.json").read_text())
notes = json.loads((OUT / "ledger-notes.json").read_text())
special = {
    22: "game.html", 38: "critique.md", 41: "critique.md", 42: "review.md",
    43: "critique.md", 44: "critique.md", 45: "critique.md", 47: "critique.md",
    48: "review.md", 54: "critique.md", 55: "review.html", 56: "protocol.md",
    58: "brief.md", 60: "content.py", 81: "critique.md",
}
lines = [
    "# Every finished handoff, read individually",
    "",
    "Read [the critique](critique.md) for the synthesis and [inspection notes](inspection-notes.md) for reading limits. This table accounts for **01–81**, the eighty-one finished handoffs in the frozen scope. Rows are not scores or votes for a standard layout.",
    "",
    "**R**: README contract/excerpts and rendered entry opening/structure, with relevant later text. **D**: R plus current operated states or additional subject views. **M**: written report or method and selected supporting records. **N**: interrupted negative-result handoff and partial entry. Codes describe inspection extent, not quality. A rendered-text capture is not a claim that every word, hidden room, source snapshot, or frame was read.",
    "",
    "The first column links the documented primary entry and its README. For a non-page handoff, it links the written or partial artifact. Interpret each limitation at that experiment's declared scope, especially the narrow lessons authorized by the later briefs.",
    "",
]
finished = [r for r in scope["records"] if r["readme_present"]]
assert {r["experiment"][:2] for r in finished} == set(notes)
for lo, hi in [(1,20),(21,40),(41,60),(61,81)]:
    lines += [f"## {lo:02d}–{hi:02d}", "", "| Experiment / reading | What it contributes | What remains unresolved or should be bounded |", "| --- | --- | --- |"]
    for r in finished:
        folder = r["experiment"]
        n = int(folder[:2])
        if not lo <= n <= hi:
            continue
        keep, limit, mode = notes[folder[:2]]
        entry = special.get(n, "index.html")
        lines.append(f"| [{folder}](../{folder}/{entry}) · [README](../{folder}/README.md) · {mode} | {keep} | {limit} |")
    lines.append("")
(OUT / "experiment-ledger.md").write_text("\n".join(lines))
print(f"Wrote {len(finished)} authored ledger rows")
