import { AsyncLocalStorage, createHook, executionAsyncId } from "node:async_hooks";
import { inspect } from "node:util";
import { promiseHooks } from "node:v8";
import { threadId } from "node:worker_threads";

export const STORE_LANES = [
  "definitionsByIdentity",
  "referencesByIdentity",
  "callTargetsByIdentity",
  "callersByIdentity",
  "calleesByIdentity",
  "definitionsByPosition",
];

export function messageOf(error) {
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
}

export function promiseState(promise) {
  const text = inspect(promise, { depth: 0, breakLength: Infinity });
  if (text.includes("<pending>")) return "pending";
  if (text.includes("<rejected>")) return "rejected";
  return "fulfilled";
}

function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}

export class ScoreRecorder {
  constructor({ counter, thread = "main", sink } = {}) {
    this.events = [];
    this.calls = [];
    this.promises = [];
    this.promiseRecords = new WeakMap();
    this.context = new AsyncLocalStorage();
    this.counter = counter;
    this.localSequence = 0;
    this.thread = thread;
    this.sink = sink;
    this.asyncHook = createHook({ init() {} }).enable();
    this.settledHook = promiseHooks.onSettled((promise) => this.promiseSettled(promise));
  }

  nextSequence() {
    if (this.counter) return Atomics.add(this.counter, 0, 1) + 1;
    this.localSequence += 1;
    return this.localSequence;
  }

  emit(event) {
    const enclosing = this.context.getStore();
    const recorded = {
      seq: this.nextSequence(),
      job: executionAsyncId(),
      thread: this.thread,
      threadId,
      enclosingCallId: enclosing?.id,
      ...event,
    };
    this.events.push(recorded);
    this.sink?.(recorded);
    return recorded;
  }

  runCall(info, body, receiver, args = []) {
    const parent = this.context.getStore();
    const call = { id: `${this.thread}:${this.calls.length + 1}`, parentId: parent?.id, ...info };
    this.calls.push(call);
    call.startSeq = this.emit({ ...info, kind: "call", callId: call.id, parentId: call.parentId }).seq;
    let result;
    try {
      result = this.context.run(call, () => body.apply(receiver, args));
    } catch (error) {
      const thrown = this.emit({
        ...info,
        kind: "throw",
        callId: call.id,
        parentId: call.parentId,
        detail: messageOf(error),
      });
      call.endSeq = thrown.seq;
      call.outcome = "threw";
      throw error;
    }
    if (isThenable(result)) {
      this.watchReturnedPromise(call, info, result);
    } else {
      const returned = this.emit({ ...info, kind: "return", callId: call.id, parentId: call.parentId });
      call.endSeq = returned.seq;
      call.outcome = "returned";
    }
    return result;
  }

  wrapMethod(target, methodName, describe) {
    const original = target[methodName];
    if (typeof original !== "function") throw new Error(`cannot wrap ${methodName}`);
    if (original.musicBoxWrapped) return;
    const recorder = this;
    const wrapped = function (...args) {
      const info = describe.call(this, args);
      if (!info) return original.apply(this, args);
      return recorder.runCall(info, original, this, args);
    };
    wrapped.musicBoxWrapped = true;
    wrapped.musicBoxOriginal = original;
    target[methodName] = wrapped;
  }

  watchReturnedPromise(call, info, promise) {
    let record = this.promiseRecords.get(promise);
    const stateAtReturn = promiseState(promise);
    if (!record) {
      record = {
        id: `${this.thread}:p${this.promises.length + 1}`,
        callId: call.id,
        track: info.track,
        lane: info.lane,
        label: info.label,
        promise,
      };
      this.promiseRecords.set(promise, record);
      this.promises.push(record);
      if (stateAtReturn !== "pending") {
        const settled = this.emit({
          ...info,
          kind: "settle",
          callId: call.id,
          parentId: call.parentId,
          promiseId: record.id,
          outcome: stateAtReturn,
          settledBeforeReturn: true,
        });
        record.settleSeq = settled.seq;
        record.settleEvent = settled;
      }
    }
    const returned = this.emit({
      ...info,
      kind: "return-promise",
      callId: call.id,
      parentId: call.parentId,
      promiseId: record.id,
      promiseOwnerCallId: record.callId,
      promiseStateAtReturn: stateAtReturn,
    });
    call.endSeq = returned.seq;
    call.promiseId = record.id;
  }

  promiseSettled(promise) {
    const record = this.promiseRecords.get(promise);
    if (!record || record.settleSeq !== undefined) return;
    const call = this.calls.find((candidate) => candidate.id === record.callId);
    const settled = this.emit({
      track: record.track,
      lane: record.lane,
      label: record.label,
      kind: "settle",
      callId: record.callId,
      parentId: call?.parentId,
      promiseId: record.id,
    });
    record.settleSeq = settled.seq;
    record.settleEvent = settled;
    if (this.sink) {
      queueMicrotask(() => {
        settled.outcome = promiseState(promise);
        this.sink({ patch: "outcome", thread: this.thread, seq: settled.seq, outcome: settled.outcome });
      });
    }
  }

  finalize() {
    this.settledHook();
    for (const record of this.promises) {
      const state = promiseState(record.promise);
      record.outcome = state;
      if (record.settleEvent) record.settleEvent.outcome = state;
    }
    for (const call of this.calls) {
      if (call.promiseId) {
        const record = this.promises.find((candidate) => candidate.id === call.promiseId);
        call.outcome = record?.outcome;
        call.settleSeq = record?.settleSeq;
      }
    }
    return {
      events: this.events,
      calls: this.calls,
      promises: this.promises.map(({ promise, settleEvent, ...rest }) => rest),
    };
  }

  instrumentStoreMap(map, lane, style) {
    const recorder = this;
    const describe = (label, detail, extra = {}) => ({ track: "stores", lane, label, detail, ...extra });
    if (style === "maps") {
      map.get = function (key) {
        const value = Map.prototype.get.call(this, key);
        recorder.emit({ ...describe("get", key, { lookup: value ? "hit" : "miss" }), kind: "lookup" });
        return value;
      };
    } else {
      map.has = function (key) {
        const present = Map.prototype.has.call(this, key);
        recorder.emit({ ...describe("has", key, { lookup: present ? "hit" : "miss" }), kind: "lookup" });
        return present;
      };
    }
    map.set = function (key, value) {
      recorder.emit({ ...describe("set", key), kind: "store" });
      return Map.prototype.set.call(this, key, value);
    };
    map.clear = function () {
      recorder.emit({ ...describe("clear", `${this.size} entries`, { size: this.size }), kind: "clear" });
      return Map.prototype.clear.call(this);
    };
  }
}
