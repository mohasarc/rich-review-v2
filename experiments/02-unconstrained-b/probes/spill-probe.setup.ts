import { appendFileSync } from "node:fs";

const root = process.env.RR_ROOT!;
const label = process.env.RR_LABEL ?? "unlabelled";
const outFile = process.env.RR_OUT!;

const commandOutputModule = await import(`${root}/src/command-execution-result.ts`);
const completionSpoolModule = await import(`${root}/src/daemon/completion-spool.ts`);

interface Observation {
  clientSpills: number;
  clientStoredRecords: number;
  clientInlineCapacities: Set<number>;
  daemonSpills: number;
  daemonAppendedRecords: number;
  daemonInlineCapacities: Set<number>;
}

let current: Observation = fresh();

function fresh(): Observation {
  return {
    clientSpills: 0,
    clientStoredRecords: 0,
    clientInlineCapacities: new Set(),
    daemonSpills: 0,
    daemonAppendedRecords: 0,
    daemonInlineCapacities: new Set(),
  };
}

const clientPrototype = commandOutputModule.OrderedCommandOutput.prototype;
const originalClientSpill = clientPrototype.spillInlineRecords;
clientPrototype.spillInlineRecords = function (...args: unknown[]) {
  current.clientSpills += 1;
  return originalClientSpill.apply(this, args);
};
const originalClientStore = clientPrototype.storeRecord;
clientPrototype.storeRecord = function (...args: unknown[]) {
  current.clientStoredRecords += 1;
  current.clientInlineCapacities.add(this.inlineBytes);
  return originalClientStore.apply(this, args);
};

const spoolPrototype = completionSpoolModule.CompletionSpool.prototype;
const originalSpoolSpill = spoolPrototype.spillInlineRecords;
spoolPrototype.spillInlineRecords = function (...args: unknown[]) {
  current.daemonSpills += 1;
  return originalSpoolSpill.apply(this, args);
};
const originalSpoolAppend = spoolPrototype.append;
spoolPrototype.append = function (...args: unknown[]) {
  current.daemonAppendedRecords += 1;
  current.daemonInlineCapacities.add(this.options.inlineBytes);
  return originalSpoolAppend.apply(this, args);
};

beforeEach(() => {
  current = fresh();
});

afterEach((context) => {
  const test = context.task;
  appendFileSync(
    outFile,
    JSON.stringify({
      label,
      file: test.file?.name,
      test: test.name,
      state: test.result?.state,
      clientSpills: current.clientSpills,
      clientStoredRecords: current.clientStoredRecords,
      clientInlineCapacities: [...current.clientInlineCapacities],
      daemonSpills: current.daemonSpills,
      daemonAppendedRecords: current.daemonAppendedRecords,
      daemonInlineCapacities: [...current.daemonInlineCapacities],
    }) + "\n",
  );
});
