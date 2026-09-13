#!/usr/bin/env bash
# G5: a startup lock whose stored identityKey disagrees with its directory. #148 base vs head shipped registry. Scratch copies only.
set -euo pipefail
SCRATCH=${SCRATCH:-/tmp/rr08}
HERE=$(cd "$(dirname "$0")" && pwd); OUT=${OUT:-$HERE/../evidence}
probe() {
  local tree=$1 label=$2 ctor=$3
  rsync -a --delete "$SCRATCH/$tree/" "$SCRATCH/regprobe-$label/"
  cat > "$SCRATCH/regprobe-$label/apps/cli/src/daemon/rr08-registry-probe.test.ts" <<TS
import { mkdtempSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { it } from "vitest";
import { DaemonPolicy } from "@symnav/daemon";
import { DaemonRegistry } from "./daemon-registry.js";
import { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
it("probe", () => {
  const state = mkdtempSync(join(tmpdir(), "rr08-reg-"));
  const identity = DaemonWorkspaceIdentity.from("/workspace", state);
  const registry = ${ctor};
  const lease = registry.acquireStartup(identity, "instance-a");
  const ownerPath = identity.startupOwnerPath(identity.lockPath);
  const owner = JSON.parse(readFileSync(ownerPath, "utf8"));
  const results: Record<string, unknown> = { matchingIdentity: { isStartupOwner: registry.isStartupOwner(identity, "instance-a") } };
  writeFileSync(ownerPath, JSON.stringify({ ...owner, identityKey: "foreign-identity-key" }));
  results.foreignIdentity = {
    startupOwnerReturnsOwner: registry.startupOwner(identity) !== undefined,
    isStartupOwner: registry.isStartupOwner(identity, "instance-a"),
    refreshStartupOwner: registry.refreshStartupOwner(identity, "instance-a"),
  };
  appendFileSync(process.env.RR08_LOG!, JSON.stringify({ lease: lease !== undefined, ...results }) + "\n");
});
TS
  rm -f "$OUT/registry-probe-$label.jsonl"
  (cd "$SCRATCH/regprobe-$label/apps/cli" && RR08_LOG="$OUT/registry-probe-$label.jsonl" node ../../node_modules/vitest/vitest.mjs run src/daemon/rr08-registry-probe.test.ts > "$OUT/registry-probe-$label.vitest.txt" 2>&1) || tail -30 "$OUT/registry-probe-$label.vitest.txt"
  echo "== $label"; cat "$OUT/registry-probe-$label.jsonl"
}
probe pr-148-base 148-base "new DaemonRegistry(identity.registryDirectory, DaemonPolicy.currentSystem().values.startup)"
probe pr-148-head 148-head "new DaemonRegistry(identity.registryDirectory, DaemonPolicy.currentSystem().values.startup)"
