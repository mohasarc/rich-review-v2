// E3 probe. Copied into a scratch copy of #131 base and head as src/daemon/rr08-reattach-probe.test.ts.
// __TRANSPORT__ and __STORE__ are replaced per version by tools/reattach-probe.sh.
import { randomUUID } from "node:crypto";
import { appendFileSync, mkdtempSync, rmSync } from "node:fs";
import { createServer, type Server, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, it } from "vitest";
import { DAEMON_PROTOCOL_VERSION, type DaemonExecuteRequest } from "./daemon-protocol.js";
import { LocalDaemonTransport } from "./local-daemon-transport.js";
import { DaemonCompletionSpoolStore } from "./completion-spool.js";
__IMPORTS__

const request: DaemonExecuteRequest = {
  kind: "execute",
  protocolVersion: DAEMON_PROTOCOL_VERSION,
  instanceId: "instance",
  processToken: "token",
  requestId: "request",
  request: { argv: ["overview", "src/a.ts"], cwd: "/repo", telemetryEnabled: false },
};

const log = (value: unknown) => appendFileSync(process.env.RR08_LOG!, JSON.stringify(value) + "\n");

function frame(value: unknown): Buffer {
  const payload = Buffer.from(JSON.stringify(value), "utf8");
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
}
const accepted = () => ({
  kind: "accepted",
  instanceId: request.instanceId,
  processToken: request.processToken,
  requestId: request.requestId,
  acceptedAt: 10,
  queuePosition: 0,
});
const manifestFrame = (manifest: any) => ({
  kind: "result-manifest",
  instanceId: request.instanceId,
  processToken: request.processToken,
  requestId: request.requestId,
  manifest,
});
const endFrame = (manifest: any) => ({
  kind: "result-end",
  instanceId: request.instanceId,
  processToken: request.processToken,
  requestId: request.requestId,
  transferId: manifest.transferId,
  rawBytes: manifest.rawBytes,
  recordCount: manifest.recordCount,
  sha256: manifest.sha256,
});

describe("rr08 reattachment probe", () => {
  const servers: Server[] = [];
  const sockets: Socket[] = [];
  const directories: string[] = [];
  afterEach(async () => {
    for (const socket of sockets) socket.destroy();
    await Promise.all(servers.map((s) => new Promise<void>((r) => s.close(() => r()))));
    for (const d of directories) rmSync(d, { recursive: true, force: true });
    servers.length = 0;
    sockets.length = 0;
    directories.length = 0;
  });

  async function server(onData: (socket: Socket, message: any, bytes: Buffer) => void) {
    const directory = mkdtempSync(join(tmpdir(), "rr08-probe-"));
    directories.push(directory);
    const endpoint = join(directory, `d-${randomUUID().slice(0, 8)}.sock`);
    const srv = createServer((socket) => {
      sockets.push(socket);
      socket.on("error", () => undefined);
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        onData(socket, JSON.parse(bytes.subarray(4).toString()), bytes);
      });
    });
    servers.push(srv);
    await new Promise<void>((resolve) => srv.listen(endpoint, resolve));
    return { endpoint, directory };
  }

  async function settle(receiptPromise: Promise<any>) {
    try {
      const receipt = await receiptPromise;
      const completion = await receipt.completion;
      if (completion.status === "completed") await completion.result.output.dispose();
      return { outcome: "resolved", status: completion.status };
    } catch (error: any) {
      return {
        outcome: "rejected",
        code: error?.code,
        delivery: error?.delivery,
        message: String(error?.message ?? error),
      };
    }
  }

  it("P1 reattach succeeds at transport level, then the reattached stream is corrupt", async () => {
    let executeCount = 0;
    const { endpoint } = await server((socket) => {
      executeCount += 1;
      if (executeCount === 1) return void socket.end(frame(accepted()));
      socket.end(Buffer.concat([frame(accepted()), Buffer.from([0, 0, 0, 4, 0x7b])]));
    });
    const result = await settle(__TRANSPORT__.execute(endpoint, request));
    log({ probe: "P1", executeCount, ...result });
  });

  it("P2 reattach succeeds, then the reattached stream closes again after acceptance", async () => {
    let executeCount = 0;
    const { endpoint } = await server((socket) => {
      executeCount += 1;
      socket.end(frame(accepted()));
    });
    const result = await settle(__TRANSPORT__.execute(endpoint, request));
    log({ probe: "P2", executeCount, ...result });
  });

  it("P3 reattached execute attempt gets its own fetch resume (port of #131's new test)", async () => {
    const { directory } = await server(() => undefined);
    const store = __STORE__(join(directory, "daemon"));
    const spool = await store.create(request.requestId);
    const manifest = await spool.finish(0);
    let executeCount = 0;
    let fetchCount = 0;
    const { endpoint } = await server((socket, message) => {
      if (message.kind === "result-ack") {
        socket.end(
          frame({
            kind: "result-acknowledged",
            instanceId: request.instanceId,
            processToken: request.processToken,
            requestId: request.requestId,
            transferId: manifest.transferId,
          }),
        );
        return;
      }
      if (message.kind === "result-fetch") {
        fetchCount += 1;
        socket.end(Buffer.concat([frame(manifestFrame(manifest)), frame(endFrame(manifest))]));
        return;
      }
      executeCount += 1;
      socket.end(
        executeCount === 1
          ? frame(accepted())
          : Buffer.concat([frame(accepted()), frame(manifestFrame(manifest))]),
      );
    });
    const result = await settle(__TRANSPORT__.execute(endpoint, request));
    log({ probe: "P3", executeCount, fetchCount, ...result });
  });
});
