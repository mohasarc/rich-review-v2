import React,{useState,useMemo,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {ReactFlow,ReactFlowProvider,Handle,Position,Controls,Background,BaseEdge,useReactFlow} from '@xyflow/react';
import gsap from 'gsap';
import {MotionPathPlugin} from 'gsap/MotionPathPlugin';
import '@xyflow/react/dist/style.css';
import './style.css';
import layout from './layout.json';
import sources from './sources.json';
import probes from '../evidence/probes.json';
import {components,traces,colors} from './topology.mjs';
import {readings,guardLabels} from './content.js';
import {defaults,presets,simulate} from './simulator.js';
gsap.registerPlugin(MotionPathPlugin);
const pathFor=e=>e.sections.map(s=>[s.startPoint,...(s.bendPoints??[]),s.endPoint].map((p,i)=>`${i?'L':'M'} ${p.x} ${p.y}`).join(' ')).join(' ');
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pins=[0,1,2,3,4];

function GateNode({data:d}){
 const c=d.component,w=c.w,h=c.h,led=c.type==='led',active=d.active;
 const reached=d.visited,fill=reached?'#cde5a2':'#608574';
 const current=d.step;
 const gateState=i=>{
  const s=d.guardSteps.filter(x=>x.guardIndex===i).at(-1);
  return !s?'skip':s.guardFailed?'fail':'pass';
 };
 return <div className={`component ${c.owner} ${active?'active':''} ${reached?'visited':''}`}>
  <Handle type="target" id="in" position={Position.Left} style={{top:d.ports[0]?.y+1}}/>
  <button className="component-button nodrag nopan" aria-label={`Inspect ${c.ref} ${c.title}`} onClick={()=>d.inspect(c.reading)}>
   <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
    {!led&&<>{pins.map(i=><React.Fragment key={i}><path d={`M0 ${h*.28+i*13} h10 M${w-10} ${h*.28+i*13} h10`} className="pin"/></React.Fragment>)}<rect x="10" y="7" width={w-20} height={h-14} rx={c.owner==='server'?0:6} className="package"/>{c.owner==='server'&&<rect x="16" y="13" width={w-32} height={h-26} className="server-package"/>}</>}
    <text x="22" y="30" className="ref">{c.ref}</text><text x={w-24} y="30" className="owner-stamp" textAnchor="end">{c.owner==='server'?'D':c.owner==='host'?'H':'C'}</text>
    {c.type==='admission'?<>
     <text x="24" y="54" className="part-name">ADMISSION</text>
     <text x="24" y="72" className="part-sub">first failing guard wins</text>
     {guardLabels.map(([id,name,sub],i)=>{const y=91+i*42,state=gateState(i);return <g key={id} className={`logic-gate ${state}`}>
      {i<4&&<path d={`M52 ${y+28} v14`} className="inner-wire"/>}
      <path d={`M34 ${y} h15 a14 14 0 0 1 0 28 H34 Z`} className="and-shape"/>
      <text x="48" y={y+19} textAnchor="middle" className="gate-number">{i+1}</text>
      <circle cx="213" cy={y+14} r="4" className="gate-led"/>
      <text x="78" y={y+11} className="gate-name">{name}</text>
      <text x="78" y={y+27} className="gate-sub">{state==='fail'?d.guardSteps.find(x=>x.guardIndex===i)?.code:sub}</text>
      {state==='skip'&&<path d={`M194 ${y+7} l7 14 M201 ${y+7} l7 14`} className="skip-mark"/>}
     </g>;})}
     <text x="24" y="316" className="part-sub">TOKEN → STATE → IDENTITY</text>
    </>:led?<>
     <path d={`M0 ${h/2} H${w/2-22} V62`} className="symbol"/>
     <circle cx={w/2} cy="62" r="22" className={`output-led ${active?'on':''} ${c.id}`}/>
     <circle cx={w/2-6} cy="55" r="6" fill={active?'#f4ffdd':'#3f6154'}/>
     <text x={w/2} y="104" textAnchor="middle" className="part-name">{c.title}</text>
     <text x={w/2} y="124" textAnchor="middle" className="part-sub">{active&&current.code?current.code:c.sub}</text>
    </>:<>
     {c.type==='mux'&&<><path d="M54 45 L93 58 L93 90 L54 103 Z" className="symbol"/><path d="M38 62 H54 M38 85 H54 M93 74 H115" className="symbol"/><text x="73" y="82" textAnchor="middle" className="symbol-text">1</text></>}
     {c.type==='socket'&&<><path d="M38 67 H66 V51 H86 V67 H113 M66 91 V78 M86 91 V78" className="symbol"/><path d="M74 48 V95" strokeDasharray="3 5" className="symbol muted-symbol"/><circle cx="39" cy="67" r="4" fill={fill}/><circle cx="111" cy="67" r="4" fill={fill}/></>}
     {c.type==='fuse'&&<><path d="M29 72 H47 M119 72 H140" className="symbol"/><rect x="47" y="55" width="72" height="34" rx="17" className="symbol"/>{d.fuseBlown?<path d="M68 61 l28 22 M96 61 L68 83" className="broken-fuse"/>:<path d="M48 72 H119" className="fuse-wire"/>}</>}
     {c.type==='or'&&<><path d="M48 45 Q87 46 113 73 Q87 101 48 102 Q70 73 48 45 Z" className="symbol"/><text x="82" y="81" textAnchor="middle" className="symbol-text">≥1</text></>}
     {c.type==='latch'&&<><rect x="44" y="49" width="86" height="58" className="symbol"/><text x="57" y="72" className="symbol-text">D</text><text x="111" y="72" className="symbol-text">Q</text><path d="M44 87 l10 7 l-10 7" className="symbol"/><circle cx="112" cy="92" r="6" fill={d.accepted?'#cde5a2':'#274d3d'}/></>}
     {c.type==='recovery'&&<>
      <text x="27" y="62" className="counter-label">PER REQUEST</text>
      <rect x="25" y="70" width="156" height="34" className="counter-cell"/><text x="35" y="92" className="counter-name">reattach</text><text x="167" y="93" textAnchor="end" className="counter-value">{current.reattachments}/1</text>
      <text x="27" y="129" className="counter-label">PER ATTEMPT</text>
      <rect x="25" y="137" width="156" height="34" className="counter-cell"/><text x="35" y="159" className="counter-name">fetch</text><text x="167" y="160" textAnchor="end" className="counter-value">{current.fetches}/1</text>
     </>}
     {c.type==='ack'&&<><path d="M36 58 H123 V89 H36 Z M44 73 l9 8 l15-19 M80 72 H113" className="symbol"/><path d="M98 47 h24 v-10 M121 47 l-6-6" className="symbol"/></>}
     <text x={w/2} y={h-36} textAnchor="middle" className="part-name">{c.title}</text>
     <text x={w/2} y={h-18} textAnchor="middle" className="part-sub">{c.sub}</text>
    </>}
    {active&&!led&&<circle cx={w-23} cy={h-24} r="3" fill="#eef9b4"/>}
   </svg>
  </button>
  <Handle type="source" id="out" position={Position.Right} style={{top:d.ports[1]?.y+1}}/>
 </div>;
}
function TraceEdge({id,data:d}){
 const dot=useRef();
 useEffect(()=>{
  const target=dot.current;
  if(!target)return;
  if(!d.active||reduced()){gsap.set(target,{opacity:0});return;}
  const tween=gsap.fromTo(target,{opacity:1},{motionPath:{path:d.path},duration:.8,ease:'none',onComplete:()=>gsap.set(target,{opacity:0})});
  return ()=>{tween.kill();if(target.isConnected)gsap.set(target,{opacity:0});};
 },[d.active,d.tick,d.path]);
 return <g className={`trace ${d.visited?'energized':''}`}>
  <defs><marker id={`arrow-${id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 1 L7 4 L0 7" fill="none" stroke={colors[d.domain]} strokeWidth="1.3"/></marker></defs>
  <BaseEdge id={id} path={d.path} markerEnd={`url(#arrow-${id})`} style={{stroke:colors[d.domain],strokeWidth:d.visited?3.2:1.6,opacity:d.visited?1:.4}}/>
  <circle ref={dot} r="5.5" fill="#fcffd9" opacity="0" className="signal-dot"/>
  <title>{d.label}</title>
 </g>;
}
const nodeTypes={gate:GateNode};const edgeTypes={circuit:TraceEdge};
function Circuit({sim,index,inspect}){
 const flow=useReactFlow();
 const current=sim.steps[index],history=sim.steps.slice(0,index+1);
 const nodes=useMemo(()=>layout.children.map(n=>{const component=components.find(c=>c.id===n.id);return {id:n.id,type:'gate',position:{x:n.x,y:n.y},width:n.width,height:n.height,draggable:false,selectable:false,data:{component,ports:n.ports,active:current.node===n.id,visited:history.some(s=>s.node===n.id),guardSteps:history.filter(s=>s.guard),accepted:current.accepted,fuseBlown:history.some(s=>s.fuseBlown),step:current,inspect}};}),[sim,index,inspect]);
 const edges=useMemo(()=>layout.edges.map(e=>{const def=traces.find(t=>t.id===e.id);return {...def,type:'circuit',sourceHandle:'out',targetHandle:'in',selectable:false,data:{...def,path:pathFor(e),visited:history.some(s=>s.edge===e.id),active:current.edge===e.id,tick:index}};}),[sim,index]);
 return <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView fitViewOptions={{padding:.065}} minZoom={.15} maxZoom={1.8} nodesConnectable={false} nodesDraggable={false} elementsSelectable={false} deleteKeyCode={null} panOnScroll={false} colorMode="dark" aria-label="Admission circuit. Drag to pan; use controls to zoom. Select a component for evidence.">
  <Background gap={26} size={1} color="#688775"/><Controls showInteractive={false}/>
  <div className="board-view-tools"><button onClick={()=>flow.fitView({padding:.065,duration:reduced()?0:250})}>Fit board</button><button onClick={()=>{const n=nodes.find(n=>n.id===current.node);flow.setCenter(n.position.x+n.width/2,n.position.y+n.height/2,{zoom:1,duration:reduced()?0:250});}}>Follow signal</button></div>
 </ReactFlow>;
}
function Dip({label,value,onChange,help}){return <label className="dip-row"><span>{label}{help&&<small>{help}</small>}</span><input type="checkbox" checked={value} onChange={e=>onChange(e.target.checked)}/><span className="dip" aria-hidden="true"><i/></span></label>;}
function Field({label,value,onChange,children}){return <label className="field"><span>{label}</span><select aria-label={label} value={value} onChange={e=>onChange(e.target.value)}>{children}</select></label>;}
function SourceDialog({reading,close}){
 const dialog=useRef(),[sourceIndex,setSourceIndex]=useState(0);
 const dismiss=()=>{dialog.current?.close();close();};
 const r=readings.find(r=>r.id===reading);
 useEffect(()=>{if(r){setSourceIndex(0);dialog.current.showModal();}else dialog.current?.close();},[reading]);
 if(!r)return null;
 const [id,start,end]=r.sources[Math.min(sourceIndex,r.sources.length-1)],source=sources[id];
 const lines=source?.text.split('\n').slice(start-1,end)??[];
 return <dialog ref={dialog} className="source-dialog" aria-labelledby="reading-title" onCancel={e=>{e.preventDefault();dismiss();}} onClick={e=>{if(e.target===e.currentTarget)dismiss();}}>
  <div className="dialog-header"><span className="mono">BOARD READING / {r.n}</span><button autoFocus onClick={dismiss} aria-label="Close evidence and return">Return to board ↗</button></div>
  <h2 id="reading-title">{r.title}</h2><p className="mechanism">{r.detail}</p><p className="rationale">{r.reason}</p>
  <div className="source-controls"><label>Source receipt <select aria-label="Source receipt" value={sourceIndex} onChange={e=>setSourceIndex(Number(e.target.value))}>{r.sources.map(([id,start,end],i)=><option key={i} value={i}>{id.replace('head:packages/daemon/src/','head: ')} · {start}–{end}</option>)}</select></label></div>
  {source&&<><div className="source-caption"><span>{source.version} · {source.path} · L{start}–{Math.min(end,start+lines.length-1)}</span>{source.version!=='bundle'&&<a href={`https://github.com/mohasarc/symnav/blob/${source.revision}/${source.path}#L${start}`} target="_blank" rel="noreferrer">Pinned source ↗</a>}</div>
  <pre className="source-code" tabIndex="0" aria-label="Frozen source excerpt">{lines.map((line,i)=><span className="code-line" key={i}><span className="line-number">{start+i}</span><code>{line||' '}</code></span>)}</pre><p className="hash">SHA-256 {source.sha256}</p></>}
  <div className="dialog-nav"><button onClick={()=>{const i=readings.indexOf(r);window.dispatchEvent(new CustomEvent('open-reading',{detail:readings[(i+7)%8].id}));}}>← Previous reading</button><button onClick={()=>{const i=readings.indexOf(r);window.dispatchEvent(new CustomEvent('open-reading',{detail:readings[(i+1)%8].id}));}}>Next reading →</button></div>
 </dialog>;
}
function App(){
 const [config,setConfig]=useState({...defaults,ending:'both'}),[preset,setPreset]=useState('both'),[index,setIndex]=useState(()=>simulate({...defaults,ending:'both'}).steps.length-1),[playing,setPlaying]=useState(false),[reading,setReading]=useState(null);
 const sim=useMemo(()=>simulate(config),[config]);
 const current=sim.steps[Math.min(index,sim.steps.length-1)];
 const inspect=React.useCallback(id=>{setPlaying(false);setReading(id);},[]);
 const change=(key,value)=>{setConfig(c=>({...c,[key]:value}));setPreset('custom');setIndex(0);setPlaying(false);};
 const choose=id=>{setPreset(id);setConfig({...defaults,...presets.find(p=>p.id===id).patch});setIndex(0);setPlaying(false);};
 useEffect(()=>{if(!playing)return;if(index===sim.steps.length-1){setPlaying(false);return;}const t=gsap.delayedCall(reduced()?.45:1.2,()=>setIndex(i=>i+1));return ()=>t.kill();},[playing,index,sim]);
 useEffect(()=>{const listener=e=>inspect(e.detail);window.addEventListener('open-reading',listener);return ()=>window.removeEventListener('open-reading',listener);},[inspect]);
 useEffect(()=>{window.__circuit={config,index,playing,step:current,result:sim,probes};},[config,index,playing,sim]);
 const next=()=>{setPlaying(false);setIndex(i=>Math.min(i+1,sim.steps.length-1));};
 return <>
 <header className="masthead"><a href="#top" className="wordmark"><span className="mark">⌁</span> FIELD CIRCUITS</a><span>SYMNAV / DAEMON REFACTOR</span><span className="issue">BOARD <b>072</b></span></header>
 <main id="top">
  <section className="hero"><div><p className="eyebrow">ADMISSION · TRANSPORT · RECOVERY</p><h1>Accepted is a<br/><em>one-way gate.</em></h1></div><div className="hero-right"><p className="lead">Local fallback needs proof.<br/>An accepted request can recover its delivery, but it cannot energize a local replay.</p><div className="ownership-strip"><span>main<br/><b>CLI mechanisms</b></span><span className="arrow">→</span><span>#148<br/><b>package staged</b></span><span className="arrow">→</span><button onClick={()=>inspect('owner')}>#149 · head<br/><b>package active ↗</b></button></div><p className="scope-note">One workspace command, one acceptance boundary. This is a narrow slice of the 26-PR stack.</p></div></section>
  <section className="instrument" aria-label="Interactive circuit simulation">
   <div className="instrument-heading"><div><span className="board-number">72 / A</span><strong>Admission circuit board</strong><span className="mode-label">SOURCE-DERIVED SIMULATION</span></div><button onClick={()=>inspect('evidence')}>Evidence & limits ↗</button></div>
   <div className="transport-controls"><div className="run-buttons"><button className="primary" onClick={()=>{if(index===sim.steps.length-1)setIndex(0);setPlaying(p=>!p);}}>{playing?'Pause signal':index===sim.steps.length-1?'Trace again':'Inject signal'}<span>{playing?'Ⅱ':'↗'}</span></button><button onClick={next} disabled={index===sim.steps.length-1}>Step →</button><button className="reset" onClick={()=>{setPlaying(false);setIndex(0);}} aria-label="Reset signal">↺</button></div><label className="scrubber"><span>SIGNAL STAGE <b>{String(index+1).padStart(2,'0')} / {String(sim.steps.length).padStart(2,'0')}</b></span><input type="range" aria-label="Signal stage" min="0" max={sim.steps.length-1} value={index} onChange={e=>{setPlaying(false);setIndex(Number(e.target.value));}}/></label><button className="finish" onClick={()=>{setPlaying(false);setIndex(sim.steps.length-1);}}>Show outcome ↘</button></div>
   <div className="bench">
    <aside className="switch-panel" aria-label="Signal inputs">
     <Field label="LOAD A SIGNAL" value={preset} onChange={choose}>{preset==='custom'&&<option value="custom">Custom conditions</option>}{presets.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Field>
     <p className="scenario-note">{presets.find(p=>p.id===preset)?.note??'Change a condition, then trace the signal. Downstream conditions apply only when reached.'}</p>
     <Field label="U1 / ROUTE SNAPSHOT · FIXTURE" value={config.route} onChange={v=>change('route',v)}><option value="warm">Warm · responsive daemon</option><option value="cold">Cold · absent record</option><option value="fallback">Fallback · incompatible</option></Field>
     <div className="switch-label">U2 / ADMISSION CONDITIONS</div>
     <Dip label="Token matches" value={config.auth} onChange={v=>change('auth',v)}/><Dip label="Worker ready" value={config.ready} onChange={v=>change('ready',v)}/><Dip label="Resource pause" value={config.pressure} onChange={v=>change('pressure',v)}/>
     <Field label="Queue" value={config.queue} onChange={v=>change('queue',v)}><option value="accepting">Accepting</option><option value="draining">Draining</option><option value="closed">Closed</option></Field>
     <Field label="Duplicate identity" value={config.duplicate} onChange={v=>change('duplicate',v)}><option value="unseen">Unseen</option><option value="matching">Matching</option><option value="conflicting">Conflicting</option></Field>
     <div className="switch-label">FAULT INJECTION · ILLUSTRATIVE</div>
     <Field label="J1 / Socket" value={config.wire} onChange={v=>change('wire',v)}><option value="intact">Connects and writes</option><option value="before">Never connects</option><option value="unconfirmed">Closes after write</option></Field>
     <Dip label="Flip wire retrySafe" help="Rejection frames only" value={config.tamper} onChange={v=>change('tamper',v)}/>
     <Field label="After acceptance" value={config.ending} onChange={v=>change('ending',v)}><option value="complete">Complete result</option><option value="reattach">Close → reattach</option><option value="fetch">Manifest → fetch</option><option value="both">Reattach → fetch</option><option value="exhaust-fetch">Fetch ends too soon</option><option value="exhaust-reattach">Reattachment exhausted</option>{['worker-exit','controlled-resource','response-capacity','stopping','internal'].map(c=><option key={c} value={c}>Terminal · {c}</option>)}</Field>
    </aside>
    <div className="board-area"><div className="silkscreen"><span>@symnav/daemon · active owner at #149</span><span>C caller · D daemon process · H host</span></div><div className="circuit-canvas"><ReactFlowProvider><Circuit sim={sim} index={index} inspect={inspect}/></ReactFlowProvider></div><div className="board-foot"><span>● one signal / signal-72</span><span>Distances & motion are not time. Traces group calls; gate shapes are mnemonic.</span></div></div>
   </div>
   <div className="readout" aria-live="polite"><div><span className="eyebrow">{current.delivery}</span>{current.code&&<span className="code-readout">{current.code}</span>}<h2>{current.title}</h2><p>{current.text}</p></div><div className="meters"><span className="meter-title">MODEL COUNTERS</span><span>local runs <b data-testid="local-count">{current.localRuns}</b></span><span>execute writes <b>{current.executeWrites}</b></span><span>admission samples <b>{current.admissionSamples}</b></span></div></div>
  </section>
  <div className="legend" aria-label="Visual variable legend"><div><span className="legend-title">READ THE BOARD</span><span>▱ route selector · ⊓ ordered guards · ≥1 retry authority · D/Q acceptance latch</span></div><div className="color-key">{[['admission','rejection'],['transport','transport failure'],['execution','terminal failure'],['recovery','delivery recovery'],['local','local permit']].map(([id,name])=><span key={id}><i style={{background:colors[id]}}/>{name}</span>)}</div><div className="legend-bottom"><span>Single package = caller process · double = daemon process · H = host supplied</span><span>Lit = reached / selected outcome · dark = unreached · // = skipped guard</span></div></div>
  <p className="simulation-note"><b>Simulation, not a live daemon.</b> Admission and retry logic run frozen source. Routing snapshots, socket/host I/O and recovery motion are modeled. Recovery loops abbreviate another delivery attempt; they do not add a local execution. <button onClick={()=>inspect('evidence')}>Inspect the 13 controlled probes ↗</button></p>
  <section className="readings" aria-labelledby="readings-title"><div className="readings-header"><div><p className="eyebrow">THE COMPLETE STOPPING LAYER</p><h2 id="readings-title">Eight things the circuit tells you.</h2></div><p>The board, legend and all eight readings are the complete layer. Open a reading or component for mechanism and pinned evidence.</p></div><div className="reading-list">{readings.map(r=><article key={r.id} id={`reading-${r.id}`}><button className="reading-open" onClick={()=>inspect(r.id)}><span className="reading-number">{r.n}</span><span><b>{r.title}</b><span className="reading-summary">{r.summary}</span><span className="reading-reason">{r.reason}</span></span><span className="reading-arrow">↗</span></button></article>)}</div><p className="end-layer">END OF COMPLETE LAYER <span>Deeper views add mechanism and evidence to these same eight readings.</span></p></section>
 </main>
 <footer><span>072 · ADMISSION CIRCUIT BOARD</span><span>main b6801eb → stack head d070023</span><a href="evidence/probes.json">Probe receipts ↗</a><a href="evidence/focused-tests.log">147 source tests ↗</a><a href="README.md">Experiment notes ↗</a></footer>
 <SourceDialog reading={reading} close={()=>setReading(null)}/>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
