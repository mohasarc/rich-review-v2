import { build } from 'esbuild';
import { copyFile, mkdir } from 'node:fs/promises';
await build({ entryPoints: ['src/app.js'], bundle: true, minify: true, format: 'iife', outfile: 'app.js', legalComments: 'linked' });
await mkdir('vendor', { recursive: true });
await copyFile('node_modules/gsap/README.md', 'vendor/GSAP-README.md');
await copyFile('node_modules/xstate/LICENSE', 'vendor/XSTATE-LICENSE.txt');
