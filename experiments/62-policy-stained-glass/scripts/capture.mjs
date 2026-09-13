import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {decisions,pins,materials,paneItems} from '../src/content.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const repo=resolve(root,'../..');
const git=(...args)=>execFileSync('git',['-C',resolve(repo,'worktrees/pr-131-head'),...args],{encoding:'utf8',maxBuffer:20*1024*1024});
for(const side of ['base','head']) {
 const wt=resolve(repo,'worktrees/pr-131-'+side);
 const pin=execFileSync('git',['-C',wt,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
 if(pin!==pins[side]) throw Error('Wrong revision: '+side);
 if(execFileSync('git',['-C',wt,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim()) throw Error('Tracked worktree edits: '+side);
}
const bundle=JSON.parse(readFileSync(resolve(repo,'inputs/pr-131/pr.json'),'utf8'));
const patch=readFileSync(resolve(repo,'inputs/pr-131/diff.patch'),'utf8');
const files=patch.split(/^diff --git /m).slice(1).map(chunk=>({path:chunk.split('\n')[0].split(' b/')[1],patch:'diff --git '+chunk}));
const frozen=new Map();
function source(side,path) {
 const key=side+':'+path;
 if(!frozen.has(key)) {
  const body=git('show',pins[side]+':'+path);
  frozen.set(key,{side,path,body,sha256:createHash('sha256').update(body).digest('hex'),blob:git('rev-parse',pins[side]+':'+path).trim()});
 }
 return frozen.get(key);
}
const excerpts=[];
for(const item of decisions) {
 item.evidence=item.receipts.map((spec,i)=>{
  const src=source(spec.side,spec.path); const lines=src.body.split('\n');
  const at=lines.findIndex(line=>line.includes(spec.needle));
  if(at<0) throw Error(item.id+' missing '+JSON.stringify(spec));
  const excerpt={id:'E'+item.id+'-'+(i+1),decision:item.id,side:spec.side,path:spec.path,start:at+1,end:Math.min(at+spec.count,lines.length),code:lines.slice(at,at+spec.count).join('\n'),sha:pins[spec.side],blob:src.blob};
  excerpts.push(excerpt); return excerpt.id;
 });
 delete item.receipts;
}
const ownership=(path)=>{
 if(path.includes('resource'))return ['03','04','12'];
 if(path.includes('local-daemon-transport')) return ['01','02','06','07','08','10','11'];
 if(path.includes('startup'))return ['05','14'];
 if(path.includes('command-execution-result')||path.includes('cli-program-executor')||path.includes('completion-spool'))return ['02','09','10','11'];
 if(path.includes('navigation-worker')||path.includes('chunk-codec'))return ['02','03','09'];
 if(path.includes('workspace-daemon'))return ['03','04','05','10','11'];
 if(path.includes('daemon-package'))return ['01','13'];
 if(path.includes('benchmark'))return ['04'];
 if(/(logger|diagnostic|lifetime|registry|controller|terminat|launcher|cleanup|\/stop\.|\/status\.)/.test(path))return ['05','06','09','10'];
 return ['01','10'];
};
for(const file of files) {
 file.decisions=ownership(file.path);
 for(const side of ['base','head']) {
  if(side==='base'&&file.patch.includes('new file mode'))continue;
  source(side,file.path);
 }
}
const policy='packages/daemon/src/daemon-policy.ts';
if(source('head',policy).blob!==source('base',policy).blob)throw Error('Policy must be unchanged');
const meta=source('head','meta-tests/src/daemon-package.test.ts').body;
const guard=meta.split('for (const retiredSeam of [')[1].split('])')[0].match(/"[^"]+"/g);
if(guard.length!==36)throw Error('Denylist count');
const data={pins,materials,paneItems,decisions,excerpts,bundle,files:files.map(({path,decisions})=>({path,decisions})),capturedAt:new Date().toISOString()};
mkdirSync(resolve(root,'evidence'),{recursive:true});
writeFileSync(resolve(root,'evidence/data.json'),JSON.stringify(data,null,2)+'\n');
writeFileSync(resolve(root,'evidence/source-snapshots.json'),JSON.stringify([...frozen.values()],null,2)+'\n');
writeFileSync(resolve(root,'evidence/diff.patch'),patch);
writeFileSync(resolve(root,'evidence/coverage.json'),JSON.stringify({base:pins.base,head:pins.head,files:files.map(f=>({path:f.path,decisions:f.decisions})),excerpts:excerpts.length,policyUnchanged:true,denylistStrings:guard.length,trackedWorktreesClean:true},null,2));
console.log(JSON.stringify({files:files.length,excerpts:excerpts.length,snapshots:frozen.size,policyUnchanged:true,denylist:guard.length}));
