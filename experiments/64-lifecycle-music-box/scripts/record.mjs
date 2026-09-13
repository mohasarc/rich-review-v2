import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pins = {base:'a1e325a5ff979bdfa25babc5554621c8c0f20497', head:'64919bcbcf7fcc8202779b78c5f069b24662bb18'};
for (const build of ['base','head']) {
  const worktree = resolve(root, '../../worktrees/pr-127-'+build);
  const git = (...args) => execFileSync('git', ['-C',worktree,...args], {encoding:'utf8'}).trim();
  if (git('rev-parse','HEAD') !== pins[build] || git('status','--porcelain','--untracked-files=no')) throw Error('Unexpected worktree state: '+build);
  for (const scenario of ['release-held','release-held-rejects','release-sync','turn','refresh-fails','late-answer']) {
    process.stdout.write(execFileSync(process.execPath, [resolve(root,'recorder/record-in-process.mjs'), '--build='+build, '--scenario='+scenario, '--out='+resolve(root,`evidence/traces/${scenario}--${build}.json`)], {encoding:'utf8'}));
  }
}
