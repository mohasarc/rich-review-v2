#!/usr/bin/env python3
"""Build a portable page and immutable, line-addressed source evidence. No dependencies."""

from pathlib import Path
import hashlib
import html
import json
import re
import subprocess
from urllib.parse import quote

from content import GROUPS, RECORDS

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
HEAD = "20838f8dbf413e04767543eb2380d0d114da6c60"
BASE = "ba53c8e1662fd86d198b95321c90d9c9bef10184"
REPO = ROOT / "worktrees/pr-148-head"
BUNDLE = ROOT / "inputs/pr-148"
OUT = HERE / "evidence"
OUT.mkdir(exist_ok=True)


def git(*args):
    return subprocess.check_output(["git", "-C", str(REPO), *args], text=True)


def esc(value):
    return html.escape(str(value), quote=True)


pr = json.loads((BUNDLE / "pr.json").read_text())
assert git("rev-parse", "HEAD").strip() == HEAD
assert pr["number"] == 148
assert len(pr["commits"]) == 45
bundle_texts = {"pr-body.md": pr["body"], "commits.txt": "\n\n".join(f'{c["sha"]}\n{c["subject"]}\n{c["body"]}' for c in pr["commits"])}
source_cache = {}


def snapshot(revision, path):
    key = (revision, path)
    if key not in source_cache:
        text = bundle_texts[path] if revision == "bundle" else git("show", f'{HEAD if revision == "head" else BASE}:{path}')
        identifier = hashlib.sha256(f"{revision}:{path}".encode()).hexdigest()[:12]
        source_cache[key] = {"text": text, "file": f"{revision}-{identifier}.html", "revision": revision, "path": path, "sha256": hashlib.sha256(text.encode()).hexdigest()}
    return source_cache[key]


def source_link(src, decision=None):
    item = snapshot(src["revision"], src["path"])
    start = item["text"].find(src["needle"])
    if start < 0:
        raise ValueError(f'Missing evidence anchor: {src["revision"]}:{src["path"]} {src["needle"]!r}')
    line = item["text"][:start].count("\n") + 1
    query = f"?return={decision}" if decision else ""
    href = f'evidence/{item["file"]}{query}#L{line}'
    return f'<a class="source-link" href="{href}"><span>{esc(src["label"])}</span><small>{esc(src["revision"])} · {esc(src["path"])}:{line}</small></a>'


def table(columns, rows):
    body = []
    for row in rows:
        cells = []
        for i, cell in enumerate(row):
            cells.append(f'<th scope="row">{esc(cell)}</th>' if i == 0 else f'<td>{esc(cell)}</td>')
        body.append('<tr>' + ''.join(cells) + '</tr>')
    return '<div class="table-wrap"><table><thead><tr>' + ''.join(f'<th scope="col">{esc(c)}</th>' for c in columns) + '</tr></thead><tbody>' + ''.join(body) + '</tbody></table></div>'


def widget(kind):
    if kind == "routing":
        return '''<div class="paper-model" id="routing-model">
          <div class="model-title">Follow one routing decision</div>
          <p class="lossy">Illustrative replay of the source branches. No daemon executes. Counts cover route selection, before any background startup.</p>
          <label for="route-scenario">Record encountered on return</label>
          <select id="route-scenario">
            <option value="starting">Starting record with a different product version</option>
            <option value="absent">No record</option>
            <option value="disabled">Daemon disabled</option>
            <option value="incompatible">Ready record with a different product version</option>
            <option value="ready">Responsive, compatible, busy daemon</option>
            <option value="unresponsive">Unresponsive daemon</option>
            <option value="exited">Observation confirms the daemon exited</option>
            <option value="recovering">Registry read fails</option>
          </select>
          <ol class="guard-strip" aria-label="Routing guard order">
            <li data-guard="0">Enabled?</li><li data-guard="1">Record present?</li><li data-guard="2">Not starting?</li><li data-guard="3">Version?</li><li data-guard="4">Responsive?</li>
          </ol>
          <div class="model-result" id="route-result" aria-live="polite"></div>
        </div>'''
    if kind == "lifetime":
        return '''<div class="paper-model" id="lifetime-model">
          <div class="model-title">An idle deadline you might misremember</div>
          <p class="lossy">Illustrative timeline: timeout = 10 invented units; construction = 0, ready = 6, acceptance = 8. These are not production policy values.</p>
          <label for="turn-length">Navigation duration <output id="turn-label" for="turn-length">14 units</output></label>
          <input id="turn-length" type="range" min="1" max="24" value="14">
          <div class="time-key"><span>0 · constructed</span><span>6 · ready</span><span>8 · accepted</span></div>
          <div class="time-row"><span>Preserved in #148</span><div class="time-track" id="preserved-track"><span class="turn-bar"></span><span class="deadline-marker"></span><span class="shutdown-marker"></span></div><strong id="preserved-time"></strong></div>
          <div class="time-row deferred"><span>Completion-based follow-up</span><div class="time-track" id="deferred-track"><span class="turn-bar"></span><span class="shutdown-marker"></span></div><strong id="deferred-time"></strong></div>
          <p id="time-result" aria-live="polite"></p>
          <p class="small-note">Solid bar: active navigation. Thin line: acceptance deadline at 18. Dot: earliest idle shutdown under this simplified one-request example. The follow-up remains a proposal at this head.</p>
        </div>'''
    return ""


def render_record(record):
    rid = record["id"]
    status = record["status"]
    reason_source = record.get("reason_source")
    if reason_source:
        item = snapshot(reason_source["revision"], reason_source["path"])
        assert record["quote"] in item["text"], (rid, "quote must be verbatim")
    reason_detail = f'<div class="reason-excerpt"><p class="eyebrow">Preserved wording · {esc(reason_source["label"])}</p><blockquote>{esc(record["quote"])}</blockquote>{source_link(reason_source, rid)}</div>' if reason_source else '<div class="reason-excerpt gap"><p class="eyebrow">The record ends here</p><p>The choice is visible in source or tests. The PR body, its 45 commit bodies (all empty), and the inspected plans did not provide the specific reason identified as missing above. A plausible explanation is not a recovered one.</p></div>'
    commit_links = []
    for prefix in record["commits"]:
        commit = next(c for c in pr["commits"] if c["sha"].startswith(prefix))
        commit_links.append(source_link({"path": "commits.txt", "revision": "bundle", "needle": commit["sha"], "label": f'{prefix} · {commit["subject"]}'}, rid))
    detail_note = f'<p class="small-note">{esc(record["detail_note"])}</p>' if record.get("detail_note") else ""
    return f'''<article class="decision {status}" id="{rid}" data-status="{status}">
      <div class="record-head"><a class="record-number" href="#{rid}" aria-label="Link to decision {rid[1:]}">{rid[1:]}</a><span class="reason-status">Reason {status}</span></div>
      <h3>{esc(record["title"])}</h3>
      <p class="choice">{esc(record["choice"])}</p>
      <div class="reason"><span class="reason-label">Why recorded</span><p>{esc(record["reason"])}</p></div>
      <details id="detail-{rid}"><summary>Open the record <span aria-hidden="true">↗</span></summary><div class="record-body">
        {reason_detail}
        <p class="eyebrow mechanism-label">The same decision, in more detail</p>
        {widget(record.get("widget"))}
        {table(record["columns"], record["rows"])}
        {detail_note}
        <div class="return-cue"><span class="eyebrow">When you return · editorial cue</span><p>{esc(record["cue"])}</p></div>
        <p class="eyebrow">Source witnesses · pinned copies</p><div class="source-list">{''.join(source_link(s, rid) for s in record['sources'])}</div>
        <details class="commit-fold"><summary>Commit trail for this decision</summary><div class="source-list">{''.join(commit_links)}</div></details>
        <div class="record-return"><button type="button" data-close="{rid}">Close detail ↑</button><a href="#remember">Back to the memory map</a></div>
      </div></details>
    </article>'''


sections = []
for gid, number, title, introduction in GROUPS:
    sections.append(f'<section class="chapter" id="{gid}" aria-labelledby="title-{gid}"><header class="chapter-heading"><span class="chapter-number">{number}</span><div><h2 id="title-{gid}">{title}</h2><p>{introduction}</p></div></header><div class="decision-grid">' + ''.join(render_record(r) for r in RECORDS if r["group"] == gid) + '</div></section>')

status_lines = git("diff", "-M", "--name-status", BASE, HEAD).strip().splitlines()
inventory = []


def related(path):
    # Editorial index: sources may support several records; these are navigation links.
    matches = [r["id"] for r in RECORDS if any(s["path"] == path for s in r.get("sources", []))]
    if "policy-testing" in path or "daemon-policy" in path or path in ("eslint.config.mjs", "meta-tests/src/lint-rule.test.ts"):
        matches += ["d03"]
    if path.startswith("packages/daemon/src/client/"):
        matches += ["d04", "d05", "d06", "d07", "d08", "d09", "d10"]
    elif "registry" in path or "startup" in path:
        matches += ["d13", "d14"]
    elif "clock" in path or "lifetime" in path or "resource" in path or "request-queue" in path or "accepted-request-ledger" in path:
        matches += ["d14", "d15"]
    elif "process-coordinator" in path or "workspace-daemon" in path:
        matches += ["d11", "d12"]
    if path.startswith("packages/daemon/src/"):
        matches += ["d02"]
    if path.startswith("apps/cli/src/daemon/"):
        matches += ["d01"]
    if ".test." in path or "/test/" in path:
        matches += ["d16"]
    if path in ("packages/daemon/package.json", "packages/daemon/vitest.config.ts", "pnpm-lock.yaml"):
        matches += ["d20"]
    if "follow-ups-functional" in path:
        matches += ["d15"]
    assert matches, f"Unmapped change {path}"
    return sorted(set(matches))


for raw in status_lines:
    status, *paths = raw.split("\t")
    before_path = paths[0] if status != "A" else None
    after_path = paths[-1] if status != "D" else None
    before = snapshot("base", before_path) if before_path else None
    after = snapshot("head", after_path) if after_path else None
    record_ids = related(paths[-1])
    inventory.append({"status": status, "before": before_path, "after": after_path, "decisions": record_ids})

assert len(inventory) == 153
assert sum(x["status"].startswith("R") and x["before"].startswith("apps/cli/src/daemon/") and x["before"].endswith(".test.ts") for x in inventory) == 37
inventory_rows = []
for item in inventory:
    cells = []
    for revision, prop in (("base", "before"), ("head", "after")):
        path = item[prop]
        cells.append(f'<a href="evidence/{snapshot(revision, path)["file"]}#L1">{esc(path)}</a>' if path else '<span class="absent">—</span>')
    links = ' '.join(f'<a href="#{rid}" data-open="{rid}">{rid[1:]}</a>' for rid in item["decisions"])
    inventory_rows.append(f'<tr data-file-row><td><span class="file-status">{esc(item["status"])}</span></td><td>{cells[0]}</td><td>{cells[1]}</td><td class="file-decisions">{links}</td></tr>')

inventory_markup = '<table class="file-table"><thead><tr><th scope="col">Git</th><th scope="col">Base path</th><th scope="col">Head path</th><th scope="col">Records</th></tr></thead><tbody>' + ''.join(inventory_rows) + '</tbody></table>'

manifest = []
for (revision, path), item in sorted(source_cache.items()):
    commit = HEAD if revision == "head" else BASE if revision == "base" else "supplied PR bundle"
    source_lines = ''.join(f'<div class="source-line" id="L{i}"><a href="#L{i}" class="line-number" aria-label="Line {i}">{i}</a><code>{esc(line) or " "}</code></div>' for i, line in enumerate(item["text"].splitlines(), 1))
    page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(revision)} · {esc(path)} · PR 148</title><link rel="stylesheet" href="../style.css"></head><body class="source-page">
    <header class="source-header"><a id="source-return" href="../index.html#archive">← Return to the notebook</a><span>{esc(revision)} · {esc(commit)}</span><h1>{esc(path)}</h1><p>Frozen source witness. Line links refer to this snapshot, not a moving branch. Source SHA-256: <code>{item['sha256']}</code></p></header>
    <main class="source-lines">{source_lines}</main>
    <script>const r=new URLSearchParams(location.search).get('return');if(r&&/^d[0-9]{{2}}$/.test(r)){{const a=document.getElementById('source-return');a.href='../index.html#detail-'+r;a.textContent='← Return to decision '+r.slice(1);}}</script>
    </body></html>'''
    (OUT / item["file"]).write_text(page)
    manifest.append({k: v for k, v in item.items() if k != "text"})

(OUT / "pr.json").write_text(json.dumps(pr, indent=2) + "\n")
(OUT / "diff.patch").write_bytes((BUNDLE / "diff.patch").read_bytes())
(OUT / "files.txt").write_bytes((BUNDLE / "files.txt").read_bytes())
(OUT / "inventory.json").write_text(json.dumps(inventory, indent=2) + "\n")
(OUT / "manifest.json").write_text(json.dumps({"base": BASE, "head": HEAD, "sources": manifest}, indent=2) + "\n")

template = (HERE / "page.html").read_text()
template = template.replace("{{RECORDS}}", ''.join(sections)).replace("{{INVENTORY}}", inventory_markup)
template = template.replace("{{STATED}}", str(sum(r["status"] == "stated" for r in RECORDS))).replace("{{UNEXPLAINED}}", str(sum(r["status"] == "unexplained" for r in RECORDS)))
template = template.replace("{{SOURCE_COUNT}}", str(len(manifest)))
assert "{{" not in template
(HERE / "index.html").write_text(template)
print(f"Built 20 decision records, 153 changed-file mappings, and {len(manifest)} pinned source pages.")
