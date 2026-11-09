# View и Presenter

## View

View — это JSX. Компонент отвечает только за отображение и не содержит логики.

Компонент всегда устроен одинаково: сверху вызывается презентер, ниже возвращается JSX.

В теле компонента допускаются только:

- вызов своего презентера с деструктуризацией результата;
- ранний `return` (`if (isLoading) return <Skeleton />;`);
- в JSX: `map` для отрисовки списков, условный рендеринг (`&&`, тернарник) и инлайновые классы Tailwind.

Запрещены:

- любые хуки, кроме своего презентера (`useState`, `useEffect`, `useMemo`, сторонние хуки);
- вычисления, переменные, функции и обработчики, объявленные в теле компонента;
- инлайн-стрелки и `function` в атрибутах JSX (`onClick={() => …}`).

## Presenter

Presenter — место, где модель соединяется с отображением. Это хук `use<Component>Presenter`, который готовит для View всё, что нужно для отрисовки: данные, флаги и готовые обработчики.

- Презентер привязан к одному компоненту и используется только им.
- Возвращает **один объект**, который компонент деструктурирует.
- Отдаёт **готовые обработчики**. Если обработчик нужно параметризовать внутри `map`, презентер отдаёт фабрику — функцию, возвращающую обработчик. В JSX это вызов фабрики, а не инлайн-стрелка: `onClick={handleSelect(show.id)}`.
- Если презентеру нужны пропсы, они **совпадают с пропсами компонента**. Тип описывается один раз в `<Component>.types.ts` и переиспользуется компонентом и презентером.
- Если компоненту нечего готовить (он просто рисует пропсы), презентер не создаётся.

## Пример

```ts
// ShowList/ShowList.types.ts
import type { Show } from '@/api/tvmaze';

export type ShowListProps = {
  shows: Show[];
  onSelect: (id: number) => void;
};
```

```ts
// ShowList/useShowListPresenter.ts
import type { ShowListProps } from './ShowList.types';

export const useShowListPresenter = ({ shows, onSelect }: ShowListProps) => {
  const handleSelect = (id: number) => () => onSelect(id);

  return {
    shows,
    isEmpty: shows.length === 0,
    handleSelect,
  };
};
```

```tsx
// ShowList/ShowList.tsx
import type { ShowListProps } from './ShowList.types';
import { useShowListPresenter } from './useShowListPresenter';

export const ShowList = (props: ShowListProps) => {
  const { shows, isEmpty, handleSelect } = useShowListPresenter(props);

  if (isEmpty) return <p className="text-muted-foreground">Ничего не найдено</p>;

  return (
    <ul className="grid grid-cols-3 gap-6">
      {shows.map((show) => (
        <li key={show.id}>
          <button type="button" onClick={handleSelect(show.id)}>
            {show.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

## Антипримеры

```tsx
export const ShowList = ({ shows, onSelect }: ShowListProps) => {
  const [query, setQuery] = useState(''); // ❌ хук в компоненте: это работа презентера
  const filtered = shows.filter((s) => s.name.includes(query)); // ❌ вычисление в компоненте

  return (
    <ul>
      {filtered.map((show) => (
        // ❌ инлайн-стрелка: презентер должен отдать обработчик или фабрику
        <li key={show.id} onClick={() => onSelect(show.id)}>
          {show.name}
        </li>
      ))}
    </ul>
  );
};
```
