#!/usr/bin/env python3
"""Rerun the retained PR 131 probes. Requires existing builds and installed Vitest in both trees."""
from pathlib import Path
import os
import subprocess

HERE = Path(__file__).resolve().parent
EXPERIMENT = HERE.parent
ROOT = EXPERIMENT.parent.parent
TREES = {side: ROOT / "worktrees" / ("pr-131-" + side) for side in ("base", "head")}
OUT = HERE / "out"
OUT.mkdir(exist_ok=True)

for side, tree in TREES.items():
    print("Recording reattachment behavior:", side, flush=True)
    with (OUT / ("reattach-" + side + ".jsonl")).open("w") as output:
        subprocess.run(["node", str(HERE / "reattach-differential.mjs"), str(tree), side],
                       stdout=output, check=True)
    print("Recording storage paths:", side, flush=True)
    observation = OUT / ("spill-" + side + ".jsonl")
    observation.write_text("")
    environment = dict(os.environ, RR_ROOT=str(tree / "apps/cli"), RR_LABEL=side,
                       RR_OUT=str(observation),
                       RR_INCLUDE="src/daemon/local-daemon-transport-execution.test.ts,src/daemon/completion-spool.test.ts")
    with (EXPERIMENT / "checks" / ("spill-" + side + ".txt")).open("w") as output:
        subprocess.run([str(tree / "node_modules/.bin/vitest"), "run", "--config",
                        str(HERE / "spill-probe.config.mjs")],
                       cwd=tree / "apps/cli", env=environment, stdout=output,
                       stderr=subprocess.STDOUT, check=True)
print("Comparing memory recipes", flush=True)
with (OUT / "memory.json").open("w") as output:
    subprocess.run(["node", str(HERE / "memory-recipe-differential.mjs"),
                    str(TREES["base"]), str(TREES["head"])], stdout=output, check=True)
print("Checking source citations", flush=True)
with (EXPERIMENT / "checks/citations.json").open("w") as output:
    subprocess.run(["node", str(HERE / "verify-ledger.mjs"),
                    str(EXPERIMENT / "data/ledger.json"), str(TREES["base"]), str(TREES["head"])],
                   stdout=output, check=True)
print("Probe outputs refreshed. Rebuild the page with python3 build.py.", flush=True)
