import { spawn, execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const probeDirectory = path.dirname(fileURLToPath(import.meta.url));
const worktrees = "/Users/moyaseen/projects/rich-review-v2/worktrees";
const buildWorktrees = {
  main: "main",
  p03: "pr-127-base",
  p04: "pr-127-head",
  p07: "pr-131-base",
  p08: "pr-131-head",
  p24: "pr-148-base",
  p25: "pr-148-head",
  tip: "stack-head",
  ...Object.fromEntries(
    (process.env.RR58_EXTRA_BUILDS ?? "")
      .split(",")
      .filter(Boolean)
      .map((pair) => pair.split("=")),
  ),
};
export const cliPaths = Object.fromEntries(
  Object.entries(buildWorktrees).map(([key, directory]) => [key, `${worktrees}/${directory}/apps/cli/dist/cli.js`]),
);
const tapImport = `--import=file://${probeDirectory}/tap/tap.mjs`;

export class Workspace {
  static small(root) {
    Workspace.write(root, "package.json", '{ "name": "rr58-ws", "private": true, "type": "module" }\n');
    Workspace.write(
      root,
      "tsconfig.json",
      JSON.stringify(
        {
          compilerOptions: { target: "ES2022", module: "NodeNext", moduleResolution: "NodeNext", strict: true },
          include: ["src"],
        },
        null,
        2,
      ) + "\n",
    );
    Workspace.write(root, "src/index.ts", "export function greet(name: string): string {\n  return `hello, ${name}`;\n}\n");
    Workspace.write(
      root,
      "src/app.ts",
      'import { greet } from "./index.js";\n\nexport function main(): string {\n  return greet("world");\n}\n',
    );
    Workspace.write(root, "refs/README.md", "A directory whose name is also a symnav command.\n");
    Workspace.commit(root);
  }

  static big(root, files = 200, callsPerFile = 40) {
    Workspace.write(root, "package.json", '{ "name": "rr58-big", "private": true, "type": "module" }\n');
    Workspace.write(
      root,
      "tsconfig.json",
      JSON.stringify(
        {
          compilerOptions: { target: "ES2022", module: "NodeNext", moduleResolution: "NodeNext", strict: true },
          include: ["src"],
        },
        null,
        2,
      ) + "\n",
    );
    Workspace.write(root, "src/hot.ts", "export function hot(): number {\n  return 1;\n}\n");
    for (let file = 0; file < files; file += 1) {
      const name = `c${String(file).padStart(3, "0")}`;
      const lines = ['import { hot } from "../hot.js";', ""];
      for (let call = 0; call < callsPerFile; call += 1) {
        lines.push(`export function ${name}_${call}(): number {`, `  return hot() + ${call};`, "}", "");
      }
      Workspace.write(root, `src/callers/${name}.ts`, lines.join("\n"));
    }
    Workspace.commit(root);
  }

  static write(root, relative, content) {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }

  static commit(root) {
    const dated = { ...process.env, GIT_AUTHOR_DATE: "2026-09-01T12:00:00Z", GIT_COMMITTER_DATE: "2026-09-01T12:00:00Z" };
    const git = (...args) => execFileSync("git", ["-C", root, ...args], { stdio: "ignore", env: dated });
    git("init", "-q");
    git("add", "-A");
    git("-c", "user.email=rr58@example.invalid", "-c", "user.name=rr58", "commit", "-qm", "fixture");
  }
}

export class StateSnapshot {
  static capture(stateDirectory) {
    const files = [];
    const walk = (directory) => {
      if (!fs.existsSync(directory)) return;
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const full = path.join(directory, entry.name);
        const relative = path.relative(stateDirectory, full);
        if (entry.isDirectory()) {
          files.push({ path: relative + "/", kind: "dir" });
          walk(full);
          continue;
        }
        const stat = fs.statSync(full);
        const record = { path: relative, kind: "file", size: stat.size };
        if (entry.name.endsWith(".json") && stat.size < 200000) {
          try {
            record.json = JSON.parse(fs.readFileSync(full, "utf8"));
          } catch {
            record.text = fs.readFileSync(full, "utf8");
          }
        }
        files.push(record);
      }
    };
    walk(stateDirectory);
    return files;
  }

  static logLines(stateDirectory, fileName) {
    const lines = [];
    const walk = (directory) => {
      if (!fs.existsSync(directory)) return;
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const full = path.join(directory, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name === fileName) {
          for (const line of fs.readFileSync(full, "utf8").split("\n")) {
            if (line.trim() === "") continue;
            try {
              lines.push({ file: path.relative(stateDirectory, full), ...JSON.parse(line) });
            } catch {
              lines.push({ file: path.relative(stateDirectory, full), raw: line });
            }
          }
        }
      }
    };
    walk(stateDirectory);
    return lines;
  }
}

export class Session {
  constructor(name, root) {
    this.name = name;
    this.root = root;
    this.workspace = path.join(root, "ws");
    this.state = path.join(root, "state");
    this.tap = path.join(root, "tap");
    this.home = path.join(root, "home");
    this.steps = [];
    this.tapEnabled = true;
    fs.rmSync(root, { recursive: true, force: true });
    for (const directory of [this.workspace, this.state, this.tap, this.home]) fs.mkdirSync(directory, { recursive: true });
  }

  environment(overrides = {}) {
    const base = { ...process.env };
    delete base.NODE_OPTIONS;
    for (const key of Object.keys(base)) if (key.startsWith("SYMNAV_") || key.startsWith("RR58_")) delete base[key];
    const tapped = this.tapEnabled ? { RR58_TAP_DIR: this.tap, NODE_OPTIONS: tapImport } : {};
    return {
      ...base,
      HOME: this.home,
      SYMNAV_STATE_DIR: this.state,
      ...tapped,
      ...(this.tapEnabled ? this.extraEnv ?? {} : {}),
      ...overrides,
    };
  }

  run(build, argv, options = {}) {
    return new Promise((resolve) => {
      const startedAt = Date.now();
      const child = spawn(process.execPath, [cliPaths[build], ...argv], {
        cwd: options.cwd ?? this.workspace,
        env: this.environment(options.env),
        stdio: ["ignore", "pipe", "pipe"],
      });
      const stdout = [];
      const stderr = [];
      child.stdout.on("data", (chunk) => stdout.push(chunk));
      child.stderr.on("data", (chunk) => stderr.push(chunk));
      child.on("close", (code, signal) => {
        resolve({
          build,
          argv,
          cwd: path.relative(this.root, options.cwd ?? this.workspace) || ".",
          env: options.env ?? {},
          pid: child.pid,
          startedAt,
          endedAt: Date.now(),
          exitCode: code,
          signal,
          stdout: Buffer.concat(stdout).toString("utf8"),
          stderr: Buffer.concat(stderr).toString("utf8"),
        });
      });
    });
  }

  async step(id, title, build, invocations, options = {}) {
    if (options.before) options.before(this);
    const startedAt = Date.now();
    const list = Array.isArray(invocations[0]) ? invocations : [invocations];
    const runs = await Promise.all(list.map((argv) => this.run(build, argv, options)));
    await new Promise((resolve) => setTimeout(resolve, options.settleMs ?? 400));
    const endedAt = Date.now();
    this.steps.push({
      id,
      title,
      build,
      startedAt,
      endedAt,
      runs,
      state: StateSnapshot.capture(this.state),
      daemonLog: StateSnapshot.logLines(this.state, "daemon.log"),
      usage: StateSnapshot.logLines(this.state, "usage.jsonl"),
      edit: options.editLabel,
    });
    process.stderr.write(`[${this.name}] ${id} ${build} ${list.map((argv) => argv.join(" ")).join(" | ")} -> ${runs.map((run) => run.exitCode).join(",")}\n`);
  }

  tapEvents() {
    const events = [];
    if (!fs.existsSync(this.tap)) return events;
    for (const file of fs.readdirSync(this.tap)) {
      for (const line of fs.readFileSync(path.join(this.tap, file), "utf8").split("\n")) {
        if (line.trim() === "") continue;
        try {
          events.push(JSON.parse(line));
        } catch {}
      }
    }
    return events.sort((left, right) => left.t - right.t);
  }

  registryPids() {
    const pids = [];
    for (const record of StateSnapshot.capture(this.state)) {
      if (record.json && typeof record.json.pid === "number" && record.json.instanceId) pids.push(record.json.pid);
    }
    return pids;
  }

  killLeftovers() {
    for (const pid of this.registryPids()) {
      try {
        process.kill(pid, "SIGKILL");
      } catch {}
    }
  }

  save(outputFile, extra = {}) {
    const events = this.tapEvents();
    const payload = { session: this.name, root: this.root, workspace: this.workspace, state: this.state, steps: this.steps, events, ...extra };
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(payload));
    process.stderr.write(`[${this.name}] saved ${outputFile} (${this.steps.length} steps, ${events.length} tap events)\n`);
  }
}

