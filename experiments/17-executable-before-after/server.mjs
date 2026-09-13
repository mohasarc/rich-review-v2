import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { resolve, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const folder = fileURLToPath(new URL('.', import.meta.url));
const scenarios = ['refresh', 'failed-refresh', 'release-real', 'release-hold', 'release-reject', 'failures'];
const presets = JSON.parse(readFileSync(join(folder, 'fixtures/presets.json')));
const port = Number(process.env.EXPERIMENT_PORT || 4717);

export function validateInput(input) {
  if (!input || !scenarios.includes(input.scenario)) throw new Error('Choose a known scenario.');
  if (!Number.isInteger(input.repeats) || input.repeats < 2 || input.repeats > 6) throw new Error('Repeat count must be between 2 and 6.');
  if (!input.files || Object.getPrototypeOf(input.files) !== Object.prototype) throw new Error('Fixture files must be an object.');
  const entries = Object.entries(input.files);
  if (entries.length < 1 || entries.length > 8) throw new Error('Use 1–8 fixture files.');
  for (const [path, source] of entries) {
    if (!/^src\/[a-zA-Z0-9_/-]+\.tsx?$/.test(path) || path.includes('..')) throw new Error('Use a TypeScript path under src/.');
    if (typeof source !== 'string' || source.length > 12000) throw new Error('Each source file must contain at most 12,000 characters.');
  }
  for (const field of ['targetFile', 'callerFile']) if (!Object.hasOwn(input.files, input[field])) throw new Error(`${field} must name a fixture file.`);
  for (const field of ['target', 'caller']) if (typeof input[field] !== 'string' || !/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/.test(input[field])) throw new Error(`${field} must be a symbol name.`);
  return { files: input.files, targetFile: input.targetFile, target: input.target, callerFile: input.callerFile, caller: input.caller, repeats: input.repeats, scenario: input.scenario };
}

export function runVersion(version, input) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(process.execPath, [join(folder, 'runner.mjs'), version], { cwd: folder, stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => { child.kill(); rejectRun(new Error(`${version} execution exceeded 30 seconds.`)); }, 30000);
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', error => { clearTimeout(timer); rejectRun(error); });
    child.stdin.on('error', () => {});
    child.on('close', code => {
      clearTimeout(timer);
      if (code !== 0) return rejectRun(new Error(`${version} runner exited ${code}: ${stderr.slice(-3000)}`));
      try { resolveRun(JSON.parse(stdout)); } catch { rejectRun(new Error(`Invalid ${version} runner output: ${stdout.slice(0,200)}`)); }
    });
    child.stdin.end(JSON.stringify(input));
  });
}

export async function runPair(rawInput) {
  const input = validateInput(rawInput);
  const startedAt = new Date().toISOString();
  const start = performance.now();
  const results = await Promise.allSettled(['base', 'head'].map(version => runVersion(version, input)));
  const failures = results.filter(result => result.status === 'rejected');
  if (failures.length) throw new Error(failures.map(result => result.reason.message).join('\n'));
  return { id: randomUUID(), startedAt, elapsedMs: Math.round(performance.now() - start), input, base: results[0].value, head: results[1].value };
}

async function serve() {
  if (!process.argv.includes('--skip-build')) {
    for (const version of ['base', 'head']) {
      console.log(`Build ${version} worktree (build output only)`);
      execFileSync('pnpm', ['build'], { cwd: resolve(folder, '../../worktrees', `pr-127-${version}`), stdio: 'inherit' });
    }
  }
  let active = 0;
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.md': 'text/plain', '.patch': 'text/plain', '.png': 'image/png', '.ts': 'text/plain', '.txt': 'text/plain' };
  const server = createServer(async (request, response) => {
    const send = (status, body, type = 'application/json') => {
      response.writeHead(status, { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      response.end(type === 'application/json' && !Buffer.isBuffer(body) ? JSON.stringify(body) : body);
    };
    try {
      const url = new URL(request.url, `http://127.0.0.1:${port}`);
      if (request.method === 'GET' && url.pathname === '/api/meta') return send(200, { live: true, presets, scenarios });
      if (request.method === 'POST' && url.pathname === '/api/run') {
        if (!request.headers['content-type']?.startsWith('application/json')) return send(415, { error: 'Use JSON input.' });
        if (request.headers.origin && request.headers.origin !== `http://${request.headers.host}`) return send(403, { error: 'Use the local page.' });
        if (active >= 2) return send(429, { error: 'Two runs are already executing. Try again shortly.' });
        let body = '';
        for await (const chunk of request) { body += chunk; if (body.length > 110000) return send(413, { error: 'Fixture is too large.' }); }
        let input;
        try { input = validateInput(JSON.parse(body)); } catch (error) { return send(400, { error: error.message }); }
        active++;
        try { send(200, await runPair(input)); } finally { active--; }
        return;
      }
      if (request.method !== 'GET') return send(405, { error: 'Method unavailable.' });
      const relative = decodeURIComponent(url.pathname === '/' ? 'index.html' : url.pathname.slice(1));
      if (relative.split('/').some(part => part === '..' || part.startsWith('.')) || !/^[a-zA-Z0-9_/.-]+$/.test(relative)) return send(404, { error: 'Not found.' });
      const path = join(folder, relative);
      try { send(200, readFileSync(path), mime[extname(path)] || 'application/octet-stream'); }
      catch { send(404, { error: 'Not found.' }); }
    } catch (error) { send(500, { error: error.message }); }
  });
  server.listen(port, '127.0.0.1', () => console.log(`Executable before / after: http://127.0.0.1:${port}\nCtrl-C stops the server. Runs are kept in browser memory only.`));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await serve();
