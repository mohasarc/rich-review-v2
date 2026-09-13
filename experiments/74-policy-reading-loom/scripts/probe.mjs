import {build} from 'esbuild';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {dirname, resolve} from 'node:path';
import {readFileSync, writeFileSync, mkdirSync, rmSync} from 'node:fs';
import assert from 'node:assert/strict';

const out=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root=resolve(out, '../..');
const model=JSON.parse(readFileSync(resolve(out,'evidence/model.json'),'utf8'));
const results={fixture:'Ten ASCII bytes; head output policy chunk=4, inline=8, result=12, aggregate=24. Base has local defaults. Actual source methods bundled with esbuild; no daemon or socket run.', pins:model.pins, builds:{}};
for(const rev of ['base','head']) {
  const tree=resolve(root,'worktrees/pr-131-'+rev);
  const imports=[
    ['OrderedCommandOutput', 'apps/cli/src/command-execution-result.ts'],
    ['DaemonResultChunkCodec', 'apps/cli/src/daemon/daemon-result-chunk-codec.ts'],
    ['DaemonNavigationWorkerProtocol', 'apps/cli/src/daemon/daemon-navigation-worker-protocol.ts'],
    ['DaemonPolicy', 'packages/daemon/src/daemon-policy.ts'],
    ['DaemonPolicyTestFactory', 'packages/daemon/src/policy-testing.ts'],
  ];
  const entry=imports.map(([name,path])=>`import {${name}} from ${JSON.stringify(resolve(tree,path))};`).join('\n')+'\nexport {'+imports.map(x=>x[0]).join(',')+'};';
  const outfile=resolve(out,'evidence/probe-'+rev+'.mjs');
  await build({stdin:{contents:entry,resolveDir:out,sourcefile:'probe-entry.mjs'},outfile,platform:'node',format:'esm',bundle:true,logLevel:'silent'});
  const {OrderedCommandOutput,DaemonResultChunkCodec,DaemonNavigationWorkerProtocol,DaemonPolicy,DaemonPolicyTestFactory}=await import(pathToFileURL(outfile));
  const policy=DaemonPolicyTestFactory.withOverrides(DaemonPolicy.fromSystemMemory({totalBytes:1024**3}), {output:{maximumChunkRawBytes:4,inlineRawBytes:8,maximumResultRawBytes:12,maximumAggregateSpoolRawBytes:24}});
  const directory=resolve(out,'evidence/probe-temp-'+rev);
  mkdirSync(directory,{recursive:true});
  const capture=new OrderedCommandOutput(rev==='head'?{policy:policy.values.output,directory}:{directory});
  capture.stdout.write('abcdefghij');
  const result=await capture.finish(0);
  const lengths=[], text=[];
  for await(const r of result.output.records()) {lengths.push(r.bytes.byteLength);text.push(Buffer.from(r.bytes).toString());}
  assert.equal(text.join(''),'abcdefghij');
  assert.deepEqual(lengths,rev==='head'?[4,4,2]:[10]);
  await result.output.dispose();
  rmSync(directory,{recursive:true});
  const accept=(fn)=>{try{fn();return 'accepted';}catch(error){return error.message;}};
  const messages=[4,5].map(size=>{
    const bytes=new Uint8Array(size);
    const chunk={transferId:'fixture-transfer',requestId:'fixture-request',offset:0,sequence:0,stream:'stdout',bytes};
    const worker={kind:'output-chunk',generation:1,requestId:'fixture-request',sequence:0,stream:'stdout',bytes};
    return {size,codec:accept(()=>DaemonResultChunkCodec.encode(chunk,4)),worker:accept(()=>DaemonNavigationWorkerProtocol.response(worker,4))};
  });
  assert.equal(messages[0].codec,'accepted'); assert.equal(messages[0].worker,'accepted');
  assert.equal(messages[1].codec==='accepted',rev==='base'); assert.equal(messages[1].worker==='accepted',rev==='base');
  results.builds[rev]={recordBytes:lengths,decoded:text.join(''),messages};
}
writeFileSync(resolve(out,'evidence/probe.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results,null,2));
