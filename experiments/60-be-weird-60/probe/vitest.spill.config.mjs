export default {
  test: {
    globals: true,
    fileParallelism: false,
    include: ["src/**/*.test.ts", "test/**/*.test.ts"],
    setupFiles: [new URL("./spill-counter.setup.mjs", import.meta.url).pathname],
  },
};
