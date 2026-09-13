import json
from lib_frames import frames
def step_events(d, sid):
    st=[s for s in d['steps'] if s['id']==sid][0]
    idx=d['steps'].index(st)
    prev=d['steps'][idx-1] if idx>0 else None
    ev=[e for e in d['events'] if st['startedAt']-2<=e['t']<=st['endedAt']]
    log=st['daemonLog'][len(prev['daemonLog']) if prev else 0:]
    usage=st['usage'][len(prev['usage']) if prev else 0:]
    return st,ev,log,usage
def summarize(d, sid, show_chunks=False):
    st,ev,log,usage=step_events(d,sid)
    lines=[]
    t0=st['startedAt']
    for e in ev:
        if e['kind'] in ('fault-cut','fault-server-drop','spawn'):
            lines.append((e['t'], f"{e['pid']} !! {e['kind']} {json.dumps({k:v for k,v in e.items() if k in ('inboundBytes','outboundBytes','socket')})}"))
    chunkrun={}
    for f in frames(ev):
        if f['kind']=='chunk':
            key=(f['socket'],f['dir'])
            if key in chunkrun and not show_chunks:
                chunkrun[key]['n']+=1; chunkrun[key]['bytes']+=f['payloadBytes']; continue
            chunkrun[key]={'n':1,'bytes':f['payloadBytes']}
            lines.append((f['t'], f"{f['pid']} {f['side']:6} {f['dir']:10} chunk offset={f['header'].get('offset')} seq={f['header'].get('sequence')} [+more on {f['socket']}]"))
        elif f['kind']=='json':
            fr=f['frame']
            extra={k:fr[k] for k in ('code','retrySafe','offset','nextOffset','state','outcome','commandName','totalRawBytes','recordCount','exitCode','reason','attempt') if k in fr}
            lines.append((f['t'], f"{f['pid']} {f['side']:6} {f['dir']:10} {fr.get('kind')} {json.dumps(extra)}"))
        else:
            lines.append((f['t'], f"{f['pid']} {f['side']:6} {f['dir']:10} {f['kind']}"))
    for (sock,d_),c in chunkrun.items():
        lines.append((10**15, f"   chunk totals {sock} {d_}: {c['n']} frames {c['bytes']} payload bytes"))
    lines.sort()
    print(f"== {sid} {st['title']}")
    for r in st['runs']: print('   run', ' '.join(r['argv']), 'exit', r['exitCode'], 'stdout', len(r['stdout']), 'stderr', r['stderr'][:160].replace('\n','⏎'), 'wall', r['endedAt']-r['startedAt'])
    for t,l in lines:
        if t==10**15: print(l)
        else: print(f"   {t-t0:7.1f} {l}")
    for l in log: print('   log', l.get('kind'), {k:v for k,v in l.items() if k in ('command','outcome','reason','code','cause','errorName','deliveryMs','rawBytes')})
    for u in usage: print('   usage', u.get('command'), u.get('executionMode'), u.get('outcome'))
