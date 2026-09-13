"""Build the offline page and immutable, line-addressable evidence snapshots."""
from collections import Counter
from pathlib import Path
from html import escape as esc
import hashlib
import json
import re
import shutil
import subprocess

from content import DECISIONS

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
SOURCES = OUT / "sources"
DIFFS = OUT / "diffs"
RAW = OUT / "raw"
for directory in (SOURCES, DIFFS, RAW):
    directory.mkdir(exist_ok=True)

SHAS = {}
SOURCE_INDEX = {}
for pr in (131, 148):
    for side in ("base", "head"):
        SHAS[pr, side] = subprocess.check_output(
            ["git", "rev-parse", "HEAD"], cwd=ROOT / "worktrees" / f"pr-{pr}-{side}", text=True
        ).strip()


def document(title, body, prefix=""):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title><link rel="icon" href="data:,"><link rel="stylesheet" href="{prefix}style.css"></head>
<body>{body}<script src="{prefix}app.js"></script></body></html>'''


def source(pr, side, path):
    key = f"{pr}:{side}:{path}"
    identifier = hashlib.sha256(key.encode()).hexdigest()[:16]
    target = SOURCES / (identifier + ".html")
    if key not in SOURCE_INDEX:
        text = (ROOT / "worktrees" / f"pr-{pr}-{side}" / path).read_text()
        lines = text.splitlines()
        numbered = "".join(
            f'<span class="source-line" id="L{n}"><a class="line-number" href="#L{n}" aria-label="Line {n}">{n}</a><code>{esc(line)}</code></span>'
            for n, line in enumerate(lines, 1)
        )
        body = f'''<header class="source-header"><a class="return-link" href="../index.html">← Return to the page</a>
<p class="eyebrow">SOURCE SNAPSHOT · #{pr} · {side.upper()}</p><h1>{esc(path)}</h1>
<p>Commit <code>{SHAS[pr, side]}</code> · {len(lines)} lines · copied from the supplied worktree</p></header>
<main class="source-code" aria-label="Source code">{numbered}</main>'''
        target.write_text(document(f"#{pr} {side} — {path}", body, "../"))
        SOURCE_INDEX[key] = dict(file=target.name, path=path, pr=pr, side=side, sha=SHAS[pr, side], lines=len(lines), sha256=hashlib.sha256(text.encode()).hexdigest())
    return target.name


def ref_link(ref, decision):
    pr, side, path, needle = (ref[k] for k in ("pr", "side", "path", "needle"))
    text = (ROOT / "worktrees" / f"pr-{pr}-{side}" / path).read_text()
    if needle not in text:
        raise ValueError(f'Missing evidence for {decision}: {pr} {side} {path}: {needle}')
    line = text[:text.index(needle)].count("\n") + 1
    name = source(pr, side, path)
    return f'<a class="evidence-link" href="sources/{name}?return=d-{decision}#L{line}"><span>{esc(ref["label"])}</span><small>#{pr} {side} · {esc(Path(path).name)}:{line}</small></a>'


def parse_patch(pr):
    text = (ROOT / "inputs" / f"pr-{pr}" / "diff.patch").read_text()
    files = []
    for block in text.split("diff --git ")[1:]:
        first = block.splitlines()[0]
        before, after = first.removeprefix("a/").split(" b/", 1)
        kind = "moved" if "\nrename from " in block else "added" if "\nnew file mode " in block else "deleted" if "\ndeleted file mode " in block else "edited"
        if kind == "added":
            before = None
        if kind == "deleted":
            after = None
        name = hashlib.sha256(f"{pr}:{first}".encode()).hexdigest()[:16] + ".html"
        diff_lines = "".join(f'<span class="patch-line {"plus" if line.startswith("+") else "minus" if line.startswith("-") else ""}">{esc(line)}</span>' for line in ("diff --git " + block).splitlines())
        body = f'''<header class="source-header"><a href="../index.html#inventory">← Change inventory</a>
<p class="eyebrow">EXACT BUNDLE DIFF · #{pr} · {kind.upper()}</p><h1>{esc(after or before)}</h1>
<p><code>{esc(before or '∅')}</code> → <code>{esc(after or '∅')}</code></p></header>
<main class="patch-code">{diff_lines}</main>'''
        (DIFFS / name).write_text(document(f"#{pr} diff — {after or before}", body, "../"))
        files.append(dict(pr=pr, kind=kind, before=before, after=after, diff=name, test=(after or before).endswith(".test.ts")))
    return files


INVENTORY = {pr: parse_patch(pr) for pr in (131, 148)}
for pr in (131, 148):
    for filename in ("pr.json", "diff.patch", "files.txt"):
        shutil.copyfile(ROOT / "inputs" / f"pr-{pr}" / filename, RAW / f"pr-{pr}-{filename}")


def flow(items, caption="", classes=""):
    boxes = '<span class="flow-arrow" aria-hidden="true">→</span>'.join(
        f'<div class="flow-box {item[2] if len(item)>2 else ""}"><b>{esc(item[0])}</b><span>{esc(item[1])}</span></div>' for item in items
    )
    return f'<figure class="mechanism {classes}"><div class="flow">{boxes}</div>{f"<figcaption>{caption}</figcaption>" if caption else ""}</figure>'


def picture(kind):
    if kind == "policy":
        rows = [
            ("resources", "16 ms → +1 ms", "release call: 0 → 1"),
            ("output", "3 raw bytes / cap 2", "chunk capacity error"),
            ("transport", "64 characters / cap 32 bytes", "canFrame = false"),
            ("diagnostics", "writer blocked / queue cap 1", "ready · ready · dropped"),
        ]
        return '<table class="compact"><caption>Four distinct policy stimuli</caption><thead><tr><th>Policy slice</th><th>Input</th><th>Assertion observes</th></tr></thead><tbody>' + ''.join(f'<tr><th>{a}</th><td>{b}</td><td>{c}</td></tr>' for a,b,c in rows) + '</tbody></table>'
    if kind == "memory":
        return flow([("Before: CLI recipe", "its own derivation tests", "old"), ("Already at base: package policy", "defaults + constraint/clamp table", "lit"), ("After: CLI supervisor", "required resources slice", "lit")], "Ownership comparison; the middle box already exists before #131.")
    if kind == "timeouts":
        return '''<div class="deadline-chart"><div><b>Status purpose</b><span class="short-deadline">10 ms timeout</span><span class="reply-time">50 ms peer reply</span><span>1,000 ms ordinary</span></div><div><b>Ordinary purpose</b><span class="short-deadline">10 ms timeout</span><span class="reply-time">50 ms peer reply</span><span>1,000 ms status</span></div></div><p class="caption">Illustrative spacing, not to scale. The policy values above are the actual test overrides.</p>'''
    if kind == "recovery":
        return '''<div class="recording" data-replay>
<div class="replay-heading"><div><b>One peer script. Two real transport builds.</b><p>Recorded locally · real sockets · empty result · playback below does not execute symnav</p></div><div class="replay-controls"><button type="button" data-prev aria-label="Previous recorded exchange">←</button><button type="button" data-next aria-label="Next recorded exchange">Next exchange →</button></div></div>
<div class="recorded-trace">
<div class="trace-step active" data-step="0"><span class="step-number">1</span><b>execute</b><span>accepted</span><em>connection closes before manifest</em></div>
<div class="trace-step" data-step="1"><span class="step-number">2</span><b>execute again</b><span>accepted + manifest</span><em>connection closes before end</em></div>
<div class="trace-step" data-step="2"><span class="step-number">3</span><b>result-fetch</b><span>manifest + end</span><em>no output records</em></div>
<div class="trace-step" data-step="3"><span class="step-number">4</span><b>result-ack</b><span>acknowledged</span><em>completion returned</em></div>
</div><div class="trace-counter" aria-live="polite">Exchange 1 of 4 · the first execute is accepted, then disconnected.</div>
<div class="same-result"><div><span>BASE</span><b>2 executes · 1 fetch · exit 0</b></div><div><span>HEAD</span><b>2 executes · 1 fetch · exit 0</b></div></div>
<p><a href="logs/retry-probe.json">Recorded events and commits</a> · <a href="probe-retry.mjs">Reproduction script</a></p></div>'''
    if kind == "adapters":
        return flow([("Legacy test knob", "inline = 0", "old"), ("Valid output policy", "inline = 1; chunk = 1", "lit"), ("Write x, then x", "second byte crosses the spill boundary", "lit")], "One changed spool fixture; adapters elsewhere apply different normalization rules.")
    if kind == "startup":
        return flow([("Two readiness waits", "publication gate closed"), ("25 ms later", "neither has settled", "lit"), ("Release gate", "ready + already-running", "lit")], "The former 5 ms argument populated a field that the base implementation did not read.")
    if kind == "staging":
        return '''<div class="staging-rows"><div><b>CLI path</b><span>app dispatcher</span><i>→</i><span>38 frozen app mechanisms</span><i>→</i><span>CLI executor</span></div><div><b>Package path</b><span>new DaemonClient</span><i>→</i><span>package mechanisms</span><i>→</i><span>generic test executors</span></div><div><b>Tests move</b><span class="old">37 app test files</span><i>↘</i><span class="lit">37 package test files</span><span class="no-edge">No active CLI switch in #148</span></div></div>'''
    if kind == "facade":
        return flow([("Host declarations", "no Node ambient types", "lit"), ("DaemonClient façade", "public cold/disabled smoke", "lit"), ("Internal runtime", "warm tests stub mechanisms", "stub"), ("Real daemon", "outside that smoke case", "beyond")])
    if kind == "routing":
        return '''<table class="compact"><caption>Selected rows from the client execution table</caption><thead><tr><th>Input</th><th>Registry reads</th><th>Observations</th><th>Warm requests</th><th>Local executors</th><th>Warm-up triggers</th></tr></thead><tbody><tr><th>disabled</th><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><th>absent</th><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr><tr><th>record version mismatch</th><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr><tr><th>ready / busy</th><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr></tbody></table>'''
    if kind == "results":
        return flow([("Transport outcome", "supplied by ClientHarness", "stub"), ("Client decision", "fallback once OR controlled warm failure", "lit"), ("Observed effects", "exact bytes; factory/dispose/mutation calls", "lit")])
    if kind == "control":
        return flow([("Host", "start / status / stop + readiness probe"), ("Internal client", "two timeout compositions", "lit"), ("Controller methods", "spied and resolved/rejected", "stub")])
    if kind == "registry":
        return flow([("Stored startup owner", "temporary registry file", "lit"), ("Canonical predicate", "forced ownership denial", "stub"), ("Named caller", "preserves lock / refuses mutation", "lit")])
    if kind == "construction":
        return '''<div class="callback-chart"><div><span>Construct coordinator</span><code>0 · 0 · 0 · 0 · 0 · 0</code></div><div><span>Invoke six callbacks directly</span><code>1 · 1 · 1 · 1 · 1 · 1</code></div></div><p class="caption">Counts are observed calls to spied targets, not six real daemon events.</p>'''
    if kind == "authentication":
        return '''<table class="compact"><caption>Coordinator authentication families</caption><thead><tr><th>Request family</th><th>First</th><th>Then</th></tr></thead><tbody><tr><th>execute · execution-status · fetch · ack</th><td>protocol + instance</td><td>process token</td></tr><tr><th>ping · stop</th><td>protocol + instance</td><td>—</td></tr><tr><th>identify · terminate · kill</th><td>instance + process token</td><td>—</td></tr></tbody></table>'''
    if kind == "clock":
        return '''<div class="directory-map"><div class="in-scope"><b>lifecycle/</b><code>daemon-clock.test.ts → readdir(".")</code><code>daemon-lifetime.ts ← scanned</code><code>daemon-clock.ts ← excluded owner</code></div><div class="out-scope"><b>Outside this enumeration</b><code>process/ · registry/ · execution/</code><code>resources/ · transport/ · worker/</code><code>diagnostics/ · delivery/ · client/</code></div></div>'''
    if kind == "idle":
        return '''<div class="idle-chart"><div><b>t = 0</b><span>construct</span><small>deadline = 10</small></div><i>→</i><div><b>t = 8</b><span>accept navigation</span><small>deadline = 18</small></div><i>→</i><div><b>t = 18</b><span>still busy</span><small>no callback</small></div><i>→</i><div class="lit"><b>t = 18</b><span>queue becomes idle</span><small>callback once</small></div></div><p class="caption">Actual fake-clock test values. A fresh interval to t = 28 belongs to the deferred follow-up.</p>'''
    if kind == "fixtures":
        return '''<div class="replacement"><div><b>Before · one combined path</b><p>worker → real CLI executor → version mismatch → initialization failure</p></div><div><b>After · separate paths</b><p>worker → generic executor → readiness / output / generic failures</p><p>CLI factory → wrong product version → exact factory error</p></div></div>'''
    if kind == "durations":
        return '''<div class="duration-delta"><div><b>Removed from this witness</b><code>startupDurations.discoveryMs = 0</code><code>startupDurations.indexingMs = number</code><code>startupDurations.totalMs = number</code><code>durations.freshnessMs = 0</code><code>durations.navigationMs = 0</code><code>durations.renderMs = 0</code><code>durations.outputMs = number</code></div><div><b>Still asserted in the replacement</b><code>ready.fileCount = 17</code><code>result.exitCode = 0</code><code>output = "0.1.0\\n"</code><p>Other diagnostic and protocol witnesses remain.</p></div></div>'''
    if kind == "entries":
        return '''<table class="compact"><caption>Read the apparatus beneath “built”</caption><thead><tr><th>Witness</th><th>What actually runs</th><th>What it sees</th></tr></thead><tbody><tr><th>built-process-launcher</th><td>launcher + mocked spawn</td><td>executable, entry path, serialized URL</td></tr><tr><th>built-process-entry</th><td>real child + generic executor</td><td>create/init events, readiness, cleanup</td></tr><tr><th>built-entry-artifacts</th><td>real worker + generic executor</td><td>ordered bytes, exit 7, failures</td></tr></tbody></table>'''
    if kind == "exports":
        return flow([("Before export keys", ". + ./policy-testing", "old"), ("After export keys", ". + ./process-entry + ./worker-entry", "lit"), ("Factory location", "test/helpers/daemon-policy.ts", "lit")])
    if kind == "windows":
        return '''<div class="replacement"><div><b>macOS / POSIX branch · ran here</b><p>terminate → child cleanup → no record + one termination event</p></div><div><b>Windows branch · source inspection</b><p>terminate → ready record remains + no event → caller removes exact process → no record</p></div></div>'''
    raise ValueError(kind)


def decision_card(d, number):
    reason = d["reason"]
    reason_label = {"stated": "Stated", "unexplained": "Unexplained", "mixed": "Stated + unexplained"}[reason]
    links = ''.join(ref_link(r, d['id']) for r in d['refs'])
    open_attr = ' open' if d['id'] == 'recovery' else ''
    return f'''<details class="decision" id="d-{d['id']}" data-pr="{d['pr']}"{open_attr}>
<summary><span class="decision-index">{number:02d}</span><span class="decision-summary"><span class="decision-title">{esc(d['title'])}</span><span class="decision-description">{esc(d['summary'])}</span></span><span class="reason-badge {reason}">{reason_label}</span><span class="expand-mark" aria-hidden="true">+</span></summary>
<div class="decision-body"><div class="rationale"><b>Reason · {reason_label.lower()}</b><p>{esc(d['why'])}</p><a href="raw/pr-{d['pr']}-pr.json">PR body and commits</a></div>
{picture(d['picture'])}
<div class="witness-reading"><div><p class="eyebrow">APPARATUS</p><p>{esc(d['apparatus'])}</p></div><div><p class="eyebrow">ASSERTION REACHES</p><p>{esc(d['pins'])}</p></div><div class="limit"><p class="eyebrow">EVIDENCE STOPS AT</p><p>{esc(d['stops'])}</p></div></div>
<div class="evidence"><h4>Check the witness</h4><div class="evidence-grid">{links}</div></div>
<div class="back-row"><a href="#pr{d['pr']}">↑ Return to #{d['pr']} boundary map</a><button type="button" class="close-detail">Close this reading ↑</button></div>
</div></details>'''


def policy_map():
    return '''<figure class="overview-map" aria-labelledby="map131-caption">
<div class="map-column"><p class="eyebrow">PACKAGES / DAEMON</p><a href="#d-policy" class="owner-box"><span>Existing owner</span><b>DaemonPolicy</b><small>transport · startup · shutdown · delivery<br>output · resources · diagnostics</small></a><a class="small-map-link" href="#d-memory">Recipe and default tests already live here ↗</a></div>
<div class="map-crossing"><span class="crossing-line"></span><b>required slices</b><small>threshold authority moves</small></div>
<div class="map-column consumer-column"><p class="eyebrow">APPS / CLI · PROCESS + WORKER</p><div class="consumer-boxes"><a href="#d-policy">capture / spool / framing<br><small>output and byte capacities</small></a><a href="#d-policy">resource supervision / worker<br><small>memory and sampling</small></a><a href="#d-timeouts">lifecycle / diagnostics<br><small>deadlines, polling and retention</small></a><a href="#d-recovery">execution / result delivery<br><small>independent attempt budgets</small></a></div><span class="retired-box">Removed: local defaults and optional numeric tuning seams</span></div>
<figcaption id="map131-caption">Structural overview; individual call sites are grouped. The process/worker boundary stays where it was. The policy already crossed it in the preceding layer.</figcaption></figure>'''


def staging_map():
    return '''<figure class="overview-map second-map" aria-labelledby="map148-caption"><div class="compatibility-path"><p class="eyebrow">ACTIVE CLI PATH</p><a href="#d-staging">CLI host / dispatcher</a><span>→</span><a href="#d-staging">38 frozen compatibility mechanisms</a><span>→</span><a href="#d-fixtures">CLI executor</a><small>Existing CLI end-to-end witnesses follow this path</small></div>
<div class="package-path"><p class="eyebrow">NEW PACKAGE BOUNDARY</p><div class="package-nodes"><a href="#d-facade" class="facade-node"><b>DaemonClient</b><small>Node-free declarations</small></a><span>→</span><a href="#d-routing"><b>Private runtime</b><small>routing · control · capture</small></a><span>→</span><a href="#d-entries"><b>Process / worker entries</b><small>registry · execution · transport<br>delivery · resources · diagnostics · lifetime</small></a><span>→</span><a href="#d-fixtures"><b>Injected executor</b><small>generic in package integration tests</small></a></div><div class="test-move"><a href="#d-staging">37 mechanism test files move into this boundary ↘</a><span>No active CLI consumer switch in this PR</span></div></div>
<figcaption id="map148-caption">Structural and execution-path overview; internals are grouped. Blue outlines show the staged package boundary. A test of either row does not automatically exercise the other.</figcaption></figure>'''


def inventory_table():
    rows = []
    for pr in (131, 148):
        for item in INVENTORY[pr]:
            if not item['test']:
                continue
            links = []
            for side, path in (("base", item['before']), ("head", item['after'])):
                if path is not None:
                    name = source(pr, side, path)
                    links.append(f'<a href="sources/{name}?return=inventory">{side}</a>')
            display = item['after'] or item['before']
            before = f'<small>from {esc(item["before"])}</small>' if item['kind'] == 'moved' else ''
            rows.append(f'<tr data-pr="{pr}" data-kind="{item["kind"]}"><td>#{pr}</td><td>{item["kind"]}</td><th scope="row"><code>{esc(display)}</code>{before}</th><td>{" · ".join(links)} · <a href="diffs/{item["diff"]}">diff</a></td></tr>')
    return '<table class="inventory-table"><thead><tr><th>PR</th><th>File change</th><th>Test file</th><th>Evidence</th></tr></thead><tbody>' + ''.join(rows) + '</tbody></table>'


def run_evidence():
    manifest = json.loads((OUT / 'logs/manifest.json').read_text())
    rows = []
    for run in manifest['runs']:
        testfile = OUT / 'logs' / (run['name'] + '.json')
        if testfile.exists():
            result = json.loads(testfile.read_text())
            observed = f'{result["numPassedTests"]} passed; {result["numFailedTests"]} failed; {len(result["testResults"])} selected files'
        else:
            observed = f'Exit {run["exitCode"]}'
        rows.append(f'<tr><th>{esc(run["name"])}</th><td>{observed}</td><td>{run["elapsedSeconds"]} s</td><td><a href="logs/{run["name"]}.txt">log</a></td></tr>')
    return '<table class="compact"><thead><tr><th>Local command group</th><th>Observed result</th><th>Duration</th><th>Record</th></tr></thead><tbody>' + ''.join(rows) + '</tbody></table>'


def main():
    n = 0
    sections = []
    for pr in (131, 148):
        cards = []
        for d in DECISIONS:
            if d['pr'] == pr:
                n += 1
                cards.append(decision_card(d, n))
        title = 'One policy, many consumers' if pr == 131 else 'New package, two execution graphs'
        lead = 'The behavior promise is preservation. The architectural move is who supplies each threshold.' if pr == 131 else 'The package and its public client are staged. The active CLI continues through compatibility copies.'
        map_html = policy_map() if pr == 131 else staging_map()
        sections.append(f'''<section class="pr-section" id="pr{pr}" aria-labelledby="pr{pr}-title"><div class="section-heading"><div><p class="eyebrow">PR #{pr} · {len([x for x in INVENTORY[pr] if x['test']])} CHANGED TEST FILES</p><h2 id="pr{pr}-title">{title}</h2><p>{lead}</p></div><a href="raw/pr-{pr}-pr.json">Read the claim ↗</a></div>{map_html}<div class="decisions">{''.join(cards)}</div></section>''')

    body = f'''<a href="#main" class="skip-link">Skip to the page</a><header class="site-header"><a href="#top" class="brand"><span class="brand-mark">27</span> test honesty</a><nav aria-label="Page navigation"><a href="#pr131">#131 · policy</a><a href="#pr148">#148 · package</a><a href="#inventory">Test changes</a><a href="#method">Method & runs</a></nav></header>
<main id="main"><section class="hero" id="top"><p class="eyebrow">A READ-ONLY REVIEW ATLAS · SYMNAV DAEMON REFACTOR</p><h1>What did the test<br><em>actually see?</em></h1><p class="hero-lead">#131 moves threshold authority. #148 moves mechanism ownership. The assertions follow particular paths through those changes.</p>
<div class="opening-figure"><span class="opening-label">Quick intuition</span><div class="opening-bracket"><span>input</span><i>→</i><strong>real code under test</strong><i>→</i><span>assertion</span></div><span class="outside-bracket">mocked or unvisited behavior<br><b>stays beyond this witness</b></span><p>Lossy analogy: a test is a window cut into a system. The title names the view; the setup determines its edges.</p></div>
<div class="hero-findings"><a href="#d-recovery"><span>#131 · concrete comparison</span><b>The new default recovery scenario also succeeds on base.</b><small>Recorded: two executes, one fetch, empty output.</small></a><a href="#d-staging"><span>#148 · changed test boundary</span><b>Tests move to the package before the CLI switches to it.</b><small>Moved files, generic fixtures and removed assertions all matter.</small></a></div>
<p class="reading-note">The visible rows below carry the decisions and the limits of their evidence. Open a row for its mechanism, exact assertions and source. <strong>Stated</strong> means a reason is in the supplied material; <strong>unexplained</strong> means no specific reason was found there.</p></section>
{''.join(sections)}
<section class="inventory-section" id="inventory"><div class="section-heading"><div><p class="eyebrow">SOURCE LEVEL · AUDIT TRAIL</p><h2>Every changed test file, including moves</h2><p>23 files in #131; 63 in #148. Of #148’s files, 37 move and one is deleted. These are file counts, not coverage or quality measures.</p></div></div>
<details class="inventory-details"><summary>Open the complete file inventory</summary><div class="inventory-filters"><label>PR <select id="filter-pr"><option value="all">Both PRs</option><option value="131">#131</option><option value="148">#148</option></select></label><label>File change <select id="filter-kind"><option value="all">All changes</option><option value="moved">Moved</option><option value="deleted">Deleted</option><option value="edited">Edited</option><option value="added">Added</option></select></label><span id="inventory-count" aria-live="polite">86 test files</span></div><div class="table-scroll">{inventory_table()}</div></details>
<p class="download-row">Full input diffs: <a href="raw/pr-131-diff.patch">#131</a> · <a href="raw/pr-148-diff.patch">#148</a> · <a href="inventory.json">Machine-readable file inventory</a></p></section>
<section class="method-section" id="method"><div class="section-heading"><div><p class="eyebrow">HOW THIS PAGE WAS MADE</p><h2>Source readings, plus bounded local execution</h2></div></div>
<div class="method-grid"><div><h3>Claims and reasons</h3><p>Compared PR bodies and commits with the exact bundle diffs, base/head tests and implementations, and the architecture, policy and follow-up specs. Earlier experiments were ignored. Reasons are attributed; test reach is our reading of the actual setup and assertions.</p></div><div><h3>Deletion accounting</h3><p>Tracked renamed files before interpreting deletions. Looked for replacement witnesses when assertions or fixtures changed. A replacement is shown with its new boundary, rather than treated as interchangeable with the old test.</p></div><div><h3>Execution limits</h3><p>Selected existing tests ran against supplied head builds on macOS 15 / Node 22.12.0. The package test typecheck ran for #148. This is not a full CI run; CLI end-to-end suites and Windows execution were not run for this experiment.</p></div></div>
{run_evidence()}
<p class="run-note">The retry probe is a separate reproduction of the new #131 socket scenario against supplied base/head builds. It creates temporary sockets/spools and records events; it does not launch a daemon or execute a CLI command. Tracked worktree status was clean before and after the selected checks.</p>
<p class="download-row"><a href="logs/manifest.json">Commands, commit IDs and status records</a> · <a href="logs/retry-probe.json">Before/after probe record</a> · <a href="README.md">Experiment README</a></p>
<details class="provenance"><summary>Exact revisions and reproduction commands</summary><table class="compact"><thead><tr><th>Subject</th><th>Base</th><th>Head</th></tr></thead><tbody><tr><th>#131</th><td><code>{SHAS[131,'base']}</code></td><td><code>{SHAS[131,'head']}</code></td></tr><tr><th>#148</th><td><code>{SHAS[148,'base']}</code></td><td><code>{SHAS[148,'head']}</code></td></tr></tbody></table><pre>python3 run_checks.py
node probe-retry.mjs
python3 build_page.py</pre><p>Run inside this experiment folder while the supplied worktrees and installed dependencies remain available. Opening index.html needs neither a server nor a worktree.</p></details></section>
</main><footer><span>Experiment 27 · test-honesty · built with Codex</span><a href="#top">Back to the opening ↑</a></footer>'''
    (OUT / 'index.html').write_text(document('Test honesty — what did the test actually see?', body))
    (OUT / 'inventory.json').write_text(json.dumps(INVENTORY, indent=2) + '\n')
    (OUT / 'sources/index.json').write_text(json.dumps(SOURCE_INDEX, indent=2) + '\n')
    print(f'Built index.html, {len(DECISIONS)} decision readings, {len(SOURCE_INDEX)} source snapshots and {sum(map(len, INVENTORY.values()))} exact file diffs.')


if __name__ == '__main__':
    main()
