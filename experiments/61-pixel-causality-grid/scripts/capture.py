"""Capture the active ownership path at every supplied PR head. Writes only here."""
from pathlib import Path
import hashlib, html, json, re, subprocess

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
WT = ROOT / 'worktrees/stack-head'
bundle = json.loads((ROOT / 'inputs/stack/pr.json').read_text())
def git(*args):
    return subprocess.check_output(['git', '-C', str(WT), *args], text=True)

boundaries = [
 dict(id='accept', letter='A', title='Accept once', kind='state', reason='stated', prs=[132,147,148],
      summary='A matching duplicate retains its acceptance without another turn or idle reset. Idle resets at new acceptance, not completion. #132 adds command identity to matching; #147 moves acceptance metadata into the ledger.',
      mechanism='The coordinator checks for an existing ledger entry before scheduling execution. New acceptance resets navigation activity. Completion does not become a fresh acceptance. Before #147 the process keeps acceptance metadata in a separate map; from #147 the ledger entry retains it.',
      rationale='PR #132: reattachment must preserve operational identity. PR #147: one original acceptance identity spans all states; duplicates must not create another turn, trace, clock read or lifetime reset. PR #148 explicitly defers changing acceptance-based idle timing.'),
 dict(id='worker', letter='B', title='Await worker', kind='gate', reason='stated', prs=[145],
      summary='A turn awaits its worker result. #145 gives generation readiness, execution and replacement to one manager; warm-up sampling still gates admission.',
      mechanism='Before #145 the process obtains the current generation, waits for readiness, executes, and checks the response. From #145 the generation manager owns that sequence. Its ready report and readiness activation are distinct, so a report alone is not admission permission.',
      rationale='PR #145: startup, execution, replacement, fencing, release and shutdown share one lifecycle state; warm-up sampling remains the admission and activity barrier.'),
 dict(id='seal', letter='C', title='Seal bytes', kind='gate', reason='unexplained', prs=[],
      summary='Await completion storage finishing before publishing terminal success. The precise seal-before-publication rationale is unexplained in the inspected prose.',
      mechanism='The queued operation awaits spool.finish(exitCode), or completion.finish(exitCode), before calling ledger.complete. This is a caller-side completion barrier; the field does not claim a disk fsync or measure disk durability.',
      rationale='No specific reason for this exact ordering was found in the supplied 26 PR bodies, commit messages or inspected architecture/follow-up text. The code shows it in main and every sampled PR head; a general preservation promise is not a specific explanation.'),
 dict(id='terminal', letter='D', title='Publish terminal', kind='state', reason='unexplained', prs=[],
      summary='The ledger can say completed while delivery is pending. The reason for publishing before the delivery wait is unexplained.',
      mechanism='AcceptedRequestLedger.complete publishes state "completed" and notifies subscribers. Only afterwards does the execution coordinator await the tracked delivery. Terminal state and a released FIFO are therefore different observations.',
      rationale='The inspected prose does not explain why terminal publication precedes the delivery wait. This is a source-observed boundary, inherited through the stack.'),
 dict(id='stream', letter='E', title='Wait for stream', kind='gate', reason='stated', prs=[146],
      summary='The current tracked delivery promise gates the turn. #146 keeps the latest per-request promise to avoid another request registry, not an aggregate of duplicate streams; absent tracking adds no wait.',
      mechanism='Ledger completion can start a delivery through its subscription. The execution path then reads and awaits the currently tracked promise. The delivery owner stores one promise per request; the map is not a registry of all concurrent attachments. Stream delivery and result acknowledgement remain separate exchanges.',
      rationale='PR #146: queue completion must wait for the current stream without creating another request registry. The session coordinates delivery while the ledger and completion store retain their data authority.'),
 dict(id='sample', letter='F', title='Sample at boundary', kind='gate', reason='stated', prs=[147],
      summary='A resource sample scheduled in the turn’s finally runs before the next FIFO operation, after success or failure. Sample failure is diagnostic and releases that barrier.',
      mechanism='The queued operation schedules sampleAtTurnBoundary in finally. The queue services its scheduled boundary before taking another request. It catches a rejected boundary operation, settles the boundary promise, clears it, and continues; the execution session records the sampling failure.',
      rationale='PR #147: turn-boundary sampling must gate the next FIFO turn after success or failure.'),
 dict(id='next', letter='G', title='Next turn', kind='dispatch', reason='stated', prs=[147],
      summary='The next request starts only after the current operation and its scheduled boundary settle. Ordinary ACK is outside this gate; workspace-deletion shutdown adds its own acknowledgement wait.',
      mechanism='WorkspaceRequestQueue awaits one request operation at a time and gives a scheduled boundary priority. Normal execution awaits tracked delivery, not the result-ack handler. If the workspace has disappeared, the execution path additionally invokes the post-delivery shutdown transition, which has an acknowledgement grace wait. The recording keeps the workspace present.',
      rationale='PR #147 preserves independent queue, delivery, worker, resource and process-lifecycle authorities, and places sampling inside the FIFO boundary. The workspace-deletion qualification is visible in both source paths.'),
 dict(id='cleanup', letter='H', title='Try cleanup', kind='effect', reason='stated', prs=[146],
      summary='Missing completion or wrong transfer identity rejects an ACK first. Otherwise it attempts physical cleanup; cleanup rejection is diagnostic and does not withhold protocol success.',
      mechanism='The ACK handler opens the completion, validates transfer identity, awaits spool.acknowledge with an error-recording catch, then proceeds. Missing completion or a mismatched transfer fails before that cleanup catch. The recording injects cleanup failure on a valid transfer.',
      rationale='PR #146: physical cleanup precedes logical acknowledgement; cleanup failure remains diagnostic and must not withhold protocol success.'),
 dict(id='ack', letter='I', title='Record ACK', kind='state', reason='stated', prs=[146],
      summary='After the cleanup attempt, mark the ledger acknowledged and return result-acknowledged. A delivered stream alone does neither.',
      mechanism='Logical acknowledgement is separate from the completed state. The journal marks the request acknowledged, the delivery trace ends, and the handler constructs the result-acknowledged response. The queue can advance without this ordinary acknowledgement when the workspace remains present.',
      rationale='PR #146 explicitly keeps logical acknowledgement and protocol success after the physical cleanup attempt, including its diagnostic failure path.'),
]

owners = {
 'shell': dict(label='Process shell', module='WorkspaceDaemon', color='#e8aa64'),
 'execution': dict(label='Execution session', module='AcceptedExecutionSession', color='#5bceac'),
 'worker': dict(label='Generation manager', module='DaemonWorkerGenerationManager', color='#e98687'),
 'ledger': dict(label='Accepted ledger', module='AcceptedRequestLedger', color='#d3a3ee'),
 'delivery': dict(label='Delivery session', module='DaemonDeliverySession', color='#72b8ec'),
 'queue': dict(label='Request queue', module='WorkspaceRequestQueue', color='#c5cf73'),
}

rows = [dict(number=0,title='main · baseline',sha=bundle['base'])] + [dict(number=p['number'],title=p['title'],sha=p['commits'][-1]['sha']) for p in bundle['pullRequests']]
sources = {}
def capture(sha, path):
    raw = git('show', f'{sha}:{path}')
    key = hashlib.sha256((sha+':'+path).encode()).hexdigest()[:16]
    if key not in sources:
        sources[key] = dict(id=key,sha=sha,path=path,hash=hashlib.sha256(raw.encode()).hexdigest(),text=raw)
    return key, raw

def excerpt(sha,path,pattern,before=6,after=14):
    key, raw = capture(sha,path)
    lines=raw.splitlines()
    hits=[i for i,l in enumerate(lines) if re.search(pattern,l)]
    if not hits: raise ValueError(f'Missing pattern {pattern}: {sha}:{path}')
    n=hits[0]
    return dict(source=key,start=max(1,n+1-before),end=min(len(lines),n+1+after),anchor=n+1)

cells=[]
for row in rows:
    n=row['number']; sha=row['sha']
    packaged=n==149
    app='apps/cli/src/daemon/'
    pkg='packages/daemon/src/'
    shell=app+'workspace-daemon.ts'
    ex=pkg+'execution/accepted-execution-session.ts' if packaged else (app+'accepted-execution-session.ts' if n>=147 else shell)
    de=pkg+'delivery/delivery-session.ts' if packaged else (app+'daemon-delivery-session.ts' if n>=146 else shell)
    wo=pkg+'worker/worker-generation-manager.ts' if packaged else (app+'daemon-worker-generation-manager.ts' if n>=145 else shell)
    le=pkg+'execution/accepted-request-ledger.ts' if packaged else app+'accepted-request-ledger.ts'
    qu=pkg+'execution/request-queue.ts' if packaged else app+'workspace-request-queue.ts'
    configs={
      'accept': ('execution' if n>=147 else 'shell',ex,r'const existing = ',4,47),
      'worker': ('worker' if n>=145 else 'shell',wo,r'^  execute\(' if n>=145 else r'const ready = await generation.ready',2,35),
      'seal': ('execution' if n>=147 else 'shell',ex,r'await (spool|completion)\.finish',5,19),
      'terminal': ('ledger',le,r'^  complete\(',2,15),
      'stream': ('delivery' if n>=146 else 'shell',de,r'  trackedCompletion\(' if n>=146 else r'private trackCompletionDelivery\(',2,18),
      'sample': ('execution' if n>=147 else 'shell',ex,r'private scheduleTurnCompleteResourceSample\(',5,18),
      'next': ('queue',qu,r'private async run\(',2,38),
      'cleanup': ('delivery' if n>=146 else 'shell',de,r'await spool.acknowledge\(',7,22),
      'ack': ('delivery' if n>=146 else 'shell',de,r'(acceptedRequests|options.journal).acknowledge\(',6,16),
    }
    row['package']='@symnav/daemon' if packaged else 'apps/cli'
    row['label']='main' if n==0 else '#'+str(n)
    for b in boundaries:
        owner,path,pat,bef,aft=configs[b['id']]
        refs=[excerpt(sha,path,pat,bef,aft)]
        if b['id'] in ('terminal','stream'):
            refs.append(excerpt(sha,ex,r'await this\.(options.delivery.trackedCompletion|completionDeliveries.get|deliverySession.trackedCompletion)',7,9))
        if b['id']=='sample': refs.append(excerpt(sha,qu,r'private async runScheduledBoundary\(',1,18))
        if b['id']=='next': refs.append(excerpt(sha,ex,r'if \((!workspaceExists|workspaceDeleted)\)',3,10))
        if b['id']=='accept': refs.append(excerpt(sha,le,r'  accept\(',2,45))
        cells.append(dict(id=f'{n}-{b["id"]}',pr=n,boundary=b['id'],owner=owner,package=row['package'],refs=refs))

supplements=[]
for pr in [132,145,146,147,148,149]:
    p=next(p for p in bundle['pullRequests'] if p['number']==pr)
    raw=p['body']
    key='pr-'+str(pr)
    sources[key]=dict(id=key,sha=p['commits'][-1]['sha'],path=f'Supplied PR #{pr} body',hash=hashlib.sha256(raw.encode()).hexdigest(),text=raw)

# Read the active entry separately: package copies in #148 are not a consumer cutover.
for pr in [148,149]:
    sha=next(r['sha'] for r in rows if r['number']==pr)
    supplements.append(dict(id='entry-'+str(pr), refs=[excerpt(sha,'apps/cli/src/cli.ts',r'(DaemonClient|DaemonCommandDispatcher|DaemonDispatcher|CliInvocationCoordinator)',3,16)]))
supplements.append(dict(id='entry-149-host',refs=[excerpt(bundle['head'],'apps/cli/src/program.ts',r'const daemonClient = new DaemonClient',4,14)]))
base148=next(r['sha'] for r in rows if r['number']==147)
head148=next(r['sha'] for r in rows if r['number']==148)
patch=git('diff','-M',base148,head148,'--','apps/cli/src/daemon/daemon-navigation-worker.test.ts','packages/daemon/src/worker/navigation-worker.test.ts')
(OUT/'evidence/readiness-test.patch').write_text(patch)
key='readiness-diff'
sources[key]=dict(id=key,sha=head148,path='PR #148 · worker readiness test diff',hash=hashlib.sha256(patch.encode()).hexdigest(),text=patch)
supplements.append(dict(id='test', refs=[dict(source=key,start=37,end=91,anchor=37)]))

# Supplemental source confirms the workspace-deletion qualification and active imports.
for path in ['packages/daemon/src/process/process-coordinator.ts','apps/cli/src/cli-invocation-coordinator.ts','packages/daemon/src/lifecycle/daemon-lifetime.ts','plans/005/daemon-architecture-functional-spec.md','plans/005/daemon-follow-ups-functional-spec.md']:
    capture(bundle['head'],path)

data=dict(base=bundle['base'],head=bundle['head'],rows=rows,boundaries=boundaries,owners=owners,cells=cells,sources=sources,supplements=supplements,
 limits='Nine successful-turn/ACK boundaries, surveyed at main and all 26 PR heads. Active source ownership, not whole-stack behavior parity. The 26 PR titles supply chronology; unrelated changes are outside this lens. Missing rationale means not found in the inspected supplied prose, not that nobody ever had one.')
(OUT/'evidence/field.json').write_text(json.dumps(data,indent=2))
(OUT/'data.js').write_text('window.FIELD='+json.dumps(data,separators=(',',':'))+';\n')

dest=OUT/'evidence/source'; dest.mkdir(exist_ok=True)
for key,s in sources.items():
    text='\n'.join(f'<span id="L{i}"><a href="#L{i}">{i:4}</a> {html.escape(line)}</span>' for i,line in enumerate(s['text'].splitlines(),1))
    (dest/(key+'.html')).write_text('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>'+html.escape(s['path'])+'</title><style>body{background:#11171c;color:#d6dedb;font:13px/1.6 monospace;margin:24px}h1{font:18px system-ui;overflow-wrap:anywhere}a{color:#9bbcb0}pre{tab-size:2}pre span{display:block;scroll-margin-top:20px}pre span:target{background:#3b493d}pre a{text-decoration:none;color:#738c82}</style><p><a href="../../index.html">← Return to field</a></p><h1>'+html.escape(s['path'])+'</h1><p>'+s['sha']+' · SHA-256 '+s['hash']+'</p><pre>'+text+'</pre>')

manifest=dict(rows=len(rows),cells=len(cells),sourceDocuments=len(sources),base=bundle['base'],head=bundle['head'],pins=[{'pr':r['number'],'sha':r['sha']} for r in rows])
(OUT/'evidence/capture.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({k:v for k,v in manifest.items() if k!='pins'}))
