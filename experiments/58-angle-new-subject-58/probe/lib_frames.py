import json,base64,struct
def frames(events):
    streams={}
    order=[]
    for e in events:
        if e['kind'] in ('socket-out','socket-in') and 'base64' in e:
            key=(e['socket'],e['kind'])
            if key not in streams:
                streams[key]={'t':e['t'],'buf':b'','side':e.get('side'),'pid':e['pid'],'tid':e['tid'],'chunks':[]}
                order.append(key)
            s=streams[key]
            s['chunks'].append((e['t'],len(s['buf'])))
            s['buf']+=base64.b64decode(e['base64'])
    out=[]
    for key in order:
        s=streams[key]; buf=s['buf']; i=0
        def t_at(offset):
            t=s['chunks'][0][0]
            for (tt,off) in s['chunks']:
                if off<=offset: t=tt
            return t
        while i+4<=len(buf):
            (n,)=struct.unpack('>I',buf[i:i+4])
            binary=bool(n & 0x80000000); n&=0x7fffffff
            body=buf[i+4:i+4+n]
            rec={'t':t_at(i),'socket':key[0],'dir':key[1],'side':s['side'],'pid':s['pid'],'tid':s['tid'],'bytes':4+n}
            if len(body)<n:
                rec.update(kind='PARTIAL',have=len(body))
                out.append(rec); break
            if binary:
                (h,)=struct.unpack('>I',body[:4]); rec.update(kind='chunk',header=json.loads(body[4:4+h]),payloadBytes=len(body)-4-h)
            else:
                try: rec.update(kind='json',frame=json.loads(body))
                except Exception: rec.update(kind='bad',raw=body[:120].decode('utf8','replace'))
            out.append(rec); i+=4+n
    return sorted(out,key=lambda r:r['t'])
