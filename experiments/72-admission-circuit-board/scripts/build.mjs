import {build} from 'esbuild';
await build({entryPoints:['src/app.jsx'],bundle:true,minify:true,format:'iife',outfile:'app.js',loader:{'.js':'jsx'},legalComments:'linked',target:['es2022'],define:{'process.env.NODE_ENV':'"production"'}});
console.log('Built offline React Flow circuit and local source book.');
