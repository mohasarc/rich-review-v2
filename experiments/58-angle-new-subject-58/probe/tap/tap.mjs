import { register, syncBuiltinESMExports } from "node:module";
import fs from "node:fs";
import net from "node:net";
import childProcess from "node:child_process";
import workerThreads from "node:worker_threads";
import { performance } from "node:perf_hooks";

const tapDirectory = process.env.RR58_TAP_DIR;

class Tap {
  static file = "";
  static socketIds = new WeakMap();
  static nextSocketId = 1;
  static byteLimit = Number(process.env.RR58_TAP_BYTE_LIMIT ?? 4096);

  static now() {
    return performance.timeOrigin + performance.now();
  }

  static stackKinds = new Set(["socket-out", "socket-connect", "worker-message-out", "worker-message-up", "spawn", "server-listen", "socket-destroy", "fs"]);
  static stacksEnabled = process.env.RR58_TAP_STACKS === "1";

  static stack() {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 40;
    const lines = (new Error().stack ?? "").split("\n").slice(1);
    Error.stackTraceLimit = limit;
    return lines
      .map((line) => line.trim())
      .filter((line) => !line.includes("/probe/tap/") && !line.includes("node:internal"))
      .slice(0, 24);
  }

  static write(event) {
    const record = { t: Tap.now(), pid: process.pid, tid: workerThreads.threadId, ...event };
    if (Tap.stacksEnabled && Tap.stackKinds.has(event.kind)) record.stack = Tap.stack();
    fs.appendFileSync(Tap.file, JSON.stringify(record) + "\n");
  }

  static bytes(chunk) {
    if (chunk === undefined || chunk === null) return { length: 0 };
    const buffer = typeof chunk === "string" ? Buffer.from(chunk) : Buffer.from(chunk.buffer ?? chunk, chunk.byteOffset ?? 0, chunk.byteLength ?? chunk.length);
    const kept = buffer.subarray(0, Tap.byteLimit);
    return { length: buffer.length, base64: kept.toString("base64"), truncated: buffer.length > kept.length };
  }

  static socketId(socket) {
    let id = Tap.socketIds.get(socket);
    if (id === undefined) {
      id = `${process.pid}.${workerThreads.threadId}.${Tap.nextSocketId++}`;
      Tap.socketIds.set(socket, id);
    }
    return id;
  }

  static socketPath(socket) {
    try {
      if (socket.server && typeof socket.server.address === "function") {
        return { side: "server", path: socket.server.address() };
      }
    } catch {}
    return { side: "client", path: socket.rr58ConnectPath };
  }

  static cloneable(value, depth = 0) {
    if (depth > 12) return "[depth]";
    if (value === null || typeof value !== "object") return value;
    if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
      const view = value instanceof ArrayBuffer ? new Uint8Array(value) : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      return { "@bytes": view.byteLength, text: Buffer.from(view.subarray(0, 512)).toString("utf8") };
    }
    if (Array.isArray(value)) return value.map((item) => Tap.cloneable(item, depth + 1));
    const copy = {};
    for (const [key, item] of Object.entries(value)) copy[key] = Tap.cloneable(item, depth + 1);
    return copy;
  }

  static installModuleHooks() {
    register("./hooks.mjs", import.meta.url, {
      data: { file: Tap.file, pid: process.pid, tid: workerThreads.threadId },
    });
  }

  static installSockets() {
    const originalConnect = net.Socket.prototype.connect;
    net.Socket.prototype.connect = function (...args) {
      const first = args[0];
      const path = Array.isArray(first) ? first[0]?.path : typeof first === "object" ? first?.path : first;
      if (typeof path === "string") this.rr58ConnectPath = path;
      Tap.write({ kind: "socket-connect", socket: Tap.socketId(this), path });
      return originalConnect.apply(this, args);
    };
    const serverCutTrigger = `${tapDirectory}/cut-server-once`;
    const outboundBytes = new WeakMap();
    const maybeCutServer = (socket, length) => {
      if (Tap.socketPath(socket).side !== "server") return false;
      const total = (outboundBytes.get(socket) ?? 0) + length;
      outboundBytes.set(socket, total);
      let threshold;
      try {
        threshold = Number(fs.readFileSync(serverCutTrigger, "utf8"));
      } catch {
        return false;
      }
      if (!(total >= threshold)) return false;
      try {
        fs.unlinkSync(serverCutTrigger);
      } catch {
        return false;
      }
      Tap.write({ kind: "fault-server-drop", socket: Tap.socketId(socket), outboundBytes: total });
      setImmediate(() => socket.destroy());
      return true;
    };
    const originalWrite = net.Socket.prototype._write;
    net.Socket.prototype._write = function (data, encoding, callback) {
      Tap.write({ kind: "socket-out", socket: Tap.socketId(this), ...Tap.socketPath(this), ...Tap.bytes(data) });
      maybeCutServer(this, data?.length ?? 0);
      return originalWrite.call(this, data, encoding, callback);
    };
    const originalWritev = net.Socket.prototype._writev;
    net.Socket.prototype._writev = function (chunks, callback) {
      for (const entry of chunks) {
        Tap.write({ kind: "socket-out", socket: Tap.socketId(this), ...Tap.socketPath(this), ...Tap.bytes(entry.chunk) });
        maybeCutServer(this, entry.chunk?.length ?? 0);
      }
      return originalWritev.call(this, chunks, callback);
    };
    const originalPush = net.Socket.prototype.push;
    const cutAfterBytes = Number(process.env.RR58_FAULT_CUT_AFTER_BYTES ?? 0);
    let inboundBytes = 0;
    let cutDone = false;
    net.Socket.prototype.push = function (chunk, encoding) {
      if (chunk !== null) {
        Tap.write({ kind: "socket-in", socket: Tap.socketId(this), ...Tap.socketPath(this), ...Tap.bytes(chunk) });
        inboundBytes += chunk.length;
        if (cutAfterBytes > 0 && !cutDone && inboundBytes >= cutAfterBytes && Tap.socketPath(this).side === "client") {
          cutDone = true;
          Tap.write({ kind: "fault-cut", socket: Tap.socketId(this), inboundBytes });
          const socket = this;
          setImmediate(() => socket.destroy());
          return originalPush.call(this, chunk, encoding);
        }
      } else {
        Tap.write({ kind: "socket-eof", socket: Tap.socketId(this), ...Tap.socketPath(this) });
      }
      return originalPush.call(this, chunk, encoding);
    };
    const originalDestroy = net.Socket.prototype.destroy;
    net.Socket.prototype.destroy = function (error) {
      Tap.write({ kind: "socket-destroy", socket: Tap.socketId(this), ...Tap.socketPath(this), error: error?.code ?? error?.message });
      return originalDestroy.call(this, error);
    };
    const originalListen = net.Server.prototype.listen;
    net.Server.prototype.listen = function (...args) {
      const first = args[0];
      Tap.write({ kind: "server-listen", path: typeof first === "object" ? first?.path : first });
      return originalListen.apply(this, args);
    };
  }

  static installWorkers() {
    const originalPost = workerThreads.Worker.prototype.postMessage;
    workerThreads.Worker.prototype.postMessage = function (value, transfer) {
      const loaderMessage = value !== null && typeof value === "object" && "method" in value && "port" in value;
      if (!loaderMessage) Tap.write({ kind: "worker-message-out", to: this.threadId, message: Tap.cloneable(value) });
      return originalPost.call(this, value, transfer);
    };
    if (!workerThreads.isMainThread && workerThreads.parentPort) {
      const port = workerThreads.parentPort;
      const originalPortPost = port.postMessage.bind(port);
      port.postMessage = (value, transfer) => {
        Tap.write({ kind: "worker-message-up", message: Tap.cloneable(value) });
        return originalPortPost(value, transfer);
      };
    }
  }

  static installSpawn() {
    const originalSpawn = childProcess.spawn;
    childProcess.spawn = function (command, args, options) {
      Tap.write({
        kind: "spawn",
        command,
        args,
        cwd: options?.cwd,
        detached: options?.detached,
        stdio: options?.stdio,
        envSymnav: Object.fromEntries(Object.entries(options?.env ?? {}).filter(([key]) => key.startsWith("SYMNAV_"))),
      });
      return originalSpawn.call(this, command, args, options);
    };
    syncBuiltinESMExports();
  }

  static installFileWatch() {
    const prefixes = (process.env.RR58_WATCH_PREFIX ?? "").split(",").filter(Boolean);
    if (prefixes.length === 0) return;
    const watched = (target) => {
      const text = typeof target === "string" ? target : target instanceof URL ? target.pathname : Buffer.isBuffer(target) ? target.toString() : "";
      return prefixes.some((prefix) => text.startsWith(prefix)) ? text : undefined;
    };
    const wrap = (owner, name, label) => {
      const original = owner[name];
      if (typeof original !== "function") return;
      const wrapper = function (target, ...rest) {
        const file = watched(target);
        if (file !== undefined) Tap.write({ kind: "fs", op: label, file });
        return original.call(this, target, ...rest);
      };
      Object.assign(wrapper, original);
      owner[name] = wrapper;
    };
    for (const name of ["readFileSync", "statSync", "lstatSync", "existsSync", "readdirSync", "openSync", "realpathSync"]) wrap(fs, name, name);
    for (const name of ["readFile", "stat", "lstat", "readdir", "open", "realpath"]) wrap(fs, name, name);
    for (const name of ["readFile", "stat", "lstat", "readdir", "open", "realpath"]) wrap(fs.promises, name, `promises.${name}`);
    syncBuiltinESMExports();
  }

  static async installCommonJsWatch() {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Module = require("node:module");
    const originalLoad = Module._load;
    const seen = new Set();
    Module._load = function (request, parent, isMain) {
      const result = originalLoad.call(this, request, parent, isMain);
      try {
        const resolved = Module._resolveFilename(request, parent, isMain);
        if (!seen.has(resolved) && resolved.startsWith("/")) {
          seen.add(resolved);
          Tap.write({ kind: "module-cjs", url: `file://${resolved}` });
        }
      } catch {}
      return result;
    };
  }

  static install() {
    fs.mkdirSync(tapDirectory, { recursive: true });
    Tap.file = `${tapDirectory}/${process.pid}-${workerThreads.threadId}.jsonl`;
    Tap.write({
      kind: "thread-start",
      argv: process.argv.map((value) => (value.length > 200 ? `${value.slice(0, 40)}…(${value.length})` : value)),
      isMainThread: workerThreads.isMainThread,
      workerData: workerThreads.isMainThread ? undefined : Tap.cloneable(workerThreads.workerData),
      resourceLimits: workerThreads.isMainThread ? undefined : workerThreads.resourceLimits,
      execArgv: process.execArgv,
    });
    process.on("exit", (code) => Tap.write({ kind: "thread-exit", code }));
    Tap.installModuleHooks();
    Tap.installSockets();
    Tap.installWorkers();
    Tap.installSpawn();
    Tap.installFileWatch();
    return Tap.installCommonJsWatch();
  }
}

if (tapDirectory) await Tap.install();
