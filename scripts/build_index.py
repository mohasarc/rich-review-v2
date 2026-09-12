#!/usr/bin/env python3
import html
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPERIMENTS = ROOT / "experiments"
QUEUE = ROOT / "queue"


def section(markdown: str, heading: str) -> str:
    match = re.search(rf"^## {re.escape(heading)}\s*$\n(.*?)(?=^## |\Z)", markdown, re.MULTILINE | re.DOTALL)
    return match.group(1).strip() if match else ""


def first_line(value: str) -> str:
    return next((line.strip(" -*`") for line in value.splitlines() if line.strip()), "")


def entry_href(folder: Path, entry: str) -> str:
    for token in re.findall(r"[A-Za-z0-9_./-]+\.(?:html|pdf|md|mov|mp4|wav|mp3)", entry):
        candidate = folder / token
        if candidate.is_file():
            return str(candidate.relative_to(ROOT))
    for name in ("index.html", "artifact.html", "README.md"):
        candidate = folder / name
        if candidate.is_file():
            return str(candidate.relative_to(ROOT))
    return str(folder.relative_to(ROOT)) + "/"


def experiment_rows() -> tuple[list[str], int]:
    rows = []
    failed = 0
    folders = sorted((path for path in EXPERIMENTS.glob("[0-9]*-*") if path.is_dir()), reverse=True)
    for folder in folders:
        readme_path = folder / "README.md"
        if not readme_path.exists():
            if (QUEUE / "done" / f"{folder.name}.md").exists():
                failed += 1
            continue
        markdown = readme_path.read_text(errors="replace")
        name = folder.name
        number, _, slug = name.partition("-")
        kind = first_line(section(markdown, "Kind")) or "unspecified"
        subjects = first_line(section(markdown, "Subjects")) or "unspecified"
        entry = section(markdown, "Entry point")
        choices = section(markdown, "Declared choices")
        angle = " · ".join(
            line.strip()[2:] for line in choices.splitlines()
            if line.strip().startswith("-") and line.strip()[1:].strip()
        )
        spent = first_line(section(markdown, "Time spent")) or "unspecified"
        dropped = first_line(section(markdown, "What I would drop")) or "none stated"
        harness_path = folder / "harness.txt"
        harness = " → ".join(
            line.strip() for line in harness_path.read_text(errors="replace").splitlines() if line.strip()
        ) if harness_path.exists() else "unrecorded"
        screenshot = next(iter(sorted((folder / "screenshots").glob("*.png"))), None)
        screenshot_html = ""
        if screenshot:
            source = html.escape(str(screenshot.relative_to(ROOT)))
            screenshot_html = f'<a href="{source}"><img src="{source}" loading="lazy" alt="{html.escape(slug)} screenshot"></a>'
        href = html.escape(entry_href(folder, entry))
        readme_href = html.escape(str(readme_path.relative_to(ROOT)))
        readme = html.escape(markdown)
        rows.append(f"""
        <tr>
          <td><strong>{html.escape(number)}</strong></td>
          <td><a href="{href}">{html.escape(slug)}</a><br><small>{html.escape(harness)}</small></td>
          <td>{html.escape(kind)}</td>
          <td>{html.escape(subjects)}</td>
          <td>{html.escape(angle)}</td>
          <td>{screenshot_html}</td>
          <td>{html.escape(spent)}</td>
          <td>{html.escape(dropped)}</td>
          <td><details><summary><a href="{readme_href}">README</a></summary><pre>{readme}</pre></details></td>
        </tr>""")
    return rows, failed


def latest_critiques() -> str:
    candidates = []
    for folder in EXPERIMENTS.glob("[0-9]*-*"):
        if "critique" in folder.name or "fresh-reader" in folder.name:
            if (folder / "README.md").exists():
                candidates.append(folder)
    links = []
    for folder in sorted(candidates, reverse=True)[:4]:
        target = entry_href(folder, section((folder / "README.md").read_text(errors="replace"), "Entry point"))
        links.append(f'<a href="{html.escape(target)}">{html.escape(folder.name)}</a>')
    return " · ".join(links) if links else "None finished yet"


def count(pattern: str) -> int:
    return len(list(QUEUE.glob(pattern)))


def main() -> None:
    EXPERIMENTS.mkdir(exist_ok=True)
    rows, failed = experiment_rows()
    finished = len(rows)
    running = count("running/*.md")
    pending = count("*.md")
    updated = datetime.now().astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")
    document = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>rich-review v2 experiments</title>
<style>
:root {{ color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }}
body {{ margin: 2rem; line-height: 1.4; }}
a {{ color: #4f8cff; }}
.status {{ display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0; }}
.pill {{ border: 1px solid #7778; border-radius: 999px; padding: .35rem .8rem; }}
.table-wrap {{ overflow-x: auto; }}
table {{ border-collapse: collapse; min-width: 1200px; width: 100%; }}
th, td {{ border: 1px solid #7776; padding: .55rem; text-align: left; vertical-align: top; }}
th {{ position: sticky; top: 0; background: Canvas; }}
img {{ max-width: 220px; max-height: 130px; object-fit: contain; }}
small {{ opacity: .72; }}
details pre {{ max-width: 72ch; white-space: pre-wrap; }}
</style>
</head>
<body>
<h1>rich-review v2</h1>
<p>Updated {html.escape(updated)} · <a href="orchestrator-log.md">orchestrator log</a></p>
<div class="status">
  <span class="pill">{finished} finished</span>
  <span class="pill">{failed} failed/incomplete</span>
  <span class="pill">{running} running</span>
  <span class="pill">{pending} queued</span>
</div>
<p><strong>Latest critique and recall checks:</strong> {latest_critiques()}</p>
<div class="table-wrap"><table>
<thead><tr><th>NN</th><th>Experiment / harness</th><th>Kind</th><th>Subjects</th><th>Declared angle</th><th>Screenshot</th><th>Time</th><th>Would drop</th><th>README</th></tr></thead>
<tbody>{''.join(rows)}</tbody>
</table></div>
</body>
</html>
"""
    (ROOT / "index.html").write_text(document)


if __name__ == "__main__":
    main()
