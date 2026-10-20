const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
cp.execFileSync(process.execPath,[path.join(root,'scripts/package.mjs')]);
const html=fs.readFileSync(path.join(root,'dist/standalone/ODISSEO/index.html'),'utf8').replace(/\r\n?/g,'\n');
const csp=html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
for(const match of html.matchAll(/<(script|style)([^>]*)>([\s\S]*?)<\/\1>/g)){
 if(match[2].includes('application/json'))continue;
 const digest="'sha256-"+crypto.createHash('sha256').update(match[3]).digest('base64')+"'";
 assert.ok(csp.includes(digest),'CSP hash must match normalized inline '+match[1]);
}
assert.ok(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(html));
console.log('PASS standalone CSP hashes and offline packaging');
