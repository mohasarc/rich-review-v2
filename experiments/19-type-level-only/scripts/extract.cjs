// Extract syntax declarations. Never walk a function/method body or an initializer.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const out = path.resolve(__dirname, '..');
const root = path.resolve(out, '../..');
const headRoot = path.join(root, 'worktrees/pr-131-head');
const baseRoot = path.join(root, 'worktrees/pr-131-base');
const ts = require(require.resolve('typescript', { paths: [headRoot] }));
const printer = ts.createPrinter({ removeComments: true });
const baseSha = cp.execFileSync('git', ['rev-parse', 'HEAD'], { cwd: baseRoot, encoding: 'utf8' }).trim();
const headSha = cp.execFileSync('git', ['rev-parse', 'HEAD'], { cwd: headRoot, encoding: 'utf8' }).trim();
const stats = cp.execFileSync('git', ['diff', '--numstat', baseSha, headSha], { cwd: headRoot, encoding: 'utf8' })
  .trim().split('\n').map(line => { const [added, removed, file] = line.split('\t'); return { path: file, added: +added, removed: +removed }; });
const contexts = ['packages/daemon/src/daemon-policy.ts', 'packages/daemon/src/policy-testing.ts', 'packages/daemon/src/index.ts', 'apps/cli/src/program-dependencies.ts'];
const scope = p => p.startsWith('meta-tests/') ? 'meta-test' : p.endsWith('.test.ts') ? 'test' : p.includes('/test/helpers/') ? 'test-helper' : p.includes('/test/benchmark/') ? 'benchmark' : 'production';

function extract(treeRoot, file) {
  const full = path.join(treeRoot, file);
  if (!fs.existsSync(full)) return { exists: false, records: [], imports: [] };
  const source = ts.createSourceFile(file, fs.readFileSync(full, 'utf8'), ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw new Error('Parse error: ' + file);
  const print = n => printer.printNode(ts.EmitHint.Unspecified, n, source);
  const type = n => n ? print(n) : '⟨inferred; initializer/body not inspected⟩';
  const mods = n => (n.modifiers || []).map(m => m.getText(source)).filter(m => m !== 'async').join(' ');
  const generic = n => n.typeParameters?.length ? '<' + n.typeParameters.map(print).join(', ') + '>' : '';
  const parameters = n => n.parameters.map((p, index) => {
    const requiredAfter = n.parameters.slice(index + 1).some(x => !x.questionToken && !x.initializer && !x.dotDotDotToken);
    const optional = !!p.questionToken || (!!p.initializer && !requiredAfter);
    const tp = type(p.type) + (p.initializer && requiredAfter ? ' | undefined' : '');
    return `${mods(p) ? mods(p) + ' ' : ''}${p.dotDotDotToken ? '...' : ''}${print(p.name)}${optional ? '?' : ''}: ${tp}`;
  }).join(', ');
  const records = [];
  const imports = [];
  const record = (node, id, kind, name, code, endNode = node, extra = {}) => {
    records.push({ id, kind, name, code, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
      endLine: source.getLineAndCharacterOfPosition(endNode.end).line + 1, ...extra });
  };
  for (const node of source.statements) {
    if (ts.isImportDeclaration(node)) { imports.push({ code: print(node), module: node.moduleSpecifier.text, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1 }); continue; }
    if (ts.isExportDeclaration(node)) { record(node, 'export:' + print(node), 'export', node.moduleSpecifier?.text || 'local exports', print(node)); continue; }
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      const kind = ts.isInterfaceDeclaration(node) ? 'interface' : 'type';
      record(node, kind + ':' + node.name.text, kind, node.name.text, print(node));
      continue;
    }
    if (ts.isFunctionDeclaration(node)) {
      const name = node.name?.text || 'default';
      record(node, 'function:' + name, 'function', name, `${mods(node)} function ${name}${generic(node)}(${parameters(node)}): ${type(node.type)};`.trim(), node.type || node.parameters.at(-1) || node.name, { hasBody: !!node.body, defaultParameters: node.parameters.filter(p => p.initializer).map(p => print(p.name)) });
      continue;
    }
    if (ts.isClassDeclaration(node)) {
      const name = node.name?.text || 'default';
      const heritage = (node.heritageClauses || []).map(print).join(' ');
      record(node, 'class:' + name, 'class', name, `${mods(node)} class ${name}${generic(node)}${heritage ? ' ' + heritage.trim() : ''}`.trim(), node.heritageClauses?.at(-1) || node.name);
      for (const m of node.members) {
        if (ts.isConstructorDeclaration(m)) {
          record(m, name + '.constructor', 'constructor', name + '.constructor', `${mods(m)} constructor(${parameters(m)});`.trim(), { end: m.parameters.end + 1 }, { owner: name, hasBody: !!m.body, defaultParameters: m.parameters.filter(p => p.initializer).map(p => print(p.name)) });
        } else if (ts.isMethodDeclaration(m) || ts.isGetAccessorDeclaration(m) || ts.isSetAccessorDeclaration(m)) {
          const mn = print(m.name);
          const prefix = ts.isGetAccessorDeclaration(m) ? 'get ' : ts.isSetAccessorDeclaration(m) ? 'set ' : '';
          record(m, name + '.' + prefix + mn, 'method', name + '.' + mn, `${mods(m)} ${prefix}${mn}${m.questionToken ? '?' : ''}${generic(m)}(${parameters(m)}): ${ts.isSetAccessorDeclaration(m) ? 'void' : type(m.type)};`.trim(), m.type || m.parameters.at(-1) || m.name, { owner: name, hasBody: !!m.body, defaultParameters: m.parameters.filter(p => p.initializer).map(p => print(p.name)) });
        } else if (ts.isPropertyDeclaration(m)) {
          const mn = print(m.name);
          record(m, name + '.' + mn, 'property', name + '.' + mn, `${mods(m)} ${mn}${m.questionToken ? '?' : ''}: ${type(m.type)};`.trim(), m.type || m.name, { owner: name, explicitType: !!m.type });
        } else if (ts.isIndexSignatureDeclaration(m)) {
          record(m, name + '.index', 'index', name + '.index', print(m), m, { owner: name });
        }
      }
      continue;
    }
    if (ts.isVariableStatement(node)) {
      for (const d of node.declarationList.declarations) {
        const name = print(d.name);
        // No initializer inspection. An unannotated const is recorded as opaque.
        const mode = node.declarationList.flags & ts.NodeFlags.Const ? 'const' : node.declarationList.flags & ts.NodeFlags.Let ? 'let' : 'var';
        record(d, 'variable:' + name, 'variable', name, `${mods(node)} ${mode} ${name}: ${type(d.type)};`.trim(), d.type || d.name, { explicitType: !!d.type });
      }
    }
  }
  const groups = new Map();
  for (const r of records) { if (!groups.has(r.id)) groups.set(r.id, []); groups.get(r.id).push(r); }
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    group.forEach((r, i) => {
      r.id += '#signature-' + (i + 1);
      r.signatureRole = r.hasBody ? 'overload implementation signature; not an additional caller overload' : 'caller overload signature';
    });
  }
  for (const r of records) delete r.hasBody;
  return { exists: true, records, imports };
}

const files = [...stats, ...contexts.filter(p => !stats.some(f => f.path === p)).map(p => ({ path: p, added: 0, removed: 0, context: true }))].map(f => {
  const before = extract(baseRoot, f.path), after = extract(headRoot, f.path);
  const b = new Map(before.records.map(r => [r.id, r]));
  const a = new Map(after.records.map(r => [r.id, r]));
  const deltas = [];
  for (const id of new Set([...b.keys(), ...a.keys()])) {
    const previous = b.get(id), next = a.get(id);
    if (previous?.code === next?.code && previous?.signatureRole === next?.signatureRole) continue;
    deltas.push({ id, change: !previous ? 'added' : !next ? 'removed' : 'changed', before: previous || null, after: next || null });
  }
  return { ...f, scope: scope(f.path), before, after, deltas };
});
const data = { baseSha, headSha, compilerVersion: ts.version, method: 'Explicit syntax only; no body or initializer traversal. Default parameter presence records optionality, never its value. Inferred types stay opaque. Class members include private declarations. Overloads are preserved in source order; their implementation signature is labeled separately. Imports are separate from contract deltas.', files };
fs.writeFileSync(path.join(out, 'evidence/declarations.json'), JSON.stringify(data, null, 2) + '\n');
for (const side of ['before', 'after']) {
  fs.writeFileSync(path.join(out, `evidence/${side}.txt`), files.map(f => `FILE ${f.path}${f.context ? ' [unchanged context]' : ''}\n${f[side].records.map(r => `L${r.line}${r.signatureRole ? ' [' + r.signatureRole + ']' : ''} ${r.code}`).join('\n\n')}`).join('\n\n' + '─'.repeat(72) + '\n\n') + '\n');
}
fs.writeFileSync(path.join(out, 'evidence/changes.txt'), files.filter(f => f.deltas.length).map(f => `FILE ${f.path} [${f.scope}]\n${f.deltas.map(d => `${d.change.toUpperCase()} ${d.id}\n${d.before ? 'BEFORE L' + d.before.line + '\n' + d.before.code : 'BEFORE (absent)'}\n${d.after ? 'AFTER L' + d.after.line + '\n' + d.after.code : 'AFTER (absent)'}`).join('\n\n')}`).join('\n\n' + '─'.repeat(72) + '\n\n') + '\n');
const summary = { changedFiles: stats.length, productionFiles: files.filter(f => !f.context && f.scope === 'production').length, sourceDeltaFiles: files.filter(f => !f.context && f.scope === 'production' && f.deltas.length).length, testFiles: files.filter(f => f.scope === 'test' || f.scope === 'meta-test').length, helpers: files.filter(f => f.scope === 'test-helper').length, changedDeclarations: files.reduce((sum, f) => sum + f.deltas.length, 0), unchangedContext: contexts };
fs.writeFileSync(path.join(out, 'evidence/summary.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
