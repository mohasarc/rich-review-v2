"""Build the wider kit trial first. Then add a compact host layout of the same text."""
from pathlib import Path
from html import escape as esc
from datetime import datetime, timezone
import argparse, hashlib, json, re
from content import DECISIONS, GROUPS
from kit.components import Box, Edge, BoxDiagram, BeforeAfter, DecisionCard, ExitLink, Layer, validate_layers

ROOT=Path(__file__).resolve().parent
MANIFEST=json.loads((ROOT/'source-manifest.json').read_text())
PRDATA=json.loads((ROOT/'evidence/pr.json').read_text())
(ROOT/'evidence/pr-body.md').write_text(PRDATA['body']+'\n')
(ROOT/'sources').mkdir(exist_ok=True)
EXCERPTS=[]
ORDER=[d for g,_ in GROUPS for d in DECISIONS if d['group']==g]

def sha(data): return hashlib.sha256(data).hexdigest()
def dump(path,obj): (ROOT/path).write_text(json.dumps(obj,indent=2,ensure_ascii=False)+'\n')
def shell(body, *, compact=False, title='PR 131 · Thresholds and recovery', links=True):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{esc(title)}</title><link rel="icon" href="data:,"><link rel="stylesheet" href="kit/review.css">
    <link rel="stylesheet" href="layout.css">{('<link rel="stylesheet" href="compact.css">' if compact else '')}
    <script src="kit/exit-link.js" defer></script></head><body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header"><span class="wordmark">PR 131 <b>THRESHOLDS & RECOVERY</b></span>
    <nav aria-label="Depth"><a href="#overview">Complete layer</a><a href="#mechanisms">Mechanisms</a><a href="#audit">Evidence scope</a></nav></header>
    <main id="main">{body}</main><footer class="site-footer">Frozen comparison b3a6c4fa → b100221d. Read-only. No network dependencies or response storage.</footer></body></html>'''

def sourcefile(side,path):
    return ROOT/'evidence'/path if side=='bundle' else ROOT/'evidence'/side/path

def source_page(side,path):
    key=side+'-'+sha(path.encode())[:12]
    file=ROOT/'sources'/(key+'.html')
    if not file.exists():
        lines=sourcefile(side,path).read_text().splitlines()
        revision=MANIFEST['revisions'].get(side,'supplied PR body')
        text=''.join(f'<span class="source-line" id="L{i}"><a href="#L{i}">{i}</a><code>{esc(s)}</code></span>' for i,s in enumerate(lines,1))
        file.write_text(f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(path)}</title><link rel="stylesheet" href="../kit/review.css"><main><h1 style="font-size:26px;margin-top:30px">{esc(path)}</h1><p>{esc(side)} · {esc(revision)}</p><p>Frozen source. Use browser Back to return to the review.</p><div class="source-code" style="max-height:none">{text}</div></main></html>')
    return 'sources/'+key+'.html'

def excerpt(spec, eid, parent):
    side,path,first,last=spec
    lines=sourcefile(side,path).read_text().splitlines()
    last=min(last,len(lines))
    assert 1<=first<=last, spec
    revision=MANIFEST['revisions'].get(side,'supplied PR body')
    content='\n'.join(lines[first-1:last])
    url=source_page(side,path)
    EXCERPTS.append(dict(id=eid,side=side,path=path,first=first,last=last,sha256=sha(content.encode()),parent=parent))
    rendered=''.join(f'<span class="source-line"><a href="{url}#L{i}">{i}</a><code>{esc(lines[i-1])}</code></span>' for i in range(first,last+1))
    return f'''<details class="source-block" id="{eid}"><summary>{esc(side)} · {esc(path)} · {first}–{last}</summary>
    <div class="source-meta">{revision} · <a href="{url}#L{first}">Open whole source at line {first}</a></div><div class="source-code">{rendered}</div></details>'''

def static_map(side):
    after=side=='after'
    return BoxDiagram(id='static-'+side,title=side.capitalize()+' value authority across packages',
        description='The daemon package owns the policy. Inside apps/cli, composition and daemon mechanisms remain separate modules. Before, mechanisms can use local defaults. After, composition passes required policy sections. No mechanism changes package in this PR.',
        width=540,height=360,
        boxes=(
            Box('pkg',12,8,516,80,'packages/daemon',('DaemonPolicy: complete immutable snapshot',),boundary=True,target='m-d01'),
            Box('cli',12,130,516,217,'apps/cli',boundary=True),
            Box('compose',28,175,216,135,'Composition',('command actions','dispatcher / process entry','project required sections' if after else 'snapshot bridge exists'),tone='changed' if after else 'neutral',target='m-d01'),
            Box('consume',310,175,199,135,'Mechanisms',('output / resources','startup / shutdown','transport / diagnostics') if after else ('output / resources','lifecycle / transport','local fallback values'),tone='changed' if after else 'removed',target='m-d09'),
        ),edges=(Edge('pkg','compose','imports / constructs','bottom','top',tone='neutral',label_at=(72,112)),
            Edge('compose','consume','required' if after else 'optional inputs','right','left',tone='changed' if after else 'removed',label_at=(243,164)),),
        lossy_note='Schematic: grouped modules and selected dependency edges. Green marks the new value route; dashed rust marks retired local authority.').render()

def runtime_map():
    return BoxDiagram(id='runtime',title='The runtime boundary stays; the enforcement source changes',
        description='The CLI client process sends socket requests to the daemon process. Inside the daemon process a parent coordinates a worker thread and completion spool. Worker messages carry output back to the parent; the socket transfers results to the client. Serialized policy already crossed both boundaries. New policy-derived caps apply inside these existing boxes; parent policy parsing now happens before Worker construction.',
        width=1100,height=325,
        boxes=(
            Box('client',12,12,285,297,'CLI CLIENT PROCESS',boundary=True),
            Box('transport',28,67,253,203,'Local transport',('admission / response timers','outer execution reattachment','per-attempt fetch resume','capture / frame capacities'),tone='changed',target='m-d05'),
            Box('daemon',475,12,613,297,'DAEMON PROCESS',boundary=True),
            Box('parent',491,68,257,202,'Parent + completion spool',('startup / lifetime / resources','diagnostics / acknowledgement','parse policy before Worker','spool / result capacities'),tone='changed',target='m-d10'),
            Box('worker',825,60,247,225,'WORKER THREAD',boundary=True),
            Box('work',841,106,215,161,'Navigation + capture',('chunk validation','output acknowledgement','heap high-water sample'),tone='changed',target='m-d12'),
        ),edges=(
            Edge('transport','parent','existing local socket','right','left',label_at=(309,152)),
            Edge('parent','work','messages','right','left',label_at=(756,180)),
        ),lossy_note='Schematic: the arrows stand for bidirectional exchanges. The worker is a thread inside the daemon process. Green means new policy consumption, not a new process or worker boundary.').render()

def overview():
    intro='''<section class="hero" id="overview"><p class="eyebrow">One frozen change · 60 files · required policy inputs</p>
    <h1>One set of limits.<br>Several different boundaries.</h1>
    <div class="intuition"><span>Snapshot already exists</span><b aria-hidden="true">→</b><span>Composition projects values</span><b aria-hidden="true">→</b><span>Consumers enforce them</span></div>
    <p class="legend">Lossy orientation: this route compresses many consumers. The complete layer below also includes recovery behavior, changed test premises and reporting.</p>
    <p class="context">Symnav answers code-navigation requests. A command-line client can talk to a retained workspace daemon, whose worker performs navigation. “Spool” means retained command output, held in memory or a file until delivery/cleanup.</p></section>
    <section id="maps"><h2>The code’s home and the running system</h2>'''
    maps=BeforeAfter('static-maps','Value authority before and after',static_map('before'),static_map('after')).render()+runtime_map()+'</section>'
    parts=['<section id="decisions"><p class="eyebrow">Complete stopping layer</p><h2>What the change asks you to carry</h2><p class="context">Every decision and consequential qualification is visible here. “Unexplained” means no separate reason found in the supplied PR body/commits and the pinned policy and architecture plans; it does not mean the change was hidden. Follow any card to compare the mechanism and source.</p>']
    for group,title in GROUPS:
        parts.append(f'<section class="root-group" id="g-{group}"><h3 class="group-heading">{esc(title)}</h3><div class="decision-grid root-register">')
        for d in ORDER:
            if d['group']!=group: continue
            parts.append(DecisionCard(id=d['id'],number=d['id'].upper(),title=d['title'],choice=d['choice'],status=d['status'],reason=d['reason'],target='m-'+d['id'],reason_target='reason-'+d['id'] if d['reason_source'] else None).render())
        parts.append('</div></section>')
    parts.append('''</section><div class="stop-line" id="stop"><div><strong>You can stop here.</strong><p>The layer above includes the boundaries, choices, test changes and reason gaps. Below, the same propositions get concrete paths and source.</p></div><a class="rk-exit" href="#mechanisms">Keep going →</a></div>''')
    return intro+maps+''.join(parts)

def cases():
    return '''<section class="depth-section" id="worked-cases"><div class="depth-header"><h2>Two cases the owner diagram cannot answer</h2><a href="#stop" data-return>← Complete layer</a></div>
    <p class="legend">Illustrative source-derived traces, not fresh executions. Each row uses the same named request A; no fixture or object-identity recording is imported from 40.</p>
    <div class="data-table-wrap"><table><caption>One accepted request, two execute attempts · D05–D07</caption><thead><tr><th>Event</th><th>Outer reattachments used</th><th>Current attempt’s fetches</th><th>Consequence</th></tr></thead><tbody>
    <tr><td>Attempt 1 accepts A; connection closes before a manifest</td><td>0 → 1</td><td>0</td><td>Open attempt 2 for A using the default outer allowance.</td></tr>
    <tr><td>Attempt 2 accepts A; manifest arrives, then connection closes</td><td>1</td><td>0 → 1</td><td>Fetch the missing result records using attempt 2’s own allowance.</td></tr>
    <tr><td>That fetch ends with a non-retryable protocol error</td><td>1</td><td>1</td><td>The attempt fails. Raising its numeric fetch limit does not add another fetch loop. Head can expose this later error; base selected the original accepted-close error.</td></tr>
    </tbody></table></div>
    <div class="data-table-wrap"><table><caption>A constructor argument is not a storage state · D17–D19, D21</caption><thead><tr><th>Same apparent request</th><th>Actual policy/stimulus</th><th>What follows</th></tr></thead><tbody>
    <tr><td>Transport helper: inline zero, one 64 KiB record</td><td>Inline is raised to 64 KiB</td><td>The record fits inline. An empty directory afterward is consistent with never making a file.</td></tr>
    <tr><td>Workspace helper: inline zero, result cap 2 bytes</td><td>Inline 1 byte; chunk 1 byte; send “x”, then “x”</td><td>The second record crosses the inline threshold. One “xx” record would exceed the chunk cap instead.</td></tr>
    </tbody></table></div></section>'''

def detail(d):
    id=d['id']; dest='m-'+id
    pair=BeforeAfter('compare-'+id,d['title'],f'<p class="mechanism-text">{esc(d["before"])}</p>',f'<p class="mechanism-text">{esc(d["after"])}</p>').render()
    evidence=''.join(excerpt(s,f'e-{id}-{i}',id) for i,s in enumerate(d['sources'],1))
    reason=''
    if d['reason_source']:
        reason=f'<section class="reason-evidence" id="reason-{id}"><div class="depth-header"><h4>Reason source · {id.upper()}</h4><a data-return href="#{id}">← Decision</a></div>'+excerpt(d['reason_source'],'e-reason-'+id,id)+'</section>'
    return f'''<section class="depth-section" id="{dest}" data-parent="{id}"><div class="depth-header"><div><p class="eyebrow">{id.upper()} · same proposition, more fidelity</p><h3>{esc(d['title'])}</h3></div><a data-return href="#{id}">← Return to {id.upper()}</a></div>{pair}
    <p class="detail-reason"><strong>Reason {d['status']}.</strong> {esc(d['reason'])}</p>{reason}{evidence}</section>'''

def audit():
    return '''<section class="depth-section" id="audit"><h2>What this account rests on</h2><p class="context">The full supplied diff and the PR body/commits were read, including all test/helper changes. Relevant surrounding source and the policy/architecture plans were read at base b3a6c4fa and head b100221d. Worktree revisions match the supplied diff. No Symnav test suite, benchmark or daemon execution was run for this artifact.</p>
    <p class="context">The source archive checks provenance. The file map records editorial coverage; it cannot establish that every semantic decision has been found. No verdict, correctness judgment or reader-comprehension score is supplied.</p>
    <p><a href="ledger.json">Shared proposition ledger</a> · <a href="coverage.json">60-file map</a> · <a href="source-manifest.json">Snapshot hashes</a> · <a href="evidence/diff.patch">Full patch</a> · <a href="evidence/pr.json">PR and commits</a></p></section>'''

def build_baseline():
    EXCERPTS.clear()
    root=overview()
    deeper='<section class="depth-band" id="mechanisms"><p class="eyebrow">Mechanisms and evidence</p><h2>Follow a consequence down</h2></section>'+cases()+''.join(detail(d) for d in ORDER)+audit()
    html=shell(root+deeper)
    (ROOT/'fuller.html').write_text(html)
    (ROOT/'shared-overview.html').write_text(root)
    (ROOT/'shared-depth.html').write_text(deeper)
    dump('ledger.json',dict(subject='pr-131',revisions=MANIFEST['revisions'],decisions=ORDER))
    dump('excerpts.json',EXCERPTS)
    validate_layers(tuple(d['id'] for d in ORDER),tuple(Layer('m-'+d['id'],(d['id'],),'overview') for d in ORDER))
    dump('pyramid-map.json',[dict(id=d['id'],overview=d['choice'],mechanism='m-'+d['id'],before=d['before'],after=d['after']) for d in ORDER])
    # File-order reread aid, not automatic extraction or semantic coverage proof.
    files=re.findall(r'^diff --git a/(.*?) b/.*$',(ROOT/'evidence/diff.patch').read_text(),re.M)
    rows=[]
    for file in files:
        explicit=[d['id'] for d in ORDER if any(s[1]==file for s in d['sources'])]
        if not explicit:
            if '/test/helpers/' in file or '.test.ts' in file:
                explicit=['d16']; basis='Test/helper import rewiring to required policy adapters; inspected in complete patch.'
            elif file.endswith('cli-program-executor.ts') or file.endswith('daemon-navigation-worker-protocol.ts'):
                explicit=['d01','d09']; basis='Production output-policy and required numeric-cap projection; inspected in complete patch.'
            else:
                raise AssertionError(('Unassigned file',file))
        else: basis='Selected excerpts plus complete file diff inspected.'
        rows.append(dict(path=file,propositions=explicit,basis=basis))
    dump('coverage.json',dict(kind='file-to-proposition reading map; not line-level or semantic completeness proof',files=rows))
    return root,deeper

def compact(root,deeper):
    (ROOT/'compact.html').write_text(shell(root+deeper,compact=True))
    # Separate study entries preserve the treatment while omitting any crossover link.
    (ROOT/'reader-a.html').write_text((ROOT/'fuller.html').read_text())
    (ROOT/'reader-b.html').write_text((ROOT/'compact.html').read_text())
    dump('pair-contract.json',dict(variable='Overview arrangement only: compact row register vs unchanged kit card register',
        root_markup_sha256=sha(root.encode()),shared_depth_sha256=sha(deeper.encode()),
        decision_order=[d['id'] for d in ORDER],fixed=['all proposition sentences','reason wording and status','order','opening and diagrams','source and mechanism exits','mechanisms and worked cases','font family','source comparison'],
        limitation='This isolates layout density; it does not test a shorter paraphrase or a measured minimum complete explanation.'))

if __name__=='__main__':
    parser=argparse.ArgumentParser(); parser.add_argument('--baseline-only',action='store_true'); args=parser.parse_args()
    root,deeper=build_baseline()
    if not args.baseline_only: compact(root,deeper)
    print(f'Built {"unchanged-kit fuller trial" if args.baseline_only else "both complete layers"}: {len(ORDER)} propositions, {len(EXCERPTS)} source excerpts.')
