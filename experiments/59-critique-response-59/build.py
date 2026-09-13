"""Build the read-only critique from frozen predecessors and manual comparisons."""
from pathlib import Path
from html import escape as h
import hashlib, json
from audit_data import AUTHORED, DETAILS, CROSSWALK, CASES

ROOT=Path(__file__).resolve().parent
PARENTS=json.loads((ROOT/'evidence/51-parents.json').read_text())
FRONTS={r['id']:r for r in PARENTS['fronts']}
CHILDREN={r['id']:r for r in PARENTS['pr131_children']}
LEDGER=json.loads((ROOT/'baseline-52/ledger.json').read_text())['decisions']
assert set(CROSSWALK)=={r['id'] for r in LEDGER}
PREP=json.loads((ROOT/'evidence/preparation.json').read_text())
OBS=json.loads((ROOT/'observations/pair-browser.json').read_text())

def base_links(ids, mechanism=False):
    return ' · '.join(f'<a href="baseline-52/compact.html#{("m-" if mechanism else "")+d}">{d.upper()}</a>' for d in ids)

def shell(body,title='PR 131 · Keep the consequence'):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{h(title)}</title><link rel="icon" href="data:,"><link rel="stylesheet" href="style.css"></head><body><a class="skip" href="#main">Skip to the report</a><header><a href="index.html">rich-review / 59</a><nav aria-label="Report"><a href="#result">Findings</a><a href="#arrow">52’s arrows</a><a href="#parents">51’s parents</a><a href="#crosswalk">Source crosswalk</a></nav></header><main id="main">{body}</main><footer><a href="README.md">README</a> · <a href="brief.md">Brief</a> · <a href="#result">Back to the findings ↑</a></footer></body></html>'''

def quote_front(ids,ancestor=False):
    pieces=[]
    if ancestor:
        ep=next(x for x in PARENTS['episodes'] if x['id']=='policy')
        pieces.append(f'<p class="quote-label">51 · policy section parent</p><blockquote>{h(ep["takeaway"])}</blockquote>')
    for id in ids:
        r=FRONTS[id]
        pieces.append(f'<p class="quote-label">51 · {id} · visible front</p><blockquote>{h(r["statement"])}</blockquote><p class="reason">Reason {h(r["status"])}: {h(r["reason"])}</p>')
    return ''.join(pieces)

# Make one independent context witness line-addressable.
source_pages=ROOT/'witnesses'
source_pages.mkdir(exist_ok=True)
def witness(name,text,origin):
    lines=''.join(f'<span id="L{i}"><a href="#L{i}">{i}</a><code>{h(line)}</code></span>' for i,line in enumerate(text.splitlines(),1))
    page=shell(f'<section id="result"><p class="eyebrow">Frozen witness</p><h1>{h(name)}</h1><p>{h(origin)}</p><p><a href="../index.html">Return to the critique</a> · Browser Back returns to your previous position.</p><div class="source">{lines}</div></section>',name)
    page=page.replace('href="style.css"','href="../style.css"').replace('href="README.md"','href="../README.md"').replace('href="brief.md"','href="../brief.md"').replace('href="index.html"','href="../index.html"')
    # Witnesses have their own reading context, so remove unrelated report fragment navigation.
    start=page.index('<nav aria-label="Report">');end=page.index('</nav>',start)+6
    page=page[:start]+page[end:]
    (source_pages/(name+'.html')).write_text(page)

for side in ('base','head'):
    witness('program-'+side,(ROOT/'evidence'/('program-'+side+'.ts')).read_text(),f'PR #131 {side} · '+PREP['worktrees'][side]['revision']+' · apps/cli/src/program.ts')
for key in ('policy-plan','transport-helper','process-helper'):
    frozen=ROOT/'evidence'/('51-'+key+'.json')
    if frozen.exists():
        d=json.loads(frozen.read_text())
    else:
        d=json.loads((ROOT.parent/'51-angle-new-subject-51/evidence/sources.json').read_text())[key]
        frozen.write_text(json.dumps(d,indent=2)+'\n')
    witness('51-'+key,d['text'],'Copied from 51’s frozen source bank; '+d['version']+' · '+d['revision']+' · '+d['path']+'. This is predecessor evidence, not a new execution or independent checkout of the final stack.')

arrow='''<figure class="intuition"><div class="arrow-pair"><div class="arrow-view"><h3>52 as delivered</h3><div class="package">packages/daemon <b>DaemonPolicy</b></div><div class="arrow wrong">↓ <small>imports / constructs</small></div><div class="package">apps/cli <b>Composition</b></div></div><div class="arrow-view"><h3>52 corrected here</h3><div class="package">packages/daemon <b>DaemonPolicy</b></div><div class="arrow right">↑ <small>imports / constructs</small></div><div class="package">apps/cli <b>Composition</b></div></div></div><figcaption>Lossy orientation: one selected relationship from the larger maps. The importing CLI points to the policy package. The separate composition → mechanism arrow supplies values.</figcaption></figure>'''

top=f'''<section id="result"><p class="eyebrow">Critique response 59 · PR 131 · source and explanation audit</p><h1>A parent must preserve<br>the prediction.</h1><p class="lede">52’s shared import arrows are repaired. 51 carries the four stated PR-131 choices when its section parents and other fronts are included, but its deeper policy table and helper sources still add consequences.</p>{arrow}
<div class="entry-pair"><a href="baseline-52/compact.html"><strong>Open corrected compact</strong><span>Complete PR-131 explanation · same thirty propositions</span></a><a href="baseline-52/fuller.html"><strong>Open corrected fuller</strong><span>Same wording, mechanisms and evidence · different arrangement</span></a></div>
<div class="scope"><b>What was observed.</b> I operated the prepared pages and selected descents; these are source-informed author observations. I also read 49’s existing PR-131 validation passages and its four sealed reader accounts. I am not an unfamiliar participant. 52’s separate-reader trial still has no observations.</div>
<h2>The complete critique</h2><div class="table-wrap"><table class="findings"><thead><tr><th>Finding</th><th>Consequence to carry</th><th>Inspect</th></tr></thead><tbody>
<tr><th>One common arrow repair</th><td>CLI composition imports/constructs policy. Composition supplies values to mechanisms. The repaired maps name those different relationships in both treatments; their layout comparison remains intact.</td><td><a href="#arrow">Repair and receipts ↓</a></td></tr>
<tr><th>Follow ancestry before declaring a miss</th><td>Required slices are already in 51’s section introduction. P9 preserves both execution budgets. Timeout purpose is on W3, away from its mapped P2 parent. P7 preserves test placement but compresses the stated adapter rationale.</td><td><a href="#parents">All four mappings ↓</a></td></tr>
<tr><th>A family name can hide a mechanism</th><td>The table first distinguishes startup-child relaunch from untimed warm-up; a shared stop budget with force reserving at most half from independent signal waits; process sampling from faster active-worker heap sampling; and queued-write memory from retained log files. The #131 source also shows that ownership waits do not reset the child retry counter.</td><td><a href="#descendants">Table descents ↓</a></td></tr>
<tr><th>A test adapter can alter the observation</th><td>P7 already warns about a positive inline floor, an inert memory input and emptiness without spill. Descending adds constructor directory creation, a result-bound condition for workspace zero repair, and differing policy/legacy-option precedence.</td><td><a href="#t5">Helper descents ↓</a></td></tr>
<tr><th>Use a PR-specific source baseline</th><td>52 also exposes retained scalar/injected seams, local derivation-test deletion with central tests already present, policy-derived expectations that follow changed defaults, the unused startup-timeout stimulus, added consumer witnesses and their limits, casts through unknown that do not witness normal typed construction, and a source-name guard. 51’s later test/enforcement narrative does not substitute for those #131 choices. Its P8 already carries the 1→32 stimulus and unversioned benchmark fields.</td><td><a href="#crosswalk">Thirty-proposition crosswalk ↓</a></td></tr>
<tr><th>Preserve the stage boundary</th><td>51 explicitly describes final-stack fetch recovery as superseding #131. At #131, a failed fetch settles its attempt; acceptance of a later attachment changes which completion error may escape. Those are conditions to retain in the isolated-PR explanation.</td><td><a href="#cases">Prepared questions ↓</a></td></tr>
<tr><th>Observed geometry is not learning</th><td>Both repaired registers still contain 2,305 words. Compact reaches the stopping line earlier on the checked screens. The same source-backed predictions remain available in both. No human preference, reading-time saving or independent comprehension result follows.</td><td><a href="#observations">What the comparison establishes ↓</a></td></tr>
</tbody></table></div><p class="stop"><b>You can stop here.</b> Below are exact parent/child witnesses, concrete candidate wording, stage distinctions and the operated routes behind these findings.</p></section>'''

repair='''<section id="arrow"><p class="eyebrow">01 · Common repair before comparison</p><h2>Reverse the dependency; name the value route.</h2><p>The gray edge in both original static maps ran from <code>packages/daemon</code> to CLI composition while reading “imports / constructs.” CLI <code>program.ts</code> imports <code>DaemonPolicy</code> and calls its factory. The original arrow therefore named the reverse dependency. The horizontal arrow is value supply, so a caption calling all edges dependencies was also too broad.</p><div class="source-links"><a href="witnesses/program-head.html#L7">Import · head line 7</a><a href="witnesses/program-head.html#L77">Factory call · head line 77</a><a href="witnesses/program-base.html#L7">Same direction at base</a><a href="arrow-repair.patch">Exact shared patch</a></div><figure><a href="screenshots/02-corrected-compact-arrows.png"><img src="screenshots/02-corrected-compact-arrows.png" alt="Corrected before and after package maps: both gray import arrows point from apps/cli composition to packages/daemon. Horizontal arrows still supply optional or required inputs to CLI mechanisms."></a><figcaption>The corrected rendered maps. <a href="observations/52-original-compact-maps.png">Original capture</a>. The change moves value authority; no PR-131 mechanism moves package and no process hop is added.</figcaption></figure><p>Only the gray arrow direction, its accessible description and the shared caption changed. Both layouts, both isolated reader packets and the shared overview received the same repair. The thirty decision cards, reasons, mechanisms, source excerpts, styles and kit components remain unchanged. The archived earlier experiment was not edited.</p><p><a href="#result">↑ Findings</a></p></section>'''

authored='<section id="parents"><p class="eyebrow">02 · Authored mappings, read with their ancestors</p><h2>Four links are not four isolated parents.</h2><p>Scope: all four of 51’s PR-131 author-bullet mappings, its relevant table/helper descents, and all visible fronts as possible alternative parents. The other 113 author-bullet mappings are outside this PR-131 audit. A fact supplied elsewhere on the declared complete overview is a navigation weakness here, not automatically a pyramid violation.</p>'
for a in AUTHORED:
    child=CHILDREN[a['child']]
    authored+=f'''<article class="audit-card" id="{a['id']}"><p class="eyebrow">{h(a['child'])} → {h(child['parent'])}</p><h3>{h(a['finding'])}</h3><p>{h(a['account'])}</p><details><summary>Compare the exact parent and child</summary>{quote_front(a['fronts'],a['ancestor'])}<p class="quote-label">51 · disclosed author decision, PR #131</p><blockquote>{h(child['statement'])}</blockquote><p><a href="../51-angle-new-subject-51/index.html#{child['parent']}">Open original mapped parent</a> · <a href="observations/51-authored-descent.json">Operated child capture</a></p></details><div class="candidate"><b>Candidate wording / editorial action</b><p>{h(a['repair'])}</p></div><p>PR-131 baseline: {base_links(a['baseline'])} · <a href="#parents">↑ Mapping overview</a></p></article>'''
authored+='</section>'

desc='<section id="descendants"><p class="eyebrow">03 · Conditions and outcomes below the grouped front</p><h2>Exact numbers can deepen a rule.<br>A new rule needs a parent.</h2><p>P3 already names four output bounds; their byte values can add fidelity. A child-failure relaunch is different: a reader cannot derive its trigger and effect from the word “startup.” The following comparisons separate those cases. Candidate wording preserves the mechanism before asking the reader to inspect numbers or code.</p>'
for d in DETAILS:
    evidence = '<a href="observations/51-policy-table.txt">Opened table capture</a> · <a href="witnesses/51-policy-plan.html">51’s pinned policy record</a>' if d['kind']=='table' else ('<a href="witnesses/51-transport-helper.html#L75">51’s linked transport helper</a>' if d['id']=='t5' else '<a href="witnesses/51-process-helper.html#L44">51’s linked process helper</a>')
    desc+=f'''<article class="audit-card" id="{d['id']}"><p class="eyebrow">{'Rendered policy table' if d['kind']=='table' else 'Linked helper source'} · parents considered {h(', '.join(d['fronts']))}</p><h3>{h(d['title'])}</h3><p class="prediction">{h(d['prediction'])}</p><p>{h(d['assessment'])}</p><details><summary>Exact front wording and descendant</summary>{quote_front(d['fronts'])}<p class="quote-label">Descendant proposition</p><blockquote>{h(d['child'])}</blockquote><p>{evidence}</p></details><div class="candidate"><b>Candidate parent addition</b><p>{h(d['repair'])}</p><p class="reason">{h(d['reason'])}</p></div><p>Corresponding #131 mechanism: {base_links(d['baseline'],True)} · <a href="#descendants">↑ Descent overview</a></p></article>'''
desc+='</section>'

cross='<section id="crosswalk"><p class="eyebrow">04 · Additional source coverage, separately identified</p><h2>Use 52 as a comparison frame,<br>not a completeness certificate.</h2><p>This is a manual crosswalk of all thirty propositions in the repaired pair against 51’s visible fronts. “Additional #131 source coverage” does not mean I found that claim in an authored 51 child. It identifies what would still be missing if 51’s grouped stack account were reused as the isolated PR review. Later-stage API/recovery claims remain explicitly separate. The baseline’s stated/unexplained reasons retain their original scope.</p><div class="table-wrap"><table><thead><tr><th>52 proposition</th><th>Where 51 carries it, or the limit</th></tr></thead><tbody>'
for d in LEDGER:
    locus,note=CROSSWALK[d['id']]
    cross+=f'<tr id="cross-{d["id"]}"><th>{base_links([d["id"]])}<br>{h(d["title"])}</th><td><b>{h(locus)}</b><p>{h(note)}</p><details><summary>Exact baseline proposition and reason</summary><p>{h(d["choice"])}</p><p class="reason">Reason {h(d["status"])}: {h(d["reason"])}</p><p>{base_links([d["id"]],True)} · same proposition with source</p></details></td></tr>'
cross+='</tbody></table></div><p><a href="#result">↑ Findings</a></p></section>'

cases='<section id="cases"><p class="eyebrow">05 · Prepared questions, operated routes</p><h2>The same questions still reach<br>the same explanations.</h2><p>52 prepared four unshown-case prompts. I used them as source-informed inspection tasks after the arrow repair. These accounts are mine, not answers from new participants. The source-derived cases are illustrative; no new socket, worker or storage execution was performed.</p>'
for title,ids,account,observation in CASES:
    cases+=f'<article class="case"><h3>{h(title)}</h3><p>{h(account)}</p><p class="reason">{h(observation)}</p><p>Baseline parents: {base_links(ids)} · <a href="#cases">↑ Cases</a></p></article>'
cases+='''<div class="scope"><b>Temporal guard.</b> 51’s R3 literally says its final behavior “supersedes the intermediate #131 later-completion-error behavior.” That is a useful warning in a stack explanation. Copying the final account into the PR-131 pair would erase a condition the earlier review needs.</div></section>'''

observations='''<section id="observations"><p class="eyebrow">06 · Observation and its limits</p><h2>The pair is usable.<br>The unfamiliar-reader comparison remains unrun.</h2><p>The repair preserves equality of the rendered registers against the original and against each other: 30 propositions and 2,305 words. I operated D06, D04, D17, D19, D07, D01, D29 and D23 in both layouts and checked return focus. Four widths had no document-level overflow; the maps use their existing horizontal scroll containers. A no-JavaScript reading retained all cards and the D06 route.</p><div class="table-wrap"><table><thead><tr><th>Viewport width</th><th>Compact stop line</th><th>Fuller stop line</th></tr></thead><tbody>'''
for width in (1440,768,390,320):
    rs={r['variant']:r for r in OBS['records'] if r.get('width')==width}
    observations+=f'<tr><td>{width} px</td><td>{rs["compact"]["geometry"]["stopY"]:,} px down</td><td>{rs["fuller"]["geometry"]["stopY"]:,} px down</td></tr>'
observations+='''</tbody></table></div><p class="reason">New local Chrome observations at a 950-pixel viewport height. These are page positions, not reading times. They differ from 52’s archived measurements; no cross-run speed or learning comparison is inferred.</p><div class="source-links"><a href="observations/pair-browser.json">New browser receipt</a><a href="baseline-52/reader-study.md">Original separate-reader protocol</a><a href="baseline-52/reader-results.md">Original empty study slots</a><a href="baseline-52/reader-a.html">Repaired packet A</a><a href="baseline-52/reader-b.html">Repaired packet B</a></div><h3>The prepared validation comparison in 49</h3><p>I read its PR-131 packets and four retained phase-one accounts. R1/R3 were given “the worker parent reparses the snapshot”; they left construction ordering and failure delivery unresolved. R2/R4 were given parsing before Worker construction and predicted a synchronous constructor failure with no newly spawned worker. Those are 49’s existing agent-reader observations, not new participants or human evidence. The two passages differ in length and content, so this is not an isolated wording-length experiment.</p><p>51’s P4 and both repaired 52 layouts now carry that ordering at the front. The retained comparison supports checking what a parent lets a reader predict; it does not establish a preference between compact and fuller.</p><p><a href="evidence/49-validation-receipts.json">Exact passages, account excerpts and original-file hashes</a> · <a href="../49-follow-next-49/protocol.md">49’s protocol</a></p><p><a href="#result">↑ Findings</a></p></section>'''

limits='''<section id="scope"><p class="eyebrow">07 · Evidence boundaries</p><h2>What this run checked.</h2><p>The supplied PR body, commit subjects, file inventory and selected patch/source regions support the review. The repaired pair reuses 52’s full thirty-proposition ledger and frozen evidence; it is not a new independent extraction of every implicit decision. Its 123 pre-existing source snapshots were compared byte-for-byte with pinned PR-131 git objects, plus program.ts at base and head for the dependency witness. Hashes establish provenance, not semantics.</p><p>51’s all-front text was retained to avoid false missing-parent findings. Its four PR-131 bullets and opened policy table were captured from the running page. Linked helper excerpts were copied from its existing final-stack evidence with their stage labels intact. Other PRs’ source was not independently reviewed. Earlier experiments read: 49, 51, 52, 54 and the relevant 51/52 rows of 55; other experiments were ignored except mentions in those records. No network research, symnav mutation, publishing, verdict controls or response storage was used.</p><p><a href="evidence/preparation.json">Source/copy provenance</a> · <a href="evidence/51-parents.json">Frozen parent text</a> · <a href="audit-data.json">Manual audit data</a> · <a href="parent-repairs.md">Candidate parent additions</a> · <a href="verification.json">Artifact verification</a></p><p><a href="#result">↑ Findings</a></p></section>'''

(ROOT/'index.html').write_text(shell(top+repair+authored+desc+cross+cases+observations+limits))
(ROOT/'audit-data.json').write_text(json.dumps({'scope':'PR-131 descendants of 51; all thirty 52 propositions cross-referenced as comparison frame. Manual editorial judgments, not semantic proof.','authored':AUTHORED,'descendants':DETAILS,'crosswalk':CROSSWALK,'cases':CASES},indent=2,ensure_ascii=False)+'\n')
repairs=['# Candidate parent additions','', 'These are concrete editorial proposals for the audited PR-131 relationships. They are not an applied rewrite of 51’s whole-stack page or a claim that the other 113 author-bullet mappings were audited. Existing ancestors and unrelated front consequences must be retained.','']
for d in DETAILS:
    repairs.extend(['## '+d['title'],'',d['repair'],'',d['reason'],''])
(ROOT/'parent-repairs.md').write_text('\n'.join(repairs))

# Retain only the assigned PR's comparison excerpts from 49, with exact locations.
receipt=[]
r49=ROOT.parent/'49-follow-next-49'
receipt_file=ROOT/'evidence/49-validation-receipts.json'
if receipt_file.exists():
    receipt=json.loads(receipt_file.read_text())
for rel,first,last in ([] if receipt else [('packets/R1-top.md',128,138),('packets/R2-top.md',127,142),('readers/R1/phase1.md',26,37),('readers/R2/phase1.md',25,35),('readers/R3/phase1.md',19,25),('readers/R4/phase1.md',26,34)]):
    data=(r49/rel).read_bytes();lines=data.decode().splitlines()
    receipt.append({'source':'49-follow-next-49/'+rel,'sha256':hashlib.sha256(data).hexdigest(),'first':first,'last':last,'text':'\n'.join(lines[first-1:last]),'status':'Inherited observation, read here; no new participant'})
    if rel.startswith('readers/'):
        seal=json.loads((r49/Path(rel).parent/'phase1-seal.json').read_text())
        assert seal['sha256']==hashlib.sha256(data).hexdigest(), rel
        receipt[-1]['original_seal_verified']=seal
receipt_file.write_text(json.dumps(receipt,indent=2,ensure_ascii=False)+'\n')
print('Built index.html, frozen witnesses, candidate additions and manual crosswalk.')
