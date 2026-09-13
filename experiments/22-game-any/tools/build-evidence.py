"""Build portable, pinned reading material. Reads symnav; writes only this experiment."""
from pathlib import Path
import json
import re
import html
import subprocess

HERE = Path(__file__).resolve().parents[1]
ROOT = HERE.parents[1]
INPUT = ROOT / 'inputs/stack'
WORKTREE = ROOT / 'worktrees/stack-head'
bundle = json.loads((INPUT / 'pr.json').read_text())
BASE, HEAD = bundle['base'], bundle['head']

def at(sha, path):
    result = subprocess.run(['git', 'show', f'{sha}:{path}'], cwd=WORKTREE, text=True, capture_output=True)
    return result.stdout if result.returncode == 0 else ''

def section(body, name):
    found = re.search(r'## ' + re.escape(name) + r'\n(.*?)(?=\n## |\Z)', body, re.S)
    return found[1].strip() if found else ''

# Grouping is this artifact's reading aid, not the implementing author's taxonomy.
groups = [
    dict(id='workspace', title='Keep workspace identity; discard turn answers', glyph='01', prs=[123,124,126,127,128]),
    dict(id='host', title='The host supplies meaning and environment', glyph='02', prs=[129,132,135,136]),
    dict(id='policy', title='One policy and one answer at each gate', glyph='03', prs=[130,131,133,134]),
    dict(id='transport', title='Sockets end; accepted work and transfers can continue', glyph='04', prs=[137,138,139,140,141,142,143]),
    dict(id='sessions', title='Different owners for execution, workers, and delivery', glyph='05', prs=[144,145,146,147]),
    dict(id='package', title='Stage the package, switch the caller, enforce the boundary', glyph='06', prs=[148,149]),
]

# Final paths, before paths, and focused evidence spans (inclusive, 1-based).
locations = {
123: ('packages/core/src/workspace/workspace-source-cache.ts','packages/backend-typescript/src/typescript-backend/workspace-source-cache.ts',1,85),
124: ('packages/core/src/backend/revisioned-backend-state.ts','packages/backend-typescript/src/typescript-backend/typescript-workspace-state.ts',60,140),
126: ('packages/core/src/workspace/project-graph.ts','packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts',85,165),
127: ('packages/core/src/backend/turn-scoped-cache-scope.ts','packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts',1,46),
128: ('packages/core/src/workspace/workspace-session.ts','apps/cli/src/workspace-request-scope.ts',1,81),
129: ('apps/cli/src/state-directory-resolver.ts','packages/telemetry/src/state-dir.ts',1,35),
130: ('packages/daemon/src/daemon-policy.ts','apps/cli/src/daemon/daemon-resource-policy.ts',77,190),
131: ('packages/daemon/src/transport/daemon-transport.ts','apps/cli/src/daemon/local-daemon-transport.ts',1,87),
132: ('packages/daemon/src/daemon-command-name.ts','apps/cli/src/daemon/daemon-protocol.ts',1,32),
133: ('packages/daemon/src/daemon-execution-failure.ts','apps/cli/src/daemon/daemon-protocol.ts',1,35),
134: ('packages/daemon/src/daemon-admission.ts','apps/cli/src/daemon/workspace-daemon.ts',1,129),
135: ('apps/cli/src/daemon-executor.ts','apps/cli/src/daemon/daemon-navigation-worker-entry.ts',1,150),
136: ('packages/renderer/src/lifecycle/daemon-lifecycle-renderer.ts','apps/cli/src/daemon/daemon-lifecycle-renderer.ts',1,110),
137: ('packages/daemon/src/transport/wire-codec.ts','apps/cli/src/daemon/local-daemon-transport.ts',1,130),
138: ('packages/daemon/src/transport/result-transfer-receiver.ts','apps/cli/src/daemon/local-daemon-transport.ts',25,128),
139: ('packages/daemon/src/transport/socket-client.ts','apps/cli/src/daemon/local-daemon-transport.ts',1,130),
140: ('packages/daemon/src/transport/lifecycle-client.ts','apps/cli/src/daemon/local-daemon-transport.ts',1,130),
141: ('packages/daemon/src/transport/socket-server.ts','apps/cli/src/daemon/local-daemon-transport.ts',1,145),
142: ('packages/daemon/src/transport/execution-client.ts','apps/cli/src/daemon/local-daemon-transport.ts',35,120),
143: ('packages/daemon/src/transport/daemon-transport.ts','apps/cli/src/daemon/local-daemon-transport.ts',1,87),
144: ('packages/daemon/src/process/activity-projector.ts','apps/cli/src/daemon/workspace-daemon.ts',1,126),
145: ('packages/daemon/src/worker/worker-generation-manager.ts','apps/cli/src/daemon/workspace-daemon.ts',80,190),
146: ('packages/daemon/src/delivery/delivery-session.ts','apps/cli/src/daemon/workspace-daemon.ts',135,245),
147: ('packages/daemon/src/execution/accepted-execution-session.ts','apps/cli/src/daemon/workspace-daemon.ts',40,170),
148: ('packages/daemon/src/client/daemon-client.ts','apps/cli/src/daemon/daemon-command-dispatcher.ts',1,64),
149: ('apps/cli/src/cli-invocation-coordinator.ts','apps/cli/src/daemon/daemon-command-dispatcher.ts',1,44),
}

stage = {
130: 'At the tip: policy codecs and test factories are package-internal; the temporary policy-testing export is gone (#149).',
133: 'The original app-owned error fact derivation moves with the mechanisms into the daemon package.',
139: 'This PR splits outbound sockets first. Inbound serving gains its owner in #141; the final facade is package-owned.',
143: 'Temporary facade decision: LocalDaemonTransport is later removed by #149. The tip has focused DaemonTransport composition.',
148: 'Staging decision: #149 switches the production CLI and deletes the frozen CLI compatibility copies.',
}

prs = []
evidence = {}
for pr in bundle['pullRequests']:
    n = pr['number']
    ds = []
    for i, line in enumerate(section(pr['body'], 'Decisions').splitlines(), 1):
        if not line.startswith('- '): continue
        t = line[2:]
        m = re.match(r'(Chose|Kept) (.*?) over (.*?), because (.*)\.$', t)
        assert m, (n, t)
        ds.append(dict(id=f'{n}.{i}', chosen=m[2], alternative=m[3], reason=m[4], status='stated', text=t))
    path, oldpath, start, end = locations[n]
    full = at(HEAD, path)
    assert full, path
    evidence[str(n)] = dict(path=path, oldPath=oldpath, start=start,
                           excerpt='\n'.join(full.splitlines()[start-1:end]),
                           full=full, before=at(BASE, oldpath), body=pr['body'], commits=pr['commits'])
    prs.append(dict(number=n, title=pr['title'], context=section(pr['body'],'Context'),
                    decisions=ds, group=next(g['id'] for g in groups if n in g['prs']),
                    stage=stage.get(n,''), path=path))

assert sum(len(p['decisions']) for p in prs) == 117

policy_text = at(HEAD,'plans/005/daemon-policy.md')
policy=[]
absences=[]
in_absences=False
for line in policy_text.splitlines():
    if line == '## Intentional absences': in_absences=True
    if not line.startswith('|'): continue
    cells=[c.strip().replace('`','') for c in line.strip('|').split('|')]
    if set(''.join(cells)) <= set('- :') or cells[0] in ['Threshold','Deadline','Value','Policy value','Field','Policy path or recipe']: continue
    if len(cells)==5: policy.append(dict(key=cells[0],value=cells[1],consumer=cells[2],reason=cells[3],test=cells[4]))
    elif in_absences and len(cells)==3: absences.append(dict(key=cells[0],value=cells[1],reason=cells[2]))

extra = [
 dict(id='X1', title='Keep the existing behavior debts', status='stated', choice='Source-byte selection eviction, startup/acceptance-based idle time, unbounded healthy startup and post-accept completion, unacknowledged retention, queued readiness probes, and file-lease election remain.', reason='The architecture spec defers behavior changes; the follow-up spec records retention, silence, readiness, endpoint, idle, and election work separately.', path='plans/005/daemon-follow-ups-functional-spec.md'),
 dict(id='X2', title='Change the PR template in the cache PR', status='unexplained', choice='Rename Why to Context; replace generated SVG trees with plain text; replace Reading order with Visuals; generalize signature examples.', reason='The commit names the template update. No reason found for these changes in the supplied bodies, commits, or architecture spec.', path='.github/PULL_REQUEST_TEMPLATE.md'),
 dict(id='X3', title='Inspect parsed diagnostics instead of raw log files', status='stated', choice='CLI tests use the read-only inspector; external registry, spool, and diagnostic file access moves behind the package boundary.', reason='PR #149: external assertions need observability without storage or mutation authority.', path='apps/cli/test/e2e/daemon/diagnostic-output.test.ts'),
 dict(id='X4', title='Remove raw-byte and file-cap checks from the CLI diagnostic test', status='unexplained', choice='The test no longer checks every log file’s size, backup count, or absence of secrets in raw contents. It checks parsed event JSON for secrets.', reason='Package isolation is stated. No specific reason found for dropping those exact CLI-level observations; package logger tests are a different observation surface.', path='apps/cli/test/e2e/daemon/diagnostic-output.test.ts'),
 dict(id='X5', title='Give the twelve-MiB transfer test more time', status='unexplained', choice='The test timeout grows from 20 seconds to 60 seconds; output record, stream, and byte assertions remain.', reason='The commit says “Budget twelve MiB transport test”; no reason found for the chosen 60-second allowance. This is a test budget, not a runtime timeout.', path='packages/daemon/src/transport/daemon-transport-execution.test.ts',oldPath='apps/cli/src/daemon/daemon-transport-execution.test.ts'),
 dict(id='X6', title='Retire and relocate mechanism tests', status='stated', choice='CLI-private request-scope, dispatcher, worker, transport, clock, and process tests are removed or migrate into core/daemon; new boundary, transaction, and host tests are added.', reason='The spec assigns mechanism tests to their package and external assertions to the public surface. File moves do not establish equivalent coverage.', path='plans/005/daemon-architecture-functional-spec.md'),
 dict(id='X7', title='Project discovery order and release order', status='unexplained', choice='Core discovers configurations FIFO, keeps first configured ownership plus inferred fallback, and releases project resources sequentially; WorkspaceSession releases backends concurrently.', reason='Commits and tests specify the graph order, but no comparative reason was found for those graph order choices. Concurrent backend release is explained in #128.', path='packages/core/src/workspace/project-graph.ts'),
 dict(id='X8', title='Preserve query values, promises, and throws', status='stated', choice='Six independent caches retain values (including undefined) and Promise identity within a turn, including rejected Promises. A synchronous creator throw stores nothing.', reason='PR #127 explicitly preserves all six algorithms, key spaces, identities, and failure behavior.', path='packages/core/src/backend/turn-scoped-cache-scope.ts'),
 dict(id='X9', title='Read-only inspector handles invalid state', status='unexplained', choice='Directory ENOENT/ENOTDIR becomes empty state; a disappearing log is skipped. Malformed JSON and invalid diagnostic records are skipped; other read/lstat failures propagate. Rotated logs are read oldest first, cursors must be nonnegative safe integers, and instances sort by workspace then instance ID.', reason='Commits and source specify these cases. No separate reason found for these error-partition and ordering choices in the supplied explanations.', path='packages/daemon/src/testing/daemon-testing-inspector.ts'),
 dict(id='X10', title='Startup ownership and clocks become daemon authorities', status='stated', choice='Registry owns startup authorization. DaemonClock owns wall and monotonic time; timing clients receive explicit clock values. Node-free public loading remains separate from the Node runtime.', reason='The architecture spec assigns one lock-ownership check and daemon-owned clocks; #148 keeps Node ambient types out of host declarations.', path='packages/daemon/src/registry/registry.ts'),
]

# Expose each removed built-CLI scenario at the root, not a count hidden behind a badge.
for path in ['apps/cli/test/e2e/daemon/status.test.ts','apps/cli/test/e2e/daemon/stop.test.ts']:
    before,after=at(BASE,path),at(HEAD,path)
    for title in re.findall(r'\bit\("([^"]+)"',before):
        if title in after: continue
        extra.append(dict(id=f'X{len(extra)+1}',title='Retire built CLI scenario: '+title,
            status='unexplained',choice='This exact scenario is removed from '+('daemon status' if 'status.test' in path else 'daemon stop')+' e2e tests.',
            reason='Package ownership explains the migration direction. No reason found for retiring this exact built-command path. Related package tests are not asserted equivalent here.',path=path))

for d in extra:
    oldpath=d.get('oldPath',d['path'])
    before,after=at(BASE,oldpath),at(HEAD,d['path'])
    if d['id']=='X6' and not after: after=(INPUT/'repo-rules.md').read_text().split('# plans/005/daemon-architecture-functional-spec.md')[-1]
    evidence[d['id']]=dict(path=d['path'],oldPath=oldpath,full=after,before=before)

# Portable, local snapshots; PR prose is supplied input, not fresh web retrieval.
evdir=HERE/'evidence'
evdir.mkdir(exist_ok=True)
def render_source(text):
    return '\n'.join(f'<span id="L{i}"><a href="#L{i}">{i:4}</a> {html.escape(line)}</span>' for i,line in enumerate(text.splitlines(),1))
for key, ev in evidence.items():
    title = 'PR #'+key if key.isdigit() else key
    page=f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{title} — pinned evidence</title>
<style>body{{background:#faf9f3;color:#182f36;font:16px system-ui;margin:3rem auto;max-width:1100px;padding:0 20px}}a{{color:#056b73}}pre{{overflow:auto;background:#eef0e9;padding:1rem;line-height:1.5;font-size:12px}}pre span{{display:block}}pre a{{text-decoration:none}}h2{{margin-top:3rem}}</style>
<a href="../index.html#atlas">← Return to the open briefing</a><h1>{title} · pinned evidence</h1>
<p>main <code>{BASE}</code> → tip <code>{HEAD}</code>. These are source snapshots, not a test run.</p>
<h2>Tip · {html.escape(ev['path'])}</h2><pre>{render_source(ev['full'])}</pre>
<h2>Main · {html.escape(ev['oldPath'])}</h2><pre>{render_source(ev['before']) if ev['before'] else 'No file at this path in main.'}</pre>'''
    related = {
        '127': ['packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts','packages/backend-typescript/src/typescript-backend/typescript-backend.ts'],
        '132': ['packages/daemon/src/transport/protocol.ts'],
        '138': ['packages/daemon/src/transport/client-result-capture.ts'],
        '145': ['packages/daemon/src/resources/resource-supervisor.ts'],
        '147': ['packages/daemon/src/execution/request-queue.ts'],
    }
    for related_path in related.get(key,[]):
        page+='<h2>Related tip source · '+html.escape(related_path)+'</h2><pre>'+render_source(at(HEAD,related_path))+'</pre>'
    if 'body' in ev:
        page+='<h2>Supplied PR body (historical stage)</h2><pre>'+html.escape(ev['body'])+'</pre><h2>Supplied commits</h2><pre>'+html.escape('\n'.join(c['sha']+' '+c['subject']+'\n'+c.get('body','') for c in ev['commits']))+'</pre>'
    (evdir/f'{key}.html').write_text(page+'</html>')

data=dict(base=BASE,head=HEAD,groups=groups,prs=prs,extras=extra,policy=policy,absences=absences,
          evidence={k:{x:v for x,v in ev.items() if x in ['path','oldPath','start','excerpt']} for k,ev in evidence.items()})
(HERE/'assets/briefing.js').write_text('window.BRIEFING = '+json.dumps(data,ensure_ascii=False)+';\n')
(evdir/'inventory.json').write_text(json.dumps(dict(base=BASE,head=HEAD,declaredDecisions=117,supplementaryDecisions=len(extra),
    removedBuiltCliScenarios=10,files=[dict(pr=n,path=locations[n][0],beforePath=locations[n][1]) for n in locations]),indent=2))
print(f'Built {len(prs)} PR cards, 117 stated decisions, {len(extra)} supplementary decisions, {len(policy)} policy rows, {len(absences)} intentional absences; {len(evidence)} evidence pages.')
