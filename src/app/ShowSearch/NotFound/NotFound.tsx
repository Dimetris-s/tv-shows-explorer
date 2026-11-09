import { Button } from '@/components/Button';

import { StatePanel } from '../components/StatePanel';
import type { NotFoundProps } from './NotFound.types';
import { TvStaticIllustration } from './TvStaticIllustration';

export const NotFound = ({ query, onClear }: NotFoundProps) => {
  return (
    <StatePanel
      role="status"
      illustration={<TvStaticIllustration />}
      overline="Ничего не найдено"
      overlineTone="muted"
      title={<>По «{query}» — только помехи</>}
      description="Проверьте написание или попробуйте другое название."
      action={
        <Button variant="outline" onClick={onClear}>
          Очистить поиск
        </Button>
      }
    />
  );
};
