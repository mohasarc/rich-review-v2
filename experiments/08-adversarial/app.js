document.documentElement.classList.add('js');

for (const button of document.querySelectorAll('[data-back]')) {
  button.addEventListener('click', () => {
    const details = button.closest('details.mechanism');
    details.open = false;
    details.querySelector('summary').focus({preventScroll:true});
    details.closest('.record').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  });
}

function revealHash() {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!target) return;
  for (let el=target; el; el=el.parentElement) if(el.tagName==='DETAILS') el.open=true;
}
window.addEventListener('hashchange',revealHash);
revealHash();

const spillSelect=document.getElementById('spill-scenario');
if(spillSelect){
  const scenarios={
    corrupt:{bytes:36,name:'Four short records total 36 B. The corrupt-resume cases stay below 64 KiB.'},
    ack:{bytes:65536,name:'One full 64 KiB record equals the new inline limit. Spilling uses >, so equality stays inline.'},
    dead:{bytes:131072,name:'Two full records total 128 KiB before disconnect. Both versions enter the disk path.'}
  };
  const render=()=>{
    const value=scenarios[spillSelect.value];
    document.getElementById('spill-base').textContent=value.bytes>0?'Disk path':'Inline';
    document.getElementById('spill-head').textContent=value.bytes>65536?'Disk path':'Inline';
    document.getElementById('spill-explain').textContent=value.name;
  };
  spillSelect.addEventListener('change',render);render();
}

const recoverySelect=document.getElementById('recovery-scenario');
if(recoverySelect){
 const rows={
   corrupt:['accepted → close → reattach accepted → truncated frame','closed','corrupt','Both submit execute twice. After the second admission, the head surfaces the new completion error.'],
   close:['accepted → close → reattach accepted → close','closed','closed','Both submit execute twice and finish with an accepted close error.'],
   fetch:['accepted → close → reattach + manifest → close → fetch → end → ack','completed','completed','Both submit execute twice and fetch once. A reattached attempt already had a fresh fetch allowance in the base.']
 };
 const render=()=>{const row=rows[recoverySelect.value];['recovery-path','recovery-base','recovery-head','recovery-note'].forEach((id,i)=>document.getElementById(id).textContent=row[i]);};
 recoverySelect.addEventListener('change',render);render();
}

const routeSelect=document.getElementById('route-scenario');
if(routeSelect){
 const rows={
  disabled:{n:0,out:'Local / cold. No registry read, probe, or warmup trigger.'},
  absent:{n:1,out:'Local / cold. Start warmup independently; do not wait for it.'},
  starting:{n:2,out:'Local / cold. Do not inspect version or probe; do not trigger another warmup.'},
  version:{n:3,out:'Local / fallback. Start warmup independently; do not probe this record.'},
  unresponsive:{n:4,out:'Local / cold, reason recovering. No warmup trigger for this observation.'},
  exited:{n:4,out:'Local / fallback. Attempt exact process cleanup, then trigger warmup independently.'},
  ready:{n:5,out:'Warm execute. No local executor is created for the successful warm path.'}
 };
 const render=()=>{
  const value=rows[routeSelect.value];
  document.querySelectorAll('#route-guards span').forEach((el,i)=>{el.className=i<value.n?'active':i===value.n?'stopped':'skipped';});
  document.getElementById('route-outcome').textContent=value.out;
 };
 routeSelect.addEventListener('change',render);render();
}
