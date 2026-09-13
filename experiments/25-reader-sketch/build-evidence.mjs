import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const trees = {head:path.join(root,'worktrees/pr-131-head'),base:path.join(root,'worktrees/pr-131-base')};
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(here,'content.js'),'utf8'),context);
const notebook = context.window.NOTEBOOK;
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const slug = value => value.replace(/[^a-zA-Z0-9]+/g,'-');
const patch = fs.readFileSync(path.join(root,'inputs/pr-131/diff.patch'),'utf8');
const pr = JSON.parse(fs.readFileSync(path.join(root,'inputs/pr-131/pr.json'),'utf8'));
const chunks = patch.split(/(?=^diff --git )/m).filter(Boolean).map(text=>({path:text.split('\n')[0].split(' b/')[1],text}));
const data = {refs:{},fields:{},head:'b100221db48754656328391b878299c5a0bab443',base:'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e'};
for(const side of ['base','head']) {
  const actual = execFileSync('git',['rev-parse','HEAD'],{cwd:trees[side],encoding:'utf8'}).trim();
  if(actual !== data[side]) throw new Error(`Expected frozen ${side} revision ${data[side]}, found ${actual}`);
}
for(const file of ['packages/daemon/src/daemon-policy.ts','packages/daemon/src/daemon-policy.test.ts','plans/005/daemon-policy.md']) {
  if(fs.readFileSync(path.join(trees.head,file),'utf8') !== fs.readFileSync(path.join(trees.base,file),'utf8')) {
    throw new Error(`The notebook describes this base-layer context as unchanged: ${file}`);
  }
}
const clips=[];
for (const decision of notebook.decisions) {
  decision.refs.forEach((ref,index)=>{
    const side=ref.side||'head';
    const lines=fs.readFileSync(path.join(trees[side],ref.path),'utf8').split('\n');
    let found=lines.findIndex(line=>line.includes(ref.needle));
    if(found<0&&ref.fallback) found=lines.findIndex(line=>line.includes(ref.fallback));
    if(found<0) throw new Error(`Missing source anchor: ${ref.path} / ${ref.needle}`);
    const start=Math.max(0,found-(ref.before||0));
    const end=Math.min(lines.length,found+(ref.after??16)+1);
    const key=`${decision.id}-${index}`;
    data.refs[key]={path:ref.path,side,start:start+1,end,lines:lines.slice(start,end),hash:`ref-${key}`,diff:`diff-${slug(ref.path)}`};
    clips.push(`<details id="ref-${key}"><summary>${escape(decision.title)} · ${side} · ${escape(ref.path)}:${start+1}</summary><p>${side} ${data[side]}</p><pre>${lines.slice(start,end).map((line,i)=>`<span class="ln">${String(start+i+1).padStart(4)}</span> ${escape(line)}`).join('\n')}</pre>${chunks.some(chunk=>chunk.path===ref.path)?`<a href="#diff-${slug(ref.path)}">Changed-file diff ↓</a>`:"<p>This file is unchanged in #131; the excerpt supplies base-layer context.</p>"}</details>`);
  });
}
const record = fs.readFileSync(path.join(trees.head,'plans/005/daemon-policy.md'),'utf8');
for(const line of record.split('\n')){
  if(!line.startsWith('| `')) continue;
  const cells=line.split('|').slice(1,-1).map(value=>value.trim().replaceAll('`',''));
  if(cells.length!==5) continue;
  const name=cells[0];
  let section=name.split('.')[0];
  if(section==='recipe') section=name.includes('forcedTermination')?'shutdown':'resources';
  if(!notebook.atlas[section]) continue;
  (data.fields[section]??=[]).push({name,value:cells[1],consumer:cells[2],reason:cells[3],oracle:cells[4]});
}
fs.writeFileSync(path.join(here,'evidence-data.js'),`window.SOURCES = ${JSON.stringify(data,null,2)};\n`);
const coverage=chunks.map(chunk=>{
  const p=chunk.path;
  let decisions=[];
  if(p.includes('resource')||p.includes('persistent-pressure')) decisions=['resources','adapters'];
  else if(p.includes('logger')||p.includes('diagnostic')) decisions=['diagnostics','tests-values'];
  else if(p.includes('startup')||p.includes('registry')) decisions=['lifecycle','startup','adapters','tests-removed'];
  else if(p.includes('controller')||p.includes('lifetime')||p.includes('terminator')||p.includes('process-launcher')||p.includes('/stop.')||p.includes('cleanup')) decisions=['lifecycle','adapters'];
  else if(p.includes('local-daemon-transport')) decisions=['deadlines','recovery','output','error','adapters'];
  else if(p.includes('completion-spool')||p.includes('command-execution-result')||p.includes('cli-program-executor')||p.includes('chunk-codec')||p.includes('worker')) decisions=['output','resources','tests-values'];
  else if(p.includes('meta-tests')) decisions=['guard'];
  else if(p.includes('workspace-daemon')) decisions=['ownership','resources','output','lifecycle','diagnostics','adapters'];
  else if(p.includes('register-daemon')||p.includes('/status.')) decisions=['ownership','deadlines'];
  else if(p.includes('daemon-entry')||p.includes('dispatcher')) decisions=['ownership'];
  else decisions=['adapters'];
  const exactReferences=notebook.decisions.filter(d=>d.refs.some(ref=>ref.path===p)).map(d=>d.id);
  return {path:p,decisions:[...new Set([...decisions,...exactReferences])]};
});
fs.writeFileSync(path.join(here,'coverage.json'),JSON.stringify(coverage,null,2)+'\n');
const diffs=chunks.map(({path:p,text})=>`<details id="diff-${slug(p)}"><summary>${escape(p)}</summary><p>Related pocket-brief decisions: ${coverage.find(x=>x.path===p).decisions.map(id=>`<a href="index.html#decision-${id}">${escape(notebook.decisions.find(d=>d.id===id).title)}</a>`).join(' · ')}</p><pre>${text.split('\n').map(line=>`<span class="${line.startsWith('+')?'add':line.startsWith('-')?'del':''}">${escape(line)}</span>`).join('\n')}</pre></details>`);
const spec = fs.readFileSync(path.join(trees.head,'plans/005/daemon-architecture-functional-spec.md'),'utf8');
const nav=chunks.map(({path:p})=>`<a href="#diff-${slug(p)}">${escape(p)}</a>`).join('');
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Evidence book · reader sketch #131</title><style>body{max-width:1150px;margin:35px auto;padding:0 25px;background:#f7f4eb;color:#263638;font:14px/1.6 system-ui}h1,h2{font-family:Georgia,serif;font-weight:400}a{color:#285ca1;overflow-wrap:anywhere}summary{cursor:pointer;font-weight:600;overflow-wrap:anywhere}details{border:1px solid #d3d4c9;padding:14px;margin:12px 0;scroll-margin-top:20px}pre{white-space:pre;overflow:auto;font:11px/1.7 monospace;background:#fffdf7;padding:15px;max-height:75vh}.ln{color:#999}.add{background:#e9f0df}.del{background:#f4e7df}nav{display:grid;grid-template-columns:1fr 1fr;gap:6px 25px;font-size:11px}#pr-body pre{white-space:pre-wrap}button{padding:8px;cursor:pointer}p{font-size:13px}@media(max-width:650px){nav{grid-template-columns:1fr}}</style><a href="index.html">← Return to the notebook</a><h1>Evidence book / #131</h1><p>Frozen local input. Base <code>${data.base}</code>; head <code>${data.head}</code>. All 60 changed-file diffs, the supplied PR body, the policy record, and the exact excerpts used by the notebook. No live GitHub dependency.</p><p>Excerpts are source evidence, not executed traces. Policy reasons below are the author’s recorded reasons. Missing reasons in the notebook mean none found in the supplied body, six commit messages, architecture specification, and policy record.</p><details id="pr-body"><summary>Supplied PR body and commit subjects</summary><pre>${escape(pr.body)}\n\n${escape(pr.commits.map(c=>c.sha+' '+c.subject+'\n'+c.body).join('\n'))}</pre></details><details id="policy-record"><summary>Policy record (already present in the base)</summary><pre>${escape(record)}</pre></details><details id="architecture-spec"><summary>Architecture functional specification</summary><pre>${escape(spec)}</pre></details><h2>Excerpted evidence</h2>${clips.join('')}<h2>Changed files</h2><nav>${nav}</nav>${diffs.join('')}<script>function reveal(){const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el){if(el.tagName==='DETAILS')el.open=true;el.scrollIntoView();}}addEventListener('hashchange',reveal);addEventListener('DOMContentLoaded',reveal);</script></html>`;
fs.writeFileSync(path.join(here,'evidence.html'),html);
console.log(`Built ${Object.keys(data.refs).length} exact excerpts; ${chunks.length} changed files; ${Object.values(data.fields).flat().length} policy fields/recipes.`);
