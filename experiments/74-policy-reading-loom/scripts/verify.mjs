import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {DaemonPolicy} from '../evidence/probe-head.mjs';
const out=resolve(dirname(fileURLToPath(import.meta.url)),'..'),root=resolve(out,'../..');
const model=JSON.parse(readFileSync(resolve(out,'evidence/model.json'),'utf8'));
const hash=s=>createHash('sha256').update(s).digest('hex');
for(const [key,s] of Object.entries(model.sources)){
 const current=readFileSync(resolve(root,'worktrees/pr-131-'+s.revision,s.path));
 assert.equal(hash(current),s.sha256,key);assert.equal(hash(s.text),s.sha256,key);
 const git=execFileSync('git',['show',s.sha+':'+s.path],{cwd:resolve(root,'worktrees/pr-131-'+s.revision)});assert.equal(hash(git),s.sha256,key);
}
for(const [id,r] of Object.entries(model.receipts)){
 const lines=model.sources[r.source].text.split('\n');assert.ok(lines[r.anchor-1].includes(r.needle),id);assert.ok(r.start<=r.anchor&&r.anchor<=r.end,id);
}
const policy=DaemonPolicy.fromSystemMemory({totalBytes:1024**3}).values;
const parsedLabel=(label)=>{const [n,unit]=label.replaceAll(',','').split(' ');return Number(n)*({KiB:1024,MiB:1024**2,ms:1,s:1000,min:60000}[unit]||1);};
for(const f of model.fields){assert.ok(f.leaf in policy[f.slice]);if(f.value!=='derived')assert.equal(parsedLabel(f.value),policy[f.slice][f.leaf],f.id);}
for(const c of model.cells){assert.ok(model.rows.some(r=>r.id===c.row));assert.ok(model.slices.some(s=>s.id===c.slice));assert.ok(c.fields.length>0);assert.ok(c.notes.every(id=>model.notes.some(n=>n.id===id)));for(const ref of c.refs)assert.ok(model.receipts[ref]);}
const html=readFileSync(resolve(out,'index.html'),'utf8'),book=readFileSync(resolve(out,'evidence.html'),'utf8');
for(const note of model.notes){assert.ok(html.includes(`id="reading-${note.id}"`));assert.ok(note.refs.every(id=>book.includes(`id="${id}"`)));}
for(const f of ['README.md','brief.md','index.html','evidence.html','app.js','src/style.css','evidence/probe.json','THIRD-PARTY-NOTICES.txt'])assert.ok(existsSync(resolve(out,f)),f);
const links=[...html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)].map(m=>m[1]).filter(p=>!/^https?:|^data:/.test(p));
for(const link of links)assert.ok(existsSync(resolve(out,link)),link);
const statuses={};for(const revision of ['base','head']){statuses[revision]=execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:resolve(root,'worktrees/pr-131-'+revision),encoding:'utf8'}).trim();assert.equal(statuses[revision],'');}
const proof=JSON.parse(readFileSync(resolve(out,'evidence/probe.json'),'utf8'));assert.deepEqual(proof.builds.head.recordBytes,[4,4,2]);assert.deepEqual(proof.builds.base.recordBytes,[10]);assert.deepEqual(proof.pins,model.pins);
writeFileSync(resolve(out,'evidence/static-checks.json'),JSON.stringify({pinnedSources:Object.keys(model.sources).length,exactReceipts:Object.keys(model.receipts).length,fieldValuesChecked:model.fields.length,activeCrossings:model.cells.length,readings:model.notes.length,localLinks:links.length,probeAssertions:true,trackedWorktreeStatus:statuses,passed:true},null,2)+'\n');
const pyramid=model.notes.map(n=>`| ${n.id} | ${n.title} | ${n.state} | ${n.cell} | ${n.refs.map(r=>`[${r}](../evidence.html#${r})`).join(', ')} |`).join('\n');
writeFileSync(resolve(out,'evidence/pyramid-map.md'),'# Surface-to-evidence crosswalk\n\nThe opening, fabric/legend, and twelve open readings jointly form the complete stopping layer. The heading alone does not. Each cell lists its surface reading IDs; its wiring repeats the same decision at greater fidelity. Values and code paths refine those named decisions. Full source files necessarily contain unrelated context and are offered as raw audit material.\n\n| Reading | Surface decision or surprise | Reason state | Entry crossing | Receipts |\n| --- | --- | --- | --- | --- |\n'+pyramid+'\n');
writeFileSync(resolve(out,'evidence/field-map.md'),'# Curated field routes\n\nThis is an authored grouping of selected implementations, not an AST reference census. All code remains in apps/cli; slices come from the existing daemon package. effectiveMemoryBytes stays in derivation and is not drawn as a consumer leaf. Each cell has exact source receipts in model.json and in the inspector.\n\n| Leaf | Default | Purpose color | Drawn families | Forwarding within those families |\n| --- | --- | --- | --- | --- |\n'+model.fields.map(f=>`| ${f.id} | ${f.value} | ${f.purpose} | ${f.rows.join(', ')} | ${f.forward.join(', ')||'none'} |`).join('\n')+'\n');
console.log(`Verified ${Object.keys(model.sources).length} source blobs, ${Object.keys(model.receipts).length} receipts, all field values, local links and clean tracked worktrees.`);
