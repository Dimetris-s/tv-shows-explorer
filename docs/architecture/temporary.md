# Временные решения

Здесь собраны решения, принятые до того, как в курсе пройдены соответствующие темы. Когда тема будет пройдена, решение пересматривается.

## Слой `src/api/` (до Interactor и Entity)

Пока нет Interactor и Entity, сетевой код живёт в `src/api/`:

- `http/` — `httpGet<T>(url, { signal, params, timeoutMs })`: обёртка над `fetch` с таймаутом (10 с по умолчанию). Ошибки приводятся к `HttpError` с `kind`: `http` (не 2xx, есть `status`), `network`, `timeout`, `parse`. Отмена вызывающим не считается ошибкой: пробрасывается исходный `AbortError`.
- `tvmaze/` — `tvmazeApi.searchShows(query, { signal })`, `tvmazeApi.getShow(id, { signal })` и DTO-типы (`TvmazeShow` и др.). Поиск TVmaze возвращает не больше 10 результатов.
- `query/` — `useQuery` вместо TanStack Query, поверх общего стора `queryStore`:
  - кэш по ключу (`queryKey`), данные свежие `staleTime` (5 минут по умолчанию);
  - одновременные запросы с одним ключом дедуплицируются;
  - запрос отменяется, когда ключ больше никому не нужен (сменился ключ или размонтировался компонент);
  - флаги `isLoading` (первая загрузка), `isFetching`, `isError`, `isSuccess`, `isPreviousData`, а также `refetch`;
  - `enabled: false` — не запрашивать (например, пустая строка поиска);
  - `keepPreviousData: true` — показывать прошлые данные, пока грузится новый ключ.

Презентеры получают данные через `useQuery`:

```ts
const { data, isLoading, isError } = useQuery({
  queryKey: ['shows', 'search', query],
  queryFn: ({ signal }) => tvmazeApi.searchShows(query, { signal }),
  enabled: query.length > 0,
  keepPreviousData: true,
});
```

## Одна страница

Приложение — одна страница без роутинга. Разделение на слои и Router появятся позже.
