# Progress и контракт классов

## Контракт классов (база из AGENTS.md)
.wrap .mono .btn(.solid/.ghost) .mq .secHead .secLabel .secTitle .secNote
.trustGrid .trustCell .trustMark .statGrid .statCell[data-to] .svcRow #svcPreview
.whyCell .equipCard .priceRow .revCard .ctForm #formOk .ftBig .rv .in
#preloader #curDot #curRing #mobMenu .burger #hdr
## Контракт классов (база AGENTS.md + дополнения PR #1: css/header.css, js/header.js)

### База (global, без изменений)
.wrap .mono .btn(.solid/.ghost) .mq .secHead .secLabel .secTitle .secNote
.trustGrid .trustCell .trustMark .statGrid .statCell[data-to] .svcRow #svcPreview
.whyCell .equipCard .priceRow .revCard .ctForm #formOk .ftBig .rv .in
#preloader #curDot #curRing

### Шапка, ряд 1 (fixed)
#hdr + .scrolled (scrollY>30, фон плотнее)
.hd — flex-контейнер ряда; переменные высоты: --hh (ряд 1), --subh (subnav)
.logo .logoMark (заливка ::before снизу на hover) .logoTxt (+ small)
.mainNav > a и .mainNav > .dd > .ddBtn — пункты ряда 1; .is-active — активная страница/якорь
.dd .ddBtn .ddCaret .ddPanel .ddCol (h4 = категория-ссылка, ul/li a = услуги)
#ddServices — ID контейнера дропдауна «Услуги» (его ищет header.js)
.dd.open / .dd:hover / .dd:focus-within — раскрытие; .dd.is-active — активный раздел
.hdRight .hdPhone
#burger (внутри i×3) — бургер; ВНИМАНИЕ: в коде это ID, не класс .burger из старого контракта

### Мобильное меню
body.menuOpen — состояние; открытие только под .js (.js body.menuOpen #mobMenu)
#mobMenu; #mobClose — крестик (rotate 90° на hover)
a.mLink (+ em = номер 01–07; .is-active)
.mobAcc > button + .accBody + .open — аккордеон «Услуги»
.accCat — заголовок категории; .accList a (.is-current) — услуги; .mFoot a — телефон/почта

### Subnav (ряд 2, якорная строка шаблона)
.subnav (sticky, top:var(--hh), z-90) + .subnavIn (лента чипов, overflow-x, без скроллбара)
.subnav a + .is-active (IntersectionObserver-подсветка + автоскролл ленты к активному)
.anchor — класс секций: scroll-margin-top под ДВУХРЯДНУЮ шапку
.home .anchor и .noSubnav .anchor — коррекция отступа там, где subnav нет (главная, контакты)

### Классы-состояния (JS-хуки header.js)
.js (html) · .menuOpen (body) · .scrolled (#hdr) · .open (.dd, .mobAcc)
.is-active (mainNav a, .dd, mLink, subnav a) · .is-current (ddPanel a, accList a)
[data-anchor] — smart-anchors ряда 1 и моб-меню (href = реальный URL + якорь)
Guard: нет #calc на странице → все a[href="#calc"] переписываются на /kontakty/#calc

### Лестница z-index (сверена по коду)
.subnav 90 → #hdr 100 → #mobMenu 110 → #burger 111 → #mobClose 112 → #preloader 200

## Журнал решений и инцидентов
- Инцидент 1: мердж-катастрофа старой репы → репа пересоздана, GIT-правила в AGENTS.md.
- Инцидент 2: папки исчезли из всех веток → песочник кодера эфемерен, работа существует
  только после push. Правило: push после этапа + SHA в чат + тег.
- Инцидент 3: чат с кодером умирает после publish → память только в memory bank.
- PR #1 смержен: этапы 1–3 (частично: шапка есть, футера нет).
- NAP финал: +7 (812) 64-222-64 / pesko.struyspb@mail.ru; дубли из дизайна
  (8 800 201-18-55, CenterPeskostruya.rf@mail.ru) игнорируются везде.
- URL финал: /price/ (не /tseny/), /politika-konfidencialnosti/ (не /politika/),
  /obekty/konstitucionnyy-sud/ (не ks-rf); ledokol и puteprovod = кейсы 04–05.
- no-JS: скрытие ТОЛЬКО под префиксом .js; счётчики в разметке = финальные значения.
- Subnav: хардкод по шаблонам страниц, sticky под шапкой, без JS-генерации.
- Главная: дизайн 1:1 минус отзывы; форма id="calc" (не #cta).

## ЧЕК-ЛИСТ РЕВЬЮ PR #1 (пройти до следующего этапа)
[ ] partials/header.html: контакты = финальные NAP; в ссылках /price/, а не /tseny/;
    дропдаун = 6 категорий + 20 услуг; верхний ряд с data-anchor; CTA href="#calc";
    нет тегов <style>/<script> внутри.
[ ] css/global.css: все правила скрытия под префиксом .js; scroll-margin-top у [id];
    токены :root в одном месте, всё остальное через var().
[ ] css/header.css: subnav position:sticky top:var(--header-h); z-index лестница
    (шапка 100, subnav 90, mobMenu 110, preloader 200); один шов границы на стыке.
[ ] js/global.js: reveal инициализируется первым и в try/catch; каждый модуль за
    проверкой существования элементов; без JS страница читаема (проверить в DevTools).
[ ] js/header.js: smart-anchors (клик скроллит только если секция есть на странице);
    прунинг битых якорей subnav; бургер с aria-expanded.
[ ] docs/site-structure-full.md: блок контактов в доке сверен с финальным NAP.

## ОТКРЫТЫЕ ВОПРОСЫ (решает владелец, не кодер)
1. Часы работы: Пн–Сб 9:00–23:00 (дизайн/AGENTS.md) vs Пн–Вс 9:00–21:00 (docs).
   Выбрать ОДНО, поправить в AGENTS.md и docs/site-structure-full.md синхронно.
2. Адрес/реквизиты/координаты в docs — заглушки, заменить реальными до публикации.
3. Цены главной из дизайна (200/400/5000) устарели — везде цены из docs.