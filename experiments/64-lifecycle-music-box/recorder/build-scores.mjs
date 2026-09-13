import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { BUILD_LABELS, DECISIONS, NOT_PLAYED, SCORES, TESTS } from "./content.mjs";
import { STORE_LANES } from "./score-recorder.mjs";

const experimentDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const worktrees = resolve(experimentDirectory, "../../worktrees");
const traceDirectory = join(experimentDirectory, "evidence/traces");
const worktreeByBuild = { main: "main", base: "pr-127-base", head: "pr-127-head" };

const PACKAGE = { cli: "apps/cli", ts: "backend-typescript", core: "core", node: "node", probe: "probe" };

const TRACKS = [
  { id: "parent", name: "daemon side", owner: () => "NodeDaemonNavigationWorker", pkg: () => PACKAGE.cli },
  { id: "worker", name: "worker thread", owner: () => "worker entry message queue", pkg: () => PACKAGE.cli },
  { id: "caller", name: "caller", owner: () => "probe standing in for the worker entry", pkg: () => PACKAGE.probe },
  { id: "backend", name: "backend", owner: () => "TypeScriptBackend", pkg: () => PACKAGE.ts },
  {
    id: "collaborators",
    name: "refresh steps",
    owner: (build) => (build === "main" ? "source cache, workspace state" : "source cache (core), workspace state"),
    pkg: () => PACKAGE.ts,
    lanes: ["sourceCache", "workspaceState"],
  },
  { id: "service", name: "query service", owner: () => "TypeScriptSemanticQueryService", pkg: () => PACKAGE.ts },
  { id: "scope", name: "cache scope", owner: () => "TurnScopedCacheScope", pkg: () => PACKAGE.core, onlyBuilds: ["head"] },
  {
    id: "stores",
    name: "six caches",
    owner: (build) => (build === "head" ? "six TurnScopedCacheHandle Maps" : "six private Maps on the service"),
    pkg: (build) => (build === "head" ? PACKAGE.core : PACKAGE.ts),
    lanes: STORE_LANES,
  },
  {
    id: "graph",
    name: "project graph",
    owner: (build) => (build === "main" ? "TypeScriptProjectGraph" : "ProjectGraph (core base of TypeScriptProjectGraph)"),
    pkg: (build) => (build === "main" ? PACKAGE.ts : PACKAGE.core),
  },
  { id: "projects", name: "projects", owner: () => "TypeScriptSemanticProject", pkg: () => PACKAGE.ts, lanes: ["configured 1", "inferred"] },
  { id: "runtime", name: "Node runtime", owner: () => "process / worker thread", pkg: () => PACKAGE.node },
];
const trackIndex = Object.fromEntries(TRACKS.map((track, index) => [track.id, index]));

const readTrace = (name) => JSON.parse(readFileSync(join(traceDirectory, `${name}.json`), "utf8"));

const HIDDEN_MARKS = [/^probe loaded/, /^still running after/];
const EXPECTED_SENDS = {
  initialize: ["ready", "failed"],
  execute: ["result", "failed"],
  "release-transient": ["heap", "failed"],
  close: ["closed", "failed"],
};
const PARENT_LABEL_FOR = {
  initialize: "worker.start",
  execute: "worker.execute",
  "release-transient": "worker.releaseTransientResources",
};

function reconstructCalls(events) {
  const calls = new Map();
  const promises = new Map();
  for (const event of events) {
    if (event.kind === "call") {
      calls.set(event.callId, {
        id: event.callId,
        track: event.track,
        lane: event.lane,
        label: event.label,
        detail: event.detail,
        parentId: event.parentId,
        thread: event.thread,
        startSeq: event.seq,
        children: [],
      });
    } else if (event.kind === "return" || event.kind === "throw") {
      const call = calls.get(event.callId);
      call.endSeq = event.seq;
      call.endKind = event.kind;
      if (event.kind === "throw") call.error = event.detail;
    } else if (event.kind === "return-promise") {
      const call = calls.get(event.callId);
      call.endSeq = event.seq;
      call.promiseId = event.promiseId;
      if (event.promiseOwnerCallId !== event.callId) call.sharesPromiseOf = event.promiseOwnerCallId;
    } else if (event.kind === "settle") {
      promises.set(event.promiseId, { settleSeq: event.seq, outcome: event.outcome, ownerCallId: event.callId });
    }
  }
  for (const call of calls.values()) {
    if (call.promiseId) {
      const promise = promises.get(call.promiseId);
      call.completionSeq = promise?.settleSeq;
      call.outcome = promise?.outcome ?? "pending";
    } else if (call.endKind === "throw") {
      call.completionSeq = call.endSeq;
      call.outcome = "threw";
    } else {
      call.completionSeq = call.endSeq;
      call.outcome = "returned";
    }
  }
  for (const event of events) {
    if (event.kind === "reply" && event.enclosingCallId && calls.has(event.enclosingCallId)) {
      const call = calls.get(event.enclosingCallId);
      call.replySeq = event.seq;
      call.replyOutcome = event.outcome;
    }
  }
  addWorkerEntryCalls(events, calls);
  for (const call of calls.values()) {
    if (call.parentId && calls.has(call.parentId)) calls.get(call.parentId).children.push(call.id);
  }
  return { calls, promises };
}

function addWorkerEntryCalls(events, calls) {
  const claimedSends = new Set();
  for (const receive of events.filter((event) => event.kind === "receive")) {
    const messageKind = receive.label.replace(/^receives /, "");
    const expected = EXPECTED_SENDS[messageKind] ?? [];
    const send = events.find(
      (event) =>
        event.kind === "send" &&
        event.seq > receive.seq &&
        !claimedSends.has(event.seq) &&
        expected.includes(event.label.replace(/^sends /, "")),
    );
    if (send) claimedSends.add(send.seq);
    const id = `worker:entry:${receive.seq}`;
    const entry = {
      id,
      track: "worker",
      label: `handles ${messageKind}`,
      thread: "worker",
      startSeq: receive.seq,
      completionSeq: send?.seq,
      replySeq: send?.seq,
      outcome: send ? (send.label.includes("failed") ? "replied failed" : "replied") : "pending",
      synthetic: true,
      children: [],
    };
    for (const call of calls.values()) {
      if (call.synthetic || call.thread !== "worker" || call.parentId) continue;
      if (call.startSeq > receive.seq && (!send || call.startSeq < send.seq)) call.parentId = id;
    }
    const parentPrefix = PARENT_LABEL_FOR[messageKind];
    const parentCall = [...calls.values()]
      .filter((call) => call.thread === "parent" && call.startSeq < receive.seq && parentPrefix && call.label.startsWith(parentPrefix))
      .pop();
    if (parentCall) entry.parentId = parentCall.id;
    calls.set(id, entry);
    const firstChild = [...calls.values()]
      .filter((call) => call.parentId === id)
      .sort((left, right) => left.startSeq - right.startSeq)[0];
    entry.activeSeq = firstChild?.startSeq;
  }
}

function descendantsOf(call, calls) {
  return call.children.flatMap((childId) => {
    const child = calls.get(childId);
    return [child, ...descendantsOf(child, calls)];
  });
}

function analyzeCompletion(calls) {
  for (const call of calls.values()) {
    const completion = call.replySeq ?? call.completionSeq;
    if (completion === undefined) continue;
    const open = descendantsOf(call, calls).filter(
      (descendant) => descendant.startSeq < completion && (descendant.completionSeq === undefined || descendant.completionSeq > completion),
    );
    if (open.length) call.clash = { atSeq: completion, open: open.map((descendant) => descendant.id) };
  }
  for (const call of calls.values()) {
    if (!["rejected", "threw"].includes(call.outcome)) continue;
    const parent = calls.get(call.parentId);
    if (!parent || parent.synthetic || parent.track === "caller") continue;
    if (["fulfilled", "returned"].includes(parent.outcome)) call.swallowedBy = parent.id;
  }
}

function isVisible(event, calls) {
  if (event.kind === "return-promise") return false;
  if (event.kind === "mark" && HIDDEN_MARKS.some((pattern) => pattern.test(event.label))) return false;
  if (event.kind === "return") {
    const call = calls.get(event.callId);
    return descendantsOf(call, calls).some((descendant) => descendant.promiseId || descendant.synthetic);
  }
  return true;
}

function trackOfCall(calls, callId) {
  return callId ? calls.get(callId)?.track : undefined;
}

function boundaryOf(event, calls, runtimeLinks) {
  const pair = (...tracks) => [...new Set(tracks.filter(Boolean))].sort((left, right) => trackIndex[left] - trackIndex[right]).join("|");
  switch (event.kind) {
    case "call":
    case "return":
    case "throw":
    case "settle": {
      const call = calls.get(event.callId);
      return pair(event.track, trackOfCall(calls, call?.parentId));
    }
    case "clear":
    case "lookup":
    case "store":
      return pair("stores", trackOfCall(calls, event.enclosingCallId));
    case "observer":
      return pair(event.track, trackOfCall(calls, event.enclosingCallId));
    case "send":
    case "receive":
      return pair("parent", "worker");
    case "unhandled":
    case "uncaught":
      return pair("runtime", runtimeLinks.get(event.seq)?.track);
    case "worker-error":
    case "worker-exit":
    case "exited":
      return pair("parent", "worker");
    default:
      return pair(event.track);
  }
}

function ownerName(build, trackId) {
  return TRACKS[trackIndex[trackId]].owner(build);
}

function captionFor(column, build, calls) {
  const owner = ownerName(build, column.track);
  const lanePart = column.lane ? ` · ${column.lane}` : "";
  switch (column.kind) {
    case "call":
      return `${owner}${lanePart}: ${column.label} starts`;
    case "return": {
      const call = calls.get(column.callId);
      const clash = call.clash ? ` while ${call.clash.open.map((id) => calls.get(id).label).join(", ")} still pending` : "";
      return `${owner}: ${column.label} returns${clash}`;
    }
    case "throw":
      return `${owner}${lanePart}: ${column.label} throws (${column.detail})`;
    case "settle": {
      const call = calls.get(column.callId);
      const clash = call?.clash ? ` while ${call.clash.open.map((id) => calls.get(id).label).join(", ")} still pending` : "";
      const swallowed = call?.swallowedBy ? `; ${calls.get(call.swallowedBy).label} does not await it` : "";
      return `${owner}${lanePart}: ${column.label} settles ${column.outcome}${clash}${swallowed}`;
    }
    case "clear": {
      const filled = column.chord.filter((note) => note.size > 0).map((note) => `${note.lane} (${note.size})`);
      return `six caches cleared together${filled.length ? `; held entries: ${filled.join(", ")}` : "; all were empty"}`;
    }
    case "lookup":
      return `${column.lane}: lookup ${column.lookup} for ${column.detail}`;
    case "store":
      return `${column.lane}: stores a new entry for ${column.detail}`;
    case "observer":
      return `${owner}: ${column.label}${column.detail ? ` (${column.detail})` : ""}`;
    case "inject":
      return `${column.label}${column.detail ? ` — ${column.detail}` : ""}`;
    case "unhandled":
      return `Node: unhandledRejection — ${column.detail}`;
    case "uncaught":
      return `worker thread: uncaught ${column.label} — ${column.detail}`;
    case "reply":
      return `caller stand-in ${column.label}`;
    case "send":
    case "receive":
      return `worker ${column.label}${column.detail ? ` (${column.detail})` : ""}`;
    case "worker-error":
      return `daemon side: worker 'error' event — ${column.detail}`;
    case "worker-exit":
      return `daemon side: worker exit (${column.detail})`;
    case "exited":
      return `daemon side: ${column.label}${column.detail ? ` (${column.detail})` : ""}`;
    default:
      return column.label;
  }
}

function processRun(traceName) {
  const trace = readTrace(traceName);
  const events = trace.events.filter((event) => !event.patch).sort((left, right) => left.seq - right.seq);
  const { calls } = reconstructCalls(events);
  analyzeCompletion(calls);
  const build = trace.build;

  const runtimeLinks = new Map();
  for (const event of events.filter((candidate) => candidate.kind === "unhandled" || candidate.kind === "uncaught")) {
    const swallowed = [...calls.values()].filter(
      (call) => call.swallowedBy && (event.promiseId ? call.promiseId === event.promiseId : call.thread === event.thread),
    );
    const source = swallowed.sort((left, right) => left.startSeq - right.startSeq)[0];
    if (source) runtimeLinks.set(event.seq, source);
  }

  const terminatedByProbe = trace.exit?.cause === "terminated";
  const columns = [];
  const columnBySeq = new Map();
  for (const event of events) {
    if (!isVisible(event, calls)) continue;
    if (terminatedByProbe && ["worker-exit", "exited"].includes(event.kind)) continue;
    const previous = columns.at(-1);
    if (
      event.kind === "clear" &&
      previous?.kind === "clear" &&
      previous.enclosingCallId === event.enclosingCallId &&
      previous.chord.length < STORE_LANES.length
    ) {
      previous.chord.push({ lane: event.lane, size: event.size });
      previous.seqs.push(event.seq);
      previous.lastJob = event.job;
      columnBySeq.set(event.seq, previous.index);
      continue;
    }
    const column = {
      index: columns.length,
      seqs: [event.seq],
      thread: event.thread,
      firstJob: event.job,
      lastJob: event.job,
      track: event.track,
      lane: event.lane,
      kind: event.kind,
      label: event.label,
      detail: event.detail,
      outcome: event.outcome,
      lookup: event.lookup,
      callId: event.callId,
      enclosingCallId: event.enclosingCallId,
      boundary: boundaryOf(event, calls, runtimeLinks),
    };
    if (event.kind === "clear") {
      column.chord = [{ lane: event.lane, size: event.size }];
      column.lane = undefined;
      const enclosing = calls.get(event.enclosingCallId);
      column.clearedBy = enclosing?.label;
      column.clearedWithin = trackOfCall(calls, enclosing?.parentId) === "service" || enclosing?.track === "service" ? findLifecycle(enclosing, calls) : undefined;
    }
    columns.push(column);
    columnBySeq.set(event.seq, column.index);
  }

  const lastJobByThread = new Map();
  let columnCursor = 0;
  for (const event of events) {
    const previousJob = lastJobByThread.get(event.thread);
    const columnIndex = columnBySeq.get(event.seq);
    if (columnIndex !== undefined) columnCursor = columnIndex;
    if (previousJob !== undefined && previousJob !== event.job) {
      const target = columnIndex ?? nextColumnIndexAfter(event.seq, columns);
      if (target !== undefined) {
        const column = columns[target];
        column.hops = column.hops ?? {};
        column.hops[event.thread] = (column.hops[event.thread] ?? 0) + 1;
      }
    }
    lastJobByThread.set(event.thread, event.job);
  }
  void columnCursor;
  for (const column of columns) {
    const previous = columns[column.index - 1];
    column.threadSeam = Boolean(previous && previous.thread !== column.thread);
    column.caption = captionFor(column, build, calls);
  }

  const columnOfSeq = (seq) => (seq === undefined ? undefined : columnBySeq.get(seq) ?? nextColumnIndexAfter(seq, columns));
  const spans = [];
  for (const call of calls.values()) {
    const startColumn = call.synthetic ? columnBySeq.get(call.startSeq) : columnBySeq.get(call.startSeq);
    if (startColumn === undefined) continue;
    const completion = call.replySeq ?? call.completionSeq;
    const visibleCompletion = completion !== undefined && columnBySeq.has(completion);
    const hasDuration = Boolean(call.promiseId || call.synthetic || (visibleCompletion && columnBySeq.get(completion) > startColumn));
    if (!hasDuration) continue;
    const endColumn = completion === undefined ? null : columnOfSeq(completion);
    spans.push({
      id: call.id,
      track: call.track,
      lane: call.lane,
      label: call.label,
      startColumn,
      activeColumn: call.synthetic && call.activeSeq !== undefined ? columnOfSeq(call.activeSeq) : undefined,
      endColumn: endColumn ?? null,
      outcome: call.outcome,
      clash: Boolean(call.clash),
      swallowed: Boolean(call.swallowedBy),
    });
  }

  const links = [];
  for (const call of calls.values()) {
    const completion = call.replySeq ?? call.completionSeq;
    const completionColumn = completion === undefined ? undefined : columnOfSeq(completion);
    const parent = calls.get(call.parentId);
    if (call.clash && completionColumn !== undefined) {
      for (const openId of call.clash.open) {
        const open = calls.get(openId);
        links.push({ kind: "clash", column: completionColumn, fromTrack: call.track, toTrack: open.track, toLane: open.lane, openCallId: openId, callId: call.id });
      }
    }
    if (!parent || completionColumn === undefined) continue;
    const parentCompletion = parent.replySeq ?? parent.completionSeq;
    const parentColumn = parentCompletion === undefined ? undefined : columnOfSeq(parentCompletion);
    if (call.swallowedBy) {
      links.push({ kind: "broken", fromColumn: completionColumn, fromTrack: call.track, fromLane: call.lane, toColumn: parentColumn ?? completionColumn, toTrack: parent.track, callId: call.id });
      continue;
    }
    const parentWaits = (parent.promiseId || parent.synthetic || parent.replySeq !== undefined) && parentCompletion !== undefined && parentCompletion >= completion;
    if ((call.promiseId || call.synthetic) && parentWaits && parentColumn !== undefined && parentColumn >= completionColumn) {
      if (!(parent.sharesPromiseOf === call.id)) {
        links.push({ kind: "tie", fromColumn: completionColumn, fromTrack: call.track, fromLane: call.lane, toColumn: parentColumn, toTrack: parent.track, outcome: call.outcome, callId: call.id });
      }
    }
  }
  for (const [runtimeSeq, source] of runtimeLinks) {
    links.push({ kind: "unobserved", fromColumn: columnOfSeq(source.completionSeq), fromTrack: source.track, fromLane: source.lane, toColumn: columnBySeq.get(runtimeSeq), toTrack: "runtime", callId: source.id });
  }
  for (const call of calls.values()) {
    if (!call.synthetic || !call.parentId) continue;
    const parent = calls.get(call.parentId);
    const receiveColumn = columnBySeq.get(call.startSeq);
    const sendColumn = call.replySeq === undefined ? undefined : columnBySeq.get(call.replySeq);
    const parentStart = columnBySeq.get(parent.startSeq);
    const parentSettle = parent.completionSeq === undefined ? undefined : columnOfSeq(parent.completionSeq);
    if (parentStart !== undefined && receiveColumn !== undefined) {
      links.push({ kind: "message", fromColumn: parentStart, fromTrack: "parent", toColumn: receiveColumn, toTrack: "worker" });
    }
    if (sendColumn !== undefined && parentSettle !== undefined) {
      links.push({ kind: "message", fromColumn: sendColumn, fromTrack: "worker", toColumn: parentSettle, toTrack: "parent" });
    }
  }

  const anchors = computeAnchors(columns, calls, trace);
  const summary = summarize(columns, calls, trace);
  return {
    trace: traceName,
    build,
    buildLabel: BUILD_LABELS[build],
    commit: trace.commit,
    recordedAt: trace.recordedAt,
    node: trace.node,
    injections: trace.injections,
    notes: trace.notes,
    outcomes: trace.outcomes,
    exit: trace.exit,
    eventCount: events.length,
    columns: columns.map(({ enclosingCallId, ...column }) => column),
    spans,
    links,
    anchors,
    summary,
    calls: [...calls.values()].map((call) => ({
      id: call.id,
      track: call.track,
      lane: call.lane,
      label: call.label,
      parentId: call.parentId,
      startSeq: call.startSeq,
      completionSeq: call.replySeq ?? call.completionSeq,
      outcome: call.outcome,
      clash: call.clash,
      swallowedBy: call.swallowedBy,
      synthetic: call.synthetic,
    })),
  };
}

function findLifecycle(call, calls) {
  let current = call;
  while (current) {
    if (/beginTurn/.test(current.label)) return "turn";
    if (/releaseTransientResources/.test(current.label)) return "release";
    current = calls.get(current.parentId);
  }
  return undefined;
}

function nextColumnIndexAfter(seq, columns) {
  const column = columns.find((candidate) => candidate.seqs[0] >= seq);
  return column?.index;
}

function computeAnchors(columns, calls, trace) {
  const find = (predicate, from = 0) => columns.find((column) => column.index >= from && predicate(column))?.index;
  const all = (predicate) => columns.filter(predicate).map((column) => column.index);
  const releaseCall = find(
    (column) =>
      column.kind === "call" &&
      ((column.track === "caller" && column.label.startsWith("release-transient")) ||
        (column.track === "parent" && column.label.startsWith("worker.releaseTransientResources"))),
  );
  const releaseReply =
    releaseCall === undefined
      ? undefined
      : find((column) => column.kind === "reply" || (column.kind === "send" && /heap|failed/.test(column.label)), releaseCall);
  const releaseChord = releaseCall === undefined ? undefined : find((column) => column.kind === "clear", releaseCall);
  const turnChord = all((column) => column.kind === "clear" && column.clearedWithin === "turn");
  const refreshCall = all((column) => column.kind === "call" && column.track === "caller" && column.label.startsWith("refresh("));
  const refreshFailure = find((column) => column.kind === "settle" && column.track === "backend" && column.outcome === "rejected" && column.label.startsWith("refresh("));
  const nextCommandTurn = releaseCall === undefined ? undefined : find((column) => column.kind === "clear" && column.clearedWithin === "turn", releaseCall);
  const runtimeAlarm = find((column) => column.kind === "unhandled" || column.kind === "uncaught");
  const afterReleaseHit = find((column) => column.kind === "lookup" && column.lookup === "hit", releaseReply ?? 0);
  const lateMark = find((column) => column.kind === "mark" && /releases held old search/.test(column.label));
  const lateHit = lateMark === undefined ? undefined : find((column) => column.kind === "lookup" && column.lookup === "hit", lateMark);
  return {
    releaseCall,
    releaseReply,
    releaseChord,
    turnChord,
    refreshCall,
    refreshFailure,
    nextCommandTurn,
    runtimeAlarm,
    afterReleaseHit,
    lateHit,
    runEnd: columns.length - 1,
  };
  void calls;
  void trace;
}

function summarize(columns, calls, trace) {
  const releaseCallers = [...calls.values()].filter(
    (call) =>
      (call.track === "caller" && call.label.startsWith("release-transient")) ||
      (call.track === "parent" && call.label.startsWith("worker.releaseTransientResources")),
  );
  const release = releaseCallers[0];
  const backendRelease = [...calls.values()].find((call) => call.track === "backend" && call.label.startsWith("releaseTransientResources"));
  const graphRelease = [...calls.values()].find((call) => call.track === "graph" && call.label.includes("releaseTransientResources"));
  const reply = columns.find((column) => (column.kind === "reply" || (column.kind === "send" && /heap|failed/.test(column.label))) && column.seqs[0] > (release?.startSeq ?? Infinity));
  const hopsBetween = (fromSeq, toSeq, thread) => {
    if (fromSeq === undefined || toSeq === undefined) return undefined;
    let hops = 0;
    let lastJob;
    for (const event of trace.events.filter((candidate) => !candidate.patch && candidate.thread === thread).sort((left, right) => left.seq - right.seq)) {
      if (event.seq < fromSeq || event.seq > toSeq) continue;
      if (lastJob !== undefined && lastJob !== event.job) hops += 1;
      lastJob = event.job;
    }
    return hops;
  };
  return {
    replyLabel: reply?.label,
    replyBeforeGraphSettled: Boolean(reply && graphRelease?.completionSeq !== undefined && reply.seqs[0] < graphRelease.completionSeq),
    backendReleaseOutcome: backendRelease?.outcome,
    graphReleaseOutcome: graphRelease?.outcome,
    backendReleaseClash: Boolean(backendRelease?.clash),
    hopsBackendCallToSettle: hopsBetween(backendRelease?.startSeq, backendRelease?.completionSeq, backendRelease?.thread),
    inferredReleased: [...calls.values()].some((call) => call.track === "projects" && call.lane === "inferred"),
    runtimeAlarm: columns.some((column) => column.kind === "unhandled" || column.kind === "uncaught"),
    workerExit: trace.exit,
    clashCount: [...calls.values()].filter((call) => call.clash).length,
    swallowedCount: [...calls.values()].filter((call) => call.swallowedBy).length,
  };
}

function lineStartOf(lines, needle, occurrence = 1) {
  let seen = 0;
  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].includes(needle)) {
      seen += 1;
      if (seen === occurrence) return index;
    }
  }
  throw new Error(`not found: ${needle}`);
}

function blockEnd(lines, startIndex) {
  let depth = 0;
  let opened = false;
  for (let index = startIndex; index < lines.length; index += 1) {
    const text = lines[index].replace(/(["'`])(?:\\.|(?!\1).)*\1/g, "");
    for (const character of text) {
      if (character === "{") {
        depth += 1;
        opened = true;
      } else if (character === "}") {
        depth -= 1;
      }
    }
    if (opened && depth <= 0) return index;
  }
  throw new Error(`unbalanced block from line ${startIndex + 1}`);
}

const SOURCE_SPECS = [
  ["backend-refresh-base", "base", "packages/backend-typescript/src/typescript-backend/typescript-backend.ts", { find: "async refresh(request" }],
  ["backend-refresh-head", "head", "packages/backend-typescript/src/typescript-backend/typescript-backend.ts", { find: "async refresh(request" }],
  ["backend-release-main", "main", "packages/backend-typescript/src/typescript-backend/typescript-backend.ts", { find: "async releaseTransientResources()" }],
  ["backend-release-base", "base", "packages/backend-typescript/src/typescript-backend/typescript-backend.ts", { find: "async releaseTransientResources()" }],
  ["backend-release-head", "head", "packages/backend-typescript/src/typescript-backend/typescript-backend.ts", { find: "async releaseTransientResources()" }],
  ["service-begin-turn-base", "base", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "beginTurn(snapshot" }],
  ["service-begin-turn-head", "head", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "beginTurn(files" }],
  ["service-release-main", "main", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "releaseTransientResources(): void" }],
  ["service-release-base", "base", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "releaseTransientResources(): void" }],
  ["service-release-head", "head", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "async releaseTransientResources()" }],
  ["service-clear-base", "base", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "private clearQueryCaches()" }],
  ["service-find-definitions-base", "base", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "findDefinitions(identity" }],
  ["service-find-definitions-head", "head", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts", { find: "findDefinitions(identity" }],
  ["scope-head", "head", "packages/core/src/backend/turn-scoped-cache-scope.ts", { whole: true }],
  ["graph-release-base", "base", "packages/core/src/workspace/project-graph.ts", { find: "async releaseTransientResources()" }],
  ["graph-release-head", "head", "packages/core/src/workspace/project-graph.ts", { find: "async releaseTransientResources()" }],
  ["graph-release-main", "main", "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts", { find: "releaseTransientResources(): void", occurrence: 2 }],
  ["project-release-head", "head", "packages/backend-typescript/src/typescript-backend/typescript-project-graph.ts", { find: "releaseTransientResources(): void" }],
  ["project-interface-head", "head", "packages/core/src/workspace/project-graph.ts", { find: "export interface ProjectWithTransientResources" }],
  ["worker-entry-tail", "head", "apps/cli/src/daemon/daemon-navigation-worker-entry.ts", { find: "run(): void" }],
  ["worker-entry-release", "head", "apps/cli/src/daemon/daemon-navigation-worker-entry.ts", { find: "private async releaseTransientResources(operationId" }],
  ["node-worker-failed", "head", "apps/cli/src/daemon/daemon-navigation-worker.ts", { find: "private async receive(value" }],
  ["daemon-release", "head", "apps/cli/src/daemon/workspace-daemon.ts", { find: "private async releaseTransientResources()" }],
  ["daemon-worker-exit", "head", "apps/cli/src/daemon/workspace-daemon.ts", { find: "private observeWorkerExit(" }],
  ["monitor-shed", "head", "apps/cli/src/daemon/daemon-resource-monitor.ts", { find: "private async shed(" }],
  ["monitor-worker-exited", "head", "apps/cli/src/daemon/daemon-resource-monitor.ts", { find: "async workerExited(" }],
  ["test-service-preserves-turn", "head", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts", { find: 'it("preserves the current turn when backend refresh fails"' }],
  ["test-service-release-barrier", "head", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts", { find: 'it("clears caches before awaiting project release and rejects at the backend boundary"' }],
  ["test-service-shares-then-clears", "head", "packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts", { find: 'it("shares caches within one turn and clears them for the next turn"' }],
  ["test-core-clears-every-handle", "head", "packages/core/src/backend/turn-scoped-cache-scope.test.ts", { find: 'it("clears every handle at turn and release boundaries"' }],
  ["test-core-late-settlement", "head", "packages/core/src/backend/turn-scoped-cache-scope.test.ts", { find: 'it("does not let an old promise settlement replace a new turn entry"' }],
  ["spec-no-timing", "head", "plans/005/daemon-architecture-functional-spec.md", { lines: [5, 5], also: [[26, 28]] }],
  ["spec-core-shared", "head", "plans/005/daemon-architecture-functional-spec.md", { find: "### A language backend holds only language-specific logic", count: 12 }],
];

function extractSources() {
  const sources = {};
  const fileCache = new Map();
  const commits = {};
  for (const build of Object.keys(worktreeByBuild)) {
    commits[build] = execFileSync("git", ["-C", join(worktrees, worktreeByBuild[build]), "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  }
  for (const [id, build, path, spec] of SOURCE_SPECS) {
    const absolute = join(worktrees, worktreeByBuild[build], path);
    if (!fileCache.has(absolute)) fileCache.set(absolute, readFileSync(absolute, "utf8"));
    const text = fileCache.get(absolute);
    const lines = text.split("\n");
    let ranges;
    if (spec.whole) ranges = [[1, lines.at(-1) === "" ? lines.length - 1 : lines.length]];
    else if (spec.lines) ranges = [spec.lines, ...(spec.also ?? [])];
    else {
      const start = lineStartOf(lines, spec.find, spec.occurrence);
      const end = spec.count ? start + spec.count - 1 : blockEnd(lines, start);
      ranges = [[start + 1, end + 1]];
    }
    sources[id] = {
      id,
      build,
      buildLabel: BUILD_LABELS[build],
      commit: commits[build],
      path,
      fileSha256: createHash("sha256").update(text).digest("hex"),
      ranges: ranges.map(([start, end]) => ({ start, end, text: lines.slice(start - 1, end).join("\n") })),
    };
  }
  const sameAcross = (path) => {
    const hashes = Object.entries(worktreeByBuild).map(([, directory]) =>
      createHash("sha256").update(readFileSync(join(worktrees, directory, path))).digest("hex"),
    );
    return hashes.every((hash) => hash === hashes[0]);
  };
  const identicalAcrossBuilds = Object.fromEntries(
    [
      "apps/cli/src/daemon/daemon-navigation-worker-entry.ts",
      "apps/cli/src/daemon/daemon-navigation-worker.ts",
      "apps/cli/src/daemon/workspace-daemon.ts",
      "apps/cli/src/daemon/daemon-resource-monitor.ts",
    ].map((path) => [path, sameAcross(path)]),
  );
  identicalAcrossBuilds["packages/core/src/workspace/project-graph.ts (base vs head)"] =
    createHash("sha256").update(readFileSync(join(worktrees, "pr-127-base/packages/core/src/workspace/project-graph.ts"))).digest("hex") ===
    createHash("sha256").update(readFileSync(join(worktrees, "pr-127-head/packages/core/src/workspace/project-graph.ts"))).digest("hex");
  return { sources, commits, identicalAcrossBuilds };
}

function prBodySources() {
  const pr = JSON.parse(readFileSync(join(experimentDirectory, "../../inputs/pr-127/pr.json"), "utf8"));
  const section = (heading) => {
    const start = pr.body.indexOf(`## ${heading}`);
    const next = pr.body.indexOf("\n## ", start + 3);
    return pr.body.slice(start, next === -1 ? undefined : next).trim();
  };
  const shape = section("Shape");
  const afterIndex = shape.indexOf("After");
  return {
    "pr-body-context": { id: "pr-body-context", build: "pr", path: "inputs/pr-127/pr.json · body · Context", ranges: [{ text: section("Context") }] },
    "pr-body-shape": { id: "pr-body-shape", build: "pr", path: "inputs/pr-127/pr.json · body · Shape (after)", ranges: [{ text: shape.slice(afterIndex) }] },
    "pr-body-decisions": { id: "pr-body-decisions", build: "pr", path: "inputs/pr-127/pr.json · body · Decisions", ranges: [{ text: section("Decisions") }] },
    "pr-body-public": { id: "pr-body-public", build: "pr", path: "inputs/pr-127/pr.json · body · Public surface", ranges: [{ text: section("Public surface") }] },
    commits: pr.commits.map((commit) => ({ sha: commit.sha.slice(0, 9), subject: commit.subject, body: commit.body })),
  };
}

function testInventory() {
  const head = join(worktrees, "pr-127-head");
  return TESTS.map((test) => {
    const log = execFileSync("git", ["-C", head, "log", "--format=%h\t%s", `-S${test.name}`, "--", test.file], { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
    const [sha, subject] = (log.at(-1) ?? "").split("\t");
    const lines = readFileSync(join(head, test.file), "utf8").split("\n");
    const line = lineStartOf(lines, `it("${test.name}"`) + 1;
    return { ...test, line, introducedBy: { sha, subject }, sourceId: `test-${test.id}` };
  });
}

const runs = {};
for (const score of SCORES) {
  const traceNames = [...Object.values(score.runs), ...Object.values(score.variants ?? {}).flatMap((variant) => Object.values(variant))];
  for (const traceName of traceNames) runs[traceName] = processRun(traceName);
}

const { sources, commits, identicalAcrossBuilds } = extractSources();
const prSources = prBodySources();
const tests = testInventory();

const missingReceipts = DECISIONS.flatMap((decision) => decision.receipts.filter((id) => !sources[id] && !prSources[id]));
if (missingReceipts.length) throw new Error(`missing receipts: ${missingReceipts.join(", ")}`);

const data = {
  generatedAt: new Date().toISOString(),
  commits,
  identicalAcrossBuilds,
  tracks: TRACKS.map((track) => ({
    id: track.id,
    name: track.name,
    lanes: track.lanes,
    onlyBuilds: track.onlyBuilds,
    owner: Object.fromEntries(Object.keys(worktreeByBuild).map((build) => [build, track.owner(build)])),
    pkg: Object.fromEntries(Object.keys(worktreeByBuild).map((build) => [build, track.pkg(build)])),
  })),
  scores: SCORES,
  runs,
  decisions: DECISIONS,
  notPlayed: NOT_PLAYED,
  tests,
  sources: { ...sources, ...prSources },
};

writeFileSync(join(experimentDirectory, "data/scores.js"), `window.MUSIC_BOX = ${JSON.stringify(data)};\n`);
writeFileSync(join(experimentDirectory, "evidence/sources.json"), `${JSON.stringify({ commits, identicalAcrossBuilds, sources, prSources }, null, 1)}\n`);
writeFileSync(join(experimentDirectory, "evidence/test-inventory.json"), `${JSON.stringify(tests, null, 1)}\n`);
writeFileSync(
  join(experimentDirectory, "evidence/run-summaries.json"),
  `${JSON.stringify(Object.fromEntries(Object.entries(runs).map(([name, run]) => [name, { build: run.build, commit: run.commit, events: run.eventCount, columns: run.columns.length, summary: run.summary, outcomes: run.outcomes, notes: run.notes, injections: run.injections }])), null, 1)}\n`,
);
console.log(`runs ${Object.keys(runs).length}; sources ${Object.keys(sources).length}; tests ${tests.length}`);
for (const [name, run] of Object.entries(runs)) {
  console.log(name.padEnd(28), String(run.columns.length).padStart(3), "cols", JSON.stringify(run.summary));
}
