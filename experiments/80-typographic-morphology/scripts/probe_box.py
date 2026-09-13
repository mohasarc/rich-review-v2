import re, sys
from snapshots import SNAPS, git
cands = sys.argv[1:]
for label, sha in SNAPS:
    files = set(git('ls-tree','-r','--name-only',sha).splitlines())
    row = []
    for c in cands:
        if c in files:
            src = git('show', f'{sha}:{c}')
            n = src.count('\n')
            classes = re.findall(r'export\s+(?:abstract\s+)?class\s+(\w+)', src)
            imports = len(re.findall(r'^import\s', src, re.M))
            row.append(f'{c.split("/")[-1]}:{n}L cls={",".join(classes)} imp={imports}')
    print(label, sha[:8], ' | '.join(row) or '-')
