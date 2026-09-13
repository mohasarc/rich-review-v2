const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
const out = path.resolve(__dirname, '../evidence');
const ts = require(path.join(root, 'worktrees/pr-148-head/node_modules/typescript'));
fs.mkdirSync(out, {recursive: true});
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
}
const result = {};
for (const side of ['base','head']) {
  const worktree = path.join(root, `worktrees/pr-148-${side}`);
  const files = ['apps/cli/src','packages/daemon/src','packages/daemon/test'].flatMap(dir => walk(path.join(worktree,dir))).filter(p=>/\.(ts|mjs)$/.test(p));
  const records = {};
  for (const filename of files) {
    const rel = path.relative(worktree,filename);
    const source = fs.readFileSync(filename,'utf8');
    const sf = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
    const imports = sf.statements.filter(ts.isImportDeclaration);
    const removed = new Set();
    for (const statement of imports) {
      const a = sf.getLineAndCharacterOfPosition(statement.getStart(sf)).line;
      const b = sf.getLineAndCharacterOfPosition(statement.end-1).line;
      for(let i=a;i<=b;i++) removed.add(i);
    }
    const lines = source.split(/\r?\n/);
    const body = lines.flatMap((text,i) => !removed.has(i) && text.trim() ? [{line:i+1,text}] : []);
    const edges=[];
    function add(spec, kind, node) {
      if (!spec.startsWith('.')) return;
      const target=path.normalize(path.join(path.dirname(rel),spec)).replace(/\.js$/,'.ts');
      if(fs.existsSync(path.join(worktree,target))) edges.push({target,kind,line:sf.getLineAndCharacterOfPosition(node.getStart(sf)).line+1});
    }
    function visit(n) {
      if(ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier)) {
        const c=n.importClause;
        const onlyTypes=c && (c.isTypeOnly || (!c.name && c.namedBindings && ts.isNamedImports(c.namedBindings) && c.namedBindings.elements.every(x=>x.isTypeOnly)));
        add(n.moduleSpecifier.text,onlyTypes?'type':'value',n);
      }
      if(ts.isExportDeclaration(n) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) add(n.moduleSpecifier.text,n.isTypeOnly?'type':'value',n);
      if(ts.isNewExpression(n) && n.expression.getText(sf)==='URL' && n.arguments?.length && ts.isStringLiteral(n.arguments[0])) add(n.arguments[0].text,'entry-url',n);
      ts.forEachChild(n,visit);
    }
    visit(sf);
    records[rel]={body,edges};
  }
  const seen=new Set(); const queue=['apps/cli/src/cli.ts']; const predecessor={};
  while(queue.length) {
    const f=queue.shift(); if(seen.has(f))continue; seen.add(f);
    for(const edge of records[f]?.edges??[]) {
      if(edge.kind==='type'||seen.has(edge.target))continue;
      predecessor[edge.target]??={from:f,...edge}; queue.push(edge.target);
    }
  }
  result[side]={records,reachable:[...seen],predecessor};
}
fs.writeFileSync(path.join(out,'ast.json'),JSON.stringify(result));
console.log('Captured TypeScript import ranges and relative value-import / entry-URL graphs for both pins.');
