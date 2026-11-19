// Copies the static site into public/ so Vercel serves it as plain files
// (and does not mistake app.js / server.mjs for a server entry point).
import {cpSync,rmSync,mkdirSync,readdirSync} from 'node:fs';
rmSync('public',{recursive:true,force:true});mkdirSync('public');
for(const f of readdirSync('.')){if(/\.(html|css|js)$/.test(f)&&f!=='server.mjs')cpSync(f,`public/${f}`);}
cpSync('assets','public/assets',{recursive:true});
console.log('static site written to public/');
