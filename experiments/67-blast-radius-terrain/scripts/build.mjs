import fs from 'node:fs';
import path from 'node:path';
import {build} from 'esbuild';
import {records} from '../src/records.mjs';
const out=path.resolve(import.meta.dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(out,'evidence/capture.json'),'utf8'));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
for(const record of records){
 record.receipts=record.receipts.map(r=>{
  const source=r.file==='intent'?'intent':r.side+'--'+r.file.replaceAll('/','--');
  const doc=data.sources[source]; if(!doc) throw Error('Missing source '+source);
  const lines=doc.text.split('\n'), index=lines.findIndex(x=>x.includes(r.needle));
  if(index<0) throw Error('Missing needle '+r.file+': '+r.needle);
  return {...r,source,line:index+1,start:Math.max(1,index+1-r.before),end:Math.min(lines.length,index+1+r.after)};
 });
}
data.records=records;
data.unionReaders=[...new Set(data.peaks.flatMap(x=>x.files))].sort();
// The maximum spanning tree keeps the six strongest independent overlaps.
const components=new Map(data.peaks.map(x=>[x.id,x.id]));
const find=x=>components.get(x)===x?x:find(components.get(x));
data.ridges=[];
for(const link of [...data.links].sort((a,b)=>b.count-a.count || (a.source+a.target).localeCompare(b.source+b.target))){
 const a=find(link.source),b=find(link.target); if(a===b)continue;
 components.set(a,b); data.ridges.push(link);
}
fs.writeFileSync(path.join(out,'src/data.json'),JSON.stringify(data));
fs.writeFileSync(path.join(out,'evidence/decision-register.md'),'# Complete survey\n\n'+records.map(r=>`## ${r.number} · ${r.name}\n\n${r.title} ${r.summary}\n\n**${r.status} reason:** ${r.reason}\n`).join('\n'));
fs.writeFileSync(path.join(out,'evidence/pyramid-map.json'),JSON.stringify(records.map(r=>({id:r.id,surface:r.title+' '+r.summary,detail:r.detail,receipts:r.receipts})),null,2));
fs.mkdirSync(path.join(out,'evidence/source'),{recursive:true});
for(const doc of Object.values(data.sources)){
 const lines=doc.text.split('\n');
 const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(doc.file)} · ${doc.side}</title><style>body{background:#f5f3e9;color:#29382f;margin:28px;font:14px/1.65 system-ui}header{position:sticky;top:0;background:#f5f3e9;padding:10px 0;border-bottom:1px solid #bdc2b2}h1{font-size:18px;overflow-wrap:anywhere}pre{overflow:auto;font:12px/1.8 ui-monospace,monospace}.line{display:block;min-width:max-content;scroll-margin-top:140px}.line:target{background:#f6d68b}.line a{color:#697969;display:inline-block;min-width:4em;text-decoration:none}p{overflow-wrap:anywhere}</style><header><a href="../../index.html">← Terrain</a><h1>${esc(doc.side.toUpperCase())} · ${esc(doc.file)}</h1><p>${esc(doc.sha)} · SHA-256 ${doc.hash}</p></header><pre>${lines.map((line,i)=>`<span class="line" id="L${i+1}"><a href="#L${i+1}">${i+1}</a>${esc(line)}</span>`).join('')}</pre></html>`;
 fs.writeFileSync(path.join(out,'evidence/source',doc.id+'.html'),html);
}
const survey=records.map(r=>`<article class="survey-row ${r.kind}" id="survey-${r.id}" style="--biome:${r.color}"><a class="survey-name" href="#reading-${r.id}" data-select="${r.id}"><span>${r.number}</span><strong>${r.name}</strong><span class="count">${data.peaks.find(p=>p.id===r.id)?.count??'—'}</span><i>↗</i></a><div><h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p><p class="reason"><b>${r.status} reason</b> · ${esc(r.reason)}</p></div></article>`).join('');
const sourcebook=records.map(r=>`<section id="reading-${r.id}"><h3>${r.number} · ${r.name}</h3><p>${esc(r.detail)}</p><ul>${r.receipts.map(x=>`<li><a href="evidence/source/${x.source}.html#L${x.line}">${esc(x.label)} · ${x.side}:${x.line}</a></li>`).join('')}</ul><a href="#survey-${r.id}">↑ Return to survey</a></section>`).join('');
const template=fs.readFileSync(path.join(out,'src/template.html'),'utf8');
fs.writeFileSync(path.join(out,'index.html'),template.replace('<!--SURVEY-->',survey).replace('<!--SOURCEBOOK-->',sourcebook).replaceAll('<!--READERCOUNT-->',String(data.unionReaders.length)));
await build({entryPoints:[path.join(out,'src/app.mjs')],bundle:true,format:'iife',target:'es2022',minify:true,outfile:path.join(out,'app.js'),legalComments:'eof'});
fs.copyFileSync(path.join(out,'src/style.css'),path.join(out,'style.css'));
console.log(JSON.stringify({records:records.length,receipts:records.reduce((a,r)=>a+r.receipts.length,0),readers:data.unionReaders.length,ridges:data.ridges,sources:Object.keys(data.sources).length},null,2));
