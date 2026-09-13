import fs from "node:fs";
import path from "node:path";
import { Workspace, Session, probeDirectory } from "./lib.mjs";

const appendCaller = (session) =>
  fs.appendFileSync(path.join(session.workspace, "src/app.ts"), '\nexport function again(): string {\n  return greet("again");\n}\n');

const bigAnswer = ["refs", "hot", "--all", "--json", "--full-lines"];

class Sessions {
  static async ordinary(build, deep = false) {
    const session = new Session(`ordinary-${build}`, `/tmp/rr58/ordinary`);
    if (deep) session.extraEnv = { RR58_TAP_STACKS: "1", RR58_WATCH_PREFIX: `${fs.realpathSync(session.root)}/ws,${session.root}/ws` };
    Workspace.small(session.workspace);
    await session.step("A01", "status with nothing running", build, ["daemon", "status"]);
    await session.step("A02", "start the daemon", build, ["daemon", "start"], { settleMs: 800 });
    await session.step("A03", "status of a ready daemon", build, ["daemon", "status"]);
    await session.step("A04", "first question", build, ["def", "greet"]);
    await session.step("A05", "same question again", build, ["def", "greet"]);
    await session.step("A06", "references", build, ["refs", "greet"]);
    await session.step("A07", "edit a file, ask again", build, ["refs", "greet"], { before: appendCaller, editLabel: "append again() calling greet to src/app.ts" });
    await session.step("A08", "a --cwd value that is also a command name", build, ["--cwd", "refs", "--cwd", ".", "def", "greet"]);
    await session.step("A09", "four questions at once", build, [
      ["refs", "greet"],
      ["def", "main"],
      ["context", "greet"],
      ["overview", "src/app.ts"],
    ], { settleMs: 1200 });
    await session.step("A10", "selected-file overview", build, ["overview", "src/index.ts"]);
    await session.step("A11", "workspace question after a selection", build, ["refs", "greet"]);
    await session.step("A12", "daemon disabled by environment", build, ["def", "greet"], { env: { SYMNAV_DAEMON: "0" } });
    await session.step("A13", "unknown command", build, ["bogus"]);
    await session.step("A14", "symbol that does not exist", build, ["def", "nosuchsymbol"]);
    await session.step("A15", "start while already running", build, ["daemon", "start"]);
    await session.step("A16", "stop", build, ["daemon", "stop"], { settleMs: 800 });
    await session.step("A17", "status after stop", build, ["daemon", "status"]);
    session.killLeftovers();
    session.save(`${probeDirectory}/out/ordinary-${build}${deep ? "-deep" : ""}.json`);
  }

  static async transfer(build) {
    const session = new Session(`transfer-${build}`, `/tmp/rr58/transfer`);
    Workspace.big(session.workspace);
    await session.step("B01", "start on a 201-file workspace", build, ["daemon", "start"], { settleMs: 800 });
    await session.step("B02", "a 1.5 MB answer", build, bigAnswer, { settleMs: 800 });
    await session.step("B03", "same answer; the CLI's own socket is destroyed after 300 KB", build, bigAnswer, {
      env: { RR58_FAULT_CUT_AFTER_BYTES: "300000", RR58_TAP_BYTE_LIMIT: "512" },
      settleMs: 1500,
    });
    await session.step("B04", "same answer; the daemon drops the connection after 300 KB", build, bigAnswer, {
      before: (current) => fs.writeFileSync(path.join(current.tap, "cut-server-once"), "300000"),
      env: { RR58_TAP_BYTE_LIMIT: "512" },
      settleMs: 1500,
    });
    await session.step("B05", "same answer, no fault", build, bigAnswer, { env: { RR58_TAP_BYTE_LIMIT: "512" }, settleMs: 800 });
    await session.step("B06", "stop", build, ["daemon", "stop"], { settleMs: 800 });
    session.killLeftovers();
    session.save(`${probeDirectory}/out/transfer-${build}.json`);
  }

  static async upgrade(first, second) {
    const session = new Session(`upgrade-${first}-then-${second}`, `/tmp/rr58/upgrade`);
    Workspace.small(session.workspace);
    await session.step("C01", `${first} starts the daemon`, first, ["daemon", "start"], { settleMs: 800 });
    await session.step("C02", `${second} asks a question`, second, ["def", "greet"], { settleMs: 1500 });
    await session.step("C03", `${second} lists daemons`, second, ["daemon", "status"]);
    await session.step("C04", `${second} tries to stop`, second, ["daemon", "stop"], { settleMs: 800 });
    await session.step("C05", `${first} lists daemons`, first, ["daemon", "status"]);
    await session.step("C06", `${second} starts a daemon`, second, ["daemon", "start"], { settleMs: 1500 });
    await session.step("C07", `${first} lists daemons`, first, ["daemon", "status"]);
    await session.step("C08", `${second} lists daemons`, second, ["daemon", "status"]);
    await session.step("C09", `${second} asks a question`, second, ["def", "greet"], { settleMs: 1000 });
    await session.step("C10", `${first} asks a question`, first, ["def", "greet"], { settleMs: 1500 });
    await session.step("C11", `${second} stops`, second, ["daemon", "stop"], { settleMs: 800 });
    await session.step("C12", `${first} stops`, first, ["daemon", "stop"], { settleMs: 800 });
    session.killLeftovers();
    session.save(`${probeDirectory}/out/upgrade-${first}-then-${second}.json`);
  }

  static async label(build) {
    const session = new Session(`label-${build}`, `/tmp/rr58/label`);
    Workspace.small(session.workspace);
    await session.step("L01", "start", build, ["daemon", "start"], { settleMs: 800 });
    await session.step("L02", "ordinary def", build, ["def", "greet"]);
    await session.step("L03", "a --cwd value that is also a command name", build, ["--cwd", "refs", "--cwd", ".", "def", "greet"]);
    await session.step("L04", "stop", build, ["daemon", "stop"], { settleMs: 800 });
    session.killLeftovers();
    session.save(`${probeDirectory}/out/label-${build}.json`);
  }

  static async footprint(builds, rounds) {
    const results = [];
    for (let round = 0; round < rounds; round += 1) {
      for (const build of builds) {
        const session = new Session(`footprint-${build}-${round}`, `/tmp/rr58/footprint`);
        session.tapEnabled = false;
        Workspace.small(session.workspace);
        await session.step("F01", "start", build, ["daemon", "start", "--json"], { settleMs: 1500 });
        await session.step("F02", "status", build, ["daemon", "status", "--json"]);
        await session.step("F03", "def", build, ["def", "greet"]);
        await session.step("F04", "status", build, ["daemon", "status", "--json"]);
        await session.step("F05", "stop", build, ["daemon", "stop", "--json"], { settleMs: 800 });
        session.killLeftovers();
        const parse = (text) => {
          try {
            return JSON.parse(text);
          } catch {
            return undefined;
          }
        };
        const startLog = session.steps[0].daemonLog.find((line) => line.kind === "startup-completed");
        results.push({
          build,
          round,
          start: parse(session.steps[0].runs[0].stdout),
          startWallMs: session.steps[0].runs[0].endedAt - session.steps[0].runs[0].startedAt,
          statusAfterStart: parse(session.steps[1].runs[0].stdout),
          defWallMs: session.steps[2].runs[0].endedAt - session.steps[2].runs[0].startedAt,
          statusAfterDef: parse(session.steps[3].runs[0].stdout),
          startupCompleted: startLog,
          executionTerminal: session.steps[3].daemonLog.filter((line) => line.kind === "execution-terminal"),
        });
      }
    }
    fs.writeFileSync(`${probeDirectory}/out/footprint.json`, JSON.stringify(results, null, 1));
  }
}

const [which, ...args] = process.argv.slice(2);
if (which === "ordinary") await Sessions.ordinary(args[0], args[1] === "deep");
else if (which === "transfer") await Sessions.transfer(args[0]);
else if (which === "upgrade") await Sessions.upgrade(args[0], args[1]);
else if (which === "label") await Sessions.label(args[0]);
else if (which === "footprint") await Sessions.footprint(args[0].split(","), Number(args[1] ?? 5));
else throw new Error(`unknown session ${which}`);
