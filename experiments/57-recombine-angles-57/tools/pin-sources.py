"""Read immutable git objects; write receipts only inside this experiment."""
from pathlib import Path
import datetime
import hashlib
import json
import subprocess

OUT = Path(__file__).resolve().parents[1]
ROOT = OUT.parents[1]
REPO = ROOT / 'worktrees/pr-148-head'
REVISIONS = {'base': 'ba53c8e1662fd86d198b95321c90d9c9bef10184', 'head': '20838f8dbf413e04767543eb2380d0d114da6c60'}
FILES = {
    'policy-plan': 'plans/005/daemon-policy.md',
    'architecture': 'plans/005/daemon-architecture-functional-spec.md',
    'follow-ups': 'plans/005/daemon-follow-ups-functional-spec.md',
    'cli': 'apps/cli/src/cli.ts',
    'dispatcher': 'apps/cli/src/daemon/daemon-command-dispatcher.ts',
    'live-registry': 'apps/cli/src/daemon/daemon-registry.ts',
    'live-queue': 'apps/cli/src/daemon/workspace-request-queue.ts',
    'entry': 'apps/cli/src/daemon/daemon-entry.ts',
    'old-coordinator': 'apps/cli/src/daemon/workspace-daemon.ts',
    'live-coordinator': 'apps/cli/src/daemon/daemon-process-coordinator.ts',
    'old-worker-test': 'apps/cli/src/daemon/daemon-navigation-worker.test.ts',
    'old-worker': 'apps/cli/src/daemon/daemon-navigation-worker.ts',
    'old-entry-test': 'apps/cli/src/daemon/daemon-entry.test.ts',
    'executor-test': 'apps/cli/src/daemon-executor.test.ts',
    'client-contract': 'packages/daemon/src/client/daemon-client-contracts.ts',
    'admission': 'packages/daemon/src/daemon-admission.ts',
    'client': 'packages/daemon/src/client/daemon-client.ts',
    'runtime': 'packages/daemon/src/client/daemon-client-runtime.ts',
    'package-entry': 'packages/daemon/src/process-entry.ts',
    'startup': 'packages/daemon/src/registry/startup-coordinator.ts',
    'routing': 'packages/daemon/src/client/daemon-routing-policy.ts',
    'client-test': 'packages/daemon/src/client/daemon-client.test.ts',
    'public-test': 'packages/daemon/src/client/daemon-client-public.test.ts',
    'control-test': 'packages/daemon/src/client/daemon-client-control.test.ts',
    'coordinator': 'packages/daemon/src/process/process-coordinator.ts',
    'construction-test': 'packages/daemon/src/process/process-coordinator-construction.test.ts',
    'requests-test': 'packages/daemon/src/process/process-coordinator-requests.test.ts',
    'registry': 'packages/daemon/src/registry/registry.ts',
    'queue': 'packages/daemon/src/execution/request-queue.ts',
    'clock': 'packages/daemon/src/lifecycle/daemon-clock.ts',
    'clock-test': 'packages/daemon/src/lifecycle/daemon-clock.test.ts',
    'lifetime': 'packages/daemon/src/lifecycle/daemon-lifetime.ts',
    'worker-test': 'packages/daemon/src/worker/navigation-worker.test.ts',
    'worker': 'packages/daemon/src/worker/navigation-worker.ts',
    'built-entry': 'packages/daemon/test/integration/built-process-entry.test.ts',
    'executor-fixture': 'packages/daemon/test/fixtures/executor-module.mjs',
    'accepted-session': 'packages/daemon/src/execution/accepted-execution-session.ts',
    'delivery-session': 'packages/daemon/src/delivery/delivery-session.ts',
    'freeze-test': 'meta-tests/src/daemon-compatibility-copy.test.ts',
    'manifest': 'packages/daemon/package.json',
    'vitest': 'packages/daemon/vitest.config.ts',
    'host-contract-test': 'packages/daemon/src/host-contract.test.ts',
    'eslint': 'eslint.config.mjs',
    'lint-test': 'meta-tests/src/lint-rule.test.ts',
}

def git(*args):
    return subprocess.check_output(['git', '-C', str(REPO), *args], stderr=subprocess.DEVNULL)

def main():
    folder = OUT / 'receipts/sources'
    folder.mkdir(parents=True, exist_ok=True)
    entries = []
    for version, commit in REVISIONS.items():
        for alias, path in FILES.items():
            try:
                raw = git('show', f'{commit}:{path}')
            except subprocess.CalledProcessError:
                continue
            local = folder / f'{version}-{alias}.txt'
            local.write_bytes(raw)
            entries.append({'id': f'{version}-{alias}', 'revision': commit, 'version': version, 'path': path,
                'blob': git('rev-parse', f'{commit}:{path}').decode().strip(), 'sha256': hashlib.sha256(raw).hexdigest(),
                'lines': len(raw.splitlines()), 'local': str(local.relative_to(OUT))})
    patch = git('diff', REVISIONS['base'], REVISIONS['head'])
    (OUT / 'receipts/pr-148.patch').write_bytes(patch)
    bundle = (ROOT / 'inputs/pr-148/diff.patch').read_bytes()
    doc = {'captured_at': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'revisions': REVISIONS,
        'mode': 'immutable git source reading; no symnav execution', 'patch_sha256': hashlib.sha256(patch).hexdigest(),
        'patch_matches_bundle': patch == bundle, 'files': entries}
    (OUT / 'source-manifest.json').write_text(json.dumps(doc, indent=2)+'\n')
    (OUT / 'receipts/pr.json').write_bytes((ROOT / 'inputs/pr-148/pr.json').read_bytes())
    print(json.dumps({'snapshots': len(entries), 'patch_matches_bundle': patch == bundle, 'captured_at': doc['captured_at']}))

if __name__ == '__main__':
    main()
