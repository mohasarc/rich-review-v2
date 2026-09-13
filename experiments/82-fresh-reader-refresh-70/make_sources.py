from pathlib import Path
import subprocess,json,hashlib,html,re
ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).resolve().parent/'source'
REPO=ROOT/'worktrees/stack-head'
PINS=json.loads((OUT/'pins.json').read_text())
manifest={}
def write_view(key,title,text,origin):
    raw=OUT/(key+'.txt');raw.write_text(text)
    lines='\n'.join(f'<span class="line" id="L{i}"><a href="#L{i}" aria-label="Line {i}">{i}</a> {html.escape(line)}</span>'for i,line in enumerate(text.splitlines(),1))
    page='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>'+html.escape(title)+'</title><style>body{font:16px/1.5 system-ui;margin:2rem;color:#202625}a{color:#195d75}pre{font:13px/1.6 ui-monospace,monospace;overflow:auto}.line{display:block;min-height:1.6em}.line>a{display:inline-block;width:5em;color:#667775;text-decoration:none}.line:target{background:#fff0bb}header{max-width:90ch}p{overflow-wrap:anywhere}</style><header><a href="../index.html">← Reading table</a> · <a href="../witnesses.html">Source witnesses</a><h1>'+html.escape(title)+'</h1><p>'+html.escape(origin)+'</p><p>SHA-256 '+hashlib.sha256(text.encode()).hexdigest()+'</p></header><pre>'+lines+'</pre></html>'
    (OUT/(key+'.html')).write_text(page)
    manifest[key]={'title':title,'origin':origin,'sha256':hashlib.sha256(text.encode()).hexdigest(),'lines':len(text.splitlines())}
def gitview(key,subject,side,path):
    sha=PINS[subject][side]
    s=subprocess.check_output(['git','-C',str(REPO),'show',sha+':'+path],text=True)
    write_view(key,path,s,sha+' · '+path)
for subject in PINS:
    p=ROOT/'inputs'/subject
    write_view(subject+'-diff',subject+' supplied diff',(p/'diff.patch').read_text(),str(p/'diff.patch')+' · '+PINS[subject][0]+' → '+PINS[subject][1])
    d=json.loads((p/'pr.json').read_text())
    if 'body'in d:write_view(subject+'-body',subject+' author record',d['body']+'\n\nCommit subjects and bodies\n'+'\n'.join(c['sha']+' '+c['subject']+'\n'+c['body']for c in d['commits']),str(p/'pr.json'))
subjects=json.loads((ROOT/'inputs/stack/pr.json').read_text())['pullRequests']
for number in [138,142,146,147,149]:
    d=next(x for x in subjects if x['number']==number)
    write_view('pr-'+str(number)+'-body','PR '+str(number)+' author record',d['body']+'\n\nCommit subjects and bodies\n'+'\n'.join(c['sha']+' '+c['subject']+'\n'+c['body']for c in d['commits']),str(ROOT/'inputs/stack/pr.json')+' · pull request '+str(number))
views=[
('127-tests-base','pr-127',0,'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts'),
('127-tests-head','pr-127',1,'packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts'),
('131-worker','pr-131',1,'apps/cli/src/daemon/daemon-navigation-worker.ts'),
('131-transport','pr-131',1,'apps/cli/src/daemon/local-daemon-transport.ts'),
('131-transport-base','pr-131',0,'apps/cli/src/daemon/local-daemon-transport.ts'),
('131-transport-tests','pr-131',1,'apps/cli/src/daemon/local-daemon-transport-execution.test.ts'),
('131-benchmark','pr-131',1,'apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts'),
('131-policy-tests','pr-131',1,'packages/daemon/src/daemon-policy.test.ts'),
('131-policy','pr-131',1,'packages/daemon/src/daemon-policy.ts'),
('148-policy-record-base','pr-148',0,'plans/005/daemon-policy.md'),
('148-contracts','pr-148',1,'packages/daemon/src/client/daemon-client-contracts.ts'),
('148-facade','pr-148',1,'packages/daemon/src/client/daemon-client.ts'),
('148-runtime','pr-148',1,'packages/daemon/src/client/daemon-client-runtime.ts'),
('148-coordinator','pr-148',1,'packages/daemon/src/process/process-coordinator.ts'),
('148-routing','pr-148',1,'packages/daemon/src/client/daemon-routing-policy.ts'),
('148-dispatcher-base','pr-148',0,'apps/cli/src/daemon/daemon-command-dispatcher.ts'),
('148-registry','pr-148',1,'packages/daemon/src/registry/registry.ts'),
('148-built-entry-tests','pr-148',1,'packages/daemon/test/integration/built-process-entry.test.ts'),
('tip-graph','stack',1,'packages/core/src/workspace/project-graph.ts'),
('tip-revisions','stack',1,'packages/core/src/backend/revisioned-backend-state.ts'),
('tip-ts-backend','stack',1,'packages/backend-typescript/src/typescript-backend/typescript-backend.ts'),
('tip-source-cache','stack',1,'packages/core/src/workspace/workspace-source-cache.ts'),
('tip-session','stack',1,'packages/core/src/workspace/workspace-session.ts'),
('tip-delivery','stack',1,'packages/daemon/src/delivery/delivery-session.ts'),
('tip-accepted','stack',1,'packages/daemon/src/execution/accepted-execution-session.ts'),
('tip-queue','stack',1,'packages/daemon/src/execution/request-queue.ts'),
('tip-generations','stack',1,'packages/daemon/src/worker/worker-generation-manager.ts'),
('tip-inspector','stack',1,'packages/daemon/src/testing/daemon-testing-inspector.ts'),
('tip-receiver','stack',1,'packages/daemon/src/transport/result-transfer-receiver.ts'),
('tip-execution-client','stack',1,'packages/daemon/src/transport/execution-client.ts'),
('tip-admission','stack',1,'packages/daemon/src/daemon-admission.ts'),
('tip-failure','stack',1,'packages/daemon/src/daemon-execution-failure.ts'),
('tip-followups','stack',1,'plans/005/daemon-follow-ups-functional-spec.md'),
]
for v in views:gitview(*v)
for number,base,head in [
    (146,'b8e8b7b85fe0e5fd0cb5784895ee090be015afa1','f79ba36278c77c41ca887aa4efc24fd0781e4cec'),
    (147,'f79ba36278c77c41ca887aa4efc24fd0781e4cec','ba53c8e1662fd86d198b95321c90d9c9bef10184'),
]:
    text=subprocess.check_output(['git','-C',str(REPO),'diff',base,head],text=True)
    write_view('pr-'+str(number)+'-diff','PR '+str(number)+' adjacent-layer diff',text,base+' → '+head)
# Check source invariants relevant to the table; this does not execute Symnav.
a=(OUT/'127-tests-base.txt').read_text();b=(OUT/'127-tests-head.txt').read_text();needle='  it("shares one reference search across caller and reference projections"'
checks={'127_existing_test_suffix_unchanged':a[a.index(needle):]==b[b.index(needle):], '127_base_cases':len(re.findall(r'  it\(',a)), '127_head_service_cases':len(re.findall(r'  it\(',b))}
for path in ['packages/daemon/src/daemon-policy.ts','packages/daemon/src/daemon-policy.test.ts']:
    blobs=[subprocess.check_output(['git','-C',str(REPO),'show',sha+':'+path])for sha in PINS['pr-131']]
    checks['131_unchanged_'+path]=blobs[0]==blobs[1]
assert checks['127_existing_test_suffix_unchanged']
(OUT/'invariant-checks.json').write_text(json.dumps(checks,indent=2)+'\n')
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'views':len(manifest),'checks':checks}))
