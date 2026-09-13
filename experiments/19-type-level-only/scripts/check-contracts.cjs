// Compiler observations over copied declarations. No symnav implementation bodies.
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve(__dirname, '..');
const root = path.resolve(out, '../..');
const ts = require(require.resolve('typescript', { paths: [path.join(root, 'worktrees/pr-131-head')] }));
const data = require('../evidence/declarations.json');
function declaration(file, side, id) {
  const record = data.files.find(f => f.path === file)?.[side].records.find(r => r.id === id);
  if (!record) throw new Error(`Missing declaration ${side} ${file} ${id}`);
  return record.code;
}
const policy = declaration('packages/daemon/src/daemon-policy.ts', 'after', 'interface:DaemonPolicyValues');
const beforeOutput = declaration('apps/cli/src/command-execution-result.ts', 'before', 'interface:OrderedCommandOutputOptions').replaceAll('OrderedCommandOutputOptions', 'BeforeOutputOptions');
const afterOutput = declaration('apps/cli/src/command-execution-result.ts', 'after', 'interface:OrderedCommandOutputOptions').replaceAll('OrderedCommandOutputOptions', 'AfterOutputOptions');
const afterTransport = declaration('apps/cli/src/daemon/local-daemon-transport.ts', 'after', 'interface:LocalDaemonTransportOptions');

// Workspace evidence needs shared dependency names, but assignability only compares
// their identical annotations. Use the original full options declarations with
// those unchanged names declared as opaque interfaces, never implementations.
const beforeWorkspace = declaration('apps/cli/src/daemon/workspace-daemon.ts', 'before', 'interface:WorkspaceDaemonOptions').replaceAll('WorkspaceDaemonOptions', 'BeforeWorkspaceOptions');
const afterWorkspace = declaration('apps/cli/src/daemon/workspace-daemon.ts', 'after', 'interface:WorkspaceDaemonOptions').replaceAll('WorkspaceDaemonOptions', 'AfterWorkspaceOptions');
const opaque = ['DaemonWorkspaceIdentity', 'DaemonPolicy', 'ProgramDependencies', 'DaemonRegistry', 'LocalDaemonTransport', 'DaemonNavigationWorker', 'DaemonResourcePolicy', 'DaemonClock', 'CompletionSpoolStorage', 'DaemonLogger'];
const cases = [
  { id: 'empty', name: 'Empty options', expression: '{}', before: 'BeforeOutputOptions', after: 'AfterOutputOptions', expected: [true, false], note: 'The new output option requires a policy property. Empty options used to fit.' },
  { id: 'legacy', name: 'Legacy numeric knob', expression: '{ readonly inlineBytes: 64 }', before: 'BeforeOutputOptions', after: 'AfterOutputOptions', expected: [true, false], note: 'An old knob cannot supply the new policy property.' },
  { id: 'missing', name: 'One missing field', expression: '{ readonly directory: string; readonly policy: Omit<DaemonPolicyValues["output"], "maximumChunkRawBytes"> }', before: 'BeforeOutputOptions', after: 'AfterOutputOptions', expected: [true, false], note: 'The slice requires all four output fields. The old shape has only optional output knobs; the shared directory field makes this structural comparison explicit.' },
  { id: 'complete', name: 'Complete output slice', expression: '{ readonly directory: string; readonly policy: DaemonPolicyValues["output"] }', before: 'BeforeOutputOptions', after: 'AfterOutputOptions', expected: [true, true], note: 'A named structural value can carry extra fields. The old options recognize directory; the new options additionally require the complete slice.' },
  { id: 'negative', name: 'All four values are −1', expression: '{ readonly directory: string; readonly policy: { readonly maximumChunkRawBytes: -1; readonly inlineRawBytes: -1; readonly maximumResultRawBytes: -1; readonly maximumAggregateSpoolRawBytes: -1 } }', before: 'BeforeOutputOptions', after: 'AfterOutputOptions', expected: [true, true], note: 'The slice checks names and number types. It does not encode positivity, units, relative limits, or construction by DaemonPolicy.' },
  { id: 'extra', name: 'Policy plus retired knob', expression: '{ readonly directory: string; readonly inlineBytes: 64; readonly policy: DaemonPolicyValues["output"] }', before: 'BeforeOutputOptions', after: 'AfterOutputOptions', expected: [true, true], note: 'Extra properties on a named structural value are allowed. A fresh object literal supplied directly to the new options receives a separate excess-property check; this observation is not about fresh literals.' },
  { id: 'workspace', name: 'Workspace without old knobs', expression: 'AfterWorkspaceOptions', before: 'BeforeWorkspaceOptions', after: 'AfterWorkspaceOptions', expected: [false, true], note: 'The head shape no longer requires memoryCapBytes. All other retained required annotations are shared between the two sides.' },
  { id: 'workspace_old', name: 'Full old workspace shape', expression: 'BeforeWorkspaceOptions', before: 'BeforeWorkspaceOptions', after: 'AfterWorkspaceOptions', expected: [true, true], note: 'The old shape contains all retained required fields. Removing tuning properties does not make named structural values with those properties unassignable.' },
];
const observations = [
  { id: 'purpose_ordinary', name: 'Ordinary purpose', expression: '{ responseTimeoutPurpose: "ordinary" } extends LocalDaemonTransportOptions ? true : false', expected: true },
  { id: 'purpose_status', name: 'Status observer purpose', expression: '{ responseTimeoutPurpose: "status-observer" } extends LocalDaemonTransportOptions ? true : false', expected: true },
  { id: 'purpose_request', name: 'Request-kind word as purpose', expression: '{ responseTimeoutPurpose: "execution-status" } extends LocalDaemonTransportOptions ? true : false', expected: false },
  { id: 'purpose_omitted', name: 'Purpose omitted', expression: '{} extends LocalDaemonTransportOptions ? true : false', expected: true },
  { id: 'independent_numeric_fields', name: 'Zero and two are both number-shaped budgets', expression: '{ postAcceptanceExecutionReattachmentLimit: 0; resultTransferResumeLimitPerExecutionAttempt: 2 } extends DaemonPolicyValues["delivery"] ? true : false', expected: true },
];
let source = '// Generated from declaration snapshots. No implementation bodies.\n' + [policy, beforeOutput, afterOutput, afterTransport, ...opaque.map(name => `interface ${name} { readonly __opaque_${name}?: never }`), beforeWorkspace, afterWorkspace].join('\n\n') + '\n\n';
for (const c of cases) {
  source += `type Case_${c.id} = ${c.expression};\ntype Result_${c.id}_before = Case_${c.id} extends ${c.before} ? true : false;\ntype Result_${c.id}_after = Case_${c.id} extends ${c.after} ? true : false;\n`;
}
for (const o of observations) source += `type Observation_${o.id} = ${o.expression};\n`;
const filename = path.join(out, 'evidence/contract-observations.ts');
fs.writeFileSync(filename, source);
const program = ts.createProgram([filename], { strict: true, noEmit: true, target: ts.ScriptTarget.ESNext, types: [], skipLibCheck: true });
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCurrentDirectory: () => out, getCanonicalFileName: f => f, getNewLine: () => '\n' }));
const checker = program.getTypeChecker();
const sf = program.getSourceFile(filename);
const results = new Map(sf.statements.filter(ts.isTypeAliasDeclaration).map(n => [n.name.text, checker.typeToString(checker.getTypeFromTypeNode(n.type))]));
function result(name) {
  const text = results.get(name);
  if (text !== 'true' && text !== 'false') throw new Error('Nonliteral result for ' + name + ': ' + text);
  return text === 'true';
}
for (const c of cases) {
  c.actual = [result(`Result_${c.id}_before`), result(`Result_${c.id}_after`)];
  if (JSON.stringify(c.expected) !== JSON.stringify(c.actual)) throw new Error(`Unexpected result ${c.id}: ${c.actual}`);
}
for (const o of observations) {
  o.actual = result(`Observation_${o.id}`);
  if (o.actual !== o.expected) throw new Error('Unexpected purpose observation: ' + o.id);
}
const report = { compilerVersion: ts.version, diagnostics: diagnostics.length, method: 'Conditional type assignability over copied explicit declarations. Unchanged workspace dependency annotations are represented by distinct shared opaque interfaces. No runtime execution; no fresh object literal excess-property checks.', cases, observations };
fs.writeFileSync(path.join(out, 'evidence/compiler-observations.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`TypeScript ${ts.version}: ${cases.length * 2 + observations.length} declaration-only observations; zero diagnostics.`);
