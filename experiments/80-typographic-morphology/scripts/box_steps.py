import sys
from snapshots import SNAPS, git
paths = sys.argv[1:]
prev = None
for label, sha in SNAPS:
    if prev:
        out = git('diff','--numstat','-M50%',prev,sha,'--',*paths).strip()
        ren = git('diff','--name-status','-M50%',prev,sha,'--',*paths).strip()
        if out:
            print(label, '|', out.replace('\n',' ; '), '|', ren.replace('\n',' ; '))
    prev = sha
