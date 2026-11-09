---
paths:
  - 'src/**/*.tsx'
  - 'src/**/use*Presenter.ts'
  - 'src/**/*.types.ts'
---

# View и Presenter

Мотивация и примеры: `docs/architecture/view-presenter.md`.

## Компонент (`Name.tsx`)

```tsx
import type { NameProps } from './Name.types';
import { useNamePresenter } from './useNamePresenter';

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

## Презентер (`useNamePresenter.ts`)

- Хук `use<Name>Presenter`, используется только компонентом `Name` из той же папки.
- Готовит всё для отрисовки: данные, флаги (`isEmpty`, `isLoading`), готовые обработчики.
- Обработчик с параметром внутри `map` — это фабрика: `const handleSelect = (id: number) => () => onSelect(id);`, в JSX `onClick={handleSelect(item.id)}`.
- Возвращает один объект, компонент его деструктурирует.
- Принимает те же пропсы, что и компонент: тип `NameProps` из `Name.types.ts`.
- Если презентер разросся, вспомогательные хуки и утилиты лежат в той же папке.
