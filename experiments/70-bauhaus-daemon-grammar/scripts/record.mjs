import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const out=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const root=resolve(out,'../..');
const pins={base:'b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e',head:'b100221db48754656328391b878299c5a0bab443'};
const recording={kind:'Actual compiled methods with controlled inputs. Timers captured, no process signalled and no daemon launched.',pins,runs:[]};
for (const side of ['base','head']) {
  const wt=resolve(root,'worktrees',`pr-131-${side}`);
  assert.equal(execFileSync('git',['rev-parse','HEAD'],{cwd:wt,encoding:'utf8'}).trim(),pins[side]);
  const load=async path=>import(pathToFileURL(resolve(wt,path)));
  const {DaemonPolicy}=await load('packages/daemon/dist/daemon-policy.js');
  const {DaemonPolicyTestFactory}=await load('packages/daemon/dist/policy-testing.js');
  const resources=await load('apps/cli/dist/daemon/daemon-resource-monitor.js');
  const {NodeDaemonProcessTerminator}=await load('apps/cli/dist/daemon/daemon-process-launcher.js');
  const {DaemonRegistry}=await load('apps/cli/dist/daemon/daemon-registry.js');
  const policy=DaemonPolicy.fromSystemMemory({totalBytes:1024**3});
  const custom=DaemonPolicyTestFactory.withOverrides(policy,{resources:{supervisionIntervalMs:17,hardProcessRssBytes:103,softProcessRssBytes:102,resumeProcessRssBytes:101},shutdown:{processSignalExitTimeoutMs:37,processExitPollIntervalMs:3},startup:{coordinationGraceMs:100}});
  const recorded={side,defaults:{},custom:{},validation:{}};
  for (const flavor of ['defaults','custom']) {
    const usePolicy=flavor==='defaults'?policy:custom;
    const calls=[]; const realSet=globalThis.setInterval,realClear=globalThis.clearInterval;
    const callbacks={generation:1,residentMemoryBytes:()=>0,spoolBytes:()=>0,scheduleAtTurnBoundary:fn=>fn(),releaseTransientResources:async()=>{},replaceWorker:async()=>2,drain:async()=>{}};
    const options=side==='head'?{...callbacks,policy:usePolicy.values.resources}:{...callbacks,policy:resources.DaemonResourcePolicy.fromSystemMemory(1024**3),...(flavor==='custom'?{intervalMs:17}:{})};
    try {
      globalThis.setInterval=(fn,ms)=>{calls.push(ms);return {unref(){}};};
      globalThis.clearInterval=()=>{};
      const supervisor=new resources.DaemonResourceSupervisor(options);supervisor.start();supervisor.stop();
    } finally {globalThis.setInterval=realSet;globalThis.clearInterval=realClear;}
    const terminator=side==='head'?new NodeDaemonProcessTerminator(usePolicy.values.shutdown):flavor==='custom'?new NodeDaemonProcessTerminator(37,3):new NodeDaemonProcessTerminator();
    const registry=side==='head'?new DaemonRegistry('/unused-recording-path',usePolicy.values.startup):new DaemonRegistry('/unused-recording-path');
    const grace=flavor==='custom'?100:15000;
    const owner={heartbeatAt:0};
    recorded[flavor]={resourceIntervalMs:calls[0],terminatorStoredMs:[terminator.gracefulTimeoutMs,terminator.pollIntervalMs],registryWithinAt151:registry.startupOwnerIsWithinGrace(owner,side==='base'&&flavor==='custom'?100:undefined,151),registryExplicit200At151:registry.startupOwnerIsWithinGrace(owner,200,151),registryBoundaryInclusive:registry.startupOwnerIsWithinGrace(owner,side==='base'&&flavor==='custom'?100:undefined,grace)};
  }
  for (const [key,overrides] of Object.entries({zeroCadence:{resources:{supervisionIntervalMs:0}},equalThresholds:{resources:{hardProcessRssBytes:102,softProcessRssBytes:102,resumeProcessRssBytes:101}}})) {
    try {DaemonPolicyTestFactory.withOverrides(policy,overrides);recorded.validation[key]='accepted';} catch(e){recorded.validation[key]=e.message;}
    assert.equal(recorded.validation[key],'Invalid daemon policy');
  }
  assert.equal(recorded.defaults.resourceIntervalMs,250); assert.equal(recorded.custom.resourceIntervalMs,17);
  assert.deepEqual(recorded.defaults.terminatorStoredMs,[500,20]);assert.deepEqual(recorded.custom.terminatorStoredMs,[37,3]);
  assert.equal(recorded.custom.registryWithinAt151,false);assert.equal(recorded.custom.registryExplicit200At151,true);
  assert.equal(recorded.defaults.registryBoundaryInclusive,true);
  recording.runs.push(recorded);
}
writeFileSync(resolve(out,'evidence/recordings.json'),JSON.stringify(recording,null,2)+'\n');
writeFileSync(resolve(out,'evidence/recordings.js'),'window.RECORDINGS = '+JSON.stringify(recording)+';\n');
console.log('Captured default/custom input consumption and factory validation on both pinned builds. No wall-clock or daemon parity measurement.');
