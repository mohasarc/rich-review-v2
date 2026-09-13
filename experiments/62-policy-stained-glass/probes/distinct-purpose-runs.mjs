import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const experiment = new URL("..", import.meta.url).pathname;
const worktrees = join(experiment, "../../worktrees");

class Build {
  constructor(name) {
    this.name = name;
    this.root = join(worktrees, `pr-131-${name}`);
  }

  import(relativePath) {
    return import(pathToFileURL(join(this.root, relativePath)).href);
  }

  commit() {
    return execFileSync("git", ["-C", this.root, "rev-parse", "HEAD"]).toString().trim();
  }
}

const builds = { base: new Build("base"), head: new Build("head") };
const loaded = {};
for (const [name, build] of Object.entries(builds)) {
  loaded[name] = {
    transport: await build.import("apps/cli/dist/daemon/local-daemon-transport.js"),
    spool: await build.import("apps/cli/dist/daemon/completion-spool.js"),
    protocol: await build.import("apps/cli/dist/daemon/daemon-protocol.js"),
    policy: await build.import("packages/daemon/dist/index.js"),
    policyTesting: await build.import("packages/daemon/dist/policy-testing.js"),
  };
}

const directories = [];
const temporaryDirectory = (prefix) => {
  const directory = mkdtempSync(join(tmpdir(), prefix));
  directories.push(directory);
  return directory;
};

class Frame {
  static encode(value) {
    const payload = Buffer.from(JSON.stringify(value), "utf8");
    const prefix = Buffer.alloc(4);
    prefix.writeUInt32BE(payload.length);
    return Buffer.concat([prefix, payload]);
  }
}

class RawServer {
  static async listen(onConnection) {
    const endpoint = join(temporaryDirectory("stained-glass-probe-"), "daemon.sock");
    const sockets = [];
    const server = createServer((socket) => {
      sockets.push(socket);
      socket.on("error", () => undefined);
      onConnection(socket);
    });
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(endpoint, resolve);
    });
    return {
      endpoint,
      close: async () => {
        for (const socket of sockets) socket.destroy();
        await new Promise((resolve) => server.close(() => resolve()));
      },
    };
  }
}

class TimeoutPurposeProbe {
  static transports(buildName) {
    const { transport, policy } = loaded[buildName];
    if (buildName === "base") {
      return [
        { composition: "ordinary (new LocalDaemonTransport())", create: () => new transport.LocalDaemonTransport() },
        {
          composition: "status action (new LocalDaemonTransport({ requestTimeoutMs: 100 }))",
          create: () => new transport.LocalDaemonTransport({ requestTimeoutMs: 100 }),
        },
      ];
    }
    const values = policy.DaemonPolicy.currentSystem().values;
    return [
      { composition: "ordinary (policy.values)", create: () => new transport.LocalDaemonTransport(values) },
      {
        composition: "status-observer purpose (policy.values, { responseTimeoutPurpose: 'status-observer' })",
        create: () =>
          new transport.LocalDaemonTransport(values, { responseTimeoutPurpose: "status-observer" }),
      },
    ];
  }

  static requests(protocolVersion) {
    return [
      {
        name: "ping",
        family: "lifecycle",
        request: { kind: "ping", protocolVersion, instanceId: "instance" },
        response: { kind: "pong", protocolVersion, instanceId: "instance", symnavVersion: "probe" },
        send: (transport, endpoint, request) => transport.request(endpoint, request),
      },
      {
        name: "execution-status",
        family: "execution status",
        request: {
          kind: "execution-status",
          protocolVersion,
          instanceId: "instance",
          processToken: "token",
          requestId: "request",
        },
        response: {
          kind: "execution-status",
          instanceId: "instance",
          processToken: "token",
          requestId: "request",
          status: { state: "unknown" },
        },
        send: (transport, endpoint, request) => transport.executionStatus(endpoint, request),
      },
    ];
  }

  static async run(buildName, delayMs, transportCase, requestCase) {
    const server = await RawServer.listen((socket) => {
      socket.once("data", () => {
        setTimeout(() => {
          if (!socket.destroyed) socket.end(Frame.encode(requestCase.response));
        }, delayMs);
      });
    });
    const startedAt = performance.now();
    let outcome;
    try {
      const response = await requestCase.send(transportCase.create(), server.endpoint, requestCase.request);
      outcome = { result: "answered", responseKind: response.kind ?? `status:${response.state}` };
    } catch (error) {
      outcome = { result: "gave up", code: error.code ?? error.message };
    }
    const elapsedMs = Math.round(performance.now() - startedAt);
    await server.close();
    return {
      build: buildName,
      composition: transportCase.composition,
      request: requestCase.name,
      daemonDelayMs: delayMs,
      ...outcome,
      elapsedMs,
    };
  }

  static async all() {
    const rows = [];
    for (const buildName of ["base", "head"]) {
      const protocolVersion = loaded[buildName].protocol.DAEMON_PROTOCOL_VERSION;
      for (const transportCase of TimeoutPurposeProbe.transports(buildName)) {
        for (const requestCase of TimeoutPurposeProbe.requests(protocolVersion)) {
          for (const delayMs of [40, 170, 400]) {
            rows.push(await TimeoutPurposeProbe.run(buildName, delayMs, transportCase, requestCase));
          }
        }
      }
    }
    return rows;
  }
}

class DeliveryBudgetProbe {
  static async manifest(buildName) {
    const { spool, policy } = loaded[buildName];
    const directory = temporaryDirectory("stained-glass-spool-");
    const options = { directory: join(directory, "daemon"), workspaceKey: "workspace", instanceId: "instance" };
    const store =
      buildName === "head"
        ? new spool.DaemonCompletionSpoolStore({ ...options, policy: policy.DaemonPolicy.currentSystem().values.output })
        : new spool.DaemonCompletionSpoolStore(options);
    const created = await store.create("request");
    return created.finish(0);
  }

  static frames(protocolVersion, manifest) {
    const identity = { instanceId: "instance", processToken: "token", requestId: "request" };
    return {
      request: {
        kind: "execute",
        protocolVersion,
        ...identity,
        request: { argv: ["overview", "src/a.ts"], cwd: "/repo", telemetryEnabled: false },
      },
      accepted: Frame.encode({ kind: "accepted", ...identity, acceptedAt: 10, queuePosition: 0 }),
      manifest: Frame.encode({ kind: "result-manifest", ...identity, manifest }),
      end: Frame.encode({
        kind: "result-end",
        ...identity,
        transferId: manifest.transferId,
        rawBytes: manifest.rawBytes,
        recordCount: manifest.recordCount,
        sha256: manifest.sha256,
      }),
      acknowledged: Frame.encode({ kind: "result-acknowledged", ...identity, transferId: manifest.transferId }),
      corruptEnd: Frame.encode({
        kind: "result-end",
        ...identity,
        transferId: manifest.transferId,
        rawBytes: manifest.rawBytes,
        recordCount: manifest.recordCount + 1,
        sha256: manifest.sha256,
      }),
    };
  }

  static scenarios() {
    return [
      {
        name: "accept-drop → manifest-drop → fetch ok",
        story:
          "1st execute: daemon accepts, then connection closes. 2nd execute: accepted + manifest, then closes before result-end. Fetch: manifest + result-end.",
        execute: (count, frames) =>
          count === 1 ? frames.accepted : Buffer.concat([frames.accepted, frames.manifest]),
        fetch: (_count, frames) => Buffer.concat([frames.manifest, frames.end]),
      },
      {
        name: "manifest-drop every time",
        story:
          "Every execute: accepted + manifest, then closes before result-end. Every fetch: manifest, then closes before result-end.",
        execute: (_count, frames) => Buffer.concat([frames.accepted, frames.manifest]),
        fetch: (_count, frames) => frames.manifest,
      },
      {
        name: "accept-drop → corrupt end",
        story:
          "1st execute: daemon accepts, then connection closes. 2nd execute: accepted + manifest + result-end with a wrong record count.",
        execute: (count, frames) =>
          count === 1 ? frames.accepted : Buffer.concat([frames.accepted, frames.manifest, frames.corruptEnd]),
        fetch: (_count, frames) => Buffer.concat([frames.manifest, frames.corruptEnd]),
      },
    ];
  }

  static transport(buildName, limits) {
    const { transport, policy, policyTesting } = loaded[buildName];
    if (buildName === "base") return new transport.LocalDaemonTransport({ requestTimeoutMs: 100 });
    const values = policyTesting.DaemonPolicyTestFactory.withOverrides(policy.DaemonPolicy.currentSystem(), {
      transport: { singleResponseTimeoutMs: 100 },
      delivery: {
        postAcceptanceExecutionReattachmentLimit: limits.reattachments,
        resultTransferResumeLimitPerExecutionAttempt: limits.resumes,
      },
    }).values;
    return new transport.LocalDaemonTransport(values);
  }

  static async run(buildName, scenario, limits) {
    const protocolVersion = loaded[buildName].protocol.DAEMON_PROTOCOL_VERSION;
    const manifest = await DeliveryBudgetProbe.manifest(buildName);
    const frames = DeliveryBudgetProbe.frames(protocolVersion, manifest);
    const counts = { execute: 0, fetch: 0, acknowledge: 0 };
    const timeline = [];
    const server = await RawServer.listen((socket) => {
      socket.once("data", (encoded) => {
        const message = JSON.parse(Buffer.from(encoded).subarray(4).toString());
        if (message.kind === "result-ack") {
          counts.acknowledge += 1;
          timeline.push("ack");
          socket.end(frames.acknowledged);
          return;
        }
        if (message.kind === "result-fetch") {
          counts.fetch += 1;
          timeline.push(`fetch#${counts.fetch}`);
          socket.end(scenario.fetch(counts.fetch, frames));
          return;
        }
        counts.execute += 1;
        timeline.push(`execute#${counts.execute}`);
        socket.end(scenario.execute(counts.execute, frames));
      });
    });
    let outcome;
    try {
      const receipt = await DeliveryBudgetProbe.transport(buildName, limits).execute(server.endpoint, frames.request);
      const completion = await Promise.race([
        receipt.completion,
        new Promise((_, reject) => setTimeout(() => reject(new Error("probe timeout 5s")), 5_000)),
      ]);
      outcome = { completion: completion.status, exitCode: completion.result?.exitCode };
      if (completion.status === "completed") await completion.result.output.dispose();
    } catch (error) {
      outcome = { completion: "rejected", code: error.code ?? error.message, delivery: error.delivery };
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
    await server.close();
    return {
      build: buildName,
      scenario: scenario.name,
      reattachmentLimit: buildName === "head" ? limits.reattachments : "implicit (completeWithOneReattachment)",
      resumeLimitPerAttempt: buildName === "head" ? limits.resumes : "implicit (resumeStarted boolean per executeOnce)",
      ...counts,
      timeline,
      ...outcome,
    };
  }

  static async all() {
    const rows = [];
    for (const scenario of DeliveryBudgetProbe.scenarios()) {
      rows.push(await DeliveryBudgetProbe.run("base", scenario, {}));
      for (const reattachments of [0, 1, 2]) {
        for (const resumes of [0, 1, 2]) {
          rows.push(await DeliveryBudgetProbe.run("head", scenario, { reattachments, resumes }));
        }
      }
    }
    return { scenarios: DeliveryBudgetProbe.scenarios().map(({ name, story }) => ({ name, story })), rows };
  }
}

const timeoutRows = await TimeoutPurposeProbe.all();
const delivery = await DeliveryBudgetProbe.all();
for (const directory of directories) rmSync(directory, { recursive: true, force: true });

writeFileSync(
  join(experiment, "evidence/distinct-purpose-runs.json"),
  JSON.stringify(
    {
      method:
        "Node script imports each worktree's built apps/cli/dist LocalDaemonTransport and talks to a raw Unix-socket server in the same process. Server behavior is scripted (fake daemon); the client code under test is the real built transport.",
      recordedAt: new Date().toISOString(),
      node: process.version,
      baseCommit: builds.base.commit(),
      headCommit: builds.head.commit(),
      timeoutPurpose: timeoutRows,
      deliveryBudgets: delivery,
    },
    null,
    1,
  ),
);

for (const row of timeoutRows) {
  console.log(`${row.build} | ${row.composition.slice(0, 40)} | ${row.request} | delay ${row.daemonDelayMs} → ${row.result} ${row.code ?? row.responseKind} in ${row.elapsedMs}ms`);
}
for (const row of delivery.rows) {
  console.log(`${row.build} | ${row.scenario} | R=${row.reattachmentLimit} F=${row.resumeLimitPerAttempt} | exec ${row.execute} fetch ${row.fetch} ack ${row.acknowledge} | ${row.completion} ${row.code ?? ""} | ${row.timeline.join(" ")}`);
}
