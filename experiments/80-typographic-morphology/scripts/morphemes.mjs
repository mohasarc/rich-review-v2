import { git, describeModule, MAIN_SHA, TIP_SHA } from "./lib.mjs";
const snaps = [["main", MAIN_SHA, /^apps\/cli\/src\/daemon\/[^/]+\.ts$/], ["#147", "ba53c8e166", /^apps\/cli\/src\/daemon\/[^/]+\.ts$/], ["#148 cli", "20838f8dbf", /^apps\/cli\/src\/daemon\/[^/]+\.ts$/], ["#148 pkg", "20838f8dbf", /^packages\/daemon\/src\/.+\.ts$/], ["#149 pkg", TIP_SHA, /^packages\/daemon\/src\/.+\.ts$/]];
for (const [label, sha, re] of snaps) {
  const files = git("ls-tree", "-r", "--name-only", sha).split("\n").filter((f) => re.test(f) && !f.endsWith(".test.ts"));
  const base = files.map((f) => f.split("/").pop());
  const withDaemonFile = base.filter((b) => b.includes("daemon"));
  let classes = [];
  for (const f of files) classes.push(...describeModule(git("show", `${sha}:${f}`), f).classes.filter((c) => c.exported).map((c) => c.name));
  const withDaemonClass = classes.filter((c) => c.includes("Daemon"));
  console.log(label.padEnd(9), "prod files", files.length, "| basenames with 'daemon'", withDaemonFile.length, `(${Math.round(100*withDaemonFile.length/files.length)}%)`, "| exported classes", classes.length, "with 'Daemon'", withDaemonClass.length, `(${Math.round(100*withDaemonClass.length/Math.max(1,classes.length))}%)`);
}
