import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const app=path.join(root,'wordpress/odisseo-lab-integration/app');
// HTML normalizes line endings before CSP hashes are checked, including on Windows.
const read=name=>fs.readFileSync(path.join(app,name),'utf8').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');
const core=read('core.js'), ui=read('app.js'), css=read('styles.css');
const hash=s=>"'sha256-"+createHash('sha256').update(s).digest('base64')+"'";
let html=read('index.html');
html=html.replace("script-src 'self'; style-src 'self'","script-src "+hash(core)+" "+hash(ui)+"; style-src "+hash(css)).replace("img-src 'self' data:","img-src data:");
html=html.replace(/<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?">/,'<style>'+css+'</style>').replace(/<script defer src="core\.js(?:\?[^"]*)?"><\/script>/,'<script>'+core+'</script>').replace(/<script defer src="app\.js(?:\?[^"]*)?"><\/script>/,'');
html=html.replace('</body>','<script>'+ui+'</script></body>');
const dest=path.join(root,'dist/standalone/ODISSEO');fs.mkdirSync(dest,{recursive:true});
fs.writeFileSync(path.join(dest,'index.html'),html);
for(const name of ['LICENSE','THIRD-PARTY-NOTICES.md','README.md'])fs.copyFileSync(path.join(root,name),path.join(dest,name));
fs.cpSync(path.join(root,'docs'),path.join(dest,'docs'),{recursive:true});
console.log('Standalone generated from WordPress app; offline browser verification remains required.');
