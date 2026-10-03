# pesko-templates — статические шаблоны сайта «Центр Пескоструя»

Репозиторий со статическими HTML/CSS/JS шаблонами многостраничного сайта
пескоструйной компании «Центр Пескоструя» (Санкт-Петербург).

**Важно:** это НЕ WordPress-тема. Это песочница, в которой ИИ-кодер собирает
шаблоны, а человек вручную переносит их в Bricks Builder + SNN BRX:
- шапка/футер → Bricks Templates (по одному HTML-блоку)
- global.css / global.js → сниппеты SNN
- секции страниц → Bricks Code/HTML блоки

## 📡 Для ИИ-кодера (ОБЯЗАТЕЛЬНО К ПРОЧТЕНИЮ)

**Полный устав проекта лежит в `AGENTS.md` в корне репозитория.**
Прочитай его ПЕРЕД любой задачей — там границы роли, источники правды,
дизайн-система, контракт классов, карта сайта, формат вывода и GIT-правила.

Коротко:
- Пишешь только HTML + CSS + JS. PHP / WordPress / шорткоды — запрещено.
- Источники правды: `docs/design/index.html` (визуал) и `docs/seo-structure.txt` (SEO).
- Дизайн-код: как на референсе https://e-tee.github.io/centersand/, шрифты Manrope + Oswald.
- Все обращения к необязательным DOM-элементам — через проверки существования.
- После каждой пачки файлов — `git add -A && git commit -m "..." && git push origin main`.

## 🛠 Стек

- Vanilla JS (ES6+), без jQuery. Единственная библиотека — Swiper (модулями).
- Plain CSS (CSS Custom Properties), без SCSS/LESS/Tailwind/сборщиков.
- Шрифты: **Oswald** (заголовки, 700, uppercase), **Manrope** (текст, 400/500).
- Референс дизайна: https://e-tee.github.io/centersand/

## 📁 Структура

## 🗺 Карта сайта (43 страницы)

**Главная:** `/`

**Услуги (хаб):** `/uslugi/`

**Категории (6):** `/fasady/` `/metall/` `/auto/` `/derevo/` `/syda/` `/speczifika/`

**Услуги (20, под `/uslugi/`):**
- Фасады, камень и бетон: `ochistka-fasadov`, `ochistka-betona`, `ochistka-kirpicha`, `ochistka-pamyatnikov`
- Металл и мосты: `ochistka-metallokonstrukcij`, `ochistka-alyuminiya`, `ochistka-mostov`
- Авто и техника: `ochistka-dnishcha`, `ochistka-diskov`, `ochistka-zapchastej`, `ochistka-gruzovikov`, `ochistka-spectehniki`, `peskostruj-i-pokraska-spectehniki`
- Дерево: `ochistka-brusa`, `ochistka-derevyannyh-domov`
- Суда и яхты: `ochistka-sudov`, `ochistka-yacht`
- Спецработы: `ochistka-posle-pozhara`, `ochistka-shtukaturnyh-stancij`, `ochistka-dorog`

**Объекты:** `/obekty/` (хаб) + `/obekty/kunstkamera/`, `/obekty/russkiy-muzey/`, `/obekty/konstitucionnyy-sud/`, + 2 заглушки `/obekty/{slug}/`

**Системные:** `/price/` `/oborudovanie/` `/okompanii/` `/vyezd/` `/kontakty/` `/blog/` `/info/{slug}/`

**Служебные:** `/404/` (noindex) `/politika-konfidencialnosti/` (noindex) `/karta-sajta/`

## 📞 Единые контакты проекта (NAP)

**Телефон:** +7 (812) 64-222-64
**Почта:** pesko.struyspb@mail.ru
**Адрес:** СПб, м. Парнас, ул. Заречная, 23А
**Часы:** Пн–Сб 9:00–23:00

NAP должен быть единым во всех шаблонах, JSON-LD, футере и формах.
Дубли из дизайна главной (`8 800 201-18-55`, `CenterPeskostruya.rf@mail.ru`) — ИГНОРИРОВАТЬ.

## 🚀 Локальный запуск

Статика, никакого build-процесса. Любой статический сервер:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .

# VS Code
расширение Live Server → правый клик на pages/index.html → Open with Live Server