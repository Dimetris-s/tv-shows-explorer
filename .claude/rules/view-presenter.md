---
paths:
  - 'src/**/*.tsx'
  - 'src/**/logic/use*Presenter.ts'
  - 'src/**/*.types.ts'
---

# View и Presenter

Мотивация и примеры: `docs/architecture/view-presenter.md`.

## Компонент (`Name.tsx`)

```tsx
import type { NameProps } from './Name.types';
import { useNamePresenter } from './logic/useNamePresenter';

export const Name = (props: NameProps) => {
  const { items, isEmpty, handleSelect } = useNamePresenter(props);

  if (isEmpty) return <EmptyState />;

  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <Button onClick={handleSelect(item.id)}>{item.title}</Button>
        </li>
      ))}
    </ul>
  );
};
```

- В файле только импорты и `export const Name = (…) => …`. Константы, типы и хелперы выноси в соседние файлы.
- В теле компонента только `const { … } = useNamePresenter(props)`, ранний `if (…) return …;` и `return <JSX />`.
- В JSX разрешены `map`, `&&`, тернарник и инлайновые классы Tailwind.
- Запрещены любые хуки, кроме своего презентера, вычисления, объявления функций, `else` и инлайн-стрелки или `function` в атрибутах JSX.
- Если компоненту нечего готовить, презентера нет: пропсы деструктурируются прямо в параметрах.
- Пропсы — только то, что компонент использует. Из большого объекта бери нужное: `show: Pick<ShowListItem, 'id' | 'name' | 'isFavorite'>`. Родитель передаёт объект целиком, структурная типизация пропустит лишние поля. Если используются почти все поля, сужать незачем.
- View не импортирует сторы, сервисы и таски (`front-layers`).

## Презентер (`logic/useNamePresenter.ts`)

- Хук `use<Name>Presenter`, используется только компонентом `Name` из той же папки.
- Готовит всё для отрисовки: данные, флаги (`isEmpty`, `isLoading`), готовые обработчики.
- Обработчик с параметром внутри `map` — это фабрика: `const handleSelect = (id: number) => () => onSelect(id);`, в JSX `onClick={handleSelect(item.id)}`.
- Возвращает один объект, компонент его деструктурирует.
- Принимает те же пропсы, что и компонент: тип `NameProps` из `Name.types.ts`.
- Если презентер разросся, вспомогательные хуки и хелперы лежат рядом, в `logic/`.
- Бизнес-логику вызывает из тасок (`.claude/rules/tasks.md`), сам её не реализует. Навигация — в презентере.
