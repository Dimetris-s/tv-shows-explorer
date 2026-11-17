# Backend: граница фронта и бэка

## Зачем свой бэкенд

Бизнес-логика, которая не зависит от конкретного экрана и одинакова для всех клиентов, живёт на сервере:

- работа с внешним API (TVmaze) и маппинг его DTO в наши типы;
- кеширование ответов внешнего API;
- фильтрация по жанру, подсчёт жанров, пагинация;
- избранное: что в нём лежит, сколько его, как добавить и убрать.

На фронте остаётся то, что относится к конкретному UI:

- состояние экрана: строка поиска, debounce, выбранный жанр, номер страницы;
- подписи, форматирование, выбор состояния экрана;
- тосты, оптимистичное отображение, откат при ошибке.

Критерий тот же, что для тасок: если правило одинаково для веба, мобильного приложения и бота, оно на сервере.

## Монорепозиторий

```
/                     пакет фронта (tv-shows-explorer)
  src/
  server/             пакет @tv/server
    package.json      exports: { "./contract": "./src/contract/index.ts" }
    src/
  pnpm-workspace.yaml packages: ['server']
```

- Lockfile, хранилище пакетов, линтер (`vite.config.ts`) и форматтер общие. Зависимости у каждого пакета свои: сервер не видит `react`, фронт не видит `hono`.
- `tsc -b` проверяет оба пакета: `server/tsconfig.json` подключён в `references` корневого `tsconfig.json`.
- Vite собирает в бандл только то, что достижимо из `index.html`. Серверный код в бандл не попадает.

## Публичный API пакета `@tv/server`

Фронт видит сервер только через `exports` его `package.json`:

```ts
import type { ShowsPage } from '@tv/server/contract'; // ✅
import type { Show } from '../../server/src/contract/show'; // ❌ мимо exports
import { getShowsPage } from '@tv/server/src/tasks/getShowsPage'; // ❌ нет в exports
```

- Из `@tv/server` фронт импортирует только `contract` и только `import type`. Ни строчки серверного кода в браузерный бандл.
- Типы контракта (`Show`, `GenreCount`, `ShowListItem`, `ShowsPage`, ответы избранного) объявляет сервер: он владеет API. Кто кому диктует интерфейс, пересмотрим на уроке о направлении зависимостей.
- Общий runtime-код фронта и бэка (например, zod-схемы) — повод завести отдельный пакет `contract/`. Пока такого кода нет.

## Раскладка сервера

```
server/src/
  main.ts           запуск: serve(app) на порту из PORT (3000)
  app.ts            Hono-приложение: middleware clientId, роуты под /api, onError
  routes/           HTTP-граница: zod-схемы входа, вызов таски, JSON и статус
    shows.ts
    favorites.ts
  tasks/            бизнес-логика: функции-глаголы без hono и zod
  stores/           Entity: const cache = {}, const favorite = {}
  services/
    http/           httpGet для внешних API
    tvmaze/         TVMAZE_URL и DTO TVmaze
  contract/         публичные типы API
```

Дерево плоское: компонентов на сервере нет, поэтому `tasks/` одна. Правила тасок те же, что на фронте (`tasks.md`): глагол, одна функция на файл, большая таска — папка с реэкспортом, лимит 120 строк.

### Роут — тонкий

Роут похож на презентер: он соединяет транспорт (HTTP) с бизнес-логикой и сам логики не содержит.

```ts
shows.get('/', zValidator('query', searchQuery, onInvalid), async (c) => {
  const { q, genre, page } = c.req.valid('query');
  return c.json(await getShowsPage({ query: q, genre, page, clientId: c.get('clientId') }));
});
```

- Роут импортирует таски, контракт, `hono`, `zod`. Сторы и сервисы — только через таски.
- zod-схемы входа лежат в файле роута: это граница HTTP. Таска получает уже типизированные параметры.
- Ошибки API — `{ error: string }` со статусом: невалидный вход — `400` (общий hook валидатора), неизвестный ресурс — `404`, сбой TVmaze — `502` (`app.onError`).

### Entity на сервере

Хранилища — обычные объекты в памяти процесса, по ДЗ без базы данных:

- `cache` — ответы TVmaze: ключ — нормализованный URL запроса, значение — `{ data, storedAt }`, срок жизни 5 минут. Хранятся уже смапленные `Show`, поэтому смена жанра и страницы по тому же запросу не ходит в TVmaze.
- `favorite` — избранное по анонимному клиенту: `favorite[clientId][showId] = { show, addedAt }`. `clientId` сервер выдаёт в httpOnly cookie, если её нет.

Таски обращаются к сторам напрямую. Переход на SQLite или Postgres затронет только таски, которые работают со сторами.

Ограничения памяти процесса: данные пропадают при рестарте и деплое, работает только с одним инстансом сервера.

### Флаг избранного

Кеш общий для всех клиентов, поэтому пользовательское состояние в нём не хранится. Таска `getShowsPage` берёт `Show` из кеша и добавляет флаг `isFavorite` для текущего `clientId` уже после: в ответе `ShowListItem = Show & { isFavorite: boolean }`.

## Как фронт ходит в API

- Клиентская таска вызывает `httpGet` / `httpPut` / `httpDelete` из `@/services/http` с относительным путём `/api/...` и типизирует ответ типом из `@tv/server/contract`.
- В dev Vite проксирует `/api` на `localhost:3000`, в проде nginx фронта проксирует `/api/` на контейнер `api`. Один origin — CORS не нужен, cookie работают без настроек.
- Hono RPC (`hc<AppType>`) не используем: явный контракт и один http-клиент.

## Запуск

- Node запускает `.ts` напрямую (type stripping), сборки сервера нет.
- Внутри сервера импорты через subpath imports Node с расширением: `import { searchShows } from '#/tasks/searchShows.ts'`. Алиасы `tsconfig` Node не понимает.
- `pnpm dev` поднимает фронт и `node --watch server/src/main.ts`.
- Прод: образ `ghcr.io/dimetris-s/tv-shows-explorer-api`, сервис `api` в `docker/compose.yml` без наружных портов.
