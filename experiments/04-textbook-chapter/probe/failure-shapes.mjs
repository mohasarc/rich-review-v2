// Which queries fail synchronously, reject, or resolve empty for unknown symbols (real files, #127 build).
// Usage: node failure-shapes.mjs <worktree-path>
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
await backend.refresh({ snapshot: { root: "/repo", files }, coverage: "workspace" });
const queries = backend.semanticQueries;

const identities = {
  unknownFile: { file: "src/nope.ts", segments: [{ name: "x" }] },
  unknownName: { file: "src/app.ts", segments: [{ name: "ghost" }] },
  unknownMember: { file: "src/app.ts", segments: [{ name: "caller" }, { name: "inner" }] },
};
const methods = ["findDefinitions", "findCallTarget", "findCallees", "findCallers", "findReferences"];
const settle = (promise) =>
  promise.then(
    (value) => ({ settled: "resolved", preview: JSON.stringify(value).slice(0, 60) }),
    (error) => ({ settled: "rejected", error: error.name }),
  );

const rows = [];
for (const [identityName, identity] of Object.entries(identities)) {
  for (const method of methods) {
    const attempts = [];
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        attempts.push({ promise: queries[method](identity) });
      } catch (error) {
        attempts.push({ threwSynchronously: error.name });
      }
    }
    const first = attempts[0].promise ? await settle(attempts[0].promise) : undefined;
    if (attempts[1].promise) await settle(attempts[1].promise);
    rows.push({
      identity: identityName,
      method,
      firstCall: attempts[0].threwSynchronously
        ? { threwSynchronously: attempts[0].threwSynchronously }
        : first,
      samePromiseOnSecondCall:
        Boolean(attempts[0].promise) && attempts[0].promise === attempts[1].promise,
    });
  }
}
process.stdout.write(JSON.stringify({ node: process.version, rows }, null, 2));
