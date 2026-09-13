import ELK from 'elkjs/lib/elk.bundled.js';
import fs from 'node:fs';
import {components,traces} from '../src/topology.mjs';
const graph={id:'circuit',layoutOptions:{
 'elk.algorithm':'layered','elk.direction':'RIGHT','elk.edgeRouting':'ORTHOGONAL',
 'elk.spacing.nodeNode':'44','elk.layered.spacing.nodeNodeBetweenLayers':'32',
 'elk.layered.spacing.edgeNodeBetweenLayers':'12','elk.spacing.edgeNode':'12',
 'elk.layered.nodePlacement.strategy':'NETWORK_SIMPLEX',
 'elk.layered.considerModelOrder.strategy':'NODES_AND_EDGES',
 'elk.padding':'[top=48,left=40,bottom=48,right=40]'
},children:components.map(n=>({id:n.id,width:n.w,height:n.h,layoutOptions:{'elk.portConstraints':'FIXED_SIDE'},ports:[{id:`${n.id}-in`,width:2,height:2,layoutOptions:{'elk.port.side':'WEST'}},{id:`${n.id}-out`,width:2,height:2,layoutOptions:{'elk.port.side':'EAST'}}]})),edges:traces.map(e=>({id:e.id,sources:[`${e.source}-out`],targets:[`${e.target}-in`]}))};
const result=await new ELK().layout(graph);
fs.writeFileSync(new URL('../src/layout.json',import.meta.url),JSON.stringify(result,null,2));
console.log(`ELK placed ${result.children.length} components and routed ${result.edges.length} traces (${Math.round(result.width)} × ${Math.round(result.height)}).`);
