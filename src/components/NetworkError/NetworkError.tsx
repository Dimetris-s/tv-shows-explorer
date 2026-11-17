import { Button } from '@/components/Button';

import { StatePanel } from '@/components/StatePanel';
import type { NetworkErrorProps } from './NetworkError.types';
import { TvErrorIllustration } from './TvErrorIllustration';

export const NetworkError = ({ message, onRetry }: NetworkErrorProps) => {
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
