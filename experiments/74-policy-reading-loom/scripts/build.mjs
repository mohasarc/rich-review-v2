import {build} from 'esbuild';
import {readFileSync, writeFileSync, readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';
const out=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const model=JSON.parse(readFileSync(resolve(out,'evidence/model.json'),'utf8'));
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const notes=model.notes.map(n=>`<article class="reading" id="reading-${n.id}"><span class="reading-number">${n.id}</span><div><h3>${escape(n.title)}</h3><p>${escape(n.text)}</p><p class="reason"><span class="state ${n.state}">${n.state==='stated'?'S · Stated':'U · Unexplained'}</span> ${escape(n.reason)}</p><a class="inspect-reading" data-note="${n.id}" href="#row=${n.cell.split(':')[0]}&slice=${n.cell.split(':')[1]}&depth=wiring&note=${n.id}">Follow this reading ↗</a> <a href="evidence.html#${n.refs[0]}">Source receipt</a></div></article>`).join('');
const sourceBook=Object.entries(model.receipts).map(([id,r])=>{const s=model.sources[r.source];const lines=s.text.split('\n');return `<article id="${id}"><h2>${escape(id)} · ${escape(s.revision)} ${s.sha.slice(0,8)}</h2><p>${escape(s.path)}:${r.start}–${r.end} · <a href="https://github.com/mohasarc/symnav/blob/${s.sha}/${s.path}#L${r.start}">Commit-pinned original</a></p><pre>${lines.slice(r.start-1,r.end).map((l,i)=>`<span id="${id}-L${r.start+i}"><b>${r.start+i}</b> ${escape(l)}</span>`).join('\n')}</pre><a href="index.html">Return to loom</a></article>`;}).join('');
writeFileSync(resolve(out,'evidence.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Policy loom · source book</title><style>body{max-width:1100px;margin:40px auto;padding:0 20px;background:#f5f2e9;color:#243a35;font:16px/1.5 system-ui}a{color:#12676c}h1,h2{font-family:Georgia,serif}article{border-top:1px solid #aaa;padding:25px 0}pre{overflow:auto;font:12px/1.6 monospace;padding:20px;background:#fffdf6}pre span{display:block}pre b{display:inline-block;width:4em;color:#8a8d84}p{overflow-wrap:anywhere}:target{background:#fff0ba}</style><a href="index.html">← The policy reading loom</a><h1>The source book</h1><p>${Object.keys(model.receipts).length} exact excerpts from ${Object.keys(model.sources).length} files pinned to PR #131 base/head. These are source receipts, not test execution results. <a href="evidence/diff.patch">Complete supplied diff</a>.</p>${sourceBook}</html>`);
let html=readFileSync(resolve(out,'src/index.html'),'utf8').replace('<!--READINGS-->',notes);
writeFileSync(resolve(out,'index.html'),html);
await build({entryPoints:[resolve(out,'src/app.js')],outfile:resolve(out,'app.js'),bundle:true,minify:true,format:'iife',legalComments:'eof',logLevel:'silent'});
let licenses=[];
for(const name of readdirSync(resolve(out,'node_modules')).filter(n=>n==='d3'||n.startsWith('d3-')||n==='internmap')) {
  try{licenses.push(name+'\n'+readFileSync(resolve(out,'node_modules',name,'LICENSE'),'utf8'));}catch{}
}
writeFileSync(resolve(out,'THIRD-PARTY-NOTICES.txt'),licenses.join('\n\n'));
console.log('Built offline index.html, app.js and evidence.html.');
