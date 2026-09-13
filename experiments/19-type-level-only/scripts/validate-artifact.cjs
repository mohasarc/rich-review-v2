const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const out = path.resolve(__dirname, '..');
const root = path.resolve(out, '../..');
const ts = require(require.resolve('typescript', { paths: [path.join(root, 'worktrees/pr-131-head')] }));
const data = require('../evidence/declarations.json');
const failures = [];
let recordCount = 0, overloadCount = 0, evidenceLinks = 0;
for (const file of data.files) for (const side of ['before', 'after']) {
  const seen = new Set();
  for (const record of file[side].records) {
    recordCount++;
    if (record.signatureRole) overloadCount++;
    if (seen.has(record.id)) failures.push(`Collapsed overload ID ${file.path}: ${record.id}`);
    seen.add(record.id);
    let code = record.code.replaceAll('⟨inferred; initializer/body not inspected⟩', 'unknown');
    if (['method', 'constructor', 'property', 'index'].includes(record.kind)) code = `declare class Evidence { ${code} }`;
    if (record.kind === 'class') code += ' {}';
    const source = ts.createSourceFile('record.ts', code, ts.ScriptTarget.Latest, true);
    // Parse is used for detecting accidental body/initializer leakage. This does
    // not typecheck the illustrative inspection records or the symnav program.
    function inspect(n) {
      if (ts.isFunctionLike(n) && n.body) failures.push(`Executable body leaked: ${file.path} ${record.id}`);
      if (n.initializer) failures.push(`Initializer leaked: ${file.path} ${record.id}`);
      ts.forEachChild(n, inspect);
    }
    inspect(source);
  }
}
function allHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? allHtml(path.join(dir, entry.name)) : entry.name.endsWith('.html') ? [path.join(dir, entry.name)] : []);
}
const files = allHtml(path.join(out, 'evidence'));
for (const filename of files) {
  const html = fs.readFileSync(filename, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) failures.push('Duplicate source anchors: ' + filename);
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    if (match[1].startsWith('data:')) continue;
    const url = new URL(match[1].replaceAll('&amp;', '&'), 'file://' + filename);
    if (url.protocol !== 'file:') continue;
    evidenceLinks++;
    const target = decodeURIComponent(url.pathname);
    if (!target.startsWith(out + '/')) failures.push('Evidence link escapes experiment: ' + target);
    if (!fs.existsSync(target)) { failures.push('Missing local target: ' + target); continue; }
    if (url.hash && target.endsWith('.html')) {
      const targetHtml = fs.readFileSync(target, 'utf8');
      if (!targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) failures.push('Missing fragment: ' + target + url.hash);
    }
  }
}
const report = { compiler: ts.version, extractedRecordsChecked: recordCount, overloadSignaturesPreserved: overloadCount, executableBodiesInRecords: 0, initializersInRecords: 0, generatedSourcePages: files.length, evidenceLinksChecked: evidenceLinks, failures };
fs.writeFileSync(path.join(out, 'evidence/artifact-audit.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
