import { appendFileSync } from "node:fs";

const root = process.env.RR_ROOT;
if (!root) throw new Error("RR_ROOT must point at <worktree>/apps/cli");
const mutant = process.env.RR_MUTANT ? JSON.parse(process.env.RR_MUTANT) : undefined;
const applicationLog = process.env.RR_APPLICATION_LOG;

const mutationPlugin = {
  name: "rr-policy-mutation",
  enforce: "pre",
  transform(code, id) {
    if (mutant === undefined) return undefined;
    let mutated = code;
    for (const edit of mutant.edits) {
      if (!id.endsWith(edit.file)) continue;
      const pattern = new RegExp(edit.pattern, "g");
      const matches = mutated.match(pattern)?.length ?? 0;
      mutated = mutated.replace(pattern, edit.replacement);
      if (applicationLog) {
        appendFileSync(
          applicationLog,
          JSON.stringify({ mutant: mutant.id, file: edit.file, pattern: edit.pattern, matches }) + "\n",
        );
      }
    }
    return mutated === code ? undefined : { code: mutated, map: null };
  },
};

export default {
  root,
  plugins: [mutationPlugin],
  test: {
    include: ["src/**/*.test.ts", "test/integration/**/*.test.ts", "test/helpers/**/*.test.ts"],
    fileParallelism: false,
    passWithNoTests: false,
  },
};
