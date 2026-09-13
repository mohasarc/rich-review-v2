import fs from "node:fs";
import path from "node:path";
import { Workspace, Session, StateSnapshot, probeDirectory } from "./lib.mjs";

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const bigAnswer = ["refs", "hot", "--all", "--json", "--full-lines"];

class Replay {
  constructor(build) {
    this.build = build;
    this.scenarios = [];
  }

  async capture(session, id, title, runs, notes = {}) {
    await pause(notes.settleMs ?? 400);
    session.steps.push({
      id,
      title,
      build: this.build,
      startedAt: runs.length ? Math.min(...runs.map((run) => run.startedAt)) : Date.now(),
      endedAt: Date.now(),
      runs,
      state: StateSnapshot.capture(session.state),
      daemonLog: StateSnapshot.logLines(session.state, "daemon.log"),
      usage: StateSnapshot.logLines(session.state, "usage.jsonl"),
      notes,
    });
    process.stderr.write(`[replay-${this.build}] ${id} ${runs.map((run) => `${run.argv.join(" ")}=${run.exitCode}`).join(" | ")}\n`);
  }

  registryRecord(session) {
    return StateSnapshot.capture(session.state).find((record) => record.json && record.json.instanceId && record.json.pid)?.json;
  }

  alive(pid) {
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  }

  async scenario(name, title, body) {
    const session = new Session(`replay-${name}-${this.build}`, `/tmp/rr58/replay-${name}`);
    const started = Date.now();
    try {
      await body(session);
    } finally {
      for (const pid of session.registryPids()) {
        try {
          process.kill(pid, "SIGCONT");
        } catch {}
      }
      session.killLeftovers();
    }
    session.save(`${probeDirectory}/out/replay-${name}-${this.build}.json`, { scenario: name, title, wallMs: Date.now() - started });
  }

  async busyStatus() {
    await this.scenario("busy", "status while a long request runs", async (session) => {
      Workspace.big(session.workspace);
      await this.capture(session, "R1a", "start", [await session.run(this.build, ["daemon", "start"])], { settleMs: 800 });
      const query = session.run(this.build, bigAnswer);
      await pause(60);
      const status = await session.run(this.build, ["daemon", "status", "--json"]);
      const done = await query;
      await this.capture(session, "R1b", "status 60 ms into a 1.5 MB refs", [done, status]);
      await this.capture(session, "R1c", "stop", [await session.run(this.build, ["daemon", "stop"])], { settleMs: 800 });
    });
  }

  async frozenDaemon() {
    await this.scenario("frozen", "daemon process frozen with SIGSTOP", async (session) => {
      Workspace.small(session.workspace);
      await this.capture(session, "R2a", "start", [await session.run(this.build, ["daemon", "start"])], { settleMs: 800 });
      const record = this.registryRecord(session);
      process.kill(record.pid, "SIGSTOP");
      const status = await session.run(this.build, ["daemon", "status", "--json"]);
      await this.capture(session, "R2b", "status while frozen", [status], { pid: record.pid, aliveAfter: this.alive(record.pid) });
      const question = await session.run(this.build, ["def", "greet"]);
      await this.capture(session, "R2c", "question while frozen", [question], { pid: record.pid, recordAfter: this.registryRecord(session)?.pid });
      const stop = await session.run(this.build, ["daemon", "stop", "--json"]);
      await this.capture(session, "R2d", "stop while frozen", [stop], { pid: record.pid, aliveAfter: this.alive(record.pid), settleMs: 800 });
      const after = await session.run(this.build, ["daemon", "status", "--json"]);
      await this.capture(session, "R2e", "status after stop", [after], { aliveAfter: this.alive(record.pid) });
    });
  }

  async staleRecord() {
    await this.scenario("stale", "daemon killed with SIGKILL, record left behind", async (session) => {
      Workspace.small(session.workspace);
      await this.capture(session, "R3a", "start", [await session.run(this.build, ["daemon", "start"])], { settleMs: 800 });
      const record = this.registryRecord(session);
      process.kill(record.pid, "SIGKILL");
      await pause(300);
      const recordsBefore = StateSnapshot.capture(session.state).filter((entry) => entry.json?.instanceId).length;
      const status = await session.run(this.build, ["daemon", "status"]);
      const recordsAfter = StateSnapshot.capture(session.state).filter((entry) => entry.json?.instanceId).length;
      const endpointAfter = fs.existsSync(record.endpoint);
      await this.capture(session, "R3b", "status after SIGKILL", [status], { recordsBefore, recordsAfter, endpointAfter });
      const question = await session.run(this.build, ["def", "greet"]);
      await this.capture(session, "R3c", "next question", [question], { settleMs: 1500 });
      await this.capture(session, "R3d", "stop", [await session.run(this.build, ["daemon", "stop"])], { settleMs: 800 });
    });
  }

  async stopWhileStarting() {
    await this.scenario("stop-starting", "stop issued during warm-up", async (session) => {
      Workspace.big(session.workspace, 600, 20);
      const start = session.run(this.build, ["daemon", "start", "--json"]);
      await pause(150);
      const stop = await session.run(this.build, ["daemon", "stop", "--json"]);
      const started = await start;
      await this.capture(session, "R4a", "start and stop race", [started, stop], { settleMs: 1500 });
      const status = await session.run(this.build, ["daemon", "status", "--json"]);
      await this.capture(session, "R4b", "status afterwards", [status]);
    });
  }

  async callerKilled() {
    await this.scenario("caller-killed", "initiating CLI killed during warm-up", async (session) => {
      Workspace.big(session.workspace, 600, 20);
      const child = session.run(this.build, ["daemon", "start", "--json"]);
      await pause(150);
      const cliPids = session.steps.length;
      let killedPid = undefined;
      for (const file of fs.existsSync(session.tap) ? fs.readdirSync(session.tap) : []) {
        const first = fs.readFileSync(path.join(session.tap, file), "utf8").split("\n")[0];
        try {
          const event = JSON.parse(first);
          if (event.kind === "thread-start" && event.isMainThread && event.argv?.includes("start") && event.argv?.[1]?.endsWith("cli.js")) killedPid = event.pid;
        } catch {}
      }
      if (killedPid !== undefined) process.kill(killedPid, "SIGKILL");
      const startRun = await child;
      await this.capture(session, "R5a", "daemon start killed after 150 ms", [startRun], { killedPid, cliPids, settleMs: 4000 });
      const status = await session.run(this.build, ["daemon", "status", "--json"]);
      await this.capture(session, "R5b", "status 4 s later", [status]);
      await this.capture(session, "R5c", "stop", [await session.run(this.build, ["daemon", "stop", "--json"])], { settleMs: 800 });
    });
  }

  async drainOnStop() {
    await this.scenario("drain", "stop while a request is in flight", async (session) => {
      Workspace.big(session.workspace);
      await this.capture(session, "R6a", "start", [await session.run(this.build, ["daemon", "start"])], { settleMs: 800 });
      const query = session.run(this.build, bigAnswer);
      await pause(60);
      const stop = await session.run(this.build, ["daemon", "stop", "--json"]);
      const done = await query;
      await this.capture(session, "R6b", "stop 60 ms into a 1.5 MB refs", [done, stop], { settleMs: 800 });
    });
  }

  async deletedWorkspace() {
    await this.scenario("deleted", "workspace directory deleted under a ready daemon", async (session) => {
      Workspace.small(session.workspace);
      await this.capture(session, "R7a", "start", [await session.run(this.build, ["daemon", "start"])], { settleMs: 800 });
      const record = this.registryRecord(session);
      fs.rmSync(session.workspace, { recursive: true, force: true });
      const deletedAt = Date.now();
      let polls = 0;
      let lastStatus;
      while (Date.now() - deletedAt < 120000) {
        lastStatus = await session.run(this.build, ["daemon", "status", "--json"], { cwd: session.root });
        polls += 1;
        if (!this.alive(record.pid)) break;
        await pause(2000);
      }
      await this.capture(session, "R7b", "poll until the daemon exits", [lastStatus], {
        pid: record.pid,
        exitedAfterMs: Date.now() - deletedAt,
        polls,
        aliveAtEnd: this.alive(record.pid),
      });
    });
  }
}

const [build, ...names] = process.argv.slice(2);
const replay = new Replay(build);
const all = { busy: "busyStatus", frozen: "frozenDaemon", stale: "staleRecord", "stop-starting": "stopWhileStarting", "caller-killed": "callerKilled", drain: "drainOnStop", deleted: "deletedWorkspace" };
for (const name of names.length ? names : Object.keys(all)) await replay[all[name]]();
