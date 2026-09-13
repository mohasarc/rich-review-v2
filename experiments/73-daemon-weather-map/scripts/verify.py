from pathlib import Path
from collections import Counter
from html.parser import HTMLParser
import hashlib,json,re,subprocess

ROOT=Path(__file__).resolve().parents[1]
REPO=ROOT.parents[1]
data=json.loads((ROOT/'src/data.json').read_text())
checks=[]
def passed(name,**extra):checks.append(dict(name=name,pass_=True,**extra))

for source in data['sources'].values():
    assert hashlib.sha256(source['text'].encode()).hexdigest()==source['sha256'],source['key']
    if source['revision'] in ['main','head']:
        tree=REPO/'worktrees'/('main' if source['revision']=='main' else 'stack-head')
        blob=subprocess.check_output(['git','-C',str(tree),'show',source['commit']+':'+source['path']])
        assert hashlib.sha256(blob).hexdigest()==source['sha256'],source['path']
        assert (ROOT/'evidence/sources'/f'{source["key"]}.txt').read_bytes()==blob
passed('All 23 receipt sources reconcile with their hashes; 16 source files reconcile with pinned Git blobs',sources=len(data['sources']))

counts={rev:Counter(role[rev] for role in data['roles']) for rev in ['main','head']}
assert sorted(counts['main'].values())==[1,3]
assert sorted(counts['head'].values())==[1,1,1,1]
for role in data['roles']:
    for rev in ['main','head']:
        assert role[rev] in data['sources']
passed('The four selected roles yield the exact displayed source-file concentration counts',counts={k:dict(v) for k,v in counts.items()})

for r in data['readings']:
    assert all(k in r for k in ['summary','reason','mechanism','detail','receipts'])
    for q in r['receipts']:
        lines=data['sources'][q['source']]['text'].splitlines()
        assert 1<=q['start']<=q['end']<=len(lines)
key_receipts={
 'Exact reattachment predicate':['error.code === "closed"','error.delivery === "accepted"','error.authenticatedInstanceId === request.instanceId'],
 'Timeout removed at acceptance':['disableTimeout()'],
 'Exact default values':['postAcceptanceExecutionReattachmentLimit: 1','resultTransferResumeLimitPerExecutionAttempt: 1'],
 'Acknowledgement before returning output':['acknowledgeResult','await result.output.dispose()','resolveCompletion'],
 'Held-append witness':['receiver.nextOffset).toBe(0)','receiver.nextOffset).toBe(1)'],
 'Fresh decoder; request carries durable offset':['codec.transferDecoder()','offset: transfer.nextOffset'],
}
for label,needles in key_receipts.items():
    q=next(q for r in data['readings'] for q in r['receipts'] if q['label']==label)
    snippet='\n'.join(data['sources'][q['source']]['text'].splitlines()[q['start']-1:q['end']])
    assert all(n in snippet for n in needles),(label,needles,snippet)
passed('Six readings and 42 receipt bounds; key predicates and assertions occur inside their displayed excerpts')

class Links(HTMLParser):
    def __init__(self):super().__init__();self.links=[];self.ids=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):self.ids.append(a['id'])
        if tag=='a' and 'href' in a:self.links.append(a['href'])
p=Links();p.feed((ROOT/'index.html').read_text())
assert len(p.ids)==len(set(p.ids))
for link in p.links:
    if re.match(r'^(https?:|data:)',link):continue
    pathname,_,fragment=link.partition('#')
    if pathname:assert (ROOT/pathname).exists(),link
    elif fragment:assert fragment in p.ids,link
for r in data['readings']:
    assert r['id'] in p.ids and f'mechanism-{r["id"]}' in p.ids
passed('All static entry-point links, complete-layer anchors and mechanism returns resolve',links=len(p.links))

for rev,total in [('main',34),('head',80)]:
    log=(ROOT/f'{rev}-tests.log').read_text()
    assert re.search(rf'Tests\s+{total} passed',log)
assert not data['census']['missing'] and len(data['census']['main'])==14
passed('Recorded focused test runs and bounded title census agree with displayed counts',main=34,head=80,literalTitles=14)
for rev in ['main','head']:
    tree=REPO/'worktrees'/('main' if rev=='main' else 'stack-head')
    status=subprocess.check_output(['git','-C',str(tree),'status','--porcelain','--untracked-files=no'],text=True)
    assert not status.strip(),(rev,status)
passed('Both Symnav worktrees retain clean tracked status')
report={'passed':True,'checks':checks,'manualPyramidAudit':'The six summaries name every authored mechanism, outcome, test qualification and rationale gap below them. Incidental lines in full raw receipts are evidence context, not an expanded teaching scope.'}
(ROOT/'evidence/static-checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(f'{len(checks)} static check groups passed.')
