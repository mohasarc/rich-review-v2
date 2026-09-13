(function (root) {
  'use strict';
  const owners = [
    { id: 'cli', name: 'CLI / host', subtitle: 'Syntax · environment · wiring · printing' },
    { id: 'daemon', name: '@symnav/daemon', subtitle: 'Client · process · worker · bytes' },
    { id: 'core', name: '@symnav/core', subtitle: 'Language-neutral workspace mechanisms' },
    { id: 'typescript', name: 'TypeScript backend', subtitle: 'Toolchain-specific meaning' },
    { id: 'renderer', name: '@symnav/renderer', subtitle: 'Text and JSON formatting' },
    { id: 'telemetry', name: '@symnav/telemetry', subtitle: 'Usage capture and aggregation' }
  ];
  const pieces = [
    ['source', 'Source-byte cache', 'typescript', 'core', '123.1'],
    ['revision', 'Revision + index publication', 'typescript', 'core', '124.2'],
    ['projects', 'Membership + input invalidation', 'typescript', 'core', '126.1'],
    ['turns', 'Six-cache lifetime', 'typescript', 'core', '127.1'],
    ['session', 'Retained workspace session', 'cli', 'core', '128.1'],
    ['syntax', 'tsconfig + semantic query bodies', 'typescript', 'typescript', '126.1'],
    ['path', 'Canonical state-directory resolution', 'telemetry', 'cli', '129.1'],
    ['usage', 'Usage log path + events', 'telemetry', 'telemetry', '129.2'],
    ['policy', 'All daemon thresholds', 'cli', 'daemon', '131.1'],
    ['control', 'Routing + registry + clock', 'cli', 'daemon', '148.2'],
    ['transport', 'Sockets + protocol + result receipt', 'cli', 'daemon', '149.4'],
    ['process', 'Queue + generations + delivery', 'cli', 'daemon', '147.2'],
    ['argv', 'Classify argv + find workspace root', 'cli', 'cli', '149.1'],
    ['executor', 'Concrete command executor', 'cli', 'cli', '135.1'],
    ['lifecycle', 'Lifecycle report formatting', 'cli', 'renderer', '136.1']
  ].map(([id, name, before, after, ref]) => ({ id, name, before, after, ref }));

  const stations = [
    { id: 'owners', n: '01', name: 'Move the owners', verb: 'Rebuild the package map', group: 'package', refs: ['123.1','126.1','129.1','135.1','136.1','148.1','149.1'],
      goal: 'Start with main’s responsibilities. Place every piece with its final owner, then route a request.',
      rules: [
        'Core gains source caching, revision/index transactions, project membership, turn-cache lifetime, and WorkspaceSession. TypeScript keeps tsconfig and semantic algorithms.',
        'CLI keeps argv classification, workspace-root discovery, state-directory resolution, concrete executor composition, output selection and writes. Telemetry keeps usage logic.',
        'Daemon gains routing, policy, registry, clocks, sockets, protocol, workers, execution, delivery, and spooling. Renderer gains lifecycle report formatting.',
        'Core, daemon, and telemetry have no internal package dependencies. Backend → core; renderer → core and daemon; CLI → all five. Tests may additionally use testing utilities.',
        'The daemon loads the host executor by an injected absolute file URL. That runtime handoff does not add a static daemon → CLI/core dependency. #148 stages copies; #149 switches the caller and removes them.'
      ] },
    { id: 'cache', n: '02', name: 'Keep the turn', verb: 'Separate three lifetimes', group: 'workspace', refs: ['123.2','124.2','124.3','126.5','127.2','127.3','127.4','128.2'],
      goal: 'Survive a failed revision preparation, publish the retry, begin its query turn, and release transient resources while retaining the session.',
      rules: [
        'A revisioned index candidate is validated before toolchain commit and portable publication. Failure preserves that published index; ensureFiles commits one file at a time, retaining earlier progress.',
        'ProjectGraph has its own validated publication transaction. This is not one atomic transaction across the whole backend or WorkspaceSession.',
        'A failed refresh does not begin a semantic turn. A successful refresh begins the next turn and clears all six caches synchronously.',
        'Within a turn, caches distinguish missing from cached undefined, preserve value/Promise identity and rejected Promises, and do not store a synchronous creator throw.',
        'Release clears semantic caches before awaiting project cleanup, including when cleanup rejects. Session identity and reusable backend state survive; later releases can retry.',
        'A selection opens fresh discovery without reconciling retained siblings. Source-byte caching still replaces its supplied snapshot and evicts omitted bytes; the prepared-file index has separate selection retention.'
      ] },
    { id: 'gates', n: '03', name: 'First gate wins', verb: 'Stop before the next side effect', group: 'policy', refs: ['132.3','132.4','132.5','133.2','134.1','134.3','148.2'],
      goal: 'Arrange admission and routing guards. Send all arrivals through each lane and observe which later checks never happen.',
      rules: [
        'Admission order is authentication → worker ready → resources not paused → queue accepting → duplicate compatibility. First failure ends evaluation; failed authentication disconnects without a rejection frame.',
        'not-ready, resource-pressure, and draining allow local retry; incompatible does not. Retry safety is derived from the rejection code. A contradictory wire boolean is corruption.',
        'Client routing reads a record, checks not starting, checks version, then probes responsiveness. Missing → cold/absent; starting → cold/starting; wrong version → fallback/incompatible; responsive compatible ready peer → warm.',
        'Observation failures/unresponsive peers → cold/recovering; an exited peer permits conditional cleanup and fallback/dead. Daemon-disabled invocations bypass routing observation.',
        'CLI classifies commandName once, separately from opaque argv. Duplicate compatibility includes that name. Generation 4 → 5 makes explicit command metadata mandatory; mixed versions use compatibility handling before execution.',
        'Outer execution failures and worker failures remain separate vocabularies. Ordered classification preserves existing failure strings and client outcomes.'
      ] },
    { id: 'worker', n: '04', name: 'Hand off the worker', verb: 'Keep one FIFO turn and one identity', group: 'sessions', refs: ['144.3','144.4','145.3','145.4','145.5','146.3','147.1','147.4','147.5'],
      goal: 'Attach a duplicate A, complete and deliver A, sample resources, replace generation 1, fence its late exit, then run and deliver B.',
      rules: [
        'The ledger owns immutable acceptance metadata. Matching duplicates attach to accepted work without a new execution, queue position, trace, clock read, or idle reset; conflicting duplicates are rejected earlier.',
        'AcceptedExecutionSession composes ledger, queue, worker, delivery, resources, and process-lifecycle ports. Those dependencies keep their own state; FIFO work waits for the latest attached delivery, then boundary sampling gates the next turn.',
        'WorkerGenerationManager shares one replacement operation: mark not ready, start the next generation, await termination of the old worker, then publish the new ready report. Old-generation exits cannot trigger recovery.',
        'Initial readiness activation waits for warm-up sampling. After initial activation, replacement protocol-ready publication restores worker readiness. ResourceSupervisor separately completes replacement bookkeeping, reopens admission, and settles the boundary sample. Already-accepted B waits for that sample, not another admission pass.',
        'Graceful close and forced termination have separate shared operations, so force can interrupt a blocked close. Resource policy owns replacement windows and the recovery circuit.',
        'Activity is a pure snapshot projection with explicit clocks. It shows the worker’s in-progress generation, sampled spool usage, and the last fileCount in legacy pong even while readiness is false.'
      ] },
    { id: 'transfer', n: '05', name: 'Recover the last record', verb: 'Move bytes without replaying work', group: 'transport', refs: ['131.3','137.2','138.2','138.3','138.4','138.5','142.2','142.3','142.5','146.5'],
      goal: 'Recover a disconnected accepted result, verify it, acknowledge it, replay its output, and dispose the client capture. Try both recovery scopes.',
      rules: [
        'The socket client owns pull-based reads and FIFO writes with backpressure; the server serializes each connection independently and shares an escalating shutdown operation. Codec/validator own framing, integrity, shape, and correlation.',
        'Control connections decode JSON; execution-transfer connections also decode binary chunks. Lifecycle JSON and execution-control JSON have distinct capacities. Decoders are fresh on each connection.',
        'One receiver retains manifest identity, digest progress, and a contiguous record offset across fetches. Offset advances only after awaited output append; fetch starts at the first record not durably captured.',
        'A fetch continues the current capture. Reattaching identical accepted execution creates a fresh capture and receiver, disposes interrupted output, and keeps the same daemon request identity without local replay.',
        'Default budgets are one fetch resume per execution attempt and one accepted-execution reattachment. A reattached attempt gets its own fetch allowance. Exhausted fetches preserve accepted-corruption failure; acceptance has no completion deadline.',
        'Manifest identity, record count, byte total and digest must match before success. Client acknowledgement uses the lifecycle client; failure disposes output. Successful finish transfers capture ownership to the caller, who eventually disposes it.',
        'Server acknowledgement attempts physical spool cleanup before logical ledger acknowledgement; cleanup failure is diagnostic and does not withhold protocol success. Acknowledged ledger identity still remains; eviction is deferred.'
      ] }
  ];

  const laneDefs = {
    admission: {
      order: ['authentication','ready','resources','queue','compatibility'],
      labels: { authentication:'Authenticated?', ready:'Worker ready?', resources:'Resources unpaused?', queue:'Queue accepting?', compatibility:'Duplicate compatible?' },
      shuffled: ['resources','compatibility','ready','authentication','queue'],
      cases: [
        { name:'Unknown caller', fail:['authentication','ready','resources','queue','compatibility'], result:'disconnect / authentication', effect:'No rejection frame' },
        { name:'Worker warming', fail:['ready','resources','queue','compatibility'], result:'reject / not-ready', effect:'Local retry allowed' },
        { name:'Memory paused', fail:['resources','queue','compatibility'], result:'reject / resource-pressure', effect:'Local retry allowed' },
        { name:'Queue draining', fail:['queue','compatibility'], result:'reject / draining', effect:'Local retry allowed' },
        { name:'Conflicting duplicate', fail:['compatibility'], result:'reject / incompatible', effect:'No local retry' },
        { name:'Matching duplicate', fail:[], result:'attach existing', effect:'No new queue turn' }
      ],
      results: { authentication:'disconnect / authentication', ready:'reject / not-ready', resources:'reject / resource-pressure', queue:'reject / draining', compatibility:'reject / incompatible' }
    },
    routing: {
      order: ['record','starting','version','responsive'],
      labels: { record:'Record present?', starting:'Not starting?', version:'Version compatible?', responsive:'Responsive?' },
      shuffled: ['responsive','version','record','starting'],
      cases: [
        {name:'No record',fail:['record','starting','version','responsive'],result:'cold / absent',effect:'No probe'},
        {name:'Starting, old version',fail:['starting','version','responsive'],result:'cold / starting',effect:'No probe'},
        {name:'Ready, old version',fail:['version','responsive'],result:'fallback / incompatible',effect:'No probe'},
        {name:'Ready, compatible, silent',fail:['responsive'],result:'cold / recovering',effect:'One observation'},
        {name:'Ready and responsive',fail:[],result:'warm',effect:'One observation'}
      ],
      results: {record:'cold / absent',starting:'cold / starting',version:'fallback / incompatible',responsive:'cold / recovering'}
    }
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function initial(id, mode) {
    if(id==='owners') return {placements:Object.fromEntries(pieces.map(p=>[p.id,p.before])),done:false};
    if(id==='cache') return {phase:'live',attempt:0,published:7,turn:7,caches:true,session:'session α',release:'idle',probes:0,done:false};
    if(id==='gates') return {lane:mode||'admission',orders:Object.fromEntries(Object.entries(laneDefs).map(([k,v])=>[k,[...v.shuffled]])),reports:{},solved:{},done:false};
    if(id==='worker') return {a:'running',b:'queued',generation:1,ready:true,admissionPaused:false,duplicate:false,sampledA:false,recoverySettled:false,sampledB:false,replacing:false,oldTerminated:false,newReport:false,lateIgnored:false,done:false};
    if(id==='transfer') return {
      mode:mode||'fetch',request:'request A',executions:1,capture:1,decoder:1,
      durable:mode==='reattach'?1:2,pending:mode==='reattach'?null:2,connected:false,
      manifest:mode!=='reattach',needsReattach:mode==='reattach',fetchUsed:mode==='reattach'?1:0,
      reattachUsed:0,verified:false,acked:false,replayed:false,disposed:false,cleanupError:false,
      stopped:false,done:false,fetchSeen:false
    };
    throw new Error('Unknown station '+id);
  }

  function transition(id, previous, action, value) {
    const s=clone(previous);
    const tell=(message, changed=true, tone='event')=>({state:changed?s:previous,message,tone,changed});
    const block=message=>tell(message,false,'blocked');
    if(id==='owners') {
      if(action==='place') { const [piece,owner]=value.split(':'); if(!pieces.some(p=>p.id===piece)||!owners.some(o=>o.id===owner))return block('Choose a piece and a package.'); s.placements[piece]=owner;s.done=false;return tell(pieces.find(p=>p.id===piece).name+' now sits in '+owners.find(o=>o.id===owner).name+'. Run the route to inspect the boundary.'); }
      if(action==='run') {
        const stranded=pieces.filter(p=>s.placements[p.id]!==p.after);
        if(stranded.length) {const p=stranded[0];return block(p.name+' is still in '+owners.find(o=>o.id===s.placements[p.id]).name+'. The tip assigns it to '+owners.find(o=>o.id===p.after).name+' ('+p.ref+'). The illustrated route stops at this ownership seam.');}
        s.done=true;return tell('The final map carries the request: CLI → DaemonClient → worker → injected host executor → core/TypeScript → output. The daemon imports no internal package.',true,'complete');
      }
    }
    if(id==='cache') {
      if(action==='prepare') {if(!['live','failed'].includes(s.phase))return block('Finish or fail the current candidate first.');s.phase='candidate';s.attempt++;return tell('Revision 8 is a candidate. Published index and semantic turn remain 7.');}
      if(action==='validate') {if(s.phase!=='candidate')return block('Prepare a candidate before validation.');if(s.attempt===1){s.phase='failed';return tell('The supplied first candidate fails validation. It rolls back; index 7 and turn-7 answers remain. This puzzle injects one failure.',true,'event');}s.phase='validated';return tell('The retry candidate passes validation. It can now commit.');}
      if(action==='commit') {if(s.phase!=='validated')return block('Portable publication follows candidate validation and toolchain commit.');s.published=8;s.phase='published';return tell('The toolchain commits and the revisioned index publishes revision 8. This model omits the independent project-graph transaction.');}
      if(action==='begin') {if(s.phase!=='published')return block('A failed or pending refresh does not begin a semantic turn. Current answers stay available.');s.turn=8;s.caches=false;s.phase='turn';return tell('Successful refresh begins turn 8. All six cache handles survive, but their entries clear synchronously.');}
      if(action==='probe') {if(s.phase!=='turn')return block('Begin the successful turn before this toy query probe.');s.probes=1;s.caches=true;return tell('Two lookups of the same key create one cached undefined value: has(key) is true. The six caches still have separate key spaces.');}
      if(action==='release') {if(!['turn','released'].includes(s.phase))return block('Finish the refresh/turn sequence before the release exercise.');s.caches=false;s.release='pending';s.phase='releasing';return tell('Entries clear now. Project release is still awaiting cleanup; session α and index 8 remain.');}
      if(action==='settle') {if(s.phase!=='releasing')return block('Begin release first.');s.release='rejected';s.phase='released';s.done=true;return tell('Injected cleanup rejection arrives. Caches stay empty; session α and index 8 survive. Release can be tried again.',true,'complete');}
    }
    if(id==='gates') {
      if(action==='lane') {if(!laneDefs[value])return block('Unknown lane.');s.lane=value;return tell('Opened '+value+' guards. Both lanes were available from the start.');}
      if(action==='swap') {const [from,to]=value.split(':').map(Number);const a=s.orders[s.lane];if(!Number.isInteger(from)||!Number.isInteger(to)||from<0||to<0||from>=a.length||to>=a.length)return block('Choose two guard positions.');[a[from],a[to]]=[a[to],a[from]];s.reports[s.lane]=[];s.solved[s.lane]=false;s.done=false;return tell('Guard positions exchanged. Send arrivals to see the first stopping gate.');}
      if(action==='run') {const def=laneDefs[s.lane];s.reports[s.lane]=def.cases.map(c=>{const stop=s.orders[s.lane].find(g=>c.fail.includes(g));const checked=stop?s.orders[s.lane].slice(0,s.orders[s.lane].indexOf(stop)+1):s.orders[s.lane];const result=stop?def.results[stop]:c.result;return {name:c.name,stop,checked,result,expected:c.result};});s.solved[s.lane]=s.orders[s.lane].every((g,i)=>def.order[i]===g);s.done=!!(s.solved.admission&&s.solved.routing);return tell(s.solved[s.lane]?'The '+s.lane+' lane follows the stack’s first-failure order. Later checks stay untouched.':'This ordering reaches a different first failure. Compare the route traces with the open contract, then exchange two guards.',true,s.done?'complete':'event');}
    }
    if(id==='worker') {
      if(action==='duplicate') {if(!s.ready||s.admissionPaused)return block('A new duplicate connection still meets the admission guards. Wait for worker readiness and resource admission before attaching it.');s.duplicate=true;return tell('Duplicate A attaches. A retains its original acceptedAt and queuePosition; execution count and idle anchor do not change.');}
      if(action==='finish-a') {if(s.a!=='running')return block('A is no longer running.');s.a='awaiting delivery';return tell('A’s computation finished. Accepted execution still waits for the latest attached delivery.');}
      if(action==='deliver-a') {if(s.a!=='awaiting delivery')return block('Finish A’s computation first.');s.a='delivered';return tell('The latest A stream settles. Boundary resource sampling must precede B.');}
      if(action==='sample-a') {if(s.a!=='delivered')return block('The active turn still owns its delivery barrier.');if(s.sampledA)return block('A’s boundary sample already settled. Continue the replacement handoff.');s.sampledA=true;s.admissionPaused=true;return tell('Boundary sampling observes the puzzle’s supplied pressure event. Resource admission pauses and policy requests replacement before B. Worker readiness is separate.');}
      if(action==='replace') {if(!s.sampledA||s.generation!==1)return block('Replace generation 1 after A’s boundary sample.');s.generation=2;s.replacing=true;s.ready=false;return tell('One replacement operation starts generation 2 before awaiting generation 1’s termination. Activity can already name generation 2.');}
      if(action==='old-exit') {if(s.generation!==2)return block('Generation 1 is still current. Its exit would not be a stale event.');s.lateIgnored=true;return tell('Late exit from generation 1 is fenced: it is no longer current and does not request another recovery.');}
      if(action==='terminate-old'||action==='ready-new') {
        if(!s.replacing)return block('Start the replacement operation first.');
        if(action==='terminate-old')s.oldTerminated=true;else s.newReport=true;
        if(s.oldTerminated&&s.newReport){s.ready=true;s.replacing=false;return tell('Old termination settled and generation 2’s report is ready. Readiness was activated during initial startup, so replacement publication restores it.');}
        return tell(s.newReport?'The new report has arrived, but replacement still awaits old-worker termination.':'Old-worker termination settled. Replacement still awaits generation 2’s ready report.');
      }
      if(action==='settle-recovery') {if(s.generation!==2||!s.ready)return block('Wait for the generation manager’s replacement to settle.');s.admissionPaused=false;s.recoverySettled=true;return tell('ResourceSupervisor completes its replacement bookkeeping and reopens admission. The boundary sample now settles; already-accepted B can proceed without another admission pass.');}
      if(action==='start-b') {if(s.a!=='delivered'||!s.sampledA||s.generation!==2||!s.ready||!s.recoverySettled)return block('B waits for A’s current delivery and for the boundary sample, including its replacement recovery, to settle. It is already accepted.');if(s.b!=='queued')return block('B already owns or completed its turn.');s.b='running';return tell('B takes the next FIFO turn on generation 2. A has still executed only once.');}
      if(action==='finish-b') {if(s.b!=='running')return block('Start B’s turn first.');s.b='awaiting delivery';return tell('B’s computation finished; its delivery barrier remains.');}
      if(action==='deliver-b') {if(s.b!=='awaiting delivery')return block('Finish B’s computation first.');s.b='delivered';return tell('B’s stream settles. Its boundary sample still precedes the next possible turn.');}
      if(action==='sample-b') {if(s.b!=='delivered')return block('Deliver B before sampling its turn boundary.');s.sampledB=true;return tell('B’s boundary sample settles. Queue is idle; existing acceptance-based idle timing is preserved.');}
      if(action==='inspect') {s.done=s.duplicate&&s.sampledB&&s.lateIgnored;return s.done?tell('The handoff is complete. Two original requests; one execution each. Duplicate identity, delivery barriers, and generation fencing survived.',true,'complete'):block('The exercise also asks you to attach duplicate A and inject the stale generation-1 exit. Both are safe to demonstrate now.');}
    }
    if(id==='transfer') {
      if(s.stopped)return block('This delivery terminated. Use Undo or Restart to try another move; no local replay is allowed.');
      if(action==='local-replay')return block('Acceptance already happened. Running the command locally would be a second execution. Recover the accepted identity or surface a controlled failure.');
      if(action==='append') {if(s.pending===null)return block('No captured record is waiting for append.');s.durable++;s.pending=null;return tell('Awaited append settles. Durable next offset is now '+s.durable+'; receiving a frame alone did not advance it.');}
      if(action==='reattach') {if(!s.needsReattach)return block('This interruption has a resumable manifest. Continue this receiver with fetch.');if(s.reattachUsed>=1)return block('The accepted-execution reattachment budget is exhausted.');s.reattachUsed++;s.fetchUsed=0;s.capture++;s.decoder++;s.durable=0;s.pending=null;s.manifest=false;s.connected=true;s.needsReattach=false;return tell('The same accepted request reattaches. Interrupted capture is disposed; a fresh capture/receiver starts at 0 with its own fetch allowance. Executions remain 1.');}
      if(action==='fetch') {if(s.needsReattach)return block('This scenario has an accepted-close requiring identical-request reattachment first.');if(s.pending!==null)return block('Wait for the in-flight append before choosing the first durably missing record.');if(s.connected)return block('The current connection is still open.');if(s.fetchUsed>=1){s.stopped=true;s.disposed=true;return tell('Fetch budget exhausted: accepted corruption is surfaced, partial output disposed, and execution is not replayed. Undo can rewind this illustrative move.',true,'event');}if(Number(value)!==s.durable)return block('Fetch offset '+value+' disagrees with durable next offset '+s.durable+'. Earlier records are already captured; later offsets skip output.');s.fetchUsed++;s.fetchSeen=true;s.connected=true;s.decoder++;s.manifest=false;return tell('Fetch resumes capture '+s.capture+' at record '+s.durable+'. Same receiver and digest progress; fresh connection decoder '+s.decoder+'.');}
      if(action==='manifest') {if(!s.connected)return block('Connect with fetch or reattachment first.');if(s.manifest)return block('This connection already has its manifest.');s.manifest=true;return tell('The correlated manifest matches request A and transfer T: four ordered records with the same byte total and digest seal.');}
      if(action==='bad-manifest') {if(!s.connected)return block('Open a connection first.');s.stopped=true;s.disposed=true;return tell('A different transfer manifest terminates receipt as corruption. Partial output is disposed. Accepted execution is not replayed.',true,'event');}
      if(action==='receive') {if(!s.connected||!s.manifest)return block('This connection needs a matching manifest before result chunks.');if(s.pending!==null)return block('Await the current append before consuming the next record.');if(s.durable>=4)return block('All four records are durable. Verify the terminal frame and digest.');s.pending=s.durable;return tell('Record '+s.pending+' arrives in order. Its append is pending; durable offset remains '+s.durable+'.');}
      if(action==='disconnect') {if(!s.connected||s.verified)return block('Disconnect an active, unfinished connection.');s.connected=false;s.manifest=false;return tell('Socket closes. Decoder state ends; this receiver’s durable offset and digest progress remain.');}
      if(action==='verify') {if(!s.connected||!s.manifest||s.pending!==null||s.durable!==4)return block('Verification needs a matching manifest, all four durably appended records, and the terminal frame.');s.verified=true;return tell('Terminal coordinates, record count, byte total, and digest seal match. Finish hands the captured output to its caller.');}
      if(action==='ack'||action==='ack-error') {if(!s.verified)return block('Verify captured output before acknowledging the result.');s.acked=true;s.cleanupError=action==='ack-error';return tell(s.cleanupError?'Server physical cleanup fails diagnostically; logical acknowledgement still succeeds. Client capture remains caller-owned; the ledger keeps acknowledged identity.':'Server attempts spool cleanup, then acknowledges the ledger. The client receives acknowledgement; capture remains caller-owned.');}
      if(action==='replay') {if(!s.acked)return block('The execution client awaits result acknowledgement before returning successful completion.');s.replayed=true;return tell('The caller replays the four stored stdout/stderr records in order. No navigation command runs again.');}
      if(action==='dispose') {if(!s.replayed)return block('Replay the successful output before disposing this caller-owned capture.');s.disposed=true;s.done=true;return tell('Client capture disposed. The result reached the caller and the accepted request executed once. Acknowledged ledger identity remains until daemon lifetime ends.',true,'complete');}
    }
    return block('That move is not available in this exercise.');
  }

  function nextMove(id,s) {
    if(id==='owners'){const p=pieces.find(p=>s.placements[p.id]!==p.after);return p?['place',p.id+':'+p.after]:['run'];}
    if(id==='cache')return ({live:['prepare'],candidate:['validate'],failed:['prepare'],validated:['commit'],published:['begin'],turn:s.probes?['release']:['probe'],releasing:['settle'],released:['release']})[s.phase];
    if(id==='gates'){const d=laneDefs[s.lane],a=s.orders[s.lane],i=a.findIndex((v,i)=>v!==d.order[i]);if(i>=0)return ['swap',i+':'+a.indexOf(d.order[i])];if(!s.solved[s.lane])return ['run'];return ['lane',s.lane==='admission'?'routing':'admission'];}
    if(id==='worker'){
      if(!s.duplicate&&s.ready&&!s.admissionPaused)return ['duplicate'];if(s.a==='running')return ['finish-a'];if(s.a==='awaiting delivery')return ['deliver-a'];if(!s.sampledA)return ['sample-a'];if(s.generation===1)return ['replace'];if(!s.lateIgnored)return ['old-exit'];if(!s.newReport)return ['ready-new'];if(!s.oldTerminated)return ['terminate-old'];if(!s.recoverySettled)return ['settle-recovery'];if(s.b==='queued')return ['start-b'];if(s.b==='running')return ['finish-b'];if(s.b==='awaiting delivery')return ['deliver-b'];if(!s.sampledB)return ['sample-b'];return ['inspect'];
    }
    if(id==='transfer'){
      if(s.needsReattach)return ['reattach'];if(s.pending!==null)return ['append'];if(!s.connected)return ['fetch',String(s.durable)];if(!s.manifest)return ['manifest'];if(s.mode==='reattach'&&s.durable===2&&!s.fetchSeen)return ['disconnect'];if(s.durable<4)return ['receive'];if(!s.verified)return ['verify'];if(!s.acked)return ['ack-error'];if(!s.replayed)return ['replay'];return ['dispose'];
    }
  }
  const api={owners,pieces,stations,laneDefs,initial,transition,nextMove};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.TURN_MODEL=api;
})(typeof window!=='undefined'?window:globalThis);
