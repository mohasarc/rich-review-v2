/* Tone owns audio scheduling and voice allocation. UI receives Tone.Draw callbacks. */
window.MusicSound = (() => {
 let ready=false, playing=false, voices={}, drones={}, relations={}, active={base:new Set(),head:new Set()}, timer=null, generation=0;
 let analyser=null, enabled=false;
 const debug={scheduled:0,sounded:0,relationHistory:[],noteHistory:[],errors:[]};
 const relationNotes={pending:['C3','G3'],following:['C3','G3'],split:['C3','Db3'],aligned:['C3','E3','G3'],different:['C2','Db2','G2']};
 function selected(build,listen){return listen==='both'||listen===build;}
 async function init(){
  if(!window.Tone)throw Error('Audio library unavailable');
  await Tone.start();
  if(ready)return;
  analyser=new Tone.Analyser('waveform',512);
  const master=new Tone.Gain(.48).connect(analyser).toDestination();
  for(const [build,pan] of [['base',-.62],['head',.62]]){
   const panner=new Tone.Panner(pan).connect(master);
   voices[build]=new Tone.PolySynth(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:.004,decay:.12,sustain:0,release:.18},volume:-12}).connect(panner);
   drones[build]=new Tone.PolySynth(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:.04,decay:.1,sustain:.2,release:.09},volume:-24}).connect(panner);
   relations[build]=new Tone.PolySynth(Tone.Synth,{oscillator:{type:'triangle'},envelope:{attack:.025,decay:.1,sustain:.18,release:.2},volume:-20}).connect(panner);
  }
  ready=true;
 }
 function silence(){
  if(ready)for(const b of ['base','head']){voices[b].releaseAll();drones[b].releaseAll();relations[b].releaseAll();active[b]=new Set();}
 }
 function stop(){generation++;playing=false;if(timer){timer.stop();timer=null;}if(ready){Tone.getTransport().stop();Tone.getTransport().cancel();}silence();}
 function emit(score,index,options,time){
  if(!ready||!enabled)return;
  for(const build of ['base','head']){
   if(!selected(build,options.listen))continue;
   const run=score.runs[build],i=Math.min(index,run.events.length-1),event=run.events[i],live=options.rows;
   const current=new Set(run.bands.filter(b=>b.start<=i&&b.end>i&&live.includes(b.row)).map(b=>INSTRUMENT.rows[b.row].pitch));
   const added=[...current].filter(p=>!active[build].has(p)),removed=[...active[build]].filter(p=>!current.has(p));
   if(removed.length)drones[build].triggerRelease(removed,time);
   if(added.length)drones[build].triggerAttack(added,time,.45);
   active[build]=current;
   if(index<run.events.length&&live.includes(event.row)){
    let notes=INSTRUMENT.rows[event.row].pitch;
    if(event.type==='clear')notes=['C4','E4','G4','C5','E5','G5'];
    if(event.type==='reject')notes=['C2','Db2','G2'];
    voices[build].triggerAttackRelease(notes,event.type==='clear'?.33:.14,time,.55);
    debug.sounded++; debug.noteHistory.push({build,index,row:event.row,type:event.type,notes});
   }
   const rel=run.checkpoints[i].relation,prev=i?run.checkpoints[i-1].relation:'ready';
   if(options.solo==='all'||options.solo==='release'){
    if(relationNotes[rel]&&(rel!==prev||index===options.start)){
     relations[build].triggerAttackRelease(relationNotes[rel],rel==='split'?Math.max(.25,options.interval*.85):.35,time,.55);
     debug.relationHistory.push({build,index,relation:rel,notes:relationNotes[rel]});
    } else if(rel==='split')relations[build].triggerAttackRelease(relationNotes.split,Math.max(.25,options.interval*.85),time,.4);
   }
  }
 }
 async function play(score,start,options,onStep,onEnd,onError){
  stop();const ticket=generation;enabled=options.sound;const interval=60/options.tempo;
  const count=Math.max(...Object.values(score.runs).map(r=>r.events.length));
  try{
   await init();if(ticket!==generation)return;
   playing=true;debug.scheduled=0;
   for(let i=start;i<count;i++){
    Tone.getTransport().scheduleOnce(time=>{
     if(ticket!==generation)return;
     emit(score,i,{...options,interval,start},time);
     Tone.getDraw().schedule(()=>{if(ticket===generation)onStep(i);},time);
    },(i-start)*interval+.08);debug.scheduled++;
   }
   Tone.getTransport().scheduleOnce(time=>Tone.getDraw().schedule(()=>{if(ticket!==generation)return;stop();onEnd();},time),(count-start)*interval+.12);
   Tone.getTransport().start();
  }catch(error){
   debug.errors.push(error.message);onError(error);if(ticket!==generation)return;
   enabled=false;playing=true;let last=-1;
   timer=d3.timer(elapsed=>{const i=start+Math.floor(elapsed/(interval*1000));if(i>=count){stop();onEnd();return;}if(i!==last){last=i;onStep(i);}});
  }
 }
 async function preview(score,index,options){
  stop();enabled=options.sound;if(!enabled)return;
  const ticket=generation;
  try{await init();if(ticket!==generation)return;emit(score,index,{...options,interval:60/options.tempo,start:index},Tone.now());for(const b of ['base','head']){drones[b].releaseAll(Tone.now()+.6);active[b]=new Set();}}catch(e){debug.errors.push(e.message);throw e;}
 }
 return {play,stop,preview,debug,relationNotes,get playing(){return playing;},get ready(){return ready;},get amplitude(){if(!analyser)return 0;return Math.max(...analyser.getValue().map(Math.abs));},get versions(){return {tone:window.Tone?.version,d3:window.d3?.version};}};
})();
