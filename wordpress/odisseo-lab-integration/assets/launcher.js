(()=>{'use strict';
for(const section of document.querySelectorAll('[data-mm-odisseo]')){
 const frame=section.querySelector('[data-mm-od-frame]');
 const launcher=section.querySelector('[data-mm-od-launcher]');
 const start=section.querySelector('[data-mm-od-launch]');
 const open=()=>{
  if(!frame || !launcher)return;
  if(!frame.getAttribute('src'))frame.setAttribute('src',frame.dataset.src);
  frame.hidden=false; launcher.hidden=true;
  frame.setAttribute('tabindex','0');
 };
 if(start)start.addEventListener('click',()=>{open();frame.focus();});
 document.querySelectorAll('[data-mm-od-select]').forEach(a=>a.addEventListener('click',open));
 window.addEventListener('hashchange',()=>{if(location.hash==='#odisseo')open();});
 if(location.hash==='#odisseo')open();
}
})();
