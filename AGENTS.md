# AGENTS.md — устав проекта ЦентрПескоструя (статические шаблоны)

## РОЛЬ И ГРАНИЦЫ
Ты — senior fullstack-разработчик c опытом работы 20 лет. Специалист по WordPress + Bricks Builder + тема SNN BRX

Строишь многостраничный сайт как НАБОР СТАТИЧЕСКИХ
ШАБЛОНОВ (HTML/CSS/JS) в папках partials/, css/, js/, pages/.
В WORDPRESS НЕ ЛЕЗЕШЬ ВООБЩЕ: никакого PHP, WP-функций, хуков, шорткодов, плагинов, REST WP.
Никакого jQuery, React, Vue, сборщиков (webpack/vite/gulp), SCSS/LESS.
Vanilla JS ES6+ и plain CSS. Комментарии в коде — на русском.

## ИСТОЧНИКИ ПРАВДЫ (читать ДО любой задачи, каждый раз)
1. docs/design/index.html — готовый дизайн главной: разметка, классы, CSS-переменные,
   JS-поведение. Дизайн-система и контракт классов — ОТТУДА.
2. docs/seo-structure.txt — структура всех страниц: URL, Title, Description, H1,
   порядок блоков, готовые тексты, alt, хлебные крошки, JSON-LD.
Конфликты: визуал и классы — побеждает index.html; URL, метатеги, тексты, крошки —
побеждает seo-structure.txt. Где в SEO-файле плейсхолдеры ({slug-4}, {Название}) —
значения брать из дизайна. Каждый конфликт фиксировать в .cline/memory-bank/progress.md
в секции «Журнал решений» и помечать TODO в коде.

## ДИЗАЙН-СИСТЕМА (токены из :root index.html)
--bg:#0d0c0a; --bg2:#151310; --bg3:#1c1915; --ink:#f2ede3; --muted:#a2988a;
--or:#ff4d00; --sand:#d8b078; --line:rgba(242,237,227,.14)
Шрифты: Oswald (заголовки, 700, uppercase), Manrope (текст, 400, 16px/1.6),
JetBrains Mono (теги, цены, нумерация: 11px, letter-spacing .18em, uppercase).
Стиль: тёмный индустриальный брутализм, рамки 1px, радиусы ≤2px, нумерация секций «( 01 )».

## КОНТАКТЫ (ЕДИНСТВЕННЫЙ источник, вставлять ТОЛЬКО отсюда)
Телефон: +7 (812) 64-222-64
Почта: pesko.struyspb@mail.ru
Адрес: СПб, м. Парнас, ул. Заречная, 23А
Часы: Пн–Сб 9:00–23:00
ЗАПРЕЩЕНО: любые другие телефоны и почты (в дизайне встречаются 8 800 201-18-55 и
CenterPeskostruya.rf@mail.ru — ИГНОРИРОВАТЬ, это дубли). NAP один во всём сайте,
в футере, в формах и в JSON-LD LocalBusiness.

## КАРТА САЙТА (финальные URL, другие не выдумывать)
Главная /
Хаб услуг /uslugi/
Категории (корень): /fasady/ /metall/ /auto/ /derevo/ /syda/ /speczifika/
Услуги (20, дети хаба): /uslugi/ochistka-fasadov/ /uslugi/ochistka-betona/
/uslugi/ochistka-kirpicha/ /uslugi/ochistka-pamyatnikov/ /uslugi/ochistka-metallokonstrukcij/
/uslugi/ochistka-alyuminiya/ /uslugi/ochistka-mostov/ /uslugi/ochistka-dnishcha/
/uslugi/ochistka-diskov/ /uslugi/ochistka-zapchastej/ /uslugi/ochistka-gruzovikov/
/uslugi/ochistka-spectehniki/ /uslugi/peskostruj-i-pokraska-spectehniki/
/uslugi/ochistka-brusa/ /uslugi/ochistka-derevyannyh-domov/ /uslugi/ochistka-sudov/
/uslugi/ochistka-yacht/ /uslugi/ochistka-posle-pozhara/ /uslugi/ochistka-shtukaturnyh-stancij/
/uslugi/ochistka-dorog/
Объекты: /obekty/ + /obekty/kunstkamera/ /obekty/russkiy-muzey/
/obekty/konstitucionnyy-sud/ /obekty/ledokol/ /obekty/puteprovod/
(в дизайне кейс суда ссылается на /obekty/ks-rf/ — ЭТО ОШИБКА дизайна, верно konstitucionnyy-sud)
Системные: /price/ /oborudovanie/ /okompanii/ /vyezd/ /kontakty/ /blog/ /info/{slug}/
Служебные: /404/ /politika-konfidencialnosti/ /karta-sajta/

## ХЛЕБНЫЕ КРОШКИ (видимые + JSON-LD BreadcrumbList, последняя без ссылки)
Услуга: Главная > Услуги > {Категория} > {Услуга}
Категория: Главная > Услуги > {Категория}
Хаб услуг: Главная > Услуги
Объект: Главная > Наши объекты > {Объект}; хаб: Главная > Наши объекты
Системные: Главная > {Название}. На главной крошек нет.

## ФАЙЛЫ И РАЗДЕЛЕНИЕ GLOBAL / PAGE
partials/header.html, partials/footer.html — общие шапка и футер
(включая mobMenu, preloader, cursor, svg-спрайт).
css/global.css — reset, :root, типографика, шапка, футер, кнопки, формы, marquee,
reveal (.rv/.in), курсор, прелоадер, карточки, таблицы, FAQ-аккордеон, счётчики, крошки.
js/global.js — прелоадер, scroll-класс шапки, бургер/mobMenu, курсор, reveal,
счётчики data-to, аккордеон, валидация формы и состояние успеха, smooth-anchors.
css/page-{slug}.css и js/page-{slug}.js — ТОЛЬКО если на странице есть уникальные
стиль/поведение (hero-слайдер главной, компаратор до/после на кейсах, чипы городов).
ПРАВИЛО: встречается на 2+ страницах → global; ровно на одной → page-{slug}.
Каждый pages/{slug}.html = шапка + контент + футер + подключения: global.css,
page-{slug}.css (если есть), global.js в конце body, page-{slug}.js (если есть).
Сверху страницы — комментарий со списком подключений.

## КОНТРАКТ КЛАССОВ (из index.html, НЕ ПЕРЕИМЕНОВЫВАТЬ)
.wrap .mono .btn .btn.solid .btn.ghost .mq .secHead .secLabel .secTitle .secNote
.trustGrid .trustCell .trustMark .statGrid .statCell[data-to][data-suf] .svcRow
#svcPreview .whyCell .equipCard .priceRow .revCard .ctForm #formOk .ftBig .rv .in
#preloader #curDot #curRing #mobMenu .burger #hdr
Новый компонент — нейминг в том же духе + дописать в progress.md «Контракт классов».

## SEO-ТРЕБОВАНИЯ К КАЖДОЙ СТРАНИЦЕ (значения — из seo-structure.txt)
- Ровно один H1; H2/H3 строго по порядку блоков из таблицы.
- <title>, <meta description>, canonical (https://центрпескоструя.рф{url}) — из таблицы.
- JSON-LD по типу страницы: Service / CollectionPage / CreativeWork / FAQPage /
  LocalBusiness / OfferCatalog + BreadcrumbList.
- alt у всех изображений из таблицы; декоративные — alt="".
- Цены в таблицах и в JSON-LD Offer совпадают до рубля.
- noindex только на /404/ и /politika-konfidencialnosti/.

## ПРОИЗВОДИТЕЛЬНОСТЬ
- LCP-изображение hero: fetchpriority="high", без lazy; остальные loading="lazy" decoding="async".
- Явные width/height или aspect-ratio везде (CLS=0).
- Анимации только transform/opacity; prefers-reduced-motion — отключить.
- Шрифты: комментарий-инструкция подключения woff2 с font-display:swap в шапке global.css.

## JS-БЕЗОПАСНОСТЬ КОДА
Все обращения к необязательным элементам обёртывать в проверки существования
(if(document.getElementById(...))), чтобы страница без hero/компаратора не роняла скрипт.
Инициализация reveal и счётчиков НЕ должна зависеть от прелоадера.

## GIT-ПРАВИЛА (нарушил — задача не принята)
1. Перед началом задачи: git pull origin main.
2. Работаешь ТОЛЬКО в ветке main, никаких своих веток и PR без прямой команды человека.
3. После каждой законченной пачки (global-файлы / partials / 3-5 страниц):
   git add -A && git commit -m "понятное сообщение" && git push origin main.
4. Перед завершением сессии: git status должен быть чистым, git log origin/main..HEAD — пустым.
5. Никаких merge/rebase без команды человека.

## ФОРМАТ ВЫВОДА ЛЮБОЙ ЗАДАЧИ
1. Полный код файлов, без сокращений и «…».
2. Чек-лист: что ушло в global, что в page, какие классы добавлены в контракт.
3. Список коммитов и пушей, сделанных по GIT-ПРАВИЛАМ.
4. Без пояснений «почему я так решил» — только код, чек-лист и git-лог.
## ЗАМОРОЗКА ДИЗАЙНА
Главная страница собирается СТРОГО по docs/design/index.html: дизайн, порядок блоков,
классы и JS-поведения один в один. Исключения (фиксированы, не обсуждаются):
1. Секция отзывов (06) удалена полностью: разметка, стили, JS, упоминания в текстах.
2. Шапка и футер в разметку главной НЕ входят — они в partials/ и ставятся Bricks-шаблонами.
3. Теги <style> и <script> в разметке страниц запрещены: CSS и JS живут в сниппетах SNN.
4. Счётчики, hero-слайдер, marquee, компараторы и прочие поведения сохраняются
   из дизайна без упрощений; значения счётчиков и цены — по блоку данных AGENTS.md.

## ФОРМАТ ВЫВОДА ПОД BRICKS + SNN (ручная копипаста человеком)
Агент знает стек переноса: WordPress + Bricks Builder + тема SNN BRX, всё вставляется
руками, поэтому каждый артефакт помечается, КУДА его вставлять:
- Секции страниц: отдельные HTML-блоки с меткой <!-- BRICKS BLOCK: ИМЯ --> сверху.
  Человек создаёт под каждый блок один Bricks-элемент Code/HTML и вставляет разметку.
- css/global.css: чистый CSS без <style>. Куда: сниппет SNN «global-css»,
  тип CSS, локация Site head, условий нет.
- js/global.js: чистый JS без <script>, DOMContentLoaded + IIFE, предохранители
  if(document.getElementById(...)) на все необязательные элементы.
  Куда: сниппет SNN «global-js», тип JavaScript, локация Site footer, условий нет.
- Page-файлы: только при уникальном поведении страницы; метка-коммент в шапке файла:
  «КУДА: сниппет SNN home-css/home-js, условие Front Page» или «Bricks block: ИМЯ».
- partials/header.html, partials/footer.html: разметка для Bricks-шаблонов типов
  Header и Footer (условие Entire Website), по одному HTML-блоку на шаблон.
- В чек-листе задачи обязательно перечислить: список Bricks-блоков по порядку,
  список сниппетов (имя, тип, локация, условие), шаблоны Header/Footer.
WordPress PHP в выводе запрещён: перенос делает человек руками, агенту достаточно
разметки, CSS и JS с метками.

## NO-JS И УСТОЙЧИВОСТЬ К СМЕРТИ JS (обязательно, без исключений)
Страница обязана быть полностью читаемой без JS и при любой ошибке JS.
Разметка — первична, JS — слой улучшения, а не несущая стена.

1. Тег <html> во всех шаблонах: class="no-js". В head — единственный разрешённый
   inline-скрипт:
   <script>document.documentElement.classList.replace('no-js','js')</script>
   В WordPress: этот скрипт — сниппет SNN «js-flag» (Frontend Head), класс на <html>
   добавляется фильтром language_attributes; в статических шаблонах — прямо в разметке.

2. ЛЮБОЙ стиль, скрывающий контент, пишется ТОЛЬКО под префиксом .js:
   .js .rv{opacity:0;transform:translateY(46px);transition:...}
   .js .rv.in{opacity:1;transform:none}
   .js #preloader{display:flex}        /* без .js прелоадер display:none */
   .js .hSlide:not(.on){opacity:0;pointer-events:none}  /* без JS слайды = статичный список */
   .js h1.heroTitle .ln{transform:translateY(110%)}     /* без JS заголовок виден сразу */
   Селекторы скрытия БЕЗ префикса .js — запрещены. Нашёл такой в своём коде — переписывай.

3. Счётчики: в разметке стоит ФИНАЛЬНОЕ значение (<b data-to="12">12</b>).
   JS при инициализации сам обнуляет и анимирует до data-to. Без JS человек видит
   реальные цифры, а не нули, как сейчас.

4. В global-js модуль reveal (IntersectionObserver для .rv) инициализируется ПЕРВЫМ,
   до всех остальных модулей, и обёрнут в try/catch. Каждый остальной модуль —
   в своём try/catch или за проверкой существования элементов. Одна сдохшая фича
   не имеет права превращать страницу в чёрный экран.

5. Прелоадер снимается по window.load ИЛИ по таймауту 3 секунды (что раньше).
   Если JS мёртв — прелоадер вообще не показывается (пункт 2). Если прелоадер работает, то он должен срабатывать только  один раз при первичном заходе на сайт или при обновлении страницы. 

6. Критерий сдачи любой страницы: DevTools → Disable JavaScript → страница читается
   как газета: тексты, таблицы, цены, формы, ссылки, крошки. Слайдер без JS —
   статичный список слайдов, компаратор без JS — две картинки рядом. Это норма.