const root = process.env.RR_ROOT;
if (!root) throw new Error("RR_ROOT must point at <worktree>/apps/cli");

export default {
  root,
  test: {
    globals: true,
    include: (process.env.RR_INCLUDE ?? "").split(",").filter(Boolean),
    setupFiles: [new URL("./spill-probe.setup.ts", import.meta.url).pathname],
    fileParallelism: false,
    passWithNoTests: false,
    reporters: ["default"],
  },
};
