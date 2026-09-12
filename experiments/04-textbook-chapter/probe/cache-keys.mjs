// Real cache keys after one turn of queries on the #127 build.
// Usage: node cache-keys.mjs <worktree-path>
import { pathToFileURL } from "node:url";

const [worktree] = process.argv.slice(2);
const core = await import(pathToFileURL(`${worktree}/packages/core/dist/index.js`).href);
const typescriptBackend = await import(
  pathToFileURL(`${worktree}/packages/backend-typescript/dist/index.js`).href
);
const fileSystem = new core.InMemoryFileSystem({
  "/repo/tsconfig.json": JSON.stringify({ include: ["src/**/*.ts"] }),
  "/repo/src/lib.ts": "export function target(): void {}\n",
  "/repo/src/app.ts": 'import { target } from "./lib.js";\nexport function caller(): void { target(); }\n',
});
const backend = new typescriptBackend.TypeScriptBackend(fileSystem);
const files = ["src/app.ts", "src/lib.ts"].map((relative) => ({
  relative,
  absolute: `/repo/${relative}`,
  metadata: fileSystem.metadataSync(`/repo/${relative}`),
}));
const paths = files.map(({ relative, absolute }) => ({ relative, absolute }));
await backend.refresh({ snapshot: { root: "/repo", files }, coverage: "workspace" });
const target = { file: "src/lib.ts", segments: [{ name: "target" }] };
const caller = { file: "src/app.ts", segments: [{ name: "caller" }] };
await backend.findDefinitions(paths, target);
await backend.findReferences(paths, target);
await backend.findCallTarget(paths, target);
await backend.findCallers(paths, target);
await backend.findCallees(paths, caller);
await backend.findCallees(paths, target);
const queries = backend.semanticQueries;
const names = [
  "definitionsByIdentity",
  "referencesByIdentity",
  "callTargetsByIdentity",
  "callersByIdentity",
  "calleesByIdentity",
  "definitionsByPosition",
];
const result = {};
for (const name of names) {
  const values = queries[name].values;
  result[name] = await Promise.all(
    [...values.entries()].map(async ([key, value]) => {
      const settled = value instanceof Promise ? await value : value;
      return {
        key,
        storedKind: value instanceof Promise ? "Promise" : Array.isArray(value) ? "Array" : typeof value,
        settledPreview: JSON.stringify(settled).slice(0, 140),
      };
    }),
  );
}
process.stdout.write(JSON.stringify(result, null, 2));
