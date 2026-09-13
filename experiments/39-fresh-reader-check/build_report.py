#!/usr/bin/env python3
"""Render this critique. Reads pinned source; writes only this experiment folder."""
from pathlib import Path
import hashlib
import html
import json
import re
import subprocess

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
GIT = REPO / 'worktrees/stack-head'
PIN = {
    '127-base': 'a1e325a5ff979bdfa25babc5554621c8c0f20497',
    '127-head': '64919bcbcf7fcc8202779b78c5f069b24662bb18',
    '131-base': 'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e',
    '131-head': 'b100221db48754656328391b878299c5a0bab443',
    '148-base': 'ba53c8e1662fd86d198b95321c90d9c9bef10184',
    '148-head': '20838f8dbf413e04767543eb2380d0d114da6c60',
    'stack-base': 'b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e',
    'stack-head': 'd07002357d3e9596bfaae910a1ac63b77981620b',
}
receipts = []
findings = []

def source(pin, path, lo, hi):
    raw = subprocess.check_output(['git', '-C', str(GIT), 'show', PIN[pin]+':'+path], text=True)
    lines = raw.splitlines()
    assert 1 <= lo <= hi <= len(lines), (pin, path, lo, hi, len(lines))
    text = '\n'.join(f'{i}: {lines[i-1]}' for i in range(lo, hi+1))
    return {'kind': 'source excerpt', 'origin': path, 'revision': PIN[pin], 'lines': [lo, hi],
            'source_sha256': hashlib.sha256(raw.encode()).hexdigest(), 'text': text}

def diff(key, target=None):
    path = REPO / 'inputs' / key / 'diff.patch'
    raw = path.read_text()
    parts = re.split(r'(?=^diff --git )', raw, flags=re.M)
    selected = raw if target is None else ''.join(p for p in parts if p and p.splitlines()[0].split(' b/',1)[1] == target)
    assert selected, (key, target)
    return {'kind': 'supplied diff', 'origin': str(path.relative_to(REPO)), 'target': target,
            'source_sha256': hashlib.sha256(raw.encode()).hexdigest(), 'text': selected}

def local(path, key=None):
    raw = (HERE / path).read_text()
    text = json.loads(raw)[key] if key else raw
    return {'kind': 'captured page' if path.startswith('captures/') else 'local record',
            'origin': path, 'source_sha256': hashlib.sha256(raw.encode()).hexdigest(), 'text': text}

def add(id, title, account, *sources):
    assert id not in [f['id'] for f in findings]
    finding = {'id': id, 'title': title, 'account': account, 'receipts': []}
    for i, receipt in enumerate(sources, 1):
        receipt = {**receipt, 'id': f'{id}-{i}'}
        receipts.append(receipt)
        finding['receipts'].append(receipt['id'])
    findings.append(finding)

add('cache-delta', '#127: the complete small delta',
    'The six-file patch adds four core-scope cases and six semantic-service cases, retains the previous semantic assertions, exports the scope, replaces six maps with handles, narrows beginTurn to files, and adds awaited release at service and backend boundaries. “No additional decision found” in the table is a bounded result of reading this delta, not a completeness certificate.',
    diff('pr-127'))

pr127 = json.loads((REPO/'inputs/pr-127/pr.json').read_text())
add('release-provenance', '#127: release is disclosed; the parity explanation remains a separate question',
    'The body names the backend as the release barrier, labels an awaited release boundary and shows the Promise-returning surface. Its Context still promises preservation. These establish disclosure of the await choice; they do not supply a separate reconciliation of the changed failure/completion behavior with that promise.',
    {'kind': 'PR body from supplied bundle', 'origin': 'inputs/pr-127/pr.json', 'text': pr127['body']})

add('policy-worker', '#131: validation now precedes thread creation',
    'The parent constructor newly calls DaemonPolicy.fromSerialized before new Worker. Inference from ordering: malformed serialized policy can throw in the parent constructor before any thread is started. This is distinct from merely transporting or receiving the chunk cap.',
    diff('pr-131', 'apps/cli/src/daemon/daemon-navigation-worker.ts'),
    source('131-head', 'apps/cli/src/daemon/daemon-navigation-worker.ts', 73, 101))

add('policy-errors', '#131: the later error can escape; failed fetch is still terminal',
    'The old nested completion catch rethrows the earlier accepted-close error. The loop instead awaits each current completion on its next iteration; a later nonrecoverable error can escape as itself. Failure to obtain the next receipt still rethrows the current earlier error. Separately, fetchCompletion rejection goes to fail, not another fetch loop. The numeric limit alone does not add repeated fetch recovery in #131. Later stack layers are not being substituted for this head.',
    diff('pr-131', 'apps/cli/src/daemon/local-daemon-transport.ts'),
    source('131-head', 'apps/cli/src/daemon/local-daemon-transport.ts', 402, 430),
    source('131-head', 'apps/cli/src/daemon/local-daemon-transport.ts', 474, 497))

add('policy-fixtures', '#131: helper translation can remove disk stimulus',
    'The transport helper clamps requested inline bytes to at least the default 64 KiB chunk and creates the output directory itself. The output capture spills only when raw bytes exceed its inline threshold. Therefore a one-chunk 64 KiB fixture that requests zero can stay inline, while its empty-directory assertion survives. This is a source-derived inference; I did not rerun experiment 08’s instrumentation or independently certify its fifteen-case count. The workspace helper also declares memoryCapBytes but does not apply that field when composing policy.',
    diff('pr-131', 'apps/cli/test/helpers/local-daemon-transport.ts'),
    source('131-head', 'apps/cli/src/command-execution-result.ts', 270, 289),
    source('131-head', 'apps/cli/src/daemon/local-daemon-transport-execution.test.ts', 605, 669),
    diff('pr-131', 'apps/cli/test/helpers/workspace-daemon.ts'))

cast_text = (HERE/'source-check/pr131-test-changed-lines.txt').read_text()
cast_sources = []
for part in re.split(r'(?=^diff --git )', cast_text, flags=re.M):
    if 'as unknown as ConstructorParameters' in part:
        cast_sources.append({'kind': 'changed test lines; imports omitted by inventory',
                             'origin': 'source-check/pr131-test-changed-lines.txt', 'text': part})
assert len(cast_sources) == 3
add('policy-casts', '#131: three added test constructions cast through unknown',
    'The new spool-capacity, diagnostic-queue and resource-cadence cases cast options through unknown into ConstructorParameters. This is a test-construction choice visible in the patch, not a claim that the tests or production code are incorrect.', *cast_sources)

add('policy-seams', '#131: required policy does not remove every optional/scalar input',
    'StoredCommandOutput gains an optional maximumRecordBytes constructor member and uses a non-null assertion when passing it to file decoding. Registry grace remains an optional scalar override; transport writeChunkSize remains an option. This qualifies a blanket description of every numeric seam as removed; it is not a claim of a new user tuning API.',
    source('131-head', 'apps/cli/src/command-execution-result.ts', 71, 90),
    source('131-head', 'apps/cli/src/daemon/daemon-registry.ts', 385, 391),
    source('131-head', 'apps/cli/src/daemon/local-daemon-transport.ts', 21, 33))

add('policy-oracle', '#131: overlapping resource oracles are not identical case sets',
    'The deleted resource-policy test includes a 256 MiB input row. The existing central policy oracle covers a one-byte input, 512 MiB, 1 GiB, 16 GiB and 64 GiB. Its default and recipe assertions remain, but that is not a literal relocation of every deleted case.',
    diff('pr-131', 'apps/cli/src/daemon/daemon-resource-monitor.test.ts'),
    source('131-base', 'packages/daemon/src/daemon-policy.test.ts', 64, 104))

add('client-protocol', '#148: two coexisting request builders take protocol version from different places',
    'The new client runtime sends DAEMON_PROTOCOL_VERSION. The still-active CLI dispatcher sends record.protocolVersion. This is a difference between staged and active implementations at #148; the PR has not yet switched the shipped CLI to the new request builder.',
    source('148-head', 'packages/daemon/src/client/daemon-client-runtime.ts', 184, 201),
    source('148-head', 'apps/cli/src/daemon/daemon-command-dispatcher.ts', 205, 228))

add('client-runtime', '#148: one constructor-started runtime promise',
    'DaemonClient starts loading in its constructor and retains one promise, which execute/control await. There is no replacement or retry assignment after rejection in this facade. Experiment 08’s visible record 10 already says constructor and retained promise; its absence from my initial note is a recall miss.',
    source('148-head', 'packages/daemon/src/client/daemon-client.ts', 20, 64))

add('clock-scan', '#148: the raw-clock scan only sees lifecycle siblings',
    'readdirSync(new URL(".", import.meta.url)) enumerates one directory. The source filter is not recursive. At this head, the test resides in lifecycle/, so the test title’s broad “daemon mechanisms” wording does not describe its entire checked area.',
    source('148-head', 'packages/daemon/src/lifecycle/daemon-clock.test.ts', 36, 49))

add('test-scheduling', '#148: package test files run serially',
    'The newly added daemon Vitest configuration sets fileParallelism: false. Copy-aware diff detection can show this as copied context from the CLI config; the original supplied diff correctly presents a new package configuration.',
    diff('pr-148', 'packages/daemon/vitest.config.ts'))

add('policy-retirement', '#148: the policy plan records a retirement condition',
    'The existing Migration access paragraph schedules removal of the temporary policy-testing subpath after app-owned mechanism tests move package-local. This is recorded intent for retirement. It does not explain the exact bundle of lint-test deletions, their timing tradeoff, or the unrelated clock scan scope. The critique asks for that distinction rather than inventing a motive.',
    source('148-head', 'plans/005/daemon-policy.md', 62, 66),
    diff('pr-148', 'packages/daemon/package.json'),
    diff('pr-148', 'eslint.config.mjs'))

add('registry-tightening', '#148: centralization also changes accepted comparisons',
    'The old isStartupOwner compares only the instance ID. The new version routes through a predicate that also requires the expected identity key. Some adoption rechecks likewise move from a subset to the full adopted owner. These are concrete before/after consequences of centralization; a list of the new field names alone does not teach the changed outcome.',
    source('148-base', 'apps/cli/src/daemon/daemon-registry.ts', 403, 416),
    source('148-head', 'packages/daemon/src/registry/registry.ts', 516, 525),
    source('148-head', 'packages/daemon/src/registry/registry.ts', 842, 863),
    source('148-head', 'packages/daemon/src/registry/registry.ts', 250, 271))

add('stack-owner', 'Stack: the last configured owner is primary',
    'Every configured owner is appended in discovery order, while the primary map is overwritten for each owner. The added test explicitly selects /repo/c.json after a, b, c. Experiment 01’s “first owner” teaching conflicts with this; experiment 22’s wording invited the same reading; experiment 14 taught last correctly.',
    source('stack-head', 'packages/core/src/workspace/project-graph.ts', 321, 340),
    source('stack-head', 'packages/core/src/workspace/project-graph.test.ts', 244, 269))

add('stack-diagnostics', 'Stack: parsed inspection replaces raw diagnostic-file assertions',
    'The final CLI diagnostic test reads inspector events. The patch removes assertions for backup count, file size and absence of secrets in raw file contents. The replacement secret assertion examines JSON.stringify(events). These are different observation boundaries; retaining a parsed-event check does not retain every old raw-file assertion.',
    diff('stack', 'apps/cli/test/e2e/daemon/diagnostic-output.test.ts'))

add('stack-executor', 'Stack: the concrete CLI executor derives system policy itself',
    'createDaemonExecutor calls createDefaultDependencies with DaemonPolicy.currentSystem(). The host executor’s construction therefore has a separate system-policy derivation from the daemon’s injected mechanism snapshot. This is a boundary the phrase “one policy crosses the processes” can hide.',
    source('stack-head', 'apps/cli/src/daemon-executor.ts', 130, 150))

add('stack-cwd', 'Stack: daemon start/stop resolve relative --cwd from ProgramContext.cwd',
    'The old option string goes directly to workspace creation. The final DaemonWorkspaceDirectory.resolve uses node:path resolve with context.cwd before both start and stop. This is a host-visible normalization choice alongside the package move.',
    diff('stack', 'apps/cli/src/commands/daemon/register-daemon-command.ts'))

add('stack-concurrent', 'Stack: the concurrent cold-start test survives #148, then is deleted',
    'The reference-workspace integration case is still present at #148 head. The stack delta removes the dispatcher integration test; the final #149 head no longer has the file. Experiment 01 attaches this deletion to #148, which misplaces it in the timeline.',
    source('148-head', 'apps/cli/src/daemon/daemon-command-dispatcher.integration.test.ts', 31, 60),
    diff('stack', 'apps/cli/src/daemon/daemon-command-dispatcher.integration.test.ts'))

add('adjacent-pair', '#146 / #147: the two coordinator deltas',
    'These adjacent diffs were generated from the supplied stack commit endpoints, not inferred from the final renamed classes. They ground the “no additional coordination decision found” result for experiment 30. That result includes the latest delivery barrier, trace fencing, immutable acceptance metadata, provider substitutions, process delegation and changed assertions; it is not a suite result.',
    local('source-check/pr146-pins.json'), local('source-check/pr146.patch'),
    local('source-check/pr147-pins.json'), local('source-check/pr147.patch'))

release_capture = (HERE/'captures/04-textbook-chapter--initial.txt').read_text()
release_quotes = []
for phrase in ['One failure path changed; PR body silent', 'None found. The PR body shows it']:
    at = release_capture.index(phrase)
    release_quotes.append(release_capture[max(0,at-40):at+520])
add('r4-release', 'Rule 4 witness: experiment 04 changes its disclosure claim below 4.0',
    'Parent: the declared complete overview says the PR body is silent. Child: the release chapter says the body shows the awaited boundary and Promise signature. This changes what the reader believes was disclosed, rather than adding detail to an unchanged disclosure claim. The narrower missing-rationale question can stay at the top without calling the body silent.',
    {'kind': 'captured rendered text excerpts', 'origin': 'captures/04-textbook-chapter--initial.txt', 'text': '\n\n…\n\n'.join(release_quotes)})

fixture_capture = (HERE/'captures/27-test-honesty--initial.txt').read_text()
at = fixture_capture.index('Keep tiny test knobs in test-only adapters')
add('r4-fixtures', 'Rule 4 witness: experiment 27 adds loss of a disk witness below row 05',
    'Parent: forced spill becomes a threshold crossing, with two other fixture adjustments. Child: a different helper clamps to the default chunk size and may stop reaching the same storage state. The source example in policy-fixtures confirms why that qualification matters. This is a narrow flag on the fixture account, not a claim that every fixture in the PR stopped spilling.',
    {'kind': 'captured rendered root excerpt', 'origin': 'captures/27-test-honesty--initial.txt', 'text': fixture_capture[at:at+440]},
    local('captures/27-test-honesty--adapter-detail.json', 'added'))

notes = {n['page']: n for n in json.loads((HERE/'blind-notes.json').read_text())['notes']}
for page, edits in json.loads((HERE/'editorial-notes.json').read_text())['notes'].items():
    notes[page] = {**notes[page], **edits}
rows = json.loads((HERE/'comparisons.json').read_text())['rows']
census = json.loads((HERE/'census.json').read_text())
experiments = {e['experiment'][:2]: e for e in census['experiments'] if e.get('finished_at_census')}
finding_ids = {f['id'] for f in findings}
for row in rows:
    assert row['page'] in notes
    assert row['page'][:2] in experiments
    for miss in row['miss']:
        assert set(miss['evidence']) <= finding_ids
    if row['flagEvidence']:
        assert row['flagEvidence'] in finding_ids
assert len(rows) == len(notes) == 42
assert len(experiments) == 34

def esc(text):
    return html.escape(str(text), quote=True)

def refs(ids):
    return ' '.join(f'<a class="receipt" href="evidence.html#{esc(id)}">{esc(id)}</a>' for id in ids)

def readable(note):
    # Editorial spacing only. The sealed JSON remains the pre-diff record.
    replacements = {
        'TSinstance': 'TypeScript instance', 'coreinstance': 'core instance', 'sixspaces': 'six spaces',
        'sharedreferences': 'shared references', 'exactpresence': 'exact presence',
        'failureasymmetry': 'failure asymmetry', 'oldsettlement': 'old settlement',
        'successonly': 'successful refresh only', 'clearnow': 'clear now', 'paritygap': 'parity gap',
        'files/API': 'file-list and public API', 'nohandle': 'no handle', 'newtests': 'new tests',
        'keepfive': 'keep five existing cases', 'delayedrejection': 'delayed rejection',
        'same tenchoices': 'same ten choices', 'tenchoices': 'ten choices',
        'asA': 'as A', 'illustrative/test-derived': 'illustrative / test-derived',
        'coreimplementation/TS trigger': 'core implementation / TypeScript trigger',
        'fullcache': 'full cache', 'exactvalues': 'exact values', 'successfulrefresh': 'successful refresh',
        'awaitedrelease/paritytension': 'awaited release / parity tension',
        'TSprojections/wrappers': 'TypeScript projections / wrappers', 'retainedarray': 'retained array',
        'composedunrevoked': 'composed, unrevoked', 'historicalstaging/freezeexclusions': 'historical staging / freeze exclusions',
        'constructorimport sharedpromise': 'constructor import and shared promise',
        'lazyroutes/freshlocal/independentwarmup': 'lazy routes / fresh local executors / independent warm-up',
        'outputcleanup': 'output cleanup', 'hostoptionalpolicy/probe': 'host policy option / readiness probe',
        'disabledcontrol': 'disabled control behavior', 'coordinatorauthregistry': 'coordinator, authentication, registry',
        'idledeferral': 'idle deferral', 'entryandworkeroracleloss': 'entry and worker assertion losses',
        'serialtsx': 'serial scheduling / tsx', 'latererror': 'later error',
        'deleted256MiB': 'deleted 256 MiB', 'tests cast through unknown': 'tests cast through unknown',
        'workerhost': 'worker host', 'fullbody': 'full body', 'same six': 'same six',
    }
    for before, after in replacements.items():
        note = note.replace(before, after)
    note = re.sub(r'(?<=\d)(?=ms\b|MiB\b|KiB\b)', ' ', note)
    return note

def entry(row):
    ex = experiments[row['page'][:2]]
    folder, file = ex['experiment'], ex['entry']
    suffix = ''
    if row['page']=='01-pr127': suffix = '#pr127'
    if row['page']=='20-pr131': suffix = '#pr131'
    if row['page']=='21-video': file = 'video.html'
    if row['page']=='32-starter': file = 'starter.html'
    if row['page']=='33-B': file = 'failure.html'
    return folder, f'../{folder}/{file}{suffix}'

def capture_path(row):
    ex = experiments[row['page'][:2]]['experiment']
    suffix = {'01-pr127':'pr127','20-pr131':'pr131','21-video':'video','32-starter':'starter','33-B':'failure'}.get(row['page'],'initial')
    return f'captures/{ex}--{suffix}.txt'

css = '''
:root{color-scheme:light;--ink:#202321;--muted:#59625c;--line:#cbd0cb;--paper:#fafbf8;--flag:#fff0dc}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 system-ui,-apple-system,sans-serif}
main{max-width:1760px;margin:auto;padding:28px}h1{font-size:36px;letter-spacing:-1px;margin:0 0 12px}p{max-width:105ch}a{color:#155640;text-underline-offset:3px}a:focus-visible{outline:3px solid #cc791c;outline-offset:3px}
.eyebrow,.muted,small{color:var(--muted)}.eyebrow{text-transform:uppercase;letter-spacing:2px;font-size:12px}.rail{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0}.rail a{font-variant-numeric:tabular-nums}
.sequence{max-width:900px;display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:20px 0 5px}.box{padding:9px 14px;border:1px solid var(--line);background:white}.table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;min-width:1120px;table-layout:fixed;background:white}caption{text-align:left;font-weight:700;padding:14px 0}th,td{border:1px solid var(--line);padding:15px;vertical-align:top;text-align:left}thead th{background:#e8ede6;position:sticky;top:0;z-index:2}thead th:nth-child(1){width:15%}thead th:nth-child(2){width:31%}thead th:nth-child(3){width:33%}thead th:nth-child(4){width:21%}tbody th{font-weight:500;background:#f4f6f1}td ul{margin:0;padding-left:18px}td li+li{margin-top:8px}td p{margin:0 0 10px}.root{margin-top:12px;font-size:12px;color:var(--muted)}.receipt{font:11px ui-monospace,monospace;display:inline-block;margin:5px 7px 0 0}.flag{background:var(--flag);border-left:4px solid #a46518}.flag strong{display:block;margin-bottom:8px}.row-id{font:12px ui-monospace,monospace;display:block;margin-bottom:6px}.back{display:inline-block;margin-top:18px;font-size:12px}footer{margin-top:24px;padding-top:12px;border-top:1px solid var(--line)}article.evidence{border-top:2px solid var(--line);padding:26px 0;scroll-margin-top:15px}article.evidence h2{font-size:23px}.source{margin:15px 0;border:1px solid var(--line);background:white}summary{cursor:pointer;padding:12px;font-weight:600}pre{overflow:auto;padding:15px;margin:0;border-top:1px solid var(--line);font:12px/1.5 ui-monospace,SFMono-Regular,monospace;white-space:pre}.provenance{padding:0 12px;font-size:12px;overflow-wrap:anywhere}.evidence-nav{display:flex;flex-wrap:wrap;gap:8px 18px;max-width:1100px}
@media(max-width:700px){main{padding:16px}h1{font-size:29px}.table-wrap{margin:0 -8px}table{font-size:14px}}
@media print{body{background:white}main{padding:0}table{min-width:0;font-size:9px}th,td{padding:6px}thead{display:table-header-group}thead th{position:static}.rail,.back{display:none}a{color:inherit}.table-wrap{overflow:visible}tr{break-inside:avoid}pre{white-space:pre-wrap}}
'''
(HERE/'style.css').write_text(css)

rail = ''.join(f'<a href="#row-{esc(next(r["page"] for r in rows if r["page"][:2]==number))}">{number}</a>' for number in experiments)
header = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>39 · Fresh reader check</title><link rel="stylesheet" href="style.css"></head><body><main id="top">
<p class="eyebrow">Experiment 39 · critique · snapshot 13 September 2026</p>
<h1>What I learned. What the diff added.</h1>
<p>One table for the 34 experiments finished at <strong>03:12:45 UTC / 06:12:45 Istanbul</strong>: 01–33 and 35. Its 42 rows include separate subject views, the standalone film, the starter component and both openings in experiment 33. Finished meant a README and its documented entry existed at that cutoff. Later completions are outside this frozen read.</p>
<div class="sequence" role="img" aria-label="Read every page first; seal the notes; then compare independent diffs and record misses"><span class="box">Pages → reader notes</span><span>→</span><span class="box">Seal the notes</span><span>→</span><span class="box">Independent diffs → misses</span></div>
<p class="muted"><small>Simplified sequence. All root notes preceded independent source reading. This was one sequential reader; earlier pages could teach later ones. It is not a controlled comparison of fresh humans.</small></p>
<p><strong>How to read the table:</strong> “Learned” is the sealed page-only account, edited for readability. “Missed” reports what source comparison added or corrected, not an automatic claim that the page contains no such sentence. A <strong>rule-4 flag</strong> needs an identifiable parent → child surprise; missing source coverage alone is kept separate. “Not observed” applies only to sampled depth. No scores, rankings or correctness verdicts.</p>
<p>The complete declared reading layer counts as the top, even when it extends below the first screen. Marked lossy introductions may precede it. Method guides, source archives and templates are support material, rather than additional subject pages. The film and starter are explicitly limited supplements.</p>
<nav class="rail" aria-label="Jump to experiment">'''+rail+'''</nav>
<div class="table-wrap"><table><caption>The complete comparison · every finding is visible before opening its source</caption><thead><tr><th scope="col">Finished page / reading scope</th><th scope="col">Decisions learned without the independent diff</th><th scope="col">What the diff added or corrected</th><th scope="col">Rule 4 · surprise on descent</th></tr></thead><tbody>'''
body = []
for row in rows:
    note = notes[row['page']]
    folder, href = entry(row)
    # Verify all documented page destinations before emitting the report.
    assert (HERE / href.split('#')[0]).resolve().exists(), href
    learned = readable(note['decisions'])
    learned_html = '<ul>'+''.join(f'<li>{esc(x.strip())}</li>' for x in learned.split(';') if x.strip())+'</ul>'
    missing_html = ''.join(f'<p>{esc(m["text"])}<br>{refs(m["evidence"])}</p>' for m in row['miss'])
    flag_class = ' class="flag"' if row['flag'] else ''
    flag_link = refs([row['flagEvidence']]) if row['flagEvidence'] else ''
    body.append(f'''<tr id="row-{esc(row['page'])}"><th scope="row"><span class="row-id">{esc(row['page'])}</span><a href="{esc(href)}">{esc(folder)}</a><p>{esc(row['subject'])}</p><div class="root">Layer read: {esc(readable(note['root']))}</div><a class="back" href="{esc(capture_path(row))}">Captured page text</a><br><a class="back" href="#top">↑ Table opening</a></th><td>{learned_html}</td><td>{missing_html}</td><td{flag_class}>{esc(row['descent'])}<br>{flag_link}</td></tr>''')

footer = '''</tbody></table></div><footer><p>Source comparison used the supplied #127, #131, #148 and stack patches; pinned source from their base/head commits; and the #146/#147 deltas for the adjacent-pair page. For wide diffs I used file/changed-line inventories and contextual reads, including removed assertions and copy-aware comparison. This is a bounded reading record, not an exhaustive decision extractor. No symnav suite was run for this critique.</p>
<p><a href="evidence.html">Source excerpts and the two descent witnesses</a> · <a href="blind-notes.json">Sealed page-only notes</a> · <a href="blind-phase-seal.json">Phase seal and limits</a> · <a href="census.json">Cutoff and file hashes</a> · <a href="scope-recheck.json">Unchanged-file recheck</a> · <a href="comparisons.json">Structured table</a></p>
<p class="muted">The 04 and 27 flags concern different changes: disclosure in the overview, and a test’s storage premise. The other rows retain their own misses; absence of a flag is not a pass for every rule.</p></footer></main></body></html>'''
(HERE/'index.html').write_text(header+'\n'.join(body)+footer)

receipt_map = {r['id']:r for r in receipts}
evidence_nav = ''.join(f'<a href="#{esc(f["id"])}">{esc(f["id"])}</a>' for f in findings)
evidence_html = ['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>39 · Source witnesses</title><link rel="stylesheet" href="style.css"></head><body><main><p><a href="index.html">← Return to the complete table</a></p><h1>Check a finding.</h1><p>These excerpts support the findings already listed in the table. Source-derived consequences are identified as inference. Page captures support teaching claims; pinned code, diffs and prose support source corrections. The excerpts are not test execution results.</p><nav class="evidence-nav">'+evidence_nav+'</nav>']
for f in findings:
    linked_rows = [r['page'] for r in rows if any(f['id'] in m['evidence'] for m in r['miss']) or r['flagEvidence']==f['id']]
    back_links = ' · '.join(f'<a href="index.html#row-{esc(p)}">{esc(p)}</a>' for p in linked_rows)
    evidence_html.append(f'<article class="evidence" id="{esc(f["id"])}"><h2>{esc(f["title"])}</h2><p>{esc(f["account"])}</p><p>Return to row: {back_links}</p>')
    for rid in f['receipts']:
        r=receipt_map[rid]
        meta = ' · '.join(str(r[k]) for k in ('kind','revision','lines','source_sha256') if k in r)
        evidence_html.append(f'<details class="source"><summary>{esc(r["origin"])}</summary><p class="provenance">{esc(meta)}</p><pre>{esc(r["text"])}</pre></details>')
    evidence_html.append('</article>')
evidence_html.append('<p><a href="index.html">← Return to the complete table</a></p></main></body></html>')
(HERE/'evidence.html').write_text('\n'.join(evidence_html))
(HERE/'source-check/source-receipts.json').write_text(json.dumps({'pins':PIN,'findings':findings,'receipts':receipts},indent=2)+'\n')
print(json.dumps({'rows':len(rows),'finished_experiments':len(experiments),'findings':len(findings),'source_receipts':len(receipts),'rule4_witnesses':[r['page'] for r in rows if r['flag']]}))
