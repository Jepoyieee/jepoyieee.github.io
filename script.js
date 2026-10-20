// Highlights the sidebar link of the section currently in view.
const links=[...document.querySelectorAll('nav.side a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.hash==='#'+e.target.id))}}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>io.observe(s));

// ===== J.A.R.V.I.S. interface layer =====
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,p2=n=>String(n).padStart(2,'0'),$=id=>document.getElementById(id);
// Live clock + session uptime
const t0=Date.now();
function tick(){const d=new Date(),s=Math.floor((Date.now()-t0)/1000);$('clk').textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(p2).join(':');$('upt').textContent='UPTIME '+p2(Math.floor(s/60))+':'+p2(s%60)}
tick();setInterval(tick,1000);
// Scroll progress bar
addEventListener('scroll',()=>{const h=document.documentElement,m=h.scrollHeight-h.clientHeight;$('prog').style.height=(m>0?100*h.scrollTop/m:0)+'%'},{passive:true});
// Section readout + panel flash when a section is reached
const secs=[...document.querySelectorAll('main section[id]')];
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');$('ro').innerHTML='SEC '+p2(secs.indexOf(e.target)+1)+' / '+p2(secs.length)+'<br>'+e.target.id.toUpperCase()}}),{rootMargin:'-40% 0px -55% 0px'});
secs.forEach(s=>io2.observe(s));
// Boot sequence (once per session, skipped for reduced motion)
const boot=$('boot');let seen=false;try{seen=sessionStorage.getItem('booted')}catch(e){}
function typeLabel(){const lb=document.querySelector('.hero .lbl');if(rm||!lb)return;const t=lb.textContent;lb.setAttribute('aria-label',t);lb.textContent='';let i=0;const iv=setInterval(()=>{lb.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(iv)},40)}
if(rm||seen){boot.remove();typeLabel()}else{
 boot.hidden=false;const L=['INITIALIZING J.A.R.V.I.S. CORE','LOADING PROFILE: JEPOYIEEE','CALIBRATING ARC REACTOR','LINKING PROJECT DATABASE','ALL SYSTEMS ONLINE'];let n=0;
 const log=$('bootlog'),iv=setInterval(()=>{if(n<L.length)log.textContent+='> '+L[n++]+'\n'},420);
 let done=false;const end=()=>{if(done)return;done=true;clearInterval(iv);try{sessionStorage.setItem('booted','1')}catch(e){}boot.classList.add('out');setTimeout(()=>{boot.remove();typeLabel()},500)};
 setTimeout(end,2600);boot.addEventListener('click',end);addEventListener('keydown',end,{once:true})}
// Console: type commands to navigate (press / to open)
const term=$('term'),tout=$('tout'),tcmd=$('tcmd');
const say=m=>{const p=document.createElement('p');p.textContent=m;tout.appendChild(p);tout.scrollTop=tout.scrollHeight};
function openT(){term.hidden=false;tcmd.focus();if(!tout.children.length)say('J.A.R.V.I.S. online. Type "help" for commands.')}
$('tbtn').onclick=openT;$('tx').onclick=()=>{term.hidden=true};
addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();openT()}if(e.key==='Escape')term.hidden=true});
const C={help:()=>say('Commands: home, about, skills, projects, contact, github, linkedin, email, status, clear'),
 status:()=>say('All systems online.'),clear:()=>{tout.innerHTML=''},
 github:()=>{say('Opening GitHub.');open('https://github.com/jepoyieee','_blank','noopener')},
 linkedin:()=>{say('Opening LinkedIn.');open('https://www.linkedin.com/in/jeffeson-sadoguio-94273218a?trk=contact-info','_blank','noopener')},
 email:()=>{say('Opening mail client.');location.href='mailto:jeffesonsadoguio@gmail.com'}};
['home','about','skills','projects','contact'].forEach(k=>C[k]=()=>{say('Navigating to '+k+'.');$(k).scrollIntoView({behavior:rm?'auto':'smooth'})});
tcmd.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const v=tcmd.value.trim().toLowerCase();tcmd.value='';if(!v)return;say('> '+v);(C[v]||(()=>say('Command not recognized. Type "help".')))()});
