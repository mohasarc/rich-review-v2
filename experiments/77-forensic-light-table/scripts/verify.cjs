const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const cp=require('node:child_process');
const out=path.resolve(__dirname,'..'),root=path.resolve(out,'../..');
const context={window:{}};vm.createContext(context);
for(const file of ['data.js','content.js'])vm.runInContext(fs.readFileSync(path.join(out,file),'utf8'),context);
const D=context.window.LIGHT_TABLE_DATA,R=context.window.LIGHT_TABLE_READINGS;
const ids=new Set([...D.units,...D.moves].map(u=>u.id));
assert.equal(ids.size,80);assert.equal(D.units.length,43);assert.equal(D.moves.length,37);
assert.equal(D.units.filter(u=>u.cli).length,38);assert.equal(D.units.filter(u=>u.copy.equal).length,28);
assert.equal(D.units.filter(u=>u.cli?.active).length,36);
assert.equal(D.units.reduce((n,u)=>n+u.pkg.lines,0),10666);
let receiptCount=0;
for(const r of R){
 assert(r.summary&&r.reason&&r.detail);for(const id of r.units)assert(ids.has(id),'Reading points to existing specimen '+id);
 for(const [key,a,b]of r.receipts){assert(D.sources[key],key);assert(a>=1&&b>=a&&b<=D.sources[key].text.split('\n').length,key+' bounds');receiptCount++;}
}
let sourcesVerified=0;
for(const s of Object.values(D.sources)){
 if(s.side==='bundle')continue;
 const local=path.join(root,'worktrees/pr-148-'+s.side,s.path);const raw=fs.readFileSync(local);
 assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),s.hash,'Hash '+s.path);
 assert.equal(raw.toString('utf8').replace(/\r\n/g,'\n'),s.text,'Text '+s.path);sourcesVerified++;
}
const escapedPath=path.join(root,'worktrees/pr-148-head/apps/cli/src');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const cliClientMentions=walk(escapedPath).filter(p=>p.endsWith('.ts')&&!p.endsWith('.test.ts')&&/\bDaemonClient\b/.test(fs.readFileSync(p,'utf8')));
assert.equal(cliClientMentions.length,0);
const statuses={};
for(const side of ['base','head']){
 const folder=path.join(root,'worktrees/pr-148-'+side);const pin=cp.execFileSync('git',['-C',folder,'rev-parse','HEAD'],{encoding:'utf8'}).trim();assert.equal(pin,D.pins[side]);
 statuses[side]=cp.execFileSync('git',['-C',folder,'status','--porcelain','--untracked-files=no'],{encoding:'utf8'});assert.equal(statuses[side],'');
}
const testImports=Object.fromEntries(D.units.map(u=>[u.id,u.tests.length]));
const result={status:'passed',date:new Date().toISOString(),pins:D.pins,counts:D.counts,uniqueSpecimens:ids.size,readings:R.length,receiptCount,sourcesVerified,cliDaemonClientMentions:cliClientMentions,trackedWorktreeChanges:statuses,testImports,limits:['No line-level coverage inferred.','AST graph follows relative value imports/exports and literal new URL paths from CLI entry; it does not traverse package aliases or execute requests.','Copy matches remove full import declaration lines and blank lines only; inline import types, re-exports and indentation remain.','All original source bytes and line-indexed receipts checked; rationale attribution remains authored.']};
fs.writeFileSync(path.join(out,'evidence/static-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({status:result.status,uniqueSpecimens:result.uniqueSpecimens,receiptCount,sourcesVerified,pins:result.pins},null,2));
