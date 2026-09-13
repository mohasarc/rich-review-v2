import json,re,collections
def package_of(url):
    u=url.replace('file://','')
    m=re.search(r'/node_modules/\.pnpm/([^/]+)/node_modules/((?:@[^/]+/)?[^/]+)/', u)
    if m: return 'npm:'+m.group(2)
    m=re.search(r'/node_modules/((?:@[^/]+/)?[^/]+)/', u)
    if m: return 'npm:'+m.group(1)
    m=re.search(r'/worktrees/[^/]+/(apps/cli|packages/[^/]+)/', u)
    if m: return m.group(1)
    return 'other'
def role_of(start):
    argv=start.get('argv',[])
    entry=argv[1] if len(argv)>1 else ''
    if not start.get('isMainThread'): return 'worker thread'
    if entry.endswith('/cli.js'): return 'CLI process'
    return 'daemon process'
def module_map(d):
    starts={}
    mods=collections.defaultdict(set)
    for e in d['events']:
        key=(e['pid'],e['tid'])
        if e['kind']=='thread-start': starts[key]=e
        elif e['kind']=='module': mods[key].add(e['url'])
    roles=collections.defaultdict(lambda: collections.defaultdict(set))
    for key,urls in mods.items():
        if key not in starts: continue
        role=role_of(starts[key])
        for u in urls:
            roles[role][package_of(u)].add(u.split('/worktrees/')[1].split('/',1)[1] if '/worktrees/' in u else u)
    return roles
