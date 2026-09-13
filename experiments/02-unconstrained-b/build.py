#!/usr/bin/env python3
"""Build an offline artifact from authored claims and the assigned base/head trees."""
from pathlib import Path
import html
import json
import re
import subprocess
from content import DECISIONS, GROUPS

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
TREES = {s: ROOT / "worktrees" / ("pr-131-" + s) for s in ("base", "head")}
BUNDLE = ROOT / "inputs" / "pr-131"

def read(path):
    return path.read_text()

def jsonlines(path):
    return [json.loads(line) for line in read(path).splitlines() if line.strip()]

ledger = json.loads(read(HERE / "data/ledger.json"))
modules = {m["id"]: m for m in ledger["modules"]}
source_paths = set()
for decision in DECISIONS:
    for ref in decision["refs"]:
        source_paths.add((ref["side"], ref["path"]))
for leaf in ledger["leaves"]:
    for key, side in (("before", "base"), ("after", "head")):
        for entry in leaf[key]:
            entry["path"] = ledger["cliRoot"] + modules[entry["module"]]["file"]
            source_paths.add((side, entry["path"]))

sources = {side + ":" + path: read(TREES[side] / path).splitlines() for side, path in sorted(source_paths)}
for decision in DECISIONS:
    for ref in decision["refs"]:
        lines = sources[ref["side"] + ":" + ref["path"]]
        if not 1 <= ref["start"] <= len(lines):
            raise ValueError("Citation out of range: " + str(ref))
        ref["end"] = min(ref["end"], len(lines))

policy_record = {}
for number, line in enumerate(read(TREES["head"] / "plans/005/daemon-policy.md").splitlines(), 1):
    match = re.match(r"\| `([a-zA-Z.]+)` \| (.*?) \| (.*?) \| (.*?) \| (.*?) \|", line)
    if match:
        key, value, applies, reason, oracle = match.groups()
        policy_record[key] = dict(value=value, applies=applies, reason=reason, oracle=oracle, line=number)

# The original ledger used the previous machine's memory in labels. Make the example explicit.
example_values = {
    "resources.effectiveMemoryBytes": "1 GiB example",
    "resources.hardProcessRssBytes": "512 MiB example",
    "resources.softProcessRssBytes": "409 MiB example",
    "resources.resumeProcessRssBytes": "358 MiB example",
    "resources.workerMaxOldGenerationSizeMiB": "256 MiB example",
}
for leaf in ledger["leaves"]:
    leaf["display"] = example_values.get(leaf["id"], leaf["display"])
    leaf["record"] = policy_record[leaf["id"]]

base_spill = jsonlines(HERE / "probes/out/spill-base.jsonl")
head_spill = jsonlines(HERE / "probes/out/spill-head.jsonl")
head_by_test = {row["test"]: row for row in head_spill}
spill = []
for row in base_spill:
    after = head_by_test.get(row["test"])
    if after and (row["clientSpills"] or row["daemonSpills"]):
        spill.append(dict(test=row["test"], file=row["file"], before=row, after=after))
lost_spills = [row for row in spill if row["before"]["clientSpills"] > 0 and row["after"]["clientSpills"] == 0]
if len(lost_spills) != 14:
    raise ValueError("Spill narrative needs updating: " + str(len(lost_spills)))

patch = read(BUNDLE / "diff.patch")
diffs = []
for index, block in enumerate(patch.split("diff --git ")[1:], 1):
    path = block.splitlines()[0].split(" b/")[-1]
    lines = block.splitlines()
    added = sum(line.startswith("+") and not line.startswith("+++") for line in lines)
    removed = sum(line.startswith("-") and not line.startswith("---") for line in lines)
    category = "Implementation"
    if path.startswith("meta-tests/"):
        category = "Boundary test"
    elif "/test/helpers/" in path:
        category = "Test helper"
    elif path.endswith(".test.ts") or "/test/benchmark/" in path:
        category = "Test / benchmark"
    diffs.append(dict(id="file-" + str(index), path=path, added=added, removed=removed, category=category, patch="diff --git "+block))
if len(diffs) != 60 or sum(d["added"] for d in diffs) != 1298 or sum(d["removed"] for d in diffs) != 544:
    raise ValueError("Bundle is not the expected PR 131 delta")

shas = {side: subprocess.check_output(["git", "-C", str(tree), "rev-parse", "HEAD"], text=True).strip() for side, tree in TREES.items()}
if not shas["base"].startswith(ledger["baseSha"]) or not shas["head"].startswith(ledger["headSha"]):
    raise ValueError("Worktree revisions do not match ledger")

data = dict(ledger=ledger, decisions=DECISIONS, groups=GROUPS, sources=sources,
            reattach=jsonlines(HERE / "probes/out/reattach-base.jsonl")+jsonlines(HERE / "probes/out/reattach-head.jsonl"),
            memory=json.loads(read(HERE / "probes/out/memory.json")), spill=spill,
            shas=shas, pr=json.loads(read(BUNDLE / "pr.json")),
            files=[{k:v for k,v in d.items() if k!="patch"} for d in diffs])
(HERE / "data/artifact.json").write_text(json.dumps(data, indent=1))
template = read(HERE / "template.html")
serialized = json.dumps(data, separators=(",", ":")).replace("<", "\\u003c")
(HERE / "index.html").write_text(template.replace("/*DATA*/null", serialized))

# The complete local diff is the final evidence layer, never required for the explanation.
escape = html.escape
index_links = "".join('<li><a href="#'+d["id"]+'">'+escape(d["path"])+'</a> <small>+'+str(d["added"])+' / −'+str(d["removed"])+'</small></li>' for d in diffs)
sections = []
for d in diffs:
    lines = []
    for line in d["patch"].splitlines():
        cls = "add" if line.startswith("+") else "remove" if line.startswith("-") else "hunk" if line.startswith("@@") else ""
        lines.append('<span class="'+cls+'">'+escape(line)+'</span>')
    sections.append('<section id="'+d["id"]+'"><h2>'+escape(d["path"])+'</h2><p>'+escape(d["category"])+' · +'+str(d["added"])+' / −'+str(d["removed"])+' · <a href="#files">File index</a> · <a href="index.html#evidence">Back to explanation</a></p><pre>'+"\n".join(lines)+'</pre></section>')
evidence = """<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PR 131 · source diff</title>
<style>body{margin:0 auto;padding:32px;max-width:1250px;background:#f7f6f2;color:#202b31;font:15px/1.6 system-ui}a{color:#006b65}h1{font-size:36px}h2{font-size:20px;overflow-wrap:anywhere}pre{overflow:auto;background:white;border:1px solid #ccd6d5;padding:16px;font:12px/1.6 ui-monospace,monospace}pre span{display:inline-block;min-width:100%}.add{background:#e4f3e9}.remove{background:#fbe7de}.hunk{color:#5b59a0}section{scroll-margin-top:20px;margin:50px 0}small{color:#66757c}li{overflow-wrap:anywhere}</style>
<a href="index.html#evidence">← Back to explanation</a><h1>PR 131 · complete source diff</h1><p>This is the supplied base-to-head patch. It is evidence for the decisions surfaced in the main page. + / − signs are retained; colors carry no verdict.</p><p>Base """+escape(shas["base"])+"""<br>Head """+escape(shas["head"])+"""</p><ol id="files">"""+index_links+"</ol>"+"".join(sections)+"</html>"
(HERE / "evidence.html").write_text(evidence)
print(json.dumps(dict(files=len(diffs), leaves=len(ledger["leaves"]), decisions=len(DECISIONS), sources=len(sources),
                      citations=sum(len(l["before"])+len(l["after"]) for l in ledger["leaves"]),
                      lostClientSpills=len(lost_spills), artifactBytes=(HERE / "index.html").stat().st_size)))
