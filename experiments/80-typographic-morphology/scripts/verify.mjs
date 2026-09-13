import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import ts from 'typescript';
import {git,ROOT,parse,describeModule} from './lib.mjs';
const data=JSON.parse(readFileSync(path.join(ROOT,'data/morphology.json')));
const raw=JSON.parse(readFileSync(path.join(ROOT,'data/extract.json')));
const html=readFileSync(path.join(ROOT,'index.html'),'utf8');
let checks=[];
const check=(name,ok,details)=>{checks.push({name,passed:Boolean(ok),details});if(!ok)throw Error(name);};
for(const s of Object.values(data.sources)){
 const actual=git('show',`${s.sha}:${s.path}`);
 check(`source ${s.id}`,actual===s.text&&createHash('sha256').update(actual).digest('hex')===s.hash&&readFileSync(path.join(ROOT,s.local),'utf8')===actual);
}
for(const r of data.readings){
 check(`pyramid ${r.id}`,readFileSync(path.join(ROOT,'evidence/reading.html'),'utf8').includes(r.summary)&&r.receipts.length>0);
 for(const rc of r.receipts){const s=data.sources[rc.source];check(`excerpt ${r.id} ${rc.start}`,rc.start>0&&rc.end<=s.text.split('\n').length&&rc.end>=rc.start);}
}
const byId=Object.fromEntries(raw.frames.map(f=>[f.id.replace('#',''),f]));
let surfaces=0;
let census=[];
for(const frame of raw.frames){
 for(const box of frame.box){
  const source=git('show',`${frame.sha}:${box.path}`);const mod=describeModule(source,box.path);
  const cls=mod.classes.find(c=>/^(WorkspaceDaemon|DaemonProcessCoordinator)$/.test(c.name));
  check(`public surface ${frame.id} ${box.path}`,cls.members.filter(m=>m.visibility==='public').map(m=>m.name).sort().join(',')==='constructor,start');surfaces++;
 }
 const titles=[];
 for(const file of frame.tests.map(t=>t.path)){
  const sf=parse(git('show',`${frame.sha}:${file}`),file);
  const visit=n=>{if(ts.isCallExpression(n)&&/^(it|test)(\.|$)/.test(n.expression.getText(sf))){const a=n.arguments[0];if(a&&(ts.isStringLiteral(a)||ts.isNoSubstitutionTemplateLiteral(a)))titles.push(a.text);}ts.forEachChild(n,visit)};visit(sf);
 }
 census.push({id:frame.id,sha:frame.sha,namedDeclarations:titles.length});
 check(`test census ${frame.id}`,titles.length===frame.tests.reduce((n,t)=>n+t.titles.length,0));
}
check('27 snapshots re-read',raw.frames.length===27);
const diffs=[144,145,146,147].map(n=>raw.steps.find(s=>s.id===`#${n}`));
check('removed/added declarations 44/7',diffs.reduce((n,s)=>n+s.membersRemoved.length,0)===44&&diffs.reduce((n,s)=>n+s.membersAdded.length,0)===7);
const tipTree=git('ls-tree','-r','--name-only',data.pins.head).split('\n');
check('CLI coordinator removed',!tipTree.includes('apps/cli/src/daemon/daemon-process-coordinator.ts'));
for(const n of ['DaemonProcessCoordinator','DaemonActivityProjector','DaemonWorkerGenerationManager','DaemonDeliverySession','AcceptedExecutionSession']){
 const matches=git('grep','-l',`class ${n}`,data.pins.head,'--','packages/daemon/src/*.ts','packages/daemon/src/**/*.ts').split('\n').filter(Boolean).filter(f=>!f.endsWith('.test.ts')).filter(f=>{const file=f.slice(f.indexOf(':')+1);return describeModule(git('show',`${data.pins.head}:${file}`),file).classes.some(c=>c.name===n)});
 check(`one final class ${n}`,matches.length===1,matches);
 const stage=byId['148'].sha;
 const staged=git('grep','-l',`class ${n}`,stage,'--','apps/cli/src/daemon/*.ts','packages/daemon/src/*.ts','packages/daemon/src/**/*.ts').split('\n').filter(Boolean).filter(f=>!f.endsWith('.test.ts')).filter(f=>{const file=f.slice(f.indexOf(':')+1);return describeModule(git('show',`${stage}:${file}`),file).classes.some(c=>c.name===n)});
 check(`two staged classes ${n}`,staged.length===2&&staged.some(f=>f.includes(':apps/cli/'))&&staged.some(f=>f.includes(':packages/daemon/')),staged);

}
const before148=byId['148'];
const oldCLI=before148.box.find(b=>b.path.startsWith('apps/')).path;
check('deleted CLI file is 670 lines',git('show',`${before148.sha}:${oldCLI}`).trimEnd().split('\n').length===670);
const pkg=JSON.parse(git('show',`${data.pins.head}:packages/daemon/package.json`));
check('four public paths',Object.keys(pkg.exports).sort().join(',')==='.,./process-entry,./testing,./worker-entry');
for(const p of Object.values(pkg.exports)){
 const sourcePath=p.default.replace('./dist/','packages/daemon/src/').replace(/\.js$/,'.ts');
 const text=git('show',`${data.pins.head}:${sourcePath}`),sf=parse(text,sourcePath);
 check(`entry ${sourcePath} uses explicit exports only`,!sf.statements.some(n=>ts.isExportDeclaration(n)&&!n.exportClause));
 const exports=describeModule(text,sourcePath).exports;
 check(`entry ${sourcePath} has no five class exports`,!exports.some(n=>/^(DaemonProcessCoordinator|DaemonActivityProjector|DaemonWorkerGenerationManager|DaemonDeliverySession|AcceptedExecutionSession)$/.test(n)));
}
const root=path.resolve(ROOT,'../..');
for(const dir of ['main','stack-head']){
 const cwd=path.join(root,'worktrees',dir);const status=execFileSync('git',['status','--porcelain'],{cwd,encoding:'utf8'});
 check(`worktree ${dir} untouched`,!status.trim());
}
check('no remote runtime assets',!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html));
check('local font shipped',existsSync(path.join(ROOT,'assets/recursive-latin-full.woff2')));
const result={generatedAt:new Date().toISOString(),passed:true,checks,census,scope:'Static ownership and source-declaration verification. No Symnav runtime or test suite executed.'};
writeFileSync(path.join(ROOT,'evidence/verification-static.json'),JSON.stringify(result,null,2));
console.log(`${checks.length} source and artifact checks passed; 27 snapshots independently re-read.`);
