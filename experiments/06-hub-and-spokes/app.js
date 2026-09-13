"use strict";

const R = window.REVIEW;
const esc = (value) =>
  String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const md = (text) =>
  esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
const fmt = (n) => Number(n).toLocaleString("en-US");

/* ───────────────────────── derived facts ───────────────────────── */

const PAIRS = R.pairs.map((p) => ({
  ...p,
  diverged: p.cliToPackageIgnoringImports.added + p.cliToPackageIgnoringImports.removed,
  edited: p.baseToCli.added + p.baseToCli.removed,
}));
const pairByPackage = Object.fromEntries(PAIRS.map((p) => [p.package, p]));
const COPY_LINES = PAIRS.reduce((sum, p) => sum + p.packageLines, 0);
const DIVERGED = PAIRS.filter((p) => p.diverged > 0);
const EDITED = PAIRS.filter((p) => p.edited > 0);
const MOVED_TESTS = R.tests.filter((t) => t.status.startsWith("R") && t.after.startsWith("packages/daemon/src/"));
const SIZE = R.sizes;
const HUB_LINES = SIZE["new hub production: client/"].added;
const TOTAL_ADDED = Object.values(SIZE).reduce((s, b) => s + b.added, 0);
const TOTAL_REMOVED = Object.values(SIZE).reduce((s, b) => s + b.removed, 0);
const PKG_FILES = Object.keys(R.graph.files);
const SELF_IMPORTERS = R.graph.selfImporters.length;
const LOADED = Object.fromEntries(Object.entries(R.graph.loaded).map(([k, list]) => [k, list.map((f) => f.replace(/\.js$/, ".ts"))]));

function packageLines(path) {
  return R.graph.files[path.replace("packages/daemon/src/", "")] ?? 0;
}

function copyMark(pkgPath) {
  const pair = pairByPackage[pkgPath];
  if (!pair) return { cls: "badge-new", text: "new" };
  return pair.diverged ? { cls: "badge-div", text: `≠ ${pair.diverged}` } : { cls: "badge-same", text: "≡" };
}

/* ───────────────────────── decisions (top layer carries all) ───────────────────────── */

const DECISIONS = [
  {
    id: "K1",
    tier: 1,
    status: "stated",
    title: "Copy mechanisms into the package; CLI keeps running its own copies",
    fact: `38 files, ${fmt(COPY_LINES)} lines copied into \`packages/daemon/src\`. \`DaemonClient\` has 0 production callers. The \`symnav\` binary still spawns \`apps/cli/dist/daemon/daemon-entry.js\`. #149 switches the CLI.`,
    reason: "“mechanism ownership and host invocation coordination need separate review boundaries” — PR body, Decisions #3",
    section: "s-hubs",
  },
  {
    id: "K2",
    tier: 1,
    status: "partly",
    title: "Freeze the 38 CLI copies with one sha256 digest",
    fact: "`meta-tests/src/daemon-compatibility-copy.test.ts` hashes the 38 files (CRLF→LF) and asserts count = 38. Any edit to shipped daemon code fails CI until the digest changes. Pins CLI copies to themselves, not to the package copies (10 already differ). 3 CLI-owned files excluded by name.",
    reason: "Freeze: PR tree “freezes 38 app-local production copies”. Digest as the mechanism: no reason found; commit subjects only (“Specify portable daemon compatibility hashing”).",
    ask: "Until #149, is the invariant you need “CLI copy unchanged” or “CLI copy ≡ package copy”?",
    section: "s-static",
  },
  {
    id: "K3",
    tier: 1,
    status: "partly",
    title: "Move direct mechanism unit suites to the package copies",
    fact: `37 test files moved (\`ed3baa7f1\` +18,875 in package, \`501c5b5e7\` −18,139 in app). The CLI retains dispatcher, transport-contract and e2e tests. ${DIVERGED.length} copied files still differ after top-level imports are removed; 3 differences are only type import/re-export paths. \`daemon-entry.test.ts\` deleted (2 tests); CLI version-mismatch oracle restored in \`daemon-executor.test.ts\`. Added: \`tsx\` devDependency, \`fileParallelism: false\`; Windows-specific cleanup expectation (K18).`,
    reason: "No reason found. PR tree says “moved”, not why the shipped copies lose unit coverage.",
    ask: "Until #149 lands, is e2e + dispatcher tests + digest enough cover for the code users run?",
    section: "s-tests",
  },
  {
    id: "K4",
    tier: 1,
    status: "partly",
    title: "Edit shipped CLI mechanisms first, then freeze them",
    fact: `14 commits edit CLI mechanisms before the copy. ${EDITED.length} shipped production files change (+408/−284): registry and controller use a canonical owner predicate, with identityKey and full-owner comparisons added; timing uses an injected daemon wall/monotonic clock; coordinate validation moves into construction and adds workspaceRoot; WorkspaceDaemon becomes DaemonProcessCoordinator.`,
    reason: "Spec scope: “one owner each for … lock-ownership check”, “daemon owns its wall and monotonic clock”, “WorkspaceDaemon split into process coordinator”. Why checks got stricter: none found. Spec forbids fixes while moving.",
    ask: "Do the tightened ownership comparisons count as behavior change under the spec’s “no fixes while moving” rule?",
    section: "s-cli-edits",
  },
  {
    id: "K5",
    tier: 2,
    status: "stated",
    title: "Separate public declarations from the Node runtime",
    fact: "`DaemonClient` (64 lines) imports only types. Its constructor starts `import(runtimeModuleUrl)` through a string variable; `execute`/`control` await the same promise. The facade’s type-dependency closure has 7 source files. The runtime still uses Node. Root API grows by 1 class + 4 types.",
    reason: "“host declarations must not acquire Node ambient dependencies” — PR body, Decisions #1",
    section: "s-facade",
  },
  {
    id: "K6",
    tier: 2,
    status: "partly",
    title: "Host passes 7 options, including a required readiness probe",
    fact: "stateDirectory, productVersion, daemonEnabled (readonly boolean option), executorFactory (new executor per local attempt; no resource sample), executorModuleUrl, readinessProbe, policy?. Host keeps argv classification and workspace-root resolution. Disabled skips execute routing and start; status/stop remain available. The internal coordinator retains a `version --version` probe default.",
    reason: "Spec “What a host provides”: executor, module location, state directory, product version. Required probe and boolean flag: no reason found (commit subject “Specify host-owned daemon readiness probe”).",
    ask: "For a long-lived host, should daemonEnabled be fixed configuration or a per-call callback as it is in today’s dispatcher?",
    section: "s-facade",
  },
  {
    id: "K17",
    tier: 2,
    status: "partly",
    title: "`control()` rethrows mechanism errors; host formats them",
    fact: "start/status/stop failures reject the promise (`daemon-client-control.test.ts` “rejects %s mechanism errors for the host wrapper”). Today the CLI command prints `Cannot start daemon: …` and exits 2 itself.",
    reason: "Spec: “control(action): a lifecycle report the host renders”. Error channel: not mentioned.",
    section: "s-facade",
  },
  {
    id: "K7",
    tier: 2,
    status: "stated",
    title: "Route with 4 ordered, lazy guards",
    fact: "record present → not starting → version match → responsive. First answer wins; registry read and observation memoized per decision. Absent and fallback routes trigger background startup without waiting; starting/recovering stay local without a trigger. The 12-scenario table matches the dispatcher’s route outcomes (`daemon-client.test.ts:33-124`).",
    reason: "“the first routing decision must prevent every later side effect” — PR body, Decisions #2; spec “Guard-List Admission and Routing”",
    section: "s-routing",
  },
  {
    id: "K8",
    tier: 2,
    status: "partly",
    title: "Build every mechanism once per client, not per request",
    fact: "Constructor builds 1 registry, 2 transports (250 ms / 100 ms lifecycle timeout), 1 terminator, 1 launcher, 1 startup coordinator, 2 controllers, 4 record observers (3 built inside coordinator and controllers). Registry, routing transport, terminator are shared across spokes. Dispatcher built its set per request; CLI daemon commands per command. The shared coordinator keeps 4 launched-process maps for the client’s lifetime.",
    reason: "Timeout split: carried from CLI `daemon status` (spec: behavior unchanged). Per-client lifetime and sharing: no reason found.",
    ask: "Should state from a routing `trigger` survive into later `control` calls on the same client?",
    section: "s-composition",
  },
  {
    id: "K9",
    tier: 2,
    status: "stated",
    title: "Client owns warm result capture and failure bytes",
    fact: "Package builds a `DaemonClientResultCapture` (OS temp dir) per warm request. Only a retry-safe transport failure reruns locally; uncertain acceptance or failed completion returns a warm failure. 5 failure codes → 3 “Cannot answer: …” messages, now defined in package and CLI. Malformed warm output is disposed before replacement; dispatcher did not.",
    reason: "“warm transfer cleanup and replay safety belong to the daemon client” — PR body, Decisions #4",
    section: "s-results",
  },
  {
    id: "K15",
    tier: 2,
    status: "stated",
    title: "Keep acceptance-based idle timing",
    fact: "The 30-minute idle deadline starts at construction and resets on navigation acceptance, not completion. Navigation that reaches its deadline triggers shutdown when the queue empties; a new test pins this. The functional spec excludes warm-up from idle, but this PR defers readiness-armed and completion-based timing; follow-ups grow from 6 to 8 items.",
    reason: "“readiness- and completion-based lifetime changes are explicitly deferred behavior” — PR body, Decisions #5",
    section: "s-process",
  },
  {
    id: "K10",
    tier: 3,
    status: "unexplained",
    title: "Warm requests send the client’s protocol constant",
    fact: "`protocolVersion: DAEMON_PROTOCOL_VERSION` (`daemon-client-runtime.ts:189`) replaces the record’s `protocolVersion` (`daemon-command-dispatcher.ts:216`).",
    reason: "No reason found.",
    section: "s-routing",
  },
  {
    id: "K11",
    tier: 3,
    status: "partly",
    title: "Export `./process-entry` and `./worker-entry` subpaths",
    fact: "Side-effect-only entries with no named exports (`entry-boundary.test.ts`). No importer in #148 or in #149’s CLI; launcher and worker resolve entries by relative URL (`process-launcher.ts:156`, `navigation-worker.ts:95`).",
    reason: "What: PR tree “exposes real process and worker entry subpaths”. Why public: no reason found.",
    section: "s-process",
  },
  {
    id: "K12",
    tier: 3,
    status: "unexplained",
    title: "Re-implement the completion-spool record codec in the package",
    fact: "`CompletionSpoolRecordCodec` (63 lines, `delivery/completion-spool.ts`) replaces the CLI’s `OrderedCommandOutput.encodeRecord/decodeFileRecords`. One 9-byte header format, two implementations.",
    reason: "No reason found. Nearby repo rule, not cited: “Loose coupling beats DRY across module boundaries” (CLAUDE.md).",
    section: "s-process",
  },
  {
    id: "K13",
    tier: 3,
    status: "stated",
    scopeNote: "planned; omitted from PR body",
    title: "Remove the temporary `@symnav/daemon/policy-testing` export",
    fact: "Export, ESLint `no-restricted-imports` rule, and 5 test declarations (6 cases, including it.each) deleted. `DaemonPolicyTestFactory` now lives in two test helpers (`apps/cli/test/helpers/daemon-policy.ts`, `packages/daemon/test/helpers/daemon-policy.ts`), identical except one import.",
    reason: "daemon-policy.md, Migration access: the policy-testing subpath is temporary and is removed after app-owned mechanism tests move package-local. Its retirement is explicitly planned; the PR body omits it.",
    section: "s-static",
  },
  {
    id: "K14",
    tier: 3,
    status: "partly",
    title: "Group package mechanisms into 10 ownership folders",
    fact: `client/ delivery/ diagnostics/ execution/ lifecycle/ process/ registry/ resources/ transport/ worker/. Placement calls: \`startup-coordinator\` under registry/, \`controller\` and \`process-launcher\` under process/, \`client-result-capture\` under transport/. ${SELF_IMPORTERS} of ${PKG_FILES.length} production files import the package’s own entry \`@symnav/daemon\` (including type-only imports, retained from the CLI copies); value imports of that root now exports \`DaemonClient\`, so daemon process and worker thread load the facade module too.`,
    reason: "Commit subject “Organize daemon mechanisms by ownership”. Spec lists concerns, not folders. Per-file placement: no reason found.",
    section: "s-static",
  },
  {
    id: "K16",
    tier: 3,
    status: "unexplained",
    title: "Keep an unreachable `disabled` route variant",
    fact: "`DaemonRouteSnapshot` includes `{ kind: \"disabled\" }` (`daemon-routing-policy.ts:6`); no guard returns it. `execute` checks `daemonEnabled` before routing (`daemon-client-runtime.ts:140`).",
    reason: "Commit subject only: “Represent disabled daemon routing” (+1 line).",
    section: "s-routing",
  },
  {
    id: "K18",
    tier: 3,
    status: "unexplained",
    title: "Use a Windows-specific termination expectation",
    fact: "`built-process-entry.test.ts` expects a retained ready record and no `process-termination` log on win32; the test cleans up the record. Other platforms expect automatic record removal and a diagnostic. This is a new test’s platform split, not a deleted cross-platform assertion. Windows was not run for this artifact.",
    reason: "Commit subject only: “Specify Windows process entry cleanup ownership”.",
    section: "s-tests",
  },
];

const TIERS = {
  1: "What ships, and what guards it",
  2: "Shape of the hub",
  3: "Small, easy to miss",
};

const STATUS_LABEL = { stated: "stated", partly: "stated + unexplained", unexplained: "unexplained" };
const statusRank = { unexplained: 0, partly: 1, stated: 2 };
const REASON_PARTS = {
  K2: ["Staging separates mechanism ownership from host coordination (PR body, Decisions #3).", "Why one digest, why these exemptions, and why no package-equivalence assertion: no reason found."],
  K3: ["The extraction spec says tests using deep mechanism paths must use the public surface or move into the package.", "Why direct suites are not retained for the still-shipped copies until cutover, and why test file parallelism is disabled: no reason found."],
  K4: ["The architecture spec assigns daemon clocks and canonical lock ownership to the daemon; it names the process coordinator split.", "Why some ownership comparisons become stricter during an unchanged-behavior refactor: no reason found."],
  K6: ["Executor/module injection keeps command-specific logic in the host (architecture spec, Executor Contract and Module Injection).", "Why readinessProbe is required, why its internal default stays CLI-shaped, and why daemonEnabled is a boolean rather than a callback: no reason found."],
  K8: ["daemon-policy.md gives the 100 ms status timeout a separate purpose: keep status aggregation responsive independently of routing’s 250 ms timeout.", "Why mechanisms and the coordinator’s process maps are shared for one client’s lifetime: no reason found."],
  K17: ["Lifecycle reports let the host render lifecycle outcomes (architecture spec, Lifecycle Rendering).", "Why mechanism errors reject for the host to format instead of returning reports: no reason found."],
  K11: ["The extraction spec includes package-owned process and worker entries in the public surface.", "Why public subpaths are added while internal launchers use relative URLs: no additional reason found."],
  K14: ["The contributor guide asks directories to follow ownership so their listing explains the package; commit: Organize daemon mechanisms by ownership.", "Why these particular folder placements and retained self-imports: no reason found."],
};

/* ───────────────────────── hub figure ───────────────────────── */

const HUB = { x: 770, y: 300, r: 68 };
const OLD_HUB = { x: 180, y: 285, r: 60 };

const SPOKES = [
  { id: "routing", x: 770, y: 92, t1: "DaemonRoutingPolicy", t2: "4 ordered guards", file: "packages/daemon/src/client/daemon-routing-policy.ts", section: "s-routing", trace: ["DaemonRoutingPolicy", "guard:"] },
  { id: "policy", x: 530, y: 150, t1: "DaemonPolicy · clock", t2: "policy existed · clock copied", file: "packages/daemon/src/lifecycle/daemon-clock.ts", section: "s-composition", trace: [] },
  { id: "registry", x: 1030, y: 130, t1: "DaemonRegistry", t2: "+ workspace identity · 1,068 lines", w: 220, file: "packages/daemon/src/registry/registry.ts", section: "s-cli-edits", trace: ["DaemonRegistry"] },
  { id: "observer", x: 1055, y: 245, t1: "DaemonRecordObserver", t2: "identify + ping", file: "packages/daemon/src/registry/record-observer.ts", section: "s-routing", trace: ["DaemonRecordObserver"] },
  { id: "transport", x: 1055, y: 362, t1: "LocalDaemonTransport ×2", t2: "250 ms routing · 100 ms status", file: "packages/daemon/src/transport/local-transport.ts", section: "s-composition", trace: ["LocalDaemonTransport"] },
  { id: "results", x: 1030, y: 478, t1: "Warm result capture", t2: "+ 3 “Cannot answer” messages", w: 214, file: "packages/daemon/src/transport/client-result-capture.ts", section: "s-results", trace: ["DaemonClientResultCapture"] },
  { id: "startup", x: 770, y: 505, t1: "StartupCoordinator → Launcher", t2: "trigger · ensureRunning · spawn", w: 250, file: "packages/daemon/src/registry/startup-coordinator.ts", section: "s-process", trace: ["DaemonStartupCoordinator", "NodeDaemonProcessLauncher", "NodeDaemonProcessTerminator"] },
  { id: "controllers", x: 535, y: 455, t1: "DaemonController ×2", t2: "start/stop · status", file: "packages/daemon/src/process/controller.ts", section: "s-composition", trace: ["DaemonController"] },
  { id: "executor", x: 500, y: 330, t1: "host executorFactory", t2: "cold · fallback · per attempt", file: null, section: "s-facade", trace: ["host:executorFactory"] },
];

const OLD_SPOKES = [
  { id: "o-selector", x: 180, y: 95, t1: "InvocationWorkspaceSelector", t2: "argv → local / control / workspace", w: 210, trace: ["InvocationWorkspaceSelector"] },
  { id: "o-core", x: 88, y: 185, t1: "core.createWorkspace", t2: "resolve root", w: 150, trace: ["@symnav/core"] },
  { id: "o-runtime", x: 272, y: 185, t1: "createRuntime()", t2: "per request", w: 140, trace: ["createRuntime"] },
  { id: "o-executor", x: 88, y: 400, t1: "CliProgramExecutor", t2: "local run", w: 150, trace: ["CliProgramExecutor"] },
  { id: "o-copies", x: 240, y: 470, t1: "38 frozen copies 🔒", t2: "registry · transport · startup …", w: 210, trace: ["DaemonRegistry", "DaemonRecordObserver", "DaemonStartupCoordinator", "NodeDaemonProcessLauncher", "LocalDaemonTransport", "DaemonClientResultCapture"] },
  { id: "o-commands", x: 105, y: 535, t1: "register-daemon-command", t2: "start / status / stop", w: 180, trace: [] },
];

function spokeBox(spoke, extraClass = "") {
  const w = spoke.w ?? 206;
  const h = 44;
  const mark = spoke.file ? copyMark(spoke.file) : null;
  const pillW = mark ? Math.max(20, mark.text.length * 7 + 8) : 0;
  const badge = mark
    ? `<rect x="${spoke.x + w / 2 - pillW - 4}" y="${spoke.y - h / 2 - 8}" width="${pillW}" height="15" rx="7" fill="#fff" stroke="#d0d7de"></rect><text class="${mark.cls}" x="${spoke.x + w / 2 - pillW / 2 - 4}" y="${spoke.y - h / 2 + 3}" text-anchor="middle">${esc(mark.text)}</text>`
    : "";
  const oldSections = { "o-selector": "s-hubs", "o-core": "s-hubs", "o-runtime": "s-composition", "o-executor": "s-facade", "o-copies": "s-static", "o-commands": "s-facade" };
  return `<g class="spoke ${extraClass}" data-spoke="${spoke.id}" data-section="${spoke.section ?? oldSections[spoke.id]}" tabindex="0">
    <rect x="${spoke.x - w / 2}" y="${spoke.y - h / 2}" width="${w}" height="${h}"></rect>
    <text class="t1" x="${spoke.x}" y="${spoke.y - 3}" text-anchor="middle">${esc(spoke.t1)}</text>
    <text class="t2" x="${spoke.x}" y="${spoke.y + 13}" text-anchor="middle">${esc(spoke.t2)}</text>${badge}
  </g>`;
}

function hubFigure() {
  const edges = SPOKES.map((s) => `<line class="edge" data-edge="${s.id}" x1="${HUB.x}" y1="${HUB.y}" x2="${s.x}" y2="${s.y}"></line>`).join("");
  const oldEdges = OLD_SPOKES.filter((s) => s.id !== "o-commands")
    .map((s) => `<line class="edge live" data-edge="${s.id}" x1="${OLD_HUB.x}" y1="${OLD_HUB.y}" x2="${s.x}" y2="${s.y}"></line>`)
    .join("");
  return `<svg viewBox="0 0 1180 720" width="100%" role="group" aria-label="Interactive hub map: DaemonClient and the active CLI dispatcher">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8c959f"></path></marker>
    <marker id="arrow-live" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#1a7f37"></path></marker>
  </defs>
  <g id="cli-side">
    <rect class="region" x="8" y="34" width="345" height="530" rx="10"></rect>
    <text class="region-label" x="20" y="54">apps/cli — what \`symnav\` runs today (base and head)</text>
    ${oldEdges}
    ${OLD_SPOKES.map((s) => spokeBox(s)).join("")}
    <g class="hub old" data-spoke="o-hub" data-section="s-hubs"><circle cx="${OLD_HUB.x}" cy="${OLD_HUB.y}" r="${OLD_HUB.r}"></circle>
      <text x="${OLD_HUB.x}" y="${OLD_HUB.y - 4}" text-anchor="middle" font-size="12">DaemonCommand</text>
      <text x="${OLD_HUB.x}" y="${OLD_HUB.y + 12}" text-anchor="middle" font-size="12">Dispatcher</text>
      <text x="${OLD_HUB.x}" y="${OLD_HUB.y + 27}" text-anchor="middle" font-size="9.5">apps/cli · live</text></g>
    <rect class="region" x="8" y="580" width="345" height="132" rx="10"></rect>
    <text class="region-label" x="20" y="600">spawned by the CLI</text>
    <g class="spoke" data-spoke="o-process" data-section="s-process"><rect x="30" y="615" width="300" height="80"></rect>
      <text class="t1" x="180" y="640" text-anchor="middle">apps/cli/dist/daemon/daemon-entry.js</text>
      <text class="t2" x="180" y="658" text-anchor="middle">→ DaemonProcessCoordinator (CLI copy)</text>
      <text class="t2" x="180" y="675" text-anchor="middle">→ daemon-navigation-worker-entry.js</text></g>
    <path class="edge live" d="M240,492 L240,615" marker-end="url(#arrow-live)"></path>
  </g>
  <g id="pkg-side">
    <rect class="region" x="368" y="34" width="806" height="530" rx="10"></rect>
    <text class="region-label" x="380" y="54">@symnav/daemon — client objects inside the host process (new in #148)</text>
    ${edges}
    ${SPOKES.map((s) => spokeBox(s)).join("")}
    <g class="hub" data-spoke="hub" data-section="s-facade"><circle cx="${HUB.x}" cy="${HUB.y}" r="${HUB.r}"></circle>
      <text x="${HUB.x}" y="${HUB.y - 8}" text-anchor="middle" font-size="15">DaemonClient</text>
      <text x="${HUB.x}" y="${HUB.y + 10}" text-anchor="middle" font-size="10">facade 64 lines</text>
      <text x="${HUB.x}" y="${HUB.y + 24}" text-anchor="middle" font-size="10">runtime 270 lines</text></g>
    <rect class="region" x="368" y="580" width="806" height="132" rx="10"></rect>
    <text class="region-label" x="380" y="600">spawned by DaemonClient (only in tests and recorded runs during #148)</text>
    <g class="spoke" data-spoke="p-entry" data-section="s-process"><rect x="430" y="615" width="470" height="80"></rect>
      <text class="t1" x="665" y="638" text-anchor="middle">daemon process: process-entry.js → DaemonProcessCoordinator</text>
      <text class="t2" x="665" y="656" text-anchor="middle">far hub · ${LOADED.daemon.length} modules: queue · ledger · execution + delivery sessions</text>
      <text class="t2" x="665" y="673" text-anchor="middle">spool · resources · worker generations · lifetime · logger · socket server</text></g>
    <g class="spoke" data-spoke="p-worker" data-section="s-process"><rect x="920" y="615" width="230" height="80"></rect>
      <text class="t1" x="1035" y="640" text-anchor="middle">worker thread</text>
      <text class="t2" x="1035" y="658" text-anchor="middle">worker-entry.js · ${LOADED.worker.length} modules</text>
      <text class="t2" x="1035" y="675" text-anchor="middle">loads host executor module</text></g>
    <path class="edge dashed" data-edge="spawn" d="M770,527 L770,615" marker-end="url(#arrow)"></path>
    <text x="778" y="575" font-size="11" fill="#59636e">spawn (detached)</text>
    <path class="edge dashed" data-edge="socket" d="M1100,384 C1150,520 1040,560 900,640" marker-end="url(#arrow)"></path>
    <text x="1088" y="520" font-size="11" fill="#59636e">unix socket</text>
    <path class="edge dashed" data-edge="thread" d="M900,655 L920,655" marker-end="url(#arrow)"></path>
  </g>
  <g id="host-edge">
    <path class="edge none" d="M353,250 C520,225 610,250 708,286" marker-end="url(#arrow)"></path>
    <rect x="392" y="208" width="232" height="36" rx="5" fill="#ffebe9" stroke="#cf222e"></rect>
    <text x="508" y="223" text-anchor="middle" font-size="11.5" fill="#cf222e" font-weight="600">0 production callers in #148</text>
    <text x="508" y="238" text-anchor="middle" font-size="11" fill="#cf222e">#149 connects the CLI host</text>
  </g>
</svg>`;
}

/* ───────────────────────── run player ───────────────────────── */

const RUNS = {
  cli: {
    label: "DaemonClient + real symnav executor",
    trace: R.traces.cli,
    side: "pkg",
    steps: { A: "overview #1, no daemon", B: "overview #2, daemon ready", C: "control status", E: "control stop", G: "overview, daemonEnabled=false" },
  },
  fixture: {
    label: "DaemonClient + fixture executor",
    trace: R.traces.fixture,
    side: "pkg",
    steps: { A: "execute, no daemon", B: "execute, ready", C: "status", D: "execute as version 2.0.0", E: "stop", F: "stop again", G: "disabled" },
  },
  old: {
    label: "CLI dispatcher (what ships)",
    trace: R.traces.oldHead,
    side: "cli",
    steps: { L: "symnav --version", A: "overview #1, no daemon", B: "overview #2, daemon ready", G: "SYMNAV_DAEMON=0" },
  },
};

function eventsForStep(trace, step) {
  return trace.events.filter((e) => e.step === step || e.step === `${step}-wait`);
}

function litSpokesFor(runKey, step) {
  const run = RUNS[runKey];
  const events = eventsForStep(run.trace, step);
  const lit = new Set();
  const table = run.side === "cli" ? OLD_SPOKES : SPOKES;
  for (const e of events) {
    for (const spoke of table) {
      if (spoke.trace.some((prefix) => e.spoke.startsWith(prefix) || (prefix === "createRuntime" && e.method === "createRuntime"))) lit.add(spoke.id);
    }
    if (run.side === "cli" && e.spoke === "DaemonCommandDispatcher") lit.add("o-hub");
    if (run.side === "pkg" && e.spoke === "DaemonClientRuntime") lit.add("hub");
    if (run.side === "pkg" && (e.spoke === "LocalDaemonTransport" || e.spoke === "NodeDaemonProcessLauncher")) lit.add("p-entry");
    if (run.side === "cli" && (e.spoke === "LocalDaemonTransport" || e.spoke === "NodeDaemonProcessLauncher")) lit.add("o-process");
  }
  if (run.side === "pkg" && run.trace.daemonLog && run.trace.wallStartMs) {
    const stepInfo = run.trace.steps.find((s) => s.name === step);
    if (stepInfo) {
      const from = run.trace.wallStartMs + stepInfo.startedAt;
      const until = run.trace.wallStartMs + stepInfo.finishedAt + 5;
      const kinds = run.trace.daemonLog.filter((l) => l.timestamp >= from && l.timestamp <= until).map((l) => l.kind);
      if (kinds.length) lit.add("p-entry");
      if (kinds.some((k) => k === "worker-completed" || k === "startup-completed")) lit.add("p-worker");
    }
  }
  return lit;
}

function stepLog(runKey, step) {
  const run = RUNS[runKey];
  const events = eventsForStep(run.trace, step);
  const byId = new Map(events.map((e) => [e.id, e]));
  const depth = (e) => {
    let d = 0;
    let parent = e.parent;
    while (parent && byId.has(parent) && d < 8) {
      d += 1;
      parent = byId.get(parent).parent;
    }
    return d;
  };
  const compress = [];
  let last = "";
  let repeat = 0;
  const calls = events.filter((x) => x.phase === "call");
  const t0 = calls[0]?.t ?? 0;
  for (const e of calls) {
    const name = `${e.spoke}${e.instance ? `(${e.instance})` : ""}.${e.method}`;
    const line = `${"  ".repeat(depth(e))}${name}`;
    const stamp = `+${(e.t - t0).toFixed(1)}`.padStart(8);
    if (line === last) {
      repeat += 1;
      compress[compress.length - 1] = compress[compress.length - 1].replace(/  ×\d+$/, "") + `  ×${repeat + 1}`;
      continue;
    }
    repeat = 0;
    last = line;
    compress.push(`${stamp} ms  ${line}`);
  }
  const stepInfo = run.trace.steps.find((s) => s.name === step);
  let outcome = "";
  if (stepInfo) {
    if (runKey === "old") outcome = `→ mode ${stepInfo.mode}, exit ${stepInfo.exitCode}, ${stepInfo.bytes} bytes, sha256 ${stepInfo.sha256}`;
    else {
      const o = stepInfo.outcome;
      if (o && o.mode) outcome = `→ mode ${o.mode}, exit ${o.exitCode}, ${o.output?.bytes ?? "?"} bytes${o.output?.sha256 ? `, sha256 ${o.output.sha256}` : ""}`;
      else if (Array.isArray(o)) outcome = `→ ${o.length} daemon(s): ${o.map((x) => x.state).join(", ")}`;
      else if (o && o.status) outcome = `→ ${o.status}`;
    }
    outcome += `   (${Math.round((stepInfo.finishedAt - stepInfo.startedAt) * 10) / 10} ms)`;
  }
  let logLine = "";
  if (run.side === "pkg" && stepInfo && run.trace.daemonLog) {
    const from = run.trace.wallStartMs + stepInfo.startedAt;
    const until = run.trace.wallStartMs + stepInfo.finishedAt + 5;
    const kinds = run.trace.daemonLog.filter((l) => l.timestamp >= from && l.timestamp <= until).map((l) => l.kind);
    if (kinds.length) logLine = `\ndaemon.log (far side): ${kinds.join(" → ")}`;
  }
  const wait = events.some((e) => e.step.endsWith("-wait")) ? "\n(includes background calls that finished after the step returned)" : "";
  return `${outcome}${logLine}${wait}\n\n${compress.join("\n")}`;
}

let currentMode = "pkg";
let currentRun = null;

function centerVisibleHub() {
  const map = document.getElementById("hubfig");
  const svg = map.querySelector("svg");
  if (map.clientWidth >= svg.clientWidth) return;
  const hub = currentMode === "pkg" ? HUB : OLD_HUB;
  map.scrollLeft = hub.x * svg.clientWidth / 1180 - map.clientWidth / 2;
}

function applyMode(mode) {
  currentMode = mode;
  document.querySelectorAll("[data-mode]").forEach((b) => {
    b.classList.toggle("on", b.dataset.mode === mode);
    b.setAttribute("aria-pressed", String(b.dataset.mode === mode));
  });
  const cli = document.getElementById("cli-side");
  const pkg = document.getElementById("pkg-side");
  const host = document.getElementById("host-edge");
  cli.classList.toggle("dim", mode === "pkg");
  pkg.classList.toggle("dim", mode === "cli");
  host.classList.toggle("dim", mode === "cli");
  centerVisibleHub();
}

function playStep(runKey, step) {
  currentRun = { runKey, step };
  document.querySelectorAll(".stepbtn").forEach((b) => {
    const selected = b.dataset.run === runKey && b.dataset.step === step;
    b.classList.toggle("on", selected);
    b.setAttribute("aria-pressed", String(selected));
  });
  applyMode(RUNS[runKey].side);
  const lit = litSpokesFor(runKey, step);
  document.querySelectorAll("#hubfig [data-spoke]").forEach((g) => g.classList.toggle("lit", lit.has(g.dataset.spoke)));
  document.querySelectorAll("#hubfig [data-edge]").forEach((line) => {
    const id = line.dataset.edge;
    const on = lit.has(id) || (id === "spawn" && lit.has("p-entry") && lit.has("startup")) || (id === "socket" && lit.has("p-entry") && lit.has("transport")) || (id === "thread" && lit.has("p-worker"));
    line.classList.toggle("lit", on);
  });
  document.getElementById("steplog").textContent = stepLog(runKey, step);
}

function playerHtml() {
  const rows = Object.entries(RUNS)
    .map(
      ([key, run]) => `<div class="row"><span class="lbl">${esc(run.label)}</span>${Object.entries(run.steps)
        .map(([step, label]) => `<button class="stepbtn" data-run="${key}" data-step="${step}" title="${esc(label)}">${step} · ${esc(label)}</button>`)
        .join("")}</div>`,
    )
    .join("");
  return `<div class="player">${rows}<div id="steplog" class="steplog"></div>
  <div class="real">Saved real executions, macOS arm64, Node ${esc("v22.12.0")}, built head/base worktrees, ${esc(R.traces.cli.recordedAt.slice(0, 16))}Z. Buttons replay stored data; no daemon runs in this page. Probes wrap prototypes in memory. Scripts: <code>analysis/trace.mjs</code>, <code>analysis/trace-old.mjs</code>.</div><div class="lossy">highlights group calls by spoke; far-process highlights correlate client calls with daemon-log timestamps</div></div>`;
}

/* ───────────────────────── evidence helpers ───────────────────────── */

const TREE_LABEL = { head: "head", base: "base", stack: "#149 tip" };

function codeBlock(key, title) {
  const ex = R.excerpts[key];
  const lines = ex.code.split("\n");
  const body = lines.map((line, i) => `<span class="ln">${ex.start + i}</span>${esc(line)}`).join("\n");
  return `<details class="ev"><summary>${esc(title ?? ex.path)} <span class="loc">${TREE_LABEL[ex.tree]}:${esc(ex.path)}:${ex.start}-${ex.end}</span>${ex.note ? ` <span class="muted">(${esc(ex.note)})</span>` : ""}</summary><div class="evbody"><pre class="code">${body}</pre></div></details>`;
}

function diffBlock(text, title, open = false) {
  const body = text
    .split("\n")
    .map((line) => {
      const cls = line.startsWith("+") && !line.startsWith("+++") ? "add" : line.startsWith("-") && !line.startsWith("---") ? "del" : line.startsWith("@@") ? "hunk" : "";
      return `<span class="${cls}">${esc(line)}</span>`;
    })
    .join("\n");
  return `<details class="ev"${open ? " open" : ""}><summary>${esc(title)}</summary><div class="evbody"><pre class="code">${body}</pre></div></details>`;
}

function textBlock(text, title) {
  return `<details class="ev"><summary>${esc(title)}</summary><div class="evbody"><pre class="code">${esc(text)}</pre></div></details>`;
}

function carries(ids) {
  return `<div class="carries">Deeper view of ${ids
    .map((id) => {
      const d = DECISIONS.find((x) => x.id === id);
      return `<a href="#card-${id}" data-return-to="card-${id}">${id} ${md(d.title)}</a>`;
    })
    .join(" · ")}</div>`;
}

/* ───────────────────────── top layer ───────────────────────── */

function sizeBar() {
  const parts = [
    ["package production copies of CLI files (38)", "#afb8c1", "copied mechanisms (38 files)"],
    ["new/changed package tests + fixtures", "#8250df", "new tests, fixtures, helpers"],
    ["tests moved app→package (renames)", "#c297ff", "moved tests (net of rename)"],
    ["new hub production: client/", "#0b3d91", "hub code: client/ (4 files)"],
    ["CLI production edits (shipped, then frozen)", "#1a7f37", "shipped CLI edits (12 files)"],
  ];
  const known = new Set(parts.map((p) => p[0]));
  const rest = Object.entries(SIZE).filter(([k]) => !known.has(k)).reduce((s, [, v]) => s + v.added, 0);
  const segments = parts.map(([k, color]) => `<div style="width:${(SIZE[k].added / TOTAL_ADDED) * 100}%;background:${color}" title="${esc(k)} +${SIZE[k].added}"></div>`).join("") + `<div style="width:${(rest / TOTAL_ADDED) * 100}%;background:#eaeef2"></div>`;
  const legend = parts.map(([k, color, label]) => `<i style="background:${color}"></i><span>${esc(label)}</span><span class="mono">+${fmt(SIZE[k].added)}</span>`).join("") + `<i style="background:#eaeef2"></i><span>meta-tests, plans, CLI tests, config</span><span class="mono">+${fmt(rest)}</span>`;
  return `<div class="sizebar">${segments}</div><div class="sizelegend">${legend}</div>`;
}

function topHtml() {
  const oldB = R.traces.oldHead.steps.find((s) => s.name === "B");
  const newB = R.traces.cli.steps.find((s) => s.name === "B");
  const cards = [1, 2, 3]
    .map((tier) => {
      const list = DECISIONS.filter((d) => d.tier === tier).sort((a, b) => statusRank[a.status] - statusRank[b.status]);
      return `<h2 class="tier">${esc(TIERS[tier])} <span class="muted">(${list.length})</span></h2><div class="cards">${list
        .map(
          (d) => `<div class="card ${d.status}" id="card-${d.id}">
        <div class="title"><span class="chip id">${d.id}</span><span class="chip ${d.status}">${STATUS_LABEL[d.status]}</span>${d.scopeNote ? `<span class="chip scope">${esc(d.scopeNote)}</span>` : ""}${md(d.title)}</div>
        <div class="fact-line">${md(d.fact)}</div>
        ${REASON_PARTS[d.id] ? REASON_PARTS[d.id].map((reason, i) => `<div class="reason"><span class="chip ${i ? "unexplained" : "stated"}">${i ? "unexplained" : "stated"}</span>${md(reason)}</div>`).join("") : `<div class="reason">Reason: ${md(d.reason)}</div>`}
        ${d.ask ? `<div class="ask">${md(d.ask)}</div>` : ""}
        <div class="go"><a href="#${d.section}" data-return-to="card-${d.id}">open ${esc(SECTION_TITLES[d.section])} ↓</a></div>
      </div>`,
        )
        .join("")}</div>`;
    })
    .join("");
  return `<header class="pr" id="top">
    <h1>#148 Own daemon mechanisms behind DaemonClient</h1>
    <span class="stat">stack part 25 of 26 · 45 commits · 153 files · +${fmt(TOTAL_ADDED)} −${fmt(TOTAL_REMOVED)} · base <code>…part-24</code> → head <code>…part-25</code></span>
  </header>
  <div class="guide">Start with the picture and decision cards; every deeper section expands those decisions. Click a spoke, card, or link to go deeper; ↩ returns to your place. Scroll for the linear version.</div>
  <details class="mobile-menu"><summary>Jump to a spoke or decision</summary>${tocHtml()}</details>
  <p class="idea"><b>@symnav/daemon</b> gains <b>DaemonClient</b>: a host hands it a workspace root and argv (or start/status/stop); the client picks warm, cold, or fallback and returns bytes. <b>The CLI has no production caller yet.</b> <code>symnav</code> still runs the CLI’s own daemon copies, frozen by a hash test.</p>
  <div class="top-stack">
    <div class="panel">
      <div class="panel-head"><span class="seg"><button data-mode="pkg" class="on">New hub (package)</button><button data-mode="cli">What <code>symnav</code> runs today</button></span>
        <span class="lossy">star groups direct and indirect dependencies; spokes share registry, transport and terminator. Constructor wiring in “Composition”.</span></div>
      <div class="panel-body"><div class="mobile-hint">Pan the diagram sideways to follow all the spokes.</div><div id="hubfig">${hubFigure()}</div>
        <div class="small muted">≡ / ≠ compare source after removing top-level imports and blank lines; type-path changes remain. new = no CLI twin. Click a box or focus it and press Enter to open its section.</div>
        <div class="evidence-head">One concrete run — pick a step, watch which spokes it touches</div>
        ${playerHtml()}</div>
    </div>
    <div class="facts-row">
      <div class="panel"><div class="panel-head"><b>Where the +${fmt(TOTAL_ADDED)} lines go</b></div><div class="panel-body">${sizeBar()}
        <div class="fact" style="margin-top:8px">Hub code is ${fmt(HUB_LINES)} lines (${((HUB_LINES / TOTAL_ADDED) * 100).toFixed(1)}%). Copied mechanisms are ${fmt(COPY_LINES)} (${((COPY_LINES / TOTAL_ADDED) * 100).toFixed(0)}%).<span class="rcpt">git diff --numstat -M base...head, bucketed: analysis/size-buckets.json</span></div></div></div>
      <div class="fact">0 production imports of <code>DaemonClient</code>. Shipped binary on head spawns <code>apps/cli/dist/daemon/daemon-entry.js</code>.<span class="rcpt">grep over apps/, meta-tests/; ps of spawned daemon: analysis/cli-probe-head.txt. Caller arrives in #149: <code>apps/cli/src/program.ts:58</code> (stack tip)</span></div>
      <div class="fact">One input, both hubs: <code>overview barrel.ts</code> → ${newB.outcome.output.bytes} bytes via DaemonClient and ${oldB.bytes} via the shipped dispatcher (both warm), matching fingerprint <code>${esc(newB.outcome.output.sha256)}</code>.<span class="rcpt">SHA-256 of stream names + bytes, first 16 hex. Saved trace-cli.json and trace-old-head.json; also cold and disabled steps. One fixture, not a whole-system parity result.</span></div>
      <div class="fact">PR “Before” diagram draws <code>CLI host → WorkspaceDaemon</code>. The host’s hub is <code>DaemonCommandDispatcher</code> (<code>apps/cli/src/cli.ts:11</code>); WorkspaceDaemon (now DaemonProcessCoordinator) runs inside the spawned daemon process.<span class="rcpt">cli.ts, daemon-entry.ts in base</span></div>
      <div class="fact">${DECISIONS.length} decision groups: ${DECISIONS.filter((d) => d.status === "stated").length} stated, ${DECISIONS.filter((d) => d.status === "unexplained").length} unexplained, ${DECISIONS.filter((d) => d.status === "partly").length} combining stated and unexplained choices.<span class="rcpt">Reasons searched in the PR body, 45 commit messages (bodies empty), all four plans/005 documents, CLAUDE.md and the contributor guide. “Unexplained” means no reason found in these inputs; each mixed card separates the supported choice from the rationale gap.</span></div>
    </div>
  </div>
  <p class="rule">Ranking: tier 1 changes what users run or what guards it; tier 2 shapes the hub’s contract; tier 3 is local. Inside a tier: unexplained first.</p>
  ${cards}`;
}

/* ───────────────────────── sections ───────────────────────── */

const SECTION_TITLES = {
  "s-hubs": "Two hubs, one runs",
  "s-facade": "Facade: what a host sees",
  "s-routing": "Routing spoke",
  "s-composition": "Composition: exact wiring",
  "s-results": "Warm results and failure bytes",
  "s-process": "Across the process boundary",
  "s-static": "Static structure: where the boundary moved",
  "s-tests": "Tests: what pins what",
  "s-cli-edits": "Shipped CLI edits before the freeze",
  "s-method": "Method and receipts",
};

function section(id, decisionIds, body) {
  return `<section class="deep" id="${id}"><button class="backlink" data-back>↩ back</button><h2>${esc(SECTION_TITLES[id])}</h2>${decisionIds.length ? carries(decisionIds) : ""}${body}</section>`;
}

function responsibilityGrid() {
  const rows = [
    ["Classify argv (local / control / workspace)", "own", "host", "host: CliInvocationCoordinator"],
    ["Resolve workspace root (core)", "own", "host", "host"],
    ["Read registry, probe daemon", "own", "own", "DaemonClient"],
    ["Decide warm / cold / fallback", "own · if-chain", "own · 4 guards", "DaemonClient"],
    ["Trigger background start", "own", "own", "DaemonClient"],
    ["Run warm over socket, capture result", "own", "own", "DaemonClient"],
    ["Run locally", "own · CliProgramExecutor", "own · host executorFactory", "host for local routes; DaemonClient for workspace routes"],
    ["Controlled failure bytes", "own · ControlledCommandResult", "own · DaemonControlledResult", "both exist"],
    ["start / status / stop composition", "register-daemon-command.ts", "own · control()", "DaemonClient"],
    ["Mechanism lifetime", "per request / per command", "per client", "per DaemonClient, built with CLI dependencies"],
  ];
  const cell = (v) => (v.startsWith("own") ? `<span class="own">●</span> ${esc(v.replace(/^own ?·? ?/, ""))}` : v === "host" ? `<span class="host">host</span>` : esc(v));
  return `<table class="grid"><tr><th>Responsibility</th><th>DaemonCommandDispatcher<br><span class="muted">apps/cli · live</span></th><th>DaemonClient<br><span class="muted">package · #148, no caller</span></th><th>After #149<br><span class="muted">stack tip, context only</span></th></tr>${rows
    .map((r) => `<tr><td>${esc(r[0])}</td><td>${cell(r[1])}</td><td>${cell(r[2])}</td><td class="muted">${esc(r[3])}</td></tr>`)
    .join("")}</table>`;
}

function sameInputTable() {
  const rows = [];
  const oldSteps = Object.fromEntries(R.traces.oldHead.steps.map((s) => [s.name, s]));
  const baseSteps = Object.fromEntries(R.traces.oldBase.steps.map((s) => [s.name, s]));
  const newSteps = Object.fromEntries(R.traces.cli.steps.map((s) => [s.name, s]));
  for (const [step, label] of [["A", "overview barrel.ts, no daemon"], ["B", "overview barrel.ts, daemon ready"], ["G", "overview barrel.ts, daemon disabled"]]) {
    const o = oldSteps[step];
    const b = baseSteps[step];
    const n = newSteps[step]?.outcome;
    rows.push(`<tr><td>${step}</td><td>${esc(label)}</td><td>${b.mode} · ${b.bytes} B · <code>${b.sha256}</code></td><td>${o.mode} · ${o.bytes} B · <code>${o.sha256}</code></td><td>${n.mode} · ${n.output.bytes} B · <code>${n.output.sha256}</code></td></tr>`);
  }
  return `<table class="grid"><tr><th></th><th>input (overview-cases fixture)</th><th>dispatcher, base</th><th>dispatcher, head (ships)</th><th>DaemonClient, head + CLI executor</th></tr>${rows.join("")}</table>
  <div class="real">each column is a separate real run with its own daemon; sha256 over stream name + bytes, first 16 hex</div>`;
}

function sectionHubs() {
  return section(
    "s-hubs",
    ["K1", "K8"],
    `<div class="fig two">
      <div>${responsibilityGrid()}<div class="cap">Who owns each step of one invocation. #149 column from the stack tip (<code>apps/cli/src/cli-invocation-coordinator.ts</code>, <code>program.ts:58</code>), shown only to place #148.</div></div>
      <div>${sameInputTable()}
        <div class="evidence-head">Spokes touched, same step B (warm)</div>
        <table class="grid"><tr><th>dispatcher (ships)</th><th>DaemonClient</th></tr><tr><td class="mono small">${stepCalls("old", "B")}</td><td class="mono small">${stepCalls("cli", "B")}</td></tr></table>
        <div class="cap">Left calls selector, core, createRuntime on every request. Right: none of those; routing through 4 guards.</div></div>
    </div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("cliEntry", "CLI entry: the host enters the old hub")}
    ${codeBlock("dispatcherExecute", "Old hub: DaemonCommandDispatcher.execute + routeFor")}
    ${codeBlock("runtimeExecute", "New hub: DaemonClientRuntime.execute")}
    ${codeBlock("stackWiring", "Where the caller appears (#149)")}
    ${textBlock(R.probes.head, "Shipped binary on head: spawned daemon command line (analysis/cli-probe-head.txt)")}
    ${textBlock(R.probes.base, "Shipped binary on base: same entry (analysis/cli-probe-base.txt)")}`,
  );
}

function stepMs(runKey, step) {
  const info = RUNS[runKey].trace.steps.find((s) => s.name === step);
  return info ? (Math.round((info.finishedAt - info.startedAt) * 10) / 10).toString() : "?";
}

function stepCalls(runKey, step) {
  const events = eventsForStep(RUNS[runKey].trace, step).filter((e) => e.phase === "call" && !e.step.endsWith("-wait"));
  const seen = [];
  for (const e of events) {
    const name = `${e.spoke.replace("guard:", "guard ")}${e.method === "createRuntime" ? ".createRuntime" : ""}`;
    if (seen[seen.length - 1] !== name) seen.push(name);
  }
  return seen.map(esc).join("<br>");
}

function sectionFacade() {
  const decl = R.graph.inProcess.facadeDeclarations;
  const host = LOADED.host;
  const daemon = LOADED.daemon;
  const worker = LOADED.worker;
  const lines = (list) => fmt(list.reduce((s, f) => s + (R.graph.files[f] ?? 0), 0));
  const ring = `<svg viewBox="0 0 760 250" width="100%" style="max-width:860px">
    <rect x="10" y="10" width="740" height="230" rx="12" fill="#f6f8fa" stroke="#d0d7de"></rect>
    <text x="24" y="32" font-size="12" fill="#59636e" font-weight="600">spawned by launcher: daemon process ${daemon.length} files · ${lines(daemon)} lines   |   worker thread ${worker.length} files · ${lines(worker)} lines</text>
    <rect x="40" y="45" width="520" height="180" rx="12" fill="#ddf4ff" stroke="#0969da"></rect>
    <text x="54" y="66" font-size="12" fill="#0969da" font-weight="600">host process after construction: ${host.length} files · ${lines(host)} lines (Node APIs)</text>
    <rect x="70" y="80" width="300" height="130" rx="12" fill="#0b3d91"></rect>
    <text x="86" y="102" font-size="12.5" fill="#fff" font-weight="600">host compiles against: ${decl.length} files</text>
    ${decl.map((f, i) => `<text x="86" y="${122 + i * 12}" font-size="10.5" fill="#dbe7fb" font-family="ui-monospace,Menlo,monospace">${esc(f)}</text>`).join("")}
    <path d="M370,145 C420,145 430,120 470,120" stroke="#cf222e" stroke-width="2" fill="none" stroke-dasharray="4 3"></path>
    <text x="390" y="110" font-size="11" fill="#cf222e">import(runtimeModuleUrl)</text>
    <text x="390" y="170" font-size="11" fill="#59636e">string variable → tsc</text>
    <text x="390" y="184" font-size="11" fill="#59636e">does not follow it</text>
    <text x="590" y="120" font-size="11.5" fill="#1f2328">+ spawn edge</text>
    <text x="590" y="136" font-size="11.5" fill="#1f2328">process-launcher.ts:156</text>
    <text x="590" y="160" font-size="11.5" fill="#1f2328">+ Worker edge</text>
    <text x="590" y="176" font-size="11.5" fill="#1f2328">navigation-worker.ts:95</text>
  </svg>`;
  const options = [
    ["stateDirectory", "registry dir, controllers, local executor", "existed in CLI wiring"],
    ["productVersion", "version guard, launcher config, local executor", "was `symnavVersion` from CLI dependencies"],
    ["daemonEnabled", "`execute` short-circuit, `control start` → `{status: \"disabled\"}`", "readonly boolean option; dispatcher took `() => boolean` per call"],
    ["executorFactory", "every cold and fallback run (new executor each time)", "spec: daemon defines executor, CLI implements"],
    ["executorModuleUrl", "launcher → daemon process → worker loads it", "spec: injected module location"],
    ["readinessProbe", "`DaemonStartupCoordinator.probeExecution` during `daemon start`", "required; package keeps default `version --version`"],
    ["policy?", "every threshold", "tests override; default `DaemonPolicy.currentSystem()`"],
  ];
  return section(
    "s-facade",
    ["K5", "K6", "K17"],
    `<div class="fig">${ring}<div class="cap"><span class="lossy">nested rectangles compare code reach; the host is a separate process from the daemon</span> Inner box: source type-dependency closure of <code>client/daemon-client.ts</code> (<code>analysis/graph.py</code>). Outer counts: modules Node actually resolved from built <code>dist</code> — host imports the package root, constructs <code>DaemonClient</code>, calls <code>execute</code>; daemon and worker counts come from importing their entries in separate probe processes. Resolve hook: <code>analysis/module-load-*.mjs</code>.</div></div>
    <div class="fig"><table class="grid"><tr><th>DaemonClientOptions</th><th>used by</th><th>origin / note</th></tr>${options.map((o) => `<tr><td><code>${o[0]}</code></td><td>${md(o[1])}</td><td>${md(o[2])}</td></tr>`).join("")}</table>
    <div class="cap">Returned: <code>execute → { mode: "warm" | "cold" | "fallback", result }</code>; <code>control → DaemonStartResult | RunningDaemonStatus[] | DaemonStopResult</code>, rejecting on mechanism errors.</div></div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("facade", "Facade: DaemonClient + runtime loader")}
    ${codeBlock("contracts", "Host contracts")}
    ${codeBlock("hostContractTest", "Contract test: exact host boundary")}
    ${codeBlock("readinessDefault", "Package default probe still names a CLI flag")}
    ${codeBlock("readinessUse", "Where the probe is used")}
    ${codeBlock("perAttemptTest", "Test: new executor for every local attempt")}
    ${codeBlock("controlTest", "Test: control composition, distinct timeouts")}`,
  );
}

function sectionRouting() {
  const rungs = [
    ["RecordPresentRoutingGuard", "registry.read() → none", "cold · absent", "read throws → cold · recovering"],
    ["NotStartingRoutingGuard", "record.state = starting", "cold · starting", ""],
    ["RecordVersionRoutingGuard", "record.symnavVersion ≠ productVersion", "fallback · incompatible", ""],
    ["ResponsiveRoutingGuard", "observe(record): identify + ping", "warm", "starting → cold · starting/recovering · unresponsive or observe throws → cold · recovering · exited → try record removal, fallback · dead · pong version ≠ or invalid observation → fallback · incompatible"],
  ];
  const ladder = `<svg viewBox="0 0 900 365" width="100%" style="max-width:900px">
    ${rungs
      .map((r, i) => {
        const y = 20 + i * 76;
        return `<g><rect x="20" y="${y}" width="300" height="56" rx="8" fill="#fff" stroke="#0b3d91" stroke-width="1.5"></rect>
        <text x="34" y="${y + 22}" font-size="13" font-weight="600">${i + 1}. ${esc(r[0])}</text>
        <text x="34" y="${y + 42}" font-size="12" fill="#59636e">${esc(r[1])}</text>
        <path d="M320,${y + 28} L440,${y + 28}" stroke="#0b3d91" stroke-width="1.6" marker-end="url(#arrow)"></path>
        <text x="330" y="${y + 22}" font-size="10.5" fill="#59636e">answers</text>
        <rect x="440" y="${y + 12}" width="170" height="32" rx="16" fill="${r[2].startsWith("warm") ? "#dafbe1" : r[2].startsWith("fallback") ? "#fff1e5" : "#ddf4ff"}" stroke="#d0d7de"></rect>
        <text x="525" y="${y + 33}" font-size="12" text-anchor="middle" font-weight="600">${esc(r[2])}</text>
        ${r[3] ? `<foreignObject x="625" y="${y}" width="270" height="${i === 3 ? 108 : 66}"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11.5px;color:#59636e;line-height:1.3">${esc(r[3])}</div></foreignObject>` : ""}
        ${i < rungs.length - 1 ? `<path d="M170,${y + 56} L170,${y + 76}" stroke="#8c959f" stroke-width="1.4" marker-end="url(#arrow)"></path><text x="178" y="${y + 70}" font-size="10" fill="#8c959f">undefined → next</text>` : ""}
      </g>`;
      })
      .join("")}
  </svg>`;
  const scenarios = [
    ["disabled", "cold", 1, 0, 0, 0, 0, 0],
    ["absent", "cold", 1, 0, 1, 1, 0, 0],
    ["registry recovery", "cold", 1, 0, 0, 1, 0, 0],
    ["starting record", "cold", 1, 0, 0, 1, 0, 0],
    ["ready idle", "warm", 0, 1, 0, 1, 1, 0],
    ["ready busy", "warm", 0, 1, 0, 1, 1, 0],
    ["responsive starting", "cold", 1, 0, 0, 1, 1, 0],
    ["unresponsive", "cold", 1, 0, 0, 1, 1, 0],
    ["exited", "fallback", 1, 0, 1, 1, 1, 1],
    ["record version mismatch", "fallback", 1, 0, 1, 1, 0, 0],
    ["pong version mismatch", "fallback", 1, 0, 1, 1, 1, 0],
    ["invalid observation", "fallback", 1, 0, 1, 1, 1, 0],
  ];
  const heat = (v) => `<td class="c" style="background:${v ? "#fff4d1" : "#fff"}">${v}</td>`;
  const matrix = `<table class="grid"><tr><th>scenario</th><th>mode</th><th>local runs</th><th>warm runs</th><th>background start</th><th>registry reads</th><th>observations</th><th>record removals</th></tr>${scenarios
    .map((s) => `<tr><td>${esc(s[0])}</td><td>${s[1]}</td>${s.slice(2).map(heat).join("")}</tr>`)
    .join("")}</table>`;
  const mapping = `<table class="grid"><tr><th>dispatcher <code>routeFor</code> (apps/cli, head)</th><th>package guard</th><th>difference</th></tr>
    <tr><td class="mono small">:170-175 read; catch → recovering; undefined → absent</td><td>RecordPresentRoutingGuard</td><td>read memoized in <code>DaemonRoutingContextState</code></td></tr>
    <tr><td class="mono small">:176 state starting</td><td>NotStartingRoutingGuard</td><td>none</td></tr>
    <tr><td class="mono small">:177-179 symnavVersion ≠</td><td>RecordVersionRoutingGuard</td><td>none</td></tr>
    <tr><td class="mono small">:180-203 observe + branches</td><td>ResponsiveRoutingGuard</td><td>observation memoized; same branch order</td></tr>
    <tr><td class="mono small">:128-130 disabled → route {kind:"disabled"}</td><td>(before routing) <code>daemon-client-runtime.ts:140</code></td><td>variant kept in type, never produced (K16)</td></tr>
    <tr><td class="mono small">:132-138 resolve root; failure → local cold</td><td>—</td><td>host’s job now (K6)</td></tr>
    <tr><td class="mono small">:216 protocolVersion: record.protocolVersion</td><td><code>daemon-client-runtime.ts:189</code> DAEMON_PROTOCOL_VERSION</td><td>K10</td></tr></table>`;
  return section(
    "s-routing",
    ["K7", "K10", "K16"],
    `<div class="fig">${ladder}<div class="cap">Order from <code>daemon-routing-policy.ts:123-128</code>. A guard returns a route or <code>undefined</code>. Background start fires only for <b>cold · absent</b> and any <b>fallback</b> (<code>daemon-client-runtime.ts:155-157</code>), same rule as dispatcher <code>:155-160</code>.</div></div>
    <div class="fig two"><div>${matrix}<div class="cap">Transcribed from the <code>it.each</code> table at <code>daemon-client.test.ts:33-90</code>: effects per scenario on the first decision.</div></div>
      <div>${mapping}<div class="cap">Line numbers: <code>apps/cli/src/daemon/daemon-command-dispatcher.ts</code> on head (identical on base).</div>
      <div class="real" style="margin-top:10px">fixture run D: a client at version 2.0.0 meets a 1.0.0 daemon → guard 3 answers fallback · incompatible → local run returns in ${stepMs("fixture", "D")} ms while the background start terminates the 1.0.0 daemon and launches 2.0.0 (player: run “fixture”, step D)</div></div></div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("guards", "Guards and policy")}
    ${codeBlock("routingContext", "Memoizing context")}
    ${codeBlock("routingMemoTest", "Test: no work until decision, memoized operations")}
    ${codeBlock("routeTable", "Test: 12-scenario route table")}
    ${codeBlock("dispatcherExecute", "Old routeFor for comparison")}`,
  );
}

function sectionComposition() {
  const inputs = ["stateDirectory", "productVersion", "executorModuleUrl", "readinessProbe", "policy", "registry", "routing transport", "status transport", "terminator", "launcher", "coordinator"];
  const rows = [
    ["DaemonRegistry", ["stateDirectory", "policy"], "", "daemon-client-runtime.ts:87"],
    ["LocalDaemonTransport · routing", ["policy"], "250 ms lifecycle timeout; builds a result capture per warm request", ":91"],
    ["LocalDaemonTransport · status", ["policy"], "100 ms lifecycle timeout (statusResponseTimeoutMs)", ":95"],
    ["NodeDaemonProcessTerminator", ["policy"], "", ":99"],
    ["NodeDaemonProcessLauncher", ["productVersion", "executorModuleUrl", "policy", "terminator"], "", ":100"],
    ["DaemonRecordObserver", ["routing transport", "terminator"], "", ":106"],
    ["DaemonStartupCoordinator", ["registry", "launcher", "routing transport", "policy", "terminator", "readinessProbe"], "holds launchedInstances, launchedProcesses, launchedExits, launchedInstanceIdsByIdentity; builds its own observer", ":107"],
    ["DaemonController · control", ["registry", "routing transport", "stateDirectory", "policy", "terminator", "launcher", "coordinator"], "builds its own observer", ":117"],
    ["DaemonController · status", ["registry", "status transport", "stateDirectory", "policy", "terminator"], "no launcher → cannot start; builds its own observer", ":128"],
    ["DaemonRoutingPolicy", [], "field initializer; no dependencies", ":83"],
  ];
  const uses = Object.fromEntries(inputs.map((i) => [i, rows.filter((r) => r[1].includes(i)).length]));
  const matrix = `<table class="grid"><tr><th>built in constructor</th>${inputs.map((i) => `<th class="small" style="writing-mode:vertical-rl;transform:rotate(180deg);height:120px;vertical-align:bottom">${esc(i)}</th>`).join("")}<th>note</th></tr>
    ${rows.map((r) => `<tr><td class="small"><b>${esc(r[0])}</b> <span class="loc">${esc(r[3])}</span></td>${inputs.map((i) => `<td class="c" style="background:${r[1].includes(i) ? (["registry", "routing transport", "terminator"].includes(i) ? "#fff4d1" : "#ddf4ff") : "#fff"}">${r[1].includes(i) ? "●" : ""}</td>`).join("")}<td class="small">${esc(r[2])}</td></tr>`).join("")}
    <tr><td class="small muted">instances shared by</td>${inputs.map((i) => `<td class="c small">${uses[i] > 1 ? `<b>${uses[i]}</b>` : uses[i] || ""}</td>`).join("")}<td class="small muted">yellow: one instance, several holders</td></tr></table>`;
  const lifetimes = `<svg viewBox="0 0 900 150" width="100%" style="max-width:960px">
    ${[["DaemonCommandDispatcher", "registry · transport · terminator · launcher · observer · coordinator", 6, "rebuilt each request"], ["register-daemon-command", "registry · transport · controller (+ coordinator inside start)", 1, "rebuilt each command"], ["DaemonClient", "all 10 rows above", 0, "built once per client"]]
      .map(([label, what, split, note], row) => {
        const y = 14 + row * 44;
        const blocks = split
          ? Array.from({ length: split }, (_, i) => `<rect x="${220 + i * 70}" y="${y}" width="60" height="24" rx="4" fill="#dafbe1" stroke="#1a7f37"></rect>`).join("")
          : `<rect x="220" y="${y}" width="410" height="24" rx="4" fill="#ddf4ff" stroke="#0969da"></rect>`;
        return `<text x="10" y="${y + 16}" font-size="12" font-weight="600">${esc(label)}</text>${blocks}<text x="645" y="${y + 16}" font-size="11.5" fill="#1f2328">${esc(note)}</text><text x="220" y="${y + 37}" font-size="10" fill="#59636e">${esc(what)}</text>`;
      })
      .join("")}
    <text x="220" y="148" font-size="10" fill="#59636e">time →</text>
  </svg>`;
  return section(
    "s-composition",
    ["K8"],
    `<div class="fig">${matrix}<div class="cap">Exact version of the star: each row is one object <code>DaemonClientRuntime</code> builds (<code>daemon-client-runtime.ts:83-137</code>), each ● an argument it receives. One registry, one routing transport, one terminator reach several spokes. Coordinator and both controllers also build private observers (<code>startup-coordinator.ts:83</code>, <code>controller.ts:57</code>), so a client holds 4 observers. The package <code>DaemonController</code> gained an injectable <code>startupCoordinator</code> for this sharing; the shipped CLI copy builds a new coordinator inside every <code>start</code>.</div></div>
    <div class="fig">${lifetimes}<div class="cap"><span class="lossy">block counts illustrate repetition; lifetimes are exact</span></div></div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("runtimeConstructor", "DaemonClientRuntime constructor")}
    ${codeBlock("dispatcherRuntime", "Dispatcher: runtime per request")}
    ${codeBlock("controlTest", "Test: one composition, distinct timeouts")}
    ${codeBlock("policyTimeouts", "Policy record: why status and routing have different timeouts")}
    ${diffBlock(pairDiff("apps/cli/src/daemon/daemon-controller.ts"), "Package DaemonController vs shipped copy (top-level imports and blanks stripped)")}
    ${diffBlock(pairDiff("apps/cli/src/daemon/local-daemon-transport.ts"), "Package LocalDaemonTransport vs shipped copy (top-level imports and blanks stripped)")}`,
  );
}

function pairDiff(cliPath) {
  return PAIRS.find((p) => p.cli === cliPath)?.cliToPackageDiff ?? "(identical)";
}

function sectionResults() {
  const outcomes = [
    ["retrySafe transport error: not-submitted, or authenticated retry-safe admission rejection", "fallback", "local run via executorFactory", "no"],
    ["transport error without retrySafe: e.g. unconfirmed timeout, closed after acceptance, authenticated incompatible rejection", "warm", "Cannot answer: accepted daemon request did not complete.", "no replay"],
    ["non-transport error (malformed response)", "warm", "Cannot answer: accepted daemon request did not complete.", "no replay"],
    ["completion failed · controlled-resource", "warm", "Cannot answer: daemon workspace capacity exceeded.", "no"],
    ["completion failed · response-capacity", "warm", "Cannot answer: daemon response capacity exceeded.", "no"],
    ["completion failed · worker-exit / stopping / internal", "warm", "Cannot answer: accepted daemon request did not complete.", "no"],
    ["completed, exit code not integer", "warm", "dispose output, then “did not complete” message", "new: dispose"],
    ["completed, output missing", "warm", "“did not complete” message", "no"],
  ];
  const seq = (() => {
    const run = R.traces.fixture;
    const events = eventsForStep(run, "B").filter((e) => e.phase === "call");
    const t0 = events[0]?.t ?? 0;
    const lanes = { DaemonClientRuntime: 90, DaemonRoutingPolicy: 250, "guard:": 250, DaemonRegistry: 410, DaemonRecordObserver: 560, LocalDaemonTransport: 720, DaemonClientResultCapture: 880 };
    const laneOf = (spoke) => Object.entries(lanes).find(([k]) => spoke.startsWith(k))?.[1] ?? 90;
    const heads = Object.entries({ DaemonClientRuntime: 90, "RoutingPolicy + guards": 250, DaemonRegistry: 410, RecordObserver: 560, "LocalDaemonTransport 250 ms": 720, ResultCapture: 880 })
      .map(([label, x]) => `<text x="${x}" y="18" font-size="11" text-anchor="middle" font-weight="600">${esc(label)}</text><line x1="${x}" y1="26" x2="${x}" y2="${40 + events.length * 17}" stroke="#d0d7de"></line>`)
      .join("");
    const marks = events
      .map((e, i) => {
        const y = 40 + i * 17;
        const x = laneOf(e.spoke);
        const label = `${e.spoke.replace("guard:", "")}.${e.method}${e.instance ? ` (${e.instance})` : ""}`;
        return `<circle cx="${x}" cy="${y}" r="4" fill="#0b3d91"></circle><text x="${x + 9}" y="${y + 4}" font-size="10.5">${esc(label)}</text><text x="8" y="${y + 4}" font-size="10" fill="#8c959f">+${(e.t - t0).toFixed(1)} ms</text>`;
      })
      .join("");
    return `<svg viewBox="0 0 1120 ${60 + events.length * 17}" width="100%">${heads}${marks}</svg>`;
  })();
  return section(
    "s-results",
    ["K9"],
    `<div class="fig">${seq}<div class="real">fixture run, step B (warm). Far side for the same request from daemon.log: request-accepted → turn-started → worker-completed → response-spooled → execution-terminal → delivery-terminal</div></div>
    <div class="fig"><table class="grid"><tr><th>warm outcome</th><th>mode</th><th>bytes returned to host</th><th>change vs dispatcher</th></tr>${outcomes.map((o) => `<tr><td>${esc(o[0])}</td><td>${o[1]}</td><td>${esc(o[2])}</td><td>${esc(o[3])}</td></tr>`).join("")}</table>
    <div class="cap">From <code>daemon-client-runtime.ts:181-270</code> and tests <code>daemon-client.test.ts:188-277</code>. Messages exist twice: package <code>DaemonControlledResult</code> (<code>daemon-client-runtime.ts:56-72</code>), CLI <code>ControlledCommandResult</code> (<code>command-execution-result.ts:449-470</code>).</div></div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("runtimeWarm", "executeWarm")}
    ${codeBlock("controlledResult", "Package failure bytes")}
    ${codeBlock("cliControlledResult", "CLI failure bytes (same strings)")}
    ${codeBlock("dispatcherWarm", "Dispatcher executeWarm (no dispose on malformed)")}
    ${codeBlock("resultCaptureTest", "Test: capture per warm request, OS temp dir")}`,
  );
}

function sectionProcess() {
  const { host, daemon, worker } = LOADED;
  const shared = host.filter((f) => daemon.includes(f));
  const hostOnly = host.filter((f) => !daemon.includes(f));
  const daemonOnly = daemon.filter((f) => !host.includes(f));
  const workerOnly = worker.filter((f) => !host.includes(f) && !daemon.includes(f));
  const col = (title, files, color) => `<div style="border:1px solid ${color};border-radius:8px;padding:6px 8px"><div style="font-weight:600;color:${color}">${esc(title)} <span class="muted">${files.length} files</span></div><div class="mono small">${files.map((f) => `${esc(f)} <span class="muted">${R.graph.files[f]}</span>`).join("<br>")}</div></div>`;
  const cliLog = R.traces.cli.daemonLog;
  const logKinds = cliLog.map((l) => l.kind);
  const lifetime = `<svg viewBox="0 0 860 150" width="100%" style="max-width:900px">
    <line x1="40" y1="70" x2="820" y2="70" stroke="#8c959f"></line>
    ${[0, 8, 18, 28].map((t) => `<line x1="${40 + t * 26}" y1="64" x2="${40 + t * 26}" y2="76" stroke="#8c959f"></line><text x="${40 + t * 26}" y="92" font-size="10.5" text-anchor="middle" fill="#59636e">${t}</text>`).join("")}
    <rect x="${40 + 8 * 26}" y="40" width="${10 * 26}" height="18" rx="3" fill="#ddf4ff" stroke="#0969da"></rect>
    <text x="${40 + 8 * 26 + 5}" y="53" font-size="11">navigation running (accepted at 8)</text>
    <path d="M${40 + 18 * 26},30 L${40 + 18 * 26},110" stroke="#cf222e" stroke-dasharray="4 3"></path>
    <text x="${40 + 18 * 26 + 5}" y="122" font-size="11" fill="#cf222e">deadline = 8 + idle 10 → idle fires when queue empties at 18</text>
    <text x="40" y="20" font-size="11.5" font-weight="600">Acceptance-based (kept)</text>
    <text x="40" y="142" font-size="11" fill="#59636e">Follow-ups spec (deferred): deadline counts from completion; first deadline armed at readiness</text>
  </svg>`;
  return section(
    "s-process",
    ["K15", "K11", "K12"],
    `<div class="fig"><div class="folder-grid">
      ${col(`host process only (of ${host.length})`, hostOnly, "#0b3d91")}
      ${col("host and daemon process", shared, "#8250df")}
      ${col(`daemon process only (of ${daemon.length})`, daemonOnly, "#1a7f37")}
      ${col(`worker thread only (of ${worker.length})`, workerOnly, "#9a6700")}
    </div><div class="real">modules Node resolved from <code>packages/daemon/dist</code> on head, logged by a resolve hook (<code>analysis/module-load-*.mjs</code>). Line counts from source. <code>client/daemon-client.js</code> loads in all three: mechanisms import <code>@symnav/daemon</code>, whose root now exports <code>DaemonClient</code>; the runtime loads only in the host.</div></div>
    <div class="fig two"><div><table class="grid"><tr><th></th><th>shipped CLI</th><th>package (DaemonClient)</th></tr>
      <tr><td>daemon entry</td><td class="mono small">apps/cli/src/daemon/daemon-process-launcher.ts:156<br>./daemon-entry.js</td><td class="mono small">packages/daemon/src/process/process-launcher.ts:156<br>../process-entry.js</td></tr>
      <tr><td>worker entry</td><td class="mono small">daemon-navigation-worker.ts:96<br>./daemon-navigation-worker-entry.js</td><td class="mono small">worker/navigation-worker.ts:95<br>../worker-entry.js</td></tr>
      <tr><td>package.json exports</td><td>—</td><td><code>./process-entry</code>, <code>./worker-entry</code> (side-effect only; unused by importers)</td></tr>
      <tr><td>spool record codec</td><td><code>OrderedCommandOutput</code> in command-execution-result.ts:296-360</td><td><code>CompletionSpoolRecordCodec</code> in delivery/completion-spool.ts:1-63</td></tr></table></div>
      <div><div class="real">DaemonClient + real CLI executor, daemon.log of the package-spawned daemon</div><div class="steplog">${esc(logKinds.join("\n"))}</div></div></div>
    <div class="fig">${lifetime}<div class="cap"><span class="lossy">numbers from the unit test (idle = 10 ms), not production (30 min)</span> Code: <code>daemon-lifetime.ts:23-34</code>.</div></div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("processEntry", "Package process entry")}
    ${codeBlock("pkgLauncherEntry", "Package launcher → ../process-entry.js")}
    ${codeBlock("cliLauncherEntry", "CLI launcher → ./daemon-entry.js")}
    ${codeBlock("pkgWorkerEntryUrl", "Package worker → ../worker-entry.js")}
    ${codeBlock("packageJson", "package.json exports")}
    ${codeBlock("spoolCodec", "Package spool codec (head of file)")}
    ${diffBlock(pairDiff("apps/cli/src/daemon/completion-spool.ts"), "completion-spool: package vs shipped copy")}
    ${codeBlock("lifetime", "DaemonLifetime")}
    ${codeBlock("lifetimeTest", "Test pinning acceptance-based deadline")}
    ${codeBlock("functionalIdle", "Functional spec: warm-up is outside idle time")}
    ${diffBlock(R.diffs.followUps, "plans/005/daemon-follow-ups-functional-spec.md diff")}`,
  );
}

function sectionStatic() {
  const folders = {};
  for (const f of PKG_FILES) {
    const folder = f.includes("/") ? f.split("/")[0] + "/" : "(root)";
    folders[folder] ??= [];
    folders[folder].push(f);
  }
  const order = ["(root)", "client/", "registry/", "transport/", "process/", "execution/", "delivery/", "diagnostics/", "lifecycle/", "resources/", "worker/"];
  const folderCards = order
    .filter((k) => folders[k])
    .map((k) => {
      const files = folders[k].sort();
      return `<div style="border:1px solid #d0d7de;border-radius:8px;padding:6px 8px;background:#fff"><div style="font-weight:600">${esc(k)} <span class="muted">${files.length}</span></div><div class="mono small">${files
        .map((f) => {
          const mark = copyMark(`packages/daemon/src/${f}`);
          const color = mark.cls === "badge-new" ? "#0969da" : mark.cls === "badge-div" ? "#9a6700" : "#8c959f";
          const pair = pairByPackage[`packages/daemon/src/${f}`];
          const origin = pair ? ` ← ${pair.cli.replace("apps/cli/src/daemon/", "")}` : "";
          const existing = !pair && !f.startsWith("client/") && !["process-entry.ts", "worker-entry.ts"].includes(f);
          return `<span style="color:${color};font-weight:700">${existing ? "·" : esc(mark.text)}</span> ${esc(f.replace(k === "(root)" ? "" : k, ""))} <span class="muted">${R.graph.files[f]}${esc(origin)}${existing ? " (existed)" : ""}</span>`;
        })
        .join("<br>")}</div></div>`;
    })
    .join("");
  const cliFiles = PAIRS.map((p) => p.cli.replace("apps/cli/src/daemon/", ""));
  return section(
    "s-static",
    ["K1", "K2", "K13", "K14"],
    `<div class="fig two">
      <div><svg viewBox="0 0 560 330" width="100%" style="max-width:620px">
        <text x="10" y="18" font-size="12" font-weight="600">base</text>
        <rect x="10" y="28" width="250" height="120" rx="8" fill="#dafbe1" stroke="#1a7f37"></rect>
        <text x="22" y="48" font-size="12" font-weight="600">apps/cli/src/daemon</text>
        <text x="22" y="66" font-size="11">41 production files: mechanisms + dispatcher</text>
        <text x="22" y="82" font-size="11" fill="#59636e">42 unit test files beside them</text>
        <rect x="290" y="28" width="250" height="120" rx="8" fill="#fff" stroke="#8c959f"></rect>
        <text x="302" y="48" font-size="12" font-weight="600">packages/daemon/src</text>
        <text x="302" y="66" font-size="11">9 production files: contracts, policy,</text>
        <text x="302" y="82" font-size="11">admission, executor loader, reports,</text>
        <text x="302" y="98" font-size="11" fill="#59636e">index, policy-testing subpath</text>
        <text x="10" y="178" font-size="12" font-weight="600">head</text>
        <rect x="10" y="188" width="250" height="132" rx="8" fill="#dafbe1" stroke="#1a7f37"></rect>
        <text x="22" y="208" font-size="12" font-weight="600">apps/cli/src/daemon 🔒</text>
        <text x="22" y="226" font-size="11">38 frozen copies (sha256) + 3 CLI-owned</text>
        <text x="22" y="242" font-size="11" fill="#59636e">still the only code \`symnav\` runs</text>
        <text x="22" y="258" font-size="11" fill="#59636e">unit tests: 4 files (dispatcher, selector,</text>
        <text x="22" y="272" font-size="11" fill="#59636e">transport contract)</text>
        <rect x="290" y="188" width="250" height="132" rx="8" fill="#ddf4ff" stroke="#0969da"></rect>
        <text x="302" y="208" font-size="12" font-weight="600">packages/daemon/src</text>
        <text x="302" y="226" font-size="11">${PKG_FILES.length} production files in 10 folders</text>
        <text x="302" y="242" font-size="11">38 copies: ${38 - DIVERGED.length} ≡, ${DIVERGED.length} ≠ · client/ new</text>
        <text x="302" y="258" font-size="11" fill="#59636e">37 moved unit test files</text>
        <text x="302" y="274" font-size="11" fill="#59636e">${SELF_IMPORTERS} files import @symnav/daemon</text>
        <path d="M260,254 C275,254 275,254 290,254" stroke="#8c959f" stroke-width="2" marker-end="url(#arrow)"></path>
        <text x="262" y="244" font-size="10" fill="#59636e">copy</text>
        <path d="M150,148 L150,188" stroke="#cf222e" stroke-width="1.6" stroke-dasharray="4 3"></path>
        <path d="M260,90 C300,140 330,160 400,188" stroke="#8250df" stroke-width="1.6" fill="none" marker-end="url(#arrow)"></path>
        <text x="330" y="160" font-size="10" fill="#8250df">tests move</text>
      </svg>
      <div class="cap">Dependency direction unchanged: <code>@symnav/daemon</code> still imports no internal package (<code>package-boundary.test.ts</code>). The moved boundary is ownership, not imports.</div></div>
      <div><div class="warn-box">Digest input: every <code>apps/cli/src/daemon/*.ts</code> except tests and <code>daemon-command-dispatcher.ts</code>, <code>invocation-route.ts</code>, <code>invocation-workspace-selector.ts</code>. Count asserted: 38. Adding a new file there also fails the test.</div>
      <div class="mono small" style="columns:2;margin-top:6px">${cliFiles.map(esc).join("<br>")}</div></div>
    </div>
    <div class="fig"><div class="folder-grid">${folderCards}</div>
    <div class="cap">≡ identical to shipped copy (top-level imports and blanks stripped) · ≠ n differing lines · new · “·” existed before #148. ← origin file in <code>apps/cli/src/daemon</code>.</div></div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("compatDigest", "Digest meta-test")}
    ${codeBlock("policyMigration", "Policy record: removing the temporary test subpath was planned")}
    ${diffBlock(R.diffs.lintPolicyTesting, "policy-testing removal: ESLint rule, lint tests, package export test")}
    ${diffBlock(R.diffs.hostContract, "host-contract.test.ts diff (policy-testing tests removed, client boundary added)")}`,
  );
}

function sectionTests() {
  const moved = MOVED_TESTS.map((t) => {
    const name = t.after.replace("packages/daemon/src/", "");
    const dt = t.testsAfter - t.testsBefore;
    const de = t.expectAfter - t.expectBefore;
    const bar = (n, color) => `<span class="bar" style="width:${Math.min(n, 220) * 0.9}px;background:${color}"></span>`;
    return `<tr><td class="mono small">${esc(name)}</td><td class="n">${t.testsBefore}→${t.testsAfter}</td><td>${bar(t.expectAfter, "#c297ff")} <span class="small">${t.expectBefore}→${t.expectAfter}</span></td><td class="small" style="color:${dt < 0 || de < 0 ? "#cf222e" : dt > 0 || de > 0 ? "#1a7f37" : "#8c959f"}">${dt || de ? `${dt >= 0 ? "+" : ""}${dt} tests, ${de >= 0 ? "+" : ""}${de} expects` : "same"}</td></tr>`;
  }).join("");
  const renamed = (name) => name.replace("WorkspaceDaemon", "DaemonProcessCoordinator");
  const realRemovals = (t) => t.removedNames.filter((n) => !n.startsWith("describe") && !t.addedNames.includes(renamed(n)));
  const removed = R.tests.filter((t) => realRemovals(t).length);
  const added = R.tests.filter((t) => t.status === "A");
  const divergedRows = DIVERGED.map((p) => `<tr><td class="mono small">${esc(p.package.replace("packages/daemon/src/", ""))}</td><td class="n">+${p.cliToPackageIgnoringImports.added} −${p.cliToPackageIgnoringImports.removed}</td><td class="small">${esc(divergenceNote(p.cli))}</td></tr>`).join("");
  return section(
    "s-tests",
    ["K3", "K18"],
    `<div class="fig two"><div><table class="grid"><tr><th>moved test file (now in package)</th><th>tests</th><th>expect() calls</th><th>delta</th></tr>${moved}</table>
      <div class="cap">Static count of <code>it/test</code> declarations and <code>expect(</code> calls per file; <code>it.each</code> counts once. Script: <code>analysis/tests.py</code>.</div></div>
      <div><div class="evidence-head" style="margin-top:0">Non-identical normalized copies (${DIVERGED.length})</div>
        <table class="grid"><tr><th>package file</th><th>lines ≠</th><th>what differs</th></tr>${divergedRows}</table>
        <div class="cap">Moved suites target package paths; three differences here are only type import/re-export paths. This text comparison is not a behavioral comparison.</div>
        <div class="evidence-head">Removed or replaced test cases</div>
        <table class="grid">${removed
          .map((t) => `<tr><td class="mono small">${esc((t.after ?? t.before).replace(/^(apps\/cli\/|packages\/daemon\/|meta-tests\/)/, ""))}${t.status === "D" ? " <b style='color:#cf222e'>deleted</b>" : ""}</td><td class="small">${realRemovals(t).map((n) => `− ${esc(n.replace(/^it: /, ""))}`).join("<br>")}</td></tr>`)
          .join("")}</table>
        <div class="cap">Renames (WorkspaceDaemon → DaemonProcessCoordinator) omitted. CLI version oracle re-added: <code>apps/cli/src/daemon-executor.test.ts</code> “rejects a product version that does not match the CLI”.</div>
        <div class="evidence-head">New test files (${added.length})</div>
        <div class="mono small">${added.map((t) => `${esc(t.after)} <span class="muted">${t.testsAfter} tests · ${t.expectAfter} expects</span>`).join("<br>")}</div>
      </div></div>
    <div class="fig"><div class="warn-box">What pins shipped daemon code after #148: e2e suites <code>apps/cli/test/e2e/daemon/*</code> <code>daemon-command-dispatcher*.test.ts</code>, <code>daemon-transport.test.ts</code>, the digest. The 37 relocated direct mechanism suites now target package paths. Static assertion counts describe test text, not coverage or strength.</div></div>
    <div class="evidence-head">Evidence</div>
    ${textBlock(R.diffs.entryDeletedTest, "Deleted: apps/cli/src/daemon/daemon-entry.test.ts (base)")}
    ${diffBlock(R.diffs.executorOracle, "Re-added CLI oracle: daemon-executor.test.ts")}
    ${DIVERGED.map((p) => diffBlock(p.cliToPackageDiff, `${p.package} vs ${p.cli}`)).join("")}`,
  );
}

function divergenceNote(cliPath) {
  const notes = {
    "apps/cli/src/daemon/completion-spool.ts": "inlined spool record codec (K12)",
    "apps/cli/src/daemon/daemon-controller.ts": "injectable startupCoordinator (K8)",
    "apps/cli/src/daemon/daemon-entry.ts": "class renamed DaemonProcessEntry",
    "apps/cli/src/daemon/daemon-navigation-worker.ts": "worker entry URL ../worker-entry.js (K11)",
    "apps/cli/src/daemon/daemon-operation-observer.ts": "inline type import path",
    "apps/cli/src/daemon/daemon-process-coordinator.ts": "inline type import path",
    "apps/cli/src/daemon/daemon-process-launcher.ts": "daemon entry URL ../process-entry.js (K11)",
    "apps/cli/src/daemon/daemon-resource-monitor.ts": "inline type import paths",
    "apps/cli/src/daemon/daemon-startup-coordinator.ts": "readinessProbe option (K6)",
    "apps/cli/src/daemon/local-daemon-transport.ts": "injectable createOutput (K9)",
  };
  return notes[cliPath] ?? "";
}

function sectionCliEdits() {
  const commits = R.commits;
  const phases = [
    [0, 14, "1 · edit CLI mechanisms in place", "#1a7f37"],
    [14, 23, "2 · copy into package, move tests", "#8c959f"],
    [23, 42, "3 · build the hub", "#0b3d91"],
    [42, 45, "4 · digest portability, Windows", "#9a6700"],
  ];
  const areaColor = (area) => (area.startsWith("cli src") ? "#1a7f37" : area.startsWith("cli test") ? "#7ee2a8" : area.startsWith("package src: client") ? "#0b3d91" : area.startsWith("package src") ? "#afb8c1" : area.startsWith("package test") ? "#c297ff" : area === "meta-tests" ? "#9a6700" : "#d0d7de");
  const colW = 24;
  const maxLog = Math.log10(20000);
  const bars = commits
    .map((c, i) => {
      const x = 20 + i * colW;
      let y = 250;
      const parts = Object.entries(c.areas)
        .map(([area, v]) => {
          const size = v.added + v.removed;
          const h = Math.max(2, (Math.log10(size + 1) / maxLog) * 190 * (size / Math.max(1, Object.values(c.areas).reduce((s, a) => s + a.added + a.removed, 0))));
          y -= h;
          return `<rect x="${x}" y="${y}" width="${colW - 4}" height="${h}" fill="${areaColor(area)}"><title>${esc(c.sha)} ${esc(c.subject)} — ${esc(area)} +${v.added} −${v.removed}</title></rect>`;
        })
        .join("");
      return `${parts}<text x="${x + 9}" y="262" font-size="9" transform="rotate(60 ${x + 9} 262)" fill="${c.specify ? "#8250df" : "#1f2328"}">${esc(c.subject.slice(0, 34))}</text>`;
    })
    .join("");
  const phaseBands = phases.map(([a, b, label, color]) => `<rect x="${20 + a * colW - 2}" y="18" width="${(b - a) * colW}" height="8" fill="${color}"></rect><text x="${20 + a * colW}" y="14" font-size="10.5" font-weight="600" fill="${color}">${esc(label)}</text>`).join("");
  const timeline = `<svg viewBox="0 0 ${150 + commits.length * colW} 460" width="100%">${phaseBands}${bars}</svg>`;
  const edited = EDITED.sort((a, b) => b.edited - a.edited)
    .map((p) => `<tr><td class="mono small">${esc(p.cli.replace("apps/cli/src/daemon/", ""))}</td><td class="n"><span class="bar" style="width:${p.baseToCli.added * 0.5}px;background:#1a7f37"></span> +${p.baseToCli.added}</td><td class="n"><span class="bar" style="width:${p.baseToCli.removed * 0.5}px;background:#cf222e"></span> −${p.baseToCli.removed}</td></tr>`)
    .join("");
  const checks = [
    ["registry: writeStartingIfStartupOwner gate", "instanceId", "identityKey, instanceId"],
    ["registry: writeStartingIfStartupOwner after write", "instanceId", "full owner record (8 fields incl. revision)"],
    ["registry: writeClaimedStartingRecord gate", "instanceId", "identityKey, instanceId"],
    ["registry: writeClaimedStartingRecord after replace", "instanceId, ownerPid, processToken", "full owner record (8 fields)"],
    ["registry: refreshStartupOwner", "instanceId", "identityKey, instanceId"],
    ["registry: isStartupOwner", "instanceId", "identityKey, instanceId"],
    ["registry: removeStartupLockIfInstance", "instanceId", "identityKey, instanceId"],
    ["registry: transferStartupToDaemon", "launcher param fields; current = param", "current matches param + identity.identityKey"],
    ["registry: writeIfStartupOwner, claimStartupForDaemon, startupOwnerMatchesProcess, removeStartupLockIfProcess", "5 fields", "same fields through predicate"],
    ["controller: status, armed launch", "instanceId, processToken", "identityKey, instanceId, processToken"],
    ["controller: status, live owner", "instanceId", "identityKey, instanceId"],
    ["controller: stopStarting (pid ≤ 0)", "processToken", "identityKey, instanceId, processToken"],
    ["controller: cleanup branch for owner without processToken", "removes lock", "branch deleted (type says unreachable)"],
  ];
  return section(
    "s-cli-edits",
    ["K4"],
    `<div class="fig">${timeline}<div class="cap">45 commits in order; bar height log-scaled by lines changed, split by area (green = CLI src, light green = CLI tests, grey = package copies, blue = client/, violet = package tests, brown = meta-tests). Purple subject = “Specify…/Characterize…” (test-first commits). Commit bodies are empty. Hover a bar for numbers.</div></div>
    <div class="fig two"><div><table class="grid"><tr><th>shipped CLI file</th><th>added</th><th>removed</th></tr>${edited}</table>
      <div class="cap">base → head, whole-file Python difflib comparison (+412/−288). Git’s alignment yields +408/−284 for the same 12 files, as shown at the top. Then frozen by digest.</div></div>
      <div><table class="grid"><tr><th>ownership check site (apps/cli, shipped)</th><th>base compares</th><th>head compares</th></tr>${checks.map((c) => `<tr><td class="small">${esc(c[0])}</td><td class="small">${esc(c[1])}</td><td class="small">${esc(c[2])}</td></tr>`).join("")}</table>
      <div class="cap">Read from the diff by hand; verify in evidence below. Owner file lives under <code>daemons/&lt;identityKey&gt;/startup.lock</code>, so identityKey mismatch implies a foreign or corrupt owner file.</div></div></div>
    <div class="evidence-head">Evidence</div>
    ${codeBlock("registryPredicate", "Head: one predicate")}
    ${codeBlock("registryPredicateBase", "Base: sameStartupOwner")}
    ${codeBlock("isStartupOwnerBase", "Base: isStartupOwner")}
    ${codeBlock("isStartupOwnerHead", "Head: isStartupOwner")}
    ${codeBlock("validateCoordinates", "Coordinate validation now in coordinator constructor")}
    ${codeBlock("entryBase", "Base entry: validation lived here, observer installed first")}
    ${diffBlock(R.diffs.controller, "CLI daemon-controller.ts diff")}
    ${EDITED.filter((p) => p.baseToCliDiff).map((p) => diffBlock(p.baseToCliDiff, `${p.cli}: base → head`)).join("")}`,
  );
}

function sectionMethod() {
  return section(
    "s-method",
    [],
    `<div class="kv">
      <span>Inputs</span><span>bundle <code>inputs/pr-148</code> (pr.json, diff, files; overview files contained headings but no symbol output), worktrees pr-148-head/base, stack-head for #149 context only</span>
      <span>Copy map</span><span><code>analysis/pairs.py</code>: 38 CLI↔package pairs, text diff with top-level imports and blank lines stripped; type imports/re-exports can remain</span>
      <span>Tests</span><span><code>analysis/tests.py</code>: static it/test/expect counts, renamed pairs</span>
      <span>Commits</span><span><code>analysis/commits.py</code>: numstat per commit bucketed by area</span>
      <span>Import graph</span><span><code>analysis/graph.py</code>: relative imports, <code>new URL(…, import.meta.url)</code> spawn edges, string-variable dynamic import</span>
      <span>Runs</span><span><code>analysis/trace.mjs</code> (DaemonClient; <code>EXECUTOR=cli</code> for the real symnav executor), <code>analysis/trace-old.mjs base|head</code> (CLI dispatcher), <code>analysis/cli-probe.sh</code> (shipped binary + ps). Prototype wrapping in-process; worktrees untouched.</span>
      <span>Tests run</span><span>head: <code>packages/daemon</code> client, host-contract, package/entry boundary and public-import tests: 68 passed; <code>meta-tests</code> digest test 2 passed. Full suite not run. Logs: <a href="analysis/verification-daemon.txt">daemon checks</a>, <a href="analysis/verification-compatibility.txt">digest checks</a>.</span>
      <span>Revisions</span><span>base <code>${R.revisions.base}</code> → head <code>${R.revisions.head}</code>. Earlier attempts’ recordings are retained with their timestamps; this page replays saved data.</span>
      <span>Not verified</span><span>Windows behavior; long-lived host reuse of one client; whether tightened ownership checks change any real outcome.</span>
      <span>Build</span><span><code>python3 build.py</code> regenerates <code>data.js</code> from analysis outputs and worktree excerpts</span>
    </div>`,
  );
}

/* ───────────────────────── assemble ───────────────────────── */

function tocHtml() {
  const tiers = [1, 2, 3].map((tier) => `<div class="group">${esc(TIERS[tier])}</div>${DECISIONS.filter((d) => d.tier === tier).map((d) => `<a href="#card-${d.id}">${d.id} ${md(d.title.length > 34 ? d.title.slice(0, 33) + "…" : d.title)}</a>`).join("")}`).join("");
  return `<div class="brand">#148 · hub &amp; spokes</div><a href="#top">Top: picture, facts</a>${tiers}<div class="group">Deeper</div>${Object.entries(SECTION_TITLES).map(([id, title]) => `<a href="#${id}">${esc(title)}</a>`).join("")}`;
}

function checkPyramid() {
  const problems = [];
  const sectionIds = new Set(Object.keys(SECTION_TITLES));
  for (const d of DECISIONS) {
    if (!sectionIds.has(d.section)) problems.push(`${d.id} points at missing section ${d.section}`);
    if (!document.getElementById(d.section)?.innerHTML.includes(`card-${d.id}`)) problems.push(`${d.id} not carried by ${d.section}`);
  }
  document.querySelectorAll("section.deep .carries a").forEach((a) => {
    const id = a.getAttribute("href").replace("#card-", "");
    if (!DECISIONS.some((d) => d.id === id)) problems.push(`section references unknown ${id}`);
  });
  window.PYRAMID_PROBLEMS = problems;
  if (problems.length) console.warn("pyramid check", problems);
}

function wireNavigation() {
  let returnTo = null;
  document.querySelectorAll("#hubfig [data-section]").forEach((node) => {
    node.id = `map-${node.dataset.spoke}`;
    node.setAttribute("tabindex", "0");
    node.setAttribute("role", "link");
    node.setAttribute("aria-label", `Explore ${node.querySelector('text')?.textContent ?? "hub"}: ${SECTION_TITLES[node.dataset.section]}`);
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        node.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    });
  });
  const goTo = (id, center = false) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: center ? "center" : "start" });
    return target;
  };
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-return-to]");
    if (link) returnTo = link.dataset.returnTo;
    const back = event.target.closest("[data-back]");
    if (back) {
      const target = goTo(returnTo ?? "top", true);
      if (target?.classList.contains("card")) {
        target.style.boxShadow = "0 0 0 3px #d4a72c";
        setTimeout(() => (target.style.boxShadow = ""), 1400);
      }
      return;
    }
    const spoke = event.target.closest("#hubfig [data-section]");
    if (spoke && spoke.dataset.section) {
      returnTo = spoke.id;
      goTo(spoke.dataset.section);
    }
    if (event.target.closest(".mobile-menu a")) document.querySelector(".mobile-menu").open = false;
    const mode = event.target.closest("[data-mode]");
    if (mode) applyMode(mode.dataset.mode);
    const step = event.target.closest(".stepbtn");
    if (step) playStep(step.dataset.run, step.dataset.step);
  });
  const links = [...document.querySelectorAll("nav.toc a")];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      }
    },
    { rootMargin: "-10% 0px -80% 0px" },
  );
  document.querySelectorAll("section.deep, header.pr").forEach((s) => observer.observe(s));
}

document.getElementById("toc").innerHTML = tocHtml();
document.getElementById("main").innerHTML = [
  topHtml(),
  sectionHubs(),
  sectionFacade(),
  sectionRouting(),
  sectionComposition(),
  sectionResults(),
  sectionProcess(),
  sectionStatic(),
  sectionTests(),
  sectionCliEdits(),
  sectionMethod(),
].join("");
document.querySelectorAll("table.grid").forEach((table) => {
  const wrapper = document.createElement("div");
  wrapper.className = "table-scroll";
  wrapper.tabIndex = 0;
  wrapper.setAttribute("role", "region");
  wrapper.setAttribute("aria-label", `${table.closest("section")?.querySelector("h2")?.textContent ?? "Review"} table; scroll horizontally if needed`);
  table.before(wrapper);
  wrapper.append(table);
});
wireNavigation();
window.addEventListener("resize", centerVisibleHub);
checkPyramid();
playStep("cli", "B");
