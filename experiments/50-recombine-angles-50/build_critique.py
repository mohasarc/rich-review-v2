from pathlib import Path
from html import escape
from datetime import datetime,timezone
import hashlib,json,re
from build import shell,md
OUT=Path(__file__).resolve().parent
manifest=json.loads((OUT/'manifest.json').read_text())
notes=json.loads((OUT/'reading/page-only-notes.json').read_text())
post={
'03':('My missed implication / source correction','The canonical registry predicate tightens instance-only answers (R3). The plan supplies a policy-testing retirement condition (R9), even though the precise removed assertions can remain unexplained. The page already names constructor-time loading and malformed disposal; those are not new misses.','Carry the altered outcome and the narrow reason together.'),
'06':('No new material decision found in the sampled comparison','The read path already separates a host-process client from a daemon-process coordinator, fresh local executors from retained composition, and policy migration rationale. I independently confirmed those selected claims in R1/R4/R9. Producer-reported executions were not repeated.','Use the two box systems; preserve the execution provenance.'),
'08':('Lead independently checked','Its mismatched-identity example points to a real source-level difference: base instance-only matching versus head identity+instance matching. R3 reproduces the source reasoning, not the reported synthetic execution.','Open with the consequence, with the synthetic assumption visible.'),
'12':('Added precision / sampled omission','R2 distinguishes the new direct-constructor validation contract from validation already in the base entry. R9 recovers the retirement condition missing from the page’s broad absence claim. Optional host policy was reported as a descent by 42; I do not claim an independent full route check on 12.','Separate the implementation move, timing consequence and recorded reason.'),
'18':('Confirmed frame / source refinement','Frozen describes the head after live CLI preparation. R3 makes the stricter ownership outcome explicit; R9 confirms planned temporary-export retirement. A preserved protocol/policy frame does not imply every branch is byte-for-byte equivalent.','Keep preserved boundaries, but name the altered answer beside them.'),
'23':('Reproduced descent / source correction','After sealing, I followed Whole change → Public client: optional policy is explicit in the room and absent from the visible outline. This supports 42/46’s editorial authority-boundary concern. R9 supplies the missing retirement condition; R4 supplies the stated status-timeout reason. D11’s source adds validation fidelity; I did not establish a new entry catch outcome.','Use a finite outline, but put host policy authority and the correct reason in it.'),
'27':('Source-confirmed observation limits','R7 verifies the version-test path change, seven removed timing expectations and the old 257 MiB entry handoff. R8 checks the local clock scan and public/runtime split. Central registry ownership does have general plan support; its precise predicate outcomes still need a separate reason.','Keep implementation, stimulus and observation in one frame.'),
'29':('Confirmed decomposition / source refinement','The four cuts distinguish live preparation from staging. R9 supplies the temporary-export retirement condition. The clock-source guard is new at the PR head; base had no guard. A broader intermediate scan is not a base-to-head removal.','Treat the cuts as explanatory units, not verified cherry-picks.'),
'35':('Missing record context corrected','The plan contains both the policy-testing retirement condition (R9) and a specific reason for status versus ordinary response timeouts (R4). Those reasons should not be extended to all retained controller or disabled-control choices.','Preserve intermediate history and proposition-sized rationale.'),
'32-starter':('Deliberately partial surface','It explicitly describes one ownership decision and links the complete review. No full-change source inventory was expected from this starter.','Partial is honest when its parent scope is explicit.'),
'40':('Attributed reconciliation','The page credits predecessor recordings and separates code ownership, object identity and completion. I read it as a synthesis; shared source/data do not provide an independent human confirmation. No pr-127 code was rereviewed for this pr-148 artifact.','Copy the discipline of reconciling propositions; no recording or implementation was copied.'),
}
text='''# A source-backed account still needs precise boundaries

[Open the PR #148 page](index.html) · [Return to its comparison](index.html#comparison)

The strongest recombination is editorial: tell the reader which answer changes, whose object lives where, and exactly what an assertion observes. Most inspected #148 pages already disclose staged ownership and test relocation. Repeating that inventory is less useful than distinguishing a changed outcome from a moved responsibility, and a missing source from an unexplained choice.

The consequential corrections are concrete. The live registry can reject a same-instance lock because its identity conflicts. Constructor validation is newly placed at the object boundary, while entry validation already existed. Worker→CLI version rejection, generic readiness timing and the deleted 257 MiB entry handoff are different test propositions. The pinned policy plan explicitly gives a retirement condition for `policy-testing` and a reason for the separate status timeout. These findings are developed in [the page’s nine receipts](index.html#receipts).

This is one sequential agent reader, already primed by the PR body, metadata and overlapping earlier pages. It is **not an independent human recall study**. The [40 page-only notes](reading/page-only-notes.json) were sealed before reading the raw bundle patch or any predecessor critique body. The seal allows page-authored source, and 23/D11 included an embedded code excerpt. Subsequent checks are kept in a separate column. Other subjects supply representation ideas; their code is outside this PR #148 source review.

<a id="descent"></a>
The concrete sampled descent is **23 → Public client**. Its visible outline says “executor/environment inputs”; the room specifies “optional policy.” I consider supplying policy an authority choice, so this belongs above that descent. This is an editorial judgment, previously reported by [42](../42-fresh-reader-refresh-10/review.md) and [46](../46-fresh-reader-refresh-30/index.html), and reproduced here after the seal. [Post-seal room capture](reading/23-policy-route-after-seal.json), [outline screenshot](screenshots/23-outline.png), [D11 screenshot](screenshots/23-coordinate-descent.png). The D11 screenshot is a separate route and is not offered as the optional-policy witness.

The comparison is complete for this bounded reading: **40 page entries** in linear experiment order, including 32’s starter and both 33 openings. “No new material decision found” is allowed. A row about another PR records a design observation, not a correctness check of that PR. Capturing all body text does not establish that every hidden or off-camera line was read.

| Page and reading receipt | What I reconstructed before the patch | What source added, corrected, or left uncertain | Missing / repeated / promising for this recombination |
| --- | --- | --- | --- |
'''
comparisons=[]
for row in notes['rows']:
 ident=row['id'];entry=f'../{row["experiment"]}/{row["entry"]}'
 category,followup,use=post.get(ident,('Representation-only reading','No additional PR subject was source-reviewed. This route supplied an editorial lens; absence from my short note is not proof of absence from the page.',row['editorial_question']))
 rec={'id':ident,'experiment':row['experiment'],'entry':entry,'sealed_note':row['page_learned'],'pre_source_question':row['editorial_question'],'classification':category,'post_source':followup,'editorial_use':use,'capture':f'reading/{ident}.json'}
 comparisons.append(rec)
 text+=f'| <a id="p{ident}"></a>[{ident} · {row["experiment"]}]({entry})<br>[Captured text](reading/{ident}.json) | {row["page_learned"]} | **{category}.** {followup} | {use} [Return to page](index.html#comparison) |\n'
text+='''
## What was inherited and what was checked

[38](../38-critique/critique.md) names the large decision-register problem and the missing migration context. [39](../39-fresh-reader-check/index.html) supplies an earlier agent reader record; its shared concepts are not fresh human evidence. [41](../41-critique-refresh-10/critique.md) and [43](../43-critique-refresh-20/critique.md) distinguish exact reasons from broad labels, including the migration and status-clock record. [42](../42-fresh-reader-refresh-10/review.md) and [46](../46-fresh-reader-refresh-30/index.html) identify the optional-policy descent. [44](../44-fresh-reader-refresh-20/critique.md) carefully separates recall misses from page omissions. [45](../45-critique-refresh-30/critique.md) explains why accumulating representations in 40 is not itself evidence of improved comprehension.

Those are attributed influences, not additional independent confirmations. I checked the #148 predicates, client/runtime/route, construction, test diffs and pinned policy paragraphs myself. I reproduced 23’s optional-policy route after reading the prior finding. I did not reproduce the critiques’ claims about #127 primary ownership, #131 spill stimuli or other PR failures. They are outside this artifact’s assigned source subject.

The worker parent’s synchronous policy parsing is present in the #148 base. It must not be imported as a new #148 decision from the #131 critiques. My sealed D11 question about a changed entry catch outcome also did not survive as a finding: I established constructor validation order and added direct-call rejection, while earlier entry validation was already present. This is a correction to my hypothesis, not a hidden flaw assigned to the page.

## One ledger row for every finished experiment, 01–46

The finished set is fixed by the manifest. READMEs supplied entry/kind/subject metadata and selected declarations. All 40 subject entries were opened in an isolated browser; the text reading was sampled. For the eight critique entries, I read openings and selected #148/editorial findings after sealing. This ledger does not imply an exhaustive interaction pass through every page or every byte of each README.

| Experiment | Declared kind and subject | Inspection / contribution | Reuse boundary |
| --- | --- | --- | --- |
'''
meta={
38:('critique.md','Large complete inventories still require human understanding evidence; migration record resolves reason disagreement.'),
39:('index.html','Sealed sequential agent reading distinguishes learned decisions from later source checks.'),
41:('critique.md','Exact proposition/rationale scope; the historical migration condition and status clock.'),
42:('review.md','Attributed optional-policy descent; not a source review of every reported subject.'),
43:('critique.md','A reproducible bounded route is stronger than an unqualified completeness label.'),
44:('critique.md','A recall miss can be in the top already; preserve the sealed mistake instead of silently repairing it.'),
45:('critique.md','40 is reconciliation and accumulation; donor count is not a learning measure.'),
46:('index.html','Attributed optional-policy descent and wide-diff scope limits; checked #148 context independently.'),
}
ledger=[]
for exp in manifest['experiments']:
 n=int(exp['experiment'][:2]); pages=[x for x in comparisons if x['experiment']==exp['experiment']]
 if n in meta:
  entry,note=meta[n];reuse='Read after seal; attributed findings only.'
 else:
  entry=next(x['entry'] for x in manifest['pages'] if x['experiment']==exp['experiment'])
  note=' / '.join(x['sealed_note'] for x in pages);reuse='Representation/concept only; no implementation or runtime data copied.'
 mdta=exp['metadata'];kind=mdta['Kind'].split('\n')[0].replace('|',' / ');subject=mdta['Subjects'].split('\n')[0].replace('|',' / ')
 kind=re.sub(r'\[([^]]+)\]\([^)]+\)',r'\1',kind);subject=re.sub(r'\[([^]]+)\]\([^)]+\)',r'\1',subject)
 rec={'experiment':exp['experiment'],'entry':entry,'kind':kind,'subject':subject,'inspection':note,'reuse':reuse};ledger.append(rec)
 text+=f'| <a id="e{n:02}"></a>[{exp["experiment"]}](../{exp["experiment"]}/{entry}) · [README](../{exp["experiment"]}/README.md) | {kind}<br>{subject} | {note} | {reuse} |\n'
text+='''
## Inspection limits and receipts

The initial canvas click attempted visible text as the accessible name and timed out because the button adds an ARIA prefix. A corrected selector reached D11. That was an inspection error, not an inaccessible-page finding. The two retained screenshots establish the visible camera state; the body dump also contains off-camera rooms. A later Public client route records viewport-intersecting text separately. Viewport intersection is still not a comprehension measure.

The full 153-path #148 inventory and exact bundle patch were pinned. A copy-aware Git comparison helped separate relocation from edits; it does not prove semantic equivalence. The source review emphasized new client/runtime/routing, live CLI registry/clock/coordinator changes, test observation changes and unchanged rationale documents. Copied transport/session bodies and helper internals received inventory/context inspection, not a second exhaustive correctness audit. File-to-decision assignments are editorial receipts; their successful validation cannot establish that no decision was missed.

The current page has no gate, score, verdict, comment form or persistence. All decisions are in one visible comparison. Source disclosures add fidelity; they carry direct returns to their decision rows. The delivered HTML and Markdown need no server or symnav checkout. Rebuilding the artifact is optional.

[Input manifest](manifest.json) · [Machine-readable comparison](comparisons.json) · [46-row ledger](experiment-ledger.json) · [Sealed notes](reading/page-only-notes.json) · [Hash seal](reading/seal.json) · [Source manifest](source/manifest.json) · [Artifact checks](verification.json) · [Return to the PR page](index.html#change)
'''
(OUT/'critique.md').write_text(text)
(OUT/'critique.html').write_text(shell('What the reader can predict · experiment 50 critique','<nav class="nav"><strong>50 / READING RECEIPTS</strong><a href="index.html">PR #148 page</a><a href="critique.md">Markdown</a><a href="README.md">README</a></nav><main class="wrap">'+md(text).replace('<table>','<div class="tablewrap"><table>').replace('</table>','</table></div>')+'</main>'))
(OUT/'comparisons.json').write_text(json.dumps(comparisons,indent=2)+'\n')
(OUT/'experiment-ledger.json').write_text(json.dumps(ledger,indent=2)+'\n')
manifest['read_after_seal']=[{'experiment':e['experiment'],'entry':meta[int(e['experiment'][:2])][0],'scope':'opening and selected #148/editorial passages','sha256':hashlib.sha256((OUT.parent/e['experiment']/meta[int(e['experiment'][:2])][0]).read_bytes()).hexdigest()} for e in manifest['experiments'] if int(e['experiment'][:2]) in meta]
manifest['source_scope']='pr-148 only; all changed-file inventory plus focused semantic source/test/rationale comparison; unchanged/copy bodies not exhaustively audited'
manifest['notes_sealed_at']=notes['sealed_at'];manifest['recombined_kind']='page plus Markdown critique receipts; conflicting predecessor no-page and no-critique-body declarations are adapted explicitly in README'
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Built 40-page comparison and 46-experiment ledger')
