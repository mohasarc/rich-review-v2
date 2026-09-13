"""Check artifact links, frozen receipts, pins, and the folder contract."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import hashlib, json, re, subprocess

HERE=Path(__file__).resolve().parents[1]
ROOT=HERE.parents[1]
class Page(HTMLParser):
    def __init__(self): super().__init__(); self.ids=[]; self.links=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if "id" in attrs:self.ids.append(attrs["id"])
        if tag in ("a","link","script"):
            value=attrs.get("src",attrs.get("href"))
            if value:self.links.append(value)

page=Page();page.feed((HERE/"index.html").read_text())
assert len(set(page.ids))==len(page.ids), "Duplicate HTML IDs"
checked=[]
for link in page.links:
    value=urlparse(link)
    if value.scheme:continue
    if not value.path:
        if value.fragment:assert value.fragment in page.ids, link
    else:
        assert (HERE/unquote(value.path)).exists(),link
    checked.append(link)

readme=(HERE/"README.md").read_text()
headers=re.findall(r"^## (.+)$",readme,re.M)
assert headers[:9]==["Entry point","Kind","Subjects","Declared choices","What I tried","What I would drop","What I would do next","Time spent","Visual-variable legend"]
for link in re.findall(r"\]\(([^)]+)\)",readme):
    if not urlparse(link).scheme:assert (HERE/link.split("#")[0]).exists(),link
assert (HERE/"brief.md").read_text().startswith("# Brief 78 — origami-depth")

bank=json.loads((HERE/"evidence/sources.json").read_text())
for key,doc in bank["docs"].items():
    raw=(HERE/"evidence/sources"/f"{key}.txt").read_text()
    assert raw==doc["text"],key
    assert hashlib.sha256(raw.encode()).hexdigest()==doc["sha256"],key
    if doc["build"] in ("base","head"):
        assert (ROOT/"worktrees"/f"pr-127-{doc['build']}"/doc["path"]).read_text()==raw,key
for edge,windows in bank["selections"].items():
    for key,start,end in windows:
        assert 1<=start<=end<=len(bank["docs"][key]["text"].split("\n")),(edge,key,start,end)
pins={}
for build,pin in bank["inventory"]["pins"].items():
    wt=ROOT/"worktrees"/f"pr-127-{build}"
    actual=subprocess.check_output(["git","rev-parse","HEAD"],cwd=wt,text=True).strip()
    status=subprocess.check_output(["git","status","--porcelain","--untracked-files=no"],cwd=wt,text=True).strip()
    assert actual==pin and not status,(build,actual,status)
    pins[build]={"revision":actual,"trackedStatus":"clean"}
for file in ["app.js","scripts/record.mjs","scripts/browser-check.cjs"]:
    subprocess.run(["node","--check",str(HERE/file)],check=True,capture_output=True)
report={"complete":True,"htmlIds":len(page.ids),"localLinksChecked":len(checked),"frozenDocumentsVerified":len(bank["docs"]),"pins":pins,
        "requiredReadmeHeadings":True,"receivedBriefPresent":True,"javascriptSyntax":"passed","sourceInventory":bank["inventory"]}
(HERE/"evidence/final-checks.json").write_text(json.dumps(report,indent=2)+"\n")
print(json.dumps(report,indent=2))
