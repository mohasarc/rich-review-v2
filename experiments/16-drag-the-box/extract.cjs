const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');

const root = path.resolve(__dirname, '../..');
const ts = require(require.resolve('typescript', { paths: [path.join(root, 'worktrees/pr-131-head')] }));
const packages = [
  { id: 'cli', name: 'symnav / CLI', dir: 'apps/cli', allow: ['core', 'daemon', 'renderer', 'backend', 'telemetry'], note: 'Composes the system; owns the mechanisms in this PR.' },
  { id: 'daemon', name: '@symnav/daemon', dir: 'packages/daemon', allow: [], note: 'Owns policy and portable contracts. No internal dependencies.' },
  { id: 'core', name: '@symnav/core', dir: 'packages/core', allow: [], note: 'Language-agnostic primitives. No internal dependencies.' },
  { id: 'renderer', name: '@symnav/renderer', dir: 'packages/renderer', allow: ['core', 'daemon'], note: 'Formats output.' },
  { id: 'backend', name: '@symnav/backend-typescript', dir: 'packages/backend-typescript', allow: ['core'], note: 'TypeScript navigation.' },
  { id: 'telemetry', name: '@symnav/telemetry', dir: 'packages/telemetry', allow: [], note: 'Usage capture; also owns the Clock type.' },
  { id: 'testing', name: '@symnav/testing', dir: 'packages/testing', allow: [], note: 'Shared test utilities; no upstream package dependencies.' },
];
const packageOf = file => packages.find(p => file.startsWith(p.dir + '/'))?.id || 'meta';
const patch = fs.readFileSync(path.join(root, 'inputs/pr-131/diff.patch'), 'utf8');
const changes = patch.split(/(?=^diff --git )/m).filter(Boolean).map(text => {
  const file = text.split('\n')[0].split(' b/')[1];
  const lines = text.split('\n');
  return { file, patch: text, added: lines.filter(l => /^\+(?!\+\+)/.test(l)).length, removed: lines.filter(l => /^-(?!--)/.test(l)).length };
});
const evidencePaths = ['AGENTS.md', 'eslint.config.mjs', 'plans/005/daemon-policy.md', 'plans/005/daemon-architecture-functional-spec.md', ...packages.flatMap(p => [p.dir + '/package.json', p.dir + '/tsconfig.json'])];

function snapshot(revision) {
  const tree = path.join(root, `worktrees/pr-131-${revision}`);
  const paths = cp.execFileSync('rg', ['--files', 'apps/cli', 'packages', 'meta-tests/src', '-g', '*.ts', '-g', '!node_modules', '-g', '!dist', '-g', '!fixtures', '-g', '!*.d.ts'], { cwd: tree, encoding: 'utf8' }).trim().split('\n').sort();
  const pathSet = new Set(paths);
  const files = {};
  const resolve = (from, specifier) => {
    if (specifier.startsWith('.')) {
      const joined = path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
      return [joined.replace(/\.js$/, '.ts'), joined + '.ts', joined + '/index.ts', joined].find(p => pathSet.has(p)) || 'unresolved:' + joined;
    }
    const pkg = packages.find(p => specifier === p.name || specifier.startsWith(p.name + '/'));
    if (pkg) {
      const subpath = specifier.slice(pkg.name.length);
      return pkg.dir + '/src/' + (subpath ? subpath.slice(1) + '.ts' : 'index.ts');
    }
    return 'external:' + specifier;
  };
  let edgeIndex = 0;
  const edges = [];
  for (const file of paths) {
    const source = fs.readFileSync(path.join(tree, file), 'utf8');
    const syntax = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const info = { package: packageOf(file), test: /\.test\.ts$|\/test\//.test(file), declarations: [], source, imports: [], runtimeLoads: [] };
    for (const statement of syntax.statements) {
      if (statement.name && (ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement))) {
        info.declarations.push({ name: statement.name.text, kind: ts.isClassDeclaration(statement) ? 'class' : ts.isInterfaceDeclaration(statement) ? 'interface' : 'type', line: syntax.getLineAndCharacterOfPosition(statement.getStart(syntax)).line + 1 });
      }
      if (!(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) || !statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
      const specifier = statement.moduleSpecifier.text;
      const symbols = [];
      let isType = false;
      if (ts.isImportDeclaration(statement)) {
        const clause = statement.importClause;
        isType = clause?.isTypeOnly || false;
        if (clause?.name) symbols.push({ name: clause.name.text, imported: 'default', type: isType });
        if (clause?.namedBindings) {
          if (ts.isNamedImports(clause.namedBindings)) {
            for (const item of clause.namedBindings.elements) symbols.push({ name: item.name.text, imported: item.propertyName?.text || item.name.text, type: isType || item.isTypeOnly });
          } else symbols.push({ name: clause.namedBindings.name.text, imported: '*', type: isType });
        }
      } else {
        isType = statement.isTypeOnly;
        if (statement.exportClause && ts.isNamedExports(statement.exportClause)) for (const item of statement.exportClause.elements) symbols.push({ name: item.name.text, imported: item.propertyName?.text || item.name.text, type: isType || item.isTypeOnly });
        else symbols.push({ name: '*', imported: '*', type: isType });
      }
      const types = symbols.filter(s => s.type).length;
      const edge = { id: revision + '-' + edgeIndex++, from: file, to: resolve(file, specifier), specifier, symbols, kind: symbols.length && types === symbols.length ? 'type' : types ? 'mixed' : 'value', line: syntax.getLineAndCharacterOfPosition(statement.getStart(syntax)).line + 1, text: statement.getText(syntax), syntax: ts.isImportDeclaration(statement) ? 'import' : 're-export' };
      info.imports.push(edge.id);
      edges.push(edge);
    }
    function visit(node) {
      if ((ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) || (ts.isNewExpression(node) && node.expression.getText(syntax) === 'URL') || ts.isImportTypeNode(node)) info.runtimeLoads.push({ line: syntax.getLineAndCharacterOfPosition(node.getStart(syntax)).line + 1, text: node.getText(syntax) });
      ts.forEachChild(node, visit);
    }
    visit(syntax);
    files[file] = info;
  }
  const documents = Object.fromEntries(evidencePaths.map(p => [p, fs.readFileSync(path.join(tree, p), 'utf8')]));
  return { sha: cp.execFileSync('git', ['rev-parse', 'HEAD'], { cwd: tree, encoding: 'utf8' }).trim(), files, edges, documents };
}
const data = { pr: JSON.parse(fs.readFileSync(path.join(root, 'inputs/pr-131/pr.json'), 'utf8')), packages, changes, snapshots: { base: snapshot('base'), head: snapshot('head') } };
fs.writeFileSync(path.join(__dirname, 'data.js'), 'window.REVIEW_DATA = ' + JSON.stringify(data) + ';\n');
const summary = Object.fromEntries(Object.entries(data.snapshots).map(([rev, s]) => [rev, { sha: s.sha, files: Object.keys(s.files).length, importDeclarations: s.edges.length, unresolved: s.edges.filter(e => e.to.startsWith('unresolved:')).map(e => ({ from: e.from, specifier: e.specifier })) }]));
fs.writeFileSync(path.join(__dirname, 'extraction-report.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify({ ...summary, changedFiles: changes.length, dataBytes: fs.statSync(path.join(__dirname, 'data.js')).size }, null, 2));
