"""Small diagrams, authored for these two changes. Every simplification is labeled nearby."""
from html import escape

def unit(title, subtitle='', kind=''):
    return f'<div class="unit {kind}"><strong>{title}</strong><span>{subtitle}</span></div>'

def flow(*nodes):
    return '<div class="flow">' + '<span class="flow-arrow" aria-hidden="true">→</span>'.join(nodes) + '</div>'

def table(headers, rows):
    return '<div class="table-scroll"><table><thead><tr>' + ''.join(f'<th scope="col">{x}</th>' for x in headers) + '</tr></thead><tbody>' + ''.join('<tr>'+''.join(f'<td>{x}</td>' for x in row)+'</tr>' for row in rows) + '</tbody></table></div>'

def box(label, children, kind=''):
    return f'<div class="owner {kind}"><div class="owner-label">{label}</div>{children}</div>'

def note(text): return f'<figcaption>{text}</figcaption>'

def figure(kind):
    content = ''
    caption = ''
    if kind == 'cache-boxes':
        content = '<div class="comparison"><div><p class="eyebrow">Base</p>' + box('@symnav/backend-typescript', flow(unit('Query algorithms', 'choose six key spaces'), unit('Six Maps', 'six explicit .clear() calls')), 'old-owner') + '</div><div><p class="eyebrow">Head</p>' + box('@symnav/backend-typescript', unit('Query algorithms + six handles', 'owns the scope instance; triggers its lifecycle')) + '<div class="boundary-arrow">calls across the package boundary ↓</div>' + box('@symnav/core', unit('TurnScopedCacheScope', 'owns generic maps and clears all registered handles'), 'new-owner')+'</div></div>'
        caption = 'Grouped package view. Each handle still has its own Map; the scope does not merge entries.'
    elif kind == 'cache-types':
        content = table(['Handle', 'Key stays in TypeScript', 'Value retained'], [
            ['definitions', 'formatted symbol identity', 'Promise of overview nodes'],
            ['references', 'formatted symbol identity', 'Promise of reference locations'],
            ['call targets', 'formatted symbol identity', 'Promise of target resolution'],
            ['callers', 'formatted symbol identity', 'Promise of call edges'],
            ['callees', 'formatted symbol identity', 'Promise of call edges'],
            ['position definitions', 'relative path + node start', 'Locations → live nodes on every access'],
        ])
    elif kind == 'cache-failures':
        content = table(['Factory does…', 'Slot after the call', 'Next access in this turn'], [
            ['Return undefined', 'Present (Map.has)', 'Same undefined; factory stays idle'],
            ['Return a promise, then reject', 'Present (same promise)', 'Same rejection; factory stays idle'],
            ['Throw before returning', 'Absent (set was never reached)', 'Factory is invoked again'],
            ['Old promise settles after beginTurn', 'New turn entry stays in the Map', 'New entry; no settlement write-back'],
        ])
    elif kind == 'turn':
        content = flow(unit('Refresh', 'source → projects if workspace → state'), unit('Succeeded', 'then beginTurn', 'new'), unit('Clear all six', 'next query fills a new entry'))
        content += '<div class="branch">Refresh rejects <span>↳</span> beginTurn is not reached <span>→</span> current cached entries remain</div>'
        caption = 'Control-flow sketch. It shows cache clearing, not the internal transactional state publication.'
    elif kind == 'release':
        content = '<div class="sequence"><div class="sequence-head"><span>Time ↓</span><span>TypeScriptBackend</span><span>Semantic service</span><span>Project graph</span></div>'
        for row in [
            ['1', 'release() begins', 'clear the scope synchronously', ''],
            ['2', 'await service', 'await graph release', 'pending'],
            ['3', 'new query can run', 'cache miss → new entry', 'still pending'],
            ['4', 'resolve / reject to caller', 'same release outcome', 'resolve / reject'],
        ]:
            content += '<div class="sequence-row">'+''.join('<span>'+x+'</span>' for x in row)+'</div>'
        content += '</div>'
        caption = 'Worked sequence from the added release test. The query during release is a cache miss, not a blocked operation.'
    elif kind == 'surface':
        content = table(['Shared plan / public body', 'Concrete surface'], [
            ['A shared core base the backend extends', 'Service composes new TurnScopedCacheScope()'],
            ['beginTurn(snapshot: WorkspaceSnapshot)', 'beginTurn(files: readonly WorkspaceFile[])'],
            ['Per-query Maps', 'TurnScopedCache&lt;Key, Value&gt;.getOrCreate(key, factory)'],
            ['No generic scope export', '@symnav/core exports scope + handle type'],
        ])
    elif kind == 'reuse':
        content = flow(unit('Handle A', 'same object'), unit('beginTurn / release', 'clear values; registry retained', 'new'), unit('Handle A', 'same object; new factory value'))
        caption = 'Object-lifetime sketch. The scope has neither a disposed phase nor an unregister operation.'
    elif kind == 'cache-tests':
        content = '<div class="test-columns">'+box('Core · 4 added test cases', unit('Exact values / isolated handles')+unit('Turn + repeated release clearing')+unit('Rejection / synchronous throw')+unit('Late promise settlement'))+box('TypeScript · 6 added test cases', unit('Promise sharing')+unit('Position cache / rehydration')+unit('Async failures / sync failures', 'two cases')+unit('Failed refresh / pending release', 'two cases'))+'</div>'
    elif kind == 'policy-boxes':
        content = '<div class="comparison"><div><p class="eyebrow">Base</p>'+box('@symnav/daemon', unit('Policy snapshot', 'already created, validated, serialized'))+'<div class="boundary-arrow muted">snapshot travels · consumers still have defaults ↓</div>'+box('apps/cli', unit('Local constants + optional thresholds', 'transport · resources · output · lifetime · logs'), 'old-owner')+'</div><div><p class="eyebrow">Head</p>'+box('@symnav/daemon', unit('Same policy owner', 'no package file changed in this PR'))+'<div class="boundary-arrow">required sections / projected values ↓</div>'+box('apps/cli', unit('Existing mechanisms', 'receive policy values'), 'new-owner')+'</div></div>'
        caption = 'Grouped ownership view. Boxes are packages, not processes. CLI mechanisms have not moved packages in this layer.'
    elif kind == 'resources':
        content = box('policy.values.resources', '<div class="mini-grid">'+unit('RSS limits', 'hard / soft / resume')+unit('Worker heap', 'old-generation MiB')+unit('Sampling', '250 ms process / 25 ms active heap')+unit('Replacement circuit', '2 replacements in 10 min; next drains')+'</div>')
        content += '<div class="boundary-arrow">read without re-deriving ↓</div>'+flow(unit('WorkspaceDaemon', 'ready record + worker launch'), unit('ResourceSupervisor', 'pressure and replacement'), unit('Worker entry', 'heap high-water sampling'))
        caption = 'Grouped consumers; arrows after the policy stand for shared input, not execution order. These defaults predate #131.'
    elif kind == 'output':
        content = flow(unit('Capture', 'CLI / worker'), unit('Worker message', 'sender + receiver validation'), unit('Completion spool', 'inline or disk'), unit('Socket transfer', 'encode / decode'), unit('Client output', 'capture + later file read'))
        content += table(['Policy capacity', 'Existing default', 'Consumer boundary'], [
            ['Raw chunk', '64 KiB', 'capture, worker protocol, spool, codec, file decode'],
            ['Inline raw bytes', '256 KiB', 'capture and completion spool'],
            ['Single result', '256 MiB', 'capture and completion spool'],
            ['Aggregate spool', '512 MiB', 'all retained completions'],
            ['Ordinary JSON', '8 MiB', 'ordinary transport framing'],
            ['Execution control', '256 KiB', 'transfer control framing'],
        ])
        caption = 'Simplified output path; local-only execution skips daemon steps. Limits are distinct even when defaults happen to match.'
    elif kind == 'lifecycle':
        content = table(['Phase', 'Distinct existing policy defaults', 'Scope'], [
            ['Startup coordination', '15 s grace · 100 ms heartbeat', 'ownership and missing-owner recovery'],
            ['Startup observation', '10 ms authorization · 20 ms observation', 'different polling loops'],
            ['Child failure', '1 retry · 5 min previous-instance termination', 'explicit failure / replacement'],
            ['Healthy startup', 'No deadline', 'progressing warm-up'],
            ['Idle / stop', '30 min idle · 5 s stop', 'lifetime / user-requested shutdown'],
            ['Forced stop reserve', 'min(500 ms, floor(stop / 2))', 'within the overall stop window'],
            ['Signal exit', '500 ms per signal · 20 ms polling', 'SIGTERM, then SIGKILL'],
            ['Controller polling', '20 ms', 'independent of process-exit polling'],
            ['Drain acknowledgements', '250 ms grace · 5 ms polling', 'pending completion acknowledgements'],
        ])
    elif kind == 'diagnostics':
        content = '<div class="comparison">'+box('DaemonLogger', unit('10 MiB active log', 'rotate through 4 backups')+unit('1,024 queued events', 'pending writes'))+box('WorkspaceDaemon traces', unit('5 min after disconnect', 'expiry of diagnostic trace')+unit('1,024 retained traces', 'effective minimum remains 1'))+'</div>'
        caption = 'Existing defaults, now read from diagnostics. Trace expiry and result retention are different mechanisms.'
    elif kind == 'timeouts':
        content = '<div class="timeout-lanes">'
        for label, num, width, detail in [('status command composition', '100 ms', 20, 'identify / ping through status-observer transport'), ('ordinary composition', '250 ms', 50, 'lifecycle requests and execution-status'), ('execute admission', '5,000 ms', 100, 'until acceptance; accepted completion has no deadline')]:
            content += f'<div class="timeout-lane"><strong>{label}</strong><span class="timebar" style="--length:{width}%">{num}</span><span>{detail}</span></div>'
        content += '</div>'
        caption = 'Bar lengths are illustrative, not to scale. Selection belongs to composition purpose, not request naming.'
    elif kind == 'attempts':
        content = box('Outer scope · execute() · default reattachments = 1', '<div class="comparison">'+box('executeOnce · attempt 1', unit('accepted, connection closes', 'no manifest → no fetch'), 'old-owner')+box('executeOnce · attempt 2', unit('accepted + manifest', 'close → one result-fetch → completion'), 'new-owner')+'</div>')
        content += '<div class="branch">Fetch fails <span>→</span> fail settles this attempt; it does not call fetch recursively.</div>'
        caption = 'The added test’s run: 2 execute submissions, 1 fetch. Each executeOnce has its own counter. This is a source/test illustration, not a live network simulation.'
    elif kind == 'errors':
        content = flow(unit('Original attempt', 'accepted → E₁: connection closed'), unit('Reattached attempt', 'same request; one allowed reattachment'), unit('Later failure', 'E₂: corruption'))
        content += table(['Where E₂ happens', 'Base returns', 'Head returns'], [
            ['Reattached submission rejects', 'E₁ · original close', 'E₁ · original close'],
            ['Reattached completion rejects', 'E₁ · original close', '<strong class="amber-text">E₂ · later corruption</strong>'],
        ])
        content += '<p class="probe-link"><a href="probe-results.json">Recorded source-probe output ↗</a> · <a href="probe.mjs">Reproduction script ↗</a></p>'
        caption = 'Executed method probe with the attempt boundary stubbed. It tests error selection only; no socket or daemon ran.'
    elif kind == 'seams':
        content = table(['Remaining input', 'What it controls', 'Observed callers'], [
            ['startupOwnerIsWithinGrace(owner, graceMs?, now?)', 'heartbeat grace override', 'production omits override; unit test passes 100 ms'],
            ['writeChunkSize?', 'socket write fragmentation', 'transport tests use 1-byte writes'],
            ['required maximumChunkRawBytes number', 'codec and worker-message size', 'production projects a policy value'],
        ])
    elif kind == 'adapters':
        content = flow(box('apps/cli/test/helpers', unit('Legacy small-threshold inputs', '7 helper files')), unit('DaemonPolicyTestFactory', 'validated snapshot / projected section'), box('apps/cli/src', unit('Runtime constructors', 'required policy inputs')))
        caption = 'Test adaptation path. Production mechanisms do not gain the legacy compatibility overloads.'
    elif kind == 'test-move':
        content = table(['Concern', 'Deleted CLI test', 'Pre-existing package evidence'], [
            ['Memory derivation table', '256 MiB / 512 MiB / 1 GiB / 16 GiB / 64 GiB', '1 byte / 512 MiB / 1 GiB / 16 GiB / 64 GiB'],
            ['Memory constraint', 'smaller positive; larger constraint', 'positive lower, zero, negative, larger, equal, raw bytes'],
            ['Default supervision cadence', 'exported constant equals 250', 'complete default snapshot includes 250'],
            ['Runtime supervision cadence', 'not deleted', 'CLI behavior test stays; injected 17 ms case added'],
            ['Healthy startup input', 'startupTimeoutMs: 5 removed', 'pending/readiness assertions stay; the old field was unused'],
        ])
        caption = 'Coverage correspondence, not a test-result verdict. The library tests were already in #131’s base; this PR did not move or add them.'
    elif kind == 'fixtures':
        content = '<div class="constraint">Existing policy validator: <strong>0 &lt; chunk ≤ inline ≤ result ≤ aggregate</strong></div>'
        content += table(['Fixture / helper', 'Base or requested input', 'Shipped input or adaptation'], [
            ['Local spilled capture', 'inline = 1', 'inline = 32; chunk adjusted with it'],
            ['Blocked / symlink spool', 'inline = 0; fail on first x', 'inline = 1; second x crosses boundary'],
            ['Finalize / unlink spool', 'inline = 0; “stored”', 'inline = 6; “stored” then “x”'],
            ['Sequenced output', 'one “xx” record', 'two “x” records'],
            ['Transport helper', 'inline below default chunk cap', 'raised to at least that chunk cap'],
            ['Workspace helper', 'memoryCapBytes?', 'accepted by helper type, not used to create its policy'],
        ])
    elif kind == 'policy-tests':
        content = '<div class="comparison">'+box('Behavioral tests', unit('Distinct injected values', 'chunk 2 · RSS cadence 17 · distinct 10/1,000 ms timeouts')+unit('Recovery tests', 'startup retries 0 and 2; delivery default nesting'))+box('Source meta-test', unit('Retired string list', 'expanded names / optional threshold spellings')+unit('Meaning', 'checks that listed source strings do not reappear'))+'</div>'
        caption = 'Grouped test intent. A source-string ban has a narrower scope than proving all policy provenance.'
    else:
        raise ValueError(kind)
    return f'<figure class="mechanism" aria-label="{escape(kind.replace("-", " "))}">{content}{note(caption) if caption else ""}</figure>'


def overview(pr):
    if pr == 127:
        return '<figure class="opening-figure">'+flow(box('TypeScript backend', unit('Queries stay here', 'six independent key spaces')), unit('Clearing ownership moves', 'TS-specific clear sequence → generic scope', 'crossing'), box('Core', unit('TurnScopedCacheScope', 'one synchronous sweep; six handles')))+note('Simplified ownership sketch. TypeScript owns the scope instance and the turn trigger; core supplies the clearing mechanism.')+'</figure>'
    return '<figure class="opening-figure">'+flow(box('@symnav/daemon · already in base', unit('One policy snapshot', 'values + validation + recorded reasons')), unit('Required policy values', 'replace local defaults / optional thresholds', 'crossing'), box('apps/cli · mechanisms remain', unit('Resource · output · lifecycle', 'transport · delivery · diagnostics')))+note('Simplified package sketch. The arrow moves configuration authority; the daemon mechanisms have not moved packages in #131.')+'</figure>'
