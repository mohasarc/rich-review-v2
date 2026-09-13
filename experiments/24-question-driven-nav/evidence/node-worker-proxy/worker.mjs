import { parentPort } from "node:worker_threads";
async function projectRelease() { throw new Error("project release failed"); }
async function backendRelease() { projectRelease(); }
await backendRelease();
parentPort.postMessage({ kind: "heap" });
