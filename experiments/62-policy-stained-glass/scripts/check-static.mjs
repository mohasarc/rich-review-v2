import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const data=JSON.parse(read('evidence/data.json'));
const frozen=JSON.parse(read('evidence/source-snapshots.json'));
const html=read('index.html'),book=read('evidence.html');
const checks=[];
const mark=(name,detail)=>checks.push({name,detail,passed:true});
for(const name of ['README.md','brief.md','index.html','evidence.html','vendor/svg.min.js','vendor/svg-LICENSE.txt'])assert(existsSync(resolve(root,name)),name);
for(const heading of ['Entry point','Kind','Subjects','Declared choices','What I tried','What I would drop','What I would do next','Time spent'])assert(read('README.md').includes('## '+heading),heading);
mark('folder and README contract');
for(const snapshot of frozen) {
 assert.equal(createHash('sha256').update(snapshot.body).digest('hex'),snapshot.sha256);
 const pinned=execFileSync('git',['-C',resolve(root,'../../worktrees/pr-131-head'),'show',data.pins[snapshot.side]+':'+snapshot.path],{encoding:'utf8'});
 assert.equal(pinned,snapshot.body,snapshot.path);
}
for(const excerpt of data.excerpts){const src=frozen.find(f=>f.side===excerpt.side&&f.path===excerpt.path);assert.equal(src.body.split('\n').slice(excerpt.start-1,excerpt.end).join('\n'),excerpt.code);}
mark('frozen sources and excerpts equal pinned Git objects',{snapshots:frozen.length,excerpts:data.excerpts.length});
assert.equal(data.decisions.length,14);assert.equal(data.files.length,60);
const patch=read('evidence/diff.patch');assert.equal(patch.split('\n').filter(l=>l.startsWith('+')&&!l.startsWith('+++')).length,1298);assert.equal(patch.split('\n').filter(l=>l.startsWith('-')&&!l.startsWith('---')).length,544);
for(const file of data.files)assert(file.decisions.length&&file.decisions.every(id=>data.decisions.some(d=>d.id===id)));
for(const d of data.decisions){assert(html.includes(`id="decision-${d.id}"`));assert(html.includes(`id="detail-${d.id}"`));assert(d.evidence.length>0);assert(html.indexOf(`id="decision-${d.id}"`)<html.indexOf('id="mechanisms"'));}
mark('complete records precede every mechanism; all changed files mapped',{files:60,added:1298,deleted:544});
const documents={'index.html':html,'evidence.html':book};
for(const [file,body] of Object.entries(documents)) {
 const ids=[...body.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'duplicate id in '+file);
 for(const match of body.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const link=match[1];if(/^(https?:|data:)/.test(link))continue;
  const [path,fragment]=link.split('#');const destination=path||file;assert(existsSync(resolve(root,destination)),link);
  if(fragment&&documents[destination])assert(documents[destination].includes(`id="${fragment}"`),file+' '+link);
 }
}
mark('local links, source anchors and unique IDs');
const geometry=JSON.parse(read('evidence/geometry.json'));
assert(geometry.pieces.every(p=>p.area>0));assert(Math.abs(geometry.expectedArea-geometry.actualArea)<1);assert.equal(geometry.pairwiseOverlapChecks,55);assert(geometry.maximumOverlap<0.1);
mark('Paper.js geometry partitions without overlap',geometry.pairwiseOverlapChecks+' pairs');
const app=read('app.js');assert(!/localStorage|sessionStorage|indexedDB|fetch\(/.test(app));
mark('no review persistence or network API calls');
for(const side of ['base','head']){assert.equal(execFileSync('git',['-C',resolve(root,'../../worktrees/pr-131-'+side),'status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim(),'');}
mark('both Symnav worktrees have no tracked modifications');
writeFileSync(resolve(root,'evidence/static-checks.json'),JSON.stringify({at:new Date().toISOString(),passed:true,checks},null,2)+'\n');
console.log(JSON.stringify(checks,null,2));
