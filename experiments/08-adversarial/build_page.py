"""Build the offline page and line-addressable evidence from the supplied snapshots."""
from pathlib import Path
import hashlib
import html
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
SOURCES = OUT / "sources"
SOURCES.mkdir(exist_ok=True)
esc = html.escape
SHAS = {key: subprocess.check_output(["git", "-C", str(ROOT / "worktrees" / key), "rev-parse", "HEAD"], text=True).strip() for key in ["pr-131-base", "pr-131-head", "pr-148-base", "pr-148-head"]}
SOURCE_INDEX = {}


def save_source(key, path, text, sha):
    filename = re.sub(r"[^a-zA-Z0-9_-]", "-", key + "--" + path) + ".html"
    if filename in SOURCE_INDEX:
        return filename
    SOURCE_INDEX[filename] = {"key": key, "path": path, "sha": sha, "lines": len(text.splitlines()), "sha256": hashlib.sha256(text.encode()).hexdigest()}
    lines = '\n'.join(f'<span class="source-line" id="L{i}"><a class="line-link" href="#L{i}" aria-label="Line {i}">{i}</a>{esc(line)}</span>' for i, line in enumerate(text.splitlines(), 1))
    (SOURCES / filename).write_text(f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{esc(key + ': ' + path)}</title><link rel="stylesheet" href="../styles.css"><body class="source-page"><a href="../index.html">← Decision record</a><h1>{esc(path)}</h1><p class="meta">{esc(key)} · {esc(sha)}<br>Verbatim local snapshot. Line links are permanent within this artifact.</p><div class="source-code">{lines}</div></body></html>''')
    return filename


def cite(key, path, needle, count=16, title=None, before=0):
    text = (ROOT / "worktrees" / key / path).read_text()
    position = text.index(needle)
    line = max(1, text[:position].count('\n') + 1 - before)
    return source_excerpt(key, path, text, SHAS[key], line, count, title or needle)


def source_excerpt(key, path, text, sha, start, count, title):
    filename = save_source(key, path, text, sha)
    lines = text.splitlines()
    end = min(start + count - 1, len(lines))
    code = '\n'.join(f'<span class="lineno">{i}</span>{esc(lines[i-1])}' for i in range(start, end + 1))
    return f'''<details class="citation"><summary>{esc(title)}<span class="locator">{esc(key)} · {esc(path)} : {start}–{end}</span></summary><a class="source-link" href="sources/{filename}#L{start}" target="_blank" rel="noopener">Open full local snapshot ↗ · {esc(sha[:10])}</a><pre>{code}</pre></details>'''


def body(pr, section="## Decisions"):
    data = json.loads((ROOT / "inputs" / f"pr-{pr}" / "pr.json").read_text())
    text = '# PR ' + str(pr) + ' — ' + data['title'] + '\n\n' + data['body'] + '\n\n## Commit subjects and bodies\n\n' + '\n'.join(c['sha']+' '+c['subject']+'\n'+c['body'] for c in data['commits'])
    start = text[:text.index(section)].count('\n') + 1
    return source_excerpt('pr-'+str(pr), 'pr-body-and-commits.md', text, SHAS[f'pr-{pr}-head'], start, 14, 'Recorded rationale · PR body')


def table(headers, rows, caption=None):
    return '<div class="table-scroll"><table class="matrix">' + (f'<caption>{caption}</caption>' if caption else '') + '<thead><tr>' + ''.join('<th scope="col">'+x+'</th>' for x in headers) + '</tr></thead><tbody>' + ''.join('<tr>'+''.join('<td>'+str(x)+'</td>' for x in row)+'</tr>' for row in rows) + '</tbody></table></div>'


def chain(*nodes, note=''):
    parts = []
    for i, node in enumerate(nodes):
        if i: parts.append('<span class="arr" aria-hidden="true">→</span>')
        title, subtitle = node
        parts.append(f'<span><strong>{title}</strong><small>{subtitle}</small></span>')
    return '<div class="mini-chain">'+''.join(parts)+'</div>'+(f'<p class="under">{note}</p>' if note else '')


def compare(*nodes, note=''):
    return '<div class="mini-chain">'+''.join(f'<span><strong>{title}</strong><small>{subtitle}</small></span>' for title,subtitle in nodes)+'</div>'+(f'<p class="under">{note}</p>' if note else '')


cards = []
def card(id, pr, n, short, title, micro, choices, attack, limit, question, deep, sources):
    cards.append(dict(id=id, pr=pr, n=n, short=short, title=title, micro=micro, choices=choices, attack=attack, limit=limit, question=question, deep=deep, sources=sources))


card('p131-policy',131,'01','Policy ownership','The snapshot becomes the source of the limits.',
    chain(('One policy','existing package snapshot'),('3 places','caller · daemon · worker'),note='What moves: the source of thresholds. The CLI still owns these mechanisms at this head.'),
    [('stated','Require output, resource, startup, shutdown, transport, delivery and diagnostic sections so omitted inputs cannot recreate local defaults.'),
     ('stated','Feed the same resource values into reporting, supervision and worker limits; remove the local memory derivation.'),
     ('stated','Route chunking, inline/result/aggregate capacity, framing, logs and trace retention through their policy owners. Preserve defaults and the absence of an accepted-completion deadline.')],
    'A change to one policy now reaches storage, transport validation and worker output together. “One owner” reduces scattered defaults but increases the number of consumers affected by a policy edit.',
    'The snapshot and its default/validation tests already exist in the base. This PR wires consumers to it; it does not introduce user tuning or move the mechanisms into the package.',
    'Which consumers must change together when an output limit changes?',
    '''<h4>Same value, several enforcement points</h4>
    <div class="three"><div class="box changed"><strong>Caller process</strong><small>CliProgramExecutor<br>OrderedCommandOutput<br>LocalDaemonTransport</small></div><div class="box changed"><strong>Daemon process</strong><small>CompletionSpool<br>ResourceSupervisor<br>Logger · Lifetime</small></div><div class="box changed"><strong>Worker thread</strong><small>Output protocol<br>Chunk validation<br>Heap sampler</small></div></div>
    <p class="legend">Grouped mechanism map. Serialization preserves values across process boundaries; these are not shared JavaScript object references.</p>''' + table(['Policy family','Consumers now read it','Preserved default examples'],[
        ['Output + transport','Capture → spool → chunk codec → frame decoder → worker validator','64 KiB chunks; 256 KiB inline; 256 MiB/result; 512 MiB aggregate; 8 MiB JSON and 256 KiB transfer control'],
        ['Resources','RSS supervisor → shedding/replacement → worker limits → heap sampling','250 ms supervision; 25 ms heap sampling; two replacements in a ten-minute window'],
        ['Startup + shutdown','Election, launcher, authorization, stop, lifetime, acknowledgement drain','15 s coordination grace; 30 min idle; separate 10/20/5 ms polling purposes'],
        ['Diagnostics','Logger and disconnected-operation traces','10 MiB rotation; four backups; 1,024 queued events/traces; five-minute trace retention']
    ]) + '<p>These defaults are background to the wiring change. The existing policy record gives each its reason; no reason is inferred from its numeric value.</p>',
    [body(131), cite('pr-131-head','apps/cli/src/daemon/workspace-daemon.ts','const resourcePolicy = policy.values.resources',29,'One resource slice feeds the supervisor and worker',before=10), cite('pr-131-head','apps/cli/src/command-execution-result.ts','constructor(options: OrderedCommandOutputOptions)',16,'Capture receives a required output slice'), cite('pr-131-head','apps/cli/src/daemon/daemon-navigation-worker.ts','this.maximumChunkRawBytes = DaemonPolicy.fromSerialized',8,'Worker parent validates from the serialized snapshot'), cite('pr-131-head','plans/005/daemon-policy.md','| `transport.singleResponseTimeoutMs`',43,'Pre-existing policy record: values, reasons, intended oracles')])

card('p131-scopes',131,'02','Deadlines & attempts','Equal-looking waits and retries keep separate owners.',
    compare(('100 ms','status observation'),('250 ms','ordinary one-response'),('5 s','execute admission'),note='These waits are different purposes. Accepted completion has no timer.'),
    [('stated','Select the short status timeout at composition, because a status observer and an execution-status exchange have different deadlines.'),
     ('stated','Replace startup’s fixed retry and delivery’s fixed/boolean allowances with numeric policy budgets. Keep reattachment separate from fetch-resume allowance per execute attempt.'),
     ('stated','Keep authorization, readiness observation, stop escalation, process-exit polling, acknowledgement drain and diagnostic retention independently configurable in tests.')],
    'The new field names can suggest that the base shared one retry budget. It did not: fetch state already lived inside executeOnce, and reattachment lived outside. Numeric representation and its loop rewrite are the changes.',
    'Default limits remain one startup retry, one post-accept reattachment and one fetch resume per execute attempt. Tests distinguish the two timeout fields with opposite overrides; their 100/250 ms defaults are pinned by the policy test. A recorded reattach-then-fetch succeeds in both versions.',
    'Can a composition call accidentally turn an ordinary exchange into the short status observer?',
    table(['Boundary','Allowance','Reset / stop condition'],[
      ['Lifecycle one-response exchange','100 ms for a composed status observer; 250 ms otherwise','One socket exchange'],
      ['Execute admission','5 seconds','Acceptance ends this deadline; completion remains untimed'],
      ['Startup retry','1 child failure retry','An ensureRunning call; only child-exit or warmup-lost failures qualify'],
      ['Post-accept reattachment','1 extra execute submission','Outer completion loop; same request identity'],
      ['Fetch resume','1 per execute attempt','Inner transfer state; requires acceptance and a manifest'],
      ['Forced stop reserve','min(500 ms, floor(stopTimeout / 2))','Part of the stop window, not an extra window']
    ]) + '''<div class="two"><div class="step"><h5>BASE</h5><p>Outer completion wrapper permits one reattachment.<br>Each <code>executeOnce</code> creates its own <code>resumeStarted = false</code>.</p></div><div class="step"><h5>HEAD</h5><p>Outer loop reads <code>postAcceptanceExecutionReattachmentLimit</code>.<br>Each <code>executeOnce</code> creates its own <code>resumeCount = 0</code>.</p></div></div><p>The recovery record below shows the failure-selection consequence of changing that outer loop.</p>''',
    [body(131),cite('pr-131-head','apps/cli/src/daemon/local-daemon-transport.ts','constructor(policy: LocalDaemonTransportPolicy',22,'Timeout selected by composition purpose'),cite('pr-131-head','apps/cli/src/commands/daemon/register-daemon-command.ts','responseTimeoutPurpose: "status-observer"',10,'Status command chooses the short observer',before=4),cite('pr-131-base','apps/cli/src/daemon/local-daemon-transport.ts','private async completeWithOneReattachment',25,'Base has an outer reattachment wrapper'),cite('pr-131-base','apps/cli/src/daemon/local-daemon-transport.ts','let resumeStarted = false',13,'Base fetch budget is already scoped to executeOnce'),cite('pr-131-head','apps/cli/src/daemon/daemon-startup-coordinator.ts','async ensureRunning',22,'Startup retry becomes numeric'),cite('pr-131-head','apps/cli/src/daemon/local-daemon-transport-validation.test.ts','uses the status-observer timeout',47,'Status-observer test uses different policy fields'),cite('pr-131-head','apps/cli/src/daemon/local-daemon-transport-validation.test.ts','it("uses the ordinary timeout',38,'Execution-status test reverses the override values')])

card('p131-error',131,'03','Failure identity','Recovery now decides which failure survives.',
    chain(('close','first accepted stream'),('corrupt','accepted reattachment'),note='Recorded result: base → closed; head → corrupt. Two execute submissions in both.'),
    [('unexplained','After a reattachment is accepted, surface its completion error instead of retaining the first close error. No rationale for this failure-identity change was found.'),
     ('scope','Beyond the unchanged-failure-path promise: observable at the transport API. No difference in rendered CLI output was measured.')],
    'The loop conversion is not entirely behavior-neutral even at default budgets: its error provenance changes. The numeric-budget rationale does not explain which error a caller should receive.',
    'Both versions preserve accepted status and two submissions in this probe. A second plain close still yields closed in both; a reattached attempt can still fetch and complete in both. This is a narrow recovery trace.',
    'Should the transport expose the original loss of delivery or the latest authenticated failure?',
    '''<h4>One request, two accepted socket attempts</h4><div class="sandbox"><p class="lossy">Recorded executions against real base/head transport classes with a synthetic socket peer. This selector replays captured observations; it does not run the daemon.</p><div class="only-js"><label for="recovery-scenario">Captured scenario</label><select id="recovery-scenario"><option value="corrupt">Reattached stream contains a truncated frame</option><option value="close">Reattached stream closes again</option><option value="fetch">Reattached transfer resumes by fetch</option></select></div><p id="recovery-path" class="trace-note">accepted → close → reattach accepted → truncated frame</p><div class="outcome" aria-live="polite"><div><small>BASE · b3a6c4fa5d</small><strong id="recovery-base">closed</strong></div><div class="head"><small>HEAD · b100221db4</small><strong id="recovery-head">corrupt</strong></div></div><p id="recovery-note">Both submit execute twice. After the second admission, the head surfaces the new completion error.</p></div><div class="two"><div class="step"><h5>BASE CATCH SCOPE</h5><p>Await reattachment <em>and its completion</em> inside the inner try. Any error there rethrows the first error.</p></div><div class="step"><h5>HEAD CATCH SCOPE</h5><p>Await reattachment admission inside the inner try. Await its completion on the next loop iteration, which owns a new firstError.</p></div></div><p><a href="evidence/verified/reattach-131-base.jsonl">Base observations</a> · <a href="evidence/verified/reattach-131-head.jsonl">Head observations</a> · <a href="tools/reattach-probe.template.ts">Exact socket scenarios</a></p>''',
    [cite('pr-131-base','apps/cli/src/daemon/local-daemon-transport.ts','private async completeWithOneReattachment',22,'Base catches admission and completion together'),cite('pr-131-head','apps/cli/src/daemon/local-daemon-transport.ts','private async completeWithReattachments',31,'Head awaits the new completion in the outer loop'),cite('pr-131-head','plans/005/daemon-architecture-functional-spec.md','### Behavior is unchanged',19,'The source contract includes failure paths')])

card('p131-adapters',131,'04','Test stimuli','A helper can preserve the assertion and remove the file.',
    chain(('0 B','test requests forced spill'),('64 KiB','helper’s effective limit'),('[]','helper creates directory'),note='14 client cases stop entering disk spill. One aggregate-spool case also becomes inline.'),
    [('stated','Use test-only adapters, because small test limits must not restore production tuning seams.'),
     ('unexplained','Clamp the transport’s old inline option to at least one full chunk; create its output directory in the helper. Keep the tests’ empty-directory assertions.'),
     ('unexplained','Raise the aggregate-capacity case’s inline threshold from 1 to 6 bytes for a six-byte retained result. The retention/capacity assertion survives; its disk path does not.'),
     ('unexplained','The workspace adapter derives coupled output limits and accepts legacy memoryCapBytes without reading it. Fixtures split records or add bytes to meet valid policy constraints; the precise adapter recipes have no recorded rationale.')],
    'An empty directory can now mean “no file was ever created.” Fifteen existing cases lose a spill-path entry across the four instrumented suites, while their test results remain passing.',
    'This does not erase protocol rejection or capacity checks. Other tests still spill, including the daemon-death cleanup case and threshold-plus-one, sync/read/unlink fault cases. The valid policy requires chunk ≤ inline ≤ result ≤ aggregate.',
    'Which cleanup claims need a file to exist before the failure is triggered?',
    '''<h4>The missing premise is “a file existed”</h4><div class="sandbox"><p class="lossy">Illustration of the storage threshold only, using actual test payload sizes. No transport or filesystem runs in this page.</p><div class="only-js"><label for="spill-scenario">Test stimulus</label><select id="spill-scenario"><option value="corrupt">Corrupt resume · four short records (36 B)</option><option value="ack">Acknowledgement failure · one 64 KiB record</option><option value="dead">Daemon dies before resume · two 64 KiB records</option></select></div><div class="outcome" aria-live="polite"><div><small>BASE · inlineBytes = 0</small><strong id="spill-base">Disk path</strong></div><div class="head"><small>HEAD ADAPTER · inlineRawBytes = 65,536</small><strong id="spill-head">Inline</strong></div></div><p id="spill-explain">Four short records total 36 B. The corrupt-resume cases stay below 64 KiB.</p></div>''' + table(['Existing case family','Base → head stimulus','What the assertion still observes'],[
        ['Corrupt resumed controls · eight cases','Short records: forced disk → inline','Corrupt transfer rejected; retained daemon result and empty client directory'],
        ['Acknowledgement failures · five cases','One 64 KiB record: forced disk → inline','Accepted failure, daemon spool cleanup and empty client directory'],
        ['Failed delivery after manifest · one case','One 64 KiB record: forced disk → inline','Controlled terminal failure and empty client directory'],
        ['Aggregate capacity · one case','Six bytes with inline 1 → inline 6','Earlier completion retained; next completion exceeds aggregate budget'],
        ['Daemon death before resume · counterweight','Two 64 KiB records: disk → disk','Client cleanup still exercises the disk path'],
        ['Workspace test adapter','Derive chunk/inline/result/aggregate together; retain unused memoryCapBytes option','Resource limits now come from supplied/base policy; the legacy cap parameter alone has no effect'],
        ['Storage-fault fixtures · counterweight','Append another byte or split a record to cross a valid small inline threshold','Sync/read/unlink fault cases still enter storage paths']
    ]) + '''<p>The probe instruments entry to client spill and daemon spool creation in private source copies, then associates those calls with serial test names. These are path observations, not branch coverage percentages. <a href="evidence/verified/spill-comparison.txt">Changed cases</a> · <a href="evidence/verified/spill-131.json">Complete observation table</a> · <a href="tools/spill-coverage.sh">Instrumentation</a>.</p>''',
    [cite('pr-131-head','apps/cli/test/helpers/local-daemon-transport.ts','inlineRawBytes: Math.max',24,'The adapter raises the threshold and creates the directory',before=4),cite('pr-131-head','apps/cli/src/command-execution-result.ts','private async storeRecord',23,'Spill requires strictly more than the inline limit'),cite('pr-131-head','apps/cli/src/daemon/local-daemon-transport-execution.test.ts','import { TestLocalDaemonTransport as LocalDaemonTransport }',10,'Tests use the adapter under the old production class name'),cite('pr-131-head','apps/cli/src/daemon/completion-spool.test.ts','fails closed on aggregate capacity',36,'Aggregate-capacity test retains a six-byte inline result'),cite('pr-131-head','apps/cli/test/helpers/workspace-daemon.ts','interface TestWorkspaceDaemonPolicyOptions',47,'Legacy cap declaration and coupled output recipes'),cite('pr-131-head','packages/daemon/src/daemon-policy.ts','maximumChunkRawBytes === 0',11,'The valid policy constrains test inputs',before=8),body(131)])

card('p131-oracles',131,'05','Test replacements','Some deleted tests have a real successor.',
    chain(('Derivation','old CLI policy class'),('Policy tests','already in the package'),('Consumer tests','new off-default probes'),note='Separate “tested at a new owner” from “the stimulus changed.” Both occur in this PR.'),
    [('stated','Retire the duplicate resource-policy class and its derivation/default assertions; the central policy already pins those defaults and recipes.'),
     ('stated','Add off-default consumer checks for resource cadence, chunk size, diagnostic queue capacity and deadlines, plus retry-scope characterization; retain production defaults in the existing policy oracle.'),
     ('stated','Expand the meta-test’s list of forbidden old names and constructor seams to keep removed bypasses out of app production source.')],
    'A source-name scan only checks the spellings it lists, and policy-derived expected values alone cannot prove the default value is unchanged. The chain of evidence spans several files.',
    'The base package already has literal default expectations and resource derivation cases. The head also checks actual 250 ms sampling and off-default 17 ms sampling. These deletions are not the same loss as the adapter’s missing disk stimulus.',
    'Does the replacement test pin the rule, the consumer, or only the source spelling?',
    table(['Promise','Before','After / retained evidence'],[
        ['Memory derivation and constraints','CLI DaemonResourcePolicy test table','Existing package table for constrained memory, raw bytes and clamping'],
        ['250 ms sampling','Exported constant check plus timed consumer','Timed consumer retained; 17 ms custom cadence added'],
        ['Output boundaries','Local per-consumer numbers','Validated policy overrides; one-byte chunk progress test; actual threshold-plus-one spool test retained'],
        ['Diagnostic capacity','Constants used in assertions','Policy values in e2e/rotation assertions; literal defaults in package tests; custom queue-capacity test'],
        ['No reconstructed defaults','Three forbidden constructor spellings','Larger source-name denylist plus required TypeScript inputs']
    ])+'<p>This page gives the weakened stimuli and the retained oracles equal visibility. It does not infer a test’s power from its title or from the number of assertions.</p>',
    [cite('pr-131-base','packages/daemon/src/daemon-policy.test.ts','it("defines every default leaf',43,'Default and memory-selection tests predate this PR'),cite('pr-131-head','apps/cli/src/daemon/daemon-resource-monitor.test.ts','it("samples every 250',56,'Timed baseline remains; custom cadence is added'),cite('pr-131-head','meta-tests/src/daemon-package.test.ts','it("retires scattered operational defaults',50,'Retired seams are checked as source strings'),cite('pr-131-head','apps/cli/src/daemon/completion-spool.test.ts','it("spills threshold-plus-one',41,'A retained test explicitly crosses the disk boundary'),cite('pr-131-head','apps/cli/src/daemon/daemon-logger.test.ts','backup',27,'Diagnostic test coverage',before=5)])

card('p148-stage',148,'06','Two graphs','The tests move before the production caller does.',
    table(['Caller / check','Reaches'],[['Shipped CLI + fixed hash','38 app compatibility files'],['37 relocated test files','Package mechanism copies']]),
    [('stated','Stage package mechanisms and retain a frozen CLI graph, because relocation and host invocation coordination need separate review boundaries.'),
     ('stated','Move 37 mechanism test files with their owners; keep CLI-facing tests and built CLI e2e paths. Freeze 38 app files by path and normalized source content.'),
     ('unexplained','No separate reason was found for the precise split of test protection during this intermediate state. Twelve app production files change before the new freeze is recorded.')],
    'The package tests exercise the package copies; the shipped CLI uses the app copies. The new digest preserves the chosen head, not the previous base, and it supplies no pairwise equivalence test.',
    'This split is explicit in the PR body. The local graph is not untested: CLI integration/e2e paths remain, and the hash detects edits to its frozen set. Package copies also have real built-entry tests.',
    'When reading a passing mechanism test, which implementation actually received the call?',
    '''<h4>Execution and evidence follow different edges</h4><div class="two"><div class="package"><p class="package-label">apps/cli · shipped at this head</p><div class="box"><strong>CLI dispatcher / command registration</strong><small>owns routing composition for the binary</small></div><div class="arrow">↓ local imports</div><div class="box changed"><strong>38 compatibility files</strong><small>registry · process · worker<br>transport · delivery · execution<br>resources · diagnostics · lifetime</small></div><div class="arrow">↑ CLI-facing tests + built CLI e2e</div><div class="box dashed"><strong>Fixed source digest</strong><small>includes paths; normalizes CRLF to LF</small></div></div><div class="package"><p class="package-label">packages/daemon · staged host path</p><div class="box staged"><strong>DaemonClient + process/worker entries</strong><small>new package access points</small></div><div class="arrow">↓ private imports</div><div class="box staged"><strong>Package mechanism copies</strong><small>organized into ownership directories</small></div><div class="arrow">↑ 37 relocated test files</div><div class="box"><strong>New client + built-entry tests</strong><small>generic executor fixtures</small></div></div></div><p class="legend">Grouped import/test map. The diagram does not imply that every e2e traverses every box.</p>''' + table(['What the check can say','What it cannot establish'],[
        ['The listed 38 app files have the recorded normalized source digest','That app and package mechanisms are behaviorally identical'],
        ['Relocated tests directly import package mechanisms','That the shipped CLI invoked those package mechanisms'],
        ['CLI-facing tests still import/use the local graph','That every former mechanism-unit scenario still reaches the local copy'],
        ['Built-entry tests execute package process/worker artifacts','That the CLI consumer switch has happened']
    ]) + '<p><a href="evidence/verified/moved-tests-148.json">All 37 detected test moves</a>. This is a Git rename inventory, not a claim that each test has identical behavior.</p>',
    [body(148),cite('pr-148-head','apps/cli/src/daemon/daemon-command-dispatcher.ts','import { DaemonRegistry }',21,'The shipped dispatcher still imports local mechanisms'),cite('pr-148-head','meta-tests/src/daemon-compatibility-copy.test.ts','class DaemonCompatibilityCopyInventory',45,'The hash is a fixed inventory, not a comparison with package sources'),cite('pr-148-head','packages/daemon/src/delivery/completion-spool.test.ts','import',10,'A representative moved test imports the package copy'),cite('pr-148-head','apps/cli/test/e2e/daemon/parity.test.ts','import',25,'CLI e2e remains alongside the package test move')])

card('p148-registry',148,'07','Ownership semantics','One ownership predicate also tightens some answers.',
    chain(('Identity + instance','minimum comparison'),('+ credentials','process-specific operation'),('+ revision','exact-owner mutation'),note='Recorded synthetic mismatch: isStartupOwner / refreshStartupOwner change from true / true to false / false.'),
    [('stated','Centralize lock ownership checks in the registry; the architecture spec calls for one owner of lock equality. Callers request narrow named operations.'),
     ('unexplained','Require identityKey where old instance-only checks accepted a conflicting stored identity. Also compare the full adopted owner after replacement.'),
     ('scope','Beyond simple relocation: the shipped app registry changes before freezing. The probe deliberately edits a lock’s identity key; it is not a claim about normal workload frequency.')],
    '“Centralize” bundles a boundary move with stronger equality. A corrupted or inconsistent lock can now be treated differently, despite the stack’s unchanged-behavior contract.',
    'The added package tests intentionally pin coordinate matching and predicate authority. Both versions still read the synthetic owner record; the difference is whether ownership operations accept it. No author rationale for this outcome change was found.',
    'Which coordinates define ownership for each operation, and is the stronger definition part of this refactor?',
    '''<h4>The predicate has one implementation, several requested strengths</h4>''' + table(['Registry operation family','Required identity','Additional equality'],[
        ['Instance ownership / refresh','identityKey + instanceId','No process coordinate requested'],
        ['Record-credential observation','identityKey + instanceId','processToken'],
        ['Daemon startup-process ownership','identityKey + instanceId','processToken + daemon kind + pid'],
        ['Exact-owner replacement / removal','identityKey + instanceId','token, kind, pid, acquisition time, heartbeat and revision']
    ]) + '''<div class="sandbox"><p class="lossy">Recorded execution with a synthetic on-disk lock: obtain a valid lease, then change only its stored identityKey to a foreign value.</p><div class="outcome"><div><small>BASE APP REGISTRY</small><strong>true / true</strong><small>isStartupOwner / refreshStartupOwner</small></div><div class="head"><small>HEAD APP REGISTRY</small><strong>false / false</strong><small>isStartupOwner / refreshStartupOwner</small></div></div><p><code>startupOwner()</code> returns a record in both versions. The change is in authorization to act on that record.</p></div><p><a href="evidence/verified/registry-probe-148-base.jsonl">Base observation</a> · <a href="evidence/verified/registry-probe-148-head.jsonl">Head observation</a> · <a href="tools/registry-identity-probe.sh">Probe source</a>.</p>''',
    [cite('pr-148-base','apps/cli/src/daemon/daemon-registry.ts','isStartupOwner(identity:',7,'Base instance-only ownership check'),cite('pr-148-head','apps/cli/src/daemon/daemon-registry.ts','isStartupOwner(identity:',13,'Head adds identity-key equality'),cite('pr-148-head','apps/cli/src/daemon/daemon-registry.ts','private startupOwnershipMatches',24,'Canonical predicate and optional extra coordinates'),cite('pr-148-head','apps/cli/src/daemon/daemon-registry.ts','return this.startupOwnershipMatches(identity, adoptedOwner)',8,'Post-replacement comparison uses the full adopted owner',before=3),cite('pr-148-head','packages/daemon/src/registry/registry.test.ts','it("makes the canonical predicate authoritative',27,'The new test asserts predicate authority'),cite('pr-148-head','plans/005/daemon-architecture-functional-spec.md','One owner each for command-name',4,'Scope explicitly asks for one lock-ownership check')])

card('p148-coordinator',148,'08','Process boundary','The process coordinator adopts a validated identity.',
    chain(('Entry','parse configuration'),('Coordinator','validate → construct'),('Private sessions','execution · delivery · workers'),note='The former WorkspaceDaemon becomes DaemonProcessCoordinator; the entry passes coordinates instead of separate identity scalars.'),
    [('stated','Rename and narrow the process owner: adopt explicit coordinates, require its clock/server, and replace a dependency object with a workspaceExists callback. The spec separates process mechanics from host/navigation ownership.'),
     ('unexplained','Move identity validation into construction, check workspaceRoot too, and validate before observing components. No separate reason for this exact ordering/broader direct-constructor rejection was recorded.'),
     ('stated','Preserve request authentication branches and cyclic session callbacks during extraction. Identity/termination have their own checks; ping/stop retain protocol+instance checks without adding tokens.')],
    'A rename hides a construction contract: direct callers now supply matching adopted coordinates and a clock. The object is also the place where execution, delivery, resource and worker callbacks close a cycle.',
    'New construction tests reject mismatches before touching a supplied policy getter and characterize callback wiring. Request tests preserve the existing protocol/instance/token distinctions; this is not a claim that all requests gained authentication.',
    'Is the coordinate-validation boundary in the object, the executable entry, or both?',
    '''<h4>One process owns coordination, several sessions own state</h4><div class="box changed"><strong>DaemonProcessCoordinator</strong><small>adopted identity · required clock · server · lifecycle exit</small></div><div class="arrow">↓ composes callbacks and owners</div><div class="three"><div class="box"><strong>Accepted execution</strong><small>ledger · queue · worker turns</small></div><div class="box"><strong>Delivery</strong><small>attachments · spool · acknowledgements</small></div><div class="box"><strong>Worker/resource owners</strong><small>generations · shedding · replacement</small></div></div><p class="legend">Grouped static/state-ownership picture; bidirectional callbacks are summarized by the composition arrow.</p>''' + table(['Boundary','Before','After'],[
        ['Identity','Entry checks derived keys/endpoint; object accepts instanceId and token','Coordinator receives coordinates and rejects mismatch before reading policy/components'],
        ['Clock','Optional clock plus optional now callback','Required DaemonClock; passed to queue, ledger and resource supervisor'],
        ['Host filesystem knowledge','Optional dependencies.fs.exists object','Optional workspaceExists callback; native existence check otherwise'],
        ['Request serving','transport option','server option; execution and delivery stay delegated'],
        ['Authentication branches','Identify/terminate checked specially; other requests use protocol/instance, then relevant token checks','Characterized and preserved while fields are rewired']
    ]),
    [cite('pr-148-head','packages/daemon/src/process/process-coordinator.ts','export interface DaemonProcessCoordinatorOptions',25,'Narrow construction inputs'),cite('pr-148-head','packages/daemon/src/process/process-coordinator.ts','constructor(private readonly options',22,'Validate before constructing components'),cite('pr-148-head','packages/daemon/src/process/process-coordinator.ts','private static validateCoordinates',16,'Coordinates must match identity, including root'),cite('pr-148-head','packages/daemon/src/process/process-coordinator-construction.test.ts','it.each([',40,'Test deliberately makes early component observation fail'),cite('pr-148-head','packages/daemon/src/process/process-coordinator.ts','private async handle(',44,'Distinct request authentication branches'),cite('pr-148-head','packages/daemon/src/process/process-coordinator-construction.test.ts','it("binds every cyclic callback',58,'Callback composition is explicitly characterized')])

card('p148-clock',148,'09','Clock & idle','Idle still starts at construction and resets on acceptance.',
    chain(('Construction','idle countdown begins'),('Acceptance','deadline resets'),('Completion','does not reset it'),note='Wall time owns lifetime/registry timestamps. Monotonic time owns queue/worker elapsed measurements.'),
    [('stated','Use daemon-owned wall and monotonic clocks across registry, process control, ledger, resource supervision, request queue and worker timing; remove telemetry’s Clock dependency.'),
     ('stated','Preserve construction/acceptance-based idle timing. Put readiness-armed and completion-based lifetime changes in the follow-up spec, because this extraction must preserve behavior.')],
    'Central clock ownership can be mistaken for a lifetime fix. Startup still consumes the idle interval, and finishing a long request can trigger idle shutdown immediately once its deadline has passed.',
    'The PR states that these semantics are deliberately retained. A new test pins the acceptance deadline after completion; the two alternative lifetime semantics are explicitly deferred rather than silently implemented.',
    'Does owning the clock also mean owning when the idle interval begins?',
    '''<h4>The preserved ten-unit test</h4><div class="stack-lanes"><div class="lane"><strong>t = 0</strong><div class="bar">Construct lifetime. Deadline = 10.</div></div><div class="lane"><strong>t = 8</strong><div class="bar">Accept navigation. Deadline = 18.</div></div><div class="lane"><strong>t = 18</strong><div class="bar">Work still active. Timer does not shut down the process.</div></div><div class="lane"><strong>queue idle</strong><div class="bar changed">Completion does not reset the deadline. Idle callback runs now.</div></div></div><p class="legend">Illustration of the new characterization test with a ten-millisecond test policy; real default idle time remains thirty minutes.</p>''' + table(['Clock function','Uses in this extraction','What stays unchanged'],[
        ['wallNowMs','Lifetime, accepted timestamps, startup ownership, controller/termination waits, resource replacement window','These consumers still use wall time'],
        ['monotonicNowMs','Queue start times, elapsed worker initialization/output measurements, process durations','Elapsed-time role stays distinct from wall timestamps'],
        ['No clock API change can supply this','Start idle at readiness / reset idle at completion','Both are product behavior changes recorded for later']
    ]),
    [body(148),cite('pr-148-head','packages/daemon/src/lifecycle/daemon-clock.ts','export interface DaemonClock',27,'Daemon owns both time sources'),cite('pr-148-head','packages/daemon/src/lifecycle/daemon-lifetime.ts','constructor(',35,'Construction, acceptance and queue-idle rules'),cite('pr-148-head','packages/daemon/src/lifecycle/daemon-lifetime.test.ts','it("keeps the constructor-started',20,'Explicit acceptance-based characterization'),cite('pr-148-head','plans/005/daemon-follow-ups-functional-spec.md','## Readiness-Armed Idle Lifetime',21,'The two deferred lifetime designs')])

card('p148-facade',148,'10','Public facade','Portable declarations conceal a Node runtime, not its requirements.',
    chain(('Host contract','execute · control'),('Constructor','dynamic import'),('Node runtime','private mechanisms'),note='The public type surface excludes Node ambient types. Runtime execution still uses Node.'),
    [('stated','Expose execute and typed start/status/stop overloads behind a Node-free facade, because host declarations must not acquire Node ambient dependencies.'),
     ('stated','Keep registry, sockets, storage and launchers private. Hosts supply state path, product version, enablement, an executor factory/module and a readiness probe.'),
     ('unexplained','Start the runtime import in the constructor and retain one promise; default omitted policy to currentSystem in that runtime. No separate rationale for the import timing was found.')],
    'Most client behavior tests instantiate the internal runtime under the alias DaemonClient. Passing them is not evidence of a fully integrated public-facade warm execution path.',
    'There is a separate public-root delegation test, exact member/overload assertions and a compiler check with Node ambient types absent. Built process and worker artifacts are exercised separately. The facade is not being presented as browser execution.',
    'Which promise is portable: the declaration surface, the runtime, or the host’s executor?',
    table(['Public host contribution','Who interprets it'],[
        ['stateDirectory, productVersion, daemonEnabled','Client runtime composes policy/registry/lifecycle owners'],
        ['executorFactory','Client uses a fresh executor for each local attempt'],
        ['executorModuleUrl','Package process/worker entry loads host execution in another process/thread'],
        ['readinessProbe','Startup coordinator forwards host commandName/argv to test execution readiness'],
        ['workspaceRoot, commandName, argv, cwd, telemetryEnabled','Host classifies syntax; client makes routing decisions'],
        ['Optional policy','Runtime chooses current-system snapshot only when omitted']
    ]) + '''<div class="two"><div class="step"><h5>TYPE BOUNDARY</h5><p>Facade imports contract types and loads a string module path. Source compilation and declaration checks keep Node names out of the public closure.</p></div><div class="step"><h5>EXECUTION BOUNDARY</h5><p>Constructing the facade starts one runtime-load promise. execute/control await that promise. The loaded implementation imports Node crypto and filesystem/process mechanisms.</p></div></div>''',
    [body(148),cite('pr-148-head','packages/daemon/src/client/daemon-client.ts','class DaemonClientRuntimeLoader',43,'Dynamic load starts in the facade constructor'),cite('pr-148-head','packages/daemon/src/client/daemon-client-contracts.ts','export interface DaemonClientOptions',36,'Complete host-facing input contract'),cite('pr-148-head','packages/daemon/src/client/daemon-client.test.ts','import { DaemonClientRuntime as DaemonClient }',5,'Behavior suite targets the internal runtime'),cite('pr-148-head','packages/daemon/src/client/daemon-client-public.test.ts','it("loads its package runtime',36,'Public facade test covers disabled/local delegation'),cite('pr-148-head','packages/daemon/src/host-contract.test.ts','it("emits the exact declaration surface',20,'Node-free declaration check and Buffer-leak counterexample'),cite('pr-148-head','packages/daemon/src/client/daemon-client-runtime.ts','constructor(private readonly options',14,'Runtime policy fallback and private composition')])

card('p148-routing',148,'11','Routing effects','The first route closes off later observations.',
    chain(('Record','present?'),('State','starting?'),('Version','compatible?'),('Probe','responsive?'),note='Disabled execution bypasses these guards. First decision wins; reading/probing is lazy and cached for this decision.'),
    [('stated','Use ordered lazy guards so an earlier routing decision prevents later reads, probes and cleanup. Preserve cold, warm and fallback outcomes.'),
     ('stated','Run cold/fallback locally with a new executor. Only absent/fallback routes trigger independent warmup; do not wait or switch the chosen route.'),
     ('stated','Keep status’s short observer separate from ordinary start/stop and routing. Require the host’s readiness probe so the package can forward it without knowing CLI syntax.')],
    'The guard list controls effects, not just an enum. Reordering version and starting checks can change whether the system probes or triggers. The required readiness probe remains an executable host command rather than a control-plane-only readiness signal.',
    'New tests assert exact read/probe/trigger/removal counts, cache each observation, and keep a blocked warmup from delaying local execution. Changing readiness to a pure control-plane check remains outside this PR.',
    'What action should be impossible after an earlier guard has already decided?',
    '''<h4>Trace one guard decision</h4><div class="sandbox"><p class="lossy">Illustration transcribed from routing code and its test matrix. This page does not query a registry or contact a daemon.</p><div class="only-js"><label for="route-scenario">Observed state</label><select id="route-scenario"><option value="starting">Record says starting</option><option value="disabled">Daemon disabled</option><option value="absent">No record</option><option value="version">Record version mismatch</option><option value="unresponsive">Unresponsive live daemon</option><option value="exited">Observed process exited</option><option value="ready">Responsive compatible daemon</option></select></div><div class="tokens" id="route-guards"><span>enabled</span><span>record present</span><span>not starting</span><span>version</span><span>responsive</span></div><p id="route-outcome" class="trace-note" aria-live="polite">Local / cold. Do not inspect version or probe; do not trigger another warmup.</p><p class="legend">Green = continued; rust = terminal decision; dashed = skipped.</p></div>''' + table(['Route','Local / warm','Warmup and observation effects'],[
        ['Disabled','Cold local','No registry read/probe/trigger'],
        ['No record','Cold local','Trigger independently'],
        ['Registry error or starting record','Cold local','No later guard effects; no trigger'],
        ['Record version mismatch','Fallback local','Skip probe; trigger independently'],
        ['Responsive compatible ready/busy','Warm','No local executor'],
        ['Responsive starting / unresponsive / observation error','Cold local, recovering','No trigger'],
        ['Exited process','Fallback local','Attempt exact record cleanup; trigger independently'],
        ['Incompatible/invalid observation or pong version','Fallback local','Trigger independently']
    ]),
    [body(148),cite('pr-148-head','packages/daemon/src/client/daemon-routing-policy.ts','export class DaemonRoutingPolicy',18,'Ordered first-decision guard list'),cite('pr-148-head','packages/daemon/src/client/daemon-routing-policy.ts','readRecord(): DaemonRecord | undefined {',24,'One read/observation cached per routing decision'),cite('pr-148-head','packages/daemon/src/client/daemon-client-runtime.ts','async execute(request:',27,'Routing outcome determines local execution and trigger effects'),cite('pr-148-head','packages/daemon/src/client/daemon-client.test.ts','"routes %s with exact',40,'Tests count the effects, not only the selected route'),cite('pr-148-head','packages/daemon/src/registry/startup-coordinator.ts','commandName: this.readinessProbe.commandName',18,'Host-provided readiness command travels through execution',before=5),cite('pr-148-head','packages/daemon/src/client/daemon-client-control.test.ts','it("owns one start/status/stop',31,'Distinct lifecycle timeout composition')])

card('p148-output',148,'12','Output & replay','The package owns warm bytes and the refusal to replay.',
    compare(('Safe pre-accept failure','one local fallback'),('Uncertain / accepted','controlled result'),('Successful warm','captured byte stream'),note='Capture uses the output policy and OS temporary directory. No host storage/output factory is exposed.'),
    [('stated','Own warm capture and controlled failure outputs in the client, because transfer cleanup and replay safety belong to that boundary.'),
     ('stated','Keep local fallback restricted to retry-safe warm submission failures. Accepted/uncertain failures and malformed completed output become a controlled warm failure; do not replay.'),
     ('stated','Keep spool record encoding/decoding inside the daemon package rather than reaching back into CLI capture; preserve ordered bytes and disposal ownership.')],
    'A clean execute API hides an important fork: some failures can run locally and others must terminate without replay. It also creates a package-owned copy of record coding alongside the still-shipped CLI codec.',
    'Tests pin exact controlled messages, forbid local executor creation on uncertain paths, dispose malformed output, and inspect fresh policy-backed captures. The retained CLI graph uses its own output composition until the switch.',
    'Who can decide to execute again after the first process may already have accepted the work?',
    table(['Observed result','Client action','Returned mode / output'],[
        ['Typed retry-safe failure while submitting warm work','Create one local executor','fallback / local result'],
        ['Unconfirmed, accepted or untyped submission failure','No local replay','warm / accepted-request-did-not-complete output'],
        ['Failed accepted completion','Map resource/capacity/other failure','warm / exact controlled stderr and exit 1'],
        ['Completed result without output or non-integer exit code','Attempt disposal of supplied malformed output; no replay','warm / accepted-request-did-not-complete output'],
        ['Completed valid result','Return captured ordered output; caller owns its disposal','warm / daemon bytes']
    ]) + '''<div class="two"><div class="step"><h5>OUTPUT OWNER</h5><p>The runtime creates a fresh DaemonClientResultCapture from the output policy. Its default directory is the OS temporary directory. The public contract exposes the resulting byte stream and dispose operation.</p></div><div class="step"><h5>RECORD OWNER</h5><p>Package completion spooling embeds its own nine-byte record-header codec. This removes the import of the CLI’s OrderedCommandOutput; it does not deduplicate the two staged graphs.</p></div></div>''',
    [body(148),cite('pr-148-head','packages/daemon/src/client/daemon-client-runtime.ts','private async executeWarm',50,'Retry-safe fallback and accepted-completion handling'),cite('pr-148-head','packages/daemon/src/client/daemon-client-runtime.ts','class DaemonControlledResult',26,'Controlled error output bytes'),cite('pr-148-head','packages/daemon/src/client/daemon-client-runtime.ts','private static isCompleteResult',23,'Malformed completion validation and disposal'),cite('pr-148-head','packages/daemon/src/transport/client-result-capture.ts','constructor(options: DaemonClientResultCaptureOptions)',8,'Policy and temporary-directory capture defaults'),cite('pr-148-head','packages/daemon/src/delivery/completion-spool.ts','class CompletionSpoolRecordCodec',34,'Package-private record codec replaces the CLI import'),cite('pr-148-head','packages/daemon/src/client/daemon-client.test.ts','it("replaces a completed warm result without output',16,'Missing warm output test also forbids replay and registry mutation')])

card('p148-tests',148,'13','Entries & fixtures','Replacing a test changes where a promise is checked.',
    chain(('CLI worker fixture','real CLI --version'),('Generic executor','package-owned tests'),('CLI factory test','version rejection restored'),note='The deleted entry mock is replaced by constructor and real built-entry tests. These are different observation boundaries.'),
    [('stated','Move mechanism tests to package owners and replace CLI executor/output/path helpers with package-local fixtures to respect the zero-internal-dependency boundary.'),
     ('stated','Add real built process/worker entry tests, absolute executor URL checks, missing-module/export cases and side-effect-only entry checks. Keep version rejection at the CLI executor factory.'),
     ('unexplained','Retire the old entry mock’s exact logger-object/configuration assertions and the CLI version-mismatch-through-worker scenario. The replacement factory assertion does not traverse that worker path.'),
     ('unexplained','In the new built-entry termination test, Windows cleanup is done by the exit observer/harness; non-Windows expects process-owned cleanup and a termination diagnostic. No explicit rationale for this platform split was found in the supplied prose.')],
    'A green factory rejection test establishes rejection at the factory, not propagation of that CLI rejection through the worker. The built-entry tests exercise real processes but replace, rather than preserve verbatim, the old mock observations.',
    'This is not 37 deleted suites with no successors. The moved worker still tests generic initialization failures; the explicit CLI version rejection was restored in a later commit in this same PR. Built-entry tests add real launch and cleanup evidence.',
    'Which old end-to-end claim is now split between two smaller tests?',
    table(['Oracle being followed','Base location / stimulus','Head location / stimulus'],[
        ['CLI version mismatch reaches worker initialization failure','Navigation-worker test starts a real CLI executor with a wrong product version','CLI factory test asserts a thrown version error; generic worker initialization failures remain'],
        ['Readiness invokes an executor command','Worker fixture uses real CLI --version','Generic executor responds to the supplied command; startup host-probe test supplies custom argv'],
        ['Entry configuration / logger composition','Two-test app entry file, including mocked constructor and object-identity assertions','Deleted; constructor mismatch/callback tests and built process/worker integration tests added'],
        ['Built entry imports and effects','No package executable entries','Package-relative entries with absolute executor URL; exact exports and one-time initialization tested'],
        ['Forced process termination cleanup','New package integration oracle','Non-Windows removes ownership inside process; Windows asserts surviving record and then observer cleanup']
    ]) + '<p>Test-name and assertion counts were used only to find changed observations, not as a correctness score. <a href="evidence/verified/moved-test-inventory.txt">Move inventory</a>.</p>',
    [cite('pr-148-base','apps/cli/src/daemon/daemon-navigation-worker.test.ts','it("classifies a CLI executor version mismatch',30,'Base worker-level CLI version rejection'),cite('pr-148-head','apps/cli/src/daemon-executor.test.ts','it("rejects a product version',12,'Replacement rejects directly at the CLI factory'),cite('pr-148-base','apps/cli/src/daemon/daemon-entry.test.ts','expect(daemonStateDirectory)',9,'Deleted mocked entry assertions'),cite('pr-148-head','packages/daemon/src/worker/navigation-worker.test.ts','it("proves readiness through the generic',28,'Generic executor replaces the real CLI readiness fixture'),cite('pr-148-head','packages/daemon/test/integration/built-process-entry.test.ts','it("executes its parsed generic executor',42,'Real built process test and platform-specific cleanup'),cite('pr-148-head','packages/daemon/test/integration/built-entry-artifacts.test.ts','it("runs the package-relative worker',48,'Real built worker artifact executes supplied byte-producing module'),body(148,'0f31a619e806dcadd81207de6643b92bd353e716')])

card('p148-exports',148,'14','Retired test access','A deleted lint rule closes a retired door.',
    compare(('./policy-testing','removed export'),('Local helpers','validated snapshots'),('Entry subpaths','process-entry · worker-entry'),note='Public root contracts remain. Executable subpaths have no named exports; they exist for process/worker launch.'),
    [('stated','Remove the temporary policy-testing export as tests move to their owning package. Use local test factories that still deserialize/validate complete policy snapshots.'),
     ('stated','Replace that temporary subpath with real process-entry and worker-entry exports; lock the exact manifest/root/declaration surface.'),
     ('unexplained','Delete the no-restricted-imports rule and its two tests for the retired subpath; add package Vitest/tsx test support. No separate prose rationale for these scaffolding choices was found; the export removal changes what the old lint rule could protect.')],
    'Deleting an import prohibition is conspicuous, but calling it an open production tuning seam would ignore that the prohibited public export is deleted in the same diff.',
    'The exact manifest test excludes policy-testing; the root export/declaration tests constrain public values/types. The helper is copied into each test tree and still uses fromSerialized validation. Source import checks, TypeScript references and package boundaries remain.',
    'Did enforcement vanish, or did the forbidden surface itself disappear?',
    table(['Surface / check','Base','Head'],[
        ['Package subpath exports','Root + temporary policy-testing','Root + process-entry + worker-entry'],
        ['Policy override factory','Exported for tests; lint blocks production imports by package name','Local test helpers; no public policy-testing export'],
        ['Old lint-name test','Allows tests / rejects production import of policy-testing','Both removed with the matching lint rule'],
        ['Entry contract','App-owned executable files','Package entry JS paths; no named source/declaration exports'],
        ['Build/test support','App-owned fixtures','Package Vitest config + tsx dev dependency + generic executor fixtures']
    ]) + '<p>The policy record calls the testing subpath temporary. This PR also adds recursive package-boundary checks; their source-pattern check is evidence about imports, not a general proof of behavioral independence.</p>',
    [cite('pr-148-head','packages/daemon/package.json','"exports"',23,'Exact package export and development-dependency shape'),cite('pr-148-base','eslint.config.mjs','"no-restricted-imports"',12,'Removed rule names only the retired testing export'),cite('pr-148-base','meta-tests/src/lint-rule.test.ts','it("allows CLI test files',25,'The two removed lint-rule tests'),cite('pr-148-head','meta-tests/src/daemon-package.test.ts','it("has the exact private ESM root',39,'Manifest test now excludes the retired surface'),cite('pr-148-head','packages/daemon/test/helpers/daemon-policy.ts','export class DaemonPolicyTestFactory',14,'Local test factory still validates by deserialization'),cite('pr-148-head','packages/daemon/src/entry-boundary.test.ts','describe("daemon executable entry',16,'No named entry exports in source or declarations'),cite('pr-148-head','plans/005/daemon-policy.md','## Migration access',7,'Original temporary-access rationale')])


def file_owner(pr, name):
    if pr == 131:
        if '/test/helpers/' in name: return 'p131-adapters'
        if 'meta-tests/' in name or '.test.' in name: return 'p131-oracles'
        if any(x in name for x in ['transport', 'startup-coordinator', 'daemon-controller', 'register-daemon-command']): return 'p131-scopes'
        return 'p131-policy'
    if name.startswith('plans/'): return 'p148-clock'
    if name in ['eslint.config.mjs','pnpm-lock.yaml','packages/daemon/package.json','packages/daemon/vitest.config.ts'] or 'lint-rule.test' in name or 'daemon-package.test' in name or 'daemon-policy' in name or 'entry-boundary' in name or 'package-boundary' in name: return 'p148-exports'
    if 'compatibility-copy' in name: return 'p148-stage'
    if name.startswith('apps/cli/') and ('.test.' in name or '/test/' in name): return 'p148-tests'
    if 'test/fixtures' in name or 'test/integration/' in name or '/test/helpers/' in name: return 'p148-tests'
    if 'registry' in name and 'startup-coordinator' not in name and 'record-observer' not in name and 'workspace-identity' not in name: return 'p148-registry'
    if 'clock' in name or 'lifetime' in name or 'resource-monitor' in name or 'resource-supervisor' in name or 'request-queue' in name or 'accepted-request-ledger' in name: return 'p148-clock'
    if 'routing-policy' in name or 'startup-coordinator' in name or 'client-control' in name: return 'p148-routing'
    if '/client/' in name or name.endswith('/index.ts') or 'host-contract' in name or 'public-import' in name: return 'p148-facade'
    if '/delivery/' in name or 'completion-spool' in name or 'client-result-capture' in name or 'local-transport.ts' in name: return 'p148-output'
    if 'process-coordinator' in name or 'workspace-daemon' in name or 'daemon-entry' in name: return 'p148-coordinator'
    if name.endswith('entry.ts') or 'built-' in name or 'navigation-worker.test' in name: return 'p148-tests'
    return 'p148-stage'


FILE_MAP = []
for pr in [131,148]:
    key=f'pr-{pr}-head'
    (OUT/'evidence'/'verified'/f'pr-{pr}.diff.patch').write_bytes((ROOT/'inputs'/f'pr-{pr}'/'diff.patch').read_bytes())
    parts=subprocess.check_output(['git','-C',str(ROOT/'worktrees'/key),'diff','-M','--name-status','-z',SHAS[f'pr-{pr}-base'],SHAS[key]],text=True).split('\0')
    i=0
    while i < len(parts)-1:
        status=parts[i]; path=parts[i+1]; i+=2
        old=None
        if status.startswith(('R','C')):
            old=path;path=parts[i];i+=1
        owners=[file_owner(pr,path)]
        if pr==131 and 'local-daemon-transport-execution.test' in path: owners=['p131-adapters','p131-scopes','p131-error']
        if pr==131 and '/src/daemon/local-daemon-transport.ts' in path: owners=['p131-scopes','p131-error']
        if pr==131 and 'completion-spool.test' in path: owners=['p131-adapters','p131-oracles']
        if pr==131 and ('workspace-daemon' in path and '.test.' in path): owners=['p131-adapters','p131-policy']
        if pr==148 and status.startswith('R') and path.endswith('.test.ts'): owners=list(dict.fromkeys(['p148-stage','p148-tests',*owners]))
        if pr==148 and 'daemon-client-runtime.ts' in path: owners=['p148-facade','p148-routing','p148-output']
        FILE_MAP.append({'pr':pr,'status':status,'path':path,'oldPath':old,'records':owners})

(OUT/'file-map.json').write_text(json.dumps(FILE_MAP,indent=2)+'\n')
(OUT/'sources'/'manifest.json').write_text(json.dumps(SOURCE_INDEX,indent=2)+'\n')

def render_card(c):
    choices=''.join(f'<li><span class="mark {kind if kind != "stated" else ""}">{"Beyond the promise" if kind=="scope" else kind}</span> {esc(text)}</li>' for kind,text in c['choices'])
    return f'''<article class="record" id="{c['id']}"><div class="record-top"><div class="record-index">{c['n']}<small>PR {c['pr']}</small></div><div class="record-main"><h3>{c['title']}</h3><div class="record-body"><div><div class="micro">{c['micro']}</div><ul class="decisions">{choices}</ul></div><div class="readings"><p><span class="label">Worst honest reading</span>{esc(c['attack'])}</p><p class="limit"><span class="label">What limits that reading</span>{esc(c['limit'])}</p><div class="human-prompt">{esc(c['question'])}</div></div></div><details class="mechanism" id="{c['id']}-mechanism"><summary>Inspect the mechanism and sources <span aria-hidden="true">{c['n']}</span></summary><div class="depth">{c['deep']}<div class="source-list"><h5>Source trail · base/head snapshots</h5>{''.join(c['sources'])}</div><button class="back only-js" data-back>↑ Return to decision {c['n']}</button><a class="back fallback-view" href="#{c['id']}">↑ Return to decision {c['n']}</a></div></details></div></div></article>'''


def subject(pr,title,lead):
    these=[c for c in cards if c['pr']==pr]
    return f'''<section class="subject" id="pr{pr}" aria-labelledby="title-{pr}"><div class="subject-heading"><span class="subject-number">{pr}</span><div><p class="eyebrow">Decision record · {len(these)} connected readings</p><h2 id="title-{pr}">{title}</h2><p>{lead}</p></div><div class="sha">{SHAS[f'pr-{pr}-base'][:10]} → {SHAS[f'pr-{pr}-head'][:10]}<br>{'60 files · +1,298 / −544' if pr==131 else '153 files · +14,624 / −815'}</div></div><nav class="decision-nav" aria-label="PR {pr} decisions">{''.join(f'<a href="#{c["id"]}">{c["n"]} {c["short"]}</a>' for c in these)}</nav>{''.join(render_card(c) for c in these)}</section>'''


move_rows=json.loads((OUT/'evidence/verified/moved-tests-148.json').read_text())
file_map_table=table(['PR / status','Changed path','Reading that owns it'],[(str(r['pr'])+' / '+r['status'],('<small>'+esc(r['oldPath'])+' →</small><br>' if r['oldPath'] else '')+'<code>'+esc(r['path'])+'</code>',' · '.join(f'<a href="#{id}">{next(c["n"]+" "+c["short"] for c in cards if c["id"]==id)}</a>' for id in r['records'])) for r in FILE_MAP])

page='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>The claim has edges — adversarial / 08</title><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script></head><body>
<div class="masthead"><a class="brand" href="#top">rich-review / 08</a><nav aria-label="Reading navigation"><a href="#pr131">131 · policy</a><a href="#pr148">148 · ownership</a><a href="#evidence">Evidence & method</a></nav><span class="edition">ADVERSARIAL · READ ONLY</span></div>
<main id="top" class="wrap"><header><div class="hero"><div><p class="eyebrow">Worst honest reading / two real refactors</p><h1>The claim<br>has <em>edges.</em></h1><p class="lead">A refactor can keep the assertion, move the test, and change what the human thinks was preserved.</p></div><div class="hero-note"><p><strong>The promised invariant:</strong> the same inputs should produce the same output, execution mode, lifecycle outcome and failure behavior.</p><p>Read the changed boundary together with the evidence that constrains it. Neither a dramatic diff nor a passing test name tells the whole story.</p><p>No verdicts or stored responses. The questions are for the reader to carry into review.</p></div></div>
<div class="open-map"><figure class="map"><figcaption><span class="eyebrow">131 · orientation</span><strong>One policy reaches three places.</strong>Required slices replace local defaults and numeric overrides.</figcaption><div class="box"><strong>@symnav/daemon · existing policy</strong><small>complete, validated snapshot</small></div><div class="arrow"><span class="shaft">↓</span> required values · newly consumed</div><div class="three"><a class="box changed" href="#p131-policy"><strong>Caller process</strong><small>capture · socket<br>lifecycle composition</small></a><a class="box changed" href="#p131-policy"><strong>Daemon process</strong><small>spool · resources<br>lifetime · diagnostics</small></a><a class="box changed" href="#p131-policy"><strong>Worker thread</strong><small>chunk validation<br>heap sampling</small></a></div><div class="mapped-line"><a href="#p131-adapters">Test adapters translate old knobs into valid policies → some disk stimuli become inline.</a></div><p class="lossy">Grouped configuration map. The mechanisms are still in apps/cli at this head; unchanged interactions are omitted.</p></figure>
<figure class="map"><figcaption><span class="eyebrow">148 · orientation</span><strong>Two graphs coexist at this head.</strong>The package is staged; the shipped CLI keeps its local path.</figcaption><div class="map-grid"><div class="package"><p class="package-label">apps/cli · shipped</p><div class="box"><strong>CLI host</strong></div><div class="arrow">↓ local imports</div><a href="#p148-stage" class="box changed"><strong>38 compatibility files</strong><small>process / worker / transport<br>execution / storage / lifecycle</small></a><div class="arrow">↑ hash + CLI-facing tests</div></div><div class="package"><p class="package-label">packages/daemon · staged</p><a href="#p148-facade" class="box staged"><strong>DaemonClient + entries</strong></a><div class="arrow">↓ private imports</div><a href="#p148-coordinator" class="box staged"><strong>Package mechanisms</strong><small>no internal package dependency</small></a><div class="arrow">↑ 37 relocated test files</div></div></div><div class="mapped-line"><a href="#p148-registry">The local graph changes before the freeze, including stricter ownership checks.</a></div><p class="lossy">Grouped static/test map. The two columns are code graphs, not two daemons running together.</p></figure></div>
<div class="promise-strip"><a href="#p131-adapters"><b>01 / STIMULUS</b>Same cleanup assertion; fifteen existing cases stop entering a spill path. Other disk tests remain.</a><a href="#p131-error"><b>02 / SCOPE</b>A recovery error and a synthetic lock-ownership outcome change. Each observation has a narrow, recorded input.</a><a href="#p148-stage"><b>03 / REACH</b>Package tests and the shipped CLI now reach different copies. The new hash freezes the chosen local head.</a></div>
<div class="reading-contract"><p><strong>Stated / unexplained</strong> refers to the reason, not correctness. Stated reasons come from the PR body or supplied specs/commits. Unexplained means no reason found for that exact choice in those materials.</p><p><strong>Beyond the promise</strong> marks an observed difference that the unchanged-behavior contract did not request. It does not claim to know the author’s motives or that the change is undesirable.</p><p><strong>The complete reading layer is below.</strong> Every record exposes its decisions, hardest fair reading and counterevidence. Open a mechanism for more fidelity on those same facts; use the numbered links to jump and return.</p></div></header>
'''
page+=subject(131,'Route daemon thresholds through centralized policy','The ownership move is broad. The important qualifications are narrow: separate timeout purposes, existing retry scopes, changed error provenance, and test adapters that change the input to the assertion.')
page+=subject(148,'Own daemon mechanisms behind DaemonClient','Relocation, a new host API and a temporary two-copy test boundary share this PR. Registry comparisons tighten, process inputs narrow, lifetime fixes are deferred, and test/import checks are replaced at new owners.')
page+='''<section class="method" id="evidence"><p class="eyebrow">How this reading was made</p><h2>An adversary needs counterevidence.</h2><div class="two"><div><p><strong>Inputs and scope.</strong> Both supplied PR bodies/commits, full diffs, changed-path inventories, repo rules and the four base/head worktrees. The policy and architecture/follow-up specs were read locally. The overview bundle contained path headings with no symbol output, so no mechanism claim relies on it.</p><p><strong>Earlier work.</strong> Other experiment folders were ignored. This folder contained exploratory scripts and measurements from an unfinished attempt. Their hypotheses were checked against source; the three observations used here were reproduced in new isolated copies.</p><p><strong>Ranking.</strong> First, a promise whose evidence changed; then a boundary whose ownership changed; then a missing rationale. This is an ordering of questions, not a correctness score.</p></div><div><p><strong>Measurements used.</strong> Spill-path instrumentation in four CLI suites at each #131 revision; three synthetic recovery scenarios at each #131 revision; a synthetic registry-identity conflict at each #148 revision; Git’s 37-file rename inventory.</p><p><strong>Limits.</strong> Probe tests record outcomes and do not prove parity. This experiment did not run the complete symnav CI sequence, measure a CLI-output delta, or establish normal-workload frequency for the synthetic failures. Relocated test titles are not evidence of semantic equivalence.</p><p><strong>Worktree integrity.</strong> All modifications for probes were in fresh temporary source copies. The four worktrees were clean before and after. The page contains no network fetch, comment storage, approval or verdict controls.</p></div></div>
<details class="mechanism" id="measurement-ledger"><summary>Inspect the measurement ledger</summary><div class="depth">'''
page+=table(['Observation','Base','Head','Evidence'],[
    ['Four instrumented #131 CLI test files','113 tests completed','116 tests completed; 15 existing cases lose a spill entry','<a href="evidence/verified/spill-131-base.vitest.txt">base run</a> · <a href="evidence/verified/spill-131-head.vitest.txt">head run</a> · <a href="evidence/verified/spill-comparison.txt">changed paths</a>'],
    ['Reattachment then corrupt accepted stream','closed; two execute submissions','corrupt; two execute submissions','<a href="evidence/verified/reattach-131-base.jsonl">base observations</a> · <a href="evidence/verified/reattach-131-head.jsonl">head observations</a>'],
    ['Conflicting identityKey in a stored startup owner','isStartupOwner=true; refresh=true','isStartupOwner=false; refresh=false','<a href="evidence/verified/registry-probe-148-base.jsonl">base observation</a> · <a href="evidence/verified/registry-probe-148-head.jsonl">head observation</a>'],
    ['Moved mechanism tests','App-local files','37 detected file renames into package','<a href="evidence/verified/moved-tests-148.json">rename inventory</a>'],
])
page+='''<p><a href="evidence/verified/manifest.json">Input SHAs, tracked-content digests and clean-tree checks</a> · <a href="tools/recheck.py">Reproduction driver</a> · <a href="sources/manifest.json">Included source snapshot manifest</a>.</p><p>Full supplied diffs: <a href="evidence/verified/pr-131.diff.patch">PR 131</a> · <a href="evidence/verified/pr-148.diff.patch">PR 148</a>. Selected sources are also included as line-addressable HTML snapshots.</p><p>Measurements in <code>evidence/verified/</code> are the rerun evidence used by this page. Earlier coverage and mutation experiments remain in the folder for provenance; they are not used to make page claims.</p><pre>python3 experiments/08-adversarial/tools/recheck.py</pre></div></details>
<details class="mechanism" id="file-inventory"><summary>Inspect every changed path and its owning decision record</summary><div class="depth"><p>This index covers both full diffs. Multiple paths can express one policy/ownership decision, and a test move may belong to several readings. It is an orientation index, not an assertion that each changed line was executed.</p>'''+file_map_table+'''</div></details>
<div class="provenance">Authoring harness: Codex · static HTML / CSS / JavaScript · no external dependencies<br>Entry point: experiments/08-adversarial/index.html · <a href="README.md">Experiment README</a> · <a href="brief.md">Assigned brief</a></div></section></main><footer><span>rich-review / 08 · adversarial</span><a href="#top">↑ Back to the two boundaries</a></footer></body></html>'''
(OUT/'index.html').write_text(page)
print(f'Built {len(cards)} decision records, {len(SOURCE_INDEX)} source snapshots, {len(FILE_MAP)} changed-path mappings.')
