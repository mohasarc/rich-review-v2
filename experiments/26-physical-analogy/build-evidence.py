"""Copy bounded, read-only source evidence into this standalone experiment."""
from pathlib import Path
import html
import json
import shutil

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[1]
HEAD = REPO / "worktrees/pr-127-head"
BASE = REPO / "worktrees/pr-127-base"
FILES = {
    "scope": "packages/core/src/backend/turn-scoped-cache-scope.ts",
    "scope-tests": "packages/core/src/backend/turn-scoped-cache-scope.test.ts",
    "exports": "packages/core/src/index.ts",
    "service": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",
    "service-tests": "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",
    "backend": "packages/backend-typescript/src/typescript-backend/typescript-backend.ts",
    "graph": "packages/core/src/workspace/project-graph.ts",
    "ts-project": "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts",
    "spec": "plans/005/daemon-architecture-functional-spec.md",
}
SOURCES = {}
for version, folder, sha in [
    ("head", HEAD, "64919bcbcf7fcc8202779b78c5f069b24662bb18"),
    ("base", BASE, "a1e325a5ff979bdfa25babc5554621c8c0f20497"),
]:
    for key, path in FILES.items():
        source = folder / path
        if not source.exists():
            continue
        if version == "base" and key in {"spec", "graph", "ts-project"}:
            continue
        SOURCES[f"{key}-{version}"] = {
            "path": path, "version": version, "sha": sha,
            "lines": source.read_text().splitlines(),
        }
pr = json.loads((REPO / "inputs/pr-127/pr.json").read_text())
SOURCES["pr"] = {"path": "PR #127 body (supplied bundle)", "version": "bundle", "sha": "",
                 "lines": pr["body"].splitlines()}
SOURCES["commits"] = {
    "path": "PR #127 commit messages (supplied bundle)", "version": "bundle", "sha": "",
    "lines": [line for commit in pr["commits"] for line in
              [commit["sha"], commit["subject"], commit["body"] or "[empty commit body]", ""]],
}
(ROOT / "sources.js").write_text("window.SOURCES = " + json.dumps(SOURCES, ensure_ascii=False) + ";\n")
for name in ["pr.json", "diff.patch", "files.txt"]:
    shutil.copyfile(REPO / "inputs/pr-127" / name, ROOT / "evidence" / name)
parts = ['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
         '<title>PR 127 · Local source evidence</title><style>body{max-width:1100px;margin:35px auto;padding:0 20px;background:#f8f5ec;color:#282b27;font:16px/1.5 system-ui}a{color:#24597a}section{margin:65px 0}h2{overflow-wrap:anywhere;font-size:20px}pre{overflow:auto;border:1px solid #b7b5ab;padding:16px;font-size:12px;line-height:1.7;background:#fffdf7}pre span{display:block;scroll-margin-top:30px}pre span:target{background:#ffe18c}pre a{display:inline-block;width:5ch;color:#74766b}nav{display:flex;gap:10px 22px;flex-wrap:wrap}.back{position:sticky;top:0;display:block;padding:12px;background:#f8f5ec;border-bottom:1px solid}</style>',
         '<a class="back" href="../index.html#evidence">← Back to the post office</a><h1>Local source evidence · PR 127</h1>',
         '<p>Read-only copies of the supplied worktrees and PR bundle. Line numbers match the files at the listed revisions. No network required.</p><nav>']
for key, source in SOURCES.items():
    parts.append(f'<a href="#{key}">{html.escape(key)}</a>')
parts.append('</nav>')
for key, source in SOURCES.items():
    parts.extend([f'<section id="{key}"><h2>{html.escape(source["path"])}</h2>',
                  f'<p>{source["version"]} · {source["sha"]}</p><pre>'])
    for i, line in enumerate(source["lines"], 1):
        anchor = f"{key}-L{i}"
        parts.append(f'<span id="{anchor}"><a href="#{anchor}">{i}</a>{html.escape(line)}</span>')
    parts.append('</pre></section>')
parts.append('</html>')
(ROOT / "evidence/sources.html").write_text("\n".join(parts))
print(f"Embedded {len(SOURCES)} source records; copied PR body, diff and file list.")
