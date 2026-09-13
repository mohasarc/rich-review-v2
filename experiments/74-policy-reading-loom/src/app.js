import {select, scaleBand, symbol, symbolCircle, symbolDiamond} from 'd3';
import model from '../evidence/model.json';
import probe from '../evidence/probe.json';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const colors={capacity:'#a57521',time:'#257c80',memory:'#756297',recovery:'#b25a43'};
const depths=['surface','wiring','source'];
const rowIds=model.rows.map(x=>x.id), sliceIds=model.slices.map(x=>x.id);
const fieldMap=new Map(model.fields.map(f=>[f.id,f]));
const cellMap=new Map(model.cells.map(c=>[c.id,c]));
const x=scaleBand(sliceIds,[194,1062]).paddingInner(.035), y=scaleBand(rowIds,[95,663]).paddingInner(.065);
const fx=new Map(model.slices.map(s=>[s.id,scaleBand(model.fields.filter(f=>f.slice===s.id).map(f=>f.id),[x(s.id)+13,x(s.id)+x.bandwidth()-13]).paddingInner(.17)]));
const allCells=model.rows.flatMap(row=>model.slices.map(slice=>cellMap.get(row.id+':'+slice.id)||{id:row.id+':'+slice.id,row:row.id,slice:slice.id,empty:true,fields:[]}));
let state={row:'capture',slice:'output',depth:'surface',thread:'all',note:''}, sourceOpener;
const svg=select('#loom');
const centerY=row=>y(row)+y.bandwidth()*.42;
const centerX=field=>fx.get(field.slice)(field.id)+fx.get(field.slice).bandwidth()/2;

function visibleFields() {
  if(state.thread==='all') return new Set(model.fields.map(f=>f.id));
  if(state.thread==='chunk') return new Set(['output.maximumChunkRawBytes']);
  if(state.thread==='equal') return new Set(model.fields.filter(f=>f.value==='250 ms').map(f=>f.id));
  if(state.thread==='budgets') return new Set(model.fields.filter(f=>f.slice==='delivery').map(f=>f.id));
  return new Set([state.thread]);
}
function address(){return new URLSearchParams({...state}).toString();}
function change(patch,focus=false){
  state={...state,...patch};
  if(!('note' in patch)&&(patch.row||patch.slice)) state.note='';
  history.pushState(null,'','#'+address());render();
  if(focus) focusCell();
}
function readHash(){
  const p=new URLSearchParams(location.hash.slice(1));
  state={row:rowIds.includes(p.get('row'))?p.get('row'):'capture',slice:sliceIds.includes(p.get('slice'))?p.get('slice'):'output',depth:depths.includes(p.get('depth'))?p.get('depth'):'surface',thread:['all','chunk','equal','budgets'].includes(p.get('thread'))||fieldMap.has(p.get('thread'))?p.get('thread'):'all',note:model.notes.some(n=>n.id===p.get('note'))?p.get('note'):''};
}
function focusCell(){
  const el=document.getElementById('cell-'+state.row+'-'+state.slice);el.focus({preventScroll:true});
  const scroller=$('.cloth-scroll'), box=el.getBoundingClientRect(), outer=scroller.getBoundingClientRect();
  if(box.left<outer.left+8) scroller.scrollLeft-=outer.left+8-box.left;
  if(box.right>outer.right-8) scroller.scrollLeft+=box.right-outer.right+8;
}
function move(dx,dy){change({row:rowIds[Math.max(0,Math.min(6,rowIds.indexOf(state.row)+dy))],slice:sliceIds[Math.max(0,Math.min(6,sliceIds.indexOf(state.slice)+dx))]},true);}

function initCloth(){
  svg.append('title').text('The policy reading loom');
  svg.append('desc').text('Rows are seven consumer families; columns are seven policy slices. Individual vertical strands represent traced policy leaves. Circles repeat across families; diamonds occur in one family. Heavy ties read required values; light ties forward policy. Dashed cell rims link to visible rationale gaps.');
  const head=svg.append('g').attr('role','row');
  head.append('text').attr('x',13).attr('y',31).attr('class','source-label').text('MECHANISMS / apps/cli');
  head.selectAll('g.column').data(model.slices).join('g').attr('class','column').attr('role','columnheader').each(function(s,i){
    const g=select(this), mid=x(s.id)+x.bandwidth()/2;
    g.append('text').attr('x',mid).attr('y',26).attr('class','column-number').text(String(i+1).padStart(2,'0'));
    g.append('text').attr('x',mid).attr('y',49).attr('class','column-label').text(s.name);
    g.append('line').attr('x1',x(s.id)+8).attr('x2',x(s.id)+x.bandwidth()-8).attr('y1',66).attr('y2',66).attr('class','column-cap');
  });
  svg.append('g').attr('class','selection-bands').selectAll('rect').data(allCells).join('rect').attr('class','cell-bg').attr('data-id',d=>d.id).attr('x',d=>x(d.slice)+2).attr('y',d=>y(d.row)).attr('width',x.bandwidth()-4).attr('height',y.bandwidth()).attr('rx',5);
  const warp=svg.append('g').attr('aria-hidden','true');
  warp.selectAll('line.warp').data(model.fields).join('line').attr('class','warp').attr('x1',centerX).attr('x2',centerX).attr('y1',78).attr('y2',674).attr('stroke',f=>colors[f.purpose]);
  const threads=svg.append('g').attr('aria-hidden','true');
  threads.selectAll('line.field-thread').data(model.fields).join('line').attr('class','field-thread').attr('x1',centerX).attr('x2',centerX).attr('y1',f=>Math.min(...f.rows.map(centerY))-17).attr('y2',f=>Math.max(...f.rows.map(centerY))+17).attr('stroke',f=>colors[f.purpose]);
  const rows=svg.append('g').selectAll('g.consumer').data(model.rows).join('g').attr('class','consumer').attr('role','row').attr('aria-rowindex',(_,i)=>i+2);
  rows.each(function(row,i){
    const g=select(this), yy=centerY(row.id);
    g.append('line').attr('x1',185).attr('x2',1063).attr('y1',yy).attr('y2',yy).attr('class','weft');
    g.append('line').attr('x1',185).attr('x2',1063).attr('y1',yy+5).attr('y2',yy+5).attr('class','weft-fine');
    const rh=g.append('g').attr('role','rowheader');
    rh.append('text').attr('x',12).attr('y',yy-10).attr('class','row-number').text(String(i+1).padStart(2,'0'));
    rh.append('text').attr('x',37).attr('y',yy-10).attr('class','row-label').text(row.name);
    rh.append('text').attr('x',37).attr('y',yy+10).attr('class','row-sub').text(row.sub);
    const cells=g.selectAll('g.crossing').data(allCells.filter(c=>c.row===row.id)).join('g').attr('class','crossing').attr('id',c=>'cell-'+c.row+'-'+c.slice).attr('role','gridcell').attr('aria-colindex',c=>sliceIds.indexOf(c.slice)+2);
    cells.each(function(c){
      const cg=select(this), xx=x(c.slice), w=x.bandwidth(), h=y.bandwidth();
      cg.append('title').text(c.empty?`${row.name} × ${c.slice}: no traced route`:`${row.name} × ${c.slice}: ${c.summary}`);
      cg.append('rect').attr('class','cell-target').attr('x',xx+2).attr('y',y(c.row)).attr('width',w-4).attr('height',h).attr('rx',5).attr('fill','transparent');
      if(c.empty) {cg.append('text').attr('x',xx+w/2).attr('y',yy+27).attr('class','empty-label').text('—');return;}
      cg.append('rect').attr('class','contract-rim'+(c.gap?' has-gap':'')).attr('x',xx+6).attr('y',yy-20).attr('width',w-12).attr('height',39).attr('rx',3);
      cg.append('text').attr('class','cell-label').attr('x',xx+w/2).attr('y',yy+34).text(c.label);
      if(c.gap) cg.append('text').attr('x',xx+w-7).attr('y',yy-22).attr('class','gap-label').text('U');
      const knots=cg.selectAll('g.knot').data(c.fields.map(id=>fieldMap.get(id))).join('g').attr('class','knot');
      knots.append('line').attr('x1',centerX).attr('x2',centerX).attr('y1',yy-13).attr('y2',yy+13).attr('stroke',f=>colors[f.purpose]).attr('stroke-width',f=>f.forward.includes(c.row)?2:6).attr('stroke-linecap','round');
      knots.append('path').attr('d',f=>symbol(f.rows.length>1?symbolCircle:symbolDiamond, f.rows.length>1?49:47)()).attr('transform',f=>`translate(${centerX(f)},${yy})`).attr('fill','#fbf8ee').attr('stroke',f=>colors[f.purpose]).attr('stroke-width',1.8);
      knots.append('title').text(f=>`${f.id} · ${f.value} · ${f.forward.includes(c.row)?'forwarded':'read here'} · ${f.rows.length>1?'shared across '+f.rows.length+' drawn families':'one drawn family'}`);
      knots.on('click',(event,f)=>{event.stopPropagation();change({row:c.row,slice:c.slice,thread:f.id},true);});
    });
    cells.on('click',(_,c)=>change({row:c.row,slice:c.slice},true)).on('keydown',(event,c)=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();change({row:c.row,slice:c.slice});$('#inspector').focus({preventScroll:true});return;}
      const motion={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(motion[event.key]){event.preventDefault();move(...motion[event.key]);}
      if(event.key==='PageDown'||event.key==='PageUp'){event.preventDefault();change({depth:depths[Math.max(0,Math.min(2,depths.indexOf(state.depth)+(event.key==='PageDown'?1:-1)))]},true);}
      if(event.key==='Escape'){event.preventDefault();change({depth:'surface',thread:'all',note:''},true);}
    });
  });
}

function receiptList(ids){return `<div class="receipt-list">${ids.map(id=>{const r=model.receipts[id],s=model.sources[r.source];return `<a href="evidence.html#${id}" data-receipt="${id}"><span>${esc(id.replaceAll('-',' '))}</span><small>${esc(s.revision)} · ${esc(s.path.split('/').at(-1))}:${r.start}</small><b>↗</b></a>`;}).join('')}</div>`;}
function fieldList(cell){return `<div class="leaf-list">${cell.fields.map(id=>{const f=fieldMap.get(id);return `<button class="leaf ${visibleFields().has(id)&&state.thread!=='all'?'chosen':''}" data-leaf="${id}"><span class="leaf-symbol" style="color:${colors[f.purpose]}">${f.rows.length>1?'○':'◇'}</span><span>${esc(f.label)}<small>${f.forward.includes(cell.row)?'forwarded · ':''}${esc(f.leaf)}</small></span><b>${esc(f.value)}</b></button>`;}).join('')}</div>`;}
function probeFigure(){return `<div class="probe"><p class="eyebrow">RECORDED / ACTUAL SOURCE METHODS</p><h4>Ten bytes through a 4-byte policy.</h4><p class="probe-limit">Controlled fixture: head chunk 4, inline 8, result 12, aggregate 24 bytes. Base uses its local defaults. No daemon run.</p>${['base','head'].map(rev=>`<div class="probe-build"><span>${rev}</span><div class="probe-records">${probe.builds[rev].recordBytes.map(n=>`<i style="flex:${n}">${n}</i>`).join('')}</div><b>10 B</b></div>`).join('')}<p>Five-byte message · codec / worker validator</p><div class="probe-verdict"><span>BASE <b>accepted / accepted</b></span><span>HEAD <b>capacity error / invalid response</b></span></div><p class="probe-limit">Record widths encode byte counts. The page replays saved observations; it does not change runtime policy.</p><a href="evidence/probe.json">Raw observations ↗</a></div>`;}

function renderInspector(){
  const row=model.rows.find(r=>r.id===state.row), cell=cellMap.get(state.row+':'+state.slice);
  let html=`<p class="coordinate">${String(rowIds.indexOf(state.row)+1).padStart(2,'0')} × ${String(sliceIds.indexOf(state.slice)+1).padStart(2,'0')} <span>/ ${esc(state.depth)}</span></p><h3>${esc(row.name)}<span>× ${esc(state.slice)}</span></h3>`;
  if(!cell){html+=`<div class="empty-state"><span>×</span><h4>No route drawn here.</h4><p>This family has no traced use of this slice in the curated inventory. Empty space is not proof of an absent transitive dependency.</p></div>`;}
  else {
    html+=`<p class="cell-summary">${esc(cell.summary)}</p>`;
    const note=state.note?model.notes.find(n=>n.id===state.note):null;
    if(note)html+=`<div class="selected-note"><span class="state ${note.state}">${note.state==='stated'?'S · Stated':'U · Unexplained'} / ${note.id}</span><h4>${esc(note.title)}</h4><p>${esc(note.text)}</p><p class="reason">${esc(note.reason)}</p><a href="#reading-${note.id}">Return to open reading ${note.id} ↑</a></div>`;
    if(state.depth==='surface')html+=fieldList(cell);
    if(state.depth==='wiring'){
      html+=`<ol class="steps">${cell.mechanism.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`;
      if(cell.slice==='output'&&['capture','spool','socket','worker'].includes(cell.row))html+=probeFigure();
      html+=fieldList(cell);
    }
    if(state.depth==='source'){
      html+=`<p class="evidence-limit">Pinned source, with exact line ranges. Test files are evidence of test content; these suites were not run here.</p>`+receiptList([...new Set([...(note?note.refs:[]),...cell.refs,'record','policy','defaults','validation','spec'])]);
    }
    html+=`<div class="related-readings"><span class="eyebrow">SURFACE READINGS</span>${[...new Set([...cell.notes,...model.notes.filter(n=>n.cell===cell.id).map(n=>n.id)])].map(id=>{const n=model.notes.find(n=>n.id===id);return `<a href="#reading-${id}"><span>${id}</span>${esc(n.title)} ${n.state==='unexplained'?'<b>U</b>':''}</a>`;}).join('')}</div>`;
  }
  $('#selection-content').innerHTML=html;
}

function render(){
  const visible=visibleFields(), filtering=state.thread!=='all';
  svg.selectAll('.cell-bg').classed('selected',d=>d.row===state.row&&d.slice===state.slice);
  svg.selectAll('.crossing').attr('tabindex',d=>d.row===state.row&&d.slice===state.slice?0:-1).attr('aria-selected',d=>String(d.row===state.row&&d.slice===state.slice)).attr('aria-label',d=>`${model.rows.find(r=>r.id===d.row).name}, ${d.slice}. ${d.empty?'No traced route.':d.summary}`);
  svg.selectAll('.column').classed('chosen-axis',d=>d.id===state.slice);
  svg.selectAll('.consumer').classed('chosen-axis',d=>d.id===state.row);
  svg.selectAll('.knot').style('opacity',f=>visible.has(f.id)?1:.12);
  svg.selectAll('.field-thread').style('stroke-width',f=>filtering&&visible.has(f.id)?3:1.3).style('opacity',f=>filtering?(visible.has(f.id)?.85:.035):.18);
  svg.selectAll('.warp').style('opacity',f=>filtering?(visible.has(f.id)?.23:.025):.075);
  svg.selectAll('.contract-rim').style('opacity',d=>filtering&&!d.fields.some(id=>visible.has(id))?.16:.9);
  svg.selectAll('.cell-label,.gap-label').style('opacity',d=>filtering&&!d.fields.some(id=>visible.has(id))?.34:1);
  $$('.depths button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.depth===state.depth)));
  $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.thread)));
  $('#row-select').value=state.row;$('#slice-select').value=state.slice;
  $('#thread-select').value=fieldMap.has(state.thread)?state.thread:state.thread==='chunk'?'output.maximumChunkRawBytes':'all';
  const messages={all:'Every vertical strand names a field. Read down for sharing; read across for a consumer’s responsibilities.',chunk:'ONE FIELD / maximumChunkRawBytes · 64 KiB · four reading families + one host handoff.',equal:'SAME NUMBER / Ordinary response · drain ACK grace · RSS sampling. Three 250 ms fields. Three separate strands.',budgets:'TWO SCOPES / 1 execution reattachment · 1 fetch resume per execute attempt. Equal allowances do not combine their counters.'};
  const f=fieldMap.get(state.thread);
  $('#comparison-readout').textContent=f?`${f.id} / ${f.value} / ${f.rows.length} drawn ${f.rows.length===1?'family':'families'} · ${f.rows.map(r=>model.rows.find(row=>row.id===r).name).join(' · ')}`:messages[state.thread];
  renderInspector();
}

function openReceipt(id,opener){
  const r=model.receipts[id],s=model.sources[r.source],lines=s.text.split('\n');sourceOpener=opener;
  $('#source-revision').textContent=`${s.revision.toUpperCase()} / ${s.sha}`;
  $('#source-title').textContent=id.replaceAll('-',' ');
  $('#source-path').textContent=s.path+':'+r.start+'–'+r.end;
  const numbered=(list,start)=>list.map((l,i)=>`<span${start+i===r.anchor?' class="source-anchor"':''}><b>${start+i}</b>${esc(l)}</span>`).join('');
  $('#source-code').innerHTML=numbered(lines.slice(r.start-1,r.end),r.start);
  $('#full-source-code').innerHTML=numbered(lines,1);$('#full-source-details').open=false;
  $('#source-links').innerHTML=`<a href="evidence.html#${id}">Standalone receipt</a> · <a href="https://github.com/mohasarc/symnav/blob/${s.sha}/${s.path}#L${r.start}" target="_blank" rel="noreferrer">Pinned GitHub source ↗</a><small>SHA-256 ${s.sha256}</small>`;
  $('#source-dialog').showModal();$('#source-dialog').scrollTop=0;
}

initCloth();
$('#row-select').innerHTML=model.rows.map(r=>`<option value="${r.id}">${r.name}</option>`).join('');
$('#slice-select').innerHTML=model.slices.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
$('#thread-select').innerHTML+=[...model.slices].map(s=>`<optgroup label="${s.name}">${model.fields.filter(f=>f.slice===s.id).map(f=>`<option value="${f.id}">${f.label} · ${f.value}</option>`).join('')}</optgroup>`).join('');
$('#row-select').onchange=e=>change({row:e.target.value});$('#slice-select').onchange=e=>change({slice:e.target.value});
$('#thread-select').onchange=e=>change({thread:e.target.value});$('#clear-thread').onclick=()=>change({thread:'all'});
$$('[data-mode]').forEach(b=>b.onclick=()=>{const thread=b.dataset.mode;const extra=thread==='chunk'?{row:'capture',slice:'output'}:thread==='equal'?{row:'socket',slice:'transport'}:thread==='budgets'?{row:'socket',slice:'delivery'}:{};change({thread,...extra});});
$$('[data-depth]').forEach(b=>b.onclick=()=>change({depth:b.dataset.depth}));
$('#surface-button').onclick=()=>change({depth:'surface',note:''});
$('#locate-button').onclick=()=>{$('#loom-section').scrollIntoView();focusCell();};
for(const [id,delta] of [['previous-cell',-1],['next-cell',1]])$('#'+id).onclick=()=>{
  const index=model.cells.findIndex(c=>c.id===state.row+':'+state.slice), next=model.cells[(index+delta+model.cells.length)%model.cells.length];change({row:next.row,slice:next.slice});
};
document.addEventListener('click',e=>{
  const receipt=e.target.closest('[data-receipt]');if(receipt){e.preventDefault();openReceipt(receipt.dataset.receipt,receipt);return;}
  const leaf=e.target.closest('[data-leaf]');if(leaf){change({thread:leaf.dataset.leaf});return;}
  const reading=e.target.closest('[data-note]');if(reading){e.preventDefault();const n=model.notes.find(n=>n.id===reading.dataset.note),[row,slice]=n.cell.split(':');change({row,slice,depth:'wiring',note:n.id});$('#inspector').scrollIntoView({block:'start'});$('#inspector').focus({preventScroll:true});}
});
$('#close-source').onclick=()=>$('#source-dialog').close();
$('#source-dialog').addEventListener('close',()=>sourceOpener?.focus({preventScroll:true}));
window.addEventListener('popstate',()=>{if(location.hash.startsWith('#row=')){readHash();render();}});
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#row=')){readHash();render();}});
readHash();render();
