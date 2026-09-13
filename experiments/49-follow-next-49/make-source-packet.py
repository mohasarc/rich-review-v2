from pathlib import Path
import json
OUT=Path(__file__).resolve().parent
manifest=json.loads((OUT/'source/manifest.json').read_text())
records={x['file']:x for x in manifest['files']}
groups={
 '127':[
  ('127-base-backend.ts',79,89),('127-head-backend.ts',79,89),
  ('127-base-service.ts',49,70),('127-base-service.ts',125,128),('127-base-service.ts',219,226),
  ('127-head-service.ts',29,79),('127-head-service.ts',129,132),('127-head-scope.ts',1,46)],
 'validation':[
  ('131-base-worker.ts',77,97),('131-base-entry.ts',38,49),
  ('131-head-worker.ts',78,101),('131-head-policy.ts',162,164),('131-head-policy.ts',185,194)],
 'owner':[
  ('stack-head-graph.ts',154,166),('stack-head-graph.ts',319,340),('127-head-graph.ts',319,340)],
 '23':[
  ('148-head-coordinator.ts',353,407),('148-head-coordinator.ts',417,425),
  ('148-head-coordinator.ts',469,501),('148-head-admission.ts',45,51),('148-head-admission.ts',78,93),
  ('148-head-contracts.ts',10,18),('148-head-runtime.ts',85,90)],
 '29':[
  ('148-base-queue.ts',29,35),('148-base-queue.ts',64,78),('148-head-queue.ts',29,38),('148-head-queue.ts',67,83),
  ('148-base-coordinator.ts',85,95),('148-head-coordinator.ts',84,94),('148-head-clock.ts',1,28),
  ('148-head-activity.ts',103,122)]
}
text='# Phase 3 · pinned source excerpts\n\nThe first two responses are sealed. Compare them with these selected source excerpts. They were freshly extracted with git show at the commits below, not run as a daemon. This is a focused source comparison, not an exhaustive source audit. For each of the five cases record what source confirms, corrects or leaves undecided; identify any difference between learning from the top, from the authored descent, and from source. Do not revise earlier files or consult other readers.\n'
for group,refs in groups.items():
    text+='\n## Case '+group+'\n'
    for file,start,end in refs:
        record=records[file]
        lines=(OUT/'source'/file).read_text().splitlines()
        assert end<=len(lines),(file,end,len(lines))
        text+='\n### '+file+f' · L{start}–{end}\n\n'+record['commit']+' · '+record['path']+'\n\n```ts\n'
        text+='\n'.join(f'{i:4} {lines[i-1]}' for i in range(start,end+1))+'\n```\n'
(OUT/'packets/source.md').write_text(text)
(OUT/'source/excerpt-ranges.json').write_text(json.dumps(groups,indent=2)+'\n')
print('Prepared the source phase:',len(text),'characters; no source annotations prescribe answers.')
