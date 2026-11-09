# Cinema Noir — дизайн-система

Источник: канвас Claude Design «TV Shows Explorer», артборд «Дизайн-система · токены и компоненты».
Токены лежат в `src/index.css`. Тема одна, тёмная (`<html class="dark">`).

## Цвета

Палитра Cinema Noir связана с семантическими токенами shadcn, чтобы shadcn-примитивы сразу выглядели по макету. В Tailwind — классы `bg-*`, `text-*`, `border-*`.

| Cinema Noir       | Значение  | Токен в коде             | Назначение                  |
| ----------------- | --------- | ------------------------ | --------------------------- |
| `--bg`            | `#0E0E10` | `background`             | фон страницы                |
| `--surface`       | `#18181C` | `card`, `popover`        | панели                      |
| `--surface-2`     | `#24242A` | `secondary`, `muted`     | постер, hover, disabled     |
| `--border`        | `#2A2A31` | `border`                 | разделители                 |
| `--border-strong` | `#3A3A42` | `border-strong`, `input` | поля, чипсы, outline-кнопки |
| `--text`          | `#F2F0EB` | `foreground`             | основной текст              |
| `--text-muted`    | `#A3A1A8` | `muted-foreground`       | вторичный текст             |
| `--on-accent`     | `#1A1206` | `primary-foreground`     | текст на акценте            |
| `--accent`        | `#F5A524` | `primary`, `ring`        | действие                    |
| `--accent-hover`  | `#FFC861` | `primary-hover`          | hover акцента               |
| `--accent-soft`   | `#3B2A0C` | `primary-soft`           | подложки, фокус-кольцо      |
| `--danger`        | `#F07167` | `destructive`            | ошибки сети                 |
| —                 | `#1F1F24` | `skeleton`               | скелетон                    |
| —                 | `#C9C7CD` | `subtle`                 | описание сериала в карточке |
| —                 | `#8A8890` | `disabled-foreground`    | текст disabled-кнопки       |

Акцент Cinema Noir — это `primary`. Токен shadcn `accent` означает фон при наведении в меню и равен `--surface-2`.

## Типографика

Заголовки — Space Grotesk (`font-heading`, подключён к `h1`–`h3` по умолчанию), текст и интерфейс — Inter (`font-sans`).
В Space Grotesk нет кириллицы: русские заголовки набираются Inter, латиница — Space Grotesk.

| Класс           | Размер / начертание                            |
| --------------- | ---------------------------------------------- |
| `text-display`  | 48 / 700, −0.02em                              |
| `text-h1`       | 32 / 700, −0.01em                              |
| `text-h2`       | 22 / 700                                       |
| `text-title`    | 19 / 700                                       |
| `text-body`     | 16 / 400, line-height 1.5 (текст по умолчанию) |
| `text-small`    | 13 / 400                                       |
| `text-overline` | 12 / 500, 0.14em; добавь `uppercase`           |

## Отступы и радиусы

Отступы — стандартная шкала Tailwind с шагом 4px (`p-1` = 4px, `gap-4` = 16px, `p-16` = 64px).

| Радиус Cinema Noir | Класс          |
| ------------------ | -------------- |
| sm · 6             | `rounded-sm`   |
| md · 10            | `rounded-md`   |
| lg · 14            | `rounded-lg`   |
| xl · 20            | `rounded-xl`   |
| pill               | `rounded-full` |

## Компоненты (`src/components/`)

| Компонент     | Макет                                  | API                                                                    |
| ------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| `Button`      | primary / secondary / ghost / disabled | `variant`: `default` (primary), `outline` (secondary), `ghost`; `size` |
| `Badge`       | рейтинг, «В эфире»                     | `variant`: `rating`, `rating-empty`, `soft` + варианты shadcn          |
| `Skeleton`    | скелетон карточки                      | `className` задаёт размеры                                             |
| `Chip`        | чипс жанра: active / default / hover   | `isActive`, `onClick`, `count`                                         |
| `Pagination`  | пагинация                              | `page`, `pageCount`, `onPageChange`; при одной странице не рендерится  |
| `SearchField` | live search: пусто / загрузка / текст  | `value`, `onValueChange`, `label`, `placeholder`, `isLoading`          |

Карточка сериала и шапка — компоненты приложения, они появятся вместе с экранами.

## Как менять

- Цвет или радиус — в `src/index.css`, во всех компонентах он поменяется сам.
- Вид shadcn-примитива — в `src/components/ui/*` (вендорный код, правим только под дизайн-систему).
- Новый примитив — `pnpm dlx shadcn@latest add <name>`, затем подогнать классы под токены и сделать обёртку генератором.
