"""Freeze scoped receipts. Writes only inside this experiment; never edits Symnav."""
from pathlib import Path
import difflib, hashlib, html, json, re, subprocess

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[1]
BUNDLE = json.loads((REPO / 'inputs/stack/pr.json').read_text())
PINS = {'main': BUNDLE['base'], 'head': BUNDLE['head']}
TREES = {'main': REPO / 'worktrees/main', 'head': REPO / 'worktrees/stack-head'}
for name, tree in TREES.items():
    assert subprocess.check_output(['git', '-C', str(tree), 'rev-parse', 'HEAD'], text=True).strip() == PINS[name]

for p in ['evidence/sources', 'src', 'screenshots']:
    (ROOT / p).mkdir(parents=True, exist_ok=True)

SOURCES = {}
def capture(key, rev, path):
    raw = (TREES[rev] / path).read_bytes()
    blob = subprocess.check_output(['git', '-C', str(TREES[rev]), 'show', f'{PINS[rev]}:{path}'])
    assert raw == blob, path
    text = raw.decode()
    SOURCES[key] = dict(key=key, revision=rev, commit=PINS[rev], path=path,
                        sha256=hashlib.sha256(raw).hexdigest(), text=text)
    (ROOT / 'evidence/sources' / f'{key}.txt').write_bytes(raw)
    lines = '\n'.join(f'<span class="line" id="L{i}"><a href="#L{i}">{i}</a> {html.escape(line)}</span>' for i, line in enumerate(text.splitlines(), 1))
    (ROOT / 'evidence/sources' / f'{key}.html').write_text(f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>{html.escape(path)}</title><style>body{{margin:30px;font:15px system-ui;background:#f3f1e9;color:#183239}}a{{color:#126c7e}}pre{{font:13px/1.7 monospace;overflow:auto}}.line{{display:block;min-width:max-content}}.line>a{{display:inline-block;width:4ch;color:#647c7d}}.line:target{{background:#ffd9a0}}h1{{font-size:20px;overflow-wrap:anywhere}}</style><a href="../../index.html#surface">← Weather map</a><h1>{html.escape(path)}</h1><p>{rev} · {PINS[rev]} · SHA-256 {hashlib.sha256(raw).hexdigest()}</p><pre>{lines}</pre></html>''')

capture('main-transport', 'main', 'apps/cli/src/daemon/local-daemon-transport.ts')
capture('main-output', 'main', 'apps/cli/src/command-execution-result.ts')
capture('main-tests', 'main', 'apps/cli/src/daemon/local-daemon-transport-execution.test.ts')
for key, file in [('execution','execution-client'), ('receiver','result-transfer-receiver'), ('capture','client-result-capture'), ('socket','socket-client'), ('factory','daemon-transport'), ('head-tests','daemon-transport-execution.test'), ('receiver-tests','result-transfer-receiver.test'), ('execution-tests','execution-client.test')]:
    capture(key, 'head', f'packages/daemon/src/transport/{file}.ts')
capture('session', 'head', 'packages/daemon/src/execution/accepted-execution-session.ts')
capture('policy', 'head', 'packages/daemon/src/daemon-policy.ts')
capture('policy-record', 'head', 'plans/005/daemon-policy.md')
capture('coordinator', 'head', 'apps/cli/src/cli-invocation-coordinator.ts')
capture('runtime', 'head', 'packages/daemon/src/client/daemon-client-runtime.ts')

prs = [p for p in BUNDLE['pullRequests'] if p['number'] in [137,138,139,142,148,149]]
for pr in prs:
    key = f'pr-{pr["number"]}'
    body = pr['body']
    SOURCES[key] = dict(key=key, revision='PR body', commit='supplied bundle', path=f'PR #{pr["number"]} — {pr["title"]}', text=body, sha256=hashlib.sha256(body.encode()).hexdigest())
    (ROOT / 'evidence/sources' / f'{key}.txt').write_text(body)

def receipt(source, start, end, label):
    assert 1 <= start <= end <= len(SOURCES[source]['text'].splitlines()), (source,start,end)
    return dict(source=source, start=start, end=end, label=label)

def matching(source, phrase, span, label):
    lines = SOURCES[source]['text'].splitlines()
    n = next(i+1 for i,l in enumerate(lines) if phrase in l)
    return receipt(source,n,min(n+span,len(lines)),label)

READINGS = [
dict(id='ownership', number='01', title='The pressure separates. The process does not.', status='stated',
summary='Four selected roles: socket I/O, accepted recovery, transfer continuity, and output capture. On main, three share one CLI source file. At #149, each has a package file; all four still run client-side on this path. #148 stages the package; #149 switches the CLI.',
reason='PRs #138, #139, #142 and #149 give separate coordination and package boundaries as the reasons; #148 explicitly separates staging from the consumer switch.',
mechanism='The pressure count groups roles by their source file, not by class or process. LocalDaemonTransport contains the socket and recovery code plus an embedded DaemonResultTransferReceiver. OrderedCommandOutput is in a second CLI file. At the tip, socket-client.ts, execution-client.ts, result-transfer-receiver.ts and client-result-capture.ts each own one selected role. DaemonTransportFactory composes them; the CLI invocation coordinator enters through DaemonClient.',
detail='Warm output capture becomes daemon-scoped so it no longer depends on cold-command output internals. The chart omits other responsibilities in these files, other packages, and the worker. Its pressure values are a four-role census, never a complexity or risk score.',
receipts=[receipt('main-transport',137,167,'Embedded receiver'),receipt('main-transport',391,430,'Recovery and output creation'),receipt('main-output',132,165,'Separate CLI output owner'),receipt('factory',31,84,'Four package owners composed'),receipt('coordinator',17,36,'CLI calls DaemonClient'),matching('pr-138','Chose daemon-scoped capture',0,'Stated: storage ownership'),matching('pr-148','Chose package staging',0,'Stated: staged switch'),matching('pr-149','Chose focused package',0,'Stated: final package composition')]),
dict(id='fetch', number='02', title='A fetch keeps the weather already recorded.', status='stated',
summary='After acceptance and a manifest, interrupted delivery can fetch from the first record not yet appended. The connection and decoder are fresh; the receiver, manifest, digest progress and capture survive. Offsets advance only after append resolves, and completion must match its manifest.',
reason='PR #138 says durable receipt must determine the resume offset, while manifest identity and transfer state must survive reconnection. This continuity already exists on main.',
mechanism='executeOnce creates one receiver and capture. When its accepted, nonterminal transfer closes, resume calls beginConnection on that same receiver, then fetchCompletion sends result-fetch with offset: transfer.nextOffset. beginConnection clears per-connection flags but retains the manifest and offset. A new decoder starts at the new socket boundary.',
detail='The example on the map assumes record 0 was appended, so the next offset is 1. This is an authored example, not a recorded network event. A record currently waiting on append is not counted. Repeated manifests must match; offsets must be contiguous; terminal counts and the captured digest are checked before finish succeeds.',
receipts=[receipt('execution',116,146,'Same receiver enters fetch'),receipt('execution',300,333,'Fresh decoder; request carries durable offset'),receipt('receiver',30,82,'Connection reset and awaited append'),receipt('receiver',85,131,'Manifest and final digest validation'),receipt('main-transport',157,209,'Continuity already present on main'),receipt('receiver-tests',62,87,'Held-append witness'),matching('pr-138','Chose to advance resume',2,'Stated: continuity versus connection')]),
dict(id='reattach', number='03', title='A new delivery can belong to the same request.', status='stated',
summary='A qualifying accepted close can reattach the identical execute request. It gets a fresh receiver and output capture; the interrupted capture is disposed. The daemon’s duplicate identity path avoids a new execution turn. Reattachment requires closed + accepted + the same authenticated instance.',
reason='PR #142 distinguishes new delivery from resumed delivery; PR #147 says duplicate attachment must retain daemon-lifetime idempotency. Recovery loops already exist on main.',
mechanism='completeWithReattachments accepts only a DaemonTransportError whose code is closed, delivery is accepted, and authenticatedInstanceId matches the request. It calls executeOnce again with the same endpoint and request. executeOnce allocates fresh output and receiver state, and its failure path disposes the interrupted transfer.',
detail='On the daemon side, AcceptedExecutionSession returns the existing acceptance before starting another execution. The amber return path therefore means delivery of the accepted work. It does not assert exactly-once execution across daemon restarts or invent a new request ID.',
receipts=[receipt('execution',40,91,'Same request; new capture each attempt'),receipt('execution',104,114,'Dispose interrupted transfer'),receipt('execution',400,410,'Exact reattachment predicate'),receipt('session',45,70,'Existing identity skips execution'),receipt('main-transport',391,414,'Main already reattaches once'),receipt('execution-tests',112,129,'Identical request test assertions'),matching('pr-142','Chose a fresh output',0,'Stated: new delivery versus fetch')]),
dict(id='failure', number='04', title='Some rain ends the journey.', status='stated',
summary='A clean fetch EOF after its budget is exhausted becomes accepted corruption, with no execution reattachment. Exhausted qualifying reattachments return the first accepted close. Corrupt transfer data is terminal. Acceptance removes the completion deadline; successful delivery waits for acknowledgement, and acknowledgement failure disposes output.',
reason='PR #142 explicitly preserves accepted-corruption behavior on exhausted fetches. The policy record says accepted work is not failed or replayed merely for running long; PR #138 requires an explicit output-disposal path.',
mechanism='An incomplete clean fetch throws DaemonResultFetchEndedError. When fetch recovery is exhausted, the execution client translates that internal close to code: corrupt, delivery: accepted. That fails the closed-only reattachment predicate. Other qualifying accepted closes use the outer reattachment budget and preserve the first close on final failure.',
detail='The output is returned only after transfer validation and result acknowledgement. If acknowledgement fails, the finished output is disposed. The map’s rain marks the selected failure condition; drop count, fall speed and storm area carry no likelihood, elapsed time or severity.',
receipts=[receipt('execution',20,24,'Internal clean-fetch EOF'),receipt('execution',135,144,'Exhausted EOF maps to corruption'),receipt('execution',47,74,'First accepted close retained'),receipt('execution',146,151,'Timeout removed at acceptance'),receipt('execution',211,230,'Acknowledgement before returning output'),receipt('head-tests',736,790,'No replay on exhausted clean fetch'),matching('policy-record','post-accept completion',0,'Stated: no completion deadline')]),
dict(id='forecast', number='05', title='Two budgets; one unexplained calibration.', status='mixed',
summary='The defaults remain 1 reattachment per request and 1 fetch resume per execute attempt. The stack replaces fixed one-shot recovery with independent numeric policy counters; zero and larger limits are tested. Preserving the defaults is stated. Why precisely one of each was chosen is unexplained in the inspected record.',
reason='PR #142 explains independent configurable budgets. The policy record explains their purpose, but supplies no comparison or calibration for the exact value 1. The forecast haze marks that bounded rationale gap, not uncertainty about the code.',
mechanism='The reattachment counter lives outside executeOnce. The fetch counter lives inside it, so a reattached attempt starts with its own fetch allowance. At default settings this allows at most two execute attempts and one fetch within each attempt, subject to the actual error path. It does not promise that every close consumes all allowances.',
detail='Search scope: the supplied stack PR bodies and commit messages, the current daemon policy record, architecture specification, and selected source/tests. No implementing conversation or production incident measurements were available. These are internal policy values, not user-facing weather controls.',
receipts=[receipt('policy',131,134,'Exact default values'),receipt('execution',47,74,'Request-level reattachment counter'),receipt('execution',91,135,'Attempt-level fetch counter'),receipt('main-transport',397,414,'Main: one reattachment'),receipt('main-transport',434,474,'Main: one-shot resume flag'),matching('pr-142','Chose independent numeric',0,'Stated: separate configurable scopes'),matching('policy-record','delivery.postAcceptance',1,'Purpose given; exact calibration absent')]),
dict(id='tests', number='06', title='The observations have moved with the owners.', status='stated',
summary='Fourteen literal transport test titles survive in the package suite. Added witnesses separate zero/multiple recovery limits, fresh-capture disposal and exhausted-fetch corruption. This artifact runs focused transport/receiver/client suites; it makes no whole-stack parity claim and does not equate matching test names with matching assertions.',
reason='PR #142 calls for direct ownership and identical-request recovery tests; #149 moves the physical ownership boundary. The evidence includes a complete before/tip diff of this one transport test file, so changed assertions remain inspectable.',
mechanism='Use the source witnesses to separate a behavioral assertion from a reason. The receiver test holds append pending and checks that offset stays zero, then releases it and checks offset one. The execution tests compare identical execute bytes and fresh captures. The transport suite uses real local Unix sockets to exercise fetch and reattachment paths.',
detail='The run logs and test-title census concern only this recovery slice. Other stack test changes are outside the map. Title retention is an inventory check, not proof of unchanged assertions or correctness. See the full scoped test diff for the migration and added assertions.',
receipts=[receipt('receiver-tests',62,87,'Pending append observation'),receipt('execution-tests',112,129,'Fresh captures and identical execute bytes'),receipt('head-tests',1257,1266,'Fresh output and one disposal'),receipt('head-tests',780,790,'Accepted-corrupt and request counts'),matching('pr-142','daemon-execution-client.test.ts',0,'Direct ownership test intent')])
]

# Include #147 body solely for the already surfaced duplicate-execution context.
p147 = next(p for p in BUNDLE['pullRequests'] if p['number']==147)
SOURCES['pr-147'] = dict(key='pr-147',revision='PR body',commit='supplied bundle',path='PR #147 — Serialize accepted daemon execution in one session',text=p147['body'],sha256=hashlib.sha256(p147['body'].encode()).hexdigest())
READINGS[2]['receipts'].append(matching('pr-147','Chose duplicate attachment',0,'Stated: preserve request identity'))

roles=[
 dict(id='recovery',name='Accepted recovery',main='main-transport',head='execution',mainOwner='LocalDaemonTransport',headOwner='DaemonExecutionClient'),
 dict(id='socket',name='Socket I/O',main='main-transport',head='socket',mainOwner='LocalDaemonTransport',headOwner='LocalDaemonSocketClient'),
 dict(id='receiver',name='Transfer continuity',main='main-transport',head='receiver',mainOwner='embedded DaemonResultTransferReceiver',headOwner='DaemonResultTransferReceiver'),
 dict(id='capture',name='Output capture',main='main-output',head='capture',mainOwner='OrderedCommandOutput',headOwner='DaemonClientResultCapture'),
]
def titles(key):
    return re.findall(r'\bit\(\s*"([^"]+)"',SOURCES[key]['text'])
base_titles,head_titles = titles('main-tests'),titles('head-tests')
census=dict(main=base_titles,head=head_titles,missing=[x for x in base_titles if x not in head_titles],added=[x for x in head_titles if x not in base_titles],limit='Literal it(...) titles only; parameterized cases are excluded. This is not an assertion-parity check.')
assert not census['missing'], census
diff=''.join(difflib.unified_diff(SOURCES['main-tests']['text'].splitlines(True),SOURCES['head-tests']['text'].splitlines(True),fromfile='main/apps/cli/src/daemon/local-daemon-transport-execution.test.ts',tofile='head/packages/daemon/src/transport/daemon-transport-execution.test.ts'))
(ROOT/'evidence/transport-test.diff').write_text(diff)
(ROOT/'evidence/test-census.json').write_text(json.dumps(census,indent=2)+'\n')
data=dict(pins=PINS,sources=SOURCES,readings=READINGS,roles=roles,census=census)
(ROOT/'src/data.json').write_text(json.dumps(data,indent=2)+'\n')
(ROOT/'evidence/manifest.json').write_text(json.dumps({k:{a:b for a,b in v.items() if a!='text'} for k,v in SOURCES.items()},indent=2)+'\n')
(ROOT/'evidence/pyramid-map.json').write_text(json.dumps([{k:r[k] for k in ['id','number','title','summary','reason','receipts']} for r in READINGS],indent=2)+'\n')
hits=[]
for pr in BUNDLE['pullRequests']:
    documents=[('body',pr['body'])]+[(c['sha'],c.get('subject','')+'\n'+c.get('body','')) for c in pr.get('commits',[])]
    for kind,txt in documents:
        for n,line in enumerate(txt.splitlines(),1):
            if any(k in line.lower() for k in ['reattach','fetch resume','numeric policy counter','one-shot']):
                hits.append(dict(pr=pr['number'],document=kind,line=n,text=line))
(ROOT/'evidence/rationale-search.json').write_text(json.dumps(hits,indent=2)+'\n')
print(f'Captured {len(SOURCES)} sources, {len(READINGS)} complete surface readings, {len(base_titles)} retained literal test titles.')
