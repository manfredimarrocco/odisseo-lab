const assert=require('node:assert/strict');
const C=require('../wordpress/odisseo-lab-integration/app/core.js');
let passed=0;const test=(name,fn)=>{fn();passed++;console.log('PASS '+name);};
const form=(category,n=0)=>({category,structure:'Struttura Demo QA',inspector:'Ispettore Demo QA',date:'2026-10-15',start:'09:00',end:'10:00',answers:Object.fromEntries(C.CATALOG[category].map((c,i)=>[c.id,{result:i<n?'Non Conforme':'Conforme',note:i<n?'Anomalia sintetica di prova QA':''}]))});
for(const [cat,count] of Object.entries({tronchini:29,siti:34,parcheggi:30,stazioni:28})){
test(cat+' count',()=>assert.equal(C.CATALOG[cat].length,count));
test(cat+' compliant',()=>{const s=C.empty();C.createInspection(s,form(cat));assert.equal(s.ncs.length,0);});
test(cat+' idempotent',()=>{const s=C.empty(),f={...form(cat,3),id:'SOP-QA'};C.createInspection(s,f);C.createInspection(s,f);assert.equal(s.inspections.length,1);assert.equal(s.ncs.length,3);});}
const s=C.empty();C.createInspection(s,form('siti',2));const id=s.ncs[0].id;
for(const status of C.STATUS)test(status,()=>assert.equal(C.setStatus(s,id,status,'Tecnico Demo','Nota QA').status,status));
test('closure date',()=>assert.match(s.ncs[0].closed,/^\d{4}-\d{2}-\d{2}$/));
test('archive retains data',()=>{C.archive(s,id);assert.equal(s.ncs.length,2);assert.ok(s.ncs[0].archived);});
test('plan edit',()=>{const p=C.addPlan(s,{category:'siti',date:'2026-10-20',structure:'Sito Demo',inspector:'Demo'});C.addPlan(s,{...p,date:'2026-10-21'});assert.equal(s.plans.length,1);assert.equal(s.plans[0].date,'2026-10-21');});
test('JSON roundtrip',()=>assert.ok(C.validateImport(JSON.parse(JSON.stringify(s)))));
test('reject duplicate answers',()=>{const bad=C.copy(s);bad.inspections[0].answers=bad.inspections[0].answers.map(()=>bad.inspections[0].answers[0]);assert.throws(()=>C.validateImport(bad),/duplicati/);});
test('reject sequence reset',()=>assert.throws(()=>C.validateImport({...C.copy(s),seq:0}),/Contatore/));
test('CSV formula guard',()=>assert.ok(C.csv([['=1+1']]).includes("'=1+1")));
test('synthetic demo import',()=>assert.ok(C.validateImport(C.demo())));
console.log(passed+' tests passed');
