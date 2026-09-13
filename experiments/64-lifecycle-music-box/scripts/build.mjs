import {readFileSync as read, writeFileSync as write} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pins={base:'a1e325a5ff979bdfa25babc5554621c8c0f20497',head:'64919bcbcf7fcc8202779b78c5f069b24662bb18'};
const scenarios=[
 {id:'release-held',title:'Release, held open',group:'release',hint:'Listen for a finished backend over a still-held project note in #126. In #127, both stay pending together.',limit:'Injected: the configured project returns a held promise after its real synchronous cleanup ran. A direct backend query refills the definition cache during that hold.'},
 {id:'release-held-rejects',title:'Release, then reject',group:'release',hint:'The same early clearing. A different ending: #127 carries the rejection through graph → service → backend.',limit:'Injected: the same held project-release promise, rejected by the probe. The probe observes Node’s unhandledRejection event in #126; it is not a daemon run.'},
 {id:'release-sync',title:'Release, synchronous',group:'release',hint:'With today’s synchronous project cleanup, both finish after project work. #127 still adds an awaited service hop.',limit:'No failure or delay injected. Real backend, graph and two loaded TypeScript projects in a temporary three-file workspace.'},
 {id:'turn',title:'Refresh succeeds',group:'turn',hint:'Follow source → graph → state. Only then does the six-note clearing chord sound. The next definition lookup misses.',limit:'No failure or delay injected. Starts at the second successful refresh with the definition cache already populated.'},
 {id:'refresh-fails',title:'Refresh rejects',group:'turn',hint:'The state note rejects. There is no clearing chord; the next definition lookup hits the old entry.',limit:'Injected: state.refresh rejects once, after the real source cache and project graph refreshed. This records cache preservation, not rollback of the whole workspace.'},
 {id:'late-answer',title:'Old answer lands late',group:'turn',hint:'An old search rings across the clearing chord. Its later settlement cannot replace the new-turn entry.',limit:'Injected: the first definition search’s ensureFiles result is delayed across a successful refresh. The old promise is allowed to settle; clearing does not cancel it.'}
];
const rows={
 backend:{name:'Backend',detail:'TypeScriptBackend',pkg:'ts',pitch:'C4'},
 service:{name:'Query service',detail:'TypeScriptSemanticQueryService',pkg:'ts',pitch:'E4'},
 lifetime:{name:'Cache lifetime',detail:'six independent stores',pkg:'core',pitch:'G4'},
 source:{name:'Source cache',detail:'WorkspaceSourceCache',pkg:'core',pitch:'A3'},
 state:{name:'Workspace state',detail:'TypeScriptWorkspaceState',pkg:'ts',pitch:'D4'},
 graph:{name:'Project graph',detail:'core ProjectGraph',pkg:'core',pitch:'G3'},
 configured:{name:'Configured project',detail:'TypeScriptSemanticProject',pkg:'ts',pitch:'C3'},
 inferred:{name:'Inferred project',detail:'TypeScriptSemanticProject',pkg:'ts',pitch:'E3'},
 probe:{name:'Probe / Node',detail:'injected gate & observation',pkg:'probe',pitch:'B4'}
};
function rowOf(e){return e.track==='stores'||e.track==='scope'?'lifetime':e.track==='projects'?(e.lane==='inferred'?'inferred':'configured'):e.track==='collaborators'?(e.lane==='sourceCache'?'source':'state'):['runtime','caller'].includes(e.track)?'probe':e.track;}
function arrange(scenario,build){
 const path=`evidence/traces/${scenario.id}--${build}.json`,raw=read(resolve(root,path),'utf8'),t=JSON.parse(raw);
 if(t.commit!==pins[build])throw Error('Wrong trace pin');
 const isRelease=scenario.group==='release';
 const start=isRelease?t.events.find(e=>e.track==='backend'&&e.kind==='call'&&e.label==='releaseTransientResources()').seq:scenario.id==='late-answer'?t.events.find(e=>e.track==='service'&&e.kind==='call'&&e.label==='findDefinitions()').seq:t.events.filter(e=>e.track==='backend'&&e.kind==='call'&&e.label==='refresh(workspace)')[1].seq;
 const callMap=new Map(t.calls.map(c=>[c.id,c]));
 const chosen=new Set(t.calls.filter(c=>c.startSeq>=start && (isRelease?c.label.includes('releaseTransientResources')&&['backend','service','graph','projects'].includes(c.track):(c.track!=='caller'&&(c.label.includes('refresh')||c.label.startsWith('beginTurn')||(scenario.id==='late-answer'&&c.track==='service'&&c.label==='findDefinitions()'))))).map(c=>c.id));
 const events=[];
 for(const e of t.events.filter(e=>e.seq>=start)){
  if(chosen.has(e.callId)&&['call','settle','return','throw'].includes(e.kind)) {
   const rejected=e.outcome==='rejected'||e.kind==='throw';
   const label=e.kind==='call'?(e.label.startsWith('beginTurn')?'begin turn':e.label.includes('findDefinitions')?'search':isRelease?'release':'refresh'):rejected?'reject':e.kind==='return'?'return':'settle';
   events.push({...e,row:rowOf(e),type:e.kind==='call'?'start':rejected?'reject':'finish',short:label,source:`${rowOf(e)}-${build}`,seqs:[e.seq]});
  } else if(e.kind==='clear'){
   if(e.lane==='definitionsByIdentity'){
    const group=t.events.filter(x=>x.kind==='clear'&&x.seq>=e.seq&&x.seq<e.seq+6);
    if(group.length!==6)throw Error('Expected six contiguous clears');
    events.push({...e,row:'lifetime',type:'clear',short:'clear ×6',source:`lifetime-${build}`,seqs:group.map(x=>x.seq)});
   }
  } else if(e.track==='stores'&&e.lane==='definitionsByIdentity'&&['lookup','store'].includes(e.kind)){
   events.push({...e,row:'lifetime',type:e.kind==='store'?'store':e.lookup,short:e.kind==='store'?'store':e.lookup,source:`query-${build}`,seqs:[e.seq]});
  } else if(e.kind==='mark'||e.kind==='unhandled'){
   events.push({...e,row:'probe',type:e.kind==='mark'?'gate':'reject',short:e.kind==='unhandled'?'unhandled':e.label.includes('rejected')?'reject gate':e.label.includes('old')?'old resolves':'resolve gate',source:`graph-${build}`,seqs:[e.seq]});
  }
 }
 events.sort((a,b)=>a.seq-b.seq);
 const bands=[];
 for(const id of chosen){
  const c=callMap.get(id),first=events.findIndex(e=>e.callId===id&&e.type==='start'),last=events.findIndex(e=>e.callId===id&&['finish','reject'].includes(e.type));
  if(first>=0&&last>first)bands.push({row:rowOf(c),start:first,end:last,callId:id,promise:!!c.promiseId,outcome:c.outcome,label:c.label});
 }
 const releaseBackend=t.calls.find(c=>c.track==='backend'&&c.label==='releaseTransientResources()');
 const releaseGraph=t.calls.find(c=>c.track==='graph'&&c.label==='projectGraph.releaseTransientResources()');
 const completion=c=>c?.settleSeq??c?.endSeq;
 let populated=false;for(const e of t.events.filter(e=>e.seq<start&&e.track==='stores'&&e.lane==='definitionsByIdentity')){if(e.kind==='clear')populated=false;if(e.kind==='store')populated=true;}
 const initialCache=populated?'old entry':'empty';
 let cleared=false,cache=initialCache;
 const checkpoints=events.map((e,i)=>{
  if(e.type==='clear'){cleared=true;cache='empty';} if(e.type==='store')cache=cleared?'new entry':'old entry';
  const backendDone=isRelease&&e.seq>=completion(releaseBackend),graphDone=isRelease&&e.seq>=completion(releaseGraph);
  let relation='ready';
  if(isRelease){if(backendDone&&!graphDone)relation='split';else if(backendDone&&graphDone)relation=releaseBackend.outcome===releaseGraph.outcome?'aligned':'different';else if(!backendDone&&graphDone)relation='following';else if(e.seq>=releaseGraph.startSeq)relation='pending';}
  return {index:i,seq:e.seq,cache,cleared,backend:isRelease?(backendDone?releaseBackend.outcome:'pending'):null,graph:isRelease?(graphDone?releaseGraph.outcome:e.seq>=releaseGraph.startSeq?'pending':'not called'):null,relation};
 });
 const activeRows=(isRelease?['backend','service','lifetime','graph','configured','inferred','probe']:['backend','source','graph','state','service','lifetime','probe']).filter(r=>events.some(e=>e.row===r)||r==='inferred'||r==='lifetime'||r==='service');
 return {path,commit:t.commit,recordedAt:t.recordedAt,sha256:createHash('sha256').update(raw).digest('hex'),notes:t.notes,injections:t.injections,events,bands,checkpoints,rows:activeRows,initialCache};
}
const scores=scenarios.map(s=>({...s,runs:Object.fromEntries(['base','head'].map(b=>[b,arrange(s,b)]))}));
const service='packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts';
const backend='packages/backend-typescript/src/typescript-backend/typescript-backend.ts';
const graph='packages/core/src/workspace/project-graph.ts';
const project='packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts';
const scope='packages/core/src/backend/turn-scoped-cache-scope.ts';
const receipts=[];
function capture(id,build,path,start,end){
 const wt=resolve(root,'../../worktrees/pr-127-'+build);const full=execFileSync('git',['-C',wt,'show',pins[build]+':'+path],{encoding:'utf8'});
 const lines=full.trimEnd().split('\n');end??=lines.length;
 receipts.push({id,build,path,start,end,commit:pins[build],fileSha256:createHash('sha256').update(full).digest('hex'),text:lines.slice(start-1,end).join('\n')});
}
for(const b of ['base','head']){
 capture('backend-'+b,b,backend,79,91);
 findCapture('service-'+b,b,service,b==='base'?'beginTurn(snapshot':'beginTurn(files',5);
 findCapture('release-'+b,b,service,b==='base'?'releaseTransientResources(): void':'async releaseTransientResources()',5);
 findCapture('query-'+b,b,service,'findDefinitions(identity:',64);
 capture('graph-'+b,b,graph,144,152);
 capture('configured-'+b,b,project,78,85);
 capture('inferred-'+b,b,project,78,85);
 capture('state-'+b,b,backend,79,85);
 capture('source-'+b,b,backend,79,85);
}
// Explicit line discovery avoids guessing shifted base line numbers.
function findCapture(id,build,path,needle,count){
 const full=execFileSync('git',['-C',resolve(root,'../../worktrees/pr-127-'+build),'show',pins[build]+':'+path],{encoding:'utf8'});
 const n=full.split('\n').findIndex(l=>l.includes(needle));if(n<0)throw Error(needle);capture(id,build,path,n+1,n+count);
}
findCapture('lifetime-base','base',service,'private clearQueryCaches()',9);
capture('lifetime-head','head',scope,1);
capture('handles-head','head',service,29,57);
findCapture('projection-head','head',service,'definitionNodesOf(node:',36);
findCapture('exports-head','head','packages/core/src/index.ts','turn-scoped-cache-scope',1);
findCapture('core-tests','head',scope.replace('.ts','.test.ts'),'describe("TurnScopedCacheScope"',87);
findCapture('service-tests','head',service.replace('.ts','.test.ts'),'it("clears caches before awaiting',61);
const pr=JSON.parse(read(resolve(root,'../../inputs/pr-127/pr.json'),'utf8'));
receipts.push({id:'intent',path:'inputs/pr-127/pr.json',build:'bundle',start:1,text:pr.body,commit:pins.head});
const oldText=read(resolve(root,'../../worktrees/pr-127-base',service.replace('.ts','.test.ts')),'utf8');
const newText=read(resolve(root,'../../worktrees/pr-127-head',service.replace('.ts','.test.ts')),'utf8');
const originalStart='  it("shares one reference search across caller and reference projections"';
const inventory={oldServiceTests:(oldText.match(/\bit\("/g)||[]).length,newServiceTests:(newText.match(/\bit\("/g)||[]).length,coreTests:4,originalCasesAndHelpersIdentical:oldText.slice(oldText.indexOf(originalStart))===newText.slice(newText.indexOf(originalStart))};
const result={pins,rows,scores,receipts,inventory};
write(resolve(root,'data/instrument.js'),'window.INSTRUMENT = '+JSON.stringify(result)+';\n');
write(resolve(root,'evidence/instrument-manifest.json'),JSON.stringify({pins,inventory,recordings:scores.flatMap(s=>Object.entries(s.runs).map(([build,r])=>({scenario:s.id,build,path:r.path,sha256:r.sha256,recordedAt:r.recordedAt,notes:r.notes}))),receipts:receipts.map(({text,...r})=>r)},null,2));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
write(resolve(root,'sources.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Source book · Lifecycle music box</title><link rel="stylesheet" href="style.css"><body class="sourcebook"><a href="index.html">← Back to the instrument</a><h1>Source book</h1><p>Frozen receipts for PR #127. Base ${pins.base}; head ${pins.head}. Lines below add fidelity to the complete score notes.</p>${receipts.map(r=>`<section id="${r.id}"><h2>${esc(r.id)}</h2><p>${esc(r.path)} · ${r.build} · L${r.start}${r.end?'–'+r.end:''}</p><pre>${r.text.split('\n').map((l,i)=>esc(String(i+r.start).padStart(4)+'  '+l)).join('\n')}</pre><a href="index.html#decisions">← Score notes</a></section>`).join('')}</body></html>`);
console.log(JSON.stringify({scores:scores.map(s=>({id:s.id,events:Object.values(s.runs).map(r=>r.events.length)})),receipts:receipts.length,inventory}));
