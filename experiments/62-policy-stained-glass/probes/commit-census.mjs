import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const experiment = new URL("..", import.meta.url).pathname;
const worktree = join(experiment, "../../worktrees/pr-131-head");
const commits = [
  "b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",
  "d7c3ceef736d99e7999854918bf838ea96dadb4c",
  "8dca047390daa99cfca5eea55fe109189503f085",
  "5830598f2c751ad58f3ab0fe591f9542772c837a",
  "bb0205972fe1b7c85ab1fe039fc28a1dfc159211",
  "3f673305d9096cc847bdedda44d0de67e8c6727c",
  "b100221db48754656328391b878299c5a0bab443",
];
const archiveRoot = join(tmpdir(), "stained-glass-commits");
const outputDirectory = join(experiment, "evidence/commit-census");
mkdirSync(outputDirectory, { recursive: true });

class CommitSource {
  static materialize(commit) {
    const directory = join(archiveRoot, commit);
    rmSync(directory, { recursive: true, force: true });
    mkdirSync(directory, { recursive: true });
    const archive = execFileSync("git", [
      "-C",
      worktree,
      "archive",
      commit,
      "apps/cli/src",
      "apps/cli/test",
      "packages/core/src",
      "packages/daemon/src",
      "packages/renderer/src",
      "packages/telemetry/src",
      "packages/backend-typescript/src",
      "packages/testing/src",
      "meta-tests/src",
    ], { maxBuffer: 256 * 1024 * 1024 });
    execFileSync("tar", ["-x", "-C", directory], { input: archive });
    return directory;
  }
}

const summary = [];
for (const commit of commits) {
  const directory = CommitSource.materialize(commit);
  const output = join(outputDirectory, `${commit.slice(0, 9)}.json`);
  execFileSync("node", [join(experiment, "probes/leaf-census.mjs"), worktree, output, directory], {
    env: { ...process.env, CENSUS_COMMIT: commit },
    stdio: ["ignore", "ignore", "inherit"],
  });
  const subject = execFileSync("git", ["-C", worktree, "log", "-1", "--format=%s", commit]).toString().trim();
  summary.push({ commit, subject, census: `evidence/commit-census/${commit.slice(0, 9)}.json` });
  console.log(commit.slice(0, 9), subject);
}
writeFileSync(join(outputDirectory, "index.json"), JSON.stringify({ archiveRoot, commits: summary }, null, 1));
