import { Worker } from "node:worker_threads";
const w = new Worker(new URL("./worker.mjs", import.meta.url));
w.on("message", (m) => console.log("parent got message", JSON.stringify(m)));
w.once("error", (e) => console.log("parent got worker error:", e.message));
w.once("exit", (code) => console.log("worker exit code", code));
