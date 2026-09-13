// Knock count: a fake daemon on a Unix socket drops every connection; count how many times
// the real LocalDaemonTransport of one revision knocks (execute / result-fetch) before giving up.
// usage: node probe/knocks.mjs <worktree> <label> <out.json>
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

process.env.SYMNAV_TELEMETRY = "0";
const [root, label, outPath] = process.argv.slice(2);
const load = (relative) => import(pathToFileURL(join(root, relative)).href);

const { DaemonPolicy } = await load("packages/daemon/dist/index.js");
const { DaemonPolicyTestFactory } = await load("packages/daemon/dist/policy-testing.js");
const transportModule = await load("apps/cli/dist/daemon/local-daemon-transport.js");
const spoolModule = await load("apps/cli/dist/daemon/completion-spool.js");
const codecModule = await load("apps/cli/dist/daemon/daemon-result-chunk-codec.js");
const protocolModule = await load("apps/cli/dist/daemon/daemon-protocol.js");
const isHead = !("COMMAND_OUTPUT_CHUNK_BYTES" in spoolModule);
const sha = execFileSync("git", ["-C", root, "rev-parse", "HEAD"]).toString().trim();
const DEFAULT = DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 });

const request = {
  kind: "execute",
  protocolVersion: protocolModule.DAEMON_PROTOCOL_VERSION,
  instanceId: "instance",
  processToken: "token",
  requestId: "request",
  request: { argv: ["overview", "src/a.ts"], cwd: "/repo", telemetryEnabled: false },
};
const identityFields = {
  instanceId: request.instanceId,
  processToken: request.processToken,
  requestId: request.requestId,
};

function frame(value) {
  const payload = Buffer.from(JSON.stringify(value), "utf8");
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
}

async function completedSpool(directory) {
  const store = new spoolModule.DaemonCompletionSpoolStore({
    directory,
    workspaceKey: "workspace",
    instanceId: request.instanceId,
    ...(isHead ? { policy: DEFAULT.values.output } : {}),
  });
  const spool = await store.create(request.requestId);
  for (let sequence = 0; sequence < 4; sequence += 1) {
    await spool.append({ sequence, stream: "stdout", bytes: Buffer.from(`record-${sequence}\n`) });
  }
  const manifest = await spool.finish(0);
  const records = [];
  for await (const record of spool.read(0)) records.push(record);
  return { manifest, records };
}

function encodedRecord(manifest, record) {
  const chunk = {
    transferId: manifest.transferId,
    requestId: request.requestId,
    offset: record.sequence,
    sequence: record.sequence,
    stream: record.stream,
    bytes: record.bytes,
  };
  return isHead
    ? codecModule.DaemonResultChunkCodec.encode(chunk, DEFAULT.values.output.maximumChunkRawBytes)
    : codecModule.DaemonResultChunkCodec.encode(chunk);
}

async function run(scenario, policy) {
  const directory = mkdtempSync(join(tmpdir(), `knocks-${label}-`));
  const endpoint = join(directory, "daemon.sock");
  const { manifest, records } = await completedSpool(join(directory, "spool"));
  const knocks = [];
  const started = performance.now();
  const sockets = new Set();
  const server = createServer((socket) => {
    sockets.add(socket);
    socket.on("error", () => undefined);
    socket.once("data", (encoded) => {
      const message = JSON.parse(encoded.subarray(4).toString());
      knocks.push({ kind: message.kind, offset: message.offset ?? null, atMs: Math.round(performance.now() - started) });
      const manifestFrame = frame({ kind: "result-manifest", ...identityFields, manifest });
      if (message.kind === "execute" && scenario === "drop-after-accept") {
        socket.end(frame({ kind: "accepted", ...identityFields, acceptedAt: 10, queuePosition: 0 }));
        return;
      }
      if (message.kind === "execute") {
        socket.end(
          Buffer.concat([
            frame({ kind: "accepted", ...identityFields, acceptedAt: 10, queuePosition: 0 }),
            manifestFrame,
            encodedRecord(manifest, records[0]),
          ]),
        );
        return;
      }
      if (message.kind === "result-fetch" && scenario === "destroy-on-fetch") {
        socket.destroy();
        return;
      }
      if (message.kind === "result-fetch") {
        const next = records[message.offset];
        socket.end(Buffer.concat([manifestFrame, ...(next === undefined ? [] : [encodedRecord(manifest, next)])]));
        return;
      }
      socket.end();
    });
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(endpoint, resolve);
  });
  const transport = isHead ? new transportModule.LocalDaemonTransport(policy.values) : new transportModule.LocalDaemonTransport();
  let outcome;
  try {
    const receipt = await transport.execute(endpoint, request);
    const completion = await receipt.completion;
    outcome = { settled: "resolved", status: completion.status };
    if (completion.status === "completed") await completion.result.output.dispose();
  } catch (error) {
    outcome = { settled: "rejected", code: error.code ?? null, delivery: error.delivery ?? null, message: error.message };
  }
  for (const socket of sockets) socket.destroy();
  await new Promise((resolve) => server.close(resolve));
  rmSync(directory, { recursive: true, force: true });
  return {
    executes: knocks.filter((knock) => knock.kind === "execute").length,
    fetches: knocks.filter((knock) => knock.kind === "result-fetch").length,
    knocks,
    outcome,
  };
}

const grid = isHead ? [0, 1, 2, 3] : [null];
const results = [];
for (const scenario of ["drop-after-accept", "drop-mid-transfer", "destroy-on-fetch"]) {
  for (const reattachLimit of grid) {
    for (const resumeLimit of grid) {
      const policy =
        reattachLimit === null
          ? DEFAULT
          : DaemonPolicyTestFactory.withOverrides(DEFAULT, {
              delivery: {
                postAcceptanceExecutionReattachmentLimit: reattachLimit,
                resultTransferResumeLimitPerExecutionAttempt: resumeLimit,
              },
            });
      results.push({ scenario, reattachLimit, resumeLimit, ...(await run(scenario, policy)) });
    }
  }
}

writeFileSync(outPath, JSON.stringify({ label, sha, node: process.version, results }, null, 2));
for (const result of results) {
  console.log(
    `${label} ${result.scenario.padEnd(18)} R=${result.reattachLimit} F=${result.resumeLimit} executes=${result.executes} fetches=${result.fetches} ${result.outcome.settled} ${result.outcome.code ?? result.outcome.status}`,
  );
}
process.exit(0);
