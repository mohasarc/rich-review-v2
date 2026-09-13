"""Build the offline reading table from authored data; no dependencies."""
import html
import json
import re
import runpy
from pathlib import Path

OUT = Path(__file__).resolve().parent
rows = runpy.run_path(str(OUT / "report-data.py"))["ROWS"]
for item in rows:
    capture = json.loads((OUT / "reads" / (item["key"] + ".json")).read_text())
    item["page"] = "../" + capture["path"]
    item["capture"] = "reads/" + item["key"] + ".txt"
    item["title"] = item["key"].replace("-", " ")

INTRO = """Seventy reading surfaces from the eighty finished handoffs at the 12:12 UTC cutoff. The comparison keeps **page-only decisions learned**, **source-only misses/corrections**, and **witnessed rule-4 surprises** separate. Two operated pages, 23 and 29, supplied the direct rule-4 witnesses; the four archived 49 roots retain or repair particular omissions. The table is an account of this reading, not a ranking or a correctness review.

The clearest missed choices concern host policy authority, standalone versus composed clock defaults, concrete authentication branches, earlier worker validation, changed completion-error provenance, altered test stimuli and a recorded export-retirement condition. Most checked #127 lessons already teach the cache/release distinctions. Narrow lessons are judged within their disclosed scope.

**Method limit:** one sequential agent read the advertised stopping layers and selected descendants, then sealed recall before opening source diffs. Knowledge accumulated between pages. Page 50 and report 57 exposed earlier critique material. Source checks were focused, not a complete audit of the large diffs; no-miss rows are bounded observations. [Sealed recall](cold-notes.md), [phase seal](phase-seal.json), [coverage and method](evidence.md#reading-protocol-and-limits), and [source receipts](evidence.md) make those limits inspectable.

All rows below are the stopping layer. Their links add receipts for the same facts. “R4 witnessed” means an observed parent-to-descendant addition; a source-only omission is not automatically such a witness.
"""

md = "# What survived a page-only reading\n\n" + INTRO + "\n"
md += "| Finished reading surface / scope | Decisions learned without the underlying diff | Misses or corrections after the diff | Rule 4 on the route read |\n"
md += "| --- | --- | --- | --- |\n"
for item in rows:
    first = f'<a id="{item["key"]}"></a>[{item["title"]}]({item["page"]}) · [{"capture"}]({item["capture"]})<br>{item["scope"]}'
    cells = [first, item["learned"], item["misses"], item["rule"]]
    md += "| " + " | ".join(cell.replace("|", "\\|").replace("\n", " ") for cell in cells) + " |\n"
(OUT / "review.md").write_text(md)
(OUT / "comparison.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n")


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)

    def link(match):
        label, target = match.groups()
        for old, new in [("review.md", "index.html"), ("evidence.md", "evidence.html")]:
            if target == old or target.startswith(old + "#"):
                target = new + target[len(old):]
        return f'<a href="{html.escape(target, quote=True)}">{label}</a>'

    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, text)


def slug(text):
    return re.sub(r"[^a-z0-9 -]", "", text.lower()).replace(" ", "-")


def paragraphs(text):
    rendered = []
    for block in text.strip().split("\n\n"):
        if block.startswith("# "):
            rendered.append(f"<h1>{inline(block[2:])}</h1>")
        elif block.startswith("## "):
            title = block[3:]
            rendered.append(f'<h2 id="{slug(title)}">{inline(title)}</h2>')
        else:
            rendered.append("<p>" + inline(block.replace("\n", " ")) + "</p>")
    return "\n".join(rendered)


CSS = """
:root{color-scheme:light;--ink:#172124;--paper:#f8f6f0;--line:#c7ccc6;--link:#125968;--flag:#873e1d}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 system-ui,-apple-system,sans-serif}a{color:var(--link);text-underline-offset:.2em}a:hover{color:#000}a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #b96826;outline-offset:3px}main{padding:2rem clamp(1rem,3vw,3rem) 4rem}header{max-width:76rem}h1{font-size:clamp(2rem,4vw,3.6rem);line-height:1.08;letter-spacing:-.04em;margin:.5rem 0 1.2rem}h2{font-size:1.45rem;margin:2.5rem 0 .6rem}p{max-width:80em;margin:1rem 0}code{font-size:.9em;overflow-wrap:anywhere}.eyebrow{font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;font-weight:700}.flow{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;margin:1.5rem 0}.flow span{padding:.7rem 1rem;border:1px solid var(--line);background:#fff}.flow small{flex-basis:100%;color:#596063}.tools{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin:1.5rem 0 .7rem;padding:1rem;background:#e9ece5;border:1px solid var(--line)}label{display:flex;gap:.5rem;align-items:center;font-size:.9rem}input,select,button{font:inherit;padding:.4rem .55rem;background:#fff;color:var(--ink);border:1px solid #89928b;border-radius:0}input[type=search]{min-width:14rem}button{cursor:pointer}#count{margin-left:auto;font-size:.9rem}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:14px;line-height:1.5;background:#fff}thead{background:#1f3639;color:#fff}th{text-align:left;vertical-align:top;padding:.85rem;font-size:.85rem}th:nth-child(1){width:15%}th:nth-child(2){width:30%}th:nth-child(3){width:32%}th:nth-child(4){width:23%}td{vertical-align:top;padding:1rem .85rem;border-bottom:1px solid var(--line);overflow-wrap:anywhere}tbody tr:nth-child(even){background:#f4f5f0}tr.flag td:last-child{background:#fff0e5;border-left:3px solid var(--flag)}.scope{display:block;margin:.7rem 0;color:#596063}.capture{font-size:.8rem}.surface{font-weight:700;display:block}tr:target{outline:3px solid #b96826;outline-offset:-3px}.receipt{max-width:66rem;margin:auto}.receipt h2{border-top:1px solid var(--line);padding-top:1.3rem;scroll-margin-top:1rem}footer{margin-top:2rem;border-top:1px solid var(--line);padding-top:1rem;font-size:.85rem}.skip{position:absolute;top:-100px}.skip:focus{top:1rem;background:white;padding:1rem} [hidden]{display:none!important}
@media(max-width:850px){table{min-width:1000px}main{padding:1rem}.tools label{flex-wrap:wrap}#count{margin-left:0}h1{font-size:2.4rem}}
@media print{.tools,.skip{display:none}body{background:white}main{padding:0}table{font-size:9px}th,td{padding:6px}tr{break-inside:avoid}.table-wrap{overflow:visible}a{color:inherit}}
"""

table_rows = []
for item in rows:
    table_rows.append(f'''<tr id="{item['key']}" class="{'flag' if item['flag'] else ''}" data-scope="{html.escape(item['scope'], quote=True)}" data-flag="{str(item['flag']).lower()}">
<td><a class="surface" href="{html.escape(item['page'], quote=True)}">{html.escape(item['title'])}</a><span class="scope">{html.escape(item['scope'])}</span><a class="capture" href="{item['capture']}">Captured page text</a></td>
<td>{inline(item['learned'])}</td><td>{inline(item['misses'])}</td><td>{inline(item['rule'])}</td></tr>''')

JS = """
const search=document.querySelector('#search'),scope=document.querySelector('#scope'),flags=document.querySelector('#flags');
const rows=[...document.querySelectorAll('tbody tr')];
function filter(){let n=0;for(const row of rows){const show=(!search.value||row.textContent.toLowerCase().includes(search.value.toLowerCase()))&&(!scope.value||row.dataset.scope.includes(scope.value))&&(!flags.checked||row.dataset.flag==='true');row.hidden=!show;if(show)n++;}document.querySelector('#count').textContent=n+' of '+rows.length+' surfaces';}
for(const el of [search,scope,flags])el.addEventListener('input',filter);
document.querySelector('#reset').addEventListener('click',()=>{search.value='';scope.value='';flags.checked=false;filter();});
"""

page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>84 · Page-only recall versus the diff</title><style>{CSS}</style></head><body>
<a class="skip" href="#comparison">Skip to the comparison table</a><main><header><div class="eyebrow">Brief 84 · fresh-reader-refresh-80 · critique</div><h1>What survived a<br>page-only reading</h1>
<div class="flow" role="img" aria-label="Page prose and selected descents, then sealed recall, then pinned source checks, then paired account"><span>Page + selected descents</span>→<span>Sealed recall</span>→<span>Pinned source</span>→<span>Paired account</span><small>Lossy procedure sketch: one sequential agent, with accumulated knowledge and disclosed prior-critique exposure.</small></div>
{paragraphs(INTRO)}</header><div class="tools"><label>Find <input type="search" id="search" placeholder="Page, decision or source miss"></label><label>Scope <select id="scope"><option value="">All</option><option>#127</option><option>#131</option><option>#148</option><option>stack</option></select></label><label><input type="checkbox" id="flags">Direct R4 witnesses only</label><button id="reset">Reset view</button><output id="count" aria-live="polite">70 of 70 surfaces</output></div>
<div class="table-wrap"><table id="comparison"><caption class="eyebrow" style="text-align:left;padding:.5rem 0">One table · all compared surfaces · no ranking</caption><thead><tr><th scope="col">Finished surface / scope</th><th scope="col">Decisions learned without the underlying diff</th><th scope="col">Misses or corrections after the diff</th><th scope="col">Rule 4 on the route read</th></tr></thead><tbody>{''.join(table_rows)}</tbody></table></div>
<footer><a href="review.md">Markdown table</a> · <a href="evidence.html">Method and receipts</a> · <a href="cold-notes.md">Sealed page-only notes</a> · <a href="README.md">README</a> · <a href="comparison.json">Structured rows</a><p>Read-only explanation. View controls filter this table locally and do not store judgments or comments.</p></footer></main><script>{JS}</script></body></html>'''
(OUT / "index.html").write_text(page)
evidence = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>84 · Method and source receipts</title><style>{CSS}</style></head><body><main class="receipt">{paragraphs((OUT / 'evidence.md').read_text())}<footer><a href="index.html">Back to the comparison</a> · <a href="evidence.md">Markdown receipts</a></footer></main></body></html>'''
(OUT / "evidence.html").write_text(evidence)
print(f"Built one comparison table with {len(rows)} rows; {sum(r['flag'] for r in rows)} directly witnessed R4 pages.")
