const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const source=['dist/icons.js','dist/media.js','dist/app.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n');
const elements=new Map();const storage=new Map();let tick,position;
function el(key){if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',classList:{add(){},remove(){}},addEventListener(){},showModal(){},close(){},value:'',disabled:false});return elements.get(key)}
const context=vm.createContext({console,Date,Math,Number,String,JSON,Object,Array,Set,Promise,structuredClone,FormData:class {constructor(target){return new Map(Object.entries(target.values))}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},sessionStorage:{getItem:()=>null,setItem(){}},document:{querySelector:el,addEventListener(){}},window:{addEventListener(){},scrollTo(){}},navigator:{geolocation:{watchPosition(cb){position=cb;return 1},clearWatch(){}}},history:{replaceState(){}},location:{hash:'',href:'https://example.test/'},setTimeout:()=>0,clearTimeout(){},setInterval:fn=>{tick=fn},URL,Blob,AbortSignal});
vm.runInContext(source,context);
function run(s){return vm.runInContext(s,context)}
assert.ok(el('#app').innerHTML.includes('Jouw ritme.'));
assert.equal(run("duration(27720,true)"),'7 u 42 min');
assert.equal(run('pace(5.2,1632)'),'5:14');
assert.ok(Math.abs(run('haversine([0,0],[1,0])')-111.195)<.01);
run("state.onboarded=true;state.steps=8462;state.name='Test';state.meals.push({id:1,date:today(),meal:'Lunch',name:'Havermout',grams:40,kcal:152,protein:5.2,carbs:24,fat:2.8});save();go('today')");
assert.ok(el('#app').innerHTML.includes('8.462'));assert.ok(el('#app').innerHTML.includes('152 kcal'));
run("go('nutrition')");assert.ok(el('#app').innerHTML.includes('Lunch · 40 g · 152 kcal'));
run('start()');tick();tick();tick();assert.equal(run('record.seconds'),3);
position({coords:{latitude:51.4,longitude:5.4,accuracy:5}});position({coords:{latitude:51.4001,longitude:5.4,accuracy:5}});assert.ok(run('record.distance')>.01);
run('record.paused=true');tick();assert.equal(run('record.seconds'),3);run('record.paused=false');tick();assert.equal(run('record.seconds'),4);
run('record.active=false');
for(const p of ['today','activities','record','nutrition','food','sleep','alarm','community','insights','profile','health','welcome']){run(`go('${p}')`);assert.ok(el('#app').innerHTML.length>500,p)}
const saved=JSON.parse(storage.get('vyro-v1'));assert.equal(saved.steps,8462);assert.equal(saved.meals[0].kcal,152);
console.log('Passed: all screen renders, local persistence, nutrition totals, sleep duration, pace, GPS distance, timer pause/resume.');

run("alarmForm(1)");assert.ok(el('#modal').innerHTML.includes('Klankspel'));assert.ok(el('#modal').innerHTML.includes('Eigen ringtone'));
run("$('#activeForm').onsubmit({preventDefault(){},target:{values:{time:'06:45',label:'Testwekker',sound:'chimes',day1:'on'}}})");
assert.equal(run('state.alarms[0].sound'),'chimes');assert.equal(run('state.alarms[0].time'),'06:45');assert.equal(run("soundName('pulse')"),'Pulse');
run("state.profilePhoto='data:image/jpeg;base64,dGVzdA==';save();go('profile')");assert.ok(el('#app').innerHTML.includes('alt="Mijn profielfoto"'));
for(const name of ['sunrise','classic','pulse','chimes']){const wav=fs.readFileSync('dist/assets/sounds/'+name+'.wav');assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');assert.ok(wav.length>100000)}
console.log('Passed: four ringtone assets, per-alarm sound selection/persistence, profile photo rendering.');
