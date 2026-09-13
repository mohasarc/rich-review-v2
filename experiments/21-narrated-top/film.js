/* The same deterministic drawing drives the interactive film and exported MP4. */
(() => {
  const C = { bg:'#101e28',box:'#172b37',line:'#49616c',ink:'#eff4ed',muted:'#a3b8bd',core:'#b6dca6',daemon:'#78ced4',cli:'#ecca85',ts:'#b6adf0',red:'#eea390' };
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rect=(x,y,w,h,color=C.box,stroke=C.line,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="${color}" stroke="${stroke}" stroke-width="1.5" ${extra}/>`;
  const tx=(s,x,y,size=22,color=C.ink,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${esc(s)}</text>`;
  const metrics=document.createElement('canvas').getContext('2d');
  const wrapPixels=(s,x,y,width,size=23,color=C.ink,lineHeight=size*1.35)=>{
    metrics.font=`${size}px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif`;
    const words=s.split(' '),lines=[];let line='';
    for(const word of words){if(metrics.measureText(line+' '+word).width>width && line){lines.push(line);line=word;}else line+=(line?' ':'')+word;}
    if(line)lines.push(line);return lines.map((l,i)=>tx(l,x,y+i*lineHeight,size,color)).join('');
  };
  const wrap=(s,x,y,width,size=23,color=C.ink,lineHeight=size*1.35)=>wrapPixels(s,x,y,width*size*.5,size,color,lineHeight);
  const arrow=(x,y,x2,y2,color=C.muted,dashed=false)=>`<path d="M${x} ${y} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="2" marker-end="url(#arrow)" ${dashed?'stroke-dasharray="7 5"':''}/>`;
  const path=(d,color=C.muted)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="2" marker-end="url(#arrow)"/>`;
  const dot=(x,y,color=C.daemon)=>`<circle cx="${x}" cy="${y}" r="6" fill="${color}"/>`;
  const link=(id,body)=>`<a href="${location.pathname.endsWith('film.html')?'index.html':''}#m-${id}" aria-label="Explore ${id}">${body}</a>`;
  const box=(x,y,w,h,title,sub,color=C.daemon,id)=>{
    const body=rect(x,y,w,h,C.box,color)+tx(title,x+20,y+35,24,color,'font-weight="650"')+(sub?wrapPixels(sub,x+20,y+65,w-40,18,C.muted,24):'');
    return id?link(id,body):body;
  };
  const pill=(x,y,w,s,color=C.daemon)=>rect(x,y,w,34,'#132630',color)+tx(s,x+w/2,y+23,17,color,'text-anchor="middle"');
  function owners(p){
    let s=tx('MAIN',70,168,17,C.muted)+tx('TIP OF #149',706,168,17,C.muted);
    s+=rect(65,183,485,286,'#162631',C.line)+box(84,205,447,104,'CLI','Syntax + daemon process / transport / delivery',C.cli,'host');
    s+=box(84,326,447,120,'TypeScript backend','Language algorithms + reusable state',C.ts,'state');
    s+=arrow(575,320,670,320,C.daemon)+dot(580+70*p,320);
    s+=box(700,183,220,110,'CLI','Syntax · environment · executor',C.cli,'host');
    s+=box(938,183,278,110,'Daemon','Client · process · transport · delivery',C.daemon,'delivery');
    s+=box(700,310,220,110,'Core','Sessions · indexes · graph · caches',C.core,'state');
    s+=box(938,310,278,110,'TypeScript','Syntax · tsconfig · semantics',C.ts,'state');
    s+=pill(700,436,220,'Renderer → formats',C.cli)+pill(938,436,278,'Telemetry → usage only',C.muted);
    return s+tx('Moved boundaries are the subject. End-user behavior is the preservation goal.',65,508,23,C.muted);
  }
  function host(p){
    let s=box(65,162,348,148,'CLI host','Resolve canonical state path · classify argv · choose executor',C.cli,'host');
    s+=box(600,162,615,148,'@symnav/daemon','Public client → routing → process → worker',C.daemon,'host');
    s+=arrow(422,214,582,214,C.cli)+tx('root contract',438,192,18,C.cli)+dot(430+140*p,214,C.cli);
    s+=box(65,345,348,156,'Executor module','CLI program + retained core session + TypeScript backend',C.cli,'state');
    s+=path('M1090 310 V393 H432',C.daemon)+tx('worker dynamically loads supplied file URL',600,379,18,C.daemon);
    s+=path('M414 455 H1120 V312',C.core)+tx('ordered stdout/stderr bytes · exit code · diagnostics',477,484,18,C.core);
    s+=tx('Zero internal package imports',622,270,22,C.daemon)+tx('Node runs the implementation; public declarations stay Node-free.',65,539,21,C.muted);
    return s;
  }
  function state(p){
    let s=rect(65,160,1150,353,'#142630',C.core)+tx('REUSABLE STATE  ·  core mechanisms consumed by the TypeScript backend',85,192,20,C.core);
    s+=box(85,215,324,113,'Revision / project state','Prepare → validate → commit → publish',C.core,'state');
    s+=box(448,215,346,113,'Semantic turn','Successful refresh → next turn; failure keeps current turn',C.core,'state');
    s+=box(830,215,365,113,'Source-byte cache','Selected snapshot replaces coverage; omitted bytes leave',C.core,'state');
    s+=arrow(412,264,435,264,C.core);
    s+=tx('Six isolated key spaces',88,372,20,C.muted);
    ['def: identity','refs','target','callees','callers','def: position'].forEach((n,i)=>{s+=pill(88+i*143,389,128,n,C.core);});
    s+=tx('Clear synchronously',90,463,23,C.core)+arrow(351,455,411,455,C.core)+tx('then await project release',440,463,23,C.muted);
    s+=dot(353+50*p,455,C.core);
    s+=tx('ensureFiles: file A commits; a later failure in file B keeps A’s progress.',65,547,21,C.muted);
    return s;
  }
  function delivery(p){
    let s=tx('ADMISSION · first failure wins',65,167,18,C.muted);
    ['authenticate','worker ready','no pressure','queue accepts','compatible ID'].forEach((n,i)=>{
      s+=pill(65+i*231,183,214,n,i===Math.min(4,Math.floor(p*5))?C.cli:C.daemon);
    });
    s+=box(65,258,257,112,'Client','Request R7 · same identity',C.cli,'delivery');
    s+=box(445,258,326,112,'Accepted ledger + FIFO','R7 accepted once → one turn',C.daemon,'delivery');
    s+=box(890,258,325,112,'Delivery + spool','Complete result → stored records',C.daemon,'delivery');
    s+=arrow(330,310,430,310)+arrow(781,310,875,310)+dot(335+88*p,310,C.cli);
    s+=path('M1050 375 V426 H200 V377',C.core)+tx('FETCH RESUME  ·  same capture · next durably appended record',300,416,19,C.core);
    s+=path('M190 376 V483 H609 V378',C.cli)+tx('REATTACH  ·  fresh capture · same R7 · no new execution',273,510,19,C.cli);
    s+=tx('Independent limits: 1 fetch resume per attempt + 1 accepted reattachment.',65,554,22,C.muted);
    return s;
  }
  function policy(p){
    let s=box(65,160,340,157,'Immutable policy','Status 100 ms · ordinary 250 ms · admission 5 s · idle 30 min',C.daemon,'policy');
    s+=box(460,160,353,157,'Worker generations','Warm-up → sample → ready; one shared replacement',C.daemon,'policy');
    s+=box(870,160,345,157,'FIFO execution + delivery','Turn → sample → next turn; completion → acknowledgement',C.daemon,'delivery');
    s+=arrow(412,235,447,235)+arrow(822,235,856,235)+dot(413+30*p,235);
    s+=tx('NO TIMER  ·  intentional in the current policy',65,358,19,C.cli);
    ['healthy startup','startup silence','accepted completion','worker output ack','unacked result'].forEach((n,i)=>s+=pill(65+i*232,375,214,n,C.cli));
    s+=rect(65,435,1150,103,'#142630',C.line)+tx('Idle clock',87,468,22,C.daemon);
    s+=tx('constructed → deadline armed',280,468,21,C.muted)+tx('navigation accepted → deadline reset',701,468,21,C.muted);
    s+=tx('Activity is projected from snapshots. CLI executor separately constructs a default policy.',87,508,20,C.muted);
    return s;
  }
  function cutover(p){
    let s=box(65,162,507,147,'#148  ·  stage the package','Package mechanisms exist. Shipped CLI still follows frozen app-local copies.',C.cli,'cutover');
    s+=box(704,162,511,147,'#149  ·  switch the CLI','CLI → DaemonClient. App copies removed. Compiler inventories + read-only inspector.',C.daemon,'cutover');
    s+=arrow(587,235,688,235)+dot(594+75*p,235);
    s+=tx('DEFERRED BEHAVIOR  ·  recorded in the follow-up contract',65,350,18,C.muted);
    ['ledger eviction','startup silence','control readiness','endpoint placement','sibling byte retention','readiness-armed idle','completion-based idle','socket-bind evaluation'].forEach((n,i)=>s+=pill(65+(i%4)*292,369+Math.floor(i/4)*48,274,n,C.muted));
    s+=rect(65,479,1150,65,'#302c28',C.cli)+tx('Also changed: test boundaries, test time budgets, the PR template.',86,508,23,C.cli)+tx('The page marks stated reasons and unexplained choices individually.',86,532,17,C.muted);
    return s;
  }
  const renderers=[owners,host,state,delivery,policy,cutover];
  window.renderFilm = (time, mount=document.getElementById('film')) => {
    time=Math.max(0,Math.min(89.999,time));
    const idx=Math.floor(time/15),local=time%15,p=(local%5)/5,scene=REVIEW.scenes[idx];
    const cues=window.AUDIO_CUES?.filter(c=>c.scene===idx);
    let caption=scene.lines[local<7.5?0:1];
    if(cues?.length) caption=(cues.find(c=>time>=c.start && time<c.end)||cues[cues.length-1]).text;
    const body=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" role="img" aria-label="${esc(scene.title)}" style="font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0 0L8 4L0 8" fill="none" stroke="${C.muted}"/></marker></defs>
      <rect width="1280" height="720" fill="${C.bg}"/>
      ${tx('SYMNAV  /  MAIN → #149',65,45,17,C.muted,'letter-spacing="2"')}
      ${tx(`${idx+1} / 6     ${String(Math.floor(time)).padStart(2,'0')}s`,1215,45,17,C.muted,'text-anchor="end"')}
      ${tx(scene.title,65,108,40,C.ink,'font-weight="650" letter-spacing="-1"')}
      ${renderers[idx](p)}
      <rect x="0" y="577" width="1280" height="143" fill="#0b1720"/>
      ${wrap(caption,65,615,102,23,C.ink,30)}
      ${tx('Compressed schematic · illustrative motion · synthetic narration',65,704,13,C.muted)}
      <rect x="0" y="717" width="${time/90*1280}" height="3" fill="${C.daemon}"/>
    </svg>`;
    mount.innerHTML=body;
    mount.dataset.scene=scene.id;
    return {index:idx,time,caption};
  };
})();
