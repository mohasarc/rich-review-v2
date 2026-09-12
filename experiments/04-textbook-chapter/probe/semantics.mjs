// Real execution of one scripted session against a built symnav worktree.
// Usage: node semantics.mjs <worktree-path> <label> [normal|clearing-disabled]
// Writes JSON to stdout. Nothing is written inside the worktree.
// Instrumentation only wraps methods to count calls; "clearing-disabled" replaces the
// turn-boundary clear with a no-op in memory to show what the boundary prevents.
import { pathToFileURL } from "node:url";

const [worktree, label, mode = "normal"] = process.argv.slice(2);
const core = await import(pathToFileURL(`${worktree}/packages/core/dist/index.js`).href);
const typescriptBackend = await import(
  pathToFileURL(`${worktree}/packages/backend-typescript/dist/index.js`).href
);
const { InMemoryFileSystem } = core;
const { TypeScriptBackend } = typescriptBackend;

const unhandled = [];
process.on("unhandledRejection", (reason) => {
  unhandled.push(reason instanceof Error ? reason.message : String(reason));
});

const counts = {
  semanticProjectLoaded: 0,
  semanticCacheReleased: 0,
  definitionSearch: 0,
  referenceSearch: 0,
  callTargetResolution: 0,
};
let failNextSemanticRelease = false;
const observer = {
  semanticProjectLoaded: () => {
    counts.semanticProjectLoaded += 1;
  },
  semanticCacheReleased: () => {
    counts.semanticCacheReleased += 1;
    if (!failNextSemanticRelease) return;
    failNextSemanticRelease = false;
    throw new Error("injected: semantic cache release failed");
  },
  definitionSearch: () => {
    counts.definitionSearch += 1;
  },
  referenceSearch: () => {
    counts.referenceSearch += 1;
  },
  callTargetResolution: () => {
    counts.callTargetResolution += 1;
  },
};

const contents = {
  "/repo/tsconfig.json": JSON.stringify({ include: ["src/**/*.ts"] }),
  "/repo/src/lib.ts": "export function target(): void {}\n",
  "/repo/src/app.ts": [
    'import { target } from "./lib.js";',
    "export function caller(): void { target(); }",
    "",
  ].join("\n"),
};
const fileSystem = new InMemoryFileSystem(contents);
const backend = new TypeScriptBackend(fileSystem, undefined, undefined, observer);
const queries = backend.semanticQueries;

const turnCalls = { beginTurn: 0, releaseTransientResources: 0 };
const originalBeginTurn = queries.beginTurn.bind(queries);
queries.beginTurn = (...args) => {
  turnCalls.beginTurn += 1;
  return originalBeginTurn(...args);
};
const originalRelease = queries.releaseTransientResources.bind(queries);
queries.releaseTransientResources = (...args) => {
  turnCalls.releaseTransientResources += 1;
  return originalRelease(...args);
};
if (mode === "clearing-disabled") {
  if (queries.cacheScope) queries.cacheScope.beginTurn = () => undefined;
  else queries.clearQueryCaches = () => undefined;
}

const cacheNames = [
  "definitionsByIdentity",
  "referencesByIdentity",
  "callTargetsByIdentity",
  "callersByIdentity",
  "calleesByIdentity",
  "definitionsByPosition",
];
const cacheSizes = () =>
  Object.fromEntries(
    cacheNames.map((name) => {
      const cache = queries[name];
      return [name, cache instanceof Map ? cache.size : cache.values.size];
    }),
  );

const relativePaths = ["src/app.ts", "src/lib.ts"];
const snapshotOf = () => ({
  root: "/repo",
  files: relativePaths.map((relative) => ({
    relative,
    absolute: `/repo/${relative}`,
    metadata: fileSystem.metadataSync(`/repo/${relative}`),
  })),
});
const resolvedPaths = (snapshot) =>
  snapshot.files.map((file) => ({ absolute: file.absolute, relative: file.relative }));
const identity = (file, name) => ({ file, segments: [{ name }] });
const target = identity("src/lib.ts", "target");
const caller = identity("src/app.ts", "caller");
const ghost = identity("src/app.ts", "ghost");
const referenceLines = (references) =>
  references.map((reference) => `${reference.file}:${reference.line}`);

const steps = [];
async function step(id, phase, call, run) {
  const before = { ...counts };
  let outcome;
  try {
    outcome = { status: "resolved", value: await run() };
  } catch (error) {
    outcome = { status: "rejected", error: error instanceof Error ? error.message : String(error) };
  }
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
  const delta = Object.fromEntries(
    Object.entries(counts)
      .map(([key, value]) => [key, value - before[key]])
      .filter(([, value]) => value !== 0),
  );
  steps.push({
    id,
    phase,
    call,
    outcome,
    delta,
    cacheSizes: cacheSizes(),
    turnCalls: { ...turnCalls },
    unhandledSoFar: [...unhandled],
  });
}

let snapshot = snapshotOf();
let files = resolvedPaths(snapshot);

await step("refresh-1", "turn 1", "backend.refresh(snapshot)", async () => {
  const summary = await backend.refresh({ snapshot, coverage: "workspace" });
  return { added: summary.added, changed: summary.changed, unchanged: summary.unchanged };
});

await step("definitions-twice", "turn 1", "findDefinitions(target) twice", async () => {
  const first = queries.findDefinitions(target);
  const second = queries.findDefinitions(target);
  const definitions = await first;
  return { samePromise: first === second, definitions: definitions.length };
});

await step("references-then-callers", "turn 1", "findReferences(target), then findCallers(target)", async () => {
  const references = await backend.findReferences(files, target);
  const callers = await backend.findCallers(files, target);
  return { references: referenceLines(references), callers: callers.length };
});

await step("callees-twice", "turn 1", "findCallees(caller) twice", async () => {
  const first = await backend.findCallees(files, caller);
  const second = await backend.findCallees(files, caller);
  return { callees: first.length, sameAnswer: JSON.stringify(first) === JSON.stringify(second) };
});

await step("missing-symbol-references-twice", "turn 1", "findReferences(ghost) twice", async () => {
  const attempts = [];
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await queries.findReferences(ghost);
      attempts.push("resolved");
    } catch (error) {
      attempts.push(`rejected ${error.name}`);
    }
  }
  return { attempts };
});

await step("missing-symbol-callees-twice", "turn 1", "findCallees(ghost) twice", async () => {
  const first = queries.findCallees(ghost);
  const second = queries.findCallees(ghost);
  const callees = await first;
  return { samePromise: first === second, callees: callees.length };
});

contents["/repo/src/app.ts"] = [
  'import { target } from "./lib.js";',
  "export function caller(): void { target(); }",
  "export function secondCaller(): void { target(); }",
  "",
].join("\n");
snapshot = snapshotOf();
files = resolvedPaths(snapshot);

await step("refresh-2-after-edit", "turn 2", "edit app.ts (add secondCaller), backend.refresh(snapshot)", async () => {
  const summary = await backend.refresh({ snapshot, coverage: "workspace" });
  return { added: summary.added, changed: summary.changed, unchanged: summary.unchanged };
});

await step("references-after-edit", "turn 2", "findReferences(target)", async () => {
  const references = await backend.findReferences(files, target);
  return { references: referenceLines(references) };
});

let definitionsBeforeFailedRefresh;
await step("definitions-turn-2", "turn 2", "findDefinitions(target)", async () => {
  definitionsBeforeFailedRefresh = queries.findDefinitions(target);
  const definitions = await definitionsBeforeFailedRefresh;
  return { definitions: definitions.length };
});

await step("refresh-fails", "turn 2", "backend.refresh(snapshot that lists missing src/ghost.ts)", async () => {
  const brokenSnapshot = {
    root: "/repo",
    files: [
      ...snapshot.files,
      {
        relative: "src/ghost.ts",
        absolute: "/repo/src/ghost.ts",
        metadata: {
          size: 1,
          modifiedAtMs: 0,
          changeToken: "ghost",
          fileIdentity: "/repo/src/ghost.ts",
        },
      },
    ],
  };
  await backend.refresh({ snapshot: brokenSnapshot, coverage: "workspace" });
  return "refresh resolved";
});

await step("definitions-after-failed-refresh", "turn 2", "findDefinitions(target)", async () => {
  const promise = queries.findDefinitions(target);
  const definitions = await promise;
  return {
    definitions: definitions.length,
    samePromiseAsBeforeFailedRefresh: promise === definitionsBeforeFailedRefresh,
  };
});

await step("refresh-3", "turn 3", "backend.refresh(snapshot)", async () => {
  const summary = await backend.refresh({ snapshot, coverage: "workspace" });
  return { added: summary.added, changed: summary.changed, unchanged: summary.unchanged };
});

await step("references-turn-3", "turn 3", "findReferences(target)", async () => {
  const references = await backend.findReferences(files, target);
  return { references: referenceLines(references) };
});

await step("release", "release", "backend.releaseTransientResources()", async () => {
  await backend.releaseTransientResources();
  return "release resolved";
});

await step("definitions-after-release", "release", "findDefinitions(target)", async () => {
  const definitions = await queries.findDefinitions(target);
  return { definitions: definitions.length };
});

await step("references-after-release", "release", "findReferences(target)", async () => {
  const references = await backend.findReferences(files, target);
  return { references: referenceLines(references) };
});

await step("release-fails", "failing release", "backend.releaseTransientResources(), project release throws (injected)", async () => {
  failNextSemanticRelease = true;
  await backend.releaseTransientResources();
  return "release resolved";
});

await step("definitions-after-failed-release", "failing release", "findDefinitions(target)", async () => {
  const definitions = await queries.findDefinitions(target);
  return { definitions: definitions.length };
});

process.stdout.write(
  JSON.stringify({ label, mode, worktree, node: process.version, steps }, null, 2),
);
