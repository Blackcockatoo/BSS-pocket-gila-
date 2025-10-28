
const chapters=[
{num:1, title:"Collapse of Will", sigil:"sigils/ch01-collapse.svg", file:"chapters/ch01.txt"},
{num:2, title:"Skill in Action", sigil:"sigils/ch02-skill.svg", file:"chapters/ch02.txt"},
{num:3, title:"Duty Through Work", sigil:"sigils/ch03-duty.svg", file:"chapters/ch03.txt"},
{num:4, title:"Seeing Action/Inaction", sigil:"sigils/ch04-seeing.svg", file:"chapters/ch04.txt"},
{num:5, title:"Renunciation in Action", sigil:"sigils/ch05-renounce.svg", file:"chapters/ch05.txt"},
{num:6, title:"Disciplined Mind", sigil:"sigils/ch06-discipline.svg", file:"chapters/ch06.txt"},
{num:7, title:"Thread Through Pearls", sigil:"sigils/ch07-thread.svg", file:"chapters/ch07.txt"},
{num:8, title:"Imperishable Bindu", sigil:"sigils/ch08-bindu.svg", file:"chapters/ch08.txt"},
{num:9, title:"Offering of All", sigil:"sigils/ch09-offering.svg", file:"chapters/ch09.txt"},
{num:10, title:"Brilliance", sigil:"sigils/ch10-brilliance.svg", file:"chapters/ch10.txt"},
{num:11, title:"Universal Vision", sigil:"sigils/ch11-vision.svg", file:"chapters/ch11.txt"},
{num:12, title:"Still Heart, Open Hands", sigil:"sigils/ch12-heart.svg", file:"chapters/ch12.txt"},
{num:13, title:"Field & Knower", sigil:"sigils/ch13-field.svg", file:"chapters/ch13.txt"},
{num:14, title:"Three Guṇas", sigil:"sigils/ch14-gunas.svg", file:"chapters/ch14.txt"},
{num:15, title:"Inverted Tree", sigil:"sigils/ch15-tree.svg", file:"chapters/ch15.txt"},
{num:16, title:"Divine/Demonic", sigil:"sigils/ch16-truth.svg", file:"chapters/ch16.txt"},
{num:17, title:"Threefold Faith", sigil:"sigils/ch17-faith.svg", file:"chapters/ch17.txt"},
{num:18, title:"Release Through Centre", sigil:"sigils/ch18-release.svg", file:"chapters/ch18.txt"},
];
const box = document.getElementById('chapters');
const dots = document.getElementById('navdots');
let current=1;

async function loadOne(ch){
  const [t,s] = await Promise.all([fetch(ch.file).then(r=>r.text()), fetch(ch.sigil).then(r=>r.text())]);
  const sec=document.createElement('section');
  sec.className='section'; sec.dataset.num=ch.num;
  sec.innerHTML=`<div class="sig">${s}</div>
  <div class="meta"><h2>Ch.${String(ch.num).padStart(2,'0')} — ${ch.title}</h2>
  <pre class="ascii">${t.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}</pre></div>`;
  box.appendChild(sec);
}

async function boot(){
  for(const ch of chapters){ await loadOne(ch); }
  buildDots(); show(current);
}
function buildDots(){
  dots.innerHTML='';
  chapters.forEach(ch=>{
    const d=document.createElement('div'); d.className='dot';
    d.onclick=()=>{current=ch.num; show(current)};
    dots.appendChild(d);
  });
}
function show(n){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  const el=document.querySelector(`.section[data-num="${n}"]`);
  if(el) el.classList.add('active');
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===n-1));
  window.scrollTo({top:0, behavior:'smooth'});
}
function next(){current=current%chapters.length+1; show(current)}
function prev(){current=(current-2+chapters.length)%chapters.length+1; show(current)}
document.getElementById('next').onclick=next;
document.getElementById('prev').onclick=prev;
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next(); if(e.key==='ArrowLeft')prev();});
let sx=0, sy=0;
document.addEventListener('touchstart',e=>{sx=e.touches[0].clientX; sy=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx; const dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>40 && Math.abs(dy)<60){ if(dx<0) next(); else prev(); }},{passive:true});
boot();
