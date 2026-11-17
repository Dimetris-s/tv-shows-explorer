import { Button } from '@/components/Button';
import { StatePanel } from '@/components/StatePanel';

import type { FavoritesEmptyProps } from './FavoritesEmpty.types';
import { TicketIllustration } from './TicketIllustration';

export const FavoritesEmpty = ({ onClose }: FavoritesEmptyProps) => {
  return (
    <StatePanel
      role="status"
      illustration={<TicketIllustration />}
      overline="Пустой зал"
      overlineTone="muted"
      title="Пока пусто"
      description="Отмечайте сериалы звёздочкой на карточке — они появятся здесь."
      action={<Button onClick={onClose}>К поиску</Button>}
    />
  );
};
