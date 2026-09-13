import paper from 'paper';
import {materials,paneItems} from '../src/content.mjs';
paper.setup(new paper.Size(1000,740));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const material=id=>materials.find(m=>m.id===id);
const path=d=>new paper.Path(d);
const polygon=segments=>new paper.Path({segments,closed:true});
const rect=(x,y,w,h)=>new paper.Path.Rectangle(new paper.Rectangle(x,y,w,h));
const circle=(x,y,r)=>new paper.Path.Circle(new paper.Point(x,y),r);
const points=[];
function label(pane,x,y) {
 return `<text class="glass-label" x="${x}" y="${y}" text-anchor="middle"><tspan x="${x}">${esc(pane.label[0])}</tspan><tspan x="${x}" dy="23">${esc(pane.label[1])}</tspan><tspan class="glass-value" x="${x}" dy="30">${esc(pane.value)}</tspan></text>`;
}
function glazed(pane,shape,x,y) {
 const code=material(pane.material).short;
 points.push({id:pane.id,area:Math.abs(shape.area),bounds:{x:shape.bounds.x,y:shape.bounds.y,width:shape.bounds.width,height:shape.bounds.height}});
 const d=shape.pathData;
 const facet=shape.intersect(polygon([[x-160,y-95],[x+140,y-135],[x-30,y+150]]),{insert:false});
 const shine=shape.intersect(polygon([[x-135,y-100],[x-124,y-105],[x+165,y+95],[x+150,y+110]]),{insert:false});
 return `<g class="pane" id="pane-${pane.id}" data-pane="${pane.id}" data-material="${pane.material}" data-family="${pane.family}" tabindex="0" role="button" aria-label="${esc(pane.label.join(' ')+', '+pane.value+'. Select glass.')}" aria-pressed="false">
 <path class="glass-fill" d="${d}" fill="url(#color-${pane.material})"/>
 <path d="${facet.pathData}" class="facet" fill="#000" opacity=".09"/>
 <path d="${shine.pathData}" class="facet" fill="#fff" opacity=".10"/>
 <path d="${d}" class="base-hatch" fill="url(#local-input)"/>
 <path d="${d}" class="piece-lead"/>
 <text class="material-stamp" x="${x}" y="${y-24}" text-anchor="middle">${code}</text>
 ${label(pane,x,y)}
 <path d="${d}" class="focus-lead"/>
 </g>`;
}
const cracks=[
 {id:'04',x:245,y:644,d:'M276 619l-23 8 8 12 -22 5 11 16 -15 10',label:'Retired memory-cap option survives in the test helper'},
 {id:'09',x:256,y:398,d:'M278 378l-16 8 3 14 -15 5 5 11 -14 9',label:'Optional seams and worker re-parsing'},
 {id:'08',x:674,y:468,d:'M672 435l-19 9 7 12 -16 7 9 14',label:'Recovery error and fetch-loop limits'},
];
function crackMark(c) {return `<g class="head-crack" data-crack="${c.id}"><path d="${c.d}" class="crack-shadow"/><path d="${c.d}" class="crack-line"/><a href="#decision-${c.id}" aria-label="Crack ${c.id}: ${c.label}"><circle cx="${c.x}" cy="${c.y}" r="16" fill="#101b1b" stroke="#f1dcb5"/><text x="${c.x}" y="${c.y+5}" text-anchor="middle" class="crack-number">${c.id}</text></a></g>`;}

export function makeGlass() {
 const capacity=path('M65,674 L65,385 Q65,270 175,208 Q285,270 285,385 L285,674 Z');
 const lifecycle=path('M715,674 L715,362 A110,110 0 0 1 935,362 L935,674 Z');
 let purpose=circle(500,340,112).unite(circle(410,430,112),{insert:false});
 purpose=purpose.unite(circle(590,430,112),{insert:false}).unite(circle(500,520,112),{insert:false});
 const cuts={
  capture:[capacity.intersect(rect(40,150,270,224),{insert:false}),175,311],
  framing:[capacity.intersect(rect(40,374,270,97),{insert:false}),130,409],
  worker:[capacity.intersect(polygon([[175,374],[305,374],[305,516],[175,516]]),{insert:false}),233,455],
  memory:[capacity.intersect(rect(40,516,270,170),{insert:false}),175,562],
  status:[purpose.intersect(rect(280,180,220,250),{insert:false}),424,335],
  ordinary:[purpose.intersect(rect(500,180,220,250),{insert:false}),563,335],
  reattach:[purpose.intersect(rect(280,430,220,245),{insert:false}),437,479],
  fetch:[purpose.intersect(rect(500,430,220,245),{insert:false}),563,479],
  startup:[lifecycle.intersect(rect(700,230,250,190),{insert:false}),825,337],
  shutdown:[lifecycle.intersect(rect(700,420,250,120),{insert:false}),825,455],
  diagnostics:[lifecycle.intersect(rect(700,540,250,140),{insert:false}),825,581],
 };
 // Divide one capacity band at the worker seam; every colored piece is non-overlapping.
 cuts.framing[0]=capacity.intersect(polygon([[45,374],[175,374],[175,516],[45,516]]),{insert:false});
 const all=[];
 const intersections=[];
 const entries=Object.entries(cuts);
 for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++) {
  const overlap=Math.abs(entries[i][1][0].intersect(entries[j][1][0],{insert:false}).area);
  if(overlap>0.1)throw Error(`Glass pieces overlap: ${entries[i][0]} / ${entries[j][0]} / ${overlap}`);
  intersections.push(overlap);
 }
 for(const p of paneItems) all.push(glazed(p,...cuts[p.id]));
 let rose='';
 const disc=circle(500,117,64);
 for(let i=0;i<materials.length;i++) {
  const a=-Math.PI/2+i*2*Math.PI/7;const b=a+2*Math.PI/7;
  const wedge=polygon([[500,117],[500+180*Math.cos(a),117+180*Math.sin(a)],[500+180*Math.cos(b),117+180*Math.sin(b)]]);
  const piece=disc.intersect(wedge,{insert:false});
  rose+=`<path d="${piece.pathData}" fill="url(#color-${materials[i].id})" stroke="#14201f" stroke-width="4"/>`;
 }
 const defs=materials.map(m=>`<linearGradient id="color-${m.id}" x1="0" y1="1" x2=".8" y2="0"><stop offset="0" stop-color="${m.color}" stop-opacity=".60"/><stop offset=".50" stop-color="${m.color}"/><stop offset="1" stop-color="${m.color}" stop-opacity=".80"/></linearGradient>`).join('');
 const svg=`<svg id="policy-glass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 746" aria-labelledby="glass-title glass-desc" role="group">
 <title id="glass-title">Policy stained glass: shared material, distinct consumer purposes</title>
 <desc id="glass-desc">Existing daemon policy above three consumer shapes in apps/cli. Pointed pane: capacity. Four-lobed pane: transport deadlines and delivery allowances. Rounded pane: lifecycle and diagnostics. Blue status glass is 100 milliseconds; ordinary glass is 250. Amber delivery glass gives one reattachment per request and one fetch resume per attempt. Select a piece or a numbered crack. The shapes and sizes are a lossy analogy.</desc>
 <defs>${defs}<pattern id="local-input" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><path d="M0,0L0,13" stroke="#f7e5bd" opacity=".35" stroke-width="3"/></pattern><radialGradient id="ambient"><stop offset="0" stop-color="#bbae81" stop-opacity=".10"/><stop offset="1" stop-color="#bbae81" stop-opacity="0"/></radialGradient></defs>
 <ellipse cx="500" cy="400" rx="485" ry="346" fill="url(#ambient)"/>
 <path d="M20 682V369C20 172 239 69 420 34 M980 682V369C980 172 761 69 580 34" fill="none" stroke="#a8966b" stroke-opacity=".20" stroke-width="1"/>
 <path d="M34 682V371C34 197 247 90 424 50 M966 682V371C966 197 753 90 576 50" fill="none" stroke="#a8966b" stroke-opacity=".10" stroke-width="7"/>
 <text x="500" y="26" class="package-label" text-anchor="middle">PACKAGES / DAEMON</text>
 <g id="snapshot">${rose}<circle cx="500" cy="117" r="31" fill="#14201f" stroke="#d0b883" stroke-width="1"/><text x="500" y="113" class="rose-label" text-anchor="middle">ONE</text><text x="500" y="129" class="rose-label" text-anchor="middle">POLICY</text><circle cx="500" cy="117" r="70" fill="none" stroke="#a8966b" stroke-opacity=".45"/></g>
 <text x="500" y="210" class="package-note" text-anchor="middle">Existing snapshot · same values across processes</text>
 ${all.join('')}
 ${[capacity,purpose,lifecycle].map(s=>`<path d="${s.pathData}" class="required-lead"/>`).join('')}
 <g class="head-cracks">${cracks.map(crackMark).join('')}</g>
 <text x="175" y="706" class="family-label" text-anchor="middle">I / CAPACITY</text>
 <text x="500" y="666" class="family-label" text-anchor="middle">II / PURPOSE</text>
 <text x="825" y="706" class="family-label" text-anchor="middle">III / LIFECYCLE</text>
 <path d="M65 720v8H935v-8" fill="none" stroke="#8c947f" stroke-opacity=".45"/>
 <rect x="305" y="716" width="390" height="27" fill="#101919"/>
 <text x="500" y="733" class="package-label" text-anchor="middle">APPS / CLI · MECHANISM OWNERS STAY HERE</text>
 </svg>`;
 const expected=Math.abs(capacity.area)+Math.abs(purpose.area)+Math.abs(lifecycle.area);
 const actual=points.reduce((sum,p)=>sum+p.area,0);
 if(Math.abs(expected-actual)>1)throw Error('Pane coverage mismatch '+expected+' / '+actual);
 return {svg,geometry:{library:'Paper.js 0.12.18',expectedArea:expected,actualArea:actual,pieces:points,pairwiseOverlapChecks:intersections.length,maximumOverlap:Math.max(...intersections),areaIsIllustrative:true}};
}
