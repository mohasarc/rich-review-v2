"""Capture only pinned Git objects. Writes only inside experiment 65."""
from pathlib import Path
import hashlib, html, json, re, subprocess

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
WORK = ROOT / 'worktrees/stack-head'
BUNDLE = json.loads((ROOT / 'inputs/stack/pr.json').read_text())
PRS = {p['number']: p for p in BUNDLE['pullRequests']}
PINS = {str(n): PRS[n]['commits'][-1]['sha'] for n in [147,148,149]}

def git(*args):
    return subprocess.check_output(['git', '-C', str(WORK), *args], text=True)

def source(stage, path):
    return git('show', f'{PINS[str(stage)]}:{path}')

SOURCES = {}
def receipt(key, stage, path, start=1, end=None):
    text = source(stage,path)
    lines = text.splitlines()
    if isinstance(start,str):
        start = next(i+1 for i,line in enumerate(lines) if start in line)
    if end is None: end = start+34
    end = min(end, len(lines))
    assert 1 <= start <= end <= len(lines), (key,start,end,len(lines))
    SOURCES[key] = dict(id=key,stage=stage,path=path,sha=PINS[str(stage)],
        hash=hashlib.sha256(text.encode()).hexdigest(), start=start,end=end,
        text='\n'.join(lines[start-1:end]),full=text)

receipt('freeze',148,'meta-tests/src/daemon-compatibility-copy.test.ts',8,50)
receipt('absence',149,'meta-tests/src/daemon-compatibility-copy.test.ts',1,12)
receipt('cli-before',148,'apps/cli/src/cli.ts',1)
receipt('cli-after',149,'apps/cli/src/cli.ts',1,27)
receipt('coordinator',149,'apps/cli/src/cli-invocation-coordinator.ts',17,44)
receipt('composition',149,'apps/cli/src/program.ts','const daemonClient = new DaemonClient',78)
receipt('executor',149,'apps/cli/src/daemon-executor.ts',130,150)
receipt('facade',148,'packages/daemon/src/client/daemon-client.ts',20,52)
receipt('exports',149,'packages/daemon/package.json',8,29)
receipt('leaf',149,'AGENTS.md','## Dependency direction')
receipt('transport',149,'packages/daemon/src/transport/daemon-transport.ts',24,77)
receipt('capture',148,'packages/daemon/src/client/daemon-client-runtime.ts','createOutput:',None)
receipt('inspector',149,'packages/daemon/src/testing/daemon-testing-inspector.ts',29,46)
receipt('observation',149,'apps/cli/test/helpers/daemon-testing.ts',1)
receipt('actors',149,'packages/daemon/test/actors/daemon-process-coordinator-controlled.ts',25,65)
receipt('reachability',149,'meta-tests/src/cli-daemon-reachability.test.ts',83,122)
receipt('storage',149,'meta-tests/src/daemon-storage-boundary.test.ts',215,249)
receipt('serial',148,'packages/daemon/vitest.config.ts',1,7)
receipt('tsx',148,'packages/daemon/package.json',25,32)
receipt('policy-before',148,'packages/daemon/src/daemon-policy.ts','static fromSerialized')
receipt('policy-after',149,'packages/daemon/src/host-contract.test.ts',121,172)
receipt('manifest-before',148,'packages/daemon/package.json',8,22)
receipt('manifest-baseline',147,'packages/daemon/package.json',8,18)
receipt('clock-inventory',149,'packages/daemon/src/lifecycle/daemon-clock.test.ts',262,291)
receipt('export-inventory',149,'packages/daemon/src/host-contract.test.ts',94,120)
receipt('status-old',148,'apps/cli/test/e2e/daemon/status.test.ts',112,145)
receipt('status-new',149,'apps/cli/test/e2e/daemon/status.test.ts',75,99)
receipt('stop-old',148,'apps/cli/test/e2e/daemon/stop.test.ts',100,144)
receipt('stop-new',149,'apps/cli/test/e2e/daemon/stop.test.ts',75,83)

# Exact grouped surface witnesses; these are not equal-sized source inventories.
FAMILIES = [
 ('route','ROUTE','client boundary','packages/daemon/src/client/daemon-client.ts','apps/cli/src/daemon/daemon-command-dispatcher.ts'),
 ('wire','WIRE','sockets · transport','packages/daemon/src/transport/socket-client.ts','apps/cli/src/daemon/local-daemon-socket-client.ts'),
 ('process','PROCESS','process · lifecycle','packages/daemon/src/process/process-coordinator.ts','apps/cli/src/daemon/daemon-process-coordinator.ts'),
 ('worker','WORKER','worker · execution','packages/daemon/src/worker/worker-generation-manager.ts','apps/cli/src/daemon/daemon-worker-generation-manager.ts'),
 ('output','OUTPUT','capture · delivery','packages/daemon/src/delivery/delivery-session.ts','apps/cli/src/daemon/daemon-delivery-session.ts'),
 ('memory','MEMORY','resource supervision','packages/daemon/src/resources/resource-supervisor.ts','apps/cli/src/daemon/daemon-resource-monitor.ts'),
 ('state','STATE','registry · diagnostics','packages/daemon/src/registry/registry.ts','apps/cli/src/daemon/daemon-registry.ts'),
]
for key, label, title, new, old in FAMILIES:
    receipt(f'family-{key}',148,new,1)
    receipt(f'old-{key}',148,old,1)

files148 = git('ls-tree','-r','--name-only',PINS['148'],'apps/cli/src/daemon').splitlines()
excluded = {'daemon-command-dispatcher.ts','invocation-route.ts','invocation-workspace-selector.ts'}
frozen = sorted(p for p in files148 if p.endswith('.ts') and not p.endswith('.test.ts') and Path(p).name not in excluded)
digest = hashlib.sha256()
for p in frozen:
    digest.update(p.encode()+b'\0'+source(148,p).replace('\r\n','\n').encode()+b'\0')
expected = re.search(r'expectedDigest\s*=\s*"([0-9a-f]+)"',SOURCES['freeze']['full']).group(1)
assert len(frozen)==38 and digest.hexdigest()==expected
assert git('ls-tree','-r','--name-only',PINS['149'],'apps/cli/src/daemon') == ''
assert 'DaemonCommandDispatcher' in SOURCES['cli-before']['full']
assert 'CliInvocationCoordinator' in SOURCES['cli-after']['full']
assert 'daemonClient.execute' in SOURCES['coordinator']['full']
assert 'new DaemonClient(' in SOURCES['composition']['full']

removed = []
for subject in ['status','stop']:
    p=f'apps/cli/test/e2e/daemon/{subject}.test.ts'
    old=source(148,p); new=source(149,p)
    names=lambda s: re.findall(r'\bit\("([^"]+)"',s)
    for name in names(old):
        if name not in names(new):
            line=next(i+1 for i,l in enumerate(old.splitlines()) if f'it("{name}"' in l)
            removed.append(dict(name=name,file=subject,source=f'{subject}-old',line=line))
    patch=git('diff',PINS['148'],PINS['149'],'--',p)
    (OUT/'evidence'/f'{subject}-149.patch').write_text(patch)
assert sum(x['file']=='status' for x in removed)==7
assert sum(x['file']=='stop' for x in removed)==3

renames=git('diff','--name-status','-M',PINS['147'],PINS['148']).splitlines()
moved=[l.split('\t') for l in renames if l.startswith('R') and 'apps/cli/src/daemon/' in l and 'packages/daemon/src/' in l and l.endswith('.test.ts')]
assert len(moved)==37, len(moved)

for n in [148,149]:
    (OUT/'evidence'/f'pr-{n}.md').write_text(PRS[n]['body'])
    (OUT/'evidence'/f'pr-{n}-commits.json').write_text(json.dumps(PRS[n]['commits'],indent=2)+'\n')

style='body{font:16px/1.55 system-ui;margin:32px;max-width:1100px;background:#f4f2ea;color:#1d2827}a{color:#156250}h1{font-size:23px;overflow-wrap:anywhere}pre{font:13px/1.5 ui-monospace,monospace;overflow:auto;background:#fff;padding:20px}pre span{display:block;min-height:1.5em;scroll-margin-top:20px}pre span:target{background:#bdf2de}small{overflow-wrap:anywhere}.ln{display:inline-block;color:#787f7b;min-width:4em;text-decoration:none}'
for s in SOURCES.values():
    numbered=''.join(f'<span id="L{i}"><a class="ln" href="#L{i}">{i}</a>{html.escape(l)}</span>' for i,l in enumerate(s['full'].splitlines(),1))
    page=f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>{html.escape(s["path"])}</title><style>{style}</style><a href="../index.html">← Package board</a><h1>{html.escape(s["path"])}</h1><p>PR #{s["stage"]} · {s["sha"]}</p><small>SHA-256 {s["hash"]} · frozen source, not a test-run result</small><pre>{numbered}</pre></html>'
    (OUT/'evidence'/f'{s["id"]}.html').write_text(page)

for n in [148,149]:
    (OUT/'evidence'/f'pr-{n}.html').write_text(f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>PR #{n} supplied body</title><style>{style}pre{{white-space:pre-wrap}}</style><a href="../index.html#pr-{n}">← Package board</a><h1>PR #{n}: {html.escape(PRS[n]["title"])}</h1><p>Supplied PR body at head {PINS[str(n)]}</p><p>Recorded author statements below. This artifact has not rerun the verification claimed by the PR.</p><pre>{html.escape(PRS[n]["body"])}</pre></html>')

inventory=dict(pins=PINS,base=BUNDLE['base'],head=BUNDLE['head'],frozenFiles=frozen,
    freezeDigest=digest.hexdigest(),freezeExpected=expected,oldDirectoryAbsent=True,
    testMoves=moved,removedScenarios=removed,
    caveats=['Grouped cells do not measure file size, runtime instances or effort.',
             'Lift is a consumer reachability analogy, not a Git revert or compiler run.',
             'Removed test titles are an inventory; replacement assertion equivalence is unverified.'],
    worktreeStatus={w:subprocess.check_output(['git','-C',str(ROOT/'worktrees'/w),'status','--porcelain','--untracked-files=no'],text=True) for w in ['stack-head','main']})
(OUT/'evidence/inventory.json').write_text(json.dumps(inventory,indent=2)+'\n')
(OUT/'evidence/sources.json').write_text(json.dumps(SOURCES,indent=2)+'\n')
data=dict(inventory=inventory,sources={k:{a:b for a,b in v.items() if a!='full'} for k,v in SOURCES.items()},families=[dict(zip(['id','label','title','after','before'],f)) for f in FAMILIES])
(OUT/'evidence.js').write_text('window.EVIDENCE = '+json.dumps(data,ensure_ascii=False)+';\n')
print(json.dumps(dict(sources=len(SOURCES),frozenFiles=len(frozen),testMoves=len(moved),removedScenarios=len(removed),pins=PINS),indent=2))
