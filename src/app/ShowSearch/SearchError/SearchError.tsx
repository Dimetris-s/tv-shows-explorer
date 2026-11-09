import { Button } from '@/components/Button';

import { StatePanel } from '../components/StatePanel';
import type { SearchErrorProps } from './SearchError.types';
import { TvErrorIllustration } from './TvErrorIllustration';

export const SearchError = ({ message, onRetry }: SearchErrorProps) => {
  return (
    <StatePanel
      role="alert"
      illustration={<TvErrorIllustration />}
      overline="Ошибка сети"
      overlineTone="danger"
      title="Сигнал потерян"
      description={`${message}. Проверьте подключение и попробуйте ещё раз.`}
      action={<Button onClick={onRetry}>Повторить</Button>}
    />
  );
};
