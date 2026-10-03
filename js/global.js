/* =====================================================================
   global.js — сквозной JS каркаса (кроме логики шапки — она в header.js).
   КУДА: сниппет SNN «global-js», тип JS, локация Footer, ДО header.js.

   ПРАВИЛА:
   - каждое обращение к необязательному элементу обёрнуто в if(...) — файл
     не падает на страницах без прелоадера/курсора/формы;
   - класс .js навешивается на <html> ПЕРВЫМ делом: до загрузки скриптов
     скрытия контента (.js .slide и т.п.) из CSS не действуют → NO-JS:
     контент виден полностью;
   - prefers-reduced-motion уважается во всех анимациях.

   МОДУЛИ: 1) html.js; 2) прелоадер; 3) курсор; 4) reveal; 5) счётчики;
   6) аккордеон FAQ; 7) форма #calc (валидация+маска+файлы+fetch);
   8) hero-слайдер + canvas-песок (только главная); 9) drag-scroll equip.
   ===================================================================== */
(function(){
'use strict';
var doc=document,W=window;
function $(s,c){return (c||doc).querySelector(s);}
function $$(s,c){return Array.prototype.slice.call((c||doc).querySelectorAll(s));}
var RM=W.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. флаг .js ---------- */
doc.documentElement.classList.add('js');

/* ---------- 2. прелоадер ---------- */
var pre=$('#preloader'),cnt=$('#preCount');
if(pre){
  var p=0,timer=setInterval(function(){
    p=Math.min(100,p+Math.floor(Math.random()*14)+4);
    if(cnt)cnt.innerHTML=p+'<span>%</span>';
    if(p>=100){clearInterval(timer);
      W.addEventListener('load',function(){
        pre.classList.add('done');
        setTimeout(function(){pre.style.display='none';},RM?0:850);
      },{once:true});
      /* если load уже прошёл */
      if(doc.readyState==='complete'){pre.classList.add('done');setTimeout(function(){pre.style.display='none';},RM?0:850);}
    }
  },RM?10:90);
}

/* ---------- 3. курсор ---------- */
var canHover=W.matchMedia('(hover:hover) and (pointer:fine)').matches;
var cDot=$('#curDot'),cRing=$('#curRing');
if(canHover&&cDot&&cRing){
  var mX=innerWidth/2,mY=innerHeight/2,rX=mX,rY=mY;
  W.addEventListener('mousemove',function(e){mX=e.clientX;mY=e.clientY;cDot.style.opacity='1';cRing.style.opacity='1';});
  (function loopCur(){rX+=(mX-rX)*.16;rY+=(mY-rY)*.16;
    cDot.style.transform='translate('+mX+'px,'+mY+'px)';
    cRing.style.transform='translate('+rX+'px,'+rY+'px)';
    requestAnimationFrame(loopCur);})();
  $$('[data-hover]').forEach(function(hEl){
    hEl.addEventListener('mouseenter',function(){cRing.classList.add('big');});
    hEl.addEventListener('mouseleave',function(){cRing.classList.remove('big');});
  });
}

/* ---------- 4. reveal ---------- */
var revs=$$('.reveal');
if(revs.length){
  if(RM||!('IntersectionObserver' in W)){revs.forEach(function(r){r.classList.add('in');});}
  else{
    var ioR=new IntersectionObserver(function(en){en.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');ioR.unobserve(e.target);}
    });},{threshold:.12});
    revs.forEach(function(r){ioR.observe(r);});
  }
}

/* ---------- 5. счётчики data-to ---------- */
var counters=$$('[data-to]');
if(counters.length){
  function runCount(el){
    var to=parseInt(el.getAttribute('data-to'),10)||0,dur=RM?0:1600,t0=null;
    function tick(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/(dur||1));
      el.textContent=Math.round(to*(1-Math.pow(1-k,4)));
      if(k<1)requestAnimationFrame(tick);}
    requestAnimationFrame(tick);
  }
  if(!('IntersectionObserver' in W)){counters.forEach(runCount);}
  else{
    var ioC=new IntersectionObserver(function(en){en.forEach(function(e){
      if(e.isIntersecting){runCount(e.target);ioC.unobserve(e.target);}
    });},{threshold:.4});
    counters.forEach(function(c){ioC.observe(c);});
  }
}

/* ---------- 6. аккордеон FAQ (.faqQ/.faqA или details fallback) ---------- */
$$('.faqQ').forEach(function(q){
  q.addEventListener('click',function(){
    var item=q.parentNode,open=item.classList.toggle('open');
    q.setAttribute('aria-expanded',open?'true':'false');
  });
});

/* ---------- 7. форма #calc ---------- */
var form=$('#calcForm');
if(form){
  var phone=form.querySelector('[name="phone"]');
  if(phone){
    phone.addEventListener('input',function(){
      var d=phone.value.replace(/\D/g,'').slice(0,11);
      if(d[0]==='8')d='7'+d.slice(1);
      if(d[0]!=='7')d='7'+d;
      var out='+7';
      if(d.length>1)out+=' ('+d.slice(1,4);
      if(d.length>=5)out+=') '+d.slice(4,7);
      if(d.length>=8)out+='-'+d.slice(7,9);
      if(d.length>=10)out+='-'+d.slice(9,11);
      phone.value=out;
    });
  }
  var fileIn=form.querySelector('[type="file"]'),prev=$('#filePrev');
  if(fileIn&&prev){
    fileIn.addEventListener('change',function(){
      prev.innerHTML='';
      Array.prototype.slice.call(fileIn.files).slice(0,6).forEach(function(f){
        if(!/^image\//.test(f.type))return;
        var rd=new FileReader();
        rd.onload=function(ev){
          var im=doc.createElement('img');im.src=ev.target.result;
          im.alt=f.name;im.width=80;im.height=80;im.style.objectFit='cover';
          prev.appendChild(im);
        };
        rd.readAsDataURL(f);
      });
    });
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    $$('[required]',form).forEach(function(inp){
      var bad=!inp.value||(inp.type==='checkbox'&&!inp.checked)||(inp.name==='phone'&&inp.value.replace(/\D/g,'').length<11);
      inp.classList.toggle('err',bad);if(bad)ok=false;
    });
    if(!ok)return;
    var btn=form.querySelector('button[type="submit"]'),old=btn?btn.textContent:'';
    if(btn){btn.disabled=true;btn.textContent='Отправляем…';}
    /* ajax-заглушка: подставьте endpoint CMS. Без него — имитация успеха. */
    Promise.resolve().then(function(){
      if(btn)btn.textContent='Отправлено ✓';
      form.reset();if(prev)prev.innerHTML='';
      setTimeout(function(){if(btn){btn.disabled=false;btn.textContent=old;}},3000);
    });
  });
}

/* ---------- 8. hero-слайдер + canvas-песок (главная) ---------- */
var slides=$$('.slide');
if(slides.length){
  var dots=$$('#slDots button'),lbl=$('#slCur'),DUR=6000,sIdx=0,tmr=null,paused=false;
  dots.forEach(function(d){d.style.setProperty('--dur',DUR+'ms');});
  function goTo(n){
    sIdx=(n+slides.length)%slides.length;
    slides.forEach(function(s,i){s.classList.toggle('active',i===sIdx);});
    dots.forEach(function(d,i){d.classList.toggle('on',i===sIdx);});
    if(lbl)lbl.textContent=('0'+(sIdx+1)).slice(-2);
  }
  function auto(){clearInterval(tmr);if(!RM)tmr=setInterval(function(){if(!paused)goTo(sIdx+1);},DUR);}
  dots.forEach(function(d,i){d.addEventListener('click',function(){goTo(i);auto();});});
  var arrL=$('#slPrev'),arrR=$('#slNext');
  if(arrL)arrL.addEventListener('click',function(){goTo(sIdx-1);auto();});
  if(arrR)arrR.addEventListener('click',function(){goTo(sIdx+1);auto();});
  var slider=$('.slider');
  if(slider){slider.addEventListener('mouseenter',function(){paused=true;});
             slider.addEventListener('mouseleave',function(){paused=false;});}
  goTo(0);auto();
}
var sandCvs=$('#sandCanvas');
if(sandCvs){
  var sCtx=sandCvs.getContext('2d'),grains=[],SW=0,SH=0;
  function sizeSand(){SW=sandCvs.width=sandCvs.offsetWidth*devicePixelRatio;SH=sandCvs.height=sandCvs.offsetHeight*devicePixelRatio;}
  function makeGrain(){return{x:Math.random()*SW,y:Math.random()*SH,
    vx:(1.2+Math.random()*3.4)*devicePixelRatio,vy:(Math.random()-.42)*devicePixelRatio,
    r:(Math.random()*1.6+.5)*devicePixelRatio,a:Math.random()*.5+.15,
    c:Math.random()<.22?'255,77,0':'216,176,120'};}
  function initSand(){sizeSand();grains=[];var n=Math.min(150,Math.floor(SW/12000));for(var g=0;g<n;g++)grains.push(makeGrain());}
  function drawSand(){sCtx.clearRect(0,0,SW,SH);
    for(var g=0;g<grains.length;g++){var p=grains[g];p.x+=p.vx;p.y+=p.vy;p.vy+=.004*devicePixelRatio;
      if(p.x>SW+12||p.y>SH+12||p.y<-12){grains[g]=makeGrain();continue;}
      sCtx.beginPath();sCtx.fillStyle='rgba('+p.c+','+p.a+')';sCtx.arc(p.x,p.y,p.r,0,6.2832);sCtx.fill();}
    requestAnimationFrame(drawSand);}
  initSand();if(!RM)drawSand();
  W.addEventListener('resize',initSand);
}

/* ---------- 9. drag-scroll контейнеров .dragRow (оборудование) ---------- */
$$('.dragRow,.equipTrack').forEach(function(box){
  var down=false,sx=0,sl=0;
  box.addEventListener('pointerdown',function(e){down=true;sx=e.clientX;sl=box.scrollLeft;box.classList.add('dragging');});
  box.addEventListener('pointermove',function(e){if(down){e.preventDefault();box.scrollLeft=sl-(e.clientX-sx);}});
  ['pointerup','pointercancel','pointerleave'].forEach(function(ev){
    box.addEventListener(ev,function(){down=false;box.classList.remove('dragging');});});
});
})();
