import subprocess, json, os
SYMNAV = os.path.expanduser('~/projects/symnav')
SNAPS = [('main', 'b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e')]
PARTS = [(123,'01-source-cache'),(124,'02-transactional-backend-state'),(126,'03-project-membership-graph'),(127,'04-query-cache-lifecycle'),(128,'05-workspace-session'),(129,'06-state-directory-ownership'),(130,'07-daemon-package-policy-snapshot'),(131,'08-daemon-policy-consumers'),(132,'09-command-vocabulary'),(133,'10-execution-failure-vocabulary'),(134,'11-admission-rejection'),(135,'12-injected-host-module'),(136,'13-lifecycle-renderer'),(137,'14-transport-framing'),(138,'15'),(139,'16-socket-client'),(140,'17-lifecycle-client'),(141,'18'),(142,'19'),(143,'20'),(144,'21'),(145,'22'),(146,'23'),(147,'24'),(148,'25'),(149,'28')]
def git(*a):
    return subprocess.run(['git','-C',SYMNAV,*a],capture_output=True,text=True,check=True).stdout
for n,b in PARTS:
    sha = git('rev-parse', f'origin/agent/daemon-architecture-refactor-part-{b}').strip()
    SNAPS.append((f'#{n}', sha))
if __name__ == '__main__':
    for label, sha in SNAPS:
        files = git('ls-tree','-r','--name-only',sha).splitlines()
        cli = [f for f in files if f.startswith('apps/cli/src/daemon/')]
        pkg = [f for f in files if f.startswith('packages/daemon/')]
        pkgsrc = [f for f in pkg if f.startswith('packages/daemon/src/')]
        print(label, sha[:10], 'cli/src/daemon', len(cli), 'packages/daemon', len(pkg), 'src', len(pkgsrc))
