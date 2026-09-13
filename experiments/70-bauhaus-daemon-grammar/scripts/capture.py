from pathlib import Path
import hashlib, html, json, re, subprocess

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
PINS = {'base':'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e', 'head':'b100221db48754656328391b878299c5a0bab443'}
DOCS = {
 'policy': ('packages/daemon/src/daemon-policy.ts', ['base','head']),
 'factory': ('packages/daemon/src/policy-testing.ts', ['head']),
 'resources': ('apps/cli/src/daemon/daemon-resource-monitor.ts', ['base','head']),
 'resource-tests': ('apps/cli/src/daemon/daemon-resource-monitor.test.ts', ['base','head']),
 'policy-tests': ('packages/daemon/src/daemon-policy.test.ts', ['base','head']),
 'terminator': ('apps/cli/src/daemon/daemon-process-launcher.ts', ['base','head']),
 'registry': ('apps/cli/src/daemon/daemon-registry.ts', ['base','head']),
 'registry-adapter': ('apps/cli/test/helpers/daemon-registry.ts', ['head']),
 'terminator-adapter': ('apps/cli/test/helpers/daemon-process-terminator.ts', ['head']),
 'workspace': ('apps/cli/src/daemon/workspace-daemon.ts', ['head']),
 'policy-record': ('plans/005/daemon-policy.md', ['head']),
}
EXCERPTS = {
 'policy-shape': ('head-policy', 49, 59),
 'shutdown-shape': ('head-policy', 29, 38),
 'startup-shape': ('head-policy', 21, 28),
 'defaults': ('head-policy', 111, 167),
 'resource-input': ('head-resources', 26, 37),
 'resource-reads': ('head-resources', 83, 120),
 'resource-replace': ('head-resources', 155, 166),
 'resource-old': ('base-resources', 1, 67),
 'resource-old-input': ('base-resources', 81, 92),
 'resource-old-cadence': ('base-resources', 142, 149),
 'terminator-input': ('head-terminator', 59, 67),
 'terminator-old': ('base-terminator', 58, 62),
 'terminator-composition': ('head-terminator', 113, 120),
 'registry-input': ('head-registry', 111, 125),
 'registry-grace': ('head-registry', 385, 391),
 'registry-second-read': ('head-registry', 535, 549),
 'registry-old': ('base-registry', 377, 383),
 'registry-adapter': ('head-registry-adapter', 1, 22),
 'terminator-adapter': ('head-terminator-adapter', 1, 24),
 'factory': ('head-factory', 1, 18),
 'validation': ('head-policy', 258, 298),
 'resource-composition': ('head-workspace', 138, 139),
 'resource-supply': ('head-workspace', 160, 171),
 'old-cases': ('base-resource-tests', 11, 72),
 'new-case': ('head-resource-tests', 37, 73),
 'retained-cases': ('head-policy-tests', 72, 104),
 'reasons': ('head-policy-record', 33, 45),
 'signal-reasons': ('head-policy-record', 23, 24),
 'grace-reason': ('head-policy-record', 12, 12),
}

def main():
    bank = {}
    for side,pin in PINS.items():
        worktree = ROOT/'worktrees'/f'pr-131-{side}'
        assert subprocess.check_output(['git','rev-parse','HEAD'],cwd=worktree,text=True).strip() == pin
        assert not subprocess.check_output(['git','status','--porcelain','--untracked-files=no'],cwd=worktree,text=True).strip()
    for key,(path,sides) in DOCS.items():
        for side in sides:
            raw = (ROOT/'worktrees'/f'pr-131-{side}'/path).read_text()
            bank[f'{side}-{key}']={'path':path,'side':side,'revision':PINS[side],'sha256':hashlib.sha256(raw.encode()).hexdigest(),'text':raw}
    pr = json.loads((ROOT/'inputs/pr-131/pr.json').read_text())
    bank['pr']={'path':'inputs/pr-131/pr.json → body','side':'bundle','revision':PINS['head'],'text':pr['body'],'sha256':hashlib.sha256(pr['body'].encode()).hexdigest()}
    excerpts = {}
    for key,(doc,a,b) in EXCERPTS.items():
        source=bank[doc]; lines=source['text'].splitlines()
        b=min(b,len(lines)); assert a<=b
        excerpts[key]={**{k:v for k,v in source.items() if k!='text'},'doc':doc,'start':a,'end':b,'text':'\n'.join(lines[a-1:b])}
    excerpts['pr-reasons']={**bank['pr'],'doc':'pr','start':1,'end':len(pr['body'].splitlines()),'text':pr['body']}
    policy=bank['head-policy']['text']
    fields={}
    for section in ['resources','shutdown','startup']:
        body=re.search(r'readonly '+section+r': \{(.*?)\n  \};',policy,re.S).group(1)
        fields[section]=re.findall(r'readonly (\w+): number;',body)
    direct={
      'resources':['hardProcessRssBytes','softProcessRssBytes','resumeProcessRssBytes','supervisionIntervalMs','replacementWindowMs','replacementLimit'],
      'shutdown':['processSignalExitTimeoutMs','processExitPollIntervalMs'],
      'startup':['coordinationGraceMs']}
    for section,doc,pattern in [('resources','head-resources',r'(?:options\.)?policy\.(\w+)'),('shutdown','head-terminator',r'policy\.(process\w+)'),('startup','head-registry',r'startupPolicy\.(\w+)')]:
        found=set(re.findall(pattern,bank[doc]['text']))
        assert found==set(direct[section]), (section,found)
    assert [len(fields[k]) for k in fields]==[9,8,6]
    for section,key in [('resources','policy-shape'),('shutdown','shutdown-shape'),('startup','startup-shape')]:
        assert all(field in excerpts[key]['text'] for field in fields[section])
    for key,tokens in {'resource-old-input':['policy: DaemonResourcePolicy','intervalMs?: number'], 'resource-replace':['replacementWindowMs','replacementLimit'], 'new-case':['supervisionIntervalMs: 17','hardProcessRssBytes: 103','softProcessRssBytes: 102','resumeProcessRssBytes: 101'], 'registry-grace':['graceMs = this.startupPolicy.coordinationGraceMs','<= graceMs']}.items():
        assert all(token in excerpts[key]['text'] for token in tokens), key
    assert bank['base-policy']['sha256']==bank['head-policy']['sha256']
    assert bank['base-policy-tests']['sha256']==bank['head-policy-tests']['sha256']
    manifest={'pins':PINS,'documents':bank,'excerpts':excerpts,'fields':fields,'directReads':direct,'bounds':'Three consumer constructors and their test composition, not a PR-wide decision census.'}
    (OUT/'evidence/sources.json').write_text(json.dumps(manifest,indent=2)+'\n')
    (OUT/'evidence/data.js').write_text('window.EVIDENCE = '+json.dumps(manifest)+';\n')
    style='body{max-width:1080px;margin:40px auto;padding:0 24px;background:#f4f0e7;color:#1e201c;font:16px system-ui}a{color:#174bbd}article{margin:70px 0}pre{overflow:auto;font:13px/1.7 ui-monospace,monospace;border-top:2px solid;padding:20px 0}.line{display:block;scroll-margin:100px}.line:target{background:#ffdb6c}.ln{color:#727267;display:inline-block;width:4em;user-select:none}summary{cursor:pointer}h2{overflow-wrap:anywhere}code{overflow-wrap:anywhere}'
    entries=[]
    for key,source in bank.items():
        lines='\n'.join(f'<span class="line" id="{key}-L{i}"><a class="ln" href="#{key}-L{i}">{i}</a>{html.escape(line)}</span>' for i,line in enumerate(source['text'].splitlines(),1))
        entries.append(f'<article id="{key}"><h2>{key}</h2><p>{html.escape(source["path"])}<br><code>{source["revision"]}</code></p><pre>{lines}</pre><p><a href="../index.html">Return to the grammar</a></p></article>')
    (OUT/'evidence/source-book.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Source book · Bauhaus daemon grammar</title><style>'+style+'</style><h1>The source book</h1><p>Frozen base/head source. Full files are audit context; the teaching scope is the three consumer inputs.</p><a href="../index.html">Return to the grammar</a>'+''.join(entries)+'</html>')
    (OUT/'evidence/capture-checks.json').write_text(json.dumps({'pins':PINS,'trackedWorktreesClean':True,'policyUnchanged':True,'packagePolicyTestsUnchanged':True,'fieldCounts':{k:len(v) for k,v in fields.items()},'directReadCounts':{k:len(v) for k,v in direct.items()},'documentCount':len(bank),'excerptCount':len(excerpts)},indent=2)+'\n')
    print(f'Captured {len(bank)} documents and {len(excerpts)} excerpts; 9/6, 8/2, 6/1 field/read counts verified.')

if __name__=='__main__': main()
