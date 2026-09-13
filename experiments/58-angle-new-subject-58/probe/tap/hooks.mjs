import fs from "node:fs";
import { performance } from "node:perf_hooks";

let context = undefined;

export async function initialize(data) {
  context = data;
}

export async function resolve(specifier, resolveContext, nextResolve) {
  const result = await nextResolve(specifier, resolveContext);
  if (context && result.url.startsWith("file:") && !result.url.includes("/probe/tap/")) {
    fs.appendFileSync(
      context.file,
      JSON.stringify({
        t: performance.timeOrigin + performance.now(),
        pid: context.pid,
        tid: context.tid,
        kind: "module",
        url: result.url,
        parent: resolveContext.parentURL,
      }) + "\n",
    );
  }
  return result;
}
