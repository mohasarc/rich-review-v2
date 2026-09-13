#!/usr/bin/env python3
"""Build an offline page; --capture reads pinned git objects into this folder."""
import argparse, hashlib, html, json, re, subprocess
from pathlib import Path
from content import EPISODES, SOURCES

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
E = HERE / 'evidence'
H = html.escape
BUNDLE = json.loads((E/'pr.json').read_text())
PRS = {p['number']:p for p in BUNDLE['pullRequests']}
REVISIONS = {'main':BUNDLE['base'], 'tip':BUNDLE['head'], **{str(n):p['commits'][-1]['sha'] for n,p in PRS.items()}}

PARENTS = {
 123:['S1','S1','S1'],124:['S2','S2','S2','S5','S5'],126:['S3','S3','S3','S3','S3'],
 127:['T1','T2','T3','T3'],128:['T5','T5','T5','T5','T5'],129:['H3','H3','H3','H5'],
 130:['P1','P1','P1','P1','P1'],131:['P1','P2','P9','P7'],132:['H5','H5','H1','H1','H1'],
 133:['P6','P6','P6','P6'],134:['P5','P5','P5','P5'],135:['H2','H2','H2','H2','H2'],
 136:['H5','H4'],137:['W3','W1','W1','W4','W1'],138:['R4','R1','R1','R1','R4'],
 139:['W2','W2','W4','W5'],140:['W3','W3','W3','W3','W5'],141:['W4','W4','W2','W4'],
 142:['R2','R2','R2','R4','R3'],143:['W5','W5','W5','W5'],144:['Q5','Q5','Q5','Q5','Q5'],
 145:['Q3','Q3','Q3','Q3','Q3'],146:['D1','D3','D1','D4','D3'],
 147:['Q1','Q2','Q2','Q2','Q1'],148:['O2','O3','O1','O11','O11'],
 149:['O1','O6','O8','O1','O5']
}

def git(*args):
    return subprocess.check_output(['git','-C',str(ROOT/'worktrees/stack-head'),*args],text=True)

def capture():
    docs={}
    for key,value in SOURCES.items():
        version,p = value if isinstance(value,tuple) else ('tip',value)
        text=git('show',f'{REVISIONS[version]}:{p}')
        docs[key]=dict(path=p,revision=REVISIONS[version],version=version,text=text,sha256=hashlib.sha256(text.encode()).hexdigest())
    (E/'sources.json').write_text(json.dumps(docs,indent=2)+'\n')
    # Pin historical retirement context and the complete six-file #127 delta.
    p127=PRS[127]['commits'][-1]['sha']
    first=PRS[127]['commits'][0]['sha']
    parent=git('rev-parse',first+'^').strip()
    (E/'pr-127.patch').write_text(git('diff',parent,p127))
    inventory=git('diff','--find-renames','--find-copies','--find-copies-harder','--numstat',BUNDLE['base'],BUNDLE['head'])
    (E/'files.tsv').write_text(inventory)
    (E/'capture.json').write_text(json.dumps({'base':BUNDLE['base'],'head':BUNDLE['head'],'sources':len(docs),'pr127Base':parent,'pr127Head':p127,'worktreeStatus':{'main':subprocess.check_output(['git','-C',str(ROOT/'worktrees/main'),'status','--porcelain'],text=True),'tip':git('status','--porcelain')}},indent=2)+'\n')

parser=argparse.ArgumentParser()
parser.add_argument('--capture',action='store_true')
if parser.parse_args().capture:
    capture()
DOCS=json.loads((E/'sources.json').read_text())
REC=json.loads((E/'recordings.json').read_text())['scenarios']

def md(s):
    s=H(s)
    return re.sub(r'`([^`]+)`',r'<code>\1</code>',s)

def link_source(key,label=None,line=None):
    return f'<a class="source-link" href="sources/{key}.html'+(f'#L{line}' if line else '')+f'" target="_blank" rel="noopener">{H(label or key)} ↗</a>'

def table(headers, rows, cls=''):
    return '<div class="table-scroll"><table class="'+cls+'"><thead><tr>'+''.join('<th scope="col">'+md(v)+'</th>' for v in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+md(str(v))+'</td>' for v in row)+'</tr>' for row in rows)+'</tbody></table></div>'

def board(items, cls=''):
    return '<div class="board '+cls+'">'+''.join(f'<div class="cell"><small>{H(str(label))}</small><strong>{H(str(value))}</strong></div>' for label,value in items)+'</div>'

def recorded_table(name,headers,rows):
    return '<div class="record"><span class="eyebrow">Recorded source execution · '+H(name)+'</span>'+table(headers,rows)+'</div>'

def scene_steps(identifier, steps, note):
    out=f'<div class="stepper" data-stepper="{identifier}"><p class="caption">{H(note)} Select a checkpoint; this replays the explanation, not a running daemon.</p><div class="step-buttons" role="group" aria-label="{identifier} checkpoints">'
    for i,(title,_,_) in enumerate(steps):
        out+=f'<button type="button" data-step="{i}" aria-pressed="{str(i==0).lower()}">{i+1}. {H(title)}</button>'
    out+='</div><div class="step-panels">'
    for i,(title,items,text) in enumerate(steps):
        out+=f'<div class="step-panel" data-panel="{i}"><h4>{i+1}. {H(title)}</h4>{board(items)}<p>{H(text)}</p></div>'
    return out+'</div></div>'

def example(ep):
    id=ep['id']
    if id=='host':
        result=scene_steps(id,[
          ('Read syntax',[('argv[0]','refs'),('argv[1]','def'),('operational identity','refs')],'The target looks like another command; the selector keeps refs as commandName.'),
          ('Cross the package boundary',[('CLI supplies','root + argv + commandName'),('Daemon supplies','route + machinery'),('Host supplies to worker','absolute executor module URL')],'The daemon can execute the host program without importing its parser or its language backend.'),
          ('Return through the host',[('executor output','ordered stdout / stderr bytes'),('lifecycle control','structured start/status/stop report'),('renderer → CLI','formatted report → write')],'Byte framing and sequencing belong to worker/transport. Lifecycle formatting has its own renderer boundary.')
        ],'Checkpoint 1 uses the real selector below. Checkpoints 2–3 are a simplified source-traced handoff; no worker is launched.')
        result+=recorded_table('CLI selector, tip',['Input argv','Route','Command / action'],[( ' '.join(x['argv']),x['selected']['route']['kind'],x['selected']['route'].get('commandName',x['selected']['route'].get('action'))) for x in REC['host']])
    elif id=='state':
        result=scene_steps(id,[
          ('Read both files',[('source bytes','a@1 · b@1'),('prepared index','a@1 · b@1'),('underlying reads','2')],'Two different owners can retain information about the same files.'),
          ('Select only a',[('source byte snapshot','a only'),('prepared index after a@2','a@2 · b@1'),('read omitted b again','another underlying read')],'A source snapshot replaces coverage. A selection transaction overlays prepared state. Those rules were preserved, not unified.'),
          ('Reject a candidate',[('attempt','a@3 omitted by adapter'),('portable published index','a@2 · b@1'),('adapter calls','prepare → rollback')],'Validation prevents publication of this malformed candidate. It does not rewind all owners in an entire backend refresh.'),
          ('Choose a primary project',[('configured owners of a','Project A, then Project B'),('all owners','[A, B]'),('primary owner','B')],'The real core graph with two tiny injected configurations selects B as primary. This diagram shortens their configuration paths; all owners retain order. Unowned files use the inferred project.')
        ],'Selected file names and the project diagram are simplified. Source-read counts, portable publication and two-config ownership are recorded below using controlled filesystem/language collaborators.')
        result+=recorded_table('main and tip source-cache implementations, fake filesystem',['Checkpoint','main reads','tip reads'],[(a['at'],a['reads'],b['reads']) for a,b in zip(REC['source']['main'],REC['source']['tip'])])
        result+=recorded_table('tip RevisionedBackendState, tiny injected language adapter',['Checkpoint','Published files','Adapter calls'],[(x['at'],', '.join(x['files']),' → '.join(x['events'])) for x in REC['publication']])
        result+=recorded_table('tip ProjectGraph, two injected configurations',['All owners in order','Primary owner'],[(' → '.join(REC['owners']['all']),REC['owners']['primary'])])
    elif id=='turn':
        result=scene_steps(id,[
          ('Within a turn',[('scope / owner','one service instance'),('independent stores','defs · refs · target · callers · callees · positions'),('same key twice','factory runs once')],'The core scope clears; TypeScript still supplies the keys, algorithms and query projections.'),
          ('Refresh boundary',[('successful refresh','clear all six; new turn'),('failed refresh','keep semantic turn'),('workspace session','still alive')],'A successful unchanged refresh also begins a new turn. A failed refresh is not whole-system rollback.'),
          ('Hold project cleanup',[('clear operation','synchronous'),('main backend release','fulfilled'),('tip backend release','pending')],'Recorded with an injected asynchronous project release. The backend now waits for the project promise.'),
          ('Fulfill cleanup',[('main backend release','fulfilled'),('tip backend release','fulfilled'),('session / handles','reusable')],'An existing promise is not cancelled by cache reset. A later session release can call all backends again.')
        ],'The six-store rack is a simplified ownership picture. The held-release checkpoints use real main/tip backends with a deferred project collaborator; concrete TypeScript cleanup is synchronous.')
        result+=recorded_table('main/tip backend release',['Checkpoint','main','tip'],[(a['at'],a['backendRelease'],b['backendRelease']) for a,b in zip(REC['release']['main'],REC['release']['tip'])])
        result+=recorded_table('tip generic cache, same handle',['Checkpoint','Factory calls'],[(a['at'],a['factories']) for a in REC['cache']])
    elif id=='policy':
        p=REC['policy']['values']['resources']
        result=scene_steps(id,[
          ('Derive once',[('effective memory','8 GiB'),('hard RSS',str(p['hardProcessRssBytes']//1024**2)+' MiB'),('worker old generation',str(p['workerMaxOldGenerationSizeMiB'])+' MiB')],'Recorded factory input: 8 GiB, no lower constrained limit. Soft/resume thresholds use 80%/70% of hard RSS, rounded in MiB.'),
          ('Carry the snapshot',[('CLI','complete frozen values'),('process entry','same serialized values'),('parent → worker','validate before creation, then pass snapshot')],'The codec round trip preserves all values in the probe. A malformed injected snapshot can fail before worker creation.'),
          ('Stop at first failure',[('authentication fails','disconnect'),('ready=false + pressure','reject not-ready'),('ready + pressure + draining','reject resource-pressure')],'Recorded guard results below use explicit contexts. Later guards cannot override an earlier answer.')
        ],'The process arrows simplify the source path; only policy derivation/round-trip and guard decisions are executed here.')
        result+=recorded_table('tip admission policy, controlled contexts',['Context','Decision'],[(x['at'],json.dumps(x['result'])) for x in REC['admission']])
        lines=DOCS['policy-plan']['text'].splitlines()
        policy_rows=[]
        for line in lines:
            if line.startswith('| `') and len(line.split('|'))==7: policy_rows.append([s.strip() for s in line.split('|')[1:-1]])
        result+='<details class="source-disclosure"><summary>Exact values and stated purposes for the seven policy families</summary><p>The record explains each purpose. It does not demonstrate that the exact numeric selection is optimal.</p>'+table(['Policy / recipe','Default','Consumer','Stated purpose','Named oracle'],policy_rows)+'</details>'
    elif id=='wire':
        result=scene_steps(id,[
          ('Partial prefix',[('bytes received','2 of 4 prefix bytes'),('decoder output','0 frames'),('socket','one connection')],'The decoder buffers; it cannot emit a partial request.'),
          ('Partial body',[('prefix','complete'),('JSON body','incomplete'),('decoder output','0 frames')],'Framing waits for the declared byte count; a complete prefix alone is not a complete message.'),
          ('Whole frame',[('JSON body','complete'),('decoder output','1 frame'),('next owner','semantic / correlation validator')],'The probe emits one decoded ping-shaped object. It does not authenticate a peer or submit a real ping.'),
          ('Different lifetimes',[('socket','pull reads / ordered writes'),('bounded lifecycle exchange','validator + timeout + cleanup'),('accepted execution','result recovery state machine')],'Simplified source trace: response purpose, not only request kind, selects the deadline. Each inbound connection owns its own chains.')
        ],'The first three checkpoints execute the tip codec on fragments of one encoded object. The final ownership view is source-traced; no sockets are opened.')
        result+=recorded_table('tip wire codec',['Input fragment','Frames emitted'],[(x['at'],x['emitted']) for x in REC['wire']])
    elif id=='recovery':
        result=scene_steps(id,[
          ('Append is held',[('request / transfer','Q42 / T1'),('received record','0'),('durable nextOffset','0')],'The injected output sink has not fulfilled append. The receiver does not move its cursor.'),
          ('Append fulfills',[('capture','record 0 stored'),('durable nextOffset','1'),('same request','Q42')],'The real receiver advances by one record after append completes.'),
          ('Fetch reconnects',[('receiver / capture','same'),('wire decoder','fresh'),('resume point','record 1')],'The receiver still expects T1’s same manifest. Fetch retains the current attempt’s capture and digest state.'),
          ('Execute reattaches',[('request identity','same Q42'),('capture','new'),('fetch allowance','new per-attempt counter')],'Simplified source trace, not a socket recording: eligible accepted-close recovery can reattach identity; it cannot locally replay accepted work.')
        ],'The first three cursor checkpoints use the real tip receiver with a held output append and controlled manifest. No digest finish, file durability or reconnecting socket is exercised. The reattachment checkpoint is source-traced.')
        result+=recorded_table('tip result receiver',['Checkpoint','Next record'],[(x['at'],x['nextOffset']) for x in REC['receiver']])
        result+=table(['Boundary','Identity retained','Capture retained','Budget'],[['result-fetch','Q42 + T1','yes','within this execute attempt'],['execute reattachment','Q42 + compatible command/request','no','outer reattachment; fresh inner allowance'],['local fallback','no accepted replay','not applicable','only retry-safe pre-completion route']])
    elif id=='queue':
        l=REC['ledger']
        result=scene_steps(id,[
          ('Accept Q42',[('ledger size',l['size']),('acceptedAt',l['acceptedAt']),('queuePosition',l['queuePosition'])],'A controlled wall clock supplies 100. This is ledger metadata, not elapsed milliseconds on a process trace.'),
          ('Attach Q42 again',[('exact entry object reused',str(l['sameEntry']).lower()),('total clock reads',l['clockReads']),('same argv, different command',l['changedCommand'])],'Recorded ledger behavior. Execution-session source adds the no-new-turn/no-new-trace/no-idle-reset consequence.'),
          ('Hold the turn',[('worker result','finished'),('captured attached stream','pending'),('next queued request','waiting')],'The real execution session and FIFO queue remain on Q42 while the injected delivery promise is pending.'),
          ('At the boundary',[('captured stream','settled'),('resource sample','before next FIFO turn'),('Q43','runs after sample, without ordinary ACK')],'The recorded queue calls Q43 only after the held resource sample fulfills. Worker replacement/activity remain source-traced; the resource owner decides whether replacement is needed.')
        ],'Ledger uses a controlled clock/request. ExecutionSession and FIFO run with separate held delivery and resource-sampling ports and an immediate fake worker. No socket, ordinary ACK or real worker-generation run is claimed.')
        result+=recorded_table('tip accepted-request ledger',['Observation','Value'],[(k,v) for k,v in l.items()])
        result+=recorded_table('tip execution session + FIFO, held stream/sample ports',['Checkpoint','Events','Active','Queued'],[(x['at'],' → '.join(x['events']),x['active'],x['queued']) for x in REC['queue']])
        result+=board([('package boundary','CLI process coordination → daemon package'),('worker thread boundary','executor bytes / readiness / heap reports'),('state ownership','ledger ≠ queue ≠ worker ≠ resource policy')])
    elif id=='delivery':
        result=scene_steps(id,[
          ('Worker completes',[('ledger','completed'),('stored bytes','retained'),('attached stream','may still be pending')],'Illustrative source state: completion publication notifies attachments; it is not yet a normal ACK barrier.'),
          ('Stream settles',[('captured promise','done'),('next FIFO turn','after resource sample'),('ordinary ACK','may still be pending')],'Execution awaits one captured latest attachment promise. A future fetch cannot retroactively extend it.'),
          ('A valid ACK arrives',[('physical cleanup','attempted → fails'),('diagnostic','completion-cleanup'),('journal + response','acknowledged + result-acknowledged')],'Recorded tip delivery-session result with a spool collaborator that throws during cleanup. The logical ACK still succeeds.'),
          ('Trace is gone',[('trace handle','ignores late events'),('spool retention','separate'),('shutdown / deletion','explicit bounded ACK wait')],'Simplified source trace. Diagnostic retention is not result eviction; those policies are deliberately separate.')
        ],'Only checkpoint 3 executes a delivery session here. Other gate/retention states are source-traced and have no elapsed-time scale.')
        d=REC['delivery']
        result+=recorded_table('tip delivery session; injected cleanup failure',['Event','Observed'],[['event order',' → '.join(d['events'])],['journal acknowledged',d['logicalAcknowledgement']],['reply',d['response']]])
    else:
        result=scene_steps(id,[
          ('main',[('CLI production','owns daemon mechanisms'),('daemon package','absent'),('external tests','app-local internals / raw files')],'The daemon process and worker thread already exist; this stack does not invent warm execution.'),
          ('#148 stages',[('CLI production','frozen compatibility graph'),('daemon package','mechanisms + DaemonClient'),('switch active CLI?','not yet')],'The package can compose its own machinery, while the shipped CLI still reaches its app copies.'),
          ('#149 switches',[('CLI production','public DaemonClient'),('daemon package','sole mechanism owner'),('external tests','/testing inspector or public behavior')],'The invocation coordinator is host code. The package owns launch/registry/transport/process/worker/execution/delivery/resource/lifetime mechanisms.'),
          ('Inspect a diagnostic',[('raw malformed line','can be skipped'),('inspector result','parsed event JSON'),('test observation','parsed absence ≠ raw-byte absence')],'A simplified consequence of the real inspector and test diff, not a recorded storage run. Read-only access narrows what external tests can observe.')
        ],'All checkpoints are source-traced package/observation diagrams, not measured production executions.')
        result+=table(['Final import edge','Meaning'],[['CLI → daemon/core/TypeScript/renderer/telemetry','composition'],['TypeScript → core','portable backend/session primitives'],['renderer → core + daemon','navigation and lifecycle reports'],['daemon/core/telemetry → no internal package','independent leaves'],['tests → daemon/testing','read-only observations, no storage mutation authority']])
        removed=json.loads((E/'test-title-delta.json').read_text())
        rows=[]
        for x in removed:
            if '/test/e2e/daemon/status.test.ts' in x['file'] or '/test/e2e/daemon/stop.test.ts' in x['file']:
                rows.extend([['status' if '/status.test' in x['file'] else 'stop',n] for n in x['removed_names']])
        result+='<details class="source-disclosure"><summary>The seven status and three stop scenarios removed from the CLI suites</summary><p>These are removed observations at this boundary. Some related cases exist package-local; that does not make them the same CLI witnesses.</p>'+table(['CLI suite','Removed scenario'],rows)+'</details>'
    return result

MARKERS={
 'source-cache':'  refresh(', 'revision':'  async refresh(', 'project-graph':'  private static buildOwnership',
 'backend':'  async refresh(', 'backend-main':'  async releaseTransientResources', 'session':'  openWorkspace(',
 'scope':'  getOrCreate(', 'queries':'  async releaseTransientResources', 'receiver':'  async acceptChunk(',
 'execution-client':'  private async completeWithReattachments(', 'accepted-session':'            await completion.finish',
 'delivery':'  async acknowledge(', 'client':'  constructor(options:', 'client-runtime':'  async execute(',
 'admission':'export class DaemonAdmissionPolicy', 'generations':'  private async replaceGeneration(',
 'registry':'  private startupOwnershipMatches(', 'inspector':'  private static diagnosticEventsFrom(',
 'worker':'  constructor(options:', 'ledger':'  accept(', 'codec':'  controlDecoder(', 'activity':'  static project(',
 'policy':'  static fromSystemMemory(', 'transport-helper':'    const options = policyOrOptions;',
 'process':'  private async handle(', 'state-directory':'  resolve(', 'coordinator':'  async execute('
}

def excerpt(key):
    doc=DOCS[key];lines=doc['text'].splitlines();marker=MARKERS.get(key)
    start=next((i for i,l in enumerate(lines) if marker and marker in l),0)
    excerpt=lines[start:start+32]
    numbered='\n'.join(f'{start+i+1:4}  {line}' for i,line in enumerate(excerpt))
    return f'<details class="source-disclosure"><summary>{H(key)} <span>{H(doc["path"])}</span></summary><p>{H(doc["version"])} · {doc["revision"][:12]} · lines {start+1}–{start+len(excerpt)} · {link_source(key,"Full pinned file",start+1)}</p><pre><code>{H(numbered)}</code></pre></details>'

def original_decisions(ep):
    out='<details class="source-disclosure rationale"><summary>Exact author decisions behind these fronts <span>PR bodies, mapped to the same consequences</span></summary>'
    for n in ep['prs']:
        body=PRS[n]['body'];m=re.search(r'## Decisions\n(.*?)(?=\n## |\Z)',body,re.S)
        bullets=re.findall(r'^- (.*)',m[1],re.M)
        assert len(bullets)==len(PARENTS[n]),n
        out+=f'<h4>#{n} · {H(PRS[n]["title"])}</h4><ul>'
        for j,(bullet,parent) in enumerate(zip(bullets,PARENTS[n])):
            out+=f'<li id="pr-{n}-d{j+1}" data-parent="{parent}"><a data-jump href="#{parent}">{parent} ↑</a> <b class="status stated">stated</b> {md(bullet)}</li>'
        out+='</ul>'+f'<a href="sources/pr-{n}.html" target="_blank" rel="noopener">Full pinned PR body and commits ↗</a>'
    return out+'</details>'

def episode(ep):
    eid=ep['id'];out=f'<section class="episode" id="{eid}" aria-labelledby="title-{eid}"><header class="episode-title"><span class="number">{ep["n"]}</span><div><span class="eyebrow">'+', '.join('#'+str(n) for n in ep['prs'])+f'</span><h2 id="title-{eid}">{H(ep["title"])}</h2></div><a class="map-return" data-jump href="#map">Map ↑</a></header>'
    out+=f'<p class="takeaway">{H(ep["takeaway"])}</p><figure class="ownership-pair"><div><figcaption>Before / earlier owner</figcaption>'+''.join(f'<a data-jump href="#example-{eid}" class="owner before">{H(x)}</a>' for x in ep['before'])+'</div><div class="movement" aria-hidden="true">→</div><div><figcaption>After / final owner</figcaption>'+''.join(f'<a data-jump href="#example-{eid}" class="owner after">{H(x)}</a>' for x in ep['after'])+'</div></figure><p class="caption">Simplified ownership diagram. Boxes group responsibilities; arrows show the changed ownership, not new processes.</p>'
    out+='<div class="front"><h3>Choices and consequences to keep</h3>'
    for did,statement,status,reason,source in ep['extras']:
        out+=f'<article class="decision" id="{did}" data-decision><a class="decision-key" data-jump href="#example-{eid}">{did} ↓</a><div><p>{md(statement)}</p><p class="reason"><span class="status {status}">{status}</span> {md(reason)} {link_source(source,"Source")}</p></div></article>'
    out+='</div>'
    out+=f'<div class="prediction"><span class="eyebrow">Try one prediction</span><p>{H(ep["question"])}</p><details><summary>Reveal the consequence</summary><p>{H(ep["answer"])}</p></details></div>'
    out+=f'<details class="example" id="example-{eid}"><summary><span><b>Work through one small example</b><small>Same choices · concrete states · source underneath</small></span><span aria-hidden="true">＋</span></summary><div class="example-body">{example(ep)}'
    out+='<h3>Read across the boundary</h3><nav class="related" aria-label="Related examples">'+''.join(f'<a data-jump href="#{target}">{H(question)} <span>→</span></a>' for target,question in ep['links'])+'</nav>'
    out+='<h3>Evidence for the same choices</h3><p class="caption">Source excerpts add implementation fidelity. “Stated” attaches to the reason recorded, not to a correctness verdict. Full files open in a separate tab; this reading position stays here.</p>'
    out+=original_decisions(ep)+''.join(excerpt(key) for key in ep['sources'])
    out+=f'<a class="return-reading" href="#{eid}" data-back>↑ Return to where I was reading</a></div></details></section>'
    return out

def write_source_pages():
    dest=HERE/'sources';dest.mkdir(exist_ok=True)
    for key,doc in DOCS.items():
        lines=''.join(f'<span class="line" id="L{i}"><a href="#L{i}">{i}</a> {H(line)}</span>\n' for i,line in enumerate(doc['text'].splitlines(),1))
        blocks=re.split(r'(?=^diff --git )',(E/'copy-aware.patch').read_text(),flags=re.M)
        matching=[b for b in blocks if b and any(p in b.splitlines()[0].split()[2:] for p in ['a/'+doc['path'],'b/'+doc['path']])]
        diff=''
        if matching:
            diff=f'<details class="source-disclosure"><summary>Net main → tip change touching this path (copy-aware)</summary><p>This is the net delta, including moves/copies. A historical source snapshot above may precede the final change below.</p><pre class="pr-source">{H(chr(10).join(matching))}</pre></details>'
        (dest/(key+'.html')).write_text(f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{H(key)} · pinned source</title><link rel="stylesheet" href="../style.css"><body class="source-page"><main><a href="../index.html#provenance">← Page provenance</a><h1>{H(key)}</h1><p>{H(doc["path"])}<br>{doc["revision"]} · {H(doc["version"])}<br>SHA-256 {doc["sha256"]}</p><pre class="source-code">{lines}</pre>{diff}</main></body></html>')
    for n,p in PRS.items():
        txt=p['body']+'\n\nCOMMIT MESSAGES\n\n'+'\n\n'.join(c['sha']+'\n'+c['subject']+'\n'+c['body'] for c in p['commits'])
        (dest/f'pr-{n}.html').write_text(f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PR {n} · supplied record</title><link rel="stylesheet" href="../style.css"><body class="source-page"><main><a href="../index.html#provenance">← Page provenance</a><h1>#{n} · {H(p["title"])}</h1><p>Supplied bundle, frozen with this experiment. The original Markdown is preserved below.</p><pre class="pr-source">{H(txt)}</pre></main></body></html>')

page=(HERE/'template.html').read_text()
page=page.replace('{{MAP}}',''.join(f'<a data-jump href="#{e["id"]}"><span>{e["n"]}</span><b>{H(e["short"])}</b><small>{H(e["takeaway"])}</small></a>' for e in EPISODES))
page=page.replace('{{EPISODES}}',''.join(episode(e) for e in EPISODES))
page=page.replace('{{DECISION_COUNT}}',str(sum(len(e['extras']) for e in EPISODES)))
page=page.replace('{{SOURCE_INDEX}}',''.join('<li>'+link_source(k, f'{d["version"]} · {d["path"]}')+'</li>' for k,d in DOCS.items()))
(HERE/'index.html').write_text(page)
write_source_pages()
(E/'parent-map.json').write_text(json.dumps({'fronts':{e['id']:[r[0] for r in e['extras']] for e in EPISODES},'prDecisions':{str(n):v for n,v in PARENTS.items()},'examples':{e['id']:[r[0] for r in e['extras']] for e in EPISODES}},indent=2)+'\n')
print(f'Built {len(EPISODES)} linked pyramids, {sum(len(e["extras"]) for e in EPISODES)} consequence rows, 117 mapped PR decisions, {len(DOCS)} pinned source files.')
