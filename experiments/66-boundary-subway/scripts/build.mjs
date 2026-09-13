import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import ELK from 'elkjs/lib/elk.bundled.js';
import * as model from './model.mjs';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(out, '../..');
const pins = {base:'ba53c8e1662fd86d198b95321c90d9c9bef10184',head:'20838f8dbf413e04767543eb2380d0d114da6c60'};
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
fs.mkdirSync(path.join(out,'evidence'),{recursive:true});
fs.mkdirSync(path.join(out,'vendor'),{recursive:true});
for(const [rev,pin] of Object.entries(pins)) {
  const worktree=path.join(root,'worktrees/pr-148-'+rev);
  if(execFileSync('git',['rev-parse','HEAD'],{cwd:worktree,encoding:'utf8'}).trim()!==pin) throw new Error('Wrong '+rev+' revision');
  if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:worktree,encoding:'utf8'}).trim()) throw new Error('Modified '+rev+' source');
}
const bank={};
const documents={};
for(const [id,rev,file,needle,count] of model.receipts) {
  const full=fs.readFileSync(path.join(root,'worktrees/pr-148-'+rev,file),'utf8');
  const rows=full.trimEnd().split('\n');
  const start=typeof needle==='number'?needle:rows.findIndex(l=>l.includes(needle))+1;
  if(start<1) throw new Error('Missing receipt anchor: '+id+' '+needle);
  const end=Math.min(rows.length,start+count-1);
  bank[id]={id,rev,file,start,end,text:rows.slice(start-1,end).join('\n'),sha:pins[rev],hash:hash(full),url:`https://github.com/mohasarc/symnav/blob/${pins[rev]}/${file}#L${start}-L${end}`};
  documents[rev+':'+file]={rev,file,sha:pins[rev],hash:hash(full),text:full};
}
const prRaw=fs.readFileSync(path.join(root,'inputs/pr-148/pr.json'),'utf8');
const pr=JSON.parse(prRaw);
bank.pr={isExtract:true,id:'pr',rev:'bundle',file:'inputs/pr-148/pr.json · body and commit subjects',start:1,end:1,text:pr.body+'\n\n'+pr.commits.map(c=>c.sha+' '+c.subject).join('\n'),sha:pins.head,hash:hash(prRaw),url:'https://github.com/mohasarc/symnav/pull/148'};
const patch=fs.readFileSync(path.join(root,'inputs/pr-148/diff.patch'),'utf8');
const patchSections=patch.split(/(?=^diff --git )/m);
const testPatch=patchSections.filter(s=>/^diff --git a\/(eslint\.config\.mjs|meta-tests\/src\/lint-rule\.test\.ts|apps\/cli\/src\/daemon\/daemon-navigation-worker\.test\.ts) /m.test(s)).join('');
bank['test-changes']={isExtract:true,id:'test-changes',rev:'base → head',file:'inputs/pr-148/diff.patch · exact test and lint sections',start:1,end:testPatch.split('\n').length,text:testPatch,sha:pins.head,hash:hash(patch),url:'https://github.com/mohasarc/symnav/pull/148/files'};
for(const item of [...model.decisions,...model.edges,...model.expressEdges]) for(const key of item.sources??[item.receipt]) if(!bank[key]) throw new Error('Missing source '+key);
for(const j of model.journeys) for(const [, , key] of j.steps) if(!bank[key]) throw new Error('Missing journey source '+key);
const names=fs.readdirSync(path.join(root,'worktrees/pr-148-head/apps/cli/src/daemon')).filter(n=>n.endsWith('.ts')&&!n.endsWith('.test.ts')&&!['daemon-command-dispatcher.ts','invocation-route.ts','invocation-workspace-selector.ts'].includes(n)).map(n=>'apps/cli/src/daemon/'+n).sort();
const freezeHash=crypto.createHash('sha256');
for(const f of names) {freezeHash.update(f);freezeHash.update('\0');freezeHash.update(fs.readFileSync(path.join(root,'worktrees/pr-148-head',f),'utf8').replaceAll('\r\n','\n'));freezeHash.update('\0');}
const frozen={count:names.length,digest:freezeHash.digest('hex'),files:names};
if(frozen.count!==38||frozen.digest!=='d0ff136f3be132ea004d3b13985192e055d1dfbad1abb773b607e89c54a1f41e') throw new Error('Compatibility digest changed');
const movedTests=[...patch.matchAll(/rename to (packages\/daemon\/src\/.*\.test\.ts)/g)].map(m=>m[1]);
if(movedTests.length!==37) throw new Error('Moved test census changed');
const elk=new ELK();
const wrap=s=>{const a=s.split(' '); if(s.length<18)return[s];const mid=Math.ceil(a.length/2);return[a.slice(0,mid).join(' '),a.slice(mid).join(' ')];};
async function layout(ns,es,name) {
  const order={host:0,local:0,facade:1,runtime:2,route:3,capture:3,control:3,registry:4,wire:5,startup:5,clock:6,process:6,accepted:7,lifetime:8,worker:8,delivery:9};
  const reversed=new Set(es.filter(e=>order[e.source]>order[e.target]).map(e=>e.id));
  const graph={id:'network',layoutOptions:{'elk.algorithm':'layered','elk.direction':name.endsWith('-phone')?'DOWN':'RIGHT','elk.edgeRouting':'ORTHOGONAL','elk.hierarchyHandling':'INCLUDE_CHILDREN','elk.spacing.nodeNode':'38','elk.layered.spacing.nodeNodeBetweenLayers':'48','elk.layered.spacing.edgeEdgeBetweenLayers':'10','elk.spacing.edgeEdge':'10','elk.spacing.edgeNode':'16','elk.layered.mergeHierarchyEdges':'false','elk.padding':'[top=24,left=18,bottom=24,right=18]','elk.randomSeed':'66'},children:model.groups.map(g=>({id:'group-'+g.id,group:g.id,layoutOptions:{'elk.direction':name==='local'?'DOWN':'RIGHT','elk.spacing.labelNode':'20','elk.padding':'[top=68,left=40,bottom=55,right=40]','elk.spacing.nodeNode':'40','elk.layered.spacing.nodeNodeBetweenLayers':'42'},children:ns.filter(n=>n.group===g.id).map(n=>({id:n.id,width:20,height:20,labels:[{text:n.label,width:Math.max(...wrap(n.label).map(t=>t.length))*8,height:wrap(n.label).length*18,layoutOptions:{'elk.nodeLabels.placement':'[OUTSIDE, H_CENTER, V_BOTTOM]'}}],layoutOptions:{'elk.spacing.labelNode':'22'}}))})),edges:es.map(e=>({id:e.id,sources:[reversed.has(e.id)?e.target:e.source],targets:[reversed.has(e.id)?e.source:e.target]}))};
  graph.children=graph.children.filter(g=>g.children.length);
  const result=await elk.layout(graph);
  const nodes=[],groups=[],edges=[],rawEdges=[],offsets={};
  function visit(g,ox=0,oy=0){
    const x=ox+(g.x??0),y=oy+(g.y??0);
    offsets[g.id]={x,y};
    if(g.group)groups.push({id:g.group,x,y,width:g.width,height:g.height});
    if(!g.children)nodes.push({...g,x,y});
    for(const e of g.edges??[])rawEdges.push(e);
    for(const c of g.children??[])visit(c,x,y);
  }
  visit(result);
  for(const e of rawEdges){const {x,y}=offsets[e.container??'network'];edges.push({...e,reversed:reversed.has(e.id),sections:(e.sections??[]).map(s=>({...s,startPoint:{x:s.startPoint.x+x,y:s.startPoint.y+y},endPoint:{x:s.endPoint.x+x,y:s.endPoint.y+y},bendPoints:(s.bendPoints??[]).map(p=>({x:p.x+x,y:p.y+y}))}))});}
  return {name,width:result.width,height:result.height,nodes,groups,edges};
}
const layouts={};
layouts.express=await layout(model.expressNodes,[...model.expressEdges,{id:'eq4',source:'runtime',target:'local',line:'request'}],'express');
layouts.local=await layout(model.nodes,model.edges,'local');
layouts['express-phone']=await layout(model.expressNodes,[...model.expressEdges,{id:'eq4',source:'runtime',target:'local',line:'request'}],'express-phone');
layouts['local-phone']=await layout(model.nodes,model.edges,'local-phone');
for(const l of model.lines){const edges=model.edges.filter(e=>e.line===l.id),ids=new Set(edges.flatMap(e=>[e.source,e.target]));layouts['line-'+l.id]=await layout(model.nodes.filter(n=>ids.has(n.id)),edges,'line-'+l.id);layouts['line-'+l.id+'-phone']=await layout(model.nodes.filter(n=>ids.has(n.id)),edges,'line-'+l.id+'-phone');}
const journeyGraphs={};
for(const j of model.journeys){
  const ids=new Set(j.steps.map(s=>s[0]));
  const ns=model.nodes.filter(n=>ids.has(n.id));
  const es=j.steps.slice(1).map((s,i)=>({id:`walk-${j.id}-${i}`,source:j.steps[i][0],target:s[0],line:j.id==='warm'&&i>=6?'result':j.line,decision:j.decision,receipt:s[2]}));
  layouts['journey-'+j.id]=await layout(ns,es,'journey-'+j.id);
  layouts['journey-'+j.id+'-phone']=await layout(ns,es,'journey-'+j.id+'-phone');
  journeyGraphs[j.id]={nodes:ns,edges:es};
}
const data={...model,expressEdges:[...model.expressEdges,{id:'eq4',source:'runtime',target:'local',line:'request',decision:'routing',receipt:'runtime-execute',label:'cold or fallback'}],layouts,journeyGraphs,bank,pins,frozen,movedTests};
fs.writeFileSync(path.join(out,'data.js'),'window.SUBWAY = '+JSON.stringify(data)+';\n');
fs.writeFileSync(path.join(out,'evidence/sources.json'),JSON.stringify({pins,documents,bank},null,2));
fs.writeFileSync(path.join(out,'evidence/inventory.json'),JSON.stringify({pins,frozen,movedTests,patchFiles:(patch.match(/^diff --git/gm)??[]).length,layoutEngine:'elkjs 0.12.0',layouts:Object.fromEntries(Object.entries(layouts).map(([id,g])=>[id,{width:g.width,height:g.height,nodes:g.nodes.length,edges:g.edges.length}]))},null,2));
fs.copyFileSync(path.join(out,'node_modules/d3/dist/d3.min.js'),path.join(out,'vendor/d3.min.js'));
fs.copyFileSync(path.join(out,'node_modules/d3/LICENSE'),path.join(out,'vendor/d3.LICENSE'));
const register=model.decisions.map(d=>`<article class="notice" id="notice-${d.id}" style="--line:${model.lines.find(l=>l.id===d.line).color}"><a class="notice-number" href="#decision=${d.id}" aria-label="Inspect decision ${d.number}: ${esc(d.title)}">${d.number}<span>↗</span></a><div><h3><a href="#decision=${d.id}">${esc(d.title)}</a></h3><p>${esc(d.summary)}</p><p class="reason">${esc(d.reason)}</p></div></article>`).join('\n');
const sources=Object.values(bank).map(s=>`<details id="source-${s.id}"><summary>${esc(s.id)} · ${esc(s.rev)} · ${esc(s.file)}${s.isExtract?' · excerpt rows':':'+s.start}</summary><p>Revision ${s.sha} · SHA-256 ${s.hash}${s.isExtract?' · Numbers below address this assembled excerpt, not original file lines.':''}</p><pre>${esc(s.text.split('\n').map((l,i)=>String(s.start+i).padStart(4)+'  '+l).join('\n'))}</pre><a href="${s.url}">Pinned source on GitHub ↗</a></details>`).join('\n');
const html=fs.readFileSync(path.join(out,'src/index.html'),'utf8').replace('<!--REGISTER-->',register).replace('<!--SOURCES-->',sources);
fs.writeFileSync(path.join(out,'index.html'),html);
fs.writeFileSync(path.join(out,'evidence/decision-register.md'),'# Complete service notices\n\n'+model.decisions.map(d=>`## ${d.number} ${d.title}\n\n${d.summary}\n\n${d.reason}\n\nSources: ${d.sources.join(', ')}\n`).join('\n'));
console.log(JSON.stringify({receipts:Object.keys(bank).length,documents:Object.keys(documents).length,freeze:frozen.count,movedTests:movedTests.length,layouts:Object.fromEntries(Object.entries(layouts).map(([k,v])=>[k,[v.width,v.height]]))}));
