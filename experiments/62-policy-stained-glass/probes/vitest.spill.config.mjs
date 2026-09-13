const cliRoot = process.env.SPILL_CLI_ROOT;

export default {
  root: cliRoot,
  test: {
    include: [
      "src/daemon/local-daemon-transport-execution.test.ts",
      "src/daemon/workspace-daemon-requests.test.ts",
      "src/daemon/completion-spool.test.ts",
      "src/cli-program-executor.test.ts",
    ],
    fileParallelism: false,
    passWithNoTests: false,
    setupFiles: [new URL("./spill-spy.setup.mjs", import.meta.url).pathname],
  },
};
