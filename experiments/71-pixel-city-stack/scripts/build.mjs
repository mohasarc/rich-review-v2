import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const readings=JSON.parse(fs.readFileSync(path.join(root,'src/readings.json'),'utf8'));
const html=readings.map(r=>`<article class="reading" id="reading-${r.id}" data-reading="${r.id}"><span class="reading-number">${r.number}</span><div><h3>${escape(r.title)}<span>${escape(r.range)}</span></h3><p>${escape(r.summary)}</p><p class="reason ${r.patch?'unknown':''}">${escape(r.reason)}</p><div class="reading-actions"><button data-reading-step="${r.id}">See skyline →</button><button data-reading-receipt="${r.id}">Reason receipts ↗</button></div></div><details><summary>Read this boundary more closely</summary><p>${escape(r.detail)}</p><div class="source-buttons">${r.files.map(f=>`<button data-source-path="${escape(f)}" data-source-step="${r.step}">${escape(f)} ↗</button>`).join('')}${r.patch?'<button id="worker-patch">Compare the moved worker test ↗</button>':''}</div></details></article>`).join('\n');
fs.writeFileSync(path.join(root,'index.html'),fs.readFileSync(path.join(root,'src/index.html'),'utf8').replace('__READINGS__',html));
fs.copyFileSync(path.join(root,'src/style.css'),path.join(root,'style.css'));
await build({entryPoints:[path.join(root,'src/app.mjs')],outfile:path.join(root,'app.js'),bundle:true,minify:true,format:'iife',target:['chrome110','safari16'],legalComments:'eof'});
for(const pkg of ['three','d3-hierarchy','gsap','pathfinding','esbuild']){
 const dir=path.join(root,'node_modules',pkg); const names=fs.readdirSync(dir).filter(n=>/^licen[cs]e/i.test(n));
 for(const n of names) if(fs.statSync(path.join(dir,n)).isFile()) fs.copyFileSync(path.join(dir,n),path.join(root,'vendor',`${pkg}-${n}`));
}
fs.copyFileSync(path.join(root,'node_modules/pathfinding/README.md'),path.join(root,'vendor/pathfinding-README-license.md'));
fs.copyFileSync(path.join(root,'node_modules/heap/README.md'),path.join(root,'vendor/heap-README-license.md'));
fs.copyFileSync(path.join(root,'node_modules/gsap/README.md'),path.join(root,'vendor/gsap-README.md'));
fs.writeFileSync(path.join(root,'vendor/gsap-license.txt'),'GSAP 3.13.0 — Copyright 2025 GreenSock, Inc.\nStandard No Charge GSAP License: https://gsap.com/community/standard-license/\nThe original license/copyright notice is retained in app.js.\n');
console.log('Built local index.html, style.css and app.js.');
