// Same scripted daemons as reattach-differential.mjs, against the stack tip (#149) execution client.
// Usage: node reattach-differential-tip.mjs <stack-head worktree>
import { createServer } from "node:net";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [worktree] = process.argv.slice(2);
const daemon = (path) => import(pathToFileURL(join(worktree, "packages/daemon/dist", path)).href);
const { DaemonPolicy } = await daemon("index.js");
const { DaemonTransportFactory } = await daemon("transport/daemon-transport.js");
const { DaemonCompletionSpoolStore } = await daemon("delivery/completion-spool.js");
const { DAEMON_PROTOCOL_VERSION } = await daemon("transport/protocol.js");

const policy = DaemonPolicy.currentSystem();
const request = {
  kind: "execute",
  protocolVersion: DAEMON_PROTOCOL_VERSION,
  instanceId: "instance",
  processToken: "token",
  requestId: "request",
  commandName: "version",
  request: { argv: ["--version"], cwd: "/repo", telemetryEnabled: false, executionMode: "warm" },
};
const frame = (value) => {
  const payload = Buffer.from(JSON.stringify(value), "utf8");
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
};
const identity = { instanceId: request.instanceId, processToken: request.processToken, requestId: request.requestId };
const accepted = () => frame({ kind: "accepted", ...identity, acceptedAt: 10, queuePosition: 0 });
const manifestFrame = (manifest) => frame({ kind: "result-manifest", ...identity, manifest });
const endFrame = (manifest, overrides = {}) =>
  frame({ kind: "result-end", ...identity, transferId: manifest.transferId, rawBytes: manifest.rawBytes, recordCount: manifest.recordCount, sha256: manifest.sha256, ...overrides });

const scenarios = {
  "reattach-closes-again": () => accepted(),
  "reattach-corrupt-result": (manifest, attempt) =>
    attempt === 1 ? accepted() : Buffer.concat([accepted(), manifestFrame(manifest), endFrame(manifest, { rawBytes: 1 })]),
  "reattach-succeeds": (manifest, attempt) =>
    attempt === 1 ? accepted() : Buffer.concat([accepted(), manifestFrame(manifest), endFrame(manifest)]),
  "reattach-and-second-close-then-success": (manifest, attempt) =>
    attempt <= 2 ? accepted() : Buffer.concat([accepted(), manifestFrame(manifest), endFrame(manifest)]),
};

async function run(name, respond) {
  const directory = mkdtempSync(join(tmpdir(), "rr02-tip-"));
  const store = new DaemonCompletionSpoolStore({
    directory: join(directory, "daemon"),
    workspaceKey: "workspace",
    instanceId: request.instanceId,
    policy: policy.values.output,
  });
  const spool = await store.create(request.requestId);
  const manifest = await spool.finish(0);
  let executeAttempts = 0;
  const endpoint = join(directory, "d.sock");
  const server = createServer((socket) => {
    socket.on("error", () => undefined);
    socket.once("data", (encoded) => {
      const message = JSON.parse(encoded.subarray(4).toString());
      if (message.kind === "result-ack") {
        socket.end(frame({ kind: "result-acknowledged", ...identity, transferId: manifest.transferId }));
        return;
      }
      if (message.kind !== "execute") {
        socket.end();
        return;
      }
      executeAttempts += 1;
      socket.end(respond(manifest, executeAttempts));
    });
  });
  await new Promise((resolve) => server.listen(endpoint, resolve));
  let outcome;
  try {
    const { execution } = DaemonTransportFactory.create({ policy, captureDirectory: join(directory, "client") });
    const receipt = await execution.execute(endpoint, request);
    const completion = await receipt.completion;
    outcome = { settled: "resolved", status: completion.status };
    if (completion.status === "completed") await completion.result.output.dispose();
  } catch (error) {
    outcome = { settled: "rejected", code: error.code, delivery: error.delivery, retrySafe: error.retrySafe, message: error.message };
  }
  server.close();
  rmSync(directory, { recursive: true, force: true });
  return { scenario: name, side: "stack-tip", executeAttempts, ...outcome };
}

for (const [name, respond] of Object.entries(scenarios)) console.log(JSON.stringify(await run(name, respond)));
