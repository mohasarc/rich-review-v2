import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';

const out=path.resolve(import.meta.dirname,'..'), root=path.resolve(out,'../..');
const pins={base:'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e',head:'b100221db48754656328391b878299c5a0bab443'};
const sections=['output','startup','shutdown','resources','diagnostics','transport','delivery'];
const sources={}, references={base:[],head:[]}, status={}, diagnostics={};
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const git=(dir,...args)=>execFileSync('git',['-C',dir,...args],{encoding:'utf8'}).trim();
const patch=fs.readFileSync(path.join(root,'inputs/pr-131/diff.patch'),'utf8');
const files=[...patch.matchAll(/^diff --git a\/(.+) b\/(.+)$/gm)].map(x=>x[2]);
const sourceId=(side,file)=>side+'--'+file.replaceAll('/','--');
function capture(side,file){
 const key=sourceId(side,file); if(sources[key]) return key;
 const full=path.join(root,'worktrees/pr-131-'+side,file);
 if(!fs.existsSync(full)) return null;
 const text=fs.readFileSync(full,'utf8'); sources[key]={id:key,side,file,sha:pins[side],hash:hash(text),text}; return key;
}
function policySection(symbol){
 for(const d of symbol?.declarations??[]){
  if(!/packages\/daemon\/(src|dist)\/daemon-policy\.d?\.?ts$/.test(d.getSourceFile().fileName)) continue;
  let n=d;
  while(n.parent && !(ts.isInterfaceDeclaration(n.parent)&&n.parent.name.text==='DaemonPolicyValues')) n=n.parent;
  if(n.parent&&ts.isPropertySignature(n)&&sections.includes(n.name.getText())) return n.name.getText();
 }
 return null;
}
for(const side of ['base','head']){
 const wt=path.join(root,'worktrees/pr-131-'+side);
 if(git(wt,'rev-parse','HEAD')!==pins[side]) throw Error('Wrong revision: '+side);
 status[side]=git(wt,'status','--short','--untracked-files=no');
 if(status[side]) throw Error('Tracked changes in '+side);
 const configPath=path.join(wt,'apps/cli/tsconfig.json');
 const config=ts.readConfigFile(configPath,ts.sys.readFile);
 const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,path.dirname(configPath),undefined,configPath);
 const program=ts.createProgram({rootNames:parsed.fileNames,options:parsed.options,projectReferences:parsed.projectReferences});
 const checker=program.getTypeChecker();
 diagnostics[side]={rootFiles:parsed.fileNames.length,syntaxErrors:program.getSyntacticDiagnostics().length,semanticErrors:program.getSemanticDiagnostics().length};
 if(diagnostics[side].syntaxErrors||diagnostics[side].semanticErrors) throw Error('Collector TypeScript diagnostics in '+side+': '+JSON.stringify(diagnostics[side]));
 for(const sf of program.getSourceFiles()){
  const file=path.relative(wt,sf.fileName);
  if(!file.startsWith('apps/cli/src/')||file.includes('.test.')||sf.isDeclarationFile) continue;
  function walk(n){
   let symbol;
   if(ts.isPropertyAccessExpression(n)) symbol=checker.getSymbolAtLocation(n.name);
   else if(ts.isElementAccessExpression(n)&&ts.isStringLiteral(n.argumentExpression)) symbol=checker.getPropertyOfType(checker.getTypeAtLocation(n.expression),n.argumentExpression.text);
   if(symbol){
    const section=policySection(symbol);
    if(section){
     const pos=sf.getLineAndCharacterOfPosition(n.getStart(sf));
     references[side].push({section,file,line:pos.line+1,column:pos.character+1,expression:n.getText(sf),source:capture(side,file)});
    }
   }
   ts.forEachChild(n,walk);
  }
  walk(sf);
 }
 for(const file of files) capture(side,file);
 for(const file of ['packages/daemon/src/daemon-policy.ts','packages/daemon/src/daemon-policy.test.ts','plans/005/daemon-policy.md','plans/005/daemon-architecture-functional-spec.md']) capture(side,file);
}
const pr=JSON.parse(fs.readFileSync(path.join(root,'inputs/pr-131/pr.json'),'utf8'));
sources.intent={id:'intent',side:'bundle',file:'pr.json · body and commits',sha:pins.head,text:pr.body+'\n\n'+pr.commits.map(x=>x.sha+'\n'+x.subject+'\n'+x.body).join('\n\n')};
sources.intent.hash=hash(sources.intent.text);
const peaks=sections.map(id=>{
 const bySide={};
 for(const side of ['base','head']) bySide[side]=[...new Set(references[side].filter(x=>x.section===id).map(x=>x.file))].sort();
 return {id,count:bySide.head.length,files:bySide.head,baseFiles:bySide.base};
});
const links=[];
for(let i=0;i<peaks.length;i++) for(let j=i+1;j<peaks.length;j++){
 const files=peaks[i].files.filter(x=>peaks[j].files.includes(x));
 if(files.length) links.push({source:peaks[i].id,target:peaks[j].id,count:files.length,files});
}
const data={pins,sources,references,peaks,links,files,status,diagnostics,patchHash:hash(patch),method:'TypeScript checker resolves runtime property/element access declarations to DaemonPolicyValues sections or their leaves. Distinct apps/cli/src production files, excluding test files, declarations, type-only references, full-snapshot forwarding and transitive callers. Base is an adoption baseline, not an estimate of the old local-default radius.'};
fs.writeFileSync(path.join(out,'evidence/capture.json'),JSON.stringify(data,null,2));
fs.writeFileSync(path.join(out,'evidence/diff.patch'),patch);
fs.writeFileSync(path.join(out,'evidence/pr.json'),JSON.stringify(pr,null,2));
console.log(JSON.stringify({peaks:peaks.map(({id,count,baseFiles,files})=>({id,count,baseCount:baseFiles.length,files})),links:links.map(x=>({source:x.source,target:x.target,count:x.count})),references:{base:references.base.length,head:references.head.length},diagnostics,sources:Object.keys(sources).length},null,2));
