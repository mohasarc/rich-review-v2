const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const root = path.resolve(__dirname, '../..');
const ts = require(path.join(root, 'worktrees/pr-131-head/node_modules/typescript'));
const compact = s => s.replace(/\s+/g, ' ').trim();
const has = (n, k) => n.modifiers?.some(m => m.kind === k);
const excluded = n => has(n, ts.SyntaxKind.PrivateKeyword) || has(n, ts.SyntaxKind.ProtectedKeyword) || n.name && ts.isPrivateIdentifier(n.name);
const isCallable = n => ts.isMethodDeclaration(n) || ts.isMethodSignature(n) || ts.isConstructorDeclaration(n) || ts.isGetAccessorDeclaration(n) || ts.isSetAccessorDeclaration(n) || ts.isCallSignatureDeclaration(n) || ts.isConstructSignatureDeclaration(n) || ts.isFunctionDeclaration(n);
function scan(file, source) {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const out = [], types = [];
  const typeNodes = new Map(sf.statements.filter(n => ts.isInterfaceDeclaration(n) || ts.isTypeAliasDeclaration(n)).map(n => [n.name.getText(sf), n]));
  function emit(node, owner, kind, explicitName, synthetic = false) {
    const name = explicitName || (ts.isConstructorDeclaration(node) ? 'constructor' : ts.isCallSignatureDeclaration(node) ? '(call)' : node.name?.getText(sf) || '(call)');
    const prefix = has(node, ts.SyntaxKind.StaticKeyword) ? 'static ' : '';
    const key = `${owner ? owner + '.' : ''}${prefix}${name}`;
    const start = node.getStart(sf), end = node.getEnd();
    const body = node.body;
    const signature = synthetic ? `constructor(): ${owner}` : compact(source.slice(start, body ? body.getStart(sf) : end).replace(/;\s*$/, ''));
    const thrown = [], calls = [];
    function visit(n) {
      if (ts.isThrowStatement(n)) thrown.push(compact(n.expression.getText(sf)));
      if (ts.isCallExpression(n)) calls.push(compact(n.expression.getText(sf)));
      ts.forEachChild(n, visit);
    }
    if (body) visit(body);
    const context = new Map();
    function referenced(n) {
      if (ts.isTypeReferenceNode(n)) {
        const t = typeNodes.get(n.typeName.getText(sf));
        if (t && !context.has(t.name.getText(sf))) {
          context.set(t.name.getText(sf), {name:t.name.getText(sf), line:sf.getLineAndCharacterOfPosition(t.getStart(sf)).line+1, source:t.getText(sf)});
          ts.forEachChild(t, referenced);
        }
      }
      ts.forEachChild(n, referenced);
    }
    for (const p of node.parameters || []) if (p.type) referenced(p.type);
    const inputTypeNames = [...context.keys()];
    if (node.type) referenced(node.type);
    out.push({ key, owner, name, kind, signature, parameters: (node.parameters || []).map(p => compact(p.getText(sf))), returns: node.type?.getText(sf) || (name === 'constructor' ? owner : '(inferred; see source)'), line: sf.getLineAndCharacterOfPosition(start).line + 1, endLine: sf.getLineAndCharacterOfPosition(end).line + 1, source: synthetic ? '' : source.slice(start, end), throws: [...new Set(thrown)], calls: [...new Set(calls)], typeContext:[...context.values()], inputTypeNames, hasBody:!!body, synthetic });
  }
  function members(node, owner, kind) {
    for (const m of node.members || []) {
      if (excluded(m)) continue;
      if (isCallable(m)) emit(m, owner, kind === 'interface' || kind === 'type' ? 'port' : ts.isGetAccessorDeclaration(m) ? 'accessor' : 'method');
      else if (m.type && ts.isFunctionTypeNode(m.type)) emit(m.type, owner, 'callback', m.name?.getText(sf));
      else if (m.initializer && (ts.isArrowFunction(m.initializer) || ts.isFunctionExpression(m.initializer))) emit(m.initializer, owner, 'method', m.name?.getText(sf));
      else if (m.type && ts.isTypeLiteralNode(m.type)) members(m.type, `${owner}.${m.name.getText(sf)}`, 'type');
    }
  }
  for (const n of sf.statements) {
    if (!has(n, ts.SyntaxKind.ExportKeyword)) continue;
    if (ts.isClassDeclaration(n) || ts.isInterfaceDeclaration(n)) {
      const owner = n.name?.getText(sf) || 'default';
      members(n, owner, ts.isClassDeclaration(n) ? 'class' : 'interface');
      if (ts.isClassDeclaration(n) && !n.members.some(ts.isConstructorDeclaration) && !n.heritageClauses?.some(h => h.token === ts.SyntaxKind.ExtendsKeyword)) emit(n, owner, 'constructor', 'constructor', true);
      types.push({name:owner, kind:ts.isClassDeclaration(n)?'class':'interface', line:sf.getLineAndCharacterOfPosition(n.getStart(sf)).line+1, source:ts.isClassDeclaration(n)?compact(source.slice(n.getStart(sf), n.members.pos)):n.getText(sf)});
    } else if (ts.isFunctionDeclaration(n)) emit(n, '', 'function');
    else if (ts.isTypeAliasDeclaration(n)) {
      types.push({name:n.name.getText(sf), kind:'type', line:sf.getLineAndCharacterOfPosition(n.getStart(sf)).line+1, source:n.getText(sf)});
      if (ts.isTypeLiteralNode(n.type)) members(n.type, n.name.getText(sf), 'type');
      else if (ts.isFunctionTypeNode(n.type)) emit(n.type, '', 'callback', n.name.getText(sf));
    } else if (ts.isVariableStatement(n)) {
      for (const d of n.declarationList.declarations) if (d.initializer && (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))) emit(d.initializer, '', 'function', d.name.getText(sf));
    }
  }
  return { callables: out, types };
}
const subjects = {};
for (const pr of [127, 131]) {
  const bundle = path.join(root, `inputs/pr-${pr}`);
  const patch = fs.readFileSync(path.join(bundle, 'diff.patch'), 'utf8');
  const files = [...patch.matchAll(/^diff --git a\/(.*?) b\/(.*?)$/gm)].map(m => m[2]);
  const rows = [], modules = [], sources = {};
  for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    const lane = file.includes('.test.') || file.startsWith('meta-tests/') ? 'test' : file.includes('/test/') ? 'support' : 'production';
    const sides = {};
    for (const side of ['base', 'head']) {
      const absolute = path.join(root, `worktrees/pr-${pr}-${side}`, file);
      const source = fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : '';
      sources[`${side}:${file}`] = source;
      sides[side] = scan(file, source);
    }
    const keys = [...new Set([...sides.base.callables, ...sides.head.callables].map(c => c.key))];
    modules.push({file,lane,count:keys.length,baseTypes:sides.base.types,headTypes:sides.head.types});
    for (const key of keys) {
      function combine(list) {
        const all = list.filter(c => c.key === key);
        if (!all.length) return null;
        const primary = all.find(c=>c.hasBody) || all[0];
        if(all.length > 1) primary.overloads = all.filter(c=>!c.hasBody).map(c=>({signature:c.signature,line:c.line}));
        return primary;
      }
      const before = combine(sides.base.callables);
      const after = combine(sides.head.callables);
      const contexts = c => compact((c?.typeContext||[]).map(t=>t.source).join('\n'));
      const status = !before ? 'added' : !after ? 'removed' : before.signature !== after.signature ? 'signature' : contexts(before) !== contexts(after) ? 'type' : compact(before.source) !== compact(after.source) ? 'body' : 'same';
      rows.push({id:`p${pr}-${rows.length+1}`,pr,file,lane,key,status,before,after});
    }
  }
  const commits = {};
  for (const side of ['base', 'head']) commits[side] = cp.execFileSync('git',['rev-parse','HEAD'], {cwd:path.join(root, `worktrees/pr-${pr}-${side}`),encoding:'utf8'}).trim();
  subjects[pr] = {pr, metadata: JSON.parse(fs.readFileSync(path.join(bundle,'pr.json'),'utf8')), commits, modules, rows, sources};
}
fs.writeFileSync(path.join(__dirname, 'inventory.json'), JSON.stringify(subjects, null, 2));
for (const [pr,s] of Object.entries(subjects)) {
  console.log(`PR ${pr}: ${s.rows.length} callables, ${s.modules.length} changed TS modules`);
  for(const m of s.modules) {
    console.log(`${m.lane} ${m.file} (${m.count})`);
    for(const r of s.rows.filter(r=>r.file===m.file)) console.log(`  ${r.id} ${r.status.padEnd(9)} ${r.key}`);
  }
}
