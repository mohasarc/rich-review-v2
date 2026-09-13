#!/usr/bin/env python3
"""Build both pages from one body and one opening data record per condition."""
from pathlib import Path
import hashlib
import html
import json
import re
import shutil
import subprocess
from datetime import datetime, timezone

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
BASE_SHA = "a1e325a5ff979bdfa25babc5554621c8c0f20497"
HEAD_SHA = "64919bcbcf7fcc8202779b78c5f069b24662bb18"
SERVICE = "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts"
SERVICE_TEST = SERVICE.replace(".ts", ".test.ts")
BACKEND = "packages/backend-typescript/src/typescript-backend/typescript-backend.ts"
CORE = "packages/core/src/backend/turn-scoped-cache-scope.ts"
CORE_TEST = CORE.replace(".ts", ".test.ts")
INDEX = "packages/core/src/index.ts"
SPEC = "plans/005/daemon-architecture-functional-spec.md"
GRAPH = "packages/core/src/workspace/project-graph.ts"
TS_GRAPH = "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts"


def snapshot_sources():
    if (HERE / "evidence-manifest.json").exists():
        return
    manifest = {"captured_at": datetime.now(timezone.utc).isoformat(),
                "base": BASE_SHA, "head": HEAD_SHA, "files": []}
    for revision, sha in [("base", BASE_SHA), ("head", HEAD_SHA)]:
        tree = ROOT / "worktrees" / f"pr-127-{revision}"
        actual = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=tree, text=True).strip()
        if actual != sha:
            raise RuntimeError(f"Expected {revision} {sha}, found {actual}")
        paths = [SERVICE, SERVICE_TEST, BACKEND, INDEX, SPEC, GRAPH, TS_GRAPH]
        if revision == "head":
            paths += [CORE, CORE_TEST]
        for path in paths:
            source = tree / path
            relative = Path("evidence") / revision / path
            destination = HERE / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source, destination)
            manifest["files"].append({"path": str(relative), "revision": sha,
                                      "sha256": hashlib.sha256(destination.read_bytes()).hexdigest()})
    for name in ["pr.json", "diff.patch", "files.txt", "stack.md"]:
        relative = Path("evidence") / name
        shutil.copyfile(ROOT / "inputs" / "pr-127" / name, HERE / relative)
        manifest["files"].append({"path": str(relative),
                                  "sha256": hashlib.sha256((HERE / relative).read_bytes()).hexdigest()})
    (HERE / "evidence-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")


def evidence(token, revision, path, ranges, why):
    raw_path = Path("evidence") / revision / path
    lines = (HERE / raw_path).read_text().splitlines()
    evidence_id = token.lower().replace("_", "-")
    ranges_label = ", ".join(str(a) if a == b else f"{a}–{b}" for a, b in ranges)
    excerpts = []
    for index, (start, end) in enumerate(ranges):
        if end > len(lines):
            raise ValueError(f"{path} has only {len(lines)} lines, cannot quote {end}")
        if index:
            excerpts.append('<div class="source-line"><a aria-hidden="true">…</a><code>…</code></div>')
        for number in range(start, end + 1):
            line_id = f"{evidence_id}-L{number}"
            excerpts.append(f'<div class="source-line" id="{line_id}"><a href="#{line_id}" aria-label="Line {number}">{number}</a><code>{html.escape(lines[number-1])}</code></div>')
    sha = HEAD_SHA if revision == "head" else BASE_SHA
    return f'''<details class="evidence" id="{evidence_id}">
      <summary>Source · {revision} · {html.escape(Path(path).name)}:{ranges_label} · {html.escape(why)}</summary>
      <div class="source-info">{html.escape(path)}<br>{sha}</div>
      <div class="source-lines">{''.join(excerpts)}</div>
      <div class="source-bottom"><a href="{raw_path.as_posix()}">Full captured source</a> · Line numbers refer to this captured revision.</div>
    </details>'''


def opening_markup(record):
    steps = "".join(f'<div class="opening-step" role="listitem"><b>{html.escape(title)}</b><span>{html.escape(body)}</span></div>' for title, body in record["steps"])
    title = "".join(f"<span>{html.escape(line)}</span>" for line in record["title"])
    return f'''<section class="opening" id="opening" aria-labelledby="opening-title">
    <p class="eyebrow">One way in</p>
    <h2 id="opening-title">{title}</h2>
    <p class="lead">{html.escape(record['lead'])}</p>
    <div class="opening-flow" role="list">{steps}</div>
    <p class="opening-close">{html.escape(record['close'])}</p>
    <p class="lossy">{html.escape(record['note'])}</p>
  </section>'''


def build():
    snapshot_sources()
    common = (HERE / "common.html").read_text()
    decisions = json.loads((HERE / "decisions.json").read_text())
    rows = []
    for d in decisions:
        rows.append(f'''<article class="decision" id="{d['id']}" aria-labelledby="{d['id']}-title">
          <span class="decision-id">{d['id']}</span>
          <div><h4 id="{d['id']}-title">{html.escape(d['title'])}</h4><p>{html.escape(d['fact'])}</p></div>
          <div class="rationale"><span class="status {d['status']}">{d['status']}</span><p>{html.escape(d['reason'])}</p></div>
          <a href="#{d['target']}" aria-label="Follow {d['id']}">Follow ↘</a>
        </article>''')
    common = common.replace("{{DECISIONS}}", "\n".join(rows))
    excerpts = [
        ("E_SPEC_OWNERSHIP", "head", SPEC, [(53, 64)], "ownership rule"),
        ("E_HANDLES", "head", SERVICE, [(29, 66)], "service-owned scope and six handles"),
        ("E_BASE_HANDLES", "base", SERVICE, [(29, 53)], "six independent Maps before the move"),
        ("E_HEAD_BACKEND", "head", BACKEND, [(79, 90)], "refresh order and awaited release"),
        ("E_BASE_BACKEND", "base", BACKEND, [(79, 90)], "previous refresh and release boundary"),
        ("E_HEAD_RELEASE", "head", SERVICE, [(129, 132)], "clear then await"),
        ("E_BASE_RELEASE", "base", SERVICE, [(125, 129)], "clear then start release"),
        ("E_CORE", "head", CORE, [(1, 46)], "complete generic cache implementation"),
        ("E_PROJECTIONS", "head", SERVICE, [(79, 102), (134, 172)], "reference and position projections"),
        ("E_FAILURE_TESTS", "head", CORE_TEST, [(49, 92)], "failures and late settlement"),
        ("E_EXPORT", "head", INDEX, [(149, 154)], "public core export"),
        ("E_SPEC_BEHAVIOR", "head", SPEC, [(17, 28)], "unchanged-behavior requirement"),
        ("E_GRAPH_RELEASE", "head", GRAPH, [(63, 65), (144, 152)], "graph interface and cleanup sequencing"),
        ("E_TS_RELEASE", "head", TS_GRAPH, [(78, 85)], "concrete synchronous project cleanup"),
        ("E_REUSABLE_TEST", "head", CORE_TEST, [(25, 47)], "handles survive turn and release"),
        ("E_IDENTITY_TESTS", "head", SERVICE_TEST, [(29, 59), (95, 133)], "promise identity and error behavior"),
        ("E_POSITION_TESTS", "head", SERVICE_TEST, [(61, 93)], "empty positions and node rehydration"),
        ("E_REFRESH_TEST", "head", SERVICE_TEST, [(135, 162)], "failed refresh retains cached result"),
        ("E_RELEASE_TEST", "head", SERVICE_TEST, [(164, 217)], "pending release and rejection at backend"),
    ]
    for token, revision, path, ranges, why in excerpts:
        marker = "{{" + token + "}}"
        if common.count(marker) != 1:
            raise ValueError(f"Expected one placeholder for {token}")
        common = common.replace(marker, evidence(token, revision, path, ranges, why))
    records = json.loads((HERE / "openings.json").read_text())
    for condition, filename in [("metaphor", "index.html"), ("failure", "failure.html")]:
        page = common.replace("{{OPENING}}", opening_markup(records[condition]))
        if re.search(r"\{\{[A-Z_]+\}\}", page):
            raise ValueError("Unfilled page placeholder")
        (HERE / filename).write_text(page)
    print("Built index.html (metaphor) and failure.html (motivating failure).")


if __name__ == "__main__":
    build()
