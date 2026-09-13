import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import ts from 'typescript';
import {git,parse,describeModule,ROOT,MAIN_SHA,TIP_SHA,bundlePrs} from './lib.mjs';

const raw=JSON.parse(readFileSync(path.join(ROOT,'data/extract.json')));
const old=JSON.parse(readFileSync(path.join(ROOT,'data/frames.json')));
const prs=bundlePrs();
const byId=Object.fromEntries(raw.frames.map(f=>[f.id.replace('#',''),f]));
const names=['DaemonActivityProjector','DaemonWorkerGenerationManager','DaemonDeliverySession','AcceptedExecutionSession'];
const labels=['Activity','Worker','Delivery','Execution'];
const added=[144,145,146,147];
const sourceBank={};
function source(sha,file){
 const id=`${sha.slice(0,10)}:${file}`;
 if(!sourceBank[id]){
  const text=git('show',`${sha}:${file}`);
  const local=`evidence/sources/${sha.slice(0,10)}--${file.replaceAll('/','__')}.txt`;
  mkdirSync(path.join(ROOT,'evidence/sources'),{recursive:true});writeFileSync(path.join(ROOT,local),text);
  sourceBank[id]={id,sha,path:file,text,local,hash:createHash('sha256').update(text).digest('hex')};
 }
 return id;
}
function excerpt(sha,file,find,after=14,before=2){
 const id=source(sha,file),lines=sourceBank[id].text.split('\n');
 const i=typeof find==='number'?find-1:lines.findIndex(l=>l.includes(find));
 if(i<0)throw Error(`Missing ${find} in ${id}`);
 return {source:id,start:Math.max(1,i+1-before),end:Math.min(lines.length,i+after+1)};
}
const snapshots=['main','143','144','145','146','147','148','149'].map(id=>{
 const r=byId[id];if(!r)throw Error(id);
 const copies=r.box.map(c=>{
  const key=source(r.sha,c.path),module=describeModule(sourceBank[key].text,c.path);
  const cls=module.classes.find(x=>['WorkspaceDaemon','DaemonProcessCoordinator'].includes(x.name));
  const ctor=cls.members.find(m=>m.kind==='constructor');
  const members=cls.members.filter(m=>m.kind!=='constructor');
  if(cls.members.filter(m=>m.visibility==='public').map(m=>m.name).sort().join(',')!=='constructor,start')throw Error('public changed');
  return {name:cls.name,owner:c.path.startsWith('apps/')?'cli':'daemon',path:c.path,source:key,lines:module.lines,members:members.length,constructorLines:ctor.end-ctor.start+1,public:['constructor','start'],range:{source:key,start:cls.start,end:ctor.end},imports:module.imports.filter(x=>x.names.some(n=>names.includes(n)))};
 });
 return {id,sha:r.sha,label:id==='main'?'main':`#${id}`,copies,testCases:r.tests.reduce((n,t)=>n+t.titles.length,0),testPaths:r.tests.map(t=>t.path),extracted:added.filter(n=>Number(id)>=n).length};
});
const main=snapshots[0],pre=snapshots[1],end=snapshots.at(-1);
const e=[];
const quote=(pr,text)=>{if(!prs.find(p=>p.number===pr).body.includes(text))throw Error('quote mismatch');return {pr,text};};
const why=[
 'Chose a static projector over an injected service, because projection depends only on explicit snapshot values.',
 'Chose one generation manager over process-shell worker fields, because startup, execution, replacement, fencing, release, and shutdown share one lifecycle state.',
 'Chose one injected delivery session over process-shell delivery fields, because attachment, transfer, acknowledgement, and trace lifecycles form one coordination boundary.',
 'Chose an injected session over moving ledger, queue, delivery, worker, resource, lifetime, or shutdown state, because each dependency remains authoritative for its own mechanism.'
];
const selected=[['activitySnapshot','project'],['replaceNavigationWorker','replace'],['deliverCompletion','deliverCompletion'],['executeAccepted','executeAccepted']];
const removed=[1,13,20,10];
for(let i=0;i<4;i++){
 const f=snapshots[i+2],prev=snapshots[i+1],of=old.frames.find(x=>x.id===f.id).owners[names[i]][0];
 const m=selected[i],decl=m[0]==='activitySnapshot'?'private activitySnapshot':m[0]==='replaceNavigationWorker'?'private async replaceNavigationWorker':m[0]==='deliverCompletion'?'private async deliverCompletion':'private async executeAccepted';
 const prevText=sourceBank[prev.copies[0].source].text;
 const find=prevText.split('\n').find(l=>l.includes(m[0]+'(')&&/private/.test(l));
 const ownerText=git('show',`${f.sha}:${of.path}`);
 const ownerFind=ownerText.split('\n').find(l=>l.includes(m[1]+'(')&&!l.includes('this.')&&!l.includes('await ')&&(l.includes('private ')||l.includes('static ')||l.trimStart().startsWith(m[1])||l.trimStart().startsWith('async '+m[1])));
 e.push({id:labels[i].toLowerCase(),word:labels[i],fullName:names[i],step:f.id,pr:added[i],status:'stated',title:[
  'Projection becomes a separate word.', 'Worker mechanics acquire one owner.', 'Delivery includes the trace lifecycle.', 'Accepted execution leaves the shell.'
 ][i],summary:[
  'Activity moves from a private method to a static projector. Stated: explicit snapshots make it a pure projection.',
  'Worker startup, replacement, release and shutdown collect in one manager. Stated: they share a lifecycle; recovery policy stays outside.',
  'Delivery and operation traces collect in one session. Stated: they share a coordination boundary; ledger and spool data keep their owners.',
  'Accepted turns collect in one session. Stated: coordinate existing queue, ledger, worker and delivery owners through injected ports.'
 ][i],detail:[
  'The process still captures values. DaemonActivityProjector.project turns the snapshots into activity and legacy pong output. The word Activity denotes the extracted projection job, not ownership of all underlying state.',
  'The process keeps a workerManager field and calls its public methods. The recovery port leads back to resource policy. Replacing worker fields with a manager therefore changes the owner of mechanics without removing collaboration.',
  'Twenty member declarations leave the shell in this PR. The selected deliverCompletion method stays private inside the new session. Extraction does not automatically make a method public. Operation-trace coordination is part of this word too.',
  'The process keeps an acceptedExecutionSession field. Execution uses its collaborators and a narrow process-lifecycle port; the existing ledger, queue, delivery, worker and resource owners remain authoritative.'
 ][i],removed:removed[i],sample:{before:m[0],after:m[1],publicAfter:i<2},reason:quote(added[i],why[i]),receipts:[excerpt(prev.sha,prev.copies[0].path,find.trim(),13,1),excerpt(f.sha,of.path,ownerFind?.trim()||`class ${names[i]}`,17,1),excerpt(f.sha,f.copies[0].path,names[i],5,1)]});
}
const spec='plans/005/daemon-architecture-functional-spec.md';
e.push({id:'composition',word:'Composition',step:'147',status:'observed',title:'Less body. More wiring.',summary:'Across #144–#147, 44 members leave and 7 arrive: 81 → 44. Constructor: 68 → 132 lines. The four extracted names stay imported. These are source counts, not a complexity measure.',detail:'Members means explicitly declared class fields, methods and accessors, excluding the constructor and its parameter property. Line counts are inclusive source lines, including formatting. The 44 removed declarations are not 44 byte-identical moves. Some become options, locals or narrower methods. Main has 78 members and a 66-line constructor; earlier vocabulary work takes it to 81 and 68 before this extraction.',receipts:[excerpt(pre.sha,pre.copies[0].path,'constructor(',73,0),excerpt(byId['147'].sha,'apps/cli/src/daemon/workspace-daemon.ts','constructor(',134,0),excerpt(end.sha,end.copies[0].path,'this.workerManager =',70,0)]});
e.push({id:'rename',word:'Process',step:'148',status:'unexplained',title:'The remaining job changes its name.',summary:'At #148, WorkspaceDaemon becomes DaemonProcessCoordinator. The plan requests a process coordinator; no specific reason for this class spelling was found.',detail:'The architecture spec names the five resulting owners. The rename follows the four extractions. This specimen reads that as a name catching up with responsibility; that reading is an interpretation, not a recorded author rationale. Constructor options and behavioral changes are outside this study.',receipts:[excerpt(MAIN_SHA,spec,'`WorkspaceDaemon` split',4,3),excerpt(byId['147'].sha,'apps/cli/src/daemon/workspace-daemon.ts','export class WorkspaceDaemon',7,0),excerpt(byId['148'].sha,'apps/cli/src/daemon/daemon-process-coordinator.ts','export class DaemonProcessCoordinator',7,0)]});
e.push({id:'copies',word:'Copy',step:'148',pr:148,status:'stated',title:'A new address is not yet a cutover.',summary:'At #148, the shell and four extracted classes have CLI and package copies; import paths change. The shipped CLI still uses its frozen copy; the class’s unit suites move to the package. Stated: review relocation separately from the consumer switch.',detail:'Imports are re-addressed, so the full files differ. The class source matches after normalizing the one inline import-type path; ordinary import declarations also move. The CLI daemon entry still constructs its local coordinator. A metadata test freezes 38 CLI production files with a combined SHA-256, while the unit suites target the package copy. This is source ownership, not two concurrently running daemon processes.',reason:quote(148,'Chose package staging with a frozen CLI compatibility graph over switching production consumers during relocation, because mechanism ownership and host invocation coordination need separate review boundaries.'),receipts:[excerpt(byId['148'].sha,'apps/cli/src/daemon/daemon-entry.ts','new DaemonProcessCoordinator',15,3),excerpt(byId['148'].sha,'meta-tests/src/daemon-compatibility-copy.test.ts','const',65,0),excerpt(byId['148'].sha,'packages/daemon/src/process/process-coordinator-requests.test.ts','../../test/helpers/daemon-process-coordinator.js',3,4),excerpt(byId['148'].sha,'packages/daemon/test/helpers/daemon-process-coordinator.ts','../../src/process/process-coordinator.js',3,4)]});
e.push({id:'consolidation',word:'One',step:'149',pr:149,status:'stated',title:'Two spellings of ownership become one.',summary:'At #149 the 670-line CLI copy is deleted. The package process entry constructs the surviving coordinator. Stated: CLI owns invocation; daemon execution belongs behind DaemonClient.',detail:'The class remains in packages/daemon/src/process/process-coordinator.ts. The same four extracted collaborators are now package-local imports. There is one physical implementation of each of the five classes at the tip. The deletion counts a source file, not memory or running instances.',reason:quote(149,'Chose a CLI invocation coordinator over the app-local daemon dispatcher, because argv classification and workspace discovery remain host responsibilities while execution belongs behind `DaemonClient`.'),receipts:[excerpt(end.sha,'packages/daemon/src/process-entry.ts','new DaemonProcessCoordinator',17,3),excerpt(end.sha,end.copies[0].path,'import { AcceptedExecutionSession',26,0)]});
e.push({id:'surface',word:'Public',step:'149',status:'observed',title:'Public to a class is not public to a package.',summary:'The shell exposes constructor and start() in all 27 PR-boundary snapshots. At #149 none of these five classes is exported by any package entry. The package offers four entry paths.',detail:'Heavy member samples mean class-public. Light samples mean class-private. The five names occupy the package side of the labeled boundary. Package exports are a different boundary: root, process-entry, worker-entry and testing. The exported process entry constructs the coordinator internally; it does not export the class.',receipts:[excerpt(end.sha,end.copies[0].path,'export class DaemonProcessCoordinator',31,0),excerpt(end.sha,end.copies[0].path,'async start()',7,0),excerpt(end.sha,'packages/daemon/package.json','"exports"',19,0),excerpt(end.sha,'packages/daemon/src/index.ts',1,40,0)]});
e.push({id:'tests',word:'Tests',step:'148',status:'unexplained',title:'Tests move ahead of the production caller.',summary:'Class-suite census: 65 → 82 named test declarations; none removed after normalizing the class rename. One #145 assertion is rewritten and adds two fileCount checks. Rationale for that exact test selection is unexplained.',detail:'This is a source census of the coordinator’s own suites, not all daemon tests or executed test-case counts. Parameterized declarations count once. The altered #145 assertion retains recovery expectations and adds a legacy pong fileCount value plus absence of activity.fileCount. Helpers and suite execution can still affect meaning; this inventory is not a parity or correctness result. The #148 relocation and freeze are shown in Copy.',receipts:[excerpt(byId['144'].sha,'apps/cli/src/daemon/workspace-daemon-requests.test.ts','reports worker replacement recovery from the main thread',45,0),excerpt(byId['145'].sha,'apps/cli/src/daemon/workspace-daemon-requests.test.ts','reports worker replacement recovery from the main thread',49,0)]});
// Re-check the narrow mechanical claims rather than trust earlier drafts.
const a=snapshots.find(f=>f.id==='148').copies;
const clsText=c=>parse(sourceBank[c.source].text,c.path).statements.find(n=>ts.isClassDeclaration(n)&&n.name.text==='DaemonProcessCoordinator').getText().replace(/import\("[^"]+"\)/g,'import("<source-path>")');
if(clsText(a[0])!==clsText(a[1]))throw Error('copy bodies differ');
for(const f of raw.frames)for(const c of f.box){if(c.members.filter(m=>m.visibility==='public').map(m=>m.name).sort().join(',')!=='constructor,start')throw Error('27 snapshots public surface mismatch');}
if(pre.copies[0].members!==81||snapshots[5].copies[0].members!==44||snapshots[5].copies[0].constructorLines!==132)throw Error('count mismatch');
const manifest=JSON.parse(git('show',`${TIP_SHA}:packages/daemon/package.json`));
const entryFiles=Object.values(manifest.exports).map(e=>e.default.replace('./dist/','packages/daemon/src/').replace(/\.js$/,'.ts'));
const entryExports=entryFiles.map(f=>({path:f,exports:describeModule(git('show',`${TIP_SHA}:${f}`),f).exports}));
for(const f of entryExports)if(f.exports.some(n=>[...names,'DaemonProcessCoordinator'].includes(n)))throw Error('unexpected public class');
const testReport=JSON.parse(readFileSync(path.join(ROOT,'data/test-bodies.json')));
if(testReport.some(r=>r.removedTests.length))throw Error('test removed');
const data={pins:{main:MAIN_SHA,head:TIP_SHA},snapshots,readings:e,sources:sourceBank,entryExports,checks:{matching148ClassBodiesAfterInlineImportNormalization:true,publicStableSnapshots:raw.frames.length,mainTests:main.testCases,headTests:end.testCases,removedTestDeclarations:0},scope:'One class’s ownership, composition and visibility. Domain words are abbreviations; positions, joins and transitions are schematic. No runtime is simulated.'};
writeFileSync(path.join(ROOT,'data/morphology.json'),JSON.stringify(data,null,2));
writeFileSync(path.join(ROOT,'evidence/source-manifest.json'),JSON.stringify(Object.values(sourceBank).map(({text,...x})=>x),null,2));
console.log(JSON.stringify({snapshots:snapshots.length,readings:e.length,sources:Object.keys(sourceBank).length,checks:data.checks},null,2));
