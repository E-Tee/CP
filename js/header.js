/* =====================================================================
   header.js — поведение двухрядной шапки (ряд 1 + subnav).
   КУДА: сниппет SNN «header-js», тип JS, локация Footer. Загружается ПОСЛЕ
   global.js; все обращения к элементам защищены if(...) — файл безопасен на
   страницах без шапки/subnav/дропдауна.

   ЧТО ДЕЛАЕТ:
   1. .scrolled для #hdr при window.scrollY>30 (фоновая подложка плотнее).
   2. Бургер ↔ mobMenu (класс menuOpen на body), крестик #mobClose, Esc,
      клик по ссылке моб-меню, аккордеон .mobAcc, aria-expanded/aria-hidden.
   3. Smart-anchors пунктов ряда 1 и моб-меню (href=/url/ + data-anchor=id):
      - id есть на текущей странице → плавный скролл к нему (нативный
        scroll-behavior + scroll-margin-top делают отступ под шапку);
      - id нет → обычный переход по href; если в URL есть #anchor после
        перехода — браузер проскроллит сам (секция существует на цели).
   4. Guard CTA «Расчёт по фото» (href="#calc"): на странице нет #calc →
      href меняется на /kontakty/#calc.
   5. Подсветка активной СТРАНИЦЫ: совпадение pathname → .is-active у пункта
      ряда 1, ссылки дропдауна (.is-current) и mLink моб-меню.
   6. Подсветка АКТИВНОГО ЯКОРЯ subnav: IntersectionObserver по секциям;
      дублируется для smart-anchor-пунктов ряда 1 (когда их секции на стр.).
   7. Зачистка subnav: ссылки на несуществующие секции удаляются из DOM
      (JS-only; без JS битых ссылок не видно только после клика — поэтому
      разметка subnav всегда соответствует реальной странице).
   NO-JS: ничего из этого не критично — ссылки работают как обычные переходы
   и якоря, mobMenu скрыт, навигация дублируется в футере.
   ===================================================================== */
(function(){
'use strict';
var doc=document;
function $(s,c){return (c||doc).querySelector(s);}
function $$(s,c){return Array.prototype.slice.call((c||doc).querySelectorAll(s));}
var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. класс scrolled ---------- */
var hdr=$('#hdr');
if(hdr){
  var onScroll=function(){hdr.classList.toggle('scrolled',window.scrollY>30);};
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
}

/* ---------- 2. бургер / mobMenu / крестик / аккордеон ---------- */
var burger=$('#burger'),mob=$('#mobMenu');
function setMenu(open){
  doc.body.classList.toggle('menuOpen',open);
  if(burger)burger.setAttribute('aria-expanded',open?'true':'false');
  if(mob)mob.setAttribute('aria-hidden',open?'false':'true');
  doc.body.style.overflow=open?'hidden':'';
}
if(burger&&mob){
  burger.addEventListener('click',function(){setMenu(!doc.body.classList.contains('menuOpen'));});
}
var mobClose=$('#mobClose');
if(mobClose)mobClose.addEventListener('click',function(){setMenu(false);});
doc.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});
$$('.mobAcc > button').forEach(function(btn){
  btn.addEventListener('click',function(){
    var acc=btn.parentNode,open=acc.classList.toggle('open');
    btn.setAttribute('aria-expanded',open?'true':'false');
  });
});
if(mob){
  $$('a',mob).forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
}

/* ---------- 3. smart-anchors (ряд 1 + моб-меню) ---------- */
function smoothTo(el){
  if(reduceMotion){el.scrollIntoView();}
  else{el.scrollIntoView({behavior:'smooth',block:'start'});}
}
$$('[data-anchor]').forEach(function(link){
  link.addEventListener('click',function(e){
    var id=link.getAttribute('data-anchor'),sec=doc.getElementById(id);
    if(sec){e.preventDefault();setMenu(false);smoothTo(sec);
      history.replaceState(null,'','#'+id);}
    /* иначе — штатный переход по href (ссылка ведёт на нужный URL) */
  });
});

/* ---------- 4. guard CTA #calc ---------- */
if(!doc.getElementById('calc')){
  $$('a[href="#calc"]').forEach(function(a){a.setAttribute('href','/kontakty/#calc');});
}

/* ---------- 5. активная страница ---------- */
var path=(location.pathname||'/').replace(/index\.html?$/,'');
path=path.replace(/\/+$/,'/')||'/';
function norm(href){
  try{var p=new URL(href,location.origin).pathname;return (p.replace(/\/+$/,'/')||'/');}
  catch(e){return null;}
}
$$('#hdr .mainNav > a').forEach(function(a){
  var n=norm(a.getAttribute('href'));
  if(n&&n===path)a.classList.add('is-active');
});
$$('#hdr .ddPanel a, #mobMenu .mLink, #mobMenu .accCat, #mobMenu .accList a, #mobMenu .mFoot a[href^="/"]').forEach(function(a){
  var n=norm(a.getAttribute('href'));
  if(!n)return;
  if(n===path){
    a.classList.add(a.closest('#mobMenu')?'is-active':'is-current');
    var dd=a.closest('.dd');if(dd)dd.classList.add('is-active');
  } else if(n!=='/'&&path.indexOf(n)===0){
    /* подраздел: /uslugi/ochistka-fasadov/ подсвечивает ссылку /uslugi/ */
    a.classList.add(a.closest('#mobMenu')?'is-active':'is-current');
    var dd2=a.closest('.dd');if(dd2)dd2.classList.add('is-active');
  }
});
/* «Услуги» активна, если открыта любая её страница (/uslugi/...) */
if(path.indexOf('/uslugi/')===0||path==='/uslugi/'){
  var dds=$('#ddServices');if(dds)dds.classList.add('is-active');
}

/* ---------- 6+7. subnav: IO-подсветка + зачистка мёртвых ссылок ---------- */
var subnav=$('.subnav');
if(subnav){
  var links=$$('a[href^="#"]',subnav),alive=[];
  links.forEach(function(a){
    var id=a.getAttribute('href').slice(1),sec=doc.getElementById(id);
    if(sec){alive.push({a:a,sec:sec});}
    else{a.parentNode.removeChild(a);} /* чьих секций нет — удаляем ссылку */
  });
  if(alive.length&&'IntersectionObserver' in window){
    var current=null;
    function setActive(a){
      if(current===a)return;current=a;
      alive.forEach(function(o){o.a.classList.toggle('is-active',o.a===a);});
      /* подскроллим ленту чипов, чтобы активный был виден */
      if(a&&subnav.scrollWidth>subnav.clientWidth){
        var r=a.getBoundingClientRect(),sr=subnav.getBoundingClientRect();
        if(r.left<sr.left+8||r.right>sr.right-8){
          subnav.scrollLeft=subnav.scrollLeft+(r.left-sr.left)-24;
        }
      }
    }
    var vis={};
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){vis[en.target.id]=en.isIntersecting?en.intersectionRatio:0;});
      var best=null,bestR=0;
      alive.forEach(function(o){var v=vis[o.sec.id]||0;if(v>bestR){bestR=v;best=o.a;}});
      if(best)setActive(best);
      else if(doc.documentElement.scrollHeight-window.innerHeight-window.scrollY<2){
        setActive(alive[alive.length-1].a); /* низ страницы — последний блок */
      }
    },{rootMargin:'-136px 0px -55% 0px',threshold:[0,.15,.4]});
    alive.forEach(function(o){io.observe(o.sec);});
    /* клик по чипу — подсветка сразу (до срабатывания IO) */
    alive.forEach(function(o){o.a.addEventListener('click',function(){setActive(o.a);});});
  }
}

/* подсветка smart-anchor-пунктов ряда 1 по прокрутке (главная: trust/uslugi/why/equip/prices) */
var row1=$$('#hdr .mainNav > a[data-anchor]');
row1=row1.filter(function(a){return !!doc.getElementById(a.getAttribute('data-anchor'));});
if(row1.length&&'IntersectionObserver' in window){
  var cur1=null;
  var io1=new IntersectionObserver(function(entries){
    var top=null,topY=Infinity;
    row1.forEach(function(a){
      var s=doc.getElementById(a.getAttribute('data-anchor')),r=s.getBoundingClientRect();
      if(r.top<=160&&r.bottom>120&&Math.abs(r.top-80)<topY){topY=Math.abs(r.top-80);top=a;}
    });
    if(top&&cur1!==top){cur1=top;
      $$('#hdr .mainNav > a[data-anchor]').forEach(function(x){x.classList.toggle('is-active',x===top);});}
  },{rootMargin:'-80px 0px -60% 0px',threshold:0});
  row1.forEach(function(a){io1.observe(doc.getElementById(a.getAttribute('data-anchor')));});
}
})();
