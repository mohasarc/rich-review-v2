import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {readings} from '../src/content.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inventory=JSON.parse(fs.readFileSync(path.join(root,'evidence/inventory.json')));
const sources=JSON.parse(fs.readFileSync(path.join(root,'evidence/sources.json')));
for(const r of readings){
 for(const [key,start,end] of r.sources){if(!sources[key]||start<1||end<start||end>sources[key].lines.length)throw new Error(`Invalid receipt ${r.id}: ${key} ${start}..${end} / ${sources[key]?.lines.length}`);}
}
const rows=readings.map((r,i)=>`<article class="register-row" id="decision-${r.id}"><span class="register-number">${r.number}</span><h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p><p class="reason">${esc(r.reason)}</p><button data-reading="${i}" data-scroll="true" aria-label="Locate reading ${r.number} in the constellation">Locate ↗</button></article>`).join('\n');
const index=path.join(root,'index.html');
let html=fs.readFileSync(index,'utf8').replace(/<div id="reading-register">[\s\S]*?<\/div>/,`<div id="reading-register">${rows}</div>`).replace(/92 FILES · \d+ SELECTED DEPENDENCIES/,`92 FILES · ${inventory.dependencies} SELECTED DEPENDENCIES`);
fs.writeFileSync(index,html);
fs.writeFileSync(path.join(root,'evidence/decision-register.md'),'# Daemon constellation — complete decision register\n\nScope: PR 148 daemon ownership. These seven readings are the complete stopping layer for this artifact. The source map does not attempt a complete behavioral explanation of the PR.\n\n'+readings.map(r=>`## ${r.number} — ${r.title}\n\n${r.summary}\n\n${r.reason}\n\nSource receipts (key in sources.json; inclusive line numbers):\n\n${r.sources.map(([s,a,b])=>'- `'+s+'` · '+a+'–'+b).join('\n')}\n`).join('\n')+'\nExisting symnav tests were not run. The dependency graph is traced from source, not an observed execution. No human comprehension study was conducted.\n');
fs.writeFileSync(path.join(root,'evidence/pyramid-map.json'),JSON.stringify(readings.map(r=>({id:r.id,title:r.title,surface:r.summary,rationale:r.reason,descent:r.caption,teachback:{question:r.challenge,answer:r.answer},focus:r.focus,sources:r.sources})),null,2));
await build({entryPoints:[path.join(root,'src/app.js')],bundle:true,minify:true,format:'iife',outfile:path.join(root,'app.js')});
console.log(`Built ${readings.length} complete records, ${readings.reduce((a,r)=>a+r.sources.length,0)} reading receipts, local browser bundle.`);
