from pathlib import Path
import json, hashlib

OUT = Path(__file__).resolve().parent
capture = json.loads((OUT/'captures/rendered.json').read_text())['rows']
questions = {
 '127': 'A definition query has returned promise P. Backend release starts while project-graph cleanup remains pending, and cleanup later rejects with E. At the supplied base and head, predict: when cache lookup stops returning P, whether P is cancelled, whether the same cache handle can be used again, and when/how backend release settles. Also predict what happens to the current successful semantic turn if refresh fails. Distinguish supported predictions from unknowns.',
 'validation': 'A serialized worker-policy snapshot is invalid under its parser. A caller constructs the parent navigation-worker wrapper. Predict whether construction returns a wrapper, whether a worker thread can already exist when validation fails, and through which channel the failure reaches the caller. What ordering does the passage establish, and what remains unknown?',
 'owner': 'Configured projects are visited in order A, then B. Both claim file shared.ts. Predict the primary project for that file, all configured owners, the result if order is reversed, and where an unowned file goes. Explain which claim in the passage supports each prediction.',
 '23': 'Consider correctly shaped requests with a matching instance and, where applicable, compatible protocol. Predict which credential checks ping, stop, execute, identify, terminate and kill must pass when the token is absent or wrong. Passing credentials does not imply the command succeeds. Separately, can the host omit policy when constructing DaemonClient? If it can, who supplies policy? Identify any answer the top cannot determine.',
 '29': 'Compare a standalone request queue with no supplied time callback and a queue composed by the daemon process. At the base and head, predict their elapsed-time sources. If Date.now jumps backward while monotonic time advances normally, which queue measurement is exposed? Does the passage imply that all daemon deadlines switch to monotonic time? Identify what is unknown.',
}
assignments = {
 'R1': {'variant':'original','validation':'general','owner':'first'},
 'R2': {'variant':'original','validation':'explicit','owner':'last'},
 'R3': {'variant':'revised','validation':'general','owner':'first'},
 'R4': {'variant':'revised','validation':'explicit','owner':'last'},
}
records=[]
for reader, a in assignments.items():
    (OUT/'readers'/reader).mkdir(exist_ok=True)
    sections = [('127','127-top'),('validation','validation-'+a['validation']),('owner','owner-'+a['owner']),('23','23-'+a['variant']+'-top'),('29','29-'+a['variant']+'-top')]
    text = '# Reader '+reader+' · phase 1\n\nThese are verbatim rendered top-layer passages, selected for a focused prediction task. The three smaller passages are excerpts, not whole-page evaluations. Read only this packet; source and other readers are withheld. Do not follow links. Do not assume the explanation is true. Separate a prediction licensed by the passage from an independent guess.\n'
    for case,key in sections:
        text += '\n## Case '+case+'\n\n'+capture[key]['text']+'\n\n### Prediction task\n\n'+questions[case]+'\n'
    file=OUT/'packets'/f'{reader}-top.md'; file.write_text(text)
    descent = '# Reader '+reader+' · phase 2\n\nYour phase-1 response is sealed. Do not alter it. These are the same authored descent destinations for page 23 (D13, D04) and page 29 (A1). Source excerpts embedded at page 23’s leaf are deliberately withheld here. Compare these explanations with your phase-1 answers; record what you can now predict, what was already supported at the top, and any new actionable decision. No source reading yet.\n'
    for key in ['23-'+a['variant']+'-D13','23-'+a['variant']+'-D04','29-'+a['variant']+'-A1']:
        descent += '\n## '+key.split('-',1)[0]+' · destination '+key.rsplit('-',1)[1]+'\n\n'+capture[key]['text']+'\n'
    (OUT/'packets'/f'{reader}-descent.md').write_text(descent)
    records.append({'reader':reader,**a,'top_sha256':hashlib.sha256(text.encode()).hexdigest(),'descent_sha256':hashlib.sha256(descent.encode()).hexdigest(),'top_sources':{case:{k:capture[key][k] for k in ['url','selector']} for case,key in sections}})
(OUT/'packets/assignments.json').write_text(json.dumps(records,indent=2)+'\n')
print('Four top packets and four separate descent packets prepared.')
