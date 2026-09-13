"""Capture once, then generate a dependency-free page from frozen local evidence."""
from pathlib import Path
import argparse
import datetime
import hashlib
import html
import json
import re
import shutil
import subprocess

from content import BASE, HEAD, DECISIONS, PATHS, EXCERPTS, CREDITS, CACHE_INFO, HUNK_DECISIONS

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
EVIDENCE = HERE / "evidence"
EVIDENCE.mkdir(exist_ok=True)


def dump(path, value):
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n")


def digest(value):
    return hashlib.sha256(value).hexdigest()


def capture():
    snapshots = {}
    manifest = []
    for side, sha in [("base", BASE), ("head", HEAD)]:
        tree = ROOT / "worktrees" / f"pr-127-{side}"
        actual = subprocess.check_output(["git", "-C", str(tree), "rev-parse", "HEAD"], text=True).strip()
        assert actual == sha, (side, actual)
        assert not subprocess.check_output(["git", "-C", str(tree), "status", "--porcelain=v1", "--untracked-files=no"], text=True).strip()
        for key, path in PATHS.items():
            source = tree / path
            if not source.exists():
                assert side == "base" and key in ("scope", "scope-test"), source
                continue
            value = source.read_bytes()
            committed = subprocess.check_output(["git", "-C", str(tree), "show", f"{sha}:{path}"])
            assert value == committed, source
            destination = f"source-{side}-{key}.txt"
            (EVIDENCE / destination).write_bytes(value)
            entry = dict(id=f"{side}:{key}", side=side, sha=sha, path=path, local=destination,
                         sha256=digest(value), text=value.decode())
            snapshots[entry["id"]] = entry
            manifest.append({k: v for k, v in entry.items() if k != "text"})
    pr = json.loads((ROOT / "inputs/pr-127/pr.json").read_text())
    for key, content in [("body", pr["body"]), ("commits", "\n".join(f'{c["sha"]}\n{c["subject"]}\nBody: {c["body"] or "(empty)"}' for c in pr["commits"]))]:
        filename = f"{key}.txt"
        (EVIDENCE / filename).write_text(content)
        snapshots[key] = dict(id=key, side="bundle", sha=HEAD, path=f"inputs/pr-127/pr.json · {key}", local=filename,
                              sha256=digest(content.encode()), text=content)
        manifest.append({k: v for k, v in snapshots[key].items() if k != "text"})
    for name in ["pr.json", "diff.patch", "files.txt"]:
        shutil.copyfile(ROOT / "inputs/pr-127" / name, EVIDENCE / name)
    raw_diff = subprocess.check_output(["git", "-C", str(ROOT / "worktrees/pr-127-head"), "diff", f"{BASE}...{HEAD}"])
    assert raw_diff == (EVIDENCE / "diff.patch").read_bytes(), "Supplied patch differs from pinned revisions"
    dump(EVIDENCE / "snapshots.json", snapshots)
    dump(EVIDENCE / "source-manifest.json", manifest)

    original10 = ROOT / "experiments/10-tour-guide/evidence/replay.json"
    tour = json.loads(original10.read_text())
    for side, sha in [("base", BASE), ("head", HEAD)]:
        assert tour["versions"][side]["sha"] == sha
    shutil.copyfile(original10, EVIDENCE / "request-original.json")
    capture17 = ROOT / "experiments/17-executable-before-after/captured.js"
    text = capture17.read_text()
    lab = json.loads(text[text.index("{"):].rstrip().rstrip(";"))
    selected = {name: lab["runs"]["calls:" + name] for name in ["refresh", "failed-refresh", "release-hold", "release-reject"]}
    for run in selected.values():
        for side, sha in [("base", BASE), ("head", HEAD)]:
            assert run[side]["provenance"]["sha"] == sha
            for loaded in run[side]["provenance"]["loadedFiles"]:
                assert digest((ROOT / "worktrees" / f"pr-127-{side}" / loaded["path"]).read_bytes()) == loaded["sha256"]
    dump(EVIDENCE / "lifecycle-original.json", dict(generatedAt=lab["generatedAt"], originalCaptureSha256=digest(capture17.read_bytes()),
                                                   runs=selected, harnessHashes=lab["harnessHashes"]))
    for source, dest in [("10-tour-guide/capture.mjs", "10-capture.mjs.txt"),
                         ("17-executable-before-after/runner.mjs", "17-runner.mjs.txt"),
                         ("17-executable-before-after/capture.mjs", "17-capture.mjs.txt")]:
        shutil.copyfile(ROOT / "experiments" / source, EVIDENCE / dest)
    assert digest((EVIDENCE / "17-runner.mjs.txt").read_bytes()) == lab["harnessHashes"][0]["sha256"]
    contact_source = ROOT / "experiments/36-be-weird-a/evidence/observations.json"
    contact = json.loads(contact_source.read_text())
    assert contact["versions"]["base"]["commit"] == BASE and contact["versions"]["head"]["commit"] == HEAD
    shutil.copyfile(contact_source, EVIDENCE / "contact-original.json")
    shutil.copyfile(ROOT / "experiments/36-be-weird-a/scripts/capture.mjs", EVIDENCE / "36-capture.mjs.txt")
    reads = []
    for name, element, target, used, dropped in CREDITS:
        folder = ROOT / "experiments" / name
        assert (folder / "README.md").exists(), name
        reads.append(dict(experiment=name, element=element, target=target, used=used, dropped=dropped,
                          readmeSha256=digest((folder / "README.md").read_bytes()),
                          entrySha256=digest((folder / "index.html").read_bytes()),
                          read="README and rendered PR-127 teaching content; relevant capture/source/method files as recorded in README"))
    unfinished = [p.name for p in sorted((ROOT / "experiments").iterdir()) if p.is_dir() and not (p / "README.md").exists() and p != HERE]
    dump(EVIDENCE / "review-census.json", dict(capturedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),
                                              reviewed=reads, unfinished=unfinished,
                                              excludedMention="15-message-choreography-sim explains pr-131; its README mentions inspecting pr-127 only during subject selection."))


esc = lambda text: html.escape(str(text), quote=True)


def source_link(key, label="Source"):
    return f'<a class="source-link" href="#e-{key}" data-exit>{esc(label)} ↗</a>'


def build():
    snapshots = json.loads((EVIDENCE / "snapshots.json").read_text())
    tour = json.loads((EVIDENCE / "request-original.json").read_text())
    lab = json.loads((EVIDENCE / "lifecycle-original.json").read_text())
    contact = json.loads((EVIDENCE / "contact-original.json").read_text())
    census = json.loads((EVIDENCE / "review-census.json").read_text())
    cards = []
    for d in DECISIONS:
        cards.append(f'''<article class="decision" id="{d['id']}">
        <div class="decision-meta"><span>{d['id']}</span><span class="reason {d['status']}">{d['status']}</span></div>
        <h3><a href="#{d['target']}" data-exit>{esc(d['title'])} <span aria-hidden="true">↘</span></a></h3>
        <p>{esc(d['fact'])}</p><p class="rationale">{esc(d['reason'])}</p>
        {source_link(d['sources'][0], 'Reason & evidence')}</article>''')
    evidence = []
    for eid, source, start, end, title in EXCERPTS:
        s = snapshots[source]
        lines = s["text"].splitlines()
        assert 0 < start <= end <= len(lines), (eid, start, end, len(lines))
        back = [d for d in DECISIONS if eid in d["sources"]]
        excerpt = "\n".join(f'<span id="L-{eid}-{n}"><i aria-hidden="true">{n}</i>{esc(line)}</span>' for n, line in enumerate(lines[start-1:end], start))
        evidence.append(f'''<details class="source" id="e-{eid}"><summary><span>{esc(title)}</span><small>{s['side']} · L{start}–{end}</small></summary>
        <div class="source-inner"><p class="source-path">{esc(s['path'])}<br><code>{s['sha']}</code></p>
        <pre tabindex="0" aria-label="{esc(title)}"><code>{excerpt}</code></pre>
        <div class="source-footer"><a href="evidence/{s['local']}">Full captured file ↗</a>
        <button class="return" type="button" data-return>↩ Return to where I was</button>
        {''.join(f'<a href="#{d["id"]}">↑ {d["id"]}</a>' for d in back) or '<a href="#decisions">↑ Decisions</a>'}</div></div></details>''')
    cache_rows = []
    for name, title, key, value, note, eid in CACHE_INFO:
        cache_rows.append(f'<tr id="cache-{name}"><th scope="row">{title}<small>{name}</small></th><td>{key}</td><td>{esc(value)}<p>{esc(note)}</p>{source_link(eid)}</td></tr>')

    patch = (EVIDENCE / "diff.patch").read_text()
    hunks = []
    path = None
    current = None
    for line_number, line in enumerate(patch.splitlines(), 1):
        if line.startswith("diff --git "):
            path = line.split(" b/", 1)[1]
            current = None
        elif line.startswith("@@"):
            current = dict(id=f"H{len(hunks)+1:02d}", path=path, header=line, patchLine=line_number,
                           added=0, removed=0, decisions=HUNK_DECISIONS[len(hunks)], changedPatchLines=[])
            hunks.append(current)
        elif current and line[:1] in ("+", "-"):
            current["added" if line[0] == "+" else "removed"] += 1
            current["changedPatchLines"].append(line_number)
    assert len(hunks) == 15
    assert sum(h["added"] for h in hunks) == 391 and sum(h["removed"] for h in hunks) == 67
    base_tests = snapshots["base:service-test"]["text"]
    head_tests = snapshots["head:service-test"]["text"]
    first_old_test = '  it("shares one reference search across caller and reference projections"'
    assert base_tests[base_tests.index(first_old_test):] == head_tests[head_tests.index(first_old_test):]
    base_names = re.findall(r'\bit\("([^"]+)"', base_tests)
    head_names = re.findall(r'\bit\("([^"]+)"', head_tests)
    assert len(base_names) == 5 and len(head_names) == 11
    core_names = re.findall(r'\bit\("([^"]+)"', snapshots["head:scope-test"]["text"])
    assert len(core_names) == 4
    dump(EVIDENCE / "coverage.json", dict(base=BASE, head=HEAD, added=391, removed=67, hunks=hunks,
                                          note="Authored hunk-to-decision assignments cover changed lines. This is not automated semantic completeness."))
    dump(EVIDENCE / "test-audit.json", dict(oldCases=base_names, newServiceCases=head_names[:6], newCoreCases=core_names,
                                           retainedTailByteIdentical=True, testsExecutedHere=False))
    coverage = "".join(f'<tr><th scope="row">{h["id"]}</th><td><code>{esc(h["path"].split("/src/")[-1])}</code><small>{esc(h["header"].split("@@")[1])}</small></td><td>+{h["added"]} / −{h["removed"]}</td><td>{" · ".join(f"<a href=\"#{d}\">{d}</a>" for d in h["decisions"])}</td></tr>' for h in hunks)
    credit_rows = "".join(f'<tr id="credit-{name[:2]}"><th scope="row"><a href="../{name}/index.html">{name} ↗</a></th><td><a href="#{target}">{esc(element)} ↓</a><p>{esc(used)}</p></td><td>{esc(dropped)}</td></tr>' for name, element, target, used, dropped in CREDITS)
    steps = [("arrive", "Arrive"), ("refresh", "Refresh"), ("target", "Target"), ("definitions", "Definitions"), ("callers", "Callers"), ("callees", "Callees"), ("references", "References"), ("return", "Return")]
    step_buttons = "".join(f'<button type="button" data-request-step="{i}" aria-pressed="{str(i==6).lower()}"><span>{i+1:02d}</span>{label}</button>' for i, (_, label) in enumerate(steps))
    static_request = []
    for index, (name, label) in enumerate(steps):
        frame = tour["versions"]["head"]["frames"][index]
        bf = tour["versions"]["base"]["frames"][index]
        assert bf["counts"] == frame["counts"] and bf["caches"] == frame["caches"], index
        static_request.append(f'<tr><th scope="row">{index+1}. {label}</th><td>{" · ".join(str(len(x["entries"])) for x in frame["caches"])}</td><td>{frame["counts"]["definitionSearch"]} / {frame["counts"]["referenceSearch"]} / {frame["counts"]["callTargetResolution"]}</td></tr>')
    static_lifecycle = []
    for name, run in lab["runs"].items():
        for b, h in zip(run["base"]["steps"], run["head"]["steps"]):
            assert b["id"] == h["id"]
            static_lifecycle.append(f'<tr><th scope="row">{esc(name)}<small>{esc(h["label"])}</small></th><td>{sum(x["size"] for x in b["caches"])} / {sum(x["size"] for x in h["caches"])}</td><td>{esc(b["release"]["backend"])} / {esc(h["release"]["backend"])}</td><td>{esc(b["release"]["project"])} / {esc(h["release"]["project"])}</td></tr>')
    identity_rows = []
    warm = next(s for s in lab["runs"]["release-hold"]["head"]["steps"] if s["id"] == "warm")
    for row in warm["rows"]:
        identity_rows.append(f'<tr><th scope="row">{esc(row["name"])}</th><td><code>{" → ".join(row["returnIds"])}</code></td><td>{"Same returned object" if row["sameReturn"] else "Fresh returned object"}</td></tr>')
    payload = dict(tour=tour, lab=lab["runs"], contact=contact, caches=[dict(zip(["name", "title", "key", "value", "note", "source"], row)) for row in CACHE_INFO])
    (HERE / "recordings.js").write_text("window.SYNTH = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n")
    pyramid = dict(decisions=[dict(id=d["id"], target=d["target"], sources=d["sources"], fact=d["fact"], reason=d["reason"], status=d["status"]) for d in DECISIONS],
                   sections={"owners": ["D01", "D02", "D03"], "request": ["D02", "D04"], "identity": ["D02", "D04"],
                             "boundaries": ["D07", "D08", "D09", "D11"], "intent": ["D01", "D03", "D09"],
                             "lookup": ["D04", "D05", "D06"], "tickets": ["D06", "D11"], "api": ["D01", "D03", "D09", "D10", "D11"],
                             "evidence-map": ["D12"], "contact": ["D04", "D07", "D08", "D11"]},
                   audit="Manual review required: a matching parent ID cannot establish that prose reveals no new consequence.")
    dump(EVIDENCE / "pyramid-map.json", pyramid)
    primary = ["construction", "construction", "scope", "projections", "scope", "reference-discovery", "backend-after", "release-after", "backend-after", "construction", "scope", "release-test"]
    depth_rows = "".join(f'<tr><th scope="row">{d["id"]} · {esc(d["title"])}</th><td><a href="#{d["id"]}" data-exit data-crossing="{i},0">Overview</a></td><td><a href="#{d["target"]}" data-exit data-crossing="{i},1">Mechanism</a></td><td><a href="#e-{primary[i]}" data-exit data-crossing="{i},2">Evidence</a></td></tr>' for i, d in enumerate(DECISIONS))
    contact_rows = "".join(f'<tr><th scope="row">{esc(ch["name"])} · {lens}</th>'+"".join(f'<td><code>{esc(r[lens][ch["id"]])}</code></td>' for r in contact["versions"]["head"]["contact"]["records"])+"</tr>" for ch in contact["channels"] for lens in ["cached", "returned"])
    for ch in contact["channels"]:
        for lens in ["cached", "returned"]:
            ids = [[r[lens][ch["id"]] for r in contact["versions"][side]["contact"]["records"]] for side in ["base", "head"]]
            assert [[x == y for y in ids[0]] for x in ids[0]] == [[x == y for y in ids[1]] for x in ids[1]], (ch, lens)
    replacements = {"DECISIONS": "\n".join(cards), "EVIDENCE": "\n".join(evidence), "CACHE_ROWS": "\n".join(cache_rows),
                    "CREDITS": credit_rows, "COVERAGE": coverage, "REQUEST_STEPS": step_buttons,
                    "STATIC_REQUEST": "".join(static_request), "STATIC_LIFECYCLE": "".join(static_lifecycle),
                    "IDENTITY_ROWS": "".join(identity_rows), "REVIEW_DATE": esc(census["capturedAt"][:16].replace("T", " ") + " UTC"),
                    "CREDIT_COUNT": str(len(CREDITS)), "FIXTURE": esc(tour["fixture"]), "DEPTH_ROWS": depth_rows, "CONTACT_ROWS": contact_rows}
    template = (HERE / "template.html").read_text()
    for key, value in replacements.items():
        template = template.replace("{{" + key + "}}", value)
    assert not re.search(r"\{\{[A-Z_]+\}\}", template)
    (HERE / "index.html").write_text(template)
    print(f"Built index.html: {len(DECISIONS)} decisions, {len(EXCERPTS)} excerpts, {len(CREDITS)} credited experiments, {len(hunks)} hunks.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--capture", action="store_true", help="Read the assigned worktrees and earlier recordings again")
    args = parser.parse_args()
    if args.capture or not (EVIDENCE / "snapshots.json").exists():
        capture()
    build()
