// ../../worktrees/pr-131-base/apps/cli/src/command-execution-result.ts
import { createHash, randomUUID } from "node:crypto";
import { constants } from "node:fs";
import { mkdir, open, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Writable } from "node:stream";
import { finished as streamFinished } from "node:stream/promises";
var DEFAULT_INLINE_BYTES = 256 * 1024;
var MAXIMUM_RECORD_BYTES = 64 * 1024;
var DEFAULT_MAXIMUM_BYTES = 256 * 1024 * 1024;
var RECORD_HEADER_BYTES = 9;
var CommandOutputWritable = class extends Writable {
  constructor(stream, append) {
    super();
    this.stream = stream;
    this.append = append;
  }
  _write(chunk, encoding, callback) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), encoding);
    void this.append(this.stream, bytes).then(() => callback(), callback);
  }
};
var StoredCommandOutput = class {
  constructor(summary, inlineRecords, filePath) {
    this.summary = summary;
    this.inlineRecords = inlineRecords;
    this.filePath = filePath;
  }
  async *records(offset = 0) {
    const records = this.filePath === void 0 ? this.inlineRecords : OrderedCommandOutput.decodeFileRecords(this.filePath);
    for await (const record of records) {
      if (record.sequence >= offset) yield record;
    }
  }
  async dispose() {
    if (this.filePath === void 0) return;
    await unlink(this.filePath).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
};
var OrderedCommandOutput = class _OrderedCommandOutput {
  stdout;
  stderr;
  inlineBytes;
  directory;
  maximumBytes;
  hash = createHash("sha256");
  inlineRecords = [];
  pending;
  file;
  filePath;
  rawBytes = 0;
  recordCount = 0;
  finished = false;
  tail = Promise.resolve();
  capturedBytes = 0;
  failure;
  constructor(options = {}) {
    this.inlineBytes = options.inlineBytes ?? DEFAULT_INLINE_BYTES;
    this.directory = options.directory ?? tmpdir();
    this.maximumBytes = options.maximumBytes ?? DEFAULT_MAXIMUM_BYTES;
    this.stdout = new CommandOutputWritable(
      "stdout",
      (stream, bytes) => this.enqueue(stream, bytes)
    );
    this.stderr = new CommandOutputWritable(
      "stderr",
      (stream, bytes) => this.enqueue(stream, bytes)
    );
  }
  appendRecord(record) {
    const operation = this.tail.then(async () => {
      if (this.finished) throw new Error("Command output is already finished");
      await this.flushPending();
      if (record.sequence !== this.recordCount)
        throw new Error("Unexpected command output sequence");
      if (record.bytes.byteLength > MAXIMUM_RECORD_BYTES) {
        throw new Error("Command output record exceeds chunk capacity");
      }
      if (this.capturedBytes + record.bytes.byteLength > this.maximumBytes) {
        throw new CommandOutputCapacityError();
      }
      this.capturedBytes += record.bytes.byteLength;
      await this.storeRecord({ ...record, bytes: Buffer.from(record.bytes) });
    });
    this.tail = operation.catch((error) => {
      this.failure = error instanceof Error ? error : new Error(String(error));
    });
    return operation;
  }
  async finish(exitCode) {
    if (this.finished) throw new Error("Command output is already finished");
    this.stdout.end();
    this.stderr.end();
    await Promise.all([streamFinished(this.stdout), streamFinished(this.stderr)]);
    if (this.failure !== void 0) throw this.failure;
    this.finished = true;
    await this.flushPending();
    await this.file?.close();
    this.file = void 0;
    const storedOutput = new StoredCommandOutput(
      {
        rawBytes: this.rawBytes,
        recordCount: this.recordCount,
        sha256: this.hash.digest("hex")
      },
      [...this.inlineRecords],
      this.filePath
    );
    return {
      output: storedOutput,
      exitCode
    };
  }
  async replaceWith(result) {
    await this.dispose();
    return result;
  }
  async dispose() {
    await this.file?.close();
    this.file = void 0;
    if (this.filePath === void 0) return;
    await unlink(this.filePath).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
    this.filePath = void 0;
  }
  async append(stream, bytes) {
    if (this.finished) throw new Error("Command output is already finished");
    for (let offset = 0; offset < bytes.byteLength; offset += MAXIMUM_RECORD_BYTES) {
      const chunk = Buffer.from(
        bytes.buffer,
        bytes.byteOffset + offset,
        Math.min(MAXIMUM_RECORD_BYTES, bytes.byteLength - offset)
      );
      if (this.capturedBytes + chunk.byteLength > this.maximumBytes) {
        throw new CommandOutputCapacityError();
      }
      this.capturedBytes += chunk.byteLength;
      if (this.pending?.stream === stream && this.pending.bytes.byteLength + chunk.byteLength <= MAXIMUM_RECORD_BYTES) {
        this.pending = { stream, bytes: Buffer.concat([this.pending.bytes, chunk]) };
        continue;
      }
      await this.flushPending();
      this.pending = { stream, bytes: Buffer.from(chunk) };
    }
  }
  enqueue(stream, bytes) {
    const operation = this.tail.then(() => this.append(stream, bytes)).catch((error) => {
      this.failure = error instanceof Error ? error : new Error(String(error));
    });
    this.tail = operation;
    return operation;
  }
  async flushPending() {
    if (this.pending === void 0) return;
    const record = {
      sequence: this.recordCount,
      stream: this.pending.stream,
      bytes: this.pending.bytes
    };
    this.pending = void 0;
    await this.storeRecord(record);
  }
  async storeRecord(record) {
    const encoded = _OrderedCommandOutput.encodeRecord(record);
    if (this.file === void 0 && this.rawBytes + record.bytes.byteLength > this.inlineBytes) {
      await this.spillInlineRecords();
    }
    if (this.file === void 0) this.inlineRecords.push(record);
    else await this.file.write(encoded);
    this.hash.update(encoded.subarray(4));
    this.rawBytes += record.bytes.byteLength;
    this.recordCount += 1;
  }
  async spillInlineRecords() {
    await mkdir(this.directory, { recursive: true, mode: 448 });
    this.filePath = join(this.directory, `command-output-${randomUUID()}.spool`);
    this.file = await open(this.filePath, "wx", 384);
    for (const record of this.inlineRecords) {
      await this.file.write(_OrderedCommandOutput.encodeRecord(record));
    }
    this.inlineRecords.length = 0;
  }
  static encodeRecord(record) {
    const header = Buffer.alloc(RECORD_HEADER_BYTES);
    header.writeUInt32BE(record.sequence, 0);
    header.writeUInt8(record.stream === "stdout" ? 0 : 1, 4);
    header.writeUInt32BE(record.bytes.byteLength, 5);
    return Buffer.concat([header, Buffer.from(record.bytes)]);
  }
  static decodeRecords(encoded) {
    const records = [];
    const bytes = Buffer.from(encoded);
    let offset = 0;
    while (offset < bytes.byteLength) {
      if (bytes.byteLength - offset < RECORD_HEADER_BYTES)
        throw new Error("Truncated command output");
      const sequence = bytes.readUInt32BE(offset);
      const streamByte = bytes.readUInt8(offset + 4);
      const length = bytes.readUInt32BE(offset + 5);
      const nextOffset = offset + RECORD_HEADER_BYTES + length;
      if (streamByte > 1 || nextOffset > bytes.byteLength)
        throw new Error("Corrupt command output");
      records.push({
        sequence,
        stream: streamByte === 0 ? "stdout" : "stderr",
        bytes: bytes.subarray(offset + RECORD_HEADER_BYTES, nextOffset)
      });
      offset = nextOffset;
    }
    return records;
  }
  static async *decodeFileRecords(filePath) {
    const noFollow = "O_NOFOLLOW" in constants ? constants.O_NOFOLLOW : 0;
    const handle = await open(filePath, constants.O_RDONLY | noFollow);
    try {
      const metadata = await handle.stat();
      if (!metadata.isFile()) throw new Error("Command output spool is not a regular file");
      let position = 0;
      let expectedSequence = 0;
      while (position < metadata.size) {
        const header = Buffer.alloc(RECORD_HEADER_BYTES);
        await _OrderedCommandOutput.readExact(handle, header, position);
        position += RECORD_HEADER_BYTES;
        const sequence = header.readUInt32BE(0);
        const streamByte = header.readUInt8(4);
        const length = header.readUInt32BE(5);
        if (sequence !== expectedSequence || streamByte > 1 || length > MAXIMUM_RECORD_BYTES) {
          throw new Error("Corrupt command output");
        }
        const bytes = Buffer.alloc(length);
        await _OrderedCommandOutput.readExact(handle, bytes, position);
        position += length;
        expectedSequence += 1;
        yield { sequence, stream: streamByte === 0 ? "stdout" : "stderr", bytes };
      }
    } finally {
      await handle.close();
    }
  }
  static async readExact(handle, target, position) {
    let readBytes = 0;
    while (readBytes < target.byteLength) {
      const result = await handle.read(
        target,
        readBytes,
        target.byteLength - readBytes,
        position + readBytes
      );
      if (result.bytesRead === 0) throw new Error("Truncated command output");
      readBytes += result.bytesRead;
    }
  }
};
var CommandOutputCapacityError = class extends Error {
  constructor() {
    super("Command output exceeds response capacity");
    this.name = "CommandOutputCapacityError";
  }
};

// ../../worktrees/pr-131-base/apps/cli/src/daemon/daemon-result-chunk-codec.ts
import { createHash as createHash2 } from "node:crypto";

// ../../worktrees/pr-131-base/apps/cli/src/daemon/completion-spool.ts
var COMMAND_OUTPUT_CHUNK_BYTES = 64 * 1024;
var DAEMON_MAXIMUM_CONTROL_FRAME_BYTES = 256 * 1024;
var COMMAND_OUTPUT_LIMIT_BYTES = 256 * 1024 * 1024;
var DAEMON_COMPLETION_SPOOL_LIMIT_BYTES = 512 * 1024 * 1024;
var COMPLETION_SPOOL_INLINE_BYTES = 256 * 1024;

// ../../worktrees/pr-131-base/apps/cli/src/daemon/daemon-result-chunk-codec.ts
var BINARY_FRAME_FLAG = 2147483648;
var BINARY_HEADER_LENGTH_BYTES = 4;
var DaemonResultChunkCodec = class _DaemonResultChunkCodec {
  static encode(chunk) {
    _DaemonResultChunkCodec.assertChunk(chunk);
    const header = {
      transferId: chunk.transferId,
      requestId: chunk.requestId,
      offset: chunk.offset,
      sequence: chunk.sequence,
      stream: chunk.stream,
      payloadLength: chunk.bytes.byteLength,
      sha256: createHash2("sha256").update(chunk.bytes).digest("hex")
    };
    const headerBytes = Buffer.from(JSON.stringify(header));
    const payloadLength = BINARY_HEADER_LENGTH_BYTES + headerBytes.byteLength + chunk.bytes.byteLength;
    const encoded = Buffer.alloc(4 + payloadLength);
    encoded.writeUInt32BE((BINARY_FRAME_FLAG | payloadLength) >>> 0, 0);
    encoded.writeUInt32BE(headerBytes.byteLength, 4);
    headerBytes.copy(encoded, 8);
    Buffer.from(chunk.bytes).copy(encoded, 8 + headerBytes.byteLength);
    return encoded;
  }
  static decode(payload) {
    if (payload.byteLength < BINARY_HEADER_LENGTH_BYTES) {
      throw new Error("Truncated daemon result chunk header");
    }
    const headerLength = payload.readUInt32BE(0);
    if (headerLength === 0 || headerLength > payload.byteLength - BINARY_HEADER_LENGTH_BYTES) {
      throw new Error("Invalid daemon result chunk header length");
    }
    let parsed;
    try {
      parsed = JSON.parse(payload.subarray(4, 4 + headerLength).toString("utf8"));
    } catch {
      throw new Error("Malformed daemon result chunk header");
    }
    const bytes = payload.subarray(4 + headerLength);
    if (!_DaemonResultChunkCodec.isHeader(parsed) || parsed.payloadLength !== bytes.byteLength) {
      throw new Error("Invalid daemon result chunk header");
    }
    if (createHash2("sha256").update(bytes).digest("hex") !== parsed.sha256) {
      throw new Error("Corrupt daemon result chunk payload");
    }
    const chunk = {
      transferId: parsed.transferId,
      requestId: parsed.requestId,
      offset: parsed.offset,
      sequence: parsed.sequence,
      stream: parsed.stream,
      bytes: Uint8Array.from(bytes)
    };
    _DaemonResultChunkCodec.assertChunk(chunk);
    return chunk;
  }
  static assertChunk(chunk) {
    if (chunk.transferId.length === 0 || chunk.requestId.length === 0 || !Number.isSafeInteger(chunk.offset) || chunk.offset < 0 || !Number.isSafeInteger(chunk.sequence) || chunk.sequence < 0 || chunk.stream !== "stdout" && chunk.stream !== "stderr" || !(chunk.bytes instanceof Uint8Array) || chunk.bytes.byteLength > COMMAND_OUTPUT_CHUNK_BYTES) {
      throw new Error("Invalid daemon result chunk");
    }
  }
  static isHeader(value) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
    const header = value;
    const keys = Object.keys(header).sort();
    const expected = [
      "offset",
      "payloadLength",
      "requestId",
      "sequence",
      "sha256",
      "stream",
      "transferId"
    ].sort();
    return keys.length === expected.length && keys.every((key, index) => key === expected[index]) && typeof header.transferId === "string" && header.transferId.length > 0 && typeof header.requestId === "string" && header.requestId.length > 0 && Number.isSafeInteger(header.offset) && Number(header.offset) >= 0 && Number.isSafeInteger(header.sequence) && Number(header.sequence) >= 0 && (header.stream === "stdout" || header.stream === "stderr") && Number.isSafeInteger(header.payloadLength) && Number(header.payloadLength) >= 0 && Number(header.payloadLength) <= COMMAND_OUTPUT_CHUNK_BYTES && typeof header.sha256 === "string" && /^[a-f\d]{64}$/.test(header.sha256);
  }
};

// ../../worktrees/pr-131-base/apps/cli/src/daemon/daemon-navigation-worker-protocol.ts
var DaemonNavigationWorkerProtocol = class {
  static request(value) {
    if (!this.isRecord(value) || !this.isGeneration(value.generation)) {
      throw new Error("Invalid daemon navigation worker request");
    }
    if (value.kind === "initialize" && this.hasKeys(value, ["kind", "generation", "workspaceRoot"]) && this.isNonEmptyString(value.workspaceRoot)) {
      return value;
    }
    if (value.kind === "execute" && this.hasKeys(value, ["kind", "generation", "requestId", "request"]) && this.isNonEmptyString(value.requestId) && this.isExecutionRequest(value.request)) {
      return value;
    }
    if (value.kind === "output-ack" && this.hasKeys(value, ["kind", "generation", "requestId", "sequence"]) && this.isNonEmptyString(value.requestId) && this.isCount(value.sequence)) {
      return value;
    }
    if (value.kind === "release-transient" && this.hasKeys(value, ["kind", "generation", "operationId"]) && this.isNonEmptyString(value.operationId)) {
      return value;
    }
    if (value.kind === "close" && this.hasKeys(value, ["kind", "generation"])) {
      return value;
    }
    throw new Error("Invalid daemon navigation worker request");
  }
  static response(value) {
    if (!this.isRecord(value) || !this.isGeneration(value.generation)) {
      throw new Error("Invalid daemon navigation worker response");
    }
    if (value.kind === "ready" && this.hasKeys(value, ["kind", "generation", "fileCount", "refresh", "startupDurations"]) && this.isCount(value.fileCount) && this.isRefresh(value.refresh) && this.isDurations(value.startupDurations, ["discoveryMs", "indexingMs", "totalMs"])) {
      return value;
    }
    if (value.kind === "output-chunk" && this.hasKeys(value, ["kind", "generation", "requestId", "sequence", "stream", "bytes"]) && this.isNonEmptyString(value.requestId) && this.isCount(value.sequence) && (value.stream === "stdout" || value.stream === "stderr") && value.bytes instanceof Uint8Array && value.bytes.byteLength <= COMMAND_OUTPUT_CHUNK_BYTES) {
      return value;
    }
    if (value.kind === "result" && this.hasKeys(value, [
      "kind",
      "generation",
      "requestId",
      "result",
      "refresh",
      "durations",
      "resources"
    ]) && this.isNonEmptyString(value.requestId) && this.isExecutionResult(value.result) && this.isRefresh(value.refresh) && this.isDurations(value.durations, ["freshnessMs", "navigationMs", "renderMs", "outputMs"]) && this.isWorkerResources(value.resources)) {
      return value;
    }
    if (value.kind === "failed" && this.isFailed(value)) {
      return value;
    }
    if (value.kind === "heap" && this.hasKeys(value, [
      "kind",
      "generation",
      "operationId",
      "usedHeapBytes",
      "heapLimitBytes"
    ]) && this.isNonEmptyString(value.operationId) && this.isCount(value.usedHeapBytes) && this.isCount(value.heapLimitBytes)) {
      return value;
    }
    if (value.kind === "closed" && this.hasKeys(value, ["kind", "generation"])) {
      return value;
    }
    throw new Error("Invalid daemon navigation worker response");
  }
  static isWorkerResources(value) {
    return this.isRecord(value) && this.hasKeys(value, [
      "workerHeapUsedBytes",
      "peakWorkerHeapUsedBytes",
      "workerHeapLimitBytes"
    ]) && this.isCount(value.workerHeapUsedBytes) && this.isCount(value.peakWorkerHeapUsedBytes) && this.isCount(value.workerHeapLimitBytes) && value.peakWorkerHeapUsedBytes >= value.workerHeapUsedBytes;
  }
  static isExecutionRequest(value) {
    if (!this.isRecord(value)) return false;
    const keys = ["argv", "cwd", "telemetryEnabled"];
    if (value.executionMode !== void 0) keys.push("executionMode");
    return this.hasKeys(value, keys) && Array.isArray(value.argv) && value.argv.every((argument) => typeof argument === "string") && typeof value.cwd === "string" && typeof value.telemetryEnabled === "boolean" && (value.executionMode === void 0 || value.executionMode === "cold" || value.executionMode === "warm" || value.executionMode === "fallback");
  }
  static isExecutionResult(value) {
    return this.isRecord(value) && this.hasKeys(value, ["exitCode"]) && this.isCount(value.exitCode);
  }
  static isRefresh(value) {
    return this.isRecord(value) && this.hasKeys(value, ["added", "changed", "removed", "unchanged"]) && this.isCount(value.added) && this.isCount(value.changed) && this.isCount(value.removed) && this.isCount(value.unchanged);
  }
  static isFailed(value) {
    const keys = ["kind", "generation", "failureCode"];
    if (value.requestId !== void 0) keys.push("requestId");
    if (value.operationId !== void 0) keys.push("operationId");
    if (value.errorName !== void 0) keys.push("errorName");
    return this.hasKeys(value, keys) && (value.requestId === void 0 || this.isNonEmptyString(value.requestId)) && (value.operationId === void 0 || this.isNonEmptyString(value.operationId)) && !(value.requestId !== void 0 && value.operationId !== void 0) && (value.failureCode === "initialization" || value.failureCode === "execution" || value.failureCode === "protocol" || value.failureCode === "resource") && (value.errorName === void 0 || this.isNonEmptyString(value.errorName));
  }
  static isDurations(value, keys) {
    return this.isRecord(value) && this.hasKeys(value, keys) && keys.every((key) => this.isMetric(value[key]));
  }
  static hasKeys(value, keys) {
    const actual = Object.keys(value).sort();
    return actual.length === keys.length && actual.every((key, index) => key === [...keys].sort()[index]);
  }
  static isGeneration(value) {
    return Number.isSafeInteger(value) && Number(value) >= 0;
  }
  static isCount(value) {
    return Number.isSafeInteger(value) && Number(value) >= 0;
  }
  static isMetric(value) {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
  }
  static isNonEmptyString(value) {
    return typeof value === "string" && value.length > 0;
  }
  static isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
};

// ../../worktrees/pr-131-base/packages/daemon/src/daemon-policy.ts
var MEBIBYTE = 1024 * 1024;
var DaemonPolicy = class _DaemonPolicy {
  values;
  constructor(values) {
    this.values = _DaemonPolicy.freeze(values);
    Object.freeze(this);
  }
  static currentSystem() {
    const runtimeProcess = globalThis.process;
    const constrainedBytes = runtimeProcess.constrainedMemory?.();
    return _DaemonPolicy.fromSystemMemory({
      totalBytes: runtimeProcess.binding("os").getTotalMem(),
      ...constrainedBytes === void 0 ? {} : { constrainedBytes }
    });
  }
  static fromSystemMemory(memory) {
    const effectiveMemoryBytes = memory.constrainedBytes !== void 0 && memory.constrainedBytes > 0 && memory.constrainedBytes < memory.totalBytes ? memory.constrainedBytes : memory.totalBytes;
    const effectiveMemoryMiB = Math.max(1, Math.floor(effectiveMemoryBytes / MEBIBYTE));
    const hardProcessRssMiB = _DaemonPolicy.clamp(Math.floor(effectiveMemoryMiB / 2), 256, 8192);
    const workerMaxOldGenerationSizeMiB = _DaemonPolicy.clamp(
      Math.floor(effectiveMemoryMiB / 4),
      128,
      4096
    );
    return new _DaemonPolicy({
      transport: {
        singleResponseTimeoutMs: 250,
        statusResponseTimeoutMs: 100,
        executionAdmissionTimeoutMs: 5e3,
        maximumJsonPayloadBytes: 8 * MEBIBYTE,
        maximumExecutionControlPayloadBytes: 256 * 1024
      },
      startup: {
        coordinationGraceMs: 15e3,
        heartbeatIntervalMs: 100,
        authorizationPollIntervalMs: 10,
        observationPollIntervalMs: 20,
        previousInstanceTerminationTimeoutMs: 5 * 6e4,
        childFailureRetryLimit: 1
      },
      shutdown: {
        idleTimeoutMs: 30 * 6e4,
        stopTimeoutMs: 5e3,
        forcedTerminationReserveMaximumMs: 500,
        controllerPollIntervalMs: 20,
        processSignalExitTimeoutMs: 500,
        processExitPollIntervalMs: 20,
        resourceDrainAcknowledgementGraceMs: 250,
        resourceDrainAcknowledgementPollIntervalMs: 5
      },
      delivery: {
        postAcceptanceExecutionReattachmentLimit: 1,
        resultTransferResumeLimitPerExecutionAttempt: 1
      },
      output: {
        maximumChunkRawBytes: 64 * 1024,
        inlineRawBytes: 256 * 1024,
        maximumResultRawBytes: 256 * MEBIBYTE,
        maximumAggregateSpoolRawBytes: 512 * MEBIBYTE
      },
      resources: {
        effectiveMemoryBytes,
        hardProcessRssBytes: hardProcessRssMiB * MEBIBYTE,
        softProcessRssBytes: Math.floor(hardProcessRssMiB * 0.8) * MEBIBYTE,
        resumeProcessRssBytes: Math.floor(hardProcessRssMiB * 0.7) * MEBIBYTE,
        workerMaxOldGenerationSizeMiB,
        supervisionIntervalMs: 250,
        replacementWindowMs: 10 * 6e4,
        replacementLimit: 2,
        workerHeapSampleIntervalMs: 25
      },
      diagnostics: {
        logRotateBytes: 10 * MEBIBYTE,
        logBackupCount: 4,
        maximumQueuedEvents: 1024,
        disconnectedTraceRetentionMs: 5 * 6e4,
        maximumDisconnectedTraces: 1024
      }
    });
  }
  static fromSerialized(value) {
    return new _DaemonPolicy(DaemonPolicyCodec.parse(value));
  }
  toSerialized() {
    return DaemonPolicyCodec.serialize(this);
  }
  static clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }
  static freeze(values) {
    for (const section of Object.values(values)) Object.freeze(section);
    return Object.freeze(values);
  }
};
var DaemonPolicyCodec = class _DaemonPolicyCodec {
  static serialize(policy) {
    return Object.freeze({ schemaVersion: 1, values: policy.values });
  }
  static parse(value) {
    if (!_DaemonPolicyCodec.isRecord(value)) throw new Error("Invalid daemon policy");
    _DaemonPolicyCodec.exactKeys(value, ["schemaVersion", "values"]);
    if (value.schemaVersion !== 1 || !_DaemonPolicyCodec.isRecord(value.values)) {
      throw new Error("Invalid daemon policy");
    }
    const values = value.values;
    _DaemonPolicyCodec.validateValues(values);
    return JSON.parse(JSON.stringify(values));
  }
  static validateValues(values) {
    _DaemonPolicyCodec.exactKeys(values, [
      "transport",
      "startup",
      "shutdown",
      "delivery",
      "output",
      "resources",
      "diagnostics"
    ]);
    const transport = _DaemonPolicyCodec.section(values, "transport", [
      "singleResponseTimeoutMs",
      "statusResponseTimeoutMs",
      "executionAdmissionTimeoutMs",
      "maximumJsonPayloadBytes",
      "maximumExecutionControlPayloadBytes"
    ]);
    const startup = _DaemonPolicyCodec.section(values, "startup", [
      "coordinationGraceMs",
      "heartbeatIntervalMs",
      "authorizationPollIntervalMs",
      "observationPollIntervalMs",
      "previousInstanceTerminationTimeoutMs",
      "childFailureRetryLimit"
    ]);
    const shutdown = _DaemonPolicyCodec.section(values, "shutdown", [
      "idleTimeoutMs",
      "stopTimeoutMs",
      "forcedTerminationReserveMaximumMs",
      "controllerPollIntervalMs",
      "processSignalExitTimeoutMs",
      "processExitPollIntervalMs",
      "resourceDrainAcknowledgementGraceMs",
      "resourceDrainAcknowledgementPollIntervalMs"
    ]);
    const delivery = _DaemonPolicyCodec.section(values, "delivery", [
      "postAcceptanceExecutionReattachmentLimit",
      "resultTransferResumeLimitPerExecutionAttempt"
    ]);
    const output = _DaemonPolicyCodec.section(values, "output", [
      "maximumChunkRawBytes",
      "inlineRawBytes",
      "maximumResultRawBytes",
      "maximumAggregateSpoolRawBytes"
    ]);
    const resources = _DaemonPolicyCodec.section(values, "resources", [
      "effectiveMemoryBytes",
      "hardProcessRssBytes",
      "softProcessRssBytes",
      "resumeProcessRssBytes",
      "workerMaxOldGenerationSizeMiB",
      "supervisionIntervalMs",
      "replacementWindowMs",
      "replacementLimit",
      "workerHeapSampleIntervalMs"
    ]);
    const diagnostics = _DaemonPolicyCodec.section(values, "diagnostics", [
      "logRotateBytes",
      "logBackupCount",
      "maximumQueuedEvents",
      "disconnectedTraceRetentionMs",
      "maximumDisconnectedTraces"
    ]);
    for (const section of [
      transport,
      startup,
      shutdown,
      delivery,
      output,
      resources,
      diagnostics
    ]) {
      for (const value of Object.values(section)) _DaemonPolicyCodec.nonnegativeInteger(value);
    }
    for (const [section, key] of [
      [startup, "heartbeatIntervalMs"],
      [startup, "authorizationPollIntervalMs"],
      [startup, "observationPollIntervalMs"],
      [shutdown, "controllerPollIntervalMs"],
      [shutdown, "processExitPollIntervalMs"],
      [shutdown, "resourceDrainAcknowledgementPollIntervalMs"],
      [resources, "supervisionIntervalMs"],
      [resources, "workerHeapSampleIntervalMs"]
    ]) {
      if (_DaemonPolicyCodec.integer(section, key) <= 0) throw new Error("Invalid daemon policy");
    }
    const hardProcessRssBytes = _DaemonPolicyCodec.integer(resources, "hardProcessRssBytes");
    const softProcessRssBytes = _DaemonPolicyCodec.integer(resources, "softProcessRssBytes");
    const resumeProcessRssBytes = _DaemonPolicyCodec.integer(resources, "resumeProcessRssBytes");
    if (hardProcessRssBytes <= softProcessRssBytes || softProcessRssBytes <= resumeProcessRssBytes) {
      throw new Error("Invalid daemon policy");
    }
    const maximumChunkRawBytes = _DaemonPolicyCodec.integer(output, "maximumChunkRawBytes");
    const inlineRawBytes = _DaemonPolicyCodec.integer(output, "inlineRawBytes");
    const maximumResultRawBytes = _DaemonPolicyCodec.integer(output, "maximumResultRawBytes");
    const maximumAggregateSpoolRawBytes = _DaemonPolicyCodec.integer(
      output,
      "maximumAggregateSpoolRawBytes"
    );
    if (maximumChunkRawBytes === 0 || maximumChunkRawBytes > inlineRawBytes || inlineRawBytes > maximumResultRawBytes || maximumResultRawBytes > maximumAggregateSpoolRawBytes) {
      throw new Error("Invalid daemon policy");
    }
  }
  static section(values, name, keys) {
    const section = values[name];
    if (!_DaemonPolicyCodec.isRecord(section)) throw new Error("Invalid daemon policy");
    _DaemonPolicyCodec.exactKeys(section, keys);
    return section;
  }
  static exactKeys(value, keys) {
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
      throw new Error("Invalid daemon policy");
    }
  }
  static nonnegativeInteger(value) {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new Error("Invalid daemon policy");
    }
  }
  static integer(section, key) {
    const value = section[key];
    _DaemonPolicyCodec.nonnegativeInteger(value);
    return value;
  }
  static isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
};

// ../../worktrees/pr-131-base/packages/daemon/src/policy-testing.ts
var DaemonPolicyTestFactory = class {
  static withOverrides(base, overrides) {
    const values = Object.fromEntries(
      Object.entries(base.values).map(([section, sectionValues]) => [
        section,
        { ...sectionValues, ...overrides[section] }
      ])
    );
    return DaemonPolicy.fromSerialized({ schemaVersion: 1, values });
  }
};
export {
  DaemonNavigationWorkerProtocol,
  DaemonPolicy,
  DaemonPolicyTestFactory,
  DaemonResultChunkCodec,
  OrderedCommandOutput
};
