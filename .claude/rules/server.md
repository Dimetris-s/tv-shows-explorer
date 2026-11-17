---
paths:
  - 'server/**'
---

# Сервер (`@tv/server`)

Мотивация и подробности: `docs/architecture/backend.md`.

```
server/src/
  main.ts       запуск
  app.ts        Hono-приложение, middleware clientId, onError
  routes/       HTTP-граница: zod-схемы входа → таска → JSON/статус
  tasks/        бизнес-логика без hono и zod
  stores/       Entity: объекты в памяти (cache, favorite)
  services/     http (httpGet), tvmaze (URL и DTO)
  contract/     публичные типы API, единственное, что видит фронт
```

- На сервере лежит логика, общая для всех клиентов: TVmaze, кеш, фильтрация, жанры, пагинация, избранное.
- Роут тонкий: разобрать вход zod-схемой, вызвать таску, вернуть JSON. Сторы и сервисы роут не импортирует.
- Таски — по правилам `.claude/rules/tasks.md`, создаются `pnpm gen:task server/src/tasks/<verbName>`. Никаких `hono` и `zod` в тасках.
- DTO TVmaze переводятся в `Show` в сетевой таске. Дальше DTO не уходят.
- Кеш хранит общие для всех данные. Пользовательское (`isFavorite`) добавляется после чтения из кеша.
- Ошибки — `{ error: string }`: `400` невалидный вход, `404` нет ресурса, `502` сбой TVmaze.
- Импорты внутри сервера — `#/…` с расширением `.ts` (`#/tasks/searchShows.ts`). Алиас `@/` здесь не работает.
- Новый тип ответа API — в `contract/` и в его `index.ts`.
- Лимит 120 строк, только именованные экспорты, без комментариев.
