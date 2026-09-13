import sys, collections, json
def parse(path):
    counts = collections.OrderedDict()
    cur = None
    for line in open(path):
        line = line.rstrip("\n")
        if line.startswith("TEST "):
            cur = line[5:]
            counts.setdefault(cur, collections.Counter())
        elif line.startswith("SPILL ") and cur:
            counts[cur][line[6:]] += 1
    return counts
base = parse(sys.argv[1]); head = parse(sys.argv[2])
rows = []
for name in list(base.keys()) + [n for n in head if n not in base]:
    b = base.get(name); h = head.get(name)
    bc = sum(b.values()) if b is not None else None
    hc = sum(h.values()) if h is not None else None
    rows.append({"test": name, "base": dict(b) if b is not None else None, "head": dict(h) if h is not None else None,
                 "lost": bool(bc) and hc == 0, "gained": bc == 0 and bool(hc), "onlyBase": h is None, "onlyHead": b is None})
json.dump(rows, open(sys.argv[3], "w"), indent=1)
for r in rows:
    if r["lost"] or r["gained"] or r["onlyBase"] or r["onlyHead"] or (r["base"] != r["head"]):
        flag = "LOST " if r["lost"] else "GAIN " if r["gained"] else "BASE-ONLY" if r["onlyBase"] else "HEAD-ONLY" if r["onlyHead"] else "DIFF "
        print(flag, r["test"], "| base", r["base"], "| head", r["head"])
