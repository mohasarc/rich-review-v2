import {gsap} from 'gsap';
import {Flip} from 'gsap/Flip';
import DATA from '../data/morphology.json';
gsap.registerPlugin(Flip);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const steps=DATA.snapshots;
const readings=DATA.readings;
const domains=readings.slice(0,4);
const fragments=[['Daemon','Activity','Projector'],['Daemon','Worker','GenerationManager'],['Daemon','Delivery','Session'],['Accepted','Execution','Session']];
const chapter=[
 ['One crowded word.','main · baseline','The four selected jobs still live inside WorkspaceDaemon.'],
 ['Before the split.','#143 · extraction begins next','Earlier vocabulary work has changed the shell. These four jobs are still inside it.'],
 ['Activity separates.','#144 · projection','One private projection method becomes a static collaborator.'],
 ['Worker separates.','#145 · generation mechanics','Worker fields become a manager and its recovery connection.'],
 ['Delivery separates.','#146 · completion and traces','Completion delivery and operation-trace coordination move together.'],
 ['Execution separates.','#147 · accepted turns','The shell now composes all four extracted owners.'],
 ['One name. Two addresses.','#148 · staged ownership','CLI still runs the frozen local copy. The package copy carries the unit suites.'],
 ['The package owns the word.','#149 · physical consolidation','The CLI copy is gone. All five class names are inside @symnav/daemon.']
];
let index=0,playing=false,timer=null,flip=null,openingFocus=null,currentReading=0;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let joins=true;
function token(i,owner){
 const [prefix,root,suffix]=fragments[i],d=domains[i];
 return `<button class="morpheme fused" data-domain="${i}" data-reading="${d.id}" data-flip-id="${owner}-${d.id}" aria-label="Inspect ${d.word} ownership"><span class="prefix">${prefix}</span><span class="root">${root}</span><span class="suffix">${suffix}</span><span class="member private">${esc(d.sample.before)}()</span></button>`;
}
function makeCopy(owner){
 const node=document.createElement('div'); node.className=`type-copy ${owner}`;node.id=`type-${owner}`;
 node.innerHTML=`<div class="copy-heading"><span class="owner-address">${owner==='cli'?'apps/cli':'@symnav/daemon'}</span><span class="copy-role"></span></div><div class="empty-copy"><span aria-hidden="true">∅</span><p>${owner==='cli'?'Local copy deleted.':'No copy of this class here.'}</p></div><div class="copy-ink"><button class="class-name" data-reading="rename" aria-label="Inspect the class name"><span class="name-part workspace" data-flip-id="${owner}-workspace">Workspace</span><span class="name-part daemon-word" data-flip-id="${owner}-daemon">Daemon</span><span class="name-part process-word" data-flip-id="${owner}-process">Process</span><span class="name-part coordinator-word" data-flip-id="${owner}-coordinator">Coordinator<span class="rationale-dot" aria-hidden="true">?</span></span></button><div class="class-signature"><span class="signature-label">class-public</span><button class="member public" data-reading="surface">constructor</button><span class="signature-divider" aria-hidden="true">·</span><button class="member public" data-reading="surface">start()</button></div><div class="embedded-label">selected jobs inside the class</div><div class="embedded">${domains.map((_,i)=>token(i,owner)).join('')}</div><div class="extracted-label"><span class="join-rule"></span><span>separate classes · imported by the shell</span><span class="join-rule"></span></div><div class="extracted"></div><button class="copy-measure" data-reading="composition"></button></div>`;
 return node;
}
$('#type-lanes').append(makeCopy('cli'),makeCopy('daemon'));
$('#timeline').innerHTML=steps.map((s,i)=>`<button class="stop" data-index="${i}" aria-label="${s.label}: ${chapter[i][0]}" aria-pressed="false"><span class="stop-tick"></span><span>${s.label}</span></button>`).join('');
$('#readings').innerHTML=readings.map((r,i)=>`<article class="reading" id="reading-${r.id}"><button class="reading-title" data-reading="${r.id}"><span class="reading-number">${String(i+1).padStart(2,'0')}</span><span class="reading-word ${r.status}">${r.word}</span><span class="reading-arrow" aria-hidden="true">↗</span></button><p>${esc(r.summary)}</p><span class="reason-label ${r.status}">${r.status==='observed'?'Source observation':r.status==='stated'?'Reason stated':'Reason unexplained'}</span></article>`).join('');
function arrange(owner,frame){
 const el=$(`#type-${owner}`),c=frame.copies.find(x=>x.owner===owner),live=!!c;
 el.classList.toggle('absent',!live);
 el.classList.toggle('renamed',live&&c.name==='DaemonProcessCoordinator');
 el.classList.toggle('all-extracted',frame.extracted===4);
 const role=owner==='cli'?(frame.id==='148'?'ACTIVE · FROZEN':'ACTIVE'):frame.id==='148'?'STAGED · UNIT SUITES':'ACTIVE · UNIT SUITES';
 el.querySelector('.copy-role').textContent=live?role:(owner==='cli'?'DELETED':'NOT THIS CLASS’S OWNER');
 if(!live)return;
 for(let i=0;i<4;i++){
  const word=el.querySelector(`[data-domain="${i}"]`),extracted=frame.extracted>i;
  word.classList.toggle('fused',!extracted);word.classList.toggle('separated',extracted);
  const mem=word.querySelector('.member');
  mem.textContent=(extracted?domains[i].sample.after:domains[i].sample.before)+'()';
  mem.classList.toggle('public',extracted&&domains[i].sample.publicAfter);
  mem.classList.toggle('private',!extracted||!domains[i].sample.publicAfter);
  el.querySelector(extracted?'.extracted':'.embedded').append(word);
 }
 el.querySelector('.copy-measure').innerHTML=`<b>${c.members}</b> members <span>·</span> <b>${c.constructorLines}</b> constructor lines <span aria-hidden="true">↗</span>`;
 el.querySelector('.class-name').setAttribute('aria-label',`Inspect ${c.name} name history`);
}
function stopPlay(){playing=false;if(timer)timer.kill();timer=null;$('#play').textContent=reduce.matches?'Motion reduced':'Play the changes';$('#play').setAttribute('aria-pressed','false');}
function schedule(){timer=gsap.delayedCall(3.8,()=>{if(!playing)return;if(index===steps.length-1){stopPlay();return;}setStep(index+1,true,false);schedule();});}
function setStep(next,animate=true,writeHash=true){
 const n=Math.max(0,Math.min(steps.length-1,next));
 const wasPackageVisible=!!steps[index].copies.find(c=>c.owner==='daemon');
 if(flip){flip.progress(1);flip.kill();}
 gsap.killTweensOf('#type-daemon .name-part');
 gsap.set('#type-daemon .name-part',{clearProps:'fontVariationSettings,color'});
 const before=Flip.getState($$('.name-part,.morpheme,.copy-ink'),{props:'color,fontSize,fontVariationSettings,letterSpacing'});
 index=n;const f=steps[n];
 $('#specimen').dataset.step=f.id;
 arrange('cli',f);arrange('daemon',f);
 $$('.stop').forEach((b,i)=>{b.classList.toggle('current',i===n);b.classList.toggle('past',i<n);b.setAttribute('aria-pressed',String(i===n));});
 $('#scrub').value=String(n);$('#scrub').setAttribute('aria-valuetext',`${f.label}. ${chapter[n][0]}`);
 $('#chapter-title').textContent=chapter[n][0];$('#chapter-kicker').textContent=chapter[n][1];$('#chapter-caption').textContent=chapter[n][2];
 $('#frame-receipt').textContent=f.sha.slice(0,10);$('#frame-receipt').href=`https://github.com/mohasarc/symnav/tree/${f.sha}`;
 $('#previous').disabled=n===0;$('#next').disabled=n===steps.length-1;
 $('#live-status').textContent=`${f.label}: ${chapter[n][0]} ${chapter[n][2]}`;
 if(animate&&!reduce.matches){
  flip=Flip.from(before,{targets:$$('.name-part,.morpheme,.copy-ink'),duration:1.05,ease:'power2.inOut',scale:true,nested:true,fade:true,prune:true,onEnter:els=>{const later=els.filter(e=>e.closest('#type-cli')&&(e.classList.contains('process-word')||e.classList.contains('coordinator-word')));const now=els.filter(e=>!later.includes(e));const sequence=gsap.timeline();if(now.length)sequence.fromTo(now,{opacity:0},{opacity:1,duration:.65},0);if(later.length)sequence.fromTo(later,{opacity:0},{opacity:1,duration:.25},1.05);return sequence},onLeave:els=>gsap.to(els,{opacity:0,duration:.2})});
  if(!wasPackageVisible&&f.copies.some(c=>c.owner==='daemon'))gsap.fromTo('#type-daemon .name-part',{fontVariationSettings:'"wght" 600, "MONO" 0, "CASL" 0',color:'#1b6652'},{fontVariationSettings:'"wght" 600, "MONO" 0, "CASL" 1',color:'#a23b37',duration:1.05,ease:'power2.inOut',clearProps:'fontVariationSettings,color'});
  gsap.fromTo('#chapter-title',{opacity:.25,y:6},{opacity:1,y:0,duration:.5});
 }
 if(writeHash)history.replaceState(null,'',`#step=${f.id}`);
}
function openReading(id,push=true){
 stopPlay();currentReading=readings.findIndex(r=>r.id===id);if(currentReading<0)return;
 const r=readings[currentReading];openingFocus=document.activeElement;
 if(push)history.pushState(null,'',`#read=${id}`);
 renderReading();if(!$('#reader').open)$('#reader').showModal();$('#close-reader').focus();
}
function renderReading(){
 const r=readings[currentReading];
 $('#reader-count').textContent=`${String(currentReading+1).padStart(2,'0')} / ${readings.length} · ${r.step==='main'?'main':'#'+r.step}`;
 $('#reader-title').textContent=r.title;
 $('#reader-word').textContent=r.fullName||r.word;$('#reader-word').className=`reader-word ${r.status}`;
 $('#reader-summary').textContent=r.summary;$('#reader-detail').textContent=r.detail;
 $('#reader-reason').innerHTML=r.reason?`<span class="reason-label stated">Reason stated · PR #${r.reason.pr}</span><blockquote>${esc(r.reason.text)}</blockquote><a href="evidence/pr-bodies/${r.reason.pr}.md" target="_blank">Read the supplied PR body ↗</a>`:`<span class="reason-label ${r.status}">${r.status==='observed'?'Source observation · no author motive asserted':'Reason unexplained · no specific rationale found in the examined PR bodies, commits or plan'}</span>`;
 $('#source-list').innerHTML=r.receipts.map((rc,i)=>{
  const src=DATA.sources[rc.source],lines=src.text.split('\n').slice(rc.start-1,rc.end);
  return `<details class="receipt" ${i===0?'open':''}><summary><span>0${i+1}</span><span>${esc(src.path)}<small>${src.sha.slice(0,10)} · lines ${rc.start}–${rc.end}</small></span></summary><div class="source-toolbar"><a href="${esc(src.local)}" target="_blank">Full frozen file ↗</a><a href="https://github.com/mohasarc/symnav/blob/${src.sha}/${src.path}#L${rc.start}" target="_blank" rel="noreferrer">Pinned source ↗</a></div><pre tabindex="0" aria-label="Source excerpt from ${esc(src.path)}">${lines.map((line,j)=>`<span class="source-line"><span class="line-number">${j+rc.start}</span><code>${esc(line)}</code></span>`).join('')}</pre></details>`;
 }).join('');
 $('#reader-prev').disabled=currentReading===0;$('#reader-next').disabled=currentReading===readings.length-1;
 $('#show-frame').textContent=`See ${r.step==='main'?'main':'#'+r.step} in the type`;
 $('#reader-scroll').scrollTop=0;
}
function closeReader(update=true){$('#reader').close();if(update)history.replaceState(null,'',`#step=${steps[index].id}`);if(openingFocus?.isConnected)openingFocus.focus({preventScroll:true});}
function readHash(){const h=new URLSearchParams(location.hash.slice(1));if(h.has('read')){openReading(h.get('read'),false);}else{if($('#reader').open)closeReader(false);const n=steps.findIndex(s=>s.id===h.get('step'));if(n>=0)setStep(n,false,false);}}
document.addEventListener('click',e=>{
 const read=e.target.closest('[data-reading]');if(read){openReading(read.dataset.reading);return;}
 const step=e.target.closest('[data-index]');if(step){stopPlay();setStep(Number(step.dataset.index));}
});
$('#previous').addEventListener('click',()=>{stopPlay();setStep(index-1);});
$('#next').addEventListener('click',()=>{stopPlay();setStep(index+1);});
$('#play').addEventListener('click',()=>{
 if(playing){stopPlay();return;}
 if(reduce.matches)return;
 if(index===steps.length-1)setStep(0,false);
 playing=true;$('#play').textContent='Pause';$('#play').setAttribute('aria-pressed','true');schedule();
});
$('#scrub').addEventListener('input',e=>{stopPlay();setStep(Number(e.target.value),false);});
$('#joins').addEventListener('click',()=>{joins=!joins;$('#specimen').classList.toggle('hide-joins',!joins);$('#joins').setAttribute('aria-pressed',String(joins));$('#joins').textContent=joins?'Joins on':'Joins off';});
$('#close-reader').addEventListener('click',()=>closeReader());
$('#reader').addEventListener('cancel',e=>{e.preventDefault();closeReader();});
$('#reader').addEventListener('click',e=>{if(e.target===$('#reader'))closeReader();});
$('#reader-prev').addEventListener('click',()=>{currentReading--;history.replaceState(null,'',`#read=${readings[currentReading].id}`);renderReading();});
$('#reader-next').addEventListener('click',()=>{currentReading++;history.replaceState(null,'',`#read=${readings[currentReading].id}`);renderReading();});
$('#show-frame').addEventListener('click',()=>{const n=steps.findIndex(s=>s.id===readings[currentReading].step);closeReader();setStep(n);$('#specimen').scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'});});
$('#specimen').addEventListener('keydown',e=>{
 if(['INPUT','BUTTON','A'].includes(e.target.tagName))return;
 if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();stopPlay();setStep(e.key==='Home'?0:e.key==='End'?7:index+(e.key==='ArrowRight'?1:-1));}
});
function motionChange(){if(reduce.matches){stopPlay();if(flip)flip.progress(1);$('#play').disabled=true;$('#play').textContent='Motion reduced';}else{$('#play').disabled=false;$('#play').textContent='Play the changes';}}
reduce.addEventListener('change',motionChange);
window.addEventListener('popstate',readHash);
window.addEventListener('resize',()=>{if(flip){flip.progress(1);flip.kill();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlay();});
setStep(0,false,false);motionChange();readHash();
window.morphology={get state(){return {index,step:steps[index].id,playing,reading:$('#reader').open?readings[currentReading].id:null,joins,reduced:reduce.matches};},checks:DATA.checks};
