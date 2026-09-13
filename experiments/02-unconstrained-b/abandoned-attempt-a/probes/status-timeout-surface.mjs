// Real CLI surface: `symnav daemon status --json` against a live daemon that answers identify
// and never answers ping. The fake daemon measures how long the CLI keeps the ping socket open.
// Usage: node status-timeout-surface.mjs <worktree> <base|head> [runs]
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";

const [worktree, side, runsText = "7"] = process.argv.slice(2);
const cliDist = (path) => import(pathToFileURL(join(worktree, "apps/cli/dist", path)).href);
const { DaemonRegistry } = await cliDist("daemon/daemon-registry.js");
const { DaemonWorkspaceIdentity } = await cliDist("daemon/daemon-workspace-identity.js");
const { StateDirectoryResolver } = await cliDist("state-directory-resolver.js");
const { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } = await cliDist(
  "daemon/daemon-protocol.js",
);
const daemonPackage = await import(
  pathToFileURL(join(worktree, "packages/daemon/dist/index.js")).href
);

function registryFor(directory) {
  return side === "head"
    ? new DaemonRegistry(directory, daemonPackage.DaemonPolicy.currentSystem().values.startup)
    : new DaemonRegistry(directory);
}

const frame = (value) => {
  const payload = Buffer.from(JSON.stringify(value), "utf8");
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
};

async function once() {
  const stateDir = StateDirectoryResolver.canonicalize(mkdtempSync(join(tmpdir(), "rr02-st-")));
  const workspaceRoot = mkdtempSync(join(tmpdir(), "rr02-ws-"));
  mkdirSync(join(workspaceRoot, ".git"));
  writeFileSync(join(workspaceRoot, "input.ts"), "export const value = 1;\n");
  const identity = DaemonWorkspaceIdentity.from(workspaceRoot, stateDir);
  const instanceId = "silent";
  const processToken = "silent-token";
  const startedAt = Date.now();
  const endpoint = identity.endpoint(instanceId);
  mkdirSync(join(endpoint, ".."), { recursive: true });
  const pingLifetimes = [];
  const server = createServer((socket) => {
    const openedAt = performance.now();
    socket.on("error", () => undefined);
    socket.once("data", (encoded) => {
      const message = JSON.parse(encoded.subarray(4).toString());
      if (message.kind === "identify") {
        socket.end(frame({ kind: "identity", instanceId, processToken, pid: process.pid, startedAt }));
        return;
      }
      if (message.kind === "ping") {
        socket.once("close", () => pingLifetimes.push(performance.now() - openedAt));
      }
    });
  });
  await new Promise((resolve) => server.listen(endpoint, resolve));
  registryFor(identity.registryDirectory).write({
    schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
    protocolVersion: DAEMON_PROTOCOL_VERSION,
    symnavVersion: "0.1.0",
    workspaceRoot,
    workspaceKey: identity.workspaceKey,
    stateKey: identity.stateKey,
    identityKey: identity.identityKey,
    instanceId,
    processToken,
    endpoint,
    pid: process.pid,
    state: "ready",
    startedAt,
    readyAt: startedAt,
    fileCount: 1,
    memoryCapBytes: Number.MAX_SAFE_INTEGER,
  });
  const started = performance.now();
  const { code, stdout } = await new Promise((resolve) => {
    const child = spawn(process.execPath, [join(worktree, "apps/cli/dist/cli.js"), "daemon", "status", "--json"], {
      cwd: tmpdir(),
      env: { ...process.env, SYMNAV_STATE_DIR: stateDir, SYMNAV_TELEMETRY: "0" },
    });
    let out = "";
    child.stdout.on("data", (chunk) => (out += chunk));
    child.on("exit", (exitCode) => resolve({ code: exitCode, stdout: out }));
  });
  const wallMs = performance.now() - started;
  await new Promise((resolve) => setTimeout(resolve, 20));
  server.close();
  rmSync(stateDir, { recursive: true, force: true });
  rmSync(workspaceRoot, { recursive: true, force: true });
  let state;
  try {
    state = JSON.parse(stdout).daemons?.[0]?.state;
  } catch {
    state = `unparsed: ${stdout.slice(0, 80)}`;
  }
  return { code, state, pingSocketOpenMs: pingLifetimes.map((value) => Math.round(value)), wallMs: Math.round(wallMs) };
}

const runs = [];
for (let index = 0; index < Number(runsText); index += 1) runs.push(await once());
const lifetimes = runs.flatMap((run) => run.pingSocketOpenMs).sort((a, b) => a - b);
console.log(
  JSON.stringify({
    side,
    runs,
    medianPingSocketOpenMs: lifetimes[Math.floor(lifetimes.length / 2)],
  }),
);
