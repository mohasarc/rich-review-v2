import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(await fs.readFile(path.join(root,'src/data.json'),'utf8'));
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let template=await fs.readFile(path.join(root,'src/template.html'),'utf8');
const readings=data.readings.map(r=>`<article class="bulletin" id="${r.id}"><a class="reading-number" href="#mechanism-${r.id}" data-reading="${r.id}" aria-label="Read ${r.number}: ${esc(r.title)}">${r.number}<span>↗</span></a><div><h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p><p class="reason"><span class="status ${r.status}">${r.status==='mixed'?'STATED + UNEXPLAINED':'STATED'}</span> ${esc(r.reason)}</p></div></article>`).join('\n');
const mechanisms=data.readings.map(r=>`<section id="mechanism-${r.id}" class="mechanism"><h3>${r.number} / ${esc(r.title)}</h3><p>${esc(r.mechanism)}</p><p>${esc(r.detail)}</p><div class="receipts">${r.receipts.map((q,i)=>`<a href="evidence/sources/${q.source}.${q.source.startsWith('pr-')?'txt':'html'}${q.source.startsWith('pr-')?'':`#L${q.start}`}" data-receipt="${r.id}:${i}">${esc(q.label)} <span>↗</span></a>`).join('')}</div><a class="return" href="#${r.id}">↑ Return to reading ${r.number}</a></section>`).join('\n');
// All source pages are available even if JavaScript is disabled.
for(const s of Object.values(data.sources).filter(s=>s.key.startsWith('pr-'))){
 await fs.writeFile(path.join(root,'evidence/sources',s.key+'.txt'),s.text);
}
template=template.replace('<!-- BULLETINS -->',readings).replace('<!-- MECHANISMS -->',mechanisms);
await fs.writeFile(path.join(root,'index.html'),template);
await fs.copyFile(path.join(root,'src/style.css'),path.join(root,'style.css'));
await build({entryPoints:[path.join(root,'src/app.js')],outfile:path.join(root,'app.js'),bundle:true,format:'iife',target:'es2020',minify:true,legalComments:'eof'});
const packages=(await fs.readdir(path.join(root,'node_modules'))).filter(n=>n==='d3'||n.startsWith('d3-')||n==='internmap');
const notices=[];
for(const name of packages){try{notices.push(`${name}\n${await fs.readFile(path.join(root,'node_modules',name,'LICENSE'),'utf8')}`)}catch{}}
await fs.writeFile(path.join(root,'THIRD-PARTY-NOTICES.txt'),notices.join('\n\n--------------------\n\n'));
console.log('Built offline page, source book, D3 bundle and license notices.');
